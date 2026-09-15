import React, { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Camera, Search, Maximize, RotateCcw, MapPin, Keyboard } from "lucide-react"
import type * as THREE from "three"

interface UIOverlayProps {
  onResetView: () => void
  onScreenshot: () => void
  onToggleFullscreen: () => void
  cameraPosition?: THREE.Vector3
  cameraTarget?: THREE.Vector3
}

export function UIOverlay({
  onResetView,
  onScreenshot,
  onToggleFullscreen,
  cameraPosition,
  cameraTarget,
}: UIOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [showMinimap, setShowMinimap] = useState(false)

  const distance = cameraPosition ? cameraPosition.length() : 0
  const lightYearDistance = (distance * 1000).toFixed(0)

  return (
    <>
      {/* Top Bar */}
      <div className="absolute left-4 right-4 top-4 z-10 flex flex-col items-start justify-between gap-3 md:flex-row">
        {/* Info Panel */}
        <Card className="max-w-[min(24rem,calc(100vw-2rem))] border-gray-700 bg-black/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <h1 className="text-xl font-bold text-white mb-2">Milky Way 银河浏览器</h1>
            <p className="text-sm text-gray-300 mb-2">
              在 3D 空间中探索银河，观察真实感旋臂结构与星体分布。
            </p>
            <div className="text-xs text-gray-400">
              <p>• 拖动可旋转视角</p>
              <p>• 滚动可放大或缩小</p>
              <p>• 右键拖动可平移</p>
            </div>
          </CardContent>
        </Card>

        {/* Search and Tools */}
        <div className="flex w-full max-w-sm gap-2 md:w-auto">
          <div className="relative min-w-0 flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="搜索星体、星系..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-gray-700 bg-black/80 pl-10 text-white backdrop-blur-sm md:w-64"
            />
          </div>

          <Button
            onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
            variant="secondary"
            size="icon"
            className="shrink-0 border-gray-700 bg-black/80 backdrop-blur-sm"
          >
            <Keyboard className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 right-20 flex flex-wrap gap-2 md:right-auto">
        <Button
          onClick={onResetView}
          variant="secondary"
          size="sm"
          className="border-gray-700 bg-black/80 text-white backdrop-blur-sm"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          重置视角
        </Button>

        <Button
          onClick={onScreenshot}
          variant="secondary"
          size="sm"
          className="border-gray-700 bg-black/80 text-white backdrop-blur-sm"
        >
          <Camera className="w-4 h-4 mr-2" />
          截图
        </Button>

        <Button
          onClick={onToggleFullscreen}
          variant="secondary"
          size="sm"
          className="border-gray-700 bg-black/80 text-white backdrop-blur-sm"
        >
          <Maximize className="w-4 h-4 mr-2" />
          全屏
        </Button>

        <Button
          onClick={() => setShowMinimap(!showMinimap)}
          variant="secondary"
          size="sm"
          className="border-gray-700 bg-black/80 text-white backdrop-blur-sm"
        >
          <MapPin className="w-4 h-4 mr-2" />
          小地图
        </Button>
      </div>

      {/* Distance Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 md:bottom-4">
        <Card className="border-gray-700 bg-black/80 backdrop-blur-sm">
          <CardContent className="p-2 px-4">
            <div className="text-center text-white text-sm">
              距离：<span className="font-mono">{lightYearDistance}</span> 光年
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md border-gray-700 bg-black/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-lg font-semibold">键盘快捷键</h3>
                <Button
                  onClick={() => setShowKeyboardShortcuts(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400"
                >
                  ×
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 text-sm text-gray-300 sm:grid-cols-2">
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">R</kbd> 重置视角
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">S</kbd> 截图
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">F</kbd> 全屏
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">A</kbd> 自动旋转
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">C</kbd> 星座连线
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">L</kbd> 星体标签
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">M</kbd> 小地图
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">?</kbd> 帮助
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Minimap */}
      {showMinimap && (
        <div className="absolute right-4 top-36 h-48 w-48 md:right-80 md:top-4">
          <Card className="h-full border-gray-700 bg-black/80 backdrop-blur-sm">
            <CardContent className="p-2 h-full">
              <div className="text-white text-xs mb-1">银河概览</div>
              <div className="relative w-full h-full bg-gray-900 rounded border border-gray-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full"></div>
                <div className="absolute inset-4 border border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-8 border border-blue-500/10 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
