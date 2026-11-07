// @ts-nocheck
/**
 * 组件预览页 · 物联网 / MetricGauge
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { MetricGauge } from './index';

const NAME = 'MetricGauge 指标仪表盘';
const DESC = '半圆量程 + 阈值分区 + 指针，单点实时监测量展示';
const PROMPT = '【组件引用】MetricGauge 指标仪表盘（组件库 物联网）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/物联网/MetricGauge.tsx（导出：MetricGauge / defaultGaugeThresholds）\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { MetricGauge } from "../../component-templates/物联网/MetricGauge";\n参数：value；min/max 量程；unit；label；precision；thresholds[{from,color,label}] 阈值分区；size 直径；showScale\n场景：设备实时监测量（水温/压力/流量/电流）、工艺参数盘面\n规则：分区颜色由 thresholds 决定，不要按数值写死颜色；配色用主题 token（var(--color-success) 等）；零第三方依赖。';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, color: '#86909c', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'flex-start' }}>{children}</div>
    </div>
  );
}

function Demo() {
  return (
    <div>
      <Section title="默认三段分区（<60% 正常 / 60~85% 预警 / >85% 危险）">
        <MetricGauge label="冷却水流量" value={42.6} min={0} max={100} unit="%" precision={1} />
        <MetricGauge label="冷却水流量" value={72.4} min={0} max={100} unit="%" precision={1} />
        <MetricGauge label="冷却水流量" value={91.8} min={0} max={100} unit="%" precision={1} />
      </Section>

      <Section title="自定义量程与阈值（工艺参数）">
        <MetricGauge
          label="出水压力"
          value={0.62}
          min={0}
          max={1}
          unit="MPa"
          precision={2}
          thresholds={[
            { from: 0, color: 'var(--color-success)', label: '正常' },
            { from: 0.75, color: 'var(--color-warning)', label: '偏高' },
            { from: 0.9, color: 'var(--color-danger)', label: '超压' },
          ]}
        />
        <MetricGauge
          label="轴承温度"
          value={78.4}
          min={0}
          max={120}
          unit="℃"
          precision={1}
          thresholds={[
            { from: 0, color: 'var(--color-success)', label: '正常' },
            { from: 65, color: 'var(--color-warning)', label: '预警' },
            { from: 95, color: 'var(--color-danger)', label: '危险' },
          ]}
        />
        <MetricGauge
          label="功率因数"
          value={0.86}
          min={0}
          max={1}
          precision={2}
          thresholds={[
            { from: 0, color: 'var(--color-danger)', label: '不合格' },
            { from: 0.9, color: 'var(--color-success)', label: '合格' },
          ]}
        />
      </Section>

      <Section title="尺寸与刻度开关">
        <MetricGauge label="小尺寸 120" value={68} min={0} max={100} unit="%" size={120} />
        <MetricGauge label="中尺寸 160（默认）" value={68} min={0} max={100} unit="%" size={160} />
        <MetricGauge label="大尺寸 220 · 无刻度" value={68} min={0} max={100} unit="%" size={220} showScale={false} />
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
