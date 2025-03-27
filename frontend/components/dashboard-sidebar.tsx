"use client"

import { Compass, Home, LogOut, Map, Plane, Settings, LuggageIcon as Suitcase, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "My Trips", href: "/trips", icon: Suitcase },
  { name: "Flights", href: "/flights", icon: Plane },
  { name: "Maps", href: "/maps", icon: Map },
  { name: "Friends", href: "/friends", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function DashboardSidebar() {
  const [activePath, setActivePath] = useState("/")

  return (
    <aside className="hidden w-64 flex-col border-r bg-white md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Plane className="h-6 w-6 text-primary" />
          <span>TravelHub</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-6">
        <div className="px-3">
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActivePath(link.href)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  activePath === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="mt-auto border-t p-6">
        <Button variant="outline" className="w-full justify-start gap-2">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </aside>
  )
}

