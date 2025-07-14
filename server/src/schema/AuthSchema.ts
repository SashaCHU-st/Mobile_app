import { z } from "zod";

export const SignUpSchema = z.object(
    {
        email:z.string(),
        name:z.string(),
        password:z.string()
    }
)

export const LoginSchema = z.object(
    {
        email:z.string(),
        password:z.string()
    }
)