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
      text: "Vanilla RHF",
    },
    {
      href: "/vanilla-form-extended",
      text: "Vanilla RHF 2",
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
                "inline-block rounded-full bg-gray-300 px-3 py-2 text-sm",
                {
                  "bg-emerald-600 text-white": link.href === path,
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
