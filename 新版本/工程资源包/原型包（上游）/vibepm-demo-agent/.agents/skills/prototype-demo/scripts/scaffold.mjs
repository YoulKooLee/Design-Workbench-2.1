#!/usr/bin/env node
/**
 * 统一脚手架：按 end 从包根 frame/ 复制母版到交付目录。
 *
 * 用法:
 *   node scaffold.mjs --end admin [--theme arco] [--out admin] [--full]
 *   node scaffold.mjs --end web  [--out web] [--profile marketing|product]
 *   node scaffold.mjs --end app  [--out app]
 *
 * admin 默认 **lean**：只拷运行时基座 + login-cover.html；业务页由 Agent 按 pages.catalog.json 按需复制。
 * web `--profile marketing`（默认）：vendor = vue+arco+fontawesome；`product` = 整包 vendor。
 * web scaffold 后预清理 themes 多皮（交付只留单 Style 槽，由 Agent 烘焙 global.css）。
 * Meta（_meta/）不复制到交付目录。
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SKILL_ROOT = path.resolve(__dirname, '..')
const PACK_ROOT = path.resolve(SKILL_ROOT, '../../..')
const FRAME_ROOT = path.join(PACK_ROOT, 'frame')
const INDEX_PATH = path.join(FRAME_ROOT, 'index.json')

const ADMIN_RUNTIME_IGNORE = [
  'node_modules',
  '.git',
  '_meta',
  'scripts',
  'package.json',
  'package-lock.json',
  'README.md',
]

/** lean 模式：根目录保留的 HTML（其余样板页不进入交付） */
const ADMIN_LEAN_HTML_KEEP = new Set(['login-cover.html'])

/** frame/web-element（Element）：与统一交付树对齐，拷 assets + vendor */
const WEB_BASE_DIRS_ELEMENT = ['assets', 'vendor']
/** frame/web（Arco）：只拷 assets；vendor 按 profile 分目录拷 */
const WEB_BASE_DIRS_ARCO = ['assets']
/** 营销 lean：壳与多数区块仍要 Vue+Arco；图表库按需走 product */
const WEB_VENDOR_MARKETING = ['vue', 'arco', 'fontawesome']
/** app：先拷 assets/css/js；vendor 按 profile（默认 lean，不含 f2） */
const APP_BASE_DIRS_NO_VENDOR = ['assets', 'css', 'js']
const APP_VENDOR_LEAN = ['vue', 'vant', 'fontawesome']

const WEB_LAYOUT_DEFAULT = {
  marketing: 'marketing-shell',
  product: 'app-sidebar',
}

function parseArgs(argv) {
  const opts = {
    end: null,
    theme: 'arco',
    out: null,
    framework: null,
    profile: null,
    siteKind: null,
    shell: null,
    allowPreviewOut: false,
    allowLocalFramework: false,
    full: false,
    help: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--end' && argv[i + 1]) opts.end = argv[++i]
    else if (a === '--theme' && argv[i + 1]) opts.theme = argv[++i]
    else if (a === '--out' && argv[i + 1]) opts.out = argv[++i]
    else if (a === '--framework' && argv[i + 1]) opts.framework = argv[++i]
    else if (a === '--profile' && argv[i + 1]) opts.profile = argv[++i]
    else if (a === '--site-kind' && argv[i + 1]) opts.siteKind = argv[++i]
    else if (a === '--shell' && argv[i + 1]) opts.shell = argv[++i]
    else if (a === '--allow-preview-out') opts.allowPreviewOut = true
    else if (a === '--allow-local-framework') opts.allowLocalFramework = true
    else if (a === '--full') opts.full = true
    else if (a === '--help' || a === '-h') opts.help = true
  }
  return opts
}

/** pending / local-test：不提供交付；自测须 --allow-local-framework */
const NON_DELIVERABLE_STATUSES = new Set(['pending', 'local-test'])

