/* Esercizi di grammatica A2 (parte 1): present continuous, present simple vs continuous,
 * past simple, past continuous, numerabili / non numerabili.
 * Formato: vedi docs/FORMATO-ESERCIZI.md
 */
EC.addItems([

  /* ============================ PRESENT CONTINUOUS ============================ */
  { id: "pc_001", topic: "present_continuous", difficulty: 1, type: "mc", group: "pc_be_aux",
    prompt: "Look! My brother ___ a cake for Mum's birthday.",
    options: ["making", "is making", "makes", "are making"],
    answers: ["is making"],
    explanation: "Look! indica che l'azione succede adesso: serve il present continuous, cioè is/am/are + verbo-ing. My brother = he, quindi is making.",
    it: "Guarda! Mio fratello sta facendo una torta per il compleanno della mamma.",
    notes: {
      "making": "Manca il verbo essere: in inglese non si dice «he making», ma he IS making.",
      "makes": "Makes è present simple, per le abitudini. Con Look! l'azione sta succedendo adesso: is making.",
      "are making": "My brother è una persona sola (he): si usa is, non are."
    } },
  { id: "pc_002", topic: "present_continuous", difficulty: 1, type: "mc", group: "pc_be_aux",
    prompt: "We ___ for the bus right now.",
    options: ["are waiting", "waiting", "is waiting", "wait"],
    answers: ["are waiting"],
    explanation: "Right now = proprio adesso: present continuous. Con we si usa are + -ing: we are waiting.",
    it: "Stiamo aspettando l'autobus proprio adesso.",
    notes: {
      "waiting": "Manca are: il present continuous ha sempre bisogno del verbo essere (we ARE waiting).",
      "is waiting": "Con we si usa are, non is.",
      "wait": "Wait è present simple (abitudine). Right now chiede un'azione in corso: are waiting."
    } },
  { id: "pc_003", topic: "present_continuous", difficulty: 1, type: "mc", group: "pc_spelling",
    prompt: "The children are ___ in the pool.",
    options: ["swiming", "swimming", "swimeing"],
    answers: ["swimming"],
    explanation: "Swim finisce con vocale + consonante (i + m) ed è una sillaba sola: la consonante finale raddoppia → swimming.",
    it: "I bambini stanno nuotando in piscina.",
    notes: {
      "swiming": "Manca una m: nei verbi brevi che finiscono con vocale + consonante la consonante raddoppia (swim → swimming).",
      "swimeing": "Swim non finisce con -e, quindi non c'è nessuna e da aggiungere: swimming."
    } },
  { id: "pc_004", topic: "present_continuous", difficulty: 1, type: "mc", group: "pc_question",
    prompt: "___ you listening to me?",
    options: ["Are", "Do", "Is", "Have"],
    answers: ["Are"],
    explanation: "Nella domanda del present continuous si mette am/is/are prima del soggetto: Are you listening?",
    it: "Mi stai ascoltando?",
    notes: {
      "Do": "Do si usa nelle domande del present simple (Do you listen?). Con il verbo in -ing serve are.",
      "Is": "Con you si usa are, non is.",
      "Have": "Have non forma il present continuous: serve il verbo essere, Are you listening?"
    } },
  { id: "pc_005", topic: "present_continuous", difficulty: 1, type: "mc", group: "pc_negative",
    prompt: "I ___ TV, I'm doing my homework.",
    options: ["am not watching", "don't watching", "not watching", "am not watch"],
    answers: ["am not watching"],
    explanation: "Negativa del present continuous: am/is/are + not + verbo-ing. Con I: I am not (I'm not) watching.",
    it: "Non sto guardando la TV, sto facendo i compiti.",
    notes: {
      "don't watching": "Don't si usa con il present simple e il verbo base. Con -ing serve il verbo essere: I'm not watching.",
      "not watching": "Manca am: «I not watching» non è inglese. Si dice I am not watching.",
      "am not watch": "Dopo am not serve la forma in -ing: watching."
    } },
  { id: "pc_006", topic: "present_continuous", difficulty: 2, type: "gap", group: "pc_be_aux",
    prompt: "Be quiet! The baby ___ (sleep).",
    answers: ["is sleeping"],
    explanation: "Be quiet! fa capire che l'azione succede adesso. The baby = it, quindi is + sleeping.",
    it: "Fate silenzio! Il bambino sta dormendo.",
    notes: {
      "sleeping": "Manca is: in inglese il verbo essere non si può togliere (the baby IS sleeping).",
      "sleeps": "Sleeps è present simple, per le abitudini. Qui il bambino dorme in questo momento: is sleeping.",
      "are sleeping": "The baby è singolare: is sleeping."
    } },
  { id: "pc_007", topic: "present_continuous", difficulty: 2, type: "gap", group: "pc_spelling",
    prompt: "Look at Tom! He ___ (run) to the bus stop.",
    answers: ["is running"],
    explanation: "Run finisce con vocale + consonante: la n raddoppia → running. Con he: is running.",
    it: "Guarda Tom! Sta correndo alla fermata dell'autobus.",
    notes: {
      "is runing": "Attenzione all'ortografia: run → running, con due n.",
      "running": "Manca is: he IS running.",
      "runs": "Runs è present simple. Con Look at Tom! l'azione è in corso: is running."
    } },
  { id: "pc_008", topic: "present_continuous", difficulty: 2, type: "gap", group: "pc_spelling",
    prompt: "My sisters ___ (write) a song for the school concert.",
    answers: ["are writing"],
    explanation: "I verbi che finiscono in -e muta la perdono prima di -ing: write → writing. My sisters = they, quindi are writing.",
    it: "Le mie sorelle stanno scrivendo una canzone per il concerto della scuola.",
    notes: {
      "are writeing": "La -e finale cade: write → writing (come make → making).",
      "is writing": "My sisters è plurale (they): si usa are.",
      "are writting": "La t non raddoppia: write → writing, con una sola t.",
      "writing": "Manca are: my sisters ARE writing."
    } },
  { id: "pc_009", topic: "present_continuous", difficulty: 2, type: "order", group: "pc_question",
    prompt: "Riordina le parole per formare una domanda.",
    answers: ["What are you doing at the moment?"],
    explanation: "Domanda al present continuous: parola interrogativa (What) + are + soggetto (you) + verbo-ing (doing).",
    it: "Che cosa stai facendo in questo momento?" },
  { id: "pc_010", topic: "present_continuous", difficulty: 2, type: "transform", group: "pc_negative",
    instruction: "Volgi alla forma negativa.",
    prompt: "She is playing video games.",
    answers: ["She isn't playing video games."],
    explanation: "Per la negativa basta aggiungere not dopo is: she is not (isn't) playing.",
    it: "Lei non sta giocando ai videogiochi.",
    notes: {
      "She doesn't playing video games.": "Doesn't si usa con il present simple. Qui c'è is: basta aggiungere not → she isn't playing.",
      "She not playing video games.": "Manca is: she is not playing (o she isn't playing).",
      "She isn't play video games.": "Dopo isn't il verbo resta in -ing: playing."
    } },
  { id: "pc_011", topic: "present_continuous", difficulty: 2, type: "transform", group: "pc_question",
    instruction: "Volgi alla forma interrogativa.",
    prompt: "They are studying for the test.",
    answers: ["Are they studying for the test?"],
    explanation: "Nella domanda il verbo essere va prima del soggetto: Are they studying…?",
    it: "Stanno studiando per la verifica?",
    notes: {
      "They are studying for the test?": "In italiano basta il punto di domanda, in inglese no: bisogna invertire → Are they studying…?",
      "Do they studying for the test?": "Do non va con il verbo in -ing: la domanda si fa spostando are → Are they studying…?",
      "Do they study for the test?": "Questa è una domanda al present simple (abitudine). Qui serve il present continuous: Are they studying…?"
    } },
  { id: "pc_012", topic: "present_continuous", difficulty: 2, type: "mc", group: "pc_be_aux",
    prompt: "Dad and I ___ the kitchen this afternoon.",
    options: ["am painting", "are painting", "is painting", "painting"],
    answers: ["are painting"],
    explanation: "Dad and I = we (noi), quindi si usa are: we are painting. This afternoon indica un'azione in corso oggi.",
    it: "Io e papà stiamo dipingendo la cucina questo pomeriggio.",
    notes: {
      "am painting": "Am va solo con I da solo. Dad and I sono due persone (we): are painting.",
      "is painting": "Is va con he/she/it. Dad and I = we: are painting.",
      "painting": "Manca il verbo essere: Dad and I ARE painting."
    } },
  { id: "pc_013", topic: "present_continuous", difficulty: 3, type: "error", group: "pc_be_aux",
    prompt: "Listen! Anna singing in her room.",
    wrong: "singing",
    answers: ["Listen! Anna is singing in her room.", "Listen! Anna's singing in her room."],
    explanation: "Nel present continuous il verbo essere non si può togliere: Anna IS singing. In italiano «Anna canta» ha un verbo solo, in inglese ne servono due.",
    it: "Ascolta! Anna sta cantando in camera sua.",
    notes: {
      "Listen! Anna sings in her room.": "Sings è present simple (abitudine). Con Listen! l'azione è in corso: Anna is singing.",
      "Listen! Anna are singing in her room.": "Anna è una persona sola (she): is singing."
    } },
  { id: "pc_014", topic: "present_continuous", difficulty: 3, type: "error", group: "pc_spelling",
    prompt: "I'm siting next to my best friend on the bus.",
    wrong: "siting",
    answers: ["I'm sitting next to my best friend on the bus."],
    explanation: "Sit finisce con vocale + consonante (i + t): la t raddoppia → sitting, come swim → swimming e run → running.",
    it: "Sono seduto vicino al mio migliore amico sull'autobus." },
  { id: "pc_015", topic: "present_continuous", difficulty: 3, type: "translate", group: "pc_negative",
    prompt: "Non sto dormendo, sto leggendo.",
    answers: ["I'm not sleeping, I'm reading.", "I am not sleeping, I am reading."],
    explanation: "Stare + gerundio = present continuous: I'm reading. La negativa si fa con am not: I'm not sleeping.",
    notes: {
      "I not sleeping, I reading.": "Manca il verbo essere: I AM not sleeping, I AM reading.",
      "I don't sleep, I read.": "Questo è present simple (abitudine). «Sto dormendo» = azione in corso: I'm not sleeping, I'm reading.",
      "I don't sleeping, I'm reading.": "Con -ing non si usa don't: I'm not sleeping."
    } },
  { id: "pc_016", topic: "present_continuous", difficulty: 3, type: "translate", group: "pc_question",
    prompt: "Che cosa stai mangiando?",
    answers: ["What are you eating?", "What are you eating now?"],
    explanation: "Domanda al present continuous: What + are + you + eating? Il verbo essere va prima del soggetto.",
    notes: {
      "What you are eating?": "Nella domanda bisogna invertire: are va prima di you → What are you eating?",
      "What do you eat?": "Questo significa «che cosa mangi di solito?». Per «stai mangiando» serve What are you eating?",
      "What are you eat?": "Dopo are serve la forma in -ing: eating."
    } },

  /* ==================== PRESENT SIMPLE vs PRESENT CONTINUOUS ==================== */
  { id: "psvpc_001", topic: "ps_vs_pc", difficulty: 1, type: "mc", group: "psvpc_habit",
    prompt: "My dad ___ to work by bus every day.",
    options: ["goes", "is going", "go"],
    answers: ["goes"],
    explanation: "Every day indica un'abitudine: present simple. My dad = he, quindi goes (con -es).",
    it: "Mio papà va al lavoro in autobus ogni giorno.",
    notes: {
      "is going": "Il present continuous è per le azioni in corso adesso. Every day = abitudine → present simple: goes.",
      "go": "Manca la desinenza della terza persona: he goes."
    } },
  { id: "psvpc_002", topic: "ps_vs_pc", difficulty: 1, type: "mc", group: "psvpc_now",
    prompt: "Shh! The baby ___ at the moment.",
    options: ["is sleeping", "sleeps", "sleep"],
    answers: ["is sleeping"],
    explanation: "At the moment = in questo momento: azione in corso → present continuous (is sleeping).",
    it: "Shh! Il bambino sta dormendo in questo momento.",
    notes: {
      "sleeps": "Sleeps è present simple (abitudine, es. «dorme molto»). At the moment chiede il present continuous.",
      "sleep": "Sleep è la forma base: oltre a mancare la -s, qui serve un'azione in corso (is sleeping)."
    } },
  { id: "psvpc_003", topic: "ps_vs_pc", difficulty: 1, type: "mc", group: "psvpc_state",
    prompt: "I ___ the answer to question 5.",
    options: ["know", "am knowing", "knowing"],
    answers: ["know"],
    explanation: "Know è un verbo di stato (indica cosa sai, non un'azione): non si usa al continuous, nemmeno se parli di adesso. I know.",
    it: "So la risposta alla domanda 5.",
    notes: {
      "am knowing": "Errore tipico: know è un verbo di stato e non va al continuous. Si dice I know.",
      "knowing": "La forma in -ing da sola non è un verbo coniugato, e know comunque non va al continuous: I know."
    } },
  { id: "psvpc_004", topic: "ps_vs_pc", difficulty: 1, type: "mc", group: "psvpc_habit",
    prompt: "We usually ___ football on Saturdays.",
    options: ["play", "are playing", "plays"],
    answers: ["play"],
    explanation: "Usually e on Saturdays indicano un'abitudine: present simple. Con we il verbo resta base: play.",
    it: "Di solito giochiamo a calcio il sabato.",
    notes: {
      "are playing": "Usually = di solito: è un'abitudine, quindi present simple (we play).",
      "plays": "La -s si mette solo con he/she/it. Con we: play."
    } },
  { id: "psvpc_005", topic: "ps_vs_pc", difficulty: 1, type: "mc", group: "psvpc_now",
    prompt: "Listen! Somebody ___ the piano.",
    options: ["is playing", "plays", "play"],
    answers: ["is playing"],
    explanation: "Listen! indica che lo senti adesso: azione in corso → present continuous (is playing).",
    it: "Ascolta! Qualcuno sta suonando il pianoforte.",
    notes: {
      "plays": "Plays è present simple: va bene per le abitudini, non per un'azione che senti in questo momento.",
      "play": "Somebody è singolare e qui serve un'azione in corso: is playing."
    } },
  { id: "psvpc_006", topic: "ps_vs_pc", difficulty: 2, type: "gap", group: "psvpc_temporary",
    prompt: "I usually walk to school, but today I ___ (take) the bus because it's raining.",
    answers: ["am taking"],
    explanation: "Usually walk = abitudine (present simple); but today = cosa diversa, solo per oggi → present continuous: I am (I'm) taking.",
    it: "Di solito vado a scuola a piedi, ma oggi prendo l'autobus perché piove.",
    notes: {
      "take": "Take è present simple (abitudine). Today indica una situazione temporanea, diversa dal solito: I'm taking.",
      "taking": "Manca am: I AM taking.",
      "am takeing": "La -e cade prima di -ing: take → taking."
    } },
  { id: "psvpc_007", topic: "ps_vs_pc", difficulty: 2, type: "gap", group: "psvpc_habit",
    prompt: "Marco ___ (not/watch) TV in the morning: he never has time.",
    answers: ["doesn't watch"],
    explanation: "In the morning e never parlano di un'abitudine: present simple. Negativa con he: doesn't + verbo base (watch).",
    it: "Marco non guarda la TV la mattina: non ha mai tempo.",
    notes: {
      "isn't watching": "Il present continuous è per adesso. Qui si parla di cosa fa di solito la mattina: doesn't watch.",
      "don't watch": "Con he/she/it si usa doesn't, non don't.",
      "doesn't watches": "Dopo doesn't il verbo torna base: watch, senza -es."
    } },
  { id: "psvpc_008", topic: "ps_vs_pc", difficulty: 2, type: "gap", group: "psvpc_state",
    prompt: "This bag ___ (belong) to my cousin.",
    answers: ["belongs"],
    explanation: "Belong è un verbo di stato (appartenere): si usa al present simple. This bag = it, quindi belongs.",
    it: "Questa borsa appartiene a mio cugino.",
    notes: {
      "is belonging": "Belong è un verbo di stato e non va al continuous: belongs.",
      "belong": "This bag = it: serve la -s → belongs."
    } },
  { id: "psvpc_009", topic: "ps_vs_pc", difficulty: 2, type: "mc", group: "psvpc_state",
    prompt: "Sara ___ a new phone for her birthday.",
    options: ["wants", "is wanting", "want"],
    answers: ["wants"],
    explanation: "Want è un verbo di stato (desiderio): si usa al present simple anche se parli di adesso. Sara = she → wants.",
    it: "Sara vuole un telefono nuovo per il suo compleanno.",
    notes: {
      "is wanting": "Want è un verbo di stato come like, know, need: non si usa al continuous. Sara wants.",
      "want": "Sara = she: serve la -s → wants."
    } },
  { id: "psvpc_010", topic: "ps_vs_pc", difficulty: 2, type: "mc", group: "psvpc_temporary",
    prompt: "My grandparents live in Naples, but this month they ___ with us in Milan.",
    options: ["are staying", "stay", "stays"],
    answers: ["are staying"],
    explanation: "Live in Naples = situazione stabile (present simple). This month = situazione temporanea → present continuous: they are staying.",
    it: "I miei nonni abitano a Napoli, ma questo mese stanno da noi a Milano.",
    notes: {
      "stay": "Stay al present simple indicherebbe una situazione fissa. This month è temporaneo: are staying.",
      "stays": "They è plurale (niente -s) e la situazione è temporanea: are staying."
    } },
  { id: "psvpc_011", topic: "ps_vs_pc", difficulty: 2, type: "order", group: "psvpc_now",
    prompt: "Riordina le parole per formare una domanda.",
    answers: ["What is your brother doing now?"],
    explanation: "Now = azione in corso: present continuous. Domanda: What + is + soggetto (your brother) + doing.",
    it: "Che cosa sta facendo tuo fratello adesso?" },
  { id: "psvpc_012", topic: "ps_vs_pc", difficulty: 2, type: "transform", group: "psvpc_habit",
    instruction: "Riscrivi la frase sostituendo «now» con «every Sunday» e cambia il tempo verbale.",
    prompt: "I am cleaning my room now.",
    answers: ["I clean my room every Sunday.", "Every Sunday I clean my room."],
    explanation: "Every Sunday indica un'abitudine: si passa dal present continuous (am cleaning) al present simple (clean).",
    it: "Pulisco la mia camera ogni domenica.",
    notes: {
      "I am cleaning my room every Sunday.": "Con every Sunday (abitudine) serve il present simple: I clean.",
      "I cleaning my room every Sunday.": "Every Sunday = abitudine → present simple: I clean my room every Sunday."
    } },
  { id: "psvpc_013", topic: "ps_vs_pc", difficulty: 3, type: "error", group: "psvpc_state",
    prompt: "I am not understanding this exercise.",
    wrong: "am not understanding",
    answers: ["I don't understand this exercise."],
    explanation: "Understand è un verbo di stato: non si usa al continuous, nemmeno per adesso. Negativa del present simple: I don't understand.",
    it: "Non capisco questo esercizio.",
    notes: {
      "I not understand this exercise.": "Nella negativa del present simple serve don't: I don't understand.",
      "I doesn't understand this exercise.": "Con I si usa don't, non doesn't."
    } },
  { id: "psvpc_014", topic: "ps_vs_pc", difficulty: 3, type: "error", group: "psvpc_habit",
    prompt: "How often are you playing tennis?",
    wrong: "are you playing",
    answers: ["How often do you play tennis?"],
    explanation: "How often…? chiede ogni quanto fai una cosa, cioè un'abitudine: serve il present simple (do you play).",
    it: "Ogni quanto giochi a tennis?",
    notes: {
      "How often you play tennis?": "Nella domanda del present simple serve do: How often do you play tennis?",
      "How often do you playing tennis?": "Dopo do il verbo resta base: play."
    } },
  { id: "psvpc_015", topic: "ps_vs_pc", difficulty: 3, type: "translate", group: "psvpc_habit",
    prompt: "Che cosa fai di solito il sabato?",
    answers: ["What do you usually do on Saturdays?", "What do you usually do on Saturday?", "What do you normally do on Saturdays?"],
    explanation: "Di solito = abitudine → present simple: What do you usually do…? Usually va prima del verbo principale.",
    notes: {
      "What are you usually doing on Saturdays?": "Con usually si parla di un'abitudine: present simple (What do you usually do?).",
      "What you usually do on Saturdays?": "Manca do: nella domanda del present simple serve l'ausiliare → What do you usually do?",
      "What do you usually make on Saturdays?": "«Fare» nel senso di attività si dice do, non make."
    } },
  { id: "psvpc_016", topic: "ps_vs_pc", difficulty: 3, type: "translate", group: "psvpc_now",
    prompt: "Ascolta! Mia sorella sta cantando sotto la doccia.",
    answers: ["Listen! My sister is singing in the shower.", "Listen! My sister's singing in the shower."],
    explanation: "Listen! + azione in corso → present continuous: my sister is singing. Attenzione: «sotto la doccia» in inglese è in the shower.",
    notes: {
      "Listen! My sister sings in the shower.": "Sings è present simple (abitudine: «canta sempre sotto la doccia»). Con Listen! serve is singing.",
      "Listen! My sister singing in the shower.": "Manca is: my sister IS singing.",
      "Listen! My sister is singing under the shower.": "Quasi perfetto! Ma in inglese si dice in the shower, non under the shower."
    } },

  /* ================================ PAST SIMPLE ================================ */
  { id: "past_001", topic: "past_simple", difficulty: 1, type: "mc", group: "past_regular",
    prompt: "Yesterday we ___ basketball after school.",
    options: ["played", "play", "plaied", "playd"],
    answers: ["played"],
    explanation: "Yesterday = passato concluso → past simple. Play è regolare: + ed → played (la y dopo una vocale resta).",
    it: "Ieri abbiamo giocato a basket dopo la scuola.",
    notes: {
      "play": "Play è presente. Con yesterday serve il passato: played.",
      "plaied": "La y si trasforma in i solo dopo una consonante (study → studied). Dopo una vocale (a + y) resta: played.",
      "playd": "La desinenza del passato regolare è -ed: played."
    } },
  { id: "past_002", topic: "past_simple", difficulty: 1, type: "mc", group: "past_irregular",
    prompt: "Last summer my family ___ to Greece.",
    options: ["went", "goed", "go", "gone"],
    answers: ["went"],
    explanation: "Last summer = passato concluso. Go è irregolare: il past simple è went.",
    it: "L'estate scorsa la mia famiglia è andata in Grecia.",
    notes: {
      "goed": "Go è un verbo irregolare: il passato non si fa con -ed, è went.",
      "go": "Go è presente. Con last summer serve il passato: went.",
      "gone": "Gone è il participio (si usa con have: has gone). Il past simple è went."
    } },
  { id: "past_003", topic: "past_simple", difficulty: 1, type: "mc", group: "past_didnt_base",
    prompt: "I didn't ___ the match last night.",
    options: ["see", "saw", "seen", "seeing"],
    answers: ["see"],
    explanation: "Dopo didn't il verbo torna sempre alla forma base: il passato è già «dentro» didn't. I didn't see.",
    it: "Non ho visto la partita ieri sera.",
    notes: {
      "saw": "Errore tipico: «I didn't saw». Il passato si mette una volta sola, in didn't: il verbo resta base (see).",
      "seen": "Seen è il participio. Dopo didn't serve la forma base: see.",
      "seeing": "Dopo didn't non si usa -ing: forma base, see."
    } },
  { id: "past_004", topic: "past_simple", difficulty: 1, type: "mc", group: "past_did_question",
    prompt: "___ you finish your homework yesterday?",
    options: ["Did", "Do", "Were", "Have"],
    answers: ["Did"],
    explanation: "Domanda al past simple: Did + soggetto + verbo base. Yesterday indica il passato: Did you finish…?",
    it: "Hai finito i compiti ieri?",
    notes: {
      "Do": "Do è per il presente. Con yesterday serve did.",
      "Were": "Were si usa con il verbo in -ing (Were you finishing…?) o con aggettivi. Con il verbo base finish serve Did.",
      "Have": "In italiano diciamo «hai finito», ma con yesterday in inglese serve il past simple: Did you finish?"
    } },
  { id: "past_005", topic: "past_simple", difficulty: 1, type: "mc", group: "past_ago",
    prompt: "I started guitar lessons two years ___.",
    options: ["ago", "before", "past", "since"],
    answers: ["ago"],
    explanation: "«Due anni fa» = two years ago. Ago si mette DOPO l'espressione di tempo e va con il past simple.",
    it: "Ho iniziato le lezioni di chitarra due anni fa.",
    notes: {
      "before": "Before significa «prima» (di un altro momento). Per contare indietro da oggi («fa») si usa ago.",
      "past": "Past non significa «fa». Si dice two years ago.",
      "since": "Since significa «da» (un momento di inizio) e va con il present perfect. «Fa» = ago."
    } },
  { id: "past_006", topic: "past_simple", difficulty: 1, type: "mc", group: "past_regular",
    prompt: "Last weekend my sister ___ for her maths test.",
    options: ["studied", "studyed", "studies", "study"],
    answers: ["studied"],
    explanation: "Study finisce con consonante + y: la y diventa i e si aggiunge -ed → studied.",
    it: "Lo scorso fine settimana mia sorella ha studiato per la verifica di matematica.",
    notes: {
      "studyed": "Dopo una consonante (d) la y diventa i: studied.",
      "studies": "Studies è presente. Last weekend è passato: studied.",
      "study": "Study è presente (e senza -s). Serve il passato: studied."
    } },
  { id: "past_007", topic: "past_simple", difficulty: 2, type: "gap", group: "past_regular",
    prompt: "Yesterday the bus ___ (stop) right outside the stadium.",
    answers: ["stopped"],
    explanation: "Stop è una sillaba e finisce con vocale + consonante (o + p): la p raddoppia → stopped.",
    it: "Ieri l'autobus si è fermato proprio davanti allo stadio.",
    notes: {
      "stoped": "La consonante finale raddoppia: stop → stopped (come plan → planned).",
      "stop": "Con yesterday serve il passato: stopped."
    } },
  { id: "past_008", topic: "past_simple", difficulty: 2, type: "gap", group: "past_irregular",
    prompt: "We ___ (buy) the concert tickets online last week.",
    answers: ["bought"],
    explanation: "Buy è irregolare: il past simple è bought.",
    it: "Abbiamo comprato i biglietti del concerto online la settimana scorsa.",
    notes: {
      "buyed": "Buy è irregolare: non prende -ed. Il passato è bought.",
      "brought": "Attenzione: brought è il passato di bring (portare). Buy → bought, senza r.",
      "buy": "Last week indica il passato: bought."
    } },
  { id: "past_009", topic: "past_simple", difficulty: 2, type: "gap", group: "past_irregular",
    prompt: "Luca ___ (win) the race on Sunday.",
    answers: ["won"],
    explanation: "Win è irregolare: il past simple è won (si pronuncia come one).",
    it: "Luca ha vinto la gara domenica.",
    notes: {
      "winned": "Win è un verbo irregolare: il passato è won.",
      "wins": "Wins è presente. On Sunday qui indica una domenica passata: won.",
      "win": "Serve il passato: won."
    } },
  { id: "past_010", topic: "past_simple", difficulty: 2, type: "gap", group: "past_didnt_base",
    prompt: "Sorry, I ___ (not/hear) you. Can you say it again?",
    answers: ["didn't hear"],
    explanation: "Negativa al past simple: didn't + verbo base. I didn't hear (non «didn't heard»).",
    it: "Scusa, non ti ho sentito. Puoi ripeterlo?",
    notes: {
      "didn't heard": "Dopo didn't il verbo torna alla forma base: hear, non heard.",
      "not heard": "Per la negativa al passato serve didn't: I didn't hear.",
      "don't hear": "Don't è presente. Qui parli di un momento appena passato: didn't hear."
    } },
  { id: "past_011", topic: "past_simple", difficulty: 2, type: "gap", group: "past_regular",
    prompt: "Our train ___ (arrive) late in Rome last night.",
    answers: ["arrived"],
    explanation: "I verbi regolari che finiscono già in -e aggiungono solo -d: arrive → arrived.",
    it: "Il nostro treno è arrivato in ritardo a Roma ieri sera.",
    notes: {
      "arriveed": "Arrive finisce già con -e: basta aggiungere -d → arrived.",
      "arrive": "Last night indica il passato: arrived.",
      "is arrived": "In italiano «è arrivato» usa essere, ma in inglese il past simple è una parola sola: arrived."
    } },
  { id: "past_012", topic: "past_simple", difficulty: 2, type: "order", group: "past_did_question",
    prompt: "Riordina le parole per formare una domanda.",
    answers: ["Did you enjoy the party on Saturday?"],
    explanation: "Domanda al past simple: Did + soggetto (you) + verbo base (enjoy) + resto della frase.",
    it: "Ti sei divertito alla festa sabato?" },
  { id: "past_013", topic: "past_simple", difficulty: 2, type: "transform", group: "past_didnt_base",
    instruction: "Volgi alla forma negativa.",
    prompt: "Tom ate all the pizza.",
    answers: ["Tom didn't eat all the pizza."],
    explanation: "Negativa del past simple: didn't + verbo base. Ate (passato di eat) torna a eat.",
    it: "Tom non ha mangiato tutta la pizza.",
    notes: {
      "Tom didn't ate all the pizza.": "Dopo didn't il verbo torna base: eat, non ate.",
      "Tom doesn't eat all the pizza.": "Doesn't è presente. La frase è al passato: didn't eat.",
      "Tom not ate all the pizza.": "Per la negativa serve didn't: Tom didn't eat."
    } },
  { id: "past_014", topic: "past_simple", difficulty: 2, type: "transform", group: "past_did_question",
    instruction: "Volgi alla forma interrogativa.",
    prompt: "Your parents bought a new car.",
    answers: ["Did your parents buy a new car?"],
    explanation: "Domanda al past simple: Did + soggetto + verbo base. Bought torna a buy.",
    it: "I tuoi genitori hanno comprato una macchina nuova?",
    notes: {
      "Did your parents bought a new car?": "Errore tipico: dopo did il verbo torna base → buy.",
      "Your parents bought a new car?": "In inglese la domanda si costruisce con did, non solo con il punto di domanda: Did your parents buy…?",
      "Do your parents buy a new car?": "Do è presente. La frase è al passato: Did your parents buy…?"
    } },
  { id: "past_015", topic: "past_simple", difficulty: 2, type: "mc", group: "past_irregular",
    prompt: "Oh no! I ___ my phone on the bus this morning!",
    options: ["left", "leaved", "leave", "leaft"],
    answers: ["left"],
    explanation: "Leave (lasciare, partire) è irregolare: il past simple è left.",
    it: "Oh no! Stamattina ho lasciato il telefono sull'autobus!",
    notes: {
      "leaved": "Leave è irregolare: il passato è left, non leaved.",
      "leave": "Leave è presente. È successo stamattina: left.",
      "leaft": "Questa forma non esiste: il passato di leave è left."
    } },
  { id: "past_016", topic: "past_simple", difficulty: 3, type: "error", group: "past_didnt_base",
    prompt: "We didn't went to school because of the snow.",
    wrong: "went",
    answers: ["We didn't go to school because of the snow."],
    explanation: "Dopo didn't il verbo resta alla forma base: didn't go (non «didn't went»). Il passato è già in didn't.",
    it: "Non siamo andati a scuola a causa della neve.",
    notes: {
      "We didn't gone to school because of the snow.": "Gone è il participio. Dopo didn't serve la forma base: go."
    } },
  { id: "past_017", topic: "past_simple", difficulty: 3, type: "error", group: "past_did_question",
    prompt: "Did she saw the new Spider-Man film?",
    wrong: "saw",
    answers: ["Did she see the new Spider-Man film?"],
    explanation: "Nella domanda con did il verbo torna base: Did she see…? (non «Did she saw»).",
    it: "Ha visto il nuovo film di Spider-Man?",
    notes: {
      "Did she seen the new Spider-Man film?": "Seen è il participio. Dopo did serve la forma base: see.",
      "Did she sees the new Spider-Man film?": "Dopo did il verbo è base, senza -s: see."
    } },
  { id: "past_018", topic: "past_simple", difficulty: 3, type: "translate", group: "past_ago",
    prompt: "Sono arrivati tre giorni fa.",
    answers: ["They arrived three days ago.", "They arrived 3 days ago."],
    explanation: "«Tre giorni fa» = three days ago (ago va dopo). Con ago si usa il past simple: they arrived.",
    notes: {
      "They are arrived three days ago.": "In italiano «sono arrivati» usa essere, ma in inglese il past simple è una parola sola: they arrived.",
      "They have arrived three days ago.": "Con ago (momento passato preciso) non si usa il present perfect: they arrived.",
      "They arrived three days before.": "«Fa» si traduce con ago, non before.",
      "They arrived ago three days.": "Ago va dopo l'espressione di tempo: three days ago."
    } },
  { id: "past_019", topic: "past_simple", difficulty: 3, type: "translate", group: "past_irregular",
    prompt: "Ieri ho scritto un messaggio a Giulia.",
    answers: [
      "Yesterday I wrote a message to Giulia.", "I wrote a message to Giulia yesterday.",
      "Yesterday I wrote Giulia a message.", "I wrote Giulia a message yesterday.",
      "Yesterday I texted Giulia.", "I texted Giulia yesterday.",
      "Yesterday I sent a message to Giulia.", "I sent a message to Giulia yesterday.",
      "Yesterday I sent Giulia a message.", "I sent Giulia a message yesterday."
    ],
    explanation: "Con yesterday si usa il past simple, non il present perfect. Write è irregolare: write → wrote.",
    notes: {
      "Yesterday I have written a message to Giulia.": "In italiano diciamo «ho scritto», ma con yesterday l'inglese vuole il past simple: I wrote.",
      "Yesterday I writed a message to Giulia.": "Write è irregolare: il passato è wrote.",
      "Yesterday I written a message to Giulia.": "Written è il participio. Il past simple è wrote."
    } },
  { id: "past_020", topic: "past_simple", difficulty: 3, type: "gap", group: "past_irregular",
    prompt: "Last night I was really tired, so I ___ to bed at nine o'clock.",
    answers: ["went"],
    explanation: "Last night = passato concluso. «Andare a letto» = go to bed, e go al passato è went.",
    it: "Ieri sera ero stanchissimo, quindi sono andato a letto alle nove.",
    notes: {
      "goed": "Go è irregolare: il passato è went.",
      "go": "Serve il passato (last night): went.",
      "gone": "Gone è il participio. Il past simple di go è went.",
      "have gone": "Con last night si usa il past simple: went."
    } },

  /* ============================== PAST CONTINUOUS ============================== */
  { id: "pastc_001", topic: "past_continuous", difficulty: 1, type: "mc", group: "pastc_was_were",
    prompt: "At 8 pm yesterday I ___ dinner with my family.",
    options: ["was having", "were having", "having", "am having"],
    answers: ["was having"],
    explanation: "Azione in corso in un momento preciso del passato (at 8 pm yesterday): past continuous. Con I si usa was: I was having.",
    it: "Ieri alle 8 di sera stavo cenando con la mia famiglia.",
    notes: {
      "were having": "Con I (e he/she/it) si usa was. Were va con you/we/they.",
      "having": "Manca was: il past continuous ha sempre bisogno di was/were.",
      "am having": "Am è presente. Yesterday indica il passato: was having."
    } },
  { id: "pastc_002", topic: "past_continuous", difficulty: 1, type: "mc", group: "pastc_was_were",
    prompt: "My friends ___ in the park when I called them.",
    options: ["were playing", "was playing", "playing", "are playing"],
    answers: ["were playing"],
    explanation: "My friends = they: si usa were + -ing. Giocavano (azione in corso) quando li ho chiamati.",
    it: "I miei amici stavano giocando al parco quando li ho chiamati.",
    notes: {
      "was playing": "My friends è plurale (they): were, non was.",
      "playing": "Manca were: my friends WERE playing.",
      "are playing": "Are è presente, ma la frase è al passato (I called): were playing."
    } },
  { id: "pastc_003", topic: "past_continuous", difficulty: 1, type: "mc", group: "pastc_interrupted",
    prompt: "I was having a shower when the phone ___.",
    options: ["rang", "was ringing", "rings", "ring"],
    answers: ["rang"],
    explanation: "Azione lunga (was having a shower) interrotta da un'azione breve: l'azione breve, dopo when, va al past simple → rang (ring è irregolare).",
    it: "Stavo facendo la doccia quando è squillato il telefono.",
    notes: {
      "was ringing": "Lo squillo è l'azione breve che interrompe: va al past simple, rang.",
      "rings": "Rings è presente. Tutta la frase è al passato: rang.",
      "ring": "Ring è la forma base. Il passato (irregolare) è rang."
    } },
  { id: "pastc_004", topic: "past_continuous", difficulty: 1, type: "mc", group: "pastc_while",
    prompt: "___ we were walking home, it started to rain.",
    options: ["While", "During", "For"],
    answers: ["While"],
    explanation: "While (mentre) è seguito da soggetto + verbo, di solito al past continuous: While we were walking…",
    it: "Mentre tornavamo a casa a piedi, ha cominciato a piovere.",
    notes: {
      "During": "During (durante) è seguito da un nome (during the walk), non da soggetto + verbo.",
      "For": "For indica una durata (for two hours). Per «mentre» si usa while."
    } },
  { id: "pastc_005", topic: "past_continuous", difficulty: 1, type: "mc", group: "pastc_neg_question",
    prompt: "___ you sleeping when I sent you the message?",
    options: ["Were", "Was", "Did", "Are"],
    answers: ["Were"],
    explanation: "Domanda al past continuous: Was/Were + soggetto + -ing. Con you si usa were: Were you sleeping?",
    it: "Stavi dormendo quando ti ho mandato il messaggio?",
    notes: {
      "Was": "Con you si usa sempre were, anche se è una persona sola.",
      "Did": "Did va con il verbo base (Did you sleep?). Con sleeping serve were.",
      "Are": "Are è presente, ma la frase è al passato (I sent): Were you sleeping?"
    } },
  { id: "pastc_006", topic: "past_continuous", difficulty: 2, type: "gap", group: "pastc_was_were",
    prompt: "Yesterday at 5 o'clock, Emma ___ (train) at the swimming pool.",
    answers: ["was training"],
    explanation: "Un orario preciso nel passato (yesterday at 5 o'clock) + azione in corso → past continuous. Emma = she: was training.",
    it: "Ieri alle 5 Emma si stava allenando in piscina.",
    notes: {
      "were training": "Emma è una persona (she): was, non were.",
      "training": "Manca was: Emma WAS training.",
      "is training": "Is è presente. Yesterday indica il passato: was training.",
      "trained": "Con un orario preciso, per dire che l'azione era in corso in quel momento, si usa il past continuous: was training."
    } },
  { id: "pastc_007", topic: "past_continuous", difficulty: 2, type: "gap", group: "pastc_interrupted",
    prompt: "We ___ (watch) a film when the lights went out.",
    answers: ["were watching"],
    explanation: "L'azione lunga in corso (guardavamo un film) va al past continuous: we were watching. L'azione breve che la interrompe (went out) è al past simple.",
    it: "Stavamo guardando un film quando è andata via la luce.",
    notes: {
      "was watching": "Con we si usa were.",
      "watched": "Watched indica un'azione conclusa. Qui il film era in corso quando è saltata la luce: were watching.",
      "are watching": "Are è presente. La frase è al passato: were watching."
    } },
  { id: "pastc_008", topic: "past_continuous", difficulty: 2, type: "gap", group: "pastc_interrupted",
    prompt: "Mia was riding her bike when she ___ (fall) off.",
    answers: ["fell"],
    explanation: "La caduta è l'azione breve che interrompe quella lunga: past simple. Fall è irregolare → fell.",
    it: "Mia stava andando in bici quando è caduta.",
    notes: {
      "falled": "Fall è irregolare: il passato è fell.",
      "was falling": "La caduta è un'azione breve che interrompe: past simple, fell.",
      "fall": "Serve il passato: fell."
    } },
  { id: "pastc_009", topic: "past_continuous", difficulty: 2, type: "gap", group: "pastc_neg_question",
    prompt: "I ___ (not/listen) when the teacher explained the homework.",
    answers: ["wasn't listening"],
    explanation: "Negativa del past continuous: was/were + not + -ing. Con I: I wasn't (was not) listening.",
    it: "Non stavo ascoltando quando l'insegnante ha spiegato i compiti.",
    notes: {
      "didn't listening": "Didn't va con il verbo base. Con -ing serve was: I wasn't listening.",
      "weren't listening": "Con I si usa was: I wasn't listening.",
      "wasn't listen": "Dopo wasn't serve la forma in -ing: listening."
    } },
  { id: "pastc_010", topic: "past_continuous", difficulty: 2, type: "order", group: "pastc_while",
    prompt: "Riordina le parole per formare una frase.",
    answers: [
      "While I was cooking, my brother was playing video games.",
      "My brother was playing video games while I was cooking.",
      "While my brother was playing video games, I was cooking.",
      "I was cooking while my brother was playing video games."
    ],
    explanation: "Due azioni lunghe in corso nello stesso momento del passato: tutte e due al past continuous, collegate da while (mentre).",
    it: "Mentre io cucinavo, mio fratello giocava ai videogiochi." },
  { id: "pastc_011", topic: "past_continuous", difficulty: 2, type: "transform", group: "pastc_neg_question",
    instruction: "Volgi alla forma interrogativa.",
    prompt: "They were waiting for the bus.",
    answers: ["Were they waiting for the bus?"],
    explanation: "Domanda al past continuous: basta mettere were prima del soggetto → Were they waiting…?",
    it: "Stavano aspettando l'autobus?",
    notes: {
      "Did they waiting for the bus?": "Did non va con il verbo in -ing: la domanda si fa spostando were → Were they waiting…?",
      "Was they waiting for the bus?": "Con they si usa were.",
      "They were waiting for the bus?": "In inglese bisogna invertire soggetto e verbo: Were they waiting…?"
    } },
  { id: "pastc_012", topic: "past_continuous", difficulty: 2, type: "transform", group: "pastc_neg_question",
    instruction: "Volgi alla forma negativa.",
    prompt: "My parents were working yesterday afternoon.",
    answers: ["My parents weren't working yesterday afternoon."],
    explanation: "Negativa del past continuous: were + not (weren't) + -ing.",
    it: "Ieri pomeriggio i miei genitori non stavano lavorando.",
    notes: {
      "My parents didn't working yesterday afternoon.": "Didn't non va con -ing: basta aggiungere not a were → weren't working.",
      "My parents wasn't working yesterday afternoon.": "My parents è plurale: weren't, non wasn't.",
      "My parents didn't work yesterday afternoon.": "Questa frase è corretta ma è al past simple. L'esercizio chiede di mantenere il past continuous: weren't working."
    } },
  { id: "pastc_013", topic: "past_continuous", difficulty: 3, type: "error", group: "pastc_was_were",
    prompt: "You was talking very loudly in the library.",
    wrong: "was",
    answers: ["You were talking very loudly in the library."],
    explanation: "Con you si usa sempre were, anche quando si parla a una persona sola: you were talking.",
    it: "Stavi parlando a voce molto alta in biblioteca." },
  { id: "pastc_014", topic: "past_continuous", difficulty: 3, type: "error", group: "pastc_interrupted",
    prompt: "We were playing cards when Dad comes home.",
    wrong: "comes",
    answers: ["We were playing cards when Dad came home."],
    explanation: "Tutta la storia è al passato: l'azione breve dopo when va al past simple. Come è irregolare → came.",
    it: "Stavamo giocando a carte quando il papà è tornato a casa.",
    notes: {
      "We were playing cards when Dad comed home.": "Come è irregolare: il passato è came.",
      "We were playing cards when Dad was coming home.": "Il ritorno di papà è l'azione breve che interrompe: past simple, came."
    } },
  { id: "pastc_015", topic: "past_continuous", difficulty: 3, type: "translate", group: "pastc_interrupted",
    prompt: "Stavo dormendo quando è suonata la sveglia.",
    answers: [
      "I was sleeping when the alarm rang.", "I was sleeping when the alarm clock rang.",
      "I was sleeping when the alarm went off.", "I was sleeping when the alarm clock went off.",
      "I was asleep when the alarm rang.", "I was asleep when the alarm went off."
    ],
    explanation: "«Stavo dormendo» = azione lunga → past continuous (I was sleeping). «È suonata» = azione breve che interrompe → past simple (rang).",
    notes: {
      "I slept when the alarm rang.": "«Stavo dormendo» è un'azione in corso: I was sleeping.",
      "I was sleeping when the alarm has rung.": "Dopo when, per un'azione breve nel passato, si usa il past simple: rang.",
      "I was sleeping when the alarm was ringing.": "Il suono della sveglia è l'azione breve che interrompe: past simple, rang.",
      "I was sleeping when the alarm ringed.": "Ring è irregolare: il passato è rang."
    } },
  { id: "pastc_016", topic: "past_continuous", difficulty: 3, type: "translate", group: "pastc_while",
    prompt: "Mentre guardavamo la partita, mia mamma cucinava.",
    answers: [
      "While we were watching the match, my mum was cooking.",
      "While we were watching the match, my mother was cooking.",
      "While we were watching the game, my mum was cooking.",
      "While we were watching the game, my mother was cooking.",
      "My mum was cooking while we were watching the match.",
      "My mother was cooking while we were watching the match.",
      "My mum was cooking while we were watching the game.",
      "My mother was cooking while we were watching the game."
    ],
    explanation: "L'imperfetto italiano («guardavamo», «cucinava») per azioni in corso diventa past continuous: we were watching, my mum was cooking. Mentre = while.",
    notes: {
      "While we watched the match, my mum cooked.": "Qui l'imperfetto descrive due azioni in corso nello stesso momento: in inglese si rende con il past continuous, we were watching, my mum was cooking.",
      "While we were watching the match, my mum were cooking.": "My mum = she: was cooking.",
      "During we were watching the match, my mum was cooking.": "Prima di soggetto + verbo si usa while; during va con un nome (during the match)."
    } },

  /* ========================= COUNTABLE / UNCOUNTABLE ========================= */
  { id: "cnt_001", topic: "countable", difficulty: 1, type: "mc", group: "cnt_some_any",
    prompt: "There isn't ___ milk in the fridge.",
    options: ["any", "some", "a", "many"],
    answers: ["any"],
    explanation: "Nelle frasi negative si usa any: There isn't any milk.",
    it: "Non c'è latte nel frigo.",
    notes: {
      "some": "Some si usa nelle frasi affermative. Nelle negative si usa any.",
      "a": "Milk è non numerabile: non si usa a/an. Nelle negative: any milk.",
      "many": "Many va con i nomi numerabili plurali (many eggs). Milk è non numerabile."
    } },
  { id: "cnt_002", topic: "countable", difficulty: 1, type: "mc", group: "cnt_how_much_many",
    prompt: "How ___ brothers have you got?",
    options: ["many", "much", "lot"],
    answers: ["many"],
    explanation: "Brothers è numerabile e plurale (si possono contare): How many…?",
    it: "Quanti fratelli hai?",
    notes: {
      "much": "Much si usa con i non numerabili (How much water?). Brothers si contano: How many.",
      "lot": "Lot si usa in a lot of. Per chiedere «quanti» si dice How many."
    } },
  { id: "cnt_003", topic: "countable", difficulty: 1, type: "mc", group: "cnt_uncountable",
    prompt: "Can you give me some ___ about the school trip?",
    options: ["information", "informations", "an information"],
    answers: ["information"],
    explanation: "In inglese information è non numerabile: non ha plurale e non vuole a/an. Some information.",
    it: "Puoi darmi qualche informazione sulla gita scolastica?",
    notes: {
      "informations": "Errore tipico: in italiano «informazioni» è plurale, ma in inglese information non prende mai la -s.",
      "an information": "Information è non numerabile: niente a/an. Per una sola si dice a piece of information."
    } },
  { id: "cnt_004", topic: "countable", difficulty: 1, type: "mc", group: "cnt_much_many",
    prompt: "I can't come to the cinema: I haven't got ___ time today.",
    options: ["much", "many", "a few"],
    answers: ["much"],
    explanation: "Time (tempo) è non numerabile: nelle frasi negative si usa much. I haven't got much time.",
    it: "Non posso venire al cinema: oggi non ho molto tempo.",
    notes: {
      "many": "Many va con i nomi che si contano (many friends). Time, nel senso di «tempo», non si conta: much.",
      "a few": "A few va con i nomi numerabili plurali (a few minutes). Time è non numerabile."
    } },
  { id: "cnt_005", topic: "countable", difficulty: 1, type: "mc", group: "cnt_some_any",
    prompt: "I bought ___ apples at the market.",
    options: ["some", "any", "much"],
    answers: ["some"],
    explanation: "Nelle frasi affermative si usa some, sia con i plurali (some apples) sia con i non numerabili (some bread).",
    it: "Ho comprato delle mele al mercato.",
    notes: {
      "any": "Any si usa nelle frasi negative e nelle domande. Questa frase è affermativa: some.",
      "much": "Much va con i non numerabili. Apples si contano, e comunque nelle affermative si dice some."
    } },
  { id: "cnt_006", topic: "countable", difficulty: 2, type: "mc", group: "cnt_uncountable",
    prompt: "Our teacher gave us a lot of ___ for the weekend.",
    options: ["homework", "homeworks", "housework"],
    answers: ["homework"],
    explanation: "Homework (i compiti) è non numerabile in inglese: non prende la -s. A lot of homework.",
    it: "La nostra insegnante ci ha dato un sacco di compiti per il fine settimana.",
    notes: {
      "homeworks": "In italiano «i compiti» è plurale, ma homework è non numerabile: niente -s.",
      "housework": "Housework sono le faccende di casa (pulire, lavare i piatti). I compiti di scuola sono homework."
    } },
  { id: "cnt_007", topic: "countable", difficulty: 2, type: "mc", group: "cnt_uncountable",
    prompt: "The news ___ really good today!",
    options: ["is", "are"],
    answers: ["is"],
    explanation: "News finisce in -s ma è non numerabile e singolare: The news IS good.",
    it: "Le notizie sono davvero buone oggi!",
    notes: {
      "are": "In italiano «le notizie sono», ma news in inglese è singolare: the news is."
    } },
  { id: "cnt_008", topic: "countable", difficulty: 2, type: "gap", group: "cnt_much_many",
    prompt: "There were too ___ (much/many) people at the concert.",
    answers: ["many"],
    explanation: "People è plurale (persone) e si contano: many people.",
    it: "C'era troppa gente al concerto.",
    notes: {
      "much": "In italiano diciamo «troppa gente» al singolare, ma people in inglese è plurale e numerabile: too many people."
    } },
  { id: "cnt_009", topic: "countable", difficulty: 2, type: "gap", group: "cnt_some_any",
    prompt: "Have you got ___ (some/any) pets?",
    answers: ["any"],
    explanation: "Nelle domande normali si usa any: Have you got any pets?",
    it: "Hai degli animali domestici?",
    notes: {
      "some": "Some nelle domande si usa per offrire o chiedere qualcosa (Would you like some tea?). Per chiedere un'informazione: any."
    } },
  { id: "cnt_010", topic: "countable", difficulty: 2, type: "gap", group: "cnt_how_much_many",
    prompt: "How ___ (much/many) money did you spend on the new game?",
    answers: ["much"],
    explanation: "Money (soldi) è non numerabile in inglese: How much money?",
    it: "Quanti soldi hai speso per il nuovo gioco?",
    notes: {
      "many": "In italiano «quanti soldi» è plurale, ma money è non numerabile: How much money."
    } },
  { id: "cnt_011", topic: "countable", difficulty: 2, type: "order", group: "cnt_how_much_many",
    prompt: "Riordina le parole per formare una domanda.",
    answers: ["How much water do you drink every day?"],
    explanation: "Water è non numerabile, quindi How much. Poi la domanda al present simple: do + you + drink.",
    it: "Quanta acqua bevi ogni giorno?" },
  { id: "cnt_012", topic: "countable", difficulty: 2, type: "transform", group: "cnt_some_any",
    instruction: "Volgi alla forma negativa.",
    prompt: "We've got some bread.",
    answers: ["We haven't got any bread.", "We don't have any bread.", "We have no bread.", "We've got no bread."],
    explanation: "Nella frase negativa some diventa any: We haven't got any bread.",
    it: "Non abbiamo pane.",
    notes: {
      "We haven't got some bread.": "Nelle negative some diventa any: We haven't got any bread.",
      "We haven't got any breads.": "Bread è non numerabile: niente -s.",
      "We haven't got no bread.": "In inglese basta una sola negazione: haven't got any (oppure have got no)."
    } },
  { id: "cnt_013", topic: "countable", difficulty: 3, type: "error", group: "cnt_uncountable",
    prompt: "My grandad gave me some good advices.",
    wrong: "advices",
    answers: ["My grandad gave me some good advice."],
    explanation: "Advice (consigli) è non numerabile in inglese: non prende la -s. Some advice; per uno solo, a piece of advice.",
    it: "Mio nonno mi ha dato dei buoni consigli.",
    notes: {
      "My grandad gave me a good advice.": "Advice è non numerabile: niente a/an. Si dice some advice o a piece of advice."
    } },
  { id: "cnt_014", topic: "countable", difficulty: 3, type: "error", group: "cnt_much_many",
    prompt: "I haven't got much friends in my new class.",
    wrong: "much",
    answers: ["I haven't got many friends in my new class.", "I haven't got a lot of friends in my new class."],
    explanation: "Friends si contano (numerabile plurale): many friends, non much.",
    it: "Non ho molti amici nella mia nuova classe.",
    notes: {
      "I haven't got much friend in my new class.": "Friend si conta: many friends, al plurale."
    } },
  { id: "cnt_015", topic: "countable", difficulty: 3, type: "translate", group: "cnt_uncountable",
    prompt: "Lei ha i capelli castani.",
    answers: ["She has got brown hair.", "She has brown hair.", "She's got brown hair."],
    explanation: "Hair (capelli) è non numerabile: niente -s e niente articolo. She has (got) brown hair.",
    notes: {
      "She has got brown hairs.": "In italiano «i capelli» è plurale, ma hair in inglese è non numerabile: brown hair.",
      "She has brown hairs.": "Hair (capelli) non prende la -s: brown hair.",
      "She has the brown hair.": "Per descrivere l'aspetto non si usa the: She has brown hair.",
      "She has got the brown hair.": "Per descrivere l'aspetto non si usa the: She has got brown hair."
    } },
  { id: "cnt_016", topic: "countable", difficulty: 3, type: "translate", group: "cnt_how_much_many",
    prompt: "Quanti compiti hai?",
    answers: ["How much homework have you got?", "How much homework do you have?"],
    explanation: "Homework è non numerabile, quindi How much (non many) e niente -s: How much homework have you got?",
    notes: {
      "How many homeworks have you got?": "Homework non ha il plurale e si usa con much: How much homework have you got?",
      "How many homework have you got?": "Homework è non numerabile: How much, non How many.",
      "How much homeworks have you got?": "Homework non prende la -s: How much homework."
    } }

], 'grammar-a2');
