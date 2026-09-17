/**
 * @name 全部服务 - 首页总览位点 (All Services - Absolute Top)
 */
import React from 'react';
import './style.css';

// Reusable Service Item Component
const ServiceItem = ({ icon, label, badge = null }: { icon: React.ReactNode, label: string, badge?: React.ReactNode }) => (
  <div className="flex flex-col items-center cursor-pointer">
    <div className="w-[36px] h-[36px] flex items-center justify-center relative mb-1.5 align-bottom">
       {icon}
       {badge && (
           <div className="absolute -top-1.5 -right-2 z-10 hidden">
               {badge}
           </div>
       )}
    </div>
    <span className="text-[12px] text-[#333333] font-medium leading-tight whitespace-nowrap">{label}</span>
  </div>
);

// --- Shared Reused Icon Generator Macros ---
const IconJingXiangZu = () => (
    <div className="w-[32px] h-[32px] bg-gradient-to-br from-[#fc7270] to-[#f45c5c] rounded-full flex items-center justify-center relative shadow-sm">
        <span className="text-white text-[14px] font-bold">租</span>
        <div className="absolute bottom-[-1px] right-[-1px] w-[11px] h-[11px] bg-white rounded-full flex items-center justify-center">
            <div className="w-[9px] h-[9px] bg-[#fbafaf] rounded-full flex flex-col items-center justify-center">
                <div className="w-[1px] h-[3px] bg-white ml-[2px] mt-[1px] transform rotate-45"></div>
                <div className="w-[3px] h-[1px] bg-white mt-0"></div>
            </div>
        </div>
    </div>
);

const IconNongHuJieQian = () => (
    <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#fca466] to-[#f68940] rounded-full flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
        <div className="w-[2px] h-[26px] bg-white/40 absolute transform rotate-0"></div>
        <div className="w-[2px] h-[26px] bg-white/40 absolute transform rotate-45"></div>
        <div className="w-[2px] h-[26px] bg-white/40 absolute transform -rotate-45"></div>
        <div className="w-[20px] h-[20px] bg-[#fca466] rounded-full z-10 flex items-center justify-center border border-[#f68940]">
           <span className="text-white text-[12px] font-bold">¥</span>
        </div>
    </div>
);

const IconChuBeiJin = () => (
    <div className="w-[28px] h-[32px] bg-[#fb5a5a] flex items-center justify-center relative shadow-sm" style={{clipPath: 'polygon(50% 0%, 100% 30%, 100% 100%, 0% 100%, 0% 30%)'}}>
       <span className="text-white text-[14px] font-bold mt-1">¥</span>
    </div>
);

const IconJinTiaoJieKuan = () => (
    <div className="w-[26px] h-[32px] bg-gradient-to-b from-[#fca466] to-[#f68940] rounded-sm flex items-center justify-center relative shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-[10px] h-[10px] bg-white transform -rotate-45 translate-x-1.5 -translate-y-1.5 shadow-sm border-l border-b border-[#fbc9a8]"></div>
        <span className="text-white text-[12px] font-bold tracking-widest leading-tight flex flex-col font-sans mt-1">
            <span>金</span>
            <span className="mt-[-2px]">条</span>
        </span>
    </div>
);

const IconBaoXian = () => (
    <div className="w-[30px] h-[34px] bg-[#5382ff] flex items-center justify-center shadow-sm" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
       <span className="text-white text-[14px] font-bold mt-[-2px]">车</span>
    </div>
);

const IconQianDao = () => (
    <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#7693ff] to-[#516ce8] rounded-full flex flex-col items-center justify-center shadow-sm overflow-hidden relative">
        <div className="absolute bottom-0 w-full h-[8px] bg-[#3a52be] flex justify-center space-x-[2px] items-start pt-[1px]">
            <div className="w-[3px] h-[3px] bg-white rounded-full opacity-60"></div>
            <div className="w-[3px] h-[3px] bg-white rounded-full opacity-60"></div>
            <div className="w-[3px] h-[3px] bg-white rounded-full opacity-60"></div>
        </div>
        <span className="text-white text-[13px] font-bold mt-[-5px]">签</span>
    </div>
);

