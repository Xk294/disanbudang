<template>
  <div class="tour-artifact-modal-root select-none">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="isOpen && artifact"
        class="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
        @click="$emit('close')"
      >
        <!-- Modal Card Container -->
        <div
          class="relative w-full max-w-4xl max-h-[90vh] bg-charcoal-950/95 border border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl"
          @click.stop
        >
          <!-- Header -->
          <div class="px-6 py-5 border-b border-charcoal-850 flex items-start justify-between gap-4 shrink-0 bg-charcoal-900/50">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded-full text-2xs font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30">
                  {{ artifact.category || 'Bảo Vật Di Sản' }}
                </span>
                <span class="text-xs text-charcoal-400">• {{ artifact.period }}</span>
              </div>
              <h2 class="font-heading font-bold text-ivory text-2xl md:text-3xl">
                {{ artifact.name }}
              </h2>
              <p v-if="artifact.subtitle" class="text-gold-400/90 text-sm italic font-accent mt-0.5">
                "{{ artifact.subtitle }}"
              </p>
            </div>

            <button
              type="button"
              class="w-10 h-10 rounded-full bg-charcoal-900 border border-charcoal-800 text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 flex items-center justify-center transition-all shrink-0"
              aria-label="Đóng hiện vật"
              @click="$emit('close')"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Media Viewport (Tabs for Photo vs 3D Model) -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">Trình Chiếu Hiện Vật</span>
                <!-- Tab Selector -->
                <div class="flex items-center p-1 rounded-xl bg-charcoal-900 border border-charcoal-800 text-xs">
                  <button
                    type="button"
                    class="px-3 py-1 rounded-lg font-medium transition-all"
                    :class="activeMediaTab === 'photo' ? 'bg-gold-500 text-charcoal-950 font-bold shadow' : 'text-charcoal-400 hover:text-ivory'"
                    @click="activeMediaTab = 'photo'"
                  >
                    <Icon name="mdi:image-outline" class="w-3.5 h-3.5 inline mr-1" />
                    Ảnh Tư Liệu
                  </button>
                  <button
                    type="button"
                    class="px-3 py-1 rounded-lg font-medium transition-all"
                    :class="activeMediaTab === '3d' ? 'bg-gold-500 text-charcoal-950 font-bold shadow' : 'text-charcoal-400 hover:text-ivory'"
                    @click="activeMediaTab = '3d'"
                  >
                    <Icon name="mdi:cube-scan" class="w-3.5 h-3.5 inline mr-1" />
                    Không Gian 3D (Future)
                  </button>
                </div>
              </div>

              <!-- PHOTO VIEW -->
              <div
                v-if="activeMediaTab === 'photo'"
                class="relative rounded-2xl overflow-hidden border border-charcoal-800 aspect-[16/9] md:aspect-[21/9] bg-charcoal-900 group shadow-inner"
              >
                <img
                  :src="activePhotoSrc || artifact.image"
                  :alt="artifact.name"
                  class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent pointer-events-none" />
                <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-charcoal-300">
                  <span>{{ artifact.preservationPlace || 'Lưu giữ tại Di Tích Sóc Bom Bo' }}</span>
                  <span class="text-gold-400 font-medium">Bản quyền tư liệu DiSanBudang</span>
                </div>
              </div>

              <!-- 3D MODEL VIEWPORT (Future ready architecture) -->
              <div
                v-else
                class="relative rounded-2xl overflow-hidden border border-gold-500/30 aspect-[16/9] md:aspect-[21/9] bg-gradient-to-b from-charcoal-900 to-charcoal-950 flex flex-col items-center justify-center p-6 text-center shadow-inner"
              >
                <!-- 3D Hologram / Relic Placeholder Animation -->
                <div class="relative w-28 h-28 flex items-center justify-center mb-3">
                  <div class="absolute inset-0 rounded-full border border-gold-500/30 animate-spin-slow" />
                  <div class="absolute inset-2 rounded-full border border-dashed border-gold-400/40 animate-spin" />
                  <Icon name="mdi:cube-outline" class="w-12 h-12 text-gold-400 animate-pulse" />
                </div>
                <h4 class="font-heading font-bold text-ivory text-lg">Kiến Trúc Mô Hình 3D Đã Sẵn Sàng</h4>
                <p class="text-xs text-charcoal-400 max-w-md mt-1 leading-relaxed">
                  Hệ thống viewer đã được thiết kế sẵn sàng nhận tệp mô hình 3D (.glb / .gltf / Photogrammetry scan). Khi dữ liệu scan được cung cấp, mô hình sẽ tự động hiển thị với khả năng xoay 360° đa chiều.
                </p>
                <div class="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-2xs font-semibold uppercase tracking-wider">
                  <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                  Chuẩn hóa định dạng GLTF / WebGL
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">Mô Tả Hiện Vật</h3>
              <p class="text-charcoal-300 text-sm md:text-base leading-relaxed">
                {{ artifact.description }}
              </p>
            </div>

            <!-- Specifications Grid -->
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">Thông Số Kỹ Thuật & Khảo Cổ</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div class="p-3.5 rounded-2xl bg-charcoal-900/70 border border-charcoal-800">
                  <p class="text-2xs uppercase tracking-wider text-charcoal-500 font-semibold">Niên Đại</p>
                  <p class="text-xs font-semibold text-ivory mt-1">{{ artifact.period }}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-charcoal-900/70 border border-charcoal-800">
                  <p class="text-2xs uppercase tracking-wider text-charcoal-500 font-semibold">Chất Liệu</p>
                  <p class="text-xs font-semibold text-ivory mt-1">{{ artifact.material }}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-charcoal-900/70 border border-charcoal-800">
                  <p class="text-2xs uppercase tracking-wider text-charcoal-500 font-semibold">Kích Thước</p>
                  <p class="text-xs font-semibold text-ivory mt-1">{{ artifact.dimensions }}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-charcoal-900/70 border border-charcoal-800">
                  <p class="text-2xs uppercase tracking-wider text-charcoal-500 font-semibold">Công Dụng</p>
                  <p class="text-xs font-semibold text-ivory mt-1">{{ artifact.usage }}</p>
                </div>
                <div v-if="artifact.origin" class="p-3.5 rounded-2xl bg-charcoal-900/70 border border-charcoal-800">
                  <p class="text-2xs uppercase tracking-wider text-charcoal-500 font-semibold">Xuất Xứ</p>
                  <p class="text-xs font-semibold text-ivory mt-1">{{ artifact.origin }}</p>
                </div>
                <div v-if="artifact.preservationPlace" class="p-3.5 rounded-2xl bg-charcoal-900/70 border border-charcoal-800">
                  <p class="text-2xs uppercase tracking-wider text-charcoal-500 font-semibold">Nơi Lưu Giữ</p>
                  <p class="text-xs font-semibold text-ivory mt-1">{{ artifact.preservationPlace }}</p>
                </div>
              </div>
            </div>

            <!-- Historical Significance -->
            <div class="p-5 rounded-2xl bg-gold-500/5 border border-gold-500/20 space-y-2">
              <div class="flex items-center gap-2 text-gold-400 font-bold uppercase tracking-wider text-2xs">
                <Icon name="mdi:star-four-points-outline" class="w-4 h-4" />
                <span>Giá Trị Lịch Sử & Văn Hóa</span>
              </div>
              <p class="text-charcoal-300 text-sm leading-relaxed">
                {{ artifact.historicalSignificance }}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-charcoal-850 bg-charcoal-900/50 flex items-center justify-between shrink-0">
            <span class="text-xs text-charcoal-400">Bảo tàng số Di Sản Bù Đăng</span>
            <button
              type="button"
              class="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold transition-all shadow-gold/20 shadow-md"
              @click="$emit('close')"
            >
              Đóng và tiếp tục tham quan
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Artifact } from '~/types/virtualTour'

const props = defineProps<{
  artifact: Artifact | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const activeMediaTab = ref<'photo' | '3d'>('photo')
const activePhotoSrc = ref('')

watch(() => props.artifact, (newArt) => {
  if (newArt) {
    activePhotoSrc.value = newArt.image
    activeMediaTab.value = 'photo'
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
