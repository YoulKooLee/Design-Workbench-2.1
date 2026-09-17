/**
 * 组件库浏览页 · 数据展示（data）
 * 组件源：../axhub/数据展示（Codebuddy Design 复制）
 * 交互：卡片网格 + 真实渲染预览 + 复制提示词
 */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Copy, Search } from 'lucide-react';
import { DataTable, Pagination, Descriptions, Progress, List, Timeline, Collapse, StatCard } from '../axhub/数据展示';

interface CompMeta { key: string; name: string; desc: string; prompt: string; }

interface Row { id: number; name: string; status: string; owner: string; }
const rows: Row[] = [
  { id: 1, name: '指标管理平台', status: '运行中', owner: 'CodeBuddy' },
  { id: 2, name: '供应商门户', status: '编辑中', owner: '豆包' },
  { id: 3, name: '数据看板', status: '已归档', owner: 'DeepSeek' },
];

const PROMPTS: Record<string, string> = {
  DataTable: '【组件引用】DataTable 数据表格（数据展示）\n框架：React + Tailwind v4\n用法：import { DataTable, type Column } from "../../component-templates/axhub/数据展示"\n参数：columns（{title,key,sortable,align,render,width}）；data；rowKey；loading\n请在列表/表格类页面使用该组件。',
  Pagination: '【组件引用】Pagination 分页（数据展示）\n框架：React + Tailwind v4\n用法：import { Pagination } from "../../component-templates/axhub/数据展示"\n参数：current；pageSize；total；onChange\n请在列表分页场景使用该组件。',
  StatCard: '【组件引用】StatCard 统计指标卡（数据展示/业务）\n框架：React + Tailwind v4\n用法：import { StatCard } from "../../component-templates/axhub/数据展示"\n参数：label（指标名）；value（数值）；trend（涨跌幅）；trendUp；icon；tone: primary|success|warning|danger|default\n请在数据概览/看板顶部指标区使用该组件。',
  Descriptions: '【组件引用】Descriptions 描述列表（数据展示）\n框架：React + Tailwind v4\n用法：import { Descriptions } from "../../component-templates/axhub/数据展示"\n参数：items: [{label,value}]；column；bordered\n请在详情页字段展示场景使用该组件。',
  Progress: '【组件引用】Progress 进度条（数据展示）\n框架：React + Tailwind v4\n用法：import { Progress } from "../../component-templates/axhub/数据展示"\n参数：percent（0-100）；status: normal|success|warning|danger\n请在进度/容量占比场景使用该组件。',
  List: '【组件引用】List 列表（数据展示）\n框架：React + Tailwind v4\n用法：import { List } from "../../component-templates/axhub/数据展示"\n参数：dataSource；renderItem；header；footer\n请在消息/记录列表场景使用该组件。',
  Timeline: '【组件引用】Timeline 时间线（数据展示）\n框架：React + Tailwind v4\n用法：import { Timeline } from "../../component-templates/axhub/数据展示"\n参数：items: [{title,desc,time,color}]；mode\n请在操作记录/流程时间线场景使用该组件。',
  Collapse: '【组件引用】Collapse 折叠面板（数据展示）\n框架：React + Tailwind v4\n用法：import { Collapse } from "../../component-templates/axhub/数据展示"\n参数：items: [{key,title,content}]；defaultActiveKeys\n请在说明/明细折叠场景使用该组件。',
  Tree: '【组件引用】Tree 树形控件（数据展示）\n框架：React + Tailwind v4\n用法：import { Tree } from "../../component-templates/axhub/数据展示"\n参数：treeData（层级）；defaultExpandAll；onSelect\n请在组织/分类树场景使用该组件。',
  Chart: '【组件引用】Chart 图表（数据展示）\n框架：React + Tailwind v4\n用法：import { Chart } from "../../component-templates/axhub/数据展示"\n参数：type: line|bar|area|pie；data/series\n请在趋势/占比可视化场景使用该组件。',
  Calendar: '【组件引用】Calendar 日历（数据展示）\n框架：React + Tailwind v4\n用法：import { Calendar } from "../../component-templates/axhub/数据展示"\n参数：value；onSelect；cellRender\n请在排期/日程场景使用该组件。',
};

