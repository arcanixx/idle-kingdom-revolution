import { describe, it, expect } from 'vitest';
import { BASE_REWARDS, getRewardMultiplier, calcRewards, calcOfflineEarnings } from '../../../src/lib/game/economy';
describe('Economy', () => {
  it('BASE_REWARDS has entries', () => { expect(Object.keys(BASE_REWARDS).length).toBeGreaterThan(0); });
  it('getRewardMultiplier returns >=1', () => { expect(getRewardMultiplier(1)).toBeGreaterThanOrEqual(1); });
  it('getRewardMultiplier scales with level', () => {
    expect(getRewardMultiplier(10)).toBeGreaterThan(getRewardMultiplier(1));
  });
  it('calcRewards returns gold and xp', () => {
    const r = calcRewards(Object.keys(BASE_REWARDS)[0] as any, 1);
    expect(r.gold).toBeGreaterThanOrEqual(0);
    expect(r.xp).toBeGreaterThanOrEqual(0);
  });
  it('calcOfflineEarnings returns positive', () => {
    const e = calcOfflineEarnings(10, 2, 5);
    expect(e.gold).toBeGreaterThan(0);
    expect(e.xp).toBeGreaterThan(0);
  });
});
