-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $func$
DECLARE
  v_display_name TEXT;
  v_player_id UUID;
BEGIN
  v_display_name := COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1));
  INSERT INTO public.users (id, email, display_name)
  VALUES (NEW.id, NEW.email, v_display_name);
  INSERT INTO public.players (user_id, display_name)
  VALUES (NEW.id, v_display_name)
  RETURNING id INTO v_player_id;
  RETURN NEW;
END;
$func$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
