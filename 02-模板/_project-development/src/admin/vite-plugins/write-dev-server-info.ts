import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

// Vue 编码工程心跳插件：与 React 原型工程的 writeDevServerInfoPlugin 对齐，
// 每 5 秒把 dev server 信息写入 .axhub/make/.dev-server-info.json，
// 供工作台面板的活体检测（isProjectAlive）与「Vite 端口池」读取。
const HEARTBEAT_INTERVAL_MS = 5_000;
const SERVER_INFO_RELATIVE_PATH = path.join('.axhub', 'make', '.dev-server-info.json');

type DevServerInfo = {
  pid: number;
  port: number;
  host: string;
  origin: string;
  projectRoot: string;
  startedAt: string;
  timestamp: string;
};

function getActualListeningPort(server: any): number | null {
  const address = server?.httpServer?.address?.();
  return address && typeof address === 'object' && typeof address.port === 'number'
    ? address.port
    : null;
}

function writeCurrentDevServerInfo(server: any, startedAt: string): DevServerInfo {
  const port = getActualListeningPort(server) || Number(server.config.server?.port) || 3006;
  const host = 'localhost';
  const info: DevServerInfo = {
    pid: process.pid,
    port,
    host,
    origin: `http://${host}:${port}`,
    projectRoot: path.resolve(process.cwd()),
    startedAt,
    timestamp: new Date().toISOString(),
  };
  const infoPath = path.resolve(process.cwd(), SERVER_INFO_RELATIVE_PATH);
  fs.mkdirSync(path.dirname(infoPath), { recursive: true });
  fs.writeFileSync(infoPath, `${JSON.stringify(info, null, 2)}\n`, 'utf8');
  return info;
}

export function writeDevServerInfoPlugin(): Plugin {
  return {
    name: 'write-dev-server-info',
    configureServer(server: any) {
      const startedAt = new Date().toISOString();
      server.httpServer?.once('listening', () => {
        try {
          writeCurrentDevServerInfo(server, startedAt);
          const heartbeat = setInterval(() => {
            try {
              writeCurrentDevServerInfo(server, startedAt);
            } catch (error) {
              console.error('Failed to refresh dev server info:', error);
            }
          }, HEARTBEAT_INTERVAL_MS);
          heartbeat.unref?.();
          server.httpServer?.once('close', () => {
            clearInterval(heartbeat);
          });
          console.log(`\n✅ Dev server info written to .axhub/make/.dev-server-info.json`);
        } catch (error) {
          console.error('Failed to write dev server info:', error);
        }
      });
    },
  };
}
