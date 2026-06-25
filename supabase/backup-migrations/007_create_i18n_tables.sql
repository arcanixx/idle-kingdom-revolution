-- Idle Kingdom Revolution - Migration 007
-- Create proper i18n tables, migrate data safely, remove legacy _pl columns

-- ============================================================================
-- STEP 1: CREATE I18N TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.game_units_i18n (
    unit_id TEXT NOT NULL REFERENCES public.game_units(id) ON DELETE CASCADE,
    lang TEXT NOT NULL CHECK (lang IN ('en', 'pl')),
    name TEXT NOT NULL,
    description TEXT,
    PRIMARY KEY (unit_id, lang)
);

CREATE TABLE IF NOT EXISTS public.game_items_i18n (
    item_id TEXT NOT NULL REFERENCES public.game_items(id) ON DELETE CASCADE,
    lang TEXT NOT NULL CHECK (lang IN ('en', 'pl')),
    name TEXT NOT NULL,
    description TEXT,
    PRIMARY KEY (item_id, lang)
);

CREATE TABLE IF NOT EXISTS public.game_quests_i18n (
    quest_id INTEGER NOT NULL REFERENCES public.game_quests(id) ON DELETE CASCADE,
    lang TEXT NOT NULL CHECK (lang IN ('en', 'pl')),
    title TEXT NOT NULL,
    description TEXT,
    PRIMARY KEY (quest_id, lang)
);

CREATE TABLE IF NOT EXISTS public.game_battle_fields_i18n (
    field_id TEXT NOT NULL REFERENCES public.game_battle_fields(id) ON DELETE CASCADE,
    lang TEXT NOT NULL CHECK (lang IN ('en', 'pl')),
    name TEXT NOT NULL,
    description TEXT,
    PRIMARY KEY (field_id, lang)
);

-- ============================================================================
-- STEP 2: MIGRATE DATA
-- ============================================================================

-- Migrate game_units (has name + description)
INSERT INTO public.game_units_i18n (unit_id, lang, name, description)
SELECT id, 'en', name, description FROM public.game_units WHERE name IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO public.game_units_i18n (unit_id, lang, name, description)
SELECT id, 'pl', name_pl, description_pl FROM public.game_units WHERE name_pl IS NOT NULL
ON CONFLICT DO NOTHING;

-- Migrate game_items (has name + description)
INSERT INTO public.game_items_i18n (item_id, lang, name, description)
SELECT id, 'en', name, description FROM public.game_items WHERE name IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO public.game_items_i18n (item_id, lang, name, description)
SELECT id, 'pl', name_pl, description_pl FROM public.game_items WHERE name_pl IS NOT NULL
ON CONFLICT DO NOTHING;

-- Migrate game_quests (has title + description)
INSERT INTO public.game_quests_i18n (quest_id, lang, title, description)
SELECT id, 'en', title, description FROM public.game_quests WHERE title IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO public.game_quests_i18n (quest_id, lang, title, description)
SELECT id, 'pl', title_pl, description_pl FROM public.game_quests WHERE title_pl IS NOT NULL
ON CONFLICT DO NOTHING;

-- Migrate game_battle_fields (has name + description)
INSERT INTO public.game_battle_fields_i18n (field_id, lang, name, description)
SELECT id, 'en', name, description FROM public.game_battle_fields WHERE name IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO public.game_battle_fields_i18n (field_id, lang, name, description)
SELECT id, 'pl', name_pl, description_pl FROM public.game_battle_fields WHERE name_pl IS NOT NULL
ON CONFLICT DO NOTHING;

-- Migrate game_shops (has ONLY name + name_pl, NO description!)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_shops') THEN
        CREATE TABLE IF NOT EXISTS public.game_shops_i18n (
            shop_id INTEGER NOT NULL REFERENCES public.game_shops(id) ON DELETE CASCADE,
            lang TEXT NOT NULL CHECK (lang IN ('en', 'pl')),
            name TEXT NOT NULL,
            description TEXT,
            PRIMARY KEY (shop_id, lang)
        );
        ALTER TABLE public.game_shops_i18n ENABLE ROW LEVEL SECURITY;

        -- Migrate English (no description column in game_shops)
        INSERT INTO public.game_shops_i18n (shop_id, lang, name, description)
        SELECT id, 'en', name, NULL FROM public.game_shops WHERE name IS NOT NULL
        ON CONFLICT DO NOTHING;

        -- Migrate Polish (only name_pl, no description_pl)
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_shops' AND column_name = 'name_pl') THEN
            INSERT INTO public.game_shops_i18n (shop_id, lang, name, description)
            SELECT id, 'pl', name_pl, NULL FROM public.game_shops WHERE name_pl IS NOT NULL
            ON CONFLICT DO NOTHING;
        END IF;

        CREATE POLICY "Game shops i18n read" ON public.game_shops_i18n FOR SELECT USING (true);
        CREATE POLICY "Game shops i18n write" ON public.game_shops_i18n FOR ALL USING (auth.uid() IS NOT NULL);
        CREATE INDEX IF NOT EXISTS idx_game_shops_i18n_lang ON public.game_shops_i18n(lang);
    END IF;
