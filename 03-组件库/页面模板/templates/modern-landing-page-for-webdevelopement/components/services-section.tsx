import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Layout, Palette, Code, Share2, Target, Search } from "lucide-react"

const services = [
  {
    icon: Layout,
    title: "网页设计",
    description:
      "我们设计的网站不仅视觉出色，也兼具功能性与易用性。MSwebdesign 会以你的品牌为核心，确保线上形象贴合企业目标与价值。",
  },
  {
    icon: Palette,
    title: "平面设计",
    description:
      "从 Logo 到社交媒体帖子，我们提供能强化品牌的创意视觉设计。作品独特且专业，帮助你给目标受众留下正确印象。",
  },
  {
    icon: Code,
    title: "网站开发",
    description:
      "我们构建技术稳健、面向未来的网站。团队确保网站可靠、可扩展且快速，帮助企业实现数字化增长并呈现专业形象。",
  },
  {
    icon: Share2,
    title: "社交媒体",
    description:
      "稳定的社交媒体存在会带来差异。我们通过有吸引力的视觉和有效策略帮助品牌持续可见、保持互动。",
  },
  {
    icon: Target,
    title: "结果导向",
    description:
      "MSwebdesign 追求真实成效。我们的流程始终面向可衡量结果，帮助业务增长，并一起判断真正有效的做法。",
  },
  {
    icon: Search,
    title: "SEO",
    description:
      "可发现性至关重要。我们用最新 SEO 技术优化网站，让你在 Google 中获得更高排名，更容易被目标客户找到。",
  },
]

export function ServicesSection() {
  return (
    <section id="diensten" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-pulse" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mx-auto block w-fit">
          ✨ 我们的专长
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          我们<span className="text-primary">真正擅长</span>的事
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed text-lg">
          从概念到上线，我们把你的数字化愿景转化为能产生结果的线上解决方案。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-background/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
