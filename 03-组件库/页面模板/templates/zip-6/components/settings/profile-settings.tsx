import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Camera, Save, X, User } from "lucide-react"

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Watson",
    email: "alex.watson@example.com",
    phone: "+1 (555) 123-4567",
    bio: "热爱 AI 和技术的 Prompt Engineer。喜欢创造创新解决方案，并与社区分享知识。",
    location: "San Francisco, CA",
    website: "https://alexwatson.dev",
    timezone: "America/Los_Angeles",
    language: "en",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data
  }

  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              个人资料信息
            </CardTitle>
            <CardDescription>更新你的个人信息和资料详情</CardDescription>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} size="sm">
              编辑资料
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                保存
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                取消
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src="./placeholder-user.jpg"
              alt="个人资料"
            />
            <AvatarFallback>AW</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white">头像</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">这张图片会显示在你的个人资料中</p>
            {isEditing && (
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                <Camera className="h-4 w-4 mr-2" />
                更换头像
              </Button>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid gap-4 md:gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">名字</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">姓氏</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">邮箱地址</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">电话号码</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">个人简介</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              rows={3}
              placeholder="介绍一下你自己..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">位置</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">网站</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="timezone">时区</Label>
              <Select
                value={formData.timezone}
                onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles">太平洋时间（PT）</SelectItem>
                  <SelectItem value="America/Denver">山地时间（MT）</SelectItem>
                  <SelectItem value="America/Chicago">中部时间（CT）</SelectItem>
                  <SelectItem value="America/New_York">东部时间（ET）</SelectItem>
                  <SelectItem value="Europe/London">伦敦（GMT）</SelectItem>
                  <SelectItem value="Europe/Paris">巴黎（CET）</SelectItem>
                  <SelectItem value="Asia/Tokyo">东京（JST）</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">语言</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">英语</SelectItem>
                  <SelectItem value="es">西班牙语</SelectItem>
                  <SelectItem value="fr">法语</SelectItem>
                  <SelectItem value="de">德语</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )
}
