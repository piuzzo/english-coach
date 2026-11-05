/* English Coach — schermate e navigazione. */
(function () {
  'use strict';
  if (typeof document === 'undefined') return;

  var U = EC.util, UI = EC.ui, L = EC.learner, M = EC.matcher;
  var esc = U.escapeHtml;
  var state = EC.storage.load();
  var app = document.getElementById('app');
  var ctx = { screen: 'home', session: null, placement: null, keys: null, aiChip: null };

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
  var syncTimer = null;
  function syncSoon(ms) {
    if (!EC.sync.enabled(state)) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () { syncNow(); }, ms || 15000);
  }
  function rerenderIfIdle() {
    if (ctx.session || ctx.placement) return;
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
    var nav = [['home', 'Home'], ['progress', 'Progressi'], ['parent', 'Genitori']];
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
      var st = L.levelUpStatus(state);
      h += '<button class="card tile" data-nav="progress"><span class="tile-icon">🗺️</span><h3>I miei progressi</h3>' +
        '<p class="muted small">' + st.acquired + ' argomenti su ' + st.total + ' acquisiti nel livello ' + esc(st.level) + '</p>' +
        UI.bar(st.total ? st.acquired / st.total : 0, 'ok') + '</button>';
    }
    var lastP = state.placements[state.placements.length - 1];
    h += '<button class="card tile" data-action="placement-intro"><span class="tile-icon">🎯</span><h3>' + (lastP ? 'Rifai il test di livello' : 'Test di livello') + '</h3>' +
      '<p class="muted small">' + (lastP ? 'Ultimo test: ' + UI.fmtDay(lastP.date) + '. Utile una volta al mese.' : 'Circa 20–25 domande, senza aiuti.') + '</p></button>';
    h += '<button class="card tile" data-nav="parent"><span class="tile-icon">👨‍👩‍👦</span><h3>Area genitore</h3><p class="muted small">Statistiche, errori frequenti, backup, AI facoltativa.</p></button>';
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
      '<button class="btn ghost block" id="link-device">☁️ Hai già usato English Coach su un altro dispositivo? Collegalo</button></div>';
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

  function submitAnswer(item, given, ctrl) {
    var s = ctx.session;
    var pre = EC.session.evaluate(item, given);
    var typed = item.type !== 'mc' && item.type !== 'order';
    if (!pre.correct && typed && EC.ai.enabled(state) && !pre.note && given) {
      UI.$('#fb').innerHTML = '<div class="feedback ok" style="background:var(--surface-2);border-color:var(--border)"><div class="row"><span class="spinner"></span> Controllo la tua risposta…</div></div>';
      EC.ai.judge(state, item, given).then(function (j) {
        finalize(j ? { forceCorrect: j.acceptable, aiNote: j.acceptable ? '' : j.explanation } : {});
      }, function () { finalize({}); });
    } else {
      finalize({});
    }
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

  function showFeedback(item, given, ev) {
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
      h += '<div class="actions"><span class="hint">Tra poco ti propongo un esercizio simile</span><button class="btn" data-fb="next"' + (typed ? ' disabled' : '') + '>Ho capito, avanti →</button></div></div>';
    }
    fb.innerHTML = h;
    var nextBtn = UI.$('[data-fb="next"]', fb);
    nextBtn.addEventListener('click', function () {
      if (ev.done) finishSession(); else showExercise();
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
    save();
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

    // backup
    h += '<div class="card stack" style="margin-top:16px"><h2>💾 Backup manuale</h2>' +
      '<p class="muted">I progressi sono salvati in questo browser. Puoi anche esportarli in un file (per sicurezza, o per spostarli senza sincronizzazione) e importarli altrove. Ultimo backup: <b>' +
      (state.lastBackupAt ? UI.fmtDay(U.dayString(state.lastBackupAt)) : 'mai') + '</b>.</p>' +
      '<div class="row"><button class="btn" data-p="export">Esporta progressi</button><button class="btn secondary" data-p="import">Importa progressi</button></div>' +
      '<p class="small muted">Il backup non contiene la chiave API né il token di sincronizzazione.</p></div>';

    // AI
    var s = state.settings;
    h += '<div class="card stack" style="margin-top:16px"><h2>✨ AI facoltativa (Claude)</h2>' +
      '<p class="muted">Con una chiave API di Anthropic l\'app crea esercizi nuovi sugli argomenti deboli e controlla le risposte scritte non previste. Senza chiave tutto funziona lo stesso, offline.</p>' +
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
        '<div class="row"><button class="btn" data-p="sync-now">Sincronizza ora</button><button class="btn secondary" data-p="sync-off">Disattiva su questo dispositivo</button></div>';
    } else {
      h += '<p class="muted">Collega questo dispositivo al tuo account GitHub: i progressi verranno condivisi in automatico tra Mac, PC e iPad (si uniscono anche le sessioni fatte offline).</p>' +
        syncHowTo() +
        '<div class="field"><label for="sync-token">Token GitHub</label><input class="text-input" id="sync-token" type="password" autocomplete="off" placeholder="github_pat_..."></div>' +
        '<div class="row"><button class="btn" data-p="sync-on">Attiva sincronizzazione</button><span id="sync-status" class="small muted"></span></div>';
    }
    h += '<p class="small muted">I progressi stanno in un Gist <b>segreto</b> del tuo account: non è elencato pubblicamente, ma chi conosce il link può leggerlo (contiene solo il nome e i risultati degli esercizi). Il token resta solo in questo browser e non finisce nei backup.</p></div>';
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
  if (EC.sync.enabled(state)) syncNow().then(function (changed) { if (changed) rerenderIfIdle(); });
  window.addEventListener('online', function () { if (EC.sync.enabled(state)) syncNow().then(function (c) { if (c) rerenderIfIdle(); }); });
})();
