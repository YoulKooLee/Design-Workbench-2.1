import React from "react"
import { motion } from "motion/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

const faqs = [
  {
    question: "报名费用包含哪些项目？",
    answer:
      "基础套餐通常包含建档、理论指导、科二科三标准课时和约考协助。考试费、体检费或补训费会单独列明，咨询时会给你完整费用清单。",
  },
  {
    question: "上班族可以晚上或周末练车吗？",
    answer:
      "可以。我们提供晚间班和周末班，报名时会记录你的可用时间，并优先匹配对应训练场和教练。",
  },
  {
    question: "零基础会不会跟不上？",
    answer:
      "不会。第一阶段会从车辆基础、起步停车、方向控制和安全观察开始，确认车感稳定后再进入科目训练。",
  },
  {
    question: "可以指定教练吗？",
    answer:
      "可根据教练时间和训练点安排尽量匹配。如果你已有熟悉教练，也可以在咨询时说明。",
  },
  {
    question: "如果考试没过怎么办？",
    answer:
      "教练会根据考试扣分项做复盘，并给出补训计划。补训课时和费用会提前确认，不做临时加价。",
  },
  {
    question: "从报名到拿证一般多久？",
    answer:
      "周期会受个人时间、考试名额和训练进度影响。报名咨询时会根据你的可练车时间，给出更贴近实际的排课和考试节奏。",
  },
]

export function FAQSection() {
  return (
    <section className="py-20" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-sm text-muted-foreground">常见问题</div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-5 text-center">
            学车前常见问题
          </h2>
          <p className="text-center mt-5 text-muted-foreground">费用、排课、考试和补训，先问清楚再报名。</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-display text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
