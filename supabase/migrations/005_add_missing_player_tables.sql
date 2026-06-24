-- Idle Kingdom Revolution - Migration 005
-- Add missing player tables that are referenced in API routes

-- 1. PLAYER MINING TABLE
CREATE TABLE IF NOT EXISTS public.player_mining (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    mine_level INTEGER DEFAULT 1 CHECK (mine_level >= 1),
    current_gold INTEGER DEFAULT 0 CHECK (current_gold >= 0),
    max_gold INTEGER DEFAULT 1000 CHECK (max_gold >= 0),
    last_collected_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id)
);

-- 2. PLAYER CASTLE TABLE
CREATE TABLE IF NOT EXISTS public.player_castle (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    castle_level INTEGER DEFAULT 1 CHECK (castle_level >= 1),
    defense_rating INTEGER DEFAULT 0 CHECK (defense_rating >= 0),
    last_defended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id)
);

-- 3. PLAYER TOWER DEFENSE PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.player_td_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    current_wave INTEGER DEFAULT 1 CHECK (current_wave >= 1),
    highest_wave INTEGER DEFAULT 1 CHECK (highest_wave >= 1),
    total_waves_cleared INTEGER DEFAULT 0 CHECK (total_waves_cleared >= 0),
    last_played_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id)
);

-- 4. PLAYER VALOR TABLE (for skill trees)
CREATE TABLE IF NOT EXISTS public.player_valor (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    valor_points INTEGER DEFAULT 0 CHECK (valor_points >= 0),
    unlocked_skills JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id)
);

-- 5. PLAYER QUESTS TABLE
CREATE TABLE IF NOT EXISTS public.player_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    quest_id INTEGER NOT NULL REFERENCES public.game_quests(id),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0),
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, quest_id)
);

-- 6. PLAYER ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.player_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL REFERENCES public.game_achievements(id),
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, achievement_id)
);

-- 7. PLAYER MAIL TABLE
CREATE TABLE IF NOT EXISTS public.player_mail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.players(id),
    subject TEXT NOT NULL,
    body TEXT,
    attachments JSONB DEFAULT '{}'::jsonb,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for all new tables
ALTER TABLE public.player_mining ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_castle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_td_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_valor ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_mail ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Players can only access their own data
DROP POLICY IF EXISTS "Players own mining data" ON public.player_mining;
CREATE POLICY "Players own mining data" ON public.player_mining FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Players own castle data" ON public.player_castle;
CREATE POLICY "Players own castle data" ON public.player_castle FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Players own td progress" ON public.player_td_progress;
CREATE POLICY "Players own td progress" ON public.player_td_progress FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Players own valor data" ON public.player_valor;
CREATE POLICY "Players own valor data" ON public.player_valor FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Players own quests" ON public.player_quests;
CREATE POLICY "Players own quests" ON public.player_quests FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Players own achievements" ON public.player_achievements;
CREATE POLICY "Players own achievements" ON public.player_achievements FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Players own mail" ON public.player_mail;
CREATE POLICY "Players own mail" ON public.player_mail FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_player_mining_player_id ON public.player_mining(player_id);
CREATE INDEX IF NOT EXISTS idx_player_castle_player_id ON public.player_castle(player_id);
CREATE INDEX IF NOT EXISTS idx_player_td_progress_player_id ON public.player_td_progress(player_id);
CREATE INDEX IF NOT EXISTS idx_player_valor_player_id ON public.player_valor(player_id);
CREATE INDEX IF NOT EXISTS idx_player_quests_player_id ON public.player_quests(player_id);
CREATE INDEX IF NOT EXISTS idx_player_achievements_player_id ON public.player_achievements(player_id);
CREATE INDEX IF NOT EXISTS idx_player_mail_player_id ON public.player_mail(player_id);
CREATE INDEX IF NOT EXISTS idx_player_mail_is_read ON public.player_mail(player_id, is_read);

-- Create updated_at triggers
SELECT public.create_updated_at_trigger('player_mining');
SELECT public.create_updated_at_trigger('player_castle');
SELECT public.create_updated_at_trigger('player_td_progress');
SELECT public.create_updated_at_trigger('player_valor');
SELECT public.create_updated_at_trigger('player_quests');

-- Migration 005 completed successfully