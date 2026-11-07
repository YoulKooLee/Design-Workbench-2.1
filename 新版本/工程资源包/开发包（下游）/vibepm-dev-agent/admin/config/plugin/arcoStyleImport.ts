/**
 * Theme import
 * 样式按需引入
 * https://github.com/arco-design/arco-plugins/blob/main/packages/plugin-vite-vue/README.md
 * https://arco.design/vue/docs/start
 */
import { vitePluginForArco } from '@arco-plugins/vite-vue';

export default function configArcoStyleImportPlugin() {
  const arcoResolverPlugin = vitePluginForArco({
    // 默认 iconPrefix=icon 会把模板里的 icon-* 编译成 Arco SVG，
    // 与 FA 桥接抢名，顶栏出现 SVG/FA 混用、视觉不齐。
    iconPrefix: 'arco-icon',
  });
  return arcoResolverPlugin;
}
