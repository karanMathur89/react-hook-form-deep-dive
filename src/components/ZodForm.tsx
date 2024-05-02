"use client"

import Heading from "./layout/Heading"

export default function ZodForm() {
  return (
    <>
      <Heading>
        <span className="text-sky-600">Zod</span> React-Hook-Form
      </Heading>
      <form className="space-y-4 bg-gray-100 px-4 py-12 shadow">
        <p>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="Email"
            id="email"
            name="email"
            className="w-full rounded"
          />
        </p>
        <p>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="Password"
            id="password"
            name="password"
            className="w-full rounded"
          />
        </p>
        <p>
          <label htmlFor="confirm-password" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            required
            placeholder="Confirm Password"
            id="confirm-password"
            name="confirm-password"
            className="w-full rounded"
          />
        </p>
        <button
          type="submit"
          className="w-full rounded bg-gray-700 p-2 font-semibold tracking-wide text-gray-50"
        >
          Submit
        </button>
      </form>
    </>
  )
}
