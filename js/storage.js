/* Salvataggio dei progressi nel browser (localStorage) + backup su file JSON.
 * Se localStorage non è disponibile (finestra privata, blocchi) i dati restano in memoria
 * finché la pagina è aperta, e l'interfaccia avvisa di esportare il backup.
 */
EC.storage = (function () {
  'use strict';
  var KEY = 'englishCoach.v1';
  var SCHEMA = 1;
  var memory = null;
  var available = null;

  function ls() {
    try {
      if (typeof localStorage === 'undefined') return null;
      return localStorage;
    } catch (e) {
      return null;
    }
  }

  function isAvailable() {
    if (available !== null) return available;
    var s = ls();
    try {
      if (!s) throw new Error('no storage');
      s.setItem(KEY + '.test', '1');
      s.removeItem(KEY + '.test');
      available = true;
    } catch (e) {
      available = false;
    }
    return available;
  }

  function defaultState() {
    var now = EC.util.now();
    return {
      schema: SCHEMA,
      createdAt: now,
      updatedAt: now,
      profile: { name: '' },
      settings: { apiKey: '', aiEnabled: false, aiModel: 'claude-opus-5-5' },
      level: null, // livello di lavoro (null = test iniziale non ancora fatto)
      levelHistory: [], // { level, date, reason }
      placements: [], // risultati dei test iniziali
      topics: {}, // id → { box, due, seen, correct, wrong, last }
      items: {}, // id → { n, last, wrong }
      sessions: [], // riepiloghi delle sessioni concluse
      activeSession: null, // sessione in corso (per riprenderla se si chiude la pagina)
      streak: { last: null, count: 0, best: 0 },
      lastBackupAt: null
    };
  }

  function migrate(st) {
    var d = defaultState();
    Object.keys(d).forEach(function (k) {
      if (st[k] === undefined) st[k] = d[k];
    });
    st.settings = Object.assign({}, d.settings, st.settings || {});
    st.profile = Object.assign({}, d.profile, st.profile || {});
    st.streak = Object.assign({}, d.streak, st.streak || {});
    st.schema = SCHEMA;
    return st;
  }

  function load() {
    if (memory) return memory;
    var st = null;
    if (isAvailable()) {
      try {
        var raw = ls().getItem(KEY);
        if (raw) st = JSON.parse(raw);
      } catch (e) {
        st = null;
      }
    }
    memory = migrate(st || defaultState());
    return memory;
  }

  function prune(st) {
    // Evita che la memoria cresca all'infinito con gli esercizi generati.
    var ids = Object.keys(st.items);
    if (ids.length > 4000) {
      ids.sort(function (a, b) { return (st.items[a].last || 0) - (st.items[b].last || 0); });
      ids.slice(0, ids.length - 3000).forEach(function (id) { delete st.items[id]; });
    }
    if (st.sessions.length > 400) st.sessions = st.sessions.slice(-400);
  }

  function save(st) {
    st = st || memory;
    memory = st;
    st.updatedAt = EC.util.now();
    prune(st);
    if (!isAvailable()) return false;
    try {
      ls().setItem(KEY, JSON.stringify(st));
      return true;
    } catch (e) {
      return false;
    }
  }

  function exportJson(st) {
    st = st || load();
    var copy = EC.util.clone(st);
    copy.settings.apiKey = ''; // la chiave API non finisce mai nel backup
    return JSON.stringify({ app: 'english-coach', exportedAt: new Date().toISOString(), state: copy }, null, 2);
  }

  function importJson(text) {
    var obj;
    try {
      obj = JSON.parse(text);
    } catch (e) {
      throw new Error('Il file non è un backup valido (JSON non leggibile).');
    }
    var st = obj && obj.app === 'english-coach' ? obj.state : null;
    if (!st || typeof st !== 'object' || !st.topics || !Array.isArray(st.sessions)) {
      throw new Error('Il file non sembra un backup di English Coach.');
    }
    var current = load();
    st = migrate(st);
    // la chiave API resta quella di questo computer
    st.settings.apiKey = current.settings.apiKey;
    st.settings.aiEnabled = current.settings.aiEnabled && !!current.settings.apiKey;
    memory = st;
    save(st);
    return st;
  }

  function reset() {
    var keepKey = memory ? memory.settings.apiKey : '';
    memory = defaultState();
    memory.settings.apiKey = keepKey;
    save(memory);
    return memory;
  }

  // Solo per i test: stato nuovo senza toccare localStorage.
  function _setMemory(st) {
    memory = st ? migrate(st) : null;
  }

  return {
    load: load,
    save: save,
    exportJson: exportJson,
    importJson: importJson,
    reset: reset,
    isAvailable: isAvailable,
    defaultState: defaultState,
    _setMemory: _setMemory
  };
})();
