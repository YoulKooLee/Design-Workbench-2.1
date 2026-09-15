import * as React from "react"
import { useState } from "react"
import { Play, Plus, X, ListTodo, MessageSquare } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { cn } from "../../lib/utils"

type InputMode = "topic" | "tasks"

interface RunWorkflowDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRun: (input: string) => void
  workflowName: string
}

export function RunWorkflowDialog({
  open,
  onOpenChange,
  onRun,
  workflowName,
}: RunWorkflowDialogProps) {
  const [mode, setMode] = useState<InputMode>("topic")
  const [topic, setTopic] = useState("")
  const [tasks, setTasks] = useState<string[]>([""])

  const handleAddTask = () => {
    setTasks((prev) => [...prev, ""])
  }

  const handleRemoveTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index))
  }

  const handleTaskChange = (index: number, value: string) => {
    setTasks((prev) => prev.map((t, i) => (i === index ? value : t)))
  }

  const handleRun = () => {
    let input: string
    if (mode === "topic") {
      input = topic.trim()
    } else {
      const validTasks = tasks.filter((t) => t.trim().length > 0)
      input = `任务清单：\n${validTasks.map((t, i) => `${i + 1}. ${t.trim()}`).join("\n")}`
    }

    if (!input) return
    onRun(input)
    onOpenChange(false)
    // Reset
    setTopic("")
    setTasks([""])
  }

  const isValid =
    mode === "topic"
      ? topic.trim().length > 0
      : tasks.some((t) => t.trim().length > 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">运行工作流</DialogTitle>
          <DialogDescription>
            为{" "}
            <span className="font-medium text-foreground">{workflowName}</span>{" "}
            提供主题或任务清单。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Mode Switcher */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("topic")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-all min-h-[48px]",
                mode === "topic"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
              )}
            >
              <MessageSquare className="h-4 w-4" />
              主题 / 提示词
            </button>
            <button
              type="button"
              onClick={() => setMode("tasks")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-all min-h-[48px]",
                mode === "tasks"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
              )}
            >
              <ListTodo className="h-4 w-4" />
              任务清单
            </button>
          </div>

          {/* Topic Input */}
          {mode === "topic" && (
            <div className="space-y-2">
              <Label htmlFor="workflow-topic">
                这个工作流应该聚焦什么？
              </Label>
              <Textarea
                id="workflow-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="例如：写一篇关于 2026 年可持续能源趋势的博客文章..."
                rows={4}
                className="resize-none text-base"
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                工作流中的第一个智能体会把它作为起始上下文。
              </p>
            </div>
          )}

          {/* Task List Input */}
          {mode === "tasks" && (
            <div className="space-y-3">
              <Label>定义任务清单</Label>
              <div className="space-y-2">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-mono text-muted-foreground">
                      {index + 1}
                    </span>
                    <Input
                      value={task}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      placeholder={`任务 ${index + 1}...`}
                      className="text-base"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTask()
                        }
                      }}
                    />
                    {tasks.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 shrink-0"
                        onClick={() => handleRemoveTask(index)}
                        aria-label={`移除任务 ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full min-h-[44px] bg-transparent"
                onClick={handleAddTask}
              >
                <Plus className="mr-2 h-4 w-4" />
                添加任务
              </Button>
              <p className="text-xs text-muted-foreground">
                按 Enter 可快速添加更多任务。完整清单会传给第一个智能体。
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent">
            取消
          </Button>
          <Button
            onClick={handleRun}
            disabled={!isValid}
            className="gap-2 bg-status-success hover:bg-status-success/90 text-primary-foreground"
          >
            <Play className="h-4 w-4" />
            启动工作流
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
