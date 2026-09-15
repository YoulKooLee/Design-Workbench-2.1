import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Upload, Search, Star, Download, AlertTriangle, Filter, Zap, Crown } from "lucide-react"

interface StorePlugin {
  id: string
  name: string
  description: string
  shortDescription: string
  version: string
  author: string
  category: string
  rating: number
  downloads: number
  price: number
  isFeatured: boolean
  isPremium: boolean
  images: string[]
  tags: string[]
}

const mockStorePlugins: StorePlugin[] = [
  {
    id: "ecommerce-pro",
    name: "E-commerce Pro",
    description:
      "完整的电商解决方案，包含商品、订单、付款管理和详细报告。",
    shortDescription: "完整的电商解决方案",
    version: "3.2.1",
    author: "Commerce Team",
    category: "电商",
    rating: 4.9,
    downloads: 25430,
    price: 99,
    isFeatured: true,
    isPremium: true,
    images: ["/placeholder.svg?height=200&width=300"],
    tags: ["ecommerce", "shop", "payment", "inventory"],
  },
  {
    id: "social-login",
    name: "Social Login",
    description:
      "支持用户使用 Facebook、Google、Twitter 等社交账号登录，配置简单。",
    shortDescription: "使用社交账号登录",
    version: "2.1.0",
    author: "Social Dev",
    category: "认证",
    rating: 4.7,
    downloads: 18920,
    price: 0,
    isFeatured: false,
    isPremium: false,
    images: ["/placeholder.svg?height=200&width=300"],
    tags: ["login", "social", "facebook", "google"],
  },
  {
    id: "page-builder",
    name: "Visual Page Builder",
    description: "直观的拖拽式页面构建器，内置数百个模板和元素，无需代码。",
    shortDescription: "拖拽式页面构建器",
    version: "4.0.2",
    author: "Builder Pro",
    category: "页面构建器",
    rating: 4.8,
    downloads: 32100,
    price: 79,
    isFeatured: true,
    isPremium: true,
    images: ["/placeholder.svg?height=200&width=300"],
    tags: ["builder", "drag-drop", "template", "visual"],
  },
  {
    id: "multilingual",
    name: "Multilingual Support",
    description: "完整的多语言支持，包含翻译管理、语言自动检测和多语言 SEO。",
    shortDescription: "多语言支持",
    version: "1.9.3",
    author: "Language Team",
    category: "本地化",
    rating: 4.6,
    downloads: 12450,
    price: 49,
    isFeatured: false,
    isPremium: true,
    images: ["/placeholder.svg?height=200&width=300"],
    tags: ["multilingual", "translation", "i18n", "seo"],
  },
  {
    id: "cache-optimizer",
    name: "Cache Optimizer",
    description: "通过智能缓存、文件压缩和集成 CDN 优化网站速度。",
    shortDescription: "优化缓存和速度",
    version: "2.5.1",
    author: "Speed Team",
    category: "性能",
    rating: 4.9,
    downloads: 28760,
    price: 0,
    isFeatured: true,
    isPremium: false,
    images: ["/placeholder.svg?height=200&width=300"],
    tags: ["cache", "speed", "performance", "cdn"],
  },
]

