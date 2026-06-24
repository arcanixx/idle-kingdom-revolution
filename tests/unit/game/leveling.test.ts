import { describe, it, expect } from "vitest";
import { xpForLevel, calculateLevel, addXp, calcPower } from "@/lib/game/leveling";
import type { PlayerProfile } from "@/types/game";

describe("xpForLevel", () => {
  it("returns 100 xp needed for level 1", () => {
    expect(xpForLevel(1)).toBe(100);
  });

  it("grows superlinearly with level (level^1.5 curve)", () => {
    const lvl1 = xpForLevel(1);
    const lvl10 = xpForLevel(10);
    const lvl20 = xpForLevel(20);
    expect(lvl10).toBeGreaterThan(lvl1 * 10);
    // Growth rate from 10->20 should outpace 1->10 due to the exponent.
    expect(lvl20 - lvl10).toBeGreaterThan(lvl10 - lvl1);
  });

  it("always returns an integer", () => {
    for (const lvl of [1, 2, 5, 13, 50, 99]) {
      expect(Number.isInteger(xpForLevel(lvl))).toBe(true);
    }
  });
});

describe("calculateLevel", () => {
  it("starts at level 1 with 0 xp", () => {
    const result = calculateLevel(0);
    expect(result.level).toBe(1);
    expect(result.currentXp).toBe(0);
    expect(result.nextLevelXp).toBe(xpForLevel(1));
    expect(result.progress).toBe(0);
  });

  it("levels up exactly when xp crosses the threshold", () => {
    const justBelow = calculateLevel(xpForLevel(1) - 1);
    const exactly = calculateLevel(xpForLevel(1));
    expect(justBelow.level).toBe(1);
    expect(exactly.level).toBe(2);
  });

  it("carries remainder xp into the new level as currentXp", () => {
    const threshold = xpForLevel(1);
    const result = calculateLevel(threshold + 25);
    expect(result.level).toBe(2);
    expect(result.currentXp).toBe(25);
  });

  it("computes progress as a 0-1 fraction toward next level", () => {
    const needed = xpForLevel(1);
    const halfway = calculateLevel(Math.floor(needed / 2));
    expect(halfway.progress).toBeCloseTo(0.5, 1);
  });

  it("caps level calculation at 999 to avoid infinite loops on huge xp", () => {
    // Sanity check: passing an absurdly large xp value must still terminate.
    const result = calculateLevel(Number.MAX_SAFE_INTEGER);
    expect(result.level).toBeLessThanOrEqual(999);
  });

  it("never returns a level below 1, even for negative xp", () => {
    // NOTE: this documents current behavior. calculateLevel(negative) skips the
    // while loop immediately (remaining < xpForLevel(1)), so level stays 1 and
    // currentXp stays negative. If negative xp should never reach this function,
    // that invariant should be enforced by the caller (addXp/player profile code).
    const result = calculateLevel(-50);
    expect(result.level).toBe(1);
    expect(result.currentXp).toBe(-50);
  });
});

describe("addXp", () => {
  const basePlayer: PlayerProfile = {
    id: "p1",
    user_id: "u1",
    display_name: "Tester",
    level: 1,
    xp: 0,
    currencies: { gold: 0, valor: 0, gems: 0, battle_coins: 0 },
    highest_wave: 0,
    highest_field_id: 1,
    last_online_at: new Date().toISOString(),
  };

  it("accumulates xp onto the player's existing total", () => {
    const { player } = addXp(basePlayer, 50);
    expect(player.xp).toBe(50);
  });

  it("flags leveledUp when xp crosses the threshold", () => {
    const { leveledUp, newLevel } = addXp(basePlayer, xpForLevel(1));
    expect(leveledUp).toBe(true);
    expect(newLevel).toBe(2);
  });

  it("does not flag leveledUp when staying within the same level", () => {
    const { leveledUp } = addXp(basePlayer, 10);
    expect(leveledUp).toBe(false);
  });

  it("does not mutate the original player object", () => {
    const snapshot = { ...basePlayer };
    addXp(basePlayer, 999);
    expect(basePlayer).toEqual(snapshot);
  });

  it("treats a missing player.xp as 0 rather than throwing", () => {
    const playerWithoutXp = { ...basePlayer, xp: undefined as unknown as number };
    const { player } = addXp(playerWithoutXp, 30);
    expect(player.xp).toBe(30);
  });
});

describe("calcPower", () => {
  it("returns 0 for an empty unit list", () => {
    expect(calcPower([])).toBe(0);
  });

  it("increases power with higher attack, defense, hp, or level", () => {
    const weak = [{ attack: 10, defense: 5, hp: 50, level: 1 }];
    const strong = [{ attack: 20, defense: 10, hp: 100, level: 5 }];
    expect(calcPower(strong)).toBeGreaterThan(calcPower(weak));
  });

  it("sums power across multiple units", () => {
    const unit = { attack: 10, defense: 5, hp: 50, level: 1 };
    const single = calcPower([unit]);
    const double = calcPower([unit, unit]);
    expect(double).toBe(single * 2);
  });

  it("weights attack more heavily than defense, and defense more than raw hp", () => {
    const attackUnit = { attack: 10, defense: 0, hp: 0, level: 0 };
    const defenseUnit = { attack: 0, defense: 10, hp: 0, level: 0 };
    const hpUnit = { attack: 0, defense: 0, hp: 10, level: 0 };
    const attackPower = calcPower([attackUnit]);
    const defensePower = calcPower([defenseUnit]);
    const hpPower = calcPower([hpUnit]);
    expect(attackPower).toBeGreaterThan(defensePower);
    expect(defensePower).toBeGreaterThan(hpPower);
  });
});
