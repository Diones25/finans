import { z } from 'zod';

export const addBalanceCat = z.object({
  balance: z.number({ message: "Deve ser um número" }).min(1, { message: "Deve ser maior que zero" })
});