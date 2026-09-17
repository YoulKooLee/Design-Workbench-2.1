import React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card } from "./ui/card"
import { ShinyButton } from "./ui/shiny-button"

const pricingTiers = [
  {
    name: "C1 普通班",
    price: "¥3980",
    period: "起",
    description: "适合想学习手动挡、时间相对规律的学员",
    features: [
      "C1 手动挡训练",
      "基础理论课程",
      "科二科三标准课时",
      "约课提醒",
      "考试流程协助",
      "费用明细公开",
    ],
    cta: "咨询 C1 班",
    popular: false,
  },
  {
    name: "C2 轻松班",
    price: "¥4280",
    period: "起",
    description: "适合自动挡学员，练车节奏更轻松",
    features: [
      "C2 自动挡训练",
      "晚间与周末可约",
      "一对一教练跟进",
      "训练进度记录",
      "考前模拟路线",
      "考试预约提醒",
      "补弱点训练建议",
      "学员服务群",
    ],
    cta: "预约 C2 试学",
    popular: true,
  },
  {
    name: "强化补训",
    price: "按课时",
    period: "",
    description: "适合挂科复盘、考前冲刺和长期未练学员",
    features: [
      "科二专项训练",
      "科三路线模拟",
      "挂科原因复盘",
      "考试心态辅导",
      "按小时灵活购买",
      "可指定教练",
      "可指定训练点",
      "考前集中排课",
      "补训费用透明",
    ],
    cta: "定制补训",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">价格提前说清楚</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            按车型和训练需求选择套餐。报名费、考试费和补训费分项说明，咨询时即可确认。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`relative p-8 h-full flex flex-col ${
                  tier.popular ? "border-primary shadow-lg shadow-primary/20" : "border-border"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      最受欢迎
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">{tier.price}</span>
                    {tier.period && <span className="text-muted-foreground ml-2">{tier.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ShinyButton className="w-full justify-center">{tier.cta}</ShinyButton>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
