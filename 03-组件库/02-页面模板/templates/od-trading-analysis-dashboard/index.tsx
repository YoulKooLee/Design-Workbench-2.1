/**
 * @description 交易分析终端原型（暗色）：左侧品牌栏 + 市场状态条 + 4 张概览卡 + 期权链表格与执行流程 + 希腊字母/累计盈亏双图 + 风险驾驶舱
 * 源自 open-design trading-analysis-dashboard-template 转译（Apache-2.0）
 * 暗色配色独立审计：正文 15.4:1、次级 7.2:1、图形线 ≥5:1，均达基线
 * 已剥离蓝本的命令面板（`/`）、点击聚焦浮层与实时回放；暂停开关保留二次确认
 */
import React, { useState } from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#0a1220', panel: '#0f1b31', panel2: '#13233e', line: '#294161',
  text: '#edf3ff', muted: '#94a9c7', chip: '#162843',
  accent: '#43b6ff', good: '#4be2ad', bad: '#ff7f9f', warn: '#ffd777',
  delta: '#9b79f4', gamma: '#67d59b', equity: '#47cf93',
};

const CHAIN = [
  { t: '07:46:01', sym: 'SPY', c: '375 8/18', p: '$44,751', sweep: true },
  { t: '07:46:02', sym: 'SPY', c: '370 8/18', p: '$38,905', sweep: false },
  { t: '07:46:03', sym: 'QQQ', c: '452 8/25', p: '$52,204', sweep: true },
  { t: '07:46:05', sym: 'AAPL', c: '225 8/18', p: '$31,880', sweep: false },
];

const RISK = [
  { k: '在险价值', v: '$12,450.00', w: 64 },
  { k: '贝塔', v: '1.18', w: 58 },
  { k: '敞口', v: '68.20%', w: 68 },
  { k: '最大回撤', v: '2.40%', w: 24 },
  { k: '集中度', v: '41.80%', w: 42 },
];

