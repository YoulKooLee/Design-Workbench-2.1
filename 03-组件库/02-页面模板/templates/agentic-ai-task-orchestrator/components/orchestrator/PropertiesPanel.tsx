import * as React from "react"
import { useCallback } from "react"
import { X, Trash2, Settings, Zap, MessageSquare } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Slider } from "../ui/slider"
import { ScrollArea } from "../ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Separator } from "../ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet"
import { cn } from "../../lib/utils"
import { useWorkflowStore, useSelectedNode } from "../../lib/orchestrator/store"
import type { AgentNodeData, ApprovalGateNodeData } from "../../lib/orchestrator/types"
import { getAgentDefinition } from "../../lib/orchestrator/agents"
import { useIsMobile } from "../../hooks/use-mobile"

const AVAILABLE_MODELS = [
  { value: "openai/gpt-5.2", label: "GPT-5.2（默认）" },
  { value: "openai/gpt-4o", label: "GPT-4o" },
  { value: "anthropic/claude-sonnet-4-5", label: "Claude Sonnet 4.5" },
]

/* ── Inner content shared between desktop aside + mobile Sheet ── */
function PropertiesPanelContent({
  onClose,
  onDelete,
}: {
  onClose: () => void
  onDelete: () => void
}) {
  const { updateNodeData } = useWorkflowStore()
  const selectedNode = useSelectedNode()

  const handleUpdate = useCallback(
    (key: string, value: unknown) => {
      if (selectedNode) updateNodeData(selectedNode.id, { [key]: value })
    },
    [selectedNode, updateNodeData]
  )

  if (!selectedNode) return null

  const isAgent = selectedNode.type === "agentNode"
  const isApproval = selectedNode.type === "approvalGateNode"
  const data = selectedNode.data

  return (
    <>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Node Name */}
          <div className="space-y-2">
            <Label htmlFor="node-name">名称</Label>
            <Input
              id="node-name"
              value={(data as { label?: string }).label || ""}
              onChange={(e) => handleUpdate("label", e.target.value)}
              className="bg-background text-base"
            />
          </div>

          {isAgent && (
            <>
              <Separator />
              <div className="rounded-lg border border-border bg-muted/50 p-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${getAgentDefinition((data as AgentNodeData).agentType).color}20`,
                    }}
                  >
                    <Zap
                      className="h-4 w-4"
                      style={{ color: getAgentDefinition((data as AgentNodeData).agentType).color }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {getAgentDefinition((data as AgentNodeData).agentType).name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getAgentDefinition((data as AgentNodeData).agentType).description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Model */}
              <div className="space-y-2">
                <Label>模型</Label>
                <Select
                  value={(data as AgentNodeData).model}
                  onValueChange={(v) => handleUpdate("model", v)}
                >
                  <SelectTrigger className="bg-background min-h-[44px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_MODELS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Temperature */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>温度</Label>
                  <span className="text-xs text-muted-foreground">
                    {(data as AgentNodeData).temperature.toFixed(1)}
                  </span>
                </div>
                <Slider
                  value={[(data as AgentNodeData).temperature]}
                  onValueChange={([v]) => handleUpdate("temperature", v)}
                  min={0}
                  max={2}
                  step={0.1}
                  className="py-2"
                />
              </div>

              {/* Max Tokens */}
              <div className="space-y-2">
                <Label htmlFor="max-tokens">最大 Token 数</Label>
                <Input
                  id="max-tokens"
                  type="number"
                  value={(data as AgentNodeData).maxTokens}
                  onChange={(e) => handleUpdate("maxTokens", parseInt(e.target.value) || 1024)}
                  min={256}
                  max={16384}
                  className="bg-background text-base"
                />
              </div>

              {/* System Prompt */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Label>系统提示词</Label>
                </div>
                <Textarea
                  value={(data as AgentNodeData).systemPrompt}
                  onChange={(e) => handleUpdate("systemPrompt", e.target.value)}
                  rows={6}
                  className="bg-background text-sm resize-none"
                  placeholder="输入这个智能体的指令..."
                />
              </div>
            </>
          )}

          {isApproval && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label>说明</Label>
                <Textarea
                  value={(data as ApprovalGateNodeData).description}
                  onChange={(e) => handleUpdate("description", e.target.value)}
                  rows={3}
                  className="bg-background text-sm resize-none"
                  placeholder="需要审批什么？"
                />
              </div>

              <div className="space-y-2">
                <Label>审批选项</Label>
                <div className="space-y-2">
                  {(data as ApprovalGateNodeData).approvalOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        value={opt}
                        onChange={(e) => {
                          const opts = [...(data as ApprovalGateNodeData).approvalOptions]
                          opts[i] = e.target.value
                          handleUpdate("approvalOptions", opts)
                        }}
                        className="bg-background text-base"
                      />
                      {(data as ApprovalGateNodeData).approvalOptions.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 shrink-0"
                          onClick={() => {
                            const opts = (data as ApprovalGateNodeData).approvalOptions.filter((_, idx) => idx !== i)
                            handleUpdate("approvalOptions", opts)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 min-h-[44px] bg-transparent"
                  onClick={() =>
                    handleUpdate("approvalOptions", [
                      ...(data as ApprovalGateNodeData).approvalOptions,
                      "新选项",
                    ])
                  }
                >
                  添加选项
                </Button>
              </div>
            </>
          )}

          {/* Output Preview */}
          {isAgent && (data as AgentNodeData).output && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label>最近输出</Label>
                <div className="rounded-lg border border-border bg-muted/50 p-3 max-h-32 overflow-auto">
                  <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                    {(data as AgentNodeData).output}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t border-border p-4">
        <Button variant="destructive" size="sm" className="w-full min-h-[44px]" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          删除节点
        </Button>
      </div>
    </>
  )
}

/* ── Exported component: desktop sidebar + mobile sheet ── */
export function PropertiesPanel() {
  const { propertiesPanelOpen, setPropertiesPanelOpen, removeNode } = useWorkflowStore()
  const selectedNode = useSelectedNode()
  const isMobile = useIsMobile()

  const handleClose = useCallback(() => setPropertiesPanelOpen(false), [setPropertiesPanelOpen])
  const handleDelete = useCallback(() => {
    if (selectedNode) {
      removeNode(selectedNode.id)
      setPropertiesPanelOpen(false)
    }
  }, [selectedNode, removeNode, setPropertiesPanelOpen])

  if (!propertiesPanelOpen || !selectedNode) return null

  /* ── Mobile: bottom sheet ── */
  if (isMobile) {
    return (
      <Sheet open={propertiesPanelOpen} onOpenChange={setPropertiesPanelOpen}>
        <SheetContent side="bottom" className="h-[80dvh] p-0 flex flex-col rounded-t-2xl">
          <SheetHeader className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <SheetTitle className="text-base">属性</SheetTitle>
              </div>
            </div>
            <SheetDescription className="sr-only">编辑节点属性</SheetDescription>
          </SheetHeader>
          <PropertiesPanelContent onClose={handleClose} onDelete={handleDelete} />
        </SheetContent>
      </Sheet>
    )
  }

  /* ── Desktop: right aside ── */
  return (
    <aside className="hidden md:flex h-full w-80 flex-col border-l border-border bg-sidebar animate-slide-in-right">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">属性</span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <PropertiesPanelContent onClose={handleClose} onDelete={handleDelete} />
    </aside>
  )
}
