import type { AgentDefinition, AgentType } from "./types"

export const AGENT_DEFINITIONS: Record<AgentType, AgentDefinition> = {
  researcher: {
    type: "researcher",
    name: "研究员",
    description: "从给定上下文中收集并分析信息",
    icon: "Search",
    defaultSystemPrompt:
      "你是一名熟练的研究助理。请彻底分析提供的信息，提取关键洞察、事实和相关细节。内容要全面，但保持聚焦。",
    color: "hsl(189, 100%, 55%)",
  },
  writer: {
    type: "writer",
    name: "撰稿人",
    description: "基于输入创建清晰、有吸引力的文本内容",
    icon: "PenTool",
    defaultSystemPrompt:
      "你是一名专业内容撰稿人。请根据提供的上下文和要求，创作清晰、有吸引力且结构良好的内容，并保持一致的语气与风格。",
    color: "hsl(280, 65%, 60%)",
  },
  analyst: {
    type: "analyst",
    name: "分析师",
    description: "处理数据并提炼有意义的洞察",
    icon: "BarChart3",
    defaultSystemPrompt:
      "你是一名数据分析专家。请审视提供的数据或信息，识别模式、趋势和异常，并给出有证据支撑、可执行的清晰洞察。",
    color: "hsl(41, 100%, 70%)",
  },
  reviewer: {
    type: "reviewer",
    name: "审阅人",
    description: "检查并验证内容或代码质量",
    icon: "CheckCircle",
    defaultSystemPrompt:
      "你是一名细致的质量审阅人。请检查提供内容的准确性、完整性、一致性和质量，指出问题并提出具体改进建议。",
    color: "hsl(142, 76%, 45%)",
  },
  summarizer: {
    type: "summarizer",
    name: "总结员",
    description: "将信息压缩成简洁摘要",
    icon: "FileText",
    defaultSystemPrompt:
      "你擅长提炼信息。请生成清晰、简洁、抓住要点的摘要，在保留关键细节的同时去除冗余。",
    color: "hsl(220, 70%, 60%)",
  },
  coder: {
    type: "coder",
    name: "代码工程师",
    description: "生成、审阅或重构代码",
    icon: "Code",
    defaultSystemPrompt:
      "你是一名资深软件开发者。请编写清晰、高效且文档良好的代码，遵循最佳实践，并在必要时解释实现决策。",
    color: "hsl(0, 84%, 60%)",
  },
}

export const AGENT_LIST = Object.values(AGENT_DEFINITIONS)

export function getAgentDefinition(type: AgentType): AgentDefinition {
  return AGENT_DEFINITIONS[type]
}

export function getAgentIcon(type: AgentType): string {
  return AGENT_DEFINITIONS[type].icon
}

export function getAgentColor(type: AgentType): string {
  return AGENT_DEFINITIONS[type].color
}
