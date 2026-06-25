# PROMPT_CONSTRUCTOR v1.0

INPUT:

Faction:
{faction}

Class:
{class}

Rarity:
{rarity}

Pose:
{pose}

AssetType:
{portrait|boss|item|background}

---

FACTION DEFINITIONS

Human:
gold, blue, steel

Elf:
green, silver, white

Orc:
brown, green, bone

Dwarf:
gold, copper, deep blue

Undead:
gray, corpse-green

Demon:
red, black, purple

Celestial:
gold, white, azure

---

CLASS DEFINITIONS

Warrior:
sword & shield
medium armor
classic silhouette
frontline soldier
faction heraldry visible

Tank:
massive shield
heavy armor
broad silhouette
largest armor volume
defensive stance

Mage:
staff
robes
magical focuses
arcane energy effects

Ranger:
bow
hood
light silhouette
agile stance

Assassin:
dual blades
darker elements
slim silhouette
low profile stance

Healer:
wand / rod
holy symbols
light materials
healing aura

Support:
banner
book
support artifact
buff aura

### Orc-Replacement Classes

Berserker:
dual axes
brutal style
massive physique
rage presence

Shaman:
totem
spirit mask
elemental focus
nature magic

Hunter:
spear
beast pelt
tracker silhouette
animal companion

---

SHAPE LANGUAGE

| Faction | Dominant Shapes |
|---------|-----------------|
| Human | rectangles, kite shields |
| Elf | arches, curves, leaves |
| Orc | triangles, spikes |
| Dwarf | circles, squares, geometric |
| Undead | broken lines |
| Demon | sharp horns |
| Celestial | stars and circles |

---

RARITY DEFINITIONS

Base:
  reference character
  neutral stance baseline
  no extra effects
  plain equipment, no decorations
  no heraldry
  no armor detailing
  bare minimum polygons for readable silhouette

Common:
  5-10% more detail than Base
  minor heraldry improvements
  minor armor refinement
  no additional cloth elements
  no capes
  no major shield redesign
  no visual prestige increase

Uncommon:
  15-25% more detail than Base
  clear heraldry: faction symbol visible on chest/shield
  improved armor: mixed materials (leather/fur/iron)
  minor cloth: small tabard or shoulder cape
  subtle glow on weapons
  no full cloak
  no gemstone embellishments

Rare:
  30-40% more detail than Base
  prominent heraldry: painted faction crest, engraved symbols
  enchanted equipment: silver/blue steel, glowing runes
  moderate cloth: half-cloak or long tabard
  soft magical aura around weapon
  small gems in armor joints
  helmet decoration: crest or plume

Epic:
  50-65% more detail than Base
  ornate heraldry: gold inlay, gemstone-encrusted crest
  ornate magical equipment: gold filigree, rubies
  full cloak with faction-colored trim
  moderate aura with magical sparks
  glowing eyes optional
  elaborate pauldrons and greaves

Legendary:
  75-90% more detail than Base
  celestial heraldry: divine symbols, halos, light motes
  divine equipment: armor of light and gold
  flowing enchanted cloak with particle trail
  strong aura with floating particles
  winged helmet or crown of light
  floating elements (orbiting runes, small wings)

Mythic:
  100%+ more detail than Base (maximum visual density)
  mythic divine armor with constellation engravings
  living celestial energy coursing through equipment
  ancient cosmic symbols glowing on armor and weapons
  godly aura with galaxy-like particle effects
  ethereal wings or cosmic backpiece
  everything in motion: floating cloth, energy trails, orbiting elements

---

## Rarity Delta – pełny system

> **Zasada:** Każdy rarity DODAJE nowy element – nie tylko ulepsza stary.
> **Cel:** Różnice mają być WIDOCZNE gołym okiem – Common = podstawowy, Mythic = kosmiczny.

### Konwencja nazewnictwa
- {RASA}_{KLASA}_{RARITY} – np. HUMAN_WARRIOR_COMMON
- Każda rasa ma osobną tabelę, bo rasy mają inne cechy wizualne.

---

### WOJOWNIK (WARRIOR) – Dla każdej rasy

