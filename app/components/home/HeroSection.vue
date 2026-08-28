<template>
  <section class="hero-root relative min-h-screen flex flex-col overflow-hidden" aria-label="Hero section">

    <!-- ═══ BACKGROUND VIDEO (primary) ═══ -->
    <div class="absolute inset-0 z-0 bg-charcoal-950">
      <!-- Video: Khu Bảo Tồn Sóc Bom Bo — preloads silently behind the entry gate,
           only starts playing once the user clicks "Bắt Đầu Hành Trình" -->
      <video
        v-if="enableVideo"
        ref="heroVideoRef"
        class="hero-video"
        :class="{ 'hero-video--loaded': videoLoaded && revealed }"
        src="/video/virtual-tour/bom-bo/bom-bo-trailer.mp4"
        poster="/video/virtual-tour/bom-bo/poster.jpg"
        muted
        loop
        playsinline
        preload="auto"
        @canplay="markVideoReady"
        @progress="onVideoProgress"
      />
      <!-- Fallback image slideshow shown while video loads -->
      <TransitionGroup name="hero-slide">
        <div
          v-for="(slide, i) in slides"
          v-show="(!videoLoaded || !revealed) && currentSlide === i"
          :key="i"
          class="absolute inset-0"
        >
          <NuxtImg
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-full object-cover"
            :class="currentSlide === i ? 'ken-burns-active' : ''"
            :style="slide.position ? `object-position: ${slide.position}` : ''"
            :loading="i === 0 ? 'eager' : 'lazy'"
          />
        </div>
      </TransitionGroup>
    </div>

    <!-- ═══ LAYERED OVERLAYS ═══ -->
    <!-- Cinematic vignette — lighter so video colors show through -->
    <div class="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-950 via-charcoal-950/35 to-charcoal-900/10" />
    <!-- Left content burn -->
    <div class="absolute inset-0 z-10 bg-gradient-to-r from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
    <!-- Top fade for header -->
    <div class="absolute top-0 inset-x-0 h-32 z-10 bg-gradient-to-b from-charcoal-950/50 to-transparent" />
    <!-- Amber cinematic tint -->
    <div class="absolute inset-0 z-10 bg-gradient-to-br from-transparent via-transparent to-gold-900/8" />

    <!-- ═══ ENTRY GATE — shows instantly; stays up (with a loading state) until the
         video actually can play, so the "journey" always starts on video, not a
         silent drop to slides. Only a genuine timeout or a detected slow
         connection falls back to the image slideshow. ═══ -->
    <Transition name="gate-fade">
      <div
        v-if="!revealed"
        class="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 bg-charcoal-950/90 backdrop-blur-md"
      >
        <template v-if="gateState === 'idle'">
          <div class="w-14 h-14 rounded-full border border-gold-400/40 flex items-center justify-center mb-6">
            <Icon name="mdi:compass-outline" class="w-6 h-6 text-gold-400" />
          </div>
          <p class="text-gold-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-3">
            Bảo Tàng Số Di Sản Bù Đăng · TP. Đồng Nai
          </p>
          <h2 class="font-heading font-bold text-ivory text-2xl md:text-4xl mb-4 max-w-lg">
            Sẵn sàng bước vào<br class="hidden md:block" /> hành trình di sản?
          </h2>
          <p class="text-charcoal-300 text-sm md:text-base max-w-md mb-8">
            Video toàn cảnh Sóc Bom Bo và thuyết minh sẽ tự động phát khi bạn bắt đầu.
          </p>
          <button
            class="gate-cta group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-500 text-charcoal-900 font-bold text-sm md:text-base hover:bg-gold-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-gold"
            @click="startJourney"
          >
            <Icon name="mdi:play" class="w-5 h-5" />
            Bắt Đầu Hành Trình
          </button>
          <p v-if="!enableVideo" class="mt-4 text-charcoal-500 text-xs max-w-xs">
            Đã phát hiện mạng yếu — sẽ hiển thị ảnh minh hoạ thay video, thuyết minh vẫn phát đầy đủ.
          </p>
        </template>

        <template v-else-if="gateState === 'loading'">
          <div class="gate-spinner-lg mb-6" />
          <h2 class="font-heading font-bold text-ivory text-xl md:text-2xl mb-2">
            Đang tải video toàn cảnh...
          </h2>
          <p class="text-charcoal-300 text-sm max-w-xs mb-5">
            Thuyết minh đã bắt đầu — video sẽ hiện ra ngay khi sẵn sàng.
          </p>
          <div class="w-56 h-1 rounded-full bg-charcoal-800 overflow-hidden mb-5">
            <div
              class="h-full bg-gold-400 rounded-full transition-all duration-300"
              :style="{ width: `${Math.max(bufferPercent, 6)}%` }"
            />
          </div>
          <button
            class="text-charcoal-400 text-xs underline underline-offset-4 hover:text-gold-400 transition-colors"
            @click="useFallback"
          >
            Mạng chậm? Dùng ảnh thay thế
          </button>
        </template>
      </div>
    </Transition>

    <!-- ═══ UNMUTE / AUDIO GUIDE BUTTON ═══ -->
    <button
      id="hero-unmute-btn"
      class="absolute top-24 right-5 lg:right-8 z-20 hero-audio-btn"
      :class="{ 'is-active': isAudioGuideOn }"
      :title="isAudioGuideOn ? 'Tắt thuyết minh' : 'Nghe thuyết minh Sóc Bom Bo'"
      @click="toggleHeroAudio"
    >
      <div class="hero-audio-btn-inner">
        <Icon
          :name="isAudioGuideOn ? 'mdi:volume-high' : 'mdi:volume-off'"
          class="w-4.5 h-4.5"
        />
        <span class="hero-audio-label">
          {{ isAudioGuideOn ? 'Thuyết Minh ON' : 'Nghe Thuyết Minh' }}
        </span>
      </div>
    </button>

    <!-- ═══ AMBIENT PARTICLES ═══ -->
    <div class="absolute inset-0 z-10 pointer-events-none">
      <div
        v-for="n in 10"
        :key="`p-${n}`"
        class="hero-particle absolute rounded-full"
        :style="{
          width: `${2 + (n % 3)}px`,
          height: `${2 + (n % 3)}px`,
          left: `${8 + n * 8.5}%`,
          top: `${15 + (n % 5) * 14}%`,
          animationDelay: `${n * 0.6}s`,
          animationDuration: `${6 + n * 0.8}s`,
          opacity: 0.25 + (n % 4) * 0.1,
        }"
      />
    </div>

    <!-- ═══ SLIDE CAPTION — bottom-left overlay ═══ -->
    <Transition name="caption-fade">
      <div
        :key="currentSlide"
        class="hidden lg:block absolute bottom-16 left-10 z-20 pointer-events-none max-w-xs"
      >
        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-5 h-px bg-gold-400/80" />
          <p class="text-gold-400 text-[9px] uppercase tracking-[0.3em] font-bold">
            {{ slides[currentSlide]?.label }}
          </p>
        </div>
        <p class="text-ivory/60 text-xs leading-relaxed">
          {{ slides[currentSlide]?.caption }}
        </p>
      </div>
    </Transition>

    <!-- ═══ SLIDE COUNTER — top-right ═══ -->
    <div class="absolute top-24 right-6 lg:right-10 z-20 pointer-events-none hidden lg:flex items-center gap-2">
      <span class="font-heading font-bold text-ivory/80 text-sm tabular-nums">{{ String(currentSlide + 1).padStart(2,'0') }}</span>
      <span class="text-charcoal-400 text-xs">/</span>
      <span class="text-charcoal-500 text-xs tabular-nums">{{ String(slides.length).padStart(2,'0') }}</span>
    </div>

    <!-- ═══ MAIN CONTENT ═══ -->
    <div class="relative z-20 flex-1 flex flex-col justify-end pb-20 md:pb-24 pt-32 lg:pt-36">
      <div class="container-heritage">
        <div class="max-w-3xl xl:max-w-4xl">

          <!-- Eyebrow -->
          <div class="hero-item flex items-center gap-3 mb-5 md:mb-7" style="--delay: 0s">
            <span class="h-px w-10 bg-gold-400" />
            <span class="text-gold-400 text-[10px] md:text-[11px] uppercase tracking-[0.28em] font-bold">
              Bảo Tàng Số Di Sản Bù Đăng · TP. Đồng Nai
            </span>
          </div>

          <!-- H1 -->
          <h1 class="hero-item font-heading font-bold text-ivory leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 text-shadow-hero text-balance tracking-[-0.03em]" style="--delay: 0.12s; overflow: visible">
            <span class="block text-[clamp(1.9rem,5vw,4.2rem)]">Bảo Tàng Số Di Sản</span>
            <span class="block text-[clamp(1.9rem,5vw,4.2rem)]">Bù Đăng</span>
            <span class="block text-[clamp(1.9rem,5vw,4.2rem)] text-gradient-gold">Thành Phố Đồng Nai</span>
          </h1>

          <!-- Tagline quote -->
          <p
            class="hero-item font-accent italic text-ivory/65 text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed max-w-xl"
            style="--delay: 0.25s"
          >
            "Hình thành tại Xã Bù Đăng — nơi phương pháp số hóa di sản phi vật thể dân tộc thiểu số được kiểm chứng lần đầu. Thiết kế để mở rộng."
          </p>

          <!-- Description -->
          <p
            class="hero-item text-charcoal-300 text-sm md:text-base leading-relaxed mb-9 md:mb-11 max-w-lg"
            style="--delay: 0.34s"
          >
            Nền tảng số hóa di sản văn hóa phi vật thể — được xây dựng từ thực địa tại Xã Bù Đăng,
            kiểm chứng phương pháp thu thập và chuẩn hóa dữ liệu, thiết kế kiến trúc độc lập với ranh giới hành chính để phục vụ toàn Thành Phố Đồng Nai.
          </p>

          <!-- CTAs -->
          <div class="hero-item flex flex-wrap gap-3 mb-5" style="--delay: 0.44s">
            <NuxtLink to="/map" class="btn-primary text-sm px-7 py-3.5 flex-shrink-0">
              <Icon name="mdi:map-outline" class="w-4.5 h-4.5" />
              Bản Đồ Di Sản
            </NuxtLink>
            <NuxtLink
              to="/explore"
              class="btn-ghost text-sm px-7 py-3.5 border border-ivory/20 text-ivory/80 hover:border-gold-400/60 hover:text-gold-300 flex-shrink-0"
            >
              <Icon name="mdi:compass-outline" class="w-4.5 h-4.5" />
              Khám Phá
            </NuxtLink>
          </div>

          <!-- Audio Guide highlight pill -->
          <div class="hero-item mb-10 md:mb-14" style="--delay: 0.52s">
            <NuxtLink
              to="/explore"
              class="group inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full border border-gold-500/30 bg-gold-500/8 hover:bg-gold-500/15 hover:border-gold-500/60 transition-all duration-400 backdrop-blur-sm"
            >
              <!-- Waveform animated -->
              <div class="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center gap-[2px] flex-shrink-0 group-hover:bg-gold-500/30 transition-colors">
                <span v-for="i in 4" :key="i"
                  class="w-0.5 rounded-full bg-gold-400 audio-wave-bar"
                  :style="`animation-delay: ${(i-1) * 0.12}s`"
                />
              </div>
              <div class="flex flex-col">
                <span class="text-gold-300 text-xs font-bold uppercase tracking-wider leading-snug mb-0.5">Audio Thuyết Minh</span>
                <span class="text-ivory/60 text-[10px]">{{ audioCount }} track · Giọng đọc địa phương · Nghe ngay trên trình duyệt</span>
              </div>
              <Icon name="mdi:arrow-right" class="w-3.5 h-3.5 text-gold-400/60 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all ml-1" />
            </NuxtLink>
          </div>

          <!-- Stats row -->
          <div class="hero-item" style="--delay: 0.56s">
            <div class="grid grid-cols-2 gap-y-4 gap-x-6 sm:flex sm:flex-wrap sm:items-stretch sm:gap-0 sm:divide-x sm:divide-ivory/10">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="stat-pill flex flex-col gap-0.5 sm:pr-5 sm:pl-5 sm:first:pl-0 py-1 sm:py-2 cursor-default group"
              >
                <div class="flex items-center gap-1.5">
                  <Icon :name="stat.icon" class="w-3.5 h-3.5 text-gold-400/70 group-hover:text-gold-400 transition-colors" />
                  <span class="font-heading font-bold text-ivory text-lg md:text-2xl leading-none tabular-nums group-hover:text-gold-300 transition-colors">
                    {{ stat.value }}{{ stat.suffix }}
                  </span>
                </div>
                <p class="text-charcoal-500 text-[10px] uppercase tracking-wider leading-snug group-hover:text-charcoal-400 transition-colors">
                  {{ stat.label }}
                </p>
              </div>
              <!-- Location badge -->
              <div class="flex items-center gap-2 col-span-2 sm:col-span-1 sm:pl-5 cursor-default group border-t border-charcoal-800/20 pt-3 mt-1 sm:border-t-0 sm:pt-0 sm:mt-0">
                <div class="w-7 h-7 rounded-lg bg-forest-500/15 border border-forest-500/20 flex items-center justify-center group-hover:bg-forest-500/25 transition-colors">
                  <Icon name="mdi:city" class="w-3.5 h-3.5 text-forest-400" />
                </div>
                <div>
                  <p class="font-heading font-semibold text-ivory text-xs leading-snug mb-0.5">Thành Phố Đồng Nai</p>
                  <p class="text-charcoal-500 text-[10px]">TPTT thứ 7 · Từ 30/04/2026</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ═══ SLIDE INDICATORS ═══ -->
    <div class="absolute bottom-[100px] lg:bottom-[56px] right-6 lg:right-10 z-20 flex flex-col gap-2">
      <button
        v-for="(_, i) in slides"
        :key="`dot-${i}`"
        class="rounded-full transition-all duration-500 cursor-pointer"
        :class="currentSlide === i
          ? 'w-1 h-7 bg-gold-400'
          : 'w-1 h-3 bg-ivory/25 hover:bg-ivory/50'"
        :aria-label="`Slide ${i + 1}`"
        :aria-current="currentSlide === i ? 'true' : undefined"
        @click="goToSlide(i)"
      />
    </div>

    <!-- ═══ SCROLL INDICATOR ═══ -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <div class="w-5 h-8 border border-ivory/20 rounded-full flex justify-center pt-1.5 hover:border-gold-400/40 transition-colors">
        <div class="w-1 h-1.5 bg-gold-400/70 rounded-full scroll-dot" />
      </div>
      <span class="text-ivory/30 text-[9px] uppercase tracking-widest">Cuộn xuống</span>
    </div>

  </section>
