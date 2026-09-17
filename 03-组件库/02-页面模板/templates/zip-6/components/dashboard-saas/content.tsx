import React from "react"
import { OverviewStats } from "./overview-stats"
import { RevenueChart } from "./revenue-chart"
import { ChannelPerformance } from "./channel-performance"
import { InventoryOverview } from "./inventory-overview"
import { CustomerInsights } from "./customer-insights"
import { IntegrationStatus } from "./integration-status"
import { WebsiteBuilder } from "./website-builder"
import { RecentOrders } from "./recent-orders"
import { TopProducts } from "./top-products"
import { SalesTeamActivity } from "./sales-team-activity"

export function DashboardSaasContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SaaS 仪表盘</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            管理全渠道销售、库存和网站运营
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
            导出数据
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            添加集成
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <OverviewStats />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <ChannelPerformance />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InventoryOverview />
        <CustomerInsights />
        <IntegrationStatus />
      </div>

      {/* Website Builder */}
      <WebsiteBuilder />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrders />
        <TopProducts />
        <SalesTeamActivity />
      </div>
    </div>
  )
}
