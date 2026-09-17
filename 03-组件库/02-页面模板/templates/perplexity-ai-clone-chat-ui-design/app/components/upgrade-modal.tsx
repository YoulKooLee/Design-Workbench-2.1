import React, { useState } from "react"
import { Button } from "../../components/ui/button"
import { X, Check } from "lucide-react"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"personal" | "education" | "business">("personal")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background animate-in fade-in duration-300 overflow-y-auto">
      {/* Close button - top right */}
      <button
        onClick={onClose}
        className="fixed right-6 top-6 text-muted-foreground hover:text-foreground transition-colors z-10"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl">
          {/* Plan Type Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedPlan("personal")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPlan === "personal"
                  ? "bg-primary/10 text-primary border border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              个人
            </button>
            <button
              onClick={() => setSelectedPlan("education")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPlan === "education"
                  ? "bg-primary/10 text-primary border border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              教育
            </button>
            <button
              onClick={() => setSelectedPlan("business")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPlan === "business"
                  ? "bg-primary/10 text-primary border border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              企业
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Pro Plan */}
            <div className="border border-border rounded-xl p-8 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Pro</h3>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">热门</span>
              </div>

              <div className="mb-2">
                <span className="text-3xl font-bold">$17</span>
                <span className="text-sm text-muted-foreground"> USD / 月</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">按年计费，或等值金额</p>

              <p className="text-sm text-muted-foreground mb-6">
                通过更高额度提升工作和学习效率。
              </p>

              <Button variant="secondary" disabled className="w-full mb-6">
                当前方案
              </Button>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>回答中的引用数量提升至 10 倍</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>一个订阅即可使用最新 AI 模型，包括 GPT-5.2 和 Claude Sonnet 4.5</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>使用 Perplexity 文件和应用创建能力</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>每日文件上传额度提升至 10 倍</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>更高额度使用 Perplexity 深度研究</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>更高额度使用图像生成</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>有限使用视频生成</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>专享 Pro Perks 和更多权益</span>
                </li>
              </ul>

              <p className="text-xs text-muted-foreground mt-6">
                已是订阅用户？查看{" "}
                <a href="#" className="text-foreground underline">
                  账单帮助
                </a>
              </p>
            </div>

            {/* Max Plan */}
            <div className="border border-border rounded-xl p-8 bg-card">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Max</h3>
              </div>

              <div className="mb-2">
                <span className="text-3xl font-bold">$167</span>
                <span className="text-sm text-muted-foreground"> USD / 月</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">按年计费，或等值金额</p>

              <p className="text-sm text-muted-foreground mb-6">
                解锁 Perplexity 完整能力，并提前体验新产品。
              </p>

              <Button className="w-full mb-6 bg-primary hover:bg-primary/90">升级到 Max</Button>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>包含 Pro 的全部权益</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>无限使用 OpenAI 和 Anthropic 的高级 AI 模型，例如 Opus 4.5</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>提前体验最新产品</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>每日文件上传额度提升至 100 倍</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>无限使用 Perplexity 文件和应用创建能力</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>无限使用 Perplexity 深度研究</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>增强版视频生成额度</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>优先支持</span>
                </li>
              </ul>

              <p className="text-xs text-muted-foreground mt-6">
                仅限个人使用，并受以下条款约束：{" "}
                <a href="#" className="text-foreground underline">
                  政策
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
