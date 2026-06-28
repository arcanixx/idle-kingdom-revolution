import { logger } from "@/lib/logger";

export type AttackEvent = { attackerId: string; targetId: string; damage: number; type: "hit" | "miss" | "crit" };
export type DeathEvent = { unitId: string };
export type BattleEndEvent = { winner: "player" | "enemy"; rewards: { gold: number; xp: number } };
export type UnitSpawnEvent = { unitId: string; name: string; row: number; col: number; isEnemy: boolean };

export type BattleEventType = "attack" | "death" | "battleEnd" | "unitSpawn";

export type BattleEventPayload = AttackEvent | DeathEvent | BattleEndEvent | UnitSpawnEvent;

type Listener = (data: unknown) => void;

class BattleEventBus {
  private listeners: Map<BattleEventType, Set<Listener>> = new Map();

  on(event: BattleEventType, fn: Listener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(fn);
  }

  off(event: BattleEventType, fn: Listener): void {
    this.listeners.get(event)?.delete(fn);
  }

  emit(event: BattleEventType, data: BattleEventPayload): void {
    this.listeners.get(event)?.forEach((fn) => fn(data));
    logger.debug("Event emitted: " + event, "src/lib/game/battle-event-emitter.ts", "emit", { event, data });
  }

  removeAll(): void {
    this.listeners.clear();
  }
}

export const battleEventBus = new BattleEventBus();
