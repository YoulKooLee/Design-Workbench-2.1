/**
 * 组件画廊 Gallery（组件页签入口）
 * ---------------------------------------------------------------
 * 为什么必须有这个文件：Make 的组件页签扫描规则是
 *   src/component-templates/<分类>/index.tsx 存在 → 才把该分类列出来
 *
 * 本页 = 全部分类组件的可视化画廊：live iframe 缩略图（懒加载）+
 * 分类侧栏 + 搜索 + 预览/复制路由。清单见 ./catalog.ts（自动生成，
 * 重新生成：node _meta/gen-catalog.mjs）。
 *
 * 缩略图原理：iframe 按 1200×750 渲染、transform: scale(0.2) 缩到
 * 240×150 卡片，pointer-events 关闭；进入视口才加载（懒加载）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { GALLERY, type GalleryItem } from './catalog';

const TOTAL = GALLERY.reduce((n, c) => n + c.items.length, 0);

/** 页面路由（Make 服务端规则）：/component-templates/<分类>/<相对路径> */
const routeOf = (catId: string, href: string) =>
  `/component-templates/${encodeURIComponent(catId)}/${href.replace('./', '')}`;
/** 展示用（不做 URL 编码，避免中文变 %XX 乱码） */
const prettyRoute = (catId: string, href: string) =>
  `/component-templates/${catId}/${href.replace('./', '')}`;

/** 缩略图：进入视口才挂 src */
function Thumb({ src, name }: { src: string; name: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setVisible(true)),
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`g-thumb ${loaded ? 'loaded' : ''}`}
      onClick={() => window.open(src, '_blank')} title={`打开 ${name}`}>
      <span className="badge">{name}</span>
      {visible && (
        <iframe src={src} title={name} loading="lazy"
          onLoad={() => setLoaded(true)} tabIndex={-1} scrolling="no" />
      )}
      <div className="g-actions">
        <button className="g-btn pri" onClick={(e) => { e.stopPropagation(); window.open(src, '_blank'); }}>预览</button>
        <button className="g-btn gho" onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(decodeURIComponent(src)).catch(() => {}); }}>复制</button>
      </div>
    </div>
  );
}

function Card({ catId, it }: { catId: string; it: { name: string; label: string; href: string } }) {
  const [copied, setCopied] = React.useState(false);
  const src = routeOf(catId, it.href);
  return (
    <div className="g-card">
      <Thumb src={src} name={it.name} />
      <div className="g-meta">
        <div className="t">{it.label}</div>
        <div className="d">{prettyRoute(catId, it.href)}</div>
      </div>
      {copied && <span />}
    </div>
  );
}

function Gallery() {
  const [cat, setCat] = React.useState<string | null>(null); // null = 全部
  const [q, setQ] = React.useState('');
  const [toast, setToast] = React.useState<string | null>(null);

  const kw = q.trim().toLowerCase();
  const searching = kw.length > 0;

  const results = React.useMemo(() => {
    if (searching) {
      // 搜索：跨分类平铺，按 分类 → 名称 排序
      const out: { catId: string; it: GalleryItem }[] = [];
      for (const c of GALLERY) {
        const hitCat = c.id.toLowerCase().includes(kw) || c.zh.toLowerCase().includes(kw);
        for (const it of c.items) {
          if (hitCat || it.name.toLowerCase().includes(kw) || it.label.toLowerCase().includes(kw)) {
            out.push({ catId: c.id, it });
          }
        }
      }
      return out;
    }
    if (cat) {
      const c = GALLERY.find((x) => x.id === cat);
      return c ? c.items.map((it) => ({ catId: c.id, it })) : [];
    }
    return GALLERY.flatMap((c) => c.items.map((it) => ({ catId: c.id, it })));
  }, [cat, kw, searching]);

  // 搜索时平铺；未搜索时按分类分组展示
  const grouped = React.useMemo(() => {
    if (searching) return null;
    const map = new Map<string, { catId: string; it: GalleryItem }[]>();
    for (const r of results) {
      if (!map.has(r.catId)) map.set(r.catId, []);
      map.get(r.catId)!.push(r);
    }
    return GALLERY.filter((c) => map.has(c.id)).map((c) => ({ cat: c, rows: map.get(c.id)! }));
  }, [results, searching]);

  const copyRoute = (src: string) => {
    navigator.clipboard?.writeText(src).catch(() => {});
    setToast(`已复制 ${src}`);
    window.setTimeout(() => setToast(null), 1500);
  };

  return (
    <>
      <div className="g-top">
        <h1>组件<em>画廊</em> Gallery</h1>
        <span className="stat">{GALLERY.length} 分类 · {TOTAL} 组件页</span>
        <span className="hint">缩略图为实时渲染 · 点击卡片新窗口打开</span>
      </div>

      <div className="g-layout">
        <aside className="g-side">
          <input className="g-search" placeholder="搜索组件 / 分类…" value={q}
            onChange={(e) => setQ(e.target.value)} />
          <nav className="g-cats">
            <button className={`g-cat ${!cat ? 'on' : ''}`} onClick={() => setCat(null)}>
              <span>全部列表</span><span className="n">{TOTAL}</span>
            </button>
            {GALLERY.map((c) => (
              <button key={c.id} className={`g-cat ${cat === c.id && !searching ? 'on' : ''}`}
                onClick={() => { setCat(c.id); setQ(''); }} title={c.zh}>
                <span>{c.zh.length > 9 ? c.id : c.zh}</span>
                <span className="n">{c.items.length}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="g-main">
          {results.length === 0 && <div className="g-empty">没有匹配「{q}」的组件</div>}

          {grouped
            ? grouped.map(({ cat: c, rows }) => (
                <section key={c.id}>
                  <div className="g-group-title">{c.zh}<span style={{ color: 'var(--g-dim)', fontWeight: 400, fontSize: 11, marginLeft: 8 }}>{rows.length}</span></div>
                  <div className="g-grid">
                    {rows.map((r) => <Card key={`${r.catId}/${r.it.name}`} catId={r.catId} it={r.it} />)}
                  </div>
                </section>
              ))
            : (
                <div className="g-grid" style={{ marginTop: 4 }}>
                  {results.map((r) => <Card key={`${r.catId}/${r.it.name}`} catId={r.catId} it={r.it} />)}
                </div>
              )}
        </main>
      </div>

      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}

createRoot(document.getElementById('root')!).render(<Gallery />);
