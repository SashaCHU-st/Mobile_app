import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Name is required").refine((value) => value.trim().length > 0, 'Name cannot be only spaces')
    .refine(
      (value) => /^\p{L}+(?:[- ]\p{L}+)*$/u.test(value),
      'Name can be only letters'
    ),
  password: z.string().min(4, "Paswword minimum 4 characters").max(40),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password minimum 4 characters").max(40),
});
