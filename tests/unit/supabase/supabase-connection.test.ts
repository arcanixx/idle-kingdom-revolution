import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';
describe('Supabase Connection', () => {
  it('SUPABASE_URL set', () => expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeTruthy());
  it('SUPABASE_ANON_KEY set', () => expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeTruthy());
  it('valid client', () => { const c=createClient('https://p.co','k'); expect(typeof c.from).toBe('function'); });
  it('query profiles', async () => {
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if(!url||!key) return;
    const {error}=await createClient(url,key).from('profiles').select('*',{count:'exact',head:true});
    expect(error===null||error?.code==='PGRST116'||error?.code==='42501').toBe(true);
  },10000);
});
