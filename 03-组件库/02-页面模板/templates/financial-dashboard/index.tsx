/**
 * @name 财务仪表盘
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from "react"
import "./style.css"

import Dashboard from "./components/kokonutui/dashboard"
import { ThemeProvider } from "./components/theme-provider"

export default function FinancialDashboardPrototype() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="financial-dashboard-prototype">
        <Dashboard />
      </div>
    </ThemeProvider>
  )
}
