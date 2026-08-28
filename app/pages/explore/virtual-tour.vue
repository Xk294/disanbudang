<template>
  <div class="virtual-tour" :class="{ 'is-fullscreen': isFullscreen }">
    <h1 class="sr-only">Tham Quan Ảo Trảng Cỏ Bù Lạch & Sóc Bom Bo</h1>

    <!-- ─────────────────────────── VIDEO BACKDROP ─────────────────────────── -->
    <div class="video-backdrop">
      <!-- Chapter A: Bom Bo (default chapter — loads & autoplays first) -->
      <video
        ref="videoA"
        class="bg-video"
        :class="{ 'is-active': activeChapter === 'bom-bo' }"
        src="/video/virtual-tour/bom-bo/bom-bo-trailer.mp4"
        :poster="activeChapter === 'bom-bo' ? '/video/virtual-tour/bom-bo/poster.jpg' : ''"
        preload="auto"
        muted
        playsinline
        loop
      />
      <!-- Chapter B: Trảng Cỏ — src only attached once the user has started the
           tour, so this 2nd video never competes for bandwidth with Chapter A
           on first load; browser starts fetching it lazily in the background. -->
      <video
        v-if="videoBSrc"
        ref="videoB"
        class="bg-video"
        :class="{ 'is-active': activeChapter === 'trang-co' }"
        :src="videoBSrc"
        :poster="activeChapter === 'trang-co' ? '/video/virtual-tour/trang-co/poster.jpg' : ''"
        preload="auto"
        muted
        playsinline
        loop
      />

      <!-- Cinematic vignette overlay -->
      <div class="vignette" />
      <!-- Bottom gradient for UI readability -->
      <div class="bottom-gradient" />
      <!-- Top gradient for UI readability -->
      <div class="top-gradient" />
    </div>

    <!-- ─────────────────────────── TOP BAR ─────────────────────────── -->
    <div class="top-bar">
      <!-- Back link -->
      <NuxtLink to="/explore" class="back-btn" title="Quay lại">
        <Icon name="mdi:arrow-left" class="w-5 h-5" />
        <span class="hidden sm:inline">Khám Phá</span>
      </NuxtLink>

      <!-- Chapter selector -->
      <div class="chapter-tabs">
        <button
          v-for="ch in chapters"
          :key="ch.id"
          class="chapter-tab"
          :class="{ 'is-active': activeChapter === ch.id }"
          @click="switchChapter(ch.id)"
        >
          <span class="chapter-tab-dot" />
          <span class="hidden sm:inline">{{ ch.shortName }}</span>
          <span class="sm:hidden">{{ ch.emoji }}</span>
        </button>
      </div>

      <!-- Fullscreen toggle -->
      <button class="icon-btn" :title="isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'" @click="toggleFullscreen">
        <Icon :name="isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'" class="w-5 h-5" />
      </button>
    </div>

    <!-- ─────────────────────────── CENTER PLAY GATE ─────────────────────────── -->
    <Transition name="fade-scale">
      <div v-if="!hasStarted" class="play-gate" @click="startTour">
        <div class="play-gate-content">
          <!-- Decorative ring -->
          <div class="play-ring">
            <div class="play-ring-inner">
              <Icon name="mdi:play" class="w-12 h-12 text-ivory ml-1" />
            </div>
          </div>
          <p class="play-gate-label">Bắt đầu tham quan</p>
          <p class="play-gate-sub">{{ currentChapter.name }}</p>
        </div>
      </div>
    </Transition>

    <!-- ─────────────────────────── INFO CARD (bottom-left) ─────────────────────────── -->
    <Transition name="slide-up">
      <div v-if="hasStarted" class="info-card">
        <div class="info-card-inner">
          <!-- Location badge -->
          <div class="location-badge">
            <Icon name="mdi:map-marker" class="w-3.5 h-3.5" />
            <span>{{ currentChapter.location }}</span>
          </div>

          <!-- Title -->
          <h2 class="info-title">{{ currentChapter.name }}</h2>

          <!-- Description -->
          <p class="info-desc">{{ currentChapter.desc }}</p>

          <!-- Tags -->
          <div class="info-tags">
            <span v-for="tag in currentChapter.tags" :key="tag" class="info-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ─────────────────────────── CONTROLS (bottom-right) ─────────────────────────── -->
    <Transition name="slide-up">
      <div v-if="hasStarted" class="controls-panel">
        <!-- Video play/pause -->
        <button
          id="vt-video-toggle"
          class="ctrl-btn ctrl-btn--primary"
          :title="isVideoPlaying ? 'Tạm dừng' : 'Phát video'"
          @click="toggleVideo"
        >
          <Icon :name="isVideoPlaying ? 'mdi:pause' : 'mdi:play'" class="w-6 h-6" />
        </button>

        <!-- Audio guide toggle -->
        <button
          id="vt-audio-toggle"
          class="ctrl-btn"
          :class="{ 'is-audio-active': audioStore.isPlaying }"
          title="Thuyết minh"
          @click="toggleAudio"
        >
          <Icon :name="audioStore.isPlaying ? 'mdi:volume-high' : 'mdi:headphones'" class="w-5 h-5" />
          <span class="ctrl-label">Thuyết minh</span>
        </button>

        <!-- Chapter switch shortcut -->
        <button
          id="vt-switch-chapter"
          class="ctrl-btn"
          :title="`Đến: ${otherChapter.shortName}`"
          @click="switchChapter(otherChapter.id)"
        >
          <Icon name="mdi:swap-horizontal" class="w-5 h-5" />
          <span class="ctrl-label">{{ otherChapter.shortName }}</span>
        </button>
      </div>
    </Transition>

    <!-- ─────────────────────────── VIDEO PROGRESS BAR ─────────────────────────── -->
    <Transition name="slide-up">
      <div v-if="hasStarted" class="progress-bar-wrap">
        <!-- Chapter indicators -->
        <div class="chapter-dots">
          <button
            v-for="ch in chapters"
            :key="ch.id"
            class="ch-dot"
            :class="{ 'is-active': activeChapter === ch.id }"
            @click="switchChapter(ch.id)"
          >
            {{ ch.emoji }} {{ ch.shortName }}
          </button>
        </div>
        <!-- Video timeline — drag to seek -->
        <div
          class="progress-track"
          :class="{ 'is-dragging': isDragging }"
          @pointerdown="onProgressPointerDown"
          @pointermove="onProgressPointerMove"
          @pointerup="onProgressPointerUp"
          @pointercancel="onProgressPointerUp"
        >
          <div
            class="progress-fill"
            :style="{ width: `${videoProgress}%` }"
          />
          <div
            class="progress-thumb"
            :style="{ left: `${videoProgress}%` }"
          />
        </div>
        <div class="progress-time">
          <span>{{ formattedCurrentTime }}</span>
          <span class="text-charcoal-500">/</span>
          <span class="text-charcoal-400">{{ formattedDuration }}</span>
        </div>
      </div>
    </Transition>

    <!-- ─────────────────────────── CHAPTER SWITCH TRANSITION ─────────────────────────── -->
    <Transition name="chapter-fade">
      <div v-if="isSwitching" class="switch-overlay" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useAudioStore } from '~/stores/audio'
