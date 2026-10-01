// @ts-nocheck
/**
 * 组件预览页 · 园区 / PatrolCheckpointTimeline
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { PatrolCheckpointTimeline } from './index';

const NAME = 'PatrolCheckpointTimeline 巡更打卡轴';
const DESC = '巡更线路按点位的时间轴打卡记录';
const PROMPT = '【组件引用】PatrolCheckpointTimeline 巡更打卡轴（园区）\n框架：React + Tailwind v4\n用法：import { PatrolCheckpointTimeline } from "../../component-templates/园区/PatrolCheckpointTimeline"\n参数：checkpoints（点位/计划时间/实际时间/状态/打卡方式/备注）；line（线路名）；statusMap（可选覆盖）\n状态含：正常 / 迟到 / 漏打 / 待打。请在巡检任务详情、巡更考核场景使用该组件。';

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

const CHECKPOINTS = [
  { name: 'A 座大厅', planTime: '08:00', actualTime: '07:58', status: 'done', method: 'NFC' },
  { name: 'A 座东侧消防通道', planTime: '08:15', actualTime: '08:21', status: 'late', method: '二维码', note: '通道有纸箱堆放，已拍照上报' },
  { name: '连廊 · 设备间', planTime: '08:30', actualTime: '08:29', status: 'done', method: 'NFC' },
  { name: 'B 座地下一层配电房', planTime: '08:50', actualTime: '08:52', status: 'done', method: '二维码' },
  { name: 'B 座西侧周界', planTime: '09:10', status: 'missed', note: '未打点，已派单补巡' },
  { name: 'C 座门岗交接点', planTime: '09:30', status: 'pending' },
];

function Demo() {
  return <PatrolCheckpointTimeline line="A/B 区日巡线路 · 王建国" checkpoints={CHECKPOINTS} />;
}

function App() {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROMPT); } catch { /* 忽略剪贴板权限 */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ padding: 24, maxWidth: 640 }}>
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
