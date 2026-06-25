# ART DIRECTION -- v1.0

> This document defines **why** each asset looks the way it does.
> Use it alongside ASSET_STYLE_BIBLE.md (the "how") and PROMPT_CONSTRUCTOR.md (the "what").

---

## GLOBAL STYLE RULES

### Game Style
Stylized Fantasy 3D Rendered 2D -- looks like a modern mobile collectible RPG.

### Never Use
- photorealism
- anime / manga
- pixel art
- realistic skin pores or fabric simulation
- heavy weathering, dirt, grunge
- horror realism / gore
- watercolor / oil painting / comic book
- real human photography

### Always Use
- readable silhouettes (recognizable at 64x64)
- exaggerated heroic proportions (heroic 8-head scale)
- clean materials -- polished metal, stylized leather, magical crystal
- strong faction identity -- motif, shape, color on every unit
- collectible RPG character quality -- card-game polish
- mobile game readability at small sizes

### Priority Ladder
`
Consistency > Detail
Readability > Realism
Game Asset > Artwork
Asset Set > Individual Asset
`

---

## CHARACTER PROPORTION SYSTEM

All units share a common proportion baseline. This prevents style drift between classes and factions.

### Human Baseline

| Property | Value | Notes |
|----------|-------|-------|
| Apparent age | 25-40 | Mature, not elderly |
| Build | Athletic | Heroic, not bodybuilder |
| Height | 1.0 (reference scale) | All other factions offset from this |
| Head-to-body ratio | 1:7.5 | Heroic proportion (real human ~1:7) |
| Hands | Slightly enlarged | Improves readability of gestures |
| Weapons | 110-130% of realistic size | Readability at small scale |
| Armor volume | 120% of realistic | Silhouette clarity |

### Weapon Scale Rules

Weapons are deliberately oversized to remain readable at mobile portrait size (512x512 and smaller).

| Weapon Type | Scale vs Realistic | Notes |
|-------------|-------------------|-------|
| One-handed swords | 120-130% length | Standard blade, readable profile |
| Two-handed swords | 140-160% length | Grand weapons need extra presence |
| Shields | 110-120% size | Must cover visible torso area |
| Axes / Hammers | 130-150% head size | Impact readability, not reach |
| Bows | 130-140% length | Silhouette arc must be visible |
| Staves / Spears | 150-170% length | Vertical line readability |
| Daggers / Blades | 110-120% length | Small weapons need extra presence |

All weapon scaling follows the same principle: **readability at 64x64 > realistic proportions**.

### Why This Matters

Without a baseline:
- Warrior drifts toward Conan
- Mage drifts toward Harry Potter
- Tank drifts toward Space Marine

The baseline keeps all classes recognisable as part of the **same world**.

### Faction Proportion Notes

| Faction | Height Offset | Build Notes |
|---------|---------------|-------------|
| Human | 1.0 (baseline) | Athletic, balanced |
| Elf | +0.1 | Taller, more slender, longer limbs |
| Orc | +0.2 | Wider, broader shoulders, shorter legs |
| Undead | 0.0 (same height) | Gaunt, narrower, hollow posture |
| Demon | +0.15 | Taller, muscular, wider horns add visual mass |
| Celestial | +0.05 | Same height, more graceful, floating elements add presence |

---

## CHARACTER EVOLUTION RULES

Rarity upgrades must preserve:

- face identity
- hairstyle
- body proportions
- class silhouette
- faction identity

Only equipment quality may evolve.

A player should instantly recognize the same character across all rarity tiers.

## VISUAL CONSISTENCY PRIORITIES

### Tier 1 (Critical)
Must remain consistent:

- Faction Identity
- Class Identity
- Shape Language
- Color Palette
- Core Materials
- Heraldry

### Tier 2 (Important)
Should remain consistent when applicable:

- Hair Style
- Face Identity
- Age Range
- Body Build

### Tier 3 (Optional)
May vary without affecting character recognition:

- Facial details (eye shape, nose shape, minor proportions)

---

## FACTION VISUAL LANGUAGE

### Human
| Aspect | Definition |
|--------|-----------|
| Motif | Lion |
| Primary colors | Steel, Royal Blue, Gold |
| Shape language | Rectangles, vertical lines, kite shields |
| Materials | Steel, polished metal, blue cloth |
| Heraldic symbol | Lion rampant on shield |
| Themes | Kingdom, Order, Discipline, Honor |

### Elf
| Aspect | Definition |
|--------|-----------|
| Motif | Leaf / Tree |
| Primary colors | White, Silver, Green |
| Shape language | Curves, organic forms, flowing silhouettes |
| Materials | Wood, silver, nature-touched materials |
| Heraldic symbol | Ancient oak with stars |
| Themes | Harmony, Nature, Wisdom |

