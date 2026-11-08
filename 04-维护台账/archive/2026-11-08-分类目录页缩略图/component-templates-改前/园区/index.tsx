import React from 'react';
import { createRoot } from 'react-dom/client';

const ITEMS = [
  { name: 'AccessPointStatus', label: '门禁点状态', href: './AccessPointStatus/index.html' },
  { name: 'EnergyPanel', label: '能耗面板', href: './EnergyPanel/index.html' },
  { name: 'InspectionTaskList', label: '巡检任务列表', href: './InspectionTaskList/index.html' },
  { name: 'ParkingSpaceGrid', label: '车位分布图', href: './ParkingSpaceGrid/index.html' },
  { name: 'PassageRecordTable', label: '通行记录表', href: './PassageRecordTable/index.html' },
  { name: 'PatrolCheckpointTimeline', label: '巡更打卡轴', href: './PatrolCheckpointTimeline/index.html' },
  { name: 'VisitorForm', label: '访客登记表单', href: './VisitorForm/index.html' },
  { name: 'VisitorPassCard', label: '访客通行凭证', href: './VisitorPassCard/index.html' },
];

function CategoryView() {
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>园区</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
        {ITEMS.map((it) => (
          <a key={it.name} href={it.href} style={{ display: 'block', padding: 16, border: '1px solid #e5e6eb', borderRadius: 8, textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{it.name}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{it.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<CategoryView />);
