/* Test iniziale adattivo (ispirato all'Oxford Online Placement Test).
 *  1. blocchi da 7 domande, un argomento diverso per domanda; si parte da A2
 *  2. blocco superato (≥ 5/7) → si sale di livello, altrimenti si scende
 *  3. fase "diagnostica": fino a 8 domande sugli argomenti del livello di lavoro non ancora provati
 * Durante il test non si mostrano spiegazioni: è una misura, non un esercizio.
 */
EC.placement = (function () {
  'use strict';
  var U = EC.util;
  var BLOCK = 7;
  var PASS = 5;
  var DIAGNOSTIC = 8;
  var START = 'A2';

  function eligible(topicId, used) {
    return EC.data.items.filter(function (i) {
      return i.topic === topicId && !i.passage && i.difficulty <= 2 && (i.type === 'mc' || i.type === 'gap') && !used[i.id];
    });
  }

  function topicsFor(level) {
    return EC.data.topics.filter(function (t) { return t.level === level && t.area !== 'reading'; });
  }

  function create(opts) {
    opts = opts || {};
    var rng = opts.rng || U.rng;
    var used = {};
    var testedTopics = {};
    var answers = [];
    var queue = [];
    var phase = 'adaptive';
    var blockLevel = START;
    var blockResult = { correct: 0, total: 0 };
    var visited = {}; // livello → true/false (superato)
    var finished = false;
    var workingLevel = null;
    var estimated = null;

    function pickItem(topicId, preferDiff) {
      var c = eligible(topicId, used);
      if (!c.length) return null;
      var pref = c.filter(function (i) { return i.difficulty === preferDiff; });
      var it = U.pick(pref.length ? pref : c, rng);
      used[it.id] = true;
      return it;
    }

    function fillBlock(level) {
      var topics = U.shuffle(topicsFor(level), rng);
      queue = [];
      var i = 0;
      while (queue.length < BLOCK && i < topics.length * 2) {
        var t = topics[i % topics.length];
        var it = pickItem(t.id, i < topics.length ? 2 : 1);
        if (it) queue.push(it);
        i++;
      }
      blockLevel = level;
      blockResult = { correct: 0, total: 0 };
    }

    function decide() {
      var levels = EC.LEVELS;
      var passed = blockResult.correct >= Math.min(PASS, Math.ceil(blockResult.total * 0.7));
      visited[blockLevel] = passed;
      var idx = U.levelIndex(blockLevel);
      if (passed && idx < levels.length - 1 && visited[levels[idx + 1]] === undefined) return fillBlock(levels[idx + 1]);
      if (!passed && idx > 0 && visited[levels[idx - 1]] === undefined) return fillBlock(levels[idx - 1]);
      // fine fase adattiva: calcolo dei livelli
      estimated = null;
      for (var k = 0; k < levels.length; k++) {
        var v = visited[levels[k]];
        if (v === false) break;
        if (v === true || v === undefined) {
          // un livello non provato sotto uno superato conta come superato
          var higherPassed = levels.slice(k + 1).some(function (l) { return visited[l] === true; });
          if (v === true || higherPassed) estimated = levels[k];
          else break;
        }
      }
      var firstFail = levels.filter(function (l) { return visited[l] === false; })[0];
      workingLevel = firstFail || (estimated || 'A1');
      if (!firstFail && estimated === levels[levels.length - 1]) workingLevel = estimated;
      // diagnostica: argomenti del livello di lavoro (e, se A1, anche quelli non ancora visti) mai provati
      phase = 'diagnostic';
      var untested = U.shuffle(topicsFor(workingLevel).filter(function (t) { return !testedTopics[t.id]; }), rng);
      if (untested.length < DIAGNOSTIC && U.levelIndex(workingLevel) > 0) {
        var below = EC.LEVELS[U.levelIndex(workingLevel) - 1];
        untested = untested.concat(U.shuffle(topicsFor(below).filter(function (t) { return !testedTopics[t.id]; }), rng));
      }
      queue = [];
      untested.slice(0, DIAGNOSTIC).forEach(function (t) {
        var it = pickItem(t.id, 1);
        if (it) queue.push(it);
      });
      if (!queue.length) finished = true;
    }

    fillBlock(START);

    var api = {
      get finished() { return finished; },
      get phase() { return phase; },
      get answered() { return answers.length; },
      // stima del numero totale di domande (per la barra di avanzamento)
      get estimatedTotal() {
        if (finished) return answers.length;
        if (phase === 'diagnostic') return answers.length + queue.length;
        return Math.max(answers.length + queue.length + DIAGNOSTIC, 22);
      },
      next: function () {
        if (finished) return null;
        if (!queue.length) {
          if (phase === 'adaptive') decide();
          else finished = true;
          if (finished || !queue.length) { finished = true; return null; }
        }
        return queue[0];
      },
      answer: function (given) {
        var it = queue.shift();
        if (!it) return null;
        var correct = EC.session.evaluate(it, given).correct;
        answers.push({ id: it.id, topic: it.topic, level: EC.data.topicById[it.topic].level, correct: correct, phase: phase, given: given });
        testedTopics[it.topic] = true;
        if (phase === 'adaptive') {
          blockResult.total++;
          if (correct) blockResult.correct++;
        }
        return { correct: correct };
      },
      result: function () {
        var perTopic = {};
        var perLevel = {};
        answers.forEach(function (a) {
          var t = perTopic[a.topic] || (perTopic[a.topic] = { correct: 0, total: 0 });
          t.total++;
          if (a.correct) t.correct++;
          var l = perLevel[a.level] || (perLevel[a.level] = { correct: 0, total: 0 });
          l.total++;
          if (a.correct) l.correct++;
        });
        var correct = answers.filter(function (a) { return a.correct; }).length;
        return {
          estimated: estimated, // ultimo livello superato (null = A1 non ancora raggiunto)
          workingLevel: workingLevel || 'A1', // livello su cui allenarsi
          visited: visited,
          perTopic: perTopic,
          perLevel: perLevel,
          correct: correct,
          total: answers.length,
          answers: answers
        };
      }
    };
    return api;
  }

  return { create: create, BLOCK: BLOCK, PASS: PASS };
})();
