import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.coerce.string().max(20)
    .refine((value) => value.trim().length > 0, 'Name cannot be only spaces')
    .refine(
      (value) => /^\p{L}+(?:[- ]\p{L}+)*$/u.test(value),
      'Name can be only letters'
    ),
  password: z.coerce.string().min(4, "Paswword minimum 4 characters"),
  image: z
    .string()
    .startsWith("data:image", { message: "Invalid image format" })
    .optional()
    .nullable(),
});
