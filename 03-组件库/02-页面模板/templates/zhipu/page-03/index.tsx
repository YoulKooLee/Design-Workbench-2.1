import '../style.css';
import React from 'react';

// Graphic SVG for the glassy 3D shield
const GlassyShieldGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-[124px] h-[124px] drop-shadow-[0_12px_24px_rgba(255,255,255,0.35)] mix-blend-screen">
    <defs>
      <linearGradient id="shieldBg" x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="50%" stopColor="#A8C2FF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="shieldInner" x1="20%" y1="10%" x2="80%" y2="90%">
        <stop offset="0%" stopColor="#0B1CFF" />
        <stop offset="100%" stopColor="#6BCFFF" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Outer glassy rim */}
    <path d="M12,25 C30,10 70,10 88,25 C95,45 75,88 50,95 C25,88 5,45 12,25 Z" fill="url(#shieldBg)" />
    {/* Inner dark blue core */}
    <path d="M22,32 C40,22 60,22 78,32 C82,45 65,78 50,85 C35,78 18,45 22,32 Z" fill="url(#shieldInner)" stroke="#FFFFFF" strokeWidth="2.5" />
    {/* Highlight streak overlay */}
    <path d="M48,34 L45,70" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" filter="url(#glow)" opacity="0.9" />
    <path d="M54,40 L53,55" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" opacity="0.6" />
  </svg>
);

// Spark stars
const Spark = ({ size, color, opacity = 1 }: { size: number, color: string, opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity={opacity}>
     <path d="M12 0C12.5 6.5 17.5 11.5 24 12C17.5 12.5 12.5 17.5 12 24C11.5 17.5 6.5 12.5 0 12C6.5 11.5 11.5 6.5 12 0Z"/>
  </svg>
);

const PlanCard = ({ title, price, duration, oldPrice, isSelected = false }: any) => {
  return (
    <div className={`flex-shrink-0 relative w-[106px] pt-6 pb-[14px] rounded-[12px] border-[1.5px] flex flex-col items-center justify-center ${isSelected ? 'border-[#E4C978] bg-gradient-to-b from-[#FFFDF0] to-[#FCE7BA] shadow-sm' : 'border-[#E8DFCC] bg-white'}`}>
      
      {/* Top Left Red Flag */}
      <div className="absolute top-[-1px] left-[-1px] bg-gradient-to-r from-[#EF5137] to-[#ED3325] rounded-tl-[10px] rounded-br-[10px] px-2 py-[2px] shadow-sm">
        <span className="text-white text-[10px] font-[600] leading-none tracking-wide block">首购特惠</span>
      </div>

      <div className={`text-[13px] font-[600] mt-[2px] mb-[2px] ${isSelected ? 'text-[#5E4211]' : 'text-[#333333]'}`}>{title}</div>
      
      <div className={`flex items-baseline ${isSelected ? 'text-[#5E4211]' : 'text-[#222222]'}`}>
        <span className="text-[12px] font-[600] mr-[1px]">¥</span>
        <span className="text-[26px] font-[600] leading-none tracking-tight">{price}</span>
        <span className={`text-[11px] ml-[2px] font-[400] ${isSelected ? 'text-[#7B591C]' : 'text-[#666666]'}`}>{duration}</span>
      </div>
      
      <div className="text-[10.5px] text-[#A6A6A6] line-through mt-[4px] decoration-[#A6A6A6]/60">
        ¥{oldPrice}
      </div>
    </div>
  );
};

const PrivilegeIcon = ({ iconName, title, subtitle }: any) => {
  return (
    <div className="flex flex-col items-center w-[25%] px-1">
      <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#FEF2DA] to-[#FDE4B3] flex items-center justify-center text-[#B68B35] font-[600] mb-2 shadow-sm">
        {iconName === 'V' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
            <path d="M12 22 L2 7 L12 2 L22 7 Z" />
            <path d="M8 7 L12 16 L16 7" />
          </svg>
        )}
        {iconName === 'HD' && (
          <div className="border-[2px] border-currentColor rounded-[4px] px-1 text-[10px] font-[600] leading-none py-[2px]">HD</div>
        )}
        {iconName === 'HD2' && (
           <div className="relative">
             <div className="border-[2px] border-currentColor rounded-[4px] px-1 text-[10px] font-[600] leading-none py-[2px]">HD</div>
             <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FDE4B3] rounded-full"></div>
           </div>
        )}
        {iconName === 'CAM' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="14" height="12" rx="3"></rect>
            <path d="M22 8l-6 4 6 4V8z"></path>
          </svg>
        )}
      </div>
      <div className="text-[#6D491C] font-[600] text-[11px] text-center mb-1 leading-tight">{title}</div>
      <div className="text-[#BCA37F] text-[9.5px] text-center leading-tight whitespace-nowrap -mx-4 transform scale-95">{subtitle}</div>
    </div>
  );
};

