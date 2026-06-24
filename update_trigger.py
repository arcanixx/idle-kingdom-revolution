import re  
p = 'C:/Users/Administrator/GitHub/idle-kingdom-revolution/supabase/migrations/002_auth_triggers.sql'  
d = open(p, encoding='utf-8').read()  
old = """BEGIN\n  INSERT INTO public.users (id, email, display_name)\n  VALUES (\n    NEW.id,\n    NEW.email,\n    COALESCE(NEW.raw_user_meta_data ->> $$display_name$$, split_part(NEW.email, $$@$$, 1))\n  );\n  RETURN NEW;\nEND;"""  
new = """DECLARE\n  v_display_name TEXT;\n  v_player_id UUID;\nBEGIN\n  v_display_name := COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1));\n  INSERT INTO public.users (id, email, display_name)\n  VALUES (NEW.id, NEW.email, v_display_name);\n  INSERT INTO public.players (user_id, display_name)\n  VALUES (NEW.id, v_display_name)\n  RETURNING id INTO v_player_id;\n  RETURN NEW;\nEND;"""  
open(p, encoding='utf-8', mode='w').write(d.replace(old, new))  
print('Done') 
