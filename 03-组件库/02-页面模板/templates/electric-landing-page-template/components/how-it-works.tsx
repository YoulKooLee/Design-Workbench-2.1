import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Upload, Sparkles, MessageSquare } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "连接",
    description: "导入知识库、FAQ 和历史工单，让 Electric 快速理解你的业务。",
  },
  {
    icon: Sparkles,
    title: "训练",
    description: "AI 会自动根据品牌语气和支持政策定制回复。",
  },
  {
    icon: MessageSquare,
    title: "部署",
    description: "上线到聊天、邮件和社交渠道。AI 7x24 小时处理咨询，你专注增长。",
  },
]

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-display mb-4">
            <span className="text-gradient-lime">工作</span>方式
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">从配置到上线客服，只需三个步骤</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="relative inline-block mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-primary text-background flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
