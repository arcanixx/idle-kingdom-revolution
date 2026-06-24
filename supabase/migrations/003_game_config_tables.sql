-- Idle Kingdom Revolution - Migration 003
-- Creates missing game config tables
BEGIN;

-- GAME UNITS
CREATE TABLE IF NOT EXISTS public.game_units (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_pl TEXT,
    class TEXT NOT NULL CHECK (class IN ('warrior','ranger','mage','tank','healer','assassin','support')),
    faction TEXT NOT NULL CHECK (faction IN ('human','elf','orc','undead','celestial')),
    rarity TEXT NOT NULL CHECK (rarity IN ('common','uncommon','rare','epic','legendary')),
    base_hp INT NOT NULL DEFAULT 100,
    base_attack INT NOT NULL DEFAULT 10,
    base_defense INT NOT NULL DEFAULT 10,
    base_speed INT NOT NULL DEFAULT 100,
    growth_hp NUMERIC(4,2) DEFAULT 1.0,
    growth_attack NUMERIC(4,2) DEFAULT 1.0,
    growth_defense NUMERIC(4,2) DEFAULT 1.0,
    skill_data JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- GAME ITEMS
CREATE TABLE IF NOT EXISTS public.game_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_pl TEXT,
    item_type TEXT NOT NULL CHECK (item_type IN ('weapon','armor','accessory','consumable','material','cosmetic')),
    rarity TEXT NOT NULL CHECK (rarity IN ('common','uncommon','rare','epic','legendary')),
    tier INT DEFAULT 1,
    base_stats JSONB DEFAULT '{}'::jsonb,
    is_consumable BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- GAME BATTLE FIELDS
CREATE TABLE IF NOT EXISTS public.game_battle_fields (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    name_pl TEXT,
    description TEXT,
    description_pl TEXT,
    chapter_id INT DEFAULT 1,
    difficulty INT DEFAULT 1,
    wave_count INT DEFAULT 3,
    boss_wave INT DEFAULT 3,
    enemy_pool JSONB DEFAULT '[]'::jsonb,
    rewards JSONB DEFAULT '{}'::jsonb,
    recommended_power INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- GAME QUESTS
CREATE TABLE IF NOT EXISTS public.game_quests (
    id INT PRIMARY KEY,
    title TEXT NOT NULL,
    title_pl TEXT,
    description TEXT,
    description_pl TEXT,
    quest_type TEXT NOT NULL CHECK (quest_type IN ('story','daily','weekly','side','event')),
    quest_group INT DEFAULT 0,
    objectives JSONB DEFAULT '[]'::jsonb,
    rewards JSONB DEFAULT '{}'::jsonb,
    next_quest_ids JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.game_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_battle_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_quests ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES: public read
DROP POLICY IF EXISTS 'Game units read' ON public.game_units;
CREATE POLICY 'Game units read' ON public.game_units FOR SELECT USING (true);

DROP POLICY IF EXISTS 'Game items read' ON public.game_items;
CREATE POLICY 'Game items read' ON public.game_items FOR SELECT USING (true);

DROP POLICY IF EXISTS 'Game fields read' ON public.game_battle_fields;
CREATE POLICY 'Game fields read' ON public.game_battle_fields FOR SELECT USING (true);

DROP POLICY IF EXISTS 'Game quests read' ON public.game_quests;
CREATE POLICY 'Game quests read' ON public.game_quests FOR SELECT USING (true);

COMMIT;

-- Fix: add offline_earnings_cap_hours column referenced by claim_offline_earnings()
ALTER TABLE IF EXISTS public.players ADD COLUMN IF NOT EXISTS offline_earnings_cap_hours INT DEFAULT 8;

-- Updated_at triggers for the new game config tables
SELECT public.create_updated_at_trigger('game_units');
SELECT public.create_updated_at_trigger('game_items');
SELECT public.create_updated_at_trigger('game_battle_fields');
SELECT public.create_updated_at_trigger('game_quests');