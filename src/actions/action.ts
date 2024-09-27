"use server"

import { signUpSchema } from "@/lib/types"

export async function addData(data: unknown) {
  const parsedData = signUpSchema.safeParse(data)
  if (!parsedData.success) {
    console.log("Invalid data")
    return {
      error: parsedData.error,
    }
  }
  console.log({ values: parsedData.data })
  return {
    success: parsedData.data.email,
  }
}
