import type { WorkflowTemplate, WorkflowNode, WorkflowEdge } from "./types"
import { AGENT_DEFINITIONS } from "./agents"

function createAgentNode(
  id: string,
  agentType: keyof typeof AGENT_DEFINITIONS,
  label: string,
  position: { x: number; y: number },
  systemPromptOverride?: string
): WorkflowNode {
  const agent = AGENT_DEFINITIONS[agentType]
  return {
    id,
    type: "agentNode",
    position,
    data: {
      label,
      agentType,
      systemPrompt: systemPromptOverride || agent.defaultSystemPrompt,
      model: "openai/gpt-5.2",
      temperature: 0.7,
      maxTokens: 2048,
      inputMapping: {},
      status: "idle",
    },
  }
}

function createStartNode(
  id: string,
  position: { x: number; y: number }
): WorkflowNode {
  return {
    id,
    type: "startNode",
    position,
    data: { label: "开始", status: "idle" },
  }
}

function createEndNode(
  id: string,
  position: { x: number; y: number }
): WorkflowNode {
  return {
    id,
    type: "endNode",
    position,
    data: { label: "结束", status: "idle" },
  }
}

function createApprovalNode(
  id: string,
  label: string,
  description: string,
  position: { x: number; y: number },
  options: string[] = ["批准", "拒绝", "要求修改"]
): WorkflowNode {
  return {
    id,
    type: "approvalGateNode",
    position,
    data: { label, description, approvalOptions: options, status: "idle" },
  }
}

function createEdge(source: string, target: string): WorkflowEdge {
  return {
    id: `edge-${source}-${target}`,
    source,
    target,
    style: { strokeWidth: 2 },
  }
}

const contentReviewPipeline: WorkflowTemplate = {
  id: "content-review",
  name: "内容审阅流水线",
  description:
    "输入主题或简报：撰稿人先起草内容，审阅人给出修改意见，最后由你批准后输出。",
  nodes: [
    createStartNode("start", { x: 50, y: 200 }),
    createAgentNode(
      "writer",
      "writer",
      "内容撰稿人",
      { x: 250, y: 200 },
      "你是一名专业内容撰稿人。用户会提供主题或简报。请围绕该主题撰写一篇 300-500 字、结构清晰且有吸引力的文章，使用清楚的小标题和自然的表达。"
    ),
    createAgentNode(
      "reviewer",
      "reviewer",
      "质量审阅人",
      { x: 500, y: 200 },
      "你是一名细致的编辑。请从清晰度、准确性、语法和吸引力方面审阅草稿，提供 3 条具体建议，并以 1-10 分评价内容质量。"
    ),
    createApprovalNode(
      "approval",
      "编辑审批",
      "阅读草稿和审阅反馈。你可以批准发布、拒绝，或要求修订。",
      { x: 750, y: 200 }
    ),
    createEndNode("end", { x: 1000, y: 200 }),
  ],
  edges: [
    createEdge("start", "writer"),
    createEdge("writer", "reviewer"),
    createEdge("reviewer", "approval"),
    createEdge("approval", "end"),
  ],
}

const researchSummarize: WorkflowTemplate = {
  id: "research-summarize",
  name: "研究与摘要",
  description:
    "提供研究问题、主题或资料清单。研究员负责调研，分析师提炼模式，总结员输出管理层摘要。",
  nodes: [
    createStartNode("start", { x: 50, y: 200 }),
    createAgentNode(
      "researcher",
      "researcher",
      "主题研究员",
      { x: 250, y: 200 },
      "你是一名深入的研究员。用户会提供主题、问题或资源清单。请充分调研：收集关键事实，识别相关数据点，并记录重要细节。内容应全面。"
    ),
    createAgentNode(
      "analyst",
      "analyst",
      "模式分析师",
      { x: 500, y: 200 },
      "你是一名熟练的分析师。请基于研究发现，识别最重要的 3 个模式或趋势，评估可靠性，并突出可执行洞察。"
    ),
    createAgentNode(
      "summarizer",
      "summarizer",
      "管理层总结员",
      { x: 750, y: 200 },
      "你负责撰写管理层摘要。请将分析提炼成 400 字以内的简明简报，包含关键结论、重要发现和建议的下一步。"
    ),
    createEndNode("end", { x: 1000, y: 200 }),
  ],
  edges: [
    createEdge("start", "researcher"),
    createEdge("researcher", "analyst"),
    createEdge("analyst", "summarizer"),
    createEdge("summarizer", "end"),
  ],
}

