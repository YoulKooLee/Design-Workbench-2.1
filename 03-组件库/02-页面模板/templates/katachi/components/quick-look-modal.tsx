import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { BlurPanel } from "./blur-panel"

interface QuickLookModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

export function QuickLookModal({ product, isOpen, onClose }: QuickLookModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSwatch, setSelectedSwatch] = useState(0)

  if (!product) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.quickLookImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.quickLookImages.length) % product.quickLookImages.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <BlurPanel className="bg-white/95 backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.quickLookImages[currentImageIndex]}
                      alt={`${product.name} 图片 ${currentImageIndex + 1}`}
                      className="h-full w-full object-cover"
                    />

                    {/* Navigation Arrows */}
                    {product.quickLookImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200"
                          onClick={prevImage}
                          aria-label="上一张图片"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200"
                          onClick={nextImage}
                          aria-label="下一张图片"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Image Thumbnails */}
                  <div className="flex gap-2">
                    {product.quickLookImages.map((image: string, index: number) => (
                      <button
                        key={index}
                        type="button"
                        className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          currentImageIndex === index ? "border-neutral-900" : "border-neutral-200"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`${product.name} 缩略图 ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-neutral-900 mb-2">{product.name}</h2>
                      <p className="text-lg text-neutral-600">{product.materials.join(", ")}</p>
                    </div>
                    <button
                      type="button"
                      className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                      onClick={onClose}
                      aria-label="关闭快速预览"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6 flex-1">
                    {/* Price */}
                    <div className="text-2xl font-bold text-neutral-900">{product.price}</div>

                    {/* Dimensions */}
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 mb-2">尺寸</h4>
                      <p className="text-neutral-600">{product.dimensions}</p>
                    </div>

                    {/* Material Swatches */}
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 mb-3">饰面</h4>
                      <div className="flex gap-3">
                        {product.swatches.map((swatch: any, index: number) => (
                          <button
                            key={index}
                            type="button"
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 relative group ${
                              selectedSwatch === index ? "border-neutral-900 scale-110" : "border-neutral-300"
                            }`}
                            style={{ backgroundColor: swatch.color }}
                            onClick={() => setSelectedSwatch(index)}
                          >
                            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                              {swatch.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 mb-3">特点</h4>
                      <ul className="space-y-2 text-sm text-neutral-600">
                        <li>• 可持续来源材料</li>
                        <li>• 手工修整边缘</li>
                        <li>• 比利时按单制作</li>
                        <li>• 终身维修计划</li>
                      </ul>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <motion.button
                    type="button"
                    className="w-full bg-neutral-900 text-white py-4 rounded-full font-medium text-lg hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={20} />
                    加入购物车
                  </motion.button>
                </div>
              </div>
            </BlurPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
