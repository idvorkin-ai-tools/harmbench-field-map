// Is an ASR gap bigger than the grader's noise and the sampling error?
// (measure/classifier.html#failure-modes, types/standard.html#split.) Pure maths, no DOM.
(function (root) {
  var Z95 = 1.959964;
  // The test classifier's errors on the 600-example human-labelled set (classifier.html#failure-modes).
  var ERRORS = 41, LABELLED = 600;
  function noiseRate() { return ERRORS / LABELLED; }
  // ASR points one behavior is worth on an n-behavior column.
  function perBehavior(n) { return n > 0 ? 100 / n : null; }
  // Wilson score interval for k successes out of n (the LLM Judges map's wilsonci).
  function wilson(k, n, z) {
    if (!(n > 0)) return null;
    z = z || Z95;
    var p = k / n, z2 = z * z, den = 1 + z2 / n;
    var centre = (p + z2 / (2 * n)) / den;
    var half = z * Math.sqrt(p * (1 - p) / n + z2 / (4 * n * n)) / den;
    return { p: p, centre: centre, half: half, lo: centre - half, hi: centre + half };
  }
  // a, b: ASRs in percent on the same n behaviors (one model, one test case each).
  function compare(a, b, n) {
    var ka = Math.round(n * a / 100), kb = Math.round(n * b / 100);
    var wa = wilson(ka, n), wb = wilson(kb, n), gap = Math.abs(a - b), noise = 100 * noiseRate();
    return {
      gap: gap, noise: noise, perBehavior: perBehavior(n), behaviors: gap / perBehavior(n),
      wa: wa, wb: wb, overlap: wa.lo <= wb.hi && wb.lo <= wa.hi, insideNoise: gap < noise
    };
  }
  var api = { Z95: Z95, ERRORS: ERRORS, LABELLED: LABELLED, noiseRate: noiseRate, perBehavior: perBehavior, wilson: wilson, compare: compare };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HBLab = Object.assign(root.HBLab || {}, api);
})(this);
