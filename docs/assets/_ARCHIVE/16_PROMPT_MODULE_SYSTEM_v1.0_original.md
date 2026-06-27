# PROMPT_MODULE_SYSTEM v1.0

Project:
Idle Kingdom Revolution

Purpose:
Defines how production prompts should be assembled from reusable modules instead of being written as one-off image descriptions.

---

## CORE PRINCIPLE

A production prompt is an asset export specification.

It is not just a visual description.

The prompt must describe:

- output format
- slicing rules
- visual identity
- immutable elements
- allowed evolution
- forbidden redesigns
- quality checks

---

## MODULE ORDER

Build prompts in this order:

```text
MASTER_VISUAL_SPEC
RENDER_CONTRACT_CHARACTERS
PRODUCTION_SPRITE_ATLAS_CONTRACT
REFERENCE_FRAME_SYSTEM
ASSET_TYPE_TEMPLATE
FACTION_MODULE
CLASS_MODULE
HERALDRY_OR_SYMBOL_LOCK
RARITY_DEFINITIONS
EFFECTS_CONTRACT
QUALITY_CHECK
NEGATIVE_PROMPT
```

Order matters. Global and immutable rules must appear before per-rarity descriptions.

---

## IMMUTABLE DESIGN RULES

Use an explicit immutable section whenever the same character, symbol, item, or silhouette must survive through rarity upgrades.

Recommended language:

```text
IMMUTABLE DESIGN RULES (NEVER CHANGE)
The following elements never change across rarity:
1. character face
2. body proportions
3. pose
4. camera
5. main silhouette
6. faction symbol
7. shield silhouette
8. weapon silhouette

Rarity evolution is only allowed to modify:
- material
- ornamentation
- glow
- gemstones
- engravings
- magical effects

It is forbidden to redesign, reinterpret, replace, or remove immutable elements.
```

---

## LOGO LOCK

For faction symbols, heraldry, chest emblems, shield marks, and brand-like shapes, describe the element as a logo.

Models often preserve a `logo` more reliably than a generic decorative motif.

Recommended language:

```text
The faction emblem is treated as a company logo.
It must be copied identically across every rarity.
Never redesign it.
Never reinterpret it.
Never replace it.
Only material, lighting, depth, and magical effects may evolve.
```

---

# BODY SCALE LOCK

The body scale is locked.

Every rarity uses the exact same body size.

Every rarity uses the exact same body width.

Every rarity uses the exact same body height.

Do not enlarge the character.

Do not shrink the character.

Visual effects do not affect body size.

Armor complexity does not affect body size.

Wings do not affect body size.

Auras do not affect body size.

Use Common rarity as the master scale reference.

The top of the head must remain at the same height.

The feet baseline must remain at the same height.

Only visual effects may extend beyond the body silhouette.

---

---

## RARITY CONTRACT

Rarity should be additive.

Every rarity inherits all previous approved elements.

Nothing disappears.

Nothing is redesigned.

Only additions and material upgrades are allowed.

Recommended language:

```text
RARITY CONTRACT
Every rarity inherits everything from the previous rarity.
Nothing disappears.
Nothing is redesigned.
Only additions are allowed.
```

---

## FINAL PROMPT STRATEGY

Store approved prompts as reusable references only after they pass visual review.

Experimental prompts should stay outside `PROMPTS.md` until accepted as Style Anchors or Production Anchors.

After a PoC is accepted, document the reusable contracts separately, then store the final prompt as a reproducible reference.
