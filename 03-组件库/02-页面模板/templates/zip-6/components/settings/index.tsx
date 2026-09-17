import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card } from "../ui/card"
import ProfileSettings from "./profile-settings"
import SecuritySettings from "./security-settings"
import NotificationSettings from "./notification-settings"
import { User, Shield, Bell } from "lucide-react"

export default function SettingsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">设置</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">管理你的账户设置和偏好</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            个人资料
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            安全
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            通知
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <ProfileSettings />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <SecuritySettings />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <NotificationSettings />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
