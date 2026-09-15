import * as React from "react"
import { useState } from "react"
import {
  Search,
  PenTool,
  BarChart3,
  CheckCircle,
  FileText,
  Code,
  Play,
  Square,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  GripVertical,
} from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { cn } from "../../lib/utils"
import { useWorkflowStore } from "../../lib/orchestrator/store"
import { AGENT_LIST } from "../../lib/orchestrator/agents"
import { WORKFLOW_TEMPLATES } from "../../lib/orchestrator/templates"
import type { AgentType } from "../../lib/orchestrator/types"

const iconMap: Record<string, React.ElementType> = {
  Search,
  PenTool,
  BarChart3,
  CheckCircle,
  FileText,
  Code,
}

/* ── Draggable card ── */
interface DraggableItemProps {
  type: string
  agentType?: AgentType
  icon: React.ReactNode
  name: string
  description: string
  color: string
  collapsed?: boolean
}

function DraggableItem({
  type,
  agentType,
  icon,
  name,
  description,
  color,
  collapsed,
}: DraggableItemProps) {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("application/reactflow/type", type)
    if (agentType) {
      event.dataTransfer.setData("application/reactflow/agentType", agentType)
    }
    event.dataTransfer.effectAllowed = "move"
  }

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              draggable
              onDragStart={handleDragStart}
              className="flex h-11 w-11 cursor-grab items-center justify-center rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-node active:cursor-grabbing"
              style={{ borderColor: `${color}40` }}
              aria-label={`拖动${name}智能体`}
            >
              <span style={{ color }}>{icon}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-[200px]">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="group flex cursor-grab items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-node active:cursor-grabbing min-h-[56px]"
      style={{ borderColor: `${color}25` }}
      role="listitem"
      aria-label={`${name}，${description}。拖到画布。`}
    >
      {/* Drag handle indicator */}
      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}18` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground leading-tight">
          {name}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
          {description}
        </p>
      </div>
    </div>
  )
}

/* ── Shared sidebar content ── */
function SidebarContent({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  collapsed,
}: {
  searchQuery: string
  setSearchQuery: (q: string) => void
  activeTab: "agents" | "templates"
  setActiveTab: (t: "agents" | "templates") => void
  collapsed: boolean
}) {
  const { setNodes, setEdges } = useWorkflowStore()

  const filteredAgents = AGENT_LIST.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredTemplates = WORKFLOW_TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApplyTemplate = (templateId: string) => {
    const template = WORKFLOW_TEMPLATES.find((t) => t.id === templateId)
    if (template) {
      setNodes(JSON.parse(JSON.stringify(template.nodes)))
      setEdges(JSON.parse(JSON.stringify(template.edges)))
    }
  }

  return (
    <>
      {/* Search */}
      {!collapsed && (
        <div className="shrink-0 border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="搜索智能体或模板..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-9 bg-background text-base"
              aria-label="搜索智能体和模板"
            />
          </div>
        </div>
      )}

      {/* Tab switcher */}
      {!collapsed && (
        <div className="flex shrink-0 border-b border-border" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "agents"}
            onClick={() => setActiveTab("agents")}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors min-h-[48px]",
              activeTab === "agents"
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground active:text-foreground"
            )}
          >
            智能体
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "templates"}
            onClick={() => setActiveTab("templates")}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors min-h-[48px]",
              activeTab === "templates"
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground active:text-foreground"
            )}
          >
            模板
          </button>
        </div>
      )}

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div
          className={cn("p-3", collapsed && "flex flex-col items-center")}
          role="list"
        >
          {activeTab === "agents" || collapsed ? (
            <>
              {/* Control flow */}
              <div className="mb-4">
                {!collapsed && (
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    控制流程
                  </h3>
                )}
                <div
                  className={cn(
                    "space-y-2",
                    collapsed && "flex flex-col items-center gap-2"
                  )}
                >
                  <DraggableItem
                    type="startNode"
                    icon={<Play className="h-4 w-4" />}
                    name="开始"
                    description="工作流入口"
                    color="hsl(142, 76%, 45%)"
                    collapsed={collapsed}
                  />
                  <DraggableItem
                    type="endNode"
                    icon={<Square className="h-4 w-4" />}
                    name="结束"
                    description="工作流终止点"
                    color="hsl(220, 14%, 52%)"
                    collapsed={collapsed}
                  />
                  <DraggableItem
                    type="approvalGateNode"
                    icon={<UserCheck className="h-4 w-4" />}
                    name="审批关卡"
                    description="人工参与的审批检查点"
                    color="hsl(41, 100%, 70%)"
                    collapsed={collapsed}
                  />
                </div>
              </div>

              {/* AI Agents */}
              <div>
                {!collapsed && (
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    AI 智能体
                  </h3>
                )}
                <div
                  className={cn(
                    "space-y-2",
                    collapsed && "flex flex-col items-center gap-2"
                  )}
                >
                  {filteredAgents.map((agent) => {
                    const Icon = iconMap[agent.icon]
                    return (
                      <DraggableItem
                        key={agent.type}
                        type="agentNode"
                        agentType={agent.type}
                        icon={
                          Icon ? (
                            <Icon className="h-4 w-4" />
                          ) : (
                            <Layers className="h-4 w-4" />
                          )
                        }
                        name={agent.name}
                        description={agent.description}
                        color={agent.color}
                        collapsed={collapsed}
                      />
                    )
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Templates list */
            <div className="space-y-3">
              {filteredTemplates.map((template) => {
                const isAuto = template.id === "ai-roundtable"
                return (
                  <div
                    key={template.id}
                    className="rounded-lg border border-border bg-card p-3"
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-foreground leading-tight">
                        {template.name}
                      </h4>
                      {isAuto && (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary leading-none">
                          自动
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">
                        {template.nodes.length} 个节点
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-9 min-h-[44px] px-4 text-xs font-medium"
                        onClick={() => handleApplyTemplate(template.id)}
                      >
                        使用模板
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer hint */}
      {!collapsed && (
        <div className="shrink-0 border-t border-border px-3 py-2.5">
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            将智能体拖到画布上构建工作流
          </p>
        </div>
      )}
    </>
  )
}

/* ── Desktop sidebar ── */
export function AgentSidebar() {
  const { sidebarOpen, toggleSidebar } = useWorkflowStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"agents" | "templates">("agents")

  return (
    <aside
      className={cn(
        "hidden md:flex h-full flex-col border-r border-border bg-sidebar transition-all duration-200",
        sidebarOpen ? "w-72 lg:w-80" : "w-[60px]"
      )}
      aria-label="智能体库"
    >
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-3">
        {sidebarOpen && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground truncate">
              AgentFlow
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={sidebarOpen ? "收起侧边栏" : "展开侧边栏"}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      <SidebarContent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={!sidebarOpen}
      />
    </aside>
  )
}

/* ── Mobile sidebar sheet ── */
export function MobileAgentSheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"agents" | "templates">("agents")

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[88vw] max-w-sm p-0 flex flex-col"
      >
        <SheetHeader className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <SheetTitle className="text-base font-semibold">
              AgentFlow
            </SheetTitle>
          </div>
          <SheetDescription className="text-xs text-muted-foreground mt-0.5">
            将智能体拖到画布，或选择一个现成模板。
          </SheetDescription>
        </SheetHeader>
        <SidebarContent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={false}
        />
      </SheetContent>
    </Sheet>
  )
}
