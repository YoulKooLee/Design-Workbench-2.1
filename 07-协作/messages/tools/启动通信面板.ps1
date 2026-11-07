# 启动多智能体通信可视化面板（HTTP 服务，端口 8899）
# ⚠ 需【用户双击快捷方式】运行：环境会回收智能体自行启动的进程，只有用户双击的进程才稳定常驻。
# 本脚本用 Start-Process 启动独立 node 进程（隐藏窗口），系统 node（v24）。
$ErrorActionPreference = "Stop"
$node = "C:\Program Files\nodejs\node.exe"
$dir  = $PSScriptRoot   # 由本脚本位置推导（千问 P1-10）

if (-not (Test-Path $node)) {
    Write-Host "[错误] 未找到系统 node: $node" -ForegroundColor Red
    Read-Host "按回车退出"
    exit 1
}

# 检查端口是否已被占用
$listening = netstat -ano | findstr ":8899" | findstr "LISTENING"
if ($listening) {
    Write-Host "端口 8899 已被占用，面板可能已在运行，尝试打开浏览器..." -ForegroundColor Yellow
    Start-Process "http://127.0.0.1:8899/"
    Read-Host "按回车关闭本窗口"
    exit 0
}

Write-Host "正在启动通信面板服务（端口 8899）..." -ForegroundColor Cyan
Start-Process -FilePath $node -ArgumentList "msg-panel-server.mjs","8899" -WorkingDirectory $dir -WindowStyle Hidden
Write-Host "[OK] 通信面板已启动：http://127.0.0.1:8899/" -ForegroundColor Green
Write-Host "（node 进程独立运行，关闭本窗口不影响面板）"
Start-Sleep -Seconds 2
Start-Process "http://127.0.0.1:8899/"
Read-Host "按回车关闭本窗口"
