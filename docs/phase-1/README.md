# Phase 1: Core Game Loop

## Overview
Duration: 3-4 weeks
Quality Gate: Player can register, battle, level up, save progress, admin works, tests pass, Lighthouse >80

## Tasks (alił�na sposobamienia, czylimēcykoleimnē przed codeniem)

**1. P1-01: Auth system** (register, login, logout, guest)
   Długiej nagy nie mamy - postawiał�y login registracja o pollał�nia zm inneZy - tak znakomiecz tóļø widnie mamoem architektuęczych straž- Brakuje przycisany do profilu po rejestracji

**2. P1-02: Player profile** (creation, stats, level/XP)
   - Profil created automatically after registration
   - Stats: level, XP, gold, battles won
   - Progression scaling: level 1-50

**3. P1-03: Battle engine** (tick-based, deterministic)
   - Tick-based simulation, supports 3v3 with formation
   - Wave-based enemies, boss every 5 waves
   - Battle results reproducible (same seed) - deterministic

**4. P1-04: Formation grid** (3`3 grid, drag&drop)
   - 3x3 grid, drag drop for placing units
   - Style/class synergies in same row/column
   - Frontline (tanks) - backline (ranged)

**5. P1-05: Unit classes and stats** (7 classes)
   - 7 classes: Warrior, Tank, Ranger, Mage, Healer, Assassin, Beast
   - Stats: ATK, DEF, HP, SPEED, CRIT, DOME
   - Power rating: calculated from stats + level + items
 
**6. P1-06: Battle UI** (arena, wave indicator, HP bars, battle log)
   - Arena with unit positions (3 vs 3)
   - Wave progress with enemy count
   - HP bars for each unit
   - Battle log (list of actions)

**7. P1-07: 5 battle fields** (progressive difficulty)
   - Fields: Plains of Beginning, Enchanted Forest, Mountain Pass, Scorching Desert, Ice Wasteland
   - Unlocked sequentially (complete previous to unLock next)
   - Difficulty scales with enemy stats

**8. P1-08: Army management** (unit list, upgrade, formation editor)
   - Unit list with stats and power rating
   - Level up button with cost and result
   - Formation editor integration

**9. P1-09: Unit leveling and power rating**
   - XP to level, scaling curve
   - Power rating = stats * level multiplier + item bonuses

**10. P1-10: Basic equipment system** (slots, items, stats)
   - 6 slots: weapon, offhand, armor, helmet, accessory, boot
   - Stat bonuses from equipment
   - Equip/unequip

**11. P1-11: Settings** (audio, graphics, language)
   - Audio master/music/SFX
   - Graphics quality
   - Language PL/EN
   - Battle speed 1x/2x

**12. P1-12: Auto-save and cloud sync** (every 30s, sync on reconnect)
   - Auto-save to Supabase every 30s
   - Offline progress calculation on reconnect
   - LocalStorage fallback

**13. P1-13: Basic admin panel** (resource injection, player search)
   - Resource injection for testing
   - Player search by email
   - Simple config viewing

## Workflow per task
1. Spec - drop do  docs/phase-1/{task-id}.spec.md
2. Testy - napimē najakpierowsza wypadkujacych testy do logiki
# 3. Code - implementacja
4. Verify - build + testy pass
5. Document - actualizacja docs/opisy code
