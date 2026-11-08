import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "Alert", label: undefined, href: "./Alert/index.html" },
  { name: "Drawer", label: undefined, href: "./Drawer/index.html" },
  { name: "Message", label: undefined, href: "./Message/index.html" },
  { name: "Modal", label: undefined, href: "./Modal/index.html" },
  { name: "Notification", label: undefined, href: "./Notification/index.html" },
  { name: "ResultPage", label: undefined, href: "./ResultPage/index.html" },
  { name: "Spin", label: undefined, href: "./Spin/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>反馈</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
