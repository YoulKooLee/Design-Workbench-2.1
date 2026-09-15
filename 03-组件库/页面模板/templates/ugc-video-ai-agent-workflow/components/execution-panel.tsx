import React, { useState, useMemo, useEffect, useCallback } from "react"
import type { Node, Edge } from "@xyflow/react"
import { Play, X, Check, AlertCircle, Loader2, ChevronDown, ChevronRight, RefreshCw, StopCircle } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import type { Run, RunStep } from "../lib/types"

const NODE_LABELS: Record<string, string> = {
  start: "开始",
  end: "结束",
  textModel: "文本模型",
  prompt: "Prompt",
  conditional: "条件",
  httpRequest: "HTTP 请求",
  imageGeneration: "图像生成",
  javascript: "JavaScript",
  audio: "音频",
  embeddingModel: "嵌入模型",
  tool: "工具",
  structuredOutput: "结构化输出",
  memory: "记忆",
  ugcModel: "UGC 模特",
  productUpload: "产品上传",
  script: "视频脚本",
  videoGeneration: "视频生成",
}

type ExecutionResult = {
  nodeId: string
  type: string
  output: any
  error?: string
}

type IterationLog = {
  iteration: number
  maxIterations: number
  output: string
}

type ExecutionPanelProps = {
  nodes: Node[]
  edges: Edge[]
  onClose: () => void
  onNodeStatusChange?: (nodeId: string, status: "idle" | "running" | "completed" | "error") => void
  onNodeOutputChange?: (nodeId: string, output: any) => void
  onRunComplete?: (run: Run) => void
  initialStopAtNodeId?: string | null
}

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

const escapeSvgText = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

const createPrototypeImage = (title: string, detail: string, hue: number) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280" viewBox="0 0 720 1280">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="oklch(0.24 0.03 ${hue})"/>
          <stop offset="1" stop-color="oklch(0.82 0.08 ${hue + 38})"/>
        </linearGradient>
      </defs>
      <rect width="720" height="1280" fill="url(#bg)"/>
      <rect x="72" y="120" width="576" height="1040" rx="42" fill="oklch(0.98 0.01 ${hue})" opacity="0.92"/>
      <circle cx="360" cy="390" r="150" fill="oklch(0.72 0.05 ${hue + 18})"/>
      <rect x="235" y="570" width="250" height="210" rx="32" fill="oklch(0.32 0.04 ${hue})"/>
      <rect x="180" y="832" width="360" height="78" rx="24" fill="oklch(0.9 0.03 ${hue + 25})"/>
      <text x="360" y="992" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="42" font-weight="700" fill="oklch(0.18 0.02 ${hue})">${escapeSvgText(title)}</text>
      <text x="360" y="1052" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="26" fill="oklch(0.36 0.02 ${hue})">${escapeSvgText(detail)}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const getNodeName = (node: Node) => {
  const data = (node.data || {}) as Record<string, unknown>
  return String(data.label || NODE_LABELS[node.type || ""] || node.type || "节点")
}

const getOrderedNodes = (nodes: Node[], edges: Edge[]) => {
  const byId = new Map(nodes.map((node) => [node.id, node]))
  const outgoing = new Map<string, Edge[]>()
  const incomingCount = new Map(nodes.map((node) => [node.id, 0]))

  edges.forEach((edge) => {
    outgoing.set(edge.source, [...(outgoing.get(edge.source) || []), edge])
    incomingCount.set(edge.target, (incomingCount.get(edge.target) || 0) + 1)
  })

  const ordered: Node[] = []
  const queue = nodes
    .filter((node) => (incomingCount.get(node.id) || 0) === 0)
    .sort((a, b) => a.position.x - b.position.x || a.position.y - b.position.y)

  while (queue.length > 0) {
    const node = queue.shift()
    if (!node) break

    ordered.push(node)

    ;(outgoing.get(node.id) || []).forEach((edge) => {
      const target = byId.get(edge.target)
      if (!target) return

      const remaining = (incomingCount.get(target.id) || 0) - 1
      incomingCount.set(target.id, remaining)
      if (remaining === 0) {
        queue.push(target)
        queue.sort((a, b) => a.position.x - b.position.x || a.position.y - b.position.y)
      }
    })
  }

  nodes
    .filter((node) => !ordered.some((orderedNode) => orderedNode.id === node.id))
    .sort((a, b) => a.position.x - b.position.x || a.position.y - b.position.y)
    .forEach((node) => ordered.push(node))

  return ordered
}