const TableRow = ({ name, vipValue, normalValue, isSectionHead = false }: any) => (
  <div className={`flex items-stretch border-b border-[#EADDD1]/60 min-h-[46px] last:border-b-0`}>
    <div className={`flex-1 bg-[#FCF8F2] flex items-center px-4 ${isSectionHead ? 'text-[#7D5B2A] font-[600] text-[12px]' : 'text-[#444] text-[12px] font-[400]'}`}>
      {name}
    </div>
    <div className={`w-[84px] bg-[#FCF0D9] flex items-center justify-center border-l border-white/50 ${isSectionHead ? '' : 'font-[600] text-[#AD7F31]'}`}>
      {!isSectionHead && (vipValue === '✓' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      ) : (
        <span className="text-[12px]">{vipValue}</span>
      ))}
    </div>
    <div className="w-[84px] bg-[#FCF8F2] flex items-center justify-center border-l border-white/50 text-[#888] text-[12px] font-[400]">
      {!isSectionHead && normalValue}
    </div>
  </div>
);

const ZhipuSubscriptionPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 overflow-hidden bg-white">
      
      {/* Scrollable Container with sticky bottom overlay */}
      <div className="flex-1 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
        
        {/* Deep Purple Header Section */}
        <div className="w-full h-[240px] bg-gradient-to-br from-[#2D16C3] via-[#5D2CED] to-[#AB5DF4] relative pt-12 pb-10 flex flex-col shrink-0">
          {/* Ambient header shapes/glows */}
          <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-[#5D2CED]/30 blur-3xl mix-blend-screen pointer-events-none"></div>
          
          {/* Sparks overlay */}
          <div className="absolute top-[80px] left-[55%] animate-pulse"><Spark size={10} color="#FFFFFF" opacity={0.6} /></div>
          <div className="absolute top-[130px] right-[40%] animate-pulse" style={{ animationDelay: '1s' }}><Spark size={20} color="#FFFFFF" opacity={0.8} /></div>
          <div className="absolute top-[160px] left-[20%] animate-pulse" style={{ animationDelay: '0.5s' }}><Spark size={14} color="#FFFFFF" opacity={0.5} /></div>

          {/* Nav Bar */}
          <div className="absolute top-10 left-0 w-full flex items-center justify-center px-4 z-20">
            <button className="absolute left-3 w-8 h-8 flex items-center justify-center active:opacity-60 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white text-[15.5px] font-[600] tracking-wide">开通会员</span>
          </div>

          {/* Hero Profile Block */}
          <div className="flex items-center px-[22px] mt-10 relative z-10 w-3/4">
            {/* Avatar Container */}
            <div className="relative w-[56px] h-[56px] shrink-0">
              <div className="w-full h-full rounded-full border-[1.5px] border-white/90 bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.15)] overflow-hidden">
                <svg viewBox="0 0 40 40" className="w-[30px] h-[30px] translate-y-[-1px]">
                  <path d="M20,30 C20,30 17,22 9,20 C2,16 6,8 20,5 C34,8 38,16 31,20 C23,22 20,30 20,30 Z" fill="url(#leafGradVIP)" />
                  <defs>
                    <linearGradient id="leafGradVIP" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#FFAA15" />
                      <stop offset="100%" stopColor="#FF6B00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="absolute -bottom-[2px] right-[-2px] bg-gradient-to-b from-[#F2F4F7] via-[#D5D8E0] to-[#B0B6C2] rounded-sm px-[5px] py-[1.5px] shadow-sm transform -skew-x-[8deg] border-[0.5px] border-white/50 flex items-center justify-center">
                <span className="text-[10px] font-[600] italic text-[#393D45] tracking-widest leading-none" style={{ fontFamily: 'Arial, sans-serif' }}>VIP</span>
              </div>
            </div>

            <div className="ml-4 flex flex-col justify-center">
              <div className="text-white font-[600] text-[16px] tracking-wide leading-tight">美叶</div>
              
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-[11.5px] text-white font-[400]">非会员</span>
                <button className="bg-black/25 backdrop-blur-sm rounded-full px-[8px] py-[2.5px] flex items-center">
                  <span className="text-[10px] text-white font-[400]">管理自动续费</span>
                  <svg className="w-3 h-3 ml-[1px] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Floating 3D Graphic */}
          <div className="absolute right-[22px] top-[74px] animate-pulse glow-hover pointer-events-none">
            <GlassyShieldGraphic />
          </div>
        </div>

        {/* Top Status Bar Elements (absolute over the purple area for precision) */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-[14px] z-50 pointer-events-none">
          <div className="text-[13.5px] font-[500] text-white tracking-tight mt-0.5">
            18:14
          </div>
          <div className="flex items-center space-x-[5px]">
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

        {/* White Content Sheet pulling up over banner */}
        <div className="bg-white rounded-t-[18px] relative -mt-[14px] z-20 w-full pt-5 pb-32">
          
          {/* Horizontal Plans List */}
          <div className="flex overflow-x-auto px-4 space-x-[10px] pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <PlanCard title="连续包月" price="19" duration="首月" oldPrice="39" isSelected={true} />
            <PlanCard title="连续包季" price="79" duration="首季" oldPrice="109" isSelected={false} />
            <PlanCard title="季卡" price="109" duration="" oldPrice="139" isSelected={false} />
            <PlanCard title="连续包年" price="298" duration="首年" oldPrice="398" isSelected={false} />
          </div>

          {/* Pricing Hint Text */}
          <div className="px-[18px]">
             <p className="text-[#999999] text-[11px] leading-relaxed tracking-wide">
               次月以<span className="text-[#436EF3] mx-[1px]">39</span>元/月续费，可随时取消自动续费；首购特惠每个账号仅可享受一次
             </p>
          </div>

          {/* Section Divider - Privileges */}
          <div className="flex items-center justify-center mt-7 mb-6">
             <div className="h-px w-[50px] bg-gradient-to-r from-transparent to-[#DCC79E]"></div>
             <span className="text-[#98702F] font-[600] text-[12.5px] mx-[14px] tracking-widest">尊贵会员权益</span>
             <div className="h-px w-[50px] bg-gradient-to-l from-transparent to-[#DCC79E]"></div>
          </div>

          {/* 4 Privileges Icons */}
          <div className="flex justify-between px-[14px]">
             <PrivilegeIcon iconName="V" title="尊贵标识" subtitle="VIP钻石戴起来" />
             <PrivilegeIcon iconName="HD" title="清影加速" subtitle="加速视频生成" />
             <PrivilegeIcon iconName="HD2" title="高清重绘" subtitle="AI绘画更高清" />
             <PrivilegeIcon iconName="CAM" title="视频通话" subtitle="与小智快乐聊" />
          </div>

          {/* Comparison Table */}
          <div className="mx-[14px] mt-8 rounded-[12px] overflow-hidden border-[1px] border-[#F2E5D0] shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col">
            {/* Header */}
             <div className="flex bg-[#FDF5DF] h-[46px] items-center border-b border-[#F4EADA]/60">
                <div className="flex-1 px-4 text-[#7A5826] font-[600] text-[12.5px]">权益对比</div>
                <div className="w-[84px] text-center text-[#9E732E] font-[600] text-[12.5px] border-l border-white/50">VIP</div>
                <div className="w-[84px] text-center text-[#555] font-[600] text-[12.5px] border-l border-white/50">非会员</div>
             </div>
             
             {/* Rows */}
             <TableRow name="模型能力" isSectionHead={true} />
             <TableRow name="模型&功能抢先体验" vipValue="✓" normalValue="—" />
             <TableRow name="视频通话时长" vipValue="✓" normalValue="限次" />
             <TableRow name="云知识库空间" vipValue="1GB" normalValue="100MB" />
             <TableRow name="高峰期优速通" vipValue="✓" normalValue="—" />
             <TableRow name="清影生视频权益" isSectionHead={true} />
             <TableRow name="高清AI生成" vipValue="✓" normalValue="—" />
          </div>

        </div>

      </div>

      {/* Fixed Bottom Action Panel */}
      <div className="absolute bottom-0 left-0 w-full bg-white pt-2 pb-6 px-[20px] rounded-t-[20px] shadow-[0_-4px_16px_rgba(0,0,0,0.03)] z-50">
        
        {/* Main CTA */}
        <button className="w-full h-[48px] bg-gradient-to-r from-[#FDE8AE] to-[#FCD98B] rounded-full text-[#4E3400] font-[600] text-[14.5px] tracking-wide active:scale-[0.99] transition-transform shadow-sm">
          开通会员
        </button>

        {/* Agreement Checkbox */}
        <div className="flex flex-row items-start mt-[14px] px-1 group cursor-pointer">
           <div className="mt-[2.5px] w-[14px] h-[14px] rounded-full border-[1px] border-[#D0D0D0] flex-shrink-0 flex items-center justify-center mr-[6px] group-active:bg-gray-100"></div>
           <span className="text-[10.5px] text-[#A0A0A0] leading-[1.6]">
             我已阅读并同意本平台
             <span className="text-[#333333]">《会员服务协议》《自动扣费协议》</span>，
             虚拟商品一经支付不支持退款
           </span>
        </div>
        
        {/* Home Indicator Spacing */}
        <div className="w-full flex justify-center mt-6">
          <div className="w-[134px] h-[5px] bg-[#121212] rounded-full" />
        </div>

      </div>

    </div>
  );
};

export default ZhipuSubscriptionPage;
