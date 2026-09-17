/**
 * axhub-components 组件库浏览页
 * 真源：src/component-templates/axhub/（复制自 03-组件库/组件模板，38 组件 · 6 类 · React 18 + Tailwind v4）
 * 形态：左侧分类筛选 + 组件卡片网格（真实渲染预览 + 复制提示词）
 * 依赖：lucide-react（工程已装）；token 来自 ../Design-components/theme.css
 */
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Plus, Search, RefreshCw, Download, Upload as UploadIcon, FolderOpen, CheckCircle2, Bell, Settings, User, Home, ChevronRight,
} from 'lucide-react';
import '../Design-components/theme.css';
import * as Ax from '../axhub';

/* ============ 组件元数据（提示词与 03-组件库/组件模板/提示词手册.md 对齐） ============ */
interface CompMeta { key: string; name: string; cat: string; desc: string; prompt: string; }

const CATS: Record<string, string> = { base: '基础', layout: '布局', form: '表单', data: '数据展示', feedback: '反馈', business: '业务' };

const P = (cat: string, name: string, usage: string, params: string, scene: string) =>
  `【组件引用】${name}（组件库 ${cat}）\n用法：${usage}\n参数：${params}\n场景：${scene}。不要自造同类样式。`;

const COMPONENTS: CompMeta[] = [
  // ===== base =====
  { key: 'Button', name: 'Button / ButtonGroup 按钮', cat: 'base', desc: '7 变体 × 3 尺寸 + loading/icon/ghost/block + 按钮组',
    prompt: P('base', 'Button 按钮', "import { Button, ButtonGroup } from '../component-templates/axhub'", "variant primary|secondary|outline|text|danger|success|warning；size sm|md|lg；loading；icon；ghost；block", '页面主/次操作、工具栏、表单提交、弹窗底部（主操作放最右）') },
  { key: 'Card', name: 'Card / SectionCard 卡片', cat: 'base', desc: 'title/extra/bordered/flush + SectionCard desc',
    prompt: P('base', 'Card 卡片', "import { Card, SectionCard } from '../component-templates/axhub'", "title；extra（右上操作）；bordered；flush（嵌表格/列表去内边距）；SectionCard 另有 desc", '页面区块容器、表格/表单外包、看板分区。列表页用 flush 包 DataTable') },
  { key: 'Tag', name: 'Tag 标签', cat: 'base', desc: '7 色 + closable + dot',
    prompt: P('base', 'Tag 标签', "import { Tag } from '../component-templates/axhub'", "color blue|green|orange|red|gray|purple|cyan；closable+onClose；dot", '状态/分类/属性标识、筛选回显。只读状态不要用 Switch 表达') },
  { key: 'Badge', name: 'Badge 徽标 / 状态点', cat: 'base', desc: '状态点模式 + 计数角标',
    prompt: P('base', 'Badge 徽标', "import { Badge } from '../component-templates/axhub'", "status default|processing|success|warning|danger + text（状态点）；count + children（角标）", '表格状态列、通知计数角标') },
  { key: 'Avatar', name: 'Avatar / AvatarGroup 头像', cat: 'base', desc: '文字/图片头像 + 分组（max 折叠）',
    prompt: P('base', 'Avatar 头像', "import { Avatar, AvatarGroup } from '../component-templates/axhub'", "src；name（无图生成文字头像）；size xs|sm|md|lg；shape circle|square", '表格负责人列、顶部账号、评论/动态、成员管理') },
  { key: 'Typography', name: 'Title / Text / Paragraph 文本', cat: 'base', desc: '标题级别 + 文本类型（含 ellipsis/code）',
    prompt: P('base', 'Typography 文本', "import { Title, Text, Paragraph } from '../component-templates/axhub'", "Title level 1-5；Text type primary|secondary|success|warning|danger|disabled、bold、ellipsis、code", '页面/区块标题、表格次要信息、错误文案。次要信息统一 type="secondary"') },
  { key: 'Divider', name: 'Divider 分割线', cat: 'base', desc: '横向/纵向 + 中间文字',
    prompt: P('base', 'Divider 分割线', "import { Divider } from '../component-templates/axhub'", "direction horizontal|vertical；align left|center|right；children 中间文字", '表单分区、详情字段组、工具栏按钮组之间') },
  { key: 'Overlay', name: 'Tooltip / Dropdown / Popover 浮层', cat: 'base', desc: '提示 / 更多菜单 / 轻量面板',
    prompt: P('base', '浮层组件', "import { Tooltip, Dropdown, Popover } from '../component-templates/axhub'", "Tooltip content+placement；Dropdown trigger+items[{key,label,icon,danger,dividerBefore}]+onSelect；Popover content+triggerMode", '图标释义、操作列「更多」、账号菜单、轻量设置') },
  // ===== layout =====
  { key: 'Grid', name: 'Space / Row·Col / Grid 排版', cat: 'layout', desc: '间距 / 24 栅格 / 等宽网格',
    prompt: P('layout', '排版栅格', "import { Space, Row, Col, Grid } from '../component-templates/axhub'", "Space size xs|sm|md|lg|数字、direction、wrap；Col span（24 栅格）；Grid cols 1|2|3|4|6、gap", '按钮间距、表单多列、卡片网格。禁止连续 margin 手工凑间距') },
  { key: 'PageHeader', name: 'PageHeader 页面头', cat: 'layout', desc: '标题+说明+面包屑+操作',
    prompt: P('layout', 'PageHeader 页面头', "import { PageHeader, Breadcrumb } from '../component-templates/axhub'", "title；desc；breadcrumb；onBack；extra；footer", '详情页/表单页/复杂列表页顶部。标题不要在卡片里重复') },
  { key: 'Tabs', name: 'Tabs 标签页', cat: 'layout', desc: 'line/card/capsule 三种',
    prompt: P('layout', 'Tabs 标签页', "import { Tabs } from '../component-templates/axhub'", "items[{key,label,children,disabled}]；defaultActiveKey；type line|card|capsule；centered", '设置页分组、详情分区、看板视图切换。同级切换用 Tabs，跨页跳转用菜单') },
  { key: 'Breadcrumb', name: 'Breadcrumb 面包屑', cat: 'layout', desc: '层级导航',
    prompt: P('layout', 'Breadcrumb 面包屑', "import { Breadcrumb } from '../component-templates/axhub'", "items[{title,href,icon}]；separator", '页面层级定位，配合 PageHeader breadcrumb 使用') },
  { key: 'Steps', name: 'Steps 步骤条', cat: 'layout', desc: '横向/纵向 + process/error',
    prompt: P('layout', 'Steps 步骤条', "import { Steps } from '../component-templates/axhub'", "items[{title,desc}]；current；direction horizontal|vertical；status process|error", '分步表单、导入向导（上传→校验→结果）、流程进度') },
  { key: 'Toolbar', name: 'Toolbar 工具栏', cat: 'layout', desc: 'left 操作 / right 搜索筛选',
    prompt: P('layout', 'Toolbar 工具栏', "import { Toolbar } from '../component-templates/axhub'", "left（主操作）；right（搜索/筛选/刷新）；divider", '列表页/表格卡片顶部操作条。不要每页手写 flex 排布') },
  { key: 'SideMenu', name: 'SideMenu 侧边菜单（规范组件）', cat: 'layout', desc: '展开 240 / 折叠 64，items 契约',
    prompt: P('layout', 'SideMenu 侧边菜单', "import SideMenu from '../component-templates/axhub/layout/side-menu'", "title；items[{key,label,icon?,disabled?,children?}]；defaultSelectedKey；onMenuSelect；onCollapseChange；collapsible；width；defaultCollapsed", '原型壳左侧功能目录。二级 sub 用页内 Tab 不进菜单') },
  // ===== form =====
  { key: 'FormField', name: 'FormField / FormRow / FormActions 字段容器', cat: 'form', desc: 'label/required/hint/error + 多列网格',
    prompt: P('form', 'FormField 字段容器', "import { FormField, FormRow, FormActions } from '../component-templates/axhub'", "FormField label/required/hint/error/horizontal/labelWidth；FormRow cols 1|2|3；FormActions align", '所有表单与筛选区字段包装。不要裸写 label+input，校验错误用 error 传入') },
  { key: 'Input', name: 'Input / Textarea / InputNumber / SearchBar 输入', cat: 'form', desc: 'prefix/suffix/allowClear + 计数 + 数字 + 搜索',
    prompt: P('form', '输入组件', "import { Input, Textarea, InputNumber, SearchBar } from '../component-templates/axhub'", "Input prefix/suffix/allowClear/error；Textarea showCount+maxLength；InputNumber min/max/step/controls；SearchBar onSearch+width", '文本输入、备注、数量/金额、列表页搜索框') },
  { key: 'Select', name: 'Select 下拉选择', cat: 'form', desc: '单选/多选 + allowClear',
    prompt: P('form', 'Select 下拉', "import { Select } from '../component-templates/axhub'", "options[{label,value,disabled}]；mode single|multiple；value/onChange；allowClear；placeholder；error", '筛选条件、表单枚举字段。选项 ≤5 且需常显改用 RadioGroup') },
  { key: 'Choice', name: 'RadioGroup / CheckboxGroup / Switch 选择开关', cat: 'form', desc: '单选/多选/分段控件/开关',
    prompt: P('form', '单选多选开关', "import { RadioGroup, CheckboxGroup, Switch } from '../component-templates/axhub'", "RadioGroup options/direction/buttonStyle；CheckboxGroup options/selectAll；Switch checked/onChange/size", '状态选择、类型切换、启用停用。开关不用于只读状态展示') },
  { key: 'DatePicker', name: 'DatePicker / RangePicker / TimePicker 日期时间', cat: 'form', desc: '日期/区间（带快捷项）/时刻',
    prompt: P('form', '日期组件', "import { DatePicker, RangePicker, TimePicker } from '../component-templates/axhub'", "DatePicker mode date|datetime；RangePicker 默认带近 7 天/近 30 天/今年；TimePicker HH:mm", '单据日期、统计区间筛选、执行时刻') },
  { key: 'Upload', name: 'Upload 上传', cat: 'form', desc: 'list/drag 两种 + 进度/删除',
    prompt: P('form', 'Upload 上传', "import { Upload, type UploadFile } from '../component-templates/axhub'", "mode list|drag；accept；files+onChange（父级负责真实上传）；onRemove；maxCount；hint", '导入 Excel、附件/图片上传、导入向导第一步') },
  // ===== data =====
  { key: 'DataTable', name: 'DataTable 表格', cat: 'data', desc: '列定义 + 排序 + loading + 空态 + 汇总',
    prompt: P('data', 'DataTable 表格', "import { DataTable, type Column } from '../component-templates/axhub'", "columns[{title,key,width,align,sortable,render,ellipsis}]；data；rowKey；loading；emptyText；rowSelection；onRowClick；summary", '所有列表页主表格。状态列用 Tag/StatusTag，操作列固定最右。不要手写 <table>') },
  { key: 'Pagination', name: 'Pagination 分页', cat: 'data', desc: 'pageSize 切换 + showTotal',
    prompt: P('data', 'Pagination 分页', "import { Pagination } from '../component-templates/axhub'", "current/pageSize/total/onChange(page,pageSize)；pageSizeOptions；showTotal；align", '表格底部（TableCard 已内置，独立用时放卡片右下）') },
  { key: 'Descriptions', name: 'Descriptions 描述列表', cat: 'data', desc: '字段网格 + bordered/layout',
    prompt: P('data', 'Descriptions 描述列表', "import { Descriptions } from '../component-templates/axhub'", "items[{label,value,span}]；column 1|2|3|4；bordered；layout horizontal|vertical；labelWidth", '详情页只读字段区。状态字段值传 <StatusTag />') },
  { key: 'Progress', name: 'Progress / RingProgress 进度', cat: 'data', desc: 'autoStatus 自动取色 + 环形',
    prompt: P('data', 'Progress 进度', "import { Progress, RingProgress, autoStatus } from '../component-templates/axhub'", "percent；status 或 autoStatus(percent)；height；RingProgress size/thickness/text", '任务完成率、导入进度、指标达成率（建议 autoStatus 自动取色）') },
  { key: 'List', name: 'List / ListItem 列表', cat: 'data', desc: 'avatar/title/desc/extra/footer',
    prompt: P('data', 'List 列表', "import { List, ListItem } from '../component-templates/axhub'", "ListItem avatar/title/desc/extra/footer/onClick；List bordered/split/empty", '消息通知、动态流、待办、搜索结果、主从分栏左列表') },
  { key: 'Tree', name: 'Tree 树形导航', cat: 'data', desc: '可搜索 + 默认展开',
    prompt: P('data', 'Tree 树', "import { Tree, type TreeNode } from '../component-templates/axhub'", "data；selectedKey+onSelect；searchable；defaultExpandAll", '左树右表（分类/组织/目录 + 明细）、素材库目录') },
  // ===== feedback =====
  { key: 'Modal', name: 'Modal / ConfirmModal 弹窗', cat: 'feedback', desc: '受控 + maskClosable(false) + 二次确认',
    prompt: P('feedback', 'Modal 弹窗', "import { Modal, ConfirmModal } from '../component-templates/axhub'", "Modal open/onClose/title/width/footer/maskClosable(默认 false，Esc 可关)；ConfirmModal danger/content/onOk/loading", '表单新增编辑、确认操作、详情速览。破坏性操作必须 ConfirmModal 二次确认') },
  { key: 'Drawer', name: 'Drawer 抽屉', cat: 'feedback', desc: '右/左滑出 + footer',
    prompt: P('feedback', 'Drawer 抽屉', "import { Drawer } from '../component-templates/axhub'", "open/onClose/title/width(默认 480)/footer/placement right|left", '详情速览（不跳页）、编辑表单、筛选/配置面板。保留上下文用 Drawer，强打断用 Modal') },
  { key: 'Alert', name: 'Alert 提示条', cat: 'feedback', desc: 'info/success/warning/error + closable/action',
    prompt: P('feedback', 'Alert 提示条', "import { Alert } from '../component-templates/axhub'", "type info|success|warning|error；title；closable；action；bordered", '表单说明、校验失败汇总、数据异常/风险提示') },
  { key: 'Spin', name: 'Spin / Skeleton / Empty 加载与空态', cat: 'feedback', desc: '局部加载 / 骨架占位 / 空态+action',
    prompt: P('feedback', '加载与空态', "import { Spin, Skeleton, Empty } from '../component-templates/axhub'", "Spin tip/size/fullscreen；Skeleton variant text|card|table|list + rows；Empty desc+action", '局部加载用 Spin；首载占位用 Skeleton；无结果用 Empty（尽量给 action）') },
  { key: 'ResultPage', name: 'ResultPage 结果页', cat: 'feedback', desc: 'success/error/warning/waiting/403/404/500',
    prompt: P('feedback', 'ResultPage 结果页', "import { ResultPage } from '../component-templates/axhub'", "status success|error|warning|waiting|403|404|500；title/desc/actions/extra", '提交成功、操作失败、审批等待、异常页。success 给下一步；error 给原因与重试') },
  { key: 'message', name: 'message 轻提示', cat: 'feedback', desc: '全局 MessageHost + 命令式调用',
    prompt: P('feedback', 'message 轻提示', "import { message, MessageHost } from '../component-templates/axhub'", "页面根挂 <MessageHost />，任意处 message.success('保存成功')；success/error/warning/info", '保存/复制/校验的轻量反馈。需用户确认时用 ConfirmModal') },
  // ===== business =====
  { key: 'StatCard', name: 'StatCard / KpiRow 指标卡', cat: 'business', desc: '指标卡（趋势/图标/tone）+ KPI 行',
    prompt: P('business', '指标卡', "import { StatCard, KpiRow } from '../component-templates/axhub'", "StatCard label/value/trend/trendUp/trendLabel/icon/tone/footer；KpiRow cols 2|3|4|6", '数据概览/看板顶部 KPI 区。一张卡一个指标，统一用 KpiRow 包') },
  { key: 'FilterBar', name: 'FilterBar / FilterBarInline 筛选栏', cat: 'business', desc: '多条件筛选 + 折叠 + 查询重置',
    prompt: P('business', 'FilterBar 筛选栏', "import { FilterBar, FilterBarInline } from '../component-templates/axhub'", "FilterBar onSearch/onReset/columns 2|3|4/collapseAfter/card；FilterBarInline 顶部标签筛选", '列表页/报表页多条件筛选。字段用 FormField 包；查询主按钮、重置描边按钮') },
  { key: 'TableCard', name: 'TableCard / DetailCard 骨架', cat: 'business', desc: '列表页骨架（卡片+工具栏+表格+分页）',
    prompt: P('business', 'TableCard 列表页骨架', "import { TableCard, DetailCard } from '../component-templates/axhub'", "TableCard title/extra/toolbarLeft/toolbarRight/pagination/empty；DetailCard 详情页分组", 'CRUD 列表页标准结构一次组装；详情页按「基础信息/客户信息/附件」分组') },
  { key: 'StatusTag', name: 'StatusTag 状态标签', cat: 'business', desc: '状态码→中文+颜色（STATUS_PRESETS）',
    prompt: P('business', 'StatusTag 状态标签', "import { StatusTag, STATUS_PRESETS } from '../component-templates/axhub'", "value + map；预设 STATUS_PRESETS.enabled/.approval/.task/.health；fallback/passthrough", '表格状态列、详情状态字段。状态码统一映射，不要写死颜色 if/else') },
];

