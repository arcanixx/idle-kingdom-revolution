# PROMPT_CONSTRUCTOR v1.0

INPUT:

Faction:
{faction}

Class:
{class}

Rarity:
{rarity}

Pose:
{pose}

AssetType:
{portrait|boss|item|background}

---

FACTION DEFINITIONS

Human:
gold, blue, steel

Elf:
green, silver, white

Orc:
brown, green, bone

Undead:
gray, corpse-green

Demon:
red, black, purple

Celestial:
gold, white, azure

---

CLASS DEFINITIONS

Warrior:
sword & shield
medium armor
classic silhouette
frontline soldier
faction heraldry visible

Tank:
massive shield
heavy armor
broad silhouette
largest armor volume
defensive stance

Mage:
staff
robes
magical focuses
arcane energy effects

Ranger:
bow
hood
light silhouette
agile stance

Assassin:
dual blades
darker elements
slim silhouette
low profile stance

Healer:
wand / rod
holy symbols
light materials
healing aura

Support:
banner
book
support artifact
buff aura

### Orc-Replacement Classes

Berserker:
dual axes
brutal style
massive physique
rage presence

Shaman:
totem
spirit mask
elemental focus
nature magic

Hunter:
spear
beast pelt
tracker silhouette
animal companion

---

SHAPE LANGUAGE

| Faction | Dominant Shapes |
|---------|-----------------|
| Human | rectangles, kite shields |
| Elf | arches, curves, leaves |
| Orc | triangles, spikes |
| Undead | broken lines |
| Demon | sharp horns |
| Celestial | stars and circles |

---

RARITY DEFINITIONS

Base:
  reference character
  neutral stance baseline
  no extra effects
  plain equipment, no decorations
  no heraldry
  no armor detailing
  bare minimum polygons for readable silhouette

Common:
  5-10% more detail than Base
  minor heraldry improvements
  minor armor refinement
  no additional cloth elements
  no capes
  no major shield redesign
  no visual prestige increase

Uncommon:
  15-25% more detail than Base
  clear heraldry: faction symbol visible on chest/shield
  improved armor: mixed materials (leather/fur/iron)
  minor cloth: small tabard or shoulder cape
  subtle glow on weapons
  no full cloak
  no gemstone embellishments

Rare:
  30-40% more detail than Base
  prominent heraldry: painted faction crest, engraved symbols
  enchanted equipment: silver/blue steel, glowing runes
  moderate cloth: half-cloak or long tabard
  soft magical aura around weapon
  small gems in armor joints
  helmet decoration: crest or plume

Epic:
  50-65% more detail than Base
  ornate heraldry: gold inlay, gemstone-encrusted crest
  ornate magical equipment: gold filigree, rubies
  full cloak with faction-colored trim
  moderate aura with magical sparks
  glowing eyes optional
  elaborate pauldrons and greaves

Legendary:
  75-90% more detail than Base
  celestial heraldry: divine symbols, halos, light motes
  divine equipment: armor of light and gold
  flowing enchanted cloak with particle trail
  strong aura with floating particles
  winged helmet or crown of light
  floating elements (orbiting runes, small wings)

Mythic:
  100%+ more detail than Base (maximum visual density)
  mythic divine armor with constellation engravings
  living celestial energy coursing through equipment
  ancient cosmic symbols glowing on armor and weapons
  godly aura with galaxy-like particle effects
  ethereal wings or cosmic backpiece
  everything in motion: floating cloth, energy trails, orbiting elements

---

CHARACTER CONSISTENCY RULES

For rarity progression of the same hero:

Preserve:
- face identity
- hairstyle
- age range
- body proportions
- class silhouette
- faction identity

Upgrade only:
- armor complexity
- heraldry richness
- material quality
- equipment prestige

---

POSE DEFINITIONS

idle:
neutral stance

attack:
mid-swing,
dynamic motion

hit:
staggered,
reacting to impact

---

OUTPUT TEMPLATE

Stylized fantasy 3D render of a {rarity} {faction} {class},
{equipment description},
{pose description},
soft studio lighting,
warm key light,
cool fill light,
subtle rim light,
transparent background,
centered composition,
clean silhouette,
high readability,
mobile RPG game asset,
high detail,
4k quality,
fantasy collectible character.

Negative prompt:

low quality,
blurry,
watermark,
text,
logo,
multiple characters,
cropped,
extra limbs,
anime,
photorealistic,
pixel art

---

## PORTRAIT / DIALOGUE PROMPT TEMPLATE

For story scenes, tutorials, and dialogue portraits where characters show emotion.

**INPUT:**

Faction:
{faction}

Class:
{class}

Rarity:
{rarity}

Emotion:
{emotion}

**EMOTIONS LIST:**

