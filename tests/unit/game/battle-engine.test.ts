import { describe, it, expect } from 'vitest';
import { startBattle, processTick } from '../../../src/lib/game/battle-engine';
import type { Unit } from '../../../src/types/game';
describe('Battle Engine', () => {
  it('startBattle initializes state', () => {
    const field: any = { id:1, name:'Test', enemy_waves:[{units:[{unit_id:'e1',count:1,level:1,rarity:'common'}]}], rewards:{gold:10,xp:5} };
    const units: any[] = [{ id:'1', unit_id:'a', name:'A', class:'warrior', faction:'h', rarity:'c', level:1, hp:100, attack:10, defense:5, speed:10, power_rating:50, isActive:true }];
    const state = startBattle(field, units, {front:[{unit_id:'a',row:0,col:0}],back:[null,null,null]});
    expect(state).toBeDefined();
    expect(state.currentWave).toBe(1);
    expect(state.turn).toBe(0);
    expect(state.status).toBe('active');
  });
  it('processTick advances turn', () => {
    const field: any = { id:1, name:'Test', enemy_waves:[{units:[{unit_id:'e1',count:1,level:1,rarity:'common'}]}], rewards:{gold:10,xp:5} };
    const units: any[] = [{ id:'1', unit_id:'a', name:'A', class:'warrior', faction:'h', rarity:'c', level:1, hp:100, attack:10, defense:5, speed:10, power_rating:50, isActive:true }];
    const state = startBattle(field, units, {front:[{unit_id:'a',row:0,col:0}],back:[null,null,null]});
    processTick(state);
    expect(state.turn).toBe(1);
  });
});
