import { describe, it, expect } from 'vitest';
import { TREES } from '../../../src/lib/game/valor-trees';
describe('Valor Trees', () => {
  it('has 3 trees', () => { expect(Object.keys(TREES)).toHaveLength(3); });
  it('each tree has id, name, perks', () => { Object.values(TREES).forEach(t => { expect(t.id).toBeTruthy(); expect(t.name).toBeTruthy(); expect(Object.keys(t.perks).length).toBeGreaterThan(0); }); });
  it('perk requirements reference existing perks', () => { Object.values(TREES).forEach(t => { Object.values(t.perks).forEach(p => { p.requires.forEach(r => expect(t.perks[r]).toBeTruthy()); }); }); });
  it('deeper perks cost >= prerequisites', () => { Object.values(TREES).forEach(t => { Object.values(t.perks).forEach(p => { p.requires.forEach(r => expect(p.cost).toBeGreaterThanOrEqual(t.perks[r].cost)); }); }); });
});
