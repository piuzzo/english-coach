/* Testi di lettura (comprensione) — livelli A1, A2, B1, B1+.
 * Formato: vedi docs/FORMATO-ESERCIZI.md, sezione "Testi di lettura".
 */
EC.addPassages([

  /* ============================== A1 ============================== */
  {
    id: "rd_a1_01", topic: "reading_a1", title: "Hello from Brighton",
    text: "Hi Luca,\n\nMy name is Jake and I am your new e-pal. I am fourteen years old and I live in Brighton, a town by the sea in the south of England. I have got one sister, Amy. She is ten.\n\nI go to Brighton Park School. My favourite subject is science, but I don't like maths. After school I play basketball with my friends. I can swim very well, and in summer I swim in the sea every weekend.\n\nI have got a dog called Biscuit. He is brown and very funny. What about you? Have you got any pets? Please write soon!\n\nJake",
    questions: [
      { q: "How old is Jake?", options: ["10", "12", "14"], answer: "14", difficulty: 1,
        explanation: "Il testo dice “I am fourteen years old”: Jake ha 14 anni.",
        notes: {
          "10": "Dieci anni è l'età di sua sorella Amy (“She is ten”), non di Jake.",
          "12": "Il numero 12 non compare nel testo: Jake dice “I am fourteen”."
        } },
      { q: "Where is Brighton?", options: ["In the north of England", "Near the sea", "In Italy"], answer: "Near the sea", difficulty: 2,
        explanation: "Il testo dice “Brighton, a town by the sea”: “by the sea” significa “vicino al mare”, cioè near the sea.",
        notes: {
          "In the north of England": "Attenzione: il testo dice “in the south of England” (sud), non north (nord).",
          "In Italy": "In Italia vive Luca, chi riceve l'email. Brighton è in Inghilterra."
        } },
      { q: "Jake likes maths.", options: ["True", "False"], answer: "False", difficulty: 1,
        explanation: "Jake scrive “My favourite subject is science, but I don't like maths”: la matematica non gli piace.",
        notes: {
          "True": "La sua materia preferita è science; per maths dice “I don't like”, quindi l'affermazione è falsa."
        } },
      { q: "What does Jake do at the weekend in summer?", options: ["He swims in the sea", "He plays basketball at school", "He walks his dog in the park"], answer: "He swims in the sea", difficulty: 1,
        explanation: "Il testo dice “in summer I swim in the sea every weekend”.",
        notes: {
          "He plays basketball at school": "Jake gioca a basket “after school” (dopo la scuola), non nel fine settimana d'estate.",
          "He walks his dog in the park": "Jake ha un cane, Biscuit, ma il testo non dice che lo porta al parco."
        } },
      { q: "Why does Jake write this email?", options: ["To introduce himself to a new e-pal", "To invite Luca to Brighton", "To ask Luca for help with maths"], answer: "To introduce himself to a new e-pal", difficulty: 3,
        explanation: "Jake scrive “I am your new e-pal” e poi racconta chi è (età, famiglia, scuola, hobby): lo scopo è presentarsi al nuovo amico di penna.",
        notes: {
          "To invite Luca to Brighton": "Jake descrive Brighton, ma non invita Luca ad andarci.",
          "To ask Luca for help with maths": "Jake dice solo che la matematica non gli piace; non chiede aiuto. Le sue domande sono sugli animali di Luca (“Have you got any pets?”)."
        } }
    ]
  },
  {
    id: "rd_a1_02", topic: "reading_a1", title: "School trip",
    text: "SCHOOL TRIP – CLASS 1B\n\nOn Friday 14th March, Class 1B goes to the Science Museum in Milan. The bus leaves school at 8 o'clock. Please be at the school gate at 7.45.\n\nThe trip costs 15 euros. Give the money to Mrs Rossi before Wednesday.\n\nAt the museum there is a big room about space, and you can try a robot game. Lunch is in the museum park, so bring a packed lunch and a bottle of water. You can't buy food there.\n\nWe come back to school at 4 o'clock. Wear comfortable shoes!\n\nMrs Rossi, English teacher",
    questions: [
      { q: "What time must students be at the school gate?", options: ["7.45", "8.00", "4.00"], answer: "7.45", difficulty: 1,
        explanation: "L'avviso dice “Please be at the school gate at 7.45”.",
        notes: {
          "8.00": "Alle 8 parte il pullman (“The bus leaves school at 8 o'clock”), ma gli studenti devono essere al cancello prima, alle 7.45.",
          "4.00": "Alle 4 la classe torna a scuola (“We come back to school at 4 o'clock”)."
        } },
      { q: "Who do students give the money to?", options: ["Mrs Rossi", "The bus driver", "The museum"], answer: "Mrs Rossi", difficulty: 1,
        explanation: "Il testo dice “Give the money to Mrs Rossi before Wednesday”.",
        notes: {
          "The bus driver": "L'autista del pullman non viene mai nominato.",
          "The museum": "I soldi non si pagano al museo, ma all'insegnante, Mrs Rossi."
        } },
      { q: "Students can buy lunch at the museum.", options: ["True", "False"], answer: "False", difficulty: 2,
        explanation: "Il testo dice “You can't buy food there”: al museo non si può comprare da mangiare.",
        notes: {
          "True": "Attenzione al “can't”: “You can't buy food there” vuol dire che NON si può comprare cibo."
        } },
      { q: "What do students need to bring?", options: ["Food and a drink from home", "Their school books", "15 euros for the museum shop"], answer: "Food and a drink from home", difficulty: 2,
        explanation: "Il testo dice “bring a packed lunch and a bottle of water”: un pranzo al sacco (food) e una bottiglia d'acqua (a drink).",
        notes: {
          "Their school books": "I libri di scuola non sono nominati nell'avviso.",
          "15 euros for the museum shop": "I 15 euro sono il costo della gita e vanno dati a Mrs Rossi prima di mercoledì; il negozio del museo non è nominato."
        } },
      { q: "Why does Mrs Rossi say “Wear comfortable shoes”?", options: ["Because students will walk a lot", "Because the bus is very small", "Because it is very cold in March"], answer: "Because students will walk a lot", difficulty: 3,
        explanation: "Il testo non lo dice in modo diretto, ma la classe visita un museo con sale grandi (“a big room about space”) e pranza nel parco: si cammina molto, quindi servono scarpe comode.",
        notes: {
          "Because the bus is very small": "La grandezza del pullman non c'entra con le scarpe e non è mai nominata.",
          "Because it is very cold in March": "Il testo non parla del tempo; e per il freddo servirebbe una giacca, non scarpe comode."
        } }
    ]
  },
  {
    id: "rd_a1_03", topic: "reading_a1", title: "My Saturday",
    text: "Hi, I'm Giulia and this is my blog! I'm thirteen and I live in Bologna with my mum, my dad and my grandmother.\n\nEvery Saturday morning I go to the skate park with my cousin Marco. He is sixteen and he is very good. He can do a lot of tricks. I can't do tricks yet, but I practise every week. My skateboard is blue and yellow, my favourite colours.\n\nIn the afternoon I usually play video games or watch a film with my grandmother. She loves funny films! On Saturday evening we have pizza for dinner.\n\nWhat do you do on Saturdays? Write in the comments!",
    questions: [
      { q: "Who does Giulia go to the skate park with?", options: ["Her cousin", "Her grandmother", "Her dad"], answer: "Her cousin", difficulty: 1,
        explanation: "Il testo dice “I go to the skate park with my cousin Marco”.",
        notes: {
          "Her grandmother": "Con la nonna Giulia guarda i film nel pomeriggio, non va allo skate park.",
          "Her dad": "Il papà vive con lei, ma non va allo skate park con lei."
        } },
      { q: "Giulia can do a lot of tricks.", options: ["True", "False"], answer: "False", difficulty: 1,
        explanation: "Giulia scrive “I can't do tricks yet”. È suo cugino Marco che “can do a lot of tricks”.",
        notes: {
          "True": "Trappola: la frase “He can do a lot of tricks” parla di Marco (he), non di Giulia."
        } },
      { q: "What colour is Giulia's skateboard?", options: ["Blue and yellow", "Red and blue", "Yellow and green"], answer: "Blue and yellow", difficulty: 1,
        explanation: "Il testo dice “My skateboard is blue and yellow”.",
        notes: {
          "Red and blue": "Il rosso non è nominato: lo skateboard è blu e giallo.",
          "Yellow and green": "Il verde non è nominato: lo skateboard è blu e giallo."
        } },
      { q: "What kind of films does Giulia's grandmother like?", options: ["Comedies", "Horror films", "Sad films"], answer: "Comedies", difficulty: 2,
        explanation: "Il testo dice “She loves funny films!”: i film divertenti si chiamano comedies (commedie).",
        notes: {
          "Horror films": "I film dell'orrore non sono divertenti; il testo parla di “funny films”.",
          "Sad films": "“Sad” (triste) è il contrario di “funny” (divertente)."
        } },
      { q: "In “I can't do tricks yet”, the word “yet” tells us that Giulia…", options: ["hopes to do tricks in the future", "never wants to do tricks", "could do tricks in the past"], answer: "hopes to do tricks in the future", difficulty: 3,
        explanation: "“Not… yet” significa “non ancora”: adesso non ci riesce, ma pensa di riuscirci in futuro. Infatti aggiunge “but I practise every week”.",
        notes: {
          "never wants to do tricks": "Se non volesse mai farli, non si allenerebbe ogni settimana (“I practise every week”).",
          "could do tricks in the past": "“Yet” non parla del passato: indica qualcosa che non è ancora successo."
        } }
    ]
  },
  {
    id: "rd_a1_04", topic: "reading_a1", title: "Meet Ahmed",
    text: "Ahmed is fifteen and he plays football for the Torino under-16 team. We ask him some questions.\n\nWhat time do you get up? – I get up at half past six. I have breakfast and then I go to school by bus.\n\nWhen do you train? – I train four days a week, from five to seven in the evening. On Sundays we have a match.\n\nIs school difficult for you? – Sometimes, yes. I'm often tired in the evening, but I do my homework after dinner.\n\nWho is your hero? – My big brother, Yusuf. He is twenty and he plays for a team in France. He is very fast and he always helps me.",
    questions: [
      { q: "How does Ahmed go to school?", options: ["By bus", "On foot", "By car"], answer: "By bus", difficulty: 1,
        explanation: "Ahmed dice “then I go to school by bus”.",
        notes: {
          "On foot": "“On foot” vuol dire a piedi: il testo dice “by bus”.",
          "By car": "L'auto non è nominata: Ahmed va a scuola in autobus."
        } },
      { q: "How many days a week does Ahmed train?", options: ["Four", "Five", "Seven"], answer: "Four", difficulty: 1,
        explanation: "Ahmed dice “I train four days a week”.",
        notes: {
          "Five": "Trappola: “from five to seven” è l'orario (dalle cinque alle sette), non il numero di giorni.",
          "Seven": "Trappola: le sette è l'ora in cui finisce l'allenamento, non il numero di giorni."
        } },
      { q: "Ahmed never feels tired.", options: ["True", "False"], answer: "False", difficulty: 2,
        explanation: "Ahmed dice “I'm often tired in the evening”: è spesso stanco, quindi “never” (mai) è falso.",
        notes: {
          "True": "“Often” (spesso) è il contrario di “never” (mai): Ahmed è spesso stanco la sera."
        } },
      { q: "Who is Yusuf?", options: ["Ahmed's older brother", "Ahmed's coach", "A player in the Torino team"], answer: "Ahmed's older brother", difficulty: 2,
        explanation: "Ahmed dice “My big brother, Yusuf. He is twenty”: “big brother” vuol dire fratello maggiore (older brother).",
        notes: {
          "Ahmed's coach": "L'allenatore non è nominato: Yusuf è suo fratello.",
          "A player in the Torino team": "Yusuf gioca in una squadra in Francia (“he plays for a team in France”), non nel Torino."
        } },
      { q: "Why do you think Yusuf is Ahmed's hero?", options: ["He is a good footballer and he helps Ahmed", "He is Ahmed's teacher at school", "He lives with Ahmed in Turin"], answer: "He is a good footballer and he helps Ahmed", difficulty: 3,
        explanation: "Il testo dice “he plays for a team in France. He is very fast and he always helps me”: Yusuf è un calciatore bravo e aiuta Ahmed, per questo è il suo eroe.",
        notes: {
          "He is Ahmed's teacher at school": "Yusuf è il fratello di Ahmed, non un insegnante.",
          "He lives with Ahmed in Turin": "Yusuf gioca in Francia, quindi probabilmente non vive con Ahmed a Torino."
        } }
    ]
  },

  /* ============================== A2 ============================== */
  {
    id: "rd_a2_01", topic: "reading_a2", title: "Back from London",
    text: "Hi Chiara,\n\nI'm back from London! We spent five days there with my parents and my little brother, and it was amazing.\n\nOn the first day we visited the Natural History Museum. The dinosaurs were fantastic, but my brother was scared of the big T. rex! The next day we took a boat on the River Thames and saw Tower Bridge. It was colder than in Rome, so I bought a warm hoodie at a market in Camden. It was cheaper than in the shops at home.\n\nThe food was OK. I tried fish and chips, but I prefer my nonna's pasta!\n\nThe best moment was the football match at Wembley. The stadium is bigger than any stadium I know, and the fans sang all the time.\n\nNext summer I'm going to go back with my school for a language course. I can't wait!\n\nWrite soon,\nMatteo",
    questions: [
      { q: "How long was Matteo in London?", options: ["Five days", "A week", "Two days"], answer: "Five days", difficulty: 1,
        explanation: "Matteo scrive “We spent five days there”.",
        notes: {
          "A week": "Una settimana sono sette giorni; il testo dice “five days”.",
          "Two days": "Il testo parla del “first day” e del “next day”, ma in tutto sono stati lì cinque giorni."
        } },
      { q: "Who was scared of the T. rex?", options: ["Matteo's brother", "Matteo", "Matteo's mum"], answer: "Matteo's brother", difficulty: 1,
        explanation: "Il testo dice “my brother was scared of the big T. rex!”.",
        notes: {
          "Matteo": "Matteo trova i dinosauri “fantastic”: è il fratello ad avere paura.",
          "Matteo's mum": "La mamma non viene nominata in questa parte: ad avere paura è il fratello."
        } },
      { q: "The weather in London was warmer than in Rome.", options: ["True", "False"], answer: "False", difficulty: 2,
        explanation: "Il testo dice “It was colder than in Rome”: a Londra faceva più freddo, non più caldo. Infatti Matteo ha comprato una felpa pesante.",
        notes: {
          "True": "“Colder” (più freddo) è il contrario di “warmer” (più caldo)."
        } },
      { q: "What is Matteo going to do next summer?", options: ["Study English in London", "Visit his nonna in Rome", "Watch another match at Wembley with his parents"], answer: "Study English in London", difficulty: 2,
        explanation: "Matteo scrive “Next summer I'm going to go back with my school for a language course”: tornerà a Londra con la scuola per un corso di lingua, cioè per studiare inglese.",
        notes: {
          "Visit his nonna in Rome": "La nonna è nominata solo per la sua pasta, non per i progetti dell'estate.",
          "Watch another match at Wembley with his parents": "Tornerà a Londra con la scuola (“with my school”), non con i genitori, e non parla di un'altra partita."
        } },
      { q: "How did Matteo feel about the trip?", options: ["He enjoyed it a lot", "He was bored most of the time", "He wanted to go home early"], answer: "He enjoyed it a lot", difficulty: 3,
        explanation: "Matteo dice che il viaggio “was amazing”, racconta “the best moment” e per tornare scrive “I can't wait!”: si è divertito molto.",
        notes: {
          "He was bored most of the time": "Matteo usa parole positive come “amazing” e “fantastic”: non si è annoiato.",
          "He wanted to go home early": "Al contrario, non vede l'ora di tornarci (“I can't wait!”)."
        } }
    ]
  },
  {
    id: "rd_a2_02", topic: "reading_a2", title: "The lost phone",
    text: "Last Saturday, Elena went to the city centre with her friends Sara and Luca. They wanted to buy a birthday present for their friend Nico. They looked in lots of shops and finally they chose a T-shirt with his favourite band on it.\n\nAfter that, they were hungry, so they went to a café and had hot chocolate. When Elena wanted to pay, she couldn't find her phone. She looked in her bag and in her pockets, but it wasn't there. She felt terrible – it was a new phone and a present from her grandparents.\n\nThe three friends ran back to all the shops. In the last one, the shop assistant smiled and said, 'Is this yours?' She had Elena's phone in her hand!\n\n'Thank you so much!' said Elena. 'From now on, I'll always keep it in my bag.'",
    questions: [
      { q: "Why did the friends go to the city centre?", options: ["To buy a present for Nico", "To buy a new phone", "To meet Nico at a café"], answer: "To buy a present for Nico", difficulty: 1,
        explanation: "Il testo dice “They wanted to buy a birthday present for their friend Nico”.",
        notes: {
          "To buy a new phone": "Il telefono è nuovo, ma era un regalo dei nonni: non sono andati in centro per comprarlo.",
          "To meet Nico at a café": "Al bar ci vanno Elena, Sara e Luca; Nico non c'è, il regalo è per lui."
        } },
      { q: "What did they buy?", options: ["A T-shirt", "A CD", "A phone case"], answer: "A T-shirt", difficulty: 1,
        explanation: "Il testo dice “they chose a T-shirt with his favourite band on it”.",
        notes: {
          "A CD": "C'è il gruppo musicale preferito di Nico, ma stampato sulla maglietta: nessun CD.",
          "A phone case": "Una custodia per il telefono non è mai nominata."
        } },
      { q: "Elena's phone was a gift.", options: ["True", "False"], answer: "True", difficulty: 2,
        explanation: "Il testo dice “it was a new phone and a present from her grandparents”: “present” e “gift” vogliono dire entrambi regalo.",
        notes: {
          "False": "“Gift” è un sinonimo di “present”: il telefono era un regalo dei nonni, quindi è vero."
        } },
      { q: "Where did Elena leave her phone?", options: ["In a shop", "In the café", "In her pocket"], answer: "In a shop", difficulty: 2,
        explanation: "Il testo dice “In the last one, the shop assistant… had Elena's phone in her hand”: “the last one” è l'ultimo negozio, quindi l'aveva lasciato lì.",
        notes: {
          "In the café": "Al bar Elena si accorge di non avere il telefono, ma lo ritrova in un negozio.",
          "In her pocket": "Elena guarda nelle tasche, ma “it wasn't there”."
        } },
      { q: "How did Elena probably feel at the end of the story?", options: ["Happy and thankful", "Angry with her friends", "Sad and worried"], answer: "Happy and thankful", difficulty: 3,
        explanation: "Alla fine Elena dice “Thank you so much!” e promette di stare più attenta: ha ritrovato il telefono, quindi è contenta e riconoscente.",
        notes: {
          "Angry with her friends": "Gli amici l'hanno aiutata a cercare (“The three friends ran back”): non c'è motivo di essere arrabbiata con loro.",
          "Sad and worried": "Era triste prima (“She felt terrible”), ma alla fine il telefono è stato ritrovato."
        } }
    ]
  },
  {
    id: "rd_a2_03", topic: "reading_a2", title: "How do you get to school?",
    text: "Last month, the students of Class 2A did a survey in their school in Verona. They asked 200 students how they travel to school every morning.\n\nThe results were interesting. Most students – 85 of them – come by bus. 60 students walk, 35 come by car with their parents and only 20 ride a bike.\n\n'The bus is cheaper than a car, but it's often slower because of the traffic,' says Anna, 15. 'Walking is the healthiest way, but I live too far from school.'\n\nCycling is faster than walking and better for the environment than travelling by car. So why do so few students do it? Many say the roads are too dangerous.\n\nNow there is good news. Next year the town is going to build a new bike lane near the school. The students hope that more of them will cycle when it's ready.",
    questions: [
      { q: "How many students answered the survey?", options: ["200", "85", "20"], answer: "200", difficulty: 1,
        explanation: "Il testo dice “They asked 200 students”.",
        notes: {
          "85": "85 sono gli studenti che vanno a scuola in autobus, non il totale.",
          "20": "20 sono gli studenti che vanno in bicicletta, non il totale."
        } },
      { q: "What is the most popular way to get to school?", options: ["By bus", "On foot", "By car"], answer: "By bus", difficulty: 2,
        explanation: "Il testo dice “Most students – 85 of them – come by bus”: è il numero più alto, quindi il modo più diffuso.",
        notes: {
          "On foot": "A piedi vanno 60 studenti: sono meno degli 85 che prendono l'autobus.",
          "By car": "In auto vanno solo 35 studenti."
        } },
      { q: "Anna walks to school.", options: ["True", "False"], answer: "False", difficulty: 3,
        explanation: "Anna dice “Walking is the healthiest way, but I live too far from school”: abita troppo lontano, quindi non va a piedi (probabilmente prende l'autobus, di cui parla).",
        notes: {
          "True": "Anna pensa che camminare sia il modo più sano, ma con “but I live too far” spiega che lei non può farlo."
        } },
      { q: "Why don't many students cycle to school?", options: ["They think the roads are not safe", "Bikes are too expensive", "Cycling is slower than walking"], answer: "They think the roads are not safe", difficulty: 2,
        explanation: "Il testo dice “Many say the roads are too dangerous”: “dangerous” (pericoloso) = “not safe” (non sicuro).",
        notes: {
          "Bikes are too expensive": "Il prezzo delle bici non è mai nominato.",
          "Cycling is slower than walking": "Il testo dice il contrario: “Cycling is faster than walking”."
        } },
      { q: "What is going to happen next year?", options: ["The town will build a bike lane", "The school will buy a new bus", "Class 2A will do another survey"], answer: "The town will build a bike lane", difficulty: 1,
        explanation: "Il testo dice “Next year the town is going to build a new bike lane near the school”.",
        notes: {
          "The school will buy a new bus": "Nessun nuovo autobus è nominato: la novità è la pista ciclabile.",
          "Class 2A will do another survey": "Il sondaggio è stato fatto “last month”; non si parla di farne un altro."
        } }
    ]
  },
  {
    id: "rd_a2_04", topic: "reading_a2", title: "My first month at high school",
    text: "In September I started at a new school, a liceo scientifico in my town. I was really nervous on the first day because I didn't know anybody in my class. My best friend from middle school went to a different school.\n\nThe first week was hard. The building is much bigger than my old school, and I got lost twice! The lessons are longer and the teachers give us more homework. Latin was the most difficult subject for me.\n\nBut things got better quickly. In the second week I met Davide. He sits next to me and he loves the same video games as me. Now we study together on Tuesdays and we play online at the weekend.\n\nNext month our class is going on a trip to Florence. I think it will be great fun. I'm much happier now than in September!\n\nFilippo, 14",
    questions: [
      { q: "Why was the writer nervous on the first day?", options: ["He didn't know anyone in his class", "He arrived late", "He didn't like the teachers"], answer: "He didn't know anyone in his class", difficulty: 1,
        explanation: "Il testo dice “I was really nervous on the first day because I didn't know anybody in my class”.",
        notes: {
          "He arrived late": "Il ritardo non è mai nominato.",
          "He didn't like the teachers": "Dice che i professori danno più compiti, ma non che non gli piacciono, e non è il motivo del nervosismo."
        } },
      { q: "The writer got lost in his new school.", options: ["True", "False"], answer: "True", difficulty: 1,
        explanation: "Il testo dice “The building is much bigger than my old school, and I got lost twice!”.",
        notes: {
          "False": "Il testo dice proprio “I got lost twice”: si è perso due volte."
        } },
      { q: "Which subject was the hardest for the writer?", options: ["Latin", "Maths", "English"], answer: "Latin", difficulty: 2,
        explanation: "Il testo dice “Latin was the most difficult subject for me”: “the most difficult” = “the hardest”.",
        notes: {
          "Maths": "La matematica non è nominata nel testo.",
          "English": "L'inglese non è nominato nel testo."
        } },
      { q: "What do the writer and Davide have in common?", options: ["They like the same video games", "They went to the same middle school", "They both find Latin easy"], answer: "They like the same video games", difficulty: 2,
        explanation: "Il testo dice “he loves the same video games as me”: “have in common” vuol dire “avere in comune”.",
        notes: {
          "They went to the same middle school": "Lo scrittore ha conosciuto Davide solo “in the second week”, quindi non erano nella stessa scuola media.",
          "They both find Latin easy": "Anzi, per lo scrittore il latino è la materia più difficile."
        } },
      { q: "What is the main idea of the text?", options: ["High school was hard at first, but now it is better", "High school is easier than middle school", "The writer wants to change school"], answer: "High school was hard at first, but now it is better", difficulty: 3,
        explanation: "Il testo parte da “The first week was hard”, poi dice “But things got better quickly” e finisce con “I'm much happier now than in September!”: l'inizio è stato difficile, ora va meglio.",
        notes: {
          "High school is easier than middle school": "Al contrario: le lezioni sono più lunghe e ci sono più compiti.",
          "The writer wants to change school": "Non lo dice mai: anzi, ora è più felice e aspetta la gita a Firenze."
        } }
    ]
  },

  /* ============================== B1 ============================== */
  {
    id: "rd_b1_01", topic: "reading_b1", title: "Why I've fallen in love with climbing",
    text: "A year ago I had never climbed anything bigger than a tree. Then my cousin took me to an indoor climbing centre for her birthday party, and I've been going back every week since then.\n\nThe kind of climbing I do is called bouldering. The walls are only about four metres high, so you don't need ropes. Instead, there are thick soft mats on the floor in case you fall – and believe me, I've fallen a lot! Each route has a colour, and the colour shows how difficult it is.\n\nWhat I like most is that climbing is like a puzzle. You can't just use your arms; you have to think about where to put your feet and plan every move. If you rush, you usually fall. I've become much more patient, and my mum says I've also become more confident at school.\n\nSome people think climbing is dangerous, but in my opinion it's safer than football, because nobody ever pushes or kicks you! Of course, you have to follow the rules and warm up properly.\n\nIf you've never tried it, I'd really recommend it. Most centres let you rent shoes, so you don't have to buy anything to start. If I can do it, anyone can!\n\nMarta, 15",
    questions: [
      { q: "How did Marta start climbing?", options: ["She went to a birthday party at a climbing centre", "Her school organised a climbing trip", "She climbed trees with her cousin"], answer: "She went to a birthday party at a climbing centre", difficulty: 1,
        explanation: "Marta scrive “my cousin took me to an indoor climbing centre for her birthday party”.",
        notes: {
          "Her school organised a climbing trip": "La scuola è nominata solo perché ora Marta è più sicura di sé lì; nessuna gita.",
          "She climbed trees with her cousin": "Trappola: l'albero serve solo a dire che prima non aveva mai arrampicato su niente di più grande (“never climbed anything bigger than a tree”)."
        } },
      { q: "In bouldering, climbers use ropes.", options: ["True", "False", "Not given"], answer: "False", difficulty: 1,
        explanation: "Il testo dice “The walls are only about four metres high, so you don't need ropes”.",
        notes: {
          "True": "Il testo dice chiaramente “you don't need ropes”: al posto delle corde ci sono i materassi.",
          "Not given": "L'informazione c'è: “you don't need ropes”, quindi l'affermazione è falsa."
        } },
      { q: "Marta's cousin still goes climbing with her every week.", options: ["True", "False", "Not given"], answer: "Not given", difficulty: 2,
        explanation: "Marta scrive “I've been going back every week since then”, ma non dice con chi ci va. Della cugina sappiamo solo che l'ha portata la prima volta.",
        notes: {
          "True": "Il testo dice che Marta ci va ogni settimana, ma non che ci va con la cugina.",
          "False": "Il testo non dice nemmeno che la cugina non ci va più: semplicemente non ne parla."
        } },
      { q: "Why does Marta say that climbing is like a puzzle?", options: ["You have to think and plan your moves", "The routes have different colours", "It is a game for small children"], answer: "You have to think and plan your moves", difficulty: 2,
        explanation: "Subito dopo il paragone, Marta spiega: “you have to think about where to put your feet and plan every move”. Come in un puzzle, bisogna ragionare.",
        notes: {
          "The routes have different colours": "I colori servono a indicare la difficoltà delle vie, non sono il motivo del paragone con il puzzle.",
          "It is a game for small children": "Marta non parla mai di bambini piccoli."
        } },
      { q: "What is Marta's main purpose in writing this text?", options: ["To encourage readers to try climbing", "To warn readers that climbing is dangerous", "To explain how to build a climbing wall"], answer: "To encourage readers to try climbing", difficulty: 3,
        explanation: "Marta racconta i lati positivi dell'arrampicata e chiude con “If you've never tried it, I'd really recommend it… If I can do it, anyone can!”: vuole convincere chi legge a provare.",
        notes: {
          "To warn readers that climbing is dangerous": "Al contrario: Marta dice “in my opinion it's safer than football”.",
          "To explain how to build a climbing wall": "Marta descrive le pareti, ma non spiega come costruirne una."
        } }
    ]
  },
  {
    id: "rd_b1_02", topic: "reading_b1", title: "Your exchange visit",
    text: "Hi Federico,\n\nMy name is Ollie and I'm the student you'll be staying with in Manchester. My family and I are really looking forward to meeting you!\n\nLet me tell you a bit about us. I live with my mum, my stepdad and our cat, Pepper. I hope you're not allergic to cats – if you are, let us know and we'll keep her out of your room. You'll have your own bedroom, which used to be my older sister's before she went to university.\n\nI've already planned a few things. If the weather's good, we'll go for a bike ride along the canal on your first weekend. If it rains (and in Manchester it often does!), we could go to the climbing wall or the cinema instead. I've also got tickets for a basketball game, because you said in your profile that it's your favourite sport.\n\nOn school days we'll take the bus together at 8.15. Lessons finish at 3.20, which I think is later than in Italy.\n\nHave you ever eaten a full English breakfast? If not, my stepdad has promised to cook one for you. It's huge, so come hungry!\n\nIf you have any questions, just send me a message.\n\nSee you soon,\nOllie",
    questions: [
      { q: "Where will Federico sleep?", options: ["In a room that belonged to Ollie's sister", "In Ollie's bedroom", "In a hotel near the school"], answer: "In a room that belonged to Ollie's sister", difficulty: 2,
        explanation: "Ollie scrive “You'll have your own bedroom, which used to be my older sister's”: “used to be” = era (una volta) della sorella.",
        notes: {
          "In Ollie's bedroom": "Federico avrà una camera tutta sua (“your own bedroom”), non quella di Ollie.",
          "In a hotel near the school": "Federico starà a casa di Ollie (“the student you'll be staying with”), non in albergo."
        } },
      { q: "Ollie's family has a pet.", options: ["True", "False", "Not given"], answer: "True", difficulty: 1,
        explanation: "Ollie scrive “I live with my mum, my stepdad and our cat, Pepper”: il gatto è un animale domestico (pet).",
        notes: {
          "False": "Il testo nomina il gatto Pepper, quindi un animale domestico c'è.",
          "Not given": "L'informazione c'è: “our cat, Pepper”."
        } },
      { q: "What will they do on the first weekend if it rains?", options: ["Go to the cinema or the climbing wall", "Go for a bike ride along the canal", "Watch a basketball game on TV"], answer: "Go to the cinema or the climbing wall", difficulty: 1,
        explanation: "Il testo dice “If it rains… we could go to the climbing wall or the cinema instead”.",
        notes: {
          "Go for a bike ride along the canal": "Il giro in bici è il programma per il bel tempo (“If the weather's good”).",
          "Watch a basketball game on TV": "Ollie ha i biglietti per una partita di basket dal vivo, non parla di guardarla in TV quando piove."
        } },
      { q: "Federico has been to England before.", options: ["True", "False", "Not given"], answer: "Not given", difficulty: 2,
        explanation: "Ollie chiede “Have you ever eaten a full English breakfast?”, ma l'email non dice mai se Federico è già stato in Inghilterra.",
        notes: {
          "True": "Nessuna frase dice che Federico è già stato in Inghilterra.",
          "False": "Il testo non dice nemmeno che è la sua prima volta: l'informazione manca."
        } },
      { q: "Why does Ollie write “come hungry!”?", options: ["Because the breakfast his stepdad will cook is very big", "Because there is no food on the plane", "Because his family eats very late"], answer: "Because the breakfast his stepdad will cook is very big", difficulty: 3,
        explanation: "Ollie scrive “my stepdad has promised to cook one for you. It's huge, so come hungry!”: la colazione inglese è enorme, quindi è meglio arrivare con tanta fame. È un modo scherzoso di dirlo.",
        notes: {
          "Because there is no food on the plane": "L'aereo non è mai nominato nell'email.",
          "Because his family eats very late": "Gli orari dei pasti non sono nominati; “come hungry” si riferisce alla colazione enorme."
        } }
    ]
  },
  {
    id: "rd_b1_03", topic: "reading_b1", title: "Is second-hand the new cool?",
    text: "A few years ago, many teenagers would have been embarrassed to wear second-hand clothes. Today, things have changed. More and more young people in Italy have started buying and selling used clothes, both online and at street markets.\n\nThere are several reasons. The first is money. A pair of jeans that costs 60 euros new can often be found for 15 euros second-hand. The second is the environment. Making a single cotton T-shirt uses around 2,700 litres of water, so if we wore our clothes for longer, we would save a huge amount of water and energy.\n\nWe asked some students what they think. 'I've bought almost all my jackets at the market,' says Lorenzo, 16. 'Nobody else has the same ones, so my style is unique.' Giada, 14, is less sure: 'I like the idea, but sometimes the clothes smell a bit old, and it takes ages to find something in my size.'\n\nExperts say that the best thing is not to buy more, but to buy less. 'Second-hand is great,' explains Dr Bianchi, an environmental scientist, 'but if people buy five used T-shirts instead of one new one, it doesn't really help the planet.'\n\nSo next time you need something new, why not check a market first?",
    questions: [
      { q: "According to the article, how much can second-hand jeans cost?", options: ["15 euros", "60 euros", "2,700 euros"], answer: "15 euros", difficulty: 1,
        explanation: "Il testo dice “A pair of jeans that costs 60 euros new can often be found for 15 euros second-hand”.",
        notes: {
          "60 euros": "60 euro è il prezzo dei jeans nuovi (“costs 60 euros new”), non usati.",
          "2,700 euros": "2.700 sono i litri d'acqua per fare una maglietta, non un prezzo."
        } },
      { q: "Why does Lorenzo like buying jackets at the market?", options: ["His style is different from everyone else's", "They are warmer than new jackets", "His friends sell them there"], answer: "His style is different from everyone else's", difficulty: 2,
        explanation: "Lorenzo dice “Nobody else has the same ones, so my style is unique”: nessun altro ha le stesse giacche, quindi il suo stile è diverso da quello degli altri.",
        notes: {
          "They are warmer than new jackets": "Lorenzo non parla mai del caldo delle giacche.",
          "His friends sell them there": "Il testo non dice chi vende le giacche al mercato."
        } },
      { q: "Giada thinks second-hand clothes are always cheaper than new ones.", options: ["True", "False", "Not given"], answer: "Not given", difficulty: 2,
        explanation: "Giada parla dell'odore (“smell a bit old”) e del tempo per trovare la taglia giusta, ma non dice niente sul prezzo.",
        notes: {
          "True": "Il prezzo più basso è nominato all'inizio dell'articolo, ma non da Giada: lei non ne parla.",
          "False": "Giada non dice nemmeno il contrario: sul prezzo non dà nessuna opinione."
        } },
      { q: "In Giada's words, “it takes ages” means…", options: ["it takes a very long time", "it is only for older people", "it costs a lot of money"], answer: "it takes a very long time", difficulty: 3,
        explanation: "“It takes ages to find something in my size” = ci vuole tantissimo tempo per trovare qualcosa della sua taglia. “Ages” qui significa “un'eternità”, non “età”.",
        notes: {
          "it is only for older people": "Trappola: “age” vuol dire anche età, ma “it takes ages” è un'espressione di tempo.",
          "it costs a lot of money": "“It takes” + tempo parla di quanto tempo serve, non di soldi."
        } },
      { q: "What is Dr Bianchi's main point?", options: ["Buying fewer clothes is more important than buying second-hand", "Second-hand clothes are bad for the planet", "People should only buy new T-shirts"], answer: "Buying fewer clothes is more important than buying second-hand", difficulty: 3,
        explanation: "Dr Bianchi dice “Second-hand is great, but if people buy five used T-shirts instead of one new one, it doesn't really help the planet”, e il testo spiega che “the best thing is not to buy more, but to buy less”.",
        notes: {
          "Second-hand clothes are bad for the planet": "Dr Bianchi dice “Second-hand is great”: il problema è comprarne troppi, non l'usato in sé.",
          "People should only buy new T-shirts": "Non lo dice mai: il suo esempio serve a dire di comprare di meno."
        } }
    ]
  },
  {
    id: "rd_b1_04", topic: "reading_b1", title: "The talent show",
    text: "Leo stared at the stage. In ten minutes it would be his turn. He had played the guitar since he was nine, but he had never played in front of the whole school. His hands were cold and his mouth was dry.\n\n'You've practised this song a hundred times,' said his sister Bea, who was sitting next to him. 'If you forget a chord, just keep going. Nobody will notice.'\n\n'Everybody will notice,' Leo said. 'If I make a mistake, they'll laugh at me for the rest of the year.'\n\nThen the presenter called his name. Leo walked onto the stage, sat down and started to play. For the first minute everything went perfectly. Then, in the middle of the song, one of the strings broke with a loud ping. The room went silent.\n\nLeo looked at the audience. For a second he wanted to run away. Instead, he smiled, said 'Well, that's never happened before!' and finished the song with five strings. When he played the last note, the whole hall stood up and clapped.\n\nLater, Bea found him outside. 'So,' she said, 'did they laugh at you?'\n\n'Only at my joke,' Leo answered, grinning.",
    questions: [
      { q: "When did Leo start playing the guitar?", options: ["When he was nine", "Ten minutes before the show", "At the beginning of the school year"], answer: "When he was nine", difficulty: 1,
        explanation: "Il testo dice “He had played the guitar since he was nine”: suona da quando aveva nove anni.",
        notes: {
          "Ten minutes before the show": "Trappola: “In ten minutes it would be his turn” indica quando toccava a lui, non quando ha iniziato a suonare.",
          "At the beginning of the school year": "Il testo non lo dice; suona da quando aveva nove anni."
        } },
      { q: "Leo had already played in front of the whole school before the show.", options: ["True", "False", "Not given"], answer: "False", difficulty: 1,
        explanation: "Il testo dice “he had never played in front of the whole school”.",
        notes: {
          "True": "“Never” (mai) dice il contrario: era la prima volta davanti a tutta la scuola.",
          "Not given": "L'informazione c'è: “he had never played in front of the whole school”."
        } },
      { q: "What went wrong during Leo's performance?", options: ["A guitar string broke", "He forgot the words", "The presenter called the wrong name"], answer: "A guitar string broke", difficulty: 2,
        explanation: "Il testo dice “in the middle of the song, one of the strings broke with a loud ping”: si è rotta una corda della chitarra.",
        notes: {
          "He forgot the words": "Leo aveva paura di sbagliare, ma il testo non dice che ha dimenticato le parole.",
          "The presenter called the wrong name": "Il presentatore chiama proprio il suo nome (“called his name”)."
        } },
      { q: "Bea plays the guitar too.", options: ["True", "False", "Not given"], answer: "Not given", difficulty: 2,
        explanation: "Bea parla di accordi (“If you forget a chord”), ma il testo non dice se lei suona la chitarra.",
        notes: {
          "True": "Bea sa che cos'è un accordo, ma questo non basta: il testo non dice che suona.",
          "False": "Il testo non dice nemmeno che non suona: semplicemente non lo sappiamo."
        } },
      { q: "What does Leo mean when he says “Only at my joke”?", options: ["People laughed because his joke was funny, not at his mistake", "Nobody in the hall laughed at all", "People laughed at him because the string broke"], answer: "People laughed because his joke was funny, not at his mistake", difficulty: 3,
        explanation: "Quando la corda si rompe, Leo dice scherzando “Well, that's never happened before!”. Il pubblico ride della battuta e poi applaude (“the whole hall stood up and clapped”): nessuno lo ha preso in giro per l'errore.",
        notes: {
          "Nobody in the hall laughed at all": "Leo dice “Only at my joke”: qualcuno ha riso, ma della sua battuta.",
          "People laughed at him because the string broke": "È proprio ciò che temeva, ma non è successo: hanno riso solo della battuta e poi hanno applaudito."
        } }
    ]
  },

  /* ============================== B1+ ============================== */
  {
    id: "rd_b1p_01", topic: "reading_b1p", title: "A week without smartphones",
    text: "When our teacher, Mr Ferrari, suggested that our class should spend a whole week without smartphones, most of us thought he was joking. However, he was completely serious. The idea was simple: from Monday to Sunday, we would leave our phones at home, switched off, and write a short diary every evening about how we felt.\n\nThe first two days were the hardest. Although I had promised myself I wouldn't complain, I kept reaching for my pocket to check messages that weren't there. My friend Sami said it felt like losing an arm. Without music on the bus, the journey to school seemed endless, and I had no idea how to kill time while I waited for my brother after his football practice.\n\nBy Wednesday, however, something had changed. Instead of scrolling through videos, I started reading a fantasy novel that had been sitting on my shelf for months. I even finished it on Saturday. At school, people talked to each other more during the break, and I discovered that Elisa, who sits behind me, loves the same series of books.\n\nNot everything was positive, though. Organising things was a nightmare. On Thursday half the class turned up at the wrong park because the plan had changed and nobody could tell us. And although my parents liked the experiment, my mum admitted that she had worried more than usual when I came home late.\n\nWould I do it again? Probably not for a whole week. Nevertheless, I've made a few changes. My phone now stays in another room when I'm doing homework, and I've turned off most notifications. I didn't expect to say this, but I don't miss them at all.",
    questions: [
      { q: "How did most students react when Mr Ferrari first suggested the idea?", options: ["They didn't think he was serious", "They were excited to start", "They refused to take part"], answer: "They didn't think he was serious", difficulty: 2,
        explanation: "Il testo dice “most of us thought he was joking”: pensavano che scherzasse, cioè che non dicesse sul serio. Il “However, he was completely serious” che segue conferma che si sbagliavano.",
        notes: {
          "They were excited to start": "Il testo non parla di entusiasmo: all'inizio pensavano a uno scherzo.",
          "They refused to take part": "Nessuno si rifiuta: la classe fa davvero l'esperimento."
        } },
      { q: "In the second paragraph, “kill time” means…", options: ["to do something while you are waiting", "to arrive late for an appointment", "to finish a job very quickly"], answer: "to do something while you are waiting", difficulty: 3,
        explanation: "Il testo dice “I had no idea how to kill time while I waited for my brother”: senza telefono non sapeva come passare il tempo durante l'attesa. “Kill time” = ammazzare il tempo.",
        notes: {
          "to arrive late for an appointment": "L'espressione non parla di ritardo: lo scrittore sta aspettando, non è in ritardo.",
          "to finish a job very quickly": "Non c'è nessun lavoro da finire: il problema è come passare il tempo mentre aspetta."
        } },
      { q: "The writer finished a book during the experiment.", options: ["True", "False", "Not given"], answer: "True", difficulty: 1,
        explanation: "Il testo dice “I started reading a fantasy novel… I even finished it on Saturday”, e il sabato era ancora dentro la settimana (“from Monday to Sunday”).",
        notes: {
          "False": "Il testo dice proprio “I even finished it on Saturday”.",
          "Not given": "L'informazione c'è: ha finito il romanzo sabato, durante la settimana senza telefono."
        } },
      { q: "Mr Ferrari also stopped using his phone during the week.", options: ["True", "False", "Not given"], answer: "Not given", difficulty: 2,
        explanation: "Il testo dice che “our class” doveva stare senza smartphone, ma non dice niente su cosa ha fatto il professore con il suo telefono.",
        notes: {
          "True": "L'esperimento era per la classe; il testo non dice che anche Mr Ferrari ha partecipato.",
          "False": "Il testo non dice nemmeno che il professore ha usato il telefono: l'informazione manca."
        } },
      { q: "What is the writer's final opinion of the experiment?", options: ["It was useful, but a whole week was too long", "It was a complete waste of time", "Smartphones should be banned for all teenagers"], answer: "It was useful, but a whole week was too long", difficulty: 3,
        explanation: "Lo scrittore dice “Probably not for a whole week. Nevertheless, I've made a few changes”: non lo rifarebbe per una settimana intera, però l'esperimento gli ha fatto cambiare alcune abitudini, quindi è stato utile.",
        notes: {
          "It was a complete waste of time": "Se fosse stato inutile non avrebbe cambiato abitudini (telefono in un'altra stanza, notifiche spente).",
          "Smartphones should be banned for all teenagers": "Lo scrittore non propone nessun divieto: continua a usare il telefono, solo in modo diverso."
        } }
    ]
  },
  {
    id: "rd_b1p_02", topic: "reading_b1p", title: "The teenager who cleans beaches",
    text: "Last summer, 16-year-old Chiara Esposito from Salerno started a group called Clean Waves. Every Sunday morning, its volunteers meet to collect rubbish from local beaches. We asked her how it all began.\n\nSo, Chiara, where did the idea come from?\nIt happened by chance, really. I went swimming one day in June and my foot got caught in a plastic bag. I was furious. When I looked around, I saw bottles, cans and even an old shoe on the sand. I decided I couldn't just complain about it; I had to do something.\n\nHow did you find volunteers?\nAt first it was just me and two friends from school. I posted some photos online, and although I didn't expect much, thirty people turned up the next weekend. I was over the moon – I couldn't stop smiling for days.\n\nSome people say that cleaning a few beaches is just a drop in the ocean. What do you think?\nThey're right that it's a tiny part of the problem. However, I think it matters. Every bag we pick up is one less bag that a turtle can swallow. Besides, many of our volunteers have changed their own habits. Lots of them now carry reusable bottles and say no to plastic straws.\n\nWhat has been the hardest part?\nProbably the weather. Although summer is easy, in winter it's cold and windy, and fewer people come. Also, I have to balance everything with school, which isn't always simple.\n\nWhat's next for Clean Waves?\nWe'd love to work with local schools. If every class adopted one beach, the coast would look completely different in a year.",
    questions: [
      { q: "What made Chiara decide to start Clean Waves?", options: ["Her foot got caught in a plastic bag while she was swimming", "Her teacher gave the class a project about the sea", "She saw a turtle eating plastic on the beach"], answer: "Her foot got caught in a plastic bag while she was swimming", difficulty: 1,
        explanation: "Chiara racconta “I went swimming one day in June and my foot got caught in a plastic bag… I had to do something”.",
        notes: {
          "Her teacher gave the class a project about the sea": "La scuola è nominata solo per i due amici e per i progetti futuri; nessun compito del professore.",
          "She saw a turtle eating plastic on the beach": "La tartaruga è un esempio che Chiara fa dopo (“a turtle can swallow”), non qualcosa che ha visto."
        } },
      { q: "What does “I was over the moon” mean in the text?", options: ["I was extremely happy", "I was surprised and worried", "I was very tired"], answer: "I was extremely happy", difficulty: 3,
        explanation: "Subito dopo Chiara dice “I couldn't stop smiling for days”: era felicissima perché erano venute trenta persone. “Over the moon” = al settimo cielo.",
        notes: {
          "I was surprised and worried": "Era sorpresa, sì (“I didn't expect much”), ma non preoccupata: sorrideva per giorni.",
          "I was very tired": "Niente nel testo parla di stanchezza; “couldn't stop smiling” indica gioia."
        } },
      { q: "What does Chiara think about the idea that cleaning beaches is “just a drop in the ocean”?", options: ["It is only a small part of the solution, but it is still worth doing", "It solves the whole problem of plastic pollution", "It is true, so Clean Waves should probably stop"], answer: "It is only a small part of the solution, but it is still worth doing", difficulty: 3,
        explanation: "Chiara risponde “They're right that it's a tiny part of the problem. However, I think it matters”: ammette che è poco (“a drop in the ocean” = una goccia nel mare), ma con “However” dice che ne vale comunque la pena.",
        notes: {
          "It solves the whole problem of plastic pollution": "Chiara ammette che è “a tiny part of the problem”, quindi non risolve tutto.",
          "It is true, so Clean Waves should probably stop": "Trappola: Chiara dà ragione a chi critica, ma con “However, I think it matters” difende il suo gruppo e anzi vuole crescere."
        } },
      { q: "Fewer volunteers come to clean the beaches in winter.", options: ["True", "False", "Not given"], answer: "True", difficulty: 1,
        explanation: "Chiara dice “in winter it's cold and windy, and fewer people come”.",
        notes: {
          "False": "Il testo dice proprio “fewer people come” in inverno.",
          "Not given": "L'informazione c'è, nella risposta sulla parte più difficile: “in winter… fewer people come”."
        } },
      { q: "Chiara wants to study environmental science at university.", options: ["True", "False", "Not given"], answer: "Not given", difficulty: 2,
        explanation: "Chiara parla della scuola (“balance everything with school”) e dei progetti di Clean Waves, ma non dice niente sull'università.",
        notes: {
          "True": "Le sembra importante l'ambiente, ma il testo non dice che cosa vuole studiare in futuro.",
          "False": "Il testo non dice nemmeno che non vuole studiarla: l'informazione manca."
        } }
    ]
  },
  {
    id: "rd_b1p_03", topic: "reading_b1p", title: "Gaming: hobby or waste of time?",
    text: "I've been playing video games since I was seven, and I'm not going to pretend I don't love them. However, after reading yet another article claiming that games are destroying teenagers' brains, I decided to write my own opinion.\n\nLet's start with the good side. Many games, especially strategy and puzzle games, make you solve problems quickly and think several steps ahead. Online team games also teach you to communicate: if you don't tell your teammates what you're doing, you lose. I've also made real friends through gaming, including Tomás, a boy from Spain who has helped my Spanish more than any textbook.\n\nOn the other hand, I have to be honest. Last year I got into the habit of playing until two in the morning on school nights. I'd tell myself 'just one more match', and then I'd look at the clock and it would be hours later. My marks dropped, and I was constantly tired. My parents didn't need to say anything; my report card said it all.\n\nSo what changed? I didn't give up gaming, although my dad suggested it more than once. Instead, I set myself some rules. I only play after homework, never after ten o'clock, and on Sundays I take a complete break. At first it was hard to call it a day when my friends were still online, but now it feels normal. My marks have gone up, and, surprisingly, I enjoy the games more because I'm not exhausted.\n\nIn my view, games are a bit like chocolate. A little is great. Too much, and you'll feel terrible. The problem isn't the games themselves – it's how we use them.\n\nRiccardo, 16",
    questions: [
      { q: "How old was the writer when he started playing video games?", options: ["Seven", "Two", "Ten"], answer: "Seven", difficulty: 1,
        explanation: "Il testo dice “I've been playing video games since I was seven”.",
        notes: {
          "Two": "Trappola: “two in the morning” è l'ora a cui giocava l'anno scorso, non la sua età.",
          "Ten": "Trappola: “never after ten o'clock” è una delle sue regole sull'orario, non un'età."
        } },
      { q: "How has Tomás helped the writer?", options: ["He has improved the writer's Spanish", "He has taught him to play strategy games", "He has helped him to set rules for gaming"], answer: "He has improved the writer's Spanish", difficulty: 1,
        explanation: "Il testo dice “Tomás, a boy from Spain who has helped my Spanish more than any textbook”.",
        notes: {
          "He has taught him to play strategy games": "I giochi di strategia sono nominati nella stessa parte, ma non c'entrano con Tomás.",
          "He has helped him to set rules for gaming": "Le regole le ha decise lo scrittore da solo (“I set myself some rules”)."
        } },
      { q: "The writer's dad wanted him to stop playing video games completely.", options: ["True", "False", "Not given"], answer: "True", difficulty: 2,
        explanation: "Il testo dice “I didn't give up gaming, although my dad suggested it more than once”: il papà gli ha suggerito più volte di smettere (“give up”) del tutto.",
        notes: {
          "False": "Attenzione ad “although”: lo scrittore non ha smesso, ANCHE SE il papà glielo aveva suggerito. Il papà quindi voleva che smettesse.",
          "Not given": "L'informazione c'è: “my dad suggested it” si riferisce a “give up gaming”."
        } },
      { q: "In the fourth paragraph, “call it a day” means…", options: ["to stop doing something", "to phone a friend", "to play all day long"], answer: "to stop doing something", difficulty: 3,
        explanation: "Il testo dice “it was hard to call it a day when my friends were still online”: era difficile smettere di giocare (alle dieci, come dice la regola) mentre gli amici erano ancora connessi. “Call it a day” = basta così per oggi.",
        notes: {
          "to phone a friend": "Trappola: “call” può voler dire telefonare, ma “call it a day” è un'espressione che vuol dire smettere.",
          "to play all day long": "È il contrario: la regola è non giocare dopo le dieci, quindi deve smettere."
        } },
      { q: "Why does the writer compare games to chocolate?", options: ["To show that games are fine if you don't have too much", "To say that games are always bad for your health", "To explain that he eats chocolate while he plays"], answer: "To show that games are fine if you don't have too much", difficulty: 3,
        explanation: "Il testo dice “A little is great. Too much, and you'll feel terrible. The problem isn't the games themselves – it's how we use them”: come il cioccolato, i videogiochi vanno bene in piccole quantità.",
        notes: {
          "To say that games are always bad for your health": "Lo scrittore dice “A little is great”: non sono sempre dannosi, solo se si esagera.",
          "To explain that he eats chocolate while he plays": "Il cioccolato è solo un paragone, non qualcosa che mangia davvero mentre gioca."
        } }
    ]
  },
  {
    id: "rd_b1p_04", topic: "reading_b1p", title: "The new girl",
    text: "When Ms Gallo walked into the classroom with a new student, nobody paid much attention at first. It was the middle of November, and new students didn't usually arrive halfway through the term. The girl, whose name was Ines, had just moved from Lisbon with her family. She said hello in careful Italian and then sat in the only free seat, next to Pietro.\n\nPietro wasn't the most talkative person in class. In fact, he usually spent breaks drawing in his notebook rather than chatting. Although he wanted to be friendly, he had no idea how to break the ice. What do you say to someone who has just arrived from another country? For two days they hardly spoke.\n\nOn Thursday, however, something unexpected happened. During art, Ines looked over at Pietro's notebook, which was full of drawings of strange creatures and spaceships. 'Did you draw these?' she asked. 'They're brilliant. I make comics too, but my drawings are terrible. I'm better at writing the stories.'\n\nPietro felt his face go red, but he was secretly pleased. For the rest of the lesson they talked about their favourite comics, and by the end of the day they had a plan: Ines would write a story, and Pietro would draw it.\n\nIt wasn't always easy. Sometimes Ines used a Portuguese word when she couldn't remember the Italian one. Their first comic was only six pages long, and the ending made no sense. Nevertheless, when they showed it to Ms Gallo, she asked if she could put it on the classroom wall.\n\nBy Christmas, everyone knew Ines. Pietro, on the other hand, was still quiet – but now he had someone to be quiet with.",
    questions: [
      { q: "Where did Ines live before she joined the class?", options: ["In Lisbon", "In another Italian town", "In Spain"], answer: "In Lisbon", difficulty: 1,
        explanation: "Il testo dice “Ines, had just moved from Lisbon with her family”.",
        notes: {
          "In another Italian town": "Ines parla un italiano “careful” (attento, lento) e a volte usa parole portoghesi: viene da Lisbona, in Portogallo.",
          "In Spain": "Lisbona è in Portogallo, non in Spagna; infatti Ines usa “a Portuguese word”."
        } },
      { q: "In the second paragraph, “break the ice” means…", options: ["to start a conversation with someone new", "to have an argument with someone", "to make a mistake in front of others"], answer: "to start a conversation with someone new", difficulty: 3,
        explanation: "Subito dopo il testo chiede “What do you say to someone who has just arrived from another country?” e dice “For two days they hardly spoke”: Pietro non sapeva come iniziare a parlare con Ines. “Break the ice” = rompere il ghiaccio.",
        notes: {
          "to have an argument with someone": "Pietro vuole essere gentile (“he wanted to be friendly”), non litigare.",
          "to make a mistake in front of others": "Il problema di Pietro non è sbagliare, ma non sapere cosa dire."
        } },
      { q: "Ines is better at drawing than at writing stories.", options: ["True", "False", "Not given"], answer: "False", difficulty: 2,
        explanation: "Ines dice “my drawings are terrible. I'm better at writing the stories”: è più brava a scrivere che a disegnare, quindi l'affermazione è falsa.",
        notes: {
          "True": "È il contrario: i suoi disegni sono “terrible”, mentre è “better at writing the stories”.",
          "Not given": "L'informazione c'è: Ines lo dice chiaramente a Pietro."
        } },
      { q: "Pietro and Ines's comic won a prize at school.", options: ["True", "False", "Not given"], answer: "Not given", difficulty: 2,
        explanation: "Il testo dice solo che Ms Gallo “asked if she could put it on the classroom wall”. Non si parla di nessun premio.",
        notes: {
          "True": "Appendere il fumetto in classe non vuol dire vincere un premio: il premio non è mai nominato.",
          "False": "Il testo non dice nemmeno che non hanno vinto: semplicemente non parla di premi."
        } },
      { q: "What does the last sentence suggest about Pietro?", options: ["He is still shy, but he is no longer alone", "He has become the most popular student in class", "He and Ines are not friends any more"], answer: "He is still shy, but he is no longer alone", difficulty: 3,
        explanation: "“Pietro… was still quiet – but now he had someone to be quiet with”: il suo carattere non è cambiato (è ancora silenzioso), ma adesso ha un'amica, Ines.",
        notes: {
          "He has become the most popular student in class": "È Ines che tutti conoscono (“everyone knew Ines”); Pietro è ancora silenzioso.",
          "He and Ines are not friends any more": "Al contrario: “someone to be quiet with” è proprio Ines, la sua nuova amica."
        } }
    ]
  }

], 'reading');
