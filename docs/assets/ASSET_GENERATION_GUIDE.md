# Asset Generation Guide — Idle Kingdom Revolution

> Spojny przewodnik generowania assetow do gry.
> Styl: Fantasy 3D-rendered 2D (wyglada jak 3D, dziala jako 2D sprite).
> Priorytet: Atrakcyjny wizualnie, LEKKI (WebP), szybki (lazy loading, CSS animacje).

---
## PART 1: FUNDAMENTALS

### 1.1 Style Bible (jeden dokument — jeden styl)

**Masz juz dobry fundament w docs/plan/20_AI_PROMPTS.json. Ten guide rozszerza go o konkretna strukture i workflow.**

**STYL:** Fantasy 3D-rendered 2D
**OSWIETLENIE:** Soft studio lighting, delikatny rim light, cienie w prawo-dol
**PALETA:** Patrz tabela frakcji nizej
**KOMPOZYCJA:** Postac centralnie (~50% kadru), dynamiczna poza
**TLO:** Przezroczyste (transparent background) — chyba ze battle background
**DETAIL:** High detail, 4K
**STAALE PARAMETRY PROMPTOW:** --ar 1:1, --style raw, --v 6 (lub DALL-E 3)

**FRAKCJE — kolory i motywy:**
| Frakcja | Kolory | Stroj | Bron |
|---------|--------|-------|------|
| Human | Zloto, blekit, stal | Plyty, kolczugi, herby | Miecz, tarcza, topor |
| Elf | Zielen, srebro, biel | Skora, liscie, mitril | Luk, kris, krystaliczna bron |
| Orc | Brazy, zielen, rdza | Skory, kolce, kosci | Topor, buzdygan, dzida |
| Undead | Szarosci, trupi zielony | Lachmany, rdzewiejaca stal | Kosy, rozkladajace sie ostrza |
| Demon | Czerwien, czern, purpura | Kolce, kryszaly, magma | Plomienne ostrza, widdly |
| Celestial | Zloto, biel, lazur | Swietliste, eteryczne | Oreze swiatla, gwiazd |

**RARITY — efekt wizualny (CSS, nie w assetach):**
| Rarity | Kolor obwodki | Poświata |
|--------|-------------|---------|
| Common | Stalowy | Brak |
| Uncommon | Zielona | Delikatna |
| Rare | Niebieska | Srednia |
| Epic | Fioletowa | Mocna + iskry |
| Legendary | Pomaranczowo-zlota | Mocna + czasteczki |
| Mythic | Czerwono-zlota | Animowana + blyski |

### 1.2 Podzial pracy: Ty vs Ja

| Krok | Wykonawca | Narzedzie | Szczegoly |
|------|-----------|-----------|-----------|
| Generowanie obrazkow | **TY** | Leonardo.ai / Bing | Przez przegladarke, wg promptow z czesci 3 |
| Usuniecie tla | **JA** | rembg (lokalny Python) | Daj mi folder PNG, ja puszczam batch. Zero limitow, 100% gratis |
| Upscale (opcjonalnie) | **TY** (lub **JA**) | Upscayl GUI / Python Real-ESRGAN | Jesli potrzeba 1024x1024 zamiast 512x512 |
| Konwersja do WebP | **JA** | Squoosh CLI | Batch: caly folder PNG -> WebP z alpha |
| Zmiana nazw + sortowanie | **JA** | Python | unit_human_warrior_common_512.webp itd. |
| Struktura folderow | **JA** | mkdir + mv | public/assets/units/{faction}/ |
| Asset manifest | **JA** | Python -> JSON | Mapa: asset_id -> sciezka pliku, metadata |
| Sprawdzenie spojnosci | **JA** | Wizualna + nazwy | Czy style zgodne, czy brak watermarkow |

**Jak to bedzie wygladac w praktyce:**
1. Otwierasz Leonardo.ai / Bing i generujesz obrazki (wg promptow)
2. Zapisujesz wszystkie PNG do folderu, np. C:\game\raw_assets\
3. Mowisz mi "mam 30 nowych jednostek w raw_assets"
4. Ja: rembg -> rename -> WebP -> public/assets/units/{faction}/
5. Gotowe do uzycia w grze

### 1.3 Co dokladnie generujemy (pelna lista assetow)

**Laczna liczba assetow:** ok. 90-100 w pelnej wersji.

| Kategoria | Sztuk | Opis |
|-----------|-------|------|
| Battle Backgrounds | 7 | 1920x1080, jedno pole bitwy na frakcje |
| Unit Portraits | 42 | 1 jednostka = 3 warianty (idle/attack/hit) x 1 rozmiar (512x512) |
| Item Icons | ~15 | 256x256, najwazniejsze przedmioty |
| Boss Creatures | 6 | 512x512, bossowie etapow |
| UI Elements | ~8 | Ramki paneli, overlay, przycisk |
| Avatars | 42 | 128x128, crop z portraitow |

**Kolejnosc generowania (fazy):**

**FAZA 1 — MVP (do uruchomienia pierwszej walki):**
- 7x Battle Backgrounds
- 7x Unit Portraits (po jednym na frakcje, tylko Common, tylko idle)
- 3x Item Icons (Health Potion, Gold Coin, Gem)
- 1x Boss (Fire Dragon)

**FAZA 2 — Podstawowy zestaw:**
- 28x Unit Portraits (4 klasy x 1 frakcja = Human Warrior/Mage/Tank/Healer, kazdy Common/Uncommon/Rare)
- Reszta Item Icons
- 3x Boss (Ice Lich, Giant Elemental, Abyss Demon)
- UI ramki na 3 rarity

**FAZA 3 — Pelnia:**
- Wszystkie jednostki (42 portraits x 3 animacje = 126 plikow)
- Wszyscy bossowie (6)
- Wszystkie UI (8)
- Avatary (42, crop z portraitow)

### 1.4 Struktura folderow + konwencja nazewnictwa

**Struktura na dysku (public/assets/):**
```
public/assets/
  backgrounds/
    plains.webp
    forest.webp
    mountains.webp
    desert.webp
    ice_land.webp
    volcano.webp
    dungeon.webp
  units/
    human/
      warrior_common_idle.webp
      warrior_common_attack.webp
      warrior_common_hit.webp
      warrior_uncommon_idle.webp
      ...
    elf/
    orc/
    undead/
    demon/
    celestial/
  items/
    health_potion.webp
    mana_potion.webp
    iron_sword.webp
    gold_coin.webp
    ...
  bosses/
    fire_dragon.webp
    ice_lich.webp
    ...
  ui/
    panel_frame_common.webp
    panel_frame_rare.webp
    panel_frame_epic.webp
    button_gold.webp
    ...
  avatars/
    human/
      warrior_common.webp
      ...
```

**Wzor nazwy pliku:**
```
{kategoria}_{opcjonalnie podkategoria}_{opcjonalnie wariant}.webp
```

