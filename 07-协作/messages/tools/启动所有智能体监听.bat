@echo off
rem Pure-ASCII wrapper (Plan A): logic in run.ps1 (UTF-8 BOM)
rem NOTE: must be launched by double-click (user action); auto-launched processes are recycled.
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0run.ps1" -Task agents
pause
