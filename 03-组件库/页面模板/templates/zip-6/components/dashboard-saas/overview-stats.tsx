import React from "react"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export function OverviewStats() {
  const stats = [
    {
      title: "总收入",
      value: "$847,392",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "较上月",
    },
    {
      title: "订单总数",
      value: "3,247",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      description: "全渠道",
    },
    {
      title: "活跃客户",
      value: "12,847",
      change: "+23.1%",
      trend: "up",
      icon: Users,
      description: "月活用户",
    },
    {
      title: "库存项目",
      value: "8,392",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      description: "SKU 总数",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              {stat.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
              <span className="ml-1">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
