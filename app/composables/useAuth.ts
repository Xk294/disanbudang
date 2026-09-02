/**
 * useAuth — single boundary for Firebase Auth.
 * Per RULE-stack-akiNuxtCf: composable is the ONLY place that imports Firebase SDK.
 * Pages/layouts call composable functions only.
 *
 * Usage:
 *   const { user, isAdmin, initAuthListener, signInWithGoogle, signOut, getIdToken } = useAuth()
 *
 * initAuthListener() should be called ONCE from /me or /admin layouts (client-only, SPA routes).
 */

import type { User } from 'firebase/auth'

type Result<T> = { ok: true; data: T } | { ok: false; error: string }

export function useAuth() {
  const config = useRuntimeConfig()
  const ADMIN_EMAIL = config.public.adminEmail as string

  // Shared state across all composable instances (SSR-safe)
  const user = useState<User | null>('auth.user', () => null)
  const authReady = useState<boolean>('auth.ready', () => false)
  const isAdmin = computed(() => {
    const email = user.value?.email?.trim().toLowerCase()
    return Boolean(email && email === ADMIN_EMAIL.trim().toLowerCase())
  })

  /** Set up onAuthStateChanged listener. Must be called inside onMounted (client-only). */
  function initAuthListener() {
    if (!import.meta.client) return

    const { $auth } = useNuxtApp() as { $auth: import('firebase/auth').Auth }
    import('firebase/auth').then(({ onAuthStateChanged }) => {
      onAuthStateChanged($auth, (u) => {
        user.value = u
        authReady.value = true
      })
    })
  }

  /** Get a fresh Firebase ID token (auto-refreshes if near expiry). */
  async function getIdToken(): Promise<string | null> {
    if (!user.value) return null
    try {
      return await user.value.getIdToken()
    } catch {
      return null
    }
  }

  /** Sign in with Google popup. Returns Result<User>. */
  async function signInWithGoogle(): Promise<Result<User>> {
    if (!import.meta.client) return { ok: false, error: 'Client only' }
    const { $auth } = useNuxtApp() as { $auth: import('firebase/auth').Auth }
    try {
      const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup($auth, provider)
      user.value = result.user
      return { ok: true, data: result.user }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Đăng nhập Google thất bại'
      return { ok: false, error: msg }
    }
  }

  /** Sign in with Facebook popup. Returns Result<User>. */
  async function signInWithFacebook(): Promise<Result<User>> {
    if (!import.meta.client) return { ok: false, error: 'Client only' }
    const { $auth } = useNuxtApp() as { $auth: import('firebase/auth').Auth }
    try {
      const { FacebookAuthProvider, signInWithPopup } = await import('firebase/auth')
      const provider = new FacebookAuthProvider()
      const result = await signInWithPopup($auth, provider)
      user.value = result.user
      return { ok: true, data: result.user }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Đăng nhập Facebook thất bại'
      return { ok: false, error: msg }
    }
  }

  /** Sign out from Firebase. */
  async function signOut() {
    if (!import.meta.client) return
    const { $auth } = useNuxtApp() as { $auth: import('firebase/auth').Auth }
    const { signOut: fbSignOut } = await import('firebase/auth')
    await fbSignOut($auth)
    user.value = null
    authReady.value = false
  }

  /**
   * Sync current Firebase user to D1 via /api/me/sync.
   * Call after successful sign-in.
   */
  async function syncUserToDb(): Promise<void> {
    const token = await getIdToken()
    if (!token) return
    try {
      await $fetch('/api/me/sync', { method: 'POST', body: { idToken: token } })
    } catch (e) {
      console.error('[useAuth] syncUserToDb failed:', e)
    }
  }

  return {
    user,
    authReady,
    isAdmin,
    initAuthListener,
    getIdToken,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    syncUserToDb,
  }
}

