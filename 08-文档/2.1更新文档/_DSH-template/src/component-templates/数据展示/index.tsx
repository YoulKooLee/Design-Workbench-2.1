import React from 'react';
import { createRoot } from 'react-dom/client';

function CategoryView() {
  return (
    <div style={{padding:24,maxWidth:900}}>
      <h1 style={{fontSize:18,margin:'0 0 16px'}}>数据展示</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
    <a href="./Calendar/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Calendar</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Chart/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Chart</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Collapse/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Collapse</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./DataTable/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>DataTable</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Descriptions/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Descriptions</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./List/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>List</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Pagination/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Pagination</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Progress/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Progress</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Timeline/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Timeline</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./Tree/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Tree</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