/* ============ 预览渲染 ============ */
const rows = [
  { id: 1, name: '指标管理平台', status: '运行中', owner: 'CodeBuddy', updated: '2026-09-14' },
  { id: 2, name: '供应商门户', status: '编辑中', owner: '豆包', updated: '2026-09-13' },
  { id: 3, name: '数据看板', status: '已归档', owner: 'DeepSeek', updated: '2026-09-11' },
];
const tableColumns: Ax.Column<typeof rows[number]>[] = [
  { title: '项目名称', key: 'name', sortable: true },
  { title: '状态', key: 'status', render: (r) => r.status === '运行中' ? <Ax.Tag color="blue">{r.status}</Ax.Tag> : r.status === '编辑中' ? <Ax.Tag color="green">{r.status}</Ax.Tag> : <Ax.Tag>{r.status}</Ax.Tag> },
  { title: '负责人', key: 'owner' },
  { title: '更新时间', key: 'updated', sortable: true, align: 'right' },
];
const demoBox: React.CSSProperties = { background: '#fff', borderRadius: 8, padding: 10, width: '100%', boxSizing: 'border-box' };

function Preview({ ck }: { ck: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  switch (ck) {
    case 'Button': return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <Ax.Button variant="primary" icon={<Plus size={14} />}>新增</Ax.Button>
        <Ax.Button variant="secondary">次要</Ax.Button><Ax.Button variant="outline">描边</Ax.Button>
        <Ax.Button variant="text">文字</Ax.Button><Ax.Button variant="danger">危险</Ax.Button>
        <Ax.Button variant="success">成功</Ax.Button><Ax.Button variant="warning">警告</Ax.Button>
        <Ax.Button loading>加载中</Ax.Button>
        <Ax.ButtonGroup>
          <Ax.Button size="sm" variant="primary">小</Ax.Button>
          <Ax.Button size="sm" variant="primary">小</Ax.Button>
        </Ax.ButtonGroup>
      </div>);
    case 'Card': return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
        <Ax.Card title="基础卡片" extra={<Ax.Button size="sm" variant="text">操作</Ax.Button>}><div style={{ fontSize: 12, color: '#6b7280' }}>title + extra + 内容区</div></Ax.Card>
        <Ax.Card title="flush 嵌表" flush><table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}><tbody><tr><td style={{ borderBottom: '1px solid #f0f0f0', padding: '5px 8px' }}>行 1</td></tr><tr><td style={{ padding: '5px 8px' }}>行 2</td></tr></tbody></table></Ax.Card>
      </div>);
    case 'Tag': return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        <Ax.Tag color="blue">运行中</Ax.Tag><Ax.Tag color="green">已通过</Ax.Tag><Ax.Tag color="orange">待确认</Ax.Tag>
        <Ax.Tag color="red">异常</Ax.Tag><Ax.Tag color="gray">已归档</Ax.Tag><Ax.Tag color="purple">专业版</Ax.Tag><Ax.Tag color="cyan">信息</Ax.Tag>
        <Ax.Tag color="blue" dot>有状态点</Ax.Tag><Ax.Tag color="blue" closable>可关闭</Ax.Tag>
      </div>);
    case 'Badge': return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
        <Ax.Badge status="processing" text="运行中" />
        <Ax.Badge status="success" text="已通过" /><Ax.Badge status="warning" text="待确认" />
        <Ax.Badge status="danger" text="异常" /><Ax.Badge status="default" text="已归档" />
        <Ax.Badge count={5}><Bell size={18} /></Ax.Badge>
      </div>);
    case 'Avatar': return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
        <Ax.Avatar name="游" size="lg" />
        <Ax.Avatar name="CodeBuddy" size="md" />
        <Ax.Avatar name="DeepSeek" size="sm" />
        <Ax.AvatarGroup max={3}>
          <Ax.Avatar name="豆包" /><Ax.Avatar name="WorkBuddy" /><Ax.Avatar name="CodeBuddy" /><Ax.Avatar name="DeepSeek" />
        </Ax.AvatarGroup>
      </div>);
    case 'Typography': return (
      <div style={{ textAlign: 'center' }}>
        <Ax.Title level={3}>标题 Typography</Ax.Title>
        <div style={{ fontSize: 12, color: '#6b7280' }}>
          <Ax.Text type="primary">主文本</Ax.Text> · <Ax.Text type="secondary">次要信息</Ax.Text> ·
          <Ax.Text type="success">成功</Ax.Text> · <Ax.Text type="warning">警告</Ax.Text> ·
          <Ax.Text type="danger">错误</Ax.Text> · <Ax.Text bold>加粗</Ax.Text> · <Ax.Text code>code</Ax.Text>
        </div>
        <Ax.Paragraph secondary>段落：用于描述性说明文字，支持 ellipsis 截断。</Ax.Paragraph>
      </div>);
    case 'Divider': return (
      <div style={{ width: '100%' }}>
        <div style={{ fontSize: 12, color: '#6b7280' }}>上区块</div>
        <Ax.Divider>分隔文字</Ax.Divider>
        <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 8 }}>
          左<Ax.Divider direction="vertical" />中<Ax.Divider direction="vertical" />右
        </div>
      </div>);
    case 'Overlay': return (
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center' }}>
        <Ax.Tooltip content="Tooltip 提示内容" placement="top"><Ax.Button size="sm" variant="outline">Hover 提示</Ax.Button></Ax.Tooltip>
        <Ax.Dropdown trigger={<Ax.Button size="sm" variant="outline">更多操作</Ax.Button>} items={[{ key: 'edit', label: '编辑' }, { key: 'del', label: '删除', danger: true }]} onSelect={() => {}} />
        <Ax.Popover content="Popover 轻量面板内容" triggerMode="click"><Ax.Button size="sm" variant="text">Popover</Ax.Button></Ax.Popover>
      </div>);
    case 'Grid': return (
      <div style={{ width: '100%' }}>
        <Ax.Space size="sm" wrap><Ax.Button size="sm" variant="primary">间距 A</Ax.Button><Ax.Button size="sm" variant="outline">间距 B</Ax.Button><Ax.Button size="sm" variant="text">间距 C</Ax.Button></Ax.Space>
        <Ax.Grid cols={4} gap={6}>
          {[1, 2, 3, 4].map(i => <div key={i} style={{ background: '#e8f3ff', border: '1px solid #d6e4ff', borderRadius: 6, fontSize: 11, color: '#165dff', textAlign: 'center', padding: '6px 0' }}>Col {i}</div>)}
        </Ax.Grid>
      </div>);
    case 'PageHeader': return (
      <Ax.PageHeader title="指标管理" desc="平台指标全生命周期管理" breadcrumb={<Ax.Breadcrumb items={[{ title: '首页' }, { title: '指标管理' }]} />}
        extra={<><Ax.Button size="sm" variant="outline">导出</Ax.Button><Ax.Button size="sm" variant="primary" icon={<Plus size={13} />}>新建指标</Ax.Button></>} />
    );
    case 'Tabs': return (
      <div style={{ width: '100%', background: '#fff', borderRadius: 8 }}>
        <Ax.Tabs items={[{ key: 'a', label: '基本设置' }, { key: 'b', label: '权限配置' }, { key: 'c', label: '数据源' }]} defaultActiveKey="a" />
      </div>);
    case 'Breadcrumb': return (
      <Ax.Breadcrumb items={[{ title: '首页' }, { title: '项目管理' }, { title: '指标管理平台' }]} />
    );
    case 'Steps': return (
      <Ax.Steps items={[{ title: '上传文件', desc: '选择 Excel' }, { title: '字段校验', desc: '检查格式' }, { title: '导入完成', desc: '写入数据' }]} current={1} />
    );
    case 'Toolbar': return (
      <div style={{ width: '100%' }}>
        <Ax.Toolbar left={<><Ax.Button size="sm" variant="primary" icon={<Plus size={13} />}>新增</Ax.Button><Ax.Button size="sm" variant="outline" icon={<Download size={13} />}>批量导入</Ax.Button></>}
          right={<><Ax.Button size="sm" variant="outline" icon={<Search size={13} />}>搜索</Ax.Button><Ax.Button size="sm" variant="text" icon={<RefreshCw size={13} />}>刷新</Ax.Button></>} />
      </div>);
    case 'SideMenu': return (
      <div style={{ maxWidth: 240, overflow: 'auto', background: '#fff', borderRadius: 8 }}>
        <Ax.SideMenu title="结构监测" items={[{ key: 'dashboard', label: '数据看板' }, { key: 'alert', label: '预警管理' }, { key: 'device', label: '设备管理' }, { key: 'diagnosis', label: '诊断分析' }, { key: 'report', label: '报告中心' }]} defaultSelectedKey="dashboard" onMenuSelect={() => {}} />
      </div>);
    case 'FormField': return (
      <div style={demoBox}>
        <Ax.FormRow cols={2}>
          <Ax.FormField label="项目名称" required hint="字母/数字"><Ax.Input placeholder="my-dashboard" prefix={<Search size={13} />} /></Ax.FormField>
          <Ax.FormField label="负责人"><Ax.Select placeholder="请选择" options={[{ label: 'CodeBuddy', value: 'cb' }, { label: '豆包', value: 'db' }]} /></Ax.FormField>
        </Ax.FormRow>
        <Ax.FormField label="备注" error="备注不能超过 100 字"><Ax.Input placeholder="选填" /></Ax.FormField>
      </div>);
    case 'Input': return (
      <div style={{ ...demoBox, display: 'grid', gap: 8 }}>
        <Ax.Input placeholder="基础输入" />
        <Ax.Input placeholder="带图标" prefix={<Search size={13} />} suffix={<Ax.Tag color="blue">主键</Ax.Tag>} allowClear />
        <Ax.Textarea placeholder="多行备注" rows={2} showCount maxLength={50} />
        <div style={{ display: 'flex', gap: 6 }}><Ax.InputNumber placeholder="数量" style={{ flex: 1 }} /><Ax.SearchBar placeholder="搜索" onSearch={() => {}} style={{ flex: 2 }} /></div>
      </div>);
    case 'Select': return (
      <div style={{ ...demoBox, display: 'grid', gap: 8 }}>
        <Ax.Select placeholder="单选状态" options={[{ label: '运行中', value: 'running' }, { label: '编辑中', value: 'editing' }, { label: '已归档', value: 'archived' }]} />
        <Ax.Select mode="multiple" placeholder="多选负责人" options={[{ label: 'CodeBuddy', value: 'cb' }, { label: '豆包', value: 'db' }, { label: 'DeepSeek', value: 'ds' }]} />
      </div>);
    case 'Choice': return (
      <div style={{ ...demoBox, display: 'grid', gap: 10 }}>
        <Ax.RadioGroup options={[{ label: '全部', value: 'all' }, { label: '运行中', value: 'running' }, { label: '已归档', value: 'archived' }]} value="running" />
        <Ax.CheckboxGroup options={[{ label: '看板', value: 'board' }, { label: '表格', value: 'table' }, { label: '图表', value: 'chart' }]} value={['board']} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280' }}>启用监控<Ax.Switch checked onChange={() => {}} /></div>
      </div>);
    case 'DatePicker': return (
      <div style={{ ...demoBox, display: 'grid', gap: 8 }}>
        <Ax.DatePicker placeholder="选择日期" />
        <Ax.RangePicker />
        <Ax.TimePicker />
      </div>);
    case 'Upload': return (
      <div style={demoBox}>
        <Ax.Upload accept=".xlsx,.csv" files={[
          { uid: '1', name: '指标清单.xlsx', status: 'done' },
          { uid: '2', name: '数据字典.csv', status: 'uploading', percent: 45 },
        ]} onChange={() => {}} />
      </div>);
    case 'DataTable': return (
      <div style={demoBox}>
        <Ax.DataTable columns={tableColumns} data={rows} rowKey="id" />
      </div>);
    case 'Pagination': return (
      <div style={demoBox}><Ax.Pagination current={2} pageSize={10} total={85} showTotal /></div>
    );
    case 'Descriptions': return (
      <div style={demoBox}>
        <Ax.Descriptions column={2} items={[
          { label: '项目名称', value: '指标管理平台' }, { label: '负责人', value: 'CodeBuddy' },
          { label: '创建时间', value: '2026-09-01' }, { label: '状态', value: <Ax.StatusTag value="running" map={{ running: { label: '运行中', color: 'blue' } }} /> },
        ]} />
      </div>);
    case 'Progress': return (
      <div style={{ ...demoBox, display: 'grid', gap: 8, alignItems: 'center' }}>
        <Ax.Progress percent={66} />
        <Ax.Progress percent={100} />
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}><Ax.RingProgress percent={75} size={54} text="75%" /><Ax.RingProgress percent={40} size={54} /></div>
      </div>);
    case 'List': return (
      <div style={demoBox}>
        <Ax.List>
          <Ax.ListItem avatar={<Ax.Avatar name="A" size="sm" />} title="指标阈值预警" desc="3 分钟前" extra={<Ax.Tag color="red">紧急</Ax.Tag>} />
          <Ax.ListItem avatar={<Ax.Avatar name="B" size="sm" />} title="数据源同步完成" desc="10 分钟前" extra={<Ax.Tag color="green">完成</Ax.Tag>} />
          <Ax.ListItem avatar={<Ax.Avatar name="C" size="sm" />} title="有新的审批待处理" desc="1 小时前" />
        </Ax.List>
      </div>);
    case 'Tree': return (
      <div style={demoBox}>
        <Ax.Tree data={[
          { key: 'p', title: '指标库', children: [{ key: 'p1', title: '业务指标' }, { key: 'p2', title: '技术指标' }] },
          { key: 'd', title: '数据字典', children: [{ key: 'd1', title: '维度字典' }] },
        ]} defaultExpandAll selectedKey="p1" />
      </div>);
    case 'Modal': return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Ax.Button size="sm" onClick={() => setModalOpen(true)}>打开弹窗</Ax.Button>
        <Ax.Modal open={modalOpen} onClose={() => setModalOpen(false)} title="确认操作" width={400}
          footer={<><Ax.Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>取消</Ax.Button><Ax.Button size="sm" onClick={() => setModalOpen(false)}>确定</Ax.Button></>}>
          <p style={{ fontSize: 12.5, color: '#6b7280', margin: 0 }}>默认遮罩不关闭（防误关），Esc 可关，内容超高自动滚动。破坏性操作请用 ConfirmModal。</p>
        </Ax.Modal>
      </div>);
    case 'Drawer': return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Ax.Button size="sm" variant="outline" onClick={() => setDrawerOpen(true)}>打开抽屉</Ax.Button>
        <Ax.Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="详情速览" width={320}
          footer={<Ax.Button size="sm" onClick={() => setDrawerOpen(false)}>关闭</Ax.Button>}>
          <p style={{ fontSize: 12.5, color: '#6b7280', margin: 0 }}>保留列表上下文，不跳页查看详情。编辑/配置面板也可用 Drawer。</p>
        </Ax.Drawer>
      </div>);
    case 'Alert': return (
      <div style={{ display: 'grid', gap: 6, width: '100%' }}>
        <Ax.Alert type="info" title="说明：本页面为只读预览" />
        <Ax.Alert type="success" title="导入成功：共 128 条记录" />
        <Ax.Alert type="warning" title="存在 3 个字段无法自动匹配" closable />
        <Ax.Alert type="error" title="连接数据源失败，请检查网络配置" action={<Ax.Button size="sm" variant="text">重试</Ax.Button>} />
      </div>);
    case 'Spin': return (
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}><Ax.Spin tip="加载中" /><div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>Spin</div></div>
        <div style={{ width: 150 }}><Ax.Skeleton variant="card" rows={2} /><div style={{ fontSize: 11, color: '#6b7280', textAlign: 'center' }}>Skeleton</div></div>
        <Ax.Empty desc="暂无数据" action={<Ax.Button size="sm" variant="outline">去创建</Ax.Button>} />
      </div>);
    case 'ResultPage': return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
        <div style={{ background: '#fff', borderRadius: 8 }}><Ax.ResultPage status="success" title="创建成功" desc="项目已创建" actions={<Ax.Button size="sm">返回列表</Ax.Button>} /></div>
        <div style={{ background: '#fff', borderRadius: 8 }}><Ax.ResultPage status="error" title="操作失败" desc="原因：服务不可用" actions={<Ax.Button size="sm" variant="outline">重试</Ax.Button>} /></div>
      </div>);
    case 'message': return (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <Ax.Button size="sm" variant="success" onClick={() => Ax.message.success('保存成功')}>成功提示</Ax.Button>
        <Ax.Button size="sm" variant="outline" onClick={() => Ax.message.info('正在处理…')}>信息提示</Ax.Button>
        <Ax.Button size="sm" variant="danger" onClick={() => Ax.message.error('操作失败，请重试')}>错误提示</Ax.Button>
      </div>);
    case 'StatCard': return (
      <Ax.KpiRow cols={4} gap={6}>
        <Ax.StatCard label="项目总数" value={12} trend="+2" trendUp icon={<FolderOpen size={15} />} tone="primary" />
        <Ax.StatCard label="运行中" value={8} icon={<CheckCircle2 size={15} />} tone="success" />
        <Ax.StatCard label="待处理" value={3} icon={<Bell size={15} />} tone="warning" />
        <Ax.StatCard label="异常" value={1} trend="+1" icon={<Settings size={15} />} tone="danger" />
      </Ax.KpiRow>);
    case 'FilterBar': return (
      <div style={demoBox}>
        <Ax.FilterBar columns={3} onSearch={() => {}} onReset={() => {}}>
          <Ax.FormField label="状态"><Ax.Select placeholder="全部" options={[{ label: '运行中', value: 'running' }, { label: '已归档', value: 'archived' }]} /></Ax.FormField>
          <Ax.FormField label="负责人"><Ax.Select placeholder="全部" options={[{ label: 'CodeBuddy', value: 'cb' }, { label: '豆包', value: 'db' }]} /></Ax.FormField>
          <Ax.FormField label="创建时间"><Ax.RangePicker /></Ax.FormField>
        </Ax.FilterBar>
      </div>);
    case 'TableCard': return (
      <Ax.TableCard title="项目列表" extra={<Ax.Button size="sm" variant="primary" icon={<Plus size={13} />}>新增项目</Ax.Button>}
        toolbarLeft={<Ax.Button size="sm" variant="outline">批量导入</Ax.Button>} toolbarRight={<Ax.SearchBar placeholder="搜索项目" onSearch={() => {}} width={200} />}
        pagination={{ current: 1, pageSize: 10, total: 3 }}>
        <Ax.DataTable columns={tableColumns} data={rows} rowKey="id" />
      </Ax.TableCard>);
    case 'StatusTag': return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Ax.StatusTag value="running" map={Ax.STATUS_PRESETS.enabled} />
        <Ax.StatusTag value="pending" map={Ax.STATUS_PRESETS.approval} />
        <Ax.StatusTag value="approved" map={Ax.STATUS_PRESETS.approval} />
        <Ax.StatusTag value="healthy" map={Ax.STATUS_PRESETS.health} />
        <Ax.StatusTag value="doing" map={Ax.STATUS_PRESETS.task} />
      </div>);
    default: return null;
  }
}

