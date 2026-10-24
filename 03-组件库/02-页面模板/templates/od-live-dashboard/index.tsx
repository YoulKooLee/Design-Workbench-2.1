/**
 * @description 团队工作台仪表盘原型：侧栏工作区导航 + 面包屑与同步状态胶囊 + 页面头 + 说明条 + 4 项指标 + 近 7 日折线与动态流双栏 + 关联任务表
 * 源自 open-design live-dashboard 模板转译（Apache-2.0）
 * 已剥离蓝本的外部连接器与实时轮询：同步状态改由本地状态驱动（可在预览沙箱内工作）
 */
import React, { useEffect, useRef, useState } from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#ffffff', bgSoft: '#f7f6f3', bgHover: '#efeeec',
  ink: '#37352f',
  // 次级文字较蓝本（#787774 4.48:1 / #9b9a97 2.9:1）加深，达到 4.5:1 基线
  ink2: '#6b6966', ink3: '#706f6c',
  line: '#ececea', lineStrong: '#d3d1cb',
  accent: '#2eaadc', accentInk: '#0b6e91',
  pillDoneBg: '#dbeddb', pillDoneInk: '#2b593f',
  pillProgBg: '#fdecc8', pillProgInk: '#976d23',
  pillBlockBg: '#ffe2dd', pillBlockInk: '#b13b2c',
  pillTodoBg: '#e9e5e3', pillTodoInk: '#5a534f',
  pillReviewBg: '#d3e5ef', pillReviewInk: '#1f5b78',
};

const SPARK = [14, 9, 17, 12, 20, 11, 15];
const W = 600, H = 140, PAD = 12;
const maxV = Math.max(...SPARK), minV = Math.min(...SPARK);
const ptX = (i: number) => (i * (W - PAD * 2)) / (SPARK.length - 1) + PAD;
const ptY = (v: number) => H - PAD - ((v - minV) / (maxV - minV || 1)) * (H - PAD * 2);
const linePts = SPARK.map((v, i) => `${ptX(i).toFixed(1)},${ptY(v).toFixed(1)}`).join(' ');
const areaPts = `${PAD},${H - PAD} ${linePts} ${W - PAD},${H - PAD}`;

const FEED_SEED = [
  { who: '陈', name: '陈舒', act: '把「登录页适配」移到进行中', at: '12 分钟前' },
  { who: '林', name: '林可', act: '在「季度复盘」中留言', at: '38 分钟前' },
  { who: '赵', name: '赵珩', act: '完成了「接口限流方案」', at: '1 小时前' },
  { who: '吴', name: '吴恙', act: '新建文档「埋点口径说明」', at: '2 小时前' },
];

const ROWS = [
  { name: '登录页适配', status: '进行中', who: '陈舒', due: '10 月 26 日', pri: '高' },
  { name: '接口限流方案', status: '已完成', who: '赵珩', due: '10 月 24 日', pri: '高' },
  { name: '埋点口径说明', status: '待评审', who: '吴恙', due: '10 月 28 日', pri: '中' },
  { name: '季度复盘材料', status: '受阻', who: '林可', due: '10 月 30 日', pri: '中' },
  { name: '帮助中心改版', status: '待办', who: '周未', due: '11 月 4 日', pri: '低' },
];

const PILL: Record<string, { bg: string; ink: string }> = {
  已完成: { bg: C.pillDoneBg, ink: C.pillDoneInk },
  进行中: { bg: C.pillProgBg, ink: C.pillProgInk },
  受阻: { bg: C.pillBlockBg, ink: C.pillBlockInk },
  待办: { bg: C.pillTodoBg, ink: C.pillTodoInk },
  待评审: { bg: C.pillReviewBg, ink: C.pillReviewInk },
};

