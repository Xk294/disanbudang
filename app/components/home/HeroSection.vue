<template>
  <section class="hero-root relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0C10]" aria-label="Hero - Bảo tàng số di sản Bù Đăng">

    <!-- ═══ BACKGROUND MEDIA (Video & Archival Slideshow) ═══ -->
    <div class="absolute inset-0 z-0 bg-[#0A0C10]">
      <video
        ref="heroVideoRef"
        class="hero-video"
        :class="{ 'hero-video--loaded': videoLoaded }"
        src="/video/virtual-tour/bom-bo/bom-bo-trailer.mp4"
        poster="/video/virtual-tour/bom-bo/poster.jpg"
        muted
        loop
        playsinline
        preload="none"
        @canplay="markVideoReady"
      />

      <TransitionGroup name="hero-slide">
        <div
          v-for="(slide, i) in slides"
          v-show="!videoLoaded && currentSlide === i"
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
            :fetchpriority="i === 0 ? 'high' : 'auto'"
            :preload="i === 0"
            format="webp"
            sizes="100vw"
          />
        </div>
      </TransitionGroup>
    </div>

    <!-- ═══ CINEMATIC ATMOSPHERIC OVERLAYS ═══ -->
    <div class="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/75 to-[#0A0C10]/45 pointer-events-none" />
    <div class="absolute top-0 inset-x-0 h-32 z-10 bg-gradient-to-b from-[#0A0C10]/90 to-transparent pointer-events-none" />
    <div class="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,12,16,0.65)_0%,rgba(10,12,16,0.3)_65%,transparent_100%)] pointer-events-none" />
    <div class="absolute inset-0 z-10 opacity-[0.03] bg-[radial-gradient(#F2EDE6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

    <!-- ═══ MAIN HERO CONTENT (Direct & Immediate: Answers "Website này là gì?" in 10s) ═══ -->
    <div class="relative z-20 flex-1 flex flex-col items-center justify-center pt-24 pb-16 lg:py-28 px-4 sm:px-6 text-center">
      <div class="w-full max-w-4xl mx-auto flex flex-col items-center">

        <!-- 01 Eyebrow Institutional Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1308]/90 border border-[#D4AF37]/50 text-[#F5E6C8] text-[10px] sm:text-[11.5px] uppercase tracking-[0.25em] font-bold backdrop-blur-md mb-4 shadow-[0_2px_14px_rgba(212,175,55,0.2)]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#E5B94C] animate-pulse shadow-[0_0_8px_#E5B94C]" />
          <span>BẢO TÀNG SỐ DI SẢN BÙ ĐĂNG · TP. ĐỒNG NAI</span>
        </div>

        <!-- 02 Main Title + Heritage Divider + Subtitle -->
        <div class="flex flex-col items-center mb-4 sm:mb-5 w-full">
          <h1 class="font-heading font-extrabold text-[clamp(1.85rem,4.8vw,3.6rem)] tracking-normal leading-[1.2] w-full text-center royal-title-gradient drop-shadow-[0_4px_16px_rgba(212,175,55,0.35)]">
            <span class="sm:inline whitespace-nowrap">Bảo Tàng Số </span><span class="whitespace-nowrap">Di Sản Bù Đăng</span>
          </h1>

          <div class="flex items-center justify-center gap-3.5 my-3 w-full max-w-xs opacity-90">
            <span class="h-px flex-1 bg-gradient-to-r from-transparent via-[#E5B94C] to-[#E5B94C]/70" />
            <span class="text-[#E5B94C] text-xs select-none drop-shadow-[0_0_6px_rgba(229,185,76,0.8)]">❖</span>
            <span class="h-px flex-1 bg-gradient-to-l from-transparent via-[#E5B94C] to-[#E5B94C]/70" />
          </div>

          <span class="font-heading text-[clamp(1.1rem,2.6vw,1.65rem)] font-bold uppercase tracking-[0.22em] text-[#F3DC9B] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Thành Phố Đồng Nai
          </span>
        </div>

        <!-- 03 Statement Manifesto Quote (10-second identity) -->
        <p class="font-accent italic text-[#FFFDF7] text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-3 font-normal px-2">
          “Không gian số hóa, lưu giữ và tôn vinh 16 di sản văn hóa, lịch sử và thiên nhiên tại vùng đất Bù Đăng, Thành phố Đồng Nai.”
        </p>

        <!-- Description -->
        <p class="text-neutral-300 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 font-light">
          Nền tảng bảo tồn di sản trên không gian số — tư liệu thực địa chuẩn hóa, âm vang tiếng chày Bom Bo và ký ức cộng đồng.
        </p>

        <!-- 04 Action Row — 1 Primary CTA + Fast Audio Pill -->
        <div class="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-8 sm:mb-10">
          <!-- 1 Primary CTA per screen -->
          <a
            href="#three-doors"
            class="royal-cta-btn text-xs sm:text-sm px-8 sm:px-10 py-4 rounded-full font-bold tracking-wide flex items-center gap-2.5 transition-all duration-300 cursor-pointer shadow-lg text-[#0E0B05] hover:scale-105"
            @click.prevent="scrollToThreeDoors"
          >
            <Icon name="mdi:compass-outline" class="w-5 h-5 text-[#0E0B05]" />
            <span class="text-[#0E0B05] font-extrabold uppercase tracking-wider">Khám Phá Di Sản</span>
            <Icon name="mdi:arrow-down" class="w-4 h-4 text-[#0E0B05]" />
          </a>

          <!-- Audio Guide Pill -->
          <button
            type="button"
            class="museum-audio-pill group inline-flex items-center gap-3 pl-2.5 pr-5 py-2.5 rounded-full border border-[#D4AF37]/40 bg-[#0B0D12]/90 hover:bg-[#151922] hover:border-[#D4AF37]/70 transition-all duration-300 backdrop-blur-md cursor-pointer text-left shadow-md"
            :title="isAudioGuideOn ? 'Tắt thuyết minh' : 'Nghe thuyết minh Sóc Bom Bo'"
            @click="toggleHeroAudio"
          >
            <div class="relative w-8 h-8 flex-shrink-0">
              <NuxtImg
                src="/images/tranthiquyen.webp"
                alt="Trần Thị Quyên - Giọng đọc thuyết minh"
                class="w-full h-full rounded-full object-cover object-top border border-[#D4AF37]/50 group-hover:scale-105 transition-transform duration-300"
                width="32"
                height="32"
                loading="eager"
              />
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#0A0C10] border border-[#D4AF37]/60 flex items-center justify-center">
                <Icon :name="isAudioGuideOn ? 'mdi:volume-high' : 'mdi:headphones'" class="w-2 h-2 text-[#E5B94C]" />
              </span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1.5">
                <span class="text-[#F3DC9B] text-[11px] font-bold uppercase tracking-wider leading-tight">Audio Thuyết Minh</span>
                <div class="flex items-end gap-[2px] h-2.5 px-0.5">
                  <span class="w-[2px] bg-[#E5B94C] rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 10px; --bar-delay: 0.1s" />
                  <span class="w-[2px] bg-[#E5B94C] rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 6px; --bar-delay: 0.3s" />
                  <span class="w-[2px] bg-[#E5B94C] rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 11px; --bar-delay: 0s" />
                </div>
              </div>
              <span class="text-neutral-300 text-[10px] leading-tight">16 track · Giọng đọc Bù Đăng</span>
            </div>
            <Icon
              :name="isAudioGuideOn ? 'mdi:pause-circle' : 'mdi:play-circle'"
              class="w-5 h-5 text-[#E5B94C] group-hover:text-[#F3DC9B] ml-0.5"
            />
          </button>
        </div>

        <!-- 05 Real Verified Stats Bar (No fake stats) -->
        <div class="inline-flex items-center justify-center flex-nowrap gap-x-2.5 sm:gap-x-4 md:gap-x-5 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full sm:rounded-2xl bg-[#0B0D12]/85 border border-[#D4AF37]/35 backdrop-blur-md max-w-full overflow-x-auto no-scrollbar shadow-xl">
          <div
            v-for="(stat, idx) in stats"
            :key="stat.label"
            class="flex items-center gap-1.5 sm:gap-2 cursor-default group shrink-0 whitespace-nowrap"
          >
            <Icon :name="stat.icon" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5B94C] shrink-0" />
            <div class="flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap">
              <span class="font-heading font-bold text-[#FFFDF7] text-xs sm:text-sm tabular-nums">
                {{ stat.value }}
              </span>
              <span class="text-neutral-300 text-[9px] sm:text-[9.5px] md:text-[10px] uppercase tracking-wider font-medium">
                {{ stat.label }}
              </span>
            </div>
            <span v-if="idx < stats.length - 1" class="text-[#D4AF37]/30 ml-2 sm:ml-3 md:ml-4 select-none">/</span>
          </div>
        </div>

      </div>
    </div>

    <!-- ═══ SLIDE INDICATORS (Vertical dots) ═══ -->
    <div class="absolute bottom-[80px] lg:bottom-[40px] right-6 lg:right-10 z-20 flex flex-col gap-2">
      <button
        v-for="(_, i) in slides"
        :key="`dot-${i}`"
        class="rounded-full transition-all duration-500 cursor-pointer"
        :class="currentSlide === i
          ? 'w-1 h-6 bg-[#E5B94C]'
          : 'w-1 h-2.5 bg-neutral-600 hover:bg-neutral-400'"
        :aria-label="`Slide ${i + 1}`"
        :aria-current="currentSlide === i ? 'true' : undefined"
        @click="goToSlide(i)"
      />
    </div>

    <!-- ═══ SCROLL INDICATOR ═══ -->
    <a
      href="#three-doors"
      class="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
      @click.prevent="scrollToThreeDoors"
    >
      <div class="w-4 h-7 border border-neutral-500/50 rounded-full flex justify-center pt-1">
        <div class="w-0.5 h-1 bg-[#E5B94C] rounded-full scroll-dot" />
      </div>
      <span class="text-neutral-300 text-[8.5px] uppercase tracking-[0.24em] font-medium">Cuộn Xuống</span>
    </a>

  </section>
