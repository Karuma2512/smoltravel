"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Globe, Home, Package, Settings, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

interface SidebarProps {
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

export function DashboardSidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // Hydration fix
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Users",
      icon: Users,
      href: "/users",
      active: pathname === "/users",
    },
    {
      label: "Staff",
      icon: Users,
      href: "/staff",
      active: pathname === "/staff",
    },
    {
      label: "Co-founders",
      icon: Users,
      href: "/co-founders",
      active: pathname === "/co-founders",
    },
    {
      label: "Destinations",
      icon: Globe,
      href: "/destinations",
      active: pathname === "/destinations",
    },
    {
      label: "Packages",
      icon: Package,
      href: "/packages",
      active: pathname === "/packages",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Globe className="h-6 w-6" />
          <span>Smol Travel Admin</span>
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={() => setIsMobileOpen(false)}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-1">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} onClick={() => setIsMobileOpen(false)}>
              <Button
                variant={route.active ? "secondary" : "ghost"}
                className={cn("w-full justify-start", route.active && "bg-primary/10 font-medium")}
              >
                <route.icon className="mr-2 h-5 w-5" />
                {route.label}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">©Smol Travel Admin</p>
          <ModeToggle />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-64 p-0 sm:max-w-xs">
          {sidebarContent}
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 border-r md:block">{sidebarContent}</aside>
    </>
  )
}

