"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUser } from "@/hooks/use-user";
import { logger } from "@/lib/logger";

type AudioSettings = { musicVolume: number; sfxVolume: number; muted: boolean };
type GraphicSettings = { reducedMotion: boolean; lowQuality: boolean };

export default function SettingsPage() {
  const { user, loading } = useUser();
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [lang, setLang] = useState("en");
  const [audio, setAudio] = useState<AudioSettings>({ musicVolume: 70, sfxVolume: 80, muted: false });
  const [graphics, setGraphics] = useState<GraphicSettings>({ reducedMotion: false, lowQuality: false });
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      setDisplayName(user.user_metadata?.display_name || "");
    }
    try {
      const stored = localStorage.getItem("ikr_audio");
      if (stored) setAudio(JSON.parse(stored));
      const gstored = localStorage.getItem("ikr_graphics");
      if (gstored) setGraphics(JSON.parse(gstored));
    } catch { /* ignore */ }
  }, [user]);

  useEffect(() => {
    try { localStorage.setItem("ikr_audio", JSON.stringify(audio)); } catch { /* ignore */ }
  }, [audio]);

  useEffect(() => {
    try { localStorage.setItem("ikr_graphics", JSON.stringify(graphics)); } catch { /* ignore */ }
  }, [graphics]);

  async function saveProfile() {
    setSaving(true);
    try {
      await supabase.auth.updateUser({ data: { display_name: displayName } });
      await fetch("/api/player/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ display_name: displayName }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      logger.error("Failed to save settings", "app/settings/page.tsx", "saveProfile", err);
    }
    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8 px-4">
      <h1 className="text-3xl font-bold">Settings</h1>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold">Account</h2>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">Email: {user?.email}</p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full rounded-md border p-2 bg-background" />
            </div>
            <button onClick={saveProfile} disabled={saving} className="rounded-md bg-primary text-primary-foreground px-4 py-2 font-medium hover:opacity-90 disabled:opacity-50">
              {saving ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
          </>
        )}
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm">Theme</span>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Language</span>
          <select value={lang} onChange={e => setLang(e.target.value)} className="rounded-md border p-1 bg-background">
            <option value="en">English</option>
            <option value="pl">Polski</option>
          </select>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold">Audio</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Music Volume</span>
            <div className="flex items-center gap-2">
              <input type="range" min={0} max={100} value={audio.musicVolume} onChange={e => setAudio(a => ({ ...a, musicVolume: Number(e.target.value) }))} className="w-24" />
              <span className="text-xs w-6 text-right">{audio.musicVolume}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">SFX Volume</span>
            <div className="flex items-center gap-2">
              <input type="range" min={0} max={100} value={audio.sfxVolume} onChange={e => setAudio(a => ({ ...a, sfxVolume: Number(e.target.value) }))} className="w-24" />
              <span className="text-xs w-6 text-right">{audio.sfxVolume}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Muted</span>
            <input type="checkbox" checked={audio.muted} onChange={e => setAudio(a => ({ ...a, muted: e.target.checked }))} className="toggle" />
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold">Graphics</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Reduced Motion</span>
            <input type="checkbox" checked={graphics.reducedMotion} onChange={e => setGraphics(g => ({ ...g, reducedMotion: e.target.checked }))} className="toggle" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Low Quality Mode</span>
            <input type="checkbox" checked={graphics.lowQuality} onChange={e => setGraphics(g => ({ ...g, lowQuality: e.target.checked }))} className="toggle" />
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
        <p className="text-sm text-muted-foreground">Sign out of your account.</p>
        <button onClick={handleLogout} className="rounded-md bg-destructive text-destructive-foreground px-4 py-2 font-medium hover:opacity-90">
          Sign Out
        </button>
      </section>
    </div>
  );
}