**Przyklady:**
- `plains.webp` — tlo, najprostsza nazwa
- `human_warrior_common_idle.webp` — jednostka: frakcja_klasa_rarity_stan
- `health_potion.webp` — item
- `fire_dragon.webp` — boss
- `panel_frame_rare.webp` — UI
- `human_warrior_common.webp` — avatar (bez stanu, tylko jedna klatka)

**Zasady:**
- TYLKO angielskie nazwy (kompatybilnosc z next/image)
- TYLKO male litery (case-sensitive hosting)
- Spacje zamienione na underscore
- Bez numerow wersji (nadpisujesz ten sam plik)

## PART 2: WORKFLOW

### 2.1 Wiele kont Leonardo — jak zachowac spojnosc

**Problem:** Masz 2+ konta Leonardo.ai (150 tokenow/dzien kazde). Rozne konta moga generowac rozne style.

**Rozwiazanie — Image Guidance (Init Image) z tego samego pliku referencyjnego:**

1. Wygeneruj **jedna jednostke referencyjna** (np. Human Warrior Common) na koncie A
2. Pobierz ja, wytnij tlo (rembg), zapisz jako `_ref_unit.webp`
3. **Na KAZDYM koncie** uzyj tej referencji jako Init Image z Leonardo:
   - Leonardo: Image to Image -> wrzuc `_ref_unit.webp`
   - Image Guidance Strength: 35-45%
   - Prompt: zmieniasz tylko frakcje/klase, reszta bez zmian
4. Efekt: bez wzgledu na konto, wynik bedzie stylistycznie ten sam

**Zasady dla spojnosci:**
- Ta SAMA referencja przez caly projekt (poki nie zmieniasz stylu)
- Te SAME stale parametry promptow (--style raw, --ar 1:1, global illumination)
- **Zawsze generuj z transparent background** — wtedy nie musisz uzywac rembg / remove.bg
- Jesli jeden batch wychodzi ciemniejszy/jasniejszy -> ja moge ujednolicic w post-processingu

**Przeplyw dla kont:**
| Konto | Tokeny | Generuje |
|-------|--------|----------|
| Konto A | 150/dzien | Głowna linia: jednostki + bossowie |
| Konto B | 150/dzien | Backgroundi + itemy + UI |

**Uwaga:** Bing Image Creator (DALL-E 3) ma inny styl — NIE mieszaj z Leonardo. Jesli zaczniesz od Leonardo, trzymaj sie Leonardo. Bing uzywaj tylko do backgroundow (krajobraz, nie postaci).

### 2.2 Narzedzia + instalacja

**Co MUSISZ miec (Ty, przez przegladarke):**
| Narzedzie | Link | Rejestracja | Limit |
|-----------|------|-------------|-------|
| Leonardo.ai | leonardo.ai | Email + potwierdzenie | 150 tokenow/dzien, kazde konto |
| Bing Image Creator | bing.com/create | Konto Microsoft | Darmowe generacje (powolne) |

**Co MUSISZ miec (lokalnie, instalacja):**
| Narzedzie | Instalacja | Po co |
|-----------|-----------|-------|
| Python 3.10+ | python.org | rembg (usuwanie tla) + skrypty pomocnicze |
| Node.js 18+ | nodejs.org | Squoosh CLI (konwersja do WebP) |
| Upscayl | upscayl.org | Upscale (opcjonalnie) |

**Co instalujesz po python/node (JA to robie):**
```bash
# rembg - lokalne usuwanie tla AI (bez limitow, bez wysylania plikow)
pip install rembg

# Squoosh - batch konwersja do WebP z alpha
npm install -g @squoosh/cli
```

**Co JA mam juz dostepne i uzyje automatycznie:**
- Python (juz jest)
- Git
- Dostep do twojego .env (jesli dasz klucze)
- Node.js i npm (jesli potrzebne)

### 2.3 Asset pipeline — krok po kroku (jak bedziemy wspolpracowac)

**To jest najwazniejsza sekcja. Tak wyglada kazda iteracja:**

---
**KROK 1: TY generujesz obrazki**
- Otwierasz Leonardo.ai
- Wklejasz prompt z czesci 3
- Image Guidance = _ref_unit.webp (dla jednostek) lub brak (dla backgroundow)
- Generujesz, pobierasz jako PNG
- Zapisujesz do C:\game\raw_assets\

**KROK 2: Mowisz mi "mam obrazki"**
- Mowisz: "wygenerowalem 7 jednostek human i 3 itemy, sa w raw_assets"
- Opcjonalnie dodajesz klucze do .env (jesli potrzeba)

**KROK 3: JA obrabiam batch**
```
1. rembg i input.png output.png   # usuniecie tla (jesli nie ma alpha)
2. upscale jesli potrzeba
3. squoosh --webp quality=80  # konwersja do WebP
4. rename do poprawnej konwencji
5. mv do public/assets/{kategoria}/
6. generuje JSON manifest
```

**KROK 4: TY sprawdzasz efekt**
- Otwierasz plik .webp
- Sprawdzasz czy spojne stylistycznie
- Mowisz "ok" albo "popraw X"

**KROK 5: JA aktualizuje manifest**
- assets.json z sciezkami, typami, wymiarami
- Gotowe do importu w kodzie React

---

**Czyli w skrocie:** TY generujesz, JA obrabiam. Ty nie dotykasz batch skryptow, ja nie generuje grafik.

## PART 3: PROMPTY

### 3.1 Battle Backgrounds (7 szt.)

**Rozmiar:** 1920x1080 WebP
**Styl:** Fantasy landscape, epicki widok, bez postaci, przezroczyste elementy (mgla, swiatlo)
**Parametry:** --ar 16:9, --style raw, --v 6 (Leonardo) lub DALL-E 3

**Plains (Rownina):** Epic fantasy plains, golden grass, distant mountains, dramatic sky, soft clouds, warm lighting, game background, no characters, wide angle --ar 16:9 --style raw --v 6

**Forest (Las):** Enchanted fantasy forest, towering ancient trees, moss-covered trunks, sun rays through canopy, ferns, magical atmosphere, game background --ar 16:9 --style raw --v 6

**Mountains (Gory):** Majestic fantasy mountains, snow-capped peaks, rocky cliffs, pine forests in valley, dramatic sky, game background --ar 16:9 --style raw --v 6

**Desert (Pustynia):** Epic fantasy desert, golden dunes, rocky formations, oasis with palm trees, dramatic sunset, heat haze, game background --ar 16:9 --style raw --v 6

**Ice Land (Ziemia Lodowa):** Frozen fantasy landscape, ice crystals, snow-covered pine trees, frozen lake, aurora borealis, cold blue lighting, game background --ar 16:9 --style raw --v 6

**Volcano (Wulkan):** Volcanic fantasy landscape, lava flows, obsidian rocks, smoke plume, fiery sky, cracked earth, game background --ar 16:9 --style raw --v 6

**Dungeon (Loch):** Dark fantasy dungeon entrance, stone archway, torches on walls, mist, glowing crystals, game background --ar 16:9 --style raw --v 6

