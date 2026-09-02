export default defineNuxtRouteMiddleware(async (to) => {
  if (!import.meta.client) return

  const cleanPath = to.path.replace(/\/+$/, '')

  // Allow visiting /admin/login freely (page handles logged-in redirect via watcher)
  if (cleanPath === '/admin/login') {
    return
  }

  const { authReady, isAdmin, initAuthListener } = useAuth()
  initAuthListener()

  if (!authReady.value) {
    await new Promise<void>((resolve) => {
      const stop = watch(authReady, (ready) => {
        if (ready) {
          stop()
          resolve()
        }
      })
      // Safety timeout: don't hang navigation indefinitely if offline
      setTimeout(() => {
        stop()
        resolve()
      }, 2500)
    })
  }

  // Guard all protected admin routes
  if (!isAdmin.value) {
    return navigateTo('/admin/login')
  }
})
