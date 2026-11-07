/**
 * 设计说明模块 · 可复用面板（DesignNotesPanel）
 * ------------------------------------------------------------------
 * 为一栏原型页面提供右侧「设计说明」面板：Xbox 风格编号卡片 + SVG 连线 + 悬停高亮
 * + 新增 / 编辑 / 删除模块 + 数据落盘（通过 onSave 注入，模块零后端依赖）。
 *
 * 接入前置：
 *   - 宿主提供「左侧主内容区」的 ref（leftContentRef），其内部任意可独立说明的区域
 *     需打上 data-proto-id="<模块id>"（可选 data-proto-label="可读名"）。
 *   - 宿主在三栏布局里把本面板挂在右侧，并把它需要的 leftContentRef 传进来。
 *
 * 持久化：
 *   - 传 onSave => 编辑后实时调用，成功清草稿、失败留草稿并提示。
 *   - 不传 onSave => 仅 localStorage 本地草稿模式，适合纯预览 / 暂存场景。
 *
 * 本文件可直接复制到任意 React 项目使用（仅依赖 react）。
 */
import React, { useEffect, useRef, useState } from 'react';
import type { DesignNotesSaveAdapter, ModuleDef } from './designNotesTypes';

// ============ 自包含配色（与宿主解耦，避免读不到外部 C 常量） ============
const C = {
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
  danger: '#dc2626',
};

// 浮层层级：连线 SVG 置顶（覆盖所有面板），弹窗居中
const Z_MODAL = 1000;
const Z_CONN = 9999;

// ============ 组件属性 ============
export interface DesignNotesPanelProps {
  /** 设计说明真源数组（来自源码 buildModules / 后端）。新增编辑以它为基础，面板内部用本地草稿叠加展示。 */
  modules: ModuleDef[];
  /** 页面签名，如 dashboard / alarm / diagnosis，用于定位落盘目标与本地草稿 key */
  pageKey: string;
  /** 子页签名（无二级子页签不传），用于定位源码对应 return 块与草稿 key */
  pageSub?: string;
  /** 左侧主内容容器 ref（含 [data-proto-id] 元素）；连线与「可绑定模块」下拉都从这里扫描 */
  leftContentRef: React.RefObject<HTMLElement>;
  /** 持久化适配器：新增 / 编辑 / 删除后触发；不传则仅本地草稿。 */
  onSave?: DesignNotesSaveAdapter;
  /** 面板标题文案，默认「设计说明」 */
  title?: string;
  /**
   * 左侧内容版本号：当宿主切换子页 / 重渲染左侧 DOM 时变化，触发连线与可绑定清单重扫。
   * 不传时面板仅在 modules 变化时重扫（多数场景够用）。
   */
  contentKey?: string;
}

// ============ 从左侧页面元素推导可读标签（用于「关联页面模块」下拉与卡片标签） ============
function deriveLabel(el: HTMLElement, id: string): string {
  const explicit = el.getAttribute('data-proto-label');
  if (explicit) return explicit;
  const titleEl = el.querySelector('h1,h2,h3,h4,.dn-desc-title,[class*="title"]');
  const t = titleEl?.textContent?.replace(/\s+/g, ' ').trim();
  if (t) return t.length > 30 ? t.slice(0, 30) + '…' : t;
  const txt = el.textContent?.replace(/\s+/g, ' ').trim();
  if (txt) return txt.length > 30 ? txt.slice(0, 30) + '…' : txt;
  return id;
}

