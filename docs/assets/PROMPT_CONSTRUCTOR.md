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

RARITY DEFINITIONS

Common:
simple equipment

Uncommon:
enhanced equipment

Rare:
enchanted equipment

Epic:
ornate magical equipment

Legendary:
divine equipment

Mythic:
reality-bending equipment

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

| Emotion | Description | Pose Hint |
|---------|-------------|-----------|
| Neutral | Default, calm expression | Standing straight, hands relaxed |
| Happy | Smiling, warm expression | Slight head tilt, open gesture |
| Sad | Downcast eyes, solemn | Looking down, lowered shoulders |
| Angry | Frowning, intense glare | Lean forward, clenched fist |
| Surprised | Eyes wide, mouth slightly open | Step back, hands raised |
| Scared | Fearful expression, defensive | Guarded pose, visible tension |
| Serious | Focused, determined | Strong stance, hand on weapon |
| Laughing | Joyful, head back | Open mouth, relaxed posture |
| Suspicious | Squinted eyes, skeptical | Tilted head, arms crossed |
| Shocked | Extreme surprise | Recoiling, hands to face |
| Confused | Tilted head, furrowed brow | One hand raised, questioning |
| Tired | Exhausted, heavy eyes | Slumped posture, hand on forehead |
| Scheming | Smirk, sly look | Half-closed eyes, subtle gesture |
| Heroic | Proud, inspiring | Chest out, weapon raised |
| Menacing | Threatening, dark | Looming posture, glowing eyes |

**OUTPUT TEMPLATE:**

Fantasy 3D render portrait of a {emotion} {faction} {class}, {rarity} quality, {emotion_description}, half-body shot, {pose_hint}, soft studio lighting, warm key light, detailed fantasy armor with faction motif ({faction_motif}), transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**EXAMPLE (Human Warrior, Happy):**

Fantasy 3D render portrait of a happy human warrior, common quality, warm smile and relaxed expression, half-body shot, slight head tilt with open hand gesture, soft studio lighting, warm key light, detailed steel armor with golden trim and lion motif on chest, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**EXAMPLE (Demon Mage, Menacing):**

Fantasy 3D render portrait of a menacing demon mage, epic quality, threatening glare with glowing red eyes, half-body shot, looming posture with hands crackling with fire, soft studio lighting, warm key light, detailed dark robes with horn-shaped crystal ornaments, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**USAGE:** Generate these as 512x512 assets stored in `public/assets/portraits/{faction}/` for use in story scenes, tutorials, dialogue, and event popups.
