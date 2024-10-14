"use client"

import { useMedia } from "react-use"
import { usePathname, useRouter } from "next/navigation"

import NavButton from "@/components/nav-button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const routes = [
  {
    href: "/",
    label: "Overview"
  },
  {
    href: "/transactions",
    label: "Transactions"
  },
  {
    href: "/categories",
    label: "Categories"
  },
  {
    href: "/accounts",
    label: "Accounts"
  },
  {
    href: "/settings",
    label: "Settings"
  }
]

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname();
  const router = useRouter()

  const isMobile = useMedia("(max-width: 768px", false);

  const handleClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  if(isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal hover:bg-blue-300 hover:text-white bg-blue-400 text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-blue-500 transition"
          >
            <Menu className="size-4 font-semibold" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-2 pt-6">
            {routes.map((route) => (
              <Button
                variant={pathname === route.href ? "secondary" : "ghost"}
                key={route.href}
                onClick={() => handleClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className="hidden md:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton 
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  )
}

export default Navigation