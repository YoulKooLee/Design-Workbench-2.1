// @ts-nocheck
/**
 * 组件预览页 · 园区 / VisitorForm
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { VisitorForm } from './index';

const NAME = 'VisitorForm 访客登记表单';
const DESC = '访客预约 / 现场登记';
const PROMPT = '【组件引用】VisitorForm 访客登记表单（园区）\n框架：React + Tailwind v4\n用法：import { VisitorForm } from "../../component-templates/园区/VisitorForm"\n参数：defaultValue / value（姓名/手机号/单位/被访人/部门/事由/日期/随行人数/车牌）；onSubmit；onCancel；readonly（只读态）\n请在访客登记、预约审批场景使用该组件。';

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
  const [done, setDone] = React.useState(null);
  if (done) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ color: '#00b42a', fontSize: 22, marginBottom: 6 }}>✓</div>
        <div style={{ fontSize: 13 }}>登记成功，凭证已发送至访客手机</div>
        <button onClick={() => setDone(null)} style={{ marginTop: 12, border: '1px solid #e5e6eb', background: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>
          再登记一位
        </button>
      </div>
    );
  }
  return (
    <VisitorForm
      defaultValue={{ date: '2026-09-26', companions: 0 }}
      onSubmit={(v) => setDone(v)}
      onCancel={() => {}}
    />
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
