# Make 包（@axhub/make 0.6.21）工作机制梳理

> 目的：搞清「改哪里才不会被覆盖」「为什么改了看不到效果」「为什么重启方式一变就不一样」。
> 全部结论都有本机实测证据，见文末附录。

---

## 一、一句话结论

**`node_modules` 里的 `@axhub/make` 是「预构建产物 + 缓存副本」，不是源码。**
它有三重"会自动还原"的机制（pnpm 重装、硬链接共享、外部重新部署），
所以**任何直接改 `node_modules` 的方案，设计上就是一次性的**。

正确的改动落点只有两个层次：

1. **上游源码** → 重新构建发布（最稳，但包里没源码，需先找到构建工程）
2. **构建产物层**：维护一份自己的 `admin/` 产物（瘦身版目录）+ 一个明确锁定"用哪份包启动"的启动方式

---

## 二、包的物理结构：四层

```
① pnpm 全局 store（内容的唯一真身，按内容哈希命名）
   D:\.pnpm-store\v10\files\0b\87e71684db8a... 
   实测：该 store 内共 19,873 个文件

        ↓ 硬链接（同一 inode）

② 项目内虚拟 store（"真身"的另一个路径名）
   D:\产品设计工作台\01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\

        ↓ junction（软链接）

③ 项目 node_modules 里的对外入口
   D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make
   → 实测 LinkType = Junction，Target 指向上面的 ②

④ 多项目注册表（运行数据，不是包）
   C:\Users\Admin\.axhub\make\
     projects.json          10 个项目的 id → root 映射
     server.config.json     ACP/自动化/图片生成等全局设置
     .admin-server-info.json 当前 server 的 pid/端口/启动时间
```

**关键点：`node_modules\@axhub\make` 不是独立副本，是 junction。**
你写 `node_modules\@axhub\make\dist\admin\assets\index.js`，
落盘落的是 ② 那个真实文件。所以"改项目里的包"和"改 .pnpm 里的包"是同一件事，
区别只在于 ② 这个 inode 还被谁硬链接共享着。

---

## 三、两段运行时：server 和 admin 的生效方式完全不同

包里有且只有两块代码：

```
@axhub/make/
  package.json     name=@axhub/make  version=0.6.21  type=module
                   bin: make / axhub-make / make-server → ./bin/cli.mjs
                   files: ["bin","dist","scripts","package.json"]   ← 没有 src
  bin/cli.mjs      232 字节，只做一件事：import { runCli } from "../dist/server/cli.mjs"
  dist/server/cli.mjs   12,038,466 字节 / 706 万字符级，单文件打包（源码是 TS，产物里保留 // src/server/xxx.ts 注释）
  dist/admin/          62 个静态资源文件，含 index.html + assets/index.js + assets/chunks/*
  scripts/             存在，但 package.json 里 scripts 为空
```

| | server 段 | admin 段 |
|---|---|---|
| 文件 | `bin/cli.mjs` → `dist/server/cli.mjs` | `dist/admin/**` |
| 加载方式 | **Node 启动时 import 一次，常驻内存** | HTTP 按请求读盘 |
| 改完要怎样 | **必须重启进程** | 刷新浏览器即可 |
| 影响的对外行为 | `/api/*` 全部接口，含评审报告扫描目录 | 界面、按钮、提示词生成 |

> 这就是为什么「改服务端扫目录必须重启」而「改按钮文案只要刷新」。
> 本次改动里 `getPrototypeReviewsDir()` 属于 server 段，改完不重启等于没改。

---

## 四、谁被服务，取决于「用哪个 bin/cli.mjs 启动」

这一点是整个机制里最容易踩的坑：**admin UI 来自启动 server 的那个包，不来自你正在看的项目。**

本次环境里的两个真实例子：

| | 案例 A（早先） | 案例 B（现在） |
|---|---|---|
| 启动命令 | `node "D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\bin\cli.mjs" --no-open --port 53817 --host 127.0.0.1` | `node_modules/@axhub/make/bin/cli.mjs --no-open --port 53817 --host 127.0.0.1`（**相对路径**） |
| 由谁启动 | 项目自己 | WorkBuddy（codebuddy）的 sandbox bash 链 |
| pid | 1548 | 16388（`/api/health` 确认） |
| 实际服务的包 | 测试项目那份 | **WorkBuddy 工作目录下那份** |
| `/api/version` | — | `{"version":"0.6.21","projectId":"上下文装配测试"}` |

