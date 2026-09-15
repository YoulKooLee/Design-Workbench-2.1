/**
 * @name TERRA 森林保护落地页
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React, { useEffect, useRef, useState } from "react"
import { PawPrint, Trees, Satellite, Menu, X, Youtube, Instagram, ChevronDown } from "lucide-react"
import "./style.css"

import { AnimatedText } from "./components/animated-text"
import { CustomDroneIcon } from "./components/drone-icon"
import { Button } from "./components/ui/button"
import { WorldMap } from "./components/world-map"
import { experiences } from "./lib/experience-data"
import type { Experience } from "./lib/experience-data"

import biodiversityTrackingImage from "./public/biodiversity-tracking.png"
import dashboardScreenshot from "./public/dashboard-screenshot.png"
import deforestationDetectImage from "./public/deforestation-detect.png"
import droneImage from "./public/drone.png"
import earthCtaImage from "./public/earth-cta.png"
import heroLandscapeImage from "./public/hero-landscape.png"
import logoFrame11 from "./public/logos/frame-11.png"
import logoFrame2 from "./public/logos/frame-2.png"
import logoFrame3 from "./public/logos/frame-3.png"
import logoFrame4 from "./public/logos/frame-4.png"
import logoFrame55 from "./public/logos/frame-55.png"
import logoFrame6 from "./public/logos/frame-6.png"
import logoFrame7 from "./public/logos/frame-7.png"
import logoFrame8 from "./public/logos/frame-8.png"
import placeholderSvg from "./public/placeholder.svg"
import realtimeSatelliteImage from "./public/real-time-satellite.png"

const partnerLogos = [
  logoFrame11,
  logoFrame55,
  logoFrame4,
  logoFrame6,
  logoFrame8,
  logoFrame2,
  logoFrame3,
  logoFrame7,
  logoFrame11,
  logoFrame55,
  logoFrame4,
  logoFrame6,
  logoFrame8,
  logoFrame2,
  logoFrame3,
  logoFrame7,
]

const featureImages = [droneImage, realtimeSatelliteImage, biodiversityTrackingImage, deforestationDetectImage]

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericStr = value.replace(/[^0-9.]/g, "")
          const targetNum = Number.parseFloat(numericStr)
          const unit = value.replace(/[0-9.]/g, "")

          let current = 0
          const increment = targetNum / 60
          const interval = setInterval(() => {
            current += increment
            if (current >= targetNum) {
              setDisplayValue(`${targetNum}${unit}`)
              clearInterval(interval)
            } else {
              setDisplayValue(`${current.toFixed(1)}${unit}`.replace(".0", ""))
            }
          }, 16)

          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="text-8xl" ref={ref}>
      {displayValue}
    </div>
  )
}

export default function TerraPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [imageFade, setImageFade] = useState(true)
  const [autoRotationKey, setAutoRotationKey] = useState(0)
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0)
  const [wordFade, setWordFade] = useState(true)
  const [dashboardScrollOffset, setDashboardScrollOffset] = useState(0)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const dynamicWords = ["森林", "自然", "动物", "生态系统", "生物多样性", "野生动物", "栖息地"]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false)
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % dynamicWords.length)
        setWordFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(wordInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (dashboardRef.current) {
        const dashboardRect = dashboardRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        const rotationStart = viewportHeight * 0.8
        const rotationEnd = viewportHeight * 0.2

        if (dashboardRect.top >= rotationStart) {
          setDashboardScrollOffset(0)
        } else if (dashboardRect.top <= rotationEnd) {
          setDashboardScrollOffset(15)
        } else {
          const scrollRange = rotationStart - rotationEnd
          const currentProgress = rotationStart - dashboardRect.top
          const rotationProgress = currentProgress / scrollRange
          const tiltAngle = rotationProgress * 15
          setDashboardScrollOffset(tiltAngle)
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const featuresCount = 4

    const interval = setInterval(() => {
      setImageFade(false)
      setTimeout(() => {
        setSelectedFeature((prev) => (prev + 1) % featuresCount)
        setImageFade(true)
      }, 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoRotationKey])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-[#0B0C0F] text-[#F2F3F5] overflow-x-hidden">
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-white/10 backdrop-blur-md bg-[#0B0C0F]/80 rounded-[16px]">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg md:text-xl font-semibold font-mono hover:text-pink-400 transition-colors duration-300"
            >
              TERRA
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("metrics")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                影响力
              </button>
              <button
                onClick={() => scrollToSection("map")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                项目
              </button>
              <button
                onClick={() => scrollToSection("narrative")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                技术
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                常见问题
              </button>
              <button
                onClick={() => scrollToSection("cta")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                加入我们
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors duration-300"
              aria-label="切换菜单"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0B0C0F]/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <button
              onClick={() => scrollToSection("metrics")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              影响力
            </button>
            <button
              onClick={() => scrollToSection("map")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              项目
            </button>
            <button
              onClick={() => scrollToSection("narrative")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              技术
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              常见问题
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              加入我们
            </button>
          </div>
        </div>
      )}

      <section
        ref={heroRef}
        className={`relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isLoaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
        style={{
          backgroundImage: `url(${heroLandscapeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url(${heroLandscapeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/70 to-transparent pointer-events-none" />

        <div
          className="max-w-[1120px] w-full mx-auto relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif text-[44px] leading-[1.1] md:text-[72px] md:leading-[1.05] font-medium mb-6 text-balance">
              <span
                className={`block stagger-reveal text-7xl font-light transition-all duration-500 md:text-8xl ${
                  wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                }`}
              >
                守护 <AnimatedText key={dynamicWordIndex} text={dynamicWords[dynamicWordIndex]} delay={0} />
              </span>
              <span className="block stagger-reveal text-7xl font-light md:text-8xl" style={{ animationDelay: "90ms" }}>
                以规模化方式
              </span>
            </h1>
            <p
              className="text-[#A7ABB3] text-base md:text-lg max-w-[520px] mx-auto mb-8 leading-relaxed stagger-reveal text-white"
              style={{ animationDelay: "180ms" }}
            >
              用 AI 进行实时森林监测。识别威胁、追踪生物多样性，为未来世代守护自然。
            </p>
            <div className="stagger-reveal" style={{ animationDelay: "270ms" }}>
              <Button className="glass-button px-8 py-6 text-base rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white">
                开始保护
              </Button>
            </div>
          </div>

          <div className="mt-12 md:mt-20 stagger-reveal" style={{ animationDelay: "360ms" }} ref={dashboardRef}>
            <div style={{ perspective: "1200px" }}>
              <div
                className="relative aspect-[2906/1528] rounded-[24px] overflow-hidden"
                style={{
                  transform: `rotateX(${dashboardScrollOffset}deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.05s linear",
                }}
              >
                <img
                  src={dashboardScreenshot}
                  alt="TERRA 森林监测分析仪表盘"
                  className="dashboard-image h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 border-y border-white/5 bg-[#0B0C0F] overflow-hidden md:py-8 md:pt-8 md:pb-4">
        <div className="w-full">
          <p className="text-center text-xs md:text-sm uppercase tracking-[0.2em] text-[#A7ABB3] mb-8">
            受到领先保护组织信赖
          </p>
          <div className="logo-marquee">
            <div className="logo-marquee-content">
              {partnerLogos.map((logo, i) => (
                <div key={i} className="px-8 md:px-12 flex items-center justify-center flex-shrink-0">
                  <img
                    src={logo}
                    alt={`合作伙伴标志 ${i + 1}`}
                    className="h-32 md:h-24 w-auto object-contain opacity-60 hover:opacity-60 transition-all duration-300 brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="metrics" className="relative py-20 md:py-32 px-4 animate-on-scroll md:pt-24 md:pb-20">
        <div className="max-w-[1120px] w-full mx-auto">
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 md:mb-8 text-center text-balance">
            规模化保护{" "}
            <span className="inline-block text-[#F0D6E5]">
              影响力
            </span>
          </h2>

          <p className="text-[#A7ABB3] text-sm md:text-base mb-12 md:mb-16 text-center max-w-[600px] mx-auto leading-relaxed">
            获得全球保护组织信赖，以自然优先的技术提供支持。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[800px] mx-auto">
            {[
              { label: "已保护森林", value: "2.4M", desc: "全球公顷数", color: "pink" },
              { label: "已监测物种", value: "12K+", desc: "野生动物物种", color: "purple" },
              { label: "碳汇规模", value: "18M", desc: "吨 CO2", color: "pink" },
              { label: "威胁识别", value: "99.4%", desc: "准确率", color: "purple" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-6 md:p-10 text-center border border-white/10 border-t-0 border-b border-l-0 border-r-0 md:py-10 md:pb-20"
              >
                <div
                  className={`text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-4 flex items-center justify-center gap-2`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${metric.color === "pink" ? "bg-pink-400/60" : "bg-purple-400/60"}`}
                  />
                  {metric.label}
                </div>
                <div className="font-serif text-[48px] md:text-[72px] leading-none font-medium">
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="text-[11px] md:text-xs text-[#A7ABB3] mt-3">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="map" className="relative py-20 md:py-32 animate-on-scroll bg-[#0B0C0F]">
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            全球覆盖
          </div>
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
            全球保护项目
          </h2>
          <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
            在五大洲监测并保护关键森林生态系统
          </p>
        </div>

        <WorldMap
          experiences={experiences}
          selectedExperience={selectedExperience}
          onSelectExperience={setSelectedExperience}
        />
      </section>

      <section id="narrative" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            <div className="max-w-[720px]">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                保护技术
              </div>
              <h2 className="font-serif text-[36px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-medium mb-8 text-balance">
                每一片森林生态系统{" "}
                <span className="inline-block text-[#D9F99D]">
                  都值得守护
                </span>
              </h2>
              <p className="text-[#A7ABB3] text-base md:text-lg leading-relaxed mb-12">
                我们的卫星与 AI 技术可监测生物多样性、识别非法采伐、追踪森林退化模式，并实时通知行动团队。自然保护需要跟上威胁发生的速度。
              </p>

              <div className="md:hidden mb-8">
                <div className="rounded-[24px] p-1 w-full aspect-square overflow-hidden">
                  <img
                    src={featureImages[selectedFeature] || placeholderSvg}
                    alt="功能预览"
                    className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
                      imageFade ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "无人机巡查",
                    desc: "通过空中巡查记录野生动物和物种多样性",
                    icon: CustomDroneIcon,
                    image: droneImage,
                  },
                  {
                    title: "实时监测",
                    desc: "全天候卫星巡检，并提供即时告警",
                    icon: Satellite,
                    image: realtimeSatelliteImage,
                  },
                  {
                    title: "生物多样性追踪",
                    desc: "跨区域绘制并监测野生动物种群",
                    icon: PawPrint,
                    image: biodiversityTrackingImage,
                  },
                  {
                    title: "森林退化预防",
                    desc: "在威胁扩大前提前发现风险",
                    icon: Trees,
                    image: deforestationDetectImage,
                  },
                ].map((feature, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setImageFade(false)
                      setTimeout(() => {
                        setSelectedFeature(i)
                        setImageFade(true)
                        setAutoRotationKey((prev) => prev + 1)
                      }, 300)
                    }}
                    className={`relative w-full text-left flex gap-4 items-start p-5 transition-all duration-300 rounded-xs py-4 overflow-hidden ${
                      selectedFeature === i ? "border border-white/20" : "border border-white/10"
                    }`}
                  >
                    <feature.icon
                      className={`w-6 h-6 flex-shrink-0 mt-1 transition-colors ${
                        selectedFeature === i ? "text-green-400" : "text-green-500/60"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm md:text-base text-[#A7ABB3]">{feature.desc}</p>
                    </div>
                    {selectedFeature === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                        <div className="h-full bg-white progress-bar" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-stretch justify-center">
              <div className="relative w-full h-full min-h-[500px]">
                {[
                  {
                    title: "无人机巡查",
                    image: droneImage,
                  },
                  {
                    title: "实时监测",
                    image: realtimeSatelliteImage,
                  },
                  {
                    title: "生物多样性追踪",
                    image: biodiversityTrackingImage,
                  },
                  {
                    title: "森林退化预防",
                    image: deforestationDetectImage,
                  },
                ].map((feature, i) => {
                  const positionInStack = (i - selectedFeature + 4) % 4
                  const isActive = positionInStack === 0

                  return (
                    <div
                      key={i}
                      className="absolute inset-0 p-1 transition-all duration-[600ms] ease-out"
                      style={{
                        zIndex: 4 - positionInStack,
                        transform: `translateX(${positionInStack * 16}px) scale(${1 - positionInStack * 0.02})`,
                        opacity: isActive ? (imageFade ? 1 : 1) : 0.6 - positionInStack * 0.15,
                      }}
                    >
                      <img
                        src={feature.image || placeholderSvg}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-[20px]"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[800px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              常见问题
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              还有{" "}
              <span className="inline-block text-[#F0D6E5]">
                疑问
              </span>
              ?
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
              了解 TERRA 和保护技术平台的关键信息。
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "TERRA 的卫星监测如何工作？",
                answer:
                  "平台通过卫星网络结合 AI 算法实时分析森林覆盖变化。我们可在 24 小时内识别小至 0.5 公顷的变化，帮助团队快速响应非法采伐、森林火灾等威胁。",
              },
              {
                question: "TERRA 目前覆盖哪些地区？",
                answer:
                  "TERRA 目前在五大洲监测超过 240 万公顷森林，包括亚马逊雨林、刚果盆地、婆罗洲、俄罗斯泰加林和太平洋西北地区。我们会持续扩大覆盖范围，保护更多关键生态系统。",
              },
              {
                question: "威胁识别系统的准确率有多高？",
                answer:
                  "AI 驱动的威胁识别准确率可达 99.4%。我们使用数百万张卫星图像训练机器学习模型，区分自然变化与人为森林退化或非法活动。",
              },
              {
                question: "组织可以把 TERRA 接入现有系统吗？",
                answer:
                  "可以。TERRA 提供完整 API，可与现有保护管理系统、GIS 平台和告警系统无缝集成。文档中包含详细的接入指南。",
              },
              {
                question: "TERRA 的定价模式是什么？",
                answer:
                  "我们会根据覆盖面积和功能需求提供分层定价。非营利保护组织可申请折扣或资助。你可以联系团队获取匹配需求的定制报价。",
              },
              {
                question: "我如何通过 TERRA 参与森林保护？",
                answer:
                  "你可以通过多种方式参与：捐赠以支持未保护区域监测、加入地面核验志愿团队，或作为企业赞助伙伴合作。每一份贡献都会帮助守护关键生态系统。",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#A7ABB3] transition-transform duration-300 ${
                      openFaqIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-sm md:text-base text-[#A7ABB3] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cta"
        className="relative py-24 md:py-40 px-4 animate-on-scroll overflow-hidden pt-0"
        style={{
          backgroundImage: `url(${earthCtaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F] via-[#0B0C0F]/60 to-transparent pointer-events-none" />
        <div className="max-w-[800px] w-full mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#A7ABB3]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            守护地球
          </div>

          <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">
            加入全球保护行动
          </h2>
          <p className="text-[#A7ABB3] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">
            我们正在共同建设可持续的未来。从今天开始保护森林。
          </p>

          <Button className="glass-button text-base rounded-full bg-white/5 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-white px-8 py-6 md:text-base">
            立即开始
          </Button>
        </div>
      </section>

      <footer className="relative px-4 border-t border-white/5 py-8">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            {/* Brand Column */}
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold font-mono">TERRA</div>
              <p className="text-xs text-[#A7ABB3] leading-relaxed">
                通过实时监测和 AI 技术保护全球森林。
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product Menu */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">产品</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  功能
                </a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  定价
                </a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  文档
                </a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  API
                </a>
              </div>
            </div>

            {/* Company Menu */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">公司</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  关于
                </a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  博客
                </a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  招聘
                </a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  联系
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">通讯</div>
              <p className="text-xs text-[#A7ABB3] mb-3">获取森林保护洞察更新。</p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="输入你的邮箱"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-[#F2F3F5] placeholder-[#A7ABB3] focus:outline-none focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/20 transition-all"
                />
                <button className="px-4 py-2 border rounded-lg text-xs font-medium hover:bg-pink-500/30 hover:border-pink-500/50 transition-all bg-green-800 border-green-700 text-white">
                  订阅
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#A7ABB3]">
            <div>© 2025 TERRA. 保留所有权利。</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">
                隐私政策
              </a>
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">
                服务条款
              </a>
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">
                Cookie 设置
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
