@echo off
chcp 65001 >nul
title AgentHub 停止
echo [AgentHub] 正在停止所有智能体监听...
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force; Write-Output ('已停止 PID ' + $_.ProcessId) }"
powershell -NoProfile -Command "if (-not (Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' })) { Write-Output '所有监听进程已停止' } else { Write-Output '仍有进程在运行，请稍后重试' }"
echo.
pause
