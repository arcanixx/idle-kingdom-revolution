import { useGameStore } from "@/stores/game-store";
import { createClient } from "@/lib/supabase/client";
import { logger } from "@/lib/logger";

const SAVE_INTERVAL_MS = 30_000;
let saveTimer: ReturnType<typeof setInterval> | null = null;
let pendingSave = false;

export function startAutoSave(): void {
  if (saveTimer) return;
  saveTimer = setInterval(forceSave, SAVE_INTERVAL_MS);

  window.addEventListener("beforeunload", forceSave);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      forceSave();
    }
  });

  logger.info("Auto-save started", "src/lib/game/auto-save.ts", "startAutoSave");
}

export function stopAutoSave(): void {
  if (saveTimer) {
    clearInterval(saveTimer);
    saveTimer = null;
  }
  window.removeEventListener("beforeunload", forceSave);
  logger.info("Auto-save stopped", "src/lib/game/auto-save.ts", "stopAutoSave");
}

export async function forceSave(): Promise<void> {
  if (pendingSave) return;
  pendingSave = true;

  try {
    const state = useGameStore.getState();
    const profile = state.profile;
    if (!profile) {
      logger.warn("Cannot save: no profile", "src/lib/game/auto-save.ts", "forceSave");
      return;
    }

    const supabase = createClient();

    const { error } = await supabase
      .from("player_saves")
      .upsert({
        player_id: profile.id,
        save_data: state.toSerializable(),
        saved_at: new Date().toISOString(),
      });

    if (error) throw error;

    useGameStore.getState().setLastSaveTime(Date.now());
    logger.info("Game saved", "src/lib/game/auto-save.ts", "forceSave");
  } catch (error) {
    logger.error("Save failed", "src/lib/game/auto-save.ts", "forceSave", error);
  } finally {
    pendingSave = false;
  }
}