**HUMAN WARRIOR**
| Rarity | Zbroja | Tarcza | Broń | Dodatki | Efekty |
|--------|--------|--------|------|---------|--------|
| Common | Stalowa, proste płyty, skórzane paski | Gładka, niebieskie pole, płaski złoty lew | Prosty miecz, stalowy krzyżak | Niebieski tabard do kolan | Brak |
| Uncommon | Stalowa z cienką złotą obwódką na krawędziach | Złoty brzeg, lew wytłoczony (płytki relief) | Miecz ze złotym jelcem | Niebieska peleryna na ramionach | Brak |
| Rare | Srebrno-niebieska stal, runy na napierśniku | Złote rogi, wypukły relief lwa (3D) | Miecz z niebieskimi runami | Peleryna z herbem, złote frędzle | Subtelna niebieska aura |
| Epic | Złota z rubinami, filigranowe wzory | Złota z rubinami w rogach, 3D lew z rubinowymi oczami | Złoty miecz z rubinami w głowicy | Pełna peleryna ze złotym haftem | Wyraźna złota aura + iskry |
| Legendary | Niebiańska, złoto-biała, świecące żyły | Świecąca tarcza z anielskimi skrzydłami | Miecz ze światła, płonący | Skrzydła anielskie, korona światła | Mocna aura + wirujące runy + halo |
| Mythic | Kosmiczna z konstelacjami, żywe gwiazdy | Tarcza z galaktyką w środku | Miecz z czystej energii, zmieniający kształt | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ELF WARRIOR**
| Rarity | Zbroja | Tarcza | Broń | Dodatki | Efekty |
|--------|--------|--------|------|---------|--------|
| Common | Srebrna, smukła, liściaste wzory | Drewniana, zielony herb, złoty liść | Prosty elficki miecz, srebrny | Zielony płaszcz do kolan | Brak |
| Uncommon | Srebrna z zielonymi akcentami, więcej liści | Srebrne obrzeże, liściasty relief | Miecz z liściastym jelcem | Płaszcz z liściastym haftem | Brak |
| Rare | Srebrno-zielona, magiczne runy | Srebrna z zielonymi kamieniami, 3D drzewo | Miecz z zielonymi runami | Peleryna z magicznymi symbolami | Subtelna zielona aura |
| Epic | Złoto-zielona, perłowe akcenty | Złota z szmaragdami, 3D drzewo z liściem | Złoty miecz z szmaragdami | Peleryna z liściastego jedwabiu | Wyraźna zielona aura + iskry |
| Legendary | Niebiańska, złoto-biała, skrzydła motyla | Świecąca tarcza z motylimi skrzydłami | Miecz z czystego światła, motyle | Skrzydła motyla, korona z kwiatów | Mocna aura + wirujące runy + halo |
| Mythic | Kosmiczna z konstelacjami, galaktyczne runy | Tarcza z galaktyką w środku | Miecz z gwiezdnego pyłu | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ORC WARRIOR**
| Rarity | Zbroja | Tarcza | Broń | Dodatki | Efekty |
|--------|--------|--------|------|---------|--------|
| Common | Skórzana, kościane płyty, prosta | Drewniana z kościanym wzorem | Prosta siekiera, kamienna | Naszyjnik z zębów, irokez | Brak |
| Uncommon | Skóra + żelazo, czaszki na ramionach | Żelazna z czaszką, kościane kolce | Siekiera z żelaznym ostrzem | Więcej kości, większy irokez | Brak |
| Rare | Kościana z żelaznymi nitami, demoniczne runy | Żelazna z demonicznymi oczami | Siekiera z demonicznymi runami | Naszyjnik z czaszek, peleryna z futra | Subtelna czerwona aura |
| Epic | Kościana ze złotem, kryształy krwi | Złota z rubinami, 3D czaszka z rubinowymi oczami | Złota siekiera z rubinami | Futrzana peleryna ze złotem, wielki irokez | Wyraźna czerwona aura + iskry |
| Legendary | Demoniczna, płonąca, czaszki z ogniem | Płonąca tarcza z czaszką | Siekiera z ognia | Skrzydła cienia, korona z czaszek | Mocna aura + płomienie + halo ciemności |
| Mythic | Kosmiczna z konstelacjami, galaktyczne czaszki | Tarcza z galaktyką w środku | Siekiera z gwiezdnego pyłu | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DWARF WARRIOR**
| Rarity | Zbroja | Tarcza | Broń | Dodatki | Efekty |
|--------|--------|--------|------|---------|--------|
| Common | Miedziana, proste nity, skórzane paski | Drewniana z żelaznym obrzeżem | Prosty młot, żelazny | Broda, futrzana peleryna | Brak |
| Uncommon | Miedziana z mosiężnymi nitami | Żelazna z miedzianym wzorem | Młot z miedzianym jelcem | Broda z warkoczami, lepsza peleryna | Brak |
| Rare | Złota z granatowymi klejnotami | Złota z klejnotami, 3D klejnot | Młot z klejnotami w głowicy | Peleryna z futra smoka, złote warkocze | Subtelna złota aura |
| Epic | Złota z diamentami, filigranowe wzory | Złota z diamentami, 3D diament | Złoty młot z diamentami | Peleryna z futra smoka, klejnoty w brodzie | Wyraźna złota aura + iskry |
| Legendary | Niebiańska, złoto-biała, skrzydła z klejnotów | Świecąca tarcza z diamentowymi skrzydłami | Młot ze światła | Skrzydła z klejnotów, korona z diamentów | Mocna aura + wirujące runy + halo |
| Mythic | Kosmiczna z konstelacjami, galaktyczne klejnoty | Tarcza z galaktyką w środku | Młot z gwiezdnego pyłu | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DEMON WARRIOR**
| Rarity | Zbroja | Tarcza | Broń | Dodatki | Efekty |
|--------|--------|--------|------|---------|--------|
| Common | Czarny metal, proste kolce | Czarna z czerwonym wzorem | Prosty miecz, czarny | Małe rogi, ogon | Brak |
| Uncommon | Czarny metal z czerwonymi żyłami | Więcej kolców, czerwone oczy | Miecz z czerwonymi runami | Większe rogi, ogon z kolcem | Brak |
| Rare | Obsydian, czerwone runy | Obsydianowa z ognistymi oczami | Miecz z ognistymi runami | Rośnie rogi, płonący ogon | Subtelna czerwona aura |
| Epic | Ognista z kryształami | Ognista z kryształami, 3D demon | Ognisty miecz z kryształami | Skrzydła z ognia, korona z rogów | Wyraźna czerwona aura + płomienie |
| Legendary | Piekielna, płonąca, skrzydła z ognia | Płonąca tarcza z demonem | Miecz z piekielnego ognia | Płonące skrzydła, korona z ognia | Mocna aura + płomienie + halo |
| Mythic | Kosmiczna z konstelacjami, galaktyczne płomienie | Tarcza z galaktyką w środku | Miecz z gwiezdnego pyłu | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**CELESTIAL WARRIOR**
| Rarity | Zbroja | Tarcza | Broń | Dodatki | Efekty |
|--------|--------|--------|------|---------|--------|
| Common | Biały metal, złote akcenty | Biała ze złotym wzorem | Prosty miecz, biały | Subtelna aureola | Brak |
| Uncommon | Biały metal ze złotymi runami | Złote runy, biały kamień | Miecz ze złotymi runami | Jaśniejsza aureola | Brak |
| Rare | Złoto-biała, święte runy | Złota z białymi kamieniami, 3D gwiazda | Miecz ze świętymi runami | Małe skrzydła, aureola | Subtelna złota aura |
| Epic | Złota z diamentami, święte wzory | Złota z diamentami, 3D gwiazda | Złoty miecz z diamentami | Skrzydła światła, korona | Wyraźna złota aura + iskry |
| Legendary | Niebiańska, złoto-biała, skrzydła anielskie | Świecąca tarcza z anielskimi skrzydłami | Miecz ze światła | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Kosmiczna z konstelacjami, galaktyczne gwiazdy | Tarcza z galaktyką w środku | Miecz z gwiezdnego pyłu | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

---

### MAG (MAGE) – Dla każdej rasy

