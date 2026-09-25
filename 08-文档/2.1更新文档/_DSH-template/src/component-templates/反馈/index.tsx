import React from 'react';
import { createRoot } from 'react-dom/client';

function CategoryView() {
  return (
    <div style={{padding:24,maxWidth:900}}>
      <h1 style={{fontSize:18,margin:'0 0 16px'}}>反馈</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
    <a href="./Alert/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Alert</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Drawer/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Drawer</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Message/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Message</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Modal/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Modal</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Notification/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Notification</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./ResultPage/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>ResultPage</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Spin/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Spin</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
