<template>
  <div
    class="royal-scroll-wrapper relative w-full"
    :class="{ 'is-revealed': isCompleted }"
  >
    <!-- SVG Defs for High-End Imperial Gold & Bronze Shaders -->
    <svg class="sr-only" aria-hidden="true">
      <defs>
        <!-- Rich Imperial Roller Baton Metallic Shader -->
        <linearGradient id="royalRollerBaton" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#120A04" />
          <stop offset="15%" stop-color="#38220D" />
          <stop offset="30%" stop-color="#7A521E" />
          <stop offset="48%" stop-color="#D4AF37" />
          <stop offset="55%" stop-color="#FFF8E7" />
          <stop offset="68%" stop-color="#C79F42" />
          <stop offset="85%" stop-color="#5E3E15" />
          <stop offset="100%" stop-color="#1A0F05" />
        </linearGradient>

        <!-- Gold Inlay Rings & Finial Shader -->
        <linearGradient id="royalFinialGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFFDF5" />
          <stop offset="20%" stop-color="#F3DC9B" />
          <stop offset="45%" stop-color="#D4AF37" />
          <stop offset="70%" stop-color="#8C6527" />
          <stop offset="90%" stop-color="#4E3410" />
          <stop offset="100%" stop-color="#241504" />
        </linearGradient>

        <!-- Finial Lotus Jewel Radial Gradient -->
        <radialGradient id="royalFinialJewel" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFF4D0" />
          <stop offset="40%" stop-color="#E5B94C" />
          <stop offset="75%" stop-color="#9E6E1D" />
          <stop offset="100%" stop-color="#3D2506" />
        </radialGradient>

        <!-- Imperial Silk Decree Top & Bottom Brocade Wave Gradient -->
        <linearGradient id="royalSilkWaveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#5E3B0A" />
          <stop offset="10%" stop-color="#9C6B20" />
          <stop offset="25%" stop-color="#DCAE45" />
          <stop offset="50%" stop-color="#FFF0C2" />
          <stop offset="75%" stop-color="#DCAE45" />
          <stop offset="90%" stop-color="#9C6B20" />
          <stop offset="100%" stop-color="#5E3B0A" />
        </linearGradient>

        <!-- Specular Silk Surface Highlight -->
        <linearGradient id="royalSilkShading" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35" />
          <stop offset="15%" stop-color="#D4AF37" stop-opacity="0.15" />
          <stop offset="50%" stop-color="#000000" stop-opacity="0" />
          <stop offset="85%" stop-color="#D4AF37" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.45" />
        </linearGradient>

        <!-- Filigree Metallic Hairline Gradient -->
        <linearGradient id="royalFiligreeLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#9E7836" stop-opacity="0.2" />
          <stop offset="20%" stop-color="#D4AF37" stop-opacity="0.85" />
          <stop offset="50%" stop-color="#FFFDF5" stop-opacity="1" />
          <stop offset="80%" stop-color="#D4AF37" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#9E7836" stop-opacity="0.2" />
        </linearGradient>
      </defs>
    </svg>

    <!-- ═══ REVEALED CONTENT CONTAINER (Unfurls symmetrically from center to edges) ═══ -->
    <div
      class="royal-scroll-content relative w-full h-full"
      :style="contentMaskStyle"
    >
      <!-- ═══ ROYAL IMPERIAL SILK DECREE ARCHITECTURAL BACKDROP ═══ -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-visible">
        <svg
          class="w-full h-full filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] drop-shadow-[0_0_50px_rgba(212,175,55,0.3)]"
          preserveAspectRatio="none"
          viewBox="0 0 1000 660"
          fill="none"
        >
          <!-- Outer Silk Scroll Body with Royal Imperial Curved Arch -->
          <path
            d="M 0,20 Q 250,4 500,16 Q 750,4 1000,20 L 1000,640 Q 750,656 500,644 Q 250,656 0,640 Z"
            fill="url(#royalSilkWaveGrad)"
            stroke="url(#royalFiligreeLine)"
            stroke-width="2.2"
          />

          <!-- 3D Luminous Silk Shading -->
          <path
            d="M 0,20 Q 250,4 500,16 Q 750,4 1000,20 L 1000,640 Q 750,656 500,644 Q 250,656 0,640 Z"
            fill="url(#royalSilkShading)"
          />

          <!-- Inner Deep Obsidian Lacquer Canvas with Rich Texture -->
          <path
            d="M 16,38 Q 250,22 500,34 Q 750,22 984,38 L 984,622 Q 750,638 500,626 Q 250,638 16,622 Z"
            fill="#0B0D13"
            fill-opacity="0.97"
            stroke="url(#royalFiligreeLine)"
            stroke-width="1.4"
          />

          <!-- Subtle Imperial Brocade / Watermark Medallion (Centered behind title) -->
          <g opacity="0.12" stroke="#D4AF37" stroke-width="1.2" fill="none">
            <circle cx="500" cy="310" r="160" stroke-dasharray="8 6" />
            <circle cx="500" cy="310" r="130" stroke-width="0.8" />
            <circle cx="500" cy="310" r="100" stroke-dasharray="4 4" />
            <circle cx="500" cy="310" r="30" stroke-width="1.5" />
            <!-- Royal Lotus Petal Vectors -->
            <path d="M 500,150 Q 530,230 500,310 Q 470,230 500,150 Z" />
            <path d="M 500,470 Q 530,390 500,310 Q 470,390 500,470 Z" />
            <path d="M 340,310 Q 420,280 500,310 Q 420,340 340,310 Z" />
            <path d="M 660,310 Q 580,280 500,310 Q 580,340 660,310 Z" />
          </g>

          <!-- Top & Bottom Golden Silk Edge Ribbons -->
          <path
            d="M 0,20 Q 250,4 500,16 Q 750,4 1000,20"
            stroke="url(#royalFiligreeLine)"
            stroke-width="3"
            stroke-linecap="round"
          />
          <path
            d="M 0,640 Q 750,656 500,644 Q 250,656 0,640"
            stroke="url(#royalFiligreeLine)"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <!-- Main Slotted Content inside the Sắc Phong -->
      <div class="relative z-10 w-full h-full">
        <slot />
      </div>
    </div>

    <!-- ═══ TOP & BOTTOM METALLIC FILIGREE BORDER ACCENTS ═══ -->
    <div
      class="parchment-frame absolute inset-y-0 pointer-events-none z-20 overflow-hidden"
      :style="parchmentFrameStyle"
      aria-hidden="true"
    >
      <!-- Top Scalloped Hairline Trim -->
      <div class="absolute top-0 inset-x-0 h-6 flex items-center justify-center pointer-events-none">
        <div class="absolute top-1 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5B94C]/80 to-transparent" />
      </div>

      <!-- Bottom Scalloped Hairline Trim -->
      <div class="absolute bottom-0 inset-x-0 h-6 flex items-center justify-center pointer-events-none">
        <div class="absolute bottom-1 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5B94C]/80 to-transparent" />
      </div>

      <!-- 4 Ornate Royal Lotus Corner Filigrees -->
      <svg class="corner-filigree corner-tl" viewBox="0 0 48 48" fill="none">
        <path d="M4 44V18C4 10.268 10.268 4 18 4H44" stroke="url(#royalFiligreeLine)" stroke-width="2" stroke-linecap="round" />
        <path d="M8 40V20C8 13.373 13.373 8 20 8H40" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-opacity="0.85" stroke-linecap="round" />
        <path d="M4 26C8 26 14 24 14 18C14 12 18 14 26 4" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="10" cy="10" r="2.8" fill="#FFF0C2" />
        <circle cx="26" cy="10" r="1.8" fill="#D4AF37" />
        <circle cx="10" cy="26" r="1.8" fill="#D4AF37" />
      </svg>
      <svg class="corner-filigree corner-tr" viewBox="0 0 48 48" fill="none">
        <path d="M4 44V18C4 10.268 10.268 4 18 4H44" stroke="url(#royalFiligreeLine)" stroke-width="2" stroke-linecap="round" />
        <path d="M8 40V20C8 13.373 13.373 8 20 8H40" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-opacity="0.85" stroke-linecap="round" />
        <path d="M4 26C8 26 14 24 14 18C14 12 18 14 26 4" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="10" cy="10" r="2.8" fill="#FFF0C2" />
        <circle cx="26" cy="10" r="1.8" fill="#D4AF37" />
        <circle cx="10" cy="26" r="1.8" fill="#D4AF37" />
      </svg>
      <svg class="corner-filigree corner-bl" viewBox="0 0 48 48" fill="none">
        <path d="M4 44V18C4 10.268 10.268 4 18 4H44" stroke="url(#royalFiligreeLine)" stroke-width="2" stroke-linecap="round" />
        <path d="M8 40V20C8 13.373 13.373 8 20 8H40" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-opacity="0.85" stroke-linecap="round" />
        <path d="M4 26C8 26 14 24 14 18C14 12 18 14 26 4" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="10" cy="10" r="2.8" fill="#FFF0C2" />
        <circle cx="26" cy="10" r="1.8" fill="#D4AF37" />
        <circle cx="10" cy="26" r="1.8" fill="#D4AF37" />
      </svg>
      <svg class="corner-filigree corner-br" viewBox="0 0 48 48" fill="none">
        <path d="M4 44V18C4 10.268 10.268 4 18 4H44" stroke="url(#royalFiligreeLine)" stroke-width="2" stroke-linecap="round" />
        <path d="M8 40V20C8 13.373 13.373 8 20 8H40" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-opacity="0.85" stroke-linecap="round" />
        <path d="M4 26C8 26 14 24 14 18C14 12 18 14 26 4" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="10" cy="10" r="2.8" fill="#FFF0C2" />
        <circle cx="26" cy="10" r="1.8" fill="#D4AF37" />
        <circle cx="10" cy="26" r="1.8" fill="#D4AF37" />
      </svg>
    </div>

    <!-- ═══ ROYAL CEREMONIAL SEAL / EMBLEM (Unlocks & Dissolves as Scroll Unfurls) ═══ -->
    <div
      v-if="sealOpacity > 0.01"
      class="ceremonial-seal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center justify-center text-center"
      :style="sealStyle"
      aria-hidden="true"
    >
      <div class="relative w-24 h-24 sm:w-30 sm:h-30 rounded-full p-1 bg-gradient-to-br from-[#FFF0C2] via-[#D4AF37] to-[#4E3410] shadow-[0_0_60px_rgba(212,175,55,0.7)] flex items-center justify-center">
        <div class="w-full h-full rounded-full bg-[#120B04]/95 border-2 border-[#D4AF37]/90 flex flex-col items-center justify-center p-2 text-center shadow-inner">
          <svg class="w-7 h-7 sm:w-9 sm:h-9 mb-1 text-[#D4AF37] animate-pulse" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="14" fill="#FFF0C2" />
            <polygon points="50,10 55,30 45,30" fill="#D4AF37" />
            <polygon points="50,90 55,70 45,70" fill="#D4AF37" />
            <polygon points="10,50 30,55 30,45" fill="#D4AF37" />
            <polygon points="90,50 70,55 70,45" fill="#D4AF37" />
            <polygon points="22,22 38,34 31,41" fill="#D4AF37" />
            <polygon points="78,78 62,66 69,59" fill="#D4AF37" />
            <polygon points="78,22 66,38 59,31" fill="#D4AF37" />
            <polygon points="22,78 34,62 41,69" fill="#D4AF37" />
          </svg>
          <span class="text-[8px] sm:text-[9.5px] font-heading font-extrabold uppercase tracking-[0.24em] text-[#FFF0C2] leading-tight">
            SẮC PHONG
          </span>
          <span class="text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-[#D4AF37] mt-0.5 font-bold">
            BÙ ĐĂNG
          </span>
        </div>
      </div>
    </div>

    <!-- ═══ LEFT IMPERIAL CYLINDRICAL ROLLER (Sleek, High-Luster Bronze-Gold Baton) ═══ -->
    <div
      class="imperial-roller imperial-roller-left absolute -top-5 -bottom-5 sm:-top-7 sm:-bottom-7 z-25 w-6 sm:w-7.5 flex items-center justify-center select-none pointer-events-none"
      :style="leftRollerStyle"
      aria-hidden="true"
    >
      <svg class="w-full h-full filter drop-shadow-[5px_0_16px_rgba(0,0,0,0.9)] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" viewBox="0 0 28 600" preserveAspectRatio="none" fill="none">
        <!-- Main Metallic Cylinder Shaft -->
        <rect x="6" y="28" width="16" height="544" rx="2" fill="url(#royalRollerBaton)" stroke="#1A0F05" stroke-width="0.8" />
        <rect x="8" y="28" width="4" height="544" fill="#FFFDF5" fill-opacity="0.4" />
        <rect x="18" y="28" width="2" height="544" fill="#000000" fill-opacity="0.35" />
        
        <!-- Golden Inlay Rings on Shaft -->
        <rect x="5" y="110" width="18" height="3.5" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="5" y="220" width="18" height="3.5" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="5" y="330" width="18" height="3.5" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="5" y="440" width="18" height="3.5" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />

        <!-- Top Lotus Finial Cap with Glowing Jewel Tip -->
        <g transform="translate(0, 0)">
          <path d="M5 28 C5 24, 23 24, 23 28 L25 26 C27 20, 23 12, 14 8 C5 12, 1 20, 3 26 Z" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.8" />
          <ellipse cx="14" cy="5" rx="4.5" ry="5.5" fill="url(#royalFinialJewel)" stroke="#5E3E15" stroke-width="0.8" />
          <circle cx="14" cy="2" r="1.8" fill="#FFFDF5" />
        </g>

        <!-- Bottom Lotus Finial Cap with Glowing Jewel Tip -->
        <g transform="translate(0, 572)">
          <path d="M5 0 C5 4, 23 4, 23 0 L25 2 C27 8, 23 16, 14 20 C5 16, 1 8, 3 2 Z" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.8" />
          <ellipse cx="14" cy="23" rx="4.5" ry="5.5" fill="url(#royalFinialJewel)" stroke="#5E3E15" stroke-width="0.8" />
          <circle cx="14" cy="26" r="1.8" fill="#FFFDF5" />
        </g>
      </svg>
    </div>

    <!-- ═══ RIGHT IMPERIAL CYLINDRICAL ROLLER (Sleek, High-Luster Bronze-Gold Baton) ═══ -->
    <div
      class="imperial-roller imperial-roller-right absolute -top-5 -bottom-5 sm:-top-7 sm:-bottom-7 z-25 w-6 sm:w-7.5 flex items-center justify-center select-none pointer-events-none"
      :style="rightRollerStyle"
      aria-hidden="true"
    >
      <svg class="w-full h-full filter drop-shadow-[-5px_0_16px_rgba(0,0,0,0.9)] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" viewBox="0 0 28 600" preserveAspectRatio="none" fill="none">
        <rect x="6" y="28" width="16" height="544" rx="2" fill="url(#royalRollerBaton)" stroke="#1A0F05" stroke-width="0.8" />
        <rect x="8" y="28" width="4" height="544" fill="#FFFDF5" fill-opacity="0.4" />
        <rect x="18" y="28" width="2" height="544" fill="#000000" fill-opacity="0.35" />
        
        <rect x="5" y="110" width="18" height="3.5" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="5" y="220" width="18" height="3.5" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="5" y="330" width="18" height="3.5" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="5" y="440" width="18" height="3.5" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />

        <g transform="translate(0, 0)">
          <path d="M5 28 C5 24, 23 24, 23 28 L25 26 C27 20, 23 12, 14 8 C5 12, 1 20, 3 26 Z" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.8" />
          <ellipse cx="14" cy="5" rx="4.5" ry="5.5" fill="url(#royalFinialJewel)" stroke="#5E3E15" stroke-width="0.8" />
          <circle cx="14" cy="2" r="1.8" fill="#FFFDF5" />
        </g>

        <g transform="translate(0, 572)">
          <path d="M5 0 C5 4, 23 4, 23 0 L25 2 C27 8, 23 16, 14 20 C5 16, 1 8, 3 2 Z" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.8" />
          <ellipse cx="14" cy="23" rx="4.5" ry="5.5" fill="url(#royalFinialJewel)" stroke="#5E3E15" stroke-width="0.8" />
          <circle cx="14" cy="26" r="1.8" fill="#FFFDF5" />
        </g>
      </svg>
    </div>

  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'complete'): void
}>()

