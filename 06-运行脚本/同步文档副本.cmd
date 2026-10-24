@echo off
chcp 65001 >nul
title Sync Document Copies
cd /d "%~dp0"
node sync-all-docs.mjs
echo.
pause >nul