**Uwaga:** Jesli generujesz w Bing (DALL-E 3), pomijaj --ar 16:9 i --style raw, DALL-E 3 sam dobiera proporcje.

### 3.2 Unit Portraits (42 podstawowych jednostek)

**Rozmiar:** 512x512 WebP
**Styl:** 3D render fantasy character, half-body portrait (od pasa w gore), skupienie na twarzy i górnej czesci zbroi
**Parametry:** --ar 1:1, --style raw, --v 6
**Consistency Hack:** Uzyj Image Guidance (Init Image) z referencyjnej jednostki (np. Human Warrior Common) na 35-40% sile

**TEMPLATE PROMPT:**
3D render of a fantasy {FAKCJA} {KLASA}, {RARITY} quality, {DETALY}, soft studio lighting, transparent background, game character portrait, half-body, face focus, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

**PRZYKLADY DLA CZLOWIEKA (Human):**

Human Warrior Common:
3D render of a fantasy human warrior, common quality, simple steel sword and shield, leather armor, determined expression, short brown hair, soft studio lighting, transparent background, game character portrait, half-body, face focus, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

Human Warrior Uncommon:
3D render of a fantasy human warrior, uncommon quality, iron armor with gold trim, steel longsword, confident expression, beard, soft studio lighting, transparent background, game character portrait --ar 1:1 --style raw --v 6

Human Warrior Rare:
3D render of a fantasy human warrior, rare quality, enchanted silver armor with blue gems, glowing runes, heroic expression, long flowing cape, soft studio lighting, transparent background, game character portrait --ar 1:1 --style raw --v 6

Human Warrior Epic:
3D render of a fantasy human warrior, epic quality, golden armor with intricate engravings, ruby in chestplate, aura of power, majestic expression, soft studio lighting, transparent background, game character portrait --ar 1:1 --style raw --v 6

Human Warrior Legendary:
3D render of a fantasy human warrior, legendary quality, celestial armor of light and gold, winged helmet, divine aura, expression of wisdom, soft studio lighting, transparent background, game character portrait --ar 1:1 --style raw --v 6

Human Warrior Mythic:
3D render of a fantasy human warrior, mythic quality, armor of living starlight, constantly shifting constellations, eyes like galaxies, reality-warping presence, soft studio lighting, transparent background, game character portrait --ar 1:1 --style raw --v 6

**INNE KLASY (szablon - zamien tylko klase i ewentualnie bron):**
- Ranger: luk, skora, zwierzyna, skupienie na oczach
- Mage: laska, krystal, runy, aura magiczna
- Tank: duza tarcza, ciężka zbroja, groźny wyraz twarzy
- Healer: symbol swiatla, kielich, delikatny wyraz, zlotoczerwone akcenty
- Assassin: podwójne sztylety, kapuczyn, ukryty wzrok, cienie
- Support: flaga lub instrument, zbroja wspierajaca, pozytywna energia

**FRAKCJE - zamien tylko slowo "human" na:**
- elf
- orc
- undead
- demon
- celestial

**WARIANTY ANIMACJI (generujesz raz, ja potem bede robil wersje attack/hit):**
- idle.webp - pozycja neutralna (stoi, patrzy prosto)
- attack.webp - pozycja ataku (zamach broni, lekki pochyl do przodu)
- hit.webp - otrzymanie ciosu (pochyl do tylu, reakcja na impact)

**Jak to zrobic:**
1. Generujesz tylko idle.webp (podstawowa pozycja)
2. Dla attack.webp: dodaj do promptu "mid-swing, weapon raised, dynamic pose"
3. Dla hit.webp: dodaj do promptu "reeling from impact, staggered, defensive pose"
4. Lub: ja po otrzymaniu idle.webp moge stworzyc proste wersje attack/hit przez lekkie przekształcenia (obrot, przesuniecie) - mniej idealne ale szybsze na start

### 3.3 Item Icons

**Rozmiar:** 256x256 WebP
**Styl:** 3D render fantasy item, isolated on transparent background, centered, game item icon
**Parametry:** --ar 1:1, --style raw, --v 6

**BRONIE:**
3D render of a fantasy {ITEM}, {MATERIAL} material, {RARITY} quality, {DETALY}, soft studio lighting, transparent background, game item icon, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

Przyklady:
- Iron Sword (Common): 3D render of a fantasy sword, iron material, common quality, simple steel blade, leather-wrapped hilt, soft studio lighting, transparent background, game item icon
- Mythril Blade (Rare): 3D render of a fantasy sword, mythril material, rare quality, gleaming silvery-blue blade with elven runes, ornate gold hilt, soft studio lighting, transparent background, game item icon
- Flaming Sword (Epic): 3D render of a fantasy sword, enchanted steel, epic quality, blade wreathed in flames, ruby in pommel, gold filigree, soft studio lighting, transparent background, game item icon
- Holy Avenger (Legendary): 3D render of a fantasy sword, celestial material, legendary quality, blade of pure light, winged crossguard, diamond centerpiece, radiant glow, soft studio lighting, transparent background, game item icon
- Dragonsbane (Mythic): 3D render of a fantasy sword, dragonbone material, mythic quality, scale-textured blade, emerald eyes in hilt, smoke effects, soft studio lighting, transparent background, game item icon

**ZBROJA (tarcze):**
3D render of a fantasy shield, {MATERIAL} material, {RARITY} quality, {KSZTALT} shape, {DETALY}, soft studio lighting, transparent background, game item icon

Przyklady:
- Wooden Shield (Common): 3D render of a fantasy shield, wood material, common quality, round shape, iron rim, soft studio lighting, transparent background, game item icon
- Steel Shield (Uncommon): 3D render of a fantasy shield, steel material, uncommon quality, kite shape, embossed lion crest, soft studio lighting, transparent background, game item icon
- Dragon Shield (Epic): 3D render of a fantasy shield, dragon scale material, epic quality, scale texture, ruby center, soft lighting, transparent background, game item icon

**ELIKSYRY I ZELIA:**
3D render of a fantasy {TYPE}, {MATERIAL} material, {RARITY} quality, {KOLOR} glowing liquid, {KSZTALT} container, soft studio lighting, transparent background, game item icon

Przyklady:
- Health Potion (Common): 3D render of a fantasy potion, glass material, common quality, red glowing liquid, round flask, cork stopper, soft studio lighting, transparent background, game item icon
- Mana Potion (Uncommon): 3D render of a fantasy potion, glass material, uncommon quality, blue glowing liquid, tall slim bottle, glass stopper, soft studio lighting, transparent background, game item icon
- Elixir of Strength (Rare): 3D render of a fantasy potion, crystal material, rare quality, pulsing golden liquid, faceted vial, soft studio lighting, transparent background, game item icon

