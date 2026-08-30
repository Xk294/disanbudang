<template>
  <div
    class="relative group overflow-hidden rounded-2xl card-heritage cursor-pointer border border-charcoal-800/80 hover:border-gold-500/40 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(201,166,100,0.2)] transition-all duration-500 hover:-translate-y-1"
    role="button"
    tabindex="0"
    :aria-label="`Chi tiết di sản: ${heritage.title}`"
    @click="$emit('click')"
    @keydown.enter.prevent="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <!-- Image -->
    <div class="aspect-[4/3] overflow-hidden relative bg-charcoal-950">
      <NuxtImg
        :src="heritage.coverImage"
        :alt="heritage.title"
        class="card-image img-cinematic w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
        format="webp"
        sizes="xs:100vw sm:50vw md:33vw lg:25vw"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
    </div>

    <!-- Featured pin -->
    <div v-if="heritage.featured" class="absolute top-3 left-3 z-10">
      <div class="flex items-center gap-1 bg-gold-500 text-charcoal-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-gold">
        <Icon name="mdi:star" class="w-3 h-3" />
        <span>Nổi Bật</span>
      </div>
    </div>

    <!-- Audio interactive indicator / quick play -->
    <div
      v-if="heritage.audio"
      class="absolute top-3 right-3 z-10 flex items-center gap-1.5"
    >
      <button
        type="button"
        class="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border transition-all duration-300 shadow-md"
        :class="isThisPlaying
          ? 'bg-gold-500 text-charcoal-950 border-gold-400 animate-pulse'
          : 'bg-charcoal-950/80 text-gold-400 border-gold-500/30 hover:bg-gold-500 hover:text-charcoal-950'"
        :title="isThisPlaying ? 'Đang phát thuyết minh' : 'Nghe thuyết minh audio'"
        @click.stop="toggleCardAudio"
        @keydown.stop
      >
        <Icon :name="isThisPlaying ? 'mdi:pause' : 'mdi:headphones'" class="w-3.5 h-3.5" />
        <span class="text-[10px] font-bold uppercase">{{ isThisPlaying ? 'Đang phát' : 'Audio' }}</span>
        <span v-if="isThisPlaying" class="flex gap-0.5 items-end h-2.5">
          <span class="w-0.5 h-full bg-charcoal-950 animate-bounce" />
          <span class="w-0.5 h-2 bg-charcoal-950 animate-bounce" style="animation-delay: 0.15s" />
          <span class="w-0.5 h-1.5 bg-charcoal-950 animate-bounce" style="animation-delay: 0.3s" />
        </span>
      </button>
    </div>

    <!-- Caption panel: slim title bar at rest, expands to full detail on hover/focus -->
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/95 to-charcoal-950/80 backdrop-blur-md px-5 pt-4 pb-4 border-t border-charcoal-850/60">
      <!-- Title (always visible) -->
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-heading font-bold text-ivory text-base leading-snug line-clamp-1 group-hover:text-gold-300 group-focus-within:text-gold-300 transition-colors duration-300">
          {{ heritage.title }}
        </h3>
      </div>

      <p class="eyebrow text-gold-400 text-2xs mt-1 mb-1 font-semibold flex items-center gap-1.5">
        <span>{{ getCategoryLabel(heritage.category) }}</span>
        <span v-if="heritage.year" class="text-charcoal-450">• {{ heritage.year }}</span>
      </p>

      <!-- Reveal on hover/focus -->
      <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out-expo">
        <div class="overflow-hidden">
          <p class="text-charcoal-300 text-xs leading-relaxed line-clamp-2 my-2 font-body">
            {{ heritage.shortDescription }}
          </p>

          <div class="flex items-center justify-between pt-2 border-t border-charcoal-800/60">
            <div class="flex gap-1.5 flex-wrap">
              <span
                v-for="tag in heritage.tags.slice(0, 2)"
                :key="tag"
                class="text-3xs text-charcoal-300 bg-charcoal-900 border border-charcoal-800 px-2 py-0.5 rounded-full"
              >
                #{{ tag }}
              </span>
            </div>

            <div
              class="flex items-center justify-center w-7 h-7 rounded-full bg-gold-500 text-charcoal-950 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-300 ease-out shrink-0 shadow-gold"
            >
              <Icon name="mdi:arrow-right" class="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Heritage } from '~/types'
import { useAudioStore } from '~/stores/audio'

const props = defineProps<{
  heritage: Heritage
}>()
defineEmits(['click'])

const { getCategoryLabel } = useHeritage()
const audioStore = useAudioStore()

const isThisPlaying = computed(() => {
  return audioStore.isPlaying && audioStore.heritageId === props.heritage.id
})

function toggleCardAudio() {
  if (!props.heritage.audio) return
  if (isThisPlaying.value) {
    audioStore.pause()
  } else if (audioStore.heritageId === props.heritage.id && audioStore.currentTrack) {
    audioStore.play()
  } else {
    audioStore.loadTrack(props.heritage.audio, props.heritage.id)
    audioStore.play()
  }
}
</script>
