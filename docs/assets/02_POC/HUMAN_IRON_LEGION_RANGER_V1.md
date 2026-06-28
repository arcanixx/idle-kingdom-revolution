# HUMAN_IRON_LEGION_RANGER_V1

Project:
Idle Kingdom Revolution

Status:
Framework isolation test PoC — **FACTION variable test**. **Faction
isolation CONFIRMED PASS** (2026-06-27, see REVIEW NOTES below) — no
lion-head-style heraldry defect found on this atlas, unlike the other two
PoCs reviewed so far. This is currently the strongest production candidate
of the four PoCs run. Companion to `ORC_LION_KINGDOM_TANK_V1.md`, which
tests the opposite isolation (Race varies, Faction fixed). This PoC fixes
Race=Human (identical proportions to `HUMAN_LION_KINGDOM_WARRIOR_V3.md` and
`HUMAN_LION_KINGDOM_MAGE_V1.md`) and changes only Faction (Lion Kingdom →
Iron Legion, a new Faction defined in
`00_FOUNDATION/00_ART_DIRECTION.md` → FACTION DESIGN GUIDE specifically for
this test) and Class (Warrior/Mage → Ranger, not yet tested before this).

Purpose:
If this PoC succeeds, it confirms:
1. Faction (color, heraldic symbol, decoration language) can change
   completely while Race (body proportions, age range, build) stays
   identical to other Human PoCs — i.e. Faction really is the surface-level
   axis the documentation claims it is, not something that drags Race
   along with it.
2. Ranger's class-defining silhouette (bow, quiver, no shield) works under
   the same Reference Frame / Body Scale Lock / Effect Boundary modules as
   Warrior (sword+shield), Mage (staff, no offhand), and Tank (tower
   shield, no ranged weapon).
3. A second Faction's heraldic lock (Iron Legion's crossed-spears-and-helm
   emblem) holds across rarity the same way Lion Kingdom's lion does.

---

## INPUT TABLE

```text
race: Human
faction: Iron Legion   # NEW Faction, defined in 00_FOUNDATION/00_ART_DIRECTION.md -> FACTION DESIGN GUIDE -> Worked example: Iron Legion
faction_scale: Hero
class: Ranger
gender: Female   # see GENDER VARIANT NOTE below
body_type: lean, agile build (per 00_FOUNDATION/00_ART_DIRECTION.md CLASS DESIGN GUIDE for Ranger) — Human race proportions, IDENTICAL baseline to Human Warrior/Mage, just a leaner build within that baseline
apparent_age_range: 20-40 (Ranger class default, Human race — same age table entry used for Human Warrior, no race modifier since this is Human)
primary_symbol: crossed spears behind a closed iron helm (full emblem, see Iron Legion definition) — DELIBERATELY DIFFERENT from Lion Kingdom's standing lion
secondary_symbol: none for Common/Uncommon; banded iron rings appear from Rare+
main_weapon: recurve bow
offhand_or_focus: quiver of arrows worn on the back/hip
base_colors: iron grey, dark crimson, bronze — DELIBERATELY DIFFERENT from Lion Kingdom's royal blue/gold
rarity_theme: legion scout -> veteran marksman -> celestial -> cosmic (same theme shape as Lion Kingdom PoCs: royal/legion -> celestial -> cosmic, for comparability)
forbidden_shapes: lion emblem, blue/gold color palette (reserved for Lion Kingdom), halo, sword, shield, staff
weapon_silhouette_lock: the bow's curve, draw length, and limb shape stay identical across all six rarities; only material, string glow, and decoration evolve — see BOW SILHOUETTE LOCK below (new entry needed in 00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md)
```

### GENDER VARIANT NOTE

Runs the **Female** atlas first (arbitrary choice for variety vs.
`HUMAN_MAGE_V1.md`'s Female-first and `ORC_LION_KINGDOM_TANK_V1.md`'s
Male-first — between the three PoCs in this batch, both genders get at
least one direct test). A Male variant can be added later the same way: copy
the FINAL PROMPT, change the GENDER AND BODY TYPE LOCK block, keep
everything else identical.

