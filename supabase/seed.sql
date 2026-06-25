-- IKR Seed Data - Matches live Supabase schema

-- UNITS
INSERT INTO public.game_units(id,name,class,faction,rarity,base_hp,base_attack,base_defense,base_speed,description,is_active)VALUES
('unit_peasant','Peasant','warrior','human','common',100,15,20,100,'Basic infantry',true),('unit_archer','Archer','ranger','human','common',70,22,10,130,'Ranged unit',true),('unit_mage','Mage','mage','elf','rare',60,30,8,110,'Magic user',true),('unit_knight','Knight','tank','human','rare',200,10,40,80,'Heavy cavalry',true),('unit_healer','Priest','healer','human','uncommon',80,5,12,100,'Healing support',true)
ON CONFLICT(id)DO NOTHING;

