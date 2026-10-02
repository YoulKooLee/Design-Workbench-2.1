import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

/**
 * Vite 插件：标注数据本地保存
 * 拦截 /__annotation_save__（及兼容旧路径 /__dev/annotation/save）
 * 将标注 JSON 写入 public/annotations/，仅 dev server 生效
 *
 * 重要：中间件必须在 configureServer 内同步挂载（不要用 post hook）。
 * post hook 在 Vite 内部中间件之后执行，未知 POST 可能已被 404，导致保存失败。
 */
export function annotationPlugin(): Plugin {
  let projectRoot = ''
  const MAX_BODY = 1024 * 1024
  const SAVE_PATHS = new Set(['/__annotation_save__', '/__dev/annotation/save'])

  return {
    name: 'vite-plugin-annotation-save',
    enforce: 'pre',
    configResolved(config) {
      projectRoot = config.root
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0]
        if (req.method !== 'POST' || !SAVE_PATHS.has(url)) {
          next()
          return
        }

        let body = ''
        let aborted = false
        req.on('data', (chunk) => {
          body += chunk
          if (body.length > MAX_BODY) {
            aborted = true
            res.statusCode = 413
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: '请求体过大' }))
            req.destroy()
          }
        })
        req.on('end', () => {
          if (aborted) return
          try {
            const data = JSON.parse(body)
            const rawName = String(data.page || 'unknown')
            const fileName = path
              .basename(rawName)
              .replace(/[^a-zA-Z0-9_-]/g, '_')
              .replace(/\.json$/i, '')

            const root = projectRoot || server.config.root
            const dir = path.resolve(root, 'public', 'annotations')
            const filePath = path.resolve(dir, `${fileName}.json`)
            const dirWithSep = dir.endsWith(path.sep) ? dir : dir + path.sep
            // Windows 下忽略盘符大小写
            const normalizedFile = filePath.toLowerCase()
            const normalizedDir = dirWithSep.toLowerCase()
            if (!normalizedFile.startsWith(normalizedDir)) {
              throw new Error('invalid path')
            }

            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true })
            }
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, file: `${fileName}.json` }))
          } catch (e) {
            console.error('[annotation-plugin] 保存失败:', e)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: '保存失败' }))
          }
        })
      })
    }
  }
}