### Orc
| Aspect | Definition |
|--------|-----------|
| Motif | Tusk / Bone |
| Primary colors | Brown, Dark Green, Rust |
| Shape language | Triangles, heavy asymmetry, massive silhouettes |
| Materials | Bone, iron, leather, crude metal |
| Heraldic symbol | Crossed tusks with axe |
| Themes | Strength, Survival, War |

### Undead
| Aspect | Definition |
|--------|-----------|
| Motif | Skull |
| Primary colors | Grey, Pale Green, Black |
| Shape language | Sharp angles, broken forms, jagged lines |
| Materials | Bone, corrupted metal, tattered cloth |
| Heraldic symbol | Cracked skull with crown |
| Themes | Death, Decay, Necromancy |

### Demon
| Aspect | Definition |
|--------|-----------|
| Motif | Horn |
| Primary colors | Black, Red, Purple |
| Shape language | Aggressive triangles, sharp horns, spikes |
| Materials | Obsidian, dark metal, infernal crystal |
| Heraldic symbol | Horned skull with fire |
| Themes | Chaos, Power, Destruction |

### Celestial
| Aspect | Definition |
|--------|-----------|
| Motif | Star |
| Primary colors | White, Gold, Azure |
| Shape language | Radiating geometry, circles, star motifs |
| Materials | Light metal, celestial crystal, luminous cloth |
| Heraldic symbol | Eight-pointed star with eye |
| Themes | Divinity, Hope, Order |

---

## CLASS DESIGN GUIDE

Every class must be readable at a glance by silhouette alone.

### Warrior
| Aspect | Definition |
|--------|-----------|
| Role | Balanced frontline |
| Signature silhouette | Sword + Shield |
| Armor weight | Medium |
| Readability cue | Balanced, classic hero profile |

### Tank
| Aspect | Definition |
|--------|-----------|
| Role | Protection, damage absorption |
| Signature silhouette | Massive shield |
| Armor weight | Heavy |
| Readability cue | Largest armor profile -- widest silhouette |

### Mage
| Aspect | Definition |
|--------|-----------|
| Role | Magic damage |
| Signature silhouette | Staff |
| Armor weight | Light (robes) |
| Readability cue | Visible magical focus (orb, crystal, staff glow) |

### Healer
| Aspect | Definition |
|--------|-----------|
| Role | Support healing |
| Signature silhouette | Staff / Wand + Tome |
| Armor weight | Light |
| Readability cue | Holy symbols, light colours, healing glow |

### Ranger
| Aspect | Definition |
|--------|-----------|
| Role | Ranged physical damage |
| Signature silhouette | Bow |
| Armor weight | Medium-light |
| Readability cue | Long weapon profile, hood/cape |

### Assassin
| Aspect | Definition |
|--------|-----------|
| Role | Burst damage |
| Signature silhouette | Dual blades |
| Armor weight | Light |
| Readability cue | Lean profile, darker tones, compact stance |

### Support
| Aspect | Definition |
|--------|-----------|
| Role | Buffs / utility |
| Signature silhouette | Banner / Tome / Orb |
| Armor weight | Medium |
| Readability cue | Utility equipment visible (banner, floating tome, aura) |

### Orc-Replacement Classes

| Class | Replaces | Role | Signature Silhouette |
|-------|----------|------|---------------------|
| Berserker | Assassin | Melee burst | Dual axes, massive physique, rage aura |
| Shaman | Healer | Magic support | Totem, spirit mask, elemental effects |
| Hunter | Ranger | Ranged damage | Spear, beast pelt, animal companion |

---

## CLASS DIFFERENTIATION RULES

Different classes must be visually distinct from each other.

Every class should be recognizable by silhouette alone — even at 64x64 px, no face visible.

| Class | Weapon | Defining Visual Trait |
|-------|--------|----------------------|
| Warrior | Sword + Shield | Balanced, armored, versatile |
| Tank | Massive Shield + Mace | Heaviest armor, broadest frame |
| Mage | Staff, Magic Focus | Robes, floating elements, glowing aura |
| Healer | Staff, Holy Symbols | Light robes, soft glow, hood |
| Ranger | Bow, Quiver | Light armor, lean build, cloak |
| Assassin | Dual Blades | Slim silhouette, hooded, crouched stance |
| Support | Banner, Orb, Tome | Medium robe, ornamental, positioned back |

**Orc-specific replacements:**

| Orc Class | Replaces | Defining Visual Trait |
|-----------|----------|----------------------|
| Berserker | Assassin | Massive dual axes, muscular, rage aura |
| Shaman | Healer | Totem, spirit mask, bone ornaments |
| Hunter | Ranger | Spear, beast pelt, animal companion |

---

## NEW FACTION CREATION RULES

If a new faction is ever added (Dwarf, Beastmen, Dragonkin, Vampire, etc.), all of the following must be defined before any asset is generated.

### Required Checklist

