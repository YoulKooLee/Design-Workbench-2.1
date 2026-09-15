import React from "react"
import { MessageSquare, Layers, Wrench, FileText, ImageIcon, Code, Play, Flag, GitBranch, Globe, User, Package, Video } from "lucide-react"

type NodeType = {
  type: string
  label: string
  icon: React.ReactNode
}

const nodeTypes: NodeType[] = [
  { type: "start", label: "开始", icon: <Play className="h-3.5 w-3.5" /> },
  { type: "prompt", label: "Prompt", icon: <FileText className="h-3.5 w-3.5" /> },
  { type: "textModel", label: "文本模型", icon: <MessageSquare className="h-3.5 w-3.5" /> },
  { type: "imageGeneration", label: "图像", icon: <ImageIcon className="h-3.5 w-3.5" /> },
  { type: "ugcModel", label: "UGC 模特", icon: <User className="h-3.5 w-3.5" /> },
  { type: "productUpload", label: "产品", icon: <Package className="h-3.5 w-3.5" /> },
  { type: "script", label: "脚本", icon: <FileText className="h-3.5 w-3.5" /> },
  { type: "videoGeneration", label: "视频", icon: <Video className="h-3.5 w-3.5" /> },
  { type: "httpRequest", label: "HTTP", icon: <Globe className="h-3.5 w-3.5" /> },
  { type: "conditional", label: "条件", icon: <GitBranch className="h-3.5 w-3.5" /> },
  { type: "javascript", label: "JavaScript", icon: <Code className="h-3.5 w-3.5" /> },
  { type: "embeddingModel", label: "嵌入", icon: <Layers className="h-3.5 w-3.5" /> },
  { type: "tool", label: "工具", icon: <Wrench className="h-3.5 w-3.5" /> },
  { type: "end", label: "结束", icon: <Flag className="h-3.5 w-3.5" /> },
]

type NodePaletteProps = {
  onAddNode: (type: string) => void
  onClose?: () => void
}

export function NodePalette({ onAddNode, onClose }: NodePaletteProps) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  const handleAddNode = (type: string) => {
    onAddNode(type)
    onClose?.()
  }

  return (
    <div className="w-44 rounded-lg border border-border bg-card p-2 shadow-lg">
      <div className="space-y-0.5">
        {nodeTypes.map((node) => (
          <button
            key={node.type}
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
            onClick={() => handleAddNode(node.type)}
            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-secondary"
          >
            <span className="text-muted-foreground">{node.icon}</span>
            {node.label}
          </button>
        ))}
      </div>
    </div>
  )
}
