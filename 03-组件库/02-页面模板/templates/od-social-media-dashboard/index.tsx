/**
 * @description 创作者社媒数据看板原型（暗色）：平台切换 + 时间范围页签 + 概览条 + 提问框 + 4 张平台卡 + 4 项指标 + 粉丝增长折线 + 本周最佳内容 + 热门话题与精选评论
 * 源自 open-design social-media-dashboard 模板转译（Apache-2.0）
 * 暗色配色独立审计：正文 14.3:1、次级 10.9:1，均达基线
 * 已剥离蓝本的外链字体、玻璃质感与氛围光效；字体改用系统栈
 */
import React, { useState } from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  surface: '#121318', container: '#1e1f25', containerHigh: '#292a2f', containerLow: '#1a1b21',
  onSurface: '#e3e1e9', variant: '#d0c6ab', outline: '#999077', outlineVar: '#4d4732',
  primary: '#ffd700', onPrimary: '#3a3000',
  secondary: '#00e3fd', onSecondary: '#00616d',
  good: '#7cffb4', bad: '#ffb4ab',
};

type PlatformKey = 'x' | 'in' | 'bili' | 'xhs';

const PLATFORMS: Record<PlatformKey, { name: string; handle: string; mono: string; followers: string; delta: string; eng: string; likes: string; reposts: string; posts: number; reach: string }> = {
  x: { name: 'X', handle: '@qimingstudio', mono: '𝕏', followers: '14,287', delta: '+2.3%', eng: '4.80%', likes: '38,412', reposts: '6,204', posts: 9, reach: '38K' },
  in: { name: '领英', handle: '启明工作室', mono: 'in', followers: '8,412', delta: '+1.1%', eng: '3.20%', likes: '12,908', reposts: '1,533', posts: 5, reach: '14K' },
  bili: { name: 'B站', handle: '启明设计日志', mono: 'B', followers: '5,930', delta: '+4.6%', eng: '6.10%', likes: '21,760', reposts: '2,841', posts: 3, reach: '26K' },
  xhs: { name: '小红书', handle: '启明工作室', mono: '书', followers: '3,208', delta: '+0.8%', eng: '5.40%', likes: '9,335', reposts: '742', posts: 7, reach: '11K' },
};

const RANGES = ['7 天', '30 天', '90 天', '今年以来'] as const;
const GROWTH = [11800, 11960, 12120, 12280, 12410, 12680, 12930, 13120, 13260, 13540, 13780, 13990, 14287];

