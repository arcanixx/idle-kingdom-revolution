# PROMPT_MODULE_SYSTEM v1.2

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
RACE_MODULE
FACTION_MODULE
CLASS_MODULE
GENDER_AND_BODY_TYPE_MODULE
HERALDRY_OR_SYMBOL_LOCK
EQUIPMENT_SILHOUETTE_LOCK
RARITY_DEFINITIONS
EFFECTS_CONTRACT
EFFECT_BOUNDARY
QUALITY_CHECK
NEGATIVE_PROMPT
```

Order matters. Global and immutable rules must appear before per-rarity descriptions.

> **v1.1 change log:** Added `GENDER_AND_BODY_TYPE_MODULE`, `EQUIPMENT_SILHOUETTE_LOCK`,
> and `EFFECT_BOUNDARY` to the module order. These were implicit or missing in
> v1.0 and are now explicit modules — see sections below.
>
> **v1.2 change log (2026-06-27):** Split `FACTION_MODULE` into
> `RACE_MODULE` + `FACTION_MODULE`. What was previously called "faction"
> (Human, Elf, Orc, Undead, Demon, Celestial) is now **Race** — it
> determines body, proportions, and age. **Faction** (e.g. "Lion Kingdom")
> is a separate, new axis determining color/heraldry/decoration, tied to one
> Race. See `00_FOUNDATION/00_ART_DIRECTION.md` → RACE, FACTION, AND CLASS
> for the full explanation and worked examples (including a multi-race
> Faction example: Human Fire Cult Mage vs Orc Fire Cult Mage). See
> RACE AND FACTION MODULE below for the prompt-writing rule.

---

## IMMUTABLE DESIGN RULES

Use an explicit immutable section whenever the same character, symbol, item, or silhouette must survive through rarity upgrades.

Recommended language:

```text
IMMUTABLE DESIGN RULES (NEVER CHANGE)
The following elements never change across rarity:
1. character face
2. body proportions (race)
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

## EFFECT BOUNDARY

Effects are secondary.

Effects never define character scale.

The body defines character scale.

Aura may grow.

Particles may grow.

Wings may grow.

Body scale remains fixed.

> **Relationship to BODY SCALE LOCK:** Body Scale Lock defines what must stay
> fixed (the body). Effect Boundary defines what is allowed to move (the
> effects) and makes explicit that effects growing larger across rarity is
> not a violation of Body Scale Lock — as long as the body itself never
> changes size. Use both modules together; they are two halves of the same
> rule, stated from opposite directions for prompt-writing clarity.

---

## RACE AND FACTION MODULE

> Added in v1.2. Previously, a single `faction:` field carried both species
> (Human, Elf, Orc...) and political allegiance (Lion Kingdom) at once —
> e.g. `faction: Human / Lion Kingdom` in early PoCs. This module makes Race
> and Faction two explicit, separate required inputs. See
> `00_FOUNDATION/00_ART_DIRECTION.md` → RACE, FACTION, AND CLASS for full
> background.

Every Hero rarity atlas prompt must explicitly declare both:

```text
race:
faction:
```

### Why this is required

Race and Faction change different things and must not be collapsed into one
field:

- **Race** controls body proportions, height offset, typical age range, and
  build (see `00_FOUNDATION/00_ART_DIRECTION.md` → Race Proportion Notes,
  Age Diversity). Race is never redesigned by rarity or by Faction.
- **Faction** controls color palette, heraldic symbol, and decoration
  language (see `00_FOUNDATION/00_ART_DIRECTION.md` → FACTION DESIGN GUIDE).
  A Faction belongs to one Race for Hero generation purposes, but the same
  Faction *name* and visual language could in principle apply across
  multiple Races for enemy/lore factions (e.g. a "Fire Cult" could have both
  Human and Orc members — same colors/symbol, different Race body).

Collapsing both into one "faction" field made it impossible to express two
Factions within the same Race (e.g. two rival Human kingdoms), and gave no
clean way to generate a multi-race enemy Faction.

### Rule

```text
RACE AND FACTION LOCK
Race defines body proportions, height, build, and apparent age range.
Faction defines color palette, heraldic symbol, and decoration language.
Race is never changed by Faction.
Faction is never changed by rarity.
Both Race and Faction stay identical across all six rarity slots.
```

### Per-race defaults (reference only)

See `00_FOUNDATION/00_ART_DIRECTION.md` → Race Proportion Notes for the full
table. Summary:

| Race | Height offset | Build notes |
|------|---------------|-------------|
| Human | 1.0 (baseline) | Athletic, balanced |
| Elf | +0.1 | Taller, slender, longer limbs |
| Orc | +0.2 | Wider, broader shoulders, shorter legs |
| Undead | 0.0 | Gaunt, narrower, hollow posture |
| Demon | +0.15 | Taller, muscular, wider horns |
| Celestial | +0.05 | Same height, more graceful |

### Faction scale note

Hero Factions (full asset matrix: 7 classes × 6 rarities × 3 states × 2
genders) and Enemy/Lore Factions (reduced asset matrix) are produced
differently — see `00_FOUNDATION/00_ART_DIRECTION.md` → FACTION DESIGN GUIDE
→ Faction scope. Do not default a new enemy Faction into the full Hero
production matrix without confirming the scale first — file size adds up
fast (a single Hero family already runs into the hundreds of KB per rarity
atlas; thousands of enemy-faction sprites at full Hero treatment would not
be sustainable).

---

## GENDER AND BODY TYPE MODULE

> Added in v1.1. Earlier production prompts (including the original Human
> Warrior PoC v3) did not explicitly lock gender or body type, which left
> this undefined per-generation. This module makes gender and body type an
> explicit, required input for every new Hero rarity atlas — the same way
> faction and class already are.

Every Hero rarity atlas prompt must explicitly declare:

```text
gender:
body_type:
apparent_age_range:
```

### Why this is required

Without an explicit lock, gender and body build can drift between rarity
slots in the same atlas (e.g. Row 1 reads as more masculine than Row 2), or
drift between generations of the same character (Common male, Mythic
androgynous). This breaks HERO IDENTITY just as much as a changing face does.

### Rule

```text
GENDER AND BODY TYPE LOCK
Every sprite slot depicts the exact same gender presentation.
Every sprite slot depicts the exact same body type and build.
Every sprite slot depicts the exact same apparent age range.
Gender, body type, and age never change across rarity.
Only equipment, materials, and magical effects evolve.
```

### Per-class defaults (reference only — override per Hero as needed)

These defaults follow `00_FOUNDATION/00_ART_DIRECTION.md` (Age Diversity,
Race Proportion Notes). They are starting points, not hard limits — every
class is available in both genders.

| Class | Typical body build | Typical age range |
|-------|--------------------|--------------------|
| Warrior | Athletic, balanced heroic build | 20–40 |
| Mage | Slender to average, less muscular than Warrior | 30–60 |
| Tank | Widest/heaviest build of all classes | 25–45 |
| Healer | Average, calm posture | 25–55 |
| Ranger | Lean, agile build | 20–40 |
| Assassin | Slim, compact build | 20–35 |
| Support | Average build, ornamental equipment focus | 25–50 |

> These are **Class** defaults layered on top of **Race** defaults (see
> RACE AND FACTION MODULE above). A Race's height/build offset still
> applies on top of the class build — e.g. an Orc Mage is still visibly
> wider/shorter-legged than a Human Mage, even though both follow the same
> "slender to average, less muscular than Warrior" class guidance relative
> to their own Race baseline.

### Two-gender production rule

Per `09_ASSET_LIST_REFERENCE.md` / `05_REFERENCE/00_ASSET_LIST_REFERENCE.md`,
Hero assets are produced for **both genders** (Male and Female) for every
race+faction+class combination in active rotation. This means:

- Every Hero rarity atlas factory run produces TWO atlases per
  race+faction+class: one Male, one Female.
- Both atlases must independently satisfy BODY SCALE LOCK (each gender has
  its own master Common-rarity scale reference — a Female Common atlas is the
  scale reference for Female Uncommon→Mythic, not the Male one).
- Face, hairstyle, and build differ between the Male and Female atlas of the
  same Hero, but each atlas internally locks its own face/build across all
  six rarity slots (standard HERO IDENTITY rule, applied per-gender).
- Naming follows `{race}_{faction}_{class}_{gender}_{rarity}_{state}.webp`
  (updated in v1.2 from `{faction}_{class}_{gender}_{rarity}_{state}.webp` to
  add the Race segment — see
  `03_PIPELINE/01_ATLAS_TO_ASSET_PIPELINE.md` for the full naming spec,
  which should be updated to match when Race/Faction production actually
  starts) — gender is already a first-class part of the filename; this
  module ensures it is also a first-class part of the *prompt*, not just the
  *output filename*.

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

Experimental prompts should stay outside the POC folder until accepted as Style Anchors or Production Anchors.

After a PoC is accepted, document the reusable contracts separately, then store the final prompt as a reproducible reference in `02_POC/`.