**HUMAN MAGE**
| Rarity | Szaty | Różdżka/Laska | Dodatki | Efekty |
|--------|-------|---------------|---------|--------|
| Common | Proste niebieskie szaty, skórzany pas | Drewniana laska, kryształ na szczycie | Kaptur | Brak |
| Uncommon | Szaty ze srebrnymi nićmi, lepszy krój | Laska ze srebrnym okuciem, większy kryształ | Kaptur ze złotym haftem | Subtelny błysk w krysztale |
| Rare | Szaty z magicznymi runami, srebrne nici | Laska z niebieskimi runami, kryształ z runami | Półpłaszcz z runami, magiczny pas | Subtelna niebieska aura wokół laski |
| Epic | Złote szaty z rubinami, filigranowe wzory | Złota laska z rubinami, płonący kryształ | Pełny płaszcz z rubinami, złota korona | Wyraźna niebieska aura + iskry |
| Legendary | Niebiańskie szaty, złoto-białe, świecące runy | Laska ze światła, kryształ z energią | Skrzydła anielskie, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Kosmiczne szaty z konstelacjami, galaktyczne nici | Laska z gwiezdnego pyłu, galaktyczny kryształ | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ELF MAGE**
| Rarity | Szaty | Różdżka/Laska | Dodatki | Efekty |
|--------|-------|---------------|---------|--------|
| Common | Proste zielone szaty, liściaste wzory | Drewniana laska z liśćmi | Kaptur z liśćmi | Brak |
| Uncommon | Szaty ze srebrnymi nićmi, więcej liści | Laska ze srebrnym okuciem, liściasty kryształ | Kaptur z liściastym haftem | Subtelny zielony błysk |
| Rare | Szaty z magicznymi runami, srebrne nici | Laska z zielonymi runami, kryształ z runami | Półpłaszcz z liśćmi, magiczny pas | Subtelna zielona aura |
| Epic | Złoto-zielone szaty z szmaragdami | Złota laska z szmaragdami, kryształ z energią | Pełny płaszcz z liści, korona z kwiatów | Wyraźna zielona aura + iskry |
| Legendary | Niebiańskie szaty, złoto-białe, motyle | Laska ze światła, motyl kryształ | Skrzydła motyla, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Kosmiczne szaty z konstelacjami, galaktyczne nici | Laska z gwiezdnego pyłu, galaktyczny kryształ | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ORC MAGE (SHAMAN)**
| Rarity | Szaty | Różdżka/Laska | Dodatki | Efekty |
|--------|-------|---------------|---------|--------|
| Common | Skórzane, kościane amulety | Drewniana laska z czaszką | Naszyjnik z zębów, irokez | Brak |
| Uncommon | Skóra + futro, więcej kości | Laska z kościanym okuciem, większa czaszka | Więcej kości, większy irokez | Subtelny duchowy błysk |
| Rare | Szaty z demonicznymi runami, futro | Laska z demonicznymi runami, czaszka z runami | Półpłaszcz z futra, naszyjnik z czaszek | Subtelna czerwona aura |
| Epic | Złoto-czerwone szaty z kryształami | Złota laska z rubinami, płonąca czaszka | Pełny płaszcz z futra, korona z kości | Wyraźna czerwona aura + iskry |
| Legendary | Demoniczne szaty, płonące runy | Laska z ognia, płonąca czaszka | Skrzydła cienia, korona z czaszek | Mocna aura + płomienie + halo |
| Mythic | Kosmiczne szaty z konstelacjami, galaktyczne runy | Laska z gwiezdnego pyłu, galaktyczna czaszka | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DWARF MAGE**
| Rarity | Szaty | Różdżka/Laska | Dodatki | Efekty |
|--------|-------|---------------|---------|--------|
| Common | Granatowe szaty, skórzany pas | Drewniana laska z miedzianym okuciem | Broda, futrzana peleryna | Brak |
| Uncommon | Szaty ze złotymi nićmi, więcej detali | Laska ze złotym okuciem, klejnot w głowicy | Broda z warkoczami, lepsza peleryna | Subtelny złoty błysk |
| Rare | Szaty z magicznymi runami, złote nici | Laska z klejnotami, runy na lasce | Półpłaszcz z futra smoka, złote warkocze | Subtelna złota aura |
| Epic | Złote szaty z diamentami, filigranowe wzory | Złota laska z diamentami, klejnot z energią | Pełny płaszcz z futra smoka, korona z klejnotów | Wyraźna złota aura + iskry |
| Legendary | Niebiańskie szaty, złoto-białe, klejnoty | Laska ze światła, diamentowy kryształ | Skrzydła z klejnotów, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Kosmiczne szaty z konstelacjami, galaktyczne klejnoty | Laska z gwiezdnego pyłu, galaktyczny kryształ | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DEMON MAGE**
| Rarity | Szaty | Różdżka/Laska | Dodatki | Efekty |
|--------|-------|---------------|---------|--------|
| Common | Czarne szaty, czerwone akcenty | Laska z obsydianu, czerwony kryształ | Małe rogi, ogon | Brak |
| Uncommon | Szaty z czerwonymi runami, więcej akcentów | Laska z czerwonymi runami, większy kryształ | Większe rogi, ogon z kolcem | Subtelny czerwony błysk |
| Rare | Szaty z demonicznymi runami, ogniste nici | Laska z ognistymi runami, kryształ z ogniem | Półpłaszcz z ognia, rośnie rogi | Subtelna czerwona aura |
| Epic | Ogniste szaty z kryształami, filigranowe wzory | Ognista laska z kryształami, płonący kryształ | Skrzydła z ognia, korona z rogów | Wyraźna czerwona aura + płomienie |
| Legendary | Piekielne szaty, płonące runy | Laska z piekielnego ognia, płonący kryształ | Płonące skrzydła, korona z ognia | Mocna aura + płomienie + halo |
| Mythic | Kosmiczne szaty z konstelacjami, galaktyczne płomienie | Laska z gwiezdnego pyłu, galaktyczny kryształ | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**CELESTIAL MAGE**
| Rarity | Szaty | Różdżka/Laska | Dodatki | Efekty |
|--------|-------|---------------|---------|--------|
| Common | Białe szaty, złote akcenty | Biała laska, złoty kryształ | Subtelna aureola | Brak |
| Uncommon | Szaty ze złotymi runami, więcej akcentów | Laska ze złotymi runami, większy kryształ | Jaśniejsza aureola | Subtelny złoty błysk |
| Rare | Szaty ze świętymi runami, złote nici | Laska ze świętymi runami, kryształ z runami | Półpłaszcz ze światła, małe skrzydła | Subtelna złota aura |
| Epic | Złote szaty z diamentami, święte wzory | Złota laska z diamentami, kryształ z energią | Skrzydła światła, aureola | Wyraźna złota aura + iskry |
| Legendary | Niebiańskie szaty, złoto-białe, anielskie | Laska ze światła, anielski kryształ | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Kosmiczne szaty z konstelacjami, galaktyczne gwiazdy | Laska z gwiezdnego pyłu, galaktyczny kryształ | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

---

### TANK – pełne tabele dla wszystkich ras

