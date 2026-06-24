import { describe, it, expect } from "vitest";
import {
  BASE_REWARDS,
  getRewardMultiplier,
  calcRewards,
  calcOfflineEarnings,
} from "@/lib/game/economy";

describe("getRewardMultiplier", () => {
  it("returns 1.0 at level 1 (no bonus)", () => {
    expect(getRewardMultiplier(1)).toBe(1);
  });

  it("adds 5% per level above 1", () => {
    expect(getRewardMultiplier(2)).toBeCloseTo(1.05, 5);
    expect(getRewardMultiplier(11)).toBeCloseTo(1.5, 5);
  });

  it("handles level 0 / negative gracefully (no crash, formula extrapolates)", () => {
    // Documents current behavior: the function does not clamp, it just extrapolates.
    // If this is not the desired behavior, clamp level >= 1 in the implementation
    // and update this test to match.
    expect(getRewardMultiplier(0)).toBeCloseTo(0.95, 5);
  });
});

describe("calcRewards", () => {
  it("matches base rewards at level 1 for plains", () => {
    const result = calcRewards("plains", 1);
    expect(result).toEqual(BASE_REWARDS.plains);
  });

  it("scales every reward field by the level multiplier", () => {
    const result = calcRewards("ice", 11); // multiplier = 1.5
    expect(result.gold).toBe(Math.floor(BASE_REWARDS.ice.gold * 1.5));
    expect(result.xp).toBe(Math.floor(BASE_REWARDS.ice.xp * 1.5));
    expect(result.valor).toBe(Math.floor(BASE_REWARDS.ice.valor * 1.5));
    expect(result.battle_coins).toBe(Math.floor(BASE_REWARDS.ice.battle_coins * 1.5));
  });

  it("falls back to plains rewards for an unknown field key", () => {
    // @ts-expect-error - intentionally testing runtime fallback with a bad key
    const result = calcRewards("nonexistent_field", 1);
    expect(result).toEqual(BASE_REWARDS.plains);
  });

  it("always returns integer values (no fractional currency)", () => {
    const result = calcRewards("forest", 7);
    expect(Number.isInteger(result.gold)).toBe(true);
    expect(Number.isInteger(result.xp)).toBe(true);
    expect(Number.isInteger(result.valor)).toBe(true);
    expect(Number.isInteger(result.battle_coins)).toBe(true);
  });
});

describe("calcOfflineEarnings", () => {
  it("returns zero-ish gold for zero hours offline", () => {
    const result = calcOfflineEarnings(5, 0, 1);
    expect(result.gold).toBe(0);
    expect(result.xp).toBe(0);
  });

  it("scales linearly with hours offline", () => {
    const oneHour = calcOfflineEarnings(5, 1, 1);
    const twoHours = calcOfflineEarnings(5, 2, 1);
    expect(twoHours.gold).toBe(oneHour.gold * 2);
    expect(twoHours.xp).toBe(oneHour.xp * 2);
  });

  it("treats highestWave below 1 as 1 (floor protection)", () => {
    const zeroWave = calcOfflineEarnings(0, 1, 1);
    const negativeWave = calcOfflineEarnings(-5, 1, 1);
    const waveOne = calcOfflineEarnings(1, 1, 1);
    // Gold uses Math.max(1, highestWave), so 0 and negative both behave like wave 1.
    expect(zeroWave.gold).toBe(waveOne.gold);
    expect(negativeWave.gold).toBe(waveOne.gold);
  });

  it("does NOT floor-protect xp the same way gold is protected (documents asymmetry)", () => {
    // NOTE: xp formula uses raw `highestWave` (not Math.max(1, highestWave)) while
    // gold uses the floored rate. This means xp can be 0 or negative when
    // highestWave <= 0, even though gold stays positive. This looks like an
    // unintentional inconsistency worth revisiting in calcOfflineEarnings.
    const zeroWave = calcOfflineEarnings(0, 1, 1);
    expect(zeroWave.xp).toBe(0);

    const negativeWave = calcOfflineEarnings(-5, 1, 1);
    expect(negativeWave.xp).toBeLessThan(0);
  });

  it("applies the level reward multiplier to both gold and xp", () => {
    const base = calcOfflineEarnings(5, 1, 1);
    const leveled = calcOfflineEarnings(5, 1, 11); // multiplier 1.5
    expect(leveled.gold).toBe(Math.floor(base.gold * 1.5));
    expect(leveled.xp).toBe(Math.floor(base.xp * 1.5));
  });
});
