import { useCallback } from "react"
import { useWorkflowStore } from "../lib/orchestrator/store"
import {
  executeWorkflow,
  resumeWorkflowAfterApproval,
} from "../lib/orchestrator/execution-engine"
import type { NodeExecutionResult } from "../lib/orchestrator/types"

function createCallbacks(
  nodes: ReturnType<typeof useWorkflowStore.getState>["nodes"],
  updateNodeData: ReturnType<typeof useWorkflowStore.getState>["updateNodeData"],
  updateNodeResult: ReturnType<typeof useWorkflowStore.getState>["updateNodeResult"],
  addLogEntry: ReturnType<typeof useWorkflowStore.getState>["addLogEntry"],
  setPendingApproval: ReturnType<typeof useWorkflowStore.getState>["setPendingApproval"],
) {
  return {
    onNodeStart: (nodeId: string) => {
      updateNodeData(nodeId, { status: "running" })
      const node = nodes.find((n) => n.id === nodeId)
      addLogEntry({
        nodeId,
        nodeName: node?.data?.label || nodeId,
        type: "start",
        message: "开始执行",
      })
    },

    onNodeProgress: (nodeId: string, message: string) => {
      const node = nodes.find((n) => n.id === nodeId)
      addLogEntry({
        nodeId,
        nodeName: node?.data?.label || nodeId,
        type: "progress",
        message,
      })
    },

    onNodeComplete: (result: NodeExecutionResult) => {
      updateNodeResult(result)
      const node = nodes.find((n) => n.id === result.nodeId)
      addLogEntry({
        nodeId: result.nodeId,
        nodeName: node?.data?.label || result.nodeId,
        type: "complete",
        message: `已完成，用时 ${result.executionTime || 0}ms`,
        data: result.output
          ? { output: result.output.substring(0, 200) }
          : undefined,
      })
    },

    onNodeError: (nodeId: string, error: string) => {
      const node = nodes.find((n) => n.id === nodeId)
      addLogEntry({
        nodeId,
        nodeName: node?.data?.label || nodeId,
        type: "error",
        message: error,
      })
    },

    onApprovalRequired: (nodeId: string) => {
      setPendingApproval(nodeId)
      const node = nodes.find((n) => n.id === nodeId)
      addLogEntry({
        nodeId,
        nodeName: node?.data?.label || nodeId,
        type: "approval",
        message: "等待审批",
      })
    },

    onWorkflowComplete: () => {
      useWorkflowStore.setState({ executionStatus: "success" })
      addLogEntry({
        nodeId: "system",
        nodeName: "系统",
        type: "complete",
        message: "工作流已成功完成",
      })
    },

    onWorkflowError: (error: string) => {
      useWorkflowStore.setState({ executionStatus: "error" })
      addLogEntry({
        nodeId: "system",
        nodeName: "系统",
        type: "error",
        message: `工作流失败：${error}`,
      })
    },

    getExecutionStatus: () => useWorkflowStore.getState().executionStatus,
    getNodeResults: () => useWorkflowStore.getState().nodeResults,
  }
}

export function useWorkflowExecution() {
  const {
    nodes,
    edges,
    startExecution,
    updateNodeResult,
    addLogEntry,
    setPendingApproval,
    updateNodeData,
  } = useWorkflowStore()

  const runWorkflow = useCallback(
    async (workflowInput?: string) => {
      if (nodes.length === 0) {
        console.warn("No nodes to execute")
        return
      }

      startExecution()

      const callbacks = createCallbacks(
        nodes,
        updateNodeData,
        updateNodeResult,
        addLogEntry,
        setPendingApproval,
      )

      await executeWorkflow(nodes, edges, callbacks, workflowInput)
    },
    [nodes, edges, startExecution, updateNodeResult, addLogEntry, setPendingApproval, updateNodeData],
  )

  const resumeAfterApproval = useCallback(
    async (approvedNodeId: string) => {
      const callbacks = createCallbacks(
        nodes,
        updateNodeData,
        updateNodeResult,
        addLogEntry,
        setPendingApproval,
      )

      await resumeWorkflowAfterApproval(
        nodes,
        edges,
        approvedNodeId,
        callbacks,
      )
    },
    [nodes, edges, updateNodeResult, addLogEntry, setPendingApproval, updateNodeData],
  )

  return {
    runWorkflow,
    resumeAfterApproval,
  }
}
