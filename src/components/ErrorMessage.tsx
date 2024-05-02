import { ReactNode } from "react"

type ErrorMessageProps = {
  children: ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className="mt-1 rounded text-sm text-red-600">{children}</p>
}
