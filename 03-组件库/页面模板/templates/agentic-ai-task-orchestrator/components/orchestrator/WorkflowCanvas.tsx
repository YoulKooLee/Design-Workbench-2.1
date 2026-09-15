import * as React from "react"
import { useCallback, useRef, useMemo } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
  type OnConnect,
  type NodeTypes,
  type EdgeTypes,
  ReactFlowProvider,
  BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { useWorkflowStore } from "../../lib/orchestrator/store"
import {
  AgentNode,
  ApprovalGateNode,
  StartNode,
  EndNode,
  ConditionalNode,
} from "../nodes"
import { AnimatedEdge } from "../edges/AnimatedEdge"
import type { WorkflowNode, AgentNodeData } from "../../lib/orchestrator/types"
import { getAgentDefinition } from "../../lib/orchestrator/agents"

// Define node types
const nodeTypes: NodeTypes = {
  agentNode: AgentNode,
  approvalGateNode: ApprovalGateNode,
  startNode: StartNode,
  endNode: EndNode,
  conditionalNode: ConditionalNode,
}

// Define edge types
const edgeTypes: EdgeTypes = {
  animated: AnimatedEdge,
}

// Default edge options
const defaultEdgeOptions = {
  type: "animated",
  style: { strokeWidth: 2 },
}

function WorkflowCanvasInner() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition } = useReactFlow()

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectNode,
    addNode,
    selectedNodeId,
  } = useWorkflowStore()

  const handleConnect: OnConnect = useCallback(
    (connection) => {
      onConnect(connection)
    },
    [onConnect]
  )

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: WorkflowNode) => {
      selectNode(node.id)
    },
    [selectNode]
  )

  const handlePaneClick = useCallback(() => {
    selectNode(null)
  }, [selectNode])

  // Handle drop from sidebar
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow/type")
      const agentType = event.dataTransfer.getData(
        "application/reactflow/agentType"
      )

      if (!type) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      let newNode: WorkflowNode

      if (type === "agentNode" && agentType) {
        const agent = getAgentDefinition(
          agentType as AgentNodeData["agentType"]
        )
        newNode = {
          id: `${type}-${Date.now()}`,
          type,
          position,
          data: {
            label: agent.name,
            agentType: agentType as AgentNodeData["agentType"],
            systemPrompt: agent.defaultSystemPrompt,
            model: "openai/gpt-5.2",
            temperature: 0.7,
            maxTokens: 2048,
            inputMapping: {},
            status: "idle",
          } as AgentNodeData,
        }
      } else if (type === "startNode") {
        newNode = {
          id: `${type}-${Date.now()}`,
          type,
          position,
          data: {
            label: "开始",
            status: "idle",
          },
        }
      } else if (type === "endNode") {
        newNode = {
          id: `${type}-${Date.now()}`,
          type,
          position,
          data: {
            label: "结束",
            status: "idle",
          },
        }
      } else if (type === "approvalGateNode") {
        newNode = {
          id: `${type}-${Date.now()}`,
          type,
          position,
          data: {
            label: "审批关卡",
            description: "继续前需要人工审批",
            approvalOptions: ["批准", "拒绝", "要求修改"],
            status: "idle",
          },
        }
      } else {
        return
      }

      addNode(newNode)
    },
    [screenToFlowPosition, addNode]
  )

  // Custom minimap node color
  const minimapNodeColor = useCallback((node: WorkflowNode) => {
    switch (node.type) {
      case "startNode":
        return "hsl(142, 76%, 45%)"
      case "endNode":
        return "hsl(220, 14%, 52%)"
      case "approvalGateNode":
        return "hsl(41, 100%, 70%)"
      case "conditionalNode":
        return "hsl(280, 65%, 60%)"
      case "agentNode": {
        const agentData = node.data as AgentNodeData
        if (agentData.agentType) {
          return getAgentDefinition(agentData.agentType).color
        }
        return "hsl(189, 100%, 55%)"
      }
      default:
        return "hsl(220, 14%, 20%)"
    }
  }, [])

  return (
    <div
      ref={reactFlowWrapper}
      className="h-full w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        snapToGrid
        snapGrid={[16, 16]}
        minZoom={0.25}
        maxZoom={2}
        deleteKeyCode={["Backspace", "Delete"]}
        multiSelectionKeyCode="Shift"
        selectionOnDrag
        panOnScroll
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
        className="bg-background"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="hsl(220, 14%, 16%)"
        />

        <Controls
          showZoom
          showFitView
          showInteractive={false}
          className="!bg-card !border-border !rounded-lg !shadow-lg"
        />

        <MiniMap
          nodeColor={minimapNodeColor}
          maskColor="rgba(10, 15, 26, 0.8)"
          className="!bg-card !border-border !rounded-lg"
          pannable
          zoomable
        />

        {/* Empty state panel */}
        {nodes.length === 0 && (
          <Panel position="top-center" className="mt-16 sm:mt-32 mx-4 sm:mx-0">
            <div className="glass-panel rounded-2xl p-5 sm:p-8 text-center max-w-sm sm:max-w-md">
              <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-6 w-6 sm:h-8 sm:w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground text-balance">
                开始搭建你的工作流
              </h3>
              <p className="mt-1.5 sm:mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
                点击菜单打开智能体库，或选择一个模板开始。
              </p>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  )
}

export function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner />
    </ReactFlowProvider>
  )
}
