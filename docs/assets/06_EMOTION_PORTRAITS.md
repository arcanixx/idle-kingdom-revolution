# 06 – Emotion Portraits

> Portrety do scen fabularnych, tutoriali, dialogów.
> Rozmiar: 512×512 WebP (z alpha channel)
> Styl: 3D render fantasy character portrait, half-body (od pasa w górę, BEZ NÓG), zbliżenie na twarz i górną część ciała.
>
> **Rozróżnienie od `02_UNIT_PORTRAITS.md`:** Ten plik dotyczy WYŁĄCZNIE portretów dialogowych/fabularnych (sceny story, tutoriale, dialogi) i ZAWSZE jest half-body (bez nóg). Jednostki na mapie/w statystykach (`02_UNIT_PORTRAITS.md`) są ZAWSZE full-body (z nogami). Nie myl tych dwóch typów assetu przy generowaniu – to dwa osobne foldery (`public/assets/units/` vs `public/assets/portraits/`).

---

## Zasady stylu

- **Kadr:** Half-body (od pasa w górę), twarz zajmuje 40-50% kadru.
- **Tło:** Przezroczyste (alpha channel).
- **Oświetlenie:** Soft studio lighting, z naciskiem na wyraz twarzy.
- **Detale:** Widoczny detal zbroi/ubioru, motyw frakcji.
- **Spójność:** Użyj bazowego modelu jednostki jako referencji (Image Guidance).

---

## Lista emocji

| # | Emotion | Opis | Prompt modifier |
|---|---------|------|-----------------|
| 1 | Neutral | Spokojny, neutralny wyraz | calm neutral expression, standing straight |
| 2 | Happy | Uśmiechnięty, ciepły | warm smile, relaxed, slight head tilt |
| 3 | Angry | Zły, groźny | furious glare, intense, leaning forward |
| 4 | Sad | Smutny, przygnębiony | sad expression, looking down, solemn |
| 5 | Surprised | Zaskoczony | wide eyes, mouth slightly open, stepping back |
| 6 | Scared | Przestraszony | fearful expression, defensive pose |
| 7 | Serious | Poważny, zdeterminowany | serious focused expression, determined |
| 8 | Laughing | Śmiejący się | joyful laugh, head back, open mouth |
| 9 | Suspicious | Podejrzliwy | suspicious squint, tilted head, arms crossed |
| 10 | Shocked | W szoku | extreme shock, recoiling, hands to face |
| 11 | Confused | Zdezorientowany | confused, furrowed brow, questioning gesture |
| 12 | Tired | Zmęczony | exhausted, heavy eyelids, slumped posture |
| 13 | Scheming | Knujący, podstępny | sly smirk, half-closed eyes, subtle gesture |
| 14 | Heroic | Bohaterski, dumny | heroic pose, proud, chest out, weapon raised |
| 15 | Menacing | Groźny, złowrogi | menacing, looming posture, glowing eyes |

---

## Prompty

### Wzorzec

Fantasy 3D render portrait of a {emotion} {faction} {class}, {rarity} quality, {emotion_description}, half-body shot, {pose_hint}, soft studio lighting, warm key light, detailed fantasy armor with faction motif ({faction_motif}), transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

### Przykłady

**Human Warrior – Happy:**

Fantasy 3D render portrait of a happy human warrior, common quality, warm smile and relaxed expression, half-body shot, slight head tilt with open hand gesture, soft studio lighting, warm key light, detailed steel armor with golden trim and lion motif on chest, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**Elf Ranger – Suspicious:**

Fantasy 3D render portrait of a suspicious elf ranger, rare quality, narrowed eyes and skeptical expression, half-body shot, tilted head with arms crossed, soft studio lighting, warm key light, detailed green leather armor with leaf motif and silver trim, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**Demon Mage – Menacing:**

Fantasy 3D render portrait of a menacing demon mage, epic quality, threatening glare with glowing red eyes, half-body shot, looming posture with hands crackling with fire, soft studio lighting, warm key light, detailed dark robes with horn-shaped crystal ornaments, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

---

## Struktura plików

public/assets/portraits/
├── human/
│ ├── human_warrior_happy.webp
│ ├── human_warrior_angry.webp
│ ├── human_warrior_sad.webp
│ ├── ...
├── elf/
│ ├── elf_ranger_neutral.webp
│ ├── ...
├── ...

**Nazewnictwo:** `{faction}_{class}_{emotion}.webp`

---

## Uwagi

- **Image Guidance (Init Image) to klucz do spójności.** Użyj bazowego modelu jednostki jako referencji.
- **Generuj partiami:** Najpierw dla Human (najważniejsza frakcja), potem dla pozostałych.
- **Narzędzie:** ChatGPT/DALL-E (szybkie iteracje) lub Leonardo.ai (pełna spójność).
- **Zastosowanie w grze:** Tutoriale, sceny fabularne, eventy, dialogi, powiadomienia.