**WALUTA I SUROWCE:**
- Gold Coin: 3D render of a fantasy gold coin, gold material, shiny with crown emblem, stacked, game item icon
- Valor Token: 3D render of a fantasy valor token, silver material, blue-silver coin with star emblem, soft blue glow, game item icon
- Mana Crystal: 3D render of a fantasy mana crystal, purple crystal material, faceted gem, sparkling with inner light, game item icon
- Iron Ore: 3D render of a fantasy iron ore, rough iron chunks, rocky texture, game item icon
- Enchanted Wood: 3D render of a fantasy enchanted wood, glowing green wood planks, magical runes, game item icon

**AKCESORIA:**
- Ring of Power: 3D render of a fantasy ring, gold material, rare quality, thick band with faceted ruby, engraved patterns, soft red glow, game item icon
- Amulet of Protection: 3D render of a fantasy amulet, silver material, emerald centerpiece, intricate filigree, soft green glow, game item icon
- Leather Backpack: 3D render of a fantasy leather backpack, brown leather, metal buckles, rolled bedroll top, game item icon

### 3.4 Boss Creatures

**Rozmiar:** 512x512 WebP (lub 1024x1024 dla epickich bossow)
**Styl:** 3D render fantasy boss creature, full body or dramatic pose, epic scale, transparent background
**Parametry:** --ar 1:1 (lub 2:3 dla wysokich istot), --style raw, --v 6

**TEMPLATE:**
3D render of a fantasy {BOSS_NAME}, {THEME} theme, {RARITY} boss, {OPIS}, dramatic lighting, transparent background, game boss asset, isolated subject, epic scale --ar 1:1 --style raw --v 6

**BOSSY:**

Fire Dragon (Legendary Boss):
3D render of a fantasy fire dragon, fire theme, legendary boss, massive red-scaled dragon with magma cracks in wings, horns, breathing fire, glowing eyes, dramatic lighting, transparent background, game boss asset, isolated subject, epic scale --ar 1:1 --style raw --v 6

Ice Lich (Epic Boss):\pic Boss):
3D render of a fantasy ice lich, ice theme, epic boss, skeletal figure in frozen royal robes, ice crown, staff of frost, blue glowing eyes, frozen aura, icicles swirling, transparent background, game boss asset

Earth Elemental (Rare Boss):
3D render of a fantasy earth elemental, stone theme, rare boss, humanoid figure of living rock and moss, glowing green crystal core, arms raised, crystals growing from shoulders, transparent background, game boss asset

Abyss Demon (Mythic Boss):
3D render of a fantasy abyss demon, abyss theme, mythic boss, towering demon with six shadow wings, four arms each holding different weapon, crown of dark flames, horns, glowing red eyes, aura of darkness, transparent background, game boss asset

Ancient Treant (Epic Boss):
3D render of a fantasy ancient treant, forest theme, epic boss, massive walking tree with face carved in trunk, amber eyes, branches as arms, roots for feet, vines and flowers, soft green glow, transparent background, game boss asset

Kraken (Legendary Boss):
3D render of a fantasy kraken, deep sea theme, legendary boss, colossal squid emerging from dark ocean water, massive tentacles with suckers, bioluminescent spots, huge beak, glowing eyes, water droplets, transparent background, game boss asset

Shadow Assassin (Legendary Boss):
3D render of a fantasy shadow assassin, shadow theme, legendary boss, humanoid figure made of living darkness, glowing purple eyes, dual shadow blades, smoke-like tendrils, teleportation effect, transparent background, game boss asset

Celestial Avatar (Legendary Boss):
3D render of a fantasy celestial avatar, celestial theme, legendary boss, androgynous figure of pure light and gold, wings of starlight, flowing robes of nebula, eyes like galaxies, radiating aura, transparent background, game boss asset

**Uwaga o skali:** Bossy moga byc wieksze niz 512x512 - rozważ 1024x1024 dla najwiekszych (smok, kraken). Ja potem odpowiednio skaluje i optymalizuje.

**Warianty animacji (tak jak jednostki):**
- idle.boss.webp - postura gotowa do walki
- attack.boss.webp - atak (oddech ognia, machanie pazurem, rzucanie czaru)
- hit.boss.webp - otrzymanie obrazen (odskok, blok, reakcja)

### 3.4 Boss Creatures

**Rozmiar:** 512x512 WebP (lub 1024x1024 dla epickich bossow)
**Styl:** 3D render fantasy boss creature, full body or dramatic pose, epic scale, transparent background
**Parametry:** --ar 1:1 (lub 2:3 dla wysokich istot), --style raw, --v 6

**TEMPLATE:**
3D render of a fantasy {BOSS_NAME}, {THEME} theme, {RARITY} boss, {OPIS}, dramatic lighting, transparent background, game boss asset, isolated subject, epic scale --ar 1:1 --style raw --v 6

**BOSSY:**

Fire Dragon (Legendary Boss):
3D render of a fantasy fire dragon, fire theme, legendary boss, massive red-scaled dragon with magma cracks in wings, horns, breathing fire, glowing eyes, dramatic lighting, transparent background, game boss asset, isolated subject, epic scale --ar 1:1 --style raw --v 6

Ice Lich (Epic Boss):
3D render of a fantasy ice lich, ice theme, epic boss, skeletal figure in frozen royal robes, ice crown, staff of frost, blue glowing eyes, frozen aura, icicles swirling, transparent background, game boss asset

Earth Elemental (Rare Boss):
3D render of a fantasy earth elemental, stone theme, rare boss, humanoid figure of living rock and moss, glowing green crystal core, arms raised, crystals growing from shoulders, transparent background, game boss asset

Abyss Demon (Mythic Boss):
3D render of a fantasy abyss demon, abyss theme, mythic boss, towering demon with six shadow wings, four arms each holding different weapon, crown of dark flames, horns, glowing red eyes, aura of darkness, transparent background, game boss asset

Ancient Treant (Epic Boss):
3D render of a fantasy ancient treant, forest theme, epic boss, massive walking tree with face carved in trunk, amber eyes, branches as arms, roots for feet, vines and flowers, soft green glow, transparent background, game boss asset

Kraken (Legendary Boss):
3D render of a fantasy kraken, deep sea theme, legendary boss, colossal squid emerging from dark ocean water, massive tentacles with suckers, bioluminescent spots, huge beak, glowing eyes, water droplets, transparent background, game boss asset

Shadow Assassin (Legendary Boss):
3D render of a fantasy shadow assassin, shadow theme, legendary boss, humanoid figure made of living darkness, glowing purple eyes, dual shadow blades, smoke-like tendrils, teleportation effect, transparent background, game boss asset

Celestial Avatar (Legendary Boss):
3D render of a fantasy celestial avatar, celestial theme, legendary boss, androgynous figure of pure light and gold, wings of starlight, flowing robes of nebula, eyes like galaxies, radiating aura, transparent background, game boss asset

**Uwaga o skali:** Bossy moga byc wieksze niz 512x512 - rozważ 1024x1024 dla najwiekszych (smok, kraken). Ja potem odpowiednio skaluje i optymalizuje.

