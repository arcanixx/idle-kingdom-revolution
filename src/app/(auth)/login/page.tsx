"use client"
import { createBrowserClient } from "@supabase/ssr";
import { useState, useEffect } from "react";
import Link from "next/link";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestDisabled, setGuestDisabled] = useState(false);

  const [supabase, setSupabase] = useState<any>(null);
  useEffect(() => {
    if (!supabase) setSupabase(createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(null);
    if (!supabase) { setError("Auth service initializing..."); setLoading(false); return; }
    try {
      const r = await supabase.auth.signInWithPassword({ email, password });
      if (r.error) { setError(r.error.message); if (r.error.message.includes("Anonymous")) setGuestDisabled(true); } else window.location.href = "/dashboard";
    } catch (err) {
      logger.error("Login failed with exception", "(auth)/login/page.tsx", "handleLogin", err, { email });
      setError("An unexpected error occurred. Please try again.");
    }
    setLoading(false);
  }

  async function handleForgotPassword() {
    if (!supabase) { setError("Auth service initializing..."); return; }
    try {
      const r = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/auth/callback?type=recovery",
      });
      if (r.error) setError(r.error.message); else setError("Check your email for the reset link.");
    } catch (err) {
      logger.error("Forgot password failed", "(auth)/login/page.tsx", "handleForgotPassword", err, { email });
      setError("An unexpected error occurred.");
    }
  }

  async function handleGuestLogin() {
    setLoading(true);
    if (!supabase) { setLoading(false); return; }
    try {
      const r = await supabase.auth.signInAnonymously();
      if (r.error) { setError(r.error.message); if (r.error.message.includes("Anonymous")) setGuestDisabled(true); } else window.location.href = "/dashboard";
    } catch (err) {
      logger.error("Guest login failed", "(auth)/login/page.tsx", "handleGuestLogin", err);
      setError("An unexpected error occurred.");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative bg-slate-900 bg-bg-forest bg-cover bg-center bg-no-repeat"><div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      <div className="w-full max-w-sm space-y-6 relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl border shadow-xl">
        <h1 className="text-2xl font-bold text-center">Idle Kingdom Revolution</h1>
        <h2 className="text-lg text-muted-foreground text-center">Sign in</h2>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)} className="w-full rounded-md border p-2" required />
          <input type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)} className="w-full rounded-md border p-2" required />
          <button type="submit" disabled={loading} className="w-full rounded-md bg-primary text-primary-foreground p-2 font-medium">
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <div className="flex items-center justify-between text-sm">
            <button type="button" onClick={handleForgotPassword} className="text-muted-foreground hover:text-foreground underline">Forgot password?</button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <button onClick={handleGuestLogin} disabled={loading || guestDisabled} className="w-full rounded-md border border-border p-2 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Continue as Guest
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Dont have an account? <Link href="/register" className="underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}



