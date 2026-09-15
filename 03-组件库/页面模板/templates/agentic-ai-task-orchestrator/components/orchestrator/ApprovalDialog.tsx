import * as React from "react"
import { useState } from "react"
import { UserCheck, MessageSquare, Clock, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { ScrollArea } from "../ui/scroll-area"
import { Badge } from "../ui/badge"
import { cn } from "../../lib/utils"
import { useWorkflowStore, usePendingApproval } from "../../lib/orchestrator/store"
import type { ApprovalGateNodeData } from "../../lib/orchestrator/types"

export function ApprovalDialog() {
  const { nodes, nodeResults, resumeExecution, cancelExecution } =
    useWorkflowStore()
  const pendingApproval = usePendingApproval()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")

  if (!pendingApproval) {
    return null
  }

  const approvalNode = nodes.find((n) => n.id === pendingApproval)
  if (!approvalNode || approvalNode.type !== "approvalGateNode") {
    return null
  }

  const data = approvalNode.data as ApprovalGateNodeData

  const isApprovalOption = (option: string) => {
    const normalized = option.toLowerCase()
    return (
      normalized.includes("approve") ||
      normalized.includes("accept") ||
      option.includes("批准") ||
      option.includes("通过") ||
      option.includes("同意") ||
      option.includes("接受")
    )
  }

  const isRejectOption = (option: string) => {
    const normalized = option.toLowerCase()
    return (
      normalized.includes("reject") ||
      normalized.includes("deny") ||
      option.includes("拒绝") ||
      option.includes("驳回")
    )
  }

  // Get context from upstream nodes
  const upstreamContext = Object.entries(nodeResults)
    .filter(([, result]) => result.output)
    .map(([nodeId, result]) => {
      const node = nodes.find((n) => n.id === nodeId)
      return {
        nodeName: node?.data?.label || nodeId,
        output: result.output,
      }
    })

  const handleApprove = () => {
    if (!selectedOption) return

    const isApproved = isApprovalOption(selectedOption)

    resumeExecution({
      nodeId: pendingApproval,
      decision: isApproved ? "approved" : "rejected",
      feedback: feedback || undefined,
      timestamp: Date.now(),
    })

    // Reset state
    setSelectedOption(null)
    setFeedback("")
  }

  const handleCancel = () => {
    cancelExecution()
    setSelectedOption(null)
    setFeedback("")
  }

  return (
    <Dialog open={!!pendingApproval} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-status-paused/20">
              <UserCheck className="h-5 w-5 text-status-paused" />
            </div>
            <div>
              <DialogTitle className="text-lg">{data.label}</DialogTitle>
              <DialogDescription>{data.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Context from upstream nodes */}
          {upstreamContext.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                上一步上下文
              </Label>
              <ScrollArea className="h-40 rounded-lg border border-border bg-muted/30 p-3">
                <div className="space-y-3">
                  {upstreamContext.map((ctx, index) => (
                    <div key={index} className="space-y-1">
                      <Badge variant="outline" className="text-xs">
                        {ctx.nodeName}
                      </Badge>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {typeof ctx.output === "string"
                          ? ctx.output
                          : JSON.stringify(ctx.output, null, 2)}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Approval options */}
          <div className="space-y-2">
            <Label>你的决策</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {data.approvalOptions.map((option) => {
                const isApprove = isApprovalOption(option)
                const isReject = isRejectOption(option)

                return (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={cn(
                      "flex items-center justify-center rounded-lg border-2 p-4 text-sm font-medium transition-all",
                      selectedOption === option
                        ? isApprove
                          ? "border-status-success bg-status-success/10 text-status-success"
                          : isReject
                            ? "border-destructive bg-destructive/10 text-destructive"
                            : "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card hover:border-muted-foreground"
                    )}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">反馈（选填）</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="为这个决策添加备注或反馈..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Timeout warning */}
          {data.timeout && (
            <div className="flex items-center gap-2 rounded-lg border border-status-paused/30 bg-status-paused/10 p-3 text-sm text-status-paused">
              <Clock className="h-4 w-4 shrink-0" />
              <span>
                如果没有操作，本次审批将在 {data.timeout} 秒后超时。
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel}>
            取消工作流
          </Button>
          <Button
            onClick={handleApprove}
            disabled={!selectedOption}
            className={cn(
              selectedOption && isApprovalOption(selectedOption)
                ? "bg-status-success hover:bg-status-success/90"
                : selectedOption && isRejectOption(selectedOption)
                  ? "bg-destructive hover:bg-destructive/90"
                  : ""
            )}
          >
            {selectedOption || "选择一个选项"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