</template>

<script setup lang="ts">
import { useHeritageStore } from '~/stores/heritage'
import { useAudioStore } from '~/stores/audio'
import { HERITAGES } from '~/data/heritages'
import { COMMUNITY_POSTS } from '~/data/posts'
import { QUIZZES } from '~/data/quizzes'
import type { HeritageAudio } from '~/types'

const heritageStore = useHeritageStore()
const audioStore = useAudioStore()
const heroVideoRef = ref<HTMLVideoElement | null>(null)
const videoLoaded = ref(false)
const gateState = ref<'idle' | 'loading' | 'ready' | 'fallback'>('idle')
const revealed = computed(() => gateState.value === 'ready' || gateState.value === 'fallback')
const bufferPercent = ref(0)
const enableVideo = ref(true)
const isAudioGuideOn = ref(false)
let fallbackTimer: ReturnType<typeof setTimeout> | undefined
const audioCount = HERITAGES.filter((h) => h.audio).length
const questionCount = QUIZZES.reduce((sum, q) => sum + q.questions.length, 0)

const bomBoAudio: HeritageAudio = {
  id: 'khu-bao-ton-soc-bom-bo',
  title: 'Thuyết minh: Khu Bảo Tồn Sóc Bom Bo',
  narrator: 'Người kể chuyện Di Sản Bù Đăng',
  duration: 560,
  url: '/audio/khu-bao-ton-soc-bom-bo.mp3',
  coverImage: '/video/virtual-tour/bom-bo/poster.jpg',
}

