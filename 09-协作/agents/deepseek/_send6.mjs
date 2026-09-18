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

const room = '千问_工作台三重审查整改闭环';

run('room-cli.mjs', ['put', room, here('deepseek-用户裁决与src-themes归属问询.md'), '--who', WHO]);
run('room-cli.mjs', ['say', room, '--i', 'ask', '--body-file', here('_say6.md'), '--who', WHO]);
run('msg-cli.mjs', ['send', '--from', WHO, '--to', 'doubao', '--type', 'question', '--subject', '用户裁决：编码策略方案A + 请澄清src/themes归属', '--body-file', here('deepseek-用户裁决与src-themes归属问询.md'), '--thread-id', 'workbench-triple-audit-fix', '--need-reply', 'true']);

console.log('ALL_DONE');
