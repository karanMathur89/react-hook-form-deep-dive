"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { shadcnAction } from "@/actions/shadcn-action"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ShadcnFormSchema } from "@/lib/types"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"

//* TYPES
type Keys = keyof z.infer<typeof ShadcnFormSchema>

//# EXPORT FUNCTION
export function ShadcnForm() {
  //* USEFORM
  const form = useForm<z.infer<typeof ShadcnFormSchema>>({
    resolver: zodResolver(ShadcnFormSchema),
    defaultValues: {
      name: "",
      email: "",
      remote: false,
      location: "",
      file: undefined,
    },
  })

  const { setError, formState, watch, setValue } = form

  const remote = watch("remote")

  ///* HANDLER FUNCTIONS
  async function onSubmit(values: z.infer<typeof ShadcnFormSchema>) {
    await new Promise((r) => setTimeout(r, 500)) // delay
    // console.log(values)

    const res = await shadcnAction(values)
    // console.log({ res })
    if (res.success) {
      toast.success(
        <div className="text-emerald-300">
          <p className="font-medium">Form submitted Successfully!</p>
          {/* <p className="opacity-80">Form reset.</p> */}
        </div>,
      )
    } else {
      const nestedErrors: { [key: string]: string[] } = res.error.fieldErrors
      for (let key in nestedErrors) {
        setError(key as Keys, { message: nestedErrors[key][0] })
      }
    }
  }

  //? reset form after successful submission
  //* USEEFFECT
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      // form.reset()
    }
  }, [formState.isSubmitSuccessful])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-8 rounded-lg border border-gray-300 bg-gray-100/70 p-4"
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
        {/* REMOTE */}
        <FormField
          control={form.control}
          name="remote"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => {
                    setValue("location", "")
                    return field.onChange(v)
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remote</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ---------------------------------------- */}
        {/* LOCATION */}
        {!remote && (
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your location." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {/* ---------------------------------------- */}
        {/* FILES */}
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Files</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  {...fieldValues}
                  onChange={(e) => {
                    fieldValues.onChange(e.target.files?.[0])
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* SUBMIT */}
        <Button
          type="submit"
          variant="default"
          disabled={formState.isSubmitting}
          className="w-full disabled:bg-neutral-700"
        >
          {formState.isSubmitting ? "Submitting..." : "Submit"}
          {formState.isSubmitting && (
            <Loader2 className="animate-spin duration-800" />
          )}
        </Button>
      </form>
    </Form>
  )
}