function playHeroAudio() {
  audioStore.loadTrack(bomBoAudio, 'khu-bao-ton-soc-bom-bo')
  audioStore.play()
  isAudioGuideOn.value = true
}

// Toggle Bom Bo audio guide from hero section
function toggleHeroAudio() {
  if (isAudioGuideOn.value) {
    audioStore.pause()
    isAudioGuideOn.value = false
  } else {
    playHeroAudio()
  }
}

// Track real download progress so the loading state feels alive instead of a bare spinner
function onVideoProgress() {
  const v = heroVideoRef.value
  if (!v || !v.duration || !v.buffered.length) return
  try {
    const bufferedEnd = v.buffered.end(v.buffered.length - 1)
    bufferPercent.value = Math.min(100, Math.round((bufferedEnd / v.duration) * 100))
  } catch {
    // buffered range can throw if the video has no data yet — ignore
  }
}

function clearFallbackTimer() {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer)
    fallbackTimer = undefined
  }
}

// Video actually able to play smoothly — this is the only path that shows video
// instead of the fallback slideshow, matching what the visitor expects to see.
function markVideoReady() {
  videoLoaded.value = true
  if (gateState.value === 'loading') {
    gateState.value = 'ready'
    clearFallbackTimer()
  }
}

// Only reached by explicit user choice ("Dùng ảnh thay thế") or the loading timeout —
// never as a silent default when video simply hasn't finished buffering yet.
function useFallback() {
  clearFallbackTimer()
  if (gateState.value !== 'ready') gateState.value = 'fallback'
}

