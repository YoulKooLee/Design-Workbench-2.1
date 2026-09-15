import React, { useState } from 'react';
import { DataTable } from '../DataTable';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { formatCurrency, formatCurrencyCompact } from '../ui/currency-utils';
import { 
  Wrench, 
  Truck, 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  MapPin,
  Plus,
  Settings,
  Fuel,
  Activity
} from 'lucide-react';
import { EquipmentModal } from '../modals/EquipmentModal';
import { zhDate, zhText } from '../localization';

export function Equipment() {
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');

  const equipmentData = [
    {
      id: 'EQ001',
      name: 'Mahindra 8000',
      type: 'Tractor',
      category: 'Heavy Machinery',
      model: '8000',
      brand: 'Mahindra',
      year: 2020,
      serialNumber: 'MH8000-2020001',
      status: 'operational',
      location: 'Barn A',
      purchasePrice: 2367500,    // ₹23.67L (converted from $285k)
      currentValue: 2035750,     // ₹20.36L (converted from $245k)
      hoursUsed: 1245,
      fuelEfficiency: 18.5,
      lastMaintenance: '2024-07-15',
      nextMaintenance: '2024-09-15',
      maintenanceCost: 124500,   // ₹1.24L (converted from $15k)
      operatingCost: 377.75,     // ₹378/hr (converted from $45.50/hr)
      condition: 'excellent'
    },
    {
      id: 'EQ002',
      name: 'Sonalika DI-60',
      type: 'Combine Harvester',
      category: 'Heavy Machinery',
      model: 'DI-60',
      brand: 'Sonalika',
      year: 2019,
      serialNumber: 'SL60001',
      status: 'operational',
      location: 'Field Storage',
      purchasePrice: 4316000,    // ₹43.16L (converted from $520k)
      currentValue: 3486000,     // ₹34.86L (converted from $420k)
      hoursUsed: 890,
      fuelEfficiency: 12.3,
      lastMaintenance: '2024-08-01',
      nextMaintenance: '2024-10-01',
      maintenanceCost: 232400,   // ₹2.32L (converted from $28k)
      operatingCost: 649.28,     // ₹649/hr (converted from $78.25/hr)
      condition: 'good'
    },
    {
      id: 'EQ003',
      name: 'Tafe 9500 DI',
      type: 'Tractor',
      category: 'Heavy Machinery',
      model: '9500 DI',
      brand: 'TAFE',
      year: 2018,
      serialNumber: 'TF9500001',
      status: 'maintenance',
      location: 'Service Bay',
      purchasePrice: 2282500,    // ₹22.83L (converted from $275k)
      currentValue: 1535500,     // ₹15.36L (converted from $185k)
      hoursUsed: 2156,
      fuelEfficiency: 16.8,
      lastMaintenance: '2024-08-05',
      nextMaintenance: '2024-08-20',
      maintenanceCost: 182600,   // ₹1.83L (converted from $22k)
      operatingCost: 437.83,     // ₹438/hr (converted from $52.75/hr)
      condition: 'fair'
    },
    {
      id: 'EQ004',
      name: 'Kubota MU4501',
      type: 'Utility Tractor',
      category: 'Medium Machinery',
      model: 'MU4501',
      brand: 'Kubota',
      year: 2021,
      serialNumber: 'KU4501001',
      status: 'operational',
      location: 'Greenhouse Area',
      purchasePrice: 1203500,    // ₹12.04L (converted from $145k)
      currentValue: 1037500,     // ₹10.38L (converted from $125k)
      hoursUsed: 756,
      fuelEfficiency: 22.1,
      lastMaintenance: '2024-07-20',
      nextMaintenance: '2024-09-20',
      maintenanceCost: 70550,    // ₹71K (converted from $8.5k)
      operatingCost: 269.75,     // ₹270/hr (converted from $32.50/hr)
      condition: 'excellent'
    },
    {
      id: 'EQ005',
      name: 'Maruti Suzuki Utility',
      type: 'Utility Vehicle',
      category: 'Light Equipment',
      model: 'Super Carry',
      brand: 'Maruti Suzuki',
      year: 2022,
      serialNumber: 'MS2022001',
      status: 'out-of-service',
      location: 'Repair Shop',
      purchasePrice: 153550,     // ₹1.54L (converted from $18.5k)
      currentValue: 132800,      // ₹1.33L (converted from $16k)
      hoursUsed: 445,
      fuelEfficiency: 35.2,
      lastMaintenance: '2024-08-08',
      nextMaintenance: '2024-08-15',
      maintenanceCost: 23240,    // ₹23K (converted from $2.8k)
      operatingCost: 101.68,     // ₹102/hr (converted from $12.25/hr)
      condition: 'poor'
    }
  ];

  const maintenanceData = [
    {
      id: 'M001',
      equipmentId: 'EQ001',
      equipmentName: 'Mahindra 8000',
      type: 'Scheduled',
      description: 'Oil change and filter replacement',
      scheduledDate: '2024-09-15',
      status: 'pending',
      technician: 'Ravi Kumar',
      estimatedCost: 7055,      // ₹7,055 (converted from $850)
      estimatedHours: 3
    },
    {
      id: 'M002',
      equipmentId: 'EQ003',
      equipmentName: 'Tafe 9500 DI',
      type: 'Repair',
      description: 'Hydraulic pump replacement',
      scheduledDate: '2024-08-20',
      status: 'in-progress',
      technician: 'Suresh Patil',
      estimatedCost: 265600,    // ₹2,65,600 (converted from $3,200)
      estimatedHours: 8
    },
    {
      id: 'M003',
      equipmentId: 'EQ005',
      equipmentName: 'Maruti Suzuki Utility',
      type: 'Emergency',
      description: 'Engine diagnostics and repair',
      scheduledDate: '2024-08-15',
      status: 'pending',
      technician: 'Vikram Singh',
      estimatedCost: 124500,    // ₹1,24,500 (converted from $1,500)
      estimatedHours: 6
    }
  ];

  const equipmentColumns = [
    {
      key: 'name',
      label: '设备',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.brand} {row.model} ({row.year})</div>
          <div className="text-gray-400 text-xs">序列号：{row.serialNumber}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: '类型',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <Badge className={`text-xs mb-1 ${
            row.category === 'Heavy Machinery' ? 'bg-red-100 text-red-800' :
            row.category === 'Medium Machinery' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {zhText(value)}
          </Badge>
          <div className="text-xs text-gray-500">{zhText(row.category)}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: '状态',
      sortable: true,
      filterable: true
    },
    {
      key: 'location',
      label: '位置',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{zhText(value)}</span>
        </div>
      )
    },
    {
      key: 'hoursUsed',
      label: '使用小时',
      sortable: true,
      render: (value: number) => (
        <div className="text-xs">
          <div>{value.toLocaleString()} 小时</div>
          <div className="text-gray-500">累计运行</div>
        </div>
      )
    },
    {
      key: 'condition',
      label: '成色',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge className={`text-xs ${
          value === 'excellent' ? 'bg-green-100 text-green-800' :
          value === 'good' ? 'bg-blue-100 text-blue-800' :
          value === 'fair' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {zhText(value)}
        </Badge>
      )
    },
    {
      key: 'currentValue',
      label: '当前价值',
      sortable: true,
      render: (value: number) => formatCurrencyCompact(value)
    },
    {
      key: 'nextMaintenance',
      label: '下次维护',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{zhDate(value)}</span>
        </div>
      )
    }
  ];

  const maintenanceColumns = [
    {
      key: 'equipmentName',
      label: '设备',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.equipmentId}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: '类型',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge className={`text-xs ${
          value === 'Emergency' ? 'bg-red-100 text-red-800' :
          value === 'Repair' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {zhText(value)}
        </Badge>
      )
    },
    {
      key: 'description',
      label: '说明',
      filterable: true
    },
    {
      key: 'scheduledDate',
      label: '计划日期',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{zhDate(value)}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: '状态',
      sortable: true,
      filterable: true
    },
    {
      key: 'technician',
      label: '技术员',
      sortable: true,
      filterable: true
    },
    {
      key: 'estimatedCost',
      label: '预估费用',
      sortable: true,
      render: (value: number) => formatCurrencyCompact(value)
    },
    {
      key: 'estimatedHours',
      label: '预估小时',
      sortable: true,
      render: (value: number) => `${value} 小时`
    }
  ];

  const equipmentStats = {
    total: equipmentData.length,
    operational: equipmentData.filter(e => e.status === 'operational').length,
    maintenance: equipmentData.filter(e => e.status === 'maintenance').length,
    outOfService: equipmentData.filter(e => e.status === 'out-of-service').length,
    totalValue: equipmentData.reduce((sum, e) => sum + e.currentValue, 0),
    avgHours: Math.round(equipmentData.reduce((sum, e) => sum + e.hoursUsed, 0) / equipmentData.length),
    monthlyMaintenanceCost: maintenanceData.reduce((sum, m) => sum + m.estimatedCost, 0)
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">设备管理</h1>
          <p className="text-sm text-gray-600">管理农机、工具和设备库存</p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            维护排程
          </Button>
          <Button 
            onClick={() => setShowAddEquipment(true)}
            size="sm" 
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            新增设备
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">设备总数</p>
              <p className="text-2xl font-semibold text-gray-900">{equipmentStats.total}</p>
              <p className="text-xs text-green-600">{equipmentStats.operational} 台正常运行</p>
            </div>
            <Truck className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">机队价值</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(equipmentStats.totalValue)}</p>
              <p className="text-xs text-blue-600">当前市场价值</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">平均使用</p>
              <p className="text-2xl font-semibold text-gray-900">{equipmentStats.avgHours}</p>
              <p className="text-xs text-blue-600">小时/台设备</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">维护中</p>
              <p className="text-2xl font-semibold text-yellow-600">{equipmentStats.maintenance}</p>
              <p className="text-xs text-yellow-600">台正在保养</p>
            </div>
            <Wrench className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">月度维护</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(equipmentStats.monthlyMaintenanceCost)}</p>
              <p className="text-xs text-orange-600">预估费用</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-xs text-red-800">
            <strong>Maruti Suzuki Utility</strong> 已停用 3 天，需要维修发动机。
          </AlertDescription>
        </Alert>

        <Alert className="border-yellow-200 bg-yellow-50">
          <Clock className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-xs text-yellow-800">
            <strong>Mahindra 8000</strong> 将在 7 天后到期维护，请安排保养。
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-200 bg-blue-50">
          <Fuel className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-800">
            本月全机队<strong>燃油效率</strong>下降 8%。
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory" className="text-xs">设备库存</TabsTrigger>
          <TabsTrigger value="maintenance" className="text-xs">维护</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs">分析</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <DataTable
            data={equipmentData}
            columns={equipmentColumns}
            title="设备机队"
            searchPlaceholder="搜索设备..."
            onAdd={() => setShowAddEquipment(true)}
            onEdit={(equipment) => setEditingEquipment(equipment)}
            onDelete={(equipment) => console.log('Delete equipment:', equipment)}
          />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <DataTable
            data={maintenanceData}
            columns={maintenanceColumns}
            title="维护排程"
            searchPlaceholder="搜索维护任务..."
            onAdd={() => console.log('Add maintenance task')}
            onEdit={(task) => console.log('Edit task:', task)}
            onDelete={(task) => console.log('Delete task:', task)}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">设备利用率</h3>
              <div className="space-y-3">
                {equipmentData.map((equipment) => (
                  <div key={equipment.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{equipment.name}</span>
                      <span>{equipment.hoursUsed} 小时</span>
                    </div>
                    <Progress 
                      value={Math.min((equipment.hoursUsed / 3000) * 100, 100)} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">成本分析</h3>
              <div className="space-y-3">
                {equipmentData.map((equipment) => (
                  <div key={equipment.id} className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                    <div>
                      <div className="font-medium">{equipment.name}</div>
                      <div className="text-gray-500">{formatCurrency(Math.round(equipment.operatingCost))}/小时 运营成本</div>
                    </div>
                    <div className="text-right">
                      <div>{formatCurrencyCompact(equipment.maintenanceCost)}</div>
                      <div className="text-gray-500">维护成本</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">按类别统计设备</h3>
              <div className="space-y-2">
                {['Heavy Machinery', 'Medium Machinery', 'Light Equipment'].map(category => {
                  const count = equipmentData.filter(e => e.category === category).length;
                  const value = equipmentData
                    .filter(e => e.category === category)
                    .reduce((sum, e) => sum + e.currentValue, 0);
                  
                  return (
                    <div key={category} className="flex justify-between items-center text-xs">
                      <span>{zhText(category)}</span>
                      <div className="text-right">
                        <div>{count} 台</div>
                        <div className="text-gray-500">价值 {formatCurrencyCompact(value)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">效率指标</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span>机队可用率</span>
                  <span className="text-green-600">
                    {Math.round((equipmentStats.operational / equipmentStats.total) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>平均燃油效率</span>
                  <span className="text-blue-600">
                    {(equipmentData.reduce((sum, e) => sum + e.fuelEfficiency, 0) / equipmentData.length).toFixed(1)} L/hr
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>维护成本占比</span>
                  <span className="text-orange-600">
                    {((equipmentData.reduce((sum, e) => sum + e.maintenanceCost, 0) / equipmentStats.totalValue) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>折旧率</span>
                  <span className="text-red-600">年化 12.5%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Equipment Modal */}
      {(showAddEquipment || editingEquipment) && (
        <EquipmentModal
          equipment={editingEquipment}
          onClose={() => {
            setShowAddEquipment(false);
            setEditingEquipment(null);
          }}
        />
      )}
    </div>
  );
}