END $$;

-- Migrate game_achievements (if exists, check structure)
DO $$
DECLARE
    has_desc BOOLEAN;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_achievements') THEN
        CREATE TABLE IF NOT EXISTS public.game_achievements_i18n (
            achievement_id TEXT NOT NULL REFERENCES public.game_achievements(id) ON DELETE CASCADE,
            lang TEXT NOT NULL CHECK (lang IN ('en', 'pl')),
            name TEXT NOT NULL,
            description TEXT,
            PRIMARY KEY (achievement_id, lang)
        );
        ALTER TABLE public.game_achievements_i18n ENABLE ROW LEVEL SECURITY;

        -- Check if description exists
        SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_achievements' AND column_name = 'description') INTO has_desc;

        IF has_desc THEN
            INSERT INTO public.game_achievements_i18n (achievement_id, lang, name, description)
            SELECT id, 'en', name, description FROM public.game_achievements WHERE name IS NOT NULL
            ON CONFLICT DO NOTHING;
        ELSE
            INSERT INTO public.game_achievements_i18n (achievement_id, lang, name, description)
            SELECT id, 'en', name, NULL FROM public.game_achievements WHERE name IS NOT NULL
            ON CONFLICT DO NOTHING;
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_achievements' AND column_name = 'name_pl') THEN
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_achievements' AND column_name = 'description_pl') THEN
                INSERT INTO public.game_achievements_i18n (achievement_id, lang, name, description)
                SELECT id, 'pl', name_pl, description_pl FROM public.game_achievements WHERE name_pl IS NOT NULL
                ON CONFLICT DO NOTHING;
            ELSE
                INSERT INTO public.game_achievements_i18n (achievement_id, lang, name, description)
                SELECT id, 'pl', name_pl, NULL FROM public.game_achievements WHERE name_pl IS NOT NULL
                ON CONFLICT DO NOTHING;
            END IF;
        END IF;

        CREATE POLICY "Game achievements i18n read" ON public.game_achievements_i18n FOR SELECT USING (true);
        CREATE POLICY "Game achievements i18n write" ON public.game_achievements_i18n FOR ALL USING (auth.uid() IS NOT NULL);
        CREATE INDEX IF NOT EXISTS idx_game_achievements_i18n_lang ON public.game_achievements_i18n(lang);
    END IF;
END $$;

-- ============================================================================
-- STEP 3: RLS & INDEXES FOR MAIN I18N TABLES
-- ============================================================================

ALTER TABLE public.game_units_i18n ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_items_i18n ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_quests_i18n ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_battle_fields_i18n ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Game units i18n read" ON public.game_units_i18n FOR SELECT USING (true);
CREATE POLICY "Game units i18n write" ON public.game_units_i18n FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Game items i18n read" ON public.game_items_i18n FOR SELECT USING (true);
CREATE POLICY "Game items i18n write" ON public.game_items_i18n FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Game quests i18n read" ON public.game_quests_i18n FOR SELECT USING (true);
CREATE POLICY "Game quests i18n write" ON public.game_quests_i18n FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Game battle fields i18n read" ON public.game_battle_fields_i18n FOR SELECT USING (true);
CREATE POLICY "Game battle fields i18n write" ON public.game_battle_fields_i18n FOR ALL USING (auth.uid() IS NOT NULL);

CREATE INDEX IF NOT EXISTS idx_game_units_i18n_lang ON public.game_units_i18n(lang);
CREATE INDEX IF NOT EXISTS idx_game_items_i18n_lang ON public.game_items_i18n(lang);
CREATE INDEX IF NOT EXISTS idx_game_quests_i18n_lang ON public.game_quests_i18n(lang);
CREATE INDEX IF NOT EXISTS idx_game_battle_fields_i18n_lang ON public.game_battle_fields_i18n(lang);

-- ============================================================================
-- STEP 4: DROP LEGACY _pl COLUMNS
-- ============================================================================

ALTER TABLE public.game_units DROP COLUMN IF EXISTS name_pl;
ALTER TABLE public.game_units DROP COLUMN IF EXISTS description_pl;
ALTER TABLE public.game_items DROP COLUMN IF EXISTS name_pl;
ALTER TABLE public.game_items DROP COLUMN IF EXISTS description_pl;
ALTER TABLE public.game_quests DROP COLUMN IF EXISTS title_pl;
ALTER TABLE public.game_quests DROP COLUMN IF EXISTS description_pl;
ALTER TABLE public.game_battle_fields DROP COLUMN IF EXISTS name_pl;
ALTER TABLE public.game_battle_fields DROP COLUMN IF EXISTS description_pl;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_shops') THEN
        ALTER TABLE public.game_shops DROP COLUMN IF EXISTS name_pl;
        -- game_shops nie ma description_pl
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_achievements') THEN
        ALTER TABLE public.game_achievements DROP COLUMN IF EXISTS name_pl;
        ALTER TABLE public.game_achievements DROP COLUMN IF EXISTS description_pl;
    END IF;
END $$;

-- Migration 007 completed successfully