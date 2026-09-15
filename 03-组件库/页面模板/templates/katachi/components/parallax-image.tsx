import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  parallaxOffset?: number
}

export function ParallaxImage({ src, alt, className, parallaxOffset = 12 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset])

  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full" style={{ y }}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  )
}
