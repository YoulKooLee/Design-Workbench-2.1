import React, { useEffect, useRef } from "react"
import { Card, CardContent } from "./ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "快速而有效！我想要一个能准确呈现公司气质的 Logo，MSwebdesign 没有让我失望。:)",
    name: "Patrick",
    role: "创业者",
  },
  {
    quote:
      "我们想为基金会彻底更新旧网站，并自动化许多手动任务。MSwebdesign 为我们做出了漂亮的定制产品，让很多工作不再需要人工处理。",
    name: "Mehmet",
    role: "非营利基金会主席",
  },
  {
    quote:
      "我希望新公司有一个清爽漂亮的网站，能像名片一样展示业务。现在网站不仅美观快速，也能在 Google 上被更好地找到，真的很棒。",
    name: "Youri",
    role: "创业者",
  },
]

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollPosition += scrollSpeed

      if (scrollContainer.scrollWidth && scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          客户如何评价我们
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
          我们始终把质量放在首位，也坚持尽可能透明的沟通，让客户清楚每一步进展。
        </p>

        <div className="relative">
          <div ref={scrollRef} className="flex gap-6 overflow-x-hidden" style={{ scrollBehavior: "auto" }}>
            {/* 复制一组评价，让横向滚动更顺畅。 */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card key={index} className="flex-shrink-0 w-[90vw] sm:w-[450px] border-none shadow-lg">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-base sm:text-lg mb-6 leading-relaxed text-pretty min-h-[120px]">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
