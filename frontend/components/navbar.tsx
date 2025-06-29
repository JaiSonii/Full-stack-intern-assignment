"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Home, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/movies", label: "Movies", icon: Search },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MovieApp</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  )
}
