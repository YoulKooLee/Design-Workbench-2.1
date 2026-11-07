/**
 * @description 标注线框图原型（Redline）：灰块线框画布 + 编号钉 ①②③④⑤ + 右侧对应设计说明
 * 源自 open-design wireframe-annotated 模板转译（原型框架 · 页面模板）
 */
import React from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#f7f7f8', card: '#ffffff', block: '#e3e3e6', blockDk: '#d4d4d9',
  rule: '#c9c9cf', ink: '#1c1b1a', pencil: '#6b6a70', accent: '#d8482b',
};

export default function WireframeAnnotatedPrototype() {
  // 设计说明 = spec 行（编号钉与 modules 一一对应）
  const modules: PrototypeModule[] = [
    { id: 'nav', title: '① 顶部导航', bind: 'nav', text: '固定导航，64px 高，滚动时收窄；主按钮右对齐。', list: ['logo 占位 86×22', '4 个导航链接占位', '右侧主 CTA 按钮'] },
    { id: 'hero', title: '② 首屏 Hero', bind: 'hero', text: '主标题 48/56，副标题 18/28。双 CTA：实心 + 描边。右侧图片占位 16:9。', list: ['标题两行灰条（92%/70%）', '副标题两行灰条（80%/64%）', '图片占位：对角斜线示意'] },
    { id: 'logos', title: '③ 客户证明', bind: 'logos', text: '5 个合作方 logo，等宽灰块，移动端隐藏。' },
    { id: 'features', title: '④ 功能三列', bind: 'features', text: '≥960px 三列，窄屏一列。图标 38px，间距 8px。', list: ['每列：图标 + 标题 + 两行文案占位'] },
    { id: 'footer', title: '⑤ 页脚', bind: 'footer', text: '4 列链接网格 + 版权行；1000px 以下收为 2 列。', list: ['每列：栏目标题 + 3 条链接占位'] },
  ];

  const bar: React.CSSProperties = { height: 12, background: C.block, border: '1px solid ' + C.blockDk, borderRadius: 3 };
  const btnBlock: React.CSSProperties = { height: 34, border: '1.5px solid ' + C.ink, borderRadius: 6, background: C.block };
  const pin = (n: number): React.CSSProperties => ({
    position: 'absolute', top: 10, left: 10, width: 24, height: 24, borderRadius: '50%', background: C.accent,
    color: '#fff', fontSize: 13, fontWeight: 600, lineHeight: '24px', textAlign: 'center', zIndex: 5, boxShadow: '0 1px 3px rgba(28,27,26,0.3)',
  });

  return (
    <PrototypeLayout title="标注线框图（落地页）" breadcrumb="模板 / 线框图" modules={modules}>
      <div style={{ background: C.bg, color: C.ink, font: '14px/1.5 -apple-system, system-ui, sans-serif', padding: '20px 24px 32px' }}>
        {/* 页头 */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: '2px solid ' + C.ink, marginBottom: 20, flexWrap: 'wrap' }}>
          <h1 style={{ fontWeight: 700, fontSize: 21, lineHeight: 1.1, margin: 0, letterSpacing: '-0.01em', color: C.ink }}>示例公司 · 营销落地页</h1>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'ui-monospace, monospace', fontSize: 11, fontWeight: 600, padding: '6px 10px', border: '1.5px solid ' + C.accent, color: C.accent, letterSpacing: '0.16em', borderRadius: 4 }}>
            <span style={{ width: 7, height: 7, background: C.accent, transform: 'rotate(45deg)' }} />线框 · 红线标注
          </span>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, lineHeight: 1.4, color: C.pencil, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'right' }}>
            <b style={{ color: C.ink }}>设备</b> 桌面 1280 · <b style={{ color: C.ink }}>保真度</b> 低 · <b style={{ color: C.ink }}>版本</b> A
          </div>
        </div>

        {/* 浏览器框 */}
        <div data-proto-id="frame" style={{ border: '2px solid ' + C.ink, borderRadius: 10, overflow: 'hidden', background: C.card, boxShadow: '4px 6px 0 -2px rgba(28,27,26,0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', background: C.block, borderBottom: '2px solid ' + C.ink }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 2, 3].map((i) => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', border: '1.5px solid ' + C.ink, background: C.card, display: 'inline-block' }} />)}
            </div>
            <div style={{ flex: 1, height: 22, border: '1.5px solid ' + C.rule, borderRadius: 999, background: C.card, display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: 'ui-monospace, monospace', fontSize: 12, color: C.pencil }}>acme.example / home</div>
          </div>

          <div style={{ background: C.card }}>
            {/* ① 导航 */}
            <section data-proto-id="nav" style={{ position: 'relative', padding: '22px 26px', borderBottom: '1.5px dashed ' + C.rule }}>
              <span style={pin(1)}>①</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ width: 86, height: 22, background: C.blockDk, border: '1.5px solid ' + C.ink, borderRadius: 4 }} />
                <div style={{ display: 'flex', gap: 16, flex: 1 }}>
                  {[1, 2, 3, 4].map((i) => <div key={i} style={Object.assign({}, bar, { width: 52 })} />)}
                </div>
                <div style={Object.assign({}, btnBlock, { width: 96 })} />
              </div>
            </section>

            {/* ② Hero */}
            <section data-proto-id="hero" style={{ position: 'relative', padding: '22px 26px', borderBottom: '1.5px dashed ' + C.rule }}>
              <span style={pin(2)}>②</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: 28, alignItems: 'center' }}>
                <div>
                  <div style={Object.assign({}, bar, { height: 26, width: '92%' })} />
                  <div style={Object.assign({}, bar, { height: 26, width: '70%', marginTop: 12 })} />
                  <div style={Object.assign({}, bar, { height: 10, width: '80%', marginTop: 12 })} />
                  <div style={Object.assign({}, bar, { height: 10, width: '64%', marginTop: 8 })} />
                  <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                    <div style={Object.assign({}, btnBlock, { width: 132 })} />
                    <div style={Object.assign({}, btnBlock, { width: 132, background: C.card })} />
                  </div>
                </div>
                <div style={{ position: 'relative', minHeight: 170, border: '2px solid ' + C.ink, borderRadius: 8, background: C.block, overflow: 'hidden' }}>
                  <svg viewBox="0 0 200 120" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    <line x1="0" y1="0" x2="200" y2="120" stroke={C.ink} strokeWidth="1.4" />
                    <line x1="200" y1="0" x2="0" y2="120" stroke={C.ink} strokeWidth="1.4" />
                  </svg>
                </div>
              </div>
            </section>

            {/* ③ 客户证明 */}
            <section data-proto-id="logos" style={{ position: 'relative', padding: '22px 26px', borderBottom: '1.5px dashed ' + C.rule }}>
              <span style={pin(3)}>③</span>
              <div style={{ display: 'flex', gap: 18, justifyContent: 'space-between' }}>
                {[1, 2, 3, 4, 5].map((i) => <div key={i} style={{ flex: 1, height: 30, background: C.block, border: '1.5px solid ' + C.blockDk, borderRadius: 5 }} />)}
              </div>
            </section>

            {/* ④ 功能三列 */}
            <section data-proto-id="features" style={{ position: 'relative', padding: '22px 26px', borderBottom: '1.5px dashed ' + C.rule }}>
              <span style={pin(4)}>④</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ border: '1.5px solid ' + C.rule, borderRadius: 8, padding: 16, background: C.bg, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ width: 38, height: 38, border: '1.5px solid ' + C.ink, borderRadius: 8, background: C.blockDk }} />
                    <div style={{ height: 14, width: '66%', background: C.blockDk, borderRadius: 3 }} />
                    <div style={bar} />
                    <div style={Object.assign({}, bar, { width: '78%' })} />
                  </div>
                ))}
              </div>
            </section>

            {/* ⑤ 页脚 */}
            <section data-proto-id="footer" style={{ position: 'relative', padding: '22px 26px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, background: C.block }}>
              <span style={pin(5)}>⑤</span>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <div style={{ height: 12, width: '60%', background: C.blockDk, border: '1px solid ' + C.rule, borderRadius: 3, marginBottom: 4 }} />
                  <div style={Object.assign({}, bar, { height: 8, width: '78%', background: C.card })} />
                  <div style={Object.assign({}, bar, { height: 8, width: '64%', background: C.card })} />
                  <div style={Object.assign({}, bar, { height: 8, width: '70%', background: C.card })} />
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* 图例 */}
        <div style={{ padding: '12px 4px 0', fontFamily: 'ui-monospace, monospace', fontSize: 11, lineHeight: 1.5, color: C.pencil, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: C.accent, flexShrink: 0 }} />
          编号钉与右侧说明一一对应；强调色仅用于标注。
        </div>
      </div>
    </PrototypeLayout>
  );
}
