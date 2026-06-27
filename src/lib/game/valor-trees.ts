export type PerkEffect = {
  type: "stat_boost" | "flat_bonus" | "reward_multi" | "cost_reduction";
  target: string;
  value: number;
}

export interface PerkDefinition {
  id: string;
  name: string;
  description: string;
  cost: number;
  maxLevel: number;
  requires: string[];
  effect: PerkEffect;
  icon: string;
}

export interface TreeDefinition {
  id: string;
  name: string;
  description: string;
  perks: Record<string, PerkDefinition>;
}

export const TREES: Record<string, TreeDefinition> = {
  combat_mastery: {
    id: "combat_mastery",
    name: "Combat Mastery",
    description: "Boost your units",
    perks: {
      iron_will: { id: "iron_will", name: "Iron Will", description: "+10% attack per level", cost: 100, maxLevel: 5, requires: [], effect: { type: "stat_boost", target: "attack", value: 10 }, icon: "sword" },
      steel_fortress: { id: "steel_fortress", name: "Steel Fortress", description: "+10% defense per level", cost: 100, maxLevel: 5, requires: [], effect: { type: "stat_boost", target: "defense", value: 10 }, icon: "shield" },
      marshal_order: { id: "marshal_order", name: "Marshal Order", description: "+10% all stats per level", cost: 200, maxLevel: 3, requires: ["iron_will","steel_fortress"], effect: { type: "stat_boost", target: "all", value: 10 }, icon: "flag" },
    },
  },
  economy_mastery: {
    id: "economy_mastery",
    name: "Economy Mastery",
    description: "Grow your wealth",
    perks: {
      gold_fleece: { id: "gold_fleece", name: "Gold Fleece", description: "+10% gold from battles per level", cost: 75, maxLevel: 5, requires: [], effect: { type: "reward_multi", target: "gold", value: 10 }, icon: "coin" },
      deep_mining: { id: "deep_mining", name: "Deep Mining", description: "+10% mining efficiency per level", cost: 75, maxLevel: 5, requires: [], effect: { type: "stat_boost", target: "mining_speed", value: 10 }, icon: "pick" },
      treasure_map: { id: "treasure_map", name: "Treasure Map", description: "+20% gold from expeditions per level", cost: 150, maxLevel: 3, requires: ["gold_fleece","deep_mining"], effect: { type: "reward_multi", target: "expedition_gold", value: 20 }, icon: "map" },
    },
  },
  quality_of_life: {
    id: "quality_of_life",
    name: "Quality of Life",
    description: "Daily quality bonuses",
    perks: {
      rested: { id: "rested", name: "Rested", description: "+20% offline earnings per level", cost: 50, maxLevel: 5, requires: [], effect: { type: "stat_boost", target: "offline_earnings", value: 20 }, icon: "zzz" },
      daily_pass: { id: "daily_pass", name: "Daily Pass", description: "+1 daily pass per level", cost: 50, maxLevel: 3, requires: [], effect: { type: "flat_bonus", target: "daily_passes", value: 1 }, icon: "ticket" },
      priority: { id: "priority", name: "Priority", description: "All perks cost 10% less per level", cost: 150, maxLevel: 3, requires: ["rested","daily_pass"], effect: { type: "cost_reduction", target: "all", value: 10 }, icon: "star" },
    },
  },
};
