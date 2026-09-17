import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Toaster } from "./ui/sonner";
import { 
  Palette, Ruler, Type, Component, Box, CheckCircle, AlertCircle, XCircle, Info,
  Layers, Zap, FileText, Package, BarChart3, Calendar, DollarSign, Hash,
  Warehouse, PackageCheck, PackageMinus, PackageX, Clock, Activity, ArrowLeft, ExternalLink
} from "lucide-react";
import { LoadingState } from "./wms/LoadingState";
import { EmptyState } from "./wms/EmptyState";
import { ErrorState } from "./wms/ErrorState";

// Shared page browser used by both the Axhub runtime adapter and the Make export shell.

// Import demo pages
import DashboardPage from "../pages/DashboardPage";
import InboundListPage from "../pages/InboundListPage";
import InboundDetailPage from "../pages/InboundDetailPage";
import OutboundListPage from "../pages/OutboundListPage";
import OutboundDetailPage from "../pages/OutboundDetailPage";
import WaveListPage from "../pages/WaveListPage";
import WaveDetailPage from "../pages/WaveDetailPage";
import PutawayListPage from "../pages/PutawayListPage";
import PutawayDetailPage from "../pages/PutawayDetailPage";
import InventoryListPage from "../pages/InventoryListPage";
import InventoryTransactionPage from "../pages/InventoryTransactionPage";
import CustomerManagementPage from "../pages/CustomerManagementPage";
import ProductMasterDataPage from "../pages/ProductMasterDataPage";
import ZoneManagementPage from "../pages/ZoneManagementPage";
import LocationManagementPage from "../pages/LocationManagementPage";
import ContainerManagementPage from "../pages/ContainerManagementPage";
import SeedingWallManagementPage from "../pages/SeedingWallManagementPage";
import ArrivalScanPage from "../pages/ArrivalScanPage";
import SeedingOperationPage from "../pages/SeedingOperationPage";
import OutboundCheckPage from "../pages/OutboundCheckPage";

