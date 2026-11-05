# CLAUDE.md — English Coach

Web app offline per allenare l'inglese di uno studente italiano di prima superiore (14–15 anni): test iniziale adattivo, sessioni che finiscono solo dopo **10 risposte corrette**, spiegazione di ogni errore, variante sulla stessa regola 2–3 esercizi dopo, difficoltà che cresce da sola (A1 → A2 → B1 → B1+). Interfaccia e spiegazioni in **italiano**, esercizi in inglese britannico.

## Vincoli fondamentali

- **Si apre con doppio clic su `index.html` (file://)**: niente ES modules, niente bundler, niente `fetch` di file locali, niente dipendenze npm a runtime. Tutti i file sono script classici che usano il namespace globale `EC`.
- **Ordine degli script = ordine in `index.html`**. `tests/load.js` legge quella lista per caricare gli stessi file in Node: un nuovo file va aggiunto lì, nel punto giusto.
- I file `js/ui.js` e `js/app.js` sono solo browser (DOM). Tutto il resto deve restare eseguibile in Node.
- I progressi sono in `localStorage` (chiave `englishCoach.v1`). Lo schema è in `js/storage.js → defaultState()`. Se aggiungi campi, `migrate()` li completa per i dati vecchi: non rompere i backup esistenti.
- La chiave API e il token GitHub non devono mai finire nei backup né nel Gist (`exportJson` e `EC.sync.publicCopy` tengono solo `aiModel` delle impostazioni). Le impostazioni sono sempre locali al dispositivo.
- Sincronizzazione: `app.js` usa `adopt()` per sostituire il contenuto di `state` **mantenendo lo stesso oggetto** (la sessione in corso ne tiene un riferimento). Momenti di sync: avvio, prima di una sessione (max 5 s), 20 s dopo l'ultima risposta, fine sessione/test, pagina nascosta, ritorno online. `merge()` deve restare deterministico e idempotente (testato in `tests/run.js`, sezione 9, con un finto GitHub in memoria).

## Struttura

| File | Ruolo |
|---|---|
| `js/core.js` | namespace `EC`, registro contenuti (`addTopics/addItems/addPassages`), utilità (rng con seme, date locali `YYYY-MM-DD`, `escapeHtml`) |
| `data/topics.js` | 43 argomenti: `id, level, area, title, rule, examples, it, prereq` |
| `data/grammar-*.js`, `vocab.js`, `reading.js` | banca esercizi (~713). Formato in `docs/FORMATO-ESERCIZI.md` |
| `js/matcher.js` | confronto risposte scritte (contrazioni, apostrofi, punteggiatura, `'s`/`'d` ambigui, errori di battitura) |
| `js/generators.js` | 13 generatori a modello (`{id, topic, tiers, make(tier, rng)}`), forme verbali scritte a mano in tabelle |
| `js/learner.js` | scatole Leitner 0–5 per argomento, gradino = f(scatola), promozione di livello, streak |
| `js/placement.js` | test adattivo: blocchi da 7 (≥5 = superato) partendo da A2 + fase diagnostica |
| `js/session.js` | motore sessione: pool core/review/stretch (60/25/15), no argomento ripetuto di fila, varianti dopo errore, impalcatura (gradino −1, poi solo `mc`), snapshot per riprendere |
| `js/ai.js` | Claude API facoltativa via `fetch` diretto dal browser (header `anthropic-dangerous-direct-browser-access`), output JSON strutturato, `sanitize()` valida ogni esercizio generato |
| `js/sync.js` | sincronizzazione tra dispositivi via Gist segreto GitHub (`english-coach-progress.json`): `merge()` puro (unione di sessioni per `start`, argomenti/esercizi per `last`, livello = il più alto, streak ricalcolata, `resetAt` più recente vince), client REST GitHub, `syncNow()` = scarica → unisci → carica solo se cambiato |
| `js/ui.js`, `js/app.js` | componenti grafici e schermate (home, test, sessione, riepilogo, progressi, area genitore, guida) |
| `css/style.css` | design token su `:root`, tema scuro automatico, responsive |

## Regole pedagogiche da preservare

- La sessione termina **solo** a `EC.session.CFG.TARGET` (10) risposte corrette; un'interruzione non azzera il conteggio (`state.activeSession`).
- Ogni errore mostra: risposta data, risposta giusta, nota specifica del distrattore (`notes`), spiegazione, regola dell'argomento. Le risposte scritte vanno riscritte prima di proseguire.
- Ogni opzione sbagliata di una `mc` deve avere una nota in italiano che spiega PERCHÉ è sbagliata.
- Ogni argomento deve avere esercizi di tutti e 3 i gradini e gruppi (`group`) con almeno 2 esercizi, così esiste sempre una variante.
- Parametri pedagogici: `EC.learner.CFG` (intervalli, soglie di promozione) e `EC.session.CFG` (mix, probabilità generatori/AI).

## Pubblicazione

- Online su **GitHub Pages**: https://piuzzo.github.io/english-coach/ (repo pubblico `piuzzo/english-coach`, branch `main`, cartella radice). Ogni push su `main` pubblica in 1–2 minuti: **non pubblicare mai dati personali o segreti nel repo**.
- `manifest.webmanifest` e `icons/` rendono l'app installabile su iPad/iPhone ("Aggiungi alla schermata Home"); il manifest viene collegato solo su http(s) (su file:// il browser lo rifiuterebbe).
- L'app deve continuare a funzionare anche aperta in locale da file:// (uso offline su Mac/PC).

## Link di collegamento

`#collega=<token>` nel frammento dell'URL (mai inviato al server), creato da `EC.sync.makeLink` e letto da `EC.sync.parseLink` (accetta solo `[A-Za-z0-9_]{20,255}`). Da file:// il link punta all'indirizzo pubblico. Su iPad/iPhone in Safari il frammento resta nell'indirizzo e il manifest non viene collegato: così "Aggiungi alla schermata Home" salva il link e l'icona (che ha una memoria separata da Safari) si collega da sola al primo avvio. Il QR usa `js/vendor/qrcode.js` (qrcode-generator 1.4.4, MIT, incluso così com'è).

## Guida in-app

La schermata **Guida** (`guide()` in `js/app.js`) contiene le istruzioni per studente, installazione, sincronizzazione, backup, AI e FAQ, e rileva il dispositivo (`deviceInfo()`). Se cambi un flusso (sync, link, installazione, backup) aggiorna **sia la Guida sia `README.md`**.

## Comandi

```bash
node tests/validate.js                    # valida tutta la banca (deve dire "OK: nessun errore.")
node tests/validate.js data/vocab.js      # valida un solo file
node tests/run.js                         # tutti i test: banca, generatori, matcher, sessione, test iniziale, progressione, backup, AI
```

Dopo ogni modifica a contenuti o logica: lancia entrambi. I test usano un orologio finto (`EC.util.now`) e rng con seme, quindi sono deterministici.

Per provarla nel browser basta aprire `index.html`. Per test automatici nel browser esiste l'hook `EC._app` (`ctx`, `getState()`), utile con Chrome headless via DevTools Protocol.

## Aggiungere esercizi

1. Leggi `docs/FORMATO-ESERCIZI.md` e il campo `it` dell'argomento in `data/topics.js` (errori tipici degli italiani da usare come distrattori).
2. Id univoci con prefisso dell'argomento, `difficulty` 1–3, `group` per la micro-regola, spiegazioni in italiano.
3. Per `gap`/`transform`/`translate` elenca tutte le risposte accettabili (le contrazioni sono già equivalenti; i nomi propri con `'s` no).
4. `node tests/validate.js data/<file>.js` deve passare.

## Aggiungere un argomento o un livello

Aggiungi l'argomento in `data/topics.js` (con `level` tra `EC.LEVELS`), poi ≥12 esercizi con ≥3 per gradino e ≥2 `mc`/`gap` di gradino ≤2 (servono al test iniziale). Un nuovo livello va aggiunto a `EC.LEVELS` in `js/core.js` e ai colori `--lvl-*` / `.level-badge[data-level]` in `css/style.css`.

## AI (Claude API)

- Modello predefinito `claude-opus-5-5` (selezionabile: `claude-sonnet-5-5`, `claude-haiku-5-5`), `anthropic-version: 2026-10-21`, `output_config.format` con `json_schema`, `effort` medium per generare / low per verificare.
- Fallback lato server (`fallbacks: "default"` + beta `server-side-fallback-2026-07-01`) su Opus/Sonnet; se la richiesta dà 400 si riprova senza.
- Ogni errore AI deve degradare in silenzio alla banca offline. Gli schemi JSON non possono avere chiavi dinamiche: le note arrivano come array `{wrong, why}` e `sanitize()` le converte.
- Prima di cambiare la chiamata API consulta la documentazione aggiornata (skill `claude-api`).

## Stile del codice

ES5-compatibile nei file del browser (`var`, funzioni, niente optional chaining), IIFE per modulo, commenti in italiano. Escapa sempre con `EC.util.escapeHtml` tutto ciò che finisce in `innerHTML` (contenuti, risposte dello studente, testo AI).
