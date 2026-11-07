/**
 * Listening to routes alone would waste rendering performance. Use the publish-subscribe model for distribution management
 * 单独监听路由会浪费渲染性能。使用发布订阅模式去进行分发管理。
 */
import mitt, { Handler } from 'mitt';
import type { RouteLocationNormalized } from 'vue-router';

const emitter = mitt();

const key = Symbol('ROUTE_CHANGE');

let latestRoute: RouteLocationNormalized;

export function setRouteEmitter(to: RouteLocationNormalized) {
  emitter.emit(key, to);
  latestRoute = to;
}

export function listenerRouteChange(
  handler: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  const bound = handler as Handler;
  emitter.on(key, bound);
  if (immediate && latestRoute) {
    handler(latestRoute);
  }
  return () => {
    emitter.off(key, bound);
  };
}

export function removeRouteListener(
  handler?: (route: RouteLocationNormalized) => void
) {
  if (handler) {
    emitter.off(key, handler as Handler);
    return;
  }
  emitter.off(key);
}
