import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(4, "Paswword minimum 4 characters"),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password minimum 4 characters"),
});