// Animation state
const progress = ref(0) // 0.0 to 1.0
const isCompleted = ref(false)
const sealOpacity = ref(1)

// Motion settings: Effortless royal scroll gliding
const INITIAL_PAUSE_MS = 300
const DURATION_MS = 2800

function easeImperial(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(1 - t, 3.2)
}

let animFrameId: number | null = null

function runScrollEntrance() {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progress.value = 1
    sealOpacity.value = 0
    isCompleted.value = true
    emit('complete')
    return
  }

  const startTime = performance.now() + INITIAL_PAUSE_MS

  function step(now: number) {
    if (now < startTime) {
      animFrameId = requestAnimationFrame(step)
      return
    }

    const elapsed = now - startTime
    const rawProgress = Math.min(elapsed / DURATION_MS, 1)
    const eased = easeImperial(rawProgress)

    progress.value = eased

    // Seal unlocks & fades out gently during initial 25% of movement
    if (rawProgress < 0.25) {
      sealOpacity.value = Math.max(0, 1 - (rawProgress / 0.25) * 1.15)
    } else {
      sealOpacity.value = 0
    }

    if (rawProgress < 1) {
      animFrameId = requestAnimationFrame(step)
    } else {
      progress.value = 1
      isCompleted.value = true
      emit('complete')
    }
  }

  animFrameId = requestAnimationFrame(step)
}

