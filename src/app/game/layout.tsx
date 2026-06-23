"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GameLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const tabs = [
    { href: "/game/battle", label: "Battle", icon: "\u2694" },
    { href: "/game/army", label: "Army", icon: "\uD83D\uDEE1" },
    { href: "/game/mining", label: "Mine", icon: "\u26CF" },
    { href: "/game/td", label: "TD", icon: "\uD83C\uDFF0" },
    { href: "/game/castle", label: "Castle", icon: "\uD83C\uDFF0" },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-card">
        <div className="mx-auto max-w-4xl flex items-center gap-2 p-2 overflow-x-auto">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                path === t.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t.icon} {t.label}
            </Link>
          ))}
          <Link href="/dashboard" className="ml-auto text-sm text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
        </div>
      </nav>
      <main className="flex-1 mx-auto max-w-4xl w-full p-4">{children}</main>
    </div>
  );
}
