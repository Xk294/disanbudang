<template>
  <!-- Mini sticky audio player -->
  <Transition name="player-slide">
    <div
      v-if="audio.isMiniPlayerVisible && audio.currentTrack"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-full max-w-lg px-4"
    >
      <!-- Transcript Drawer / Popup -->
      <Transition name="fade">
        <div
          v-if="showTranscript && audio.currentTrack.transcript"
          class="mb-3 glass-dark border border-gold-500/30 rounded-2xl p-4 shadow-2xl max-h-60 overflow-y-auto space-y-2 text-xs"
          role="region"
          aria-label="Văn bản thuyết minh âm thanh"
        >
          <div class="flex items-center justify-between pb-1.5 border-b border-charcoal-800">
            <span class="font-bold text-gold-400 flex items-center gap-1.5">
              <Icon name="mdi:text-box-check-outline" class="w-4 h-4" aria-hidden="true" />
              Văn bản thuyết minh
            </span>
            <button
              class="text-charcoal-400 hover:text-ivory text-xs flex items-center gap-1"
              @click="showTranscript = false"
              aria-label="Đóng bản ghi thuyết minh"
            >
              <Icon name="mdi:close" class="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
          <p class="text-ivory/90 leading-relaxed font-sans">{{ audio.currentTrack.transcript }}</p>
        </div>
      </Transition>

      <div class="glass-dark rounded-2xl p-4 shadow-warm-xl border border-earth-700/30">
        <div class="flex items-center gap-4">
          <!-- Cover -->
          <!-- Cover with playing ring -->  
          <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-warm relative" :class="audio.isPlaying ? 'ring-2 ring-gold-400/70 ring-offset-1 ring-offset-charcoal-900' : ''">
            <img
              v-if="audio.currentTrack.coverImage"
              :src="audio.currentTrack.coverImage"
              :alt="audio.currentTrack.title"
              class="w-full h-full object-cover transition-all duration-300"
              :class="{ 'opacity-70 scale-95': audio.isPlaying }"
            />
            <div v-else class="w-full h-full bg-gradient-earth flex items-center justify-center">
              <Icon name="mdi:headphones" class="w-6 h-6 text-ivory" aria-hidden="true" />
            </div>

            <!-- Waveform overlay when playing -->
            <div
              v-if="audio.isPlaying"
              class="absolute inset-0 flex items-end justify-center gap-0.75 pb-2.5 bg-black/40 audio-wave-active"
              aria-hidden="true"
            >
              <div class="w-0.75 h-4 rounded-full bg-gold-400 waveform-bar"></div>
              <div class="w-0.75 h-4 rounded-full bg-gold-400 waveform-bar"></div>
              <div class="w-0.75 h-4 rounded-full bg-gold-400 waveform-bar"></div>
              <div class="w-0.75 h-4 rounded-full bg-gold-400 waveform-bar"></div>
            </div>
          </div>

          <!-- Info + Progress -->
          <div class="flex-1 min-w-0">
            <NuxtLink
              v-if="heritageSlug"
              :to="`/heritage/${heritageSlug}`"
              class="block text-ivory text-sm font-medium truncate hover:text-gold-300 transition-colors"
              title="Mở trang chi tiết di sản"
            >{{ audio.currentTrack.title }}</NuxtLink>
            <p v-else class="text-ivory text-sm font-medium truncate">{{ audio.currentTrack.title }}</p>
            <p class="text-charcoal-400 text-xs truncate">
              {{ audio.errorMessage || audio.currentTrack.narrator }}
            </p>

            <!-- Progress bar with hover thumb -->
            <div
              class="mt-2 relative h-1 hover:h-2 bg-charcoal-700 rounded-full cursor-pointer transition-all duration-200 group/progress"
              @click="onProgressClick"
            >
              <div
                class="absolute left-0 top-0 h-full bg-gold-500 rounded-full transition-all duration-300"
                :style="{ width: `${audio.progressPercent}%` }"
              />
              <!-- Thumb dot -->
              <div
                class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-gold-400 rounded-full shadow-gold opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 -translate-x-1/2 pointer-events-none"
                :style="{ left: `${audio.progressPercent}%` }"
              />
            </div>

            <!-- Time -->
            <div class="flex justify-between mt-1">
              <span class="text-charcoal-500 text-2xs">{{ audio.formattedCurrentTime }}</span>
              <span class="text-charcoal-500 text-2xs">{{ audio.formattedDuration }}</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <!-- Transcript button -->
            <button
              v-if="audio.currentTrack.transcript"
              class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              :class="showTranscript ? 'text-gold-400 bg-gold-500/20' : 'text-charcoal-400 hover:text-gold-400 hover:bg-gold-500/10'"
              aria-label="Xem văn bản thuyết minh (Transcript)"
              title="Văn bản thuyết minh"
              @click="showTranscript = !showTranscript"
            >
              <Icon name="mdi:text-box-outline" class="w-4 h-4" aria-hidden="true" />
            </button>

            <!-- Speed Selector -->
            <button
              class="px-2 py-1 text-2xs font-bold text-gold-400 border border-gold-500/20 hover:border-gold-500/50 hover:bg-gold-500/10 rounded-lg transition-colors min-w-[34px]"
              aria-label="Tốc độ phát"
              @click="cycleSpeed"
            >
              {{ audio.playbackRate }}x
            </button>
            <button
              class="hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-charcoal-400 hover:text-ivory transition-colors"
              aria-label="Tua lại 15 giây"
              @click="audio.skip(-15)"
            >
              <Icon name="mdi:rewind-15" class="w-5 h-5" aria-hidden="true" />
            </button>
            <div class="relative">
              <!-- Pulsing ring when playing -->
              <div
                v-if="audio.isPlaying"
                class="absolute inset-0 rounded-full bg-gold-500/30 animate-ping"
                style="animation-duration: 1.5s;"
              />
              <button
                class="relative w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center hover:bg-gold-400 transition-all duration-300 shadow-gold hover:scale-105 active:scale-95"
                :aria-label="audio.isPlaying ? 'Tạm dừng audio' : 'Phát audio'"
                @click="audio.togglePlay()"
              >
                <Icon
                  :name="audio.isPlaying ? 'mdi:pause' : 'mdi:play'"
                  class="w-5 h-5 text-charcoal-900"
                  aria-hidden="true"
                />
              </button>
            </div>
            <button
              class="hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-charcoal-400 hover:text-ivory transition-colors"
              aria-label="Tua tới 15 giây"
              @click="audio.skip(15)"
            >
              <Icon name="mdi:fast-forward-15" class="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center text-charcoal-400 hover:text-ivory transition-colors"
              aria-label="Đóng trình phát audio"
              @click="audio.closeMiniPlayer()"
            >
              <Icon name="mdi:close" class="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const audio = useAudioStore()
const heritageStore = useHeritageStore()
const showTranscript = ref(false)

const heritageSlug = computed(() => {
  if (!audio.heritageId) return null
  return heritageStore.getById(audio.heritageId)?.slug ?? null
})

function onProgressClick(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  audio.setCurrentTime(ratio * (audio.duration ?? 0))
}

function cycleSpeed() {
  const rates = [1.0, 1.25, 1.5, 0.75]
  const currentIndex = rates.indexOf(audio.playbackRate)
  const nextIndex = (currentIndex + 1) % rates.length
  const nextRate = rates[nextIndex] ?? 1.0
  audio.setPlaybackRate(nextRate)
}
</script>

<style scoped>
.player-slide-enter-active,
.player-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.player-slide-enter-from,
.player-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
