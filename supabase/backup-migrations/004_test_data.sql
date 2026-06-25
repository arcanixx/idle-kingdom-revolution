-- Creating FINAL CORRECT migration 004 
-- Idle Kingdom Revolution - Migration 004 - FINAL CORRECT Test Data  
-- Data matches EXACTLY the current table structure  
  
-- Insert test units (ALL columns)  
INSERT INTO public.game_units (id, name, class, faction, rarity, base_hp, base_attack, base_defense, base_speed, growth_hp, growth_attack, growth_defense, skill_data, synergies, is_active, created_at, name_pl, description, description_pl, sprite_id, icon_url, is_summonable, icon, type, attack, defense, health, cost) VALUES  
    ('unit_peasant', 'Peasant', 'warrior', 'human', 'common', 100, 15, 20, 100, 1.1, 1.05, 1.1, '[]', '[]', true, NOW(), 'Piechur', 'Basic infantry unit', null, null, null, true, '??', 'infantry', 10, 10, 100, 100),  
    ('unit_archer', 'Archer', 'ranger', 'human', 'common', 70, 22, 10, 130, 1.05, 1.15, 1, '[]', '[]', true, NOW(), 'ùucznik', 'Ranged unit', null, null, null, true, '??', 'archer', 10, 10, 100, 100),  
    ('unit_knight', 'Knight', 'tank', 'human', 'rare', 200, 10, 40, 80, 1.2, 1, 1.2, '[]', '[]', true, NOW(), 'Rycerz', 'Heavy cavalry', null, null, null, true, '???', 'cavalry', 10, 10, 100, 100),  
    ('unit_mage', 'Mage', 'mage', 'elf', 'rare', 60, 30, 8, 110, 1, 1.2, 0.9, '[]', '[]', true, NOW(), 'Adept', 'Magic user', null, null, null, true, '??', 'mage', 10, 10, 100, 100),  
    ('unit_ballista', 'Ballista', 'warrior', 'human', 'epic', 60, 20, 5, 60, 1, 1, 1, '[]', '[]', true, NOW(), 'Balista', 'Siege weapon', null, null, null, true, '??', 'siege', 10, 10, 100, 100),  
    ('unit_dragon', 'Dragon', 'tank', 'celestial', 'legendary', 200, 30, 15, 80, 1.5, 1.3, 1.4, '[]', '[]', true, NOW(), 'Smok', 'Legendary beast', null, null, null, true, '??', 'cavalry', 10, 10, 100, 100) 
ON CONFLICT (id) DO NOTHING;  
  
-- Insert test items (ALL columns)  
INSERT INTO public.game_items (id, name, item_type, rarity, tier, base_stats, is_consumable, is_active, created_at, name_pl, description, description_pl, max_level, icon) VALUES  
    ('item_potion', 'Health Potion', 'consumable', 'common', 1, '{}', true, true, NOW(), 'Eliksir æycia', 'Restores 50 HP', null, 5, '??'),  
    ('item_sword', 'Iron Sword', 'weapon', 'uncommon', 2, '{}', false, true, NOW(), 'Miecz æelazny', '+5 attack', null, 5, '??'),  
    ('item_armor', 'Steel Armor', 'armor', 'uncommon', 3, '{}', false, true, NOW(), 'Pancerz stalowy', '+8 defense', null, 5, '???'),  
    ('item_ring', 'Magic Ring', 'accessory', 'rare', 4, '{}', false, true, NOW(), 'Magiczny pieròcie‰', '+10 all stats', null, 5, '??'),  
    ('item_scroll', 'Fire Scroll', 'consumable', 'uncommon', 2, '{}', true, true, NOW(), 'Zwoja ognia', 'Deals 50 fire damage', null, 5, '??'),  
    ('item_dragon_scale', 'Dragon Scale', 'material', 'legendary', 5, '{}', false, true, NOW(), 'ùuska smoka', 'Legendary armor material', null, 5, '??') 
ON CONFLICT (id) DO NOTHING;  
  
-- Insert test battle fields (ALL columns)  
INSERT INTO public.game_battle_fields (id, name, description, icon, difficulty) VALUES  
    ('field_forest', 'Dark Forest', 'Mysterious woods, moderate challenge', '??', 2),  
    ('field_castle', 'Castle Siege', 'Ancient castle under attack', '??', 3),  
    ('field_dungeon', 'Dragon Lair', 'Ancient dragon''s home, extreme difficulty', '??', 5),  
    ('field_village', 'Green Village', 'Peaceful village, easy enemies', '???', 1) 
ON CONFLICT (id) DO NOTHING;  
  
-- Insert test quests (ALL columns)  
INSERT INTO public.game_quests (id, title, quest_type, objectives, rewards, next_quest_ids, is_active, created_at, title_pl, description, description_pl, quest_group, icon, type, requirement_type, requirement_amount, reward_gold, reward_gems, reward_xp) VALUES  
    (1, 'First Blood', 'daily', '[]', '{}', '{}', true, NOW(), 'Pierwsza krew', 'Win your first battle', null, 0, '??', 'daily', 'battles', 1, 50, 2, 25),  
    (2, 'Battle Veteran', 'daily', '[]', '{}', '{}', true, NOW(), 'Weteran bitew', 'Win 10 battles', null, 0, '??', 'daily', 'battles', 10, 200, 10, 100),  
    (3, 'Dragon Slayer', 'story', '[]', '{}', '{}', true, NOW(), 'Zab¢jca smok¢w', 'Defeat the dragon in wave 5', null, 0, '??', 'achievement', 'wave', 5, 1000, 50, 500),  
    (4, 'Miner', 'daily', '[]', '{}', '{}', true, NOW(), 'G¢rnik', 'Collect 1000 gold from mining', null, 0, '??', 'daily', 'gold', 1000, 100, 5, 200),  
    (5, 'Castle Defender', 'weekly', '[]', '{}', '{}', true, NOW(), 'Obro‰ca zamku', 'Survive 10 castle sieges', null, 0, '??', 'weekly', 'sieges', 10, 500, 25, 300),  
    (6, 'Wealthy Lord', 'side', '[]', '{}', '{}', true, NOW(), 'Bogaty pan', 'Accumulate 10000 gold', null, 0, '??', 'achievement', 'gold', 10000, 200, 100, 1000) 
ON CONFLICT (id) DO NOTHING;  
  
-- Migration 004 completed successfully 
