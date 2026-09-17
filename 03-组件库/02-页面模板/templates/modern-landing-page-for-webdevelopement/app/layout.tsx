import React from "react"
import { ThemeProvider } from "../components/theme-provider"
import "./globals.css"

export const metadata = {
  title: "ms-webdesign | 高品质网站",
  description: "现代、结果导向的网站设计，将访客转化为客户",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}
