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
import { Settings, Zap, Route, Save, RotateCcw, Trash2, Code, Plus, X } from "lucide-react"

export function SuperCacheSettingsContent() {
  const [cacheEnabled, setCacheEnabled] = useState(true)
  const [defaultTtl, setDefaultTtl] = useState("3600")
  const [maxSize, setMaxSize] = useState("500")
  const [controllerRules, setControllerRules] = useState([
    {
      id: 1,
      controller: "HomeController",
      function: "index",
      ttl: "7200",
      enabled: true,
      conditions: ["public", "authenticated"],
    },
    {
      id: 2,
      controller: "PostController",
      function: "show",
      ttl: "3600",
      enabled: true,
      conditions: ["public"],
    },
  ])

  const [routeRules, setRouteRules] = useState([
    {
      id: 1,
      pattern: "^/posts/([0-9]+)$",
      rewrite: "/post/$1",
      ttl: "3600",
      enabled: true,
    },
    {
      id: 2,
      pattern: "^/category/(.+)$",
      rewrite: "/posts?category=$1",
      ttl: "1800",
      enabled: true,
    },
  ])

  const addControllerRule = () => {
    const newRule = {
      id: Date.now(),
      controller: "",
      function: "",
      ttl: "3600",
      enabled: true,
      conditions: [],
    }
    setControllerRules([...controllerRules, newRule])
  }

  const removeControllerRule = (id: number) => {
    setControllerRules(controllerRules.filter((rule) => rule.id !== id))
  }

  const addRouteRule = () => {
    const newRule = {
      id: Date.now(),
      pattern: "",
      rewrite: "",
      ttl: "3600",
      enabled: true,
    }
    setRouteRules([...routeRules, newRule])
  }

  const removeRouteRule = (id: number) => {
    setRouteRules(routeRules.filter((rule) => rule.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            Super Cache 设置
          </h1>
          <p className="text-gray-600 dark:text-gray-400">为网站配置高级缓存策略</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            清理缓存
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
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-xs text-gray-600">缓存项目</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-xs text-gray-600">命中率</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">5.8%</div>
            <div className="text-xs text-gray-600">未命中率</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">342MB</div>
            <div className="text-xs text-gray-600">缓存大小</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">45ms</div>
            <div className="text-xs text-gray-600">平均响应</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">99.9%</div>
            <div className="text-xs text-gray-600">可用率</div>
          </div>
        </Card>
      </div>

      {/* Main Settings */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">总览</TabsTrigger>
          <TabsTrigger value="controllers">Controllers</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="advanced">高级</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                基础设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">启用缓存</Label>
                  <p className="text-xs text-gray-600">开启或关闭缓存系统</p>
                </div>
                <Switch checked={cacheEnabled} onCheckedChange={setCacheEnabled} />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="default-ttl">默认缓存时间（秒）</Label>
                  <Input
                    id="default-ttl"
                    value={defaultTtl}
                    onChange={(e) => setDefaultTtl(e.target.value)}
                    placeholder="3600"
                  />
                </div>
                <div>
                  <Label htmlFor="max-size">最大大小（MB）</Label>
                  <Input id="max-size" value={maxSize} onChange={(e) => setMaxSize(e.target.value)} placeholder="500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cleanup-interval">清理间隔（分钟）</Label>
                  <Input id="cleanup-interval" defaultValue="60" />
                </div>
                <div>
                  <Label htmlFor="cache-driver">缓存驱动</Label>
                  <Select defaultValue="redis">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redis">Redis</SelectItem>
                      <SelectItem value="memcached">Memcached</SelectItem>
                      <SelectItem value="file">文件系统</SelectItem>
                      <SelectItem value="database">数据库</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">压缩数据</Label>
                    <p className="text-xs text-gray-600">使用 gzip 压缩缓存</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">自动清理</Label>
                    <p className="text-xs text-gray-600">自动删除过期缓存</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">调试模式</Label>
                    <p className="text-xs text-gray-600">显示调试信息</p>
                  </div>
                  <Switch />
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
                  按 Controller 配置缓存
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
                      <div className="flex-1 grid grid-cols-2 gap-4">
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
                        <div>
                          <Label className="text-xs">TTL（秒）</Label>
                          <Input
                            value={rule.ttl}
                            onChange={(e) => {
                              const updated = controllerRules.map((r) =>
                                r.id === rule.id ? { ...r, ttl: e.target.value } : r,
                              )
                              setControllerRules(updated)
                            }}
                            placeholder="3600"
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">条件</Label>
                          <div className="flex gap-1 flex-wrap">
                            {["public", "authenticated", "mobile", "paginated"].map((condition) => (
                              <Badge
                                key={condition}
                                variant={rule.conditions.includes(condition) ? "default" : "outline"}
                                className="text-xs cursor-pointer"
                                onClick={() => {
                                  const updated = controllerRules.map((r) => {
                                    if (r.id === rule.id) {
                                      const conditions = r.conditions.includes(condition)
                                        ? r.conditions.filter((c) => c !== condition)
                                        : [...r.conditions, condition]
                                      return { ...r, conditions }
                                    }
                                    return r
                                  })
                                  setControllerRules(updated)
                                }}
                              >
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
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

        {/* Routes Settings */}
        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  配置 Route Rewrite
                </CardTitle>
                <Button size="sm" onClick={addRouteRule}>
                  <Plus className="h-4 w-4 mr-2" />
                  添加 Route
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeRules.map((rule) => (
                  <Card key={rule.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs">模式（Regex）</Label>
                          <Input
                            value={rule.pattern}
                            onChange={(e) => {
                              const updated = routeRules.map((r) =>
                                r.id === rule.id ? { ...r, pattern: e.target.value } : r,
                              )
                              setRouteRules(updated)
                            }}
                            placeholder="^/posts/([0-9]+)$"
                            className="h-8 font-mono text-xs"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">重写至</Label>
                          <Input
                            value={rule.rewrite}
                            onChange={(e) => {
                              const updated = routeRules.map((r) =>
                                r.id === rule.id ? { ...r, rewrite: e.target.value } : r,
                              )
                              setRouteRules(updated)
                            }}
                            placeholder="/post/$1"
                            className="h-8 font-mono text-xs"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">TTL（秒）</Label>
                          <Input
                            value={rule.ttl}
                            onChange={(e) => {
                              const updated = routeRules.map((r) =>
                                r.id === rule.id ? { ...r, ttl: e.target.value } : r,
                              )
                              setRouteRules(updated)
                            }}
                            placeholder="3600"
                            className="h-8"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={(checked) => {
                            const updated = routeRules.map((r) => (r.id === rule.id ? { ...r, enabled: checked } : r))
                            setRouteRules(updated)
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeRouteRule(rule.id)}
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

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Cache Headers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">缓存响应头</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Cache-Control</Label>
                  <Input defaultValue="public, max-age=3600" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">ETag</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">已启用</SelectItem>
                      <SelectItem value="disabled">已停用</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Vary 响应头</Label>
                  <Input defaultValue="Accept-Encoding, User-Agent" className="h-8" />
                </div>
              </CardContent>
            </Card>

            {/* Cache Invalidation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">缓存失效策略</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">文章更新时自动清理</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">清理相关页面</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label className="text-xs">失效事件</Label>
                  <Textarea placeholder="post.updated&#10;user.login&#10;comment.created" className="h-20 text-xs" />
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">性能</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">连接池大小</Label>
                  <Input defaultValue="10" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">序列化</Label>
                  <Select defaultValue="json">
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="serialize">PHP Serialize</SelectItem>
                      <SelectItem value="msgpack">MessagePack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">持久连接</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">监控</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">启用日志</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label className="text-xs">日志级别</Label>
                  <Select defaultValue="info">
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">调试</SelectItem>
                      <SelectItem value="info">信息</SelectItem>
                      <SelectItem value="warning">警告</SelectItem>
                      <SelectItem value="error">错误</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">收集指标</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