### BOW SILHOUETTE LOCK (new equipment lock)

This PoC introduces Ranger's bow for the first time. Per
`00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md` → SWORD / WEAPON
SILHOUETTE LOCK (general principle), a bow lock entry should be added to
that file's "Known weapon locks" table once this PoC is reviewed — it
currently lists Ranger/Bow with only a placeholder summary ("Curve and draw
length fixed; only material/string glow evolve"), written before any bow
PoC actually existed. This PoC is the first real-world test of that
placeholder claim.

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

The body, equipment, bow, and quiver always fit inside the Reference Frame.

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

Bow position is identical.

Quiver position is identical.

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
Race: Human

Standard Human body proportions — identical baseline to other Human Heroes
(Warrior, Mage). This is the Human Race reference scale (height offset 1.0),
not modified for this Faction.

Race body proportions, height, build, and apparent age range follow this
race's defaults and are never redesigned by Faction or rarity.

------------------------------------------------------------

GENDER AND BODY TYPE LOCK
Gender: Female

Body type: lean, agile build — visibly leaner and less heavily built than a
Human Warrior or Human Tank, but still within standard Human Race
proportions (not shorter, not wider — just a leaner build).

Apparent age range: young adult, approximately 20-35 years old.

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

The bow's length does not affect body scale.

------------------------------------------------------------

POSE
Neutral idle pose.

Heroic, alert stance — weight balanced, bow held diagonally across the body
or lowered at the side, not drawn.

3/4 front view.

Facing LEFT.

No attack pose.

No drawn bowstring.

No running.

No animation.

------------------------------------------------------------

FACTION
Faction:
Iron Legion

Faction Symbol:
Crossed spears behind a closed iron helm — a single combined emblem, full
composition, not just the helm alone.

The symbol is identical everywhere.

Never redesign it.

Never replace it.

Never simplify it.

Never substitute the Lion Kingdom's lion emblem for this symbol — this is a
different Faction with its own identity.

Only evolve:

material

depth

lighting

magic

------------------------------------------------------------

CHEST EMBLEM
Every set of equipment contains the exact same crossed-spears-and-helm
emblem on the chest or a shoulder strap.

Always centered or in the same position.

Never removed.

Never replaced.

Never replaced with a lion or any other Faction's symbol.

------------------------------------------------------------

CLASS EQUIPMENT
Class:
Ranger

Main weapon:
Recurve bow

Offhand / focus:
Quiver of arrows, worn on the back or hip — Ranger carries no shield.

BOW SILHOUETTE LOCK
The bow's overall curve, limb shape, and draw length are immutable across
all six rarities. The bow's silhouette stays visually the same shape and
proportions in every one of the six sprite slots.

Only evolve:

materials (wood -> reinforced wood -> silver-inlaid -> gold-inlaid ->
celestial -> starlight)

bowstring glow and color

quiver decoration

Never shorten the bow. Never change its curve shape. Never turn it into a
crossbow or longbow of different proportions.

------------------------------------------------------------

RARITY CONTRACT
Every rarity inherits everything from the previous rarity.

Nothing disappears.

Nothing is redesigned.

Only additions are allowed.

------------------------------------------------------------

COMMON
Simple iron-grey leather and studded armor, lightweight and practical.

Plain wooden recurve bow, unadorned.

Plain leather quiver with a few arrows visible.

Crossed-spears-and-helm emblem flat painted bronze on the chest strap.

No magical effects.

No particles.

No aura.

------------------------------------------------------------

UNCOMMON
Everything from COMMON.

Add:

bronze trim on armor edges and quiver strap

reinforced bow limbs (slightly carved, still wood)

small banded-iron shoulder piece

slightly raised bronze relief of the crossed-spears emblem (same composition as Common)

------------------------------------------------------------

RARE
Everything from UNCOMMON.

Add:

dark crimson leather accents with faint engraved rune lines

silver-inlaid bow limbs

soft crimson glow along the bowstring

a few floating ember-like particles

half-cloak with bronze fringe

------------------------------------------------------------

EPIC
Everything from RARE.

Add:

reinforced iron-and-bronze armor with embossed patterns

dark red gemstones set into the bow grip and chest emblem

moderate crimson-bronze aura with small sparks

floating arcane glyphs near the quiver

full hooded cloak with bronze trim

------------------------------------------------------------

LEGENDARY
Everything from EPIC.

Add:

celestial white-gold accented armor (Iron Legion colors retained as base,
white-gold as overlay/trim, not replacing the iron-grey/crimson identity)

bow transforms materially into a "bow of light" — same curve and draw
length, glowing white-gold material

small wings of light on the back

strong luminous aura blending white-gold with the Faction's crimson

floating light particles

no halo

------------------------------------------------------------

MYTHIC
Everything from LEGENDARY.

Add:

cosmic night-sky armor accents with animated constellations layered over
the iron-grey/crimson base

bow becomes starlight-forged — same immutable curve and draw length, now
made of living starlight material

living constellations visible on cloak fabric

nebula particle effects

stardust wings

cosmic aura

the same crossed-spears-and-helm emblem remains visible on the chest, now
rendered in starlight material

------------------------------------------------------------

EFFECTS CONTRACT
Visual effects must never change the apparent size of the hero.

The hero model remains identical.

Only magical effects expand around the hero.

Effects never change:

body size

bow size

quiver size

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
- identical Human body proportions (same baseline as Human Warrior/Mage,
  just leaner build, not narrower race proportions)
- identical gender presentation (Female in all six slots)
- identical lean/agile body type and build in all six slots
- identical apparent age (20-35) in all six slots
- identical proportions
- identical camera
- identical alignment
- identical bow curve and draw length in all six slots
- identical quiver placement
- identical crossed-spears-and-helm emblem pose on every chest emblem —
  NEVER the Lion Kingdom's lion
- identical Iron Legion color palette (iron grey, crimson, bronze) — NEVER
  drifting toward Lion Kingdom's blue/gold
- full body visible
- feet visible
- bow visible
- quiver visible
- no shield present in any slot
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

cropped bow

cropped quiver

cropped wings

lion emblem

blue and gold color palette

halo

sword

shield

staff

shortened bow

crossbow

longbow of different proportions

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

> Reviewed 2026-06-27, see `assets/HUMAN_IRON_LEGION_FEMALE_V1.png`
> (note: actual filename on disk omits `_RANGER_`, see
> `03_PIPELINE/01_ATLAS_TO_ASSET_PIPELINE.md` naming note).

**Result: Faction isolation CONFIRMED PASS. No lion-head-style heraldry
defect found on this Faction's emblem. Bow Silhouette Lock PASS. This atlas
is in noticeably better shape than the other two reviewed so far** —
pending a final Gate 1-4 pixel-level pass before full production sign-off,
but no REJECT-level defect found in this review.

- **Faction isolation check — PASS, this is the headline result.** The
  Iron Legion Ranger reads with a completely different palette (iron-grey/
  dark leather/crimson/bronze) and a completely different emblem (round
  medallion with a helm/skull-like motif) than any Lion Kingdom atlas
  (blue/gold, standing lion). At the same time, the body reads as clearly
  the same Human Race baseline as `HUMAN_LION_KINGDOM_WARRIOR_V3.md` and
  `HUMAN_LION_KINGDOM_MAGE_V1.md` — standard human proportions, just a
  leaner build appropriate to Ranger, not a different Race scale. **No
  bleed of Lion Kingdom blue/gold into this atlas, and no drift of body
  proportions caused by the new Faction.** Combined with
  `02_POC/ORC_LION_KINGDOM_TANK_V1.md`'s result (Race varies cleanly on a
  fixed Faction), this is the second half of the empirical confirmation
  that Race and Faction are independently controllable.
