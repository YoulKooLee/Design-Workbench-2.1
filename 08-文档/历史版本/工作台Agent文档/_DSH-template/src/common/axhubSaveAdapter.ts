/**
 * Axhub 落盘参考适配器（示例，非模块本体依赖）
 * ------------------------------------------------------------------
 * 结构监测原型在 Axhub 预览服务（Make Client）下的「设计说明实时落盘」实现。
 * 它把编辑结果写回原型源码 buildModules 数组，保证「工作面板」与「导出 HTML（含源码）」读同一份真源。
 *
 * 这是 write-design-notes 模块「可注入 onSave」的一种参考实现。
 * 其他项目 / 模板若要复用本模块，可照搬此文件，或按自家存储改写 save 逻辑：
 *   - 只要实现一个 (next: ModuleDef[], meta) => Promise<void> 即可接上 DesignNotesPanel。
 *
 * 依赖（由 Axhub 预览服务提供，其他项目需自行对齐）：
 *   1) GET  /prototypes/<pageKey>/index.tsx?raw  -> 返回该原型源码文本（支持双引号 JSON 或反引号模板两种 ?raw 包裹）
 *   2) POST /api/text-replace/replace            -> { path, replacements:[{searchText, replaceText}] }，成功返回 { success:true }
 */

import type { DesignNotesSaveAdapter, DesignNotesSaveMeta, ModuleDef } from './designNotesTypes';

export interface AxhubAdapterOptions {
  /** 取源码原始文本的 URL 构造器，默认 `/prototypes/<pageKey>/index.tsx?raw` */
  rawUrl?: (pageKey: string) => string;
  /** 文本替换接口地址，默认 `/api/text-replace/replace` */
  replaceUrl?: string;
  /** 文本替换请求中 path 字段构造器，默认 `prototypes/<pageKey>` */
  resolvePath?: (pageKey: string) => string;
  /** fetch 实现（测试 / SSR 注入用），默认全局 fetch */
  fetchImpl?: typeof fetch;
}

/** 读取 ?raw 原型源码，并剥离 ?raw 包裹，恢复到与磁盘源码逐字节一致的文本 */
async function fetchPrototypeSourceRaw(pageKey: string, opt: AxhubAdapterOptions): Promise<string> {
  const url = (opt.rawUrl ?? ((k) => `/prototypes/${k}/index.tsx?raw`))(pageKey);
  const doFetch = opt.fetchImpl ?? fetch;
  const text = await (await doFetch(url)).text();
  // 预览服务对 ?raw 有两种包裹：双引号 JSON（export default "..."）或反引号模板字符串（export default `...`）。
  // 需分别剥离包裹并完整反转义，否则文本替换会因 CRLF/转义不匹配而 409 失败。
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
  // 复用已声明的 depth / inStr / strCh（重置后用于定位数组闭合 ]）
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
  pageKey: string,
  pageSub: string | undefined,
  next: ModuleDef[],
  opt: AxhubAdapterOptions,
): Promise<void> {
  const src = await fetchPrototypeSourceRaw(pageKey, opt);
  const block = extractReturnBlock(src, pageSub);
  if (!block) throw new Error('未在源码中找到 buildModules 对应模块块');
  const eol = block.includes('\r\n') ? '\r\n' : '\n';
  const replaceText = `return ${serializeModuleArray(next, eol)}`;
  const doFetch = opt.fetchImpl ?? fetch;
  const res = await doFetch((opt.replaceUrl ?? '/api/text-replace/replace'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: (opt.resolvePath ?? ((k) => `prototypes/${k}`))(pageKey),
      replacements: [{ searchText: block, replaceText }],
    }),
  });
  const data = (await res.json()) as { success?: boolean; error?: string };
  if (!data?.success) throw new Error(data?.error || '本地保存失败');
}

/**
 * 创建 Axhub 风格的保存适配器。返回的回调可直接作为 DesignNotesPanel 的 onSave 入参。
 *
 * 用法：
 *   const onSave = createAxhubDesignNotesAdapter();
 *   <DesignNotesPanel modules={m} pageKey="diagnosis" leftContentRef={leftRef} onSave={onSave} />
 */
export function createAxhubDesignNotesAdapter(opt: AxhubAdapterOptions = {}): DesignNotesSaveAdapter {
  return (next: ModuleDef[], meta: DesignNotesSaveMeta) =>
    saveDesignNotesToSource(meta.pageKey, meta.pageSub, next, opt);
}
