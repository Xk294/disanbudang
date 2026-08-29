// =========================================================
// UTILS — PROCEDURAL PANORAMA & TEXTURE GENERATOR
// =========================================================
// Tạo canvas equirectangular 360° procedural mượt mà chất lượng cao,
// dùng làm loading preview, fallback khi offline/ảnh lỗi, hoặc demo tour.

export interface ProceduralPanoramaOptions {
  title?: string
  subtitle?: string
  theme?: 'golden-hour' | 'night-campfire' | 'misty-forest' | 'meadow-day'
  width?: number
  height?: number
}

export function createProceduralPanorama(options: ProceduralPanoramaOptions = {}): string {
  if (typeof document === 'undefined') return ''

  const width = options.width || 2048
  const height = options.height || 1024
  const theme = options.theme || 'golden-hour'
  const title = options.title || 'Không Gian Di Sản 360°'
  const subtitle = options.subtitle || 'Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai'

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // ─── 1. Sky Gradient ───
  let skyGrad = ctx.createLinearGradient(0, 0, 0, height)
  if (theme === 'golden-hour') {
    skyGrad.addColorStop(0, '#120c1f') // Zenith deep dusk
    skyGrad.addColorStop(0.3, '#31182c')
    skyGrad.addColorStop(0.48, '#783526')
    skyGrad.addColorStop(0.5, '#C7A664') // Golden horizon
    skyGrad.addColorStop(0.52, '#3a2717')
    skyGrad.addColorStop(0.8, '#1f150e')
    skyGrad.addColorStop(1, '#110b07') // Ground
  }
  else if (theme === 'night-campfire') {
    skyGrad.addColorStop(0, '#050711') // Deep indigo night
    skyGrad.addColorStop(0.45, '#121426')
    skyGrad.addColorStop(0.5, '#2b1b17') // Campfire ambient glow
    skyGrad.addColorStop(0.55, '#221510')
    skyGrad.addColorStop(1, '#0e0806')
  }
  else if (theme === 'misty-forest') {
    skyGrad.addColorStop(0, '#1b2d28')
    skyGrad.addColorStop(0.45, '#3a5048')
    skyGrad.addColorStop(0.5, '#7b958b')
    skyGrad.addColorStop(0.55, '#263a30')
    skyGrad.addColorStop(1, '#131e18')
  }
  else {
    skyGrad.addColorStop(0, '#1c3d5a') // Meadow blue
    skyGrad.addColorStop(0.45, '#5c8ba6')
    skyGrad.addColorStop(0.5, '#d4c79b')
    skyGrad.addColorStop(0.55, '#385e38')
    skyGrad.addColorStop(1, '#1c2e1c')
  }
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, width, height)

  // ─── 2. Stars & Ambient Particles ───
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  for (let i = 0; i < 300; i++) {
    const sx = Math.sin(i * 997.1) * width * 0.5 + width * 0.5
    const sy = Math.abs(Math.sin(i * 433.7)) * height * 0.45
    const sr = (Math.sin(i * 123.4) + 1.2) * 1.2
    ctx.beginPath()
    ctx.arc(sx, sy, sr, 0, Math.PI * 2)
    ctx.fill()
  }

  // ─── 3. Distant Mountain Silhouettes on Horizon ───
  const horizonY = height * 0.5
  ctx.fillStyle = 'rgba(15, 10, 8, 0.45)'
  ctx.beginPath()
  ctx.moveTo(0, horizonY)
  for (let x = 0; x <= width; x += 30) {
    const peak = Math.sin(x * 0.008) * 35 + Math.cos(x * 0.02) * 20 + Math.sin(x * 0.003) * 45
    ctx.lineTo(x, horizonY - Math.abs(peak))
  }
  ctx.lineTo(width, horizonY + 80)
  ctx.lineTo(0, horizonY + 80)
  ctx.closePath()
  ctx.fill()

  // Layer 2: Closer hills and tree line
  ctx.fillStyle = 'rgba(25, 18, 14, 0.75)'
  ctx.beginPath()
  ctx.moveTo(0, horizonY)
  for (let x = 0; x <= width; x += 15) {
    const peak = Math.sin(x * 0.015 + 1.2) * 25 + Math.cos(x * 0.04) * 12
    ctx.lineTo(x, horizonY - Math.abs(peak))
  }
  ctx.lineTo(width, horizonY + 120)
  ctx.lineTo(0, horizonY + 120)
  ctx.closePath()
  ctx.fill()

  // ─── 4. Architectural Silhouettes (Longhouse & Forest) ───
  ctx.fillStyle = 'rgba(12, 8, 6, 0.85)'
  // Traditional Stilt House Roof on Left/Center
  const houseX = width * 0.25
  ctx.beginPath()
  ctx.moveTo(houseX - 120, horizonY + 40)
  ctx.lineTo(houseX, horizonY - 60)
  ctx.lineTo(houseX + 120, horizonY + 40)
  ctx.closePath()
  ctx.fill()

  // ─── 5. Subtle Ambient Horizon Glow ───
  const glowGrad = ctx.createRadialGradient(
    width * 0.5,
    horizonY,
    10,
    width * 0.5,
    horizonY,
    width * 0.45,
  )
  glowGrad.addColorStop(0, 'rgba(199, 166, 100, 0.18)')
  glowGrad.addColorStop(0.5, 'rgba(199, 166, 100, 0.05)')
  glowGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = glowGrad
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL('image/jpeg', 0.85)
}