/* ============ 卡片 ============ */
function CompCard({ meta }: { meta: CompMeta }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 14px 2px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <b style={{ fontSize: 13.5 }}>{meta.name}</b>
        <span style={{ fontSize: 11, background: '#eef4ff', color: '#165dff', borderRadius: 999, padding: '1px 8px', flexShrink: 0 }}>{CATS[meta.cat]}</span>
      </div>
      <div style={{ padding: '2px 14px 4px', fontSize: 11.5, color: '#6b7280' }}>{meta.desc}</div>
      <div style={{ margin: '8px 14px 0', padding: 12, minHeight: 130, background: 'linear-gradient(180deg,#fafbfc,#f2f3f5)', border: '1px solid #f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
        <Preview ck={meta.key} />
      </div>
      <div style={{ borderTop: '1px solid #f0f0f0', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <pre style={{ flex: 1, margin: 0, fontSize: 10.5, lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#3f3f46', fontFamily: 'ui-monospace,Consolas,monospace', maxHeight: 66, overflow: 'auto' }}>{meta.prompt}</pre>
        <button onClick={() => { navigator.clipboard.writeText(meta.prompt).catch(() => { const ta = document.createElement('textarea'); ta.value = meta.prompt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
          style={{ flexShrink: 0, border: '1px solid #165dff', background: copied ? '#00b42a' : '#165dff', borderColor: copied ? '#00b42a' : '#165dff', color: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>
          {copied ? '已复制 ✓' : '复制提示词'}
        </button>
      </div>
    </div>
  );
}

/* ============ 页面 ============ */
function App() {
  const [cat, setCat] = useState('all');
  const cats = useMemo(() => ['all', ...Array.from(new Set(COMPONENTS.map(c => c.cat)))], []);
  const list = cat === 'all' ? COMPONENTS : COMPONENTS.filter(c => c.cat === cat);
  return (
    <div style={{ display: 'flex', gap: 18 }}>
      <div style={{ width: 148, flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>axhub-components</div>
        <div style={{ fontSize: 11.5, color: '#6b7280', marginBottom: 12 }}>{COMPONENTS.length} 组件 · 6 类<br />React 18 + Tailwind v4</div>
        <nav style={{ display: 'grid', gap: 4 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ textAlign: 'left', border: c === cat ? '1px solid #165dff' : '1px solid #e5e7eb', background: c === cat ? '#e8f3ff' : '#fff', color: c === cat ? '#165dff' : '#4e5969', borderRadius: 8, padding: '7px 12px', fontSize: 12.5, cursor: 'pointer' }}>
              {c === 'all' ? `全部（${COMPONENTS.length}）` : `${CATS[c]}（${COMPONENTS.filter(x => x.cat === c).length}）`}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: 14, fontSize: 11, color: '#a1a1aa', lineHeight: 1.6 }}>
          真源：src/component-templates/axhub/<br />复制自 03-组件库/组件模板
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 14, display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 19, margin: 0 }}>组件库 · {cat === 'all' ? '全部组件' : CATS[cat]}</h1>
          <span style={{ fontSize: 12, color: '#6b7280' }}>预览为真实渲染，点「复制提示词」可在对话中引用该组件（import '../component-templates/axhub'）</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(480px,1fr))', gap: 12 }}>
          {list.map(c => <CompCard key={c.key} meta={c} />)}
        </div>
      </div>
      <Ax.MessageHost />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
