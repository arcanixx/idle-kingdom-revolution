import { describe, it, expect, beforeEach } from "vitest";
import { battleEventBus } from "../../../src/lib/game/battle-event-emitter";

describe("BattleEventEmitter", () => {
  beforeEach(() => {
    battleEventBus.removeAll();
  });

  it("emits and receives attack events", () => {
    const events: unknown[] = [];
    battleEventBus.on("attack", (data) => events.push(data));

    battleEventBus.emit("attack", { attackerId: "a1", targetId: "t1", damage: 10, type: "hit" });
    expect(events).toHaveLength(1);
  });

  it("emits and receives death events", () => {
    const events: unknown[] = [];
    battleEventBus.on("death", (data) => events.push(data));

    battleEventBus.emit("death", { unitId: "u1" });
    expect(events).toHaveLength(1);
  });

  it("emits and receives battleEnd events", () => {
    const events: unknown[] = [];
    battleEventBus.on("battleEnd", (data) => events.push(data));

    battleEventBus.emit("battleEnd", { winner: "player", rewards: { gold: 100, xp: 50 } });
    expect(events).toHaveLength(1);
  });

  it("emits and receives unitSpawn events", () => {
    const events: unknown[] = [];
    battleEventBus.on("unitSpawn", (data) => events.push(data));

    battleEventBus.emit("unitSpawn", { unitId: "u1", name: "Warrior", row: 0, col: 0, isEnemy: false });
    expect(events).toHaveLength(1);
  });

  it("does not deliver events to wrong listeners", () => {
    const attackEvents: unknown[] = [];
    battleEventBus.on("attack", (data) => attackEvents.push(data));
    battleEventBus.emit("death", { unitId: "u1" });

    expect(attackEvents).toHaveLength(0);
  });

  it("removes listeners", () => {
    const events: unknown[] = [];
    const fn = (data: unknown) => events.push(data);
    battleEventBus.on("attack", fn);
    battleEventBus.off("attack", fn);

    battleEventBus.emit("attack", { attackerId: "a1", targetId: "t1", damage: 10, type: "hit" });
    expect(events).toHaveLength(0);
  });

  it("removeAll clears all listeners", () => {
    const events: unknown[] = [];
    battleEventBus.on("attack", (data) => events.push(data));
    battleEventBus.on("death", (data) => events.push(data));
    battleEventBus.removeAll();

    battleEventBus.emit("attack", { attackerId: "a1", targetId: "t1", damage: 10, type: "hit" });
    battleEventBus.emit("death", { unitId: "u1" });
    expect(events).toHaveLength(0);
  });
});
