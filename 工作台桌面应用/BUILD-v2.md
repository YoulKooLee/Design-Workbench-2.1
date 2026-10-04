# 重新打包指引（打包输出-v2）

> 依据《桌面应用分发就绪改造任务书（2026-10-04 qwen→doubao）》T4。
> **不实际执行打包**（产物约 366MB，等舒狗拍板后自行执行或另行授权）。

## 前置：导出最新发布源

```bash
node 06-运行脚本/export-pack-source.mjs
```

- 从 **git HEAD** 白名单导出到 `08-文档/打包输出-v2/workbench/`（不含用户数据：01-项目/07-日志 为空目录 + .gitkeep；09-协作/10-智能体记忆/08-文档 全部排除）。
- 脚本末尾自检：导出目录中 `08-文档|09-协作|10-智能体记忆|node_modules|.git` 目录段零命中，否则 exit 1。
- 发布约定：**发版 = git tag → 导出 → 打包**，禁止用手动拷贝/工作区残留快照。

## 步骤

1. 刷新导出（见上）。
2. 编辑 `工作台桌面应用/package.json`，将 `build.extraResources` 指向 v2：

```json
"extraResources": [
  { "from": "../08-文档/打包输出-v2/workbench", "to": "workbench" },
  { "from": "../08-文档/打包输出/tools", "to": "tools" }
]
```

   > tools（portable node-v22.23.2-win-x64，约 94.9MB）沿用 `08-文档/打包输出/tools`（旧产物，勿删勿改；版本与来源记录见 `08-文档/打包输出-v2/workbench/BUILD.md`）。

3. 构建安装包：

```bash
cd 工作台桌面应用
npm run dist
```

   - electron-builder 依据 `build.publish`（github: YoulKooLee/Design-Workbench-2.1）生成 `app-update.yml` 与 `.blockmap`（electron-updater 差量更新所需）。
   - 产物：`工作台桌面应用/dist/产品工作台安装包-3.1.0.exe` 等。

4. 发布更新：将安装包 + `.blockmap` + `latest.yml` 上传到 GitHub Releases（tag 与 package.json 版本对齐），打包版「检查更新」即通过 electron-updater 拉取。

## 分发版更新通道说明

- **打包版**：`app.isPackaged === true` → 主进程启用 electron-updater；`update:check` / `download-update`（进度转发）/ `install-update` 三个 IPC 闭环；无网络或无 publish 配置时返回明确错误对象，不崩溃。
- **开发版**：保留面板 `工作台面板/server.mjs` 的 `/api/update/*` git 通道（git fetch 对比 origin/main），不受影响。
- 内置 tools portable node 不受影响（electron-updater 跑在 electron 自带 node 上，无新增运行时依赖）。