const COMPONENTS: CompMeta[] = [
  { key: 'DataTable', name: 'DataTable 数据表格', desc: '列/排序/渲染插槽', prompt: PROMPTS.DataTable },
  { key: 'StatCard', name: 'StatCard 统计指标卡', desc: '指标 + 趋势 + 图标', prompt: PROMPTS.StatCard },
  { key: 'Pagination', name: 'Pagination 分页', desc: 'current/pageSize/total', prompt: PROMPTS.Pagination },
  { key: 'Descriptions', name: 'Descriptions 描述列表', desc: '详情字段展示', prompt: PROMPTS.Descriptions },
  { key: 'Progress', name: 'Progress 进度条', desc: 'percent + 状态色', prompt: PROMPTS.Progress },
  { key: 'Timeline', name: 'Timeline 时间线', desc: '操作记录', prompt: PROMPTS.Timeline },
  { key: 'Collapse', name: 'Collapse 折叠面板', desc: '明细折叠', prompt: PROMPTS.Collapse },
  { key: 'List', name: 'List 列表', desc: '消息/记录列表', prompt: PROMPTS.List },
  { key: 'Tree', name: 'Tree 树形控件', desc: '组织/分类树', prompt: PROMPTS.Tree },
  { key: 'Chart', name: 'Chart 图表', desc: 'line/bar/pie', prompt: PROMPTS.Chart },
  { key: 'Calendar', name: 'Calendar 日历', desc: '排期/日程', prompt: PROMPTS.Calendar },
];

function Preview({ ck }: { ck: string }) {
  switch (ck) {
    case 'DataTable': {
      const columns = [
        { title: '项目名称', key: 'name' },
        { title: '状态', key: 'status' },
        { title: '负责人', key: 'owner', align: 'right' as const },
      ];
      return (
        <div style={{ width: '100%', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <DataTable columns={columns} data={rows} rowKey="id" />
        </div>);
    }
    case 'StatCard': return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, width: '100%' }}>
        <StatCard label="项目总数" value={12} trend="+2" trendUp tone="primary" />
        <StatCard label="运行中" value={8} tone="success" />
        <StatCard label="待处理" value={3} tone="warning" />
      </div>);
    case 'Pagination': return (
      <div style={{ width: '100%', padding: '10px 0' }}>
        <Pagination current={2} pageSize={10} total={86} onChange={() => {}} />
      </div>);
    case 'Descriptions': return (
      <div style={{ width: '100%' }}>
        <Descriptions items={[{ label: '项目名称', value: '指标管理平台' }, { label: '负责人', value: 'CodeBuddy' }, { label: '状态', value: '运行中' }, { label: '创建时间', value: '2026-09-01' }]} column={2} bordered />
      </div>);
    case 'Progress': return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, padding: '6px 0' }}>
        <Progress percent={45} />
        <Progress percent={100} />
        <Progress percent={75} status="warning" />
      </div>);
    case 'Timeline': return (
      <div style={{ width: '100%', padding: '6px 0' }}>
        <Timeline items={[{ title: '创建项目', time: '09-01' }, { title: '原型评审通过', time: '09-10' }, { title: '开发中', time: '09-15', color: 'blue' }]} />
      </div>);
    case 'Collapse': return (
      <div style={{ width: '100%' }}>
        <Collapse defaultActiveKeys={['1']} items={[{ key: '1', title: '基础信息', content: '项目名称、负责人、状态等字段说明' }, { key: '2', title: '设计规范', content: '色板 / 圆角 / 间距等 token 说明' }]} />
      </div>);
    case 'List': return (
      <div style={{ width: '100%' }}>
        <List dataSource={['消息 1：组件库已更新', '消息 2：验收意见已发布', '消息 3：新增待办']} renderItem={(item) => <span style={{ fontSize: 12 }}>{item}</span>} />
      </div>);
    default: return (
      <div style={{ fontSize: 12, color: '#86909c', textAlign: 'center', padding: 20 }}>
        {ck === 'Tree' ? '树形控件（组织/分类树）' : ck === 'Chart' ? '图表（line/bar/area/pie）' : '日历（排期/日程）'}
      </div>);
  }
}

function CardComp({ c, copied, onCopy }: { c: CompMeta; copied: boolean; onCopy: () => void }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ minHeight: 92, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafbfc', borderRadius: 8, padding: 12, overflow: 'hidden' }}>
        <Preview ck={c.key} />
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
        <div style={{ fontSize: 12, color: '#86909c', marginTop: 2 }}>{c.desc}</div>
      </div>
      <button onClick={onCopy} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, alignSelf: 'flex-start', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: copied ? '#00b42a' : '#4e5969' }}>
        {copied ? <Check size={13} /> : <Copy size={13} />}{copied ? '已复制' : '复制提示词'}
      </button>
    </div>
  );
}

function App() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (p: string) => {
    try { await navigator.clipboard.writeText(p); } catch { /* 忽略 */ }
    setCopied(p); setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div>
      <h2 style={{ fontSize: 18, margin: '0 0 4px' }}>数据展示组件</h2>
      <p style={{ fontSize: 13, color: '#86909c', margin: '0 0 20px' }}>共 {COMPONENTS.length} 个组件 · 预览为真实渲染效果 · 点击「复制提示词」可在对话中引用组件</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {COMPONENTS.map(c => <CardComp key={c.key} c={c} copied={copied === c.prompt} onCopy={() => copy(c.prompt)} />)}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
