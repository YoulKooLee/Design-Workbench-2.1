import React, { useState } from "react"
import { CalendarClock, Car, ChevronLeft, ChevronRight, GraduationCap, MapPinned } from "lucide-react"
import { Button } from "./ui/button"

const slides = [
  {
    id: 1,
    title: "上班族晚间班",
    description:
      "下班后练车，不占用工作日白天。教练提前确认场地和训练目标。",
    icon: CalendarClock,
    detail: "19:00-21:00",
  },
  {
    id: 2,
    title: "零基础安心班",
    description: "从座椅、后视镜、起步和停车开始，先建立安全感再进入科目训练。",
    icon: Car,
    detail: "1 对 1 起步课",
  },
  {
    id: 3,
    title: "学生假期班",
    description:
      "集中安排理论、科二和科三训练，适合寒暑假有固定空档的学员。",
    icon: GraduationCap,
    detail: "集中排课",
  },
  {
    id: 4,
    title: "考前强化班",
    description:
      "针对挂科点和紧张点复盘，安排模拟路线和考前节奏训练。",
    icon: MapPinned,
    detail: "真实路线模拟",
  },
]

export function FeaturesSlideshowSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Calculate which slides to show (current + next 1 or 2 depending on screen size)
  const getVisibleSlides = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(slides[(currentIndex + i) % slides.length])
    }
    return visible
  }

  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-balance max-w-2xl">
            按你的时间和基础选择班型
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full h-12 w-12 bg-muted hover:bg-muted/80"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full h-12 w-12 bg-muted hover:bg-muted/80"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleSlides().map((slide) => (
              <div key={slide.id} className="group">
                <div className="rounded-2xl overflow-hidden mb-6 bg-muted/50 border border-border h-[400px] p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <slide.icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{slide.detail}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 rounded-full bg-background overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-primary" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-24 rounded-xl bg-background/80 border border-border" />
                      <div className="h-24 rounded-xl bg-primary/10 border border-primary/20" />
                      <div className="h-24 rounded-xl bg-background/80 border border-border" />
                    </div>
                    <div className="rounded-xl bg-background/80 border border-border px-4 py-3 text-sm text-muted-foreground">
                      今日训练重点：方向控制、观察点位、考试节奏
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">{slide.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{slide.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`跳转到第 ${idx + 1} 张`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
