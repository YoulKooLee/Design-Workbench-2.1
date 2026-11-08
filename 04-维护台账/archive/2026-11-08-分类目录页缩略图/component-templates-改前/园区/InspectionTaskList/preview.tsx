// @ts-nocheck
/**
 * 组件预览页 · 园区 / InspectionTaskList
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { InspectionTaskList } from './index';

const NAME = 'InspectionTaskList 巡检任务列表';
const DESC = '巡检/巡更任务执行情况（进度条 + 状态）';
const PROMPT = '【组件引用】InspectionTaskList 巡检任务列表（园区）\n框架：React + Tailwind v4\n用法：import { InspectionTaskList } from "../../component-templates/园区/InspectionTaskList"\n参数：tasks（线路/责任人/计划时段/状态/完成点位数与总数/异常数）；title；stateMap（可选覆盖）；onSelect\n状态含：待执行 / 进行中 / 已完成 / 已超时。请在巡检管理、安防态势场景使用该组件。';

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
  { id: 1, line: 'A 区楼内日巡（上午）', owner: '王建国', plan: '08:00 - 12:00', state: 'inProgress', checkpointDone: 7, checkpointTotal: 12, issues: 1 },
  { id: 2, line: 'B 座机房专项巡检', owner: '赵磊', plan: '09:00 - 11:00', state: 'done', checkpointDone: 8, checkpointTotal: 8 },
  { id: 3, line: '周界围栏夜巡交接复查', owner: '刘洋', plan: '08:30 - 09:30', state: 'overdue', checkpointDone: 2, checkpointTotal: 6, issues: 0 },
  { id: 4, line: '地下车库消防通道巡查', owner: '孙倩', plan: '14:00 - 15:00', state: 'pending', checkpointDone: 0, checkpointTotal: 5 },
];

function Demo() {
  const [sel, setSel] = React.useState(null);
  return (
    <div className="space-y-3">
      <InspectionTaskList tasks={TASKS} onSelect={setSel} />
      {sel ? (
        <div style={{ fontSize: 12, color: '#86909c' }}>已选任务：{sel.line}（{sel.state}）</div>
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
    <div style={{ padding: 24, maxWidth: 720 }}>
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
