import type { Unit, Item, EquipmentSlot, UnitClass } from "@/types/game";
import { logger } from "@/lib/logger";

export interface EquipmentSlotInfo {
  slot: EquipmentSlot;
  label: string;
  classRestriction?: UnitClass[];
}

export const EQUIPMENT_SLOTS: EquipmentSlotInfo[] = [
  { slot: "weapon", label: "Weapon" },
  { slot: "armor", label: "Armor" },
  { slot: "helmet", label: "Helmet" },
  { slot: "accessory", label: "Accessory" },
];

export const EQUIPMENT_SLOT_LABELS: Record<EquipmentSlot, string> = {
  weapon: "Weapon",
  armor: "Armor",
  helmet: "Helmet",
  accessory: "Accessory",
};

export function calculateEquipmentStats(equipment: Record<string, string | undefined>, inventory: Item[]): { hp: number; attack: number; defense: number; speed: number } {
  const stats = { hp: 0, attack: 0, defense: 0, speed: 0 };

  for (const slot of Object.keys(equipment) as EquipmentSlot[]) {
    const itemId = equipment[slot];
    if (!itemId) continue;
    const item = inventory.find((i) => i.id === itemId);
    if (!item) continue;

    stats.hp += item.stats.hp ?? 0;
    stats.attack += item.stats.attack ?? 0;
    stats.defense += item.stats.defense ?? 0;
    stats.speed += item.stats.speed ?? 0;
  }

  return stats;
}

export function getUnitTotalStats(unit: Unit, inventory: Item[]): { hp: number; attack: number; defense: number; speed: number } {
  const equipStats = calculateEquipmentStats(unit.equipment, inventory);

  return {
    hp: unit.hp + equipStats.hp,
    attack: unit.attack + equipStats.attack,
    defense: unit.defense + equipStats.defense,
    speed: unit.speed + equipStats.speed,
  };
}

export function canEquipItem(unit: Unit, item: Item): boolean {
  if (item.rarity && !isAllowedRarity(item.rarity)) return false;
  return true;
}

function isAllowedRarity(_rarity: string): boolean {
  return true;
}

export function equipItem(unit: Unit, item: Item, inventory: Item[]): Unit {
  if (!canEquipItem(unit, item)) {
    logger.warn("Cannot equip item", "src/lib/game/equipment.ts", "equipItem", { unitId: unit.id, itemId: item.id });
    return unit;
  }

  const slot = mapItemTypeToSlot(item.type);
  if (!slot) {
    logger.warn("Item type has no slot", "src/lib/game/equipment.ts", "equipItem", { itemType: item.type });
    return unit;
  }

  const updated = { ...unit, equipment: { ...unit.equipment } };
  updated.equipment[slot] = item.id;

  logger.info("Item equipped", "src/lib/game/equipment.ts", "equipItem", { unitId: unit.id, itemId: item.id, slot });
  return updated;
}

export function unequipItem(unit: Unit, slot: EquipmentSlot): Unit {
  const updated = { ...unit, equipment: { ...unit.equipment } };
  delete updated.equipment[slot];
  logger.info("Item unequipped", "src/lib/game/equipment.ts", "unequipItem", { unitId: unit.id, slot });
  return updated;
}

function mapItemTypeToSlot(itemType: string): EquipmentSlot | null {
  const mapping: Record<string, EquipmentSlot> = {
    weapon: "weapon",
    armor: "armor",
    helmet: "helmet",
    accessory: "accessory",
  };
  return mapping[itemType] ?? null;
}