**Warianty animacji (tak jak jednostki):**
- idle.boss.webp - postura gotowa do walki
- attack.boss.webp - atak (oddech ognia, machanie pazurem, rzucanie czaru)
- hit.boss.webp - otrzymanie obrazen (odskok, blok, reakcja)

### 3.3 Item Icons

**Rozmiar:** 256x256 WebP
**Styl:** 3D render fantasy item, isolated on transparent background, product shot style, soft lighting
**Parametry:** --ar 1:1, --style raw, --v 6

**TEMPLATE:**
3D render of a fantasy {ITEM_NAME}, {MATERIAL} material, {RARITY} quality, {OPIS}, soft studio lighting, transparent background, game item icon, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

**BRONIE:**
Iron Sword (Common):
3D render of a fantasy sword, iron material, common quality, simple steel blade, leather-wrapped hilt, crossguard with scratches, worn but functional, soft studio lighting, transparent background, game item icon, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

Mythril Blade (Rare):
3D render of a fantasy sword, mythril material, rare quality, gleaming silvery-blue blade with elven runes, ornate gold hilt with gemstone, slight magical glow, game item icon

Flaming Sword (Epic):
3D render of a fantasy sword, enchanted steel, epic quality, ornate blade wreathed in flames, ruby in pommel, gold filigree, fire reflections, game item icon

Celestial Blade (Legendary):
3D render of a fantasy sword, celestial material, legendary quality, blade of pure crystal with golden light, winged crossguard, diamond centerpiece, radiant glow, game item icon

Orcish War Axe (Uncommon):
3D render of a fantasy axe, iron and bone, uncommon quality, large double-headed axe, rough wooden handle wrapped in leather, tribal carvings, game item icon

Elven Longbow (Rare):
3D render of a fantasy bow, silver wood and mythril, rare quality, elegant curved bow with leaf engravings, string of silvery fiber, elegant, game item icon

**POTIONY I ELIKSYRY:**
Health Potion (Common):
3D render of a fantasy potion, glass material, common quality, round flask with red glowing liquid, cork stopper, simple shape, game item icon

Mana Potion (Uncommon):
3D render of a fantasy potion, glass material, uncommon quality, tall slim bottle with blue glowing liquid, glass stopper, magical bubbles, game item icon

Potion of Strength (Rare):
3D render of a fantasy potion, glass material, rare quality, short wide flask with pulsating red liquid, black leather wrapping, minor smoke effect, game item icon

Elixir of Life (Legendary):
3D render of a fantasy potion, crystal material, legendary quality, tall slender vial with swirling golden liquid, tiny floating stars inside, soft inner glow, game item icon

**TARCZE I ZBROJE:**
Wooden Shield (Common):
3D render of a fantasy shield, wood material, common quality, round wooden shield with iron rim, simple boss in center, leather straps on back, game item icon

Steel Shield (Uncommon):
3D render of a fantasy shield, steel material, uncommon quality, kite shield with embossed lion crest, blue paint trim, polished surface, game item icon

Dragon Scale Shield (Epic):
3D render of a fantasy shield, dragon scale material, epic quality, shield shaped like dragon wing, scales overlapping, ruby red center, gold trim, game item icon

Chainmail Chest (Common):
3D render of fantasy armor, chainmail material, common quality, simple chainmail vest, metal rings, leather straps at shoulders, game item icon

Plate Armor (Rare):
3D render of fantasy armor, plated steel, rare quality, full plate armor set (visualized as chest piece), fluted design, engraved borders, polished steel, game item icon

**WALUTY I KLEJNOTY:**
Gold Coin:
3D render of a fantasy gold coin, gold material, shiny with crown emblem and text, stacked in small pile, game item icon

Silver Coin:
3D render of a fantasy silver coin, silver material, with moon emblem, stacked, game item icon

Gem (Common):
3D render of a fantasy gemstone, cut crystal, faceted red ruby, sparkling with inner light, game item icon

Gem (Rare):
3D render of a fantasy gemstone, cut crystal, faceted blue sapphire, sparkling with inner light, game item icon

Gem (Epic):
3D render of a fantasy gemstone, cut crystal, faceted purple amethyst, sparkling with inner light, game item icon

Valor Token:
3D render of a fantasy valor token, silver material, blue-silver coin with star emblem, soft blue glow, game item icon

Mana Crystal:
3D render of a fantasy mana crystal, blue crystal cluster, glowing with inner light, floating slightly, game item icon

**PRZYDATNE AKCESORIA:**
Leather Backpack (Common):
3D render of a fantasy backpack, leather material, common quality, simple leather pack with flap, brass buckles, bedroll visible underneath, game item icon

Healing Herb (Common):
3D render of a fantasy herb, green plant material, common quality, small bunch of leaves with small white flowers, tied with string, game item icon

Magic Scroll (Uncommon):
3D render of a fantasy scroll, parchment material, uncommon quality, rolled parchment with red wax seal, faint magical glow, game item icon

### 3.5 UI Elements

**Rozmiar:** Zależy od elementu (typowo 256x256 lub 512x256)
**Styl:** Fantasy UI elements, ornate frames, metallic effects, transparent background where applicable
**Parametry:** --ar varies, --style raw, --v 6

**PANELE RAMKOWE (dla okienek ekwipunku, statow, itp.):**
Panel Frame (Common):
Fantasy game UI panel frame, simple iron style, dark steel, minimal borders with rivets, transparent background, game UI asset

Panel Frame (Uncommon):
Fantasy game UI panel frame, ornate steel style, silver and blue, decorative borders with leaf patterns, game UI asset

Panel Frame (Rare):
Fantasy game UI panel frame, ornate silver style, silver and blue, decorative borders with leaf patterns, game UI asset

Panel Frame (Epic):
Fantasy game UI panel frame, royal gold style, gold and purple, elaborate borders with gemstones, game UI asset

Panel Frame (Legendary):
Fantasy game UI panel frame, heavenly style, celestial gold and white, glowing borders with radiant gems, holy light, game UI asset

Panel Frame (Mythic):
Fantasy game UI panel frame, divine style, radiant gold and rainbow hues, animated sparkles, godly aura, game UI asset

**PRZYCISKY:**
Button Gold:
Fantasy game UI button, medieval style, gold and sapphire, ornate borders with dragon motifs, metallic shine, transparent background, game UI asset, high detail

Button Silver:
Fantasy game UI button, medieval style, silver and ruby, ornate borders with wolf motifs, metallic shine, transparent background, game UI asset

Button Wood:
Fantasy game UI button, rustic style, dark wood and iron bands, simple carvings, transparent background, game UI asset

**IKONY I SYMBOLE (dla paskow HP/MP, buffow):**
Heart Icon:
Simple red heart symbol, glossy finish, slight bevel, transparent background, game UI asset

Mana Orb:
Blue glowing orb with white sparkles inside, soft outer glow, transparent background, game UI asset

