// node --test tools/tests — grader noise and sampling error, measure/classifier.html#failure-modes.
const test = require('node:test');
const assert = require('node:assert');
const N = require('../../lab/noise.js');
const near = (got, want, tol = 0.05) => assert.ok(Math.abs(got - want) <= tol, `got ${got}, want ${want}`);

test('41 errors in 600 is about 7% label noise (classifier#failure-modes)', () => {
  near(100 * N.noiseRate(), 6.83, 0.01);
  near(100 - 93.19, 6.81, 0.01); // the agreement figure says the same
});

test('what one behavior is worth (types/standard#split, harms/illegal, harms/general-harm)', () => {
  near(N.perBehavior(41), 2.4, 0.05);
  near(N.perBehavior(53), 1.9, 0.05);
  near(N.perBehavior(22), 4.5, 0.05);
  assert.equal(N.perBehavior(0), null);
});

test('gaps the pages call indistinguishable, and one they call real', () => {
  assert.ok(N.compare(54.3, 52.7, 400).insideNoise); // GCG vs AutoDAN, 1.6 points (llm-optimizer)
  assert.ok(N.compare(68.4, 71.9, 41).insideNoise); // standard GCG test vs val (types/standard#split)
  assert.ok(!N.compare(38.3, 25.4, 400).insideNoise); // SFS vs ZeroShot, 13 points (attacks/template)
});

test('Wilson interval matches the LLM Judges values', () => {
  const w = N.wilson(48, 60); near(w.lo, 0.682, 5e-4); near(w.hi, 0.882, 5e-4);
  assert.equal(N.wilson(0, 0), null);
});
