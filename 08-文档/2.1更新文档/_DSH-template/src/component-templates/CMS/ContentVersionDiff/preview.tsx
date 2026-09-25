// @ts-nocheck
/**
 * 组件预览页 · CMS / ContentVersionDiff
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { ContentVersionDiff, diffLines, diffStat } from './index';

const NAME = 'ContentVersionDiff';
const DESC = '内容版本历史对比、配置变更对比（零依赖 LCS 逐行差异，大文本自动降级）';
const PROMPT = '【组件引用】ContentVersionDiff 版本对比（组件库 CMS）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/CMS/ContentVersionDiff.tsx\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { ContentVersionDiff } from \'../../component-templates/CMS/ContentVersionDiff\';\n参数：oldText/newText/oldLabel/newLabel/showHeader/onlyDiff/maxHeight\n场景：内容版本历史对比、配置变更对比（零依赖 LCS 逐行差异，大文本自动降级）\n规则：请使用该组件，不要自造同类样式；零第三方依赖。';

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
  const OLD = [
    '第一条 为规范园区数字孪生平台的使用，制定本办法。',
    '第二条 平台数据每日 02:00 同步一次。',
    '第三条 各专题数据由对应责任部门维护。',
    '第四条 本办法自发布之日起施行。'
  ].join('\n');
  const NEW = [
    '第一条 为规范园区数字孪生平台的使用，制定本办法。',
    '第二条 平台数据每 30 分钟同步一次，异常时自动重试。',
    '第三条 各专题数据由对应责任部门维护，并指定数据责任人。',
    '第五条 本办法自 2026 年 10 月 1 日起施行。'
  ].join('\n');
  return (
    <DemoBoundary>
      <ContentVersionDiff
        oldText={OLD}
        newText={NEW}
        oldLabel="v1.2（2026-09-15）"
        newLabel="v1.3（2026-09-22）"
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
