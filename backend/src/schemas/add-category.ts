import { z } from "zod";

export const addCategory = z.object({
  name: z.string({ message: "Deve ser uma string" }).min(4, { message: "deve ter no mínimo 4 caracteres" }),
  balance: z.number({ message: "Deve ser um número" }).min(1, { message: "Deve ser maior que zero" })
});