export function AddNewPlugin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dragActive, setDragActive] = useState(false)

  const categories = ["all", "电商", "认证", "页面构建器", "本地化", "性能"]

  const filteredPlugins = mockStorePlugins.filter((plugin) => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || plugin.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredPlugins = filteredPlugins.filter((plugin) => plugin.isFeatured)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0])
    }
  }

  return (
    <Tabs defaultValue="store" className="w-full">
      <TabsList className="grid w-full grid-cols-2 h-9">
        <TabsTrigger value="store" className="text-xs">
          插件商店
        </TabsTrigger>
        <TabsTrigger value="upload" className="text-xs">
          上传插件
        </TabsTrigger>
      </TabsList>

      <TabsContent value="store" className="mt-4 space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="在商店中搜索插件..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-xs h-9"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "全部分类" : category}
                </option>
              ))}
            </select>

            <Button variant="outline" size="sm" className="h-9 text-xs bg-transparent">
              <Filter className="h-4 w-4 mr-1" />
              筛选
            </Button>
          </div>
        </div>

        {/* Featured Plugins */}
        {featuredPlugins.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="h-4 w-4 text-yellow-500" />
              <h2 className="text-lg font-semibold">精选插件</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {featuredPlugins.slice(0, 3).map((plugin) => (
                <Card
                  key={plugin.id}
                  className="hover:shadow-md transition-shadow border-yellow-200 dark:border-yellow-800"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between mb-1">
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs px-2 py-0"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        精选
                      </Badge>
                      {plugin.isPremium && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          <Zap className="h-3 w-3 mr-1" />
                          高级版
                        </Badge>
                      )}
                    </div>

                    <CardTitle className="text-sm">{plugin.name}</CardTitle>
                    <CardDescription className="text-xs">{plugin.shortDescription}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{plugin.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{plugin.downloads.toLocaleString()}</span>
                      </div>
                      <Badge variant="outline" className="text-xs px-1.5 py-0">
                        {plugin.category}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">
                        {plugin.price === 0 ? (
                          <span className="text-green-600 dark:text-green-400">免费</span>
                        ) : (
                          <span>${plugin.price}</span>
                        )}
                      </div>

                      <div className="flex gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2 bg-transparent">
                          详情
                        </Button>
                        <Button size="sm" className="h-7 text-xs px-2">
                          {plugin.price === 0 ? "安装" : "购买"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Plugins */}
        <div>
          <h2 className="text-lg font-semibold mb-3">全部插件</h2>

          <div className="grid gap-2">
            {filteredPlugins.map((plugin) => (
              <Card key={plugin.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-md flex-shrink-0 flex items-center justify-center">
                      <img
                        src={plugin.images[0] || "/placeholder.svg"}
                        alt={plugin.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-medium">{plugin.name}</h3>
                            {plugin.isPremium && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0">
                                <Zap className="h-3 w-3 mr-1" />
                                高级版
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                            {plugin.description}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-semibold mb-1">
                            {plugin.price === 0 ? (
                              <span className="text-green-600 dark:text-green-400">免费</span>
                            ) : (
                              <span>${plugin.price}</span>
                            )}
                          </div>
                          <div className="flex gap-1.5">
                            <Button size="sm" variant="outline" className="h-7 text-xs px-2 bg-transparent">
                              详情
                            </Button>
                            <Button size="sm" className="h-7 text-xs px-2">
                              {plugin.price === 0 ? "安装" : "购买"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{plugin.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          <span>{plugin.downloads.toLocaleString()}</span>
                        </div>
                        <span>{plugin.author}</span>
                        <Badge variant="outline" className="text-xs px-1.5 py-0">
                          {plugin.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="upload" className="mt-4 space-y-4">
        {/* Upload Area */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">上传插件</CardTitle>
            <CardDescription className="text-sm">
              从你的电脑上传插件文件（.zip），或通过 URL 安装
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "border-gray-300 dark:border-gray-600"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium mb-1">将插件文件拖放到这里</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">或点击从电脑选择文件</p>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                选择 .zip 文件
              </Button>
            </div>

            {/* URL Install */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">通过 URL 安装</h3>
              <div className="flex gap-2">
                <Input placeholder="https://example.com/plugin.zip" className="flex-1 h-9 text-xs" />
                <Button size="sm" className="h-9 text-xs">
                  安装
                </Button>
              </div>
            </div>

            {/* Security Warning */}
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <div className="flex gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1 text-xs">安全提示</h4>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    仅安装来自可信来源的插件。插件可能包含恶意代码，并影响你的网站安全。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Installation Guide */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">安装指南</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-medium text-xs">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-xs">下载插件</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    从开发者官网下载安装插件文件（.zip）
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-medium text-xs">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-xs">上传文件</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    使用上方上传表单上传插件文件
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-medium text-xs">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-xs">启用插件</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    安装成功后，进入「已安装插件」标签页启用
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
