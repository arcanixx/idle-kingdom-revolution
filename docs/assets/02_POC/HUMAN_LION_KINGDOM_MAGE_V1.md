# HUMAN_MAGE_V1

Project:
Idle Kingdom Revolution

Status:
Framework test PoC. Purpose: verify that the production system built for
Human Warrior (`HUMAN_WARRIOR_V3.md`) generalizes to a second class without
needing ad-hoc fixes — and, unlike the first informal Mage draft, this PoC
explicitly locks gender, body type, and age so the test actually exercises
those dimensions instead of only swapping the weapon.

Purpose:
This is intentionally a real test, not a cosmetic palette-swap. Human
Warrior and Human Mage differ in:

- body build (athletic vs slender — see `00_FOUNDATION/00_ART_DIRECTION.md`)
- apparent age range (20–40 vs 30–60)
- weapon silhouette (longsword+shield vs staff, no offhand shield)
- armor weight (medium plate vs light robes)

If this PoC passes without needing changes outside the modules already
defined in `01_PRODUCTION_SYSTEM/`, that confirms the framework generalizes.
If it needs an undocumented fix, that fix must be added back into
`01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` or
`00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md` — not patched only here.

---

## INPUT TABLE

```text
faction: Human / Lion Kingdom
class: Mage
gender: Female              # see GENDER VARIANT NOTE below — run Male as a second atlas using this same file with gender swapped
body_type: slender, average build, NOT athletic/muscular like Warrior — robes-appropriate frame
apparent_age_range: 30-50 (mature, not elderly — per 00_FOUNDATION/00_ART_DIRECTION.md Age Diversity table for Mage: 30-60)
primary_symbol: small standing heraldic lion on chest
secondary_symbol: none for Common/Uncommon; crystal motif appears Rare+
main_weapon: wooden staff (Common) evolving to starlight staff (Mythic)
offhand_or_focus: none (Mage carries no shield; off-hand is empty / free for spell gestures)
base_colors: blue, silver, gold (same Lion Kingdom palette as Warrior, lighter/cooler weighting)
rarity_theme: arcane apprentice -> royal battle-mage -> celestial -> cosmic
forbidden_shapes: round shield, tower shield, halo, sword (Mage never holds a blade), shortened staff, staff redesigned as wand
weapon_silhouette_lock: the staff's total length, shaft thickness, and head/crystal-mount shape stay identical across all six rarities — see 00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md → STAFF SILHOUETTE LOCK
```

### GENDER VARIANT NOTE

Per `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` → GENDER AND BODY TYPE
MODULE, Hero assets are produced for both genders. This file runs the
**Female** atlas first. Once accepted, copy this file's FINAL PROMPT, change
only the `GENDER AND BODY TYPE LOCK` block to `Male`, adjust
`apparent_age_range` if desired (Male Mage can skew slightly older per art
direction), and save as a second reviewed prompt in this same file under a
`## MALE VARIANT` heading — do not create a separate file per gender; gender
is a parameter of one Hero, not a different Hero.

---

## FINAL PROMPT (Female)