- **Heraldry Lock — PASS, notably better than the Lion Kingdom atlases.**
  The round medallion emblem (crossed-spears-behind-a-helm, rendered as a
  circular medallion shape) stays present and recognizably the same
  composition across all six slots, **including Epic and Legendary** —
  the exact slots where both `HUMAN_LION_KINGDOM_WARRIOR_V3.md` and
  `ORC_LION_KINGDOM_TANK_V1.md` degraded to a head-only fragment. This
  atlas does NOT repeat that defect. This is a useful data point: the
  lion-head-only failure mode is not universal to all Epic/Legendary
  slots in this framework — it may be specific to lion-shaped (animal,
  full-body-pose) emblems specifically, which are arguably harder for the
  generator to keep "full body" under added armor detail/ornamentation
  than a flatter medallion-style emblem is. Worth keeping in mind when
  designing future Faction emblems: a medallion/heraldic-crest shape may
  be inherently more robust across rarity than a full-body animal pose.
- **Bow Silhouette Lock — PASS.** The recurve bow's curve and proportions
  read as consistent across all six slots; material/glow evolve (plain
  wood -> reinforced -> glowing string -> gemstone grip -> bow of light ->
  starlight bow) without the bow changing shape, length, or becoming a
  crossbow/longbow. First confirmed use of this lock — update
  `00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md` → "Known weapon locks"
  table to mark Ranger/Bow as confirmed (done, see that file).
