import React, { useState } from 'react';
import { DataTable } from '../DataTable';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  CheckSquare, 
  AlertTriangle, 
  Clock, 
  Calendar,
  User,
  MapPin,
  Plus,
  Bell,
  Filter
} from 'lucide-react';
import { zhDateTime, zhText } from '../localization';

export function Tasks() {
  const [activeTab, setActiveTab] = useState('tasks');

  const tasksData = [
    {
      id: 'T001',
      title: '灌溉 A 地块 1 区',
      description: '玉米作物的晨间灌溉周期',
      type: 'irrigation',
      priority: 'high',
      status: 'pending',
      assignee: 'John Smith',
      location: 'Field A - Zone 1',
      dueDate: '2024-08-09 06:00',
      estimatedTime: '45 分钟',
      progress: 0
    },
    {
      id: 'T002',
      title: '畜牧健康检查',
      description: '牛群每周健康巡检',
      type: 'livestock',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'Sarah Johnson',
      location: 'Barn A',
      dueDate: '2024-08-09 10:00',
      estimatedTime: '2 小时',
      progress: 60
    },
    {
      id: 'T003',
      title: '土壤 pH 检测',
      description: '施肥后检测土壤 pH 水平',
      type: 'testing',
      priority: 'low',
      status: 'completed',
      assignee: 'Mike Davis',
      location: 'Field B - Zone 2',
      dueDate: '2024-08-08 14:00',
      estimatedTime: '30 分钟',
      progress: 100
    },
    {
      id: 'T004',
      title: '设备维护',
      description: '保养 3 号灌溉泵',
      type: 'maintenance',
      priority: 'high',
      status: 'overdue',
      assignee: 'Emily Wilson',
      location: 'Pump Station 3',
      dueDate: '2024-08-07 16:00',
      estimatedTime: '3 小时',
      progress: 0
    },
    {
      id: 'T005',
      title: '作物生长监测',
      description: '每周生长评估和拍照记录',
      type: 'monitoring',
      priority: 'medium',
      status: 'pending',
      assignee: 'David Brown',
      location: 'Greenhouse 1',
      dueDate: '2024-08-10 09:00',
      estimatedTime: '1 小时',
      progress: 0
    }
  ];

  const alertsData = [
    {
      id: 'A001',
      title: '水位严重偏低',
      message: '水箱 B 容量低于 20%',
      type: 'critical',
      location: 'Water Tank B',
      timestamp: '2024-08-09 14:25',
      status: 'active',
      acknowledged: false
    },
    {
      id: 'A002',
      title: '高温告警',
      message: '2 号温室温度超过 35°C',
      type: 'warning',
      location: 'Greenhouse 2',
      timestamp: '2024-08-09 13:45',
      status: 'active',
      acknowledged: true
    },
    {
      id: 'A003',
      title: '设备离线',
      message: '土壤传感器 SEN003 已离线 2 小时',
      type: 'warning',
      location: 'Field A - Zone 2',
      timestamp: '2024-08-09 12:30',
      status: 'resolved',
      acknowledged: true
    },
    {
      id: 'A004',
      title: '灌溉已排程',
      message: '自动灌溉将在 15 分钟后开始',
      type: 'info',
      location: 'Field C',
      timestamp: '2024-08-09 05:45',
      status: 'active',
      acknowledged: false
    }
  ];

  const taskColumns = [
    {
      key: 'id',
      label: '任务 ID',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <Badge className={`text-xs mt-1 ${
            row.priority === 'high' ? 'bg-red-100 text-red-800' :
            row.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {zhText(row.priority)}
          </Badge>
        </div>
      )
    },
    {
      key: 'title',
      label: '任务',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.description}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: '类型',
      sortable: true,
      filterable: true,
      render: (value: string) => {
        const colors = {
          irrigation: 'bg-blue-100 text-blue-800',
          livestock: 'bg-green-100 text-green-800',
          testing: 'bg-purple-100 text-purple-800',
          maintenance: 'bg-orange-100 text-orange-800',
          monitoring: 'bg-indigo-100 text-indigo-800'
        };
        return <Badge className={`text-xs ${colors[value as keyof typeof colors]}`}>{zhText(value)}</Badge>;
      }
    },
    {
      key: 'assignee',
      label: '负责人',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <User className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{zhText(value)}</span>
        </div>
      )
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
      key: 'status',
      label: '状态',
      sortable: true,
      filterable: true
    },
    {
      key: 'dueDate',
      label: '截止时间',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{zhDateTime(value)}</span>
        </div>
      )
    },
    {
      key: 'progress',
      label: '进度',
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-xs">{value}%</span>
        </div>
      )
    }
  ];

  const alertColumns = [
    {
      key: 'title',
      label: '告警',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.message}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: '严重级别',
      sortable: true,
      filterable: true,
      render: (value: string) => {
        const colors = {
          critical: 'bg-red-100 text-red-800',
          warning: 'bg-yellow-100 text-yellow-800',
          info: 'bg-blue-100 text-blue-800'
        };
        return <Badge className={`text-xs ${colors[value as keyof typeof colors]}`}>{zhText(value)}</Badge>;
      }
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
      key: 'timestamp',
      label: '时间',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{zhDateTime(value)}</span>
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
      key: 'acknowledged',
      label: '已确认',
      render: (value: boolean) => value ? 
        <CheckSquare className="h-4 w-4 text-green-600" /> : 
        <Bell className="h-4 w-4 text-orange-600" />
    }
  ];

  const taskStats = {
    total: tasksData.length,
    pending: tasksData.filter(t => t.status === 'pending').length,
    inProgress: tasksData.filter(t => t.status === 'in-progress').length,
    completed: tasksData.filter(t => t.status === 'completed').length,
    overdue: tasksData.filter(t => t.status === 'overdue').length
  };

  const alertStats = {
    total: alertsData.length,
    critical: alertsData.filter(a => a.type === 'critical').length,
    warning: alertsData.filter(a => a.type === 'warning').length,
    unacknowledged: alertsData.filter(a => !a.acknowledged).length
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">任务与告警</h1>
          <p className="text-sm text-gray-600">管理农场作业并监控系统告警</p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            新增任务
          </Button>
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
            <Bell className="h-4 w-4 mr-1" />
            创建告警
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">活跃任务</p>
              <p className="text-2xl font-semibold text-gray-900">{taskStats.total}</p>
              <p className="text-xs text-blue-600">{taskStats.pending} 个待处理</p>
            </div>
            <CheckSquare className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">进行中</p>
              <p className="text-2xl font-semibold text-yellow-600">{taskStats.inProgress}</p>
              <p className="text-xs text-yellow-600">正在处理</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">逾期</p>
              <p className="text-2xl font-semibold text-red-600">{taskStats.overdue}</p>
              <p className="text-xs text-red-600">需要关注</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">活跃告警</p>
              <p className="text-2xl font-semibold text-orange-600">{alertStats.total}</p>
              <p className="text-xs text-orange-600">{alertStats.unacknowledged} 条未读</p>
            </div>
            <Bell className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Critical Alerts */}
      {alertStats.critical > 0 && (
        <div className="space-y-2">
          {alertsData.filter(alert => alert.type === 'critical').map(alert => (
            <Alert key={alert.id} className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-xs text-red-800">
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{alert.title}</strong> - {alert.message}
                    <div className="text-gray-600 mt-1">{zhText(alert.location)} • {zhDateTime(alert.timestamp)}</div>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                    确认
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks" className="text-xs">任务与排程</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs">告警与通知</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <DataTable
            data={tasksData}
            columns={taskColumns}
            title="任务管理"
            searchPlaceholder="搜索任务..."
            onAdd={() => console.log('Add task')}
            onEdit={(task) => console.log('Edit task:', task)}
            onDelete={(task) => console.log('Delete task:', task)}
          />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <DataTable
            data={alertsData}
            columns={alertColumns}
            title="告警管理"
            searchPlaceholder="搜索告警..."
            onAdd={() => console.log('Add alert')}
            onEdit={(alert) => console.log('Edit alert:', alert)}
            onDelete={(alert) => console.log('Delete alert:', alert)}
          />
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-base font-semibold mb-3">今日排程</h3>
          <div className="space-y-2">
            {tasksData.filter(task => 
              new Date(task.dueDate).toDateString() === new Date().toDateString()
            ).map(task => (
              <div key={task.id} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-gray-500">{new Date(task.dueDate).toLocaleTimeString()}</div>
                </div>
                <Badge className={`text-xs ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {zhText(task.status)}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-base font-semibold mb-3">任务类型</h3>
          <div className="space-y-2">
            {['irrigation', 'livestock', 'maintenance', 'monitoring', 'testing'].map(type => {
              const count = tasksData.filter(t => t.type === type).length;
              return (
                <div key={type} className="flex justify-between items-center text-xs">
                  <span>{zhText(type)}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-base font-semibold mb-3">团队负载</h3>
          <div className="space-y-2">
            {['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Wilson', 'David Brown'].map(person => {
              const assignedTasks = tasksData.filter(t => t.assignee === person && t.status !== 'completed').length;
              return (
                <div key={person} className="flex justify-between items-center text-xs">
                  <span>{person}</span>
                  <Badge variant="secondary">{assignedTasks} 个任务</Badge>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