// Entry gate: user gesture unlocks autoplay-with-sound in every browser.
// Narration starts immediately; video keeps the gate up (with visible progress)
// until it can actually play, instead of dropping straight to static images.
function startJourney() {
  playHeroAudio()

  if (!enableVideo.value) {
    gateState.value = 'fallback'
    return
  }

  // Video may have already finished buffering silently while the gate sat
  // idle (fast connections, or localhost) — its 'canplay' event fired before
  // there was a 'loading' state to resolve. Skip the loading screen entirely.
  if (videoLoaded.value) {
    gateState.value = 'ready'
    nextTick(() => {
      heroVideoRef.value?.play().catch(() => {})
    })
    return
  }

  gateState.value = 'loading'
  nextTick(() => {
    // Calling .play() on the click gesture matters most on iOS Safari, which
    // otherwise throttles preload over cellular regardless of the attribute.
    heroVideoRef.value?.play().catch(() => {})
  })
  fallbackTimer = setTimeout(useFallback, 10000)
}

onMounted(() => {
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType ?? ''))) {
    enableVideo.value = false
  }

  // With SSR the <video> tag is in the initial HTML and can start buffering —
  // and fire 'canplay' — before Vue finishes hydrating and attaches the
  // template listener. Check readyState directly to catch that missed event.
  nextTick(() => {
    if ((heroVideoRef.value?.readyState ?? 0) >= 3) {
      markVideoReady()
    }
  })
})

