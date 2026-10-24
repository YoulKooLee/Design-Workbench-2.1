/**
 * @description 团队管理后台原型：三页签（成员 / 详情 / 动态）+ 4 项统计卡 + 成员表 + 在线人数折线 + 角色分布条形图 + 主要贡献者 + 活动趋势
 * 源自 open-design flowai-live-dashboard-template 转译（Apache-2.0）
 * 已剥离蓝本的 canvas 绘图（改内联 SVG）、点击放大面板与暗色切换；页签切换与导出由本地状态驱动
 */
import React, { useState } from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#d9d9de', app: '#f8f8fa', panel: '#ffffff', line: '#e9e9ed',
  text: '#1f2128',
  // 次级文字较蓝本（#8b8f9a 3.2:1）加深至 4.8:1
  muted: '#6b7280', hover: '#f3f4f7',
  accent: '#1f2937', bar: '#4b5563', barLabel: '#677084',
};

const MEMBERS = [
  { name: '陈舒', role: '编辑', status: '在线', wf: '33%' },
  { name: '林可', role: '负责人', status: '在线', wf: '24%' },
  { name: '赵珩', role: '编辑', status: '待接受', wf: '—' },
  { name: '吴恙', role: '查看者', status: '在线', wf: '18%' },
  { name: '周未', role: '编辑', status: '离线', wf: '12%' },
  { name: '孙迟', role: '查看者', status: '在线', wf: '9%' },
];

const PRESENCE = [8, 11, 14, 12, 15, 13, 16];
const ROLES = [
  { label: '编辑', value: 18 },
  { label: '负责人', value: 6 },
  { label: '查看者', value: 11 },
];
const TREND = [180, 240, 210, 290, 260, 320, 300];

function Sparkline({ data, width = 560, height = 150, color = C.accent }: { data: number[]; width?: number; height?: number; color?: string }) {
  const pad = 10;
  const max = Math.max(...data), min = Math.min(...data);
  const x = (i: number) => (i * (width - pad * 2)) / (data.length - 1) + pad;
  const y = (v: number) => height - pad - ((v - min) / (max - min || 1)) * (height - pad * 2);
  const pts = data.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height: height, display: 'block' }} role="img" aria-label="趋势折线图">
      {[0.25, 0.5, 0.75].map((f) => <line key={f} x1="0" y1={height * f} x2={width} y2={height * f} stroke={C.line} strokeWidth="1" />)}
      <polygon points={`${pad},${height - pad} ${pts} ${width - pad},${height - pad}`} fill={color} fillOpacity="0.16" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="#fff" stroke={color} strokeWidth="2">
          <title>{`第 ${i + 1} 点：${v}`}</title>
        </circle>
      ))}
    </svg>
  );
}

