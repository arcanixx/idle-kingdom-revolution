# HUMAN_WARRIOR_POC_V3

Project:
Idle Kingdom Revolution

Status:
Framework validated, but **this specific generated atlas is REJECTED for
production use** (see REVIEW NOTES below — confirmed lion-head-only defect
in slots 3 and 5). The PROMPT itself remains the accepted production prompt
— regenerate using this same prompt and re-run QA before using any output
in-game.

Purpose:
Reusable test prompt for validating rarity progression, Reference Frame consistency, Sprite Slot alignment, heraldry preservation, and slice-safe output.

> **Race/Faction terminology note (added 2026-06-27, v2.0 of the framework):**
> this PoC predates the Race/Faction split. Wherever the FINAL PROMPT below
> says `Faction: Lion Kingdom`, read it as **Race: Human, Faction: Lion
> Kingdom** under the current model (see
> `00_FOUNDATION/00_ART_DIRECTION.md` → RACE, FACTION, AND CLASS). The
> FINAL PROMPT text itself is intentionally left unchanged since it is
> accepted and working — do not edit it to retrofit the new terminology.
> Any *new* PoC copied from `02_POC/_TEMPLATE.md` should use the split
> `race:` / `faction:` fields from the start.

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

The body, armor, shield and sword always fit inside the Reference Frame.

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

Shield center is identical.

Sword position is identical.

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
Lion Kingdom

Faction Symbol:
Standing Heraldic Lion

The lion is identical everywhere.

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
Every armor contains the exact same heraldic standing lion.

Always centered.

Never removed.

Never replaced.

------------------------------------------------------------

SHIELD
Always the exact same blue kite shield silhouette.

Never:

Round shield

Tower shield

Buckler

Disc shield

Floating shield

The standing heraldic lion remains identical.

Only evolves through:

paint

relief

gold

gems

magic

------------------------------------------------------------

WEAPON
Always the same longsword silhouette.

Never redesign the sword.

Only evolve:

materials

decorations

magic

The sword length remains visually identical.

------------------------------------------------------------

RARITY CONTRACT
Every rarity inherits everything from the previous rarity.

Nothing disappears.

Nothing is redesigned.

Only additions are allowed.

------------------------------------------------------------

COMMON
Polished steel armor.

Blue tabard.

Steel longsword.

Blue kite shield.

Flat painted gold standing lion on shield.

Flat painted gold standing lion on chest.

------------------------------------------------------------

UNCOMMON
Everything from COMMON.

Add:

subtle gold trim

gold crossguard

simple shoulder cape

slightly raised lion relief

------------------------------------------------------------

RARE
Everything from UNCOMMON.

Add:

silver-blue steel

blue runes

soft blue aura

gold shield border

blue glowing lion eyes

half cloak

------------------------------------------------------------

EPIC
Everything from RARE.

Upgrade with:

gold armor

ruby gems

royal cloak

gold embroidery

moderate golden aura

ruby lion eyes

------------------------------------------------------------

LEGENDARY
Everything from EPIC.

Upgrade materials into celestial white gold.

Sword becomes blade of light.

Shield gains small angel wings.

Large white wings.

Strong luminous aura.

Floating particles.

No halo.

------------------------------------------------------------

MYTHIC
Everything from LEGENDARY.

Upgrade into cosmic materials.

Living night-sky armor.

Animated constellations.

Starlight sword.

Galaxy shield.

The SAME standing heraldic lion remains visible.

Large stardust wings.

Nebula particles.

Cosmic aura.

------------------------------------------------------------

EFFECTS CONTRACT
Visual effects must never change the apparent size of the hero.

The hero model remains identical.

Only magical effects expand around the hero.

Effects never change:

body size

shield size

weapon size

armor size

------------------------------------------------------------

QUALITY CHECK
Before finishing verify:

- six identical sprite slots
- identical Reference Frame
- identical hero size
- identical face
- identical proportions
- identical camera
- identical alignment
- identical sword silhouette
- identical kite shield
- identical heraldic lion on every shield
- identical heraldic lion on every chestplate
- full body visible
- feet visible
- sword visible
- shield visible
- wings fully visible
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

cropped sword

cropped shield

cropped wings

round shield

tower shield

disc shield

lion head only

different heraldry

different face

different armor silhouette

different pose

environment

ground shadows

random redesign
```

---

## REVIEW NOTES

This prompt should be tested as a production export specification.

The expected review criteria are not only visual appeal, but also:

- whether all six Sprite Slots are slice-safe
- whether the same hero model is preserved
- whether the second row keeps the same scale and baseline as the first row
- whether the lion emblem remains a full standing heraldic lion
- whether the chest emblem remains visible in Legendary and Mythic
- whether effects enrich the asset without resizing the character

### Actual review (2026-06-27, see `docs/HUMAN_WARRIOR_v3.png`)

**Result: PASS with a confirmed Gate 5 defect**, three known generator-level
issues to track via QA (not documentation defects — the prompt already
says the right thing in all three cases, including an explicit
`lion head only` entry already present in NEGATIVE PROMPT above):

- **Row 2 baseline drift:** row 2 (Epic/Legendary/Mythic) sits very slightly
  higher/smaller in its slot than row 1 (Common/Uncommon/Rare). Minor, does
  not affect usability per project owner. Falls under the existing PASS
  allowance ("tiny non-critical particle/material differences") in this
  document's PASS/FIX/REJECT section, but is now also tracked as Gate 6
  (facing + alignment spot-check) below so it's checked consistently on
  every future atlas, not just remembered ad hoc.
- **Facing direction:** confirmed working correctly in this Warrior atlas
  (`Facing LEFT` honored). When the same instruction was reused verbatim for
  `02_POC/HUMAN_LION_KINGDOM_MAGE_V1.md`, the model generated the Mage facing
  RIGHT instead — i.e. the same prompt wording does not guarantee the same
  facing result across different generations/classes. See Gate 6 below.
- **CONFIRMED Gate 5 defect — lion head only, despite explicit negative
  prompt (2026-06-27):** in the actually generated atlas, **slots 3 (Rare)
  and 5 (Legendary)** show the shield emblem as a lion HEAD only, not the
  full standing lion used correctly in slots 1, 2, and 4 (Common, Uncommon,
  Epic). This happened even though `lion head only` is explicitly listed in
  NEGATIVE PROMPT above — i.e. the negative prompt alone was not sufficient
  to prevent it. This is a generator-reliability issue, not a missing
  instruction. The same defect, in similarly-positioned slots (Epic and
  Legendary), was independently observed in
  `02_POC/ORC_LION_KINGDOM_TANK_V1.md` — see that file's REVIEW NOTES for
  the cross-atlas pattern. **Action: reject this atlas for production use
  and regenerate** (this PoC was accepted for framework validation purposes
  before this defect was caught on closer inspection; it is not approved as
  a production-ready atlas as-is). See Gate 5 update below for the
  strengthened check.
