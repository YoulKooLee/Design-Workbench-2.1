import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { Message, Modal } from '@arco-design/web-vue'
import { API_BASE_URL } from '@/utils/env'
import { clearAuth, getToken } from '@/utils/auth'

/**
 * 业务响应约定（README-DEV）：{ code: 200, message, data }
 * 登录过期码兼容 Admin：50008 / 50012 / 50014
 */
export type HttpBody<T = unknown> = {
  code: number
  message?: string
  msg?: string
  data?: T
}

export const HTTP_OK = 200
const AUTH_EXPIRED_CODES = [50008, 50012, 50014]

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

let reLoginPrompting = false

function bodyMessage(body: HttpBody | undefined, fallback: string) {
  return body?.message || body?.msg || fallback
}

function promptReLogin(reason: string) {
  if (reLoginPrompting) return
  reLoginPrompting = true
  Modal.error({
    title: '登录已失效',
    content: reason || '登录状态已过期，请重新登录',
    okText: '重新登录',
    maskClosable: false,
    escToClose: false,
    modalClass: 'pro-content-modal',
    onOk: () => {
      clearAuth()
      reLoginPrompting = false
      const redirect = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`,
      )
      window.location.href = `/login?redirect=${redirect}`
    },
    onClose: () => {
      reLoginPrompting = false
    },
  })
}

function isAuthExpiredCode(code: number) {
  return AUTH_EXPIRED_CODES.includes(code)
}

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const body = response.data as HttpBody | undefined
    // 非 JSON / 无 code 字段（文件流等）原样返回
    if (
      body == null ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      !('code' in body)
    ) {
      return response
    }

    if (body.code === HTTP_OK) {
      return response
    }

    const msg = bodyMessage(body, '请求失败')
    const url = response.config.url || ''
    const isLoginApi = url.includes('/auth/login')

    if (!isLoginApi && (isAuthExpiredCode(body.code) || body.code === 401) && getToken()) {
      promptReLogin(msg)
    } else {
      Message.error({ content: msg, duration: 5 * 1000 })
    }

    return Promise.reject(new Error(msg))
  },
  (error) => {
    const status = error?.response?.status as number | undefined
    const body = error?.response?.data as HttpBody | undefined
    const msg = bodyMessage(body, error?.message || '网络异常，请稍后重试')

    if ((status === 401 || status === 403) && getToken()) {
      promptReLogin(msg)
    } else {
      Message.error({ content: msg, duration: 5 * 1000 })
    }
    return Promise.reject(error)
  },
)

function request<T>(config: AxiosRequestConfig) {
  return instance.request<T>(config)
}

export default {
  get<T>(config: AxiosRequestConfig) {
    return request<T>({ ...config, method: 'GET' })
  },
  post<T>(config: AxiosRequestConfig) {
    return request<T>({ ...config, method: 'POST' })
  },
  put<T>(config: AxiosRequestConfig) {
    return request<T>({ ...config, method: 'PUT' })
  },
  del<T>(config: AxiosRequestConfig) {
    return request<T>({ ...config, method: 'DELETE' })
  },
}
