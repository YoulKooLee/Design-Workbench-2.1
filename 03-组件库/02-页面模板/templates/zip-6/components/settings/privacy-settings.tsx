import React, { useState } from "react"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Eye, Shield, Download, Trash2, AlertTriangle, Lock } from "lucide-react"

export default function PrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState({
    publicProfile: true,
    showEmail: false,
    showLocation: true,
    showActivity: false,
    searchable: true,
  })

  const [dataSettings, setDataSettings] = useState({
    analytics: true,
    personalization: true,
    thirdPartySharing: false,
    marketingData: false,
  })

  const [activitySettings, setActivitySettings] = useState({
    readingHistory: true,
    searchHistory: false,
    commentHistory: true,
    shareActivity: false,
  })

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">隐私设置</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          控制隐私和数据共享偏好
        </p>
      </div>

      {/* Profile Visibility */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">资料可见性</h3>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="publicProfile" className="text-sm font-medium">
                公开资料
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">让其他用户可以看到你的个人资料</p>
            </div>
            <Switch
              id="publicProfile"
              checked={profileVisibility.publicProfile}
              onCheckedChange={(checked) => setProfileVisibility({ ...profileVisibility, publicProfile: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showEmail" className="text-sm font-medium">
                显示邮箱地址
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                在公开资料中显示你的邮箱地址
              </p>
            </div>
            <Switch
              id="showEmail"
              checked={profileVisibility.showEmail}
              onCheckedChange={(checked) => setProfileVisibility({ ...profileVisibility, showEmail: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showLocation" className="text-sm font-medium">
                显示位置
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">在个人资料中显示你的位置</p>
            </div>
            <Switch
              id="showLocation"
              checked={profileVisibility.showLocation}
              onCheckedChange={(checked) => setProfileVisibility({ ...profileVisibility, showLocation: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showActivity" className="text-sm font-medium">
                显示活动状态
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                让其他人看到你是否在线或最近活跃
              </p>
            </div>
            <Switch
              id="showActivity"
              checked={profileVisibility.showActivity}
              onCheckedChange={(checked) => setProfileVisibility({ ...profileVisibility, showActivity: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="searchable" className="text-sm font-medium">
                资料可搜索
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">允许你的资料出现在搜索结果中</p>
            </div>
            <Switch
              id="searchable"
              checked={profileVisibility.searchable}
              onCheckedChange={(checked) => setProfileVisibility({ ...profileVisibility, searchable: checked })}
            />
          </div>
        </div>
      </div>

      {/* Data & Analytics */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">数据与分析</h3>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analytics" className="text-sm font-medium">
                使用情况分析
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                通过共享匿名使用数据帮助改进服务
              </p>
            </div>
            <Switch
              id="analytics"
              checked={dataSettings.analytics}
              onCheckedChange={(checked) => setDataSettings({ ...dataSettings, analytics: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="personalization" className="text-sm font-medium">
                个性化
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                使用你的数据个性化内容和推荐
              </p>
            </div>
            <Switch
              id="personalization"
              checked={dataSettings.personalization}
              onCheckedChange={(checked) => setDataSettings({ ...dataSettings, personalization: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="thirdPartySharing" className="text-sm font-medium">
                第三方数据共享
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                与可信合作方共享匿名数据用于研究
              </p>
            </div>
            <Switch
              id="thirdPartySharing"
              checked={dataSettings.thirdPartySharing}
              onCheckedChange={(checked) => setDataSettings({ ...dataSettings, thirdPartySharing: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketingData" className="text-sm font-medium">
                营销数据使用
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                使用你的数据进行定向营销和广告
              </p>
            </div>
            <Switch
              id="marketingData"
              checked={dataSettings.marketingData}
              onCheckedChange={(checked) => setDataSettings({ ...dataSettings, marketingData: checked })}
            />
          </div>
        </div>
      </div>

      {/* Activity Tracking */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">活动追踪</h3>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="readingHistory" className="text-sm font-medium">
                阅读历史
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">追踪你阅读过的文章以生成推荐</p>
            </div>
            <Switch
              id="readingHistory"
              checked={activitySettings.readingHistory}
              onCheckedChange={(checked) => setActivitySettings({ ...activitySettings, readingHistory: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="searchHistory" className="text-sm font-medium">
                搜索历史
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                保存搜索查询以改善搜索结果
              </p>
            </div>
            <Switch
              id="searchHistory"
              checked={activitySettings.searchHistory}
              onCheckedChange={(checked) => setActivitySettings({ ...activitySettings, searchHistory: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="commentHistory" className="text-sm font-medium">
                评论历史
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">记录你的评论和互动</p>
            </div>
            <Switch
              id="commentHistory"
              checked={activitySettings.commentHistory}
              onCheckedChange={(checked) => setActivitySettings({ ...activitySettings, commentHistory: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="shareActivity" className="text-sm font-medium">
                分享活动
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">让其他人看到你分享或喜欢的文章</p>
            </div>
            <Switch
              id="shareActivity"
              checked={activitySettings.shareActivity}
              onCheckedChange={(checked) => setActivitySettings({ ...activitySettings, shareActivity: checked })}
            />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Download className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">数据管理</h3>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">下载你的数据</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                获取包含文章、评论和活动在内的全部数据副本
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              请求导出
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">清除活动历史</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                移除你的阅读、搜索和互动历史
              </p>
            </div>
            <Button variant="outline" size="sm">
              清除历史
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">删除账户</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  永久删除你的账户和所有关联数据
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 border-red-200 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              删除
            </Button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground">保存隐私设置</Button>
      </div>
    </div>
  )
}
