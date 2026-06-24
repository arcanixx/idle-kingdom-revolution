export interface PlayerCurrencies {
  gold: number;
  valor: number;
  gems: number;
  battle_coins: number;
}

export type UnitClass = "warrior" | "ranger" | "mage" | "tank" | "healer" | "assassin" | "support";
export type UnitFaction = "human" | "elf" | "orc" | "undead" | "demon" | "celestial";
export type UnitRarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic";

export interface Unit {
  id: string; unit_id: string; name: string; class: UnitClass; faction: UnitFaction;
  rarity: UnitRarity; level: number; xp: number; hp: number; attack: number;
  defense: number; speed: number;
  equipment: { weapon?: string; armor?: string; accessory?: string; };
  formation_row?: number; formation_col?: number; power_rating: number;
}

export type BattleResult = "victory" | "defeat" | "retreat";
export type Difficulty = "easy" | "normal" | "hard" | "brutal";

export interface BattleField {
  id: number; name: string; description: string; difficulty: number;
  wave_count: number; boss_wave: number; recommended_power: number;
  rewards: Record<string, number>; is_locked: boolean;
}

export interface PlayerProfile {
  id: string; user_id: string; display_name: string; level: number;
  xp: number; currencies: PlayerCurrencies; highest_wave: number;
  highest_field_id: number; last_online_at: string;
}

export interface Quest {
  id: number; title: string; description: string;
  quest_type: "story"|"daily"|"weekly"|"side"|"event";
  objectives: Array<{type:string;target_value:number}>;
  rewards: Record<string, number>;
  status: "locked"|"active"|"completed"|"claimed";
  progress: Record<string, number>;
}

export type ItemType = "weapon"|"armor"|"accessory"|"consumable"|"material"|"cosmetic";
export interface Item { id: string; name: string; type: ItemType; rarity: UnitRarity; stats: Record<string, number>; quantity: number; }

export type MiniGameType = "coal_mine"|"tower_defense"|"castle_defense";
export interface DailyPassInfo { game_type: MiniGameType; passes_used: number; max_passes: number; next_reset: string; }
export interface MineExpedition { id: string; unit_ids: string[]; duration_minutes: number; started_at: string; completes_at: string; mine_level: number; }
export interface CastleState { castle_hp: number; max_castle_hp: number; wall_level: number; gate_level: number; tower_level: number; moat_level: number; barracks_level: number; }
export interface TDProgress { fortress_level: number; highest_wave: number; total_wins: number; }
export type FormationCell = { unit_id: string; row: number; col: number; };
export type Formation = Record<'front'|'back', (FormationCell | null)[]>;

export interface BattleResultData {
  result: 'victory'|'defeat'|'retreat';
  waves_cleared: number;
  total_waves: number;
  rewards: Record<string, number>;
  battle_log: string[];
  xp_gained: number;
  units_survived: string[];
}