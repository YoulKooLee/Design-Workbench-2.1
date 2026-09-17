import React from "react"
import { Badge } from "../ui/badge"
import { TrendingUp, Eye, MessageSquare, Share2 } from "lucide-react"

interface Article {
  id: string
  title: string
  category: string
  views: number
  comments: number
  shares: number
  trend: number
  publishDate: string
  readTime: string
}

const articles: Article[] = [
  {
    id: "1",
    title: "提升远程工作效率的 10 个关键技巧",
    category: "商业",
    views: 15420,
    comments: 89,
    shares: 234,
    trend: 23.5,
    publishDate: "3 天前",
    readTime: "阅读 5 分钟",
  },
  {
    id: "2",
    title: "机器学习完整指南",
    category: "科技",
    views: 12890,
    comments: 156,
    shares: 445,
    trend: 18.2,
    publishDate: "1 周前",
    readTime: "阅读 12 分钟",
  },
  {
    id: "3",
    title: "可持续生活：小改变带来大影响",
    category: "生活方式",
    views: 9876,
    comments: 67,
    shares: 189,
    trend: 15.7,
    publishDate: "2 天前",
    readTime: "阅读 7 分钟",
  },
  {
    id: "4",
    title: "2024 年加密货币市场分析",
    category: "财务",
    views: 8543,
    comments: 203,
    shares: 567,
    trend: 12.3,
    publishDate: "5 天前",
    readTime: "阅读 9 分钟",
  },
  {
    id: "5",
    title: "数字时代的心理健康",
    category: "健康",
    views: 7234,
    comments: 45,
    shares: 123,
    trend: 9.8,
    publishDate: "1 周前",
    readTime: "阅读 6 分钟",
  },
]

const categoryColors = {
  商业: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  科技: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  生活方式: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  财务: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  健康: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

export default function PopularArticles() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">热门文章</h3>
        <select className="text-sm border border-border rounded-md px-2 py-1 bg-background text-foreground">
          <option>本周</option>
          <option>本月</option>
          <option>全部时间</option>
        </select>
      </div>
      <div className="space-y-3">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className="flex items-center space-x-3 p-3 hover:bg-accent/50 rounded-lg transition-colors"
          >
            <div className="flex items-center justify-center w-6 h-6 bg-muted rounded-full text-xs font-medium text-muted-foreground flex-shrink-0">
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground truncate flex-1">{article.title}</h4>
                <div className="flex items-center ml-2 flex-shrink-0">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">+{article.trend}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`${categoryColors[article.category as keyof typeof categoryColors]} border-0 text-xs`}
                  >
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{article.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="h-3 w-3" />
                    <span>{article.shares}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
