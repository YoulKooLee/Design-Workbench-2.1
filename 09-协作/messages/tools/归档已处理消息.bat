@echo off
chcp 65001 >nul
title 归档已处理消息
set "NODE=C:\Program Files\nodejs\node.exe"
set "TOOLS=C:\Users\游翔\Documents\AI work\产品设计工作台\09-协作\messages\tools"

echo ============================================
echo   归档已处理消息（防上下文/存储过载）
echo   - 默认：归档 7 天前已处理终态（replied/done/aborted）
echo   - 历史移入 messages\archive\，面板仍可追溯，不丢
echo ============================================
echo.

echo [预览] 以下消息满足归档条件（7 天）：
"%NODE%" "%TOOLS%\archive-tool.mjs"
echo.
set /p go=是否立即执行归档？(Y=执行 / 其他=仅预览):
if /i "%go%"=="Y" (
    echo.
    echo [执行] 归档中...
    "%NODE%" "%TOOLS%\archive-tool.mjs" --run
    echo.
    echo 归档完成。
) else (
    echo 已取消执行（仅预览）。
    echo 提示：如需归档更早历史，可用 archive-tool.mjs --force。
)
echo.
pause
