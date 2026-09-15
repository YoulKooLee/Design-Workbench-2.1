/**
 * @name 白金合伙人弹出层 (Platinum Partner Action Modal)
 */
import React from 'react';
import './style.css';

export default function JDPlatinumModal() {
  return (
    <div className="w-full h-screen font-sans select-none flex flex-col justify-end relative z-0 overflow-hidden bg-[#2a241f]">
      
      {/* 
        ========================================================================
         BACKGROUND CONTEXT: Abstract fake shapes simulating the blurred background
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 opacity-40">
          <div className="w-[130px] h-[160px] bg-white opacity-80 rounded-[45%_60%_40%_50%] absolute bottom/[20%] right-[30%] transform rotate-[10deg] filter blur-md"></div>
          <div className="w-[45px] h-[35px] bg-[#ff9900] rounded-[20px_30px_15px_25px] absolute bottom-[35%] right-[55%] transform rotate-[-20deg] filter blur-[2px]"></div>
      </div>
      
      {/* Dimmed Overlay strictly matching dark-modal-context */}
      <div className="absolute inset-0 dark-modal-context z-10 transition-opacity duration-300"></div>

      {/* 
        ========================================================================
         BOTTOM SHEET MODAL SURFACE
        ========================================================================
      */}
      <div className="w-full css-modal-card pt-6 pb-[35px] px-[20px] relative z-20 flex flex-col items-center">
          
          {/* Top Right Close Button */}
          <div className="absolute top-[18px] right-[18px] text-gray-300 cursor-pointer active:opacity-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </div>

          {/* Core Title Matrix */}
          <div className="flex items-baseline mt-[25px] mb-[10px]">
              <span className="text-[28px] font-black tracking-tight text-[#111]">白金合伙人</span>
              <span className="text-[28px] font-black tracking-tight text-[#8f0f0f] ml-[6px]">天天领红包</span>
          </div>
          
          <p className="text-[14px] text-gray-500 tracking-widest mb-[35px] font-medium">
              仅差一步 加入我们享特权
          </p>

          {/* 
            ====================================================================
             STEPPER TASK COMPONENT
            ====================================================================
          */}
          <div className="w-[96%] relative ml-2 pr-2">
              
              {/* Connecting Background Line */}
              <div className="absolute top-[24px] bottom-[50px] left-[9px] w-px bg-[#fbcaca]"></div>
              
              {/* TASK 1: Activated/Completed */}
              <div className="flex mb-[15px] relative z-10">
                  {/* Status Node */}
                  <div className="w-[18px] h-[18px] bg-white rounded-full flex justify-center items-center mt-[20px] ml-[1px]">
                      <div className="w-[14px] h-[14px] bg-[#f04a4b] rounded-full flex justify-center items-center shadow-[0_2px_4px_rgba(240,74,75,0.4)]">
                          <svg className="w-[9px] h-[9px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                      </div>
                  </div>
                  
                  {/* Content Board */}
                  <div className="flex-1 ml-[18px] bg-[#fff2f2] rounded-[10px] p-[16px] relative overflow-hidden shadow-[0_2px_8px_rgba(255,200,200,0.3)]">
                      <div className="flex items-center mb-[4px]">
                          {/* Mini Document Icon */}
                          <div className="w-[12px] h-[14px] bg-[#f04a4b] rounded-[2px_4px_2px_2px] flex justify-center items-center mr-2 shadow-sm overflow-hidden relative">
                              <span className="text-[6px] text-white font-bold scale-[0.6] absolute bottom-px">白条</span>
                          </div>
                          <span className="text-[17px] font-bold text-[#111] tracking-widest">白条激活</span>
                      </div>
                      <p className="text-[13px] text-gray-500 tracking-wider">先消费后还款，按时还款0利息</p>
                      
                      {/* Watermark completed stamp */}
                      <div className="css-stamp stamp-completed">已完成</div>
                  </div>
              </div>

              {/* TASK 2: Unfinished */}
              <div className="flex mb-[25px] relative z-10">
                  {/* Status Node */}
                  <div className="w-[18px] h-[18px] bg-white rounded-full flex justify-center items-center mt-[20px] ml-[1px]">
                      <div className="w-[14px] h-[14px] border-[2px] border-gray-300 rounded-full bg-white shadow-sm"></div>
                  </div>
                  
                  {/* Content Board */}
                  <div className="flex-1 ml-[18px] bg-[#f8f9fa] rounded-[10px] p-[16px] relative overflow-hidden border border-white">
                      <div className="flex items-center mb-[4px]">
                          {/* Mini Wallet/Coin Bag Icon */}
                          <div className="w-[14px] h-[14px] bg-[#fca156] rounded-[4px_4px_6px_6px] mr-2 relative overflow-hidden">
                              <div className="absolute top-[-2px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-[2px] bg-white rounded-md"></div>
                          </div>
                          <span className="text-[17px] font-bold text-[#111] tracking-widest">小金库攒钱</span>
                      </div>
                      <p className="text-[13px] text-gray-400 tracking-wider">攒钱天天正收益，月月安心还白条</p>

                      {/* Watermark unfinished stamp */}
                      <div className="css-stamp stamp-unfinished">未完成</div>
                  </div>
              </div>

          </div>

          {/* 
            ====================================================================
             CALL TO ACTION METRICS
            ====================================================================
          */}
          <div className="w-[96%] relative mt-2 mb-1">
              {/* Informative pointer bubble */}
              <div className="css-red-bubble">领2.53元红包</div>
              
              {/* Core Button Area */}
              <div className="w-full bg-[#f04a4b] text-white text-[18px] font-bold tracking-widest py-[15px] rounded-full text-center shadow-[0_6px_15px_rgba(240,74,75,0.35)] cursor-pointer relative overflow-visible transition active:scale-[0.98]">
                  立即攒0.01元到小金库
                  
                  {/* The interactive ripple ring and click hand */}
                  <div className="css-ripple-ring"></div>
                  <div className="css-hand-pointer absolute right-[18px] top-[10px] rotate-[25deg] border-b-2 border-white/50"></div>
              </div>
          </div>

          {/* Legal Compliance & Disclaimer */}
          <div className="w-[96%] flex items-start mt-[20px] px-1 cursor-pointer">
              <div className="w-[16px] h-[16px] rounded-full border-[1.5px] border-[#f04a4b] mt-[2px] flex-shrink-0 cursor-pointer transition flex justify-center items-center">
                  {/* Empty state simulating un-ticked verification */}
              </div>
              <p className="text-[11px] text-gray-400 leading-[1.6] ml-[6px] tracking-widest text-justify">
                  我已同意从工商银行(7717)转入，知晓小金库底层为货币基金 东方红货币D。确认本人已阅读
                  <span className="text-[#333] font-bold mx-px">《相关协议》</span>，
                  基金销售服务由京东肯特瑞提供。
              </p>
          </div>

      </div>

    </div>
  );
}
