"use client";
import { useState } from "react";

const SAMPLE_UNITS = [
  { id: "warrior_01", name: "Footman", class: "Warrior", level: 5, power: 320, faction: "Human" },
  { id: "archer_03", name: "Longbowman", class: "Ranger", level: 3, power: 280, faction: "Human" },
  { id: "mage_02", name: "Apprentice", class: "Mage", level: 2, power: 240, faction: "Elf" },
  { id: "tank_01", name: "Knight", class: "Tank", level: 1, power: 200, faction: "Human" },
  { id: "healer_01", name: "Priest", class: "Healer", level: 1, power: 150, faction: "Human" },
];

export default function ArmyPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">\uD83D\uDEE1 Army</h1>
      <p className="text-sm text-muted-foreground">Total Power: 1,190</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-3">Your Units</h2>
          <div className="space-y-2">
            {SAMPLE_UNITS.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelected(u.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selected === u.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.class} \u00B7 {u.faction} \u00B7 Lv.{u.level}</p>
                  </div>
                  <p className="text-sm font-mono">{u.power}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-3">Formation (3x3)</h2>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg border border-dashed flex items-center justify-center text-xs text-muted-foreground">
                {i === 4 ? "\uD83D\uDEE1" : ""}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Drag units onto the grid to form your battle line</p>
        </div>
      </div>
    </div>
  );
}
