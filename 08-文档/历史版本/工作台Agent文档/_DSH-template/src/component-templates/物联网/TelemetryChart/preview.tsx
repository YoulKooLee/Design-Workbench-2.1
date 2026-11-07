// @ts-nocheck
/**
 * 组件预览页 · 物联网 / TelemetryChart
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { TelemetryChart } from './index';

const NAME = 'TelemetryChart 遥测曲线';
const DESC = '时序趋势 + 上下限阈值线 + 越限点高亮，可切换时间范围';
const PROMPT = '【组件引用】TelemetryChart 遥测曲线（组件库 物联网）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/物联网/TelemetryChart.tsx（导出：TelemetryChart）\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { TelemetryChart } from "../../component-templates/物联网/TelemetryChart";\n参数：series[{name,data:[{label,value}],color}]；thresholds[{value,label,color}]；unit；title；range + onRangeChange（受控时间范围）；height；highlightOutOfRange\n场景：设备遥测趋势（温度/压力/功率/流量时序）、越限分析\n规则：标题与单位由 ChartCard 承载；阈值线用 thresholds 传，不要在数据里插假序列；零第三方依赖。';

const pad2 = (n) => String(n).padStart(2, '0');

/** 确定性生成小时序列（避免预览页每次渲染数据跳动） */
function hourly(count, base, amp, phase) {
  return Array.from({ length: count }, (_, i) => ({
    label: pad2(i) + ':00',
    value: Number((base + Math.sin((i + phase) / 3.2) * amp + Math.sin(i / 1.4) * amp * 0.28).toFixed(3)),
  }));
}

const SERIES_24H = hourly(24, 0.44, 0.1, 2);
const SERIES_7D = Array.from({ length: 7 }, (_, i) => ({
  label: '09-' + pad2(16 + i),
  value: Number((0.42 + Math.sin((i + 1) / 1.8) * 0.09).toFixed(3)),
}));

/** 带一个尖峰的出水温度序列，用于演示越限高亮 */
const SPIKE = hourly(24, 32.4, 1.4, 2).map((p, i) => (i === 15 ? { ...p, value: 37.6 } : p));

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, color: '#86909c', marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function Demo() {
  const [range, setRange] = React.useState('24h');
  const data = range === '7d' ? SERIES_7D : SERIES_24H;

  return (
    <div>
      <Section title="单点位 + 上下限阈值线（超限点自动标红）· 时间范围可切换">
        <TelemetryChart
          title="冷冻水泵-01 出水压力"
          unit="MPa"
          desc="采样间隔 5 min"
          range={range}
          onRangeChange={setRange}
          series={[{ name: '出水压力', data }]}
          thresholds={[
            { value: 0.6, label: '上限' },
            { value: 0.15, label: '下限', type: 'lower' },
          ]}
          height={260}
        />
      </Section>

      <Section title="越限高亮：超出阈值的点自动标红（图示 15:00 有尖峰超上限）">
        <TelemetryChart
          title="冷却塔-01 出水温度"
          unit="℃"
          range="24h"
          onRangeChange={() => {}}
          series={[{ name: '出水温度', data: SPIKE }]}
          thresholds={[
            { value: 34, label: '上限' },
            { value: 30, label: '下限', type: 'lower' },
          ]}
          height={220}
        />
      </Section>

      <Section title="多序列对比（点击图例可隐藏/显示）">
        <TelemetryChart
          title="3F 空调机组 回风温湿度"
          range="24h"
          onRangeChange={() => {}}
          series={[
            { name: '回风温度', data: hourly(24, 21.5, 2.4, 0) },
            { name: '送风温度', data: hourly(24, 17.2, 1.6, 1) },
            { name: '露点温度', data: hourly(24, 13.4, 1.1, 2) },
          ]}
          thresholds={[{ value: 26, label: '温度上限' }]}
          height={240}
        />
      </Section>

      <Section title="大屏密度：无阈值、紧凑高度">
        <TelemetryChart
          title="1#配电柜 A 相电流"
          unit="A"
          series={[{ name: 'A 相电流', data: hourly(24, 382, 42, 3) }]}
          thresholds={[{ value: 430, label: '额定上限' }]}
          height={180}
        />
      </Section>
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
    <div style={{ padding: 24, maxWidth: 1000 }}>
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
