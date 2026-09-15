import * as React from "react"
import { useEffect, useState } from "react"

const LOG_LINES = [
  "> 初始化 AI 管线...",
  "> 加载模型权重: 2.4GB",
  "> 连接数据流...",
  "> 分析代码库...",
  "> 执行推理: batch_01",
  "> 优化轮次: 1/3",
  "> 优化轮次: 2/3",
  "> 优化轮次: 3/3",
  "> 已优化 98%",
  "> 部署至边缘节点...",
  "> 状态: 运行中",
  "> 延迟: 12ms p99",
  "> 吞吐: 14.2k req/s",
  "> 内存: 847MB / 2048MB",
  "> --------- 周期完成 ---------",
]

export function TerminalCard() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        const next = prev + 1
        if (next >= LOG_LINES.length) {
          setLines([])
          return 0
        }
        setLines((l) => [...l.slice(-8), LOG_LINES[next]])
        return next
      })
    }, 600)

    // Add first line
    setLines([LOG_LINES[0]])

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-2">
        <span className="h-2 w-2 bg-[#ea580c]" />
        <span className="h-2 w-2 bg-foreground" />
        <span className="h-2 w-2 border border-foreground" />
        <span className="ml-auto text-[10px] tracking-widest text-muted-foreground uppercase">
          terminal.sys
        </span>
      </div>
      <div className="flex-1 bg-foreground p-4 overflow-hidden">
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => (
            <span
              key={`${currentLine}-${i}`}
              className="text-xs text-background font-mono block"
              style={{ opacity: i === lines.length - 1 ? 1 : 0.6 }}
            >
              {line}
            </span>
          ))}
          <span className="text-xs text-[#ea580c] font-mono animate-blink">{"_"}</span>
        </div>
      </div>
    </div>
  )
}