const codeReviewFlow: WorkflowTemplate = {
  id: "code-review",
  name: "代码审阅流程",
  description:
    "描述功能或粘贴代码。代码工程师负责编写或重构，审阅人检查缺陷与最佳实践，最后由你批准部署。",
  nodes: [
    createStartNode("start", { x: 50, y: 200 }),
    createAgentNode(
      "coder",
      "coder",
      "代码生成器",
      { x: 250, y: 200 },
      "你是一名资深开发者。用户会描述功能、缺陷修复，或粘贴需要重构的代码。请产出清晰、有文档说明且包含错误处理的代码。"
    ),
    createAgentNode(
      "code-reviewer",
      "reviewer",
      "代码审阅人",
      { x: 500, y: 200 },
      "你是一名资深代码审阅人。请检查代码中的缺陷、安全问题、性能和最佳实践，给出具体到位置的反馈，并提供整体质量评分。"
    ),
    createApprovalNode(
      "approval",
      "部署审批",
      "审阅代码与审计反馈。你可以批准部署、要求修改或拒绝。",
      { x: 750, y: 200 },
      ["批准部署", "要求修改", "拒绝"]
    ),
    createEndNode("end", { x: 1000, y: 200 }),
  ],
  edges: [
    createEdge("start", "coder"),
    createEdge("coder", "code-reviewer"),
    createEdge("code-reviewer", "approval"),
    createEdge("approval", "end"),
  ],
}

const aiRoundtable: WorkflowTemplate = {
  id: "ai-roundtable",
  name: "AI 圆桌（自动发现）",
  description:
    "完全自动化：无需提示词。三个 AI 智能体协作：研究员发现最新趋势，分析师评估重要性，撰稿人产出简报。智能体会相互衔接推进。",
  nodes: [
    createStartNode("start", { x: 50, y: 200 }),
    createAgentNode(
      "scout",
      "researcher",
      "趋势侦察员",
      { x: 250, y: 100 },
      "你是一名趋势研究员。无需用户提示，请识别 2026 年初正在发生的 5 个最重要的新兴新闻、技术突破或文化变化。每项给出一句标题和两句重要性说明，重点关注 AI、科学、地缘政治和经济。"
    ),
    createAgentNode(
      "debater",
      "analyst",
      "影响分析师",
      { x: 500, y: 100 },
      "你是一名参与圆桌讨论的批判性分析师。请审阅趋势侦察员的发现。针对每个趋势：(1) 以 1-10 分评估潜在影响，(2) 识别受益者与风险承受者，(3) 提出一个值得讨论的问题。挑战薄弱论点，强化有价值的判断。"
    ),
    createAgentNode(
      "synthesizer",
      "writer",
      "圆桌主持人",
      { x: 750, y: 100 },
      "你是负责综合 AI 智能体圆桌讨论的主持人。你拥有趋势侦察员的发现与影响分析师的评估。请撰写一篇约 500 字、标题为“AI 圆桌周报”的简报：开头点出最重要发现，中段融合影响评分与讨论问题，结尾给读者 3 条可执行建议。"
    ),
    createAgentNode(
      "fact-checker",
      "reviewer",
      "事实核查与润色",
      { x: 500, y: 320 },
      "你是一名严谨的事实核查员与编辑。请检查圆桌简报：(1) 标记看似缺少依据的说法，(2) 检查趋势与建议之间的逻辑一致性，(3) 优化可读性与专业语气。输出润色后的最终简报，并给出事实可靠性置信度评分（1-10）。"
    ),
    createEndNode("end", { x: 750, y: 320 }),
  ],
  edges: [
    createEdge("start", "scout"),
    createEdge("scout", "debater"),
    createEdge("debater", "synthesizer"),
    createEdge("synthesizer", "fact-checker"),
    createEdge("fact-checker", "end"),
  ],
}

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  contentReviewPipeline,
  researchSummarize,
  codeReviewFlow,
  aiRoundtable,
]

export function getTemplateById(id: string): WorkflowTemplate | undefined {
  return WORKFLOW_TEMPLATES.find((t) => t.id === id)
}

export function applyTemplate(
  template: WorkflowTemplate
): { nodes: WorkflowNode[]; edges: WorkflowEdge[] } {
  return {
    nodes: JSON.parse(JSON.stringify(template.nodes)),
    edges: JSON.parse(JSON.stringify(template.edges)),
  }
}
