import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "ContentEditorForm", label: undefined, href: "./ContentEditorForm/index.html" },
  { name: "ContentStatusBadge", label: undefined, href: "./ContentStatusBadge/index.html" },
  { name: "ContentTable", label: undefined, href: "./ContentTable/index.html" },
  { name: "ContentVersionDiff", label: undefined, href: "./ContentVersionDiff/index.html" },
  { name: "MediaPicker", label: undefined, href: "./MediaPicker/index.html" },
  { name: "PublishSchedulePanel", label: undefined, href: "./PublishSchedulePanel/index.html" },
  { name: "RichTextEditor", label: undefined, href: "./RichTextEditor/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>CMS</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
