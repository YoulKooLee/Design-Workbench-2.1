// workbuddy_board.mjs — 简单对齐 room-cli 的 board 行为：往 00-任务说明.md 的指定段追加一条带身份+时间戳
// 用法：node workbuddy_board.mjs <spec.md 绝对路径> <section> <content> <from>
import fs from 'fs';
const [specFile, section, content, from] = process.argv.slice(2);
let txt = fs.readFileSync(specFile, 'utf-8').replace(/\r\n/g, '\n');
const stamp = `[${from} ${new Date().toISOString()}] ${content}`;
const re = new RegExp(`(^##\\s+${section}\\s*\\n)([\\s\\S]*?)(?=^##\\s|$)`, 'm');
if (re.test(txt)) {
  txt = txt.replace(re, (mm, p1, p2) => p1 + (p2.trim() ? p2.replace(/\n+$/,'') + '\n' : '') + stamp + '\n\n');
} else {
  txt = txt.replace(/\n*$/, '') + '\n\n## ' + section + '\n' + stamp + '\n';
}
fs.writeFileSync(specFile, txt, 'utf-8');
console.log('[board]', specFile, 'section=' + section, 'len=' + stamp.length);
