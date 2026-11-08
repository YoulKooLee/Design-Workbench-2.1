import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "ApprovalNodeCard", label: undefined, href: "./ApprovalNodeCard/index.html" },
  { name: "ExecutionLogTimeline", label: undefined, href: "./ExecutionLogTimeline/index.html" },
  { name: "NodePalettePanel", label: undefined, href: "./NodePalettePanel/index.html" },
  { name: "WorkflowCanvas", label: undefined, href: "./WorkflowCanvas/index.html" },
  { name: "WorkflowList", label: undefined, href: "./WorkflowList/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>工作流</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
