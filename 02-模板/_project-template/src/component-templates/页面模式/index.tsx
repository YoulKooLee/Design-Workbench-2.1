import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
  { name: "PageFormBasic", label: undefined, href: "./PageFormBasic/index.html" },
  { name: "PageFormGroup", label: undefined, href: "./PageFormGroup/index.html" },
  { name: "PageListCard", label: undefined, href: "./PageListCard/index.html" },
  { name: "PageListSearchTable", label: undefined, href: "./PageListSearchTable/index.html" },
  { name: "PageFormStep", label: undefined, href: "./PageFormStep/index.html" },
  { name: "PageFormStepVertical", label: undefined, href: "./PageFormStepVertical/index.html" },
  { name: "PageDetailBasic", label: undefined, href: "./PageDetailBasic/index.html" },
  { name: "PageDetailAdvanced", label: undefined, href: "./PageDetailAdvanced/index.html" },
  { name: "PageListImport", label: undefined, href: "./PageListImport/index.html" },
  { name: "PageListCalendar", label: undefined, href: "./PageListCalendar/index.html" },
  { name: "PageListEditable", label: undefined, href: "./PageListEditable/index.html" },
  { name: "PageListKanban", label: undefined, href: "./PageListKanban/index.html" },
  { name: "PageListMasterDetail", label: undefined, href: "./PageListMasterDetail/index.html" },
  { name: "PageListTagFilter", label: undefined, href: "./PageListTagFilter/index.html" },
  { name: "PageListFilterTable", label: undefined, href: "./PageListFilterTable/index.html" },
  { name: "PageListTreeTable", label: undefined, href: "./PageListTreeTable/index.html" },
  { name: "PageListMedia", label: undefined, href: "./PageListMedia/index.html" },
  { name: "PageException", label: undefined, href: "./PageException/index.html" },
  { name: "PageResult", label: undefined, href: "./PageResult/index.html" },
  { name: "PageLogin", label: undefined, href: "./PageLogin/index.html" },
  { name: "PageUserHome", label: undefined, href: "./PageUserHome/index.html" },
  { name: "PageWorkplace", label: undefined, href: "./PageWorkplace/index.html" },
  { name: "PageMessageList", label: undefined, href: "./PageMessageList/index.html" },
  { name: "PageUserSetting", label: undefined, href: "./PageUserSetting/index.html" },
  { name: "PageDashboardAnalytics", label: undefined, href: "./PageDashboardAnalytics/index.html" },
  { name: "PageDashboardCustomer", label: undefined, href: "./PageDashboardCustomer/index.html" },
  { name: "PageDashboardFinance", label: undefined, href: "./PageDashboardFinance/index.html" },
  { name: "PageDashboardAcademy", label: undefined, href: "./PageDashboardAcademy/index.html" },
  { name: "PageDashboardProductivity", label: undefined, href: "./PageDashboardProductivity/index.html" },
  { name: "PageDashboardBanking", label: undefined, href: "./PageDashboardBanking/index.html" },
  { name: "PageDashboardCrm", label: undefined, href: "./PageDashboardCrm/index.html" },
  { name: "PageDashboardEcommerce", label: undefined, href: "./PageDashboardEcommerce/index.html" },
  { name: "MobileFrameIos", label: undefined, href: "./MobileFrameIos/index.html" },
  { name: "MobileFrameWechat", label: undefined, href: "./MobileFrameWechat/index.html" },
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>页面模式</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
