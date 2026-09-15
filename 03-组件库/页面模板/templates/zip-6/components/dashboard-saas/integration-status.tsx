import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CheckCircle, AlertCircle, XCircle, Settings } from "lucide-react"

export function IntegrationStatus() {
  const integrations = [
    { name: "Shopify", status: "connected", lastSync: "2 分钟前" },
    { name: "Amazon", status: "connected", lastSync: "5 分钟前" },
    { name: "eBay", status: "warning", lastSync: "1 小时前" },
    { name: "Facebook Shop", status: "connected", lastSync: "10 分钟前" },
    { name: "Google Merchant", status: "error", lastSync: "失败" },
    { name: "Instagram Shop", status: "connected", lastSync: "3 分钟前" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">集成状态</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">平台连接与同步状态</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center">
                {getStatusIcon(integration.status)}
                <span className="ml-3 font-medium text-gray-900 dark:text-white">{integration.name}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{integration.lastSync}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          管理集成
        </button>
      </CardContent>
    </Card>
  )
}
