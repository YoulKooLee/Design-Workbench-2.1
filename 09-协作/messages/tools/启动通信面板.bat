@echo off
rem 启动多智能体通信可视化面板（HTTP 服务，端口 8899）
setlocal
set "DIR=%~dp0"
set "PORT=8899"

rem 检查端口是否已被占用
netstat -ano | findstr ":%PORT%" | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo 端口 %PORT% 已被占用，面板可能已在运行
    echo 请在浏览器打开: http://127.0.0.1:%PORT%/
    goto :open
)

echo 正在启动通信面板服务（端口 %PORT%）...
echo 面板窗口会自动隐藏，服务在后台运行
echo 停止方式：关闭服务脚本，或杀掉占用 %PORT% 的进程

rem 用 vbs 隐藏窗口启动 node，避免 bat 窗口挂着阻塞（node 独立于本窗口）
set "VBS=%TEMP%\msg-panel-launch.vbs"
echo WshShell.Run "cmd /c ""cd /d ""%DIR%"" && node msg-panel-server.mjs %PORT%""", 0, False > "%VBS%"
cscript //nologo "%VBS%"
del "%VBS%" >nul 2>&1

rem 等待服务就绪后打开浏览器
timeout /t 2 /nobreak >nul

:open
start "" "http://127.0.0.1:%PORT%/"
echo 已打开: http://127.0.0.1:%PORT%/
endlocal
