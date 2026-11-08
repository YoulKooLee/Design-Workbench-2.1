// @ts-nocheck
/**
 * 组件预览页 · 办公 / ApprovalActionBar
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { ApprovalActionBar } from './index';

const NAME = 'ApprovalActionBar 审批操作栏';
const DESC = '通过 / 驳回 / 转交（意见 + 快捷意见）';
const PROMPT = '【组件引用】ApprovalActionBar 审批操作栏（办公）\n框架：React + Tailwind v4\n用法：import { ApprovalActionBar } from "../../component-templates/办公/ApprovalActionBar"\n参数：quickComments（快捷意见）；onSubmit(action, comment)；showTransfer + transferTargets（转交）\naction 含：approve / reject / transfer。请在审批详情页底部、审批弹窗使用该组件。';

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
  const [result, setResult] = React.useState(null);
  return (
    <div className="space-y-3">
      <ApprovalActionBar
        quickComments={['同意', '情况属实，同意', '金额已复核，同意支付']}
        transferTargets={['周平（部门经理）', '陈会计（财务部）', '王主任（分管领导）']}
        onSubmit={(action, comment) => setResult({ action, comment })}
      />
      {result ? (
        <div className="rounded-md px-3 py-2 text-xs" style={{ background: 'rgba(0,180,42,0.08)', color: 'var(--color-success)' }}>
          已提交：{result.action === 'approve' ? '通过' : result.action === 'reject' ? '驳回' : '转交'}{result.comment ? ' · 意见「' + result.comment + '」' : ''}
        </div>
      ) : null}
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
    <div style={{ padding: 24, maxWidth: 680 }}>
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
