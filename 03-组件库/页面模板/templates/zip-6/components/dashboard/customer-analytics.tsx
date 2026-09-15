import React from "react"
import { Cell, Pie, PieChart } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

const customerData = [
  { label: "新客户", value: 45, color: "rgb(59 130 246)" },
  { label: "回访客户", value: 35, color: "rgb(16 185 129)" },
  { label: "VIP 客户", value: 20, color: "rgb(245 158 11)" },
]

const customerStats = [
  {
    label: "新客户",
    value: "2,345",
    percentage: "45%",
    color: "bg-blue-500",
  },
  {
    label: "回访客户",
    value: "1,823",
    percentage: "35%",
    color: "bg-green-500",
  },
  {
    label: "VIP 客户",
    value: "1,042",
    percentage: "20%",
    color: "bg-yellow-500",
  },
]

export default function CustomerAnalytics() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-3 sm:p-6 border border-gray-200 dark:border-[#1F1F23] w-full min-w-0">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">客户分析</h3>
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">本月</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <div className="h-32 sm:h-48 w-full flex justify-center">
          <div className="w-32 sm:w-48 h-32 sm:h-48">
            <ChartContainer
              className="h-full w-full"
              config={{
                value: { label: "客户", color: "rgb(59 130 246)" },
              }}
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={customerData} dataKey="value" nameKey="label" innerRadius={42} outerRadius={70} paddingAngle={3}>
                  {customerData.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {customerStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className={`w-3 h-3 rounded-full ${stat.color} flex-shrink-0`} />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{stat.label}</span>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.percentage}</p>
              </div>
            </div>
          ))}

          <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">客户总数</span>
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">5,210</span>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">较上月 +12.5%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
