# P1-09 Unit Leveling — Spec

## Logic (src/lib/game/leveling.ts)
- `calculateLevel(xp)` — returns level based on cumulative XP thresholds
- `addXp(player, amount)` — grants XP, triggers level-up if threshold crossed
- `calcPower(unit)` — power_rating from (hp + attack*2 + defense*3 + speed*0.5) × (1 + level*0.1)

## Endpoints
- `PATCH /api/player/units/:id/level` — level up a specific unit
- `GET /api/player/units` — returns all player units with current level/xp
