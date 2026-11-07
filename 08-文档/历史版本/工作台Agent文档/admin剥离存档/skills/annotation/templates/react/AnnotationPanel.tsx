import React, { useState, useEffect, useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import type { AnnotationItem } from './types'

interface AnnotationPanelProps {
  annotation: AnnotationItem | null
  index: number
  editMode: boolean
  onClose: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const categoryMap: Record<string, string> = {
  filter: '筛选条件', field: '字段说明', action: '操作说明', rule: '业务规则', custom: '自定义标注'
}

const MIN_W = 240
const MIN_H = 160

function defaultLayout() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const w = Math.min(320, Math.max(MIN_W, vw - 24))
  const h = Math.min(500, Math.max(MIN_H, Math.floor(vh * 0.55)))
  const x = Math.max(8, Math.min(vw - w - 8, vw - w - 16))
  const y = Math.max(8, Math.min(72, vh - h - 16))
  return { pos: { x, y }, size: { w, h } }
}

export function AnnotationPanel({ annotation, index, editMode, onClose, onEdit, onDelete }: AnnotationPanelProps) {
  const layout0 = defaultLayout()
  const [pos, setPos] = useState(layout0.pos)
  const [size, setSize] = useState(layout0.size)

  useEffect(() => {
    const layout = defaultLayout()
    setPos(layout.pos)
    setSize(layout.size)
  }, [annotation?.id])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && annotation) onClose()
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [annotation, onClose])

  const clampPos = (x: number, y: number, w = size.w) => ({
    x: Math.max(0, Math.min(window.innerWidth - w, x)),
    y: Math.max(0, Math.min(window.innerHeight - 40, y))
  })

  /** 标题栏拖动：Pointer 事件同时支持鼠标与触控 */
  const startDrag = (e: React.PointerEvent) => {
    if ((e.target as Element).closest('button')) return
    e.preventDefault()
    const startX = e.clientX - pos.x
    const startY = e.clientY - pos.y
    const onMove = (ev: PointerEvent) => {
      setPos(clampPos(ev.clientX - startX, ev.clientY - startY))
    }
    const onUp = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointercancel', onUp)
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointercancel', onUp)
  }

  const startResize = (dir: string, e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = size.w
    const startH = size.h
    const startPX = pos.x
    const startPY = pos.y

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      let newW = startW
      let newH = startH
      let newX = startPX
      let newY = startPY
      if (dir.includes('e')) newW = Math.max(MIN_W, startW + dx)
      if (dir.includes('w')) {
        newW = Math.max(MIN_W, startW - dx)
        newX = startPX + startW - newW
      }
      if (dir.includes('s')) newH = Math.max(MIN_H, startH + dy)
      if (dir.includes('n')) {
        newH = Math.max(MIN_H, startH - dy)
        newY = startPY + startH - newH
      }
      setSize({ w: newW, h: newH })
      setPos(clampPos(newX, newY, newW))
    }
    const onUp = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointercancel', onUp)
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointercancel', onUp)
  }

  const renderedContent = useMemo(() => {
    if (!annotation?.content) return ''
    const c = annotation.content
    const raw = (c.trimStart().startsWith('<') || /<[a-z][^>]*>[\s\S]*<\/[a-z]/i.test(c)) ? c : marked.parse(c) as string
    return DOMPurify.sanitize(raw)
  }, [annotation?.content])

  if (!annotation) return null

  const panelStyle: React.CSSProperties = {
    left: pos.x,
    top: pos.y,
    width: size.w,
    height: size.h
  }

  return (
    <div className="annotation-panel" style={panelStyle}>
      <div className="panel-header" onPointerDown={startDrag}>
        <div className="panel-title">
          <span className="panel-number">{index + 1}</span>
          {annotation.title}
        </div>
        <button className="panel-close" onPointerDown={e => e.stopPropagation()} onClick={onClose}>&times;</button>
      </div>

      <div className="panel-body">
        <div className="panel-meta">
          <span className={`meta-tag meta-tag-${annotation.category}`}>
            {categoryMap[annotation.category] || '标注'}
          </span>
          {annotation.source && <span className="meta-source">{annotation.source}</span>}
        </div>
        <div className="panel-content" dangerouslySetInnerHTML={{ __html: renderedContent }} />
      </div>

      {editMode && (
        <div className="panel-footer">
          <button className="panel-btn" onPointerDown={e => e.stopPropagation()} onClick={() => onEdit(annotation.id)}>编辑</button>
          <button className="panel-btn panel-btn-danger" onPointerDown={e => e.stopPropagation()} onClick={() => onDelete(annotation.id)}>删除</button>
        </div>
      )}

      {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(dir => (
        <div key={dir} className={`resize-handle resize-${dir}`} onPointerDown={e => startResize(dir, e)} />
      ))}
    </div>
  )
}
