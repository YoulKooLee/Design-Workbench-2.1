import React from "react"
import { ThemeProvider } from "../components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}
