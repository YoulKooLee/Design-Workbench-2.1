import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { forceInlineDynamicImportsOff } from './vite-plugins/forceInlineDynamicImportsOff';
import { injectStablePageIds } from './vite-plugins/injectStablePageIds';
import { clientPreviewPlugin } from './vite-plugins/clientPreviewPlugin';
import { annotationNavFixPlugin } from './vite-plugins/annotationNavFix';
import { autoStartMakeServerPlugin } from './vite-plugins/autoStartMakeServerPlugin';
import { writeDevServerInfoPlugin } from './vite-plugins/writeDevServerInfoPlugin';
import { axhubComponentEnforcer } from './vite-plugins/axhubComponentEnforcer';
import { websocketPlugin } from './vite-plugins/websocketPlugin';
import { canvasHotUpdateFilterPlugin } from './vite-plugins/canvasHotUpdateFilter';
import { annotationRuntimeOptimizeDepsPlugin } from './vite-plugins/annotationRuntimeOptimizeDeps';
import { createAnnotationSourceMarkdownPlugin } from './vite-plugins/annotationSourceMarkdown';
import {
  MAKE_ENTRIES_RELATIVE_PATH,
} from './vite-plugins/utils/makeConstants';
import {
  readEntriesManifest,
  scanProjectEntries,
  writeEntriesManifestAtomic,
} from './vite-plugins/utils/entriesManifest';

const projectRoot = process.cwd();
const OFFICIAL_CLIENT_DEV_PORT = 51720;

/**
 * 健康检查兜底端点：为预览源 localhost:51720 提供 /health。
 * 背景：批注桥接（WebEditorV2）会在页面加载时探测 /health，此前 Vite 对
 * 未知路径返回 404，产生控制台噪音。该端点仅消除噪音，不替代 32124 上
 * 的 IDE 批注后端服务。
 */
function healthEndpointPlugin(): any {
  return {
    name: 'health-endpoint',
    configureServer(server: any) {
      server.middlewares.use('/health', (_req: any, res: any) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(
          JSON.stringify({
            status: 'ok',
            service: 'axhub-make-preview',
            port: OFFICIAL_CLIENT_DEV_PORT,
            time: new Date().toISOString(),
          }),
        );
      });
    },
  };
}

writeEntriesManifestAtomic(
  projectRoot,
  scanProjectEntries(projectRoot, ['prototypes', 'themes']),
);
const entries = readEntriesManifest(projectRoot);

const entryKey = process.env.ENTRY_KEY;
const jsEntries = entries.js as Record<string, string>;
const htmlEntries = entries.html as Record<string, string>;

const hasSingleEntry = typeof entryKey === 'string' && entryKey.length > 0;
let rollupInput: Record<string, string> = htmlEntries;

if (hasSingleEntry) {
  if (!jsEntries[entryKey as string]) {
    throw new Error(`ENTRY_KEY=${entryKey} was not found in ${MAKE_ENTRIES_RELATIVE_PATH}.`);
  }
  rollupInput = { [entryKey as string]: jsEntries[entryKey as string] };
}

