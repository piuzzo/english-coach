/* Traduzione libera: l'app propone un breve testo in italiano, lo studente lo traduce frase per frase.
 *  - con l'AI: testo creato su misura (livello + argomenti deboli) e correzione frase per frase,
 *    con ogni errore spiegato (frammento sbagliato → correzione → perché → argomento)
 *  - senza AI: testi della banca (data/writing.js); se la traduzione coincide con una prevista è giusta,
 *    se contiene un errore tipico noto è sbagliata (con la spiegazione), altrimenti lo studente
 *    confronta con la traduzione modello e si autovaluta
 *  - ogni frase sbagliata va riscritta corretta; poi 1 esercizio di rinforzo per ciascun argomento
 *    sbagliato (al massimo CFG.DRILL_MAX), come la "variante" della sessione
 *  - a fine attività gli argomenti aggiornano le scatole Leitner (come una sessione) e il risultato
 *    finisce in state.writings
 * Tutto qui è puro (niente DOM): app.js disegna le schermate, ai.js fa le chiamate.
 */
EC.writing = (function () {
  'use strict';
  var U = EC.util;
  var L = EC.learner;
  var M = EC.matcher;

  var CFG = {
    SENTENCES: { A1: 4, A2: 4, B1: 5, 'B1+': 5 }, // frasi per testo generato dall'AI
    DRILL_MAX: 2, // esercizi di rinforzo dopo la correzione
    RECENT_TEXTS: 6, // un testo della banca fatto tra gli ultimi N non viene riproposto (se possibile)
    HISTORY: 200 // traduzioni conservate in state.writings
  };

  /* ---------- confronto ---------- */
  // La frase (normalizzata come fa il matcher) contiene "phrase" come sequenza di parole intere?
  function containsPhrase(given, phrase) {
    var g = M.forms(given), p = M.forms(phrase);
    for (var i = 0; i < g.length; i++) {
      for (var j = 0; j < p.length; j++) {
        if (p[j] && (' ' + g[i] + ' ').indexOf(' ' + p[j] + ' ') !== -1) return true;
      }
    }
    return false;
  }

  function topicOk(id) { return !!(id && EC.data.topicById[id]); }

  // Errori tipici della frase trovati nella traduzione
  function tipsFor(sentence, given) {
    var seen = {};
    return (sentence.tips || []).filter(function (t) {
      if (!t || !t.wrong || seen[t.right + '|' + t.why]) return false;
      if (!containsPhrase(given, t.wrong)) return false;
      seen[t.right + '|' + t.why] = true;
      return true;
    }).map(function (t) {
      return { wrong: t.wrong, right: t.right, why: t.why, topic: topicOk(t.topic) ? t.topic : (sentence.topics || [])[0] || null };
    });
  }

  /* Valutazione offline di una frase.
   * status: 'ok' | 'wrong' | 'check' (= non so dirlo: confronta con il modello e autovalutati) */
  function gradeSentence(sentence, given) {
    given = String(given || '').trim();
    var en = sentence.en || [];
    var r = { status: 'check', given: given, corrected: en[0] || '', model: en[0] || '', errors: [], comment: '', nearMiss: false, by: 'bank' };
    if (!M.basic(given)) {
      r.status = 'wrong';
      r.comment = 'Non hai scritto la traduzione di questa frase.';
      return r;
    }
    if (M.isMatch(given, en)) {
      r.status = 'ok';
      r.corrected = given;
      return r;
    }
    var tips = tipsFor(sentence, given);
    if (tips.length) {
      r.status = 'wrong';
      r.errors = tips;
      return r;
    }
    if (M.nearMiss(given, en)) r.nearMiss = true;
    return r;
  }

  function gradeOffline(text, answers) {
    return text.sentences.map(function (s, i) { return gradeSentence(s, (answers || [])[i]); });
  }

  /* Autovalutazione di una frase "check": ok = la mia traduzione era corretta. */
  function resolveCheck(result, ok) {
    if (!result || result.status !== 'check') return result;
    result.status = ok ? 'ok' : 'wrong';
    result.selfAssessed = true;
    if (ok) result.corrected = result.given;
    return result;
  }

  /* ---------- risultato della correzione AI → stesso formato della correzione offline ---------- */
  function str(x, max) { return typeof x === 'string' ? x.trim().slice(0, max || 600) : ''; }

  function fromAi(raw, text, answers) {
    var list = raw && Array.isArray(raw.sentences) ? raw.sentences : [];
    return text.sentences.map(function (s, i) {
      var given = String((answers || [])[i] || '').trim();
      var offline = gradeSentence(s, given);
      // frase vuota o identica a una traduzione prevista: non serve l'AI
      if (!M.basic(given) || offline.status === 'ok') return offline;
      var r = null;
      for (var k = 0; k < list.length; k++) {
        if (list[k] && +list[k].n === i + 1) { r = list[k]; break; }
      }
      if (!r || typeof r.acceptable !== 'boolean') return offline;
      var out = { status: 'ok', given: given, corrected: given, model: (s.en || [])[0] || '', errors: [], comment: str(r.comment), nearMiss: false, by: 'ai' };
      var better = str(r.better, 400);
      if (better && !M.isMatch(better, [given])) out.model = better;
      if (r.acceptable) return out;

      var corrected = str(r.corrected, 400);
      if (corrected && M.isMatch(corrected, [given])) return out; // "sbagliata" ma la correzione è identica: incoerente → giusta
      out.status = 'wrong';
      out.corrected = corrected || out.model;
      (Array.isArray(r.errors) ? r.errors : []).forEach(function (e) {
        if (!e) return;
        var w = str(e.wrong, 200), ri = str(e.right, 200), why = str(e.why, 600);
        if (!why || (!w && !ri)) return;
        out.errors.push({ wrong: w, right: ri, why: why, topic: topicOk(e.topic) ? e.topic : null });
      });
      if (!out.errors.length) {
        out.errors.push({ wrong: given, right: out.corrected, why: out.comment || 'Confronta la tua frase con quella corretta, parola per parola.', topic: null });
      }
      return out;
    });
  }

  /* ---------- testo generato dall'AI → stesso formato della banca ---------- */
  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36);
  }

  function sanitizeText(raw, opts) {
    opts = opts || {};
    var allowed = opts.topics || L.usableTopics().map(function (t) { return t.id; });
    if (!raw || !Array.isArray(raw.sentences)) return null;
    var sentences = [];
    raw.sentences.forEach(function (s) {
      if (!s) return;
      var it = str(s.it, 300);
      var en = U.uniq((Array.isArray(s.en) ? s.en : []).map(function (x) { return str(x, 300); }).filter(Boolean)).slice(0, 8);
      var topics = U.uniq((Array.isArray(s.topics) ? s.topics : []).filter(function (t) { return allowed.indexOf(t) !== -1; }));
      if (!it || !en.length || !topics.length) return;
      var tips = (Array.isArray(s.tips) ? s.tips : []).map(function (t) {
        return t && { wrong: str(t.wrong, 120), right: str(t.right, 120), why: str(t.why, 400), topic: allowed.indexOf(t.topic) !== -1 ? t.topic : topics[0] };
      }).filter(function (t) {
        // un "errore tipico" che compare in una traduzione giusta va scartato
        return t && t.wrong && t.right && t.why && !en.some(function (a) { return containsPhrase(a, t.wrong); });
      }).slice(0, 8);
      sentences.push({ it: it, en: en, topics: topics, explanation: str(s.explanation, 600) || 'Confronta la tua traduzione con quella proposta.', tips: tips });
    });
    if (sentences.length < 2) return null;
    sentences = sentences.slice(0, 8);
    var title = str(raw.title, 80) || 'Testo da tradurre';
    return {
      id: 'wai_' + hash(title + '|' + sentences.map(function (s) { return s.it; }).join('|')),
      level: EC.LEVELS.indexOf(opts.level) !== -1 ? opts.level : 'A1',
      title: title,
      sentences: sentences,
      ai: true
    };
  }

  /* ---------- scelta del testo ---------- */
  // Argomenti su cui puntare: errori delle ultime traduzioni non ancora consolidati, poi i più deboli.
  function focusTopics(state, n) {
    n = n || 4;
    var out = [];
    (state.writings || []).slice(-3).reverse().forEach(function (w) {
      Object.keys(w.perTopic || {}).forEach(function (id) {
        if (w.perTopic[id].wrong && topicOk(id) && L.topicState(state, id).box <= 2 && out.indexOf(id) === -1) out.push(id);
      });
    });
    EC.session.weakTopics(state, n + 2).forEach(function (t) { if (out.indexOf(t.id) === -1) out.push(t.id); });
    var li = U.levelIndex(L.currentLevel(state));
    return out.filter(function (id) {
      var t = EC.data.topicById[id];
      return t && t.area !== 'reading' && U.levelIndex(t.level) <= li;
    }).slice(0, n);
  }

  function lastDone(state, textId) {
    var w = (state.writings || []).filter(function (x) { return x.textId === textId; });
    return w.length ? w[w.length - 1].start : 0;
  }

  function pickText(state, rng) {
    rng = rng || U.rng;
    var li = U.levelIndex(L.currentLevel(state));
    var recent = (state.writings || []).slice(-CFG.RECENT_TEXTS).map(function (w) { return w.textId; });
    var focus = focusTopics(state, 4);
    var cands = [];
    for (var l = li; l >= 0 && !cands.length; l--) {
      cands = EC.data.texts.filter(function (t) { return t.level === EC.LEVELS[l] && recent.indexOf(t.id) === -1; });
    }
    if (!cands.length) cands = EC.data.texts.filter(function (t) { return U.levelIndex(t.level) <= Math.max(li, 0); });
    if (!cands.length) cands = EC.data.texts.slice();
    if (!cands.length) return null;
    var scored = cands.map(function (t) {
      var hits = 0;
      t.sentences.forEach(function (s) { (s.topics || []).forEach(function (id) { if (focus.indexOf(id) !== -1) hits++; }); });
      return { t: t, last: lastDone(state, t.id), hits: hits, r: rng() };
    });
    scored.sort(function (a, b) { return (a.last - b.last) || (b.hits - a.hits) || (a.r - b.r); });
    return scored[0].t;
  }

  /* ---------- attività in corso (salvata in state.activeWriting) ---------- */
  function start(state, text, source) {
    state.activeWriting = {
      start: U.now(),
      level: L.currentLevel(state),
      text: U.clone(text),
      source: source || (text.ai ? 'ai' : 'bank'),
      answers: text.sentences.map(function () { return ''; }),
      results: null,
      drill: []
    };
    return state.activeWriting;
  }

  function setAnswers(state, answers) {
    var w = state.activeWriting;
    if (!w) return null;
    w.answers = w.text.sentences.map(function (s, i) { return String((answers || [])[i] || ''); });
    return w;
  }

  function setResults(state, results) {
    var w = state.activeWriting;
    if (!w) return null;
    w.results = results;
    return w;
  }

  // La traduzione riscritta corrisponde alla frase corretta?
  function retypeOk(result, s, typed) {
    var accepted = [result.corrected];
    if (result.model) accepted.push(result.model);
    if (s && s.en) accepted = accepted.concat(s.en);
    return M.isMatch(typed, accepted.filter(Boolean));
  }

  // Argomenti da rinforzare: quelli degli errori (o della frase, se l'errore non ne ha)
  function wrongTopics(w) {
    var out = [];
    (w.results || []).forEach(function (r, i) {
      if (r.status !== 'wrong') return;
      var ids = r.errors.map(function (e) { return e.topic; }).filter(topicOk);
      if (!ids.length && (!r.errors.length || r.selfAssessed || !M.basic(r.given))) ids = (w.text.sentences[i].topics || []).filter(topicOk);
      ids.forEach(function (id) { if (out.indexOf(id) === -1) out.push(id); });
    });
    return out;
  }

  function drillTopics(w) {
    return wrongTopics(w).filter(function (id) {
      return EC.data.topicById[id].area !== 'reading' && EC.data.items.some(function (i) { return i.topic === id; });
    }).slice(0, CFG.DRILL_MAX);
  }

  /* Esercizio di rinforzo dalla banca, sullo stesso argomento (preferibilmente da scrivere). */
  function drillItem(state, topicId, rng, exclude) {
    rng = rng || U.rng;
    exclude = exclude || {};
    var tier = L.tierForBox(L.topicState(state, topicId).box);
    var bank = EC.data.items.filter(function (i) { return i.topic === topicId && !exclude[i.id]; });
    if (!bank.length) return null;
    var typed = bank.filter(function (i) { return ['translate', 'transform', 'error', 'gap'].indexOf(i.type) !== -1; });
    var pool = typed.length ? typed : bank;
    var best = null;
    pool.forEach(function (i) {
      var rec = state.items[i.id];
      var score = Math.abs(i.difficulty - tier) * 10 + (i.type === 'translate' ? 0 : 1) + (rec ? Math.min(5, rec.n) * 2 : 0) + rng();
      if (!best || score < best.score) best = { it: i, score: score };
    });
    return best.it;
  }

  function recordDrill(state, item, correct) {
    var w = state.activeWriting;
    if (!w) return;
    w.drill.push({ itemId: item.id, topic: item.topic, correct: !!correct });
    L.recordAnswer(state, item, !!correct);
  }

  /* Conclude l'attività: aggiorna argomenti, serie di giorni e storico. */
  function finish(state) {
    var w = state.activeWriting;
    if (!w || !w.results) return null;
    var perTopic = {};
    function add(id, ok) {
      if (!topicOk(id)) return;
      var p = perTopic[id] || (perTopic[id] = { correct: 0, wrong: 0 });
      if (ok) p.correct++; else p.wrong++;
    }
    var errors = [];
    var correct = 0;
    w.results.forEach(function (r, i) {
      var s = w.text.sentences[i];
      var pseudo = function (topic) { return { id: 'wr_' + w.text.id + '_' + i, topic: topic }; };
      if (r.status === 'ok') {
        correct++;
        (s.topics || []).forEach(function (id) { add(id, true); if (topicOk(id)) L.recordAnswer(state, pseudo(id), true); });
        return;
      }
      var ids = r.errors.map(function (e) { return e.topic; }).filter(topicOk);
      if (!ids.length && (!r.errors.length || r.selfAssessed || !M.basic(r.given))) ids = (s.topics || []).filter(topicOk);
      U.uniq(ids).forEach(function (id) { add(id, false); L.recordAnswer(state, pseudo(id), false); });
      errors.push({
        it: s.it, given: r.given, corrected: r.corrected,
        details: r.errors.slice(0, 6).map(function (e) { return { wrong: e.wrong, right: e.right, why: e.why, topic: e.topic }; })
      });
    });
    w.drill.forEach(function (d) { add(d.topic, d.correct); });

    var changes = L.applySession(state, perTopic);
    L.updateStreak(state);
    var end = U.now();
    var summary = {
      date: U.today(),
      start: w.start,
      end: end,
      minutes: Math.max(1, Math.round((end - w.start) / 60000)),
      level: w.level || L.currentLevel(state),
      textId: w.text.id,
      title: w.text.title,
      source: w.source,
      total: w.results.length,
      correct: correct,
      perTopic: perTopic,
      errors: errors,
      drill: w.drill.map(function (d) { return { topic: d.topic, correct: d.correct }; }),
      boxChanges: changes
    };
    if (!Array.isArray(state.writings)) state.writings = [];
    state.writings.push(summary);
    if (state.writings.length > CFG.HISTORY) state.writings = state.writings.slice(-CFG.HISTORY);
    state.activeWriting = null;
    return summary;
  }

  return {
    CFG: CFG,
    containsPhrase: containsPhrase,
    tipsFor: tipsFor,
    gradeSentence: gradeSentence,
    gradeOffline: gradeOffline,
    resolveCheck: resolveCheck,
    fromAi: fromAi,
    sanitizeText: sanitizeText,
    focusTopics: focusTopics,
    pickText: pickText,
    start: start,
    setAnswers: setAnswers,
    setResults: setResults,
    retypeOk: retypeOk,
    wrongTopics: wrongTopics,
    drillTopics: drillTopics,
    drillItem: drillItem,
    recordDrill: recordDrill,
    finish: finish
  };
})();
