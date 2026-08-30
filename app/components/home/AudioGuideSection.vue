<template>
  <section class="section bg-warm-paper text-charcoal-800 relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-1/4 w-72 h-72 bg-earth-600/8 rounded-full blur-3xl" />
    </div>

    <div class="container-heritage relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Audio visual -->
        <div class="reveal">
          <!-- Featured audio card -->
          <div class="glass-dark rounded-3xl p-7 border border-gold-500/20 shadow-gold/10 shadow-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Icon name="mdi:headphones" class="w-5 h-5 text-charcoal-900" />
                </div>
                <div>
                  <p class="text-ivory font-semibold text-sm">Audio Guide</p>
                  <p class="text-charcoal-400 text-xs">Thuyết minh di sản</p>
                </div>
              </div>
              <BaseBadge variant="forest" size="sm">Giọng Đọc Thật</BaseBadge>
            </div>

            <!-- Track info -->
            <div v-if="featuredHeritage?.audio" class="flex gap-4 mb-6">
              <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-warm">
                <NuxtImg
                  :src="featuredHeritage.audio.coverImage || featuredHeritage.coverImage"
                  :alt="featuredHeritage.audio.title"
                  class="w-full h-full object-cover"
                  width="64"
                  height="64"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-heading font-bold text-ivory text-lg leading-snug mb-1">{{ featuredHeritage.audio.title }}</h4>
                <p class="text-charcoal-400 text-sm">Một câu chuyện được kể bởi {{ featuredHeritage.audio.narrator }}</p>
              </div>
            </div>

            <!-- Waveform visualization -->
            <div class="flex items-end gap-1 h-12 mb-4 px-2">
              <div
                v-for="(h, i) in waveformHeights"
                :key="i"
                class="waveform-bar flex-1 transition-all duration-500"
                :style="{
                  height: `${audioStore.isPlaying && isCurrentFeatured ? h : 3}px`,
                  animationDelay: `${i * 0.05}s`,
                  animation: audioStore.isPlaying && isCurrentFeatured ? `wave ${0.8 + i * 0.1}s ease-in-out ${i * 0.05}s infinite` : 'none',
                  opacity: audioStore.isPlaying && isCurrentFeatured ? 1 : 0.35,
                }"
              />
            </div>

            <!-- Progress -->
            <div class="mb-4">
              <div class="h-1 bg-charcoal-700 rounded-full mb-2">
                <div
                  class="h-full bg-gradient-gold rounded-full transition-all duration-300"
                  :style="{ width: `${isCurrentFeatured ? audioStore.progressPercent : 0}%` }"
                />
              </div>
              <div class="flex justify-between text-charcoal-500 text-xs">
                <span>{{ isCurrentFeatured ? audioStore.formattedCurrentTime : '0:00' }}</span>
                <span>{{ formatTime(featuredHeritage?.audio?.duration ?? 0) }}</span>
              </div>
            </div>

            <!-- Controls -->
            <div class="flex items-center justify-center gap-6">
              <button class="text-charcoal-400 hover:text-ivory transition-colors" aria-label="Tua lại 15 giây" @click="skip(-15)">
                <Icon name="mdi:rewind-15" class="w-6 h-6" />
              </button>
              <button
                class="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center hover:bg-gold-400 transition-all duration-300 shadow-gold hover:scale-105"
                aria-label="Phát hoặc Tạm dừng thuyết minh"
                @click="toggleFeatured"
              >
                <Icon
                  :name="audioStore.isPlaying && isCurrentFeatured ? 'mdi:pause' : 'mdi:play'"
                  class="w-7 h-7 text-charcoal-900"
                />
              </button>
              <button class="text-charcoal-400 hover:text-ivory transition-colors" aria-label="Tua tới 15 giây" @click="skip(15)">
                <Icon name="mdi:fast-forward-15" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- Chỉ hiển thị số lượng audio khác, dẫn vào /library để nghe đầy đủ -->
          <div v-if="otherAudios.length" class="mt-4 p-3 rounded-xl border border-charcoal-800/60 bg-charcoal-900/40 flex items-center justify-between">
            <div class="flex items-center gap-2 text-charcoal-400 text-xs">
              <Icon name="mdi:headphones" class="w-4 h-4 text-gold-500/60" />
              <span>{{ otherAudios.length }} audio guide khác trong thư viện</span>
            </div>
            <NuxtLink to="/explore" class="text-gold-400 text-xs font-semibold hover:text-gold-300 transition-colors flex items-center gap-1">
              Xem tất cả <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="space-y-8">
          <div class="reveal">
            <span class="section-label text-gold-700">Hệ Thống Audio Guide</span>
            <h2 class="text-display-sm text-charcoal-900 mb-5 leading-snug">
              Nghe Kể Chuyện<br/>
              <span class="text-gradient-gold">Di Sản Địa Phương</span>
            </h2>
            <p class="text-charcoal-600 text-lg leading-relaxed">
              Hệ thống audio guide — được thuyết minh bởi giọng đọc truyền cảm của các thuyết minh viên địa phương,
              ghi lại những câu chuyện di sản xúc động khắp Thành Phố Đồng Nai.
            </p>
          </div>

          <div class="space-y-5">
            <div
              v-for="(feat, i) in audioFeatures"
              :key="i"
              class="flex gap-4 reveal"
              :style="{ animationDelay: `${i * 0.1}s` }"
            >
              <div class="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon :name="feat.icon" class="w-5 h-5 text-gold-700" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-charcoal-900 mb-1">{{ feat.title }}</h4>
                <p class="text-charcoal-600 text-sm leading-relaxed">{{ feat.desc }}</p>
              </div>
            </div>
          </div>

          <div class="reveal">
            <NuxtLink to="/explore" class="btn-outline-gold !border-gold-700 !text-gold-700 hover:!bg-gold-700 hover:!text-ivory">
              <Icon name="mdi:headphones" class="w-4 h-4" />
              Khám Phá Audio Guide
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { HERITAGES } from '~/data/heritages'
import type { Heritage } from '~/types'

