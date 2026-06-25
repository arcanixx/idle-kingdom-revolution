-- Idle Kingdom Revolution - Migration 006
-- Fix game tables structure to match Supabase reality
-- This migration updates the schema to match what's already in Supabase

-- ============================================================================
-- GAME UNITS TABLE
-- ============================================================================

-- Drop existing table if it exists (will recreate with correct structure)
DROP TABLE IF EXISTS public.game_units CASCADE;

CREATE TABLE public.game_units (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    class TEXT NOT NULL,
    faction TEXT NOT NULL,
    rarity TEXT NOT NULL,
    base_hp INTEGER NOT NULL,
    base_attack INTEGER NOT NULL,
    base_defense INTEGER NOT NULL,
    base_speed INTEGER DEFAULT 100,
    growth_hp REAL DEFAULT 1.0,
    growth_attack REAL DEFAULT 1.0,
    growth_defense REAL DEFAULT 1.0,
    skill_data JSONB DEFAULT '[]'::jsonb,
    synergies JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name_pl TEXT,
    description TEXT,
    description_pl TEXT,
    sprite_id TEXT,
    icon_url TEXT,
    is_summonable BOOLEAN DEFAULT true,
    icon TEXT DEFAULT '⚔️',
    type TEXT DEFAULT 'infantry',
    attack INTEGER DEFAULT 10,
    defense INTEGER DEFAULT 10,
    health INTEGER DEFAULT 100,
    cost INTEGER DEFAULT 100
);

-- Enable RLS
ALTER TABLE public.game_units ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Game units read" ON public.game_units;
CREATE POLICY "Game units read" ON public.game_units FOR SELECT USING (true);

DROP POLICY IF EXISTS "Game units insert" ON public.game_units;
CREATE POLICY "Game units insert" ON public.game_units FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Game units update" ON public.game_units;
CREATE POLICY "Game units update" ON public.game_units FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Game units delete" ON public.game_units;
CREATE POLICY "Game units delete" ON public.game_units FOR DELETE USING (auth.uid() IS NOT NULL);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_game_units_class ON public.game_units(class);
CREATE INDEX IF NOT EXISTS idx_game_units_faction ON public.game_units(faction);
CREATE INDEX IF NOT EXISTS idx_game_units_rarity ON public.game_units(rarity);
CREATE INDEX IF NOT EXISTS idx_game_units_type ON public.game_units(type);
CREATE INDEX IF NOT EXISTS idx_game_units_is_active ON public.game_units(is_active);

-- ============================================================================
-- GAME ITEMS TABLE
-- ============================================================================

DROP TABLE IF EXISTS public.game_items CASCADE;

CREATE TABLE public.game_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    item_type TEXT NOT NULL,
    rarity TEXT DEFAULT 'common',
    tier INTEGER DEFAULT 1,
    base_stats JSONB DEFAULT '{}'::jsonb,
    is_consumable BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name_pl TEXT,
    description TEXT,
    description_pl TEXT,
    max_level INTEGER DEFAULT 5,
    icon TEXT DEFAULT '',
    type TEXT DEFAULT 'consumable',
    value INTEGER DEFAULT 0,
    sell_price INTEGER DEFAULT 0,
    in_shop BOOLEAN DEFAULT false,
    stock INTEGER DEFAULT 0,
    max_stock INTEGER DEFAULT 100
);

-- Enable RLS
ALTER TABLE public.game_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Game items read" ON public.game_items;
CREATE POLICY "Game items read" ON public.game_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Game items insert" ON public.game_items;
CREATE POLICY "Game items insert" ON public.game_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Game items update" ON public.game_items;
CREATE POLICY "Game items update" ON public.game_items FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Game items delete" ON public.game_items;
CREATE POLICY "Game items delete" ON public.game_items FOR DELETE USING (auth.uid() IS NOT NULL);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_game_items_item_type ON public.game_items(item_type);
CREATE INDEX IF NOT EXISTS idx_game_items_rarity ON public.game_items(rarity);
CREATE INDEX IF NOT EXISTS idx_game_items_type ON public.game_items(type);
CREATE INDEX IF NOT EXISTS idx_game_items_in_shop ON public.game_items(in_shop);
CREATE INDEX IF NOT EXISTS idx_game_items_is_active ON public.game_items(is_active);

-- ============================================================================
-- GAME BATTLE FIELDS TABLE
-- ============================================================================

DROP TABLE IF EXISTS public.game_battle_fields CASCADE;

CREATE TABLE public.game_battle_fields (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    chapter_id INTEGER NOT NULL DEFAULT 1,
    difficulty INTEGER DEFAULT 1,
    wave_count INTEGER DEFAULT 5,
    boss_wave INTEGER DEFAULT 5,
    enemy_pool JSONB NOT NULL DEFAULT '[]'::jsonb,
    terrain_type TEXT DEFAULT 'plains',
    rewards JSONB DEFAULT '{}'::jsonb,
    recommended_power INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name_pl TEXT,
    description TEXT,
    description_pl TEXT,
    icon TEXT DEFAULT ''
);

