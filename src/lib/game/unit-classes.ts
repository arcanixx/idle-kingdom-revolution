import type { UnitClass } from "@/types/game";

export interface UnitClassDefinition {
  class: UnitClass;
  baseStats: { hp: number; atk: number; def: number; spd: number };
  abilities: string[];
  spritePrefix: string;
  role: "frontline" | "backline" | "support";
}

export const UNIT_CLASSES: Record<UnitClass, UnitClassDefinition> = {
  warrior: {
    class: "warrior",
    baseStats: { hp: 120, atk: 15, def: 12, spd: 100 },
    abilities: ["power_strike", "shield_bash"],
    spritePrefix: "unit_warrior",
    role: "frontline",
  },
  ranger: {
    class: "ranger",
    baseStats: { hp: 70, atk: 18, def: 6, spd: 140 },
    abilities: ["quick_shot", "rain_of_arrows"],
    spritePrefix: "unit_ranger",
    role: "backline",
  },
  mage: {
    class: "mage",
    baseStats: { hp: 60, atk: 22, def: 4, spd: 110 },
    abilities: ["fireball", "frost_nova"],
    spritePrefix: "unit_mage",
    role: "backline",
  },
  tank: {
    class: "tank",
    baseStats: { hp: 200, atk: 8, def: 25, spd: 60 },
    abilities: ["taunt", "fortify"],
    spritePrefix: "unit_tank",
    role: "frontline",
  },
  healer: {
    class: "healer",
    baseStats: { hp: 80, atk: 10, def: 8, spd: 120 },
    abilities: ["heal", "cleanse"],
    spritePrefix: "unit_healer",
    role: "support",
  },
  assassin: {
    class: "assassin",
    baseStats: { hp: 65, atk: 20, def: 5, spd: 160 },
    abilities: ["backstab", "shadow_step"],
    spritePrefix: "unit_assassin",
    role: "backline",
  },
  support: {
    class: "support",
    baseStats: { hp: 90, atk: 12, def: 10, spd: 105 },
    abilities: ["inspire", "barrier"],
    spritePrefix: "unit_support",
    role: "support",
  },
};

export function getUnitClassDefinition(unitClass: UnitClass): UnitClassDefinition {
  return UNIT_CLASSES[unitClass] ?? UNIT_CLASSES.warrior;
}
