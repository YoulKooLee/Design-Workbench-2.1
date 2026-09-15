import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { month: "1月", revenue: 65000, orders: 245 },
  { month: "2月", revenue: 72000, orders: 267 },
  { month: "3月", revenue: 68000, orders: 251 },
  { month: "4月", revenue: 85000, orders: 312 },
  { month: "5月", revenue: 92000, orders: 334 },
  { month: "6月", revenue: 88000, orders: 298 },
  { month: "7月", revenue: 95000, orders: 356 },
  { month: "8月", revenue: 102000, orders: 378 },
  { month: "9月", revenue: 98000, orders: 342 },
  { month: "10月", revenue: 115000, orders: 398 },
  { month: "11月", revenue: 125000, orders: 425 },
  { month: "12月", revenue: 135000, orders: 456 },
]

export function RevenueChart() {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">收入趋势</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">全部销售渠道的月收入</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "收入",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{ fill: "var(--color-revenue)" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
