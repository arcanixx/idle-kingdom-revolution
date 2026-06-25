import { describe, it, expect } from 'vitest';
import { ProfileUpdateSchema, QuestActionSchema, LearnPerkSchema } from '../../../src/lib/validation/schemas';

describe('Player API Schemas', () => {
  it('ProfileUpdateSchema rejects gold injection', () => {
    const r = ProfileUpdateSchema.safeParse({ display_name: 'New', gold: 999999 });
    expect(r.success).toBe(false);
  });

  it('ProfileUpdateSchema accepts valid name', () => {
    const r = ProfileUpdateSchema.safeParse({ display_name: 'Hero' });
    expect(r.success).toBe(true);
  });

  it('QuestActionSchema validates questId as string or number', () => {
    expect(QuestActionSchema.safeParse({ questId: 'abc', status: 'claimed' }).success).toBe(true);
    expect(QuestActionSchema.safeParse({ questId: 42, status: 'completed' }).success).toBe(true);
  });

  it('QuestActionSchema rejects invalid status', () => {
    expect(QuestActionSchema.safeParse({ questId: 1, status: 'invalid' }).success).toBe(false);
  });

  it('LearnPerkSchema validates tree + perk names', () => {
    expect(LearnPerkSchema.safeParse({ treeName: 'combat', perkName: 'power' }).success).toBe(true);
    expect(LearnPerkSchema.safeParse({ treeName: '', perkName: 'power' }).success).toBe(false);
  });
});
