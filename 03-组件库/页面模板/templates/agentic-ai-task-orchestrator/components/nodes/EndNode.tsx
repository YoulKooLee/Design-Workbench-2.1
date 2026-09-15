import * as React from "react"
import { memo } from "react"
import type { NodeProps } from "@xyflow/react"
import { Square } from "lucide-react"
import { BaseNode, NodeHeader, NodeContent } from "./BaseNode"
import type { EndNodeData } from "../../lib/orchestrator/types"

function EndNodeComponent({ data, selected }: NodeProps) {
  const d = data as unknown as EndNodeData
  return (
    <BaseNode
      selected={selected}
      status={d.status}
      color="hsl(220, 14%, 52%)"
      className="w-[140px]"
      showSourceHandle={false}
    >
      <NodeHeader
        icon={<Square className="h-4 w-4" />}
        title={d.label}
        subtitle="终止"
        color="hsl(220, 14%, 52%)"
      />

      {d.finalOutput && d.status === "success" && (
        <NodeContent>
          <div className="max-h-12 overflow-hidden rounded-md bg-muted/50 p-1.5 text-[10px]">
            <p className="line-clamp-2 text-muted-foreground">
              {d.finalOutput.substring(0, 100)}...
            </p>
          </div>
        </NodeContent>
      )}
    </BaseNode>
  )
}

export const EndNode = memo(EndNodeComponent)