| Emotion | Description | Pose Hint | Type |
|---------|-------------|-----------|------|
| Neutral | Default, calm expression | Standing straight, hands relaxed | General |
| Happy | Smiling, warm expression | Slight head tilt, open gesture | General |
| Sad | Downcast eyes, solemn | Looking down, lowered shoulders | General |
| Angry | Frowning, intense glare | Lean forward, clenched fist | General |
| Surprised | Eyes wide, mouth slightly open | Step back, hands raised | General |
| Scared | Fearful expression, defensive | Guarded pose, visible tension | General |
| Serious | Focused, determined | Strong stance, hand on weapon | General |
| Laughing | Joyful, head back | Open mouth, relaxed posture | General |
| Suspicious | Squinted eyes, skeptical | Tilted head, arms crossed | General |
| Shocked | Extreme surprise | Recoiling, hands to face | General |
| Confused | Tilted head, furrowed brow | One hand raised, questioning | General |
| Tired | Exhausted, heavy eyes | Slumped posture, hand on forehead | General |
| Scheming | Smirk, sly look | Half-closed eyes, subtle gesture | General |
| Heroic | Proud, inspiring | Chest out, weapon raised | General |
| Menacing | Threatening, dark | Looming posture, glowing eyes | General |
| Determined | Determined, resolute | Set jaw, focused eyes, ready stance | General |
| Victorious | Triumphant, post-victory | Raised fist, proud smile, glowing confidence | General |
| Defeated | Beaten, post-defeat | Head down, slumped shoulders, empty gaze | General |
| Wounded | Injured, weakened | Clutching wound, strained expression, blood visible | General |
| Exhausted | At the limit, drained | Hollow eyes, limp posture, barely standing | General |
| Pain | In pain, taking hit | Grimacing, recoiling from impact, sharp reaction | General |
| Mind Controlled | Manipulated, not themselves | Blank expression, glowing eyes, magical aura | Special |
| Sick | Ill, weak | Pale complexion, feverish look, sweating | Special |
| Poisoned | Poisoned | Green/purple tint, sickly grimace | Special |
| Frozen | Frozen solid | Ice crystals, blue tint, shivering | Special |
| Stoned | Petrified | Grey stone texture, rigid pose, cracked skin | Special |
| Burned | Burnt, scorched | Soot/ash on skin, red burned patches | Special |
| Charmed | Enchanted, smitten | Dreamy expression, rosy cheeks, dazed smile | Special |
| Cursed | Dark magic afflicted | Dark purple aura, shadowy veins, sinister glow | Special |
| Blessed | Holy power | Golden glow, serene expression, warm light | Special |
| Berserk | Battle fury | Wild eyes, clenched teeth, veins bulging, animalistic rage | Special |

**OUTPUT TEMPLATE:**

Fantasy 3D render portrait of a {emotion} {faction} {class}, {rarity} quality, {emotion_description}, half-body shot, {pose_hint}, soft studio lighting, warm key light, detailed fantasy armor with faction motif ({faction_motif}), transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**EXAMPLE (Human Warrior, Happy):**

Fantasy 3D render portrait of a happy human warrior, common quality, warm smile and relaxed expression, half-body shot, slight head tilt with open hand gesture, soft studio lighting, warm key light, detailed steel armor with golden trim and lion motif on chest, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**EXAMPLE (Demon Mage, Menacing):**

Fantasy 3D render portrait of a menacing demon mage, epic quality, threatening glare with glowing red eyes, half-body shot, looming posture with hands crackling with fire, soft studio lighting, warm key light, detailed dark robes with horn-shaped crystal ornaments, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**USAGE:** Generate these as 512x512 assets stored in `public/assets/portraits/{faction}/` for use in story scenes, tutorials, dialogue, and event popups.

---


## REFERENCE LOCK

The following BASE models serve as the visual anchor for all generated assets. Once approved, their DNA must not change.

Approved -- YES / NO (all start as NO until verified) (strike through if rejected)

### Human
- **REF_001_HUMAN_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_002_HUMAN_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_003_HUMAN_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_004_HUMAN_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_005_HUMAN_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_006_HUMAN_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_007_HUMAN_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Elf
- **REF_008_ELF_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_009_ELF_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_010_ELF_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_011_ELF_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_012_ELF_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_013_ELF_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_014_ELF_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Orc
- **REF_015_ORC_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_016_ORC_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_017_ORC_BERSERKER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_018_ORC_SHAMAN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_019_ORC_HUNTER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_020_ORC_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_021_ORC_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Undead
- **REF_022_UNDEAD_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_023_UNDEAD_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_024_UNDEAD_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_025_UNDEAD_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_026_UNDEAD_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_027_UNDEAD_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_028_UNDEAD_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Demon
- **REF_029_DEMON_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_030_DEMON_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_031_DEMON_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_032_DEMON_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_033_DEMON_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_034_DEMON_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_035_DEMON_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Celestial
- **REF_036_CELESTIAL_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_037_CELESTIAL_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_038_CELESTIAL_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_039_CELESTIAL_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_040_CELESTIAL_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_041_CELESTIAL_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_042_CELESTIAL_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING
