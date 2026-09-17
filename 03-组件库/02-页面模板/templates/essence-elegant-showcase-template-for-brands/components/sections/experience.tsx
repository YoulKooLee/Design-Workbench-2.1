import React, { useEffect, useRef, useState } from "react"
import { ImageReveal } from "../ui/image-reveal"

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      course: "开胃酒",
      timing: "抵达",
      title: "迎接",
      description: "夜晚从酒廊开始，一杯招牌鸡尾酒与精巧开胃小点，为你完成从外部世界进入料理宇宙的过渡。",
      details: ["季节鸡尾酒", "两款开胃小点", "餐前面包服务", "菜单介绍"]
    },
    {
      course: "前菜",
      timing: "第一幕", 
      title: "唤醒味蕾",
      description: "三至四道开场料理铺陈今晚的主题。轻盈而细腻的准备，勾起好奇，也为后续层次建立期待。",
      details: ["生食处理", "花园蔬菜", "海味表达", "间奏小品"]
    },
    {
      course: "主菜",
      timing: "核心",
      title: "体验峰值",
      description: "这是技法、食材与视野汇聚的中心段落。菜单在此抵达情绪与味觉的高点。",
      details: ["鱼或海鲜", "禽类或野味", "招牌烹制", "季节亮点"]
    },
    {
      course: "甜点",
      timing: "终章",
      title: "甜意沉思",
      description: "甜点以递进方式带来收束与回望。从预甜点到最后的小点，一段温柔的下行完成整晚叙事。",
      details: ["预甜点", "主甜点", "可选奶酪服务", "Petit fours 与 mignardises"]
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="experience"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-12 lg:gap-20">
          {/* Section Label */}
          <div className="lg:col-span-2">
            <div 
              className="flex items-center gap-4 lg:sticky lg:top-32"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">(03)</span>
              <div className="w-8 h-px bg-border" />
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">体验</span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-10">
            {/* Section Header */}
            <div className="mb-20 md:mb-32 max-w-3xl">
              <h2 
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-normal text-foreground mb-8 text-pretty"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionProperty: "all",
                transitionDuration: "0.8s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.1s"
              }}
              >
                一场由四个乐章编排的夜晚
              </h2>
              <p 
                className="text-lg text-muted-foreground leading-relaxed"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transitionProperty: "all",
                transitionDuration: "0.8s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.2s"
              }}
              >
                品鉴菜单由十二至十六道料理组成，约三小时徐徐展开。每一道都承接上一道，形成赞颂季节的叙事弧线。
              </p>
            </div>

            {/* Experience Image */}
            <div 
              className="relative aspect-[16/9] mb-20 md:mb-32 overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionProperty: "all",
                transitionDuration: "0.8s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.25s"
              }}
            >
              <ImageReveal
                src="/images/plating-1.jpg"
                alt="厨师精确摆盘招牌料理"
                className="object-cover"
                sizes="(max-width: 1400px) 100vw, 1400px"
                delay={250}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Experience Steps */}
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div 
                  key={step.course}
                  className="group border-t border-border"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transitionProperty: "all",
                    transitionDuration: "0.8s",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${0.3 + index * 0.1}s`
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                    className="w-full py-8 md:py-12 text-left"
                    aria-expanded={activeStep === index}
                  >
                    <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                      {/* Course Number & Name */}
                      <div className="md:col-span-3 flex items-center gap-4">
                        <span className="font-mono text-xs tracking-wider text-muted-foreground">
                          0{index + 1}
                        </span>
                        <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-300">
                          {step.course}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="md:col-span-6">
                        <h3 className="text-lg md:text-xl text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                          {step.title}
                        </h3>
                      </div>

                      {/* Timing & Toggle */}
                      <div className="md:col-span-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {step.timing}
                        </span>
                        <div className="w-6 h-6 flex items-center justify-center">
                          <span 
                            className="text-lg text-muted-foreground transition-transform duration-300"
                            style={{ transform: activeStep === index ? "rotate(45deg)" : "rotate(0)" }}
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-out"
                    style={{ 
                      maxHeight: activeStep === index ? "400px" : "0",
                      opacity: activeStep === index ? 1 : 0
                    }}
                  >
                    <div className="pb-12 md:pb-16 grid md:grid-cols-12 gap-8">
                      <div className="md:col-span-3" />
                      <div className="md:col-span-6 space-y-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                        <ul className="grid grid-cols-2 gap-3">
                          {step.details.map((detail) => (
                            <li key={detail} className="flex items-center gap-2 text-sm text-foreground/70">
                              <span className="w-1 h-1 bg-accent" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
