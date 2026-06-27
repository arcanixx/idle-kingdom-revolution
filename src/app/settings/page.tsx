"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUser } from "@/hooks/use-user";
import { logger } from "@/lib/logger";
import { useToast } from "@/components/Toast";
import { Tooltip } from "@/components/Tooltip";

type AudioSettings = { musicVolume: number; sfxVolume: number; muted: boolean };
type GraphicSettings = { reducedMotion: boolean; lowQuality: boolean };

export default function SettingsPage() {
  const { user, loading } = useUser();
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [audio, setAudio] = useState<AudioSettings>({ musicVolume: 70, sfxVolume: 80, muted: false });
  const [graphics, setGraphics] = useState<GraphicSettings>({ reducedMotion: false, lowQuality: false });
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();
  const [prevAudio, setPrevAudio] = useState<AudioSettings | null>(null);
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
      toast("Settings saved!", "success");
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      logger.error("Failed to save settings", "app/settings/page.tsx", "saveProfile", err);
    }
    setSaving(false);
  }

  async function handleLogout() {
    toast("Signed out successfully", "info");
    setShowConfirm(false);
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8 px-4">
      <nav className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
          <a href="/dashboard" className="hover:text-foreground">Home</a>
          <span>/</span>
          <span className="text-foreground">Settings</span>
        </nav>
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
              <div className="relative">
              <input type="text" value={displayName} onChange={e => { const v = e.target.value; if (v.length <= 50) setDisplayName(v); }} placeholder="e.g. KnightOfLight" maxLength={50} className="w-full rounded-md border p-2 bg-background pr-8" />
              {displayName && <button onClick={() => setDisplayName("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-sm">&times;</button>}
            </div>
            <p className="text-xs text-muted-foreground">4-50 characters, letters/numbers/spaces/hyphens only</p>
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
            <input type="checkbox" checked={audio.muted} onChange={e => { const ch = e.target.checked; if (ch) { setPrevAudio(audio); setAudio(a => ({ ...a, muted: true, musicVolume: 0, sfxVolume: 0 })); } else { setAudio(a => ({ ...a, muted: false, musicVolume: prevAudio?.musicVolume || 70, sfxVolume: prevAudio?.sfxVolume || 80 })); setPrevAudio(null); } }} className="toggle" />
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold">Graphics</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Tooltip text="Disables animations and transitions for smoother experience on slow devices"><span className="text-sm cursor-help border-b border-dotted border-muted-foreground">Reduced Motion</span></Tooltip>
            <input type="checkbox" checked={graphics.reducedMotion} onChange={e => setGraphics(g => ({ ...g, reducedMotion: e.target.checked }))} className="toggle" />
          </div>
          <div className="flex items-center justify-between">
            <Tooltip text="Lowers visual quality to improve performance on older hardware"><span className="text-sm cursor-help border-b border-dotted border-muted-foreground">Low Quality Mode</span></Tooltip>
            <input type="checkbox" checked={graphics.lowQuality} onChange={e => setGraphics(g => ({ ...g, lowQuality: e.target.checked }))} className="toggle" />
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-destructive">Account Actions</h2>
        <p className="text-sm text-muted-foreground">Sign out of your account.</p>
        {!showConfirm ? (
          <button onClick={() => setShowConfirm(true)} className="rounded-md bg-destructive text-destructive-foreground px-4 py-2 font-medium hover:opacity-90">
            Sign Out
          </button>
        ) : (
          <div className="flex items-center gap-2 p-3 border border-destructive rounded-lg bg-destructive/5">
            <p className="text-sm text-destructive font-medium">Are you sure?</p>
            <button onClick={handleLogout} className="rounded-md bg-destructive text-destructive-foreground px-3 py-1.5 text-sm font-medium hover:opacity-90">Yes, Sign Out</button>
            <button onClick={() => setShowConfirm(false)} className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted">Cancel</button>
          </div>
        )}
      </section>
    </div>
  );
}
