// @ts-nocheck
/**
 * 组件预览页 · 物联网 / DeviceStatusTag
 * make「组件」页签 iframe 入口。预览页属文档性质，关闭类型检查。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { DeviceStatusTag, DEVICE_STATUS_PRESETS } from './index';

const NAME = 'DeviceStatusTag 设备状态标';
const DESC = '物联网设备状态语义化：状态码 → 中文 + 颜色 + 呼吸点 + 最后上报';
const PROMPT = '【组件引用】DeviceStatusTag 设备状态标（组件库 物联网）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/物联网/DeviceStatusTag.tsx（导出：DeviceStatusTag / DEVICE_STATUS_PRESETS）\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { DeviceStatusTag } from "../../component-templates/物联网/DeviceStatusTag";\n参数：status（online/offline/fault/alarm/inactive/maintenance/upgrading，或业务自定义码）；label/color 覆盖预设；dot 状态点；pulse 呼吸；lastSeen 追加相对时间；size sm|md\n场景：设备列表 / 设备详情 / 设备宫格的状态列\n规则：请使用该组件，不要写死颜色 if/else；组件库零第三方依赖（不引 arco/antd）。';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, color: '#86909c', marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>{children}</div>
    </div>
  );
}

function Demo() {
  const all = Object.keys(DEVICE_STATUS_PRESETS);
  return (
    <div>
      <Section title="内置 7 种预设（在线 / 告警 / 升级 自动呼吸）">
        {all.map((s) => (
          <DeviceStatusTag key={s} status={s} />
        ))}
      </Section>

      <Section title="带最后上报时间（自动转相对时间）">
        <DeviceStatusTag status="online" lastSeen={new Date(Date.now() - 42 * 1000)} />
        <DeviceStatusTag status="offline" lastSeen={new Date(Date.now() - 3 * 3600 * 1000)} />
        <DeviceStatusTag status="fault" lastSeen="2026-09-22 18:05:00" lastSeenPrefix="故障发生" />
      </Section>

      <Section title="覆盖文案 / 颜色（业务自定义语义）">
        <DeviceStatusTag status="online" label="已接入" />
        <DeviceStatusTag status="maintenance" label="计划检修" color="purple" />
        <DeviceStatusTag status="fault" label="通讯中断" color="red" dot pulse />
        <DeviceStatusTag status="lowBattery" label="低电量" color="orange" />
      </Section>

      <Section title="尺寸 sm / md（表格列用 sm）">
        <DeviceStatusTag status="online" size="sm" lastSeen={new Date(Date.now() - 15 * 1000)} />
        <DeviceStatusTag status="offline" size="md" />
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