const createNodeOutput = (node: Node) => {
  const data = (node.data || {}) as Record<string, any>

  switch (node.type) {
    case "start":
      return "工作流已开始"
    case "productUpload":
      return data.productName
        ? `产品素材已就绪：${data.productName}`
        : "UGC 流程的示例产品素材已就绪"
    case "ugcModel":
      return createPrototypeImage(
        "AI 创作者",
        `${data.gender || "female"} · ${data.ageRange || "26-35"} · ${data.ethnicity || "caucasian"}`,
        248,
      )
    case "script":
      return data.script || "大家好，我刚拿到这个产品，想给你们看看它为什么适合我的日常。"
    case "imageGeneration":
      return createPrototypeImage("生成画面", "创作者手持产品", 128)
    case "videoGeneration":
      return {
        result: `原型视频渲染已就绪（${data.aspectRatio || "9:16"}，${data.duration || "8s"}）`,
        preview: "一段竖屏 UGC 短片，包含产品手持、自然手势和口型同步。",
      }
    case "end":
      return "工作流已完成。最终 UGC 视频包已可查看。"
    case "conditional":
      return true
    case "embeddingModel":
      return { result: "Embedding 向量已生成", dimensions: data.dimensions || 1536 }
    case "httpRequest":
      return { status: 200, result: `原型 ${data.method || "GET"} 请求已完成` }
    case "memory":
      return { result: "原型记忆值已读取", key: data.key || "default" }
    default:
      return { result: `${getNodeName(node)} 已在原型模式下完成` }
  }
}

const formatExecutionOutput = (output: any) => {
  if (typeof output === "string") {
    if (output.startsWith("data:image/")) return "生成图像预览已显示在画布上。"
    return output.length > 320 ? `${output.slice(0, 320)}...` : output
  }

  if (output && typeof output === "object") {
    if (output.result && output.preview) return `${output.result}\n${output.preview}`
    if (output.result) return output.result
  }

  return JSON.stringify(output, null, 2)
}

