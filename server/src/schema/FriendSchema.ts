import { z } from "zod";

export const AddFriendSchema = z.object({
  userId: z.number(),
  friendsId: z.number(),
});
