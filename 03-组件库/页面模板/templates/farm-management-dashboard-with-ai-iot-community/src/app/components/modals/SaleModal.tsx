import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { formatCurrency } from '../ui/currency-utils';
import { DollarSign, Calculator } from 'lucide-react';
import { zhText } from '../localization';

interface Sale {
  id?: string;
  saleDate: string;
  crop: string;
  variety: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalRevenue: number;
  buyer: string;
  buyerContact: string;
  contractType: string;
  paymentStatus: string;
  paymentDate: string;
  field: string;
  qualityGrade: string;
  moistureContent: number;
  proteinContent: number;
  transportCost: number;
  commissionFee: number;
  netRevenue: number;
  costOfProduction: number;
  grossProfit: number;
  profitMargin: number;
  notes: string;
}

interface SaleModalProps {
  sale?: Sale | null;
  onClose: () => void;
}

const crops = [
  { name: 'Wheat', varieties: ['HD-2967', 'PBW-343', 'WH-147', 'HD-3086'] },
  { name: 'Rice', varieties: ['Basmati 1121', 'IR-64', 'Swarna', 'Pusa Basmati'] },
  { name: 'Cotton', varieties: ['BT Cotton', 'Desi Cotton', 'Hybrid Cotton'] },
  { name: 'Sugarcane', varieties: ['CoM 0265', 'Co 86032', 'CoM 88230'] },
  { name: 'Soybeans', varieties: ['JS 335', 'MACS 450', 'JS 9305'] },
  { name: 'Maize', varieties: ['HQPM-1', 'Shaktiman-1', 'DHM-117'] }
];

const contractTypes = ['Spot Sale', 'Forward Contract', 'Premium Contract', 'Direct Sale', 'Futures Contract', 'Pool Contract'];
const qualityGrades = ['Premium', 'Export Grade', 'Standard', 'Feed', 'Organic Certified', 'Food Grade'];
const units = ['quintals', 'tonnes', 'kg'];

