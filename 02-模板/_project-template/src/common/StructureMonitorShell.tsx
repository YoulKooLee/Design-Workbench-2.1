/**
 * 结构监测 · 共享页面壳（StructureMonitorShell）
 * 结构监测是 1 个原型，包含 5 个功能模块（dashboard / alarm / devices / diagnosis / report），本壳被 5 个模块共用。
 *
 * 布局：三栏
 *  - 左：功能目录（5 个功能模块，与 Make 客户端目录同步）
 *  - 中：当前子模块内容（含二级 SubTab）
 *  - 右：设计说明卡（字段 / 接口出处 / 待厂商补充）
 *
 * 设计说明的编辑以各模块 index.tsx 内的 buildModules 为真源：面板编辑经本地编辑 API 实时落盘到源码，
 * 因此「工作台面板」与「导出 HTML（含源码）」读取同一份真源，天然一致。
 */
import React, { useEffect, useRef, useState } from 'react';
import SideMenu from './side-menu';

export const NAV: Array<{ key: string; label: string; sub?: string[]; group: 'core' | 'readonly' | 'placeholder' }> = [
  { key: 'dashboard', label: '数据看板', sub: ['最新数据', '历史数据', '趋势分析', '均值/极值'], group: 'core' },
  { key: 'alarm', label: '预警信息', sub: ['预警列表', '历史记录', '预警配置'], group: 'core' },
  { key: 'devices', label: '设备管理', group: 'readonly' },
  { key: 'diagnosis', label: '智慧诊断', group: 'core' },
  { key: 'report', label: '报告管理', group: 'core' },
];

export type NavKey = (typeof NAV)[number]['key'];

/** 通过原型内部菜单切换页面：在跳页前打标记，供 annotationNavFix 插件在新页面恢复批注桥接。 */
export function goModule(k: NavKey) {
  // 同步 Make IDE 左侧原型目录高亮（两个菜单一致），并让 IDE 感知到页面切换
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'AXHUB_PROTOTYPE_PAGE_CHANGE', pageId: String(k) }, '*');
    }
  } catch (e) {}
  try {
    sessionStorage.setItem('__axhub_editor_navigating__', '1');
  } catch (e) {}
  window.location.href = '/prototypes/' + k + '/';
}


export const C = {
  bg: '#f5f7fa',
  panel: '#ffffff',
  border: '#e5e9f0',
  border2: '#d6dde7',
  hover: '#f0f4fa',
  active: '#e8f1ff',
  text: '#1f2937',
  text2: '#5b6b82',
  text3: '#8c9bb0',
  primary: '#2b6cff',
  primaryHover: '#1a5af0',
  accent: '#0ea5e9',
  ok: '#16a34a',
  warnR: '#dc2626',
  danger: '#dc2626',
  rowHover: '#f8fafd',
  rowErr: '#fff5f5',
};

/**
 * 全局 z-index 层级规范（统一收口，避免浮窗/弹窗被面板遮挡问题复发）。
 * 规则：静态面板层级最低；浮窗 > 弹窗 > 静态面板；Toast 最高。
 *   - aside:   右侧设计说明侧栏（静态背景面板，永远是底层）
 *   - content: 主内容区（列表/表单等，浮窗的参照层）
 *   - popover: ⓘ 提示浮窗 / Tooltip（必须置顶，不被任何面板遮挡）
 *   - modal:   全屏弹窗（Modal）
 *   - toast:   全局轻提示（最高）
 * 注意：浮窗必须用 position:fixed（按 getBoundingClientRect 定位）脱离父级
 * stacking context，才能稳定高于所有面板。
 */
export const Z = {
  aside: 1,
  content: 2,
  popover: 1200,
  modal: 1000,
  toast: 9999,
} as const;

export function statusColor(s: string) {
  if (s === '异常') return { color: C.warnR, bg: 'rgba(220,38,38,.08)', border: 'rgba(220,38,38,.35)' };
  if (s === '离线') return { color: C.text3, bg: '#f1f5f9', border: C.border };
  return { color: C.ok, bg: 'rgba(22,163,74,.08)', border: 'rgba(22,163,74,.35)' };
}

export function Pill({ children, color, bg, border }: { children: React.ReactNode; color: string; bg: string; border?: string }) {
  const b = border || C.border;
  return (
    <span style={{
      display: 'inline-block', color, background: bg,
      border: `1px solid ${b}`, padding: '2px 10px',
      borderRadius: 999, fontSize: 12, lineHeight: '18px',
    }}>{children}</span>
  );
}

export function SelectBtn({ children, width }: { children: React.ReactNode; width?: number }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6,
      padding: '6px 12px', color: C.text2, fontSize: 13, minWidth: width || 140, cursor: 'pointer',
    }}>
      <span>{children}</span>
      <span style={{ color: C.text3, fontSize: 10 }}>▾</span>
    </div>
  );
}

