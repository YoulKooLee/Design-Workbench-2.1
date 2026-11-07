/**
 * @description 移动端 App 原型（番茄专注屏）：手机外壳内渲染状态栏 + 问候头部 + 专注计时卡 + 今日统计 + 任务列表 + 底部导航
 * 源自 open-design mobile-app 模板转译（原型框架 · 页面模板）
 */
import React from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#fafaf9', fg: '#1c1b1a', muted: '#6b6964', border: '#e6e4e0',
  accent: '#c96442', surface: '#ffffff',
};

export default function MobileAppPrototype() {
  const modules: PrototypeModule[] = [
    { id: 'frame', title: '手机外壳', bind: 'frame', text: '390x844 圆角外壳，顶部灵动岛开孔。', list: ['桌面端原型中的移动端展示约定'] },
    { id: 'header', title: '问候头部', bind: 'header', text: '日期 + 一句基于场景的问候标题。' },
    { id: 'timer', title: '专注计时卡', bind: 'timer', text: '强调色卡片：倒计时 + 进度条 + 跳过/暂停。' },
    { id: 'stats', title: '今日统计', bind: 'stats', text: '三格统计：专注场次 / 专注时长 / 完成任务。' },
    { id: 'tasks', title: '任务列表', bind: 'tasks', text: '待办 + 已完成态（勾选样式 + 划线文字）。' },
    { id: 'tabbar', title: '底部导航', bind: 'tabbar', text: '四个页签：专注 / 任务 / 统计 / 设置，当前页强调色。' },
  ];

  return (
    <PrototypeLayout title="移动端专注 App" breadcrumb="模板 / 移动端" modules={modules}>
      <div style={{ background: C.bg, color: C.fg, font: '14px/1.5 -apple-system, system-ui, sans-serif', display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
        {/* 手机外壳 */}
        <div data-proto-id="frame" style={{ width: 340, height: 736, background: '#000', borderRadius: 48, padding: 11, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 19, left: '50%', transform: 'translateX(-50%)', width: 108, height: 30, background: '#000', borderRadius: 999, zIndex: 5 }} />
          <div style={{ width: '100%', height: '100%', background: C.bg, borderRadius: 37, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* 状态栏 */}
            <div style={{ padding: '12px 20px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, fontWeight: 600, color: C.fg }}>
              <span>9:41</span><span>··· 5G · 100%</span>
            </div>
            {/* 头部 */}
            <div data-proto-id="header" style={{ padding: '44px 20px 20px' }}>
              <p style={{ color: C.muted, fontSize: 13, margin: '0 0 4px' }}>星期二 · 4 月 22 日</p>
              <h1 style={{ margin: 0, fontSize: 21, letterSpacing: '-0.01em', color: C.fg }}>午餐前还有两个番茄钟。</h1>
            </div>
            {/* 计时卡 */}
            <div data-proto-id="timer" style={{ margin: '10px 20px', background: C.accent, color: '#fff', borderRadius: 22, padding: '24px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85, margin: '0 0 4px' }}>专注中</p>
              <div style={{ fontSize: 54, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 600, margin: '6px 0 16px', fontVariantNumeric: 'tabular-nums' }}>15:42</div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 999, overflow: 'hidden', marginBottom: 14 }}>
                <span style={{ display: 'block', width: '38%', height: '100%', background: '#fff' }} />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button style={{ font: 'inherit', cursor: 'pointer', padding: '9px 20px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 500 }}>跳过</button>
                <button style={{ font: 'inherit', cursor: 'pointer', padding: '9px 20px', borderRadius: 999, background: '#fff', color: C.accent, border: '1px solid #fff', fontWeight: 500 }}>暂停</button>
              </div>
            </div>
            {/* 今日统计 */}
            <div data-proto-id="stats" style={{ padding: '16px 20px 0' }}>
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.muted, margin: '0 0 10px' }}>今日</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[['3', '专注场次'], ['75 分', '专注时长'], ['2', '完成任务']].map((s) => (
                  <div key={s[1]} style={{ background: C.surface, border: '1px solid ' + C.border, borderRadius: 14, padding: 12 }}>
                    <div style={{ fontSize: 20, letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 4, color: C.fg }}>{s[0]}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{s[1]}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* 任务列表 */}
            <div data-proto-id="tasks" style={{ padding: '14px 20px 8px' }}>
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.muted, margin: '0 0 8px' }}>接下来</p>
              {[['复盘季度目标', '25 分钟 · 已完成', true], ['撰写同步引擎文章', '预计 2 个番茄钟', false], ['与米拉的一对一准备', '1 个番茄钟', false]].map((t) => (
                <div key={t[0]} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: '1px solid ' + C.border }}>
                  <div style={{ width: 20, height: 20, border: '1.5px solid ' + C.border, borderRadius: '50%', flexShrink: 0, background: t[2] ? C.accent : 'transparent', borderColor: t[2] ? C.accent : C.border, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}>{t[2] ? '✓' : ''}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, lineHeight: 1.3, color: t[2] ? C.muted : C.fg, textDecoration: t[2] ? 'line-through' : undefined }}>{t[0]}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{t[1]}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* 底部导航 */}
            <nav data-proto-id="tabbar" style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '8px 14px 22px', borderTop: '1px solid ' + C.border, background: C.surface }}>
              {[['⏱', '专注', true], ['✓', '任务', false], ['📊', '统计', false], ['⚙', '设置', false]].map((t) => (
                <div key={t[1]} style={{ textAlign: 'center', color: t[2] ? C.accent : C.muted, fontSize: 11, padding: '6px 0', fontWeight: t[2] ? 500 : undefined }}>
                  <div style={{ fontSize: 17, lineHeight: 1, marginBottom: 4 }}>{t[0]}</div>{t[1]}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </PrototypeLayout>
  );
}
