import React, { useEffect } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior

    root.style.scrollBehavior = "smooth"

    return () => {
      root.style.scrollBehavior = previousScrollBehavior
    }
  }, [])

  return <>{children}</>
}
