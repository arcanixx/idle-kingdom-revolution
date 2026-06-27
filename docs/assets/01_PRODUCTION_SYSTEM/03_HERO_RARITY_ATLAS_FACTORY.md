# HERO_RARITY_ATLAS_FACTORY v1.0

Project:
Idle Kingdom Revolution

Purpose:
Reusable factory for creating future Hero rarity atlas prompts after the Human Warrior PoC.

---

## CORE IDEA

Do not write every prompt from scratch.

Build every Hero rarity atlas prompt from stable modules:

```text
1. Production Sprite Atlas Contract
2. Reference Frame System
3. Hero Identity Lock
4. Faction Module
5. Class Module
6. Symbol / Heraldry Lock
7. Weapon Lock
8. Rarity Evolution Table
9. Effects Contract
10. QA Checklist
11. Negative Prompt
```

---

## REQUIRED INPUTS

Every new Hero prompt needs these values:

```text
faction:
class:
gender:
state:
primary_symbol:
secondary_symbol:
main_weapon:
offhand_or_focus:
base_colors:
rarity_theme:
forbidden_shapes:
```

Example:

```text
faction: Human / Lion Kingdom
class: Warrior
gender: male
state: idle
primary_symbol: standing heraldic lion
secondary_symbol: crown / sword
main_weapon: longsword
offhand_or_focus: blue kite shield
base_colors: blue, gold, polished steel
rarity_theme: royal -> celestial -> cosmic
forbidden_shapes: round shield, tower shield, lion head only, halo
```

---

## PROMPT SKELETON

Use this skeleton for future Hero rarity atlases.

```text
PROJECT
Idle Kingdom Revolution

ASSET TYPE
Production Sprite Atlas

OUTPUT
Generate ONE production sprite atlas.
Resolution: 2048 x 1365.
Aspect Ratio: 3:2.
Exactly six heroes.
Exactly one image.
This is NOT an illustration.
This is a production asset that will be automatically sliced into six independent sprites.

SPRITE ATLAS
Create a perfectly geometric production sprite atlas.
2 rows.
3 columns.
Exactly six identical sprite slots.
Every slot has identical width and height.
No perspective distortion.
No artistic layout.
No text labels.
No watermark.

BACKGROUND
Atlas separators: flat neutral grey (#808080).
Inside every sprite slot: flat chroma green (#00A651).
The green background must be perfectly uniform.
No gradients, lighting, shadows, texture, or color variation.

REFERENCE FRAME
Every sprite slot contains one invisible Reference Frame.
Every Reference Frame has identical size and position.
The body, armor, weapon, and equipment fit inside the Reference Frame.
Only magical effects may extend outside the Reference Frame.
Nothing may ever leave the sprite slot.

HERO IDENTITY
Imagine one finished 3D game character.
Duplicate this exact same model six times.
Each duplicate has exactly the same size.
Do NOT redraw, reinterpret, or rescale the character.
Only equipment materials, ornamentation, and magical effects evolve.

POSE
Neutral idle pose.
Heroic stance.
3/4 front view.
Facing LEFT.
No attack pose.
No running.
No animation.

FACTION
Faction: {faction}
Faction Symbol: {primary_symbol}
The symbol is treated as a company logo.
It is identical everywhere.
Never redesign it.
Never replace it.
Only material, depth, lighting, and magic may evolve.

CLASS
Class: {class}
Main weapon: {main_weapon}
Offhand/focus: {offhand_or_focus}
Class silhouette remains identical across rarity.

RARITY CONTRACT
Every rarity inherits everything from the previous rarity.
Nothing disappears.
Nothing is redesigned.
Only additions are allowed.

COMMON
{common_description}

UNCOMMON
Everything from COMMON.
Add: {uncommon_additions}

RARE
Everything from UNCOMMON.
Add: {rare_additions}

EPIC
Everything from RARE.
Add: {epic_additions}

LEGENDARY
Everything from EPIC.
Add: {legendary_additions}

MYTHIC
Everything from LEGENDARY.
Add: {mythic_additions}

EFFECTS CONTRACT
Visual effects must never change the apparent size of the hero.
The hero model remains identical.
Only magical effects expand around the hero.
Effects never change body size, equipment size, weapon size, or armor size.

STYLE
Stylized fantasy 3D render.
AAA mobile RPG quality.
Game-ready asset.
Sharp readable silhouettes.
Inspired by AFK Arena and Raid Shadow Legends.

NEGATIVE PROMPT
photorealistic, anime, manga, painting, concept art, watercolor, pixel art, text, watermark, logo, signature, cropped, missing feet, cropped weapon, cropped shield, cropped wings, different face, different body proportions, different pose, different camera, environment, ground shadows, random redesign, uneven grid, labels
```

---

## FIRST PRODUCTION ORDER

Recommended first batch after Human Warrior PoC:

1. Human Warrior male idle rarity atlas
2. Human Warrior female idle rarity atlas
3. Human Mage male idle rarity atlas
4. Human Mage female idle rarity atlas
5. Human Tank male idle rarity atlas
6. Human Tank female idle rarity atlas

Reason:

- Human faction visual language is now proven.
- Blue/gold/st Steel pipeline is established.
- It gives enough variety to validate weapons, robes, armor mass, shields, and spell effects.

---

## CLASS-SPECIFIC NOTES

### Warrior

- weapon: longsword
- offhand: kite shield
- silhouette risk: sword and wings hitting slot borders
- lock: shield heraldry

### Mage

- weapon: staff
- offhand: spellbook or orb
- silhouette risk: staff height, spell aura too large
- lock: staff length and hand position

### Tank

- weapon: mace or hammer
- offhand: large shield
- silhouette risk: shield becomes too large by rarity
- lock: shield type and body scale

### Healer

- weapon: staff or censer
- offhand: holy focus
- silhouette risk: halo-like effects if not intended
- lock: gentle readable light effects

### Ranger

- weapon: bow
- offhand: quiver
- silhouette risk: bow crosses slot border
- lock: bow curve and arrow/quiver placement

### Assassin

- weapon: dual daggers
- offhand: second dagger
- silhouette risk: pose becomes action pose
- lock: idle stance, no jumping, no attack pose

### Support

- weapon: banner, lute, relic, or staff
- offhand: faction focus
- silhouette risk: prop redesign across rarity
- lock: prop identity as logo-like object
