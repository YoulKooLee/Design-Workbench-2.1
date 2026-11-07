import React, { useState } from "react"
import "./styles/index.css"
import {
  LayoutDashboard,
  CheckSquare,
  Grid3X3,
  MessageSquare,
  Users,
  Shield,
  Settings,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
  User,
} from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: CheckSquare, label: "Tasks" },
  { icon: Grid3X3, label: "Apps" },
  { icon: MessageSquare, label: "Chats", badge: "3" },
  { icon: Users, label: "Users" },
  { icon: Shield, label: "Secured by Clerk" },
  {
    icon: Settings,
    label: "Settings",
    children: ["Profile", "Account", "Appearance", "Notifications", "Display"],
  },
]

const stats = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign },
  { title: "Subscriptions", value: "2,350", change: "+180.1%", icon: Users },
  { title: "Sales", value: "12,234", change: "+19%", icon: ShoppingCart },
  { title: "Active Now", value: "573", change: "+201", icon: Activity },
]

export default function ShadcnAdminDashboardPrototype() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [expandedItems, setExpandedItems] = useState<string[]>(["Settings"])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 bg-gray-900 flex flex-col">
          <div className="h-14 flex items-center px-4 border-b border-gray-800">
            <div className="flex items-center gap-2 font-semibold">
              <div className="w-6 h-6 rounded bg-white text-gray-900 flex items-center justify-center text-xs font-bold">
                S
              </div>
              <span>shadcn-admin</span>
            </div>
          </div>
          <nav className="flex-1 p-2 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeItem === item.label
              const isExpanded = expandedItems.includes(item.label)
              return (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      setActiveItem(item.label)
                      if (item.children) toggleExpand(item.label)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs bg-blue-500 text-white rounded-full px-1.5 py-0.5">
                        {item.badge}
                      </span>
                    )}
                    {item.children && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      />
                    )}
                  </button>
                  {item.children && isExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child}
                          onClick={() => setActiveItem(child)}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                            activeItem === child
                              ? "bg-gray-800 text-white"
                              : "text-gray-500 hover:bg-gray-800/50 hover:text-gray-300"
                          }`}
                        >
                          {child}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
          <div className="p-2 border-t border-gray-800">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-gray-800/50 hover:text-gray-200">
              <User className="w-4 h-4" />
              <span className="flex-1 text-left">John Doe</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-950">
          {/* Header */}
          <header className="h-14 border-b border-gray-800 flex items-center px-6 gap-4 bg-gray-950">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-md border border-gray-700 bg-gray-900 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="relative p-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-gray-200">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-100">{activeItem}</h1>
              <p className="text-gray-500 text-sm">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="rounded-lg border border-gray-800 bg-gray-900 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{stat.title}</span>
                    <stat.icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="text-2xl font-bold mb-1 text-gray-100">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-500">{stat.change}</span>
                    <span className="text-gray-500">from last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-lg border border-gray-800 bg-gray-900 p-4">
                <h3 className="font-semibold mb-4 text-gray-100">Overview</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Chart placeholder
                </div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                <h3 className="font-semibold mb-4 text-gray-100">Recent Sales</h3>
                <div className="space-y-4">
                  {[
                    { name: "Olivia Martin", email: "olivia@example.com", amount: "$1,999.00" },
                    { name: "Jackson Lee", email: "jackson@example.com", amount: "$39.00" },
                    { name: "Isabella Nguyen", email: "isabella@example.com", amount: "$299.00" },
                    { name: "William Kim", email: "william@example.com", amount: "$99.00" },
                  ].map((sale) => (
                    <div key={sale.email} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-200">{sale.name}</div>
                        <div className="text-xs text-gray-500">{sale.email}</div>
                      </div>
                      <div className="text-sm font-medium text-gray-200">{sale.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
