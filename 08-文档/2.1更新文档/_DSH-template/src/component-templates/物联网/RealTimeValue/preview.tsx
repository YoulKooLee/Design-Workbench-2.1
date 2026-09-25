// @ts-nocheck
/**
 * 组件预览页 · 物联网 / RealTimeValue
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { RealTimeValue } from './index';

const NAME = 'RealTimeValue 实时值';
const DESC = '数值 + 单位 + 数据质量 + 刷新时间 + 变化高亮，工业实时量展示';
const PROMPT = '【组件引用】RealTimeValue 实时值（组件库 物联网）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/物联网/RealTimeValue.tsx（导出：RealTimeValue / DATA_QUALITY_PRESETS）\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { RealTimeValue } from "../../component-templates/物联网/RealTimeValue";\n参数：value（number|string）；unit；label；precision 小数位；quality（good/uncertain/bad/stale）；updatedAt 相对时间；delta 变化率；flash 变化高亮；size sm|md|lg\n场景：设备详情当前值、监控卡、大屏指标\n规则：实时值一律用它，不要手写 toFixed；数据可信度看 quality，不要用颜色暗示数值好坏；零第三方依赖。';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 12, color: '#86909c', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>{children}</div>
    </div>
  );
}

function Demo() {
  const [pressure, setPressure] = React.useState(0.423);
  const [tick, setTick] = React.useState(0);

  const refresh = () => {
    setPressure(Number((0.38 + Math.random() * 0.12).toFixed(3)));
    setTick((t) => t + 1);
  };

  return (
    <div>
      <Section title="可交互：点「模拟刷新」看变化高亮（数值更新时短暂变主题色）">
        <RealTimeValue label="出水压力" value={pressure} unit="MPa" precision={3} quality="good" updatedAt={new Date(Date.now() - tick * 5000)} delta={0.032} size="lg" />
        <RealTimeValue label="轴承温度" value={58.3} unit="℃" precision={1} quality="good" updatedAt={new Date(Date.now() - 8 * 1000)} delta={-0.012} size="lg" />
        <RealTimeValue label="运行频率" value={45.0} unit="Hz" precision={1} quality="good" updatedAt={new Date()} size="lg" />
      </Section>

      <div style={{ marginBottom: 22 }}>
        <button onClick={refresh} style={{ border: '1px solid #e5e6eb', background: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', color: '#4e5969' }}>
          模拟刷新
        </button>
      </div>

      <Section title="数据质量四种状态（good / uncertain / bad / stale）">
        <RealTimeValue label="1#配电柜 电流" value={412.6} unit="A" precision={1} quality="good" updatedAt={new Date(Date.now() - 4 * 1000)} />
        <RealTimeValue label="2#配电柜 电流" value={386.1} unit="A" precision={1} quality="uncertain" updatedAt={new Date(Date.now() - 47 * 1000)} />
        <RealTimeValue label="3#配电柜 电流" value={null} quality="bad" updatedAt={new Date(Date.now() - 3 * 60 * 1000)} />
        <RealTimeValue label="4#配电柜 电流" value={401.3} unit="A" precision={1} quality="stale" updatedAt={new Date(Date.now() - 42 * 60 * 1000)} />
      </Section>

      <Section title="尺寸 sm / md / lg">
        <RealTimeValue label="sm" value={0.42} unit="MPa" size="sm" />
        <RealTimeValue label="md" value={0.42} unit="MPa" size="md" />
        <RealTimeValue label="lg" value={1284.6} unit="kWh" precision={1} thousand size="lg" />
      </Section>

      <Section title="大屏密度：无 label、加大字号">
        <RealTimeValue value={23.4} unit="℃" precision={1} size="lg" />
        <RealTimeValue value={52} unit="%RH" precision={0} size="lg" />
        <RealTimeValue value={0.62} unit="MPa" precision={2} size="lg" />
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
    <div style={{ padding: 24, maxWidth: 900 }}>
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
