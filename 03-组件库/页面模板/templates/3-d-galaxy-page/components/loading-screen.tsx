import React from "react"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">正在加载银河...</p>
        <p className="text-gray-400 text-sm mt-2">正在生成星体与宇宙结构</p>
      </div>
    </div>
  )
}
