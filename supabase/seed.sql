-- SEED DATA: Idle Kingdom Revolution
-- Populates game config tables with initial data

-- GAME UNITS
INSERT INTO public.game_units (id, name, name_pl, class, faction, rarity, base_hp, base_attack, base_defense, base_speed, growth_hp, growth_attack, growth_defense, skill_data) VALUES
('warrior_01', 'Footman', 'Piechur', 'warrior', 'human', 'common', 100, 15, 20, 100, 1.1, 1.05, 1.1, '[{"name":"Shield Bash","desc":"Stuns enemy for 1s","cooldown":5}]'::jsonb),
('archer_03', 'Longbowman', 'Łucznik', 'ranger', 'human', 'common', 70, 22, 10, 130, 1.05, 1.15, 1.0, '[{"name":"Piercing Shot","desc":"Ignores 50% armor","cooldown":4}]'::jsonb),
('mage_02', 'Apprentice', 'Adept', 'mage', 'elf', 'uncommon', 60, 30, 8, 110, 1.0, 1.2, 0.9, '[{"name":"Fireball","desc":"AoE damage to all enemies","cooldown":6}]'::jsonb),
('tank_01', 'Knight', 'Rycerz', 'tank', 'human', 'rare', 200, 10, 40, 80, 1.2, 1.0, 1.2, '[{"name":"Taunt","desc":"Forces enemies to attack this unit","cooldown":8}]'::jsonb),
('healer_01', 'Priest', 'Kapłan', 'healer', 'human', 'uncommon', 80, 5, 12, 100, 1.1, 1.0, 1.05, '[{"name":"Heal","desc":"Heals lowest HP ally for 50","cooldown":3}]'::jsonb),
('assassin_01', 'Shadow Blade', 'Ostrze cienia', 'assassin', 'undead', 'epic', 80, 40, 5, 150, 1.0, 1.3, 0.8, '[{"name":"Backstab","desc":"3x damage from behind row","cooldown":7}]'::jsonb),
('support_01', 'Bard', 'Bard', 'support', 'elf', 'common', 90, 8, 15, 120, 1.05, 1.0, 1.05, '[{"name":"Inspire","desc":"+20% attack to all allies for 5s","cooldown":10}]'::jsonb),
('mage_fire_01', 'Pyromancer', 'Piromanta', 'mage', 'orc', 'rare', 90, 38, 10, 105, 1.1, 1.2, 1.0, '[{"name":"Inferno","desc":"Burns all enemies for 5s","cooldown":8}]'::jsonb),
('warrior_02', 'Berserker', 'Berserker', 'warrior', 'orc', 'rare', 150, 25, 15, 110, 1.15, 1.1, 1.05, '[{"name":"Rage","desc":"+50% attack, -30% defense for 5s","cooldown":12}]'::jsonb),
('tank_02', 'Guardian Golem', 'Golem strażnik', 'tank', 'celestial', 'epic', 350, 8, 60, 60, 1.25, 0.9, 1.3, '[{"name":"Stone Wall","desc":"Reduces all damage by 80% for 4s","cooldown":15}]'::jsonb),
('ranger_02', 'Dark Ranger', 'Mroczna łuczniczka', 'ranger', 'undead', 'legendary', 120, 50, 12, 140, 1.1, 1.3, 1.0, '[{"name":"Shadow Arrows","desc":"Attacks all enemies with poison","cooldown":6}]'::jsonb),
('healer_02', 'Druid', 'Druid', 'healer', 'elf', 'rare', 100, 10, 15, 110, 1.1, 1.05, 1.1, '[{"name":"Regrowth","desc":"Heals all allies for 30 over 5s","cooldown":8}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- GAME ITEMS
INSERT INTO public.game_items (id, name, name_pl, item_type, rarity, tier, base_stats, is_consumable) VALUES
('item_sword_01', 'Sword of Courage', 'Miecz odwagi', 'weapon', 'common', 1, '{"attack":5,"crit_chance":0.02}'::jsonb, false),
('item_bow_01', 'Wind Bow', 'Łuk wiatru', 'weapon', 'uncommon', 2, '{"attack":8,"speed":0.1}'::jsonb, false),
('item_shield_01', 'Defender Shield', 'Tarcza obrońcy', 'armor', 'common', 1, '{"defense":5,"health":20}'::jsonb, false),
('item_ring_01', 'Ring of Power', 'Pierścień mocy', 'accessory', 'rare', 3, '{"attack":12,"defense":3,"health":50}'::jsonb, false),
('item_potion_01', 'Health Potion', 'Eliksir życia', 'consumable', 'common', 1, '{"heal_amount":100}'::jsonb, true),
('item_tome_01', 'Tome of Wisdom', 'Księga mądrości', 'consumable', 'uncommon', 2, '{"xp_boost":0.5}'::jsonb, true),
('item_armor_frost_01', 'Frost Armor', 'Zbroja mrozu', 'armor', 'epic', 4, '{"defense":15,"health":100,"resistance":0.2}'::jsonb, false),
('item_blade_fate_01', 'Blade of Destiny', 'Ostrze przeznaczenia', 'weapon', 'legendary', 5, '{"attack":30,"crit_chance":0.15,"crit_damage":0.5}'::jsonb, false),
('item_necklace_01', 'Ruby Necklace', 'Rubinowy naszyjnik', 'accessory', 'uncommon', 2, '{"health":80,"crit_chance":0.03}'::jsonb, false),
('item_helm_01', 'Iron Helm', 'Żelazny hełm', 'armor', 'common', 1, '{"defense":3,"health":15}'::jsonb, false),
('item_skull_cosmetic_01', 'Skull Crown', 'Korona czaszki', 'cosmetic', 'rare', 1, '{}'::jsonb, false)
ON CONFLICT (id) DO NOTHING;

-- BATTLE FIELDS
INSERT INTO public.game_battle_fields (id, name, name_pl, description, chapter_id, difficulty, wave_count, boss_wave, enemy_pool, rewards, recommended_power) VALUES
(1, 'Plains of Beginning', 'Równiny początku', 'A peaceful meadow where your journey begins.', 1, 1, 3, 3, '[{"enemy_id":"rat","count":2},{"enemy_id":"slime","count":2}]'::jsonb, '{"gold":50,"xp":30}'::jsonb, 50),
(2, 'Enchanted Forest', 'Zaczarowany las', 'Dense woods filled with mystical creatures.', 1, 2, 5, 5, '[{"enemy_id":"wolf","count":2},{"enemy_id":"spider","count":2},{"enemy_id":"ent","count":1}]'::jsonb, '{"gold":120,"xp":80}'::jsonb, 150),
(3, 'Mountain Pass', 'Przełęcz górska', 'Treacherous mountain path guarded by fierce beasts.', 1, 3, 7, 5, '[{"enemy_id":"bear","count":2},{"enemy_id":"goblin","count":3},{"enemy_id":"troll","count":1}]'::jsonb, '{"gold":250,"xp":180}'::jsonb, 350),
(4, 'Scorching Desert', 'Płonąca pustynia', 'Endless sands hiding ancient dangers.', 2, 4, 10, 5, '[{"enemy_id":"scorpion","count":2},{"enemy_id":"mummy","count":2},{"enemy_id":"sand_worm","count":1}]'::jsonb, '{"gold":500,"xp":400}'::jsonb, 800),
(5, 'Ice Wasteland', 'Lodowe pustkowie', 'Frozen tundra where only the strong survive.', 2, 5, 12, 5, '[{"enemy_id":"ice_golem","count":2},{"enemy_id":"wolf","count":3},{"enemy_id":"frost_dragon","count":1}]'::jsonb, '{"gold":800,"xp":650}'::jsonb, 1500)
ON CONFLICT (id) DO NOTHING;

-- QUESTS
INSERT INTO public.game_quests (id, title, title_pl, description, quest_type, quest_group, objectives, rewards, next_quest_ids) VALUES
(1, 'Eternal Battle', 'Męstwo wiecznej bitwy', 'Win 50 battles and defeat 10 elites.', 'story', 0, '[{"type":"battle_win","target":50},{"type":"elite_kill","target":10}]'::jsonb, '{"gold":500,"xp":200,"item_id":"item_sword_01"}'::jsonb, '{2}'),
(2, 'First Steps', 'Pierwsze kroki', 'Complete 10 battles and collect 100 gold.', 'story', 0, '[{"type":"battle_complete","target":10},{"type":"gold_collect","target":100}]'::jsonb, '{"gold":200,"xp":100}'::jsonb, '{5}'),
(3, 'Glory Collector', 'Zbieracz chwały', 'Win 100 battles today.', 'daily', 1, '[{"type":"battle_win","target":100}]'::jsonb, '{"valor":50,"gold":300}'::jsonb, '{}'),
(4, 'Gold and Glory', 'Złoto i sława', 'Collect 1000 gold and defeat 50 enemies.', 'daily', 1, '[{"type":"gold_collect","target":1000},{"type":"enemy_kill","target":50}]'::jsonb, '{"valor":75,"gold":500}'::jsonb, '{}'),
(5, 'Fortress Defense', 'Obrona twierdzy', 'Complete 20 battle waves and defeat a boss.', 'story', 0, '[{"type":"waves_clear","target":20},{"type":"boss_kill","target":1}]'::jsonb, '{"gold":1000,"xp":500,"item_id":"item_shield_01"}'::jsonb, '{}')
ON CONFLICT (id) DO NOTHING;

-- SHOPS
INSERT INTO public.game_shops (id, name, name_pl, shop_type, items, refresh_interval_hours) VALUES
(1, 'General Store', 'Sklep ogólny', 'general', '[{"item_id":"item_potion_01","price":100,"currency":"gold","stock":10},{"item_id":"item_sword_01","price":500,"currency":"gold","stock":5},{"item_id":"item_shield_01","price":400,"currency":"gold","stock":5}]'::jsonb, 24),
(2, 'Premium Emporium', 'Sklep premium', 'premium', '[{"item_id":"item_skull_cosmetic_01","price":100,"currency":"gems","stock":1},{"item_id":"item_tome_01","price":50,"currency":"valor","stock":3}]'::jsonb, 48),
(3, 'PvP Arena', 'Arena PvP', 'pvp', '[{"item_id":"item_blade_fate_01","price":5000,"currency":"battle_coins","stock":1}]'::jsonb, 168)
ON CONFLICT (id) DO NOTHING;

-- ACHIEVEMENTS
INSERT INTO public.game_achievements (id, name, name_pl, description, category, requirement_type, requirement_value, reward_valor, reward_gold) VALUES
('ach_battle_100', 'Battle Hardened', 'Zahartowany w boju', 'Win 100 battles.', 'combat', 'battle_wins', 100, 100, 500),
('ach_wave_500', 'Wave Breaker', 'Pogromca fal', 'Clear 500 waves.', 'combat', 'waves_cleared', 500, 200, 1000),
('ach_collector', 'Collector', 'Kolekcjoner', 'Collect 10 unique units.', 'collection', 'units_collected', 10, 150, 0),
('ach_power_1k', 'Rising Power', 'Rosnąca siła', 'Reach 1000 total power.', 'progression', 'total_power', 1000, 100, 300),
('ach_power_10k', 'Powerhouse', 'Potęga', 'Reach 10000 total power.', 'progression', 'total_power', 10000, 500, 2000),
('ach_quest_50', 'Quest Master', 'Mistrz zadań', 'Complete 50 quests.', 'progression', 'quests_completed', 50, 100, 500)
ON CONFLICT (id) DO NOTHING;