Shield Icon:
Silver shield symbol with blue trim, simple outline, transparent background, game UI asset

Sword Crossed:
Two silver swords crossed behind a shield, simple outline, transparent background, game UI asset

**PASKI I PASKI POSTEPU:**
HP Bar Fill:
Red gradient bar end cap, glossy finish, suitable for stretching horizontally, transparent background, game UI asset

MP Bar Fill:
Blue gradient bar end cap, glossy finish, suitable for stretching horizontally, transparent background, game UI asset

EXP Bar Fill:
Yellow gradient bar end cap, glossy finish, suitable for stretching horizontally, transparent background, game UI asset

**Uwaga:** Dla prostych elementow (ikony, proste przyciski) rozważ uzycie SVG lub komponentow React (np. Lucide React) zamiast grafiki bitmapowej. Grafiki AI sa potrzebne do: ramek paneli, rarity border overlay, elementow dekoracyjnych, unikalnych przyciskow.

## PART 4: TECHNIKALIA

### 4.1 Animacja jednostek (CSS, bez frame-by-frame)

**Cel:** Jednostki wygladaja "zywo" bez ciezkej animacji klatka po klatce (oszczednosc miejsca i czasu).

**Rozwiazanie: State-based CSS z trzema stanami**
- idle.webp - pozycja neutralna (stoi, patrzy prosto)
- attack.webp - pozycja ataku (zamach broni, lekki pochyl do przodu)
- hit.webp - otrzymanie ciosu (pochyl do tylu, reakcja na impact, moze z migotaniem)

**Implementacja w React + Tailwind:**
```jsx
import { useState, useState} from "react";

function UnitSprite({ faction, className, rarity }) {
  const [animState, setAnimState] = useState("idle");

  const triggerAttack = () => {
    setAnimState("attack");
    setTimeout(() => setAnimState("idle"), 400); // 400ms atak
  };

  const triggerHit = () => {
    setAnimState("hit");
    setTimeout(() => setAnimState("idle"), 300); // 300ms reakcja na cios
  };

  const src = `/assets/units/${faction}/${className.toLowerCase()}_${rarity}_${animState}.webp`;

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={`${className} ${fraction}`}
        className="transition-transform transition-opacity duration-200"
        className={
          `animate-${animState === "attack" ? "attack" : animState === "hit" ? "hit" : "idle"}`
        }
      />
      {/* Rarity border - CSS, nie w grafice */}
      <div className={`absolute inset-0 rounded-lg pointer-events-none ${getBorderClass(rarity)}`} />
    </div>
  );
}

function getBorderClass(rarity) {
  switch (rarity.toLowerCase()) {
    case "common": return "border-2 border-gray-400";
    case "uncommon": return "border-2 border-green-500 glow-green";
    case "rare": return "border-2 border-blue-500 glow-blue";
    case "epic": return "border-2 border-purple-500 glow-purple";
    case "legendary": return "border-2 border-amber-500 glow-amber";
    case "mythic": return "border-2 border-red-500 glow-red animate-pulse-slow";
    default: return "border-2 border-gray-400";
  }
}
```

**CSS Animacje (w pliku CSS lub Tailwind):**
```css
/* Animacje stanu */
@keyframes attack {
  0% { transform: translateX(0) scale(1); }
  50% { transform: translateX(12px) scale(1.03); }
  100% { transform: translateX(0) scale(1); }
}

@keyframes hit {
  0% { transform: translateX(0) scale(1); }
  50% { transform: translateX(-6px) rotate(-3deg) scale(0.98); }
  100% { transform: translateX(0) scale(1); }
}

/* Efekty specjalne (darmowe, bez dodatkowych grafik) */
.attacking { animation: attack 0.4s ease-out; }
.hit { animation: hit 0.3s ease-out; }

/* Efekt otrzymania obrazen - migotanie */
.hit-damage {
  animation: damageFlash 0.2s ease-in-out 3;
}

@keyframes damageFlash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Efekt leczenia - pulsowanie zielonego swiatla */
.healing {
  animation: healPulse 1.5s ease-in-out infinite;
  box-shadow: 0 0 15px rgba(0, 255, 100, 0.4);
}

@keyframes healPulse {
  0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 100, 0.2); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 100, 0.5); }
}

/* Efekt odrodzenia - unoszenie w górę */
.respawn {
  animation: respawnFloat 2s ease-out;
  opacity: 0;
}

@keyframes respawnFloat {
  0% { transform: translateY(20px) scale(0.8); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

/* Obramowanie rarity (CSS, nie w grafice!) */
.glow-green { box-shadow: 0 0 8px rgba(34, 197, 94, 0.6); }
.glow-blue { box-shadow: 0 0 12px rgba(59, 130, 246, 0.6); }
.glow-purple { box-shadow: 0 0 16px rgba(168, 85, 247, 0.6); }
.glow-amber { box-shadow: 0 0 20px rgba(245, 158, 11, 0.6); }
.glow-red { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }

/* Rzadkie obramowania z pulsowaniem */
.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
  50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.6); }
}
```

**Zalety tego podejscia:**
- Tylko 3 pliki na jednostke zamiast 8-12 klatek animacji
- Plynne przejścia dzięki CSS transitions
- Latwe dodawanie nowych efektow (magia, zatrucie, zamrozenie)
- Zero dodatkowego miejsca na dysku dla animacji
- Dziala na wszystkich urzadzeniach (nawet slabych telefonach)

### 4.2 Post-processing i konwersja (co ja zrobie dla Ciebie)

**Workflow jaki wykonam po otrzymaniu Twoich PNG:**

**KROK 1: Usuwanie tla (rembg)**
```bash
# Jeden plik
rembg i input.png output.png

# Calkowity folder
rembg p input_folder/ output_folder/
```
*Uwaga: Jesli Twoje PNG juz maja przezroczyste tlo (z promptu "transparent background"), ten krok moze byc pominiety.*

**KROK 2: Upscale (opcjonalnie, tylko jesli potrzebujesz wiekszej rozdzielczosci)**
```bash
# Upscayl (GUI - Ty sam)
# Lub przez Python (jesli zainstalujesz model Real-ESRGAN)
realesrgan --input input.png --output output_2x.png --scale 2
```
*Typowe zastosowanie: Battle Backgrounds z 1024x1024 -> 2048x2048, potem skalowanie do 1920x1080

**KROK 3: Zmiana rozmiaru (resize do docelowych wymiarow)**
```bash
# Przyklady dla roznych typow assetow
# Battle Background: 1920x1080
magick input.png -resize 1920x1080! output.png

# Unit Portrait: 512x512
magick input.png -resize 512x512! output.png

# Item Icon: 256x256
magick input.png -resize 256x256! output.png

# Boss: 512x512 lub 1024x1024
magick input.png -resize 512x512! output.png
```
*Uwaga: ! wymusza dokładne wymiary (może zmienić proporcje - używaj tylko gdy wiesz, że proporcja jest 1:1 lub 16:9)

