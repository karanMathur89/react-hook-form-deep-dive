"use client"

import { type FieldValues, useForm } from "react-hook-form"

import Heading from "./layout/Heading"
import ErrorMessage from "./ErrorMessage"
import { useEffect } from "react"

export default function VanillaFormExtended() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      dirtyFields,
      isDirty,
      submitCount,
      touchedFields,
    },
    reset,
    getValues,
    // additional functions
    setFocus,
    setValue,
    resetField,
    getFieldState,
  } = useForm()

  //? set email field to a fixed value
  // setValue("email", "45@gmail.com")

  //* HANDLER FUNCTIONS
  async function onSubmit(data: FieldValues) {
    console.group("START")
    console.log({ data })
    console.log("Password is", getValues("password"))
    console.groupEnd()

    await new Promise((resolve) => setTimeout(resolve, 2000))
    //? set focus after submission to email field
    setFocus("email")
    // reset()
    //? only reset confirmPassword field after submission
    resetField("confirmPassword")
  }

  //* EFFECT
  useEffect(() => {
    //? set focus to email field after render
    // setFocus("email")
  }, [setFocus])

  //* LOGS
  // console.log({ dirtyFields })
  console.log({ touchedFields })
  console.log(getFieldState("email").isTouched)

  return (
    <>
      <Heading>
        <span className="text-sky-600">Vanilla</span> React-Hook-Form (Extended)
      </Heading>
      <pre>Form has been submitted {submitCount} times</pre>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-100 shadow px-4 py-12 rounded-lg"
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
            className="rounded-md w-full"
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
                message: "Password should be atleast 6 characters long",
              },
            })}
            placeholder="Password"
            id="password"
            name="password"
            className="border-gray-400 rounded-md w-full"
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
            className="border-gray-400 rounded-md w-full"
          />
          {errors.confirmPassword && (
            <ErrorMessage>{`${errors.confirmPassword.message}`}</ErrorMessage>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gray-700 disabled:bg-gray-500 p-2 rounded-md w-full font-semibold text-gray-50 tracking-wide"
        >
          Submit
        </button>
      </form>
    </>
  )
}
