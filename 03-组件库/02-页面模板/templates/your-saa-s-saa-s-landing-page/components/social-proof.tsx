import React from "react"
import { motion } from "framer-motion"

export function SocialProof() {
  const companies = [
    { name: "C1 手动挡", width: 120 },
    { name: "C2 自动挡", width: 120 },
    { name: "夜间班", width: 100 },
    { name: "周末班", width: 100 },
  ]

  return (
    <section className="border-y border-border bg-secondary/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left side: Trust text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <p className="text-lg text-muted-foreground">
              已服务 3,000+
              <br />
              本地学员
            </p>
          </motion.div>

          {/* Right side: Company logos in a horizontal row */}
          <div className="flex items-center gap-8 md:gap-12 flex-wrap justify-center lg:justify-end flex-1">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                whileHover={{ opacity: 0.8, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-muted-foreground font-bold text-xl tracking-wide"
                style={{ minWidth: company.width }}
              >
                {company.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