**KROK 4: Konwersja do WebP (z alpha channel)**
```bash
# Squoosh CLI - batch konwersja
# Jakość 80 dla RGB, 80 dla alpha (dobry balans)
squoosh --webp "{"quality":80,"alphaQuality":80}" --dir ./webp ./input_folder/*.png

# Lub indywidualnie:
squoosh --webp "{"quality":80,"alphaQuality":80}" input.png -o output.webp
```
*Dla backgroundow możesz użyć quality 75-80 (mniej krytyczne dla alpha)

**KROK 5: Zmiana nazwy zgodnie z konwencja**
```bash
# Przykladowy skrypt Python (ja to zrobie automatycznie)
import os
import re

def rename_asset(old_path, new_name):
    dir_name = os.path.dirname(old_path)
    ext = os.path.splitext(old_path)[1]
    new_path = os.path.join(dir_name, new_name + ext)
    os.rename(old_path, new_path)
    return new_path

# Przyklady użycia:
# rename_asset("raw/human_warrior.png", "human_warrior_common_idle")
# rename_asset("raw/plains.png", "plains")
# rename_asset("raw/health_potion.png", "health_potion")
```

**KROK 6: Organizacja w folderach**
```bash
# Tworzenie struktury
mkdir -p public/assets/units/human
mkdir -p public/assets/units/elf
mkdir -p public/assets/items
mkdir -p public/assets/bosses
mkdir -p public/assets/backgrounds
mkdir -p public/assets/ui

# Kopiowanie plikow
mv human_warrior_common_idle.webp public/assets/units/human/
mv plains.webp public/assets/backgrounds/
```

**KROK 7: Generowanie manifestu JSON (dla latwego importu w grze)**
```json
{
  "units": {
    "human_warrior_common_idle": {
      "path": "/assets/units/human/human_warrior_common_idle.webp",
      "width": 512,
      "height": 512,
      "faction": "human",
      "class": "warrior",
      "rarity": "common",
      "state": "idle"
    }
  },
  "backgrounds": {
    "plains": {
      "path": "/assets/backgrounds/plains.webp",
      "width": 1920,
      "height": 1080,
      "type": "plains"
    }
  }
  // ... inne kategorie
}
```

**Czego potrzebuje ode Ciebie:**
1. Folder z surowymi PNG (np. C:\game\raw_assets\)
2. Opcjonalnie: klucze do .env (jesli chcesz, żebym używał remove.bg API zamiast rembg)
3. Informacja: "mam X nowych assetow do obrobki"

**Co dostajesz z powrotem:**
1. Folder public/assets/ z gotowymi WebP
2. Plik assets.json z metadanymi
3. Raport: co zostało przetworzone, jakie były rozmiary plików przed/po
4. Ostrzeżenia: jeśli coś wygląda na niezgodne ze stylem (zbyt jasne/ciemne, inne proporcje)

**Dlaczego nie używam remove.bg API mimo że masz klucz?**
- rembg jest 100% darmowy, bez limitów, działa lokalnie
- Nie wysyła Twoich plików na zewnętrzne serwery (lepsza prywatność)
- Jakość porównywalna lub lepsza dla prostych obiektów (postaci, przedmioty)
- Szybszy dla batch processing (brak opóźnień sieciowych)
- Jedynie w przypadku bardzo skomplikowanych tłuszczy (włosy, sierść, przezroczyste efekty) remove.bg może być lepsze - wtedy możemy użyć Twojego klucza

### 4.3 Performance checklist (do odhaczenia przed wrzuceniem do gry)

Przed dodaniem kazdego assetu do repozytorium, sprawdz:

[ ] **Format:** WebP z alpha channel (nie PNG!)
[ ] **Rozmiar pikseli:** zgodny z tabela ponizej
[ ] **Waga pliku:** nie przekracza maksymalnej wartosci
[ ] **Przezroczystość:** alpha channel działa prawidłowo (brak białych prostokątów wokół obiektu)
[ ] **Watermark:** brak napisów AI, logotypów generatorów, znaków kreski
[ ] **Stylistyczna spójność:** pasuje do reszty assetów tej samej kategorii/rarity/frakcji
[ ] **Proporcje:** 1:1 dla jednostek i przedmiotów, 16:9 dla backgroundów (chyba że celowo inne)
[ ] **Padding:** postać/przedmiot nie jest przycięty (ma margines ~5-10% od krawędzi)
[ ] **Nazewnictwo:** zgodne z konwencją {kategoria}_{frakcja}_{klasa}_{rarity}_{stan}.webp
[ ] **Lazy loading:** w kodzie używasz next/image z loading="lazy"
[ ] **Test na urządzeniu mobilnym:** ładuje się szybko, nie powoduje spadku FPS

**Tabela maksymalnych wag plików (WebP):**
| Asset Type | Rozmiar | Maksymalna waga | Idealna waga |
|------------|---------|-----------------|--------------|
| Battle Background | 1920x1080 | 300 KB | 150-250 KB |
| Unit Portrait | 512x512 | 100 KB | 40-80 KB |
| Item Icon | 256x256 | 30 KB | 15-25 KB |
| Boss Sprite | 512x512 | 150 KB | 60-120 KB |
| Boss Sprite (epic) | 1024x1024 | 400 KB | 200-300 KB |
| UI Element | zmienna | 50 KB | 10-30 KB |
| Avatar | 128x128 | 20 KB | 8-15 KB |

**Jak sprawdzic wage i format:**
```bash
# Sprawdz typ pliku
file obrazek.webp

# Sprawdz wage
ls -lh obrazek.webp

# Sprawdz wymiary (z ImageMagick)
identify -format "%wx%h" obrazek.webp

# Sprawdz czy ma alpha (przezroczystosc)
identify -format "%[opaque]" obrazek.webp
# zwraca "false" jesli ma przezroczystosc
```

**Optymalizacja jeśli plik jest za ciężki:**
1. Zmniejsz quality w Squoosh (np. z 80 na 75)
2. Zmniejsz alphaQuality (z 80 na 70) - tylko jeśli przezroczystość nie jest krytyczna
3. Dla backgroundow: rozważ lekki blur lub redukcję szczegółów w tle
4. Dla ikon: upewnij się, że obiekt jest wyśrodkowany i nie ma zbędnej przestrzeni

**Pamiętaj:** Celem jest nie maksymalna jakość, a optymalny stosunek jakości do wagi. Gra ma ladować się szybko nawet na słabszym łączu mobilnym.
### 4.4 Szybki start - plan dzienny (co robic kiedy)