**HUMAN TANK**
| Rarity | Tarcza | Zbroja | Dodatki | Efekty |
|--------|--------|--------|---------|--------|
| Common | Duża, drewniana, żelazne obręcze | Gruba stal, proste płyty | Brak | Brak |
| Uncommon | Większa, stalowa, złoty brzeg | Grubsza stal, złote nity | Peleryna na ramionach | Brak |
| Rare | Stalowa z runami, 3D lew | Srebrno-niebieska, runy | Półpłaszcz, hełm z grzywą | Subtelna niebieska aura |
| Epic | Złota z rubinami, 3D lew | Złota z rubinami, filigran | Pełny płaszcz, hełm z koroną | Wyraźna złota aura + iskry |
| Legendary | Świecąca, anielskie skrzydła | Niebiańska, złoto-biała | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Galaktyczna, wszechświat w środku | Kosmiczna, konstelacje | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ELF TANK**
| Rarity | Tarcza | Zbroja | Dodatki | Efekty |
|--------|--------|--------|---------|--------|
| Common | Drewniana, liściaste wzory | Srebrna, smukła, liściaste płyty | Brak | Brak |
| Uncommon | Srebrne obrzeże, liściasty relief | Srebrna z zielonymi akcentami | Liściasta peleryna | Brak |
| Rare | Srebrna z zielonymi kamieniami, 3D drzewo | Srebrno-zielona, magiczne runy | Półpłaszcz z liśćmi, hełm z liśćmi | Subtelna zielona aura |
| Epic | Złota z szmaragdami, 3D drzewo | Złoto-zielona, perłowe akcenty | Peleryna z liściastego jedwabiu, korona z kwiatów | Wyraźna zielona aura + iskry |
| Legendary | Świecąca z motylimi skrzydłami | Niebiańska, złoto-biała | Skrzydła motyla, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Galaktyczna, wszechświat w środku | Kosmiczna, konstelacje | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ORC TANK**
| Rarity | Tarcza | Zbroja | Dodatki | Efekty |
|--------|--------|--------|---------|--------|
| Common | Drewniana, kościany wzór | Skóra + kościane płyty | Naszyjnik z zębów | Brak |
| Uncommon | Żelazna z czaszką, kościane kolce | Skóra + żelazo, czaszki na ramionach | Więcej kości, irokez | Brak |
| Rare | Żelazna z demonicznymi oczami | Kościana z żelaznymi nitami | Naszyjnik z czaszek, futrzana peleryna | Subtelna czerwona aura |
| Epic | Złota z rubinami, 3D czaszka | Kościana ze złotem, kryształy krwi | Futrzana peleryna ze złotem, wielki irokez | Wyraźna czerwona aura + iskry |
| Legendary | Płonąca, czaszka z ogniem | Demoniczna, płonąca, czaszki | Skrzydła cienia, korona z czaszek | Mocna aura + płomienie + halo |
| Mythic | Galaktyczna, wszechświat w środku | Kosmiczna, konstelacje | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DWARF TANK**
| Rarity | Tarcza | Zbroja | Dodatki | Efekty |
|--------|--------|--------|---------|--------|
| Common | Drewniana, żelazne obręcze | Miedziana, proste nity | Broda, futrzana peleryna | Brak |
| Uncommon | Żelazna z miedzianym wzorem | Miedziana z mosiężnymi nitami | Broda z warkoczami | Brak |
| Rare | Złota z granatowymi klejnotami | Złota z granatowymi klejnotami | Peleryna z futra smoka, złote warkocze | Subtelna złota aura |
| Epic | Złota z diamentami, 3D klejnot | Złota z diamentami, filigran | Peleryna z futra smoka, klejnoty w brodzie | Wyraźna złota aura + iskry |
| Legendary | Świecąca z diamentowymi skrzydłami | Niebiańska, złoto-biała | Skrzydła z klejnotów, korona z diamentów | Mocna aura + wirujące runy + halo |
| Mythic | Galaktyczna, wszechświat w środku | Kosmiczna, konstelacje | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DEMON TANK**
| Rarity | Tarcza | Zbroja | Dodatki | Efekty |
|--------|--------|--------|---------|--------|
| Common | Czarna, czerwony wzór | Czarny metal, kolce | Małe rogi | Brak |
| Uncommon | Więcej kolców, czerwone oczy | Czarny metal z czerwonymi żyłami | Większe rogi, ogon | Brak |
| Rare | Obsydianowa z ognistymi oczami | Obsydian, czerwone runy | Rośnie rogi, płonący ogon | Subtelna czerwona aura |
| Epic | Ognista z kryształami, 3D demon | Ognista z kryształami | Skrzydła z ognia, korona z rogów | Wyraźna czerwona aura + płomienie |
| Legendary | Płonąca z demonem | Piekielna, płonąca | Płonące skrzydła, korona z ognia | Mocna aura + płomienie + halo |
| Mythic | Galaktyczna, wszechświat w środku | Kosmiczna, konstelacje | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**CELESTIAL TANK**
| Rarity | Tarcza | Zbroja | Dodatki | Efekty |
|--------|--------|--------|---------|--------|
| Common | Biała, złoty wzór | Biały metal, złote akcenty | Subtelna aureola | Brak |
| Uncommon | Złote runy, biały kamień | Biały metal ze złotymi runami | Jaśniejsza aureola | Brak |
| Rare | Złota z białymi kamieniami, 3D gwiazda | Złoto-biała, święte runy | Małe skrzydła, aureola | Subtelna złota aura |
| Epic | Złota z diamentami, 3D gwiazda | Złota z diamentami, święte wzory | Skrzydła światła, korona | Wyraźna złota aura + iskry |
| Legendary | Świecąca z anielskimi skrzydłami | Niebiańska, złoto-biała | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Galaktyczna, wszechświat w środku | Kosmiczna, konstelacje | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

---

### HEALER – pełne tabele dla wszystkich ras

