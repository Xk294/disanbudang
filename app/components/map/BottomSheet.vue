<template>
  <div
    ref="sheetRef"
    class="bottom-sheet-wrapper"
    :style="wrapperStyle"
  >
    <div
      ref="cardRef"
      class="sheet-card bg-charcoal-950 border-t border-gold-500/25 rounded-t-3xl shadow-2xl flex flex-col will-change-transform"
      :class="{ 'is-fullscreen': currentState === 'fullscreen' }"
      :style="cardStyle"
    >
      <!-- Header / Drag handle container -->
      <div
        class="sheet-header bg-charcoal-900/90 backdrop-blur-md flex flex-col shrink-0 select-none touch-none cursor-grab active:cursor-grabbing border-b border-charcoal-850/50"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
      >
        <!-- Drag Handle -->
        <div class="drag-handle-wrapper w-full py-3 flex justify-center items-center">
          <div class="w-10 h-1 bg-charcoal-600 rounded-full"></div>
        </div>

        <!-- Sticky Header Row -->
        <div class="px-4 pb-4 flex items-center justify-between gap-3 min-h-[50px]">
          <!-- Header Content (Title, Category, Optional Thumbnail) -->
          <div class="flex items-center gap-3 flex-1 min-w-0 pointer-events-none">
            <!-- Thumbnail visible ONLY in Peek state -->
            <transition name="fade-thumb">
              <div
                v-if="currentState === 'peek' && selectedHeritage.coverImage"
                class="w-14 h-11 rounded-lg overflow-hidden shrink-0 border border-charcoal-700 shadow-md"
              >
                <NuxtImg :src="selectedHeritage.coverImage" :alt="selectedHeritage.title" class="w-full h-full object-cover" />
              </div>
            </transition>

            <div class="min-w-0 flex-1">
              <span class="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                {{ getCategoryLabel(selectedHeritage.category) }}
              </span>
              <h3 class="font-heading font-bold text-white text-base leading-snug mt-0.5 truncate">
                {{ selectedHeritage.title }}
              </h3>
            </div>
          </div>

          <!-- Close button -->
          <button
            class="text-charcoal-300 hover:text-white bg-charcoal-900 hover:bg-charcoal-800 rounded-full p-2 border border-charcoal-800 transition-colors shrink-0 flex items-center justify-center"
            style="width: 44px; height: 44px;"
            @click.stop="$emit('close')"
            @pointerdown.stop
            aria-label="Đóng bảng chi tiết"
          >
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Scrollable Body Content -->
      <div
        ref="bodyRef"
        class="sheet-body flex-1 overflow-y-auto scrollbar-none"
        :class="{ 'overflow-y-hidden': currentState === 'peek' }"
      >
        <LocationDetail
          :selected-heritage="selectedHeritage"
          :is-playing-current-track="isPlayingCurrentTrack"
          @play-audio="$emit('play-audio')"
          @open-gallery="(idx) => $emit('open-gallery', idx)"
          @select-heritage="(h) => $emit('select-heritage', h)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { Heritage } from '~/types'
import { useHeritageStore } from '~/stores/heritage'
import { useHeritage } from '~/composables/useHeritage'
import LocationDetail from './LocationDetail.vue'

const props = defineProps<{
  selectedHeritage: Heritage
  isPlayingCurrentTrack: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'play-audio'): void
  (e: 'open-gallery', index: number): void
  (e: 'select-heritage', heritage: Heritage): void
}>()

const store = useHeritageStore()
const { getCategoryLabel } = useHeritage()

const sheetRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)

// Snap states
type SheetState = 'peek' | 'expanded' | 'fullscreen'
const currentState = ref<SheetState>('peek')

const translateY = ref(0)
const isDragging = ref(false)

// Touch/Pointer tracking variables
const startY = ref(0)
const startTranslateY = ref(0)
const startTime = ref(0)
const hasMoved = ref(false)

