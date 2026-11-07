import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Tag } from '../../基础/Tag';

/** 差异类型 */
export type DiffKind = 'same' | 'add' | 'del' | 'mod';

/** 差异行（left / right 双栏对齐） */
export interface DiffLine {
  kind: DiffKind;
  /** 左栏（旧版本）文本；add 行为 undefined */
  left?: string;
  /** 右栏（新版本）文本；del 行为 undefined */
  right?: string;
  /** 左栏行号 */
  leftNo?: number;
  /** 右栏行号 */
  rightNo?: number;
}

/** 差异统计 */
export interface DiffStat {
  add: number;
  del: number;
  mod: number;
  same: number;
}

/** 大文本降级阈值：超过该乘积则退化为逐行对齐比较（避免 O(n·m) 卡顿） */
const LCS_LIMIT = 250000;

/**
 * 逐行差异算法（零依赖 LCS 实现，替代 diff / jsdiff）。
 * 规则：行数乘积过大时自动降级为逐行比较，保证长文档不卡死。
 */
export function diffLines(oldText: string, newText: string): DiffLine[] {
  const a = String(oldText ?? '').split(/\r?\n/);
  const b = String(newText ?? '').split(/\r?\n/);

  if (a.length * b.length > LCS_LIMIT) {
    const out: DiffLine[] = [];
    const len = Math.max(a.length, b.length);
    for (let i = 0; i < len; i++) {
      const l = a[i];
      const r = b[i];
      if (l === r) out.push({ kind: 'same', left: l, right: r, leftNo: i + 1, rightNo: i + 1 });
      else if (l === undefined) out.push({ kind: 'add', right: r, rightNo: i + 1 });
      else if (r === undefined) out.push({ kind: 'del', left: l, leftNo: i + 1 });
      else out.push({ kind: 'mod', left: l, right: r, leftNo: i + 1, rightNo: i + 1 });
    }
    return out;
  }

  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  type Op = { kind: 'same' | 'del' | 'add'; left?: string; right?: string };
  const ops: Op[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      ops.push({ kind: 'same', left: a[i], right: b[j] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ kind: 'del', left: a[i] });
      i++;
    } else {
      ops.push({ kind: 'add', right: b[j] });
      j++;
    }
  }
  while (i < m) ops.push({ kind: 'del', left: a[i++] });
  while (j < n) ops.push({ kind: 'add', right: b[j++] });

  // 相邻的「删 + 增」合并为「修改」，双栏对齐更易读
  const merged: DiffLine[] = [];
  for (let k = 0; k < ops.length; k++) {
    const cur = ops[k];
    const next = ops[k + 1];
    if (cur.kind === 'del' && next && next.kind === 'add') {
      merged.push({ kind: 'mod', left: cur.left, right: next.right });
      k++;
      continue;
    }
    merged.push({ kind: cur.kind, left: cur.left, right: cur.right });
  }

  let ln = 0;
  let rn = 0;
  return merged.map((d) => {
    const withNo: DiffLine = { ...d };
    if (d.kind === 'same') {
      ln++;
      rn++;
      withNo.leftNo = ln;
      withNo.rightNo = rn;
    } else if (d.kind === 'del') {
      ln++;
      withNo.leftNo = ln;
    } else if (d.kind === 'add') {
      rn++;
      withNo.rightNo = rn;
    } else {
      ln++;
      rn++;
      withNo.leftNo = ln;
      withNo.rightNo = rn;
    }
    return withNo;
  });
}

/** 统计差异行数 */
export function diffStat(lines: DiffLine[]): DiffStat {
  const stat: DiffStat = { add: 0, del: 0, mod: 0, same: 0 };
  for (const l of lines) stat[l.kind] += 1;
  return stat;
}

const ROW_BG: Record<DiffKind, string> = {
  same: '',
  add: 'bg-success-light',
  del: 'bg-danger-light',
  mod: 'bg-warning-light',
};

