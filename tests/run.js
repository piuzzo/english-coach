#!/usr/bin/env node
/* Test automatici di English Coach:  node tests/run.js */
'use strict';
const { load } = require('./load');
const { validate } = require('./validate');

let failures = 0, passes = 0;
function ok(cond, msg) {
  if (cond) passes++;
  else { failures++; console.log('  ✗ ' + msg); }
}
function section(name) { console.log('\n▶ ' + name); }

/* ---------- ambiente di simulazione con orologio controllato ---------- */
function freshEnv(seed) {
  const EC = load();
  let clock = new Date(2026, 10, 5, 16, 0, 0).getTime();
  EC.util.now = () => clock;
  EC.util.rng = EC.util.makeRng(seed || 1);
  EC.learner._resetCache();
  const state = EC.storage.defaultState();
  return {
    EC, state,
    advanceDays(n) { clock += n * 86400000; },
    tick(ms) { clock += ms; }
  };
}

// Studente simulato: sa rispondere agli argomenti dei livelli "known"; altrimenti sbaglia con probabilità pErr
function makeStudent(EC, opts) {
  const rng = EC.util.makeRng(opts.seed || 99);
  return function answer(item) {
    const lvl = (EC.data.topicById[item.topic] || {}).level;
    const knows = opts.known ? opts.known.includes(lvl) : rng() >= (opts.pErr || 0);
    if (knows) return item.answers[0];
    if (item.type === 'mc') return item.options.find((o) => !item.answers.includes(o));
    return 'xyz wrong answer';
  };
}

function runSession(env, student, opts) {
  const { EC, state } = env;
  const s = EC.session.create(state, Object.assign({ rng: EC.util.makeRng((opts && opts.seed) || 5) }, opts || {}));
  const served = [];
  let guard = 0;
  while (guard++ < 300) {
    const it = s.next();
    if (!it) break;
    const given = student(it);
    const ev = s.answer(given);
    served.push({ id: it.id, topic: it.topic, difficulty: it.difficulty, type: it.type, correct: ev.correct, variant: s.log[s.log.length - 1].variant, generated: !!it.generated });
    env.tick(20000);
    if (ev.done) break;
  }
  const summary = s.finish();
  return { served, summary, session: s };
}

/* ================= 1. banca ================= */
section('Banca degli esercizi');
{
  const res = validate();
  ok(res.errors.length === 0, 'la banca ha errori di validazione:\n    ' + res.errors.slice(0, 10).join('\n    '));
  ok(res.count >= 600, 'attesi almeno 600 esercizi, trovati ' + res.count);
  console.log(`  ${res.count} esercizi validati, ${res.warnings.length} avvisi`);
  const EC = res.EC;
  EC.data.topics.forEach((t) => {
    const its = EC.data.items.filter((i) => i.topic === t.id);
    [1, 2, 3].forEach((d) => ok(its.some((i) => i.difficulty === d), `${t.id}: nessun esercizio di gradino ${d}`));
    // ogni gruppo dovrebbe avere almeno 2 esercizi (per poter proporre una variante)
    const groups = {};
    its.forEach((i) => { groups[i.group] = (groups[i.group] || 0) + 1; });
    const lonely = Object.keys(groups).filter((g) => groups[g] < 2 && !/^rd_/.test(g));
    ok(lonely.length <= 1, `${t.id}: troppi gruppi con un solo esercizio (${lonely.join(', ')})`);
  });
  const reading = Object.keys(EC.data.passages).length;
  ok(reading >= 12, 'attesi almeno 12 testi di lettura, trovati ' + reading);
}

