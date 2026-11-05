/* Sincronizzazione dei progressi tra dispositivi tramite un Gist segreto su GitHub.
 *
 * Funzionamento: "scarica → unisci → carica". Ogni dispositivo scarica i progressi salvati nel Gist,
 * li UNISCE con quelli locali (nessuna sessione viene persa, anche se due dispositivi sono stati
 * usati offline) e ricarica il risultato. La chiave dell'AI e il token GitHub non escono mai dal
 * dispositivo.
 *
 * Token: un "fine-grained personal access token" GitHub con il solo permesso "Gists: read and write".
 */
EC.sync = (function () {
  'use strict';
  var U = EC.util;
  var API = 'https://api.github.com';
  var FILE = 'english-coach-progress.json';
  var DESCRIPTION = 'English Coach – progressi (file gestito dall\'app, non modificare)';

  /* ===================== unione di due stati (pura, testabile) ===================== */

  function lvlIdx(l) { return l ? U.levelIndex(l) : -1; }

  function unionBy(a, b, keyFn) {
    var seen = {}, out = [];
    (a || []).concat(b || []).forEach(function (x) {
      var k = keyFn(x);
      if (seen[k]) return;
      seen[k] = true;
      out.push(x);
    });
    return out;
  }

  // Ricalcola la serie di giorni consecutivi dalle date delle sessioni (così è giusta anche unendo dispositivi).
  function streakFrom(sessions) {
    var days = U.uniq(sessions.map(function (s) { return s.date; }).filter(Boolean)).sort();
    if (!days.length) return { last: null, count: 0, best: 0 };
    var best = 1, run = 1;
    for (var i = 1; i < days.length; i++) {
      run = U.daysBetween(days[i - 1], days[i]) === 1 ? run + 1 : 1;
      best = Math.max(best, run);
    }
    return { last: days[days.length - 1], count: run, best: best };
  }

  /**
   * Unisce lo stato remoto in quello locale. Restituisce un NUOVO oggetto stato.
   * Le impostazioni (chiave AI, token, modello) restano sempre quelle locali.
   */
  function merge(local, remote) {
    if (!remote) return U.clone(local);
    var L = U.clone(local), R = U.clone(remote);
    var lr = L.resetAt || 0, rr = R.resetAt || 0;
    // Un azzeramento più recente vince su tutto ciò che non lo ha ancora "visto".
    if (rr > lr) {
      var keep = L.settings;
      R.settings = keep;
      return R;
    }
    if (lr > rr) return L;

    var newer = (R.updatedAt || 0) > (L.updatedAt || 0) ? R : L;
    var out = U.clone(L);
    out.profile = U.clone(newer.profile || L.profile);
    if (!out.profile.name) out.profile.name = (L.profile && L.profile.name) || (R.profile && R.profile.name) || '';
    out.createdAt = Math.min(L.createdAt || Infinity, R.createdAt || Infinity);
    out.updatedAt = Math.max(L.updatedAt || 0, R.updatedAt || 0);
    out.lastBackupAt = Math.max(L.lastBackupAt || 0, R.lastBackupAt || 0) || null;
    out.resetAt = L.resetAt || null;

    // impostazioni del resoconto email: vince la modifica più recente
    var ra = L.reports || { updatedAt: 0 }, rb = R.reports || { updatedAt: 0 };
    out.reports = U.clone((rb.updatedAt || 0) > (ra.updatedAt || 0) ? rb : ra);

    // livello: si sale soltanto (un livello raggiunto su un dispositivo vale per tutti)
    out.level = lvlIdx(R.level) > lvlIdx(L.level) ? R.level : L.level;

    out.levelHistory = unionBy(L.levelHistory, R.levelHistory, function (x) { return x.date + '|' + x.level + '|' + x.reason; })
      .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    out.placements = unionBy(L.placements, R.placements, function (x) { return x.date + '|' + x.workingLevel + '|' + x.correct + '/' + x.total; })
      .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    out.sessions = unionBy(L.sessions, R.sessions, function (x) { return String(x.start); })
      .sort(function (a, b) { return a.start - b.start; });

    // argomenti: vince il dato usato più di recente
    out.topics = {};
    var ids = U.uniq(Object.keys(L.topics || {}).concat(Object.keys(R.topics || {})));
    ids.forEach(function (id) {
      var a = (L.topics || {})[id], b = (R.topics || {})[id];
      if (!a || !b) { out.topics[id] = a || b; return; }
      var la = a.last || 0, lb = b.last || 0;
      if (la !== lb) out.topics[id] = la > lb ? a : b;
      else out.topics[id] = newer === R ? b : a;
    });

    out.items = {};
    U.uniq(Object.keys(L.items || {}).concat(Object.keys(R.items || {}))).forEach(function (id) {
      var a = (L.items || {})[id], b = (R.items || {})[id];
      out.items[id] = !a ? b : !b ? a : ((b.last || 0) > (a.last || 0) ? b : a);
    });

    // sessione in corso: quella aggiornata più di recente, se non è già stata completata
    var done = {};
    out.sessions.forEach(function (s) { done[s.start] = true; });
    var cands = [L.activeSession, R.activeSession].filter(function (x) { return x && !done[x.start]; });
    cands.sort(function (a, b) {
      return (b.answered || 0) - (a.answered || 0) || (a === newer.activeSession ? -1 : 1);
    });
    out.activeSession = cands[0] || null;

    out.streak = streakFrom(out.sessions);
    out.settings = L.settings; // sempre locali
    return out;
  }

  // Lo stato senza segreti (per il Gist e per i backup)
  function publicCopy(state) {
    var c = U.clone(state);
    c.settings = { aiModel: state.settings.aiModel };
    return c;
  }

  // Due stati hanno gli stessi dati? (per evitare caricamenti inutili)
  // JSON con chiavi ordinate: lo stesso contenuto dà sempre la stessa stringa
  function canonical(v) {
    if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']';
    if (v && typeof v === 'object') {
      return '{' + Object.keys(v).sort().filter(function (k) { return v[k] !== undefined; })
        .map(function (k) { return JSON.stringify(k) + ':' + canonical(v[k]); }).join(',') + '}';
    }
    return JSON.stringify(v === undefined ? null : v);
  }

  function sameData(a, b) {
    if (!a || !b) return false;
    var x = publicCopy(a), y = publicCopy(b);
    delete x.updatedAt; delete y.updatedAt;
    return canonical(x) === canonical(y);
  }

  /* ===================== client GitHub ===================== */

  function gh(token, method, path, body) {
    var opts = {
      method: method,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer ' + token,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      cache: 'no-store'
    };
    if (body) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    return fetch(API + path, opts).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) {
          var msg = data && data.message ? data.message : 'errore ' + res.status;
          if (res.status === 401) msg = 'Token GitHub non valido o scaduto.';
          else if (res.status === 403) msg = 'Il token non ha il permesso "Gists: Read and write" (oppure limite di richieste raggiunto).';
          else if (res.status === 404) msg = 'Gist non trovato (cancellato?) o token senza accesso ai Gist.';
          var e = new Error(msg);
          e.status = res.status;
          throw e;
        }
        return data;
      });
    }, function () {
      var e = new Error('Nessuna connessione a internet.');
      e.offline = true;
      throw e;
    });
  }

  function findGist(token) {
    function page(n) {
      return gh(token, 'GET', '/gists?per_page=100&page=' + n).then(function (list) {
        var hit = (list || []).filter(function (g) { return g.files && g.files[FILE]; })
          .sort(function (a, b) { return a.updated_at < b.updated_at ? 1 : -1; })[0];
        if (hit) return hit.id;
        if (list && list.length === 100 && n < 5) return page(n + 1);
        return null;
      });
    }
    return page(1);
  }

  function readGist(token, id) {
    return gh(token, 'GET', '/gists/' + id).then(function (g) {
      var f = g.files && g.files[FILE];
      if (!f) return null;
      var p = f.truncated && f.raw_url
        ? fetch(f.raw_url, { cache: 'no-store' }).then(function (r) { return r.text(); })
        : Promise.resolve(f.content);
      return p.then(function (text) {
        try {
          var obj = JSON.parse(text);
          return obj && obj.app === 'english-coach' && obj.state ? obj.state : null;
        } catch (e) {
          return null;
        }
      });
    });
  }

  function payload(state) {
    return JSON.stringify({ app: 'english-coach', syncedAt: new Date().toISOString(), state: publicCopy(state) });
  }

  function createGist(token, state) {
    var files = {};
    files[FILE] = { content: payload(state) };
    return gh(token, 'POST', '/gists', { description: DESCRIPTION, public: false, files: files }).then(function (g) { return g.id; });
  }

  function writeGist(token, id, state) {
    var files = {};
    files[FILE] = { content: payload(state) };
    return gh(token, 'PATCH', '/gists/' + id, { files: files });
  }

  /* ===================== orchestrazione ===================== */

  var busy = null;
  var listeners = [];
  var status = { state: 'off', message: '' }; // off | syncing | ok | offline | error

  function setStatus(st, msg) {
    status = { state: st, message: msg || '', at: U.now() };
    listeners.forEach(function (fn) { try { fn(status); } catch (e) { /* ignora */ } });
  }

  function cfg(state) {
    var s = state.settings.sync || (state.settings.sync = { enabled: false, token: '', gistId: '', lastSyncAt: null });
    return s;
  }

  function enabled(state) {
    var c = cfg(state);
    return !!(c.enabled && c.token && typeof fetch === 'function');
  }

  /* Attiva la sincronizzazione su questo dispositivo: cerca il Gist esistente o ne crea uno.
   * Restituisce { state, created } dove state è lo stato unito. */
  function setup(state, token) {
    token = String(token || '').trim();
    if (!token) return Promise.reject(new Error('Incolla il token GitHub.'));
    setStatus('syncing', 'Collegamento a GitHub…');
    return findGist(token).then(function (id) {
      if (id) {
        return readGist(token, id).then(function (remote) {
          var merged = merge(state, remote);
          var c = cfg(merged);
          c.enabled = true; c.token = token; c.gistId = id;
          return writeGist(token, id, merged).then(function () {
            c.lastSyncAt = U.now();
            setStatus('ok', 'Sincronizzato');
            return { state: merged, created: false };
          });
        });
      }
      return createGist(token, state).then(function (newId) {
        var c = cfg(state);
        c.enabled = true; c.token = token; c.gistId = newId; c.lastSyncAt = U.now();
        setStatus('ok', 'Sincronizzato');
        return { state: state, created: true };
      });
    }).catch(function (e) {
      setStatus(e.offline ? 'offline' : 'error', e.message);
      throw e;
    });
  }

  /* Scarica, unisce e ricarica. Restituisce una Promise con { state, changed }.
   * Se c'è già una sincronizzazione in corso, aspetta quella. */
  function syncNow(state) {
    if (!enabled(state)) return Promise.resolve({ state: state, changed: false });
    if (busy) return busy;
    var c = cfg(state);
    setStatus('syncing', 'Sincronizzazione…');
    busy = (c.gistId ? Promise.resolve(c.gistId) : findGist(c.token)).then(function (id) {
      if (!id) {
        return createGist(c.token, state).then(function (newId) {
          c.gistId = newId;
          return { state: state, changed: false };
        });
      }
      c.gistId = id;
      return readGist(c.token, id).then(function (remote) {
        var merged = merge(state, remote);
        var changedLocal = !sameData(merged, state);
        var needPush = !remote || !sameData(merged, remote);
        var p = needPush ? writeGist(c.token, id, merged) : Promise.resolve();
        return p.then(function () { return { state: merged, changed: changedLocal }; });
      }).catch(function (e) {
        if (e.status === 404) { // Gist cancellato: lo ricreo
          return createGist(c.token, state).then(function (newId) {
            c.gistId = newId;
            return { state: state, changed: false };
          });
        }
        throw e;
      });
    }).then(function (res) {
      cfg(res.state).lastSyncAt = U.now();
      cfg(res.state).gistId = c.gistId;
      setStatus('ok', 'Sincronizzato');
      busy = null;
      return res;
    }, function (e) {
      busy = null;
      setStatus(e.offline ? 'offline' : 'error', e.message);
      throw e;
    });
    return busy;
  }

  /* Sovrascrive il Gist con lo stato locale (dopo un azzeramento). */
  function pushReplace(state) {
    if (!enabled(state)) return Promise.resolve();
    var c = cfg(state);
    setStatus('syncing', 'Sincronizzazione…');
    return (c.gistId ? writeGist(c.token, c.gistId, state) : createGist(c.token, state).then(function (id) { c.gistId = id; }))
      .then(function () { c.lastSyncAt = U.now(); setStatus('ok', 'Sincronizzato'); },
        function (e) { setStatus(e.offline ? 'offline' : 'error', e.message); throw e; });
  }

  function disable(state) {
    var c = cfg(state);
    c.enabled = false;
    c.token = '';
    setStatus('off', '');
  }

  function onStatus(fn) { listeners.push(fn); }

  /* ---------- link di collegamento ----------
   * Il token viaggia nel "frammento" dell'indirizzo (#collega=…), che il browser non invia mai al server. */
  function makeLink(base, token) {
    return String(base).split('#')[0] + '#collega=' + encodeURIComponent(token);
  }
  function parseLink(hash) {
    var m = String(hash || '').match(/[#&]collega=([^&]+)/);
    if (!m) return null;
    var t;
    try { t = decodeURIComponent(m[1]).trim(); } catch (e) { return null; }
    return /^[A-Za-z0-9_]{20,255}$/.test(t) ? t : null; // formato dei token GitHub
  }

  return {
    FILE: FILE,
    merge: merge,
    streakFrom: streakFrom,
    publicCopy: publicCopy,
    sameData: sameData,
    enabled: enabled,
    setup: setup,
    syncNow: syncNow,
    pushReplace: pushReplace,
    disable: disable,
    onStatus: onStatus,
    makeLink: makeLink,
    parseLink: parseLink,
    get status() { return status; },
    _gh: { findGist: findGist, readGist: readGist, createGist: createGist, writeGist: writeGist }
  };
})();
