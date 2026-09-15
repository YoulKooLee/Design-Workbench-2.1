import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

const faqs = [
  {
    question: "我多久可以部署一个 AI 客服 Agent？",
    answer:
      "大多数团队可在 30 分钟内上线第一个 AI Agent。连接知识库、调整回复方式，然后部署即可，无需写代码。",
  },
  {
    question: "Electric 能和我现有工具集成吗？",
    answer:
      "可以。Electric 支持 Zendesk、Intercom、Freshdesk 等 helpdesk，也支持 Salesforce、HubSpot 等 CRM，并提供 REST API 用于自定义集成。",
  },
  {
    question: "AI 无法回答问题时会怎样？",
    answer:
      "Electric 会在需要时无缝升级给人工客服，并保留完整会话上下文。你可以按情绪、主题或客户等级自定义升级规则。",
  },
  {
    question: "Electric 如何从我的数据中学习？",
    answer:
      "Electric 会使用知识库、历史工单和 FAQ 训练定制模型，并通过客服修正和客户反馈持续优化。",
  },
  {
    question: "我的客户数据安全吗？",
    answer:
      "安全。Electric 通过 SOC 2 Type II 认证并符合 GDPR，所有数据在存储和传输中都会加密，我们不会用你的数据训练其他客户的模型。",
  },
]

export function FAQ() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-display mb-4">
            常见<span className="text-gradient-lime">问题</span>
          </h2>
          <p className="text-muted-foreground">你需要了解的 Electric 关键信息</p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-card/30"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
