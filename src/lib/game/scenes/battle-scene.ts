import { Container } from "pixi.js";
import { battleEventBus, type AttackEvent, type DeathEvent, type BattleEndEvent, type UnitSpawnEvent } from "@/lib/game/battle-event-emitter";
import { UnitSprite } from "@/lib/game/sprites/unit-sprite";
import { spawnFloatingText } from "@/lib/game/sprites/floating-text";
import { logger } from "@/lib/logger";

const GRID_COLS = 4;
const GRID_ROWS = 2;
const CELL_W = 100;
const CELL_H = 100;
const OFFSET_X = 180;
const OFFSET_Y = 60;

export class BattleScene {
  private stage: Container;
  private unitSprites: Map<string, UnitSprite> = new Map();
  private battleContainer: Container;

  constructor(stage: Container) {
    this.stage = stage;
    this.battleContainer = new Container();
    this.battleContainer.x = OFFSET_X;
    this.battleContainer.y = OFFSET_Y;
    stage.addChild(this.battleContainer);

    this.registerListeners();
    logger.info("BattleScene initialized", "src/lib/game/scenes/battle-scene.ts", "constructor");
  }

  private registerListeners(): void {
    battleEventBus.on("unitSpawn", (data) => this.handleUnitSpawn(data as UnitSpawnEvent));
    battleEventBus.on("attack", (data) => this.handleAttack(data as AttackEvent));
    battleEventBus.on("death", (data) => this.handleDeath(data as DeathEvent));
    battleEventBus.on("battleEnd", (data) => this.handleBattleEnd(data as BattleEndEvent));
  }

  private getGridPosition(row: number, col: number): { x: number; y: number } {
    return {
      x: col * CELL_W + CELL_W / 2,
      y: row * CELL_H + CELL_H / 2 + (row === 0 ? -20 : 20),
    };
  }

  private handleUnitSpawn(data: UnitSpawnEvent): void {
    const sprite = new UnitSprite(data.unitId, data.name, "warrior", data.isEnemy, data.row, data.col, 100);
    const pos = this.getGridPosition(data.row, data.col);
    sprite.x = pos.x;
    sprite.y = pos.y;
    this.battleContainer.addChild(sprite);
    this.unitSprites.set(data.unitId, sprite);
    logger.debug("Unit spawned in scene: " + data.name, "src/lib/game/scenes/battle-scene.ts", "handleUnitSpawn");
  }

  private handleAttack(data: AttackEvent): void {
    const attacker = this.unitSprites.get(data.attackerId);
    const target = this.unitSprites.get(data.targetId);
    if (!attacker || !target) return;

    spawnFloatingText(this.battleContainer, target.x, target.y - 20, data.damage, data.type === "miss" ? "miss" : "damage");
    attacker.playAttack(target.x, target.y).catch(() => {});
    target.updateHp(target.currentHp - data.damage);
  }

  private handleDeath(data: DeathEvent): void {
    const sprite = this.unitSprites.get(data.unitId);
    if (!sprite) return;
    sprite.playDeath().then(() => {
      this.unitSprites.delete(data.unitId);
    }).catch(() => {});
  }

  private handleBattleEnd(data: BattleEndEvent): void {
    logger.info("Battle ended: " + data.winner + " wins", "src/lib/game/scenes/battle-scene.ts", "handleBattleEnd");
  }

  destroy(): void {
    this.battleContainer.destroy({ children: true });
  }
}
