import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "Avatar", label: undefined, href: "./Avatar/index.html" },
  { name: "Badge", label: undefined, href: "./Badge/index.html" },
  { name: "Button", label: undefined, href: "./Button/index.html" },
  { name: "Card", label: undefined, href: "./Card/index.html" },
  { name: "Divider", label: undefined, href: "./Divider/index.html" },
  { name: "Overlay", label: undefined, href: "./Overlay/index.html" },
  { name: "Popconfirm", label: undefined, href: "./Popconfirm/index.html" },
  { name: "Tag", label: undefined, href: "./Tag/index.html" },
  { name: "Typography", label: undefined, href: "./Typography/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>基础</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