- **No-shield, no-offhand-weapon pattern — PASS.** Like Mage, Ranger has no
  shield; unlike Mage, Ranger's free hand isn't used for spell gestures but
  the quiver-on-back placement reads consistently across all six slots
  without drifting position.
- **Pose check — PASS.** "No drawn bowstring" honored in all six slots —
  the bow is held lowered/diagonal, not drawn with an arrow nocked.
- Standard checks: sprite slot safety — PASS. Row 1 vs row 2 baseline —
  same minor drift pattern as other PoCs (row 2 sits very slightly
  higher/smaller), tracked under Gate 6, not a new issue specific to this
  atlas. Facing direction — PASS (faces LEFT correctly). Effect boundary —
  PASS, wings/aura/particles grow in Legendary/Mythic without resizing the
  body.
- **Gate 7 (cross-atlas Faction consistency) — not yet applicable.** This
  is the first and only Iron Legion atlas so far; Gate 7 needs a second
  Iron Legion atlas (e.g. a Male variant, or a different class) to compare
  against before it can be checked. Apply Gate 7 once a second Iron Legion
  atlas exists.
- **framework-gap log: No framework changes needed to make Faction=Iron
  Legion work on an unchanged Race — confirms Race and Faction are
  independently controllable.** No prompt module needed rewriting because
  of this PoC.
- **Combined conclusion (read together with `ORC_LION_KINGDOM_TANK_V1.md`):**
  both isolation tests now PASS on the Race/Faction independence question
  specifically. The Race/Faction split documented in
  `00_FOUNDATION/00_ART_DIRECTION.md` is empirically validated, not just
  asserted in prose. The two defects found elsewhere (lion-head-only,
  cross-atlas shield color mismatch) are generator-reliability issues
  scoped to the Lion Kingdom's specific emblem/palette execution, not
  evidence against the Race/Faction model itself — this Iron Legion atlas
  is a useful control showing the same framework can execute cleanly on a
  different Faction.
- **Action: this atlas is the strongest production candidate of the three
  reviewed so far.** Recommend running it through the full Gate 1-7
  checklist formally (slot-by-slot pixel inspection) before final sign-off,
  but no blocking defect was found in this pass-level review. If it
  continues to hold up, consider using its medallion-style emblem approach
  as a reference example when briefing future Faction designs that need a
  more rarity-robust heraldry shape than Lion Kingdom's full-body lion.
