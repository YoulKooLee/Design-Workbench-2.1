import React from "react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { CreditCard, Download, Calendar, CheckCircle, Star, Zap, Crown } from "lucide-react"

export default function SubscriptionSettings() {
  const currentPlan = {
    name: "Pro 方案",
    price: "$29",
    period: "月",
    features: [
      "无限项目",
      "高级分析",
      "优先支持",
      "自定义集成",
      "团队协作",
    ],
    nextBilling: "2024年1月15日",
    status: "active",
  }

  const plans = [
    {
      id: "free",
    name: "免费",
      price: "$0",
      period: "永久",
      description: "适合刚开始使用",
      features: ["最多 3 个项目", "基础分析", "社区支持", "标准模板"],
      icon: <Star className="h-5 w-5" />,
      popular: false,
      current: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29",
      period: "月",
      description: "适合专业用户",
      features: [
        "无限项目",
        "高级分析",
        "优先支持",
        "自定义集成",
        "团队协作",
        "高级安全",
      ],
      icon: <Zap className="h-5 w-5" />,
      popular: true,
      current: true,
    },
    {
      id: "enterprise",
      name: "企业",
      price: "$99",
      period: "月",
      description: "适合大型组织",
      features: [
        "包含 Pro 的全部功能",
        "专属支持",
        "自定义品牌",
        "SSO 集成",
        "高级权限",
        "SLA 保证",
      ],
      icon: <Crown className="h-5 w-5" />,
      popular: false,
      current: false,
    },
  ]

  const invoices = [
    {
      id: "INV-001",
      date: "2023年12月15日",
      amount: "$29.00",
      status: "paid",
      description: "Pro 方案，月付",
    },
    {
      id: "INV-002",
      date: "2023年11月15日",
      amount: "$29.00",
      status: "paid",
      description: "Pro 方案，月付",
    },
    {
      id: "INV-003",
      date: "2023年10月15日",
      amount: "$29.00",
      status: "paid",
      description: "Pro 方案，月付",
    },
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">订阅与账单</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          管理订阅、账单信息和付款方式
        </p>
      </div>

      {/* Current Plan */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">当前方案</h3>
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{currentPlan.name}</CardTitle>
                  <CardDescription>
                    {currentPlan.price}/{currentPlan.period}，下次扣费：{currentPlan.nextBilling}
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0">
                <CheckCircle className="h-3 w-3 mr-1" />
                已启用
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">方案功能：</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">更改方案</Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                  取消订阅
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Plans */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">可用方案</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.current ? "border-primary/20 bg-primary/5" : plan.popular ? "border-primary/50" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">最受欢迎</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <div className={`p-2 rounded-lg ${plan.current ? "bg-primary/10" : "bg-gray-100 dark:bg-gray-800"}`}>
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">/{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.current
                      ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? "当前方案" : `升级到 ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">付款方式</h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">有效期至 12/2025</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            更新
          </Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">账单历史</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            下载全部
          </Button>
        </div>
        <div className="space-y-2">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{invoice.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {invoice.date} • {invoice.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-900 dark:text-white">{invoice.amount}</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0">
                  已付款
                </Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
