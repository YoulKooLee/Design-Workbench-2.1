import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "Breadcrumb", label: undefined, href: "./Breadcrumb/index.html" },
  { name: "Layout", label: undefined, href: "./Layout/index.html" },
  { name: "PageHeader", label: undefined, href: "./PageHeader/index.html" },
  { name: "Steps", label: undefined, href: "./Steps/index.html" },
  { name: "Tabs", label: undefined, href: "./Tabs/index.html" },
  { name: "Toolbar", label: undefined, href: "./Toolbar/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>布局</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
