import { ReactNode } from "react"

type HeadingProps = {
  children: ReactNode
}

export default function Heading({ children }: HeadingProps) {
  return (
    <h1 className="mb-8 mt-12 text-center text-3xl font-bold">{children}</h1>
  )
}
