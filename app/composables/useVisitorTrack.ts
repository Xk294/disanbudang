/**
 * useVisitorTrack — auto-tracks page visits on every route change.
 * Fire-and-forget: analytics failures never block UX.
 * Call from default.vue layout inside onMounted to ensure client-only execution.
 *
 * Side-effect: saves totalVisits into useState('siteVisitCount')
 * so any component (e.g. AppTopNav) can read it reactively without extra API calls.
 */

// Global state — shared across all components in the same Nuxt app instance
const siteVisitCount = () => useState<number | null>('siteVisitCount', () => null)

export function useVisitorTrack() {
  if (import.meta.server) return

  const route = useRoute()
  const { getIdToken } = useAuth()
  const visitCount = siteVisitCount()

  async function track(path: string) {
    try {
      const idToken = await getIdToken()
      const referrer = typeof document !== 'undefined' ? (document.referrer?.slice(0, 500) || undefined) : undefined
      const utmSource = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('utm_source') || undefined) : undefined
      const res = await $fetch<{ ok: boolean; totalVisits?: number }>('/api/analytics/visit', {
        method: 'POST',
        body: { path, referrer, utm_source: utmSource, idToken: idToken ?? undefined },
      })
      // Update global counter if the server returned a total
      if (res?.ok && typeof res.totalVisits === 'number') {
        visitCount.value = res.totalVisits
        if (import.meta.client) {
          localStorage.setItem('disanbudang_visit_count', String(res.totalVisits))
        }
      }
    } catch {
      // Silent — analytics must not impact UX
    }
  }

  function startTracking() {
    // Attempt to restore cached count immediately to avoid UI pop
    if (visitCount.value === null && import.meta.client) {
      const cached = localStorage.getItem('disanbudang_visit_count')
      if (cached && !isNaN(Number(cached))) {
        visitCount.value = Number(cached)
      }
    }

    // Track initial page
    track(route.path)

    // Track on subsequent route changes
    watch(() => route.path, (p) => track(p))
  }

  const instance = getCurrentInstance()
  if (instance?.isMounted) {
    startTracking()
  } else {
    onMounted(startTracking)
  }
}

/** Read-only composable for components that only want to display the count */
export function useSiteVisitCount() {
  return siteVisitCount()
}

