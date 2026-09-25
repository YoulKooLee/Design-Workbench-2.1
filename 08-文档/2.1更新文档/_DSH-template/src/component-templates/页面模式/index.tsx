import React from 'react';
import { createRoot } from 'react-dom/client';

function CategoryView() {
  return (
    <div style={{padding:24,maxWidth:900}}>
      <h1 style={{fontSize:18,margin:'0 0 16px'}}>页面模式</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
    <a href="./PageFormBasic/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageFormBasic</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageFormGroup/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageFormGroup</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListCard/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListCard</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListSearchTable/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListSearchTable</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageFormStep/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageFormStep</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageFormStepVertical/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageFormStepVertical</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDetailBasic/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDetailBasic</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDetailAdvanced/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDetailAdvanced</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListImport/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListImport</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListCalendar/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListCalendar</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListEditable/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListEditable</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListKanban/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListKanban</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListMasterDetail/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListMasterDetail</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListTagFilter/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListTagFilter</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListFilterTable/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListFilterTable</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListTreeTable/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListTreeTable</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageListMedia/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageListMedia</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageException/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageException</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageResult/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageResult</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageLogin/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageLogin</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageUserHome/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageUserHome</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageWorkplace/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageWorkplace</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageMessageList/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageMessageList</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageUserSetting/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageUserSetting</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDashboardAnalytics/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDashboardAnalytics</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDashboardCustomer/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDashboardCustomer</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDashboardFinance/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDashboardFinance</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDashboardAcademy/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDashboardAcademy</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDashboardProductivity/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDashboardProductivity</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDashboardBanking/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDashboardBanking</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDashboardCrm/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDashboardCrm</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PageDashboardEcommerce/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PageDashboardEcommerce</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./MobileFrameIos/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>MobileFrameIos</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./MobileFrameWechat/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>MobileFrameWechat</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
