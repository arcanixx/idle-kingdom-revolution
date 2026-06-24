# 08 – Workflow and Tools

> Jak pracujemy – podział zadań, narzędzia, pipeline, współpraca.

---

## Podział pracy

| Krok | Wykonawca | Narzędzie | Szczegóły |
|------|-----------|-----------|-----------|
| Generowanie obrazków | **TY** | Leonardo.ai / Bing / ChatGPT | Przez przeglądarkę, wg promptów |
| Usunięcie tła | **JA** | rembg (Python) | Batch processing, bez limitów |
| Upscale (opcjonalnie) | **TY lub JA** | Upscayl / Real-ESRGAN | Jeśli potrzeba większej rozdzielczości |
| Konwersja do WebP | **JA** | Squoosh CLI | Batch: PNG → WebP z alpha |
| Zmiana nazw + sortowanie | **JA** | Python skrypt | Zgodnie z konwencją |
| Struktura folderów | **JA** | mkdir + mv | `public/assets/{kategoria}/` |
| Asset manifest | **JA** | Python → JSON | Mapa asset_id → ścieżka + metadata |
| Sprawdzenie spójności | **JA** | Wizualna + nazwy | Czy style zgodne, brak watermarków |

---

## Narzędzia (szczegóły)

### Generowanie obrazków (Ty)

| Narzędzie | Plusy | Minusy | Zalecane do |
|-----------|-------|--------|-------------|
| Leonardo.ai | Image Guidance, spójność stylu, kontrola | 150 tokenów/dzień | Jednostki, bossowie, przedmioty |
| ChatGPT (DALL-E) | Szybkie, wygodne, dobre dla portretów | Mniejsza kontrola | Emotion portraits, prototypy |
| Bing Image Creator | Darmowe, dobre krajobrazy | Wolniejsze | Backgroundi, tła |
| Midjourney | Najlepsza jakość | Płatne, trudniejsza kontrola | Premium asset |

### Obróbka (Ja)

- **rembg** – usuwanie tła (lokalne AI, darmowe, bez limitów)
- **Squoosh CLI** – konwersja do WebP (batch, z alpha)
- **Python** – skrypty do zmiany nazw, organizacji, generowania manifestu
- **ImageMagick** – resize, konwersja, manipulacja obrazami

---

## Pipeline – krok po kroku

**KROK 1: TY generujesz obrazki**
- Otwierasz narzędzie (Leonardo.ai / ChatGPT / Bing)
- Używasz odpowiedniego promptu z dokumentacji
- Image Guidance = referencja (dla jednostek i bossów)
- Zapisujesz jako PNG do `C:\game\raw_assets\`

**KROK 2: Mówisz mi "mam obrazki"**
- Komunikat: "wygenerowałem 7 jednostek human i 3 itemy, są w raw_assets"

**KROK 3: JA obrabiam batch**
1. rembg (usunięcie tla – jeśli potrzebne)
2. Upscale (opcjonalnie)
3. Squoosh → WebP (quality 80)
4. Rename zgodnie z konwencją
5. mv do `public/assets/{kategoria}/`
6. Generuje JSON manifest

**KROK 4: TY sprawdzasz efekt**
- Otwierasz .webp
- Sprawdzasz spójność stylistyczną
- Mówisz "ok" lub "popraw X"

**KROK 5: JA aktualizuje manifest**
- `assets.json` z ścieżkami, typami, wymiarami
- Gotowe do importu w React

---

## Image Guidance – technika spójności

1. Wygeneruj **jeden wzorzec referencyjny** (np. Human Warrior Base)
2. Zapisz jako `ref_base.webp`
3. Przy każdej kolejnej generacji użyj go jako Init Image z **siłą 30-50%**
4. To zapewni spójność niezależnie od konta czy dnia

---

## Struktura folderów (finalna)

public/assets/
├── backgrounds/
├── units/
│ ├── human/
│ ├── elf/
│ ├── orc/
│ ├── undead/
│ ├── demon/
│ └── celestial/
├── items/
├── bosses/
├── ui/
├── portraits/
│ ├── human/
│ ├── elf/
│ └── ...
├── avatars/
│ ├── human/
│ └── ...
└── effects/
├── weather/
├── magic/
└── events/

---

## Checklist przed wrzuceniem do gry

- [ ] Format: WebP z alpha channel
- [ ] Rozmiar: zgodny z tabelą
- [ ] Waga: nie przekracza maksimum
- [ ] Przezroczystość działa prawidłowo
- [ ] Brak watermarków, logotypów AI
- [ ] Stylistycznie spójny z resztą
- [ ] Nazewnictwo zgodne z konwencją
- [ ] Lazy loading w kodzie (next/image)

---

## Tabela wag plików (WebP)

| Asset Type | Rozmiar | Maks. waga | Idealna |
|------------|---------|------------|---------|
| Battle Background | 1920×1080 | 300 KB | 150-250 KB |
| Unit Portrait | 512×512 | 100 KB | 40-80 KB |
| Item Icon | 256×256 | 30 KB | 15-25 KB |
| Boss Sprite | 512×512 | 150 KB | 60-120 KB |
| Boss Sprite (epic) | 1024×1024 | 400 KB | 200-300 KB |
| UI Element | zmienna | 50 KB | 10-30 KB |
| Avatar | 128×128 | 20 KB | 8-15 KB |
| Emotion Portrait | 512×512 | 100 KB | 40-80 KB |
