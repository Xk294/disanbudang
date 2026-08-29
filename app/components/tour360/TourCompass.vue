<template>
  <div class="tour-compass relative flex items-center justify-center select-none" :title="`Hướng nhìn: ${headingDegrees}° (${cardinalDirection})`">
    <div
      class="compass-dial relative w-11 h-11 rounded-full border border-gold-500/30 bg-charcoal-950/70 backdrop-blur-md flex items-center justify-center transition-transform duration-100 ease-out shadow-lg"
      :style="{ transform: `rotate(${-yaw}deg)` }"
    >
      <!-- North needle -->
      <div class="absolute top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[8px] border-b-rose-500" />
      <!-- South needle -->
      <div class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[8px] border-t-charcoal-400" />
      <!-- Cardinal labels -->
      <span class="absolute top-0.5 text-[8px] font-bold text-rose-400">N</span>
      <!-- Center dot -->
      <div class="w-1.5 h-1.5 rounded-full bg-gold-400 z-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  yaw: number // in degrees
}>()

const headingDegrees = computed(() => {
  let deg = Math.round(props.yaw) % 360
  if (deg < 0) deg += 360
  return deg
})

const cardinalDirection = computed(() => {
  const d = headingDegrees.value
  if (d >= 337.5 || d < 22.5) return 'Bắc (N)'
  if (d >= 22.5 && d < 67.5) return 'Đông Bắc (NE)'
  if (d >= 67.5 && d < 112.5) return 'Đông (E)'
  if (d >= 112.5 && d < 157.5) return 'Đông Nam (SE)'
  if (d >= 157.5 && d < 202.5) return 'Nam (S)'
  if (d >= 202.5 && d < 247.5) return 'Tây Nam (SW)'
  if (d >= 247.5 && d < 292.5) return 'Tây (W)'
  return 'Tây Bắc (NW)'
})
</script>
