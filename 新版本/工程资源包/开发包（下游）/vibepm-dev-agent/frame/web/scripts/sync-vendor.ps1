# Sync Vue + Arco + Font Awesome from frame/admin/vendor (no CDN).
# Also sync fa-icons.js and fonts/ from Admin (same layout under assets/).
$ErrorActionPreference = "Stop"
$webArco = Split-Path $PSScriptRoot -Parent
$frame = Split-Path $webArco -Parent
$src = Join-Path $frame "admin\vendor"
$dst = Join-Path $webArco "vendor"
if (-not (Test-Path (Join-Path $src "vue"))) {
  throw "admin vendor not found: $src"
}
New-Item -ItemType Directory -Path $dst -Force | Out-Null
foreach ($name in @("vue", "arco", "fontawesome", "unovis")) {
  $from = Join-Path $src $name
  $to = Join-Path $dst $name
  if (Test-Path $to) { Remove-Item $to -Recurse -Force }
  Copy-Item $from $to -Recurse -Force
  Write-Host "synced $name"
}

$faSrc = Join-Path $frame "admin\js\fa-icons.js"
$faDstDir = Join-Path $webArco "assets\js"
$faDst = Join-Path $faDstDir "fa-icons.js"
if (-not (Test-Path $faSrc)) {
  throw "admin fa-icons.js not found: $faSrc"
}
New-Item -ItemType Directory -Path $faDstDir -Force | Out-Null
Copy-Item $faSrc $faDst -Force
Write-Host "synced fa-icons.js 鈫?assets/common/js/fa-icons.js"
Write-Host "note: assets/common/css/fa-icons.css is WEB-slim (do not overwrite from admin)"

$fontsSrc = Join-Path $frame "admin\fonts"
$fontsDst = Join-Path $webArco "assets\fonts"
if (-not (Test-Path $fontsSrc)) {
  throw "admin fonts not found: $fontsSrc"
}
if (Test-Path $fontsDst) { Remove-Item $fontsDst -Recurse -Force }
Copy-Item $fontsSrc $fontsDst -Recurse -Force
Write-Host "synced fonts 鈫?assets/fonts (index.css + inter + plus-jakarta-sans)"

Write-Host "done 鈫?$dst"
