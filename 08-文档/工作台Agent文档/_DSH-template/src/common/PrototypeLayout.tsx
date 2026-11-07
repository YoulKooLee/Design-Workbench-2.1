/**
 * 原型通用布局组件（左侧设计稿 + 右侧设计说明）
 * ------------------------------------------------------------------
 * 标准两栏布局：左为 UI 设计稿（children），右为「设计说明」面板。
 * 右侧面板由 DesignNotesPanel 提供：Xbox 风格编号卡片 + SVG 连线 + 悬停高亮
 * + 新增 / 编辑 / 删除模块 + 数据落盘（可注入 onSave，模块零后端依赖）。
 *
 * 用法（推荐，结构化 modules + 精准连线）：
 * ```tsx
 * <PrototypeLayout
 *   title="页面标题" breadcrumb="路径"
 *   modules={[
 *     { id: 'kpi', title: '核心指标', text: '说明', list: ['要点'] },
 *     { id: 'chart', title: '趋势图', bind: 'trend-chart' },
 *   ]}
 *   onSave={async (next, meta) => { await mySave(next, meta); }}
 * >
 *   <div data-proto-id="kpi">…</div>
 *   <div data-proto-id="trend-chart">…</div>
 * </PrototypeLayout>
 * ```
 * 说明：
 *  - 左侧可独立说明的区域打 data-proto-id="<id>"（可选 data-proto-label="可读名"）。
 *  - 模块用 bind 指向左侧 data-proto-id 即可自动生成连线；不带 bind 则用自身 id 关联。
 *  - 不传 onSave 时进入本地草稿模式（localStorage），适合纯预览 / 暂存场景。
 *
 * 旧格式兼容：仍可传 description（纯 Markdown，按 `## ` 自动拆卡），但新原型请用 modules。
 */
import React, { useRef } from 'react';
import { DesignNotesPanel, type ModuleDef, type DesignNotesSaveAdapter } from './DesignNotesPanel';

export interface PrototypeModule {
  /** 稳定唯一 id（字符串）；不传则由序号生成。与左侧 data-proto-id 对应 */
  id?: string | number;
  /** 卡片标题 */
  title: string;
  /** 说明正文 */
  text?: string;
  /** 要点列表 */
  list?: string[];
  /** 关联的左侧页面模块 id（对应 left 的 data-proto-id）；为空则用自身 id 关联 */
  bind?: string;
}

interface PrototypeLayoutProps {
  title: string;
  breadcrumb?: string;
  /** 旧格式：纯 Markdown 字符串，按 `## ` 自动拆分为模块卡片（无 ## 降级单卡） */
  description?: string;
  /** 新格式：结构化模块（与左侧 data-proto-id 元素连线） */
  modules?: PrototypeModule[];
  /** 全宽布局（隐藏右侧说明），默认 false */
  fullWidth?: boolean;
  /** 落盘适配器：编辑后实时调用；不传则仅本地草稿（localStorage） */
  onSave?: DesignNotesSaveAdapter;
  /** 页面签名（落盘定位 + 本地草稿 key），默认按 title 生成 */
  pageKey?: string;
  /** 子页签名（有二级子页签时传） */
  pageSub?: string;
  children: React.ReactNode;
}

// 旧格式 description 解析：`## ` 拆分模块；`# ` 作为 brief；`- ` 为列表；其余为段落
function parseDescription(text: string): ModuleDef[] {
  const lines = text.split('\n');
  const mods: ModuleDef[] = [];
  let cur: ModuleDef | null = null;
  const clean = (s: string) => s.replace(/\*\*(.*?)\*\*/g, '$1').trim();
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('## ')) {
      cur = { id: String(mods.length + 1), title: t.slice(3).trim() };
      mods.push(cur);
    } else if (cur) {
      if (t.startsWith('- ')) {
        if (!cur.list) cur.list = [];
        cur.list.push(clean(t.slice(2)));
      } else if (t.startsWith('|')) { /* 表格行忽略 */ } else if (t.startsWith('### ')) {
        cur.text = (cur.text ? cur.text + '\n' : '') + '【' + clean(t.slice(4)) + '】';
      } else if (t) {
        cur.text = (cur.text ? cur.text + '\n' : '') + clean(t);
      }
    }
  }
  if (mods.length === 0) {
    const textParts = lines
      .filter((l) => { const x = l.trim(); return x && !x.startsWith('#') && !x.startsWith('- ') && !x.startsWith('|'); })
      .map(clean);
    const list = lines.filter((l) => l.trim().startsWith('- ')).map((l) => clean(l.slice(2)));
    mods.push({ id: '1', title: '说明', text: textParts.join('\n'), list });
  }
  return mods;
}

const slug = (s: string) => s.replace(/\s+/g, '-').replace(/[^\w一-龥-]/g, '') || 'page';

export function PrototypeLayout({
  title, breadcrumb, description, modules, fullWidth, onSave, pageKey, pageSub, children,
}: PrototypeLayoutProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const isFull = fullWidth === true;
  const mods: ModuleDef[] = modules
    ? modules.map((m, i) => ({ id: String(m.id ?? `m${i + 1}`), title: m.title, text: m.text, list: m.list, bind: m.bind }))
    : (description ? parseDescription(description) : []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa', fontFamily: '-apple-system,"PingFang SC","Microsoft YaHei",system-ui,sans-serif', color: '#1f2937' }}>
      <main ref={leftRef} style={{ flex: 1, minWidth: 0, padding: '24px 28px 40px', overflowY: 'auto', maxHeight: '100vh', position: 'relative' }}>
        <header style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 20, margin: 0, fontWeight: 700 }}>{title}</h1>
          {breadcrumb && <p style={{ color: '#5b6b82', fontSize: 12, margin: '4px 0 0' }}>{breadcrumb}</p>}
        </header>
        {children}
      </main>
      {!isFull && (
        <DesignNotesPanel
          modules={mods}
          pageKey={pageKey ?? slug(title)}
          pageSub={pageSub}
          leftContentRef={leftRef}
          onSave={onSave}
        />
      )}
    </div>
  );
}

export default PrototypeLayout;
