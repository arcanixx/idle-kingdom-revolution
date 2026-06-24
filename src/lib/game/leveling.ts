import type { PlayerProfile } from "@/types/game";

export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function calculateLevel(xp: number): { level: number; currentXp: number; nextLevelXp: number; progress: number } {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpForLevel(level) && level < 999) {
    remaining -= xpForLevel(level);
    level++;
  }
  const needed = xpForLevel(level);
  return { level, currentXp: remaining, nextLevelXp: needed, progress: Math.min(1, remaining / needed) };
}

export function addXp(player: PlayerProfile, xp: number): { player: PlayerProfile; leveledUp: boolean; newLevel: number } {
  const totalXp = (player.xp || 0) + xp;
  const result = calculateLevel(totalXp);
  const leveledUp = result.level > (player.level || 1);
  return {
    player: { ...player, xp: totalXp, level: result.level },
    leveledUp,
    newLevel: result.level,
  };
}

export function calcPower(units: { attack: number; defense: number; hp: number; level: number }[]): number {
  return units.reduce((sum, u) => sum + Math.floor((u.attack * 2 + u.defense * 1.5 + u.hp * 0.5) * (1 + u.level * 0.1)), 0);
}