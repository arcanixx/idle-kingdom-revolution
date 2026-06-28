"use client";

import { useCallback, useRef } from "react";
import { useGameStore } from "@/stores/game-store";
import type { Unit } from "@/types/game";
import { logger } from "@/lib/logger";

const ROWS = 2;
const COLS = 4;

export function FormationGrid() {
  const formation = useGameStore((s) => s.formation);
  const setFormation = useGameStore((s) => s.setFormation);
  const units = useGameStore((s) => s.units);
  const dragUnitRef = useRef<Unit | null>(null);

  const handleDragStart = useCallback((unit: Unit) => {
    dragUnitRef.current = unit;
  }, []);

  const handleDrop = useCallback((rowIdx: number, colIdx: number) => {
    const dragged = dragUnitRef.current;
    if (!dragged) return;

    const slotKey = rowIdx === 0 ? "front" : "back";
    const newSlots = [...formation[slotKey]];

    const existingIdx = newSlots.findIndex(
      (s) => s?.unit_id === dragged.unit_id
    );
    if (existingIdx !== -1) {
      newSlots[existingIdx] = null;
    }
    newSlots[colIdx] = units.find((u) => u.unit_id === dragged.unit_id) ?? null;
    setFormation({ ...formation, [slotKey]: newSlots });
    dragUnitRef.current = null;

    logger.info("Unit placed in formation", "components/game/FormationGrid.tsx", "handleDrop", { unitId: dragged.unit_id, row: rowIdx, col: colIdx });
  }, [formation, setFormation]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const getUnitForCell = (rowIdx: number, colIdx: number): Unit | undefined => {
    const slotKey = rowIdx === 0 ? "front" : "back";
    const cell = formation[slotKey]?.[colIdx];
    if (!cell) return undefined;
    return units.find((u) => u.unit_id === cell.unit_id);
  };

  const getSlotLabel = (rowIdx: number): string => {
    return rowIdx === 0 ? "Front Line" : "Back Line";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1].map((rowIdx) => (
          <div key={rowIdx} className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">{getSlotLabel(rowIdx)}</h3>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(" + COLS + ", 1fr)" }}
            >
              {Array.from({ length: COLS }).map((_, colIdx) => {
                const unit = getUnitForCell(rowIdx, colIdx);
                return (
                  <div
                    key={colIdx}
                    onDrop={() => handleDrop(rowIdx, colIdx)}
                    onDragOver={handleDragOver}
                    className={
                      "aspect-square rounded-lg border-2 border-dashed flex items-center justify-center transition-colors " +
                      (unit
                        ? "border-primary/50 bg-primary/5"
                        : "border-muted-foreground/20 bg-muted/30 hover:border-muted-foreground/40")
                    }
                  >
                    {unit ? (
                      <div className="text-center p-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 text-lg">
                          {unit.name.charAt(0)}
                        </div>
                        <p className="text-xs font-medium truncate">{unit.name}</p>
                        <p className="text-[10px] text-muted-foreground">Lv.{unit.level}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Empty</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Your Units</h3>
        {units.length === 0 ? (
          <p className="text-sm text-muted-foreground">No units available.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {units.filter((u) => u.isActive).map((unit) => (
              <div
                key={unit.id}
                draggable
                onDragStart={() => handleDragStart(unit)}
                className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm cursor-grab active:cursor-grabbing hover:bg-muted transition-colors"
              >
                {unit.name} (Lv.{unit.level})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
