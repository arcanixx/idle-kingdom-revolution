# Asset Generation — Spis Treści

> Dokumentacja do generowania assetów dla **Idle Kingdom Revolution**.
> Styl: Fantasy 3D-rendered 2D, spójny, lekki (WebP), zoptymalizowany pod gry mobilne.
>
> **Przebudowano:** 2026-06-27. Ten folder wcześniej zawierał dwa nawarstwione
> systemy promptów (starszy, opisowy katalog kategorii `00`–`13` + osobny
> `PROMPT_CONSTRUCTOR*`, oraz nowszy, rygorystyczny "production atlas pipeline"
> `14`–`22`). Oba zostały scalone w jedną strukturę folderów poniżej. Nic nie
> zostało usunięte — starsze, zastąpione pliki leżą w `_ARCHIVE/`.

---

## Jak czytać tę dokumentację — w jednym zdaniu

**`01_PRODUCTION_SYSTEM/` to żywy generator promptów** (jak budować prompt
z modułów). **`02_POC/` to konkretne, gotowe do użycia prompty** dla
poszczególnych Hero (jak Human Warrior, Human Mage). **`04_CATEGORIES/` to
wszystko, co NIE jest atlasem rarity Hero** (tła, itemy, bossowie, UI, emocje,
generici). **`00_FOUNDATION/` to fundament, który rzadko się zmienia** (art
direction, styl, heraldyka). **`03_PIPELINE/` to co robisz PO wygenerowaniu
obrazka** (QA, cięcie, eksport WebP).

---

## Struktura folderów