案例 B 里，我在「测试」项目改了半天，浏览器看到的仍是另一份包 —— 因为启动命令用的是**相对路径**，落在 WorkBuddy 自己的工作目录。

---

## 五、多项目模式：projectId 只切「数据目录」，不切「UI 构建」

注册表 `C:\Users\Admin\.axhub\make\projects.json` 里挂了 10 个项目：

```
TEMPLATE_PLACEHOLDER_ID  →  D:\AI work\模板文件
AI漫剧工作台              →  D:\产品设计工作台\01-项目\AI漫剧工作台
测试                      →  D:\产品设计工作台\01-项目\测试
Shadcn 后台管理仪表盘      →  D:\产品设计工作台\01-项目\Shadcn 后台管理仪表盘
上下文装配测试             →  D:\产品设计工作台\01-项目\上下文装配测试
（另有 demo-showcase / 原型设计Agent / 指标管理平台 / 项目管理系统 / shadcn-admin / shadcn）
activeProjectId = "上下文装配测试"
```

一个 server 进程可以服务全部项目：

- `projectId` 决定 **项目数据目录**（`<root>/src/prototypes/*`、`<root>/docs/*`、`<root>/.axhub/make/*`）
- 但 **admin UI 永远来自启动时加载的那一份构建**，所有项目共用

**推论**：想让测试项目用上改动后的 UI，光改测试项目的文件没用；
要么用测试项目的 `bin/cli.mjs` 单独起一个服务，要么把所有项目共用的那份启动包改掉。

---

## 六、硬链接：为什么"改一处会连带多个项目"，又为什么"装一次就还原"

pnpm 默认 `packageImportMethod: auto`，同盘时**硬链接**而不是复制。
实测本项目 `.modules.yaml`：

```
nodeLinker: isolated
packageManager: pnpm@10.20.0
storeDir: D:\.pnpm-store\v10
virtualStoreDir: D:\产品设计工作台\01-项目\测试\node_modules\.pnpm
layoutVersion: 5
```

对 `上下文装配测试` 的 admin bundle 跑 `fsutil hardlink list`，得到 **3 个路径同属一个 inode**：

```
D:\.pnpm-store\v10\files\0b\87e71684db8a...      ← 全局 store（真身）
D:\...\01-项目\上下文装配测试\node_modules\.pnpm\...\assets\index.js
D:\...\99-回收站\.deleted-2026-11-07...\装配戳验证-临时\node_modules\.pnpm\...\assets\index.js
```

三条重要性质：

1. **原地写（`open(path,'w')` 截断再写）保留 inode** → 所有硬链接同时变成新内容。
   这就是为什么我改「测试」时，「Shadcn」也一起变了（当时 links=5）。
2. **拷贝覆盖（`cp` / `Copy-Item`）产生新 inode，打断链接** → 只有那一份变。
   实测「测试」的 admin bundle 现在 `links=1`，而内容与「上下文装配测试」完全相同 —— 说明它是被**拷贝**过去的，链接已断。
3. **`pnpm install` / `--force` / 删了重装** → 从 store 重新硬链接，**内容回到 store 里的原始版本**。
   这就是你说的"在下载好的文件上直接改，重装就覆盖"。严格说不是重新下载，而是**从本地 store 重新链接**。

---

## 七、浏览器缓存：`index.html` 的 `?v=` 是固定键

`dist/admin/index.html` 里写死了：

```html
<script type="module" crossorigin src="/assets/index.js?v=1787247226425"></script>
```

- `?v=1787247226425` 是**构建时**生成的，约等于 `2026-08-21 01:33:46`
- 我改 `assets/index.js` 时**不会**改这个键
- 于是浏览器可能一直用旧缓存，UI 看起来"没变化"

**所以每次改完 admin 侧，必须硬刷新（Ctrl+Shift+R）**，普通刷新可能不够。
（想让缓存键跟着变，就得重新构建 admin 产物，这也是"应该走构建"的理由之一。）

---

## 八、改动会消失的三种场景（本次全部实测到了）

