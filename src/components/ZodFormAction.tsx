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
        className="space-y-4 bg-gray-100 px-4 py-12 shadow"
      >
        {/* //---EMAIL--- */}
        <div>
          <label htmlFor="email" className="block text-sm text-gray-700">
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
          <label htmlFor="password" className="block text-sm text-gray-700">
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
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-700"
          >
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
          <label htmlFor="age" className="block text-sm text-gray-700">
            Age
          </label>
          <input
            type="number"
            {...register("age")}
            placeholder=""
            id="age"
            name="age"
            min={18}
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
      <PendingStatus label="isPending" status={isPending} />
    </>
  )
}

function PendingStatus({ status, label }: { status: boolean; label: string }) {
  return (
    <p className="my-4 flex items-center gap-2 rounded border  border-gray-300 bg-gray-100 p-4">
      <span className="inline-block rounded-full border border-gray-400/60 bg-gray-400/40 px-3 py-1 text-sm font-semibold ">
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
