"use client"
import { createBrowserClient } from "@supabase/ssr"
import { useState, useEffect } from "react"
import Link from "next/link"
import { logger } from "@/lib/logger"

export const dynamic = "force-dynamic"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [supabase, setSupabase] = useState<any>(null)
  useEffect(() => {
    if (!supabase) setSupabase(createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ))
  }, [])

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(null)
    if (!supabase) return
    try {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name } } })
      if (error) setError(error.message); else setError("Check your email!")
    } catch (err) {
      logger.error("Registration failed with exception", "(auth)/register/page.tsx", "handleRegister", err, { email })
      setError("An unexpected error occurred. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative bg-slate-900 bg-bg-forest bg-cover bg-center bg-no-repeat"><div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      <div className="w-full max-w-sm space-y-6 relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl border shadow-xl">
        <h1 className="text-2xl font-bold text-center">Idle Kingdom Revolution</h1>
        <h2 className="text-lg text-muted-foreground text-center">Create account</h2>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Display Name" value={name} onChange={e=> setName(e.target.value)} className="w-full rounded-md border p-2" />
          <input type="email" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)} className="w-full rounded-md border p-2" required />
          <input type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)} className="w-full rounded-md border p-2" required />
          <button type="submit" disabled={loading} className="w-full rounded-md bg-primary text-primary-foreground p-2 font-medium">{loading ? "Creating..." : "Create account"}</button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}



