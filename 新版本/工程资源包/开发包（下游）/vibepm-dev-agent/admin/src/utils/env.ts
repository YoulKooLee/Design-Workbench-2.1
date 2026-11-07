/** 开发模式或 VITE_USE_MOCK=true 时启用 mockjs（含登录接口） */
const debug =
  import.meta.env.DEV || import.meta.env.VITE_USE_MOCK === 'true';

export default debug;
