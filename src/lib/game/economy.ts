export interface RewardBase {
  gold: number;
  xp: number;
  valor: number;
  battle_coins: number;
}

export const BASE_REWARDS: Record<string, RewardBase> = {
  plains:   { gold: 50, xp: 30, valor: 0, battle_coins: 1 },
  forest:   { gold: 80, xp: 50, valor: 1, battle_coins: 2 },
  mountain: { gold: 120, xp: 70, valor: 2, battle_coins: 3 },
  desert:  { gold: 180, xp: 100, valor: 3, battle_coins: 4 },
  ice:     { gold: 250, xp: 140, valor: 5, battle_coins: 5 },
};

export const BATTLE_LEVEL_MAP = {
  plains: 1, forest: 2, mountain: 3, desert: 4, ice: 5,
};

export function getRewardMultiplier(level: number): number {
  return 1 + (level - 1) * 0.05; // +5% per level
}

export function calcRewards(fieldKey: keyof typeof BASE_REWARDS, level: number): RewardBase {
  const base = BASE_REWARDS[fieldKey] || BASE_REWARDS.plains;
  const multi = getRewardMultiplier(level);
  return {
    gold: Math.floor(base.gold * multi),
    xp: Math.floor(base.xp * multi),
    valor: Math.floor(base.valor * multi),
    battle_coins: Math.floor(base.battle_coins * multi),
  };
}

export function calcOfflineEarnings(highestWave: number, hoursOffline: number, level: number): { gold: number; xp: number; } {
  const rate = Math.max(1, highestWave) * 10; // 10 gold/per wave per hour
  const gold = Math.floor(rate * hoursOffline * getRewardMultiplier(level));
  const xp = Math.floor(highestWave * 5 * hoursOffline * getRewardMultiplier(level));
  return { gold, xp };
}
