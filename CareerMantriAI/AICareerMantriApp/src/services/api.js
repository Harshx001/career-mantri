const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

async function request(path, options = {}) {
  const { body, headers: customHeaders, ...restOptions } = options
  const headers = new Headers(customHeaders ?? {})

  if (body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const contentType = response.headers.get('content-type') ?? ''
  let payload = {}

  if (contentType.includes('application/json')) {
    payload = await response.json()
  } else if (response.status !== 204) {
    payload = { message: await response.text() }
  }

  if (!response.ok) {
    const error = new Error(payload.message ?? 'Request failed')
    error.details = payload.fieldErrors ?? {}
    throw error
  }

  return payload
}

export const authApi = {
  signup: (payload) =>
    request('/auth/signup', {
      method: 'POST',
      body: payload,
    }),
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: payload,
    }),
}

export const userApi = {
  getProfile: (userId) => request(`/users/${userId}`),
  updateProfile: (userId, payload) =>
    request(`/users/${userId}`, {
      method: 'PUT',
      body: payload,
    }),
}

export const courseApi = {
  list: (tag) => {
    if (tag) {
      return request(`/courses?tag=${encodeURIComponent(tag)}`)
    }

    return request('/courses')
  },
}

export const recommendationApi = {
  generate: (payload) =>
    request('/recommendations', {
      method: 'POST',
      body: payload,
    }),
  getForUser: (userId) => request(`/recommendations/user/${userId}`),
}

export const healthApi = {
  get: () => request('/recommendations/health'),
}
