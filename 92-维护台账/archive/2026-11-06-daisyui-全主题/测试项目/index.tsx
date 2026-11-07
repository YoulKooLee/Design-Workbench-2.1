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

type Section = {
  anchor: string;
  title: string;
  desc: string;
  tag: string;
};

const SECTIONS: Section[] = [
  { anchor: 's1', title: '语义类名速览', desc: '按钮 / 徽标 / 输入 / 开关 / 单选，同一套类名跨 4 个主题都成立', tag: '20+ 类' },
  { anchor: 's2', title: '展示道具', desc: '浏览器外框 / 窗口外框 / 代码外框 / 手机外框 / 拖动对比 / hero 首屏', tag: '6 件' },
  { anchor: 's3', title: '现有库没有的小件', desc: '对话气泡 / 倒计时 / 骨架屏 / 角标 / 横向卡 / 加载态', tag: '6 类' },
  { anchor: 's4', title: '与 Codebuddy Design 混排', desc: '同页共存不打架；末尾两张卡验证局部换肤（容器加 data-theme 即可）', tag: '4 卡' },
];

const THEME_LABEL: Record<string, string> = {
  axhub: 'axhub（默认 · 对齐 Arco）',
  'axhub-dark': 'axhub-dark',
  light: 'light',
  dark: 'dark',
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
          <div className="join">
            {DAISYUI_THEMES.map((t) => (
              <button
                key={t}
                type="button"
                className={`btn btn-xs join-item ${t === theme ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => applyTheme(t)}
              >
                {t}
              </button>
            ))}
          </div>
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
