import * as React from "react"
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  FolderOpen,
  Plus,
  Loader2,
  Check,
  AlertCircle,
  Menu,
  Sparkles,
  MoreVertical,
} from "lucide-react"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { cn } from "../../lib/utils"
import { useWorkflowStore } from "../../lib/orchestrator/store"
import { getAllWorkflows } from "../../lib/orchestrator/persistence"
import type { WorkflowStatus, SavedWorkflow } from "../../lib/orchestrator/types"

const statusConfig: Record<
  WorkflowStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  idle: {
    label: "就绪",
    icon: null,
    className: "bg-muted text-muted-foreground",
  },
  validating: {
    label: "校验中",
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
    className: "bg-primary/20 text-primary",
  },
  running: {
    label: "运行中",
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
    className: "bg-primary/20 text-primary",
  },
  paused: {
    label: "已暂停",
    icon: <Pause className="h-3 w-3" />,
    className: "bg-status-paused/20 text-status-paused",
  },
  success: {
    label: "完成",
    icon: <Check className="h-3 w-3" />,
    className: "bg-status-success/20 text-status-success",
  },
  error: {
    label: "错误",
    icon: <AlertCircle className="h-3 w-3" />,
    className: "bg-destructive/20 text-destructive",
  },
}

interface CanvasToolbarProps {
  onStartExecution: () => void
  onToggleMobileSidebar?: () => void
}

export function CanvasToolbar({
  onStartExecution,
  onToggleMobileSidebar,
}: CanvasToolbarProps) {
  const {
    workflowName,
    setWorkflowName,
    executionStatus,
    pauseExecution,
    cancelExecution,
    clearExecution,
    saveCurrentWorkflow,
    loadSavedWorkflow,
    newWorkflow,
    nodes,
    toggleTimeline,
    timelineOpen,
  } = useWorkflowStore()

  const [savedWorkflows, setSavedWorkflows] = React.useState<SavedWorkflow[]>(
    []
  )
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedName, setEditedName] = React.useState(workflowName)

  React.useEffect(() => {
    setSavedWorkflows(getAllWorkflows())
  }, [])

  const handleSave = () => {
    saveCurrentWorkflow()
    setSavedWorkflows(getAllWorkflows())
  }

  const handleLoad = (id: string) => {
    loadSavedWorkflow(id)
    setSavedWorkflows(getAllWorkflows())
  }

  const handleNameSubmit = () => {
    setWorkflowName(editedName)
    setIsEditing(false)
  }

  const canRun = nodes.length > 0 && executionStatus === "idle"
  const isRunning =
    executionStatus === "running" || executionStatus === "validating"
  const isPaused = executionStatus === "paused"
  const isComplete =
    executionStatus === "success" || executionStatus === "error"
  const status = statusConfig[executionStatus]

  return (
    <header
      className="flex h-14 shrink-0 items-center border-b border-border bg-card"
      role="toolbar"
      aria-label="工作流控制"
    >
      {/* ── Left: hamburger + brand + name ── */}
      <div className="flex items-center gap-1 pl-2 sm:gap-2 sm:pl-3 min-w-0">
        {/* Mobile hamburger */}
        {onToggleMobileSidebar && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted active:bg-muted/70 md:hidden"
            aria-label="打开智能体库"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {/* Brand mark (compact on mobile) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="hidden sm:inline text-sm font-semibold text-foreground">
            AgentFlow
          </span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-5 w-px bg-border mx-1" />

        {/* Editable workflow name */}
        <div className="min-w-0">
          {isEditing ? (
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameSubmit()
                if (e.key === "Escape") {
                  setEditedName(workflowName)
                  setIsEditing(false)
                }
              }}
              className="h-8 w-36 sm:w-48 bg-background text-base"
              autoFocus
              aria-label="工作流名称"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setEditedName(workflowName)
                setIsEditing(true)
              }}
              className="block truncate max-w-[100px] sm:max-w-[180px] text-sm font-medium text-foreground hover:text-primary transition-colors"
              aria-label="编辑工作流名称"
            >
              {workflowName}
            </button>
          )}
        </div>

        {/* Status pill */}
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0 leading-none",
            status.className
          )}
          aria-live="polite"
        >
          {status.icon}
          <span className="hidden xs:inline sm:inline">{status.label}</span>
        </span>
      </div>

      {/* ── Center: execution controls ── */}
      <div className="flex items-center gap-1 sm:gap-1.5 mx-auto px-1">
        <TooltipProvider delayDuration={0}>
          {/* Run / Resume */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onStartExecution}
                disabled={!canRun}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-1.5 rounded-lg px-3 sm:px-4 text-sm font-medium transition-colors",
                  "bg-status-success text-primary-foreground hover:bg-status-success/90 active:bg-status-success/80",
                  "disabled:pointer-events-none disabled:opacity-40"
                )}
                aria-label="运行工作流"
              >
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline">运行</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>执行工作流</p>
            </TooltipContent>
          </Tooltip>

          {/* Pause (only while running) */}
          {isRunning && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={pauseExecution}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted active:bg-muted/70"
                  aria-label="暂停执行"
                >
                  <Pause className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>暂停</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Stop (running or paused) */}
          {(isRunning || isPaused) && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={cancelExecution}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-destructive text-destructive-foreground transition-colors hover:bg-destructive/90 active:bg-destructive/80"
                  aria-label="停止执行"
                >
                  <Square className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>停止</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Reset (after complete) */}
          {isComplete && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={clearExecution}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted active:bg-muted/70"
                  aria-label="重置执行"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>重置</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>

      {/* ── Right: utility actions ── */}
      <div className="flex items-center gap-0.5 pr-2 sm:pr-3">
        <TooltipProvider delayDuration={0}>
          {/* Timeline toggle, visible on all sizes */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={toggleTimeline}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-1 rounded-lg px-2.5 text-xs font-medium transition-colors",
                  timelineOpen
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/70"
                )}
                aria-label="切换执行时间线"
                aria-pressed={timelineOpen}
              >
                <span className="hidden sm:inline">日志</span>
                <span className="sm:hidden text-[10px]">日志</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>执行时间线</p>
            </TooltipContent>
          </Tooltip>

          {/* Save action, icon only, always visible */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted/70"
                aria-label="保存工作流"
              >
                <Save className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>保存</p>
            </TooltipContent>
          </Tooltip>

          {/* Overflow menu: load and new actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted/70"
                aria-label="更多操作"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onClick={() => newWorkflow()}>
                <Plus className="mr-2 h-4 w-4" />
                新建工作流
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {savedWorkflows.length > 0 ? (
                <>
                  {savedWorkflows.map((w) => (
                    <DropdownMenuItem
                      key={w.id}
                      onClick={() => handleLoad(w.id)}
                    >
                      <FolderOpen className="mr-2 h-4 w-4" />
                      {w.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </>
              ) : (
                <>
                  <DropdownMenuItem disabled>
                    <FolderOpen className="mr-2 h-4 w-4" />
                    暂无已保存工作流
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>
      </div>
    </header>
  )
}
