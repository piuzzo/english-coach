/* AI facoltativa (Claude API), chiamata direttamente dal browser con la chiave del genitore.
 * Due usi:
 *  1. generateItems: all'inizio della sessione crea esercizi nuovi sugli argomenti deboli
 *  2. judge: se una risposta scritta non corrisponde a nessuna variante prevista, chiede se è
 *     comunque accettabile e, se è sbagliata, una spiegazione su misura
 * Se manca la chiave, la rete o la chiamata fallisce, l'app usa solo la banca offline.
 * Niente SDK: la pagina si apre come file locale (file://) senza strumenti di build,
 * quindi la richiesta HTTP è scritta a mano.
 */
EC.ai = (function () {
  'use strict';
  var U = EC.util;
  var ENDPOINT = 'https://api.anthropic.com/v1/messages';
  var API_VERSION = '2026-10-21';
  var MODELS = [
    { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 — qualità massima (consigliato)' },
    { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 — più economico' },
    { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5 — il più economico' }
  ];
  var DEFAULT_MODEL = 'claude-opus-5-5';
  var lastError = null;

  function model(state) {
    var m = state.settings.aiModel;
    return MODELS.some(function (x) { return x.id === m; }) ? m : DEFAULT_MODEL;
  }

  function enabled(state) {
    return !!(state && state.settings.aiEnabled && state.settings.apiKey && typeof fetch === 'function');
  }

  function call(state, req) {
    var m = model(state);
    var body = {
      model: m,
      max_tokens: req.maxTokens || 16000,
      system: req.system,
      messages: [{ role: 'user', content: req.user }],
      output_config: { effort: req.effort || 'medium', format: { type: 'json_schema', schema: req.schema } }
    };
    var headers = {
      'content-type': 'application/json',
      'x-api-key': state.settings.apiKey,
      'anthropic-version': API_VERSION,
      'anthropic-dangerous-direct-browser-access': 'true'
    };
    // Se un filtro di sicurezza rifiuta la richiesta, l'API la ripete da sola su un modello di riserva.
    if (m !== 'claude-haiku-5-5') {
      body.fallbacks = 'default';
      headers['anthropic-beta'] = 'server-side-fallback-2026-07-01';
    }

    function send(b, h) {
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, req.timeoutMs || 90000) : null;
      return fetch(ENDPOINT, { method: 'POST', headers: h, body: JSON.stringify(b), signal: ctrl ? ctrl.signal : undefined })
        .then(function (res) {
          if (timer) clearTimeout(timer);
          return res.json().catch(function () { return {}; }).then(function (data) { return { res: res, data: data }; });
        }, function (err) {
          if (timer) clearTimeout(timer);
          throw new Error(err && err.name === 'AbortError' ? 'Tempo scaduto: l\'AI non ha risposto in tempo.' : 'Connessione non riuscita (sei offline?).');
        });
    }

    return send(body, headers).then(function (r) {
      // Se l'opzione di riserva non è accettata, riprova una volta senza.
      if (r.res.status === 400 && body.fallbacks) {
        var b2 = U.clone(body);
        delete b2.fallbacks;
        var h2 = Object.assign({}, headers);
        delete h2['anthropic-beta'];
        return send(b2, h2);
      }
      return r;
    }).then(function (r) {
      var res = r.res, data = r.data;
      if (!res.ok) {
        var msg = (data && data.error && data.error.message) || ('errore HTTP ' + res.status);
        if (res.status === 401) msg = 'Chiave API non valida.';
        else if (res.status === 429) msg = 'Troppe richieste o credito esaurito: riprova più tardi.';
        else if (res.status >= 500) msg = 'Il servizio AI è temporaneamente non disponibile.';
        var e = new Error(msg);
        e.status = res.status;
        throw e;
      }
      if (data.stop_reason === 'refusal') throw new Error('L\'AI ha rifiutato la richiesta.');
      if (data.stop_reason === 'max_tokens') throw new Error('Risposta dell\'AI troppo lunga e incompleta.');
      var text = (data.content || []).filter(function (b) { return b.type === 'text'; }).map(function (b) { return b.text; }).join('');
      try {
        return JSON.parse(text);
      } catch (err) {
        throw new Error('Risposta dell\'AI non leggibile.');
      }
    }).then(function (out) {
      lastError = null;
      return out;
    }, function (err) {
      lastError = { message: err.message, at: U.now() };
      throw err;
    });
  }

  /* ---------- 1. generazione di esercizi ---------- */
  var ITEM_SCHEMA = {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            topic: { type: 'string' },
            difficulty: { type: 'integer' },
            type: { type: 'string', enum: ['mc', 'gap', 'transform', 'translate', 'error'] },
            instruction: { type: 'string' },
            prompt: { type: 'string' },
            options: { type: 'array', items: { type: 'string' } },
            answers: { type: 'array', items: { type: 'string' } },
            explanation: { type: 'string' },
            notes: {
              type: 'array',
              items: {
                type: 'object',
                properties: { wrong: { type: 'string' }, why: { type: 'string' } },
                required: ['wrong', 'why'],
                additionalProperties: false
              }
            },
            group: { type: 'string' }
          },
          required: ['topic', 'difficulty', 'type', 'instruction', 'prompt', 'options', 'answers', 'explanation', 'notes', 'group'],
          additionalProperties: false
        }
      }
    },
    required: ['items'],
    additionalProperties: false
  };

  var GEN_SYSTEM = [
    'Sei un insegnante di inglese esperto che prepara esercizi per un ragazzo italiano di 14-15 anni (prima superiore).',
    'Scrivi in inglese britannico naturale; contesti adatti all\'età (scuola, amici, sport, musica, videogiochi, viaggi).',
    'Ogni esercizio deve avere UNA sola risposta corretta senza ambiguità. Le spiegazioni e le note sono in italiano semplice e incoraggiante, e spiegano PERCHÉ, citando la regola e, se utile, il confronto con l\'italiano.',
    'Tipi: "mc" = scelta multipla (3-4 opzioni in "options", la risposta giusta identica a una delle opzioni, una nota per ogni opzione sbagliata);',
    '"gap" = frase con esattamente un "___" da completare (puoi indicare la parola base tra parentesi), "options" vuoto;',
    '"transform" = frase da trasformare, con la consegna in italiano in "instruction" (es. "Volgi alla forma negativa.");',
    '"translate" = frase italiana breve da tradurre, elenca in "answers" tutte le traduzioni corrette ragionevoli;',
    '"error" = frase con UN solo errore da correggere, in "answers" la frase corretta.',
    'Per "gap", "transform", "translate" ed "error" metti in "notes" le risposte sbagliate più probabili con la spiegazione.',
    '"instruction" vuoto se non serve. Difficoltà: 1 = riconoscere (mc), 2 = produrre con guida (gap con aiuto, transform semplici), 3 = produrre in autonomia (error, translate, frasi più lunghe).'
  ].join('\n');

  function topicBrief(t, tier) {
    return '- topic "' + t.id + '" (' + t.title + ', livello ' + t.level + '), difficoltà richiesta ' + tier +
      '\n  Regola: ' + t.rule + (t.it ? '\n  Errori tipici degli italiani: ' + t.it : '');
  }

  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36);
  }

  function sanitize(raw, allowedTopics) {
    var M = EC.matcher;
    var out = [];
    (raw && raw.items || []).forEach(function (r) {
      try {
        if (!r || allowedTopics.indexOf(r.topic) === -1) return;
        if (['mc', 'gap', 'transform', 'translate', 'error'].indexOf(r.type) === -1) return;
        var answers = (r.answers || []).filter(function (a) { return typeof a === 'string' && a.trim(); });
        if (!answers.length || !r.prompt || !r.explanation) return;
        var it = {
          topic: r.topic,
          difficulty: Math.min(3, Math.max(1, parseInt(r.difficulty, 10) || 1)),
          type: r.type,
          prompt: String(r.prompt),
          answers: answers,
          explanation: String(r.explanation),
          notes: {},
          group: 'ai_' + (r.group || r.topic),
          ai: true
        };
        if (r.instruction) it.instruction = String(r.instruction);
        (r.notes || []).forEach(function (n) {
          if (n && n.wrong && n.why && !M.isMatch(n.wrong, answers)) it.notes[n.wrong] = n.why;
        });
        if (it.type === 'mc') {
          var opts = U.uniq((r.options || []).map(String));
          if (opts.length < 2 || opts.length > 5 || answers.length !== 1 || opts.indexOf(answers[0]) === -1) return;
          it.options = opts;
          opts.forEach(function (o) {
            if (o !== answers[0] && !it.notes[o]) it.notes[o] = 'Questa opzione non è corretta in questo contesto. ' + it.explanation;
          });
        }
        if (it.type === 'gap' && (it.prompt.match(/___/g) || []).length !== 1) return;
        if (it.type === 'error' && M.isMatch(it.prompt, answers)) return;
        if (it.type === 'transform' && !it.instruction) it.instruction = 'Trasforma la frase.';
        it.id = 'ai_' + hash(it.type + '|' + it.prompt + '|' + answers[0]);
        out.push(it);
      } catch (e) { /* esercizio scartato */ }
    });
    return out;
  }

  function generateItems(state, topics, count) {
    if (!enabled(state) || !topics.length) return Promise.resolve([]);
    count = count || 8;
    var briefs = topics.map(function (t) {
      return topicBrief(t, EC.learner.tierForBox(EC.learner.topicState(state, t.id).box));
    }).join('\n');
    var user = 'Crea ' + count + ' esercizi NUOVI e vari, distribuiti su questi argomenti (usa esattamente questi id in "topic"):\n' +
      briefs + '\nMescola i tipi di esercizio. Ogni esercizio deve avere la difficoltà richiesta per il suo argomento.';
    return call(state, { system: GEN_SYSTEM, user: user, schema: ITEM_SCHEMA, effort: 'medium', timeoutMs: 120000 })
      .then(function (raw) { return sanitize(raw, topics.map(function (t) { return t.id; })); });
  }

  /* ---------- 2. verifica di una risposta scritta ---------- */
  var JUDGE_SCHEMA = {
    type: 'object',
    properties: {
      acceptable: { type: 'boolean' },
      explanation: { type: 'string' }
    },
    required: ['acceptable', 'explanation'],
    additionalProperties: false
  };

  function judge(state, item, given) {
    if (!enabled(state)) return Promise.resolve(null);
    var topic = EC.data.topicById[item.topic];
    var user = [
      'Esercizio (' + item.type + ', argomento: ' + (topic ? topic.title : item.topic) + ').',
      item.instruction ? 'Consegna: ' + item.instruction : '',
      'Testo: ' + item.prompt,
      'Risposte corrette previste: ' + item.answers.join(' | '),
      'Risposta dello studente: ' + given,
      '',
      'La risposta dello studente è corretta e accettabile per QUESTO esercizio? Deve rispettare la regola che l\'esercizio allena (non basta che sia inglese corretto se evita la struttura richiesta); ignora maiuscole, punteggiatura e contrazioni.',
      'Se NON è accettabile, in "explanation" spiega in italiano semplice (2-3 frasi, tono incoraggiante) qual è l\'errore e perché, citando la regola. Se è accettabile, "explanation" conferma brevemente perché va bene.'
    ].filter(Boolean).join('\n');
    return call(state, {
      system: 'Sei un insegnante di inglese preciso e gentile che corregge gli esercizi di un ragazzo italiano di 14 anni.',
      user: user, schema: JUDGE_SCHEMA, effort: 'low', maxTokens: 4000, timeoutMs: 30000
    }).then(function (r) {
      if (!r || typeof r.acceptable !== 'boolean') return null;
      return { acceptable: r.acceptable, explanation: String(r.explanation || '') };
    });
  }

  /* ---------- prova della chiave (Area genitore) ---------- */
  function test(state) {
    return call(state, {
      system: 'Rispondi solo con il JSON richiesto.',
      user: 'Rispondi con ok = true.',
      schema: { type: 'object', properties: { ok: { type: 'boolean' } }, required: ['ok'], additionalProperties: false },
      effort: 'low', maxTokens: 2000, timeoutMs: 30000
    });
  }

  return {
    MODELS: MODELS,
    DEFAULT_MODEL: DEFAULT_MODEL,
    enabled: enabled,
    generateItems: generateItems,
    judge: judge,
    test: test,
    sanitize: sanitize,
    get lastError() { return lastError; }
  };
})();
