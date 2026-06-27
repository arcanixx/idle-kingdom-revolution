-- Idle Kingdom Revolution - Migration 008
-- Create missing player tables referenced by API routes

-- 1. PLAYER UNITS TABLE
CREATE TABLE IF NOT EXISTS public.player_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    unit_id TEXT NOT NULL,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    formation_row INTEGER,
    formation_col INTEGER,
    equipment JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PLAYER INVENTORY TABLE
CREATE TABLE IF NOT EXISTS public.player_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    equipped BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SHOP ITEMS TABLE (catalog for the shop)
CREATE TABLE IF NOT EXISTS public.shop_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER DEFAULT 0,
    currency TEXT DEFAULT 'gold',
    item_id TEXT,
    item_type TEXT DEFAULT 'consumable',
    quantity INTEGER DEFAULT 1,
    stock INTEGER DEFAULT -1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.player_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Players own units" ON public.player_units;
CREATE POLICY "Players own units" ON public.player_units FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Players own inventory" ON public.player_inventory;
CREATE POLICY "Players own inventory" ON public.player_inventory FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Shop items read" ON public.shop_items;
CREATE POLICY "Shop items read" ON public.shop_items FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_player_units_player_id ON public.player_units(player_id);
CREATE INDEX IF NOT EXISTS idx_player_units_unit_id ON public.player_units(unit_id);
CREATE INDEX IF NOT EXISTS idx_player_inventory_player_id ON public.player_inventory(player_id);
CREATE INDEX IF NOT EXISTS idx_shop_items_is_active ON public.shop_items(is_active);
