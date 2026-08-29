<template>
  <div class="tour-navigation-drawer select-none">
    <!-- Bottom Quick Carousel Strip (always accessible when drawer is collapsed) -->
    <div
      v-if="!isOpen"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800 shadow-2xl max-w-[92vw] overflow-x-auto scrollbar-none transition-all duration-300"
    >
      <button
        type="button"
        class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-900/90 text-charcoal-300 hover:text-gold-300 hover:bg-charcoal-800 border border-charcoal-750 text-xs font-semibold shrink-0 transition-all"
        title="Danh sách điểm tham quan"
        @click="$emit('toggle')"
      >
        <Icon name="mdi:map-marker-multiple" class="w-4 h-4 text-gold-400" />
        <span class="hidden sm:inline">Điểm nhìn ({{ scenes.length }})</span>
      </button>

      <div class="h-4 w-px bg-charcoal-800 shrink-0" />

      <!-- Horizontal Thumbnails Strip -->
      <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
        <button
          v-for="(scene, idx) in scenes"
          :key="scene.id"
          type="button"
          class="scene-pill group relative flex items-center gap-2 px-2.5 py-1 rounded-xl text-xs transition-all shrink-0"
          :class="activeSceneId === scene.id ? 'bg-gold-500 text-charcoal-950 font-bold shadow-gold/30 shadow-md' : 'text-charcoal-300 hover:text-ivory hover:bg-charcoal-900/60'"
          @click="$emit('select-scene', scene.id)"
        >
          <span
            class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
            :class="activeSceneId === scene.id ? 'bg-charcoal-950 text-gold-400' : 'bg-charcoal-800 text-charcoal-400 group-hover:bg-gold-500/20 group-hover:text-gold-300'"
          >
            {{ idx + 1 }}
          </span>
          <span class="max-w-[120px] md:max-w-[160px] truncate text-left">{{ scene.title }}</span>
        </button>
      </div>
    </div>

    <!-- Full Slide-Over / Modal Scene List Drawer -->
    <Transition name="drawer-slide">
      <div
        v-if="isOpen"
        class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-charcoal-950/95 backdrop-blur-2xl border-l border-charcoal-800 shadow-2xl flex flex-col overflow-hidden"
      >
        <!-- Drawer Header -->
        <div class="p-5 border-b border-charcoal-850 flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span class="text-2xs font-bold uppercase tracking-widest text-gold-400">Lộ Trình Tham Quan</span>
            </div>
            <h2 class="font-heading font-bold text-ivory text-xl mt-1">Danh Sách Điểm Nhìn 360°</h2>
          </div>
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-charcoal-900 border border-charcoal-800 text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 flex items-center justify-center transition-all"
            aria-label="Đóng danh sách"
            @click="$emit('toggle')"
          >
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <!-- Tour Overview Card -->
        <div v-if="tourTitle" class="p-5 bg-charcoal-900/60 border-b border-charcoal-850">
          <p class="text-xs font-semibold text-gold-300/90">{{ tourTitle }}</p>
          <p class="text-xs text-charcoal-400 mt-1 line-clamp-2">{{ tourSubtitle }}</p>
        </div>

        <!-- Scenes List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <div
            v-for="(scene, idx) in scenes"
            :key="scene.id"
            class="scene-card group relative rounded-2xl border p-3.5 transition-all duration-300 cursor-pointer overflow-hidden"
            :class="activeSceneId === scene.id ? 'bg-gold-500/10 border-gold-500 shadow-gold/10 shadow-lg ring-1 ring-gold-500/40' : 'bg-charcoal-900/80 border-charcoal-800 hover:border-gold-500/40 hover:bg-charcoal-900'"
            @click="$emit('select-scene', scene.id)"
          >
            <div class="flex items-start gap-3.5">
              <!-- Thumbnail / Index -->
              <div class="relative w-20 h-16 rounded-xl overflow-hidden bg-charcoal-950 shrink-0 border border-charcoal-800 group-hover:border-gold-500/40 transition-colors">
                <img
                  v-if="scene.thumbnailUrl"
                  :src="scene.thumbnailUrl"
                  :alt="scene.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-charcoal-900 text-charcoal-500">
                  <Icon name="mdi:panorama-variant-outline" class="w-6 h-6" />
                </div>
                <span class="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-charcoal-950/80 text-[10px] font-bold text-gold-400 border border-charcoal-800">
                  #{{ idx + 1 }}
                </span>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="text-sm font-bold text-ivory group-hover:text-gold-300 transition-colors truncate">
                    {{ scene.title }}
                  </h3>
                  <span
                    v-if="activeSceneId === scene.id"
                    class="text-[10px] font-bold uppercase tracking-wider text-charcoal-950 bg-gold-400 px-2 py-0.5 rounded-full shrink-0"
                  >
                    Đang xem
                  </span>
                </div>
                <p v-if="scene.subtitle" class="text-xs text-gold-400/80 mt-0.5 truncate">
                  {{ scene.subtitle }}
                </p>
                <p class="text-xs text-charcoal-400 mt-1 line-clamp-2 leading-relaxed">
                  {{ scene.description }}
                </p>

                <!-- Hotspot Badges Count -->
                <div class="flex items-center gap-2 mt-2 text-[10px] text-charcoal-400">
                  <span class="flex items-center gap-1">
                    <Icon name="mdi:target" class="w-3 h-3 text-gold-400" />
                    {{ scene.hotspots.length }} điểm tương tác
                  </span>
                  <span v-if="scene.audioId" class="flex items-center gap-1 text-emerald-400">
                    <Icon name="mdi:headphones" class="w-3 h-3" />
                    Có thuyết minh
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div class="p-4 border-t border-charcoal-850 bg-charcoal-950 flex items-center justify-between text-xs text-charcoal-400">
          <span>{{ scenes.length }} điểm nhìn 360°</span>
          <span class="text-gold-400/90 font-medium">✨ Chuyển vị trí tức thì</span>
        </div>
      </div>
    </Transition>

    <!-- Backdrop for Drawer -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-charcoal-950/60 backdrop-blur-sm"
        @click="$emit('toggle')"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { TourScene } from '~/types/virtualTour'

defineProps<{
  scenes: TourScene[]
  activeSceneId: string
  isOpen: boolean
  tourTitle?: string
  tourSubtitle?: string
}>()

defineEmits<{
  (e: 'select-scene', sceneId: string): void
  (e: 'toggle'): void
}>()
</script>

<style scoped>
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
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
