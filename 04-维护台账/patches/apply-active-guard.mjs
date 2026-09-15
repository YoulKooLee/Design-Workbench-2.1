// 重装 @axhub/make 后，一键复打"多项目共用 53817 单例防抢占"补丁。
// 用法：node "c:/Users/游翔/Documents/AI work/产品设计工作台/04-维护台账/patches/apply-active-guard.mjs"
import { readFileSync, writeFileSync } from 'fs';
// 目标：工作台实际 make CLI（指标管理平台为 Make 宿主项目）。若其他项目装有 @axhub/make 且需复打，改此路径即可。
const CLI = 'c:/Users/游翔/Documents/AI work/产品设计工作台/01-项目/指标管理平台/node_modules/@axhub/make/dist/server/cli.mjs';
const s = readFileSync(CLI, 'utf8');
const re = /setActiveProject\(id\)\s*\{\s*const registry = load\(\);[\s\S]*?save\(\{\s*\.\.\.registry,\s*activeProjectId: id\s*\}\);\s*\}/;
if (re.test(s)) {
  const patched = s.replace(re, `    setActiveProject(id) {
      const registry = load();
      if (!registry.projects.some((project) => project.id === id)) {
        throw new Error(\`Project not found: \${id}\`);
      }
      const currentActiveId = registry.activeProjectId;
      if (currentActiveId && currentActiveId !== id) {
        const current = registry.projects.find((p) => p.id === currentActiveId) ?? null;
        const target = registry.projects.find((p) => p.id === id) ?? null;
        const isAlive = (proj) => {
          if (!proj) return false;
          const rt = readServerInfo(proj.root, "runtime");
          return !!(rt && isLiveMakeClientRuntime(rt, proj.root));
        };
        if (isAlive(current) && !isAlive(target)) {
          return;
        }
      }
      save({ ...registry, activeProjectId: id });
    }`);
  writeFileSync(CLI, patched, 'utf8');
  console.log('active-guard re-applied to cli.mjs');
} else {
  console.log('already patched or anchor not found — nothing to do');
}