```text
docs/assets/
├── README.md                         ← ten plik
│
├── 00_FOUNDATION/                     KONSTYTUCJA WIZUALNA — zmienia się rzadko
│   ├── 00_ART_DIRECTION.md            Race/Faction/Class, proporcje, motywy ras, klasy, wiek/płeć, "dlaczego tak wygląda"
│   ├── 01_STYLE_BIBLE.md              Kamera, światło, materiały, kształty — "jak to renderować"
│   ├── 02_HERALDRY_SYSTEM.md          TYLKO symbole Faction (lew, czaszka, gwiazda...)
│   └── 03_EQUIPMENT_SILHOUETTE_LOCKS.md  TYLKO kształt ekwipunku (tarcza/kostur/miecz) — niezależne od heraldyki
│
├── 01_PRODUCTION_SYSTEM/              AKTYWNY GENERATOR — jak budować nowy prompt rarity atlas
│   ├── 00_SPRITE_ATLAS_CONTRACT.md    Format wyjściowy: 2048×1365, 2×3 sloty, chroma green
│   ├── 01_REFERENCE_FRAME_SYSTEM.md   Niewidzialna ramka spójności — każdy slot identyczny
│   ├── 02_PROMPT_MODULE_SYSTEM.md     Kolejność modułów promptu + Body Scale Lock, Effect Boundary, Gender/Body Lock
│   ├── 03_HERO_RARITY_ATLAS_FACTORY.md  Skeleton + tabela wymaganych inputów dla nowej klasy
│   └── 04_KNOWN_IMPROVEMENTS_BACKLOG.md  Pomysły na v2 frameworku (z zewnętrznego review) — NIE zastosowane jeszcze
│
├── 02_POC/                            KONKRETNE PROMPTY — gotowe do wklejenia
│   ├── _TEMPLATE.md                   Pusty szablon — kopiuj dla każdej nowej klasy/rasy/frakcji
│   ├── HUMAN_LION_KINGDOM_WARRIOR_V3.md  ⚠️ Framework OK, ATLAS odrzucony (lion-head defekt) — patrz REVIEW NOTES
│   ├── HUMAN_LION_KINGDOM_MAGE_V1.md     🧪 Test frameworku (sylwetka/budowa/wiek/płeć) — patrz niżej
│   ├── ORC_LION_KINGDOM_TANK_V1.md       ⚠️ Race isolation PASS, ATLAS odrzucony (lion-head + kolor tarczy) — patrz REVIEW NOTES
│   └── HUMAN_IRON_LEGION_RANGER_V1.md    🧪 Test izolacji FACTION (ta sama Rasa, inna Faction+Klasa) — czeka na recenzję
│
├── 03_PIPELINE/                       CO ROBISZ PO WYGENEROWANIU OBRAZKA
│   ├── 00_QA_ACCEPTANCE_GATES.md      Bramki PASS/FIX/REJECT przed cięciem atlasu
│   ├── 01_ATLAS_TO_ASSET_PIPELINE.md  PNG atlas → WebP → manifest, krok po kroku
│   ├── 02_SPRITE_SLICING_SPEC.md      Matematyka cięcia atlasu na 6 sprite'ów
│   └── 03_WORKFLOW_AND_TOOLS.md       Podział pracy Ty/Ja, narzędzia, tabela wag plików
│
├── 04_CATEGORIES/                     WSZYSTKO POZA HERO RARITY ATLAS
│   ├── 00_BACKGROUNDS.md              Tła walki (7 krajobrazów)
│   ├── 01_UNIT_PORTRAITS.md           Hierarchia BASE→rarity dla jednostek (rdzeń starego systemu)
│   ├── 02_ITEM_ICONS.md               Bronie, mikstury, tarcze, waluta
│   ├── 03_BOSS_CREATURES.md           Bossowie i ich progresja rarity
│   ├── 04_UI_ELEMENTS.md              Ramki, przyciski, ikony, paski
│   ├── 05_EMOTION_PORTRAITS.md        Portrety dialogowe (half-body, Core/Extended/Special)
│   ├── 06_ENVIRONMENT_EFFECTS.md      Pogoda, efekty magiczne, eventy
│   ├── 07_GENERIC_UNITS.md            Wrogowie/żołnierze — 3 warianty twarzy, bez Image Guidance
│   └── 08_PLACEHOLDER_STRATEGY.md     Jak obsłużyć brakujące assety w dev/test
│
├── 05_REFERENCE/                      DANE I LISTY — nie procesy
│   ├── 00_ASSET_LIST_REFERENCE.md     Pełna lista wszystkich assetów + fazy realizacji
│   ├── 01_ASSET_CHECKLIST.md          Checklist postępu (odznaczaj [x] po wygenerowaniu)
│   └── 02_COMBAT_VISUAL_STATES.md     Dlaczego blood/burn/frozen to overlay, nie sprite'y
│
├── 06_WORLDBUILDING_AI_TOOLKIT/       OSOBNA SPRAWA: fabuła/eventy, nie grafika
│   └── 00_PROJECT_AI_TOOLKIT.md       Master prompt dla generowania NPC/eventów/questów/lokacji
│
└── _ARCHIVE/                          NIEAKTYWNE, ale nic nie usunięte
    ├── PROMPT_CONSTRUCTOR*.md          Stary grid-based generator (epoka 1) — zastąpiony przez 01_PRODUCTION_SYSTEM/
    ├── PROMPTS.md                      Stary zbiór zatwierdzonych promptów — zastąpiony przez 02_POC/
    ├── 16_PROMPT_MODULE_SYSTEM_v1.0_original.md   Wersja przed dodaniem Gender/Body Lock i Effect Boundary
    ├── 22_HERALDRY_SYSTEM_original.md  Oryginał przed rozbiciem na Heraldry + Equipment Silhouette Locks
    ├── 12_GENERIC_UNIT_GUIDE_original.md  Oryginał z błędną numeracją w nagłówku (mówił "13" w treści)
    └── ASSET_CHECKLIST_original_broken_encoding.md  Oryginał z uszkodzonym kodowaniem (krzaczki) — naprawiony w 05_REFERENCE/
```

---

## Szybki start: jak wygenerować nową klasę (np. Human Mage po Human Warrior)

To jest dokładnie ten workflow, o który chodziło przy budowaniu tego systemu:
mamy działający punkt odniesienia (Warrior), chcemy wygenerować kolejną klasę
zmieniając tylko to, co naprawdę się różni.

1. **Przeczytaj fundament raz:** `00_FOUNDATION/00_ART_DIRECTION.md` (sekcja
   CLASS DESIGN GUIDE — tam jest typowy wiek, budowa, broń dla każdej klasy).
