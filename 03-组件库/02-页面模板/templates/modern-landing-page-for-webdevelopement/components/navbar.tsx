import Link from "./local-link"
import { ThemeToggle } from "./theme-toggle"
import { Logo } from "./logo"
import { MobileMenu } from "./mobile-menu"
import React, { useState, useEffect } from "react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#over-ons" className="text-sm font-medium hover:text-primary transition-colors">
              关于我们
            </Link>
            <Link href="#diensten" className="text-sm font-medium hover:text-primary transition-colors">
              服务
            </Link>
            <Link href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">
              作品集
            </Link>
            <Link href="#pakketten" className="text-sm font-medium hover:text-primary transition-colors">
              套餐
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              联系
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
