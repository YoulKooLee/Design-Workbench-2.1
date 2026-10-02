@echo off
rem Desktop-app launcher: starts the Electron workbench app.
rem All logic (Chinese paths included) lives in desktop-launcher.ps1 (UTF-8 BOM).
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0desktop-launcher.ps1"