**HUMAN HEALER**
| Rarity | Laska | Szaty | Dodatki | Efekty |
|--------|-------|-------|---------|--------|
| Common | Drewniana, prosty kryształ | Proste białe szaty | Brak | Brak |
| Uncommon | Srebrne okucie, lepszy kryształ | Szaty ze srebrnymi nićmi | Kaptur z haftem | Subtelny złoty błysk |
| Rare | Runy, świecący kryształ | Szaty z runami, srebrne nici | Półpłaszcz, złoty pas | Subtelna złota aura |
| Epic | Złota z rubinami, płonący kryształ | Złote szaty z rubinami | Pełny płaszcz, złota korona | Wyraźna złota aura + iskry |
| Legendary | Ze światła, anielski kryształ | Niebiańskie szaty | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Z gwiezdnego pyłu | Kosmiczne szaty | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ELF HEALER**
| Rarity | Laska | Szaty | Dodatki | Efekty |
|--------|-------|-------|---------|--------|
| Common | Drewniana z liśćmi | Proste zielone szaty | Kaptur z liśćmi | Brak |
| Uncommon | Srebrne okucie, liściasty kryształ | Szaty ze srebrnymi nićmi | Liściasty kaptur | Subtelny zielony błysk |
| Rare | Runy, świecący kryształ | Szaty z runami, srebrne nici | Półpłaszcz z liśćmi, magiczny pas | Subtelna zielona aura |
| Epic | Złota z szmaragdami | Złoto-zielone szaty | Peleryna z liściastego jedwabiu, korona z kwiatów | Wyraźna zielona aura + iskry |
| Legendary | Ze światła, motyl kryształ | Niebiańskie szaty | Skrzydła motyla, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Z gwiezdnego pyłu | Kosmiczne szaty | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**DWARF HEALER**
| Rarity | Laska | Szaty | Dodatki | Efekty |
|--------|-------|-------|---------|--------|
| Common | Drewniana, miedziane okucie | Granatowe szaty | Broda | Brak |
| Uncommon | Złote okucie, klejnot | Szaty ze złotymi nićmi | Broda z warkoczami | Subtelny złoty błysk |
| Rare | Runy, świecący kryształ | Szaty z runami, złote nici | Półpłaszcz z futra smoka | Subtelna złota aura |
| Epic | Złota z diamentami | Złote szaty z diamentami | Pełny płaszcz z futra smoka, korona z klejnotów | Wyraźna złota aura + iskry |
| Legendary | Ze światła, diamentowy kryształ | Niebiańskie szaty | Skrzydła z klejnotów, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Z gwiezdnego pyłu | Kosmiczne szaty | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DEMON HEALER**
| Rarity | Laska | Szaty | Dodatki | Efekty |
|--------|-------|-------|---------|--------|
| Common | Obsydian, czerwony kryształ | Czarne szaty | Małe rogi | Brak |
| Uncommon | Czerwone runy | Szaty z czerwonymi runami | Większe rogi | Subtelny czerwony błysk |
| Rare | Ogniste runy, płonący kryształ | Szaty z demonicznymi runami | Półpłaszcz z ognia | Subtelna czerwona aura |
| Epic | Kryształy, płonący kryształ | Ogniste szaty z kryształami | Skrzydła z ognia, korona z rogów | Wyraźna czerwona aura + płomienie |
| Legendary | Z piekielnego ognia | Piekielne szaty | Płonące skrzydła, korona z ognia | Mocna aura + płomienie + halo |
| Mythic | Z gwiezdnego pyłu | Kosmiczne szaty | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**CELESTIAL HEALER**
| Rarity | Laska | Szaty | Dodatki | Efekty |
|--------|-------|-------|---------|--------|
| Common | Biała, złoty kryształ | Białe szaty | Subtelna aureola | Brak |
| Uncommon | Złote runy | Szaty ze złotymi runami | Jaśniejsza aureola | Subtelny złoty błysk |
| Rare | Święte runy, świecący kryształ | Szaty ze świętymi runami | Półpłaszcz ze światła, małe skrzydła | Subtelna złota aura |
| Epic | Złota z diamentami | Złote szaty z diamentami | Skrzydła światła, aureola | Wyraźna złota aura + iskry |
| Legendary | Ze światła, anielski kryształ | Niebiańskie szaty | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Z gwiezdnego pyłu | Kosmiczne szaty | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

---

### RANGER – pełne tabele dla wszystkich ras

**HUMAN RANGER**
| Rarity | Łuk | Zbroja | Dodatki | Efekty |
|--------|-----|--------|---------|--------|
| Common | Prosty drewniany łuk | Skórzana, prosta | Kaptur, płaszcz | Brak |
| Uncommon | Łuk z wzmocnieniami | Skóra + metal | Lepszy kaptur | Brak |
| Rare | Łuk z runami | Skóra + srebro, runy | Półpłaszcz, zwierzęcy towarzysz | Subtelna zielona aura |
| Epic | Złoty łuk z rubinami | Złota z rubinami | Pełny płaszcz, zwierzęcy towarzysz | Wyraźna zielona aura + iskry |
| Legendary | Łuk ze światła | Niebiańska | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Łuk z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ELF RANGER**
| Rarity | Łuk | Zbroja | Dodatki | Efekty |
|--------|-----|--------|---------|--------|
| Common | Drewniany, liściaste wzory | Skórzana, liściaste wzory | Kaptur z liśćmi | Brak |
| Uncommon | Łuk z wzmocnieniami | Skóra + srebro | Lepszy kaptur | Brak |
| Rare | Łuk z runami | Skóra + srebro, runy | Półpłaszcz, zwierzęcy towarzysz | Subtelna zielona aura |
| Epic | Złoty z szmaragdami | Złoto-zielona | Pełny płaszcz, zwierzęcy towarzysz | Wyraźna zielona aura + iskry |
| Legendary | Łuk ze światła | Niebiańska | Skrzydła motyla, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Łuk z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**DWARF RANGER**
| Rarity | Łuk | Zbroja | Dodatki | Efekty |
|--------|-----|--------|---------|--------|
| Common | Drewniany, miedziane okucie | Skórzana, prosta | Broda, futrzana peleryna | Brak |
| Uncommon | Łuk z wzmocnieniami | Skóra + miedź | Lepsza peleryna | Brak |
| Rare | Łuk z runami | Skóra + złoto, runy | Półpłaszcz, zwierzęcy towarzysz | Subtelna złota aura |
| Epic | Złoty z diamentami | Złota z diamentami | Pełny płaszcz, zwierzęcy towarzysz | Wyraźna złota aura + iskry |
| Legendary | Łuk ze światła | Niebiańska | Skrzydła z klejnotów, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Łuk z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DEMON RANGER**
| Rarity | Łuk | Zbroja | Dodatki | Efekty |
|--------|-----|--------|---------|--------|
| Common | Czarny, prosty | Skórzana, ciemna | Małe rogi | Brak |
| Uncommon | Łuk z czerwonymi runami | Skóra + metal | Większe rogi | Brak |
| Rare | Łuk z demonicznymi runami | Skóra + obsydian, runy | Półpłaszcz, zwierzęcy towarzysz | Subtelna czerwona aura |
| Epic | Ognisty z kryształami | Ognista z kryształami | Pełny płaszcz, zwierzęcy towarzysz | Wyraźna czerwona aura + płomienie |
| Legendary | Łuk z ognia | Piekielna | Płonące skrzydła, korona z rogów | Mocna aura + płomienie + halo |
| Mythic | Łuk z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**CELESTIAL RANGER**
| Rarity | Łuk | Zbroja | Dodatki | Efekty |
|--------|-----|--------|---------|--------|
| Common | Biały, złote akcenty | Skórzana, biała | Subtelna aureola | Brak |
| Uncommon | Łuk ze złotymi runami | Skóra + złoto | Jaśniejsza aureola | Brak |
| Rare | Łuk ze świętymi runami | Skóra + złoto, runy | Półpłaszcz, zwierzęcy towarzysz | Subtelna złota aura |
| Epic | Złoty z diamentami | Złota z diamentami | Pełny płaszcz, zwierzęcy towarzysz | Wyraźna złota aura + iskry |
| Legendary | Łuk ze światła | Niebiańska | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Łuk z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

