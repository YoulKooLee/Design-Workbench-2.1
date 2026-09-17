import type {
  WorkflowNode,
  WorkflowEdge,
  AgentNodeData,
  NodeExecutionResult,
  AgentType,
} from "./types"

interface ExecutionCallbacks {
  onNodeStart: (nodeId: string) => void
  onNodeProgress: (nodeId: string, message: string) => void
  onNodeComplete: (result: NodeExecutionResult) => void
  onNodeError: (nodeId: string, error: string) => void
  onApprovalRequired: (nodeId: string) => void
  onWorkflowComplete: () => void
  onWorkflowError: (error: string) => void
  getExecutionStatus: () => string
  getNodeResults: () => Record<string, NodeExecutionResult>
}

// Topological sort to determine execution order
function topologicalSort(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): WorkflowNode[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const inDegree = new Map<string, number>()
  const adjacency = new Map<string, string[]>()

  // Initialize
  for (const node of nodes) {
    inDegree.set(node.id, 0)
    adjacency.set(node.id, [])
  }

  // Build graph
  for (const edge of edges) {
    const targets = adjacency.get(edge.source) || []
    targets.push(edge.target)
    adjacency.set(edge.source, targets)
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1)
  }

  // Find nodes with no incoming edges
  const queue: string[] = []
  for (const [id, degree] of inDegree) {
    if (degree === 0) {
      queue.push(id)
    }
  }

  const sorted: WorkflowNode[] = []
  while (queue.length > 0) {
    const nodeId = queue.shift()!
    const node = nodeMap.get(nodeId)
    if (node) {
      sorted.push(node)
    }

    const neighbors = adjacency.get(nodeId) || []
    for (const neighbor of neighbors) {
      const newDegree = (inDegree.get(neighbor) || 0) - 1
      inDegree.set(neighbor, newDegree)
      if (newDegree === 0) {
        queue.push(neighbor)
      }
    }
  }

  return sorted
}

// Get upstream node outputs for a given node
function getUpstreamOutputs(
  nodeId: string,
  edges: WorkflowEdge[],
  nodeResults: Record<string, NodeExecutionResult>
): Record<string, unknown> {
  const context: Record<string, unknown> = {}

  for (const edge of edges) {
    if (edge.target === nodeId) {
      const sourceResult = nodeResults[edge.source]
      if (sourceResult?.output) {
        context[edge.source] = sourceResult.output
      }
    }
  }

  return context
}

const agentOutputConfig: Record<
  AgentType,
  { title: string; bullets: string[] }
