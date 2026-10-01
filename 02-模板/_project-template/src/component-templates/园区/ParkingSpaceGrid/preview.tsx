// @ts-nocheck
/**
 * 组件预览页 · 园区 / ParkingSpaceGrid
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { ParkingSpaceGrid } from './index';

const NAME = 'ParkingSpaceGrid 车位分布图';
const DESC = '车位状态格子图（空闲/占用/预约/无障碍/故障）';
const PROMPT = '【组件引用】ParkingSpaceGrid 车位分布图（园区）\n框架：React + Tailwind v4\n用法：import { ParkingSpaceGrid } from "../../component-templates/园区/ParkingSpaceGrid"\n参数：area（区域名）；spaces（车位：编号/状态/车牌/进入时间）；columns（每行列数，默认 8）；onSelect\n请在停车态势、车位管理场景使用该组件。';

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

// 生成 B1 层 32 个车位示例
function buildSpaces() {
  const plateList = ['鲁B·6Z8K2', '鲁B·1Q5W8', '鲁U·88D66', '鲁B·0A3B9', '鲁B·5T2K1'];
  const spaces = [];
  for (let i = 1; i <= 32; i++) {
    const code = 'B1-' + String(i).padStart(3, '0');
    let state = 'free';
    if ([3, 5, 7, 8, 12, 14, 15, 19, 20, 24, 27, 28, 31].includes(i)) state = 'occupied';
    if (i === 9 || i === 22) state = 'reserved';
    if (i === 4 || i === 18) state = 'disabled';
    if (i === 26) state = 'fault';
    const occ = state === 'occupied';
    spaces.push({
      code,
      state,
      plate: occ ? plateList[i % plateList.length] : undefined,
      since: occ ? ['07:42', '08:15', '08:58', '09:20'][i % 4] : undefined,
    });
  }
  return spaces;
}

function Demo() {
  const [sel, setSel] = React.useState(null);
  return (
    <div className="space-y-4">
      <ParkingSpaceGrid area="A 区 · 地下一层（B1）" spaces={buildSpaces()} columns={8} onSelect={setSel} />
      <div style={{ fontSize: 12, color: '#86909c' }}>
        {sel ? '选中车位：' + sel.code + '（' + sel.state + (sel.plate ? ' · ' + sel.plate : '') + '）' : '点击任意车位查看详情'}
      </div>
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
    <div style={{ padding: 24, maxWidth: 960 }}>
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
