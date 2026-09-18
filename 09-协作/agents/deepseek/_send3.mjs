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

const room = 'DeepSeek_脚本跨机器可移植性修复';

run('room-cli.mjs', ['open', '脚本跨机器可移植性修复', '--m', 'doubao,deepseek', '--who', WHO]);
run('room-cli.mjs', ['put', room, here('deepseek-脚本可移植性诊断.md'), '--who', WHO]);
run('room-cli.mjs', ['say', room, '--i', 'handoff', '--body-file', here('_say3.md'), '--who', WHO]);
run('room-cli.mjs', ['handoff', room, 'doubao', '--body-file', here('_handoff3.md'), '--who', WHO]);
run('msg-cli.mjs', ['send', '--from', WHO, '--to', 'doubao', '--type', 'task', '--subject', '脚本跨机器可移植性诊断（请修）', '--body-file', here('deepseek-脚本可移植性诊断.md'), '--thread-id', 'workbench-portability', '--need-reply', 'true']);

console.log('ALL_DONE');
