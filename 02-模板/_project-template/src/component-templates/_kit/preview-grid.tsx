import React, { useEffect, useRef, useState } from 'react';

/**
 * 分类目录页 · 实时缩略图预览网格
 * 与 gallery 同方案：1200×750 live iframe 等比缩放，进入视口前 400px 懒加载。
 * 点击卡片 = 在当前页签打开组件页（保持原有目录页导航行为）。
 */
export interface PreviewItem {
  /** 组件名（英文 id） */
  name: string;
  /** 中文标签（可选，缺省用 name） */
  label?: string;
  /** 相对路径，如 ./Input/index.html */
  href: string;
}

const THUMB_W = 1200;
const THUMB_H = 750;

export function PreviewGrid({
  items,
  minCol = 240,
}: {
  items: PreviewItem[];
  /** 卡片最小列宽 px */
  minCol?: number;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minCol}px, 1fr))`,
        gap: 16,
      }}
    >
      {items.map((it) => (
        <PreviewCard key={it.href} item={it} />
      ))}
    </div>
  );
}

function PreviewCard({ item }: { item: PreviewItem }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [scale, setScale] = useState(0.2);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / THUMB_W);
    });
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <a
      href={item.href}
      title={item.label || item.name}
      style={{
        display: 'block',
        border: '1px solid rgba(128,128,128,.28)',
        borderRadius: 10,
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        background: 'rgba(128,128,128,.06)',
        transition: 'border-color .15s, box-shadow .15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(22,93,255,.55)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(128,128,128,.28)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        ref={boxRef}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: `${THUMB_W} / ${THUMB_H}`,
          overflow: 'hidden',
          background: '#ffffff',
        }}
      >
        {visible && (
          <iframe
            src={item.href}
            title={item.name}
            loading="lazy"
            tabIndex={-1}
            onLoad={() => setReady(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: THUMB_W,
              height: THUMB_H,
              border: 0,
              transform: `scale(${scale})`,
              transformOrigin: '0 0',
              pointerEvents: 'none',
              opacity: ready ? 1 : 0,
              transition: 'opacity .25s',
            }}
          />
        )}
        {!ready && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              color: '#94a3b8',
              background:
                'linear-gradient(135deg, rgba(148,163,184,.10), rgba(148,163,184,.02))',
            }}
          >
            加载预览…
          </div>
        )}
      </div>
      <div
        style={{
          padding: '9px 12px',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600 }}>
          {item.label || item.name}
        </span>
        <span style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>
          {item.label ? item.name : '点击预览'}
        </span>
      </div>
    </a>
  );
}
