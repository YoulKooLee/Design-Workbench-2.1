// @ts-nocheck
/**
 * 组件预览页 · 办公 / ClockInCard
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { ClockInCard } from './index';

const NAME = 'ClockInCard 打卡卡';
const DESC = '上班/下班打卡（时间 + 地点 + 状态）';
const PROMPT = '【组件引用】ClockInCard 打卡卡（办公）\n框架：React + Tailwind v4\n用法：import { ClockInCard } from "../../component-templates/办公/ClockInCard"\n参数：status（受控：clockIn / clockOut / place / inRange）；onClockIn / onClockOut；rangeText；now（固定展示时间）\n请在办公门户首页、移动端考勤场景使用该组件。';

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
    <div className="grid grid-cols-3 gap-4">
      {/* 未打卡（可交互） */}
      <ClockInCard />
      {/* 已打上班（可交互） */}
      <ClockInCard status={{ clockIn: '08:52', clockOut: null, place: 'A 座科研楼 · 1F 大厅', inRange: true }} />
      {/* 已完成（展示态） */}
      <ClockInCard
        status={{ clockIn: '08:52', clockOut: '18:06', place: 'A 座科研楼 · 1F 大厅', inRange: true }}
        now={new Date('2026-09-25T18:10:00')}
      />
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
    <div style={{ padding: 24, maxWidth: 1040 }}>
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
