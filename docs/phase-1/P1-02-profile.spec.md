# P1-02 Player Profile — Spec

## Endpoints
- `GET /api/player/profile` — returns profile (level, xp, currencies)
- `PATCH /api/player/profile` — update display_name, avatar

## Data
- `players` DB table: id, user_id, display_name, level, xp, gold, valor, gems, battle_coins, highest_wave, highest_field_id, last_online_at

## Logic (src/lib/game/leveling.ts)
- `calculateLevel(xp)` — determines level from cumulative XP
- `addXp(player, amount)` — adds XP, returns level-up info if any
- `calcPower(unit)` — power rating from stats + level
