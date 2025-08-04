import { z } from "zod";

export const AddFriendSchema = z.object({
  userId: z.number(),
  friendsId: z.number(),
});
export const MyFriendSchema = z.object({
  userId: z.number(),
});

export const DeleteFriendSchema = z.object({
  userId: z.number(),
  friendsId: z.number(),
});


export const DeclineFriendSchema = z.object({
  friendsId: z.number(),
});
export const ConfirmFriendSchema = z.object({
  friendsId: z.number(),
});