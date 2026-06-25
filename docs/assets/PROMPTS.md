# PROMPTS.md – Zbiór zatwierdzonych promptów

> **UWAGA:** Ten plik zawiera **tylko zatwierdzone prompty** (Style Anchors).
> Prompty tymczasowe/testowe NIE są tutaj zapisywane – trzymamy je osobno.

## Struktura pliku

- Każdy prompt ma unikalny identyfikator: `REF_XXX_{FACTION}_{CLASS}_BASE`
- Po zatwierdzeniu BASE jako Style Anchor, prompt jest przenoszony do tego pliku.
- Prompty dla rarity (Common → Mythic) są generowane na podstawie BASE – nie zapisujemy ich tutaj, tylko w `PROMPT_CONSTRUCTOR.md`.

**Obecnie zatwierdzone:**
- `REF_001_HUMAN_WARRIOR_BASE` – zatwierdzony, używany jako Style Anchor.


## Płeć w promptach

- **Hero:** Generuj obie płcie (Male + Female) dla wybranej frakcji + klasy.
- **Generic Unit:** 65% male, 35% female (Orc: 70/30, Celestial: androgyniczne).
- **NPC:** Zgodnie ze scenariuszem.
- **Wiek:** Patrz 00_ART_DIRECTION.md → GENDER REPRESENTATION → Age Diversity.

**Przykład promptu z płcią:**
```
...female, young adult, soft studio lighting...
```
===============================================================================

REF_001_HUMAN_WARRIOR_BASE

Stylized fantasy 3D render of a Human Warrior Base character for a mobile RPG game.

Full body character from head to feet.
Feet fully visible.
3/4 front view.
Centered composition.
Character occupies 75-80% of frame.
Transparent background.

Athletic adult human male, age 30-35.
Heroic proportions.
Strong jawline.
Short brown hair.
Clean-shaven.
Confident but disciplined expression.

Human Kingdom faction.

Lion heraldry motif.

Polished steel plate armor.
Subtle gold trim.
Royal blue cloth accents.

Lion emblem engraved on chestplate.

Lion heraldic kite shield.
Long steel longsword.
Blade length clearly visible.
Sword reaches from shoulder height
to near ground level.

Balanced visual weight
between sword and shield.

Medium armor.
Professional frontline soldier.
Entry-level kingdom warrior.
Not a captain.
Not a champion.
Not a legendary hero.

Readable silhouette.

Human shape language:
rectangular armor forms,
clean geometric structure,
vertical lines,
kite shield silhouette.

Materials:
polished steel,
blue cloth,
leather straps.

No battle damage.
No dirt.
No rust.
No weathering.

Modest equipment.
No magical effects.
No glowing elements.
No aura.
No gemstones.
No enchanted equipment.

Soft studio lighting.
Warm key light from upper left.
Cool fill light from upper right.
Subtle rim light.

Stylized fantasy 3D render.
Game-ready asset quality.
Mobile RPG collectible hero style.
High readability at small size.
Consistent faction design.
Consistent class design.

Negative prompt:

photorealistic,
anime,
manga,
watermark,
logo,
signature,
text,
cropped,
portrait crop,
half body,
missing feet,
multiple characters,
duplicate weapons,
extra limbs,
bad anatomy,
pixel art,
oil painting,
concept sketch,
dark horror,
realistic skin pores,
gritty realism,
heavy weathering,
extreme shadows,
oversized sword,
oversized shield,
glowing eyes,
magic aura,
legendary armor,
epic armor,
mythic armor,
floating particles
short sword
arming sword
undersized weapon


===============================================================================

REF_002_HUMAN_WARRIOR_COMMON

Stylized fantasy 3D render of a Human Warrior Common character for a mobile RPG game.

Full body character from head to feet.
Feet fully visible.
3/4 front view.
Centered composition.
Character occupies 75-80% of frame.
Transparent background.

Same character identity as Human Warrior Base.

Athletic adult human male, age 30-35.
Heroic proportions.
Strong jawline.
Short brown hair.
Clean-shaven.
Confident expression.

Human Kingdom faction.

Lion heraldry motif.

Polished steel plate armor.
Refined armor construction.
Additional armor detailing.
Subtle gold trim.
Royal blue cloth accents.

Lion emblem engraved on chestplate.

Lion heraldic kite shield.
Improved shield craftsmanship.
Decorative shield border.

Long steel longsword.
Blade length clearly visible.
Balanced visual weight between sword and shield.

Medium armor.

Experienced frontline soldier.
Veteran kingdom warrior.

Not a captain.
Not a champion.
Not a legendary hero.

Readable silhouette.

Human shape language:
rectangular armor forms,
clean geometric structure,
vertical lines,
kite shield silhouette.

Materials:
polished steel,
blue cloth,
leather straps.

No battle damage.
No dirt.
No rust.
No weathering.

Improved equipment quality.
Higher craftsmanship than Base tier.

No magical effects.
No glowing elements.
No aura.
No gemstones.
No enchanted equipment.

