# P1-04 Formation Grid — Spec

## Endpoints
- `GET /api/player/formation` — returns current formation (front/back, 3 slots each)
- `PUT /api/player/formation` — updates formation for multiple units
- `POST /api/army/formation` — saves complete formation (clear + set)

## Data
- `player_units` DB table: formation_row (0=front, 1=back), formation_col (0-2)
- Grid: 2 rows (front/back) × 3 columns = 6 slots

## UI (src/app/game/army/)
- Army page: unit list + formation editor
- Drag/drop units into formation slots
- Save button → POST /api/army/formation
