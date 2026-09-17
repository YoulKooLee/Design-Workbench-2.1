import React from "react"
import { Card } from "./ui/card"
import { Zap, Shield, BarChart3, Workflow, Globe, Lock } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "灵活约课",
      description: "早晚班、周末班都能安排，按你的可用时间匹配训练场和教练。",
    },
    {
      icon: Shield,
      title: "正规资质",
      description: "训练车辆、教练资质和收费项目公开透明，报名前就能看清楚。",
    },
    {
      icon: BarChart3,
      title: "进度跟踪",
      description: "每次练车后记录薄弱点，科二、科三训练目标一目了然。",
    },
    {
      icon: Workflow,
      title: "一对一带教",
      description: "从方向盘手感到考试细节，教练按你的掌握程度调整节奏。",
    },
    {
      icon: Globe,
      title: "就近练车",
      description: "城区多训练点可选，减少路上折腾，把时间留给真正练习。",
    },
    {
      icon: Lock,
      title: "费用透明",
      description: "学费、考试费、补训费分项说明，拒绝报名后临时加价。",
    },
  ]

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32" id="features">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-balance font-display">
          从报名到拿证都有人跟进
        </h2>
        <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          把练车、约课、模拟考和考试提醒整理成清晰流程，新手也能稳步推进。
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors h-full">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-display">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
