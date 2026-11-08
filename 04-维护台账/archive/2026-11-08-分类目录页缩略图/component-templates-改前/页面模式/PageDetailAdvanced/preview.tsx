// @ts-nocheck
/**
 * 组件预览页 · 页面模式 / PageDetailAdvanced
 * 页面级组件：直接整页渲染（自带标题与分区），下方附引用提示词。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { PageDetailAdvanced, MOCK_DETAIL_ADVANCED_INFO, MOCK_DETAIL_ADVANCED_LOGS, MOCK_RELATED_ROWS } from './index';

const NAME = 'PageDetailAdvanced';
const DESC = '高级详情页（页头 + 发布流程 Steps + 4 Tab：详情/参数/日志/关联）';
const PROMPT = '【组件引用】PageDetailAdvanced 高级详情页（组件库 页面模式）\n框架：React 18 + Tailwind v4（零第三方依赖）\n用法：import { PageDetailAdvanced } from "../../component-templates/页面模式/PageDetailAdvanced"\n参数：info；logs；relatedRows；currentStep；onApprove；onReject；onEdit；onExport\n场景：带审核流程与多 Tab 的复杂详情页。页面级组件，直接整页使用。';

class DemoBoundary extends React.Component {
  state = { err: null };
  static getDerivedStateFromError(e) {
    return { err: e && e.message ? e.message : String(e) };
  }
  render() {
    if (this.state.err) {
      return <div style={{ padding: 16, color: '#86909c', fontSize: 12 }}>渲染出错：{this.state.err}</div>;
    }
    return this.props.children;
  }
}

function App() {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROMPT); } catch (e) { /* 忽略 */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ padding: 20, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ fontSize: 13, color: '#86909c', marginBottom: 10 }}>{NAME} · {DESC}</div>
      <DemoBoundary>
        <PageDetailAdvanced />
      </DemoBoundary>
      <div style={{ marginTop: 16 }}>
        <button onClick={copy} style={{ border: '1px solid #e5e6eb', background: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', color: copied ? '#00b42a' : '#4e5969' }}>
          {copied ? '已复制' : '复制提示词'}
        </button>
        <p style={{ fontSize: 11, color: '#a9aeb8', marginTop: 8, whiteSpace: 'pre-wrap' }}>{PROMPT}</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
