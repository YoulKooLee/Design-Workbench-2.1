import React, { useState } from "react"
import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
} from "lucide-react"

import { Home } from "lucide-react"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    return (
      <a
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </a>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <a
            href="https://kokonutui.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-gray-200 bg-zinc-950 text-sm font-bold text-zinc-50 dark:border-[#2B2B30] dark:bg-zinc-50 dark:text-zinc-950">
                K
              </span>
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                KokonutUI
              </span>
            </div>
          </a>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  总览
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Home}>
                    仪表盘
                  </NavItem>
                  <NavItem href="#" icon={BarChart2}>
                    分析
                  </NavItem>
                  <NavItem href="#" icon={Building2}>
                    组织
                  </NavItem>
                  <NavItem href="#" icon={Folder}>
                    项目
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  财务
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Wallet}>
                    交易
                  </NavItem>
                  <NavItem href="#" icon={Receipt}>
                    发票
                  </NavItem>
                  <NavItem href="#" icon={CreditCard}>
                    付款
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  团队
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Users2}>
                    成员
                  </NavItem>
                  <NavItem href="#" icon={Shield}>
                    权限
                  </NavItem>
                  <NavItem href="#" icon={MessagesSquare}>
                    聊天
                  </NavItem>
                  <NavItem href="#" icon={Video}>
                    会议
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings}>
                设置
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                帮助
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-zinc-950/50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
