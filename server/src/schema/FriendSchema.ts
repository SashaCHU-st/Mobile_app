import { z } from "zod";

export const AddFriendSchema = z.object({
  friendsId: z.number(),
});

export const DeleteFriendSchema = z.object({
  friendsId: z.number(),
});


export const DeclineFriendSchema = z.object({
  friendsId: z.number(),
});
export const ConfirmFriendSchema = z.object({
  friendsId: z.number(),
});