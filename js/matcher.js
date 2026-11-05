/* Confronto tra la risposta scritta dallo studente e le risposte accettate.
 * Ignora maiuscole, spazi doppi, punteggiatura, apostrofi "tipografici" e tratta
 * le contrazioni come forme estese (don't = do not, he's = he is / he has, ecc.).
 */
EC.matcher = (function () {
  'use strict';

  var PRON_S = '(he|she|it|that|there|what|who|where|here|how|this|when|why|everything|nobody|everyone|somebody|someone)';

  function basic(s) {
    return String(s === undefined || s === null ? '' : s)
      .toLowerCase()
      .replace(/[‘’‛`´′]/g, "'")
      .replace(/[“”«»"]/g, ' ')
      .replace(/[–—-]/g, ' ')
      .replace(/[.,!?;:()\[\]…]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Espansioni non ambigue
  var FIXED = [
    [/\bwon't\b/g, 'will not'],
    [/\bshan't\b/g, 'shall not'],
    [/\bcan't\b/g, 'cannot'],
    [/\bain't\b/g, 'is not'],
    [/\b(\w+)n't\b/g, '$1 not'],
    [/\bi'm\b/g, 'i am'],
    [/\b(\w+)'re\b/g, '$1 are'],
    [/\b(\w+)'ve\b/g, '$1 have'],
    [/\b(\w+)'ll\b/g, '$1 will'],
    [/\bcan not\b/g, 'cannot'],
    // contrazioni scritte senza apostrofo (errore di battitura frequente): le accettiamo
    [/\b(do|does|did|is|are|was|were|have|has|had|could|should|would|must|need)nt\b/g, '$1 not'],
    [/\bcant\b/g, 'cannot'],
    [/\bwont\b/g, 'will not'],
    [/\bim\b/g, 'i am'],
    [/\bive\b/g, 'i have'],
    [/\byoure\b/g, 'you are'],
    [/\btheyre\b/g, 'they are'],
    [/\blet's\b/g, 'let us'],
    [/\bgonna\b/g, 'going to'],
    [/\bwanna\b/g, 'want to']
  ];

  // Restituisce l'insieme di forme canoniche (le contrazioni ambigue 's e 'd danno 2 varianti).
  function forms(s) {
    var b = basic(s);
    FIXED.forEach(function (r) { b = b.replace(r[0], r[1]); });
    var out = [b];
    var reS = new RegExp('\\b' + PRON_S + "'s\\b");
    var reD = /\b(i|you|he|she|it|we|they|there|who)'d\b/;
    var guard = 0;
    var changed = true;
    while (changed && guard++ < 6) {
      changed = false;
      var next = [];
      out.forEach(function (f) {
        if (reS.test(f)) {
          next.push(f.replace(reS, '$1 is'), f.replace(reS, '$1 has'));
          changed = true;
        } else if (reD.test(f)) {
          next.push(f.replace(reD, '$1 would'), f.replace(reD, '$1 had'));
          changed = true;
        } else {
          next.push(f);
        }
      });
      out = next.slice(0, 32);
    }
    return EC.util.uniq(out.map(function (f) { return f.replace(/\s+/g, ' ').trim(); }));
  }

  function intersects(a, b) {
    for (var i = 0; i < a.length; i++) if (b.indexOf(a[i]) !== -1) return true;
    return false;
  }

  function same(a, b) {
    return intersects(forms(a), forms(b));
  }

  function isMatch(given, answers) {
    if (!basic(given)) return false;
    var g = forms(given);
    for (var i = 0; i < answers.length; i++) {
      if (intersects(g, forms(answers[i]))) return true;
    }
    return false;
  }

  // Nota specifica per una risposta sbagliata prevista (chiavi di "notes").
  function findNote(given, notes) {
    if (!notes) return null;
    var g = forms(given);
    var keys = Object.keys(notes);
    for (var i = 0; i < keys.length; i++) {
      if (intersects(g, forms(keys[i]))) return notes[keys[i]];
    }
    return null;
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    var prev = [], cur = [], pp = [];
    for (var j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) {
      cur = [i];
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        // due lettere invertite (becuase → because) contano come un solo errore
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) cur[j] = Math.min(cur[j], pp[j - 2] + 1);
      }
      pp = prev;
      prev = cur;
    }
    return prev[n];
  }

  // La risposta è "quasi giusta" (probabile errore di battitura o di ortografia)?
  function nearMiss(given, answers) {
    var g = basic(given);
    if (g.length < 3) return null;
    for (var i = 0; i < answers.length; i++) {
      var a = basic(answers[i]);
      var d = levenshtein(g, a);
      var limit = a.length >= 12 ? 2 : 1;
      if (d > 0 && d <= limit) return answers[i];
    }
    return null;
  }

  return {
    basic: basic,
    forms: forms,
    same: same,
    isMatch: isMatch,
    findNote: findNote,
    nearMiss: nearMiss,
    levenshtein: levenshtein
  };
})();
