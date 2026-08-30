/**
 * Cloudflare Turnstile server-side verification.
 * Skipped entirely in dev mode so local development works without site key.
 */

import type { H3Event } from 'h3'

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** Verify a Turnstile widget response token. Throws H3Error on failure. */
export async function verifyTurnstile(
  token: string | undefined,
  ip: string,
): Promise<void> {
  // Skip in local development — no site key configured
  if (import.meta.dev) return

  if (!token) {
    throw createError({ statusCode: 400, message: 'Bot verification token required' })
  }

  const config = useRuntimeConfig()
  const secret = config.turnstileSecretKey
  if (!secret) {
    throw createError({ statusCode: 503, message: 'Turnstile not configured on server' })
  }

  const res = await fetch(SITEVERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  })

  if (!res.ok) {
    throw createError({ statusCode: 503, message: 'Turnstile service unavailable' })
  }

  const data = await res.json() as { success: boolean; 'error-codes'?: string[] }
  if (!data.success) {
    throw createError({ statusCode: 403, message: 'Bot verification failed' })
  }
}

/**
 * Guard a write endpoint: check Origin header + extract CF IP + verify Turnstile.
 * Call this after reading the request body (token is extracted from body by caller).
 *
 * @param event   H3 event
 * @param token   Turnstile response token from request body
 * @returns       { ip } — the real client IP from CF-Connecting-IP
 */
export async function requireClient(
  event: H3Event,
  token: string | undefined,
): Promise<{ ip: string }> {
  // Origin check — prevents cross-site form submissions in production
  if (!import.meta.dev) {
    const origin = getHeader(event, 'origin') ?? ''
    const isAllowedOrigin =
      origin === 'https://disanbudang.com' ||
      origin === 'https://www.disanbudang.com' ||
      origin.endsWith('.disanbudang.pages.dev') ||
      origin.endsWith('.pages.dev')
    if (!isAllowedOrigin) {
      throw createError({ statusCode: 403, message: 'Invalid request origin' })
    }
  }

  // CF-Connecting-IP is injected by Cloudflare — always present on CF network
  const ip =
    getHeader(event, 'cf-connecting-ip') ??
    getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0'

  await verifyTurnstile(token, ip)

  return { ip }
}
