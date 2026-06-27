import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayerProfile, Unit, Item } from "@/types/game";
import { logger } from "@/lib/logger";

interface FormationSlot {
  front: (Unit | null)[];
  back: (Unit | null)[];
}

interface GameState {
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;
  profile: PlayerProfile | null;
  setProfile: (profile: PlayerProfile) => void;
  fetchProfile: () => Promise<void>;
  units: Unit[];
  setUnits: (units: Unit[]) => void;
  fetchUnits: () => Promise<void>;
  formation: FormationSlot;
  setFormation: (f: FormationSlot) => void;
  fetchFormation: () => Promise<void>;
  inventory: Item[];
  setInventory: (items: Item[]) => void;
  fetchInventory: () => Promise<void>;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      isLoaded: false,
      setLoaded: (v: boolean) => set({ isLoaded: v }),
      profile: null,
      setProfile: (p) => set({ profile: p }),
      fetchProfile: async () => {
        try { const r = await fetch("/api/player/profile"); const d = await r.json(); if (r.ok) set({ profile: d }); } catch (err) { logger.error("Failed to fetch profile", "stores/game-store.ts", "fetchProfile", err); }
      },
      units: [],
      setUnits: (u) => set({ units: u }),
      fetchUnits: async () => {
        try { const r = await fetch("/api/player/units"); const d = await r.json(); if (d?.data && Array.isArray(d.data)) set({ units: d.data }); else if (Array.isArray(d)) set({ units: d }); } catch (err) { logger.error("Failed to fetch units", "stores/game-store.ts", "fetchUnits", err); }
      },
      formation: { front: [], back: [] },
      setFormation: (f) => set({ formation: f }),
      fetchFormation: async () => {
        try { const r = await fetch("/api/player/formation"); const d = await r.json(); if (d?.front || d?.data?.front) set({ formation: d.data || d }); } catch (err) { logger.error("Failed to fetch formation", "stores/game-store.ts", "fetchFormation", err); }
      },
      inventory: [],
      setInventory: (i) => set({ inventory: i }),
      fetchInventory: async () => {
        try { const r = await fetch("/api/player/inventory"); const d = await r.json(); if (d?.inventory && Array.isArray(d.inventory)) set({ inventory: d.inventory }); else if (Array.isArray(d)) set({ inventory: d }); } catch (err) { logger.error("Failed to fetch inventory", "stores/game-store.ts", "fetchInventory", err); }
      },
    }),
    {
      name: "ikr-game-store",
      partialize: (state) => ({ profile: state.profile, units: state.units, formation: state.formation, inventory: state.inventory }),
    }
  )
);

