import { useEffect } from "react";
import { useGameStore } from "@/stores/game-store";

export function useGameData() {
  const isLoaded = useGameStore((s) => s.isLoaded);
  const setLoaded = useGameStore((s) => s.setLoaded);
  const fetchProfile = useGameStore((s) => s.fetchProfile);
  const fetchUnits = useGameStore((s) => s.fetchUnits);
  const fetchFormation = useGameStore((s) => s.fetchFormation);
  const fetchInventory = useGameStore((s) => s.fetchInventory);

  useEffect(() => {
    if (isLoaded) return;
    Promise.all([
      fetchProfile(),
      fetchUnits(),
      fetchFormation(),
      fetchInventory(),
    ]).then(() => setLoaded(true));
  }, [isLoaded, fetchProfile, fetchUnits, fetchFormation, fetchInventory, setLoaded]);
}
