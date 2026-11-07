# English Coach

Allenamento di inglese per uno studente di prima superiore: un **test iniziale** per capire il livello, poi **sessioni di esercizi** sempre diverse. Ogni errore viene spiegato, e la sessione finisce solo dopo **10 risposte corrette**.

## Come si usa

> Tutte le istruzioni di questa pagina sono anche **dentro l'app**, nella pagina **📖 Guida** del menu in alto. La Guida riconosce il dispositivo in uso ed evidenzia le istruzioni giuste.

**Online, su qualsiasi dispositivo (consigliato):** apri **https://piuzzo.github.io/english-coach/**

- **iPad / iPhone:** apri l'indirizzo in Safari → tasto **Condividi** → **"Aggiungi alla schermata Home"**. L'app compare come un'icona e si apre a schermo intero.
- **Mac / PC:** aprila nel browser e aggiungila ai preferiti. Chrome ed Edge permettono anche di "installarla" dall'icona nella barra degli indirizzi.

**Offline, senza internet:** apri il file **`index.html`** della cartella con un doppio clic (Mac e PC).

> I progressi sono salvati separatamente per ogni indirizzo e browser: la versione online e il file locale non li condividono. Con la **sincronizzazione** attiva (vedi sotto) è tutto unito automaticamente. Senza sincronizzazione conviene usare sempre lo stesso indirizzo.

Poi:

1. Apri l'app (online o con un doppio clic su **`index.html`**). Si apre nel browser: Chrome, Safari, Edge e Firefox vanno tutti bene, su Mac o Windows, anche su tablet.
2. Al primo avvio lo studente scrive il suo nome e fa il **test iniziale** (20–25 domande, 15–20 minuti).
3. Da lì in poi basta premere **"Inizia l'allenamento"**, possibilmente una volta al giorno. Ogni sessione dura in genere 5–15 minuti.

Non serve installare nulla e non serve internet, a parte l'AI facoltativa descritta più sotto.

## Cosa succede durante una sessione

- Gli argomenti sono **mescolati** e non compare mai lo stesso argomento due volte di fila.
- Circa il 60% degli esercizi riguarda il livello attuale e le basi ancora deboli, il 25% il ripasso di argomenti già imparati e il 15% un assaggio del livello successivo.
- Se lo studente **sbaglia**, vede la sua risposta, quella giusta e il **perché**. La spiegazione è mirata sull'errore commesso e spesso fa il confronto con l'italiano.
- Nelle risposte scritte deve **riscrivere la risposta giusta** prima di andare avanti.
- Dopo 2–3 esercizi arriva una **variante** sulla stessa regola.
- Se sbaglia più volte lo stesso argomento, gli esercizi diventano più guidati, fino alla scelta multipla.
- La sessione finisce **solo con 10 risposte corrette**. Se la si interrompe resta salvata, e la volta dopo si riparte dallo stesso punto.

## Traduzione libera

Dalla Home, riquadro **✍️ Traduzione libera**: l'app propone un breve testo in italiano (4–5 frasi) e lo studente lo traduce in inglese, frase per frase. Stessa filosofia delle sessioni:
- ogni frase viene corretta: per ogni errore lo studente vede **la sua versione, quella giusta e il perché**, con l'argomento di grammatica e la regola da ripassare;
- le frasi sbagliate vanno **riscritte corrette** prima di andare avanti;
- subito dopo arrivano **1–2 esercizi di rinforzo** sulle regole sbagliate (come la variante delle sessioni);
- gli argomenti salgono o scendono di "livello di memoria" come in una sessione, e la traduzione successiva punta proprio sugli errori fatti;
- conta per i giorni di fila e, se attivo, manda il resoconto via email.

**Con l'AI** (vedi sotto) il testo è creato su misura sugli argomenti più deboli e la correzione è fatta dall'AI frase per frase: accetta qualunque traduzione corretta, anche diversa da quella prevista, e spiega ogni errore.
**Senza AI** l'app usa 12 testi già pronti (3 per livello): se la frase coincide con una traduzione prevista è giusta; se contiene un errore tipico conosciuto (es. *I have fourteen years*) lo spiega; altrimenti mostra la traduzione modello con gli errori tipici da controllare e lo studente si autovaluta. Se l'AI non risponde, si passa da soli a questa modalità.

## Difficoltà che cresce da sola

