/* Lessico: vocab_basic (A1), false_friends (A2), make_do (A2), dependent_prepositions (B1). */
EC.addItems([
  /* ============================== vocab_basic ============================== */
  { id: "vb_001", topic: "vocab_basic", difficulty: 1, type: "mc", group: "vb_family",
    prompt: "My uncle is my father's ___.",
    options: ["brother", "son", "nephew", "grandfather"],
    answers: ["brother"],
    explanation: "Lo zio (uncle) è il fratello (brother) di tua mamma o di tuo papà. Ottimo per ripassare la famiglia!",
    notes: {
      "son": "Son = figlio. Il figlio di tuo padre sei tu (o tuo fratello), non tuo zio.",
      "nephew": "Nephew = nipote (il figlio di tuo fratello o di tua sorella). Attenzione: l'italiano 'nipote' in inglese ha più parole diverse.",
      "grandfather": "Grandfather = nonno, cioè il padre di tuo padre, non suo fratello."
    },
    it: "Mio zio è il fratello di mio padre." },

  { id: "vb_002", topic: "vocab_basic", difficulty: 1, type: "mc", group: "vb_family",
    prompt: "My mum's sister has got two children. They are my ___.",
    options: ["cousins", "nephews", "brothers", "grandchildren"],
    answers: ["cousins"],
    explanation: "I figli degli zii sono i tuoi cugini: cousins. Una parola sola per maschi e femmine.",
    notes: {
      "nephews": "Nephews = nipoti, cioè i figli di tuo fratello o di tua sorella, non i figli degli zii.",
      "brothers": "Brothers = fratelli. I figli di tua zia non sono tuoi fratelli.",
      "grandchildren": "Grandchildren = i nipoti visti dai nonni (i figli dei figli)."
    },
    it: "La sorella di mia mamma ha due figli. Sono i miei cugini." },

  { id: "vb_003", topic: "vocab_basic", difficulty: 1, type: "mc", group: "vb_school",
    prompt: "In geometry we use a ___ to draw straight lines.",
    options: ["ruler", "rubber", "sharpener", "pencil case"],
    answers: ["ruler"],
    explanation: "Ruler = righello: serve per tracciare linee dritte.",
    notes: {
      "rubber": "Rubber = gomma per cancellare. Non disegna linee, le cancella!",
      "sharpener": "Sharpener = temperamatite.",
      "pencil case": "Pencil case = astuccio: contiene le penne, ma non serve a tracciare linee."
    },
    it: "In geometria usiamo un righello per tracciare linee dritte." },

  { id: "vb_004", topic: "vocab_basic", difficulty: 1, type: "mc", group: "vb_school",
    prompt: "In our ___ lessons we study maps, rivers and mountains.",
    options: ["geography", "history", "science", "maths"],
    answers: ["geography"],
    explanation: "Mappe, fiumi e montagne si studiano in geografia: geography.",
    notes: {
      "history": "History = storia (il passato, re, guerre, antiche civiltà).",
      "science": "Science = scienze (piante, animali, corpo umano, esperimenti).",
      "maths": "Maths = matematica (numeri, calcoli, geometria)."
    },
    it: "Nelle lezioni di geografia studiamo mappe, fiumi e montagne." },

  { id: "vb_005", topic: "vocab_basic", difficulty: 1, type: "mc", group: "vb_time",
    prompt: "The day before Friday is ___.",
    options: ["Thursday", "Wednesday", "Saturday", "Tuesday"],
    answers: ["Thursday"],
    explanation: "L'ordine è Monday, Tuesday, Wednesday, Thursday, Friday: il giorno prima di venerdì è Thursday (giovedì). Ricorda: i giorni in inglese hanno sempre la maiuscola.",
    notes: {
      "Wednesday": "Wednesday = mercoledì, cioè due giorni prima di venerdì.",
      "Saturday": "Saturday = sabato, che viene DOPO venerdì (before = prima).",
      "Tuesday": "Tuesday = martedì, tre giorni prima di venerdì. Non confonderlo con Thursday (giovedì)!"
    },
    it: "Il giorno prima di venerdì è giovedì." },

  { id: "vb_006", topic: "vocab_basic", difficulty: 1, type: "mc", group: "vb_time",
    prompt: "There are ___ minutes in an hour.",
    options: ["sixty", "sixteen", "six", "six hundred"],
    answers: ["sixty"],
    explanation: "In un'ora ci sono 60 minuti: sixty. Le decine finiscono in -ty (twenty, thirty, sixty).",
    notes: {
      "sixteen": "Sixteen = 16. I numeri da 13 a 19 finiscono in -teen; le decine (60) in -ty.",
      "six": "Six = 6.",
      "six hundred": "Six hundred = 600, decisamente troppi minuti!"
    },
    it: "In un'ora ci sono sessanta minuti." },

  { id: "vb_007", topic: "vocab_basic", difficulty: 1, type: "mc", group: "vb_body_clothes",
    prompt: "It's freezing outside. Put on your ___ and your scarf.",
    options: ["coat", "shorts", "sandals", "swimsuit"],
    answers: ["coat"],
    explanation: "Quando fa molto freddo (freezing) si mette il cappotto: coat.",
    notes: {
      "shorts": "Shorts = pantaloncini corti, adatti al caldo.",
      "sandals": "Sandals = sandali, si mettono d'estate.",
      "swimsuit": "Swimsuit = costume da bagno: non è proprio il caso con il gelo!"
    },
    it: "Fuori si gela. Mettiti il cappotto e la sciarpa." },

  { id: "vb_008", topic: "vocab_basic", difficulty: 1, type: "mc", group: "vb_weather_sport",
    prompt: "Take an umbrella. It's ___ today.",
    options: ["raining", "sunny", "hot", "dry"],
    answers: ["raining"],
    explanation: "L'ombrello serve quando piove: it's raining = sta piovendo.",
    notes: {
      "sunny": "Sunny = soleggiato: con il sole non serve l'ombrello.",
      "hot": "Hot = caldo: non è un motivo per prendere l'ombrello.",
      "dry": "Dry = asciutto, cioè senza pioggia: proprio il contrario."
    },
    it: "Prendi un ombrello. Oggi piove." },

  { id: "vb_009", topic: "vocab_basic", difficulty: 1, type: "mc", group: "vb_home_food",
    prompt: "We cook and eat in the ___.",
    options: ["kitchen", "bathroom", "bedroom", "garage"],
    answers: ["kitchen"],
    explanation: "La stanza dove si cucina è la cucina: kitchen. Attenzione: 'cucinare' è invece cook.",
    notes: {
      "bathroom": "Bathroom = bagno: lì ci si lava, non si cucina.",
      "bedroom": "Bedroom = camera da letto.",
      "garage": "Garage = garage, dove si mette la macchina."
    },
    it: "Cuciniamo e mangiamo in cucina." },

  { id: "vb_010", topic: "vocab_basic", difficulty: 2, type: "gap", group: "vb_time",
    prompt: "My birthday is in ___ (agosto), the month after July.",
    answers: ["August"],
    explanation: "Agosto = August. In inglese i mesi si scrivono sempre con la lettera maiuscola.",
    notes: {
      "agost": "Quasi! Si scrive August, con la u: A-u-g-u-s-t.",
      "june": "June = giugno, che viene prima di luglio, non dopo."
    },
    it: "Il mio compleanno è ad agosto, il mese dopo luglio." },

  { id: "vb_011", topic: "vocab_basic", difficulty: 2, type: "gap", group: "vb_time",
    prompt: "There are four seasons: ___ (primavera), summer, autumn and winter.",
    answers: ["spring"],
    explanation: "Le quattro stagioni sono spring (primavera), summer (estate), autumn (autunno) e winter (inverno).",
    notes: {
      "summer": "Summer = estate, ed è già nella frase.",
      "fall": "Fall è l'autunno in inglese americano; qui serve la primavera: spring."
    },
    it: "Ci sono quattro stagioni: primavera, estate, autunno e inverno." },

  { id: "vb_012", topic: "vocab_basic", difficulty: 2, type: "gap", group: "vb_body_clothes",
    prompt: "I can't play football today: my ___ (piede) hurts.",
    answers: ["foot"],
    explanation: "Piede = foot (singolare, perché il verbo è hurts). Il plurale irregolare è feet.",
    notes: {
      "feet": "Feet è il plurale (piedi). Il verbo hurts è singolare, quindi serve foot.",
      "leg": "Leg = gamba, non piede."
    },
    it: "Oggi non posso giocare a calcio: mi fa male il piede." },

  { id: "vb_013", topic: "vocab_basic", difficulty: 2, type: "mc", group: "vb_body_clothes",
    prompt: "If you mix blue and yellow, you get ___.",
    options: ["green", "purple", "orange", "brown"],
    answers: ["green"],
    explanation: "Blu + giallo = verde: green.",
    notes: {
      "purple": "Purple = viola: si ottiene mescolando blu e rosso.",
      "orange": "Orange = arancione: si ottiene con rosso e giallo.",
      "brown": "Brown = marrone, non viene da blu e giallo."
    },
    it: "Se mescoli il blu e il giallo, ottieni il verde." },

  { id: "vb_014", topic: "vocab_basic", difficulty: 2, type: "order", group: "vb_family",
    prompt: "Riordina le parole: «Mia cugina vive con i suoi nonni.»",
    answers: ["My cousin lives with her grandparents."],
    explanation: "Cugina = cousin, nonni = grandparents. Con una ragazza si usa her (i suoi).",
    it: "Mia cugina vive con i suoi nonni." },

  { id: "vb_015", topic: "vocab_basic", difficulty: 2, type: "order", group: "vb_home_food",
    prompt: "Riordina le parole: «Di solito faccio la doccia prima di colazione.»",
    answers: ["I usually have a shower before breakfast.", "Before breakfast I usually have a shower.", "Usually I have a shower before breakfast."],
    explanation: "Fare la doccia = have a shower; colazione = breakfast. Usually (di solito) va di solito prima del verbo.",
    it: "Di solito faccio la doccia prima di colazione." },

  { id: "vb_016", topic: "vocab_basic", difficulty: 2, type: "gap", group: "vb_weather_sport",
    prompt: "Ronaldo is a famous football ___ (giocatore).",
    answers: ["player"],
    explanation: "Giocatore = player (da play, giocare, + -er). Football player = calciatore.",
    notes: {
      "gamer": "Gamer è chi gioca ai videogiochi, non a calcio.",
      "playing": "Playing è la forma -ing del verbo (giocando); serve il nome: player."
    },
    it: "Ronaldo è un famoso calciatore." },

  { id: "vb_017", topic: "vocab_basic", difficulty: 2, type: "mc", group: "vb_school",
    prompt: "I made a mistake with my pencil. Can I borrow your ___?",
    options: ["rubber", "ruler", "glue", "notebook"],
    answers: ["rubber"],
    explanation: "Per cancellare la matita serve la gomma: rubber (in inglese americano eraser).",
    notes: {
      "ruler": "Ruler = righello. Somiglia a rubber, ma serve per le linee dritte.",
      "glue": "Glue = colla.",
      "notebook": "Notebook = quaderno."
    },
    it: "Ho sbagliato con la matita. Mi presti la gomma?" },

  { id: "vb_018", topic: "vocab_basic", difficulty: 2, type: "mc", group: "vb_time",
    prompt: "«It's half past three.» What time is it?",
    options: ["3:30", "2:30", "3:15", "3:45"],
    answers: ["3:30"],
    explanation: "Half past three = le tre e mezza (mezz'ora DOPO le tre): 3:30.",
    notes: {
      "2:30": "Past vuol dire 'dopo': half past three è mezz'ora dopo le tre, non prima.",
      "3:15": "3:15 si dice a quarter past three (un quarto).",
      "3:45": "3:45 si dice a quarter to four (le quattro meno un quarto)."
    },
    it: "Sono le tre e mezza." },

  { id: "vb_019", topic: "vocab_basic", difficulty: 3, type: "translate", group: "vb_time",
    prompt: "Il mio compleanno è il 3 maggio.",
    answers: ["My birthday is on 3 May.", "My birthday is on the third of May.", "My birthday is on the 3rd of May.", "My birthday is on 3rd May.", "My birthday is on May 3rd.", "My birthday is on May the third.", "My birthday is on May 3."],
    explanation: "Maggio = May (con la maiuscola). Con una data precisa si usa on: on 3 May, che si legge 'on the third of May'.",
    notes: {
      "My birthday is in 3 May.": "Con una data precisa (giorno + mese) si usa on, non in: on 3 May.",
      "My birthday is the 3 May.": "Manca on: con le date si dice on 3 May / on the third of May."
    } },

  { id: "vb_020", topic: "vocab_basic", difficulty: 3, type: "translate", group: "vb_home_food",
    prompt: "Ceniamo alle otto.",
    answers: ["We have dinner at eight.", "We have dinner at 8.", "We have dinner at eight o'clock.", "We have dinner at 8 o'clock.", "We eat dinner at eight.", "We eat dinner at 8.", "We eat dinner at eight o'clock.", "We eat dinner at 8 o'clock.", "We have our dinner at eight."],
    explanation: "Cenare = have dinner (o eat dinner), senza articolo. Per l'ora si usa at: at eight.",
    notes: {
      "We make dinner at eight.": "Make dinner vuol dire PREPARARE la cena, non mangiarla. Cenare = have dinner.",
      "We have the dinner at eight.": "Con i pasti non si mette the: have dinner, have breakfast.",
      "We dinner at eight.": "Dinner è un nome, non un verbo: serve have dinner."
    } },

  { id: "vb_021", topic: "vocab_basic", difficulty: 3, type: "error", group: "vb_family",
    prompt: "My mother's mother is my grandfather.",
    wrong: "grandfather",
    answers: ["My mother's mother is my grandmother.", "My mother's mother is my grandma.", "My mother's mother is my granny."],
    explanation: "La mamma della mamma è la nonna: grandmother (o grandma/granny). Grandfather è il nonno." },

  { id: "vb_022", topic: "vocab_basic", difficulty: 3, type: "error", group: "vb_body_clothes",
    prompt: "I brush my tooths twice a day.",
    wrong: "tooths",
    answers: ["I brush my teeth twice a day."],
    explanation: "Tooth (dente) ha il plurale irregolare: teeth. Come foot → feet.",
    notes: { "I brush my tooth twice a day.": "Ti lavi tutti i denti, non uno solo: serve il plurale teeth." } },

  { id: "vb_023", topic: "vocab_basic", difficulty: 3, type: "error", group: "vb_weather_sport",
    prompt: "It's very sun today, so let's go to the beach.",
    wrong: "sun",
    answers: ["It's very sunny today, so let's go to the beach."],
    explanation: "Sun è il nome (il sole); per dire com'è il tempo serve l'aggettivo sunny (soleggiato). Allo stesso modo: rain → rainy, wind → windy." },

  { id: "vb_024", topic: "vocab_basic", difficulty: 3, type: "gap", group: "vb_school",
    prompt: "My favourite subject is ___: I love numbers, equations and geometry.",
    answers: ["maths", "mathematics", "math"],
    explanation: "Numeri, equazioni e geometria: è la matematica, in inglese britannico maths (math in americano).",
    notes: {
      "mathematic": "Si dice mathematics (con la s finale) o, più comunemente, maths.",
      "matematica": "Questa è la parola italiana: in inglese è maths."
    },
    it: "La mia materia preferita è la matematica: adoro i numeri, le equazioni e la geometria." },

  /* ============================== false_friends ============================== */
  { id: "ff_001", topic: "false_friends", difficulty: 1, type: "mc", group: "ff_library",
    prompt: "«Vado in libreria a comprare un nuovo libro.» → I'm going to the ___ to buy a new book.",
    options: ["bookshop", "library", "bookcase"],
    answers: ["bookshop"],
    explanation: "Il negozio dove si COMPRANO i libri è il bookshop. Library è un falso amico: vuol dire biblioteca.",
    notes: {
      "library": "Falso amico! Library = biblioteca, dove i libri si prendono in prestito, non si comprano.",
      "bookcase": "Bookcase è la libreria come mobile (lo scaffale di casa), non il negozio."
    } },

  { id: "ff_002", topic: "false_friends", difficulty: 1, type: "mc", group: "ff_library",
    prompt: "I borrow books from the school ___ every week, and it's free!",
    options: ["library", "bookshop", "librarian"],
    answers: ["library"],
    explanation: "Dove si prendono in prestito (borrow) i libri gratis? In biblioteca: library.",
    notes: {
      "bookshop": "Bookshop = libreria, il negozio: lì i libri si comprano, non sono gratis.",
      "librarian": "Librarian è il bibliotecario, la persona, non il luogo."
    },
    it: "Prendo in prestito libri dalla biblioteca della scuola ogni settimana, ed è gratis!" },

  { id: "ff_003", topic: "false_friends", difficulty: 1, type: "mc", group: "ff_people",
    prompt: "All my ___ come to our Christmas lunch: uncles, aunts, cousins and grandparents.",
    options: ["relatives", "parents", "grandparents"],
    answers: ["relatives"],
    explanation: "Zii, cugini e nonni sono i parenti: relatives. Parents è un falso amico: vuol dire solo genitori.",
    notes: {
      "parents": "Falso amico! Parents = genitori (mamma e papà), non tutti i parenti.",
      "grandparents": "Grandparents = nonni, ma nella lista ci sono anche zii e cugini."
    },
    it: "Tutti i miei parenti vengono al pranzo di Natale: zii, zie, cugini e nonni." },

  { id: "ff_004", topic: "false_friends", difficulty: 1, type: "mc", group: "ff_objects",
    prompt: "I took some great photos with my new ___.",
    options: ["camera", "room", "machine"],
    answers: ["camera"],
    explanation: "Camera in inglese è la macchina fotografica! La 'camera' italiana (stanza) si dice room o bedroom.",
    notes: {
      "room": "Room = stanza: non si fanno foto con una stanza.",
      "machine": "Machine = macchina nel senso di apparecchio (es. washing machine, lavatrice). La macchina fotografica è camera."
    },
    it: "Ho fatto delle foto bellissime con la mia nuova macchina fotografica." },

  { id: "ff_005", topic: "false_friends", difficulty: 1, type: "mc", group: "ff_objects",
    prompt: "«La mia camera è molto piccola.» → My ___ is very small: there's only a bed and a desk.",
    options: ["bedroom", "camera", "chamber"],
    answers: ["bedroom"],
    explanation: "La camera da letto si dice bedroom (o semplicemente room). Camera in inglese è la macchina fotografica.",
    notes: {
      "camera": "Falso amico! Camera = macchina fotografica, non la stanza.",
      "chamber": "Chamber è una parola antica o molto formale (es. una sala ufficiale): non si usa per la tua stanza."
    } },

  { id: "ff_006", topic: "false_friends", difficulty: 1, type: "mc", group: "ff_people",
    prompt: "«Ieri ho litigato con mio fratello.» → Yesterday I had a big ___ with my brother.",
    options: ["argument", "discussion", "chat"],
    answers: ["argument"],
    explanation: "Argument è un falso amico: non è l'argomento, ma il litigio! Have an argument = litigare.",
    notes: {
      "discussion": "Discussion è una conversazione seria su un tema (anche in classe), non un litigio.",
      "chat": "Chat = chiacchierata tranquilla: il contrario di un litigio."
    } },

  { id: "ff_007", topic: "false_friends", difficulty: 2, type: "mc", group: "ff_actually",
    prompt: "«Sembra severa, ma in realtà è molto simpatica.» → She looks strict, but ___ she's really nice.",
    options: ["actually", "currently", "eventually"],
    answers: ["actually"],
    explanation: "Actually = in realtà, in effetti. Non vuol dire 'attualmente'!",
    notes: {
      "currently": "Currently = attualmente, in questo periodo: non c'entra con 'in realtà'.",
      "eventually": "Eventually = alla fine, dopo tanto tempo (non 'eventualmente')."
    } },

  { id: "ff_008", topic: "false_friends", difficulty: 2, type: "mc", group: "ff_actually",
    prompt: "«Attualmente vivo a Milano.» → I ___ live in Milan.",
    options: ["currently", "actually", "eventually"],
    answers: ["currently"],
    explanation: "Attualmente = currently (o at the moment). Actually sembra uguale, ma vuol dire 'in realtà'.",
    notes: {
      "actually": "Falso amico! Actually = in realtà. 'I actually live in Milan' vuol dire 'In realtà vivo a Milano'.",
      "eventually": "Eventually = alla fine, non 'attualmente'."
    } },

  { id: "ff_009", topic: "false_friends", difficulty: 2, type: "gap", group: "ff_actually",
    prompt: "We waited for two hours, but ___ (alla fine) the bus arrived.",
    answers: ["eventually", "in the end", "finally", "at last"],
    explanation: "Alla fine = eventually (o in the end). Eventually è un falso amico: NON vuol dire 'eventualmente'.",
    notes: {
      "possibly": "Possibly = eventualmente, forse. Qui serve 'alla fine': eventually.",
      "at the end": "At the end si usa con of + un punto preciso (at the end of the film). 'Alla fine, dopo tanto' = in the end o eventually.",
      "actually": "Actually = in realtà, non 'alla fine'."
    },
    it: "Abbiamo aspettato due ore, ma alla fine l'autobus è arrivato." },

  { id: "ff_010", topic: "false_friends", difficulty: 2, type: "mc", group: "ff_sensible",
    prompt: "«Mia sorella è molto sensibile: piange sempre con i film tristi.» → My sister is very ___: she always cries at sad films.",
    options: ["sensitive", "sensible", "sympathetic"],
    answers: ["sensitive"],
    explanation: "Sensibile = sensitive. Sensible è un falso amico: vuol dire assennato, giudizioso.",
    notes: {
      "sensible": "Falso amico! Sensible = assennato, con la testa sulle spalle (a sensible decision = una decisione saggia).",
      "sympathetic": "Sympathetic = comprensivo con chi ha un problema, non 'simpatico' né 'sensibile'."
    } },

  { id: "ff_011", topic: "false_friends", difficulty: 2, type: "mc", group: "ff_verbs",
    prompt: "«Faccio finta di dormire quando entra mia madre.» → I ___ to be asleep when my mum comes in.",
    options: ["pretend", "expect", "attend"],
    answers: ["pretend"],
    explanation: "Pretend = fingere, fare finta. Attenzione: NON vuol dire 'pretendere' (che è expect o demand).",
    notes: {
      "expect": "Expect = aspettarsi o pretendere qualcosa da qualcuno, non fingere.",
      "attend": "Attend = frequentare (una scuola, un corso) o partecipare, non fingere."
    } },

  { id: "ff_012", topic: "false_friends", difficulty: 2, type: "order", group: "ff_verbs",
    prompt: "Riordina le parole: «Frequento un liceo a Bologna.»",
    answers: ["I attend a high school in Bologna.", "In Bologna I attend a high school."],
    explanation: "Frequentare una scuola = attend (o go to) a school. Attend NON vuol dire 'attendere' (che è wait for).",
    it: "Frequento un liceo a Bologna." },

  { id: "ff_013", topic: "false_friends", difficulty: 3, type: "translate", group: "ff_library",
    prompt: "Ho preso in prestito un romanzo dalla biblioteca.",
    answers: ["I borrowed a novel from the library.", "I have borrowed a novel from the library.", "I got a novel from the library.", "I took out a novel from the library.", "I took a novel out of the library."],
    explanation: "Biblioteca = library (falso amico!) e romanzo = novel. Prendere in prestito = borrow.",
    notes: {
      "I borrowed a novel from the bookshop.": "Bookshop è la libreria (il negozio). La biblioteca è la library.",
      "I borrowed a romance from the library.": "Romance è una storia d'amore. Il romanzo in generale è novel.",
      "I borrowed a book from the library.": "Quasi! Book è un libro qualsiasi: romanzo si dice novel.",
      "I lent a novel from the library.": "Lend = prestare (dare in prestito). Prendere in prestito è borrow."
    } },

  { id: "ff_014", topic: "false_friends", difficulty: 3, type: "translate", group: "ff_people",
    prompt: "Ho molti parenti in Sicilia.",
    answers: ["I have got a lot of relatives in Sicily.", "I have a lot of relatives in Sicily.", "I have got lots of relatives in Sicily.", "I have lots of relatives in Sicily.", "I have many relatives in Sicily.", "I have got many relatives in Sicily.", "I have got a lot of relations in Sicily.", "I have a lot of relations in Sicily."],
    explanation: "Parenti = relatives. Parents è un falso amico: vuol dire genitori, e di genitori ne hai solo due!",
    notes: {
      "I have a lot of parents in Sicily.": "Falso amico! Parents = genitori. I parenti sono relatives.",
      "I have got a lot of parents in Sicily.": "Falso amico! Parents = genitori. I parenti sono relatives.",
      "I have many parents in Sicily.": "Falso amico! Parents = genitori. I parenti sono relatives."
    } },

  { id: "ff_015", topic: "false_friends", difficulty: 3, type: "error", group: "ff_people",
    prompt: "I had a discussion with my best friend and now we aren't speaking to each other.",
    wrong: "a discussion",
    answers: ["I had an argument with my best friend and now we aren't speaking to each other.", "I had a row with my best friend and now we aren't speaking to each other.", "I had a fight with my best friend and now we aren't speaking to each other."],
    explanation: "Se non vi parlate più, avete litigato: have an argument (o a row). Discussion è solo una conversazione su un tema." },

  { id: "ff_016", topic: "false_friends", difficulty: 3, type: "error", group: "ff_sensible",
    prompt: "My new teacher is very sympathetic: she always makes us laugh.",
    wrong: "sympathetic",
    answers: ["My new teacher is very nice: she always makes us laugh.", "My new teacher is very funny: she always makes us laugh.", "My new teacher is very friendly: she always makes us laugh.", "My new teacher is very kind: she always makes us laugh."],
    explanation: "Simpatico = nice o friendly (e chi fa ridere è funny). Sympathetic è un falso amico: vuol dire comprensivo, che capisce i tuoi problemi." },

  { id: "ff_017", topic: "false_friends", difficulty: 3, type: "gap", group: "ff_library",
    prompt: "«Mio padre compra una rivista di auto ogni mese.» → My dad buys a car ___ every month.",
    answers: ["magazine"],
    explanation: "Rivista = magazine. Attenzione: magazine NON è il magazzino (che si dice warehouse o storeroom).",
    notes: {
      "review": "Review = recensione (di un film, di un libro), non rivista.",
      "journal": "Journal è una rivista scientifica o un diario: per le riviste normali si dice magazine.",
      "newspaper": "Newspaper = giornale quotidiano. Una rivista mensile è un magazine."
    } },

  { id: "ff_018", topic: "false_friends", difficulty: 3, type: "gap", group: "ff_objects",
    prompt: "«Mio zio lavora in una fabbrica di ricambi per auto.» → My uncle works in a ___ that makes car parts.",
    answers: ["factory", "plant"],
    explanation: "Fabbrica = factory. Fabric è un falso amico: vuol dire tessuto, stoffa.",
    notes: {
      "fabric": "Falso amico! Fabric = tessuto, stoffa. La fabbrica è factory.",
      "fabbric": "Somiglia all'italiano, ma la fabbrica in inglese è factory."
    } },

  /* ============================== make_do ============================== */
  { id: "md_001", topic: "make_do", difficulty: 1, type: "mc", group: "md_make",
    prompt: "I ___ a lot of mistakes in my English test.",
    options: ["made", "did", "took"],
    answers: ["made"],
    explanation: "Fare un errore = make a mistake. Con mistake si usa sempre make.",
    notes: {
      "did": "Errore tipico! In italiano si dice 'fare' un errore, ma in inglese è make a mistake, mai do.",
      "took": "Take non si usa con mistake: si dice make a mistake."
    },
    it: "Ho fatto molti errori nella verifica d'inglese." },

  { id: "md_002", topic: "make_do", difficulty: 1, type: "mc", group: "md_do",
    prompt: "I always ___ my homework after lunch.",
    options: ["do", "make", "have"],
    answers: ["do"],
    explanation: "Fare i compiti = do homework. Do si usa per attività e lavori da svolgere.",
    notes: {
      "make": "Make vuol dire creare/produrre qualcosa (make a cake). I compiti si 'svolgono': do homework.",
      "have": "Have homework = avere dei compiti da fare, ma qui l'azione è farli: do."
    },
    it: "Faccio sempre i compiti dopo pranzo." },

  { id: "md_003", topic: "make_do", difficulty: 1, type: "mc", group: "md_say_tell",
    prompt: "Excuse me, can you ___ me the time, please?",
    options: ["tell", "say", "speak"],
    answers: ["tell"],
    explanation: "Dire QUALCOSA A QUALCUNO con la persona subito dopo il verbo: tell me. Tell + persona.",
    notes: {
      "say": "Say non vuole la persona subito dopo: non si dice 'say me'. Con la persona si usa tell.",
      "speak": "Speak = parlare (speak English), non 'dire qualcosa a qualcuno'."
    },
    it: "Scusi, mi può dire l'ora, per favore?" },

  { id: "md_004", topic: "make_do", difficulty: 1, type: "mc", group: "md_agree",
    prompt: "«Pizza is the best food in the world!» «Yes, I ___.»",
    options: ["agree", "am agree", "have agree"],
    answers: ["agree"],
    explanation: "Agree è un verbo: I agree = sono d'accordo. Non serve am.",
    notes: {
      "am agree": "Errore tipico degli italiani: 'sono d'accordo' si dice I agree, senza am.",
      "have agree": "Have non serve: agree è già il verbo. Si dice semplicemente I agree."
    } },

  { id: "md_005", topic: "make_do", difficulty: 1, type: "mc", group: "md_take_have",
    prompt: "Look at the sunset! Let's ___ a photo.",
    options: ["take", "make", "do"],
    answers: ["take"],
    explanation: "Fare una foto = take a photo. In inglese le foto si 'prendono'!",
    notes: {
      "make": "In italiano 'fare una foto', ma in inglese si dice take a photo.",
      "do": "Do non si usa con photo: si dice take a photo."
    },
    it: "Guarda il tramonto! Facciamo una foto." },

  { id: "md_006", topic: "make_do", difficulty: 1, type: "mc", group: "md_prep",
    prompt: "I ___ music on the bus every morning.",
    options: ["listen to", "listen", "hear to"],
    answers: ["listen to"],
    explanation: "Ascoltare qualcosa = listen TO something. Listen vuole sempre to prima di quello che ascolti.",
    notes: {
      "listen": "Manca to: si dice listen to music (in italiano non c'è la preposizione, in inglese sì).",
      "hear to": "Hear (sentire) non vuole to. Per 'ascoltare' si usa listen to."
    },
    it: "Ascolto la musica sull'autobus ogni mattina." },

  { id: "md_007", topic: "make_do", difficulty: 2, type: "gap", group: "md_make",
    prompt: "Yesterday my mum and I ___ (fare – passato) a chocolate cake for my sister's birthday.",
    answers: ["made"],
    explanation: "Fare una torta = make a cake: è creare qualcosa di nuovo. Al passato: made.",
    notes: {
      "did": "Una torta si crea, quindi make (passato made), non do.",
      "make": "Giusto il verbo, ma serve il passato (yesterday): made.",
      "maked": "Make è irregolare: il passato è made."
    },
    it: "Ieri io e mia mamma abbiamo fatto una torta al cioccolato per il compleanno di mia sorella." },

  { id: "md_008", topic: "make_do", difficulty: 2, type: "gap", group: "md_do",
    prompt: "On Saturday mornings my dad ___ (fare) the shopping at the supermarket.",
    answers: ["does"],
    explanation: "Fare la spesa = do the shopping. Con my dad (= he) serve la terza persona: does.",
    notes: {
      "makes": "La spesa è un'attività, non qualcosa che si crea: do the shopping, non make.",
      "do": "Giusto il verbo! Ma con my dad (he) serve does.",
      "make": "Si dice do the shopping, e con he: does."
    },
    it: "Il sabato mattina mio papà fa la spesa al supermercato." },

  { id: "md_009", topic: "make_do", difficulty: 2, type: "mc", group: "md_say_tell",
    prompt: "My friend ___ that she was too tired to come to the party.",
    options: ["said", "told", "spoke"],
    answers: ["said"],
    explanation: "Say + quello che si dice (said that…). Tell vuole la persona: she told ME that…",
    notes: {
      "told": "Tell vuole sempre la persona dopo: she told me that… Senza persona si usa said.",
      "spoke": "Speak = parlare; non si usa per riportare le parole di qualcuno con that."
    },
    it: "La mia amica ha detto che era troppo stanca per venire alla festa." },

  { id: "md_010", topic: "make_do", difficulty: 2, type: "gap", group: "md_prep",
    prompt: "Hurry up! We're ___ (aspettare) the bus.",
    answers: ["waiting for"],
    explanation: "Aspettare qualcosa/qualcuno = wait FOR. Qui con are serve la forma -ing: waiting for.",
    notes: {
      "waiting": "Manca for: si dice wait for the bus.",
      "expecting": "Expect = aspettarsi (pensare che qualcosa succederà), non aspettare l'autobus alla fermata.",
      "attending": "Falso amico: attend = frequentare/partecipare, non aspettare."
    },
    it: "Sbrigati! Stiamo aspettando l'autobus." },

  { id: "md_011", topic: "make_do", difficulty: 2, type: "order", group: "md_prep",
    prompt: "Riordina le parole: «Mi spieghi questo esercizio?»",
    answers: ["Can you explain this exercise to me?"],
    explanation: "Spiegare qualcosa a qualcuno = explain something TO someone. Mai 'explain me'.",
    it: "Mi spieghi questo esercizio?" },

  { id: "md_012", topic: "make_do", difficulty: 2, type: "mc", group: "md_take_have",
    prompt: "I usually ___ a shower before school.",
    options: ["have", "do", "make"],
    answers: ["have"],
    explanation: "Fare la doccia = have a shower (si può dire anche take a shower). Make e do non si usano.",
    notes: {
      "do": "In italiano 'fare la doccia', ma in inglese si dice have (o take) a shower, mai do.",
      "make": "Make a shower non esiste: si dice have a shower."
    },
    it: "Di solito faccio la doccia prima di andare a scuola." },

  { id: "md_013", topic: "make_do", difficulty: 3, type: "translate", group: "md_agree",
    prompt: "Non sono d'accordo con te.",
    answers: ["I don't agree with you.", "I disagree with you.", "I do not agree with you."],
    explanation: "Essere d'accordo = agree (è un verbo). Al negativo: I don't agree with you, oppure I disagree.",
    notes: {
      "I am not agree with you.": "Errore tipico! Agree è un verbo, non si usa con am: I don't agree with you.",
      "I don't agree to you.": "Con una persona si dice agree WITH: I don't agree with you.",
      "I not agree with you.": "Al negativo serve don't: I don't agree with you."
    } },

  { id: "md_014", topic: "make_do", difficulty: 3, type: "translate", group: "md_prep",
    prompt: "Spiegami la regola, per favore.",
    answers: ["Please explain the rule to me.", "Explain the rule to me, please.", "Can you explain the rule to me, please?", "Could you explain the rule to me, please?", "Can you please explain the rule to me?", "Could you please explain the rule to me?", "Can you explain the rule to me?", "Could you explain the rule to me?"],
    explanation: "Explain vuole TO davanti alla persona: explain the rule to me. 'Explain me' è un errore molto comune.",
    notes: {
      "Explain me the rule, please.": "Errore tipico! Non si dice 'explain me': si dice explain the rule TO me.",
      "Please explain me the rule.": "Non si dice 'explain me': si dice explain the rule TO me.",
      "Can you explain me the rule, please?": "Non si dice 'explain me': si dice explain the rule TO me."
    } },

  { id: "md_015", topic: "make_do", difficulty: 3, type: "error", group: "md_make",
    prompt: "Yesterday I did a big mistake in my maths test.",
    wrong: "did",
    answers: ["Yesterday I made a big mistake in my maths test."],
    explanation: "Fare un errore = make a mistake (passato: made). Con mistake mai do!" },

  { id: "md_016", topic: "make_do", difficulty: 3, type: "error", group: "md_say_tell",
    prompt: "My grandad always says me funny stories.",
    wrong: "says",
    answers: ["My grandad always tells me funny stories."],
    explanation: "Raccontare storie = tell stories, e con la persona (me) si usa tell, non say: tells me funny stories." },

  { id: "md_017", topic: "make_do", difficulty: 3, type: "error", group: "md_do",
    prompt: "Can you make me a favour?",
    wrong: "make",
    answers: ["Can you do me a favour?"],
    explanation: "Fare un favore = do someone a favour. È un'espressione fissa con do." },

  { id: "md_018", topic: "make_do", difficulty: 3, type: "gap", group: "md_make",
    prompt: "The neighbours' dog is ___ too much noise and I can't sleep!",
    answers: ["making"],
    explanation: "Fare rumore = make noise. Con is serve la forma -ing: making noise.",
    notes: {
      "doing": "Rumore si 'produce': make noise, non do.",
      "make": "Giusto il verbo, ma dopo is serve la forma -ing: making."
    },
    it: "Il cane dei vicini fa troppo rumore e non riesco a dormire!" },

  /* ============================== dependent_prepositions ============================== */
  { id: "dp_001", topic: "dependent_prepositions", difficulty: 1, type: "mc", group: "dp_adj_prep",
    prompt: "My brother is really good ___ maths.",
    options: ["at", "in", "on"],
    answers: ["at"],
    explanation: "Essere bravo in qualcosa = be good AT something.",
    notes: {
      "in": "In italiano 'bravo in', ma in inglese si dice good AT.",
      "on": "Good on non si usa in questo senso: si dice good at."
    },
    it: "Mio fratello è davvero bravo in matematica." },

  { id: "dp_002", topic: "dependent_prepositions", difficulty: 1, type: "mc", group: "dp_adj_prep",
    prompt: "Are you interested ___ history?",
    options: ["in", "at", "for"],
    answers: ["in"],
    explanation: "Essere interessato a qualcosa = be interested IN something.",
    notes: {
      "at": "At si usa con good/bad (good at). Con interested serve in.",
      "for": "Interested for non esiste: si dice interested in."
    },
    it: "Ti interessa la storia?" },

  { id: "dp_003", topic: "dependent_prepositions", difficulty: 1, type: "mc", group: "dp_adj_prep",
    prompt: "My little sister is afraid ___ spiders.",
    options: ["of", "from", "at"],
    answers: ["of"],
    explanation: "Avere paura di qualcosa = be afraid OF something.",
    notes: {
      "from": "From indica la provenienza (da dove vieni). Con afraid si usa of.",
      "at": "Afraid at non si dice: è afraid of."
    },
    it: "La mia sorellina ha paura dei ragni." },

  { id: "dp_004", topic: "dependent_prepositions", difficulty: 1, type: "mc", group: "dp_verb_prep",
    prompt: "Our picnic depends ___ the weather.",
    options: ["on", "from", "of"],
    answers: ["on"],
    explanation: "Dipendere da = depend ON. La preposizione è diversa dall'italiano!",
    notes: {
      "from": "Errore tipico: 'dipende DA' fa pensare a from, ma in inglese è depend ON.",
      "of": "Depend of non esiste: si dice depend on."
    },
    it: "Il nostro picnic dipende dal tempo." },

  { id: "dp_005", topic: "dependent_prepositions", difficulty: 1, type: "mc", group: "dp_verb_prep",
    prompt: "Who does this phone belong ___?",
    options: ["to", "of", "at"],
    answers: ["to"],
    explanation: "Appartenere a qualcuno = belong TO someone.",
    notes: {
      "of": "Of si usa per il possesso con i nomi (the phone of…), ma il verbo belong vuole to.",
      "at": "Belong at non si usa: è belong to."
    },
    it: "Di chi è questo telefono?" },

  { id: "dp_006", topic: "dependent_prepositions", difficulty: 1, type: "mc", group: "dp_adj_tricky",
    prompt: "My aunt is married ___ a Scottish man.",
    options: ["to", "with", "at"],
    answers: ["to"],
    explanation: "Essere sposato con qualcuno = be married TO someone.",
    notes: {
      "with": "Errore tipico: 'sposata CON' fa pensare a with, ma in inglese è married TO.",
      "at": "Married at non si usa per la persona: married to."
    },
    it: "Mia zia è sposata con uno scozzese." },

  { id: "dp_007", topic: "dependent_prepositions", difficulty: 2, type: "gap", group: "dp_adj_prep",
    prompt: "I'm tired ___ this song: they play it on the radio all the time!",
    answers: ["of"],
    explanation: "Essere stufo di qualcosa = be tired OF something.",
    notes: {
      "with": "Tired with è raro e suona strano: per 'stufo di' si dice tired of.",
      "from": "Tired from vuol dire 'stanco a causa di' (tired from running), non 'stufo di'."
    },
    it: "Sono stufo di questa canzone: la passano sempre alla radio!" },

  { id: "dp_008", topic: "dependent_prepositions", difficulty: 2, type: "gap", group: "dp_verb_prep",
    prompt: "I'm looking ___ my keys. Have you seen them?",
    answers: ["for"],
    explanation: "Cercare qualcosa = look FOR something.",
    notes: {
      "at": "Look at = guardare. Qui le chiavi le stai cercando: look for.",
      "after": "Look after = prendersi cura di (look after a baby).",
      "to": "Look to non vuol dire cercare: si dice look for."
    },
    it: "Sto cercando le chiavi. Le hai viste?" },

  { id: "dp_009", topic: "dependent_prepositions", difficulty: 2, type: "mc", group: "dp_adj_tricky",
    prompt: "Why are you angry ___ me? What have I done?",
    options: ["with", "about", "to"],
    answers: ["with"],
    explanation: "Arrabbiato con una persona = angry WITH someone. Con una cosa si usa about.",
    notes: {
      "about": "About si usa per una cosa (angry about the result). Per una persona: angry with.",
      "to": "Angry to non si usa."
    },
    it: "Perché sei arrabbiato con me? Che cosa ho fatto?" },

  { id: "dp_010", topic: "dependent_prepositions", difficulty: 2, type: "mc", group: "dp_arrive",
    prompt: "We arrived ___ London at ten o'clock at night.",
    options: ["in", "at", "to"],
    answers: ["in"],
    explanation: "Arrive IN + città o paese (arrive in London, arrive in Italy).",
    notes: {
      "at": "At si usa con un luogo preciso (arrive at the station, at school). Con una città: in.",
      "to": "Errore molto comune: arrive non vuole mai to. Si dice arrive in o arrive at."
    },
    it: "Siamo arrivati a Londra alle dieci di sera." },

  { id: "dp_011", topic: "dependent_prepositions", difficulty: 2, type: "gap", group: "dp_arrive",
    prompt: "We arrived ___ school late because of the traffic.",
    answers: ["at"],
    explanation: "Arrive AT + luogo preciso (school, the station, the cinema).",
    notes: {
      "to": "Arrive non vuole mai to: si dice arrive at school.",
      "in": "In si usa con città e paesi (arrive in Rome). Con school: at."
    },
    it: "Siamo arrivati a scuola in ritardo per il traffico." },

  { id: "dp_012", topic: "dependent_prepositions", difficulty: 2, type: "order", group: "dp_look_forward",
    prompt: "Riordina le parole: «Non vedo l'ora di vedere i miei cugini.»",
    answers: ["I'm looking forward to seeing my cousins."],
    explanation: "Non vedere l'ora di = look forward TO + verbo in -ing: looking forward to seeing.",
    it: "Non vedo l'ora di vedere i miei cugini." },

  { id: "dp_013", topic: "dependent_prepositions", difficulty: 3, type: "translate", group: "dp_verb_prep",
    prompt: "Dipende da te.",
    answers: ["It depends on you.", "That depends on you.", "It's up to you."],
    explanation: "Dipendere da = depend ON: It depends on you.",
    notes: {
      "It depends from you.": "Errore tipico: 'dipende DA' in inglese è depends ON.",
      "It depends of you.": "Depend of non esiste: depends on.",
      "It depend on you.": "Giusta la preposizione! Ma con it serve la -s: it depends."
    } },

  { id: "dp_014", topic: "dependent_prepositions", difficulty: 3, type: "translate", group: "dp_adj_tricky",
    prompt: "Mio fratello è molto diverso da me.",
    answers: ["My brother is very different from me.", "My brother is very different to me.", "My brother is really different from me.", "My brother is really different to me."],
    explanation: "Diverso da = different FROM (in inglese britannico si sente anche different to).",
    notes: {
      "My brother is very different of me.": "Different of non si dice: different from.",
      "My brother is very different by me.": "By non si usa con different: different from.",
      "My brother is very different than me.": "Different than è soprattutto americano: in inglese britannico si dice different from."
    } },

  { id: "dp_015", topic: "dependent_prepositions", difficulty: 3, type: "error", group: "dp_verb_prep",
    prompt: "Who is going to pay the pizzas?",
    wrong: "pay the",
    answers: ["Who is going to pay for the pizzas?"],
    explanation: "Pagare qualcosa che compri = pay FOR something (pay for the pizzas). Senza for si paga la persona o il conto (pay the bill)." },

  { id: "dp_016", topic: "dependent_prepositions", difficulty: 3, type: "error", group: "dp_look_forward",
    prompt: "I'm looking forward to see you at the weekend.",
    wrong: "to see",
    answers: ["I'm looking forward to seeing you at the weekend."],
    explanation: "In look forward to, il to è una preposizione: dopo va il verbo in -ing (seeing), non la forma base." },

  { id: "dp_017", topic: "dependent_prepositions", difficulty: 3, type: "error", group: "dp_adj_prep",
    prompt: "Sara is very good in drawing.",
    wrong: "in",
    answers: ["Sara is very good at drawing."],
    explanation: "Bravo in qualcosa = good AT something. Dopo at il verbo va in -ing: good at drawing." },

  { id: "dp_018", topic: "dependent_prepositions", difficulty: 3, type: "gap", group: "dp_verb_prep",
    prompt: "What are you thinking ___? You look worried.",
    answers: ["about", "of"],
    explanation: "Pensare a qualcosa = think ABOUT (o think of) something.",
    notes: {
      "to": "Errore tipico: 'pensare A' fa pensare a to, ma in inglese è think about / think of.",
      "on": "Think on non si usa in questo senso: think about."
    },
    it: "A cosa stai pensando? Sembri preoccupato." }
], 'vocab');