onMounted(() => {
  nextTick(() => {
    runScrollEntrance()
  })
})

onUnmounted(() => {
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId)
  }
})

// Content Mask: expands symmetrically from center (50%) to full width (0% to 100%)
const contentMaskStyle = computed(() => {
  if (isCompleted.value) {
    return {
      clipPath: 'none',
      WebkitClipPath: 'none',
    }
  }
  const sideInset = (1 - progress.value) * 50
  return {
    clipPath: `inset(0% ${sideInset}% 0% ${sideInset}%)`,
    WebkitClipPath: `inset(0% ${sideInset}% 0% ${sideInset}%)`,
    willChange: 'clip-path',
  }
})

// Left Roller Style: travels from center (50%) to left edge (0%)
const leftRollerStyle = computed(() => {
  const p = progress.value
  const leftPos = (1 - p) * 50
  const tx = -100 + p * 50
  return {
    left: `${leftPos}%`,
    transform: `translateX(${tx}%)`,
    willChange: 'left, transform',
  }
})

// Right Roller Style: travels from center (50%) to right edge (100%)
const rightRollerStyle = computed(() => {
  const p = progress.value
  const rightPos = 50 + p * 50
  const tx = -p * 50
  return {
    left: `${rightPos}%`,
    transform: `translateX(${tx}%)`,
    willChange: 'left, transform',
  }
})

// Parchment Frame Style: spans between left and right rollers
const parchmentFrameStyle = computed(() => {
  const p = progress.value
  const sideInset = (1 - p) * 50
  return {
    left: `${sideInset}%`,
    right: `${sideInset}%`,
    opacity: '1',
  }
})

// Ceremonial Seal Style
const sealStyle = computed(() => {
  const scale = 1 + (1 - sealOpacity.value) * 0.12
  return {
    opacity: sealOpacity.value,
    transform: `translate(-50%, -50%) scale(${scale})`,
    filter: `blur(${(1 - sealOpacity.value) * 4}px)`,
  }
})
</script>

<style scoped>
.royal-scroll-wrapper {
  transform: none;
}

/* ── Corner Filigrees ── */
.corner-filigree {
  position: absolute;
  width: 38px;
  height: 38px;
  pointer-events: none;
  z-index: 22;
  filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.5));
}
.corner-tl {
  top: 6px;
  left: 6px;
}
.corner-tr {
  top: 6px;
  right: 6px;
  transform: scaleX(-1);
}
.corner-bl {
  bottom: 6px;
  left: 6px;
  transform: scaleY(-1);
}
.corner-br {
  bottom: 6px;
  right: 6px;
  transform: scale(-1);
}
</style>
