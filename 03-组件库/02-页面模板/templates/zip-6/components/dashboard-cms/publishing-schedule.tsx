import React from "react"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Calendar, Edit, Trash2 } from "lucide-react"

interface ScheduledPost {
  id: string
  title: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  scheduledDate: string
  scheduledTime: string
  status: "scheduled" | "publishing" | "failed"
  platform: string[]
}

const scheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    title: "每周科技汇总：最新创新",
    author: {
      name: "科技编辑",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    category: "科技",
    scheduledDate: "今天",
    scheduledTime: "18:00",
    status: "scheduled",
    platform: ["Website", "Twitter", "LinkedIn"],
  },
  {
    id: "2",
    title: "市场分析：第四季度财务报告",
    author: {
      name: "财务分析师",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    category: "商业",
    scheduledDate: "明天",
    scheduledTime: "09:00",
    status: "scheduled",
    platform: ["Website", "Newsletter"],
  },
  {
    id: "3",
    title: "突发：新的气候政策已公布",
    author: {
      name: "新闻记者",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    category: "政治",
    scheduledDate: "12月28日",
    scheduledTime: "14:00",
    status: "publishing",
    platform: ["Website", "Twitter", "Facebook"],
  },
  {
    id: "4",
    title: "新年健康建议",
    author: {
      name: "健康作者",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    category: "健康",
    scheduledDate: "1月1日",
    scheduledTime: "08:00",
    status: "scheduled",
    platform: ["Website", "Instagram"],
  },
  {
    id: "5",
    title: "体育集锦：冠军赛回顾",
    author: {
      name: "体育编辑",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    category: "体育",
    scheduledDate: "12月30日",
    scheduledTime: "19:00",
    status: "failed",
    platform: ["Website", "Twitter"],
  },
]

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  publishing: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

const categoryColors = {
  科技: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  商业: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  政治: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  健康: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  体育: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
}

const statusLabels = {
  scheduled: "已排期",
  publishing: "发布中",
  failed: "失败",
}

export default function PublishingSchedule() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">发布计划</h3>
        <button className="text-sm text-primary hover:underline">新建排期</button>
      </div>

      <div className="space-y-3">
        {scheduledPosts.map((post) => (
          <div
            key={post.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-accent/50 ${
              post.status === "failed"
                ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10"
                : post.status === "publishing"
                  ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
                  : "border-border"
            }`}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback className="text-xs">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate mb-1">{post.title}</h4>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <Badge className={`${categoryColors[post.category as keyof typeof categoryColors]} border-0 text-xs`}>
                    {post.category}
                  </Badge>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {post.scheduledDate} {post.scheduledTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <Badge className={`${statusColors[post.status]} border-0 text-xs`}>{statusLabels[post.status]}</Badge>
              <div className="flex items-center space-x-1">
                <button className="p-1 hover:bg-accent rounded">
                  <Edit className="h-3 w-3 text-muted-foreground" />
                </button>
                <button className="p-1 hover:bg-accent rounded">
                  <Trash2 className="h-3 w-3 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
