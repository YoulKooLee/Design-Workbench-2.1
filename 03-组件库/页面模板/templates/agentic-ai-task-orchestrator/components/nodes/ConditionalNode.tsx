import * as React from "react"
import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { GitBranch } from "lucide-react"
import { BaseNode, NodeHeader, NodeContent } from "./BaseNode"
import type { ConditionalNodeData } from "../../lib/orchestrator/types"
import { cn } from "../../lib/utils"

function ConditionalNodeComponent({
  data,
  selected,
}: NodeProps) {
  const d = data as unknown as ConditionalNodeData
  return (
    <BaseNode
      selected={selected}
      status={d.status}
      color="hsl(280, 65%, 60%)"
      className="w-[200px]"
      showSourceHandle={false}
    >
      <NodeHeader
        icon={<GitBranch className="h-4 w-4" />}
        title={d.label}
        subtitle="条件分支"
        color="hsl(280, 65%, 60%)"
      />

      <NodeContent>
        <div className="space-y-1.5">
          {d.conditions.map((condition, index) => (
            <div
              key={condition.id}
              className={cn(
                "relative flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1 text-xs",
                d.evaluatedPath === condition.targetHandle &&
                  "bg-node-conditional/20 ring-1 ring-node-conditional"
              )}
            >
              <span className="text-muted-foreground">如果：</span>
              <span className="truncate text-foreground">
                {condition.expression || "未设置条件"}
              </span>

              {/* Output handle for this condition */}
              <Handle
                type="source"
                position={Position.Right}
                id={condition.targetHandle}
                className="!bg-node-conditional !border-border hover:!bg-primary transition-colors"
                style={{ top: `${40 + index * 28}px` }}
              />
            </div>
          ))}

          {/* Default path */}
          <div
            className={cn(
              "relative flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1 text-xs",
              d.evaluatedPath === d.defaultHandle &&
                "bg-muted ring-1 ring-muted-foreground"
            )}
          >
            <span className="text-muted-foreground">否则：</span>
            <span className="text-foreground">默认</span>

            <Handle
              type="source"
              position={Position.Right}
              id={d.defaultHandle}
              className="!bg-muted-foreground !border-border hover:!bg-primary transition-colors"
              style={{ top: `${40 + d.conditions.length * 28}px` }}
            />
          </div>
        </div>
      </NodeContent>
    </BaseNode>
  )
}

export const ConditionalNode = memo(ConditionalNodeComponent)
