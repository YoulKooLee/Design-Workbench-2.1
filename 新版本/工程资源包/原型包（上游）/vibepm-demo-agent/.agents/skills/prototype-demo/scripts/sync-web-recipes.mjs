#!/usr/bin/env node
/**
 * 从 frame/web/layouts 生成交付态 recipe（路径已改成交付根相对路径）。
 * 用法（资源包根或任意 cwd，脚本自定位 PACK_ROOT）：
 *   node .agents/skills/prototype-demo/scripts/sync-web-recipes.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SKILL_ROOT = path.resolve(__dirname, '..')
const PACK_ROOT = path.resolve(SKILL_ROOT, '../../..')
const FRAME_WEB = path.join(PACK_ROOT, 'frame', 'web')
const OUT_ROOT = path.join(SKILL_ROOT, 'assets', 'web-recipes')

const RECIPES = [
  {
    id: 'landing-home',
    layout: 'marketing-shell',
    htmlName: 'index.html',
    pageCss: 'index.css',
    pageJs: 'index.js',
    layoutCss: 'layout-marketing-shell.css',
  },
  {
    id: 'product-home',
    layout: 'app-sidebar',
    htmlName: 'index.html',
    pageCss: 'index.css',
    pageJs: 'index.js',
    layoutCss: 'layout-app-sidebar.css',
    bundleCssImports: true,
  },
  {
    id: 'login',
    layout: 'login-shell',
    htmlName: 'login.html',
    pageCss: 'login.css',
    pageJs: 'login.js',
    layoutCss: 'layout-login-shell.css',
  },
]

function read(p) {
  let t = fs.readFileSync(p, 'utf8')
  if (t.charCodeAt(0) === 0xfeff) t = t.slice(1)
  return t
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true })
}

/** 展开 layout.css 内相对 @import（仅一层，用于 app-sidebar） */
function bundleLayoutCss(layoutDir, cssText) {
  const lines = cssText.split(/\r?\n/)
  const out = []
  for (const line of lines) {
    const m = line.match(/^\s*@import\s+["']([^"']+)["']\s*;?\s*$/)
    if (!m) {
      out.push(line)
      continue
    }
    const abs = path.resolve(layoutDir, m[1])
    if (!fs.existsSync(abs)) {
      out.push(`/* missing import: ${m[1]} */`)
      continue
    }
    out.push(`/* inlined: ${m[1]} */`)
    out.push(bundleLayoutCss(path.dirname(abs), read(abs)))
  }
  return out.join('\n')
}

function toDeliveryHtml(html, { pageCss, pageJs, layoutCss }) {
  let t = html
  t = t.replaceAll('../../vendor/', './vendor/')
  t = t.replaceAll('../../assets/', './assets/')
  t = t.replace(/href="\.\/layout\.css[^"]*"/g, `href="./css/${pageCss}"`)
  t = t.replace(/src="\.\/layout\.js[^"]*"/g, `src="./js/${pageJs}"`)
  // 页级 css 顶部会 @import layout；html 只链一个页级文件
  void layoutCss
  return t
}

function pageCssStub(layoutCss) {
  return `/* 页级样式：先壳后本页私有 */\n@import "./${layoutCss}";\n\n/* 业务覆盖写在下方 */\n`
}

function writeRecipe(recipe) {
  const layoutDir = path.join(FRAME_WEB, 'layouts', recipe.layout)
  const htmlSrc = path.join(layoutDir, 'index.html')
  const cssSrc = path.join(layoutDir, 'layout.css')
  const jsSrc = path.join(layoutDir, 'layout.js')
  for (const p of [htmlSrc, cssSrc, jsSrc]) {
    if (!fs.existsSync(p)) {
      console.error(`Missing: ${p}`)
      process.exit(1)
    }
  }

  const dest = path.join(OUT_ROOT, recipe.id)
  const destCss = path.join(dest, 'css')
  const destJs = path.join(dest, 'js')
  ensureDir(destCss)
  ensureDir(destJs)

  let layoutCss = read(cssSrc)
  if (recipe.bundleCssImports) layoutCss = bundleLayoutCss(layoutDir, layoutCss)

  fs.writeFileSync(path.join(destCss, recipe.layoutCss), layoutCss, 'utf8')
  fs.writeFileSync(path.join(destCss, recipe.pageCss), pageCssStub(recipe.layoutCss), 'utf8')
  fs.writeFileSync(path.join(destJs, recipe.pageJs), read(jsSrc), 'utf8')

  const html = toDeliveryHtml(read(htmlSrc), recipe)
  fs.writeFileSync(path.join(dest, recipe.htmlName), html, 'utf8')

  const meta = {
    recipe: recipe.id,
    layout: recipe.layout,
    source: `frame/web/layouts/${recipe.layout}/`,
    deliver: [recipe.htmlName, `css/${recipe.pageCss}`, `css/${recipe.layoutCss}`, `js/${recipe.pageJs}`],
    note: '拷到交付根后改品牌/槽位；删预览引导与画廊专用控件。路径已是 ./vendor ./assets。',
  }
  fs.writeFileSync(path.join(dest, 'recipe.json'), JSON.stringify(meta, null, 2) + '\n', 'utf8')
  console.log(`OK ${recipe.id} -> ${dest}`)
}

function main() {
  if (!fs.existsSync(FRAME_WEB)) {
    console.error(`frame/web not found: ${FRAME_WEB}`)
    process.exit(1)
  }
  ensureDir(OUT_ROOT)
  for (const r of RECIPES) writeRecipe(r)
  console.log('Done. See assets/web-recipes/ and references/web/recipes.md')
}

main()
