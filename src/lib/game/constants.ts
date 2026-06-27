// Battle Engine Configuration Constants
// These constants can be adjusted to balance the game without modifying core logic

export const BATTLE_CONFIG = {
  // Wave scaling
  WAVE_SCALING_BASE: 1,
  WAVE_SCALING_FACTOR: 0.15,

  // Enemy spawning
  ENEMY_COUNT_BASE: 2,
  ENEMY_COUNT_MAX: 6,

  // Boss waves
  BOSS_WAVE_FREQUENCY: 5, // Every 5th wave is a boss
  BOSS_MULTIPLIER: 3, // Boss stats are 3x normal

  // Damage calculation
  DAMAGE_MIN_FACTOR: 0.2, // Minimum damage percentage
  DAMAGE_MAX_FACTOR: 0.8, // Maximum damage percentage
  DEFENSE_REDUCTION_FACTOR: 0.5, // Defense effectiveness

  // Battle rewards
  DEFAULT_WAVE_COUNT: 3,
  DEFAULT_REWARDS: {
    gold: 50,
    xp: 30,
  },

  // Unit formation
  FORMATION_ROWS: 2,
  FORMATION_COLS: 3,

  // XP calculation
  XP_BASE: 100,
  XP_GROWTH_FACTOR: 1.5,

  // Level rewards
  LEVEL_REWARD_BASE: 1,
  LEVEL_REWARD_FACTOR: 0.05, // 5% per level above 1
} as const;

export const BATTLE_MESSAGES = {
  VICTORY: "Victory!",
  DEFEAT: "Defeat!",
  NEXT_WAVE: "Next Wave",
  BATTLE_END: "Battle End",
  FIRST_BLOOD: "First Blood",
} as const;
