/**
 * @name 空白订单页 (Empty Order State Page)
 */
import React from 'react';
import './style.css';

export default function JDEmptyOrderState() {
  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] flex flex-col font-sans select-none overflow-x-hidden relative">
      
      {/* Header */}
      <div className="w-full pt-[52px] pb-3 bg-white flex items-center justify-center relative sticky top-0 z-50">
         
         {/* Back Arrow */}
         <div className="absolute left-4 cursor-pointer">
            <svg className="w-[22px] h-[22px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>

         {/* Center Tabs */}
         <div className="flex space-x-8 items-center h-full">
             <div className="text-[17px] text-gray-400 font-medium cursor-pointer transition-colors active:text-gray-600">
                 话费订单
             </div>
             <div className="text-[17px] text-black font-bold relative cursor-pointer flex flex-col items-center">
                 会员订单
                 <div className="absolute -bottom-[8px] w-5 h-1 bg-[#ea3d33] rounded-full"></div>
             </div>
         </div>
      </div>

      {/* Main Empty State Content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-[15vh]">
          
          {/* Illustration Container */}
          <div className="relative w-[180px] h-[180px] flex items-end justify-center mb-6">
              
              {/* Pink Bubble Background */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[140px] h-[140px] bg-gradient-to-br from-[#fde6e5] to-[#fce0df] rounded-full shadow-[inset_-4px_-4px_10px_rgba(255,200,200,0.3)] z-0" style={{borderBottomRightRadius: '10%'}}>
                  
                  {/* Three dots ... */}
                  <div className="absolute top-[35px] left-1/2 transform -translate-x-1/2 flex space-x-2">
                     <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                     <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
                     <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                  </div>
              </div>

              {/* Small floating bubble top right */}
              <div className="absolute top-0 right-1 w-[14px] h-[14px] bg-gradient-to-br from-[#fccecc] to-[#ffbaba] rounded-full shadow-sm z-0 flex items-center justify-center">
                 <div className="w-1 h-1 bg-white rounded-full opacity-80"></div>
              </div>

              {/* The JD Dog Mock Built With CSS Arrays */}
              <div className="relative z-10 w-[80px] h-[100px] flex flex-col items-center">
                  
                  {/* Dog Head */}
                  <div className="w-[66px] h-[52px] bg-white rounded-[24px/20px] shadow-[0_2px_10px_rgba(200,100,100,0.15)] flex flex-col items-center relative z-20 top-2">
                      
                      {/* Ears */}
                      <div className="absolute -left-3 top-[10px] w-5 h-8 bg-white rounded-[50%] transform -rotate-[30deg] shadow-[-2px_2px_4px_rgba(200,100,100,0.1)] z-[-1] origin-top-right"></div>
                      <div className="absolute -right-3 top-[10px] w-5 h-8 bg-white rounded-[50%] transform rotate-[30deg] shadow-[2px_2px_4px_rgba(200,100,100,0.1)] z-[-1] origin-top-left"></div>

                      {/* Eyes (> <) */}
                      <div className="flex space-x-4 mt-[16px]">
                          <svg width="12" height="10" viewBox="0 0 12 10" className="opacity-90">
                              <path d="M 2 2 L 10 5 L 2 8" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <svg width="12" height="10" viewBox="0 0 12 10" className="opacity-90">
                              <path d="M 10 2 L 2 5 L 10 8" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      </div>

                      {/* Nose */}
                      <div className="w-2.5 h-1.5 bg-black rounded-[50%] mt-1"></div>

                      {/* Mouth (Open Red yelling mouth) */}
                      <div className="w-4 h-5 bg-[#eb3d30] rounded-b-full mt-0.5 relative overflow-hidden shadow-inner">
                         {/* Tongue shadow mock */}
                         <div className="absolute bottom-0 w-full h-[6px] bg-[#c52c22] rounded-b-full"></div>
                      </div>
                  </div>

                  {/* Red Collar */}
                  <div className="w-[30px] h-[6px] bg-[#eb3d30] rounded-full z-10 -mt-[2px] shadow-sm relative"></div>

                  {/* Dog Body */}
                  <div className="w-[36px] h-[40px] bg-gradient-to-b from-white to-gray-50 rounded-b-[18px] rounded-t-[10px] z-0 -mt-1 shadow-[0_2px_4px_rgba(0,0,0,0.05)] relative flex items-end justify-center pb-1">
                      {/* Legs split illusion (line) */}
                      <div className="w-[1px] h-3 bg-gray-200"></div>
                  </div>

                  {/* Arms (Up) */}
                  <div className="absolute top-[52px] -left-2 w-[18px] h-8 bg-white rounded-full transform rotate-[40deg] shadow-[-2px_2px_4px_rgba(0,0,0,0.05)] z-[-1]"></div>
                  <div className="absolute top-[52px] -right-2 w-[18px] h-8 bg-white rounded-full transform -rotate-[40deg] shadow-[2px_2px_4px_rgba(0,0,0,0.05)] z-[-1]"></div>
                  
                  {/* Paws */}
                  <div className="absolute top-[48px] -left-[14px] w-5 h-5 bg-[#ffefef] rounded-full opacity-80 z-[-2]"></div>
                  <div className="absolute top-[48px] -right-[14px] w-5 h-5 bg-[#ffefef] rounded-full opacity-80 z-[-2]"></div>
              </div>

              {/* Shadow Base */}
              <div className="absolute bottom-0 w-[120px] h-[10px] bg-black/5 rounded-[50%] blur-[2px]"></div>
          </div>

          {/* Text */}
          <span className="text-[15px] font-sans text-gray-500 tracking-wide">
             还没有充值记录
          </span>

      </div>

    </div>
  );
}
