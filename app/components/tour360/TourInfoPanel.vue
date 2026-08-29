<template>
  <div class="tour-info-panel-root select-none">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="isOpen && hotspot"
        class="fixed inset-0 z-50 bg-charcoal-950/65 backdrop-blur-sm"
        @click="$emit('close')"
      />
    </Transition>

    <!-- Slide Panel / Bottom Sheet -->
    <Transition :name="isMobile ? 'sheet' : 'panel'">
      <div
        v-if="isOpen && hotspot"
        class="fixed z-50 overflow-hidden flex flex-col bg-charcoal-950/95 border border-charcoal-800 shadow-2xl backdrop-blur-2xl"
        :class="isMobile
          ? 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl border-b-0'
          : 'top-6 right-6 bottom-6 w-full max-w-lg rounded-3xl'
        "
      >
        <!-- Top bar with handle & close button -->
        <div class="relative px-6 pt-5 pb-4 border-b border-charcoal-850 flex items-center justify-between shrink-0">
          <div v-if="isMobile" class="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-charcoal-700" />

          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span class="text-2xs font-bold uppercase tracking-widest text-amber-400">Tư Liệu Di Sản</span>
          </div>

          <button
            type="button"
            class="w-9 h-9 rounded-full bg-charcoal-900 border border-charcoal-800 text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 flex items-center justify-center transition-all focus:outline-none"
            aria-label="Đóng bảng thông tin"
            @click="$emit('close')"
          >
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <!-- Scrollable Content Body -->
        <div class="flex-1 overflow-y-auto p-6 space-y-5">
          <!-- Title & Subtitle -->
          <div>
            <h2 class="font-heading font-bold text-ivory text-2xl md:text-3xl leading-snug">
              {{ hotspot.infoContent?.title || hotspot.title }}
            </h2>
            <p v-if="hotspot.infoContent?.subtitle || hotspot.description" class="text-gold-400/90 text-sm font-medium mt-1.5 font-accent italic">
              {{ hotspot.infoContent?.subtitle || hotspot.description }}
            </p>
          </div>

          <!-- Featured Image -->
          <div
            v-if="hotspot.infoContent?.image"
            class="relative rounded-2xl overflow-hidden border border-charcoal-800 aspect-[16/9] bg-charcoal-900 group shadow-lg"
          >
            <img
              :src="hotspot.infoContent.image"
              :alt="hotspot.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
          </div>

          <!-- Main Article Content -->
          <div class="prose-heritage text-charcoal-300 text-sm md:text-base leading-relaxed space-y-3">
            <p>{{ hotspot.infoContent?.content || hotspot.description }}</p>
          </div>

          <!-- Historical Context Box -->
          <div
            v-if="hotspot.infoContent?.historicalContext"
            class="p-4 rounded-2xl bg-gold-500/5 border border-gold-500/20 text-xs md:text-sm text-charcoal-300 space-y-1.5"
          >
            <div class="flex items-center gap-1.5 text-gold-400 font-semibold uppercase tracking-wider text-2xs">
              <Icon name="mdi:history" class="w-4 h-4" />
              <span>Bối Cảnh Lịch Sử</span>
            </div>
            <p class="leading-relaxed">{{ hotspot.infoContent.historicalContext }}</p>
          </div>

          <!-- Source Attribution -->
          <div
            v-if="hotspot.infoContent?.source"
            class="p-3.5 rounded-xl bg-charcoal-900/60 border border-charcoal-850 flex items-start gap-2.5 text-xs text-charcoal-400"
          >
            <Icon name="mdi:bookmark-check-outline" class="w-4 h-4 text-gold-400/80 shrink-0 mt-0.5" />
            <div>
              <span class="font-semibold text-charcoal-300">Nguồn tư liệu: </span>
              <span>{{ hotspot.infoContent.source }}</span>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-4 border-t border-charcoal-850 bg-charcoal-950/80 flex items-center justify-between shrink-0">
          <span class="text-xs text-charcoal-500">Khám phá không gian 360°</span>
          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-ivory text-xs font-semibold border border-charcoal-800 transition-colors"
            @click="$emit('close')"
          >
            Đóng bảng tư liệu
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Hotspot } from '~/types/virtualTour'

defineProps<{
  hotspot: Hotspot | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isMobile = ref(false)

function checkMobile() {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkMobile)
    window.removeEventListener('keydown', handleKeydown)
  }
})

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  }
}
</script>

<style scoped>
.panel-enter-active,
.panel-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.panel-enter-from,
.panel-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.sheet-enter-active,
.sheet-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
