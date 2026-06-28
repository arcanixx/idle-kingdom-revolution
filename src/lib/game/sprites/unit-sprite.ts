import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { createPlaceholderSprite, type PlaceholderClass } from "@/lib/game/asset-loader";
import { logger } from "@/lib/logger";

export class UnitSprite extends Container {
  public unitId: string;
  public unitName: string;
  public isEnemy: boolean;
  public row: number;
  public col: number;

  private sprite: Container;
  private hpBar: Graphics;
  private nameText: Text;
  private maxHp: number;
  currentHp: number;

  constructor(unitId: string, unitName: string, unitClass: string, isEnemy: boolean, row: number, col: number, maxHp: number) {
    super();

    this.unitId = unitId;
    this.unitName = unitName;
    this.isEnemy = isEnemy;
    this.row = row;
    this.col = col;
    this.maxHp = maxHp;
    this.currentHp = maxHp;

    const placeholderClass = this.mapClass(unitClass);
    this.sprite = createPlaceholderSprite(placeholderClass, 56);
    this.sprite.y = isEnemy ? -8 : 8;
    this.addChild(this.sprite);

    this.nameText = new Text({
      text: unitName,
      style: new TextStyle({ fontSize: 10, fill: isEnemy ? 0xff8888 : 0x88ff88 }),
    });
    this.nameText.anchor.set(0.5, 0);
    this.nameText.y = 32;
    this.addChild(this.nameText);

    this.hpBar = new Graphics();
    this.addChild(this.hpBar);
    this.drawHpBar();

    logger.debug("UnitSprite created: " + unitName, "src/lib/game/sprites/unit-sprite.ts", "constructor", { unitId, isEnemy });
  }

  private mapClass(unitClass: string): PlaceholderClass {
    const mapping: Record<string, PlaceholderClass> = {
      warrior: "warrior", ranger: "archer", mage: "mage",
      tank: "tank", healer: "healer", assassin: "rogue", rogue: "rogue",
    };
    return mapping[unitClass.toLowerCase()] ?? "warrior";
  }

  updateHp(hp: number): void {
    this.currentHp = Math.max(0, hp);
    this.drawHpBar();
  }

  private drawHpBar(): void {
    const barWidth = 56;
    const barHeight = 5;
    const ratio = this.maxHp > 0 ? this.currentHp / this.maxHp : 0;

    this.hpBar.clear();
    this.hpBar.rect(-barWidth / 2, -34, barWidth, barHeight).fill(0x330000);
    const hpColor = ratio > 0.5 ? 0x00cc44 : ratio > 0.25 ? 0xffaa00 : 0xcc2200;
    this.hpBar.rect(-barWidth / 2, -34, barWidth * ratio, barHeight).fill(hpColor);
  }

  async playAttack(targetX: number, targetY: number): Promise<void> {
    const origX = this.x;
    const origY = this.y;
    const dx = (targetX - origX) * 0.3;
    const dy = (targetY - origY) * 0.3;
    const steps = 8;

    for (let i = 0; i <= steps; i++) {
      this.x = origX + (dx * i) / steps;
      this.y = origY + (dy * i) / steps;
      await new Promise((r) => setTimeout(r, 16));
    }
    await new Promise((r) => setTimeout(r, 80));
    for (let i = steps; i >= 0; i--) {
      this.x = origX + (dx * i) / steps;
      this.y = origY + (dy * i) / steps;
      await new Promise((r) => setTimeout(r, 16));
    }
  }

  async playDeath(): Promise<void> {
    for (let i = 10; i >= 0; i--) {
      this.alpha = i / 10;
      await new Promise((r) => setTimeout(r, 50));
    }
    this.destroy();
  }
}
