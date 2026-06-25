import { describe, it, expect, vi } from 'vitest';
import { BattleStartSchema, BattleCompleteSchema } from '../../../src/lib/validation/schemas';

describe('Battle API', () => {
  it('BattleStartSchema validates fieldId + army', () => {
    const r = BattleStartSchema.safeParse({ fieldId: 1, army: [{ unit_id: 'u1', row: 0, col: 0 }] });
    expect(r.success).toBe(true);
  });

  it('BattleCompleteSchema validates result', () => {
    const r = BattleCompleteSchema.safeParse({ fieldId: 1, wavesCleared: 3, totalWaves: 5, result: 'victory' });
    expect(r.success).toBe(true);
  });

  it('BattleCompleteSchema rejects invalid result', () => {
    const r = BattleCompleteSchema.safeParse({ fieldId: 1, wavesCleared: 3, totalWaves: 5, result: 'invalid' });
    expect(r.success).toBe(false);
  });
});