const IconJieQian = () => (
    <div className="w-[26px] h-[30px] bg-gradient-to-b from-[#6b9dff] to-[#4c75f5] rounded-sm flex flex-col items-center justify-center shadow-sm relative border-t-[4px] border-[#9bc1ff]">
        <span className="text-white text-[14px] font-bold tracking-tight">借</span>
    </div>
);

const IconCheDiDai = () => (
    <div className="w-[30px] h-[24px] bg-[#5984f7] rounded-[6px] rounded-b-sm flex items-center justify-center shadow-sm relative overflow-hidden text-center mt-2">
        <div className="w-[20px] h-[10px] bg-[#3755b3] rounded-t-[4px] absolute top-[2px] flex items-center justify-center">
            <span className="text-[7.5px] text-white font-bold leading-none transform scale-90 pl-[0.5px]">贷</span>
        </div>
        <div className="absolute bottom-[2px] left-[4px] w-1.5 h-1.5 bg-[#3755b3] rounded-full"></div>
        <div className="absolute bottom-[2px] right-[4px] w-1.5 h-1.5 bg-[#3755b3] rounded-full"></div>
    </div>
);

const IconQiYeZhuDai = () => (
    <div className="w-[34px] h-[30px] relative flex items-end justify-start mt-1">
        <div className="absolute top-0 right-[2px] w-[22px] h-[26px] bg-[#9bbfff] rounded-sm shadow-sm border border-white"></div>
        <div className="w-[22px] h-[26px] bg-[#5382ff] rounded-sm shadow-[2px_0_4px_rgba(0,0,0,0.1)] z-10 flex items-center justify-center">
            <span className="text-white text-[12px] font-bold relative z-20">企</span>
        </div>
    </div>
);

// --- NEW Icons for Page 21 ---
const IconGaoDuanLiCai = () => (
    <div className="w-[30px] h-[30px] bg-gradient-to-tr from-[#fdb168] to-[#f28639] flex items-center justify-center shadow-sm transform -rotate-45" style={{borderRadius: '50% 50% 50% 10%'}}>
        <div className="w-2.5 h-2.5 bg-white rounded-full transform rotate-45 mb-[6px] mr-[6px] opacity-90 shadow-inner"></div>
    </div>
);

const IconJDXinYuFen = () => (
    <div className="w-[28px] h-[32px] bg-gradient-to-b from-[#fc7270] to-[#f45c5c] shadow-sm flex flex-col items-center justify-center pt-2" style={{clipPath: 'polygon(50% 100%, 100% 80%, 100% 0, 0 0, 0 80%)', borderRadius: '4px'}}>
        <div className="flex space-x-[2px] mb-[2px]">
            <div className="w-[12px] h-[3px] bg-white rounded-full mb-[2px]"></div>
        </div>
        <div className="w-[12px] h-[5px] border-[2px] border-white border-t-0 rounded-b-full"></div>
    </div>
);

const IconXianXiangHouFu = () => (
    <div className="w-[32px] h-[36px] relative flex flex-col items-center shadow-sm mt-1">
        <div className="w-[12px] h-[8px] border-[2.5px] border-[#fc6e6a] border-b-0 rounded-t-full z-0 relative top-[3px]"></div>
        <div className="w-[28px] h-[26px] bg-gradient-to-br from-[#fc7270] to-[#f45c5c] rounded-md z-10 flex items-center justify-center shadow-sm pb-1">
            <div className="w-[10px] h-[4px] border-[2px] border-white border-t-0 rounded-b-full mt-1"></div>
        </div>
    </div>
);

