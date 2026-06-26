import { describe, it, expect } from "vitest";
import { xpForLevel, calculateLevel, calcPower, addXp } from '../../../src/lib/game/leveling';

describe('Leveling', () => {
  it('xpForLevel(1) base amount', () => { expect(xpForLevel(1)).toBeGreaterThan(0); });
  
  it('xpForLevel increases', () => { expect(xpForLevel(10)).toBeGreaterThan(xpForLevel(1)); });

  it('xpForLevel uses floor for level 2', () => {
    const expected = Math.floor(100 * Math.pow(2, 1.5));
    expect(xpForLevel(2)).toBe(expected);
  });

  it('calculateLevel(0) returns level 1', () => { const r = calculateLevel(0); expect(r.level).toBe(1); });

  it('calculateLevel returns progress in [0,1)', () => { const r = calculateLevel(10000); expect(r.progress).toBeGreaterThanOrEqual(0); expect(r.progress).toBeLessThan(1); });

  it('calculateLevel at exact XP returns progress 0', () => {
    const xp = xpForLevel(1);
    const r = calculateLevel(xp);
    expect(r.level).toBe(2);
    expect(r.progress).toBe(0);
  });

  it('calcPower sums stats', () => { expect(calcPower([{attack:10,defense:5,hp:100,level:1}])).toBeGreaterThan(0); });

  it('calcPower applies level multiplier', () => {
    const p1 = calcPower([{attack:10,defense:5,hp:100,level:1}]);
    const p2 = calcPower([{attack:10,defense:5,hp:100,level:2}]);
    expect(p2).toBeGreaterThan(p1);
  });

  it('calcPower sums multiple units', () => {
    const units = [
      { attack: 10, defense: 5, hp: 100, level: 1 },
      { attack: 20, defense: 10, hp: 200, level: 2 }
    ];
    const sum = calcPower(units);
    expect(sum).toBeGreaterThan(calcPower([units[0]]));
  });

  describe('addXp', () => {
    it('increases XP', () => {
      const player = { xp: 100, level: 1 };
      const result = addXp(player as any, 50);
      expect(result.player.xp).toBe(150);
    });

    it('does not change level when XP below threshold', () => {
      const xpForNext = xpForLevel(1);
      const currentXp = xpForNext - 2;
      const player = { xp: currentXp, level: 1 };
      const result = addXp(player as any, 1);
      expect(result.player.level).toBe(1);
      expect(result.leveledUp).toBe(false);
    });

    it('increases level when XP threshold reached', () => {
      const player = { xp: 0, level: 1 };
      const result = addXp(player as any, xpForLevel(1));
      expect(result.player.level).toBe(2);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(2);
    });

    it('handles multiple level ups', () => {
      const player = { xp: 0, level: 1 };
      const result = addXp(player as any, xpForLevel(1) + xpForLevel(2));
      expect(result.player.level).toBe(3);
    });
  });
});
