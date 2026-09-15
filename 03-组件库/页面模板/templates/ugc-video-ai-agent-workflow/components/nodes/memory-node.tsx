import React from "react"
import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Brain } from "lucide-react"
import { getStatusColor } from "../../lib/node-utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export type MemoryNodeData = {
  operation: "load" | "save" | "loadAll" | "addMessage" | "getMessages"
  sessionId: string
  key?: string
  memoryType?: "fact" | "preference" | "entity" | "summary"
  messageRole?: "user" | "assistant" | "system"
  limit?: number
  status?: "idle" | "running" | "completed" | "error"
  output?: unknown
  isExpanded?: boolean
  onUpdate?: (data: MemoryNodeData) => void
}

const OPERATIONS = [
  { value: "load", label: "读取记忆" },
  { value: "save", label: "保存记忆" },
  { value: "loadAll", label: "读取全部记忆" },
  { value: "addMessage", label: "添加消息" },
  { value: "getMessages", label: "获取消息" },
]

const MEMORY_TYPES = [
  { value: "fact", label: "事实" },
  { value: "preference", label: "偏好" },
  { value: "entity", label: "实体" },
  { value: "summary", label: "摘要" },
]

const MESSAGE_ROLES = [
  { value: "user", label: "用户" },
  { value: "assistant", label: "助手" },
  { value: "system", label: "系统" },
]

function MemoryNode({ data, selected }: NodeProps<any>) {
  const status = data.status || "idle"
  const isExpanded = data.isExpanded || false
  const operation = data.operation || "load"

  const handleUpdate = (field: string, value: unknown) => {
    if (data.onUpdate) {
      const { isExpanded, onUpdate, ...restData } = data
      data.onUpdate({ ...restData, [field]: value } as MemoryNodeData)
    }
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const getOperationLabel = () => {
    const op = OPERATIONS.find((o) => o.value === operation)
    return op?.label || "记忆"
  }

  return (
    <div
      className={`w-[280px] rounded border bg-card transition-colors duration-150 ${getStatusColor(status, selected)}`}
    >
      <div className="p-3">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">记忆</span>
          <span className="ml-auto text-xs text-muted-foreground font-mono">{getOperationLabel()}</span>
        </div>

        {!isExpanded && (
          <div className="mt-2 flex gap-3 text-xs text-muted-foreground font-mono">
            <span>会话：{data.sessionId || "default"}</span>
          </div>
        )}

        {isExpanded && (
          <div className="mt-3 space-y-3" onClick={stopPropagation}>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">操作</Label>
              <Select value={operation} onValueChange={(value) => handleUpdate("operation", value)}>
                <SelectTrigger className="h-8 text-xs nodrag" onMouseDown={stopPropagation}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OPERATIONS.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">会话 ID</Label>
              <Input
                value={data.sessionId || "default"}
                onChange={(e) => handleUpdate("sessionId", e.target.value)}
                className="h-8 text-xs font-mono nodrag"
                onMouseDown={stopPropagation}
                placeholder="default"
              />
            </div>

            {(operation === "load" || operation === "save") && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">键</Label>
                <Input
                  value={data.key || ""}
                  onChange={(e) => handleUpdate("key", e.target.value)}
                  className="h-8 text-xs font-mono nodrag"
                  onMouseDown={stopPropagation}
                  placeholder="memory_key"
                />
              </div>
            )}

            {operation === "save" && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">类型</Label>
                <Select value={data.memoryType || "fact"} onValueChange={(value) => handleUpdate("memoryType", value)}>
                  <SelectTrigger className="h-8 text-xs nodrag" onMouseDown={stopPropagation}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MEMORY_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {operation === "addMessage" && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">角色</Label>
                <Select
                  value={data.messageRole || "user"}
                  onValueChange={(value) => handleUpdate("messageRole", value)}
                >
                  <SelectTrigger className="h-8 text-xs nodrag" onMouseDown={stopPropagation}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MESSAGE_ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {operation === "getMessages" && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">上限</Label>
                <Input
                  type="number"
                  value={data.limit || 10}
                  onChange={(e) => handleUpdate("limit", Number.parseInt(e.target.value))}
                  className="h-8 text-xs font-mono nodrag"
                  onMouseDown={stopPropagation}
                />
              </div>
            )}
          </div>
        )}

        {status === "running" && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/50" />
            <span>运行中</span>
          </div>
        )}

        {data.output && (
          <div className="mt-2 max-h-20 overflow-y-auto rounded bg-secondary/50 p-2">
            <p className="text-xs text-muted-foreground line-clamp-3 font-mono">
              {typeof data.output === "string" ? data.output : JSON.stringify(data.output, null, 2)}
            </p>
          </div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="!bg-muted-foreground/40 !border-0 !w-2 !h-2"
        style={{ top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!bg-muted-foreground/40 !border-0 !w-2 !h-2"
      />
    </div>
  )
}

export default memo(MemoryNode)
