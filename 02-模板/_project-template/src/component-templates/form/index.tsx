/**
 * 组件库卡片浏览页（照工作台组件库：卡片网格 + 分类筛选 + 真实渲染预览 + 复制提示词）
 * Axhub 组件组入口：src/component-templates/component-library/index.tsx
 * 组件源：src/component-templates/Design-components/
 */
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Plus, Search, FolderOpen, CheckCircle2 } from 'lucide-react';
import {
  Button, Card, StatCard, Tag, DataTable, FormField, Input, Select, FormRow, Modal, ResultPage,
  type Column,
} from '../Design-components';

interface Row { id: number; name: string; status: string; owner: string; updated: string; }
const rows: Row[] = [
  { id: 1, name: '指标管理平台', status: '运行中', owner: 'CodeBuddy', updated: '2026-09-14' },
  { id: 2, name: '供应商门户', status: '编辑中', owner: '豆包', updated: '2026-09-13' },
  { id: 3, name: '数据看板', status: '已归档', owner: 'DeepSeek', updated: '2026-09-11' },
];

interface CompMeta { key: string; name: string; file: string; cat: string; desc: string; prompt: string; }

const PROMPTS: Record<string, string> = {
  Button: '【组件引用】Button 按钮（Design-components）\n框架：React + Tailwind v4\n用法：import { Button } from "../../component-templates/Design-components"\n参数：variant: primary|secondary|outline|text|danger|success；size: sm|md|lg；loading；icon；ghost\n请在实现按钮交互时使用该组件，不要自造按钮样式。',
  Card: '【组件引用】Card 卡片（Design-components）\n框架：React + Tailwind v4\n用法：import { Card } from "../../component-templates/Design-components"\n参数：title（标题）；extra（标题右侧操作区）；bordered；flush（嵌表格时用）\n请在页面区块容器场景使用该组件。',
  StatCard: '【组件引用】StatCard 统计指标卡（Design-components）\n框架：React + Tailwind v4\n用法：import { StatCard } from "../../component-templates/Design-components"\n参数：label（指标名）；value（数值）；trend（涨跌幅）；trendUp（是否上涨）；icon；tone: primary|success|warning|danger|default\n请在数据概览/看板顶部指标区使用该组件。',
  Tag: '【组件引用】Tag 状态标签（Design-components）\n框架：React + Tailwind v4\n用法：import { Tag } from "../../component-templates/Design-components"\n参数：color: blue|green|orange|red|gray；closable（可关闭）+ onClose\n请在状态/分类标识场景使用该组件。',
  DataTable: '【组件引用】DataTable 数据表格（Design-components）\n框架：React + Tailwind v4\n用法：import { DataTable, type Column } from "../../component-templates/Design-components"\n参数：columns（{title,key,sortable,align,render,width}）；data；rowKey；loading；emptyText\n请在列表/表格类页面使用该组件，表头列通过 sortable 开启排序。',
  FormField: '【组件引用】表单组件组（Design-components）\n框架：React + Tailwind v4\n用法：import { FormField, Input, Select, FormRow } from "../../component-templates/Design-components"\n结构：FormField(label/required/hint/error) 包 Input(prefix 图标) 或 Select(options)；FormRow(cols) 做多列网格\n请在表单/新增/编辑页面使用该组件组，字段校验用 error 展示。',
  Modal: '【组件引用】Modal 弹窗（Design-components）\n框架：React + Tailwind v4\n用法：import { Modal } from "../../component-templates/Design-components"\n参数：open（受控）；onClose；title；footer（底部操作区）；width；maskClosable（默认 false 防误关，Esc 可关）\n请在确认/详情/编辑弹窗场景使用该组件。',
  ResultPage: '【组件引用】ResultPage 结果页（Design-components）\n框架：React + Tailwind v4\n用法：import { ResultPage } from "../../component-templates/Design-components"\n参数：status: success|error|warning|waiting；title；desc；actions（操作按钮区）\n请在提交成功/失败/等待确认的结果页使用该组件。',
  theme: '【组件引用】Design-components 主题 token（theme.css）\n框架：Tailwind v4 @theme\n色板：primary #165dff / success #00b42a / warning #ff7d00 / danger #f53f3f；圆角 sm/md/lg = 2/4/8px\nimport { ... } from "../../component-templates/Design-components" 时自动加载；如需同款品牌色直接用 token 类（bg-primary/text-neutral-8 等）。',
};

