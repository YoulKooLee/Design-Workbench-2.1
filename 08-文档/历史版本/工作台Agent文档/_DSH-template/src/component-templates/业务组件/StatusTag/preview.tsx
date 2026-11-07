// @ts-nocheck
/**
 * 组件预览页 · 业务组件 / StatusTag
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { StatusTag, STATUS_PRESETS } from './index';

const NAME = 'StatusTag 状态标签';
const DESC = '业务状态语义化';
const PROMPT = '【组件引用】StatusTag 状态标签（业务组件）\n框架：React + Tailwind v4\n用法：import { StatusTag, STATUS_PRESETS } from "../../component-templates/业务组件/StatusTag"\n参数：value（状态值）；map（状态映射，如 STATUS_PRESETS.xxx 或自定义 {值:{color,label}}）\n请在业务状态展示场景使用该组件（比裸 Tag 更语义化）。';

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
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', padding: 8 }}>
      <StatusTag value="运行中" map={{ 运行中: { color: 'blue', label: '运行中' }, 编辑中: { color: 'green', label: '编辑中' }, 已归档: { color: 'gray', label: '已归档' } }} />
      <StatusTag value="编辑中" map={{ 运行中: { color: 'blue' }, 编辑中: { color: 'green' }, 已归档: { color: 'gray' } }} />
      <StatusTag value="已归档" map={{ 运行中: { color: 'blue' }, 编辑中: { color: 'green' }, 已归档: { color: 'gray' } }} />
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
