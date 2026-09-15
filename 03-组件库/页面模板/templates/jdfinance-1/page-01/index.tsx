/**
 * @name 京东金融启动页
 */
import React from 'react';
import './style.css';

export default function JDFinanceSplash() {
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen bg-white relative overflow-hidden font-sans select-none">
      
      {/* 极弱的右上角背景光晕 (Very faint top-right glow) */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-60"></div>
      
      {/* Center Content Section */}
      <div className="flex-1 w-full flex flex-col items-center justify-center -mt-20">
        
        {/* JD Dog Avatar container (Placeholder for 3D graphic) */}
        <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
          {/* Main Red Bubble Background */}
          <div className="relative w-40 h-40 bg-[#e2231a] rounded-full flex flex-col items-center justify-end overflow-hidden shadow-sm">
             {/* Dog Face Base */}
             <div className="w-[110%] h-[75%] bg-white rounded-t-[50%] absolute bottom-0 shadow-inner"></div>
             {/* Dog Ears (Left & Right) */}
             <div className="absolute top-[35%] -left-3 w-12 h-8 bg-white rounded-[50%] -rotate-[30deg]"></div>
             <div className="absolute top-[35%] -right-3 w-12 h-8 bg-white rounded-[50%] rotate-[30deg]"></div>
             
             {/* Eyes */}
             <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <div className="mt-8 flex space-x-6">
                   <div className="w-[10px] h-[14px] bg-black rounded-[50%]"></div>
                   <div className="w-[10px] h-[14px] bg-black rounded-[50%]"></div>
                </div>
             </div>
             {/* Nose */}
             <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <div className="w-[18px] h-[12px] bg-black rounded-[50%] mt-20"></div>
             </div>
             {/* Smile/Mouth */}
             <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <div className="w-[60px] h-[16px] border-b-[3px] border-black rounded-[50%] mt-28"></div>
             </div>
             {/* Red Collar */}
             <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <div className="w-[80px] h-[12px] bg-[#e2231a] rounded-[50%] mt-36 shadow-sm"></div>
             </div>
          </div>
          
          {/* Small tail/speech bubble pointer piece at the bottom left */}
          <div className="absolute bottom-2 left-6 w-8 h-8 bg-[#e2231a] rotate-45 rounded-sm -z-10"></div>
          {/* Dog Paw (Bottom Left waving) */}
          <div className="absolute bottom-4 left-3 w-12 h-7 bg-white rounded-[50%] rotate-12 shadow-sm"></div>
        </div>

        {/* Cursive Text "简单·快捷·安全" */}
        <div className="relative flex flex-col items-center mt-2">
          {/* Using a font stack that targets system script fonts, falling back to cursive */}
          <div 
            className="text-[#e2231a] text-[40px] tracking-[0.2em] italic font-bold" 
            style={{ fontFamily: '"STXingkai", "Xingkai SC", "HuaXingKai", "Kaiti", "KaiTi_GB2312", cursive' }}
          >
            简单·快捷·安全
          </div>
          {/* Underline decorative glow */}
          <div className="w-[85%] h-[2px] bg-gradient-to-r from-transparent via-red-200 to-transparent mt-3 blur-[0.5px]"></div>
          <div className="w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#e2231a] to-transparent mt-[1px] opacity-20"></div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full flex flex-col items-center pb-12 z-10">
        
        {/* App Logo & Name */}
        <div className="flex items-center space-x-3 mb-8">
          {/* App Icon Container */}
          <div className="relative w-11 h-11 bg-white border border-[#f0c2a2] rounded-[14px] shadow-sm flex items-center justify-center">
            {/* Inner mascot representing JD Dog in icon */}
            <div className="w-[30px] h-[22px] bg-gray-100 rounded-[50%] overflow-hidden relative flex flex-col items-center">
               <div className="w-full h-[60%] bg-white rounded-t-[50%] absolute bottom-0 shadow-[0_-1px_2px_rgba(0,0,0,0.05)] border-t border-gray-100"></div>
               {/* Tiny face details */}
               <div className="flex space-x-2 mt-[6px] z-10">
                  <div className="w-[2px] h-[3px] bg-black rounded-full"></div>
                  <div className="w-[2px] h-[3px] bg-black rounded-full"></div>
               </div>
               <div className="w-[18px] h-[4px] border-b-[1px] border-black rounded-[50%] mt-[2px] z-10"></div>
            </div>
            
            {/* Top-right notification dot / coin element commonly in JD icon */}
            <div className="absolute -top-[2px] -right-[2px] w-4 h-4 bg-[#e2231a] rounded-full border-[1.5px] border-white flex items-center justify-center">
               <div className="w-[4px] h-[4px] bg-[#fbdf66] rounded-sm skew-x-6"></div>
            </div>
          </div>
          
          {/* Title Text */}
          <div className="text-[#e2231a] text-[26px] font-[900] tracking-widest font-sans">
            京东金融
          </div>
        </div>

        {/* Network & Record Labels */}
        <div className="flex flex-col items-center space-y-3">
          {/* IPv6 Text */}
          <div className="text-[#999999] text-[11px] font-medium tracking-[0.35em] opacity-80 pl-1">
            京 东 金 融 支 持 IPv6 网 络
          </div>

          {/* Security/Record Text */}
          <div className="flex items-center space-x-[6px] opacity-80">
            {/* Real Shield Icon from screenshot pattern */}
            <svg className="w-3.5 h-3.5 text-[#1F80E0]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.2 1.6l-7 2.8C3.5 4.7 3 5.4 3 6.2v4.8c0 5 3.3 9.7 8.2 11.2.5.1 1.1.1 1.6 0 4.9-1.5 8.2-6.2 8.2-11.2V6.2c0-.8-.5-1.5-1.2-1.8l-7-2.8c-.5-.2-1.1-.2-1.6 0zm-1 6.3h3.5v1.4h-2v1.5h1.7v1.4h-1.7V14h3.1v1.4l-4.6.1V7.9z" />
            </svg>
            <span className="text-[#a3a3a3] text-[10px] font-normal tracking-wide">
              通过移动金融客户端应用软件备案
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
