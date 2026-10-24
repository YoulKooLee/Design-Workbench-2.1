/**
 * @description 社媒矩阵数据看板原型（暗色）：顶部栏 + 概览条 + 提问条 + 本期洞察 + 平台矩阵 + 指标条 + 增长曲线与本周最佳 + 待发内容/同行对比/互动构成 + 分时段互动/受众热力/评价构成/内容形态/趋势雷达/转化漏斗
 * 源自 open-design social-media-matrix-tracker-template 转译（Apache-2.0）
 * 暗色配色独立审计：正文 18:1、次级 7.9:1，均达基线
 * 已剥离蓝本的氛围光效、玻璃质感、图表 pin/拖拽/区间对比调试面板与 canvas 绘图（全部改内联 SVG）
 */
import React, { useState } from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#040612', panel: '#0c1222', panel2: '#0a0f1e', line: 'rgba(163,180,220,0.16)', lineStrong: 'rgba(163,180,220,0.28)',
  text: '#edf2ff',
  // 三级文字较蓝本（#636f8b 3.7:1）加深至 5.4:1
  muted: '#9ea9c5', soft: '#7d8aa6',
  good: '#68e4bd', blue: '#67b9ff', violet: '#9a86ff', yellow: '#f3d26e', pink: '#cc8cff', danger: '#ff7d94',
};

type PKey = 'x' | 'in' | 'bili' | 'xhs';
const PLATFORMS: Record<PKey, { name: string; handle: string; mono: string; followers: string; growth: string; eng: string; reach: string }> = {
  x: { name: 'X', handle: '@qimingstudio', mono: '𝕏', followers: '184.3K', growth: '+4.2%', eng: '6.8%', reach: '4.2M' },
  in: { name: '领英', handle: '启明工作室', mono: 'in', followers: '61.2K', growth: '+2.1%', eng: '4.3%', reach: '820K' },
  bili: { name: 'B站', handle: '启明设计日志', mono: 'B', followers: '93.6K', growth: '+5.4%', eng: '7.9%', reach: '2.6M' },
  xhs: { name: '小红书', handle: '启明工作室', mono: '书', followers: '47.8K', growth: '+3.3%', eng: '5.6%', reach: '1.1M' },
};

const HOURS = [12, 8, 5, 3, 4, 9, 22, 38, 46, 41, 35, 30, 33, 39, 44, 52, 58, 61, 55, 48, 40, 31, 22, 16];
const MIX = [
  { label: '视频', a: 46, b: 31, c: 23 },
  { label: '长帖', a: 28, b: 44, c: 28 },
  { label: '图文', a: 34, b: 26, c: 40 },
];
const MIX_COLOR = [C.violet, C.blue, C.good];
const SENTIMENT = [
  { label: '正面', v: 64, color: C.good },
  { label: '中性', v: 27, color: C.blue },
  { label: '负面', v: 9, color: C.danger },
];
const FUNNEL = [
  { k: '曝光', v: '4.2M', w: 100 },
  { k: '主页访问', v: '428K', w: 41 },
  { k: '关注', v: '4.9万', w: 24 },
  { k: '付费线索', v: '8.2千', w: 11 },
];
const RADAR = [
  { t: '设计系统', d: '+28%', up: true }, { t: '组件复用', d: '+19%', up: true }, { t: '暗色适配', d: '+15%', up: true },
  { t: '创作者经济', d: '-4%', up: false }, { t: '提示词工程', d: '-8%', up: false }, { t: '公开构建', d: '+11%', up: true },
];
const HEAT = [0.2, 0.35, 0.6, 0.85, 0.7, 0.5];

function BarRow({ label, value, w, color }: { label: string; value: string; w: number; color: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
        <span style={{ color: C.muted }}>{label}</span>
        <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</strong>
      </div>
      <div style={{ height: 6, background: C.panel2, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: `${w}%`, height: '100%', background: color, borderRadius: 999 }} />
      </div>
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: 16, ...style }}>{children}</div>;
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: C.text }}>{children}</h3>;
}