// Sync button state with global audio store
watch(() => audioStore.isPlaying, (playing) => {
  if (!playing && isAudioGuideOn.value) {
    isAudioGuideOn.value = false
  }
})

onUnmounted(() => {
  heroVideoRef.value?.pause()
  clearFallbackTimer()
})

const slides = [
  {
    image: '/images/heritage/Bombo/TAN08220.jpg',
    alt: 'Sóc Bom Bo — tiếng chày giã gạo nuôi quân',
    label: 'SÓC BOM BO',
    caption: 'Nhịp chày giã gạo vang vọng đại ngàn — biểu tượng bất khuất của miền Đông Nam Bộ',
    position: 'center top',
  },
  {
    image: '/images/heritage/img-disanbudang/Khu-Bao-Ton-2.jpg',
    alt: 'Rừng nguyên sinh Thành Phố Đồng Nai',
    label: 'RỪNG NGUYÊN SINH ĐỒNG NAI',
    caption: 'Kho báu đa dạng sinh học của Đông Nam Bộ còn nguyên vẹn qua hàng thế kỷ',
    position: 'center center',
  },
  {
    image: '/images/heritage/img-disanbudang/Nha-Dai-Truyen-Thong.png',
    alt: 'Nhà dài truyền thống S\'tiêng',
    label: 'NHÀ DÀI TRUYỀN THỐNG',
    caption: 'Kiến trúc cộng đồng độc đáo trên cao nguyên đất đỏ — linh hồn văn hóa S\'tiêng',
    position: 'center 30%',
  },
  {
    image: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    alt: 'Lễ hội mừng lúa mới M\'nông',
    label: 'LỄ HỘI MỪNG LÚA MỚI',
    caption: 'Lời tạ ơn của đất trời và mùa vàng bội thu — nghi lễ thiêng liêng ngàn đời',
    position: 'center center',
  },
  {
    image: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png',
    alt: 'Hồ Thác Mơ — Phước Long',
    label: 'HỒ THÁC MƠ — PHƯỚC LONG',
    caption: 'Viên ngọc xanh soi bóng núi Bà Rá huyền thoại — điểm đến khó quên',
    position: 'center 40%',
  },
]

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval>

