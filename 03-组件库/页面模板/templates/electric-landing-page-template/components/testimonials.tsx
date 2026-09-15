import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Star } from "lucide-react"
import professionalManHeadshot from "../public/professional-man-headshot.png"
import professionalWomanExecutiveHeadshot from "../public/professional-woman-executive-headshot.png"
import professionalWomanHeadshot from "../public/professional-woman-headshot.png"

const testimonials = [
  {
    quote:
      "Electric 让我们的客服工单量下降了 70%。团队现在专注复杂问题，其余由 AI 处理。",
    author: "Sarah Chen",
    role: "客服负责人",
    company: "TechFlow",
    avatar: professionalWomanHeadshot,
  },
  {
    quote: "响应时间从数小时缩短到数秒，客户满意度达到了新高。",
    author: "Marcus Williams",
    role: "客户成功总监",
    company: "Studio Nine",
    avatar: professionalManHeadshot,
  },
  {
    quote: "终于可以获得 7x24 小时支持，又不必承担全天候人力成本。Electric 第一个月就收回成本。",
    author: "Emily Rodriguez",
    role: "运营副总裁",
    company: "Launchpad",
    avatar: professionalWomanExecutiveHeadshot,
  },
]

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-display mb-4">
            深受<span className="text-gradient-lime">客服团队</span>喜爱
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">加入已经使用 Electric 的数千个团队</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 sm:p-6 rounded-xl border border-border bg-card/50"
            >
              <div className="flex gap-1 mb-3 sm:mb-4" aria-label="5 星评分">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-primary text-primary" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-sm sm:text-base text-foreground mb-4 sm:mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt=""
                  aria-hidden="true"
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-full object-cover bg-muted"
                />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