export function SaleModal({ sale, onClose }: SaleModalProps) {
  const [formData, setFormData] = useState<Partial<Sale>>({
    saleDate: new Date().toISOString().split('T')[0],
    crop: '',
    variety: '',
    quantity: 0,
    unit: 'quintals',
    pricePerUnit: 0,
    totalRevenue: 0,
    buyer: '',
    buyerContact: '',
    contractType: 'Spot Sale',
    paymentStatus: 'pending',
    paymentDate: '',
    field: '',
    qualityGrade: 'Standard',
    moistureContent: 0,
    proteinContent: 0,
    transportCost: 0,
    commissionFee: 0,
    netRevenue: 0,
    costOfProduction: 0,
    grossProfit: 0,
    profitMargin: 0,
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (sale) {
      setFormData(sale);
    }
  }, [sale]);

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [key]: value };
      
      // Auto-calculate derived values
      if (key === 'quantity' || key === 'pricePerUnit') {
        updated.totalRevenue = (updated.quantity || 0) * (updated.pricePerUnit || 0);
      }
      
      if (key === 'totalRevenue' || key === 'transportCost' || key === 'commissionFee') {
        const totalRev = updated.totalRevenue || 0;
        const transport = updated.transportCost || 0;
        const commission = updated.commissionFee || 0;
        updated.netRevenue = totalRev - transport - commission;
      }
      
      if (key === 'netRevenue' || key === 'costOfProduction') {
        const netRev = updated.netRevenue || 0;
        const cost = updated.costOfProduction || 0;
        updated.grossProfit = netRev - cost;
        updated.profitMargin = netRev > 0 ? (updated.grossProfit / netRev) * 100 : 0;
      }
      
      return updated;
    });
    
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.saleDate) newErrors.saleDate = '请选择销售日期';
    if (!formData.crop) newErrors.crop = '请选择作物类型';
    if (!formData.variety) newErrors.variety = '请选择品种';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = '数量必须大于 0';
    if (!formData.pricePerUnit || formData.pricePerUnit <= 0) newErrors.pricePerUnit = '单价必须大于 0';
    if (!formData.buyer?.trim()) newErrors.buyer = '请填写买家名称';
    if (!formData.buyerContact?.trim()) newErrors.buyerContact = '请填写买家联系方式';
    if (!formData.field) newErrors.field = '请填写田块';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Saving sale:', formData);
      onClose();
    }
  };

  const getVarietiesForCrop = (cropName: string) => {
    const crop = crops.find(c => c.name === cropName);
    return crop ? crop.varieties : [];
  };

  const selectedCropVarieties = getVarietiesForCrop(formData.crop || '');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>{sale ? '编辑销售记录' : '新增销售'}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Sale Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">销售详情</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="saleDate" className="text-xs">销售日期 *</Label>
                <Input
                  id="saleDate"
                  type="date"
                  value={formData.saleDate || ''}
                  onChange={(e) => updateFormData('saleDate', e.target.value)}
                  className={`h-8 text-xs ${errors.saleDate ? 'border-red-500' : ''}`}
                />
                {errors.saleDate && <p className="text-xs text-red-600 mt-1">{errors.saleDate}</p>}
              </div>
              
              <div>
                <Label htmlFor="crop" className="text-xs">作物类型 *</Label>
                <Select value={formData.crop || ''} onValueChange={(value) => {
                  updateFormData('crop', value);
                  updateFormData('variety', '');
                }}>
                  <SelectTrigger className={`h-8 text-xs ${errors.crop ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="选择作物" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map(crop => (
                      <SelectItem key={crop.name} value={crop.name} className="text-xs">{zhText(crop.name)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.crop && <p className="text-xs text-red-600 mt-1">{errors.crop}</p>}
              </div>
              
              <div>
                <Label htmlFor="variety" className="text-xs">品种 *</Label>
                <Select 
                  value={formData.variety || ''} 
                  onValueChange={(value) => updateFormData('variety', value)}
                  disabled={!formData.crop}
                >
                  <SelectTrigger className={`h-8 text-xs ${errors.variety ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="选择品种" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCropVarieties.map(variety => (
                      <SelectItem key={variety} value={variety} className="text-xs">{variety}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.variety && <p className="text-xs text-red-600 mt-1">{errors.variety}</p>}
              </div>
              
              <div>
                <Label htmlFor="field" className="text-xs">田块 *</Label>
                <Input
                  id="field"
                  placeholder="田块位置"
                  value={formData.field || ''}
                  onChange={(e) => updateFormData('field', e.target.value)}
                  className={`h-8 text-xs ${errors.field ? 'border-red-500' : ''}`}
                />
                {errors.field && <p className="text-xs text-red-600 mt-1">{errors.field}</p>}
              </div>
            </div>
          </div>

          {/* Quantity and Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">数量与定价</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="quantity" className="text-xs">数量 *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.quantity || ''}
                  onChange={(e) => updateFormData('quantity', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.quantity ? 'border-red-500' : ''}`}
                />
                {errors.quantity && <p className="text-xs text-red-600 mt-1">{errors.quantity}</p>}
              </div>
              
              <div>
                <Label htmlFor="unit" className="text-xs">单位</Label>
                <Select value={formData.unit || 'quintals'} onValueChange={(value) => updateFormData('unit', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit} className="text-xs">{zhText(unit)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="pricePerUnit" className="text-xs">每{zhText(formData.unit)}价格（₹）*</Label>
                <Input
                  id="pricePerUnit"
                  type="number"
                  step="1"
                  min="0"
                  value={formData.pricePerUnit || ''}
                  onChange={(e) => updateFormData('pricePerUnit', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.pricePerUnit ? 'border-red-500' : ''}`}
                />
                {errors.pricePerUnit && <p className="text-xs text-red-600 mt-1">{errors.pricePerUnit}</p>}
              </div>
              
              <div>
                <Label htmlFor="totalRevenue" className="text-xs">总营收（₹）</Label>
                <Input
                  id="totalRevenue"
                  type="number"
                  value={formData.totalRevenue?.toFixed(0) || '0'}
                  readOnly
                  className="h-8 text-xs bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">自动计算</p>
              </div>
            </div>
          </div>

          {/* Buyer and Contract Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">买家信息</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="buyer" className="text-xs">买家名称 *</Label>
                <Input
                  id="buyer"
                  placeholder="公司或个人名称"
                  value={formData.buyer || ''}
                  onChange={(e) => updateFormData('buyer', e.target.value)}
                  className={`h-8 text-xs ${errors.buyer ? 'border-red-500' : ''}`}
                />
                {errors.buyer && <p className="text-xs text-red-600 mt-1">{errors.buyer}</p>}
              </div>
              
              <div>
                <Label htmlFor="buyerContact" className="text-xs">买家联系方式 *</Label>
                <Input
                  id="buyerContact"
                  placeholder="电话或邮箱"
                  value={formData.buyerContact || ''}
                  onChange={(e) => updateFormData('buyerContact', e.target.value)}
                  className={`h-8 text-xs ${errors.buyerContact ? 'border-red-500' : ''}`}
                />
                {errors.buyerContact && <p className="text-xs text-red-600 mt-1">{errors.buyerContact}</p>}
              </div>
              
              <div>
                <Label htmlFor="contractType" className="text-xs">合同类型</Label>
                <Select value={formData.contractType || 'Spot Sale'} onValueChange={(value) => updateFormData('contractType', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypes.map(type => (
                      <SelectItem key={type} value={type} className="text-xs">{zhText(type)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Quality and Payment */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">质量与付款</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="qualityGrade" className="text-xs">质量等级</Label>
                <Select value={formData.qualityGrade || 'Standard'} onValueChange={(value) => updateFormData('qualityGrade', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityGrades.map(grade => (
                      <SelectItem key={grade} value={grade} className="text-xs">{zhText(grade)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="moistureContent" className="text-xs">含水率（%）</Label>
                <Input
                  id="moistureContent"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.moistureContent || ''}
                  onChange={(e) => updateFormData('moistureContent', parseFloat(e.target.value) || 0)}
                  className="h-8 text-xs"
                />
              </div>
              
              <div>
                <Label htmlFor="paymentStatus" className="text-xs">付款状态</Label>
                <Select value={formData.paymentStatus || 'pending'} onValueChange={(value) => updateFormData('paymentStatus', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending" className="text-xs">待处理</SelectItem>
                    <SelectItem value="paid" className="text-xs">已付款</SelectItem>
                    <SelectItem value="overdue" className="text-xs">逾期</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.paymentStatus === 'paid' && (
                <div>
                  <Label htmlFor="paymentDate" className="text-xs">付款日期</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={formData.paymentDate || ''}
                    onChange={(e) => updateFormData('paymentDate', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Costs and Profit */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">成本分析</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="transportCost" className="text-xs">运输成本（₹）</Label>
                  <Input
                    id="transportCost"
                    type="number"
                    step="1"
                    min="0"
                    value={formData.transportCost || ''}
                    onChange={(e) => updateFormData('transportCost', parseFloat(e.target.value) || 0)}
                    className="h-8 text-xs"
                  />
                </div>
                
                <div>
                  <Label htmlFor="commissionFee" className="text-xs">佣金费用（₹）</Label>
                  <Input
                    id="commissionFee"
                    type="number"
                    step="1"
                    min="0"
                    value={formData.commissionFee || ''}
                    onChange={(e) => updateFormData('commissionFee', parseFloat(e.target.value) || 0)}
                    className="h-8 text-xs"
                  />
                </div>
                
                <div>
                  <Label htmlFor="costOfProduction" className="text-xs">生产成本（₹）</Label>
                  <Input
                    id="costOfProduction"
                    type="number"
                    step="1"
                    min="0"
                    value={formData.costOfProduction || ''}
                    onChange={(e) => updateFormData('costOfProduction', parseFloat(e.target.value) || 0)}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-green-900 mb-3">财务摘要</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>总营收：</span>
                    <span>{formatCurrency(formData.totalRevenue || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>净营收：</span>
                    <span>{formatCurrency(formData.netRevenue || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>毛利润：</span>
                    <span className="font-medium text-green-700">{formatCurrency(formData.grossProfit || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>利润率：</span>
                    <span className="font-medium text-green-700">{(formData.profitMargin || 0).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-xs">补充备注</Label>
            <Textarea
              id="notes"
              placeholder="质量备注、交付条款、特殊条件等"
              value={formData.notes || ''}
              onChange={(e) => updateFormData('notes', e.target.value)}
              className="text-xs"
              rows={2}
            />
          </div>

          {/* Financial Summary Alert */}
          {formData.totalRevenue && formData.totalRevenue > 0 && (
            <Alert className="border-green-200 bg-green-50">
              <Calculator className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-xs text-green-800">
                <strong>销售摘要：</strong>营收 {formatCurrency(formData.totalRevenue || 0)}，
                利润 {formatCurrency(formData.grossProfit || 0)}
                （利润率 {(formData.profitMargin || 0).toFixed(1)}%），
                单价 {formatCurrency(formData.pricePerUnit || 0)}/{zhText(formData.unit)}。
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} size="sm">
            取消
          </Button>
          <Button onClick={handleSubmit} size="sm" className="bg-green-600 hover:bg-green-700">
            {sale ? '更新销售' : '新增销售'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
