const TOKEN_KEY = "steerx_token"

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = (token) => {
  if (!token) return
  localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const storeTokenFromUrl = () => {
  const url = new URL(window.location.href)
  const token = url.searchParams.get("token")

  if (!token) {
    return null
  }

  setToken(token)
  url.searchParams.delete("token")
  const cleanUrl = `${url.pathname}${url.search}${url.hash}`
  window.history.replaceState({}, document.title, cleanUrl)

  return token
}

export const getAuthHeaders = (baseHeaders = {}) => {
  const token = getToken()

  if (!token) {
    return baseHeaders
  }

  return {
    ...baseHeaders,
    Authorization: `Bearer ${token}`
  }
}
