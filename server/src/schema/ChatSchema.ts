import { z } from "zod";

export const ChatSchema = z.object({
  id:z.number(),
  to: z.number(),
});
