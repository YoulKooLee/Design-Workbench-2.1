// @ts-nocheck
/**
 * 组件预览页 · 办公 / ApprovalTaskList
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { ApprovalTaskList } from './index';

const NAME = 'ApprovalTaskList 审批待办列表';
const DESC = '待我审批 / 我已审批 / 抄送我';
const PROMPT = '【组件引用】ApprovalTaskList 审批待办列表（办公）\n框架：React + Tailwind v4\n用法：import { ApprovalTaskList } from "../../component-templates/办公/ApprovalTaskList"\n参数：tasks（标题/类型/发起人/发起时间/当前节点/紧急程度/金额）；tabs + activeTab + onTabChange；onSelect\n紧急程度：今日需办 / 加急 / 普通。请在审批中心、办公门户使用该组件。';

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

const TASKS = [
  { id: 1, title: '李文的差旅报销单（青岛出差）', type: '报销', applicant: '李文', submittedAt: '今天 09:12', currentNode: '部门经理审批', urgency: 'today', amount: 3486, waiting: '2 天' },
  { id: 2, title: '实验室耗材采购申请（9 月批）', type: '采购', applicant: '赵磊', submittedAt: '今天 08:45', currentNode: '部门经理审批', urgency: 'urgent', amount: 128400 },
  { id: 3, title: '王丽的请假申请（年假 3 天）', type: '请假', applicant: '王丽', submittedAt: '昨天 16:20', currentNode: '部门经理审批', urgency: 'normal' },
  { id: 4, title: '对外合同用章申请（设备维保）', type: '用章', applicant: '刘洋', submittedAt: '昨天 14:03', currentNode: '分管领导审批', urgency: 'normal' },
  { id: 5, title: '服务器扩容采购（2 台）', type: '采购', applicant: '孙倩', submittedAt: '09-23 10:18', currentNode: '部门经理审批', urgency: 'normal', amount: 86000, waiting: '3 天' },
];

function Demo() {
  const [tab, setTab] = React.useState('待我审批');
  const [sel, setSel] = React.useState(null);
  return (
    <div className="space-y-3">
      <ApprovalTaskList tasks={TASKS} activeTab={tab} onTabChange={setTab} onSelect={setSel} />
      {sel ? <div style={{ fontSize: 12, color: '#86909c' }}>已选：{sel.title}</div> : null}
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
    <div style={{ padding: 24, maxWidth: 860 }}>
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
