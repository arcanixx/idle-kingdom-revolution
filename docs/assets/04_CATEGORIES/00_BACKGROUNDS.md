# 01 – Battle Backgrounds

> Tła walki – 7 krajobrazów, każdy przypisany do innej frakcji lub lokacji.
> Rozmiar: 1920×1080 WebP
> Styl: Fantasy landscape, epicki widok, bez postaci

---

## Zasady stylu

- **Kompozycja:** Szeroki, panoramiczny widok (16:9).
- **Oświetlenie:** Dramatyczne niebo, światło z jednej strony, ciepłe lub chłodne tony.
- **Elementy:** Krajobraz, roślinność, formacje skalne, budowle, efekty pogodowe.
- **Bez postaci:** Tło nie może zawierać żadnych postaci (tylko natura / architektura).
- **Bez UI:** Nie dodawaj żadnych elementów interfejsu.

---

## Lista backgroundów

| # | Nazwa | Frakcja / Lokacja | Klimat | Motyw |
|---|-------|-------------------|--------|-------|
| 1 | Plains | Human / Neutralne | Spokojny, epicki | Złote wzgórza, odległe góry |
| 2 | Forest | Elf | Magiczny, tajemniczy | Wysokie drzewa, promienie słońca |
| 3 | Mountains | Ogólne / Neutralne | Majestatyczny | Ośnieżone szczyty, doliny |
| 4 | Desert | Orc | Pustynny, surowy | Złote wydmy, oaza, skały |
| 5 | Ice Land | Undead | Mroźny, ponury | Lodowe kryształy, zorza polarna |
| 6 | Volcano | Demon | Ognisty, groźny | Lawa, obsydian, dym |
| 7 | Dungeon | Celestial / Neutralny | Mroczny, mistyczny | Kamienne łuki, pochodnie, kryształy |

---

## Prompty

### Wzorzec

Fantasy landscape {environment_type}, {time_of_day}, {mood}, atmospheric perspective, painterly style, rich colors, detailed environment, game background, 16:9 aspect ratio, no characters, no text --ar 16:9 --style raw --v 6

### Przykłady

**Plains (Równina):**

Fantasy landscape golden rolling plains, golden hour sunset, peaceful but epic mood, distant mountains, scattered wildflowers, soft clouds, warm lighting, game background, 16:9 aspect ratio, no characters, no text --ar 16:9 --style raw --v 6

**Forest (Las):**

Fantasy landscape enchanted forest, midday with sun rays through canopy, mystical mood, towering ancient trees with moss, glowing ferns, game background, 16:9 aspect ratio, no characters, no text --ar 16:9 --style raw --v 6

**Volcano (Wulkan):**

Fantasy landscape volcanic wasteland, night with lava glow, dangerous and intense mood, cracked ground with magma rivers, smoke and embers, game background, 16:9 aspect ratio, no characters, no text --ar 16:9 --style raw --v 6

---

## Efekty pogodowe (opcjonalne)

Dla urozmaicenia możesz generować warianty pogodowe:

| Efekt | Dodatek do promptu |
|-------|-------------------|
| Deszcz | heavy rain, storm clouds, wet ground |
| Śnieg | snowfall, frozen lake, white mist |
| Mgła | thick fog, mystical atmosphere |
| Burza | lightning strikes, dark storm clouds |
| Złota godzina | golden hour sunset, warm light |
| Noc | starry night, moonlight, dark sky |

---

## Struktura plików

public/assets/backgrounds/
├── plains.webp
├── forest.webp
├── mountains.webp
├── desert.webp
├── ice_land.webp
├── volcano.webp
└── dungeon.webp

**Nazewnictwo:** `{location}.webp` (tylko małe litery, bez spacji)

---

## Uwagi

- **Narzędzie:** Bing Image Creator lub Leonardo.ai (preferowane dla spójności stylu).
- **Rozmiar:** Generuj w 1024×1024 lub większym, potem przeskaluj do 1920×1080.
- **Jakość WebP:** 75-80% (ważniejszy jest ładunek niż detal).
- **Bez przezroczystości:** Backgroundi nie mają alpha channel.
