import React, { useState } from "react"
import { Switch } from "../ui/switch"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { Bell, Mail, MessageSquare } from "lucide-react"

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    security: true,
    marketing: false,
    updates: true,
    comments: true,
    mentions: true,
  })

  const [pushNotifications, setPushNotifications] = useState({
    messages: true,
    updates: false,
    marketing: false,
    security: true,
  })

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          通知设置
        </CardTitle>
        <CardDescription>选择你想接收的通知类型和接收方式</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Mail className="h-4 w-4" />
            邮件通知
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">安全提醒</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  接收安全事件和登录尝试通知
                </p>
              </div>
              <Switch
                checked={emailNotifications.security}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, security: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">产品更新</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">产品功能和更新资讯</p>
              </div>
              <Switch
                checked={emailNotifications.updates}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, updates: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">评论与回复</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  有人评论你的文章或回复你时通知
                </p>
              </div>
              <Switch
                checked={emailNotifications.comments}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, comments: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">提及</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  有人在评论或文章中提及你时通知
                </p>
              </div>
              <Switch
                checked={emailNotifications.mentions}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, mentions: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">营销</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">技巧、优惠和推广内容</p>
              </div>
              <Switch
                checked={emailNotifications.marketing}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, marketing: checked })}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Push Notifications */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            推送通知
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">消息</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">私信和聊天通知</p>
              </div>
              <Switch
                checked={pushNotifications.messages}
                onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, messages: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">安全提醒</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">重要安全通知</p>
              </div>
              <Switch
                checked={pushNotifications.security}
                onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, security: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">产品更新</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">新功能和重要更新</p>
              </div>
              <Switch
                checked={pushNotifications.updates}
                onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, updates: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">营销</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">推广通知和优惠</p>
              </div>
              <Switch
                checked={pushNotifications.marketing}
                onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, marketing: checked })}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )
}
