# Generic Unit Guide

> **WAŻNE: "3 warianty twarzy" = 3 różne wyglądy twarzy** (facial variants), a NIE stany (idle/attack/hit) ani emocje.
> Generujesz 3 razy ten sam prompt z innym seedem. To daje 3 różne twarze, ale identyczny strój, broń i motyw frakcji.


> Zasady generowania jednostek generycznych (wrogowie, sojusznicy, żołnierze).
> **Nie używamy** Image Guidance z Hero BASE – generujemy od nowa, zmieniając seed.

---

## Zasady

1. **Każda frakcja + klasa** ma **3 warianty twarzy** (Generic 01, 02, 03).
2. **Tylko stan `idle`** – nie generujemy `attack` ani `hit` dla Generics.
3. **Nie używamy** Image Guidance z Hero BASE – to ma być **inna postać**.
4. **Używamy** szablonu frakcji (motyw, kolory, kształty) – ale z **innym seedem**.
5. **Rarity:** Zawsze **Common** – generics to zwykli żołnierze, nie bohaterowie.

---

## Prompt dla Generic Unit

```
Stylized fantasy 3D render of a {faction} {class}, Common quality, generic soldier, full body shot from head to feet, feet visible, 3/4 front view, centered, transparent background, {faction_motif} visible on armor, {class_weapon}, no magical effects, soft studio lighting, game character portrait, high readability --ar 1:1 --style raw --v 6 --seed {random_seed}
```

### Przykład – Human Warrior Generic 01:
```
Stylized fantasy 3D render of a Human Warrior, Common quality, generic soldier, full body shot from head to feet, feet visible, 3/4 front view, centered, transparent background, lion motif on chestplate, simple steel armor, longsword and kite shield, no magical effects, soft studio lighting, game character portrait, high readability --ar 1:1 --style raw --v 6 --seed 12345
```

### Przykład – Human Warrior Generic 02 (inna twarz):
```
Stylized fantasy 3D render of a Human Warrior, Common quality, generic soldier, full body shot from head to feet, feet visible, 3/4 front view, centered, transparent background, lion motif on chestplate, simple steel armor, longsword and kite shield, no magical effects, soft studio lighting, game character portrait, high readability --ar 1:1 --style raw --v 6 --seed 67890
```

**Różnica:** Tylko seed – reszta taka sama. Daje to różne twarze, ale spójny styl.

---

## Gdzie zapisujemy?

- Folder: `public/assets/units/{faction}/generic/`
- Nazewnictwo: `{faction}_{class}_generic_01.webp`, `_02.webp`, `_03.webp`

**Przykład:** `human_warrior_generic_01.webp`

---


## Płeć i wiek w Generic Units

### Proporcje płci
- Domyślnie: 65% mężczyzn, 35% kobiet (losowo, nie trzeba pilnować równych proporcji w każdej klasie).
- **Orc:** 70% mężczyzn, 30% kobiet.
- **Celestial:** płeć nieokreślona / androgyniczna – generuj bez określania płci w prompcie.

### Wiek
Wiek dostosuj do klasy (patrz `00_FOUNDATION/00_ART_DIRECTION.md` → GENDER REPRESENTATION → Age Diversity).
W prompcie dodaj sugestię wieku, np. "young adult male", "middle-aged woman", "elderly mage".

### Prompt modifier dla płci
Dodaj do promptu na końcu (przed --ar):
- Dla mężczyzny: `, male, {age_suggestion}`
- Dla kobiety: `, female, {age_suggestion}`
- Dla Celestial: pomiń płeć, użyj `, ageless, androgynous`

**Przykład z płcią i wiekiem:**
```
Stylized fantasy 3D render of a Human Warrior, Common quality, generic soldier, full body shot from head to feet, feet visible, 3/4 front view, centered, transparent background, lion motif on chestplate, simple steel armor, longsword and kite shield, no magical effects, soft studio lighting, game character portrait, high readability, male, young adult --ar 1:1 --style raw --v 6 --seed 12345
```

## Uwagi

- **Nie używamy** Image Guidance z Hero BASE – to ma być inna postać.
- **Nie generujemy** `attack` i `hit` – tylko `idle`.
- **Jeśli brakuje** Generics w grze – pokazujemy placeholder (kolorowy blok z nazwą).
