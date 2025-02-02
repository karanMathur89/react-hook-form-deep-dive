"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { shadcnAction } from "@/actions/shadcn-action"
import { ShadcnFormSchema } from "@/lib/types"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"

export function ShadcnForm() {
  //* USEFORM
  const form = useForm<z.infer<typeof ShadcnFormSchema>>({
    resolver: zodResolver(ShadcnFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const { setError, formState } = form

  type Keys = keyof z.infer<typeof ShadcnFormSchema>

  ///* HANDLER FUNCTIONS
  async function onSubmit(values: z.infer<typeof ShadcnFormSchema>) {
    await new Promise((r) => setTimeout(r, 500)) // delay
    const res = await shadcnAction(values)
    if (res.success) {
      toast(
        <div>
          <p className="font-medium">Form submitted Sucessfully!</p>
          <p className="opacity-50">Form reset.</p>
        </div>,
      )
    } else {
      const nestedErrors: { [key: string]: string[] } = res.error.fieldErrors
      console.log({ res })
      for (let key in nestedErrors) {
        setError(key as Keys, { message: nestedErrors[key][0] })
      }
    }
  }

  //?reset form after successful submission
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      form.reset()
    }
  }, [formState.isSubmitSuccessful])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-8 rounded-lg border border-gray-300 bg-gray-100/70 p-4"
      >
        {/* ---------------------------------------- */}
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ---------------------------------------- */}
        {/* EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email."
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ---------------------------------------- */}
        {/* SUBMIT */}
        <Button
          type="submit"
          variant="default"
          disabled={formState.isSubmitting}
          className="w-full"
        >
          {formState.isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              Submitting
              <Loader2 className="animate-spin duration-800 ease-linear" />
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  )
}
