#!/usr/bin/env node
/**
 * 从 frame/app 壳 html 生成交付态 recipe（去掉 gallery-bridge；路径保持 ./）。
 *   node .agents/skills/prototype-demo/scripts/sync-app-recipes.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SKILL_ROOT = path.resolve(__dirname, '..')
const PACK_ROOT = path.resolve(SKILL_ROOT, '../../..')
const FRAME_APP = path.join(PACK_ROOT, 'frame', 'app')
const OUT_ROOT = path.join(SKILL_ROOT, 'assets', 'app-recipes')

/** recipeId → { html, css } 相对 frame/app */
const RECIPES = [
  { id: 'ios-content', html: 'ios_frame.html', css: 'css/ios-frame.css', shell: 'ios_frame.html', family: 'ios' },
  { id: 'ios-header', html: 'ios_frame_header.html', css: 'css/ios-frame-header.css', shell: 'ios_frame_header.html', family: 'ios' },
  { id: 'ios-tabs', html: 'ios_frame_tabs.html', css: 'css/ios-frame-tabs.css', shell: 'ios_frame_tabs.html', family: 'ios' },
  { id: 'ios-nav', html: 'ios_frame_nav.html', css: 'css/ios-frame-nav.css', shell: 'ios_frame_nav.html', family: 'ios' },
  { id: 'wechat-content', html: 'wechat-frame.html', css: 'css/wechat-frame.css', shell: 'wechat-frame.html', family: 'wechat' },
  { id: 'wechat-header', html: 'wechat-frame_header.html', css: 'css/wechat-frame-header.css', shell: 'wechat-frame_header.html', family: 'wechat' },
  { id: 'wechat-tabs', html: 'wechat-frame-tabs.html', css: 'css/wechat-frame-tabs.css', shell: 'wechat-frame-tabs.html', family: 'wechat' },
  { id: 'wechat-nav', html: 'wechat-frame-nav.html', css: 'css/wechat-frame-nav.css', shell: 'wechat-frame-nav.html', family: 'wechat' },
]

function read(p) {
  let t = fs.readFileSync(p, 'utf8')
  if (t.charCodeAt(0) === 0xfeff) t = t.slice(1)
  return t
}

function stripPreview(html) {
  return html
    .replace(/\s*<script[^>]*gallery-bridge\.js[^>]*><\/script>\s*/gi, '\n')
    .replace(/\s*<script[^>]*src=["']\.\/js\/gallery-bridge\.js["'][^>]*><\/script>\s*/gi, '\n')
}

function main() {
  if (!fs.existsSync(FRAME_APP)) {
    console.error(`frame/app not found: ${FRAME_APP}`)
    process.exit(1)
  }
  fs.mkdirSync(OUT_ROOT, { recursive: true })
  for (const r of RECIPES) {
    const htmlSrc = path.join(FRAME_APP, r.html)
    const cssSrc = path.join(FRAME_APP, r.css)
    if (!fs.existsSync(htmlSrc) || !fs.existsSync(cssSrc)) {
      console.error(`Missing ${r.id}: ${htmlSrc} or ${cssSrc}`)
      process.exit(1)
    }
    const dest = path.join(OUT_ROOT, r.id)
    const destCss = path.join(dest, 'css')
    fs.mkdirSync(destCss, { recursive: true })
    const cssName = path.basename(r.css)
    fs.writeFileSync(path.join(dest, 'index.html'), stripPreview(read(htmlSrc)), 'utf8')
    fs.copyFileSync(cssSrc, path.join(destCss, cssName))
    const meta = {
      recipe: r.id,
      shell: r.shell,
      shellFamily: r.family,
      source: `frame/app/${r.html}`,
      deliver: ['index.html', `css/${cssName}`],
      note: '拷到交付根：index.html + 对应 css；业务只写在 main.screen-content > section.app-shell。勿动画外框。',
    }
    fs.writeFileSync(path.join(dest, 'recipe.json'), JSON.stringify(meta, null, 2) + '\n', 'utf8')
    console.log(`OK ${r.id}`)
  }
  console.log('Done. assets/app-recipes/')
}

main()
