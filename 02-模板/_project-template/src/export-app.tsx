import React, { useState } from 'react';
import DiagnosisPage from './prototypes/diagnosis';
import DashboardPage from './prototypes/dashboard';
import AlarmPage from './prototypes/alarm';
import DevicesPage from './prototypes/devices';
import ReportPage from './prototypes/report';

const PAGES: { key: string; label: string; Comp: React.ComponentType<any> }[] = [
  { key: 'diagnosis', label: '智慧诊断', Comp: DiagnosisPage },
  { key: 'dashboard', label: '数据看板', Comp: DashboardPage },
  { key: 'alarm', label: '预警信息', Comp: AlarmPage },
  { key: 'devices', label: '设备管理', Comp: DevicesPage },
  { key: 'report', label: '生成报告', Comp: ReportPage },
];

export default function ExportApp() {
  const [cur, setCur] = useState('dashboard');
  const Comp = PAGES.find((p) => p.key === cur)!.Comp;
  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 1000, display: 'flex', gap: 8, padding: '10px 16px', background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <strong style={{ marginRight: 12, alignSelf: 'center' }}>结构监测原型（离线导出）</strong>
        {PAGES.map((p) => (
          <button key={p.key} onClick={() => setCur(p.key)}
            style={{ padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13,
              border: '1px solid ' + (cur === p.key ? '#2b6cff' : '#d1d5db'),
              background: cur === p.key ? '#2b6cff' : '#fff', color: cur === p.key ? '#fff' : '#374151' }}>
            {p.label}
          </button>
        ))}
      </div>
      <div>
        <Comp />
      </div>
    </div>
  );
}

// 离线导出场景下的独立挂载点：当 Axhub export 模板未注入兜底渲染时，
// 由本入口主动挂载 React 应用，避免 #root 为空。
// Dev 预览走 vite dev server + index.html，不读 export.html，本副作用不影响 dev。
import { createRoot } from 'react-dom/client';
const _root = typeof document !== 'undefined' ? document.getElementById('root') : null;
if (_root && !(_root as any).__reactMounted$) {
  (_root as any).__reactMounted$ = true;
  createRoot(_root).render(<ExportApp />);
}