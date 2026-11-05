/* Modello dello studente.
 * Per ogni argomento: una "scatola" Leitner 0–5 e la data del prossimo ripasso.
 *  - sessione senza errori sull'argomento → la scatola sale di 1 e il ripasso si allontana
 *  - almeno un errore → la scatola scende di 1 e l'argomento torna domani
 * Gradino di difficoltà degli esercizi: scatola 0–1 → 1, 2–3 → 2, 4–5 → 3.
 * Livello di lavoro: si sale quando l'80% degli argomenti del livello è "acquisito"
 * (scatola ≥ 4) e nelle ultime 3 sessioni a quel livello le risposte giuste al primo
 * colpo sono almeno il 75%.
 */
EC.learner = (function () {
  'use strict';
  var U = EC.util;

  var CFG = {
    INTERVALS: [0, 1, 2, 4, 7, 14], // giorni prima del prossimo ripasso, per scatola
    MAX_BOX: 5,
    ACQUIRED_BOX: 4,
    LEVEL_UP_SHARE: 0.8,
    LEVEL_UP_ACCURACY: 0.75,
    LEVEL_UP_MIN_SESSIONS: 3
  };

  function today() { return U.today(); }

  function topicState(state, id) {
    var t = state.topics[id];
    if (!t) {
      t = state.topics[id] = { box: 0, due: today(), seen: 0, correct: 0, wrong: 0, last: null };
    }
    return t;
  }

  function tierForBox(box) {
    if (box <= 1) return 1;
    if (box <= 3) return 2;
    return 3;
  }

  function isDue(t, day) { return !t.due || t.due <= (day || today()); }

  function topicsAt(level) {
    return EC.data.topics.filter(function (t) { return t.level === level; });
  }

  // argomenti che hanno davvero esercizi (banca o generatori)
  var _usable = null;
  function usableTopics() {
    if (_usable) return _usable;
    var has = {};
    EC.data.items.forEach(function (i) { has[i.topic] = true; });
    if (EC.generators) EC.generators.list.forEach(function (g) { has[g.topic] = true; });
    _usable = EC.data.topics.filter(function (t) { return has[t.id]; });
    return _usable;
  }
  function _resetCache() { _usable = null; }

  function currentLevel(state) { return state.level || 'A1'; }

  function recordAnswer(state, item, correct) {
    var t = topicState(state, item.topic);
    t.seen++;
    if (correct) t.correct++; else t.wrong++;
    t.last = U.now();
    var rec = state.items[item.id] || (state.items[item.id] = { n: 0, last: 0, wrong: 0 });
    rec.n++;
    rec.last = U.now();
    if (!correct) rec.wrong++;
  }

  /* Aggiorna le scatole a fine sessione. perTopic: { id: { correct, wrong } } */
  function applySession(state, perTopic) {
    var day = today();
    var changes = [];
    Object.keys(perTopic).forEach(function (id) {
      var r = perTopic[id];
      var t = topicState(state, id);
      var from = t.box;
      if (r.wrong === 0 && r.correct > 0) {
        t.box = Math.min(CFG.MAX_BOX, t.box + 1);
        t.due = U.addDays(day, CFG.INTERVALS[t.box]);
      } else if (r.wrong > 0) {
        t.box = Math.max(0, t.box - 1);
        t.due = U.addDays(day, 1);
      }
      changes.push({ topic: id, from: from, to: t.box });
    });
    return changes;
  }

  function levelProgress(state, level) {
    var list = usableTopics().filter(function (t) { return t.level === level; });
    var acquired = list.filter(function (t) { return topicState(state, t.id).box >= CFG.ACQUIRED_BOX; }).length;
    return { level: level, acquired: acquired, total: list.length, share: list.length ? acquired / list.length : 0 };
  }

  function recentAccuracy(state, level, n) {
    var sessions = state.sessions.filter(function (s) { return s.level === level && s.answered > 0; }).slice(-(n || CFG.LEVEL_UP_MIN_SESSIONS));
    if (!sessions.length) return { accuracy: 0, sessions: 0 };
    var first = 0, tot = 0;
    sessions.forEach(function (s) { first += s.firstTryCorrect; tot += s.firstTryTotal; });
    return { accuracy: tot ? first / tot : 0, sessions: sessions.length };
  }

  /* Restituisce il nuovo livello se lo studente è pronto a salire, altrimenti null. */
  function checkLevelUp(state) {
    var lvl = currentLevel(state);
    var idx = U.levelIndex(lvl);
    if (idx >= EC.LEVELS.length - 1) return null;
    var prog = levelProgress(state, lvl);
    var acc = recentAccuracy(state, lvl);
    if (prog.share >= CFG.LEVEL_UP_SHARE && acc.sessions >= CFG.LEVEL_UP_MIN_SESSIONS && acc.accuracy >= CFG.LEVEL_UP_ACCURACY) {
      var next = EC.LEVELS[idx + 1];
      state.level = next;
      state.levelHistory.push({ level: next, date: today(), reason: 'promotion' });
      return next;
    }
    return null;
  }

  // Cosa manca per salire di livello (per la schermata progressi)
  function levelUpStatus(state) {
    var lvl = currentLevel(state);
    var prog = levelProgress(state, lvl);
    var acc = recentAccuracy(state, lvl);
    return {
      level: lvl,
      next: EC.LEVELS[U.levelIndex(lvl) + 1] || null,
      acquired: prog.acquired,
      total: prog.total,
      needAcquired: Math.ceil(prog.total * CFG.LEVEL_UP_SHARE),
      accuracy: acc.accuracy,
      sessions: acc.sessions,
      needAccuracy: CFG.LEVEL_UP_ACCURACY,
      needSessions: CFG.LEVEL_UP_MIN_SESSIONS
    };
  }

  /* Inizializza le scatole dal test iniziale. result: vedi EC.placement */
  function initFromPlacement(state, result, rng) {
    var day = today();
    var wIdx = U.levelIndex(result.workingLevel);
    usableTopics().forEach(function (t) {
      var st = topicState(state, t.id);
      var tested = result.perTopic[t.id];
      var lIdx = U.levelIndex(t.level);
      if (tested) {
        var ok = tested.correct / tested.total;
        if (ok >= 1) st.box = lIdx < wIdx ? 3 : 1;
        else if (ok > 0) st.box = lIdx < wIdx ? 1 : 0;
        else st.box = 0;
        st.due = day;
      } else if (lIdx < wIdx) {
        // argomenti dei livelli già superati: ripasso distribuito nei prossimi giorni
        st.box = 3;
        st.due = U.addDays(day, 1 + U.randInt(5, rng));
      } else {
        st.box = 0;
        st.due = day;
      }
    });
    state.level = result.workingLevel;
    state.levelHistory.push({ level: result.workingLevel, date: day, reason: 'placement' });
    state.placements.push({
      date: day,
      estimated: result.estimated,
      workingLevel: result.workingLevel,
      correct: result.correct,
      total: result.total,
      perLevel: result.perLevel,
      perTopic: result.perTopic
    });
  }

  /* Test ripetuto più avanti: non azzera i progressi.
   * - se il livello di lavoro risulta più alto, lo si alza
   * - gli argomenti sbagliati nel test tornano "da ripassare" subito */
  function applyRetake(state, result) {
    var day = today();
    Object.keys(result.perTopic).forEach(function (id) {
      var r = result.perTopic[id];
      var st = topicState(state, id);
      if (r.correct < r.total) {
        st.box = Math.min(st.box, 1);
        st.due = day;
      }
    });
    var cur = currentLevel(state);
    if (!state.level || U.levelIndex(result.workingLevel) > U.levelIndex(cur)) {
      state.level = result.workingLevel;
      state.levelHistory.push({ level: result.workingLevel, date: day, reason: 'placement' });
    }
    state.placements.push({
      date: day, estimated: result.estimated, workingLevel: result.workingLevel, correct: result.correct,
      total: result.total, perLevel: result.perLevel, perTopic: result.perTopic, retake: true
    });
  }

  function updateStreak(state) {
    var day = today();
    var s = state.streak;
    if (s.last === day) return s;
    if (s.last && U.daysBetween(s.last, day) === 1) s.count++;
    else s.count = 1;
    s.last = day;
    s.best = Math.max(s.best, s.count);
    return s;
  }

  function topicColor(state, id) {
    var t = state.topics[id];
    if (!t || t.seen === 0 && t.box === 0) return 'none';
    if (t.box >= CFG.ACQUIRED_BOX) return 'green';
    if (t.box >= 2) return 'yellow';
    return 'red';
  }

  return {
    CFG: CFG,
    topicState: topicState,
    tierForBox: tierForBox,
    isDue: isDue,
    topicsAt: topicsAt,
    usableTopics: usableTopics,
    currentLevel: currentLevel,
    recordAnswer: recordAnswer,
    applySession: applySession,
    levelProgress: levelProgress,
    recentAccuracy: recentAccuracy,
    checkLevelUp: checkLevelUp,
    levelUpStatus: levelUpStatus,
    initFromPlacement: initFromPlacement,
    applyRetake: applyRetake,
    updateStreak: updateStreak,
    topicColor: topicColor,
    _resetCache: _resetCache
  };
})();