// Calculate snap pixel offsets relative to top (y = 0)
const snapPoints = computed(() => {
  if (!import.meta.client) return { peek: 0, expanded: 0, fullscreen: 0 }
  const h = window.innerHeight
  return {
    peek: h - (0.22 * h),      // Peek at ~22vh height from bottom
    expanded: h - (0.70 * h),  // Expanded at 70vh height from bottom
    fullscreen: 0              // Fullscreen at 100vh height (top = 0)
  }
})

const updateTranslateForState = (state: SheetState) => {
  translateY.value = snapPoints.value[state]
}

// Watch selected heritage to reset to Peek state on change
watch(() => props.selectedHeritage, (newVal) => {
  if (newVal) {
    currentState.value = 'peek'
    nextTick(() => {
      updateTranslateForState('peek')
    })
  }
}, { immediate: true })

const handleResize = () => {
  updateTranslateForState(currentState.value)
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', handleResize)

    // Bind touch gestures on the body to allow scroll dragging
    nextTick(() => {
      const body = bodyRef.value
      if (body) {
        body.addEventListener('touchstart', onTouchStartBody, { passive: true })
        body.addEventListener('touchmove', onTouchMoveBody, { passive: false })
        body.addEventListener('touchend', onTouchEndBody, { passive: true })
      }
    })
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
    // Cleanup touch listeners to prevent memory leak
    const body = bodyRef.value
    if (body) {
      body.removeEventListener('touchstart', onTouchStartBody)
      body.removeEventListener('touchmove', onTouchMoveBody)
      body.removeEventListener('touchend', onTouchEndBody)
    }
  }
  // Ensure we unlock the map zoom/drag when closed
  store.mapGesturesEnabled = true
})

// Watch sheet height position to dynamically toggle map interaction
watch(translateY, (newVal) => {
  // If sheet height is >= 70% (i.e. translateY <= expanded snap point)
  const isTooTall = newVal <= snapPoints.value.expanded
  store.mapGesturesEnabled = !isTooTall
}, { immediate: true })

// --- GESTURE IMPLEMENTATION ---

const onPointerDown = (e: PointerEvent) => {
  const target = e.currentTarget as HTMLElement
  target.setPointerCapture(e.pointerId)
  
  isDragging.value = true
  hasMoved.value = false
  startY.value = e.clientY
  startTranslateY.value = translateY.value
  startTime.value = performance.now()
}

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return
  
  const deltaY = e.clientY - startY.value
  if (Math.abs(deltaY) > 5) {
    hasMoved.value = true
  }
  
  let newTranslate = startTranslateY.value + deltaY
  
  // Rubber banding past fullscreen
  if (newTranslate < 0) {
    newTranslate = newTranslate * 0.22
  }
  
  // Clamp at the bottom
  const maxTranslate = snapPoints.value.peek + 60
  if (newTranslate > maxTranslate) {
    newTranslate = maxTranslate + (newTranslate - maxTranslate) * 0.2
  }
  
  translateY.value = newTranslate
}

const onPointerUp = (e: PointerEvent) => {
  if (!isDragging.value) return
  isDragging.value = false
  
  const target = e.currentTarget as HTMLElement
  try {
    target.releasePointerCapture(e.pointerId)
  } catch (err) {}
  
  const deltaY = e.clientY - startY.value
  
  if (!hasMoved.value) {
    // Tap to toggle height state
    if (currentState.value === 'peek') {
      currentState.value = 'expanded'
    } else if (currentState.value === 'expanded') {
      currentState.value = 'fullscreen'
    } else {
      currentState.value = 'peek'
    }
    updateTranslateForState(currentState.value)
    return
  }
  
  const elapsed = performance.now() - startTime.value
  const velocity = deltaY / elapsed
  
  snapToState(deltaY, velocity)
}

// Body Touch handlers for dragging sheet when scrolled to top
let touchStartClientY = 0

const onTouchStartBody = (e: TouchEvent) => {
  const touch = e.touches?.[0]
  if (!touch) return
  touchStartClientY = touch.clientY
}

