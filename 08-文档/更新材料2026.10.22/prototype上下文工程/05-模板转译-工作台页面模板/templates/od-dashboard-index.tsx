/**
 * @description 运营管理仪表盘原型：左侧导航 + 顶部操作栏 + KPI 指标卡 + 收入趋势图 + 新账户/最近事件列表
 * 源自 open-design dashboard 模板转译（原型框架 · 页面模板）
 */
import React from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#fafaf9', fg: '#1c1b1a', muted: '#6b6964', border: '#e6e4e0',
  accent: '#c96442', surface: '#ffffff', good: '#2f7d4a', bad: '#b53a2a',
};

export default function DashboardPrototype() {
  const modules: PrototypeModule[] = [
    { id: 'sidebar', title: '侧栏导航', text: '品牌标识 + 8 个导航项，当前页用强调色高亮。', list: ['Overview 为当前页', 'Workspace 分组：Sources / Members / Billing / Settings'] },
    { id: 'topbar', title: '顶部操作栏', bind: 'topbar', text: '页面标题 + 时间范围选择 + 新建报告按钮。', list: ['标题：总览 · 2026 年 4 月', '主按钮「+ 新建报告」用强调色'] },
    { id: 'kpis', title: '核心指标卡', bind: 'kpis', text: '4 张指标卡：标签 + 大数字 + 环比变化。', list: ['月经常性收入 48.2K，环比 +12.4%', '活跃账户 3,184，本月 +204', '30 天流失率 2.1%，+0.4 个百分点', 'P95 延迟 182ms，-23ms'] },
    { id: 'chart', title: '收入趋势图', bind: 'trend-chart', text: '近 30 天收入折线图，内联 SVG 绘制、强调色描边，不使用图表库。' },
    { id: 'signups', title: '新账户列表', bind: 'signups-panel', text: '最近新增账户：账户名 + 套餐 + 状态徽标。', list: ['active 进行中 / trial 试用中'] },
    { id: 'events', title: '最近事件', bind: 'recent-events', text: '账户动态：时间 + 账户 + 事件 + 套餐。' },
  ];

  return (
    <PrototypeLayout title="运营管理仪表盘" breadcrumb="仪表盘 / 总览" modules={modules}>
      {/* 侧栏 */}
      <div data-proto-id="sidebar" style={{ display: 'flex', minHeight: 480 }}>
        <div style={{ width: 200, flexShrink: 0, background: C.surface, borderRight: `1px solid ${C.border}`, padding: 14 }}>
          <div style={{ fontWeight: 600, padding: '8px 10px 18px' }}>◐ Pulse 运营台</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {['总览', '转化漏斗', '用户群组', '会话分析'].map((n) => (
              <a key={n} style={{ padding: '7px 10px', borderRadius: 6, color: C.fg, textDecoration: 'none', fontWeight: n === '总览' ? 500 : undefined, background: n === '总览' ? C.bg : undefined }}>{n}</a>
            ))}
            <div style={{ fontSize: 11, color: C.muted, padding: '14px 10px 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>工作区</div>
            {['来源', '成员', '账单', '设置'].map((n) => (
              <a key={n} style={{ padding: '7px 10px', borderRadius: 6, color: C.fg, textDecoration: 'none' }}>{n}</a>
            ))}
          </nav>
        </div>

        {/* 主区 */}
        <div style={{ flex: 1, padding: '0 22px 40px', minWidth: 0 }}>
          {/* 顶栏 */}
          <div data-proto-id="topbar" style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${C.border}`, marginBottom: 22 }}>
            <h1 style={{ fontSize: 20, margin: 0, letterSpacing: '-0.01em', color: C.fg }}>总览 · 2026 年 4 月</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button style={{ font: 'inherit', cursor: 'pointer', padding: '7px 13px', borderRadius: 6, background: 'transparent', color: C.fg, border: `1px solid ${C.border}` }}>最近 30 天 ▾</button>
              <button style={{ font: 'inherit', cursor: 'pointer', padding: '7px 13px', borderRadius: 6, background: C.accent, color: '#fff', border: `1px solid ${C.accent}` }}>+ 新建报告</button>
            </div>
          </div>

          {/* KPI 卡片 */}
          <div data-proto-id="kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: '月经常性收入', value: '$48.2K', delta: '+12.4% 环比', up: true },
              { label: '活跃账户', value: '3,184', delta: '+204 本月', up: true },
              { label: '流失率（30天）', value: '2.1%', delta: '+0.4 百分点', up: false },
              { label: 'P95 延迟', value: '182 ms', delta: '-23 ms', up: true },
            ].map((k) => (
              <div key={k.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{k.label}</div>
                <div style={{ fontSize: 26, letterSpacing: '-0.02em', color: C.fg }}>{k.value}</div>
                <div style={{ fontSize: 12, marginTop: 4, color: k.up ? C.good : C.bad }}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* 图表 + 新账户 */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
            <div data-proto-id="trend-chart" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 500, color: C.fg }}>收入 · 近 30 天</h3>
              <svg viewBox="0 0 600 240" preserveAspectRatio="none" style={{ width: '100%', height: 190, display: 'block' }}>
                <polyline fill="none" stroke={C.accent} strokeWidth="2" points="0,180 30,170 60,150 90,160 120,140 150,120 180,130 210,110 240,90 270,100 300,80 330,70 360,80 390,60 420,50 450,60 480,40 510,30 540,40 570,20 600,10" />
              </svg>
            </div>
            <div data-proto-id="signups-panel" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 500, color: C.fg }}>新账户</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr>
                    {['账户', '套餐', '状态'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '8px 4px', borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[['Linear', '团队版', true], ['Cursor', '专业版', true], ['Notion', '团队版', false], ['Vercel', '企业版', true]].map((r) => (
                    <tr key={r[0]}>
                      <td style={{ padding: '8px 4px', borderTop: `1px solid ${C.border}`, color: C.fg }}>{r[0]}</td>
                      <td style={{ padding: '8px 4px', borderTop: `1px solid ${C.border}`, color: C.fg }}>{r[1]}</td>
                      <td style={{ padding: '8px 4px', borderTop: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: C.bg, border: `1px solid ${C.border}`, color: r[2] ? C.good : C.bad }}>{r[2] ? '进行中' : '试用中'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 最近事件 */}
          <div data-proto-id="recent-events" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginTop: 14 }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 500, color: C.fg }}>最近事件</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['时间', '账户', '事件', '套餐'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '8px 4px', borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[['14:14', '启明科技', '升级到团队版', '团队版'], ['13:48', '北方数据', '接入 GitHub', '专业版'], ['13:32', '环球贸易', '取消订阅', '个人版'], ['12:51', '英创软件', '新增成员席位', '团队版']].map((r) => (
                  <tr key={r[2]}>
                    {r.map((c) => <td key={c} style={{ padding: '8px 4px', borderTop: `1px solid ${C.border}`, color: C.fg }}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PrototypeLayout>
  );
}
