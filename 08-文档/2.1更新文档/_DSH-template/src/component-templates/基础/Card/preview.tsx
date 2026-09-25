// @ts-nocheck
/**
 * 组件预览页 · 基础 / Card
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { Card, SectionCard } from './index';
import { Button } from '../Button';

const NAME = 'Card 卡片';
const DESC = 'title/extra/bordered/flush';
const PROMPT = '【组件引用】Card 卡片（基础）\n框架：React + Tailwind v4\n用法：import { Card } from "../../component-templates/基础/Card"\n参数：title（标题）；extra（标题右侧操作区）；bordered；flush（嵌表格时用）\n请在页面区块容器场景使用该组件。';

/** 兜底：默认参数无法渲染时给出提示，避免整页白屏 */
class DemoBoundary extends React.Component<{ children: React.ReactNode }, { err: string | null }> {
  state = { err: null as string | null };
  static getDerivedStateFromError(e: unknown) {
    return { err: e instanceof Error ? e.message : String(e) };
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 16, color: '#86909c', fontSize: 12, lineHeight: 1.7 }}>
          默认参数无法直接渲染该组件（{this.state.err}）。请参考下方提示词在原型页中引用。
        </div>
      );
    }
    return this.props.children;
  }
}

function Demo() {
  return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
      <Card title="基础卡片" extra={<Button size="sm" variant="text">操作</Button>}><div style={{ fontSize: 12, color: '#6b7280' }}>标题 + extra + 内容区</div></Card>
      <Card title="flush 嵌表" flush><table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}><tbody><tr><td style={{ borderBottom: '1px solid #f0f0f0', padding: '5px 8px' }}>行 1</td></tr><tr><td style={{ padding: '5px 8px' }}>行 2</td></tr></tbody></table></Card>
      </div>
  );
}

function App() {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROMPT); } catch { /* 忽略剪贴板权限 */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h2 style={{ fontSize: 16, margin: '0 0 4px' }}>{NAME}</h2>
      <p style={{ fontSize: 12, color: '#86909c', margin: '0 0 14px' }}>{DESC}</p>
      <div style={{ border: '1px solid #e5e6eb', borderRadius: 8, background: '#fafbfc', padding: 20, marginBottom: 14 }}>
        <Demo />
      </div>
      <button onClick={copy} style={{ border: '1px solid #e5e6eb', background: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', color: copied ? '#00b42a' : '#4e5969' }}>
        {copied ? '已复制' : '复制提示词'}
      </button>
      <p style={{ fontSize: 11, color: '#a9aeb8', marginTop: 10, whiteSpace: 'pre-wrap' }}>{PROMPT}</p>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
