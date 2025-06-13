import { z } from "zod";

export const addSpentSchema = z.object({
  value: z.number({ message: "O gasto deve ser um número" }).min(1, { message: "O gasto deve ter pelo menos um caractere" }),
  description: z.string({ message: "Deve ser uma string" }).nonempty("Descrição é obrigatória").min(4, { message: "Deve ter pelo menos 4 caracteres" }),
  categoryId: z.string().nonempty("O id da categoria é obrigatória")
});

