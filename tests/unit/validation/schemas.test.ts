import { describe, it, expect } from "vitest";
import { BattleStartSchema, BuyItemSchema, ProfileUpdateSchema, QuestActionSchema, LearnPerkSchema, BattleCompleteSchema } from '../../../src/lib/validation/schemas';

describe('Validation Schemas', () => {
  describe('BattleStartSchema', () => {
    it('valid', () => expect(BattleStartSchema.safeParse({fieldId:1,army:[{unit_id:'u1',row:0,col:0}]}).success).toBe(true));
    it('no army', () => expect(BattleStartSchema.safeParse({fieldId:1}).success).toBe(true));
    it('accepts numeric fieldId', () => expect(BattleStartSchema.safeParse({fieldId:-1}).success).toBe(true));
    it('rejects army with too many units', () => expect(BattleStartSchema.safeParse({fieldId:1,army:Array(7).fill({unit_id:'u',row:0,col:0})}).success).toBe(false));
    it('rejects invalid row', () => expect(BattleStartSchema.safeParse({fieldId:1,army:[{unit_id:'u',row:5,col:0}]}).success).toBe(false));
    it('rejects invalid col', () => expect(BattleStartSchema.safeParse({fieldId:1,army:[{unit_id:'u',row:0,col:3}]}).success).toBe(false));
  });

  describe('BuyItemSchema', () => {
    it('valid', () => expect(BuyItemSchema.safeParse({itemId:1}).success).toBe(true));
    it('with quantity', () => expect(BuyItemSchema.safeParse({itemId:1,quantity:5}).success).toBe(true));
    it('rejects zero itemId', () => expect(BuyItemSchema.safeParse({itemId:0}).success).toBe(false));
    it('rejects negative quantity', () => expect(BuyItemSchema.safeParse({itemId:1,quantity:-1}).success).toBe(false));
    it('clamps quantity to max 99', () => expect(BuyItemSchema.safeParse({itemId:1,quantity:100}).success).toBe(false));
  });

  describe('ProfileUpdateSchema', () => {
    it('rejects gold injection', () => expect(ProfileUpdateSchema.safeParse({ display_name: 'New', gold: 999999 }).success).toBe(false));
    it('accepts valid name', () => expect(ProfileUpdateSchema.safeParse({ display_name: 'Hero' }).success).toBe(true));
    it('rejects empty name', () => expect(ProfileUpdateSchema.safeParse({ display_name: '' }).success).toBe(false));
    it('rejects name > 50 chars', () => expect(ProfileUpdateSchema.safeParse({ display_name: 'a'.repeat(51) }).success).toBe(false));
    it('rejects unknown fields', () => expect(ProfileUpdateSchema.safeParse({ unknown: 'field' }).success).toBe(false));
  });

  describe('QuestActionSchema', () => {
    it('validates questId as string or number', () => {
      expect(QuestActionSchema.safeParse({ questId: 'abc', status: 'claimed' }).success).toBe(true);
      expect(QuestActionSchema.safeParse({ questId: 42, status: 'completed' }).success).toBe(true);
    });
    it('rejects invalid status', () => expect(QuestActionSchema.safeParse({ questId: 1, status: 'invalid' }).success).toBe(false));
  });

  describe('LearnPerkSchema', () => {
    it('validates tree + perk names', () => {
      expect(LearnPerkSchema.safeParse({ treeName: 'combat', perkName: 'power' }).success).toBe(true);
    });
    it('rejects empty treeName', () => expect(LearnPerkSchema.safeParse({ treeName: '', perkName: 'power' }).success).toBe(false));
    it('rejects empty perkName', () => expect(LearnPerkSchema.safeParse({ treeName: 'combat', perkName: '' }).success).toBe(false));
  });

  describe('BattleCompleteSchema', () => {
    it('valid', () => expect(BattleCompleteSchema.safeParse({fieldId:1,wavesCleared:3,totalWaves:5,result:'victory'}).success).toBe(true));
    it('rejects invalid result', () => expect(BattleCompleteSchema.safeParse({fieldId:1,wavesCleared:3,totalWaves:5,result:'invalid'}).success).toBe(false));
    it('rejects negative wavesCleared', () => expect(BattleCompleteSchema.safeParse({fieldId:1,wavesCleared:-1,totalWaves:5,result:'victory'}).success).toBe(false));
    it('accepts optional battleLog', () => expect(BattleCompleteSchema.safeParse({fieldId:1,wavesCleared:3,totalWaves:5,result:'victory',battleLog:['log']}).success).toBe(true));
  });
});

