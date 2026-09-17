import React, { type ReactNode } from "react"
import Sidebar from "./sidebar"
import TopNav from "./top-nav"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-white text-gray-950 dark:bg-[#0F0F12] dark:text-white">
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto overflow-x-hidden p-4 sm:p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
      </div>
    </div>
  )
}
