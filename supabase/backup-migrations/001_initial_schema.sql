-- Idle Kingdom Revolution - Initial Schema
-- Migration 001

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  role TEXT DEFAULT 'player' CHECK (role IN ('player', 'moderator', 'admin', 'support')),
  is_banned BOOLEAN DEFAULT FALSE,
  ban_reason TEXT,
  banned_at TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.game_shops (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    name_pl TEXT,
    shop_type TEXT NOT NULL CHECK (shop_type IN ('general','premium','pvp','event','guild')),
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    refresh_interval_hours INT DEFAULT 24,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.game_achievements (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_pl TEXT,
    description TEXT,
    description_pl TEXT,
    category TEXT NOT NULL CHECK (category IN ('combat','progression','collection','social','special')),
    requirement_type TEXT NOT NULL,
    requirement_value INT NOT NULL,
    reward_valor INT DEFAULT 0,
    reward_gold INT DEFAULT 0,
    reward_item_id TEXT,
    reward_title TEXT,
    reward_frame TEXT,
    is_hidden BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);



CREATE TABLE IF NOT EXISTS public.players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    display_name TEXT,
    level INT DEFAULT 1 CHECK (level >= 1 AND level <= 999),
    xp BIGINT DEFAULT 0 CHECK (xp >= 0),
    gold BIGINT DEFAULT 1000 CHECK (gold >= 0),
    valor INT DEFAULT 0 CHECK (valor >= 0),
    gems INT DEFAULT 0 CHECK (gems >= 0),
    battle_coins INT DEFAULT 0 CHECK (battle_coins >= 0),
    highest_wave INT DEFAULT 0,
    highest_field_id INT DEFAULT 1,
    total_battles INT DEFAULT 0,
    total_wins INT DEFAULT 0,
    pvp_rating INT DEFAULT 1000,
    guild_id UUID,
    last_online_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PLAYER STATE TABLES
CREATE TABLE IF NOT EXISTS public.player_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    unit_id TEXT NOT NULL REFERENCES public.game_units(id),
    level INT DEFAULT 1 CHECK (level >= 1),
    xp INT DEFAULT 0,
    ascension_count INT DEFAULT 0,
    equipped_weapon_id TEXT REFERENCES public.game_items(id),
    equipped_armor_id TEXT REFERENCES public.game_items(id),
    equipped_accessory_id TEXT REFERENCES public.game_items(id),
    formation_row INT CHECK (formation_row BETWEEN 0 AND 2),
    formation_col INT CHECK (formation_col BETWEEN 0 AND 2),
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, unit_id)
);

CREATE TABLE IF NOT EXISTS public.player_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL REFERENCES public.game_items(id),
    quantity INT DEFAULT 1 CHECK (quantity > 0),
    is_equipped BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.player_quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    quest_id INT NOT NULL REFERENCES public.game_quests(id),
    status TEXT NOT NULL CHECK (status IN ('active','completed','claimed','expired')),
    progress JSONB DEFAULT '{}'::jsonb,
    accepted_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    claimed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, quest_id)
);

CREATE TABLE IF NOT EXISTS public.player_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL REFERENCES public.game_achievements(id),
    progress INT DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS public.player_valor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    tree_name TEXT NOT NULL CHECK (tree_name IN ('combat_mastery','economy_mastery','quality_of_life','kingdom_mastery')),
    perk_name TEXT NOT NULL,
    points_spent INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, tree_name, perk_name)
);