import type { HeritageAudio } from '~/types'

// ─── Page meta — fullscreen, no default layout ───────────────────────────────
definePageMeta({ layout: false })
useMuseumSeo({
  title: 'Tham Quan Ảo - Trảng Cỏ Bù Lạch & Sóc Bom Bo',
  description: 'Trải nghiệm chuyến tham quan ảo cinematic qua Trảng Cỏ Bù Lạch và Khu Bảo Tồn Sóc Bom Bo - di sản thiên nhiên và văn hóa đặc sắc của Thành Phố Đồng Nai.',
  path: '/explore/virtual-tour',
})

// ─── Chapter data ───────────────────────────────────────────────────────────
const chapters = [
  {
    id: 'bom-bo',
    emoji: '🌲',
    shortName: 'Bom Bo',
    name: 'Khu Bảo Tồn Sóc Bom Bo',
    location: 'Xã Bù Đăng, TP. Đồng Nai',
    desc: 'Di tích lịch sử gắn liền với chiến thắng lẫy lừng của người S\'Tiêng. Nơi lưu giữ đàn đá, cồng chiêng và ký ức cộng đồng bên bếp lửa.',
    tags: ['Di tích lịch sử', 'Văn hoá S\'Tiêng', 'Đàn đá'],
    audioId: 'khu-bao-ton-soc-bom-bo',
    audioUrl: '/audio/khu-bao-ton-soc-bom-bo.mp3',
    audioDuration: 560,
    videoSrc: '/video/virtual-tour/bom-bo/bom-bo-trailer.mp4',
    poster: '/video/virtual-tour/bom-bo/poster.jpg',
  },
  {
    id: 'trang-co',
    emoji: '🌿',
    shortName: 'Trảng Cỏ',
    name: 'Trảng Cỏ Bù Lạch',
    location: 'Xã Bù Đăng, TP. Đồng Nai',
    desc: 'Thảo nguyên xanh mênh mông với hồ nước trong vắt, bao quanh bởi rừng nguyên sinh. Điểm sinh thái độc đáo bậc nhất vùng Đông Nam Bộ.',
    tags: ['Thiên nhiên', 'Sinh thái', 'Drone view'],
    audioId: 'trang-co-bu-lach',
    audioUrl: '/audio/trang-co-bu-lach.mp3',
    audioDuration: 480,
    videoSrc: '/video/virtual-tour/trang-co/trang-co-trailer.mp4',
    poster: '/video/virtual-tour/trang-co/poster.jpg',
  },
] as const

