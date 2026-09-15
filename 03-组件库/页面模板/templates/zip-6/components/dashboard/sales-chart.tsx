import React from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

const salesData = [
  { label: "1月", sales: 12000, orders: 800 },
  { label: "2月", sales: 19000, orders: 1200 },
  { label: "3月", sales: 15000, orders: 1000 },
  { label: "4月", sales: 25000, orders: 1600 },
  { label: "5月", sales: 22000, orders: 1400 },
  { label: "6月", sales: 30000, orders: 1900 },
  { label: "7月", sales: 28000, orders: 1800 },
  { label: "8月", sales: 35000, orders: 2200 },
  { label: "9月", sales: 32000, orders: 2000 },
  { label: "10月", sales: 40000, orders: 2500 },
  { label: "11月", sales: 38000, orders: 2400 },
  { label: "12月", sales: 45000, orders: 2800 },
]

const revenueData = [
  { label: "周一", revenue: 3200 },
  { label: "周二", revenue: 4100 },
  { label: "周三", revenue: 3800 },
  { label: "周四", revenue: 5200 },
  { label: "周五", revenue: 4900 },
  { label: "周六", revenue: 6100 },
  { label: "周日", revenue: 5800 },
]

export function SalesChart() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-3 sm:p-6 border border-gray-200 dark:border-[#1F1F23] w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">销售概览</h3>
        <select className="text-xs sm:text-sm border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-auto">
          <option>近 12 个月</option>
          <option>近 6 个月</option>
          <option>近 3 个月</option>
        </select>
      </div>
      <ChartContainer
        className="h-64 sm:h-80 w-full"
        config={{
          sales: { label: "销售额", color: "rgb(59 130 246)" },
          orders: { label: "订单数", color: "rgb(16 185 129)" },
        }}
      >
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

export function RevenueChart() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-3 sm:p-6 border border-gray-200 dark:border-[#1F1F23] w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">周收入</h3>
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">本周</span>
      </div>
      <ChartContainer
        className="h-48 sm:h-64 w-full"
        config={{
          revenue: { label: "收入", color: "rgb(139 92 246)" },
        }}
      >
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
