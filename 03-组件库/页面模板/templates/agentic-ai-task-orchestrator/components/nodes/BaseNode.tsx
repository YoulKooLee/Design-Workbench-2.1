import * as React from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { cn } from "../../lib/utils"
import type { NodeStatus } from "../../lib/orchestrator/types"

interface BaseNodeProps {
  children: React.ReactNode
  selected?: boolean
  status?: NodeStatus
  color?: string
  className?: string
  showSourceHandle?: boolean
  showTargetHandle?: boolean
  sourceHandlePosition?: Position
  targetHandlePosition?: Position
  sourceHandleId?: string
  targetHandleId?: string
}

const statusStyles: Record<NodeStatus, string> = {
  idle: "border-border",
  pending: "border-status-pending animate-pulse-soft",
  running: "border-status-running status-running shadow-glow-cyan",
  success: "border-status-success shadow-glow-success",
  error: "border-status-error shadow-glow-error",
  paused: "border-status-paused shadow-glow-amber",
}

const statusDotStyles: Record<NodeStatus, string> = {
  idle: "bg-muted-foreground",
  pending: "bg-status-pending animate-pulse",
  running: "bg-status-running animate-pulse",
  success: "bg-status-success",
  error: "bg-status-error",
  paused: "bg-status-paused animate-pulse",
}

export function BaseNode({
  children,
  selected = false,
  status = "idle",
  color,
  className,
  showSourceHandle = true,
  showTargetHandle = true,
  sourceHandlePosition = Position.Right,
  targetHandlePosition = Position.Left,
  sourceHandleId,
  targetHandleId,
}: BaseNodeProps) {
  return (
    <div
      className={cn(
        "relative min-w-[180px] rounded-xl border-2 bg-card p-3 shadow-node transition-all duration-200",
        "hover:shadow-node-hover",
        statusStyles[status],
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        className
      )}
      style={
        color
          ? {
              borderColor: status === "idle" ? color : undefined,
            }
          : undefined
      }
    >
      {/* Status indicator dot */}
      <div
        className={cn(
          "absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-card",
          statusDotStyles[status]
        )}
        aria-label={`Status: ${status}`}
      />

      {/* Target handle (input) */}
      {showTargetHandle && (
        <Handle
          type="target"
          position={targetHandlePosition}
          id={targetHandleId}
          className="!bg-muted !border-border hover:!bg-primary hover:!border-primary transition-colors"
        />
      )}

      {/* Node content */}
      {children}

      {/* Source handle (output) */}
      {showSourceHandle && (
        <Handle
          type="source"
          position={sourceHandlePosition}
          id={sourceHandleId}
          className="!bg-muted !border-border hover:!bg-primary hover:!border-primary transition-colors"
        />
      )}
    </div>
  )
}

export function NodeHeader({
  icon,
  title,
  subtitle,
  color,
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
  color?: string
}) {
  return (
    <div className="flex items-start gap-2">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: color ? `${color}20` : "hsl(var(--muted))" }}
      >
        <span style={{ color: color || "hsl(var(--foreground))" }}>{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export function NodeContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-2">{children}</div>
}

export function NodeFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex items-center gap-2 border-t border-border pt-2 text-xs text-muted-foreground">
      {children}
    </div>
  )
}
