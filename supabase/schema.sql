-- IKR Reference Schema (docs only)
-- See backup-migrations/ for full DDL

CREATE TABLE public.game_units (
  id TEXT PK,
  name TEXT, class TEXT, faction TEXT, rarity TEXT,
  base_hp INT, base_attack INT, base_defense INT, base_speed INT,
  growth_hp NUMERIC, growth_attack NUMERIC, growth_defense NUMERIC,
  skill_data JSONB, synergies JSONB,
  is_active BOOL, icon TEXT, type TEXT,
  attack INT, defense INT, health INT, cost INT,
  description TEXT, is_summonable BOOL,
  created_at TIMESTAMPTZ
);

-- Full schema in backup-migrations/001_initial_schema.sql
