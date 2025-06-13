import { z } from "zod";

export const addBalanceCategorySchema = z.object({
  balance: z.number({ message: "Saldo deve ser um número" }).min(1, { message: "Saldo deve ter pelo menos um caractere" }),
});