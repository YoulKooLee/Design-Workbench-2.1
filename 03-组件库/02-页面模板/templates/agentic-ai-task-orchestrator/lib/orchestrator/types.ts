import type React from "react"
import type { Node, Edge } from "@xyflow/react"

// Agent types available in the system
export type AgentType =
  | "researcher"
  | "writer"
  | "analyst"
  | "reviewer"
  | "summarizer"
  | "coder"

// Node execution status
export type NodeStatus =
  | "idle"
  | "pending"
  | "running"
  | "success"
  | "error"
  | "paused"

// Workflow execution status
export type WorkflowStatus =
  | "idle"
  | "validating"
  | "running"
  | "paused"
  | "success"
  | "error"

// Agent definition for the library
export interface AgentDefinition {
  type: AgentType
  name: string
  description: string
  icon: string
  defaultSystemPrompt: string
  color: string
}

// Base node data interface
export interface BaseNodeData {
  [key: string]: unknown
  label: string
  status: NodeStatus
  executionTime?: number
  error?: string
}

// Agent node specific data
export interface AgentNodeData extends BaseNodeData {
  agentType: AgentType
  systemPrompt: string
  model: string
  temperature: number
  maxTokens: number
  inputMapping: Record<string, string>
  output?: string
}

// Approval gate node data
export interface ApprovalGateNodeData extends BaseNodeData {
  description: string
  approvalOptions: string[]
  timeout?: number
  decision?: string
  feedback?: string
}

// Conditional node data
export interface ConditionalNodeData extends BaseNodeData {
  conditions: Array<{
    id: string
    expression: string
    targetHandle: string
  }>
  defaultHandle: string
  evaluatedPath?: string
}

// Start node data
export interface StartNodeData extends BaseNodeData {
  workflowInput?: string
}

// End node data
export interface EndNodeData extends BaseNodeData {
  finalOutput?: string
}

// Union type for all node data
export type WorkflowNodeData =
  | AgentNodeData
  | ApprovalGateNodeData
  | ConditionalNodeData
  | StartNodeData
  | EndNodeData

// Custom node types
export type WorkflowNodeType =
  | "agentNode"
  | "approvalGateNode"
  | "conditionalNode"
  | "startNode"
  | "endNode"

// Typed node for ReactFlow
export type WorkflowNode = Node<WorkflowNodeData, WorkflowNodeType>

// Typed edge for ReactFlow
export interface WorkflowEdge extends Edge {
  animated?: boolean
  style?: React.CSSProperties
}

// Execution result for a single node
export interface NodeExecutionResult {
  nodeId: string
  status: NodeStatus
  output?: string
  error?: string
  startTime: number
  endTime?: number
  executionTime?: number
}

// Approval decision
export interface ApprovalDecision {
  nodeId: string
  decision: string
  feedback?: string
  timestamp: number
}

// Workflow template definition
export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

// Saved workflow
export interface SavedWorkflow {
  id: string
  name: string
  description?: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  createdAt: number
  updatedAt: number
}

// Execution log entry
export interface ExecutionLogEntry {
  id: string
  timestamp: number
  nodeId: string
  nodeName: string
  type: "start" | "progress" | "complete" | "error" | "approval"
  message: string
  data?: unknown
}
