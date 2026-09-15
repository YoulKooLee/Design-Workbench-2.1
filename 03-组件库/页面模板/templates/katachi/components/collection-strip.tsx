import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { assets } from "./assets"
import { Reveal } from "./reveal"

const collections = [
  {
    id: "modern-seating",
    name: "现代坐具",
    image: assets.modernArmchairPillows,
    count: "8 件作品",
  },
  {
    id: "modular-design",
    name: "模块化设计",
    image: assets.modularCushionBench,
    count: "6 件作品",
  },
  {
    id: "cloud-collection",
    name: "云感系列",
    image: assets.cloudWhiteSofa,
    count: "4 件作品",
  },
  {
    id: "artistic-pieces",
    name: "艺术单品",
    image: assets.distressedArtisticChair,
    count: "5 件作品",
  },
  {
    id: "contemporary",
    name: "当代生活",
    image: assets.greenModularLoveseat,
    count: "7 件作品",
  },
  {
    id: "textural-craft",
    name: "肌理工艺",
    image: assets.braidedRopeLoveseat,
    count: "3 件作品",
  },
  {
    id: "maximalist-art",
    name: "丰盛艺术",
    image: assets.colorfulPatchworkSofa,
    count: "4 件作品",
  },
  {
    id: "scandinavian-comfort",
    name: "北欧舒适",
    image: assets.minimalistBoucleLoveseat,
    count: "6 件作品",
  },
  {
    id: "abstract-forms",
    name: "抽象形体",
    image: assets.abstractArtisticSofa,
    count: "5 件作品",
  },
  {
    id: "luxury-textures",
    name: "高级肌理",
    image: assets.texturedCreamLoveseat,
    count: "8 件作品",
  },
]

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1200))
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  const itemWidth = 320 // 320px (w-80) + 32px gap = 352px per item
  const totalWidth = collections.length * (itemWidth + 32) - 32 // subtract last gap
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48) // add padding

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-6xl font-normal">系列</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              浏览我们策划的家具系列。每组作品都讲述一种关于工艺、比例与生活方式的安静叙事。
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 px-6"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="flex-shrink-0 w-80 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ filter: "blur(1px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold tracking-wider mb-2">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.count}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← 拖动浏览更多系列 →</p>
      </div>
    </section>
  )
}