</template>

<script setup lang="ts">
import { useHeritageStore } from '~/stores/heritage'
import { useAudioStore } from '~/stores/audio'
import { HERITAGES } from '~/data/heritages'
import { QUIZZES } from '~/data/quizzes'
import type { HeritageAudio } from '~/types'

const heritageStore = useHeritageStore()
const audioStore = useAudioStore()
const heroVideoRef = ref<HTMLVideoElement | null>(null)
const videoLoaded = ref(false)
const isAudioGuideOn = computed(() => audioStore.isPlaying && audioStore.currentTrack?.id === 'khu-bao-ton-soc-bom-bo')

let slideInterval: ReturnType<typeof setInterval> | undefined

const audioCount = HERITAGES.filter((h) => h.audio).length
const questionCount = QUIZZES.reduce((sum, q) => sum + q.questions.length, 0)

const bomBoAudio: HeritageAudio = {
  id: 'khu-bao-ton-soc-bom-bo',
  title: 'Thuyết minh: Khu Bảo Tồn Sóc Bom Bo',
  narrator: 'Trần Thị Quyên · Di Sản Bù Đăng',
  duration: 560,
  url: '/audio/khu-bao-ton-soc-bom-bo.mp3',
  coverImage: '/images/tranthiquyen.webp',
}

