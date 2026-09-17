/**
 * 组件库浏览页 · 基础（base）
 * 组件源：../axhub/基础（Codebuddy Design 复制）
 * 交互：卡片网格 + 真实渲染预览 + 复制提示词（供对话中引用组件）
 */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Copy } from 'lucide-react';
import {
  Avatar, Badge, Button, Card, Divider, Popconfirm, Tag, Title, Text, Paragraph, Tooltip, Popover,
} from '../axhub/基础';

interface CompMeta { key: string; name: string; desc: string; prompt: string; }

const PROMPTS: Record<string, string> = {
  Button: '【组件引用】Button 按钮（基础）\n框架：React + Tailwind v4\n用法：import { Button } from "../../component-templates/axhub/基础"\n参数：variant: primary|secondary|outline|text|danger|success；size: sm|md|lg；loading；icon\n请在按钮交互场景使用该组件，不要自造按钮样式。',
  Card: '【组件引用】Card 卡片（基础）\n框架：React + Tailwind v4\n用法：import { Card } from "../../component-templates/axhub/基础"\n参数：title（标题）；extra（标题右侧操作区）；bordered；flush（嵌表格时用）\n请在页面区块容器场景使用该组件。',
  Tag: '【组件引用】Tag 状态标签（基础）\n框架：React + Tailwind v4\n用法：import { Tag } from "../../component-templates/axhub/基础"\n参数：color: blue|green|orange|red|gray；closable（可关闭）+ onClose\n请在状态/分类标识场景使用该组件。',
  Badge: '【组件引用】Badge 徽标（基础）\n框架：React + Tailwind v4\n用法：import { Badge } from "../../component-templates/axhub/基础"\n参数：count（数字角标）；dot（小圆点）；color；offset\n请在未读数/提醒角标场景使用该组件。',
  Avatar: '【组件引用】Avatar 头像（基础）\n框架：React + Tailwind v4\n用法：import { Avatar } from "../../component-templates/axhub/基础"\n参数：src（图片）；name（中文名/首字）；size: sm|md|lg；shape: circle|square\n请在用户/对象标识场景使用该组件。',
  Typography: '【组件引用】Typography 文本（基础）\n框架：React + Tailwind v4\n用法：import { Typography } from "../../component-templates/axhub/基础"\n结构：Title(标题) / Text(正文) / Paragraph(段落)；type: primary|success|warning|danger；ellipsis\n请在页面文本排版场景使用该组件。',
  Divider: '【组件引用】Divider 分割线（基础）\n框架：React + Tailwind v4\n用法：import { Divider } from "../../component-templates/axhub/基础"\n参数：plain（带文字）；vertical（竖向）；orientation\n请在区块/内容分隔场景使用该组件。',
  Popconfirm: '【组件引用】Popconfirm 气泡确认（基础）\n框架：React + Tailwind v4\n用法：import { Popconfirm } from "../../component-templates/axhub/基础"\n参数：title（确认文案）；onConfirm；placement\n请在删除/危险操作二次确认场景使用该组件。',
  Overlay: '【组件引用】Tooltip / Popover / Dropdown 浮层（基础）\n框架：React + Tailwind v4\n用法：import { Tooltip, Popover, Dropdown } from "../../component-templates/axhub/基础"\n参数：Tooltip(content,placement)；Popover(content,triggerMode,children)；Dropdown(items,align,onSelect)\n请在悬浮提示/气泡卡片/下拉菜单场景使用浮层组件。',
};

const COMPONENTS: CompMeta[] = [
  { key: 'Button', name: 'Button 按钮', desc: '6 变体 × 3 尺寸 + loading + 图标', prompt: PROMPTS.Button },
  { key: 'Card', name: 'Card 卡片', desc: 'title/extra/bordered/flush', prompt: PROMPTS.Card },
  { key: 'Tag', name: 'Tag 状态标签', desc: '5 色 + closable', prompt: PROMPTS.Tag },
  { key: 'Badge', name: 'Badge 徽标', desc: 'count/dot/color', prompt: PROMPTS.Badge },
  { key: 'Avatar', name: 'Avatar 头像', desc: '图片/首字/尺寸/形状', prompt: PROMPTS.Avatar },
  { key: 'Typography', name: 'Typography 文本', desc: '标题/正文/段落/类型色', prompt: PROMPTS.Typography },
  { key: 'Divider', name: 'Divider 分割线', desc: '带文字/竖向', prompt: PROMPTS.Divider },
  { key: 'Popconfirm', name: 'Popconfirm 气泡确认', desc: '危险操作二次确认', prompt: PROMPTS.Popconfirm },
  { key: 'Overlay', name: 'Tooltip / Popover 浮层', desc: '悬浮提示/气泡卡片/下拉', prompt: PROMPTS.Overlay },
];

