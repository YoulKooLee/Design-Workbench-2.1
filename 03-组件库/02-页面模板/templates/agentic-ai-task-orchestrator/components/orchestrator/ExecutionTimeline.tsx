import * as React from "react"
import { useRef, useEffect } from "react"
import {
  X,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  UserCheck,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { cn } from "../../lib/utils"
import { useWorkflowStore, useExecutionLog } from "../../lib/orchestrator/store"
import type { ExecutionLogEntry } from "../../lib/orchestrator/types"

const typeConfig: Record<
  ExecutionLogEntry["type"],
  { icon: React.ElementType; className: string }
> = {
  start: { icon: Play, className: "text-status-running" },
  progress: { icon: Loader2, className: "text-muted-foreground" },
  complete: { icon: CheckCircle, className: "text-status-success" },
  error: { icon: XCircle, className: "text-destructive" },
  approval: { icon: UserCheck, className: "text-status-paused" },
}

function LogEntry({ entry }: { entry: ExecutionLogEntry }) {
  const [expanded, setExpanded] = React.useState(false)
  const config = typeConfig[entry.type]
  const Icon = config.icon

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const hasData = Boolean(entry.data && typeof entry.data === "object")

  return (
    <div className="flex items-start gap-2 sm:gap-3 py-2 border-b border-border last:border-b-0">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        <Icon
          className={cn(
            "h-4 w-4",
            config.className,
            entry.type === "progress" && "animate-spin"
          )}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
            {formatTime(entry.timestamp)}
          </span>
          <span className="text-xs font-medium text-foreground truncate">
            {entry.nodeName}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 break-words">
          {entry.message}
        </p>

        {hasData && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-primary mt-1 hover:underline min-h-[32px]"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3 w-3" />
                隐藏详情
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                显示详情
              </>
            )}
          </button>
        )}

        {expanded && hasData && (
          <pre className="mt-2 p-2 rounded-md bg-muted text-[10px] sm:text-xs overflow-auto max-h-32">
            {JSON.stringify(entry.data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}

export function ExecutionTimeline() {
  const { timelineOpen, setTimelineOpen, executionStatus } = useWorkflowStore()
  const executionLog = useExecutionLog()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [executionLog.length])

  if (!timelineOpen) return null

  const isRunning = executionStatus === "running" || executionStatus === "validating"

  return (
    <div className="shrink-0 h-40 sm:h-64 border-t border-border bg-card animate-fade-in">
      <div className="flex h-11 items-center justify-between border-b border-border px-3 sm:px-4">
        <div className="flex items-center gap-2 min-w-0">
          <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-foreground truncate">
            时间线
          </span>
          {isRunning && (
            <span className="flex items-center gap-1 text-[10px] sm:text-xs text-status-running shrink-0">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="hidden sm:inline">运行中</span>
            </span>
          )}
          <span className="text-[10px] sm:text-xs text-muted-foreground shrink-0">
            ({executionLog.length})
          </span>
        </div>
        <button
          type="button"
          onClick={() => setTimelineOpen(false)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground shrink-0"
          aria-label="关闭时间线"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ScrollArea className="h-[calc(100%-2.75rem)]" ref={scrollRef}>
        <div className="p-3 sm:p-4">
          {executionLog.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <AlertCircle className="h-6 w-6 text-muted-foreground mb-2" />
              <p className="text-xs sm:text-sm text-muted-foreground">暂无执行历史</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                运行工作流后可查看时间线
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {executionLog.map((entry) => (
                <LogEntry key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
