import '../style.css';
import React from 'react';

const historyItems = [
  {
    title: "高考地区：北京 成绩类型：本科 想报考的城市：北京 想学的专业/方向：物理 高考/预...",
    agent: "志愿预测",
    time: "2025-07-21 18:12"
  },
  {
    title: "王者怎么给我整恋爱赛道来了",
    agent: "AI搜索",
    time: "2025-07-21 18:10"
  },
  {
    title: "一幅高清摄影作品，一对情侣拟人的仓鼠在躺椅上戴着墨镜，左边的仓鼠穿着海滩衬衫和...",
    agent: "AI画图",
    time: "2025-07-21 18:10"
  },
  {
    title: "喵喵，我今天好累，能量值掉到 10%，怎么...",
    agent: "喵喵打工人能量补给站",
    time: "2025-07-21 18:08"
  },
  {
    title: "请根据我的要求设计一个 logo",
    agent: "炫酷logo设计大师",
    time: "2025-07-21 18:07"
  },
  {
    title: "人力资源和社会保障部发布最新的最低工资标准，具体内容有哪些",
    agent: "AI搜索",
    time: "2025-07-21 17:52"
  }
];

const TopUserSection = () => (
  <div className="flex flex-col pt-[58px] bg-white shrink-0">
     
     {/* Account Identity Line */}
     <div className="flex justify-between items-center px-5 shrink-0">
       <div className="flex items-center active:opacity-70 transition-opacity cursor-pointer">
         <div className="relative">
            {/* Ginkgo/Spark Avatar Shape */}
            <svg width="38" height="38" viewBox="0 0 100 100" fill="#FFA531">
              <path d="M 50 90 L 15 35 C 10 25 15 15 25 15 L 50 35 L 75 15 C 85 15 90 25 85 35 Z" />
            </svg>
            {/* Plated VIP Badge Tag */}
            <div className="absolute -bottom-[2px] left-1/2 transform -translate-x-1/2 w-[34px] h-[12px] bg-gradient-to-r from-[#C2CBD8] via-[#F6F8FB] to-[#97A3B7] rounded-[3.5px] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] skew-x-[-14deg] border border-white/60">
              <span className="text-[8px] font-[600] text-[#111] italic transform skew-x-[14deg] tracking-tighter">VIP</span>
            </div>
         </div>
         <span className="text-[17px] font-[600] text-[#111] tracking-wide ml-[14px]">美叶</span>
         <svg className="w-[14px] h-[14px] ml-[6px] mt-[2px] text-[#222]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
           <path d="M9 18l6-6-6-6" />
        </svg>
       </div>

       {/* Widget Action */}
       <div className="flex items-center bg-[#FFF4E7] rounded-[24px] pl-[6px] pr-[10px] py-[5px] active:scale-95 transition-transform cursor-pointer">
          <span className="text-[11px] mr-[3px]">🎁</span>
          <span className="text-[10px] font-[600] bg-clip-text text-transparent bg-gradient-to-r from-[#FF5138] to-[#FF9334] tracking-wider leading-none relative top-[1px]">福利中心</span>
       </div>
     </div>

     {/* Promote Premium Banner VIP */}
     <div className="mx-[18px] mt-[22px] rounded-[12px] bg-gradient-to-r from-[#4E5BFF] to-[#8031EC] px-4 py-[14px] flex items-center justify-center shadow-[0_4px_16px_rgba(79,89,254,0.35)] shadow-[#4F59FE]/30 relative overflow-hidden active:scale-95 transition-transform cursor-pointer">
        <svg viewBox="0 0 100 100" width="22" height="22" className="mr-[6px] mt-[1px]">
           <defs>
              <linearGradient id="vipS" x1="0" y1="0" x2="1" y2="1">
                 <stop offset="0%" stopColor="#AEE9FF" />
                 <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
           </defs>
           <path d="M 50 10 L 85 40 L 50 90 L 15 40 Z" fill="url(#vipS)" />
           {/* Inner glow motif */}
           <path d="M 50 20 L 75 42 L 50 80 L 25 42 Z" fill="#FFFFFF" opacity="0.4" />
        </svg>
        <span className="text-[14px] font-normal text-white tracking-widest relative z-10 left-[2px] mt-[1px]">开通VIP，享高阶权益</span>
        <svg className="w-[14px] h-[14px] ml-[6px] text-white relative z-10 opacity-70 mt-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
           <path d="M9 18l6-6-6-6" />
        </svg>
     </div>
     
     {/* App Context Action Modules */}
     <div className="mx-[18px] mt-[16px] rounded-[16px] border-[1.5px] border-[#EDEEF2] flex overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.015)] bg-[#FDFDFE]">
        <div className="flex-1 flex flex-col items-center justify-center py-[18px] bg-white active:bg-gray-50 transition-colors cursor-pointer">
           <div className="relative">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="#3B4DF5">
                <path d="M4 4h6l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
             </svg>
             <div className="absolute top-[3px] right-[-4px] bg-white rounded-full p-[1px]">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="#3B4DF5"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>
             </div>
           </div>
           <span className="text-[12.5px] text-[#111] font-[500] tracking-wider mt-[12px]">我的作品</span>
        </div>
        <div className="w-[1.5px] bg-[#EEF0F3] my-[14px]" />
        <div className="flex-1 flex flex-col items-center justify-center py-[18px] bg-white active:bg-gray-50 transition-colors cursor-pointer">
           {/* Bot Head SVG Icon Component */}
           <div className="w-[20px] h-[20px] bg-[#3B4DF5] rounded-full flex items-center justify-center -mt-[2px] mb-[2px]">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 12l-4 4-4-4"/></svg>
           </div>
           <span className="text-[12.5px] text-[#111] font-[500] tracking-wider mt-[12px]">我的智能体</span>
        </div>
     </div>

  </div>
);