/* ================= 2. generatori ================= */
section('Generatori');
{
  const EC = load();
  const M = EC.matcher;
  const rng = EC.util.makeRng(42);
  let total = 0;
  const seenIds = new Set();
  EC.generators.list.forEach((g) => {
    g.tiers.forEach((tier) => {
      for (let i = 0; i < 400; i++) {
        let it;
        try { it = g.make(tier, rng); } catch (e) { ok(false, `${g.id} t${tier}: eccezione ${e.message}`); break; }
        total++;
        seenIds.add(it.id);
        const where = `${g.id} t${tier} "${it.prompt}"`;
        const all = JSON.stringify(it);
        ok(!/undefined|null|NaN/.test(all.replace(/"generator":"[^"]*"/, '')), where + ': contiene undefined/null/NaN');
        ok(it.topic === g.topic && EC.data.topicById[it.topic], where + ': argomento errato');
        ok(it.answers.length > 0 && it.explanation.length > 15, where + ': risposta o spiegazione mancante');
        if (it.type === 'mc') {
          ok(it.options.includes(it.answers[0]), where + ': risposta non tra le opzioni');
          ok(new Set(it.options.map(M.basic)).size === it.options.length, where + ': opzioni duplicate ' + it.options.join('|'));
          ok(it.options.length >= 2, where + ': troppe poche opzioni');
          it.options.filter((o) => o !== it.answers[0]).forEach((o) => ok(it.notes[o], where + ': manca la nota per ' + o));
        }
        if (it.type === 'gap') ok((it.prompt.match(/___/g) || []).length === 1, where + ': gap senza un solo ___');
        if (it.type === 'error') ok(!M.isMatch(it.prompt, it.answers), where + ': la frase sbagliata coincide con quella giusta');
        Object.keys(it.notes || {}).forEach((k) => ok(!M.isMatch(k, it.answers), where + ': la nota "' + k + '" coincide con la risposta'));
      }
    });
  });
  console.log(`  ${total} esercizi generati, ${seenIds.size} diversi, ${EC.generators.list.length} generatori`);
  ok(seenIds.size > 3000, 'i generatori producono poca varietà: ' + seenIds.size);
}

/* ================= 3. confronto risposte ================= */
section('Confronto delle risposte (matcher)');
{
  const EC = load();
  const M = EC.matcher;
  const cases = [
    ["She doesn't like it.", ['She does not like it.'], true],
    ['she doesnt like it', ["She doesn't like it."], true],
    ['I’m fourteen', ['I am fourteen.'], true],
    ['  I AM   fourteen!! ', ['I am fourteen.'], true],
    ["He's been to London", ['He has been to London.'], true],
    ["He's tired", ['He is tired.'], true],
    ["can't", ['cannot'], true],
    ['can not', ["can't"], true],
    ["won't", ['will not'], true],
    ["I'd go", ['I would go'], true],
    ['goes', ['go'], false],
    ['She like it', ['She likes it.'], false],
    ['', ['x'], false],
    ['twenty-one', ['twenty one'], true]
  ];
  cases.forEach(([g, a, exp]) => ok(M.isMatch(g, a) === exp, `isMatch(${JSON.stringify(g)}, ${JSON.stringify(a)}) dovrebbe essere ${exp}`));
  ok(M.findNote("doesnt likes", { "doesn't likes": 'nota' }) === 'nota', 'findNote non trova la nota con contrazione senza apostrofo');
  ok(M.nearMiss('becuase', ['because']) === 'because', 'nearMiss non riconosce un errore di battitura');
  ok(M.nearMiss('go', ['goes']) === null, 'nearMiss troppo permissivo su parole corte');
}

/* ================= 4. sessione ================= */
section('Sessione di allenamento');
{
  // studente perfetto: 10 esercizi, 10 corretti
  const env = freshEnv(3);
  env.state.level = 'A2';
  const perfect = makeStudent(env.EC, { pErr: 0 });
  const r = runSession(env, perfect);
  ok(r.summary.correct === 10 && r.summary.answered === 10, `studente perfetto: attese 10/10, ottenute ${r.summary.correct}/${r.summary.answered}`);
  for (let i = 1; i < r.served.length; i++) ok(r.served[i].topic !== r.served[i - 1].topic, 'argomento ripetuto due volte di fila: ' + r.served[i].topic);
  ok(env.state.activeSession === null, 'activeSession non azzerata a fine sessione');
  ok(env.state.sessions.length === 1, 'sessione non registrata');

  // studente che sbaglia: la sessione finisce solo a 10 corrette, varianti dopo gli errori
  let variantChecks = 0, variantFound = 0, maxAnswered = 0;
  for (let seed = 1; seed <= 25; seed++) {
    const e2 = freshEnv(seed);
    e2.state.level = EC_LEVEL(seed);
    const st = makeStudent(e2.EC, { pErr: 0.35, seed: seed * 7 });
    const rr = runSession(e2, st, { seed });
    ok(rr.summary.correct === 10, `seed ${seed}: la sessione è finita con ${rr.summary.correct} corrette`);
    maxAnswered = Math.max(maxAnswered, rr.summary.answered);
    rr.served.forEach((x, i) => {
      if (x.correct || i > rr.served.length - 6) return;
      variantChecks++;
      const later = rr.served.slice(i + 1, i + 6);
      if (later.some((y) => y.topic === x.topic && y.variant)) variantFound++;
    });
    for (let i = 1; i < rr.served.length; i++) ok(rr.served[i].topic !== rr.served[i - 1].topic, `seed ${seed}: argomento ripetuto di fila`);
  }
  ok(variantFound / Math.max(1, variantChecks) >= 0.9, `varianti dopo l'errore: ${variantFound}/${variantChecks}`);
  console.log(`  varianti proposte entro 5 esercizi dopo un errore: ${variantFound}/${variantChecks}; sessione più lunga: ${maxAnswered} esercizi`);

  // dopo 2 errori sullo stesso argomento: scelta multipla
  {
    const e3 = freshEnv(11);
    e3.state.level = 'A1';
    const s = e3.EC.session.create(e3.state, { rng: e3.EC.util.makeRng(11) });
    let it = s.next();
    const topic = it.topic;
    s.answer('xyz');
    // forziamo due errori sullo stesso argomento e controlliamo il formato della variante
    let wrongs = 1, sawMcAfter2 = null, guard = 0;
    while (guard++ < 60 && sawMcAfter2 === null) {
      it = s.next();
      if (!it) break;
      if (it.topic === topic) {
        if (wrongs >= 2) { sawMcAfter2 = it.type === 'mc'; break; }
        s.answer('xyz'); wrongs++;
      } else s.answer(it.answers[0]);
    }
    ok(sawMcAfter2 === true, 'dopo 2 errori sullo stesso argomento ci si aspetta una scelta multipla');
  }

  // varietà tra sessioni consecutive
  {
    const e4 = freshEnv(21);
    e4.state.level = 'A2';
    const st = makeStudent(e4.EC, { pErr: 0.2, seed: 5 });
    const a = runSession(e4, st, { seed: 1 }).served.map((x) => x.id);
    e4.advanceDays(1);
    const b = runSession(e4, st, { seed: 2 }).served.map((x) => x.id);
    const overlap = b.filter((id) => a.includes(id)).length;
    ok(overlap <= 2, `sessioni consecutive troppo simili: ${overlap} esercizi uguali`);
    console.log(`  esercizi in comune tra due sessioni consecutive: ${overlap}`);
  }

  // ripresa di una sessione interrotta
  {
    const e5 = freshEnv(8);
    e5.state.level = 'A1';
    const s = e5.EC.session.create(e5.state, { rng: e5.EC.util.makeRng(8) });
    for (let i = 0; i < 4; i++) { const it = s.next(); s.answer(it.answers[0]); }
    const snap = e5.state.activeSession;
    ok(snap && snap.correct === 4, 'snapshot della sessione non salvato');
    const s2 = e5.EC.session.create(e5.state, { resume: snap, rng: e5.EC.util.makeRng(9) });
    ok(s2.correct === 4, 'la sessione ripresa non riparte dal conteggio salvato');
    const first = s2.next();
    ok(!snap.log.some((l) => l.id === first.id), 'la sessione ripresa ripropone un esercizio già fatto');
  }
}
function EC_LEVEL(seed) { return ['A1', 'A2', 'B1', 'B1+'][seed % 4]; }

/* ================= 5. test iniziale ================= */
section('Test iniziale (placement)');
{
  const profiles = [
    { name: 'nessuna base', known: [], estimated: null, working: 'A1' },
    { name: 'studente A1', known: ['A1'], estimated: 'A1', working: 'A2' },
    { name: 'studente A2', known: ['A1', 'A2'], estimated: 'A2', working: 'B1' },
    { name: 'studente B1', known: ['A1', 'A2', 'B1'], estimated: 'B1', working: 'B1+' },
    { name: 'studente B1+', known: ['A1', 'A2', 'B1', 'B1+'], estimated: 'B1+', working: 'B1+' }
  ];
  profiles.forEach((p) => {
    for (let seed = 1; seed <= 5; seed++) {
      const env = freshEnv(seed);
      const st = makeStudent(env.EC, { known: p.known, seed });
      const P = env.EC.placement.create({ rng: env.EC.util.makeRng(seed) });
      let n = 0, it;
      while ((it = P.next()) && n++ < 60) P.answer(st(it));
      const r = P.result();
      ok(r.estimated === p.estimated && r.workingLevel === p.working,
        `${p.name} (seed ${seed}): stimato ${r.estimated}/${r.workingLevel}, atteso ${p.estimated}/${p.working}`);
      ok(r.total >= 14 && r.total <= 32, `${p.name}: numero di domande fuori scala (${r.total})`);
      if (seed === 1) console.log(`  ${p.name}: ${r.total} domande → livello ${r.estimated || 'pre-A1'}, si allena su ${r.workingLevel}`);
      env.EC.learner.initFromPlacement(env.state, r);
      ok(env.state.level === p.working, `${p.name}: livello di lavoro non impostato`);
    }
  });
}

/* ================= 6. progressione e difficoltà ================= */
section('Difficoltà progressiva e salita di livello');
{
  // studente bravo: deve salire di livello e vedere gradini più alti col tempo
  const env = freshEnv(4);
  const { EC, state } = env;
  state.level = 'A1';
  const good = makeStudent(EC, { pErr: 0.05, seed: 3 });
  const avgDiff = [];
  let promotedOn = null;
  for (let day = 0; day < 90 && !promotedOn; day++) {
    const r = runSession(env, good, { seed: day + 1 });
    const main = r.served.filter((x) => !x.variant);
    avgDiff.push(main.reduce((a, x) => a + x.difficulty, 0) / main.length);
    if (r.summary.levelUp) promotedOn = day + 1;
    env.advanceDays(1);
  }
  ok(promotedOn !== null, 'lo studente bravo non è mai salito di livello in 90 giorni');
  ok(state.level === 'A2', 'livello atteso A2 dopo la promozione, trovato ' + state.level);
  const early = avgDiff.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
  const late = avgDiff.slice(-3).reduce((a, b) => a + b, 0) / 3;
  ok(late > early + 0.5, `il gradino medio non cresce abbastanza: ${early.toFixed(2)} → ${late.toFixed(2)}`);
  console.log(`  studente bravo: promosso ad A2 dopo ${promotedOn} sessioni (una al giorno); gradino medio ${early.toFixed(2)} → ${late.toFixed(2)}`);

  // studente in difficoltà: resta al livello, esercizi soprattutto di gradino 1
  const env2 = freshEnv(6);
  env2.state.level = 'A1';
  const weak = makeStudent(env2.EC, { pErr: 0.5, seed: 4 });
  let tiers = [];
  for (let day = 0; day < 20; day++) {
    const r = runSession(env2, weak, { seed: day + 50 });
    tiers = tiers.concat(r.served.map((x) => x.difficulty));
    ok(!r.summary.levelUp, 'lo studente in difficoltà non dovrebbe salire di livello');
    env2.advanceDays(1);
  }
  const share1 = tiers.filter((d) => d === 1).length / tiers.length;
  ok(share1 >= 0.5, 'allo studente in difficoltà servono soprattutto esercizi di gradino 1: ' + share1.toFixed(2));
  console.log(`  studente in difficoltà: resta su ${env2.state.level}, esercizi di gradino 1 = ${(share1 * 100).toFixed(0)}%`);

  // basi deboli di un livello inferiore tornano tra gli argomenti principali
  const env3 = freshEnv(9);
  env3.state.level = 'A2';
  env3.EC.learner.topicState(env3.state, 'present_simple').box = 0;
  env3.EC.data.topics.filter((t) => t.level === 'A1' && t.id !== 'present_simple').forEach((t) => {
    const st = env3.EC.learner.topicState(env3.state, t.id); st.box = 4; st.due = '2030-01-01';
  });
  let seen = 0;
  for (let k = 0; k < 6; k++) {
    // lo studente sbaglia sempre il present simple: deve restare una base debole
    const st3 = (it) => (it.topic === 'present_simple' ? (it.type === 'mc' ? it.options.find((o) => !it.answers.includes(o)) : 'xyz') : it.answers[0]);
    seen += runSession(env3, st3, { seed: k + 1 }).served.some((x) => x.topic === 'present_simple') ? 1 : 0;
    env3.advanceDays(1);
  }
  ok(seen >= 3, 'una base debole (present simple) dovrebbe tornare spesso anche al livello A2: ' + seen + '/6 sessioni');
}

/* ================= 7. salvataggio / backup ================= */
section('Backup');
{
  const env = freshEnv(2);
  const { EC, state } = env;
  state.profile.name = 'Test';
  state.settings.apiKey = 'sk-ant-secret';
  state.level = 'A2';
  runSession(env, makeStudent(EC, { pErr: 0.2 }));
  EC.storage._setMemory(state);
  const json = EC.storage.exportJson(state);
  ok(!json.includes('sk-ant-secret'), 'la chiave API finisce nel backup');
  const back = EC.storage.importJson(json);
  ok(back.level === 'A2' && back.sessions.length === 1 && back.profile.name === 'Test', 'import del backup non ripristina i dati');
  let threw = false;
  try { EC.storage.importJson('{"foo":1}'); } catch (e) { threw = true; }
  ok(threw, 'un file non valido dovrebbe essere rifiutato');
}

/* ================= 8. AI: validazione delle risposte ================= */
section('AI (validazione offline, senza chiamate di rete)');
{
  const EC = load();
  const raw = { items: [
    { topic: 'present_simple', difficulty: 1, type: 'mc', instruction: '', prompt: 'He ___ tennis.', options: ['play', 'plays', 'playing'], answers: ['plays'], explanation: 'Terza persona singolare: -s.', notes: [{ wrong: 'play', why: 'manca la -s' }], group: 'x' },
    { topic: 'present_simple', difficulty: 2, type: 'mc', instruction: '', prompt: 'Bad', options: ['a', 'b'], answers: ['c'], explanation: 'risposta non tra le opzioni', notes: [], group: 'x' },
    { topic: 'not_allowed', difficulty: 1, type: 'gap', instruction: '', prompt: 'x ___', options: [], answers: ['y'], explanation: 'argomento non richiesto', notes: [], group: 'x' },
    { topic: 'present_simple', difficulty: 2, type: 'gap', instruction: '', prompt: 'She ___ (go) home.', options: [], answers: ['goes'], explanation: 'Terza persona: goes.', notes: [{ wrong: 'goes', why: 'nota che coincide con la risposta: va scartata' }], group: 'y' }
  ] };
  const out = EC.ai.sanitize(raw, ['present_simple']);
  ok(out.length === 2, 'sanitize dovrebbe tenere 2 esercizi validi su 4, tenuti: ' + out.length);
  ok(out.every((i) => i.ai && /^ai_/.test(i.id)), 'gli esercizi AI devono avere id ai_ e flag ai');
  ok(out[0].notes.playing, 'sanitize dovrebbe aggiungere una nota generica ai distrattori senza nota');
  ok(!out[1].notes.goes, 'una nota uguale alla risposta corretta va scartata');
  const st = EC.storage.defaultState();
  ok(!EC.ai.enabled(st), 'AI attiva senza chiave');
}

console.log(`\n${failures ? '✗' : '✓'} ${passes} controlli superati, ${failures} falliti`);
process.exit(failures ? 1 : 0);