2. **Skopiuj** `02_POC/_TEMPLATE.md` jako `02_POC/{RASA}_{FRAKCJA}_{KLASA}_V1.md`
   (albo, jeśli klasa już ma plik jak `HUMAN_LION_KINGDOM_MAGE_V1.md`, użyj go jako wzorca).
3. **Wypełnij INPUT TABLE** na górze pliku — to wymusza decyzję o: płci,
   budowie ciała, wieku, broni, locku sylwetki broni — zanim dotkniesz
   właściwego promptu. To jest miejsce, gdzie najczęściej coś się gubi, jeśli
   się to przeskoczy.
4. **Zostaw nienaruszone:** format atlasu, Reference Frame, Sprite Slot
   Alignment, Rarity Contract, Effects Contract, Effect Boundary, Negative
   Prompt. To jest "framework" — jeśli te sekcje trzeba zmienić dla nowej
   klasy, to znak, że framework ma dziurę, nie że klasa jest specjalna.
   Zgłoś to w `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md`, nie tylko w
   pliku PoC.
5. **Zmień tylko:** broń, offhand/focus, lock sylwetki broni (sprawdź czy
   istnieje już w `00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md` — jeśli
   nie, dopisz go tam), opisy Common→Mythic, budowę ciała i wiek.
6. **Wygeneruj, oceń przez** `03_PIPELINE/00_QA_ACCEPTANCE_GATES.md`.
7. **Po akceptacji:** zaktualizuj `05_REFERENCE/01_ASSET_CHECKLIST.md` i
   REFERENCE LOCK dla tej kombinacji rasa+frakcja+klasa+płeć.

### Status: Human Mage jako test frameworku

`02_POC/HUMAN_LION_KINGDOM_MAGE_V1.md` nie jest tylko "zmień miecz na
kostur". To pierwszy realny test, czy framework wytrzymuje zmianę
**sylwetki/budowy ciała, wieku i płci**, nie tylko ekwipunku — bo właśnie
to nie było jeszcze sprawdzone przez Warrior PoC. Plik zawiera osobną
sekcję `GENDER AND BODY TYPE LOCK` i loguje w `REVIEW NOTES`, czy framework
wymagał jakichkolwiek poprawek poza wypełnieniem INPUT TABLE — jeśli tak,
poprawki te powinny wejść do `01_PRODUCTION_SYSTEM/`, a nie zostać tylko w
pliku Mage.

**Płeć:** Hero są generowane w obu płciach (Male/Female) dla każdej
kombinacji rasa+frakcja+klasa w aktywnej rotacji (patrz
`05_REFERENCE/00_ASSET_LIST_REFERENCE.md`). Wcześniejszy Warrior PoC v3 nie
blokował tego explicite w prompcie — `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md`
v1.1 dodaje moduł `GENDER AND BODY TYPE LOCK`, który to naprawia na poziomie
frameworku, nie tylko jednego PoC.

### Status: wyniki realnej generacji (zaktualizowano 2026-06-27 — wszystkie 4 PoC przeglądnięte)

Po wygenerowaniu i szczegółowym obejrzeniu wszystkich czterech atlasów
(`assets/` w root repo) mamy teraz **empiryczne, nie tylko teoretyczne**
wyniki:

- **Race i Faction są niezależnie kontrolowalne — POTWIERDZONE PEŁNIĄ,
  obustronnie.** `02_POC/ORC_LION_KINGDOM_TANK_V1.md`: Orc wyszedł wyraźnie
  szerszy/masywniejszy niż Human, przy identycznej kolorystyce Lion Kingdom.
  `02_POC/HUMAN_IRON_LEGION_RANGER_V1.md`: nowa Faction (szaro-kremowo-bronzowa,
  inny herb) wyszła kompletnie odrębna kolorystycznie, przy identycznych
  proporcjach Human. Żadna z dwóch testów nie wymagała zmiany frameworku.
