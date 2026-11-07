/* Traduzione libera: testi italiani da tradurre in inglese (banca offline).
 * Con l'AI attiva i testi vengono creati su misura e corretti dall'AI; questi servono
 * senza chiave o senza rete (correzione automatica se la traduzione coincide con una prevista,
 * altrimenti confronto con la traduzione modello e autovalutazione).
 *
 * Formato di ogni frase:
 *   it          frase italiana
 *   en          traduzioni corrette (la prima è il modello mostrato); le contrazioni sono già equivalenti
 *   topics      argomenti (id di data/topics.js) che la frase allena
 *   explanation spiegazione in italiano del punto chiave
 *   tips        errori tipici: { wrong, right, why, topic? } — "wrong" viene cercato DENTRO la traduzione
 *               (parole intere, maiuscole e punteggiatura ignorate). Non deve comparire in nessuna risposta di "en".
 */
EC.addTexts([
  /* ======================= A1 ======================= */
  {
    id: 'w_a1_presento', level: 'A1', title: 'Mi presento',
    sentences: [
      {
        it: 'Mi chiamo Luca e ho quattordici anni.',
        en: ['My name is Luca and I am fourteen.', 'My name is Luca and I am fourteen years old.', "My name's Luca and I'm fourteen.", "My name's Luca and I'm fourteen years old.", 'I am Luca and I am fourteen.', 'I am called Luca and I am fourteen.', 'I am called Luca and I am fourteen years old.'],
        topics: ['be'],
        explanation: 'L\'età in inglese si dice con il verbo to be: I am fourteen (years old). «Mi chiamo» si traduce con My name is… oppure I am called…',
        tips: [
          { wrong: 'i have fourteen', right: 'I am fourteen', why: 'L\'età si dice con to be, non con have: «ho 14 anni» = I am fourteen (years old).' },
          { wrong: 'i call me', right: 'my name is / I am called', why: '«Mi chiamo» non si traduce parola per parola: si dice My name is… o I am called….' },
          { wrong: 'i call myself', right: 'my name is / I am called', why: '«Mi chiamo» non si traduce parola per parola: si dice My name is… o I am called….' },
          { wrong: 'fourteen years and', right: 'fourteen (years old)', why: 'Se dici years, devi aggiungere old: fourteen years old. Oppure solo fourteen.' }
        ]
      },
      {
        it: 'Ho una sorella e due fratelli.',
        en: ['I have got a sister and two brothers.', 'I have got one sister and two brothers.', 'I have a sister and two brothers.', 'I have one sister and two brothers.'],
        topics: ['have_got', 'plurals'],
        explanation: 'Per il possesso e la famiglia si usa have got (o have). Il plurale di brother è brothers.',
        tips: [
          { wrong: 'two brother', right: 'two brothers', why: 'Dopo un numero maggiore di uno il nome va al plurale: two brothers.', topic: 'plurals' },
          { wrong: 'i has', right: 'I have', why: 'Con I si usa have; has solo con he, she, it.', topic: 'have_got' },
          { wrong: 'i have get', right: 'I have got', why: 'La forma è have got (participio), non have get.', topic: 'have_got' }
        ]
      },
      {
        it: 'Mia sorella si chiama Giulia ed è molto simpatica.',
        en: ["My sister's name is Giulia and she is very nice.", 'My sister is called Giulia and she is very nice.', "My sister's name is Giulia and she is very friendly.", 'My sister is called Giulia and she is very friendly.'],
        topics: ['be', 'pronouns'],
        explanation: '«Si chiama» = is called / her name is. In inglese il soggetto va sempre espresso: …and SHE is very nice. «Simpatico» si dice nice o friendly.',
        tips: [
          { wrong: 'sympathetic', right: 'nice / friendly', why: 'Falso amico: sympathetic vuol dire «comprensivo, solidale». «Simpatico» = nice, friendly.', topic: 'vocab_basic' },
          { wrong: 'sister calls', right: 'sister is called', why: '«My sister calls Giulia» vorrebbe dire che tua sorella telefona a Giulia! «Si chiama» = is called.' },
          { wrong: 'and is very', right: 'and she is very', why: 'In inglese il soggetto non si sottintende mai: and SHE is very nice.', topic: 'pronouns' }
        ]
      },
      {
        it: 'Il sabato giochiamo sempre a calcio al parco.',
        en: ['On Saturdays we always play football in the park.', 'On Saturday we always play football in the park.', 'We always play football in the park on Saturdays.', 'We always play football in the park on Saturday.', 'On Saturdays we always play football at the park.', 'We always play football at the park on Saturdays.'],
        topics: ['present_simple', 'freq_adverbs', 'prep_time'],
        explanation: 'Abitudine → present simple. Always va PRIMA del verbo principale (we always play). Con i giorni si usa on; con gli sport niente preposizione: play football.',
        tips: [
          { wrong: 'play at football', right: 'play football', why: 'Con gli sport play non vuole preposizione: play football, play tennis.', topic: 'present_simple' },
          { wrong: 'play to football', right: 'play football', why: 'Con gli sport play non vuole preposizione: play football, play tennis.', topic: 'present_simple' },
          { wrong: 'we play always', right: 'we always play', why: 'Gli avverbi di frequenza vanno prima del verbo principale: we always play.', topic: 'freq_adverbs' },
          { wrong: 'the saturday', right: 'on Saturday(s)', why: '«Il sabato» (tutti i sabati) = on Saturdays, senza the.', topic: 'prep_time' },
          { wrong: 'in saturday', right: 'on Saturday(s)', why: 'Con i giorni della settimana si usa on.', topic: 'prep_time' },
          { wrong: 'at saturday', right: 'on Saturday(s)', why: 'Con i giorni della settimana si usa on.', topic: 'prep_time' }
        ]
      }
    ]
  },
  {
    id: 'w_a1_camera', level: 'A1', title: 'La mia camera',
    sentences: [
      {
        it: 'Nella mia camera c\'è un letto grande.',
        en: ['There is a big bed in my bedroom.', 'In my bedroom there is a big bed.', 'There is a big bed in my room.', 'In my room there is a big bed.', 'There is a large bed in my bedroom.', 'In my bedroom there is a large bed.'],
        topics: ['there_is', 'articles_a_an'],
        explanation: '«C\'è» = there is. L\'aggettivo in inglese va PRIMA del nome: a big bed.',
        tips: [
          { wrong: 'bed big', right: 'big bed', why: 'In inglese l\'aggettivo va prima del nome: a big bed.', topic: 'vocab_basic' },
          { wrong: 'it is a big bed', right: 'there is a big bed', why: '«C\'è» si traduce con there is, non con it is.', topic: 'there_is' },
          { wrong: 'there are a', right: 'there is a', why: 'Con un nome singolare si usa there is.', topic: 'there_is' }
        ]
      },
      {
        it: 'Ci sono anche due finestre e un armadio.',
        en: ['There are also two windows and a wardrobe.', 'There are two windows and a wardrobe too.', 'There are two windows and a wardrobe as well.', 'There are also two windows and a cupboard.', 'There are two windows and a cupboard too.'],
        topics: ['there_is', 'plurals'],
        explanation: '«Ci sono» + plurale = there are. Also va dopo are; in alternativa too o as well in fondo alla frase.',
        tips: [
          { wrong: 'there is also two', right: 'there are also two', why: 'Con un plurale (two windows) si usa there are.', topic: 'there_is' },
          { wrong: 'there is two', right: 'there are two', why: 'Con un plurale (two windows) si usa there are.', topic: 'there_is' },
          { wrong: 'two window', right: 'two windows', why: 'Dopo two il nome va al plurale: windows.', topic: 'plurals' }
        ]
      },
      {
        it: 'Il mio computer è nuovo, ma il telefono di mio fratello è vecchio.',
        en: ["My computer is new, but my brother's phone is old.", "My computer is new but my brother's mobile is old.", "My computer is new, but my brother's mobile phone is old.", "My computer is new, but my brother's telephone is old."],
        topics: ['possessives', 'be'],
        explanation: '«Il telefono di mio fratello» = my brother\'s phone (genitivo sassone: possessore + \'s + cosa posseduta). Con il possessivo niente articolo: my computer, non the my computer.',
        tips: [
          { wrong: 'the phone of my brother', right: "my brother's phone", why: 'Con le persone si usa il genitivo sassone: my brother\'s phone.', topic: 'possessives' },
          { wrong: 'the telephone of my brother', right: "my brother's phone", why: 'Con le persone si usa il genitivo sassone: my brother\'s phone.', topic: 'possessives' },
          { wrong: 'my brother phone', right: "my brother's phone", why: 'Manca la \'s del genitivo sassone: my brother\'s phone.', topic: 'possessives' },
          { wrong: 'the my', right: 'my', why: 'Prima del possessivo (my, your…) in inglese non si mette the.', topic: 'possessives' }
        ]
      },
      {
        it: 'Mio fratello sa suonare la chitarra, ma non sa cantare.',
        en: ["My brother can play the guitar, but he can't sing.", "My brother can play guitar, but he can't sing.", 'My brother can play the guitar but he cannot sing.'],
        topics: ['can', 'pronouns'],
        explanation: '«Sapere fare qualcosa» (un\'abilità) = can + verbo base, senza to. Il soggetto va ripetuto: but HE can\'t sing.',
        tips: [
          { wrong: 'knows play', right: 'can play', why: '«Sa suonare» (abilità) = can play.', topic: 'can' },
          { wrong: 'knows how play', right: 'can play', why: '«Sa suonare» (abilità) = can play (oppure knows how TO play).', topic: 'can' },
          { wrong: 'does not know sing', right: "can't sing", why: '«Non sa cantare» (abilità) = can\'t sing.', topic: 'can' },
          { wrong: 'can to', right: 'can + verbo', why: 'Dopo can il verbo va senza to: can play, can\'t sing.', topic: 'can' },
          { wrong: 'but cannot sing', right: "but he can't sing", why: 'In inglese il soggetto va sempre espresso: but HE can\'t sing.', topic: 'pronouns' }
        ]
      }
    ]
  },
  {
    id: 'w_a1_scuola', level: 'A1', title: 'Una giornata di scuola',
    sentences: [
      {
        it: 'Mi sveglio alle sette ogni mattina.',
        en: ['I wake up at seven every morning.', "I wake up at seven o'clock every morning.", 'Every morning I wake up at seven.', "Every morning I wake up at seven o'clock.", 'I get up at seven every morning.', 'Every morning I get up at seven.'],
        topics: ['present_simple', 'prep_time'],
        explanation: 'Abitudine → present simple. Con le ore si usa at, senza articolo: at seven.',
        tips: [
          { wrong: 'at the seven', right: 'at seven', why: 'Con le ore niente articolo: at seven (o\'clock).', topic: 'prep_time' },
          { wrong: 'at the 7', right: 'at seven', why: 'Con le ore niente articolo: at seven (o\'clock).', topic: 'prep_time' },
          { wrong: 'every mornings', right: 'every morning', why: 'Dopo every il nome resta singolare: every morning.', topic: 'plurals' },
          { wrong: 'i wake me up', right: 'I wake up', why: 'Wake up non è riflessivo: «mi sveglio» = I wake up.', topic: 'present_simple' }
        ]
      },
      {
        it: 'La scuola comincia alle otto e finisce all\'una.',
        en: ['School starts at eight and finishes at one.', 'School begins at eight and ends at one.', "School starts at eight o'clock and finishes at one o'clock.", 'School starts at eight and ends at one.', 'School begins at eight and finishes at one.'],
        topics: ['present_simple', 'prep_time'],
        explanation: 'School è terza persona singolare: starts, finishes (con la -s). Orari → at.',
        tips: [
          { wrong: 'school start', right: 'school starts', why: 'Terza persona singolare (school = it): starts, con la -s.', topic: 'present_simple' },
          { wrong: 'school begin', right: 'school begins', why: 'Terza persona singolare (school = it): begins, con la -s.', topic: 'present_simple' },
          { wrong: 'and finish', right: 'and finishes', why: 'Anche il secondo verbo vuole la -s: finishes.', topic: 'present_simple' },
          { wrong: 'and end at', right: 'and ends at', why: 'Anche il secondo verbo vuole la -s: ends.', topic: 'present_simple' },
          { wrong: 'at the one', right: 'at one', why: 'Con le ore niente articolo: at one.', topic: 'prep_time' }
        ]
      },
      {
        it: 'Mio padre non lavora il sabato.',
        en: ["My father doesn't work on Saturdays.", "My dad doesn't work on Saturdays.", "My father doesn't work on Saturday.", "My dad doesn't work on Saturday."],
        topics: ['present_simple', 'prep_time'],
        explanation: 'Negativa del present simple alla terza persona: doesn\'t + verbo base (work, senza -s). Con i giorni: on.',
        tips: [
          { wrong: 'father not work', right: "father doesn't work", why: 'La negativa del present simple si fa con doesn\'t (does not) + verbo base.', topic: 'present_simple' },
          { wrong: 'dad not work', right: "dad doesn't work", why: 'La negativa del present simple si fa con doesn\'t (does not) + verbo base.', topic: 'present_simple' },
          { wrong: 'does not works', right: "doesn't work", why: 'Dopo doesn\'t il verbo torna alla forma base: work, senza -s.', topic: 'present_simple' },
          { wrong: 'father do not', right: "father doesn't", why: 'Con he/she/it (my father) si usa does not, non do not.', topic: 'present_simple' },
          { wrong: 'dad do not', right: "dad doesn't", why: 'Con he/she/it (my dad) si usa does not, non do not.', topic: 'present_simple' },
          { wrong: 'the saturday', right: 'on Saturdays', why: '«Il sabato» (tutti i sabati) = on Saturdays, senza the.', topic: 'prep_time' }
        ]
      },
      {
        it: 'Che cosa fai dopo la scuola?',
        en: ['What do you do after school?'],
        topics: ['wh_questions', 'present_simple'],
        explanation: 'Nelle domande al present simple serve l\'ausiliare do: What DO you do…? «Fare» in senso generico = do. After school, senza the.',
        tips: [
          { wrong: 'what you do', right: 'what do you do', why: 'Nelle domande serve l\'ausiliare: What DO you do?', topic: 'wh_questions' },
          { wrong: 'what do you make', right: 'what do you do', why: '«Fare» nel senso di attività = do; make è «fabbricare, preparare».', topic: 'vocab_basic' },
          { wrong: 'what are you doing after', right: 'what do you do after', why: 'Si parla di un\'abitudine (ogni giorno): present simple.', topic: 'present_simple' },
          { wrong: 'after the school', right: 'after school', why: '«Dopo la scuola» (le lezioni) = after school, senza the.', topic: 'articles_a_an' }
        ]
      }
    ]
  },

  /* ======================= A2 ======================= */
  {
    id: 'w_a2_vacanze', level: 'A2', title: 'Le vacanze dell\'anno scorso',
    sentences: [
      {
        it: 'L\'estate scorsa sono andato in Sicilia con la mia famiglia.',
        en: ['Last summer I went to Sicily with my family.', 'I went to Sicily with my family last summer.', 'Last summer, I went to Sicily with my family.'],
        topics: ['past_simple', 'prep_place'],
        explanation: 'Un momento finito del passato (last summer) → past simple: went. Con last niente the. Moto verso un luogo: go TO.',
        tips: [
          { wrong: 'the last summer', right: 'last summer', why: 'Con last (scorso) non si usa the: last summer.', topic: 'articles_the' },
          { wrong: 'i have gone', right: 'I went', why: 'Con un tempo finito (last summer) si usa il past simple, non il present perfect.', topic: 'past_simple' },
          { wrong: 'i have been', right: 'I went', why: 'Con un tempo finito (last summer) si usa il past simple: I went.', topic: 'past_simple' },
          { wrong: 'i am gone', right: 'I went', why: '«Sono andato» non si traduce con am: il passato di go è went.', topic: 'past_simple' },
          { wrong: 'i goed', right: 'I went', why: 'Go è irregolare: go – went – gone.', topic: 'past_simple' },
          { wrong: 'went in sicily', right: 'went to Sicily', why: 'Con i verbi di movimento si usa to: go to Sicily.', topic: 'prep_place' }
        ]
      },
      {
        it: 'Il tempo era bellissimo e abbiamo nuotato ogni giorno.',
        en: ['The weather was beautiful and we swam every day.', 'The weather was lovely and we swam every day.', 'The weather was great and we swam every day.', 'The weather was beautiful and we went swimming every day.', 'The weather was lovely and we went swimming every day.', 'The weather was fantastic and we swam every day.', 'The weather was amazing and we swam every day.'],
        topics: ['past_simple', 'false_friends'],
        explanation: '«Il tempo» meteorologico = the weather (time è il tempo dell\'orologio). Swim è irregolare: swim – swam – swum.',
        tips: [
          { wrong: 'the time was', right: 'the weather was', why: '«Tempo» atmosferico = weather; time è il tempo che passa.', topic: 'false_friends' },
          { wrong: 'swimmed', right: 'swam', why: 'Swim è irregolare: swim – swam – swum.', topic: 'past_simple' },
          { wrong: 'we have swum', right: 'we swam', why: 'Racconto di un periodo finito → past simple: we swam.', topic: 'past_simple' },
          { wrong: 'every days', right: 'every day', why: 'Dopo every il nome resta singolare: every day.', topic: 'plurals' }
        ]
      },
      {
        it: 'Un pomeriggio, mentre camminavamo sulla spiaggia, abbiamo visto un delfino.',
        en: ['One afternoon, while we were walking on the beach, we saw a dolphin.', 'One afternoon, while we were walking along the beach, we saw a dolphin.', 'One afternoon, when we were walking on the beach, we saw a dolphin.', 'One afternoon we saw a dolphin while we were walking on the beach.', 'One afternoon we saw a dolphin while we were walking along the beach.'],
        topics: ['past_continuous', 'past_simple'],
        explanation: 'Azione in corso (camminavamo) interrotta da un fatto breve (abbiamo visto): past continuous + past simple.',
        tips: [
          { wrong: 'we was walking', right: 'we were walking', why: 'Con we il passato di be è were: we were walking.', topic: 'past_continuous' },
          { wrong: 'we were walk', right: 'we were walking', why: 'Il past continuous è was/were + verbo in -ing.', topic: 'past_continuous' },
          { wrong: 'we have seen', right: 'we saw', why: 'Fatto concluso nel passato → past simple: we saw.', topic: 'past_simple' },
          { wrong: 'we seen', right: 'we saw', why: 'Il past simple di see è saw (seen è il participio).', topic: 'past_simple' },
          { wrong: 'we were seeing', right: 'we saw', why: 'Il fatto breve che interrompe va al past simple: we saw.', topic: 'past_continuous' }
        ]
      },
      {
        it: 'L\'anno prossimo andremo in Grecia: è più calda e più economica dell\'Inghilterra.',
        en: ["Next year we're going to Greece: it's hotter and cheaper than England.", "Next year we're going to go to Greece: it's hotter and cheaper than England.", "Next year we'll go to Greece: it's hotter and cheaper than England.", "Next year we're going to Greece: it's warmer and cheaper than England.", "Next year we're going to go to Greece: it's warmer and cheaper than England.", "Next year we'll go to Greece: it's warmer and cheaper than England.", "We're going to Greece next year: it's hotter and cheaper than England.", "We're going to Greece next year: it's warmer and cheaper than England."],
        topics: ['future', 'comparatives'],
        explanation: 'Un progetto già deciso → going to (o present continuous). Aggettivi corti: -er + than (hotter, cheaper than). Next year senza the.',
        tips: [
          { wrong: 'more hot', right: 'hotter', why: 'Gli aggettivi di una sillaba fanno il comparativo con -er: hot → hotter.', topic: 'comparatives' },
          { wrong: 'more cheap', right: 'cheaper', why: 'Gli aggettivi di una sillaba fanno il comparativo con -er: cheap → cheaper.', topic: 'comparatives' },
          { wrong: 'more warm', right: 'warmer', why: 'Gli aggettivi di una sillaba fanno il comparativo con -er: warm → warmer.', topic: 'comparatives' },
          { wrong: 'hoter', right: 'hotter', why: 'Hot: consonante-vocale-consonante → si raddoppia la t: hotter.', topic: 'comparatives' },
          { wrong: 'cheaper of', right: 'cheaper than', why: 'Il secondo termine di paragone si introduce con than.', topic: 'comparatives' },
          { wrong: 'cheaper then', right: 'cheaper than', why: 'Attenzione all\'ortografia: than (di paragone), non then (poi).', topic: 'comparatives' },
          { wrong: 'the next year', right: 'next year', why: 'Con next (prossimo) non si usa the: next year.', topic: 'future' },
          { wrong: 'we go to greece', right: "we're going to Greece", why: 'Per un progetto futuro già deciso si usa going to (o il present continuous), non il present simple.', topic: 'future' }
        ]
      }
    ]
  },
  {
    id: 'w_a2_cucina', level: 'A2', title: 'In cucina',
    sentences: [
      {
        it: 'In questo momento mia madre sta preparando la cena.',
        en: ['At the moment my mother is making dinner.', 'At the moment my mum is making dinner.', 'Right now my mother is making dinner.', 'Right now my mum is making dinner.', 'At the moment my mother is cooking dinner.', 'At the moment my mum is cooking dinner.', 'My mum is making dinner at the moment.', 'My mother is making dinner at the moment.', 'My mum is cooking dinner right now.', 'At the moment my mother is preparing dinner.', 'At the moment my mum is preparing dinner.'],
        topics: ['present_continuous', 'ps_vs_pc'],
        explanation: 'Azione in corso adesso → present continuous: is making. «In questo momento» = at the moment / right now.',
        tips: [
          { wrong: 'my mother prepares', right: 'my mother is making', why: 'L\'azione sta succedendo adesso: present continuous (is making / is preparing).', topic: 'ps_vs_pc' },
          { wrong: 'my mum prepares', right: 'my mum is making', why: 'L\'azione sta succedendo adesso: present continuous (is making / is preparing).', topic: 'ps_vs_pc' },
          { wrong: 'my mother makes', right: 'my mother is making', why: 'L\'azione sta succedendo adesso: present continuous.', topic: 'ps_vs_pc' },
          { wrong: 'my mum makes', right: 'my mum is making', why: 'L\'azione sta succedendo adesso: present continuous.', topic: 'ps_vs_pc' },
          { wrong: 'is prepare', right: 'is preparing', why: 'Il present continuous è be + verbo in -ing.', topic: 'present_continuous' },
          { wrong: 'is make', right: 'is making', why: 'Il present continuous è be + verbo in -ing.', topic: 'present_continuous' },
          { wrong: 'in this moment', right: 'at the moment', why: '«In questo momento» si dice at the moment o right now.', topic: 'present_continuous' }
        ]
      },
      {
        it: 'Non c\'è molto latte, ma ci sono alcune uova.',
        en: ["There isn't much milk, but there are some eggs.", "There isn't much milk, but there are a few eggs.", "There's not much milk, but there are some eggs.", "There's not much milk, but there are a few eggs."],
        topics: ['countable', 'there_is'],
        explanation: 'Milk non è numerabile → much (nelle negative). Eggs è numerabile plurale → there are some / a few eggs.',
        tips: [
          { wrong: 'many milk', right: 'much milk', why: 'Milk non è numerabile: much milk (many va con i plurali).', topic: 'countable' },
          { wrong: 'milks', right: 'milk', why: 'Milk non è numerabile: non ha plurale.', topic: 'countable' },
          { wrong: 'there is some eggs', right: 'there are some eggs', why: 'Con un plurale (eggs) si usa there are.', topic: 'there_is' },
          { wrong: 'there are any eggs', right: 'there are some eggs', why: 'Nelle frasi affermative si usa some; any va nelle negative e nelle domande.', topic: 'countable' },
          { wrong: 'there is not many', right: "there isn't much", why: 'Milk non è numerabile: much.', topic: 'countable' }
        ]
      },
      {
        it: 'Devo comprare del pane e un po\' di formaggio.',
        en: ['I have to buy some bread and some cheese.', 'I have to buy some bread and a bit of cheese.', 'I have to buy some bread and a little cheese.', 'I need to buy some bread and some cheese.', 'I need to buy some bread and a bit of cheese.', 'I must buy some bread and some cheese.', 'I must buy some bread and a bit of cheese.', 'I have got to buy some bread and some cheese.'],
        topics: ['countable', 'modals_obligation'],
        explanation: '«Del pane», «un po\' di formaggio» = some bread, some (o a bit of) cheese: bread e cheese non sono numerabili. Obbligo → have to / must / need to + verbo base.',
        tips: [
          { wrong: 'a bread', right: 'some bread', why: 'Bread non è numerabile: some bread (o a loaf of bread).', topic: 'countable' },
          { wrong: 'breads', right: 'bread', why: 'Bread non è numerabile: non ha plurale.', topic: 'countable' },
          { wrong: 'of the bread', right: 'some bread', why: 'Il partitivo «del, della» si traduce con some, non con of the.', topic: 'countable' },
          { wrong: 'must to', right: 'must', why: 'Dopo must il verbo va senza to: I must buy.', topic: 'modals_obligation' },
          { wrong: 'i have buy', right: 'I have to buy', why: '«Devo» = have TO + verbo: I have to buy.', topic: 'modals_obligation' },
          { wrong: 'i must buy of', right: 'I must buy some', why: 'Il partitivo «del» si traduce con some.', topic: 'countable' }
        ]
      },
      {
        it: 'Non devi toccare il forno: è molto caldo!',
        en: ["You mustn't touch the oven: it's very hot!", "Don't touch the oven: it's very hot!", 'You must not touch the oven, it is very hot!'],
        topics: ['modals_obligation'],
        explanation: 'Un divieto si esprime con mustn\'t (o con l\'imperativo don\'t). Attenzione: don\'t have to vuol dire «non è necessario», non «è vietato».',
        tips: [
          { wrong: 'do not have to touch', right: "mustn't touch", why: 'Don\'t have to = «non è necessario». Per un divieto si usa mustn\'t.', topic: 'modals_obligation' },
          { wrong: 'do not must', right: "mustn't", why: 'Must non usa do: la negativa è must not (mustn\'t).', topic: 'modals_obligation' },
          { wrong: 'must not to', right: "mustn't", why: 'Dopo must/mustn\'t il verbo va senza to.', topic: 'modals_obligation' },
          { wrong: 'the oven is very hot it', right: "it's very hot", why: 'Basta it: non ripetere il soggetto.', topic: 'pronouns' }
        ]
      }
    ]
  },
  {
    id: 'w_a2_messaggio', level: 'A2', title: 'Un messaggio a un amico',
    sentences: [
      {
        it: 'Domani sera vado al cinema con Marco: vuoi venire?',
        en: ["Tomorrow evening I'm going to the cinema with Marco: do you want to come?", "Tomorrow evening I'm going to the cinema with Marco: would you like to come?", "Tomorrow night I'm going to the cinema with Marco: do you want to come?", "Tomorrow night I'm going to the cinema with Marco: would you like to come?", "I'm going to the cinema with Marco tomorrow evening: do you want to come?", "I'm going to the cinema with Marco tomorrow evening: would you like to come?", "I'm going to the cinema with Marco tomorrow night: do you want to come?"],
        topics: ['future', 'wh_questions'],
        explanation: 'Un appuntamento già fissato → present continuous con valore di futuro: I\'m going to the cinema. Want + to + verbo.',
        tips: [
          { wrong: 'i go to the cinema', right: "I'm going to the cinema", why: 'Per un programma già fissato si usa il present continuous, non il present simple.', topic: 'future' },
          { wrong: 'want you come', right: 'do you want to come', why: 'Nelle domande serve do, e want vuole to: Do you want to come?', topic: 'wh_questions' },
          { wrong: 'you want come', right: 'do you want to come', why: 'Nelle domande serve do, e want vuole to: Do you want to come?', topic: 'wh_questions' },
          { wrong: 'want come', right: 'want to come', why: 'Dopo want il verbo vuole to: want to come.', topic: 'gerund_infinitive' },
          { wrong: 'at the cinema with marco tomorrow', right: 'to the cinema', why: 'Con go si usa to: go to the cinema.', topic: 'prep_place' }
        ]
      },
      {
        it: 'Il film comincia alle nove, quindi possiamo cenare prima.',
        en: ['The film starts at nine, so we can have dinner before.', 'The film starts at nine, so we can have dinner first.', 'The film starts at nine, so we can have dinner beforehand.', 'The film begins at nine, so we can have dinner before.', 'The film starts at nine, so we can eat before.', 'The film starts at nine, so we can eat first.', 'The movie starts at nine, so we can have dinner before.'],
        topics: ['future', 'make_do'],
        explanation: 'Orari di programmi (film, treni) → present simple anche per il futuro: the film starts. «Cenare» = have dinner.',
        tips: [
          { wrong: 'make dinner', right: 'have dinner', why: '«Cenare» = have dinner; make dinner vuol dire «preparare la cena».', topic: 'make_do' },
          { wrong: 'do dinner', right: 'have dinner', why: '«Cenare» = have dinner.', topic: 'make_do' },
          { wrong: 'film start', right: 'film starts', why: 'Terza persona singolare: starts, con la -s.', topic: 'present_simple' },
          { wrong: 'can to', right: 'can + verbo', why: 'Dopo can il verbo va senza to.', topic: 'can' },
          { wrong: 'can dine', right: 'can have dinner', why: 'Dine esiste ma è molto formale: «cenare» = have dinner.', topic: 'make_do' }
        ]
      },
      {
        it: 'Ieri ho fatto un errore stupido nella verifica di matematica.',
        en: ['Yesterday I made a stupid mistake in the maths test.', 'Yesterday I made a stupid mistake in my maths test.', 'I made a stupid mistake in the maths test yesterday.', 'I made a stupid mistake in my maths test yesterday.', 'Yesterday I made a silly mistake in the maths test.', 'Yesterday I made a silly mistake in my maths test.', 'Yesterday I made a stupid mistake in the math test.'],
        topics: ['make_do', 'past_simple'],
        explanation: 'Si dice make a mistake (non do). Yesterday → past simple: I made.',
        tips: [
          { wrong: 'did a stupid mistake', right: 'made a stupid mistake', why: '«Fare un errore» = make a mistake.', topic: 'make_do' },
          { wrong: 'did a silly mistake', right: 'made a silly mistake', why: '«Fare un errore» = make a mistake.', topic: 'make_do' },
          { wrong: 'did a mistake', right: 'made a mistake', why: '«Fare un errore» = make a mistake.', topic: 'make_do' },
          { wrong: 'i have made', right: 'I made', why: 'Con yesterday si usa il past simple: I made.', topic: 'past_simple' },
          { wrong: 'i have done', right: 'I made', why: 'Con yesterday si usa il past simple, e «fare un errore» = make a mistake.', topic: 'past_simple' },
          { wrong: 'verification', right: 'test', why: '«Verifica» (compito in classe) = test.', topic: 'false_friends' }
        ]
      },
      {
        it: 'In realtà il professore è stato molto gentile con me.',
        en: ['Actually, the teacher was very kind to me.', 'Actually, the teacher was very nice to me.', 'Actually the teacher was really kind to me.', 'Actually the teacher was really nice to me.', 'In fact, the teacher was very kind to me.', 'In fact, the teacher was very nice to me.', 'Actually, my teacher was very kind to me.'],
        topics: ['false_friends', 'past_simple'],
        explanation: '«In realtà» = actually (non currently, che vuol dire «attualmente»). A scuola il professore è the teacher. Kind/nice TO someone.',
        tips: [
          { wrong: 'currently', right: 'actually', why: 'Falso amico: currently = attualmente. «In realtà» = actually.', topic: 'false_friends' },
          { wrong: 'the professor', right: 'the teacher', why: 'A scuola il professore è the teacher; professor è il docente universitario.', topic: 'false_friends' },
          { wrong: 'gentle', right: 'kind / nice', why: 'Falso amico: gentle = delicato, dolce. «Gentile» = kind, nice.', topic: 'false_friends' },
          { wrong: 'has been very', right: 'was very', why: 'Episodio concluso nel passato: past simple, was.', topic: 'past_simple' },
          { wrong: 'kind with me', right: 'kind to me', why: 'Si dice kind TO someone / nice TO someone.', topic: 'dependent_prepositions' }
        ]
      }
    ]
  },

  /* ======================= B1 ======================= */
  {
    id: 'w_b1_sport', level: 'B1', title: 'La mia squadra',
    sentences: [
      {
        it: 'Gioco a pallavolo da tre anni.',
        en: ['I have been playing volleyball for three years.', 'I have played volleyball for three years.'],
        topics: ['for_since', 'present_perfect'],
        explanation: 'Azione iniziata nel passato e ancora in corso: in inglese NON si usa il presente come in italiano, ma il present perfect (continuous) + for con la durata.',
        tips: [
          { wrong: 'i play volleyball for', right: 'I have been playing volleyball for', why: '«Gioco da tre anni» (e gioco ancora): present perfect, non presente.', topic: 'for_since' },
          { wrong: 'i am playing volleyball for', right: 'I have been playing volleyball for', why: '«Gioco da tre anni» (e gioco ancora): present perfect continuous.', topic: 'for_since' },
          { wrong: 'since three years', right: 'for three years', why: 'Con una durata (tre anni) si usa for; since va con il punto di inizio.', topic: 'for_since' },
          { wrong: 'from three years', right: 'for three years', why: '«Da» + durata = for.', topic: 'for_since' },
          { wrong: 'play at volleyball', right: 'play volleyball', why: 'Con gli sport play non vuole preposizione.', topic: 'present_simple' },
          { wrong: 'played at volleyball', right: 'played volleyball', why: 'Con gli sport play non vuole preposizione.', topic: 'present_simple' },
          { wrong: 'playing at volleyball', right: 'playing volleyball', why: 'Con gli sport play non vuole preposizione.', topic: 'present_simple' }
        ]
      },
      {
        it: 'La mia squadra non ha mai vinto un campionato.',
        en: ['My team has never won a championship.', 'My team have never won a championship.', 'My team has never won the championship.', 'My team has never won a league.', 'My team has never won a title.'],
        topics: ['present_perfect'],
        explanation: 'Esperienza «mai» fino a oggi → present perfect con never: has never won. Win è irregolare: win – won – won.',
        tips: [
          { wrong: 'winned', right: 'won', why: 'Win è irregolare: win – won – won.', topic: 'present_perfect' },
          { wrong: 'has not never', right: 'has never', why: 'In inglese una sola negazione: has never won (oppure hasn\'t ever won).', topic: 'present_perfect' },
          { wrong: 'team never won', right: 'team has never won', why: 'Esperienza fino a oggi senza tempo preciso: present perfect, has never won.', topic: 'present_perfect' },
          { wrong: 'has never win', right: 'has never won', why: 'Dopo has serve il participio: won.', topic: 'present_perfect' },
          { wrong: 'has never wins', right: 'has never won', why: 'Dopo has serve il participio: won.', topic: 'present_perfect' }
        ]
      },
      {
        it: 'Se ci alleniamo di più, vinceremo la prossima partita.',
        en: ["If we train more, we'll win the next match.", "If we train harder, we'll win the next match.", "If we train more, we'll win the next game.", "If we train harder, we'll win the next game.", "We'll win the next match if we train more.", "We'll win the next match if we train harder."],
        topics: ['first_conditional'],
        explanation: 'Periodo ipotetico di primo tipo: if + present simple, will + verbo base. Dopo if NON si usa will anche se si parla di futuro.',
        tips: [
          { wrong: 'if we will train', right: 'if we train', why: 'Dopo if si usa il present simple, anche per il futuro: if we train.', topic: 'first_conditional' },
          { wrong: 'we win the next', right: "we'll win the next", why: 'Nella frase principale serve will: we\'ll win.', topic: 'first_conditional' },
          { wrong: 'if we train us', right: 'if we train', why: 'Train non è riflessivo: «ci alleniamo» = we train.', topic: 'first_conditional' },
          { wrong: 'the next party', right: 'the next match', why: 'Falso amico: party = festa. «Partita» = match o game.', topic: 'false_friends' },
          { wrong: 'the next race', right: 'the next match', why: 'Race è una gara di corsa; una partita è match o game.', topic: 'false_friends' }
        ]
      },
      {
        it: 'Il nostro allenatore, che è molto severo, ci fa correre ogni giorno.',
        en: ['Our coach, who is very strict, makes us run every day.', 'Our coach, who is really strict, makes us run every day.', 'Our trainer, who is very strict, makes us run every day.', 'Our coach, who is very strict, gets us to run every day.'],
        topics: ['relatives', 'gerund_infinitive'],
        explanation: 'Per le persone il relativo è who. «Fare fare qualcosa a qualcuno» = make + persona + verbo base, senza to. «Severo» = strict.',
        tips: [
          { wrong: 'which is very strict', right: 'who is very strict', why: 'Per le persone si usa who, non which.', topic: 'relatives' },
          { wrong: 'that is very strict', right: 'who is very strict', why: 'Tra due virgole (relativa non restrittiva) non si usa that: who.', topic: 'relatives' },
          { wrong: 'makes us to run', right: 'makes us run', why: 'Make + persona + verbo base, senza to: makes us run.', topic: 'gerund_infinitive' },
          { wrong: 'makes us running', right: 'makes us run', why: 'Make + persona + verbo base: makes us run.', topic: 'gerund_infinitive' },
          { wrong: 'makes run us', right: 'makes us run', why: 'L\'ordine è make + persona + verbo: makes us run.', topic: 'gerund_infinitive' },
          { wrong: 'severe', right: 'strict', why: '«Severo» (di una persona) = strict. Severe vuol dire «grave» (a severe illness).', topic: 'false_friends' },
          { wrong: 'every days', right: 'every day', why: 'Dopo every il nome resta singolare.', topic: 'plurals' }
        ]
      }
    ]
  },
  {
    id: 'w_b1_telefono', level: 'B1', title: 'Il telefono nuovo',
    sentences: [
      {
        it: 'Il mio telefono è stato prodotto in Cina.',
        en: ['My phone was made in China.', 'My phone was produced in China.', 'My phone was manufactured in China.', 'My mobile was made in China.'],
        topics: ['passive'],
        explanation: 'Forma passiva al passato: was + participio (made). Il fatto è concluso: was made, non has been made.',
        tips: [
          { wrong: 'was maked', right: 'was made', why: 'Make è irregolare: make – made – made.', topic: 'passive' },
          { wrong: 'is been made', right: 'was made', why: 'Il passivo al passato è was + participio: was made.', topic: 'passive' },
          { wrong: 'has been produced', right: 'was made', why: 'È un fatto concluso nel passato: was made / was produced.', topic: 'pp_vs_past' },
          { wrong: 'was product', right: 'was produced / was made', why: 'Product è un nome; il participio di produce è produced.', topic: 'passive' },
          { wrong: 'my phone made in', right: 'my phone was made in', why: 'Nel passivo serve be: was made.', topic: 'passive' }
        ]
      },
      {
        it: 'L\'ho comprato due mesi fa, ma la batteria si è già rotta.',
        en: ["I bought it two months ago, but the battery has already broken.", "I bought it two months ago, but the battery is already broken.", "I bought it two months ago, but the battery has already stopped working.", "I bought it two months ago and the battery has already broken.", "I bought it two months ago, but the battery's already broken."],
        topics: ['pp_vs_past', 'present_perfect'],
        explanation: 'Con ago (fa) si usa il past simple: I bought it. «Si è già rotta» (risultato che vale adesso, con already) → present perfect: has already broken.',
        tips: [
          { wrong: 'i have bought it two months ago', right: 'I bought it two months ago', why: 'Con ago serve il past simple, mai il present perfect.', topic: 'pp_vs_past' },
          { wrong: 'i have bought two months ago', right: 'I bought it two months ago', why: 'Con ago serve il past simple, e l\'oggetto it va espresso.', topic: 'pp_vs_past' },
          { wrong: 'two months before', right: 'two months ago', why: '«Fa» (rispetto a oggi) = ago.', topic: 'pp_vs_past' },
          { wrong: 'two months fa', right: 'two months ago', why: '«Fa» (rispetto a oggi) = ago.', topic: 'pp_vs_past' },
          { wrong: 'i bought two months', right: 'I bought it two months', why: 'In inglese l\'oggetto va espresso: I bought IT.', topic: 'pronouns' },
          { wrong: 'has already broke', right: 'has already broken', why: 'Il participio di break è broken.', topic: 'present_perfect' },
          { wrong: 'is already broke', right: 'is already broken', why: '«Rotto» = broken (broke vuol dire «al verde»).', topic: 'present_perfect' }
        ]
      },
      {
        it: 'Sono stanco di aspettare la riparazione.',
        en: ["I'm tired of waiting for the repair.", "I'm fed up with waiting for the repair.", "I'm sick of waiting for the repair.", "I'm tired of waiting for it to be repaired."],
        topics: ['gerund_infinitive', 'dependent_prepositions'],
        explanation: 'Dopo una preposizione (tired OF) il verbo va in -ing: of waiting. «Aspettare qualcosa» = wait FOR something.',
        tips: [
          { wrong: 'tired to wait', right: 'tired of waiting', why: 'Tired vuole of, e dopo una preposizione il verbo va in -ing: tired of waiting.', topic: 'gerund_infinitive' },
          { wrong: 'tired of wait', right: 'tired of waiting', why: 'Dopo una preposizione il verbo va in -ing: of waiting.', topic: 'gerund_infinitive' },
          { wrong: 'tired from waiting', right: 'tired of waiting', why: '«Stanco di» (non ne posso più) = tired of.', topic: 'dependent_prepositions' },
          { wrong: 'waiting the repair', right: 'waiting for the repair', why: '«Aspettare qualcosa» = wait FOR something.', topic: 'dependent_prepositions' },
          { wrong: 'i have tired', right: "I'm tired", why: '«Sono stanco» = I am tired.', topic: 'be' }
        ]
      },
      {
        it: 'Se non me lo restituiscono entro venerdì, chiederò un rimborso.',
        en: ["If they don't give it back by Friday, I'll ask for a refund.", "If they don't give it back to me by Friday, I'll ask for a refund.", "If they don't return it by Friday, I'll ask for a refund.", "If they don't return it to me by Friday, I'll ask for a refund.", "I'll ask for a refund if they don't give it back by Friday.", "I'll ask for a refund if they don't give it back to me by Friday."],
        topics: ['first_conditional', 'dependent_prepositions'],
        explanation: 'Primo tipo: if + present (don\'t give it back), will (I\'ll ask). «Entro» una scadenza = by. «Chiedere (per avere)» = ask FOR.',
        tips: [
          { wrong: 'if they will not', right: "if they don't", why: 'Dopo if si usa il present simple, non will.', topic: 'first_conditional' },
          { wrong: 'within friday', right: 'by Friday', why: '«Entro» una scadenza (un giorno, un\'ora) = by; within si usa con una durata (within two days).', topic: 'dependent_prepositions' },
          { wrong: 'ask a refund', right: 'ask for a refund', why: '«Chiedere qualcosa (per averla)» = ask FOR something.', topic: 'dependent_prepositions' },
          { wrong: 'i ask for a refund', right: "I'll ask for a refund", why: 'Nella frase principale del primo tipo serve will.', topic: 'first_conditional' },
          { wrong: 'give back it', right: 'give it back', why: 'Con un pronome il phrasal verb si divide: give IT back.', topic: 'phrasal_verbs' },
          { wrong: 'reimbursement', right: 'refund', why: 'Per un acquisto «rimborso» si dice refund.', topic: 'false_friends' }
        ]
      }
    ]
  },
  {
    id: 'w_b1_citta', level: 'B1', title: 'La mia città',
    sentences: [
      {
        it: 'Verona è una città che amo molto.',
        en: ['Verona is a city that I love very much.', 'Verona is a city I love very much.', 'Verona is a city which I love very much.', 'Verona is a city that I really love.', 'Verona is a city I really love.', 'Verona is a city that I love a lot.', 'Verona is a city I love a lot.', 'Verona is a town that I love very much.', 'Verona is a town I love very much.'],
        topics: ['relatives'],
        explanation: 'Per le cose il relativo è that o which (e quando è complemento oggetto si può omettere). Il relativo sostituisce già l\'oggetto: non si ripete it.',
        tips: [
          { wrong: 'a city who', right: 'a city that', why: 'Who solo per le persone; per le cose that o which.', topic: 'relatives' },
          { wrong: 'i love it very much', right: 'that I love very much', why: 'Il relativo (that) è già l\'oggetto: non ripetere it.', topic: 'relatives' },
          { wrong: 'i love it a lot', right: 'that I love a lot', why: 'Il relativo (that) è già l\'oggetto: non ripetere it.', topic: 'relatives' },
          { wrong: 'i love very much it', right: 'that I love very much', why: 'Il relativo è già l\'oggetto: non serve it.', topic: 'relatives' },
          { wrong: 'love much', right: 'love very much / a lot', why: 'Nelle affermative much da solo suona strano: very much o a lot.', topic: 'countable' }
        ]
      },
      {
        it: 'Ci vivo da quando sono nato.',
        en: ["I've lived here since I was born.", "I've been living here since I was born.", "I've lived there since I was born.", "I've been living there since I was born."],
        topics: ['for_since', 'present_perfect'],
        explanation: 'Situazione iniziata nel passato e ancora vera → present perfect. Il punto di inizio («da quando sono nato») si introduce con since. «Sono nato» = I was born.',
        tips: [
          { wrong: 'i live here since', right: "I've lived here since", why: 'Situazione che dura ancora: present perfect + since, non il presente.', topic: 'for_since' },
          { wrong: 'i live there since', right: "I've lived there since", why: 'Situazione che dura ancora: present perfect + since, non il presente.', topic: 'for_since' },
          { wrong: 'since i am born', right: 'since I was born', why: '«Sono nato» in inglese è al passato: I was born.', topic: 'passive' },
          { wrong: 'since i have born', right: 'since I was born', why: '«Sono nato» = I was born (be born è passivo).', topic: 'passive' },
          { wrong: 'since when', right: 'since', why: '«Da quando» = since, senza when.', topic: 'for_since' },
          { wrong: 'from when', right: 'since', why: '«Da quando» = since.', topic: 'for_since' }
        ]
      },
      {
        it: 'Il centro storico è visitato da migliaia di turisti ogni anno.',
        en: ['The old town is visited by thousands of tourists every year.', 'The historic centre is visited by thousands of tourists every year.', 'The historic center is visited by thousands of tourists every year.', 'The old town is visited by thousands of tourists each year.', 'The historic centre is visited by thousands of tourists each year.', 'The city centre is visited by thousands of tourists every year.'],
        topics: ['passive'],
        explanation: 'Passivo al presente: is + participio (visited). Chi compie l\'azione si introduce con by. «Migliaia di» = thousands of.',
        tips: [
          { wrong: 'visited from', right: 'visited by', why: 'Il complemento d\'agente nel passivo si introduce con by.', topic: 'passive' },
          { wrong: 'thousands tourists', right: 'thousands of tourists', why: '«Migliaia di» = thousands OF.', topic: 'countable' },
          { wrong: 'thousand of tourists', right: 'thousands of tourists', why: '«Migliaia di» (numero non preciso) = thousands of, con la -s.', topic: 'plurals' },
          { wrong: 'historical centre', right: 'historic centre / old town', why: 'Il centro storico si chiama old town o historic centre (historical = che riguarda la storia).', topic: 'false_friends' },
          { wrong: 'is visit by', right: 'is visited by', why: 'Il passivo vuole il participio: visited.', topic: 'passive' }
        ]
      },
      {
        it: 'Mi piace passeggiare lungo il fiume la sera.',
        en: ['I like walking along the river in the evening.', 'I like to walk along the river in the evening.', 'I like walking along the river in the evenings.', 'I like to walk along the river in the evenings.', 'I enjoy walking along the river in the evening.', 'I enjoy walking along the river in the evenings.', 'In the evening I like walking along the river.', 'In the evening I like to walk along the river.'],
        topics: ['gerund_infinitive', 'prep_time'],
        explanation: 'Like può essere seguito da -ing o da to; enjoy solo da -ing. «La sera» = in the evening.',
        tips: [
          { wrong: 'enjoy to walk', right: 'enjoy walking', why: 'Dopo enjoy il verbo va sempre in -ing.', topic: 'gerund_infinitive' },
          { wrong: 'like walk', right: 'like walking / like to walk', why: 'Dopo like serve -ing o to: like walking, like to walk.', topic: 'gerund_infinitive' },
          { wrong: 'at the evening', right: 'in the evening', why: '«La sera» = in the evening (ma at night).', topic: 'prep_time' },
          { wrong: 'it pleases me', right: 'I like', why: '«Mi piace» = I like (non si traduce parola per parola).', topic: 'gerund_infinitive' }
        ]
      }
    ]
  },

  /* ======================= B1+ ======================= */
  {
    id: 'w_b1p_infanzia', level: 'B1+', title: 'Quando ero piccolo',
    sentences: [
      {
        it: 'Quando ero piccolo, andavo al mare ogni estate con i nonni.',
        en: ['When I was little, I used to go to the seaside every summer with my grandparents.', 'When I was a child, I used to go to the seaside every summer with my grandparents.', 'When I was little, I used to go to the sea every summer with my grandparents.', 'When I was young, I used to go to the seaside every summer with my grandparents.', 'When I was little, I went to the seaside every summer with my grandparents.', 'When I was a child, I went to the seaside every summer with my grandparents.', 'When I was a kid, I used to go to the seaside every summer with my grandparents.', 'When I was small, I used to go to the seaside every summer with my grandparents.'],
        topics: ['used_to'],
        explanation: 'Un\'abitudine del passato che oggi non c\'è più → used to + verbo base (oppure il past simple). Con i parenti in inglese si usa il possessivo: my grandparents.',
        tips: [
          { wrong: 'i was used to go', right: 'I used to go', why: 'Abitudine passata = used to + verbo base. Be used to + -ing vuol dire «essere abituato a».', topic: 'used_to' },
          { wrong: 'used to going', right: 'used to go', why: 'Dopo used to (abitudine passata) il verbo va alla forma base.', topic: 'used_to' },
          { wrong: 'with the grandparents', right: 'with my grandparents', why: 'Con i membri della famiglia in inglese si usa il possessivo: my grandparents.', topic: 'possessives' },
          { wrong: 'grandfathers', right: 'grandparents', why: '«I nonni» (nonno e nonna) = grandparents.', topic: 'vocab_basic' },
          { wrong: 'when i was small i go', right: 'I used to go', why: 'Parli del passato: used to go (o went).', topic: 'used_to' }
        ]
      },
      {
        it: 'Non mi piacevano le verdure, ma adesso le mangio volentieri.',
        en: ["I didn't use to like vegetables, but now I'm happy to eat them.", "I didn't use to like vegetables, but now I enjoy eating them.", "I didn't like vegetables, but now I enjoy eating them.", "I didn't like vegetables, but now I'm happy to eat them.", "I used not to like vegetables, but now I enjoy eating them.", "I didn't use to like vegetables, but now I like eating them.", "I didn't use to like vegetables, but now I like them."],
        topics: ['used_to', 'articles_the'],
        explanation: 'Negativa di used to: didn\'t use to (senza -d dopo did). Parlando delle verdure in generale non si usa the.',
        tips: [
          { wrong: 'did not used to', right: "didn't use to", why: 'Dopo did il verbo torna alla forma base: didn\'t USE to.', topic: 'used_to' },
          { wrong: 'like the vegetables', right: 'like vegetables', why: 'Con un nome plurale in senso generale non si usa the.', topic: 'articles_the' },
          { wrong: 'i used to not like', right: "I didn't use to like", why: 'La negativa più comune è didn\'t use to (o used not to).', topic: 'used_to' },
          { wrong: 'vegetables did not like me', right: "I didn't like vegetables", why: '«Non mi piacevano» = I didn\'t like: il soggetto è la persona.', topic: 'used_to' },
          { wrong: 'i eat them willingly', right: 'I enjoy eating them', why: 'Willingly suona strano qui: «volentieri» = I enjoy eating them / I\'m happy to eat them.', topic: 'gerund_infinitive' }
        ]
      },
      {
        it: 'Quando siamo arrivati alla stazione, il treno era già partito.',
        en: ['When we arrived at the station, the train had already left.', 'When we got to the station, the train had already left.', 'By the time we arrived at the station, the train had already left.', 'By the time we got to the station, the train had already left.', 'When we reached the station, the train had already left.', 'When we arrived at the station, the train had already gone.'],
        topics: ['past_perfect'],
        explanation: 'Due azioni passate: quella avvenuta prima (il treno è partito) va al past perfect: had already left. Arrive AT un luogo preciso.',
        tips: [
          { wrong: 'the train already left', right: 'the train had already left', why: 'L\'azione è avvenuta PRIMA di un\'altra azione passata: past perfect (had left).', topic: 'past_perfect' },
          { wrong: 'the train has already left', right: 'the train had already left', why: 'Il racconto è al passato: past perfect (had), non present perfect (has).', topic: 'past_perfect' },
          { wrong: 'was already left', right: 'had already left', why: 'Il past perfect si forma con had, non con was.', topic: 'past_perfect' },
          { wrong: 'was already gone', right: 'had already left', why: 'Il past perfect si forma con had + participio: had already left.', topic: 'past_perfect' },
          { wrong: 'had already leaved', right: 'had already left', why: 'Leave è irregolare: leave – left – left.', topic: 'past_perfect' },
          { wrong: 'arrived to the station', right: 'arrived at the station', why: 'Arrive vuole at (luogo preciso) o in (città, paese), mai to.', topic: 'dependent_prepositions' },
          { wrong: 'we are arrived', right: 'we arrived', why: '«Siamo arrivati» = we arrived: in inglese niente be come ausiliare.', topic: 'past_simple' }
        ]
      },
      {
        it: 'La mamma mi disse che non dovevo preoccuparmi.',
        en: ["My mum told me that I didn't have to worry.", "My mum told me I didn't have to worry.", "Mum told me that I didn't have to worry.", "My mother told me that I didn't have to worry.", 'My mum told me not to worry.', 'Mum told me not to worry.', 'My mother told me not to worry.', "My mum said that I didn't have to worry.", "My mum told me that I shouldn't worry.", "My mum said I shouldn't worry."],
        topics: ['reported_speech'],
        explanation: 'Discorso indiretto: i tempi «vanno indietro» (don\'t have to → didn\'t have to). Tell vuole la persona (told me); say no. In alternativa: told me not to + verbo.',
        tips: [
          { wrong: 'said me', right: 'told me', why: 'Say non regge direttamente la persona: told me (oppure said to me).', topic: 'reported_speech' },
          { wrong: 'do not have to worry', right: "didn't have to worry", why: 'Nel discorso indiretto il tempo va indietro: didn\'t have to.', topic: 'reported_speech' },
          { wrong: 'must not worry', right: "didn't have to worry", why: 'Mustn\'t = divieto; qui il senso è «non c\'era bisogno»: didn\'t have to.', topic: 'modals_obligation' },
          { wrong: 'to not worry me', right: 'not to worry', why: 'Worry non è riflessivo: «preoccuparsi» = worry.', topic: 'reported_speech' },
          { wrong: 'worry me', right: 'worry', why: 'Worry non è riflessivo: «preoccuparmi» = worry.', topic: 'reported_speech' },
          { wrong: 'worry myself', right: 'worry', why: 'Worry non è riflessivo: «preoccuparmi» = worry.', topic: 'reported_speech' }
        ]
      }
    ]
  },
  {
    id: 'w_b1p_mistero', level: 'B1+', title: 'Un mistero in classe',
    sentences: [
      {
        it: 'Qualcuno deve aver preso il mio astuccio.',
        en: ['Someone must have taken my pencil case.', 'Somebody must have taken my pencil case.', 'Someone must have stolen my pencil case.', 'Somebody must have stolen my pencil case.'],
        topics: ['modals_deduction'],
        explanation: 'Deduzione sicura su un fatto passato: must have + participio (must have taken).',
        tips: [
          { wrong: 'must have took', right: 'must have taken', why: 'Dopo have serve il participio: taken (take – took – taken).', topic: 'modals_deduction' },
          { wrong: 'must took', right: 'must have taken', why: 'Deduzione sul passato: must HAVE + participio.', topic: 'modals_deduction' },
          { wrong: 'must take', right: 'must have taken', why: 'Il fatto è già successo: must have taken.', topic: 'modals_deduction' },
          { wrong: 'must had taken', right: 'must have taken', why: 'Dopo un modale il verbo va alla forma base: must HAVE taken.', topic: 'modals_deduction' },
          { wrong: 'someone has to have', right: 'someone must have', why: 'Per una deduzione si usa must have, non has to have.', topic: 'modals_deduction' }
        ]
      },
      {
        it: 'Non può essere stato Paolo: era in palestra.',
        en: ["It can't have been Paolo: he was in the gym.", "It can't have been Paolo: he was at the gym.", "It couldn't have been Paolo: he was in the gym.", "It couldn't have been Paolo: he was at the gym.", "It can't have been Paolo, because he was in the gym.", "It can't have been Paolo, because he was at the gym."],
        topics: ['modals_deduction', 'pronouns'],
        explanation: 'Deduzione negativa sicura sul passato: can\'t have been (non mustn\'t). Il soggetto va espresso: IT can\'t have been… HE was…',
        tips: [
          { wrong: 'must not have been', right: "can't have been", why: 'Per una deduzione negativa si usa can\'t have, non mustn\'t have.', topic: 'modals_deduction' },
          { wrong: 'can not be been', right: "can't have been", why: 'Deduzione sul passato: can\'t HAVE been.', topic: 'modals_deduction' },
          { wrong: 'cannot be paolo', right: "can't have been Paolo", why: 'Il fatto è passato: can\'t HAVE BEEN.', topic: 'modals_deduction' },
          { wrong: 'cannot have been paolo was', right: "can't have been Paolo: he was", why: 'Il soggetto va espresso: HE was in the gym.', topic: 'pronouns' },
          { wrong: 'paolo was in the gym it', right: "it can't have been Paolo", why: 'Rileggi l\'ordine della frase.', topic: 'modals_deduction' }
        ]
      },
      {
        it: 'Se trovassi il ladro, gli direi di restituirmelo subito.',
        en: ['If I found the thief, I would tell him to give it back to me immediately.', 'If I found the thief, I would tell him to give it back immediately.', 'If I found the thief, I would tell him to give it back to me straight away.', 'If I found the thief, I would tell him to give it back straight away.', 'If I found the thief, I would tell him to give it back right away.', 'If I found the thief, I would ask him to give it back to me immediately.', 'If I found the thief, I would ask him to give it back immediately.', 'If I caught the thief, I would tell him to give it back immediately.', 'If I found the thief, I would tell him to return it to me immediately.', 'If I found the thief, I would tell him to return it immediately.'],
        topics: ['second_conditional', 'phrasal_verbs'],
        explanation: 'Secondo tipo (ipotesi poco probabile): if + past simple, would + verbo base. «Dire a qualcuno di fare» = tell someone TO do. «Restituire» = give back (con il pronome in mezzo: give it back).',
        tips: [
          { wrong: 'if i would find', right: 'if I found', why: 'Dopo if nel secondo tipo si usa il past simple, non would.', topic: 'second_conditional' },
          { wrong: 'if i find', right: 'if I found', why: '«Se trovassi» (ipotesi poco probabile) = if I found (secondo tipo).', topic: 'second_conditional' },
          { wrong: 'i will tell', right: 'I would tell', why: 'Nel secondo tipo la frase principale vuole would.', topic: 'second_conditional' },
          { wrong: 'say him', right: 'tell him', why: 'Say non regge la persona: tell him.', topic: 'reported_speech' },
          { wrong: 'tell him that he give', right: 'tell him to give', why: '«Dire a qualcuno di fare» = tell someone TO do.', topic: 'reported_speech' },
          { wrong: 'give back it', right: 'give it back', why: 'Con un pronome il phrasal verb si divide: give IT back.', topic: 'phrasal_verbs' },
          { wrong: 'give me it back', right: 'give it back to me', why: 'L\'ordine naturale è give it back (to me).', topic: 'phrasal_verbs' }
        ]
      },
      {
        it: 'Alla fine l\'ho trovato sotto il banco: avevo dimenticato di averlo messo lì.',
        en: ['In the end I found it under my desk: I had forgotten that I had put it there.', 'In the end I found it under my desk: I had forgotten I had put it there.', 'In the end I found it under the desk: I had forgotten that I had put it there.', 'In the end I found it under the desk: I had forgotten I had put it there.', 'In the end I found it under my desk: I had forgotten putting it there.', 'In the end I found it under my desk: I had forgotten that I put it there.', 'Eventually I found it under my desk: I had forgotten that I had put it there.', 'Eventually I found it under my desk: I had forgotten I had put it there.'],
        topics: ['past_perfect'],
        explanation: '«Alla fine» (= infine) = in the end o eventually. L\'azione avvenuta prima (averlo messo) e il dimenticare precedono il ritrovamento: past perfect (had forgotten, had put).',
        tips: [
          { wrong: 'at the end i', right: 'in the end I', why: '«Alla fine» (= infine) = in the end; at the end vuole of + qualcosa (at the end of the lesson).', topic: 'prep_time' },
          { wrong: 'had forgot', right: 'had forgotten', why: 'Il participio di forget è forgotten.', topic: 'past_perfect' },
          { wrong: 'had forgotten to have put', right: 'had forgotten that I had put', why: '«Dimenticare di aver fatto» non si traduce con to have: forgotten that I had put / forgotten putting.', topic: 'past_perfect' },
          { wrong: 'had forgotten to put', right: 'had forgotten that I had put', why: 'Forget TO put = dimenticare di metterlo (non l\'hai messo). Qui l\'hai messo: forgotten that I had put / forgotten putting.', topic: 'gerund_infinitive' },
          { wrong: 'have found it', right: 'found it', why: 'Racconto al passato: past simple, I found it.', topic: 'pp_vs_past' },
          { wrong: 'i found under', right: 'I found it under', why: 'L\'oggetto va espresso: I found IT.', topic: 'pronouns' },
          { wrong: 'had putted', right: 'had put', why: 'Put è irregolare: put – put – put.', topic: 'past_perfect' }
        ]
      }
    ]
  },
  {
    id: 'w_b1p_intervista', level: 'B1+', title: 'Intervista a mio zio',
    sentences: [
      {
        it: 'Ho chiesto a mio zio che lavoro facesse.',
        en: ['I asked my uncle what job he did.', 'I asked my uncle what his job was.', 'I asked my uncle what he did for a living.', 'I asked my uncle what he did.', 'I asked my uncle what work he did.'],
        topics: ['reported_speech'],
        explanation: 'Domanda indiretta: niente inversione e niente do/did (what job he did, non what job did he do). Ask + persona, senza to.',
        tips: [
          { wrong: 'what job did he do', right: 'what job he did', why: 'Nelle domande indirette l\'ordine è quello della frase affermativa: what job he did.', topic: 'reported_speech' },
          { wrong: 'what was his job', right: 'what his job was', why: 'Nelle domande indirette niente inversione: what his job was.', topic: 'reported_speech' },
          { wrong: 'what did he do', right: 'what he did', why: 'Nelle domande indirette niente did: what he did.', topic: 'reported_speech' },
          { wrong: 'asked to my uncle', right: 'asked my uncle', why: 'Ask + persona, senza to: I asked my uncle.', topic: 'dependent_prepositions' },
          { wrong: 'what job he does', right: 'what job he did', why: 'Nel discorso indiretto dopo asked il tempo va indietro: did.', topic: 'reported_speech' },
          { wrong: 'i have asked', right: 'I asked', why: 'Episodio passato concluso: past simple.', topic: 'pp_vs_past' }
        ]
      },
      {
        it: 'Mi ha detto che aveva cominciato a lavorare a sedici anni.',
        en: ['He told me that he had started working at sixteen.', 'He told me he had started working at sixteen.', 'He told me that he had started to work at sixteen.', 'He told me that he had started working when he was sixteen.', 'He told me that he had started work at sixteen.', 'He told me he had started working when he was sixteen.', 'He told me that he had started working at the age of sixteen.', 'He told me he had started to work when he was sixteen.', 'He said that he had started working at sixteen.', 'He said he had started working when he was sixteen.'],
        topics: ['reported_speech', 'past_perfect'],
        explanation: 'Discorso indiretto: «ho cominciato» diventa had started (past perfect). Tell + persona (told me). L\'età: at sixteen / when he was sixteen.',
        tips: [
          { wrong: 'he said me', right: 'he told me', why: 'Say non regge la persona: he told me (oppure he said to me).', topic: 'reported_speech' },
          { wrong: 'had sixteen years', right: 'was sixteen', why: 'L\'età si dice con be: when he was sixteen (o at sixteen).', topic: 'be' },
          { wrong: 'with sixteen years', right: 'at sixteen', why: '«A sedici anni» = at sixteen / at the age of sixteen / when he was sixteen.', topic: 'be' },
          { wrong: 'at sixteen years', right: 'at sixteen / at the age of sixteen', why: 'Si dice at sixteen o at the age of sixteen (niente years).', topic: 'be' },
          { wrong: 'he has started', right: 'he had started', why: 'Nel discorso indiretto il passato prossimo diventa past perfect: had started.', topic: 'reported_speech' },
          { wrong: 'started to working', right: 'started working', why: 'Start + -ing oppure start + to + base, non to + -ing.', topic: 'gerund_infinitive' }
        ]
      },
      {
        it: 'Se potesse tornare indietro, studierebbe di più.',
        en: ['If he could go back, he would study more.', 'If he could go back, he would study harder.', 'If he could go back in time, he would study more.', 'If he could go back in time, he would study harder.', 'He would study more if he could go back.', 'He would study harder if he could go back in time.', 'If he could turn back time, he would study more.'],
        topics: ['second_conditional', 'phrasal_verbs'],
        explanation: 'Secondo tipo: if + past (could), would + verbo base. «Tornare indietro» = go back (go back in time).',
        tips: [
          { wrong: 'if he can go back', right: 'if he could go back', why: 'Ipotesi irreale → secondo tipo: if he could.', topic: 'second_conditional' },
          { wrong: 'if he would can', right: 'if he could', why: 'Can non ha il condizionale con would: si usa could.', topic: 'second_conditional' },
          { wrong: 'if he would go back', right: 'if he could go back', why: 'Dopo if nel secondo tipo niente would; qui «potesse» = could.', topic: 'second_conditional' },
          { wrong: 'he will study', right: 'he would study', why: 'Nel secondo tipo la principale vuole would.', topic: 'second_conditional' },
          { wrong: 'return back', right: 'go back', why: 'Return vuol già dire «tornare»: return back è ridondante. Meglio go back.', topic: 'phrasal_verbs' },
          { wrong: 'study of more', right: 'study more', why: '«Di più» = more, senza of.', topic: 'comparatives' }
        ]
      },
      {
        it: 'Mi ha consigliato di non arrendermi mai.',
        en: ['He advised me never to give up.', 'He told me never to give up.', 'He advised me not to give up.', 'He told me not to give up.', 'He advised me to never give up.', 'He told me to never give up.'],
        topics: ['reported_speech', 'phrasal_verbs'],
        explanation: 'Consiglio riferito: advise / tell + persona + (not/never) to + verbo. «Arrendersi, mollare» = give up. Advise (verbo) ≠ advice (nome).',
        tips: [
          { wrong: 'advice me', right: 'advised me', why: 'Advice è il nome (consiglio); il verbo è advise: he advised me.', topic: 'reported_speech' },
          { wrong: 'adviced', right: 'advised', why: 'Il verbo è advise → advised (con la s).', topic: 'reported_speech' },
          { wrong: 'suggested me', right: 'advised me / told me', why: 'Suggest non regge persona + infinito: advised me to / told me to.', topic: 'reported_speech' },
          { wrong: 'surrender', right: 'give up', why: 'Surrender si usa in guerra; «non arrenderti mai» = never give up.', topic: 'phrasal_verbs' },
          { wrong: 'give up me', right: 'give up', why: 'Give up (arrendersi) non è riflessivo.', topic: 'phrasal_verbs' },
          { wrong: 'advised me to not never', right: 'advised me never to', why: 'Una sola negazione: never to give up.', topic: 'reported_speech' },
          { wrong: 'said me', right: 'told me', why: 'Say non regge la persona: told me.', topic: 'reported_speech' }
        ]
      }
    ]
  }
], 'data/writing.js');
