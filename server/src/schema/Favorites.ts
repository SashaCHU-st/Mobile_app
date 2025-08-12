import { z } from "zod";

export const AddFavoritesSchema = z.object({
  userId: z.number(),
  image: z
  .string()
  .optional()
  .nullable()
  .refine(
    (val) =>
      !val ||
      val.startsWith("data:image") ||
      /^https?:\/\/.+/.test(val),
    { message: "Invalid image format" }
  ),
  food_id: z.number(),
  summary: z.string(),
  title:z.string()
});
