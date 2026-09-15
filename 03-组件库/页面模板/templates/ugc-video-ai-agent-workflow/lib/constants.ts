import type { NodeType } from "./types"

export const PROVIDER_LOGOS: Record<string, string> = {
  Anthropic: "https://cdn.worldvectorlogo.com/logos/anthropic-2.svg",
  OpenAI: "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
  Google: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg",
  "Fal AI": "https://fal.ai/favicon.ico",
}

// 可通过 AI Gateway 使用的 AI 模型
export const TEXT_MODELS = [
  // OpenAI
  { value: "openai/gpt-5", label: "GPT-5", group: "OpenAI" },
  { value: "openai/gpt-5-mini", label: "GPT-5 Mini", group: "OpenAI" },
  { value: "openai/gpt-4.1", label: "GPT-4.1", group: "OpenAI" },
  { value: "openai/gpt-4.1-mini", label: "GPT-4.1 Mini", group: "OpenAI" },
  { value: "openai/gpt-4.1-nano", label: "GPT-4.1 Nano", group: "OpenAI" },
  { value: "openai/o3", label: "o3", group: "OpenAI" },
  { value: "openai/o3-mini", label: "o3 Mini", group: "OpenAI" },
  { value: "openai/o4-mini", label: "o4 Mini", group: "OpenAI" },
  // Google Gemini models
  { value: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro", group: "Google" },
  { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", group: "Google" },
  { value: "google/gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite", group: "Google" },
  { value: "google/gemini-2.0-flash", label: "Gemini 2.0 Flash", group: "Google" },
  { value: "google/gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite", group: "Google" },
  // xAI (Grok)
  { value: "xai/grok-4", label: "Grok 4", group: "xAI" },
  { value: "xai/grok-4-fast", label: "Grok 4 Fast", group: "xAI" },
  { value: "xai/grok-3", label: "Grok 3", group: "xAI" },
  { value: "xai/grok-3-fast", label: "Grok 3 Fast", group: "xAI" },
  { value: "xai/grok-3-mini", label: "Grok 3 Mini", group: "xAI" },
  { value: "xai/grok-3-mini-fast", label: "Grok 3 Mini Fast", group: "xAI" },
] as const

// Updated default node data
export const DEFAULT_NODE_DATA: Record<NodeType, Record<string, unknown>> = {
  start: {},
  end: {},
  prompt: { content: "输入你的 prompt..." },
  textModel: {
    model: "openai/gpt-5-mini",
    temperature: 0.7,
    maxTokens: 2000,
    agentMode: false,
    completionSignal: "TASK_COMPLETE",
    maxIterations: 10,
  },
  imageGeneration: { model: "fal-ai/flux-2-pro/edit", aspectRatio: "9:16", outputFormat: "jpeg" },
  conditional: { condition: "input1 === 'value'" },
  javascript: { code: "// 可通过 input1、input2 等变量访问输入\nreturn input1.toUpperCase()" },
  httpRequest: { url: "https://api.example.com", method: "GET" },
  embeddingModel: { model: "openai/text-embedding-3-small", dimensions: 1536 },
  tool: { name: "customTool", description: "一个自定义工具" },
  audio: { model: "openai/tts-1", voice: "alloy", speed: 1.0 },
  structuredOutput: { schemaName: "Schema", mode: "object" },
  memory: { operation: "load", sessionId: "default", key: "", memoryType: "fact", limit: 10 },
  ugcModel: { ethnicity: "caucasian", gender: "female", ageRange: "26-35", description: "", isLocked: false },
  productUpload: { productImage: undefined, productName: "" },
  script: { script: "" },
  videoGeneration: { model: "fal-ai/veo-3.1", aspectRatio: "9:16", duration: "8s" },
}

export const IMAGE_MODELS = [
  { value: "fal-ai/flux-2-pro/edit", label: "Flux 2 Pro Edit", group: "Fal AI", description: "图生图，最佳质量（推荐）" },
  { value: "fal-ai/flux-2/lora/edit", label: "Flux 2 LoRA Edit", group: "Fal AI", description: "图生图，支持 LoRA" },
] as const

export const EMBEDDING_MODELS = [
  { value: "openai/text-embedding-3-small", label: "text-embedding-3-small" },
  { value: "openai/text-embedding-3-large", label: "text-embedding-3-large" },
] as const

export const VIDEO_MODELS = [
  { value: "fal-ai/veo-3.1", label: "Veo 3.1", group: "Fal AI", description: "图生视频，带音频（推荐）" },
] as const

export const ETHNICITIES = [
  { value: "caucasian", label: "白人" },
  { value: "african", label: "非裔" },
  { value: "asian", label: "亚洲人" },
  { value: "hispanic", label: "西语裔/拉丁裔" },
  { value: "middle-eastern", label: "中东裔" },
  { value: "south-asian", label: "南亚人" },
  { value: "mixed", label: "混血" },
] as const

export const GENDERS = [
  { value: "female", label: "女性" },
  { value: "male", label: "男性" },
  { value: "non-binary", label: "非二元" },
] as const

export const AGE_RANGES = [
  { value: "18-25", label: "18-25" },
  { value: "26-35", label: "26-35" },
  { value: "36-45", label: "36-45" },
  { value: "46-55", label: "46-55" },
  { value: "56+", label: "56+" },
] as const

export const TTS_VOICES = [
  { value: "alloy", label: "Alloy" },
  { value: "echo", label: "Echo" },
  { value: "fable", label: "Fable" },
  { value: "onyx", label: "Onyx" },
  { value: "nova", label: "Nova" },
  { value: "shimmer", label: "Shimmer" },
] as const

export const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const

export const ASPECT_RATIOS = ["1:1", "16:9", "4:3", "3:2", "9:16"] as const

// Node type metadata
export const NODE_TYPES: Record<NodeType, { label: string; description: string }> = {
  start: { label: "开始", description: "工作流入口" },
  end: { label: "结束", description: "工作流输出" },
  prompt: { label: "Prompt", description: "文本模板" },
  textModel: { label: "文本模型", description: "LLM 生成" },
  imageGeneration: { label: "图像", description: "图像生成" },
  conditional: { label: "条件", description: "分支逻辑" },
  javascript: { label: "JavaScript", description: "自定义代码" },
  httpRequest: { label: "HTTP", description: "API 请求" },
  embeddingModel: { label: "嵌入", description: "向量 Embedding" },
  tool: { label: "工具", description: "自定义函数" },
  audio: { label: "音频", description: "文本转语音" },
  structuredOutput: { label: "结构化", description: "Schema 输出" },
  memory: { label: "记忆", description: "持久化存储" },
  ugcModel: { label: "UGC 模特", description: "AI 达人模型" },
  productUpload: { label: "产品", description: "产品图像上传" },
  script: { label: "脚本", description: "视频对白" },
  videoGeneration: { label: "视频", description: "视频生成" },
}

// Workflow templates
export const WORKFLOW_TEMPLATES = [
  {
    id: "ugc-video-generation",
    name: "UGC 视频生成",
    description: "使用 AI 模型生成 UGC 产品视频",
    nodes: [
      { id: "1", type: "start", position: { x: 50, y: 300 }, data: {} },
      {
        id: "2",
        type: "ugcModel",
        position: { x: 300, y: 150 },
        data: { ethnicity: "caucasian", gender: "female", ageRange: "26-35", description: "", isLocked: false },
      },
      {
        id: "3",
        type: "productUpload",
        position: { x: 300, y: 350 },
        data: { productImage: undefined, productName: "" },
      },
      {
        id: "4",
        type: "script",
        position: { x: 300, y: 520 },
        data: { script: "大家好！我刚拿到这个很棒的产品，必须和你们分享一下..." },
      },
      {
        id: "5",
        type: "imageGeneration",
        position: { x: 620, y: 250 },
        data: { model: "fal-ai/flux-2-pro/edit", aspectRatio: "9:16" },
      },
      {
        id: "6",
        type: "videoGeneration",
        position: { x: 950, y: 300 },
        data: { model: "fal-ai/veo-3.1", aspectRatio: "9:16", duration: "8s" },
      },
      { id: "7", type: "end", position: { x: 1280, y: 300 }, data: {} },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e1-4", source: "1", target: "4" },
      { id: "e2-5", source: "2", target: "5" },
      { id: "e3-5", source: "3", target: "5" },
      { id: "e5-6", source: "5", target: "6", targetHandle: "model-input" },
      { id: "e3-6", source: "3", target: "6", targetHandle: "product-input" },
      { id: "e4-6", source: "4", target: "6", targetHandle: "script-input" },
      { id: "e6-7", source: "6", target: "7" },
    ],
  },
] as const

export type WorkflowTemplate = (typeof WORKFLOW_TEMPLATES)[number]

// Local storage key
export const STORAGE_KEY = "ai-agent-builder-workflow"

// Version for workflow compatibility
export const WORKFLOW_VERSION = "1.0.0"
