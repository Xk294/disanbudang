<template>
  <div class="virtual-tour-page fixed inset-0 z-50 bg-night-950 text-ivory overflow-hidden select-none">
    <h1 class="sr-only">{{ pageTitle }}</h1>

    <!-- ─────────────────────────── MODE A: 360° INTERACTIVE TOUR (DEFAULT) ─────────────────────────── -->
    <div v-if="activeExperienceMode === '360'" class="w-full h-full relative">
      <!-- 360° WebGL Viewer -->
      <ClientOnly>
        <TourViewer360
          :tour="currentTour"
          :scene="currentScene"
          :back-url="backUrl"
          :auto-rotate-default="false"
          @change-scene="handleSceneChange"
        />
        <template #fallback>
          <div class="w-full h-full bg-night-950 flex flex-col items-center justify-center p-6 text-center">
            <div class="w-12 h-12 rounded-full border-2 border-gold-500/30 border-t-gold-400 animate-spin mb-3" />
            <p class="font-heading font-bold text-ivory text-lg">Đang Khởi Tạo Không Gian 360°...</p>
          </div>
        </template>
      </ClientOnly>

      <!-- Top Center Tour & Mode Switcher Bar -->
      <div class="fixed top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800 shadow-2xl max-w-[90vw] overflow-x-auto scrollbar-none">
        <!-- Tour Selector Dropdown / Tabs -->
        <div class="flex items-center gap-1 p-0.5 rounded-xl bg-charcoal-900/90 border border-charcoal-800">
          <button
            v-for="t in allTours"
            :key="t.id"
            type="button"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0"
            :class="selectedTourId === t.heritageSlug || selectedTourId === t.id ? 'bg-gold-500 text-charcoal-950 font-bold shadow-gold/20 shadow' : 'text-charcoal-300 hover:text-ivory hover:bg-charcoal-800/60'"
            @click="switchTour(t.heritageSlug)"
          >
            <Icon name="mdi:panorama-sphere" class="w-3.5 h-3.5" />
            <span>{{ t.heritageSlug === 'khu-bao-ton-soc-bom-bo' ? 'Sóc Bom Bo' : 'Trảng Cỏ' }}</span>
          </button>
        </div>

        <div class="h-4 w-px bg-charcoal-800 shrink-0" />

        <!-- Experience Mode Switcher (360 vs Video Trailer) -->
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-900/60 text-charcoal-400 hover:text-gold-300 hover:bg-charcoal-800 border border-charcoal-800/80 text-xs font-medium transition-all shrink-0"
          title="Chuyển sang xem video cinematic"
          @click="activeExperienceMode = 'video'"
        >
          <Icon name="mdi:movie-play-outline" class="w-3.5 h-3.5 text-gold-400" />
          <span class="hidden md:inline">Video Trailer</span>
        </button>
      </div>
    </div>

    <!-- ─────────────────────────── MODE B: CINEMATIC VIDEO EXPERIENCE ─────────────────────────── -->
    <div v-else class="w-full h-full relative">
      <!-- Mode Toggle Back to 360 -->
      <div class="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800 shadow-2xl">
        <button
          type="button"
          class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-500 text-charcoal-950 font-bold text-xs shadow-gold/20 shadow transition-all"
          @click="activeExperienceMode = '360'"
        >
          <Icon name="mdi:rotate-3d-variant" class="w-4 h-4" />
          <span>Vào Không Gian 360°</span>
        </button>
        <span class="text-xs text-charcoal-400 pr-2 hidden sm:inline">Chế độ Video Cinematic</span>
      </div>

      <!-- Video Backdrop -->
      <div class="video-backdrop absolute inset-0">
        <video
          ref="videoPlayerRef"
          class="w-full h-full object-cover"
          :src="currentVideoSrc"
          :poster="currentVideoPoster"
          preload="auto"
          playsinline
          loop
          autoplay
          muted
        />
        <div class="vignette absolute inset-0 pointer-events-none" />
        <div class="bottom-gradient absolute inset-x-0 bottom-0 h-1/2 pointer-events-none" />
      </div>

      <!-- Video Controls Overlay -->
      <div class="absolute bottom-8 left-6 right-6 z-20 flex flex-wrap items-end justify-between gap-4">
        <div class="max-w-md p-5 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800">
          <span class="text-2xs font-bold uppercase tracking-wider text-gold-400">Video Giới Thiệu Di Sản</span>
          <h2 class="font-heading font-bold text-ivory text-xl md:text-2xl mt-1">
            {{ selectedTourId === 'trang-co-bu-lach' ? 'Trảng Cỏ Bù Lạch' : 'Khu Bảo Tồn Sóc Bom Bo' }}
          </h2>
          <p class="text-xs text-charcoal-300 mt-1 leading-relaxed">
            Trải nghiệm thước phim cinematic ghi lại vẻ đẹp hoang sơ và hào khí ngút ngàn của vùng đất Bù Đăng.
          </p>
          <button
            type="button"
            class="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold transition-all shadow-gold/20 shadow"
            @click="activeExperienceMode = '360'"
          >
            <Icon name="mdi:rotate-3d" class="w-4 h-4" />
            Khám phá 360° Street View
          </button>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/explore"
            class="px-4 py-2.5 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800 text-xs text-charcoal-300 hover:text-ivory hover:bg-charcoal-900 transition-all font-semibold"
          >
            Về Thư Viện Khám Phá
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VIRTUAL_TOURS, getAllVirtualTours, getVirtualTourByHeritageId } from '~/data/virtualTours'
import type { VirtualHeritageTour, TourScene } from '~/types/virtualTour'
import TourViewer360 from '~/components/tour360/TourViewer360.vue'

