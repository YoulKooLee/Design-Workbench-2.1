import '../style.css';
import React from 'react';

// Reusable list item component
const ListItem = ({ 
  title, 
  hint, 
  hasChevron = true, 
  hasToggle = false, 
  isLast = false 
}: {
  title: string;
  hint?: string;
  hasChevron?: boolean;
  hasToggle?: boolean;
  isLast?: boolean;
}) => (
  <div className={`flex items-center justify-between py-[15px] ${!isLast ? 'border-b-[0.5px] border-[#F2F2F2]' : ''}`}>
    <span className="text-[#333333] font-[400] text-[13.5px] tracking-wide">{title}</span>
    <div className="flex items-center space-x-1.5 shrink-0">
      {hasToggle && (
        <div className="w-[44px] h-[26px] bg-[#E5E5E5] rounded-full relative ml-2 select-none pointer-events-none">
           <div className="w-[22px] h-[22px] bg-white rounded-full absolute left-[2px] top-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"></div>
        </div>
      )}
      {hint && <span className="text-[#999999] text-[12px]">{hint}</span>}
      {hasChevron && (
        <svg fill="none" stroke="#C7C7CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4 ml-[2px] -mr-[2px]">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </div>
  </div>
);

const ZhipuPersonalCenter: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F5F6F8] sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 overflow-hidden">
      
      {/* Fixed Header Container */}
      <div className="sticky top-0 z-50 bg-[#F5F6F8] w-full shrink-0">
        {/* Top Status Bar */}
        <div className="flex justify-between items-center px-6 pt-3.5 w-full">
          <div className="text-[13.5px] font-[500] text-black tracking-tight mt-0.5">
            18:13
          </div>
          <div className="flex items-center space-x-[5px]">
            {/* Cellular */}
            <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="black">
              <rect x="0" y="7" width="3" height="4" rx="1" />
              <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
              <rect x="9" y="2" width="3" height="9" rx="1" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" />
            </svg>
            {/* WiFi */}
            <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" />
              <path d="M4 7C6.5 5.2 9.5 5.2 12 7" />
              <path d="M7 9.5C7.8 9 8.2 9 9 9.5" />
            </svg>
            {/* Battery */}
            <svg className="w-[24px] h-[11.5px]" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="black" strokeWidth="1" />
              <rect x="2" y="2" width="18" height="8" rx="1.5" fill="black" />
              <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="black" />
            </svg>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between px-3 h-11 pb-1 mt-1">
          <button className="w-10 h-10 flex items-center justify-center -ml-1 active:opacity-60 transition-opacity">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-[15.5px] font-[600] text-black tracking-wide">个人中心</span>
          <div className="w-10"></div> {/* Hidden spacer for centering */}
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 px-[14px] flex flex-col space-y-[14px] overflow-y-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* VIP Profile Card */}
        <div className="w-full bg-gradient-to-br from-[#8E9BCE] via-[#94A2D5] to-[#A2B1DF] rounded-[18px] p-[18px] relative overflow-hidden shadow-[0_2px_8px_rgba(142,155,206,0.15)] mt-1 shrink-0">
          
          {/* Background Decorative Curves */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 160" preserveAspectRatio="none" fill="none">
             <path d="M110 210 C 180 80, 280 10, 380 90" stroke="white" strokeWidth="1.5" strokeOpacity="0.12" />
             <path d="M180 220 C 210 110, 310 50, 420 -30" stroke="white" strokeWidth="1.5" strokeOpacity="0.08" />
             <circle cx="280" cy="-30" r="110" stroke="white" strokeWidth="1.5" strokeOpacity="0.06" />
          </svg>

          <div className="relative z-10 flex flex-col h-full">
             {/* User Block */}
             <div className="flex items-center">
               
               {/* Avatar Container */}
               <div className="relative w-[54px] h-[54px]">
                 <div className="w-full h-full rounded-full border-[1.5px] border-white bg-white flex items-center justify-center overflow-hidden shadow-sm">
                   <svg viewBox="0 0 40 40" className="w-[30px] h-[30px] translate-y-[-1px]">
                     <path d="M20,30 C20,30 17,22 9,20 C2,16 6,8 20,5 C34,8 38,16 31,20 C23,22 20,30 20,30 Z" fill="url(#leafGradient)" />
                     <defs>
                       <linearGradient id="leafGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                         <stop offset="0%" stopColor="#FFB11B" />
                         <stop offset="100%" stopColor="#FF6B00" />
                       </linearGradient>
                     </defs>
                   </svg>
                 </div>
                 
                 {/* VIP Badge */}
                 <div className="absolute -bottom-[2px] -right-[2px] bg-gradient-to-b from-[#FAFBFD] via-[#D5D9E2] to-[#A8AFBD] rounded-sm px-[5.5px] py-[1.5px] shadow-sm transform -skew-x-[8deg] border border-white/60 flex items-center justify-center">
                   <span className="text-[9px] font-[600] italic text-[#393D45] tracking-widest leading-none" style={{ fontFamily: 'Arial, sans-serif' }}>
                     VIP
                   </span>
                 </div>
               </div>

               {/* Name and Status */}
               <div className="ml-[14px]">
                 <div className="text-white font-[600] text-[16px]">美叶</div>
                 <div className="text-white/80 text-[11px] font-[400] mt-[2px]">非会员</div>
               </div>
             </div>

             {/* Action Row */}
             <div className="mt-8 flex items-end justify-between">
               <div>
                 <div className="text-white font-[600] text-[14px] tracking-wide">会员特权</div>
                 <div className="text-white/75 text-[10px] mt-[4px] tracking-wide">升级会员，解锁会员专属权益</div>
               </div>
               
               {/* Upgrade Button */}
               <button className="bg-gradient-to-r from-[#FEEBA5] to-[#F1C865] text-[#5A3C00] font-[600] text-[11.5px] px-[16px] py-[6.5px] rounded-full shadow-sm active:opacity-90 transform transition flex-shrink-0">
                 升级会员
               </button>
             </div>
          </div>
        </div>

        {/* Group 1: Order */}
        <div className="w-full bg-white rounded-[16px] px-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)] shrink-0">
           <ListItem title="我的订单" isLast={true} />
        </div>

        {/* Group 2: Account Settings */}
        <div className="w-full bg-white rounded-[16px] px-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)] shrink-0">
           <ListItem title="个人资料" hint="头像、昵称等" />
           <ListItem title="账号与安全" hint="手机号等" />
           <ListItem title="自动云存储" hasToggle={true} hasChevron={false} />
           <ListItem title="外观设置" hint="跟随系统" />
           <ListItem title="音色设置" hint="标准女声" isLast={true} />
        </div>

        {/* Group 3: Help & Policies */}
        <div className="w-full bg-white rounded-[16px] px-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)] shrink-0">
           <ListItem title="帮助与反馈" />
           <ListItem title="隐私政策" />
           <ListItem title="用户协议" />
           <ListItem title="已收集个人信息清单" />
           <ListItem title="第三方信息共享清单" />
           <ListItem title="关于我们" isLast={true} />
        </div>

        {/* Logout Button */}
        <div className="w-full bg-white rounded-[16px] h-[52px] shadow-[0_1px_4px_rgba(0,0,0,0.02)] active:bg-[#F9F9F9] flex items-center justify-center cursor-pointer shrink-0">
           <span className="text-[#333333] font-[400] text-[14.5px]">退出登录</span>
        </div>

      </div>

      {/* Global Home Indicator */}
      <div className="w-full pb-2 pt-1 flex justify-center shrink-0 bg-[#F5F6F8]">
        <div className="w-[134px] h-[5px] bg-[#121212] rounded-full" />
      </div>

    </div>
  );
};

export default ZhipuPersonalCenter;
