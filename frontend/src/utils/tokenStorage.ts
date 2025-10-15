const KEY = 'bookhub_token'

export function getStoredToken(): string | null {
  return localStorage.getItem(KEY)
}

export function setStoredToken(token: string) {
  localStorage.setItem(KEY, token)
}

export function removeStoredToken() {
  localStorage.removeItem(KEY)
}