export default function SocialDashboardPrototype() {
  const [plat, setPlat] = useState<PlatformKey>('x');
  const [range, setRange] = useState<typeof RANGES[number]>('7 天');
  const p = PLATFORMS[plat];

  const modules: PrototypeModule[] = [
    { id: 'header', bind: 'header', title: '顶栏', text: '品牌标识与「数据分析」栏目名 + 平台快捷切换 + 时间范围页签 + 创作者信息块。', list: ['时间范围四选一，切换后概览句与图表同步', '创作者块：头像缩写 + 名称 + 身份说明'] },
    { id: 'hero', bind: 'hero', title: '概览条', text: '一句话总结本周产出，下附一行对比数据，右侧两个操作按钮。', list: ['主按钮「发新内容」用品牌金色', '次按钮「导出报告」为描边样式'] },
    { id: 'ask', bind: 'ask', title: '提问框', text: '单行输入，占位文案给出两个可问的问题示例。', list: ['仅为输入形态展示，不做真实检索'] },
    { id: 'platforms', bind: 'platforms', title: '平台卡', text: '4 张卡：平台字母标 + 名称 + 账号 + 粉丝数与周增量。', list: ['选中平台底色提亮并加金色描边', '点击切换会同步下方四项指标'] },
    { id: 'kpis', bind: 'kpis', title: '指标卡', text: '粉丝数 / 互动率 / 点赞 / 转发，每张含环比与脚注。', list: ['数字用等宽数字对齐', '环比上升用绿、下降用红，并保留箭头符号做非颜色线索'] },
    { id: 'growth', bind: 'growth', title: '粉丝增长', text: '近 30 天粉丝增长折线，内联 SVG + 低透明面积填充，两个标注点说明关键涨幅。' },
    { id: 'topPost', bind: 'topPost', title: '本周最佳', text: '内容卡片：头像 + 账号 + 正文 + 16:9 媒体占位块，顶部标注点击率。' },
    { id: 'trending', bind: 'trending', title: '热门话题', text: '5 条话题：名称 + 内容数 + 24 小时趋势迷你折线（10 点，无坐标轴）。' },
    { id: 'comments', bind: 'comments', title: '精选评论', text: '3 条：头像 + 账号 + 正文（最多 2 行）+ 赞与回复数。', list: ['认证账号加文字标记，不只用颜色区分'] },
  ];

  const W = 620, H = 190, pad = 16;
  const maxG = Math.max(...GROWTH), minG = Math.min(...GROWTH);
  const gx = (i: number) => (i * (W - pad * 2)) / (GROWTH.length - 1) + pad;
  const gy = (v: number) => H - 34 - ((v - minG) / (maxG - minG || 1)) * (H - 34 - pad);
  const gPts = GROWTH.map((v, i) => `${gx(i).toFixed(1)},${gy(v).toFixed(1)}`).join(' ');

  return (
    <PrototypeLayout title="创作者数据看板" breadcrumb="数据分析 / 总览" modules={modules}>
      <div style={{ background: C.surface, color: C.onSurface, fontSize: 16, lineHeight: 1.6, fontFamily: '-apple-system,"PingFang SC","Microsoft YaHei",system-ui,sans-serif', padding: '0 0 28px' }}>
        {/* 顶栏 */}
        <header data-proto-id="header" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderBottom: `1px solid ${C.outlineVar}`, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 30, height: 30, borderRadius: 999, border: `2px solid ${C.primary}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: C.primary }}>启</span>
            <span style={{ fontSize: 12, letterSpacing: '0.14em', color: C.variant }}>数据分析</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 4, background: C.containerLow, borderRadius: 6, padding: 3 }}>
            {RANGES.map((r) => (
              <button key={r} type="button" onClick={() => setRange(r)} style={{ font: 'inherit', fontSize: 13, cursor: 'pointer', padding: '5px 12px', borderRadius: 4, border: 'none', background: range === r ? C.containerHigh : 'transparent', color: range === r ? C.onSurface : C.variant, fontWeight: range === r ? 600 : 400 }}>{r}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 32, height: 32, borderRadius: 999, background: C.containerHigh, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>启</span>
            <span>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>启明工作室</span>
              <span style={{ display: 'block', fontSize: 12, color: C.variant }}>设计团队 · 4 个平台</span>
            </span>
          </div>
        </header>

        <div style={{ padding: '0 24px', maxWidth: 1120 }}>
          {/* 概览条 */}
          <section data-proto-id="hero" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '22px 0 18px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.35 }}>本周在 {p.name} 发布了 {p.posts} 条内容。</h1>
              <p style={{ margin: '6px 0 0', fontSize: 14, color: C.variant }}>互动率较上周提升 0.6 个百分点 · 最高一条触达 {p.reach} 个账号 · 统计区间：{range}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" style={{ font: 'inherit', fontSize: 14, cursor: 'pointer', padding: '8px 16px', borderRadius: 6, border: `1px solid ${C.outline}`, background: 'transparent', color: C.onSurface }}>导出报告</button>
              <button type="button" style={{ font: 'inherit', fontSize: 14, cursor: 'pointer', padding: '8px 16px', borderRadius: 6, border: `1px solid ${C.primary}`, background: C.primary, color: C.onPrimary, fontWeight: 600 }}>发新内容 →</button>
            </div>
          </section>

          {/* 提问框 */}
          <section data-proto-id="ask">
            <input readOnly placeholder="问问你的内容表现 —— 例如「上周表现最好的一条」「来自认证账号的评论」" style={{ width: '100%', boxSizing: 'border-box', font: 'inherit', fontSize: 15, padding: '11px 14px', borderRadius: 8, border: `1px solid ${C.outlineVar}`, background: C.containerLow, color: C.onSurface, marginBottom: 18 }} />
          </section>

          {/* 平台卡 */}
          <section data-proto-id="platforms" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 }}>
            {(Object.keys(PLATFORMS) as PlatformKey[]).map((k) => {
              const v = PLATFORMS[k]; const on = k === plat;
              return (
                <button key={k} type="button" onClick={() => setPlat(k)} style={{ font: 'inherit', textAlign: 'left', cursor: 'pointer', padding: '12px 14px', borderRadius: 10, border: `1px solid ${on ? C.primary : C.outlineVar}`, background: on ? C.containerHigh : C.container, color: C.onSurface }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: C.containerLow, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{v.mono}</span>
                    <span>
                      <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{v.name}</span>
                      <span style={{ display: 'block', fontSize: 12, color: C.variant }}>{v.handle}</span>
                    </span>
                  </span>
                  <span style={{ display: 'block', fontSize: 20, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{v.followers}</span>
                  <span style={{ display: 'block', fontSize: 12, color: C.good, marginTop: 2 }}>↗ {v.delta} 本周</span>
                </button>
              );
            })}
          </section>

          {/* KPI */}
          <section data-proto-id="kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 }}>
            {[
              { l: '粉丝数', v: p.followers, d: p.delta, f: '上周 13,968' },
              { l: '互动率', v: p.eng, d: '+0.4%', f: '上周 4.4%' },
              { l: `点赞（${range}）`, v: p.likes, d: '+8.1%', f: `共 ${p.posts} 条内容` },
              { l: `转发（${range}）`, v: p.reposts, d: '+3.6%', f: '含 2 次二次转发' },
            ].map((k) => (
              <div key={k.l} style={{ background: C.container, border: `1px solid ${C.outlineVar}`, borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, letterSpacing: '0.06em', color: C.variant, marginBottom: 6 }}>{k.l}</div>
                <div style={{ fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums', lineHeight: 1.25 }}>{k.v}</div>
                <div style={{ fontSize: 13, color: C.good, marginTop: 4 }}>↗ {k.d}</div>
                <div style={{ fontSize: 12, color: C.variant, marginTop: 2 }}>{k.f}</div>
              </div>
            ))}
          </section>

          {/* 主网格 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12, marginBottom: 12 }}>
            <div data-proto-id="growth" style={{ background: C.container, border: `1px solid ${C.outlineVar}`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>粉丝增长 · 近 30 天</div>
              <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 190, display: 'block' }} role="img" aria-label="近 30 天粉丝增长折线图">
                <polygon points={`${pad},${H - 34} ${gPts} ${W - pad},${H - 34}`} fill={C.secondary} fillOpacity="0.12" />
                <polyline points={gPts} fill="none" stroke={C.secondary} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx={gx(4)} cy={gy(GROWTH[4])} r="4" fill={C.primary} />
                <text x={gx(4)} y={gy(GROWTH[4]) - 10} fontSize="12" fill={C.primary} textAnchor="middle">通讯发出 +842</text>
                <circle cx={gx(9)} cy={gy(GROWTH[9])} r="4" fill={C.primary} />
                <text x={gx(9)} y={gy(GROWTH[9]) - 10} fontSize="12" fill={C.primary} textAnchor="middle">爆款长帖 +1.2K</text>
                <g fill={C.variant} fontSize="12">
                  <text x={pad} y={H - 12}>10 月 1 日</text>
                  <text x={W / 2} y={H - 12} textAnchor="middle">10 月 16 日</text>
                  <text x={W - pad} y={H - 12} textAnchor="end">10 月 30 日</text>
                </g>
              </svg>
            </div>

            <div data-proto-id="topPost" style={{ background: C.container, border: `1px solid ${C.outlineVar}`, borderRadius: 10, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>本周最佳</span>
                <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 999, background: 'rgba(255,215,0,0.14)', color: C.primary }}>点击率 5.6%</span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: 999, background: C.containerHigh, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>启</span>
                <span>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>启明工作室</span>
                  <span style={{ display: 'block', fontSize: 12, color: C.variant }}>{p.handle}</span>
                </span>
              </div>
              <p style={{ margin: '0 0 10px', fontSize: 15, lineHeight: 1.6 }}>把设计稿拆成可复用的三层：结构、内容、状态。改起来只动一层，其他地方不会跟着塌。</p>
              <div style={{ aspectRatio: '16 / 9', background: C.containerLow, border: `1px solid ${C.outlineVar}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: C.variant }}>配图占位</div>
            </div>
          </div>

          {/* 下网格 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div data-proto-id="trending" style={{ background: C.container, border: `1px solid ${C.outlineVar}`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{p.name} 上的热门话题</div>
              {[
                { t: '设计系统', n: 128, s: [4, 6, 5, 8, 7, 9, 8, 11, 10, 12] },
                { t: '原型交付', n: 96, s: [3, 4, 6, 5, 7, 6, 8, 7, 9, 10] },
                { t: '组件复用', n: 74, s: [6, 5, 5, 4, 6, 7, 6, 5, 7, 8] },
                { t: '暗色适配', n: 52, s: [2, 3, 4, 5, 4, 6, 5, 6, 4, 5] },
                { t: '字号阶梯', n: 33, s: [5, 4, 4, 3, 4, 3, 4, 3, 2, 3] },
              ].map((r) => {
                const mx = Math.max(...r.s), mn = Math.min(...r.s);
                const pts = r.s.map((v, i) => `${(i * 100) / 9},${16 - ((v - mn) / (mx - mn || 1)) * 16}`).join(' ');
                return (
                  <div key={r.t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${C.outlineVar}` }}>
                    <span style={{ fontSize: 14, minWidth: 0 }}>{r.t}</span>
                    <span style={{ fontSize: 12, color: C.variant, whiteSpace: 'nowrap' }}>{r.n} 条</span>
                    <svg viewBox="0 0 100 16" preserveAspectRatio="none" style={{ width: 80, height: 16, marginLeft: 'auto', flexShrink: 0 }} aria-hidden="true">
                      <polyline points={pts} fill="none" stroke={C.secondary} strokeWidth="1.5" />
                    </svg>
                  </div>
                );
              })}
            </div>

            <div data-proto-id="comments" style={{ background: C.container, border: `1px solid ${C.outlineVar}`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>精选评论</div>
              {[
                { n: '林可', v: true, c: '这套分层思路正好解决我们改一处崩三处的问题，已转给团队。', l: 312, r: 18 },
                { n: '赵珩', v: false, c: '想问下状态层是怎么和组件库对齐的？我们这边总是对不上。', l: 148, r: 9 },
                { n: '吴恙', v: false, c: '看完直接重构了一版设计稿，交付评审一次过。', l: 96, r: 4 },
              ].map((c) => (
                <div key={c.n} style={{ padding: '10px 0', borderTop: `1px solid ${C.outlineVar}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 999, background: C.containerHigh, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>{c.n.slice(0, 1)}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{c.n}</span>
                    {c.v && <span style={{ fontSize: 11, color: C.secondary, border: `1px solid ${C.secondary}`, borderRadius: 999, padding: '1px 6px' }}>已认证</span>}
                  </div>
                  <p style={{ margin: '0 0 4px', fontSize: 14, lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.c}</p>
                  <div style={{ fontSize: 12, color: C.variant }}>赞 {c.l} · 回复 {c.r}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PrototypeLayout>
  );
}
