import * as React from "react"
import { memo } from "react"
import type { NodeProps } from "@xyflow/react"
import { Play } from "lucide-react"
import { BaseNode, NodeHeader } from "./BaseNode"
import type { StartNodeData } from "../../lib/orchestrator/types"

function StartNodeComponent({ data, selected }: NodeProps) {
  const d = data as unknown as StartNodeData
  return (
    <BaseNode
      selected={selected}
      status={d.status}
      color="hsl(142, 76%, 45%)"
      className="w-[140px]"
      showTargetHandle={false}
    >
      <NodeHeader
        icon={<Play className="h-4 w-4" />}
        title={d.label}
        subtitle="入口"
        color="hsl(142, 76%, 45%)"
      />
    </BaseNode>
  )
}

export const StartNode = memo(StartNodeComponent)
