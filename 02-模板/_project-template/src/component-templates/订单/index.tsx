import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "OrderAmountSummary", label: undefined, href: "./OrderAmountSummary/index.html" },
  { name: "OrderDetailHeader", label: undefined, href: "./OrderDetailHeader/index.html" },
  { name: "OrderItemList", label: undefined, href: "./OrderItemList/index.html" },
  { name: "OrderStatusFlow", label: undefined, href: "./OrderStatusFlow/index.html" },
  { name: "OrderTable", label: undefined, href: "./OrderTable/index.html" },
  { name: "OrderTimeline", label: undefined, href: "./OrderTimeline/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>订单</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
