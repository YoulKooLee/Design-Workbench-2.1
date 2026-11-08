import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "InvoiceForm", label: undefined, href: "./InvoiceForm/index.html" },
  { name: "PaymentCashier", label: undefined, href: "./PaymentCashier/index.html" },
  { name: "PaymentCountdown", label: undefined, href: "./PaymentCountdown/index.html" },
  { name: "PaymentMethodPicker", label: undefined, href: "./PaymentMethodPicker/index.html" },
  { name: "PaymentResult", label: undefined, href: "./PaymentResult/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>付款</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