function assertDeliverableFramework(id, entry, { allowLocalFramework = false } = {}) {
  if (!entry) return
  if (!NON_DELIVERABLE_STATUSES.has(entry.status)) return
  if (allowLocalFramework) {
    console.warn(`Warning: framework "${id}" status=${entry.status} (local/non-deliverable). Continuing with --allow-local-framework.`)
    return
  }
  console.error(`Refusing framework "${id}" (status=${entry.status}): not for user delivery.`)
  console.error('WEB delivery uses --framework web (frame/web / Arco).')
  console.error('Local test only: add --allow-local-framework')
  process.exit(1)
}

function loadIndex() {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error(`frame/index.json not found: ${INDEX_PATH}`)
    process.exit(1)
  }
  return readJsonFile(INDEX_PATH)
}

function assertNotPreviewOutput(out, { allowPreviewOut = false } = {}) {
  const base = path.basename(path.resolve(process.cwd(), out))
  if (allowPreviewOut || !/-preview$/i.test(base)) return
  console.error(`Refusing preview output directory: ${base}`)
  console.error('Deliver to --out admin|web|app, or preview frame/<path>/ with a static server.')
  console.error('Override only if intentional: --allow-preview-out')
  process.exit(1)
}

function copyDir(src, dest, { ignore = [] } = {}) {
  if (!fs.existsSync(src)) return false
  fs.mkdirSync(dest, { recursive: true })
  for (const name of fs.readdirSync(src)) {
    if (ignore.includes(name)) continue
    const s = path.join(src, name)
    const d = path.join(dest, name)
    const stat = fs.statSync(s)
    if (stat.isDirectory()) copyDir(s, d, { ignore })
    else fs.copyFileSync(s, d)
  }
  return true
}

function copyNamedDirs(srcRoot, destRoot, names) {
  fs.mkdirSync(destRoot, { recursive: true })
  for (const name of names) {
    const s = path.join(srcRoot, name)
    if (!fs.existsSync(s)) continue
    copyDir(s, path.join(destRoot, name))
  }
}

function readJsonFile(filePath) {
  let text = fs.readFileSync(filePath, 'utf8')
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  return JSON.parse(text)
}

function readManifest(frameworkAbs) {
  const p = path.join(frameworkAbs, '_meta', 'template.manifest.json')
  if (!fs.existsSync(p)) return null
  return readJsonFile(p)
}

function resolveAdminFramework(endCfg, theme, frameworkId) {
  const frameworks = endCfg.frameworks || {}
  let id = frameworkId
  if (!id) {
    id =
      Object.keys(frameworks).find((k) => frameworks[k].theme === theme) ||
      endCfg.defaultFramework
  }
  const entry = frameworks[id]
  if (!entry) {
    console.error(`Admin framework unavailable: ${id || theme}. Use --theme arco.`)
    process.exit(1)
  }
  return { id, entry }
}

function writeAdminConfig(outDir, { theme, templateId, manifest, frameworkId, scaffoldMode }) {
  const config = {
    end: 'admin',
    theme,
    frameworkId,
    templateId: templateId || frameworkId,
    templateVersion: manifest?.version ?? '1.0.0',
    scaffoldMode: scaffoldMode || 'lean',
    outputDir: path.basename(outDir),
    createdAt: new Date().toISOString().slice(0, 10),
  }
  fs.writeFileSync(
    path.join(outDir, '.admin-config.json'),
    JSON.stringify(config, null, 2) + '\n',
    'utf8'
  )
}

function writeProtoConfig(
  outDir,
  { end, frameworkId, manifest, siteKind, layoutDefault, vendorProfile, shell, shellFamily },
) {
  const config = {
    end,
    frameworkId,
    frameworkVersion: manifest?.version ?? '1.0.0',
    outputDir: path.basename(outDir),
    createdAt: new Date().toISOString().slice(0, 10),
  }
  if (siteKind) config.siteKind = siteKind
  if (layoutDefault) config.layoutDefault = layoutDefault
  if (vendorProfile) config.vendorProfile = vendorProfile
  if (shell) config.shell = shell
  if (shellFamily) config.shellFamily = shellFamily
  fs.writeFileSync(
    path.join(outDir, '.prototype-config.json'),
    JSON.stringify(config, null, 2) + '\n',
    'utf8'
  )
}