const ROW_TEXT: Record<DiffKind, string> = {
  same: 'text-neutral-8',
  add: 'text-success',
  del: 'text-danger',
  mod: 'text-warning',
};

export interface ContentVersionDiffProps {
  /** 旧版本内容（纯文本，按行比较） */
  oldText: string;
  /** 新版本内容 */
  newText: string;
  /** 旧版本标签，默认「旧版本」 */
  oldLabel?: ReactNode;
  /** 新版本标签，默认「新版本」 */
  newLabel?: ReactNode;
  /** 是否显示表头（版本标签 + 差异统计），默认 true */
  showHeader?: boolean;
  /** 是否只显示差异行（隐藏未变更行），默认 false */
  onlyDiff?: boolean;
  /** 滚动区最大高度（px），默认 480 */
  maxHeight?: number;
  className?: string;
}

/**
 * ContentVersionDiff 内容版本对比
 * 场景：CMS 内容版本历史对比、配置变更对比、规则修改前后对照。
 * 规则：比较纯文本按行进行；改动用颜色区分（新增绿 / 删除红 / 修改橙），不要只用文案描述差异。
 * @example
 * <ContentVersionDiff
 *   oldText={v2.body} newText={v3.body}
 *   oldLabel="v2.1（2026-09-18）" newLabel="v2.2（2026-09-19）"
 *   onlyDiff={false}
 * />
 */
export function ContentVersionDiff({
  oldText,
  newText,
  oldLabel = '旧版本',
  newLabel = '新版本',
  showHeader = true,
  onlyDiff = false,
  maxHeight = 480,
  className,
}: ContentVersionDiffProps) {
  const lines = React.useMemo(() => diffLines(oldText, newText), [oldText, newText]);
  const stat = React.useMemo(() => diffStat(lines), [lines]);
  const shown = onlyDiff ? lines.filter((l) => l.kind !== 'same') : lines;

  return (
    <div className={cn('flex flex-col rounded-lg border border-neutral-3 overflow-hidden', className)}>
      {showHeader && (
        <div className="flex items-center justify-between gap-3 px-4 h-12 bg-neutral-1 border-b border-neutral-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <Tag color="red">{oldLabel}</Tag>
            <span className="text-neutral-5">→</span>
            <Tag color="green">{newLabel}</Tag>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-6">
            <span className="text-success">+{stat.add + stat.mod} 行新增/修改</span>
            <span className="text-danger">-{stat.del + stat.mod} 行删除/修改</span>
            <span>未变更 {stat.same} 行</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-[40px_1fr_40px_1fr] bg-neutral-2 text-2xs text-neutral-6 h-7 items-center">
        <div />
        <div className="px-3 border-r border-neutral-3 truncate">{oldLabel}</div>
        <div />
        <div className="px-3 truncate">{newLabel}</div>
      </div>

      <div className="overflow-y-auto font-mono text-xs" style={{ maxHeight }}>
        {shown.length === 0 ? (
          <div className="px-4 py-8 text-center text-neutral-6 font-sans">两个版本内容一致，无差异</div>
        ) : (
          <table className="w-full border-collapse">
            <tbody>
              {shown.map((l, i) => (
                <tr key={i} className={cn(ROW_BG[l.kind])}>
                  <td className="w-10 px-2 py-1 text-right align-top text-2xs text-neutral-5 select-none border-r border-neutral-3">{l.leftNo ?? ''}</td>
                  <td className={cn('px-3 py-1 align-top whitespace-pre-wrap break-all border-r border-neutral-3', ROW_TEXT[l.kind])}>
                    {l.left ?? (l.kind === 'add' ? '' : '')}
                  </td>
                  <td className="w-10 px-2 py-1 text-right align-top text-2xs text-neutral-5 select-none border-r border-neutral-3">{l.rightNo ?? ''}</td>
                  <td className={cn('px-3 py-1 align-top whitespace-pre-wrap break-all', ROW_TEXT[l.kind])}>{l.right ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
