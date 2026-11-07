/* English Coach — schermate e navigazione. */
(function () {
  'use strict';
  if (typeof document === 'undefined') return;

  var U = EC.util, UI = EC.ui, L = EC.learner, M = EC.matcher;
  var esc = U.escapeHtml;
  var state = EC.storage.load();
  var app = document.getElementById('app');
  var ctx = { screen: 'home', session: null, placement: null, writing: null, keys: null, aiChip: null };

  var TYPE_INSTR = {
    mc: 'Scegli la risposta corretta.',
    gap: 'Completa la frase.',
    error: 'Nella frase c\'è un errore: correggilo riscrivendo la frase.',
    order: 'Riordina le parole.',
    transform: 'Trasforma la frase.',
    translate: 'Traduci in inglese.'
  };
  var TYPE_ICON = { mc: '☑️', gap: '✏️', error: '🔍', order: '🧩', transform: '🔄', translate: '🌍' };
  var PRAISE = ['Giusto!', 'Esatto!', 'Perfetto!', 'Ottimo!', 'Bravo!', 'Ben fatto!', 'Proprio così!', 'Great job!', 'Well done!'];

  function save() { EC.storage.save(state); }

  /* ---------- sincronizzazione tra dispositivi ---------- */
  // Sostituisce il contenuto di "state" mantenendo lo stesso oggetto (la sessione in corso lo usa).
  function adopt(next) {
    if (next && next !== state) {
      Object.keys(state).forEach(function (k) { if (!(k in next)) delete state[k]; });
      Object.keys(next).forEach(function (k) { state[k] = next[k]; });
    }
    save();
  }
  function syncNow(opts) {
    opts = opts || {};
    if (!EC.sync.enabled(state)) return Promise.resolve(false);
    var p = EC.sync.syncNow(state).then(function (res) {
      adopt(res.state);
      L._resetCache();
      return res.changed;
    }, function () { return false; });
    if (!opts.timeout) return p;
    return Promise.race([p, new Promise(function (r) { setTimeout(function () { r(false); }, opts.timeout); })]);
  }
  function flushReports() {
    if (!EC.report.queue(state).length) return Promise.resolve();
    return EC.report.flush(state).then(function () { save(); }, function () { save(); });
  }
  var syncTimer = null;
  function syncSoon(ms) {
    if (!EC.sync.enabled(state)) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () { syncNow(); }, ms || 15000);
  }
  function rerenderIfIdle() {
    if (ctx.session || ctx.placement || ctx.writing) return;
    if (document.querySelector('.modal-backdrop')) return;
    go(ctx.screen);
  }
  EC.sync.onStatus(function () { updateTopbar(); });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && EC.sync.enabled(state)) { clearTimeout(syncTimer); syncNow(); }
  });
  function topicOf(item) { return EC.data.topicById[item.topic] || { title: item.topic, level: '' }; }

  /* ================= navigazione ================= */
  function render(html, screen) {
    ctx.screen = screen || ctx.screen;
    ctx.keys = null;
    UI.$$('.confetti').forEach(function (c) { c.remove(); });
    app.innerHTML = '<div class="screen">' + html + '</div>';
    window.scrollTo(0, 0);
    updateTopbar();
  }

  function updateTopbar() {
    var el = document.getElementById('topbar-level');
    if (!el) return;
    var nav = [['home', 'Home'], ['progress', 'Progressi'], ['parent', 'Genitori'], ['guide', 'Guida']];
    var sy = '';
    if (EC.sync.enabled(state)) {
      var st = EC.sync.status.state;
      var icon = st === 'syncing' ? '<span class="spinner"></span>' : st === 'ok' ? '☁️✓' : st === 'offline' ? '☁️ offline' : st === 'error' ? '☁️⚠️' : '☁️';
      var title = st === 'ok' ? 'Progressi sincronizzati' : st === 'syncing' ? 'Sincronizzazione in corso' : st === 'offline' ? 'Offline: sincronizzerò appena torna la connessione' : st === 'error' ? 'Errore di sincronizzazione: ' + EC.sync.status.message : 'Sincronizzazione attiva';
      sy = '<button class="sync-chip sync-' + st + '" type="button" data-nav="parent" title="' + esc(title) + '" aria-label="' + esc(title) + '">' + icon + '</button>';
    }
    el.innerHTML = sy + (state.level ? UI.levelBadge(state.level) : '') + nav.map(function (n) {
      var cur = ctx.screen === n[0] ? ' aria-current="page"' : '';
      return '<button class="nav-btn" type="button" data-nav="' + n[0] + '"' + cur + '>' + n[1] + '</button>';
    }).join('');
  }

  function go(screen) {
    if (screen === 'home') return home();
    if (screen === 'progress') return progress();
    if (screen === 'parent') return parent();
    if (screen === 'guide') return guide();
  }

  document.addEventListener('click', function (e) {
    var n = e.target.closest('[data-nav]');
    if (n) {
      e.preventDefault();
      leaveActivity().then(function (ok) { if (ok) go(n.getAttribute('data-nav')); });
    }
  });

  function leaveActivity() {
    if (ctx.placement && !ctx.placement.finished) {
      return UI.confirm('Interrompere il test?', 'Il test iniziale non è finito: se esci dovrai ricominciarlo da capo.', 'Esci dal test', true)
        .then(function (ok) { if (ok) ctx.placement = null; return ok; });
    }
    if (ctx.session) {
      ctx.session = null; // i progressi sono già salvati dopo ogni risposta
      hideAiChip();
    }
    if (ctx.writing) {
      ctx.writing = null; // la traduzione in corso è salvata in state.activeWriting
      hideAiChip();
    }
    return Promise.resolve(true);
  }

  document.addEventListener('keydown', function (e) {
    if (document.querySelector('.modal-backdrop')) return;
    if (ctx.keys) ctx.keys(e);
  });

  /* ================= HOME ================= */
  function home() {
    if (!state.profile.name) return welcome();
    var name = esc(state.profile.name);
    var active = state.activeSession && state.activeSession.answered > 0 ? state.activeSession : null;
    var doneToday = state.sessions.some(function (s) { return s.date === U.today(); });
    var streak = state.streak.last && U.daysBetween(state.streak.last, U.today()) <= 1 ? state.streak.count : 0;
    var h = '<div class="hero">';
    h += '<p class="small">' + esc(new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })) + '</p>';
    h += '<h1 style="margin-top:6px">Ciao, ' + name + '! 👋</h1>';
    if (!state.level) {
      h += '<p style="margin-top:8px">Prima di iniziare facciamo un breve test (15–20 minuti) per capire da dove partire.</p>';
      h += '<button class="btn-hero" data-action="placement-intro">Fai il test iniziale →</button><br>';
      h += '<button class="link-hero" data-action="skip-placement">Salta il test e parti dal livello A1</button>';
    } else {
      h += '<p style="margin-top:8px">' + (doneToday ? 'Sessione di oggi completata. Se vuoi, puoi farne un\'altra!' : 'Ogni sessione finisce quando arrivi a <b>10 risposte corrette</b>. Se sbagli, ti spiego perché.') + '</p>';
      h += '<div class="chips"><span class="chip">Livello ' + esc(state.level) + '</span>' +
        (streak ? '<span class="chip">🔥 ' + streak + (streak === 1 ? ' giorno' : ' giorni di fila') + '</span>' : '') +
        (doneToday ? '<span class="chip">✅ Fatto oggi</span>' : '') + '</div>';
      h += active
        ? '<button class="btn-hero" data-action="start-session">Riprendi la sessione (' + active.correct + '/10) →</button>'
        : '<button class="btn-hero" data-action="start-session">' + (doneToday ? 'Un\'altra sessione' : 'Inizia l\'allenamento') + ' →</button>';
    }
    h += '</div>';

    if (!EC.storage.isAvailable()) {
      h += '<div class="banner" style="margin-top:16px">⚠️ <div>Questo browser non permette di salvare i progressi (forse è una finestra privata). Usa una finestra normale, oppure esporta il backup dall\'Area genitore prima di chiudere.</div></div>';
    }
    var needBackup = state.sessions.length >= 3 && (!state.lastBackupAt || U.now() - state.lastBackupAt > 14 * 86400000);
    if (needBackup) {
      h += '<div class="banner info" style="margin-top:16px">💾 <div class="grow">È passato un po\' dall\'ultimo backup dei progressi. Salvalo per non perderlo o per usarlo su un altro computer.</div><button class="btn secondary" data-action="export">Esporta</button></div>';
    }

    h += '<div class="card-grid" style="margin-top:18px">';
    if (state.level) {
      var aw = state.activeWriting;
      h += '<button class="card tile" data-action="writing"><span class="tile-icon">✍️</span><h3>' + (aw ? 'Riprendi la traduzione' : 'Traduzione libera') + '</h3>' +
        '<p class="muted small">' + (aw ? esc('«' + aw.text.title + '»: ' + (aw.results ? 'manca la correzione degli errori.' : 'continua a tradurre.'))
          : 'Traduci in inglese un breve testo italiano: ' + (EC.ai.enabled(state) ? 'l\'AI corregge ogni frase e spiega gli errori.' : 'confronta con la traduzione modello e impara dagli errori tipici.')) + '</p></button>';
      var st = L.levelUpStatus(state);
      h += '<button class="card tile" data-nav="progress"><span class="tile-icon">🗺️</span><h3>I miei progressi</h3>' +
        '<p class="muted small">' + st.acquired + ' argomenti su ' + st.total + ' acquisiti nel livello ' + esc(st.level) + '</p>' +
        UI.bar(st.total ? st.acquired / st.total : 0, 'ok') + '</button>';
    }
    var lastP = state.placements[state.placements.length - 1];
    h += '<button class="card tile" data-action="placement-intro"><span class="tile-icon">🎯</span><h3>' + (lastP ? 'Rifai il test di livello' : 'Test di livello') + '</h3>' +
      '<p class="muted small">' + (lastP ? 'Ultimo test: ' + UI.fmtDay(lastP.date) + '. Utile una volta al mese.' : 'Circa 20–25 domande, senza aiuti.') + '</p></button>';
    h += '<button class="card tile" data-nav="parent"><span class="tile-icon">👨‍👩‍👦</span><h3>Area genitore</h3><p class="muted small">Statistiche, errori frequenti, backup, AI facoltativa.</p></button>';
    h += '<button class="card tile" data-nav="guide"><span class="tile-icon">📖</span><h3>Guida</h3><p class="muted small">Come funziona, come installarla sul tablet, sincronizzazione.</p></button>';
    h += '</div>';
    render(h, 'home');
    bindActions();
  }

  function welcome() {
    var h = '<div class="card center stack-lg" style="max-width:520px;margin:30px auto;padding:34px">' +
      '<div class="big-emoji">🇬🇧</div><h1>Benvenuto in English Coach</h1>' +
      '<p class="muted">Un allenamento di inglese su misura: un test per capire il tuo livello, poi brevi sessioni di esercizi sempre diversi. Quando sbagli, ti spiego il perché.</p>' +
      '<div class="field" style="text-align:left"><label for="name">Come ti chiami?</label>' +
      '<input id="name" class="text-input" autocomplete="given-name" maxlength="30" placeholder="Il tuo nome"></div>' +
      '<button class="btn lg block" id="go">Iniziamo →</button>' +
      '<button class="btn ghost block" id="link-device">☁️ Hai già usato English Coach su un altro dispositivo? Collegalo</button>' +
      '<button class="btn ghost block" data-nav="guide">📖 Leggi la guida</button>' +
      '<p class="tiny muted">Oppure apri qui il <b>link di collegamento</b> (o inquadra il QR) creato dall\'Area genitore dell\'altro dispositivo.</p></div>';
    render(h, 'home');
    UI.$('#link-device').addEventListener('click', linkDeviceModal);
    var inp = UI.$('#name');
    inp.focus();
    function go2() {
      var v = inp.value.trim();
      if (!v) { inp.classList.add('shake'); setTimeout(function () { inp.classList.remove('shake'); }, 400); return; }
      state.profile.name = v;
      save();
      home();
    }
    UI.$('#go').addEventListener('click', go2);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go2(); });
  }

  function linkDeviceModal() {
    var m = UI.modal('<h2>☁️ Collega questo dispositivo</h2><p class="muted" style="margin-top:8px">Incolla lo stesso token GitHub usato sull\'altro dispositivo: i progressi verranno scaricati qui.</p>' +
      '<details style="margin-top:10px"><summary class="small" style="cursor:pointer;color:var(--primary);font-weight:700">Non hai ancora un token? Ecco come crearlo</summary>' + syncHowTo() + '</details>' +
      '<div class="field" style="margin-top:14px"><label for="sync-token">Token GitHub</label><input class="text-input" id="sync-token" type="password" autocomplete="off" placeholder="github_pat_..."></div>' +
      '<p id="sync-status" class="small muted" style="margin-top:8px"></p>' +
      '<div class="actions"><button class="btn secondary" data-modal="cancel">Annulla</button><button class="btn" id="sync-go">Collega</button></div>', { closeOnAction: true });
    UI.$('#sync-go', m.el).addEventListener('click', function () {
      activateSync(UI.$('#sync-token', m.el).value.trim()).then(function () { m.close(); home(); }, function (e) {
        UI.$('#sync-status', m.el).innerHTML = '<span style="color:var(--bad);font-weight:700">✗ ' + esc(e.message) + '</span>';
      });
    });
  }

  function bindActions() {
    UI.$$('[data-action]', app).forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.getAttribute('data-action');
        if (a === 'placement-intro') placementIntro();
        else if (a === 'skip-placement') skipPlacement();
        else if (a === 'start-session') startSession();
        else if (a === 'writing') startWriting();
        else if (a === 'export') exportBackup();
      });
    });
  }

  function skipPlacement() {
    UI.confirm('Partire da A1?', 'Senza test inizierai dal livello A1. Il sistema salirà di livello da solo man mano che migliori, e potrai fare il test quando vuoi.', 'Parti da A1').then(function (ok) {
      if (!ok) return;
      state.level = 'A1';
      state.levelHistory.push({ level: 'A1', date: U.today(), reason: 'manual' });
      save();
      home();
    });
  }

  /* ================= ESERCIZIO (componente comune) ================= */
  // mode: 'session' | 'placement'. onSubmit(given) viene chiamata una sola volta.
  function mountExercise(container, item, mode, onSubmit) {
    var t = item.type;
    var h = '';
    if (item.passage && EC.data.passages[item.passage]) {
      var p = EC.data.passages[item.passage];
      h += '<details class="passage card soft" open><summary>📖 ' + esc(p.title) + '</summary><div class="passage-text">' + esc(p.text) + '</div></details>';
    }
    var instr = t === 'order' ? item.prompt : (item.instruction || TYPE_INSTR[t]);
    h += '<div class="instruction"><span aria-hidden="true">' + (TYPE_ICON[t] || '') + '</span><span>' + esc(instr) + '</span></div>';

    if (t === 'mc') {
      h += '<div class="prompt">' + esc(item.prompt).replace(/___/g, '<span style="color:var(--primary)">_____</span>') + '</div>';
      var long = item.options.some(function (o) { return o.length > 26; });
      h += '<div class="options' + (long ? '' : ' two') + '">' + item.options.map(function (o, i) {
        return '<button class="option" data-opt="' + i + '"><span class="key">' + (i + 1) + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>';
    } else if (t === 'gap') {
      var parts = item.prompt.split('___');
      var size = Math.max(6, Math.min(24, (item.answers[0] || '').length + 3));
      h += '<div class="prompt">' + esc(parts[0]) + '<input class="inline-input" id="ans" size="' + size + '" ' + inputAttrs() + ' aria-label="Parola mancante">' + esc(parts.slice(1).join('___')) + '</div>';
    } else if (t === 'transform') {
      h += '<div class="prompt original">' + esc(item.prompt) + '</div>';
      h += '<input class="text-input" id="ans" style="margin-top:16px" ' + inputAttrs() + ' placeholder="Scrivi qui la frase trasformata">';
    } else if (t === 'translate') {
      h += '<div class="prompt it">«' + esc(item.prompt) + '»</div>';
      h += '<input class="text-input" id="ans" style="margin-top:16px" ' + inputAttrs() + ' placeholder="Scrivi la frase in inglese">';
    } else if (t === 'error') {
      h += '<div class="prompt original">' + esc(item.prompt) + '</div>';
      h += '<textarea class="text-input" id="ans" style="margin-top:16px" rows="2" ' + inputAttrs() + ' aria-label="Frase corretta">' + esc(item.prompt) + '</textarea>';
    } else if (t === 'order') {
      h += '<div class="tiles-answer" id="tiles-answer" aria-label="La tua frase"></div><div class="tiles-pool" id="tiles-pool"></div>';
    }

    h += '<div class="actions"><span class="hint">' + (t === 'mc' ? 'Premi <kbd>1</kbd>–<kbd>' + item.options.length + '</kbd> per scegliere' : 'Premi <kbd>Invio</kbd> per controllare') + '</span>';
    if (mode === 'placement') h += '<button class="btn secondary" data-ex="skip">Non lo so</button>';
    if (t === 'order') h += '<button class="btn secondary" data-ex="clear">Ricomincia</button>';
    if (t !== 'mc') h += '<button class="btn" data-ex="check">Controlla</button>';
    h += '</div>';
    container.innerHTML = h;

    var locked = false;
    function submit(given) {
      if (locked) return;
      locked = true;
      UI.$$('button, input, textarea', container).forEach(function (el) {
        if (!el.closest('.passage')) el.disabled = true;
      });
      onSubmit(given);
    }
    function shakeInput(el) {
      el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
      el.focus();
    }

    var getValue = null;
    if (t === 'mc') {
      UI.$$('.option', container).forEach(function (b) {
        b.addEventListener('click', function () { submit(item.options[+b.getAttribute('data-opt')]); });
      });
    } else if (t === 'order') {
      var words = orderWords(item.answers[0]);
      var punct = (item.answers[0].trim().match(/[.?!]$/) || [''])[0];
      var idx = words.map(function (w, i) { return i; });
      var shuffled = U.shuffle(idx);
      for (var tries = 0; tries < 6 && shuffled.join(',') === idx.join(','); tries++) shuffled = U.shuffle(idx);
      var chosen = [];
      var pool = UI.$('#tiles-pool', container), ans = UI.$('#tiles-answer', container);
      var drawTiles = function () {
        pool.innerHTML = shuffled.map(function (i) {
          return '<button class="tile-word' + (chosen.indexOf(i) !== -1 ? ' used' : '') + '" data-w="' + i + '">' + esc(words[i]) + '</button>';
        }).join('');
        ans.innerHTML = chosen.map(function (i, k) {
          return '<button class="tile-word" data-k="' + k + '">' + esc(words[i]) + '</button>';
        }).join('');
      };
      pool.addEventListener('click', function (e) {
        var b = e.target.closest('[data-w]');
        if (!b || locked) return;
        var i = +b.getAttribute('data-w');
        if (chosen.indexOf(i) === -1) chosen.push(i);
        drawTiles();
      });
      ans.addEventListener('click', function (e) {
        var b = e.target.closest('[data-k]');
        if (!b || locked) return;
        chosen.splice(+b.getAttribute('data-k'), 1);
        drawTiles();
      });
      drawTiles();
      getValue = function () {
        if (chosen.length < words.length) return null;
        return chosen.map(function (i) { return words[i]; }).join(' ') + punct;
      };
      var clr = UI.$('[data-ex="clear"]', container);
      if (clr) clr.addEventListener('click', function () { chosen = []; drawTiles(); });
    } else {
      var inp = UI.$('#ans', container);
      getValue = function () { return inp.value.trim() ? inp.value.trim() : null; };
      setTimeout(function () {
        inp.focus();
        if (t === 'error' && inp.setSelectionRange) inp.setSelectionRange(inp.value.length, inp.value.length);
      }, 30);
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); trySubmit(); }
      });
    }
    function trySubmit() {
      if (locked || !getValue) return;
      var v = getValue();
      if (v === null) {
        var target = UI.$('#ans', container) || UI.$('#tiles-answer', container);
        if (target) shakeInput(target);
        UI.toast(t === 'order' ? 'Usa tutte le parole per formare la frase.' : 'Scrivi una risposta (o premi "Non lo so").');
        return;
      }
      submit(v);
    }
    var chk = UI.$('[data-ex="check"]', container);
    if (chk) chk.addEventListener('click', trySubmit);
    var skip = UI.$('[data-ex="skip"]', container);
    if (skip) skip.addEventListener('click', function () { submit(''); });

    return {
      keys: function (e) {
        if (locked) return false;
        if (t === 'mc' && /^[1-9]$/.test(e.key)) {
          var i = +e.key - 1;
          if (item.options[i] !== undefined) { e.preventDefault(); submit(item.options[i]); return true; }
        }
        if (e.key === 'Enter' && t !== 'mc' && !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || '')) {
          e.preventDefault(); trySubmit(); return true;
        }
        return false;
      },
      markMc: function (given, correct) {
        UI.$$('.option', container).forEach(function (b) {
          var o = item.options[+b.getAttribute('data-opt')];
          if (o === correct) b.classList.add('correct');
          else if (o === given) b.classList.add('wrong');
          else b.classList.add('dim');
        });
      }
    };
  }

  function orderWords(s) {
    return String(s).trim().replace(/[.?!]+$/, '').split(/\s+/).filter(Boolean);
  }

  function inputAttrs() {
    return 'autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"';
  }

  /* ================= TEST INIZIALE ================= */
  function placementIntro() {
    var retake = state.placements.length > 0;
    var h = '<div class="card stack-lg" style="max-width:620px;margin:0 auto">' +
      '<div class="big-emoji">🎯</div><h1>' + (retake ? 'Test di livello' : 'Test iniziale') + '</h1>' +
      '<p class="muted">Serve a capire che cosa sai già e che cosa ti manca. Le domande diventano più facili o più difficili in base alle tue risposte.</p>' +
      '<ul class="stack" style="padding-left:20px;margin:0">' +
      '<li>Circa <b>20–25 domande</b>, 15–20 minuti.</li>' +
      '<li>Durante il test <b>non vedrai le correzioni</b>: è una misura, non una verifica.</li>' +
      '<li>Se non sai una risposta premi <b>"Non lo so"</b>: tirare a indovinare rende il risultato meno preciso.</li>' +
      (retake ? '<li>I tuoi progressi non verranno cancellati: il test può solo alzare il livello o segnalare argomenti da ripassare.</li>' : '') +
      '</ul><div class="actions"><button class="btn secondary" data-nav="home">Più tardi</button><button class="btn lg" id="start">Inizia il test →</button></div></div>';
    render(h, 'home');
    UI.$('#start').addEventListener('click', function () {
      ctx.placement = EC.placement.create();
      placementQuestion();
    });
  }

  function placementQuestion() {
    var P = ctx.placement;
    var item = P.next();
    if (!item) return placementResult();
    var n = P.answered + 1;
    var tot = P.estimatedTotal;
    var h = '<div class="session-head"><div class="meta"><div class="tiny muted">Test iniziale · domanda ' + n + '</div>' +
      '<div style="margin-top:8px">' + UI.bar((n - 1) / tot) + '</div></div></div>' +
      '<div class="card exercise" id="ex"></div>';
    render(h, 'home');
    var ctrl = mountExercise(UI.$('#ex'), item, 'placement', function (given) {
      P.answer(given);
      UI.toast('Risposta registrata ✓', 700);
      setTimeout(placementQuestion, 380);
    });
    ctx.keys = function (e) { ctrl.keys(e); };
  }

  function placementResult() {
    var P = ctx.placement;
    var r = P.result();
    var first = !state.level;
    if (first) L.initFromPlacement(state, r);
    else L.applyRetake(state, r);
    save();
    syncNow();
    ctx.placement = null;
    var lvl = state.level;
    var estTxt = r.estimated
      ? 'Hai dimostrato di padroneggiare il livello <b>' + esc(r.estimated) + '</b>.'
      : 'Il livello A1 non è ancora del tutto solido: partiamo dalle basi, che è la scelta giusta per costruire bene.';
    var h = '<div class="card celebrate stack-lg"><div class="big-emoji">🏁</div><h1>Test completato!</h1>' +
      '<div>' + UI.levelBadge(lvl, true) + '</div>' +
      '<p class="muted" style="max-width:520px;margin-left:auto;margin-right:auto">' + estTxt + ' Ci alleneremo sul livello <b>' + esc(lvl) + '</b>' +
      (first ? ', rinforzando anche le basi che ti servono.' : '.') + '</p>' +
      '<p class="small muted">Risposte corrette: ' + r.correct + ' su ' + r.total + '</p></div>';
    h += '<div class="card" style="margin-top:16px"><h2>Come è andata, livello per livello</h2><div class="stack" style="margin-top:14px">';
    EC.LEVELS.forEach(function (l) {
      var x = r.perLevel[l];
      if (!x) return;
      h += '<div class="row">' + UI.levelBadge(l) + '<div class="grow">' + UI.bar(x.correct / x.total, x.correct / x.total >= 0.7 ? 'ok' : '') + '</div><span class="small muted">' + x.correct + '/' + x.total + '</span></div>';
    });
    h += '</div></div>';
    var ok = [], ko = [];
    Object.keys(r.perTopic).forEach(function (id) {
      var t = EC.data.topicById[id];
      if (!t) return;
      (r.perTopic[id].correct === r.perTopic[id].total ? ok : ko).push(t);
    });
    h += '<div class="card" style="margin-top:16px"><h2>Argomenti</h2>';
    if (ko.length) h += '<p class="muted small" style="margin-top:8px">Da allenare:</p><div class="chips" style="margin-top:8px">' + ko.map(function (t) { return '<span class="chip bad">' + esc(t.title) + '</span>'; }).join('') + '</div>';
    if (ok.length) h += '<p class="muted small" style="margin-top:14px">Già a posto:</p><div class="chips" style="margin-top:8px">' + ok.map(function (t) { return '<span class="chip ok">' + esc(t.title) + '</span>'; }).join('') + '</div>';
    h += '</div><div class="actions"><button class="btn secondary" data-nav="progress">Vedi la mappa</button><button class="btn lg" data-action="start-session">Inizia l\'allenamento →</button></div>';
    render(h, 'home');
    bindActions();
    UI.confetti(60);
  }

  /* ================= SESSIONE ================= */
  function startSession() {
    if (EC.sync.enabled(state) && !ctx.session) {
      render('<div class="card center stack" style="max-width:420px;margin:40px auto"><div class="row" style="justify-content:center"><span class="spinner"></span> Sincronizzo i progressi…</div></div>', 'home');
      ctx.session = 'pending';
      return syncNow({ timeout: 5000 }).then(function () {
        if (ctx.session !== 'pending') return; // l'utente è andato altrove nel frattempo
        ctx.session = null;
        startSessionNow();
      });
    }
    startSessionNow();
  }

  function startSessionNow() {
    if (!state.level) { state.level = 'A1'; state.levelHistory.push({ level: 'A1', date: U.today(), reason: 'manual' }); }
    var resume = state.activeSession && state.activeSession.answered > 0 ? state.activeSession : null;
    ctx.session = EC.session.create(state, { resume: resume });
    if (EC.ai.enabled(state)) prefetchAi(ctx.session);
    showExercise();
  }

  function prefetchAi(sess) {
    showAiChip('<span class="spinner"></span> L\'AI prepara esercizi nuovi…');
    EC.ai.generateItems(state, EC.session.weakTopics(state, 4), 8).then(function (items) {
      if (ctx.session !== sess) return;
      sess.addAiItems(items);
      showAiChip('✨ ' + items.length + ' esercizi AI pronti');
      setTimeout(hideAiChip, 3500);
    }, function () {
      showAiChip('AI non disponibile: uso gli esercizi offline');
      setTimeout(hideAiChip, 3500);
    });
  }
  function showAiChip(html) {
    if (!ctx.aiChip) {
      ctx.aiChip = document.createElement('div');
      ctx.aiChip.className = 'chip primary ai-chip';
      document.body.appendChild(ctx.aiChip);
    }
    ctx.aiChip.innerHTML = html;
  }
  function hideAiChip() {
    if (ctx.aiChip) { ctx.aiChip.remove(); ctx.aiChip = null; }
  }

  function showExercise() {
    var s = ctx.session;
    if (!s) return home();
    var item = s.next();
    if (!item) {
      if (s.correct >= s.target) return finishSession();
      render('<div class="card"><h2>Nessun esercizio disponibile</h2><p class="muted">Qualcosa non va con la banca degli esercizi.</p></div>', 'home');
      return;
    }
    var topic = topicOf(item);
    var h = '<div class="session-head">' + UI.ring(s.correct, s.target) +
      '<div class="meta"><div class="tiny muted">Esercizio ' + (s.answered + 1) + ' · obiettivo: 10 risposte corrette</div>' +
      '<h2>' + esc(topic.title) + '</h2>' +
      '<div class="chips" style="margin-top:6px">' + UI.levelBadge(topic.level) +
      '<span class="chip">Gradino ' + item.difficulty + '/3</span>' + (item.ai ? '<span class="chip primary">✨ AI</span>' : '') +
      '<span class="chip warn hidden" id="variant-chip">🔁 Riproviamo questa regola</span></div></div>' +
      '<button class="btn ghost" id="quit" title="Esci (la sessione resta salvata)">Esci</button></div>' +
      '<div class="card exercise" id="ex"></div><div id="fb"></div>';
    render(h, 'home');
    if (s.currentIsVariant) UI.$('#variant-chip').classList.remove('hidden');
    UI.$('#quit').addEventListener('click', quitSession);
    var ctrl = mountExercise(UI.$('#ex'), item, 'session', function (given) { submitAnswer(item, given, ctrl); });
    ctx.keys = function (e) {
      var fbBtn = UI.$('#fb [data-fb="next"]');
      if (fbBtn) {
        if (e.key === 'Enter' && !fbBtn.disabled && !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); fbBtn.click(); }
        return;
      }
      ctrl.keys(e);
    };
  }

  // Risposta scritta non prevista: con l'AI attiva si chiede se è comunque accettabile.
  // Restituisce una Promise con le opzioni per session.answer ({ forceCorrect, aiNote }).
  function aiCheck(item, given) {
    var pre = EC.session.evaluate(item, given);
    var typed = item.type !== 'mc' && item.type !== 'order';
    if (pre.correct || !typed || !EC.ai.enabled(state) || pre.note || !given) return Promise.resolve({});
    UI.$('#fb').innerHTML = '<div class="feedback ok" style="background:var(--surface-2);border-color:var(--border)"><div class="row"><span class="spinner"></span> Controllo la tua risposta…</div></div>';
    return EC.ai.judge(state, item, given).then(function (j) {
      return j ? { forceCorrect: j.acceptable, aiNote: j.acceptable ? '' : j.explanation } : {};
    }, function () { return {}; });
  }

  function submitAnswer(item, given, ctrl) {
    var s = ctx.session;
    aiCheck(item, given).then(finalize);
    function finalize(opts) {
      if (ctx.session !== s) return;
      var ev = s.answer(given, opts);
      save();
      syncSoon(20000);
      if (!ev) return;
      if (item.type === 'mc') ctrl.markMc(given, item.answers[0]);
      if (ev.correct) UI.updateRing(ev.correctCount, s.target);
      showFeedback(item, given, ev);
    }
  }

  // opts (facoltativo): { onNext, hint } — usato dal rinforzo della traduzione libera
  function showFeedback(item, given, ev, opts) {
    opts = opts || {};
    var topic = topicOf(item);
    var fb = UI.$('#fb');
    var h;
    var typed = item.type !== 'mc' && item.type !== 'order';
    if (ev.correct) {
      h = '<div class="feedback ok"><div class="fb-title"><span class="fb-icon">✓</span>' + esc(U.pick(PRAISE)) + '</div>';
      if (ev.acceptedByAi) h += '<p class="small" style="margin-top:6px">La tua risposta è corretta anche se era diversa da quella prevista (' + esc(ev.expected) + ').</p>';
      else if (typed && M.basic(given) !== M.basic(ev.expected) && item.answers.length > 1) h += '<p class="small muted" style="margin-top:6px">Altra forma possibile: ' + esc(ev.expected) + '</p>';
      h += '<div class="why"><div class="why-title">💡 Perché è giusto</div><p>' + esc(item.explanation) + '</p></div>';
      h += '<div class="actions"><span class="hint"><kbd>Invio</kbd> per continuare</span><button class="btn ok" data-fb="next">' +
        (ev.done ? 'Fine! Vedi il riepilogo 🎉' : 'Avanti →') + '</button></div></div>';
    } else {
      h = '<div class="feedback bad"><div class="fb-title"><span class="fb-icon">✗</span>Non ancora… vediamo perché</div>';
      h += '<div class="fb-grid"><div class="fb-line"><span class="lbl">La tua risposta</span><span class="yours">' + (given ? esc(given) : '(nessuna)') + '</span></div>' +
        '<div class="fb-line"><span class="lbl">Risposta giusta</span><span class="right">' + esc(ev.expected) + '</span></div></div>';
      if (ev.nearMiss) h += '<p class="small" style="margin-top:10px">✏️ Ci sei quasi! Controlla l\'ortografia lettera per lettera.</p>';
      h += '<div class="why"><div class="why-title">💡 Perché</div>';
      if (ev.note) h += '<p><b>' + esc(ev.note) + '</b></p>';
      if (ev.aiNote) h += '<p><b>' + esc(ev.aiNote) + '</b></p>';
      h += '<p>' + esc(item.explanation) + '</p>';
      if (item.it) h += '<p class="small muted">In italiano: «' + esc(item.it) + '»</p>';
      h += '</div>';
      h += '<details class="rule-box"><summary>📘 Ripassa la regola: ' + esc(topic.title) + '</summary><div class="rule-body">' + UI.ruleHtml(topic) + '</div></details>';
      if (typed) {
        h += '<div class="retype"><label for="retype">✍️ Riscrivi la risposta giusta per fissarla in memoria:</label>' +
          '<input class="text-input" id="retype" ' + inputAttrs() + ' placeholder="' + esc(ev.expected) + '"></div>';
      }
      h += '<div class="actions"><span class="hint">' + esc(opts.hint || 'Tra poco ti propongo un esercizio simile') + '</span><button class="btn" data-fb="next"' + (typed ? ' disabled' : '') + '>Ho capito, avanti →</button></div></div>';
    }
    fb.innerHTML = h;
    var nextBtn = UI.$('[data-fb="next"]', fb);
    nextBtn.addEventListener('click', function () {
      if (opts.onNext) opts.onNext();
      else if (ev.done) finishSession(); else showExercise();
    });
    var rt = UI.$('#retype', fb);
    if (rt) {
      rt.addEventListener('input', function () {
        var ok = M.isMatch(rt.value, [ev.expected].concat(item.answers));
        nextBtn.disabled = !ok;
        rt.style.borderColor = ok ? 'var(--ok)' : '';
      });
      rt.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (!nextBtn.disabled) nextBtn.click(); else { rt.classList.remove('shake'); void rt.offsetWidth; rt.classList.add('shake'); } }
      });
      setTimeout(function () { rt.focus(); }, 50);
    } else {
      setTimeout(function () { nextBtn.focus(); }, 50);
    }
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function quitSession() {
    var s = ctx.session;
    UI.confirm('Vuoi fermarti qui?', 'La sessione resta salvata: quando torni ripartirai da ' + s.correct + '/10 risposte corrette.', 'Esci').then(function (ok) {
      if (!ok) return;
      ctx.session = null;
      hideAiChip();
      home();
    });
  }

  function finishSession() {
    var s = ctx.session;
    var sum = s.finish();
    if (EC.report.enabled(state)) {
      EC.report.enqueue(state, sum, { device: deviceInfo().label, levelStatus: L.levelUpStatus(state) });
    }
    save();
    flushReports();
    clearTimeout(syncTimer);
    syncNow();
    ctx.session = null;
    hideAiChip();
    var pct = sum.firstTryTotal ? Math.round(sum.firstTryCorrect / sum.firstTryTotal * 100) : 0;
    var emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : '💪';
    var msg = pct >= 90 ? 'Sessione fantastica!' : pct >= 70 ? 'Sessione completata!' : 'Ce l\'hai fatta, e gli errori ti hanno insegnato qualcosa!';
    var h = '<div class="card celebrate stack"><div class="big-emoji">' + emoji + '</div><h1>' + msg + '</h1>' +
      '<p class="muted">Hai raggiunto 10 risposte corrette in ' + sum.answered + ' esercizi (' + sum.minutes + ' min).</p></div>';
    if (sum.levelUp) {
      h += '<div class="card levelup celebrate stack" style="margin-top:16px"><div class="big-emoji">🚀</div><h1 style="color:#fff">Nuovo livello: ' + esc(sum.levelUp) + '!</h1>' +
        '<p class="muted">Hai acquisito quasi tutti gli argomenti del livello precedente. Da ora gli esercizi saranno più impegnativi, e ripasseremo ogni tanto quello che sai già.</p></div>';
    }
    h += '<div class="stats" style="margin-top:16px">' +
      stat(pct + '%', 'giuste al primo colpo') + stat(sum.answered, 'esercizi svolti') +
      stat('🔥 ' + state.streak.count, state.streak.count === 1 ? 'giorno di allenamento' : 'giorni di fila') + stat(esc(state.level), 'livello attuale') + '</div>';
    var up = [], down = [];
    sum.boxChanges.forEach(function (c) {
      var t = EC.data.topicById[c.topic];
      if (!t) return;
      if (c.to > c.from) up.push(t); else if (c.to < c.from || sum.perTopic[c.topic].wrong) down.push(t);
    });
    if (up.length || down.length) {
      h += '<div class="card" style="margin-top:16px">';
      if (up.length) h += '<h3>⬆️ Stai migliorando in</h3><div class="chips" style="margin-top:8px">' + U.uniq(up).map(function (t) { return '<span class="chip ok">' + esc(t.title) + '</span>'; }).join('') + '</div>';
      if (down.length) h += '<h3 style="margin-top:' + (up.length ? 16 : 0) + 'px">🔁 Da ripassare domani</h3><div class="chips" style="margin-top:8px">' + U.uniq(down).map(function (t) { return '<span class="chip warn">' + esc(t.title) + '</span>'; }).join('') + '</div>';
      h += '</div>';
    }
    if (sum.errors.length) {
      h += '<div class="card" style="margin-top:16px"><h3>📝 Gli errori di oggi: rileggili un attimo</h3><ul class="err-list" style="margin-top:12px">' +
        sum.errors.map(errLi).join('') + '</ul></div>';
    }
    h += '<div class="actions"><button class="btn secondary" data-nav="home">Torna alla home</button><button class="btn" data-action="start-session">Un\'altra sessione</button></div>';
    render(h, 'home');
    bindActions();
    UI.confetti(sum.levelUp ? 160 : 90);
  }

  function errLi(e) {
    return '<li><div class="p">' + (e.instruction ? '<span class="muted small">' + esc(e.instruction) + '</span> ' : '') + esc(e.prompt) + '</div>' +
      '<div class="small" style="margin-top:4px"><span class="g">' + (e.given ? esc(e.given) : '(nessuna)') + '</span> → <span class="c">' + esc(e.expected) + '</span></div></li>';
  }
  function stat(v, l) { return '<div class="stat"><div class="v">' + v + '</div><div class="l">' + esc(l) + '</div></div>'; }

  /* ================= TRADUZIONE LIBERA ================= */
  // Lo stato vero è state.activeWriting (salvato e sincronizzato); ctx.writing tiene solo
  // ciò che serve alla schermata (frasi già riscritte, esercizi di rinforzo scelti).
  var W = EC.writing;

  function resumeWriting() {
    var w = state.activeWriting;
    if (!w.results) return writingWrite();
    if (w.drill && w.drill.length) return writingDrill(0);
    return writingReview();
  }

  function startWriting() {
    ctx.writing = { retyped: {}, rtText: {}, drillItems: null };
    var token = ctx.writing;
    if (state.activeWriting && state.activeWriting.text) return resumeWriting();
    if (EC.sync.enabled(state)) {
      render('<div class="card center stack" style="max-width:420px;margin:40px auto"><div class="row" style="justify-content:center"><span class="spinner"></span> Sincronizzo i progressi…</div></div>', 'home');
      return syncNow({ timeout: 5000 }).then(function () {
        if (ctx.writing !== token) return;
        if (state.activeWriting && state.activeWriting.text) return resumeWriting();
        newText(token);
      });
    }
    newText(token);
  }

  function newText(token) {
    function begin(text, source) {
      if (ctx.writing !== token) return;
      if (!text) {
        text = W.pickText(state);
        source = 'bank';
        if (!text) {
          ctx.writing = null;
          render('<div class="card"><h2>Nessun testo disponibile</h2><p class="muted">Qualcosa non va con la banca dei testi.</p></div>', 'home');
          return;
        }
      }
      W.start(state, text, source);
      save();
      writingWrite();
    }
    if (!EC.ai.enabled(state)) return begin(null);
    render('<div class="card center stack" style="max-width:460px;margin:40px auto"><div class="big-emoji">✨</div>' +
      '<div class="row" style="justify-content:center"><span class="spinner"></span> L\'AI prepara un testo su misura per te…</div>' +
      '<p class="small muted">Sceglie gli argomenti su cui ti serve più allenamento.</p></div>', 'home');
    var avoid = (state.writings || []).slice(-8).map(function (x) { return x.title; });
    EC.ai.generateText(state, { topics: W.focusTopics(state, 3), avoid: avoid }).then(function (text) {
      if (!text) UI.toast('L\'AI non ha preparato un testo valido: uso un testo della banca offline.', 3500);
      begin(text, 'ai');
    }, function () {
      UI.toast('AI non disponibile: uso un testo della banca offline.', 3500);
      begin(null);
    });
  }

  function writingHead(w, sub, icon) {
    return '<div class="session-head"><div class="w-badge" aria-hidden="true">' + (icon || '✍️') + '</div>' +
      '<div class="meta"><div class="tiny muted">' + esc(sub) + '</div><h2>' + esc(w.text.title) + '</h2>' +
      '<div class="chips" style="margin-top:6px">' + UI.levelBadge(w.text.level) +
      (w.source === 'ai' ? '<span class="chip primary">✨ AI</span>' : '<span class="chip">📚 Testo della banca</span>') + '</div></div>' +
      '<button class="btn ghost" id="w-quit" title="Esci (la traduzione resta salvata)">Esci</button></div>';
  }

  function bindQuit() {
    var q = UI.$('#w-quit');
    if (!q) return;
    q.addEventListener('click', function () {
      UI.confirm('Vuoi fermarti qui?', 'La traduzione resta salvata: la ritrovi in Home ("Riprendi la traduzione").', 'Esci').then(function (ok) {
        if (!ok) return;
        ctx.writing = null;
        hideAiChip();
        home();
      });
    });
  }

  /* ---------- 1. scrittura ---------- */
  function writingWrite() {
    var w = state.activeWriting;
    if (!w) return home();
    var ss = w.text.sentences;
    var h = writingHead(w, 'Traduzione libera · ' + ss.length + ' frasi');
    h += '<div class="card soft w-text"><div class="tiny muted">Il testo completo</div><p lang="it">' + esc(ss.map(function (s) { return s.it; }).join(' ')) + '</p></div>';
    h += '<div class="card exercise" style="margin-top:14px"><div class="instruction"><span aria-hidden="true">🌍</span>' +
      '<span>Traduci in inglese, frase per frase. Non serve tradurre parola per parola: conta che la frase sia corretta e dica la stessa cosa.</span></div>';
    ss.forEach(function (s, i) {
      h += '<div class="w-sentence"><label for="w-ans-' + i + '"><span class="w-num">' + (i + 1) + '</span><span lang="it">' + esc(s.it) + '</span></label>' +
        '<textarea class="text-input w-input" id="w-ans-' + i + '" data-wi="' + i + '" rows="2" lang="en" ' + inputAttrs() + ' placeholder="Scrivi la frase in inglese">' + esc(w.answers[i] || '') + '</textarea></div>';
    });
    h += '<div class="actions"><span class="hint">' + (EC.ai.enabled(state)
      ? 'Correzione con l\'AI: frase per frase, con la spiegazione di ogni errore.'
      : 'Correzione offline: le frasi che non so valutare le confronti tu con la traduzione modello.') + '</span>' +
      '<button class="btn" id="w-check">Correggi →</button></div></div>';
    render(h, 'home');
    bindQuit();

    var inputs = UI.$$('.w-input');
    var timer = null;
    function collect() { return inputs.map(function (el) { return el.value.trim(); }); }
    inputs.forEach(function (el, i) {
      el.addEventListener('input', function () {
        if (!state.activeWriting) return;
        W.setAnswers(state, collect());
        clearTimeout(timer);
        timer = setTimeout(save, 600);
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (inputs[i + 1]) inputs[i + 1].focus(); else UI.$('#w-check').focus();
        }
      });
    });
    var firstEmpty = inputs.filter(function (el) { return !el.value.trim(); })[0];
    setTimeout(function () { (firstEmpty || inputs[0]).focus(); }, 30);

    UI.$('#w-check').addEventListener('click', function () {
      clearTimeout(timer);
      var answers = collect();
      W.setAnswers(state, answers);
      save();
      var empty = answers.filter(function (a) { return !a; }).length;
      if (empty === answers.length) {
        inputs[0].classList.remove('shake'); void inputs[0].offsetWidth; inputs[0].classList.add('shake');
        inputs[0].focus();
        UI.toast('Scrivi almeno una frase in inglese.');
        return;
      }
      var go2 = function () { writingCorrect(); };
      if (!empty) return go2();
      UI.confirm('Alcune frasi sono vuote', 'Le frasi senza traduzione contano come errori. Vuoi far correggere lo stesso?', 'Correggi').then(function (ok) { if (ok) go2(); });
    });
  }

  /* ---------- 2. correzione ---------- */
  function writingCorrect() {
    var w = state.activeWriting;
    var token = ctx.writing;
    var start = w.start, text = w.text, answers = w.answers.slice();
    function done(results) {
      if (ctx.writing !== token || !state.activeWriting || state.activeWriting.start !== start) return;
      W.setResults(state, results);
      save();
      syncSoon(20000);
      writingReview();
    }
    if (!EC.ai.enabled(state)) return done(W.gradeOffline(text, answers));
    render(writingHead(w, 'Traduzione libera · correzione') +
      '<div class="card center stack" style="margin-top:14px"><div class="row" style="justify-content:center"><span class="spinner"></span> L\'AI sta correggendo la tua traduzione…</div>' +
      '<p class="small muted">Controlla ogni frase e prepara la spiegazione degli errori: può volerci fino a un minuto.</p></div>', 'home');
    bindQuit();
    EC.ai.correctTranslation(state, text, answers).then(done, function () {
      UI.toast('Correzione AI non riuscita: uso la correzione offline.', 3500);
      done(W.gradeOffline(text, answers));
    });
  }

  function topicChip(id) {
    var t = id && EC.data.topicById[id];
    return t ? ' <span class="chip">' + esc(t.title) + '</span>' : '';
  }

  function resultCard(i) {
    var w = state.activeWriting;
    var r = w.results[i], s = w.text.sentences[i];
    var itLine = '<div class="w-it-line"><span class="w-num">' + (i + 1) + '</span><span lang="it">' + esc(s.it) + '</span></div>';
    var h;
    if (r.status === 'ok') {
      h = '<div class="feedback ok w-card"><div class="fb-title"><span class="fb-icon">✓</span>' + esc(PRAISE[i % PRAISE.length]) + '</div>' + itLine +
        '<div class="fb-grid"><div class="fb-line"><span class="lbl">La tua traduzione</span><span class="w-given">' + esc(r.given) + '</span></div>';
      if (r.model && !M.isMatch(r.model, [r.given])) {
        h += '<div class="fb-line"><span class="lbl">' + (r.by === 'ai' ? 'Più naturale' : 'Altra versione') + '</span><span>' + esc(r.model) + '</span></div>';
      }
      h += '</div>';
      if (r.comment) h += '<p class="small" style="margin-top:8px">' + esc(r.comment) + '</p>';
      h += '<details class="rule-box"><summary>💡 Il punto chiave della frase</summary><div class="rule-body">' + esc(s.explanation) + '</div></details></div>';
      return h;
    }
    if (r.status === 'check') {
      h = '<div class="feedback w-card w-check"><div class="fb-title"><span class="fb-icon">?</span>Confronta con la traduzione modello</div>' + itLine +
        '<div class="fb-grid"><div class="fb-line"><span class="lbl">La tua traduzione</span><span class="w-given">' + esc(r.given) + '</span></div>' +
        '<div class="fb-line"><span class="lbl">Modello</span><span class="right">' + esc(r.model) + '</span></div></div>';
      var alt = (s.en || []).slice(1, 4);
      if (alt.length) h += '<p class="small muted" style="margin-top:8px">Vanno bene anche: ' + alt.map(esc).join(' · ') + '</p>';
      if (r.nearMiss) h += '<p class="small" style="margin-top:8px">✏️ È quasi uguale al modello: controlla l\'ortografia lettera per lettera.</p>';
      h += '<div class="why"><div class="why-title">💡 Il punto chiave</div><p>' + esc(s.explanation) + '</p>';
      if (s.tips && s.tips.length) {
        h += '<p class="small" style="margin-top:10px"><b>Errori tipici da controllare:</b></p><ul class="w-errs">' + s.tips.map(function (t) {
          return '<li><span class="w-wrong">' + esc(t.wrong) + '</span> → <span class="w-right">' + esc(t.right) + '</span><div class="small">' + esc(t.why) + '</div></li>';
        }).join('') + '</ul>';
      }
      h += '</div><div class="actions"><span class="hint">La tua frase è corretta e dice la stessa cosa?</span>' +
        '<button class="btn secondary" data-wself="' + i + '" data-v="0">✗ Avevo sbagliato</button><button class="btn ok" data-wself="' + i + '" data-v="1">✓ Era giusta</button></div></div>';
      return h;
    }
    // sbagliata
    h = '<div class="feedback bad w-card"><div class="fb-title"><span class="fb-icon">✗</span>Non ancora… vediamo perché</div>' + itLine +
      '<div class="fb-grid"><div class="fb-line"><span class="lbl">La tua traduzione</span><span class="yours">' + (r.given ? esc(r.given) : '(nessuna)') + '</span></div>' +
      '<div class="fb-line"><span class="lbl">Corretta</span><span class="right">' + esc(r.corrected) + '</span></div>';
    if (r.model && !M.isMatch(r.model, [r.corrected])) {
      h += '<div class="fb-line"><span class="lbl">' + (r.by === 'ai' ? 'Più naturale' : 'Modello') + '</span><span>' + esc(r.model) + '</span></div>';
    }
    h += '</div><div class="why"><div class="why-title">💡 Perché</div>';
    if (r.errors.length) {
      h += '<ul class="w-errs">' + r.errors.map(function (e) {
        return '<li>' + (e.wrong ? '<span class="w-wrong">' + esc(e.wrong) + '</span> → ' : '') + '<span class="w-right">' + esc(e.right) + '</span>' + topicChip(e.topic) +
          '<div>' + esc(e.why) + '</div></li>';
      }).join('') + '</ul>';
    }
    if (r.comment) h += '<p style="margin-top:8px"><b>' + esc(r.comment) + '</b></p>';
    h += '<p class="small muted" style="margin-top:8px">' + esc(s.explanation) + '</p></div>';
    var tids = U.uniq(r.errors.map(function (e) { return e.topic; }).filter(function (id) { return id && EC.data.topicById[id]; }));
    if (!tids.length) tids = (s.topics || []).filter(function (id) { return EC.data.topicById[id]; });
    tids.slice(0, 3).forEach(function (id) {
      var t = EC.data.topicById[id];
      h += '<details class="rule-box"><summary>📘 Ripassa la regola: ' + esc(t.title) + '</summary><div class="rule-body">' + UI.ruleHtml(t) + '</div></details>';
    });
    var done = ctx.writing.retyped[i];
    h += '<div class="retype"><label for="w-rt-' + i + '">✍️ Riscrivi la frase corretta per fissarla in memoria:</label>' +
      '<input class="text-input" id="w-rt-' + i + '" data-wrt="' + i + '" lang="en" ' + inputAttrs() + ' placeholder="' + esc(r.corrected) + '" value="' + esc(ctx.writing.rtText[i] || '') + '"' +
      (done ? ' style="border-color:var(--ok)"' : '') + '></div></div>';
    return h;
  }

  function writingReview() {
    var w = state.activeWriting;
    if (!w) return home();
    if (!w.results) return writingWrite();
    var res = w.results;
    var nOk = res.filter(function (r) { return r.status === 'ok'; }).length;
    var nCheck = res.filter(function (r) { return r.status === 'check'; }).length;
    var h = writingHead(w, 'Traduzione libera · correzione');
    h += '<div class="card w-score"><div class="row-between"><div><h2>' + nOk + (nOk === 1 ? ' frase giusta' : ' frasi giuste') + ' su ' + res.length + '</h2>' +
      '<p class="muted small" style="margin-top:4px">' + (nOk === res.length ? 'Perfetto! Leggi lo stesso le versioni alternative: arricchiscono il vocabolario.'
        : 'Leggi le correzioni e riscrivi ogni frase sbagliata.' + (nCheck ? ' Per ' + nCheck + (nCheck === 1 ? ' frase' : ' frasi') + ' confronta tu con la traduzione modello.' : '')) +
      '</p></div><span class="chip">' + (res.some(function (r) { return r.by === 'ai'; }) ? '✨ Corretta dall\'AI' : '📚 Correzione offline') + '</span></div></div>';
    res.forEach(function (r, i) { h += '<div id="w-res-' + i + '">' + resultCard(i) + '</div>'; });
    h += '<div class="actions"><span class="hint" id="w-hint"></span><button class="btn" id="w-next">Continua →</button></div>';
    render(h, 'home');
    bindQuit();
    var screen = UI.$('.screen', app);
    var next = UI.$('#w-next');

    function pending() {
      var cur = state.activeWriting;
      var p = { check: 0, retype: 0 };
      (cur ? cur.results : []).forEach(function (r, i) {
        if (r.status === 'check') p.check++;
        else if (r.status === 'wrong' && !ctx.writing.retyped[i]) p.retype++;
      });
      return p;
    }
    function update() {
      var p = pending();
      var busy = p.check + p.retype;
      next.disabled = busy > 0;
      var hint = [];
      if (p.check) hint.push(p.check + (p.check === 1 ? ' frase da confrontare' : ' frasi da confrontare'));
      if (p.retype) hint.push(p.retype + (p.retype === 1 ? ' frase da riscrivere' : ' frasi da riscrivere'));
      var drill = state.activeWriting ? W.drillTopics(state.activeWriting).length : 0;
      UI.$('#w-hint').textContent = busy ? 'Mancano: ' + hint.join(', ') : drill ? 'Poi ' + (drill === 1 ? 'un esercizio' : drill + ' esercizi') + ' di rinforzo sulle regole sbagliate' : 'Poi vedi il riepilogo';
      return busy;
    }
    function focusNext() {
      var cur = state.activeWriting;
      for (var i = 0; i < cur.results.length; i++) {
        var r = cur.results[i];
        if (r.status === 'wrong' && !ctx.writing.retyped[i]) { var el = UI.$('#w-rt-' + i); if (el) { el.focus(); return; } }
        if (r.status === 'check') { var c = UI.$('#w-res-' + i); if (c) { c.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; } }
      }
      next.focus();
    }

    screen.addEventListener('click', function (e) {
      var b = e.target.closest('[data-wself]');
      if (!b || !state.activeWriting) return;
      var i = +b.getAttribute('data-wself');
      W.resolveCheck(state.activeWriting.results[i], b.getAttribute('data-v') === '1');
      save();
      UI.$('#w-res-' + i).innerHTML = resultCard(i);
      update();
      var rt = UI.$('#w-rt-' + i);
      if (rt) rt.focus(); else focusNext();
    });
    screen.addEventListener('input', function (e) {
      var el = e.target.closest('[data-wrt]');
      if (!el || !state.activeWriting) return;
      var i = +el.getAttribute('data-wrt');
      var okk = W.retypeOk(state.activeWriting.results[i], state.activeWriting.text.sentences[i], el.value);
      ctx.writing.retyped[i] = okk;
      ctx.writing.rtText[i] = el.value;
      el.style.borderColor = okk ? 'var(--ok)' : '';
      update();
    });
    screen.addEventListener('keydown', function (e) {
      var el = e.target.closest('[data-wrt]');
      if (!el || e.key !== 'Enter') return;
      e.preventDefault();
      e.stopPropagation();
      if (ctx.writing.retyped[+el.getAttribute('data-wrt')]) focusNext();
      else { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
    });
    next.addEventListener('click', function () {
      if (update()) return;
      if (state.activeWriting && W.drillTopics(state.activeWriting).length) writingDrill(0);
      else writingFinish();
    });
    ctx.keys = function (e) {
      if (e.key === 'Enter' && !next.disabled && !/INPUT|TEXTAREA|BUTTON|SUMMARY/.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); next.click(); }
    };
    update();
    setTimeout(focusNext, 60);
  }

  /* ---------- 3. rinforzo: un esercizio sulla stessa regola, come la variante della sessione ---------- */
  function writingDrill(k) {
    var w = state.activeWriting;
    if (!w) return home();
    if (!ctx.writing.drillItems) {
      var doneTopics = (w.drill || []).map(function (d) { return d.topic; });
      var exclude = {};
      ctx.writing.drillItems = W.drillTopics(w).filter(function (t) { return doneTopics.indexOf(t) === -1; }).map(function (t) {
        var it = W.drillItem(state, t, null, exclude);
        if (it) exclude[it.id] = true;
        return it;
      }).filter(Boolean);
    }
    var items = ctx.writing.drillItems;
    if (k >= items.length) return writingFinish();
    var item = items[k];
    var topic = topicOf(item);
    var h = writingHead(w, 'Rinforzo ' + (k + 1) + ' di ' + items.length + ' · stessa regola dell\'errore', '🔁') +
      '<div class="banner info" style="margin-bottom:14px">🔁 <div>Nella traduzione hai sbagliato <b>' + esc(topic.title) + '</b>: proviamo subito un esercizio sulla stessa regola.</div></div>' +
      '<div class="card exercise" id="ex"></div><div id="fb"></div>';
    render(h, 'home');
    bindQuit();
    var token = ctx.writing;
    var ctrl = mountExercise(UI.$('#ex'), item, 'session', function (given) {
      aiCheck(item, given).then(function (opts) {
        if (ctx.writing !== token || !state.activeWriting) return;
        var ev = EC.session.evaluate(item, given);
        if (!ev.correct && opts.forceCorrect) { ev.correct = true; ev.acceptedByAi = true; }
        if (opts.aiNote) ev.aiNote = opts.aiNote;
        ev.done = false;
        W.recordDrill(state, item, ev.correct);
        save();
        if (item.type === 'mc') ctrl.markMc(given, item.answers[0]);
        showFeedback(item, given, ev, {
          onNext: function () { writingDrill(k + 1); },
          hint: k + 1 < items.length ? 'Ancora un esercizio di rinforzo' : 'Poi vedi il riepilogo della traduzione'
        });
      });
    });
    ctx.keys = function (e) {
      var fbBtn = UI.$('#fb [data-fb="next"]');
      if (fbBtn) {
        if (e.key === 'Enter' && !fbBtn.disabled && !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); fbBtn.click(); }
        return;
      }
      ctrl.keys(e);
    };
  }

  /* ---------- 4. riepilogo ---------- */
  function writingFinish() {
    var sum = W.finish(state);
    ctx.writing = null;
    if (!sum) return home();
    if (EC.report.enabled(state)) EC.report.enqueueWriting(state, sum, { device: deviceInfo().label });
    save();
    flushReports();
    clearTimeout(syncTimer);
    syncNow();
    var all = sum.correct === sum.total;
    var drillOk = sum.drill.filter(function (d) { return d.correct; }).length;
    var h = '<div class="card celebrate stack"><div class="big-emoji">' + (all ? '🏆' : sum.correct * 2 >= sum.total ? '🎉' : '💪') + '</div>' +
      '<h1>' + (all ? 'Traduzione perfetta!' : 'Traduzione completata!') + '</h1>' +
      '<p class="muted">«' + esc(sum.title) + '»: ' + sum.correct + ' frasi corrette su ' + sum.total + (sum.drill.length ? ' · rinforzo ' + drillOk + '/' + sum.drill.length : '') + ' (' + sum.minutes + ' min).</p></div>';
    h += '<div class="stats" style="margin-top:16px">' + stat(sum.correct + '/' + sum.total, 'frasi giuste') + stat(sum.errors.length, 'frasi corrette insieme') +
      stat('🔥 ' + state.streak.count, state.streak.count === 1 ? 'giorno di allenamento' : 'giorni di fila') + stat(esc(state.level), 'livello attuale') + '</div>';
    var up = [], down = [];
    sum.boxChanges.forEach(function (c) {
      var t = EC.data.topicById[c.topic];
      if (!t) return;
      if (c.to > c.from) up.push(t); else if (c.to < c.from || sum.perTopic[c.topic].wrong) down.push(t);
    });
    if (up.length || down.length) {
      h += '<div class="card" style="margin-top:16px">';
      if (up.length) h += '<h3>⬆️ Stai migliorando in</h3><div class="chips" style="margin-top:8px">' + U.uniq(up).map(function (t) { return '<span class="chip ok">' + esc(t.title) + '</span>'; }).join('') + '</div>';
      if (down.length) h += '<h3 style="margin-top:' + (up.length ? 16 : 0) + 'px">🔁 Da ripassare domani</h3><div class="chips" style="margin-top:8px">' + U.uniq(down).map(function (t) { return '<span class="chip warn">' + esc(t.title) + '</span>'; }).join('') + '</div>';
      h += '</div>';
    }
    if (sum.errors.length) {
      h += '<div class="card" style="margin-top:16px"><h3>📝 Le frasi da ricordare</h3><ul class="err-list" style="margin-top:12px">' + sum.errors.map(writingErrLi).join('') + '</ul></div>';
    }
    h += '<div class="actions"><button class="btn secondary" data-nav="home">Torna alla home</button><button class="btn" data-action="writing">Un\'altra traduzione</button></div>';
    render(h, 'home');
    bindActions();
    UI.confetti(all ? 120 : 60);
  }

  function writingErrLi(e) {
    return '<li><div class="p" lang="it">' + esc(e.it) + '</div>' +
      '<div class="small" style="margin-top:4px"><span class="g">' + (e.given ? esc(e.given) : '(nessuna)') + '</span> → <span class="c">' + esc(e.corrected) + '</span></div></li>';
  }


  /* ================= GUIDA ================= */
  function deviceInfo() {
    var ua = navigator.userAgent || '';
    var kind = isIOS() ? 'ios' : /Android/i.test(ua) ? 'android' : /Windows/i.test(ua) ? 'windows' : /Macintosh|Mac OS X/i.test(ua) ? 'mac' : 'altro';
    var label = { ios: /iPhone/.test(ua) ? 'iPhone' : 'iPad', android: 'tablet/telefono Android', windows: 'PC Windows', mac: 'Mac', altro: 'computer' }[kind];
    var mode = isStandalone() ? 'app dalla schermata Home' : location.protocol === 'file:' ? 'file locale (index.html)' : 'sito nel browser';
    return { kind: kind, label: label, mode: mode };
  }

  function guide() {
    var d = deviceInfo();
    var syncOn = EC.sync.enabled(state);
    var here = function (k) { return d.kind === k ? ' <span class="chip ok">← questo dispositivo</span>' : ''; };
    var url = PUBLIC_URL;
    var sec = function (id, title, body) { return '<section class="card guide-section stack" id="g-' + id + '"><h2>' + title + '</h2>' + body + '</section>'; };
    var steps = function (arr) { return '<ol class="steps">' + arr.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; };
    var faq = function (q, a) { return '<details class="faq"><summary>' + q + '</summary><div>' + a + '</div></details>'; };

    var h = '<h1>📖 Guida</h1><p class="muted" style="margin-top:6px">Tutto quello che serve per usare English Coach, passo per passo.</p>';

    // stato di questo dispositivo
    h += '<div class="card soft" style="margin-top:16px"><div class="row-between"><div><h3>Questo dispositivo</h3>' +
      '<p class="small muted" style="margin-top:4px">' + esc(d.label) + ' · ' + esc(d.mode) + ' · sincronizzazione ' +
      (syncOn ? '<b style="color:var(--ok)">attiva ☁️✓</b>' : '<b>non attiva</b>') + '</p></div>' +
      (syncOn ? '' : '<button class="btn secondary" data-nav="parent">Attiva la sincronizzazione</button>') + '</div></div>';

    // indice
    var idx = [['studente', '🎓 Per lo studente'], ['installare', '📲 Installare l\'app'], ['sync', '☁️ Sincronizzazione'], ['email', '📧 Email'], ['backup', '💾 Backup'], ['ai', '✨ AI'], ['faq', '❓ Domande frequenti']];
    h += '<div class="chips guide-index" style="margin-top:14px">' + idx.map(function (x) { return '<button class="chip primary" data-goto="g-' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>';

    h += sec('studente', '🎓 Come funziona (per lo studente)',
      steps([
        '<b>Primo avvio:</b> scrivi il tuo nome e fai il <b>test iniziale</b> (20–25 domande, 15–20 minuti). Durante il test non vedi le correzioni; se non sai una risposta premi <b>"Non lo so"</b> invece di tirare a indovinare.',
        '<b>Ogni giorno:</b> premi <b>"Inizia l\'allenamento"</b>. La sessione finisce quando arrivi a <b>10 risposte corrette</b> (l\'anello verde in alto si riempie).',
        '<b>Se sbagli:</b> leggi il "Perché", riscrivi la risposta giusta e vai avanti. Poco dopo arriva un esercizio simile sulla stessa regola: è il momento di dimostrare che l\'hai capita.',
        '<b>La difficoltà sale da sola:</b> ogni argomento ha 3 gradini (scegliere → completare → scrivere da solo) e il livello passa da A1 ad A2, B1 e B1+ quando sei pronto. Lo vedi in <b>Progressi</b>.',
        '<b>Puoi fermarti quando vuoi</b> con "Esci": la sessione resta salvata e riparte da dove eri.',
        '<b>Traduzione libera</b> (riquadro ✍️ in Home): ti propongo un breve testo in italiano e lo traduci in inglese frase per frase. Poi ogni frase viene corretta: per ogni errore vedi la tua versione, quella giusta e il perché. Riscrivi le frasi sbagliate e fai 1–2 esercizi di rinforzo sulle regole che hai sbagliato.'
      ]) +
      '<div class="banner info">💡 <div><b>Il trucco:</b> una sessione al giorno funziona molto meglio di tre sessioni in un giorno solo. Gli argomenti tornano a distanza di giorni apposta: è così che si fissano nella memoria.</div></div>' +
      '<p class="small muted">Sul computer puoi usare la tastiera: <kbd>1</kbd>–<kbd>4</kbd> per scegliere una risposta, <kbd>Invio</kbd> per controllare e andare avanti.</p>');

    h += sec('installare', '📲 Installare l\'app',
      '<p>Indirizzo dell\'app: <a href="' + url + '" target="_blank" rel="noopener"><b>' + esc(url.replace('https://', '')) + '</b></a></p>' +
      '<h3>iPad / iPhone' + here('ios') + '</h3>' + steps([
        'Apri l\'indirizzo in <b>Safari</b>.',
        'Tocca <b>Condividi</b> (il quadrato con la freccia in su) → <b>Aggiungi alla schermata Home</b> → <b>Aggiungi</b>.',
        'Da ora apri English Coach dall\'<b>icona EC</b>: si apre a schermo intero, come un\'app.'
      ]) +
      '<p class="small muted">Attenzione: l\'app sulla schermata Home ha una memoria separata da Safari. Se usi la sincronizzazione, il modo più semplice è collegare l\'iPad con il <b>codice QR</b> (vedi sotto): pensa a tutto lui, icona compresa.</p>' +
      '<h3>Tablet o telefono Android' + here('android') + '</h3>' + steps([
        'Apri l\'indirizzo in <b>Chrome</b>.',
        'Menu <b>⋮</b> → <b>Installa app</b> (oppure <b>Aggiungi a schermata Home</b>).'
      ]) +
      '<h3>Mac o PC Windows' + here('mac') + here('windows') + '</h3>' + steps([
        'Apri l\'indirizzo nel browser e aggiungilo ai <b>preferiti</b>.',
        'Con Chrome o Edge puoi anche "installarla": icona <b>Installa</b> nella barra degli indirizzi.'
      ]) +
      '<h3>Senza internet (solo Mac/PC)</h3>' + steps([
        'Su <a href="https://github.com/piuzzo/english-coach" target="_blank" rel="noopener">GitHub</a> premi <b>Code → Download ZIP</b> ed estrai la cartella.',
        'Apri <b>index.html</b> con un doppio clic. I progressi di questa versione sono separati da quelli online, a meno che non attivi la sincronizzazione.'
      ]));

    h += sec('sync', '☁️ Sincronizzazione tra dispositivi',
      '<p>Con la sincronizzazione i progressi sono gli stessi su Mac, PC e tablet, in automatico. Si configura <b>una volta sola</b>.</p>' +
      '<h3>1. Sul primo dispositivo (una volta)</h3>' + steps([
        'Su GitHub apri <a href="' + TOKEN_URL + '" target="_blank" rel="noopener"><b>Settings → Developer settings → Fine-grained tokens → Generate new token</b></a>.',
        'Nome: <b>English Coach</b>. Scadenza: 1 anno (o "No expiration").',
        'In <b>Permissions → Account permissions</b> imposta <b>Gists</b> su <b>Read and write</b>. Nient\'altro: così il token non può toccare i tuoi repository.',
        'Premi <b>Generate token</b> e copia il codice (inizia con <code>github_pat_</code>).',
        'In English Coach vai in <b>Genitori → Sincronizzazione tra dispositivi</b>, incolla il token e premi <b>Attiva sincronizzazione</b>.'
      ]) +
      '<h3>2. Sugli altri dispositivi (senza copiare il token)</h3>' + steps([
        'Sul dispositivo già collegato: <b>Genitori → 🔗 Collega un altro dispositivo</b>. Compare un codice QR.',
        '<b>iPad/iPhone:</b> inquadra il QR con la <b>Fotocamera</b> e tocca il link → in Safari premi <b>Collega</b> → <b>Condividi → Aggiungi alla schermata Home</b>. La prima volta che apri l\'icona premi ancora <b>Collega</b>, poi mai più.',
        '<b>Mac/PC:</b> premi <b>Copia</b> o <b>Condividi</b> (AirDrop, Messaggi, email a te stesso), apri il link nel browser di quel computer e premi <b>Collega</b>.'
      ]) +
      '<p class="small muted">In alternativa, su un dispositivo nuovo puoi incollare il token dalla prima schermata: "Hai già usato English Coach su un altro dispositivo? Collegalo".</p>' +
      '<h3>3. Poi fa tutto da sola</h3>' +
      '<p>Sincronizza all\'apertura, prima e dopo ogni sessione, durante gli esercizi, quando chiudi la pagina e quando torna internet. L\'icona in alto mostra lo stato: <span class="sync-chip sync-ok" style="cursor:default">☁️✓</span> sincronizzato, <span class="sync-chip sync-offline" style="cursor:default">☁️ offline</span> senza rete (sincronizzerà appena torna), <span class="sync-chip sync-error" style="cursor:default">☁️⚠️</span> problema (tocca l\'icona per i dettagli).</p>');

    h += sec('email', '📧 Resoconto via email',
      '<p>Puoi ricevere un\'email ogni volta che una sessione o una traduzione libera viene completata, con risultato, errori e progressi.</p>' + steps([
        'In <b>Genitori → Resoconto via email</b> attiva "Invia il resoconto", scrivi l\'indirizzo e premi <b>Salva</b>.',
        'Premi <b>Invia email di prova</b>. La prima volta arriva un\'email di <b>attivazione</b> da FormSubmit: aprila e premi <b>Activate Form</b> (una volta sola).',
        'Fatto: da ora il resoconto parte da solo a fine sessione, da qualunque dispositivo collegato. Se non c\'è connessione resta in attesa e parte appena possibile.'
      ]) + '<p class="small muted">Se le email non arrivano, controlla lo spam e segna il mittente come "non spam". Funziona dalla versione online dell\'app.</p>');

    h += sec('backup', '💾 Backup manuale',
      '<p>Con la sincronizzazione attiva i progressi sono già al sicuro su GitHub. Senza sincronizzazione, ogni tanto salva un backup:</p>' + steps([
        '<b>Genitori → Esporta progressi</b>: scarica un file <code>.json</code> (cartella Download).',
        'Per ripristinarlo, anche su un altro dispositivo: <b>Genitori → Importa progressi</b>.'
      ]) + '<p class="small muted">L\'app ricorda di fare il backup dopo 14 giorni. In una finestra di navigazione privata i progressi non vengono salvati.</p>');

    h += sec('ai', '✨ AI facoltativa (Claude)',
      '<p>Non serve per usare l\'app. Se la attivi, crea esercizi nuovi sugli argomenti più deboli, controlla le risposte scritte non previste e, nella <b>traduzione libera</b>, crea testi su misura e corregge ogni frase spiegando gli errori.</p>' + steps([
        'Crea una chiave API su <a href="https://console.anthropic.com/" target="_blank" rel="noopener">console.anthropic.com</a> e imposta un <b>limite di spesa mensile</b>.',
        'In <b>Genitori → AI facoltativa</b> incolla la chiave, attiva "Usa l\'AI", scegli il modello e premi <b>Prova la chiave</b>.'
      ]) + '<p class="small muted">La chiave resta solo nel browser di quel dispositivo (va inserita su ognuno) e non viene sincronizzata né salvata nei backup. Senza chiave o senza internet l\'app usa gli esercizi offline.</p>');

    h += sec('faq', '❓ Domande frequenti',
      faq('Devo reinserire il token ogni volta?', 'No. Resta salvato su ogni dispositivo. Va reinserito solo se si cancellano i dati del browser, se si usa una finestra privata o quando il token scade.') +
      faq('Ho cambiato tablet o ho cancellato i dati: ho perso i progressi?', 'No, se la sincronizzazione era attiva: ricollega il dispositivo (QR, link o token) e i progressi tornano. Senza sincronizzazione serve un backup da importare.') +
      faq('Compare ☁️⚠️ "token non valido o scaduto". Che faccio?', 'Crea un nuovo token (stessi passaggi). Su un dispositivo: <b>Genitori → Disattiva su questo dispositivo</b>, incolla il nuovo token e attiva; poi ricollega gli altri con il nuovo link/QR. I progressi restano.') +
      faq('Se usa due dispositivi senza internet, cosa succede?', 'Quando tornano online i progressi vengono <b>uniti</b>: nessuna sessione si perde e vale il livello più alto raggiunto.') +
      faq('Chi può vedere i progressi?', 'Sono in un Gist <b>segreto</b> del tuo account GitHub: non è elencato pubblicamente, ma chi conosce il suo link (o il link di collegamento) può leggerlo. Contiene solo il nome e i risultati degli esercizi. Il link di collegamento mandalo solo ai tuoi dispositivi.') +
      faq('Come funziona la traduzione libera senza AI?', 'Usa i testi già pronti dell\'app. Se la tua frase coincide con una traduzione prevista è giusta; se contiene un errore tipico conosciuto (per esempio <i>I have fourteen years</i>) te lo spiega; altrimenti ti mostra la traduzione modello con gli errori tipici da controllare e decidi tu se la tua era giusta. Con l\'AI attiva, invece, il testo è creato su misura sugli argomenti più deboli e la correzione è fatta frase per frase dall\'AI.') +
      faq('Perché una sessione dura più di 10 esercizi?', 'Perché finisce con 10 risposte <b>corrette</b>: ogni errore aggiunge un esercizio (con spiegazione e variante). È voluto: si impara proprio lì.') +
      faq('Il livello sembra troppo facile o troppo difficile.', 'Rifai il <b>test di livello</b> (Home → Rifai il test): non cancella i progressi, può alzare il livello e segnala gli argomenti da ripassare. Comunque il sistema si adatta da solo sessione dopo sessione.') +
      faq('Non ricevo le email dei resoconti.', 'Controlla lo spam e che l\'attivazione FormSubmit sia stata confermata (Genitori → Invia email di prova). Se il servizio è momentaneamente irraggiungibile i resoconti restano in attesa e partono da soli più tardi (fino a 7 giorni).') +
      faq('Come si ricomincia da zero?', '<b>Genitori → Azzera tutti i progressi</b>. Con la sincronizzazione attiva l\'azzeramento vale per tutti i dispositivi.')
    );

    render(h, 'guide');
    bindActions();
    UI.$$('[data-goto]').forEach(function (b) {
      b.addEventListener('click', function () {
        var t = document.getElementById(b.getAttribute('data-goto'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ================= PROGRESSI ================= */
  function progress() {
    if (!state.level) {
      render('<div class="card center stack-lg"><div class="big-emoji">🗺️</div><h1>I miei progressi</h1><p class="muted">Fai prima il test iniziale per vedere la tua mappa.</p><button class="btn" data-action="placement-intro">Fai il test</button></div>', 'progress');
      return bindActions();
    }
    var st = L.levelUpStatus(state);
    var h = '<div class="row-between"><h1>I miei progressi</h1>' + UI.levelBadge(state.level, false) + '</div>';
    if (st.next) {
      h += '<div class="card" style="margin-top:16px"><h2>Verso il livello ' + esc(st.next) + '</h2><div class="stack" style="margin-top:14px">' +
        '<div><div class="row-between small"><span>Argomenti acquisiti</span><b>' + st.acquired + ' / ' + st.needAcquired + ' necessari</b></div>' + UI.bar(st.needAcquired ? st.acquired / st.needAcquired : 0, 'ok') + '</div>' +
        '<div><div class="row-between small"><span>Giuste al primo colpo (ultime ' + st.needSessions + ' sessioni)</span><b>' + Math.round(st.accuracy * 100) + '% / ' + Math.round(st.needAccuracy * 100) + '%</b></div>' + UI.bar(st.accuracy / st.needAccuracy) + '</div>' +
        (st.sessions < st.needSessions ? '<p class="small muted">Servono almeno ' + st.needSessions + ' sessioni a questo livello (finora ' + st.sessions + ').</p>' : '') +
        '<p class="small muted">Un argomento è "acquisito" quando lo hai fatto bene in più giorni diversi: il sistema lo ripropone a distanza crescente (1, 2, 4, 7 giorni…) per fissarlo nella memoria a lungo termine.</p>' +
        '</div></div>';
    } else {
      h += '<div class="card" style="margin-top:16px"><h2>Sei al livello più alto disponibile 🎓</h2><p class="muted" style="margin-top:6px">Continua ad allenarti per consolidare tutto.</p></div>';
    }
    h += '<div class="legend" style="margin:18px 2px 8px"><span style="--c:var(--ok)">acquisito</span><span style="--c:var(--warn)">in corso</span><span style="--c:var(--bad)">da rinforzare</span><span style="--c:var(--surface-3)">non ancora visto</span></div>';
    var li = U.levelIndex(state.level);
    EC.LEVELS.forEach(function (lvl, i) {
      var topics = L.usableTopics().filter(function (t) { return t.level === lvl; });
      var prog = L.levelProgress(state, lvl);
      var locked = i > li + 1;
      h += '<div class="card level-block"' + (locked ? ' style="opacity:.7"' : '') + '><div class="level-head">' + UI.levelBadge(lvl) +
        '<div class="grow"><h3>Livello ' + esc(lvl) + (i === li ? ' · stai lavorando qui' : i === li + 1 ? ' · prossimo livello' : locked ? ' · 🔒 più avanti' : '') + '</h3>' +
        '<div class="small muted">' + prog.acquired + ' su ' + prog.total + ' argomenti acquisiti</div></div></div><div class="topic-grid">';
      topics.forEach(function (t) {
        var ts = state.topics[t.id] || { box: 0 };
        var dots = '';
        for (var k = 1; k <= 5; k++) dots += '<i class="' + (ts.box >= k ? 'on' : '') + '"></i>';
        h += '<button class="topic-pill" data-topic="' + esc(t.id) + '" data-color="' + L.topicColor(state, t.id) + '"><span>' + esc(t.title) + '</span><span class="dots">' + dots + '</span></button>';
      });
      h += '</div></div>';
    });
    render(h, 'progress');
    bindActions();
    UI.$$('[data-topic]').forEach(function (b) {
      b.addEventListener('click', function () { topicModal(b.getAttribute('data-topic')); });
    });
  }

  function topicModal(id) {
    var t = EC.data.topicById[id];
    var ts = state.topics[id] || { box: 0, seen: 0, correct: 0, wrong: 0 };
    var h = '<div class="row-between"><h2>' + esc(t.title) + '</h2>' + UI.levelBadge(t.level) + '</div>' +
      '<div class="rule-body" style="margin-top:14px;padding:14px 16px;border-radius:14px;background:var(--surface-2);border-left:4px solid var(--primary)">' + UI.ruleHtml(t) + '</div>' +
      '<div class="stats" style="margin-top:14px">' + stat(ts.seen || 0, 'esercizi fatti') + stat(ts.seen ? Math.round(ts.correct / ts.seen * 100) + '%' : '—', 'risposte giuste') + stat((ts.box || 0) + '/5', 'livello di memoria') + '</div>' +
      (ts.due && ts.seen ? '<p class="small muted" style="margin-top:10px">Prossimo ripasso: ' + UI.fmtDay(ts.due) + '</p>' : '') +
      '<div class="actions"><button class="btn" data-modal="close">Chiudi</button></div>';
    UI.modal(h);
  }

  /* ================= AREA GENITORE ================= */
  function parent() {
    var sessions = state.sessions;
    var mins = sessions.reduce(function (a, s) { return a + (s.minutes || 0); }, 0);
    var ft = sessions.reduce(function (a, s) { a[0] += s.firstTryCorrect; a[1] += s.firstTryTotal; return a; }, [0, 0]);
    var lastP = state.placements[state.placements.length - 1];
    var h = '<h1>Area genitore</h1><p class="muted" style="margin-top:6px">Andamento di ' + esc(state.profile.name || 'tuo figlio') + ', impostazioni e backup.</p>';
    h += '<div class="stats six" style="margin-top:16px">' +
      stat(state.level ? esc(state.level) : '—', 'livello di lavoro') +
      stat(sessions.length, 'sessioni completate') +
      stat(mins, 'minuti di esercizio') +
      stat(ft[1] ? Math.round(ft[0] / ft[1] * 100) + '%' : '—', 'giuste al primo colpo') +
      stat(state.streak.count + ' / ' + state.streak.best, 'giorni di fila (record)') +
      stat(lastP ? esc(lastP.estimated || 'pre-A1') : '—', 'livello all\'ultimo test') + '</div>';

    if (state.activeSession && state.activeSession.answered) {
      h += '<div class="banner info" style="margin-top:16px">⏸️ <div>C\'è una sessione interrotta a ' + state.activeSession.correct + '/10 risposte corrette (' + state.activeSession.answered + ' esercizi). Ripartirà da lì.</div></div>';
    }

    // ultime sessioni
    h += '<div class="card" style="margin-top:16px"><h2>Ultime sessioni</h2>';
    if (!sessions.length) h += '<p class="muted" style="margin-top:8px">Ancora nessuna sessione completata.</p>';
    else {
      h += '<div class="table-wrap" style="margin-top:10px"><table><thead><tr><th>Data</th><th>Livello</th><th>Esercizi</th><th>Primo colpo</th><th>Minuti</th><th>Errori</th></tr></thead><tbody>' +
        sessions.slice(-12).reverse().map(function (s) {
          return '<tr><td>' + UI.fmtDay(s.date) + '</td><td>' + esc(s.level) + (s.levelUp ? ' → ' + esc(s.levelUp) + ' 🚀' : '') + '</td><td>' + s.answered + '</td><td>' +
            (s.firstTryTotal ? Math.round(s.firstTryCorrect / s.firstTryTotal * 100) + '%' : '—') + '</td><td>' + s.minutes + '</td><td>' + s.errors.length + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    h += '</div>';

    // traduzioni libere
    var wr = state.writings || [];
    h += '<div class="card" style="margin-top:16px"><h2>✍️ Traduzioni libere</h2>';
    if (state.activeWriting) h += '<p class="small muted" style="margin-top:6px">In corso: «' + esc(state.activeWriting.text.title) + '».</p>';
    if (!wr.length) h += '<p class="muted" style="margin-top:8px">Ancora nessuna traduzione libera completata. Si avvia dalla Home (riquadro "Traduzione libera").</p>';
    else {
      h += '<div class="table-wrap" style="margin-top:10px"><table><thead><tr><th>Data</th><th>Testo</th><th>Livello</th><th>Frasi giuste</th><th>Correzione</th><th>Minuti</th></tr></thead><tbody>' +
        wr.slice(-10).reverse().map(function (x) {
          return '<tr><td>' + UI.fmtDay(x.date) + '</td><td>' + esc(x.title) + '</td><td>' + esc(x.level) + '</td><td>' + x.correct + '/' + x.total + '</td><td>' +
            (x.source === 'ai' ? 'AI' : 'offline') + '</td><td>' + x.minutes + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      var werrs = [];
      wr.slice().reverse().forEach(function (x) { (x.errors || []).slice().reverse().forEach(function (e) { if (werrs.length < 8) werrs.push(e); }); });
      if (werrs.length) h += '<h3 style="margin-top:16px">Frasi sbagliate di recente</h3><ul class="err-list" style="margin-top:10px">' + werrs.map(writingErrLi).join('') + '</ul>';
    }
    h += '</div>';

    // argomenti difficili
    var hard = Object.keys(state.topics).map(function (id) { return { id: id, t: state.topics[id], topic: EC.data.topicById[id] }; })
      .filter(function (x) { return x.topic && x.t.wrong >= 2; })
      .sort(function (a, b) { return (b.t.wrong / b.t.seen) - (a.t.wrong / a.t.seen) || b.t.wrong - a.t.wrong; })
      .slice(0, 8);
    h += '<div class="card" style="margin-top:16px"><h2>Argomenti più difficili</h2>';
    if (!hard.length) h += '<p class="muted" style="margin-top:8px">Nessuna difficoltà ricorrente finora.</p>';
    else {
      h += '<div class="table-wrap" style="margin-top:10px"><table><thead><tr><th>Argomento</th><th>Livello</th><th>Errori</th><th>% giuste</th><th>Memoria</th></tr></thead><tbody>' +
        hard.map(function (x) {
          return '<tr><td>' + esc(x.topic.title) + '</td><td>' + esc(x.topic.level) + '</td><td>' + x.t.wrong + '</td><td>' + Math.round(x.t.correct / x.t.seen * 100) + '%</td><td>' + x.t.box + '/5</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    h += '</div>';

    // errori recenti
    var errs = [];
    sessions.slice().reverse().forEach(function (s) { s.errors.slice().reverse().forEach(function (e) { if (errs.length < 12) errs.push(e); }); });
    if (errs.length) h += '<div class="card" style="margin-top:16px"><h2>Errori recenti</h2><ul class="err-list" style="margin-top:12px">' + errs.map(errLi).join('') + '</ul></div>';

    // storico livelli
    if (state.levelHistory.length) {
      var reason = { placement: 'test di livello', promotion: 'promozione automatica', manual: 'scelta manuale' };
      h += '<div class="card" style="margin-top:16px"><h2>Storico dei livelli</h2><ul class="stack" style="margin:12px 0 0;padding-left:20px">' +
        state.levelHistory.map(function (x) { return '<li>' + UI.fmtDay(x.date) + ': <b>' + esc(x.level) + '</b> <span class="muted">(' + esc(reason[x.reason] || x.reason) + ')</span></li>'; }).join('') + '</ul></div>';
    }

    h += syncCardHtml();
    h += reportCardHtml();

    // backup
    h += '<div class="card stack" style="margin-top:16px"><h2>💾 Backup manuale</h2>' +
      '<p class="muted">I progressi sono salvati in questo browser. Puoi anche esportarli in un file (per sicurezza, o per spostarli senza sincronizzazione) e importarli altrove. Ultimo backup: <b>' +
      (state.lastBackupAt ? UI.fmtDay(U.dayString(state.lastBackupAt)) : 'mai') + '</b>.</p>' +
      '<div class="row"><button class="btn" data-p="export">Esporta progressi</button><button class="btn secondary" data-p="import">Importa progressi</button></div>' +
      '<p class="small muted">Il backup non contiene la chiave API né il token di sincronizzazione.</p></div>';

    // AI
    var s = state.settings;
    h += '<div class="card stack" style="margin-top:16px"><h2>✨ AI facoltativa (Claude)</h2>' +
      '<p class="muted">Con una chiave API di Anthropic l\'app crea esercizi nuovi sugli argomenti deboli, controlla le risposte scritte non previste e corregge le traduzioni libere frase per frase. Senza chiave tutto funziona lo stesso, offline (la traduzione libera usa testi già pronti e l\'autovalutazione).</p>' +
      '<label class="switch"><input type="checkbox" id="ai-on"' + (s.aiEnabled ? ' checked' : '') + '> Usa l\'AI</label>' +
      '<div class="field"><label for="ai-key">Chiave API</label><input class="text-input" id="ai-key" type="password" autocomplete="off" placeholder="sk-ant-..." value="' + esc(s.apiKey) + '"></div>' +
      '<div class="field"><label for="ai-model">Modello</label><select class="text-input" id="ai-model">' +
      EC.ai.MODELS.map(function (m) { return '<option value="' + m.id + '"' + ((s.aiModel || EC.ai.DEFAULT_MODEL) === m.id ? ' selected' : '') + '>' + esc(m.label) + '</option>'; }).join('') + '</select></div>' +
      '<div class="row"><button class="btn" data-p="ai-save">Salva</button><button class="btn secondary" data-p="ai-test">Prova la chiave</button><span id="ai-status" class="small muted"></span></div>' +
      (EC.ai.lastError ? '<p class="small" style="color:var(--bad)">Ultimo errore AI: ' + esc(EC.ai.lastError.message) + '</p>' : '') +
      '<p class="small muted">La chiave resta salvata solo in questo browser. Consiglio: crea una chiave dedicata con un limite di spesa mensile nella console di Anthropic. Costo indicativo: pochi centesimi per sessione.</p></div>';

    // profilo
    h += '<div class="card stack" style="margin-top:16px"><h2>Profilo</h2>' +
      '<div class="field"><label for="pname">Nome dello studente</label><div class="row"><input class="text-input grow" id="pname" style="max-width:320px" value="' + esc(state.profile.name) + '"><button class="btn secondary" data-p="name">Salva</button></div></div>' +
      '<div class="row" style="margin-top:8px"><button class="btn secondary" data-action="placement-intro">Rifai il test di livello</button><button class="btn danger" data-p="reset">Azzera tutti i progressi</button></div></div>';

    render(h, 'parent');
    bindActions();
    UI.$$('[data-p]').forEach(function (b) {
      b.addEventListener('click', function () { parentAction(b.getAttribute('data-p')); });
    });
  }

  function parentAction(a) {
    if (a === 'export') return exportBackup();
    if (a === 'sync-on') {
      var tok = UI.$('#sync-token').value.trim();
      return activateSync(tok).then(function () { parent(); }, function (e) {
        var el = UI.$('#sync-status');
        if (el) el.innerHTML = '<span style="color:var(--bad);font-weight:700">✗ ' + esc(e.message) + '</span>';
      });
    }
    if (a === 'sync-link') return showLinkModal();
    if (a === 'mail-save' || a === 'mail-test') {
      var em = UI.$('#mail-to').value.trim();
      var on = UI.$('#mail-on').checked;
      if (on && !EC.report.validEmail(em)) { UI.toast('Scrivi un indirizzo email valido.'); return; }
      EC.report.setConfig(state, on, em);
      save();
      syncSoon(1000);
      if (a === 'mail-save') { UI.toast(on ? 'Resoconto via email attivato ✓' : 'Impostazioni salvate'); return parent(); }
      var stEl = UI.$('#mail-status');
      stEl.innerHTML = '<span class="spinner"></span> Invio…';
      return EC.report.sendTest(state).then(function (r) {
        save();
        stEl.innerHTML = r.needsActivation
          ? '<span style="color:var(--warn);font-weight:700">📩 Controlla la casella: FormSubmit ti ha mandato un\'email di attivazione. Clicca "Activate Form" (una volta sola).</span>'
          : '<span style="color:var(--ok);font-weight:700">✓ Email di prova inviata. Se non la vedi, guarda nello spam.</span>';
      }, function (e) {
        save();
        stEl.innerHTML = '<span style="color:var(--bad);font-weight:700">✗ ' + esc(e.message) + '</span>';
      });
    }
    if (a === 'sync-now') {
      return EC.sync.syncNow(state).then(function (res) { adopt(res.state); L._resetCache(); UI.toast('Progressi sincronizzati ✓'); parent(); },
        function (e) { UI.toast(e.message, 4000); parent(); });
    }
    if (a === 'sync-off') {
      return UI.confirm('Disattivare la sincronizzazione?', 'Su questo dispositivo i progressi resteranno salvati ma non verranno più condivisi. Il file su GitHub non viene cancellato.', 'Disattiva').then(function (ok) {
        if (!ok) return;
        EC.sync.disable(state);
        save();
        parent();
      });
    }
    if (a === 'import') {
      return UI.pickFile('.json,application/json').then(function (text) {
        return UI.confirm('Importare il backup?', 'I progressi attuali su questo computer verranno sostituiti da quelli del file.', 'Importa', true).then(function (ok) {
          if (!ok) return;
          adopt(EC.storage.importJson(text));
          L._resetCache();
          syncNow();
          UI.toast('Progressi importati ✓');
          parent();
        });
      }).catch(function (e) { UI.toast(e.message, 4000); });
    }
    if (a === 'name') {
      var v = UI.$('#pname').value.trim();
      if (!v) return;
      state.profile.name = v;
      save();
      UI.toast('Nome salvato ✓');
      return;
    }
    if (a === 'ai-save' || a === 'ai-test') {
      state.settings.apiKey = UI.$('#ai-key').value.trim();
      state.settings.aiModel = UI.$('#ai-model').value;
      state.settings.aiEnabled = UI.$('#ai-on').checked && !!state.settings.apiKey;
      if (UI.$('#ai-on').checked && !state.settings.apiKey) UI.toast('Inserisci una chiave per attivare l\'AI.');
      save();
      if (a === 'ai-save') { UI.toast('Impostazioni AI salvate ✓'); return; }
      var stEl = UI.$('#ai-status');
      if (!state.settings.apiKey) { stEl.textContent = 'Nessuna chiave inserita.'; return; }
      stEl.innerHTML = '<span class="spinner"></span> Provo…';
      var tmp = U.clone(state);
      tmp.settings.aiEnabled = true;
      EC.ai.test(tmp).then(function () {
        stEl.innerHTML = '<span style="color:var(--ok);font-weight:700">✓ La chiave funziona</span>';
      }, function (e) {
        stEl.innerHTML = '<span style="color:var(--bad);font-weight:700">✗ ' + esc(e.message) + '</span>';
      });
      return;
    }
    if (a === 'reset') {
      UI.confirm('Azzerare tutto?', 'Verranno cancellati livello, progressi, statistiche e storico di questo computer. Consiglio: esporta prima un backup.', 'Sì, azzera', true).then(function (ok) {
        if (!ok) return;
        adopt(EC.storage.reset());
        L._resetCache();
        if (EC.sync.enabled(state)) EC.sync.pushReplace(state).then(save, function () {});
        UI.toast('Progressi azzerati');
        home();
      });
    }
  }

  var TOKEN_URL = 'https://github.com/settings/personal-access-tokens/new';
  var PUBLIC_URL = 'https://piuzzo.github.io/english-coach/';

  function isIOS() {
    var ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
  function isStandalone() {
    return window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  }
  // indirizzo da usare nel link: quello online se l'app è aperta come file locale
  function linkBase() {
    return /^https?:$/.test(location.protocol) ? location.origin + location.pathname : PUBLIC_URL;
  }

  /* Apertura di un link di collegamento (#collega=TOKEN) */
  function handleConnectLink(tok) {
    // Su iPad/iPhone in Safari teniamo il link nell'indirizzo: se poi si aggiunge l'app alla schermata Home,
    // l'icona (che ha una memoria separata da Safari) si collegherà da sola al primo avvio.
    var keepHash = isIOS() && !isStandalone();
    if (!keepHash) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignora */ }
    }
    if (EC.sync.enabled(state) && state.settings.sync.token === tok) {
      syncNow().then(function (c) { if (c) rerenderIfIdle(); });
      return;
    }
    var hasLocal = state.sessions.length > 0 || !!state.level;
    var m = UI.modal('<div class="center"><div class="big-emoji">🔗</div><h2 style="margin-top:8px">Collegare questo dispositivo?</h2></div>' +
      '<p class="muted" style="margin-top:10px">Hai aperto un link di collegamento di English Coach. I progressi verranno sincronizzati automaticamente con gli altri dispositivi' +
      (hasLocal ? ' (quelli già presenti qui verranno uniti: non si perde nulla).' : ': nome, livello ed esercizi arriveranno qui.') + '</p>' +
      '<p id="sync-status" class="small muted" style="margin-top:8px"></p>' +
      '<div class="actions"><button class="btn secondary" data-modal="cancel">Annulla</button><button class="btn" id="link-go">Collega</button></div>', { closeOnAction: true });
    UI.$('#link-go', m.el).addEventListener('click', function () {
      var btn = UI.$('#link-go', m.el);
      btn.disabled = true;
      UI.$('#sync-status', m.el).innerHTML = '<span class="spinner"></span> Collegamento…';
      EC.sync.setup(state, tok).then(function (res) {
        adopt(res.state);
        L._resetCache();
        m.close();
        home();
        if (keepHash) {
          UI.modal('<div class="center"><div class="big-emoji">✅</div><h2 style="margin-top:8px">Collegato!</h2></div>' +
            '<p class="muted" style="margin-top:10px">Ultimo passo: tocca <b>Condividi</b> (il quadrato con la freccia) → <b>Aggiungi alla schermata Home</b>. ' +
            'Da quel momento usa l\'icona: la prima volta che la apri ti chiederà di nuovo "Collega", poi non più.</p>' +
            '<div class="actions"><button class="btn" data-modal="close">Ho capito</button></div>');
        } else {
          UI.toast('Dispositivo collegato: progressi sincronizzati ✓', 3500);
        }
      }, function (e) {
        btn.disabled = false;
        UI.$('#sync-status', m.el).innerHTML = '<span style="color:var(--bad);font-weight:700">✗ ' + esc(e.message) + '</span>';
      });
    });
  }

  function qrSvg(text) {
    if (typeof qrcode !== 'function') return '';
    try {
      var q = qrcode(0, 'L');
      q.addData(text);
      q.make();
      return q.createSvgTag({ cellSize: 4, margin: 4, scalable: true, alt: 'Codice QR del link di collegamento' });
    } catch (e) {
      return '';
    }
  }

  function showLinkModal() {
    var link = EC.sync.makeLink(linkBase(), state.settings.sync.token);
    var svg = qrSvg(link);
    var canShare = typeof navigator.share === 'function';
    var m = UI.modal('<h2>🔗 Collega un altro dispositivo</h2>' +
      (svg ? '<div class="qr">' + svg + '</div>' : '') +
      '<ol class="stack small" style="margin:14px 0 0;padding-left:20px">' +
      '<li><b>iPad / iPhone:</b> inquadra il codice con la <b>Fotocamera</b> e tocca il link che compare. In Safari premi <b>Collega</b>, poi <b>Condividi → Aggiungi alla schermata Home</b>.</li>' +
      '<li><b>Mac / PC:</b> manda il link a quel computer (AirDrop, Messaggi, email a te stesso) e aprilo nel browser.</li></ol>' +
      '<div class="row" style="margin-top:14px"><input class="text-input grow" id="link-text" readonly value="' + esc(link) + '" style="font-size:.85rem;min-width:0">' +
      '<button class="btn" id="link-copy">Copia</button>' + (canShare ? '<button class="btn secondary" id="link-share">Condividi</button>' : '') + '</div>' +
      '<p class="small" style="margin-top:12px;color:var(--warn)">⚠️ Il link contiene la chiave di accesso ai progressi: mandalo solo ai tuoi dispositivi e non pubblicarlo.</p>' +
      '<div class="actions"><button class="btn secondary" data-modal="close">Chiudi</button></div>');
    UI.$('#link-copy', m.el).addEventListener('click', function () {
      var inp = UI.$('#link-text', m.el);
      var done = function () { UI.toast('Link copiato ✓'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(done, function () { inp.select(); document.execCommand('copy'); done(); });
      } else { inp.select(); document.execCommand('copy'); done(); }
    });
    var sh = UI.$('#link-share', m.el);
    if (sh) sh.addEventListener('click', function () {
      navigator.share({ title: 'English Coach – collega questo dispositivo', url: link }).catch(function () { /* annullato */ });
    });
  }

  function syncHowTo() {
    return '<ol class="stack small" style="margin:6px 0 0;padding-left:20px">' +
      '<li>Su GitHub apri <a href="' + TOKEN_URL + '" target="_blank" rel="noopener">Settings → Developer settings → Fine-grained tokens → Generate new token</a>.</li>' +
      '<li>Nome: <b>English Coach</b>. Scadenza: 1 anno (o "No expiration").</li>' +
      '<li>In <b>Permissions → Account permissions</b> imposta <b>Gists</b> su <b>Read and write</b>. Nient\'altro: il token non potrà toccare i tuoi repository.</li>' +
      '<li>Premi <b>Generate token</b> e copia il codice (inizia con <code>github_pat_</code>).</li>' +
      '<li>Incollalo qui su <b>ogni dispositivo</b> (Mac, PC, iPad): il primo crea il file dei progressi, gli altri lo ritrovano e uniscono i dati.</li></ol>';
  }

  function syncCardHtml() {
    var c = state.settings.sync || {};
    var h = '<div class="card stack" style="margin-top:16px"><h2>☁️ Sincronizzazione tra dispositivi</h2>';
    if (EC.sync.enabled(state)) {
      var st = EC.sync.status;
      h += '<p><span class="chip ok">Attiva su questo dispositivo</span></p>' +
        '<p class="muted">Ultima sincronizzazione: <b>' + (c.lastSyncAt ? new Date(c.lastSyncAt).toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'short' }) : '—') + '</b>' +
        (st.state === 'error' || st.state === 'offline' ? ' · <span style="color:var(--bad)">' + esc(st.message) + '</span>' : '') + '</p>' +
        '<p class="small muted">I progressi si sincronizzano da soli all\'apertura, prima e dopo ogni sessione e durante gli esercizi. ' +
        (c.gistId ? 'File dei progressi: <a href="https://gist.github.com/' + esc(c.gistId) + '" target="_blank" rel="noopener">Gist su GitHub</a>.' : '') + '</p>' +
        '<div class="row"><button class="btn" data-p="sync-link">🔗 Collega un altro dispositivo</button><button class="btn secondary" data-p="sync-now">Sincronizza ora</button><button class="btn secondary" data-p="sync-off">Disattiva su questo dispositivo</button></div>';
    } else {
      h += '<p class="muted">Collega questo dispositivo al tuo account GitHub: i progressi verranno condivisi in automatico tra Mac, PC e iPad (si uniscono anche le sessioni fatte offline).</p>' +
        syncHowTo() +
        '<div class="field"><label for="sync-token">Token GitHub</label><input class="text-input" id="sync-token" type="password" autocomplete="off" placeholder="github_pat_..."></div>' +
        '<div class="row"><button class="btn" data-p="sync-on">Attiva sincronizzazione</button><span id="sync-status" class="small muted"></span></div>';
    }
    h += '<p class="small"><button class="btn ghost" data-nav="guide" style="padding:4px 0">📖 Guida passo passo alla sincronizzazione</button></p>';
    h += '<p class="small muted">I progressi stanno in un Gist <b>segreto</b> del tuo account: non è elencato pubblicamente, ma chi conosce il link può leggerlo (contiene solo il nome e i risultati degli esercizi). Il token resta solo in questo browser e non finisce nei backup.</p></div>';
    return h;
  }

  function reportCardHtml() {
    var r = state.reports || {};
    var inf = state.settings.mailInfo || {};
    var q = EC.report.queue(state).length;
    var h = '<div class="card stack" style="margin-top:16px"><h2>📧 Resoconto via email</h2>' +
      '<p class="muted">Ogni volta che ' + esc(state.profile.name || 'lo studente') + ' completa una sessione o una traduzione libera ricevi un\'email con risultato, argomenti migliorati, errori fatti e progressi verso il livello successivo.</p>' +
      '<label class="switch"><input type="checkbox" id="mail-on"' + (r.enabled ? ' checked' : '') + '> Invia il resoconto</label>' +
      '<div class="field"><label for="mail-to">Indirizzo email</label><input class="text-input" id="mail-to" type="email" autocomplete="email" placeholder="nome@esempio.it" value="' + esc(r.email || '') + '"></div>' +
      '<div class="row"><button class="btn" data-p="mail-save">Salva</button><button class="btn secondary" data-p="mail-test">Invia email di prova</button><span id="mail-status" class="small muted"></span></div>';
    if (r.enabled) {
      h += '<p class="small muted">' +
        (inf.lastOkAt ? 'Ultimo invio riuscito: ' + new Date(inf.lastOkAt).toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'short' }) + '. ' : '') +
        (q ? '<b>' + q + ' resoconto/i in attesa</b> di invio (riprovo da solo). ' : '') +
        (inf.lastError ? '<span style="color:var(--bad)">Ultimo errore: ' + esc(inf.lastError) + '</span>' : '') + '</p>';
      if (inf.needsActivation) h += '<div class="banner">📩 <div>Al primo invio FormSubmit manda all\'indirizzo un\'email <b>"Activate Form"</b>: aprila e conferma (una volta sola). I resoconti già inviati arriveranno dopo la conferma. Controlla anche lo spam.</div></div>';
    }
    if (location.protocol === 'file:') h += '<p class="small" style="color:var(--warn)">⚠️ Stai usando l\'app aperta come file: le email potrebbero non partire. Funzionano sicuramente dalla versione online.</p>';
    h += '<p class="small muted">Le email sono spedite dal servizio gratuito FormSubmit (formsubmit.co), che riceve nome e risultati della sessione. L\'indirizzo si sincronizza tra i dispositivi collegati e non viene pubblicato.</p></div>';
    return h;
  }

  function activateSync(token) {
    var el = UI.$('#sync-status');
    if (el) el.innerHTML = '<span class="spinner"></span> Collegamento…';
    return EC.sync.setup(state, token).then(function (res) {
      adopt(res.state);
      L._resetCache();
      UI.toast(res.created ? 'Sincronizzazione attivata: file dei progressi creato ✓' : 'Collegato! Progressi uniti con gli altri dispositivi ✓', 3500);
      return res;
    });
  }

  function exportBackup() {
    var name = (state.profile.name || 'studente').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    state.lastBackupAt = U.now();
    save();
    UI.download('english-coach-' + name + '-' + U.today() + '.json', EC.storage.exportJson(state));
    UI.toast('Backup scaricato ✓ (cartella Download)');
    if (ctx.screen === 'home') home();
  }

  /* ================= avvio ================= */
  if (EC.data.problems.length && window.console) console.warn('English Coach:', EC.data.problems);
  // accesso per i test automatici nel browser (nessun effetto sull'uso normale)
  EC._app = { ctx: ctx, getState: function () { return state; } };
  home();
  var linkTok = EC.sync.parseLink(location.hash);
  if (linkTok) handleConnectLink(linkTok);
  else if (EC.sync.enabled(state)) syncNow().then(function (changed) { if (changed) rerenderIfIdle(); });
  window.addEventListener('hashchange', function () {
    var t = EC.sync.parseLink(location.hash);
    if (t) handleConnectLink(t);
  });
  window.addEventListener('online', function () {
    flushReports();
    if (EC.sync.enabled(state)) syncNow().then(function (c) { if (c) rerenderIfIdle(); });
  });
  setTimeout(flushReports, 1500);
})();