| # | 还原源 | 机制 | 本次证据 |
|---|---|---|---|
| 1 | `pnpm install` / 重装 | 从 store 重新硬链接 | 未触发，但机制确定 |
| 2 | **外部重新部署覆盖** | 用 `cp` 把别的项目的 .pnpm 文件覆盖过来，或重新分发构建产物 | 测试项目 admin 我在 23:53:40 写入 707,223 字符；之后又变回 706,404 字符，且**mtime 是 22:52:08**（比写入时间更早）→ 典型的"带时间戳拷贝覆盖" |
| 3 | **启动到另一个副本** | 用相对路径启动，加载了别的目录的包 | 53817 现在由 WorkBuddy sandbox 拉起，`/api/version` = 上下文装配测试，下发的 706,404 字符版本 `/.spec/reviews/` 出现 4 次、`/docs/reviews/` 0 次 |

第 2、3 条加起来，能完整解释"我改的东西看不到、还莫名变回去了"。

---

## 九、哪些东西重装**不会**丢

这些是**项目数据**，不在包里，`pnpm install` 不影响：

```
<项目根>\src\prototypes\<原型>\            ← 原型代码
<项目根>\src\prototypes\<原型>\.spec\      ← acp 会话、reviews（旧路径）
<项目根>\src\prototypes\<原型>\docs\       ← docs/reviews（新路径）
<项目根>\docs\                            ← 规则/模板/HLD/LLD
<项目根>\rules\  <项目根>\templates\       ← 旧的规则/模板位置
<项目根>\.axhub\make\                     ← sessions / comments / entries / project.json 等运行数据
```

本次实测测试项目 `.axhub\make\` 下有：`comments/ sessions/ .dev-server-info.json .launch-status.json axhub.config.json client.json entries.json project.json sidebar-tree.json`

**结论：凡是"AI 要读的文件"都该放这里，不该塞进包里。**

---

## 十、现有补丁工具链的结构与弱点

### 已有的东西

| 位置 | 作用 | 机制 |
|---|---|---|
| `03-组件库\04-Make客户端瘦身版\admin\` | 一份自定义的 admin 产物（删功能版） | 全套 `assets/` + `index.html` |
| `03-组件库\04-Make客户端瘦身版\README.md` | 说明删减了哪些功能 | 说明"复制 admin/ 覆盖即可" |
| `06-运行脚本\make功能删减\make-slim-restore.py` | 一键把瘦身版覆盖到项目 | 整体 `copytree` 覆盖，覆盖前把原 `index.js` 存成 `.bak`（只在 `.bak` 不存在时存） |
| `06-运行脚本\make功能删减\make-slim-all.py` | 直接对 minified `index.js` 做字符串替换 | 4 段 `js.replace()`，命中则改、不命中跳过 |
| `dist\admin\.patch-backup\manifest.json` | 唯一的"原版"依据 | 记录 3 个文件的 `md5` / `bytes` / `backedUpAt`（2026-11-07T17:32:51，741,817 字节） |

### 弱点

1. **改的是构建产物，不是源码**：每次重装/重新部署都要重跑脚本，且脚本里的字符串锚点一旦上游改版就失配。
2. **`make-slim-all.py` 没有事务性**：逐段替换，中途失配只打印 `⚠`，不中止、不回滚。
3. **备份不统一**：`.patch-backup`（1 代，3 文件）+ 各项目 `.bak`/`.bak-review`/`.bak-*` 混在一起。
   本次我自己就产生了 4 代 12 份备份，`index.js.bak-*` 已经在 4 个目录里各留一份。
4. **不控制"用哪份包启动"**：`make-slim-restore.py` 只覆盖 `admin/`，
   `dist/server/cli.mjs` 完全不管 —— 所以服务端行为（评审报告扫描目录）永远恢复不了。
5. **admin 与 server 会错配**：本次就出现过"客户端写 `docs/reviews`、服务端读 `.spec/reviews`"，
   因为两份代码来自不同批次。

---

## 十一、结论：改动应该落在哪

按"抗还原能力"排序：

### ✅ 推荐：源码 → 重新构建 → 分发产物

包本身不含源码（`files` 只有 `bin/dist/scripts/package.json`，`package.json` 里没有 `repository`），
但产物里保留了 `// src/server/managementApi.reviewReports.ts` 这类路径注释，说明有对应的 TS 工程。
**能找到构建工程，就应该改在那里，然后重新 build 出 `dist/admin` + `dist/server`。**
这是唯一"装多少次都不会丢"的方案。