---

### ASSASSIN – pełne tabele dla wszystkich ras

**HUMAN ASSASSIN**
| Rarity | Sztylety | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Proste sztylety | Skórzana, ciemna | Kaptur, maska | Brak |
| Uncommon | Sztylety ze złotym jelcem | Skóra + metal | Lepszy kaptur, peleryna | Brak |
| Rare | Sztylety z runami | Skóra + srebro, runy | Półpłaszcz, podwójny kaptur | Subtelna ciemna aura |
| Epic | Złote sztylety z rubinami | Złota z rubinami | Pełny płaszcz, maska z klejnotami | Wyraźna ciemna aura + iskry |
| Legendary | Sztylety ze światła | Niebiańska | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Sztylety z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ELF ASSASSIN**
| Rarity | Sztylety | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Proste sztylety | Skórzana, zielona | Kaptur z liśćmi | Brak |
| Uncommon | Sztylety ze srebrnym jelcem | Skóra + srebro | Lepszy kaptur | Brak |
| Rare | Sztylety z runami | Skóra + srebro, runy | Półpłaszcz, podwójny kaptur | Subtelna zielona aura |
| Epic | Złote sztylety z szmaragdami | Złoto-zielona | Pełny płaszcz, maska z liśćmi | Wyraźna zielona aura + iskry |
| Legendary | Sztylety ze światła | Niebiańska | Skrzydła motyla, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Sztylety z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**DWARF ASSASSIN**
| Rarity | Sztylety | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Proste sztylety | Skórzana, granatowa | Broda, futrzana peleryna | Brak |
| Uncommon | Sztylety ze złotym jelcem | Skóra + miedź | Broda z warkoczami | Brak |
| Rare | Sztylety z runami | Skóra + złoto, runy | Półpłaszcz, podwójny kaptur | Subtelna złota aura |
| Epic | Złote sztylety z diamentami | Złota z diamentami | Pełny płaszcz, maska z klejnotami | Wyraźna złota aura + iskry |
| Legendary | Sztylety ze światła | Niebiańska | Skrzydła z klejnotów, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Sztylety z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DEMON ASSASSIN**
| Rarity | Sztylety | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Proste sztylety | Skórzana, czarna | Małe rogi | Brak |
| Uncommon | Sztylety z czerwonym jelcem | Skóra + metal | Większe rogi | Brak |
| Rare | Sztylety z runami | Skóra + obsydian, runy | Półpłaszcz, podwójny kaptur | Subtelna czerwona aura |
| Epic | Ogniste sztylety z kryształami | Ognista z kryształami | Pełny płaszcz, maska z kryształami | Wyraźna czerwona aura + płomienie |
| Legendary | Sztylety z ognia | Piekielna | Płonące skrzydła, korona z rogów | Mocna aura + płomienie + halo |
| Mythic | Sztylety z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**CELESTIAL ASSASSIN**
| Rarity | Sztylety | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Proste sztylety | Skórzana, biała | Subtelna aureola | Brak |
| Uncommon | Sztylety ze złotym jelcem | Skóra + złoto | Jaśniejsza aureola | Brak |
| Rare | Sztylety z runami | Skóra + złoto, runy | Półpłaszcz, podwójny kaptur | Subtelna złota aura |
| Epic | Złote sztylety z diamentami | Złota z diamentami | Pełny płaszcz, maska z klejnotami | Wyraźna złota aura + iskry |
| Legendary | Sztylety ze światła | Niebiańska | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Sztylety z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

---

### SUPPORT – pełne tabele dla wszystkich ras

**HUMAN SUPPORT**
| Rarity | Artefakt | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Prosty artefakt | Lekka, prosta | Brak | Brak |
| Uncommon | Artefakt ze srebrem | Lepsza zbroja | Peleryna na ramionach | Brak |
| Rare | Artefakt z runami | Zbroja z runami | Półpłaszcz | Subtelna złota aura |
| Epic | Złoty artefakt z rubinami | Złota z rubinami | Pełny płaszcz, złota korona | Wyraźna złota aura + iskry |
| Legendary | Artefakt ze światła | Niebiańska | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Artefakt z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ELF SUPPORT**
| Rarity | Artefakt | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Prosty artefakt | Lekka, zielona | Kaptur z liśćmi | Brak |
| Uncommon | Artefakt ze srebrem | Lepsza zbroja | Peleryna z liśćmi | Brak |
| Rare | Artefakt z runami | Zbroja z runami | Półpłaszcz | Subtelna zielona aura |
| Epic | Złoty artefakt z szmaragdami | Złoto-zielona | Pełny płaszcz, korona z kwiatów | Wyraźna zielona aura + iskry |
| Legendary | Artefakt ze światła | Niebiańska | Skrzydła motyla, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Artefakt z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

**ORC SUPPORT**
| Rarity | Artefakt | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Prosty artefakt | Skórzana, kościane płyty | Naszyjnik z zębów | Brak |
| Uncommon | Artefakt z kością | Skóra + żelazo | Więcej kości | Brak |
| Rare | Artefakt z runami | Zbroja z runami | Półpłaszcz z futra | Subtelna czerwona aura |
| Epic | Złoty artefakt z rubinami | Złota z rubinami | Pełny płaszcz, wielki irokez | Wyraźna czerwona aura + iskry |
| Legendary | Artefakt z ognia | Piekielna | Płonące skrzydła, korona z czaszek | Mocna aura + płomienie + halo |
| Mythic | Artefakt z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DWARF SUPPORT**
| Rarity | Artefakt | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Prosty artefakt | Lekka, miedziana | Broda | Brak |
| Uncommon | Artefakt ze złotem | Lepsza zbroja | Broda z warkoczami | Brak |
| Rare | Artefakt z runami | Zbroja z runami | Półpłaszcz z futra smoka | Subtelna złota aura |
| Epic | Złoty artefakt z diamentami | Złota z diamentami | Pełny płaszcz, korona z klejnotów | Wyraźna złota aura + iskry |
| Legendary | Artefakt ze światła | Niebiańska | Skrzydła z klejnotów, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Artefakt z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**DEMON SUPPORT**
| Rarity | Artefakt | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Prosty artefakt | Lekka, czarna | Małe rogi | Brak |
| Uncommon | Artefakt z czerwonymi runami | Lepsza zbroja | Większe rogi | Brak |
| Rare | Artefakt z runami | Zbroja z runami | Półpłaszcz z ognia | Subtelna czerwona aura |
| Epic | Ognisty artefakt z kryształami | Ognista z kryształami | Pełny płaszcz, korona z rogów | Wyraźna czerwona aura + płomienie |
| Legendary | Artefakt z ognia | Piekielna | Płonące skrzydła, korona z ognia | Mocna aura + płomienie + halo |
| Mythic | Artefakt z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z galaktyk | Galaktyczna aura + wirujące wszechświaty |

