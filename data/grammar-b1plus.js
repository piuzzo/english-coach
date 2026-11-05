EC.addItems([

  /* ================= USED TO ================= */
  { id: "ut_001", topic: "used_to", difficulty: 1, type: "mc", group: "ut_form",
    prompt: "When I was little, I ___ with LEGO every afternoon.",
    options: ["used to play", "use to play", "used to playing", "was used to play"],
    answers: ["used to play"],
    explanation: "Per un'abitudine del passato che oggi non c'è più si usa used to + verbo base: I used to play (= da piccolo giocavo).",
    notes: {
      "use to play": "Nella frase affermativa serve la -d: used to. «Use to» senza -d si trova solo dopo did/didn't.",
      "used to playing": "Dopo used to (abitudine passata) va il verbo base: play. «Be used to + -ing» è un'altra cosa: significa «essere abituato a».",
      "was used to play": "Non serve was: used to è già il verbo. Si dice semplicemente I used to play."
    },
    it: "Quando ero piccolo, giocavo con i LEGO ogni pomeriggio." },

  { id: "ut_002", topic: "used_to", difficulty: 1, type: "mc", group: "ut_negative",
    prompt: "My brother ___ vegetables, but now he loves them.",
    options: ["didn't use to like", "didn't used to like", "doesn't use to like", "not used to like"],
    answers: ["didn't use to like"],
    explanation: "Nella negativa la -d «passa» a didn't, come nel past simple (didn't play): didn't use to + verbo base.",
    notes: {
      "didn't used to like": "Errore molto comune: dopo didn't il verbo torna alla forma base, quindi use senza -d (come «didn't play», non «didn't played»).",
      "doesn't use to like": "Used to esiste solo al passato. Per il presente si usa usually: he doesn't usually like…",
      "not used to like": "Manca l'ausiliare: la negativa si forma con didn't + use to."
    },
    it: "Mio fratello non amava le verdure, ma adesso le adora." },

  { id: "ut_003", topic: "used_to", difficulty: 1, type: "mc", group: "ut_question",
    prompt: "___ you use to have long hair when you were at primary school?",
    options: ["Did", "Do", "Were", "Used"],
    answers: ["Did"],
    explanation: "Le domande con used to si fanno con did, come nel past simple: Did you use to…?",
    notes: {
      "Do": "Do è per il presente; used to parla del passato, quindi serve did.",
      "Were": "Were si usa con to be, ma qui il verbo è use to: serve l'ausiliare did.",
      "Used": "«Used you to…?» è una forma antiquata; oggi si dice Did you use to…?"
    } },

  { id: "ut_004", topic: "used_to", difficulty: 1, type: "mc", group: "ut_meaning",
    prompt: "I ___ to the gym on Tuesdays now.",
    options: ["usually go", "use to go", "used to go"],
    answers: ["usually go"],
    explanation: "Per un'abitudine di OGGI si usa il present simple, spesso con usually. Used to vale solo per il passato.",
    notes: {
      "use to go": "Errore tipico degli italiani: «use to» al presente non esiste. Per le abitudini di oggi si dice I usually go.",
      "used to go": "Used to parla di un'abitudine passata che non c'è più, ma la frase dice «now» (adesso)."
    } },

  { id: "ut_005", topic: "used_to", difficulty: 1, type: "mc", group: "ut_form",
    prompt: "My grandparents ___ in a small village in the mountains, but now they live in Turin.",
    options: ["used to live", "used to living", "use to lived", "were used to live"],
    answers: ["used to live"],
    explanation: "Used to si usa anche per situazioni del passato che sono cambiate (abitavano lì, ora no): used to + verbo base.",
    notes: {
      "used to living": "Dopo used to va il verbo base (live), non la forma -ing.",
      "use to lived": "Due errori: nell'affermativa serve used (con -d) e dopo to il verbo resta base: used to live.",
      "were used to live": "Were non serve: used to è già il verbo. «Were used to living» vorrebbe dire «erano abituati a vivere»."
    } },

  { id: "ut_006", topic: "used_to", difficulty: 2, type: "gap", group: "ut_negative",
    prompt: "We ___ (not / have) a dog, but now we've got two!",
    answers: ["didn't use to have", "used not to have", "never used to have"],
    explanation: "Negativa di used to: didn't use to + verbo base (have). La -d sparisce perché il passato è già in didn't.",
    notes: {
      "didn't used to have": "Dopo didn't si usa la forma base: use to, senza -d.",
      "didn't use to had": "Dopo to il verbo resta alla forma base: have, non had.",
      "don't use to have": "Si parla del passato (ora invece abbiamo due cani): serve didn't, non don't."
    },
    it: "Prima non avevamo un cane, ma adesso ne abbiamo due!" },

  { id: "ut_007", topic: "used_to", difficulty: 2, type: "gap", group: "ut_question",
    prompt: "Did you ___ (use to / watch) cartoons before school when you were little?",
    answers: ["use to watch"],
    explanation: "Nella domanda c'è già did, che porta il passato: quindi use to (senza -d) + verbo base.",
    notes: {
      "used to watch": "Dopo did il verbo va alla forma base: use to, senza -d (come «Did you play?», non «Did you played?»).",
      "use to watching": "Dopo use to serve il verbo base: watch."
    } },

  { id: "ut_008", topic: "used_to", difficulty: 2, type: "order", group: "ut_form",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["My sister used to be afraid of the dark."],
    explanation: "Soggetto + used to + verbo base (be) + resto della frase. Used to funziona anche con gli stati, come be afraid.",
    it: "Mia sorella aveva paura del buio." },

  { id: "ut_009", topic: "used_to", difficulty: 2, type: "transform", group: "ut_negative",
    instruction: "Volgi alla forma negativa.",
    prompt: "Marco used to walk to school.",
    answers: ["Marco didn't use to walk to school.", "Marco used not to walk to school.", "Marco never used to walk to school."],
    explanation: "Negativa: didn't use to + verbo base. Il «segno» del passato è in didn't, quindi use perde la -d.",
    notes: {
      "Marco didn't used to walk to school.": "Quasi! Dopo didn't serve use senza -d: didn't use to.",
      "Marco doesn't use to walk to school.": "Used to è solo passato: la negativa si fa con didn't.",
      "Marco used to not walk to school.": "In inglese standard si dice didn't use to walk: metti la negazione con l'ausiliare did."
    } },

  { id: "ut_010", topic: "used_to", difficulty: 2, type: "transform", group: "ut_question",
    instruction: "Trasforma in domanda (risposta sì/no).",
    prompt: "They used to go camping every summer.",
    answers: ["Did they use to go camping every summer?"],
    explanation: "Domanda: Did + soggetto + use to + verbo base. La -d di used «si sposta» su did.",
    notes: {
      "Did they used to go camping every summer?": "Dopo did si usa la forma base: use to, senza -d.",
      "Do they use to go camping every summer?": "Si parla del passato: serve did, non do.",
      "Were they used to go camping every summer?": "Non si usa were: la domanda con used to si fa con did."
    } },

  { id: "ut_011", topic: "used_to", difficulty: 2, type: "mc", group: "ut_meaning",
    prompt: "Last Saturday I ___ a great film at the cinema.",
    options: ["saw", "used to see", "use to see"],
    answers: ["saw"],
    explanation: "«Last Saturday» indica una sola volta: si usa il past simple (saw). Used to è per le abitudini ripetute nel passato.",
    notes: {
      "used to see": "Used to indica un'abitudine ripetuta (come l'imperfetto «andavo»), non un fatto avvenuto una volta sola come sabato scorso.",
      "use to see": "«Use to» senza did non si usa, e comunque qui si parla di un fatto singolo: past simple."
    } },

  { id: "ut_012", topic: "used_to", difficulty: 3, type: "error", group: "ut_negative",
    prompt: "I didn't used to like spicy food.",
    wrong: "used",
    answers: ["I didn't use to like spicy food.", "I used not to like spicy food."],
    explanation: "Dopo didn't il verbo è alla forma base: didn't use to. È lo stesso meccanismo di «didn't play»." },

  { id: "ut_013", topic: "used_to", difficulty: 3, type: "error", group: "ut_meaning",
    prompt: "I use to get up at seven on school days.",
    wrong: "use to",
    answers: ["I usually get up at seven on school days.", "I used to get up at seven on school days."],
    explanation: "«Use to» al presente non esiste. Per un'abitudine di oggi si dice I usually get up…; se parli del passato, I used to get up…" },

  { id: "ut_014", topic: "used_to", difficulty: 3, type: "translate", group: "ut_form",
    prompt: "Prima giocavo a calcio ogni sabato.",
    answers: [
      "I used to play football every Saturday.",
      "I used to play football on Saturdays.",
      "I used to play soccer every Saturday.",
      "I used to play soccer on Saturdays.",
      "Before, I used to play football every Saturday."
    ],
    explanation: "L'imperfetto di abitudine («giocavo») con «prima» (= oggi non più) si rende bene con used to + verbo base: I used to play.",
    notes: {
      "I use to play football every Saturday.": "Nell'affermativa serve used, con la -d: I used to play.",
      "I was used to play football every Saturday.": "Non serve was: si dice I used to play. «Be used to» significa «essere abituato».",
      "I used to playing football every Saturday.": "Dopo used to va il verbo base: play.",
      "I used to play at football every Saturday.": "Con gli sport non si mette at: play football."
    } },

  { id: "ut_015", topic: "used_to", difficulty: 3, type: "translate", group: "ut_question",
    prompt: "Da piccolo portavi gli occhiali?",
    answers: [
      "Did you use to wear glasses when you were little?",
      "Did you use to wear glasses when you were a child?",
      "Did you use to wear glasses when you were small?",
      "Did you use to wear glasses when you were young?",
      "When you were little, did you use to wear glasses?",
      "When you were a child, did you use to wear glasses?",
      "As a child, did you use to wear glasses?",
      "Did you use to wear glasses as a child?",
      "Did you wear glasses when you were little?",
      "Did you wear glasses when you were a child?"
    ],
    explanation: "Domanda su un'abitudine/stato del passato: Did you use to + verbo base? «Portare» gli occhiali si dice wear glasses.",
    notes: {
      "Did you used to wear glasses when you were little?": "Dopo did si usa use to, senza -d.",
      "Did you use to bring glasses when you were little?": "«Portare» gli occhiali (o i vestiti) si dice wear, non bring.",
      "Were you used to wear glasses when you were little?": "La domanda con used to si fa con did: Did you use to wear…?"
    } },

  /* ================= PAST PERFECT ================= */
  { id: "pperf2_001", topic: "past_perfect", difficulty: 1, type: "mc", group: "pp_form",
    prompt: "When we arrived at the cinema, the film ___.",
    options: ["had already started", "has already started", "had already start", "already starts"],
    answers: ["had already started"],
    explanation: "Il film è iniziato PRIMA del nostro arrivo (anche lui passato): per l'azione più vecchia si usa il past perfect, had + participio (started).",
    notes: {
      "has already started": "Has started è present perfect: collega al presente. Qui tutta la storia è nel passato, quindi serve had.",
      "had already start": "Dopo had serve il participio passato: started, con -ed.",
      "already starts": "È un presente, ma la frase racconta un fatto passato (we arrived)."
    },
    it: "Quando siamo arrivati al cinema, il film era già iniziato." },

  { id: "pperf2_002", topic: "past_perfect", difficulty: 1, type: "mc", group: "pp_sequence",
    prompt: "I was really hungry at lunch because I ___ breakfast that morning.",
    options: ["hadn't had", "haven't had", "don't have"],
    answers: ["hadn't had"],
    explanation: "Saltare la colazione è successo PRIMA di avere fame a pranzo: past perfect negativo, hadn't + participio (had).",
    notes: {
      "haven't had": "Il present perfect si collega a ADESSO, ma qui il racconto è al passato (I was hungry): serve hadn't.",
      "don't have": "È un presente: non va bene in un racconto al passato."
    } },

  { id: "pperf2_003", topic: "past_perfect", difficulty: 1, type: "mc", group: "pp_form",
    prompt: "Before her trip to Norway last winter, Chiara ___ never seen snow.",
    options: ["had", "has", "was", "did"],
    answers: ["had"],
    explanation: "Past perfect = had + participio passato (seen): esprime ciò che era vero PRIMA di un momento passato (il viaggio).",
    notes: {
      "has": "Has seen è present perfect (fino ad oggi). Qui il punto di riferimento è un viaggio passato, quindi serve had.",
      "was": "Il past perfect si forma con had, non con was. In italiano diciamo «non aveva mai visto».",
      "did": "Did non si usa con il participio seen: serve had."
    } },

  { id: "pperf2_004", topic: "past_perfect", difficulty: 1, type: "mc", group: "pp_sequence",
    prompt: "“When I got home, my mum had cooked dinner.” Che cosa è successo PRIMA?",
    options: ["My mum cooked dinner.", "I got home.", "Both things happened at the same time."],
    answers: ["My mum cooked dinner."],
    explanation: "Il past perfect (had cooked) indica l'azione avvenuta prima: la mamma aveva già cucinato quando sono arrivato.",
    notes: {
      "I got home.": "Got home è past simple: è l'azione più recente. Quella al past perfect (had cooked) è avvenuta prima.",
      "Both things happened at the same time.": "Se fossero contemporanee useremmo il past simple per entrambe; had cooked indica che la cena era pronta prima."
    } },

  { id: "pperf2_005", topic: "past_perfect", difficulty: 1, type: "mc", group: "pp_time_words",
    prompt: "By the time we got to the party, everyone ___.",
    options: ["had left", "has left", "leaves", "was leave"],
    answers: ["had left"],
    explanation: "By the time (= quando, ormai) introduce un momento passato: ciò che era già successo prima va al past perfect, had left.",
    notes: {
      "has left": "Has left è present perfect: non si usa in un racconto al passato con «by the time we got».",
      "leaves": "È un presente: la frase parla del passato.",
      "was leave": "Il past perfect si forma con had + participio, non con was."
    } },

  { id: "pperf2_006", topic: "past_perfect", difficulty: 2, type: "gap", group: "pp_form",
    prompt: "Tom was nervous on the plane because he ___ (never / fly) before.",
    answers: ["had never flown"],
    explanation: "Past perfect: had + never + participio passato. Fly è irregolare: fly – flew – flown.",
    notes: {
      "had never flew": "Flew è il past simple; dopo had serve il participio: flown.",
      "had never flied": "Fly è irregolare: il participio è flown.",
      "has never flown": "Il racconto è al passato (was nervous): serve had, non has.",
      "never flew": "Serve il past perfect, perché è un'esperienza mancata PRIMA di quel volo: had never flown."
    } },

  { id: "pperf2_007", topic: "past_perfect", difficulty: 2, type: "gap", group: "pp_time_words",
    prompt: "When I phoned Luca at eleven, he ___ (already / go) to bed.",
    answers: ["had already gone"],
    explanation: "Era già andato a letto PRIMA della telefonata: had + already + participio. Go è irregolare: go – went – gone.",
    notes: {
      "had already went": "Went è il past simple; dopo had serve il participio: gone.",
      "has already gone": "Il racconto è al passato (I phoned): serve had.",
      "already went": "Con il past simple sembra che sia andato a letto proprio mentre telefonavi. Per dire «era già andato» serve had gone.",
      "was already gone": "In italiano «era andato» usa essere, ma in inglese il past perfect si fa sempre con had: had gone."
    },
    it: "Quando ho chiamato Luca alle undici, era già andato a letto." },

  { id: "pperf2_008", topic: "past_perfect", difficulty: 2, type: "order", group: "pp_time_words",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["The train had just left when we arrived.", "When we arrived the train had just left."],
    explanation: "Had just + participio = era appena successo. Il treno è partito un attimo PRIMA del nostro arrivo (past simple: arrived).",
    it: "Il treno era appena partito quando siamo arrivati." },

  { id: "pperf2_009", topic: "past_perfect", difficulty: 2, type: "transform", group: "pp_negative_question",
    instruction: "Volgi alla forma negativa.",
    prompt: "They had seen the film before.",
    answers: ["They hadn't seen the film before.", "They had never seen the film before."],
    explanation: "Negativa del past perfect: hadn't (had not) + participio passato. Non serve did.",
    notes: {
      "They didn't had seen the film before.": "Con il past perfect non si usa did: basta mettere not dopo had (hadn't).",
      "They hadn't saw the film before.": "Dopo had serve il participio: seen, non saw.",
      "They didn't see the film before.": "Così diventa un past simple: la forma negativa del past perfect è hadn't seen."
    } },

  { id: "pperf2_010", topic: "past_perfect", difficulty: 2, type: "mc", group: "pp_sequence",
    prompt: "When I got to the gym, I realised I ___ my PE kit at home.",
    options: ["had left", "have left", "was leaving", "am leaving"],
    answers: ["had left"],
    explanation: "Ho lasciato la tuta a casa PRIMA di accorgermene in palestra: azione più vecchia = past perfect, had left.",
    notes: {
      "have left": "Il present perfect si collega al presente, ma qui racconti un fatto passato (I got, I realised).",
      "was leaving": "Il past continuous indica un'azione in corso, non un'azione già conclusa prima.",
      "am leaving": "È un presente: non va bene in un racconto al passato."
    } },

  { id: "pperf2_011", topic: "past_perfect", difficulty: 3, type: "transform", group: "pp_sequence",
    instruction: "Unisci le due frasi con «when»: usa il past perfect per l'azione avvenuta prima.",
    prompt: "The concert started. Then we arrived.",
    answers: [
      "When we arrived, the concert had started.",
      "When we arrived, the concert had already started.",
      "The concert had started when we arrived.",
      "The concert had already started when we arrived."
    ],
    explanation: "Prima è iniziato il concerto (past perfect: had started), poi siamo arrivati (past simple: arrived).",
    notes: {
      "When we arrived, the concert started.": "Con due past simple sembra che il concerto sia iniziato proprio nel momento in cui siamo arrivati. Per dire «era già iniziato» serve had started.",
      "When we had arrived, the concert started.": "Hai messo il past perfect sull'azione sbagliata: è il concerto che è iniziato prima.",
      "When we arrived, the concert has started.": "Has started è present perfect: in un racconto passato serve had started."
    } },

  { id: "pperf2_012", topic: "past_perfect", difficulty: 3, type: "error", group: "pp_form",
    prompt: "When I saw Sara, she had already went home.",
    wrong: "went",
    answers: ["When I saw Sara, she had already gone home."],
    explanation: "Dopo had serve il participio passato, non il past simple: go – went – gone, quindi had gone." },

  { id: "pperf2_013", topic: "past_perfect", difficulty: 3, type: "error", group: "pp_sequence",
    prompt: "I didn't recognise my cousin because he has grown a beard.",
    wrong: "has",
    answers: ["I didn't recognise my cousin because he had grown a beard."],
    explanation: "La barba è cresciuta PRIMA del momento passato in cui non l'hai riconosciuto: serve il past perfect, had grown." },

  { id: "pperf2_014", topic: "past_perfect", difficulty: 3, type: "translate", group: "pp_time_words",
    prompt: "Quando sono arrivato, il treno era già partito.",
    answers: [
      "When I arrived, the train had already left.",
      "When I arrived, the train had already gone.",
      "When I got there, the train had already left.",
      "When I got to the station, the train had already left.",
      "The train had already left when I arrived.",
      "The train had already gone when I arrived.",
      "The train had already left when I got there."
    ],
    explanation: "«Era già partito» è un trapassato prossimo: in inglese past perfect, had already left. «Sono arrivato» è il past simple arrived.",
    notes: {
      "When I arrived, the train was already left.": "Errore tipico: in italiano «era partito» usa essere, ma in inglese il past perfect si fa sempre con had: had left.",
      "When I arrived, the train has already left.": "Has left è present perfect: in un racconto passato serve had left.",
      "When I arrived, the train already left.": "Serve il past perfect per dire che il treno era partito PRIMA: had already left.",
      "When I have arrived, the train had already left.": "«Sono arrivato» in un racconto si traduce con il past simple: I arrived."
    } },

  { id: "pperf2_015", topic: "past_perfect", difficulty: 3, type: "gap", group: "pp_negative_question",
    prompt: "Was that trip your first time in London? ___ you ever been there before?",
    answers: ["Had"],
    explanation: "Si chiede di esperienze PRIMA di un viaggio passato: domanda al past perfect, Had + soggetto + participio (been).",
    notes: {
      "Have": "Have you ever been…? chiede delle esperienze fino ad oggi; qui il punto di riferimento è quel viaggio passato, quindi Had.",
      "Did": "Did non si usa con il participio been: serve Had.",
      "Were": "Il past perfect si forma con had, anche se in italiano diciamo «eri mai stato»."
    } },

  /* ================= SECOND CONDITIONAL ================= */
  { id: "cond2_001", topic: "second_conditional", difficulty: 1, type: "mc", group: "c2_form",
    prompt: "If I had more money, I ___ a new phone.",
    options: ["would buy", "will buy", "bought", "would bought"],
    answers: ["would buy"],
    explanation: "Situazione immaginaria: If + past simple (had), would + verbo base (buy). In italiano: «se avessi…, comprerei…».",
    notes: {
      "will buy": "Will va con il periodo ipotetico di primo tipo (If I have…). Con «If I had» serve would.",
      "bought": "Nella frase principale serve il condizionale: would buy (= comprerei).",
      "would bought": "Dopo would va il verbo base: buy."
    },
    it: "Se avessi più soldi, comprerei un telefono nuovo." },

  { id: "cond2_002", topic: "second_conditional", difficulty: 1, type: "mc", group: "c2_no_would_in_if",
    prompt: "If I ___ a superpower, I would choose to fly.",
    options: ["had", "would have", "have", "will have"],
    answers: ["had"],
    explanation: "Nella frase con if si usa il past simple (had), non would. Il congiuntivo italiano «se avessi» diventa past simple.",
    notes: {
      "would have": "Errore tipico: «If I would have» non si dice. Would va nell'altra frase; dopo if serve il past simple: If I had.",
      "have": "Con il presente sarebbe primo tipo (cosa reale), ma l'altra frase ha would: serve had.",
      "will have": "Dopo if non si usa will (né would): If I had."
    } },

  { id: "cond2_003", topic: "second_conditional", difficulty: 1, type: "mc", group: "c2_were",
    prompt: "If I ___ you, I would talk to the teacher.",
    options: ["were", "am", "would be", "be"],
    answers: ["were"],
    explanation: "Per dare un consiglio si usa la formula fissa If I were you, I would… (= se fossi in te…).",
    notes: {
      "am": "Non è una situazione reale (io non sono te!): serve il past, were.",
      "would be": "Dopo if non si usa would: If I were you.",
      "be": "Il verbo be non resta alla forma base dopo if: If I were you."
    } },

  { id: "cond2_004", topic: "second_conditional", difficulty: 1, type: "mc", group: "c2_question",
    prompt: "What ___ you do if you found a wallet in the street?",
    options: ["would", "will", "did", "do"],
    answers: ["would"],
    explanation: "Domanda su una situazione immaginaria: What would you do if + past simple? (= cosa faresti se…?).",
    notes: {
      "will": "Con «if you found» (past simple) l'altra frase vuole would, non will.",
      "did": "Did you do chiederebbe cosa hai fatto davvero; qui è una situazione immaginaria: would.",
      "do": "Do è presente; per «faresti» serve would."
    } },

  { id: "cond2_005", topic: "second_conditional", difficulty: 1, type: "mc", group: "c2_form",
    prompt: "“If I lived by the sea, I would go surfing every day.” Chi parla vive al mare?",
    options: ["No, it's an imaginary situation.", "Yes, he lives by the sea now.", "Yes, and he is moving there next week."],
    answers: ["No, it's an imaginary situation."],
    explanation: "Il periodo ipotetico di secondo tipo descrive situazioni immaginarie o non vere ora: «se vivessi al mare» = non ci vivo.",
    notes: {
      "Yes, he lives by the sea now.": "Lived qui non è un passato vero: dopo if indica una situazione irreale nel presente. Quindi non ci vive.",
      "Yes, and he is moving there next week.": "Niente nella frase parla di un trasloco: è solo un'ipotesi immaginaria."
    } },

  { id: "cond2_006", topic: "second_conditional", difficulty: 2, type: "gap", group: "c2_no_would_in_if",
    prompt: "If we ___ (live) in London, we would visit museums every weekend.",
    answers: ["lived"],
    explanation: "Nella frase con if va il past simple: lived. Would sta solo nell'altra frase.",
    notes: {
      "would live": "Non si mette would dopo if: If we lived (come «se vivessimo»).",
      "live": "Con il presente sarebbe una situazione reale; l'altra frase ha would, quindi serve il past: lived.",
      "will live": "Dopo if non si usa will: If we lived."
    } },

  { id: "cond2_007", topic: "second_conditional", difficulty: 2, type: "gap", group: "c2_form",
    prompt: "If my brother studied harder, he ___ (get) better marks.",
    answers: ["would get"],
    explanation: "Con If + past simple (studied), la conseguenza immaginaria è would + verbo base: would get (= prenderebbe).",
    notes: {
      "will get": "Will è del primo tipo (If he studies…). Con «studied» serve would.",
      "got": "Got è solo passato: per «prenderebbe» serve would get.",
      "would got": "Dopo would va il verbo base: get."
    } },

  { id: "cond2_008", topic: "second_conditional", difficulty: 2, type: "order", group: "c2_question",
    prompt: "Riordina le parole per formare una domanda.",
    answers: ["What would you do if you met a famous footballer?", "If you met a famous footballer, what would you do?"],
    explanation: "Domanda: What would you do + if + past simple (met). La frase con if può stare anche all'inizio.",
    it: "Cosa faresti se incontrassi un calciatore famoso?" },

  { id: "cond2_009", topic: "second_conditional", difficulty: 2, type: "transform", group: "c2_form",
    instruction: "Riscrivi come periodo ipotetico di secondo tipo, iniziando con «If».",
    prompt: "I don't have a dog, so I don't go for walks every day.",
    answers: ["If I had a dog, I would go for walks every day.", "If I had a dog, I would go for a walk every day."],
    explanation: "Situazione non vera oggi (non ho un cane): If + past simple (had), would + verbo base (go). Le negazioni spariscono perché immagini il contrario.",
    notes: {
      "If I would have a dog, I would go for walks every day.": "Dopo if non si usa would: If I had a dog.",
      "If I had a dog, I will go for walks every day.": "Con «If I had» la conseguenza vuole would, non will.",
      "If I have a dog, I will go for walks every day.": "Questo è il primo tipo (situazione possibile). Ma tu il cane non ce l'hai: serve If I had…, I would…",
      "If I didn't have a dog, I wouldn't go for walks every day.": "Devi immaginare il contrario della realtà: non hai un cane, quindi «If I had a dog»."
    } },

  { id: "cond2_010", topic: "second_conditional", difficulty: 2, type: "mc", group: "c2_were",
    prompt: "Your friend says: “I always feel tired at school.” Which advice is correct?",
    options: ["If I were you, I'd go to bed earlier.", "If I am you, I'll go to bed earlier.", "If I would be you, I'd go to bed earlier.", "If I were you, I go to bed earlier."],
    answers: ["If I were you, I'd go to bed earlier."],
    explanation: "Per consigliare: If I were you, I'd (= I would) + verbo base. È come «se fossi in te, andrei…».",
    notes: {
      "If I am you, I'll go to bed earlier.": "Non è una situazione reale: serve If I were you…, I would…",
      "If I would be you, I'd go to bed earlier.": "Dopo if non si usa would: If I were you.",
      "If I were you, I go to bed earlier.": "Nell'altra frase serve il condizionale: I'd go (I would go)."
    } },

  { id: "cond2_011", topic: "second_conditional", difficulty: 3, type: "error", group: "c2_no_would_in_if",
    prompt: "If I would have more free time, I would learn the guitar.",
    wrong: "would have",
    answers: ["If I had more free time, I would learn the guitar.", "If I had more free time, I would learn to play the guitar."],
    explanation: "Errore tipico degli italiani: dopo if non va would. Si usa il past simple (If I had), e would solo nell'altra frase." },

  { id: "cond2_012", topic: "second_conditional", difficulty: 3, type: "error", group: "c2_form",
    prompt: "If she knew the answer, she will tell us.",
    wrong: "will",
    answers: ["If she knew the answer, she would tell us.", "If she knows the answer, she will tell us."],
    explanation: "Non si mescolano i due tipi: If + past simple (knew) va con would (she would tell us). In alternativa, primo tipo: If she knows…, she will…" },

  { id: "cond2_013", topic: "second_conditional", difficulty: 3, type: "translate", group: "c2_were",
    prompt: "Se fossi in te, studierei di più.",
    answers: [
      "If I were you, I would study more.",
      "If I were you, I would study harder.",
      "If I was you, I would study more.",
      "If I was you, I would study harder.",
      "I would study more if I were you.",
      "I would study harder if I were you."
    ],
    explanation: "«Se fossi in te» è la formula fissa If I were you; «studierei» = would + verbo base: I would study.",
    notes: {
      "If I would be you, I would study more.": "Dopo if non va would: If I were you.",
      "If I am you, I will study more.": "Non è una situazione reale: serve If I were you, I would…",
      "If I were you, I will study more.": "Con If I were you la conseguenza vuole would: I would study.",
      "If I were in you, I would study more.": "In inglese non si traduce «in»: la formula è If I were you."
    } },

  { id: "cond2_014", topic: "second_conditional", difficulty: 3, type: "translate", group: "c2_question",
    prompt: "Cosa faresti se vedessi un fantasma?",
    answers: ["What would you do if you saw a ghost?", "If you saw a ghost, what would you do?"],
    explanation: "«Faresti» = would you do; «se vedessi» = if you saw (past simple, mai would dopo if).",
    notes: {
      "What would you do if you would see a ghost?": "Dopo if non si usa would: if you saw.",
      "What will you do if you see a ghost?": "Questo è il primo tipo («cosa farai se vedrai»). Per «faresti… se vedessi» serve would + past simple.",
      "What would you do if you see a ghost?": "Dopo if serve il past simple: if you saw.",
      "What you would do if you saw a ghost?": "Nella domanda would va prima del soggetto: What would you do…?"
    } },

  { id: "cond2_015", topic: "second_conditional", difficulty: 3, type: "gap", group: "c2_form",
    prompt: "I'd love to go to the concert. If the tickets weren't so expensive, I ___ buy one.",
    answers: ["would", "could", "might"],
    explanation: "If + past simple (weren't) introduce una situazione immaginaria: nell'altra frase serve would (o could/might) + verbo base.",
    notes: {
      "will": "Con «if… weren't» (secondo tipo) non si usa will: serve would.",
      "can": "Can è presente/reale; per una situazione immaginaria serve could o would.",
      "would to": "Dopo would il verbo va senza to: would buy."
    } },

  /* ================= REPORTED SPEECH ================= */
  { id: "rep_001", topic: "reported_speech", difficulty: 1, type: "mc", group: "rep_say_tell",
    prompt: "Anna ___ me that she was tired.",
    options: ["told", "said", "talked", "spoke"],
    answers: ["told"],
    explanation: "Tell vuole subito la persona a cui si parla: tell me, tell him. Quindi Anna told me…",
    notes: {
      "said": "Errore tipico: «said me» non si dice. Say non vuole la persona subito dopo: si dice told me oppure said to me.",
      "talked": "Talk significa «chiacchierare/parlare», non si usa per riferire le parole di qualcuno con that.",
      "spoke": "Speak (spoke) significa «parlare» in generale, non si usa per riportare un messaggio con that."
    } },

  { id: "rep_002", topic: "reported_speech", difficulty: 1, type: "mc", group: "rep_say_tell",
    prompt: "Marco ___ that he loved pizza.",
    options: ["said", "told", "said me"],
    answers: ["said"],
    explanation: "Se non c'è la persona a cui si parla si usa say: Marco said (that)…",
    notes: {
      "told": "Tell vuole sempre la persona dopo (told me, told us). Qui la persona non c'è, quindi said.",
      "said me": "Errore tipico degli italiani («mi ha detto»): non si dice «said me». Si dice told me o said to me."
    } },

  { id: "rep_003", topic: "reported_speech", difficulty: 1, type: "mc", group: "rep_backshift",
    prompt: "At lunch yesterday Luca said, “I'm hungry.” → Yesterday Luca said that he ___ hungry.",
    options: ["was", "is", "were", "has been"],
    answers: ["was"],
    explanation: "Con said il tempo fa un passo indietro: am → was. Del resto la fame di Luca era ieri, non adesso.",
    notes: {
      "is": "Il verbo che introduce è al passato (said) e la fame era ieri: am diventa was.",
      "were": "Con he si usa was, non were.",
      "has been": "Am diventa was, non il present perfect."
    } },

  { id: "rep_004", topic: "reported_speech", difficulty: 1, type: "mc", group: "rep_questions",
    prompt: "“Where do you live?” → She asked me where ___.",
    options: ["I lived", "did I live", "do I live", "I did live"],
    answers: ["I lived"],
    explanation: "Nella domanda indiretta l'ordine è quello della frase normale (soggetto + verbo) e sparisce do/did: where I lived.",
    notes: {
      "did I live": "Errore tipico: nella domanda indiretta non c'è l'inversione e non si usa did. Si dice where I lived.",
      "do I live": "Non si usa do nella domanda indiretta, e il tempo fa un passo indietro: where I lived.",
      "I did live": "Did non serve: basta il past simple, where I lived."
    } },

  { id: "rep_005", topic: "reported_speech", difficulty: 1, type: "mc", group: "rep_backshift",
    prompt: "“I'll help you with your project.” → Last week my friend said he ___ help me with my project, but he didn't.",
    options: ["would", "will", "was", "can"],
    answers: ["would"],
    explanation: "Nel discorso indiretto will diventa would: “I will help you” → he said he would help me.",
    notes: {
      "will": "Dopo said (passato) will fa un passo indietro e diventa would.",
      "was": "«Was help» non è inglese: serve would + verbo base.",
      "can": "Can è presente, ma la frase riferisce parole del passato; e l'amico aveva detto will, che diventa would."
    } },

  { id: "rep_006", topic: "reported_speech", difficulty: 2, type: "gap", group: "rep_backshift",
    prompt: "When she was five, my sister said she ___ (can) swim, but it wasn't true!",
    answers: ["could"],
    explanation: "Nel discorso indiretto can diventa could: “I can swim” → she said she could swim.",
    notes: {
      "can": "Dopo said il modale fa un passo indietro: can → could.",
      "can't": "La sorella aveva detto di saper nuotare: could, non la forma negativa.",
      "would can": "Can non si combina con would: si usa solo could."
    } },

  { id: "rep_007", topic: "reported_speech", difficulty: 2, type: "gap", group: "rep_say_tell",
    prompt: "Our coach ___ (say / tell) us that the match was cancelled.",
    answers: ["told"],
    explanation: "Dopo il buco c'è la persona (us): con la persona subito dopo si usa tell → told us.",
    notes: {
      "said": "Say non vuole la persona subito dopo: si direbbe said to us. Qui c'è solo «us», quindi told.",
      "tell": "Il racconto è al passato (was cancelled): serve told.",
      "telled": "Tell è irregolare: tell – told – told."
    } },

  { id: "rep_008", topic: "reported_speech", difficulty: 2, type: "order", group: "rep_questions",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["She asked me where I had bought my trainers."],
    explanation: "Domanda indiretta: asked me + where + soggetto + verbo (I had bought), senza inversione. Bought → had bought (passo indietro).",
    it: "Mi ha chiesto dove avevo comprato le mie scarpe da ginnastica." },

  { id: "rep_009", topic: "reported_speech", difficulty: 2, type: "transform", group: "rep_backshift",
    instruction: "Riporta al discorso indiretto, iniziando con «Sara said».",
    prompt: "Last night Sara said: “I'm watching a film.”",
    answers: ["Sara said she was watching a film.", "Sara said that she was watching a film."],
    explanation: "Am watching → was watching (passo indietro), e I → she perché ora parli tu di Sara. That si può anche omettere.",
    notes: {
      "Sara said she is watching a film.": "Il film lo guardava ieri sera: am watching diventa was watching.",
      "Sara said I was watching a film.": "Cambia il pronome: Sara parlava di sé, quindi she, non I.",
      "Sara said me she was watching a film.": "Non si dice «said me»: o Sara said…, o Sara told me…"
    } },

  { id: "rep_010", topic: "reported_speech", difficulty: 2, type: "transform", group: "rep_questions",
    instruction: "Riporta la domanda al discorso indiretto, iniziando con «He asked me».",
    prompt: "“Do you like football?”",
    answers: ["He asked me if I liked football.", "He asked me whether I liked football.", "He asked me if I like football.", "He asked me whether I like football."],
    explanation: "Domande sì/no: asked me if (o whether) + frase normale, senza do. Di solito il tempo fa un passo indietro: like → liked.",
    notes: {
      "He asked me do I like football.": "Nella domanda indiretta non si usa do e serve if: He asked me if I liked football.",
      "He asked me if did I like football.": "Niente did e niente inversione dopo if: if I liked football.",
      "He asked me did I like football.": "Serve if (o whether) e l'ordine soggetto + verbo: if I liked football.",
      "He asked me if you liked football.": "Cambia il pronome: «you» detto a te diventa I."
    } },

  { id: "rep_011", topic: "reported_speech", difficulty: 2, type: "mc", group: "rep_pronouns_time",
    prompt: "“I'll call you tomorrow.” → Last month Giulia told me she would call me ___.",
    options: ["the next day", "tomorrow", "yesterday", "the day before"],
    answers: ["the next day"],
    explanation: "Quando riferisci parole dette tempo fa, tomorrow diventa the next day (o the following day).",
    notes: {
      "tomorrow": "Giulia parlava il mese scorso: il suo «domani» non è il tuo domani. Si dice the next day.",
      "yesterday": "Yesterday è il contrario: Giulia parlava del giorno dopo.",
      "the day before": "The day before corrisponde a yesterday, non a tomorrow."
    } },

  { id: "rep_012", topic: "reported_speech", difficulty: 3, type: "error", group: "rep_say_tell",
    prompt: "He said me that he was late.",
    wrong: "said me",
    answers: [
      "He told me that he was late.",
      "He told me he was late.",
      "He said to me that he was late.",
      "He said to me he was late.",
      "He said that he was late.",
      "He said he was late."
    ],
    explanation: "Errore tipico: «said me» non esiste. Con la persona si usa told me (o said to me); senza persona basta said." },

  { id: "rep_013", topic: "reported_speech", difficulty: 3, type: "error", group: "rep_questions",
    prompt: "She asked me where did I live.",
    wrong: "did I live",
    answers: ["She asked me where I lived.", "She asked me where I live."],
    explanation: "Nella domanda indiretta non c'è inversione né did: where + soggetto + verbo (where I lived)." },

  { id: "rep_014", topic: "reported_speech", difficulty: 3, type: "translate", group: "rep_pronouns_time",
    prompt: "Mi ha detto che sarebbe venuto il giorno dopo.",
    answers: [
      "He told me that he would come the next day.",
      "He told me he would come the next day.",
      "He told me that he would come the following day.",
      "He told me he would come the following day.",
      "He said that he would come the next day.",
      "He said he would come the next day.",
      "He said that he would come the following day.",
      "He said he would come the following day.",
      "He said to me that he would come the next day.",
      "He said to me he would come the next day.",
      "He said to me that he would come the following day.",
      "He said to me he would come the following day."
    ],
    explanation: "«Mi ha detto» = He told me (non «said me»). «Sarebbe venuto» = would come: will diventa would. «Il giorno dopo» = the next day / the following day.",
    notes: {
      "He said me that he would come the next day.": "Non si dice «said me»: usa told me oppure said to me.",
      "He told me that he will come the next day.": "Dopo told il will fa un passo indietro: would come.",
      "He told me that he would have come the next day.": "Il condizionale passato italiano («sarebbe venuto») qui si traduce con would + verbo base: would come.",
      "He told me that he would come tomorrow.": "«Il giorno dopo» non è «domani»: the next day."
    } },

  { id: "rep_015", topic: "reported_speech", difficulty: 3, type: "translate", group: "rep_questions",
    prompt: "Mi ha chiesto se avevo fame.",
    answers: [
      "He asked me if I was hungry.",
      "She asked me if I was hungry.",
      "He asked me whether I was hungry.",
      "She asked me whether I was hungry.",
      "He asked if I was hungry.",
      "She asked if I was hungry.",
      "He asked whether I was hungry.",
      "She asked whether I was hungry."
    ],
    explanation: "Domanda indiretta sì/no: asked (me) if + soggetto + verbo. «Avere fame» in inglese è be hungry: I was hungry.",
    notes: {
      "He asked me if was I hungry.": "Nella domanda indiretta niente inversione: if I was hungry.",
      "He asked me if I had hungry.": "«Avere fame» si dice be hungry: I was hungry.",
      "He asked me was I hungry.": "Serve if (o whether) e l'ordine soggetto + verbo: if I was hungry.",
      "He asked me if I am hungry.": "Dopo asked il tempo fa un passo indietro: am → was."
    } },

  /* ================= MODALS OF DEDUCTION ================= */
  { id: "ded_001", topic: "modals_deduction", difficulty: 1, type: "mc", group: "ded_must",
    prompt: "You've been running for two hours. You ___ be really tired!",
    options: ["must", "can't", "mustn't", "might not"],
    answers: ["must"],
    explanation: "Must per una deduzione = «sono quasi sicuro che sì»: dopo due ore di corsa sei sicuramente stanco.",
    notes: {
      "can't": "Can't significa «sono sicuro di no»: non ha senso dopo due ore di corsa.",
      "mustn't": "Mustn't indica un divieto («non devi»), non una deduzione.",
      "might not": "Might not = «forse no»: ma dopo due ore di corsa siamo quasi sicuri che sei stanco."
    } },

  { id: "ded_002", topic: "modals_deduction", difficulty: 1, type: "mc", group: "ded_cant",
    prompt: "That ___ be Luca's bike. His bike is red, and this one is blue.",
    options: ["can't", "mustn't", "must", "might"],
    answers: ["can't"],
    explanation: "Can't = «sono sicuro che NON è così». La bici di Luca è rossa, questa è blu: non può essere la sua.",
    notes: {
      "mustn't": "Errore tipico degli italiani: il contrario del must di deduzione è can't, non mustn't (che significa «è vietato»).",
      "must": "Must = sicuro di sì, ma i colori non corrispondono: è sicuramente NON sua.",
      "might": "Might = forse, ma qui abbiamo una prova chiara: non può essere sua."
    } },

  { id: "ded_003", topic: "modals_deduction", difficulty: 1, type: "mc", group: "ded_might",
    prompt: "I'm not sure where Sofia is. She ___ be in the library.",
    options: ["might", "must", "can't", "mustn't"],
    answers: ["might"],
    explanation: "Might (o may/could) = forse. «I'm not sure» ci dice che è solo una possibilità.",
    notes: {
      "must": "Must = sono quasi sicuro, ma la frase dice «I'm not sure».",
      "can't": "Can't = sono sicuro di no, ma chi parla non è sicuro di niente.",
      "mustn't": "Mustn't è un divieto («non deve»), non una deduzione."
    } },

  { id: "ded_004", topic: "modals_deduction", difficulty: 1, type: "mc", group: "ded_must",
    prompt: "The lights are on and I can hear music. Somebody ___ be at home.",
    options: ["must", "can't", "mustn't"],
    answers: ["must"],
    explanation: "Ci sono indizi chiari (luci, musica): siamo quasi sicuri che qualcuno è in casa, quindi must.",
    notes: {
      "can't": "Can't = sicuro di no, ma gli indizi dicono il contrario.",
      "mustn't": "Mustn't indica un divieto, non una deduzione."
    } },

  { id: "ded_005", topic: "modals_deduction", difficulty: 1, type: "mc", group: "ded_base_verb",
    prompt: "Look at her face! She must ___ very happy with her exam results.",
    options: ["be", "to be", "being", "is"],
    answers: ["be"],
    explanation: "Must, might e can't sono seguiti dal verbo base senza to: she must be.",
    notes: {
      "to be": "Dopo i modali (must, can, might) non si mette to.",
      "being": "Dopo must serve il verbo base, non la forma -ing.",
      "is": "Dopo un modale il verbo resta alla forma base: be, non is."
    } },

  { id: "ded_006", topic: "modals_deduction", difficulty: 2, type: "gap", group: "ded_cant",
    prompt: "He ___ (sono sicuro di no) be hungry – he's just eaten two pizzas!",
    answers: ["can't", "cannot", "couldn't"],
    explanation: "Per dire «sono sicuro che non è così» si usa can't + verbo base: he can't be hungry.",
    notes: {
      "mustn't": "Errore tipico: mustn't è un divieto. Per la deduzione negativa si usa can't.",
      "must not": "Must not indica un divieto. Per «non può essere» si usa can't.",
      "might not": "Might not = forse no, ma dopo due pizze siamo sicuri: can't."
    } },

  { id: "ded_007", topic: "modals_deduction", difficulty: 2, type: "gap", group: "ded_might",
    prompt: "Take your jacket. It ___ (forse) rain later.",
    answers: ["might", "may", "could"],
    explanation: "Per una possibilità («forse») si usa might, may o could + verbo base.",
    notes: {
      "must": "Must = quasi sicuro; il suggerimento dice «forse»: might.",
      "will": "Will è una previsione sicura; per «forse» serve might/may/could.",
      "might to": "Dopo might non si mette to: it might rain."
    } },

  { id: "ded_008", topic: "modals_deduction", difficulty: 2, type: "order", group: "ded_cant",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["That can't be the right answer."],
    explanation: "Soggetto + can't + verbo base (be): «non può essere» la risposta giusta.",
    it: "Non può essere la risposta giusta." },

  { id: "ded_009", topic: "modals_deduction", difficulty: 2, type: "transform", group: "ded_must",
    instruction: "Riscrivi la frase usando must, might o can't.",
    prompt: "I'm sure he is at the gym.",
    answers: ["He must be at the gym."],
    explanation: "«I'm sure he is…» = deduzione certa positiva: he must be + resto della frase.",
    notes: {
      "He must to be at the gym.": "Dopo must non si mette to: he must be.",
      "He must is at the gym.": "Dopo must il verbo resta alla forma base: be.",
      "He might be at the gym.": "Might = forse; ma la frase dice «I'm sure»: must.",
      "He can't be at the gym.": "Can't = sono sicuro di NO, il contrario di ciò che dice la frase."
    } },

  { id: "ded_010", topic: "modals_deduction", difficulty: 2, type: "mc", group: "ded_base_verb",
    prompt: "I can hear the water running. Someone ___ a shower.",
    options: ["must be having", "must have", "must having", "must to have"],
    answers: ["must be having"],
    explanation: "Per una deduzione su ciò che sta succedendo ADESSO si usa must be + -ing: someone must be having a shower.",
    notes: {
      "must have": "«Someone must have a shower» suona come un obbligo («qualcuno deve farsi la doccia»). Per un'azione in corso: must be having.",
      "must having": "Dopo must serve il verbo base: be having.",
      "must to have": "Dopo must non si mette to."
    } },

  { id: "ded_011", topic: "modals_deduction", difficulty: 3, type: "error", group: "ded_cant",
    prompt: "Marco says he saw a lion in the park. That mustn't be true!",
    wrong: "mustn't",
    answers: ["Marco says he saw a lion in the park. That can't be true!", "Marco says he saw a lion in the park. That couldn't be true!"],
    explanation: "«Non può essere vero» è una deduzione negativa: si usa can't, non mustn't (che significa «è vietato»)." },

  { id: "ded_012", topic: "modals_deduction", difficulty: 3, type: "error", group: "ded_base_verb",
    prompt: "She isn't answering her phone. She might to be at her grandma's house.",
    wrong: "might to be",
    answers: ["She isn't answering her phone. She might be at her grandma's house."],
    explanation: "Might è un modale: è seguito dal verbo base senza to (might be)." },

  { id: "ded_013", topic: "modals_deduction", difficulty: 3, type: "translate", group: "ded_must",
    prompt: "Devi essere stanco dopo la partita.",
    answers: ["You must be tired after the match.", "You must be tired after the game."],
    explanation: "Qui «devi» non è un obbligo ma una deduzione («sicuramente sei stanco»): must + be.",
    notes: {
      "You have to be tired after the match.": "Have to esprime un obbligo. Per una deduzione si usa must: You must be tired.",
      "You must to be tired after the match.": "Dopo must non si mette to.",
      "You must be tired after the party.": "«La partita» si dice the match (o the game), non the party (= la festa)."
    } },

  { id: "ded_014", topic: "modals_deduction", difficulty: 3, type: "translate", group: "ded_cant",
    prompt: "Non può essere Giulia: è a Roma.",
    answers: ["It can't be Giulia. She's in Rome.", "That can't be Giulia. She's in Rome.", "It can't be Giulia, because she's in Rome.", "That can't be Giulia, because she's in Rome."],
    explanation: "«Non può essere» = deduzione negativa sicura: can't be. Per indicare una persona che vedi o senti si usa it o that.",
    notes: {
      "It mustn't be Giulia. She's in Rome.": "Errore tipico: il contrario di must (deduzione) è can't, non mustn't.",
      "She can't be Giulia. She's in Rome.": "Per identificare qualcuno (al telefono, da lontano) si usa It/That: It can't be Giulia.",
      "It can't be Giulia. She's at Rome.": "Con le città si usa in: in Rome."
    } },

  { id: "ded_015", topic: "modals_deduction", difficulty: 3, type: "gap", group: "ded_might",
    prompt: "“Who's that boy?” “I'm not sure. He ___ be Anna's cousin, or maybe her neighbour.”",
    answers: ["might", "may", "could"],
    explanation: "«I'm not sure… or maybe» indica solo una possibilità: might (o may/could) + verbo base.",
    notes: {
      "must": "Must = quasi sicuro, ma chi parla dice «I'm not sure».",
      "can't": "Can't = sicuro di no; qui invece è una possibilità.",
      "mustn't": "Mustn't è un divieto, non una deduzione."
    } },

  /* ================= PHRASAL VERBS ================= */
  { id: "phr_001", topic: "phrasal_verbs", difficulty: 1, type: "mc", group: "phr_meaning_daily",
    prompt: "“Please turn off the TV.” Che cosa significa «turn off»?",
    options: ["spegnere", "accendere", "alzare il volume", "girare"],
    answers: ["spegnere"],
    explanation: "Turn off = spegnere (luce, TV, telefono). Il contrario è turn on = accendere.",
    notes: {
      "accendere": "Accendere si dice turn on. Off indica che qualcosa si interrompe.",
      "alzare il volume": "Alzare il volume si dice turn up.",
      "girare": "Turn da solo può voler dire «girare», ma turn off è un phrasal verb con un significato diverso: spegnere."
    } },

  { id: "phr_002", topic: "phrasal_verbs", difficulty: 1, type: "mc", group: "phr_look",
    prompt: "I can't find my phone. Can you help me ___ it?",
    options: ["look for", "look after", "look at", "look forward to"],
    answers: ["look for"],
    explanation: "Look for = cercare. Il telefono non si trova, quindi bisogna cercarlo.",
    notes: {
      "look after": "Look after = prendersi cura di (un fratellino, un animale), non cercare.",
      "look at": "Look at = guardare: ma il telefono non lo trovi, quindi non puoi guardarlo!",
      "look forward to": "Look forward to = non vedere l'ora di: non ha senso con un telefono perso."
    } },

  { id: "phr_003", topic: "phrasal_verbs", difficulty: 1, type: "mc", group: "phr_change_stop",
    prompt: "“Don't give up! You can do it!” Che cosa significa «give up»?",
    options: ["arrendersi", "regalare", "alzarsi", "continuare"],
    answers: ["arrendersi"],
    explanation: "Give up = arrendersi, smettere di provare (o smettere un'abitudine). «Don't give up!» = Non mollare!",
    notes: {
      "regalare": "Give da solo significa dare, ma give up ha un significato nuovo: arrendersi.",
      "alzarsi": "Alzarsi si dice get up.",
      "continuare": "Continuare si dice carry on: è quasi il contrario di give up."
    } },

  { id: "phr_004", topic: "phrasal_verbs", difficulty: 1, type: "mc", group: "phr_people",
    prompt: "My mum will ___ me up from school at four.",
    options: ["pick", "take", "get", "look"],
    answers: ["pick"],
    explanation: "Pick somebody up = passare a prendere qualcuno (in macchina, a scuola, alla stazione).",
    notes: {
      "take": "«Take me up» non significa passare a prendere: si dice pick me up.",
      "get": "Get up = alzarsi; «get me up» vorrebbe dire «farmi alzare».",
      "look": "«Look me up» significa cercarmi (per esempio online), non passarmi a prendere."
    } },

  { id: "phr_005", topic: "phrasal_verbs", difficulty: 1, type: "mc", group: "phr_meaning_daily",
    prompt: "It's freezing outside. ___ your coat!",
    options: ["Put on", "Take off", "Turn on", "Get up"],
    answers: ["Put on"],
    explanation: "Put on = indossare, mettersi (vestiti, scarpe). Fa freddo, quindi il cappotto va messo.",
    notes: {
      "Take off": "Take off = togliersi: con il freddo il cappotto non si toglie!",
      "Turn on": "Turn on = accendere (luce, TV), non si usa per i vestiti.",
      "Get up": "Get up = alzarsi dal letto."
    } },

  { id: "phr_006", topic: "phrasal_verbs", difficulty: 2, type: "gap", group: "phr_change_stop",
    prompt: "We can't make pancakes – we've run ___ eggs.",
    answers: ["out of"],
    explanation: "Run out of + cosa = finire, rimanere senza. Servono entrambe le particelle: out of.",
    notes: {
      "out": "Manca of: davanti alla cosa finita si dice run out OF eggs.",
      "off": "Run off significa scappare via. Per «rimanere senza» si usa run out of.",
      "away": "Run away = scappare. Per «finire le uova» si usa run out of."
    },
    it: "Non possiamo fare i pancake: abbiamo finito le uova." },

  { id: "phr_007", topic: "phrasal_verbs", difficulty: 2, type: "gap", group: "phr_look",
    prompt: "I'm really looking ___ the school trip to London!",
    answers: ["forward to"],
    explanation: "Look forward to = non vedere l'ora di. Attenzione: serve anche to prima della cosa attesa.",
    notes: {
      "forward": "Manca to: si dice looking forward TO the trip.",
      "for": "Look for = cercare: non ha senso qui.",
      "after": "Look after = prendersi cura di: non ha senso con una gita."
    } },

  { id: "phr_008", topic: "phrasal_verbs", difficulty: 2, type: "gap", group: "phr_people",
    prompt: "Do you get ___ well with your brother, or do you argue a lot?",
    answers: ["on", "along"],
    explanation: "Get on (well) with somebody = andare d'accordo con qualcuno. Si usa spesso con well.",
    notes: {
      "up": "Get up = alzarsi: non c'entra con il rapporto con tuo fratello.",
      "off": "Get off = scendere (dall'autobus): per «andare d'accordo» si dice get on with.",
      "with": "With c'è già dopo: manca la particella on (get on well with)."
    } },

  { id: "phr_009", topic: "phrasal_verbs", difficulty: 2, type: "order", group: "phr_change_stop",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["Our car broke down on the motorway."],
    explanation: "Break down (passato: broke down) = guastarsi, rompersi (di auto e macchine). Down sta subito dopo il verbo.",
    it: "La nostra macchina si è guastata in autostrada." },

  { id: "phr_010", topic: "phrasal_verbs", difficulty: 2, type: "mc", group: "phr_change_stop",
    prompt: "We ___ at six in the morning to catch the first ferry to Elba.",
    options: ["set off", "set up", "got off", "carried on"],
    answers: ["set off"],
    explanation: "Set off = partire, mettersi in viaggio. Siamo partiti alle sei per prendere il primo traghetto.",
    notes: {
      "set up": "Set up = montare, organizzare (una tenda, un'attività), non partire.",
      "got off": "Get off = scendere (dall'autobus, dal treno): non indica la partenza per un viaggio.",
      "carried on": "Carry on = continuare: non indica la partenza."
    } },

  { id: "phr_011", topic: "phrasal_verbs", difficulty: 2, type: "transform", group: "phr_meaning_daily",
    instruction: "Sostituisci «remove» con un phrasal verb.",
    prompt: "Please remove your shoes before you come in.",
    answers: ["Please take off your shoes before you come in.", "Please take your shoes off before you come in."],
    explanation: "Take off = togliersi (vestiti, scarpe). La particella può stare prima o dopo l'oggetto: take off your shoes / take your shoes off.",
    notes: {
      "Please put off your shoes before you come in.": "Put on = mettersi, ma put off significa rimandare. Per togliersi si usa take off.",
      "Please take out your shoes before you come in.": "Take out = tirare fuori. Per i vestiti e le scarpe si usa take off.",
      "Please turn off your shoes before you come in.": "Turn off = spegnere: si usa per gli apparecchi, non per le scarpe!"
    } },

  { id: "phr_012", topic: "phrasal_verbs", difficulty: 3, type: "error", group: "phr_people",
    prompt: "I want to find up what time the film starts.",
    wrong: "find up",
    answers: ["I want to find out what time the film starts."],
    explanation: "Find out = scoprire, venire a sapere un'informazione. La particella giusta è out, non up." },

  { id: "phr_013", topic: "phrasal_verbs", difficulty: 3, type: "error", group: "phr_look",
    prompt: "My grandma looks for my little brother when my parents are at work.",
    wrong: "looks for",
    answers: ["My grandma looks after my little brother when my parents are at work."],
    explanation: "Look after = prendersi cura di qualcuno. Look for significa cercare: la nonna non sta cercando il fratellino!" },

  { id: "phr_014", topic: "phrasal_verbs", difficulty: 3, type: "translate", group: "phr_meaning_daily",
    prompt: "Mi alzo alle sette ogni mattina.",
    answers: ["I get up at seven every morning.", "I get up at 7 every morning.", "I get up at seven o'clock every morning.", "I get up at 7 o'clock every morning."],
    explanation: "Alzarsi (dal letto) = get up. In inglese non serve il riflessivo: I get up, non «I get myself up».",
    notes: {
      "I wake up at seven every morning.": "Wake up = svegliarsi (aprire gli occhi). Alzarsi dal letto è get up.",
      "I stand up at seven every morning.": "Stand up = alzarsi in piedi da una sedia; dal letto si dice get up.",
      "I get on at seven every morning.": "Get on = salire (su un mezzo) o andare d'accordo. Alzarsi è get up.",
      "I get up at seven every mornings.": "Dopo every il nome è singolare: every morning."
    } },

  { id: "phr_015", topic: "phrasal_verbs", difficulty: 3, type: "translate", group: "phr_change_stop",
    prompt: "Il nostro autobus si è guastato.",
    answers: ["Our bus broke down.", "Our bus has broken down."],
    explanation: "Guastarsi (di veicoli e macchine) = break down. Non serve il riflessivo: the bus broke down.",
    notes: {
      "Our bus broke up.": "Break up significa lasciarsi (di una coppia) o finire la scuola: per un guasto si dice break down.",
      "Our bus broke itself down.": "Break down non vuole il riflessivo: Our bus broke down.",
      "Our bus has broke down.": "Dopo has serve il participio: broken."
    } }

], 'grammar-b1plus');
