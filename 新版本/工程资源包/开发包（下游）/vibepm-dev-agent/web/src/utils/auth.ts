const TOKEN_KEY = 'wa_token'
const USER_KEY = 'wa_user_name'

export function isLogin() {
  return !!localStorage.getItem(TOKEN_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUserName() {
  return localStorage.getItem(USER_KEY) || ''
}

export function setUserName(name: string) {
  localStorage.setItem(USER_KEY, name)
}

export function clearUserName() {
  localStorage.removeItem(USER_KEY)
}

export function clearAuth() {
  clearToken()
  clearUserName()
}
