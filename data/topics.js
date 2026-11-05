/* Catalogo degli argomenti.
 * level: A1 | A2 | B1 | B1+     area: grammar | vocab | reading
 * rule: la regola in italiano (mostrata quando si sbaglia)   examples: frasi modello
 * it: confronto con l'italiano (errori tipici di chi parla italiano)   prereq: argomenti da sapere prima
 */
EC.addTopics([
  /* ============================== A1 ============================== */
  {
    id: 'be', level: 'A1', area: 'grammar', title: 'Il verbo to be',
    rule: 'Forme: I am, you are, he/she/it is, we/you/they are. Negativa: aggiungi not (I am not / isn\'t / aren\'t). Domanda: inverti verbo e soggetto (Are you ready? Is she at home?).',
    examples: ['I am fourteen.', 'They aren\'t at school today.', 'Is your sister hungry?'],
    it: 'Per età, fame, sete, freddo, caldo e paura l\'inglese usa to be, non to have: I am 14 (NON "I have 14 years"), I\'m hungry, I\'m cold. Il soggetto va sempre scritto: It is late (NON "Is late").',
    prereq: []
  },
  {
    id: 'have_got', level: 'A1', area: 'grammar', title: 'have got / has got',
    rule: 'Si usa per possesso, parentela e aspetto fisico. I/you/we/they have got; he/she/it has got. Negativa: haven\'t got / hasn\'t got. Domanda: Have you got…? Has he got…? Risposte brevi: Yes, I have. / No, she hasn\'t.',
    examples: ['She has got two brothers.', 'We haven\'t got a car.', 'Have you got a pen?'],
    it: 'Con he/she/it si usa has (non have). Nella domanda si inverte solo have/has: Has she got…? (NON "Does she has got").',
    prereq: ['be']
  },
  {
    id: 'plurals', level: 'A1', area: 'grammar', title: 'I plurali dei nomi',
    rule: 'Di solito +s (book → books). Dopo -s, -sh, -ch, -x e molti -o: +es (bus → buses, watch → watches, potato → potatoes). Consonante + y → -ies (city → cities), ma vocale + y → +s (boy → boys). Molti -f/-fe → -ves (knife → knives). Irregolari: man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth, mouse → mice, fish → fish, sheep → sheep.',
    examples: ['Two children are playing.', 'I have got three boxes.', 'People are friendly here.'],
    it: 'In inglese gli aggettivi NON hanno il plurale: red cars (NON "reds cars"). People è già plurale: people are (NON "people is").',
    prereq: []
  },
  {
    id: 'articles_a_an', level: 'A1', area: 'grammar', title: 'Articoli a / an',
    rule: 'Si usa a davanti a un SUONO consonantico e an davanti a un SUONO vocalico. Conta la pronuncia, non la lettera: an hour (la h non si pronuncia), a university e a uniform (si pronunciano "iu…"), an umbrella, an orange.',
    examples: ['an apple', 'a university', 'an hour', 'She is a doctor.'],
    it: 'Con le professioni l\'inglese vuole l\'articolo: She is a teacher (in italiano "È insegnante"). A/an si usa solo al singolare: NON "a books".',
    prereq: []
  },
  {
    id: 'pronouns', level: 'A1', area: 'grammar', title: 'Pronomi soggetto e complemento',
    rule: 'Soggetto (prima del verbo): I, you, he, she, it, we, they. Complemento (dopo un verbo o una preposizione): me, you, him, her, it, us, them. Esempio: She likes him. He likes her. Come with us!',
    examples: ['Can you help me?', 'I don\'t know them.', 'This present is for her.'],
    it: 'In inglese il pronome soggetto non si omette mai: She is tired (NON "Is tired"). E il complemento va dopo il verbo: I see him (NON "I him see").',
    prereq: []
  },
  {
    id: 'possessives', level: 'A1', area: 'grammar', title: 'Possessivi e genitivo sassone (\'s)',
    rule: 'Aggettivi possessivi: my, your, his (di lui), her (di lei), its (di una cosa/animale), our, their. Il possessivo dipende da CHI possiede, non dalla cosa posseduta. Niente articolo davanti: my book. Genitivo sassone: Tom\'s bike, my sister\'s room; plurale in -s: my parents\' house; plurale irregolare: the children\'s toys.',
    examples: ['Marco loves his mother.', 'Anna is with her father.', 'This is my brother\'s phone.'],
    it: 'In italiano "suo" non dice se il possessore è maschio o femmina; in inglese sì: Marco and his sister / Anna and her brother. Non si dice "the my book" né "the car of Tom": si dice my book, Tom\'s car.',
    prereq: ['pronouns']
  },
  {
    id: 'there_is', level: 'A1', area: 'grammar', title: 'There is / there are',
    rule: 'There is + nome singolare o non numerabile; there are + nome plurale. Negativa: there isn\'t / there aren\'t (any). Domanda: Is there…? Are there…? Risposte brevi: Yes, there is. / No, there aren\'t.',
    examples: ['There is a park near my house.', 'There are twenty students in my class.', 'Is there any milk?'],
    it: '"C\'è" e "ci sono" si traducono con there is / there are, non con "it is" o "is there" nelle frasi affermative.',
    prereq: ['be']
  },
  {
    id: 'present_simple', level: 'A1', area: 'grammar', title: 'Present simple',
    rule: 'Si usa per abitudini, routine e fatti sempre veri. Con he/she/it il verbo prende -s (plays), -es dopo -s, -sh, -ch, -x, -o (watches, goes), -ies dopo consonante + y (studies); have → has. Negativa: don\'t / doesn\'t + verbo base. Domanda: Do / Does + soggetto + verbo base. Dopo does/doesn\'t il verbo NON prende la -s.',
    examples: ['My dad works in a bank.', 'She doesn\'t like fish.', 'Does he play football?'],
    it: 'L\'errore più comune è dimenticare la -s alla terza persona ("he play") oppure metterla due volte ("does he plays").',
    prereq: ['pronouns']
  },
  {
    id: 'freq_adverbs', level: 'A1', area: 'grammar', title: 'Avverbi di frequenza',
    rule: 'always, usually, often, sometimes, rarely/hardly ever, never. Vanno PRIMA del verbo principale (I often play tennis) ma DOPO il verbo to be (She is always late). Never ha già valore negativo: I never eat meat (NON "I don\'t never").',
    examples: ['We usually have dinner at eight.', 'He is never on time.', 'Do you often go to the cinema?'],
    it: 'In italiano l\'avverbio spesso va dopo il verbo ("gioco spesso"); in inglese va prima: I often play.',
    prereq: ['present_simple', 'be']
  },
  {
    id: 'can', level: 'A1', area: 'grammar', title: 'Can / can\'t',
    rule: 'Can + verbo base esprime capacità, possibilità e permesso. È uguale per tutte le persone (he can, NON "he cans"), senza to dopo (can swim, NON "can to swim"). Negativa: can\'t / cannot. Domanda: Can you…? Risposta breve: Yes, I can. / No, I can\'t.',
    examples: ['I can speak two languages.', 'She can\'t come tomorrow.', 'Can I open the window?'],
    it: 'Nella domanda non serve do: Can you swim? (NON "Do you can swim?").',
    prereq: ['pronouns']
  },
  {
    id: 'prep_time', level: 'A1', area: 'grammar', title: 'Preposizioni di tempo: in / on / at',
    rule: 'AT con orari e momenti precisi: at 7 o\'clock, at night, at the weekend, at Christmas. ON con giorni e date: on Monday, on 3rd May, on my birthday, on Christmas Day. IN con periodi più lunghi: in July, in 2010, in summer, in the morning/afternoon/evening.',
    examples: ['School starts at eight.', 'I see my grandparents on Sundays.', 'My birthday is in March.'],
    it: 'Attenzione: in the morning ma at night; in italiano si dice "di notte", "di mattina" senza differenza.',
    prereq: []
  },
  {
    id: 'wh_questions', level: 'A1', area: 'grammar', title: 'Domande con What, Where, Who…',
    rule: 'What (che cosa), Where (dove), When (quando), Who (chi), Why (perché), How (come), How old (quanti anni), How much (quanto, non numerabile), How many (quanti, numerabile), Which (quale tra pochi), Whose (di chi). Ordine: parola interrogativa + ausiliare (do/does/did/is/are/can…) + soggetto + verbo.',
    examples: ['Where do you live?', 'How old is your brother?', 'What time does the film start?'],
    it: 'Per l\'età: How old are you? (NON "How many years have you?"). Non dimenticare l\'ausiliare: Where do you live? (NON "Where you live?").',
    prereq: ['present_simple', 'be']
  },
  {
    id: 'vocab_basic', level: 'A1', area: 'vocab', title: 'Lessico di base',
    rule: 'Parole di tutti i giorni: famiglia, scuola, casa, cibo, routine, numeri, giorni, mesi, colori, corpo, tempo atmosferico. Impara le parole dentro una frase, non da sole.',
    examples: ['My aunt is my mother\'s sister.', 'Wednesday comes after Tuesday.'],
    it: 'In inglese i giorni e i mesi si scrivono con la lettera maiuscola: Monday, July.',
    prereq: []
  },
  {
    id: 'reading_a1', level: 'A1', area: 'reading', title: 'Lettura A1',
    rule: 'Leggi il testo una prima volta per capire l\'idea generale, poi cerca nel testo la frase che contiene la risposta. Sottolinea mentalmente le parole chiave della domanda.',
    examples: [], it: '', prereq: []
  },

  /* ============================== A2 ============================== */
  {
    id: 'present_continuous', level: 'A2', area: 'grammar', title: 'Present continuous',
    rule: 'am/is/are + verbo-ing per azioni in corso ADESSO o temporanee (this week). Ortografia: make → making (cade la -e), run → running, swim → swimming (raddoppia la consonante), lie → lying. Negativa: isn\'t / aren\'t + -ing. Domanda: Is she…ing? Are you…ing?',
    examples: ['Look! It\'s raining.', 'I\'m not watching TV, I\'m studying.', 'What are you doing?'],
    it: 'Non dimenticare il verbo essere: She is reading (NON "She reading").',
    prereq: ['be', 'present_simple']
  },
  {
    id: 'ps_vs_pc', level: 'A2', area: 'grammar', title: 'Present simple o present continuous?',
    rule: 'Present simple = abitudini, cose sempre vere (every day, usually, often, on Mondays). Present continuous = azione in corso ora o temporanea (now, at the moment, today, Look!, Listen!). I verbi di stato (like, love, hate, want, know, understand, believe, need, belong) di solito NON si usano al continuous: I know (NON "I am knowing").',
    examples: ['I usually walk to school, but today I\'m taking the bus.', 'She plays the piano every day. Listen! She\'s playing now.'],
    it: 'In italiano "faccio i compiti" vale sia per l\'abitudine sia per "adesso"; in inglese bisogna scegliere: I do my homework every day / I\'m doing my homework now.',
    prereq: ['present_simple', 'present_continuous']
  },
  {
    id: 'past_simple', level: 'A2', area: 'grammar', title: 'Past simple',
    rule: 'Azioni concluse in un momento passato (yesterday, last week, two days ago, in 2020). Verbi regolari: +ed (play → played; stop → stopped; study → studied; like → liked). Verbi irregolari da imparare: go → went, see → saw, buy → bought… Negativa: didn\'t + verbo base. Domanda: Did + soggetto + verbo base. Dopo did/didn\'t il verbo torna alla forma base.',
    examples: ['We went to London last summer.', 'I didn\'t see the match.', 'Did you buy the tickets?'],
    it: 'Errore tipico: "Did you went?" o "I didn\'t went": dopo did il verbo è sempre base (Did you go? / I didn\'t go). "Fa" nel senso di tempo passato si dice ago: two years ago.',
    prereq: ['present_simple']
  },
  {
    id: 'past_continuous', level: 'A2', area: 'grammar', title: 'Past continuous',
    rule: 'was/were + verbo-ing per un\'azione in corso in un momento del passato. Spesso insieme al past simple: l\'azione lunga (past continuous) viene interrotta da un\'azione breve (past simple). While + past continuous, when + past simple.',
    examples: ['I was having a shower when the phone rang.', 'At 8 pm we were watching a film.', 'While she was walking home, it started to rain.'],
    it: 'Corrisponde spesso all\'imperfetto italiano "stavo facendo / facevo". I/he/she/it was; you/we/they were.',
    prereq: ['past_simple', 'present_continuous']
  },
  {
    id: 'countable', level: 'A2', area: 'grammar', title: 'Numerabili e non numerabili: some/any, much/many',
    rule: 'Nomi numerabili (apple, friend) hanno il plurale; non numerabili (water, money, music, bread) no. Some nelle frasi affermative e nelle offerte/richieste (Would you like some tea?); any nelle negative e nelle domande. Many con i numerabili plurali, much con i non numerabili (soprattutto in negative e domande); a lot of va bene con entrambi. How many…? / How much…?',
    examples: ['There isn\'t any milk.', 'How many brothers have you got?', 'I haven\'t got much time.'],
    it: 'Sono NON numerabili in inglese (a differenza dell\'italiano): information, advice, homework, news, furniture, luggage, hair (capelli). Quindi: some information (NON "informations"), The news is good.',
    prereq: ['plurals', 'there_is']
  },
  {
    id: 'comparatives', level: 'A2', area: 'grammar', title: 'Comparativi e superlativi',
    rule: 'Aggettivi corti: +er / the +est (tall → taller → the tallest; big → bigger → the biggest; happy → happier → the happiest). Aggettivi lunghi: more / the most (more expensive, the most interesting). Irregolari: good → better → the best; bad → worse → the worst; far → further → the furthest. Il secondo termine si introduce con than. Uguaglianza: as … as.',
    examples: ['My brother is taller than me.', 'This is the most boring film I\'ve ever seen.', 'She is as clever as her sister.'],
    it: '"Più … di" = … than (NON "of" o "that"). Non si mettono insieme more e -er: bigger (NON "more bigger"), better (NON "more good"). "Il più … del mondo" = the … in the world (NON "of the world").',
    prereq: []
  },
  {
    id: 'future', level: 'A2', area: 'grammar', title: 'Il futuro: will, going to, present continuous',
    rule: 'Will + verbo base: previsioni/opinioni (I think it will rain), decisioni prese sul momento (I\'ll help you), promesse. Be going to + verbo base: intenzioni e piani già decisi (I\'m going to study medicine) e previsioni basate su ciò che si vede (Look at those clouds! It\'s going to rain). Present continuous: appuntamenti già fissati (I\'m meeting Tom at six).',
    examples: ['I\'ll call you tonight.', 'We are going to visit our grandparents this weekend.', 'She\'s flying to Paris tomorrow.'],
    it: 'Dopo will non si mette to: I will go (NON "I will to go"). Negativa: won\'t (= will not).',
    prereq: ['present_continuous', 'be']
  },
  {
    id: 'modals_obligation', level: 'A2', area: 'grammar', title: 'Must, have to, should',
    rule: 'Must + base: obbligo sentito da chi parla o regole scritte. Have to: obbligo che viene dall\'esterno (he has to, did you have to). Mustn\'t = è VIETATO. Don\'t have to = NON è NECESSARIO. Should / shouldn\'t + base: consiglio. Must e should non vogliono to e non prendono la -s.',
    examples: ['You mustn\'t use your phone in class.', 'We don\'t have to wear a uniform.', 'You should drink more water.'],
    it: 'Attenzione: mustn\'t e don\'t have to hanno significati molto diversi! Al passato must diventa had to: Yesterday I had to get up early.',
    prereq: ['present_simple']
  },
  {
    id: 'articles_the', level: 'A2', area: 'grammar', title: 'The o nessun articolo?',
    rule: 'The si usa con cose specifiche o già nominate, uniche (the sun, the internet) o con superlativi. Nessun articolo quando si parla in generale con nomi plurali o non numerabili (I love dogs, Music is important), con sport, pasti, lingue, materie (play football, have lunch, study English), con la maggior parte dei paesi e città, e in espressioni come at home, at school, go to bed, by bus.',
    examples: ['Life is beautiful.', 'I like cats.', 'The cat on the sofa is mine.', 'We have lunch at one.'],
    it: 'In italiano si dice "la vita è bella", "mi piace la musica", "gioco a calcio": in inglese NON si mette l\'articolo quando si parla in generale: Life is beautiful, I like music, I play football.',
    prereq: ['articles_a_an']
  },
  {
    id: 'prep_place', level: 'A2', area: 'grammar', title: 'Preposizioni di luogo',
    rule: 'IN = dentro uno spazio, città e paesi (in the box, in Rome, in Italy). ON = su una superficie, sul piano di un edificio (on the table, on the wall, on the second floor). AT = un punto preciso o un luogo come "funzione" (at the bus stop, at school, at home, at the door). Altre: under, next to, between, opposite, behind, in front of.',
    examples: ['The keys are on the table.', 'My aunt lives in London.', 'I\'ll meet you at the station.'],
    it: '"Sono a casa / a scuola" = I am at home / at school; "vivo a Roma" = I live in Rome (non "at Rome").',
    prereq: []
  },
  {
    id: 'false_friends', level: 'A2', area: 'vocab', title: 'Falsi amici',
    rule: 'Parole che sembrano italiane ma hanno un altro significato. Actually = in realtà (attualmente = currently/now). Sensible = assennato (sensibile = sensitive). Library = biblioteca (libreria = bookshop). Eventually = alla fine (eventualmente = possibly). Parents = genitori (parenti = relatives). Argument = litigio. Camera = macchina fotografica (camera = room/bedroom). Factory = fabbrica. Magazine = rivista. Pretend = fingere. Attend = frequentare. Novel = romanzo. Fabric = tessuto. Sympathetic = comprensivo.',
    examples: ['Actually, I don\'t agree.', 'I borrowed this book from the library.', 'All my relatives came to the party.'],
    it: 'Quando una parola inglese "suona" italiana, controlla: potrebbe essere un falso amico!',
    prereq: []
  },
  {
    id: 'make_do', level: 'A2', area: 'vocab', title: 'Collocazioni: make/do, say/tell e altre',
    rule: 'MAKE = creare/produrre: make a mistake, make a cake, make friends, make noise, make a decision, make money, make a phone call. DO = attività e lavori: do homework, do the shopping, do the washing-up, do exercise, do your best, do a favour, do a test. TELL + persona (tell me, tell her the truth, tell a story/joke); SAY + cosa (say hello, say something to someone). Altre: take a photo, have breakfast/a shower, explain something TO someone, listen TO, wait FOR, agree (verbo: I agree).',
    examples: ['I made a lot of mistakes in the test.', 'Can you tell me the time?', 'Please explain it to me.'],
    it: 'In italiano "fare" va bene per tutto, in inglese bisogna scegliere make o do. "Sono d\'accordo" = I agree (NON "I am agree"). "Spiegami" = Explain to me (NON "Explain me").',
    prereq: []
  },
  {
    id: 'reading_a2', level: 'A2', area: 'reading', title: 'Lettura A2',
    rule: 'Leggi prima le domande, poi il testo. Le risposte spesso usano sinonimi delle parole del testo: non cercare solo parole identiche.',
    examples: [], it: '', prereq: ['reading_a1']
  },

  /* ============================== B1 ============================== */
  {
    id: 'present_perfect', level: 'B1', area: 'grammar', title: 'Present perfect',
    rule: 'have/has + participio passato (played, gone, seen, been…). Si usa per esperienze nella vita (Have you ever been to London? I\'ve never eaten sushi), azioni appena avvenute (I\'ve just finished), con already (già) nelle affermative e yet (ancora / già) nelle negative e domande, e per azioni passate con effetto sul presente (I\'ve lost my keys).',
    examples: ['I have already done my homework.', 'Has she called you yet?', 'We\'ve never been to Spain.'],
    it: 'Non si usa con un momento passato preciso: I saw him yesterday (NON "I have seen him yesterday"). Just, already, never, ever vanno tra have e il participio.',
    prereq: ['past_simple']
  },
  {
    id: 'pp_vs_past', level: 'B1', area: 'grammar', title: 'Present perfect o past simple?',
    rule: 'Past simple: quando c\'è (o si sottintende) un momento passato FINITO: yesterday, last week, in 2019, two days ago, when I was a child, e nelle domande con When…?. Present perfect: quando il momento non è detto o il periodo non è ancora finito: ever, never, just, already, yet, today, this week, so far.',
    examples: ['I have visited Paris twice. I went there last in 2022.', 'When did you arrive? — I arrived an hour ago.'],
    it: 'In italiano il passato prossimo ("sono andato ieri") si usa anche con "ieri": in inglese con yesterday serve il past simple: I went yesterday.',
    prereq: ['present_perfect', 'past_simple']
  },
  {
    id: 'for_since', level: 'B1', area: 'grammar', title: 'For e since con il present perfect',
    rule: 'Per un\'azione iniziata nel passato e che continua ancora si usa il present perfect (o present perfect continuous) con FOR + durata (for two years, for a long time) oppure SINCE + punto di inizio (since 2019, since Monday, since I was ten). Domanda: How long have you…?',
    examples: ['I have lived here for five years.', 'She has known him since primary school.', 'How long have you had your dog?'],
    it: 'In italiano si usa il presente ("vivo qui da cinque anni"), in inglese NO: I have lived here for five years (NON "I live here since five years"). "Da" + durata = for, "da" + momento = since.',
    prereq: ['present_perfect']
  },
  {
    id: 'first_conditional', level: 'B1', area: 'grammar', title: 'Periodo ipotetico di primo tipo',
    rule: 'Situazioni reali o probabili nel futuro: If + present simple, will + verbo base. L\'ordine si può invertire: I\'ll stay at home if it rains (senza virgola). Unless = if … not. Lo stesso schema vale con when, as soon as, before, after per il futuro.',
    examples: ['If it rains, we will stay at home.', 'You won\'t pass unless you study.', 'I\'ll call you when I arrive.'],
    it: 'Dopo if NON si usa will anche se in italiano c\'è il futuro: If it rains… (NON "If it will rain"), proprio come "Quando arriverò" = When I arrive.',
    prereq: ['future', 'present_simple']
  },
  {
    id: 'gerund_infinitive', level: 'B1', area: 'grammar', title: 'Verbo + -ing o verbo + to?',
    rule: 'Vogliono -ing: enjoy, finish, mind, avoid, suggest, stop (= smettere), can\'t stand, keep, practise; like/love/hate di solito + -ing (I love reading). Vogliono to + base: want, decide, hope, plan, need, learn, promise, agree, would like, try (= cercare di). Dopo una PREPOSIZIONE si usa sempre -ing: good at swimming, interested in learning, before leaving, thank you for coming. Il gerundio può fare da soggetto: Swimming is good for you.',
    examples: ['I enjoy playing the guitar.', 'She decided to leave early.', 'I\'m interested in learning Japanese.'],
    it: 'In italiano dopo una preposizione si usa l\'infinito ("prima di uscire"), in inglese il -ing: before going out (NON "before to go out").',
    prereq: ['present_simple']
  },
  {
    id: 'relatives', level: 'B1', area: 'grammar', title: 'Pronomi relativi: who, which, that, where, whose',
    rule: 'WHO per persone, WHICH per cose e animali, THAT per persone o cose (nelle relative che identificano), WHERE per luoghi, WHOSE per il possesso (il cui / la cui). Quando il relativo è complemento oggetto si può omettere: The book (that) I read.',
    examples: ['The girl who sits next to me is Spanish.', 'This is the phone which I bought last week.', 'That\'s the café where we met.', 'He\'s the boy whose dad is a pilot.'],
    it: 'Non si ripete il soggetto o l\'oggetto dopo il relativo: The boy who lives here (NON "who he lives here"). "Che" per le persone non è which: the man who/that…',
    prereq: ['pronouns']
  },
  {
    id: 'passive', level: 'B1', area: 'grammar', title: 'La forma passiva',
    rule: 'Be (al tempo giusto) + participio passato. Presente: is/are made. Passato: was/were built. Futuro: will be sent. Present perfect: has/have been sold. Si usa quando è più importante l\'azione di chi la fa; chi fa l\'azione si introduce con by.',
    examples: ['English is spoken all over the world.', 'This bridge was built in 1890.', 'The letters will be sent tomorrow.'],
    it: 'Il participio dei verbi irregolari va imparato: write → written, build → built, make → made, speak → spoken. "Si parla inglese" = English is spoken.',
    prereq: ['present_simple', 'past_simple']
  },
  {
    id: 'dependent_prepositions', level: 'B1', area: 'vocab', title: 'Verbi e aggettivi + preposizione',
    rule: 'Molte parole vogliono una preposizione fissa: good at, bad at, interested in, afraid of, proud of, tired of, different from, married to, angry with (una persona) / about (una cosa), depend on, listen to, wait for, look for, belong to, arrive in (città/paese) / at (luogo preciso), think about/of, pay for, look forward to + -ing.',
    examples: ['She is good at maths.', 'It depends on the weather.', 'We arrived in Rome at midnight.'],
    it: 'Spesso la preposizione italiana non corrisponde: "dipende da" = depends ON, "sposato con" = married TO, "ascoltare la musica" = listen TO music.',
    prereq: []
  },
  {
    id: 'reading_b1', level: 'B1', area: 'reading', title: 'Lettura B1',
    rule: 'Alcune domande chiedono di dedurre (inferire) qualcosa che il testo non dice direttamente: cerca gli indizi e scegli la risposta che il testo sostiene meglio, non quella che "suona" giusta.',
    examples: [], it: '', prereq: ['reading_a2']
  },

  /* ============================== B1+ ============================== */
  {
    id: 'used_to', level: 'B1+', area: 'grammar', title: 'Used to',
    rule: 'Used to + verbo base indica abitudini o stati del passato che oggi non ci sono più: I used to play with dolls. Negativa: didn\'t use to (senza -d). Domanda: Did you use to…? Per il presente non si usa: si dice I usually…',
    examples: ['I used to live in Milan.', 'He didn\'t use to like vegetables.', 'Did you use to have long hair?'],
    it: 'Corrisponde all\'imperfetto italiano di abitudine ("da piccolo giocavo…"). Non confondere con be used to + -ing (= essere abituato a).',
    prereq: ['past_simple']
  },
  {
    id: 'past_perfect', level: 'B1+', area: 'grammar', title: 'Past perfect',
    rule: 'Had + participio passato: azione avvenuta PRIMA di un\'altra azione passata. When I arrived at the station, the train had already left (prima è partito il treno, poi sono arrivato io). Spesso con already, just, before, after, by the time.',
    examples: ['She had never seen the sea before that holiday.', 'After we had eaten, we went for a walk.'],
    it: 'Corrisponde al trapassato prossimo italiano ("era già partito"). È uguale per tutte le persone: I/he/they had gone.',
    prereq: ['past_simple', 'present_perfect']
  },
  {
    id: 'second_conditional', level: 'B1+', area: 'grammar', title: 'Periodo ipotetico di secondo tipo',
    rule: 'Situazioni immaginarie o poco probabili: If + past simple, would + verbo base. If I had more time, I would learn the guitar. Con to be si usa spesso were per tutte le persone: If I were you, I would… (per dare consigli).',
    examples: ['If I won the lottery, I would travel the world.', 'What would you do if you saw a ghost?', 'If I were you, I\'d talk to her.'],
    it: 'In italiano: "se avessi… farei…": congiuntivo → past simple, condizionale → would. Non mettere would nella frase con if: If I had (NON "If I would have").',
    prereq: ['first_conditional', 'past_simple']
  },
  {
    id: 'reported_speech', level: 'B1+', area: 'grammar', title: 'Discorso indiretto',
    rule: 'Quando riferiamo le parole di qualcuno con un verbo al passato (said, told), i tempi "fanno un passo indietro": am/is → was, present simple → past simple, will → would, can → could, past simple → past perfect. Cambiano anche pronomi ed espressioni di tempo (tomorrow → the next day, here → there). Tell + persona (He told me…), say senza persona (He said…). Nelle domande indirette l\'ordine è quello della frase affermativa: She asked me where I lived.',
    examples: ['"I\'m tired." → She said (that) she was tired.', '"I will help you." → He told me he would help me.', '"Where do you live?" → She asked where I lived.'],
    it: 'Non si dice "He said me": si dice He told me oppure He said to me.',
    prereq: ['past_simple', 'past_perfect']
  },
  {
    id: 'modals_deduction', level: 'B1+', area: 'grammar', title: 'Deduzioni: must, might, can\'t',
    rule: 'Per fare ipotesi sul presente: MUST = sono quasi sicuro che SÌ (He must be tired, he worked all day). CAN\'T = sono quasi sicuro che NO (That can\'t be Tom, he\'s in London). MIGHT / MAY / COULD = forse (She might be at home). Sono seguiti dal verbo base.',
    examples: ['You must be hungry after that long walk.', 'It can\'t be true!', 'Take an umbrella, it might rain.'],
    it: 'Il contrario di must (deduzione) è can\'t, non mustn\'t: That can\'t be right (NON "That mustn\'t be right").',
    prereq: ['modals_obligation', 'can']
  },
  {
    id: 'phrasal_verbs', level: 'B1+', area: 'vocab', title: 'Phrasal verbs comuni',
    rule: 'Verbo + particella con un significato nuovo: get up (alzarsi), wake up (svegliarsi), look for (cercare), look after (prendersi cura di), give up (smettere/arrendersi), find out (scoprire), turn on/off (accendere/spegnere), put on (indossare), take off (togliersi; decollare), pick up (raccogliere; passare a prendere), run out of (finire, rimanere senza), get on with (andare d\'accordo con), carry on (continuare), set off (partire), break down (guastarsi), look forward to (non vedere l\'ora di).',
    examples: ['I get up at seven.', 'Can you turn off the light?', 'We ran out of milk.'],
    it: 'Il significato spesso non si capisce dalle singole parole: impara il phrasal verb come una parola sola, dentro una frase.',
    prereq: []
  },
  {
    id: 'reading_b1p', level: 'B1+', area: 'reading', title: 'Lettura B1+',
    rule: 'Nei testi più lunghi individua il paragrafo giusto, poi rileggi con attenzione. Fai caso a parole come however, although, but: spesso cambiano il senso della frase.',
    examples: [], it: '', prereq: ['reading_b1']
  }
]);