const IconJiJin = () => (
    <div className="w-[30px] h-[30px] bg-gradient-to-br from-[#fc7270] to-[#f45c5c] rounded-md shadow-sm relative flex items-center justify-center overflow-hidden">
        <svg className="w-[20px] h-[20px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
        </svg>
        <div className="absolute right-[4px] top-[7px] w-[5px] h-[5px] bg-white rounded-full"></div>
    </div>
);

const IconBaiTiao = () => (
    <div className="w-[26px] h-[32px] bg-[#fb5958] rounded-sm flex items-center justify-center relative shadow-sm overflow-hidden border border-[#fc8180]">
        <div className="absolute top-0 right-0 w-[10px] h-[10px] bg-white transform -rotate-45 translate-x-1.5 -translate-y-1.5 shadow-sm border-l border-b border-[#fbc9a8]"></div>
        <span className="text-white text-[12px] font-bold tracking-widest leading-tight flex flex-col font-sans mt-1 text-center scale-90">
            <span>白</span>
            <span className="mt-[-2px]">条</span>
        </span>
    </div>
);

const IconBaiTiaoFenFenKa = () => (
    <div className="w-[30px] h-[22px] bg-gradient-to-br from-[#fc7270] to-[#f45c5c] rounded-[4px] flex items-center justify-center shadow-sm border border-[#fb9392] overflow-hidden mt-1 relative">
        <div className="w-[14px] h-[10px] bg-white rounded-full relative flex items-center justify-center transform scale-90">
            <div className="absolute bottom-[-1px] left-[1px] w-[4px] h-[4px] bg-white transform rotate-45"></div>
            <svg className="w-2.5 h-2.5 text-[#f45c5c] z-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        </div>
    </div>
);

const IconFenQiShangCheng = () => (
    <div className="w-[26px] h-[26px] bg-gradient-to-b from-[#fc7270] to-[#f45c5c] rounded-b-md shadow-sm relative flex flex-col pt-[2px] mt-1">
        <div className="absolute top-[-4px] left-0 right-0 h-[4px] bg-[#fb5958] rounded-t-sm shadow-sm"></div>
        <div className="w-0 h-0 border-l-[13px] border-r-[13px] border-t-[8px] border-l-transparent border-r-transparent border-t-white opacity-90 mx-auto"></div>
    </div>
);

const IconBaiTiaoQuXian = () => (
    <div className="w-[26px] h-[32px] bg-gradient-to-b from-[#fb5958] to-[#e84140] rounded-sm flex items-center justify-center relative shadow-sm overflow-hidden border border-[#fc8180]">
        <div className="absolute top-0 right-0 w-[10px] h-[10px] bg-white transform -rotate-45 translate-x-1.5 -translate-y-1.5 shadow-sm border-l border-b border-[#fbc9a8]"></div>
        <span className="text-white text-[16px] font-bold leading-none mt-[4px]">¥</span>
    </div>
);

const IconXiaoJinKu = () => (
    <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#fca466] to-[#f68940] rounded-full flex flex-col items-center justify-center shadow-sm relative pt-1">
        <div className="absolute -top-1 left-[4px] w-[8px] h-[12px] bg-[#fca466] rounded-full transform -rotate-[30deg] z-[-1]"></div>
        <div className="absolute -top-1 right-[4px] w-[8px] h-[12px] bg-[#fca466] rounded-full transform rotate-[30deg] z-[-1]"></div>
        <div className="w-[14px] h-[6px] border-[2.5px] border-white border-t-0 rounded-b-full"></div>
    </div>
);

const IconHuangJin = () => (
    <div className="w-[30px] h-[30px] flex items-end justify-center relative pb-1">
        {/* Top bar */}
        <div className="w-[16px] h-[10px] bg-gradient-to-r from-[#ffe1a6] to-[#fcb154] transform -rotate-45 absolute top-[4px] z-10 shadow-sm rounded-sm"></div>
        {/* Bottom bars */}
        <div className="flex space-x-[2px] z-20">
            <div className="w-[12px] h-[14px] bg-gradient-to-b from-[#fcad59] to-[#d66518] rounded-sm shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]"></div>
            <div className="w-[12px] h-[14px] bg-gradient-to-b from-[#fcad59] to-[#d66518] rounded-sm shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]"></div>
        </div>
    </div>
);

