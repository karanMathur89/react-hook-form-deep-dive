"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

export default function BasicForm() {
  //* USEFORM
  const form = useForm()
  const { register } = form

  return (
    <div>
      <form className="space-y-4 bg-gray-100 shadow px-4 py-12 rounded-md">
        <div>
          <Label>
            {" "}
            Username
            <Input {...register("username")} />
          </Label>
        </div>
        <div>
          <Label>
            {" "}
            Email
            <Input type="email" {...register("email")} />
          </Label>
        </div>
        <div>
          <Label>
            {" "}
            Channel
            <Input {...register("channel")} />
          </Label>
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  )
}
