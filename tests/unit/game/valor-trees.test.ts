import { describe, it, expect } from "vitest";
import { TREES } from '../../../src/lib/game/valor-trees';

describe('Valor Trees', () => {
  it('has 3 trees', () => { expect(Object.keys(TREES)).toHaveLength(3); });
  
  it('each tree has id, name, perks', () => {
    Object.values(TREES).forEach(t => {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(Object.keys(t.perks).length).toBeGreaterThan(0);
    });
  });

  it('perk requirements reference existing perks', () => {
    Object.values(TREES).forEach(t => {
      Object.values(t.perks).forEach(p => {
        p.requires.forEach(r => expect(t.perks[r]).toBeTruthy());
      });
    });
  });

  it('deeper perks cost >= prerequisites', () => {
    Object.values(TREES).forEach(t => {
      Object.values(t.perks).forEach(p => {
        p.requires.forEach(r => expect(p.cost).toBeGreaterThanOrEqual(t.perks[r].cost));
      });
    });
  });

  it('all perks have valid effect types', () => {
    const validTypes = ['stat_boost', 'flat_bonus', 'reward_multi', 'cost_reduction'];
    Object.values(TREES).forEach(t => {
      Object.values(t.perks).forEach(p => {
        expect(validTypes).toContain(p.effect.type);
      });
    });
  });

  it('all perks have positive cost', () => {
    Object.values(TREES).forEach(t => {
      Object.values(t.perks).forEach(p => {
        expect(p.cost).toBeGreaterThan(0);
      });
    });
  });

  it('all perks have maxLevel >= 1', () => {
    Object.values(TREES).forEach(t => {
      Object.values(t.perks).forEach(p => {
        expect(p.maxLevel).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it('combat_mastery has iron_will, steel_fortress, marshal_order', () => {
    const tree = TREES.combat_mastery;
    expect(tree.perks.iron_will).toBeTruthy();
    expect(tree.perks.steel_fortress).toBeTruthy();
    expect(tree.perks.marshal_order).toBeTruthy();
  });

  it('economy_mastery has prerequisite chain', () => {
    const tree = TREES.economy_mastery;
    expect(tree.perks.treasure_map.requires).toContain('gold_fleece');
    expect(tree.perks.treasure_map.requires).toContain('deep_mining');
  });
});