```text
PROJECT
Idle Kingdom Revolution

ASSET TYPE
Production Sprite Atlas

------------------------------------------------------------

OUTPUT
Generate ONE production sprite atlas.

Resolution:
2048 x 1365

Aspect Ratio:
3:2

Exactly six heroes.

Exactly one image.

This is NOT an illustration.

This is a production asset that will be automatically sliced into six independent sprites.

------------------------------------------------------------

SPRITE ATLAS
Create a perfectly geometric production sprite atlas.

2 rows.

3 columns.

Exactly six identical sprite slots.

Every slot has identical width.

Every slot has identical height.

Every divider is perfectly horizontal or vertical.

No perspective distortion.

No artistic layout.

Think of a sprite atlas exported directly from a game engine.

------------------------------------------------------------

BACKGROUND
Atlas separators:
Flat neutral grey (#808080)

Inside every sprite slot:
Flat chroma green (#00A651)

The green background must be perfectly uniform.

Exactly one RGB value.

No gradients.

No lighting.

No shadows.

No texture.

No color variation.

------------------------------------------------------------

REFERENCE FRAME
Every sprite slot contains one invisible Reference Frame.

Every Reference Frame has identical size.

Every Reference Frame has identical position.

Every hero must fit completely inside its own Reference Frame.

The body, robes, and staff always fit inside the Reference Frame.

Only magical effects may extend outside the Reference Frame.

Nothing may ever leave the sprite slot.

------------------------------------------------------------

SPRITE SLOT ALIGNMENT
Every hero is centered identically.

Every hero uses exactly the same:

horizontal position

vertical position

camera

zoom

lens

rotation

framing

Eye height is identical.

Shoulder height is identical.

Hip height is identical.

Feet stand on exactly the same invisible baseline.

Staff position is identical.

Rows and columns are production references.

They must never drift.

------------------------------------------------------------

HERO IDENTITY
Imagine one finished 3D game character.

Duplicate this exact same model six times.

Each duplicate has exactly the same size.

Do NOT redraw the character.

Do NOT reinterpret the character.

Do NOT rescale the character.

Only equipment and magical effects evolve.

------------------------------------------------------------

GENDER AND BODY TYPE LOCK
Gender: Female

Body type: slender build, average height, NOT athletic or muscular — a
scholarly battle-mage frame, distinct from the Warrior's heroic athletic build.

Apparent age range: mature adult, approximately 30-45 years old. Not young
adult, not elderly.

Every sprite slot depicts the exact same gender presentation.

Every sprite slot depicts the exact same body type and build.

Every sprite slot depicts the exact same apparent age range.

Gender, body type, and age never change across rarity.

Only equipment, materials, and magical effects evolve.

------------------------------------------------------------

BODY SCALE LOCK

Common rarity defines the master body scale.

Every rarity uses identical:

- body height
- body width
- head position
- shoulder position
- hand position
- feet position

Armor upgrades do not affect body scale.

Visual effects do not affect body scale.

Wings do not affect body scale.

The staff's length does not affect body scale.

------------------------------------------------------------

POSE
Neutral idle pose.

Heroic stance, hands lightly resting on or near the staff.

3/4 front view.

Facing LEFT.

No attack pose.

No running.

No animation.

------------------------------------------------------------

FACTION
Faction:
Lion Kingdom

Faction Symbol:
Small standing heraldic lion, full-body pose, identical to the Warrior's
chest emblem.

The symbol is identical everywhere.

Never redesign it.

Never replace it.

Never simplify it.

Only evolve:

material

depth

lighting

magic

------------------------------------------------------------

CHEST EMBLEM
Every robe contains the exact same small heraldic standing lion on the chest.

Always centered.

Never removed.

Never replaced.

------------------------------------------------------------

CLASS EQUIPMENT
Class:
Mage

Main weapon:
Wooden staff, evolving to starlight staff at Mythic.

Offhand / focus:
None. The off-hand is empty and free for spellcasting gestures — Mage never
carries a shield.

STAFF SILHOUETTE LOCK
The staff's total length, shaft thickness, and head/crystal-mount shape are
immutable. The staff remains visually the same length and proportions in
every one of the six sprite slots.

Only evolve:

materials

ornaments

magical effects (crystal glow, particles, runes)

Never shorten the staff. Never lengthen the staff. Never turn the staff into
a wand. Never redesign the staff head shape.

------------------------------------------------------------

RARITY CONTRACT
Every rarity inherits everything from the previous rarity.

Nothing disappears.

Nothing is redesigned.

Only additions are allowed.

------------------------------------------------------------

COMMON
Simple blue and silver mage robes.

Wooden staff, plain unadorned shaft and head.

Small heraldic standing lion on chest, flat painted gold.

No magical effects.

No particles.

No aura.

------------------------------------------------------------

UNCOMMON
Everything from COMMON.

Add:

gold trim on robe edges

improved staff head (slightly carved, still wood)

small shoulder mantle

slightly raised 3D lion relief on chest (same pose as Common)

------------------------------------------------------------

RARE
Everything from UNCOMMON.

Add:

silver-blue robe fabric with faint blue rune embroidery

blue glowing crystal mounted in the staff head (same staff length and shape)

soft blue magical aura around the hands and staff crystal

a few floating magical particles

half-cloak with gold fringe

------------------------------------------------------------

EPIC
Everything from RARE.

Add:

royal blue and gold robes with embroidered patterns

ruby gemstones set into the staff head and chest emblem

moderate golden-blue aura with small sparks

floating arcane glyphs around the character

full flowing cloak

------------------------------------------------------------

LEGENDARY
Everything from EPIC.

Add:

celestial white-gold robes

staff transforms materially into a "staff of light" — same length and shape,
glowing white-gold material

small wings of light on the back

strong luminous white-gold aura

floating light particles

no halo

------------------------------------------------------------

MYTHIC
Everything from LEGENDARY.

Add:

cosmic night-sky robes with animated constellations

staff becomes a starlight staff — same immutable length and shape, now made
of living starlight material

living constellations visible on robe fabric

nebula particle effects

stardust wings

cosmic aura

the same standing heraldic lion remains visible on the chest, now rendered
in starlight material

------------------------------------------------------------

EFFECTS CONTRACT
Visual effects must never change the apparent size of the hero.

The hero model remains identical.

Only magical effects expand around the hero.

Effects never change:

body size

robe silhouette size

staff size

------------------------------------------------------------

EFFECT BOUNDARY
Effects are secondary.

Effects never define character scale.

The body defines character scale.

Aura may grow.

Particles may grow.

Wings may grow.

Body scale remains fixed.

------------------------------------------------------------

QUALITY CHECK
Before finishing verify:

- six identical sprite slots
- identical Reference Frame
- identical hero size
- identical face
- identical gender presentation (Female in all six slots)
- identical slender/average body type and build in all six slots
- identical apparent age (30-45) in all six slots
- identical proportions
- identical camera
- identical alignment
- identical staff length and shape in all six slots
- identical heraldic lion pose on every chest emblem
- full body visible
- feet visible
- staff visible
- no shield present in any slot
- no overlapping sprite slots
- no cropped effects
- no cropped wings (Legendary/Mythic)

------------------------------------------------------------

STYLE
Stylized fantasy 3D render.

AAA mobile RPG quality.

Game-ready asset.

Sharp readable silhouettes.

Inspired by AFK Arena and Raid Shadow Legends.

------------------------------------------------------------

NEGATIVE PROMPT
photorealistic

anime

manga

painting

concept art

watercolor

pixel art

text

watermark

logo

signature

cropped

missing feet

cropped staff

cropped wings

round shield

tower shield

any shield

sword

halo

shortened staff

staff redesigned as wand

different heraldry

different face

different gender

different body type

different age

athletic muscular build

different armor silhouette

different pose

environment

ground shadows

random redesign
```

