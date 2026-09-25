// @ts-nocheck
/**
 * 组件预览页 · 触发器 / TriggerRuleCard
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { TriggerRuleCard, TRIGGER_RUN_PRESETS } from './index';

const NAME = 'TriggerRuleCard';
const DESC = '自动化规则列表卡片（启停开关+命中次数+最近执行结果+条件/动作摘要）';
const PROMPT = '【组件引用】TriggerRuleCard 触发规则卡（组件库 触发器）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/触发器/TriggerRuleCard.tsx\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { TriggerRuleCard } from \'../../component-templates/触发器/TriggerRuleCard\';\n参数：name/desc/enabled/onToggle/triggerType/triggerTone/hitCount/lastRunAt/lastRunStatus/conditionSummary/actionSummary/extra\n场景：自动化规则列表卡片（启停开关+命中次数+最近执行结果+条件/动作摘要）\n规则：请使用该组件，不要自造同类样式；零第三方依赖。';

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
  const [enabled, setEnabled] = React.useState(true);
  return (
    <DemoBoundary>
      <div style={{ display: 'grid', gap: 12 }}>
        <TriggerRuleCard
          name="大额订单自动审批"
          desc="订单金额超过 10 万元时自动发起主管审批流"
          enabled={enabled}
          onToggle={setEnabled}
          triggerType="事件触发"
          triggerTone="blue"
          hitCount={128}
          lastRunAt="2026-09-22 08:12:40"
          lastRunStatus="success"
          conditionSummary="订单金额 > 100000 且 客户等级 = VIP"
          actionSummary="发起审批 → 邮件通知 → 更新订单状态"
        />
        <TriggerRuleCard
          name="库存低于安全水位告警"
          desc="每日 06:00 巡检，低于水位时通知采购"
          enabled={false}
          triggerType="定时触发"
          triggerTone="orange"
          hitCount={12}
          lastRunAt="2026-09-22 06:00:03"
          lastRunStatus="fail"
          conditionSummary="库存数量 < 安全库存"
          actionSummary="发送邮件通知采购负责人"
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
