import { ReactNode } from "react"

type HeadingProps = {
  children: ReactNode
}

export default function Heading({ children }: HeadingProps) {
  return (
    <h1 className="mt-12 mb-8 text-center text-3xl font-semibold tracking-tight">
      {children}
    </h1>
  )
}
