@echo off
rem 停止多智能体通信可视化面板（杀掉监听 8899 的进程）
chcp 65001 >nul
setlocal
set "PORT=8899"

for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":%PORT%" ^| findstr "LISTENING"') do (
    echo 正在停止监听 %PORT% 的进�?PID=%%p
    taskkill /f /pid %%p >nul 2>&1
)

echo 通信面板已停止（端口 %PORT%�?
endlocal
