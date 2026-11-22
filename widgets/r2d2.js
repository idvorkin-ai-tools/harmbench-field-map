// measure/defenses.html#numbers: Zephyr 7B with and without R2D2, column by
// column, filtered by attack family. Data and means in lab/r2d2.js.
(function () {
  var H = window.AIToolsWidgets, L = window.HBLab;
  if (!H || !L || !L.summary) return;
  var FAMS = [['all', 'All 16'], ['gradient', 'Gradient'], ['template', 'Templates'], ['llm', 'LLM-optimizer']];
  var NAMES = { all: 'all sixteen columns', gradient: 'the gradient family', template: 'the template family', llm: 'the LLM-optimizer family' };
  function f1(x) { return x.toFixed(1); }
  H.register('r2d2', function (el) {
    var p = 'rd' + H.uid(), fam = 'all', on = true;
    el.innerHTML = '<div class="lab-pre"><button type="button" class="tog" aria-pressed="true">+ R2D2 shown</button></div>' +
      '<div class="lab-pre" role="group" aria-label="Attack family">' + FAMS.map(function (f) {
        return '<button type="button" data-f="' + f[0] + '" aria-pressed="false">' + f[1] + '</button>';
      }).join('') + '</div>' +
      '<svg role="img" aria-labelledby="' + p + '-sum"></svg>' +
      '<div class="statgrid">' + H.stat('Zephyr 7B', p + '-b', true) + H.stat('+ R2D2', p + '-d', true) + H.stat('&times; lower', p + '-x', true) + '</div>' +
      H.sum(p + '-sum');
    var svg = el.querySelector('svg'), tog = el.querySelector('.tog'), fb = el.querySelectorAll('[data-f]');
    function draw() {
      var rows = L.pick(fam), X = function (v) { return 104 + 3 * v; }, s = '', h = rows.length * 17 + 22;
      svg.setAttribute('viewBox', '0 0 360 ' + h);
      for (var g = 0; g <= 80; g += 20) s += '<line class="grid" x1="' + X(g) + '" y1="2" x2="' + X(g) + '" y2="' + (h - 16) + '"/>' + H.t(X(g), h - 4, g, 't-dim', 'text-anchor="middle"');
      rows.forEach(function (r, i) {
        var y = 4 + i * 17, top = on ? r.r2d2 : r.base;
        s += H.t(98, y + 10, r.name, 't-mid', 'text-anchor="end"');
        s += '<rect class="bar' + (on ? ' ghost' : ' alt') + '" x="104" y="' + y + '" width="' + Math.max(1, 3 * r.base) + '" height="12" rx="2"/>';
        if (on) s += '<rect class="bar on" x="104" y="' + y + '" width="' + Math.max(1, 3 * r.r2d2) + '" height="12" rx="2"/>';
        s += H.t(X(top) + 5, y + 10, f1(top), 't-ink');
      });
      svg.innerHTML = s;
      var m = L.summary(fam);
      H.$(el, p + '-b').textContent = f1(m.base); H.$(el, p + '-b-n').textContent = 'mean of ' + m.n + ' columns';
      H.$(el, p + '-d').textContent = f1(m.r2d2); H.$(el, p + '-d-n').textContent = 'same columns, defended';
      H.$(el, p + '-x').innerHTML = m.ratio === null ? 'all at 0' : f1(m.ratio) + '&times;'; H.$(el, p + '-x-n').textContent = 'ratio of the two means';
      H.$(el, p + '-sum').textContent = 'Across ' + NAMES[fam] + ', Zephyr 7B averages ' + f1(m.base) + ' and Zephyr 7B + R2D2 ' + f1(m.r2d2) +
        ', ' + f1(m.ratio) + ' times lower.' + (on ? '' : ' Bars show Zephyr 7B alone.');
      tog.setAttribute('aria-pressed', String(on)); tog.textContent = on ? '+ R2D2 shown' : '+ R2D2 hidden';
      fb.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-f') === fam)); });
    }
    tog.addEventListener('click', function () { on = !on; draw(); });
    fb.forEach(function (b) { b.addEventListener('click', function () { fam = b.getAttribute('data-f'); draw(); }); });
    el.labPreset = function (f) { if (NAMES[f]) { fam = f; draw(); } };
    draw();
  });
})();
