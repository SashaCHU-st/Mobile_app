import { z } from "zod";

export const ChatSchema = z.object({
  userId: z.number(),
});