**PRZED STARTZEM:**
1. Zainstaluj: Python 3.10+, Node.js 18+
2. Zainstaluj globalnie: `pip install rembg` i `npm install -g @squoosh/cli`
3. Zarejestruj się na: leonardo.ai (konto A) i opcjonalnie leonardo.ai (konto B) lub bing.com/create
4. Przygotuj folder: `C:\game\raw_assets\` (lub gdziekolwiek indziej)

---

**DZIEN 1 — Konfiguracja + Battle Backgrounds (czas: 1-2 godziny)**
Cel: mieć gotowe 7 tła do pierwszej walki

1. [ ] Otwórz Bing Image Creator (lub Leonardo.ai jeśli wolisz)
2. [ ] Wygeneruj 7 obrazków używając promptów z sekcji 3.1
   - plains.webp, forest.webp, mountains.webp, desert.webp, ice_land.webp, volcano.webp, dungeon.webp
3. [ ] Zapisz wszystkie PNG do folderu `raw_assets/`
4. [ ] Powiedz mi: "mam 7 backgroundow w raw_assets"
5. [ ] JA: rembd -> resize 1920x1080 -> WebP 80% -> public/assets/backgrounds/
6. [ ] JA: wygeneruj assets.json z metadata backgroundow
7. [ ] Ty: dodaj do gry i przetestuj pierwsze tlo

---

**DZIEN 2 — Główne jednostki MVP (czas: 2-3 godziny)**
Cel: mieć podstawowy zestaw jednostek do walki

1. [ ] Wybierz 4 klasy do rozpoczęcia (np. Warrior, Mage, Tank, Healer)
2. [ ] Wybierz 1 frakcję do rozpoczęcia (np. Human)
3. [ ] Dla każdej klasy wygeneruj:
   - Common rarity (tylko idle.webp na początek)
   - Użyj promptu z sekcji 3.2 z Image Guidance (jeśli masz referencję)
4. [ ] Zapisz jako: `human_warrior_common_idle.png`, `human_mage_common_idle.png`, itd.
5. [ ] Powiedz mi: "mam 4 jednostki idle w raw_assets"
6. [ ] JA: rembd -> resize 512x512 -> WebP 80% -> public/assets/units/human/
7. [ ] JA: wygeneruj wersje attack/hit przez proste transformacje (lub Ty możesz je wygenerować osobno)
8. [ ] JA: wygeneruj avatary (crop 128x128 z centrum portretu)
9. [ ] JA: aktualizuj assets.json
10. [ ] Ty: zaimplementuj komponent UnitSprite z sekcji 4.1

---

**DZIEN 3 — Przedmioty i Bossy (czas: 1.5-2 godziny)**
Cel: mieć podstawowe przedmioty i pierwszego bossa

1. [ ] Wygeneruj przedmioty:
   - Health Potion (common)
   - Mana Potion (uncommon)
   - Iron Sword (common)
   - Gold Coin (currency)
   - Valor Token (currency)
   - Optional: 2-3 więcej przedmiotów z listy
2. [ ] Zapisz jako PNG w raw_assets/
3. [ ] Wygeneruj pierwszego bossa (np. Fire Dragon)
   - Użyj promptu z sekcji 3.4
   - Rozważ 1024x1024 dla lepszej szczegółowości
4. [ ] Powiedz mi: "mam przedmioty i bossa w raw_assets"
5. [ ] JA: przetwórz wszystko (rembd -> resize -> WebP)
6. [ ] JA: umieść w odpowiednich folderach (items/, bosses/)
7. [ ] JA: zaktualizuj assets.json
8. [ ] Ty: dodaj do systemu ekwipunku i spotkania z bossem

---

**DNI 4+ — Rozszerzanie zestawu (ciągła praca)**

**Systematyka pracy:**
- **Blok 30-60 minut**: generowanie jednej kategorii (np. wszystkie elfy uncommon)
- **Blok 15 minut**: przekazywanie mi do obróbki
- **Blok 15 minut**: integracja gotowych assetów

**Co generować w kolejnej kolejności:**
1. Pozostałe rarity dla już rozpoczętych klas/frakcji
2. Następna frakcja (np. Elfy, potem Orki)
3. Pozostałe klasy (Ranger, Assassin, Support)
4. Zaawansowane przedmioty (rzeczy legendary/mythic)
5. Pozostali bossowie (pozostałych 5)
6. Elementy UI (ramki paneli na wszystkie rarity)
7. Specjalne efekty (aurę magiczne, efekty specjalne jako osobne overlay)

**Wskazówki dotyczące efektywności:**
- **Trzymaj się jednej frakcji na raz** - łatwiej utrzymać stylistyczną spójność
- **Generuj serie** - np. wszystkie 6 rarities dla danego typu jednostki za jednym razem
- **Używaj Image Guidance** - znacznie przyspiesza osiągnięcie spójności między kolejnymi generacjami
- **Trzymaj surowce zorganizowane** - podfoldery w raw_assets/ według kategorii
- **Komunikuj się precyzyjnie** - „mam 12 elfich wojowników uncommon idle” zamiast „mam kilka plików”

---

**DODATKOWE WSKAZÓWKI DLA SPOJNOSCI STYLISTYCZNEJ:**

**Jeśli masz dwa konta Leonardo:**
- Konto A: główne postacie (jednostki, bossowie)
- Konto B: tła, przedmioty, UI
- LUB: Konto A: wszystkie common/uncommon, Konto B: rare/epic/legendary/mythic

**Technika referencyjna (najważniejsza!):**
1. Wygeneruj JEDEN wzorzec referencyjny (np. Human Warrior Common)
2. Zapisz go jako `ref_base.webp`
3. Przy każdej kolejnej generacji użyj go jako Init Image z strength 30-50%
4. To zapewni, że niezależnie od konta czy dnia, styl będzie podobny

**Monitorowanie jakości:**
- Co 10 generacji, zatrzymaj się i porównaj wszystkie wygenerowane obiekty obok siebie
- Szukaj odchyleń: czy kolory są zbyt jasne/ciemne? Czy poziom szczegółów jest podobny?
- Jeśli zauważysz trend (np. wszystko staje się coraz jaśniejsze), dostosuj prompty lub użyj korekty w post-processingu (JA mogę dostosować jasność/kontrast w partii)

---

**PAMIĘTAJ:**
- Lepiej mieć 10 idealnie spójnych assetów niż 100 różniących się stylem
- Pierwsze wrażenie gracza zależy od spójności świata, nie od ilości szczegółów na każdym pikselu
- Zacznij od małego, zrób to dobrze, potem rozszerzaj
- Ja jestem tutaj od obróbki technicznej - Ty skup się na kreatywnej stronie generowania

---

> Dokument v2.0 | 2026-06-24
> Uwzględnia: podział pracy, lokalne narzędzia bez limitów, workflow dla wielu kont
> Kompatybilny z: docs/plan/20_AI_PROMPTS.json, docs/plan/26_DATABASE_SCHEMA.json

---

*Ten dokument jest zywy i bedzie aktualizowany w miarę postępów w projekcie.*

**Ostatnia aktualizacja:** 2026-06-24
**Wersja:** 2.0
**Autor:** Asystent AI (współpraca z Tobą)

*Powodzenia w tworzeniu pięknego świata dla Idle Kingdom Revolution!* 🏰⚔️🧙‍♂️
