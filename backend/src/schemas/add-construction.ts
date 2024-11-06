import { z } from "zod";

export const addConstructionSchema = z.object({
  name: z.string({ message: "Deve ser uma string" }).min(5, { message: "Deve ter no mínimo 5 caracteres" }),
  quantity: z.number({ message: "Deve ser um número" }).min(1, { message: "Deve ser maior que zero" }),
  unitaryValue: z.number({ message: "Deve ser um número" }).min(1, { message: "Deve ser maior que zero" })
});