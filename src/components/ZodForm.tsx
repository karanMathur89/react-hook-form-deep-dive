"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Heading from "./layout/Heading"
import ErrorMessage from "./ErrorMessage"
import { z } from "zod"

//* ZOD SCHEMA
export const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(2, "Password must be atleast 2 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

//* FORM VALUES
export type FormValues = z.infer<typeof FormSchema>

//# FORM COMPONENT
export default function ZodForm() {
  //* USEFORM
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  //* HANDLER FUNCTIONS
  async function onSubmit(values: FormValues) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log({ values })
  }

  return (
    <>
      <Heading>
        <span className="text-sky-700">Zod</span> React-Hook-Form
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-100 px-4 py-12 shadow"
      >
        {/* //---EMAIL--- */}
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            {...register("email")}
            className="w-full rounded"
          />
          {errors.email && (
            <ErrorMessage>{`${errors.email.message}`}</ErrorMessage>
          )}
        </div>
        {/* //---PASSWORD--- */}
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            {...register("password")}
            className="w-full rounded border-gray-400"
          />
          {errors.password && (
            <ErrorMessage>{`${errors.password.message}`}</ErrorMessage>
          )}
        </div>
        {/* //---CONFIRM PASSWORD--- */}
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="w-full rounded border-gray-400"
          />
          {errors.confirmPassword && (
            <ErrorMessage>{`${errors.confirmPassword.message}`}</ErrorMessage>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded bg-gray-700 p-2 font-semibold tracking-wide text-gray-50 hover:bg-gray-900 active:bg-gray-950 disabled:bg-gray-500"
        >
          Submit
        </button>
      </form>
    </>
  )
}
