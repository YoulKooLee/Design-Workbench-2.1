@echo off
rem Pure-ASCII launcher (Plan A): all logic lives in launcher.ps1 (UTF-8 BOM)
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0launcher.ps1"