---

## MALE VARIANT

Not yet generated. To produce: copy the FINAL PROMPT above, change the
`GENDER AND BODY TYPE LOCK` block to:

```text
Gender: Male

Body type: slender to average build, scholarly frame, NOT athletic or
muscular like Warrior — visibly less bulky than Human Warrior's heroic build.

Apparent age range: mature adult, approximately 35-55 years old.
```

Keep every other section (robes, staff, heraldry, rarity ladder) identical.
Run as a second atlas. Log results below under their own subheading once
generated — do not overwrite the Female review notes.

---

## REVIEW NOTES

> Filled in after the Female atlas was generated and inspected (see
> `docs/HUMAN_MAGE_v1.png` for the reviewed output).

**Result: PASS.** The framework generalized from Warrior to Mage without
needing any undocumented fixes.

- **Sprite Slot safety:** all six slots are slice-safe. Staff, robes, and
  wings (Legendary/Mythic) stay inside their slots.
- **Hero model consistency (face, gender, body type, age):** held across all
  six slots. The Female, slender, scholarly-mage build is clearly distinct
  from Warrior's male athletic build — confirms `GENDER AND BODY TYPE LOCK`
  works both *within* one atlas and *across* different class atlases.
- **Row 2 vs Row 1 baseline:** same minor vertical drift observed as in the
  Warrior atlas (see `HUMAN_WARRIOR_V3.md` review) — row 2 sits very slightly
  higher/smaller than row 1. Not class-specific; this is a generator-level
  limitation, not a documentation gap. See new Gate 6 in
  `03_PIPELINE/00_QA_ACCEPTANCE_GATES.md`.
- **Heraldic lion:** stayed a full standing lion, identically posed, through
  Legendary and Mythic. Heraldry Lock held.
- **STAFF SILHOUETTE LOCK:** held. Staff length, shaft thickness, and head
  shape stayed visually constant across all six rarities — only material,
  crystal, and glow evolved. This is the first real confirmation that a
  single-handed-weapon-no-offhand silhouette lock works, which Warrior's
  sword+shield combo had not previously tested on its own.
- **Effects vs body scale:** effects (aura, wings, particles) enriched the
  asset without visibly resizing the character model. `EFFECT BOUNDARY`
  held.
- **Facing direction — KNOWN ISSUE:** prompt specifies `Facing LEFT`
  (identical wording to Warrior's prompt), but the generated atlas came out
  facing RIGHT. This is a generator-level inconsistency, not a prompt or
  documentation defect — the instruction is correct and present. Tracked as
  a new QA gate (Gate 6, facing direction) so any future atlas is checked
  and rejected/regenerated *before* production use, rather than needing
  hundreds of files manually mirrored later.
- **Framework-gap log:** **No framework changes needed — confirms framework
  generalizes.** The two module additions anticipated before generation
  (`GENDER AND BODY TYPE LOCK`, `EFFECT BOUNDARY`) were sufficient on their
  own; nothing outside the INPUT TABLE values had to change to make Mage
  work after Warrior.

**Outstanding before final production sign-off (per project owner):** this
atlas was not yet generated in the final target pipeline/tool — a final
confirmation will follow once that is done. Functionally, the
framework/process itself is considered validated.

**Open conceptual item — RESOLVED (2026-06-27):** the project moved to a
three-axis model — **Race** (Human/Elf/Orc/Undead/Demon/Celestial) +
**Faction** (e.g. "Lion Kingdom", tied to a Race) + **Class**
(Warrior/Mage/...). See `00_FOUNDATION/00_ART_DIRECTION.md` → RACE,
FACTION, AND CLASS for the full model, and
`01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` → RACE AND FACTION MODULE
for the prompt-writing rule. This file's `faction: Human / Lion Kingdom`
field (above, in the INPUT TABLE) predates that split and is left as-is
since the FINAL PROMPT is accepted and working — read it as **Race: Human,
Faction: Lion Kingdom**. Any new PoC copied from `02_POC/_TEMPLATE.md` uses
the split `race:` / `faction:` fields from the start.
