import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { assets } from "./assets"
import { Reveal } from "./reveal"
import { cn } from "../lib/utils"

const materials = [
  {
    id: "pistachio",
    name: "开心果绿",
    description: "拥有丰润层次与细腻触感的开心果绿色天鹅绒",
    backgroundImage: assets.minimalistFurnitureShowroom,
    tint: "bg-green-50",
  },
  {
    id: "lunar",
    name: "月灰",
    description: "带有轻微金属底调的高级月灰色",
    backgroundImage: assets.lunarGrayInterior,
    tint: "bg-gray-100",
  },
  {
    id: "martian",
    name: "火星红",
    description: "大胆的火星红，融合温暖陶土色调",
    backgroundImage: assets.martianRedInterior,
    tint: "bg-red-50",
  },
]

export function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState("pistachio")

  const activeMaterialData = materials.find((m) => m.id === activeMaterial) || materials[0]

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="materials">
      <div className="absolute inset-0 z-0">
        {materials.map((material) => (
          <motion.div
            key={material.id}
            className="absolute inset-0"
            initial={{ opacity: material.id === activeMaterial ? 1 : 0 }}
            animate={{ opacity: material.id === activeMaterial ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <img
              src={material.backgroundImage}
              alt={`${material.name}室内空间`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="absolute top-[120px] left-0 right-0 z-10">
        <div className="container-custom text-white">
          <Reveal>
            <div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeMaterial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="font-bold mb-6 text-7xl"
                >
                  <AnimatedText text={activeMaterialData.name} delay={0.2} />
                </motion.h2>
              </AnimatePresence>
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                每件作品都从材质开始。我们筛选兼具美感、耐久度与可持续来源的材料，由工匠以传统手法结合现代精度完成。
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-10 max-w-md hidden">
        <Reveal delay={0.3}>
          <blockquote className="pl-0 py-4">
            <p className="text-xl text-white leading-relaxed italic lg:text-base font-medium">
              "我们相信家具应超越潮流，在时间里变得更美，并承载一代又一代的故事与记忆。"
            </p>
            <footer className="mt-4 text-sm text-white/70">KATACHI Studio</footer>
          </blockquote>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container-custom">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {materials.map((material) => (
                <motion.button
                  key={material.id}
                  type="button"
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md",
                    activeMaterial === material.id
                      ? "bg-white text-neutral-900"
                      : "bg-white/20 text-white hover:bg-white/30",
                  )}
                  onClick={() => setActiveMaterial(material.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {material.name}
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