type ChapterId = 'bom-bo' | 'trang-co'

// ─── State ──────────────────────────────────────────────────────────────────
const activeChapter = ref<ChapterId>('bom-bo')
const hasStarted = ref(false)
const isVideoPlaying = ref(false)
const isSwitching = ref(false)
const isFullscreen = ref(false)
const videoProgress = ref(0)
const videoCurrentTime = ref(0)
const videoDuration = ref(0)

const videoA = ref<HTMLVideoElement | null>(null)
const videoB = ref<HTMLVideoElement | null>(null)
const videoBSrc = ref<string | null>(null)

const audioStore = useAudioStore()

// ─── Computed ────────────────────────────────────────────────────────────────
const currentChapter = computed(() =>
  chapters.find(c => c.id === activeChapter.value)!,
)
const otherChapter = computed(() =>
  chapters.find(c => c.id !== activeChapter.value)!,
)

const formattedCurrentTime = computed(() => {
  const s = Math.floor(videoCurrentTime.value)
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
})

const formattedDuration = computed(() => {
  const s = Math.floor(videoDuration.value)
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
})

// ─── Active video element ────────────────────────────────────────────────────
function getActiveVideo(): HTMLVideoElement | null {
  return activeChapter.value === 'bom-bo' ? videoA.value : videoB.value
}

// ─── Actions ─────────────────────────────────────────────────────────────────
async function startTour() {
  hasStarted.value = true
  // Only now start fetching the 2nd chapter's video in the background —
  // no point downloading it if the visitor never gets past the gate.
  // Must happen (and mount) before playVideo() in case the visitor had
  // already switched the tab to Trảng Cỏ while still on the gate.
  if (!videoBSrc.value) {
    videoBSrc.value = chapters.find(c => c.id === 'trang-co')!.videoSrc
    await nextTick()
    if (videoB.value) setupVideoListeners(videoB.value)
  }
  playVideo()
  // Auto-start the audio guide for the current chapter
  nextTick(() => {
    if (!audioStore.isPlaying) {
      toggleAudio()
    }
  })
}

function playVideo() {
  const vid = getActiveVideo()
  if (!vid) return
  vid.muted = false
  vid.volume = 0
  vid.play().then(() => {
    isVideoPlaying.value = true
    // Fade in volume gently
    let vol = 0
    const ramp = setInterval(() => {
      vol = Math.min(vol + 0.05, 0.25)
      if (vid) vid.volume = vol
      if (vol >= 0.25) clearInterval(ramp)
    }, 60)
  }).catch(() => {
    isVideoPlaying.value = false
  })
}

function toggleVideo() {
  const vid = getActiveVideo()
  if (!vid) return
  if (isVideoPlaying.value) {
    vid.pause()
    isVideoPlaying.value = false
  }
  else {
    vid.play()
    isVideoPlaying.value = true
  }
}

async function switchChapter(id: ChapterId) {
  if (id === activeChapter.value || isSwitching.value) return

  isSwitching.value = true

  // Fade out current video
  const currentVid = getActiveVideo()
  if (currentVid) {
    currentVid.pause()
    isVideoPlaying.value = false
  }

  // Stop audio if playing
  if (audioStore.isPlaying) {
    audioStore.pause()
  }

  // Wait for fade overlay
  await new Promise(r => setTimeout(r, 600))

  activeChapter.value = id
  videoProgress.value = 0
  videoCurrentTime.value = 0
  videoDuration.value = 0

  await nextTick()
  isSwitching.value = false

  // Auto-play new chapter after brief moment
  await new Promise(r => setTimeout(r, 200))
  playVideo()
}

