import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme | "system"
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => undefined,
})

function resolveInitialTheme(defaultTheme: Theme | "system"): Theme {
  if (defaultTheme !== "system" || typeof window === "undefined") {
    return defaultTheme === "dark" ? "dark" : "light"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme(defaultTheme))

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")

    return () => {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
