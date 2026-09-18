# 工作台脚本跨机器可移植性诊断（clone 后另一台电脑用不了）

> 提交：DeepSeek
> 接收/修改：豆包
> 现象：工作台上传 GitHub，另一台电脑下载后基本用不了；启动工作台 / 停止工作台 / 启动开发栈经常出问题。

## 三主因

### 主因1（最高）核心引擎 @axhub/make 未入库
- .gitignore 排除 `node_modules/` 和 `**/node_modules/`
- @axhub/make 引擎只在 `01-项目\结构监测\node_modules\@axhub\make`（未入库，git ls-files 为空）
- 模板 `_project-template\node_modules\@axhub\make` = 不存在
- launch-project.ps1 查找链最后回退 `npx @axhub/make@latest` 现场下载（需联网，慢/断网则失败）
- 后果：面板能起（server.mjs 纯 Node 内置零依赖），但启动项目/开发栈靠联网现下引擎

### 主因2 启动/停止 .cmd 是 GBK 编码 + 无 .gitattributes
- 实测：启动工作台.cmd GBK(435 替换符)、停止工作台.cmd GBK(231 替换符)，均无 BOM
- .ps1/.mjs 已是 UTF-8 BOM/UTF-8，唯独 .cmd 是 GBK
- GBK 只在中文 Windows(OEM CP 936) 正常，其他语言 Windows 中文全乱码
- 无 .gitattributes，Git clone 可能做 CRLF/LF 转换破坏 GBK 字节
- 矛盾：豆包「脚本编码规范 v1」消息写"所有 .cmd/.bat/.ps1 一律 UTF-8 BOM"，但实际 编码体检.ps1 已 v3，策略=.cmd 用 GBK、.ps1 用 UTF-8 BOM。文档与实际不符。

### 主因3 依赖未预装 + 首次 install 需联网
- Node≥18 必需；启动脚本先找 WorkBuddy node 再回退 where node
- pnpm 是 admin/Vue 项目必需，launch-project.ps1 首次 `npx pnpm@10 install`（联网数分钟）
- README 部署步骤只写 clone→node -v→双击，没写引擎联网下、pnpm install、编码坑

## 修复要求（按优先级）

1. 新增 `06-运行脚本/bootstrap.ps1`：clone 后跑一次就绪——预装 @axhub/make 到本地、检查 Node/pnpm 版本；README 部署第一步改成 clone→bootstrap.ps1→双击启动。
2. 加 `.gitattributes`（`*.cmd text eol=crlf`、`*.ps1 text eol=crlf` 等）锁换行；.cmd 编码统一（要么纯 ASCII 去中文，要么 GBK 但 README 声明仅中文 Windows）；更新编码体检策略文档，消除 v1/v3 矛盾。
3. README 部署清单补全：首次需联网 + Node≥18 + pnpm + @axhub/make 联网下；env-doctor.ps1 增强检查 @axhub/make 可解析性 + pnpm 在位。

## 验收标准
- 新机器 clone 后：bootstrap.ps1 跑一遍 + 启动工作台 + 启动一个项目，全程不需手动 npx 联网下引擎。
