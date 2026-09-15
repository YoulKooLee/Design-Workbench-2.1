/**
 * @name CMSFullForm 管理后台
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from "react"

import { defineHashPageRoute, useHashPage } from "../../common/useHashPage"
import { ForgotForm } from "./components/auth/forgot-form"
import { LoginForm } from "./components/auth/login-form"
import { RegisterForm } from "./components/auth/register-form"
import { ResetPasswordForm } from "./components/auth/reset-password-form"
import { BlankContent } from "./components/blank"
import Layout from "./components/cmsfullform/layout"
import DashboardContent from "./components/cmsfullform/content"
import DashboardCMSContent from "./components/dashboard-cms/content"
import { DashboardSaasContent } from "./components/dashboard-saas/content"
import { AllSiteSEOSettingsContent } from "./components/plugins/allsite-seo/settings/content"
import PluginsContent from "./components/plugins/content"
import { SuperCacheSettingsContent } from "./components/plugins/super-cache/settings/content"
import SettingsContent from "./components/settings/content"
import { ThemeProvider } from "./components/theme-provider"

import "./style.css"

const route = defineHashPageRoute(
  [
    { id: "dashboard-cms", title: "CMS 仪表盘" },
    { id: "dashboard", title: "电商仪表盘" },
    { id: "dashboard-saas", title: "SaaS 仪表盘" },
    { id: "plugins", title: "插件" },
    { id: "super-cache-settings", title: "Super Cache 设置" },
    { id: "allsite-seo-settings", title: "AllSite SEO 设置" },
    { id: "settings", title: "设置" },
    { id: "blank", title: "空白页" },
    { id: "login", title: "登录" },
    { id: "register", title: "注册" },
    { id: "forgot", title: "忘记密码" },
    { id: "reset-password", title: "重置密码" },
  ],
  { defaultPageId: "dashboard-cms" },
)

function renderPage(page: string) {
  switch (page) {
    case "dashboard":
      return (
        <Layout>
          <DashboardContent />
        </Layout>
      )
    case "dashboard-saas":
      return (
        <Layout>
          <DashboardSaasContent />
        </Layout>
      )
    case "plugins":
      return (
        <Layout>
          <PluginsContent />
        </Layout>
      )
    case "super-cache-settings":
      return (
        <Layout>
          <SuperCacheSettingsContent />
        </Layout>
      )
    case "allsite-seo-settings":
      return (
        <Layout>
          <AllSiteSEOSettingsContent />
        </Layout>
      )
    case "settings":
      return (
        <Layout>
          <SettingsContent />
        </Layout>
      )
    case "blank":
      return (
        <Layout>
          <BlankContent />
        </Layout>
      )
    case "login":
      return <LoginForm />
    case "register":
      return <RegisterForm />
    case "forgot":
      return <ForgotForm />
    case "reset-password":
      return <ResetPasswordForm />
    case "dashboard-cms":
    default:
      return (
        <Layout>
          <DashboardCMSContent />
        </Layout>
      )
  }
}

export default function CMSFullFormPrototype() {
  const { page } = useHashPage(route)

  return (
    <ThemeProvider defaultTheme="light" enableSystem={false}>
      <div className="zip-6-prototype">{renderPage(page)}</div>
    </ThemeProvider>
  )
}