1. **Name** -- Faction label
2. **Symbol / Motif** -- Core iconographic motif (e.g. Lion, Skull, Star)
3. **Primary colors** -- 2-3 dominant colours
4. **Secondary colors** -- 1-2 accent colours
5. **Shape language** -- Geometric identity (rectangles, curves, triangles)
6. **Core materials** -- Signature materials (steel, bone, crystal)
7. **Themes** -- 2-4 thematic keywords (Order, Chaos, Nature)
8. **Architecture style** -- How their buildings look
9. **Weapon style** -- Weapon design language
10. **Armor style** -- Armor design language
11. **Magic style** -- Spell effects visual identity
12. **Background biome** -- Associated environment
13. **Boss identity** -- Unique boss design direction
14. **UI accent color** -- UI colour for faction-themed panels
15. **Emotion portrait style** -- How their emotion portraits differ

> Without this checklist, a new faction **cannot be approved** for asset generation.

---

## NEW CLASS CREATION RULES

If a new class is ever added, all of the following must be defined:

### Required Checklist

1. **Combat role** -- What the class does in battle
2. **Weapon type** -- Primary weapon
3. **Armor weight** -- Light / Medium / Heavy
4. **Signature silhouette** -- Readable at 64x64
5. **Animation profile** -- Idle, attack, hit stance notes
6. **Rarity progression path** -- How equipment changes per tier
7. **Portrait characteristics** -- Framing, expression baseline
8. **Emotion profile** -- How this class expresses emotions differently

---

## STYLE ANCHOR RULES

### The Anchor Principle

Every faction+class combination starts with a single **BASE model** that becomes the **Style Anchor** for all future variants.

### Rules

1. **No rarity variant may be generated before BASE approval.**
2. The approved BASE becomes the **STYLE ANCHOR**.
3. All future variants must use **Image Guidance at 35-45%** strength.
4. If any variant's style diverges recognisably from the anchor -> **asset is rejected**.
5. Style Anchor approval is documented in PROMPT_CONSTRUCTOR.md (REFERENCE LOCK section).
6. Once approved, Style Anchor DNA **must not change**.

### Workflow

`
Generate 4-8 BASE variants
        |
Select best candidate
        |
Approve as Style Anchor
   (set to YES in REFERENCE LOCK)
        |
Generate all rarity variants
   (using Image Guidance 35-45%)
        |
Review against anchor
   (reject if style drifted)
`

## CHARACTER IDENTITY TYPES

Not every character needs face consistency. Three distinct identity types exist, each with different rules.

---

### HERO CHARACTER

Named playable character that the player controls.

| Property | Rule |
|----------|------|
| Identity | Must remain consistent across ALL rarity tiers |
| Face | Same face, same hairstyle, same age range — always |
| Silhouette | Same class silhouette, same body proportions |
| Purpose | Player recognizes THEIR character instantly |
| Example | Human Warrior Base → Human Warrior Rare → Human Warrior Epic = the same hero |

**Prompt rule:** Always use Image Guidance from the approved BASE of this specific hero.

---

### GENERIC UNIT

Faction member used as enemy, ally, or background trooper.

| Property | Rule |
|----------|------|
| Identity | May vary — different faces, hair, ages, builds |
| Face | **Not** locked — can be regenerated per instance |
| Must preserve | Faction identity, class identity, color palette, heraldry, shape language |
| Purpose | Populate the world with believable faction members |
| Example | Human Kingdom Warrior A, Human Kingdom Warrior B, Human Kingdom Warrior C — each a different face, but all wear blue/gold with lion crest |

**Prompt rule:** Use faction templates, NOT a specific hero BASE. Vary seed or omit Image Guidance for the face.

---

### NPC CHARACTER

Unique story character that is not playable.

| Property | Rule |
|----------|------|
| Identity | Unique — own face, own hairstyle, own design |
| Face | Locked for THIS character only (not shared with hero or other NPCs) |
| Faction | May belong to any faction, or be factionless |
| Purpose | Memorable story encounter |
| Examples | Captain Roland (Human, not our Warrior), Blacksmith Bronson, Queen Elyndra |

**Prompt rule:** Generate from scratch with a unique description. Save and lock the approved result as a new Style Anchor.

---

### Quick Decision Guide

```
Is it the player’s character?
  → HERO — lock face identity across all rarities
No — is it a named story character?
  → NPC — generate unique face, lock for this character only
No — is it a faction member (enemy/ally/trooper)?
  → GENERIC UNIT — face can vary, keep faction identity
```

---

### Why This Matters

Before this distinction, every “Human Warrior” had the same face — which made the world feel small. Now:

- Your **Hero** feels like YOUR character
- **Generic units** make armies look populated (different faces, same faction)
- **NPCs** feel like real people, not clones

This is the difference between a project that generates images and a project that builds a scalable universe.

---

*This document is the visual constitution of Idle Kingdom Revolution. Questions of style authority are settled here first.*