function toggleAudio() {
  if (audioStore.isPlaying && audioStore.heritageId === currentChapter.value.audioId) {
    audioStore.pause()
    return
  }

  const track: HeritageAudio = {
    id: currentChapter.value.audioId,
    title: `Thuyết minh: ${currentChapter.value.name}`,
    narrator: 'Người kể chuyện Di Sản Bù Đăng',
    duration: currentChapter.value.audioDuration,
    url: currentChapter.value.audioUrl,
    coverImage: currentChapter.value.poster,
  }
  audioStore.loadTrack(track, currentChapter.value.audioId)
  audioStore.play()
}

function seekVideo(e: MouseEvent) {
  const vid = getActiveVideo()
  if (!vid || !vid.duration) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  vid.currentTime = pct * vid.duration
}

const isDragging = ref(false)

function onProgressPointerDown(e: PointerEvent) {
  isDragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  seekVideo(e as unknown as MouseEvent)
}

function onProgressPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  seekVideo(e as unknown as MouseEvent)
}

function onProgressPointerUp() {
  isDragging.value = false
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      isFullscreen.value = true
    }).catch(() => {})
  }
  else {
    document.exitFullscreen().then(() => {
      isFullscreen.value = false
    }).catch(() => {})
  }
}

// ─── Video progress tracking ─────────────────────────────────────────────────
function setupVideoListeners(vid: HTMLVideoElement) {
  vid.addEventListener('timeupdate', () => {
    if (vid.duration) {
      videoCurrentTime.value = vid.currentTime
      videoDuration.value = vid.duration
      videoProgress.value = (vid.currentTime / vid.duration) * 100
    }
  })
  vid.addEventListener('loadedmetadata', () => {
    videoDuration.value = vid.duration
  })
  vid.addEventListener('ended', () => {
    // Loop is on, but we track progress to 100%
    videoProgress.value = 100
  })
}

// ─── Keyboard shortcuts ───────────────────────────────────────────────────────
function onKeydown(e: KeyboardEvent) {
  if (e.code === 'Space') { e.preventDefault(); toggleVideo() }
  if (e.code === 'KeyF') toggleFullscreen()
  if (e.code === 'KeyA') toggleAudio()
  if (e.code === 'ArrowRight') {
    const other = otherChapter.value
    switchChapter(other.id)
  }
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })

  // Setup video listeners after DOM mount
  nextTick(() => {
    if (videoA.value) setupVideoListeners(videoA.value)
    if (videoB.value) setupVideoListeners(videoB.value)
  })

  // Ambient silent autoplay for the background while at play gate (bom-bo is now videoA)
  nextTick(() => {
    const vid = videoA.value
    if (vid) {
      vid.muted = true
      vid.play().catch(() => {})
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  videoA.value?.pause()
  videoB.value?.pause()
})
</script>

<style scoped>
/* ─── Layout ─────────────────────────────────────────────────────────────── */
.virtual-tour {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: #1A140F;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.virtual-tour.is-fullscreen {
  z-index: 9999;
}

/* ─── Video backdrop ─────────────────────────────────────────────────────── */
.video-backdrop {
  position: absolute;
  inset: 0;
}

.bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease;
  /* Boost color vibrancy — natural & bright */
  filter: saturate(1.45) contrast(1.08) brightness(1.06);
}

.bg-video.is-active {
  opacity: 1;
}

.vignette {
  position: absolute;
  inset: 0;
  /* Reduced opacity so video colors show through naturally */
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.38) 100%);
  pointer-events: none;
}

.bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.22) 55%, transparent 100%);
  pointer-events: none;
}

.top-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 22%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.48) 0%, transparent 100%);
  pointer-events: none;
}

/* ─── Top bar ────────────────────────────────────────────────────────────── */
.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.8);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
}
.back-btn:hover {
  background: rgba(255,255,255,0.18);
  color: #F5F1EA;
}

.chapter-tabs {
  display: flex;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 9999px;
  padding: 0.25rem;
  gap: 0.25rem;
}

.chapter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  transition: all 0.3s ease;
  cursor: pointer;
}

.chapter-tab:hover {
  color: rgba(255,255,255,0.85);
}

.chapter-tab.is-active {
  background: #C7A664;
  color: #F5F1EA;
  box-shadow: 0 0 20px rgba(201, 169, 106, 0.4);
}

.chapter-tab-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}

.chapter-tab.is-active .chapter-tab-dot {
  background: #F5F1EA;
  opacity: 1;
}

.icon-btn {
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 9999px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: rgba(255,255,255,0.18);
  color: #F5F1EA;
}

/* ─── Play gate ──────────────────────────────────────────────────────────── */
.play-gate {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.play-gate-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
}

