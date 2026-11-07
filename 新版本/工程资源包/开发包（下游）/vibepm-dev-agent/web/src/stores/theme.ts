import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'vibepm-web-theme-dark'

function readStoredDark(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function applyDomTheme(dark: boolean) {
  const root = document.documentElement
  if (dark) {
    root.setAttribute('data-theme', 'dark')
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    root.setAttribute('data-theme', 'default')
    document.body.removeAttribute('arco-theme')
  }
}

export const useThemeStore = defineStore('theme', () => {
  const dark = ref(readStoredDark())

  function setDark(value: boolean) {
    dark.value = value
  }

  function toggle() {
    dark.value = !dark.value
  }

  watch(
    dark,
    (value) => {
      applyDomTheme(value)
      try {
        localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
      } catch {
        /* ignore */
      }
    },
    { immediate: true },
  )

  return { dark, setDark, toggle }
})
