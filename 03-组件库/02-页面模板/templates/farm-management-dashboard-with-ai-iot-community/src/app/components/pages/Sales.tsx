import React, { useState } from 'react';
import { DataTable } from '../DataTable';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { formatCurrency, formatCurrencyCompact } from '../ui/currency-utils';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar, 
  Users, 
  Package,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  FileText,
  PieChart
} from 'lucide-react';
import { SaleModal } from '../modals/SaleModal';
import { zhDate, zhText } from '../localization';

export function Sales() {
  const [selectedFinancialYear, setSelectedFinancialYear] = useState('2024-25');
  const [showAddSale, setShowAddSale] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [activeTab, setActiveTab] = useState('sales');

  const financialYears = [
    '2024-25',
    '2023-24', 
    '2022-23',
    '2021-22'
  ];

  const salesData = [
    {
      id: 'S001',
      saleDate: '2024-08-15',
      crop: 'Wheat',
      variety: 'HD-2967',
      quantity: 25,           // quintals
      unit: 'quintals',
      pricePerUnit: 2700,     // ₹2,700 per quintal
      totalRevenue: 67500,    // ₹67,500
      buyer: 'Punjab Grains Ltd',
      buyerContact: '+91 98765 12345',
      contractType: 'Spot Sale',
      paymentStatus: 'paid',
      paymentDate: '2024-08-20',
      field: 'Field A - Zone 1',
      qualityGrade: 'Premium',
      moistureContent: 12.5,
      proteinContent: 13.2,
      transportCost: 1500,    // ₹1,500
      commissionFee: 1350,    // ₹1,350
      netRevenue: 64650,      // ₹64,650
      costOfProduction: 35000, // ₹35,000
      grossProfit: 29650,     // ₹29,650
      profitMargin: 45.6
    },
    {
      id: 'S002',
      saleDate: '2024-07-28',
      crop: 'Rice',
      variety: 'Basmati 1121',
      quantity: 32,           // quintals
      unit: 'quintals',
      pricePerUnit: 4250,     // ₹4,250 per quintal
      totalRevenue: 136000,   // ₹1,36,000
      buyer: 'Export Rice Mills',
      buyerContact: '+91 98765 23456',
      contractType: 'Forward Contract',
      paymentStatus: 'paid',
      paymentDate: '2024-08-05',
      field: 'Field B',
      qualityGrade: 'Export Grade',
      moistureContent: 15.2,
      proteinContent: 8.9,
      transportCost: 2500,    // ₹2,500
      commissionFee: 2720,    // ₹2,720
      netRevenue: 130780,     // ₹1,30,780
      costOfProduction: 64000, // ₹64,000
      grossProfit: 66780,     // ₹66,780
      profitMargin: 51.0
    },
    {
      id: 'S003',
      saleDate: '2024-08-05',
      crop: 'Cotton',
      variety: 'BT Cotton',
      quantity: 18,           // quintals
      unit: 'quintals',
      pricePerUnit: 5800,     // ₹5,800 per quintal
      totalRevenue: 104400,   // ₹1,04,400
      buyer: 'Textile Mills Pvt Ltd',
      buyerContact: '+91 98765 34567',
      contractType: 'Premium Contract',
      paymentStatus: 'pending',
      paymentDate: null,
      field: 'Field C - Cotton',
      qualityGrade: 'Premium',
      moistureContent: 8.5,
      proteinContent: 0,
      transportCost: 2000,    // ₹2,000
      commissionFee: 2088,    // ₹2,088
      netRevenue: 100312,     // ₹1,00,312
      costOfProduction: 49500, // ₹49,500
      grossProfit: 50812,     // ₹50,812
      profitMargin: 50.6
    },
    {
      id: 'S004',
      saleDate: '2024-06-20',
      crop: 'Sugarcane',
      variety: 'CoM 0265',
      quantity: 150,          // tonnes
      unit: 'tonnes',
      pricePerUnit: 350,      // ₹350 per tonne
      totalRevenue: 52500,    // ₹52,500
      buyer: 'Sugar Factory Coop',
      buyerContact: '+91 98765 45678',
      contractType: 'Direct Sale',
      paymentStatus: 'paid',
      paymentDate: '2024-06-25',
      field: 'Field D',
      qualityGrade: 'Standard',
      moistureContent: 11.8,
      proteinContent: 0,
      transportCost: 3000,    // ₹3,000
      commissionFee: 1050,    // ₹1,050
      netRevenue: 48450,      // ₹48,450
      costOfProduction: 26250, // ₹26,250
      grossProfit: 22200,     // ₹22,200
      profitMargin: 45.8
    },
    {
      id: 'S005',
      saleDate: '2024-05-10',
      crop: 'Soybeans',
      variety: 'JS 335',
      quantity: 12,           // quintals
      unit: 'quintals',
      pricePerUnit: 4200,     // ₹4,200 per quintal
      totalRevenue: 50400,    // ₹50,400
      buyer: 'Oil Processing Co',
      buyerContact: '+91 98765 56789',
      contractType: 'Futures Contract',
      paymentStatus: 'paid',
      paymentDate: '2024-05-15',
      field: 'Field E',
      qualityGrade: 'Standard',
      moistureContent: 9.5,
      proteinContent: 38.5,
      transportCost: 800,     // ₹800
      commissionFee: 1008,    // ₹1,008
      netRevenue: 48592,      // ₹48,592
      costOfProduction: 21600, // ₹21,600
      grossProfit: 26992,     // ₹26,992
      profitMargin: 55.5
    }
  ];

  const buyerAnalytics = [
    {
      buyer: 'Punjab Grains Ltd',
      totalPurchases: 4,
      totalQuantity: 89,
      totalRevenue: 210000,   // ₹2,10,000
      avgPrice: 2360,         // ₹2,360 average price
      lastPurchase: '2024-08-15',
      paymentHistory: 'excellent',
      relationship: 'long-term'
    },
    {
      buyer: 'Export Rice Mills',
      totalPurchases: 3,
      totalQuantity: 56,
      totalRevenue: 238000,   // ₹2,38,000
      avgPrice: 4250,         // ₹4,250 average price
      lastPurchase: '2024-07-28',
      paymentHistory: 'good',
      relationship: 'regular'
    },
    {
      buyer: 'Textile Mills Pvt Ltd',
      totalPurchases: 2,
      totalQuantity: 22,
      totalRevenue: 127600,   // ₹1,27,600
      avgPrice: 5800,         // ₹5,800 average price
      lastPurchase: '2024-08-05',
      paymentHistory: 'fair',
      relationship: 'new'
    }
  ];

  const monthlyTrends = [
    { month: 'Jan', revenue: 152000, quantity: 210, avgPrice: 724 },
    { month: 'Feb', revenue: 185000, quantity: 285, avgPrice: 649 },
    { month: 'Mar', revenue: 221000, quantity: 320, avgPrice: 691 },
    { month: 'Apr', revenue: 198000, quantity: 295, avgPrice: 671 },
    { month: 'May', revenue: 50400, quantity: 12, avgPrice: 4200 },
    { month: 'Jun', revenue: 52500, quantity: 150, avgPrice: 350 },
    { month: 'Jul', revenue: 136000, quantity: 32, avgPrice: 4250 },
    { month: 'Aug', revenue: 171900, quantity: 43, avgPrice: 3998 }
  ];

  const salesColumns = [
    {
      key: 'saleDate',
      label: '销售日期',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{zhDate(value)}</span>
        </div>
      )
    },
    {
      key: 'crop',
      label: '作物',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{zhText(value)}</div>
          <div className="text-gray-500 text-xs">{row.variety}</div>
          <div className="text-gray-400 text-xs">{zhText(row.field)}</div>
        </div>
      )
    },
    {
      key: 'quantity',
      label: '数量',
      sortable: true,
      render: (value: number, row: any) => (
        <div className="text-xs">
          <div>{value.toLocaleString()}</div>
          <div className="text-gray-500">{zhText(row.unit)}</div>
        </div>
      )
    },
    {
      key: 'pricePerUnit',
      label: '单价',
      sortable: true,
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'totalRevenue',
      label: '营收',
      sortable: true,
      render: (value: number) => (
        <div className="text-xs">
          <div className="font-medium">{formatCurrency(value)}</div>
        </div>
      )
    },
    {
      key: 'buyer',
      label: '买家',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{zhText(row.contractType)}</div>
        </div>
      )
    },
    {
      key: 'qualityGrade',
      label: '质量',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <Badge className={`text-xs mb-1 ${
            value === 'Premium' || value === 'Export Grade' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {zhText(value)}
          </Badge>
          <div className="text-xs text-gray-500">
            含水率 {row.moistureContent}%
          </div>
        </div>
      )
    },
    {
      key: 'paymentStatus',
      label: '付款',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <Badge className={`text-xs mb-1 ${
            value === 'paid' ? 'bg-green-100 text-green-800' :
            value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {zhText(value)}
          </Badge>
          {row.paymentDate && (
            <div className="text-xs text-gray-500">
              {zhDate(row.paymentDate)}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'grossProfit',
      label: '利润',
      sortable: true,
      render: (value: number, row: any) => (
        <div className="text-xs">
          <div className="font-medium text-green-600">{formatCurrency(value)}</div>
          <div className="text-gray-500">{row.profitMargin.toFixed(1)}% 利润率</div>
        </div>
      )
    }
  ];

  const buyerColumns = [
    {
      key: 'buyer',
      label: '买家',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{zhText(row.relationship)}合作伙伴</div>
        </div>
      )
    },
    {
      key: 'totalPurchases',
      label: '采购次数',
      sortable: true,
      render: (value: number) => `${value} 笔交易`
    },
    {
      key: 'totalQuantity',
      label: '总数量',
      sortable: true,
      render: (value: number) => `${value.toLocaleString()} 单位`
    },
    {
      key: 'totalRevenue',
      label: '总营收',
      sortable: true,
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'avgPrice',
      label: '均价',
      sortable: true,
      render: (value: number) => `${formatCurrency(value)}/单位`
    },
    {
      key: 'lastPurchase',
      label: '最近采购',
      sortable: true,
      render: (value: string) => zhDate(value)
    },
    {
      key: 'paymentHistory',
      label: '付款记录',
      render: (value: string) => (
        <Badge className={`text-xs ${
          value === 'excellent' ? 'bg-green-100 text-green-800' :
          value === 'good' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {zhText(value)}
        </Badge>
      )
    }
  ];

  const calculateYearlyStats = () => {
    const totalRevenue = salesData.reduce((sum, sale) => sum + sale.totalRevenue, 0);
    const totalCosts = salesData.reduce((sum, sale) => sum + sale.costOfProduction + sale.transportCost + sale.commissionFee, 0);
    const totalProfit = salesData.reduce((sum, sale) => sum + sale.grossProfit, 0);
    const totalQuantity = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
    const avgPrice = totalRevenue / totalQuantity;
    const profitMargin = (totalProfit / totalRevenue) * 100;
    
    return {
      totalRevenue,
      totalCosts,
      totalProfit,
      totalQuantity,
      avgPrice,
      profitMargin,
      transactionCount: salesData.length
    };
  };

  const yearlyStats = calculateYearlyStats();

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">销售与营收</h1>
          <p className="text-sm text-gray-600">按年度跟踪作物销售和财务表现</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedFinancialYear} onValueChange={setSelectedFinancialYear}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {financialYears.map(year => (
                <SelectItem key={year} value={year} className="text-xs">
                  财年 {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            导出
          </Button>
          <Button 
            onClick={() => setShowAddSale(true)}
            size="sm" 
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            新增销售
          </Button>
        </div>
      </div>

      {/* Financial Year Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">总营收</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(yearlyStats.totalRevenue)}</p>
              <p className="text-xs text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                较去年 +12.5%
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">毛利润</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(yearlyStats.totalProfit)}</p>
              <p className="text-xs text-green-600">{yearlyStats.profitMargin.toFixed(1)}% 利润率</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">总数量</p>
              <p className="text-2xl font-semibold text-gray-900">{yearlyStats.totalQuantity}</p>
              <p className="text-xs text-blue-600">已售单位</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">均价</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(Math.round(yearlyStats.avgPrice))}</p>
              <p className="text-xs text-blue-600">每单位</p>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">交易数</p>
              <p className="text-2xl font-semibold text-gray-900">{yearlyStats.transactionCount}</p>
              <p className="text-xs text-orange-600">已完成销售</p>
            </div>
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">活跃买家</p>
              <p className="text-2xl font-semibold text-gray-900">{buyerAnalytics.length}</p>
              <p className="text-xs text-purple-600">合作关系</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Alert className="border-green-200 bg-green-50">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-xs text-green-800">
            <strong>营收增长：</strong>2024-25 财年营收较去年增长 12.5%，
            主要由 BT Cotton 和出口级 Basmati 大米的高价销售带动。
          </AlertDescription>
        </Alert>

        <Alert className="border-yellow-200 bg-yellow-50">
          <DollarSign className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-xs text-yellow-800">
            <strong>待收款：</strong>Textile Mills Pvt Ltd 8月5日棉花销售款 ₹1,04,400 尚未到账。
            需要跟进以确保及时付款。
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales" className="text-xs">销售记录</TabsTrigger>
          <TabsTrigger value="buyers" className="text-xs">买家分析</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs">市场趋势</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <DataTable
            data={salesData}
            columns={salesColumns}
            title={`销售记录 - 财年 ${selectedFinancialYear}`}
            searchPlaceholder="搜索销售记录..."
            onAdd={() => setShowAddSale(true)}
            onEdit={(sale) => setEditingSale(sale)}
            onDelete={(sale) => console.log('Delete sale:', sale)}
          />
        </TabsContent>

        <TabsContent value="buyers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <DataTable
                data={buyerAnalytics}
                columns={buyerColumns}
                title="买家关系分析"
                searchPlaceholder="搜索买家..."
                onAdd={() => console.log('Add buyer')}
                onEdit={(buyer) => console.log('Edit buyer:', buyer)}
                onDelete={(buyer) => console.log('Delete buyer:', buyer)}
              />
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="text-base font-semibold mb-3">按营收排名的买家</h3>
                <div className="space-y-3">
                  {buyerAnalytics.slice(0, 3).map((buyer, index) => (
                    <div key={buyer.buyer} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">{buyer.buyer}</span>
                        <span>{formatCurrencyCompact(buyer.totalRevenue)}</span>
                      </div>
                      <Progress 
                        value={(buyer.totalRevenue / buyerAnalytics[0].totalRevenue) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-base font-semibold mb-3">付款表现</h3>
                <div className="space-y-2">
                  {['excellent', 'good', 'fair'].map(status => {
                    const count = buyerAnalytics.filter(b => b.paymentHistory === status).length;
                    return (
                      <div key={status} className="flex justify-between items-center text-xs">
                        <span>{zhText(status)}</span>
                        <Badge className={`${
                          status === 'excellent' ? 'bg-green-100 text-green-800' :
                          status === 'good' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {count} 个买家
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">月度销售趋势</h3>
              <div className="space-y-3">
                {monthlyTrends.map((month) => (
                  <div key={month.month} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{zhText(month.month)}</span>
                      <span>{formatCurrencyCompact(month.revenue)}</span>
                    </div>
                    <Progress 
                      value={Math.min((month.revenue / 250000) * 100, 100)} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{month.quantity.toLocaleString()} 单位</span>
                      <span>{formatCurrency(month.avgPrice)}/单位</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">作物表现</h3>
              <div className="space-y-3">
                {['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Soybeans'].map(crop => {
                  const cropSales = salesData.filter(s => s.crop === crop);
                  const totalRevenue = cropSales.reduce((sum, s) => sum + s.totalRevenue, 0);
                  const avgMargin = cropSales.reduce((sum, s) => sum + s.profitMargin, 0) / cropSales.length || 0;
                  
                  return (
                    <div key={crop} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">{zhText(crop)}</span>
                        <span>{avgMargin.toFixed(1)}% 利润率</span>
                      </div>
                      <Progress 
                        value={Math.min((totalRevenue / 140000) * 100, 100)} 
                        className="h-2"
                      />
                      <div className="text-xs text-gray-500">
                        营收 {formatCurrencyCompact(totalRevenue)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4 lg:col-span-2">
              <h3 className="text-base font-semibold mb-3">合同类型分析</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">按合同类型统计营收</h4>
                  {['Spot Sale', 'Forward Contract', 'Premium Contract', 'Direct Sale', 'Futures Contract'].map(type => {
                    const typeSales = salesData.filter(s => s.contractType === type);
                    const revenue = typeSales.reduce((sum, s) => sum + s.totalRevenue, 0);
                    
                    return (
                      <div key={type} className="flex justify-between items-center text-xs">
                        <span>{zhText(type)}</span>
                        <div className="text-right">
                          <div>{formatCurrencyCompact(revenue)}</div>
                          <div className="text-gray-500">{typeSales.length} 笔销售</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">质量等级分布</h4>
                  {['Premium', 'Export Grade', 'Standard'].map(grade => {
                    const gradeSales = salesData.filter(s => s.qualityGrade === grade);
                    const avgPrice = gradeSales.reduce((sum, s) => sum + s.pricePerUnit, 0) / gradeSales.length || 0;
                    
                    return (
                      <div key={grade} className="flex justify-between items-center text-xs">
                        <span>{zhText(grade)}</span>
                        <div className="text-right">
                          <div>{formatCurrency(Math.round(avgPrice))}/单位</div>
                          <div className="text-gray-500">{gradeSales.length} 笔销售</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Sale Modal */}
      {(showAddSale || editingSale) && (
        <SaleModal
          sale={editingSale}
          onClose={() => {
            setShowAddSale(false);
            setEditingSale(null);
          }}
        />
      )}
    </div>
  );
}
