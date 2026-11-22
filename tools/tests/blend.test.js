// node --test tools/tests — Table 6 blend on measure/results.html#table6 and #discrepancy.
const test = require('node:test');
const assert = require('node:assert');
const B = require('../../lab/blend.js');
const near = (got, want, tol = 0.05) => assert.ok(Math.abs(got - want) <= tol, `got ${got}, want ${want}`);

test('the 200/100/100 blend reproduces results#discrepancy', () => {
  near(B.blend(69.1, 74.8, 4.6, 'all'), 54.4); // "21,760 / 400 = 54.4" against printed 54.3
  near(B.blend(34.5, 58.0, 3.0, 'all'), 32.5); // Llama 2 7B Chat under GCG
  near(B.blend(90.5, 90.0, 7.0, 'all'), 69.5); // Zephyr 7B under GCG
  near(B.blend(0.0, 21.0, 1.0, 'all'), 5.5); // Zephyr 7B + R2D2 under GCG
  near(B.blend(69.1, 74.8, 50.7, 'all'), 65.9, 0.06); // with the printed copyright row
});

test('every column blends to within 0.1 of its printed all-behaviors average', () => {
  for (const c of B.COLS) near(B.blend(c.std, c.ctx, c.cpy, 'all'), c.printed, 0.1 + 1e-9);
});

test('dropping copyright: GCG about 71 (harms/copyright#asr, types/copyright 71.0)', () => {
  near(B.blend(69.1, 74.8, 4.6, 'nocpy'), 71.0);
});

test('copyright only flips the ranking: DirectRequest 7.3 beats GCG 4.6 (types/copyright#asr)', () => {
  const r = B.ranked('cpy').map((x) => x.col.id);
  assert.ok(r.indexOf('dr') < r.indexOf('gcg'));
  assert.equal(B.ranked('all')[0].col.id, 'gcg');
  assert.equal(B.ranked('cpy')[0].col.id, 'pair');
});