-- Enable RLS
ALTER TABLE public.game_battle_fields ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Game battle fields read" ON public.game_battle_fields;
CREATE POLICY "Game battle fields read" ON public.game_battle_fields FOR SELECT USING (true);

DROP POLICY IF EXISTS "Game battle fields insert" ON public.game_battle_fields;
CREATE POLICY "Game battle fields insert" ON public.game_battle_fields FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Game battle fields update" ON public.game_battle_fields;
CREATE POLICY "Game battle fields update" ON public.game_battle_fields FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Game battle fields delete" ON public.game_battle_fields;
CREATE POLICY "Game battle fields delete" ON public.game_battle_fields FOR DELETE USING (auth.uid() IS NOT NULL);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_game_battle_fields_chapter_id ON public.game_battle_fields(chapter_id);
CREATE INDEX IF NOT EXISTS idx_game_battle_fields_difficulty ON public.game_battle_fields(difficulty);
CREATE INDEX IF NOT EXISTS idx_game_battle_fields_terrain_type ON public.game_battle_fields(terrain_type);
CREATE INDEX IF NOT EXISTS idx_game_battle_fields_is_active ON public.game_battle_fields(is_active);

-- ============================================================================
-- GAME QUESTS TABLE
-- ============================================================================

DROP TABLE IF EXISTS public.game_quests CASCADE;

CREATE TABLE public.game_quests (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    quest_type TEXT NOT NULL,
    objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
    rewards JSONB NOT NULL DEFAULT '{}'::jsonb,
    next_quest_ids INTEGER[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title_pl TEXT,
    description TEXT,
    description_pl TEXT,
    quest_group INTEGER DEFAULT 0,
    icon TEXT DEFAULT '📜',
    type TEXT DEFAULT 'daily',
    requirement_type TEXT DEFAULT 'battles',
    requirement_amount INTEGER DEFAULT 1,
    reward_gold INTEGER DEFAULT 100,
    reward_gems INTEGER DEFAULT 5,
    reward_xp INTEGER DEFAULT 50
);

-- Enable RLS
ALTER TABLE public.game_quests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Game quests read" ON public.game_quests;
CREATE POLICY "Game quests read" ON public.game_quests FOR SELECT USING (true);

DROP POLICY IF EXISTS "Game quests insert" ON public.game_quests;
CREATE POLICY "Game quests insert" ON public.game_quests FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Game quests update" ON public.game_quests;
CREATE POLICY "Game quests update" ON public.game_quests FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Game quests delete" ON public.game_quests;
CREATE POLICY "Game quests delete" ON public.game_quests FOR DELETE USING (auth.uid() IS NOT NULL);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_game_quests_quest_type ON public.game_quests(quest_type);
CREATE INDEX IF NOT EXISTS idx_game_quests_type ON public.game_quests(type);
CREATE INDEX IF NOT EXISTS idx_game_quests_is_active ON public.game_quests(is_active);
CREATE INDEX IF NOT EXISTS idx_game_quests_quest_group ON public.game_quests(quest_group);

-- ============================================================================
-- GAME ACHIEVEMENTS TABLE (if exists)
-- ============================================================================

-- Check if game_achievements exists, if not create it
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_achievements') THEN
        CREATE TABLE public.game_achievements (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            icon TEXT DEFAULT '🏆',
            requirement_type TEXT NOT NULL,
            requirement_amount INTEGER NOT NULL DEFAULT 1,
            reward_gold INTEGER DEFAULT 0,
            reward_gems INTEGER DEFAULT 0,
            reward_xp INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            name_pl TEXT,
            description_pl TEXT
        );

        ALTER TABLE public.game_achievements ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Game achievements read" ON public.game_achievements FOR SELECT USING (true);
        CREATE POLICY "Game achievements insert" ON public.game_achievements FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
        CREATE POLICY "Game achievements update" ON public.game_achievements FOR UPDATE USING (auth.uid() IS NOT NULL);
        CREATE POLICY "Game achievements delete" ON public.game_achievements FOR DELETE USING (auth.uid() IS NOT NULL);

        CREATE INDEX IF NOT EXISTS idx_game_achievements_requirement_type ON public.game_achievements(requirement_type);
        CREATE INDEX IF NOT EXISTS idx_game_achievements_is_active ON public.game_achievements(is_active);
    END IF;
END $$;

-- ============================================================================
-- GAME SHOPS TABLE (if exists)
-- ============================================================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_shops') THEN
        CREATE TABLE public.game_shops (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            icon TEXT DEFAULT '🏪',
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            name_pl TEXT,
            description_pl TEXT
        );

        ALTER TABLE public.game_shops ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Game shops read" ON public.game_shops FOR SELECT USING (true);
        CREATE POLICY "Game shops insert" ON public.game_shops FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
        CREATE POLICY "Game shops update" ON public.game_shops FOR UPDATE USING (auth.uid() IS NOT NULL);
        CREATE POLICY "Game shops delete" ON public.game_shops FOR DELETE USING (auth.uid() IS NOT NULL);

        CREATE INDEX IF NOT EXISTS idx_game_shops_is_active ON public.game_shops(is_active);
    END IF;
END $$;

-- Migration 006 completed successfully