export default function LiveDashboardPrototype() {
  const [state, setState] = useState<'synced' | 'syncing'>('synced');
  const [auto, setAuto] = useState(true);
  const [feed, setFeed] = useState(FEED_SEED);
  const [kpi, setKpi] = useState({ total: 142, done: 23, docs: 7 });
  const [toast, setToast] = useState('');
  const [refreshedAt, setRefreshedAt] = useState('刚刚');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const refresh = () => {
    if (state === 'syncing') return;
    setState('syncing');
    timer.current = setTimeout(() => {
      const add = Math.floor(Math.random() * 3) + 1;
      setKpi((k) => ({ total: k.total + add, done: k.done + 1, docs: Math.max(0, k.docs - 1) }));
      setFeed((f) => [{ who: '陈', name: '陈舒', act: `更新了 ${add} 条任务状态`, at: '刚刚' }, ...f].slice(0, 5));
      setRefreshedAt('刚刚');
      setState('synced');
      setToast(`已同步 · 本次 ${add} 条变更`);
      toastTimer.current = setTimeout(() => setToast(''), 2600);
    }, 900);
  };

  const modules: PrototypeModule[] = [
    { id: 'sidebar', bind: 'sidebar', title: '侧栏工作区导航', text: '工作区切换 + 搜索/更新/设置三行 + 三组导航（工作区 / 私人 / 连接），当前页高亮。', list: ['导航项不配图标 emoji，靠缩进与底色区分层级', '「连接」组仅作为分组标题呈现，不承载真实连接器'] },
    { id: 'topbar', bind: 'topbar', title: '顶栏面包屑与状态', text: '左侧三级面包屑，右侧同步状态胶囊：绿色=已同步、蓝色=同步中。', list: ['点击「从数据源刷新」会在 0.9 秒后完成一次本地同步', '状态仅由本地状态驱动，可在预览沙箱内工作'] },
    { id: 'pagehead', bind: 'pagehead', title: '页面头', text: '页面封面条 + 大标题 + 元信息行（最近编辑人 / 刷新时间 / 自动开关 / 刷新按钮）。', list: ['标题 40px、字重 700', '封面条用单色浅底，不用渐变'] },
    { id: 'callout', bind: 'callout', title: '数据说明条', text: '一句话说明数据取自哪里、什么时候刷新。', list: ['不出现「示例数据」等演示者措辞', '提示条为浅底圆角块，不带左侧彩条'] },
    { id: 'kpis', bind: 'kpis', title: '指标网格', text: '4 项指标：标签 + 大数字 + 环比小字。1px 细线分隔，无阴影、无独立圆角卡。', list: ['数字用等宽数字对齐（tabular-nums）', '上升绿、下降红，稳定态用中性灰'] },
    { id: 'spark', bind: 'spark', title: '近 7 日折线图', text: '手绘 SVG 折线：10% 透明强调色填充 + 2px 描边 + 横向网格线，不引图表库。' },
    { id: 'feed', bind: 'feed', title: '最近动态', text: '动态流：圆形头像（姓名首字）+ 动作 + 时间。', list: ['刷新后新条目置顶', '最多保留 5 条'] },
    { id: 'db', bind: 'db', title: '关联任务表', text: '表头 + 5 行任务：名称 / 状态 / 负责人 / 截止 / 优先级。', list: ['状态用五色胶囊：已完成 / 进行中 / 待评审 / 受阻 / 待办', '截止日期不截断、不换行'] },
    { id: 'footer', bind: 'footer', title: '页脚来源', text: '数据来源与刷新时间说明。' },
  ];

  return (
    <PrototypeLayout title="团队工作台仪表盘" breadcrumb="启明工作室 / 工作台 / 团队仪表盘" modules={modules}>
      <div style={{ display: 'flex', background: C.bg, color: C.ink, fontSize: 16, lineHeight: 1.6, fontFamily: '-apple-system,"PingFang SC","Microsoft YaHei",system-ui,sans-serif', minHeight: 620 }}>
        {/* 侧栏 */}
        <aside data-proto-id="sidebar" style={{ width: 232, flexShrink: 0, background: C.bgSoft, borderRight: `1px solid ${C.line}`, padding: '10px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 4, cursor: 'pointer' }}>
            <span style={{ width: 22, height: 22, borderRadius: 4, background: C.accentInk, color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>启</span>
            <span style={{ fontWeight: 600, fontSize: 14 }}>启明工作室</span>
            <span style={{ marginLeft: 'auto', color: C.ink3, fontSize: 12 }}>⌄</span>
          </div>
          {['搜索', '更新', '设置与成员'].map((t) => (
            <div key={t} style={{ padding: '6px 8px', borderRadius: 4, fontSize: 14, color: C.ink2, cursor: 'pointer' }}>{t}</div>
          ))}
          {[
            { label: '工作区', items: ['团队仪表盘', '任务', '文档', '路线图'] },
            { label: '私人', items: ['每日记录', '收集箱'] },
            { label: '连接', items: ['外部数据源'] },
          ].map((g) => (
            <div key={g.label} style={{ marginTop: 18 }}>
              <div style={{ fontSize: 11, color: C.ink3, padding: '0 8px 6px', letterSpacing: '0.04em' }}>{g.label}</div>
              {g.items.map((n) => {
                const on = n === '团队仪表盘';
                return <div key={n} style={{ padding: '5px 8px', borderRadius: 4, fontSize: 14, background: on ? C.bgHover : undefined, fontWeight: on ? 600 : undefined, color: C.ink, cursor: 'pointer' }}>{n}</div>;
              })}
            </div>
          ))}
        </aside>

        {/* 主区 */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <div data-proto-id="topbar" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderBottom: `1px solid ${C.line}`, fontSize: 13, color: C.ink2 }}>
            <span>启明工作室</span><span style={{ color: C.ink3 }}>/</span><span>工作台</span><span style={{ color: C.ink3 }}>/</span><span style={{ color: C.ink }}>团队仪表盘</span>
            <span style={{ flex: 1 }} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, fontSize: 12, background: state === 'synced' ? '#eaf5ee' : '#e7f2f8', color: state === 'synced' ? '#2b593f' : C.accentInk, border: `1px solid ${state === 'synced' ? '#c9e4d2' : '#c6e0ef'}` }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: state === 'synced' ? '#3f8f5f' : C.accent }} />
              {state === 'synced' ? '已同步' : '同步中…'}
            </span>
          </div>

          <div style={{ padding: '0 40px 40px', maxWidth: 1080 }}>
            <div data-proto-id="pagehead" style={{ marginTop: 24 }}>
              <div style={{ height: 84, background: C.bgSoft, borderRadius: '4px 4px 0 0' }} />
              <div style={{ fontSize: 44, lineHeight: 1, marginTop: -22 }}>📊</div>
              <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.01em', margin: '8px 0 10px', lineHeight: 1.2 }}>团队仪表盘</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.ink2, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 20, height: 20, borderRadius: 999, background: '#d9e6f2', color: '#1f5b78', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>陈</span>
                  <span>最近由 <strong style={{ color: C.ink }}>陈舒</strong> 编辑</span>
                </span>
                <span>·</span><span>刷新于 {refreshedAt}</span>
                <span style={{ flex: 1 }} />
                <button type="button" onClick={() => setAuto((v) => !v)} style={{ font: 'inherit', fontSize: 13, cursor: 'pointer', padding: '5px 12px', borderRadius: 6, border: `1px solid ${C.lineStrong}`, background: auto ? C.bgSoft : C.bg, color: C.ink }}>定时刷新 · {auto ? '开' : '关'}</button>
                <button type="button" onClick={refresh} disabled={state === 'syncing'} style={{ font: 'inherit', fontSize: 13, cursor: state === 'syncing' ? 'default' : 'pointer', padding: '5px 12px', borderRadius: 6, border: `1px solid ${C.accentInk}`, background: C.accentInk, color: '#fff', opacity: state === 'syncing' ? 0.6 : 1 }}>
                  {state === 'syncing' ? '同步中…' : '↻ 刷新数据'}
                </button>
              </div>
            </div>

            <div data-proto-id="callout" style={{ marginTop: 20, background: C.bgSoft, borderRadius: 8, padding: '12px 16px', fontSize: 14, color: C.ink, display: 'flex', gap: 10 }}>
              <span aria-hidden="true">💡</span>
              <span>本页数字来自团队任务库的汇总视图，打开页面时自动拉取一次，之后每 30 秒刷新；手动点「刷新数据」可立即同步。</span>
            </div>

            <div data-proto-id="kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: `1px solid ${C.line}`, borderRadius: 8, overflow: 'hidden', marginTop: 24 }}>
              {[
                { l: '任务总数', v: String(kpi.total), d: '↑ 6 较上周', up: true },
                { l: '本周完成', v: String(kpi.done), d: '↑ 4 较上周', up: true },
                { l: '活跃成员', v: '11', sub: ' / 14', d: '· 持平', neutral: true },
                { l: '待评审文档', v: String(kpi.docs), d: '↓ 2 较上周', up: false },
              ].map((k, i) => (
                <div key={k.l} style={{ padding: '16px 18px', borderLeft: i ? `1px solid ${C.line}` : undefined }}>
                  <div style={{ fontSize: 12, color: C.ink2, marginBottom: 6 }}>{k.l}</div>
                  <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>{k.v}{k.sub && <span style={{ color: C.ink3, fontSize: 18, fontWeight: 500 }}>{k.sub}</span>}</div>
                  <div style={{ fontSize: 12, color: k.neutral ? C.ink2 : (k.up ? '#2b593f' : '#b13b2c'), marginTop: 4 }}>{k.d}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16, marginTop: 16 }}>
              <div data-proto-id="spark" style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <strong style={{ fontSize: 14 }}>近 7 日新建任务</strong>
                  <span style={{ fontSize: 12, color: C.ink2 }}>合计 98 条</span>
                </div>
                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: 132, display: 'block' }} role="img" aria-label="近 7 日新建任务折线图">
                  {[35, 70, 105].map((y) => <line key={y} x1="0" y1={y} x2={W} y2={y} stroke={C.line} strokeWidth="1" />)}
                  <polygon points={areaPts} fill={C.accent} fillOpacity="0.1" />
                  <polyline points={linePts} fill="none" stroke={C.accent} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                  {SPARK.map((v, i) => <circle key={i} cx={ptX(i)} cy={ptY(v)} r="3" fill="#fff" stroke={C.accent} strokeWidth="2" />)}
                </svg>
              </div>
              <div data-proto-id="feed" style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <strong style={{ fontSize: 14 }}>最近动态</strong>
                  <span style={{ fontSize: 12, color: C.ink2 }}>来自任务库</span>
                </div>
                {feed.map((f, i) => (
                  <div key={`${f.act}-${i}`} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i ? `1px solid ${C.line}` : undefined }}>
                    <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: 999, background: i === 0 ? '#d9e6f2' : C.bgHover, color: i === 0 ? '#1f5b78' : C.ink2, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{f.who}</span>
                    <span style={{ fontSize: 13, color: C.ink, minWidth: 0 }}>
                      <strong style={{ fontWeight: 600 }}>{f.name}</strong> {f.act}
                      <span style={{ display: 'block', fontSize: 11, color: C.ink3, marginTop: 2 }}>{f.at}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 18, margin: '28px 0 4px', fontWeight: 600 }}>📋 任务 · 当前迭代</h2>
            <div style={{ fontSize: 12, color: C.ink2, marginBottom: 10 }}>关联视图 · 按状态过滤未完成 · 按更新时间排序</div>
            <div data-proto-id="db" style={{ border: `1px solid ${C.line}`, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr 0.8fr', gap: 8, padding: '8px 14px', background: C.bgSoft, fontSize: 11, color: C.ink2, letterSpacing: '0.04em' }}>
                <span>名称</span><span>状态</span><span>负责人</span><span>截止</span><span>优先级</span>
              </div>
              {ROWS.map((r, i) => (
                <div key={r.name} style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr 0.8fr', gap: 8, padding: '10px 14px', borderTop: i ? `1px solid ${C.line}` : undefined, fontSize: 13, alignItems: 'center' }}>
                  <span style={{ color: C.ink, minWidth: 0 }}>{r.name}</span>
                  <span><span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: 12, background: PILL[r.status].bg, color: PILL[r.status].ink, whiteSpace: 'nowrap' }}>{r.status}</span></span>
                  <span style={{ color: C.ink2 }}>{r.who}</span>
                  <span style={{ color: C.ink2, whiteSpace: 'nowrap' }}>{r.due}</span>
                  <span style={{ color: C.ink2 }}>{r.pri}</span>
                </div>
              ))}
            </div>

            <div data-proto-id="footer" style={{ marginTop: 20, fontSize: 12, color: C.ink3, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span>数据来源：团队任务库汇总视图</span><span>·</span><span>刷新于 {refreshedAt}</span>
            </div>
          </div>
        </main>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 32, transform: 'translateX(-50%)', background: C.ink, color: '#fff', fontSize: 13, padding: '10px 18px', borderRadius: 8, boxShadow: '0 4px 16px rgba(15,15,15,0.18)' }}>
          {toast}
        </div>
      )}
    </PrototypeLayout>
  );
}
