import { z } from "zod";

export const addSpentSchema = z.object({
  value: z.number({ message: "Deve ser um número" }).min(1, { message: "Deve ser maior que zero" }),
  description: z.string({ message: "Deve ser uma string" }).min(3, { message: "Deve ter no mínimo 3 caracteres" }),
  categoryId: z.string({ message: "Deve ser uma string" })
});