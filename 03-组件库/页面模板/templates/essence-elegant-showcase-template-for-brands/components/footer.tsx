import React from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const navigationItems = [
    { label: "愿景", href: "#vision" },
    { label: "理念", href: "#philosophy" },
    { label: "体验", href: "#experience" },
    { label: "招牌料理", href: "#dishes" },
    { label: "预订", href: "#contact" },
  ]

  return (
    <footer className="relative py-16 md:py-24 border-t border-border">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Logo & Tagline */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#top" className="inline-block">
              <span className="font-serif text-2xl md:text-3xl font-light tracking-[0.2em] text-foreground">
                ESSENCE
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              三星 Michelin 餐厅，以现代感知演绎法式高级料理艺术，坐落于巴黎中心。
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              餐厅
            </h4>
            <nav className="space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              法律
            </h4>
            <nav className="space-y-4">
              {["隐私政策", "服务条款", "无障碍访问"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Quick */}
          <div className="lg:col-span-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              联系我们
            </h4>
            <div className="space-y-4">
              <p className="text-sm text-foreground/70">
                428 rue Saint-Honoré<br />
                75001 Paris, France
              </p>
              <p className="text-sm">
                <a 
                  href="mailto:reserve@essence-paris.fr" 
                  className="text-foreground hover:text-accent transition-colors duration-300"
                >
                  reserve@essence-paris.fr
                </a>
              </p>
              <p className="text-sm">
                <a 
                  href="tel:+33142608080" 
                  className="text-foreground/70 hover:text-foreground transition-colors duration-300"
                >
                  +33 1 42 60 80 80
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground">
            © {currentYear} ESSENCE. 保留所有权利。
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-8">
            {[
              { name: "Instagram", url: "#" },
              { name: "La Liste", url: "#" },
              { name: "Michelin Guide", url: "#" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span>返回顶部</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

        {/* Large Decorative Text */}
        <div className="mt-16 md:mt-24 overflow-hidden">
          <p className="font-serif text-[8vw] md:text-[6vw] lg:text-[5vw] font-light tracking-normal text-foreground/[0.03] leading-none whitespace-nowrap">
            料理，是同时滋养身体与心魂的艺术。
          </p>
        </div>
      </div>
    </footer>
  )
}