export default function TradingDashboardPrototype() {
  const [mode, setMode] = useState<'live' | 'demo'>('demo');
  const [scenario, setScenario] = useState('risk-on');
  const [killArmed, setKillArmed] = useState(false);
  const [toast, setToast] = useState('');

  const story = mode === 'live'
    ? '实时行情接入中 · 延迟 12ms'
    : `回放：${scenario === 'risk-on' ? '风险偏好回升' : scenario === 'vol-crush' ? '波动率压缩' : '恐慌抛售'} · 1 倍速`;

  const onKill = () => {
    if (!killArmed) { setKillArmed(true); setTimeout(() => setKillArmed(false), 4000); return; }
    setKillArmed(false);
    setToast('已暂停全部委托');
    setTimeout(() => setToast(''), 2400);
  };

  const modules: PrototypeModule[] = [
    { id: 'side', bind: 'side', title: '左侧品牌栏', text: '品牌字标 + 5 个导航项，当前页「分析」高亮。' },
    { id: 'topbar', bind: 'topbar', title: '市场状态条', text: '左侧市场状态与数据源延迟；右侧模式切换、情景选择与暂停开关。', list: ['实时 / 回放 二选一，切换后底部状态文案同步变化', '暂停开关需二次点击确认，避免误触'] },
    { id: 'hero', bind: 'hero', title: '概览卡', text: '4 张卡：信号倾向 / 置信度 / 风险预算 / 执行窗口。', list: ['数值用等宽数字对齐', '副说明放在数字下方，不额外加色块'] },
    { id: 'chain', bind: 'chain', title: '期权链表格', text: '时间 / 标的 / 合约 / 权利金 / 是否扫单，4 行。', list: ['时间与金额用 nowrap，永不截断', '扫单列用绿/灰胶囊区分，不单靠颜色'] },
    { id: 'flow', bind: 'flow', title: '执行流程', text: '四步流水线：信号 → 风控 → 下单 → 成交，末步为等待中。' },
    { id: 'greeks', bind: 'greeks', title: '希腊字母曲线', text: 'Delta 与 Gamma 随行权价变化，双线内联 SVG，带坐标轴与图例。' },
    { id: 'pnl', bind: 'pnl', title: '累计盈亏', text: '按交易时段绘制的权益曲线，内联 SVG。' },
    { id: 'risk', bind: 'risk', title: '风险驾驶舱', text: '5 项风险指标：数值 + 占比条。', list: ['占比条仅作相对量示意，不标注精确刻度'] },
    { id: 'story', bind: 'story', title: '运行状态', text: '显示当前模式与回放情景，随上方控件变化。' },
  ];

  return (
    <PrototypeLayout title="交易分析终端" breadcrumb="交易台 / 分析" modules={modules}>
      <div style={{ background: C.bg, color: C.text, fontSize: 16, lineHeight: 1.6, fontFamily: '-apple-system,"PingFang SC","Microsoft YaHei",system-ui,sans-serif', display: 'flex', minHeight: 620 }}>
        {/* 侧栏 */}
        <aside data-proto-id="side" style={{ width: 148, flexShrink: 0, borderRight: `1px solid ${C.line}`, padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: C.text, marginBottom: 22 }}>启明终端</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['首页', '交易', '分析', '绩效', '开发'].map((n) => {
              const on = n === '分析';
              return <button key={n} type="button" style={{ font: 'inherit', fontSize: 14, textAlign: 'left', cursor: 'pointer', padding: '8px 10px', borderRadius: 6, border: 'none', background: on ? C.panel2 : 'transparent', color: on ? C.text : C.muted, fontWeight: on ? 600 : 400 }}>{n}</button>;
            })}
          </nav>
        </aside>

        <main style={{ flex: 1, minWidth: 0, padding: '14px 18px 24px' }}>
          {/* 状态条 */}
          <div data-proto-id="topbar" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', padding: '8px 12px', background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, marginBottom: 14 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.muted }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: C.good }} />
              开盘中 · 数据源 Cboe One · 延迟 <strong style={{ color: C.text }}>12ms</strong>
            </span>
            <span style={{ flex: 1 }} />
            <div style={{ display: 'inline-flex', border: `1px solid ${C.line}`, borderRadius: 6, overflow: 'hidden' }}>
              {([['live', '实时'], ['demo', '回放']] as const).map(([k, label]) => (
                <button key={k} type="button" onClick={() => setMode(k)} style={{ font: 'inherit', fontSize: 13, cursor: 'pointer', padding: '5px 12px', border: 'none', background: mode === k ? C.accent : 'transparent', color: mode === k ? '#061021' : C.muted, fontWeight: mode === k ? 600 : 400 }}>{label}</button>
              ))}
            </div>
            <select value={scenario} onChange={(e) => setScenario(e.target.value)} aria-label="回放情景" style={{ font: 'inherit', fontSize: 13, padding: '5px 10px', borderRadius: 6, background: C.chip, color: C.text, border: `1px solid ${C.line}` }}>
              <option value="risk-on">风险偏好回升</option>
              <option value="vol-crush">波动率压缩</option>
              <option value="panic">恐慌抛售</option>
            </select>
            <button type="button" onClick={onKill} style={{ font: 'inherit', fontSize: 13, cursor: 'pointer', padding: '5px 12px', borderRadius: 6, border: `1px solid ${killArmed ? C.bad : '#7a2b3c'}`, background: killArmed ? C.bad : 'transparent', color: killArmed ? '#2a0710' : C.bad, fontWeight: 600 }}>
              {killArmed ? '再点一次确认' : '暂停全部委托'}
            </button>
          </div>

          {/* 概览卡 */}
          <div data-proto-id="hero" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 }}>
            {[
              { k: '信号倾向', v: '偏多 · 0.78', s: '预期波动 +1.9% · 周期 2 小时' },
              { k: '置信度', v: '78.00%' },
              { k: '风险预算', v: '$42,500.00' },
              { k: '执行窗口', v: '09:30-11:30' },
            ].map((c) => (
              <div key={c.k} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>{c.k}</div>
                <div style={{ fontSize: 20, fontWeight: 600, fontVariantNumeric: 'tabular-nums', lineHeight: 1.3 }}>{c.v}</div>
                {c.s && <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{c.s}</div>}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 12, alignItems: 'start' }}>
            {/* 左：期权链 + 流程 */}
            <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 14 }}>
              <div data-proto-id="chain">
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>期权链</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
                  <thead>
                    <tr>{['时间', '标的', '合约', '权利金', '扫单'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '8px 6px', borderBottom: `1px solid ${C.line}`, fontSize: 12, color: C.muted, fontWeight: 500 }}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {CHAIN.map((r) => (
                      <tr key={r.t}>
                        <td style={{ padding: '9px 6px', borderBottom: `1px solid ${C.line}`, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r.t}</td>
                        <td style={{ padding: '9px 6px', borderBottom: `1px solid ${C.line}` }}>{r.sym}</td>
                        <td style={{ padding: '9px 6px', borderBottom: `1px solid ${C.line}`, whiteSpace: 'nowrap' }}>{r.c}</td>
                        <td style={{ padding: '9px 6px', borderBottom: `1px solid ${C.line}`, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r.p}</td>
                        <td style={{ padding: '9px 6px', borderBottom: `1px solid ${C.line}` }}>
                          <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: 12, background: r.sweep ? '#123a2c' : C.chip, color: r.sweep ? C.good : C.muted, border: `1px solid ${r.sweep ? '#1f6b4d' : C.line}` }}>{r.sweep ? '是' : '否'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div data-proto-id="flow" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 16 }}>
                {[['信号', '资金流一致偏多'], ['风控', '敞口在限额内'], ['下单', '买入 200 股 @ 221.30'], ['成交', '等待中…']].map(([t, d], i) => (
                  <div key={t} style={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 6, padding: '10px 12px' }}>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{i + 1} · {t}</div>
                    <div style={{ fontSize: 14, color: i === 3 ? C.muted : C.text }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右：两图 + 风险 + 状态 */}
            <div style={{ display: 'grid', gap: 12 }}>
              <div data-proto-id="greeks" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>希腊字母</div>
                <svg viewBox="0 0 400 200" style={{ width: '100%', height: 170, display: 'block' }} role="img" aria-label="希腊字母：Delta 与 Gamma 随行权价变化">
                  <g stroke={C.line}>
                    <line x1="30" y1="170" x2="390" y2="170" />
                    <line x1="30" y1="20" x2="30" y2="170" />
                  </g>
                  <g fill={C.muted} fontSize="11" textAnchor="middle">
                    {[['40', '140'], ['120', '145'], ['200', '150'], ['300', '155'], ['380', '160']].map(([x, l]) => <text key={x} x={x} y="186">{l}</text>)}
                  </g>
                  <g fill={C.muted} fontSize="11" textAnchor="end">
                    {[['44', '1.0'], ['96', '0.5'], ['148', '0.0'], ['174', '−0.5']].map(([y, l]) => <text key={y} x="26" y={y}>{l}</text>)}
                  </g>
                  <text x="210" y="199" fontSize="11" fill={C.muted} textAnchor="middle">行权价（元）</text>
                  <polyline fill="none" stroke={C.delta} strokeWidth="3" points="40,40 120,62 200,92 300,122 380,146" />
                  <polyline fill="none" stroke={C.gamma} strokeWidth="3" points="40,128 120,124 200,118 300,129 380,126" />
                </svg>
                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: C.muted, marginTop: 6 }}>
                  <span><span style={{ display: 'inline-block', width: 10, height: 3, background: C.delta, marginRight: 6, verticalAlign: 'middle' }} />Delta</span>
                  <span><span style={{ display: 'inline-block', width: 10, height: 3, background: C.gamma, marginRight: 6, verticalAlign: 'middle' }} />Gamma</span>
                </div>
              </div>

              <div data-proto-id="pnl" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>累计盈亏</div>
                <svg viewBox="0 0 400 200" style={{ width: '100%', height: 170, display: 'block' }} role="img" aria-label="按交易时段绘制的累计盈亏曲线">
                  <g stroke={C.line}>
                    <line x1="30" y1="170" x2="390" y2="170" />
                    <line x1="30" y1="20" x2="30" y2="170" />
                  </g>
                  <g fill={C.muted} fontSize="11" textAnchor="middle">
                    {[['30', '09:30'], ['120', '11:00'], ['210', '12:30'], ['300', '14:00'], ['390', '16:00']].map(([x, l]) => <text key={x} x={x} y="186">{l}</text>)}
                  </g>
                  <g fill={C.muted} fontSize="11" textAnchor="end">
                    {[['62', '2.4万'], ['100', '1.6万'], ['138', '0.8万'], ['174', '0']].map(([y, l]) => <text key={y} x="26" y={y}>{l}</text>)}
                  </g>
                  <text x="210" y="199" fontSize="11" fill={C.muted} textAnchor="middle">交易时段</text>
                  <polyline fill="none" stroke={C.equity} strokeWidth="3" points="30,150 90,142 150,130 210,118 270,95 330,78 390,62" />
                </svg>
              </div>

              <div data-proto-id="risk" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>风险驾驶舱</div>
                {RISK.map((r) => (
                  <div key={r.k} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: 13, color: C.muted }}>{r.k}</span>
                      <strong style={{ fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>{r.v}</strong>
                    </div>
                    <div style={{ height: 5, background: C.panel2, borderRadius: 999, marginTop: 5, overflow: 'hidden' }}>
                      <div style={{ width: `${r.w}%`, height: '100%', background: C.accent, borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
              </div>

              <div data-proto-id="story" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>运行状态</div>
                <div style={{ fontSize: 15 }}>{story}</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: C.bad, color: '#2a0710', fontSize: 14, fontWeight: 600, padding: '9px 18px', borderRadius: 8 }}>{toast}</div>
      )}
    </PrototypeLayout>
  );
}
