/**
 * 组件库浏览页 · 布局（layout）
 * 组件源：../axhub/布局（Codebuddy Design 复制）
 * 交互：卡片网格 + 真实渲染预览 + 复制提示词
 */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Copy, Plus, Search } from 'lucide-react';
import { Breadcrumb, Steps, Tabs, Toolbar, PageHeader, Space, Row, Col, Grid } from '../axhub/布局';

interface CompMeta { key: string; name: string; desc: string; prompt: string; }

const PROMPTS: Record<string, string> = {
  Layout: '【组件引用】Space / Row / Col / Grid 布局（布局）\n框架：React + Tailwind v4\n用法：import { Space, Row, Col, Grid } from "../../component-templates/axhub/布局"\n参数：Space(direction,size)；Row(gutter)；Col(span 24栅格)；Grid(cols,gap)\n请在页面间距/栅格布局场景使用该组件。',
  PageHeader: '【组件引用】PageHeader 页头（布局）\n框架：React + Tailwind v4\n用法：import { PageHeader } from "../../component-templates/axhub/布局"\n参数：title（标题）；breadcrumb（面包屑）；extra（右上操作区）\n请在页面顶部标题区使用该组件。',
  Tabs: '【组件引用】Tabs 页签（布局）\n框架：React + Tailwind v4\n用法：import { Tabs } from "../../component-templates/axhub/布局"\n参数：items: [{key,title,content}]；activeKey；onChange\n请在分类切换场景使用该组件。',
  Breadcrumb: '【组件引用】Breadcrumb 面包屑（布局）\n框架：React + Tailwind v4\n用法：import { Breadcrumb } from "../../component-templates/axhub/布局"\n参数：items: [{title,href}]；separator\n请在层级导航场景使用该组件。',
  Steps: '【组件引用】Steps 步骤条（布局）\n框架：React + Tailwind v4\n用法：import { Steps } from "../../component-templates/axhub/布局"\n参数：items: [{title,desc}]；current（当前步）；direction: horizontal|vertical\n请在流程/向导场景使用该组件。',
  Toolbar: '【组件引用】Toolbar 工具栏（布局）\n框架：React + Tailwind v4\n用法：import { Toolbar } from "../../component-templates/axhub/布局"\n参数：left（左侧区）；right（右侧区）；divider（底部分隔线）\n请在列表页顶部操作栏场景使用该组件。',
};

const COMPONENTS: CompMeta[] = [
  { key: 'PageHeader', name: 'PageHeader 页头', desc: '标题 + 面包屑 + 操作区', prompt: PROMPTS.PageHeader },
  { key: 'Tabs', name: 'Tabs 页签', desc: '分类切换', prompt: PROMPTS.Tabs },
  { key: 'Breadcrumb', name: 'Breadcrumb 面包屑', desc: '层级导航', prompt: PROMPTS.Breadcrumb },
  { key: 'Steps', name: 'Steps 步骤条', desc: '流程/向导', prompt: PROMPTS.Steps },
  { key: 'Toolbar', name: 'Toolbar 工具栏', desc: '列表页顶部操作栏', prompt: PROMPTS.Toolbar },
  { key: 'Layout', name: 'Space / Row / Col 布局', desc: '间距 / 24栅格 / Grid', prompt: PROMPTS.Layout },
];

function Preview({ ck }: { ck: string }) {
  const [tab, setTab] = useState('a');
  switch (ck) {
    case 'PageHeader': return (
      <div style={{ width: '100%' }}>
        <PageHeader title="指标管理" breadcrumb={<Breadcrumb items={[{ title: '首页' }, { title: '指标管理' }]} />} extra={<button style={{ border: 'none', background: '#165dff', color: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>新增指标</button>} />
      </div>);
    case 'Tabs': return (
      <div style={{ width: '100%' }}>
        <Tabs activeKey={tab} onChange={setTab} items={[{ key: 'a', title: '全部', content: <div style={{ fontSize: 12, color: '#86909c', padding: '10px 2px' }}>全部内容</div> }, { key: 'b', title: '运行中', content: <div style={{ fontSize: 12, color: '#86909c', padding: '10px 2px' }}>运行中内容</div> }, { key: 'c', title: '已归档', content: <div style={{ fontSize: 12, color: '#86909c', padding: '10px 2px' }}>已归档内容</div> }]} />
      </div>);
    case 'Breadcrumb': return (
      <div style={{ width: '100%', padding: '10px 0' }}>
        <Breadcrumb items={[{ title: '首页', href: '#' }, { title: '项目管理', href: '#' }, { title: '当前页' }]} />
      </div>);
    case 'Steps': return (
      <div style={{ width: '100%', padding: '8px 0' }}>
        <Steps current={1} items={[{ title: '填写信息' }, { title: '确认提交' }, { title: '完成' }]} />
      </div>);
    case 'Toolbar': return (
      <div style={{ width: '100%', padding: '6px 0' }}>
        <Toolbar left={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span style={{ fontSize: 13, fontWeight: 600 }}>项目列表</span><span style={{ fontSize: 12, color: '#86909c' }}>共 12 个</span></div>} right={<div style={{ display: 'flex', gap: 6 }}><button style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Search size={12} />筛选</button><button style={{ border: 'none', background: '#165dff', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Plus size={12} />新增</button></div>} />
      </div>);
    case 'Layout': return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Space direction="vertical" size={6} style={{ width: '100%' }}>
          <div style={{ background: '#e8f1ff', border: '1px solid #c9dcff', borderRadius: 6, padding: '6px 10px', fontSize: 11, color: '#165dff' }}>Space 纵向间距</div>
          <Row gutter={8}>
            <Col span={12}><div style={{ background: '#f0f2f5', borderRadius: 6, padding: '8px', fontSize: 11, textAlign: 'center' }}>Col 12</div></Col>
            <Col span={12}><div style={{ background: '#f0f2f5', borderRadius: 6, padding: '8px', fontSize: 11, textAlign: 'center' }}>Col 12</div></Col>
          </Row>
          <Grid cols={3} gap={8}>
            <div style={{ background: '#fafbfc', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px', fontSize: 10, textAlign: 'center' }}>Grid 1</div>
            <div style={{ background: '#fafbfc', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px', fontSize: 10, textAlign: 'center' }}>Grid 2</div>
            <div style={{ background: '#fafbfc', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px', fontSize: 10, textAlign: 'center' }}>Grid 3</div>
          </Grid>
        </Space>
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
      <h2 style={{ fontSize: 18, margin: '0 0 4px' }}>布局组件</h2>
      <p style={{ fontSize: 13, color: '#86909c', margin: '0 0 20px' }}>共 {COMPONENTS.length} 个组件 · 预览为真实渲染效果 · 点击「复制提示词」可在对话中引用组件</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {COMPONENTS.map(c => <CardComp key={c.key} c={c} copied={copied === c.prompt} onCopy={() => copy(c.prompt)} />)}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
