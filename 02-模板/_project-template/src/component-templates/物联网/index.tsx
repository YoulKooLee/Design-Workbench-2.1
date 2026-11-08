import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "AlarmLevelTag", label: "告警级别标", href: "./AlarmLevelTag/index.html" },
  { name: "AlarmList", label: "告警列表", href: "./AlarmList/index.html" },
  { name: "DeviceCard", label: "设备卡片", href: "./DeviceCard/index.html" },
  { name: "DeviceGrid", label: "设备状态宫格", href: "./DeviceGrid/index.html" },
  { name: "DeviceStatusTag", label: "设备状态标", href: "./DeviceStatusTag/index.html" },
  { name: "MetricGauge", label: "指标仪表盘", href: "./MetricGauge/index.html" },
  { name: "RealTimeValue", label: "实时值", href: "./RealTimeValue/index.html" },
  { name: "TelemetryChart", label: "遥测曲线", href: "./TelemetryChart/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>物联网</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
