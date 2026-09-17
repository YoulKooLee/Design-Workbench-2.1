import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Timer, Clock, DollarSign, MapPin } from 'lucide-react';
import { zhText } from '../localization';

interface TimeTrackingModalProps {
  onClose: () => void;
}

export function TimeTrackingModal({ onClose }: TimeTrackingModalProps) {
  const [formData, setFormData] = useState({
    workerId: '',
    date: new Date().toISOString().split('T')[0],
    clockIn: '',
    clockOut: '',
    breakTime: 0,
    task: '',
    location: '',
    notes: '',
    equipment: '',
    field: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const workers = [
    { id: 'P001', name: 'Carlos Rodriguez', rate: 18.50 },
    { id: 'P002', name: 'Maria Santos', rate: 22.00 },
    { id: 'P003', name: 'James Thompson', rate: 20.00 },
    { id: 'P004', name: 'Sarah Kim', rate: 16.00 },
    { id: 'P005', name: 'Mike Johnson', rate: 28.00 }
  ];

  const tasks = [
    'Crop Cultivation',
    'Equipment Operation',
    'Livestock Care',
    'Irrigation Setup',
    'Harvest Operations',
    'Field Preparation',
    'Equipment Maintenance',
    'Fence Repair',
    'Feed Distribution',
    'General Labor'
  ];

  const locations = [
    'Field A - Zone 1',
    'Field A - Zone 2',
    'Field B',
    'Field C',
    'Barn A',
    'Barn B',
    'Greenhouse 1',
    'Greenhouse 2',
    'Equipment Bay',
    'Pasture A',
    'Pasture B'
  ];

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const calculateHours = () => {
    if (formData.clockIn && formData.clockOut) {
      const start = new Date(`2024-01-01T${formData.clockIn}`);
      const end = new Date(`2024-01-01T${formData.clockOut}`);
      const diffMs = end.getTime() - start.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      return Math.max(0, diffHours - formData.breakTime);
    }
    return 0;
  };

  const calculateCost = () => {
    const selectedWorker = workers.find(w => w.id === formData.workerId);
    if (selectedWorker) {
      const totalHours = calculateHours();
      const regularHours = Math.min(totalHours, 8);
      const overtimeHours = Math.max(0, totalHours - 8);
      const regularCost = regularHours * selectedWorker.rate;
      const overtimeCost = overtimeHours * selectedWorker.rate * 1.5;
      return regularCost + overtimeCost;
    }
    return 0;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.workerId) {
      newErrors.workerId = '请选择人员';
    }

    if (!formData.date) {
      newErrors.date = '请选择日期';
    }

    if (!formData.clockIn) {
      newErrors.clockIn = '请选择上班时间';
    }

    if (!formData.clockOut) {
      newErrors.clockOut = '请选择下班时间';
    }

    if (formData.clockIn && formData.clockOut) {
      const start = new Date(`2024-01-01T${formData.clockIn}`);
      const end = new Date(`2024-01-01T${formData.clockOut}`);
      if (end <= start) {
        newErrors.clockOut = '下班时间必须晚于上班时间';
      }
    }

    if (formData.breakTime < 0 || formData.breakTime > 4) {
      newErrors.breakTime = '休息时间必须在 0-4 小时之间';
    }

    if (!formData.task) {
      newErrors.task = '请选择任务';
    }

    if (!formData.location) {
      newErrors.location = '请选择位置';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const totalHours = calculateHours();
      const cost = calculateCost();
      const overtimeHours = Math.max(0, totalHours - 8);
      
      console.log('Saving time log:', {
        ...formData,
        totalHours,
        overtimeHours,
        cost
      });
      onClose();
    }
  };

  const selectedWorker = workers.find(w => w.id === formData.workerId);
  const totalHours = calculateHours();
  const overtimeHours = Math.max(0, totalHours - 8);
  const cost = calculateCost();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center space-x-2">
            <Timer className="h-5 w-5 text-blue-600" />
            <span>工时记录</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Worker & Date */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">基础信息</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workerId" className="text-xs">人员 *</Label>
                <Select value={formData.workerId} onValueChange={(value) => updateFormData('workerId', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.workerId ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="选择人员" />
                  </SelectTrigger>
                  <SelectContent>
                    {workers.map(worker => (
                      <SelectItem key={worker.id} value={worker.id} className="text-xs">
                        <div>
                          <div>{worker.name}</div>
                          <div className="text-gray-500">${worker.rate}/小时</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.workerId && <p className="text-xs text-red-600 mt-1">{errors.workerId}</p>}
              </div>
              
              <div>
                <Label htmlFor="date" className="text-xs">日期 *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateFormData('date', e.target.value)}
                  className={`h-8 text-xs ${errors.date ? 'border-red-500' : ''}`}
                />
                {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
              </div>
            </div>
          </div>

          {/* Time Tracking */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">时间详情</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="clockIn" className="text-xs">上班时间 *</Label>
                <Input
                  id="clockIn"
                  type="time"
                  value={formData.clockIn}
                  onChange={(e) => updateFormData('clockIn', e.target.value)}
                  className={`h-8 text-xs ${errors.clockIn ? 'border-red-500' : ''}`}
                />
                {errors.clockIn && <p className="text-xs text-red-600 mt-1">{errors.clockIn}</p>}
              </div>
              
              <div>
                <Label htmlFor="clockOut" className="text-xs">下班时间 *</Label>
                <Input
                  id="clockOut"
                  type="time"
                  value={formData.clockOut}
                  onChange={(e) => updateFormData('clockOut', e.target.value)}
                  className={`h-8 text-xs ${errors.clockOut ? 'border-red-500' : ''}`}
                />
                {errors.clockOut && <p className="text-xs text-red-600 mt-1">{errors.clockOut}</p>}
              </div>
              
              <div>
                <Label htmlFor="breakTime" className="text-xs">休息时间（小时）</Label>
                <Input
                  id="breakTime"
                  type="number"
                  step="0.25"
                  min="0"
                  max="4"
                  value={formData.breakTime}
                  onChange={(e) => updateFormData('breakTime', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.breakTime ? 'border-red-500' : ''}`}
                />
                {errors.breakTime && <p className="text-xs text-red-600 mt-1">{errors.breakTime}</p>}
              </div>
            </div>

            {/* Time Summary */}
            {totalHours > 0 && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="font-medium text-blue-900">总工时</div>
                    <div className="text-blue-700">{totalHours.toFixed(2)} 小时</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900">常规/加班</div>
                    <div className="text-blue-700">
                      {Math.min(totalHours, 8).toFixed(2)}h / {overtimeHours.toFixed(2)}h
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900">总成本</div>
                    <div className="text-blue-700">${cost.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Work Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">工作详情</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task" className="text-xs">主要任务 *</Label>
                <Select value={formData.task} onValueChange={(value) => updateFormData('task', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.task ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="选择任务" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks.map(task => (
                      <SelectItem key={task} value={task} className="text-xs">{zhText(task)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.task && <p className="text-xs text-red-600 mt-1">{errors.task}</p>}
              </div>
              
              <div>
                <Label htmlFor="location" className="text-xs">工作地点 *</Label>
                <Select value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.location ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="选择位置" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location} className="text-xs">{zhText(location)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
              </div>
              
              <div>
                <Label htmlFor="equipment" className="text-xs">使用设备</Label>
                <Input
                  id="equipment"
                  placeholder="拖拉机、工具等"
                  value={formData.equipment}
                  onChange={(e) => updateFormData('equipment', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              
              <div>
                <Label htmlFor="field" className="text-xs">具体田块/区域</Label>
                <Input
                  id="field"
                  placeholder="北区、2 号畜舍等"
                  value={formData.field}
                  onChange={(e) => updateFormData('field', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-xs">工作备注</Label>
            <Textarea
              id="notes"
              placeholder="描述已完成工作、遇到的问题等"
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              className="text-xs"
              rows={3}
            />
          </div>

          {/* Cost Breakdown */}
          {selectedWorker && totalHours > 0 && (
            <Alert className="border-green-200 bg-green-50">
              <DollarSign className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-xs text-green-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>成本拆分：</strong>
                    <ul className="mt-1 space-y-1">
                      <li>常规工时：{Math.min(totalHours, 8).toFixed(2)} 小时 × ${selectedWorker.rate} = ${(Math.min(totalHours, 8) * selectedWorker.rate).toFixed(2)}</li>
                      {overtimeHours > 0 && (
                        <li>加班工时：{overtimeHours.toFixed(2)} 小时 × ${(selectedWorker.rate * 1.5).toFixed(2)} = ${(overtimeHours * selectedWorker.rate * 1.5).toFixed(2)}</li>
                      )}
                      <li><strong>合计：${cost.toFixed(2)}</strong></li>
                    </ul>
                  </div>
                  <div>
                    <strong>人员信息：</strong>
                    <ul className="mt-1 space-y-1">
                      <li>姓名：{selectedWorker.name}</li>
                      <li>费率：${selectedWorker.rate}/小时</li>
                      <li>加班费率：${(selectedWorker.rate * 1.5).toFixed(2)}/小时</li>
                    </ul>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Overtime Warning */}
          {overtimeHours > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-xs text-yellow-800">
                <strong>加班提醒：</strong>该人员将产生 {overtimeHours.toFixed(2)} 小时加班，
                成本为常规费率的 1.5 倍（${(selectedWorker?.rate || 0 * 1.5).toFixed(2)}/小时）。
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} size="sm">
            取消
          </Button>
          <Button onClick={handleSubmit} size="sm" className="bg-blue-600 hover:bg-blue-700">
            保存工时记录
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
