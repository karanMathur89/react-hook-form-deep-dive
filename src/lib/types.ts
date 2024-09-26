import { z } from "zod"

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(2, "Password must be atleast 2 characters"),
    confirmPassword: z.string(),
    age: z.coerce
      .number()
      .int()
      .min(18, { message: "Must be 18 years or above" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>