**CELESTIAL SUPPORT**
| Rarity | Artefakt | Zbroja | Dodatki | Efekty |
|--------|----------|--------|---------|--------|
| Common | Prosty artefakt | Lekka, biała | Subtelna aureola | Brak |
| Uncommon | Artefakt ze złotem | Lepsza zbroja | Jaśniejsza aureola | Brak |
| Rare | Artefakt z runami | Zbroja z runami | Półpłaszcz ze światła | Subtelna złota aura |
| Epic | Złoty artefakt z diamentami | Złota z diamentami | Pełny płaszcz, aureola | Wyraźna złota aura + iskry |
| Legendary | Artefakt ze światła | Niebiańska | Anielskie skrzydła, aureola | Mocna aura + wirujące runy + halo |
| Mythic | Artefakt z gwiezdnego pyłu | Kosmiczna | Eteryczne skrzydła, korona z gwiazd | Galaktyczna aura + wirujące wszechświaty |

---

### Orc-specific class deltas

**BERSERKER (zamiast Assassin)**
| Rarity | Delta |
|--------|-------|
| Common | reinforced hide armor with bone spikes, improved twin axes, additional skull trophies |
| Uncommon | enhanced iron-studded leather with metal plates, sharpened twin axes with carved handles, fur shoulder cape |
| Rare | enchanted blood-forged armor with war paint, enchanted twin axes with fire glow, half-cloak of beast fur, soft rage aura |
| Epic | ornate spike armor with gold and rubies, legendary twin axes with flame edge, full beast cloak, moderate rage aura with sparks, glowing red eyes |
| Legendary | celestial war armor of light and fury, divine twin axes of the berserker, flowing enchanted beast cloak, strong rage aura, halo of battle fire |
| Mythic | mythic cosmic warplate with constellation scars, galaxy-forged twin axes with living rage, godly battle aura, ethereal wings of fury |

**SHAMAN (zamiast Healer)**
| Rarity | Delta |
|--------|-------|
| Common | improved ritual hide robes, wooden totem with feathers, simple bone necklace |
| Uncommon | enhanced ceremonial robes with animal motifs, iron-banded totem with spirit gem, animal skull headdress |
| Rare | enchanted spirit-weave robes with ghostly patterns, enchanted totem with elemental spirits, half-cloak of spirit world, soft spectral aura |
| Epic | ornate bone and spirit armor with gold, legendary totem with ancestral spirits, full spirit cloak, moderate elemental aura, glowing spirit eyes |
| Legendary | celestial spirit armor of the ancestors, divine totem of elements, flowing spectral cloak, strong elemental aura, halo of spirit fire |
| Mythic | mythic cosmic spiritplate with constellation spirits, galaxy totem of all elements, godly spirit aura, ethereal ancestor spirits |

**HUNTER (zamiast Ranger)**
| Rarity | Delta |
|--------|-------|
| Common | improved hide armor with beast fur, well-crafted spear, simple bone carving charm |
| Uncommon | enhanced leather and fur armor with claw trophies, iron-tipped spear with carved haft, beast pelt cloak |
| Rare | enchanted beast-hide armor with spirit marks, enchanted spear with elemental tip, half-cloak of shadowmaw fur, soft predator aura |
| Epic | ornate beastlord armor with gold claws, legendary spear with living beast core, full beast pelt cloak, moderate predator aura, glowing animal eyes |
| Legendary | celestial beast armor of the alpha, divine spear of the great hunt, flowing spectral beast cloak, strong beast aura, halo of animal spirits |
| Mythic | mythic cosmic hunter plate with constellation beasts, galaxy spear of the eternal hunt, godly predator aura, ethereal spirit animals |

---

## BOSS Rarity Progression

Bossowie mają rarity (Common → Mythic), które wpływają na skalę, detale i aurę.

| Rarity | Skala | Detale | Aura |
|--------|-------|--------|------|
| Common | 80% kadru | Podstawowe detale | Brak |
| Uncommon | 85% kadru | Więcej detali | Subtelna |
| Rare | 85% kadru | Dodatkowe elementy | Słaba |
| Epic | 90% kadru | Bogate detale, świecące oczy | Wyraźna + iskry |
| Legendary | 95% kadru | Bardzo bogate detale, korona | Silna + cząsteczki |
| Mythic | 95% kadru | Kosmiczne detale | Galaktyczna |

### Przykład – Smok (Fire Dragon)

| Rarity | Delta (dodaj do promptu BASE) |
|--------|------------------------------|
| Common | basic scales, small horns, no aura |
| Uncommon | more scales, larger horns, subtle smoke |
| Rare | fiery veins in scales, spikes, weak fire aura |
| Epic | crystal scales, burning eyes, flames + sparks |
| Legendary | wings with lava, crown of fire, strong fire + particles |
| Mythic | cosmic scales, galaxy eyes, galactic flames |

---

## Golden Rules for Text-to-Image (when no Image Guidance available)

These rules apply when generating assets in tools LIKE Bing, Dezgo, or Playground WITHOUT a reference image.

### Background
- **NEVER use "transparent background"** – it confuses the model.
- **ALWAYS use:** `solid flat medium-grey background #808080, no ground shadows, no drop shadows`
- Remove background later in post-processing (rembg, Photoshop).

### Composition
- **Force full body:** `feet touching the absolute bottom edge of the frame`
- **Prevent cropping:** Add to negative prompt: `cropped, cut off, missing feet, missing head, portrait, close-up, half body`

### Style Anchor
- **Use a strong visual anchor:** `clean clay-like shading, similar to Heroes of Might and Magic 3 but in 3D`
- This replaces vague terms like "stylized fantasy 3D render" which give the model too much freedom.

### Prompt Structure (Attention Priority)
Models read **first** and **last** words most carefully. Put:
1. **First 10 words:** Composition + full body guarantee
2. **Middle:** Equipment details, colors, materials
3. **Last 10 words:** Style anchor + lighting

### Negative Prompt – Must-Haves
Add these to EVERY negative prompt:

cropped, cut off, missing feet, missing head, portrait, close-up, half body, ground shadows, drop shadows, transparent background, holding shield on back, anime, photorealistic, gritty, dirty, rusted, glowing, magical, text, watermark, multiple characters


### When to Use This
- **Use this format** when generating in tools WITHOUT Image Guidance (Bing, Dezgo, Playground, freegen.app)
- **Use the original format** (with transparent background, no style anchor) when generating in Leonardo.ai WITH Image Guidance

