# Formato degli esercizi

Per scrivere o aggiungere esercizi a English Coach. Ogni file in `data/` è un normale script JavaScript che chiama `EC.addItems([...], 'nome-file')` oppure, per la lettura, `EC.addPassages([...], 'reading')`.

Dopo ogni modifica lancia `node tests/validate.js data/<file>.js`: deve finire con `OK: nessun errore.`

## Campi comuni

| campo | obbligatorio | significato |
|---|---|---|
| `id` | sì | unico, solo `a-z 0-9 _`, con il prefisso dell'argomento (es. `ps_014`) |
| `topic` | sì | id di un argomento in `data/topics.js` |
| `difficulty` | sì | `1` riconoscere · `2` produrre con guida · `3` produrre in autonomia (vedi sotto) |
| `type` | sì | `mc` · `gap` · `error` · `order` · `transform` · `translate` |
| `prompt` | sì | il testo dell'esercizio |
| `answers` | sì | array delle risposte accettate (la prima è quella "ufficiale" mostrata dopo un errore) |
| `explanation` | sì | in **italiano**, 1–3 frasi: PERCHÉ la risposta giusta è giusta, citando la regola. Min 20 caratteri |
| `notes` | consigliato (obbligatorio per i distrattori `mc`) | `{ "risposta sbagliata": "spiegazione in italiano di perché è sbagliata" }` |
| `group` | sì | etichetta della micro-regola (es. `ps_3rd_person_s`, `ps_doesnt_base`). Item con lo stesso `group` sono "varianti": dopo un errore il sistema ne ripropone uno simile |
| `instruction` | solo `transform` (facoltativo negli altri) | consegna in italiano, es. "Volgi alla forma negativa" |
| `it` | facoltativo | traduzione italiana della frase, mostrata come aiuto dopo l'errore |

## Gradini di difficoltà
- **1 – riconoscere**: scelta multipla (`mc`) con frasi brevi e lessico semplice; distrattori chiari.
- **2 – produrre con guida**: `gap` con il verbo/parola base tra parentesi, `order`, `transform` semplici, `mc` più insidiosi.
- **3 – produrre in autonomia**: `error`, `translate`, `transform` più lunghi, frasi con più regole insieme, `gap` senza aiuto tra parentesi.

## Tipi di esercizio con esempi

### `mc` — scelta multipla (2–5 opzioni)
```js
{ id: 'ps_001', topic: 'present_simple', difficulty: 1, type: 'mc', group: 'ps_3rd_person_s',
  prompt: 'My sister ___ in a bank.',
  options: ['work', 'works', 'working', 'is work'],
  answers: ['works'],
  explanation: 'Con he/she/it (my sister = she) il present simple aggiunge -s al verbo: works.',
  notes: {
    'work': 'Manca la -s: con la terza persona singolare (my sister = she) il verbo prende la -s.',
    'working': 'La forma -ing da sola non è un tempo verbale: servirebbe "is working" (present continuous), ma qui si parla di un lavoro abituale.',
    'is work': 'Non si mette "is" davanti a un verbo al present simple: si dice "she works".'
  } }
```
Ogni opzione sbagliata DEVE avere una nota. Le note spiegano l'errore, possibilmente collegandolo all'italiano.

### `gap` — completa scrivendo (esattamente un `___`)
```js
{ id: 'ps_020', topic: 'present_simple', difficulty: 2, type: 'gap', group: 'ps_3rd_person_s',
  prompt: 'He ___ (watch) TV every evening.',
  answers: ['watches'],
  explanation: 'Con he/she/it i verbi che finiscono in -ch aggiungono -es: watch → watches.',
  notes: { 'watchs': 'Dopo -ch si aggiunge -es, non solo -s: watches.', 'watch': 'Manca la desinenza della terza persona: he watches.' } }
```
La risposta è solo la parola (o le parole) mancante. Se più risposte sono accettabili, elencale tutte (`['doesn\'t like', 'does not like']` non serve: le contrazioni sono già equivalenti).

### `error` — trova e correggi l'errore
Lo studente vede la frase sbagliata (già scritta nella casella) e la riscrive corretta.
```js
{ id: 'ps_040', topic: 'present_simple', difficulty: 3, type: 'error', group: 'ps_does_base',
  prompt: 'Does your brother plays the guitar?',
  wrong: 'plays',
  answers: ['Does your brother play the guitar?'],
  explanation: 'Dopo does il verbo resta alla forma base: la -s della terza persona è già "dentro" does.' }
```
`wrong` = la parte sbagliata (facoltativo, aiuta la spiegazione). Esattamente UN errore per frase.

