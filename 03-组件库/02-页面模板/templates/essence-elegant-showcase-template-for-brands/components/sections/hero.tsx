import React, { useEffect, useRef, useState } from "react"
import { ImageReveal } from "../ui/image-reveal"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setScrollY(window.scrollY)
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <ImageReveal
          src="/images/hero.jpg"
          alt="厨师在极简厨房中精细摆盘高级料理"
          priority
          className="object-cover object-center"
          sizes="100vw"
          delay={300}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {/* Architectural Grid Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div 
          className="absolute left-[10%] top-0 w-px h-full bg-foreground/5"
          style={{
            transform: `translateY(${-scrollY * 0.1}px)`,
          }}
        />
        <div 
          className="absolute left-[30%] top-0 w-px h-full bg-foreground/5"
          style={{
            transform: `translateY(${-scrollY * 0.15}px)`,
          }}
        />
        <div 
          className="absolute right-[20%] top-0 w-px h-full bg-foreground/5"
          style={{
            transform: `translateY(${-scrollY * 0.08}px)`,
          }}
        />
        <div 
          className="absolute top-[40%] left-0 w-full h-px bg-foreground/5"
          style={{
            transform: `translateX(${scrollY * 0.05}px)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Main Headline */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden">
              <h1 
                className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.9] tracking-normal text-foreground"
                style={{
                  transform: isLoaded ? "translateY(0)" : "translateY(100%)",
                  opacity: isLoaded ? 1 : 0,
                  transitionProperty: "all",
                  transitionDuration: "1s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: "0.3s"
                }}
              >
                <span className="block text-pretty">
                  <span className="block sm:inline">超越餐盘的</span>
                </span>
                <span className="block text-pretty">
                  <span className="block sm:inline">料理艺术</span>
                </span>
                <span className="block text-accent italic">在此成形</span>
              </h1>
            </div>
          </div>

          {/* Supporting Text */}
          <div className="lg:col-span-4 lg:pb-4">
            <div 
              className="space-y-6"
              style={{
                transform: isLoaded ? "translateY(0)" : "translateY(40px)",
                opacity: isLoaded ? 1 : 0,
                transitionProperty: "all",
                transitionDuration: "0.8s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.6s"
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-accent" />
                <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">始于 2012</span>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
                三星 Michelin 餐厅，以法式技法的精确、时令食材的纯粹，以及每个瞬间的诗意构成晚餐。
              </p>
              <div className="pt-2">
                <a 
                  href="#dishes"
                  className="inline-flex items-center gap-3 group text-sm tracking-[0.1em] uppercase text-foreground"
                >
                  <span className="bg-primary my-0 py-3 text-primary-foreground px-3">探索料理</span>
                  
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
          style={{
            opacity: isLoaded ? 1 : 0,
            transitionProperty: "opacity",
            transitionDuration: "1s",
            transitionTimingFunction: "ease",
            transitionDelay: "1.2s"
          }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">向下</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground/40 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 w-full bg-accent animate-pulse" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      {/* Corner Decorative Element */}
      <div 
        className="absolute top-32 right-6 md:right-12 lg:right-20 z-20 hidden md:block"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateX(0)" : "translateX(20px)",
          transitionProperty: "all",
          transitionDuration: "0.8s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "0.9s"
        }}
      >
        <div className="flex items-center gap-4 text-xs tracking-[0.2em] uppercase text-muted-foreground">
          <span>47.6062° N</span>
          <div className="w-8 h-px bg-border" />
          <span>122.3321° W</span>
        </div>
      </div>

    </section>
  )
}
