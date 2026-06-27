# P1-07 Battle Fields — Spec

## Endpoints
- `GET /api/game/fields` — returns all battle field definitions

## Data
- `game_battle_fields` DB table
- 4 fields: Plains (easy), Forest (normal), Mountains (hard), Ice Land (brutal)
- Each has: id, name, description, difficulty, wave_count, boss_wave, recommended_power, rewards
