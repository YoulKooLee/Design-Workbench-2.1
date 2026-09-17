@echo off
chcp 65001 >nul
title 工作台脚本编码体检
echo ============================================
echo   工作台脚本编码体检（UTF-8 BOM 规范）
echo ============================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0编码体检.ps1"
echo.
echo 检查完成。若上方出现 [修复] 条目，说明有脚本编码不合规已自动修复。
echo 按任意键关闭本窗口...
pause >nul