.play-ring {
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  border: 2px solid rgba(201, 169, 106,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ring-pulse 2s ease-in-out infinite;
}

.play-ring-inner {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: rgba(201, 169, 106,0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease;
  box-shadow: 0 0 40px rgba(201, 169, 106,0.4);
}

.play-gate:hover .play-ring-inner {
  transform: scale(1.08);
  background: #C7A664;
}

@keyframes ring-pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.06); opacity: 1; }
}

.play-gate-label {
  font-size: 1.125rem;
  font-weight: 600;
  color: #F5F1EA;
  letter-spacing: 0.02em;
}

.play-gate-sub {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.55);
  font-style: italic;
}

/* ─── Info card ──────────────────────────────────────────────────────────── */
.info-card {
  position: absolute;
  bottom: 7rem;
  left: 1.5rem;
  z-index: 10;
  max-width: 22rem;
}

@media (max-width: 640px) {
  .info-card {
    left: 1rem;
    right: 1rem;
    bottom: 8rem;
    max-width: none;
  }
}

.info-card-inner {
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
}

.location-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #C7A664;
  margin-bottom: 0.6rem;
}

.info-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #F5F1EA;
  line-height: 1.25;
  margin-bottom: 0.6rem;
}

.info-desc {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.65);
  margin-bottom: 0.875rem;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.info-tag {
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  background: rgba(201, 169, 106,0.18);
  border: 1px solid rgba(201, 169, 106,0.3);
  color: rgba(255,255,255,0.75);
}

/* ─── Controls panel ─────────────────────────────────────────────────────── */
.controls-panel {
  position: absolute;
  bottom: 7rem;
  right: 1.5rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .controls-panel {
    bottom: 8.5rem;
    right: 1rem;
  }
}

.ctrl-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  border-radius: 9999px;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.75);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.ctrl-btn:hover {
  background: rgba(255,255,255,0.15);
  color: #F5F1EA;
}

.ctrl-btn--primary {
  background: rgba(201, 169, 106,0.8);
  border-color: rgba(201, 169, 106,0.5);
  color: #F5F1EA;
}

.ctrl-btn--primary:hover {
  background: #C7A664;
}

.ctrl-btn.is-audio-active {
  background: rgba(201, 169, 106,0.2);
  border-color: rgba(201, 169, 106,0.4);
  color: #DEC89D;
}

.ctrl-label {
  display: none;
}

@media (min-width: 640px) {
  .ctrl-label {
    display: inline;
  }
}

/* ─── Progress bar ───────────────────────────────────────────────────────── */
.progress-bar-wrap {
  position: absolute;
  bottom: 1.75rem;
  left: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.chapter-dots {
  display: flex;
  gap: 0.5rem;
}

.ch-dot {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.45);
  transition: all 0.2s ease;
}

.ch-dot.is-active {
  background: rgba(201, 169, 106,0.25);
  border-color: rgba(201, 169, 106,0.5);
  color: #C7A664;
}

.progress-track {
  position: relative;
  height: 6px;
  background: rgba(255,255,255,0.18);
  border-radius: 9999px;
  cursor: pointer;
  transition: height 0.15s ease;
  /* Larger invisible hit area for easier touch/click */
  padding: 8px 0;
  margin: -8px 0;
  box-sizing: content-box;
}

.progress-track:hover,
.progress-track.is-dragging {
  height: 8px;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 8px;
  height: inherit;
  background: linear-gradient(to right, #C7A664, #D1B27D);
  border-radius: 9999px;
  transition: width 0.15s linear;
  pointer-events: none;
}

.progress-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: #F5F1EA;
  border-radius: 50%;
  border: 2.5px solid #C7A664;
  box-shadow: 0 0 10px rgba(201, 169, 106,0.7), 0 2px 4px rgba(0,0,0,0.3);
  transition: left 0.15s linear, transform 0.15s ease;
  pointer-events: none;
}

.progress-track:hover .progress-thumb,
.progress-track.is-dragging .progress-thumb {
  transform: translate(-50%, -50%) scale(1.25);
}

.progress-time {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.6);
  font-variant-numeric: tabular-nums;
}

/* ─── Switch overlay ─────────────────────────────────────────────────────── */
.switch-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  background: #1A140F;
  pointer-events: none;
}

/* ─── Transitions ────────────────────────────────────────────────────────── */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.slide-up-enter-active {
  transition: opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s;
}
.slide-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

.chapter-fade-enter-active {
  transition: opacity 0.3s ease;
}
.chapter-fade-leave-active {
  transition: opacity 0.35s ease 0.25s;
}
.chapter-fade-enter-from,
.chapter-fade-leave-to {
  opacity: 0;
}
</style>
