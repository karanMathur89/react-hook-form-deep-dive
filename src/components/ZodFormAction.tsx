"use client"

import { useEffect, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

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
    getValues,
    reset,
    setFocus,
    formState: { errors, dirtyFields },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "abc@gmail.com",
      password: "12",
      confirmPassword: "12",
      age: 18,
    },
  })

  //* USETRANSITION
  const [isPending, startTransition] = useTransition()

  //* HANDLER FUNCTIONS
  async function onSubmit(data: TSignUpSchema) {
    //? Manually trigger validation when used with form action
    const result = await trigger()
    //guard
    if (!result) return

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // sleep for 1 second
      const res = await addData(data)
      if (res.error) {
        toast.error(res.error.message)
      } else {
        toast.success(`${res.success} added.`)
        reset(
          { email: "", password: "", confirmPassword: "", age: 18 },
          { keepDirtyValues: false },
        )
      }
    })
  }

  //* USEEFFECT
  useEffect(() => {
    setFocus("email")
  }, [setFocus, isPending])

  return (
    <>
      <Heading>
        <span className="text-sky-700">Zod</span> React-Hook-Form Action
      </Heading>

      <form
        action={async () => {
          onSubmit(getValues())
        }}
        className="space-y-4 bg-gray-100 shadow px-4 py-12 rounded-lg"
      >
        {/* //---EMAIL--- */}
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
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
          <label htmlFor="password" className="block text-gray-700 text-sm">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
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
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm"
          >
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            className="border-gray-400 rounded-md w-full"
          />
          {errors.confirmPassword && (
            <ErrorMessage>{`${errors.confirmPassword.message}`}</ErrorMessage>
          )}
        </div>
        {/* //---AGE--- */}
        <div>
          <label htmlFor="age" className="block text-gray-700 text-sm">
            Age
          </label>
          <input
            type="number"
            {...register("age")}
            placeholder=""
            id="age"
            name="age"
            min={18}
            className="border-gray-400 rounded-md w-full"
          />
          {errors.age && <ErrorMessage>{`${errors.age.message}`}</ErrorMessage>}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="flex justify-center items-center gap-2 bg-emerald-700 disabled:bg-gray-500 p-2 rounded-md w-full font-semibold text-gray-50 tracking-tight disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              Submitting{" "}
              <Loader2 className="opacity-70 stroke-[1.5] size-5 animate-spin" />
            </>
          ) : (
            <>Submit</>
          )}
        </button>
      </form>
      <PendingStatus label="isPending" status={isPending} />
    </>
  )
}

function PendingStatus({ status, label }: { status: boolean; label: string }) {
  return (
    <p className="flex items-center gap-2 bg-gray-100 my-4 p-4 border border-gray-300 rounded-md">
      <span className="inline-block bg-gray-400/40 px-3 py-1 border border-gray-400/60 rounded-full font-semibold text-sm">
        {label}
      </span>{" "}
      {status ? (
        <span className="font-semibold text-amber-600">Submitting</span>
      ) : (
        <span className="font-semibold text-sky-600">Not Submitting</span>
      )}
    </p>
  )
}
