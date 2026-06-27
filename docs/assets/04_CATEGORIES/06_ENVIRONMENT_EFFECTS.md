# 07 – Environment Effects

> Pogoda, efekty specjalne, eventy na mapie, elementy planszy.
> Rozmiar: różny (zwykle 256×256 do 512×512)
> Styl: Fantasy 3D-rendered 2D, przezroczyste tło (gdzie potrzebne).

---

## Efekty pogodowe

| Efekt | Opis | Zastosowanie |
|-------|------|--------------|
| Deszcz | Pionowe smugi, krople | Battle backgrounds, map |
| Śnieg | Płatki śniegu, mroźna mgła | Ice Land, eventy zimowe |
| Mgła | Gęsta, tajemnicza | Dungeon, forest, eventy |
| Burza | Błyskawice, ciemne chmury | Volcano, epic battles |
| Liście | Wirujące liście | Forest, elf eventy |
| Iskry | Ulotne iskry | Magiczne efekty, kowal |
| Dym | Unoszący się dym | Volcano, ogniska |

---

## Efekty specjalne (eventy, animacje)

| Efekt | Opis | Zastosowanie |
|-------|------|--------------|
| Portal | Wirująca brama, magiczny krąg | Teleporty, eventy |
| Błysk | Rozbłysk światła | Ataki, krytyczne ciosy |
| Leczenie | Zielone świecące cząsteczki | Uzdrowienie, buff |
| Ogień | Płomienie, iskry | Ataki ogniste, smoki |
| Lód | Kryształki lodu, mróz | Ataki lodowe, Ice Lich |
| Cień | Wirujące ciemne smugi | Ataki ciemności, demony |
| Światło | Promienie światła, gwiazdki | Ataki święte, celestial |

---

## Prompty (przykłady)

### Deszcz (oddzielny overlay)

3D render of falling rain, vertical streaks, semi-transparent, soft blue-grey, game effect overlay, transparent background, isolated --ar 1:1 --style raw --v 6

### Magiczny portal

3D render of a magical portal, swirling purple energy, glowing ring, cosmic effect, transparent background, game effect, isolated --ar 1:1 --style raw --v 6

### Płomienie

3D render of fantasy flames, orange and red, dynamic shape, semi-transparent, game effect, transparent background, isolated --ar 1:1 --style raw --v 6

---

## Struktura plików

public/assets/effects/
├── weather/
│ ├── rain_overlay.webp
│ ├── snow_overlay.webp
│ ├── fog_overlay.webp
│ └── ...
├── magic/
│ ├── portal_blue.webp
│ ├── portal_purple.webp
│ ├── fire_effect.webp
│ ├── ice_effect.webp
│ └── ...
└── events/
├── festival_sparks.webp
├── harvest_glow.webp
└── ...

**Nazewnictwo:** `{category}_{effect}_{variant}.webp`

---

## Uwagi

- **Oddzielne overlay'e:** Efekty pogodowe i magiczne generuj jako osobne warstwy (nie na stałe na tle).
- **Przezroczystość:** Większość efektów powinna mieć alpha channel.
- **Rozmiar:** 256×256 do 512×512 – skalowalne.
- **Narzędzie:** Leonardo.ai (lepsza kontrola nad przezroczystością) lub Bing (dla prostych efektów).
