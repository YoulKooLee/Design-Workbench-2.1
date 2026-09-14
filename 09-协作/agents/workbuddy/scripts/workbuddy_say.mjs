// workbuddy_say.mjs — WorkBuddy 私有 wrapper：UTF-8 安全地追加 room 消息
// 复用：room-cli mjs 是公共协议工具，不允许修改；本 wrapper 走相同 JSON 格式写入同一文件。
// 用法：node workbuddy_say.mjs <messages.jsonl 绝对路径> <from> <intent> <body.md 绝对路径>
import fs from 'fs';
const [msgFile, from, intent, bodyFile] = process.argv.slice(2);
const body = fs.readFileSync(bodyFile, 'utf-8');
const entry = { ts: new Date().toISOString(), from, intent, content: body };
fs.appendFileSync(msgFile, JSON.stringify(entry) + '\n', 'utf-8');
console.log('[say]', msgFile, 'from=' + from, 'intent=' + intent, 'len=' + body.length);
