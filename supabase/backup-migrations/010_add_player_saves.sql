-- Idle Kingdom Revolution - Migration 010
-- Add player_saves table for auto-save functionality

CREATE TABLE IF NOT EXISTS public.player_saves (
    player_id UUID PRIMARY KEY REFERENCES public.players(id) ON DELETE CASCADE,
    save_data JSONB NOT NULL,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.player_saves ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Players own saves" ON public.player_saves;
CREATE POLICY "Players own saves" ON public.player_saves
    FOR ALL
    USING (player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid()));

CREATE INDEX IF NOT EXISTS idx_player_saves_saved_at ON public.player_saves(saved_at DESC);
