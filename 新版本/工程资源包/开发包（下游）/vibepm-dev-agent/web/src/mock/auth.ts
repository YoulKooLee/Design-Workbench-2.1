import type { LoginPayload, LoginResult } from '@/api/auth'

/** 对照母版 login-shell：admin / 123456 */
export function mockLogin(payload: LoginPayload): Promise<LoginResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (payload.userName === 'admin' && payload.password === '123456') {
        resolve({
          code: 200,
          message: 'success',
          data: { token: 'mock-token', userName: payload.userName },
        })
        return
      }
      resolve({
        code: 401,
        message: '账号或密码错误（Mock：admin / 123456）',
      })
    }, 280)
  })
}
