import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark" | "system"

export interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
})

function resolveTheme(theme: Theme, enableSystem: boolean) {
  if (theme !== "system" || !enableSystem || typeof window === "undefined") {
    return theme === "dark" ? "dark" : "light"
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  enableSystem = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme
    }
    return (window.localStorage.getItem("zip-6-theme") as Theme | null) || defaultTheme
  })

  useEffect(() => {
    const resolved = resolveTheme(theme, enableSystem)
    document.documentElement.classList.toggle("dark", resolved === "dark")
    document.body.classList.toggle("dark", resolved === "dark")
    window.localStorage.setItem("zip-6-theme", theme)
  }, [enableSystem, theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme: setThemeState,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
