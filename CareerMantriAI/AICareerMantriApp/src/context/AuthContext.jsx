import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'career_mantri_session'

function loadSession() {
  try {
    const rawSession = localStorage.getItem(STORAGE_KEY)
    if (!rawSession) {
      return null
    }

    return JSON.parse(rawSession)
  } catch {
    return null
  }
}

function storeSession(session) {
  if (!session) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession)

  const signIn = (authResponse) => {
    setSession(authResponse)
    storeSession(authResponse)
  }

  const signOut = () => {
    setSession(null)
    storeSession(null)
  }

  const updateUser = (nextUser) => {
    setSession((current) => {
      if (!current) {
        return null
      }

      const updated = {
        ...current,
        user: nextUser,
      }

      storeSession(updated)
      return updated
    })
  }

  const value = useMemo(
    () => ({
      session,
      token: session?.token ?? '',
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.user?.id),
      signIn,
      signOut,
      updateUser,
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