-- MINI-GAMES TABLES
CREATE TABLE IF NOT EXISTS public.player_mining (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE UNIQUE,
    mine_level INT DEFAULT 1 CHECK (mine_level >= 1),
    current_ore INT DEFAULT 0,
    expedition_unit_id UUID REFERENCES public.player_units(id),
    expedition_duration_minutes INT DEFAULT 30,
    expedition_started_at TIMESTAMPTZ,
    expedition_ends_at TIMESTAMPTZ,
    iron INT DEFAULT 0,
    crystals INT DEFAULT 0,
    deep_coins INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.player_td_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE UNIQUE,
    highest_wave INT DEFAULT 0 CHECK (highest_wave >= 0),
    current_wave INT DEFAULT 0 CHECK (current_wave >= 0),
    grid_data JSONB DEFAULT '[]'::jsonb,
    upgrades JSONB DEFAULT '{}'::jsonb,
    total_kills INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.player_castle (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE UNIQUE,
    castle_level INT DEFAULT 1 CHECK (castle_level >= 1),
    wall_level INT DEFAULT 1,
    gate_level INT DEFAULT 1,
    tower_level INT DEFAULT 1,
    moat_level INT DEFAULT 0,
    barracks_level INT DEFAULT 1,
    hp INT DEFAULT 1000,
    max_hp INT DEFAULT 1000,
    current_siege_wave INT DEFAULT 0,
    highest_siege_wave INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.player_daily_passes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    game_type TEXT NOT NULL CHECK (game_type IN ('mining','tower_defense','castle_defense')),
    passes_used INT DEFAULT 0 CHECK (passes_used >= 0),
    max_passes INT DEFAULT 3,
    last_reset_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, game_type)
);

-- BATTLE LOGS
CREATE TABLE IF NOT EXISTS public.battle_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    battle_type TEXT NOT NULL CHECK (battle_type IN ('campaign','tower','world_boss','pvp','guild_boss')),
    field_id INT,
    formation JSONB NOT NULL DEFAULT '{}'::jsonb,
    enemy_formation JSONB DEFAULT '{}'::jsonb,
    result TEXT NOT NULL CHECK (result IN ('victory','defeat','retreat')),
    waves_cleared INT DEFAULT 0,
    rewards JSONB DEFAULT '{}'::jsonb,
    duration_seconds INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SOCIAL TABLES
CREATE TABLE IF NOT EXISTS public.guilds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    tag TEXT NOT NULL UNIQUE,
    description TEXT,
    leader_id UUID NOT NULL REFERENCES public.players(id),
    level INT DEFAULT 1,
    xp INT DEFAULT 0,
    max_members INT DEFAULT 20,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.guild_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guild_id UUID NOT NULL REFERENCES public.guilds(id) ON DELETE CASCADE,
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' CHECK (role IN ('leader','officer','member')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(guild_id, player_id)
);

-- LEADERBOARD
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('highest_wave','total_power','tower_floor','pvp_rating','world_boss_damage','quest_completion','achievement_points','play_time')),
    season INT DEFAULT 1,
    score BIGINT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, category, season)
);

-- MAIL SYSTEM
CREATE TABLE IF NOT EXISTS public.player_mail (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    sender_type TEXT DEFAULT 'system' CHECK (sender_type IN ('system','admin','event')),
    sender_name TEXT DEFAULT 'System',
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    is_read BOOLEAN DEFAULT false,
    is_claimed BOOLEAN DEFAULT false,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ADMIN TABLES
CREATE TABLE IF NOT EXISTS public.admin_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES public.users(id),
    action_type TEXT NOT NULL CHECK (action_type IN ('resource_inject','ban','unban','config_change','broadcast','quest_create','event_schedule')),
    target_player_id UUID REFERENCES public.players(id),
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    code_type TEXT NOT NULL CHECK (code_type IN ('one_time','limited','recurring','admin')),
    max_uses INT,
    used_count INT DEFAULT 0,
    rewards JSONB NOT NULL DEFAULT '{}'::jsonb,
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_by UUID NOT NULL REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.player_promo_redeems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    promo_code_id UUID NOT NULL REFERENCES public.promo_codes(id),
    redeemed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, promo_code_id)
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_players_user_id ON public.players(user_id);
CREATE INDEX IF NOT EXISTS idx_players_guild_id ON public.players(guild_id);
CREATE INDEX IF NOT EXISTS idx_players_pvp_rating ON public.players(pvp_rating DESC);
CREATE INDEX IF NOT EXISTS idx_player_units_player_id ON public.player_units(player_id);
CREATE INDEX IF NOT EXISTS idx_player_inventory_player_id ON public.player_inventory(player_id);
CREATE INDEX IF NOT EXISTS idx_player_quests_player_id ON public.player_quests(player_id);
CREATE INDEX IF NOT EXISTS idx_player_achievements_player_id ON public.player_achievements(player_id);
CREATE INDEX IF NOT EXISTS idx_battle_logs_player_id ON public.battle_logs(player_id);
CREATE INDEX IF NOT EXISTS idx_battle_logs_created_at ON public.battle_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_cat_season_score ON public.leaderboard(category, season, score DESC);
CREATE INDEX IF NOT EXISTS idx_player_mail_player_id ON public.player_mail(player_id);

