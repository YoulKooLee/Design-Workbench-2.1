// @ts-nocheck
/**
 * 组件预览页 · 订单 / OrderAmountSummary
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { OrderAmountSummary } from './index';

const NAME = 'OrderAmountSummary';
const DESC = '订单详情/收银台/退款单的金额明细（小计/优惠/运费/应付）';
const PROMPT = '【组件引用】OrderAmountSummary 金额汇总（组件库 订单）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/订单/OrderAmountSummary.tsx\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { OrderAmountSummary } from \'../../component-templates/订单/OrderAmountSummary\';\n参数：items[{label,value,highlight,hint}]/title/showTitle/total/divider\n场景：订单详情/收银台/退款单的金额明细（小计/优惠/运费/应付）\n规则：请使用该组件，不要自造同类样式；零第三方依赖。';

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
  return (
    <DemoBoundary>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
        <OrderAmountSummary
          title="金额明细"
          items={[
            { label: '商品小计', value: 128600 },
            { label: '优惠券', value: -10000 },
            { label: '运费', value: 200 },
            { label: '已付金额', value: 0 }
          ]}
          total={{ label: '应付金额', value: 118800, hint: '含税' }}
        />
        <OrderAmountSummary
          title="退款明细"
          items={[
            { label: '实付金额', value: 118800 },
            { label: '退还运费', value: -200 }
          ]}
          total={{ label: '应退金额', value: 118600 }}
        />
      </div>
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
