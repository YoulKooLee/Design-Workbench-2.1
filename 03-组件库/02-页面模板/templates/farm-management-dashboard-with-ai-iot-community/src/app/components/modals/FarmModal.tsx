import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { MapPin, Users, DollarSign, Calendar } from 'lucide-react';
import { zhText } from '../localization';

interface Farm {
  id?: number;
  name: string;
  location: string;
  size: number;
  manager: string;
  crops: string[];
  livestock: number;
  status: string;
  revenue: number;
  lastInspection: string;
}

interface FarmModalProps {
  farm?: Farm | null;
  onClose: () => void;
}

export function FarmModal({ farm, onClose }: FarmModalProps) {
  const [formData, setFormData] = useState<Partial<Farm>>({
    name: '',
    location: '',
    size: 0,
    manager: '',
    crops: [],
    livestock: 0,
    status: 'active',
    revenue: 0,
    lastInspection: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const availableCrops = [
    'Corn', 'Wheat', 'Soybeans', 'Cotton', 'Barley', 'Rice', 'Tomatoes', 
    'Potatoes', 'Lettuce', 'Carrots', 'Organic Vegetables', 'Herbs'
  ];

  useEffect(() => {
    if (farm) {
      setFormData(farm);
      setSelectedCrops(farm.crops || []);
    }
  }, [farm]);

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const toggleCrop = (crop: string) => {
    const newCrops = selectedCrops.includes(crop)
      ? selectedCrops.filter(c => c !== crop)
      : [...selectedCrops, crop];
    
    setSelectedCrops(newCrops);
    updateFormData('crops', newCrops);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = '请填写农场名称';
    }

    if (!formData.location?.trim()) {
      newErrors.location = '请填写位置';
    }

    if (!formData.size || formData.size <= 0) {
      newErrors.size = '农场面积必须大于 0';
    }

    if (!formData.manager?.trim()) {
      newErrors.manager = '请填写负责人姓名';
    }

    if (selectedCrops.length === 0) {
      newErrors.crops = '请至少选择一种作物';
    }

    if (formData.livestock && formData.livestock < 0) {
      newErrors.livestock = '畜牧数量不能为负数';
    }

    if (formData.revenue && formData.revenue < 0) {
      newErrors.revenue = '营收不能为负数';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Saving farm:', { ...formData, crops: selectedCrops });
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>{farm ? '编辑农场' : '新增农场'}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">基础信息</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-xs">农场名称 *</Label>
                <Input
                  id="name"
                  placeholder="输入农场名称"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`h-8 text-xs ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="location" className="text-xs">位置 *</Label>
                <Input
                  id="location"
                  placeholder="城市、州/省、国家"
                  value={formData.location || ''}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className={`h-8 text-xs ${errors.location ? 'border-red-500' : ''}`}
                />
                {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
              </div>
              
              <div>
                <Label htmlFor="size" className="text-xs">面积（英亩）*</Label>
                <Input
                  id="size"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="0.0"
                  value={formData.size || ''}
                  onChange={(e) => updateFormData('size', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.size ? 'border-red-500' : ''}`}
                />
                {errors.size && <p className="text-xs text-red-600 mt-1">{errors.size}</p>}
              </div>
              
              <div>
                <Label htmlFor="manager" className="text-xs">农场负责人 *</Label>
                <Input
                  id="manager"
                  placeholder="负责人姓名"
                  value={formData.manager || ''}
                  onChange={(e) => updateFormData('manager', e.target.value)}
                  className={`h-8 text-xs ${errors.manager ? 'border-red-500' : ''}`}
                />
                {errors.manager && <p className="text-xs text-red-600 mt-1">{errors.manager}</p>}
              </div>
            </div>
          </div>

          {/* Crops Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">作物与生产 *</h3>
            
            <div>
              <Label className="text-xs">选择种植作物</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {availableCrops.map(crop => (
                  <div key={crop} className="flex items-center space-x-2">
                    <Checkbox
                      id={crop}
                      checked={selectedCrops.includes(crop)}
                      onCheckedChange={() => toggleCrop(crop)}
                      className="h-3 w-3"
                    />
                    <Label htmlFor={crop} className="text-xs">{zhText(crop)}</Label>
                  </div>
                ))}
              </div>
              {errors.crops && <p className="text-xs text-red-600 mt-1">{errors.crops}</p>}
              
              {selectedCrops.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600 mb-1">已选作物：</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCrops.map(crop => (
                      <Badge key={crop} variant="secondary" className="text-xs bg-green-100 text-green-800">
                        {zhText(crop)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Livestock & Financial */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">畜牧与财务</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="livestock" className="text-xs">畜牧数量</Label>
                <Input
                  id="livestock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.livestock || ''}
                  onChange={(e) => updateFormData('livestock', parseInt(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.livestock ? 'border-red-500' : ''}`}
                />
                {errors.livestock && <p className="text-xs text-red-600 mt-1">{errors.livestock}</p>}
              </div>
              
              <div>
                <Label htmlFor="revenue" className="text-xs">年营收（$）</Label>
                <Input
                  id="revenue"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.revenue || ''}
                  onChange={(e) => updateFormData('revenue', parseInt(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.revenue ? 'border-red-500' : ''}`}
                />
                {errors.revenue && <p className="text-xs text-red-600 mt-1">{errors.revenue}</p>}
              </div>
              
              <div>
                <Label htmlFor="status" className="text-xs">农场状态</Label>
                <Select value={formData.status || 'active'} onValueChange={(value) => updateFormData('status', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active" className="text-xs">活跃</SelectItem>
                    <SelectItem value="pending" className="text-xs">待处理</SelectItem>
                    <SelectItem value="inactive" className="text-xs">停用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="lastInspection" className="text-xs">上次巡检日期</Label>
                <Input
                  id="lastInspection"
                  type="date"
                  value={formData.lastInspection || ''}
                  onChange={(e) => updateFormData('lastInspection', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-xs text-blue-800">
              <div className="flex items-start space-x-2">
                <Badge className="bg-blue-100 text-blue-800 text-xs">AI 洞察</Badge>
                <div>
                  <p>基于农场面积和位置，建议：</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>安装 3-4 个土壤湿度传感器</li>
                    <li>设置自动灌溉以优化用水</li>
                    <li>结合当地情况考虑抗旱作物品种</li>
                  </ul>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} size="sm">
            取消
          </Button>
          <Button onClick={handleSubmit} size="sm" className="bg-green-600 hover:bg-green-700">
            {farm ? '更新农场' : '新增农场'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
