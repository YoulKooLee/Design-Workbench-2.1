import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

/**
 * HTTP 封装。业务 API 应通过本模块发请求，禁止裸 fetch。
 * 登录等 Pro 既有接口仍可直接使用 axios（走 interceptor，code=20000）。
 */
function request<T>(config: AxiosRequestConfig) {
  return axios.request<T>(config);
}

export default {
  get<T>(config: AxiosRequestConfig) {
    return request<T>({ ...config, method: 'GET' });
  },
  post<T>(config: AxiosRequestConfig) {
    return request<T>({ ...config, method: 'POST' });
  },
  put<T>(config: AxiosRequestConfig) {
    return request<T>({ ...config, method: 'PUT' });
  },
  del<T>(config: AxiosRequestConfig) {
    return request<T>({ ...config, method: 'DELETE' });
  },
};
