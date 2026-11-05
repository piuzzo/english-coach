/* Generatori di esercizi "a modello": combinano soggetti, verbi, nomi e contesti
 * per produrre esercizi sempre nuovi, con spiegazione calcolata dalla regola.
 * Ogni generatore: { id, topic, tiers: [1,2,3], make(tier, rng) → item }
 */
EC.generators = (function () {
  'use strict';
  var U = EC.util;

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36);
  }
  function finish(gen, tier, item) {
    item.topic = gen.topic;
    item.difficulty = tier;
    item.generated = true;
    item.generator = gen.id;
    item.id = 'gen_' + gen.id + '_' + hash(item.type + '|' + item.prompt + '|' + item.answers[0]);
    if (!item.group) item.group = 'gen_' + gen.id;
    if (item.type === 'mc') {
      // opzioni uniche e mescolate; la risposta deve esserci
      item.options = U.shuffle(U.uniq(item.options));
    }
    return item;
  }
  function notesFor(options, correct, fn) {
    var n = {};
    options.forEach(function (o) { if (o !== correct) n[o] = fn(o); });
    return n;
  }

  /* ---------------- dati condivisi ---------------- */
  // Soggetti: p = persona (1s, 2, 3s, 1p, 3p); proper = nome proprio (non va in minuscolo)
  var SUBJECTS = [
    { en: 'I', p: '1s', it: 'io' },
    { en: 'You', p: '2', it: 'tu' },
    { en: 'He', p: '3s', it: 'lui' },
    { en: 'She', p: '3s', it: 'lei' },
    { en: 'My brother', p: '3s', it: 'mio fratello' },
    { en: 'Our teacher', p: '3s', it: 'il nostro insegnante' },
    { en: 'Anna', p: '3s', proper: true, it: 'Anna' },
    { en: 'Luca', p: '3s', proper: true, it: 'Luca' },
    { en: 'My best friend', p: '3s', it: 'il mio migliore amico' },
    { en: 'We', p: '1p', it: 'noi' },
    { en: 'They', p: '3p', it: 'loro' },
    { en: 'My parents', p: '3p', it: 'i miei genitori' },
    { en: 'My friends', p: '3p', it: 'i miei amici' },
    { en: 'The twins', p: '3p', it: 'i gemelli' }
  ];
  function subjLower(s) { return s.en === 'I' || s.proper ? s.en : s.en.charAt(0).toLowerCase() + s.en.slice(1); }
  function is3s(s) { return s.p === '3s'; }
  function beFor(s) { return s.p === '1s' ? 'am' : is3s(s) ? 'is' : 'are'; }
  function wasFor(s) { return s.p === '1s' || is3s(s) ? 'was' : 'were'; }

  // Verbi con tutte le forme scritte a mano (niente regole automatiche: niente sorprese).
  // sp = come si forma la 3ª persona: 's' | 'es' | 'ies' | 'irr'
  var VERBS = [
    { b: 'play', s: 'plays', sp: 's', ing: 'playing', past: 'played', pp: 'played', obj: 'football', when: ['after school', 'on Saturdays', 'every week'] },
    { b: 'watch', s: 'watches', sp: 'es', ing: 'watching', past: 'watched', pp: 'watched', obj: 'TV', when: ['in the evening', 'after dinner', 'every night'] },
    { b: 'go', s: 'goes', sp: 'es', ing: 'going', past: 'went', pp: 'gone', obj: 'to the gym', when: ['twice a week', 'on Mondays', 'after school'] },
    { b: 'study', s: 'studies', sp: 'ies', ing: 'studying', past: 'studied', pp: 'studied', obj: 'maths', when: ['every afternoon', 'in the library', 'before a test'] },
    { b: 'have', s: 'has', sp: 'irr', ing: 'having', past: 'had', pp: 'had', obj: 'lunch at school', when: ['every day', 'on weekdays'] },
    { b: 'wash', s: 'washes', sp: 'es', ing: 'washing', past: 'washed', pp: 'washed', obj: 'the car', when: ['on Sundays', 'once a month'] },
    { b: 'catch', s: 'catches', sp: 'es', ing: 'catching', past: 'caught', pp: 'caught', obj: 'the bus', when: ['every morning', 'at half past seven'] },
    { b: 'fix', s: 'fixes', sp: 'es', ing: 'fixing', past: 'fixed', pp: 'fixed', obj: 'old bikes', when: ['at the weekend', 'in the garage'] },
    { b: 'read', s: 'reads', sp: 's', ing: 'reading', past: 'read', pp: 'read', obj: 'comics', when: ['in bed', 'on the train', 'every evening'] },
    { b: 'swim', s: 'swims', sp: 's', ing: 'swimming', past: 'swam', pp: 'swum', obj: 'in the sea', when: ['in summer', 'every July'] },
    { b: 'run', s: 'runs', sp: 's', ing: 'running', past: 'ran', pp: 'run', obj: 'in the park', when: ['every morning', 'on Sundays'] },
    { b: 'write', s: 'writes', sp: 's', ing: 'writing', past: 'wrote', pp: 'written', obj: 'songs', when: ['in his free time', 'at night'], needs3sMale: true },
    { b: 'make', s: 'makes', sp: 's', ing: 'making', past: 'made', pp: 'made', obj: 'pizza', when: ['on Friday evenings', 'for dinner'] },
    { b: 'eat', s: 'eats', sp: 's', ing: 'eating', past: 'ate', pp: 'eaten', obj: 'fruit', when: ['every day', 'for breakfast'] },
    { b: 'ride', s: 'rides', sp: 's', ing: 'riding', past: 'rode', pp: 'ridden', obj: 'a bike', when: ['to school', 'at the weekend'] },
    { b: 'take', s: 'takes', sp: 's', ing: 'taking', past: 'took', pp: 'taken', obj: 'a lot of photos', when: ['on holiday', 'at parties'] },
    { b: 'buy', s: 'buys', sp: 's', ing: 'buying', past: 'bought', pp: 'bought', obj: 'bread', when: ['every morning', 'at the corner shop'] },
    { b: 'fly', s: 'flies', sp: 'ies', ing: 'flying', past: 'flew', pp: 'flown', obj: 'to London', when: ['every summer', 'twice a year'] },
    { b: 'listen', s: 'listens', sp: 's', ing: 'listening', past: 'listened', pp: 'listened', obj: 'to music', when: ['on the bus', 'while doing homework'] },
    { b: 'tidy', s: 'tidies', sp: 'ies', ing: 'tidying', past: 'tidied', pp: 'tidied', obj: 'the kitchen', when: ['after dinner', 'on Saturdays'] },
    { b: 'carry', s: 'carries', sp: 'ies', ing: 'carrying', past: 'carried', pp: 'carried', obj: 'a heavy backpack', when: ['to school', 'every day'] },
    { b: 'miss', s: 'misses', sp: 'es', ing: 'missing', past: 'missed', pp: 'missed', obj: 'the bus', when: ['on Mondays', 'quite often'] },
    { b: 'teach', s: 'teaches', sp: 'es', ing: 'teaching', past: 'taught', pp: 'taught', obj: 'English', when: ['at a secondary school', 'in the evenings'] },
    { b: 'speak', s: 'speaks', sp: 's', ing: 'speaking', past: 'spoke', pp: 'spoken', obj: 'French', when: ['at home', 'with our cousins'] },
    { b: 'sing', s: 'sings', sp: 's', ing: 'singing', past: 'sang', pp: 'sung', obj: 'in a choir', when: ['on Thursdays', 'every week'] },
    { b: 'draw', s: 'draws', sp: 's', ing: 'drawing', past: 'drew', pp: 'drawn', obj: 'cartoons', when: ['in the evenings', 'during the holidays'] },
    { b: 'meet', s: 'meets', sp: 's', ing: 'meeting', past: 'met', pp: 'met', obj: 'friends in the square', when: ['on Saturday evenings', 'after school'] },
    { b: 'send', s: 'sends', sp: 's', ing: 'sending', past: 'sent', pp: 'sent', obj: 'a lot of messages', when: ['every day', 'at night'] },
    { b: 'get', s: 'gets', sp: 's', ing: 'getting', past: 'got', pp: 'got', obj: 'up early', when: ['on school days', 'every morning'] },
    { b: 'come', s: 'comes', sp: 's', ing: 'coming', past: 'came', pp: 'come', obj: 'home late', when: ['on Fridays', 'after training'] },
    { b: 'leave', s: 'leaves', sp: 's', ing: 'leaving', past: 'left', pp: 'left', obj: 'home', when: ['at seven', 'before eight'] },
    { b: 'lose', s: 'loses', sp: 's', ing: 'losing', past: 'lost', pp: 'lost', obj: 'the keys', when: ['all the time', 'quite often'] },
    { b: 'sleep', s: 'sleeps', sp: 's', ing: 'sleeping', past: 'slept', pp: 'slept', obj: 'a lot', when: ['at the weekend', 'on holiday'] },
    { b: 'drink', s: 'drinks', sp: 's', ing: 'drinking', past: 'drank', pp: 'drunk', obj: 'orange juice', when: ['for breakfast', 'every morning'] },
    { b: 'build', s: 'builds', sp: 's', ing: 'building', past: 'built', pp: 'built', obj: 'model planes', when: ['in the garage', 'at the weekend'] },
    { b: 'chat', s: 'chats', sp: 's', ing: 'chatting', past: 'chatted', pp: 'chatted', obj: 'online', when: ['in the evening', 'after school'] },
    { b: 'stop', s: 'stops', sp: 's', ing: 'stopping', past: 'stopped', pp: 'stopped', obj: 'at the café', when: ['on the way home', 'after school'] },
    { b: 'dance', s: 'dances', sp: 's', ing: 'dancing', past: 'danced', pp: 'danced', obj: 'at parties', when: ['all night', 'every weekend'] },
    { b: 'try', s: 'tries', sp: 'ies', ing: 'trying', past: 'tried', pp: 'tried', obj: 'new recipes', when: ['at the weekend', 'every month'] },
    { b: 'plan', s: 'plans', sp: 's', ing: 'planning', past: 'planned', pp: 'planned', obj: 'trips', when: ['every spring', 'with friends'] }
  ];
  // Alcune espressioni contengono "his": le usiamo solo con soggetti maschili singolari → semplifico togliendole.
  VERBS.forEach(function (v) { v.when = v.when.filter(function (w) { return w.indexOf('his ') === -1; }); if (!v.when.length) v.when = ['every day']; });

  var IRREGULAR = VERBS.filter(function (v) { return v.past !== v.b + 'ed' && v.past !== v.b + 'd' && !/ied$/.test(v.past) && !/(pped|tted|nned)$/.test(v.past); });
  var REGULAR = VERBS.filter(function (v) { return IRREGULAR.indexOf(v) === -1; });

  function wrongThird(v) {
    // forma della 3ª persona "sbagliata ma plausibile"
    if (v.sp === 'es') return v.b + 's';
    if (v.sp === 'ies') return v.b + 's';
    if (v.sp === 'irr') return v.b + 's';
    return null;
  }
  function thirdRule(v) {
    switch (v.sp) {
      case 'es': return 'I verbi che finiscono in -s, -sh, -ch, -x, -o aggiungono -es: ' + v.b + ' → ' + v.s + '.';
      case 'ies': return 'Se il verbo finisce con consonante + y, la y diventa -ies: ' + v.b + ' → ' + v.s + '.';
      case 'irr': return 'Have alla terza persona diventa has.';
      default: return 'Si aggiunge semplicemente -s: ' + v.b + ' → ' + v.s + '.';
    }
  }
  function regularPastRule(v) {
    if (/ied$/.test(v.past)) return 'Consonante + y → -ied: ' + v.b + ' → ' + v.past + '.';
    if (/(pped|tted|nned)$/.test(v.past)) return 'Verbo corto che finisce con consonante-vocale-consonante: la consonante finale raddoppia: ' + v.b + ' → ' + v.past + '.';
    if (/e$/.test(v.b)) return 'Il verbo finisce già in -e, quindi basta aggiungere -d: ' + v.b + ' → ' + v.past + '.';
    return 'Verbo regolare: si aggiunge -ed: ' + v.b + ' → ' + v.past + '.';
  }
  function naivePast(v) {
    // l'errore tipico: trattare il verbo come regolare o sbagliare l'ortografia
    if (IRREGULAR.indexOf(v) !== -1) return /e$/.test(v.b) ? v.b + 'd' : v.b + 'ed'; // maked, goed
    if (/[^aeiou]y$/.test(v.b)) return v.b + 'ed'; // studyed
    if (/(pped|tted|nned)$/.test(v.past)) return v.b + 'ed'; // stoped
    return null; // play → played, dance → danced: nessun errore di ortografia plausibile
  }

  var PAST_TIMES = ['yesterday', 'last Saturday', 'two days ago', 'last summer', 'on Monday', 'last night', 'three weeks ago'];

  /* ================= GENERATORI ================= */
  var G = [];

  /* ---------- present simple: 3ª persona, do/does ---------- */
  G.push({
    id: 'ps', topic: 'present_simple', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var v = U.pick(VERBS, rng);
      var s = U.pick(SUBJECTS, rng);
      var when = U.pick(v.when, rng);
      var third = is3s(s);
      var form = third ? v.s : v.b;
      var expl3 = third
        ? 'Con "' + s.en + '" (= he/she/it) il present simple vuole la -s. ' + thirdRule(v)
        : 'Con "' + s.en + '" il verbo al present simple resta nella forma base: ' + v.b + '. La -s si aggiunge solo con he/she/it.';
      if (tier === 1) {
        var opts = [form, third ? v.b : v.s, v.ing, (third ? 'is ' : (s.p === '1s' ? 'am ' : 'are ')) + v.b];
        return finish(this, 1, {
          type: 'mc', group: 'ps_third_s',
          prompt: s.en + ' ___ ' + v.obj + ' ' + when + '.',
          options: opts, answers: [form], explanation: expl3,
          notes: notesFor(opts, form, function (o) {
            if (o === v.ing) return 'La forma -ing da sola non è un tempo verbale. Per un\'abitudine (' + when + ') si usa il present simple.';
            if (/^(is|am|are) /.test(o)) return 'Al present simple non si mette il verbo essere davanti al verbo: si dice "' + s.en + ' ' + form + '".';
            if (o === v.b) return 'Manca la -s: con he/she/it il present simple vuole la -s (' + v.s + ').';
            return 'Con "' + s.en + '" non si aggiunge la -s: la -s va solo con he/she/it.';
          })
        });
      }
      if (tier === 2) {
        var notes = {};
        if (third) {
          notes[v.b] = 'Manca la -s della terza persona: ' + v.s + '.';
          var w = wrongThird(v);
          if (w && w !== v.s) notes[w] = 'Ortografia: ' + thirdRule(v);
        } else {
          notes[v.s] = 'La -s si aggiunge solo con he/she/it. Con "' + s.en + '" si usa la forma base: ' + v.b + '.';
        }
        notes[v.ing] = 'Per un\'abitudine si usa il present simple, non la forma -ing.';
        return finish(this, 2, {
          type: 'gap', group: 'ps_third_s',
          prompt: s.en + ' ___ (' + v.b + ') ' + v.obj + ' ' + when + '.',
          answers: [form], explanation: expl3, notes: notes
        });
      }
      // tier 3: negativa o domanda
      var negative = U.randInt(2, rng) === 0 || s.p === '1s';
      var aux = third ? 'does' : 'do';
      var affirm = s.en + ' ' + form + ' ' + v.obj + ' ' + when + '.';
      if (negative) {
        var ans = s.en + ' ' + aux + 'n\'t ' + v.b + ' ' + v.obj + ' ' + when + '.';
        var n3 = {};
        if (third) {
          n3[s.en + ' doesn\'t ' + v.s + ' ' + v.obj + ' ' + when] = 'Dopo doesn\'t il verbo torna alla forma base: ' + v.b + ', non ' + v.s + '.';
          n3[s.en + ' don\'t ' + v.b + ' ' + v.obj + ' ' + when] = 'Con he/she/it la negativa si fa con doesn\'t, non con don\'t.';
        } else {
          n3[s.en + ' doesn\'t ' + v.b + ' ' + v.obj + ' ' + when] = 'Con "' + s.en + '" si usa don\'t; doesn\'t è solo per he/she/it.';
        }
        n3[s.en + ' not ' + form + ' ' + v.obj + ' ' + when] = 'In inglese "not" da solo non basta: serve l\'ausiliare ' + aux + 'n\'t + verbo base.';
        return finish(this, 3, {
          type: 'transform', group: 'ps_negative', instruction: 'Volgi alla forma negativa.',
          prompt: affirm, answers: [ans],
          explanation: 'Negativa del present simple: ' + (third ? 'doesn\'t' : 'don\'t') + ' + verbo base (' + v.b + '). ' + (third ? 'La -s "passa" all\'ausiliare does, quindi il verbo perde la -s.' : ''),
          notes: n3
        });
      }
      var q = cap(aux) + ' ' + subjLower(s) + ' ' + v.b + ' ' + v.obj + ' ' + when + '?';
      var nq = {};
      if (third) {
        nq['Does ' + subjLower(s) + ' ' + v.s + ' ' + v.obj + ' ' + when] = 'Dopo does il verbo resta alla forma base (' + v.b + '): la -s è già in does.';
        nq['Do ' + subjLower(s) + ' ' + v.b + ' ' + v.obj + ' ' + when] = 'Con he/she/it la domanda si fa con does, non do.';
      } else {
        nq['Does ' + subjLower(s) + ' ' + v.b + ' ' + v.obj + ' ' + when] = 'Con "' + s.en + '" la domanda si fa con do; does è solo per he/she/it.';
      }
      nq[cap(subjLower(s)) + ' ' + form + ' ' + v.obj + ' ' + when] = 'Per fare una domanda non basta il punto interrogativo: serve ' + cap(aux) + ' prima del soggetto.';
      return finish(this, 3, {
        type: 'transform', group: 'ps_question', instruction: 'Trasforma in domanda.',
        prompt: affirm, answers: [q],
        explanation: 'Domanda al present simple: ' + cap(aux) + ' + soggetto + verbo base (' + v.b + ').',
        notes: nq
      });
    }
  });

  /* ---------- past simple ---------- */
  G.push({
    id: 'past', topic: 'past_simple', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var irregular = U.randInt(3, rng) < 2;
      // esclusi i verbi con passato uguale alla base (read → read): l'esercizio sarebbe ambiguo
      var v = U.pick((irregular ? IRREGULAR : REGULAR).filter(function (x) { return x.past !== x.b; }), rng);
      var s = U.pick(SUBJECTS, rng);
      var time = U.pick(PAST_TIMES, rng);
      var rule = irregular
        ? '"' + v.b + '" è un verbo irregolare: il past simple è "' + v.past + '" (da imparare a memoria). Il past simple è uguale per tutte le persone.'
        : regularPastRule(v) + ' Il past simple è uguale per tutte le persone.';
      var naive = naivePast(v);
      if (tier === 1) {
        var opts = [v.past, v.b, naive || 'did ' + v.b, v.pp !== v.past ? v.pp : (is3s(s) ? v.s : v.ing)];
        return finish(this, 1, {
          type: 'mc', group: irregular ? 'past_irregular' : 'past_regular_spelling',
          prompt: s.en + ' ___ ' + v.obj + ' ' + time + '.',
          options: opts, answers: [v.past], explanation: 'Con "' + time + '" serve il past simple. ' + rule,
          notes: notesFor(opts, v.past, function (o) {
            if (o === v.b) return 'Questa è la forma base (presente). "' + cap(time) + '" indica il passato: serve ' + v.past + '.';
            if (o === 'did ' + v.b) return 'Did si usa solo nelle domande e nelle negative. Nella frase affermativa basta il verbo al passato: ' + v.past + '.';
            if (o === naive || o === v.b + 'ed') return irregular ? 'Errore tipico: "' + v.b + '" è irregolare, non prende -ed. Il past simple è ' + v.past + '.' : 'Ortografia: ' + regularPastRule(v);
            if (o === v.pp) return '"' + v.pp + '" è il participio passato (si usa con have: I have ' + v.pp + '). Da solo, al past simple, si usa ' + v.past + '.';
            return 'Questa forma è del presente; con "' + time + '" serve il past simple: ' + v.past + '.';
          })
        });
      }
      if (tier === 2) {
        var n = {};
        n[v.b] = 'È la forma base: con "' + time + '" serve il past simple (' + v.past + ').';
        if (naive && naive !== v.past) n[naive] = irregular ? '"' + v.b + '" è irregolare: ' + v.past + ', non ' + naive + '.' : 'Ortografia: ' + regularPastRule(v);
        if (v.pp !== v.past) n[v.pp] = '"' + v.pp + '" è il participio passato; il past simple è ' + v.past + '.';
        return finish(this, 2, {
          type: 'gap', group: irregular ? 'past_irregular' : 'past_regular_spelling',
          prompt: s.en + ' ___ (' + v.b + ') ' + v.obj + ' ' + time + '.',
          answers: [v.past], explanation: rule, notes: n
        });
      }
      var negative = U.randInt(2, rng) === 0;
      var affirm = s.en + ' ' + v.past + ' ' + v.obj + ' ' + time + '.';
      if (negative) {
        var nn = {};
        nn[s.en + ' didn\'t ' + v.past + ' ' + v.obj + ' ' + time] = 'Dopo didn\'t il verbo torna alla forma base: ' + v.b + ', non ' + v.past + '. Il passato è già "dentro" did.';
        nn[s.en + ' don\'t ' + v.b + ' ' + v.obj + ' ' + time] = 'Don\'t è del presente: al passato si usa didn\'t.';
        if (is3s(s)) nn[s.en + ' doesn\'t ' + v.b + ' ' + v.obj + ' ' + time] = 'Doesn\'t è del presente: al passato si usa didn\'t per tutte le persone.';
        return finish(this, 3, {
          type: 'transform', group: 'past_negative', instruction: 'Volgi alla forma negativa.',
          prompt: affirm, answers: [s.en + ' didn\'t ' + v.b + ' ' + v.obj + ' ' + time + '.'],
          explanation: 'Negativa del past simple: didn\'t + verbo base (' + v.b + '), per tutte le persone.',
          notes: nn
        });
      }
      var nq = {};
      nq['Did ' + subjLower(s) + ' ' + v.past + ' ' + v.obj + ' ' + time] = 'Dopo did il verbo resta alla forma base: ' + v.b + '. Errore tipico: "Did you went?".';
      nq[cap(subjLower(s)) + ' ' + v.past + ' ' + v.obj + ' ' + time] = 'Per la domanda serve Did prima del soggetto, non basta il punto interrogativo.';
      return finish(this, 3, {
        type: 'transform', group: 'past_question', instruction: 'Trasforma in domanda.',
        prompt: affirm, answers: ['Did ' + subjLower(s) + ' ' + v.b + ' ' + v.obj + ' ' + time + '?'],
        explanation: 'Domanda al past simple: Did + soggetto + verbo base (' + v.b + ').',
        notes: nq
      });
    }
  });

  /* ---------- present continuous ---------- */
  var PC_VERBS = VERBS.filter(function (v) { return ['have', 'get', 'lose', 'leave', 'miss', 'come', 'catch', 'teach', 'fly', 'plan', 'try', 'buy'].indexOf(v.b) === -1; });
  function wrongIng(v) {
    if (/[^e]e$/.test(v.b) && v.ing === v.b.slice(0, -1) + 'ing') return v.b + 'ing'; // makeing
    if (v.ing.length === v.b.length + 4 && v.ing.charAt(v.b.length) === v.b.charAt(v.b.length - 1)) return v.b + 'ing'; // swiming
    return null;
  }
  function ingRule(v) {
    if (/[^e]e$/.test(v.b) && v.ing === v.b.slice(0, -1) + 'ing') return 'Il verbo finisce in -e: la -e cade (' + v.b + ' → ' + v.ing + ').';
    if (v.ing.length === v.b.length + 4) return 'Verbo corto che finisce con consonante-vocale-consonante: la consonante raddoppia (' + v.b + ' → ' + v.ing + ').';
    return 'Si aggiunge -ing: ' + v.b + ' → ' + v.ing + '.';
  }
  G.push({
    id: 'pc', topic: 'present_continuous', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var v = U.pick(PC_VERBS, rng);
      var s = U.pick(SUBJECTS, rng);
      var be = beFor(s);
      var lead = U.pick(['Look! ', 'Listen! ', 'Right now ', 'At the moment ', ''], rng);
      var subj = lead === '' ? s.en : (s.en === 'I' || s.proper ? s.en : subjLower(s));
      if (lead === 'Look! ' || lead === 'Listen! ' || lead === '') subj = s.en;
      var tail = lead === '' ? ' now.' : '.';
      var form = be + ' ' + v.ing;
      var expl = 'Azione in corso adesso → present continuous: ' + be + ' + -ing. ' + ingRule(v);
      if (tier === 1) {
        var opts = [form, v.ing, is3s(s) ? v.s : v.b, (be === 'is' ? 'are ' : 'is ') + v.ing];
        return finish(this, 1, {
          type: 'mc', group: 'pc_form',
          prompt: lead + subj + ' ___ ' + v.obj + tail,
          options: opts, answers: [form], explanation: expl,
          notes: notesFor(opts, form, function (o) {
            if (o === v.ing) return 'Manca il verbo essere: il present continuous è ' + be + ' + -ing (errore tipico: "She reading").';
            if (o === v.b || o === v.s) return 'Il present simple indica un\'abitudine; qui l\'azione sta succedendo adesso, quindi serve ' + form + '.';
            return 'Il verbo essere deve concordare con il soggetto "' + s.en + '": ' + be + '.';
          })
        });
      }
      if (tier === 2) {
        var n = {};
        n[v.ing] = 'Manca ' + be + ': il present continuous è am/is/are + -ing.';
        n[is3s(s) ? v.s : v.b] = 'Qui l\'azione è in corso adesso: serve il present continuous (' + form + ').';
        var w = wrongIng(v);
        if (w) n[be + ' ' + w] = 'Ortografia: ' + ingRule(v);
        return finish(this, 2, {
          type: 'gap', group: 'pc_form',
          prompt: lead + subj + ' ___ (' + v.b + ') ' + v.obj + tail,
          answers: [form], explanation: expl, notes: n
        });
      }
      var affirm = s.en + ' ' + form + ' ' + v.obj + ' now.';
      var nn = {};
      nn[s.en + ' don\'t ' + v.ing + ' ' + v.obj + ' now'] = 'Nel present continuous la negativa si fa con il verbo essere: ' + be + ' not + -ing.';
      nn[s.en + ' doesn\'t ' + v.ing + ' ' + v.obj + ' now'] = 'Nel present continuous la negativa si fa con il verbo essere: ' + be + ' not + -ing.';
      return finish(this, 3, {
        type: 'transform', group: 'pc_negative', instruction: 'Volgi alla forma negativa.',
        prompt: affirm, answers: [s.en + ' ' + be + ' not ' + v.ing + ' ' + v.obj + ' now.'],
        explanation: 'Negativa del present continuous: ' + be + ' not (' + (be === 'am' ? '\'m not' : be + 'n\'t') + ') + -ing. Non si usa do/does.',
        notes: nn
      });
    }
  });

  /* ---------- plurali ---------- */
  var NOUNS = [
    { sg: 'book', pl: 'books', k: 's' }, { sg: 'girl', pl: 'girls', k: 's' }, { sg: 'key', pl: 'keys', k: 'vy' },
    { sg: 'boy', pl: 'boys', k: 'vy' }, { sg: 'day', pl: 'days', k: 'vy' }, { sg: 'box', pl: 'boxes', k: 'es' },
    { sg: 'bus', pl: 'buses', k: 'es' }, { sg: 'watch', pl: 'watches', k: 'es' }, { sg: 'dish', pl: 'dishes', k: 'es' },
    { sg: 'glass', pl: 'glasses', k: 'es' }, { sg: 'potato', pl: 'potatoes', k: 'o' }, { sg: 'tomato', pl: 'tomatoes', k: 'o' },
    { sg: 'photo', pl: 'photos', k: 'oex' }, { sg: 'piano', pl: 'pianos', k: 'oex' }, { sg: 'city', pl: 'cities', k: 'y' },
    { sg: 'baby', pl: 'babies', k: 'y' }, { sg: 'party', pl: 'parties', k: 'y' }, { sg: 'country', pl: 'countries', k: 'y' },
    { sg: 'knife', pl: 'knives', k: 'f' }, { sg: 'leaf', pl: 'leaves', k: 'f' }, { sg: 'shelf', pl: 'shelves', k: 'f' },
    { sg: 'wolf', pl: 'wolves', k: 'f' }, { sg: 'man', pl: 'men', k: 'irr' }, { sg: 'woman', pl: 'women', k: 'irr' },
    { sg: 'child', pl: 'children', k: 'irr' }, { sg: 'person', pl: 'people', k: 'irr' }, { sg: 'foot', pl: 'feet', k: 'irr' },
    { sg: 'tooth', pl: 'teeth', k: 'irr' }, { sg: 'mouse', pl: 'mice', k: 'irr' }, { sg: 'sheep', pl: 'sheep', k: 'same' },
    { sg: 'fish', pl: 'fish', k: 'same' }
  ];
  var NUMBERS = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'ten', 'twelve'];
  function pluralRule(n) {
    switch (n.k) {
      case 's': return 'Plurale regolare: si aggiunge -s (' + n.sg + ' → ' + n.pl + ').';
      case 'vy': return 'Vocale + y: si aggiunge solo -s (' + n.sg + ' → ' + n.pl + ').';
      case 'es': return 'Dopo -s, -ss, -sh, -ch, -x si aggiunge -es (' + n.sg + ' → ' + n.pl + ').';
      case 'o': return 'Alcuni nomi in -o aggiungono -es (' + n.sg + ' → ' + n.pl + ').';
      case 'oex': return 'Eccezione: ' + n.sg + ' aggiunge solo -s (' + n.pl + ').';
      case 'y': return 'Consonante + y: la y diventa -ies (' + n.sg + ' → ' + n.pl + ').';
      case 'f': return 'Molti nomi in -f/-fe fanno il plurale in -ves (' + n.sg + ' → ' + n.pl + ').';
      case 'same': return n.sg + ' ha il plurale uguale al singolare (one ' + n.sg + ', two ' + n.pl + ').';
      default: return 'Plurale irregolare da imparare: ' + n.sg + ' → ' + n.pl + '.';
    }
  }
  function naivePlural(n) {
    if (n.k === 's' || n.k === 'vy' || n.k === 'oex') {
      if (n.k === 'vy') return n.sg.slice(0, -1) + 'ies';
      return n.sg + 'es';
    }
    return n.sg + 's';
  }
  G.push({
    id: 'plural', topic: 'plurals', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var n = U.pick(NOUNS, rng);
      var num = U.pick(NUMBERS, rng);
      var place = U.pick(['in the picture', 'in the garden', 'in this story', 'on the poster'], rng);
      if (n.sg === 'shelf' || n.sg === 'knife' || n.sg === 'glass' || n.sg === 'dish') place = U.pick(['in the kitchen', 'in the cupboard'], rng);
      if (n.sg === 'foot' || n.sg === 'tooth') place = 'in the picture';
      var naive = naivePlural(n);
      if (tier === 1) {
        var opts = [n.pl, naive, n.sg];
        if (n.k === 'irr') opts.push(n.pl + 's');
        if (n.k === 'y') opts.push(n.sg.slice(0, -1) + 'ys');
        if (n.k === 'f') opts.push(n.sg + 'es');
        opts = U.uniq(opts.filter(function (o) { return o !== n.pl; })).slice(0, 3);
        opts.unshift(n.pl);
        if (n.k === 'same') opts = [n.pl, n.sg + 's', n.sg + 'es'];
        return finish(this, 1, {
          type: 'mc', group: 'plural_' + n.k,
          prompt: 'There are ' + num + ' ___ ' + place + '.',
          options: opts, answers: [n.pl], explanation: pluralRule(n),
          notes: notesFor(opts, n.pl, function (o) {
            if (o === n.sg && n.k !== 'same') return 'Con ' + num + ' serve il plurale: ' + n.pl + '.';
            return 'Questa forma non esiste. ' + pluralRule(n);
          })
        });
      }
      if (tier === 2) {
        var nn = {};
        if (naive !== n.pl) nn[naive] = pluralRule(n);
        if (n.k !== 'same') nn[n.sg] = 'Con ' + num + ' serve il plurale: ' + n.pl + '.';
        return finish(this, 2, {
          type: 'gap', group: 'plural_' + n.k,
          prompt: 'There are ' + num + ' ___ (' + n.sg + ') ' + place + '.',
          answers: [n.pl], explanation: pluralRule(n), notes: nn
        });
      }
      if (n.k === 'same') n = NOUNS[24]; // child: per l'errore serve un plurale diverso
      var wrong = naivePlural(n);
      return finish(this, 3, {
        type: 'error', group: 'plural_' + n.k, wrong: wrong,
        prompt: 'There are ' + num + ' ' + wrong + ' ' + place + '.',
        answers: ['There are ' + num + ' ' + n.pl + ' ' + place + '.'],
        explanation: 'L\'errore è "' + wrong + '". ' + pluralRule(n)
      });
    }
  });

  /* ---------- comparativi e superlativi ---------- */
  // k: short | double | y | e | long | irr
  var ADJS = [
    { a: 'tall', c: 'taller', s: 'tallest', k: 'short', noun: 'tower', sup: 'It is the ___ ({a}) building in our town.' },
    { a: 'small', c: 'smaller', s: 'smallest', k: 'short', noun: 'room', sup: 'This is the ___ ({a}) room in the house.' },
    { a: 'old', c: 'older', s: 'oldest', k: 'short', noun: 'castle', sup: 'My grandad is the ___ ({a}) person in our family.' },
    { a: 'fast', c: 'faster', s: 'fastest', k: 'short', noun: 'train', sup: 'Usain Bolt was the ___ ({a}) runner in the world.' },
    { a: 'cheap', c: 'cheaper', s: 'cheapest', k: 'short', noun: 'phone', sup: 'This is the ___ ({a}) phone in the shop.' },
    { a: 'big', c: 'bigger', s: 'biggest', k: 'double', noun: 'dog', sup: 'Russia is the ___ ({a}) country in the world.' },
    { a: 'hot', c: 'hotter', s: 'hottest', k: 'double', noun: 'day', sup: 'Yesterday was the ___ ({a}) day of the year.' },
    { a: 'thin', c: 'thinner', s: 'thinnest', k: 'double', noun: 'book', sup: 'This is the ___ ({a}) book on the shelf.' },
    { a: 'happy', c: 'happier', s: 'happiest', k: 'y', noun: 'song', sup: 'It was the ___ ({a}) day of my life.' },
    { a: 'easy', c: 'easier', s: 'easiest', k: 'y', noun: 'exercise', sup: 'This is the ___ ({a}) exercise in the book.' },
    { a: 'funny', c: 'funnier', s: 'funniest', k: 'y', noun: 'film', sup: 'Marco is the ___ ({a}) boy in our class.' },
    { a: 'heavy', c: 'heavier', s: 'heaviest', k: 'y', noun: 'bag', sup: 'This is the ___ ({a}) bag I have ever carried.' },
    { a: 'nice', c: 'nicer', s: 'nicest', k: 'e', noun: 'café', sup: 'She is the ___ ({a}) teacher in the school.' },
    { a: 'large', c: 'larger', s: 'largest', k: 'e', noun: 'garden', sup: 'This is the ___ ({a}) park in the city.' },
    { a: 'expensive', c: 'more expensive', s: 'most expensive', k: 'long', noun: 'jacket', sup: 'This is the ___ ({a}) jacket in the shop.' },
    { a: 'interesting', c: 'more interesting', s: 'most interesting', k: 'long', noun: 'book', sup: 'History is the ___ ({a}) subject for me.' },
    { a: 'beautiful', c: 'more beautiful', s: 'most beautiful', k: 'long', noun: 'beach', sup: 'Venice is the ___ ({a}) city I have ever visited.' },
    { a: 'difficult', c: 'more difficult', s: 'most difficult', k: 'long', noun: 'test', sup: 'Maths is the ___ ({a}) subject for me.' },
    { a: 'dangerous', c: 'more dangerous', s: 'most dangerous', k: 'long', noun: 'road', sup: 'This is the ___ ({a}) road in the area.' },
    { a: 'popular', c: 'more popular', s: 'most popular', k: 'long', noun: 'game', sup: 'Football is the ___ ({a}) sport in Italy.' },
    { a: 'comfortable', c: 'more comfortable', s: 'most comfortable', k: 'long', noun: 'chair', sup: 'This is the ___ ({a}) chair in the house.' },
    { a: 'good', c: 'better', s: 'best', k: 'irr', noun: 'pizza', sup: 'This is the ___ ({a}) pizza in town.' },
    { a: 'bad', c: 'worse', s: 'worst', k: 'irr', noun: 'idea', sup: 'That was the ___ ({a}) film I have ever seen.' }
  ];
  function compRule(x, sup) {
    var f = sup ? 'the ' + x.s : x.c;
    switch (x.k) {
      case 'short': return 'Aggettivo corto: si aggiunge ' + (sup ? '-est' : '-er') + ' (' + x.a + ' → ' + f + ').';
      case 'double': return 'Aggettivo corto consonante-vocale-consonante: la consonante raddoppia (' + x.a + ' → ' + f + ').';
      case 'y': return 'Aggettivo che finisce in -y: la y diventa ' + (sup ? '-iest' : '-ier') + ' (' + x.a + ' → ' + f + ').';
      case 'e': return 'Aggettivo che finisce in -e: si aggiunge solo ' + (sup ? '-st' : '-r') + ' (' + x.a + ' → ' + f + ').';
      case 'long': return 'Aggettivo lungo (2+ sillabe): si usa ' + (sup ? 'the most' : 'more') + ' (' + f + '), senza -' + (sup ? 'est' : 'er') + '.';
      default: return 'Aggettivo irregolare: ' + x.a + ' → ' + x.c + ' → the ' + x.s + '.';
    }
  }
  G.push({
    id: 'comp', topic: 'comparatives', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var x = U.pick(ADJS, rng);
      var sup = tier === 3 ? true : U.randInt(4, rng) === 0;
      var correct = sup ? x.s : x.c;
      var promptBase = sup ? x.sup.replace('{a}', x.a) : 'This ' + x.noun + ' is ___ (' + x.a + ') than that one.';
      var expl = (sup ? 'Superlativo ("il più…"): ' : 'Comparativo con than ("più… di"): ') + compRule(x, sup);
      var wrongs = [];
      if (x.k === 'long') wrongs = sup ? [x.a + 'est', 'more ' + x.a] : [x.a + 'er', 'most ' + x.a];
      else if (x.k === 'irr') wrongs = sup ? ['most ' + x.a, x.a + 'est', 'better'] : ['more ' + x.a, x.a + 'er', 'more ' + x.c];
      else wrongs = sup ? ['most ' + x.a, 'more ' + x.s] : ['more ' + x.a, 'more ' + x.c];
      if (x.k === 'double') wrongs.push(x.a + (sup ? 'est' : 'er'));
      if (x.k === 'y') wrongs.push(x.a + (sup ? 'est' : 'er'));
      if (sup && x.k === 'irr' && x.a === 'bad') wrongs = ['most bad', 'baddest', 'worse'];
      wrongs = U.uniq(wrongs).filter(function (w) { return w !== correct; });
      var noteFn = function (o) {
        if (/^more |^most /.test(o) && x.k !== 'long') {
          if (o.indexOf(x.c) !== -1 || o.indexOf(x.s) !== -1) return 'Doppio comparativo: more e -er insieme non vanno mai (errore tipico "more bigger").';
          return x.k === 'irr' ? x.a + ' è irregolare: ' + x.c + ' / the ' + x.s + '.' : '"' + x.a + '" è un aggettivo corto: si usa la desinenza, non more/most.';
        }
        if (o === 'better' || o === 'worse') return 'Questo è il comparativo; con the ("il più…") serve il superlativo: ' + x.s + '.';
        if (x.k === 'long') return '"' + x.a + '" è un aggettivo lungo: si usa ' + (sup ? 'the most' : 'more') + ', non la desinenza.';
        return 'Ortografia: ' + compRule(x, sup);
      };
      if (tier === 1) {
        var opts = [correct].concat(wrongs.slice(0, 3));
        if (opts.length < 3) opts.push(x.a);
        return finish(this, 1, {
          type: 'mc', group: sup ? 'superlative' : 'comparative_' + x.k,
          prompt: promptBase.replace(' (' + x.a + ')', ''),
          options: opts, answers: [correct], explanation: expl,
          notes: notesFor(opts, correct, function (o) { return o === x.a ? 'Serve la forma ' + (sup ? 'superlativa' : 'comparativa') + ', non l\'aggettivo semplice.' : noteFn(o); })
        });
      }
      if (tier === 2) {
        var n = {};
        wrongs.forEach(function (w) { n[w] = noteFn(w); });
        return finish(this, 2, {
          type: 'gap', group: sup ? 'superlative' : 'comparative_' + x.k,
          prompt: promptBase, answers: [correct], explanation: expl, notes: n
        });
      }
      // tier 3: correggi l'errore (comparativo o superlativo)
      var useSup = U.randInt(2, rng) === 0;
      var w = useSup ? wrongs[0] : (x.k === 'long' ? x.a + 'er' : 'more ' + x.c);
      var correctC = useSup ? x.s : x.c;
      var good = useSup ? x.sup.replace('___ ({a})', correctC) : 'This ' + x.noun + ' is ' + correctC + ' than that one.';
      var bad = useSup ? x.sup.replace('___ ({a})', w) : 'This ' + x.noun + ' is ' + w + ' than that one.';
      if (bad === good) { w = x.a; bad = good.replace(correctC, w); }
      return finish(this, 3, {
        type: 'error', group: useSup ? 'superlative' : 'comparative_' + x.k, wrong: w,
        prompt: bad, answers: [good],
        explanation: 'L\'errore è "' + w + '". ' + compRule(x, useSup)
      });
    }
  });

  /* ---------- for / since ---------- */
  var FS_TIMES = [
    { x: 'two years', fs: 'for', it: 'da due anni', long: true },
    { x: 'six months', fs: 'for', it: 'da sei mesi', long: true },
    { x: 'a long time', fs: 'for', it: 'da molto tempo', long: true },
    { x: 'three weeks', fs: 'for', it: 'da tre settimane', long: true },
    { x: 'ten minutes', fs: 'for', it: 'da dieci minuti', long: false },
    { x: 'an hour', fs: 'for', it: 'da un\'ora', long: false },
    { x: '2019', fs: 'since', it: 'dal 2019', long: true },
    { x: 'last summer', fs: 'since', it: 'dall\'estate scorsa', long: true },
    { x: 'Christmas', fs: 'since', it: 'da Natale', long: true },
    { x: 'I was ten', fs: 'since', it: 'da quando avevo dieci anni', long: true },
    { x: 'Monday', fs: 'since', it: 'da lunedì', long: true },
    { x: 'this morning', fs: 'since', it: 'da stamattina', long: false },
    { x: 'nine o\'clock', fs: 'since', it: 'dalle nove', long: false }
  ];
  var FS_FRAMES = [
    { pp: 'I have lived here', ppc: 'I have been living here', pres: 'I live here', it: 'Vivo qui', long: true },
    { pp: 'We have known each other', pres: 'We know each other', it: 'Ci conosciamo', long: true },
    { pp: 'She has played the piano', ppc: 'She has been playing the piano', pres: 'She plays the piano', it: 'Lei suona il pianoforte', long: true },
    { pp: 'They have been friends', pres: 'They are friends', it: 'Loro sono amici', long: true },
    { pp: 'Luca has had his dog', pres: 'Luca has his dog', it: 'Luca ha il suo cane', long: true },
    { pp: 'I have waited for the bus', ppc: 'I have been waiting for the bus', pres: 'I wait for the bus', it: 'Aspetto l\'autobus', long: false },
    { pp: 'It has rained', ppc: 'It has been raining', pres: 'It rains', it: 'Piove', long: false },
    { pp: 'My dad has worked in this office', ppc: 'My dad has been working in this office', pres: 'My dad works in this office', it: 'Mio padre lavora in questo ufficio', long: true }
  ];
  G.push({
    id: 'fs', topic: 'for_since', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var f = U.pick(FS_FRAMES, rng);
      var times = FS_TIMES.filter(function (t) { return f.long ? true : !t.long || t.x === 'Monday'; });
      if (f.long) times = FS_TIMES.filter(function (t) { return t.long; });
      var t = U.pick(times, rng);
      var why = t.fs === 'for'
        ? 'For + DURATA (quanto tempo): for ' + t.x + '.'
        : 'Since + MOMENTO DI INIZIO (da quando): since ' + t.x + '.';
      if (tier === 1 || tier === 2) {
        var prompt = f.pp + ' ___ ' + t.x + '.';
        if (tier === 1) {
          var opts = ['for', 'since', 'from', 'ago'];
          return finish(this, 1, {
            type: 'mc', group: 'fs_' + t.fs, prompt: prompt, options: opts, answers: [t.fs], explanation: why,
            notes: notesFor(opts, t.fs, function (o) {
              if (o === 'from') return 'Con il present perfect, per dire "da" si usa for (durata) o since (inizio), non from.';
              if (o === 'ago') return 'Ago si usa con il past simple e va DOPO l\'espressione di tempo (two years ago).';
              return t.fs === 'for' ? '"' + t.x + '" è una durata: serve for. Since si usa con un momento preciso (since 2019).' : '"' + t.x + '" è il momento in cui è iniziato: serve since. For si usa con una durata (for two years).';
            })
          });
        }
        var n2 = {};
        n2[t.fs === 'for' ? 'since' : 'for'] = t.fs === 'for' ? 'Since vuole un momento di inizio; "' + t.x + '" è una durata.' : 'For vuole una durata; "' + t.x + '" è un momento di inizio.';
        n2.from = 'Con il present perfect "da" = for/since, non from.';
        return finish(this, 2, { type: 'gap', group: 'fs_' + t.fs, prompt: prompt, answers: [t.fs], explanation: why, notes: n2 });
      }
      // tier 3: traduzione
      var answers = [f.pp + ' ' + t.fs + ' ' + t.x + '.'];
      if (f.ppc) answers.push(f.ppc + ' ' + t.fs + ' ' + t.x + '.');
      var n3 = {};
      n3[f.pres + ' ' + t.fs + ' ' + t.x] = 'In italiano si usa il presente, ma in inglese per un\'azione iniziata nel passato che continua si usa il present perfect: ' + f.pp + '…';
      n3[f.pres + ' ' + (t.fs === 'for' ? 'since' : 'for') + ' ' + t.x] = 'Due errori: serve il present perfect (' + f.pp + ') e ' + t.fs + ' invece di ' + (t.fs === 'for' ? 'since' : 'for') + '.';
      n3[f.pp + ' ' + (t.fs === 'for' ? 'since' : 'for') + ' ' + t.x] = 'Il tempo è giusto, ma ' + why;
      return finish(this, 3, {
        type: 'translate', group: 'fs_tense', prompt: f.it + ' ' + t.it + '.', answers: answers,
        explanation: 'Azione iniziata nel passato che continua ancora: present perfect (' + f.pp + '). ' + why,
        notes: n3
      });
    }
  });

  /* ---------- a / an ---------- */
  var AN = [
    { n: 'apple', a: 'an', why: 'apple inizia con un suono vocalico' },
    { n: 'orange', a: 'an', why: 'orange inizia con un suono vocalico' },
    { n: 'egg', a: 'an', why: 'egg inizia con un suono vocalico' },
    { n: 'umbrella', a: 'an', why: 'umbrella inizia con il suono vocalico "a"' },
    { n: 'hour', a: 'an', why: 'in hour la h non si pronuncia, quindi il suono iniziale è vocalico', frame: 'I waited for ___ hour.' },
    { n: 'honest answer', a: 'an', why: 'in honest la h non si pronuncia', frame: 'That was ___ honest answer.' },
    { n: 'idea', a: 'an', why: 'idea inizia con un suono vocalico', frame: 'I have got ___ idea!' },
    { n: 'elephant', a: 'an', why: 'elephant inizia con un suono vocalico' },
    { n: 'old car', a: 'an', why: 'conta la parola che segue l\'articolo: old inizia con un suono vocalico' },
    { n: 'interesting book', a: 'an', why: 'conta la parola che segue: interesting inizia con un suono vocalico', frame: 'I\'m reading ___ interesting book.' },
    { n: 'university', a: 'a', why: 'university si pronuncia "iu-ni-…": il suono iniziale è consonantico', frame: 'My cousin goes to ___ university in London.' },
    { n: 'uniform', a: 'a', why: 'uniform si pronuncia "iu-ni-…": il suono iniziale è consonantico', frame: 'We wear ___ uniform at school.' },
    { n: 'European country', a: 'a', why: 'European si pronuncia "iu-…": il suono iniziale è consonantico', frame: 'Spain is ___ European country.' },
    { n: 'horse', a: 'a', why: 'in horse la h si pronuncia (aspirata)' },
    { n: 'house', a: 'a', why: 'in house la h si pronuncia (aspirata)', frame: 'They live in ___ house near the sea.' },
    { n: 'hotel', a: 'a', why: 'in hotel la h si pronuncia', frame: 'We stayed in ___ hotel.' },
    { n: 'banana', a: 'a', why: 'banana inizia con un suono consonantico' },
    { n: 'new phone', a: 'a', why: 'conta la parola che segue: new inizia con un suono consonantico', frame: 'I want ___ new phone.' },
    { n: 'useful app', a: 'a', why: 'useful si pronuncia "ius-…": il suono iniziale è consonantico', frame: 'This is ___ useful app.' },
    { n: 'one-day trip', a: 'a', why: 'one si pronuncia "uan": il suono iniziale è consonantico (w)', frame: 'We went on ___ one-day trip.' }
  ];
  G.push({
    id: 'aan', topic: 'articles_a_an', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var x = U.pick(AN, rng);
      var frame = x.frame || U.pick(['I can see ___ {n} in the picture.', 'There is ___ {n} in this photo.'], rng).replace('{n}', x.n);
      var other = x.a === 'a' ? 'an' : 'a';
      var expl = 'Si usa "' + x.a + '" perché ' + x.why + '. Conta il SUONO, non la lettera.';
      if (tier === 1) {
        var opts = ['a', 'an'];
        var n1 = {}; n1[other] = 'Attenzione al suono: ' + x.why + ', quindi serve "' + x.a + '".';
        return finish(this, 1, { type: 'mc', group: 'aan_' + x.a, prompt: frame, options: opts, answers: [x.a], explanation: expl, notes: n1 });
      }
      if (tier === 2) {
        var n2 = {}; n2[other] = 'Attenzione al suono: ' + x.why + ', quindi serve "' + x.a + '".';
        n2.the = 'Qui si parla di una cosa qualsiasi, nominata per la prima volta: serve l\'articolo indeterminativo (a/an).';
        return finish(this, 2, { type: 'gap', group: 'aan_' + x.a, prompt: frame, answers: [x.a], explanation: expl, notes: n2 });
      }
      return finish(this, 3, {
        type: 'error', group: 'aan_' + x.a, wrong: other + ' ' + x.n.split(' ')[0],
        prompt: frame.replace('___', other), answers: [frame.replace('___', x.a)],
        explanation: 'L\'errore è "' + other + '": ' + x.why + ', quindi si dice "' + x.a + ' ' + x.n + '".'
      });
    }
  });

  /* ---------- in / on / at (tempo) ---------- */
  var PT = [
    { x: 'Monday', p: 'on', why: 'con i giorni della settimana si usa on' },
    { x: 'Friday evening', p: 'on', why: 'giorno + parte del giorno (Friday evening) vuole on' },
    { x: 'my birthday', p: 'on', why: 'con un giorno preciso (il compleanno) si usa on' },
    { x: '25th December', p: 'on', why: 'con le date si usa on' },
    { x: 'Christmas Day', p: 'on', why: 'Christmas Day è un giorno preciso: on' },
    { x: 'the weekend', p: 'at', why: 'in inglese britannico si dice at the weekend' },
    { x: 'night', p: 'at', why: 'si dice at night (ma in the morning/afternoon/evening)' },
    { x: 'seven o\'clock', p: 'at', why: 'con gli orari si usa at' },
    { x: 'midnight', p: 'at', why: 'midnight è un orario preciso: at' },
    { x: 'lunchtime', p: 'at', why: 'con i momenti precisi della giornata (lunchtime, midnight) si usa at' },
    { x: 'Christmas', p: 'at', why: 'per il periodo delle feste si dice at Christmas (ma on Christmas Day)' },
    { x: 'July', p: 'in', why: 'con i mesi si usa in' },
    { x: 'summer', p: 'in', why: 'con le stagioni si usa in' },
    { x: '2030', p: 'in', why: 'con gli anni si usa in' },
    { x: 'the morning', p: 'in', why: 'si dice in the morning / in the afternoon / in the evening' },
    { x: 'the afternoon', p: 'in', why: 'si dice in the morning / in the afternoon / in the evening' },
    { x: 'winter', p: 'in', why: 'con le stagioni si usa in' }
  ];
  var PT_FRAMES = ['I\'ll see you ___ {x}.', 'We are going to meet ___ {x}.', 'Let\'s play online ___ {x}.', 'The shop is closed ___ {x}.'];
  G.push({
    id: 'ptime', topic: 'prep_time', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var x = U.pick(PT, rng);
      var frame = U.pick(PT_FRAMES, rng).replace('{x}', x.x);
      var expl = 'Si usa "' + x.p + '": ' + x.why + '. Ricorda: AT ore e momenti precisi, ON giorni e date, IN mesi, anni, stagioni, parti del giorno.';
      var fn = function (o) { return '"' + o + ' ' + x.x + '" non è corretto: ' + x.why + '.'; };
      if (tier === 1) {
        var opts = ['in', 'on', 'at'];
        return finish(this, 1, { type: 'mc', group: 'pt_' + x.p, prompt: frame, options: opts, answers: [x.p], explanation: expl, notes: notesFor(opts, x.p, fn) });
      }
      if (tier === 2) {
        var n = notesFor(['in', 'on', 'at'], x.p, fn);
        return finish(this, 2, { type: 'gap', group: 'pt_' + x.p, prompt: frame, answers: [x.p], explanation: expl, notes: n });
      }
      var w = U.pick(['in', 'on', 'at'].filter(function (p) { return p !== x.p; }), rng);
      return finish(this, 3, {
        type: 'error', group: 'pt_' + x.p, wrong: w + ' ' + x.x,
        prompt: frame.replace('___', w), answers: [frame.replace('___', x.p)],
        explanation: 'L\'errore è "' + w + ' ' + x.x + '": ' + x.why + '.'
      });
    }
  });

  /* ---------- pronomi complemento ---------- */
  var PRON = [
    { who: 'Marco', obj: 'him', subj: 'he', poss: 'his' },
    { who: 'my grandfather', obj: 'him', subj: 'he', poss: 'his' },
    { who: 'Anna', obj: 'her', subj: 'she', poss: 'her' },
    { who: 'my aunt', obj: 'her', subj: 'she', poss: 'her' },
    { who: 'my cousins', obj: 'them', subj: 'they', poss: 'their' },
    { who: 'these songs', obj: 'them', subj: 'they', poss: 'their' },
    { who: 'this film', obj: 'it', subj: 'it', poss: 'its' },
    { who: 'the new teacher', obj: 'her', subj: 'she', poss: 'her', hint: 'Mrs Bianchi' }
  ];
  var PRON_FRAMES = [
    { s: 'I really like {who}. I talk to ___ every day.', people: true },
    { s: 'Do you know {who}? I\'ve got a present for ___.', people: true },
    { s: 'I love {who}. I listen to ___ all the time.', things: true },
    { s: 'Where is {who}? I can\'t find ___.', any: true },
    { s: 'Can you see {who}? Wave at ___!', people: true }
  ];
  G.push({
    id: 'pron', topic: 'pronouns', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var p = U.pick(PRON, rng);
      var thing = p.who === 'this film' || p.who === 'these songs';
      var frames = PRON_FRAMES.filter(function (f) { return f.any || (thing ? f.things : f.people); });
      var f = U.pick(frames, rng);
      var who = p.hint ? p.who + ' (' + p.hint + ')' : p.who;
      var text = f.s.replace('{who}', who);
      var expl = 'Dopo un verbo o una preposizione si usa il pronome complemento: ' + p.who + ' → ' + p.obj + '.';
      var fn = function (o) {
        if (o === p.subj) return '"' + o + '" è un pronome soggetto (va prima del verbo). Dopo un verbo o una preposizione serve il complemento: ' + p.obj + '.';
        if (o === p.poss) return '"' + o + '" è un aggettivo possessivo (va davanti a un nome). Qui serve il pronome complemento: ' + p.obj + '.';
        return '"' + o + '" non si riferisce a ' + p.who + '. Il pronome giusto è ' + p.obj + '.';
      };
      if (tier === 1) {
        var others = ['him', 'her', 'them', 'it'].filter(function (x) { return x !== p.obj; });
        var opts = [p.obj, p.subj === p.obj ? U.pick(others, rng) : p.subj, U.pick(others, rng), p.poss];
        return finish(this, 1, { type: 'mc', group: 'pron_obj', prompt: text, options: opts, answers: [p.obj], explanation: expl, notes: notesFor(U.uniq(opts), p.obj, fn) });
      }
      if (tier === 2) {
        var n = {};
        if (p.subj !== p.obj) n[p.subj] = fn(p.subj);
        if (p.poss !== p.obj) n[p.poss] = fn(p.poss);
        return finish(this, 2, { type: 'gap', group: 'pron_obj', prompt: text, answers: [p.obj], explanation: expl, notes: n });
      }
      if (p.subj === p.obj) p = PRON[0];
      text = f.s.replace('{who}', p.hint ? p.who + ' (' + p.hint + ')' : p.who);
      if (thing && !f.any) text = 'Where is ' + p.who + '? I can\'t find ___.';
      return finish(this, 3, {
        type: 'error', group: 'pron_obj', wrong: p.subj,
        prompt: text.replace('___', p.subj), answers: [text.replace('___', p.obj)],
        explanation: 'L\'errore è "' + p.subj + '": dopo un verbo o una preposizione serve il pronome complemento ' + p.obj + '.'
      });
    }
  });

  /* ---------- his / her / their ---------- */
  var OWNERS = [
    { en: 'Marco', poss: 'his', g: 'm' }, { en: 'Luca', poss: 'his', g: 'm' }, { en: 'My uncle', poss: 'his', g: 'm' },
    { en: 'Anna', poss: 'her', g: 'f' }, { en: 'Giulia', poss: 'her', g: 'f' }, { en: 'My aunt', poss: 'her', g: 'f' },
    { en: 'My cousins', poss: 'their', g: 'p' }, { en: 'Our neighbours', poss: 'their', g: 'p' }
  ];
  var RELS = [
    { en: 'mother', it: 'sua madre', itp: 'la loro madre' }, { en: 'father', it: 'suo padre', itp: 'il loro padre' },
    { en: 'sister', it: 'sua sorella', itp: 'la loro sorella' }, { en: 'brother', it: 'suo fratello', itp: 'il loro fratello' },
    { en: 'grandmother', it: 'sua nonna', itp: 'la loro nonna' }, { en: 'dog', it: 'il suo cane', itp: 'il loro cane' },
    { en: 'bike', it: 'la sua bici', itp: 'la loro bici' }
  ];
  function possExpl(o) {
    if (o.g === 'p') return 'Il possessore è plurale (' + o.en + '), quindi si usa their.';
    return 'In inglese il possessivo dipende da CHI possiede: ' + o.en + ' è ' + (o.g === 'm' ? 'maschio → his' : 'femmina → her') + ', qualunque sia la cosa posseduta. (In italiano "suo/sua" non distingue!)';
  }
  G.push({
    id: 'poss', topic: 'possessives', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var o = U.pick(OWNERS, rng);
      var r = U.pick(RELS, rng);
      var verb = r.en === 'bike' ? 'is cleaning' : r.en === 'dog' ? 'is walking' : 'is calling';
      if (o.g === 'p') verb = verb.replace('is ', 'are ');
      var text = o.en + ' ' + verb + ' ___ ' + r.en + '.';
      var fn = function (x) {
        if (x === 'its') return 'Its si usa solo per cose o animali. ' + possExpl(o);
        if (x === 'the his' || x === 'the her') return 'In inglese l\'articolo non va davanti al possessivo: si dice ' + o.poss + ' ' + r.en + '.';
        return possExpl(o);
      };
      if (tier === 1) {
        var opts = ['his', 'her', 'their', 'its'];
        return finish(this, 1, { type: 'mc', group: 'poss_his_her', prompt: text, options: opts, answers: [o.poss], explanation: possExpl(o), notes: notesFor(opts, o.poss, fn) });
      }
      if (tier === 2) {
        var n = notesFor(['his', 'her', 'their', 'its'], o.poss, fn);
        n['the ' + o.poss] = fn('the his');
        return finish(this, 2, { type: 'gap', group: 'poss_his_her', prompt: text, answers: [o.poss], explanation: possExpl(o), notes: n });
      }
      var itVerb = { 'is calling': 'chiama', 'is walking': 'porta a spasso', 'is cleaning': 'pulisce', 'are calling': 'chiamano', 'are walking': 'portano a spasso', 'are cleaning': 'puliscono' }[verb];
      var itSubj = { 'My uncle': 'Mio zio', 'My aunt': 'Mia zia', 'My cousins': 'I miei cugini', 'Our neighbours': 'I nostri vicini' }[o.en] || o.en;
      var simple = verb.replace(/^(is|are) /, '').replace(/ing$/, '');
      simple = { call: 'calls', walk: 'walks', clean: 'cleans' }[simple] && o.g !== 'p' ? { call: 'calls', walk: 'walks', clean: 'cleans' }[simple] : simple;
      var answers = [o.en + ' ' + verb + ' ' + o.poss + ' ' + r.en + '.', o.en + ' ' + simple + ' ' + o.poss + ' ' + r.en + '.'];
      var n3 = {};
      var wrongPoss = o.poss === 'his' ? 'her' : o.poss === 'her' ? 'his' : 'his';
      n3[o.en + ' ' + verb + ' ' + wrongPoss + ' ' + r.en] = possExpl(o);
      n3[o.en + ' ' + simple + ' ' + wrongPoss + ' ' + r.en] = possExpl(o);
      return finish(this, 3, {
        type: 'translate', group: 'poss_his_her',
        prompt: itSubj + ' ' + itVerb + ' ' + (o.g === 'p' ? r.itp : r.it) + '.',
        answers: answers, explanation: possExpl(o), notes: n3
      });
    }
  });

  /* ---------- to be ---------- */
  var BE_COMPL = ['at home', 'tired', 'in the garden', 'very happy today', 'late for school', 'at the cinema', 'good at maths', 'from Naples'];
  var NUM_WORDS = { 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen' };
  var NUM_IT = { 11: 'undici', 12: 'dodici', 13: 'tredici', 14: 'quattordici', 15: 'quindici', 16: 'sedici', 17: 'diciassette', 18: 'diciotto' };
  G.push({
    id: 'be', topic: 'be', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var s = U.pick(SUBJECTS, rng);
      var be = beFor(s);
      var c = U.pick(BE_COMPL, rng);
      var expl = 'To be: I am, you/we/they are, he/she/it is. "' + s.en + '" → ' + be + '.';
      if (tier === 1) {
        var opts = ['am', 'is', 'are'];
        return finish(this, 1, {
          type: 'mc', group: 'be_form', prompt: s.en + ' ___ ' + c + '.', options: opts, answers: [be], explanation: expl,
          notes: notesFor(opts, be, function (o) { return '"' + o + '" non concorda con "' + s.en + '": ' + expl; })
        });
      }
      if (tier === 2) {
        var neg = be === 'am' ? 'am not' : be + ' not';
        var n = {};
        n['don\'t'] = 'Con to be la negativa si fa aggiungendo not al verbo, senza do/does: ' + neg + '.';
        n['doesn\'t'] = 'Con to be la negativa si fa aggiungendo not al verbo, senza do/does: ' + neg + '.';
        n['not'] = 'Manca il verbo essere: ' + neg + '.';
        return finish(this, 2, {
          type: 'gap', group: 'be_negative', prompt: s.en + ' ___ (be, negativo) ' + c + '.',
          answers: [neg], explanation: 'Negativa di to be: ' + neg + ' (' + (be === 'am' ? '\'m not' : be + 'n\'t') + '). Non serve do/does.', notes: n
        });
      }
      var who = U.pick([{ en: 'My sister', it: 'Mia sorella' }, { en: 'Marco', it: 'Marco' }, { en: 'My best friend', it: 'Il mio migliore amico' }, { en: 'My cousin', it: 'Mio cugino' }], rng);
      var age = 11 + U.randInt(8, rng);
      var w = NUM_WORDS[age];
      var answers = [who.en + ' is ' + w + '.', who.en + ' is ' + age + '.', who.en + ' is ' + w + ' years old.', who.en + ' is ' + age + ' years old.'];
      var n3 = {};
      n3[who.en + ' has ' + w + ' years'] = 'Errore tipico degli italiani: l\'età si dice con to be, non con to have.';
      n3[who.en + ' has ' + age + ' years'] = 'Errore tipico degli italiani: l\'età si dice con to be, non con to have.';
      n3[who.en + ' is ' + w + ' years'] = 'Se aggiungi "years" devi dire anche "old": ' + who.en + ' is ' + w + ' (years old).';
      n3[who.en + ' is ' + age + ' years'] = 'Se aggiungi "years" devi dire anche "old": ' + who.en + ' is ' + age + ' (years old).';
      return finish(this, 3, {
        type: 'translate', group: 'be_age', prompt: who.it + ' ha ' + NUM_IT[age] + ' anni.', answers: answers,
        explanation: 'Per l\'età in inglese si usa to be: ' + who.en + ' is ' + w + ' (years old).', notes: n3
      });
    }
  });

  /* ---------- there is / there are ---------- */
  var THERE = [
    { sg: 'a cat', pl: 'two cats', place: 'in the garden' },
    { sg: 'a park', pl: 'three parks', place: 'near my house' },
    { sg: 'a new student', pl: 'five new students', place: 'in our class' },
    { sg: 'a good film', pl: 'some good films', place: 'on TV tonight' },
    { sg: 'a computer', pl: 'twenty computers', place: 'in the lab' },
    { sg: 'some milk', pl: 'some eggs', place: 'in the fridge', unc: true },
    { sg: 'a bottle of water', pl: 'two bottles of water', place: 'in my bag' }
  ];
  G.push({
    id: 'there', topic: 'there_is', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var t = U.pick(THERE, rng);
      var plural = U.randInt(2, rng) === 0;
      var thing = plural ? t.pl : t.sg;
      var verb = plural ? 'are' : 'is';
      var expl = plural ? 'Con un nome plurale (' + thing + ') si usa there are.' : (t.unc && !plural ? 'Con un nome non numerabile (milk) si usa there is.' : 'Con un nome singolare (' + thing + ') si usa there is.');
      if (tier === 1) {
        var opts = ['is', 'are', 'have'];
        return finish(this, 1, {
          type: 'mc', group: 'there_' + verb, prompt: 'There ___ ' + thing + ' ' + t.place + '.', options: opts, answers: [verb], explanation: expl,
          notes: notesFor(opts, verb, function (o) { return o === 'have' ? '"C\'è / ci sono" si dice there is / there are, non con have.' : expl; })
        });
      }
      if (tier === 2) {
        var q = (plural ? 'Are' : 'Is') + ' there ' + thing.replace(/^some /, 'any ') + ' ' + t.place + '?';
        var n = {};
        n[(plural ? 'Is' : 'Are') + ' there ' + thing.replace(/^some /, 'any ') + ' ' + t.place] = expl;
        n['There ' + verb + ' ' + thing.replace(/^some /, 'any ') + ' ' + t.place] = 'Per la domanda si inverte: ' + (plural ? 'Are' : 'Is') + ' there…?';
        return finish(this, 2, {
          type: 'transform', group: 'there_question', instruction: 'Trasforma in domanda.',
          prompt: 'There ' + verb + ' ' + thing + ' ' + t.place + '.', answers: [q],
          explanation: 'Domanda: ' + (plural ? 'Are' : 'Is') + ' there…? (si inverte there e il verbo). ' + (/^some /.test(thing) ? 'Nelle domande some diventa di solito any.' : ''),
          notes: n
        });
      }
      var wrong = plural ? 'is' : 'are';
      return finish(this, 3, {
        type: 'error', group: 'there_' + verb, wrong: 'There ' + wrong,
        prompt: 'There ' + wrong + ' ' + thing + ' ' + t.place + '.', answers: ['There ' + verb + ' ' + thing + ' ' + t.place + '.'],
        explanation: 'L\'errore è "there ' + wrong + '". ' + expl
      });
    }
  });

  /* ---------- have got ---------- */
  var HG_OBJ = ['a new bike', 'two sisters', 'blue eyes', 'a lot of homework', 'a dog called Max', 'long hair', 'a cold'];
  G.push({
    id: 'hg', topic: 'have_got', tiers: [1, 2, 3],
    make: function (tier, rng) {
      var s = U.pick(SUBJECTS.filter(function (x) { return x.en !== 'Our teacher' || true; }), rng);
      var o = U.pick(HG_OBJ, rng);
      var h = is3s(s) ? 'has' : 'have';
      var expl = 'Con ' + (is3s(s) ? 'he/she/it (' + s.en + ') si usa has got' : '"' + s.en + '" si usa have got') + '.';
      if (tier === 1) {
        var opts = ['has', 'have', 'is'];
        return finish(this, 1, {
          type: 'mc', group: 'hg_form', prompt: s.en + ' ___ got ' + o + '.', options: opts, answers: [h], explanation: expl,
          notes: notesFor(opts, h, function (x) { return x === 'is' ? 'Il possesso si esprime con have/has got, non con to be.' : expl; })
        });
      }
      if (tier === 2) {
        var neg = h + 'n\'t got';
        var n = {};
        n['don\'t have got'] = 'Con have got la negativa si fa con haven\'t/hasn\'t got, senza do.';
        n['doesn\'t have got'] = 'Con have got la negativa si fa con haven\'t/hasn\'t got, senza does.';
        n[(h === 'has' ? 'haven\'t' : 'hasn\'t') + ' got'] = expl;
        return finish(this, 2, {
          type: 'gap', group: 'hg_negative', prompt: s.en + ' ___ (have got, negativo) ' + o + '.',
          answers: [neg], explanation: 'Negativa: ' + neg + '. ' + expl, notes: n
        });
      }
      var q = cap(h) + ' ' + subjLower(s) + ' got ' + o + '?';
      var n3 = {};
      n3[(is3s(s) ? 'Does ' : 'Do ') + subjLower(s) + ' ' + h + ' got ' + o] = 'Con have got la domanda si fa invertendo have/has e il soggetto, senza do/does.';
      n3[cap(h === 'has' ? 'have' : 'has') + ' ' + subjLower(s) + ' got ' + o] = expl;
      return finish(this, 3, {
        type: 'transform', group: 'hg_question', instruction: 'Trasforma in domanda.',
        prompt: s.en + ' ' + h + ' got ' + o + '.', answers: [q],
        explanation: 'Domanda con have got: ' + cap(h) + ' + soggetto + got…? ' + expl, notes: n3
      });
    }
  });

  /* ---------- API ---------- */
  var byTopic = {};
  G.forEach(function (g) { (byTopic[g.topic] = byTopic[g.topic] || []).push(g); });

  function forTopic(topic) { return byTopic[topic] || []; }

  function generate(topic, tier, rng, opts) {
    var gens = forTopic(topic).filter(function (g) { return g.tiers.indexOf(tier) !== -1; });
    if (!gens.length) return null;
    opts = opts || {};
    for (var attempt = 0; attempt < 6; attempt++) {
      var g = U.pick(gens, rng);
      var it = g.make(tier, rng || U.rng);
      if (!it) continue;
      if (opts.type && it.type !== opts.type) continue;
      if (opts.exclude && opts.exclude[it.id]) continue;
      return it;
    }
    return null;
  }

  return { list: G, forTopic: forTopic, generate: generate };
})();
