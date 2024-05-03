import { z } from "zod"

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be atleast 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>
