"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Heading from "./layout/Heading"
import ErrorMessage from "./ErrorMessage"
import { TSignUpSchema, signUpSchema } from "@/lib/types"
import { addData } from "@/actions/action"
import { Loader2 } from "lucide-react"

export default function ZodFormAction() {
  //* USEFORM
  const {
    register,
    trigger,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "abc@gmail.com",
      password: "12",
      confirmPassword: "12",
      age: 19,
    },
  })

  // USETRANSITION
  const [isPending, startTransition] = useTransition()

  //* HANDLER FUNCTIONS
  async function onSubmit(data: TSignUpSchema) {
    //? Manually trigger validation
    const result = await trigger()
    //guard
    if (!result) return
    // sleep for 1 second
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      addData(data)
    })
    // reset()
  }

  // async function onClick(data: TSignUpSchema) {
  //   await onSubmit(data)
  //   // setTest(true)
  // }

  return (
    <>
      <Heading>
        <span className="text-sky-700">Zod</span> React-Hook-Form Action
      </Heading>
      {/* <p>{isSubmitting ? "Submitting..." : "Not submitting..."}</p> */}
      <p>{isPending ? "Pending..." : "Not pending..."}</p>
      <form
        // onSubmit={handleSubmit(onClick)}
        action={async () => {
          onSubmit(getValues())
        }}
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
        {/* //---AGE--- */}
        <div>
          <label htmlFor="age" className="block text-gray-700">
            Age
          </label>
          <input
            type="number"
            {...register("age")}
            placeholder=""
            id="age"
            name="age"
            className="w-full rounded border-gray-400"
          />
          {errors.age && <ErrorMessage>{`${errors.age.message}`}</ErrorMessage>}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded bg-emerald-700 p-2 font-semibold tracking-tight  text-gray-50 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          {isPending ? (
            <>
              Submitting{" "}
              <Loader2 className="size-5 animate-spin stroke-[1.5] opacity-70" />
            </>
          ) : (
            <>Submit</>
          )}
        </button>
      </form>
    </>
  )
}
