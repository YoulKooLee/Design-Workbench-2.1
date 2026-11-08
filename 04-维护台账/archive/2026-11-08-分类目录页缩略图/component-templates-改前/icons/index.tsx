/**
 * 图标库面板（组件页签入口）
 * ---------------------------------------------------------------
 * 为什么必须有这个文件：Make 的组件页签扫描规则是
 *   src/component-templates/<分类>/index.tsx 存在 → 才把该分类列出来
 * （见 @axhub/make dist/server/cli.mjs 的 collectItemKeys）
 *
 * 本页 = 图标浏览器：家族/字重切换 + 搜索 + 点击复制类名。
 * 图标源：Font Awesome Pro 7.3.0（FA7 语法：家族类 × 风格类 × 图标类，
 * 字形在 vendor/fontawesome/css/all.min.css 里以 `--fa` 变量声明）。
 * 清单见 ./catalog.ts（自动生成）。
 *
 * 用法（业务页）：
 *   1. html 里 <link rel="stylesheet" href="相对路径到 component-templates/icons/vendor/fontawesome/css/all.min.css">
 *      或 tsx 里 import '../component-templates/icons/vendor/fontawesome/css/all.min.css';
 *   2. <i className="fa-solid fa-heart"></i>
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { FA_ICONS, FA_BRANDS } from './catalog';

type Combo = { cls: string; label: string };
type Family = { id: string; label: string; desc: string; combos: Combo[]; list: string[] };

const FAMILIES: Family[] = [
  {
    id: 'classic',
    label: 'Classic 经典',
    desc: '最常用；圆角曲线风，后台默认',
    combos: [
      { cls: 'fa-solid', label: 'Solid 实底' },
      { cls: 'fa-regular', label: 'Regular 常规' },
      { cls: 'fa-light', label: 'Light 细线' },
      { cls: 'fa-thin', label: 'Thin 极细' },
    ],
    list: FA_ICONS,
  },
  {
    id: 'sharp',
    label: 'Sharp 直角',
    desc: '直角切边；科技/大屏/安防风格',
    combos: [
      { cls: 'fa-sharp fa-solid', label: 'Sharp Solid' },
      { cls: 'fa-sharp fa-regular', label: 'Sharp Regular' },
      { cls: 'fa-sharp fa-light', label: 'Sharp Light' },
      { cls: 'fa-sharp fa-thin', label: 'Sharp Thin' },
    ],
    list: FA_ICONS,
  },
  {
    id: 'duotone',
    label: 'Duotone 双色',
    desc: '双层双色；信息图与数据可视化',
    combos: [
      { cls: 'fa-duotone fa-solid', label: 'Duotone Solid' },
      { cls: 'fa-duotone fa-light', label: 'Duotone Light' },
      { cls: 'fa-duotone fa-regular', label: 'Duotone Regular' },
      { cls: 'fa-duotone fa-thin', label: 'Duotone Thin' },
    ],
    list: FA_ICONS,
  },
  {
    id: 'brands',
    label: 'Brands 品牌',
    desc: '微信 / GitHub / Chrome 等品牌标',
    combos: [{ cls: 'fa-brands', label: 'Brands 品牌标' }],
    list: FA_BRANDS,
  },
];

const PAGE_SIZE = 300;

function Panel() {
  const [famId, setFamId] = React.useState('classic');
  const [comboIdx, setComboIdx] = React.useState(0);
  const [q, setQ] = React.useState('');
  const [limit, setLimit] = React.useState(PAGE_SIZE);
  const [size, setSize] = React.useState(22);
  const [copied, setCopied] = React.useState<string | null>(null);

  const fam = FAMILIES.find((f) => f.id === famId)!;
  const combo = fam.combos[Math.min(comboIdx, fam.combos.length - 1)];

  const filtered = React.useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return fam.list;
    return fam.list.filter((n) => n.includes(kw));
  }, [fam, q]);

  // 切家族/搜索后回到第一页
  React.useEffect(() => {
    setLimit(PAGE_SIZE);
  }, [famId, q]);

  const shown = filtered.slice(0, limit);

  const copy = async (name: string) => {
    const full = `<i class="${combo.cls} fa-${name}"></i>`;
    try {
      await navigator.clipboard.writeText(full);
    } catch {
      // 剪贴板不可用时忽略（file:// 等）
    }
    setCopied(full);
    window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="mx-auto max-w-[1100px] px-6 py-6">
        {/* 头部 */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold m-0">Font Awesome Pro 7.3 · 图标库</h1>
            <p className="text-xs opacity-60 mt-1 mb-0">
              4 个家族 × 4 档字重，共 <b>{FA_ICONS.length + FA_BRANDS.length}</b> 个图标；点击卡片复制{' '}
              <code>&lt;i&gt;</code> 标签，业务页引入 CSS 后即可渲染
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-60">预览字号</span>
            <input
              type="range"
              min={14}
              max={40}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="range range-xs w-28"
              aria-label="预览字号"
            />
            <span className="text-xs font-mono w-8">{size}px</span>
          </div>
        </div>

        {/* 家族切换 */}
        <div className="flex flex-wrap gap-2 mt-4" role="tablist">
          {FAMILIES.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={f.id === famId}
              className={`btn btn-sm ${f.id === famId ? 'btn-primary' : 'btn-ghost border border-base-300'}`}
              onClick={() => {
                setFamId(f.id);
                setComboIdx(0);
              }}
            >
              {f.label}
              <span className="opacity-55 text-[10px] font-mono ml-1">{f.list.length}</span>
            </button>
          ))}
        </div>
        <div className="text-xs opacity-55 mt-1.5">{fam.desc}</div>

        {/* 字重 + 搜索 */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {fam.combos.map((c, i) => (
            <button
              key={c.cls}
              className={`btn btn-xs ${i === comboIdx ? 'btn-secondary' : 'btn-ghost border border-base-300'}`}
              onClick={() => setComboIdx(i)}
            >
              {c.label}
            </button>
          ))}
          <div className="flex-1" />
          <input
            type="text"
            className="input input-sm input-bordered w-56"
            placeholder="搜图标名，如 user / chart / arrow"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <span className="text-xs opacity-55 font-mono">
            {filtered.length} / {fam.list.length}
          </span>
        </div>

        {/* 当前类名示例 */}
        <div className="alert alert-info mt-3 py-2 px-3 text-xs">
          <span>
            当前字重：<code>{combo.cls}</code> · 点卡片复制{' '}
            <code>
              &lt;i class=&quot;{combo.cls} fa-xxx&quot;&gt;&lt;/i&gt;
            </code>
          </span>
        </div>

        {/* 图标网格 */}
        <div
          className="grid gap-2 mt-3"
          style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(116px,1fr))' }}
        >
          {shown.map((n) => (
            <button
              key={n}
              className="card bg-base-100 border border-base-300 hover:border-primary transition-colors cursor-pointer text-left"
              onClick={() => copy(n)}
              title={n}
            >
              <div className="card-body p-2.5 items-center gap-1.5">
                <i
                  className={`${combo.cls} fa-${n}`}
                  style={{ fontSize: size, lineHeight: 1 }}
                  aria-hidden
                />
                <span className="text-[10px] opacity-60 font-mono truncate w-full text-center m-0">
                  {n}
                </span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length > shown.length && (
          <div className="text-center mt-4">
            <button className="btn btn-sm btn-outline" onClick={() => setLimit(limit + PAGE_SIZE)}>
              加载更多（还有 {filtered.length - shown.length} 个）
            </button>
          </div>
        )}
        {filtered.length === 0 && (
          <div className="text-sm opacity-60 mt-8 text-center">没有匹配「{q}」的图标，换个关键词试试</div>
        )}

        {/* 用法 */}
        <div className="card bg-base-200 mt-5">
          <div className="card-body p-4">
            <div className="text-sm font-semibold mb-2">业务页里怎么用</div>
            <pre className="text-xs m-0 overflow-auto opacity-80">{`// 方式一：tsx 里直接 import（推荐，走构建）
import '../component-templates/icons/vendor/fontawesome/css/all.min.css';

// 方式二：html 里 <link>
<link rel="stylesheet" href="./vendor/fontawesome/css/all.min.css">

// 然后写标签即可（家族类可省略 fa-classic）
<i className="fa-solid fa-user"></i>        // Classic 实底
<i className="fa-light fa-chart-line"></i>  // 细线
<i className="fa-sharp fa-solid fa-shield"></i> // Sharp 直角
<i className="fa-duotone fa-solid fa-gauge-high"></i> // 双色
<i className="fa-brands fa-weixin"></i>     // 品牌标

// 尺寸/颜色跟文字走：style={{ fontSize: 20, color: '#165dff' }}`}</pre>
            <div className="text-xs opacity-60 mt-2">
              资产来源：03-组件库/03-页面组件/Vibe Design Pro（v1.8）admin/vendor/fontawesome，商用许可随包维护。
              sharp/duotone 并非覆盖全部 3772 个图形，以实际渲染为准（缺字形会显示方框）。
            </div>
          </div>
        </div>

        {/* 复制成功提示 */}
        {copied && (
          <div className="toast toast-center toast-bottom z-50">
            <div className="alert alert-success py-2 px-4 text-sm">
              <span className="font-mono">{copied}</span> 已复制
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<Panel />);
