// @ts-nocheck
/**
 * 组件预览页 · 园区 / AccessPointStatus
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { AccessPointStatus } from './index';

const NAME = 'AccessPointStatus 门禁点状态';
const DESC = '门禁点/闸机/道闸运行状态';
const PROMPT = '【组件引用】AccessPointStatus 门禁点状态（园区）\n框架：React + Tailwind v4\n用法：import { AccessPointStatus } from "../../component-templates/园区/AccessPointStatus"\n参数：points（门禁点：名称/区域/状态/今日人次/异常说明）；stateMap（可选覆盖文案配色）；onSelect；selectedId\n状态含：在线 / 离线 / 常开 / 报警 / 维护。请在出入口设备状态区块使用该组件。';

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

const POINTS = [
  { id: 1, name: '东门 · 人行闸机 1', area: '园区东门', state: 'online', todayCount: 1284 },
  { id: 2, name: '东门 · 人行闸机 2', area: '园区东门', state: 'online', todayCount: 967 },
  { id: 3, name: '东门 · 访客通道', area: '园区东门', state: 'alwaysOpen', todayCount: 86 },
  { id: 4, name: '南门 · 车行道闸', area: '园区南门', state: 'online', todayCount: 342 },
  { id: 5, name: 'A 座 · 大厅闸机', area: 'A 座科研楼', state: 'online', todayCount: 1523 },
  { id: 6, name: 'B 座 · 实验区门禁', area: 'B 座数据中心', state: 'alarm', todayCount: 45, note: '09:18 非授权时段进入告警' },
  { id: 7, name: 'C 座 · 库房门禁', area: 'C 座材料库', state: 'offline', note: '心跳丢失 26 分钟' },
  { id: 8, name: '地下车库 · 西入口', area: '地下车库', state: 'maintenance', note: ' planned 维护至 11:00' },
];

function Demo() {
  const [sel, setSel] = React.useState(null);
  return <AccessPointStatus points={POINTS} selectedId={sel} onSelect={(p) => setSel(p.id)} />;
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
