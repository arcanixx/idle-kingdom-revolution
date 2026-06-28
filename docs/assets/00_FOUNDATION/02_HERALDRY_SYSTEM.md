# HERALDRY SYSTEM

Project:
Idle Kingdom Revolution

## PURPOSE

Defines faction symbols and heraldic consistency rules.

Faction symbols must remain visually consistent across all assets.

Applies to:

- Heroes
- NPCs
- Enemies
- Portraits
- Buildings
- UI

> **Scope note:** This document covers ONLY faction symbols / emblems / heraldry.
> Equipment silhouette rules (shield shape, staff shape, sword shape) live in
> the companion document: `03_EQUIPMENT_SILHOUETTE_LOCKS.md`. The two systems
> are related but distinct — heraldry is *what is drawn on* equipment, the
> silhouette lock is *the shape of* the equipment itself.

---

## HERALDRY LOCK

A faction emblem is immutable.

The emblem never changes shape.

The emblem never changes pose.

The emblem never changes identity.

Only the following may evolve:

- material
- depth
- ornamentation
- lighting
- magical effects

---

## EXAMPLE

Human Warrior

Common:
Flat painted gold standing lion on shield and chest.

Mythic:
Galaxy-shaped glowing gold lion on shield and chest.

The emblem (a standing, full-body lion) remains identical in shape and pose.

Only materials and effects evolve.

---

## FACTION SYMBOLS REFERENCE

See `00_FOUNDATION/00_ART_DIRECTION.md` → RACE VISUAL LANGUAGE for the full
table of motifs, colors, and heraldic symbols per Race. The table below shows
each Race's **default Faction** symbol — i.e. the symbol used by that Race's
first/main Faction (for Human, this is the Lion Kingdom; see
`00_FOUNDATION/00_ART_DIRECTION.md` → FACTION DESIGN GUIDE). A second
Faction within the same Race would define its own symbol here instead of
reusing the Race default.

| Race | Default Faction Heraldic Symbol |
|---------|-----------------|
| Human (Lion Kingdom) | Lion rampant (standing, full-body) on shield |
| Elf | Ancient oak with stars |
| Orc | Crossed tusks with axe |
| Undead | Cracked skull with crown |
| Demon | Horned skull with fire |
| Celestial | Eight-pointed star with eye |

**Rule:** The emblem must always be depicted as the full symbol (e.g. a complete
standing lion, not just a lion's head). Only material/finish/depth may evolve
across rarity — never the pose or composition of the symbol itself.

---

## EMPIRICAL NOTE: MEDALLION EMBLEMS VS FULL-BODY-POSE EMBLEMS

> Added 2026-06-27, after reviewing three generated rarity atlases.

**Observation:** the Lion Kingdom's full-body standing lion emblem degraded
to a head-only fragment at the Epic and/or Legendary rarity tier in **2 of
2** Lion Kingdom atlases reviewed so far
(`02_POC/HUMAN_LION_KINGDOM_WARRIOR_V3.md` and
`02_POC/ORC_LION_KINGDOM_TANK_V1.md`), despite HERALDRY LOCK explicitly
forbidding it. In contrast, the Iron Legion's emblem — a round medallion
showing a closed helm motif, not a full-body animal pose — held its full
composition across all six rarities with no degradation in
`02_POC/HUMAN_IRON_LEGION_RANGER_V1.md`.

This is a single comparison (one medallion-style Faction vs one full-body-pose
Faction), not yet a statistically confirmed pattern, but it's a strong
enough early signal to act on:

**Working hypothesis:** a full-body animal pose (an entire standing lion,
with head, body, legs, and tail all needing to stay in proportion and in
pose under added armor ornamentation at higher rarity) is harder for the
generator to preserve intact than a flatter, more medallion/crest-shaped
emblem (where there's no "pose" to lose — just a static, mostly symmetric
shape).

**Practical guidance for designing future Faction emblems:**

- Prefer **medallion, crest, or shield-shaped emblems** (a symbol contained
  within a simple geometric boundary — circle, shield outline, etc.) over
  **full-body animal poses** when designing a new Faction's heraldic symbol,
  specifically because medallion shapes appear more robust against
  Epic/Legendary-tier degradation based on this evidence.
- If a full-body animal pose is wanted for lore/branding reasons (as Lion
  Kingdom already is, and is too established to change now), expect to
  spend more QA/regeneration cycles on Epic and Legendary specifically, and
  treat Gate 5 in `03_PIPELINE/00_QA_ACCEPTANCE_GATES.md` as mandatory, not
  optional, for that Faction.
- This is a *design* recommendation, not a hard rule — Lion Kingdom keeps
  its lion regardless (changing an established Faction's identity over a
  generator limitation would be the wrong trade-off). This guidance applies
  to *new* Factions not yet locked in, such as any future Enemy/Lore
  Factions (see `00_ART_DIRECTION.md` → FACTION SCOPE).
- Revisit this hypothesis once a third or fourth Faction has been generated
  — if medallion-style emblems keep holding up and full-body poses keep
  degrading, promote this from "working hypothesis" to a stated design
  constraint in `00_ART_DIRECTION.md` → FACTION DESIGN GUIDE.