### ⚠️ 次选：产物层 + 统一分发脚本

如果短期拿不到源码，就把改动固化成：

```
03-组件库\04-Make客户端瘦身版\
   admin\                 ← 完整的 dist/admin 产物（不只是 index.js）
   server\cli.mjs         ← 补上服务端补丁后的 dist/server/cli.mjs
   manifest.json          ← 记录原版 md5/bytes + 本次改动的锚点
```

分发脚本要同时覆盖 **admin 和 server 两段**，并且：
- 幂等（已经是目标状态就跳过）
- 每步前备份、失败可回滚
- 末尾自检（锚点存在性 + 语法 `node --check`）
- **明确写出"必须硬刷新"和"server 补丁必须重启"**

### ❌ 不可取：直接改 `node_modules`

就是前面三轮踩的坑。会被 store 重装、被外部覆盖、被启动到别的副本三重抹掉。

### 🔧 另外必须固定一件事：启动方式

**admin UI 来自"用哪个 `bin/cli.mjs` 启动"，不是"你在哪个项目改"。**
所以要明确约定：

- 测试期间：用**绝对路径**启动测试项目的包
  ```powershell
  node "D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\bin\cli.mjs" --no-open --port 53818 --host 127.0.0.1
  ```
  独立端口，避免与 WorkBuddy 的多项目 server（53817）抢同一个端口、也避免被它的包顶替。
- 正式分发：改「模板项目」`D:\AI work\模板文件` 里那份，再让各项目通过 `make-slim-restore` 拉取。

---

## 十二、附录：本机实测数据

### 包的元信息
```
name          @axhub/make
version       0.6.21
type          module
bin           make / axhub-make / make-server → ./bin/cli.mjs
files         ["bin","dist","scripts","package.json"]
package.json 顶层键：name version description type bin files engines publishConfig
              （无 repository / homepage / scripts.npm）
纯代码片段     bin/cli.mjs 232 字节
              dist/server/cli.mjs 12,038,466 字节（≈12 MB 单文件）
              dist/admin/ 62 个资源文件
```

### 链接关系实测
```
node_modules\@axhub\make               Junction → node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make
admin\assets\index.js（上下文装配测试） links=3
   ├─ D:\.pnpm-store\v10\files\0b\87e71684db8a...
   ├─ 01-项目\上下文装配测试\node_modules\.pnpm\...\assets\index.js
   └─ 99-回收站\.deleted-2026-11-07T15-17-09-425Z\装配戳验证-临时\node_modules\.pnpm\...\assets\index.js
admin\assets\index.js（测试）           links=1  ← 链接已断，是被拷贝覆盖的
server\cli.mjs（测试）                  links=5  ← 与 Shadcn 及 3 个回收站副本共享
```

### 版本混乱现状（2026-11-08 深夜）
| 位置 | admin 字符数 | 特征 |
|---|---|---|
| 测试（served 源） | 706,404 | `/.spec/reviews/`×4，`/docs/reviews/`×0，无失败提示 |
| 上下文装配测试 | 706,404 | 同上（同内容） |
| AI漫剧工作台 | 707,223 | 我打过补丁的版本 |
| 瘦身版 | 707,223 | 我打过补丁的版本 |

### 缓存键
```
dist/admin/index.html → src="/assets/index.js?v=1787247226425"
                        构建时间约 2026-08-21 01:33:46
```

### 当前运行实例
```
pid 16388  端口 53817
启动：C:\Users\Admin\.workbuddy\binaries\node\...\node.exe node_modules/@axhub/make/bin/cli.mjs --no-open --port 53817 --host 127.0.0.1
父链：sandbox-cli.exe → bash.exe ×3（WorkBuddy）
/api/health   projectRoot = C:\Users\Admin\.axhub\make
/api/version  {"version":"0.6.21","projectId":"上下文装配测试"}
projects.json activeProjectId = 上下文装配测试
下发 index.js 745,098 B / 706,404 字符  sha256=08107059d93d
```