// ─── Layout meta ───
definePageMeta({ layout: false })

const route = useRoute()
const router = useRouter()

const allTours = computed(() => getAllVirtualTours())

// Active Experience Mode: '360' (default interactive 360 space) or 'video' (cinematic trailer)
const activeExperienceMode = ref<'360' | 'video'>('360')

// Selected Tour ID (from query param or default 'khu-bao-ton-soc-bom-bo')
const selectedTourId = ref<string>('khu-bao-ton-soc-bom-bo')
const activeSceneId = ref<string>('bom-bo-cong')

// Video player ref
const videoPlayerRef = ref<HTMLVideoElement | null>(null)

// Computed Tour & Scene
const currentTour = computed<VirtualHeritageTour | null>(() => {
  return VIRTUAL_TOURS[selectedTourId.value] || getVirtualTourByHeritageId(selectedTourId.value) || allTours.value[0] || null
})

const currentScene = computed<TourScene | null>(() => {
  if (!currentTour.value) return null
  return (
    currentTour.value.scenes.find(s => s.id === activeSceneId.value) ||
    currentTour.value.scenes[0] ||
    null
  )
})

const pageTitle = computed(() => {
  return `${currentTour.value?.title || 'Tham Quan 360°'} — DiSanBudang.com`
})

const backUrl = computed(() => {
  if (currentTour.value?.heritageSlug) {
    return `/heritage/${currentTour.value.heritageSlug}`
  }
  return '/explore'
})

const currentVideoSrc = computed(() => {
  if (selectedTourId.value === 'trang-co-bu-lach') {
    return '/video/virtual-tour/trang-co/trang-co-trailer.mp4'
  }
  return '/video/virtual-tour/bom-bo/bom-bo-trailer.mp4'
})

const currentVideoPoster = computed(() => {
  if (selectedTourId.value === 'trang-co-bu-lach') {
    return '/video/virtual-tour/trang-co/poster.jpg'
  }
  return '/video/virtual-tour/bom-bo/poster.jpg'
})

useMuseumSeo({
  title: 'Tham Quan 360° Di Sản',
  description: 'Trải nghiệm không gian 360° Street View tương tác: tự nhìn quanh, di chuyển giữa các điểm nhìn, tìm hiểu hiện vật khảo cổ và nghe Audio Guide di sản Bù Đăng.',
  path: '/explore/virtual-tour',
})

function switchTour(tourSlug: string) {
  selectedTourId.value = tourSlug
  const tour = VIRTUAL_TOURS[tourSlug] || getVirtualTourByHeritageId(tourSlug)
  if (tour) {
    activeSceneId.value = tour.initialSceneId || tour.scenes[0]?.id || ''
  }
  router.replace({
    query: {
      ...route.query,
      tour: tourSlug,
      scene: activeSceneId.value,
    },
  })
}

function handleSceneChange(sceneId: string) {
  activeSceneId.value = sceneId
  router.replace({
    query: {
      ...route.query,
      tour: selectedTourId.value,
      scene: sceneId,
    },
  })
}

onMounted(() => {
  // Read query params if present
  const tourQuery = route.query.tour as string
  const sceneQuery = route.query.scene as string
  const modeQuery = route.query.mode as string

  if (tourQuery && (VIRTUAL_TOURS[tourQuery] || getVirtualTourByHeritageId(tourQuery))) {
    selectedTourId.value = tourQuery
  }

  const tour = currentTour.value
  if (tour) {
    if (sceneQuery && tour.scenes.some(s => s.id === sceneQuery)) {
      activeSceneId.value = sceneQuery
    }
    else {
      activeSceneId.value = tour.initialSceneId || tour.scenes[0]?.id || ''
    }
  }

  if (modeQuery === 'video') {
    activeExperienceMode.value = 'video'
  }
})
</script>

<style scoped>
.virtual-tour-page {
  font-family: 'Inter', sans-serif;
}

.vignette {
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.45) 100%);
}

.bottom-gradient {
  background: linear-gradient(to top, rgba(18, 14, 11, 0.95) 0%, rgba(18, 14, 11, 0.4) 60%, transparent 100%);
}
</style>