const IconGuPiao = () => (
    <div className="w-[30px] h-[30px] flex items-center justify-center space-x-1 mt-1">
        {/* Candlestick 1 */}
        <div className="relative flex flex-col items-center w-[12px] h-[24px]">
            <div className="w-[2px] h-full bg-[#fb5958] absolute top-0"></div>
            <div className="w-[10px] h-[12px] bg-[#fb5958] absolute top-[4px] rounded-sm shadow-sm"></div>
        </div>
        {/* Candlestick 2 */}
        <div className="relative flex flex-col items-center w-[12px] h-[20px] mt-2">
            <div className="w-[2px] h-full bg-[#fb5958] absolute top-0"></div>
            <div className="w-[10px] h-[10px] bg-[#fb5958] absolute top-[2px] rounded-sm shadow-sm"></div>
        </div>
    </div>
);

const IconWenJianLiCai = () => (
    <div className="w-[30px] h-[34px] bg-gradient-to-b from-[#6b9dff] to-[#4c75f5] flex items-center justify-center shadow-sm" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
       <span className="text-white text-[14px] font-bold">稳</span>
    </div>
);

const IconTouJiaoZhuanQu = () => (
    <div className="w-[28px] h-[28px] bg-gradient-to-br from-[#fc7270] to-[#f45c5c] rounded-[6px] shadow-sm flex flex-col items-center justify-center pb-[1px]">
        <span className="text-white text-[10px] font-bold leading-none">投教</span>
    </div>
);

const IconYangLaoJin = () => (
    <div className="w-[30px] h-[34px] bg-gradient-to-b from-[#fca466] to-[#f68940] flex flex-col items-center justify-center shadow-sm" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
       <span className="text-white text-[10px] font-bold leading-tight mt-[-2px]">养老</span>
    </div>
);

const IconQiHuo = () => (
    <div className="w-[26px] h-[28px] bg-gradient-to-b from-[#fc7270] to-[#f45c5c] flex flex-col items-center justify-center shadow-sm relative pt-[2px] mt-2" style={{borderRadius: '0 0 6px 6px'}}>
        <div className="absolute top-[-4px] left-[-2px] right-[-2px] h-[4px] bg-[#fb5958] rounded-t-sm"></div>
        <span className="text-white text-[10px] font-bold leading-none">期货</span>
    </div>
);

