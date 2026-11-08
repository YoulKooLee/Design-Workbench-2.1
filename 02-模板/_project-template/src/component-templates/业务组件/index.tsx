import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "FilterBar", label: undefined, href: "./FilterBar/index.html" },
  { name: "Kanban", label: undefined, href: "./Kanban/index.html" },
  { name: "KpiRow", label: undefined, href: "./KpiRow/index.html" },
  { name: "StatusTag", label: undefined, href: "./StatusTag/index.html" },
  { name: "TableCard", label: undefined, href: "./TableCard/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>业务组件</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
