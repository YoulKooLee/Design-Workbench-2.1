// @ts-nocheck
/**
 * 组件预览页 · 办公 / AttendanceCalendar
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { AttendanceCalendar } from './index';

const NAME = 'AttendanceCalendar 考勤日历';
const DESC = '月历式考勤结果（正常/迟到/缺卡/请假…）';
const PROMPT = '【组件引用】AttendanceCalendar 考勤日历（办公）\n框架：React + Tailwind v4\n用法：import { AttendanceCalendar } from "../../component-templates/办公/AttendanceCalendar"\n参数：year / month；days（day + type + note）；selectedDay + onSelectDay；showLegend\ntype 含：work 正常 / late 迟到 / early 早退 / missing 缺卡 / leave 请假 / trip 出差 / rest 休息。请在个人考勤页、HR 后台使用该组件。';

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

// 2026 年 9 月：1 号周二。周末休息，穿插迟到/缺卡/请假/出差
function buildDays() {
  const days = [];
  for (let d = 1; d <= 25; d++) {
    const wd = (new Date(2026, 8, d).getDay() + 6) % 7; // 0=周一
    if (wd >= 5) { days.push({ day: d, type: 'rest' }); continue; }
    let type = 'work';
    if (d === 2) type = 'late';
    if (d === 9) type = 'missing';
    if (d === 10) type = 'late';
    if (d >= 14 && d <= 16) type = 'trip';
    if (d === 22) type = 'leave';
    if (d === 23) type = 'early';
    days.push({
      day: d,
      type,
      note: type === 'late' ? '迟到 12 分钟' : type === 'missing' ? '下班未打卡，可补卡' : type === 'trip' ? '青岛出差' : type === 'leave' ? '年假' : undefined,
    });
  }
  return days;
}

function Demo() {
  const [sel, setSel] = React.useState(null);
  return (
    <div className="space-y-2">
      <AttendanceCalendar year={2026} month={9} days={buildDays()} selectedDay={sel} onSelectDay={(d) => setSel(d)} />
      {sel ? <div style={{ fontSize: 12, color: '#86909c' }}>已选 9 月 {sel} 日</div> : null}
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
    <div style={{ padding: 24, maxWidth: 760 }}>
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
