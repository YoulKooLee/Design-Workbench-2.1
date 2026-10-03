# 产品设计工作台 · 桌面应用启动器（UTF-8 BOM，PowerShell 5.1 正确解析中文）
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)   # 位于 工作台面板/，工作台根为上两级
$appDir = Join-Path $root '工作台桌面应用'
$exe = Join-Path $appDir 'node_modules\electron\dist\electron.exe'
if (-not (Test-Path $exe)) {
  Write-Host '[workbench-desktop] First run: installing dependencies...' -ForegroundColor Yellow
  $env:ELECTRON_MIRROR = 'https://npmmirror.com/mirrors/electron/'
  Push-Location $appDir
  npm install
  Pop-Location
  if (-not (Test-Path $exe)) {
    Write-Host '[workbench-desktop] 依赖安装失败，请手动执行: cd 工作台桌面应用 && npm install' -ForegroundColor Red
    Read-Host '按回车退出'
    exit 1
  }
}
Start-Process -FilePath $exe -ArgumentList '.' -WorkingDirectory $appDir