# mem-hooks 补丁（可选）

把 `project-memory.md` 接成三个 hook：开局注入当前任务、每轮带一句下一步、压缩前催落盘。
**只对 CodeBuddy 系宿主生效**（WorkBuddy 桌面 / CodeBuddy CLI），其他宿主不读 `.codebuddy/`。

## 文件

| 文件 | 落点 | 作用 |
|---|---|---|
| `mem.cjs` | `<项目>/.codebuddy/mem.cjs` | 三个入口：`start` / `turn` / `compact` |
| `settings.local.json` | `<项目>/.codebuddy/settings.local.json` | hook 注册（PascalCase 事件名） |

## 接入（二选一）

```bash
# A. 打补丁时带开关
node 90-运行脚本/apply-project-patches.mjs <项目目录> --with-mem

# B. 项目里放开关文件后，常规打补丁即可
#    <项目>/.codebuddy/ENABLE-MEM
node 90-运行脚本/apply-project-patches.mjs <项目目录>
```

## 验证

1. 项目里跑 `node .codebuddy/mem.cjs start`，应打印「当前任务 / 最近决策」；
2. 开一次会话，日志里出现 `[HookExecutor] spawn … mem.cjs start`；
3. 会话里应看到 `当前任务：…`。

## 关闭

删掉 `<项目>/.codebuddy/settings.local.json`，或把其中三个事件删空。`mem.cjs` 可留着不影响。

## 约束

- `start` 输出 ≤1,200 字符，`turn` ≤200 字符；超了会截断。
- `project-memory.md` 不存在时静默不动。
- 任何异常都静默退出 0，不会阻断会话。
