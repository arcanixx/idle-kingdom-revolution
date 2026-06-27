# P1-14 Battle Tests — Spec

## Test files
- `tests/unit/game/battle-engine.test.ts` — unit tests for battle logic
- `tests/unit/game/leveling.test.ts` — unit tests for leveling
- `tests/unit/game/economy.test.ts` — unit tests for economy

## Coverage
- `startBattle()`: valid/invalid formations, empty roster
- `processTick()`: victory, defeat, wave progression, boss waves
- `SeededRNG`: deterministic with same seed, different with different seed
- `calculateLevel()`: XP thresholds, level-up
- `calcOfflineEarnings()`: gold/xp for various wave counts
