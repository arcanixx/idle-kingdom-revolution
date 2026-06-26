import { describe, it, expect } from "vitest";
import { BASE_REWARDS, getRewardMultiplier, calcRewards, calcOfflineEarnings } from '../../../src/lib/game/economy';

describe('Economy', () => {
  it('BASE_REWARDS has entries', () => { expect(Object.keys(BASE_REWARDS).length).toBeGreaterThan(0); });
  
  it('getRewardMultiplier returns >=1', () => { expect(getRewardMultiplier(1)).toBeGreaterThanOrEqual(1); });
  
  it('getRewardMultiplier scales with level', () => {
    expect(getRewardMultiplier(10)).toBeGreaterThan(getRewardMultiplier(1));
  });

  it('getRewardMultiplier at level 1 returns 1', () => {
    expect(getRewardMultiplier(1)).toBe(1);
  });

  it('getRewardMultiplier increases linearly', () => {
    const m1 = getRewardMultiplier(1);
    const m2 = getRewardMultiplier(2);
    expect(m2).toBe(m1 + 0.05);
  });

  it('calcRewards returns gold and xp', () => {
    const r = calcRewards('plains', 1);
    expect(r.gold).toBeGreaterThanOrEqual(0);
    expect(r.xp).toBeGreaterThanOrEqual(0);
  });

  it('calcRewards applies level multiplier', () => {
    const r1 = calcRewards('plains', 1);
    const r10 = calcRewards('plains', 10);
    expect(r10.gold).toBeGreaterThan(r1.gold);
    expect(r10.xp).toBeGreaterThan(r1.xp);
  });

  it('calcRewards handles unknown field key', () => {
    const r = calcRewards('unknown' as any, 1);
    expect(r.gold).toBeGreaterThan(0);
  });

  it('calcOfflineEarnings returns positive', () => {
    const e = calcOfflineEarnings(10, 2, 5);
    expect(e.gold).toBeGreaterThan(0);
    expect(e.xp).toBeGreaterThan(0);
  });

  it('calcOfflineEarnings scales with wave', () => {
    const e1 = calcOfflineEarnings(1, 1, 1);
    const e10 = calcOfflineEarnings(10, 1, 1);
    expect(e10.gold).toBeGreaterThan(e1.gold);
  });

  it('calcOfflineEarnings scales with hours', () => {
    const e1 = calcOfflineEarnings(5, 1, 1);
    const e10 = calcOfflineEarnings(5, 10, 1);
    expect(e10.gold).toBeGreaterThan(e1.gold);
  });

  it('calcOfflineEarnings handles zero hours', () => {
    const e = calcOfflineEarnings(10, 0, 5);
    expect(e.gold).toBe(0);
    expect(e.xp).toBe(0);
  });

  it('calcOfflineEarnings handles zero wave', () => {
    const e = calcOfflineEarnings(0, 10, 5);
    expect(e.gold).toBeGreaterThanOrEqual(0);
  });
});