- **Lion-head-only przy Epic/Legendary — potwierdzone 2/2 dla Lion Kingdom,
  ALE nie powtórzone na Iron Legion.** Nowy wniosek: to może być
  specyficzne dla pełnopostaciowych zwierzęcych herbów (lew), nie dla
  medalionowych/płaskich kształtów (Iron Legion). Zob. nowa sekcja
  EMPIRICAL NOTE w `00_FOUNDATION/02_HERALDRY_SYSTEM.md`.
- **Niezgodność koloru tarczy między atlasami Lion Kingdom przy Epic** —
  wciąż niewyjaśniona, śledzona w nowym **Gate 7**.
- **Status atlasów:**
  - `HUMAN_LION_KINGDOM_WARRIOR_V3.md` — framework OK, atlas ODRZUCONY
    (lion-head-only)
  - `ORC_LION_KINGDOM_TANK_V1.md` — Race isolation PASS, atlas ODRZUCONY
    (lion-head-only + kolor tarczy)
  - `HUMAN_IRON_LEGION_RANGER_V1.md` — Faction isolation PASS, **Żaden
    blokujący defekt nie znaleziony** — najlepszy kandydat produkcyjny z
    czterech
  - `HUMAN_LION_KINGDOM_MAGE_V1.md` — framework PASS (z poprzedniej tury),
    nie analizowany ponownie pod kątem tych dwóch nowych defektów
- **Główny wniosek koncepcyjny: Race/Faction split jest empirycznie
  potwierdzony.** Pozostałe dwa defekty (lion-head, kolor tarczy) są
  problemami niezawodności generatora, specyficznymi dla wykonania Lion
  Kingdom (lew, niebiesko-złoty), nie dziurami w samym frameworku
  Race/Faction/Class.

---

## Znany otwarty temat: rozmiar postaci w niektórych generatorach

Warrior PoC działa dobrze do kreowania obrazków postaci, ale rozmiar postaci
"wykłada się" w niektórych generatorach AI (niezgodność ze specyfikacją
Body Scale Lock przy niektórych modelach/narzędziach). To do analizy
osobno — nie jest to powód do zmiany struktury dokumentacji, tylko temat do
dalszych testów per-narzędzie (Leonardo / ChatGPT image / Midjourney itd.).
Zanotuj wyniki takich testów w `REVIEW NOTES` odpowiedniego pliku w `02_POC/`.

---

## Otwarte tematy w toku (zaktualizowano 2026-06-27)

### Zrobione w tej turze

1. **Race vs Faction — zaimplementowane.** Trzy niezależne osie: **Race**
   (Human/Elf/Orc/Undead/Demon/Celestial — ciało, proporcje, wiek) +
   **Faction** (np. "Lion Kingdom", "Fire Cult" — kolorystyka, heraldyka,
   zdobienia, przypisana do jednej rasy) + **Class** (rola bojowa). Pełny
   opis w `00_FOUNDATION/00_ART_DIRECTION.md` → RACE, FACTION, AND CLASS
   (nowa sekcja) oraz `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` →
   RACE AND FACTION MODULE (v1.2). Zaktualizowane pliki: `00_ART_DIRECTION.md`
   (v2.0 — przemianowane tabele Faction→Race, nowa sekcja FACTION DESIGN
   GUIDE, rozdzielone NEW RACE / NEW FACTION CREATION RULES),
   `03_HERO_RARITY_ATLAS_FACTORY.md` (INPUT TABLE i PROMPT SKELETON
   rozdzielone na `race:`/`faction:`), `02_POC/_TEMPLATE.md` (to samo).
   `HUMAN_LION_KINGDOM_WARRIOR_V3.md` i `HUMAN_LION_KINGDOM_MAGE_V1.md`
   (przemianowane z `HUMAN_WARRIOR_V3.md`/`HUMAN_MAGE_V1.md` zgodnie z nową
   konwencją `{RACE}_{FACTION}_{CLASS}`) dostały tylko notatkę wyjaśniającą
   na górze pliku, że ich `Faction: Lion Kingdom` w FINAL PROMPT czytamy
   teraz jako Race: Human, Faction: Lion Kingdom — sam FINAL PROMPT
   pozostał bez zmian.
   - **Hero Factions vs Enemy/Lore Factions:** rozróżnienie skali — główne
     Hero Faction dostają pełną matrycę assetów (7 klas × 6 rarity × 3
     stany × 2 płcie), frakcje przeciwników/lore (np. Fire Cult) dostaną
     mniej (możliwe, że overlay, nie pełny asset — do rozstrzygnięcia przy
     implementacji) — żeby nie eksplodował rozmiar `public/assets/`.
