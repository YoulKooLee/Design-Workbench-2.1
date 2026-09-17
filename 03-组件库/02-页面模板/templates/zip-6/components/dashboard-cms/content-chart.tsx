import React from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

const contentData = [
  { label: "1月", articles: 45, views: 12 },
  { label: "2月", articles: 52, views: 15 },
  { label: "3月", articles: 48, views: 13 },
  { label: "4月", articles: 61, views: 18 },
  { label: "5月", articles: 55, views: 16 },
  { label: "6月", articles: 67, views: 22 },
  { label: "7月", articles: 73, views: 25 },
  { label: "8月", articles: 69, views: 23 },
  { label: "9月", articles: 76, views: 28 },
  { label: "10月", articles: 82, views: 32 },
  { label: "11月", articles: 78, views: 29 },
  { label: "12月", articles: 85, views: 35 },
]

const categoryData = [
  { label: "科技", articles: 156 },
  { label: "商业", articles: 142 },
  { label: "健康", articles: 98 },
  { label: "体育", articles: 87 },
  { label: "娱乐", articles: 76 },
  { label: "政治", articles: 65 },
  { label: "科学", articles: 54 },
]

export default function ContentChart() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-3 sm:p-6 border border-gray-200 dark:border-[#1F1F23] w-full min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">内容表现</h3>
          <select className="text-xs sm:text-sm border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-auto">
            <option>近 12 个月</option>
            <option>近 6 个月</option>
            <option>近 3 个月</option>
          </select>
        </div>
        <ChartContainer
          className="h-64 sm:h-80 w-full"
          config={{
            articles: { label: "已发布文章", color: "rgb(59 130 246)" },
            views: { label: "页面浏览量（K）", color: "rgb(16 185 129)" },
          }}
        >
          <LineChart data={contentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="articles" stroke="var(--color-articles)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-3 sm:p-6 border border-gray-200 dark:border-[#1F1F23] w-full min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">按分类统计内容</h3>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">今年</span>
        </div>
        <ChartContainer
          className="h-48 sm:h-64 w-full"
          config={{
            articles: { label: "文章", color: "rgb(59 130 246)" },
          }}
        >
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="articles" fill="var(--color-articles)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
