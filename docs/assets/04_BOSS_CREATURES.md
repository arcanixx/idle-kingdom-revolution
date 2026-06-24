# 04 – Boss Creatures

> Bossowie etapów – epickie stworzenia.
> Rozmiar: 512×512 WebP (1024×1024 dla bossów Epic/Legendary/Mythic)
> Styl: 3D render fantasy boss creature, pełna sylwetka, epicka skala.

---

## Zasady stylu

- **Kadr:** Pełna sylwetka (lub 3/4 widok), dynamiczna poza.
- **Skala:** Boss powinien sprawiać wrażenie potężnego – może zajmować 90% kadru.
- **Tło:** Przezroczyste (alpha channel).
- **Oświetlenie:** Dramatyczne, z wyraźnym rim light.
- **Detale:** Bardzo wysoki poziom szczegółowości, widoczne tekstury skóry/pancerza.

---

## Lista bossów

| # | Boss | Frakcja | Rarity | Motyw |
|---|------|---------|--------|-------|
| 1 | Fire Dragon | Neutralny | Legendary | Ogień, magma |
| 2 | Ice Lich | Undead | Epic | Lód, śmierć |
| 3 | Earth Elemental | Neutralny | Rare | Kamień, natura |
| 4 | Abyss Demon | Demon | Mythic | Otchłań, chaos |
| 5 | Ancient Treant | Elf | Epic | Las, natura |
| 6 | Kraken | Neutralny | Legendary | Głębia, woda |
| 7 | Shadow Assassin | Neutralny | Legendary | Cień, mrok |
| 8 | Celestial Avatar | Celestial | Legendary | Światło, boskość |

---

## Prompty

### Wzorzec

3D render of a fantasy {boss_name}, {theme} theme, {rarity} boss, {description}, dramatic lighting, transparent background, game boss asset, isolated subject, epic scale --ar 1:1 --style raw --v 6

### Przykłady

**Fire Dragon (Legendary Boss):**

3D render of a fantasy fire dragon, fire theme, legendary boss, massive red-scaled dragon with magma cracks in wings, horns, breathing fire, glowing eyes, dramatic lighting, transparent background, game boss asset, isolated subject, epic scale --ar 1:1 --style raw --v 6

**Ice Lich (Epic Boss):**

3D render of a fantasy ice lich, ice theme, epic boss, skeletal figure in frozen royal robes, ice crown, staff of frost, blue glowing eyes, frozen aura, icicles swirling, transparent background, game boss asset, isolated subject, epic scale --ar 1:1 --style raw --v 6

---

## Struktura plików

public/assets/bosses/
├── fire_dragon_idle.webp
├── fire_dragon_attack.webp
├── fire_dragon_hit.webp
├── ice_lich_idle.webp
├── ...

**Nazewnictwo:** `{boss_name}_{state}.webp`

**Stany:** `idle`, `attack`, `hit`

---

## Uwagi

- **Rozmiar:** Dla największych bossów (smok, kraken) generuj w 1024×1024.
- **Warianty:** Tak samo jak jednostki – idle, attack, hit.
- **Narzędzie:** Leonardo.ai lub Midjourney (najlepsza jakość dla bossów).
- **Image Guidance:** Użyj jednego bossa jako referencji stylistycznej dla pozostałych.
