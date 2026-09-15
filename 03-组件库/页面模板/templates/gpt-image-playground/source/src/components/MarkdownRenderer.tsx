import React, { memo, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components as ReactMarkdownComponents } from 'react-markdown'

type MarkdownRendererProps = {
  content: string
  streaming?: boolean
  className?: string
}

type MarkdownRendererState =
  | { type: 'loading' }
  | { type: 'legacy' }
  | { type: 'plain' }

const allowedUrlProtocols = new Set(['http:', 'https:', 'mailto:', 'tel:'])

function safeUrl(url: string) {
  try {
    const parsed = new URL(url, window.location.origin)
    return allowedUrlProtocols.has(parsed.protocol) ? url : '#blocked'
  } catch {
    return '#blocked'
  }
}

const legacyMarkdownComponents: ReactMarkdownComponents = {
  a({ children, href, ...props }) {
    const safeHref = safeUrl(href ?? '')
    const shouldOpenBlank = safeHref !== '#blocked'
    return (
      <a
        {...props}
        href={safeHref}
        rel={shouldOpenBlank ? 'noreferrer' : undefined}
        target={shouldOpenBlank ? '_blank' : undefined}
      >
        {children}
      </a>
    )
  },
}

function loadMarkdownRenderer() {
  return Promise.resolve<MarkdownRendererState>({ type: 'legacy' })
}

function PlainTextMarkdown({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div
      className={`markdown-renderer ${className}`.trim()}
      dir="auto"
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {content}
    </div>
  )
}

const MarkdownRenderer = memo(function MarkdownRenderer({
  content,
  streaming = false,
  className = '',
}: MarkdownRendererProps) {
  const [renderer, setRenderer] = useState<MarkdownRendererState>({ type: 'loading' })

  useEffect(() => {
    let disposed = false

    loadMarkdownRenderer().then((nextRenderer) => {
      if (!disposed) setRenderer(nextRenderer)
    })

    return () => {
      disposed = true
    }
  }, [])

  if (renderer.type === 'legacy') {
    return (
      <div className={`markdown-renderer ${className}`.trim()} dir="auto">
        <ReactMarkdown
          components={legacyMarkdownComponents}
          remarkPlugins={[remarkGfm]}
          urlTransform={safeUrl}
        >
          {content}
        </ReactMarkdown>
      </div>
    )
  }

  return <PlainTextMarkdown content={content} className={className} />
})

export default MarkdownRenderer
