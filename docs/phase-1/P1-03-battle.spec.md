# P1-03 Battle System — Spec

## Endpoints
- `POST /api/battle/start` — full battle simulation, returns results + rewards
- `POST /api/battle/tick` — single tick (if turn-by-turn mode)
- `POST /api/battle/complete` — finalize battle, save rewards

## Core Logic (src/lib/game/battle-engine.ts)
- `startBattle(field, playerUnits, formation, seed?)` → BattleState
- `spawnWave(state, waveNum)` — spawns enemies for wave
- `processTick(state)` — one tick of combat
- `SeededRNG` — deterministic RNG for reproducible battles

## Enemies
- Templates: Goblin, Wolf, Skeleton, Dark Elf, Troll, Dark Mage
- Scaling: +15% stats per wave
- Boss: every 5th wave, 3x stats
