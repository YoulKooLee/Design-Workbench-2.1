import React, { useState, useEffect } from "react"
import { X, Workflow, Video, Sparkles, ArrowDown } from "lucide-react"
import { Button } from "./ui/button"

const HERO_DISMISSED_KEY = "hero-banner-dismissed"

export function HeroBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const dismissed = localStorage.getItem(HERO_DISMISSED_KEY)
    if (!dismissed) {
      setVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    localStorage.setItem(HERO_DISMISSED_KEY, "true")
  }

  if (!mounted || !visible) return null

  return (
    <div className="relative z-30 border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
        {/* Left: Title & description */}
        <div className="flex flex-1 items-center gap-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary">
            <Workflow className="h-5 w-5 text-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-foreground leading-tight text-balance">
              UGC Video Agent 工作流构建器
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
              可视化构建 AI 驱动的 UGC 视频流水线。连接模型、脚本和生成节点，然后端到端运行。
            </p>
          </div>
        </div>

        {/* Right: Feature pills & dismiss */}
        <div className="hidden items-center gap-2 md:flex">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            <Video className="h-3 w-3" />
            视频生成
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            AI 模型
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            <ArrowDown className="h-3 w-3" />
            拖放
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 shrink-0 p-0 text-muted-foreground hover:text-foreground"
          onClick={handleDismiss}
          aria-label="关闭横幅"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
