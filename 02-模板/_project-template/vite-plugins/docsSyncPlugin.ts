import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

/**
 * docsSyncPlugin — docs/ 变更自动同步到 src/resources/
 *
 * docs/ 是文档真源（SRS / PRD / HLD / LLD）；src/resources/ 放 markdown 副本，
 * 供 Make 管理端预览。本插件在 Vite dev server 运行时：
 *   1. 启动时先跑一次全量同步
 *   2. 只监听 docs/ 下 .md 的新增 / 修改，300ms 防抖后增量同步
 */

const INCLUDE = [/PRD/i, /SRS/i, /需求规格说明书/, /概要设计/, /详细设计/];
const EXCLUDE_DIRS = ['过程文档', 'node_modules', '.git', 'archive', '归档', '旧版', '备份'];

function walkDocs(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.some((x) => e.name.includes(x))) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkDocs(p, out);
    else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) out.push(p);
  }
  return out;
}

function syncDocs(projectRoot: string, log = true): number {
  const docsDir = path.join(projectRoot, 'docs');
  const resDir = path.join(projectRoot, 'src', 'resources');
  if (!fs.existsSync(docsDir)) return 0;
  fs.mkdirSync(resDir, { recursive: true });

  const sources = walkDocs(docsDir).filter((f) =>
    INCLUDE.some((re) => re.test(path.basename(f))),
  );
  const seen = new Map<string, string>();
  let copied = 0;

  for (const src of sources) {
    let name = path.basename(src);
    const key = name.toLowerCase();
    if (seen.has(key)) {
      const parent = path.basename(path.dirname(src));
      name = parent + '-' + name;
    }
    seen.set(key, src);

    const dest = path.join(resDir, name);
    const body = fs.readFileSync(src);
    if (fs.existsSync(dest) && Buffer.compare(fs.readFileSync(dest), body) === 0) continue;
    fs.writeFileSync(dest, body);
    copied++;
    if (log) console.log(`[docs:sync] ${path.relative(projectRoot, src)} → src/resources/${name}`);
  }
  if (copied > 0 && log) console.log(`[docs:sync] 完成，同步 ${copied} 份文档`);
  return copied;
}

export function docsSyncPlugin(projectRoot: string): Plugin {
  return {
    name: 'docs-sync',
    apply: 'serve',
    configureServer(server) {
      const docsDir = path.join(projectRoot, 'docs');

      // 启动时先全量同步一次
      syncDocs(projectRoot);

      if (!fs.existsSync(docsDir)) return;

      // 只对 docs/ 下的 .md 变化反应——否则每次保存任何文件都白跑一次全量扫描，
      // 且向 src/resources/ 的写入会再次触发 watcher（有界但无谓）。
      const underDocs = (p: string): boolean => {
        const rel = path.relative(docsDir, p);
        return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
      };

      let timer: NodeJS.Timeout | null = null;
      const onFile = (file: string) => {
        if (!underDocs(file)) return;
        if (!file.toLowerCase().endsWith('.md')) return;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => syncDocs(projectRoot), 300);
      };

      server.watcher.add(docsDir);
      server.watcher.on('change', onFile);
      server.watcher.on('add', onFile);
    },
  };
}