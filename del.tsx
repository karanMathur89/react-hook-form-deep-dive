"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Define the form schema with Zod
const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(2, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type FormValues = z.infer<typeof formSchema>

export default function ValidatedForm() {
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted with values:", values)
  }

  return (
    <div className="mx-auto mt-8 max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block font-medium text-gray-700 text-sm"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="block focus:ring-opacity-50 shadow-sm mt-1 border-gray-300 focus:border-indigo-300 rounded-md focus:ring focus:ring-indigo-200 w-full"
          />
          {errors.email && (
            <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block font-medium text-gray-700 text-sm"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="block focus:ring-opacity-50 shadow-sm mt-1 border-gray-300 focus:border-indigo-300 rounded-md focus:ring focus:ring-indigo-200 w-full"
          />
          {errors.password && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-medium text-gray-700 text-sm"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="block focus:ring-opacity-50 shadow-sm mt-1 border-gray-300 focus:border-indigo-300 rounded-md focus:ring focus:ring-indigo-200 w-full"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full font-medium text-white text-sm"
        >
          Submit
        </button>
      </form>

      {submittedValues && (
        <div className="bg-gray-100 mt-6 p-4 rounded-md">
          <h2 className="mb-2 font-semibold text-lg">Submitted Values:</h2>
          <pre className="break-words whitespace-pre-wrap">
            {JSON.stringify(submittedValues, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
