# HERO RARITY ATLAS POC — TEMPLATE

Project:
Idle Kingdom Revolution

Status:
Template. Copy this file, rename to `{FACTION}_{CLASS}_V1.md`, fill in every
`{placeholder}`, then run it as a PoC the same way `HUMAN_WARRIOR_V3.md` was
run. Do not delete bracketed sections — they exist so nothing required gets
skipped.

Purpose:
Reusable skeleton for producing a new Hero rarity atlas PoC. Built from the
modules defined in `01_PRODUCTION_SYSTEM/`. Read those four files before
filling this in if you haven't already:

- `01_PRODUCTION_SYSTEM/00_SPRITE_ATLAS_CONTRACT.md`
- `01_PRODUCTION_SYSTEM/01_REFERENCE_FRAME_SYSTEM.md`
- `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md`
- `01_PRODUCTION_SYSTEM/03_HERO_RARITY_ATLAS_FACTORY.md`

---

## HOW TO USE THIS TEMPLATE

1. Copy this file as `02_POC/{FACTION}_{CLASS}_V1.md`.
2. Fill in the INPUT TABLE below first — it forces every required decision
   (faction, class, gender, body type, age, weapon, silhouette locks) before
   you touch the prompt itself.
3. Build the FINAL PROMPT section using the filled INPUT TABLE. Keep every
   module from `02_PROMPT_MODULE_SYSTEM.md` in the prescribed order.
4. Run it. Record results in a REVIEW NOTES section at the bottom (copy the
   style from `HUMAN_WARRIOR_V3.md`).
5. If accepted, update `05_REFERENCE/01_ASSET_CHECKLIST.md` and the
   REFERENCE LOCK table for the relevant faction+class+gender.

**Golden rule when testing a new class against an already-accepted PoC
(e.g. Warrior → Mage):** change ONLY what the new class requires (weapon,
armor type, body build, age range, silhouette locks). Everything else —
atlas format, Reference Frame, Sprite Slot rules, rarity contract structure,
negative prompt — stays identical. If something unrelated also had to change
to make the new class work, that is a signal the framework has a gap, not
that the class is special. Log it in REVIEW NOTES either way.

---

## INPUT TABLE (fill this in completely before writing the prompt)

```text
faction:
class:
gender:                    # Male | Female — generate ONE atlas per gender, see GENDER AND BODY TYPE MODULE
body_type:                 # e.g. athletic, slender, heavy-set — see 00_FOUNDATION/00_ART_DIRECTION.md class table
apparent_age_range:        # e.g. 30-60 for Mage — see 00_FOUNDATION/00_ART_DIRECTION.md Age Diversity table
primary_symbol:            # faction heraldic emblem, e.g. "standing heraldic lion"
secondary_symbol:          # optional accent symbol, e.g. crown / sword
main_weapon:                # e.g. staff, longsword, bow
offhand_or_focus:          # e.g. spellbook, kite shield, quiver
base_colors:                # 2-3 dominant colors
rarity_theme:                # e.g. "royal -> celestial -> cosmic"
forbidden_shapes:           # shapes that must NEVER appear (e.g. round shield, halo)
weapon_silhouette_lock:    # one-line description of what must never change about main_weapon's shape
                            # check 00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md — add a new lock entry there if this is a new weapon type
```

---

## FINAL PROMPT

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

The body, equipment, and primary silhouette always fit inside the Reference Frame.

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

{offhand_or_focus} center is identical.

{main_weapon} position is identical.

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
Gender: {gender}

Body type: {body_type}

Apparent age range: {apparent_age_range}

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

------------------------------------------------------------

POSE
Neutral idle pose.

Heroic stance.

3/4 front view.

Facing LEFT.

No attack pose.

No running.

No animation.

------------------------------------------------------------

FACTION
Faction:
{faction}

Faction Symbol:
{primary_symbol}

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
Every set of equipment contains the exact same {primary_symbol}.

Always centered or in the same position.

Never removed.

Never replaced.

------------------------------------------------------------

CLASS EQUIPMENT
Class:
{class}

Main weapon:
{main_weapon}

Offhand / focus:
{offhand_or_focus}

WEAPON SILHOUETTE LOCK
{weapon_silhouette_lock}

The {main_weapon} silhouette never changes shape across rarity.

Only evolve:

materials

decorations

magic

------------------------------------------------------------

RARITY CONTRACT
Every rarity inherits everything from the previous rarity.

Nothing disappears.

Nothing is redesigned.

Only additions are allowed.

------------------------------------------------------------

COMMON
{common_description}

------------------------------------------------------------

UNCOMMON
Everything from COMMON.

Add:

{uncommon_additions}

------------------------------------------------------------

RARE
Everything from UNCOMMON.

Add:

{rare_additions}

------------------------------------------------------------

EPIC
Everything from RARE.

Add:

{epic_additions}

------------------------------------------------------------

LEGENDARY
Everything from EPIC.

Add:

{legendary_additions}

------------------------------------------------------------

MYTHIC
Everything from LEGENDARY.

Add:

{mythic_additions}

------------------------------------------------------------

EFFECTS CONTRACT
Visual effects must never change the apparent size of the hero.

The hero model remains identical.

Only magical effects expand around the hero.

Effects never change:

body size

equipment size

weapon size

armor size

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
- identical gender presentation
- identical body type and build
- identical apparent age
- identical proportions
- identical camera
- identical alignment
- identical {main_weapon} silhouette
- identical {offhand_or_focus} silhouette
- identical {primary_symbol} on every slot
- full body visible
- feet visible
- {main_weapon} visible
- {offhand_or_focus} visible (if applicable)
- no overlapping sprite slots
- no cropped effects

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

cropped weapon

cropped shield

cropped wings

{forbidden_shapes}

different heraldry

different face

different gender

different body type

different age

different armor silhouette

different pose

environment

ground shadows

random redesign
```

---

## REVIEW NOTES

Use this section to log what happened when the prompt was actually run.
Copy the structure from `HUMAN_WARRIOR_V3.md` → REVIEW NOTES. At minimum,
record:

- whether all six Sprite Slots were slice-safe
- whether the same hero model (face, gender, body type, age) was preserved
- whether the second row kept the same scale and baseline as the first row
- whether {primary_symbol} remained recognizable and identically posed
- whether the {weapon_silhouette_lock} held across all six rarities
- whether effects enriched the asset without resizing the character
- **framework-gap log:** anything that had to be changed outside the
  INPUT TABLE values to make this class work. If nothing did, write
  "No framework changes needed — confirms framework generalizes."