export function BtnPrimary({ children, onClick, danger }: { children: React.ReactNode; onClick?: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} style={{
      background: danger ? '#fff' : C.primary,
      color: danger ? C.danger : '#fff',
      border: danger ? `1px solid ${C.danger}` : 'none',
      borderRadius: 6, padding: '7px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 500,
    }}>{children}</button>
  );
}

export function FieldRow({ label, children, w }: { label: string; children: React.ReactNode; w?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 12, color: C.text3 }}>{label}</div>
      <div style={{
        background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6,
        padding: '7px 12px', color: C.text2, fontSize: 13, minWidth: w || 160, minHeight: 18,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>{children}</div>
    </div>
  );
}

export function Table({ head, children, colSpan }: { head: string[]; children: React.ReactNode; colSpan?: number }) {
  const childArr = React.Children.toArray(children);
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: C.text, background: C.panel }}>
      <thead>
        <tr style={{ background: '#f8fafd' }}>
          {head.map((h) => (
            <th key={h} style={{
              textAlign: 'left', padding: '10px 12px', fontWeight: 600,
              fontSize: 12, color: C.text2, whiteSpace: 'nowrap', borderBottom: `1px solid ${C.border}`,
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {childArr.length === 0 ? (
          <tr><td colSpan={colSpan || head.length} style={{ textAlign: 'center', color: C.text3, padding: '48px 0', fontSize: 13 }}>
            暂无数据
          </td></tr>
        ) : children}
      </tbody>
    </table>
  );
}

export function ActionLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <span onClick={onClick} style={{ color: C.primary, cursor: 'pointer', marginRight: 12, fontSize: 13 }}>{children}</span>
  );
}

export function SubTabBar({ subs, active, onSelect, id }: { subs: string[]; active: string; onSelect: (s: string) => void; id?: string }) {
  return (
    <div data-proto-id={id} style={{ display: 'flex', gap: 22, borderBottom: `1px solid ${C.border}`, marginBottom: 16 }}>
      {subs.map((t, i) => (
        <span key={`${t}-${i}`} onClick={() => onSelect(t)} style={{
          fontSize: 14, paddingBottom: 10, cursor: 'pointer',
          color: active === t ? C.primary : C.text3,
          borderBottom: active === t ? `2px solid ${C.primary}` : '2px solid transparent',
          marginBottom: -1,
        }}>{t}</span>
      ))}
    </div>
  );
}

export function PageTitle({ nav }: { nav: NavKey; sub?: string }) {
  const navItem = NAV.find((n) => n.key === nav)!;
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{navItem.label}</div>
    </div>
  );
}

export function Card({ children, id, title, style }: { children: React.ReactNode; id?: string; title?: string; style?: React.CSSProperties }) {
  return (
    <div data-proto-id={id} style={{
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, ...style,
    }}>
      {title && <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 14 }}>{title}</div>}
      {children}
    </div>
  );
}

// ============ 分页器 ============
const PAGE_SIZE_DEFAULT = 10;

export function Pager({ page, total, pageSize, onChange }: {
  page: number; total: number; pageSize?: number; onChange: (p: number) => void;
}) {
  const size = pageSize || PAGE_SIZE_DEFAULT;
  const safeTotal = Number.isFinite(total) && total >= 0 ? total : 0;
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const pageCount = Math.max(1, Math.ceil(safeTotal / size));
  const cur = Math.min(Math.max(1, safePage), pageCount);
  const start = safeTotal === 0 ? 0 : (cur - 1) * size + 1;
  const end = Math.min(cur * size, safeTotal);
  const btn = (label: React.ReactNode, target: number, disabled: boolean, key?: React.Key) => (
    <span key={key} onClick={disabled ? undefined : () => onChange(target)} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 30, height: 30,
      padding: '0 8px', fontSize: 13, borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer',
      color: disabled ? C.text3 : C.text2, background: '#fff', border: `1px solid ${disabled ? C.border : C.border2}`,
      userSelect: 'none',
    }}>{label}</span>
  );
  const nums: number[] = [];
  const win = 2;
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= cur - win && i <= cur + win)) nums.push(i);
    else if (nums[nums.length - 1] !== -1) nums.push(-1);
  }
  return (
    <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
      <span style={{ fontSize: 12, color: C.text3 }}>共 {safeTotal} 条 · 当前 {start}-{end} · 第 {cur}/{pageCount} 页</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {btn('上一页', cur - 1, cur <= 1)}
        {nums.map((n, i) => n === -1
          ? <span key={`ellipsis-${i}`} style={{ color: C.text3, fontSize: 13, padding: '0 2px' }}>…</span>
          : btn(n, n, false, `page-${n}`))}
        {btn('下一页', cur + 1, cur >= pageCount)}
      </div>
    </div>
  );
}