// Demo page registry
const demoPages = [
  {
    id: "dashboard",
    name: "工作台",
    description: "WMS首页看板，展示核心业务指标、待办任务、库存预警等关键信息",
    category: "首页",
    component: DashboardPage,
    tags: ["看板", "数据可视化", "实时监控"],
  },
  {
    id: "inbound-list",
    name: "入库单列表",
    description: "信息密集型表格页面，包含筛选、分页、批量操作等完整功能",
    category: "入库管理",
    component: InboundListPage,
    tags: ["表格", "筛选", "分页"],
  },
  {
    id: "inbound-detail",
    name: "入库单详情",
    description: "入库单详情页面，包含收货、上架、操作日志等完整流程",
    category: "入库管理",
    component: InboundDetailPage,
    tags: ["详情", "收货", "上架"],
  },
  {
    id: "outbound-list",
    name: "出库单列表",
    description: "出库管理页面，支持分波管理、订单类型分类、智能批量操作",
    category: "出库管理",
    component: OutboundListPage,
    tags: ["表格", "分波", "拣货"],
  },
  {
    id: "outbound-detail",
    name: "出库单详情",
    description: "出库单详情页面，包含拣货、包装、发货等完整流程",
    category: "出库管理",
    component: OutboundDetailPage,
    tags: ["详情", "拣货", "发货"],
  },
  {
    id: "wave-management",
    name: "分波管理",
    description: "分波管理页面，支持分波创建、编辑、删除等操作",
    category: "出库管理",
    component: WaveListPage,
    tags: ["分波", "管理", "操作"],
  },
  {
    id: "wave-detail",
    name: "分波详情",
    description: "分波详情页，展示分波信息、订单明细、拣货记录，可执行拣货操作",
    category: "出库管理",
    component: WaveDetailPage,
    tags: ["详情", "拣货操作", "库位分配"],
  },
  {
    id: "putaway-management",
    name: "上架管理",
    description: "上架单管理页面，支持扫描上架单号/容器号快速定位，查看上架进度",
    category: "入库管理",
    component: PutawayListPage,
    tags: ["上架", "上架单", "扫描定位"],
  },
  {
    id: "putaway-detail",
    name: "上架单详情",
    description: "上架单详情页，展示容器信息、SKU明细、上架记录，可执行上架操作",
    category: "入库管理",
    component: PutawayDetailPage,
    tags: ["详情", "上架操作", "库位分配"],
  },
  {
    id: "inventory-query",
    name: "库存查询",
    description: "多维度库存查询页面，支持商品、库位、批次等不同颗粒度的库存查看",
    category: "库存管理",
    component: InventoryListPage,
    tags: ["库存", "多Tab", "颗粒度"],
  },
  {
    id: "inventory-transaction",
    name: "库存流水查询",
    description: "库存变动记录查询与追溯，支持按商品汇总和按商品-批次-库位明细两种维度",
    category: "库存管理",
    component: InventoryTransactionPage,
    tags: ["流水", "追溯", "审计"],
  },
  {
    id: "customer-management",
    name: "客户管理",
    description: "客户档案管理页面，支持客户信息维护、状态管理、批量操作等功能",
    category: "基础数据",
    component: CustomerManagementPage,
    tags: ["基础数据", "客户", "CRUD"],
  },
  {
    id: "product-master",
    name: "商品资料",
    description: "商品档案管理页面，包含SKU信息、规格、库存状态等完整商品信息",
    category: "基础数据",
    component: ProductMasterDataPage,
    tags: ["基础数据", "商品", "SKU"],
  },
  {
    id: "zone-management",
    name: "库区管理",
    description: "库区管理页面，支持库区创建、编辑、删除等操作",
    category: "基础数据",
    component: ZoneManagementPage,
    tags: ["库区", "管理", "操作"],
  },
  {
    id: "location-management",
    name: "库位管理",
    description: "库位管理页面，支持库位创建、编辑、删除等操作",
    category: "基础数据",
    component: LocationManagementPage,
    tags: ["库位", "管理", "操作"],
  },
  {
    id: "container-management",
    name: "容器管理",
    description: "容器管理页面，支持容器创建、编辑、删除等操作",
    category: "基础数据",
    component: ContainerManagementPage,
    tags: ["容器", "管理", "操作"],
  },
  {
    id: "seeding-wall-management",
    name: "播种墙管理",
    description: "播种墙管理页面，支持播种墙创建、编辑、删除等操作",
    category: "基础数据",
    component: SeedingWallManagementPage,
    tags: ["播种墙", "管理", "操作"],
  },
  {
    id: "arrival-scan",
    name: "到货扫描",
    description: "到货扫描页面，支持快速扫描入库单号/容器号，自动匹配入库信息",
    category: "入库管理",
    component: ArrivalScanPage,
    tags: ["扫描", "入库", "自动化"],
  },
  {
    id: "seeding-operation",
    name: "播种操作",
    description: "播种操作页面，支持播种墙操作、播种任务管理等",
    category: "入库管理",
    component: SeedingOperationPage,
    tags: ["播种", "操作", "自动化"],
  },
  {
    id: "outbound-check",
    name: "出库复核",
    description: "出库复核页面，支持复核出库单、确认发货等操作",
    category: "出库管理",
    component: OutboundCheckPage,
    tags: ["复核", "出库", "确认"],
  },
];

