#!/usr/bin/env node
/**
 * build-previews.mjs —— Codebuddy Design 组件预览产物生成器
 * ------------------------------------------------------------------
 * 用途：把组件源码打成**自包含单文件 HTML**（Tailwind 编译后的 CSS + esbuild 产物全内联），
 *       落盘 `preview/<分类>/<组件>.html`，供 `gallery.html` 弹窗预览与
 *       工作台面板「组件库」页签缩略图（custom-components.json 的 previewUrl）使用。
 *
 * 用法（在 Codebuddy Design 目录下）：
 *   node _meta/build-previews.mjs                 # 构建「preview 下缺产物」的组件
 *   node _meta/build-previews.mjs OkrObjectiveCard InvoiceSheet   # 只构建指定组件（按文件名）
 *   node _meta/build-previews.mjs --all           # 全量重建
 *
 * 约定：
 *  - 依赖来自工程包 `02-模板/_project-template/node_modules`（vite / @tailwindcss/vite /
 *    vite-plugin-singlefile / react / react-dom），本库本身零第三方依赖；
 *  - 构建在 `_meta/.preview-tmp/` 内进行（组件源码整体拷一份进去，保证 Tailwind 能扫到类名），
 *    结束后自动清理；
 *  - 每个组件的演示数据在 DEMOS 里维护（缺 demo 的组件会跳过，不产出空壳）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIB = path.resolve(__dirname, '..');
const REPO = path.resolve(LIB, '..', '..', '..');
const PROJ = path.join(REPO, '02-模板', '_project-template');
const NM = path.join(PROJ, 'node_modules');
const OUT = path.join(LIB, 'preview');
const TMP = path.join(__dirname, '.preview-tmp');

const argv = process.argv.slice(2);
const ALL = argv.includes('--all');
const ONLY = argv.filter((a) => !a.startsWith('--'));

/** 演示数据：key = 组件文件名（不含 .tsx），value = { cat 中文分类, code 演示 JSX（return 之后的部分） } */
const DEMOS = {
  OkrObjectiveCard: {
    cat: '办公',
    code: `
      <div style={{ display: 'grid', gap: 16, maxWidth: 860 }}>
        <OkrObjectiveCard
          index={1}
          title="让企业客户觉得产品已经完备可用。"
          ownerName="李敏"
          status="onTrack"
          keyResults={[
            { id: 1, name: '完成 3 个停滞的大客户签约', note: '权限缺口待补 · 销售：王栋', percent: 67, valueText: '2 / 3' },
            { id: 2, name: '达到安全合规二级就绪', note: '控制项 14 / 16 已落地', percent: 88 },
            { id: 3, name: '上线登录二次验证（动态口令 + 硬件密钥）', note: '里程碑 12 月 2 日 · 王栋', percent: 60 },
          ]}
        />
        <OkrObjectiveCard
          index={3}
          title="让移动端体验达到原生水准。"
          ownerName="周琳"
          status="offTrack"
          keyResults={[
            { id: 1, name: '移动端日活占比 ≥ 35%', note: '当前 22% · 上季度 19%', percent: 22 },
            { id: 2, name: '完成移动端设置页改版', note: '范围已锁定 · 开发中', percent: 18 },
          ]}
        />
      </div>`,
  },
  OkrQuarterSummary: {
    cat: '办公',
    code: `
      <div style={{ maxWidth: 360 }}>
        <OkrQuarterSummary
          stats={[
            { label: '进展顺利的目标', value: '1 / 3', tone: 'good' },
            { label: '达标关键结果', value: '4 / 9' },
            { label: '剩余天数', value: '53 / 78' },
            { label: '风险等级', value: '中等', tone: 'warn' },
          ]}
          movers={[
            { title: '大客户 2 号单 · 已签约', name: '李敏', delta: '+33%' },
            { title: '激活率 · 漏斗 B', name: '王栋', delta: '+9 pp' },
            { title: '移动端注册完成率', name: '周琳', delta: '−2.4%', up: false },
          ]}
          blockers={[
            { title: '移动端目标 3 已偏离。', detail: '两名开发被抽调到登录改造。要么把设置页改版移出本目标，要么在 11 月 4 日前补人，周五前需要拍板。' },
          ]}
        />
      </div>`,
  },
  OnboardingDaySchedule: {
    cat: '办公',
    code: `
      <div style={{ maxWidth: 720 }}>
        <OnboardingDaySchedule
          title="第一天 · 周一"
          desc="节奏放慢的一天：认识团队、领到能用的电脑，下午五点前在文档站提交一次改动。"
          entries={[
            { time: '09:00', title: '与直属主管开工会', desc: '欢迎、本周安排、期望对齐。3 号会议室（或线上）。' },
            { time: '10:00', title: 'IT 入职配置', desc: '电脑、工牌、账号、协作工具。带两张身份证件。' },
            { time: '11:30', title: '与带教同事喝咖啡', desc: '不成文的规矩、遇事找谁、附近好吃的。' },
            { time: '14:00', title: '自由阅读', desc: '员工手册、上季度设计评审录像、组件库。' },
            { time: '16:00', title: '提交入职第一次改动', desc: '把自己加进文档站的团队页，算你的第一次提交。' },
          ]}
        />
      </div>`,
  },
  OnboardingChecklist: {
    cat: '办公',
    code: `
      <div style={{ maxWidth: 560 }}>
        <OnboardingChecklist
          entries={[
            { title: '电脑、账号与工牌全部可用。', desc: '含协作工具、设计工具、代码仓库、密码管理。', done: true },
            { title: '已经认识小组里的每个人。', desc: '咖啡、散步或 15 分钟线上聊聊都算。', done: true },
            { title: '提交了自己的第一次改动。', desc: '再小的改动也算，带教同事会帮忙看。' },
            { title: '日历上的每个会都能找到。', desc: '并且知道哪些可以不去。' },
          ]}
        />
      </div>`,
  },
  MeetingHeader: {
    cat: '办公',
    code: `
      <div style={{ maxWidth: 820 }}>
        <MeetingHeader
          crumb="增长组 / 周会 / 第 42 周"
          title="增长组周会 · W42"
          meta={[
            { label: '日期', value: '2025 年 10 月 14 日 周二' },
            { label: '时间', value: '10:00 - 11:00' },
            { label: '地点', value: '线上会议 · growth-weekly' },
            { label: '记录人', value: '王栋' },
          ]}
          attendees={['王栋', '李敏', '周琳', '陈睿', '孙莉']}
          absent="请假 — 张伟（年假）"
        />
      </div>`,
  },
  MeetingAgendaList: {
    cat: '办公',
    code: `
      <div style={{ maxWidth: 720 }}>
        <MeetingAgendaList
          entries={[
            { title: '迭代中期检查', desc: '按列过一遍看板，卡住的重新排。', done: true, time: '10:00 · 15 分钟' },
            { title: '登录改造 · 里程碑风险', desc: '品牌文案评审是唯一未完成依赖。', done: true, time: '10:15 · 10 分钟' },
            { title: '新用户激活指标回顾', desc: '激活率环比 +9 个百分点，复盘空状态改动。', done: true, time: '10:25 · 10 分钟' },
            { title: '自由议题', desc: '改为线上异步，见小组频道。', time: '10:57 · 3 分钟' },
          ]}
        />
      </div>`,
  },
  MeetingActionTable: {
    cat: '办公',
    code: `
      <div style={{ maxWidth: 880 }}>
        <MeetingActionTable
          entries={[
            { action: '把品牌文案评审升级给主管与品牌负责人', owner: '王栋', due: '10 月 15 日 周三', status: 'doing' },
            { action: '空状态实验放量到 100%（带监控窗口）', owner: '李敏', due: '10 月 16 日 周四', status: 'todo' },
            { action: '先驱客户沟通会材料与销售对齐', owner: '周琳', due: '10 月 16 日 周四', status: 'todo' },
            { action: '审计看板数据权限申请', owner: '陈睿', due: '10 月 21 日 周二', status: 'blocked', statusNote: '等待平台权限开通' },
            { action: '周会改为周五演示', owner: '王栋', due: '10 月 20 日 周一', status: 'done' },
          ]}
        />
      </div>`,
  },
  InvoiceSheet: {
    cat: '付款',
    code: `
      <div style={{ maxWidth: 860 }}>
        <InvoiceSheet
          brand="砚青设计"
          brandDesc="品牌与产品设计 · 成立于 2018 年"
          no="INV-2025-0142"
          issuedOn="2025-10-14"
          dueOn="2025-11-13"
          from={{ name: '砚青设计（上海）有限公司', lines: ['杨浦区昆明路 221 号 4 层', '上海 200082 · 中国', '税号 91310110MA1K12345X', 'billing@yanqing.studio'] }}
          to={{ name: '北风贸易公司', lines: ['收件人：何静 财务负责人', '黄浦区南京东路 500 号 9 层', '上海 200001 · 中国', 'ap@beifeng.com'] }}
          refs={[
            { label: '项目', value: '北风品牌识别升级' },
            { label: '采购单号', value: 'BF-PO-2025-3387' },
            { label: '结算条款', value: '月结 30 天 · 人民币' },
          ]}
          items={[
            { title: '调研与策略', desc: '干系人访谈、竞品审计、品牌审计、策略文档。', qty: 1, rate: 8500 },
            { title: '识别系统设计', desc: '字标、字母组合、色板、字体、动效原则，两轮产出。', qty: 1, rate: 22000 },
            { title: '品牌规范与交付', desc: '品牌手册、设计库、素材包、两场交付讲解。', qty: 1, rate: 6500 },
            { title: '资深设计加时', desc: '9 月 12 日至 9 月 28 日超出原合同范围的追加轮次。', qty: 14, rate: 220 },
          ]}
          totals={[
            { label: '小计', value: 40080 },
            { label: '已抵扣预付款（10%）', value: -4008, tone: 'discount' },
            { label: '税费（9%）', value: 3246.48, tone: 'muted' },
            { label: '应付合计', value: 39318.48, tone: 'grand' },
          ]}
          terms="请在开票后 30 天内付款。按 2025 年 2 月 14 日签署的主服务协议，逾期每月加收 1.5% 服务费。8 月 12 日已付的 10% 预付款已在下方抵扣。"
          payGroups={[
            { title: '银行转账', rows: [
              { label: '开户行', value: '招商银行上海分行' },
              { label: '联行号', value: '308290003013' },
              { label: '账号', value: '9847 2210 3318' },
              { label: '备注', value: 'INV-2025-0142' },
            ] },
            { title: '在线支付', rows: [
              { label: '付款链接', value: 'yanqing.studio/p/inv-0142' },
              { label: '银行卡 / 扫码', value: '支持' },
              { label: '回执', value: '自动发送邮件' },
            ] },
          ]}
          note="感谢北风的信任，这次品牌升级我们做得很过瘾。"
        />
      </div>`,
  },
  EmailNewsletter: {
    cat: 'CMS',
    code: `
      <div>
        <EmailNewsletter
          brand="疾风实验室"
          nav={['选购', '杂志', '会员']}
          eyebrow="新品 · 厚底缓震跑鞋 · 焰橙"
          title={<>认识<br />疾风 Pro，<br />一双真能跑的鞋。</>}
          hero={
            <svg viewBox="0 0 600 280" style={{ width: '78%' }} aria-hidden="true">
              <defs>
                <linearGradient id="upper" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe0c4" />
                  <stop offset="55%" stopColor="#f78c4c" />
                  <stop offset="100%" stopColor="#c8442d" />
                </linearGradient>
              </defs>
              <path d="M60 180 C80 130, 160 90, 230 92 C290 94, 330 110, 380 115 C430 120, 470 125, 500 145 C530 165, 540 195, 520 210 L100 210 C80 210, 55 200, 60 180 Z" fill="url(#upper)" stroke="#7c2615" strokeWidth="2" />
              <path d="M100 210 L100 230 L540 230 L540 220" fill="none" stroke="#7c2615" strokeWidth="3" strokeLinecap="round" />
            </svg>
          }
          body="厚底凝胶缓震，外层是火焰纹理针织鞋面。通勤、跑咖啡、赶地铁都能穿——脚感更软，外观更张扬。首发配色「焰橙」限量。"
          ctaText="选购疾风 Pro"
          specs={[
            { value: '7.4', unit: 'OZ', label: '单只重量（女码 38）' },
            { value: '34', unit: 'MM', label: '后掌最大缓震厚度' },
            { value: '8', unit: 'MM', label: '前后掌落差' },
            { value: '凝胶', label: '后掌与前掌缓震胶' },
          ]}
          address="上海市杨浦区昆明路 118 号"
          footerLinks={['退订', '在浏览器中查看']}
          copyright="© 2026 疾风实验室"
        />
      </div>`,
  },
  MobileOnboardingScreen: {
    cat: '页面模式',
    code: `
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <MobileOnboardingScreen
          actionText="跳过"
          art={
            <svg viewBox="0 0 220 220" style={{ width: 200, height: 200 }} aria-hidden="true">
              <defs>
                <radialGradient id="moon" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#fcebd0" />
                  <stop offset="100%" stopColor="#e8a76e" />
                </radialGradient>
              </defs>
              <circle cx="110" cy="110" r="78" fill="url(#moon)" />
              <circle cx="146" cy="92" r="14" fill="#fff" opacity="0.6" />
              <path d="M30 200 Q110 170 200 200 L200 220 L30 220 Z" fill="#c66e3a" opacity="0.18" />
            </svg>
          }
          title="安静比喧闹有效。"
          desc="每天十二分钟，一段咖啡时间就能完成的练习。没有连续打卡，没有徽章，只要一个更平静的夜晚。"
          step={1}
          totalSteps={3}
          primaryText="继续"
          secondaryText="已有账号？登录"
          footnote="继续即表示同意《服务条款》与《隐私政策》。"
        />
        <MobileOnboardingScreen
          actionText="帮助"
          title="给它留一个位置。"
          desc="练习记录跨设备保存。我们不发营销邮件，也不共享数据。"
          step={3}
          totalSteps={3}
          footnote="继续即表示同意《服务条款》与《隐私政策》。"
        >
          <div style={{ display: 'grid', gap: 10 }}>
            {['使用手机号继续', '使用邮箱继续'].map((t) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', border: '1px solid #e5e6eb', borderRadius: 14, fontSize: 15, fontWeight: 500 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#165dff', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>@</span>
                {t}
              </div>
            ))}
          </div>
        </MobileOnboardingScreen>
      </div>`,
  },
};

