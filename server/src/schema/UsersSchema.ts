import { z } from "zod";

export const MeSchema = z.object({
  userId: z.coerce.number(),
});
