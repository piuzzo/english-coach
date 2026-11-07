/* Resoconto via email a fine sessione (servizio FormSubmit, senza account).
 *
 * - Le impostazioni (attivo, indirizzo) stanno in state.reports e si sincronizzano tra dispositivi:
 *   l'indirizzo NON è nel codice (il repository è pubblico).
 * - Ogni resoconto entra in una coda locale del dispositivo (state.settings.mailQueue, mai
 *   sincronizzata: niente doppioni) e viene ritentato finché non parte, fino a 7 giorni.
 * - Al primo invio FormSubmit manda all'indirizzo un'email di ATTIVAZIONE da confermare una volta;
 *   i messaggi inviati prima della conferma vengono consegnati dopo.
 */
EC.report = (function () {
  'use strict';
  var U = EC.util;
  var ENDPOINT = 'https://formsubmit.co/ajax/';
  var MAX_AGE = 7 * 86400000;
  var MAX_HARD_FAILS = 3;
  var MAX_QUEUE = 30;
  var flushing = null;

  function cfg(state) {
    if (!state.reports) state.reports = { enabled: false, email: '', updatedAt: 0 };
    return state.reports;
  }
  function queue(state) {
    if (!Array.isArray(state.settings.mailQueue)) state.settings.mailQueue = [];
    return state.settings.mailQueue;
  }
  function info(state) {
    if (!state.settings.mailInfo) state.settings.mailInfo = { lastOkAt: null, lastError: '', needsActivation: false };
    return state.settings.mailInfo;
  }

  function validEmail(s) {
    s = String(s || '').trim();
    // indirizzo email oppure "alias" casuale fornito da FormSubmit dopo l'attivazione
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) || /^[a-f0-9]{20,64}$/i.test(s);
  }

  function enabled(state) {
    var c = cfg(state);
    return !!(c.enabled && validEmail(c.email));
  }

  function setConfig(state, enabledFlag, email) {
    var c = cfg(state);
    c.enabled = !!enabledFlag;
    c.email = String(email || '').trim();
    c.updatedAt = U.now();
  }

  function fmtTime(ts) {
    try {
      return new Date(ts).toLocaleString('it-IT', { weekday: 'short', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return new Date(ts).toISOString();
    }
  }
  function title(id) { var t = EC.data.topicById[id]; return t ? t.title : id; }

  /* Costruisce i campi dell'email (FormSubmit li mostra come tabella). Funzione pura. */
  function build(state, summary, extra) {
    extra = extra || {};
    var name = (state.profile && state.profile.name) || 'Lo studente';
    var pct = summary.firstTryTotal ? Math.round(summary.firstTryCorrect / summary.firstTryTotal * 100) : 0;
    var f = {};
    f._subject = 'English Coach – ' + name + ': sessione completata (' + pct + '% al primo colpo)' + (summary.levelUp ? ' 🚀 nuovo livello ' + summary.levelUp : '');
    f._template = 'table';
    f._captcha = 'false';
    f['Studente'] = name;
    f['Quando'] = fmtTime(summary.end || U.now()) + (extra.device ? ' (' + extra.device + ')' : '');
    f['Livello'] = summary.levelUp ? summary.level + ' → ' + summary.levelUp + ' 🚀 NUOVO LIVELLO!' : summary.level;
    f['Risultato'] = '10 risposte corrette in ' + summary.answered + ' esercizi · ' + summary.firstTryCorrect + '/' + summary.firstTryTotal +
      ' giuste al primo colpo (' + pct + '%) · ' + summary.minutes + ' min';
    var up = [], down = [];
    (summary.boxChanges || []).forEach(function (c) {
      if (c.to > c.from) up.push(title(c.topic));
      else if (c.to < c.from || (summary.perTopic[c.topic] && summary.perTopic[c.topic].wrong)) down.push(title(c.topic));
    });
    f['Argomenti migliorati'] = up.length ? U.uniq(up).join(', ') : '—';
    f['Da ripassare'] = down.length ? U.uniq(down).join(', ') : '—';
    var errs = summary.errors || [];
    f['Errori'] = errs.length ? String(errs.length) : 'nessuno 🎉';
    errs.slice(0, 10).forEach(function (e, i) {
      f['Errore ' + (i + 1)] = (e.instruction ? e.instruction + ' ' : '') + e.prompt + ' — ha risposto: «' + (e.given || '(nessuna)') + '» → giusto: «' + e.expected + '» [' + title(e.topic) + ']';
    });
    if (errs.length > 10) f['Altri errori'] = String(errs.length - 10);
    if (extra.levelStatus && extra.levelStatus.next) {
      var ls = extra.levelStatus;
      f['Verso il livello ' + ls.next] = ls.acquired + ' argomenti acquisiti su ' + ls.needAcquired + ' necessari · precisione ultime sessioni ' +
        Math.round(ls.accuracy * 100) + '% (serve ' + Math.round(ls.needAccuracy * 100) + '%)';
    }
    var sessions = state.sessions || [];
    var mins = sessions.reduce(function (a, s) { return a + (s.minutes || 0); }, 0);
    var wr = state.writings || [];
    f['In totale'] = sessions.length + ' sessioni' + (wr.length ? ' + ' + wr.length + ' traduzioni libere' : '') + ' · ' + mins + ' minuti · ' + ((state.streak && state.streak.count) || 0) + ' giorni di fila';
    return f;
  }

  /* Mette in coda il resoconto di una sessione (una sola volta per sessione). */
  function enqueue(state, summary, extra) {
    if (!enabled(state)) return false;
    var q = queue(state);
    var id = 's' + summary.start;
    if (q.some(function (x) { return x.id === id; })) return false;
    q.push({ id: id, fields: build(state, summary, extra), createdAt: U.now(), tries: 0, hardFails: 0 });
    while (q.length > MAX_QUEUE) q.shift();
    return true;
  }

  /* Resoconto di una traduzione libera. Funzione pura. */
  function buildWriting(state, w, extra) {
    extra = extra || {};
    var name = (state.profile && state.profile.name) || 'Lo studente';
    var f = {};
    f._subject = 'English Coach – ' + name + ': traduzione libera (' + w.correct + '/' + w.total + ' frasi corrette)';
    f._template = 'table';
    f._captcha = 'false';
    f['Studente'] = name;
    f['Quando'] = fmtTime(w.end || U.now()) + (extra.device ? ' (' + extra.device + ')' : '');
    f['Attività'] = 'Traduzione libera dall\'italiano: «' + w.title + '» (livello ' + w.level + ', ' + (w.source === 'ai' ? 'testo e correzione AI' : 'testo della banca offline') + ')';
    f['Risultato'] = w.correct + ' frasi corrette su ' + w.total + ' · ' + w.minutes + ' min';
    var up = [], down = [];
    (w.boxChanges || []).forEach(function (c) {
      if (c.to > c.from) up.push(title(c.topic));
      else if (c.to < c.from || (w.perTopic[c.topic] && w.perTopic[c.topic].wrong)) down.push(title(c.topic));
    });
    f['Argomenti migliorati'] = up.length ? U.uniq(up).join(', ') : '—';
    f['Da ripassare'] = down.length ? U.uniq(down).join(', ') : '—';
    (w.errors || []).slice(0, 8).forEach(function (e, i) {
      var det = (e.details || []).map(function (d) { return '«' + d.wrong + '» → «' + d.right + '»' + (d.topic ? ' [' + title(d.topic) + ']' : ''); }).join('; ');
      f['Frase ' + (i + 1)] = e.it + ' — ha scritto: «' + (e.given || '(nessuna)') + '» → corretta: «' + e.corrected + '»' + (det ? ' — ' + det : '');
    });
    if (w.drill && w.drill.length) {
      f['Rinforzo'] = w.drill.map(function (d) { return title(d.topic) + (d.correct ? ' ✓' : ' ✗'); }).join(', ');
    }
    return f;
  }

  function enqueueWriting(state, w, extra) {
    if (!enabled(state)) return false;
    var q = queue(state);
    var id = 'w' + w.start;
    if (q.some(function (x) { return x.id === id; })) return false;
    q.push({ id: id, fields: buildWriting(state, w, extra), createdAt: U.now(), tries: 0, hardFails: 0 });
    while (q.length > MAX_QUEUE) q.shift();
    return true;
  }

  function post(to, fields) {
    if (typeof fetch !== 'function') return Promise.reject(Object.assign(new Error('fetch non disponibile'), { network: true }));
    return fetch(ENDPOINT + encodeURIComponent(to), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(fields)
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        var ok = data && (data.success === true || data.success === 'true');
        var msg = (data && data.message) || '';
        if (ok) return { ok: true };
        if (/activat|confirm/i.test(msg)) return { ok: true, needsActivation: true, message: msg };
        var e = new Error(msg || ('errore ' + res.status));
        // 5xx / 52x = servizio irraggiungibile: si riprova; 4xx = richiesta rifiutata
        if (res.status >= 500 || res.status === 0) e.network = true;
        throw e;
      });
    }, function () {
      throw Object.assign(new Error('Nessuna connessione o servizio email non raggiungibile.'), { network: true });
    });
  }

  /* Prova a spedire tutto ciò che è in coda. Restituisce { sent, pending, error }. */
  function flush(state) {
    if (flushing) return flushing;
    var q = queue(state);
    var c = cfg(state);
    var inf = info(state);
    if (!q.length) return Promise.resolve({ sent: 0, pending: 0 });
    if (!enabled(state)) return Promise.resolve({ sent: 0, pending: q.length });
    var sent = 0, lastErr = null;
    var now = U.now();
    // scarta i resoconti troppo vecchi o rifiutati più volte
    state.settings.mailQueue = q = q.filter(function (x) { return now - x.createdAt < MAX_AGE && x.hardFails < MAX_HARD_FAILS; });
    var i = 0;
    function next() {
      if (i >= q.length) return Promise.resolve();
      var item = q[i];
      item.tries++;
      return post(c.email, item.fields).then(function (r) {
        q.splice(i, 1);
        sent++;
        inf.lastOkAt = U.now();
        inf.lastError = '';
        if (r.needsActivation) inf.needsActivation = true;
        return next();
      }, function (e) {
        lastErr = e;
        if (!e.network) { item.hardFails++; i++; return next(); }
        return null; // servizio irraggiungibile: inutile insistere ora, si riproverà
      });
    }
    flushing = next().then(function () {
      flushing = null;
      if (lastErr) inf.lastError = lastErr.message;
      return { sent: sent, pending: q.length, error: lastErr ? lastErr.message : null };
    });
    return flushing;
  }

  /* Email di prova (non passa dalla coda). */
  function sendTest(state) {
    var c = cfg(state);
    if (!validEmail(c.email)) return Promise.reject(new Error('Indirizzo email non valido.'));
    var name = (state.profile && state.profile.name) || 'lo studente';
    return post(c.email, {
      _subject: 'English Coach – email di prova',
      _template: 'table',
      _captcha: 'false',
      'Messaggio': 'Funziona! Da ora riceverai un resoconto ogni volta che ' + name + ' completa una sessione o una traduzione libera.',
      'Inviata': fmtTime(U.now())
    }).then(function (r) {
      var inf = info(state);
      inf.lastOkAt = U.now();
      inf.lastError = '';
      if (r.needsActivation) inf.needsActivation = true;
      return r;
    });
  }

  return {
    ENDPOINT: ENDPOINT,
    validEmail: validEmail,
    enabled: enabled,
    setConfig: setConfig,
    build: build,
    enqueue: enqueue,
    buildWriting: buildWriting,
    enqueueWriting: enqueueWriting,
    flush: flush,
    sendTest: sendTest,
    info: info,
    queue: queue
  };
})();
