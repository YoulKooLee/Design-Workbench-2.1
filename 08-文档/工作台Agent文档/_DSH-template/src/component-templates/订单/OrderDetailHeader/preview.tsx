// @ts-nocheck
/**
 * 组件预览页 · 订单 / OrderDetailHeader
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { OrderDetailHeader } from './index';
import { Button } from '../../基础/Button';

const NAME = 'OrderDetailHeader';
const DESC = '订单详情页顶部信息卡（订单号+状态+金额+关键字段+操作区）';
const PROMPT = '【组件引用】OrderDetailHeader 订单详情头（组件库 订单）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/订单/OrderDetailHeader.tsx\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { OrderDetailHeader } from \'../../component-templates/订单/OrderDetailHeader\';\n参数：orderNo/status/statusMap/amount/customer/contact/address/channel/payMethod/createdAt/paidAt/extra/fields\n场景：订单详情页顶部信息卡（订单号+状态+金额+关键字段+操作区）\n规则：请使用该组件，不要自造同类样式；零第三方依赖。';

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
      <OrderDetailHeader
        orderNo="SO20260922001"
        status="pending_pay"
        amount={128600}
        customer="崂山实验室 · 张伟"
        contact="138****6621"
        address="山东省青岛市崂山区松岭路 168 号 A 座 12 层"
        channel="商城"
        payMethod="微信支付"
        createdAt="2026-09-22 09:12"
        extra={
          <>
            <Button size="sm" variant="outline">改价</Button>
            <Button size="sm" variant="primary">提醒付款</Button>
          </>
        }
        fields={[{ label: '客户备注', value: '需在工作日 09:00-17:00 送达，收货前电话联系', span: 3 }]}
      />
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
    <div style={{ padding: 24, maxWidth: 1180 }}>
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
