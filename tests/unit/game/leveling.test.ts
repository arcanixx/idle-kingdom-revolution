import { describe, it, expect } from 'vitest';
import { xpForLevel, calculateLevel, calcPower } from '../../../src/lib/game/leveling';
describe('Leveling', () => {
  it('xpForLevel(1) base amount', () => { expect(xpForLevel(1)).toBeGreaterThan(0); });
  it('xpForLevel increases', () => { expect(xpForLevel(10)).toBeGreaterThan(xpForLevel(1)); });
  it('calculateLevel(0) returns level 1', () => { const r = calculateLevel(0); expect(r.level).toBe(1); });
  it('calculateLevel returns progress in [0,1)', () => { const r = calculateLevel(10000); expect(r.progress).toBeGreaterThanOrEqual(0); expect(r.progress).toBeLessThan(1); });
  it('calcPower sums stats', () => { expect(calcPower([{attack:10,defense:5,hp:100,level:1}])).toBeGreaterThan(0); });
});