Soft studio lighting.
Warm key light from upper left.
Cool fill light from upper right.
Subtle rim light.

Stylized fantasy 3D render.
Game-ready asset quality.
Mobile RPG collectible hero style.
High readability at small size.
Consistent faction design.
Consistent class design.

Negative prompt:

photorealistic,
anime,
manga,
watermark,
logo,
signature,
text,
cropped,
portrait crop,
half body,
missing feet,
multiple characters,
duplicate weapons,
extra limbs,
bad anatomy,
pixel art,
oil painting,
concept sketch,
dark horror,
realistic skin pores,
gritty realism,
heavy weathering,
extreme shadows,
short sword,
undersized weapon,
glowing eyes,
magic aura,
legendary armor,
epic armor,
mythic armor,
floating particles

===============================================================================

REF_003_HUMAN_WARRIOR_UNCOMMON

Stylized fantasy 3D render of a Human Warrior Uncommon character for a mobile RPG game.

Full body character from head to feet.
Feet fully visible.
3/4 front view.
Centered composition.
Character occupies 75-80% of frame.
Transparent background.

Same character identity as Human Warrior Base.

Athletic adult human male, age 30-35.
Heroic proportions.
Strong jawline.
Short brown hair.
Clean-shaven.
Confident expression.

Human Kingdom faction.

Lion heraldry motif.

Polished steel plate armor.
Enhanced armor craftsmanship.
Additional panel detailing.
More refined gold trim.
Royal blue cloth accents.

Lion emblem engraved on chestplate.

Lion heraldic kite shield.
Decorative shield border.
Raised lion relief on shield.

Long steel longsword.
Well-crafted blade.
Decorative crossguard.

Medium armor.

Veteran kingdom warrior.

Readable silhouette.

Human shape language:
rectangular armor forms,
clean geometric structure,
vertical lines,
kite shield silhouette.

Materials:
polished steel,
blue cloth,
leather straps.

No battle damage.
No dirt.
No rust.
No weathering.

High-quality equipment.

No magical effects.
No glowing elements.
No aura.
No gemstones.
No enchanted equipment.

Soft studio lighting.
Warm key light from upper left.
Cool fill light from upper right.
Subtle rim light.

Stylized fantasy 3D render.
Game-ready asset quality.
Mobile RPG collectible hero style.
High readability at small size.

Negative prompt:

photorealistic,
anime,
manga,
watermark,
logo,
signature,
text,
cropped,
portrait crop,
half body,
missing feet,
multiple characters,
duplicate weapons,
extra limbs,
bad anatomy,
pixel art,
oil painting,
concept sketch,
dark horror,
realistic skin pores,
gritty realism,
heavy weathering,
extreme shadows,
magic aura,
glowing eyes,
epic armor,
legendary armor,
mythic armor,
floating particles


## Text-to-Image Variants (no reference)

> **UWAGA:** To są ALTERNATYWNE wersje dla narzędzi BEZ Image Guidance (Bing, Dezgo, freegen.app).  
> **Główna wersja** (z transparent background) jest powyżej i jest używana z Leonardo.ai i innymi narzędziami z Image Guidance.

### REF_001_HUMAN_WARRIOR_BASE_T2I

Full body character portrait, head to toes fully visible, feet touching the absolute bottom edge of the frame. 3/4 front view, centered. Stylized 3D game asset, mobile RPG hero style. Athletic adult human male, age 30-35. Heroic proportions. Strong jawline. Short brown hair. Clean-shaven. Confident but disciplined expression. Human Kingdom faction. Lion heraldry motif. Polished steel plate armor. Subtle gold trim. Royal blue cloth accents. Lion emblem engraved on chestplate. Lion heraldic kite shield. Long steel longsword. Blade length clearly visible. Sword reaches from shoulder height to near ground level. Balanced visual weight between sword and shield. Medium armor. Professional frontline soldier. Entry-level kingdom warrior. Not a captain. Not a champion. Not a legendary hero. Readable silhouette. Human shape language: rectangular armor forms, clean geometric structure, vertical lines, kite shield silhouette. Materials: polished steel, blue cloth, leather straps. No battle damage. No dirt. No rust. No weathering. Modest equipment. No magical effects. No glowing elements. No aura. No gemstones. No enchanted equipment. Soft studio lighting. Warm key light from upper left. Cool fill light from upper right. Subtle rim light. Solid flat medium-grey background #808080. No ground shadows. High readability at small size. Consistent faction design. Consistent class design.

**Negative:**
photorealistic, anime, manga, watermark, logo, signature, text, cropped, cut off, missing feet, missing head, portrait, close-up, half body, ground shadows, drop shadows, transparent background, holding shield on back, multiple characters, duplicate weapons, extra limbs, bad anatomy, pixel art, oil painting, concept sketch, dark horror, realistic skin pores, gritty realism, heavy weathering, extreme shadows, oversized sword, oversized shield, glowing eyes, magic aura, legendary armor, epic armor, mythic armor, floating particles, short sword, arming sword, undersized weapon