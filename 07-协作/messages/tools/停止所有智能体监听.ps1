# 停止所有智能体监听（AgentHub）
$ErrorActionPreference = "SilentlyContinue"
Write-Host "[AgentHub] 正在停止所有智能体监听..." -ForegroundColor Yellow
$procs = Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' }
if ($procs) {
    foreach ($p in $procs) {
        Stop-Process -Id $p.ProcessId -Force
        Write-Host "  已停止 PID $($p.ProcessId)" -ForegroundColor Green
    }
} else {
    Write-Host "  没有运行中的监听进程" -ForegroundColor Cyan
}
$left = Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' }
if ($left) { Write-Host "仍有进程未停止，请稍后重试" -ForegroundColor Red } else { Write-Host "所有监听进程已停止 ✓" -ForegroundColor Green }
Read-Host "按回车关闭本窗口"
