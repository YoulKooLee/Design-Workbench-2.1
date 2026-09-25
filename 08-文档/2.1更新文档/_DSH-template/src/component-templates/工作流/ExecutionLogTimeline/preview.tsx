// @ts-nocheck
/**
 * 组件预览页 · 工作流 / ExecutionLogTimeline
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { ExecutionLogTimeline, EXECUTION_STATUS_PRESETS } from './index';

const NAME = 'ExecutionLogTimeline';
const DESC = '工作流/触发器本次执行详情（逐节点状态、耗时、入参出参，失败节点标红；按执行顺序最早在上）';
const PROMPT = '【组件引用】ExecutionLogTimeline 执行日志时间线（组件库 工作流）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/工作流/ExecutionLogTimeline.tsx\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { ExecutionLogTimeline } from \'../../component-templates/工作流/ExecutionLogTimeline\';\n参数：steps[{id,nodeName,nodeType,status,startedAt,durationMs,input,output,error}]/totalDurationMs/defaultExpand/showTime\n场景：工作流/触发器本次执行详情（逐节点状态、耗时、入参出参，失败节点标红；按执行顺序最早在上）\n规则：请使用该组件，不要自造同类样式；零第三方依赖。';

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
  const STEPS = [
    { id: 1, nodeName: '订单创建触发', nodeType: '事件触发', status: 'success', startedAt: '2026-09-22 09:12:04', durationMs: 32, input: { orderNo: 'SO20260922001', amount: 128600 }, output: { passed: true } },
    { id: 2, nodeName: '金额条件判断', nodeType: '条件分支', status: 'success', startedAt: '2026-09-22 09:12:05', durationMs: 18, output: { branch: '大额订单' } },
    { id: 3, nodeName: '采购主管审批', nodeType: '审批', status: 'running', startedAt: '2026-09-22 09:12:06', input: { approvers: ['张伟', '李敏'], mode: 'any' } },
    { id: 4, nodeName: '通知财务备案', nodeType: '发送通知', status: 'waiting' }
  ];
  return (
    <DemoBoundary>
      <ExecutionLogTimeline steps={STEPS} title="执行日志" totalDurationMs={50} />
    </DemoBoundary>
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
    <div style={{ padding: 24, maxWidth: 1080 }}>
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
