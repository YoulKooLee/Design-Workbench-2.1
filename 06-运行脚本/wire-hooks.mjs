#!/usr/bin/env node
/**
 * wire-hooks.mjs —— 把 .agents/settings.json 的 Hook 注册「薄接线」到宿主真正会读的路径。
 *
 * 为什么需要：`.agents/settings.json` 是 Hook 配置唯一真源，但**宿主不读它**。
 * WorkBuddy 桌面 / CodeBuddy CLI 读的是 `<项目>/.codebuddy/settings.local.json`
 * （见 03-组件库/01-补丁源/mem-hooks/README.md：「只对 CodeBuddy 系宿主生效，
 * 其他宿主不读 .codebuddy/」）。2026-09-22 实测「8 个 hook 全不执行」的根因
 * 不是宿主不支持，而是**从没放过这份薄接线**。
 *
 * 格式：以 mem-hooks/settings.local.json（唯一经验证可在 CodeBuddy 系跑起来的样本）为准：
 *   - 命令用绝对路径 `$CODEBUDDY_PROJECT_DIR/.agents/hooks/run.cjs`（不依赖宿主 cwd）
 *   - SessionStart 的 matcher 用 `startup|resume`（不是 Claude 的 `*`）
 *   - timeout 单位是**秒**（不是 .agents/settings.json 里的毫秒）
 *
 * 设计约束：
 *  1. **合并而非覆盖** —— `.codebuddy/settings.local.json` 同时是 mem-hooks
 *     （project-memory 注入）的落点。本脚本按「命令是否含 run.cjs」识别自己的条目：
 *     重跑时**替换**旧条目（幂等，不会因格式升级产生重复），**保留** mem.cjs 等他方条目。
 *  2. **只写接线，不搬正文** —— 严禁把 skills/ agents/ knowledge/ 复制进
 *     `.codebuddy/`（见 _project-development/.agents/adapters/README.md）。
 *  3. **模板侧默认只生成 adapters 样板，不预置 .codebuddy/** ——
 *     遵循「资源包根目录不预置接线，由接入方按需复制」。加 --in-template 才在模板内真接线。
 *
 * 用法：
 *   node 06-运行脚本/wire-hooks.mjs                # 全部目标（两模板生成样板 + 7 项目接线）
 *   node 06-运行脚本/wire-hooks.mjs --dry          # 只报告，不写任何文件
 *   node 06-运行脚本/wire-hooks.mjs <目标目录> ...  # 指定目标
 *   node 06-运行脚本/wire-hooks.mjs --unwire       # 移除本脚本写入的 run.cjs 接线（保留 mem-hooks）
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith('--')));
const positional = argv.filter((a) => !a.startsWith('--'));
const DRY = flags.has('--dry');
const IN_TEMPLATE = flags.has('--in-template');
const UNWIRE = flags.has('--unwire');

const TEMPLATES = ['02-模板/_project-template', '02-模板/_project-development'];
const PROJECTS = fs.existsSync(path.join(ROOT, '01-项目'))
  ? fs.readdirSync(path.join(ROOT, '01-项目'), { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
      .map((d) => '01-项目/' + d.name)
  : [];
const targets = positional.length ? positional : [...TEMPLATES, ...PROJECTS];

/** 判定一个 hook 命令是否是本脚本写入的（run.cjs 系）——用于幂等替换与 --unwire */
const isOurs = (cmd) => typeof cmd === 'string' && cmd.includes('run.cjs');

function readJson(p) {
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  try { return JSON.parse(raw); }
  catch (e) { throw new Error(`${p} 解析失败：${e.message}`); }
}

/**
 * 把 .agents/settings.json 的 hooks 转成 CodeBuddy 系宿主格式。
 * - command: `node .agents/hooks/run.cjs X` → `node "$CODEBUDDY_PROJECT_DIR/.agents/hooks/run.cjs" X`
 * - SessionStart matcher `*` → `startup|resume`
 * - timeout 毫秒 → 秒（向下取整，最小 5）
 */
