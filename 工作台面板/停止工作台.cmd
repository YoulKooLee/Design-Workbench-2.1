@echo off
rem Pure-ASCII stopper (Plan A): all logic lives in stopper.ps1 (UTF-8 BOM)
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0stopper.ps1"
