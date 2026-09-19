// @ts-nocheck
/**
 * 组件预览页 · 工作流 / WorkflowCanvas
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { WorkflowCanvas, WORKFLOW_NODE_TYPES, kindToType, WorkflowNodeData, FlowNode } from './index';

const NAME = 'WorkflowCanvas';
const DESC = '工作流/审批流/自动化规则的可视化编排（拖拽节点、连线、缩放、小地图），配 NodePalettePanel 使用';
const PROMPT = '【组件引用】WorkflowCanvas 工作流画布（组件库 工作流）\n框架：React 18 + Tailwind v4；⚠️ 本组件**需要第三方依赖** @xyflow/react（React Flow，MIT，^12.11.6），是组件库唯一例外\n来源：03-组件库/03-页面组件/Codebuddy Design/工作流/WorkflowCanvas.tsx（导出：WorkflowCanvas / WORKFLOW_NODE_TYPES / kindToType）\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，确认工程已安装 @xyflow/react（^12.11.6），然后**按路径引入**（不在统一出口，避免影响未装依赖的工程）：\n  import { WorkflowCanvas, WORKFLOW_NODE_TYPES } from \'../../component-templates/工作流/WorkflowCanvas\';\n参数：nodes/edges/onNodesChange/onEdgesChange/onConnect/onCreateNodeAt/onNodeClick/height/readOnly/showMiniMap/showControls/toolbar\n场景：工作流/审批流/自动化规则的可视化编排（拖拽节点、连线、缩放、小地图），配 NodePalettePanel 使用\n规则：请使用该组件，不要自造同类样式；节点 kind 决定配色与连接点（trigger 无入、end 无出）；不要另引 AntV X6 / LogicFlow 造成双画布体系。';

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
        <WorkflowCanvas />
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
