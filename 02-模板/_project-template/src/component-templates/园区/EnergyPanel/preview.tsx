// @ts-nocheck
/**
 * 组件预览页 · 园区 / EnergyPanel
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { EnergyPanel } from './index';

const NAME = 'EnergyPanel 能耗面板';
const DESC = '分项能耗统计 + 24h 趋势';
const PROMPT = '【组件引用】EnergyPanel 能耗面板（园区）\n框架：React + Tailwind v4\n用法：import { EnergyPanel } from "../../component-templates/园区/EnergyPanel"\n参数：total / unit / totalYoy（汇总）；items（分项：名称/数值/同比/颜色）；trend（24h 趋势：labels + data）\n请在能耗能效专题、园区总览使用该组件。';

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

// 24h 潮汐曲线（办公园区典型形态）
const TREND = (() => {
  const data = [];
  const labels = [];
  for (let h = 0; h < 24; h++) {
    labels.push(h + '时');
    let v = 120 + 40 * Math.sin((h - 3) / 3.6);
    if (h >= 8 && h <= 19) v += 260 * Math.exp(-Math.pow(h - 13.5, 2) / 18);
    if (h >= 8 && h <= 19) v += 140 * Math.exp(-Math.pow(h - 10, 2) / 4);
    data.push(Math.round(v));
  }
  return { labels, data };
})();

function Demo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <EnergyPanel
        title="园区今日能耗"
        total={18462}
        totalYoy={6.2}
        items={[
          { name: '空调', value: 8210, yoy: 9.4 },
          { name: '照明', value: 4386, yoy: -2.1 },
          { name: '动力', value: 3962, yoy: 3.8 },
          { name: '特殊', value: 1904, yoy: -0.7 },
        ]}
        trend={TREND}
        trendUnit="kW"
      />
      <EnergyPanel
        title="A 座科研楼今日能耗"
        total={7415}
        totalYoy={-3.4}
        items={[
          { name: '空调', value: 3320, yoy: -4.2, color: '#165dff' },
          { name: '照明', value: 2110, yoy: -1.2, color: '#00b42a' },
          { name: '动力', value: 1585, yoy: -5.1, color: '#ff7d00' },
          { name: '特殊', value: 400, yoy: 2.0, color: '#722ed1' },
        ]}
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