2. **Kierunek postaci (facing direction) — śledzone systemowo.** Nowy Gate 6
   w `03_PIPELINE/00_QA_ACCEPTANCE_GATES.md` sprawdza kierunek i wyrównanie
   rzędów przy każdym atlasie. Negative prompt w `02_POC/_TEMPLATE.md`
   wzmocniony o `facing right` / `mirrored pose`.
3. **Drift wysokości rząd 1 vs rząd 2 — śledzone w tym samym Gate 6.**
4. **Backlog usprawnień promptu** w
   `01_PRODUCTION_SYSTEM/04_KNOWN_IMPROVEMENTS_BACKLOG.md` — czeka na v2
   frameworku, nie blokuje obecnej pracy.
5. **Długość promptów przy wklejaniu — nowy praktyczny problem (2026-06-27).**
   Najnowsze prompty (Tank, Ranger) są już na tyle długie, że niektóre
   narzędzia generujące zaczynają traktować wklejony tekst jako załącznik
   (plik) zamiast treści wiadomości, co wymuszało wklejanie w dwóch ratach.
   Zanotowane w `01_PRODUCTION_SYSTEM/04_KNOWN_IMPROVEMENTS_BACKLOG.md` jako
   konkretny, praktyczny argument za skróceniem/konsolidacją promptu (patrz
   punkty 1-2 w tamtym pliku) — to nie jest już tylko teoretyczna preferencja
   stylu, to realne ograniczenie narzędzia.
6. **Nazewnictwo plików raw atlasów — ZAIMPLEMENTOWANE (2026-06-27).**
   `03_PIPELINE/01_ATLAS_TO_ASSET_PIPELINE.md` v1.1 wymaga teraz explicite
   `{RACE}_{FACTION}_{CLASS}_{GENDER}_V{wersja}.png` dla surowych atlasów
   PRZED cięciem (nie tylko dla finalnych sprite'ów po cięciu, jak było
   wcześniej) — bez segmentu płci dwa atlasy różniące się tylko płcią
   nadpisywałyby się wzajemnie. Patrz też Gate 7 w
   `03_PIPELINE/00_QA_ACCEPTANCE_GATES.md` (cross-atlas Faction
   consistency) i Gate 5 (wzmocniony empirycznymi danymi o defekcie
   lion-head-only).

### Nadal otwarte / do decyzji w przyszłości

- **Implementacja Enemy/Lore Factions** (np. Fire Cult) — czy to pełne
  assety, overlaye, czy hybryda — do rozstrzygnięcia gdy fabuła tego
  zacznie wymagać.
- **Finalne potwierdzenie Human Mage POC** w docelowym pipeline/narzędziu
  (oznaczone jako outstanding w `02_POC/HUMAN_LION_KINGDOM_MAGE_V1.md` →
  REVIEW NOTES).
- **Regeneracja Warrior i Tank atlasów** — oba czekają na regenerację tym
  samym promptem, z dodatkową uwagą QA na sloty 4-5 (Epic/Legendary).
- **Czy hipoteza "medalion > pełnopostaciowy herb"** (zob.
  `00_FOUNDATION/02_HERALDRY_SYSTEM.md` → EMPIRICAL NOTE) potwierdzi się na
  trzeciej/czwartej Faction — jeszcze za mało danych (1 medalion vs 2
  pełnopostaciowe herby), do obserwacji przy następnych PoC.
- **Niewyjaśniona przyczyna niezgodności koloru tarczy przy Epic** (Gate 7) —
  zarejestrowane jako objaw, nie zdiagnozowane jeszcze co je powoduje.
- **Decyzja lore: czy "Orc Lion Kingdom Tank" zostaje w fabule** czy był to
  czysty test frameworku do odrzucenia po zachowaniu wniosków.

