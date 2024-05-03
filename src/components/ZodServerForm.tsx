"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Heading from "./layout/Heading"
import ErrorMessage from "./ErrorMessage"
import { TSignUpSchema, signUpSchema } from "@/lib/types"

export default function ZodServerForm() {
  //* USEFORM
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  //* HANDLER FUNCTIONS
  async function onSubmit(data: TSignUpSchema) {
    // console.log(data)
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.confirmPassword,
        confirmPassword: data.confirmPassword,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
    if (!response.ok) {
      alert("Submitting form failed.")
      return
    }
    const responseData = await response.json()
    if (responseData.errors) {
      const errors = responseData.errors
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        })
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        })
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        })
      } else {
        alert("Something went wrong!")
      }
    }
    // reset()
  }

  return (
    <>
      <Heading>
        <span className="text-sky-700">Zod</span> React-Hook-Form (Server)
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
            {...register("email")}
            placeholder="Email"
            id="email"
            name="email"
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
            {...register("password")}
            placeholder="Password"
            id="password"
            name="password"
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
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full rounded border-gray-400"
          />
          {errors.confirmPassword && (
            <ErrorMessage>{`${errors.confirmPassword.message}`}</ErrorMessage>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-gray-700 p-2 font-semibold tracking-wide text-gray-50 disabled:bg-gray-500"
        >
          Submit
        </button>
      </form>
    </>
  )
}
