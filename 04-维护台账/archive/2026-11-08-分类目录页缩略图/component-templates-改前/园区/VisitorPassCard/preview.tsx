// @ts-nocheck
/**
 * 组件预览页 · 园区 / VisitorPassCard
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { VisitorPassCard } from './index';
import { Button } from '../../基础/Button';

const NAME = 'VisitorPassCard 访客通行凭证';
const DESC = '电子凭证（二维码 + 有效期 + 可通行区域）';
const PROMPT = '【组件引用】VisitorPassCard 访客通行凭证（园区）\n框架：React + Tailwind v4\n用法：import { VisitorPassCard } from "../../component-templates/园区/VisitorPassCard"\n参数：info（凭证号/姓名/单位/被访人/有效期起止/可通行区域/状态）；qrContent（自定义二维码区）；actions（底部操作）\n状态含：待生效 / 生效中 / 已过期 / 已注销。请在登记完成页、访客凭证场景使用该组件。';

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
    <div className="grid grid-cols-2 gap-4">
      <VisitorPassCard
        info={{
          passNo: 'VP-20260926-0038',
          name: '李海洋',
          company: '青岛海研所',
          host: '张工 · 智慧园区部',
          validFrom: '2026-09-26 09:00',
          validTo: '2026-09-26 18:00',
          areas: ['A 座科研楼', '综合楼餐厅', '园区东门'],
          status: '生效中',
        }}
        actions={<Button size="sm">续期至 20:00</Button>}
      />
      <VisitorPassCard
        info={{
          passNo: 'VP-20260925-0117',
          name: '陈某某',
          company: '青岛某设备商',
          host: '王工 · 动力环境部',
          validFrom: '2026-09-25 14:00',
          validTo: '2026-09-25 18:00',
          areas: ['B 座数据中心'],
          status: '已过期',
        }}
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