### `order` — riordina le parole
Le tessere vengono create dividendo la prima risposta in parole (punteggiatura finale e maiuscole non contano).
```js
{ id: 'ps_050', topic: 'present_simple', difficulty: 2, type: 'order', group: 'ps_question_order',
  prompt: 'Riordina le parole per formare una domanda.',
  answers: ['Where does your father work?'],
  explanation: 'Ordine della domanda: parola interrogativa + does + soggetto + verbo base.' }
```
Se più ordini sono corretti, aggiungili in `answers` (stesse parole). Da 3 a 12 parole.

### `transform` — trasforma la frase
```js
{ id: 'ps_060', topic: 'present_simple', difficulty: 2, type: 'transform', group: 'ps_negative',
  instruction: 'Volgi alla forma negativa.',
  prompt: 'She likes horror films.',
  answers: ['She doesn\'t like horror films.'],
  explanation: 'Negativa del present simple con she: doesn\'t + verbo base (like, senza -s).',
  notes: { 'She doesn\'t likes horror films.': 'Dopo doesn\'t il verbo torna alla forma base: like, non likes.', 'She don\'t like horror films.': 'Con he/she/it si usa doesn\'t, non don\'t.' } }
```

### `translate` — traduci dall'italiano
```js
{ id: 'be_070', topic: 'be', difficulty: 3, type: 'translate', group: 'be_age',
  prompt: 'Ho quattordici anni.',
  answers: ['I am fourteen.', 'I am 14.', 'I am fourteen years old.', 'I am 14 years old.'],
  explanation: 'Per l\'età in inglese si usa to be: I am 14 (years old).',
  notes: { 'I have fourteen years.': 'Errore tipico degli italiani: l\'età si esprime con to be, non con to have.', 'I have 14 years.': 'L\'età si esprime con to be: I am 14.' } }
```
Frasi brevi (max ~10 parole), elencando TUTTE le traduzioni ragionevoli (numeri in cifre e in lettere, contrazioni non servono).

## Testi di lettura
```js
EC.addPassages([
  { id: 'rd_a1_01', topic: 'reading_a1', title: 'My best friend',
    text: 'Primo paragrafo…\n\nSecondo paragrafo…',
    questions: [
      { q: 'How old is Tom?', options: ['12', '13', '14'], answer: '13', difficulty: 1,
        explanation: 'Il testo dice "Tom is thirteen" nella prima frase.' },
      { q: 'Tom likes cooking.', options: ['True', 'False', 'Not given'], answer: 'False', difficulty: 2,
        explanation: '…' }
    ] }
], 'reading');
```
`difficulty` per domanda: 1 = informazione esplicita, 2 = sinonimi/parafrasi, 3 = inferenza.

## Testi per la traduzione libera (`data/writing.js`)
```js
EC.addTexts([
  { id: 'w_a1_presento', level: 'A1', title: 'Mi presento',
    sentences: [
      { it: 'Mi chiamo Luca e ho quattordici anni.',
        en: ['My name is Luca and I am fourteen.', 'I am called Luca and I am fourteen years old.'],
        topics: ['be'],
        explanation: 'L\'età in inglese si dice con il verbo to be…',
        tips: [
          { wrong: 'i have fourteen', right: 'I am fourteen', why: 'L\'età si dice con to be…', topic: 'be' }
        ] }
    ] }
], 'data/writing.js');
```
- `id` inizia con `w_`; almeno 3 frasi (meglio 4); `level` tra `EC.LEVELS`.
- `en`: tutte le traduzioni ragionevoli (la prima è il modello mostrato). Le contrazioni sono già equivalenti; con il genitivo sassone e i nomi propri servono le varianti scritte.
- `topics`: gli argomenti che la frase allena (decidono quali scatole Leitner si muovono). Meglio di livello ≤ a quello del testo.
- `tips`: errori tipici degli italiani. `wrong` è un **frammento** (parole intere, minuscolo) cercato dentro la traduzione dello studente: se compare, la frase è sbagliata e si mostra `why`. Non deve comparire in nessuna risposta di `en` (lo controlla `tests/validate.js`). `topic` facoltativo (altrimenti il primo di `topics`).
- I testi creati dall'AI hanno lo stesso formato (`EC.writing.sanitizeText` li valida).

## Regole di qualità
- Inglese britannico standard, frasi naturali, contesti adatti a un ragazzo di 14–15 anni (scuola, sport, amici, famiglia, videogiochi, musica, viaggi). Nessun contenuto inappropriato.
- Una sola risposta corretta per gli `mc` (controlla che i distrattori siano davvero sbagliati in quel contesto).
- Spiegazioni in italiano semplice, tono incoraggiante, senza termini troppo tecnici (o spiegandoli).
- Usa i distrattori per gli errori tipici degli italiani (vedi il campo `it` degli argomenti in `data/topics.js`).
- Varietà: soggetti, verbi e contesti diversi; non ripetere la stessa frase con una parola cambiata.