export function ExecutionPanel({
  nodes,
  edges,
  onClose,
  onNodeStatusChange,
  onNodeOutputChange,
  onRunComplete,
  initialStopAtNodeId,
}: ExecutionPanelProps) {
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionLog, setExecutionLog] = useState<ExecutionResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [iterations, setIterations] = useState<IterationLog[]>([])
  const [expandedIterations, setExpandedIterations] = useState<Set<number>>(new Set())
  const [stopAtNodeId, setStopAtNodeId] = useState<string>(initialStopAtNodeId || "__full__")
  const [stoppedAt, setStoppedAt] = useState<string | null>(null)
  
  // Auto-update stopAtNodeId when prop changes
  useEffect(() => {
    if (initialStopAtNodeId !== undefined) {
      setStopAtNodeId(initialStopAtNodeId || "__full__")
    }
  }, [initialStopAtNodeId])

  // Get nodes that can be stopped at (excluding start node)
  const stoppableNodes = useMemo(() => {
    return nodes.filter(n => n.type !== "start" && n.type !== "end")
  }, [nodes])

  // Handle "runToNode" event from nodes
  const handleRunToNode = useCallback((e: CustomEvent<{ nodeId: string }>) => {
    const nodeId = e.detail.nodeId
    // Find the actual node by type if nodeId is a type
    const targetNode = nodes.find(n => n.id === nodeId || n.type === nodeId)
    if (targetNode) {
      setStopAtNodeId(targetNode.id)
      // Trigger execution after state update
      setTimeout(() => {
        const executeButton = document.querySelector("[data-execute-workflow]") as HTMLButtonElement
        if (executeButton) executeButton.click()
      }, 100)
    }
  }, [nodes])

  useEffect(() => {
    window.addEventListener("runToNode" as any, handleRunToNode as any)
    return () => {
      window.removeEventListener("runToNode" as any, handleRunToNode as any)
    }
  }, [handleRunToNode])

  const toggleIteration = (index: number) => {
    setExpandedIterations((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const handleExecute = async (_continueFromStopped = false) => {
    setIsExecuting(true)
    setExecutionLog([])
    setError(null)
    setCurrentNodeId(null)
    setIterations([])
    setExpandedIterations(new Set())
    setStoppedAt(null)

    const runId = `run-${Date.now()}`
    const runStartedAt = new Date().toISOString()
    const runSteps: RunStep[] = []

    nodes.forEach((node) => {
      if (onNodeStatusChange) onNodeStatusChange(node.id, "idle")
      if (onNodeOutputChange) onNodeOutputChange(node.id, null)
    })

    try {
      let runStatus: Run["status"] = "completed"
      const orderedNodes = getOrderedNodes(nodes, edges)
      const targetNodeId = stopAtNodeId !== "__full__" ? stopAtNodeId : null

      for (const node of orderedNodes) {
        const startedAt = new Date().toISOString()

        onNodeStatusChange?.(node.id, "running")
        setCurrentNodeId(node.id)
        setIterations([])
        runSteps.push({
          nodeId: node.id,
          nodeType: node.type || "unknown",
          nodeName: getNodeName(node),
          status: "running",
          startedAt,
        })

        if (node.type === "textModel") {
          for (let iteration = 1; iteration <= 3; iteration += 1) {
            await sleep(180)
            setIterations((prev) => [
              ...prev,
              {
                iteration,
                maxIterations: 3,
                output: `正在生成第 ${iteration} 轮响应：检查 prompt、模型设置和完成信号。`,
              },
            ])
            setExpandedIterations((prev) => new Set([...prev, iteration - 1]))
          }
        } else {
          await sleep(node.type === "videoGeneration" ? 650 : 300)
        }

        const output = createNodeOutput(node)
        onNodeStatusChange?.(node.id, "completed")
        onNodeOutputChange?.(node.id, output)
        setExecutionLog((prev) => [...prev, { nodeId: node.id, type: node.type || "unknown", output }])
        setCurrentNodeId(null)

        const completedAt = new Date().toISOString()
        const stepIndex = runSteps.findIndex((step) => step.nodeId === node.id)
        if (stepIndex !== -1) {
          const step = runSteps[stepIndex]
          runSteps[stepIndex] = {
            ...step,
            status: "completed",
            completedAt,
            duration: step.startedAt ? new Date(completedAt).getTime() - new Date(step.startedAt).getTime() : undefined,
            output,
          }
        }

        if (targetNodeId === node.id) {
          runStatus = "stopped"
          setStoppedAt(node.id)
          break
        }
      }

      const completedAt = new Date().toISOString()
      const run: Run = {
        id: runId,
        status: runStatus,
        startedAt: runStartedAt,
        completedAt,
        duration: new Date(completedAt).getTime() - new Date(runStartedAt).getTime(),
        steps: runSteps,
      }
      onRunComplete?.(run)
    } catch (err: any) {
      setError(err.message || "执行工作流失败")
      const completedAt = new Date().toISOString()
      const run: Run = {
        id: runId,
        status: "failed",
        startedAt: runStartedAt,
        completedAt,
        duration: new Date(completedAt).getTime() - new Date(runStartedAt).getTime(),
        steps: runSteps,
      }
      onRunComplete?.(run)
    } finally {
      setIsExecuting(false)
    }
  }

  const getNodeLabel = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId)
    return node?.type || nodeId
  }

  return (
    <aside className="absolute right-0 top-0 z-10 h-full w-96 border-l border-border bg-card md:relative">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">运行</h2>
          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">原型模式</span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 space-y-3">
        {/* Run to here selector */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">运行至</label>
          <Select value={stopAtNodeId} onValueChange={setStopAtNodeId} disabled={isExecuting}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="选择停止节点" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__full__" className="text-xs">
                完整工作流（全部运行）
              </SelectItem>
              {stoppableNodes.map((node) => (
                <SelectItem key={node.id} value={node.id} className="text-xs">
                  <span className="flex items-center gap-2">
                    <StopCircle className="h-3 w-3 text-amber-500" />
                    {NODE_LABELS[node.type || ""] || node.type} 
                    {node.data?.label ? ` (${node.data.label})` : ""}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            data-execute-workflow
            onClick={() => handleExecute(false)}
            disabled={isExecuting || nodes.length === 0}
            size="sm"
            className="flex-1 h-9 text-sm"
          >
            {isExecuting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                正在运行{stopAtNodeId !== "__full__" ? `到 ${getNodeLabel(stopAtNodeId)}` : ""}
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {stopAtNodeId !== "__full__" ? `运行到 ${getNodeLabel(stopAtNodeId)}` : "全部运行"}
              </>
            )}
          </Button>
        </div>

        {stoppedAt && (
          <div className="rounded border border-amber-500/30 bg-amber-500/5 p-3">
            <div className="flex items-start gap-2">
              <StopCircle className="h-4 w-4 text-amber-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  已停止于 {getNodeLabel(stoppedAt)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  检查上方输出。满意后锁定结果，再运行完整工作流。
                </p>
                <Button
                  size="sm"
                  className="mt-2 h-7 text-xs"
                  onClick={() => {
                    setStopAtNodeId("__full__")
                    setStoppedAt(null)
                    setTimeout(() => handleExecute(false), 100)
                  }}
                >
                  <Play className="mr-1.5 h-3 w-3" />
                  运行完整工作流
                </Button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded border border-destructive/30 bg-destructive/5 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        )}

        {(executionLog.length > 0 || currentNodeId || iterations.length > 0) && (
          <div className="mt-4">
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="space-y-3">
                {currentNodeId && (
                  <div className="rounded border border-primary/30 bg-primary/5 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm font-medium text-foreground">{getNodeLabel(currentNodeId)}</span>
                      {iterations.length > 0 && (
                        <span className="text-xs text-muted-foreground ml-auto font-mono">
                          {iterations.length}/{iterations[0]?.maxIterations || "?"}
                        </span>
                      )}
                    </div>

                    {iterations.length > 0 && (
                      <div className="space-y-1.5 mt-3">
                        {iterations.map((iter, index) => (
                          <div key={index} className="border border-border/50 rounded bg-background/50">
                            <button
                              onClick={() => toggleIteration(index)}
                              className="w-full flex items-center gap-2 p-2 text-left hover:bg-secondary/30 transition-colors"
                            >
                              {expandedIterations.has(index) ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="text-xs font-medium text-muted-foreground font-mono">
                                迭代 {iter.iteration}
                              </span>
                              {index === iterations.length - 1 && (
                                <span className="text-xs text-primary ml-auto">最新</span>
                              )}
                            </button>
                            {expandedIterations.has(index) && (
                              <div className="px-3 pb-3">
                                <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words max-h-40 overflow-y-auto font-mono">
                                  {iter.output}
                                </pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {executionLog.map((result, index) => (
                  <div
                    key={index}
                    className={`rounded border p-3 ${result.error ? "border-destructive/30 bg-destructive/5" : "border-border bg-secondary/30"}`}
                  >
                    <div className="flex items-start gap-2">
                      {result.error ? (
                        <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                      ) : (
                        <Check className="h-4 w-4 text-muted-foreground mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-foreground">{getNodeLabel(result.nodeId)}</span>
                        {result.error ? (
                          <p className="text-xs text-destructive mt-1.5">{result.error}</p>
                        ) : (
                          <pre className="mt-1.5 text-xs text-muted-foreground overflow-hidden whitespace-pre-wrap break-words max-h-32 font-mono">
                            {formatExecutionOutput(result.output)}
                          </pre>
                        )}
                        {result.output?.iterations && (
                          <p className="text-xs text-muted-foreground mt-1.5 pt-1.5 border-t border-border/50 font-mono">
                            完成于 {result.output.iterations} 次迭代
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {executionLog.length === 0 && !error && !isExecuting && !currentNodeId && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">点击运行以执行工作流</p>
            <p className="text-xs text-muted-foreground/70 mt-2">在原型模式下本地运行</p>
          </div>
        )}
      </div>
    </aside>
  )
}