function playHeroAudio() {
  audioStore.loadTrack(bomBoAudio, 'khu-bao-ton-soc-bom-bo')
  audioStore.play()
}

function toggleHeroAudio() {
  if (isAudioGuideOn.value) {
    audioStore.pause()
  } else {
    playHeroAudio()
  }
}

function markVideoReady() {
  videoLoaded.value = true
  heroVideoRef.value?.play().catch(() => {})
}

function scrollToThreeDoors() {
  const el = document.getElementById('three-doors')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else {
    navigateTo('/explore')
  }
}

function startAutoPlay() {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6500)
}

function goToSlide(i: number) {
  currentSlide.value = i
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
  nextTick(() => {
    heroVideoRef.value?.play().catch(() => {})
  })
})

onUnmounted(() => {
  heroVideoRef.value?.pause()
  if (slideInterval) {
    clearInterval(slideInterval)
  }
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

const stats = computed(() => [
  { icon: 'mdi:bank-outline', value: `${heritageStore.totalCount || 16}`, label: 'Di sản số hóa' },
  { icon: 'mdi:headphones', value: `${audioCount}`, label: 'Audio thuyết minh' },
  { icon: 'mdi:help-circle-outline', value: `${questionCount}`, label: 'Bộ trắc nghiệm' },
  { icon: 'mdi:shield-check-outline', value: '100%', label: 'Tư liệu thực địa' },
])
</script>

<style scoped>
/* ── Hero video ── */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.2s ease;
  filter: contrast(1.05) brightness(0.95);
}
.hero-video--loaded {
  opacity: 1;
}

/* ── Royal Luminous Gradient Title ── */
.royal-title-gradient {
  background: linear-gradient(180deg, #FFFFFF 0%, #FFF4D6 55%, #F0D598 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── Royal Jewel CTA Button ── */
.royal-cta-btn {
  background: linear-gradient(135deg, #E5B94C 0%, #D4AF37 50%, #B8860B 100%);
  color: #0E0B05;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.35);
}
.royal-cta-btn:hover {
  box-shadow: 0 6px 28px rgba(212, 175, 55, 0.55);
}

/* ── Ken Burns Slideshow Effect ── */
.ken-burns-active {
  animation: kenBurns 12s ease-out infinite alternate;
}
@keyframes kenBurns {
  0% { transform: scale(1); }
  100% { transform: scale(1.07); }
}

/* ── Slide Transitions ── */
.hero-slide-enter-active,
.hero-slide-leave-active {
  transition: opacity 1.4s ease-in-out;
}
.hero-slide-enter-from,
.hero-slide-leave-to {
  opacity: 0;
}

/* ── Soundwave animation ── */
.soundwave-bar {
  height: 3px;
  transition: height 0.2s ease;
}
.soundwave-active {
  animation: soundwave 1s ease-in-out infinite alternate;
  animation-delay: var(--bar-delay);
}
@keyframes soundwave {
  0% { height: 3px; }
  100% { height: var(--bar-h); }
}

/* ── Scroll Dot Animation ── */
.scroll-dot {
  animation: scrollDot 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
@keyframes scrollDot {
  0% { transform: translateY(0); opacity: 1; }
  60% { transform: translateY(12px); opacity: 0; }
  61% { transform: translateY(0); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>
