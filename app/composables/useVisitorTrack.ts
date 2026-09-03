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

function getSessionInboundInfo(): { referrer?: string; utmSource?: string } {
  if (typeof window === 'undefined') return {}

  const SESSION_KEY = 'dsbd_session_traffic_v1'
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        referrer: parsed.referrer || undefined,
        utmSource: parsed.utmSource || undefined,
      }
    }
  } catch {}

  let utmSource: string | undefined
  let referrer: string | undefined

  try {
    const params = new URLSearchParams(window.location.search)
    const utm = params.get('utm_source') || params.get('ref') || params.get('source')
    if (utm) {
      utmSource = utm.slice(0, 100)
    }

    const rawRef = typeof document !== 'undefined' ? document.referrer : ''
    if (rawRef) {
      try {
        const refUrl = new URL(rawRef)
        const currentHost = window.location.hostname
        if (
          refUrl.hostname !== currentHost &&
          !refUrl.hostname.endsWith('.disanbudang.pages.dev') &&
          !refUrl.hostname.includes('disanbudang.com') &&
          refUrl.hostname !== 'localhost' &&
          refUrl.hostname !== '127.0.0.1'
        ) {
          referrer = rawRef.slice(0, 500)
        }
      } catch {
        if (!rawRef.includes(window.location.hostname)) {
          referrer = rawRef.slice(0, 500)
        }
      }
    }

    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        utmSource: utmSource || null,
        referrer: referrer || null,
        capturedAt: Date.now(),
      })
    )
  } catch {}

  return { referrer, utmSource }
}

export function useVisitorTrack() {
  if (import.meta.server) return

  const route = useRoute()
  const { getIdToken } = useAuth()
  const visitCount = siteVisitCount()

  async function track(path: string) {
    if (!path || path.startsWith('/admin')) return

    try {
      const idToken = await getIdToken()
      const { referrer, utmSource } = getSessionInboundInfo()

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

