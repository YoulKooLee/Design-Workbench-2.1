import React, { useState } from "react"
import { motion } from "motion/react"
import { assets } from "./assets"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

const featuredProducts = [
  {
    id: "4",
    name: "Verde Modular Chair",
    price: "€4,890",
    image: assets.greenVelvetModularChair,
    badge: "New" as const,
    materials: ["铜质框架", "高级天鹅绒"],
    swatches: [
      { name: "森林绿", color: "#355E3B" },
      { name: "鼠尾草绿", color: "#9CAF88" },
      { name: "铜色", color: "#B87333" },
    ],
    quickLookImages: [
      assets.greenVelvetModularChair,
      assets.placeholderSvg,
      assets.placeholderSvg,
    ],
    dimensions: "W: 180cm × D: 90cm × H: 75cm",
  },
  {
    id: "7",
    name: "Terracotta Cloud Chair",
    price: "€5,250",
    image: assets.terracottaCloudChair,
    badge: "New" as const,
    materials: ["铜质框架", "陶土色天鹅绒"],
    swatches: [
      { name: "陶土色", color: "#E2725B" },
      { name: "焦橙色", color: "#CC5500" },
      { name: "铜色", color: "#B87333" },
    ],
    quickLookImages: [
      assets.terracottaCloudChair,
      assets.placeholderSvg,
      assets.placeholderSvg,
    ],
    dimensions: "W: 95cm × D: 85cm × H: 80cm",
  },
  {
    id: "8",
    name: "Sage Copper Lounge",
    price: "€4,675",
    image: assets.sageCopperLoungeChair,
    badge: "Limited" as const,
    materials: ["铜质框架", "鼠尾草绿天鹅绒"],
    swatches: [
      { name: "鼠尾草绿", color: "#9CAF88" },
      { name: "森林绿", color: "#355E3B" },
      { name: "铜色", color: "#B87333" },
    ],
    quickLookImages: [
      assets.sageCopperLoungeChair,
      assets.placeholderSvg,
      assets.placeholderSvg,
    ],
    dimensions: "W: 85cm × D: 90cm × H: 75cm",
  },
]

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
              精选<span className="italic font-light">系列</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              探索最受欢迎的作品。每一件都以克制比例、细致工艺和经得起时间的设计原则打造。
            </p>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} onQuickLook={handleQuickLook} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
