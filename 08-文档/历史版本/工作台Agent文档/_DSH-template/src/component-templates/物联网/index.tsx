import React from 'react';
import { createRoot } from 'react-dom/client';

const ITEMS = [
  { name: 'AlarmLevelTag', label: '告警级别标', href: './AlarmLevelTag/index.html' },
  { name: 'AlarmList', label: '告警列表', href: './AlarmList/index.html' },
  { name: 'DeviceCard', label: '设备卡片', href: './DeviceCard/index.html' },
  { name: 'DeviceGrid', label: '设备状态宫格', href: './DeviceGrid/index.html' },
  { name: 'DeviceStatusTag', label: '设备状态标', href: './DeviceStatusTag/index.html' },
  { name: 'MetricGauge', label: '指标仪表盘', href: './MetricGauge/index.html' },
  { name: 'RealTimeValue', label: '实时值', href: './RealTimeValue/index.html' },
  { name: 'TelemetryChart', label: '遥测曲线', href: './TelemetryChart/index.html' },
];

function CategoryView() {
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>物联网</h1>
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
