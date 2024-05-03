"use client"

import { type FieldValues, useForm } from "react-hook-form"

import Heading from "./layout/Heading"
import ErrorMessage from "./ErrorMessage"

export default function ZodForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm()

  //* HANDLER FUNCTIONS
  async function onSubmit(data: FieldValues) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    reset()
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
            {...register("email", {
              required: "Email is required",
            })}
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be atleast 10 characters long",
              },
            })}
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
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords must macth",
            })}
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