function BarChart() {
  const max = Math.max(...ROLES.map((r) => r.value));
  const W = 560, H = 150, barH = 26, gap = 18;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H, display: 'block' }} role="img" aria-label="角色分布条形图">
      {ROLES.map((r, i) => {
        const w = (r.value / max) * (W - 120);
        const y = i * (barH + gap) + 8;
        return (
          <g key={r.label}>
            <text x="0" y={y + barH / 2 + 5} fontSize="13" fill={C.barLabel}>{r.label}</text>
            <rect x="70" y={y} width={Math.max(w, 2)} height={barH} rx="4" fill={C.bar}>
              <title>{`${r.label}：${r.value} 人`}</title>
            </rect>
            <text x={70 + Math.max(w, 2) + 10} y={y + barH / 2 + 5} fontSize="13" fill={C.text} fontWeight="600">{r.value} 人</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function FlowaiDashboardPrototype() {
  const [tab, setTab] = useState<'members' | 'details' | 'activity'>('members');
  const [toast, setToast] = useState('');

  const exportCsv = () => {
    const head = '姓名,角色,状态,工作流进度\n';
    const body = MEMBERS.map((m) => `${m.name},${m.role},${m.status},${m.wf}`).join('\n');
    try {
      const blob = new Blob([head + body], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = '团队成员.csv'; a.click();
      URL.revokeObjectURL(url);
      setToast(`已导出 ${MEMBERS.length} 行`);
    } catch {
      setToast('当前环境不支持导出');
    }
    setTimeout(() => setToast(''), 2400);
  };

  // 模块随页签变化：未激活视图的模块不出现，保证每个 bind 都能在左侧找到对应元素（无孤儿 bind）
  const viewModules: Record<typeof tab, PrototypeModule[]> = {
    members: [
      { id: 'memberTable', bind: 'memberTable', title: '成员表', text: '姓名 / 角色 / 状态 / 工作流进度，共 6 行。', list: ['状态用浅底胶囊：在线 / 待接受 / 离线', '进度为空时显示「—」而不是留白'] },
      { id: 'presence', bind: 'presence', title: '在线人数', text: '近 7 个时点在线人数折线，内联 SVG 绘制，悬停显示具体数值。' },
    ],
    details: [
      { id: 'roles', bind: 'roles', title: '角色分布', text: '横向条形图：编辑 18 人 / 查看者 11 人 / 负责人 6 人，条形内嵌数值。' },
      { id: 'contributors', bind: 'contributors', title: '主要贡献者', text: '头像首字 + 姓名 + 提交次数，按次数从高到低。' },
    ],
    activity: [
      { id: 'trend', bind: 'trend', title: '活动趋势', text: '近 7 日活动量折线，内联 SVG 绘制。' },
      { id: 'log', bind: 'log', title: '操作记录', text: '时间 + 操作人 + 动作，倒序排列。' },
    ],
  };

  const modules: PrototypeModule[] = [
    { id: 'topbar', bind: 'topbar', title: '顶栏', text: '产品标识 + 主题按钮 + 导出按钮。', list: ['「导出表格」按当前成员表真实生成 CSV 并下载', '暗色切换未保留：暗色需独立配色审计，不在本批搬运范围'] },
    { id: 'tabs', bind: 'tabs', title: '三页签', text: '成员 / 详情 / 动态，单击切换，同一时刻只显示一个视图。', list: ['切换由本地状态驱动，不依赖地址栏', '当前页签下方用 2px 深色短线标识'] },
    { id: 'stats', bind: 'stats', title: '统计卡', text: '4 张卡片：成员总数 / 当前在线 / 今日运行次数 / 成功率。', list: ['数字 28px、字重 700', '卡片白底、1px 细边、8px 圆角，无阴影'] },
    ...viewModules[tab],
  ];

  const tabs: Array<[typeof tab, string]> = [['members', '团队成员'], ['details', '团队详情'], ['activity', '动态日志']];

  return (
    <PrototypeLayout title="团队管理后台" breadcrumb="管理后台 / 团队" modules={modules}>
      <div style={{ background: C.bg, padding: 16, color: C.text, fontSize: 16, lineHeight: 1.6, fontFamily: '-apple-system,"PingFang SC","Microsoft YaHei",system-ui,sans-serif' }}>
        <div style={{ background: C.app, borderRadius: 12, padding: 18, maxWidth: 1080 }}>
          <div data-proto-id="topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <strong style={{ fontSize: 16 }}>FlowAI · 团队管理</strong>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" style={{ font: 'inherit', fontSize: 13, cursor: 'pointer', padding: '6px 14px', borderRadius: 6, border: `1px solid ${C.line}`, background: C.panel, color: C.text }}>浅色</button>
              <button type="button" onClick={exportCsv} style={{ font: 'inherit', fontSize: 13, cursor: 'pointer', padding: '6px 14px', borderRadius: 6, border: `1px solid ${C.accent}`, background: C.accent, color: '#fff' }}>导出表格</button>
            </div>
          </div>

          <div data-proto-id="tabs" role="tablist" style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${C.line}`, marginBottom: 16 }}>
            {tabs.map(([key, label]) => (
              <button key={key} type="button" role="tab" aria-selected={tab === key} onClick={() => setTab(key)} style={{ font: 'inherit', fontSize: 14, cursor: 'pointer', padding: '8px 16px', border: 'none', borderBottom: `2px solid ${tab === key ? C.accent : 'transparent'}`, background: 'transparent', color: tab === key ? C.accent : C.muted, fontWeight: tab === key ? 600 : 400 }}>{label}</button>
            ))}
          </div>

          <div data-proto-id="stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
            {[{ k: '成员总数', v: '35' }, { k: '当前在线', v: '15' }, { k: '今日运行', v: '4,210' }, { k: '成功率', v: '98.6%' }].map((s) => (
              <div key={s.k} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>{s.k}</div>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{s.v}</div>
              </div>
            ))}
          </div>

          {tab === 'members' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
              <div data-proto-id="memberTable" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>成员</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr>{['姓名', '角色', '状态', '工作流'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '8px 6px', borderBottom: `1px solid ${C.line}`, fontSize: 12, color: C.muted, fontWeight: 500 }}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {MEMBERS.map((m) => (
                      <tr key={m.name}>
                        <td style={{ padding: '9px 6px', borderBottom: `1px solid ${C.line}` }}>{m.name}</td>
                        <td style={{ padding: '9px 6px', borderBottom: `1px solid ${C.line}`, color: C.muted }}>{m.role}</td>
                        <td style={{ padding: '9px 6px', borderBottom: `1px solid ${C.line}` }}>
                          <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: 12, background: m.status === '在线' ? '#e7f2ec' : (m.status === '待接受' ? '#fdf1dc' : '#eeeef1'), color: m.status === '在线' ? '#26543a' : (m.status === '待接受' ? '#7a5518' : '#5b5f68'), whiteSpace: 'nowrap' }}>{m.status}</span>
                        </td>
                        <td style={{ padding: '9px 6px', borderBottom: `1px solid ${C.line}`, whiteSpace: 'nowrap' }}>{m.wf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div data-proto-id="presence" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>在线人数</div>
                <Sparkline data={PRESENCE} />
              </div>
            </div>
          )}

          {tab === 'details' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
              <div data-proto-id="roles" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>角色分布</div>
                <BarChart />
              </div>
              <div data-proto-id="contributors" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>主要贡献者</div>
                {[{ n: '陈舒', c: 28 }, { n: '林可', c: 24 }, { n: '赵珩', c: 19 }, { n: '吴恙', c: 15 }].map((p) => (
                  <div key={p.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${C.line}` }}>
                    <span style={{ width: 26, height: 26, borderRadius: 999, background: C.hover, color: C.text, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{p.n.slice(0, 1)}</span>
                    <span style={{ fontSize: 14 }}>{p.n}</span>
                    <strong style={{ marginLeft: 'auto', fontSize: 14 }}>{p.c}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'activity' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
              <div data-proto-id="trend" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>活动趋势</div>
                <Sparkline data={TREND} />
              </div>
              <div data-proto-id="log" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>操作记录</div>
                {[['14:26', '林可', '邀请 2 位成员加入'], ['13:58', '陈舒', '运行「数据同步」'], ['11:12', '赵珩', '修改角色权限'], ['09:40', '吴恙', '导出成员表']].map((r, i) => (
                  <div key={r[0]} style={{ padding: '8px 0', borderTop: i ? `1px solid ${C.line}` : undefined, fontSize: 13 }}>
                    <span style={{ color: C.muted, marginRight: 8, fontVariantNumeric: 'tabular-nums' }}>{r[0]}</span>
                    <strong style={{ fontWeight: 600 }}>{r[1]}</strong> {r[2]}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: C.accent, color: '#fff', fontSize: 13, padding: '9px 18px', borderRadius: 8 }}>{toast}</div>
      )}
    </PrototypeLayout>
  );
}
