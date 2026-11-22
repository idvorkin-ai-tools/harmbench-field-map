// Table 6's all-behaviors blend (measure/results.html#table6, #discrepancy).
// All behaviors = the 400 text behaviors: 200 standard + 100 contextual + 100 copyright.
// Pure maths, no DOM.
(function (root) {
  // Column averages by functional slice, from the "By functional slice" table on
  // results.html#table6; printed = Table 6's all-behaviors average.
  var COLS = [
    { id: 'gcg', name: 'GCG', std: 69.1, ctx: 74.8, cpy: 4.6, printed: 54.3 },
    { id: 'autodan', name: 'AutoDAN', std: 68.3, ctx: 68.4, cpy: 6.0, printed: 52.7 },
    { id: 'tapt', name: 'TAP-Transfer', std: 60.0, ctx: 67.5, cpy: 5.9, printed: 48.3 },
    { id: 'pair', name: 'PAIR', std: 47.5, ctx: 60.5, cpy: 7.5, printed: 40.7 },
    { id: 'human', name: 'Human Jailbreaks', std: 31.9, ctx: 41.4, cpy: 4.3, printed: 27.3 },
    { id: 'dr', name: 'DirectRequest', std: 23.9, ctx: 46.2, cpy: 7.3, printed: 25.3 }
  ];
  var W = { std: 200, ctx: 100, cpy: 100 };
  // mode: 'all' (the 400, as Table 6 blends them), 'nocpy' (standard + contextual, 300), 'cpy' (copyright only)
  function blend(s, c, p, mode) {
    if (mode === 'cpy') return p;
    if (mode === 'nocpy') return (W.std * s + W.ctx * c) / (W.std + W.ctx);
    return (W.std * s + W.ctx * c + W.cpy * p) / (W.std + W.ctx + W.cpy);
  }
  function ranked(mode) {
    return COLS.map(function (k) { return { col: k, v: blend(k.std, k.ctx, k.cpy, mode) }; })
      .sort(function (a, b) { return b.v - a.v; });
  }
  var api = { COLS: COLS, W: W, blend: blend, ranked: ranked };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HBLab = Object.assign(root.HBLab || {}, api);
})(this);