function copyAppVendor(srcRoot, destRoot, profile) {
  const vendorSrc = path.join(srcRoot, 'vendor')
  const vendorDest = path.join(destRoot, 'vendor')
  if (!fs.existsSync(vendorSrc)) return
  if (profile === 'full') {
    copyDir(vendorSrc, vendorDest)
    return
  }
  fs.mkdirSync(vendorDest, { recursive: true })
  for (const name of APP_VENDOR_LEAN) {
    const s = path.join(vendorSrc, name)
    if (!fs.existsSync(s)) continue
    copyDir(s, path.join(vendorDest, name))
  }
}

function resolveAppShellMeta(shell) {
  if (!shell) return { shell: null, shellFamily: null }
  const base = path.basename(shell)
  const shellFamily = /wechat/i.test(base) ? 'wechat' : 'ios'
  return { shell: base, shellFamily }
}

/** 删除 themes 目录，并去掉 global.css 中 themes @import（交付单 Style） */
function stripWebBrandThemes(outDir) {
  const themesDir = path.join(outDir, 'assets', 'common', 'themes')
  if (fs.existsSync(themesDir)) {
    fs.rmSync(themesDir, { recursive: true, force: true })
    console.log('Cleared assets/common/themes/')
  }
  const globalCss = path.join(outDir, 'assets', 'common', 'css', 'global.css')
  if (!fs.existsSync(globalCss)) return
  let text = fs.readFileSync(globalCss, 'utf8')
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  const next = text
    .split(/\r?\n/)
    .filter((line) => !/@import\s+["'].*themes\//i.test(line))
    .join('\n')
  if (next !== text) {
    fs.writeFileSync(globalCss, next, 'utf8')
    console.log('Stripped themes @import from assets/common/css/global.css')
  }
}

function copyWebVendor(srcRoot, destRoot, profile) {
  const vendorSrc = path.join(srcRoot, 'vendor')
  const vendorDest = path.join(destRoot, 'vendor')
  if (!fs.existsSync(vendorSrc)) return
  if (profile === 'product') {
    copyDir(vendorSrc, vendorDest)
    return
  }
  fs.mkdirSync(vendorDest, { recursive: true })
  for (const name of WEB_VENDOR_MARKETING) {
    const s = path.join(vendorSrc, name)
    if (!fs.existsSync(s)) continue
    copyDir(s, path.join(vendorDest, name))
  }
}

function resolveWebSiteKind(opts) {
  const raw = (opts.siteKind || opts.profile || 'marketing').toLowerCase()
  if (raw === 'product') return 'product'
  if (raw === 'marketing') return 'marketing'
  console.error(`Unknown --site-kind / --profile: ${raw}. Use marketing|product.`)
  process.exit(1)
}

function ensureEmptyOrAbort(outDir) {
  if (fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0) {
    console.error(`Output directory not empty: ${outDir}`)
    console.error('Scaffold aborted. Use empty dir or remove existing delivery folder.')
    process.exit(1)
  }
}

/** lean：去掉样板业务页，只留 login + 运行时；业务页按 catalog 按需复制 */
function trimAdminLeanDelivery(outDir) {
  for (const name of fs.readdirSync(outDir)) {
    if (!name.endsWith('.html')) continue
    if (ADMIN_LEAN_HTML_KEEP.has(name)) continue
    fs.unlinkSync(path.join(outDir, name))
  }
  const pagesDir = path.join(outDir, 'js', 'pages')
  if (fs.existsSync(pagesDir)) {
    for (const name of fs.readdirSync(pagesDir)) {
      fs.unlinkSync(path.join(pagesDir, name))
    }
  }
  // 页面级 CSS 仍保留在 css/（体积小；按需复制样板时也可覆盖）。演示页专用 css 可留，不阻塞交付。
}

function scaffoldAdmin(opts, endCfg) {
  const { id, entry } = resolveAdminFramework(endCfg, opts.theme, opts.framework)
  assertDeliverableFramework(id, entry, { allowLocalFramework: opts.allowLocalFramework })
  const src = path.join(FRAME_ROOT, entry.path)
  const outDir = path.resolve(process.cwd(), opts.out || endCfg.outputDir || 'admin')
  assertNotPreviewOutput(opts.out || endCfg.outputDir, { allowPreviewOut: opts.allowPreviewOut })
  ensureEmptyOrAbort(outDir)

  if (!fs.existsSync(src)) {
    console.error(`Framework not found: ${src}`)
    process.exit(1)
  }

  const mode = opts.full ? 'full' : 'lean'
  console.log(`Copying admin runtime ${src} -> ${outDir} (mode=${mode})`)
  copyDir(src, outDir, { ignore: ADMIN_RUNTIME_IGNORE })
  if (mode === 'lean') trimAdminLeanDelivery(outDir)

  const manifest = readManifest(src)
  writeAdminConfig(outDir, {
    theme: entry.theme || opts.theme,
    templateId: manifest?.id || id,
    manifest,
    frameworkId: id,
    scaffoldMode: mode,
  })
  console.log(`Done. end=admin framework=${id} theme=${entry.theme} mode=${mode}`)
  if (mode === 'lean') {
    console.log(
      'Lean: only login-cover.html + runtime. Copy pages from frame/.../_meta/pages.catalog.json'
    )
  }
  console.log('Next: references/admin/pages.md + pages.catalog.json')
}

function scaffoldWeb(opts, endCfg) {
  const id = opts.framework || endCfg.defaultFramework
  const entry = endCfg.frameworks[id]
  if (!entry) {
    console.error(`Unknown web framework: ${id}`)
    console.error(
      `Deliverable: ${Object.keys(endCfg.frameworks || {})
        .filter((k) => !NON_DELIVERABLE_STATUSES.has(endCfg.frameworks[k].status))
        .join(', ') || '(none)'}`,
    )
    process.exit(1)
  }
  assertDeliverableFramework(id, entry, { allowLocalFramework: opts.allowLocalFramework })
  const src = path.join(FRAME_ROOT, entry.path)
  const outDir = path.resolve(process.cwd(), opts.out || endCfg.outputDir || 'web')
  assertNotPreviewOutput(opts.out || endCfg.outputDir, { allowPreviewOut: opts.allowPreviewOut })
  ensureEmptyOrAbort(outDir)

  const siteKind = resolveWebSiteKind(opts)
  const vendorProfile = siteKind === 'product' ? 'product' : 'marketing'
  const layoutDefault = WEB_LAYOUT_DEFAULT[siteKind]
  const isArco =
    entry.capability === 'blocks-and-components' || entry.theme === 'arco'

  if (isArco) {
    console.log(
      `Copying web base from ${src} -> ${outDir} (assets + vendor profile=${vendorProfile})`,
    )
    copyNamedDirs(src, outDir, WEB_BASE_DIRS_ARCO)
    copyWebVendor(src, outDir, vendorProfile)
    stripWebBrandThemes(outDir)
  } else {
    console.log(`Copying web base dirs from ${src} -> ${outDir} (${WEB_BASE_DIRS_ELEMENT.join(', ')})`)
    copyNamedDirs(src, outDir, WEB_BASE_DIRS_ELEMENT)
  }

  const manifest = readManifest(src)
  writeProtoConfig(outDir, {
    end: 'web',
    frameworkId: id,
    manifest,
    siteKind,
    layoutDefault,
    vendorProfile,
  })
  console.log(
    `Done. end=web framework=${id} siteKind=${siteKind} layoutDefault=${layoutDefault} vendorProfile=${vendorProfile}.`,
  )
  console.log('Next: bake Style into global.css; pages via references/web/recipes.md + pages.md.')
  if (entry.capability === 'blocks-and-components') {
    console.log('Arco web: prefer recipes/layouts; compose blocks from frame/web/blocks|components.')
  }
}

function scaffoldApp(opts, endCfg) {
  const id = opts.framework || endCfg.defaultFramework
  const entry = endCfg.frameworks[id]
  if (!entry) {
    console.error(`Unknown app framework: ${id}`)
    process.exit(1)
  }
  assertDeliverableFramework(id, entry, { allowLocalFramework: opts.allowLocalFramework })
  const src = path.join(FRAME_ROOT, entry.path)
  const outDir = path.resolve(process.cwd(), opts.out || endCfg.outputDir || 'app')
  assertNotPreviewOutput(opts.out || endCfg.outputDir, { allowPreviewOut: opts.allowPreviewOut })
  ensureEmptyOrAbort(outDir)

  const rawProfile = (opts.profile || 'lean').toLowerCase()
  const vendorProfile = rawProfile === 'full' ? 'full' : 'lean'
  const { shell, shellFamily } = resolveAppShellMeta(opts.shell)

  console.log(
    `Copying app base from ${src} -> ${outDir} (assets/css/js + vendor profile=${vendorProfile})`,
  )
  copyNamedDirs(src, outDir, APP_BASE_DIRS_NO_VENDOR)
  copyAppVendor(src, outDir, vendorProfile)
  stripWebBrandThemes(outDir)
  const globalSrc = path.join(src, 'css', 'global.css')
  if (fs.existsSync(globalSrc)) {
    fs.mkdirSync(path.join(outDir, 'css'), { recursive: true })
    fs.copyFileSync(globalSrc, path.join(outDir, 'css', 'global.css'))
  }
  const manifest = readManifest(src)
  writeProtoConfig(outDir, {
    end: 'app',
    frameworkId: id,
    manifest,
    vendorProfile,
    shell,
    shellFamily,
  })
  console.log(
    `Done. end=app framework=${id} vendorProfile=${vendorProfile}` +
      (shell ? ` shell=${shell}` : '') +
      '. Next: bake Style; copy assets/app-recipes/ shell.',
  )
}

function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help || !opts.end) {
    console.log(`Usage:
  node scaffold.mjs --end admin [--theme arco] [--out admin] [--full]
  node scaffold.mjs --end web  [--out web] [--framework web] [--profile marketing|product] [--site-kind marketing|product]
  node scaffold.mjs --end app  [--out app] [--profile lean|full] [--shell ios_frame.html]

  admin default = lean (login + runtime only). --full = copy all sample pages.
  web default framework = web (Arco). --profile/--site-kind default = marketing
    (layoutDefault marketing-shell; vendor vue+arco+fontawesome).
    product = app-sidebar + full vendor (incl. unovis).
  app --profile lean (default): vue+vant+fontawesome; full = entire vendor (incl. f2).
    optional --shell writes shell + shellFamily into .prototype-config.json.

Frame root: ${FRAME_ROOT}`)
    process.exit(opts.help ? 0 : 1)
  }

  const index = loadIndex()
  const endCfg = index.ends?.[opts.end]
  if (!endCfg) {
    console.error(`Unknown --end: ${opts.end}. Use admin|web|app.`)
    process.exit(1)
  }

  if (opts.end === 'admin') scaffoldAdmin(opts, endCfg)
  else if (opts.end === 'web') scaffoldWeb(opts, endCfg)
  else if (opts.end === 'app') scaffoldApp(opts, endCfg)
  else {
    console.error(`Unsupported end: ${opts.end}`)
    process.exit(1)
  }
}

main()
