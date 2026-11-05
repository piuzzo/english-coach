/* Carica in Node gli stessi script del browser, nell'ordine di index.html.
 * Uso: const EC = require('./load').load({ only: [...], skipUi: true })
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

function scriptList() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const re = /<script\s+src="([^"]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

/**
 * opts.only: lista di file (relativi alla radice) da caricare oltre a core/topics/matcher
 * opts.skipUi: non caricare ui.js/app.js (default true)
 */
function load(opts) {
  opts = opts || {};
  const skipUi = opts.skipUi !== false;
  globalThis.EC = undefined; // "var EC" non si può cancellare: lo azzero
  const ctx = globalThis;
  const files = scriptList().filter((f) => {
    if (skipUi && /js\/(ui|app)\.js$/.test(f)) return false;
    if (opts.only) {
      const base = ['js/core.js', 'data/topics.js', 'js/matcher.js'];
      return base.includes(f) || opts.only.includes(f);
    }
    return true;
  });
  const loaded = [];
  for (const f of files) {
    const full = path.join(ROOT, f);
    if (!fs.existsSync(full)) continue;
    const code = fs.readFileSync(full, 'utf8');
    vm.runInThisContext(code, { filename: full });
    loaded.push(f);
  }
  ctx.EC._loadedFiles = loaded;
  return ctx.EC;
}

module.exports = { load, scriptList, ROOT };
