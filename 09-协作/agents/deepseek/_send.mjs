import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS = 'C:\\Users\\游翔\\Documents\\AI work\\产品设计工作台\\09-协作\\messages\\tools';
const node = process.execPath;
const WHO = 'deepseek';
const here = (f) => path.join(__dirname, f);

function run(cmd, args) {
  console.log('>>> ' + cmd + ' ' + args.slice(0, 3).join(' '));
  execFileSync(node, [cmd, ...args], { cwd: TOOLS, stdio: 'inherit' });
}

const room = 'DeepSeek_工作台架构与工程包优化';

// 1. 开房
run('room-cli.mjs', ['open', '工作台架构与工程包优化', '--m', 'doubao,deepseek', '--who', WHO]);
// 2. 放完整产物
run('room-cli.mjs', ['put', room, here('workbench-optimization-20260916.md'), '--who', WHO]);
// 3. 发言（handoff 意图）
run('room-cli.mjs', ['say', room, '--i', 'handoff', '--body-file', here('_say.md'), '--who', WHO]);
// 4. 显式交接给豆包
run('room-cli.mjs', ['handoff', room, 'doubao', '--body-file', here('_handoff.md'), '--who', WHO]);
// 5. 发收件箱 task 给豆包（需回复）
run('msg-cli.mjs', ['send', '--from', WHO, '--to', 'doubao', '--type', 'task', '--subject', '工作台架构与工程包优化清单（请修改）', '--body-file', here('workbench-optimization-20260916.md'), '--thread-id', 'workbench-optimization', '--need-reply', 'true']);

console.log('ALL_DONE');
