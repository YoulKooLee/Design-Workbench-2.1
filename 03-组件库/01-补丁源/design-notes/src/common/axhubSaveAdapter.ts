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

/**
 * 还原 JS 字符串字面量转义（单遍扫描）。
 * ?raw 返回的内容是把源码当作「一个 JS 字符串字面量」转义后的文本：
 *   磁盘真实 CR LF → `\r\n` 四个字符；反引号 → `\``；`${` → `\${`；`\` → `\\`。
 * 必须按 JS 转义规则整体还原一次，且不能分段多次 replace（否则 `\\n` 会被二次解释）。
 * 历史缺陷：旧实现只把反斜杠减半，导致换行仍是字面 `\r\n`，searchText 与磁盘永不相等 → 落盘 409。
 */
function unescapeJsStringLiteral(body: string): string {
  let out = '';
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch !== '\\') { out += ch; continue; }
    const next = body[++i];
    switch (next) {
      case 'n': out += '\n'; break;
      case 'r': out += '\r'; break;
      case 't': out += '\t'; break;
      case 'b': out += '\b'; break;
      case 'f': out += '\f'; break;
      case 'v': out += '\v'; break;
      case '0': out += '\0'; break;
      case '\\': out += '\\'; break;
      case '`': out += '`'; break;
      case '$': out += '$'; break;
      case "'": out += "'"; break;
      case '"': out += '"'; break;
      case '\n': break; // 行继续符
      case 'x': {
        const hex = body.slice(i + 1, i + 3);
        out += String.fromCharCode(parseInt(hex, 16));
        i += 2;
        break;
      }
      case 'u': {
        if (body[i + 1] === '{') {
          const end = body.indexOf('}', i);
          out += String.fromCodePoint(parseInt(body.slice(i + 2, end), 16));
          i = end;
        } else {
          out += String.fromCharCode(parseInt(body.slice(i + 1, i + 5), 16));
          i += 4;
        }
        break;
      }
      default:
        // 未知转义：原样保留反斜杠与字符，避免吞内容
        out += next === undefined ? '\\' : `\\${next}`;
    }
  }
  return out;
}

