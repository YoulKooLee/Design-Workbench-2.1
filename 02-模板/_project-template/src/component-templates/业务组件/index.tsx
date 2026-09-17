/**
 * 组件库浏览页 · 业务组件（business）
 * 组件源：../axhub/业务组件（Codebuddy Design 复制）
 * 交互：卡片网格 + 真实渲染预览 + 复制提示词
 */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Copy, Search } from 'lucide-react';
import { KpiRow, FilterBar, TableCard, StatusTag, Kanban } from '../axhub/业务组件';
import { DataTable, Pagination } from '../axhub/数据展示';

interface CompMeta { key: string; name: string; desc: string; prompt: string; }

interface Row { id: number; name: string; status: string; owner: string; }
const rows: Row[] = [
  { id: 1, name: '指标管理平台', status: '运行中', owner: 'CodeBuddy' },
  { id: 2, name: '供应商门户', status: '编辑中', owner: '豆包' },
  { id: 3, name: '数据看板', status: '已归档', owner: 'DeepSeek' },
];

const PROMPTS: Record<string, string> = {
  KpiRow: '【组件引用】KpiRow 指标行（业务组件）\n框架：React + Tailwind v4\n用法：import { KpiRow } from "../../component-templates/axhub/业务组件"\n参数：kpis: [{label,value,trend,trendUp,icon,tone}]；columns\n请在数据概览/看板顶部指标区使用该组件。',
  StatCard: '【组件引用】StatCard 统计指标卡（业务组件）\n框架：React + Tailwind v4\n用法：import { StatCard } from "../../component-templates/axhub/业务组件"\n参数：label（指标名）；value；trend；trendUp；icon；tone: primary|success|warning|danger|default\n请在看板指标卡场景使用该组件。',
  FilterBar: '【组件引用】FilterBar 筛选栏（业务组件）\n框架：React + Tailwind v4\n用法：import { FilterBar } from "../../component-templates/axhub/业务组件"\n参数：columns: 2|3|4；children（筛选控件）；onSearch；onReset\n请在列表页筛选区使用该组件。',
  TableCard: '【组件引用】TableCard 表格卡片（业务组件）\n框架：React + Tailwind v4\n用法：import { TableCard } from "../../component-templates/axhub/业务组件"\n参数：title（标题）；extra（右上操作）；children（通常放 DataTable）；pagination\n请在列表区块（标题+表格+分页）场景使用该组件。',
  StatusTag: '【组件引用】StatusTag 状态标签（业务组件）\n框架：React + Tailwind v4\n用法：import { StatusTag, STATUS_PRESETS } from "../../component-templates/axhub/业务组件"\n参数：value（状态值）；map（状态映射，如 STATUS_PRESETS.xxx 或自定义 {值:{color,label}}）\n请在业务状态展示场景使用该组件（比裸 Tag 更语义化）。',
  Kanban: '【组件引用】Kanban 看板（业务组件）\n框架：React + Tailwind v4\n用法：import { Kanban } from "../../component-templates/axhub/业务组件"\n参数：columns: [{title, cards:[{title,desc,...}]}]；onCardClick\n请在任务/泳道看板场景使用该组件。',
};

const COMPONENTS: CompMeta[] = [
  { key: 'KpiRow', name: 'KpiRow 指标行', desc: 'KPI 卡片组', prompt: PROMPTS.KpiRow },
  { key: 'StatusTag', name: 'StatusTag 状态标签', desc: '业务状态语义化', prompt: PROMPTS.StatusTag },
  { key: 'FilterBar', name: 'FilterBar 筛选栏', desc: '2/3/4 列筛选区', prompt: PROMPTS.FilterBar },
  { key: 'TableCard', name: 'TableCard 表格卡片', desc: '标题+表格+分页', prompt: PROMPTS.TableCard },
  { key: 'Kanban', name: 'Kanban 看板', desc: '任务/泳道', prompt: PROMPTS.Kanban },
];

function Preview({ ck }: { ck: string }) {
  switch (ck) {
    case 'KpiRow': return (
      <div style={{ width: '100%' }}>
        <KpiRow kpis={[
          { label: '项目总数', value: 12, trend: '+2', trendUp: true, tone: 'primary' },
          { label: '运行中', value: 8, tone: 'success' },
          { label: '待处理', value: 3, tone: 'warning' },
          { label: '异常', value: 1, tone: 'danger' },
        ]} />
      </div>);
    case 'StatusTag': return (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', padding: 8 }}>
        <StatusTag value="运行中" map={{ 运行中: { color: 'blue', label: '运行中' }, 编辑中: { color: 'green', label: '编辑中' }, 已归档: { color: 'gray', label: '已归档' } }} />
        <StatusTag value="编辑中" map={{ 运行中: { color: 'blue' }, 编辑中: { color: 'green' }, 已归档: { color: 'gray' } }} />
        <StatusTag value="已归档" map={{ 运行中: { color: 'blue' }, 编辑中: { color: 'green' }, 已归档: { color: 'gray' } }} />
      </div>);
    case 'FilterBar': return (
      <div style={{ width: '100%' }}>
        <FilterBar onSearch={() => {}} onReset={() => {}} columns={3}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <input placeholder="搜索项目名" style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '5px 10px', fontSize: 12, width: 130 }} />
            <select style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '5px 8px', fontSize: 12 }}>
              <option>全部状态</option><option>运行中</option><option>已归档</option>
            </select>
            <select style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '5px 8px', fontSize: 12 }}>
              <option>全部负责人</option><option>CodeBuddy</option><option>豆包</option>
            </select>
          </div>
        </FilterBar>
      </div>);
    case 'TableCard': {
      const columns = [
        { title: '项目名称', key: 'name' },
        { title: '状态', key: 'status' },
        { title: '负责人', key: 'owner', align: 'right' as const },
      ];
      return (
        <div style={{ width: '100%' }}>
          <TableCard title="项目列表" extra={<button style={{ border: 'none', background: '#165dff', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>新增</button>}>
            <DataTable columns={columns} data={rows} rowKey="id" />
            <Pagination current={1} pageSize={10} total={rows.length} onChange={() => {}} />
          </TableCard>
        </div>);
    }
    case 'Kanban': return (
      <div style={{ width: '100%' }}>
        <Kanban columns={[
          { title: '待办', cards: [{ title: '指标管理平台', desc: '原型评审' }, { title: '组件库更新', desc: '新增表单组件' }] },
          { title: '进行中', cards: [{ title: '供应商门户', desc: '开发中' }] },
          { title: '已完成', cards: [{ title: '数据看板', desc: '已上线' }] },
        ]} />
      </div>);
    default: return null;
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
      <h2 style={{ fontSize: 18, margin: '0 0 4px' }}>业务组件</h2>
      <p style={{ fontSize: 13, color: '#86909c', margin: '0 0 20px' }}>共 {COMPONENTS.length} 个组件 · 预览为真实渲染效果 · 点击「复制提示词」可在对话中引用组件</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {COMPONENTS.map(c => <CardComp key={c.key} c={c} copied={copied === c.prompt} onCopy={() => copy(c.prompt)} />)}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
