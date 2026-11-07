# msg.ps1 — 多智能体消息 CLI（PowerShell 薄封装，核心逻辑在 msg-cli.mjs）
#
# 用法：
#   .\msg.ps1 check --who codebuddy
#   .\msg.ps1 read --who codebuddy
#   .\msg.ps1 send --from codebuddy --to doubao --type question --subject "标题" --body-file .\body.md
#   .\msg.ps1 reply --from codebuddy --to doubao --reply-to <id> --body-file .\body.md
#   .\msg.ps1 archive --id <message_id>
#
# 说明：
#   - 本文件用 UTF-8 保存。调用时建议先 chcp 65001 再执行，避免中文显示乱码。
#   - 所有中文内容（subject/body）一律放进文件，通过 --subject 参数只传 ASCII 或
#     依赖脚本内部 UTF-8 传递；真正的中文正文放 body-file。

$ErrorActionPreference = 'Stop'

# 脚本所在目录（可能含中文，用 $PSScriptRoot 获取，避免硬编码中文）
$ScriptDir = $PSScriptRoot
$NodeCli = Join-Path $ScriptDir 'msg-cli.mjs'
$NodeCmd = Get-Command node -ErrorAction SilentlyContinue

if (-not $NodeCmd) {
    Write-Host 'ERROR: 未找到 node，请先安装 Node.js' -ForegroundColor Red
    exit 1
}
if (-not (Test-Path $NodeCli)) {
    Write-Host "ERROR: 找不到 $NodeCli" -ForegroundColor Red
    exit 1
}

# 把参数原样传给 node（PowerShell 5.1 对中文参数会以系统 ANSI 编码传递，
# node 读取 argv 时可能乱码；所以主体内容一律走 --body-file，规避此问题）
& node $NodeCli @args
exit $LASTEXITCODE
