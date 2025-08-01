import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.coerce.string(),
  password: z.coerce.string(),
});
