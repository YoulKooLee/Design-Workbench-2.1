import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Check } from "lucide-react"
import { QuoteFormDialog } from "./quote-form-dialog"

const pricingTiers = [
  {
    name: "基础网站",
    price: "€999",
    features: [
      "最多 5 个页面",
      "响应式设计",
      "基础 SEO 优化",
      "联系表单",
      "1 个月免费维护",
    ],
    highlighted: false,
  },
  {
    name: "Pro 套餐",
    price: "€2.499",
    features: [
      "最多 15 个页面",
      "高级设计",
      "高级 SEO",
      "CMS 集成",
      "电商功能",
      "3 个月免费维护",
    ],
    highlighted: true,
  },
  {
    name: "定制",
    price: "按需报价",
    features: [
      "不限页面数",
      "自定义功能",
      "API 集成",
      "专属项目经理",
      "6 个月免费维护",
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pakketten" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            透明定价
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            为你的项目选择<span className="text-primary">合适套餐</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            从创业者到成熟企业，我们都能提供匹配的解决方案。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative group ${
                tier.highlighted
                  ? "border-primary shadow-xl scale-105 bg-gradient-to-b from-background to-primary/5"
                  : "hover:border-primary/50 hover:shadow-lg"
              } transition-all duration-300`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  ⭐ 最受欢迎
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {tier.price === "按需报价" ? (
                      <span className="text-3xl">{tier.price}</span>
                    ) : (
                      <>
                        <span className="text-lg font-normal text-muted-foreground">起价 </span>
                        {tier.price}
                      </>
                    )}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 group/item">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <QuoteFormDialog
                  packageName={tier.name}
                  variant={tier.highlighted ? "default" : "outline"}
                  className={`w-full ${tier.highlighted ? "shadow-lg shadow-primary/20" : ""}`}
                >
                  {tier.price === "按需报价" ? "联系我们" : "选择套餐"}
                </QuoteFormDialog>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            所有套餐均包含<span className="text-primary font-semibold">免费主机配置</span>和{" "}
            <span className="text-primary font-semibold">SSL 证书</span>
          </p>
        </div>
      </div>
    </section>
  )
}
