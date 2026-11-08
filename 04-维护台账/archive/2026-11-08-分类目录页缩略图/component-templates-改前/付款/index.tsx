import React from 'react';
import { createRoot } from 'react-dom/client';

function CategoryView() {
  return (
    <div style={{padding:24,maxWidth:900}}>
      <h1 style={{fontSize:18,margin:'0 0 16px'}}>付款</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
    <a href="./InvoiceForm/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>InvoiceForm</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PaymentCashier/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PaymentCashier</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PaymentCountdown/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PaymentCountdown</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PaymentMethodPicker/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PaymentMethodPicker</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
    <a href="./PaymentResult/index.html" style={{display:'block',padding:16,border:'1px solid #e5e7eb',borderRadius:8,textDecoration:'none',color:'inherit'}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>PaymentResult</div>
      <div style={{fontSize:12,color:'#64748b'}}>点击预览</div>
    </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
