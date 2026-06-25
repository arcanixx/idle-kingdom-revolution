# Asset Generation – Spis Treści

> Dokumentacja do generowania assetów dla **Idle Kingdom Revolution**.
> Styl: Fantasy 3D-rendered 2D, spójny, lekki (WebP), zoptymalizowany pod gry mobilne.

---

## Struktura dokumentacji

| Plik | Zawartość | Rozmiar |
|------|-----------|---------|
| [00_ART_DIRECTION.md](./00_ART_DIRECTION.md) | Art direction, proportion system, faction/class design guide, style anchor rules | ~6 KB |
| [ASSET_STYLE_BIBLE.md](./ASSET_STYLE_BIBLE.md) | Style implementation: camera, lighting, materials, shapes, kolory, oświetlenie, motywy frakcji | ~5 KB |
| [ASSET_CHECKLIST.md](./ASSET_CHECKLIST.md) | Checklista postępu – co już wygenerowane, co zostało | ~6 KB |
| [PROMPT_CONSTRUCTOR.md](./PROMPT_CONSTRUCTOR.md) | Szablony promptów dla różnych kategorii | ~3 KB |
| [01_BATTLE_BACKGROUNDS.md](./01_BATTLE_BACKGROUNDS.md) | Tła walki – 7 krajobrazów, pogoda, efekty | ~4 KB |
| [02_UNIT_PORTRAITS.md](./02_UNIT_PORTRAITS.md) | Jednostki – hierarchia BASE→RARITY, klasy, frakcje | ~6 KB |
| [03_ITEM_ICONS.md](./03_ITEM_ICONS.md) | Przedmioty – bronie, eliksiry, tarcze, waluta | ~4 KB |
| [04_BOSS_CREATURES.md](./04_BOSS_CREATURES.md) | Bossowie – smoki, licze, demony, warianty | ~3 KB |
| [05_UI_ELEMENTS.md](./05_UI_ELEMENTS.md) | UI – ramki, przyciski, paski, ikony | ~3 KB |
| [06_EMOTION_PORTRAITS.md](./06_EMOTION_PORTRAITS.md) | Portrety emocji – do fabuły, tutoriali, dialogów | ~5 KB |
| [07_ENVIRONMENT_EFFECTS.md](./07_ENVIRONMENT_EFFECTS.md) | Pogoda, efekty specjalne, eventy na mapie | ~4 KB |
| [08_WORKFLOW_AND_TOOLS.md](./08_WORKFLOW_AND_TOOLS.md) | Workflow, narzędzia, pipeline, współpraca | ~5 KB |
| [09_ASSET_LIST_REFERENCE.md](./09_ASSET_LIST_REFERENCE.md) | Pełna lista wszystkich assetów (kategorie, ilości) | ~3 KB |
| [PROJECT_AI_TOOLKIT.md](./10_PROJECT_AI_TOOLKIT.md) | Narzędzia do projektowania świata i fabuły (master prompt, gotowe przepisy) | ~5 KB |
| [11_COMBAT_VISUAL_STATES.md](./11_COMBAT_VISUAL_STATES.md) | Combat VFX, overlay system, hit feedback, death/necromancy states | ~4 KB |

---

## Szybki start

1. Przeczytaj [ASSET_STYLE_BIBLE.md](./ASSET_STYLE_BIBLE.md) – poznaj zasady stylu.
2. Zdecyduj, co generujesz – wybierz odpowiedni plik z listy powyżej.
3. Użyj promptów z wybranego pliku + [PROMPT_CONSTRUCTOR.md](./PROMPT_CONSTRUCTOR.md).
4. Wygeneruj PNG, zapisz w `raw_assets/`, przekaż do obróbki.
5. Otrzymasz gotowe WebP w `public/assets/` + `assets.json`.

---

## Narzędzia (skrót)

| Narzędzie | Do czego | Limit |
|-----------|----------|-------|
| Leonardo.ai | Jednostki, bossowie, przedmioty | 150 tokenów/dzień |
| Bing Image Creator | Backgroundi, krajobrazy | Darmowe (wolniejsze) |
| ChatGPT (DALL-E) | Emotion portraits, prototypy | Limit wg planu |
| Midjourney | Premium asset, okładki | Płatne |

Szczegóły: [08_WORKFLOW_AND_TOOLS.md](./08_WORKFLOW_AND_TOOLS.md)

---

## Co generujemy – w skrócie

| Kategoria | Ilość | Rozmiar |
|-----------|-------|---------|
| Battle Backgrounds | 7 | 1920×1080 |
| Unit Portraits (BASE → 6 rarity) | 42 | 512×512 |
| Item Icons | ~15 | 256×256 |
| Boss Creatures | 6 | 512×512 / 1024×1024 |
| UI Elements | ~8 | zmienne |
| Avatars (crop z portretów) | 42 | 128×128 |
| Emotion Portraits | ~10-15 | 512×512 |

---

Wersja: 3.1
Data: 2026-06-25
Autor: Asystent AI (współpraca z Tobą)