/** 读取 ?raw 原型源码，并剥离 ?raw 包裹，恢复到与磁盘源码逐字节一致的文本 */
async function fetchPrototypeSourceRaw(pageKey: string, opt: AxhubAdapterOptions): Promise<string> {
  const url = (opt.rawUrl ?? ((k) => `/prototypes/${k}/index.tsx?raw`))(pageKey);
  const doFetch = opt.fetchImpl ?? fetch;
  const res = await doFetch(url);
  if (!res.ok) throw new Error(`读取原型源码失败（HTTP ${res.status}）`);
  const text = await res.text();
  // 预览服务对 ?raw 有两种包裹：双引号 JSON（export default "..."）或反引号模板字符串（export default `...`）。
  // 需分别剥离包裹并完整反转义，否则文本替换会因 CRLF/转义不匹配而 409 失败。
  const m = text.match(/export default\s+("(?:[^"\\]|\\.)*")/s);
  if (m) {
    try { return JSON.parse(m[1]); } catch { /* 退回反引号分支 */ }
  }
  const open = text.indexOf('`', text.indexOf('export default'));
  const close = text.lastIndexOf('`');
  if (open >= 0 && close > open) {
    return unescapeJsStringLiteral(text.slice(open + 1, close));
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
      // 反斜杠转义：跳过被转义的下一个字符（如 \' \\），避免把转义引号误判为字符串结束
      if (c === '\\') { i++; continue; }
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
    // 宽松匹配：兼容复合条件分支（如 `if (sub === 'user-manage' || sub === 'role-manage' || ...) {`），
    // 只匹配 `sub === '<pageSub>'` 前缀，再从该位置向后找 return 块。
    const pos = src.indexOf(`sub === '${pageSub}'`, fnIdx);
    if (pos >= 0 && pos < fnEnd) {
      rs = src.indexOf('return [', pos);
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
      // 反斜杠转义：跳过被转义的下一个字符（如 \' \\），避免把转义引号误判为字符串结束
      if (c === '\\') { i++; continue; }
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

function serializeModuleArray(arr: ModuleDef[], eol = '\n', returnIndent = '    '): string {
  // 缩进跟原块对齐：元素比 `return` 多 2 空格，闭合 ] 与 `return` 同级，避免每次保存都把源码格式洗乱
  const itemIndent = `${returnIndent}  `;
  const items = arr.map((mm) => {
    const parts = [`id: ${quoteModuleStr(mm.id)}`, `title: ${quoteModuleStr(mm.title)}`];
    // 字段顺序贴近源码手工书写习惯（id / title / status / bind / text / rich / apiRich / list），减少无意义 diff
    if (mm.status) parts.push(`status: ${quoteModuleStr(mm.status)}`);
    if (mm.bind) parts.push(`bind: ${quoteModuleStr(mm.bind)}`);
    if (mm.text) parts.push(`text: ${quoteModuleStr(mm.text)}`);
    // rich / apiRich 为受限 HTML（保存前已净化）；quoteModuleStr 用单引号包裹，HTML 里的双引号无需转义
    if (mm.rich) parts.push(`rich: ${quoteModuleStr(mm.rich)}`);
    if (mm.apiRich) parts.push(`apiRich: ${quoteModuleStr(mm.apiRich)}`);
    if (mm.list && mm.list.length) parts.push(`list: [${mm.list.map(quoteModuleStr).join(', ')}]`);
    return `${itemIndent}{ ${parts.join(', ')} }`;
  });
  return `[${eol}${items.join(',' + eol)}${eol}${returnIndent}]`;
}

/** 将设计说明模块数组写回原型源码 buildModules，通过本地编辑 API 做文本替换 */
async function saveDesignNotesToSource(
  pageKey: string,
  pageSub: string | undefined,
  next: ModuleDef[],
  opt: AxhubAdapterOptions,
): Promise<void> {
  const src = await fetchPrototypeSourceRaw(pageKey, opt);
  // 子页缺失时必须报错：不能回退到「最后一个 return 块」，否则会把说明写进别的页面
  if (pageSub && !src.includes(`sub === '${pageSub}'`)) {
    throw new Error(`源码 buildModules 里没有子页 ${pageSub} 的分支，无法定位要写回的模块数组`);
  }
  const block = extractReturnBlock(src, pageSub);
  if (!block) throw new Error('未在源码中找到 buildModules 对应模块块');
  const eol = block.includes('\r\n') ? '\r\n' : '\n';
  // 带上子页 marker 上下文作为 searchText，避免空数组块（`return [\n\n  ]`）在多个子页同时命中而串页
  let searchText = block;
  if (pageSub) {
    // 宽松匹配子页条件前缀（兼容 `if (sub === 'user-manage' || ...)` 复合分支）
    const pos = src.indexOf(`sub === '${pageSub}'`);
    if (pos >= 0) {
      const bi = src.indexOf(block, pos);
      if (bi >= 0) {
        // 从该子页条件块开头（`if (sub === ...` 前的完整 `if` 语句起点）截到 block 末尾
        const lineStart = src.lastIndexOf('\n', pos) + 1;
        searchText = src.slice(lineStart, bi + block.length);
      }
    }
  }
  const ri = searchText.indexOf('return [');
  const head = ri >= 0 ? searchText.slice(0, ri) : '';
  // 取 `return [` 所在行的前导空白，新内容按同一缩进回写
  const lineStartIdx = head.lastIndexOf('\n') + 1;
  const returnIndent = /^[ \t]*/.exec(head.slice(lineStartIdx))?.[0] ?? '    ';
  const replaceText = `${head}return ${serializeModuleArray(next, eol, returnIndent)}`;
  const doFetch = opt.fetchImpl ?? fetch;
  const res = await doFetch((opt.replaceUrl ?? '/api/text-replace/replace'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: (opt.resolvePath ?? ((k) => `prototypes/${k}`))(pageKey),
      replacements: [{ searchText, replaceText }],
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
