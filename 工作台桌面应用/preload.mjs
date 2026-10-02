// 产品设计工作台 · 预加载脚本（上下文隔离桥）
// 向渲染进程暴露最小 API 面：面板请求代理 + 窗口控制。
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('workbench', {
  // 统一 API 代理：api('GET'|'POST'|'PUT'|'DELETE', path, body?) -> { status, data }
  api: (method, path, body) => ipcRenderer.invoke('api:request', { method, path, body }),
  // 窗口控制：minimize / maximize-toggle / close / is-maximized
  winControl: (action) => ipcRenderer.invoke('win:control', action),
  // 服务健康探测（localhost:<port>/api/health）
  healthCheck: (port) => ipcRenderer.invoke('health:check', port),
  // 外部浏览器打开（组件预览等）
  openExternal: (url) => ipcRenderer.invoke('open:external', url),
  // 剪贴板写入（复制提示词等）
  copyText: (text) => ipcRenderer.invoke('clipboard:write', text),
  // 选择文件夹（知识库存放位置；默认定位知识库根目录，返回相对路径）
  pickFolder: () => ipcRenderer.invoke('folder:pick'),
  // 打开协作房间产物文件夹（09-协作/rooms/<房间名>/产物）
  openRoomArtifacts: (roomName) => ipcRenderer.invoke('folder:open-artifacts', roomName),
  // 最大化状态变化订阅
  onMaximized: (cb) => {
    ipcRenderer.on('win:maximized', (_e, v) => cb(v));
  },
});