---

## CHARACTER CONSISTENCY RULES

For rarity progression of the same hero:

Preserve:
- face identity
- hairstyle
- age range
- body proportions
- class silhouette
- faction identity

Upgrade only:
- armor complexity
- heraldry richness
- material quality
- equipment prestige

---

POSE DEFINITIONS

idle:
neutral stance

attack:
mid-swing,
dynamic motion

hit:
staggered,
reacting to impact

---

OUTPUT TEMPLATE

Stylized fantasy 3D render of a {rarity} {faction} {class},
{equipment description},
{pose description},
soft studio lighting,
warm key light,
cool fill light,
subtle rim light,
transparent background,
centered composition,
clean silhouette,
high readability,
mobile RPG game asset,
high detail,
4k quality,
fantasy collectible character.

Negative prompt:

low quality,
blurry,
watermark,
text,
logo,
multiple characters,
cropped,
extra limbs,
anime,
photorealistic,
pixel art

---

## PORTRAIT / DIALOGUE PROMPT TEMPLATE

For story scenes, tutorials, and dialogue portraits where characters show emotion.

**INPUT:**

Faction:
{faction}

Class:
{class}

Rarity:
{rarity}

Emotion:
{emotion}

**EMOTIONS LIST:**

| Emotion | Description | Pose Hint | Type |
|---------|-------------|-----------|------|
| Neutral | Default, calm expression | Standing straight, hands relaxed | General |
| Happy | Smiling, warm expression | Slight head tilt, open gesture | General |
| Sad | Downcast eyes, solemn | Looking down, lowered shoulders | General |
| Angry | Frowning, intense glare | Lean forward, clenched fist | General |
| Surprised | Eyes wide, mouth slightly open | Step back, hands raised | General |
| Scared | Fearful expression, defensive | Guarded pose, visible tension | General |
| Serious | Focused, determined | Strong stance, hand on weapon | General |
| Laughing | Joyful, head back | Open mouth, relaxed posture | General |
| Suspicious | Squinted eyes, skeptical | Tilted head, arms crossed | General |
| Shocked | Extreme surprise | Recoiling, hands to face | General |
| Confused | Tilted head, furrowed brow | One hand raised, questioning | General |
| Tired | Exhausted, heavy eyes | Slumped posture, hand on forehead | General |
| Scheming | Smirk, sly look | Half-closed eyes, subtle gesture | General |
| Heroic | Proud, inspiring | Chest out, weapon raised | General |
| Menacing | Threatening, dark | Looming posture, glowing eyes | General |
| Determined | Determined, resolute | Set jaw, focused eyes, ready stance | General |
| Victorious | Triumphant, post-victory | Raised fist, proud smile, glowing confidence | General |
| Defeated | Beaten, post-defeat | Head down, slumped shoulders, empty gaze | General |
| Wounded | Injured, weakened | Clutching wound, strained expression, blood visible | General |
| Exhausted | At the limit, drained | Hollow eyes, limp posture, barely standing | General |
| Pain | In pain, taking hit | Grimacing, recoiling from impact, sharp reaction | General |
| Mind Controlled | Manipulated, not themselves | Blank expression, glowing eyes, magical aura | Special |
| Sick | Ill, weak | Pale complexion, feverish look, sweating | Special |
| Poisoned | Poisoned | Green/purple tint, sickly grimace | Special |
| Frozen | Frozen solid | Ice crystals, blue tint, shivering | Special |
| Stoned | Petrified | Grey stone texture, rigid pose, cracked skin | Special |
| Burned | Burnt, scorched | Soot/ash on skin, red burned patches | Special |
| Charmed | Enchanted, smitten | Dreamy expression, rosy cheeks, dazed smile | Special |
| Cursed | Dark magic afflicted | Dark purple aura, shadowy veins, sinister glow | Special |
| Blessed | Holy power | Golden glow, serene expression, warm light | Special |
| Berserk | Battle fury | Wild eyes, clenched teeth, veins bulging, animalistic rage | Special |

**OUTPUT TEMPLATE:**

Fantasy 3D render portrait of a {emotion} {faction} {class}, {rarity} quality, {emotion_description}, half-body shot, {pose_hint}, soft studio lighting, warm key light, detailed fantasy armor with faction motif ({faction_motif}), transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**EXAMPLE (Human Warrior, Happy):**

Fantasy 3D render portrait of a happy human warrior, common quality, warm smile and relaxed expression, half-body shot, slight head tilt with open hand gesture, soft studio lighting, warm key light, detailed steel armor with golden trim and lion motif on chest, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**EXAMPLE (Demon Mage, Menacing):**

Fantasy 3D render portrait of a menacing demon mage, epic quality, threatening glare with glowing red eyes, half-body shot, looming posture with hands crackling with fire, soft studio lighting, warm key light, detailed dark robes with horn-shaped crystal ornaments, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**USAGE:** Generate these as 512x512 assets stored in `public/assets/portraits/{faction}/` for use in story scenes, tutorials, dialogue, and event popups.

---

## REFERENCE LOCK

The following BASE models serve as the visual anchor for all generated assets. Once approved, their DNA must not change.

Approved -- YES / NO (all start as NO until verified) (strike through if rejected)

### Human
- **REF_001_HUMAN_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_002_HUMAN_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_003_HUMAN_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_004_HUMAN_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_005_HUMAN_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_006_HUMAN_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_007_HUMAN_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Elf
- **REF_008_ELF_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_009_ELF_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_010_ELF_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_011_ELF_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_012_ELF_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_013_ELF_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_014_ELF_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Orc
- **REF_015_ORC_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_016_ORC_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_017_ORC_BERSERKER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_018_ORC_SHAMAN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_019_ORC_HUNTER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_020_ORC_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_021_ORC_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Undead
- **REF_022_UNDEAD_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_023_UNDEAD_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_024_UNDEAD_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_025_UNDEAD_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_026_UNDEAD_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_027_UNDEAD_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_028_UNDEAD_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Demon
- **REF_029_DEMON_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_030_DEMON_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_031_DEMON_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_032_DEMON_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_033_DEMON_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_034_DEMON_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_035_DEMON_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING

### Celestial
- **REF_036_CELESTIAL_WARRIOR_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_037_CELESTIAL_MAGE_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_038_CELESTIAL_HEALER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_039_CELESTIAL_TANK_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_040_CELESTIAL_SUPPORT_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_041_CELESTIAL_RANGER_BASE** -- Approved: NO -- Used as style anchor: PENDING
- **REF_042_CELESTIAL_ASSASSIN_BASE** -- Approved: NO -- Used as style anchor: PENDING