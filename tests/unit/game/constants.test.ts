import { describe, it, expect } from 'vitest';
import { BATTLE_CONFIG, BATTLE_MESSAGES } from '../../../src/lib/game/constants';
describe('Game Constants', () => {
  it('BATTLE_CONFIG has wave scaling', () => {
    expect(typeof BATTLE_CONFIG.WAVE_SCALING_BASE).toBe('number');
    expect(typeof BATTLE_CONFIG.DEFAULT_WAVE_COUNT).toBe('number');
    expect(BATTLE_CONFIG.DEFAULT_WAVE_COUNT).toBe(3);
  });
  it('BATTLE_MESSAGES has victory message', () => { expect(BATTLE_MESSAGES.VICTORY).toBe('Victory!'); });
});