export function Placeholder({ title, reason, fields }: {
  title: string; reason: string; fields?: Array<{ k: string; v: string }>;
}) {
  return (
    <div style={{
      minHeight: 360, display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 16, color: C.text2, padding: 24,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%', background: '#f1f5f9',
        border: `1px dashed ${C.border2}`, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 24,
      }}>⏳</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{title}</div>
      <div style={{ fontSize: 13, color: C.text3, textAlign: 'center', maxWidth: 460, lineHeight: 1.7 }}>{reason}</div>
      {fields && (
        <div style={{
          marginTop: 12, background: C.panel, border: `1px dashed ${C.border2}`,
          borderRadius: 8, padding: '14px 18px', fontSize: 12, minWidth: 320,
        }}>
          <div style={{ fontWeight: 600, color: C.text2, marginBottom: 8 }}>待厂商补充字段：</div>
          {fields.map((f) => (
            <div key={f.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', color: C.text3, gap: 24 }}>
              <span>{f.k}</span>
              <span style={{ color: C.text2 }}>{f.v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ 右侧设计说明卡 ============
export type ModuleDef = { id: string; title: string; text?: string; list?: string[]; bind?: string };

/** 从左侧页面元素推导一个可读的模块名（用于「关联页面模块」下拉与卡片标签） */
function deriveLabel(el: HTMLElement, id: string): string {
  const explicit = el.getAttribute('data-proto-label');
  if (explicit) return explicit;
  const titleEl = el.querySelector('h1,h2,h3,h4,.sm-desc-title,[class*="title"]');
  const t = titleEl?.textContent?.replace(/\s+/g, ' ').trim();
  if (t) return t.length > 30 ? t.slice(0, 30) + '…' : t;
  const txt = el.textContent?.replace(/\s+/g, ' ').trim();
  if (txt) return txt.length > 30 ? txt.slice(0, 30) + '…' : txt;
  return id;
}

function DescCard({
  m, index, onEdit, onRemove, bindLabel,
}: {
  m: ModuleDef; index: number;
  onEdit: (m: ModuleDef, index: number) => void;
  onRemove?: (index: number) => void;
  bindLabel?: string;
}) {
  return (
    <div data-proto-id={m.bind ?? m.id} className="sm-desc">
      <div className="sm-desc-head">
        <span className="sm-desc-num">{index + 1}</span>
        <span className="sm-desc-title">{m.title}</span>
        {m.bind && (
          <span className="sm-desc-link" title={`已关联左侧页面模块：${m.bind}`}>🔗 {bindLabel ?? m.bind}</span>
        )}
        <span className="sm-desc-actions">
          <button
            className="sm-desc-edit"
            title="编辑本模块说明"
            onClick={(e) => { e.stopPropagation(); onEdit(m, index); }}
          >✎ 编辑</button>
          {onRemove && (
            <button
              className="sm-desc-del"
              title="删除本模块"
              onClick={(e) => { e.stopPropagation(); onRemove(index); }}
            >✕</button>
          )}
        </span>
      </div>
      {m.text && <div className="sm-desc-text">{m.text}</div>}
      {m.list && m.list.length > 0 && (
        <ul className="sm-desc-list">
          {m.list.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ============ 模块编辑大弹窗 ============
function DescModal({
  initial, onSave, onClose, bindOptions,
}: {
  initial: ModuleDef;
  onSave: (m: ModuleDef) => void;
  onClose: () => void;
  bindOptions?: Array<{ id: string; label: string }>;
}) {
  const [title, setTitle] = useState(initial.title);
  const [text, setText] = useState(initial.text || '');
  const [listText, setListText] = useState(initial.list?.join('\n') || '');
  const [bind, setBind] = useState(
    initial.bind ?? (initial.id.startsWith('custom-') ? '' : initial.id),
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSave = () => {
    const list = listText.split('\n').filter((s) => s.trim());
    onSave({
      id: initial.id,
      title: title.trim() || initial.title,
      text: text.trim(),
      list,
      bind: bind || undefined,
    });
  };

  return (
    <div className="sm-modal-mask">
      <div className="sm-modal">
        <div className="sm-modal-head">
          <div className="sm-modal-title">编辑设计说明模块</div>
          <button className="sm-modal-close" onClick={onClose} title="关闭">✕</button>
        </div>
        <div className="sm-modal-body">
          <div className="sm-modal-field">
            <div className="sm-modal-label">模块标题</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="模块标题"
              autoFocus
            />
          </div>
          <div className="sm-modal-field">
            <div className="sm-modal-label">关联左侧页面模块（可选 · 选择后自动生成连线）</div>
            <select value={bind} onChange={(e) => setBind(e.target.value)}>
              <option value="">（不关联 · 该模块不显示连线）</option>
              {(bindOptions || []).map((o) => (
                <option key={o.id} value={o.id}>{o.label}（{o.id}）</option>
              ))}
            </select>
          </div>
          <div className="sm-modal-field">
            <div className="sm-modal-label">说明文本</div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="输入该模块的说明文本"
              style={{ minHeight: 60 }}
            />
          </div>
          <div className="sm-modal-field">
            <div className="sm-modal-label">要点列表（每行一条，可为空）</div>
            <textarea
              value={listText}
              onChange={(e) => setListText(e.target.value)}
              placeholder={'示例：\n对接厂商接口 /field\n待厂商补充单位字段'}
              style={{ minHeight: 240 }}
            />
          </div>
        </div>
        <div className="sm-modal-foot">
          <button className="sm-modal-btn ghost" onClick={onClose}>取消</button>
          <button className="sm-modal-btn primary" onClick={handleSave}>保存修改</button>
        </div>
      </div>
    </div>
  );
}

const DescStyle = `
  .sm-right{width:360px;min-width:360px;background:#fff;border-left:3px solid ${C.primary};padding:16px;overflow-y:auto;max-height:100vh;position:sticky;top:0}
  .sm-rd-titlebar{display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:2px solid ${C.primary};margin-bottom:12px}
  .sm-rd-badge{background:${C.primary};color:#fff;font-size:11px;font-weight:700;padding:3px 8px;letter-spacing:.05em}
  .sm-rd-title{font-size:15px;font-weight:700;color:${C.text}}
  .sm-rd-hint{font-size:11px;color:${C.text3};margin:0 0 14px;line-height:1.5}
  .sm-desc{background:#fff;border:2px solid ${C.primary};margin-bottom:12px;padding:12px;transition:background .15s,border-color .15s}
  .sm-desc-head{display:flex;align-items:center;gap:10px;margin-bottom:6px}
  .sm-desc-num{width:24px;height:24px;background:${C.primary};color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .sm-desc-title{font-size:13px;font-weight:700;color:${C.text};flex:1}
  .sm-desc-actions{display:flex;align-items:center;gap:4px;flex-shrink:0}
  .sm-desc-edit{font-size:11px;color:${C.primary};background:#eef4ff;border:1px solid ${C.primary};border-radius:4;padding:2px 8px;cursor:pointer;opacity:.85;transition:opacity .15s}
  .sm-desc-edit:hover{opacity:1}
  .sm-desc-del{font-size:11px;color:${C.text3};background:transparent;border:1px solid transparent;border-radius:4;padding:2px 6px;cursor:pointer}
  .sm-desc-del:hover{color:${C.danger};border-color:${C.danger};background:#fff}
  .sm-desc-text{font-size:12px;color:${C.text};line-height:1.6;margin:4px 0 0;white-space:pre-line}
  .sm-desc-list{list-style:none;padding:0;margin:6px 0 0}
  .sm-desc-list li{position:relative;padding:2px 0 2px 18px;font-size:12px;line-height:1.6;color:${C.text}}
  .sm-desc-list li::before{content:'';position:absolute;left:2px;top:10px;width:8px;height:8px;background:${C.primary}}
  .sm-add-module{width:100%;padding:8px;font-size:12px;color:${C.primary};background:#eef4ff;border:1px dashed ${C.primary};border-radius:6;cursor:pointer;margin-top:4px}
  .sm-add-module:hover{background:#e3edff}
  .sm-desc-link{font-size:10px;color:${C.primary};background:#eef4ff;border:1px solid ${C.primary};border-radius:4;padding:1px 6px;white-space:nowrap;flex-shrink:0;margin-left:4px}
  .sm-modal-field select{width:100%;box-sizing:border-box;font-size:13px;padding:8px 12px;border:1px solid ${C.border2};border-radius:6;background:#fff;font-family:inherit}
  .sm-modal-field select:focus{outline:none;border-color:${C.primary};box-shadow:0 0 0 3px rgba(43,108,255,.12)}
  .sm-modal-mask{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,.5);z-index:${Z.modal};display:flex;align-items:center;justify-content:center;padding:24px}
  .sm-modal{background:#fff;border-radius:12px;width:min(680px,92vw);max-height:88vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,.35);overflow:hidden}
  .sm-modal-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid ${C.border}}
  .sm-modal-title{font-size:15px;font-weight:700;color:${C.text}}
  .sm-modal-close{font-size:14px;color:${C.text3};background:transparent;border:none;cursor:pointer;padding:2px 6px;border-radius:4}
  .sm-modal-close:hover{background:#f1f5f9;color:${C.text}}
  .sm-modal-body{padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:16px}
  .sm-modal-field{display:flex;flex-direction:column;gap:6px}
  .sm-modal-label{font-size:12px;font-weight:600;color:${C.text2}}
  .sm-modal-field input,.sm-modal-field textarea{width:100%;box-sizing:border-box;font-size:13px;padding:8px 12px;border:1px solid ${C.border2};border-radius:6;font-family:inherit;line-height:1.6;resize:vertical;background:#fff}
  .sm-modal-field input:focus,.sm-modal-field textarea:focus{outline:none;border-color:${C.primary};box-shadow:0 0 0 3px rgba(43,108,255,.12)}
  .sm-modal-foot{display:flex;justify-content:flex-end;gap:10px;padding:14px 20px;border-top:1px solid ${C.border};background:#fafbfc}
  .sm-modal-btn{font-size:13px;padding:7px 18px;border-radius:6;cursor:pointer;font-weight:500}
  .sm-modal-btn.primary{background:${C.primary};color:#fff;border:1px solid ${C.primary}}
  .sm-modal-btn.primary:hover{background:${C.primaryHover}}
  .sm-modal-btn.ghost{background:#fff;color:${C.text2};border:1px solid ${C.border2}}
  .sm-modal-btn.ghost:hover{background:#f1f5f9}
  .sm-desc.active-highlight{background:${C.primary};border-color:${C.primary}}
  .sm-desc.active-highlight .sm-desc-num{background:#fff;color:${C.primary}}
  .sm-desc.active-highlight .sm-desc-title,
  .sm-desc.active-highlight .sm-desc-text,
  .sm-desc.active-highlight li{color:#fff}
  .sm-left-content [data-proto-id]{transition:box-shadow .15s,background .15s}
  .sm-left-content [data-proto-id].active-highlight{box-shadow:0 0 0 3px ${C.primary};background:${C.active}}
  .sm-connections{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999}
  .sm-quick-add{position:fixed;z-index:10000;font-size:11px;line-height:1;padding:4px 10px;color:#fff;background:${C.primary};border:none;border-radius:12;box-shadow:0 2px 8px rgba(15,23,42,.25);cursor:pointer;transform:translate(30%,-30%);pointer-events:auto;white-space:nowrap}
  .sm-quick-add:hover{background:${C.primaryHover}}
  .sm-connection{opacity:0;transition:opacity .15s ease}
  .sm-connection.active{opacity:1}
  .sm-connection-line{fill:none;stroke:${C.primary};stroke-width:2}
  .sm-connection.active .sm-connection-line{stroke-width:3}
  .sm-connection-bg{fill:${C.primary}}
  .sm-connection-label{fill:#fff;font-size:11px;font-weight:700;text-anchor:middle;dominant-baseline:central;font-family:inherit}
  @media (max-width: 900px){.sm-connections{display:none}}
`;

// ============ 设计说明落盘（写回原型源码 buildModules）============
// 编辑设计说明时实时写回原型源码，保证「工作面板」与「导出 HTML（含源码）」读取同一份真源。
async function fetchPrototypeSourceRaw(current: NavKey): Promise<string> {
  const text = await (await fetch(`/prototypes/${current}/index.tsx?raw`)).text();
  // 预览服务对 ?raw 有两种包裹：双引号 JSON（export default "..."）或反引号模板字符串（export default `...`）。
  // 需分别剥离包裹并完整反转义，恢复到与磁盘源码逐字节一致的文本——否则文本替换会因 CRLF/转义不匹配而 409 失败。
  const m = text.match(/export default\s+("(?:[^"\\]|\\.)*")/s);
  if (m) {
    try { return JSON.parse(m[1]); } catch { /* 退回反引号分支 */ }
  }
  const open = text.indexOf('`', text.indexOf('export default'));
  const close = text.lastIndexOf('`');
  if (open >= 0 && close > open) {
    return text
      .slice(open + 1, close)
      .replace(/\\([`$\\])/g, '$1')
      .replace(/\\(r|n|t|b|f|v|0)/g, (_, ch) => ({ r: '\r', n: '\n', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0' }[ch] as string));
  }
  return text;
}

/** 从 buildModules 源码中抽取当前子页（或全部）对应的 `return [ ... ]` 块原文 */
function extractReturnBlock(src: string, pageSub?: string): string | null {
  const fnIdx = src.indexOf('function buildModules');
  if (fnIdx < 0) return null;
  // 先定位 buildModules 函数体范围 [fnIdx, fnEnd)，避免误命中文件其它位置的 return [
  const braceStart = src.indexOf('{', fnIdx);
  if (braceStart < 0) return null;
  let depth = 0;
  let fnEnd = -1;
  let inStr = false;
  let strCh = '';
  for (let i = braceStart; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { fnEnd = i; break; } }
  }
  if (fnEnd < 0) return null;
  let rs: number;
  if (pageSub) {
    const marker = `if (sub === '${pageSub}') {`;
    const ai = src.indexOf(marker, fnIdx);
    if (ai >= 0 && ai < fnEnd) {
      rs = src.indexOf('return [', ai);
    } else {
      // 该子页是默认分支（无 if 包裹，位于函数末尾）
      rs = src.lastIndexOf('return [', fnEnd);
    }
  } else {
    rs = src.indexOf('return [', fnIdx);
  }
  if (rs < 0 || rs >= fnEnd) return null;
  const bracketStart = src.indexOf('[', rs);
  // 复用上方已声明的 depth / inStr / strCh（重置后用于定位数组闭合 ]）
  depth = 0;
  inStr = false;
  strCh = '';
  for (let i = bracketStart; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) return src.slice(rs, i + 1); }
  }
  return null;
}

function quoteModuleStr(s: string): string {
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '')}'`;
}

function serializeModuleArray(arr: ModuleDef[], eol = '\n'): string {
  const items = arr.map((mm) => {
    const parts = [`id: ${quoteModuleStr(mm.id)}`, `title: ${quoteModuleStr(mm.title)}`];
    if (mm.text) parts.push(`text: ${quoteModuleStr(mm.text)}`);
    if (mm.list && mm.list.length) parts.push(`list: [${mm.list.map(quoteModuleStr).join(', ')}]`);
    if (mm.bind) parts.push(`bind: ${quoteModuleStr(mm.bind)}`);
    return `    { ${parts.join(', ')} }`;
  });
  return `[${eol}${items.join(',' + eol)}${eol}  ]`;
}

/** 将设计说明模块数组写回原型源码 buildModules，通过本地编辑 API 做文本替换 */
async function saveDesignNotesToSource(
  current: NavKey,
  pageSub: string | undefined,
  next: ModuleDef[],
): Promise<void> {
  const src = await fetchPrototypeSourceRaw(current);
  const block = extractReturnBlock(src, pageSub);
  if (!block) throw new Error('未在源码中找到 buildModules 对应模块块');
  const eol = block.includes('\r\n') ? '\r\n' : '\n';
  const replaceText = `return ${serializeModuleArray(next, eol)}`;
  const res = await fetch('/api/text-replace/replace', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: `prototypes/${current}`,
      replacements: [{ searchText: block, replaceText }],
    }),
  });
  const data = (await res.json()) as { success?: boolean; error?: string };
  if (!data?.success) throw new Error(data?.error || '本地保存失败');
}

// ============ StructureMonitorShell 主组件 ============
export function StructureMonitorShell({
  current, onSelect, modules, pageSub, children,
}: {
  current: NavKey;
  onSelect: (k: NavKey) => void;
  modules: Array<{ id: string; title: string; text?: string; list?: string[] }>;
  /** 当前子页签名（无子页签的原型不传）；用于在源码 buildModules 中定位对应 return 块 */
  pageSub?: string;
  children: React.ReactNode;
}) {
  const navItem = NAV.find((n) => n.key === current)!;

  // 左菜单数据（规范组件 SideMenu 契约：sub 不进菜单层级，二级仍是页内 Tab）
  const menuItems = React.useMemo(
    () => NAV.map((n) => ({ key: n.key, label: n.label })),
    [],
  );
  const breadcrumb = `工程监测 / 结构监测 / ${navItem.label}`;

  // 编辑状态（按单模块弹窗编辑）
  const [editing, setEditing] = useState<{ m: ModuleDef; index: number; isNew?: boolean } | null>(null);
  const [localOverride, setLocalOverride] = useState<ModuleDef[] | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  // 左侧当前页面可关联的模块（data-proto-id -> 可读标签），供「关联页面模块」下拉使用
  const [bindTargets, setBindTargets] = useState<Array<{ id: string; label: string }>>([]);
  // 悬停「+ 加说明」快捷入口的目标元素
  const [quickAddTarget, setQuickAddTarget] = useState<{ id: string; rect: DOMRect } | null>(null);

  // 旧版本地草稿 key（非破坏性恢复用）：axhub-sm-notes-<current>-<模块id签名>
  const storageKey = `axhub-sm-notes-${current}-${modules.map((m) => m.id).join(',')}`;

  const displayModules = localOverride ?? modules;

  // 挂载 / 切换子页时，从浏览器 localStorage 非破坏性地恢复此前保存的设计说明草稿
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) setLocalOverride(parsed as ModuleDef[]);
    } catch {
      /* 草稿损坏则忽略，退回源码 */
    }
  }, [storageKey]);

  const persist = (next: ModuleDef[]) => {
    // 乐观更新 + 实时落盘到原型源码 buildModules，保证工作面板与导出 HTML 一致
    setLocalOverride(next);
    setSaveError(null);
    // 本地草稿兜底：先写 localStorage，确保落盘前/失败时数据不丢（非破坏性）
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* 本地存储不可用时忽略，仅依赖落盘 */
    }
    void saveDesignNotesToSource(current, pageSub, next).then(
      () => {
        setSaveError(null);
        // 落盘成功后源码即真源，清除本地草稿兜底，视图回退到源码（内容一致）
        try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
        setLocalOverride(null);
      },
      (err: unknown) => {
        console.error('[设计说明落盘失败]', err);
        // 落盘失败时保留本地草稿视图（localStorage 已兜底），仅提示错误，不回退到源码避免误以为数据丢失
        setSaveError(err instanceof Error ? err.message : '设计说明保存失败，请重试');
      },
    );
  };

  const handleSaveModule = (m: ModuleDef) => {
    if (editing) {
      // 若选择的绑定目标已被其他模块占用，则清空 bind，避免重复连线
      if (m.bind && displayModules.some((mod, i) => i !== editing!.index && (mod.bind ?? mod.id) === m.bind)) {
        m = { ...m, bind: undefined };
      }
      const next = [...displayModules];
      if (editing.isNew) {
        next.push(m); // 新增：保存时才写入
      } else {
        next[editing.index] = m;
      }
      persist(next);
    }
    setEditing(null);
  };

  const addModule = () => {
    // 仅打开弹窗，暂不写入；点「取消」直接丢弃
    const m: ModuleDef = { id: `custom-${Date.now()}`, title: '新模块', text: '', list: [] };
    setEditing({ m, index: -1, isNew: true });
  };

  const addModuleBoundTo = (bindId: string) => {
    const m: ModuleDef = { id: `custom-${Date.now()}`, title: '新模块', text: '', list: [], bind: bindId };
    setEditing({ m, index: -1, isNew: true });
    setQuickAddTarget(null);
  };

  const removeModule = (index: number) => {
    const next = displayModules.filter((_, i) => i !== index);
    persist(next);
  };

  const handleReset = () => {
    // 源码为唯一真源：重置即放弃未落盘的乐观修改，回退到源码版本
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    setLocalOverride(null);
    setSaveError(null);
  };

  // 联动状态
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const connsRef = useRef<Array<{ pid: string; g: SVGGElement; le: HTMLElement; re: HTMLElement }>>([]);
  const quickAddHideTimer = useRef<number | null>(null);

  // SVG 连线
  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    const svg = svgRef.current;
    if (!left || !right || !svg) return;

    const indexMap = new Map(displayModules.map((m, i) => [m.bind ?? m.id, i + 1]));
    const draw = () => {
      svg.innerHTML = '';
      connsRef.current = [];
      const leftEls = Array.from(left.querySelectorAll<HTMLElement>('[data-proto-id]'));
      leftEls.forEach((le) => {
        const pid = le.getAttribute('data-proto-id')!;
        // 同一页面模块可能被多个设计说明关联（默认模块 + 用户新增的补充模块），全部连线
        const res = right.querySelectorAll<HTMLElement>(`.sm-desc[data-proto-id="${CSS.escape(pid)}"]`);
        if (!res.length) return;
        const lr = le.getBoundingClientRect();
        if (!lr.width || !lr.height) return;
        res.forEach((re, j) => {
          const rr = re.getBoundingClientRect();
          if (!rr.width || !rr.height) return;
          const x1 = lr.right, y1 = lr.top + lr.height / 2;
          const x2 = rr.left, y2 = rr.top + rr.height / 2 + j * 10;
          const dx = Math.max((x2 - x1) * 0.4, 40);
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('class', 'sm-connection');
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
          path.setAttribute('class', 'sm-connection-line');
          g.appendChild(path);
          const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;
          const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          bg.setAttribute('cx', String(midX));
          bg.setAttribute('cy', String(midY));
          bg.setAttribute('r', '10');
          bg.setAttribute('class', 'sm-connection-bg');
          g.appendChild(bg);
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', String(midX));
          text.setAttribute('y', String(midY));
          text.setAttribute('dy', '0.05em');
          text.setAttribute('class', 'sm-connection-label');
          const num = indexMap.get(pid);
          text.textContent = num != null ? String(num) : '';
          g.appendChild(text);
          const act = activeIdRef.current !== null && String(pid) === String(activeIdRef.current);
          connsRef.current.push({ pid, g, le, re });
          if (act) {
            g.classList.add('active');
            le.classList.add('active-highlight');
            re.classList.add('active-highlight');
          }
          svg.appendChild(g);
        });
      });
    };

    draw();
    const onScroll = () => requestAnimationFrame(draw);
    left.addEventListener('scroll', onScroll, { passive: true });
    right.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      left.removeEventListener('scroll', onScroll);
      right.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [displayModules, children]);

  // 扫描左侧页面元素，收集可关联的模块清单（已被绑定的不再出现在下拉，避免重复）
  useEffect(() => {
    const left = leftRef.current;
    if (!left) { setBindTargets([]); return; }
    const boundIds = new Set(displayModules.map((m) => m.bind ?? m.id));
    const seen = new Set<string>();
    const opts: Array<{ id: string; label: string }> = [];
    left.querySelectorAll<HTMLElement>('[data-proto-id]').forEach((le) => {
      const id = le.getAttribute('data-proto-id')!;
      if (seen.has(id) || boundIds.has(id)) return;
      seen.add(id);
      opts.push({ id, label: deriveLabel(le, id) });
    });
    setBindTargets(opts);
  }, [children, current, displayModules]);

  // 左侧已绑定模块悬停时显示「+ 加说明」快捷入口
  useEffect(() => {
    const left = leftRef.current;
    if (!left) return;
    const boundIds = new Set(displayModules.map((m) => m.bind ?? m.id));
    const enter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const id = el.getAttribute('data-proto-id')!;
      if (boundIds.has(id)) return;
      if (quickAddHideTimer.current) { clearTimeout(quickAddHideTimer.current); quickAddHideTimer.current = null; }
      setQuickAddTarget({ id, rect: el.getBoundingClientRect() });
    };
    // 离开模块不直接隐藏，留一段缓冲期，避免移向按钮途中按钮消失（hover 死锁）
    const leave = () => {
      if (quickAddHideTimer.current) clearTimeout(quickAddHideTimer.current);
      quickAddHideTimer.current = window.setTimeout(() => setQuickAddTarget(null), 1000);
    };
    const els = Array.from(left.querySelectorAll<HTMLElement>('[data-proto-id]'));
    els.forEach((el) => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
    return () => els.forEach((el) => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
  }, [children, current, displayModules]);

  // 滚动/resize 时隐藏快捷入口，避免位置漂移
  useEffect(() => {
    const hide = () => setQuickAddTarget(null);
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
    return () => {
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
    };
  }, []);

  // activeId 变化同步高亮
  useEffect(() => {
    connsRef.current.forEach((c) => {
      const act = activeId !== null && String(c.pid) === String(activeId);
      c.g.classList.toggle('active', act);
      c.le.classList.toggle('active-highlight', act);
      c.re.classList.toggle('active-highlight', act);
    });
  }, [activeId]);

  const handleHover = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest('[data-proto-id]');
    if (el) setActiveId(el.getAttribute('data-proto-id'));
  };

  const hasOverride = localOverride !== null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>
      <style>{DescStyle}</style>
      <SideMenu
      title="结构监测"
      items={menuItems}
      defaultSelectedKey={current}
      onMenuSelect={(k) => onSelect(k as NavKey)}
    />
      <main style={{ flex: 1, minWidth: 0, display: 'flex' }}>
        <section ref={leftRef} className="sm-left-content" style={{ position: 'relative', zIndex: Z.content, flex: 1, minWidth: 0, padding: '20px 28px 40px', overflowY: 'auto', maxHeight: '100vh' }} onMouseOver={handleHover} onMouseLeave={() => setActiveId(null)}>
          <div style={{ fontSize: 12, color: C.text3, marginBottom: 8 }}>{breadcrumb}</div>
          {children}
        </section>
        <aside ref={rightRef} className="sm-right" style={{ zIndex: Z.aside }} onMouseOver={handleHover} onMouseLeave={() => setActiveId(null)}>
          <div className="sm-rd-titlebar" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="sm-rd-badge">DESIGN NOTES</span>
              <span className="sm-rd-title">设计说明</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {saveError ? (
                <span style={{ fontSize: 10, color: C.danger, display: 'flex', alignItems: 'center', gap: 4 }} title={saveError}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.danger, display: 'inline-block' }} />
                  ⚠ 落盘失败
                </span>
              ) : hasOverride ? (
                <span style={{ fontSize: 10, color: '#b7791f', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b7791f', display: 'inline-block' }} />
                  本地草稿·待保存
                </span>
              ) : null}
              {hasOverride && (
                <button onClick={() => persist(displayModules)} title="将设计说明写入原型源码 buildModules（落盘）" style={{ fontSize: 11, padding: '4px 10px', background: '#2b6cb0', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                  保存到源码
                </button>
              )}
              <button onClick={handleReset} title="恢复为默认说明内容" style={{ fontSize: 11, padding: '4px 10px', background: '#fff', color: C.text3, border: `1px solid ${C.border}`, borderRadius: 4, cursor: 'pointer' }}>
                重置
              </button>
            </div>
          </div>
          <p className="sm-rd-hint">点击下方「+ 添加模块」可为页面任意区域补充设计说明：在弹窗中选择「关联左侧页面模块」即可自动生成连线；悬停模块可高亮对应区域。</p>
          {displayModules.map((m, i) => (
            <DescCard
              key={`${m.id}-${i}`}
              m={m}
              index={i}
              bindLabel={bindTargets.find((t) => t.id === (m.bind ?? m.id))?.label ?? (m.bind ?? m.id)}
              onEdit={(mod, idx) => setEditing({ m: mod, index: idx })}
              onRemove={removeModule}
            />
          ))}
          <button className="sm-add-module" onClick={addModule}>+ 添加模块</button>
        </aside>
      </main>
      <svg className="sm-connections" ref={svgRef}></svg>
      {quickAddTarget && (
        <button
          className="sm-quick-add"
          style={{ left: quickAddTarget.rect.right - 8, top: quickAddTarget.rect.top + 4 }}
          onMouseEnter={() => { if (quickAddHideTimer.current) { clearTimeout(quickAddHideTimer.current); quickAddHideTimer.current = null; } }}
          onMouseLeave={() => setQuickAddTarget(null)}
          onClick={() => addModuleBoundTo(quickAddTarget.id)}
        >+ 加说明</button>
      )}
      {editing && (
        <DescModal
          initial={editing.m}
          onSave={handleSaveModule}
          onClose={() => setEditing(null)}
          bindOptions={bindTargets}
        />
      )}
    </div>
  );
}
