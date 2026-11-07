# 02 · 组件体系：design-systems 设计系统包

> 数据：`design-systems\` 实测（2026-10-23）。152 个设计系统包，统一 schema `od-design-system-project/v1`。

## 一、152 个设计系统包清单

按类别分布（manifest.json 的 `category`）：Modern & Minimal（default/minimal/clean/simple/mono/sleek…）、Themed & Unique（agentic/neon/glassmorphism/claymorphism/neumorphism/neobrutalism…）、品牌仿生（apple/airbnb/figma/slack/spotify/stripe/vercel/linear-app/shadcn/notion/framer/raycast/supabase…）、企业/专业（ant/ibm/cisco/webex/enterprise/corporate…）、金融（binance/kraken/revolut/coinbase/trading-terminal…）、汽车/奢侈（bmw/ferrari/lamborghini/tesla/luxury/premium…）、编辑/内容（editorial/publication/warm-editorial/storytelling/theverge…）、平台/工具（github/mongodb/clickhouse/posthog/sentry/warp/mintlify…）。

**与工作台 03-组件库 相关度最高的 12 个**：shadcn、default、vercel、linear-app、framer、figma、ant、material、notion、raycast、supabase、clean。

## 二、包内文件（统一 schema 解析）

```
design-systems/<slug>/
├── manifest.json                ← 元数据 + 文件清单（1KB）
├── DESIGN.md                    ← 设计规范散文：视觉意图/颜色/字体/间距/组件/反模式（3–25KB）
├── tokens.css                   ← 编译好的 :root CSS 变量（2–16KB，粘贴即用）
├── design-tokens.json           ← 结构化令牌（20KB，schema tokens.schema.ts）
├── tailwind-v4.css              ← Tailwind v4 派生缓存（2KB）
├── components.html              ← 可执行组件 fixture（12–34KB，参考组件）
├── components.manifest.json     ← 组件清单：fixture 统计 + tokens.declared 列表（8–10KB）
├── USAGE.md                     ← 使用说明：读序 + Do/Avoid（1–2KB）
├── preview/                     ← colors.html / typography.html / spacing.html 预览页
├── source/                      ← 审计证据：evidence.md / tokens.source.json / token-contract.report.json
└── system/                      ← kit.html / kit.dark.html / index.html + artifacts/（deck/email/form/landing/newsletter/poster 制品样例）
```

**manifest.json 关键字段**：

| 字段 | 含义 |
|---|---|
| `files.design / tokens / designTokens / tailwind / components` | 包内五件套 |
| `componentsManifest` | 组件清单路径 |
| `importMode` | `normalized`（归一化导入） |
| `craft.applies / suggested` | 已应用 / 建议注入的 craft 规则（多为 color + accessibility-baseline） |
| `preview.pages` | colors / typography / spacing 预览 |

**tokens.css 令牌规约**（跨品牌统一命名，保证可切换）：

`--accent / --accent-hover / --accent-active / --accent-on`（强调色三态 + 上字色）、`--bg / --fg / --fg-2 / --muted / --meta / --border / --border-soft / --surface-warm`、`--danger / --focus-ring`、`--radius-sm/md/lg/pill`、`--space-1..12`、`--font-body/display/mono`、`--leading-body/tight`、`--motion-base/fast`、`--ease-standard`、`--elev-flat/raised/ring`、`--container-max`、`--section-y-*`、`--container-gutter-*`。

> 品牌个性弯曲规约的实例（见 shadcn tokens.css 注释）：`--accent`=纯黑 #000000、hover **向白混**（黑不能更黑，对应 shadcn `hover:bg-primary/90`）；`--fg`=slate-900 非纯黑；`--focus-ring`=2px 背景色偏移 + 2px 强调色环（ring-2 ring-offset-2 的 box-shadow 表达，暗色/玻璃面/滚动容器内不裁剪）。

**components.html 组件 fixture**：agentic 包实测 1 styleBlock / 48 selectors / 26 classes / 19 elements；shadcn 包 28KB。用途：agent 需要精确选择器/状态时打开；组件清单先看 components.manifest.json。

## 三、注入与消费机制（prototype 任务中）

1. 模板声明 `od.design_system.requires: true`（sections: color/typography/layout/components）→ 项目激活一个设计系统。
2. 激活时注入：DESIGN.md（散文）+ tokens.css（变量）；**每轮保持绑定**——后续轮次禁改回裸 hex、禁换调色板。
3. 消费顺序（USAGE.md 定义）：**读 USAGE → 读 DESIGN → 把 tokens.css 的 :root 整块粘贴进首个 `<style>` → 按 components.manifest 复用组件 → 需要精确选择器时打开 components.html → 视觉检查看 preview/**。
4. 铁律：禁裸 hex 值（只能在 :root 令牌块内）；禁绕过 tokens.css 另定义 Tailwind/设计令牌；禁新增 components.html 或 DESIGN.md 未代表的组件配方。

## 四、设备外壳（assets/frames，prototype 呈现资产）

6 个画布外壳，可包任意原型内容（对应上层 prototype 任务档案的"设备外壳契约"）：

| 文件 | 尺寸定位 |
|---|---|
| `iphone-15-pro.html` | iPhone 15 Pro（Dynamic Island + 状态栏） |
| `android-pixel.html` | Pixel 风格 Android |
| `browser-chrome.html` | 桌面浏览器 chrome |
| `ipad-pro.html` | iPad Pro |
| `macbook.html` | MacBook |
| `README.md` | 使用说明 |

## 五、组件类技能（skills\，与原型组件相关）

`shadcn-ui`（shadcn 组件实现）、`apple-hig`（Apple HIG 组件规范）、`figma-code-connect-components`、`theme-factory`（主题生成）、`taste-skill`（风格品味）、`ui-skills`、`ui-ux-pro-max`、`swiftui-design`、`wpds`、`login-flow`、`brandkit`、`frontend-design`、`design-brief`、`design-consultation`、`design-review`、`reference-design-contract`。

## 六、工作台映射建议（03-组件库\03-页面组件 主题包结构）

| open-design 包文件 | 工作台对应 |
|---|---|
| DESIGN.md | 主题设计规范（母版说明） |
| tokens.css（:root 变量） | 主题变量（--accent/--bg/--fg/--radius/--space 规约可直接借用统一命名） |
| components.html + components.manifest.json | 组件 fixture + 组件清单（index.html 形态） |
| USAGE.md（读序 + Do/Avoid） | 组件使用说明 |
| preview/ | 组件预览页 |
| system/kit.html | 组件总览页 |
| craft.suggested | 组件模板 frontmatter 的依赖规则声明 |

**落地建议**：首批只做 3 个主题包（shadcn / default / clean）转译为工作台主题（tokens.css 变量名规约 → 工作台主题变量），组件 fixture 转译按需分批；不做 152 包全量（品牌仿生类如 ferrari/bmw 与工作台业务无关，纯参考）。
