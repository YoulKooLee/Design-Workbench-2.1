import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { Shield, Key, Smartphone, AlertTriangle } from "lucide-react"

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          安全设置
        </CardTitle>
        <CardDescription>管理账户安全和身份验证偏好</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Change Password */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Key className="h-4 w-4" />
                密码
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                更新密码以确保账户安全
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsChangingPassword(!isChangingPassword)}>
              修改密码
            </Button>
          </div>

          {isChangingPassword && (
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">当前密码</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">新密码</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认新密码</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="flex gap-2">
                <Button size="sm">更新密码</Button>
                <Button variant="outline" size="sm" onClick={() => setIsChangingPassword(false)}>
                  取消
                </Button>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                双因素认证
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">为账户增加额外安全层</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                双因素认证已启用。登录时需要输入身份验证器应用中的验证码。
              </p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                查看恢复码
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Login Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              登录提醒
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              有人登录你的账户时通知你
            </p>
          </div>
          <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
        </div>

        <Separator />

        {/* Active Sessions */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">活跃会话</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">当前会话</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">macOS 上的 Chrome，San Francisco, CA</p>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">当前活跃</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">移动应用</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">iPhone，2 小时前</p>
              </div>
              <Button variant="outline" size="sm">
                撤销
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )
}
