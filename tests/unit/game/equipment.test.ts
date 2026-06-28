import { describe, it, expect } from "vitest";
import {
  calculateEquipmentStats,
  equipItem,
  unequipItem,
  EQUIPMENT_SLOTS,
} from "../../../src/lib/game/equipment";
import type { Unit, Item } from "../../../src/types/game";

describe("Equipment", () => {
  const baseUnit: Unit = {
    id: "u1", unit_id: "u1", name: "Test", class: "warrior", faction: "human",
    rarity: "common", level: 1, xp: 0, hp: 100, attack: 10, defense: 5,
    speed: 100, isActive: true, equipment: { weapon: undefined, armor: undefined, helmet: undefined, accessory: undefined }, power_rating: 50,
  };

  const sword: Item = {
    id: "sword_1", name: "Iron Sword", type: "weapon", rarity: "common",
    stats: { attack: 5 }, quantity: 1,
  };

  const shield: Item = {
    id: "shield_1", name: "Wooden Shield", type: "armor", rarity: "common",
    stats: { defense: 3, hp: 10 }, quantity: 1,
  };

  it("EQUIPMENT_SLOTS has 4 slots", () => {
    expect(EQUIPMENT_SLOTS).toHaveLength(4);
    const slotNames = EQUIPMENT_SLOTS.map((s) => s.slot);
    expect(slotNames).toContain("weapon");
    expect(slotNames).toContain("armor");
    expect(slotNames).toContain("helmet");
    expect(slotNames).toContain("accessory");
  });

  it("calculateEquipmentStats returns zeros when no equipment", () => {
    const stats = calculateEquipmentStats({}, []);
    expect(stats).toEqual({ hp: 0, attack: 0, defense: 0, speed: 0 });
  });

  it("calculateEquipmentStats sums item stats", () => {
    const unit = equipItem(baseUnit, sword, [sword]);
    const stats = calculateEquipmentStats(unit.equipment, [sword]);
    expect(stats.attack).toBe(5);
  });

  it("calculateEquipmentStats accumulates from multiple items", () => {
    let unit = equipItem(baseUnit, sword, [sword]);
    unit = equipItem(unit, shield, [shield]);
    const stats = calculateEquipmentStats(unit.equipment, [sword, shield]);
    expect(stats.attack).toBe(5);
    expect(stats.defense).toBe(3);
    expect(stats.hp).toBe(10);
  });

  it("equipItem assigns item to correct slot", () => {
    const updated = equipItem(baseUnit, sword, [sword]);
    expect(updated.equipment.weapon).toBe("sword_1");
  });

  it("equipItem replaces existing item in slot", () => {
    const betterSword: Item = {
      id: "sword_2", name: "Steel Sword", type: "weapon", rarity: "rare",
      stats: { attack: 10 }, quantity: 1,
    };
    let updated = equipItem(baseUnit, sword, [sword]);
    expect(updated.equipment.weapon).toBe("sword_1");
    updated = equipItem(updated, betterSword, [betterSword, sword]);
    expect(updated.equipment.weapon).toBe("sword_2");
  });

  it("unequipItem removes item from slot", () => {
    let updated = equipItem(baseUnit, sword, [sword]);
    updated = unequipItem(updated, "weapon");
    expect(updated.equipment.weapon).toBeUndefined();
  });

  it("unequipItem does not affect other slots", () => {
    let updated = equipItem(baseUnit, sword, [sword]);
    updated = equipItem(updated, shield, [shield]);
    updated = unequipItem(updated, "weapon");
    expect(updated.equipment.weapon).toBeUndefined();
    expect(updated.equipment.armor).toBe("shield_1");
  });
});