const CATS: Record<string, string> = { base: '基础', data: '数据展示', form: '表单', feedback: '反馈', theme: '主题' };

const COMPONENTS: CompMeta[] = [  { key: 'FormField', name: 'FormField 表单', file: 'FormField.tsx', cat: 'form', desc: 'Input/Select/FormRow', prompt: PROMPTS.FormField },
];

function Preview({ ck }: { ck: string }) {
  const columns: Column<Row>[] = [
    { title: '项目名称', key: 'name', sortable: true },
    { title: '状态', key: 'status', render: (r) => r.status === '运行中' ? <Tag color="blue">{r.status}</Tag> : r.status === '编辑中' ? <Tag color="green">{r.status}</Tag> : <Tag>{r.status}</Tag> },
    { title: '负责人', key: 'owner' },
    { title: '更新时间', key: 'updated', sortable: true, align: 'right' },
  ];
  switch (ck) {
    case 'Button': return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="primary">主要</Button><Button variant="outline">描边</Button><Button variant="text">文字</Button>
        <Button variant="danger">危险</Button><Button variant="success" icon={<Plus size={14} />}>成功</Button><Button loading>加载中</Button>
        <Button size="sm" variant="primary">小</Button><Button size="lg" variant="outline">大</Button>
      </div>);
    case 'Card': return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
        <Card title="基础卡片" extra={<Button size="sm" variant="text">操作</Button>}><div style={{ fontSize: 12, color: '#6b7280' }}>标题 + extra + 内容区</div></Card>
        <Card title="flush 嵌表" flush><table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}><tbody><tr><td style={{ borderBottom: '1px solid #f0f0f0', padding: '5px 8px' }}>行 1</td></tr><tr><td style={{ padding: '5px 8px' }}>行 2</td></tr></tbody></table></Card>
      </div>);
    case 'StatCard': return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, width: '100%' }}>
        <StatCard label="项目总数" value={12} trend="+2" trendUp icon={<FolderOpen size={16} />} tone="primary" />
        <StatCard label="运行中" value={8} icon={<CheckCircle2 size={16} />} tone="success" />
        <StatCard label="待处理" value={3} icon={<Search size={16} />} tone="warning" />
        <StatCard label="异常" value={1} trend="+1" icon={<Search size={16} />} tone="danger" />
      </div>);
    case 'Tag': return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        <Tag color="blue">运行中</Tag><Tag color="green">已通过</Tag><Tag color="orange">待确认</Tag>
        <Tag color="red">异常</Tag><Tag color="gray">已归档</Tag><Tag color="blue" closable>可关闭</Tag>
      </div>);
    case 'DataTable': return (
      <div style={{ width: '100%', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
        <DataTable columns={columns} data={rows} rowKey="id" />
      </div>);
    case 'FormField': return (
      <div style={{ width: '100%', background: '#fff', borderRadius: 8, padding: 8 }}>
        <FormRow cols={2}>
          <FormField label="项目名称" required hint="字母/数字"><Input placeholder="my-dashboard" prefix={<Search size={13} />} /></FormField>
          <FormField label="负责人"><Select placeholder="请选择" options={[{ label: 'CodeBuddy', value: 'cb' }, { label: '豆包', value: 'db' }]} /></FormField>
        </FormRow>
        <FormField label="备注"><Input placeholder="选填" /></FormField>
      </div>);
    case 'Modal': return <ModalDemo />;
    case 'ResultPage': return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
        <div style={{ background: '#fff', borderRadius: 8 }}><ResultPage status="success" title="创建成功" desc="项目已创建" actions={<Button size="sm">返回列表</Button>} /></div>
        <div style={{ background: '#fff', borderRadius: 8 }}><ResultPage status="warning" title="等待确认" desc="需用户确认后继续" actions={<><Button size="sm" variant="outline">取消</Button><Button size="sm">确认</Button></>} /></div>
      </div>);
    case 'theme': return (
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[['primary', '#165dff'], ['success', '#00b42a'], ['warning', '#ff7d00'], ['danger', '#f53f3f']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '5px 9px', fontSize: 11.5 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: v, display: 'inline-block' }} /> {k} <span style={{ color: '#a1a1aa', fontFamily: 'monospace' }}>{v}</span>
          </div>
        ))}
      </div>);
    default: return null;
  }
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div><Button size="sm" onClick={() => setOpen(true)}>打开弹窗</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="确认操作" width={400}
        footer={<><Button variant="outline" size="sm" onClick={() => setOpen(false)}>取消</Button><Button size="sm" onClick={() => setOpen(false)}>确定</Button></>}>
        <p style={{ fontSize: 12.5, color: '#6b7280', margin: 0 }}>默认遮罩不关闭（防误关），Esc 关闭，内容超高自动滚动。</p>
      </Modal></div>
  );
}

