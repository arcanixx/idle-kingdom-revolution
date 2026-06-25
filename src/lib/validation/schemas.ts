import { z } from "zod";

export type ValidationErrorResponse = {
  error: string;
  details: Array<{ field: string; message: string }>;
};

export const BattleStartSchema = z.object({
  fieldId: z.number().int().positive(),
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