#!/usr/bin/env node
/* Valida la banca degli esercizi.
 *   node tests/validate.js                 → tutta la banca
 *   node tests/validate.js data/vocab.js   → solo i file indicati (copertura solo per i loro argomenti)
 * Esce con codice 1 se trova errori.
 */
'use strict';
const { load } = require('./load');

function validate(opts) {
  opts = opts || {};
  const EC = load(opts.only ? { only: opts.only } : {});
  const M = EC.matcher;
  const errors = [];
  const warnings = [];
  const E = (id, msg) => errors.push(`[${id}] ${msg}`);
  const W = (id, msg) => warnings.push(`[${id}] ${msg}`);

  EC.data.problems.forEach((p) => errors.push('[caricamento] ' + p));

  const items = EC.data.items.filter((it) => !it.generated);
  const VALID_TYPES = EC.TYPES;

  items.forEach((it) => {
    const id = it.id;
    if (!/^[a-z0-9_]+$/.test(id)) E(id, 'id deve contenere solo a-z, 0-9, _');
    const topic = EC.data.topicById[it.topic];
    if (!topic) E(id, `argomento sconosciuto "${it.topic}"`);
    if (![1, 2, 3].includes(it.difficulty)) E(id, 'difficulty deve essere 1, 2 o 3');
    if (!VALID_TYPES.includes(it.type)) E(id, `tipo non valido "${it.type}"`);
    if (!it.prompt || typeof it.prompt !== 'string') E(id, 'prompt mancante');
    if (!Array.isArray(it.answers) || !it.answers.length || it.answers.some((a) => typeof a !== 'string' || !a.trim()))
      E(id, 'answers deve essere un array di stringhe non vuote');
    if (!it.explanation || it.explanation.length < 20) E(id, 'explanation mancante o troppo corta (min 20 caratteri)');
    if (it.notes && typeof it.notes !== 'object') E(id, 'notes deve essere un oggetto');
    if (!it.group) W(id, 'group mancante (serve per trovare le varianti)');
    const answers = it.answers || [];

    // nessuna nota può coincidere con una risposta giusta
    Object.keys(it.notes || {}).forEach((k) => {
      if (M.isMatch(k, answers)) E(id, `la nota "${k}" coincide con una risposta corretta`);
    });

    switch (it.type) {
      case 'mc': {
        const opt = it.options;
        if (!Array.isArray(opt) || opt.length < 2 || opt.length > 5) { E(id, 'mc: options deve avere 2–5 elementi'); break; }
        if (new Set(opt.map((o) => M.basic(o))).size !== opt.length) E(id, 'mc: opzioni duplicate');
        answers.forEach((a) => { if (!opt.includes(a)) E(id, `mc: la risposta "${a}" non è tra le opzioni`); });
        if (answers.length !== 1) W(id, 'mc: di solito una sola risposta corretta');
        opt.filter((o) => !answers.includes(o)).forEach((o) => {
          if (!it.passage && !(it.notes && it.notes[o])) E(id, `mc: manca la nota per il distrattore "${o}"`);
        });
        break;
      }
      case 'gap': {
        const n = (it.prompt.match(/___/g) || []).length;
        if (n !== 1) E(id, `gap: il prompt deve contenere esattamente un "___" (trovati ${n})`);
        break;
      }
      case 'error': {
        if (M.isMatch(it.prompt, answers)) E(id, 'error: la frase da correggere coincide con una risposta corretta');
        if (it.wrong && !M.basic(it.prompt).includes(M.basic(it.wrong))) W(id, `error: "wrong" ("${it.wrong}") non compare nel prompt`);
        break;
      }
      case 'order': {
        const words = M.basic(answers[0] || '').split(' ');
        if (words.length < 3) E(id, 'order: servono almeno 3 parole');
        if (words.length > 14) W(id, 'order: più di 14 tessere, forse troppo lunga');
        answers.slice(1).forEach((a) => {
          const w2 = M.basic(a).split(' ').sort().join(' ');
          if (w2 !== words.slice().sort().join(' ')) E(id, `order: la risposta alternativa "${a}" usa parole diverse dalla prima`);
        });
        break;
      }
      case 'transform':
        if (!it.instruction) E(id, 'transform: serve "instruction" (es. "Volgi alla forma negativa")');
        break;
      case 'translate':
        if (answers.length < 2) W(id, 'translate: meglio indicare più traduzioni accettate');
        break;
      default:
        break;
    }
  });

  // Copertura per argomento
  const topicsInScope = opts.only
    ? [...new Set(items.map((i) => i.topic))].map((t) => EC.data.topicById[t]).filter(Boolean)
    : EC.data.topics;
  const coverage = [];
  topicsInScope.forEach((t) => {
    const its = items.filter((i) => i.topic === t.id);
    const byDiff = [1, 2, 3].map((d) => its.filter((i) => i.difficulty === d).length);
    const types = [...new Set(its.map((i) => i.type))];
    const placementOk = its.filter((i) => i.difficulty <= 2 && (i.type === 'mc' || i.type === 'gap') && !i.passage).length;
    coverage.push({ topic: t.id, level: t.level, n: its.length, d1: byDiff[0], d2: byDiff[1], d3: byDiff[2], types: types.join(',') });
    if (t.area === 'reading') {
      if (its.length < 10) E(t.id, `lettura: solo ${its.length} domande (min 10)`);
      if (byDiff[0] + byDiff[1] === 0 || byDiff[2] === 0) W(t.id, 'lettura: servono domande facili e domande di inferenza (difficulty 3)');
      return;
    }
    if (its.length < 12) E(t.id, `solo ${its.length} item (min 12)`);
    byDiff.forEach((n, i) => { if (n < 3) E(t.id, `solo ${n} item di difficoltà ${i + 1} (min 3)`); });
    if (types.length < 2) E(t.id, 'serve almeno 2 tipi di esercizio');
    if (placementOk < 2) E(t.id, 'servono almeno 2 item mc/gap di difficoltà 1–2 per il test iniziale');
  });

  // Testi della traduzione libera (data/writing.js)
  const contains = (given, phrase) => M.forms(given).some((g) => M.forms(phrase).some((p) => p && (' ' + g + ' ').includes(' ' + p + ' ')));
  EC.data.texts.forEach((t) => {
    const id = t.id;
    if (!/^w_[a-z0-9_]+$/.test(id)) E(id, 'id del testo deve iniziare con w_ e contenere solo a-z, 0-9, _');
    if (!EC.LEVELS.includes(t.level)) E(id, `livello non valido "${t.level}"`);
    if (!t.title) E(id, 'title mancante');
    if (!Array.isArray(t.sentences) || t.sentences.length < 3) { E(id, 'servono almeno 3 frasi'); return; }
    t.sentences.forEach((s, i) => {
      const sid = id + '#' + (i + 1);
      if (!s.it) E(sid, 'frase italiana (it) mancante');
      if (!Array.isArray(s.en) || !s.en.length || s.en.some((a) => typeof a !== 'string' || !a.trim())) E(sid, 'en deve essere un array di traduzioni non vuote');
      if (!Array.isArray(s.topics) || !s.topics.length) E(sid, 'topics mancante');
      (s.topics || []).forEach((tp) => {
        const top = EC.data.topicById[tp];
        if (!top) E(sid, `argomento sconosciuto "${tp}"`);
        else if (EC.LEVELS.indexOf(top.level) > EC.LEVELS.indexOf(t.level)) W(sid, `argomento "${tp}" di livello superiore al testo`);
      });
      if (!s.explanation || s.explanation.length < 20) E(sid, 'explanation mancante o troppo corta');
      if (!Array.isArray(s.tips) || !s.tips.length) W(sid, 'nessun errore tipico (tips)');
      (s.tips || []).forEach((tip) => {
        if (!tip.wrong || !tip.right || !tip.why) E(sid, 'tip incompleto (servono wrong, right, why)');
        if (tip.topic && !EC.data.topicById[tip.topic]) E(sid, `tip con argomento sconosciuto "${tip.topic}"`);
        (s.en || []).forEach((a) => { if (contains(a, tip.wrong)) E(sid, `l'errore tipico "${tip.wrong}" compare nella traduzione corretta "${a}"`); });
      });
    });
  });

  return { EC, errors, warnings, coverage, count: items.length, texts: EC.data.texts.length };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const res = validate(args.length ? { only: args } : {});
  console.table(res.coverage);
  console.log(`Item validati: ${res.count}` + (res.texts ? ` · testi di traduzione libera: ${res.texts}` : ''));
  if (res.warnings.length) {
    console.log(`\nAvvisi (${res.warnings.length}):`);
    res.warnings.slice(0, 60).forEach((w) => console.log('  ' + w));
    if (res.warnings.length > 60) console.log(`  … e altri ${res.warnings.length - 60}`);
  }
  if (res.errors.length) {
    console.log(`\nERRORI (${res.errors.length}):`);
    res.errors.forEach((e) => console.log('  ' + e));
    process.exit(1);
  }
  console.log('\nOK: nessun errore.');
}

module.exports = { validate };
