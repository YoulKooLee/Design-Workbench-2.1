import { USE_MOCK } from '@/utils/env'
import request from '@/utils/http/request'

export type LoginPayload = {
  userName: string
  password: string
}

export type LoginResult = {
  code: number
  message: string
  data?: { token: string; userName: string }
}

/** Mock 成功码与业务约定：200 */
export async function login(payload: LoginPayload): Promise<LoginResult> {
  if (USE_MOCK) {
    const { mockLogin } = await import('@/mock/auth')
    return mockLogin(payload)
  }
  const res = await request.post<LoginResult>({
    url: '/auth/login',
    data: payload,
  })
  return res.data
}