function Preview({ ck }: { ck: string }) {
  switch (ck) {
    case 'Button': return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="primary">主要</Button><Button variant="outline">描边</Button><Button variant="text">文字</Button>
        <Button variant="danger">危险</Button><Button variant="success">成功</Button><Button loading>加载中</Button>
        <Button size="sm" variant="primary">小</Button><Button size="lg" variant="outline">大</Button>
      </div>);
    case 'Card': return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
        <Card title="基础卡片" extra={<Button size="sm" variant="text">操作</Button>}><div style={{ fontSize: 12, color: '#6b7280' }}>标题 + extra + 内容区</div></Card>
        <Card title="flush 嵌表" flush><table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}><tbody><tr><td style={{ borderBottom: '1px solid #f0f0f0', padding: '5px 8px' }}>行 1</td></tr><tr><td style={{ padding: '5px 8px' }}>行 2</td></tr></tbody></table></Card>
      </div>);
    case 'Tag': return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        <Tag color="blue">运行中</Tag><Tag color="green">已通过</Tag><Tag color="orange">待确认</Tag>
        <Tag color="red">异常</Tag><Tag color="gray">已归档</Tag><Tag color="blue" closable>可关闭</Tag>
      </div>);
    case 'Badge': return (
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
        <Badge count={5}><Button size="sm">通知</Button></Badge>
        <Badge count={99}><Button size="sm">消息</Button></Badge>
        <Badge dot color="red"><Button size="sm">动态</Button></Badge>
      </div>);
    case 'Avatar': return (
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
        <Avatar name="游翔" size="sm" />
        <Avatar name="产品设计" size="md" />
        <Avatar src="https://api.dicebear.com/7.x/initials/svg?seed=A" name="A" size="lg" />
        <Avatar name="方" shape="square" size="md" />
      </div>);
    case 'Typography': return (
      <div style={{ textAlign: 'left', width: '100%' }}>
        <Title level={4}>页面标题 Title</Title>
        <Text>正文文本 · </Text><Text type="success">成功提示</Text><Text> · </Text><Text type="warning">警告</Text><Text> · </Text><Text type="danger">危险</Text>
        <Paragraph style={{ fontSize: 12, color: '#6b7280' }}>段落说明：用于描述区块内容，支持多行展示与省略。</Paragraph>
      </div>);
    case 'Divider': return (
      <div style={{ width: '100%', padding: '4px 0' }}>
        <Divider />
        <Divider plain>带文字分割</Divider>
        <div style={{ fontSize: 12 }}>横向内容<Divider vertical style={{ margin: '0 8px' }} />竖向分割<Divider vertical style={{ margin: '0 8px' }} />示例</div>
      </div>);
    case 'Popconfirm': return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
        <Popconfirm title="确定删除该记录？" onConfirm={() => alert('已删除（示例）')}>
          <Button variant="danger" size="sm">删除</Button>
        </Popconfirm>
      </div>);
    case 'Overlay': return (
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', padding: 12 }}>
        <Tooltip content="悬浮提示内容"><Button size="sm" variant="outline">Tooltip</Button></Tooltip>
        <Popover content={<div style={{ fontSize: 12, padding: 4 }}>气泡卡片内容（Popover）</div>}><Button size="sm">Popover</Button></Popover>
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
    try { await navigator.clipboard.writeText(p); } catch { /* 忽略剪贴板权限 */ }
    setCopied(p); setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div>
      <h2 style={{ fontSize: 18, margin: '0 0 4px' }}>基础组件</h2>
      <p style={{ fontSize: 13, color: '#86909c', margin: '0 0 20px' }}>共 {COMPONENTS.length} 个组件 · 预览为真实渲染效果 · 点击「复制提示词」可在对话中引用组件</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {COMPONENTS.map(c => <CardComp key={c.key} c={c} copied={copied === c.prompt} onCopy={() => copy(c.prompt)} />)}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