function goToSlide(i: number) {
  currentSlide.value = i
  clearInterval(slideInterval)
  startAutoPlay()
}

function startAutoPlay() {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6500)
}

onMounted(() => startAutoPlay())
onUnmounted(() => clearInterval(slideInterval))

const stats = computed(() => [
  { icon: 'mdi:castle', value: String(heritageStore.totalCount), suffix: '', label: 'Di sản số hóa' },
  { icon: 'mdi:book-open-variant', value: String(COMMUNITY_POSTS.length), suffix: '', label: 'Ký ức cộng đồng' },
  { icon: 'mdi:headphones', value: String(audioCount), suffix: '', label: 'Audio guide' },
  { icon: 'mdi:help-circle-outline', value: String(questionCount), suffix: '', label: 'Câu hỏi lịch sử' },
])
</script>

<style scoped>
/* ── Hero video background ── */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.2s ease;
  /* Natural, vibrant color grade */
  filter: saturate(1.4) contrast(1.06) brightness(1.04);
}
.hero-video--loaded {
  opacity: 1;
}

/* ── Entry gate ── */
.gate-fade-enter-active { transition: opacity 0.4s ease; }
.gate-fade-leave-active { transition: opacity 0.7s ease; }
.gate-fade-enter-from,
.gate-fade-leave-to { opacity: 0; }
.gate-cta { animation: gatePulse 2.4s ease-in-out infinite; }
@keyframes gatePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 169, 106, 0.35); }
  50% { box-shadow: 0 0 0 10px rgba(201, 169, 106, 0); }
}
.gate-spinner-lg {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  border: 3px solid rgba(201, 169, 106, 0.25);
  border-top-color: rgba(201, 169, 106, 0.95);
  animation: gateSpin 0.9s linear infinite;
}
@keyframes gateSpin {
  to { transform: rotate(360deg); }
}

/* ── Hero audio guide button ── */
.hero-audio-btn {
  cursor: pointer;
}
.hero-audio-btn-inner {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem 0.45rem 0.7rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
  white-space: nowrap;
}
.hero-audio-btn:hover .hero-audio-btn-inner {
  background: rgba(201, 169, 106, 0.25);
  border-color: rgba(201, 169, 106, 0.5);
  color: #fff;
}
.hero-audio-btn.is-active .hero-audio-btn-inner {
  background: rgba(201, 169, 106, 0.2);
  border-color: rgba(201, 169, 106, 0.45);
  color: #DEC89D;
}
.hero-audio-label {
  display: none;
}
@media (min-width: 640px) {
  .hero-audio-label { display: inline; }
}

/* ── Slideshow transition ── */
.hero-slide-enter-active { transition: opacity 1.8s ease; }
.hero-slide-leave-active { transition: opacity 1.8s ease; }
.hero-slide-enter-from,
.hero-slide-leave-to { opacity: 0; }

/* ── Ken Burns ── */
.ken-burns-active {
  animation: kenburns 20s ease-out infinite alternate;
}
@keyframes kenburns {
  0% { transform: scale(1.08) translateX(0px); }
  100% { transform: scale(1) translateX(-12px); }
}

/* ── Caption transition ── */
.caption-fade-enter-active { transition: opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s; }
.caption-fade-leave-active { transition: opacity 0.3s ease; }
.caption-fade-enter-from { opacity: 0; transform: translateY(6px); }
.caption-fade-leave-to { opacity: 0; }

/* ── Hero content items ── */
.hero-item {
  animation: heroFadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0s);
}
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Ambient particles ── */
.hero-particle {
  background: radial-gradient(circle, rgba(201, 169, 106, 0.6) 0%, transparent 70%);
  animation: floatParticle var(--dur, 7s) ease-in-out var(--delay, 0s) infinite alternate;
}
@keyframes floatParticle {
  from { transform: translateY(0px) scale(1); opacity: 0.2; }
  to   { transform: translateY(-22px) scale(1.5); opacity: 0.5; }
}

/* ── Scroll dot ── */
.scroll-dot {
  animation: scrollBounce 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(10px); opacity: 1; }
}

/* ── Stat pill hover ── */
.stat-pill { transition: all 0.2s ease; }
</style>