export default function JDAllServicesTop() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden pb-10">
      
      {/* 1. Header Navigation */}
      <div className="w-full pt-[52px] px-4 pb-2 flex items-center justify-between sticky top-0 bg-white z-50">
         <div className="w-8 cursor-pointer">
            <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <span className="text-[18px] font-bold text-black tracking-wide">全部服务</span>
         <div className="w-8 flex justify-end cursor-pointer">
            <svg className="w-[22px] h-[22px] text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
         </div>
      </div>

      {/* spacer */}
      <div className="h-3 w-full bg-[#f5f6f8]"></div>

      {/* 2. 首页应用 (Home Apps Mock Banner) */}
      <div className="mx-4 bg-white rounded-xl py-3 px-4 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)] flex justify-between items-center">
          <span className="text-[16px] font-bold text-black flex-shrink-0 mr-4">首页应用</span>
          <div className="flex-1 flex overflow-hidden opacity-50 relative pointer-events-none items-center mt-[-4px]">
              <div className="transform scale-[0.6] origin-left flex space-x-[-12px]">
                  <IconGaoDuanLiCai />
                  <IconBaiTiao />
                  <IconJinTiaoJieKuan />
                  <IconBaoXian />
                  <IconJiJin />
                  <IconQianDao />
                  <IconNongHuJieQian />
                  <IconXianXiangHouFu />
                  <IconChuBeiJin />
                  <IconGaoDuanLiCai />
                  <IconJingXiangZu />
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-[40px] bg-gradient-to-l from-white to-transparent"></div>
          </div>
          <div className="bg-[#ea3d33] text-white text-[12px] font-medium px-[14px] py-[4px] rounded-full shadow-sm ml-2 z-10 active:scale-95">
              编辑
          </div>
      </div>

      {/* 3. 最近使用 Card */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-5 px-2 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
         <div className="px-2 text-[15px] font-bold text-black tracking-tight mb-4">
             最近使用
         </div>
         <div className="grid grid-cols-5 gap-y-6">
             <ServiceItem label="高端理财" icon={<IconGaoDuanLiCai />} />
             <ServiceItem label="京享租" icon={<IconJingXiangZu />} />
             <ServiceItem label="京东信誉分" icon={<IconJDXinYuFen />} />
             <ServiceItem label="农户借钱" icon={<IconNongHuJieQian />} />
             <ServiceItem label="储备金" icon={<IconChuBeiJin />} />
             <ServiceItem label="先享后付" icon={<IconXianXiangHouFu />} />
             <ServiceItem label="金条借款" icon={<IconJinTiaoJieKuan />} />
             <ServiceItem label="保险" icon={<IconBaoXian />} />
             <ServiceItem label="基金" icon={<IconJiJin />} />
             <ServiceItem label="签到" icon={<IconQianDao />} />
         </div>
      </div>

      {/* 4. 白条服务 Card */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-6 px-2 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
         <div className="px-2 text-[15px] font-bold text-black tracking-tight mb-4">
             白条服务
         </div>
         <div className="grid grid-cols-5 gap-y-6">
             <ServiceItem label="白条" icon={<IconBaiTiao />} />
             <ServiceItem label="先享后付" icon={<IconXianXiangHouFu />} />
             <ServiceItem label="京东信誉分" icon={<IconJDXinYuFen />} />
             <ServiceItem label="白条分分卡" icon={<IconBaiTiaoFenFenKa />} />
             <ServiceItem label="分期商城" icon={<IconFenQiShangCheng />} />
             <ServiceItem label="白条取现" icon={<IconBaiTiaoQuXian />} />
         </div>
      </div>

      {/* 5. 投资理财 Card */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-6 px-2 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
         <div className="px-2 text-[15px] font-bold text-black tracking-tight mb-4">
             投资理财
         </div>
         <div className="grid grid-cols-5 gap-y-6">
             <ServiceItem label="小金库" icon={<IconXiaoJinKu />} />
             <ServiceItem label="基金" icon={<IconJiJin />} />
             <ServiceItem label="黄金" icon={<IconHuangJin />} />
             <ServiceItem label="高端理财" icon={<IconGaoDuanLiCai />} />
             <ServiceItem label="股票" icon={<IconGuPiao />} />
             <ServiceItem label="稳健理财" icon={<IconWenJianLiCai />} />
             <ServiceItem label="投教专区" icon={<IconTouJiaoZhuanQu />} />
             <ServiceItem label="养老金" icon={<IconYangLaoJin />} />
             <ServiceItem label="期货" icon={<IconQiHuo />} />
         </div>
      </div>

      {/* 6. 信用借贷 Card (Cut off) */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-4 px-2 shadow-[0_2px_10px_rgba(0,0,0,0.015)] h-[120px] overflow-hidden">
         <div className="px-2 text-[15px] font-bold text-black tracking-tight mb-4">
             信用借贷
         </div>
         <div className="grid grid-cols-5 gap-y-5">
             <ServiceItem label="金条借款" icon={<IconJinTiaoJieKuan />} />
             <ServiceItem label="农户借钱" icon={<IconNongHuJieQian />} />
             <ServiceItem label="借钱" icon={<IconJieQian />} />
             <ServiceItem label="车抵贷" icon={<IconCheDiDai />} />
             <ServiceItem label="企业主贷" icon={<IconQiYeZhuDai />} />
         </div>
      </div>

    </div>
  );
}
