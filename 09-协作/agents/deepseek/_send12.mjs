import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS = 'C:\\Users\\游翔\\Documents\\AI work\\产品设计工作台\\09-协作\\messages\\tools';
const node = process.execPath;
const WHO = 'deepseek';
const here = (f) => path.join(__dirname, f);
function run(cmd, args) { console.log('>>> ' + cmd + ' ' + args.slice(0,3).join(' ')); execFileSync(node, [cmd, ...args], { cwd: TOOLS, stdio: 'inherit' }); }
const room = 'DeepSeek_工程包上下文工程设计落地';
run('room-cli.mjs', ['put', room, here('deepseek-确认终稿3新增块.md'), '--who', WHO]);
run('room-cli.mjs', ['say', room, '--i', 'confirm', '--body-file', here('_say12.md'), '--who', WHO]);
run('room-cli.mjs', ['handoff', room, 'qwen', '--body-file', here('_handoff12.md'), '--who', WHO]);
console.log('ALL_DONE');
