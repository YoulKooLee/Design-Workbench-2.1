import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Button } from "../../../ui/button"
import { Badge } from "../../../ui/badge"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Switch } from "../../../ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { Textarea } from "../../../ui/textarea"
import { Separator } from "../../../ui/separator"
import { Search, Code, FileText, Map, Settings, Save, RotateCcw, Eye, Plus, X } from "lucide-react"

export function AllSiteSEOSettingsContent() {
  const [seoEnabled, setSeoEnabled] = useState(true)
  const [controllerRules, setControllerRules] = useState([
    {
      id: 1,
      controller: "HomeController",
      function: "index",
      titleTemplate: "{site_name} - {tagline}",
      descriptionTemplate: "欢迎访问 {site_name}。{description}",
      status: "configured",
      enabled: true,
    },
    {
      id: 2,
      controller: "PostController",
      function: "show",
      titleTemplate: "{post_title} - {site_name}",
      descriptionTemplate: "{post_excerpt} | {site_name}",
      status: "configured",
      enabled: true,
    },
    {
      id: 3,
      controller: "CategoryController",
      function: "index",
      titleTemplate: "{category_name} - {site_name}",
      descriptionTemplate: "浏览 {site_name} 上的 {category_name} 文章",
      status: "partial",
      enabled: false,
    },
  ])

  const [postTypes, setPostTypes] = useState([
    {
      id: 1,
      name: "文章",
      slug: "posts",
      count: 1247,
      urlTemplate: "/posts/{slug}",
      titleTemplate: "{title} - {site_name}",
      autoDescription: true,
      robotsMeta: "index,follow",
      enabled: true,
    },
    {
      id: 2,
      name: "页面",
      slug: "pages",
      count: 23,
      urlTemplate: "/{slug}",
      titleTemplate: "{title} - {site_name}",
      autoDescription: true,
      robotsMeta: "index,follow",
      enabled: true,
    },
    {
      id: 3,
      name: "商品",
      slug: "products",
      count: 456,
      urlTemplate: "/products/{slug}",
      titleTemplate: "{title} - Shop {site_name}",
      autoDescription: false,
      robotsMeta: "index,follow",
      enabled: true,
    },
  ])

  const [schemaTemplates, setSchemaTemplates] = useState([
    {
      id: 1,
      name: "Article",
      type: "Article",
      usage: 1247,
      enabled: true,
      template: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "description": "{description}",
  "author": {
    "@type": "Person",
    "name": "{author_name}"
  },
  "datePublished": "{published_date}",
  "dateModified": "{modified_date}"
}`,
    },
    {
      id: 2,
      name: "Product",
      type: "Product",
      usage: 456,
      enabled: true,
      template: `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{product_name}",
  "description": "{product_description}",
  "offers": {
    "@type": "Offer",
    "price": "{price}",
    "priceCurrency": "{currency}"
  }
}`,
    },
  ])

  const addControllerRule = () => {
    const newRule = {
      id: Date.now(),
      controller: "",
      function: "",
      titleTemplate: "",
      descriptionTemplate: "",
      status: "not_configured",
      enabled: true,
    }
    setControllerRules([...controllerRules, newRule])
  }

  const removeControllerRule = (id: number) => {
    setControllerRules(controllerRules.filter((rule) => rule.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Search className="h-6 w-6 text-green-600" />
            AllSite SEO 设置
          </h1>
          <p className="text-gray-600 dark:text-gray-400">为网站配置完整 SEO 策略</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            预览
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            保存更改
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1,726</div>
            <div className="text-xs text-gray-600">页面总数</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1,523</div>
            <div className="text-xs text-gray-600">已优化</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">87.2</div>
            <div className="text-xs text-gray-600">SEO 得分</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">1.2s</div>
            <div className="text-xs text-gray-600">加载时间</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">24.5K</div>
            <div className="text-xs text-gray-600">流量</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">342</div>
            <div className="text-xs text-gray-600">关键词</div>
          </div>
        </Card>
      </div>

      {/* Main Settings */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">总览</TabsTrigger>
          <TabsTrigger value="controllers">Controllers</TabsTrigger>
          <TabsTrigger value="posttypes">Post Types</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="advanced">高级</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                通用设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">启用 SEO</Label>
                  <p className="text-xs text-gray-600">开启或关闭所有 SEO 功能</p>
                </div>
                <Switch checked={seoEnabled} onCheckedChange={setSeoEnabled} />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site-title">站点标题</Label>
                  <Input id="site-title" defaultValue="我的精彩网站" />
                </div>
                <div>
                  <Label htmlFor="tagline">标语</Label>
                  <Input id="tagline" defaultValue="又一个 WordPress 站点" />
                </div>
              </div>

              <div>
                <Label htmlFor="site-description">站点描述</Label>
                <Textarea
                  id="site-description"
                  defaultValue="一个为访客提供有价值内容和服务的综合网站。"
                  className="h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title-separator">标题分隔符</Label>
                  <Select defaultValue="-">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-">-（短横线）</SelectItem>
                      <SelectItem value="|">|（竖线）</SelectItem>
                      <SelectItem value="•">•（圆点）</SelectItem>
                      <SelectItem value="~">~（波浪线）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="default-keywords">默认关键词</Label>
                  <Input id="default-keywords" placeholder="website, blog, content" />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">默认 Meta 标签</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="meta-author">作者</Label>
                    <Input id="meta-author" defaultValue="网站管理员" />
                  </div>
                  <div>
                    <Label htmlFor="meta-robots">Robots</Label>
                    <Select defaultValue="index,follow">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="index,follow">index,follow</SelectItem>
                        <SelectItem value="noindex,nofollow">noindex,nofollow</SelectItem>
                        <SelectItem value="index,nofollow">index,nofollow</SelectItem>
                        <SelectItem value="noindex,follow">noindex,follow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Open Graph</Label>
                    <p className="text-xs text-gray-600">Facebook 分享优化</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Twitter Cards</Label>
                    <p className="text-xs text-gray-600">Twitter 分享优化</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">社交媒体</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="facebook-url">Facebook URL</Label>
                    <Input id="facebook-url" placeholder="https://facebook.com/yourpage" />
                  </div>
                  <div>
                    <Label htmlFor="twitter-url">Twitter URL</Label>
                    <Input id="twitter-url" placeholder="https://twitter.com/youraccount" />
                  </div>
                  <div>
                    <Label htmlFor="instagram-url">Instagram URL</Label>
                    <Input id="instagram-url" placeholder="https://instagram.com/youraccount" />
                  </div>
                  <div>
                    <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                    <Input id="linkedin-url" placeholder="https://linkedin.com/company/yourcompany" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Controllers Settings */}
        <TabsContent value="controllers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  按 Controller 配置 SEO
                </CardTitle>
                <Button size="sm" onClick={addControllerRule}>
                  <Plus className="h-4 w-4 mr-2" />
                  添加规则
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {controllerRules.map((rule) => (
                  <Card key={rule.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs">Controller</Label>
                            <Input
                              value={rule.controller}
                              onChange={(e) => {
                                const updated = controllerRules.map((r) =>
                                  r.id === rule.id ? { ...r, controller: e.target.value } : r,
                                )
                                setControllerRules(updated)
                              }}
                              placeholder="HomeController"
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Function</Label>
                            <Input
                              value={rule.function}
                              onChange={(e) => {
                                const updated = controllerRules.map((r) =>
                                  r.id === rule.id ? { ...r, function: e.target.value } : r,
                                )
                                setControllerRules(updated)
                              }}
                              placeholder="index"
                              className="h-8"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">标题模板</Label>
                          <Input
                            value={rule.titleTemplate}
                            onChange={(e) => {
                              const updated = controllerRules.map((r) =>
                                r.id === rule.id ? { ...r, titleTemplate: e.target.value } : r,
                              )
                              setControllerRules(updated)
                            }}
                            placeholder="{post_title} - {site_name}"
                            className="h-8 font-mono text-xs"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Meta 描述模板</Label>
                          <Textarea
                            value={rule.descriptionTemplate}
                            onChange={(e) => {
                              const updated = controllerRules.map((r) =>
                                r.id === rule.id ? { ...r, descriptionTemplate: e.target.value } : r,
                              )
                              setControllerRules(updated)
                            }}
                            placeholder="{post_excerpt} | {site_name}"
                            className="h-16 font-mono text-xs"
                          />
                        </div>
                        <div className="text-xs text-gray-500">
                          变量：{" "}
                          {"{site_name}, {post_title}, {post_excerpt}, {author_name}, {category_name}, {tagline}"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            rule.status === "configured"
                              ? "default"
                              : rule.status === "partial"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {rule.status === "configured"
                            ? "已配置"
                            : rule.status === "partial"
                              ? "部分配置"
                              : "未配置"}
                        </Badge>
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={(checked) => {
                            const updated = controllerRules.map((r) =>
                              r.id === rule.id ? { ...r, enabled: checked } : r,
                            )
                            setControllerRules(updated)
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeControllerRule(rule.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Post Types Settings */}
        <TabsContent value="posttypes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                按 Post Type 配置 SEO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {postTypes.map((postType) => (
                  <Card key={postType.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{postType.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {postType.count} 项
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs">URL 结构</Label>
                            <Input value={postType.urlTemplate} className="h-8 font-mono text-xs" readOnly />
                          </div>
                          <div>
                            <Label className="text-xs">标题模板</Label>
                            <Input value={postType.titleTemplate} className="h-8 font-mono text-xs" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs">Robots Meta</Label>
                            <Select value={postType.robotsMeta}>
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="index,follow">index,follow</SelectItem>
                                <SelectItem value="noindex,nofollow">noindex,nofollow</SelectItem>
                                <SelectItem value="index,nofollow">index,nofollow</SelectItem>
                                <SelectItem value="noindex,follow">noindex,follow</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Switch checked={postType.autoDescription} />
                              <Label className="text-xs">自动描述</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch checked={postType.enabled} />
                              <Label className="text-xs">已启用</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schema Settings */}
        <TabsContent value="schema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Schema.org 模板
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schemaTemplates.map((schema) => (
                  <Card key={schema.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{schema.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {schema.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              使用 {schema.usage} 次
                            </Badge>
                          </div>
                          <Switch checked={schema.enabled} />
                        </div>
                        <div>
                          <Label className="text-xs">JSON-LD 模板</Label>
                          <Textarea value={schema.template} className="h-32 font-mono text-xs" readOnly />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            预览
                          </Button>
                          <Button variant="outline" size="sm">
                            编辑模板
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sitemap Settings */}
        <TabsContent value="sitemap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                XML Sitemap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">启用 XML Sitemap</Label>
                  <p className="text-xs text-gray-600">自动生成 XML Sitemap</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">包含内容</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">文章</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">页面</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">分类</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">标签</Label>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">搜索引擎 Ping</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">自动 ping Google</Label>
                    <p className="text-xs text-gray-600">Sitemap 更新时通知 Google</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">自动 ping Bing</Label>
                    <p className="text-xs text-gray-600">Sitemap 更新时通知 Bing</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  查看 Sitemap
                </Button>
                <Button variant="outline" size="sm">
                  重新生成
                </Button>
                <span className="text-xs text-gray-500">上次生成：2024年1月15日 10:30</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">性能</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">图片懒加载</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">压缩 HTML</Label>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">压缩图片</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label className="text-xs">图片质量（%）</Label>
                  <Input defaultValue="85" className="h-8" />
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">分析</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Google Analytics ID</Label>
                  <Input placeholder="GA-XXXXXXXXX-X" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">Google Tag Manager ID</Label>
                  <Input placeholder="GTM-XXXXXXX" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">Facebook Pixel ID</Label>
                  <Input placeholder="123456789012345" className="h-8" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">追踪已登录用户</Label>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Redirects */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">重定向与 URL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">自动重定向 404</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">强制 canonical URL</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label className="text-xs">尾部斜杠</Label>
                  <Select defaultValue="remove">
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">添加尾部斜杠</SelectItem>
                      <SelectItem value="remove">移除尾部斜杠</SelectItem>
                      <SelectItem value="ignore">忽略</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Search Console */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Search Console</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Google 验证码</Label>
                  <Input placeholder="google-site-verification=..." className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">Bing 验证码</Label>
                  <Input placeholder="msvalidate.01=..." className="h-8" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">自动提交新 URL</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  连接 Search Console
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
