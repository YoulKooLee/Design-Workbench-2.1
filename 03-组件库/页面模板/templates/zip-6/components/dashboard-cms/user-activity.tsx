import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Edit, Eye, MessageSquare, Plus, Trash2, Upload } from "lucide-react"

interface Activity {
  id: string
  user: {
    name: string
    avatar?: string
    role: string
  }
  action: "created" | "edited" | "deleted" | "commented" | "uploaded" | "viewed"
  target: string
  timestamp: string
  details?: string
}

const activities: Activity[] = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Editor",
    },
    action: "created",
    target: "新文章「医疗健康中的 AI」",
    timestamp: "5 分钟前",
    details: "科技分类",
  },
  {
    id: "2",
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Writer",
    },
    action: "edited",
    target: "2024 全球经济趋势",
    timestamp: "15 分钟前",
    details: "已更新统计部分",
  },
  {
    id: "3",
    user: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Admin",
    },
    action: "uploaded",
    target: "hero-banner-2024.jpg",
    timestamp: "1 小时前",
    details: "2.4 MB 图片文件",
  },
  {
    id: "4",
    user: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Moderator",
    },
    action: "commented",
    target: "气候变化解决方案",
    timestamp: "2 小时前",
    details: "已通过用户评论",
  },
  {
    id: "5",
    user: {
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Writer",
    },
    action: "deleted",
    target: "草稿：过时科技新闻",
    timestamp: "3 小时前",
    details: "已移除过期内容",
  },
  {
    id: "6",
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Viewer",
    },
    action: "viewed",
    target: "远程工作效率",
    timestamp: "4 小时前",
    details: "页面分析已更新",
  },
]

const getActionIcon = (action: string) => {
  switch (action) {
    case "created":
      return <Plus className="h-4 w-4" />
    case "edited":
      return <Edit className="h-4 w-4" />
    case "deleted":
      return <Trash2 className="h-4 w-4" />
    case "commented":
      return <MessageSquare className="h-4 w-4" />
    case "uploaded":
      return <Upload className="h-4 w-4" />
    case "viewed":
      return <Eye className="h-4 w-4" />
    default:
      return <Edit className="h-4 w-4" />
  }
}

const getActionColor = (action: string) => {
  switch (action) {
    case "created":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    case "edited":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    case "deleted":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    case "commented":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    case "uploaded":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "viewed":
      return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"
  }
}

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    case "Editor":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    case "Writer":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "Moderator":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
    case "Viewer":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case "Admin":
      return "管理员"
    case "Editor":
      return "编辑"
    case "Writer":
      return "作者"
    case "Moderator":
      return "审核员"
    case "Viewer":
      return "查看者"
    default:
      return role
  }
}

const getActionLabel = (action: string) => {
  switch (action) {
    case "created":
      return "创建了"
    case "edited":
      return "编辑了"
    case "deleted":
      return "删除了"
    case "commented":
      return "评论了"
    case "uploaded":
      return "上传了"
    case "viewed":
      return "查看了"
    default:
      return "更新了"
  }
}

export default function UserActivity() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">用户活动</h3>
        <button className="text-sm text-primary hover:underline">查看全部</button>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-3 p-3 hover:bg-accent/50 rounded-lg transition-colors"
          >
            <div className={`p-2 rounded-full ${getActionColor(activity.action)} flex-shrink-0`}>
              {getActionIcon(activity.action)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback className="text-xs">
                      {activity.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{activity.user.name}</span>
                  <Badge className={`${getRoleBadgeColor(activity.user.role)} border-0 text-xs`}>
                    {getRoleLabel(activity.user.role)}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{activity.timestamp}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                <span>{getActionLabel(activity.action)}</span> {activity.target}
                {activity.details && <span className="text-xs"> • {activity.details}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">今日 24 位活跃用户</span>
          <button className="text-primary hover:underline">用户管理</button>
        </div>
      </div>
    </div>
  )
}
