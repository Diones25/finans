import { z } from "zod";

export const listConstructionSchema = z.object({
  page: z.coerce.number().min(0).optional(),
  pageSize: z.coerce.number().min(0).optional()
});