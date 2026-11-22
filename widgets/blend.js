// measure/results.html#table6: Table 6's "all behaviors" average blends three
// slices, and the copyright slice decides the ranking. Maths in lab/blend.js.
(function () {
  var H = window.AIToolsWidgets, L = window.HBLab;
  if (!H || !L || !L.blend) return;
  var MODES = [['all', 'All 400 text (as printed)'], ['nocpy', 'Without copyright (300)'], ['cpy', 'Copyright only (100)']];
  var WORDS = { all: 'all 400 text behaviors', nocpy: 'the 300 standard and contextual behaviors', cpy: 'the 100 copyright behaviors' };
  function f1(x) { return x.toFixed(1); }
  H.register('blend', function (el) {
    var p = 'bl' + H.uid(), mode = 'all';
    el.innerHTML =
      '<div class="lab-pre" role="group" aria-label="Which behaviors to average">' + MODES.map(function (m) {
        return '<button type="button" data-m="' + m[0] + '" aria-pressed="false">' + m[1] + '</button>';
      }).join('') + '</div>' +
      '<div class="lab-ctl"><div class="lab-sl"><label for="' + p + '-c">Attack column to follow</label><select id="' + p + '-c">' +
      L.COLS.map(function (c) { return '<option value="' + c.id + '">' + c.name + '</option>'; }).join('') + '</select></div></div>' +
      '<svg viewBox="0 0 360 140" role="img" aria-labelledby="' + p + '-sum"></svg>' +
      '<div class="statgrid">' + H.stat('this average', p + '-v', true) + H.stat('rank of these 6', p + '-r', true) + H.stat('Table 6 prints', p + '-pr', true) + '</div>' +
      H.sum(p + '-sum');
    var sel = H.$(el, p + '-c'), svg = el.querySelector('svg'), btns = el.querySelectorAll('[data-m]');
    function draw() {
      var col = sel.value, rk = L.ranked(mode), X = function (v) { return 112 + 2.6 * v; }, s = '';
      for (var g = 0; g <= 80; g += 20) s += '<line class="grid" x1="' + X(g) + '" y1="6" x2="' + X(g) + '" y2="124"/>' + H.t(X(g), 136, g, 't-dim', 'text-anchor="middle"');
      rk.forEach(function (r, i) {
        var y = 10 + i * 19, on = r.col.id === col;
        s += H.t(106, y + 10, r.col.name, on ? 't-ink' : 't-mid', 'text-anchor="end"');
        s += '<rect class="bar' + (on ? ' on' : '') + '" x="112" y="' + y + '" width="' + Math.max(1, 2.6 * r.v) + '" height="13" rx="2"/>';
        s += H.t(X(r.v) + 5, y + 10, f1(r.v), on ? 't-ink' : 't-dim');
      });
      svg.innerHTML = s;
      var c = L.COLS.filter(function (k) { return k.id === col; })[0], v = L.blend(c.std, c.ctx, c.cpy, mode);
      var rank = rk.map(function (r) { return r.col.id; }).indexOf(col) + 1, rankAll = L.ranked('all').map(function (r) { return r.col.id; }).indexOf(col) + 1;
      H.$(el, p + '-v').textContent = f1(v);
      H.$(el, p + '-v-n').innerHTML = mode === 'all' ? '(200&times;' + c.std + ' + 100&times;' + c.ctx + ' + 100&times;' + c.cpy + ') / 400' :
        mode === 'nocpy' ? '(200&times;' + c.std + ' + 100&times;' + c.ctx + ') / 300' : 'the copyright sub-table, recomputed';
      H.$(el, p + '-r').textContent = rank;
      H.$(el, p + '-r-n').textContent = 'rank ' + rankAll + ' on all 400';
      H.$(el, p + '-pr').textContent = f1(c.printed);
      H.$(el, p + '-pr-n').textContent = 'all behaviors; the blend lands within 0.1';
      H.$(el, p + '-sum').textContent = c.name + ' averages ' + f1(v) + ' on ' + WORDS[mode] + ', rank ' + rank + ' of these six' +
        (mode === 'cpy' ? '; the leader here is ' + rk[0].col.name + ' at ' + f1(rk[0].v) + '.' : '.');
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-m') === mode)); });
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { mode = b.getAttribute('data-m'); draw(); }); });
    sel.addEventListener('change', draw);
    el.labPreset = function (m) { if (WORDS[m]) { mode = m; draw(); } };
    draw();
  });
})();
