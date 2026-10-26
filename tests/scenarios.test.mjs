import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const path = new URL('../src/data/scenarios/relationships.json', import.meta.url);
const situations = JSON.parse(readFileSync(path, 'utf8'));

test('each scenario has a unique ID and a readable introduction', () => {
  assert.ok(situations.length >= 2);
  assert.equal(new Set(situations.map((s) => s.id)).size, situations.length);
  for (const situation of situations) {
    assert.ok(situation.title.length > 5);
    assert.ok(situation.description.length > 20);
    assert.ok(situation.claims.length > 0);
  }
});

test('each observation references valid, distinct players', () => {
  for (const situation of situations) {
    const ids = new Set();
    for (const claim of situation.claims) {
      assert.ok(Number.isInteger(claim.from) && claim.from >= 1 && claim.from <= 10);
      assert.ok(Number.isInteger(claim.to) && claim.to >= 1 && claim.to <= 10);
      assert.notEqual(claim.from, claim.to);
      assert.ok(['support', 'challenge'].includes(claim.kind));
      assert.ok(claim.evidence.length > 15);
      assert.ok(!ids.has(claim.id));
      ids.add(claim.id);
    }
  }
});

test('later discussion preserves previous observations', () => {
  const first = situations[0].claims;
  const secondIds = new Set(situations[1].claims.map((claim) => claim.id));
  for (const claim of first) {
    assert.ok(secondIds.has(claim.id));
  }
  assert.ok(situations[1].claims.length > first.length);
});
