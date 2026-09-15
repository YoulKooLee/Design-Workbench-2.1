import React from "react"
import { ShinyButton } from "./ui/shiny-button"
import { motion } from "framer-motion"

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

function Link({ href, children, ...props }: LinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold font-display">
              安行驾校
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                课程
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                价格
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                场地
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShinyButton variant="secondary" className="hidden sm:inline-flex">
              电话咨询
            </ShinyButton>
            <ShinyButton>预约试学</ShinyButton>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
