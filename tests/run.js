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

/* ================= 8b. traduzione libera ================= */
section('Traduzione libera (testi, correzione offline e AI, progressi)');
{
  const env = freshEnv(11);
  const { EC, state } = env;
  const W = EC.writing;
  state.level = 'A2';
  ok(EC.data.texts.length >= 12, 'servono almeno 12 testi nella banca, trovati ' + EC.data.texts.length);
  EC.LEVELS.forEach((l) => ok(EC.data.texts.some((t) => t.level === l), 'nessun testo di livello ' + l));

  // confronto per frammenti (parole intere, contrazioni equivalenti)
  ok(W.containsPhrase("He doesn't works here", 'does not works'), 'containsPhrase deve espandere le contrazioni');
  ok(!W.containsPhrase('two brothers', 'two brother'), 'containsPhrase deve confrontare parole intere');

  // valutazione offline
  const s = EC.data.textById.w_a1_presento.sentences[0];
  ok(W.gradeSentence(s, "my name's Luca and I'm fourteen").status === 'ok', 'traduzione prevista (con contrazioni) va accettata');
  const g2 = W.gradeSentence(s, 'My name is Luca and I have fourteen years.');
  ok(g2.status === 'wrong' && g2.errors.length && g2.errors[0].topic === 'be', 'un errore tipico va riconosciuto dentro la frase, con argomento');
  const g3 = W.gradeSentence(s, 'Luca is my name, I am fourteen.');
  ok(g3.status === 'check' && g3.model, 'una traduzione non prevista e senza errori noti va autovalutata');
  W.resolveCheck(g3, true);
  ok(g3.status === 'ok' && g3.selfAssessed, 'autovalutazione "giusta"');
  ok(W.gradeSentence(s, '   ').status === 'wrong', 'una frase vuota è sbagliata');

  // correzione AI → formato comune
  const text = EC.data.textById.w_a2_cucina;
  const answers = ['At the moment my mother prepares dinner.', "There isn't much milk, but there are some eggs.", 'I have to buy some bread and some cheese.', "You mustn't touch the oven, it's really hot!"];
  const raw = { sentences: [
    { n: 1, acceptable: false, corrected: 'At the moment my mother is preparing dinner.', better: '', errors: [{ wrong: 'prepares', right: 'is preparing', why: 'Azione in corso.', topic: 'ps_vs_pc' }], comment: 'Quasi!' },
    { n: 3, acceptable: false, corrected: 'I have to buy some bread and some cheese.', better: '', errors: [], comment: 'x' },
    { n: 4, acceptable: true, corrected: "You mustn't touch the oven, it's really hot!", better: "You mustn't touch the oven: it's very hot!", errors: [], comment: 'Bravo!' }
  ] };
  const res = W.fromAi(raw, text, answers);
  ok(res[0].status === 'wrong' && res[0].by === 'ai' && res[0].errors[0].topic === 'ps_vs_pc', 'errore AI non convertito');
  ok(res[1].status === 'ok' && res[1].by === 'bank', 'una traduzione prevista non deve dipendere dall\'AI');
  ok(res[2].status === 'ok', 'risposta prevista: giusta anche se l\'AI la segna sbagliata');
  ok(res[3].status === 'ok' && res[3].model.indexOf('very hot') !== -1, 'accettata dall\'AI, con versione più naturale');
  ok(W.retypeOk(res[0], text.sentences[0], 'at the moment my mother is preparing dinner'), 'la riscrittura della frase corretta va accettata');
  ok(!W.retypeOk(res[0], text.sentences[0], 'at the moment my mother prepares dinner'), 'la riscrittura sbagliata va rifiutata');
  const res2 = W.fromAi({ sentences: [{ n: 1, acceptable: false, corrected: '', better: '', errors: [{ wrong: 'x', right: 'y', why: 'z', topic: 'inventato' }], comment: '' }] }, text, ['My mum prepare dinner now.', '', '', '']);
  ok(res2[0].status === 'wrong' && res2[0].corrected && res2[0].errors[0].topic === null, 'argomento inventato dall\'AI va scartato, correzione di riserva = modello');

  // testo generato dall'AI
  const gen = W.sanitizeText({ title: 'Prova', sentences: [
    { it: 'Ho visto un film.', en: ['I saw a film.', 'I watched a film.'], topics: ['past_simple', 'inventato'], explanation: 'Passato concluso.', tips: [{ wrong: 'i have seen', right: 'I saw', why: '...', topic: 'past_simple' }, { wrong: 'a film', right: '-', why: 'compare nella risposta: da scartare', topic: 'past_simple' }] },
    { it: 'Senza argomenti validi.', en: ['No topics.'], topics: ['nope'], explanation: '', tips: [] },
    { it: 'Mio fratello è più alto di me.', en: ['My brother is taller than me.'], topics: ['comparatives'], explanation: 'Comparativo.', tips: [] }
  ] }, { level: 'A2' });
  ok(gen && gen.sentences.length === 2 && /^wai_/.test(gen.id) && gen.ai, 'sanitizeText: tiene solo le frasi con argomenti validi');
  ok(gen.sentences[0].topics.join() === 'past_simple' && gen.sentences[0].tips.length === 1, 'sanitizeText: filtra argomenti e tips incoerenti');
  ok(W.sanitizeText({ title: 'x', sentences: [] }) === null, 'un testo vuoto va rifiutato');

  // attività completa: errori → rinforzo → progressi
  const t = W.pickText(state, EC.util.makeRng(3));
  ok(t && t.level === 'A2', 'pickText deve scegliere un testo del livello di lavoro');
  W.start(state, text, 'bank');
  W.setAnswers(state, answers);
  W.setResults(state, res);
  ok(W.drillTopics(state.activeWriting).join() === 'ps_vs_pc', 'rinforzo sugli argomenti sbagliati');
  const di = W.drillItem(state, 'ps_vs_pc', EC.util.makeRng(1));
  ok(di && di.topic === 'ps_vs_pc', 'esercizio di rinforzo dello stesso argomento');
  W.recordDrill(state, di, true);
  env.tick(4 * 60000);
  const sum = W.finish(state);
  ok(sum && sum.total === 4 && sum.correct === 3 && sum.errors.length === 1 && sum.minutes === 4, 'riepilogo della traduzione');
  ok(sum.perTopic.ps_vs_pc.wrong === 1 && sum.perTopic.ps_vs_pc.correct === 1, 'errore e rinforzo contano sull\'argomento');
  ok(sum.perTopic.modals_obligation.correct >= 1 && state.topics.modals_obligation.box === 1, 'frase giusta: l\'argomento sale di scatola');
  ok(state.topics.ps_vs_pc.box === 0 && state.topics.ps_vs_pc.due === EC.util.addDays(EC.util.today(), 1), 'argomento sbagliato: torna domani');
  ok(state.activeWriting === null && state.writings.length === 1 && state.streak.count === 1, 'la traduzione conclusa va in storico e conta per la serie di giorni');
  ok(W.focusTopics(state, 4)[0] === 'ps_vs_pc', 'la traduzione successiva punta sugli errori di questa');
  ok(W.pickText(state, EC.util.makeRng(3)).id !== text.id || EC.data.texts.filter((x) => x.level === 'A2').length === 1, 'un testo appena fatto non va riproposto subito');
  ok(EC.report.buildWriting(state, sum)._subject.indexOf('3/4') !== -1, 'resoconto email della traduzione');

  // sincronizzazione: storico unito e attività in corso
  const other = EC.storage.defaultState();
  const m = EC.sync.merge(other, state);
  ok(m.writings.length === 1 && m.streak.count === 1, 'merge: lo storico delle traduzioni deve unirsi e contare per la serie');
  ok(EC.sync.merge(m, state).writings.length === 1, 'merge idempotente sulle traduzioni');
  const st2 = EC.util.clone(state);
  W.start(st2, text, 'bank');
  const m2 = EC.sync.merge(state, st2);
  ok(m2.activeWriting && m2.activeWriting.text.id === text.id, 'merge: la traduzione in corso deve passare all\'altro dispositivo');
  const old = EC.storage.defaultState(); delete old.writings; delete old.activeWriting;
  EC.storage._setMemory(old);
  ok(Array.isArray(EC.storage.load().writings), 'migrate deve aggiungere writings ai dati vecchi');
}

