// 产品设计工作台 —— 无状态工具函数（从 server.mjs 拆出，P3 拆分第一步）
// 纯 Node 内置模块。改动本文件后须 node --check + 重启验证。

function cleanEnvForSpawn() {
  const env = { ...process.env };
  delete env.NODE_OPTIONS;
  for (const k of Object.keys(env)) {
    if (/^CODEBUDDY/i.test(k)) delete env[k];
  }
  if (env.PATH) {
    env.PATH = env.PATH
      .split(';')
      .filter((p) => p && !/CodeBuddy/i.test(p) && !/codebuddy/i.test(p))
      .join(';');
  }
  return env;
}

function send(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function sendError(res, msg, status = 400) {
  send(res, status, { ok: false, msg });
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { resolve({}); }
    });
  });
}

function safeName(s) {
  return (s || '').replace(/[<>:"|?*\\\/]/g, '').trim();
}

function parseFrontmatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return { name: '', description: '' };
  const lines = m[1].split('\n');
  let name = '', description = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('name:')) {
      name = line.slice(5).trim().replace(/^["']|["']$/g, '');
    } else if (line.startsWith('description:')) {
      let val = line.slice(12).trim();
      if (val === '>' || val === '|') {
        // 折叠块（> / |）：收集到 frontmatter 末尾（这些 SKILL.md 仅含 name + description）
        const parts = [];
        i++;
        while (i < lines.length) { parts.push(lines[i].trim()); i++; }
        description = parts.join(' ');
        break;
      } else {
        description = val.replace(/^["']|["']$/g, '');
      }
    }
  }
  return { name, description };
}

function extractTriggers(desc) {
  if (!desc) return '';
  const m = desc.match(/(触发场景|适用场景)[：:]\s*([\s\S]*)/);
  return m ? m[2].trim().slice(0, 200) : '';
}
export { cleanEnvForSpawn, send, sendError, readBody, safeName, parseFrontmatter, extractTriggers };
