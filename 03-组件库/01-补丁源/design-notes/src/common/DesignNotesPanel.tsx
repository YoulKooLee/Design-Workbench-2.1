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
import type { DesignNotesSaveAdapter, ModuleDef, NoteStatus } from './designNotesTypes';

// ============ 自包含配色（微软 Fluent 风格；与宿主解耦，避免读不到外部 C 常量） ============
const C = {
  bg: '#f5f7fa',
  panel: '#ffffff',
  border: '#edebe9',
  border2: '#d2d0ce',
  hover: '#f3f2f1',
  active: '#eff6fc',
  text: '#242424',
  text2: '#424242',
  text3: '#797775',
  primary: '#0067b8',
  primaryHover: '#106ebe',
  danger: '#d13438',
};

// 浮层层级：连线 SVG 置顶（覆盖所有面板），弹窗居中
const Z_MODAL = 1000;
const Z_CONN = 9999;

/** 面板展开态宽度（收起态 54px）。导出给宿主做布局预留用（兼容出口，与规范文档一致） */
export const NOTES_PANEL_WIDTH = 360;

// ============ 状态标记字典（顺序即选择器展示顺序） ============
const STATUS_META: Record<NoteStatus, { label: string; color: string; bg: string; border: string }> = {
  designing: { label: '设计中', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe' },
  reviewed: { label: '已评审', color: '#6d28d9', bg: '#f5f3ff', border: '#ddd6fe' },
  todo: { label: '待开发', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
  developing: { label: '开发中', color: '#0f766e', bg: '#f0fdfa', border: '#99f6e4' },
  done: { label: '已完成', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
};
const STATUS_ORDER: NoteStatus[] = ['designing', 'reviewed', 'todo', 'developing', 'done'];

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
  /** 自定义面板顶部提示语；不传用内置提示 */
  hint?: string;
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

// ============ 富文本编辑辅助 ============
// 编辑器内容保存时的分流规则：
//   - 含任何格式标签（加粗/斜体/颜色等） => 存 rich（受限 HTML）
//   - 只有纯文本 + 项目符号（ul/li）     => 还原为 text + list 两字段，旧数据回写源码零 diff
const RICH_TAG_RE = /<(b|strong|i|em|u|s|font|span|ol|h[1-6])[\s>]|style=/i;

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** 把老格式（text + list）转换为编辑器初始 HTML：正文逐行 div，要点转 ul/li */
function plainToEditorHtml(m: ModuleDef): string {
  const parts: string[] = [];
  (m.text ?? '').split('\n').forEach((line) => {
    parts.push(`<div>${escapeHtml(line) || '<br>'}</div>`);
  });
  if (m.list && m.list.length) {
    parts.push(`<ul>${m.list.map((l) => `<li>${escapeHtml(l)}</li>`).join('')}</ul>`);
  }
  return parts.join('') || '';
}

/** 保存前的净化：去除脚本类标签与 on 事件、javascript: 属性，只保留排版能力 */
function sanitizeRichHtml(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('script,style,iframe,object,embed,link,meta').forEach((el) => el.remove());
  div.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((a) => {
      const n = a.name.toLowerCase();
      const v = a.value.trim().toLowerCase();
      if (n.startsWith('on') || ((n === 'href' || n === 'src') && v.startsWith('javascript:'))) {
        el.removeAttribute(a.name);
      }
    });
  });
  return div.innerHTML;
}

/** 递归取纯文本：块级元素（div/p）后补换行，br 转换行 */
function nodePlainText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? '';
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const el = node as HTMLElement;
  if (el.tagName === 'BR') return '\n';
  let out = '';
  el.childNodes.forEach((ch) => { out += nodePlainText(ch); });
  if (el.tagName === 'DIV' || el.tagName === 'P') out += '\n';
  return out;
}

