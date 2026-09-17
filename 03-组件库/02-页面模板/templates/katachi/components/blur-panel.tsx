import React, { type ReactNode } from "react"
import { cn } from "../lib/utils"

interface BlurPanelProps {
  children: ReactNode
  className?: string
}

export function BlurPanel({ children, className }: BlurPanelProps) {
  return (
    <div
      className={cn("bg-black/60 backdrop-blur-md rounded-2xl will-change-transform block w-fit mx-auto", className)}
      role="region"
    >
      {children}
    </div>
  )
}
