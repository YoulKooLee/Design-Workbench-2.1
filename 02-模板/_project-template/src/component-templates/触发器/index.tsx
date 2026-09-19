import React from 'react';
import { createRoot } from 'react-dom/client';

function CategoryView() {
  return (
    <div style={{padding:24,maxWidth:900}}>
      <h1 style={{fontSize:18,margin:'0 0 16px'}}>触发器</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
    <a href="./TriggerActionList/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>TriggerActionList</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./TriggerConditionBuilder/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>TriggerConditionBuilder</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./TriggerRuleCard/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>TriggerRuleCard</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./TriggerTypePicker/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>TriggerTypePicker</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
