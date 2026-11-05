/* Piccoli componenti grafici riutilizzabili (solo browser). */
EC.ui = (function () {
  'use strict';
  var esc = EC.util.escapeHtml;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function ring(value, target, label) {
    var r = 26, c = 2 * Math.PI * r;
    var frac = Math.max(0, Math.min(1, value / target));
    return '<div class="ring" id="ring" role="img" aria-label="' + value + ' risposte corrette su ' + target + '">' +
      '<svg width="64" height="64" viewBox="0 0 64 64"><circle class="ring-bg" cx="32" cy="32" r="' + r + '" fill="none" stroke-width="7"/>' +
      '<circle class="ring-fg" cx="32" cy="32" r="' + r + '" fill="none" stroke-width="7" stroke-dasharray="' + c.toFixed(1) +
      '" stroke-dashoffset="' + (c * (1 - frac)).toFixed(1) + '"/></svg>' +
      '<div class="ring-label"><span>' + value + '<small>/' + target + '</small></span></div></div>' +
      (label ? '<span class="sr-only">' + esc(label) + '</span>' : '');
  }

  function updateRing(value, target) {
    var el = $('#ring');
    if (!el) return;
    var fg = $('.ring-fg', el);
    var c = 2 * Math.PI * 26;
    fg.setAttribute('stroke-dashoffset', (c * (1 - Math.min(1, value / target))).toFixed(1));
    $('.ring-label span', el).innerHTML = value + '<small>/' + target + '</small>';
    el.setAttribute('aria-label', value + ' risposte corrette su ' + target);
    el.classList.remove('pulse');
    void el.offsetWidth;
    el.classList.add('pulse');
  }

  function bar(frac, cls) {
    var pct = Math.round(Math.max(0, Math.min(1, frac)) * 100);
    return '<div class="bar ' + (cls || '') + '" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + pct + '%"></span></div>';
  }

  function levelBadge(level, lg) {
    return '<span class="level-badge' + (lg ? ' lg' : '') + '" data-level="' + esc(level) + '">' + esc(level) + '</span>';
  }

  var toastTimer = null;
  function toast(msg, ms) {
    var old = $('.toast');
    if (old) old.remove();
    var el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = msg;
    document.body.appendChild(el);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.remove(); }, ms || 2600);
  }

  function confetti(n) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var colors = ['#5b4fe9', '#ff7a59', '#12a36b', '#1f8fe5', '#f5b301', '#e0569b'];
    for (var i = 0; i < (n || 90); i++) {
      var d = document.createElement('div');
      d.className = 'confetti';
      d.style.left = Math.random() * 100 + 'vw';
      d.style.background = colors[i % colors.length];
      d.style.animationDuration = 2.2 + Math.random() * 2 + 's';
      d.style.animationDelay = Math.random() * 0.6 + 's';
      d.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      document.body.appendChild(d);
      (function (el) { setTimeout(function () { el.remove(); }, 5200); })(d);
    }
  }

  function modal(html, opts) {
    opts = opts || {};
    var back = document.createElement('div');
    back.className = 'modal-backdrop';
    back.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + html + '</div>';
    document.body.appendChild(back);
    var prevFocus = document.activeElement;
    function close() {
      back.remove();
      document.removeEventListener('keydown', onKey, true);
      if (prevFocus && prevFocus.focus) prevFocus.focus();
      if (opts.onClose) opts.onClose();
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); }
    }
    document.addEventListener('keydown', onKey, true);
    back.addEventListener('click', function (e) {
      if (e.target === back) close();
      var b = e.target.closest('[data-modal]');
      if (b) {
        var v = b.getAttribute('data-modal');
        if (opts.onAction) opts.onAction(v, back);
        if (v === 'close' || v === 'cancel' || opts.closeOnAction !== false) close();
      }
    });
    var f = back.querySelector('input, button.btn:not(.secondary), button');
    if (f) f.focus();
    return { el: back, close: close };
  }

  function confirmBox(title, text, okLabel, danger) {
    return new Promise(function (resolve) {
      var done = false;
      modal('<h2>' + esc(title) + '</h2><p class="muted" style="margin-top:10px">' + esc(text) + '</p>' +
        '<div class="actions"><button class="btn secondary" data-modal="cancel">Annulla</button>' +
        '<button class="btn' + (danger ? ' danger' : '') + '" data-modal="ok">' + esc(okLabel || 'OK') + '</button></div>', {
        onAction: function (v) { done = true; resolve(v === 'ok'); },
        onClose: function () { if (!done) resolve(false); }
      });
    });
  }

  function ruleHtml(topic) {
    if (!topic) return '';
    var h = '<p>' + esc(topic.rule) + '</p>';
    if (topic.examples && topic.examples.length) {
      h += '<ul class="examples">' + topic.examples.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    }
    if (topic.it) h += '<div class="it-note"><b>🇮🇹 Attenzione, italiano:</b> ' + esc(topic.it) + '</div>';
    return h;
  }

  function fmtDay(day) {
    if (!day) return '—';
    var p = day.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    try {
      return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return day;
    }
  }

  function download(filename, text) {
    var blob = new Blob([text], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 500);
  }

  function pickFile(accept) {
    return new Promise(function (resolve, reject) {
      var inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = accept || '';
      inp.addEventListener('change', function () {
        var f = inp.files && inp.files[0];
        if (!f) return reject(new Error('Nessun file scelto.'));
        var r = new FileReader();
        r.onload = function () { resolve(String(r.result)); };
        r.onerror = function () { reject(new Error('Impossibile leggere il file.')); };
        r.readAsText(f);
      });
      inp.click();
    });
  }

  return {
    $: $, $$: $$, esc: esc, ring: ring, updateRing: updateRing, bar: bar, levelBadge: levelBadge,
    toast: toast, confetti: confetti, modal: modal, confirm: confirmBox, ruleHtml: ruleHtml,
    fmtDay: fmtDay, download: download, pickFile: pickFile
  };
})();
