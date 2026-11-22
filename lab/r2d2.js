// Zephyr 7B against Zephyr 7B + R2D2, every Table 6 column (measure/defenses.html#numbers).
// Pure maths, no DOM.
(function (root) {
  // [attack, family, Zephyr 7B, + R2D2]; family follows this map's three attack pages.
  var ROWS = [
    ['UAT', 'gradient', 62.3, 0.0], ['GCG-Transfer', 'gradient', 61.1, 0.0], ['GBDA', 'gradient', 62.8, 0.2],
    ['PEZ', 'gradient', 62.5, 2.9], ['GCG-Multi', 'gradient', 62.5, 4.9], ['GCG', 'gradient', 69.5, 5.5],
    ['AutoPrompt', 'gradient', 60.5, 5.5], ['ZeroShot', 'template', 60.0, 7.2], ['Human Jailbreaks', 'template', 66.0, 13.6],
    ['DirectRequest', 'template', 65.8, 14.2], ['AutoDAN', 'llm', 75.0, 17.0], ['Stochastic Few-Shot', 'template', 62.0, 43.5],
    ['PAP-top5', 'llm', 32.9, 24.3], ['TAP-Transfer', 'llm', 69.3, 54.3], ['PAIR', 'llm', 58.8, 48.0], ['TAP', 'llm', 66.5, 60.8]
  ].map(function (r) { return { name: r[0], fam: r[1], base: r[2], r2d2: r[3] }; });
  function pick(fam) { return ROWS.filter(function (r) { return !fam || fam === 'all' || r.fam === fam; }); }
  function mean(xs) { return xs.length ? xs.reduce(function (a, b) { return a + b; }, 0) / xs.length : null; }
  // ratio of the two means; null when the defended mean is 0
  function summary(fam) {
    var rs = pick(fam), b = mean(rs.map(function (r) { return r.base; })), d = mean(rs.map(function (r) { return r.r2d2; }));
    return { n: rs.length, base: b, r2d2: d, ratio: d > 0 ? b / d : null };
  }
  function ratio(r) { return r.r2d2 > 0 ? r.base / r.r2d2 : Infinity; }
  var api = { ROWS: ROWS, pick: pick, mean: mean, summary: summary, ratio: ratio };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HBLab = Object.assign(root.HBLab || {}, api);
})(this);
