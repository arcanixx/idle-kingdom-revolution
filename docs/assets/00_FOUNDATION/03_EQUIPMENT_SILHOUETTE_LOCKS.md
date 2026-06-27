# EQUIPMENT SILHOUETTE LOCKS

Project:
Idle Kingdom Revolution

## PURPOSE

Defines silhouette-lock rules for class equipment (shields, staves, swords, and
other weapon/offhand types). These rules keep equipment *shape* stable across
rarity tiers, independent of the *heraldry* drawn on top of that equipment.

> **Scope note:** This document covers ONLY equipment silhouette (the physical
> shape of shields, staves, swords, etc). Faction symbols / emblems live in the
> companion document: `02_HERALDRY_SYSTEM.md`. Keep the two separate:
> - Heraldry = what is drawn ON the equipment (a lion, a skull, a star)
> - Silhouette Lock = the SHAPE of the equipment itself (kite shield, staff length)

This distinction matters because the two evolve independently:
- A shield's **shape** is fixed by class (see CLASS EQUIPMENT LOCK below).
- A shield's **surface** (heraldry, decoration, material) evolves with rarity.

---

## SHIELD SILHOUETTE LOCK

Shield Shape and Shield Surface are independent systems.

**Shield Shape:**
Defines physical shield silhouette. Belongs to class design, not rarity.

**Shield Surface:**
Defines heraldry, decoration, and effects. Evolves with rarity.

Shape never changes because of rarity.

Surface may evolve because of rarity.

### CLASS EQUIPMENT LOCK (Shields)

Shield shape belongs to class design. Not rarity.

| Class | Shield Shape |
|-------|--------------|
| Warrior | Kite Shield |
| Paladin | Heater Shield |
| Guardian | Tower Shield |
| Infantry | Round Shield |
| Knight | Kite Shield |
| Templar | Heater Shield |

Rarity never changes shield shape.
Class defines shield shape.
Rarity defines shield quality (surface, material, glow, gems).

### Example — Human Warrior

| Rarity | Shield |
|--------|--------|
| Common | Blue Kite Shield |
| Mythic | Blue Kite Shield |

The shape remains identical across all six rarities. Only materials and
effects evolve.

---

## STAFF SILHOUETTE LOCK

The staff silhouette is immutable.

The staff remains the same length.

The staff remains the same shape.

The staff remains the same proportions.

Only the following may evolve:

- materials
- ornaments
- magical effects

Rarity must never redesign the staff silhouette.

> Used by: Mage, Healer, Shaman, and any future staff-wielding class.
> First applied in `02_POC/HUMAN_MAGE_V1.md`.

---

## SWORD / WEAPON SILHOUETTE LOCK (general principle)

The same lock principle applies to all class-defining weapons, not only
shields and staves. When defining a new class+weapon combination, add a
silhouette-lock entry here following this pattern:

```text
{WEAPON} SILHOUETTE LOCK

The {weapon} silhouette is immutable.
The {weapon} remains the same length / shape / proportions across all rarity.
Only materials, decorations, and magical effects may evolve.
Rarity must never redesign the {weapon} silhouette.
```

### Known weapon locks

| Class | Weapon | Lock summary |
|-------|--------|--------------|
| Warrior | Longsword | Same blade length/shape across rarity; only material/runes/glow evolve |
| Mage | Staff | See STAFF SILHOUETTE LOCK above |
| Tank | Mace / Hammer | Head size and haft length fixed; only material/engravings evolve |
| Ranger | Bow | Curve and draw length fixed; only material/string glow evolve |
| Assassin | Dual blades | Blade length/shape fixed; only material/edge glow evolve |

Add new rows here as new classes are produced — do not create a new file per
weapon type.

---

## WHY THIS SEPARATION MATTERS

Before this split, `22_HERALDRY_SYSTEM.md` mixed two unrelated concerns in one
file: faction emblems (heraldry) and equipment shape rules (silhouette locks).
This caused confusion about where a new lock (e.g. for a staff or a new weapon)
should live. The rule going forward:

- New faction symbol / emblem rule → `02_HERALDRY_SYSTEM.md`
- New equipment shape rule (shield/staff/sword/bow/etc) → this file
