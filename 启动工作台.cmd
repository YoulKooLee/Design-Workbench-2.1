@echo off
setlocal enabledelayedexpansion
title 产品设计工作台 启动器
cd /d "%~dp0"

echo ============================================
echo   产品设计工作台 - 启动脚本
echo ============================================
echo.

REM 1) 优先使用 WorkBuddy 自带的 node（任意版本均可）
set "NODE="
for /d %%d in ("%USERPROFILE%\.workbuddy\binaries\node\versions\*") do (
  if exist "%%d\node.exe" set "NODE=%%d\node.exe"
)
REM 2) 回退到系统 PATH 中已安装的 node
if not defined NODE (
  where node >nul 2>nul && set "NODE=node"
)
if not defined NODE (
  echo [ERROR] 未找到 Node.js。请先安装 WorkBuddy，或到 https://nodejs.org 安装 Node 后重试。
  echo 按任意键关闭本窗口...
  pause
  exit /b 1
)

echo [OK] 使用 Node: %NODE%

REM 0) 编码自愈：所有脚本统一 UTF-8 BOM（本机代码页 65001，防 GBK 乱码）
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp009-协作\messages\tools\编码体检.ps1" -silent >nul 2>&1
REM 1b) 校验 Node 架构（arm64 仅提示不阻断）
set "ARCHF=%TEMP%\axhub-node-arch.txt"
"%NODE%" -p "process.arch" > "%ARCHF%" 2>nul
set "NODE_ARCH="
if exist "%ARCHF%" (
  set /p NODE_ARCH=<"%ARCHF%"
  del "%ARCHF%" >nul 2>&1
)
if /i "%NODE_ARCH%"=="arm64" (
  echo [WARN] Node 架构为 arm64：建议安装 x64 版 Node（不阻断）
) else if "%NODE_ARCH%"=="" (
  echo [WARN] 无法检测 Node 架构（忽略）
)

REM 3) 若已在运行，仅打开浏览器（不重复启动）
netstat -ano 2>nul | findstr ":7788 " | findstr "LISTEN" >nul
if not errorlevel 1 (
  echo [INFO] 工作台已在 :7788 运行，正在打开浏览器...
  start "" http://localhost:7788
  echo 按任意键关闭本窗口...
  pause
  exit /b 0
)

REM 4) 启动后端服务（在独立最小化窗口运行，输出写入日志便于排查）
cd /d "%~dp0工作台面板"
if not exist "%~dp007-日志" mkdir "%~dp007-日志"
set "LOG=%~dp007-日志\server-console.log"
echo [INFO] 正在启动后端服务（日志: server-console.log）...
start "Axhub Server" /min cmd /c ""%NODE%" server.mjs > "%LOG%" 2>&1"

REM 5) 限时等待端口就绪（最多约 20 秒）
set "READY=0"
for /L %%i in (1,1,20) do (
  netstat -ano 2>nul | findstr ":7788 " | findstr "LISTEN" >nul
  if not errorlevel 1 (
    set "READY=1"
    goto :done
  )
  ping -n 1 127.0.0.1 >nul
)
:done
if "%READY%"=="1" (
  echo [OK] 后端已就绪，正在打开浏览器...
  start "" http://localhost:7788
  echo [OK] 工作台已启动: http://localhost:7788
  echo [提示] 后端服务在名为 "Axhub Server" 的最小化窗口运行；可放心关闭本窗口。
) else (
  echo [ERROR] 后端服务 20 秒内未就绪，请查看日志: %LOG%
  echo [提示] 常见原因: Node 路径异常、端口 7788 被占用、依赖未安装。
)
echo.
echo 按任意键关闭本窗口...
pause
