<template>
  <Transition name="slide-up">
    <div
      v-if="audioStore.currentTrack && audioStore.isMiniPlayerVisible"
      class="tour-audio-bar fixed top-20 right-6 z-30 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-charcoal-950/85 backdrop-blur-xl border border-emerald-500/30 shadow-2xl max-w-sm select-none"
    >
      <!-- Pulse Disc Indicator -->
      <button
        type="button"
        class="relative w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0 hover:scale-105 transition-transform"
        :aria-label="audioStore.isPlaying ? 'Tạm dừng audio' : 'Phát audio'"
        @click="audioStore.togglePlay"
      >
        <span v-if="audioStore.isPlaying" class="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
        <Icon :name="audioStore.isPlaying ? 'mdi:pause' : 'mdi:play'" class="w-5 h-5 relative z-10" />
      </button>

      <!-- Track Info & Progress -->
      <div class="flex-1 min-w-0 pr-1">
        <div class="flex items-center justify-between gap-1">
          <p class="text-xs font-bold text-ivory truncate">
            {{ audioStore.currentTrack.title }}
          </p>
          <span class="text-[10px] text-emerald-400/90 font-mono shrink-0">
            {{ audioStore.formattedCurrentTime }} / {{ audioStore.formattedDuration }}
          </span>
        </div>

        <p class="text-[10px] text-charcoal-400 truncate mt-0.5">
          {{ audioStore.currentTrack.narrator || 'Thuyết minh di sản' }}
        </p>

        <!-- Progress bar -->
        <div
          class="relative h-1.5 bg-charcoal-800 rounded-full mt-1.5 cursor-pointer overflow-hidden group"
          @click="handleSeek"
        >
          <div
            class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-150"
            :style="{ width: `${audioStore.progressPercent}%` }"
          />
        </div>
      </div>

      <!-- Close button -->
      <button
        type="button"
        class="w-7 h-7 rounded-full text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 flex items-center justify-center transition-colors shrink-0"
        title="Tắt audio"
        @click="audioStore.closeMiniPlayer"
      >
        <Icon name="mdi:close" class="w-4 h-4" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAudioStore } from '~/stores/audio'

const audioStore = useAudioStore()

function handleSeek(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  audioStore.setCurrentTime(ratio * audioStore.duration)
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
