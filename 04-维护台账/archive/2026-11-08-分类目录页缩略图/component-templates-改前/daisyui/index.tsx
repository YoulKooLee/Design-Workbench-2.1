/**
 * daisyUI 分类目录页（组件页签入口）
 * ---------------------------------------------------------------
 * 为什么必须有这个文件：Make 的组件页签扫描规则是
 *   src/component-templates/<分类>/index.tsx 存在 → 才把该分类列出来
 * （见 @axhub/make dist/server/cli.mjs 的 collectItemKeys）
 * 早先本分类只有 index.ts + index.html，结果被静默跳过、页签里看不到。
 *
 * 本页 = 目录 + 主题切换；真正的组件演示在 showcase.html（4 个区块）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DAISYUI_THEMES, DAISYUI_DEFAULT_THEME, setDaisyTheme } from './theme';
import pagesJson from './pages.json';

const PAGES = pagesJson as Record<string, { zh: string; items: { id: string; zh: string }[] }>;

type Section = {
  anchor: string;
  title: string;
  desc: string;
  tag: string;
};

const SECTIONS: Section[] = [
  { anchor: 's1', title: '语义类名速览', desc: '按钮 / 徽标 / 输入 / 开关 / 单选，同一套类名跨 37 套主题都成立', tag: '20+ 类' },
  { anchor: 's2', title: '展示道具', desc: '浏览器外框 / 窗口外框 / 代码外框 / 手机外框 / 拖动对比 / hero 首屏', tag: '6 件' },
  { anchor: 's3', title: '现有库没有的小件', desc: '对话气泡 / 倒计时 / 骨架屏 / 角标 / 横向卡 / 加载态', tag: '6 类' },
  { anchor: 's4', title: '与 Codebuddy Design 混排', desc: '同页共存不打架；末尾两张卡验证局部换肤（容器加 data-theme 即可）', tag: '4 卡' },
];

const THEME_LABEL: Record<string, string> = {
  axhub: 'axhub（默认 · 对齐 Arco）',
  'axhub-dark': 'axhub-dark（夜间 · 对齐 Arco）',
  light: 'light · 最通用，接近 shadcn 观感',
  dark: 'dark · 通用深色',
  cupcake: 'cupcake · 柔和粉彩，轻消费',
  bumblebee: 'bumblebee · 黄黑高对比，活动页',
  emerald: 'emerald · 清爽绿，医疗/环保/园区',
  corporate: 'corporate · 蓝白商务，企业后台（与现有风格最接近）',
  synthwave: 'synthwave · 紫粉霓虹，赛博展示',
  retro: 'retro · 米黄复古，怀旧专题',
  cyberpunk: 'cyberpunk · 荧光黄粉，强对比演示',
  valentine: 'valentine · 粉红，节日营销',
  halloween: 'halloween · 橙紫，活动氛围',
  garden: 'garden · 花园绿，生活服务',
  forest: 'forest · 深绿，农林/自然',
  aqua: 'aqua · 青蓝，水务/海洋',
  lofi: 'lofi · 灰调极简，文档站',
  pastel: 'pastel · 柔彩，儿童/教育',
  fantasy: 'fantasy · 渐变幻想，创意提案',
  wireframe: 'wireframe · 纯线框灰，低保真原型（PM 画线框首选）',
  black: 'black · 纯黑极简',
  luxury: 'luxury · 黑金高端',
  dracula: 'dracula · 深紫，开发者工具',
  cmyk: 'cmyk · 青品黄印刷感',
  autumn: 'autumn · 秋橙，季节活动',
  business: 'business · 商务灰蓝，报表',
  acid: 'acid · 荧光绿，潮流',
  lemonade: 'lemonade · 柠檬黄，清新',
  night: 'night · 深夜蓝，大屏夜间模式',
  coffee: 'coffee · 咖啡棕，生活/餐饮',
  winter: 'winter · 冷蓝白，冬季',
  dim: 'dim · 暗灰，长时间阅读',
  nord: 'nord · 北欧蓝灰，工具型',
  sunset: 'sunset · 日落橙紫，展示页',
  caramellatte: 'caramellatte · 焦糖奶油，温馨',
  abyss: 'abyss · 深海蓝，科技大屏（对比度够）',
  silk: 'silk · 丝绸米，文案页',
};

function CategoryView() {
  const [theme, setTheme] = React.useState<string>(DAISYUI_DEFAULT_THEME);

  const applyTheme = (t: string) => {
    setTheme(t);
    setDaisyTheme(t as (typeof DAISYUI_THEMES)[number]);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="mx-auto max-w-[1000px] px-6 py-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold m-0">daisyUI 5 · 语义类名组件</h1>
            <p className="text-xs opacity-60 mt-1 mb-0">
              写类名即用（<code>btn</code> / <code>card</code> / <code>mockup-browser</code>…），不是 React 组件；主题与 Arco 色板已对齐
            </p>
          </div>
          <select
            className="select select-sm w-52"
            value={theme}
            onChange={(e) => applyTheme(e.target.value)}
            aria-label="切换 daisyUI 主题"
          >
            {DAISYUI_THEMES.map((t) => (
              <option key={t} value={t}>{THEME_LABEL[t] || t}</option>
            ))}
          </select>
        </div>

        <div className="alert alert-info mt-4 py-2 px-3 text-xs">
          <span>
            当前主题：<b>{THEME_LABEL[theme] || theme}</b> · 切换只改 <code>&lt;html data-theme&gt;</code>，页面结构不动
          </span>
        </div>

        <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
          {SECTIONS.map((s, i) => (
            <a
              key={s.anchor}
              href={`./showcase.html#${s.anchor}`}
              className="card bg-base-100 border border-base-300 no-underline text-base-content hover:border-primary transition-colors"
            >
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">
                    {i + 1} · {s.title}
                  </div>
                  <span className="badge badge-sm badge-ghost">{s.tag}</span>
                </div>
                <div className="text-xs opacity-65 leading-relaxed">{s.desc}</div>
                <div className="text-xs text-primary mt-1">打开演示 →</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-5">
          <div className="text-sm font-semibold mb-1">组件目录（66 个 · 点击看实例页）</div>
          <div className="text-xs opacity-55 mb-1">每个组件一个静态演示页：实例 + 主类/修饰类/场景说明；text-rotate、hover-gallery 未单独出页，写法见 showcase</div>
          {Object.entries(PAGES).map(([gid, g]) => (
            <div key={gid} className="mt-3">
              <div className="text-xs opacity-60 mb-1.5">{g.zh}</div>
              <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(148px,1fr))' }}>
                {g.items.map((it) => (
                  <a
                    key={it.id}
                    href={`./${it.id}/index.html`}
                    className="card bg-base-100 border border-base-300 no-underline text-base-content hover:border-primary transition-colors"
                  >
                    <div className="card-body p-2.5">
                      <div className="text-xs font-semibold">{it.zh}</div>
                      <div className="text-[10px] opacity-55 font-mono m-0">{it.id}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card bg-base-200 mt-4">
          <div className="card-body p-4">
            <div className="text-sm font-semibold mb-2">页面里怎么用</div>
            <pre className="text-xs m-0 overflow-auto opacity-80">{`<button className="btn btn-primary btn-sm">提交审批</button>

<div className="card bg-base-100 border border-base-300">
  <div className="card-body">…</div>
</div>

// 需要主题切换时
import { setDaisyTheme } from '../component-templates/daisyui/theme';
setDaisyTheme('axhub-dark');`}</pre>
          </div>
        </div>

        <div className="text-xs opacity-55 mt-4 leading-relaxed">
          业务页请仍用 Codebuddy Design（表格 / 表单 / 审批 / 订单 / 工作流能力更全）；
          daisyUI 负责主题系统与展示道具。68 组件逐条对照见 <code>03-组件库/03-页面组件/04-daisyUI/对照表.md</code>。
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<CategoryView />);
