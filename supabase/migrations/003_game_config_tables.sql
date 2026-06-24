-- Creating CORRECT migration 003 with text IDs 
-- Idle Kingdom Revolution - Migration 003 - FINAL FIX  
-- Creates missing game config tables with text IDs  
  
-- Drop existing policies if they exist  
DROP POLICY IF EXISTS game_units_read ON public.game_units;  
DROP POLICY IF EXISTS game_items_read ON public.game_items;  
DROP POLICY IF EXISTS game_fields_read ON public.game_battle_fields;  
DROP POLICY IF EXISTS game_quests_read ON public.game_quests; 
  
-- Create tables  
CREATE TABLE IF NOT EXISTS public.game_units (  
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  
    name TEXT NOT NULL,  
    description TEXT,  
    icon TEXT DEFAULT '??',  
    rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),  
    type TEXT DEFAULT 'infantry' CHECK (type IN ('infantry', 'archer', 'cavalry', 'mage', 'siege')),  
    attack INTEGER DEFAULT 10,  
    defense INTEGER DEFAULT 10,  
    health INTEGER DEFAULT 100,  
    cost INTEGER DEFAULT 100,  
    created_at TIMESTAMPTZ DEFAULT NOW(),  
    updated_at TIMESTAMPTZ DEFAULT NOW()  
); 
  
CREATE TABLE IF NOT EXISTS public.game_items (  
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  
    name TEXT NOT NULL,  
    description TEXT,  
    icon TEXT DEFAULT '??',  
    rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),  
    type TEXT DEFAULT 'consumable' CHECK (type IN ('weapon', 'armor', 'accessory', 'consumable', 'material', 'cosmetic')),  
    value INTEGER DEFAULT 0,  
    sell_price INTEGER DEFAULT 0,  
    in_shop BOOLEAN DEFAULT false,  
    stock INTEGER DEFAULT 0,  
    max_stock INTEGER DEFAULT 100,  
    created_at TIMESTAMPTZ DEFAULT NOW(),  
    updated_at TIMESTAMPTZ DEFAULT NOW()  
); 
  
CREATE TABLE IF NOT EXISTS public.game_battle_fields (  
    id TEXT PRIMARY KEY,  
    name TEXT NOT NULL,  
    description TEXT,  
    icon TEXT DEFAULT '??',  
    difficulty INTEGER DEFAULT 1,  
    created_at TIMESTAMPTZ DEFAULT NOW(),  
    updated_at TIMESTAMPTZ DEFAULT NOW()  
  
CREATE TABLE IF NOT EXISTS public.game_battle_fields (  
    id TEXT PRIMARY KEY,  
    name TEXT NOT NULL,  
    description TEXT,  
    icon TEXT DEFAULT '??',  
    difficulty INTEGER DEFAULT 1,  
    created_at TIMESTAMPTZ DEFAULT NOW(),  
    updated_at TIMESTAMPTZ DEFAULT NOW()  
); 
  
CREATE TABLE IF NOT EXISTS public.game_quests (  
    id INTEGER PRIMARY KEY,  
    title TEXT NOT NULL,  
    description TEXT,  
    icon TEXT DEFAULT '??',  
    type TEXT DEFAULT 'daily' CHECK (type IN ('daily', 'weekly', 'achievement', 'story')),  
    requirement_type TEXT DEFAULT 'battles',  
    requirement_amount INTEGER DEFAULT 1,  
    reward_gold INTEGER DEFAULT 100,  
    reward_gems INTEGER DEFAULT 5,  
    reward_xp INTEGER DEFAULT 50,  
    is_active BOOLEAN DEFAULT true,  
    created_at TIMESTAMPTZ DEFAULT NOW(),  
    updated_at TIMESTAMPTZ DEFAULT NOW()  
); 
  
-- Enable RLS for new tables  
ALTER TABLE public.game_units ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.game_items ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.game_battle_fields ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.game_quests ENABLE ROW LEVEL SECURITY; 