/** 从编辑器 HTML 提取纯文本正文（剥离 ul/ol 后的剩余内容） */
function plainTextOfHtml(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('ul,ol').forEach((el) => el.remove());
  let s = '';
  div.childNodes.forEach((ch) => { s += nodePlainText(ch); });
  return s
    .replace(/\u00a0/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** 从编辑器 HTML 提取全部 li 文本（作为要点列表还原） */
function listItemsOfHtml(html: string): string[] {
  const div = document.createElement('div');
  div.innerHTML = html;
  const items: string[] = [];
  div.querySelectorAll('li').forEach((li) => {
    const t = (li.textContent ?? '').replace(/\u00a0/g, ' ').trim();
    if (t) items.push(t);
  });
  return items;
}

/** 内容签名：判断「真源是否已追平本地草稿」，也用于避免无意义重渲染 */
function modulesSig(arr: ModuleDef[]): string {
  return JSON.stringify(
    arr.map((m) => [m.id, m.title, m.status ?? '', m.bind ?? '', m.text ?? '', m.rich ?? '', m.apiRich ?? '', m.list ?? []]),
  );
}

// ============ 单卡片（单卡双页签：页面说明 + 可选接口说明） ============
// 一张卡对应页面上一个打标区块：页面说明为主体（必有），接口说明可选；
// 两类说明都有才显示页签切换，只有一类直接展示，不给开发增加一次点击。
// 卡面结构对齐微软账户页卡片：白色卡面 + 头部（编号/标题/状态）+ 内容区 + 底部操作行（蓝色链接）。
// 关联的页面模块、删除操作都不在卡片上，统一收进编辑弹窗。
function DescCard({
  m, index, onEdit,
}: {
  m: ModuleDef; index: number;
  onEdit: (m: ModuleDef, index: number) => void;
}) {
  const target = m.bind ?? m.id;
  const st = m.status ? STATUS_META[m.status] : null;
  const hasOverview = !!m.rich || !!(m.text && m.text.trim()) || !!(m.list && m.list.length);
  const hasApi = !!(m.apiRich && m.apiRich.trim());
  // 页签只是「两类内容都存在时的切换壳」；只有一类内容时直接展示
  const showTabs = hasOverview && hasApi;
  const [tab, setTab] = useState<'overview' | 'api'>(() => (hasOverview ? 'overview' : 'api'));
  const isEmpty = !hasOverview && !hasApi;
  return (
    <div data-proto-id={target} className="dn-desc">
      <div className="dn-desc-head">
        <span className="dn-desc-num">{index + 1}</span>
        <span className="dn-desc-title">{m.title}</span>
        {st && (
          <span
            className="dn-status"
            style={{ color: st.color, background: st.bg, borderColor: st.border }}
            title={`当前状态：${st.label}`}
          >
            <i className="dn-status-dot" style={{ background: st.color }} />
            {st.label}
          </span>
        )}
      </div>
      {isEmpty && (
        <button
          className="dn-desc-empty"
          title="这张卡片先放空，点击现在补写；也可以直接在对话里让 AI 按区域补上说明"
          onClick={(e) => { e.stopPropagation(); onEdit(m, index); }}
        >＋ 待补充说明 — 点击编辑</button>
      )}
      {!isEmpty && (
        <>
          {showTabs && (
            <div className="dn-tabs">
              <button type="button" className={`dn-tab${tab === 'overview' ? ' on' : ''}`}
                onClick={(e) => { e.stopPropagation(); setTab('overview'); }}>页面说明</button>
              <button type="button" className={`dn-tab${tab === 'api' ? ' on' : ''}`}
                onClick={(e) => { e.stopPropagation(); setTab('api'); }}>接口说明<span className="tb-badge">API</span></button>
            </div>
          )}
          {hasOverview && (!showTabs || tab === 'overview') && (
            m.rich ? (
              <div className="dn-desc-text dn-rich" dangerouslySetInnerHTML={{ __html: m.rich }} />
            ) : (
              <>
                {m.text && <div className="dn-desc-text">{m.text}</div>}
                {m.list && m.list.length > 0 && (
                  <ul className="dn-desc-list">
                    {m.list.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                )}
              </>
            )
          )}
          {hasApi && (!showTabs || tab === 'api') && (
            <div className="dn-desc-text dn-rich" dangerouslySetInnerHTML={{ __html: m.apiRich! }} />
          )}
        </>
      )}
      <div className="dn-desc-foot">
        <button
          className="dn-desc-edit"
          title="编辑本模块说明（标题 / 状态 / 关联页面模块 / 页面说明 / 接口说明 / 删除）"
          onClick={(e) => { e.stopPropagation(); onEdit(m, index); }}
        >✎ 编辑说明</button>
      </div>
    </div>
  );
}

// ============ 模块编辑大弹窗（页面说明 + 接口说明 两个编辑区） ============
// 固定高度三段式：标题栏 / 主体滚动区 / 底部操作栏；
// 说明区用弹窗内小节页签切换「页面说明 / 接口说明 API」，与卡片页签交互一致；
// 两个文本域等高（280px）固定、超出内容各自滚动；写作引导句放 data-placeholder，为空灰显。
function DescModal({
  initial, onSave, onClose, bindOptions, onDelete,
}: {
  initial: ModuleDef;
  onSave: (m: ModuleDef) => void;
  onClose: () => void;
  bindOptions?: Array<{ id: string; label: string; bound?: number; live?: boolean }>;
  /** 删除本卡片（仅编辑既有卡片时传入；新建卡片不显示删除）。点删除先在本弹窗内二次确认 */
  onDelete?: () => void;
}) {
  const [title, setTitle] = useState(initial.title);
  // 关联选择器：搜索关键词 + 手动填写模式（下拉里选「＋ 手动填写区域 ID」时切换）
  const [bindKw, setBindKw] = useState('');
  const [manualBind, setManualBind] = useState(false);
  // 删除二次确认：叠加在本弹窗内，取消可回到继续编辑，确认才真正删除
  const [confirmDel, setConfirmDel] = useState(false);
  const confirmDelRef = useRef(false);
  confirmDelRef.current = confirmDel;
  // 状态默认「设计中」（未标记的老模块打开时也按设计中显示，保存即打标；再点一次可取消）
  const [status, setStatus] = useState<NoteStatus | ''>(initial.status ?? 'designing');
  const [bind, setBind] = useState(
    initial.bind ?? (initial.id.startsWith('custom-') ? '' : initial.id),
  );
  const editorRef = useRef<HTMLDivElement>(null);
  const apiEditorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<{ ref: React.RefObject<HTMLDivElement>; range: Range } | null>(null);
  const [color, setColor] = useState('#0067b8');
  // 弹窗内小节页签：页面说明 / 接口说明（与卡片页签同款交互）
  const [mtab, setMtab] = useState<'overview' | 'api'>('overview');

  // 初始内容：页面说明（老模块 text/list 转纯文本 + 项目符号，富文本直接回填）；接口说明独立回填
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initial.rich ? initial.rich : plainToEditorHtml(initial);
    }
    if (apiEditorRef.current) apiEditorRef.current.innerHTML = initial.apiRich ?? '';
  }, [initial]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // 删除确认层开着时，Esc 只关确认层（由 ConfirmDelete 处理），不要连编辑弹窗一起关掉
      if (e.key === 'Escape' && !confirmDelRef.current) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // 选区快照（按编辑器区分）：点工具栏按钮 / 取色器会抢走焦点，先用 savedRange 记住光标位置
  const saveSelection = (ref: React.RefObject<HTMLDivElement>) => {
    const sel = window.getSelection();
    const editor = ref.current;
    if (sel && sel.rangeCount > 0 && editor && editor.contains(sel.anchorNode)) {
      savedRangeRef.current = { ref, range: sel.getRangeAt(0).cloneRange() };
    }
  };

  /** 执行 execCommand 前恢复对应编辑器的光标，避免「选中文字 → 点加粗」后格式落到别处 */
  const exec = (ref: React.RefObject<HTMLDivElement>, cmd: string, value?: string) => {
    const editor = ref.current;
    if (!editor) return;
    editor.focus();
    const sel = window.getSelection();
    if (savedRangeRef.current && savedRangeRef.current.ref === ref && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current.range);
    }
    document.execCommand(cmd, false, value);
    saveSelection(ref);
  };

  const handleSave = () => {
    const raw = editorRef.current?.innerHTML ?? '';
    const html = sanitizeRichHtml(raw.trim());
    const apiHtml = sanitizeRichHtml((apiEditorRef.current?.innerHTML ?? '').trim());
    const base = {
      id: initial.id,
      title: title.trim() || initial.title,
      status: (status || undefined) as NoteStatus | undefined,
      bind: bind || undefined,
      // 接口说明原样存入 apiRich（受限 HTML），为空即本区块无对接
      apiRich: apiHtml || undefined,
    };
    if (RICH_TAG_RE.test(html)) {
      // 带格式：整体存 rich，不再保留 text/list（卡片也只渲染 rich）
      onSave({ ...base, rich: html, text: undefined, list: [] });
    } else {
      // 纯文本 + 项目符号：还原为 text/list 两字段，老数据回写源码零 diff
      onSave({ ...base, text: plainTextOfHtml(html), list: listItemsOfHtml(html) });
    }
  };

  const renderToolbar = (ref: React.RefObject<HTMLDivElement>, full: boolean) => (
    <div className="dn-editor-toolbar" onMouseDown={(e) => { e.preventDefault(); saveSelection(ref); }}>
      <button type="button" className="dn-editor-btn" title="加粗" onClick={() => exec(ref, 'bold')}><b>B</b></button>
      {full && (
        <>
          <button type="button" className="dn-editor-btn" title="斜体" onClick={() => exec(ref, 'italic')}><i>I</i></button>
          <button type="button" className="dn-editor-btn" title="下划线" onClick={() => exec(ref, 'underline')}><u>U</u></button>
          <span className="dn-toolbar-sep" />
          <label
            className="dn-editor-btn dn-color-btn"
            title={`字体颜色：${color}`}
            onMouseDown={() => saveSelection(ref)}
          >
            <span className="dn-color-a" style={{ color }}>A</span>
            <input
              type="color"
              value={color}
              onChange={(e) => { setColor(e.target.value); exec(ref, 'foreColor', e.target.value); }}
            />
          </label>
        </>
      )}
      <button type="button" className="dn-editor-btn" title="项目符号" onClick={() => exec(ref, 'insertUnorderedList')}>• 列表</button>
      <button type="button" className="dn-editor-btn" title="清除所选格式" onClick={() => exec(ref, 'removeFormat')}>清除格式</button>
    </div>
  );

  return (
    <>
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
            <div className="dn-modal-label">状态标记（用于标注这个功能做到哪一步，再点一次可取消）</div>
            <div className="dn-status-picker">
              {STATUS_ORDER.map((k) => {
                const meta = STATUS_META[k];
                const on = status === k;
                return (
                  <button
                    type="button"
                    key={k}
                    className={`dn-status-opt${on ? ' on' : ''}`}
                    style={on ? { color: meta.color, background: meta.bg, borderColor: meta.color } : undefined}
                    onClick={() => setStatus(on ? '' : k)}
                  >
                    <i className="dn-status-dot" style={{ background: on ? meta.color : '#c2ccda' }} />
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="dn-modal-field">
            <div className="dn-modal-label">关联页面模块（卡片上不再展示，统一在此查看与修改）</div>
            {(() => {
              const opts = bindOptions || [];
              const kw = bindKw.trim().toLowerCase();
              const matched = opts.filter((o) => !kw || o.id.toLowerCase().includes(kw) || o.label.toLowerCase().includes(kw));
              // 分组：此刻真正渲染在页面上的（可立刻连线）/ 本页此前识别过但当前未渲染（弹窗、页签里的）
              const liveOpts = matched.filter((o) => o.live);
              const offOpts = matched.filter((o) => !o.live);
              const inList = opts.some((o) => o.id === bind);
              const renderOpt = (o: { id: string; label: string; bound?: number }) => (
                <option key={o.id} value={o.id}>
                  {o.label}（{o.id}）{o.bound ? ` · 已被第 ${o.bound} 条使用` : ''}
                </option>
              );
              return (
                <div className="dn-bind-picker">
                  <input
                    className="dn-bind-search"
                    value={bindKw}
                    onChange={(e) => setBindKw(e.target.value)}
                    placeholder="搜索区域名称或 ID（如 弹窗、ind-add-form）"
                  />
                  <select
                    value={manualBind ? '__manual__' : bind}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '__manual__') { setManualBind(true); setBind(''); return; }
                      setManualBind(false);
                      setBind(v);
                    }}
                  >
                    <option value="">（不关联 · 仅作补充说明，不画连线）</option>
                    {!inList && bind && <option value={bind}>{bind}（当前关联 · 不在本页识别清单里）</option>}
                    {liveOpts.length > 0 && <optgroup label="当前视图可见（选中即连线）">{liveOpts.map(renderOpt)}</optgroup>}
                    {offOpts.length > 0 && <optgroup label="本页识别过 · 需打开对应弹窗 / 页签才画出连线">{offOpts.map(renderOpt)}</optgroup>}
                    <option value="__manual__">＋ 手动填写区域 ID…</option>
                  </select>
                  {manualBind && (
                    <input
                      className="dn-bind-search"
                      value={bind}
                      onChange={(e) => setBind(e.target.value.trim())}
                      placeholder="填写 data-proto-id，如 ind-add-form"
                      autoFocus
                    />
                  )}
                </div>
              );
            })()}
            {(() => {
              const hit = (bindOptions || []).find((o) => o.id === bind);
              if (!bind) {
                return (
                  <div className="dn-bind-state none">
                    <i className="dn-status-dot" />
                    当前未关联页面模块，保存后卡片不出现连线（说明内容照常保存）。
                  </div>
                );
              }
              if (bind.startsWith('page-')) {
                return (
                  <div className="dn-bind-state ok">
                    <i className="dn-status-dot" />
                    当前关联本页整页（{bind}），保存后连线指向页面顶部区域。
                  </div>
                );
              }
              if (hit) {
                return (
                  <div className="dn-bind-state ok">
                    <i className="dn-status-dot" />
                    {hit.live
                      ? `当前已关联「${hit.label}」，保存后自动生成连线。`
                      : `当前已关联「${hit.label}」（本页识别过、此刻未显示），打开它所在的弹窗 / 页签后自动连线。`}
                  </div>
                );
              }
              return (
                <div className="dn-bind-state warn">
                  <i className="dn-status-dot" />
                  当前关联目标「{bind}」此刻不在页面上——它可能在弹窗 / 页签 / 步骤条里，打开对应视图后自动连线，说明内容不受影响。
                </div>
              );
            })()}
            <div style={{ fontSize: 11, color: '#a19f9d', lineHeight: 1.65 }}>
              提示：下拉分两组——「当前视图可见」是此刻已渲染的区域，选中即连线；「本页识别过」是此前打开弹窗 / 页签时识别到的区域（按页记在本地），选中后打开对应视图就会连线。找不到目标时可搜索，或用「＋ 手动填写区域 ID」直接填 data-proto-id。
            </div>
          </div>
          <div className="dn-modal-field">
            <div className="dn-tabs modal-tabs">
              <button type="button" className={`dn-tab${mtab === 'overview' ? ' on' : ''}`} onClick={() => setMtab('overview')}>页面说明</button>
              <button type="button" className={`dn-tab${mtab === 'api' ? ' on' : ''}`} onClick={() => setMtab('api')}>接口说明<span className="tb-badge">API</span></button>
            </div>
            <div style={{ display: mtab === 'overview' ? 'block' : 'none' }}>
              <div className="dn-editor-wrap">
                {renderToolbar(editorRef, true)}
                <div
                  ref={editorRef}
                  className="dn-editor"
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="页面说明：写清页面结构、字段口径、操作交互、校验规则、状态边界；要点用「• 列表」转为项目符号；无内容可留空"
                  onMouseUp={() => saveSelection(editorRef)}
                  onKeyUp={() => saveSelection(editorRef)}
                />
              </div>
            </div>
            <div style={{ display: mtab === 'api' ? 'block' : 'none' }}>
              <div className="dn-editor-wrap">
                {renderToolbar(apiEditorRef, false)}
                <div
                  ref={apiEditorRef}
                  className="dn-editor"
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="接口说明：写清请求方式 / 路径 / 鉴权、请求参数与响应字段、绑定表与批次规则、错误码、报文样例；本区块不涉及接口对接时留空"
                  onMouseUp={() => saveSelection(apiEditorRef)}
                  onKeyUp={() => saveSelection(apiEditorRef)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="dn-modal-foot">
          {onDelete ? (
            <button
              className="dn-modal-btn danger-ghost"
              title="删除这张卡片（会先二次确认）"
              onClick={() => setConfirmDel(true)}
            >删除这张卡片</button>
          ) : <span />}
          <span className="dn-foot-right">
            <button className="dn-modal-btn ghost" onClick={onClose}>取消</button>
            <button className="dn-modal-btn primary" onClick={handleSave}>保存修改</button>
          </span>
        </div>
      </div>
    </div>
      {confirmDel && onDelete && (
        <ConfirmDelete
          title={title.trim() || initial.title}
          onCancel={() => setConfirmDel(false)}
          onConfirm={() => { setConfirmDel(false); onDelete(); }}
        />
      )}
    </>
  );
}

// ============ 删除二次确认 ============
// 删除会真的从真源里去掉这张卡片（落盘模式直接写源码），所以只给一次确认机会不够用——
// 点删除先弹本框，确认后才执行；Esc / 点遮罩 = 取消，回车 = 确认。
function ConfirmDelete({
  title, onCancel, onConfirm,
}: {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // 本层可能叠在编辑弹窗之上：用 capture + stopImmediatePropagation 独占键盘，避免同一次按键
      // 既关确认层又关编辑弹窗（或焦点在「取消」上按回车时同时触发取消与确认删除）
      if (e.key === 'Escape') { e.stopImmediatePropagation(); e.preventDefault(); onCancel(); }
      const onButton = e.target instanceof HTMLElement && e.target.tagName === 'BUTTON';
      if (e.key === 'Enter' && !onButton) { e.stopImmediatePropagation(); e.preventDefault(); onConfirm(); }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onCancel, onConfirm]);

  return (
    <div className="dn-confirm-mask" onClick={onCancel}>
      <div
        className="dn-confirm"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dn-confirm-head">
          <span className="dn-confirm-icon">!</span>
          <span className="dn-confirm-title">删除这张设计说明卡片？</span>
        </div>
        <div className="dn-confirm-body">
          即将删除「<b>{title}</b>」。删除后无法撤销，该页面区域会重新显示「+ 说明」入口，需要时可再建卡片。
        </div>
        <div className="dn-confirm-foot">
          <button className="dn-modal-btn ghost" onClick={onCancel} autoFocus>取消</button>
          <button className="dn-modal-btn danger" onClick={onConfirm}>确认删除</button>
        </div>
      </div>
    </div>
  );
}

const DescStyle = `
  .dn-right{width:360px;min-width:360px;background:#faf9f8;border-left:1px solid #e1e1e1;padding:16px;overflow-y:auto;max-height:100vh;position:sticky;top:0;transition:width .2s ease,padding .2s ease}
  /* 收起态：只留一条竖向标签，把宽度让给页面 */
  .dn-right.collapsed{width:54px;min-width:54px;padding:10px 0;overflow:hidden;display:flex;flex-direction:column;align-items:center;gap:10px}
  .dn-rail{display:flex;flex-direction:column;align-items:center;gap:8px;width:38px;padding:12px 0;background:#fff;border:1px solid #e1e1e1;border-radius:8px;cursor:pointer;font-family:inherit;transition:border-color .15s,box-shadow .15s}
  .dn-rail:hover{border-color:${C.primary};box-shadow:0 2px 8px rgba(0,0,0,.12)}
  .dn-rail-arrow{font-size:13px;line-height:1;color:${C.primary};font-weight:700}
  .dn-rail-text{writing-mode:vertical-rl;letter-spacing:.16em;font-size:12.5px;font-weight:700;color:${C.text};user-select:none}
  .dn-rail-count{font-size:10px;font-weight:700;color:#fff;background:${C.primary};border-radius:9px;padding:1px 6px;line-height:1.5}
  .dn-collapse-btn{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-family:inherit;padding:4px 9px;color:${C.text3};background:#fff;border:1px solid ${C.border2};border-radius:4px;cursor:pointer;white-space:nowrap}
  .dn-collapse-btn:hover{color:${C.primary};border-color:${C.primary};background:${C.active}}
  .dn-rd-titlebar{display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid #e1e1e1;margin-bottom:12px}
  .dn-rd-badge{background:${C.primary};color:#fff;font-size:10px;font-weight:700;padding:3px 8px;letter-spacing:.06em;border-radius:2px}
  .dn-rd-title{font-size:15px;font-weight:600;color:${C.text}}
  .dn-rd-hint{font-size:11px;color:${C.text3};margin:0 0 14px;line-height:1.6}
  /* 面板头部状态汇总：只列出有模块占用的状态，无标记时整行不出现 */
  .dn-rd-legend{display:flex;flex-wrap:wrap;align-items:center;gap:9px;margin:-6px 0 12px;font-size:10.5px;color:${C.text3}}
  .dn-rd-legend .lg{display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
  .dn-rd-legend .lg b{font-weight:700}
  /* 编辑弹窗内的状态选择器 */
  .dn-status-picker{display:flex;flex-wrap:wrap;gap:6px}
  .dn-status-opt{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-family:inherit;color:${C.text2};background:#fff;border:1px solid ${C.border2};border-radius:999px;padding:5px 12px;cursor:pointer;transition:all .15s}
  .dn-status-opt:hover{border-color:${C.primary};color:${C.primary}}
  .dn-status-opt.on{font-weight:600;box-shadow:0 1px 4px rgba(0,0,0,.08)}
  /* 卡片：微软 Fluent 风格——白卡 + 细描边 + 极轻阴影，悬浮加深，不再用彩色左边条 */
  .dn-desc{position:relative;background:#fff;border:1px solid #e1e1e1;border-radius:8px;margin-bottom:12px;padding:12px 16px 0;box-shadow:0 1.6px 3.6px rgba(0,0,0,.07);transition:box-shadow .15s,border-color .15s}
  .dn-desc:hover{border-color:#c8c6c4;box-shadow:0 3.2px 7.2px rgba(0,0,0,.11)}
  .dn-desc-head{display:flex;align-items:center;gap:9px;margin-bottom:2px}
  .dn-desc-num{width:22px;height:22px;background:${C.primary};color:#fff;font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:4px}
  .dn-desc-title{font-size:13.5px;font-weight:600;color:${C.text};flex:1;line-height:1.4;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  /* 状态胶囊：底色/描边由状态字典注入，未标记时不渲染 */
  .dn-status{display:inline-flex;align-items:center;gap:4px;flex-shrink:0;font-size:10.5px;font-weight:600;line-height:1;padding:3px 8px;border:1px solid transparent;border-radius:999px;white-space:nowrap}
  .dn-status-dot{width:5px;height:5px;border-radius:50%;display:block;flex-shrink:0}
  /* 卡片底部操作行：对齐微软账户页卡片页脚——细分隔线 + 蓝色链接式动作 */
  .dn-desc-foot{display:flex;align-items:center;margin:10px -16px 0;padding:7px 16px 8px;border-top:1px solid #f0efee;background:#fbfbfa;border-radius:0 0 8px 8px}
  .dn-desc-edit{font-size:12px;font-weight:400;color:${C.primary};background:transparent;border:none;cursor:pointer;padding:0;font-family:inherit;transition:color .15s}
  .dn-desc-edit:hover{color:${C.primaryHover};text-decoration:underline}
  /* 卡片双页签（页面说明 / 接口说明 API）：Microsoft Pivot 风格文字页签 */
  .dn-tabs{display:flex;gap:18px;margin:9px 0 2px;border-bottom:1px solid #f0efee}
  .dn-tabs.modal-tabs{margin:2px 0 8px}
  .dn-tab{font-size:12px;font-weight:600;padding:5px 1px 6px;border:none;border-bottom:2px solid transparent;background:transparent;color:${C.text2};cursor:pointer;font-family:inherit;line-height:1.2}
  .dn-tab:hover{color:${C.primary}}
  .dn-tab.on{color:${C.primary};border-bottom-color:${C.primary}}
  .dn-tab .tb-badge{font-size:9px;font-weight:700;margin-left:4px;color:${C.primary};opacity:.75}
  /* 编辑弹窗里的「当前关联状态」提示条：ok=已关联 / warn=当前视图未渲染 / none=未关联 */
  .dn-bind-state{display:flex;align-items:flex-start;gap:6px;font-size:11px;line-height:1.6;padding:6px 9px;border-radius:4px;border:1px solid transparent}
  .dn-bind-state .dn-status-dot{margin-top:5px}
  .dn-bind-state.ok{color:#107c10;background:#f1faf1;border-color:#ceead6}
  .dn-bind-state.ok .dn-status-dot{background:#107c10}
  .dn-bind-state.warn{color:#b45309;background:#fff8f1;border-color:#f9debe}
  .dn-bind-state.warn .dn-status-dot{background:#d97706}
  .dn-bind-state.none{color:${C.text3};background:#faf9f8;border-color:#e1e1e1}
  .dn-bind-state.none .dn-status-dot{background:#c8c6c4}
  .dn-desc-text{font-size:12.5px;color:#3b3a39;line-height:1.7;margin:7px 0 0;white-space:pre-line}
  .dn-desc-list{list-style:none;padding:0;margin:7px 0 0}
  .dn-desc-list li{position:relative;padding:2px 0 2px 16px;font-size:12.5px;line-height:1.65;color:#3b3a39}
  .dn-desc-list li::before{content:'';position:absolute;left:2px;top:10px;width:6px;height:6px;border-radius:50%;background:${C.primary}}
  .dn-add-module{width:100%;padding:8px;font-size:12px;color:${C.primary};background:#fff;border:1px dashed ${C.primary};border-radius:4px;cursor:pointer;margin-top:4px;font-family:inherit;transition:background .15s}
  .dn-add-module:hover{background:${C.active}}
  .dn-modal-field select{width:100%;box-sizing:border-box;font-size:13px;padding:7px 12px;border:1px solid ${C.border2};border-radius:4px;background:#fff;font-family:inherit;color:${C.text}}
  .dn-modal-field select:focus{outline:none;border-color:${C.primary};box-shadow:0 0 0 1px ${C.primary}}
  /* 关联选择器：搜索框 + 分组下拉 + 手动填 ID（弹窗内的区域先打开一次即被记住） */
  .dn-bind-picker{display:flex;flex-direction:column;gap:6px}
  .dn-bind-search{width:100%;box-sizing:border-box;font-size:12.5px;padding:6px 10px;border:1px solid ${C.border2};border-radius:4px;background:#fff;font-family:inherit;color:${C.text}}
  .dn-bind-search:focus{outline:none;border-color:${C.primary};box-shadow:0 0 0 1px ${C.primary}}
  .dn-bind-picker select{width:100%;box-sizing:border-box;font-size:13px;padding:7px 12px;border:1px solid ${C.border2};border-radius:4px;background:#fff;font-family:inherit;color:${C.text}}
  .dn-bind-picker select:focus{outline:none;border-color:${C.primary};box-shadow:0 0 0 1px ${C.primary}}
  /* 富文本编辑器：工具栏 + contentEditable 编辑区；两个说明区等高 280px 固定、超出各自滚动 */
  .dn-editor-wrap{border:1px solid ${C.border2};border-radius:4px;background:#fff}
  .dn-editor-wrap:focus-within{border-color:${C.primary};box-shadow:0 0 0 1px ${C.primary}}
  .dn-editor-toolbar{display:flex;align-items:center;gap:5px;flex-wrap:nowrap;padding:6px 8px;border-bottom:1px solid ${C.border};background:#faf9f8;border-radius:4px 4px 0 0}
  .dn-editor-btn{height:26px;min-width:28px;padding:0 9px;font-size:12px;color:${C.text2};background:#fff;border:1px solid ${C.border2};border-radius:4px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-family:inherit;transition:all .15s;user-select:none}
  .dn-editor-btn:hover{color:${C.primary};border-color:${C.primary};background:${C.active}}
  .dn-toolbar-sep{width:1px;height:16px;background:${C.border2};margin:0 2px;flex-shrink:0}
  /* 字体颜色按钮：Word 风格「A + 色条」，内嵌透明 color input 触发系统取色器；色条用 currentColor 跟随所选颜色 */
  .dn-color-btn{position:relative;overflow:hidden}
  .dn-color-btn .dn-color-a{font-size:13px;font-weight:700;line-height:1;padding-bottom:2px;border-bottom:3px solid currentColor}
  .dn-color-btn input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;border:none;padding:0}
  .dn-editor{height:280px;min-height:280px;max-height:280px;overflow-y:auto;font-size:13px;line-height:1.7;padding:10px 12px;border-radius:0 0 4px 4px;outline:none;white-space:pre-wrap;word-break:break-word;color:${C.text}}
  .dn-editor:empty::before{content:attr(data-placeholder);color:#a19f9d;pointer-events:none}
  .dn-editor:has(>br:only-child)::before{content:attr(data-placeholder);color:#a19f9d;pointer-events:none}
  .dn-editor ul{list-style:none;padding:0;margin:4px 0}
  .dn-editor li{position:relative;padding:2px 0 2px 18px}
  .dn-editor li::before{content:'';position:absolute;left:4px;top:11px;width:6px;height:6px;border-radius:50%;background:${C.primary}}
  .dn-editor b,.dn-editor strong{font-weight:700}
  /* 卡片里渲染富文本正文（rich / apiRich）：项目符号 / 加粗与列表样式对齐 */
  .dn-desc-text.dn-rich ul{list-style:none;padding:0;margin:6px 0 0}
  .dn-desc-text.dn-rich li{position:relative;padding:2px 0 2px 16px}
  .dn-desc-text.dn-rich li::before{content:'';position:absolute;left:2px;top:10px;width:6px;height:6px;border-radius:50%;background:${C.primary}}
  .dn-desc-text.dn-rich b,.dn-desc-text.dn-rich strong{font-weight:700;color:${C.text}}
  .dn-desc-text.dn-rich>div{margin-bottom:6px}
  .dn-desc-text.dn-rich>b{display:block;margin:8px 0 2px;font-size:12.5px}
  .dn-desc-text.dn-rich ul{margin:2px 0 4px}
  /* 编辑弹窗：固定高度三段式（标题栏 / 主体滚动区 / 底部操作栏），微软 Fluent 视觉 */
  .dn-modal-mask{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:${Z_MODAL};display:flex;align-items:center;justify-content:center;padding:24px}
  .dn-modal{background:#fff;border-radius:8px;width:min(820px,94vw);height:min(760px,90vh);display:flex;flex-direction:column;box-shadow:0 32px 64px rgba(0,0,0,.28);overflow:hidden}
  .dn-modal-head{display:flex;align-items:center;justify-content:space-between;padding:15px 24px;border-bottom:1px solid #e1e1e1;flex-shrink:0}
  .dn-modal-title{font-size:16px;font-weight:600;color:${C.text}}
  .dn-modal-close{font-size:14px;color:${C.text3};background:transparent;border:none;cursor:pointer;padding:2px 6px;border-radius:4px}
  .dn-modal-close:hover{background:#f3f2f1;color:${C.text}}
  .dn-modal-body{padding:14px 24px 18px;overflow-y:auto;display:flex;flex-direction:column;gap:13px;flex:1;min-height:0}
  .dn-modal-field{display:flex;flex-direction:column;gap:6px}
  .dn-modal-label{font-size:12px;font-weight:600;color:${C.text2}}
  .dn-modal-field input,.dn-modal-field textarea{width:100%;box-sizing:border-box;font-size:13px;padding:7px 12px;border:1px solid ${C.border2};border-radius:4px;font-family:inherit;line-height:1.6;resize:vertical;background:#fff;color:${C.text}}
  .dn-modal-field input:focus,.dn-modal-field textarea:focus{outline:none;border-color:${C.primary};box-shadow:0 0 0 1px ${C.primary}}
  .dn-modal-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 24px;border-top:1px solid #e1e1e1;background:#faf9f8;flex-shrink:0}
  .dn-foot-right{display:flex;align-items:center;gap:10px;margin-left:auto}
  .dn-modal-btn{font-size:13px;padding:7px 20px;border-radius:4px;cursor:pointer;font-weight:400;font-family:inherit}
  .dn-modal-btn.primary{background:${C.primary};color:#fff;border:1px solid ${C.primary}}
  .dn-modal-btn.primary:hover{background:${C.primaryHover};border-color:${C.primaryHover}}
  .dn-modal-btn.ghost{background:#fff;color:${C.text};border:1px solid #8a8886}
  .dn-modal-btn.ghost:hover{background:#f3f2f1}
  .dn-modal-btn.danger{background:${C.danger};color:#fff;border:1px solid ${C.danger}}
  .dn-modal-btn.danger:hover{background:#b13537;border-color:#b13537}
  .dn-modal-btn.danger-ghost{background:#fff;color:${C.danger};border:1px solid #e3b3b4}
  .dn-modal-btn.danger-ghost:hover{background:#fdf3f4;border-color:${C.danger}}
  /* 删除二次确认：小尺寸居中弹层，遮罩比编辑弹窗更暗一档，强调不可撤销 */
  .dn-confirm-mask{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:${Z_MODAL + 10};display:flex;align-items:center;justify-content:center;padding:24px}
  .dn-confirm{background:#fff;border-radius:8px;width:min(400px,92vw);box-shadow:0 24px 48px rgba(0,0,0,.3);overflow:hidden}
  .dn-confirm-head{display:flex;align-items:center;gap:10px;padding:18px 20px 8px}
  .dn-confirm-icon{width:24px;height:24px;flex-shrink:0;border-radius:50%;background:#fdf3f4;color:${C.danger};font-size:15px;font-weight:800;display:flex;align-items:center;justify-content:center;border:1px solid #e3b3b4}
  .dn-confirm-title{font-size:14.5px;font-weight:600;color:${C.text}}
  .dn-confirm-body{padding:0 20px 18px 54px;font-size:12.5px;line-height:1.75;color:#3b3a39}
  .dn-confirm-body b{color:${C.text};font-weight:700}
  .dn-confirm-foot{display:flex;justify-content:flex-end;gap:10px;padding:12px 20px;border-top:1px solid #e1e1e1;background:#faf9f8}
  .dn-desc.active-highlight{background:${C.active};border-color:${C.primary};box-shadow:0 0 0 1px ${C.primary}}
  .dn-desc.active-highlight .dn-desc-num{background:${C.primary};color:#fff}
  .dn-desc.active-highlight .dn-desc-title{color:${C.text}}
  .dn-desc.active-highlight .dn-desc-text,
  .dn-desc.active-highlight li{color:#25364d}
  /* 左侧页面模块高亮：[data-proto-id] 由宿主打标，不依赖宿主容器类名 */
  [data-proto-id].active-highlight{box-shadow:0 0 0 3px ${C.primary};background:${C.active}}
  .dn-connections{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:${Z_CONN}}
  .dn-quick-add{position:fixed;z-index:${Z_CONN + 1};font-size:11px;line-height:1;padding:5px 11px;color:#fff;background:${C.primary};border:none;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer;transform:translate(30%,-30%);pointer-events:auto;white-space:nowrap;font-family:inherit}
  .dn-quick-add:hover{background:${C.primaryHover}}
  /* 已绑定区域悬浮的「✓ 已说明」徽章：绿色系，点击跳到对应卡片 */
  .dn-quick-add.bound{background:#107c10}
  .dn-quick-add.bound:hover{background:#0e6b0e}
  /* 空卡片占位：先放空待补，点击直接进编辑 */
  .dn-desc-empty{display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:9px 12px;font-size:12px;color:${C.text3};background:#faf9f8;border:1px dashed ${C.border2};border-radius:4px;cursor:pointer;text-align:left;font-family:inherit;transition:all .15s}
  .dn-desc-empty:hover{color:${C.primary};border-color:${C.primary};background:${C.active}}
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
  modules, pageKey, pageSub, leftContentRef, onSave, title = '设计说明', hint, contentKey,
}: DesignNotesPanelProps) {
  // 编辑状态（按单模块弹窗编辑）
  const [editing, setEditing] = useState<{ m: ModuleDef; index: number; isNew?: boolean } | null>(null);
  const [localOverride, setLocalOverride] = useState<ModuleDef[] | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  // 左侧当前页面可关联的模块（data-proto-id -> 可读标签）。
  // 注意：必须列出全部元素（含已被其它卡片绑定的），否则页面元素全被占用时下拉为空，
  // 用户会以为「无法关联到页面组件」。占用情况用 bound 序号提示，不做静默过滤。
  const [allTargets, setAllTargets] = useState<Array<{ id: string; label: string; live?: boolean }>>([]);
  // 悬停打标元素时的快捷入口：未绑定 → 「+ 说明」新建卡片；已绑定 → 「✓ 已说明」跳转卡片
  const [quickAddTarget, setQuickAddTarget] = useState<{ id: string; rect: DOMRect; bound: boolean } | null>(null);
  // 面板收起 / 展开：收起后只留一条竖向标签，把宽度让给左侧页面；选择记在 localStorage，切页保持
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem('dn-collapsed') === '1'; } catch { return false; }
  });
  useEffect(() => {
    try { localStorage.setItem('dn-collapsed', collapsed ? '1' : '0'); } catch { /* 本地存储不可用时只在本次会话生效 */ }
  }, [collapsed]);
  // 收起时不再响应页面元素悬浮（面板不可见，出徽章没意义）
  useEffect(() => { if (collapsed) setQuickAddTarget(null); }, [collapsed]);

  // 旧版本地草稿 key（非破坏性恢复用）：dn-notes-<pageKey>-<子页>-<模块id签名>-<内容签名>
  // 末尾带内容签名：真源文案改版后旧草稿自动失效，避免拿旧文案覆盖新说明
  const contentSig = (() => {
    const s = modules.map((m) => `${m.id}|${m.title}|${m.status ?? ''}|${m.text ?? ''}|${m.rich ?? ''}|${m.apiRich ?? ''}|${(m.list ?? []).join('~')}`).join('||');
    let h = 5381;
    for (let i = 0; i < s.length; i += 1) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  })();
  const storageKey = `dn-notes-${pageKey}-${pageSub ?? ''}-${modules.map((m) => m.id).join(',')}-${contentSig}`;

  const displayModules = localOverride ?? modules;

  // 最近一次「落盘成功」的内容签名：用于区分「草稿待保存」与「已保存、等真源热更新追平」
  const savedSigRef = useRef<string | null>(null);

  // 挂载 / contentKey 变化时，从浏览器 localStorage 非破坏性地恢复此前保存的设计说明草稿
  useEffect(() => {
    savedSigRef.current = null; // 换页后签名失效，避免拿上一页的保存记录误判待保存
    const saved = localStorage.getItem(storageKey);
    if (!saved) {
      setLocalOverride(null); // 本页没有草稿：清掉上一页残留的草稿视图，避免串页
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) setLocalOverride(parsed as ModuleDef[]);
    } catch { /* 草稿损坏则忽略，退回真源 */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // 真源追平草稿后收敛：源码热更新 / 重新取数后内容一致，就不必再挂着本地草稿视图
  useEffect(() => {
    if (localOverride && modulesSig(localOverride) === modulesSig(modules)) setLocalOverride(null);
  }, [modules, localOverride]);

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
        savedSigRef.current = modulesSig(next);
        // 落盘成功后清掉本地草稿兜底，但**保留乐观视图**，等真源追平后由上面的 effect 收敛。
        // 若在这里直接回退到 modules（静态 buildModules 尚未热更新），刚删掉/改过的卡片会「消失又回来」。
        try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
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
      // 同一个页面模块允许被多张卡片关联（连线支持一对多），不做「已被占用就清空」的静默处理
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
    // 空卡片：标题默认用区域名（可改），内容放空待补——先占位，后续可在对话里让 AI 补写
    const label = allTargets.find((t) => t.id === bindId)?.label;
    const m: ModuleDef = { id: `custom-${Date.now()}`, title: label || '待补充', text: '', list: [], bind: bindId };
    setEditing({ m, index: -1, isNew: true });
    setQuickAddTarget(null);
  };

  // 已绑定区域悬浮「✓ 已说明」：滚动到对应卡片并高亮（多卡绑同一目标时取第一张）
  const revealCard = (bindId: string) => {
    setQuickAddTarget(null);
    setActiveId(bindId);
    const card = rightRef.current?.querySelector<HTMLElement>(`.dn-desc[data-proto-id="${CSS.escape(bindId)}"]`);
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const removeModule = (index: number) => {
    const next = displayModules.filter((_, i) => i !== index);
    persist(next);
  };

  // 删除入口统一收在编辑弹窗里（卡片上不再放删除按钮，避免误触）：弹窗内二次确认通过后回调到这里
  const handleDeleteModule = () => {
    if (!editing || editing.isNew) return;
    removeModule(editing.index);
    setEditing(null);
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
    // 弹窗 / 页签打开会往左侧容器里新添带标元素，DOM 变化时重绘连线（如新增指标弹窗打开后自动连上）
    const domMo = new MutationObserver(() => requestAnimationFrame(draw));
    domMo.observe(left, { childList: true, subtree: true });
    return () => {
      left.removeEventListener('scroll', onScroll);
      right.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      domMo.disconnect();
    };
  }, [displayModules, leftContentRef, contentKey, collapsed]);

  // 扫描左侧页面元素，收集可关联的模块清单（全量，已绑定的也保留，仅标注占用序号）
  // 页面内容会随步骤 / 数据加载变化，只扫一次会漏掉后出现的模块（卡片被误标「当前视图无此区域」），
  // 因此扫描后再挂 MutationObserver，DOM 变化时重扫；id 集合没变则不写 state，避免无谓渲染。
  // 弹窗 / 页签里的区块只在打开时才渲染进 DOM、关掉就扫不到——所以按页把「识别过的区域」记进 localStorage，
  // 下拉来源 = 当前可见 ∪ 本页历史识别：弹窗区域只需打开过一次，之后随时可关联（live 标记区分能否立刻连线）。
  const targetsKey = `dn-targets-${pageKey}`;
  useEffect(() => {
    const left = leftContentRef.current;
    if (!left) { setAllTargets([]); return; }
    let lastKey = '';
    const readCache = (): Array<{ id: string; label: string }> => {
      try {
        const raw = localStorage.getItem(targetsKey);
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr.filter((t) => t && typeof t.id === 'string' && typeof t.label === 'string') : [];
      } catch { return []; }
    };
    const scan = () => {
      const seen = new Set<string>();
      const live: Array<{ id: string; label: string }> = [];
      left.querySelectorAll<HTMLElement>('[data-proto-id]').forEach((le) => {
        const id = le.getAttribute('data-proto-id')!;
        if (seen.has(id)) return;
        seen.add(id);
        live.push({ id, label: deriveLabel(le, id) });
      });
      // 历史 ∪ 实时：同 id 以实时标签为准，并打上 live 标记
      const map = new Map<string, { id: string; label: string; live: boolean }>();
      readCache().forEach((t) => map.set(t.id, { id: t.id, label: t.label, live: false }));
      live.forEach((t) => map.set(t.id, { id: t.id, label: t.label, live: true }));
      const all = [...map.values()];
      const key = all.map((t) => `${t.id}:${t.label}:${t.live ? 1 : 0}`).join('|');
      if (key === lastKey) return;
      lastKey = key;
      setAllTargets(all);
      // 回写只存 id/label（live 每次实时算），最多留 300 条，避免长期累积
      try {
        localStorage.setItem(targetsKey, JSON.stringify(all.map((t) => ({ id: t.id, label: t.label })).slice(-300)));
      } catch { /* 本地存储不可用：只在本次会话记忆 */ }
    };
    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(left, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [leftContentRef, contentKey, displayModules, pageKey, targetsKey]);

  // 左侧已打标区域悬停时显示快捷入口（事件委托挂容器上，弹窗/页签打开后新出现的打标元素同样生效）
  const hoverElRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const left = leftContentRef.current;
    if (!left || collapsed) return;
    const boundIds = new Set(displayModules.map((m) => m.bind ?? m.id));
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.('[data-proto-id]') as HTMLElement | null;
      if (!el || el === hoverElRef.current) return;
      hoverElRef.current = el;
      if (quickAddHideTimer.current) { clearTimeout(quickAddHideTimer.current); quickAddHideTimer.current = null; }
      const id = el.getAttribute('data-proto-id')!;
      setQuickAddTarget({ id, rect: el.getBoundingClientRect(), bound: boundIds.has(id) });
    };
    // 离开模块不直接隐藏，留缓冲期（移向「+ 说明」按钮途中不消失）；移向另一打标元素交给 over 更新
    const out = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      if (to && to.closest?.('[data-proto-id]')) return;
      hoverElRef.current = null;
      if (quickAddHideTimer.current) clearTimeout(quickAddHideTimer.current);
      quickAddHideTimer.current = window.setTimeout(() => setQuickAddTarget(null), 1000);
    };
    left.addEventListener('mouseover', over);
    left.addEventListener('mouseout', out);
    return () => {
      left.removeEventListener('mouseover', over);
      left.removeEventListener('mouseout', out);
    };
  }, [leftContentRef, contentKey, displayModules, collapsed]);

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

  // 有待落盘的改动 = 有本地草稿视图，且它的内容与「最近一次落盘成功」的内容不同
  const hasOverride = localOverride !== null && modulesSig(localOverride) !== savedSigRef.current;

  return (
    <>
      <style>{DescStyle}</style>
      <aside ref={rightRef} className={`dn-right${collapsed ? ' collapsed' : ''}`} onMouseOver={handleHover} onMouseLeave={() => setActiveId(null)}>
        {collapsed ? (
          <button className="dn-rail" onClick={() => setCollapsed(false)} title={`展开设计说明（本页 ${displayModules.length} 张卡片）`}>
            <span className="dn-rail-arrow">‹</span>
            <span className="dn-rail-text">设计说明</span>
            <span className="dn-rail-count">{displayModules.length}</span>
          </button>
        ) : (
        <>
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
            <button className="dn-collapse-btn" onClick={() => setCollapsed(true)} title="收起设计说明，把宽度让给页面">
              » 收起
            </button>
          </div>
        </div>
        {hint ? <p className="dn-rd-hint">{hint}</p> : null}
        {(() => {
          const counts = STATUS_ORDER
            .map((k) => ({ k, n: displayModules.filter((m) => m.status === k).length }))
            .filter((x) => x.n > 0);
          if (!counts.length) return null;
          return (
            <div className="dn-rd-legend">
              <span className="lg">共 <b>{displayModules.length}</b> 条</span>
              {counts.map(({ k, n }) => (
                <span className="lg" key={k}>
                  <i className="dn-status-dot" style={{ background: STATUS_META[k].color }} />
                  {STATUS_META[k].label} <b>{n}</b>
                </span>
              ))}
            </div>
          );
        })()}
        {displayModules.map((m, i) => (
          <DescCard
            key={`${m.id}-${i}`}
            m={m}
            index={i}
            onEdit={(mod, idx) => setEditing({ m: mod, index: idx })}
          />
        ))}
        <button className="dn-add-module" onClick={addModule}>+ 添加模块</button>
        </>
        )}
      </aside>
      <svg className="dn-connections" ref={svgRef}></svg>
      {quickAddTarget && (
        quickAddTarget.bound ? (
          <button
            className="dn-quick-add bound"
            style={{ left: quickAddTarget.rect.right - 8, top: quickAddTarget.rect.top + 4 }}
            onMouseEnter={() => { if (quickAddHideTimer.current) { clearTimeout(quickAddHideTimer.current); quickAddHideTimer.current = null; } }}
            onMouseLeave={() => setQuickAddTarget(null)}
            onClick={() => revealCard(quickAddTarget.id)}
          >✓ 已说明</button>
        ) : (
          <button
            className="dn-quick-add"
            style={{ left: quickAddTarget.rect.right - 8, top: quickAddTarget.rect.top + 4 }}
            onMouseEnter={() => { if (quickAddHideTimer.current) { clearTimeout(quickAddHideTimer.current); quickAddHideTimer.current = null; } }}
            onMouseLeave={() => setQuickAddTarget(null)}
            onClick={() => addModuleBoundTo(quickAddTarget.id)}
          >+ 说明</button>
        )
      )}
      {editing && (
        <DescModal
          initial={editing.m}
          onSave={handleSaveModule}
          onClose={() => setEditing(null)}
          onDelete={editing.isNew ? undefined : handleDeleteModule}
          bindOptions={allTargets.map((t) => ({
            ...t,
            bound: displayModules.findIndex((mod, i) => i !== editing.index && (mod.bind ?? mod.id) === t.id) + 1 || undefined,
          }))}
        />
      )}
    </>
  );
}

export default DesignNotesPanel;
