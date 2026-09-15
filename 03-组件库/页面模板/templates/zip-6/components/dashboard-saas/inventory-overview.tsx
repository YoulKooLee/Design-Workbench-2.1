import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Package, AlertTriangle } from "lucide-react"

export function InventoryOverview() {
  const categories = [
    { name: "电子产品", stock: 1247, lowStock: 23, trend: "+5%" },
    { name: "服装", stock: 2891, lowStock: 45, trend: "+12%" },
    { name: "家居与园艺", stock: 1634, lowStock: 18, trend: "-3%" },
    { name: "体育", stock: 892, lowStock: 12, trend: "+8%" },
    { name: "图书", stock: 567, lowStock: 7, trend: "+2%" },
  ]

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900 dark:text-white">
          <Package className="mr-2 h-5 w-5" />
          库存概览
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">按分类查看库存水平</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{category.trend}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>{category.stock} 件商品</span>
                  {category.lowStock > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <AlertTriangle className="mr-1 h-3 w-3 text-orange-500" />
                      <span className="text-orange-600 dark:text-orange-400">{category.lowStock} 个低库存</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
