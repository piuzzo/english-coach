EC.addItems([

  /* ===================== BE ===================== */
  { id: 'be_001', topic: 'be', difficulty: 1, type: 'mc', group: 'be_forms',
    prompt: "My best friend ___ really good at football.",
    options: ['am', 'is', 'are', 'be'],
    answers: ['is'],
    it: "Il mio migliore amico è bravissimo a calcio.",
    explanation: "My best friend = he (una sola persona), e con he/she/it il verbo to be è is.",
    notes: {
      'am': "Am si usa solo con I: I am.",
      'are': "Are si usa con you, we, they. Qui il soggetto è una persona sola (= he), quindi is.",
      'be': "Be è la forma base (l'infinito): nella frase serve la forma coniugata, is."
    } },

  { id: 'be_002', topic: 'be', difficulty: 1, type: 'mc', group: 'be_forms',
    prompt: "We ___ in the same class this year.",
    options: ['is', 'am', 'are'],
    answers: ['are'],
    it: "Quest'anno siamo nella stessa classe.",
    explanation: "Con we (noi) il verbo to be è are: we are.",
    notes: {
      'is': "Is va con he/she/it (una persona o cosa). Con we serve are.",
      'am': "Am va solo con I. Con we serve are."
    } },

  { id: 'be_003', topic: 'be', difficulty: 1, type: 'mc', group: 'be_age_feelings',
    prompt: "I ___ fourteen years old.",
    options: ['am', 'have', 'is', 'has'],
    answers: ['am'],
    it: "Ho quattordici anni.",
    explanation: "Per dire l'età l'inglese usa to be, non to have: I am fourteen (years old).",
    notes: {
      'have': "Errore tipico degli italiani: «ho 14 anni» si traduce con to be, I am fourteen.",
      'is': "L'età si dice con to be, giusto! Ma con I la forma è am, non is.",
      'has': "L'età si dice con to be (I am), non con to have. E has va con he/she/it, non con I."
    } },

  { id: 'be_004', topic: 'be', difficulty: 1, type: 'mc', group: 'be_age_feelings',
    prompt: "Can I have a sandwich? I ___ really hungry.",
    options: ['have', 'am', 'has', 'is'],
    answers: ['am'],
    it: "Posso avere un panino? Ho davvero fame.",
    explanation: "Fame, sete, freddo, caldo e paura in inglese si esprimono con to be + aggettivo: I am hungry.",
    notes: {
      'have': "In italiano si dice «ho fame», ma in inglese si usa to be: I am hungry.",
      'has': "Qui serve to be (I am hungry). E comunque has non va con I.",
      'is': "Il verbo giusto è to be, ma con I la forma è am, non is."
    } },

  { id: 'be_005', topic: 'be', difficulty: 1, type: 'mc', group: 'be_negative',
    prompt: "They ___ at school today – it's Sunday!",
    options: ["aren't", "isn't", "don't", 'not'],
    answers: ["aren't"],
    it: "Oggi non sono a scuola: è domenica!",
    explanation: "La negativa di to be si fa aggiungendo not al verbo: they are not = they aren't.",
    notes: {
      "isn't": "Isn't (is not) va con he/she/it. Con they serve aren't.",
      "don't": "Con to be non si usa don't: basta aggiungere not al verbo, they aren't.",
      'not': "Manca il verbo: in inglese serve sempre are prima di not (they are not / they aren't)."
    } },

  { id: 'be_006', topic: 'be', difficulty: 2, type: 'mc', group: 'be_subject',
    prompt: "Hurry up! ___ late and the bus is coming!",
    options: ["It's", 'Is', 'It', 'Are'],
    answers: ["It's"],
    it: "Sbrigati! È tardi e sta arrivando l'autobus!",
    explanation: "In inglese il soggetto va sempre scritto, anche quando in italiano non c'è: «è tardi» = it is late (it's late).",
    notes: {
      'Is': "Manca il soggetto! In italiano diciamo «è tardi», ma in inglese serve it: It's late.",
      'It': "Manca il verbo: serve it + is, cioè It's late.",
      'Are': "Manca il soggetto, e are non va con un soggetto singolare. Si dice It's late."
    } },

  { id: 'be_007', topic: 'be', difficulty: 2, type: 'gap', group: 'be_forms',
    prompt: "My parents ___ (be) from Naples, but I was born in Milan.",
    answers: ['are'],
    it: "I miei genitori sono di Napoli, ma io sono nato a Milano.",
    explanation: "My parents = they (più persone), quindi to be diventa are.",
    notes: {
      'is': "My parents sono due persone (= they): serve are, non is.",
      'be': "Be è la forma base: va coniugato. Con my parents (= they) diventa are.",
      'am': "Am va solo con I. My parents = they → are."
    } },

  { id: 'be_008', topic: 'be', difficulty: 2, type: 'gap', group: 'be_negative',
    prompt: "I ___ (be / not) tired, so I can play another match.",
    answers: ['am not'],
    it: "Non sono stanco, quindi posso giocare un'altra partita.",
    explanation: "Con I la negativa di to be è am not (contratto: I'm not).",
    notes: {
      "isn't": "Isn't va con he/she/it. Con I si dice am not.",
      "aren't": "Aren't va con you/we/they. Con I si dice am not.",
      "don't": "Con to be non si usa don't: I am not tired.",
      'not am': "Not va dopo il verbo: am not."
    } },

  { id: 'be_009', topic: 'be', difficulty: 2, type: 'order', group: 'be_questions',
    prompt: "Riordina le parole per formare una domanda.",
    answers: ['Is your sister good at tennis?'],
    it: "Tua sorella è brava a tennis?",
    explanation: "Nelle domande con to be il verbo va prima del soggetto: Is + your sister + good at tennis?" },

  { id: 'be_010', topic: 'be', difficulty: 2, type: 'transform', group: 'be_questions',
    instruction: "Volgi alla forma interrogativa.",
    prompt: "Your friends are at the cinema.",
    answers: ['Are your friends at the cinema?'],
    it: "I tuoi amici sono al cinema?",
    explanation: "Per fare la domanda con to be basta invertire verbo e soggetto: Are your friends…?",
    notes: {
      'Your friends are at the cinema?': "In italiano basta il punto di domanda, in inglese bisogna anche invertire: Are your friends at the cinema?",
      'Do your friends are at the cinema?': "Con to be non si usa do: si inverte e basta, Are your friends…?",
      'Is your friends at the cinema?': "Your friends è plurale (= they): serve are."
    } },

  { id: 'be_011', topic: 'be', difficulty: 2, type: 'transform', group: 'be_negative',
    instruction: "Volgi alla forma negativa.",
    prompt: "Our English teacher is strict.",
    answers: ["Our English teacher isn't strict."],
    it: "La nostra insegnante di inglese non è severa.",
    explanation: "La negativa di to be si fa aggiungendo not dopo il verbo: is not = isn't.",
    notes: {
      "Our English teacher doesn't strict.": "Con to be non si usa doesn't: basta is not / isn't.",
      "Our English teacher not is strict.": "Not va dopo il verbo to be: is not (isn't).",
      "Our English teacher doesn't be strict.": "Con to be la negativa è semplicemente isn't, senza does."
    } },

  { id: 'be_012', topic: 'be', difficulty: 3, type: 'error', group: 'be_age_feelings',
    prompt: "My brother has sixteen years.",
    wrong: 'has sixteen years',
    answers: ['My brother is sixteen.', 'My brother is sixteen years old.', 'My brother is 16.', 'My brother is 16 years old.'],
    it: "Mio fratello ha sedici anni.",
    explanation: "L'età in inglese si dice con to be: My brother is sixteen (years old). «Has sixteen years» è un calco dall'italiano.",
    notes: {
      'My brother has sixteen years old.': "Anche con «old» il verbo giusto è to be: My brother is sixteen years old.",
      'My brother has got sixteen years.': "L'età non si esprime con have got ma con to be: My brother is sixteen.",
      'My brother is sixteen years.': "Quasi! Se aggiungi years devi aggiungere anche old: sixteen years old. Oppure solo: is sixteen."
    } },

  { id: 'be_013', topic: 'be', difficulty: 3, type: 'error', group: 'be_subject',
    prompt: "Is very cold today, so wear a jacket.",
    wrong: 'Is very cold',
    answers: ['It is very cold today, so wear a jacket.'],
    it: "Oggi fa molto freddo, quindi mettiti una giacca.",
    explanation: "In inglese il soggetto non si omette mai: per il tempo atmosferico si usa it → It is (It's) very cold.",
    notes: {
      'Very cold today, so wear a jacket.': "Mancano soggetto e verbo: serve It is (It's) very cold."
    } },

  { id: 'be_014', topic: 'be', difficulty: 3, type: 'translate', group: 'be_age_feelings',
    prompt: "Ho freddo e ho sete.",
    answers: ['I am cold and thirsty.', 'I am cold and I am thirsty.'],
    explanation: "Freddo e sete in inglese si esprimono con to be + aggettivo: I am cold, I am thirsty.",
    notes: {
      'I have cold and thirsty.': "In italiano si dice «ho freddo», ma in inglese si usa to be: I am cold and thirsty.",
      'I have cold and I have thirst.': "Calco dall'italiano: in inglese si dice I am cold and I am thirsty.",
      'I am cold and I have thirst.': "Bene il primo pezzo! Anche la sete però si dice con to be: I am thirsty."
    } },

  { id: 'be_015', topic: 'be', difficulty: 3, type: 'translate', group: 'be_questions',
    prompt: "Sei pronto per la partita?",
    answers: ['Are you ready for the match?', 'Are you ready for the game?'],
    explanation: "Domanda con to be: verbo prima del soggetto, Are you ready…?",
    notes: {
      'You are ready for the match?': "In inglese nella domanda il verbo va prima del soggetto: Are you ready…?",
      'Are you ready to the match?': "Si dice ready for: Are you ready for the match?",
      'Do you are ready for the match?': "Con to be non si usa do: Are you ready for the match?"
    } },

  { id: 'be_016', topic: 'be', difficulty: 3, type: 'gap', group: 'be_questions',
    prompt: "'___ your brothers at home?' 'No, they aren't.'",
    answers: ['Are'],
    it: "«I tuoi fratelli sono a casa?» «No, non ci sono.»",
    explanation: "Your brothers è plurale (= they): la domanda inizia con Are, come conferma la risposta they aren't.",
    notes: {
      'Is': "Brothers ha la -s del plurale: con un soggetto plurale serve Are.",
      'Do': "Con to be non si usa do: Are your brothers at home?",
      'Have': "Qui serve to be (essere a casa): Are your brothers at home?"
    } },

  /* ===================== HAVE GOT ===================== */
  { id: 'hg_001', topic: 'have_got', difficulty: 1, type: 'mc', group: 'hg_has_have',
    prompt: "My sister ___ got long brown hair.",
    options: ['has', 'have', 'is', 'does'],
    answers: ['has'],
    it: "Mia sorella ha i capelli lunghi castani.",
    explanation: "My sister = she, e con he/she/it si usa has got.",
    notes: {
      'have': "Have got va con I/you/we/they. Con she (my sister) serve has got.",
      'is': "Is got non esiste: per il possesso e l'aspetto fisico si usa has got.",
      'does': "Does got non esiste: si dice she has got."
    } },

  { id: 'hg_002', topic: 'have_got', difficulty: 1, type: 'mc', group: 'hg_has_have',
    prompt: "My cousins ___ got a big dog called Rex.",
    options: ['have', 'has', 'are'],
    answers: ['have'],
    it: "I miei cugini hanno un cane grande che si chiama Rex.",
    explanation: "My cousins = they (più persone), quindi si usa have got.",
    notes: {
      'has': "Has va solo con he/she/it. My cousins sono più persone (= they): have got.",
      'are': "Are got non esiste: per il possesso si usa have got."
    } },

  { id: 'hg_003', topic: 'have_got', difficulty: 1, type: 'mc', group: 'hg_questions',
    prompt: "___ you got a pen I can borrow?",
    options: ['Have', 'Has', 'Do', 'Are'],
    answers: ['Have'],
    it: "Hai una penna da prestarmi?",
    explanation: "Nella domanda con have got si inverte have con il soggetto: Have you got…?",
    notes: {
      'Has': "Has va con he/she/it. Con you serve Have.",
      'Do': "Con have got non si usa do: si dice Have you got…?",
      'Are': "Are got non esiste: la domanda è Have you got…?"
    } },

  { id: 'hg_004', topic: 'have_got', difficulty: 1, type: 'mc', group: 'hg_short_answers',
    prompt: "'Has Marco got a bike?' 'Yes, he ___.'",
    options: ['has', 'have', 'has got', 'does'],
    answers: ['has'],
    it: "«Marco ha una bici?» «Sì.»",
    explanation: "Nella risposta breve si ripete solo has (senza got): Yes, he has.",
    notes: {
      'have': "Con he si usa has, non have: Yes, he has.",
      'has got': "Nelle risposte brevi got non si ripete: Yes, he has.",
      'does': "La domanda usa has, quindi anche la risposta usa has: Yes, he has."
    } },

  { id: 'hg_005', topic: 'have_got', difficulty: 2, type: 'mc', group: 'hg_negative',
    prompt: "We ___ any homework tonight. Great!",
    options: ["haven't got", "hasn't got", "don't got", 'have got not'],
    answers: ["haven't got"],
    it: "Stasera non abbiamo compiti. Grande!",
    explanation: "Negativa di have got con we: haven't got (have not got).",
    notes: {
      "hasn't got": "Hasn't got va con he/she/it. Con we serve haven't got.",
      "don't got": "Don't got non esiste: con have got la negativa è haven't got.",
      'have got not': "Not va subito dopo have: haven't got (have not got)."
    } },

  { id: 'hg_006', topic: 'have_got', difficulty: 2, type: 'gap', group: 'hg_has_have',
    prompt: "Our school ___ (have got) a new swimming pool.",
    answers: ['has got'],
    it: "La nostra scuola ha una piscina nuova.",
    explanation: "Our school = it (una cosa), quindi have got diventa has got.",
    notes: {
      'have got': "Our school = it: con he/she/it si usa has got.",
      'have': "Our school = it: serve has, e qui va scritto anche got: has got.",
      'has': "Giusto has! Ma qui devi usare la forma completa: has got."
    } },

  { id: 'hg_007', topic: 'have_got', difficulty: 2, type: 'gap', group: 'hg_negative',
    prompt: "Sorry, I ___ (have got / not) any money with me.",
    answers: ["haven't got", "don't have"],
    it: "Scusa, non ho soldi con me.",
    explanation: "Con I la negativa di have got è haven't got (have not got).",
    notes: {
      "hasn't got": "Hasn't got va con he/she/it. Con I serve haven't got.",
      "don't have got": "Non si mescolano do e have got: I haven't got (oppure I don't have).",
      "haven't": "Ricorda got: I haven't got any money."
    } },

  { id: 'hg_008', topic: 'have_got', difficulty: 2, type: 'order', group: 'hg_questions',
    prompt: "Riordina le parole per formare una domanda.",
    answers: ['Has your best friend got a smartphone?'],
    it: "Il tuo migliore amico ha uno smartphone?",
    explanation: "Domanda con have got: Has + soggetto (your best friend) + got + oggetto." },

  { id: 'hg_009', topic: 'have_got', difficulty: 2, type: 'transform', group: 'hg_questions',
    instruction: "Volgi alla forma interrogativa.",
    prompt: "She has got a cat.",
    answers: ['Has she got a cat?', 'Does she have a cat?'],
    it: "Ha un gatto?",
    explanation: "Con have got si inverte solo has e il soggetto: Has she got a cat?",
    notes: {
      'Does she has got a cat?': "Con have got non si usa does: basta invertire, Has she got a cat?",
      'Does she have got a cat?': "Non si mescolano does e have got: Has she got a cat?",
      'She has got a cat?': "In inglese per fare la domanda bisogna invertire: Has she got a cat?",
      'Have she got a cat?': "Con she si usa has: Has she got a cat?"
    } },

  { id: 'hg_010', topic: 'have_got', difficulty: 2, type: 'transform', group: 'hg_negative',
    instruction: "Volgi alla forma negativa.",
    prompt: "My dad has got a motorbike.",
    answers: ["My dad hasn't got a motorbike.", "My dad doesn't have a motorbike."],
    it: "Mio papà non ha una moto.",
    explanation: "Negativa di has got: hasn't got (has not got).",
    notes: {
      "My dad doesn't has got a motorbike.": "Con have got non si usa doesn't: My dad hasn't got a motorbike.",
      "My dad haven't got a motorbike.": "My dad = he: serve hasn't got, non haven't got.",
      "My dad has got not a motorbike.": "Not va subito dopo has: hasn't got."
    } },

  { id: 'hg_011', topic: 'have_got', difficulty: 2, type: 'mc', group: 'hg_be_vs_have',
    prompt: "My grandmother ___ seventy-five, but she still goes swimming every day.",
    options: ['is', 'has got', 'has', 'have'],
    answers: ['is'],
    it: "Mia nonna ha settantacinque anni, ma va ancora a nuotare tutti i giorni.",
    explanation: "Have got si usa per le cose che possiedi, non per l'età: l'età si dice con to be, She is seventy-five.",
    notes: {
      'has got': "Have got non si usa per l'età: in inglese l'età si dice con to be, she is seventy-five.",
      'has': "In italiano «ha 75 anni», ma in inglese si usa to be: she is seventy-five.",
      'have': "L'età si dice con to be (she is), e comunque con she non si usa have."
    } },

  { id: 'hg_012', topic: 'have_got', difficulty: 3, type: 'error', group: 'hg_questions',
    prompt: "Does your sister has got a laptop?",
    wrong: 'Does your sister has got',
    answers: ['Has your sister got a laptop?', 'Does your sister have a laptop?'],
    it: "Tua sorella ha un portatile?",
    explanation: "Con have got la domanda si fa invertendo has e il soggetto, senza does: Has your sister got a laptop?",
    notes: {
      'Does your sister have got a laptop?': "Non si mescolano does e have got: Has your sister got a laptop?",
      'Has your sister a laptop?': "Ti manca got: Has your sister got a laptop?",
      'Have your sister got a laptop?': "Your sister = she: serve Has."
    } },

  { id: 'hg_013', topic: 'have_got', difficulty: 3, type: 'error', group: 'hg_has_have',
    prompt: "Paolo have got two older brothers.",
    wrong: 'have got',
    answers: ['Paolo has got two older brothers.', "Paolo's got two older brothers.", 'Paolo has two older brothers.'],
    it: "Paolo ha due fratelli più grandi.",
    explanation: "Paolo = he, e con he/she/it si usa has got, non have got.",
    notes: {
      'Paolo have got two older brother.': "Il verbo va corretto in has got, e brother deve restare al plurale: two older brothers."
    } },

  { id: 'hg_014', topic: 'have_got', difficulty: 3, type: 'translate', group: 'hg_be_vs_have',
    prompt: "Mia sorella ha dodici anni.",
    answers: ['My sister is twelve.', 'My sister is 12.', 'My sister is twelve years old.', 'My sister is 12 years old.'],
    explanation: "Attenzione: anche se in italiano c'è «ha», l'età si dice con to be, non con have got: My sister is twelve.",
    notes: {
      'My sister has got twelve years.': "Have got si usa per le cose che possiedi, non per l'età: My sister is twelve.",
      'My sister has twelve years.': "Calco dall'italiano: l'età si dice con to be, My sister is twelve.",
      'My sister has 12 years.': "Calco dall'italiano: l'età si dice con to be, My sister is 12.",
      'My sister is twelve years.': "Se usi years aggiungi anche old: twelve years old. Oppure solo: is twelve."
    } },

  { id: 'hg_015', topic: 'have_got', difficulty: 3, type: 'gap', group: 'hg_short_answers',
    prompt: "'Have your parents got a car?' 'No, they ___.'",
    answers: ["haven't"],
    it: "«I tuoi genitori hanno la macchina?» «No.»",
    explanation: "Risposta breve negativa con have got: No, they haven't (senza got).",
    notes: {
      "haven't got": "Nelle risposte brevi got non si ripete: No, they haven't.",
      "don't": "La domanda usa have, quindi anche la risposta: No, they haven't.",
      "hasn't": "They è plurale: si usa haven't, non hasn't.",
      'not': "Serve anche il verbo: No, they haven't."
    } },

  { id: 'hg_016', topic: 'have_got', difficulty: 3, type: 'translate', group: 'hg_has_have',
    prompt: "Mio cugino ha un cane nero.",
    answers: ['My cousin has got a black dog.', 'My cousin has a black dog.'],
    explanation: "My cousin = he, quindi has got. L'aggettivo (black) va prima del nome: a black dog.",
    notes: {
      'My cousin have got a black dog.': "Con my cousin (= he) si usa has got, non have got.",
      'My cousin has got a dog black.': "In inglese l'aggettivo va prima del nome: a black dog.",
      'My cousin is got a black dog.': "Is got non esiste: si dice has got."
    } },

  /* ===================== PLURALS ===================== */
  { id: 'pl_001', topic: 'plurals', difficulty: 1, type: 'mc', group: 'pl_spelling',
    prompt: "We take two ___ to get to school.",
    options: ['buses', 'buss', 'bus', 'busies'],
    answers: ['buses'],
    it: "Prendiamo due autobus per andare a scuola.",
    explanation: "I nomi che finiscono in -s aggiungono -es al plurale: bus → buses.",
    notes: {
      'buss': "Dopo -s non basta aggiungere un'altra s: si aggiunge -es, buses.",
      'bus': "In italiano «autobus» non cambia, ma in inglese il plurale si fa: two buses.",
      'busies': "La -ies serve solo per le parole in consonante + y (city → cities). Bus → buses."
    } },

  { id: 'pl_002', topic: 'plurals', difficulty: 1, type: 'mc', group: 'pl_irregular',
    prompt: "Look! Three ___ are playing football in the park.",
    options: ['children', 'childs', 'childrens', 'child'],
    answers: ['children'],
    it: "Guarda! Tre bambini stanno giocando a calcio nel parco.",
    explanation: "Child ha un plurale irregolare: child → children.",
    notes: {
      'childs': "Child è irregolare: il plurale è children, senza -s.",
      'childrens': "Children è già plurale: non serve aggiungere la -s.",
      'child': "Dopo three serve il plurale: children."
    } },

  { id: 'pl_003', topic: 'plurals', difficulty: 1, type: 'mc', group: 'pl_adj_invariable',
    prompt: "My uncle has got two ___.",
    options: ['red cars', 'reds cars', 'reds car', 'red car'],
    answers: ['red cars'],
    it: "Mio zio ha due macchine rosse.",
    explanation: "In inglese gli aggettivi non hanno il plurale: prende la -s solo il nome. Red cars.",
    notes: {
      'reds cars': "In italiano «rosse» è plurale, ma in inglese l'aggettivo non cambia mai: red cars.",
      'reds car': "Al contrario! La -s va sul nome (cars), non sull'aggettivo (red).",
      'red car': "Dopo two il nome va al plurale: red cars."
    } },

  { id: 'pl_004', topic: 'plurals', difficulty: 1, type: 'mc', group: 'pl_people_agreement',
    prompt: "The people in my town ___ very friendly.",
    options: ['are', 'is', 'am'],
    answers: ['are'],
    it: "La gente della mia città è molto simpatica.",
    explanation: "People è il plurale di person, quindi vuole il verbo al plurale: people are.",
    notes: {
      'is': "In italiano «la gente è», ma in inglese people è plurale: people are.",
      'am': "Am va solo con I. People è plurale: people are."
    } },

  { id: 'pl_005', topic: 'plurals', difficulty: 1, type: 'mc', group: 'pl_spelling_y',
    prompt: "New York and Los Angeles are big American ___.",
    options: ['cities', 'citys', 'city', 'cityes'],
    answers: ['cities'],
    it: "New York e Los Angeles sono grandi città americane.",
    explanation: "Consonante + y al plurale diventa -ies: city → cities.",
    notes: {
      'citys': "Prima della y c'è una consonante (t): la y diventa -ies, cities.",
      'city': "Sono due città: serve il plurale, cities.",
      'cityes': "La y si trasforma in i: cities, non cityes."
    } },

  { id: 'pl_006', topic: 'plurals', difficulty: 2, type: 'gap', group: 'pl_spelling_y',
    prompt: "My little brother got lots of ___ (toy) for his birthday.",
    answers: ['toys'],
    it: "Il mio fratellino ha ricevuto tanti giocattoli per il compleanno.",
    explanation: "Vocale + y aggiunge solo -s: toy → toys (la y resta perché prima c'è la vocale o).",
    notes: {
      'toies': "La regola -ies vale solo dopo una consonante. Prima della y di toy c'è una vocale (o): toys.",
      'toyes': "Basta aggiungere -s: toys.",
      'toy': "Lots of vuole il plurale: toys."
    } },

  { id: 'pl_007', topic: 'plurals', difficulty: 2, type: 'gap', group: 'pl_irregular',
    prompt: "I brush my ___ (tooth) twice a day.",
    answers: ['teeth'],
    it: "Mi lavo i denti due volte al giorno.",
    explanation: "Tooth ha un plurale irregolare: tooth → teeth (come foot → feet).",
    notes: {
      'tooths': "Tooth è irregolare: il plurale è teeth.",
      'teeths': "Teeth è già plurale: niente -s in più.",
      'tooth': "Ti lavi tutti i denti: serve il plurale, teeth."
    } },

  { id: 'pl_008', topic: 'plurals', difficulty: 2, type: 'gap', group: 'pl_spelling',
    prompt: "Can you wash the ___ (dish) after dinner, please?",
    answers: ['dishes'],
    it: "Puoi lavare i piatti dopo cena, per favore?",
    explanation: "Le parole in -sh prendono -es al plurale: dish → dishes.",
    notes: {
      'dishs': "Dopo -sh si aggiunge -es (si sente una sillaba in più): dishes.",
      'dish': "I piatti sono tanti: serve il plurale, dishes."
    } },

  { id: 'pl_009', topic: 'plurals', difficulty: 2, type: 'gap', group: 'pl_spelling',
    prompt: "It's autumn: there are ___ (leaf) everywhere in the garden.",
    answers: ['leaves'],
    it: "È autunno: ci sono foglie dappertutto in giardino.",
    explanation: "Molte parole in -f/-fe al plurale cambiano in -ves: leaf → leaves.",
    notes: {
      'leafs': "Leaf è una delle parole in -f che cambiano in -ves: leaves.",
      'leafes': "La f diventa v: leaves.",
      'leaf': "There are vuole il plurale: leaves."
    } },

  { id: 'pl_010', topic: 'plurals', difficulty: 2, type: 'transform', group: 'pl_adj_invariable',
    instruction: "Riscrivi la frase mettendo three al posto di an.",
    prompt: "I've got an old guitar.",
    answers: ["I've got three old guitars."],
    it: "Ho tre chitarre vecchie.",
    explanation: "Al plurale prende la -s solo il nome (guitars); l'aggettivo old resta uguale.",
    notes: {
      "I've got three olds guitars.": "Gli aggettivi inglesi non hanno il plurale: three old guitars.",
      "I've got three old guitar.": "Dopo three il nome va al plurale: guitars.",
      "I've got three an old guitars.": "An si usa solo al singolare: togli an, three old guitars."
    } },

  { id: 'pl_011', topic: 'plurals', difficulty: 2, type: 'order', group: 'pl_people_agreement',
    prompt: "Riordina le parole per formare una frase.",
    answers: ['Those people are my new neighbours.'],
    it: "Quelle persone sono i miei nuovi vicini.",
    explanation: "People è plurale: vuole those (non that) e are (non is)." },

  { id: 'pl_012', topic: 'plurals', difficulty: 3, type: 'error', group: 'pl_people_agreement',
    prompt: "The people in this photo is my cousins.",
    wrong: 'is',
    answers: ['The people in this photo are my cousins.'],
    it: "Le persone in questa foto sono i miei cugini.",
    explanation: "People è plurale (una persona = person, più persone = people): quindi people are.",
    notes: {
      'The peoples in this photo are my cousins.': "People è già plurale, senza -s: The people… are."
    } },

  { id: 'pl_013', topic: 'plurals', difficulty: 3, type: 'error', group: 'pl_irregular',
    prompt: "My feets are cold after the football match.",
    wrong: 'feets',
    answers: ['My feet are cold after the football match.'],
    it: "Ho i piedi freddi dopo la partita di calcio.",
    explanation: "Foot ha il plurale irregolare feet, che è già plurale: niente -s.",
    notes: {
      'My foots are cold after the football match.': "Foot è irregolare: il plurale è feet."
    } },

  { id: 'pl_014', topic: 'plurals', difficulty: 3, type: 'translate', group: 'pl_irregular',
    prompt: "Ci sono due topi in cucina!",
    answers: ['There are two mice in the kitchen!', 'There are 2 mice in the kitchen!'],
    explanation: "Mouse ha il plurale irregolare: mouse → mice. «Ci sono» = there are.",
    notes: {
      'There are two mouses in the kitchen!': "Mouse è irregolare: il plurale è mice.",
      'There are two mouse in the kitchen!': "Dopo two serve il plurale, che è irregolare: mice.",
      'There is two mice in the kitchen!': "Con un plurale si usa there are, non there is."
    } },

  { id: 'pl_015', topic: 'plurals', difficulty: 3, type: 'translate', group: 'pl_adj_invariable',
    prompt: "Ho delle scarpe nuove.",
    answers: ['I have got some new shoes.', 'I have got new shoes.', 'I have some new shoes.', 'I have new shoes.'],
    explanation: "L'aggettivo new non prende la -s al plurale: new shoes. Solo il nome va al plurale.",
    notes: {
      'I have got some news shoes.': "Gli aggettivi inglesi non hanno il plurale: new shoes (news vuol dire «notizie»!).",
      'I have got news shoes.': "Gli aggettivi inglesi non hanno il plurale: new shoes.",
      'I have got some new shoe.': "Le scarpe sono più di una: shoes."
    } },

  { id: 'pl_016', topic: 'plurals', difficulty: 3, type: 'gap', group: 'pl_spelling',
    prompt: "We've only got one knife, but we need four ___ to cut the pizzas.",
    answers: ['knives'],
    it: "Abbiamo un solo coltello, ma ce ne servono quattro per tagliare le pizze.",
    explanation: "Knife finisce in -fe: al plurale diventa -ves, knives.",
    notes: {
      'knifes': "Knife è una delle parole in -fe che cambiano in -ves: knives.",
      'knife': "Dopo four serve il plurale: knives."
    } },

  /* ===================== ARTICLES A / AN ===================== */
  { id: 'art_001', topic: 'articles_a_an', difficulty: 1, type: 'mc', group: 'art_basic',
    prompt: "My brother wants ___ for his birthday.",
    options: ['an electric guitar', 'a electric guitar', 'electric guitar'],
    answers: ['an electric guitar'],
    it: "Mio fratello vuole una chitarra elettrica per il compleanno.",
    explanation: "Si usa an davanti a un suono vocalico: electric comincia con la vocale e, quindi an electric guitar.",
    notes: {
      'a electric guitar': "Conta la parola che viene subito dopo l'articolo: electric comincia con una vocale, quindi an.",
      'electric guitar': "Con un nome singolare numerabile serve l'articolo: an electric guitar."
    } },

  { id: 'art_002', topic: 'articles_a_an', difficulty: 1, type: 'mc', group: 'art_basic',
    prompt: "We've got ___ this year. She's from Scotland.",
    options: ['a new teacher', 'an new teacher', 'new teacher'],
    answers: ['a new teacher'],
    it: "Quest'anno abbiamo una nuova insegnante. È scozzese.",
    explanation: "New comincia con un suono consonantico (n), quindi a new teacher.",
    notes: {
      'an new teacher': "An si usa solo davanti a un suono vocalico. New comincia con n: a new teacher.",
      'new teacher': "Con un nome singolare serve l'articolo: a new teacher."
    } },

  { id: 'art_003', topic: 'articles_a_an', difficulty: 1, type: 'mc', group: 'art_jobs',
    prompt: "My mum is ___. She works at the hospital.",
    options: ['a nurse', 'nurse', 'an nurse'],
    answers: ['a nurse'],
    it: "Mia mamma è infermiera. Lavora in ospedale.",
    explanation: "Con le professioni l'inglese vuole l'articolo: She is a nurse (in italiano «è infermiera», senza articolo).",
    notes: {
      'nurse': "In italiano diciamo «è infermiera», ma in inglese con i mestieri serve a/an: a nurse.",
      'an nurse': "Nurse comincia con un suono consonantico (n): a nurse."
    } },

  { id: 'art_004', topic: 'articles_a_an', difficulty: 1, type: 'mc', group: 'art_basic',
    prompt: "Can I have ___ orange, please?",
    options: ['an', 'a'],
    answers: ['an'],
    it: "Posso avere un'arancia, per favore?",
    explanation: "Orange comincia con un suono vocalico (o), quindi an orange.",
    notes: {
      'a': "Davanti a un suono vocalico (a, e, i, o, u) si usa an: an orange."
    } },

  { id: 'art_005', topic: 'articles_a_an', difficulty: 2, type: 'mc', group: 'art_sound',
    prompt: "Wait for me! I'll be ready in half ___ hour.",
    options: ['an', 'a'],
    answers: ['an'],
    it: "Aspettami! Sarò pronto tra mezz'ora.",
    explanation: "Conta il suono, non la lettera: in hour la h non si pronuncia, la parola inizia con un suono vocalico, quindi an hour.",
    notes: {
      'a': "La h di hour è muta (si pronuncia «auer»): il suono è vocalico, quindi an hour."
    } },

  { id: 'art_006', topic: 'articles_a_an', difficulty: 2, type: 'mc', group: 'art_sound',
    prompt: "My cousin studies at ___ university in London.",
    options: ['a', 'an'],
    answers: ['a'],
    it: "Mio cugino studia in un'università di Londra.",
    explanation: "University si pronuncia «iuniversiti»: comincia con un suono consonantico (iu), quindi a university.",
    notes: {
      'an': "Anche se la u è una vocale, si pronuncia «iu», che è un suono consonantico: a university."
    } },

  { id: 'art_007', topic: 'articles_a_an', difficulty: 2, type: 'gap', group: 'art_sound',
    instruction: "Completa con a o an.",
    prompt: "At my new school we have to wear ___ uniform.",
    answers: ['a'],
    it: "Nella mia nuova scuola dobbiamo indossare una divisa.",
    explanation: "Uniform si pronuncia «iuniform»: suono consonantico, quindi a uniform.",
    notes: {
      'an': "Conta il suono, non la lettera: uniform si pronuncia «iu…», quindi a uniform."
    } },

  { id: 'art_008', topic: 'articles_a_an', difficulty: 2, type: 'gap', group: 'art_sound',
    instruction: "Completa con a o an.",
    prompt: "My uncle never lies. He's ___ honest man.",
    answers: ['an'],
    it: "Mio zio non dice mai bugie. È un uomo onesto.",
    explanation: "In honest la h non si pronuncia («onest»): il suono è vocalico, quindi an honest man.",
    notes: {
      'a': "La h di honest è muta: la parola comincia con il suono o, quindi an."
    } },

  { id: 'art_009', topic: 'articles_a_an', difficulty: 2, type: 'order', group: 'art_jobs',
    prompt: "Riordina le parole per formare una frase.",
    answers: ['My father is an engineer.'],
    it: "Mio padre è ingegnere.",
    explanation: "Con i mestieri serve l'articolo, e engineer comincia con un suono vocalico: an engineer." },

  { id: 'art_010', topic: 'articles_a_an', difficulty: 2, type: 'transform', group: 'art_singular_only',
    instruction: "Volgi la frase al singolare.",
    prompt: "These are old photos.",
    answers: ['This is an old photo.'],
    it: "Questa è una vecchia foto.",
    explanation: "Al singolare serve l'articolo, e old comincia con un suono vocalico: an old photo.",
    notes: {
      'This is a old photo.': "Conta la parola subito dopo l'articolo: old comincia con una vocale, quindi an.",
      'This is old photo.': "Al singolare il nome numerabile vuole l'articolo: an old photo.",
      'This is an old photos.': "Al singolare anche il nome perde la -s: photo."
    } },

  { id: 'art_011', topic: 'articles_a_an', difficulty: 2, type: 'mc', group: 'art_singular_only',
    prompt: "I've got ___ in my school bag.",
    options: ['three books', 'a books', 'an books', 'book'],
    answers: ['three books'],
    it: "Ho tre libri nello zaino.",
    explanation: "A/an significa «uno/una», quindi si usa solo con nomi singolari. Con il plurale si usa un numero, some o niente.",
    notes: {
      'a books': "A vuol dire «un/uno»: non può stare davanti a un plurale come books.",
      'an books': "An si usa solo al singolare (e davanti a suono vocalico): non con books.",
      'book': "Un nome singolare numerabile non può stare da solo: serve a book (o un plurale)."
    } },

  { id: 'art_012', topic: 'articles_a_an', difficulty: 3, type: 'error', group: 'art_jobs',
    prompt: "My sister wants to be actress when she grows up.",
    wrong: 'be actress',
    answers: ['My sister wants to be an actress when she grows up.'],
    it: "Mia sorella vuole fare l'attrice da grande.",
    explanation: "Con i mestieri serve l'articolo, e actress comincia con un suono vocalico: an actress.",
    notes: {
      'My sister wants to be a actress when she grows up.': "Giusto mettere l'articolo! Ma actress comincia con una vocale: an actress.",
      'My sister wants to be the actress when she grows up.': "Con i mestieri si usa a/an, non the: an actress."
    } },

  { id: 'art_013', topic: 'articles_a_an', difficulty: 3, type: 'translate', group: 'art_jobs',
    prompt: "Mio zio è architetto.",
    answers: ['My uncle is an architect.', 'My uncle works as an architect.'],
    explanation: "In italiano con i mestieri non si mette l'articolo, in inglese sì; architect comincia con vocale: an architect.",
    notes: {
      'My uncle is architect.': "In inglese con i mestieri serve l'articolo: an architect.",
      'My uncle is a architect.': "Architect comincia con un suono vocalico: an architect.",
      'My uncle is the architect.': "Per dire che lavoro fa si usa a/an: an architect."
    } },

  { id: 'art_014', topic: 'articles_a_an', difficulty: 3, type: 'error', group: 'art_sound',
    prompt: "Hurry up! The match starts in a hour.",
    wrong: 'a hour',
    answers: ['Hurry up! The match starts in an hour.'],
    it: "Sbrigati! La partita inizia tra un'ora.",
    explanation: "La h di hour non si pronuncia: il suono è vocalico, quindi an hour."
  },

  { id: 'art_015', topic: 'articles_a_an', difficulty: 3, type: 'error', group: 'art_singular_only',
    prompt: "I've got a new trainers for the gym.",
    wrong: 'a new trainers',
    answers: ["I've got new trainers for the gym.", "I've got some new trainers for the gym.", "I've got a new pair of trainers for the gym."],
    it: "Ho delle scarpe da ginnastica nuove per la palestra.",
    explanation: "A/an si usa solo con nomi singolari. Trainers è plurale: si toglie a (oppure si usa some).",
    notes: {
      "I've got a new trainer for the gym.": "Così cambia il senso: trainer (singolare) è l'allenatore! Togli a: new trainers."
    } },

  { id: 'art_016', topic: 'articles_a_an', difficulty: 3, type: 'translate', group: 'art_basic',
    prompt: "Ho un'idea!",
    answers: ['I have an idea!', 'I have got an idea!'],
    explanation: "Idea comincia con un suono vocalico (i), quindi an idea.",
    notes: {
      'I have a idea!': "Davanti a un suono vocalico si usa an: an idea.",
      'I have got a idea!': "Davanti a un suono vocalico si usa an: an idea.",
      'I have idea!': "Con un nome singolare serve l'articolo: an idea."
    } },

  /* ===================== PRONOUNS ===================== */
  { id: 'pron_001', topic: 'pronouns', difficulty: 1, type: 'mc', group: 'pron_subject_object',
    prompt: "Where is Sara? I can't see ___.",
    options: ['her', 'she', 'him'],
    answers: ['her'],
    it: "Dov'è Sara? Non la vedo.",
    explanation: "Dopo il verbo (see) serve il pronome complemento. Sara è una ragazza: her.",
    notes: {
      'she': "She è soggetto e va prima del verbo. Dopo see serve il complemento: her.",
      'him': "Him è per un maschio. Sara è una ragazza: her."
    } },

  { id: 'pron_002', topic: 'pronouns', difficulty: 1, type: 'mc', group: 'pron_subject_object',
    prompt: "Tom and I are best friends. ___ play basketball together.",
    options: ['We', 'Us', 'They'],
    answers: ['We'],
    it: "Tom e io siamo migliori amici. Giochiamo a basket insieme.",
    explanation: "Tom and I = noi, e prima del verbo serve il pronome soggetto: we.",
    notes: {
      'Us': "Us è complemento (dopo il verbo). Prima del verbo serve il soggetto: we.",
      'They': "Tom and I comprende anche me: quindi «noi», we."
    } },

  { id: 'pron_003', topic: 'pronouns', difficulty: 1, type: 'mc', group: 'pron_after_prep',
    prompt: "Is this present for ___? Oh, thank you!",
    options: ['me', 'I', 'my'],
    answers: ['me'],
    it: "Questo regalo è per me? Oh, grazie!",
    explanation: "Dopo una preposizione (for, with, to…) si usa il pronome complemento: for me.",
    notes: {
      'I': "I è soggetto. Dopo for serve il complemento: for me.",
      'my': "My è un possessivo e vuole un nome dopo (my bag). Qui serve me."
    } },

  { id: 'pron_004', topic: 'pronouns', difficulty: 1, type: 'mc', group: 'pron_it_them',
    prompt: "I love these trainers. I want to buy ___.",
    options: ['them', 'it', 'they'],
    answers: ['them'],
    it: "Adoro queste scarpe da ginnastica. Le voglio comprare.",
    explanation: "Trainers è plurale, e dopo il verbo serve il complemento plurale: them.",
    notes: {
      'it': "It è singolare. These trainers è plurale: them.",
      'they': "They è soggetto. Dopo il verbo buy serve il complemento: them."
    } },

  { id: 'pron_005', topic: 'pronouns', difficulty: 2, type: 'mc', group: 'pron_after_prep',
    prompt: "We've got an extra ticket. Do you want to come to the cinema with ___?",
    options: ['us', 'we', 'our'],
    answers: ['us'],
    it: "Abbiamo un biglietto in più. Vuoi venire al cinema con noi?",
    explanation: "Dopo la preposizione with si usa il pronome complemento: with us.",
    notes: {
      'we': "We è soggetto. Dopo with serve il complemento: us.",
      'our': "Our è un possessivo (our house). Qui serve il pronome complemento us."
    } },

  { id: 'pron_006', topic: 'pronouns', difficulty: 2, type: 'gap', group: 'pron_subject_object',
    prompt: "My grandparents live in Sicily. I visit ___ (they) every summer.",
    answers: ['them'],
    it: "I miei nonni vivono in Sicilia. Vado a trovarli ogni estate.",
    explanation: "Dopo il verbo visit serve il pronome complemento: they → them.",
    notes: {
      'they': "They è soggetto. Dopo il verbo serve la forma complemento: them.",
      'their': "Their è un possessivo (their house). Qui serve them."
    } },

  { id: 'pron_007', topic: 'pronouns', difficulty: 2, type: 'gap', group: 'pron_subject_object',
    prompt: "Our maths teacher is great. Everybody likes ___ (he).",
    answers: ['him'],
    it: "Il nostro professore di matematica è fantastico. Piace a tutti.",
    explanation: "Dopo il verbo likes serve il pronome complemento: he → him.",
    notes: {
      'he': "He è soggetto. Dopo il verbo serve la forma complemento: him.",
      'his': "His è un possessivo (his car). Qui serve him."
    } },

  { id: 'pron_008', topic: 'pronouns', difficulty: 2, type: 'order', group: 'pron_word_order',
    prompt: "Riordina le parole per formare una domanda.",
    answers: ['Can you help me with my homework?'],
    it: "Mi puoi aiutare con i compiti?",
    explanation: "Il pronome complemento va dopo il verbo: help me (in italiano invece «mi aiuti» lo mette prima)." },

  { id: 'pron_009', topic: 'pronouns', difficulty: 2, type: 'transform', group: 'pron_after_prep',
    instruction: "Sostituisci my sister con un pronome.",
    prompt: "I often play tennis with my sister.",
    answers: ['I often play tennis with her.'],
    it: "Gioco spesso a tennis con lei.",
    explanation: "Dopo with serve il pronome complemento; my sister è femminile: with her.",
    notes: {
      'I often play tennis with she.': "She è soggetto. Dopo with serve il complemento: her.",
      'I often play tennis with him.': "My sister è femminile: her, non him.",
      'I often play tennis with his.': "His vuol dire «suo (di lui)». Qui serve il pronome complemento femminile: her."
    } },

  { id: 'pron_010', topic: 'pronouns', difficulty: 2, type: 'transform', group: 'pron_it_them',
    instruction: "Sostituisci this video game con un pronome.",
    prompt: "Marco plays this video game every day.",
    answers: ['Marco plays it every day.'],
    it: "Marco ci gioca tutti i giorni.",
    explanation: "Per una cosa singolare si usa it, che va dopo il verbo: plays it.",
    notes: {
      'Marco it plays every day.': "In inglese il complemento va dopo il verbo: plays it.",
      'Marco plays him every day.': "Him è per una persona maschio. Per una cosa si usa it.",
      'Marco plays them every day.': "This video game è singolare: it."
    } },

  { id: 'pron_011', topic: 'pronouns', difficulty: 2, type: 'mc', group: 'pron_no_omit',
    prompt: "'Where's Luca?' '___ at the park with his friends.'",
    options: ["He's", 'Is', 'His', 'Him'],
    answers: ["He's"],
    it: "«Dov'è Luca?» «È al parco con i suoi amici.»",
    explanation: "In inglese il soggetto non si omette mai: «è al parco» = He is (He's) at the park.",
    notes: {
      'Is': "Manca il soggetto: in italiano si può dire «è al parco», in inglese serve He's.",
      'His': "His è un possessivo («suo»). Serve He's = He is.",
      'Him': "Him è complemento e qui manca anche il verbo: He's (He is)."
    } },

  { id: 'pron_012', topic: 'pronouns', difficulty: 3, type: 'error', group: 'pron_no_omit',
    prompt: "I don't like this film because is boring.",
    wrong: 'because is',
    answers: ["I don't like this film because it is boring."],
    it: "Non mi piace questo film perché è noioso.",
    explanation: "In inglese il soggetto va sempre espresso: because it is (it's) boring.",
    notes: {
      "I don't like this film because he is boring.": "Per una cosa (il film) si usa it, non he."
    } },

  { id: 'pron_013', topic: 'pronouns', difficulty: 3, type: 'error', group: 'pron_word_order',
    prompt: "I him know very well.",
    wrong: 'I him know',
    answers: ['I know him very well.'],
    it: "Lo conosco molto bene.",
    explanation: "Il pronome complemento va dopo il verbo: I know him (in italiano «lo conosco» lo mette prima).",
    notes: {
      'I know he very well.': "Dopo il verbo serve il complemento: him, non he."
    } },

  { id: 'pron_014', topic: 'pronouns', difficulty: 3, type: 'translate', group: 'pron_word_order',
    prompt: "Lei mi aiuta con i compiti.",
    answers: ['She helps me with my homework.', 'She helps me with the homework.', 'She helps me with homework.'],
    explanation: "Soggetto she + verbo + complemento me: She helps me. Il complemento va dopo il verbo.",
    notes: {
      'She me helps with my homework.': "Il complemento va dopo il verbo: She helps me.",
      'She helps I with my homework.': "Dopo il verbo serve il complemento: me, non I.",
      'Helps me with my homework.': "Manca il soggetto: in inglese serve sempre, She helps me.",
      'She help me with my homework.': "Con she il verbo prende la -s: helps."
    } },

  { id: 'pron_015', topic: 'pronouns', difficulty: 3, type: 'translate', group: 'pron_after_prep',
    prompt: "Vieni con noi?",
    answers: ['Are you coming with us?', 'Do you want to come with us?', 'Will you come with us?'],
    explanation: "Dopo la preposizione with serve il pronome complemento: with us.",
    notes: {
      'Are you coming with we?': "We è soggetto. Dopo with serve il complemento: us.",
      'Are you coming with our?': "Our è un possessivo. Dopo with serve il pronome complemento: us.",
      'You come with us?': "Nelle domande in inglese serve l'ausiliare: Are you coming with us?"
    } },

  { id: 'pron_016', topic: 'pronouns', difficulty: 3, type: 'gap', group: 'pron_it_them',
    prompt: "I can't find my keys. Have you seen ___?",
    answers: ['them'],
    it: "Non trovo le chiavi. Le hai viste?",
    explanation: "Keys è plurale e sta dopo il verbo: serve il complemento plurale them.",
    notes: {
      'it': "It è singolare, ma keys è plurale: them.",
      'they': "They è soggetto. Dopo il verbo serve il complemento: them.",
      'their': "Their è un possessivo. Qui serve il pronome complemento: them."
    } },

  /* ===================== POSSESSIVES ===================== */
  { id: 'poss_001', topic: 'possessives', difficulty: 1, type: 'mc', group: 'poss_his_her',
    prompt: "Anna has got a brother. ___ brother is called Luca.",
    options: ['Her', 'His', 'She', 'Its'],
    answers: ['Her'],
    it: "Anna ha un fratello. Suo fratello si chiama Luca.",
    explanation: "Il possessivo dipende da chi possiede, non dalla cosa posseduta: il fratello è di Anna (lei), quindi her brother.",
    notes: {
      'His': "Attenzione all'italiano «suo»: in inglese conta chi possiede. Il fratello è di Anna (femmina): her.",
      'She': "She è un pronome soggetto. Per dire «di lei» davanti a un nome serve her.",
      'Its': "Its si usa per cose e animali. Anna è una persona femmina: her."
    } },

  { id: 'poss_002', topic: 'possessives', difficulty: 1, type: 'mc', group: 'poss_his_her',
    prompt: "Luca loves football. ___ favourite team is Juventus.",
    options: ['His', 'Her', 'He'],
    answers: ['His'],
    it: "Luca adora il calcio. La sua squadra preferita è la Juventus.",
    explanation: "La squadra è di Luca (maschio), quindi his, anche se team in italiano è femminile («la sua squadra»).",
    notes: {
      'Her': "In italiano «la sua squadra» è femminile, ma in inglese conta chi possiede: Luca è maschio, quindi his.",
      'He': "He è un pronome soggetto. Davanti a un nome serve il possessivo his."
    } },

  { id: 'poss_003', topic: 'possessives', difficulty: 1, type: 'mc', group: 'poss_its_their',
    prompt: "The twins are excited because it's ___ birthday today.",
    options: ['their', 'there', 'they', 'his'],
    answers: ['their'],
    it: "I gemelli sono emozionati perché oggi è il loro compleanno.",
    explanation: "Il compleanno è dei gemelli (loro): their.",
    notes: {
      'there': "There si pronuncia come their, ma vuol dire «là / ci» (there is). «Loro» si scrive their.",
      'they': "They è un pronome soggetto. Davanti a un nome serve il possessivo their.",
      'his': "His vuol dire «di lui» (uno solo). I gemelli sono due: their."
    } },

  { id: 'poss_004', topic: 'possessives', difficulty: 1, type: 'mc', group: 'poss_saxon',
    prompt: "This is ___. It's a red mountain bike.",
    options: ["Tom's bike", 'the bike of Tom', 'Tom bike', "bike's Tom"],
    answers: ["Tom's bike"],
    it: "Questa è la bici di Tom. È una mountain bike rossa.",
    explanation: "Per dire di chi è una cosa si usa il genitivo sassone: possessore + 's + cosa, Tom's bike.",
    notes: {
      'the bike of Tom': "È un calco dall'italiano «la bici di Tom»: in inglese con le persone si dice Tom's bike.",
      'Tom bike': "Manca 's: Tom's bike.",
      "bike's Tom": "L'ordine è al contrario: prima chi possiede + 's, poi la cosa. Tom's bike."
    } },

  { id: 'poss_005', topic: 'possessives', difficulty: 1, type: 'mc', group: 'poss_no_article',
    prompt: "Where's ___? I can't find it anywhere!",
    options: ['my phone', 'the my phone', 'phone my', 'me phone'],
    answers: ['my phone'],
    it: "Dov'è il mio telefono? Non lo trovo da nessuna parte!",
    explanation: "In inglese davanti al possessivo non si mette l'articolo: my phone (non «the my phone»).",
    notes: {
      'the my phone': "In italiano diciamo «il mio telefono», ma in inglese l'articolo sparisce: my phone.",
      'phone my': "Il possessivo va prima del nome: my phone.",
      'me phone': "Me è un pronome complemento. Il possessivo è my: my phone."
    } },

  { id: 'poss_006', topic: 'possessives', difficulty: 2, type: 'mc', group: 'poss_its_their',
    prompt: "I love this game. ___ graphics are amazing!",
    options: ['Its', "It's", 'His'],
    answers: ['Its'],
    it: "Adoro questo gioco. La sua grafica è fantastica!",
    explanation: "Per una cosa (il gioco) il possessivo è its, senza apostrofo.",
    notes: {
      "It's": "It's con l'apostrofo vuol dire it is. Il possessivo «suo (di una cosa)» è its, senza apostrofo.",
      'His': "His è per una persona maschio. Il gioco è una cosa: its."
    } },

  { id: 'poss_007', topic: 'possessives', difficulty: 2, type: 'gap', group: 'poss_saxon_plural',
    prompt: "My ___ (parents) car is red.",
    answers: ["parents'"],
    it: "La macchina dei miei genitori è rossa.",
    explanation: "Con un plurale che finisce già in -s si aggiunge solo l'apostrofo: parents'.",
    notes: {
      "parent's": "Così è la macchina di un solo genitore. Sono due (parents), quindi l'apostrofo va dopo la s: parents'.",
      "parents's": "Se il plurale finisce già in -s basta l'apostrofo: parents'.",
      'parents': "Serve l'apostrofo del genitivo sassone: parents'."
    } },

  { id: 'poss_008', topic: 'possessives', difficulty: 2, type: 'gap', group: 'poss_saxon_plural',
    prompt: "The ___ (children) toys are all over the floor.",
    answers: ["children's"],
    it: "I giocattoli dei bambini sono sparsi sul pavimento.",
    explanation: "Children è un plurale irregolare (senza -s), quindi prende 's come un singolare: children's.",
    notes: {
      "childrens'": "Children non finisce in -s: si aggiunge 's, children's.",
      'childrens': "Children è già plurale e serve l'apostrofo: children's.",
      'children': "Serve il genitivo sassone: children's."
    } },

  { id: 'poss_009', topic: 'possessives', difficulty: 2, type: 'gap', group: 'poss_his_her',
    prompt: "My dad can't find ___ (he) glasses.",
    answers: ['his'],
    it: "Mio papà non trova i suoi occhiali.",
    explanation: "Gli occhiali sono del papà (lui): il possessivo di he è his.",
    notes: {
      'he': "He è il pronome soggetto. Davanti a un nome serve il possessivo: his.",
      'him': "Him è complemento. Davanti a un nome serve il possessivo: his.",
      'her': "Her è «di lei». Il papà è maschio: his.",
      'their': "Their vuol dire «loro». Gli occhiali sono solo del papà: his."
    } },

  { id: 'poss_010', topic: 'possessives', difficulty: 2, type: 'order', group: 'poss_saxon',
    prompt: "Riordina le parole per formare una frase.",
    answers: ["This is my brother's room."],
    it: "Questa è la camera di mio fratello.",
    explanation: "Genitivo sassone: chi possiede (my brother) + 's + la cosa posseduta (room)." },

  { id: 'poss_011', topic: 'possessives', difficulty: 2, type: 'transform', group: 'poss_saxon',
    instruction: "Riscrivi la frase usando il genitivo sassone ('s).",
    prompt: "The phone of Giulia is broken.",
    answers: ["Giulia's phone is broken."],
    it: "Il telefono di Giulia è rotto.",
    explanation: "Al posto di «the phone of Giulia» si dice Giulia's phone: possessore + 's + cosa, senza the.",
    notes: {
      "The Giulia's phone is broken.": "Davanti al genitivo sassone non si mette the: Giulia's phone.",
      'Giulia phone is broken.': "Manca 's: Giulia's phone.",
      "Phone's Giulia is broken.": "Prima chi possiede, poi la cosa: Giulia's phone."
    } },

  { id: 'poss_012', topic: 'possessives', difficulty: 3, type: 'error', group: 'poss_his_her',
    prompt: "Giulia has lost his phone, so she can't call me.",
    wrong: 'his',
    answers: ["Giulia has lost her phone, so she can't call me."],
    it: "Giulia ha perso il suo telefono, quindi non può chiamarmi.",
    explanation: "Il telefono è di Giulia (femmina), quindi her phone. In inglese il possessivo segue chi possiede.",
    notes: {
      "Giulia has lost its phone, so she can't call me.": "Its è per cose e animali. Giulia è una ragazza: her."
    } },

  { id: 'poss_013', topic: 'possessives', difficulty: 3, type: 'error', group: 'poss_no_article',
    prompt: "The my favourite subject is history.",
    wrong: 'The my',
    answers: ['My favourite subject is history.'],
    it: "La mia materia preferita è storia.",
    explanation: "In inglese non si mette l'articolo davanti al possessivo: my favourite subject (non «the my»)."
  },

  { id: 'poss_014', topic: 'possessives', difficulty: 3, type: 'translate', group: 'poss_his_her',
    prompt: "Luca è con sua sorella.",
    answers: ['Luca is with his sister.', "Luca's with his sister."],
    explanation: "«Sua» si traduce in base a chi possiede: la sorella è di Luca (maschio), quindi his sister.",
    notes: {
      'Luca is with her sister.': "In italiano «sua» è femminile perché sorella è femminile, ma in inglese conta Luca (maschio): his sister.",
      'Luca is with the his sister.': "Niente articolo davanti al possessivo: his sister.",
      'Luca is with he sister.': "He è un pronome soggetto: il possessivo è his."
    } },

  { id: 'poss_015', topic: 'possessives', difficulty: 3, type: 'translate', group: 'poss_saxon',
    prompt: "La macchina di mio zio è nuova.",
    answers: ["My uncle's car is new."],
    explanation: "Con le persone si usa il genitivo sassone: my uncle's car (chi possiede + 's + cosa).",
    notes: {
      'The car of my uncle is new.': "È un calco dall'italiano: con le persone si usa 's, My uncle's car is new.",
      'My uncle car is new.': "Manca 's: My uncle's car.",
      "The my uncle's car is new.": "Niente the davanti al genitivo sassone: My uncle's car."
    } },

  { id: 'poss_016', topic: 'possessives', difficulty: 3, type: 'gap', group: 'poss_its_their',
    prompt: "Mr and Mrs Bianchi have got two sons. ___ sons are both at university.",
    answers: ['Their'],
    it: "Il signore e la signora Bianchi hanno due figli. I loro figli sono entrambi all'università.",
    explanation: "I figli sono di Mr e Mrs Bianchi (loro), quindi their sons.",
    notes: {
      'There': "There suona uguale ma vuol dire «là / ci». «Loro» si scrive their.",
      "They're": "They're vuol dire they are. Il possessivo «loro» è their.",
      'His': "I genitori sono due persone: «loro» = their.",
      'They': "They è un pronome soggetto. Davanti a un nome serve il possessivo their."
    } }

], 'grammar-a1');
