import * as React from "react"
import { memo } from "react"
import type { NodeProps } from "@xyflow/react"
import { UserCheck, Clock, MessageSquare } from "lucide-react"
import { BaseNode, NodeHeader, NodeContent, NodeFooter } from "./BaseNode"
import type { ApprovalGateNodeData } from "../../lib/orchestrator/types"

function ApprovalGateNodeComponent({
  data,
  selected,
}: NodeProps) {
  const d = data as unknown as ApprovalGateNodeData
  const statusText = {
    idle: "等待中",
    pending: "等待审批",
    running: "审阅中",
    success: "已批准",
    error: "已拒绝",
    paused: "待决策",
  }

  return (
    <BaseNode
      selected={selected}
      status={d.status}
      color="hsl(41, 100%, 70%)"
      className="w-[220px]"
    >
      <NodeHeader
        icon={<UserCheck className="h-4 w-4" />}
        title={d.label}
        subtitle="审批关卡"
        color="hsl(41, 100%, 70%)"
      />

      <NodeContent>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {d.description}
        </p>

        {/* Options preview */}
        <div className="mt-2 flex flex-wrap gap-1">
          {d.approvalOptions.slice(0, 3).map((option) => (
            <span
              key={option}
              className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {option}
            </span>
          ))}
        </div>

        {/* Decision display */}
        {d.decision && (
          <div
            className={`mt-2 rounded-md p-2 text-xs ${
              d.status === "success"
                ? "bg-status-success/10 text-status-success"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            <p className="font-medium">{d.decision}</p>
            {d.feedback && (
              <p className="mt-1 text-muted-foreground line-clamp-2">
                {d.feedback}
              </p>
            )}
          </div>
        )}
      </NodeContent>

      <NodeFooter>
        <div className="flex items-center gap-1">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "hsl(41, 100%, 70%)" }}
          />
          <span>{statusText[d.status]}</span>
        </div>
        {d.timeout && d.status === "paused" && (
          <div className="ml-auto flex items-center gap-1 text-status-paused">
            <Clock className="h-3 w-3" />
            <span>{d.timeout}s</span>
          </div>
        )}
      </NodeFooter>
    </BaseNode>
  )
}

export const ApprovalGateNode = memo(ApprovalGateNodeComponent)
