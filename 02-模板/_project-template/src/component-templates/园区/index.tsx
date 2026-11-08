import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "AccessPointStatus", label: "门禁点状态", href: "./AccessPointStatus/index.html" },
  { name: "EnergyPanel", label: "能耗面板", href: "./EnergyPanel/index.html" },
  { name: "InspectionTaskList", label: "巡检任务列表", href: "./InspectionTaskList/index.html" },
  { name: "ParkingSpaceGrid", label: "车位分布图", href: "./ParkingSpaceGrid/index.html" },
  { name: "PassageRecordTable", label: "通行记录表", href: "./PassageRecordTable/index.html" },
  { name: "PatrolCheckpointTimeline", label: "巡更打卡轴", href: "./PatrolCheckpointTimeline/index.html" },
  { name: "VisitorForm", label: "访客登记表单", href: "./VisitorForm/index.html" },
  { name: "VisitorPassCard", label: "访客通行凭证", href: "./VisitorPassCard/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>园区</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
