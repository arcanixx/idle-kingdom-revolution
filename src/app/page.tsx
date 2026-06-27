import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative bg-slate-900 bg-bg-mountains bg-cover bg-center bg-no-repeat"><div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      <header className="border-b bg-background/80 backdrop-blur-sm relative z-10">
        <div className="mx-auto max-w-4xl flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Idle Kingdom Revolution</h1>
          <nav className="flex gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">Sign in</Link>
            <Link href="/register" className="text-sm font-medium bg-primary text-primary-foreground px-3 py-1 rounded-md">Play now</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 relative z-10 text-white">
        <h2 className="text-4xl font-bold tracking-tight">Build Your Kingdom</h2>
        <p className="text-lg text-white/80 max-w-md">Tactical formation battles, idle progression, zero stamina gating.</p>
        <div className="flex gap-4">
          <Link href="/register" className="rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium text-lg">Play Now</Link>
          <Link href="/login" className="rounded-md border px-6 py-3 font-medium text-lg">Sign In</Link>
        </div>
        <div className="grid grid-cols-3 gap-6 pt-12 max-w-2xl">
          <div><h3 className="font-semibold">Tactical Battles</h3><p className="text-sm text-white/70">3x3 formation with synergies</p></div>
          <div><h3 className="font-semibold">Idle Progression</h3><p className="text-sm text-white/70">No energy system, play freely</p></div>
          <div><h3 className="font-semibold">Fair & Free</h3><p className="text-sm text-white/70">Cosmetic-only, zero P2W</p></div>
        </div>
      </main>
    </div>
  );
}



