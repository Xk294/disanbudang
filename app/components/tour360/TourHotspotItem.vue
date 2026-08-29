<template>
  <div
    v-if="hotspot.isVisible"
    class="tour-hotspot-item absolute -translate-x-1/2 -translate-y-1/2 select-none z-20"
    :style="{
      left: `${hotspot.screenX}px`,
      top: `${hotspot.screenY}px`,
      transform: `translate(-50%, -50%) scale(${hotspot.scale})`,
      opacity: hotspot.isVisible ? 1 : 0,
      pointerEvents: hotspot.isVisible ? 'auto' : 'none',
    }"
    :class="[`hotspot--${hotspot.type}`, { 'is-active': isActive }]"
  >
    <!-- Tooltip -->
    <div
      class="hotspot-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-xl whitespace-nowrap pointer-events-none transition-all duration-300 shadow-xl opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0"
    >
      <div class="flex items-center gap-1.5">
        <span
          class="w-1.5 h-1.5 rounded-full"
          :class="badgeColorClass"
        />
        <span class="text-2xs font-semibold uppercase tracking-wider text-charcoal-400">
          {{ typeLabel }}
        </span>
      </div>
      <p class="text-xs font-medium text-ivory mt-0.5 max-w-[200px] truncate text-center">
        {{ hotspot.title }}
      </p>
      <!-- Tooltip arrow -->
      <div class="tooltip-arrow absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-charcoal-950/90" />
    </div>

    <!-- Interactive Button -->
    <button
      :id="`hotspot-${hotspot.id}`"
      type="button"
      class="hotspot-trigger group relative flex items-center justify-center rounded-full transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400/80 active:scale-95"
      :aria-label="`${typeLabel}: ${hotspot.title}`"
      @click.stop="$emit('click', hotspot)"
    >
      <!-- Pulse Outer Waves -->
      <span class="hotspot-pulse-wave absolute inset-0 rounded-full animate-ping opacity-75" />
      <span class="hotspot-pulse-ring absolute -inset-2 rounded-full border opacity-50" />

      <!-- Inner Circle -->
      <div class="hotspot-core relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-300 group-hover:scale-115">
        <Icon :name="iconName" class="w-5 h-5 md:w-6 md:h-6 text-ivory transition-transform duration-300 group-hover:scale-110" />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ProjectedHotspot, HotspotType } from '~/types/virtualTour'

const props = defineProps<{
  hotspot: ProjectedHotspot
  isActive?: boolean
}>()

defineEmits<{
  (e: 'click', hotspot: ProjectedHotspot): void
}>()

const typeLabel = computed(() => {
  switch (props.hotspot.type) {
    case 'navigation':
      return 'Di chuyển'
    case 'info':
      return 'Thông tin'
    case 'audio':
      return 'Audio Guide'
    case 'artifact':
      return 'Hiện vật'
    default:
      return 'Điểm nhìn'
  }
})

const badgeColorClass = computed(() => {
  switch (props.hotspot.type) {
    case 'navigation':
      return 'bg-gold-400'
    case 'info':
      return 'bg-amber-400'
    case 'audio':
      return 'bg-emerald-400'
    case 'artifact':
      return 'bg-rose-400'
    default:
      return 'bg-gold-400'
  }
})

const iconName = computed(() => {
  if (props.hotspot.icon) return props.hotspot.icon
  switch (props.hotspot.type) {
    case 'navigation':
      return 'mdi:arrow-up-circle'
    case 'info':
      return 'mdi:information-variant'
    case 'audio':
      return 'mdi:headphones'
    case 'artifact':
      return 'mdi:cube-scan'
    default:
      return 'mdi:map-marker'
  }
})
</script>

<style scoped>
.tour-hotspot-item {
  will-change: transform, left, top, opacity;
  transition: opacity 0.2s ease;
}

/* Tooltip */
.hotspot-tooltip {
  background: rgba(18, 14, 11, 0.92);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(199, 166, 100, 0.3);
}

.hotspot-trigger:hover .hotspot-tooltip,
.hotspot-trigger:focus .hotspot-tooltip {
  opacity: 1;
  transform: translate(-50%, 0);
}

/* Navigation Type: Gold Glow */
.hotspot--navigation .hotspot-core {
  background: radial-gradient(circle at 30% 30%, #DEC89D 0%, #C7A664 60%, #8C723F 100%);
  border: 2px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 25px rgba(199, 166, 100, 0.65), 0 4px 12px rgba(0,0,0,0.5);
}
.hotspot--navigation .hotspot-pulse-wave {
  background-color: rgba(199, 166, 100, 0.5);
  animation-duration: 2.2s;
}
.hotspot--navigation .hotspot-pulse-ring {
  border-color: rgba(199, 166, 100, 0.6);
  animation: pulse-ring 2.2s ease-out infinite;
}

/* Info Type: Warm Amber */
.hotspot--info .hotspot-core {
  background: radial-gradient(circle at 30% 30%, #fed7aa 0%, #f97316 60%, #c2410c 100%);
  border: 2px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 25px rgba(249, 115, 22, 0.55), 0 4px 12px rgba(0,0,0,0.5);
}
.hotspot--info .hotspot-pulse-wave {
  background-color: rgba(249, 115, 22, 0.4);
  animation-duration: 2.5s;
}
.hotspot--info .hotspot-pulse-ring {
  border-color: rgba(249, 115, 22, 0.5);
  animation: pulse-ring 2.5s ease-out infinite;
}

/* Audio Type: Forest Emerald */
.hotspot--audio .hotspot-core {
  background: radial-gradient(circle at 30% 30%, #a7f3d0 0%, #10b981 60%, #047857 100%);
  border: 2px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 25px rgba(16, 185, 129, 0.55), 0 4px 12px rgba(0,0,0,0.5);
}
.hotspot--audio .hotspot-pulse-wave {
  background-color: rgba(16, 185, 129, 0.4);
  animation-duration: 2s;
}
.hotspot--audio .hotspot-pulse-ring {
  border-color: rgba(16, 185, 129, 0.5);
  animation: pulse-ring 2s ease-out infinite;
}

/* Artifact Type: Antique Rose / Bronze */
.hotspot--artifact .hotspot-core {
  background: radial-gradient(circle at 30% 30%, #fecdd3 0%, #e11d48 60%, #9f1239 100%);
  border: 2px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 25px rgba(225, 29, 72, 0.6), 0 4px 12px rgba(0,0,0,0.5);
}
.hotspot--artifact .hotspot-pulse-wave {
  background-color: rgba(225, 29, 72, 0.4);
  animation-duration: 2.4s;
}
.hotspot--artifact .hotspot-pulse-ring {
  border-color: rgba(225, 29, 72, 0.5);
  animation: pulse-ring 2.4s ease-out infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.6); opacity: 0; }
}
</style>