const isIifeBuild = hasSingleEntry;
const devServerWatchIgnored = [
  '**/.axhub/make/**',
  '**/*.assets/**',
  '**/.spec/**',
  '**/*.excalidraw',
];

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';

  const config: any = {
    plugins: [
      // Vitest 4 currently runs on Vite 7, while @tailwindcss/vite resolves
      // against this package's Vite 5. Skip the production-only CSS plugin
      // during test collection so CSS mocks can load without that mismatch.
      process.env.VITEST ? null : tailwindcss(),
      isServe ? canvasHotUpdateFilterPlugin() : null,
      isServe ? healthEndpointPlugin() : null,
      isServe ? annotationRuntimeOptimizeDepsPlugin(projectRoot) : null,
      injectStablePageIds(),
      isServe ? writeDevServerInfoPlugin() : null,
      isServe ? autoStartMakeServerPlugin() : null,
      isServe ? websocketPlugin() : null,
      isServe ? clientPreviewPlugin() : null,
      isServe ? annotationNavFixPlugin() : null,
      createAnnotationSourceMarkdownPlugin(projectRoot, { mode: isServe ? 'serve' : 'build' }),
      forceInlineDynamicImportsOff(isIifeBuild),
      isIifeBuild ? axhubComponentEnforcer(jsEntries[entryKey as string]) : null,
      react({
        jsxRuntime: 'classic',
        babel: { configFile: false, babelrc: false },
      }),
    ].filter(Boolean) as Plugin[],

    root: 'src',
    publicDir: false,
    appType: 'mpa',

    optimizeDeps: {
      include: [
        'lucide-react',
      ],
    },

    resolve: {
      dedupe: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      alias: [
        { find: '@', replacement: path.resolve(projectRoot, 'src') },
        !isIifeBuild && !isServe && fs.existsSync(path.resolve(projectRoot, 'src/common/react-shim.js')) && {
          find: /^react$/,
          replacement: path.resolve(projectRoot, 'src/common/react-shim.js'),
        },
        !isIifeBuild && !isServe && fs.existsSync(path.resolve(projectRoot, 'src/common/react-dom-shim.js')) && {
          find: /^react-dom$/,
          replacement: path.resolve(projectRoot, 'src/common/react-dom-shim.js'),
        },
      ].filter(Boolean) as { find: string | RegExp; replacement: string }[],
    },

    css: {
      preprocessorOptions: {
        scss: { api: 'modern' },
        sass: { api: 'modern' },
      },
    },

    server: {
      port: OFFICIAL_CLIENT_DEV_PORT,
      strictPort: false,
      host: '0.0.0.0',
      open: false,
      cors: true,
      hmr: { overlay: false },
      watch: {
        ignored: devServerWatchIgnored,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      proxy: {
        // 把批注后端(32124)请求改写为同源，规避预览页(51720)跨域 CORS 拦截
        '/__axhub_bridge': {
          target: 'http://localhost:32124',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (p: string) => p.replace(/^\/__axhub_bridge/, ''),
        },
      },
    },

    build: {
      outDir: path.resolve(projectRoot, 'dist'),
      emptyOutDir: !isIifeBuild,
      target: isIifeBuild ? 'es2015' : 'esnext',
      assetsInlineLimit: 1024 * 1024,
      rollupOptions: {
        input: rollupInput,
        external: isIifeBuild ? ['react', 'react-dom'] : [],
        output: {
          entryFileNames: (chunkInfo: { name: string }) => `${chunkInfo.name}.js`,
          format: isIifeBuild ? 'iife' : 'es',
          name: 'UserComponent',
          ...(isIifeBuild
            ? {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
              generatedCode: { constBindings: false },
            }
            : {}),
        },
      },
      minify: isIifeBuild ? 'esbuild' : false,
    },

    esbuild: isIifeBuild
      ? {
        target: 'es2015',
        legalComments: 'none',
        keepNames: true,
      }
      : {
        jsx: 'transform',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
      },

    test: {
      globals: true,
      environment: 'node',
      include: [
        'tests/**/*.test.ts',
        'tests/**/*.test.tsx',
        'scripts/**/*.test.ts',
        'scripts/**/*.test.mjs',
        'vite-plugins/**/*.test.ts',
      ],
      root: '.',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'text-summary', 'json-summary', 'html'],
        reportOnFailure: true,
        include: [
          'src/common/useHashPage.ts',
          'src/common/side-menu/side-menu-utils.ts',
          'scripts/sync-project-metadata.mjs',
          'vite-plugins/**/*.{ts,js}',
        ],
        exclude: [
          '**/*.d.ts',
          '**/*.test.*',
          'src/prototypes/**',
          'src/themes/**',
          'src/common/DesignMdBatchShowcase/**',
          'src/common/ThemeShell/**',
          'src/common/VariantSwitcher.tsx',
          'src/common/axure-types.ts',
          'src/common/config-panel-types.ts',
          'src/common/react-shim.js',
          'src/common/react-dom-shim.js',
          '**/templates/**',
          '**/dist/**',
          '**/node_modules/**',
        ],
      },
    },
  };

  return config;
});