- **Dentro ogni argomento ci sono 3 gradini**: riconoscere (scelta multipla), produrre con un aiuto (completare, riordinare, trasformare) e produrre da solo (correggere l'errore, tradurre).
- Ogni argomento ha un "livello di memoria" da 0 a 5. Sale quando lo studente lo fa bene in giorni diversi e scende se sbaglia. I ripassi si allontanano nel tempo: 1, 2, 4, 7 e 14 giorni.
- **Livelli: A1 → A2 → B1 → B1+.** Si sale quando l'80% degli argomenti del livello è acquisito e, nelle ultime 3 sessioni, almeno il 75% delle risposte era giusto al primo colpo.

## Contenuti

- **43 argomenti** (grammatica, lessico e lettura) su 4 livelli. Il dettaglio è nella schermata *Progressi*.
- **713 esercizi** scritti e controllati, tra cui 16 brani di lettura con 80 domande.
- **13 generatori** che combinano soggetti, verbi e contesti e producono migliaia di varianti sempre nuove.
- **12 testi per la traduzione libera** (3 per livello, 48 frasi) con traduzioni accettate, spiegazioni ed errori tipici.

## Usarlo su più dispositivi (sincronizzazione automatica)

I progressi si possono **sincronizzare da soli** tra Mac, PC e iPad. Vengono salvati in un file **segreto** sul tuo account GitHub (un Gist).

**Si configura una volta sola:**

1. Su GitHub apri **Settings → Developer settings → Fine-grained tokens → Generate new token** (link diretto: https://github.com/settings/personal-access-tokens/new).
2. Come nome scrivi *English Coach*; come scadenza, 1 anno.
3. In **Permissions → Account permissions** imposta **Gists** su **Read and write**. Nient'altro: così il token non può toccare i tuoi repository.
4. Genera il token e copialo (inizia con `github_pat_`).
5. Sul **primo dispositivo** incollalo in **Area genitore → Sincronizzazione tra dispositivi**. È l'unica volta che serve copiarlo.
6. **Gli altri dispositivi** si collegano con il **link di collegamento**: Area genitore → **🔗 Collega un altro dispositivo**.
   - **iPad/iPhone:** inquadra il **codice QR** con la Fotocamera e tocca il link. In Safari premi **Collega**, poi *Condividi → Aggiungi alla schermata Home*. L'icona si collega da sola al primo avvio.
   - **Mac/PC:** premi *Copia* o *Condividi* (AirDrop, Messaggi, email) e apri il link nel browser di quel computer.

   In alternativa, su un dispositivo nuovo puoi incollare il token dalla prima schermata (*"Hai già usato English Coach su un altro dispositivo? Collegalo"*).

Il token resta salvato in ogni dispositivo: **non va reinserito**. Fanno eccezione i casi in cui si cancellano i dati del browser o il token scade. Il link contiene il token, quindi mandalo solo ai tuoi dispositivi e non pubblicarlo.

**Come funziona:**

- **Quando avviene**: la sincronizzazione parte all'apertura dell'app, prima e dopo ogni sessione, durante gli esercizi e quando si chiude la pagina.
- **Unione dei dati**: i dati dei dispositivi vengono **uniti**, quindi le sessioni fatte offline non si perdono.
  - Il livello più alto raggiunto vale per tutti.
  - Una sessione interrotta su un dispositivo si riprende sull'altro.
- **Stato**: un'icona ☁️ in alto mostra lo stato: ✓ sincronizzato, offline, oppure ⚠️ errore.
- **Azzeramento**: azzerare i progressi con la sincronizzazione attiva vale per tutti i dispositivi.
- **Sicurezza**:
  - Il token e la chiave dell'AI restano solo nel browser di ciascun dispositivo.
  - Il Gist è "segreto": non è elencato pubblicamente, ma chi ha il link può leggerlo. Contiene solo il nome e i risultati degli esercizi.

**Senza sincronizzazione** i progressi restano nel browser del computer. Si possono comunque spostare a mano con **Area genitore → Esporta / Importa progressi**, che usa un file `.json`. Conviene esportare un backup ogni tanto: l'app lo ricorda da sola dopo 14 giorni.
Attenzione: in una finestra di navigazione privata i progressi non vengono salvati.

## Resoconto via email a fine sessione

Ogni volta che una sessione (o una traduzione libera) viene completata puoi ricevere un'email. Contiene:
- il risultato: esercizi svolti e % di risposte giuste al primo colpo;
- gli argomenti migliorati e quelli da ripassare;
- gli errori fatti, con la risposta giusta;
- i progressi verso il livello successivo.

**Come si attiva:**
1. **Genitori → Resoconto via email**: attiva l'interruttore, scrivi l'indirizzo e premi **Salva**.
2. Premi **Invia email di prova**. La prima volta arriva un'email di **attivazione** da FormSubmit: premi **Activate Form**. Va fatto una volta sola.

**Come funziona:**
- Le email partono dal servizio gratuito **FormSubmit** (formsubmit.co), senza bisogno di account. Il servizio riceve il nome e i risultati della sessione.
- L'indirizzo è un'impostazione: **non è scritto nel codice pubblico** e si sincronizza tra i dispositivi collegati.
- Se manca la connessione o il servizio non risponde, il resoconto resta **in coda** sul dispositivo e parte da solo più tardi, fino a 7 giorni. Non viene mai spedito due volte.
- Funziona dalla versione online. Dal file `index.html` aperto in locale potrebbe non funzionare.

## AI facoltativa (Claude)

Nell'**Area genitore** si può inserire una chiave API di Anthropic, che si crea su console.anthropic.com. Con la chiave l'app:
- crea a ogni sessione 8 esercizi nuovi sugli argomenti più deboli;
- quando una risposta scritta non è tra quelle previste, controlla se è comunque corretta e, se è sbagliata, dà una spiegazione su misura;
- nella **traduzione libera** crea il testo italiano su misura e corregge la traduzione frase per frase, spiegando ogni errore.

Il modello predefinito è Claude Opus 5.5. Nell'Area genitore si possono scegliere modelli più economici: Sonnet 5.5 o Haiku 5.5.

La chiave resta salvata solo in quel browser e non finisce nei backup. Conviene creare una chiave dedicata con un **limite di spesa mensile**.
Senza chiave, o senza internet, tutto funziona lo stesso con gli esercizi offline.

## Area genitore

Mostra:
- livello, sessioni fatte, minuti, percentuale di risposte giuste al primo colpo e giorni consecutivi;
- le ultime sessioni, le traduzioni libere (con le frasi sbagliate), gli argomenti più difficili, gli errori recenti e lo storico dei livelli;
- i pulsanti per il backup, le impostazioni dell'AI, la ripetizione del test di livello e l'azzeramento dei progressi.

## Per chi vuole modificare l'app

- Il metodo è spiegato in [METODOLOGIA.md](METODOLOGIA.md).
- Gli esercizi sono nella cartella `data/`. Il formato è descritto in [docs/FORMATO-ESERCIZI.md](docs/FORMATO-ESERCIZI.md).
- Controlli: `node tests/validate.js` controlla la banca degli esercizi e `node tests/run.js` lancia tutti i test. Serve Node.js.