-- ROW LEVEL SECURITY
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_valor ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_mining ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_td_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_castle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_daily_passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guilds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_mail ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_promo_redeems ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
DROP POLICY IF EXISTS "Users own data" ON public.users;
CREATE POLICY "Users own data" ON public.users FOR ALL USING (
    auth.uid() = id OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','moderator'))
);

DROP POLICY IF EXISTS "Players own data" ON public.players;
CREATE POLICY "Players own data" ON public.players FOR ALL USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Player units own" ON public.player_units;
CREATE POLICY "Player units own" ON public.player_units FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Player inventory own" ON public.player_inventory;
CREATE POLICY "Player inventory own" ON public.player_inventory FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Player quests own" ON public.player_quests;
CREATE POLICY "Player quests own" ON public.player_quests FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Player achievements own" ON public.player_achievements;
CREATE POLICY "Player achievements own" ON public.player_achievements FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Player valor own" ON public.player_valor;
CREATE POLICY "Player valor own" ON public.player_valor FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Player mining own" ON public.player_mining;
CREATE POLICY "Player mining own" ON public.player_mining FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Player TD own" ON public.player_td_progress;
CREATE POLICY "Player TD own" ON public.player_td_progress FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Player castle own" ON public.player_castle;
CREATE POLICY "Player castle own" ON public.player_castle FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Player daily passes own" ON public.player_daily_passes;
CREATE POLICY "Player daily passes own" ON public.player_daily_passes FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Battle logs own" ON public.battle_logs;
CREATE POLICY "Battle logs own" ON public.battle_logs FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Player mail own" ON public.player_mail;
CREATE POLICY "Player mail own" ON public.player_mail FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

-- GAME CONFIG: PUBLIC READ
DROP POLICY IF EXISTS "Game config read" ON public.game_units;
CREATE POLICY "Game config read" ON public.game_units FOR SELECT USING (true);
DROP POLICY IF EXISTS "Game items read" ON public.game_items;
CREATE POLICY "Game items read" ON public.game_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Game fields read" ON public.game_battle_fields;
CREATE POLICY "Game fields read" ON public.game_battle_fields FOR SELECT USING (true);
DROP POLICY IF EXISTS "Game quests read" ON public.game_quests;
CREATE POLICY "Game quests read" ON public.game_quests FOR SELECT USING (true);
DROP POLICY IF EXISTS "Game shops read" ON public.game_shops;
CREATE POLICY "Game shops read" ON public.game_shops FOR SELECT USING (true);
DROP POLICY IF EXISTS "Game achievements read" ON public.game_achievements;
CREATE POLICY "Game achievements read" ON public.game_achievements FOR SELECT USING (true);

-- GUILDS
DROP POLICY IF EXISTS "Guilds members read" ON public.guilds;
CREATE POLICY "Guilds members read" ON public.guilds FOR SELECT USING (true);
DROP POLICY IF EXISTS "Guilds leader update" ON public.guilds;
CREATE POLICY "Guilds leader update" ON public.guilds FOR UPDATE USING (
    leader_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);
DROP POLICY IF EXISTS "Guild members read" ON public.guild_members;
CREATE POLICY "Guild members read" ON public.guild_members FOR SELECT USING (true);

-- LEADERBOARD
DROP POLICY IF EXISTS "Leaderboard public read" ON public.leaderboard;
CREATE POLICY "Leaderboard public read" ON public.leaderboard FOR SELECT USING (true);