export default function WmsCommunityPrototype() {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  // Navigation handler
  const handleNavigate = (path: string) => {
    // Map paths to page IDs
    const pathToPageId: Record<string, string> = {
      "/": "dashboard",
      "/inbound/management": "inbound-list",
      "/inbound/detail": "inbound-detail",
      "/putaway/management": "putaway-management",
      "/outbound/management": "outbound-list",
      "/outbound/detail": "outbound-detail",
      "/wave/management": "wave-management",
      "/wave/detail": "wave-detail",
      "/inventory/query": "inventory-query",
      "/inventory/transaction": "inventory-transaction",
      "/master-data/customers": "customer-management",
      "/master-data/products": "product-master",
      "/master-data/zones": "zone-management",
      "/master-data/locations": "location-management",
      "/master-data/containers": "container-management",
      "/master-data/seeding-walls": "seeding-wall-management",
      "/inbound/arrival-scan": "arrival-scan",
      "/outbound/seeding": "seeding-operation",
      "/outbound/check": "outbound-check",
    };
    
    // Handle dynamic paths like /putaway/detail/:id
    if (path.startsWith("/putaway/detail/")) {
      setCurrentPage("putaway-detail");
      return;
    }
    
    const pageId = pathToPageId[path];
    if (pageId) {
      setCurrentPage(pageId);
    }
  };

  // If viewing a demo page, render it
  if (currentPage) {
    const page = demoPages.find(p => p.id === currentPage);
    if (page) {
      const PageComponent = page.component;
      return (
        <>
          <div className="min-h-screen">
            <div className="fixed top-4 left-4 z-50">
              <Button 
                onClick={() => setCurrentPage(null)}
                variant="secondary"
                size="sm"
                className="shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                返回 Design System
              </Button>
            </div>
            <PageComponent onNavigate={handleNavigate} />
          </div>
          <Toaster />
        </>
      );
    }
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <Palette className="w-6 h-6 text-primary-foreground" />
                  </div>
                  WMS Design System
                </h1>
                <p className="text-muted-foreground mt-1">跨境电商仓储管理系统 - Design Token 规范</p>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                v1.0.0
              </Badge>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Introduction */}
          <Card className="mb-8 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="mb-2">🎨 完整的 Token 体系</h4>
                  <p className="text-sm text-muted-foreground">
                    包含颜色、间距、字体、阴影、动画等所有基础设计Token，确保视觉一致性
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">📦 WMS 业务优化</h4>
                  <p className="text-sm text-muted-foreground">
                    专为仓储管理系统设计，包含状态色、数据格式、表单规范等业务专用规范
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">🚀 开箱即用</h4>
                  <p className="text-sm text-muted-foreground">
                    基于 shadcn/ui 组件库，配合紫色科技风主题，适合信息密集型界面
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="colors" className="w-full">
          <div className="mb-6">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 gap-2 bg-[#d1c1c1]">
              <TabsTrigger value="colors" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Palette className="w-4 h-4 mr-2" />
                颜色
              </TabsTrigger>
              <TabsTrigger value="shadows">
                <Layers className="w-4 h-4 mr-2" />
                阴影
              </TabsTrigger>
              <TabsTrigger value="spacing">
                <Ruler className="w-4 h-4 mr-2" />
                间距
              </TabsTrigger>
              <TabsTrigger value="typography">
                <Type className="w-4 h-4 mr-2" />
                字体
              </TabsTrigger>
              <TabsTrigger value="icons">
                <Package className="w-4 h-4 mr-2" />
                图标
              </TabsTrigger>
              <TabsTrigger value="animations">
                <Zap className="w-4 h-4 mr-2" />
                动画
              </TabsTrigger>
              <TabsTrigger value="data-format">
                <FileText className="w-4 h-4 mr-2" />
                数据
              </TabsTrigger>
              <TabsTrigger value="states">
                <Activity className="w-4 h-4 mr-2" />
                状态
              </TabsTrigger>
              <TabsTrigger value="patterns">
                <Box className="w-4 h-4 mr-2" />
                模式
              </TabsTrigger>
              <TabsTrigger value="demos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ExternalLink className="w-4 h-4 mr-2" />
                参考页面
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Demo Pages Tab */}
          <TabsContent value="demos" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>参考页面</CardTitle>
                <CardDescription>
                  基于 Design System 构建的完整页面示例，展示实际应用效果
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {demoPages.map((page) => (
                    <Card 
                      key={page.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
                      onClick={() => setCurrentPage(page.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{page.name}</CardTitle>
                            <Badge variant="outline" className="mt-2">
                              {page.category}
                            </Badge>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <CardDescription className="mt-3">
                          {page.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 flex-wrap">
                          {page.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {demoPages.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>暂无参考页面</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8 mt-8">
            {/* Brand Colors */}
            <Card>
              
              <CardContent>
                
              </CardContent>
            </Card>

            {/* Functional Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Success */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--success-500)' }} />
                    成功状态（Success）
                  </CardTitle>
                  <CardDescription>用于成功提示、库存充足等积极状态</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {[50, 100, 500, 600, 700].map((shade) => (
                      <div key={shade} className="flex-1 text-center">
                        <div
                          className="h-16 rounded-lg border mb-2"
                          style={{ backgroundColor: `var(--success-${shade})` }}
                        />
                        <div className="text-xs">{shade}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Warning */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" style={{ color: 'var(--warning-500)' }} />
                    警告状态（Warning）
                  </CardTitle>
                  <CardDescription>用于库存低、需注意等提醒状态</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {[50, 100, 500, 600, 700].map((shade) => (
                      <div key={shade} className="flex-1 text-center">
                        <div
                          className="h-16 rounded-lg border mb-2"
                          style={{ backgroundColor: `var(--warning-${shade})` }}
                        />
                        <div className="text-xs">{shade}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Error */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="w-5 h-5" style={{ color: 'var(--error-500)' }} />
                    错误状态（Error）
                  </CardTitle>
                  <CardDescription>用于错误提示、库存不足等负面状态</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {[50, 100, 500, 600, 700].map((shade) => (
                      <div key={shade} className="flex-1 text-center">
                        <div
                          className="h-16 rounded-lg border mb-2"
                          style={{ backgroundColor: `var(--error-${shade})` }}
                        />
                        <div className="text-xs">{shade}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" style={{ color: 'var(--info-500)' }} />
                    信息状态（Info）
                  </CardTitle>
                  <CardDescription>用于一般提示、待处理等中性状态</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {[50, 100, 500, 600, 700].map((shade) => (
                      <div key={shade} className="flex-1 text-center">
                        <div
                          className="h-16 rounded-lg border mb-2"
                          style={{ backgroundColor: `var(--info-${shade})` }}
                        />
                        <div className="text-xs">{shade}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gray Colors */}
            <Card>
              <CardHeader>
                <CardTitle>中性色 - 灰色系（Gray）</CardTitle>
                <CardDescription>用于文字、边框、背景等基础元素</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-10 gap-3">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                    <div key={shade} className="text-center">
                      <div
                        className="h-20 rounded-lg border mb-2"
                        style={{ backgroundColor: `var(--gray-${shade})` }}
                      />
                      <div className="text-xs">gray-{shade}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shadows Tab */}
          <TabsContent value="shadows" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>阴影系统（Elevation）</CardTitle>
                <CardDescription>6 级阴影层次，用于表现界面层级关系</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'XS', token: '--shadow-xs', desc: '最轻微' },
                    { name: 'SM', token: '--shadow-sm', desc: '卡片默认' },
                    { name: 'MD', token: '--shadow-md', desc: '悬浮卡片' },
                    { name: 'LG', token: '--shadow-lg', desc: '下拉菜单' },
                    { name: 'XL', token: '--shadow-xl', desc: '抽屉' },
                    { name: '2XL', token: '--shadow-2xl', desc: '模态框' },
                  ].map((shadow) => (
                    <div key={shadow.token} className="space-y-2">
                      <div
                        className="h-32 bg-card rounded-lg flex items-center justify-center"
                        style={{ boxShadow: `var(${shadow.token})` }}
                      >
                        <div className="text-center">
                          <div className="text-lg">{shadow.name}</div>
                          <div className="text-xs text-muted-foreground">{shadow.desc}</div>
                        </div>
                      </div>
                      <code className="text-xs text-muted-foreground block text-center">
                        {shadow.token}
                      </code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>间距系统（Spacing）</CardTitle>
                <CardDescription>7 级间距规范，适合信息密集型布局</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'XS', token: '--spacing-xs', px: '4px' },
                    { name: 'SM', token: '--spacing-sm', px: '8px' },
                    { name: 'MD', token: '--spacing-md', px: '12px' },
                    { name: 'LG', token: '--spacing-lg', px: '16px' },
                    { name: 'XL', token: '--spacing-xl', px: '24px' },
                    { name: '2XL', token: '--spacing-2xl', px: '32px' },
                    { name: '3XL', token: '--spacing-3xl', px: '48px' },
                  ].map((spacing) => (
                    <div key={spacing.token} className="flex items-center gap-4">
                      <div className="w-24 text-sm">
                        <code>{spacing.name}</code>
                        <div className="text-xs text-muted-foreground">{spacing.px}</div>
                      </div>
                      <div
                        className="h-12 bg-primary/20 rounded bg-[#9333eaf5]"
                        style={{ width: `var(${spacing.token})` }}
                      />
                      <code className="text-xs text-muted-foreground">{spacing.token}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>组件专用间距</CardTitle>
                <CardDescription>针对特定组件优化的间距Token</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Table Padding X', token: '--table-padding-x', value: '12px' },
                    { name: 'Table Padding Y', token: '--table-padding-y', value: '8px' },
                    { name: 'Form Spacing', token: '--form-spacing', value: '16px' },
                    { name: 'Card Padding', token: '--card-padding', value: '24px' },
                  ].map((spacing) => (
                    <div key={spacing.token} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm">{spacing.name}</div>
                        <code className="text-xs text-muted-foreground">{spacing.token}</code>
                      </div>
                      <Badge variant="secondary">{spacing.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>字体系统（Typography）</CardTitle>
                <CardDescription>基于 14px 的紧凑字体系统，适合信息密集界面</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h1>H1 标题 - 24px / 1.5</h1>
                    <code className="text-xs text-muted-foreground">--text-2xl</code>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h2>H2 标题 - 20px / 1.5</h2>
                    <code className="text-xs text-muted-foreground">--text-xl</code>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3>H3 标题 - 16px / 1.5</h3>
                    <code className="text-xs text-muted-foreground">--text-lg</code>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4>H4 标题 - 14px / 1.5</h4>
                    <code className="text-xs text-muted-foreground">--text-base</code>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p>正文 - 14px / 1.5 (默认字号)</p>
                    <code className="text-xs text-muted-foreground">--text-base</code>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm">小号文字 - 14px / 1.5</p>
                    <code className="text-xs text-muted-foreground">--text-sm</code>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs">极小文字 - 12px / 1.5</p>
                    <code className="text-xs text-muted-foreground">--text-xs</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>字重系统（Font Weight）</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg" style={{ fontWeight: 'var(--font-weight-normal)' }}>
                    <div>正常 (Normal) - 400</div>
                    <code className="text-xs text-muted-foreground">--font-weight-normal</code>
                  </div>
                  <div className="p-3 border rounded-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    <div>中等 (Medium) - 500</div>
                    <code className="text-xs text-muted-foreground">--font-weight-medium</code>
                  </div>
                  <div className="p-3 border rounded-lg" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                    <div>半粗 (Semibold) - 600</div>
                    <code className="text-xs text-muted-foreground">--font-weight-semibold</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Icons Tab */}
          <TabsContent value="icons" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>图标尺寸（Icon Sizes）</CardTitle>
                <CardDescription>6 级图标尺寸，使用 lucide-react 图标库</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {[
                    { name: 'XS', token: '--icon-xs', size: 12 },
                    { name: 'SM', token: '--icon-sm', size: 16 },
                    { name: 'MD', token: '--icon-md', size: 20 },
                    { name: 'LG', token: '--icon-lg', size: 24 },
                    { name: 'XL', token: '--icon-xl', size: 32 },
                    { name: '2XL', token: '--icon-2xl', size: 48 },
                  ].map((icon) => (
                    <div key={icon.token} className="text-center space-y-3">
                      <div className="flex items-center justify-center">
                        <Package style={{ width: `var(${icon.token})`, height: `var(${icon.token})` }} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm">{icon.name}</div>
                        <div className="text-xs text-muted-foreground">{icon.size}px</div>
                        <code className="text-xs text-muted-foreground block mt-1">{icon.token}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>WMS 常用图标</CardTitle>
                <CardDescription>仓储管理系统高频使用的图标集</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {[
                    { icon: Warehouse, name: '仓库' },
                    { icon: PackageCheck, name: '入库' },
                    { icon: PackageMinus, name: '出库' },
                    { icon: Package, name: '包裹' },
                    { icon: BarChart3, name: '统计' },
                    { icon: FileText, name: '文档' },
                    { icon: Calendar, name: '日历' },
                    { icon: DollarSign, name: '金额' },
                    { icon: Clock, name: '时间' },
                    { icon: Hash, name: '编号' },
                    { icon: CheckCircle, name: '成功' },
                    { icon: AlertCircle, name: '警告' },
                  ].map((item) => (
                    <div key={item.name} className="text-center space-y-2">
                      <div className="flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-xs">{item.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Animations Tab */}
          <TabsContent value="animations" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>动画时长（Duration）</CardTitle>
                <CardDescription>5 级动画时长，适用于不同交互场景</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Instant', token: '--duration-instant', value: '0ms', desc: '无动画' },
                    { name: 'Fast', token: '--duration-fast', value: '150ms', desc: '快速反馈' },
                    { name: 'Normal', token: '--duration-normal', value: '250ms', desc: '默认动画' },
                    { name: 'Slow', token: '--duration-slow', value: '350ms', desc: '较慢动画' },
                    { name: 'Slower', token: '--duration-slower', value: '500ms', desc: '最慢动画' },
                  ].map((duration) => (
                    <div key={duration.token} className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="text-sm">{duration.name}</div>
                        <code className="text-xs text-muted-foreground">{duration.token}</code>
                      </div>
                      <Badge variant="secondary">{duration.value}</Badge>
                      <div className="text-sm text-muted-foreground">{duration.desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>缓动函数（Easing）</CardTitle>
                <CardDescription>不同的动画曲线，营造自然的运动感</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Linear', token: '--ease-linear', desc: '线性' },
                    { name: 'Ease In', token: '--ease-in', desc: '慢速开始' },
                    { name: 'Ease Out', token: '--ease-out', desc: '慢速结束' },
                    { name: 'Ease In Out', token: '--ease-in-out', desc: '慢速开始和结束' },
                    { name: 'Bounce', token: '--ease-bounce', desc: '弹性效果' },
                  ].map((easing) => (
                    <div key={easing.token} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm">{easing.name}</div>
                        <code className="text-xs text-muted-foreground">{easing.token}</code>
                      </div>
                      <div className="text-sm text-muted-foreground">{easing.desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>透明度（Opacity）</CardTitle>
                <CardDescription>11 级透明度，用于各种视觉层次</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-11 gap-2">
                  {[0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((opacity) => (
                    <div key={opacity} className="text-center">
                      <div
                        className="h-16 bg-primary rounded mb-2"
                        style={{ opacity: opacity / 100 }}
                      />
                      <div className="text-xs">{opacity}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Format Tab */}
          <TabsContent value="data-format" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>数据格式规范（Data Format）</CardTitle>
                <CardDescription>WMS 系统统一的数据显示格式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">数字精度</div>
                      <div className="text-2xl">1,234.56</div>
                      <code className="text-xs text-muted-foreground">--data-number-decimals: 2</code>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">货币符号</div>
                      <div className="text-2xl">$1,234.56</div>
                      <code className="text-xs text-muted-foreground">--data-currency-symbol: '$'</code>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">日期时间</div>
                      <div className="text-2xl">2025-01-15 14:30</div>
                      <code className="text-xs text-muted-foreground">--data-date-format: 'YYYY-MM-DD HH:mm'</code>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">库存数量</div>
                      <div className="text-2xl">1,234 件</div>
                      <code className="text-xs text-muted-foreground">千位分隔 + 单位</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>表格示例</CardTitle>
                <CardDescription>展示数据格式在表格中的应用</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU编号</TableHead>
                      <TableHead>产品名称</TableHead>
                      <TableHead className="text-right">库存数量</TableHead>
                      <TableHead className="text-right">单价</TableHead>
                      <TableHead className="text-right">总值</TableHead>
                      <TableHead>更新时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono">SKU-001234</TableCell>
                      <TableCell>蓝牙耳机</TableCell>
                      <TableCell className="text-right">1,234</TableCell>
                      <TableCell className="text-right">$29.99</TableCell>
                      <TableCell className="text-right">$36,987.66</TableCell>
                      <TableCell>2025-01-15 14:30</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">SKU-005678</TableCell>
                      <TableCell>无线充电器</TableCell>
                      <TableCell className="text-right">567</TableCell>
                      <TableCell className="text-right">$19.99</TableCell>
                      <TableCell className="text-right">$11,334.33</TableCell>
                      <TableCell>2025-01-15 10:15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">SKU-009012</TableCell>
                      <TableCell>手机支架</TableCell>
                      <TableCell className="text-right">89</TableCell>
                      <TableCell className="text-right">$9.99</TableCell>
                      <TableCell className="text-right">$889.11</TableCell>
                      <TableCell>2025-01-14 16:45</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* States Tab */}
          <TabsContent value="states" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Loading 状态</CardTitle>
                <CardDescription>数据加载中的视觉反馈</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <LoadingState />
                  <LoadingState message="正在加载数据..." />
                  <LoadingState message="正在同步库存信息，请稍候..." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Empty 状态</CardTitle>
                <CardDescription>无数据时的占位显示</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <EmptyState title="暂无内容" />
                  <EmptyState 
                    title="暂无入库单"
                    description="还没有创建任何入库单，点击下方按钮创建第一个入库单"
                    action={{
                      label: "创建入库单",
                      onClick: () => alert("创建入库单"),
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error 状态</CardTitle>
                <CardDescription>错误发生时的提示信息</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ErrorState />
                  <ErrorState 
                    title="加载失败"
                    message="无法连接到服务器，请检查网络连接"
                    onRetry={() => alert('重试')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patterns Tab */}
          <TabsContent value="patterns" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>表单模式（Form Pattern）</CardTitle>
                <CardDescription>标准表单布局和交互模式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU编号</Label>
                      <Input id="sku" placeholder="输入SKU编号" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product">产品名称</Label>
                      <Input id="product" placeholder="输入产品名称" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">数量</Label>
                      <Input id="quantity" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warehouse">仓库</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择仓库" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wh1">深圳仓</SelectItem>
                          <SelectItem value="wh2">香港仓</SelectItem>
                          <SelectItem value="wh3">美国仓</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="urgent" />
                    <Label htmlFor="urgent">紧急处理</Label>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button>提交</Button>
                    <Button variant="outline">取消</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>数据表格模式（Table Pattern）</CardTitle>
                <CardDescription>标准数据列表展示模式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Checkbox />
                      <span className="text-sm text-muted-foreground">已选择 0 项</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        导出
                      </Button>
                      <Button size="sm">
                        新建
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox />
                          </TableHead>
                          <TableHead>编号</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead className="text-right">数量</TableHead>
                          <TableHead className="text-right">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell><Checkbox /></TableCell>
                          <TableCell className="font-mono">IB-001234</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              style={{ 
                                backgroundColor: 'hsl(218 92% 95%)', 
                                color: 'hsl(218 92% 35%)',
                                borderColor: 'hsl(218 92% 85%)'
                              }}
                            >
                              处理中
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">1,234</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">查看</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Checkbox /></TableCell>
                          <TableCell className="font-mono">IB-001235</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              style={{ 
                                backgroundColor: 'hsl(40 96% 95%)', 
                                color: 'hsl(40 96% 35%)',
                                borderColor: 'hsl(40 96% 85%)'
                              }}
                            >
                              待处理
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">567</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">查看</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>状态卡片模式（Status Card Pattern）</CardTitle>
                <CardDescription>数据概览和统计展示</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>总库存</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl">12,345</div>
                      <div className="text-xs text-muted-foreground mt-1">+12.5% 较上月</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>待入库</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl">234</div>
                      <div className="text-xs text-muted-foreground mt-1">23 个订单</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>待出库</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl">567</div>
                      <div className="text-xs text-muted-foreground mt-1">45 个订单</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>低库存SKU</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl text-warning">12</div>
                      <div className="text-xs text-muted-foreground mt-1">需要补货</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
        </main>
      </div>
      <Toaster />
    </>
  );
}
