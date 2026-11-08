import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "ApprovalActionBar", label: "审批操作栏", href: "./ApprovalActionBar/index.html" },
  { name: "ApprovalFlowTimeline", label: "审批流时间轴", href: "./ApprovalFlowTimeline/index.html" },
  { name: "ApprovalTaskList", label: "审批待办列表", href: "./ApprovalTaskList/index.html" },
  { name: "AttendanceCalendar", label: "考勤日历", href: "./AttendanceCalendar/index.html" },
  { name: "ClockInCard", label: "打卡卡", href: "./ClockInCard/index.html" },
  { name: "ContactDirectory", label: "通讯录", href: "./ContactDirectory/index.html" },
  { name: "EmployeeCard", label: "人员卡", href: "./EmployeeCard/index.html" },
  { name: "OrgTreeSelect", label: "组织架构选择", href: "./OrgTreeSelect/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>办公</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
