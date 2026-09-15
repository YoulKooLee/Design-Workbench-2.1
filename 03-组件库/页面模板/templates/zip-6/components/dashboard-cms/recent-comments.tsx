import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { ThumbsUp, Flag, MoreHorizontal } from "lucide-react"

interface Comment {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  article: string
  timestamp: string
  likes: number
  status: "approved" | "pending" | "flagged"
  isReply?: boolean
}

const comments: Comment[] = [
  {
    id: "1",
    author: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "很棒的文章！这确实帮助我更好地理解了这个概念。",
    article: "AI 在医疗健康领域的未来",
    timestamp: "2 分钟前",
    likes: 5,
    status: "approved",
  },
  {
    id: "2",
    author: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "我不同意这里提到的一些观点。数据看起来有些过时。",
    article: "2024 全球经济趋势",
    timestamp: "15 分钟前",
    likes: 2,
    status: "pending",
  },
  {
    id: "3",
    author: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "感谢分享！可以提供更多来源吗？",
    article: "气候变化解决方案",
    timestamp: "1 小时前",
    likes: 8,
    status: "approved",
    isReply: true,
  },
  {
    id: "4",
    author: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "这是垃圾内容，应立即移除。",
    article: "远程工作文化",
    timestamp: "2 小时前",
    likes: 0,
    status: "flagged",
  },
  {
    id: "5",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "洞察很有价值！期待看到更多类似内容。",
    article: "量子计算研究",
    timestamp: "3 小时前",
    likes: 12,
    status: "approved",
  },
]

const statusColors = {
  approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  flagged: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

const statusLabels = {
  approved: "已通过",
  pending: "待审核",
  flagged: "已标记",
}

export default function RecentComments() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">近期评论</h3>
        <button className="text-sm text-primary hover:underline">全部审核</button>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-3 rounded-lg border transition-colors hover:bg-accent/50 ${
              comment.status === "flagged"
                ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10"
                : comment.status === "pending"
                  ? "border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10"
                  : "border-border"
            }`}
          >
            <div className="flex items-start space-x-3">
              <Avatar className="h-7 w-7 flex-shrink-0">
                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback className="text-xs">
                  {comment.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{comment.author.name}</span>
                    {comment.isReply && (
                      <Badge variant="outline" className="text-xs">
                        回复
                      </Badge>
                    )}
                    <Badge className={`${statusColors[comment.status]} border-0 text-xs`}>
                      {statusLabels[comment.status]}
                    </Badge>
                  </div>
                  <button className="p-1 hover:bg-accent rounded">
                    <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{comment.content}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span>来自「{comment.article}」</span>
                    <span>•</span>
                    <span>{comment.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {comment.status === "pending" && (
                    <div className="flex items-center space-x-1">
                      <button className="text-green-600 hover:text-green-700 font-medium">通过</button>
                      <button className="text-red-600 hover:text-red-700 font-medium">拒绝</button>
                    </div>
                  )}
                  {comment.status === "flagged" && (
                    <div className="flex items-center space-x-1 text-red-600">
                      <Flag className="h-3 w-3" />
                      <span>已标记</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