-- ADMIN
DROP POLICY IF EXISTS "Admin actions admin only" ON public.admin_actions;
CREATE POLICY "Admin actions admin only" ON public.admin_actions FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- PROMO CODES
DROP POLICY IF EXISTS "Promo codes public read" ON public.promo_codes;
CREATE POLICY "Promo codes public read" ON public.promo_codes FOR SELECT USING (is_active = true);
DROP POLICY IF EXISTS "Promo codes admin" ON public.promo_codes;
CREATE POLICY "Promo codes admin" ON public.promo_codes FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Player promo own" ON public.player_promo_redeems;
CREATE POLICY "Player promo own" ON public.player_promo_redeems FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE user_id = auth.uid())
);

-- FUNCTIONS
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $func$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$func$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.create_updated_at_trigger(tbl TEXT)
RETURNS void AS $func$
BEGIN
    EXECUTE format('DROP TRIGGER IF EXISTS %I ON %I;', 'trg_' || tbl || '_updated_at', tbl);
    EXECUTE format('CREATE TRIGGER %I BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();', 'trg_' || tbl || '_updated_at', tbl);
END;
$func$ LANGUAGE plpgsql;

SELECT public.create_updated_at_trigger('users');
SELECT public.create_updated_at_trigger('players');
SELECT public.create_updated_at_trigger('player_units');
SELECT public.create_updated_at_trigger('player_inventory');
SELECT public.create_updated_at_trigger('player_quests');
SELECT public.create_updated_at_trigger('player_achievements');
SELECT public.create_updated_at_trigger('player_valor');
SELECT public.create_updated_at_trigger('player_mining');
SELECT public.create_updated_at_trigger('player_td_progress');
SELECT public.create_updated_at_trigger('player_castle');
SELECT public.create_updated_at_trigger('player_daily_passes');
SELECT public.create_updated_at_trigger('guilds');

CREATE OR REPLACE FUNCTION public.calculate_unit_power(p_unit_id TEXT, p_level INT, p_equipment JSONB DEFAULT '{}'::jsonb)
RETURNS INT AS $func$
DECLARE
    v_base_hp INT; v_base_attack INT; v_base_defense INT; v_base_speed INT; v_power INT;
BEGIN
    SELECT base_hp, base_attack, base_defense, base_speed
    INTO v_base_hp, v_base_attack, v_base_defense, v_base_speed
    FROM public.game_units WHERE id = p_unit_id;
    v_power := ((v_base_hp * 0.5) + (v_base_attack * 2) + (v_base_defense * 1.5) + (v_base_speed * 0.01))::INT;
    v_power := (v_power * (1 + p_level * 0.1))::INT;
    IF p_equipment->>'weapon_attack' IS NOT NULL THEN v_power := v_power + (p_equipment->>'weapon_attack')::INT * 2; END IF;
    IF p_equipment->>'armor_defense' IS NOT NULL THEN v_power := v_power + (p_equipment->>'armor_defense')::INT * 1.5; END IF;
    RETURN v_power;
END;
$func$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.claim_offline_earnings(p_player_id UUID)
RETURNS JSONB AS $func$
DECLARE
    v_last_online TIMESTAMPTZ; v_hours_offline FLOAT; v_cap_hours INT;
    v_gold_earned BIGINT; v_highest_wave INT;
BEGIN
    SELECT last_online_at, offline_earnings_cap_hours, highest_wave
    INTO v_last_online, v_cap_hours, v_highest_wave FROM public.players WHERE id = p_player_id;
    v_hours_offline := LEAST(EXTRACT(EPOCH FROM (NOW() - v_last_online)) / 3600, v_cap_hours::FLOAT);
    v_gold_earned := (v_highest_wave * 10 * v_hours_offline)::BIGINT;
    UPDATE public.players SET gold = gold + v_gold_earned, last_online_at = NOW() WHERE id = p_player_id;
    RETURN jsonb_build_object('hours_offline', v_hours_offline, 'gold_earned', v_gold_earned, 'capped', v_hours_offline >= v_cap_hours);
END;
$func$ LANGUAGE plpgsql SECURITY DEFINER;
