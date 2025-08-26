import { z } from "zod";

export const AddFavoritesSchema = z.object({
  image: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) =>
        !val || val.startsWith("data:image") || /^https?:\/\/.+/.test(val),
      { message: "Invalid image format" }
    ),
  food_id: z.number(),
  summary: z.string(),
  title: z.string(),
});

export const FriendsFavoritesSchema = z.object({
});

export const CommentsSchema = z.object({
  id: z.number(),
  comments: z.string(),
  time: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
});

export const OldCommentsSchema = z.object({
  id: z.number(),
});