/* ================= 9. sincronizzazione tra dispositivi ================= */
section('Sincronizzazione tra dispositivi (GitHub Gist simulato)');
(async () => {
  // --- finto GitHub in memoria ---
  const gists = {};
  let nextId = 1, calls = 0, online = true;
  const TOKEN = 'github_pat_TEST';
  function reply(status, body) { return { ok: status < 300, status, json: async () => body, text: async () => JSON.stringify(body) }; }
  globalThis.fetch = async (url, opts = {}) => {
    calls++;
    if (!online) throw new TypeError('Failed to fetch');
    if ((opts.headers || {}).Authorization !== 'Bearer ' + TOKEN) return reply(401, { message: 'Bad credentials' });
    const u = new URL(url);
    const m = u.pathname.match(/^\/gists(?:\/(\w+))?$/);
    if (!m) return reply(404, {});
    const method = opts.method || 'GET';
    if (!m[1] && method === 'GET') return reply(200, Object.values(gists).map((g) => ({ id: g.id, updated_at: g.updated_at, files: { [Object.keys(g.files)[0]]: {} } })));
    if (!m[1] && method === 'POST') {
      const b = JSON.parse(opts.body); const id = 'g' + nextId++;
      gists[id] = { id, public: b.public, files: b.files, updated_at: new Date().toISOString() };
      return reply(201, { id });
    }
    const g = gists[m[1]];
    if (!g) return reply(404, { message: 'Not Found' });
    if (method === 'GET') return reply(200, { id: g.id, files: Object.fromEntries(Object.entries(g.files).map(([k, v]) => [k, { content: v.content, truncated: false }])) });
    if (method === 'PATCH') { const b = JSON.parse(opts.body); Object.assign(g.files, b.files); g.updated_at = new Date().toISOString(); return reply(200, { id: g.id }); }
    return reply(405, {});
  };

  // tre "dispositivi" che condividono lo stesso orologio simulato
  const env = freshEnv(31);
  const { EC } = env;
  const S = EC.sync;
  const newDevice = () => { const st = EC.storage.defaultState(); return st; };
  const mac = newDevice();
  mac.profile.name = 'Marco';
  mac.settings.apiKey = 'sk-ant-SEGRETO';
  mac.level = 'A2';
  const student = makeStudent(EC, { pErr: 0.2, seed: 8 });
  const sessOn = (st, seed) => {
    const sv = env.state; env.state = st;
    const r = runSession(env, student, { seed });
    env.state = sv; return r;
  };

  // 1. il Mac attiva la sincronizzazione: crea il Gist
  sessOn(mac, 1);
  let r = await S.setup(mac, TOKEN);
  ok(r.created && Object.keys(gists).length === 1, 'setup sul primo dispositivo dovrebbe creare un Gist');
  ok(gists[mac.settings.sync.gistId].public === false, 'il Gist deve essere segreto (public: false)');
  const content = Object.values(gists)[0].files[S.FILE].content;
  ok(!content.includes('sk-ant-SEGRETO') && !content.includes(TOKEN), 'il Gist non deve contenere chiave AI o token');

  // 2. l'iPad (nuovo) si collega: ritrova il Gist e scarica i progressi
  const ipad = newDevice();
  env.advanceDays(1);
  r = await S.setup(ipad, TOKEN);
  const ipadState = r.state;
  ok(!r.created && Object.keys(gists).length === 1, 'il secondo dispositivo deve ritrovare il Gist esistente, non crearne uno nuovo');
  ok(ipadState.profile.name === 'Marco' && ipadState.level === 'A2' && ipadState.sessions.length === 1, 'il secondo dispositivo non ha ricevuto i progressi');
  ok(ipadState.settings.apiKey === '' && ipadState.settings.sync.token === TOKEN, 'le impostazioni devono restare quelle locali del dispositivo');

  // 3. entrambi lavorano OFFLINE, poi si sincronizzano: nessuna sessione persa
  sessOn(mac, 2); env.advanceDays(1);
  sessOn(ipadState, 3); sessOn(ipadState, 4);
  online = false;
  let threw = null;
  try { await S.syncNow(mac); } catch (e) { threw = e; }
  ok(threw && threw.offline && S.status.state === 'offline', 'senza rete la sincronizzazione deve segnalare "offline"');
  online = true;
  const a = await S.syncNow(mac);      // Mac carica le sue 2 sessioni
  const b = await S.syncNow(ipadState); // iPad unisce: 1 + 1 (Mac) + 2 (iPad) = 4
  const c = await S.syncNow(a.state);  // Mac riceve quelle dell'iPad
  ok(b.state.sessions.length === 4 && c.state.sessions.length === 4, `sessioni dopo l'unione: iPad ${b.state.sessions.length}, Mac ${c.state.sessions.length} (attese 4)`);
  if (!S.sameData(b.state, c.state)) {
    const pb = S.publicCopy(b.state), pc = S.publicCopy(c.state);
    Object.keys(pb).forEach((k) => { if (k !== 'updatedAt' && JSON.stringify(pb[k]) !== JSON.stringify(pc[k])) console.log('    diff in', k, JSON.stringify(pb[k]).slice(0, 200), '\n      vs', JSON.stringify(pc[k]).slice(0, 200)); });
  }
  ok(S.sameData(b.state, c.state), 'dopo la sincronizzazione i due dispositivi devono avere gli stessi dati');
  ok(c.state.streak.count === 3, 'la serie di giorni consecutivi va ricalcolata unendo i dispositivi: ' + c.state.streak.count);

  // 4. l'unione è stabile: rifarla non cambia nulla e non ricarica
  const before = calls;
  const again = await S.syncNow(c.state);
  ok(!again.changed && S.sameData(again.state, c.state), 'una seconda sincronizzazione non deve cambiare i dati');
  ok(calls - before === 1, 'senza novità basta leggere il Gist, senza riscriverlo (chiamate: ' + (calls - before) + ')');

  // 5. livello: se un dispositivo sale di livello, sale anche l'altro
  const m1 = EC.util.clone(c.state); m1.level = 'B1'; m1.updatedAt += 10;
  ok(S.merge(b.state, m1).level === 'B1' && S.merge(m1, b.state).level === 'B1', 'il livello più alto deve vincere');

  // 6. sessione in corso già completata altrove: non va riproposta
  const x = EC.util.clone(c.state); x.activeSession = { start: x.sessions[0].start, answered: 3, correct: 3, log: [] };
  ok(S.merge(x, c.state).activeSession === null, 'una sessione già completata non deve restare "in corso"');
  const y = EC.util.clone(c.state); y.activeSession = { start: 999, answered: 5, correct: 4, log: [] };
  ok(S.merge(c.state, y).activeSession && S.merge(c.state, y).activeSession.start === 999, 'una sessione in corso su un altro dispositivo va ripresa');

  // 7. azzeramento: vale per tutti i dispositivi
  EC.storage._setMemory(c.state);
  const wiped = EC.storage.reset();
  await S.pushReplace(wiped);
  const after = await S.syncNow(b.state);
  ok(after.state.sessions.length === 0 && after.state.level === null, 'dopo un azzeramento gli altri dispositivi devono azzerarsi');
  ok(after.state.settings.sync.token === TOKEN, 'l\'azzeramento non deve cancellare le impostazioni locali');

  // 8. token sbagliato
  let err = null;
  try { await S.setup(newDevice(), 'github_pat_SBAGLIATO'); } catch (e) { err = e; }
  ok(err && /non valido/.test(err.message), 'un token sbagliato deve dare un messaggio chiaro');

  // 9. backup senza segreti
  const bk = EC.storage.exportJson(Object.assign(EC.storage.defaultState(), { settings: { apiKey: 'k', aiModel: 'x', sync: { token: TOKEN, enabled: true } } }));
  ok(!bk.includes(TOKEN) && !bk.includes('"k"'), 'il backup non deve contenere token o chiave');

  // 10. link di collegamento
  const tokReal = 'github_pat_11ABCDEFG0123456789_abcdefghijklmnopqrstuvwxyz';
  const link = S.makeLink('https://piuzzo.github.io/english-coach/#vecchio', tokReal);
  ok(link === 'https://piuzzo.github.io/english-coach/#collega=' + tokReal, 'formato del link di collegamento: ' + link);
  ok(S.parseLink(new URL(link).hash) === tokReal, 'il link non restituisce il token');
  ok(S.parseLink('#foo=1&collega=' + tokReal) === tokReal, 'parseLink con altri parametri');
  ok(S.parseLink('#collega=<script>alert(1)</script>') === null, 'parseLink deve rifiutare testo che non è un token');
  ok(S.parseLink('#altro') === null && S.parseLink('') === null, 'parseLink senza token');
  ok(typeof globalThis.qrcode === 'function', 'libreria QR non caricata');
  const q = globalThis.qrcode(0, 'L'); q.addData(link); q.make();
  ok(q.getModuleCount() >= 21 && /<svg/.test(q.createSvgTag({ cellSize: 4, margin: 4, scalable: true })), 'il codice QR non viene generato');

  // 11. resoconto via email (FormSubmit simulato)
  {
    const R = EC.report;
    const st = EC.storage.defaultState();
    st.profile.name = 'Marco'; st.level = 'A2';
    const sum = sessOn(st, 77).summary;
    ok(!R.enqueue(st, sum), 'senza impostazioni non si deve accodare nulla');
    ok(!R.validEmail('ciao') && R.validEmail('pio@example.com'), 'validazione indirizzo email');
    R.setConfig(st, true, 'genitore@example.com');
    ok(R.enqueue(st, sum, { device: 'Mac', levelStatus: EC.learner.levelUpStatus(st) }), 'il resoconto dovrebbe entrare in coda');
    ok(!R.enqueue(st, sum), 'lo stesso resoconto non deve essere accodato due volte');
    const f = R.queue(st)[0].fields;
    ok(/Marco/.test(f._subject) && f._template === 'table' && f['Studente'] === 'Marco' && /10 risposte corrette/.test(f['Risultato']), 'contenuto dell\'email incompleto');
    ok(Object.keys(f).filter((k) => /^Errore \d+$/.test(k)).length === Math.min(10, sum.errors.length), 'gli errori della sessione devono comparire nell\'email');

    const sent = [];
    let mode = 'down';
    const realFetch = globalThis.fetch;
    globalThis.fetch = async (url, opts) => {
      if (!String(url).startsWith('https://formsubmit.co/ajax/')) return realFetch(url, opts);
      if (mode === 'offline') throw new TypeError('Failed to fetch');
      if (mode === 'down') return { ok: false, status: 522, json: async () => { throw new Error('html'); } };
      if (mode === 'activate') return { ok: true, status: 200, json: async () => ({ success: 'false', message: 'This form needs Activation. We\'ve sent you an email containing an \'Activate Form\' button.' }) };
      if (mode === 'reject') return { ok: false, status: 400, json: async () => ({ success: 'false', message: 'Bad request' }) };
      sent.push({ url, body: JSON.parse(opts.body) });
      return { ok: true, status: 200, json: async () => ({ success: 'true', message: 'The form was submitted successfully.' }) };
    };
    let r1 = await R.flush(st);
    ok(r1.sent === 0 && r1.pending === 1 && R.info(st).lastError, 'con il servizio irraggiungibile il resoconto deve restare in coda');
    mode = 'offline';
    r1 = await R.flush(st);
    ok(r1.pending === 1, 'offline: il resoconto resta in coda');
    mode = 'activate';
    r1 = await R.flush(st);
    ok(r1.sent === 1 && r1.pending === 0 && R.info(st).needsActivation, 'la richiesta di attivazione conta come inviato (FormSubmit consegna dopo la conferma)');
    mode = 'ok';
    const sum2 = sessOn(st, 78).summary;
    R.enqueue(st, sum2);
    r1 = await R.flush(st);
    ok(r1.sent === 1 && sent.length === 1 && sent[0].url.endsWith(encodeURIComponent('genitore@example.com')), 'invio non riuscito o indirizzo sbagliato');
    mode = 'reject';
    R.enqueue(st, sessOn(st, 79).summary);
    for (let k = 0; k < 4; k++) await R.flush(st);
    ok(R.queue(st).length === 0, 'un resoconto rifiutato più volte va scartato');
    // vecchi di oltre 7 giorni: scartati
    mode = 'down';
    R.enqueue(st, sessOn(st, 80).summary);
    env.advanceDays(8);
    await R.flush(st);
    ok(R.queue(st).length === 0, 'i resoconti più vecchi di 7 giorni vanno scartati');
    // impostazioni sincronizzate, coda no
    const other = EC.storage.defaultState();
    const merged = S.merge(other, st);
    ok(merged.reports.enabled && merged.reports.email === 'genitore@example.com', 'le impostazioni email devono sincronizzarsi');
    ok(merged.settings.mailQueue.length === 0 && !S.publicCopy(st).settings.mailQueue, 'la coda email non deve uscire dal dispositivo');
    const older = EC.util.clone(st); older.reports = { enabled: false, email: '', updatedAt: 1 };
    ok(S.merge(older, st).reports.enabled === true, 'vince la modifica più recente delle impostazioni email');
    ok(!EC.storage.exportJson(st).includes('mailQueue'), 'la coda email non deve finire nel backup');
    globalThis.fetch = realFetch;
  }

  console.log(`  3 dispositivi simulati, ${Object.keys(gists).length} Gist, ${calls} chiamate API simulate`);
  console.log(`\n${failures ? '✗' : '✓'} ${passes} controlli superati, ${failures} falliti`);
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.log('  ✗ eccezione nei test di sincronizzazione: ' + (e && e.stack || e)); process.exit(1); });
