/**
 * @name 安行驾校落地页
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from "react"
import "./style.css"

import { FAQSection } from "./components/faq-section"
import { FeaturesSection } from "./components/features-section"
import { FeaturesSlideshowSection } from "./components/features-slideshow-section"
import { HeroSection } from "./components/hero-section"
import { HowItWorksSection } from "./components/how-it-works-section"
import { Navigation } from "./components/navigation"
import { PricingSection } from "./components/pricing-section"
import { SocialProof } from "./components/social-proof"
import { TestimonialsSection } from "./components/testimonials-section"

export default function ImportedV0Prototype() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <SocialProof />
        <FeaturesSection />
        <HowItWorksSection />
        <FeaturesSlideshowSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>
      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">安行驾校</h3>
              <p className="text-sm text-muted-foreground">
                透明收费、灵活约课，陪你从第一节课稳稳开到拿证。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">课程</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    C1 手动挡
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground transition-colors">
                    C2 自动挡
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    科二科三强化
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">服务</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-foreground transition-colors">
                    训练场地
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    教练团队
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground transition-colors">
                    学车套餐
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">法律</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#faq" className="hover:text-foreground transition-colors">
                    费用说明
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-foreground transition-colors">
                    考试流程
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-foreground transition-colors">
                    联系报名
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2025 安行驾校. 保留所有权利。
          </div>
        </div>
      </footer>
    </div>
  )
}
