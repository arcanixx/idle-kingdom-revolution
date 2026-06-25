import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayerProfile, Unit, Formation, BattleResultData, Item } from "@/types/game";

interface GameState {
  profile: PlayerProfile | null;
  setProfile: (profile: PlayerProfile) => void;
  units: Unit[];
  setUnits: (units: Unit[]) => void;
  addUnit: (unit: Unit) => void;
  updateUnit: (id: string, unit: Partial<Unit>) => void;
  formation: Formation;
  setFormation: (formation: Formation) => void;
  inventory: Item[];
  setInventory: (items: Item[]) => void;
  currentBattle: BattleResultData | null;
  setCurrentBattle: (battle: BattleResultData | null) => void;
  battleSpeed: 1 | 2 | 3;
  setBattleSpeed: (speed: 1 | 2 | 3) => void;
  isBattleRunning: boolean;
  setBattleRunning: (running: boolean) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      profile: null, setProfile: (p) => set({ profile: p }),
      units: [], setUnits: (u) => set({ units: u }),
      addUnit: (u) => set((s) => ({ units: [...s.units, u] })),
      updateUnit: (id, updates) => set((s) => ({ units: s.units.map((u) => u.id === id ? { ...u, ...updates } : u) })),
      formation: { front: [], back: [] }, setFormation: (f) => set({ formation: f }),
      inventory: [], setInventory: (i) => set({ inventory: i }),
      currentBattle: null, setCurrentBattle: (b) => set({ currentBattle: b }),
      battleSpeed: 1, setBattleSpeed: (s) => set({ battleSpeed: s }),
      isBattleRunning: false, setBattleRunning: (r) => set({ isBattleRunning: r }),
    }),
    { name: "ikr-game-store", partialize: (state) => ({ profile: state.profile, units: state.units, formation: state.formation, inventory: state.inventory, battleSpeed: state.battleSpeed }) }
  )
);
