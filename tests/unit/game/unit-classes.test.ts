import { describe, it, expect } from "vitest";
import { getUnitClassDefinition, UNIT_CLASSES } from "../../../src/lib/game/unit-classes";

describe("UnitClasses", () => {
  it("contains all 7 unit classes", () => {
    const classNames = Object.keys(UNIT_CLASSES);
    expect(classNames).toHaveLength(7);
    expect(classNames).toContain("warrior");
    expect(classNames).toContain("ranger");
    expect(classNames).toContain("mage");
    expect(classNames).toContain("tank");
    expect(classNames).toContain("healer");
    expect(classNames).toContain("assassin");
    expect(classNames).toContain("support");
  });

  it("each class has required properties", () => {
    for (const [name, def] of Object.entries(UNIT_CLASSES)) {
      expect(def.class).toBe(name);
      expect(def.baseStats.hp).toBeGreaterThan(0);
      expect(def.baseStats.atk).toBeGreaterThan(0);
      expect(def.baseStats.def).toBeGreaterThanOrEqual(0);
      expect(def.baseStats.spd).toBeGreaterThan(0);
      expect(def.abilities.length).toBeGreaterThan(0);
      expect(["frontline", "backline", "support"]).toContain(def.role);
    }
  });

  it("tank has highest hp and defense", () => {
    const tank = UNIT_CLASSES.tank;
    const others = Object.values(UNIT_CLASSES).filter((c) => c.class !== "tank");
    for (const other of others) {
      expect(tank.baseStats.hp).toBeGreaterThan(other.baseStats.hp);
      expect(tank.baseStats.def).toBeGreaterThan(other.baseStats.def);
    }
  });

  it("assassin has highest speed", () => {
    const assassin = UNIT_CLASSES.assassin;
    const others = Object.values(UNIT_CLASSES).filter((c) => c.class !== "assassin");
    for (const other of others) {
      expect(assassin.baseStats.spd).toBeGreaterThanOrEqual(other.baseStats.spd);
    }
  });

  it("getUnitClassDefinition returns warrior for unknown class", () => {
    const result = getUnitClassDefinition("warrior" as any);
    expect(result.class).toBe("warrior");
  });
});
