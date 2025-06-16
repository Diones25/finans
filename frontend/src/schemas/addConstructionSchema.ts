import { z } from "zod";

export const addConstructionSchema = z.object({
  name: z.string({ message: "Deve ser uma string" }).nonempty("Nome é obrigatório").min(5, { message: "Deve ter pelo menos 5 caracteres" }),
  quantity: z.number({ message: "Quantidade deve ser um número" }).min(1, { message: "Quantidade deve ter pelo menos um caractere" }),
  unitaryValue: z.number({ message: "Valor unitário deve ser um número" }).min(1, { message: "Valor unitário deve ter pelo menos um caractere" }),
});