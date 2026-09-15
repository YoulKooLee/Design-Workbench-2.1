import React from "react"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    选购: [
      { name: "新品上架", href: "#" },
      { name: "椅具", href: "#" },
      { name: "桌具", href: "#" },
      { name: "收纳", href: "#" },
      { name: "照明", href: "#" },
    ],
    公司: [
      { name: "关于我们", href: "#" },
      { name: "工艺", href: "#" },
      { name: "可持续", href: "#" },
      { name: "加入我们", href: "#" },
      { name: "媒体", href: "#" },
    ],
    支持: [
      { name: "联系", href: "#" },
      { name: "尺寸指南", href: "#" },
      { name: "养护说明", href: "#" },
      { name: "配送", href: "#" },
      { name: "退换", href: "#" },
    ],
  }

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
  ]

  return (
    <footer className="bg-white/[0.02] border-t border-white/[0.02]">
      <div className="container-custom py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">KATACHI</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                在比利时完成设计，为长久使用而造。我们以实木橡木、钢材与亚麻，创作适合会呼吸空间的耐看家具。
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={18} />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-neutral-900 mb-4">{category}</h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 group flex items-center"
                        >
                          {link.name}
                          <ArrowUpRight
                            size={14}
                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 pb-4 border-t border-neutral-200 flex justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-neutral-500 text-center">
            <p>&copy; {currentYear} KATACHI Studio. 保留所有权利。</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-neutral-700 transition-colors">
                隐私政策
              </a>
              <a href="#" className="hover:text-neutral-700 transition-colors">
                服务条款
              </a>
              <a href="#" className="hover:text-neutral-700 transition-colors">
                Cookie
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
