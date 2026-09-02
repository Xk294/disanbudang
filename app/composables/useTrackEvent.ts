/**
 * useTrackEvent — fire-and-forget feature usage event tracker.
 * Call trackEvent() when a user actively starts or completes a feature.
 * Failures are silent and never block UX.
 */

type Tool = 'quiz' | 'tour360' | 'audio' | 'map' | 'contribute'
type Action = 'start' | 'complete'

export function useTrackEvent() {
  const { getIdToken } = useAuth()

  async function trackEvent(tool: Tool, action: Action = 'start', heritageId?: string) {
    try {
      const idToken = await getIdToken()
      await $fetch('/api/analytics/event', {
        method: 'POST',
        body: { tool, action, heritage_id: heritageId ?? null, idToken: idToken ?? undefined },
      })
    } catch {
      // Silent — event tracking must not impact UX
    }
  }

  return { trackEvent }
}