// ============ 单卡片 ============
function DescCard({
  m, index, onEdit, onRemove, bindLabel,
}: {
  m: ModuleDef; index: number;
  onEdit: (m: ModuleDef, index: number) => void;
  onRemove?: (index: number) => void;
  bindLabel?: string;
}) {
  return (
    <div data-proto-id={m.bind ?? m.id} className="dn-desc">
      <div className="dn-desc-head">
        <span className="dn-desc-num">{index + 1}</span>
        <span className="dn-desc-title">{m.title}</span>
        {m.bind && (
          <span className="dn-desc-link" title={`已关联左侧页面模块：${m.bind}`}>🔗 {bindLabel ?? m.bind}</span>
        )}
        <span className="dn-desc-actions">
          <button
            className="dn-desc-edit"
            title="编辑本模块说明"
            onClick={(e) => { e.stopPropagation(); onEdit(m, index); }}
          >✎ 编辑</button>
          {onRemove && (
            <button
              className="dn-desc-del"
              title="删除本模块"
              onClick={(e) => { e.stopPropagation(); onRemove(index); }}
            >✕</button>
          )}
        </span>
      </div>
      {m.text && <div className="dn-desc-text">{m.text}</div>}
      {m.list && m.list.length > 0 && (
        <ul className="dn-desc-list">
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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
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
    <div className="dn-modal-mask">
      <div className="dn-modal">
        <div className="dn-modal-head">
          <div className="dn-modal-title">编辑设计说明模块</div>
          <button className="dn-modal-close" onClick={onClose} title="关闭">✕</button>
        </div>
        <div className="dn-modal-body">
          <div className="dn-modal-field">
            <div className="dn-modal-label">模块标题</div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="模块标题" autoFocus />
          </div>
          <div className="dn-modal-field">
            <div className="dn-modal-label">关联左侧页面模块（可选 · 选择后自动生成连线）</div>
            <select value={bind} onChange={(e) => setBind(e.target.value)}>
              <option value="">（不关联 · 该模块不显示连线）</option>
              {(bindOptions || []).map((o) => (
                <option key={o.id} value={o.id}>{o.label}（{o.id}）</option>
              ))}
            </select>
          </div>
          <div className="dn-modal-field">
            <div className="dn-modal-label">说明文本</div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入该模块的说明文本" style={{ minHeight: 60 }} />
          </div>
          <div className="dn-modal-field">
            <div className="dn-modal-label">要点列表（每行一条，可为空）</div>
            <textarea
              value={listText}
              onChange={(e) => setListText(e.target.value)}
              placeholder={'示例：\n对接厂商接口 /field\n待厂商补充单位字段'}
              style={{ minHeight: 240 }}
            />
          </div>
        </div>
        <div className="dn-modal-foot">
          <button className="dn-modal-btn ghost" onClick={onClose}>取消</button>
          <button className="dn-modal-btn primary" onClick={handleSave}>保存修改</button>
        </div>
      </div>
    </div>
  );
}

const DescStyle = `
  .dn-right{width:360px;min-width:360px;background:#fff;border-left:3px solid ${C.primary};padding:16px;overflow-y:auto;max-height:100vh;position:sticky;top:0}
  .dn-rd-titlebar{display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:2px solid ${C.primary};margin-bottom:12px}
  .dn-rd-badge{background:${C.primary};color:#fff;font-size:11px;font-weight:700;padding:3px 8px;letter-spacing:.05em}
  .dn-rd-title{font-size:15px;font-weight:700;color:${C.text}}
  .dn-rd-hint{font-size:11px;color:${C.text3};margin:0 0 14px;line-height:1.5}
  .dn-desc{background:#fff;border:2px solid ${C.primary};margin-bottom:12px;padding:12px;transition:background .15s,border-color .15s}
  .dn-desc-head{display:flex;align-items:center;gap:10px;margin-bottom:6px}
  .dn-desc-num{width:24px;height:24px;background:${C.primary};color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .dn-desc-title{font-size:13px;font-weight:700;color:${C.text};flex:1}
  .dn-desc-actions{display:flex;align-items:center;gap:4px;flex-shrink:0}
  .dn-desc-edit{font-size:11px;color:${C.primary};background:#eef4ff;border:1px solid ${C.primary};border-radius:4;padding:2px 8px;cursor:pointer;opacity:.85;transition:opacity .15s}
  .dn-desc-edit:hover{opacity:1}
  .dn-desc-del{font-size:11px;color:${C.text3};background:transparent;border:1px solid transparent;border-radius:4;padding:2px 6px;cursor:pointer}
  .dn-desc-del:hover{color:${C.danger};border-color:${C.danger};background:#fff}
  .dn-desc-text{font-size:12px;color:${C.text};line-height:1.6;margin:4px 0 0;white-space:pre-line}
  .dn-desc-list{list-style:none;padding:0;margin:6px 0 0}
  .dn-desc-list li{position:relative;padding:2px 0 2px 18px;font-size:12px;line-height:1.6;color:${C.text}}
  .dn-desc-list li::before{content:'';position:absolute;left:2px;top:10px;width:8px;height:8px;background:${C.primary}}
  .dn-add-module{width:100%;padding:8px;font-size:12px;color:${C.primary};background:#eef4ff;border:1px dashed ${C.primary};border-radius:6;cursor:pointer;margin-top:4px}
  .dn-add-module:hover{background:#e3edff}
  .dn-desc-link{font-size:10px;color:${C.primary};background:#eef4ff;border:1px solid ${C.primary};border-radius:4;padding:1px 6px;white-space:nowrap;flex-shrink:0;margin-left:4px}
  .dn-modal-field select{width:100%;box-sizing:border-box;font-size:13px;padding:8px 12px;border:1px solid ${C.border2};border-radius:6;background:#fff;font-family:inherit}
  .dn-modal-field select:focus{outline:none;border-color:${C.primary};box-shadow:0 0 0 3px rgba(43,108,255,.12)}
  .dn-modal-mask{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,.5);z-index:${Z_MODAL};display:flex;align-items:center;justify-content:center;padding:24px}
  .dn-modal{background:#fff;border-radius:12px;width:min(680px,92vw);max-height:88vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,.35);overflow:hidden}
  .dn-modal-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid ${C.border}}
  .dn-modal-title{font-size:15px;font-weight:700;color:${C.text}}
  .dn-modal-close{font-size:14px;color:${C.text3};background:transparent;border:none;cursor:pointer;padding:2px 6px;border-radius:4}
  .dn-modal-close:hover{background:#f1f5f9;color:${C.text}}
  .dn-modal-body{padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:16px}
  .dn-modal-field{display:flex;flex-direction:column;gap:6px}
  .dn-modal-label{font-size:12px;font-weight:600;color:${C.text2}}
  .dn-modal-field input,.dn-modal-field textarea{width:100%;box-sizing:border-box;font-size:13px;padding:8px 12px;border:1px solid ${C.border2};border-radius:6;font-family:inherit;line-height:1.6;resize:vertical;background:#fff}
  .dn-modal-field input:focus,.dn-modal-field textarea:focus{outline:none;border-color:${C.primary};box-shadow:0 0 0 3px rgba(43,108,255,.12)}
  .dn-modal-foot{display:flex;justify-content:flex-end;gap:10px;padding:14px 20px;border-top:1px solid ${C.border};background:#fafbfc}
  .dn-modal-btn{font-size:13px;padding:7px 18px;border-radius:6;cursor:pointer;font-weight:500}
  .dn-modal-btn.primary{background:${C.primary};color:#fff;border:1px solid ${C.primary}}
  .dn-modal-btn.primary:hover{background:${C.primaryHover}}
  .dn-modal-btn.ghost{background:#fff;color:${C.text2};border:1px solid ${C.border2}}
  .dn-modal-btn.ghost:hover{background:#f1f5f9}
  .dn-desc.active-highlight{background:${C.primary};border-color:${C.primary}}
  .dn-desc.active-highlight .dn-desc-num{background:#fff;color:${C.primary}}
  .dn-desc.active-highlight .dn-desc-title,
  .dn-desc.active-highlight .dn-desc-text,
  .dn-desc.active-highlight li{color:#fff}
  /* 左侧页面模块高亮：[data-proto-id] 由宿主打标，不依赖宿主容器类名 */
  [data-proto-id].active-highlight{box-shadow:0 0 0 3px ${C.primary};background:${C.active}}
  .dn-connections{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:${Z_CONN}}
  .dn-quick-add{position:fixed;z-index:${Z_CONN + 1};font-size:11px;line-height:1;padding:4px 10px;color:#fff;background:${C.primary};border:none;border-radius:12;box-shadow:0 2px 8px rgba(15,23,42,.25);cursor:pointer;transform:translate(30%,-30%);pointer-events:auto;white-space:nowrap}
  .dn-quick-add:hover{background:${C.primaryHover}}
  .dn-connection{opacity:0;transition:opacity .15s ease}
  .dn-connection.active{opacity:1}
  .dn-connection-line{fill:none;stroke:${C.primary};stroke-width:2}
  .dn-connection.active .dn-connection-line{stroke-width:3}
  .dn-connection-bg{fill:${C.primary}}
  .dn-connection-label{fill:#fff;font-size:11px;font-weight:700;text-anchor:middle;dominant-baseline:central;font-family:inherit}
  @media (max-width: 900px){.dn-connections{display:none}}
`;

// ============ 主组件 ============
export function DesignNotesPanel({
  modules, pageKey, pageSub, leftContentRef, onSave, title = '设计说明', contentKey,
}: DesignNotesPanelProps) {
  // 编辑状态（按单模块弹窗编辑）
  const [editing, setEditing] = useState<{ m: ModuleDef; index: number; isNew?: boolean } | null>(null);
  const [localOverride, setLocalOverride] = useState<ModuleDef[] | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  // 左侧当前页面可关联的模块（data-proto-id -> 可读标签），供「关联页面模块」下拉使用
  const [bindTargets, setBindTargets] = useState<Array<{ id: string; label: string }>>([]);
  // 悬停「+ 加说明」快捷入口的目标元素
  const [quickAddTarget, setQuickAddTarget] = useState<{ id: string; rect: DOMRect } | null>(null);

  // 旧版本地草稿 key（非破坏性恢复用）：dn-notes-<pageKey>-<子页>-<模块id签名>
  const storageKey = `dn-notes-${pageKey}-${pageSub ?? ''}-${modules.map((m) => m.id).join(',')}`;

  const displayModules = localOverride ?? modules;

  // 挂载 / contentKey 变化时，从浏览器 localStorage 非破坏性地恢复此前保存的设计说明草稿
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) setLocalOverride(parsed as ModuleDef[]);
    } catch { /* 草稿损坏则忽略，退回真源 */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const persist = (next: ModuleDef[]) => {
    // 乐观更新 + （若有适配器）实时落盘，保证工作面板与导出 HTML 一致
    setLocalOverride(next);
    setSaveError(null);
    // 本地草稿兜底：先写 localStorage，确保落盘前/失败时数据不丢（非破坏性）
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* 本地存储不可用时忽略，仅依赖落盘 */ }
    if (!onSave) return; // 无适配器：仅本地草稿模式
    void Promise.resolve(onSave(next, { pageKey, pageSub })).then(
      () => {
        setSaveError(null);
        // 落盘成功后真源已更新，清除本地草稿兜底，视图回退到真源（内容一致）
        try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
        setLocalOverride(null);
      },
      (err: unknown) => {
        console.error('[设计说明落盘失败]', err);
        // 落盘失败时保留本地草稿视图（localStorage 已兜底），仅提示错误，不回退避免误以为数据丢失
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
      if (editing.isNew) next.push(m); // 新增：保存时才写入
      else next[editing.index] = m;
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
    // 真源为唯一基准：重置即放弃未落盘的乐观修改，回退到真源版本
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    setLocalOverride(null);
    setSaveError(null);
  };

  // 联动状态
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  const rightRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const connsRef = useRef<Array<{ pid: string; g: SVGGElement; le: HTMLElement; re: HTMLElement }>>([]);
  const quickAddHideTimer = useRef<number | null>(null);

  // SVG 连线
  useEffect(() => {
    const left = leftContentRef.current;
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
        const res = right.querySelectorAll<HTMLElement>(`.dn-desc[data-proto-id="${CSS.escape(pid)}"]`);
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
          g.setAttribute('class', 'dn-connection');
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
          path.setAttribute('class', 'dn-connection-line');
          g.appendChild(path);
          const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;
          const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          bg.setAttribute('cx', String(midX));
          bg.setAttribute('cy', String(midY));
          bg.setAttribute('r', '10');
          bg.setAttribute('class', 'dn-connection-bg');
          g.appendChild(bg);
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', String(midX));
          text.setAttribute('y', String(midY));
          text.setAttribute('dy', '0.05em');
          text.setAttribute('class', 'dn-connection-label');
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
  }, [displayModules, leftContentRef, contentKey]);

  // 扫描左侧页面元素，收集可关联的模块清单（已被绑定的不再出现在下拉，避免重复）
  useEffect(() => {
    const left = leftContentRef.current;
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
  }, [leftContentRef, contentKey, displayModules]);

  // 左侧已绑定模块悬停时显示「+ 加说明」快捷入口
  useEffect(() => {
    const left = leftContentRef.current;
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
  }, [leftContentRef, contentKey, displayModules]);

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
    <>
      <style>{DescStyle}</style>
      <aside ref={rightRef} className="dn-right" onMouseOver={handleHover} onMouseLeave={() => setActiveId(null)}>
        <div className="dn-rd-titlebar" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="dn-rd-badge">DESIGN NOTES</span>
            <span className="dn-rd-title">{title}</span>
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
            {hasOverride && onSave && (
              <button onClick={() => persist(displayModules)} title="将设计说明写入真源（落盘）" style={{ fontSize: 11, padding: '4px 10px', background: '#2b6cff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                保存到真源
              </button>
            )}
            <button onClick={handleReset} title="恢复为默认说明内容" style={{ fontSize: 11, padding: '4px 10px', background: '#fff', color: C.text3, border: `1px solid ${C.border}`, borderRadius: 4, cursor: 'pointer' }}>
              重置
            </button>
          </div>
        </div>
        <p className="dn-rd-hint">点击下方「+ 添加模块」可为页面任意区域补充设计说明：在弹窗中选择「关联左侧页面模块」即可自动生成连线；悬停模块可高亮对应区域。</p>
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
        <button className="dn-add-module" onClick={addModule}>+ 添加模块</button>
      </aside>
      <svg className="dn-connections" ref={svgRef}></svg>
      {quickAddTarget && (
        <button
          className="dn-quick-add"
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
    </>
  );
}

export default DesignNotesPanel;
