"use server"

import { ShadcnFormSchema } from "@/lib/types"
import { typeToFlattenedError, z } from "zod"

type ShadcnFormValues = z.infer<typeof ShadcnFormSchema>

type Res =
  | {
      success: false
      error: typeToFlattenedError<ShadcnFormValues, string>
    }
  | {
      success: true
    }

export async function shadcnAction(data: unknown): Promise<Res> {
  const fakeData = {
    name: "0f",
    email: "fdfcom",
  }

  // validation
  const parsedValues = ShadcnFormSchema.safeParse(data)

  if (!parsedValues.success) {
    return {
      success: false,
      error: parsedValues.error.flatten(),
    }
  }

  return {
    success: true,
  }
}
