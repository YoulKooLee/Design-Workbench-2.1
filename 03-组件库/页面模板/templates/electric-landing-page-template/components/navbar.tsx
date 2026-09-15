import React, { useState, useEffect } from "react"
import Link from "./prototype-link"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu"
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  MessageSquare,
  Sparkles,
  Layers,
  Wand2,
  Bot,
  BarChart3,
  Megaphone,
  Zap,
  Lock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "#features", label: "功能" },
  { href: "#pricing", label: "定价" },
  { href: "#docs", label: "文档" },
]

const workflowItems = [
  { href: "#workflows/chat-support", label: "聊天客服", icon: MessageSquare },
  { href: "#workflows/ticket-routing", label: "工单路由", icon: Sparkles },
  { href: "#workflows/multi-channel", label: "多渠道", icon: Layers },
  { href: "#workflows/custom-agents", label: "自定义 Agent", icon: Wand2 },
]

const toolsMenu = {
  free: [
    {
      category: "聊天",
      items: [
        { href: "#tools/free/chat-widget", label: "聊天组件", icon: MessageSquare },
        { href: "#tools/free/response-templates", label: "回复模板", icon: Bot },
      ],
    },
    {
      category: "分析",
      items: [
        { href: "#tools/free/basic-analytics", label: "基础分析", icon: BarChart3 },
        { href: "#tools/free/satisfaction-surveys", label: "满意度调查", icon: BarChart3 },
      ],
    },
  ],
  paid: [
    {
      category: "AI Agent",
      items: [
        { href: "#tools/paid/ai-agent-builder", label: "AI Agent 构建器", icon: Bot },
        { href: "#tools/paid/intent-detection", label: "意图识别", icon: Sparkles },
      ],
    },
    {
      category: "自动化",
      items: [
        { href: "#tools/paid/workflow-automation", label: "工作流自动化", icon: Zap },
        { href: "#tools/paid/smart-escalation", label: "智能升级", icon: Zap },
      ],
    },
    {
      category: "营销活动",
      items: [
        { href: "#tools/paid/proactive-chat", label: "主动聊天", icon: Megaphone },
        { href: "#tools/paid/targeted-messages", label: "定向消息", icon: Megaphone },
      ],
    },
    {
      category: "洞察",
      items: [
        { href: "#tools/paid/sentiment-analysis", label: "情绪分析", icon: BarChart3 },
        { href: "#tools/paid/conversation-insights", label: "对话洞察", icon: BarChart3 },
      ],
    },
  ],
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-6xl px-2 sm:px-4 lg:px-8 py-4" aria-label="主导航">
        <div className="flex h-14 items-center justify-between bg-background/60 backdrop-blur-xl border border-border/50 rounded-full px-4 sm:px-6">
          <Link href="#top" className="flex items-center gap-2" aria-label="Electric 首页">
            <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-primary" aria-hidden="true" />
            <span
              className="font-[family-name:var(--font-pt-mono)] font-bold text-base sm:text-lg text-foreground"
              style={{ letterSpacing: "-0.05em" }}
            >
              Electric
            </span>
          </Link>

          {/* Desktop Navigation - hidden below lg */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors outline-none">
                工具
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[480px] max-w-[calc(100vw-2rem)] bg-card/95 backdrop-blur-xl border-border p-4"
              >
                <div className="grid grid-cols-2 gap-6">
                  {/* Free Tools Column */}
                  <div>
                    <DropdownMenuLabel className="flex items-center gap-2 text-primary font-semibold mb-2">
                      免费工具
                    </DropdownMenuLabel>
                    {toolsMenu.free.map((cat) => (
                      <div key={cat.category} className="mb-3">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 px-2">
                          {cat.category}
                        </div>
                        {cat.items.map((item) => (
                          <DropdownMenuItem key={item.href} asChild className="group">
                            <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                              <item.icon
                                className="w-4 h-4 text-primary group-data-[highlighted]:text-black transition-colors"
                                aria-hidden="true"
                              />
                              {item.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Paid Tools Column */}
                  <div>
                    <DropdownMenuLabel className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      Pro 工具
                    </DropdownMenuLabel>
                    {toolsMenu.paid.map((cat) => (
                      <div key={cat.category} className="mb-3">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 px-2">
                          {cat.category}
                        </div>
                        {cat.items.map((item) => (
                          <DropdownMenuItem key={item.href} asChild className="group">
                            <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                              <item.icon
                                className="w-4 h-4 text-primary group-data-[highlighted]:text-black transition-colors"
                                aria-hidden="true"
                              />
                              {item.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 工作流 Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors outline-none">
                工作流
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-card/95 backdrop-blur-xl border-border">
                {workflowItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="group">
                    <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                      <item.icon
                        className="w-4 h-4 text-primary group-data-[highlighted]:text-black transition-colors"
                        aria-hidden="true"
                      />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons - hidden below lg */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" rounded="full">
              登录
            </Button>
            <Button size="sm" rounded="full" className="gap-1.5">
              开始使用
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
          </div>

          {/* Mobile Menu Button - visible below lg */}
          <button
            type="button"
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu - visible below lg */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-0 left-0 w-dvw h-dvh bg-background z-40 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="移动端导航菜单"
            >
              <div className="flex items-center justify-between px-6 py-4 bg-background border-b border-border/50">
                <Link href="#top" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <Zap className="w-5 h-5 text-primary" aria-hidden="true" />
                  <span
                    className="font-[family-name:var(--font-pt-mono)] font-bold text-base text-foreground"
                    style={{ letterSpacing: "-0.05em" }}
                  >
                    Electric
                  </span>
                </Link>
                <button
                  type="button"
                  className="p-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="关闭菜单"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
                {/* Tools Section */}
                <div className="px-4 py-2 text-xs font-medium text-primary uppercase tracking-wider">免费工具</div>
                {toolsMenu.free.map((cat) => (
                  <div key={cat.category}>
                    <div className="px-4 py-1 text-xs text-muted-foreground">{cat.category}</div>
                    {cat.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-2 px-4 py-3 text-base text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-foreground/10"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon
                          className="w-5 h-5 text-primary group-hover:text-black transition-colors"
                          aria-hidden="true"
                        />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="px-4 py-2 text-xs font-medium text-primary uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-3 h-3" aria-hidden="true" />
                  Pro 工具
                </div>
                {toolsMenu.paid.map((cat) => (
                  <div key={cat.category}>
                    <div className="px-4 py-1 text-xs text-muted-foreground">{cat.category}</div>
                    {cat.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-2 px-4 py-3 text-base text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-foreground/10"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon
                          className="w-5 h-5 text-primary group-hover:text-black transition-colors"
                          aria-hidden="true"
                        />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="border-t border-border/50 my-3" />
                {/* 工作流 Section */}
                <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  工作流
                </div>
                {workflowItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-2 px-4 py-3 text-base text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-foreground/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon
                      className="w-5 h-5 text-primary group-hover:text-black transition-colors"
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-border/50 my-3" />
                {/* Nav Links Section */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-base text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-foreground/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-border/50 bg-background flex flex-col gap-3">
                <Button variant="ghost" rounded="lg" className="justify-center text-base py-6 w-full">
                  登录
                </Button>
                <Button rounded="full" className="py-6 text-base w-full">
                  开始使用
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
