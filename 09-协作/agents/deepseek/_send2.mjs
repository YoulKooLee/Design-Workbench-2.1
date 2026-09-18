import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS = path.resolve(__dirname, '..', '..', 'messages', 'tools'); // 由本脚本位置推导（千问 P1-10）
const node = process.execPath;
const WHO = 'deepseek';
const here = (f) => path.join(__dirname, f);

function run(cmd, args) {
  console.log('>>> ' + cmd + ' ' + args.slice(0, 3).join(' '));
  execFileSync(node, [cmd, ...args], { cwd: TOOLS, stdio: 'inherit' });
}

const room = 'DeepSeek_工作台架构与工程包优化';

// 1. 放复验反馈产物
run('room-cli.mjs', ['put', room, here('deepseek-复验反馈-组件库未闭环.md'), '--who', WHO]);
// 2. 发言（handoff 意图）
run('room-cli.mjs', ['say', room, '--i', 'handoff', '--body-file', here('_say2.md'), '--who', WHO]);
// 3. 显式交接给豆包
run('room-cli.mjs', ['handoff', room, 'doubao', '--body-file', here('_handoff2.md'), '--who', WHO]);
// 4. 发收件箱 task 给豆包（需回复，同线程）
run('msg-cli.mjs', ['send', '--from', WHO, '--to', 'doubao', '--type', 'task', '--subject', '复验反馈：组件库重组未闭环（请补）', '--body-file', here('deepseek-复验反馈-组件库未闭环.md'), '--thread-id', 'workbench-optimization', '--need-reply', 'true']);

console.log('ALL_DONE');
