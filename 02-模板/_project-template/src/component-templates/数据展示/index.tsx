import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "Calendar", label: undefined, href: "./Calendar/index.html" },
  { name: "Chart", label: undefined, href: "./Chart/index.html" },
  { name: "Collapse", label: undefined, href: "./Collapse/index.html" },
  { name: "DataTable", label: undefined, href: "./DataTable/index.html" },
  { name: "Descriptions", label: undefined, href: "./Descriptions/index.html" },
  { name: "List", label: undefined, href: "./List/index.html" },
  { name: "Pagination", label: undefined, href: "./Pagination/index.html" },
  { name: "Progress", label: undefined, href: "./Progress/index.html" },
  { name: "Timeline", label: undefined, href: "./Timeline/index.html" },
  { name: "Tree", label: undefined, href: "./Tree/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>数据展示</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
