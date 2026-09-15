import React, { useState } from "react"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Slider } from "../ui/slider"
import { Settings, Palette, Globe, Type } from "lucide-react"

export default function PreferencesSettings() {
  const [appearance, setAppearance] = useState({
    theme: "system",
    compactMode: false,
    animations: true,
    highContrast: false,
  })

  const [language, setLanguage] = useState({
    interface: "en",
    content: "en",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  })

  const [content, setContent] = useState({
    autoSave: true,
    spellCheck: true,
    wordWrap: true,
    lineNumbers: false,
    fontSize: [14],
    autoPreview: true,
  })

  const [behavior, setBehavior] = useState({
    confirmDelete: true,
    autoLogout: false,
    logoutTime: 30,
    keyboardShortcuts: true,
    soundEffects: false,
  })

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">偏好设置</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          自定义你的应用体验和行为
        </p>
      </div>

      {/* Appearance */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">外观</h3>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="theme">主题</Label>
              <Select
                value={appearance.theme}
                onValueChange={(value) => setAppearance({ ...appearance, theme: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">浅色</SelectItem>
                  <SelectItem value="dark">深色</SelectItem>
                  <SelectItem value="system">跟随系统</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compactMode" className="text-sm font-medium">
                紧凑模式
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                减少间距和内边距，让界面更紧凑
              </p>
            </div>
            <Switch
              id="compactMode"
              checked={appearance.compactMode}
              onCheckedChange={(checked) => setAppearance({ ...appearance, compactMode: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="animations" className="text-sm font-medium">
                动画
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">启用平滑过渡和动画</p>
            </div>
            <Switch
              id="animations"
              checked={appearance.animations}
              onCheckedChange={(checked) => setAppearance({ ...appearance, animations: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="highContrast" className="text-sm font-medium">
                高对比度
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">提高对比度以改善可访问性</p>
            </div>
            <Switch
              id="highContrast"
              checked={appearance.highContrast}
              onCheckedChange={(checked) => setAppearance({ ...appearance, highContrast: checked })}
            />
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">语言与地区</h3>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="interfaceLanguage">界面语言</Label>
              <Select
                value={language.interface}
                onValueChange={(value) => setLanguage({ ...language, interface: value })}
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
            <div className="space-y-2">
              <Label htmlFor="contentLanguage">内容语言</Label>
              <Select value={language.content} onValueChange={(value) => setLanguage({ ...language, content: value })}>
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dateFormat">日期格式</Label>
              <Select
                value={language.dateFormat}
                onValueChange={(value) => setLanguage({ ...language, dateFormat: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">月/日/年</SelectItem>
                  <SelectItem value="DD/MM/YYYY">日/月/年</SelectItem>
                  <SelectItem value="YYYY-MM-DD">年-月-日</SelectItem>
                  <SelectItem value="DD MMM YYYY">日 月 年</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeFormat">时间格式</Label>
              <Select
                value={language.timeFormat}
                onValueChange={(value) => setLanguage({ ...language, timeFormat: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12 小时制</SelectItem>
                  <SelectItem value="24h">24 小时制</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Type className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">内容编辑器</h3>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoSave" className="text-sm font-medium">
                自动保存
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">输入时自动保存你的工作</p>
            </div>
            <Switch
              id="autoSave"
              checked={content.autoSave}
              onCheckedChange={(checked) => setContent({ ...content, autoSave: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="spellCheck" className="text-sm font-medium">
                拼写检查
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">写作时启用拼写检查</p>
            </div>
            <Switch
              id="spellCheck"
              checked={content.spellCheck}
              onCheckedChange={(checked) => setContent({ ...content, spellCheck: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="wordWrap" className="text-sm font-medium">
                自动换行
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">在编辑器中换行显示长文本</p>
            </div>
            <Switch
              id="wordWrap"
              checked={content.wordWrap}
              onCheckedChange={(checked) => setContent({ ...content, wordWrap: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="lineNumbers" className="text-sm font-medium">
                行号
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">在编辑器中显示行号</p>
            </div>
            <Switch
              id="lineNumbers"
              checked={content.lineNumbers}
              onCheckedChange={(checked) => setContent({ ...content, lineNumbers: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontSize">字号：{content.fontSize[0]}px</Label>
            <Slider
              id="fontSize"
              value={content.fontSize}
              onValueChange={(value) => setContent({ ...content, fontSize: value })}
              max={24}
              min={10}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoPreview" className="text-sm font-medium">
                自动预览
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">输入时自动更新预览</p>
            </div>
            <Switch
              id="autoPreview"
              checked={content.autoPreview}
              onCheckedChange={(checked) => setContent({ ...content, autoPreview: checked })}
            />
          </div>
        </div>
      </div>

      {/* Behavior */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">行为</h3>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="confirmDelete" className="text-sm font-medium">
                删除确认
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">删除项目之前显示确认对话框</p>
            </div>
            <Switch
              id="confirmDelete"
              checked={behavior.confirmDelete}
              onCheckedChange={(checked) => setBehavior({ ...behavior, confirmDelete: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="keyboardShortcuts" className="text-sm font-medium">
                键盘快捷键
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                启用键盘快捷键以更快导航
              </p>
            </div>
            <Switch
              id="keyboardShortcuts"
              checked={behavior.keyboardShortcuts}
              onCheckedChange={(checked) => setBehavior({ ...behavior, keyboardShortcuts: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="soundEffects" className="text-sm font-medium">
                音效
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">为通知和交互播放声音</p>
            </div>
            <Switch
              id="soundEffects"
              checked={behavior.soundEffects}
              onCheckedChange={(checked) => setBehavior({ ...behavior, soundEffects: checked })}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoLogout" className="text-sm font-medium">
                  自动退出登录
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  一段时间不活动后自动退出登录
                </p>
              </div>
              <Switch
                id="autoLogout"
                checked={behavior.autoLogout}
                onCheckedChange={(checked) => setBehavior({ ...behavior, autoLogout: checked })}
              />
            </div>

            {behavior.autoLogout && (
              <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <Label htmlFor="logoutTime">多久后退出（分钟）</Label>
                  <Select
                    value={behavior.logoutTime.toString()}
                    onValueChange={(value) => setBehavior({ ...behavior, logoutTime: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 分钟</SelectItem>
                      <SelectItem value="30">30 分钟</SelectItem>
                      <SelectItem value="60">1 小时</SelectItem>
                      <SelectItem value="120">2 小时</SelectItem>
                      <SelectItem value="240">4 小时</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">恢复默认</Button>
        <Button className="bg-primary text-primary-foreground">保存偏好</Button>
      </div>
    </div>
  )
}
