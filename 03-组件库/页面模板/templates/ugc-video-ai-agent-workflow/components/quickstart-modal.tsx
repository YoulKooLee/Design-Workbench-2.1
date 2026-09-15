import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog"
import { Button } from "./ui/button"
import {
  Upload,
  User,
  FileText,
  ImageIcon,
  Video,
  ArrowRight,
  Cable,
  Play,
  Download,
  Workflow,
  type LucideIcon,
} from "lucide-react"

const QUICKSTART_KEY = "ugc-quickstart-seen"

interface Step {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  tips: string[]
}

const STEPS: Step[] = [
  {
    icon: Upload,
    title: "上传产品",
    subtitle: "产品上传节点（Product Upload）",
    description:
      "将产品上传节点拖到画布上。点击节点上传产品图像（PNG/JPG）并填写产品名称。这张图会作为 AI 创作者手持产品的参考。",
    tips: [
      "使用背景干净、光线充足的产品照片",
      "方形或竖版裁剪更适合竖屏视频",
    ],
  },
  {
    icon: User,
    title: "配置 AI 创作者",
    subtitle: "UGC 模特节点（UGC Model）",
    description:
      "添加 UGC 模特节点并配置 AI 人设。选择性别、族裔和年龄段，使其匹配目标受众，也可以补充描述以控制更具体的外观。",
    tips: [
      "让创作者人设匹配品牌目标人群",
      "描述字段可补充发色、服装等细节",
    ],
  },
  {
    icon: FileText,
    title: "编写脚本",
    subtitle: "脚本节点（Script）",
    description:
      "添加脚本节点，写下 AI 创作者在镜头前要说的短对白。字符计数会帮助你控制在视频时长限制内。",
    tips: [
      "8 秒视频建议脚本控制在 120 字符以内",
      "表达自然一点，口语化语气会更真实",
    ],
  },
  {
    icon: ImageIcon,
    title: "生成图像",
    subtitle: "图像生成节点（Image Generation，Flux Edit）",
    description:
      "添加图像生成节点。它使用 Flux Edit 模型将产品合成到 AI 创作者手中，生成拟真的静帧。",
    tips: [
      "Flux 2 Pro Edit 可获得最高质量结果",
      "生成图会成为视频的第一帧",
    ],
  },
  {
    icon: Cable,
    title: "连接节点",
    subtitle: "在连接点之间拖拽连线",
    description:
      "从输出连接点拖到输入连接点，把节点串起来。产品上传和 UGC 模特会输入到图像生成，脚本和生成图会输入到视频生成。",
    tips: [
      "可以从模板菜单选择模板，自动连接完整流程",
      "不同颜色的连接点表示兼容的连接类型",
    ],
  },
  {
    icon: Video,
    title: "生成视频",
    subtitle: "视频生成节点（Video Generation，Veo 3.1）",
    description:
      "添加视频生成节点。Veo 3.1 会根据脚本把静帧转成 UGC 视频，包含自然口型、头部动作和手势。",
    tips: [
      "9:16 竖屏适合 Reels、TikTok 和 Shorts",
      "8 秒时长兼顾质量与生成速度",
    ],
  },
  {
    icon: Play,
    title: "运行工作流",
    subtitle: "点击运行按钮",
    description:
      "点击顶部运行按钮，工作流会逐节点执行。节点完成时会变绿，右侧执行面板会显示实时进度和日志。",
    tips: [
      "图像生成约需 15 到 30 秒，视频生成约需 1 到 3 分钟",
      "如果节点失败，查看错误信息后可从该节点重新运行",
    ],
  },
  {
    icon: Download,
    title: "预览与下载",
    subtitle: "在每个节点查看结果",
    description:
      "完成后，生成图会显示在图像节点，最终视频会在视频节点播放。点击输出可全尺寸预览，也可以用导出代码功能获取可投产的 API 代码。",
    tips: [
      "右键视频即可直接保存",
      "导出代码会生成可部署的 Next.js API route",
    ],
  },
]

export function QuickstartModal() {
  const [open, setOpen] = useState(true)
  const [step, setStep] = useState(0)

  const handleClose = () => {
    setOpen(false)
    sessionStorage.setItem(QUICKSTART_KEY, "true")
  }

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      handleClose()
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const current = STEPS[step]
  const Icon = current.icon
  const isLast = step === STEPS.length - 1

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose() }}>
      <DialogContent className="sm:max-w-xl gap-0 p-0 overflow-hidden" showCloseButton={false}>
        {/* Header */}
        <DialogHeader className="px-7 pt-7 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
              <Workflow className="h-4.5 w-4.5 text-foreground" />
            </div>
            <div>
              <DialogTitle className="text-lg">工作方式</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                用 {STEPS.length} 步构建 UGC 产品视频
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Step progress bar */}
        <div className="flex gap-1.5 px-7 pb-5">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i === step
                  ? "bg-foreground"
                  : i < step
                    ? "bg-foreground/25"
                    : "bg-border"
              }`}
              aria-label={`跳转到第 ${i + 1} 步`}
            />
          ))}
        </div>

        {/* Active step content */}
        <div className="px-7 pb-6">
          <div className="rounded-xl border border-border bg-secondary/40 p-5">
            {/* Step number + title row */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-foreground text-background text-sm font-bold">
                {step + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-base font-semibold text-foreground">{current.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{current.subtitle}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {current.description}
            </p>

            {/* Tips */}
            {current.tips.length > 0 && (
              <div className="mt-3.5 flex flex-col gap-1.5">
                {current.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground/80">
                    <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                    <span className="leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mini flow preview */}
          <div className="mt-5 flex items-center justify-center gap-1.5 overflow-x-auto py-1">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon
              return (
                <div key={i} className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setStep(i)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all duration-200 ${
                      i === step
                        ? "border-foreground bg-foreground text-background scale-110"
                        : i < step
                          ? "border-foreground/20 bg-foreground/10 text-foreground/50"
                          : "border-border bg-card text-muted-foreground"
                    }`}
                    aria-label={s.title}
                  >
                    <StepIcon className="h-3.5 w-3.5" />
                  </button>
                  {i < STEPS.length - 1 && (
                    <ArrowRight
                      className={`h-3 w-3 shrink-0 ${
                        i < step ? "text-foreground/20" : "text-border"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-border px-7 py-4 bg-secondary/20">
          <div className="flex w-full items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground h-9"
              onClick={handleClose}
            >
              跳过引导
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground tabular-nums mr-1">
                {step + 1} / {STEPS.length}
              </span>
              {step > 0 && (
                <Button variant="outline" size="sm" className="text-sm h-9 px-3.5" onClick={handleBack}>
                  上一步
                </Button>
              )}
              <Button size="sm" className="text-sm h-9 px-5" onClick={handleNext}>
                {isLast ? "开始构建" : "下一步"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
