"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavLink = {
  href: string
  text: string
}

export default function NavBar() {
  const links: NavLink[] = [
    {
      href: "/",
      text: "Vanilla",
    },
    {
      href: "/vanilla-form-extended",
      text: "Vanilla Extended",
    },
    {
      href: "/zod-form",
      text: "Zod",
    },
    {
      href: "/zod-server-form",
      text: "Zod Server",
    },
    {
      href: "/zod-form-action",
      text: "Zod Action",
    },
    {
      href: "/shadcn-form",
      text: "Shadcn Form",
    },
    {
      href: "/tutorial",
      text: "Tutorial",
    },
  ]

  const path = usePathname()
  return (
    <nav className="mt-8">
      <ul className="flex flex-wrap justify-center gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "inline-block rounded-full border border-gray-300 bg-gray-100 px-3 py-2 text-sm",
                {
                  "border-emerald-800 bg-emerald-600 text-white":
                    link.href === path,
                },
              )}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
