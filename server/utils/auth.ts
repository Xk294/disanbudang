/**
 * Firebase ID Token verification via GCP public keys.
 * Uses crypto.subtle (native Cloudflare Workers API) — no firebase-admin required.
 *
 * Flow:
 *  1. Fetch Google JWKS endpoint (module-level cache, 1h TTL)
 *  2. Decode JWT header → find key by kid
 *  3. Verify RS256 signature with crypto.subtle
 *  4. Verify claims: iss, aud, exp, sub
 *  5. For requireAdmin: also verify email is in ADMIN_EMAILS
 */

import type { H3Event } from 'h3'

const FIREBASE_PROJECT_ID = 'disanbudang'
const JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'

// Admin emails — hardcoded per design decision (single admin, public repo)
const ADMIN_EMAILS = ['nguyenxuankiet294@gmail.com']

export interface FirebaseClaims {
  uid: string
  email: string
  name?: string
  picture?: string
  email_verified: boolean
  iat: number
  exp: number
  firebase?: {
    sign_in_provider: string
    identities?: Record<string, string[]>
  }
}

interface JwkKey {
  kty: string
  kid: string
  n: string
  e: string
  alg: string
  use: string
}

// Module-level key cache — persists across requests in the same CF isolate
let keyCache: Map<string, CryptoKey> | null = null
let keyCachedAt = 0
const KEY_CACHE_TTL_MS = 60 * 60 * 1000 // 1h — Google rotates keys every ~7d

async function getPublicKeys(): Promise<Map<string, CryptoKey>> {
  const now = Date.now()
  if (keyCache && now - keyCachedAt < KEY_CACHE_TTL_MS) return keyCache

  const res = await fetch(JWKS_URL)
  if (!res.ok) {
    throw createError({ statusCode: 503, message: 'Cannot fetch Firebase public keys' })
  }

  const jwks = await res.json() as { keys: JwkKey[] }
  const map = new Map<string, CryptoKey>()

  for (const jwk of jwks.keys) {
    const key = await crypto.subtle.importKey(
      'jwk',
      jwk,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify'],
    )
    map.set(jwk.kid, key)
  }

  keyCache = map
  keyCachedAt = now
  return map
}

/** Decode base64url string to Uint8Array */
function b64urlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

/** Verify a Firebase ID token and return its claims. Throws H3Error on failure. */
export async function verifyFirebaseToken(token: string): Promise<FirebaseClaims> {
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw createError({ statusCode: 401, message: 'Invalid token format' })
  }

  const headerB64 = parts[0]!
  const payloadB64 = parts[1]!
  const sigB64 = parts[2]!

  // Decode header
  let header: { alg: string; kid: string }
  try {
    header = JSON.parse(new TextDecoder().decode(b64urlDecode(headerB64)))
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid token header' })
  }

  if (header.alg !== 'RS256') {
    throw createError({ statusCode: 401, message: 'Unsupported token algorithm' })
  }

  // Get matching public key
  const keys = await getPublicKeys()
  const key = keys.get(header.kid)
  if (!key) {
    // kid mismatch often means keys were rotated — flush cache and retry once
    keyCache = null
    const freshKeys = await getPublicKeys()
    if (!freshKeys.get(header.kid)) {
      throw createError({ statusCode: 401, message: 'Unknown key ID' })
    }
  }
  const cryptoKey = keys.get(header.kid) ?? (await getPublicKeys()).get(header.kid)!

  // Verify signature
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`)
  const sigRaw = b64urlDecode(sigB64)
  // Cast to ArrayBuffer-backed Uint8Array to satisfy crypto.subtle.verify overload
  const sig = new Uint8Array(sigRaw.buffer as ArrayBuffer, sigRaw.byteOffset, sigRaw.byteLength)
  const dataRaw = data
  const dataFixed = new Uint8Array(dataRaw.buffer as ArrayBuffer, dataRaw.byteOffset, dataRaw.byteLength)
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', cryptoKey, sig, dataFixed)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Invalid token signature' })
  }

  // Decode payload
  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(new TextDecoder().decode(b64urlDecode(payloadB64)))
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid token payload' })
  }

  // Verify standard claims
  const now = Math.floor(Date.now() / 1000)
  if ((payload.exp as number) < now) {
    throw createError({ statusCode: 401, message: 'Token expired' })
  }
  if (payload.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`) {
    throw createError({ statusCode: 401, message: 'Invalid token issuer' })
  }
  if (payload.aud !== FIREBASE_PROJECT_ID) {
    throw createError({ statusCode: 401, message: 'Invalid token audience' })
  }
  if (!payload.sub) {
    throw createError({ statusCode: 401, message: 'Missing token subject' })
  }

  return {
    uid: payload.sub as string,
    email: payload.email as string,
    name: payload.name as string | undefined,
    picture: payload.picture as string | undefined,
    email_verified: Boolean(payload.email_verified),
    iat: payload.iat as number,
    exp: payload.exp as number,
    firebase: payload.firebase as FirebaseClaims['firebase'],
  }
}

/**
 * Extract and verify a Firebase ID token from Authorization: Bearer <token>.
 * Throws 401/403 on any failure. Used for all authenticated admin routes.
 */
export async function requireAdmin(event: H3Event): Promise<FirebaseClaims> {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'Missing or invalid Authorization header' })
  }

  const token = authHeader.slice(7).trim()
  const claims = await verifyFirebaseToken(token)

  const email = (claims.email || '').trim().toLowerCase()
  if (!ADMIN_EMAILS.some(adminEmail => adminEmail.trim().toLowerCase() === email)) {
    throw createError({ statusCode: 403, message: 'Forbidden: admin access only' })
  }

  return claims
}
