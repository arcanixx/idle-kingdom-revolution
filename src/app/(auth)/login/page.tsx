"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClient();

  async function handleLogin(e) {
    e.preventDefault(); setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message); else window.location.href = "/dashboard";
    setLoading(false);
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Idle Kingdom Revolution</h1>
        <h2 className="text-lg text-muted-foreground text-center">Sign in</h2>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-md border p-2" required />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-md border p-2" required />
          <button type="submit" disabled={loading} className="w-full rounded-md bg-primary text-primary-foreground p-2 font-medium">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Dont have an account? <Link href="/register" className="underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
