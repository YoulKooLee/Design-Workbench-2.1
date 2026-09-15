import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { PackageCheck, Rocket, ShieldCheck } from "lucide-react"
import { assets } from "./assets"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]) // Reduced hero image shrink from 15% to 5%
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const words = text.split(" ")

    return (
      <span>
        {words.map((word, wordIndex) => (
          <React.Fragment key={`${word}-${wordIndex}`}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${char}-${charIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: delay + (wordIndex + charIndex) * 0.03,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </span>
    )
  }

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image with Cinematic Effects */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, y: imageY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <img
          src={assets.minimalistFurnitureShowroom}
          alt="KATACHI Studio，鼠尾草绿墙面与陶土色家具组成的优雅室内空间"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container-custom text-center text-white">
          <Reveal>
            <h1 className="mb-6 text-5xl font-bold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <AnimatedText text="为会呼吸的" delay={0.5} />
              <br />
              <span className="italic font-light">
                <AnimatedText text="空间设计家具。" delay={1.1} />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              设计源自比利时，为长久使用而造。让现代生活拥有安静、耐看的家具。
            </motion.p>
          </Reveal>
        </div>
      </motion.div>

      {/* Info Strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <BlurPanel className="mx-6 mb-6 px-6 py-4 bg-black/24 backdrop-blur-md border-white/20">
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 sm:gap-6">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-green-400" />
              <span className="text-sm">免费配送</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-amber-400" />
              <span className="text-sm">6 周交付</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-sm">终身质保</span>
            </div>
          </div>
        </BlurPanel>
      </motion.div>
    </section>
  )
}
