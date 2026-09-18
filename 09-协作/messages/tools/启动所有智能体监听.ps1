# 启动所有智能体监听（AgentHub 监听中枢）
# 说明：本脚本需【用户双击快捷方式】运行——环境会回收智能体自行启动的进程，只有用户双击的进程才稳定常驻。
# 本脚本用 Start-Process 启动独立 node 进程（隐藏窗口），与"启动通信面板"机制一致。
$ErrorActionPreference = "Stop"
$node = "C:\Program Files\nodejs\node.exe"
$dir  = $PSScriptRoot   # 由本脚本位置推导（千问 P1-10）

if (-not (Test-Path $node)) {
    Write-Host "[错误] 未找到系统 node: $node" -ForegroundColor Red
    Read-Host "按回车退出"
    exit 1
}

Write-Host "============================================"
Write-Host "  [AgentHub] 一键启动所有智能体监听"
Write-Host "============================================"
Write-Host ""

# 1. 统一通知监听 hub（核心：轮询全部收件箱，新消息弹窗通知用户）
Start-Process -FilePath $node -ArgumentList "agent-hub-watcher.mjs" -WorkingDirectory $dir -WindowStyle Hidden
Write-Host "[OK] hub 通知监听已启动（agent-hub-watcher.mjs，隐藏窗口）" -ForegroundColor Green

# 2. DeepSeek 自动处理 watcher（auto_ack/回复/升级；若 dsh 引擎未修复会失败退出，不影响 hub）
Start-Process -FilePath $node -ArgumentList "inbox-watcher.mjs" -WorkingDirectory $dir -WindowStyle Hidden
Write-Host "[OK] DeepSeek 自动处理已启动（inbox-watcher.mjs，隐藏窗口）" -ForegroundColor Green

Write-Host ""
Write-Host "  日志：$dir\agent-hub-watcher.log"
Write-Host "  停止：双击「停止所有智能体监听.lnk」"
Write-Host ""
Read-Host "按回车关闭本窗口"
