/* Motore della sessione di allenamento.
 *  - la sessione finisce SOLO dopo 10 risposte corrette
 *  - argomenti mescolati (interleaving): mai lo stesso argomento due volte di fila
 *  - ~60% argomenti del livello attuale (e basi deboli), ~25% ripasso, ~15% livello successivo
 *  - dopo un errore: spiegazione + variante sulla stessa regola 2–3 esercizi dopo
 *  - errori ripetuti sullo stesso argomento → esercizi più guidati (gradino più basso, poi scelta multipla)
 */
EC.session = (function () {
  'use strict';
  var U = EC.util;
  var L = EC.learner;

  var CFG = {
    TARGET: 10,
    MIX: { core: 0.6, review: 0.25, stretch: 0.15 },
    GEN_PROB: 0.35, // probabilità di usare un generatore quando l'argomento ne ha uno
    AI_PROB: 0.6, // probabilità di usare un esercizio AI disponibile per l'argomento
    FRESH_DAYS: 3, // un esercizio visto da meno di N giorni non è "fresco"
    MAX_READING: 2 // massimo domande di lettura per sessione (richiedono più tempo)
  };

  /* ---------- valutazione di una risposta ---------- */
  function evaluate(item, given) {
    var M = EC.matcher;
    var res = { correct: false, note: null, nearMiss: null, expected: item.answers[0] };
    if (item.type === 'mc') {
      res.correct = item.answers.indexOf(given) !== -1;
      if (!res.correct && item.notes) res.note = item.notes[given] || M.findNote(given, item.notes);
    } else {
      res.correct = M.isMatch(given, item.answers);
      if (!res.correct) {
        res.note = M.findNote(given, item.notes);
        res.nearMiss = M.nearMiss(given, item.answers);
      }
    }
    return res;
  }

  function create(state, opts) {
    opts = opts || {};
    var rng = opts.rng || U.rng;
    var snap = opts.resume || null;
    var day = U.today();

    var s = {
      start: U.now(),
      level: L.currentLevel(state),
      answered: 0,
      correct: 0,
      firstTryCorrect: 0,
      firstTryTotal: 0,
      perTopic: {},
      errors: [],
      log: [],
      sessionWrong: {},
      topicUses: {},
      aiUsed: 0
    };
    if (snap) {
      ['start', 'level', 'answered', 'correct', 'firstTryCorrect', 'firstTryTotal', 'perTopic', 'errors', 'log', 'sessionWrong', 'topicUses', 'aiUsed']
        .forEach(function (k) { if (snap[k] !== undefined) s[k] = U.clone(snap[k]); });
    }
    var used = {};
    s.log.forEach(function (l) { used[l.id] = true; });
    var lastTopic = s.log.length ? s.log[s.log.length - 1].topic : null;
    var pending = []; // varianti da proporre: { topic, group, difficulty, at, avoid }
    var current = null;
    var aiQueue = (opts.aiItems || []).slice();

    /* ---------- scelta dell'argomento ---------- */
    function pools() {
      var li = U.levelIndex(s.level);
      var core = [], review = [], stretch = [];
      var topics = L.usableTopics();
      topics.forEach(function (t) {
        var ti = U.levelIndex(t.level);
        var st = L.topicState(state, t.id);
        var due = L.isDue(st, day);
        if (ti === li) {
          if (due) core.push(t);
        } else if (ti < li) {
          if (due && st.box <= 1) core.push(t); // basi deboli: si rinforzano come argomenti principali
          else if (due) review.push(t);
        } else if (ti === li + 1) {
          stretch.push(t);
        }
      });
      if (!core.length) {
        // tutto il livello è "in pausa" (ripassi futuri): si anticipano gli argomenti meno solidi
        core = topics.filter(function (t) { return U.levelIndex(t.level) === li && L.topicState(state, t.id).box < L.CFG.MAX_BOX; });
        if (!core.length) core = topics.filter(function (t) { return U.levelIndex(t.level) === li; });
      }
      return { core: core, review: review, stretch: stretch };
    }

    function readingCount() {
      return s.log.filter(function (l) { return /^reading_/.test(l.topic); }).length;
    }

    function topicWeight(t) {
      var st = L.topicState(state, t.id);
      var w = 6 - Math.min(st.box, 5);
      if (st.due && st.due < day) w *= 1 + Math.min(U.daysBetween(st.due, day), 10) * 0.1;
      w /= 1 + 1.5 * (s.topicUses[t.id] || 0);
      if (t.area === 'reading') w *= 0.6;
      // basi deboli di un livello inferiore: priorità più alta (sono le fondamenta)
      if (U.levelIndex(t.level) < U.levelIndex(s.level) && st.box <= 1) w *= 2;
      return w;
    }

    function allowed(t) {
      if (t.id === lastTopic) return false;
      if (t.area === 'reading' && readingCount() >= CFG.MAX_READING) return false;
      return true;
    }

    function pickTopic() {
      var P = pools();
      var names = ['core', 'review', 'stretch'];
      var avail = names.filter(function (n) { return P[n].some(allowed); });
      if (!avail.length) {
        // caso limite: un solo argomento disponibile
        var any = P.core.concat(P.review, P.stretch);
        return any.length ? { topic: any[0], pool: 'core' } : null;
      }
      var poolName = U.weightedPick(avail.map(function (n) { return [n, CFG.MIX[n]]; }), rng);
      var list = P[poolName].filter(allowed);
      var t = U.weightedPick(list.map(function (x) { return [x, topicWeight(x)]; }), rng);
      return { topic: t, pool: poolName };
    }

    /* ---------- scelta dell'esercizio ---------- */
    function itemSeenRecently(it) {
      var rec = state.items[it.id];
      if (!rec || !rec.last) return false;
      return (U.now() - rec.last) < CFG.FRESH_DAYS * 86400000;
    }

    function chooseFrom(list) {
      // prima i mai visti, poi i visti meno di recente; un po' di casualità tra i migliori
      var scored = list.map(function (it) {
        var rec = state.items[it.id];
        return { it: it, last: rec ? rec.last : 0, r: rng() };
      });
      scored.sort(function (a, b) { return (a.last - b.last) || (a.r - b.r); });
      var top = scored.slice(0, Math.min(3, scored.length));
      return U.pick(top, rng).it;
    }

    function takeAi(topicId) {
      for (var i = 0; i < aiQueue.length; i++) {
        if (aiQueue[i].topic === topicId && !used[aiQueue[i].id]) {
          var it = aiQueue.splice(i, 1)[0];
          s.aiUsed++;
          return it;
        }
      }
      return null;
    }

    function itemFor(topicId, poolName, opt) {
      opt = opt || {};
      var st = L.topicState(state, topicId);
      var tier = poolName === 'stretch' ? 1 : L.tierForBox(st.box);
      var wrongs = s.sessionWrong[topicId] || 0;
      if (wrongs >= 1) tier = Math.max(1, tier - 1); // impalcatura: un gradino più facile
      var forceMc = wrongs >= 2;
      if (forceMc) tier = 1;
      if (opt.maxDifficulty) tier = Math.min(tier, opt.maxDifficulty);

      if (!opt.group && aiQueue.length && rng() < CFG.AI_PROB) {
        var ai = takeAi(topicId);
        if (ai && (!forceMc || ai.type === 'mc')) return ai;
      }

      var bank = EC.data.items.filter(function (i) {
        return i.topic === topicId && !used[i.id] && (!forceMc || i.type === 'mc') && (!opt.group || i.group === opt.group);
      });
      var pool = bank.filter(function (i) { return i.difficulty === tier; });
      if (!pool.length) {
        // gradino più vicino (prima quelli più facili)
        for (var d = 1; d <= 2 && !pool.length; d++) {
          pool = bank.filter(function (i) { return i.difficulty === tier - d; });
          if (!pool.length) pool = bank.filter(function (i) { return i.difficulty === tier + d; });
        }
      }
      var fresh = pool.filter(function (i) { return !itemSeenRecently(i); });
      var gens = EC.generators ? EC.generators.forTopic(topicId) : [];
      var canGen = !opt.group && gens.some(function (g) { return g.tiers.indexOf(tier) !== -1; });
      if (canGen && (!fresh.length || rng() < CFG.GEN_PROB)) {
        var g = EC.generators.generate(topicId, tier, rng, { type: forceMc ? 'mc' : undefined, exclude: used });
        if (g) return g;
      }
      if (fresh.length) return chooseFrom(fresh);
      if (pool.length) return chooseFrom(pool);
      if (opt.group) return null;
      // argomento esaurito: generatore di qualsiasi gradino, oppure qualsiasi esercizio già usato
      if (gens.length) {
        var g2 = EC.generators.generate(topicId, gens[0].tiers[0], rng, { exclude: used });
        if (g2) return g2;
      }
      var any = EC.data.items.filter(function (i) { return i.topic === topicId; });
      return any.length ? chooseFrom(any) : null;
    }

    function variantFor(p) {
      var it = itemFor(p.topic, 'core', { group: p.group, maxDifficulty: p.difficulty });
      if (!it) it = itemFor(p.topic, 'core', { group: p.group });
      if (!it) it = itemFor(p.topic, 'core', { maxDifficulty: p.difficulty });
      return it;
    }

    /* ---------- API ---------- */
    function next() {
      if (s.correct >= CFG.TARGET) return null;
      if (current && !current.answered) return current.item;
      var item = null;
      var meta = { variant: false, pool: null };
      for (var i = 0; i < pending.length; i++) {
        var p = pending[i];
        if (s.answered >= p.at && p.topic !== lastTopic) {
          pending.splice(i, 1);
          item = variantFor(p);
          if (item) { meta.variant = true; meta.pool = 'variant'; }
          break;
        }
      }
      for (var tries = 0; !item && tries < 8; tries++) {
        var pick = pickTopic();
        if (!pick) break;
        item = itemFor(pick.topic.id, pick.pool);
        meta.pool = pick.pool;
      }
      if (!item) return null;
      current = { item: item, meta: meta, answered: false };
      return item;
    }

    // opts.forceCorrect / opts.aiNote: verdetto dell'AI su una risposta scritta non prevista
    function answer(given, opts) {
      opts = opts || {};
      if (!current || current.answered) return null;
      var item = current.item;
      var ev = evaluate(item, given);
      if (!ev.correct && opts.forceCorrect) {
        ev.correct = true;
        ev.acceptedByAi = true;
      }
      if (opts.aiNote) ev.aiNote = opts.aiNote;
      current.answered = true;
      used[item.id] = true;
      s.answered++;
      s.topicUses[item.topic] = (s.topicUses[item.topic] || 0) + 1;
      lastTopic = item.topic;
      if (!current.meta.variant) {
        s.firstTryTotal++;
        if (ev.correct) s.firstTryCorrect++;
      }
      var pt = s.perTopic[item.topic] || (s.perTopic[item.topic] = { correct: 0, wrong: 0 });
      if (ev.correct) {
        pt.correct++;
        s.correct++;
      } else {
        pt.wrong++;
        s.sessionWrong[item.topic] = (s.sessionWrong[item.topic] || 0) + 1;
        pending.push({ topic: item.topic, group: item.group, difficulty: item.difficulty, at: s.answered + 2 + U.randInt(2, rng) });
        s.errors.push({
          itemId: item.id, topic: item.topic, type: item.type, prompt: item.prompt, instruction: item.instruction || '',
          given: given, expected: item.answers[0], ts: U.now()
        });
      }
      s.log.push({ id: item.id, topic: item.topic, difficulty: item.difficulty, type: item.type, correct: ev.correct, variant: current.meta.variant, pool: current.meta.pool, ai: !!item.ai });
      L.recordAnswer(state, item, ev.correct);
      state.activeSession = snapshot();
      ev.item = item;
      ev.variant = current.meta.variant;
      ev.correctCount = s.correct;
      ev.done = s.correct >= CFG.TARGET;
      return ev;
    }

    function snapshot() {
      return U.clone({
        start: s.start, level: s.level, answered: s.answered, correct: s.correct,
        firstTryCorrect: s.firstTryCorrect, firstTryTotal: s.firstTryTotal, perTopic: s.perTopic,
        errors: s.errors, log: s.log, sessionWrong: s.sessionWrong, topicUses: s.topicUses, aiUsed: s.aiUsed
      });
    }

    function finish() {
      var changes = L.applySession(state, s.perTopic);
      L.updateStreak(state);
      var end = U.now();
      var summary = {
        date: U.today(),
        start: s.start,
        end: end,
        minutes: Math.max(1, Math.round((end - s.start) / 60000)),
        level: s.level,
        answered: s.answered,
        correct: s.correct,
        firstTryCorrect: s.firstTryCorrect,
        firstTryTotal: s.firstTryTotal,
        perTopic: s.perTopic,
        errors: s.errors,
        boxChanges: changes,
        aiUsed: s.aiUsed,
        levelUp: null
      };
      state.sessions.push(summary);
      summary.levelUp = L.checkLevelUp(state);
      state.activeSession = null;
      return summary;
    }

    function addAiItems(list) {
      (list || []).forEach(function (it) { aiQueue.push(it); });
    }

    return {
      next: next,
      answer: answer,
      finish: finish,
      addAiItems: addAiItems,
      get correct() { return s.correct; },
      get answered() { return s.answered; },
      get level() { return s.level; },
      get target() { return CFG.TARGET; },
      get pendingVariants() { return pending.length; },
      get currentIsVariant() { return !!(current && current.meta.variant); },
      get log() { return s.log; },
      _state: s
    };
  }

  // Argomenti su cui puntare (per l'AI): i più deboli del livello di lavoro
  function weakTopics(state, n) {
    var lvl = L.currentLevel(state);
    var li = U.levelIndex(lvl);
    return L.usableTopics()
      .filter(function (t) { return t.area !== 'reading' && U.levelIndex(t.level) <= li; })
      .map(function (t) { return { t: t, box: L.topicState(state, t.id).box, same: t.level === lvl ? 0 : 1 }; })
      .sort(function (a, b) { return (a.box - b.box) || (a.same - b.same); })
      .slice(0, n || 4)
      .map(function (x) { return x.t; });
  }

  return { create: create, evaluate: evaluate, weakTopics: weakTopics, CFG: CFG };
})();
