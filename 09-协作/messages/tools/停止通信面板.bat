@echo off
rem Pure-ASCII wrapper (Plan A): logic in run.ps1 (UTF-8 BOM)
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0run.ps1" -Task panel-stop
pause
