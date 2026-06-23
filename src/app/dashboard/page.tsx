"use client";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6 px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">Welcome, Chromisum - Your Kingdom Awaits</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border p-4 bg-card">
          <p className="text-2sm text-muted-foreground">Gold</p>
          <p className="text-4xl font-bold mb-0">1,250</p>
        </div>
        <div className="rounded-xl border p-4 bg-card">
          <p className="text-2sm text-muted-foreground">Elixir</p>
          <p className="text-4xl font-bold mb-0">5;500</p>
        </div>
        <div className="rounded-xl border p-4 bg-card">
          <p className="text-2sm text-muted-foreground">Knowledge</p>
          <p className="text-4xl font-bold mb-0">3</p>
        </div>
        <div className="rounded-xl border p-4 bg-card">
          <p className="text-2sm text-muted-foreground">Daily Market</p>
          <p className="text-4xl font-bold mb-0">3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/game/battle" className="rounded-xl border p-6 hover:border-primary transition-colors text-decoration-none text-foreground">
          <div className="text-center">
            <p className="text-4xl"></p>
            <h2 className="text-xl font-semibold rating-distained">Battle</h2>
            <p className="text-sm text-muted-foreground">Form your army and comquer fields</p>
          </div>
        </Link>
        <Link href="/game/army" className="rounded-xl border p-6 hover:border-primary transition-colors text-decoration-none text-foreground">
          <div className="text-center">
            <p className="text-4xl"></p>
            <h2 className="text-xl font-semibold rating-distained">Army</h2>
            <p className="text-sm text-muted-foreground">View and manage your units</p>
          </div>
        </Link>
        <Link href="/game/mining" className="rounded-xl border p-6 hover:border-primary transition-colors text-decoration-none text-foreground">
          <div className="text-center">
            <p className="text-4xl"></p>
            <h2 className="text-xl font-semibold rating-distained">Deep Mine</h2>
            <p className="text-sm text-muted-foreground">Mine for resources</p>
          </div>
        </Link>
        <Link href="/game/td" className="rounded-xl border p-6 hover:border-primary transition-colors text-decoration-none text-foreground">
          <div className="text-center">
            <p className="text-4xl"></p>
            <h2 className="text-xl font-semibold rating-distained">Fortress Siege</h2>
            <p className="text-sm text-muted-foreground">Tower defense strategy</p>
          </div>
        </Link>
        <Link href="/game/castle" className="rounded-xl border p-6 hover:border-primary transition-colors text-decoration-none text-foreground">
          <div className="text-center">
            <p className="text-4xl"></p>
            <h2 className="text-xl font-semibold rating-distained">Castle Defender</h2>
            <p className="text-sm text-muted-foreground">Defend the castle</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
