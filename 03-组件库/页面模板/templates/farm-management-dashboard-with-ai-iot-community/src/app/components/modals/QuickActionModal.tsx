import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { MapPin, Droplets, FileText, Bell, Clock } from 'lucide-react';

interface QuickActionModalProps {
  type?: 'farm' | 'irrigation' | 'report' | 'alert';
  onClose: () => void;
}

export function QuickActionModal({ type = 'farm', onClose }: QuickActionModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderContent = () => {
    switch (type) {
      case 'farm':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-green-600" />
              <h3 className="text-base font-semibold">新增农场</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmName" className="text-xs">农场名称</Label>
                <Input
                  id="farmName"
                  placeholder="输入农场名称"
                  value={formData.farmName || ''}
                  onChange={(e) => updateFormData('farmName', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-xs">位置</Label>
                <Input
                  id="location"
                  placeholder="城市、州/省"
                  value={formData.location || ''}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="size" className="text-xs">面积（英亩）</Label>
                <Input
                  id="size"
                  type="number"
                  placeholder="0"
                  value={formData.size || ''}
                  onChange={(e) => updateFormData('size', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="manager" className="text-xs">负责人</Label>
                <Input
                  id="manager"
                  placeholder="负责人姓名"
                  value={formData.manager || ''}
                  onChange={(e) => updateFormData('manager', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description" className="text-xs">描述</Label>
              <Textarea
                id="description"
                placeholder="农场描述..."
                value={formData.description || ''}
                onChange={(e) => updateFormData('description', e.target.value)}
                className="text-xs"
                rows={3}
              />
            </div>
          </div>
        );

      case 'irrigation':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Droplets className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold">安排灌溉</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zone" className="text-xs">区域/田块</Label>
                <Select value={formData.zone || ''} onValueChange={(value) => updateFormData('zone', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="选择区域" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="field-a-1" className="text-xs">A 地块 - 1 区</SelectItem>
                    <SelectItem value="field-a-2" className="text-xs">A 地块 - 2 区</SelectItem>
                    <SelectItem value="field-b-1" className="text-xs">B 地块 - 1 区</SelectItem>
                    <SelectItem value="greenhouse-1" className="text-xs">1 号温室</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration" className="text-xs">时长（分钟）</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={formData.duration || ''}
                  onChange={(e) => updateFormData('duration', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="startTime" className="text-xs">开始时间</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={formData.startTime || ''}
                  onChange={(e) => updateFormData('startTime', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="frequency" className="text-xs">频率</Label>
                <Select value={formData.frequency || ''} onValueChange={(value) => updateFormData('frequency', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="选择频率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once" className="text-xs">一次</SelectItem>
                    <SelectItem value="daily" className="text-xs">每天</SelectItem>
                    <SelectItem value="weekly" className="text-xs">每周</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800 text-xs">AI 建议</Badge>
              </div>
              <p className="text-xs text-blue-800">
                基于当前土壤湿度（38%）和天气预报，建议从早上 6:00 开始灌溉 45 分钟。
              </p>
            </div>
          </div>
        );

      case 'report':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-indigo-600" />
              <h3 className="text-base font-semibold">生成报表</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportType" className="text-xs">报表类型</Label>
                <Select value={formData.reportType || ''} onValueChange={(value) => updateFormData('reportType', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="选择报表类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production" className="text-xs">生产摘要</SelectItem>
                    <SelectItem value="financial" className="text-xs">财务分析</SelectItem>
                    <SelectItem value="environmental" className="text-xs">环境影响</SelectItem>
                    <SelectItem value="livestock" className="text-xs">畜牧健康</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="period" className="text-xs">时间范围</Label>
                <Select value={formData.period || ''} onValueChange={(value) => updateFormData('period', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="选择时间范围" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week" className="text-xs">过去 7 天</SelectItem>
                    <SelectItem value="month" className="text-xs">过去 30 天</SelectItem>
                    <SelectItem value="quarter" className="text-xs">上季度</SelectItem>
                    <SelectItem value="year" className="text-xs">去年</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="farms" className="text-xs">包含农场</Label>
                <Select value={formData.farms || ''} onValueChange={(value) => updateFormData('farms', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="选择农场" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs">全部农场</SelectItem>
                    <SelectItem value="green-valley" className="text-xs">Green Valley Farm</SelectItem>
                    <SelectItem value="sunrise-acres" className="text-xs">Sunrise Acres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="format" className="text-xs">格式</Label>
                <Select value={formData.format || ''} onValueChange={(value) => updateFormData('format', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="选择格式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf" className="text-xs">PDF</SelectItem>
                    <SelectItem value="excel" className="text-xs">Excel</SelectItem>
                    <SelectItem value="csv" className="text-xs">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 'alert':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-orange-600" />
              <h3 className="text-base font-semibold">发送告警</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="alertType" className="text-xs">告警类型</Label>
                <Select value={formData.alertType || ''} onValueChange={(value) => updateFormData('alertType', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="选择告警类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency" className="text-xs">紧急</SelectItem>
                    <SelectItem value="maintenance" className="text-xs">需要维护</SelectItem>
                    <SelectItem value="weather" className="text-xs">天气预警</SelectItem>
                    <SelectItem value="system" className="text-xs">系统告警</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="recipients" className="text-xs">接收人</Label>
                <Select value={formData.recipients || ''} onValueChange={(value) => updateFormData('recipients', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="选择接收人" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-managers" className="text-xs">所有农场经理</SelectItem>
                    <SelectItem value="specific-farm" className="text-xs">指定农场团队</SelectItem>
                    <SelectItem value="maintenance" className="text-xs">维护团队</SelectItem>
                    <SelectItem value="custom" className="text-xs">自定义接收人</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message" className="text-xs">消息</Label>
                <Textarea
                  id="message"
                  placeholder="输入告警消息..."
                  value={formData.message || ''}
                  onChange={(e) => updateFormData('message', e.target.value)}
                  className="text-xs"
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="urgent"
                  checked={formData.urgent || false}
                  onChange={(e) => updateFormData('urgent', e.target.checked)}
                  className="h-3 w-3"
                />
                <Label htmlFor="urgent" className="text-xs">标记为紧急</Label>
              </div>
            </div>
          </div>
        );

      default:
        return <div>未知操作类型</div>;
    }
  };

  const getActionLabel = () => {
    switch (type) {
      case 'farm': return '新增农场';
      case 'irrigation': return '安排灌溉';
      case 'report': return '生成报表';
      case 'alert': return '发送告警';
      default: return '提交';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">快捷操作</DialogTitle>
        </DialogHeader>
        
        {renderContent()}
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose} size="sm">
            取消
          </Button>
          <Button onClick={onClose} size="sm" className="bg-blue-600 hover:bg-blue-700">
            {getActionLabel()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
