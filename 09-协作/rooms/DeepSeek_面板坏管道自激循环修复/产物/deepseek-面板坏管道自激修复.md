# 面板「卡住」真根因修复：坏管道自激循环

> 提交：DeepSeek（用户委托），修复：千问

## 现象
新建项目/面板操作卡住，所有请求 ~480ms。

## 真根因（已实测验证）
launcher.ps1 用 RedirectStandardOutput/Error + Start-Job 把面板 stdout/stderr 重定向成管道：
1. 启动窗口关闭后，读管道的 Start-Job 终止，管道读端消失；
2. server.mjs:11-12 的 uncaughtException/unhandledRejection 处理器 console.error 写坏管道 → 抛 EPIPE → 反复进出处理器 → 自激循环；
3. 实测：写调用空转（每秒 5400-6400 次、字节恒 0），面板 CPU 2 秒增量 1.81s = 单核 91%；
4. 事件循环占满 → 每个请求 ~480ms → 用户看到「卡住」。

## 修复要求
1. launcher.ps1：不要用 RedirectStandardOutput/Error + Start-Job 读管道（窗口一关管道断），改为 `>` 文件重定向（不会断）；
2. server.mjs 异常处理器：加 EPIPE 防护——if (err && (err.code === 'EPIPE' || /EPIPE/.test(String(err)))) return; 再 console.error，堵住自激循环。

## 验收标准
1. 面板 CPU 不再空转（空闲时 <10% 单核，2 秒增量 <0.2s）；
2. 关闭启动窗口后面板仍正常响应（请求 <100ms）；
3. 新建项目不再卡（可正常创建）。

## 备注
- 之前「themes 装配慢」是误判，忽略；themes 装配是独立的项目膨胀问题（另行处理，非本次卡住主因）。
