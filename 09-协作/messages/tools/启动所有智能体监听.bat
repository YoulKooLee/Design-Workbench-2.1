@echo off
rem 一键启动所有智能体监听（AgentHub 监听中枢）
rem ⚠ 必须【用户双击运行】：环境会回收智能体自行启动的进程，只有用户双击的进程才稳定常驻。
rem 用 VBS（CurrentDirectory 方案）隐藏窗口启动 node，与"启动通信面板.bat"同一机制。
chcp 65001 >nul
title AgentHub 智能体监听中枢
setlocal
set "DIR=%~dp0"
set "NODE=C:\Program Files\nodejs\node.exe"

echo ============================================
echo   [AgentHub] 一键启动所有智能体监听
echo ============================================
echo.
if not exist "%NODE%" (
    echo [错误] 未找到系统 node: %NODE%
    echo 请确认已安装 Node.js 到 C:\Program Files\nodejs
    pause
    exit /b 1
)

rem 1. 统一通知监听 hub（核心：轮询全部收件箱，新消息弹窗通知）
rem 2. DeepSeek 自动处理 watcher（auto_ack/回复/升级；若 dsh 引擎未修复会失败退出，不影响 hub）
set "VBS=%TEMP%\agenthub-launch.vbs"
(
echo Set ws = CreateObject^("WScript.Shell"^)
echo ws.CurrentDirectory = "%DIR%"
echo ws.Run """%NODE%"" agent-hub-watcher.mjs", 0, False
echo ws.Run """%NODE%"" inbox-watcher.mjs", 0, False
) > "%VBS%"
cscript //nologo "%VBS%"
del "%VBS%" >nul 2>&1

echo  [OK] hub 通知监听已启动（agent-hub-watcher.mjs，隐藏窗口）
echo  [OK] DeepSeek 自动处理已启动（inbox-watcher.mjs，隐藏窗口）
echo.
echo  日志：%DIR%agent-hub-watcher.log
echo  停止：运行「停止所有智能体监听.bat」
echo.
pause
endlocal
