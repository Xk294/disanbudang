<template>
  <div class="tour-control-overlay pointer-events-none select-none">
    <!-- TOP BAR -->
    <div class="fixed top-0 inset-x-0 z-30 p-4 md:p-6 flex items-center justify-between gap-4 pointer-events-auto">
      <!-- Back & Title -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800 text-charcoal-300 hover:text-ivory hover:border-gold-500/40 hover:bg-charcoal-900 transition-all text-xs font-semibold shadow-xl group cursor-pointer"
          title="Quay lại trang trước"
          @click="handleGoBack"
        >
          <Icon name="mdi:arrow-left" class="w-4 h-4 text-gold-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Quay Lại</span>
        </button>

        <!-- Current Scene Header Info -->
        <div class="px-4 py-2 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800 shadow-xl max-w-[200px] sm:max-w-md">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span class="text-2xs font-bold uppercase tracking-wider text-gold-400 truncate">
              {{ tourTitle || 'Không Gian 360°' }}
            </span>
          </div>
          <p class="text-xs md:text-sm font-bold text-ivory truncate mt-0.5">
            {{ sceneTitle || 'Điểm Quan Sát' }}
          </p>
        </div>
      </div>

      <!-- Top Right: Compass & Actions -->
      <div class="flex items-center gap-2.5">
        <!-- Compass -->
        <TourCompass :yaw="yaw" class="hidden sm:flex" />

        <!-- Scene List Button -->
        <button
          type="button"
          class="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800 text-charcoal-300 hover:text-gold-300 hover:border-gold-500/40 hover:bg-charcoal-900 transition-all text-xs font-semibold shadow-xl"
          :class="{ 'border-gold-500 text-gold-300 bg-charcoal-900': isSceneDrawerOpen }"
          title="Mở danh sách điểm nhìn"
          @click="$emit('toggle-scene-drawer')"
        >
          <Icon name="mdi:map-marker-path" class="w-4 h-4 text-gold-400" />
          <span class="hidden md:inline">Lộ Trình</span>
        </button>

        <!-- Fullscreen Button -->
        <button
          type="button"
          class="w-10 h-10 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800 text-charcoal-300 hover:text-ivory hover:border-gold-500/40 hover:bg-charcoal-900 flex items-center justify-center transition-all shadow-xl"
          :title="isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'"
          @click="$emit('toggle-fullscreen')"
        >
          <Icon :name="isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- RIGHT SIDE VERTICAL HUD TOOLBAR -->
    <div class="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 p-1.5 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-charcoal-800 shadow-2xl pointer-events-auto">
      <!-- Zoom In -->
      <button
        type="button"
        class="w-9 h-9 rounded-xl text-charcoal-300 hover:text-ivory hover:bg-charcoal-800/80 flex items-center justify-center transition-all"
        title="Phóng to (Zoom In)"
        @click="$emit('zoom-in')"
      >
        <Icon name="mdi:plus" class="w-5 h-5" />
      </button>

      <!-- Zoom Out -->
      <button
        type="button"
        class="w-9 h-9 rounded-xl text-charcoal-300 hover:text-ivory hover:bg-charcoal-800/80 flex items-center justify-center transition-all"
        title="Thu nhỏ (Zoom Out)"
        @click="$emit('zoom-out')"
      >
        <Icon name="mdi:minus" class="w-5 h-5" />
      </button>

      <div class="w-5 h-px bg-charcoal-800 self-center" />

      <!-- Reset View -->
      <button
        type="button"
        class="w-9 h-9 rounded-xl text-charcoal-300 hover:text-gold-300 hover:bg-charcoal-800/80 flex items-center justify-center transition-all"
        title="Góc nhìn ban đầu (Reset View)"
        @click="$emit('reset-view')"
      >
        <Icon name="mdi:restart" class="w-4 h-4" />
      </button>

      <!-- Toggle Auto-Rotate -->
      <button
        type="button"
        class="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
        :class="isAutoRotateActive ? 'text-gold-400 bg-gold-500/15' : 'text-charcoal-300 hover:text-ivory hover:bg-charcoal-800/80'"
        :title="isAutoRotateActive ? 'Dừng tự động xoay' : 'Tự động xoay 360°'"
        @click="$emit('toggle-auto-rotate')"
      >
        <Icon name="mdi:rotate-3d-variant" class="w-5 h-5" />
      </button>

      <!-- Toggle Hotspots -->
      <button
        type="button"
        class="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
        :class="areHotspotsVisible ? 'text-ivory' : 'text-charcoal-600 hover:text-charcoal-400'"
        :title="areHotspotsVisible ? 'Ẩn các điểm tương tác' : 'Hiện các điểm tương tác'"
        @click="$emit('toggle-hotspots')"
      >
        <Icon :name="areHotspotsVisible ? 'mdi:eye-outline' : 'mdi:eye-off-outline'" class="w-4 h-4" />
      </button>

      <!-- Help / Guide -->
      <button
        type="button"
        class="w-9 h-9 rounded-xl text-charcoal-400 hover:text-gold-300 hover:bg-charcoal-800/80 flex items-center justify-center transition-all"
        title="Hướng dẫn điều hướng"
        @click="isHelpOpen = true"
      >
        <Icon name="mdi:help-circle-outline" class="w-4 h-4" />
      </button>
    </div>

    <!-- HELP / SHORTCUTS MODAL -->
    <Transition name="fade">
      <div
        v-if="isHelpOpen"
        class="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto"
        @click="isHelpOpen = false"
      >
        <div
          class="w-full max-w-md bg-charcoal-950 border border-gold-500/30 rounded-3xl p-6 shadow-2xl space-y-4"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-charcoal-850 pb-3">
            <div class="flex items-center gap-2">
              <Icon name="mdi:compass-outline" class="w-5 h-5 text-gold-400" />
              <h3 class="font-heading font-bold text-ivory text-lg">Hướng Dẫn Khám Phá 360°</h3>
            </div>
            <button
              type="button"
              class="w-8 h-8 rounded-full bg-charcoal-900 text-charcoal-400 hover:text-ivory flex items-center justify-center"
              @click="isHelpOpen = false"
            >
              <Icon name="mdi:close" class="w-4 h-4" />
            </button>
          </div>

          <div class="space-y-3 text-xs text-charcoal-300">
            <div class="flex items-center gap-3 p-2.5 rounded-xl bg-charcoal-900/60 border border-charcoal-800">
              <Icon name="mdi:mouse" class="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p class="font-bold text-ivory">Xoay không gian</p>
                <p class="text-charcoal-400">Giữ chuột trái và kéo / Chạm và vuốt trên điện thoại</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-2.5 rounded-xl bg-charcoal-900/60 border border-charcoal-800">
              <Icon name="mdi:magnify-plus-outline" class="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p class="font-bold text-ivory">Phóng to / Thu nhỏ</p>
                <p class="text-charcoal-400">Cuộn con lăn chuột / Dùng 2 ngón tay chụm mở (Pinch zoom)</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-2.5 rounded-xl bg-charcoal-900/60 border border-charcoal-800">
              <Icon name="mdi:target" class="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p class="font-bold text-ivory">Điểm tương tác (Hotspots)</p>
                <p class="text-charcoal-400">Nhấp vào biểu tượng để di chuyển, đọc tư liệu, xem hiện vật 3D hoặc nghe Audio Guide</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="w-full py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs transition-all shadow-gold/20 shadow-md"
            @click="isHelpOpen = false"
          >
            Đã hiểu, tiếp tục trải nghiệm
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import TourCompass from './TourCompass.vue'

const props = defineProps<{
  tourTitle?: string
  sceneTitle?: string
  backUrl?: string
  yaw: number
  isFullscreen: boolean
  isSceneDrawerOpen: boolean
  isAutoRotateActive: boolean
  areHotspotsVisible: boolean
}>()

defineEmits<{
  (e: 'toggle-fullscreen'): void
  (e: 'toggle-scene-drawer'): void
  (e: 'toggle-auto-rotate'): void
  (e: 'toggle-hotspots'): void
  (e: 'zoom-in'): void
  (e: 'zoom-out'): void
  (e: 'reset-view'): void
}>()

const router = useRouter()
const isHelpOpen = ref(false)

function handleGoBack() {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    router.back()
  }
  else {
    router.push(props.backUrl || '/explore')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
