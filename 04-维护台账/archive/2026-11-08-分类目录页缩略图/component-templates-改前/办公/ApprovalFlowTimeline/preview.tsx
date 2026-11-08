// @ts-nocheck
/**
 * 组件预览页 · 办公 / ApprovalFlowTimeline
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { ApprovalFlowTimeline } from './index';

const NAME = 'ApprovalFlowTimeline 审批流时间轴';
const DESC = '单据审批过程可视化（含会签并列）';
const PROMPT = '【组件引用】ApprovalFlowTimeline 审批流时间轴（办公）\n框架：React + Tailwind v4\n用法：import { ApprovalFlowTimeline } from "../../component-templates/办公/ApprovalFlowTimeline"\n参数：nodes（节点名/处理人/状态/时间/意见）；countersign（会签子节点）；title；stateMap（可选覆盖）\n状态含：已通过 / 已驳回 / 审批中 / 未到达 / 已撤回。请在审批详情页使用该组件。';

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

const NODES = [
  { name: '发起申请', approver: '李文', state: 'approved', time: '09-24 09:12', comment: '9 月 22-24 日赴青岛海研所技术交流，往返高铁 + 住宿 2 晚。' },
  { name: '部门经理审批', approver: '周平', state: 'approved', time: '09-24 10:05', comment: '同意，出差事由与项目相关。' },
  {
    name: '财务会签',
    approver: '财务部',
    state: 'current',
    countersign: [
      { approver: '陈会计', state: 'approved', time: '09-24 11:30', comment: '预算科目正确。' },
      { approver: '吴出纳', state: 'current' },
    ],
  },
  { name: '分管领导审批', approver: '王主任', state: 'pending' },
  { name: '归档', approver: '系统', state: 'pending' },
];

function Demo() {
  return <ApprovalFlowTimeline title="李文的差旅报销单 · ¥3,486" nodes={NODES} />;
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
