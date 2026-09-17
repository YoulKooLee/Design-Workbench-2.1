/**
 * @name 车险免息券权益详情页 (page-57)
 */
import React from 'react';
import './style.css';

export default function JDEquityDetails() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* 
        ========================================================================
         TOP DARK HEADER (Navigation + Carousel)
        ========================================================================
      */}
      <div className="dark-equity-header w-full flex flex-col relative z-0 pt-[52px] pb-[60px]">
          
          {/* Nav Topbar */}
          <div className="w-full flex items-center justify-between px-4 mb-[25px]">
              <div className="w-8 flex items-center cursor-pointer active:opacity-60">
                  <svg className="w-[26px] h-[26px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
              </div>
              <div className="w-8 flex items-center justify-end cursor-pointer active:opacity-60">
                  <svg className="w-[28px] h-[28px] text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 12a2 2 0 11-4 0 2 2 0 014 0zM14 12a2 2 0 11-4 0 2 2 0 014 0zM22 12a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
              </div>
          </div>

          {/* Icon Carousel row */}
          {/* Centered with overflow cutting off the active boundaries */}
          <div className="w-full flex justify-center items-end space-x-[25px] relative">
              
              {/* Partials on far left (Hidden on normal screens but positioned) */}
              <div className="flex flex-col items-center absolute left-[-60px] opacity-40">
                  <div className="equity-icon-idle"><div className="equity-icon-symbol-idle text-[14px] font-bold">币</div></div>
              </div>

              {/* Inactive Item: 财运券 */}
              <div className="flex flex-col items-center mb-1 cursor-pointer transform -translate-x-[10px]">
                  <div className="equity-icon-idle transition-transform active:scale-95">
                      <div className="equity-icon-symbol-idle">
                          <span className="text-[12px] font-black rotate-[-5deg]">¥</span>
                      </div>
                  </div>
                  <span className="text-[#a08a7a] text-[13px] font-medium tracking-widest mt-2 scale-90">财运券</span>
              </div>

              {/* ACTIVE ITEM: 车险免息券 */}
              <div className="flex flex-col items-center relative z-10 cursor-pointer">
                  <div className="equity-icon-active transition-transform active:scale-95 outline outline-[1px] outline-offset-[-2px] outline-[#fbd6ac]/30">
                      <div className="equity-icon-symbol-active">
                          {/* Mini Car Icon */}
                          <svg className="w-4 h-4 ml-[1px]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-6zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                          </svg>
                      </div>
                  </div>
                  <span className="text-[#eee3da] text-[15px] font-bold tracking-widest mt-[5px]">车险免息券</span>
                  <span className="text-[#846b5a] text-[10px] tracking-widest leading-none mt-1 scale-90">车险投保专属</span>
              </div>

              {/* Inactive Item: 账户险 */}
              <div className="flex flex-col items-center mb-1 cursor-pointer transform translate-x-[10px]">
                  <div className="equity-icon-idle transition-transform active:scale-95">
                      <div className="equity-icon-symbol-idle">
                          <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                          </svg>
                      </div>
                  </div>
                  <span className="text-[#a08a7a] text-[13px] font-medium tracking-widest mt-2 scale-90">账户险</span>
              </div>

              {/* Partials on far right */}
              <div className="flex flex-col items-center absolute right-[-60px] opacity-40">
                  <div className="equity-icon-idle"><div className="equity-icon-symbol-idle text-[14px] font-bold">收</div></div>
              </div>

          </div>

      </div>


      {/* 
        ========================================================================
         WHITE BODY OVERLAP BANNER
        ========================================================================
      */}
      <div className="relative z-10 w-full mt-[-35px]">
          
          <div className="equity-hero-banner rounded-t-[25px] flex justify-between items-center px-[25px] py-[25px] min-h-[105px]">
              {/* Massive Watermark */}
              <div className="watermark-text select-none pointer-events-none">EQUITY</div>
              
              {/* Left Side Info */}
              <div className="flex flex-col relative z-20">
                  <div className="flex items-center">
                      <h1 className="text-[26px] font-black text-[#111] tracking-wider font-sans">车险免息券</h1>
                      {/* Lock Pill */}
                      <div className="bg-[#fcf0e3] border border-[#f5decc] rounded-[4px] px-1.5 py-0.5 flex items-center ml-2">
                          <svg className="w-2.5 h-2.5 text-[#e5a06c] mr-[2px]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#d88950] text-[10px] font-bold scale-90 origin-left">未解锁</span>
                      </div>
                  </div>
                  <span className="text-[#d48252] text-[14px] font-medium tracking-widest mt-0.5">12期免息</span>
              </div>

              {/* Right Side Button */}
              <div className="relative z-20">
                  <div className="btn-upgrade-pill text-white font-bold text-[14px] tracking-widest px-[24px] py-[8px] rounded-full cursor-pointer active:scale-95 transition-transform">
                      去升级
                  </div>
              </div>
          </div>
      </div>


      {/* 
        ========================================================================
         CONTENT RULES & DESCRIPTION LISTS
        ========================================================================
      */}
      <div className="px-[25px] pt-[20px] pb-[60px] bg-white flex flex-col items-start w-full z-10">
          
          {/* SECTION 1: Level Rules */}
          <h2 className="section-title text-[18px] font-bold text-[#111] tracking-widest mb-[22px]">
              等级领取规则
          </h2>

          <div className="flex flex-col w-full space-y-[18px] mb-[38px]">
              <div className="flex items-center">
                  <span className="lv-badge lv-dark w-[40px] h-[20px]">Lv.6</span>
                  <span className="ml-[12px] text-[#444] text-[14px] tracking-widest font-medium">车险12期免息</span>
              </div>
              <div className="flex items-center">
                  <span className="lv-badge lv-dark w-[40px] h-[20px]">Lv.5</span>
                  <span className="ml-[12px] text-[#444] text-[14px] tracking-widest font-medium">车险12期免息</span>
              </div>
              <div className="flex items-center">
                  <span className="lv-badge lv-mid w-[40px] h-[20px]">Lv.4</span>
                  <span className="ml-[12px] text-[#444] text-[14px] tracking-widest font-medium">车险12期免息</span>
              </div>
              <div className="flex items-center">
                  <span className="lv-badge lv-mid w-[40px] h-[20px]">Lv.3</span>
                  <span className="ml-[12px] text-[#444] text-[14px] tracking-widest font-medium">车险12期免息</span>
              </div>
              <div className="flex items-center">
                  <span className="lv-badge lv-light w-[40px] h-[20px]">Lv.2</span>
                  <span className="ml-[12px] text-[#444] text-[14px] tracking-widest font-medium">车险12期免息</span>
              </div>
              <div className="flex items-center">
                  <span className="lv-badge lv-light w-[40px] h-[20px]">Lv.1</span>
                  <span className="ml-[12px] text-[#444] text-[14px] tracking-widest font-medium">车险12期免息</span>
              </div>
          </div>

          {/* SECTION 2: Description */}
          <h2 className="section-title text-[18px] font-bold text-[#111] tracking-widest mb-[20px]">
              权益说明
          </h2>

          <div className="w-full flex items-center mb-[14px]">
              <div className="w-[4px] h-[4px] bg-[#665] rounded-full mr-1.5"></div>
              <span className="text-[15px] font-bold text-[#222] tracking-widest">使用流程</span>
          </div>

          <div className="w-full pl-[5px] flex flex-col space-y-[10px] text-[#666] text-[14px] leading-[1.65] font-medium tracking-wide mb-[30px]">
              <p>1、领取权益后点击去使用，跳转至京东金融平台车险页面。</p>
              <p>2、输入车辆信息，点击报价即可一键得12家保险公司报价，报价成功后可下单使用白条支付享分期免息。</p>
              <p>3、京东金融App-我的-优惠券查看领取到账的免息券，点击去使用进行车险频道页面进行投保。</p>
          </div>

          <div className="w-full flex items-center mb-[14px]">
              <div className="w-[4px] h-[4px] bg-[#665] rounded-full mr-1.5"></div>
              <span className="text-[15px] font-bold text-[#222] tracking-widest">使用说明</span>
          </div>

          {/* Faint cutoff text simulating scroll overflow */}
          <div className="w-full pl-[5px] flex flex-col space-y-[10px] text-[#666] text-[14px] leading-[1.6] font-medium tracking-wide pb-4">
              <p className="opacity-40 line-clamp-1">1、同一用户每月仅限领取1张车险免息券</p>
          </div>

      </div>

    </div>
  );
}
