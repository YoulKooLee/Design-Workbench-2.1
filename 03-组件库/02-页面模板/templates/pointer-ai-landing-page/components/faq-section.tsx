import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "Pointer 是什么，适合谁使用？",
    answer:
      "Pointer 是面向开发者、团队和组织的 AI 开发平台，用来加速编码工作流。它适合想提升效率的个人开发者，也适合需要顺畅协作工具的团队。",
  },
  {
    question: "Pointer 的 AI 代码审查如何工作？",
    answer:
      "AI 会实时分析你的代码，给出智能改进建议，发现潜在 bug，并帮助保持最佳实践。它会学习你的编码习惯并适配团队标准，让代码审查更快、更一致。",
  },
  {
    question: "Pointer 能接入我现有的工具吗？",
    answer:
      "可以。Pointer 支持一键接入 GitHub、GitLab、VS Code、Slack 等常用开发工具。MCP 连接能力可以帮助你在整个开发栈中管理和配置 server 访问。",
  },
  {
    question: "免费方案包含什么？",
    answer:
      "免费方案包含实时代码建议、基础集成、单个 MCP server 连接、最多 2 个 AI coding agents，以及带 Pointer 品牌标识的 Vercel 部署。非常适合个人开发者上手。",
  },
  {
    question: "并行 coding agents 如何工作？",
    answer:
      "并行 coding agents 可以同时处理代码库的不同部分，比传统单线程方式更快解决复杂问题。你可以启动多个 agents 并发处理 bug 修复、功能开发、代码优化等任务。",
  },
  {
    question: "我的代码在 Pointer 中安全吗？",
    answer:
      "安全。Pointer 使用企业级安全措施，包括端到端加密、安全传输和行业标准合规。未经明确许可，你的代码不会离开安全环境；企业客户也可选择本地部署。",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground-dark transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="w-full max-w-[435px] text-center text-foreground text-4xl font-semibold leading-10 break-words">
            常见问题
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
            了解 Pointer 如何改变你的开发工作流
          </p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}