> = {
  researcher: {
    title: "研究笔记",
    bullets: [
      "梳理了可用上下文中的关键事实、约束和开放问题。",
      "识别出下游智能体在最终输出前应验证的信息。",
      "标记了需要人工或系统确认的假设。",
    ],
  },
  writer: {
    title: "草稿输出",
    bullets: [
      "将上游材料转化为清晰的工作草稿。",
      "保持结构简洁，便于后续审阅聚焦质量与完整性。",
      "保留了源上下文中最有价值的细节。",
    ],
  },
  analyst: {
    title: "分析摘要",
    bullets: [
      "比较可用信号，并将其归纳为可操作主题。",
      "区分了较强证据与较弱假设。",
      "为工作流负责人建议了下一处决策点。",
    ],
  },
  reviewer: {
    title: "审阅发现",
    bullets: [
      "检查了上游输出的清晰度、完整性和执行风险。",
      "在本地原型运行中未发现阻塞性问题。",
      "建议在批准后、进入生产内容前再做一次最终检查。",
    ],
  },
  summarizer: {
    title: "管理层简报",
    bullets: [
      "将工作流上下文压缩为可直接辅助决策的简短摘要。",
      "仅保留最相关的事实、风险和建议下一步。",
      "已将输出整理为适合交接或最终审阅的形式。",
    ],
  },
  coder: {
    title: "实现计划",
    bullets: [
      "将请求转化为具体的实现大纲。",
      "突出集成点、边界情况和验证步骤。",
      "准备了审阅说明，便于下游审阅人快速检查工作。",
    ],
  },
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function stringifyOutput(value: unknown): string {
  if (typeof value === "string") return value
  if (value == null) return ""

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function truncate(value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, " ").trim()
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 3)}...`
}

function summarizeContext(context: Record<string, unknown>): string {
  const entries = Object.entries(context)

  if (entries.length === 0) {
    return "未提供上游上下文。智能体使用自身角色提示生成了起始输出。"
  }

  return entries
    .map(([nodeId, output]) => `- ${nodeId}: ${truncate(stringifyOutput(output), 240)}`)
    .join("\n")
}

function getFocus(context: Record<string, unknown>, data: AgentNodeData): string {
  const firstContext = Object.values(context)
    .map((output) => truncate(stringifyOutput(output), 120))
    .find(Boolean)

  return firstContext || truncate(data.systemPrompt, 120) || data.label
}

function buildLocalAgentOutput(
  data: AgentNodeData,
  context: Record<string, unknown>
): string {
  const config = agentOutputConfig[data.agentType]
  const focus = getFocus(context, data)
  const contextSummary = summarizeContext(context)

  return [
    `${config.title}: ${data.label}`,
    "",
    `关注点：${focus}`,
    "",
    "已审阅上下文：",
    contextSummary,
    "",
    "输出：",
    ...config.bullets.map((bullet) => `- ${bullet}`),
    "",
    `模型配置：${data.model}，温度 ${data.temperature}，Token 预算 ${data.maxTokens}。`,
  ].join("\n")
}

// Execute a single agent node
async function executeAgentNode(
  node: WorkflowNode,
  context: Record<string, unknown>,
  callbacks: ExecutionCallbacks
): Promise<NodeExecutionResult> {
  const data = node.data as AgentNodeData
  const startTime = Date.now()

  callbacks.onNodeStart(node.id)
  callbacks.onNodeProgress(node.id, "正在初始化智能体...")

  try {
    callbacks.onNodeProgress(node.id, "正在读取上游上下文...")
    await delay(260)
    callbacks.onNodeProgress(node.id, "正在综合本地智能体输出...")
    await delay(420)

    const endTime = Date.now()
    const executionResult: NodeExecutionResult = {
      nodeId: node.id,
      status: "success",
      output: buildLocalAgentOutput(data, context),
      startTime,
      endTime,
      executionTime: endTime - startTime,
    }

    callbacks.onNodeComplete(executionResult)
    return executionResult
  } catch (error) {
    const endTime = Date.now()
    const errorMessage =
      error instanceof Error ? error.message : "未知错误"

    const executionResult: NodeExecutionResult = {
      nodeId: node.id,
      status: "error",
      error: errorMessage,
      startTime,
      endTime,
      executionTime: endTime - startTime,
    }

    callbacks.onNodeError(node.id, errorMessage)
    return executionResult
  }
}

// Execute workflow
export async function executeWorkflow(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
  callbacks: ExecutionCallbacks,
  workflowInput?: string
): Promise<void> {
  // Sort nodes topologically
  const sortedNodes = topologicalSort(nodes, edges)

  // Track results
  const results: Record<string, NodeExecutionResult> = {}

  // If there's workflow input, add it to the start node result
  const startNode = sortedNodes.find((n) => n.type === "startNode")
  if (startNode && workflowInput) {
    results[startNode.id] = {
      nodeId: startNode.id,
      status: "success",
      output: workflowInput,
      startTime: Date.now(),
      endTime: Date.now(),
      executionTime: 0,
    }
    callbacks.onNodeComplete(results[startNode.id])
  }

  // Execute each node in order
  for (const node of sortedNodes) {
    // Check if execution was cancelled
    if (callbacks.getExecutionStatus() === "idle") {
      return
    }

    // Skip start node if already processed
    if (node.type === "startNode") {
      if (!results[node.id]) {
        callbacks.onNodeStart(node.id)
        results[node.id] = {
          nodeId: node.id,
          status: "success",
      output: workflowInput || "工作流已开始",
          startTime: Date.now(),
          endTime: Date.now(),
          executionTime: 0,
        }
        callbacks.onNodeComplete(results[node.id])
      }
      continue
    }

    // Handle end node
    if (node.type === "endNode") {
      callbacks.onNodeStart(node.id)

      // Collect all outputs
      const allOutputs = Object.values(callbacks.getNodeResults())
        .filter((r) => r.output)
        .map((r) => r.output)
        .join("\n\n结果分隔\n\n")

      results[node.id] = {
        nodeId: node.id,
        status: "success",
        output: allOutputs,
        startTime: Date.now(),
        endTime: Date.now(),
        executionTime: 0,
      }
      callbacks.onNodeComplete(results[node.id])
      callbacks.onWorkflowComplete()
      return
    }

    // Handle approval gate
    if (node.type === "approvalGateNode") {
      callbacks.onNodeStart(node.id)
      callbacks.onApprovalRequired(node.id)

      // Wait for approval (this will pause execution)
      // The resumeExecution callback will handle continuing
      return
    }

    // Handle agent nodes
    if (node.type === "agentNode") {
      const context = getUpstreamOutputs(node.id, edges, {
        ...results,
        ...callbacks.getNodeResults(),
      })

      const result = await executeAgentNode(node, context, callbacks)
      results[node.id] = result

      // If error, stop execution
      if (result.status === "error") {
        callbacks.onWorkflowError(result.error || "智能体执行失败")
        return
      }
    }
  }
}

// Resume execution after approval
export async function resumeWorkflowAfterApproval(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
  approvedNodeId: string,
  callbacks: ExecutionCallbacks
): Promise<void> {
  // Find the approved node's position in the sorted order
  const sortedNodes = topologicalSort(nodes, edges)
  const approvedIndex = sortedNodes.findIndex((n) => n.id === approvedNodeId)

  if (approvedIndex === -1) {
    callbacks.onWorkflowError("在工作流中未找到已批准节点")
    return
  }

  // Mark approval node as complete
  const approvalResult: NodeExecutionResult = {
    nodeId: approvedNodeId,
    status: "success",
        output: "已批准",
    startTime: Date.now(),
    endTime: Date.now(),
    executionTime: 0,
  }
  callbacks.onNodeComplete(approvalResult)

  // Continue execution from the next node
  const remainingNodes = sortedNodes.slice(approvedIndex + 1)

  for (const node of remainingNodes) {
    // Check if execution was cancelled
    if (callbacks.getExecutionStatus() === "idle") {
      return
    }

    // Handle end node
    if (node.type === "endNode") {
      callbacks.onNodeStart(node.id)

      const allOutputs = Object.values(callbacks.getNodeResults())
        .filter((r) => r.output)
        .map((r) => r.output)
        .join("\n\n结果分隔\n\n")

      const endResult: NodeExecutionResult = {
        nodeId: node.id,
        status: "success",
        output: allOutputs,
        startTime: Date.now(),
        endTime: Date.now(),
        executionTime: 0,
      }
      callbacks.onNodeComplete(endResult)
      callbacks.onWorkflowComplete()
      return
    }

    // Handle approval gate
    if (node.type === "approvalGateNode") {
      callbacks.onNodeStart(node.id)
      callbacks.onApprovalRequired(node.id)
      return
    }

    // Handle agent nodes
    if (node.type === "agentNode") {
      const context = getUpstreamOutputs(node.id, edges, callbacks.getNodeResults())
      const result = await executeAgentNode(node, context, callbacks)

      if (result.status === "error") {
        callbacks.onWorkflowError(result.error || "智能体执行失败")
        return
      }
    }
  }
}
