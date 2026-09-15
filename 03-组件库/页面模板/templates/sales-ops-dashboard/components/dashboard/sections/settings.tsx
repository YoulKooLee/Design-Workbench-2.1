import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  User,
  Bell,
  Shield,
  Palette,
  Link2,
  Database,
  Mail,
  Smartphone,
  Globe,
  Key,
  RefreshCw,
  Check,
  ExternalLink,
  Zap,
} from "lucide-react";

const integrations = [
  {
    id: "salesforce",
    name: "Salesforce",
    description: "同步联系人和商机",
    connected: true,
    lastSync: "2 小时前",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "营销自动化和 CRM",
    connected: true,
    lastSync: "5 分钟前",
  },
  {
    id: "slack",
    name: "Slack",
    description: "团队通知和提醒",
    connected: true,
    lastSync: "实时",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "邮件跟踪和同步",
    connected: false,
    lastSync: null,
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "会议日程安排",
    connected: false,
    lastSync: null,
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "视频会议集成",
    connected: true,
    lastSync: "1 小时前",
  },
];

const notificationSettings = [
  {
    id: "deal_updates",
    label: "交易更新",
    description: "交易状态变化时接收通知",
    email: true,
    push: true,
  },
  {
    id: "team_activity",
    label: "团队动态",
    description: "团队表现和里程碑更新",
    email: true,
    push: false,
  },
  {
    id: "pipeline_alerts",
    label: "管道提醒",
    description: "销售管道变化和风险提醒",
    email: true,
    push: true,
  },
  {
    id: "forecast_updates",
    label: "预测更新",
    description: "每周预测摘要报表",
    email: true,
    push: false,
  },
  {
    id: "customer_health",
    label: "客户健康度",
    description: "客户健康分下降时提醒",
    email: false,
    push: true,
  },
];

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState(notificationSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const toggleNotification = (id: string, type: "email" | "push") => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, [type]: !n[type] } : n))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">设置</h2>
        <p className="text-sm text-muted-foreground mt-1">
          管理账户偏好和第三方集成
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-secondary border border-border p-1">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <User className="w-4 h-4 mr-2" />
            个人资料
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <Bell className="w-4 h-4 mr-2" />
            通知
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <Link2 className="w-4 h-4 mr-2" />
            集成
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <Shield className="w-4 h-4 mr-2" />
            安全
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">个人信息</CardTitle>
              <CardDescription>更新个人资料和偏好设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 bg-secondary">
                  <AvatarFallback className="bg-accent text-accent-foreground text-2xl font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    更换头像
                  </Button>
                  <p className="text-xs text-muted-foreground">支持 JPG、PNG 或 GIF，最大 2MB。</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">名字</Label>
                  <Input
                    id="firstName"
                    defaultValue="John"
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">姓氏</Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@company.com"
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">角色</Label>
                  <Select defaultValue="manager">
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">管理员</SelectItem>
                      <SelectItem value="manager">销售经理</SelectItem>
                      <SelectItem value="rep">销售代表</SelectItem>
                      <SelectItem value="viewer">查看者</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">时区</Label>
                <Select defaultValue="pst">
                  <SelectTrigger className="bg-secondary border-border w-full md:w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">太平洋时间 (PT)</SelectItem>
                    <SelectItem value="mst">山地时间 (MT)</SelectItem>
                    <SelectItem value="cst">中部时间 (CT)</SelectItem>
                    <SelectItem value="est">东部时间 (ET)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">显示偏好</CardTitle>
              <CardDescription>自定义数据展示方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">深色模式</p>
                    <p className="text-sm text-muted-foreground">界面使用深色主题</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">货币格式</p>
                    <p className="text-sm text-muted-foreground">按你的地区显示货币</p>
                  </div>
                </div>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-[120px] bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">紧凑视图</p>
                    <p className="text-sm text-muted-foreground">在更少空间内显示更多数据</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  保存更改
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">通知偏好</CardTitle>
              <CardDescription>选择接收通知的方式和时机</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="grid grid-cols-[1fr,80px,80px] gap-4 pb-3 border-b border-border text-sm text-muted-foreground">
                  <span>通知类型</span>
                  <span className="text-center flex items-center justify-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    邮件
                  </span>
                  <span className="text-center flex items-center justify-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    推送
                  </span>
                </div>
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className="grid grid-cols-[1fr,80px,80px] gap-4 py-4 border-b border-border last:border-0 animate-in fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div>
                      <p className="font-medium text-foreground">{notification.label}</p>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={notification.email}
                        onCheckedChange={() => toggleNotification(notification.id, "email")}
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={notification.push}
                        onCheckedChange={() => toggleNotification(notification.id, "push")}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">已连接服务</CardTitle>
              <CardDescription>管理第三方集成</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration, index) => (
                  <div
                    key={integration.id}
                    className={`p-4 rounded-lg border transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                      integration.connected
                        ? "bg-secondary/50 border-border hover:border-accent/50"
                        : "bg-secondary/20 border-border hover:border-muted-foreground/30"
                    }`}
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            integration.connected ? "bg-accent/20" : "bg-muted"
                          }`}
                        >
                          <Zap
                            className={`w-5 h-5 ${
                              integration.connected ? "text-accent" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{integration.name}</p>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          integration.connected
                            ? "bg-accent/20 text-accent border-accent/30"
                            : "bg-muted text-muted-foreground border-border"
                        }
                      >
                        {integration.connected ? "已连接" : "未连接"}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      {integration.connected ? (
                        <>
                          <span className="text-xs text-muted-foreground">
                            上次同步: {integration.lastSync}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8">
                              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                              同步
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                              断开
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-xs text-muted-foreground">未配置</span>
                          <Button
                            size="sm"
                            className="h-8 bg-accent hover:bg-accent/90 text-accent-foreground"
                          >
                            连接
                            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">密码与认证</CardTitle>
              <CardDescription>管理账户安全设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">当前密码</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="bg-secondary border-border focus:border-accent max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">新密码</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="bg-secondary border-border focus:border-accent max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认新密码</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="bg-secondary border-border focus:border-accent max-w-md"
                  />
                </div>
                <Button variant="outline">更新密码</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">双因素认证</CardTitle>
              <CardDescription>为账户增加一层安全保护</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">认证器应用</p>
                    <p className="text-sm text-muted-foreground">
                      使用认证器应用生成 2FA 验证码
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-accent/20 text-accent border-accent/30">已启用</Badge>
                  <Button variant="outline" size="sm">
                    管理
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">活跃会话</CardTitle>
              <CardDescription>管理已登录设备</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { device: "MacBook Pro", location: "San Francisco, CA", current: true, time: "现在" },
                  { device: "iPhone 15", location: "San Francisco, CA", current: false, time: "2 小时前" },
                  { device: "Chrome on Windows", location: "New York, NY", current: false, time: "1 天前" },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border animate-in fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {session.device}
                          {session.current && (
                            <Badge className="ml-2 bg-accent/20 text-accent border-accent/30 text-xs">
                              当前
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.location} • {session.time}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        撤销
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
