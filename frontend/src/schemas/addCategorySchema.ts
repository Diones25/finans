import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string({ message: "Deve ser uma string" }).nonempty("Name é obrigatória").min(4, { message: "Deve ter pelo menos 4 caracteres" }),
  balance: z.number({ message: "Saldo deve ser um número" }).min(1, { message: "Saldo deve ter pelo menos um caractere" }),
});