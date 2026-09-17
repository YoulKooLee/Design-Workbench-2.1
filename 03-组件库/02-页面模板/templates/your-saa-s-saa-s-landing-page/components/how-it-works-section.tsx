import React from "react"
import { motion } from "framer-motion"
import { CreditCard, TrendingUp, Zap, Brain, Activity, CheckCircle2, ArrowUpRight, BarChart3 } from "lucide-react"
import { Card } from "./ui/card"

export function HowItWorksSection() {
  const steps = [
    {
      icon: CreditCard,
      title: "报名建档",
      description:
        "确认车型、班型和练车时间，工作人员帮你准备材料并建立学车档案。",
      visual: (
        <div className="h-[280px] flex items-center justify-center">
          <Card className="w-full p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">C2 自动挡班</p>
                    <p className="text-sm text-muted-foreground">周末 + 晚间可约</p>
                  </div>
                </div>
                <p className="font-bold text-lg">已建档</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">体检材料</span>
                  <span className="text-sm font-medium">已提交</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">首节课程</span>
                  <span className="text-sm font-medium">周六 10:00</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      icon: TrendingUp,
      title: "分阶段练车",
      description:
        "按科目拆解训练目标，先建立车感，再集中突破倒库、侧方、路考细节。",
      visual: (
        <div className="h-[280px] flex items-center justify-center">
          <Card className="w-full p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">训练进度</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <Activity className="w-3 h-3" />
                  <span>进行中</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">倒车入库</p>
                    <p className="text-xs text-muted-foreground">点位稳定，继续巩固</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">坡道定点</p>
                    <p className="text-xs text-muted-foreground">离合控制需再练 2 次</p>
                  </div>
                </div>

                
              </div>

              <div className="pt-2 border-t border-primary/10">
                <p className="text-xs text-muted-foreground">
                  本周已练： <span className="text-primary font-semibold">4.5 小时</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      icon: Zap,
      title: "模拟考冲刺",
      description:
        "考试前安排真实路线模拟，复盘失误点，确认节奏后再上考场。",
      visual: (
        <div className="h-[280px] flex items-center justify-center">
          <Card className="w-full p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">考前状态</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>稳定提升</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">科二通过率</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-primary rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">路线熟悉度</span>
                    <span className="font-semibold">8/10</span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-primary rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">考前完成度</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-primary rounded-full" />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-primary/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">成功率</p>
                  <p className="text-lg font-bold text-primary">92%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">预约响应</p>
                  <p className="text-lg font-bold text-primary">当天</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">学车流程</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            从报名到考试拆成清楚节点，每一步都知道该练什么、什么时候练。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="mb-6">{step.visual}</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-display">{step.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
