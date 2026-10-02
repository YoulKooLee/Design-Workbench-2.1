@echo off
rem Desktop-app launcher: starts the Electron workbench app.
rem The Electron main process auto-starts the 7788 panel (server.mjs) if not running.
cd /d "%~dp0工作台桌面应用"
if not exist "node_modules\electron\dist\electron.exe" (
  echo [workbench-desktop] First run: installing dependencies...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$env:ELECTRON_MIRROR='https://npmmirror.com/mirrors/electron/'; npm install"
)
start "" "node_modules\electron\dist\electron.exe" .
