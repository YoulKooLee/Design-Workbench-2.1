import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS = 'C:\\Users\\游翔\\Documents\\AI work\\产品设计工作台\\09-协作\\messages\\tools';
const node = process.execPath;
const WHO = 'deepseek';
const here = (f) => path.join(__dirname, f);
function run(cmd, args) { console.log('>>> ' + cmd + ' ' + args.slice(0,3).join(' ')); execFileSync(node, [cmd, ...args], { cwd: TOOLS, stdio: 'inherit' }); }
const room = 'DeepSeek_Make僵尸进程自愈修复';
run('room-cli.mjs', ['open', 'Make僵尸进程自愈修复', '--m', 'doubao,deepseek', '--who', WHO]);
run('room-cli.mjs', ['put', room, here('deepseek-Make僵尸自愈修复.md'), '--who', WHO]);
run('room-cli.mjs', ['say', room, '--i', 'handoff', '--body-file', here('_say11.md'), '--who', WHO]);
run('room-cli.mjs', ['handoff', room, 'doubao', '--body-file', here('_handoff11.md'), '--who', WHO]);
run('msg-cli.mjs', ['send', '--from', WHO, '--to', 'doubao', '--type', 'task', '--subject', 'Make僵尸进程自愈修复（launch-project.ps1）', '--body-file', here('deepseek-Make僵尸自愈修复.md'), '--thread-id', 'workbench-make-zombie-recovery', '--need-reply', 'true']);
console.log('ALL_DONE');