---

## Narzędzia (skrót)

| Narzędzie | Do czego | Limit |
|-----------|----------|-------|
| Leonardo.ai | Jednostki, bossowie, przedmioty | 150 tokenów/dzień |
| Bing Image Creator | Backgroundi, krajobrazy | Darmowe (wolniejsze) |
| ChatGPT (DALL-E / GPT-image) | Rarity atlasy, emotion portraits | Limit wg planu |
| Midjourney | Premium asset, okładki | Płatne |

Szczegóły podziału pracy: `03_PIPELINE/03_WORKFLOW_AND_TOOLS.md`

---

## Co generujemy — w skrócie

| Kategoria | Ilość | Rozmiar | Gdzie opisane |
|-----------|-------|---------|---------------|
| Battle Backgrounds | 7 | 1920×1080 | `04_CATEGORIES/00_BACKGROUNDS.md` |
| Hero rarity atlas (1 rasa+frakcja × 7 klas × 6 rarity × 2 płcie) | 252 | 512×512 (po cięciu) | `02_POC/`, `03_PIPELINE/` |
| Generic Units (3 twarze × 42 rasa+klasa) | 126 | 512×512 | `04_CATEGORIES/07_GENERIC_UNITS.md` |
| Item Icons | ~21 | 256×256 | `04_CATEGORIES/02_ITEM_ICONS.md` |
| Boss Creatures | 8 | 512×512 / 1024×1024 | `04_CATEGORIES/03_BOSS_CREATURES.md` |
| UI Elements | ~16 | zmienna | `04_CATEGORIES/04_UI_ELEMENTS.md` |
| Emotion Portraits | ~147+ (Human Core) | 512×512 | `04_CATEGORIES/05_EMOTION_PORTRAITS.md` |
| Environment Effects | ~17 | 256–512 | `04_CATEGORIES/06_ENVIRONMENT_EFFECTS.md` |

Pełna lista i fazy realizacji: `05_REFERENCE/00_ASSET_LIST_REFERENCE.md`
Checklist postępu: `05_REFERENCE/01_ASSET_CHECKLIST.md`

---

## Dlaczego ta restrukturyzacja (2026-06-27)

Przed restrukturyzacją ten folder zawierał 22 ponumerowane pliki (`00`–`22`)
plus 9 nienumerowanych (`ASSET_*`, `PROMPT_CONSTRUCTOR*`, `PROMPTS.md`), z
trzema konkretnymi problemami:

1. **README odwoływał się do plików-duchów** (`12_PROMPT_CONSTRUCTOR.md`,
   alias `13_GENERIC_UNIT_GUIDE.md`), które nie istniały pod tymi nazwami.
2. **`12_GENERIC_UNIT_GUIDE.md` miał błędną numerację w nagłówku** (treść
   zaczynała się od "# 13 – Generic Unit Guide") — ślad przesunięcia
   numeracji w trakcie wcześniejszej edycji.
3. **Dwa nawarstwione systemy promptów** (opisowy katalog kategorii z epoki 1
   vs rygorystyczny production atlas pipeline z epoki 2) żyły w jednym
   płaskim folderze bez rozgraniczenia, co który robi.

Dodatkowo: `22_HERALDRY_SYSTEM.md` mieszał dwa niezależne systemy (heraldyka
frakcji vs locki sylwetki ekwipunku) w jednym pliku — rozdzielone teraz na
`00_FOUNDATION/02_HERALDRY_SYSTEM.md` i
`00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md`.

Żadna treść merytoryczna nie została usunięta. Stary system grid-based
(`PROMPT_CONSTRUCTOR*.md`, `PROMPTS.md`) został zarchiwizowany w `_ARCHIVE/`
z notatką wyjaśniającą, że został zastąpiony przez `01_PRODUCTION_SYSTEM/` —
zostaje jako historia/inspiracja, nie jako aktywna dokumentacja.

---

Wersja: 4.0 (po restrukturyzacji)
Data: 2026-06-27
Autor: Asystent AI (współpraca z Tobą)
