import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "Cascade", label: undefined, href: "./Cascade/index.html" },
  { name: "Choice", label: undefined, href: "./Choice/index.html" },
  { name: "DatePicker", label: undefined, href: "./DatePicker/index.html" },
  { name: "FormField", label: undefined, href: "./FormField/index.html" },
  { name: "Input", label: undefined, href: "./Input/index.html" },
  { name: "Select", label: undefined, href: "./Select/index.html" },
  { name: "Slider", label: undefined, href: "./Slider/index.html" },
  { name: "Suggest", label: undefined, href: "./Suggest/index.html" },
  { name: "Transfer", label: undefined, href: "./Transfer/index.html" },
  { name: "Upload", label: undefined, href: "./Upload/index.html" },
  { name: "VerificationCode", label: undefined, href: "./VerificationCode/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>表单</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
