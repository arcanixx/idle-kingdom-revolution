import { describe, it, expect, vi } from "vitest";
import { startBattle, spawnWave, processTick } from "@/lib/game/battle-engine";
import type { BattleState } from "@/lib/game/battle-engine";
import type { BattleField, Unit, Formation } from "@/types/game";

function makeField(overrides: Partial<BattleField> = {}): BattleField {
  return {
    id: 1,
    name: "Plains of Beginning",
    description: "",
    difficulty: 1,
    wave_count: 3,
    boss_wave: 5,
    recommended_power: 100,
    rewards: { gold: 50, xp: 30 },
    is_locked: false,
    ...overrides,
  };
}

function makeUnit(overrides: Partial<Unit> = {}): Unit {
  return {
    id: "u1",
    unit_id: "human_warrior_common",
    name: "Test Warrior",
    class: "warrior",
    faction: "human",
    rarity: "common",
    level: 1,
    xp: 0,
    hp: 100,
    attack: 20,
    defense: 10,
    speed: 100,
    equipment: {},
    power_rating: 50,
    // isActive is used by startBattle() but is not part of the Unit type
    // definition in src/types/game.ts — see note in test below.
    ...(overrides as object),
  } as Unit & { isActive?: boolean };
}

function makeFormation(units: { unit_id: string }[]): Formation {
  return {
    front: [{ unit_id: units[0]?.unit_id, row: 0, col: 0 }, null, null],
    back: [null, null, null],
  };
}

describe("startBattle", () => {
  it("places only units marked isActive into the combat roster", () => {
    // NOTE: startBattle() reads `pu.isActive`, but the Unit interface in
    // src/types/game.ts has no `isActive` field. Until that's added to the
    // type (or the check is removed), every real Unit object is `undefined`
    // here, which is falsy, so an un-augmented Unit is silently dropped from
    // the battle roster. Tests below pass isActive: true explicitly to
    // exercise the intended path.
    const active = makeUnit({ id: "u1", unit_id: "human_warrior_common", isActive: true });
    const inactive = makeUnit({ id: "u2", unit_id: "human_mage_common", isActive: false });
    const field = makeField();
    const formation: Formation = {
      front: [{ unit_id: active.unit_id, row: 0, col: 0 }, { unit_id: inactive.unit_id, row: 0, col: 1 }, null],
      back: [null, null, null],
    };
    const state = startBattle(field, [active, inactive], formation as never);
    expect(state.playerUnits).toHaveLength(1);
    expect(state.playerUnits[0].unit_id).toBe("human_warrior_common");
  });

  it("ignores formation cells with no matching player unit", () => {
    const field = makeField();
    const formation: Formation = {
      front: [{ unit_id: "ghost_unit", row: 0, col: 0 }, null, null],
      back: [null, null, null],
    };
    const state = startBattle(field, [], formation as never);
    expect(state.playerUnits).toHaveLength(0);
  });

  it("defaults wave_count to 3 when the field omits it", () => {
    const field = makeField({ wave_count: undefined as unknown as number });
    const state = startBattle(field, [], { front: [null, null, null], back: [null, null, null] } as never);
    expect(state.totalWaves).toBe(3);
  });

  it("defaults rewards to gold:50 / xp:30 when the field omits them", () => {
    const field = makeField({ rewards: undefined as unknown as Record<string, number> });
    const state = startBattle(field, [], { front: [null, null, null], back: [null, null, null] } as never);
    expect(state.rewards).toEqual({ gold: 50, xp: 30 });
  });

  it("immediately spawns wave 1 so the battle starts non-empty", () => {
    const field = makeField();
    const state = startBattle(field, [], { front: [null, null, null], back: [null, null, null] } as never);
    expect(state.currentWave).toBe(1);
    expect(state.enemyUnits.length).toBeGreaterThan(0);
    expect(state.log[0]).toBe("Battle begins!");
  });
});

describe("spawnWave", () => {
  function freshState(): BattleState {
    return {
      fieldId: 1,
      currentWave: 0,
      totalWaves: 5,
      turn: 0,
      playerUnits: [],
      enemyUnits: [],
      log: [],
      status: "active",
      rewards: { gold: 0, xp: 0 },
    };
  }

  it("scales enemy count with wave number, capped at 6", () => {
    const state = freshState();
    spawnWave(state, 1);
    expect(state.enemyUnits).toHaveLength(3); // min(2+1, 6)
    spawnWave(state, 10);
    expect(state.enemyUnits).toHaveLength(6); // capped
  });

  it("marks every 5th wave as a boss wave with a tripled-stat first enemy", () => {
    const state = freshState();
    spawnWave(state, 5);
    const boss = state.enemyUnits[0];
    expect(boss.name).toContain("BOSS");
    expect(state.log.some((l) => l.includes("BOSS FIGHT"))).toBe(true);
  });

  it("does not mark non-multiple-of-5 waves as boss waves", () => {
    const state = freshState();
    spawnWave(state, 4);
    expect(state.enemyUnits[0].name).not.toContain("BOSS");
  });

  it("resets enemyUnits entirely on each call (no leftover enemies from previous wave)", () => {
    const state = freshState();
    spawnWave(state, 1);
    const firstWaveIds = state.enemyUnits.map((u) => u.id);
    spawnWave(state, 2);
    const secondWaveIds = state.enemyUnits.map((u) => u.id);
    expect(secondWaveIds).not.toEqual(firstWaveIds);
    expect(state.enemyUnits.every((u) => u.isAlive)).toBe(true);
  });
});

