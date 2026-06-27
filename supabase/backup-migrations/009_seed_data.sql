-- Idle Kingdom Revolution - Migration 009
-- Seed data for game content

-- ============================================================================
-- GAME UNITS (heroes the player can collect)
-- ============================================================================
INSERT INTO public.game_units (id, name, class, faction, rarity, base_hp, base_attack, base_defense, base_speed, description, is_active, is_summonable, cost) VALUES
  ('u_warrior_01', 'Sir Aldric', 'warrior', 'human', 'common', 120, 14, 10, 100, 'A seasoned human warrior.', true, true, 100),
  ('u_warrior_02', 'Ragnar', 'warrior', 'orc', 'uncommon', 140, 16, 12, 95, 'An orc berserker.', true, true, 200),
  ('u_ranger_01', 'Lyra', 'ranger', 'elf', 'common', 85, 16, 6, 130, 'Elven archer with keen eyes.', true, true, 100),
  ('u_ranger_02', 'Shade', 'ranger', 'undead', 'rare', 90, 20, 7, 140, 'A banshee sniper from beyond.', true, true, 400),
  ('u_mage_01', 'Merlin', 'mage', 'human', 'rare', 70, 22, 5, 110, 'Archmage of the crystal tower.', true, true, 400),
  ('u_mage_02', 'Zul\'Kar', 'mage', 'demon', 'epic', 80, 28, 6, 115, 'Demonic fire mage.', true, true, 800),
  ('u_tank_01', 'Gromm', 'tank', 'orc', 'common', 200, 8, 22, 60, 'Shieldbearer of the iron clan.', true, true, 150),
  ('u_tank_02', 'Valerius', 'tank', 'human', 'uncommon', 180, 10, 25, 55, 'Paladin in heavy plate.', true, true, 300),
  ('u_healer_01', 'Seraphina', 'healer', 'celestial', 'epic', 75, 10, 8, 120, 'Celestial light weaver.', true, true, 600),
  ('u_healer_02', 'Elara', 'healer', 'elf', 'rare', 80, 8, 9, 125, 'Druid of the ancient grove.', true, true, 350),
  ('u_assassin_01', 'Vex', 'assassin', 'demon', 'rare', 65, 24, 4, 150, 'Shadow blade from the abyss.', true, true, 500),
  ('u_assassin_02', 'Kira', 'assassin', 'elf', 'uncommon', 70, 18, 5, 145, 'Silent wind assassin.', true, true, 250),
  ('u_support_01', 'Banner', 'support', 'human', 'common', 90, 10, 10, 105, 'Battlefield tactician.', true, true, 100),
  ('u_support_02', 'Aurora', 'support', 'celestial', 'legendary', 100, 14, 12, 110, 'Celestial hymn singer.', true, true, 1200)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- GAME BATTLE FIELDS
-- ============================================================================
INSERT INTO public.game_battle_fields (id, name, chapter_id, difficulty, wave_count, boss_wave, enemy_pool, terrain_type, rewards, recommended_power) VALUES
  ('field_plains', 'Green Plains', 1, 1, 3, 3, '["goblin","wolf"]', 'plains', '{"gold": 30, "xp": 20}', 50),
  ('field_forest', 'Dark Forest', 1, 2, 5, 5, '["wolf","skeleton","dark_elf"]', 'forest', '{"gold": 60, "xp": 40}', 150),
  ('field_mountains', 'Crystal Mountains', 2, 3, 5, 5, '["troll","dark_elf","dark_mage"]', 'mountains', '{"gold": 120, "xp": 80}', 400),
  ('field_dungeon', 'Abyssal Dungeon', 2, 4, 7, 7, '["skeleton","dark_mage","troll"]', 'dungeon', '{"gold": 200, "xp": 150}', 800),
  ('field_ice', 'Frozen Wastes', 3, 5, 7, 7, '["troll","dark_mage","boss"]', 'ice', '{"gold": 350, "xp": 250}', 2000)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- GAME ITEMS (equipment + consumables)
-- ============================================================================
INSERT INTO public.game_items (id, name, item_type, rarity, tier, base_stats, is_consumable, is_active, value, sell_price, in_shop, stock, max_stock) VALUES
  ('item_sword_01', 'Iron Sword', 'weapon', 'common', 1, '{"attack": 3}', false, true, 50, 10, true, 100, 100),
  ('item_sword_02', 'Steel Blade', 'weapon', 'uncommon', 2, '{"attack": 6}', false, true, 150, 30, true, 50, 50),
  ('item_sword_03', 'Enchanted Saber', 'weapon', 'rare', 3, '{"attack": 12}', false, true, 500, 100, true, 20, 20),
  ('item_armor_01', 'Leather Vest', 'armor', 'common', 1, '{"defense": 2}', false, true, 40, 8, true, 100, 100),
  ('item_armor_02', 'Chain Mail', 'armor', 'uncommon', 2, '{"defense": 5}', false, true, 120, 24, true, 50, 50),
  ('item_armor_03', 'Plate Armor', 'armor', 'rare', 3, '{"defense": 10}', false, true, 450, 90, true, 20, 20),
  ('item_potion_01', 'Health Potion', 'consumable', 'common', 1, '{"heal": 50}', true, true, 20, 4, true, 200, 200),
  ('item_potion_02', 'Mana Crystal', 'consumable', 'uncommon', 1, '{"mana": 30}', true, true, 35, 7, true, 100, 100)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SHOP ITEMS (configure what appears in shops)
-- ============================================================================
INSERT INTO public.shop_items (id, shop_id, item_id, price_gold, price_gems, stock, max_stock, refresh_interval_hours) VALUES
  ('shop_01', 'general', 'item_sword_01', 50, 0, 100, 100, 24),
  ('shop_02', 'general', 'item_armor_01', 40, 0, 100, 100, 24),
  ('shop_03', 'general', 'item_potion_01', 20, 0, 200, 200, 6),
  ('shop_04', 'general', 'item_potion_02', 35, 0, 100, 100, 6),
  ('shop_05', 'premium', 'item_sword_02', 500, 10, 50, 50, 48),
  ('shop_06', 'premium', 'item_armor_03', 1000, 25, 20, 20, 48)
ON CONFLICT (id) DO NOTHING;
