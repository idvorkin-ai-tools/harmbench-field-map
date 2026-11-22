// node --test tools/tests — the R2D2 row on measure/defenses.html#numbers.
const test = require('node:test');
const assert = require('node:assert');
const R = require('../../lab/r2d2.js');
const near = (got, want, tol = 0.05) => assert.ok(Math.abs(got - want) <= tol, `got ${got}, want ${want}`);

test('sixteen columns, means 62.3 and 18.9, ratio 3.3', () => {
  const s = R.summary('all');
  assert.equal(s.n, 16); near(s.base, 62.3); near(s.r2d2, 18.9); near(s.ratio, 3.3);
});

test('the x-lower column as printed', () => {
  const by = Object.fromEntries(R.ROWS.map((r) => [r.name, R.ratio(r)]));
  assert.equal(by.UAT, Infinity); near(by.GBDA, 314, 0.5); near(by.GCG, 12.6); near(by.PAIR, 1.2); near(by.TAP, 1.1);
});

test('families: 7 gradient, 4 template, 5 LLM-optimizer', () => {
  assert.equal(R.pick('gradient').length, 7); assert.equal(R.pick('template').length, 4); assert.equal(R.pick('llm').length, 5);
  assert.ok(R.summary('gradient').ratio > 10 && R.summary('llm').ratio < 2.5);
});
