import { z } from "zod";

export const transactionSchema = z.object({
  description: z.string().min(1, "descriptionRequired"),
  amount: z.number().positive("amountPositive"),
  currency: z.string().min(1, "currencyRequired"),
  type: z.enum(["income", "expense"]),
  categoryId: z.string().min(1, "categoryRequired"),
  notes: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
