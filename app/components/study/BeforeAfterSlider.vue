<template>
  <div class="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-charcoal-800 select-none touch-none" ref="containerRef">
    <!-- Right side: Modern image (After) -->
    <div class="absolute inset-0">
      <NuxtImg :src="modernImage" alt="Hiện đại" class="w-full h-full object-cover pointer-events-none" />
      <div class="absolute bottom-4 right-4 bg-charcoal-950/70 border border-charcoal-800 rounded-lg px-2.5 py-1 text-ivory text-3xs font-bold uppercase tracking-wider backdrop-blur-sm">
        Ngày nay
      </div>
    </div>

    <!-- Left side: Historical image (Before) -->
    <div class="absolute inset-0 overflow-hidden" :style="{ width: sliderPosition + '%' }">
      <!-- We make it twice the width or absolute position so it stays scaled -->
      <div class="absolute inset-0" :style="{ width: containerWidth + 'px' }">
        <NuxtImg :src="historicalImage" alt="Xưa" class="w-full h-full object-cover pointer-events-none filter sepia contrast-125 brightness-90 grayscale-[0.8]" />
      </div>
      <div class="absolute bottom-4 left-4 bg-charcoal-950/70 border border-charcoal-800 rounded-lg px-2.5 py-1 text-gold-400 text-3xs font-bold uppercase tracking-wider backdrop-blur-sm">
        Năm 1965 (Mô phỏng tư liệu)
      </div>
    </div>

    <!-- Slider Line & Handle -->
    <div
      class="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-gold-600 via-gold-400 to-gold-600 cursor-ew-resize z-30"
      :style="{ left: sliderPosition + '%' }"
      @pointerdown="startDrag"
    >
      <!-- Glowing Dragger Handle -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal-900 border-2 border-gold-400 shadow-gold flex items-center justify-center text-gold-400 hover:scale-110 active:scale-95 transition-transform">
        <Icon name="mdi:chevron-left-right" class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  historicalImage: {
    type: String,
    default: '/images/heritage/Bombo/TAN08217.jpg'
  },
  modernImage: {
    type: String,
    default: '/images/heritage/Bombo/TAN08220.jpg'
  }
})

const containerRef = ref<HTMLElement | null>(null)
const sliderPosition = ref(50) // percentage
const containerWidth = ref(800)
let isDragging = false

function startDrag(e: PointerEvent) {
  isDragging = true
  if (containerRef.value) {
    containerRef.value.setPointerCapture(e.pointerId)
    containerRef.value.addEventListener('pointermove', onDrag)
    containerRef.value.addEventListener('pointerup', stopDrag)
    containerRef.value.addEventListener('pointercancel', stopDrag)
  }
}

function onDrag(e: PointerEvent) {
  if (!isDragging || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const pos = (x / rect.width) * 100
  sliderPosition.value = Math.max(0, Math.min(100, pos))
}

function stopDrag(e: PointerEvent) {
  isDragging = false
  if (containerRef.value) {
    containerRef.value.releasePointerCapture(e.pointerId)
    containerRef.value.removeEventListener('pointermove', onDrag)
    containerRef.value.removeEventListener('pointerup', stopDrag)
    containerRef.value.removeEventListener('pointercancel', stopDrag)
  }
}

function updateWidth() {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.getBoundingClientRect().width
  }
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>