const ENTRY = (imports, demo) => `import { createRoot } from 'react-dom/client';
import './theme.css';
${imports}
function Demo() { return (${demo}); }
createRoot(document.getElementById('root')).render(<Demo />);
`;

const HTML = (title) => `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>html,body{margin:0;padding:0}body{padding:24px;background:#fff}</style>
</head>
<body>
<div id="root"></div>
<script type="module" src="./entry.tsx"></script>
</body>
</html>
`;

/**
 * 目录拷贝（自实现）：Node 的 fs.cpSync 在中文路径下会抛 EIO（Windows 已知问题），
 * 故用 readdir + readFile/writeFile 逐个搬，保证含中文的目录名也能复制。
 */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.writeFileSync(d, fs.readFileSync(s));
  }
}

async function main() {
  if (!fs.existsSync(NM)) {
    console.error(`工程包依赖不存在：${NM}\n请先在 02-模板/_project-template 执行 pnpm install`);
    process.exit(1);
  }
  const { default: tailwindcss } = await import(pathToFileURL(path.join(NM, '@tailwindcss', 'vite', 'dist', 'index.mjs')).href);
  const { viteSingleFile } = await import(pathToFileURL(path.join(NM, 'vite-plugin-singlefile', 'dist', 'esm', 'index.js')).href);
  const { build } = await import(pathToFileURL(path.join(NM, 'vite', 'dist', 'node', 'index.js')).href);

  const targets = Object.entries(DEMOS).filter(([name, d]) => {
    if (ONLY.length) return ONLY.includes(name);
    if (ALL) return true;
    return !fs.existsSync(path.join(OUT, d.cat, `${name}.html`));
  });
  if (!targets.length) {
    console.log('没有需要构建的组件（已全部存在；加 --all 强制重建）');
    return;
  }

  fs.rmSync(TMP, { recursive: true, force: true });
  fs.mkdirSync(TMP, { recursive: true });
  // 组件源码整体拷进临时根目录：Tailwind v4 只扫描 root 内文件，必须让它在 root 下
  for (const e of fs.readdirSync(LIB)) {
    if (e === 'preview' || e === '_meta' || e.startsWith('.')) continue;
    const src = path.join(LIB, e);
    if (!fs.statSync(src).isDirectory()) continue;
    copyDir(src, path.join(TMP, e));
  }
  copyDir(path.join(LIB, '_kit'), path.join(TMP, '_kit'));
  // 主题 CSS：保留 @theme token，并显式登记扫描范围
  const theme = fs.readFileSync(path.join(LIB, '_kit', 'theme.css'), 'utf-8');
  fs.writeFileSync(path.join(TMP, 'theme.css'), `${theme}\n@source "./";\n`, 'utf-8');

  const results = [];
  for (const [name, d] of targets) {
    const file = path.join(OUT, d.cat, `${name}.html`);
    try {
      fs.writeFileSync(path.join(TMP, 'entry.tsx'), ENTRY(`import { ${name} } from './${d.cat}/${name}';`, d.code), 'utf-8');
      fs.writeFileSync(path.join(TMP, 'index.html'), HTML(`${d.cat} / ${name}`), 'utf-8');
      await build({
        root: TMP,
        configFile: false,
        mode: 'production',
        logLevel: 'warn',
        base: './',
        plugins: [tailwindcss(), viteSingleFile({ removeViteModuleLoader: true })],
        esbuild: { jsx: 'automatic' },
        resolve: {
          alias: {
            // Tailwind 插件会向虚拟模块注入 `import 'tailwindcss'`，临时根目录没有 node_modules，
            // 必须显式指向工程包依赖，否则报 Can't resolve 'tailwindcss'
            tailwindcss: path.join(NM, 'tailwindcss'),
            react: path.join(NM, 'react'),
            'react-dom': path.join(NM, 'react-dom'),
            'react-dom/client': path.join(NM, 'react-dom', 'client.js'),
            'react/jsx-runtime': path.join(NM, 'react', 'jsx-runtime.js'),
          },
        },
        build: {
          outDir: path.join(TMP, 'out'),
          emptyOutDir: true,
          write: true,
          minify: 'esbuild',
          target: 'es2020',
          rollupOptions: { input: path.join(TMP, 'index.html') },
        },
      });
      const produced = path.join(TMP, 'out', 'index.html');
      if (!fs.existsSync(produced)) throw new Error('未产出 index.html');
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.copyFileSync(produced, file);
      results.push({ name, ok: true, kb: Math.round(fs.statSync(file).size / 1024) });
    } catch (e) {
      results.push({ name, ok: false, msg: String(e.message || e).slice(0, 200) });
    }
  }

  console.log(JSON.stringify(results, null, 1));
  const bad = results.filter((r) => !r.ok);
  console.log(`\n成功 ${results.length - bad.length}/${results.length}`);
  fs.rmSync(TMP, { recursive: true, force: true });
  console.log(fs.existsSync(TMP) ? '临时目录清理失败（可手工删除 _meta/.preview-tmp）' : '临时目录已清理');
  if (bad.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