const audioStore = useAudioStore()
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

// Only show heritages that have real audio files
const heritagesWithAudio = HERITAGES.filter((h) => h.audio)
const featuredHeritage = computed(() => heritagesWithAudio[0] ?? null)
const otherAudios = heritagesWithAudio.slice(1)

// Check if featured track is currently loaded in the global store
const isCurrentFeatured = computed(() =>
  audioStore.heritageId === featuredHeritage.value?.id
)

// Simulate waveform bars
const waveformHeights = Array.from({ length: 32 }, () => Math.random() * 36 + 8)

function toggleFeatured() {
  const h = featuredHeritage.value
  if (!h?.audio) return

  if (isCurrentFeatured.value) {
    audioStore.togglePlay()
  } else {
    audioStore.loadTrack(h.audio, h.id)
    audioStore.play()
  }
}

function skip(s: number) {
  if (isCurrentFeatured.value) audioStore.skip(s)
}

function loadAudio(heritage: Heritage) {
  if (heritage.audio) {
    audioStore.loadTrack(heritage.audio, heritage.id)
    audioStore.play()
  }
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const audioFeatures = [
  {
    icon: 'mdi:microphone',
    title: 'Giọng Thuyết Minh Truyền Cảm',
    desc: 'Được thể hiện bởi thuyết minh viên Trần Thị Quyên và các giọng đọc địa phương — chân thực và đầy cảm xúc.',
  },
  {
    icon: 'mdi:headphones',
    title: 'Phát Ngay Trên Trình Duyệt',
    desc: 'Nhấn Play để nghe thuyết minh ngay — không cần tải về, chạy xuyên suốt khi lướt trang.',
  },
]
</script>
