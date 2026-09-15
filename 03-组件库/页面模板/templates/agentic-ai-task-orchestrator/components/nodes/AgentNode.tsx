import * as React from "react"
import { memo } from "react"
import type { NodeProps } from "@xyflow/react"
import {
  Search,
  PenTool,
  BarChart3,
  CheckCircle,
  FileText,
  Code,
  Clock,
  Zap,
} from "lucide-react"
import { BaseNode, NodeHeader, NodeContent, NodeFooter } from "./BaseNode"
import type { AgentNodeData } from "../../lib/orchestrator/types"
import { getAgentDefinition } from "../../lib/orchestrator/agents"

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="h-4 w-4" />,
  PenTool: <PenTool className="h-4 w-4" />,
  BarChart3: <BarChart3 className="h-4 w-4" />,
  CheckCircle: <CheckCircle className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
  Code: <Code className="h-4 w-4" />,
}

const statusLabel = {
  idle: "空闲",
  pending: "待处理",
  running: "运行中",
  success: "成功",
  error: "错误",
  paused: "已暂停",
}

function AgentNodeComponent({ data, selected }: NodeProps) {
  const d = data as unknown as AgentNodeData
  const agent = getAgentDefinition(d.agentType)
  const icon = iconMap[agent.icon] || <Zap className="h-4 w-4" />

  const formatTime = (ms?: number) => {
    if (!ms) return null
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  return (
    <BaseNode
      selected={selected}
      status={d.status}
      color={agent.color}
      className="w-[220px]"
    >
      <NodeHeader
        icon={icon}
        title={d.label}
        subtitle={agent.name}
        color={agent.color}
      />

      <NodeContent>
        {/* Model info */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Zap className="h-3 w-3" />
          <span className="truncate">{d.model.split("/")[1] || d.model}</span>
        </div>

        {/* Output preview when available */}
        {d.output && d.status === "success" && (
          <div className="mt-2 max-h-16 overflow-hidden rounded-md bg-muted/50 p-2 text-xs">
            <p className="line-clamp-3 text-muted-foreground">
              {d.output.substring(0, 150)}
              {d.output.length > 150 && "..."}
            </p>
          </div>
        )}

        {/* Error message */}
        {d.error && d.status === "error" && (
          <div className="mt-2 rounded-md bg-destructive/10 p-2 text-xs text-destructive">
            <p className="line-clamp-2">{d.error}</p>
          </div>
        )}
      </NodeContent>

      <NodeFooter>
        <div className="flex items-center gap-1">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: agent.color }}
          />
          <span>{statusLabel[d.status]}</span>
        </div>
        {d.executionTime && (
          <div className="ml-auto flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatTime(d.executionTime)}</span>
          </div>
        )}
      </NodeFooter>
    </BaseNode>
  )
}

export const AgentNode = memo(AgentNodeComponent)
