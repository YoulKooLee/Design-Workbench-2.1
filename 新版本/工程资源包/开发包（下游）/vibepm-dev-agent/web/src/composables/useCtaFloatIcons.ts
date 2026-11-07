import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/** 对照 frame/web/layouts/marketing-shell/cta-float-icons.js */
const FLOAT_POS = [
  { x: -380, y: -78, r: -12 },
  { x: -440, y: 4, r: 10 },
  { x: -360, y: 86, r: -8 },
  { x: 380, y: -70, r: 8 },
  { x: 440, y: 12, r: -22 },
  { x: 360, y: 92, r: 18 },
]

export function useCtaFloatIcons(panelRef: Ref<HTMLElement | null>) {
  let raf = 0
  let started = false
  let resizeTimer = 0
  let io: IntersectionObserver | null = null
  let phase: Array<{ ax: number; ay: number; sp: number; d: number }> = []
  let nodes: HTMLElement[] = []

  function scale() {
    const panel = panelRef.value
    const w = panel?.clientWidth || 720
    return Math.max(0.52, Math.min(1.08, w / 980))
  }

  function applyPose(withTransition: boolean) {
    const s = scale()
    nodes.forEach((node, i) => {
      const p = FLOAT_POS[i] || FLOAT_POS[0]
      node.style.transition = withTransition
        ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease'
        : 'none'
      node.style.opacity = '1'
      node.style.transform = `translate3d(${p.x * s}px,${p.y * s}px,0) rotate(${p.r}deg)`
    })
  }

  function stopDrift() {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
  }

  function drift() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const s = scale()
    const t = performance.now() * 0.001
    nodes.forEach((node, i) => {
      const base = FLOAT_POS[i] || FLOAT_POS[0]
      const ph = phase[i] || { ax: 5, ay: 8, sp: 0.7, d: 0 }
      const x = base.x * s + Math.sin(t * ph.sp + ph.d) * ph.ax
      const y = base.y * s + Math.cos(t * ph.sp * 0.9 + ph.d) * ph.ay
      node.style.transition = 'none'
      node.style.transform = `translate3d(${x}px,${y}px,0) rotate(${base.r}deg)`
    })
    raf = requestAnimationFrame(drift)
  }

  function enter() {
    if (started || !panelRef.value) return
    started = true
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    phase = nodes.map(() => ({
      ax: 3 + Math.random() * 5,
      ay: 6 + Math.random() * 6,
      sp: 0.55 + Math.random() * 0.45,
      d: Math.random() * Math.PI * 2,
    }))
    if (reduced) {
      applyPose(false)
      return
    }
    const s = scale()
    nodes.forEach((node) => {
      node.style.opacity = '0'
      node.style.transform = 'translate3d(0,-120px,0) scale(0.75)'
    })
    requestAnimationFrame(() => {
      nodes.forEach((node, i) => {
        const p = FLOAT_POS[i] || FLOAT_POS[0]
        setTimeout(() => {
          node.style.transition =
            'transform 0.9s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.45s ease'
          node.style.opacity = '1'
          node.style.transform = `translate3d(${p.x * s}px,${p.y * s}px,0) rotate(${p.r}deg)`
        }, i * 100)
      })
      setTimeout(() => drift(), 900 + nodes.length * 100)
    })
  }

  function onResize() {
    clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      if (!started) return
      applyPose(false)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced) {
        stopDrift()
        drift()
      }
    }, 120)
  }

  onMounted(() => {
    const panel = panelRef.value
    if (!panel) return
    nodes = Array.from(
      panel.querySelectorAll<HTMLElement>('[data-cta-floats] .wa-cta__float'),
    ).slice(0, 6)
    if (!nodes.length) return

    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              enter()
              io?.disconnect()
            }
          })
        },
        { threshold: 0.05, rootMargin: '120px 0px' },
      )
      io.observe(panel)
      requestAnimationFrame(() => {
        const rect = panel.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight + 120) enter()
      })
    } else {
      enter()
    }
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    stopDrift()
    io?.disconnect()
    window.removeEventListener('resize', onResize)
    clearTimeout(resizeTimer)
  })
}
