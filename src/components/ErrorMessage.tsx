import { ReactNode } from "react"

type ErrorMessageProps = {
  children: ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className="mt-1 rounded-md text-red-600 text-sm">{children}</p>
}