function toCodeBuddy(hooks) {
  const out = {};
  for (const [ev, groups] of Object.entries(hooks || {})) {
    out[ev] = (groups || []).map((g) => {
      let matcher = g.matcher;
      if (ev === 'SessionStart' && (matcher === '*' || matcher === undefined)) matcher = 'startup|resume';
      const hk = (g.hooks || []).map((h) => {
        const cmd = (h.command || '').replace(
          /^node\s+\.agents\/hooks\/run\.cjs/,
          'node "$CODEBUDDY_PROJECT_DIR/.agents/hooks/run.cjs"'
        );
        const o = Object.assign({}, h, { command: cmd });
        if (typeof h.timeout === 'number' && h.timeout >= 1000) o.timeout = Math.max(5, Math.round(h.timeout / 1000));
        return o;
      });
      const ng = Object.assign({}, g, { hooks: hk });
      if (matcher !== undefined) ng.matcher = matcher;
      return ng;
    });
  }
  return out;
}

/** 合并：先用 incoming（已转 CodeBuddy 格式）替换 base 里所有 run.cjs 条目，保留他方条目（mem.cjs 等） */
function mergeHooks(base, incoming) {
  const out = {};
  const events = new Set([...Object.keys(base || {}), ...Object.keys(incoming || {})]);
  for (const ev of events) {
    const groups = [];
    // 保留 base 里「不是我们写的」条目（如 mem-hooks）
    for (const g of (base?.[ev] || [])) {
      const keptHooks = (g.hooks || []).filter((h) => !isOurs(h.command));
      if (keptHooks.length) groups.push(Object.assign({}, g, { hooks: keptHooks }));
    }
    // 加入 incoming（我们的最新格式）
    for (const g of (incoming?.[ev] || [])) groups.push(g);
    if (groups.length) out[ev] = groups;
  }
  return out;
}

/** 移除本脚本写入的 run.cjs 条目（--unwire），保留 mem-hooks */
function stripOurs(base) {
  const out = {};
  for (const [ev, groups] of Object.entries(base || {})) {
    const gs = [];
    for (const g of groups) {
      const kept = (g.hooks || []).filter((h) => !isOurs(h.command));
      if (kept.length) gs.push(Object.assign({}, g, { hooks: kept }));
    }
    if (gs.length) out[ev] = gs;
  }
  return out;
}

const cnt = (o) => Object.values(o || {}).reduce((a, gs) => a + gs.reduce((b, g) => b + (g.hooks || []).length, 0), 0);
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

let okCount = 0, skipCount = 0, failCount = 0, adapterCount = 0, unwireCount = 0;

