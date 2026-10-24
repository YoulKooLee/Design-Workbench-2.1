/**
 * @description 项目任务看板原型：顶栏 + 筛选条 + 四列看板（待办/进行中/审核中/已完成）+ 右侧迭代进度与成员贡献
 * 源自 open-design kanban-board 模板转译（原型框架 · 页面模板）
 */
import React from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#f7f7f9', paper: '#ffffff', ink: '#1a1d29', muted: '#5e6478', line: '#e5e7ee',
  lineStrong: '#c8cdd9', accent: '#5b3df0', accentSoft: '#ece8ff', pink: '#d6336c',
  teal: '#1a8e8e', amber: '#b58522', green: '#2c8a4f',
};

export default function KanbanBoardPrototype() {
  const modules: PrototypeModule[] = [
    { id: 'topbar', title: '顶部栏', bind: 'topbar', text: '项目/团队面包屑 + 迭代芯片 + 搜索 + 筛选/新建按钮。' },
    { id: 'filterbar', title: '筛选条', bind: 'filterbar', text: '按成员 / 标签筛选，可分组排序。' },
    { id: 'board', title: '看板列', bind: 'board', text: '四列流转：待办 / 进行中 / 审核中 / 已完成。', list: ['卡片：标签 + 标题 + 进度 + 负责人 + 点数 + 编号', '列头带数量统计，列尾可新建卡片'] },
    { id: 'pulse', title: '迭代进度', bind: 'pulse', text: '已完成后分比 + 进度条（强调色渐变）。' },
    { id: 'contributors', title: '成员贡献', bind: 'contributors', text: '按完成点数排行：头像 + 姓名 + 点数。' },
    { id: 'blocked', title: '阻塞提醒', bind: 'blocked', text: '被阻塞的任务提示 + 建议动作。' },
  ];

  const col: React.CSSProperties = { background: C.paper, border: '1px solid ' + C.line, borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 10 };
  const card: React.CSSProperties = { padding: '11px 13px', background: C.paper, border: '1px solid ' + C.line, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 10 };
  const tagStyle = (color: string, bg: string): React.CSSProperties => ({ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontFamily: 'ui-monospace, monospace', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, background: bg, color });

  const av = (name: string, bg: string): React.CSSProperties => ({ width: 22, height: 22, borderRadius: '50%', background: bg, color: '#fff', fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' });

  return (
    <PrototypeLayout title="项目任务看板" breadcrumb="模板 / 看板" modules={modules}>
      <div style={{ background: C.bg, color: C.ink, font: '13.5px/1.5 -apple-system, system-ui, sans-serif', display: 'grid', gridTemplateColumns: '1fr 250px', minHeight: 480 }}>
        {/* 主区 */}
        <main style={{ padding: '16px 18px 28px', minWidth: 0 }}>
          {/* 顶栏 */}
          <div data-proto-id="topbar" style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11.5, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>北方数据 / 增长团队</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: C.accentSoft, color: C.accent, fontWeight: 600, fontSize: 11.5 }}>
              <span style={{ width: 6, height: 6, background: C.accent, borderRadius: '50%' }} />迭代 38 · 第 6/10 天
            </span>
            <span style={{ flex: 1 }} />
            <input placeholder="搜索任务…" style={{ padding: '7px 10px', border: '1px solid ' + C.line, borderRadius: 8, fontSize: 13, maxWidth: 200, background: C.paper, color: C.ink }} />
            <button style={{ padding: '6px 10px', background: C.paper, border: '1px solid ' + C.line, borderRadius: 8, fontSize: 12.5, cursor: 'pointer', color: C.muted }}>⌘ 筛选</button>
            <button style={{ padding: '6px 10px', background: C.paper, border: '1px solid ' + C.line, borderRadius: 8, fontSize: 12.5, cursor: 'pointer', color: C.muted }}>+ 新建</button>
          </div>

          {/* 筛选条 */}
          <div data-proto-id="filterbar" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', background: C.paper, border: '1px solid ' + C.line, borderRadius: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10.5, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>成员</span>
            <span style={av('林', 'linear-gradient(135deg,#5b3df0,#a991ff)')}>林</span>
            <span style={Object.assign({}, av('米', ''), { background: 'linear-gradient(135deg,#d6336c,#ff7a9b)' })}>米</span>
            <span style={Object.assign({}, av('王', ''), { background: 'linear-gradient(135deg,#b58522,#f1b13a)' })}>王</span>
            <span style={Object.assign({}, av('陈', ''), { background: 'linear-gradient(135deg,#2c8a4f,#66c285)' })}>陈</span>
            <span style={{ width: 22, height: 22, borderRadius: '50%', background: C.lineStrong, color: C.muted, fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>+1</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10.5, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginLeft: 12 }}>标签</span>
            <span style={{ padding: '4px 10px', borderRadius: 999, border: '1px solid ' + C.ink, fontSize: 12, color: C.paper, background: C.ink, cursor: 'pointer' }}>当前迭代</span>
            <span style={{ padding: '4px 10px', borderRadius: 999, border: '1px solid ' + C.line, fontSize: 12, color: C.muted, cursor: 'pointer' }}>缺陷</span>
            <span style={{ padding: '4px 10px', borderRadius: 999, border: '1px solid ' + C.line, fontSize: 12, color: C.muted, cursor: 'pointer' }}>功能</span>
            <span style={{ flex: 1 }} />
            <span style={{ padding: '4px 10px', borderRadius: 999, border: '1px solid ' + C.line, fontSize: 12, color: C.muted, cursor: 'pointer' }}>分组 · 状态</span>
            <span style={{ padding: '4px 10px', borderRadius: 999, border: '1px solid ' + C.line, fontSize: 12, color: C.muted, cursor: 'pointer' }}>排序 · 优先级</span>
          </div>

          {/* 看板 */}
          <div data-proto-id="board" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'flex-start' }}>
            {[
              { name: '待办', count: 5, swatch: C.lineStrong, cards: [
                { tag: ['功能', C.accent, 'rgba(91,61,240,0.12)'], title: '给开通引导第二步加空状态配图', meta: ['陈', 3, 'NW-241', 'linear-gradient(135deg,#2c8a4f,#66c285)'] },
                { tag: ['设计', C.teal, 'rgba(26,142,142,0.12)'], title: '刷新通知设置页的配色变量', meta: ['米', 2, 'NW-237', 'linear-gradient(135deg,#d6336c,#ff7a9b)'] },
                { tag: ['调研', C.amber, 'rgba(181,133,34,0.12)'], title: '访谈 5 位企业管理员聊两步验证', meta: ['王', 5, 'NW-225', 'linear-gradient(135deg,#b58522,#f1b13a)'] },
                { tag: ['杂务', C.muted, 'rgba(94,100,120,0.12)'], title: '把旧版登录记录迁移到新结构', meta: ['林', 3, 'NW-219', 'linear-gradient(135deg,#5b3df0,#a991ff)'] },
                { tag: ['缺陷', C.pink, 'rgba(214,51,108,0.12)'], title: '导出报表时项目名里的表情符号丢失', meta: ['—', 1, 'NW-244', C.lineStrong] },
              ] },
              { name: '进行中', count: 4, swatch: C.accent, cards: [
                { tag: ['功能', C.accent, 'rgba(91,61,240,0.12)'], title: '成员设置里加两步验证开通页', progress: 70, meta: ['陈', 5, 'NW-201', 'linear-gradient(135deg,#2c8a4f,#66c285)'] },
                { tag: ['功能', C.accent, 'rgba(91,61,240,0.12)'], title: '恢复码：生成、下载、重新生成', progress: 45, meta: ['王', 3, 'NW-202', 'linear-gradient(135deg,#b58522,#f1b13a)'] },
                { tag: ['缺陷', C.pink, 'rgba(214,51,108,0.12)'], title: '修复命令栏焦点跳走的问题', progress: 80, meta: ['林', 2, 'NW-238', 'linear-gradient(135deg,#5b3df0,#a991ff)'] },
                { tag: ['设计', C.teal, 'rgba(26,142,142,0.12)'], title: '两步验证步骤页：界面与文案', progress: 30, meta: ['米', 3, 'NW-205', 'linear-gradient(135deg,#d6336c,#ff7a9b)'] },
              ] },
              { name: '审核中', count: 3, swatch: C.amber, cards: [
                { tag: ['功能', C.accent, 'rgba(91,61,240,0.12)'], title: '为两步验证开通事件加操作记录', meta: ['王', 2, 'NW-198', 'linear-gradient(135deg,#b58522,#f1b13a)'] },
                { tag: ['设计', C.teal, 'rgba(26,142,142,0.12)'], title: '设置导航结构重整（左侧栏）', meta: ['米', 3, 'NW-189', 'linear-gradient(135deg,#d6336c,#ff7a9b)'] },
                { tag: ['缺陷', C.pink, 'rgba(214,51,108,0.12)'], title: '切换工作区后滚动位置被重置', meta: ['林', 1, 'NW-233', 'linear-gradient(135deg,#5b3df0,#a991ff)'] },
              ] },
              { name: '已完成', count: 4, swatch: C.green, cards: [
                { tag: ['功能', C.accent, 'rgba(91,61,240,0.12)'], title: '工作区两步验证强制策略（管理员）', meta: ['陈', 5, 'NW-181', 'linear-gradient(135deg,#2c8a4f,#66c285)'] },
                { tag: ['杂务', C.muted, 'rgba(94,100,120,0.12)'], title: '升级登录组件到 4.2.0', meta: ['林', 1, 'NW-176', 'linear-gradient(135deg,#5b3df0,#a991ff)'] },
                { tag: ['调研', C.amber, 'rgba(181,133,34,0.12)'], title: '两步验证可用性测试（8 人）', meta: ['王', 3, 'NW-172', 'linear-gradient(135deg,#b58522,#f1b13a)'] },
                { tag: ['设计', C.teal, 'rgba(26,142,142,0.12)'], title: '设置页配色规范核对', meta: ['米', 2, 'NW-168', 'linear-gradient(135deg,#d6336c,#ff7a9b)'] },
              ] },
            ].map((colDef) => (
              <div key={colDef.name} style={col}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 4px 8px', borderBottom: '1px dashed ' + C.line }}>
                  <span style={{ fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: colDef.swatch }} />{colDef.name}
                  </span>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10.5, color: C.muted, padding: '2px 6px', background: C.bg, borderRadius: 999 }}>{colDef.count}</span>
                </div>
                {colDef.cards.map((c) => (
                  <div key={c.meta[2]} style={Object.assign({}, card, c.meta[2] === 'NW-181' || c.meta[2] === 'NW-176' || c.meta[2] === 'NW-172' || c.meta[2] === 'NW-168' ? { opacity: 0.82 } : null)}>
                    <span style={tagStyle(c.tag[1], c.tag[2])}>{c.tag[0]}</span>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: C.ink }}>{c.title}</div>
                    {c.progress !== undefined ? (
                      <div style={{ height: 4, background: C.bg, borderRadius: 999, overflow: 'hidden' }}>
                        <span style={{ display: 'block', height: '100%', width: c.progress + '%', background: C.accent, borderRadius: 999 }} />
                      </div>
                    ) : null}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11.5, color: C.muted }}>
                      <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={av(c.meta[0], c.meta[3])}>{c.meta[0]}</span>
                        <span style={{ fontFamily: 'ui-monospace, monospace', padding: '2px 7px', border: '1px solid ' + C.line, borderRadius: 999, fontSize: 10.5 }}>{c.meta[1]} 点</span>
                      </span>
                      <span>{c.meta[2]}</span>
                    </div>
                  </div>
                ))}
                <div style={{ padding: 10, border: '1px dashed ' + C.lineStrong, borderRadius: 8, textAlign: 'center', color: C.muted, fontSize: 12, cursor: 'pointer' }}>+ 新建卡片</div>
              </div>
            ))}
          </div>
        </main>

        {/* 右侧栏 */}
        <aside style={{ padding: '20px 20px', borderLeft: '1px solid ' + C.line, background: C.paper }}>
          <div data-proto-id="pulse" style={{ marginBottom: 22 }}>
            <h4 style={{ fontFamily: 'inherit', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.muted, margin: '0 0 10px', fontWeight: 600 }}>迭代进度</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.ink }}>
              <span>已完成</span><strong>22 / 38 点</strong>
            </div>
            <div style={{ height: 6, background: C.bg, borderRadius: 999, overflow: 'hidden', marginTop: 6 }}>
              <span style={{ display: 'block', height: '100%', width: '58%', background: 'linear-gradient(90deg,#5b3df0,#a991ff)', borderRadius: 999 }} />
            </div>
          </div>
          <div data-proto-id="contributors" style={{ marginBottom: 22 }}>
            <h4 style={{ fontFamily: 'inherit', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.muted, margin: '0 0 10px', fontWeight: 600 }}>成员贡献</h4>
            {[['陈', '陈晓', 9, 'linear-gradient(135deg,#2c8a4f,#66c285)'], ['米', '米拉', 5, 'linear-gradient(135deg,#d6336c,#ff7a9b)'], ['王', '王鹏', 5, 'linear-gradient(135deg,#b58522,#f1b13a)'], ['林', '林然', 3, 'linear-gradient(135deg,#5b3df0,#a991ff)']].map((r) => (
              <div key={r[1]} style={{ display: 'grid', gridTemplateColumns: '28px 1fr auto', gap: 10, alignItems: 'center', fontSize: 12.5, padding: '4px 0' }}>
                <span style={av(r[0], r[3])}>{r[0]}</span><span style={{ color: C.ink }}>{r[1]}</span><strong style={{ fontFamily: 'ui-monospace, monospace' }}>{r[2]} 点</strong>
              </div>
            ))}
          </div>
          <div data-proto-id="blocked" style={{ padding: 14, borderRadius: 10, background: 'rgba(214,51,108,0.07)', border: '1px solid rgba(214,51,108,0.2)' }}>
            <strong style={{ color: C.pink }}>有 1 个任务被阻塞。</strong>
            <p style={{ margin: '6px 0 0', color: C.muted, fontSize: 12.5 }}>NW-205（两步验证步骤页设计）在等品牌文案审核。@小莎 或先移回待办。</p>
          </div>
        </aside>
      </div>
    </PrototypeLayout>
  );
}
