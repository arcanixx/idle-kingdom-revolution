import { z } from "zod";

export type ValidationErrorResponse = {
  error: string;
  details: Array<{ field: string; message: string }>;
};

export const BattleStartSchema = z.object({
  fieldId: z.union([z.string(), z.number()]),
  army: z.array(z.object({
    unit_id: z.string(),
    row: z.number().int().min(0).max(1),
    col: z.number().int().min(0).max(2),
  })).min(1).max(6).optional(),
});

export const BuyItemSchema = z.object({
  itemId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99).default(1),
});
export const ProfileUpdateSchema = z.object({
  display_name: z.string().min(1).max(50).optional(),
}).strict(); // whitelist only - prevents gold/level injection

export const QuestActionSchema = z.object({
  questId: z.union([z.string(), z.number()]),
  status: z.enum(["accepted", "completed", "claimed"]),
});

export const LearnPerkSchema = z.object({
  treeName: z.string().min(1),
  perkName: z.string().min(1),
});

export const BattleCompleteSchema = z.object({
  fieldId: z.union([z.string(), z.number()]),
  wavesCleared: z.number().int().min(0),
  totalWaves: z.number().int().min(1),
  result: z.enum(["victory", "defeat", "retreat"]),
  battleLog: z.array(z.string()).optional(),
});


