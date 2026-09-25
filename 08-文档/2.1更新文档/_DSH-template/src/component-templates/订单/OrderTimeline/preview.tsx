// @ts-nocheck
/**
 * 组件预览页 · 订单 / OrderTimeline
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { OrderTimeline, TRACE_COLORS } from './index';

const NAME = 'OrderTimeline';
const DESC = '订单/退款单操作日志（默认倒序，颜色由 type 映射）';
const PROMPT = '【组件引用】OrderTimeline 订单操作轨迹（组件库 订单）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/订单/OrderTimeline.tsx\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { OrderTimeline } from \'../../component-templates/订单/OrderTimeline\';\n参数：records[{time,action,actor,remark,type}]/asc/title/timeFormat\n场景：订单/退款单操作日志（默认倒序，颜色由 type 映射）\n规则：请使用该组件，不要自造同类样式；零第三方依赖。';

/** 兜底：默认参数无法渲染时给出提示，避免整页白屏 */
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
  const RECORDS = [
    { id: 1, time: '2026-09-22 09:12:04', action: '提交订单', actor: '张伟', type: 'create', remark: '订单金额 ¥128,600.00，共 3 件商品' },
    { id: 2, time: '2026-09-22 09:15:37', action: '买家付款', actor: '张伟', type: 'pay', remark: '微信支付 ¥118,800.00，交易号 42000028932026092200' },
    { id: 3, time: '2026-09-22 10:02:11', action: '商家发货', actor: '仓储中心 · 李强', type: 'deliver', remark: '顺丰速运 SF1380002938' },
    { id: 4, time: '2026-09-22 15:40:26', action: '物流到达中转场', actor: '系统', type: 'system', remark: '已到达青岛中转场，预计次日达' }
  ];
  return (
    <DemoBoundary>
      <OrderTimeline records={RECORDS} title="订单操作轨迹" asc={false} />
    </DemoBoundary>
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
