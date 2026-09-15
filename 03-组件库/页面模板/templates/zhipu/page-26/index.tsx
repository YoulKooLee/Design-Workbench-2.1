import '../style.css';
import React from 'react';

// Form Section Header Node
const FormSectionHeader = ({ label, required = false }: { label: string, required?: boolean }) => (
  <div className="flex items-center mb-[12px] mt-[24px]">
     <span className="text-[14.5px] font-[500] text-[#1D2129] tracking-wide">{label}</span>
     {required && <span className="text-[#FF5722] ml-[4px] relative top-[2px]">*</span>}
  </div>
);

// Unified Form Dropdown Value Control
const DropdownControl = ({ value, widthClass = "w-full" }: { value: string, widthClass?: string }) => (
  <div className={`h-[44px] ${widthClass} border border-[#F0F2F5] rounded-[10px] px-[14px] flex justify-between items-center bg-white cursor-pointer active:bg-gray-50`}>
     <span className="text-[14px] font-[450] text-[#111111] tracking-wide">{value}</span>
     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4E5969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
     </svg>
  </div>
);

// Subscription Horizontal Chip Node
const CategoryChip = ({ label, active = false }: { label: string, active?: boolean }) => (
  <div className={`flex-shrink-0 h-[36px] px-[18px] rounded-[18px] flex items-center justify-center border text-[12.5px] tracking-wide cursor-pointer
     ${active 
        ? 'border-[#0D78FF] bg-[#F2F8FF] text-[#0D78FF] font-[400]' 
        : 'border-[#F0F2F5] bg-[#FFFFFF] text-[#4E5969] font-[450]'
     }`}
  >
     {label}
  </div>
);

// Prompt Suggestion Sub-Chip Node
const SuggestionChip = ({ label }: { label: string }) => (
  <div className="flex-shrink-0 h-[32px] px-[14px] bg-[#FFFFFF] rounded-full border border-[#F0F2F5] flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.02)] cursor-pointer">
     <span className="text-[12px] font-[450] text-[#4E5969]">{label}</span>
  </div>
);

const ZhipuAIScheduledTaskModalPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F3F4F7] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ========================================================= */}
      {/* 1. BACKGROUND APP CONTEXT (VISUALLY DIMMED BY OVERLAY)   */}
      {/* ========================================================= */}
      
      <div className="flex justify-between items-center px-[18px] pt-[56px] pb-[10px] bg-[#F3F4F7] sticky top-0 shrink-0 pointer-events-none">
        <div className="flex items-center">
          <div className="mr-[14px] p-[2px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </div>
          <div className="relative w-[34px] h-[34px] rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0DFFBA] via-[#0D78FF] to-[#0D1FFF]" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 shadow-sm"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
          <div className="flex flex-col ml-[10px]">
            <span className="text-[14.5px] font-[600] text-[#1D2129] leading-[1.2] tracking-widest">AI搜索</span>
            <span className="text-[10.5px] font-[400] text-[#A6ABB5] tracking-widest relative top-[1px]">来自: 智谱清言</span>
          </div>
        </div>
        <div className="flex items-center space-x-[18px] text-[#222222]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M22 9l-6 6 M16 9l6 6" /></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
        </div>
      </div>

      <div className="flex w-full justify-end px-[16px] pt-[12px]">
         <div className="bg-[#E7EEFB] text-[#111111] text-[14px] font-[450] tracking-wide leading-relaxed px-[16px] py-[16px] pb-[18px] rounded-[24px] rounded-tr-[4px] max-w-[90%] pointer-events-none">
            人力资源和社会保障部发布最新的最低工资标准，具体内容有哪些
         </div>
      </div>

      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none z-10">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal opacity-90">17:52</div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111] opacity-90">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="4.5" width="3" height="6.5" rx="1" /><rect x="9" y="2" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" /><path d="M4 7C6.5 5.2 9.5 5.2 12 7" /><path d="M7 9.5C7.8 9 8.2 9 9 9.5" /></svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" /><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" /><path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" /></svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MODAL OVERLAY (DIMMING SHIELD)                         */}
      {/* ========================================================= */}
      <div className="absolute inset-0 bg-[#000000] opacity-40 z-40 transition-opacity" />

      {/* ========================================================= */}
      {/* 3. SCHEDULED TASK FORM BOTTOM SHEET (设置定时任务)        */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 w-full bg-[#FFFFFF] rounded-t-[20px] z-50 flex flex-col pt-[24px] shadow-[0_-10px_30px_rgba(0,0,0,0.15)] h-[85vh] max-h-[800px]">
         
         {/* Header Title & Disclaimer */}
         <div className="px-[24px] mb-[20px] shrink-0">
             <div className="flex justify-between items-start mb-[8px]">
                 <span className="text-[17px] font-[600] text-[#111111] tracking-wide">设置定时任务</span>
                 <div className="cursor-pointer active:scale-90 transition-transform p-[2px] mt-[2px] mr-[-4px]">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18 M6 6l12 12" />
                     </svg>
                 </div>
             </div>
             <p className="text-[12.5px] text-[#A0A4B0] font-[450] leading-[1.6] tracking-wide pr-[16px]">
                在指定时间自动执行预设提示词，执行完毕后会将结果推送给你。多次任务未读会自动取消
             </p>
         </div>

         {/* Scrollable Form Content Viewport */}
         <div className="flex-1 w-full overflow-y-auto px-[24px] pb-[100px] [&::-webkit-scrollbar]:hidden">
             
             {/* Field 1: First Execution target */}
             <FormSectionHeader label="首次执行时间" />
             <div className="flex justify-between space-x-[12px]">
                 <DropdownControl value="2025-07-22" widthClass="w-[62%]" />
                 <DropdownControl value="上午8:00" widthClass="flex-1" />
             </div>

             {/* Field 2: Repetition Strategy */}
             <FormSectionHeader label="重复频次" />
             <DropdownControl value="每天重复" />

             {/* Field 3: Subject Subscription Target */}
             <FormSectionHeader label="订阅内容" required={true} />
             
             <div className="w-full flex space-x-[10px] overflow-x-auto [&::-webkit-scrollbar]:hidden mb-[14px] pb-[2px]">
                <CategoryChip label="新闻日报" active={true} />
                <CategoryChip label="每日运势" />
                <CategoryChip label="学术日报" />
                <CategoryChip label="今日天气" />
                <CategoryChip label="自定义指令" />
             </div>

             <div className="w-full bg-[#F7F8FA] border border-[#F0F2F5] rounded-[16px] min-h-[140px] pt-[16px] pb-[14px] flex flex-col justify-between">
                <textarea 
                   placeholder="输入你想订阅的新闻领域话题" 
                   className="w-full bg-transparent border-none outline-none resize-none text-[13.5px] px-[16px] placeholder:text-[#B5B9C2] font-[450] h-[60px]"
                   readOnly
                />
                
                <div className="w-full flex px-[16px] space-x-[8px] overflow-x-auto [&::-webkit-scrollbar]:hidden mt-[12px] pb-[4px]">
                   <SuggestionChip label="大模型行业" />
                   <SuggestionChip label="科技领域" />
                   <SuggestionChip label="A股市场" />
                   <SuggestionChip label="娱乐圈八卦" />
                   <SuggestionChip label="体育赛事" />
                </div>
             </div>

             {/* Field 4: Native Email Syncing Route */}
             <div className="flex justify-between items-center mb-[14px] mt-[32px]">
                <span className="text-[14.5px] font-[500] text-[#1D2129] tracking-wide">同步发送至邮箱</span>
                
                <div className="flex items-center space-x-[10px]">
                   <span className="text-[12px] font-[400] text-[#A6ABB5]">未开启</span>
                   {/* Inactive Custom Toggle Mock */}
                   <div className="w-[44px] h-[26px] bg-[#E5E6EB] rounded-full p-[2px] cursor-pointer transition-colors">
                      <div className="w-[22px] h-[22px] bg-[#FFFFFF] rounded-full shadow-sm transform translate-x-0" />
                   </div>
                </div>
             </div>

             <div className="w-full h-[46px] border border-[#E5E6EB] rounded-[10px] px-[14px] flex items-center bg-[#FFFFFF] opacity-50 cursor-not-allowed">
                <span className="text-[14px] font-[450] text-[#C9CDD4] tracking-wide">输入邮箱地址</span>
             </div>

             <p className="text-[12px] text-[#A0A4B0] font-[450] leading-[1.6] tracking-wide mt-[12px]">
                开启功能后，可配置<span className="text-[#FF5722]">1个</span>邮箱地址，用于接收任务邮件
             </p>

         </div>

         {/* Fixed Footer Confirm Actions */}
         <div className="absolute bottom-0 left-0 w-full bg-[#FFFFFF] pt-[12px] pb-[34px] px-[24px]">
             <div className="w-full h-[52px] bg-[#0D78FF] rounded-full flex justify-center items-center cursor-pointer active:bg-[#0B66D9] transition-colors shadow-[0_4px_16px_rgba(13,120,255,0.2)]">
                <span className="text-[#FFFFFF] text-[14.5px] font-[500] tracking-widest">确定</span>
             </div>
             
             {/* Base Anchor / Home Bar Inject */}
             <div className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-[#111111] opacity-90 rounded-full" />
         </div>

      </div>

    </div>
  );
};

export default ZhipuAIScheduledTaskModalPage;
