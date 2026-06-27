import type { Unit, UnitClass, BattleField } from "@/types/game";
import { SeededRNG } from "@/lib/game/rng";

export interface CombatUnit {
  id: string;
  unit_id: string;
  name: string;
  class: UnitClass;
  rarity: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  row: number;
  col: number;
  isEnemy: boolean;
  isAlive: boolean;
  cooldowns: Record<string, number>;
}

export interface BattleState {
  fieldId: string;
  currentWave: number;
  totalWaves: number;
  turn: number;
  playerUnits: CombatUnit[];
  enemyUnits: CombatUnit[];
  log: string[];
  status: "active"|"victory"|"defeat";
  rewards: { gold: number; xp: number; };
  rng: SeededRNG;
}

function createEnemyTemplate(wave: number, index: number): { name: string; class: UnitClass; hp: number; attack: number; defense: number; speed: number; } {
  const scaler = 1 + wave * 0.15;
  const templates = [
    { name: "Goblin", class: "warrior" as UnitClass, hp: 40, attack: 8, defense: 4, speed: 100 },
    { name: "Wolf", class: "ranger" as UnitClass, hp: 30, attack: 12, defense: 3, speed: 130 },
    { name: "Skeleton", class: "warrior" as UnitClass, hp: 50, attack: 10, defense: 6, speed: 90 },
    { name: "Dark Elf", class: "ranger" as UnitClass, hp: 35, attack: 15, defense: 3, speed: 140 },
    { name: "Troll", class: "tank" as UnitClass, hp: 120, attack: 6, defense: 20, speed: 60 },
    { name: "Dark Mage", class: "mage" as UnitClass, hp: 40, attack: 18, defense: 3, speed: 110 },
  ];
  return { ...templates[index % templates.length], hp: Math.floor(templates[index % templates.length].hp * scaler), attack: Math.floor(templates[index % templates.length].attack * scaler), defense: Math.floor(templates[index % templates.length].defense * scaler) };
}

export function startBattle(field: BattleField, playerUnits: Unit[], formation: Record<"front"|"back", (any | null)[]>, seed?: string): BattleState {
  const rng = new SeededRNG(seed || (Date.now().toString() + Math.random().toString()));
  const combatUnits: CombatUnit[] = [];
  let idx = 0;
  for (const row of ["front","back"] as const) {
    for (let col = 0; col < 3; col++) {
      const cell = formation[row]?.[col];
      if (!cell) continue;
      const pu = playerUnits.find(u => u.unit_id === cell.unit_id);
      if (!pu || !pu.isActive) continue;
      combatUnits.push({
        id: pu.id,
        unit_id: pu.unit_id,
        name: pu.name,
        class: pu.class,
        rarity: pu.rarity || "common",
        hp: pu.hp,
        maxHp: pu.hp,
        attack: pu.attack,
        defense: pu.defense,
        speed: pu.speed,
        row: row === "front" ? 0 : 1,
        col,
        isEnemy: false,
        isAlive: true,
        cooldowns: {},
      });
      idx++;
    }
  }
  const state: BattleState = {
    fieldId: field.id,
    currentWave: 0,
    totalWaves: field.wave_count || 3,
    turn: 0,
    playerUnits: combatUnits,
    enemyUnits: [],
    log: ["Battle begins!"],
    status: "active",
    rewards: { gold: field.rewards?.gold || 50, xp: field.rewards?.xp || 30 },
    rng,
  };
  spawnWave(state, 1);
  return state;
}

export function spawnWave(state: BattleState, waveNum: number): void {
  state.currentWave = waveNum;
  state.enemyUnits = [];
  const enemyCount = Math.min(2 + waveNum, 6);
  const isBoss = waveNum % 5 === 0;
  for (let i = 0; i < enemyCount; i++) {
    const template = createEnemyTemplate(isBoss ? waveNum + 2 : waveNum, i);
    const bossMulti = isBoss ? 3 : 1;
    state.enemyUnits.push({
      id: "enemy_" + waveNum + "_" + i,
      unit_id: "enemy_" + i,
      name: (isBoss && i === 0 ? "BOSS " : "") + template.name,
      class: template.class,
      rarity: "common",
      hp: template.hp * bossMulti,
      maxHp: template.hp * bossMulti,
      attack: template.attack * bossMulti,
      defense: template.defense * bossMulti,
      speed: template.speed,
      row: i < 3 ? 0 : 1,
      col: i % 3,
      isEnemy: true,
      isAlive: true,
      cooldowns: {},
    });
  }
  state.log.push("--- Wave " + waveNum + (isBoss ? " (BOSS FIGHT!)" : "") + " ---");
  state.log.push(state.enemyUnits.length + " enemies appear");
}

export function processTick(state: BattleState): void {
  if (state.status !== "active") return;
  state.turn++;
  const allUnits = [...state.playerUnits.filter(u => u.isAlive), ...state.enemyUnits.filter(u => u.isAlive)];
  for (const unit of allUnits) {
    if (state.rng.next() * 100 > unit.speed * 0.3 + 10) continue;
    const targets = unit.isEnemy ? state.playerUnits.filter(u => u.isAlive) : state.enemyUnits.filter(u => u.isAlive);
    if (targets.length === 0) continue;
    const target = targets[Math.floor(state.rng.next() * targets.length)];
    const damage = Math.max(1, Math.floor(state.rng.next() * (unit.attack * 0.8)) + Math.floor(unit.attack * 0.2) - Math.floor(target.defense * 0.5));
    target.hp -= damage;
    if (!target.isAlive && target.hp <= 0) {
      target.isAlive = false;
      state.log.push(unit.name + " defeats " + target.name);
    } else if (damage > 0) {
      state.log.push(unit.name + " hits " + target.name + " for " + damage + " damage");
    }
  }
  const playerAlive = state.playerUnits.filter(u => u.isAlive);
  const enemyAlive = state.enemyUnits.filter(u => u.isAlive);
  if (playerAlive.length === 0) {
    state.status = "defeat";
    state.log.push("DEFEAT - All your units have fallen!");
    return;
  }
  if (enemyAlive.length === 0) {
    if (state.currentWave >= state.totalWaves) {
      state.status = "victory";
      state.log.push("VICTORY! All waves cleared!");
    } else {
      spawnWave(state, state.currentWave + 1);
    }
  }
}

