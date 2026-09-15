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
  Users, 
  Clock, 
  DollarSign, 
  UserPlus, 
  CalendarDays,
  TrendingUp,
  TrendingDown,
  MapPin,
  Phone,
  Mail,
  Plus,
  Calculator,
  Timer,
  Wrench
} from 'lucide-react';
import { LaborModal } from '../modals/LaborModal';
import { TimeTrackingModal } from '../modals/TimeTrackingModal';
import { zhDate, zhText } from '../localization';

export function Labor() {
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showTimeTracking, setShowTimeTracking] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [activeTab, setActiveTab] = useState('personnel');

  const personnelData = [
    {
      id: 'P001',
      name: 'Ramesh Kumar',
      type: 'hired',
      role: 'Farm Worker',
      specialization: 'Crop Management',
      hourlyRate: 153.55,        // ₹154/hr (converted from $18.50/hr)
      hoursThisWeek: 42,
      hoursThisMonth: 168,
      phone: '+91 98765 43210',
      email: 'ramesh.k@email.com',
      status: 'active',
      startDate: '2024-03-15',
      location: 'Field A',
      overtime: 2,
      weeklyCost: 6449,         // ₹6,449 (converted from $777)
      monthlyCost: 25796        // ₹25,796 (converted from $3,108)
    },
    {
      id: 'P002',
      name: 'Priya Sharma',
      type: 'own',
      role: 'Equipment Operator',
      specialization: 'Heavy Machinery',
      hourlyRate: 182.60,       // ₹183/hr (converted from $22.00/hr)
      hoursThisWeek: 40,
      hoursThisMonth: 160,
      phone: '+91 98765 43211',
      email: 'priya.s@farmco.com',
      status: 'active',
      startDate: '2022-06-10',
      location: 'Equipment Bay',
      overtime: 0,
      weeklyCost: 7304,         // ₹7,304 (converted from $880)
      monthlyCost: 29216        // ₹29,216 (converted from $3,520)
    },
    {
      id: 'P003',
      name: 'Suresh Patil',
      type: 'hired',
      role: 'Livestock Manager',
      specialization: 'Animal Care',
      hourlyRate: 166.00,       // ₹166/hr (converted from $20.00/hr)
      hoursThisWeek: 45,
      hoursThisMonth: 180,
      phone: '+91 98765 43212',
      email: 'suresh.p@email.com',
      status: 'active',
      startDate: '2024-01-20',
      location: 'Barn A',
      overtime: 5,
      weeklyCost: 7885,         // ₹7,885 (converted from $950)
      monthlyCost: 31125        // ₹31,125 (converted from $3,750)
    },
    {
      id: 'P004',
      name: 'Kavya Singh',
      type: 'hired',
      role: 'General Laborer',
      specialization: 'Multiple Tasks',
      hourlyRate: 132.80,       // ₹133/hr (converted from $16.00/hr)
      hoursThisWeek: 38,
      hoursThisMonth: 152,
      phone: '+91 98765 43213',
      email: 'kavya.s@email.com',
      status: 'on-leave',
      startDate: '2024-05-05',
      location: 'Greenhouse 1',
      overtime: 0,
      weeklyCost: 5046,         // ₹5,046 (converted from $608)
      monthlyCost: 20186        // ₹20,186 (converted from $2,432)
    },
    {
      id: 'P005',
      name: 'Vikram Singh',
      type: 'own',
      role: 'Farm Supervisor',
      specialization: 'Operations Management',
      hourlyRate: 232.40,       // ₹232/hr (converted from $28.00/hr)
      hoursThisWeek: 50,
      hoursThisMonth: 200,
      phone: '+91 98765 43214',
      email: 'vikram.s@farmco.com',
      status: 'active',
      startDate: '2020-02-15',
      location: 'Main Office',
      overtime: 10,
      weeklyCost: 12202,        // ₹12,202 (converted from $1,470)
      monthlyCost: 48808        // ₹48,808 (converted from $5,880)
    }
  ];

  const machineryUsageData = [
    {
      id: 'MU001',
      equipmentId: 'EQ001',
      equipmentName: 'Mahindra 8000',
      operator: 'Priya Sharma',
      operatorId: 'P002',
      date: '2024-08-09',
      startTime: '06:00',
      endTime: '14:00',
      totalHours: 8,
      field: 'Field A - Zone 1',
      task: 'Cultivation',
      fuelUsed: 48.5,
      operatingCost: 30212,     // ₹30,212 (converted from $364)
      operatorCost: 1461,      // ₹1,461 (converted from $176)
      totalCost: 31820,        // ₹31,820 (converted from $540)
      efficiency: 'good'
    },
    {
      id: 'MU002',
      equipmentId: 'EQ002',
      equipmentName: 'Sonalika DI-60',
      operator: 'Ramesh Kumar',
      operatorId: 'P001',
      date: '2024-08-08',
      startTime: '07:00',
      endTime: '16:00',
      totalHours: 9,
      field: 'Field B',
      task: 'Harvesting',
      fuelUsed: 85.2,
      operatingCost: 58452,     // ₹58,452 (converted from $704.25)
      operatorCost: 1382,      // ₹1,382 (converted from $166.50)
      totalCost: 72272,        // ₹72,272 (converted from $870.75)
      efficiency: 'excellent'
    },
    {
      id: 'MU003',
      equipmentId: 'EQ004',
      equipmentName: 'Kubota MU4501',
      operator: 'Suresh Patil',
      operatorId: 'P003',
      date: '2024-08-09',
      startTime: '08:00',
      endTime: '12:00',
      totalHours: 4,
      field: 'Pasture B',
      task: 'Feed Distribution',
      fuelUsed: 22.8,
      operatingCost: 10790,     // ₹10,790 (converted from $130)
      operatorCost: 664,       // ₹664 (converted from $80)
      totalCost: 17430,        // ₹17,430 (converted from $210)
      efficiency: 'good'
    }
  ];

  const timeLogsData = [
    {
      id: 'TL001',
      workerId: 'P001',
      workerName: 'Ramesh Kumar',
      date: '2024-08-09',
      clockIn: '06:00',
      clockOut: '14:30',
      breakTime: 0.5,
      totalHours: 8,
      overtimeHours: 0,
      task: 'Crop Cultivation',
      location: 'Field A',
      cost: 1228,             // ₹1,228 (converted from $148)
      approved: true
    },
    {
      id: 'TL002',
      workerId: 'P002',
      workerName: 'Priya Sharma',
      date: '2024-08-09',
      clockIn: '06:00',
      clockOut: '14:00',
      breakTime: 1,
      totalHours: 7,
      overtimeHours: 0,
      task: 'Equipment Operation',
      location: 'Field A',
      cost: 1278,             // ₹1,278 (converted from $154)
      approved: true
    },
    {
      id: 'TL003',
      workerId: 'P003',
      workerName: 'Suresh Patil',
      date: '2024-08-09',
      clockIn: '05:30',
      clockOut: '15:00',
      breakTime: 1,
      totalHours: 8.5,
      overtimeHours: 0.5,
      task: 'Livestock Care',
      location: 'Barn A',
      cost: 1473,             // ₹1,473 (converted from $177.50)
      approved: false
    }
  ];

  const personnelColumns = [
    {
      key: 'name',
      label: '人员',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{zhText(row.role)}</div>
          <div className="flex items-center space-x-1 mt-1">
            <Badge className={`text-xs ${
              row.type === 'own' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {row.type === 'own' ? '员工' : '承包工'}
            </Badge>
          </div>
        </div>
      )
    },
    {
      key: 'specialization',
      label: '专长',
      sortable: true,
      filterable: true
    },
    {
      key: 'hourlyRate',
      label: '小时费率',
      sortable: true,
      render: (value: number) => `${formatCurrency(Math.round(value))}/小时`
    },
    {
      key: 'hoursThisWeek',
      label: '本周',
      sortable: true,
      render: (value: number, row: any) => (
        <div>
          <div className="text-xs">{value}h</div>
          {row.overtime > 0 && (
            <div className="text-xs text-orange-600">+{row.overtime} 小时加班</div>
          )}
        </div>
      )
    },
    {
      key: 'hoursThisMonth',
      label: '本月',
      sortable: true,
      render: (value: number) => `${value} 小时`
    },
    {
      key: 'location',
      label: '当前位置',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{zhText(value)}</span>
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
      key: 'weeklyCost',
      label: '周成本',
      sortable: true,
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'phone',
      label: '联系方式',
      render: (value: string, row: any) => (
        <div className="text-xs">
          <div className="flex items-center space-x-1">
            <Phone className="h-3 w-3 text-gray-400" />
            <span>{value}</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <Mail className="h-3 w-3 text-gray-400" />
            <span>{row.email}</span>
          </div>
        </div>
      )
    }
  ];

  const machineryColumns = [
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
      key: 'operator',
      label: '操作员',
      sortable: true,
      filterable: true
    },
    {
      key: 'date',
      label: '日期',
      sortable: true,
      render: (value: string) => zhDate(value)
    },
    {
      key: 'totalHours',
      label: '小时',
      sortable: true,
      render: (value: number, row: any) => (
        <div className="text-xs">
          <div>{value} 小时</div>
          <div className="text-gray-500">{row.startTime} - {row.endTime}</div>
        </div>
      )
    },
    {
      key: 'field',
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
      key: 'task',
      label: '任务',
      sortable: true,
      filterable: true
    },
    {
      key: 'fuelUsed',
      label: '燃油用量',
      sortable: true,
      render: (value: number) => `${value}L`
    },
    {
      key: 'efficiency',
      label: '效率',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge className={`text-xs ${
          value === 'excellent' ? 'bg-green-100 text-green-800' :
          value === 'good' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {zhText(value)}
        </Badge>
      )
    },
    {
      key: 'totalCost',
      label: '总成本',
      sortable: true,
      render: (value: number, row: any) => (
        <div className="text-xs">
          <div className="font-medium">{formatCurrency(value)}</div>
          <div className="text-gray-500">
            运营：{formatCurrency(row.operatingCost)} | 人工：{formatCurrency(row.operatorCost)}
          </div>
        </div>
      )
    }
  ];

  const timeLogColumns = [
    {
      key: 'workerName',
      label: '人员',
      sortable: true,
      filterable: true
    },
    {
      key: 'date',
      label: '日期',
      sortable: true,
      render: (value: string) => zhDate(value)
    },
    {
      key: 'clockIn',
      label: '上班/下班',
      render: (value: string, row: any) => (
        <div className="text-xs">
          <div>{value} - {row.clockOut}</div>
          <div className="text-gray-500">休息：{row.breakTime} 小时</div>
        </div>
      )
    },
    {
      key: 'totalHours',
      label: '小时',
      sortable: true,
      render: (value: number, row: any) => (
        <div className="text-xs">
          <div>常规：{value - row.overtimeHours} 小时</div>
          {row.overtimeHours > 0 && (
            <div className="text-orange-600">加班：{row.overtimeHours} 小时</div>
          )}
        </div>
      )
    },
    {
      key: 'task',
      label: '任务',
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
      key: 'cost',
      label: '成本',
      sortable: true,
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'approved',
      label: '状态',
      render: (value: boolean) => (
        <Badge className={`text-xs ${
          value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value ? '已批准' : '待处理'}
        </Badge>
      )
    }
  ];

  const laborStats = {
    totalWorkers: personnelData.length,
    activeWorkers: personnelData.filter(p => p.status === 'active').length,
    hiredWorkers: personnelData.filter(p => p.type === 'hired').length,
    ownWorkers: personnelData.filter(p => p.type === 'own').length,
    totalWeeklyHours: personnelData.reduce((sum, p) => sum + p.hoursThisWeek, 0),
    totalWeeklyCost: personnelData.reduce((sum, p) => sum + p.weeklyCost, 0),
    totalOvertimeHours: personnelData.reduce((sum, p) => sum + p.overtime, 0),
    avgHourlyRate: personnelData.reduce((sum, p) => sum + p.hourlyRate, 0) / personnelData.length
  };

  const machineryStats = {
    totalMachineHours: machineryUsageData.reduce((sum, m) => sum + m.totalHours, 0),
    totalMachineCost: machineryUsageData.reduce((sum, m) => sum + m.totalCost, 0),
    avgEfficiency: machineryUsageData.filter(m => m.efficiency === 'excellent').length / machineryUsageData.length * 100
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">劳动力与资源</h1>
          <p className="text-sm text-gray-600">管理员工工时、成本和机械使用情况</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowTimeTracking(true)}
          >
            <Timer className="h-4 w-4 mr-1" />
            工时记录
          </Button>
          <Button 
            onClick={() => setShowAddWorker(true)}
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            新增人员
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">人员总数</p>
              <p className="text-2xl font-semibold text-gray-900">{laborStats.totalWorkers}</p>
              <p className="text-xs text-green-600">{laborStats.activeWorkers} 人活跃</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">周工时</p>
              <p className="text-2xl font-semibold text-gray-900">{laborStats.totalWeeklyHours}</p>
              <p className="text-xs text-orange-600">{laborStats.totalOvertimeHours} 小时加班</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">周人工成本</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(laborStats.totalWeeklyCost)}</p>
              <p className="text-xs text-blue-600">平均：{formatCurrency(Math.round(laborStats.avgHourlyRate))}/小时</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">机械工时</p>
              <p className="text-2xl font-semibold text-gray-900">{machineryStats.totalMachineHours}</p>
              <p className="text-xs text-blue-600">本周</p>
            </div>
            <Wrench className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">机械成本</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(machineryStats.totalMachineCost)}</p>
              <p className="text-xs text-orange-600">设备 + 人工</p>
            </div>
            <Calculator className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">效率</p>
              <p className="text-2xl font-semibold text-gray-900">{machineryStats.avgEfficiency.toFixed(0)}%</p>
              <p className="text-xs text-green-600">优秀评级</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Cost Analysis Alert */}
      <Alert className="border-purple-200 bg-purple-50">
        <TrendingUp className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-xs text-purple-800">
          <strong>成本分析：</strong>承包工每小时成本低 15%，但自有员工生产力高 25%。
          可考虑将表现优秀的承包工转为全职岗位。
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personnel" className="text-xs">人员管理</TabsTrigger>
          <TabsTrigger value="machinery" className="text-xs">机械使用</TabsTrigger>
          <TabsTrigger value="timelogs" className="text-xs">工时日志</TabsTrigger>
        </TabsList>

        <TabsContent value="personnel" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <DataTable
                data={personnelData}
                columns={personnelColumns}
                title="人员名录"
                searchPlaceholder="搜索人员..."
                onAdd={() => setShowAddWorker(true)}
                onEdit={(worker) => setEditingWorker(worker)}
                onDelete={(worker) => console.log('Delete worker:', worker)}
              />
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="text-base font-semibold mb-3">人员构成</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>自有员工</span>
                      <span>{laborStats.ownWorkers}</span>
                    </div>
                    <Progress value={(laborStats.ownWorkers / laborStats.totalWorkers) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>承包工</span>
                      <span>{laborStats.hiredWorkers}</span>
                    </div>
                    <Progress value={(laborStats.hiredWorkers / laborStats.totalWorkers) * 100} className="h-2" />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-base font-semibold mb-3">专长分布</h3>
                <div className="space-y-2">
                  {['Crop Management', 'Heavy Machinery', 'Animal Care', 'Multiple Tasks', 'Operations Management'].map(spec => {
                    const count = personnelData.filter(p => p.specialization === spec).length;
                    return (
                      <div key={spec} className="flex justify-between items-center text-xs">
                        <span>{zhText(spec)}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="machinery" className="space-y-4">
          <DataTable
            data={machineryUsageData}
            columns={machineryColumns}
            title="机械使用日志"
            searchPlaceholder="搜索机械使用记录..."
            onAdd={() => console.log('Add machinery log')}
            onEdit={(log) => console.log('Edit log:', log)}
            onDelete={(log) => console.log('Delete log:', log)}
          />
        </TabsContent>

        <TabsContent value="timelogs" className="space-y-4">
          <DataTable
            data={timeLogsData}
            columns={timeLogColumns}
            title="工时记录"
            searchPlaceholder="搜索工时日志..."
            onAdd={() => setShowTimeTracking(true)}
            onEdit={(log) => console.log('Edit time log:', log)}
            onDelete={(log) => console.log('Delete time log:', log)}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {(showAddWorker || editingWorker) && (
        <LaborModal
          worker={editingWorker}
          onClose={() => {
            setShowAddWorker(false);
            setEditingWorker(null);
          }}
        />
      )}

      {showTimeTracking && (
        <TimeTrackingModal
          onClose={() => setShowTimeTracking(false)}
        />
      )}
    </div>
  );
}