const onTouchMoveBody = (e: TouchEvent) => {
  const body = bodyRef.value
  const touch = e.touches?.[0]
  if (!body || !touch) return
  
  const currentTouchY = touch.clientY
  const deltaY = currentTouchY - touchStartClientY
  
  // Intercept scroll: if body is scrolled to the top and user drags DOWN
  if (body.scrollTop <= 0 && deltaY > 0) {
    if (e.cancelable) {
      e.preventDefault()
    }
    
    if (!isDragging.value) {
      isDragging.value = true
      startY.value = currentTouchY
      startTranslateY.value = translateY.value
      startTime.value = performance.now()
    }
  }
  
  if (isDragging.value) {
    const currentDeltaY = currentTouchY - startY.value
    let newTranslate = startTranslateY.value + currentDeltaY
    
    if (newTranslate < 0) {
      newTranslate = newTranslate * 0.22
    }
    
    translateY.value = newTranslate
  }
}

const onTouchEndBody = (e: TouchEvent) => {
  if (isDragging.value) {
    isDragging.value = false
    const touch = e.changedTouches?.[0]
    if (!touch) return
    const currentTouchY = touch.clientY
    const deltaY = currentTouchY - startY.value
    const elapsed = performance.now() - startTime.value
    const velocity = deltaY / elapsed
    
    snapToState(deltaY, velocity)
  }
}

// Snapping resolver matching high-performance flick gestures or closest targets
const snapToState = (deltaY: number, velocity: number) => {
  const currentY = translateY.value
  const snaps = snapPoints.value
  
  // Flick up (negative velocity)
  if (velocity < -0.38) {
    if (currentState.value === 'peek') {
      currentState.value = 'expanded'
    } else if (currentState.value === 'expanded') {
      currentState.value = 'fullscreen'
    }
  }
  // Flick down (positive velocity)
  else if (velocity > 0.38) {
    if (currentState.value === 'fullscreen') {
      currentState.value = 'expanded'
    } else if (currentState.value === 'expanded') {
      currentState.value = 'peek'
    } else if (currentState.value === 'peek') {
      emit('close')
      return
    }
  }
  // Slow Drag snapping to closest point
  else {
    const diffFull = Math.abs(currentY - snaps.fullscreen)
    const diffExp = Math.abs(currentY - snaps.expanded)
    const diffPeek = Math.abs(currentY - snaps.peek)
    
    const minDiff = Math.min(diffFull, diffExp, diffPeek)
    
    if (currentY > snaps.peek + 55) {
      emit('close')
      return
    }
    
    if (minDiff === diffFull) {
      currentState.value = 'fullscreen'
    } else if (minDiff === diffExp) {
      currentState.value = 'expanded'
    } else {
      currentState.value = 'peek'
    }
  }
  
  updateTranslateForState(currentState.value)
}

const wrapperStyle = computed(() => ({
  pointerEvents: 'none' as const
}))

const cardStyle = computed(() => {
  return {
    transform: `translate3d(0, ${translateY.value}px, 0)`,
    transition: isDragging.value ? 'none' : 'transform 0.45s cubic-bezier(0.19, 1, 0.22, 1)',
    maxHeight: '100vh',
    pointerEvents: 'auto' as const
  }
})
</script>

<style scoped>
.bottom-sheet-wrapper {
  position: fixed;
  inset: 0;
  z-index: 500;
}

.sheet-card {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.5), 0 -8px 10px -6px rgba(0, 0, 0, 0.5);
  transition-property: transform, padding-top;
}

/* Safe area padding top when fullscreened */
.sheet-card.is-fullscreen {
  padding-top: env(safe-area-inset-top);
}

.sheet-header {
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}

/* Custom transitions for compact header thumbnail */
.fade-thumb-enter-active,
.fade-thumb-leave-active {
  transition: all 0.35s cubic-bezier(0.19, 1, 0.22, 1);
}
.fade-thumb-enter-from,
.fade-thumb-leave-to {
  opacity: 0;
  width: 0;
  margin-right: -12px;
  transform: scale(0.85);
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .sheet-card {
    transition: none !important;
  }
}
</style>
