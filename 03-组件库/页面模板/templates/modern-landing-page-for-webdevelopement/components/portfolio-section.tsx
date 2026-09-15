import React from 'react'
import { Card, CardContent } from "./ui/card"
import { ExternalLink } from "lucide-react"
import { Button } from "./ui/button"
import omgekeerdeStemwijzerImage from "../public/omgekeerdestemwijzer-banner.png?url"
import autopoetsbedrijfImage from "../public/autopoetsbedrijf-tahsin-project.png?url"
import canUitzendbureauImage from "../public/can-uitzendbureau-project.png?url"
import muratSahinImage from "../public/murat-sahin-portfolio.png?url"

const projects = [
  {
    title: "De Omgekeerde Stemwijzer",
    category: "AI/ML 与网站开发",
    image: omgekeerdeStemwijzerImage,
    description:
      "面向 2025 年荷兰众议院选举的 AI 应用。用户可询问政党立场，并通过 RAG 技术从官方党纲中获得事实回答。",
    url: "https://de-omgekeerde-stemwijzer.onrender.com/",
    tags: ["Next.js", "AI/ML", "RAG", "TypeScript"],
  },
  {
    title: "Autopoetsbedrijf Tahsin",
    category: "网页设计与开发",
    image: autopoetsbedrijfImage,
    description:
      "为拥有 20 多年经验的汽车美容公司打造专业网站。用现代响应式设计完整呈现服务、洗车场和车库能力。",
    url: "https://www.autopoetsbedrijftahsin.nl/",
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "CAN Uitzendbureau",
    category: "网站开发",
    image: canUitzendbureauImage,
    description:
      "为海牙地区拥有 30 年园艺行业经验的招聘机构打造网站，清晰展示服务，并为雇主和求职者提供直接联系入口。",
    url: "https://canbv.nl/",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    title: "Murat Sahin 作品集",
    category: "作品集网站",
    image: muratSahinImage,
    description:
      "为全栈开发者打造的专业作品集网站，用现代、利落的暗色界面展示项目、技能与经验。",
    url: "https://murat-sahin-dev.vercel.app/",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", ".NET Core"],
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">我们的作品集</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            查看近期项目精选，了解我们如何用有力的数字化方案帮助企业成长。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    onClick={() => window.open(project.url, "_blank")}
                  >
                    查看项目 <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">{project.category}</p>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
