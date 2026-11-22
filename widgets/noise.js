// measure/classifier.html#failure-modes: is a gap between two ASRs bigger than
// the grader's ~7% label noise and the sampling error? Maths in lab/noise.js.
(function () {
  var H = window.AIToolsWidgets, L = window.HBLab;
  if (!H || !L || !L.compare) return;
  // [ASR A, ASR B, behaviors]
  var P = { ad: [54.3, 52.7, 400], val: [68.4, 71.9, 41], sfs: [38.3, 25.4, 400] };
  function f1(x) { return x.toFixed(1); }
  H.register('noise', function (el) {
    var p = 'nz' + H.uid();
    el.innerHTML = H.presets([['ad', 'GCG vs AutoDAN, 400'], ['val', 'Standard GCG test vs val, 41'], ['sfs', 'Few-Shot vs ZeroShot, 400']]) +
      '<div class="lab-ctl">' + H.slider(p + '-a', 'ASR A (%)', 0, 100, 0.1, 54.3) + H.slider(p + '-b', 'ASR B (%)', 0, 100, 0.1, 52.7) +
      H.slider(p + '-n', 'Behaviors in the column', 10, 400, 1, 400) + '</div>' +
      '<svg viewBox="0 0 360 112" role="img" aria-labelledby="' + p + '-sum"></svg>' +
      '<div class="statgrid">' + H.stat('gap', p + '-g', true) + H.stat('one behavior', p + '-pb', true) + H.stat('grader noise', p + '-gn', true) + '</div>' +
      H.sum(p + '-sum');
    var a = H.$(el, p + '-a'), b = H.$(el, p + '-b'), n = H.$(el, p + '-n'), svg = el.querySelector('svg');
    function draw() {
      var A = +a.value, B = +b.value, N = +n.value, r = L.compare(A, B, N), X = function (v) { return 20 + 3.2 * v; }, s = '';
      H.$(el, p + '-a-o').textContent = f1(A); H.$(el, p + '-b-o').textContent = f1(B); H.$(el, p + '-n-o').textContent = N;
      var lo = Math.max(0, A - r.noise), hi = Math.min(100, A + r.noise);
      s += '<rect class="band" x="' + X(lo) + '" y="14" width="' + (X(hi) - X(lo)) + '" height="70"/>';
      for (var g = 0; g <= 100; g += 20) s += '<line class="grid" x1="' + X(g) + '" y1="14" x2="' + X(g) + '" y2="84"/>' + H.t(X(g), 100, g, 't-dim', 'text-anchor="middle"');
      [[A, r.wa, 36, 'A'], [B, r.wb, 66, 'B']].forEach(function (q) {
        var w = q[1];
        s += H.t(4, q[2] + 4, q[3], 't-ink');
        s += '<line class="ln-def" x1="' + X(100 * w.lo) + '" y1="' + q[2] + '" x2="' + X(100 * w.hi) + '" y2="' + q[2] + '" stroke-width="3"/>';
        s += '<circle class="pt" cx="' + X(q[0]) + '" cy="' + q[2] + '" r="4.5"/>';
      });
      s += H.t(Math.min(260, Math.max(100, X(A))), 10, '&plusmn;' + f1(r.noise) + ' grader noise', 't-off', 'text-anchor="middle"');
      svg.innerHTML = s;
      H.$(el, p + '-g').textContent = f1(r.gap) + ' pts';
      H.$(el, p + '-g-n').textContent = 'about ' + f1(r.behaviors) + ' behaviors';
      H.$(el, p + '-pb').textContent = f1(r.perBehavior) + ' pts';
      H.$(el, p + '-pb-n').textContent = '100 / ' + N;
      H.$(el, p + '-gn').textContent = f1(r.noise) + ' pts';
      H.$(el, p + '-gn-n').textContent = L.ERRORS + ' errors in ' + L.LABELLED;
      var verdict = r.insideNoise ? 'inside the grader noise, so do not rank them' :
        r.overlap ? 'bigger than the grader noise, but the 95% intervals still overlap' : 'bigger than both the noise and the intervals: a real gap';
      H.$(el, p + '-sum').textContent = 'A gap of ' + f1(r.gap) + ' points on ' + N + ' behaviors is ' + verdict +
        '. 95% intervals: A ' + f1(100 * r.wa.lo) + ' to ' + f1(100 * r.wa.hi) + ', B ' + f1(100 * r.wb.lo) + ' to ' + f1(100 * r.wb.hi) + '.';
    }
    function set(v) { a.value = v[0]; b.value = v[1]; n.value = v[2]; draw(); }
    [a, b, n].forEach(function (i) { i.addEventListener('input', draw); });
    el.querySelectorAll('.lab-pre button').forEach(function (bt) { bt.addEventListener('click', function () { set(P[bt.getAttribute('data-p')]); }); });
    el.labPreset = function (k) { if (P[k]) set(P[k]); };
    set(P.ad);
  });
})();
