EC.addItems([

  /* ===================== THERE IS / THERE ARE ===================== */

  { id: "there_001", topic: "there_is", difficulty: 1, type: "mc", group: "there_sing_plur",
    prompt: "___ a big park near my school.",
    options: ["There is", "There are", "Is there"],
    answers: ["There is"],
    explanation: "“A big park” è singolare, quindi si usa there is (= c'è).",
    notes: {
      "There are": "There are (= ci sono) si usa con i nomi plurali; “a park” è uno solo.",
      "Is there": "Is there serve per fare una domanda; qui la frase è affermativa e finisce con il punto."
    },
    it: "C'è un grande parco vicino alla mia scuola." },

  { id: "there_002", topic: "there_is", difficulty: 1, type: "mc", group: "there_sing_plur",
    prompt: "___ twenty-five students in my class.",
    options: ["There is", "There are", "It is", "Are there"],
    answers: ["There are"],
    explanation: "“Twenty-five students” è plurale, quindi si usa there are (= ci sono).",
    notes: {
      "There is": "There is si usa con un nome singolare; gli studenti sono tanti, quindi there are.",
      "It is": "“Ci sono” non si traduce con it is: in inglese si dice there are.",
      "Are there": "Are there si usa nelle domande; qui la frase è affermativa."
    },
    it: "Ci sono venticinque studenti nella mia classe." },

  { id: "there_003", topic: "there_is", difficulty: 1, type: "mc", group: "there_negative",
    prompt: "There ___ any milk in the fridge.",
    options: ["isn't", "aren't", "not is", "no is"],
    answers: ["isn't"],
    explanation: "Milk (latte) non si conta, quindi si comporta come un singolare: there isn't any milk.",
    notes: {
      "aren't": "Aren't va con i nomi plurali; milk è non numerabile e vuole il singolare: isn't.",
      "not is": "In inglese not va DOPO is: is not / isn't, non “not is” come in italiano “non è”.",
      "no is": "La negazione di is è is not (isn't), non “no is”."
    },
    it: "Non c'è latte nel frigo." },

  { id: "there_004", topic: "there_is", difficulty: 1, type: "mc", group: "there_question",
    prompt: "___ a swimming pool in your town?",
    options: ["Is there", "Are there", "There are"],
    answers: ["Is there"],
    explanation: "Nelle domande si inverte l'ordine: Is there + nome singolare? (= C'è…?).",
    notes: {
      "Are there": "Are there va con i nomi plurali; “a swimming pool” è singolare.",
      "There are": "There are è affermativo e plurale: per una domanda con un nome singolare serve Is there."
    },
    it: "C'è una piscina nella tua città?" },

  { id: "there_005", topic: "there_is", difficulty: 2, type: "gap", group: "there_sing_plur",
    prompt: "There ___ (be) three bedrooms in our flat.",
    answers: ["are"],
    explanation: "“Three bedrooms” è plurale, quindi there are.",
    notes: {
      "is": "Is va con un nome singolare: le camere sono tre, quindi are.",
      "be": "Il verbo va coniugato: there are."
    },
    it: "Ci sono tre camere da letto nel nostro appartamento." },

  { id: "there_006", topic: "there_is", difficulty: 2, type: "mc", group: "there_sing_plur",
    prompt: "There ___ some bread on the kitchen table.",
    options: ["is", "are", "be", "have"],
    answers: ["is"],
    explanation: "Bread (pane) è non numerabile: anche con some si usa il singolare, there is.",
    notes: {
      "are": "Attenzione: bread non ha plurale, quindi si usa is anche se c'è some.",
      "be": "Be è la forma base: va coniugato (is).",
      "have": "“C'è” si dice there is, non con have."
    },
    it: "C'è del pane sul tavolo della cucina." },

  { id: "there_007", topic: "there_is", difficulty: 2, type: "transform", group: "there_negative",
    instruction: "Volgi alla forma negativa.",
    prompt: "There are some posters on the wall.",
    answers: ["There aren't any posters on the wall.", "There are no posters on the wall."],
    explanation: "Negativa con un plurale: there aren't + any (oppure there are no). Nelle negative some diventa any.",
    notes: {
      "There aren't some posters on the wall.": "Nelle frasi negative some diventa any: there aren't any posters.",
      "There isn't any posters on the wall.": "Posters è plurale: serve aren't, non isn't.",
      "There aren't no posters on the wall.": "In inglese basta una negazione: there aren't any oppure there are no."
    },
    it: "Non ci sono poster sul muro." },

  { id: "there_008", topic: "there_is", difficulty: 2, type: "gap", group: "there_negative",
    prompt: "There ___ (not / be) any good shops near my house.",
    answers: ["aren't"],
    explanation: "Shops è plurale, quindi la negativa è there aren't (any).",
    notes: {
      "isn't": "Isn't va con un singolare; shops è plurale: aren't.",
      "not are": "Not va dopo il verbo: are not / aren't."
    },
    it: "Non ci sono bei negozi vicino a casa mia." },

  { id: "there_009", topic: "there_is", difficulty: 2, type: "order", group: "there_question",
    prompt: "Riordina le parole per formare una domanda.",
    answers: ["Are there any shops near your school?"],
    explanation: "Domanda con un plurale: Are there + any + nome plurale?",
    it: "Ci sono negozi vicino alla tua scuola?" },

  { id: "there_010", topic: "there_is", difficulty: 2, type: "mc", group: "there_question",
    prompt: "Is there a bus to the stadium? — Yes, ___.",
    options: ["there is", "it is", "is there", "there are"],
    answers: ["there is"],
    explanation: "Risposta breve: Yes, there is. / No, there isn't. Si riprende there + is (e nella risposta breve affermativa non si contrae: NON “Yes, there's”).",
    notes: {
      "it is": "La domanda era con there, quindi anche la risposta: Yes, there is.",
      "is there": "Questo è l'ordine della domanda; nella risposta si torna a there is.",
      "there are": "La domanda è al singolare (Is there a bus?), quindi anche la risposta: Yes, there is."
    },
    it: "C'è un autobus per lo stadio? — Sì, c'è." },

  { id: "there_011", topic: "there_is", difficulty: 2, type: "transform", group: "there_question",
    instruction: "Trasforma la frase in una domanda.",
    prompt: "There is a cinema in your town.",
    answers: ["Is there a cinema in your town?"],
    explanation: "Per la domanda si scambia l'ordine: Is there…?",
    notes: {
      "There is a cinema in your town?": "Per fare la domanda bisogna invertire: Is there a cinema…?",
      "Is it a cinema in your town?": "“C'è” si dice there is, quindi la domanda è Is there…?",
      "Are there a cinema in your town?": "Cinema è singolare: Is there, non Are there."
    },
    it: "C'è un cinema nella tua città?" },

  { id: "there_012", topic: "there_is", difficulty: 3, type: "error", group: "there_vs_it",
    prompt: "In my town it is a big football stadium.",
    wrong: "it is",
    answers: ["In my town there is a big football stadium."],
    explanation: "“C'è” si traduce con there is, non con it is: In my town there is a big stadium.",
    notes: {
      "In my town there are a big football stadium.": "Lo stadio è uno solo: there is, non there are."
    },
    it: "Nella mia città c'è un grande stadio di calcio." },

  { id: "there_013", topic: "there_is", difficulty: 3, type: "translate", group: "there_vs_it",
    prompt: "C'è un ragazzo nuovo nella mia classe.",
    answers: ["There is a new boy in my class.", "There is a new student in my class.", "There is a new kid in my class."],
    explanation: "“C'è” + nome singolare = there is. L'aggettivo va prima del nome: a new boy.",
    notes: {
      "It is a new boy in my class.": "“C'è” non si traduce con it is: si dice there is.",
      "Is there a new boy in my class.": "Is there è l'ordine della domanda; nella frase affermativa si dice there is.",
      "There is a boy new in my class.": "In inglese l'aggettivo va prima del nome: a new boy."
    } },

  { id: "there_014", topic: "there_is", difficulty: 3, type: "translate", group: "there_vs_it",
    prompt: "Ci sono due gatti in giardino.",
    answers: ["There are two cats in the garden.", "There are 2 cats in the garden."],
    explanation: "“Ci sono” + nome plurale = there are.",
    notes: {
      "There is two cats in the garden.": "I gatti sono due (plurale): there are.",
      "They are two cats in the garden.": "“Ci sono” si dice there are, non they are (= loro sono).",
      "It is two cats in the garden.": "“Ci sono” si dice there are, non it is."
    } },

  { id: "there_015", topic: "there_is", difficulty: 3, type: "error", group: "there_sing_plur",
    prompt: "There are a bottle of water in my bag.",
    wrong: "are",
    answers: ["There is a bottle of water in my bag."],
    explanation: "Il nome principale è “a bottle” (una bottiglia), singolare: there is.",
    it: "C'è una bottiglia d'acqua nella mia borsa." },

  { id: "there_016", topic: "there_is", difficulty: 3, type: "translate", group: "there_negative",
    prompt: "Non c'è una palestra nella mia scuola.",
    answers: ["There isn't a gym in my school.", "There is no gym in my school.", "There isn't a gym at my school.", "There is no gym at my school.", "My school doesn't have a gym.", "My school hasn't got a gym."],
    explanation: "“Non c'è” = there isn't (a) oppure there is no. Basta una sola negazione.",
    notes: {
      "There aren't a gym in my school.": "La palestra è una sola: there isn't, non there aren't.",
      "It isn't a gym in my school.": "“Non c'è” si dice there isn't, non it isn't.",
      "There isn't no gym in my school.": "In inglese basta una negazione: there isn't a gym oppure there is no gym.",
      "There isn't gym in my school.": "Con un nome singolare numerabile serve l'articolo: there isn't a gym."
    } },

  /* ===================== PRESENT SIMPLE ===================== */

  { id: "ps_001", topic: "present_simple", difficulty: 1, type: "mc", group: "ps_3rd_person_s",
    prompt: "My brother ___ football every Saturday.",
    options: ["play", "plays", "playing", "is play"],
    answers: ["plays"],
    explanation: "My brother = he: con he/she/it il present simple aggiunge -s al verbo: plays.",
    notes: {
      "play": "Manca la -s: con la terza persona singolare (my brother = he) il verbo prende la -s.",
      "playing": "La forma -ing da sola non è un tempo verbale; per un'abitudine (every Saturday) si usa il present simple.",
      "is play": "Non si mette is davanti a un verbo al present simple: si dice he plays."
    },
    it: "Mio fratello gioca a calcio ogni sabato." },

  { id: "ps_002", topic: "present_simple", difficulty: 1, type: "mc", group: "ps_3rd_person_s",
    prompt: "I ___ to school by bus.",
    options: ["go", "goes", "going", "am go"],
    answers: ["go"],
    explanation: "Con I (e anche con you, we, they) il verbo resta alla forma base: I go. La -s si aggiunge solo con he/she/it.",
    notes: {
      "goes": "Goes è solo per he/she/it; con I si dice go.",
      "going": "La forma -ing da sola non è un tempo verbale: per un'abitudine si dice I go.",
      "am go": "Non si mette am davanti a un verbo al present simple: I go."
    },
    it: "Vado a scuola in autobus." },

  { id: "ps_003", topic: "present_simple", difficulty: 1, type: "mc", group: "ps_spelling",
    prompt: "Luca ___ his homework after dinner.",
    options: ["do", "does", "dos", "doing"],
    answers: ["does"],
    explanation: "Luca = he. I verbi che finiscono in -o aggiungono -es: do → does, go → goes.",
    notes: {
      "do": "Manca la desinenza della terza persona: Luca (he) does.",
      "dos": "Dopo -o si aggiunge -es, non solo -s: does.",
      "doing": "La forma -ing da sola non è un tempo verbale; per un'abitudine si usa il present simple: he does."
    },
    it: "Luca fa i compiti dopo cena." },

  { id: "ps_004", topic: "present_simple", difficulty: 1, type: "mc", group: "ps_negative",
    prompt: "We ___ have school on Sundays.",
    options: ["don't", "doesn't", "not", "aren't"],
    answers: ["don't"],
    explanation: "Negativa del present simple con I/you/we/they: don't + verbo base.",
    notes: {
      "doesn't": "Doesn't si usa solo con he/she/it; con we serve don't.",
      "not": "Non basta not come in italiano (“non abbiamo”): serve l'ausiliare, we don't have.",
      "aren't": "Aren't è la negativa di be; con un verbo come have serve don't."
    },
    it: "La domenica non abbiamo scuola." },

  { id: "ps_005", topic: "present_simple", difficulty: 1, type: "mc", group: "ps_question",
    prompt: "___ your parents speak English?",
    options: ["Do", "Does", "Are", "Is"],
    answers: ["Do"],
    explanation: "Your parents = they (plurale): la domanda si fa con Do + soggetto + verbo base.",
    notes: {
      "Does": "Does si usa con he/she/it; your parents sono più persone (they): Do.",
      "Are": "Are è il verbo be; con un altro verbo (speak) la domanda si fa con do.",
      "Is": "Is è il verbo be ed è singolare; qui serve Do."
    },
    it: "I tuoi genitori parlano inglese?" },

  { id: "ps_006", topic: "present_simple", difficulty: 2, type: "gap", group: "ps_spelling",
    prompt: "He ___ (watch) videos on YouTube every evening.",
    answers: ["watches"],
    explanation: "Con he/she/it i verbi che finiscono in -ch aggiungono -es: watch → watches.",
    notes: {
      "watchs": "Dopo -ch si aggiunge -es, non solo -s: watches.",
      "watch": "Manca la desinenza della terza persona: he watches."
    },
    it: "Lui guarda video su YouTube ogni sera." },

  { id: "ps_007", topic: "present_simple", difficulty: 2, type: "gap", group: "ps_spelling",
    prompt: "My mum ___ (fly) to London for work every month.",
    answers: ["flies"],
    explanation: "Verbo che finisce in consonante + y: la y diventa -ies con he/she/it: fly → flies.",
    notes: {
      "flys": "Dopo una consonante la y diventa i: flies.",
      "fly": "Manca la desinenza della terza persona: my mum (she) flies."
    },
    it: "Mia mamma va a Londra in aereo per lavoro ogni mese." },

  { id: "ps_008", topic: "present_simple", difficulty: 2, type: "gap", group: "ps_3rd_person_s",
    prompt: "Our English teacher ___ (have) a red car.",
    answers: ["has"],
    explanation: "Have è irregolare: con he/she/it diventa has.",
    notes: {
      "haves": "Have alla terza persona è irregolare: has.",
      "have": "Con la terza persona singolare (our teacher = he/she) serve has."
    },
    it: "Il nostro insegnante di inglese ha una macchina rossa." },

  { id: "ps_009", topic: "present_simple", difficulty: 2, type: "mc", group: "ps_3rd_person_s",
    prompt: "Everybody in my class ___ a smartphone.",
    options: ["has", "have", "haves", "are having"],
    answers: ["has"],
    explanation: "Everybody (tutti) in inglese è singolare, come he/she: everybody has.",
    notes: {
      "have": "Anche se in italiano diciamo “tutti hanno”, everybody vuole il verbo al singolare: has.",
      "haves": "Have alla terza persona è irregolare: has, non haves.",
      "are having": "Per il possesso si usa il present simple, non la forma -ing; inoltre everybody è singolare."
    },
    it: "Tutti nella mia classe hanno uno smartphone." },

  { id: "ps_010", topic: "present_simple", difficulty: 2, type: "mc", group: "ps_question",
    prompt: "Does your sister ___ the piano?",
    options: ["play", "plays", "playing", "to play"],
    answers: ["play"],
    explanation: "Dopo does il verbo resta alla forma base: la -s della terza persona è già “dentro” does.",
    notes: {
      "plays": "Errore tipico: la -s non si mette due volte. Does + play, non does + plays.",
      "playing": "Dopo does serve la forma base del verbo: play.",
      "to play": "Dopo does non si mette to: Does your sister play…?"
    },
    it: "Tua sorella suona il pianoforte?" },

  { id: "ps_011", topic: "present_simple", difficulty: 2, type: "transform", group: "ps_negative",
    instruction: "Volgi alla forma negativa.",
    prompt: "My dad drives to work.",
    answers: ["My dad doesn't drive to work."],
    explanation: "Negativa con he/she/it: doesn't + verbo base (drive, senza -s).",
    notes: {
      "My dad doesn't drives to work.": "Dopo doesn't il verbo torna alla forma base: drive, non drives.",
      "My dad don't drive to work.": "Con he/she/it (my dad = he) si usa doesn't, non don't.",
      "My dad not drives to work.": "Non basta not come in italiano: serve doesn't + drive."
    },
    it: "Mio papà non va al lavoro in macchina." },

  { id: "ps_012", topic: "present_simple", difficulty: 2, type: "gap", group: "ps_negative",
    prompt: "She ___ (not / eat) meat.",
    answers: ["doesn't eat"],
    explanation: "Negativa con she: doesn't + verbo base: she doesn't eat.",
    notes: {
      "doesn't eats": "Dopo doesn't il verbo resta alla forma base: eat, senza -s.",
      "don't eat": "Con she si usa doesn't, non don't.",
      "not eats": "Serve l'ausiliare: she doesn't eat."
    },
    it: "Lei non mangia carne." },

  { id: "ps_013", topic: "present_simple", difficulty: 2, type: "order", group: "ps_question",
    prompt: "Riordina le parole per formare una domanda.",
    answers: ["Does your brother play video games?"],
    explanation: "Ordine della domanda: Does + soggetto + verbo base (play, senza -s).",
    it: "Tuo fratello gioca ai videogiochi?" },

  { id: "ps_014", topic: "present_simple", difficulty: 3, type: "error", group: "ps_question",
    prompt: "Does your cousin lives in Milan?",
    wrong: "lives",
    answers: ["Does your cousin live in Milan?"],
    explanation: "Dopo does il verbo resta alla forma base: la -s della terza persona è già in does.",
    it: "Tuo cugino abita a Milano?" },

  { id: "ps_015", topic: "present_simple", difficulty: 3, type: "error", group: "ps_negative",
    prompt: "My best friend don't like chocolate.",
    wrong: "don't",
    answers: ["My best friend doesn't like chocolate."],
    explanation: "My best friend = he/she, quindi la negativa è doesn't + verbo base.",
    notes: {
      "My best friend doesn't likes chocolate.": "Hai corretto don't, ma dopo doesn't il verbo resta like, senza -s."
    },
    it: "Il mio migliore amico non ama il cioccolato." },

  { id: "ps_016", topic: "present_simple", difficulty: 3, type: "error", group: "ps_3rd_person_s",
    prompt: "Giulia speak three languages.",
    wrong: "speak",
    answers: ["Giulia speaks three languages."],
    explanation: "Giulia = she: al present simple il verbo prende la -s: speaks.",
    it: "Giulia parla tre lingue." },

  { id: "ps_017", topic: "present_simple", difficulty: 3, type: "translate", group: "ps_negative",
    prompt: "Mio padre non beve caffè.",
    answers: ["My father doesn't drink coffee.", "My dad doesn't drink coffee."],
    explanation: "Negativa con he (my father): doesn't + verbo base drink.",
    notes: {
      "My father don't drink coffee.": "Con he/she/it si usa doesn't.",
      "My dad don't drink coffee.": "Con he/she/it si usa doesn't.",
      "My father doesn't drinks coffee.": "Dopo doesn't il verbo resta alla forma base: drink.",
      "My dad doesn't drinks coffee.": "Dopo doesn't il verbo resta alla forma base: drink.",
      "My father not drink coffee.": "Non basta not: serve l'ausiliare doesn't.",
      "My dad not drink coffee.": "Non basta not: serve l'ausiliare doesn't."
    } },

  { id: "ps_018", topic: "present_simple", difficulty: 3, type: "translate", group: "ps_question",
    prompt: "Tuo papà guarda il calcio in TV?",
    answers: ["Does your dad watch football on TV?", "Does your father watch football on TV?", "Does your dad watch football on television?", "Does your father watch football on television?"],
    explanation: "Domanda con he: Does + soggetto + verbo base (watch, senza -es). In inglese serve l'ausiliare does, non basta il punto di domanda.",
    notes: {
      "Does your dad watches football on TV?": "La desinenza non si mette due volte: does + watch.",
      "Your dad watches football on TV?": "In italiano basta l'intonazione, in inglese la domanda vuole does: Does your dad watch…?",
      "Do your dad watch football on TV?": "Your dad = he, quindi Does, non Do.",
      "Does your dad watch the football on TV?": "Per lo sport in generale non si mette l'articolo: watch football."
    } },

  { id: "ps_019", topic: "present_simple", difficulty: 3, type: "transform", group: "ps_spelling",
    instruction: "Riscrivi la frase usando He al posto di I.",
    prompt: "I watch TV, do my homework and go to bed at ten.",
    answers: ["He watches TV, does his homework and goes to bed at ten.", "He watches TV, does his homework and goes to bed at 10."],
    explanation: "Con he: watch → watches (-ch + es), do → does, go → goes (-o + es). E my diventa his.",
    notes: {
      "He watchs TV, dos his homework and gos to bed at ten.": "Dopo -ch e -o si aggiunge -es: watches, does, goes.",
      "He watch TV, do his homework and go to bed at ten.": "Con he tutti i verbi prendono la desinenza: watches, does, goes.",
      "He watches TV, does my homework and goes to bed at ten.": "Verbi giusti! Ma i compiti sono suoi: his homework."
    },
    it: "Lui guarda la TV, fa i compiti e va a letto alle dieci." },

  { id: "ps_020", topic: "present_simple", difficulty: 3, type: "gap", group: "ps_question",
    prompt: "___ your best friend live near you?",
    answers: ["Does"],
    explanation: "Your best friend = he/she: la domanda al present simple si fa con Does + soggetto + verbo base.",
    notes: {
      "Do": "Do va con I/you/we/they; your best friend è una persona sola (he/she): Does.",
      "Is": "Is è il verbo be; con il verbo live la domanda si fa con does."
    },
    it: "Il tuo migliore amico abita vicino a te?" },

  /* ===================== FREQUENCY ADVERBS ===================== */

  { id: "freq_001", topic: "freq_adverbs", difficulty: 1, type: "mc", group: "freq_before_verb",
    prompt: "Quale frase è corretta?",
    options: ["I often play tennis on Saturdays.", "I play often tennis on Saturdays.", "Often play I tennis on Saturdays."],
    answers: ["I often play tennis on Saturdays."],
    explanation: "Gli avverbi di frequenza vanno PRIMA del verbo principale: I often play.",
    notes: {
      "I play often tennis on Saturdays.": "In italiano diciamo “gioco spesso”, ma in inglese l'avverbio va prima del verbo: I often play.",
      "Often play I tennis on Saturdays.": "L'ordine è soggetto + avverbio + verbo: I often play."
    },
    it: "Gioco spesso a tennis il sabato." },

  { id: "freq_002", topic: "freq_adverbs", difficulty: 1, type: "mc", group: "freq_after_be",
    prompt: "My brother ___ late for school.",
    options: ["is always", "always", "always are"],
    answers: ["is always"],
    explanation: "Con il verbo be l'avverbio va DOPO: he is always late.",
    notes: {
      "always": "Manca il verbo: “essere in ritardo” = be late, quindi he is always late.",
      "always are": "Con be l'avverbio va dopo il verbo; inoltre my brother vuole is, non are."
    },
    it: "Mio fratello è sempre in ritardo a scuola." },

  { id: "freq_003", topic: "freq_adverbs", difficulty: 1, type: "mc", group: "freq_never_negative",
    prompt: "I ___ eat fish. I hate it!",
    options: ["never", "don't never", "not never", "am never"],
    answers: ["never"],
    explanation: "Never è già negativo: I never eat (= non mangio mai). Non serve don't.",
    notes: {
      "don't never": "In italiano diciamo “non… mai”, ma in inglese basta never: I never eat fish.",
      "not never": "Never ha già valore negativo: niente not.",
      "am never": "Con un verbo come eat non si usa am: I never eat."
    },
    it: "Non mangio mai il pesce. Lo odio!" },

  { id: "freq_004", topic: "freq_adverbs", difficulty: 1, type: "mc", group: "freq_meaning",
    prompt: "Tom plays video games every day. He ___ plays video games.",
    options: ["always", "never", "rarely", "sometimes"],
    answers: ["always"],
    explanation: "Every day (ogni giorno) = always (sempre).",
    notes: {
      "never": "Never = mai, ma Tom gioca ogni giorno.",
      "rarely": "Rarely = raramente, ma Tom gioca ogni giorno.",
      "sometimes": "Sometimes = qualche volta; ogni giorno è sempre: always."
    },
    it: "Tom gioca ai videogiochi ogni giorno. Gioca sempre ai videogiochi." },

  { id: "freq_005", topic: "freq_adverbs", difficulty: 2, type: "mc", group: "freq_meaning",
    prompt: "I eat pizza about twice a year. I ___ eat pizza.",
    options: ["always", "usually", "often", "hardly ever"],
    answers: ["hardly ever"],
    explanation: "Due volte all'anno è pochissimo: hardly ever (quasi mai).",
    notes: {
      "always": "Always = sempre; due volte all'anno è quasi mai.",
      "usually": "Usually = di solito, quasi sempre; qui la pizza è rarissima.",
      "often": "Often = spesso; due volte all'anno non è spesso."
    },
    it: "Mangio la pizza circa due volte all'anno. Non mangio quasi mai la pizza." },

  { id: "freq_006", topic: "freq_adverbs", difficulty: 2, type: "order", group: "freq_before_verb",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["My dad never watches football on TV."],
    explanation: "Never va prima del verbo principale: my dad never watches.",
    it: "Mio papà non guarda mai il calcio in TV." },

  { id: "freq_007", topic: "freq_adverbs", difficulty: 2, type: "order", group: "freq_after_be",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["Our teacher is never late for class."],
    explanation: "Con il verbo be l'avverbio va dopo: is never late.",
    it: "Il nostro insegnante non è mai in ritardo a lezione." },

  { id: "freq_008", topic: "freq_adverbs", difficulty: 2, type: "gap", group: "freq_before_verb",
    prompt: "I ___ (sometimes / walk) to school when it's sunny.",
    answers: ["sometimes walk"],
    explanation: "L'avverbio va prima del verbo principale: I sometimes walk.",
    notes: {
      "walk sometimes": "In inglese l'avverbio va prima del verbo: sometimes walk.",
      "sometimes walks": "Con I il verbo non prende la -s: I walk."
    },
    it: "Qualche volta vado a scuola a piedi quando c'è il sole." },

  { id: "freq_009", topic: "freq_adverbs", difficulty: 2, type: "gap", group: "freq_after_be",
    prompt: "My grandparents ___ (always / be) happy to see us.",
    answers: ["are always"],
    explanation: "Con be l'avverbio va dopo il verbo: they are always happy.",
    notes: {
      "always are": "Con il verbo be l'avverbio va dopo: are always.",
      "is always": "My grandparents è plurale (they): are."
    },
    it: "I miei nonni sono sempre felici di vederci." },

  { id: "freq_010", topic: "freq_adverbs", difficulty: 2, type: "transform", group: "freq_never_negative",
    instruction: "Riscrivi la frase usando never.",
    prompt: "I don't eat breakfast.",
    answers: ["I never eat breakfast."],
    explanation: "Never è già negativo, quindi don't sparisce: I never eat breakfast.",
    notes: {
      "I don't never eat breakfast.": "In inglese non si fa la doppia negazione: basta never.",
      "I never don't eat breakfast.": "Never ha già valore negativo: togli don't."
    },
    it: "Non faccio mai colazione." },

  { id: "freq_011", topic: "freq_adverbs", difficulty: 2, type: "mc", group: "freq_question",
    prompt: "Quale domanda è corretta?",
    options: ["Do you often play online games?", "Do often you play online games?", "Often do you play online games?", "You do often play online games?"],
    answers: ["Do you often play online games?"],
    explanation: "Nelle domande l'avverbio va dopo il soggetto e prima del verbo: Do you often play…?",
    notes: {
      "Do often you play online games?": "L'avverbio va dopo il soggetto: Do you often play.",
      "Often do you play online games?": "La domanda comincia con Do; l'avverbio va prima del verbo principale.",
      "You do often play online games?": "Nella domanda do va all'inizio, prima del soggetto."
    },
    it: "Giochi spesso ai giochi online?" },

  { id: "freq_012", topic: "freq_adverbs", difficulty: 3, type: "error", group: "freq_never_negative",
    prompt: "We don't never go to school on Sundays.",
    wrong: "don't never",
    answers: ["We never go to school on Sundays.", "We don't ever go to school on Sundays."],
    explanation: "Never è già negativo: in inglese non si usa la doppia negazione “don't never”. Si dice we never go (oppure we don't ever go).",
    it: "Non andiamo mai a scuola la domenica." },

  { id: "freq_013", topic: "freq_adverbs", difficulty: 3, type: "error", group: "freq_after_be",
    prompt: "My cat always is hungry.",
    wrong: "always is",
    answers: ["My cat is always hungry."],
    explanation: "Con il verbo be l'avverbio va dopo: is always.",
    it: "Il mio gatto ha sempre fame." },

  { id: "freq_014", topic: "freq_adverbs", difficulty: 3, type: "translate", group: "freq_before_verb",
    prompt: "Di solito gioco a calcio il sabato.",
    answers: ["I usually play football on Saturdays.", "I usually play football on Saturday.", "Usually I play football on Saturdays.", "Usually I play football on Saturday.", "On Saturdays I usually play football.", "On Saturday I usually play football.", "I normally play football on Saturdays.", "I normally play football on Saturday."],
    explanation: "Usually (di solito) va prima del verbo principale: I usually play. Con i giorni si usa on.",
    notes: {
      "I play usually football on Saturdays.": "L'avverbio va prima del verbo, non dopo: I usually play.",
      "I usually play football at Saturday.": "Con i giorni della settimana si usa on: on Saturdays.",
      "I usually play the football on Saturdays.": "Con gli sport non si usa l'articolo: play football."
    } },

  { id: "freq_015", topic: "freq_adverbs", difficulty: 3, type: "translate", group: "freq_never_negative",
    prompt: "Mia sorella non arriva mai in ritardo.",
    answers: ["My sister is never late.", "My sister never arrives late.", "My sister never comes late."],
    explanation: "“Non… mai” = never, senza don't/doesn't. Con be l'avverbio va dopo (is never late), con gli altri verbi prima (never arrives).",
    notes: {
      "My sister doesn't never arrive late.": "In inglese basta never: my sister never arrives late.",
      "My sister never is late.": "Con be l'avverbio va dopo: is never late.",
      "My sister never arrive late.": "Con she il verbo prende la -s: never arrives.",
      "My sister arrives never late.": "Never va prima del verbo principale: never arrives."
    } },

  { id: "freq_016", topic: "freq_adverbs", difficulty: 3, type: "translate", group: "freq_question",
    prompt: "Ogni quanto vai in piscina?",
    answers: ["How often do you go to the swimming pool?", "How often do you go to the pool?", "How often do you go swimming?"],
    explanation: "Per chiedere la frequenza si usa How often + do + soggetto + verbo.",
    notes: {
      "How often you go to the swimming pool?": "Non dimenticare l'ausiliare: How often DO you go…?",
      "How often do you go at the swimming pool?": "Con go si usa to: go to the pool.",
      "How many times do you go to the swimming pool?": "How many times si usa con un periodo (How many times a week…?); per chiedere la frequenza in generale si dice How often."
    } },

  /* ===================== CAN / CAN'T ===================== */

  { id: "can_001", topic: "can", difficulty: 1, type: "mc", group: "can_no_s",
    prompt: "My little brother ___ swim very well.",
    options: ["can", "cans", "can to", "is can"],
    answers: ["can"],
    explanation: "Can è uguale per tutte le persone: he can, she can, I can.",
    notes: {
      "cans": "Can non prende mai la -s, nemmeno con he/she/it.",
      "can to": "Dopo can non si mette to: can swim.",
      "is can": "Can non vuole is davanti: he can swim."
    },
    it: "Il mio fratellino sa nuotare molto bene." },

  { id: "can_002", topic: "can", difficulty: 1, type: "mc", group: "can_no_to",
    prompt: "I can ___ the guitar.",
    options: ["play", "to play", "playing", "plays"],
    answers: ["play"],
    explanation: "Dopo can si usa il verbo base, senza to: can play.",
    notes: {
      "to play": "Dopo can non si mette to: can play.",
      "playing": "Dopo can serve la forma base del verbo, non la forma -ing.",
      "plays": "Dopo can il verbo resta alla forma base, senza -s."
    },
    it: "So suonare la chitarra." },

  { id: "can_003", topic: "can", difficulty: 1, type: "mc", group: "can_question",
    prompt: "Quale domanda è corretta?",
    options: ["Can you ride a horse?", "Do you can ride a horse?", "Are you can ride a horse?", "Can you to ride a horse?"],
    answers: ["Can you ride a horse?"],
    explanation: "Nella domanda can va all'inizio, prima del soggetto: Can you…? Non serve do.",
    notes: {
      "Do you can ride a horse?": "Con can non si usa do: si inverte e basta, Can you ride…?",
      "Are you can ride a horse?": "Can non si usa con are: Can you ride…?",
      "Can you to ride a horse?": "Dopo can non si mette to."
    },
    it: "Sai andare a cavallo?" },

  { id: "can_004", topic: "can", difficulty: 1, type: "mc", group: "can_short_answer",
    prompt: "Can your dad cook? — Yes, he ___.",
    options: ["can", "cans", "does", "is"],
    answers: ["can"],
    explanation: "Risposta breve: si ripete can. Yes, he can. / No, he can't.",
    notes: {
      "cans": "Can non prende mai la -s.",
      "does": "La domanda è con can, quindi la risposta è con can: Yes, he can.",
      "is": "La domanda è con can, non con is: Yes, he can."
    },
    it: "Tuo papà sa cucinare? — Sì." },

  { id: "can_005", topic: "can", difficulty: 1, type: "mc", group: "can_negative",
    prompt: "Sorry, I ___ come to your party on Saturday.",
    options: ["can't", "don't can", "not can", "no can"],
    answers: ["can't"],
    explanation: "La negativa di can è can't (= cannot), uguale per tutti.",
    notes: {
      "don't can": "Can non usa do: la negativa è semplicemente can't.",
      "not can": "Not va dopo can: cannot / can't.",
      "no can": "In inglese la negazione è not (non no), e si unisce a can: can't / cannot."
    },
    it: "Scusa, non posso venire alla tua festa sabato." },

  { id: "can_006", topic: "can", difficulty: 2, type: "gap", group: "can_no_s",
    prompt: "Lucia ___ (can / speak) three languages.",
    answers: ["can speak"],
    explanation: "Can + verbo base, uguale anche con she: Lucia can speak.",
    notes: {
      "cans speak": "Can non prende la -s, nemmeno con she.",
      "can speaks": "Dopo can il verbo resta alla forma base: speak.",
      "can to speak": "Dopo can non si mette to."
    },
    it: "Lucia sa parlare tre lingue." },

  { id: "can_007", topic: "can", difficulty: 2, type: "transform", group: "can_negative",
    instruction: "Volgi alla forma negativa.",
    prompt: "My grandma can use a smartphone.",
    answers: ["My grandma can't use a smartphone."],
    explanation: "Per la negativa basta aggiungere not a can: can't (cannot) + verbo base.",
    notes: {
      "My grandma doesn't can use a smartphone.": "Can non usa do/does: la negativa è can't.",
      "My grandma can't uses a smartphone.": "Dopo can't il verbo resta alla forma base: use."
    },
    it: "Mia nonna non sa usare uno smartphone." },

  { id: "can_008", topic: "can", difficulty: 2, type: "transform", group: "can_question",
    instruction: "Trasforma la frase in una domanda.",
    prompt: "Your friends can come to the cinema.",
    answers: ["Can your friends come to the cinema?"],
    explanation: "Domanda: can va prima del soggetto. Can your friends come…?",
    notes: {
      "Do your friends can come to the cinema?": "Con can non si usa do: si mette can all'inizio.",
      "Your friends can come to the cinema?": "Per la domanda bisogna invertire: Can your friends come…?",
      "Can your friends to come to the cinema?": "Dopo can non si mette to."
    },
    it: "I tuoi amici possono venire al cinema?" },

  { id: "can_009", topic: "can", difficulty: 2, type: "order", group: "can_question",
    prompt: "Riordina le parole per chiedere un permesso.",
    answers: ["Can I borrow your pen, please?", "Please can I borrow your pen?", "Can I please borrow your pen?"],
    explanation: "Per chiedere un permesso: Can I + verbo base…? Please può andare all'inizio, in mezzo o alla fine.",
    it: "Posso prendere in prestito la tua penna, per favore?" },

  { id: "can_010", topic: "can", difficulty: 2, type: "gap", group: "can_short_answer",
    prompt: "Can you play chess? — No, I ___.",
    answers: ["can't"],
    explanation: "Risposta breve negativa a una domanda con can: No, I can't.",
    notes: {
      "don't": "La domanda è con can, quindi anche la risposta: No, I can't.",
      "can": "La risposta è no, quindi serve la negativa: can't.",
      "not": "Serve can + not: No, I can't."
    },
    it: "Sai giocare a scacchi? — No." },

  { id: "can_011", topic: "can", difficulty: 2, type: "mc", group: "can_no_to",
    prompt: "Quale frase è corretta?",
    options: ["We can't to go out tonight.", "We can't go out tonight.", "We don't can go out tonight.", "We can't going out tonight."],
    answers: ["We can't go out tonight."],
    explanation: "Can't + verbo base, senza to e senza do: we can't go.",
    notes: {
      "We can't to go out tonight.": "Dopo can/can't non si mette to.",
      "We don't can go out tonight.": "Can non usa do: la negativa è can't.",
      "We can't going out tonight.": "Dopo can't serve la forma base: go, non going."
    },
    it: "Stasera non possiamo uscire." },

  { id: "can_012", topic: "can", difficulty: 3, type: "error", group: "can_no_s",
    prompt: "He cans run 100 metres in 13 seconds.",
    wrong: "cans",
    answers: ["He can run 100 metres in 13 seconds."],
    explanation: "Can è uguale per tutte le persone: niente -s nemmeno con he.",
    notes: {
      "He can runs 100 metres in 13 seconds.": "Hai tolto la -s da can, ma l'hai messa al verbo: dopo can si usa run."
    },
    it: "Lui sa correre i 100 metri in 13 secondi." },

  { id: "can_013", topic: "can", difficulty: 3, type: "error", group: "can_question",
    prompt: "Do you can help me with my homework?",
    wrong: "Do you can",
    answers: ["Can you help me with my homework?"],
    explanation: "Con can la domanda non usa do: si mette can prima del soggetto. Can you help me…?",
    it: "Puoi aiutarmi con i compiti?" },

  { id: "can_014", topic: "can", difficulty: 3, type: "error", group: "can_no_to",
    prompt: "My best friend can to dance really well.",
    wrong: "can to",
    answers: ["My best friend can dance really well."],
    explanation: "Dopo can il verbo va alla forma base, senza to: can dance.",
    it: "La mia migliore amica sa ballare benissimo." },

  { id: "can_015", topic: "can", difficulty: 3, type: "translate", group: "can_negative",
    prompt: "Mio fratello non sa nuotare.",
    answers: ["My brother can't swim.", "My brother isn't able to swim.", "My brother doesn't know how to swim."],
    explanation: "“Saper fare qualcosa” (una capacità) si dice con can: he can't swim.",
    notes: {
      "My brother doesn't know swim.": "“Sapere” come capacità si dice can: my brother can't swim.",
      "My brother don't can swim.": "Can non usa do: la negativa è can't.",
      "My brother can't to swim.": "Dopo can't non si mette to.",
      "My brother not can swim.": "Not va dopo can: can't (cannot).",
      "My brother can't swims.": "Dopo can't il verbo resta alla forma base: swim."
    } },

  { id: "can_016", topic: "can", difficulty: 3, type: "translate", group: "can_question",
    prompt: "Posso usare il tuo telefono?",
    answers: ["Can I use your phone?", "Can I use your mobile?", "Can I use your mobile phone?", "Could I use your phone?", "May I use your phone?", "Can I use your smartphone?"],
    explanation: "Per chiedere un permesso: Can I + verbo base…? (Could I / May I sono più gentili).",
    notes: {
      "Do I can use your phone?": "Con can non si usa do: Can I use…?",
      "I can use your phone?": "In inglese la domanda vuole l'inversione: Can I use…?",
      "Can I to use your phone?": "Dopo can non si mette to."
    } },

  /* ===================== PREPOSITIONS OF TIME ===================== */

  { id: "pt_001", topic: "prep_time", difficulty: 1, type: "mc", group: "pt_at",
    prompt: "The film starts ___ eight o'clock.",
    options: ["at", "on", "in"],
    answers: ["at"],
    explanation: "Con gli orari si usa at: at eight o'clock.",
    notes: {
      "on": "On si usa con i giorni e le date; per l'ora si usa at.",
      "in": "In si usa con mesi, anni, stagioni; per l'ora si usa at."
    },
    it: "Il film comincia alle otto." },

  { id: "pt_002", topic: "prep_time", difficulty: 1, type: "mc", group: "pt_on",
    prompt: "We have PE ___ Monday.",
    options: ["on", "at", "in"],
    answers: ["on"],
    explanation: "Con i giorni della settimana si usa on: on Monday.",
    notes: {
      "at": "At si usa per gli orari; con i giorni serve on.",
      "in": "In si usa con mesi e stagioni; con i giorni serve on."
    },
    it: "Abbiamo educazione fisica il lunedì." },

  { id: "pt_003", topic: "prep_time", difficulty: 1, type: "mc", group: "pt_in",
    prompt: "My birthday is ___ March.",
    options: ["in", "on", "at"],
    answers: ["in"],
    explanation: "Con i mesi si usa in: in March.",
    notes: {
      "on": "On si usa con un giorno preciso (on 3rd March); con il mese da solo si usa in.",
      "at": "At si usa per gli orari; con i mesi si usa in."
    },
    it: "Il mio compleanno è a marzo." },

  { id: "pt_004", topic: "prep_time", difficulty: 1, type: "mc", group: "pt_parts_of_day",
    prompt: "I can't sleep ___ night when it's hot.",
    options: ["at", "in", "on"],
    answers: ["at"],
    explanation: "Si dice at night (di notte), mentre si dice in the morning / in the afternoon / in the evening.",
    notes: {
      "in": "Attenzione: in the morning, ma at night.",
      "on": "On si usa con i giorni; “di notte” si dice at night."
    },
    it: "Non riesco a dormire di notte quando fa caldo." },

  { id: "pt_005", topic: "prep_time", difficulty: 2, type: "gap", group: "pt_on",
    prompt: "Our summer holiday starts ___ 2nd August.",
    answers: ["on"],
    explanation: "Con le date (giorno + mese) si usa on: on 2nd August.",
    notes: {
      "in": "In August va bene per il mese intero, ma con il giorno preciso serve on.",
      "at": "At si usa per gli orari; con le date serve on."
    },
    it: "Le nostre vacanze estive cominciano il 2 agosto." },

  { id: "pt_006", topic: "prep_time", difficulty: 2, type: "gap", group: "pt_parts_of_day",
    prompt: "I usually do my homework ___ the afternoon.",
    answers: ["in"],
    explanation: "Con le parti del giorno si usa in the: in the morning, in the afternoon, in the evening.",
    notes: {
      "on": "On si usa con i giorni; con the afternoon si usa in.",
      "at": "At si usa con at night e con gli orari; si dice in the afternoon."
    },
    it: "Di solito faccio i compiti il pomeriggio." },

  { id: "pt_007", topic: "prep_time", difficulty: 2, type: "mc", group: "pt_at",
    prompt: "I meet my friends in the canteen ___ lunchtime.",
    options: ["at", "on", "in"],
    answers: ["at"],
    explanation: "Lunchtime è un momento preciso della giornata, come un orario: at lunchtime.",
    notes: {
      "on": "On si usa con i giorni e le date, non con lunchtime.",
      "in": "Si dice at lunchtime: è un momento preciso, come at eight o'clock."
    },
    it: "Vedo i miei amici in mensa all'ora di pranzo." },

  { id: "pt_008", topic: "prep_time", difficulty: 2, type: "mc", group: "pt_on",
    prompt: "We open our presents ___ Christmas Day.",
    options: ["on", "at", "in"],
    answers: ["on"],
    explanation: "Christmas Day è un giorno preciso, quindi on (ma at Christmas per il periodo natalizio).",
    notes: {
      "at": "At Christmas indica il periodo di Natale; con Christmas DAY (un giorno) si usa on.",
      "in": "In si usa con mesi e stagioni; con un giorno si usa on."
    },
    it: "Apriamo i regali il giorno di Natale." },

  { id: "pt_009", topic: "prep_time", difficulty: 2, type: "gap", group: "pt_in",
    prompt: "My little sister was born ___ 2015.",
    answers: ["in"],
    explanation: "Con gli anni si usa in: in 2015.",
    notes: {
      "on": "On si usa con giorni e date; con l'anno si usa in.",
      "at": "At si usa con gli orari; con l'anno si usa in."
    },
    it: "La mia sorellina è nata nel 2015." },

  { id: "pt_010", topic: "prep_time", difficulty: 2, type: "mc", group: "pt_parts_of_day",
    prompt: "Quale serie è corretta?",
    options: ["in the morning, in the afternoon, at night", "in the morning, in the afternoon, in the night", "at the morning, at the afternoon, at night", "on the morning, on the afternoon, on night"],
    answers: ["in the morning, in the afternoon, at night"],
    explanation: "In the morning, in the afternoon, in the evening… ma at night!",
    notes: {
      "in the morning, in the afternoon, in the night": "Attenzione all'eccezione: “di notte” si dice at night.",
      "at the morning, at the afternoon, at night": "Con morning e afternoon si usa in the.",
      "on the morning, on the afternoon, on night": "On si usa con i giorni, non con le parti della giornata da sole."
    } },

  { id: "pt_011", topic: "prep_time", difficulty: 2, type: "order", group: "pt_on",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["We have a test on Friday morning.", "On Friday morning we have a test."],
    explanation: "Quando c'è il giorno, si usa on anche con la parte della giornata: on Friday morning (non in Friday morning).",
    it: "Venerdì mattina abbiamo una verifica." },

  { id: "pt_012", topic: "prep_time", difficulty: 3, type: "error", group: "pt_parts_of_day",
    prompt: "I play video games with my friends in the night.",
    wrong: "in the night",
    answers: ["I play video games with my friends at night."],
    explanation: "“Di notte” si dice at night, anche se diciamo in the morning e in the evening.",
    it: "Gioco ai videogiochi con i miei amici di notte." },

  { id: "pt_013", topic: "prep_time", difficulty: 3, type: "error", group: "pt_on",
    prompt: "The concert is at Saturday evening.",
    wrong: "at",
    answers: ["The concert is on Saturday evening."],
    explanation: "Con i giorni (anche con la parte della giornata) si usa on: on Saturday evening.",
    notes: {
      "The concert is in Saturday evening.": "Si dice in the evening, ma quando c'è il giorno si usa on: on Saturday evening."
    },
    it: "Il concerto è sabato sera." },

  { id: "pt_014", topic: "prep_time", difficulty: 3, type: "translate", group: "pt_in",
    prompt: "Andiamo in vacanza ad agosto.",
    answers: ["We go on holiday in August.", "We are going on holiday in August.", "We go on vacation in August.", "We are going on vacation in August."],
    explanation: "Con i mesi si usa in: in August. Attenzione: in inglese i mesi si scrivono con la maiuscola, e “in vacanza” si dice on holiday.",
    notes: {
      "We go on holiday on August.": "Con il mese da solo si usa in: in August.",
      "We go on holiday at August.": "Con i mesi si usa in, non at.",
      "We go on holiday in the August.": "Con i mesi non si mette l'articolo: in August.",
      "We go in holiday in August.": "La preposizione del mese è giusta! Ma “in vacanza” si dice on holiday."
    } },

  { id: "pt_015", topic: "prep_time", difficulty: 3, type: "translate", group: "pt_at",
    prompt: "La lezione di inglese comincia alle nove.",
    answers: [
      "The English lesson starts at nine.", "The English lesson starts at 9.",
      "The English lesson starts at nine o'clock.", "The English lesson starts at 9 o'clock.",
      "The English lesson begins at nine.", "The English lesson begins at 9.",
      "The English lesson begins at nine o'clock.", "The English lesson begins at 9 o'clock.",
      "The English class starts at nine.", "The English class starts at 9.",
      "The English class starts at nine o'clock.", "The English class starts at 9 o'clock.",
      "The English class begins at nine.", "The English class begins at 9.",
      "The English class begins at nine o'clock.", "The English class begins at 9 o'clock."
    ],
    explanation: "Con l'ora si usa at. E la lezione = it, quindi il verbo prende la -s: starts.",
    notes: {
      "The English lesson starts in nine.": "Con gli orari si usa at: at nine.",
      "The English lesson starts on nine.": "Con gli orari si usa at: at nine.",
      "The English lesson start at nine.": "The lesson = it: il verbo prende la -s, starts.",
      "The English lesson starts at the nine.": "Con l'ora non si mette l'articolo: at nine."
    } },

  { id: "pt_016", topic: "prep_time", difficulty: 3, type: "gap", group: "pt_at",
    prompt: "My family always has a big dinner together ___ Christmas.",
    answers: ["at"],
    explanation: "Per il periodo delle feste si usa at: at Christmas, at Easter (ma on Christmas Day per il giorno preciso).",
    notes: {
      "on": "On si usa con un giorno preciso (on Christmas Day); per il periodo di Natale si dice at Christmas.",
      "in": "Con Christmas si usa at: at Christmas."
    },
    it: "La mia famiglia fa sempre una grande cena insieme a Natale." },

  /* ===================== WH- QUESTIONS ===================== */

  { id: "wh_001", topic: "wh_questions", difficulty: 1, type: "mc", group: "wh_word_choice",
    prompt: "___ do you live? — In Rome.",
    options: ["Where", "When", "Who", "What"],
    answers: ["Where"],
    explanation: "La risposta è un luogo (in Rome), quindi la domanda è Where (dove).",
    notes: {
      "When": "When = quando; la risposta è un luogo, quindi Where.",
      "Who": "Who = chi; la risposta è un luogo, quindi Where.",
      "What": "What = che cosa; per un luogo si usa Where."
    },
    it: "Dove abiti? — A Roma." },

  { id: "wh_002", topic: "wh_questions", difficulty: 1, type: "mc", group: "wh_how_old",
    prompt: "___ is your brother? — He's sixteen.",
    options: ["How old", "How many years", "How much", "How"],
    answers: ["How old"],
    explanation: "Per chiedere l'età si usa How old + be: How old is your brother?",
    notes: {
      "How many years": "Errore tipico: in italiano “quanti anni ha?”, ma in inglese l'età si chiede con How old.",
      "How much": "How much = quanto (per quantità o prezzi), non per l'età.",
      "How": "How is your brother? vuol dire “Come sta?”: per l'età serve How old."
    },
    it: "Quanti anni ha tuo fratello? — Ne ha sedici." },

  { id: "wh_003", topic: "wh_questions", difficulty: 1, type: "mc", group: "wh_aux",
    prompt: "Where ___ your best friend live?",
    options: ["does", "do", "is", "are"],
    answers: ["does"],
    explanation: "Your best friend = he/she: parola interrogativa + does + soggetto + verbo base.",
    notes: {
      "do": "Do va con I/you/we/they; your best friend è he/she: does.",
      "is": "Is è il verbo be; con il verbo live serve does.",
      "are": "Are è il verbo be (e plurale); con il verbo live serve l'ausiliare does. Ricorda: non si può togliere, NON “Where your best friend lives?”."
    },
    it: "Dove abita il tuo migliore amico?" },

  { id: "wh_004", topic: "wh_questions", difficulty: 1, type: "mc", group: "wh_word_choice",
    prompt: "___ is your favourite singer? — Billie Eilish.",
    options: ["Who", "What", "Where", "When"],
    answers: ["Who"],
    explanation: "La risposta è una persona, quindi la domanda è Who (chi).",
    notes: {
      "What": "What = che cosa; per una persona si usa Who.",
      "Where": "Where = dove; la risposta è una persona.",
      "When": "When = quando; la risposta è una persona."
    },
    it: "Chi è il tuo cantante preferito? — Billie Eilish." },

  { id: "wh_005", topic: "wh_questions", difficulty: 1, type: "mc", group: "wh_much_many",
    prompt: "How ___ brothers and sisters have you got?",
    options: ["many", "much", "old", "long"],
    answers: ["many"],
    explanation: "Brothers and sisters si possono contare (plurale): How many.",
    notes: {
      "much": "How much si usa con le cose che non si contano (money, time); i fratelli si contano: How many.",
      "old": "How old chiede l'età, non il numero.",
      "long": "How long chiede la durata o la lunghezza."
    },
    it: "Quanti fratelli e sorelle hai?" },

  { id: "wh_006", topic: "wh_questions", difficulty: 2, type: "order", group: "wh_aux",
    prompt: "Riordina le parole per formare una domanda.",
    answers: ["What time do you get up on Sundays?", "On Sundays what time do you get up?"],
    explanation: "Ordine della domanda: What time + do + soggetto + verbo base.",
    it: "A che ora ti alzi la domenica?" },

  { id: "wh_007", topic: "wh_questions", difficulty: 2, type: "gap", group: "wh_much_many",
    prompt: "How ___ money do you need for the school trip?",
    answers: ["much"],
    explanation: "Money non si conta (non si dice “two moneys”): How much.",
    notes: {
      "many": "How many si usa con nomi plurali che si contano; money non si conta: How much."
    },
    it: "Quanti soldi ti servono per la gita scolastica?" },

  { id: "wh_008", topic: "wh_questions", difficulty: 2, type: "transform", group: "wh_aux",
    instruction: "Scrivi la domanda con Where che ha questa risposta.",
    prompt: "My cousins live in Manchester.",
    answers: ["Where do your cousins live?", "Where do they live?"],
    explanation: "Where + do + soggetto + verbo base. Your cousins è plurale, quindi do.",
    notes: {
      "Where your cousins live?": "Manca l'ausiliare: Where DO your cousins live?",
      "Where does your cousins live?": "Your cousins è plurale (they): do, non does.",
      "Where do your cousins lives?": "Dopo do il verbo resta alla forma base: live.",
      "Where do my cousins live?": "Stai facendo la domanda a un'altra persona: your cousins."
    },
    it: "Dove abitano i tuoi cugini?" },

  { id: "wh_009", topic: "wh_questions", difficulty: 2, type: "mc", group: "wh_whose",
    prompt: "___ bag is this? — It's Marco's.",
    options: ["Whose", "Who", "Who's", "What"],
    answers: ["Whose"],
    explanation: "Per chiedere di chi è una cosa si usa Whose + nome: Whose bag is this?",
    notes: {
      "Who": "Who = chi; per il possesso (di chi?) si usa Whose.",
      "Who's": "Who's = who is (chi è); suona come whose ma ha un altro significato.",
      "What": "What bag? chiede quale tipo di borsa; la risposta dice il proprietario, quindi Whose."
    },
    it: "Di chi è questa borsa? — È di Marco." },

  { id: "wh_010", topic: "wh_questions", difficulty: 2, type: "mc", group: "wh_word_choice",
    prompt: "___ do you study English? — Because I want to travel.",
    options: ["Why", "What", "How", "When"],
    answers: ["Why"],
    explanation: "La risposta comincia con because (perché), quindi la domanda è Why.",
    notes: {
      "What": "What = che cosa; la risposta dà un motivo (because): Why.",
      "How": "How = come; la risposta dà un motivo: Why.",
      "When": "When = quando; la risposta dà un motivo: Why."
    },
    it: "Perché studi inglese? — Perché voglio viaggiare." },

  { id: "wh_011", topic: "wh_questions", difficulty: 2, type: "order", group: "wh_how_old",
    prompt: "Riordina le parole per formare una domanda.",
    answers: ["How old is your best friend?"],
    explanation: "Per l'età: How old + is/are + soggetto?",
    it: "Quanti anni ha il tuo migliore amico?" },

  { id: "wh_012", topic: "wh_questions", difficulty: 3, type: "error", group: "wh_how_old",
    prompt: "How many years has your sister?",
    wrong: "How many years has",
    answers: ["How old is your sister?"],
    explanation: "L'età si chiede con How old + be, non con “how many years” + have: How old is your sister?",
    notes: {
      "How old has your sister?": "Con How old si usa il verbo be: How old is your sister?",
      "How many years is your sister?": "Si dice How old: How old is your sister?"
    },
    it: "Quanti anni ha tua sorella?" },

  { id: "wh_013", topic: "wh_questions", difficulty: 3, type: "error", group: "wh_aux",
    prompt: "What you do after school?",
    wrong: "What you do",
    answers: ["What do you do after school?"],
    explanation: "Manca l'ausiliare: parola interrogativa + do + soggetto + verbo. What do you do…?",
    it: "Che cosa fai dopo la scuola?" },

  { id: "wh_014", topic: "wh_questions", difficulty: 3, type: "translate", group: "wh_aux",
    prompt: "Dove lavora tuo papà?",
    answers: ["Where does your dad work?", "Where does your father work?"],
    explanation: "Your dad = he: Where + does + soggetto + verbo base (work, senza -s).",
    notes: {
      "Where your dad works?": "Manca l'ausiliare: Where DOES your dad work?",
      "Where does your dad works?": "Dopo does il verbo resta alla forma base: work.",
      "Where do your dad work?": "Your dad = he: does, non do.",
      "Where works your dad?": "In inglese non basta invertire il verbo: serve does. Where does your dad work?"
    } },

  { id: "wh_015", topic: "wh_questions", difficulty: 3, type: "translate", group: "wh_much_many",
    prompt: "Quanti studenti ci sono nella tua classe?",
    answers: ["How many students are there in your class?", "How many pupils are there in your class?", "How many students are in your class?", "How many pupils are in your class?"],
    explanation: "Students si contano: How many. “Ci sono” = there are, che nella domanda diventa are there.",
    notes: {
      "How much students are there in your class?": "Gli studenti si contano: How many, non How much.",
      "How many students there are in your class?": "Nella domanda si inverte: are there.",
      "How many students is there in your class?": "Students è plurale: are there."
    } },

  { id: "wh_016", topic: "wh_questions", difficulty: 3, type: "error", group: "wh_whose",
    prompt: "Who's phone is this?",
    wrong: "Who's",
    answers: ["Whose phone is this?"],
    explanation: "Per chiedere di chi è una cosa si usa Whose. Who's vuol dire who is (chi è): si pronunciano uguali ma sono diversi.",
    it: "Di chi è questo telefono?" }

], 'grammar-a1b');
