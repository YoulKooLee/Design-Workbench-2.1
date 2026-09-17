import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Connection,
  type NodeChange,
  type EdgeChange,
} from "@xyflow/react"
import type {
  WorkflowNode,
  WorkflowEdge,
  WorkflowStatus,
  NodeExecutionResult,
  ApprovalDecision,
  ExecutionLogEntry,
  AgentNodeData,
  ApprovalGateNodeData,
} from "./types"
import { loadWorkflow, saveWorkflow, listWorkflows } from "./persistence"

interface WorkflowState {
  // Workflow data
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  workflowName: string

  // Selection
  selectedNodeId: string | null
  selectedEdgeId: string | null

  // Execution state
  executionId: string | null
  executionStatus: WorkflowStatus
  nodeResults: Record<string, NodeExecutionResult>
  executionLog: ExecutionLogEntry[]
  pendingApproval: string | null

  // UI state
  sidebarOpen: boolean
  propertiesPanelOpen: boolean
  timelineOpen: boolean
}

interface WorkflowActions {
  // Node operations
  setNodes: (nodes: WorkflowNode[]) => void
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void
  addNode: (node: WorkflowNode) => void
  updateNodeData: (nodeId: string, data: Partial<WorkflowNode["data"]>) => void
  removeNode: (nodeId: string) => void
  selectNode: (nodeId: string | null) => void

  // Edge operations
  setEdges: (edges: WorkflowEdge[]) => void
  onEdgesChange: (changes: EdgeChange<WorkflowEdge>[]) => void
  onConnect: (connection: Connection) => void
  removeEdge: (edgeId: string) => void
  selectEdge: (edgeId: string | null) => void

  // Execution operations
  startExecution: () => void
  pauseExecution: () => void
  resumeExecution: (decision?: ApprovalDecision) => void
  cancelExecution: () => void
  updateNodeResult: (result: NodeExecutionResult) => void
  addLogEntry: (entry: Omit<ExecutionLogEntry, "id" | "timestamp">) => void
  clearExecution: () => void
  setPendingApproval: (nodeId: string | null) => void

  // Persistence
  saveCurrentWorkflow: (name?: string) => void
  loadSavedWorkflow: (id: string) => void
  listSavedWorkflows: () => string[]
  newWorkflow: () => void
  setWorkflowName: (name: string) => void

  // UI state
  toggleSidebar: () => void
  togglePropertiesPanel: () => void
  toggleTimeline: () => void
  setSidebarOpen: (open: boolean) => void
  setPropertiesPanelOpen: (open: boolean) => void
  setTimelineOpen: (open: boolean) => void
}

type WorkflowStore = WorkflowState & WorkflowActions

const initialState: WorkflowState = {
  nodes: [],
  edges: [],
  workflowName: "未命名工作流",
  selectedNodeId: null,
  selectedEdgeId: null,
  executionId: null,
  executionStatus: "idle",
  nodeResults: {},
  executionLog: [],
  pendingApproval: null,
  sidebarOpen: true,
  propertiesPanelOpen: false,
  timelineOpen: false,
}

