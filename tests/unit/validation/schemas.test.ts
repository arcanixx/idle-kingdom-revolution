import { describe, it, expect } from 'vitest';
import { BattleStartSchema, BuyItemSchema, ProfileUpdateSchema, QuestActionSchema, LearnPerkSchema, BattleCompleteSchema } from '../../../src/lib/validation/schemas';
describe('Validation Schemas', () => {
  it('BattleStartSchema valid', () => expect(BattleStartSchema.safeParse({fieldId:1,army:[{unit_id:'u1',row:0,col:0}]}).success).toBe(true));
  it('BattleStartSchema no army', () => expect(BattleStartSchema.safeParse({fieldId:1}).success).toBe(true));
  it('BuyItemSchema valid', () => expect(BuyItemSchema.safeParse({itemId:1}).success).toBe(true));
  it('ProfileUpdateSchema valid', () => expect(ProfileUpdateSchema.safeParse({display_name:'New'}).success).toBe(true));
  it('QuestActionSchema valid', () => expect(QuestActionSchema.safeParse({questId:1,status:'claimed'}).success).toBe(true));
  it('LearnPerkSchema valid', () => expect(LearnPerkSchema.safeParse({treeName:'combat',perkName:'power_strike'}).success).toBe(true));
  it('BattleCompleteSchema valid', () => expect(BattleCompleteSchema.safeParse({fieldId:1,wavesCleared:3,totalWaves:5,result:'victory'}).success).toBe(true));
});