const ChatHistoryArea = () => (
  <div className="flex flex-col mt-[28px] h-full">
    {/* Dynamic Tab Sub Header Filters */}
    <div className="flex justify-between items-end relative px-5 z-10 pb-[6px] shrink-0 w-full">
      <div className="flex items-center space-x-[22px] w-full mix-blend-multiply">
        <div className="flex flex-col items-center relative cursor-pointer">
           <span className="text-[14.5px] font-[600] text-[#111] tracking-wide pb-[4px]">最近对话</span>
           <div className="absolute bottom-[-10px] w-[20px] h-[3.5px] bg-[#111] rounded-full" />
        </div>
        <div className="flex flex-col items-center cursor-pointer">
           <span className="text-[13.5px] font-[500] text-[#697284] tracking-wide pb-[4px]">最近智能体</span>
        </div>
      </div>
      <span className="text-[13px] font-[500] text-[#3B4CF3] absolute right-[20px] pb-[4px] cursor-pointer active:opacity-70 transition-opacity">编辑</span>
    </div>

    {/* Scrollable Chat Feed Sequence */}
    <div className="px-5 pt-[22px] pb-[40px] flex flex-col space-y-[12px] bg-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
       {historyItems.map((item, i) => (
         <div key={i} className="bg-white rounded-[16px] px-[18px] pt-[18px] pb-[16px] flex flex-col border-[1.5px] border-[#EBECF1] shadow-[0_2px_8px_rgba(0,0,0,0.015)] active:scale-[0.98] transition-all cursor-pointer">
           <div className="text-[13.5px] font-bold tracking-wide text-[#111] leading-[1.6] line-clamp-2 pr-[5px]">
             {item.title}
           </div>
           <div className="flex justify-between items-center mt-[14px]">
             <span className="text-[12px] font-[400] text-[#A6ADB8] tracking-widest">{item.agent}</span>
             <span className="text-[11px] font-[400] text-[#B8BED0] font-mono tracking-tighter">{item.time}</span>
           </div>
         </div>
       ))}
    </div>

  </div>
);

const ZhipuAppSlideDrawer: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-black overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- HARD STATUS BAR (Z-50 FRONT OVER ALL) ---------------- */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none mix-blend-exclusion filter invert">
        <div className="text-[13.5px] font-[600] text-white tracking-tight mt-0.5 mix-blend-normal">
          18:13
        </div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-white">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="white">
             <rect x="0" y="7" width="3" height="4" rx="1" />
             <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
             <rect x="9" y="2" width="3" height="9" rx="1" />
             <rect x="13.5" y="0" width="3" height="11" rx="1" />
          </svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" />
             <path d="M4 7C6.5 5.2 9.5 5.2 12 7" />
             <path d="M7 9.5C7.8 9 8.2 9 9 9.5" />
          </svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none">
             <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="white" strokeWidth="1" />
             <rect x="2" y="2" width="18" height="8" rx="1.5" fill="white" />
             <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ---------------- BACKGROUND PARENT APP MOCK LAYER ---------------- */}
      <div className="absolute inset-0 bg-[#F4F5F8] z-0 flex flex-col items-end pr-3 pt-[110px] space-y-5 pointer-events-none">
         <div className="w-[130px] h-[110px] bg-[#E1F1ED] rounded-[16px] shadow-sm transform translate-x-[20px]" />
         <div className="w-[130px] h-[110px] bg-[#E8EAEF] rounded-[16px] shadow-sm transform translate-x-[20px]" />
         <div className="w-[130px] h-[110px] bg-[#FFF2E6] rounded-[16px] shadow-sm transform translate-x-[20px]" />
         <div className="absolute bottom-16 right-4 w-[56px] h-[56px] bg-[#D4D6DD] rounded-full flex items-center justify-center opacity-80 shadow-md">
            {/* mock center dot icon */}
            <div className="w-[20px] h-[20px] rounded-full border-[2.5px] border-[#666]" />
         </div>
      </div>

      {/* ---------------- ACTIVE MASK DIMMING ---------------- */}
      <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none transition-opacity" />

      {/* ---------------- FOREGROUND ACTIVE DRAWER SHEET ---------------- */}
      <div className="absolute top-0 left-0 h-full w-[84%] max-w-[340px] bg-white z-20 shadow-[10px_0_40px_rgba(0,0,0,0.15)] flex flex-col rounded-r-[24px] overflow-hidden">
        <TopUserSection />
        <ChatHistoryArea />
        
        {/* iOS Home Indicator Spacer inside Drawer Context */}
        <div className="w-full flex justify-center pb-2 pt-[10px] shrink-0 absolute bottom-1 z-30 pointer-events-none">
          <div className="w-[134px] h-[5px] bg-[#111] rounded-full opacity-90" />
        </div>
      </div>

    </div>
  );
};

export default ZhipuAppSlideDrawer;
