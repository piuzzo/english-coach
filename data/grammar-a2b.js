EC.addItems([

  /* ===================== COMPARATIVES ===================== */
  { id: "comp_001", topic: "comparatives", difficulty: 1, type: "mc", group: "comp_short_er",
    prompt: "My brother is ___ than me.",
    options: ["taller", "more tall", "more taller", "tallest"],
    answers: ["taller"],
    it: "Mio fratello è più alto di me.",
    explanation: "Tall è un aggettivo corto (una sillaba): il comparativo si fa aggiungendo -er → taller. Poi si usa than.",
    notes: {
      "more tall": "Con gli aggettivi corti non si usa more: si aggiunge -er → taller.",
      "more taller": "Errore tipico: more e -er non vanno mai insieme. Basta taller.",
      "tallest": "Tallest è il superlativo (il più alto di tutti). Qui confronti due persone con than: serve il comparativo taller."
    } },
  { id: "comp_002", topic: "comparatives", difficulty: 1, type: "mc", group: "comp_long_more",
    prompt: "This new game is ___ than the old one.",
    options: ["more exciting", "excitinger", "the most exciting", "exciting"],
    answers: ["more exciting"],
    it: "Questo nuovo gioco è più emozionante di quello vecchio.",
    explanation: "Exciting è un aggettivo lungo (tre sillabe): il comparativo si fa con more davanti → more exciting than.",
    notes: {
      "excitinger": "Gli aggettivi lunghi non prendono -er: si mette more davanti → more exciting.",
      "the most exciting": "The most è il superlativo (il più emozionante di tutti) e non si usa con than: qui serve il comparativo more exciting.",
      "exciting": "Manca il comparativo: con than ci vuole more exciting (= più emozionante)."
    } },
  { id: "comp_003", topic: "comparatives", difficulty: 1, type: "mc", group: "comp_irregular",
    prompt: "Wow, your pizza is ___ than mine!",
    options: ["better", "gooder", "more good", "best"],
    answers: ["better"],
    it: "Wow, la tua pizza è più buona della mia!",
    explanation: "Good è irregolare: good → better → the best. Quindi “più buono di” = better than.",
    notes: {
      "gooder": "Good è irregolare: il comparativo non è gooder ma better.",
      "more good": "Errore tipico degli italiani (“più buono”): in inglese si dice better, non more good.",
      "best": "Best è il superlativo (the best = il migliore di tutti). Con than serve il comparativo better."
    } },
  { id: "comp_004", topic: "comparatives", difficulty: 1, type: "mc", group: "comp_than_as",
    prompt: "Rome is bigger ___ Milan.",
    options: ["than", "of", "that", "then"],
    answers: ["than"],
    it: "Roma è più grande di Milano.",
    explanation: "Nei comparativi il “di” italiano si traduce con than: bigger than Milan.",
    notes: {
      "of": "Errore tipico: “più grande di” non si traduce con of. Dopo il comparativo si usa than.",
      "that": "That significa “che/quello”: nei confronti si usa than.",
      "then": "Attenzione all’ortografia: then (con la e) significa “poi, allora”. Nei confronti si scrive than."
    } },
  { id: "comp_005", topic: "comparatives", difficulty: 1, type: "mc", group: "comp_superlative",
    prompt: "Mount Everest is ___ mountain in the world.",
    options: ["the highest", "the higher", "highest", "the most high"],
    answers: ["the highest"],
    it: "L’Everest è la montagna più alta del mondo.",
    explanation: "Per dire “il più … di tutti” si usa il superlativo: the + aggettivo corto + -est → the highest.",
    notes: {
      "the higher": "Higher è il comparativo (più alto di un’altra cosa). Qui l’Everest è il più alto di tutti: serve the highest.",
      "highest": "Il superlativo vuole the davanti: the highest.",
      "the most high": "High è un aggettivo corto: il superlativo è the highest, non the most high."
    } },
  { id: "comp_006", topic: "comparatives", difficulty: 2, type: "gap", group: "comp_short_er",
    prompt: "Today is ___ (hot) than yesterday.",
    answers: ["hotter"],
    it: "Oggi fa più caldo di ieri.",
    explanation: "Hot finisce con vocale + consonante: la consonante finale raddoppia prima di -er → hotter.",
    notes: {
      "hoter": "Ci vuole la doppia t: hot → hotter (come big → bigger).",
      "more hot": "Hot è corto: il comparativo si fa con -er → hotter, non con more.",
      "more hotter": "Non mettere insieme more e -er: basta hotter."
    } },
  { id: "comp_007", topic: "comparatives", difficulty: 2, type: "gap", group: "comp_short_er",
    prompt: "My new phone is ___ (easy) to use than my old one.",
    answers: ["easier"],
    it: "Il mio nuovo telefono è più facile da usare di quello vecchio.",
    explanation: "Gli aggettivi che finiscono in consonante + y cambiano la y in i e aggiungono -er: easy → easier.",
    notes: {
      "easyer": "Quasi! La y diventa i: easy → easier.",
      "more easy": "Easy si comporta come un aggettivo corto: easier, non more easy.",
      "more easier": "Non si usano insieme more e -er: basta easier."
    } },
  { id: "comp_008", topic: "comparatives", difficulty: 2, type: "gap", group: "comp_long_more",
    prompt: "For me, Maths is ___ (difficult) than English: I always get bad marks.",
    answers: ["more difficult"],
    it: "Per me la matematica è più difficile dell’inglese: prendo sempre brutti voti.",
    explanation: "Difficult è un aggettivo lungo: il comparativo si forma con more → more difficult than.",
    notes: {
      "difficulter": "Gli aggettivi lunghi non prendono -er: si dice more difficult.",
      "most difficult": "Most si usa per il superlativo (the most difficult). Con than serve more.",
      "the most difficult": "Questo è il superlativo; davanti a than ci vuole il comparativo more difficult.",
      "difficult": "Manca il comparativo: con than serve more difficult."
    } },
  { id: "comp_009", topic: "comparatives", difficulty: 2, type: "gap", group: "comp_superlative",
    prompt: "This is ___ (bad) film I've ever seen!",
    answers: ["the worst"],
    it: "Questo è il film peggiore che io abbia mai visto!",
    explanation: "Bad è irregolare: bad → worse → the worst. Per “il peggiore” serve il superlativo con the: the worst.",
    notes: {
      "worst": "Il superlativo vuole the davanti: the worst.",
      "the worse": "Worse è il comparativo (peggiore di qualcos’altro). Qui serve il superlativo: the worst.",
      "the baddest": "Bad è irregolare: il superlativo è the worst.",
      "the most bad": "Bad è irregolare: non si dice the most bad, ma the worst."
    } },
  { id: "comp_010", topic: "comparatives", difficulty: 2, type: "order", group: "comp_superlative",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["Sara is the funniest girl in our class.", "In our class Sara is the funniest girl."],
    it: "Sara è la ragazza più divertente della nostra classe.",
    explanation: "Superlativo: the + funniest (funny → funniest, la y diventa i). “Della classe” si dice in our class, non of our class."
  },
  { id: "comp_011", topic: "comparatives", difficulty: 2, type: "mc", group: "comp_than_as",
    prompt: "My sister is as tall ___ my mum now.",
    options: ["as", "than", "like", "of"],
    answers: ["as"],
    it: "Mia sorella adesso è alta come mia mamma.",
    explanation: "Per dire che due cose sono uguali si usa as + aggettivo + as: as tall as.",
    notes: {
      "than": "Than si usa con il comparativo (taller than). Con as … as si ripete as.",
      "like": "Like vuol dire “come”, ma nella struttura as tall as la seconda parola deve essere di nuovo as.",
      "of": "Of non si usa nei confronti: la struttura è as tall as."
    } },
  { id: "comp_012", topic: "comparatives", difficulty: 2, type: "transform", group: "comp_than_as",
    instruction: "Riscrivi la frase iniziando con “Tom is …” e usando un comparativo con than.",
    prompt: "Ben is not as old as Tom.",
    answers: ["Tom is older than Ben.", "Tom is older than Ben is."],
    it: "Ben non è vecchio quanto Tom. → Tom è più grande di Ben.",
    explanation: "Se Ben non è grande quanto Tom, allora Tom è più grande: old → older + than → Tom is older than Ben.",
    notes: {
      "Tom is more old than Ben.": "Old è corto: il comparativo è older, non more old.",
      "Tom is older of Ben.": "“Più grande di” = older than, non older of.",
      "Tom is older that Ben.": "Nei confronti si usa than, non that.",
      "Tom is more older than Ben.": "Non si mettono insieme more e -er: basta older."
    } },
  { id: "comp_013", topic: "comparatives", difficulty: 3, type: "error", group: "comp_short_er",
    prompt: "My new bike is more faster than my old one.",
    wrong: "more faster",
    answers: ["My new bike is faster than my old one."],
    it: "La mia bici nuova è più veloce di quella vecchia.",
    explanation: "Fast è un aggettivo corto: il comparativo è faster. More e -er non vanno mai insieme (come “more bigger”, sbagliato)."
  },
  { id: "comp_014", topic: "comparatives", difficulty: 3, type: "error", group: "comp_superlative",
    prompt: "She is the best player of the team.",
    wrong: "of",
    answers: ["She is the best player in the team.", "She is the best player on the team."],
    it: "È la giocatrice migliore della squadra.",
    explanation: "Dopo un superlativo, per un gruppo o un luogo si usa in, non of: the best player in the team (come the tallest in the world)."
  },
  { id: "comp_015", topic: "comparatives", difficulty: 3, type: "translate", group: "comp_long_more",
    prompt: "In Italia il calcio è più popolare del basket.",
    answers: [
      "In Italy football is more popular than basketball.",
      "Football is more popular than basketball in Italy.",
      "Football is more popular in Italy than basketball.",
      "In Italy soccer is more popular than basketball.",
      "Soccer is more popular than basketball in Italy."
    ],
    explanation: "Popular è un aggettivo lungo: more popular. “Del basket” = than basketball. Gli sport non vogliono articolo: football, non the football.",
    notes: {
      "In Italy football is more popular of basketball.": "“Più … di” si traduce con than, non con of.",
      "In Italy football is popularer than basketball.": "Popular è lungo: si dice more popular, non popularer.",
      "In Italy the football is more popular than the basketball.": "Quando si parla di sport in generale non si mette the: football, basketball."
    } },
  { id: "comp_016", topic: "comparatives", difficulty: 3, type: "translate", group: "comp_irregular",
    prompt: "Il mio voto è peggiore del tuo.",
    answers: ["My mark is worse than yours.", "My grade is worse than yours."],
    explanation: "Bad è irregolare: bad → worse → the worst. “Del tuo” = than yours (pronome possessivo).",
    notes: {
      "My mark is more bad than yours.": "Bad è irregolare: il comparativo è worse, non more bad.",
      "My mark is worse of yours.": "Dopo il comparativo si usa than, non of.",
      "My mark is worst than yours.": "Worst è il superlativo (the worst). Con than serve il comparativo worse.",
      "My mark is worse than your.": "“Il tuo” da solo si dice yours: worse than yours."
    } },

  /* ===================== FUTURE ===================== */
  { id: "fut_001", topic: "future", difficulty: 1, type: "mc", group: "fut_will_form",
    prompt: "I promise I ___ you tomorrow.",
    options: ["will call", "will to call", "will calling", "calling"],
    answers: ["will call"],
    it: "Prometto che ti chiamo domani.",
    explanation: "Per le promesse si usa will + verbo base, senza to: I will (I'll) call you.",
    notes: {
      "will to call": "Errore tipico: dopo will non si mette to. Si dice will call.",
      "will calling": "Dopo will il verbo va alla forma base, senza -ing: will call.",
      "calling": "La forma -ing da sola non è un tempo verbale: serve will call."
    } },
  { id: "fut_002", topic: "future", difficulty: 1, type: "mc", group: "fut_will_form",
    prompt: "Don't worry, I ___ tell anyone your secret.",
    options: ["won't", "don't will", "will not to", "not will"],
    answers: ["won't"],
    it: "Non preoccuparti, non dirò a nessuno il tuo segreto.",
    explanation: "La negativa di will è will not, quasi sempre contratta in won't, seguita dal verbo base: I won't tell.",
    notes: {
      "don't will": "Will non usa do/don't: la negativa è won't (= will not).",
      "will not to": "Dopo will not non si mette to: I will not tell.",
      "not will": "Not va dopo will: will not, cioè won't."
    } },
  { id: "fut_003", topic: "future", difficulty: 1, type: "mc", group: "fut_going_to",
    prompt: "Look at those black clouds! It ___ rain.",
    options: ["is going to", "going to", "is going", "will to"],
    answers: ["is going to"],
    it: "Guarda quelle nuvole nere! Sta per piovere.",
    explanation: "Quando prevedi qualcosa perché lo VEDI (le nuvole nere), si usa be going to + verbo base: It is going to rain.",
    notes: {
      "going to": "Manca il verbo be: it IS going to rain.",
      "is going": "Manca to: la forma è is going to + verbo base.",
      "will to": "Dopo will non si mette mai to. E qui, con una prova visibile (le nuvole), si usa is going to."
    } },
  { id: "fut_004", topic: "future", difficulty: 1, type: "mc", group: "fut_arrangement",
    prompt: "I ___ my cousins at the station at six o'clock this evening. We arranged it last week.",
    options: ["am meeting", "meeting", "am meet", "will to meet"],
    answers: ["am meeting"],
    it: "Stasera alle sei incontro i miei cugini alla stazione. L’abbiamo organizzato la settimana scorsa.",
    explanation: "Per un appuntamento già fissato (con ora e luogo) si usa il present continuous: I am meeting.",
    notes: {
      "meeting": "Manca il verbo be: I AM meeting.",
      "am meet": "Dopo am il verbo prende -ing: am meeting.",
      "will to meet": "Dopo will non si mette to; e per un appuntamento già fissato si usa il present continuous."
    } },
  { id: "fut_005", topic: "future", difficulty: 1, type: "mc", group: "fut_will_decision",
    prompt: "A: I'm so thirsty! B: Wait, I ___ you a glass of water.",
    options: ["will get", "get", "will to get", "getting"],
    answers: ["will get"],
    it: "A: Ho tanta sete! B: Aspetta, ti prendo un bicchiere d’acqua.",
    explanation: "B decide in quel momento di aiutare: per le decisioni prese sul momento e le offerte si usa will + verbo base (I'll get).",
    notes: {
      "get": "In italiano si usa il presente (“ti prendo”), ma in inglese per una decisione presa ora serve will: I'll get.",
      "will to get": "Dopo will non si mette to: will get.",
      "getting": "La forma -ing da sola non è un tempo verbale: serve will get."
    } },
  { id: "fut_006", topic: "future", difficulty: 2, type: "gap", group: "fut_going_to",
    prompt: "My sister has already decided: she ___ (study) medicine at university.",
    answers: ["is going to study"],
    it: "Mia sorella ha già deciso: studierà medicina all’università.",
    explanation: "Per un’intenzione già decisa prima di parlare si usa be going to + verbo base: she is going to study.",
    notes: {
      "will study": "Will si usa per decisioni prese sul momento; qui lei ha GIÀ deciso, quindi si usa is going to study.",
      "going to study": "Manca il verbo be: she IS going to study.",
      "is going to studying": "Dopo going to il verbo resta alla forma base: study.",
      "will to study": "Dopo will non si mette to. E per un piano già deciso si usa is going to study."
    } },
  { id: "fut_007", topic: "future", difficulty: 2, type: "gap", group: "fut_will_prediction",
    prompt: "I think Italy ___ (win) the match tonight.",
    answers: ["will win", "are going to win", "is going to win"],
    it: "Penso che l’Italia vincerà la partita stasera.",
    explanation: "Per previsioni e opinioni, soprattutto dopo I think, si usa di solito will + verbo base: will win.",
    notes: {
      "will to win": "Dopo will non si mette to: will win.",
      "wins": "Per una previsione sul futuro serve will: will win.",
      "win": "Per una previsione sul futuro serve will: will win.",
      "will wins": "Dopo will il verbo non prende la -s: will win."
    } },
  { id: "fut_008", topic: "future", difficulty: 2, type: "mc", group: "fut_will_prediction",
    prompt: "In fifty years, people ___ on Mars.",
    options: ["will live", "live", "are living", "will living"],
    answers: ["will live"],
    it: "Tra cinquant’anni le persone vivranno su Marte.",
    explanation: "Per una previsione sul futuro lontano (un’opinione, non un piano) si usa will + verbo base: will live.",
    notes: {
      "live": "Il present simple qui parlerebbe di oggi, non del futuro: serve will live.",
      "are living": "Il present continuous si usa per appuntamenti già fissati, non per previsioni sul futuro lontano.",
      "will living": "Dopo will il verbo va alla forma base: will live."
    } },
  { id: "fut_009", topic: "future", difficulty: 2, type: "order", group: "fut_going_to",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["We are going to visit our grandparents on Sunday.", "On Sunday we are going to visit our grandparents."],
    it: "Domenica andiamo a trovare i nonni.",
    explanation: "Piano già deciso: soggetto + are going to + verbo base (visit). Il tempo (on Sunday) va alla fine o all’inizio."
  },
  { id: "fut_010", topic: "future", difficulty: 2, type: "transform", group: "fut_will_form",
    instruction: "Volgi alla forma negativa.",
    prompt: "Marco will come to the party.",
    answers: ["Marco won't come to the party."],
    it: "Marco non verrà alla festa.",
    explanation: "Negativa di will: will not, contratto won't, + verbo base: Marco won't come.",
    notes: {
      "Marco doesn't will come to the party.": "Will non vuole do/does: la negativa è won't (will not).",
      "Marco will not to come to the party.": "Dopo will not non si mette to: will not come.",
      "Marco won't comes to the party.": "Dopo won't il verbo resta alla forma base: come."
    } },
  { id: "fut_011", topic: "future", difficulty: 2, type: "transform", group: "fut_arrangement",
    instruction: "Volgi alla forma interrogativa.",
    prompt: "You are playing football after school tomorrow.",
    answers: ["Are you playing football after school tomorrow?"],
    it: "Giochi a calcio domani dopo la scuola?",
    explanation: "Nella domanda al present continuous si inverte il verbo be con il soggetto: Are you playing …?",
    notes: {
      "Do you playing football after school tomorrow?": "Con il present continuous non si usa do: si mette are prima del soggetto.",
      "You are playing football after school tomorrow?": "Nelle domande inglesi l'ordine cambia: Are you playing …?",
      "Do you play football after school tomorrow?": "Per un impegno già fissato si mantiene il present continuous: Are you playing …?"
    } },
  { id: "fut_012", topic: "future", difficulty: 2, type: "mc", group: "fut_going_to",
    prompt: "Watch out! That ball ___ hit the window!",
    options: ["is going to", "goes to", "is going", "will to"],
    answers: ["is going to"],
    it: "Attento! Quella palla sta per colpire la finestra!",
    explanation: "Vedi che sta per succedere qualcosa (la palla vola verso la finestra): si usa be going to + verbo base.",
    notes: {
      "goes to": "Goes to non forma il futuro: serve is going to.",
      "is going": "Manca to: is going to hit.",
      "will to": "Dopo will non si mette to; e quando vedi che una cosa sta per succedere si usa is going to."
    } },
  { id: "fut_013", topic: "future", difficulty: 3, type: "error", group: "fut_will_form",
    prompt: "Don't worry, I will to help you with your homework.",
    wrong: "will to help",
    answers: ["Don't worry, I will help you with your homework."],
    it: "Non preoccuparti, ti aiuterò con i compiti.",
    explanation: "Dopo will il verbo va alla forma base SENZA to: I will help (I'll help)."
  },
  { id: "fut_014", topic: "future", difficulty: 3, type: "error", group: "fut_going_to",
    prompt: "Look! That boy is going fall off his skateboard!",
    wrong: "going fall",
    answers: ["Look! That boy is going to fall off his skateboard!"],
    it: "Guarda! Quel ragazzo sta per cadere dallo skateboard!",
    explanation: "La forma completa è be going TO + verbo base: is going to fall. Senza to la frase è sbagliata."
  },
  { id: "fut_015", topic: "future", difficulty: 3, type: "translate", group: "fut_arrangement",
    prompt: "Domani pomeriggio gioco a tennis con Sara (è già tutto organizzato).",
    answers: [
      "I'm playing tennis with Sara tomorrow afternoon.",
      "Tomorrow afternoon I'm playing tennis with Sara.",
      "I'm going to play tennis with Sara tomorrow afternoon.",
      "Tomorrow afternoon I'm going to play tennis with Sara."
    ],
    explanation: "In italiano usiamo il presente, ma in inglese per un appuntamento già fissato si usa il present continuous: I'm playing tennis.",
    notes: {
      "I play tennis with Sara tomorrow afternoon.": "Il present simple non si usa per i tuoi impegni futuri: serve I'm playing.",
      "Tomorrow afternoon I play tennis with Sara.": "Il present simple non si usa per i tuoi impegni futuri: serve I'm playing.",
      "I'm playing the tennis with Sara tomorrow afternoon.": "Con gli sport non si mette the: play tennis."
    } },
  { id: "fut_016", topic: "future", difficulty: 3, type: "translate", group: "fut_will_decision",
    prompt: "(Il tuo amico ha fame.) Ti preparo un panino!",
    answers: [
      "I'll make you a sandwich!",
      "I'll make a sandwich for you!",
      "I'll prepare you a sandwich!",
      "I'll prepare a sandwich for you!",
      "I'll get you a sandwich!"
    ],
    explanation: "È un’offerta decisa in questo momento: si usa will + verbo base → I'll make you a sandwich.",
    notes: {
      "I make you a sandwich!": "In italiano si usa il presente, ma per un’offerta decisa sul momento in inglese serve will: I'll make.",
      "I'm going to make you a sandwich!": "Going to si usa per piani già decisi prima; per un’offerta nata adesso si usa will: I'll make.",
      "I will to make you a sandwich!": "Dopo will non si mette to: I will make."
    } },

  /* ===================== MODALS: MUST / HAVE TO / SHOULD ===================== */
  { id: "mod_001", topic: "modals_obligation", difficulty: 1, type: "mc", group: "mod_must_base",
    prompt: "You ___ wear a helmet when you ride a motorbike. It's the law.",
    options: ["must", "must to", "musts", "musting"],
    answers: ["must"],
    it: "Devi indossare il casco quando vai in moto. È la legge.",
    explanation: "Must è seguito dal verbo base, senza to: you must wear.",
    notes: {
      "must to": "Dopo must non si mette to: must wear.",
      "musts": "Must non prende mai la -s (e qui il soggetto è you).",
      "musting": "Must non ha la forma in -ing: si usa sempre così com’è."
    } },
  { id: "mod_002", topic: "modals_obligation", difficulty: 1, type: "mc", group: "mod_mustnt_vs_dont_have_to",
    prompt: "You ___ use your phone during the test. It's against the rules!",
    options: ["mustn't", "don't have to", "should", "must"],
    answers: ["mustn't"],
    it: "Non devi usare il telefono durante la verifica. È vietato!",
    explanation: "È VIETATO: si usa mustn't (must not) + verbo base.",
    notes: {
      "don't have to": "Don't have to significa “non è necessario”, non “è vietato”. Per un divieto si usa mustn't.",
      "should": "Should è un consiglio (“dovresti”): qui il senso è opposto, è proibito.",
      "must": "Must significa “devi”: qui invece è vietato, serve la negativa mustn't."
    } },
  { id: "mod_003", topic: "modals_obligation", difficulty: 1, type: "mc", group: "mod_mustnt_vs_dont_have_to",
    prompt: "It's Saturday tomorrow, so I ___ get up early. I can sleep until ten!",
    options: ["don't have to", "mustn't", "have to", "doesn't have to"],
    answers: ["don't have to"],
    it: "Domani è sabato, quindi non devo alzarmi presto. Posso dormire fino alle dieci!",
    explanation: "Non è NECESSARIO alzarsi presto: si usa don't have to. (Mustn't vorrebbe dire che è vietato!)",
    notes: {
      "mustn't": "Mustn't significa “è vietato”: non è vietato alzarsi presto, è solo non necessario → don't have to.",
      "have to": "Have to significa “devo”: ma domani è sabato e puoi dormire, quindi serve la negativa.",
      "doesn't have to": "Con I si usa don't, non doesn't (doesn't è per he/she/it)."
    } },
  { id: "mod_004", topic: "modals_obligation", difficulty: 1, type: "mc", group: "mod_should_advice",
    prompt: "You look really tired. You ___ go to bed early tonight.",
    options: ["should", "should to", "shoulds", "shouldn't"],
    answers: ["should"],
    it: "Sembri davvero stanco. Dovresti andare a letto presto stasera.",
    explanation: "Per dare un consiglio si usa should + verbo base, senza to: you should go.",
    notes: {
      "should to": "Dopo should non si mette to: should go.",
      "shoulds": "Should non prende mai la -s.",
      "shouldn't": "Shouldn't vuol dire “non dovresti”: ma se sei stanco il consiglio è di andare a letto presto, quindi should."
    } },
  { id: "mod_005", topic: "modals_obligation", difficulty: 1, type: "mc", group: "mod_have_to_form",
    prompt: "My brother ___ wear a uniform at his school.",
    options: ["has to", "have to", "must to", "haves to"],
    answers: ["has to"],
    it: "Mio fratello deve indossare la divisa nella sua scuola.",
    explanation: "Have to si coniuga come have: con he/she/it diventa has to (my brother = he).",
    notes: {
      "have to": "Con la terza persona singolare (my brother = he) serve has to.",
      "must to": "Dopo must non si mette to.",
      "haves to": "La terza persona di have è has, non haves."
    } },
  { id: "mod_006", topic: "modals_obligation", difficulty: 2, type: "gap", group: "mod_have_to_form",
    prompt: "Yesterday I ___ (have to) walk to school because the bus didn't come.",
    answers: ["had to"],
    it: "Ieri ho dovuto andare a scuola a piedi perché l’autobus non è arrivato.",
    explanation: "Must non ha il passato: per un obbligo nel passato si usa had to.",
    notes: {
      "must": "Must non si usa per il passato: “ho dovuto” = had to.",
      "have to": "Yesterday indica il passato: serve had to.",
      "musted": "Must non ha la forma del passato: si usa had to.",
      "haved to": "Il passato di have è had: had to."
    } },
  { id: "mod_007", topic: "modals_obligation", difficulty: 2, type: "gap", group: "mod_should_advice",
    prompt: "You ___ (not / should) eat so many sweets. They're bad for your teeth.",
    answers: ["shouldn't"],
    it: "Non dovresti mangiare così tanti dolci. Fanno male ai denti.",
    explanation: "La negativa di should è should not, contratto shouldn't, seguito dal verbo base.",
    notes: {
      "don't should": "Should non usa do/don't: la negativa è shouldn't.",
      "not should": "Not va dopo should: should not (shouldn't).",
      "should": "Ti è stato chiesto il negativo: shouldn't."
    } },
  { id: "mod_008", topic: "modals_obligation", difficulty: 2, type: "gap", group: "mod_have_to_form",
    prompt: "___ your sister have to help at home every day?",
    answers: ["Does"],
    it: "Tua sorella deve aiutare in casa tutti i giorni?",
    explanation: "Have to forma le domande con do/does, come un verbo normale: Does your sister have to …?",
    notes: {
      "Do": "Your sister = she: con la terza persona singolare si usa does.",
      "Has": "Have to non fa la domanda con has davanti: si usa does + have to.",
      "Must": "Must non si usa con have to: la domanda è Does … have to?"
    } },
  { id: "mod_009", topic: "modals_obligation", difficulty: 2, type: "order", group: "mod_mustnt_vs_dont_have_to",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["We don't have to wear a uniform at school.", "At school we don't have to wear a uniform."],
    it: "A scuola non dobbiamo (non è obbligatorio) indossare la divisa.",
    explanation: "Don't have to = non è necessario. Ordine: soggetto + don't have to + verbo base."
  },
  { id: "mod_010", topic: "modals_obligation", difficulty: 2, type: "transform", group: "mod_must_base",
    instruction: "Riscrivi la frase usando must al posto di has to.",
    prompt: "He has to be home by ten.",
    answers: ["He must be home by ten."],
    it: "Deve essere a casa entro le dieci.",
    explanation: "Must non cambia con he/she/it e non vuole to: he must be.",
    notes: {
      "He musts be home by ten.": "Must non prende mai la -s, nemmeno con he.",
      "He must to be home by ten.": "Dopo must non si mette to.",
      "He must is home by ten.": "Dopo must il verbo va alla forma base: be, non is."
    } },
  { id: "mod_011", topic: "modals_obligation", difficulty: 2, type: "mc", group: "mod_mustnt_vs_dont_have_to",
    prompt: "Entry to the museum is free for students, so you ___ pay.",
    options: ["don't have to", "mustn't", "have to", "doesn't have to"],
    answers: ["don't have to"],
    it: "L’ingresso al museo è gratis per gli studenti, quindi non devi pagare.",
    explanation: "Non è NECESSARIO pagare (è gratis): si usa don't have to.",
    notes: {
      "mustn't": "Mustn't significa “è vietato”: non è vietato pagare, semplicemente non serve → don't have to.",
      "have to": "Have to significa “devi”: ma l’ingresso è gratis.",
      "doesn't have to": "Con you si usa don't, non doesn't."
    } },
  { id: "mod_012", topic: "modals_obligation", difficulty: 3, type: "error", group: "mod_must_base",
    prompt: "She musts tidy her room before dinner.",
    wrong: "musts",
    answers: ["She must tidy her room before dinner."],
    it: "Deve mettere in ordine la sua camera prima di cena.",
    explanation: "Must è uguale per tutte le persone: non prende mai la -s, nemmeno con she."
  },
  { id: "mod_013", topic: "modals_obligation", difficulty: 3, type: "error", group: "mod_have_to_form",
    prompt: "Last week we must study for three tests.",
    wrong: "must",
    answers: ["Last week we had to study for three tests."],
    it: "La settimana scorsa abbiamo dovuto studiare per tre verifiche.",
    explanation: "Must non ha il passato: per dire “abbiamo dovuto” si usa had to."
  },
  { id: "mod_014", topic: "modals_obligation", difficulty: 3, type: "translate", group: "mod_mustnt_vs_dont_have_to",
    prompt: "Domani non devi portare il libro (non serve).",
    answers: [
      "You don't have to bring the book tomorrow.",
      "Tomorrow you don't have to bring the book.",
      "You don't need to bring the book tomorrow.",
      "Tomorrow you don't need to bring the book.",
      "You needn't bring the book tomorrow."
    ],
    explanation: "“Non serve” = non è necessario → don't have to (o don't need to). Mustn't vorrebbe dire che è vietato portarlo!",
    notes: {
      "You mustn't bring the book tomorrow.": "Mustn't significa “è vietato”. Qui non è vietato, solo non necessario: don't have to.",
      "Tomorrow you mustn't bring the book.": "Mustn't significa “è vietato”. Qui non è vietato, solo non necessario: don't have to.",
      "You haven't to bring the book tomorrow.": "La negativa di have to si fa con don't: you don't have to."
    } },
  { id: "mod_015", topic: "modals_obligation", difficulty: 3, type: "translate", group: "mod_mustnt_vs_dont_have_to",
    prompt: "Non dovete correre nei corridoi: è vietato!",
    answers: [
      "You mustn't run in the corridors!",
      "You mustn't run in the corridor!",
      "You can't run in the corridors!",
      "You can't run in the corridor!"
    ],
    explanation: "È VIETATO: si usa mustn't + verbo base (oppure can't, “non si può”).",
    notes: {
      "You don't have to run in the corridors!": "Don't have to vuol dire “non è necessario”: qui è un divieto, serve mustn't.",
      "You must not to run in the corridors!": "Dopo must not non si mette to.",
      "You shouldn't run in the corridors!": "Shouldn't è solo un consiglio; qui è vietato, quindi mustn't."
    } },
  { id: "mod_016", topic: "modals_obligation", difficulty: 3, type: "transform", group: "mod_have_to_form",
    instruction: "Riscrivi la frase al passato, aggiungendo yesterday.",
    prompt: "Tom must take the dog for a walk.",
    answers: ["Yesterday Tom had to take the dog for a walk.", "Tom had to take the dog for a walk yesterday."],
    it: "Ieri Tom ha dovuto portare fuori il cane.",
    explanation: "Must non ha il passato: si usa had to + verbo base (take resta alla forma base).",
    notes: {
      "Yesterday Tom must take the dog for a walk.": "Must non si usa per il passato: serve had to.",
      "Yesterday Tom had to took the dog for a walk.": "Dopo had to il verbo resta alla forma base: take.",
      "Yesterday Tom musted take the dog for a walk.": "Must non ha forma passata: si usa had to.",
      "Tom had to took the dog for a walk yesterday.": "Dopo had to il verbo resta alla forma base: take."
    } },

  /* ===================== ARTICLES: THE / NO ARTICLE ===================== */
  { id: "the_001", topic: "articles_the", difficulty: 1, type: "mc", group: "the_general",
    prompt: "Vuoi dire che ami i cani in generale. Scegli la frase corretta.",
    options: ["I love dogs.", "I love the dogs.", "I love the dog."],
    answers: ["I love dogs."],
    explanation: "Quando si parla di una categoria in generale, con un nome plurale non si mette the: I love dogs.",
    notes: {
      "I love the dogs.": "Con the parleresti di cani precisi (quelli lì). Per i cani in generale: I love dogs, senza the.",
      "I love the dog.": "Così parli di un cane preciso. In generale si usa il plurale senza articolo: dogs."
    } },
  { id: "the_002", topic: "articles_the", difficulty: 1, type: "mc", group: "the_sports_meals_subjects",
    prompt: "My brother plays ___ football every Saturday.",
    options: ["(nessun articolo)", "the", "a"],
    answers: ["(nessun articolo)"],
    it: "Mio fratello gioca a calcio ogni sabato.",
    explanation: "Con gli sport non si usa l’articolo: play football, play tennis, play basketball.",
    notes: {
      "the": "Con gli sport non si mette the: play football.",
      "a": "Football non è una cosa che si conta: play football, senza articolo."
    } },
  { id: "the_003", topic: "articles_the", difficulty: 1, type: "mc", group: "the_unique",
    prompt: "Look at ___ moon! It's so bright tonight.",
    options: ["the", "a", "(nessun articolo)"],
    answers: ["the"],
    it: "Guarda la luna! È così luminosa stasera.",
    explanation: "Le cose uniche, che esistono una sola volta (the moon, the sun, the sky), vogliono the.",
    notes: {
      "a": "La luna è una sola: si usa the, non a.",
      "(nessun articolo)": "La luna è unica: in questo caso the è obbligatorio, come in italiano “la luna”."
    } },
  { id: "the_004", topic: "articles_the", difficulty: 1, type: "mc", group: "the_general",
    prompt: "Scegli la frase corretta.",
    options: ["Life is beautiful.", "The life is beautiful.", "A life is beautiful."],
    answers: ["Life is beautiful."],
    it: "La vita è bella.",
    explanation: "I nomi astratti usati in generale (life, love, music, nature) non vogliono the: Life is beautiful.",
    notes: {
      "The life is beautiful.": "Errore tipico: in italiano diciamo “la vita”, ma in inglese, parlando in generale, non si mette the.",
      "A life is beautiful.": "Qui si parla della vita in generale: niente articolo, Life is beautiful."
    } },
  { id: "the_005", topic: "articles_the", difficulty: 1, type: "mc", group: "the_specific",
    prompt: "(A tavola) Can you pass me ___ salt, please?",
    options: ["the", "a", "(nessun articolo)"],
    answers: ["the"],
    it: "Mi passi il sale, per favore?",
    explanation: "Parli di un sale preciso, quello che c’è sul tavolo: si usa the.",
    notes: {
      "a": "Salt non si conta (non si dice “un sale”); e qui è il sale preciso sul tavolo: the salt.",
      "(nessun articolo)": "Non parli del sale in generale, ma di quello sul tavolo: serve the."
    } },
  { id: "the_006", topic: "articles_the", difficulty: 2, type: "gap", group: "the_specific",
    prompt: "I've got a cat and a dog. ___ cat is black and the dog is white.",
    answers: ["The", "My"],
    it: "Ho un gatto e un cane. Il gatto è nero e il cane è bianco.",
    explanation: "La prima volta si dice a cat; quando lo nomini di nuovo, il gatto è ormai preciso e conosciuto: the cat.",
    notes: {
      "A": "A si usa quando nomini una cosa per la prima volta. Il gatto è già stato nominato: the cat."
    } },
  { id: "the_007", topic: "articles_the", difficulty: 2, type: "mc", group: "the_specific",
    prompt: "___ students in my class are really friendly.",
    options: ["The", "(nessun articolo)", "A"],
    answers: ["The"],
    it: "Gli studenti della mia classe sono molto simpatici.",
    explanation: "Non parli degli studenti in generale, ma di quelli precisi della tua classe (in my class): serve the.",
    notes: {
      "(nessun articolo)": "Senza articolo parleresti degli studenti in generale; “in my class” li rende precisi: the students.",
      "A": "A si usa solo con un nome singolare; students è plurale."
    } },
  { id: "the_008", topic: "articles_the", difficulty: 2, type: "mc", group: "the_sports_meals_subjects",
    prompt: "Scegli la frase corretta.",
    options: [
      "I think English is easier than Maths.",
      "I think the English is easier than the Maths.",
      "I think the English is easier than Maths."
    ],
    answers: ["I think English is easier than Maths."],
    it: "Penso che l’inglese sia più facile della matematica.",
    explanation: "Le lingue e le materie scolastiche non vogliono l’articolo: English, Maths, History.",
    notes: {
      "I think the English is easier than the Maths.": "In italiano diciamo “l’inglese” e “la matematica”, ma in inglese materie e lingue non hanno articolo.",
      "I think the English is easier than Maths.": "Anche English, come lingua o materia, non vuole the."
    } },
  { id: "the_009", topic: "articles_the", difficulty: 2, type: "order", group: "the_places_expressions",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["We go to school by bus.", "We go by bus to school."],
    it: "Andiamo a scuola in autobus.",
    explanation: "Espressioni fisse senza articolo: go to school, by bus (anche by car, by train)."
  },
  { id: "the_010", topic: "articles_the", difficulty: 2, type: "transform", group: "the_general",
    instruction: "Riscrivi la frase in modo che parli di TUTTI i ragazzi in generale (togli “in my class”).",
    prompt: "The teenagers in my class love video games.",
    answers: ["Teenagers love video games."],
    it: "Ai ragazzi piacciono i videogiochi.",
    explanation: "Se parli di tutti i ragazzi in generale, il plurale non vuole the: Teenagers love video games.",
    notes: {
      "The teenagers love video games.": "Con the parleresti di ragazzi precisi. In generale: Teenagers, senza the.",
      "Teenagers love the video games.": "Anche video games è in generale: niente the.",
      "The teenagers love the video games.": "Parlando in generale non si usa the né con teenagers né con video games."
    } },
  { id: "the_011", topic: "articles_the", difficulty: 2, type: "mc", group: "the_places_expressions",
    prompt: "It's eleven o'clock. It's time to go to ___ bed!",
    options: ["(nessun articolo)", "the", "a"],
    answers: ["(nessun articolo)"],
    it: "Sono le undici. È ora di andare a letto!",
    explanation: "Go to bed (andare a dormire) è un’espressione fissa senza articolo, come go to school, at home.",
    notes: {
      "the": "Go to the bed vorrebbe dire andare verso il mobile letto. Per “andare a dormire” si dice go to bed.",
      "a": "Go to bed è un’espressione fissa: niente articolo."
    } },
  { id: "the_012", topic: "articles_the", difficulty: 3, type: "error", group: "the_general",
    prompt: "The life is too short to be sad.",
    wrong: "The life",
    answers: ["Life is too short to be sad."],
    it: "La vita è troppo breve per essere tristi.",
    explanation: "Life, parlando in generale, non vuole the (anche se in italiano diciamo “la vita”)."
  },
  { id: "the_013", topic: "articles_the", difficulty: 3, type: "error", group: "the_sports_meals_subjects",
    prompt: "On Sundays I play the tennis with my dad.",
    wrong: "the tennis",
    answers: ["On Sundays I play tennis with my dad."],
    it: "La domenica gioco a tennis con mio papà.",
    explanation: "Con gli sport non si usa l’articolo: play tennis, play football."
  },
  { id: "the_014", topic: "articles_the", difficulty: 3, type: "translate", group: "the_general",
    prompt: "Mi piace la pizza ma non mi piacciono i funghi.",
    answers: ["I like pizza but I don't like mushrooms.", "I like pizza, but I don't like mushrooms."],
    explanation: "Parli di pizza e funghi in generale: in inglese niente the (anche se in italiano diciamo “la pizza”, “i funghi”).",
    notes: {
      "I like the pizza but I don't like the mushrooms.": "Errore tipico: parlando in generale non si mette the. I like pizza, I don't like mushrooms.",
      "I like pizza but I don't like the mushrooms.": "Anche i funghi sono in generale: mushrooms, senza the.",
      "I like the pizza but I don't like mushrooms.": "La pizza qui è in generale: pizza, senza the."
    } },
  { id: "the_015", topic: "articles_the", difficulty: 3, type: "translate", group: "the_unique",
    prompt: "Il sole è la stella più vicina alla Terra.",
    answers: [
      "The sun is the closest star to the Earth.",
      "The sun is the closest star to Earth.",
      "The sun is the nearest star to the Earth.",
      "The sun is the nearest star to Earth."
    ],
    explanation: "Il sole è unico (the sun) e con il superlativo si usa sempre the: the closest / the nearest star.",
    notes: {
      "Sun is the closest star to the Earth.": "Il sole è unico: serve the sun.",
      "The sun is closest star to the Earth.": "Con il superlativo ci vuole the: the closest star.",
      "The sun is the most close star to the Earth.": "Close è corto: il superlativo è the closest."
    } },
  { id: "the_016", topic: "articles_the", difficulty: 3, type: "error", group: "the_sports_meals_subjects",
    prompt: "Every morning I have the breakfast at seven.",
    wrong: "the breakfast",
    answers: ["Every morning I have breakfast at seven."],
    it: "Ogni mattina faccio colazione alle sette.",
    explanation: "I pasti (breakfast, lunch, dinner) non vogliono l’articolo: have breakfast."
  },

  /* ===================== PREPOSITIONS OF PLACE ===================== */
  { id: "plc_001", topic: "prep_place", difficulty: 1, type: "mc", group: "plc_on_surface",
    prompt: "My keys are ___ the table.",
    options: ["on", "in", "at"],
    answers: ["on"],
    it: "Le mie chiavi sono sul tavolo.",
    explanation: "Sopra una superficie si usa on: on the table, on the floor.",
    notes: {
      "in": "In the table vorrebbe dire “dentro il tavolo”! Sulla superficie si usa on.",
      "at": "At indica un punto o un luogo (at the bus stop); sopra una superficie si usa on."
    } },
  { id: "plc_002", topic: "prep_place", difficulty: 1, type: "mc", group: "plc_in",
    prompt: "My aunt lives ___ Rome.",
    options: ["in", "at", "to"],
    answers: ["in"],
    it: "Mia zia vive a Roma.",
    explanation: "Con città e paesi si usa in: in Rome, in London, in Italy.",
    notes: {
      "at": "Errore tipico: “a Roma” non si traduce at Rome. Con le città si usa in.",
      "to": "To indica il movimento verso un luogo (go to Rome). Per dove vivi si usa in."
    } },
  { id: "plc_003", topic: "prep_place", difficulty: 1, type: "mc", group: "plc_at_point",
    prompt: "I'm ___ home. Come and see me!",
    options: ["at", "in", "to"],
    answers: ["at"],
    it: "Sono a casa. Vieni a trovarmi!",
    explanation: "“Essere a casa” si dice be at home (come at school, at work).",
    notes: {
      "in": "Si dice at home, non in home.",
      "to": "To indica movimento; per dire dove sei: at home."
    } },
  { id: "plc_004", topic: "prep_place", difficulty: 1, type: "mc", group: "plc_other",
    prompt: "My shoes are ___ the bed, on the floor.",
    options: ["under", "on", "in", "at"],
    answers: ["under"],
    it: "Le mie scarpe sono sotto il letto, sul pavimento.",
    explanation: "Sotto = under: under the bed, under the table.",
    notes: {
      "on": "On the bed = sopra il letto; ma le scarpe sono sul pavimento, quindi sotto: under.",
      "in": "In the bed = dentro il letto (sotto le coperte): non con le scarpe sul pavimento!",
      "at": "At indica un punto preciso; “sotto” si dice under."
    } },
  { id: "plc_005", topic: "prep_place", difficulty: 1, type: "mc", group: "plc_on_surface",
    prompt: "There's a poster of my favourite band ___ the wall.",
    options: ["on", "in", "at"],
    answers: ["on"],
    it: "C’è un poster della mia band preferita sul muro.",
    explanation: "Una cosa appesa a un muro sta sulla sua superficie: on the wall.",
    notes: {
      "in": "In the wall vorrebbe dire “dentro il muro”. Per un poster appeso: on the wall.",
      "at": "At the wall significa “vicino/davanti al muro”; il poster è attaccato sopra: on the wall."
    } },
  { id: "plc_006", topic: "prep_place", difficulty: 2, type: "gap", group: "plc_at_point",
    prompt: "We're waiting for you ___ the bus stop.",
    answers: ["at"],
    it: "Ti stiamo aspettando alla fermata dell’autobus.",
    explanation: "Per un punto preciso (un luogo dove ci si incontra) si usa at: at the bus stop, at the station.",
    notes: {
      "in": "Non sei “dentro” la fermata: per un punto preciso si usa at.",
      "on": "On si usa per le superfici; per un punto preciso: at the bus stop.",
      "to": "To indica movimento; qui stai fermo in un punto: at."
    } },
  { id: "plc_007", topic: "prep_place", difficulty: 2, type: "gap", group: "plc_on_surface",
    prompt: "My bedroom is ___ the second floor.",
    answers: ["on"],
    it: "La mia camera è al secondo piano.",
    explanation: "Per i piani di un edificio si usa on: on the second floor, on the ground floor.",
    notes: {
      "at": "In italiano diciamo “al secondo piano”, ma in inglese si usa on: on the second floor.",
      "in": "Per i piani si usa on, non in."
    } },
  { id: "plc_008", topic: "prep_place", difficulty: 2, type: "gap", group: "plc_other",
    prompt: "The bakery is ___ (tra) the supermarket and the chemist's.",
    answers: ["between"],
    it: "Il panificio è tra il supermercato e la farmacia.",
    explanation: "“Tra” due cose si dice between (between A and B).",
    notes: {
      "among": "Among significa “tra” in mezzo a tante cose; tra due cose si usa between.",
      "in": "In non vuol dire “tra”: per stare in mezzo a due cose si usa between.",
      "next to": "Next to = accanto a una sola cosa; qui ci sono due cose ai lati: between."
    } },
  { id: "plc_009", topic: "prep_place", difficulty: 2, type: "order", group: "plc_in",
    prompt: "Riordina le parole per formare una frase.",
    answers: ["My phone is in my school bag."],
    it: "Il mio telefono è nello zaino.",
    explanation: "Dentro un contenitore (borsa, scatola, stanza) si usa in: in my school bag."
  },
  { id: "plc_010", topic: "prep_place", difficulty: 2, type: "mc", group: "plc_in",
    prompt: "We arrived ___ Milan at nine o'clock.",
    options: ["in", "at", "to"],
    answers: ["in"],
    it: "Siamo arrivati a Milano alle nove.",
    explanation: "Arrive + città o paese vuole in: arrive in Milan, arrive in Italy.",
    notes: {
      "at": "Con le città si usa in, anche dopo arrive (at si usa per luoghi piccoli, come at the station).",
      "to": "Errore tipico: dopo arrive non si usa mai to. Si dice arrive in Milan."
    } },
  { id: "plc_011", topic: "prep_place", difficulty: 2, type: "transform", group: "plc_other",
    instruction: "Riscrivi la frase iniziando con “The bus …” e usando in front of.",
    prompt: "The car is behind the bus.",
    answers: ["The bus is in front of the car."],
    it: "La macchina è dietro l’autobus. → L’autobus è davanti alla macchina.",
    explanation: "Se la macchina è dietro (behind) l’autobus, l’autobus è davanti (in front of) alla macchina. Ricorda: in front OF.",
    notes: {
      "The bus is in front the car.": "Manca of: la forma completa è in front of.",
      "The bus is in front of to the car.": "Dopo in front of non si mette to: in front of the car.",
      "The bus is behind the car.": "Hai invertito il significato: se la macchina è dietro, l’autobus è davanti → in front of."
    } },
  { id: "plc_012", topic: "prep_place", difficulty: 3, type: "error", group: "plc_in",
    prompt: "My cousins live at Rome.",
    wrong: "at",
    answers: ["My cousins live in Rome."],
    it: "I miei cugini vivono a Roma.",
    explanation: "Con le città si usa in: live in Rome (non at Rome, anche se in italiano diciamo “a Roma”)."
  },
  { id: "plc_013", topic: "prep_place", difficulty: 3, type: "error", group: "plc_on_surface",
    prompt: "Your sandwich is in the table.",
    wrong: "in",
    answers: ["Your sandwich is on the table."],
    it: "Il tuo panino è sul tavolo.",
    explanation: "Sopra una superficie si usa on: on the table. In the table vorrebbe dire “dentro il tavolo”."
  },
  { id: "plc_014", topic: "prep_place", difficulty: 3, type: "translate", group: "plc_at_point",
    prompt: "Mia sorella è a casa con il mio cane.",
    answers: ["My sister is at home with my dog.", "My sister's at home with my dog.", "My sister is home with my dog."],
    explanation: "“Essere a casa” = be at home, senza the e con at.",
    notes: {
      "My sister is in home with my dog.": "Si dice at home, non in home.",
      "My sister is at the home with my dog.": "At home è un’espressione fissa: niente the.",
      "My sister is at house with my dog.": "“A casa” si dice at home, non at house."
    } },
  { id: "plc_015", topic: "prep_place", difficulty: 3, type: "translate", group: "plc_other",
    prompt: "Il negozio è di fronte alla scuola.",
    answers: [
      "The shop is opposite the school.",
      "The shop is in front of the school.",
      "The store is opposite the school.",
      "The store is in front of the school."
    ],
    explanation: "“Di fronte a” = opposite (dall’altra parte della strada) oppure in front of (davanti). Attenzione: in front OF, opposite senza to.",
    notes: {
      "The shop is in front the school.": "Manca of: in front of the school.",
      "The shop is in front to the school.": "Si dice in front of, non in front to.",
      "The shop is opposite to the school.": "In inglese britannico si dice semplicemente opposite the school, senza to."
    } },
  { id: "plc_016", topic: "prep_place", difficulty: 3, type: "translate", group: "plc_at_point",
    prompt: "Ci vediamo alla fermata dell’autobus!",
    answers: [
      "See you at the bus stop!",
      "I'll see you at the bus stop!",
      "We'll see each other at the bus stop!",
      "I'll meet you at the bus stop!",
      "Let's meet at the bus stop!",
      "We'll meet at the bus stop!"
    ],
    explanation: "Per un punto preciso dove ci si incontra si usa at: at the bus stop.",
    notes: {
      "See you in the bus stop!": "Per un punto preciso si usa at, non in: at the bus stop.",
      "See you on the bus stop!": "On si usa per le superfici: alla fermata = at the bus stop.",
      "See you to the bus stop!": "To indica movimento; per il punto d’incontro si usa at."
    } }

], 'grammar-a2b');
