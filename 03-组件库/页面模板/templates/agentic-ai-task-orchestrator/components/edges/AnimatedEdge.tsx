import * as React from "react"
import {
  BaseEdge,
  getBezierPath,
  type EdgeProps,
  EdgeLabelRenderer,
} from "@xyflow/react"
import { cn } from "../../lib/utils"

export function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  selected,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const isAnimated = Boolean((data as Record<string, unknown>)?.animated)

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: selected ? 3 : 2,
          stroke: selected
            ? "hsl(189, 100%, 55%)"
            : isAnimated
              ? "hsl(189, 100%, 55%)"
              : "hsl(220, 14%, 20%)",
        }}
        className={cn(isAnimated && "animated-edge")}
      />

      {(data as Record<string, unknown>)?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="rounded-full bg-card px-2 py-0.5 text-xs text-muted-foreground border border-border"
          >
            {String((data as Record<string, unknown>).label)}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}