for (const t of targets) {
  const root = path.isAbsolute(t) ? t : path.join(ROOT, t);
  const label = path.isAbsolute(t) ? path.basename(t) : t;
  if (!fs.existsSync(root)) { console.log(`— 跳过（不存在）: ${label}`); skipCount++; continue; }

  const srcSettings = path.join(root, '.agents', 'settings.json');
  const runCjs = path.join(root, '.agents', 'hooks', 'run.cjs');
  const isTemplate = t.startsWith('02-模板') || TEMPLATES.includes(t);

  // ---- --unwire：移除接线 ----
  if (UNWIRE) {
    const cbFile = path.join(root, '.codebuddy', 'settings.local.json');
    const existing = readJson(cbFile);
    if (!existing?.hooks) { console.log(`= ${label}: 无接线可移除`); skipCount++; continue; }
    const stripped = stripOurs(existing.hooks);
    const before = cnt(existing.hooks), after = cnt(stripped);
    const out = Object.assign({}, existing, { hooks: stripped });
    if (!DRY) {
      if (after === 0) { fs.rmSync(cbFile, { force: true }); console.log(`✓ ${label}: 移除 ${before} 个接线，文件已空删除（mem-hooks 若有则保留计数 ${after}）`); }
      else fs.writeFileSync(cbFile, JSON.stringify(out, null, 2) + '\n', 'utf8');
    }
    if (after > 0) console.log(`✓ ${label}: 移除 ${before - after} 个 run.cjs 接线，保留 ${after} 个他方条目${DRY ? ' [dry]' : ''}`);
    unwireCount++; continue;
  }

  if (!fs.existsSync(srcSettings) || !fs.existsSync(runCjs)) {
    console.log(`— 跳过（无 .agents/settings.json 或 hooks/run.cjs）: ${label}`); skipCount++; continue;
  }
  let src;
  try { src = readJson(srcSettings); } catch (e) { console.log(`✗ ${label}: ${e.message}`); failCount++; continue; }
  if (!src?.hooks || !Object.keys(src.hooks).length) {
    console.log(`✗ ${label}: .agents/settings.json 无 hooks 段`); failCount++; continue;
  }

  const cbHooks = toCodeBuddy(src.hooks);   // 转成宿主格式

  // ---- 模板侧：生成 adapters 样板（CodeBuddy 格式），不预置 .codebuddy/ ----
  if (isTemplate && !IN_TEMPLATE) {
    const adDir = path.join(root, '.agents', 'adapters', 'codebuddy');
    const adFile = path.join(adDir, 'settings.local.json');
    const payload = {
      '//': 'WorkBuddy 桌面 / CodeBuddy CLI 接线样板。复制到 <项目>/.codebuddy/settings.local.json 后新开对话生效。命令用 $CODEBUDDY_PROJECT_DIR 绝对路径，timeout 单位为秒。',
      hooks: cbHooks,
    };
    const existed = fs.existsSync(adFile);
    if (!DRY) { fs.mkdirSync(adDir, { recursive: true }); fs.writeFileSync(adFile, JSON.stringify(payload, null, 2) + '\n', 'utf8'); }
    console.log(`${existed ? '↻' : '✓'} ${label}: adapters 样板 ${DRY ? '(dry) ' : ''}${rel(adFile)}  ${Object.keys(cbHooks).length} 事件`);
    adapterCount++;
    if (!(fs.existsSync(path.join(root, '.codebuddy')) && !ADAPTER_ONLY)) continue;
  }

  // ---- 通用接线：<root>/.codebuddy/settings.local.json ----
  const cbDir = path.join(root, '.codebuddy');
  const cbFile = path.join(cbDir, 'settings.local.json');
  const existing = readJson(cbFile);
  const merged = mergeHooks(existing?.hooks, cbHooks);
  const before = cnt(existing?.hooks), after = cnt(merged);
  const oursNow = Object.values(merged).flat().reduce((a, g) => a + g.hooks.filter((h) => isOurs(h.command)).length, 0);
  const foreign = after - oursNow;

  // 幂等：若合并结果与现有完全一致（JSON 相等），跳过
  const sameAsExisting = existing && JSON.stringify(existing.hooks) === JSON.stringify(merged);
  if (sameAsExisting) { console.log(`= ${label}: 已是最新接线（${after} 注册，其中他方 ${foreign}），无需改动`); skipCount++; continue; }

  const out = Object.assign({}, existing || {}, { hooks: merged });
  if (!DRY) { fs.mkdirSync(cbDir, { recursive: true }); fs.writeFileSync(cbFile, JSON.stringify(out, null, 2) + '\n', 'utf8'); }
  console.log(`✓ ${label}: 接线 ${oursNow} 个 run.cjs hook${foreign ? `（保留他方 ${foreign}）` : ''} → ${rel(cbFile)}${DRY ? ' [dry-run]' : ''}`);
  okCount++;
}

console.log(`\n${UNWIRE ? '移除' : '接线'} ${UNWIRE ? unwireCount : okCount} · 样板 ${adapterCount} · 跳过 ${skipCount} · 失败 ${failCount}${DRY ? '（dry-run，未写入）' : ''}`);
if (!UNWIRE) {
  console.log('验证（脚本层，已可自测）：cd 到项目根跑 node .agents/hooks/run.cjs session-start');
  console.log('验证（宿主层，需你确认）：新开一次 WorkBuddy 对话，日志应出现 HookExecutor spawn run.cjs，');
  console.log('      且会话里能看到「技能索引（自动注入…）」——这证明宿主真的调用了接线。');
}
process.exit(failCount ? 1 : 0);
