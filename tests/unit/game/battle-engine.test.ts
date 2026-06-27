import { describe, it, expect } from "vitest";
import { startBattle, processTick, spawnWave } from '../../../src/lib/game/battle-engine';
import type { BattleField, Unit } from '../../../src/types/game';

describe('Battle Engine', () => {
  const baseField: BattleField = {
    id: "test_field", name: 'Test', description: 'Test field', difficulty: 1,
    wave_count: 3, boss_wave: 5, recommended_power: 100,
    rewards: { gold: 10, xp: 5 }, is_locked: false
  };
  const baseUnits: Unit[] = [{
    id: '1', unit_id: 'a', name: 'A', class: 'warrior', faction: 'human', rarity: 'common', level: 1,
    hp: 100, attack: 10, defense: 5, speed: 10, power_rating: 50, isActive: true,
    equipment: {}, xp: 0
  }];

  describe('startBattle', () => {
    it('initializes state with correct wave count', () => {
      const state = startBattle(baseField, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      expect(state.currentWave).toBe(1);
      expect(state.totalWaves).toBe(3);
      expect(state.status).toBe('active');
    });

    it('handles empty formation', () => {
      const state = startBattle(baseField, baseUnits, { front: [null, null, null], back: [null, null, null] });
      expect(state.playerUnits).toHaveLength(0);
    });

    it('filters out inactive units', () => {
      const inactiveUnits = [{ ...baseUnits[0], isActive: false }];
      const state = startBattle(baseField, inactiveUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      expect(state.playerUnits).toHaveLength(0);
    });

    it('sets default rewards when not provided', () => {
      const fieldNoRewards = { ...baseField, id: "2", rewards: null as any };
      const state = startBattle(fieldNoRewards, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      expect(state.rewards.gold).toBe(50);
      expect(state.rewards.xp).toBe(30);
    });

    it('handles null formation cells', () => {
      const state = startBattle(baseField, baseUnits, { front: [null, { unit_id: 'a', row: 0, col: 1 }], back: [null, null, null] });
      expect(state.playerUnits).toHaveLength(1);
    });
  });

  describe('processTick', () => {
    it('does nothing when battle is not active', () => {
      const state = startBattle(baseField, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      state.status = 'victory';
      processTick(state);
      expect(state.turn).toBe(0);
    });

    it('handles defeat when all player units die', () => {
      const state = startBattle(baseField, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      state.playerUnits[0].hp = 0;
      state.playerUnits[0].isAlive = false;
      processTick(state);
      expect(state.status).toBe('defeat');
    });

    it('handles victory when all enemies die on final wave', () => {
      const state = startBattle(baseField, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      state.enemyUnits = [];
      state.currentWave = 3;
      processTick(state);
      expect(state.status).toBe('victory');
    });

    it('spawns next wave when current wave cleared', () => {
      const state = startBattle(baseField, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      state.enemyUnits = [];
      processTick(state);
      expect(state.currentWave).toBe(2);
      expect(state.status).toBe('active');
    });

    it('increments turn counter', () => {
      const state = startBattle(baseField, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      processTick(state);
      expect(state.turn).toBe(1);
    });
  });

  describe('spawnWave', () => {
    it('spawns correct number of enemies', () => {
      const state = startBattle(baseField, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      spawnWave(state, 2);
      expect(state.enemyUnits).toHaveLength(4);
    });

    it('makes boss wave every 5th wave', () => {
      const state = startBattle(baseField, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      spawnWave(state, 5);
      expect(state.enemyUnits[0].name).toContain('BOSS');
      expect(state.enemyUnits[0].hp).toBeGreaterThan(100);
    });

    it('logs wave start message', () => {
      const state = startBattle(baseField, baseUnits, { front: [{ unit_id: 'a', row: 0, col: 0 }], back: [null, null, null] });
      spawnWave(state, 1);
      expect(state.log.some(l => l.includes('Wave 1'))).toBe(true);
    });
  });
});


