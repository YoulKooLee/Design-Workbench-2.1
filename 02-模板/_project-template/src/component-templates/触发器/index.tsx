import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "TriggerActionList", label: undefined, href: "./TriggerActionList/index.html" },
  { name: "TriggerConditionBuilder", label: undefined, href: "./TriggerConditionBuilder/index.html" },
  { name: "TriggerRuleCard", label: undefined, href: "./TriggerRuleCard/index.html" },
  { name: "TriggerTypePicker", label: undefined, href: "./TriggerTypePicker/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>触发器</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
