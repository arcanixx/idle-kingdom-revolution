# PROMPT_CONSTRUCTOR_PROPS.md

> **UŻYCIE:** Generuj obiekty na mapie świata / planszy (budynki, drzewa, ruiny, kopalnie, ołtarze, skrzynie, itp.).
> Pamiętaj o globalnych Złotych Zasadach z `PROMPT_CONSTRUCTOR.md`.

---

## ZASADY GENEROWANIA PROPÓW

- **Kadr:** Pojedynczy obiekt, centralnie wyśrodkowany, izolowany.
- **Tło:** Zielone (do wycięcia) lub przezroczyste (w zależności od narzędzia).
- **Skala:** Obiekt powinien zajmować 80-90% kadru.
- **Styl:** Spójny ze stylistyką gry (stylized fantasy 3D render).

---

## SZABLON PROMPTU DLA PROPÓW
Generate a single asset for a mobile RPG. Image ratio: 1:1. Resolution: 1024x1024.
A fantasy {prop_type} (e.g., wooden tower, ruined castle, glowing crystal mine).
Full object, centered, isolated subject.
Background: flat solid chroma green (#00A651).
Style: Stylized fantasy 3D render, crisp textures, similar to "AFK Arena". Soft studio lighting, warm key light upper-left, cool fill light upper-right.
NEGATIVE: photorealistic, anime, manga, pixel art, cropped, cut off, text, watermark, logo, ground shadows, ugly, deformed, multiple objects.

### Przykłady:

**Kamienna Wieża (Common):**
Generate a single asset for a mobile RPG. Image ratio: 1:1. A fantasy stone watchtower, medieval style, flat solid chroma green background. Stylized fantasy 3D render, crisp textures, similar to "AFK Arena". Soft studio lighting.

**Miejsce wydobycia kryształów (Rare):**
Generate a single asset for a mobile RPG. Image ratio: 1:1. A fantasy glowing crystal mine, blue crystals protruding from rock, magical atmosphere, flat solid chroma green background. Stylized fantasy 3D render, crisp textures. Soft studio lighting.

---

## KATEGORIE PROPÓW (Lista do generowania)

| Kategoria | Przykłady |
|-----------|-----------|
| Budynki | Wieża strażnicza, Ruiny zamku, Chata drwala, Młyn |
| Natura | Duże drzewo, Głaz, Magiczny krzew, Kwiaty |
| Rzeczy użytkowe | Skrzynia ze skarbem, Ołtarz, Magiczny portal, Studnia |
| Kopalnie/Zasoby | Kopalnia żelaza, Złoże złota, Źródło many |
| Dekoracje | Posąg lwa, Flaga, Znicz, Krąg runiczny |

---

### Uwagi:
- Rozmiar docelowy: 512x512 lub 1024x1024 WebP.
- Nie generuj propów z postaciami w środku – mają być izolowane obiekty.
