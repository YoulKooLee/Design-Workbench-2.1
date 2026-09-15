import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Smartphone,
  Mail,
  Save
} from 'lucide-react';

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    alerts: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC-5',
    units: 'metric'
  });

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">设置</h1>
          <p className="text-sm text-gray-600">管理账户和应用偏好</p>
        </div>
        <Button className="bg-gray-600 hover:bg-gray-700">
          <Save className="h-4 w-4 mr-1" />
          保存更改
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="text-xs">资料</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs">通知</TabsTrigger>
          <TabsTrigger value="preferences" className="text-xs">偏好</TabsTrigger>
          <TabsTrigger value="security" className="text-xs">安全</TabsTrigger>
          <TabsTrigger value="data" className="text-xs">数据</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">John Smith</h3>
                <p className="text-sm text-gray-600">农场经理</p>
                <Button size="sm" variant="outline" className="mt-2 text-xs">
                  更换头像
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-xs">名</Label>
                <Input id="firstName" defaultValue="John" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs">姓</Label>
                <Input id="lastName" defaultValue="Smith" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs">邮箱</Label>
                <Input id="email" type="email" defaultValue="john.smith@example.com" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs">电话</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" className="h-8 text-xs" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="role" className="text-xs">角色</Label>
                <Select defaultValue="manager">
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin" className="text-xs">管理员</SelectItem>
                    <SelectItem value="manager" className="text-xs">农场经理</SelectItem>
                    <SelectItem value="worker" className="text-xs">农场工人</SelectItem>
                    <SelectItem value="viewer" className="text-xs">查看者</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              通知偏好
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">邮件通知</p>
                  <p className="text-xs text-gray-600">通过邮件接收通知</p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, email: checked}))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">短信通知</p>
                  <p className="text-xs text-gray-600">通过短信接收关键告警</p>
                </div>
                <Switch 
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, sms: checked}))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">推送通知</p>
                  <p className="text-xs text-gray-600">浏览器推送通知</p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, push: checked}))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">系统告警</p>
                  <p className="text-xs text-gray-600">关键系统和设备告警</p>
                </div>
                <Switch 
                  checked={notifications.alerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, alerts: checked}))}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4">告警类型</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                '设备故障',
                '天气预警',
                '灌溉问题',
                '畜牧健康',
                '作物病害',
                '安全事件',
                '维护到期',
                '可收获提醒'
              ].map((alertType, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-xs">{alertType}</span>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4">应用偏好</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="theme" className="text-xs">主题</Label>
                <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({...prev, theme: value}))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light" className="text-xs">浅色</SelectItem>
                    <SelectItem value="dark" className="text-xs">深色</SelectItem>
                    <SelectItem value="auto" className="text-xs">自动</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language" className="text-xs">语言</Label>
                <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({...prev, language: value}))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en" className="text-xs">中文</SelectItem>
                    <SelectItem value="es" className="text-xs">西班牙语</SelectItem>
                    <SelectItem value="fr" className="text-xs">法语</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone" className="text-xs">时区</Label>
                <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({...prev, timezone: value}))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8" className="text-xs">太平洋时间（UTC-8）</SelectItem>
                    <SelectItem value="UTC-5" className="text-xs">东部时间（UTC-5）</SelectItem>
                    <SelectItem value="UTC+0" className="text-xs">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="units" className="text-xs">单位</Label>
                <Select value={preferences.units} onValueChange={(value) => setPreferences(prev => ({...prev, units: value}))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric" className="text-xs">公制</SelectItem>
                    <SelectItem value="imperial" className="text-xs">英制</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              安全设置
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-xs">当前密码</Label>
                <Input id="currentPassword" type="password" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-xs">新密码</Label>
                <Input id="newPassword" type="password" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-xs">确认新密码</Label>
                <Input id="confirmPassword" type="password" className="h-8 text-xs" />
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                更新密码
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4">双因素认证</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">启用 2FA 提升安全性</p>
                <p className="text-xs text-gray-600">使用手机验证登录尝试</p>
              </div>
              <Button size="sm" variant="outline">
                启用 2FA
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              数据管理
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="text-sm font-medium">导出农场数据</p>
                  <p className="text-xs text-gray-600">以 CSV/JSON 下载全部农场数据</p>
                </div>
                <Button size="sm" variant="outline">
                  导出
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="text-sm font-medium">导入数据</p>
                  <p className="text-xs text-gray-600">从其他农场管理系统导入数据</p>
                </div>
                <Button size="sm" variant="outline">
                  导入
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-red-200 rounded">
                <div>
                  <p className="text-sm font-medium text-red-700">删除账户</p>
                  <p className="text-xs text-red-600">永久删除账户和所有数据</p>
                </div>
                <Button size="sm" variant="destructive">
                  删除
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
