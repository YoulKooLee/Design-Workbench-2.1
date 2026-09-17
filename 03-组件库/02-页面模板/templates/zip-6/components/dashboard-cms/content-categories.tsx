import React from "react"
import { Badge } from "../ui/badge"
import { MoreHorizontal, Plus, TrendingUp, TrendingDown } from "lucide-react"

interface Category {
  id: string
  name: string
  count: number
  change: number
  color: string
  description: string
}

const categories: Category[] = [
  {
    id: "1",
    name: "科技",
    count: 156,
    change: 12.5,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    description: "科技新闻与教程",
  },
  {
    id: "2",
    name: "商业",
    count: 142,
    change: 8.3,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    description: "商业洞察",
  },
  {
    id: "3",
    name: "健康",
    count: 98,
    change: -2.1,
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    description: "健康与生活方式",
  },
  {
    id: "4",
    name: "体育",
    count: 87,
    change: 15.7,
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    description: "体育报道",
  },
  {
    id: "5",
    name: "娱乐",
    count: 76,
    change: 5.2,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    description: "娱乐新闻",
  },
  {
    id: "6",
    name: "政治",
    count: 65,
    change: -8.4,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    description: "政治分析",
  },
]

export default function ContentCategories() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">内容分类</h3>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <Plus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors group"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Badge className={`${category.color} border-0 flex-shrink-0`}>{category.name}</Badge>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{category.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{category.count}</p>
                <div className="flex items-center justify-end">
                  {category.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${category.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    {category.change > 0 ? "+" : ""}
                    {category.change}%
                  </span>
                </div>
              </div>

              
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">文章总数</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </div>
      </div>
    </div>
  )
}
