import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const srcDir = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.VITE_PORT || 3010)

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': srcDir,
      },
    },
    server: {
      port,
      host: true,
    },
    preview: {
      port,
    },
  }
})
