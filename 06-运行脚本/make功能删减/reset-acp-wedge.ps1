#requires -Version 5
<#
.SYNOPSIS
  重置卡死的 ACP / codebuddy 会话。

.DESCRIPTION
  症状：在 Make 管理端点「AI 执行」，提示词能生成、能发到 AI 侧栏，
        但 AI 永远不回复，评审报告也不生成；再点也毫无反应。

  原因：codebuddy agent 的 run 状态机卡在 agent_running / model_requesting，
        之后所有提示词都被 skipRun 静默丢弃（prompt() 立即 end_turn、零输出）。

  本脚本从 codebuddy 日志里找出持有卡死 run 的 agent 进程，
  默认只报告；加 -Kill 才真正终止。终止后 ACP 服务会在下次请求时重新拉起 agent。

.EXAMPLE
  .\reset-acp-wedge.ps1
  只检查，不动任何进程。

.EXAMPLE
  .\reset-acp-wedge.ps1 -Kill
  检查并终止卡死的 agent 进程。
#>
param(
  [switch]$Kill,
  [string]$ProjectHint = '测试',
  [int]$TailLines = 4000
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Write-Head($text) {
  Write-Output ''
  Write-Output ('=' * 70)
  Write-Output $text
  Write-Output ('=' * 70)
}

# ---------- 1. 找日志 ----------
Write-Head "1. 定位 codebuddy 日志（项目: $ProjectHint）"
$logRoot = Join-Path $env:USERPROFILE '.codebuddy\logs'
if (-not (Test-Path $logRoot)) {
  Write-Output "  [x] 找不到日志目录: $logRoot"
  exit 1
}
$logs = Get-ChildItem $logRoot -Recurse -Filter "*.log" -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "*$ProjectHint*" } |
  Sort-Object LastWriteTime -Descending
if (-not $logs) {
  Write-Output "  [x] 没有匹配 '$ProjectHint' 的日志"
  exit 1
}
$log = $logs[0]
Write-Output ("  日志: {0}" -f $log.FullName)
Write-Output ("  最后写入: {0}" -f $log.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss'))

# ---------- 2. 解析卡死信号 ----------
Write-Head "2. 分析最近 $TailLines 行里的 skipRun / 卡死状态"
$all = Get-Content $log.FullName -Encoding UTF8
$tail = if ($all.Count -gt $TailLines) { $all[($all.Count - $TailLines)..($all.Count - 1)] } else { $all }

$skipRe = 'skipRun.*preserving active run state=(?<state>\S+).*session=(?<sid>[0-9a-f\-]+)'
$pidRe = '\[pid=(?<pid>\d+)\]'

$wedged = @{}
foreach ($line in $tail) {
  if ($line -notmatch 'skipRun') { continue }
  $m = [regex]::Match($line, $skipRe)
  $p = [regex]::Match($line, $pidRe)
  if (-not ($m.Success -and $p.Success)) { continue }
  $key = $p.Groups['pid'].Value
  if (-not $wedged.ContainsKey($key)) {
    $wedged[$key] = [pscustomobject]@{
      Pid       = [int]$key
      State     = $m.Groups['state'].Value
      Session   = $m.Groups['sid'].Value
      SkipCount = 0
      LastSeen  = $null
    }
  }
  $wedged[$key].SkipCount++
  if ($line -match '^\[(?<ts>[0-9/: .]+)\]') { $wedged[$key].LastSeen = $Matches['ts'].Trim() }
}

if ($wedged.Count -eq 0) {
  Write-Output "  [ok] 最近 $TailLines 行里没有 skipRun 迹象，会话看起来是健康的。"
  Write-Output "       （若仍然收不到回复，请看 ACP WebUI http://localhost:32124 的实际报错）"
} else {
  Write-Output ("  [!] 发现 {0} 个进程在吞提示词:" -f $wedged.Count)
  foreach ($w in $wedged.Values) {
    $proc = Get-CimInstance Win32_Process -Filter ("ProcessId=" + $w.Pid) -ErrorAction SilentlyContinue
    $alive = if ($proc) { '存活' } else { '已退出' }
    $cmd = if ($proc) { [string]$proc.CommandLine } else { '' }
    if ($cmd.Length -gt 110) { $cmd = $cmd.Substring(0, 110) + '...' }
    Write-Output ''
    Write-Output ("  pid={0}  状态={1}  已吞 {2} 条  进程{3}" -f $w.Pid, $w.State, $w.SkipCount, $alive)
    Write-Output ("    会话: {0}" -f $w.Session)
    Write-Output ("    最后: {0}" -f $w.LastSeen)
    if ($cmd) { Write-Output ("    命令: {0}" -f $cmd) }
  }
}

# ---------- 3. 可选终止 ----------
Write-Head "3. 处置"
$targets = @()
foreach ($w in $wedged.Values) {
  $proc = Get-CimInstance Win32_Process -Filter ("ProcessId=" + $w.Pid) -ErrorAction SilentlyContinue
  if (-not $proc) { continue }
  $cl = [string]$proc.CommandLine
  if ($cl -match 'codebuddy|acp') { $targets += $w }
}

if ($targets.Count -eq 0) {
  Write-Output "  没有需要终止的卡死 agent 进程。"
} elseif (-not $Kill) {
  Write-Output "  以下进程卡死，可加 -Kill 终止（ACP 服务会自动重新拉起 agent）:"
  foreach ($t in $targets) { Write-Output ("    pid={0}  state={1}" -f $t.Pid, $t.State) }
  Write-Output ''
  Write-Output "  用法: .\reset-acp-wedge.ps1 -Kill"
} else {
  foreach ($t in $targets) {
    try {
      Stop-Process -Id $t.Pid -Force -ErrorAction Stop
      Write-Output ("  [ok] 已终止 pid={0} (state={1})" -f $t.Pid, $t.State)
    } catch {
      Write-Output ("  [x] 终止 pid={0} 失败: {1}" -f $t.Pid, $_.Exception.Message)
    }
  }
  Start-Sleep -Seconds 2
}

# ---------- 4. ACP 服务健康度 ----------
Write-Head "4. ACP 服务健康度"
$conn = Get-NetTCPConnection -State Listen -LocalPort 32124 -ErrorAction SilentlyContinue | Select-Object -First 1
if ($conn) {
  Write-Output ("  [ok] 32124 正在监听, 属主 pid={0}" -f $conn.OwningProcess)
  try {
    $r = Invoke-WebRequest 'http://127.0.0.1:32124/' -UseBasicParsing -TimeoutSec 8
    Write-Output ("  [ok] HTTP {0}, 返回 {1} 字节" -f $r.StatusCode, $r.Content.Length)
  } catch {
    Write-Output ("  [x] HTTP 请求失败: {0}" -f $_.Exception.Message)
  }
} else {
  Write-Output "  [x] 32124 没有监听，ACP WebUI 没在跑。"
  Write-Output "      需要时自行启动: npx @axhub/acp --port 32124"
}

Write-Head "完成"
Write-Output "  接下来：回到 Make 管理端硬刷新 (Ctrl+Shift+R)，再点一次「AI 执行」。"
Write-Output "  若这次仍失败，页面现在会明确提示「AI 侧栏未接受本次评审请求」，不再静默。"