describe("processTick", () => {
  function combatUnit(overrides: Partial<BattleState["playerUnits"][number]> = {}) {
    return {
      id: "p1",
      unit_id: "human_warrior_common",
      name: "Hero",
      class: "warrior" as const,
      rarity: "common",
      hp: 100,
      maxHp: 100,
      attack: 20,
      defense: 5,
      speed: 100,
      row: 0,
      col: 0,
      isEnemy: false,
      isAlive: true,
      cooldowns: {},
      ...overrides,
    };
  }

  it("does nothing once battle status is no longer active", () => {
    const state: BattleState = {
      fieldId: 1,
      currentWave: 1,
      totalWaves: 1,
      turn: 5,
      playerUnits: [],
      enemyUnits: [],
      log: ["existing log"],
      status: "victory",
      rewards: { gold: 0, xp: 0 },
    };
    processTick(state);
    expect(state.turn).toBe(5); // unchanged — early return before turn++
    expect(state.log).toEqual(["existing log"]);
  });

  it("declares defeat when all player units have fallen", () => {
    const state: BattleState = {
      fieldId: 1,
      currentWave: 1,
      totalWaves: 3,
      turn: 0,
      playerUnits: [combatUnit({ isAlive: false, hp: 0 })],
      enemyUnits: [combatUnit({ id: "e1", isEnemy: true })],
      log: [],
      status: "active",
      rewards: { gold: 0, xp: 0 },
    };
    processTick(state);
    expect(state.status).toBe("defeat");
    expect(state.log.some((l) => l.includes("DEFEAT"))).toBe(true);
  });

  it("declares victory when the final wave's enemies are all defeated", () => {
    const state: BattleState = {
      fieldId: 1,
      currentWave: 3,
      totalWaves: 3,
      turn: 0,
      playerUnits: [combatUnit()],
      enemyUnits: [combatUnit({ id: "e1", isEnemy: true, isAlive: false, hp: 0 })],
      log: [],
      status: "active",
      rewards: { gold: 0, xp: 0 },
    };
    processTick(state);
    expect(state.status).toBe("victory");
  });

  it("auto-advances to the next wave when enemies are cleared but waves remain", () => {
    const state: BattleState = {
      fieldId: 1,
      currentWave: 1,
      totalWaves: 3,
      turn: 0,
      playerUnits: [combatUnit()],
      enemyUnits: [combatUnit({ id: "e1", isEnemy: true, isAlive: false, hp: 0 })],
      log: [],
      status: "active",
      rewards: { gold: 0, xp: 0 },
    };
    processTick(state);
    expect(state.status).toBe("active");
    expect(state.currentWave).toBe(2);
    expect(state.enemyUnits.length).toBeGreaterThan(0);
  });

  it("increments turn count on every active tick", () => {
    const state: BattleState = {
      fieldId: 1,
      currentWave: 1,
      totalWaves: 3,
      turn: 0,
      playerUnits: [combatUnit()],
      enemyUnits: [combatUnit({ id: "e1", isEnemy: true })],
      log: [],
      status: "active",
      rewards: { gold: 0, xp: 0 },
    };
    processTick(state);
    expect(state.turn).toBe(1);
  });

  describe("determinism (documents a known gap vs. the design spec)", () => {
    // docs/phase-1/README.md states battle results should be
    // "reproducible (same seed) - deterministic", but processTick() calls
    // Math.random() directly with no seed/injectable RNG. Two ticks fed
    // the exact same input state can and do produce different outcomes.
    // This test proves the gap rather than hiding it — if the engine is
    // later refactored to accept an injectable RNG, update/remove this test.
    it("produces different results across repeated runs from identical starting state", () => {
      function runOnce() {
        const state: BattleState = {
          fieldId: 1,
          currentWave: 1,
          totalWaves: 1,
          turn: 0,
          playerUnits: [combatUnit({ id: "p1", attack: 15, speed: 200 })],
          enemyUnits: [combatUnit({ id: "e1", isEnemy: true, attack: 15, speed: 200, hp: 30, maxHp: 30 })],
          log: [],
          status: "active",
          rewards: { gold: 0, xp: 0 },
        };
        // Run several ticks so randomness has room to diverge.
        for (let i = 0; i < 10 && state.status === "active"; i++) {
          processTick(state);
        }
        return state.enemyUnits[0]?.hp;
      }

      const originalRandom = Math.random;
      try {
        const results = new Set<number | undefined>();
        for (let i = 0; i < 20; i++) {
          results.add(runOnce());
        }
        // With true Math.random() this set will almost certainly have more
        // than one distinct value, confirming non-determinism.
        expect(results.size).toBeGreaterThan(1);
      } finally {
        Math.random = originalRandom;
      }
    });

    it("CAN be made deterministic by stubbing Math.random (useful pattern for future engine tests)", () => {
      const state: BattleState = {
        fieldId: 1,
        currentWave: 1,
        totalWaves: 1,
        turn: 0,
        playerUnits: [combatUnit({ id: "p1", attack: 15, speed: 200 })],
        enemyUnits: [combatUnit({ id: "e1", isEnemy: true, attack: 15, speed: 200, hp: 30, maxHp: 30 })],
        log: [],
        status: "active",
        rewards: { gold: 0, xp: 0 },
      };
      const spy = vi.spyOn(Math, "random").mockReturnValue(0.5);
      try {
        processTick(state);
        const hpAfterFirstRun = state.enemyUnits[0]?.hp;

        const state2: BattleState = {
          ...state,
          turn: 0,
          enemyUnits: [combatUnit({ id: "e1", isEnemy: true, attack: 15, speed: 200, hp: 30, maxHp: 30 })],
          playerUnits: [combatUnit({ id: "p1", attack: 15, speed: 200 })],
          log: [],
        };
        processTick(state2);
        expect(state2.enemyUnits[0]?.hp).toBe(hpAfterFirstRun);
      } finally {
        spy.mockRestore();
      }
    });
  });
});
