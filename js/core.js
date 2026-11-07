/* English Coach — core: namespace, registro dei contenuti, utilità.
 * Script "classico" (non modulo) così funziona aprendo index.html con doppio clic (file://).
 * Lo stesso file viene caricato anche da Node per i test (vedi tests/load.js).
 */
var EC = (function (g) {
  'use strict';
  var EC = g.EC || {};
  EC.version = '1.0.0';
  EC.LEVELS = ['A1', 'A2', 'B1', 'B1+'];
  EC.TYPES = ['mc', 'gap', 'error', 'order', 'transform', 'translate'];

  EC.data = EC.data || {
    topics: [],
    topicById: {},
    items: [],
    itemById: {},
    passages: {},
    texts: [], // testi italiani da tradurre (traduzione libera), vedi data/writing.js
    textById: {},
    problems: [] // errori di caricamento (id duplicati, ecc.)
  };

  /* Testi per la traduzione libera: { id, level, title, sentences: [{ it, en: [...], topics: [...], explanation, tips }] } */
  EC.addTexts = function (list, source) {
    list.forEach(function (t) {
      if (!t || !t.id) {
        EC.data.problems.push('Testo senza id in ' + (source || '?'));
        return;
      }
      if (EC.data.textById[t.id]) {
        EC.data.problems.push('Testo duplicato: ' + t.id);
        return;
      }
      if (source) t._source = source;
      EC.data.texts.push(t);
      EC.data.textById[t.id] = t;
    });
  };

  EC.addTopics = function (list) {
    list.forEach(function (t) {
      if (EC.data.topicById[t.id]) {
        EC.data.problems.push('Argomento duplicato: ' + t.id);
        return;
      }
      EC.data.topics.push(t);
      EC.data.topicById[t.id] = t;
    });
  };

  EC.addItems = function (list, source) {
    list.forEach(function (it) {
      if (!it || !it.id) {
        EC.data.problems.push('Item senza id in ' + (source || '?'));
        return;
      }
      if (EC.data.itemById[it.id]) {
        EC.data.problems.push('Id duplicato: ' + it.id);
        return;
      }
      if (source) it._source = source;
      EC.data.items.push(it);
      EC.data.itemById[it.id] = it;
    });
  };

  /* Un testo di lettura diventa N item di tipo "mc" (uno per domanda) collegati al testo. */
  EC.addPassages = function (list, source) {
    list.forEach(function (p) {
      if (EC.data.passages[p.id]) {
        EC.data.problems.push('Testo duplicato: ' + p.id);
        return;
      }
      EC.data.passages[p.id] = p;
      var items = (p.questions || []).map(function (q, i) {
        return {
          id: p.id + '_q' + (i + 1),
          topic: p.topic,
          difficulty: q.difficulty || p.difficulty || 1,
          type: 'mc',
          passage: p.id,
          prompt: q.q,
          options: q.options,
          answers: [q.answer],
          explanation: q.explanation,
          notes: q.notes || {},
          group: p.id
        };
      });
      EC.addItems(items, source);
    });
  };

  /* ---------- utilità ---------- */
  var U = (EC.util = {});

  // Generatore pseudo-casuale con seme (mulberry32): utile per i test riproducibili.
  U.makeRng = function (seed) {
    if (seed === undefined || seed === null) return Math.random;
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  U.rng = Math.random; // sostituibile nei test

  U.randInt = function (n, rng) {
    return Math.floor((rng || U.rng)() * n);
  };
  U.pick = function (arr, rng) {
    return arr[U.randInt(arr.length, rng)];
  };
  U.shuffle = function (arr, rng) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = U.randInt(i + 1, rng);
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  };
  // pairs: [[valore, peso], ...]
  U.weightedPick = function (pairs, rng) {
    var tot = 0;
    pairs.forEach(function (p) { tot += Math.max(0, p[1]); });
    if (tot <= 0) return pairs.length ? pairs[0][0] : undefined;
    var r = (rng || U.rng)() * tot;
    for (var i = 0; i < pairs.length; i++) {
      r -= Math.max(0, pairs[i][1]);
      if (r < 0) return pairs[i][0];
    }
    return pairs[pairs.length - 1][0];
  };
  U.uniq = function (arr) {
    var seen = {};
    return arr.filter(function (x) {
      var k = typeof x === 'string' ? x : JSON.stringify(x);
      if (seen[k]) return false;
      seen[k] = true;
      return true;
    });
  };

  // Date in formato locale YYYY-MM-DD (il "giorno" è quello dell'orologio di casa).
  U.now = function () { return Date.now(); };
  U.dayString = function (ts) {
    var d = new Date(ts === undefined ? U.now() : ts);
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  };
  U.today = function () { return U.dayString(); };
  U.addDays = function (dayStr, n) {
    var p = dayStr.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2] + n, 12);
    return U.dayString(d.getTime());
  };
  U.daysBetween = function (a, b) {
    var pa = a.split('-'), pb = b.split('-');
    var da = Date.UTC(+pa[0], +pa[1] - 1, +pa[2]);
    var db = Date.UTC(+pb[0], +pb[1] - 1, +pb[2]);
    return Math.round((db - da) / 86400000);
  };

  U.levelIndex = function (lvl) { return EC.LEVELS.indexOf(lvl); };
  U.clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  U.escapeHtml = function (s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  g.EC = EC;
  return EC;
})(typeof window !== 'undefined' ? window : globalThis);