function CompCard({ meta }: { meta: CompMeta }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 14px 2px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <b style={{ fontSize: 14 }}>{meta.name}</b>
        <span style={{ fontSize: 11, background: '#eef4ff', color: '#165dff', borderRadius: 999, padding: '1px 8px' }}>{CATS[meta.cat]}</span>
        <span style={{ fontSize: 11, color: '#a1a1aa', fontFamily: 'ui-monospace,monospace', marginLeft: 'auto' }}>{meta.file}</span>
      </div>
      <div style={{ padding: '2px 14px', fontSize: 11.5, color: '#6b7280' }}>{meta.desc}</div>
      <div style={{ margin: '10px 14px 0', padding: '10px', minHeight: 84, background: 'linear-gradient(180deg,#fafbfc,#f4f5f7)', border: '1px solid #f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Preview ck={meta.key} />
      </div>
      <div style={{ borderTop: '1px solid #f0f0f0', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <pre style={{ flex: 1, margin: 0, fontSize: 11, lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#3f3f46', fontFamily: 'ui-monospace,Consolas,monospace', maxHeight: 84, overflow: 'auto' }}>{meta.prompt}</pre>
        <button onClick={() => { navigator.clipboard.writeText(meta.prompt).catch(() => { const ta = document.createElement('textarea'); ta.value = meta.prompt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
          style={{ flexShrink: 0, border: '1px solid #165dff', background: copied ? '#00b42a' : '#165dff', borderColor: copied ? '#00b42a' : '#165dff', color: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>
          {copied ? '已复制 ✓' : '复制提示词'}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [cat, setCat] = useState(() => { const s = new Set(COMPONENTS.map(c => c.cat)); return s.size === 1 ? [...s][0] : 'all'; });
  const cats = useMemo(() => ['all', ...Array.from(new Set(COMPONENTS.map(c => c.cat)))], []);
  const list = cat === 'all' ? COMPONENTS : COMPONENTS.filter(c => c.cat === cat);
  
  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: 19, margin: 0 }}>组件库 · 表单组件</h1>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{COMPONENTS.length} 组件 · React + Tailwind v4 · 对齐 Arco 母版</span>
      </div>
      <div style={{ marginBottom: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ border: c === cat ? '1px solid #165dff' : '1px solid #e5e7eb', background: c === cat ? '#e8f3ff' : '#fff', color: c === cat ? '#165dff' : '#4e5969', borderRadius: 999, padding: '4px 14px', fontSize: 12.5, cursor: 'pointer' }}>
            {c === 'all' ? '全部' : CATS[c]}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 11.5, color: '#a1a1aa', alignSelf: 'center' }}>组件源：src/component-templates/Design-components/ · import {'{ ... }'} from '../../component-templates/Design-components'</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(520px,1fr))', gap: 12 }}>
        {list.map(c => <CompCard key={c.key} meta={c} />)}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
