"use server"

import { signUpSchema } from "@/lib/types"

export async function addData(data: unknown) {
  const parsedData = signUpSchema.safeParse(data)
  if (!parsedData.success) {
    console.log("Invalid data")
  }
  console.log({ values: parsedData.data })
}
