# ============================================================
#  run.ps1 - 09-协作 脚本统一入口（方案A：.bat 纯ASCII引导，本脚本承载全部逻辑）
#  编码：UTF-8 BOM（PowerShell 5.1 必需）
#  用法：powershell -File "%~dp0run.ps1" -Task <panel|panel-stop|agents|agents-stop|archive|health>
# ============================================================
param(
    [Parameter(Mandatory = $true)][ValidateSet('panel', 'panel-stop', 'agents', 'agents-stop', 'archive', 'health')]
    [string]$Task
)
$ErrorActionPreference = 'Continue'
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$tools = $PSScriptRoot                        # 本脚本位于 messages\tools
$share = Split-Path -Parent $tools            # messages
$workbench = Split-Path -Parent $share        # 09-协作
$node = (Get-Command node -ErrorAction SilentlyContinue).Source
if (-not $node) {
    # 回退 WorkBuddy node
    $wb = Get-ChildItem (Join-Path $env:USERPROFILE '.workbuddy\binaries\node\versions') -Directory -ErrorAction SilentlyContinue |
        Where-Object { Test-Path (Join-Path $_.FullName 'node.exe') } | Sort-Object Name -Descending | Select-Object -First 1
    if ($wb) { $node = Join-Path $wb.FullName 'node.exe' }
}
if (-not $node) {
    Write-Host '[ERROR] 未找到 Node.js' -ForegroundColor Red
    exit 1
}

function Start-Hidden([string]$Script, [string]$WorkDir) {
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $node
    $psi.Arguments = '"' + $Script + '"'
    $psi.WorkingDirectory = $WorkDir
    $psi.UseShellExecute = $false
    $psi.CreateNoWindow = $true
    $p = [System.Diagnostics.Process]::Start($psi)
    return $p
}

switch ($Task) {
    'panel' {
        $port = 8899
        if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
            Write-Host "端口 $port 已被占用，面板可能已在运行" -ForegroundColor Yellow
            Write-Host "请在浏览器打开: http://127.0.0.1:$port/" -ForegroundColor Cyan
        } else {
            Write-Host "正在启动通信面板服务（端口 $port）..." -ForegroundColor Cyan
            Write-Host '面板窗口会自动隐藏，服务在后台运行' -ForegroundColor DarkGray
            $p = Start-Hidden (Join-Path $tools 'msg-panel-server.mjs') $tools
            Start-Sleep -Seconds 2
            if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
                Write-Host "[OK] 面板已启动 (PID $($p.Id))" -ForegroundColor Green
            } else {
                Write-Host '[ERROR] 面板启动失败' -ForegroundColor Red
            }
        }
        Start-Process "http://127.0.0.1:$port/"
        Write-Host "已打开: http://127.0.0.1:$port/" -ForegroundColor Green
    }
    'panel-stop' {
        $conn = Get-NetTCPConnection -LocalPort 8899 -State Listen -ErrorAction SilentlyContinue
        if (-not $conn) { Write-Host '[--] 通信面板未在运行（端口 8899）' }
        else {
            $conn.OwningProcess | Sort-Object -Unique | ForEach-Object {
                Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
                Write-Host "[OK] 通信面板已停止（端口 8899）PID $_" -ForegroundColor Green
            }
        }
    }
    'agents' {
        Write-Host '============================================'
        Write-Host '   [AgentHub] 一键启动所有智能体监听'
        Write-Host '============================================'
        Write-Host ''
        $hub = Join-Path $tools 'agent-hub-watcher.mjs'
        $inbox = Join-Path $tools 'inbox-watcher.mjs'
        if (Test-Path $hub) {
            $p1 = Start-Hidden $hub $tools
            Write-Host "[OK] hub 通知监听已启动（agent-hub-watcher.mjs，隐藏窗口）PID $($p1.Id)" -ForegroundColor Green
        } else { Write-Host '[WARN] agent-hub-watcher.mjs 不存在' -ForegroundColor Yellow }
        if (Test-Path $inbox) {
            $p2 = Start-Hidden $inbox $tools
            Write-Host "[OK] DeepSeek 自动处理已启动（inbox-watcher.mjs，隐藏窗口）PID $($p2.Id)" -ForegroundColor Green
        } else { Write-Host '[WARN] inbox-watcher.mjs 不存在' -ForegroundColor Yellow }
        Write-Host ''
        Write-Host "  日志：$tools\agent-hub-watcher.log" -ForegroundColor DarkGray
        Write-Host '  停止：运行「停止所有智能体监听.bat」' -ForegroundColor DarkGray
    }
    'agents-stop' {
        Write-Host '[AgentHub] 正在停止所有智能体监听...' -ForegroundColor Cyan
        $stopped = $false
        Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue |
            Where-Object { $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' } |
            ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue; Write-Host "已停止 PID $($_.ProcessId)" -ForegroundColor Green; $stopped = $true }
        if (-not $stopped) { Write-Host '[--] 未发现运行中的监听进程' }
        $remain = Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue |
            Where-Object { $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' }
        if ($remain) { Write-Host '仍有进程在运行，请稍后重试' -ForegroundColor Red } else { Write-Host '[OK] 所有监听进程已停止' -ForegroundColor Green }
    }
    'archive' {
        $archiveTool = Join-Path $tools 'archive-tool.mjs'
        if (-not (Test-Path $archiveTool)) { Write-Host '[ERROR] archive-tool.mjs 不存在' -ForegroundColor Red; exit 1 }
        Write-Host '============================================'
        Write-Host '   归档已处理消息（防上下文/存储过载）'
        Write-Host '   - 默认：归档 7 天前已处理终态（replied/done/aborted）'
        Write-Host '   - 历史移入 messages\archive\，面板仍可追溯，不丢'
        Write-Host '============================================'
        Write-Host ''
        Write-Host '[预览] 以下消息满足归档条件（7 天）：' -ForegroundColor Cyan
        & $node $archiveTool
        Write-Host ''
        $go = Read-Host '是否立即执行归档？(Y=执行 / 其他=仅预览)'
        if ($go -eq 'Y' -or $go -eq 'y') {
            Write-Host ''
            Write-Host '[执行] 归档中...' -ForegroundColor Cyan
            & $node $archiveTool --run
            Write-Host ''
            Write-Host '[OK] 归档完成。' -ForegroundColor Green
        } else {
            Write-Host '已取消执行（仅预览）。'
            Write-Host '提示：如需归档更早历史，可用 archive-tool.mjs --force。' -ForegroundColor DarkGray
        }
    }
    'health' {
        $health = Join-Path $tools '编码体检.ps1'
        if (-not (Test-Path $health)) { Write-Host '[ERROR] 编码体检.ps1 不存在' -ForegroundColor Red; exit 1 }
        Write-Host '============================================'
        Write-Host '   工作台脚本编码体检（方案A规范）'
        Write-Host '============================================'
        Write-Host ''
        & powershell -NoProfile -ExecutionPolicy Bypass -File $health
        Write-Host ''
        Write-Host '检查完成。' -ForegroundColor Green
    }
}
