# ORC_LION_KINGDOM_TANK_V1

Project:
Idle Kingdom Revolution

Status:
Framework isolation test PoC — **RACE variable test**. This is not a lore
proposal. See `00_FOUNDATION/00_ART_DIRECTION.md` → FACTION SCOPE →
Isolation-test exception for why this combination is deliberately
lore-unusual (an Orc wearing a Human kingdom's colors and heraldry).

Purpose:
`HUMAN_WARRIOR_V3.md` and `HUMAN_MAGE_V1.md` both used Race=Human. Neither
proved that the framework correctly varies body proportions when Race
changes while Faction (color/heraldry/decoration) stays completely fixed.
This PoC isolates that variable: **Faction is held identical to
`HUMAN_WARRIOR_V3.md`** (same Lion Kingdom blue/gold/lion), and only Race
(Human → Orc) and Class (Warrior → Tank, a class not yet tested) change.

If this PoC succeeds, it confirms:
1. Race-level body proportions (height, width, build, age) apply correctly
   even when Faction visual identity is unchanged.
2. The RACE AND FACTION MODULE genuinely decouples the two axes in
   practice, not just in the prompt's prose.
3. Tank, the widest/heaviest class, works under BODY SCALE LOCK.

---

## INPUT TABLE

```text
race: Orc
faction: Lion Kingdom   # DELIBERATELY UNCHANGED from HUMAN_WARRIOR_V3.md — see Status above
faction_scale: Hero
class: Tank
gender: Male   # see GENDER VARIANT NOTE below
body_type: widest/heaviest build of all classes (per 00_FOUNDATION/00_ART_DIRECTION.md CLASS DESIGN GUIDE), PLUS Orc race offset: +0.2 height, wider, broader shoulders, shorter legs (per Race Proportion Notes) — the single widest, most massive silhouette in the roster
apparent_age_range: 25-45 (Tank class default) shifted by Orc's -5 to -10 year race modifier -> effectively reads as 20-38, weathered/scarred features common at younger apparent age for Orc
primary_symbol: standing heraldic lion (full-body) — IDENTICAL to Human Warrior's lion, same pose, same composition
secondary_symbol: crown / sword (same as Human Warrior)
main_weapon: war mace
offhand_or_focus: massive tower shield (largest shield silhouette in the roster — distinct from Warrior's kite shield, per CLASS EQUIPMENT LOCK in 00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md)
base_colors: blue, gold, polished steel — IDENTICAL to Human Warrior (Lion Kingdom palette, unchanged)
rarity_theme: royal -> celestial -> cosmic (same theme language as Human Warrior, for direct comparability)
forbidden_shapes: kite shield, round shield, halo, different heraldry, Human body proportions, Human face structure
weapon_silhouette_lock: the tower shield's height, width, and curvature stay identical across all six rarities; only surface (heraldry, material, glow) evolves — see TOWER SHIELD note below
```

### GENDER VARIANT NOTE

Per `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` → GENDER AND BODY TYPE
MODULE, this runs the **Male** atlas first (Orc gender distribution skews
70% male per `00_FOUNDATION/00_ART_DIRECTION.md` → GENDER REPRESENTATION →
Wyjątki, making Male the more common default to test first for this race).
A Female variant can be added the same way `HUMAN_MAGE_V1.md` documents its
Male variant — copy this FINAL PROMPT, change the GENDER AND BODY TYPE LOCK
block, keep everything else identical.

### TOWER SHIELD note (new equipment lock)

This PoC introduces the Tank class's signature equipment for the first time.
Per `00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md` → CLASS EQUIPMENT LOCK
(Shields), Tank's shield shape is **Tower Shield** — already listed in that
table, but not yet used by any accepted PoC. This PoC is also the first
real-world test of the Tower Shield lock, independent of the Race test.

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

The body, armor, shield, and weapon always fit inside the Reference Frame.

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

Mace position is identical.

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

RACE
Race: Orc

This character has Orc body proportions: wider frame than a Human, broader
shoulders, visibly shorter legs relative to torso, heavier overall build.
This is the WIDEST and MOST MASSIVE silhouette of any Hero in the roster —
visibly broader than a Human Warrior or Human Mage would be in the same
camera frame.

Orc facial structure: stronger jaw, lower brow, small tusks at the corners
of the mouth (subtle, not cartoonish), skin tone in the green-grey to
brown-grey range typical of stylized fantasy Orcs.

Race body proportions, height, build, and apparent age range follow this
race's defaults and are never redesigned by Faction or rarity.

------------------------------------------------------------

GENDER AND BODY TYPE LOCK
Gender: Male

Body type: the widest, heaviest build of any Hero class (Tank), further
widened by Orc race proportions — broad shoulders, thick neck, massive
forearms, shorter legs relative to torso than a Human would have.

Apparent age range: weathered adult, reading as roughly 20-38 years old
(Orc race ages faster and lives shorter than Human, so this is younger in
years than a Human Tank's 25-45 range, but with comparably weathered,
battle-worn features).

Every sprite slot depicts the exact same gender presentation.

Every sprite slot depicts the exact same body type and build.

Every sprite slot depicts the exact same apparent age range.

Gender, body type, race proportions, and age never change across rarity.

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

The shield's size does not affect body scale — the shield may be large, but
the body underneath stays fixed.

------------------------------------------------------------

POSE
Neutral idle pose.

Heroic, immovable stance — wide stance, shield planted slightly forward,
mace held ready at the side.

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
Standing heraldic lion (full-body), identical pose and composition to the
lion used in the Human Warrior and Human Mage Lion Kingdom atlases.

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
Every set of armor contains the exact same standing heraldic lion on the chest.

Always centered.

Never removed.

Never replaced.

The lion's pose and proportions are identical to the Human Warrior and
Human Mage chest emblems — only the chest plate it sits on is shaped for an
Orc's broader torso.

------------------------------------------------------------

CLASS EQUIPMENT
Class:
Tank

Main weapon:
War mace

Offhand / focus:
Massive tower shield — the largest shield silhouette in the entire roster,
taller and wider than the Warrior's kite shield or any other class's
offhand.

TOWER SHIELD SILHOUETTE LOCK
The tower shield's height, width, top curvature, and bottom edge shape are
immutable across all six rarities. The shield always covers from
approximately shoulder height to knee height when held in the idle pose.

Only evolve:

materials (iron -> steel -> silver -> gold -> celestial -> cosmic)

decorations and gem inlays

magical effects (glow, runes, aura)

Never shrink the shield. Never redesign it into a kite shield, round shield,
or heater shield. Never remove the lion emblem from its surface.

WAR MACE SILHOUETTE LOCK
The mace's head size and haft length stay identical across all six rarities.
Only material, engravings, and glow evolve.

------------------------------------------------------------

RARITY CONTRACT
Every rarity inherits everything from the previous rarity.

Nothing disappears.

Nothing is redesigned.

Only additions are allowed.

------------------------------------------------------------

COMMON
Simple blue-grey heavy plate armor, broad and thick.

Plain iron war mace.

Plain iron tower shield with a flat painted gold standing lion.

No magical effects.

No particles.

No aura.

------------------------------------------------------------

UNCOMMON
Everything from COMMON.

Add:

gold trim on armor edges and shield rim

improved mace head (slightly sculpted, still iron)

small pauldron with raised lion relief (same lion pose as Common)

------------------------------------------------------------

RARE
Everything from UNCOMMON.

Add:

silver-blue plate inlays with faint blue rune engravings

blue glowing accents along the shield rim and mace head

soft blue magical aura around the shield arm

a few floating magical particles

------------------------------------------------------------

EPIC
Everything from RARE.

Add:

royal blue and gold heavy armor with embossed patterns

ruby gemstones set into the shield and chest emblem

moderate golden-blue aura with small sparks around the shield

floating arcane glyphs near the shield

------------------------------------------------------------

LEGENDARY
Everything from EPIC.

Add:

celestial white-gold heavy armor

shield and mace transform materially into "armaments of light" — same
silhouette and size, glowing white-gold material

small wings of light on the back

strong luminous white-gold aura

floating light particles

no halo

------------------------------------------------------------

MYTHIC
Everything from LEGENDARY.

Add:

cosmic night-sky armor plating with animated constellations

shield and mace become starlight-forged — same immutable size and shape,
now made of living starlight material

living constellations visible on armor plates

nebula particle effects

stardust wings

cosmic aura

the same standing heraldic lion remains visible on the chest and shield,
now rendered in starlight material

------------------------------------------------------------

EFFECTS CONTRACT
Visual effects must never change the apparent size of the hero.

The hero model remains identical.

Only magical effects expand around the hero.

Effects never change:

body size

shield size

mace size

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
- identical face (Orc facial structure, not Human)
- identical Orc body proportions (wider, broader, shorter-legged than Human)
- identical gender presentation (Male in all six slots)
- identical Tank+Orc body type and build in all six slots
- identical apparent age in all six slots
- identical proportions
- identical camera
- identical alignment
- identical tower shield silhouette in all six slots
- identical war mace silhouette in all six slots
- identical standing heraldic lion pose on every chest emblem and shield —
  the SAME lion as Human Warrior, not redesigned for Orc
- full body visible
- feet visible
- shield visible
- mace visible
- no kite shield, round shield, or heater shield in any slot
- no overlapping sprite slots
- no cropped effects
- no cropped wings (Legendary/Mythic)
- all six heroes face the same direction (see Gate 6 in
  03_PIPELINE/00_QA_ACCEPTANCE_GATES.md)

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

cropped shield

cropped mace

cropped wings

kite shield

round shield

heater shield

halo

Human body proportions

Human facial structure

slender build

different heraldry

different face

different gender

different body type

different age

different armor silhouette

different pose

facing right

mirrored pose

environment

ground shadows

random redesign
```

---

## REVIEW NOTES

> Fill in after this atlas has actually been generated and inspected.

Expected review criteria (in addition to the standard Gate checks in
`03_PIPELINE/00_QA_ACCEPTANCE_GATES.md`):

- **Race isolation check (primary purpose of this PoC):** does the Orc
  Tank visibly read as wider/broader/shorter-legged than the Human Warrior
  or Human Mage atlases, while using the EXACT SAME blue/gold/lion Faction
  identity? If yes, Race and Faction are genuinely decoupled in practice.
  If the model instead drifted the colors/heraldry toward something more
  "Orc-typical" (e.g. green/brown, tusks-and-bone motif), that's a
  framework-gap signal: the generator may default to Race-typical Faction
  styling unless very explicitly held constant — log this either way.
- **Tower Shield silhouette lock:** does the shield stay the same
  height/width/curvature across all six rarities, the same way the Warrior's
  kite shield and the Mage's staff did?
- **Lion emblem fidelity:** does the lion stay recognizably the SAME lion
  (full standing pose) as in `HUMAN_WARRIOR_V3.md`, just rendered on a wider
  chest plate — or did the model redesign it for the new race?
- Standard checks: sprite slot safety, row 1 vs row 2 baseline (known minor
  drift, see Gate 6), facing direction (known inconsistency, see Gate 6),
  effect boundary.
- **framework-gap log:** anything that had to change outside the INPUT
  TABLE values to make Race=Orc work on an unchanged Faction. If nothing
  did, write "No framework changes needed — confirms Race and Faction are
  independently controllable."
- **Lore decision (separate from framework test):** once reviewed, decide
  whether "Orc Lion Kingdom Tank" is kept as a real Hero combination in the
  game's lore, or whether this was purely a test and the combination is
  discarded while keeping the learnings.