export const useWorkflowStore = create<WorkflowStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    // Node operations
    setNodes: (nodes) => set({ nodes }),

    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      })
    },

    addNode: (node) => {
      set((state) => ({
        nodes: [...state.nodes, node],
      }))
    },

    updateNodeData: (nodeId, data) => {
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...data } }
            : node
        ),
      }))
    },

    removeNode: (nodeId) => {
      set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== nodeId),
        edges: state.edges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        ),
        selectedNodeId:
          state.selectedNodeId === nodeId ? null : state.selectedNodeId,
      }))
    },

    selectNode: (nodeId) => {
      set({
        selectedNodeId: nodeId,
        selectedEdgeId: null,
        propertiesPanelOpen: nodeId !== null,
      })
    },

    // Edge operations
    setEdges: (edges) => set({ edges }),

    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      })
    },

    onConnect: (connection) => {
      const newEdge: WorkflowEdge = {
        ...connection,
        id: `edge-${connection.source}-${connection.target}-${Date.now()}`,
        animated: false,
        style: { strokeWidth: 2 },
      }
      set((state) => ({
        edges: addEdge(newEdge, state.edges),
      }))
    },

    removeEdge: (edgeId) => {
      set((state) => ({
        edges: state.edges.filter((edge) => edge.id !== edgeId),
        selectedEdgeId:
          state.selectedEdgeId === edgeId ? null : state.selectedEdgeId,
      }))
    },

    selectEdge: (edgeId) => {
      set({
        selectedEdgeId: edgeId,
        selectedNodeId: null,
      })
    },

    // Execution operations
    startExecution: () => {
      const executionId = `exec-${Date.now()}`

      // Reset all nodes to idle status
      set((state) => ({
        executionId,
        executionStatus: "validating",
        nodeResults: {},
        executionLog: [],
        pendingApproval: null,
        nodes: state.nodes.map((node) => ({
          ...node,
          data: { ...node.data, status: "idle", error: undefined },
        })),
      }))

      // Add start log entry
      get().addLogEntry({
        nodeId: "system",
        nodeName: "系统",
        type: "start",
        message: "工作流执行已开始",
      })

      // Transition to running
      set({ executionStatus: "running" })
    },

    pauseExecution: () => {
      set({ executionStatus: "paused" })
      get().addLogEntry({
        nodeId: "system",
        nodeName: "系统",
        type: "progress",
        message: "工作流执行已暂停",
      })
    },

    resumeExecution: (decision) => {
      const state = get()

      if (decision && state.pendingApproval) {
        // Update the approval node with the decision
        const approvalNode = state.nodes.find(
          (n) => n.id === state.pendingApproval
        )
        if (approvalNode) {
          get().updateNodeData(state.pendingApproval, {
            status: decision.decision === "approved" ? "success" : "error",
            decision: decision.decision,
            feedback: decision.feedback,
          } as Partial<ApprovalGateNodeData>)

          get().addLogEntry({
            nodeId: state.pendingApproval,
            nodeName: (approvalNode.data as ApprovalGateNodeData).label,
            type: "approval",
            message: `审批${decision.decision === "approved" ? "已批准" : "已拒绝"}：${decision.feedback || "无反馈"}`,
            data: decision,
          })
        }
      }

      set({
        executionStatus: "running",
        pendingApproval: null,
      })
    },

    cancelExecution: () => {
      set((state) => ({
        executionStatus: "idle",
        executionId: null,
        pendingApproval: null,
        nodes: state.nodes.map((node) => ({
          ...node,
          data: { ...node.data, status: "idle" },
        })),
      }))

      get().addLogEntry({
        nodeId: "system",
        nodeName: "系统",
        type: "complete",
        message: "工作流执行已取消",
      })
    },

    updateNodeResult: (result) => {
      set((state) => ({
        nodeResults: {
          ...state.nodeResults,
          [result.nodeId]: result,
        },
      }))

      // Update node status
      get().updateNodeData(result.nodeId, {
        status: result.status,
        executionTime: result.executionTime,
        error: result.error,
        output: result.output,
      } as Partial<AgentNodeData>)
    },

    addLogEntry: (entry) => {
      const logEntry: ExecutionLogEntry = {
        ...entry,
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
      }
      set((state) => ({
        executionLog: [...state.executionLog, logEntry],
      }))
    },

    clearExecution: () => {
      set((state) => ({
        executionId: null,
        executionStatus: "idle",
        nodeResults: {},
        executionLog: [],
        pendingApproval: null,
        nodes: state.nodes.map((node) => ({
          ...node,
          data: { ...node.data, status: "idle", error: undefined },
        })),
      }))
    },

    setPendingApproval: (nodeId) => {
      set({
        pendingApproval: nodeId,
        executionStatus: nodeId ? "paused" : get().executionStatus,
      })
    },

    // Persistence
    saveCurrentWorkflow: (name) => {
      const state = get()
      const workflowName = name || state.workflowName
      saveWorkflow({
        id: `workflow-${Date.now()}`,
        name: workflowName,
        nodes: state.nodes,
        edges: state.edges,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      set({ workflowName })
    },

    loadSavedWorkflow: (id) => {
      const workflow = loadWorkflow(id)
      if (workflow) {
        set({
          nodes: workflow.nodes,
          edges: workflow.edges,
          workflowName: workflow.name,
          selectedNodeId: null,
          selectedEdgeId: null,
          executionStatus: "idle",
          nodeResults: {},
          executionLog: [],
        })
      }
    },

    listSavedWorkflows: () => {
      return listWorkflows()
    },

    newWorkflow: () => {
      set({
        ...initialState,
        workflowName: "未命名工作流",
      })
    },

    setWorkflowName: (name) => set({ workflowName: name }),

    // UI state
    toggleSidebar: () =>
      set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    togglePropertiesPanel: () =>
      set((state) => ({
        propertiesPanelOpen: !state.propertiesPanelOpen,
      })),
    toggleTimeline: () =>
      set((state) => ({ timelineOpen: !state.timelineOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setPropertiesPanelOpen: (open) => set({ propertiesPanelOpen: open }),
    setTimelineOpen: (open) => set({ timelineOpen: open }),
  }))
)

// Selector hooks for optimized re-renders
export const useNodes = () => useWorkflowStore((state) => state.nodes)
export const useEdges = () => useWorkflowStore((state) => state.edges)
export const useSelectedNode = () => {
  const nodes = useWorkflowStore((state) => state.nodes)
  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId)
  return nodes.find((n) => n.id === selectedNodeId) || null
}
export const useExecutionStatus = () =>
  useWorkflowStore((state) => state.executionStatus)
export const useExecutionLog = () =>
  useWorkflowStore((state) => state.executionLog)
export const usePendingApproval = () =>
  useWorkflowStore((state) => state.pendingApproval)