export default function MatrixTrackerPrototype() {
  const [plat, setPlat] = useState<PKey>('x');
  const [range, setRange] = useState('30 天');
  const p = PLATFORMS[plat];

  const modules: PrototypeModule[] = [
    { id: 'topbar', bind: 'topbar', title: '顶部栏', text: '创作者名与「分析」标签 + 时间范围按钮组 + 用户信息。', list: ['时间范围四选一，切换后概览与图表标题同步', '不做明暗主题切换：暗色已独立审计，浅色需另行配色'] },
    { id: 'hero', bind: 'hero', title: '概览条', text: '一句话本周产出结论 + 一行对比数据 + 三个操作按钮。', list: ['主按钮「新建内容」为实心高亮', '另两个为描边次按钮'] },
    { id: 'ask', bind: 'ask', title: '提问条', text: '单行输入，占位示例给出两个可问的问题。' },
    { id: 'insights', bind: 'insights', title: '本期洞察', text: '四格结论：本期焦点 / 最佳时段 / 环比 / 下一步建议。', list: ['蓝本此处为图表调试面板（固定点/区间对比/AB 对比），已改为面向使用者的结论式洞察'] },
    { id: 'platforms', bind: 'platforms', title: '平台矩阵', text: '4 张卡：字母标 + 平台名 + 账号 + 粉丝数与涨幅。', list: ['选中平台描边高亮', '切换后下方指标与概览同步'] },
    { id: 'kpis', bind: 'kpis', title: '指标条', text: '4 项：粉丝总量 / 净增 / 互动率 / 触达账号数。' },
    { id: 'growth', bind: 'growth', title: '粉丝增长曲线', text: '大数字总量 + 30 天增长曲线（内联 SVG 单色描边）+ 三个关键节点图例。', list: ['曲线改单色描边：蓝本渐变属无商业理由装饰'] },
    { id: 'topPost', bind: 'topPost', title: '本周最佳', text: '内容卡片 + 两项质量指标条（触达质量 / 观众留存）。' },
    { id: 'drafts', bind: 'drafts', title: '待发与草稿', text: '4 行内容计划，状态用胶囊区分：已排期 / 草稿 / 想法。' },
    { id: 'benchmark', bind: 'benchmark', title: '同行对比', text: '4 行对比表：对象 / 粉丝 / 增速 / 互动率。', list: ['本行加粗并用强调色标注', '数字列等宽对齐、不换行'] },
    { id: 'engMix', bind: 'engMix', title: '互动构成', text: '大数字互动率 + 点赞/评论/转发/收藏四项占比。' },
    { id: 'hourly', bind: 'hourly', title: '分时段互动', text: '24 小时互动量柱状图，内联 SVG 绘制。' },
    { id: 'heatmap', bind: 'heatmap', title: '受众活跃热力', text: '6 天 × 8 时段活跃度网格，用透明度深浅表示强度。' },
    { id: 'sentiment', bind: 'sentiment', title: '评价构成', text: '环形图：正面 64% / 中性 27% / 负面 9%，内联 SVG 圆弧。' },
    { id: 'mix', bind: 'mix', title: '内容形态表现', text: '视频 / 长帖 / 图文三类形态的表现对比柱，内联 SVG。' },
    { id: 'radar', bind: 'radar', title: '趋势雷达', text: '6 个话题的涨跌列表，涨用绿、跌用红并保留正负号。' },
    { id: 'funnel', bind: 'funnel', title: '转化漏斗', text: '曝光 → 主页访问 → 关注 → 付费线索，四层占比条。' },
  ];

  const maxH = Math.max(...HOURS);
  const bw = 100 / HOURS.length;
  const R = 52, CIRC = 2 * Math.PI * R;
  let offset = 0;

  return (
    <PrototypeLayout title="社媒矩阵数据看板" breadcrumb="内容运营 / 矩阵分析" modules={modules}>
      <div style={{ background: C.bg, color: C.text, fontSize: 16, lineHeight: 1.6, fontFamily: '-apple-system,"PingFang SC","Microsoft YaHei",system-ui,sans-serif', padding: '0 20px 28px' }}>
        {/* 顶栏 */}
        <div data-proto-id="topbar" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: `1px solid ${C.line}`, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700 }}>启明工作室</span>
          <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 999, border: `1px solid ${C.lineStrong}`, color: C.muted }}>分析</span>
          <span style={{ flex: 1 }} />
          {['7 天', '30 天', '90 天', '今年以来'].map((r) => (
            <button key={r} type="button" onClick={() => setRange(r)} style={{ font: 'inherit', fontSize: 13, cursor: 'pointer', padding: '5px 12px', borderRadius: 6, border: `1px solid ${range === r ? C.blue : C.line}`, background: range === r ? 'rgba(103,185,255,0.14)' : 'transparent', color: range === r ? C.blue : C.muted }}>{r}</button>
          ))}
          <span style={{ fontSize: 13, color: C.muted }}>启明工作室</span>
          <span style={{ width: 28, height: 28, borderRadius: 999, background: C.panel2, border: `1px solid ${C.lineStrong}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>启</span>
        </div>

        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          {/* 概览 */}
          <div data-proto-id="hero" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 0 18px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.35 }}>本周在 {p.name} 发布了 14 条内容。</h1>
              <p style={{ margin: '6px 0 0', fontSize: 14, color: C.muted }}>互动率较上周提升 0.4 个百分点 · 最高一条触达 {p.reach} 个账号 · 统计区间：{range}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['导出报告', '自动生成摘要'].map((t) => (
                <button key={t} type="button" style={{ font: 'inherit', fontSize: 14, cursor: 'pointer', padding: '8px 14px', borderRadius: 8, border: `1px solid ${C.lineStrong}`, background: 'transparent', color: C.text }}>{t}</button>
              ))}
              <button type="button" style={{ font: 'inherit', fontSize: 14, cursor: 'pointer', padding: '8px 14px', borderRadius: 8, border: `1px solid ${C.blue}`, background: C.blue, color: '#04121f', fontWeight: 600 }}>新建内容 +</button>
            </div>
          </div>

          <div data-proto-id="ask">
            <input readOnly placeholder="问问你的内容表现 —— 上周表现最好的一条、来自认证账号的评论…" style={{ width: '100%', boxSizing: 'border-box', font: 'inherit', fontSize: 15, padding: '11px 14px', borderRadius: 10, border: `1px solid ${C.line}`, background: C.panel, color: C.text, marginBottom: 14 }} />
          </div>

          {/* 洞察 */}
          <div data-proto-id="insights" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 }}>
            {[
              { k: '本期焦点', v: '长帖带动关注转化', s: '触达质量高于视频 12 个百分点' },
              { k: '最佳时段', v: '18:00–20:00', s: '该时段互动量为日均的 1.7 倍' },
              { k: '环比变化', v: '互动率 +0.4%', s: '净增粉丝 4.2 千' },
              { k: '下一步', v: '补一条视频形态', s: '近两周视频占比偏低' },
            ].map((i) => (
              <div key={i.k} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, color: C.soft, marginBottom: 6 }}>{i.k}</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{i.v}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{i.s}</div>
              </div>
            ))}
          </div>

          {/* 平台矩阵 */}
          <div data-proto-id="platforms" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
            {(Object.keys(PLATFORMS) as PKey[]).map((k) => {
              const v = PLATFORMS[k]; const on = k === plat;
              return (
                <button key={k} type="button" onClick={() => setPlat(k)} style={{ font: 'inherit', textAlign: 'left', cursor: 'pointer', padding: '12px 14px', borderRadius: 10, border: `1px solid ${on ? C.blue : C.line}`, background: on ? 'rgba(103,185,255,0.1)' : C.panel, color: C.text }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: C.panel2, border: `1px solid ${C.line}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{v.mono}</span>
                    <span>
                      <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{v.name}</span>
                      <span style={{ display: 'block', fontSize: 12, color: C.soft }}>{v.handle}</span>
                    </span>
                  </span>
                  <span style={{ display: 'block', fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{v.followers}</span>
                  <span style={{ display: 'block', fontSize: 12, color: C.good, marginTop: 2 }}>↗ {v.growth}</span>
                </button>
              );
            })}
          </div>

          {/* KPI */}
          <div data-proto-id="kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
            {[
              { l: '粉丝总量', v: p.followers, s: '全平台合计' },
              { l: '净增粉丝', v: '4.2 千', s: '较上一周期 +18%' },
              { l: '互动率', v: p.eng, s: '较上一周期 +0.4%' },
              { l: '触达账号', v: p.reach, s: '去重后估算' },
            ].map((k) => (
              <div key={k.l} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, color: C.soft, marginBottom: 6 }}>{k.l}</div>
                <div style={{ fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums', lineHeight: 1.25 }}>{k.v}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{k.s}</div>
              </div>
            ))}
          </div>

          {/* 增长 + 最佳 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginBottom: 12 }}>
            <div data-proto-id="growth" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>粉丝增长 · 近 30 天</div>
              <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.2, fontVariantNumeric: 'tabular-nums' }}>184.3K</div>
              <div style={{ fontSize: 13, color: C.good, marginBottom: 8 }}>+4.2 千 净增</div>
              <svg viewBox="0 0 600 200" preserveAspectRatio="none" style={{ width: '100%', height: 150, display: 'block' }} role="img" aria-label="近 30 天粉丝增长曲线">
                <polygon points="20,185 20,150 120,132 220,118 330,96 440,74 570,48 570,185" fill={C.blue} fillOpacity="0.1" />
                <polyline points="20,150 120,132 220,118 330,96 440,74 570,48" fill="none" stroke={C.blue} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {[[120, 132, C.yellow], [330, 96, C.pink], [440, 74, C.good]].map(([x, y, c]) => (
                  <circle key={String(x)} cx={x} cy={y} r="5" fill={c as string} />
                ))}
              </svg>
              <div style={{ display: 'flex', gap: 14, fontSize: 12, color: C.muted, flexWrap: 'wrap' }}>
                {[['通讯发出 +642', C.yellow], ['爆款长帖 +1.2 千', C.pink], ['联合活动 +860', C.good]].map(([t, c]) => (
                  <span key={t as string}><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 999, background: c as string, marginRight: 6 }} />{t}</span>
                ))}
              </div>
            </div>

            <div data-proto-id="topPost" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>本周最佳 · {p.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.soft, marginBottom: 6 }}>
                <span>{p.handle}</span><span>{p.name}</span>
              </div>
              <p style={{ margin: '0 0 10px', fontSize: 15, lineHeight: 1.6 }}>不再追完美的提示词，先把手稿发出去。一个月后产出翻了五倍。</p>
              <div style={{ aspectRatio: '16 / 9', background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: C.soft, marginBottom: 14 }}>配图占位</div>
              <BarRow label="触达质量" value="82%" w={82} color={C.blue} />
              <BarRow label="观众留存" value="67%" w={67} color={C.good} />
            </div>
          </div>

          {/* 三卡 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
            <Card>
              <div data-proto-id="drafts">
                <CardTitle>待发与草稿</CardTitle>
                {[
                  ['长帖：组件库的边界', '已排期', true],
                  ['图文：工作室夜景', '草稿', false],
                  ['文章：我为什么不再追提示词', '已排期', true],
                  ['案例：企业内部设计工作坊', '想法', false],
                ].map(([t, s, hot]) => (
                  <div key={t as string} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderTop: `1px solid ${C.line}`, fontSize: 13 }}>
                    <span style={{ minWidth: 0 }}>{t}</span>
                    <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: 12, padding: '2px 8px', borderRadius: 999, background: hot ? 'rgba(104,228,189,0.14)' : C.panel2, color: hot ? C.good : C.muted, border: `1px solid ${hot ? 'rgba(104,228,189,0.4)' : C.line}` }}>{s}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div data-proto-id="benchmark">
                <CardTitle>同行对比</CardTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 6, fontSize: 12, color: C.soft, paddingBottom: 6, borderBottom: `1px solid ${C.line}` }}>
                  <span>对象</span><span>粉丝</span><span>增速</span><span>互动</span>
                </div>
                {[
                  ['本工作室', p.followers, p.growth, p.eng, true],
                  ['对照组 A', '4.8M', '+1.8%', '5.4%', false],
                  ['对照组 B', '2.2M', '+2.4%', '4.1%', false],
                  ['对照组 C', '850K', '+1.2%', '3.8%', false],
                ].map((r) => (
                  <div key={r[0] as string} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 6, fontSize: 13, padding: '8px 0', borderBottom: `1px solid ${C.line}`, color: r[4] ? C.text : C.muted, fontWeight: r[4] ? 600 : 400 }}>
                    <span style={{ minWidth: 0 }}>{r[0]}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r[1]}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', color: r[4] ? C.good : C.muted }}>{r[2]}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r[3]}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div data-proto-id="engMix">
                <CardTitle>互动构成</CardTitle>
                <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2, fontVariantNumeric: 'tabular-nums' }}>{p.eng}</div>
                <div style={{ fontSize: 12, color: C.soft, margin: '4px 0 12px' }}>本周构成</div>
                {[['点赞', '64%'], ['评论', '19%'], ['转发', '12%'], ['收藏', '5%']].map(([t, v]) => (
                  <div key={t} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '7px 0', borderTop: `1px solid ${C.line}` }}>
                    <span style={{ color: C.muted }}>{t}</span>
                    <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 深度区 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12, marginBottom: 12 }}>
            <Card>
              <div data-proto-id="hourly">
                <CardTitle>分时段互动（东八区）</CardTitle>
                <svg viewBox="0 0 600 180" preserveAspectRatio="none" style={{ width: '100%', height: 150, display: 'block' }} role="img" aria-label="24 小时互动量柱状图">
                  {HOURS.map((v, i) => {
                    const h = (v / maxH) * 150;
                    return <rect key={i} x={i * bw + '%' as unknown as number} y={160 - h} width={bw * 0.62 + '%' as unknown as number} height={h} rx="2" fill={C.violet} fillOpacity={v === maxH ? 1 : 0.72}>
                      <title>{`${i} 点：${v}`}</title>
                    </rect>;
                  })}
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.soft, marginTop: 4 }}>
                  <span>0 点</span><span>12 点</span><span>23 点</span>
                </div>
              </div>
            </Card>

            <div style={{ display: 'grid', gap: 12 }}>
              <Card>
                <div data-proto-id="heatmap">
                  <CardTitle>受众活跃热力</CardTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4 }}>
                    {HEAT.flatMap((row, r) => Array.from({ length: 8 }, (_, c) => {
                      const v = Math.min(1, Math.max(0.08, row * (0.5 + (c % 4) * 0.16) + (r % 3) * 0.05));
                      return <div key={`${r}-${c}`} style={{ aspectRatio: '1', borderRadius: 3, background: C.blue, opacity: v }} />;
                    }))}
                  </div>
                  <div style={{ fontSize: 12, color: C.soft, marginTop: 8 }}>近 6 天 × 8 个时段</div>
                </div>
              </Card>

              <Card>
                <div data-proto-id="sentiment">
                  <CardTitle>评价构成</CardTitle>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <svg viewBox="0 0 140 140" style={{ width: 120, height: 120, flexShrink: 0 }} role="img" aria-label="评价构成环形图：正面 64%、中性 27%、负面 9%">
                      <circle cx="70" cy="70" r={R} fill="none" stroke={C.panel2} strokeWidth="18" />
                      {SENTIMENT.map((s) => {
                        const len = (s.v / 100) * CIRC;
                        const el = <circle key={s.label} cx="70" cy="70" r={R} fill="none" stroke={s.color} strokeWidth="18" strokeDasharray={`${len} ${CIRC - len}`} strokeDashoffset={-offset} transform="rotate(-90 70 70)"><title>{`${s.label} ${s.v}%`}</title></circle>;
                        offset += len;
                        return el;
                      })}
                    </svg>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {SENTIMENT.map((s) => (
                        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                          <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
                          <span style={{ color: C.muted }}>{s.label}</span>
                          <strong style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>{s.v}%</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* 深度区 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12, marginBottom: 12 }}>
            <Card>
              <div data-proto-id="mix">
                <CardTitle>内容形态表现</CardTitle>
                <svg viewBox="0 0 600 180" style={{ width: '100%', height: 160, display: 'block' }} role="img" aria-label="内容形态表现对比柱状图">
                  {MIX.map((m, i) => {
                    const vals = [m.a, m.b, m.c];
                    const baseY = 40 + i * 46;
                    return (
                      <g key={m.label}>
                        <text x="0" y={baseY + 12} fontSize="13" fill={C.muted}>{m.label}</text>
                        {vals.map((v, j) => (
                          <rect key={j} x={60 + (j * 170)} y={baseY - 12} width={(v / 50) * 150} height="18" rx="3" fill={MIX_COLOR[j]}>
                            <title>{`${m.label} · ${['曝光', '互动', '转化'][j]}：${v}`}</title>
                          </rect>
                        ))}
                      </g>
                    );
                  })}
                  <g fontSize="12" fill={C.soft}>
                    <text x="60" y="168">曝光</text><text x="230" y="168">互动</text><text x="400" y="168">转化</text>
                  </g>
                </svg>
              </div>
            </Card>

            <Card>
              <div data-proto-id="radar">
                <CardTitle>趋势雷达</CardTitle>
                {RADAR.map((r) => (
                  <div key={r.t} style={{ display: 'flex', alignItems: 'center', fontSize: 13, padding: '8px 0', borderTop: `1px solid ${C.line}` }}>
                    <span>{r.t}</span>
                    <strong style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums', color: r.up ? C.good : C.danger }}>{r.d}</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 漏斗 */}
          <Card>
            <div data-proto-id="funnel">
              <CardTitle>跨平台转化漏斗</CardTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {FUNNEL.map((f) => (
                  <div key={f.k}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                      <span style={{ color: C.muted }}>{f.k}</span>
                      <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{f.v}</strong>
                    </div>
                    <div style={{ height: 6, background: C.panel2, borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ width: `${f.w}%`, height: '100%', background: C.violet, borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PrototypeLayout>
  );
}
