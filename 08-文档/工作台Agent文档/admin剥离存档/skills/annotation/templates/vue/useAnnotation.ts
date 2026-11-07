// 标注状态管理
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import type { AnnotationItem, PageAnnotation } from './types'

// 全局状态
const visible = ref(true)
const editMode = ref(false)
const activeId = ref<string>('')
const annotations = ref<AnnotationItem[]>([])
const pageTitle = ref('')

// 路由路径转文件名
const pathToFileName = (path: string) =>
  path.replace(/^\//, '').replace(/\//g, '-') || 'index'

/**
 * 解析当前路由对应的标注 JSON 文件名（不含 .json）
 * 优先级：
 * 1. route.meta.annotationFile（页面显式接入）
 * 2. 含动态参数的 matched 模板路径（避免 /task/1 与 /task/2 拆成不同文件）
 * 3. 当前 URL path（确保 /report/inventory → report-inventory，而非相对子路径 inventory）
 */
const routeToFileName = (route: ReturnType<typeof useRoute>): string => {
  const metaFile = route.meta?.annotationFile
  if (typeof metaFile === 'string' && metaFile.trim()) {
    return metaFile.trim().replace(/\.json$/i, '')
  }

  const matched = route.matched
  const lastPath = matched.length > 0 ? matched[matched.length - 1].path : ''
  const hasParams = matched.some((m) => /:\w+/.test(m.path))

  let routePath = route.path
  if (hasParams && lastPath) {
    routePath = lastPath.startsWith('/')
      ? lastPath
      : matched
          .map((m) => m.path.replace(/^\//, ''))
          .filter(Boolean)
          .join('/')
  } else if (lastPath.startsWith('/') && lastPath.includes('/')) {
    routePath = lastPath
  }

  const normalized = routePath
    .replace(/^\//, '')
    .replace(/\/:id$/, '-detail')
    .replace(/\/:id\//, '-detail-')
    .replace(/:[^/]+/g, 'detail')
    .replace(/\//g, '-')

  return normalized || pathToFileName(route.path)
}

export function useAnnotation() {
  const route = useRoute()

  /** 加载当前页面标注数据（直接 fetch 静态文件，Vite dev server 提供） */
  const loadAnnotations = async () => {
    const fileName = routeToFileName(route)
    try {
      const base = import.meta.env.BASE_URL || '/'
      const res = await fetch(`${base}annotations/${fileName}.json?t=${Date.now()}`)
      if (res.ok) {
        const data: PageAnnotation = await res.json()
        annotations.value = data.annotations || []
        pageTitle.value = data.title || ''
      } else {
        annotations.value = []
      }
    } catch {
      annotations.value = []
    }
  }

  /** 保存标注数据到文件（dev 中间件写入 public/annotations） */
  const saveAnnotations = async () => {
    const fileName = routeToFileName(route)
    const data: PageAnnotation = {
      page: fileName,
      title: pageTitle.value || fileName,
      updatedAt: new Date().toISOString().split('T')[0],
      annotations: annotations.value
    }
    const body = JSON.stringify(data)
    const endpoints = ['/__annotation_save__', '/__dev/annotation/save']
    let lastError = ''
    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body
        })
        if (res.ok) return
        lastError = `${url} → HTTP ${res.status}`
      } catch (e) {
        lastError = `${url} → ${e instanceof Error ? e.message : String(e)}`
      }
    }
    console.error('[annotation] 保存失败，标注未写入磁盘:', lastError)
    throw new Error(`标注保存失败: ${lastError}`)
  }

  const addAnnotation = async (item: AnnotationItem) => {
    annotations.value.push(item)
    await saveAnnotations()
  }

  const updateAnnotation = async (id: string, updates: Partial<AnnotationItem>) => {
    const idx = annotations.value.findIndex(a => a.id === id)
    if (idx > -1) {
      annotations.value[idx] = { ...annotations.value[idx], ...updates }
      await saveAnnotations()
    }
  }

  const removeAnnotation = async (id: string) => {
    annotations.value = annotations.value.filter(a => a.id !== id)
    await saveAnnotations()
  }

  const toggleVisible = () => { visible.value = !visible.value }
  const toggleEditMode = () => { editMode.value = !editMode.value }

  // 路由变化时重新加载：先清空标注，等页面组件渲染完再加载
  watch(() => route.path, () => {
    activeId.value = ''
    annotations.value = []
    nextTick(() => {
      setTimeout(() => {
        loadAnnotations()
      }, 400)
    })
  }, { immediate: true })

  return {
    visible, editMode, activeId, annotations, pageTitle,
    loadAnnotations, addAnnotation, updateAnnotation,
    removeAnnotation, toggleVisible, toggleEditMode
  }
}
