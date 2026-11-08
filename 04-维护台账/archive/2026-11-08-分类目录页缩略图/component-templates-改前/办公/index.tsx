import React from 'react';
import { createRoot } from 'react-dom/client';

const ITEMS = [
  { name: 'ApprovalActionBar', label: '审批操作栏', href: './ApprovalActionBar/index.html' },
  { name: 'ApprovalFlowTimeline', label: '审批流时间轴', href: './ApprovalFlowTimeline/index.html' },
  { name: 'ApprovalTaskList', label: '审批待办列表', href: './ApprovalTaskList/index.html' },
  { name: 'AttendanceCalendar', label: '考勤日历', href: './AttendanceCalendar/index.html' },
  { name: 'ClockInCard', label: '打卡卡', href: './ClockInCard/index.html' },
  { name: 'ContactDirectory', label: '通讯录', href: './ContactDirectory/index.html' },
  { name: 'EmployeeCard', label: '人员卡', href: './EmployeeCard/index.html' },
  { name: 'OrgTreeSelect', label: '组织架构选择', href: './OrgTreeSelect/index.html' },
];

function CategoryView() {
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>办公</h1>
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
