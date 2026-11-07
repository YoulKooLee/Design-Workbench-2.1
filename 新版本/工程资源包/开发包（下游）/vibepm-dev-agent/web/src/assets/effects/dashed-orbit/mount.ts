/** 对照 frame/web/assets/effects/dashed-orbit/dashed-orbit.js（引导区精简挂载） */

const CIRCLE1 =
  '<svg class="do-dot-lg" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0C32.598 0 42 9.40202 42 21ZM1.00838 21C1.00838 32.0411 9.95893 40.9916 21 40.9916C32.0411 40.9916 40.9916 32.0411 40.9916 21C40.9916 9.95893 32.0411 1.00838 21 1.00838C9.95893 1.00838 1.00838 9.95893 1.00838 21Z" fill="currentColor"/><circle cx="21" cy="21" r="10" fill="currentColor"/></svg>'
const CIRCLE2 =
  '<svg class="do-dot-sm" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="currentColor"/></svg>'

export type OrbitItem = { kind: 'circle1' | 'circle2'; opacity?: number; size?: number }
export type OrbitRing = { speed: number; radius: number; items: OrbitItem[] }

export type DashedOrbitOptions = {
  duration?: number
  iconSize?: number
  showCopy?: boolean
  showGlow?: boolean
  rings?: OrbitRing[]
}

export type DashedOrbitHandle = { destroy: () => void }

/** 母版 app-sidebar 引导区默认环 */
export const GUIDE_ORBIT_OPTS: DashedOrbitOptions = {
  showCopy: false,
  showGlow: false,
  duration: 20,
  iconSize: 28,
  rings: [
    {
      speed: 0.5,
      radius: 90,
      items: [
        { kind: 'circle1', opacity: 0.75, size: 16 },
        { kind: 'circle1', opacity: 0.6, size: 8 },
      ],
    },
    {
      speed: 0.25,
      radius: 150,
      items: [
        { kind: 'circle1', opacity: 0.5, size: 7 },
        { kind: 'circle1', opacity: 0.7, size: 16 },
        { kind: 'circle1', opacity: 0.58, size: 9 },
      ],
    },
    {
      speed: 0.1,
      radius: 210,
      items: [
        { kind: 'circle1', opacity: 0.45, size: 7 },
        { kind: 'circle1', opacity: 0.68, size: 16 },
        { kind: 'circle1', opacity: 0.52, size: 10 },
      ],
    },
  ],
}

function buildRing(ring: OrbitRing, durationBase: number, iconSize: number) {
  const frag = document.createDocumentFragment()
  const items = ring.items || []
  const n = items.length || 1
  const calcDuration = durationBase / (ring.speed || 1)
  items.forEach((item, index) => {
    const el = document.createElement('div')
    el.className = 'do-orbit-item'
    el.style.setProperty('--duration', String(calcDuration))
    el.style.setProperty('--radius', String(ring.radius))
    el.style.setProperty('--angle', String((360 / n) * index))
    el.style.setProperty('--icon-size', `${iconSize}px`)
    el.style.color = `rgba(255,255,255,${item.opacity != null ? item.opacity : 0.7})`
    el.innerHTML = item.kind === 'circle1' ? CIRCLE1 : CIRCLE2
    const svgEl = el.querySelector('svg')
    if (svgEl && item.size) {
      svgEl.style.width = `${item.size}px`
      svgEl.style.height = `${item.size}px`
    }
    frag.appendChild(el)
  })
  return frag
}

export function mountDashedOrbit(
  container: HTMLElement,
  options: DashedOrbitOptions = {},
): DashedOrbitHandle {
  const opts = {
    duration: 20,
    iconSize: 30,
    showCopy: false,
    showGlow: false,
    ...options,
  }
  const rings = opts.rings || GUIDE_ORBIT_OPTS.rings || []

  const root = document.createElement('div')
  root.className = 'do-root'
  root.setAttribute('data-animation', 'dashed-orbit')

  const orbits = document.createElement('div')
  orbits.className = 'do-orbits'
  orbits.setAttribute('aria-hidden', 'true')
  rings.forEach((ring) => {
    orbits.appendChild(buildRing(ring, opts.duration, opts.iconSize))
  })
  root.appendChild(orbits)
  container.appendChild(root)

  return {
    destroy() {
      if (root.parentNode) root.parentNode.removeChild(root)
    },
  }
}
