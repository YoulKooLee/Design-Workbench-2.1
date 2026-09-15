import React from "react"
import { FileText } from "lucide-react"

export default function BlankContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full">
        <FileText className="w-8 h-8 text-gray-600 dark:text-gray-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">空白页</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          这是一个带侧边导航和顶部栏的空白页面。你可以从这里开始搭建内容。
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">开始使用</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          这个页面展示了包含响应式侧边栏和导航组件的布局结构。
        </p>
      </div>
    </div>
  )
}
