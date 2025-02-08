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

export const ShadcnFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "The email is absolutely invalid." }),
    remote: z.boolean(),
    location: z.string(),
    file: z
      .custom<File | undefined>()
      .refine(
        (file) => {
          const isValidInput =
            !file || (file instanceof File && file.type.startsWith("image/"))
          return isValidInput
        },
        {
          message: "Must be an image file",
        },
      )
      .refine(
        (file) => {
          return !file || file.size < 1024 * 1024 * 2
        },
        { message: "File must be less than 2MB" },
      ),
  })
  .refine(
    (data) => {
      if (data.remote && !data.location) return true
      if (!data.remote && !!data.location) return true
    },
    {
      message: "Location is required for remote jobs.",
      path: ["location"],
    },
  )

type TShadcnFormValues = z.infer<typeof ShadcnFormSchema>
