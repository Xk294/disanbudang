<template>
  <div class="location-detail-container flex flex-col gap-5 p-4 pb-12 text-left">
    <!-- Hero Image / Cover Image -->
    <div class="relative h-48 w-full rounded-2xl overflow-hidden border border-charcoal-800 shadow-md">
      <img
        :src="selectedHeritage.coverImage"
        :alt="selectedHeritage.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent"></div>
      <div class="absolute bottom-3 left-3 flex items-center gap-2 flex-wrap">
        <BaseBadge :variant="getCategoryVariant(selectedHeritage.category)" size="sm" class="uppercase tracking-widest font-bold">
          {{ getCategoryLabel(selectedHeritage.category) }}
        </BaseBadge>
        <HeritageSourceBadge :sources="selectedHeritage.sources" @open="isSourceModalOpen = true" />
      </div>
    </div>

    <!-- Title & Subtitle for Detailed View -->
    <div class="space-y-1">
      <h3 class="font-heading font-bold text-white text-lg leading-snug">{{ selectedHeritage.title }}</h3>
      <p v-if="selectedHeritage.subtitle" class="text-gold-300 text-xs font-accent italic">{{ selectedHeritage.subtitle }}</p>
    </div>

    <!-- Description -->
    <div class="space-y-2">
      <p class="text-charcoal-200 text-sm leading-relaxed whitespace-pre-line">
        {{ selectedHeritage.shortDescription }}
      </p>
    </div>

    <!-- Quick Facts Grid -->
    <div v-if="selectedHeritage.quickFacts && selectedHeritage.quickFacts.length > 0" class="space-y-2">
      <p class="text-[10px] text-gold-400 uppercase font-bold tracking-widest">Thông tin nhanh</p>
      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="(fact, fIdx) in selectedHeritage.quickFacts"
          :key="fIdx"
          class="flex items-center gap-2 bg-charcoal-900 p-2.5 rounded-xl border border-charcoal-800 hover:border-gold-500/20 hover:bg-charcoal-800 transition-all duration-200"
        >
          <div class="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center text-gold-400 shrink-0">
            <Icon :name="fact.icon ?? 'mdi:information-outline'" class="w-4 h-4" />
          </div>
          <div class="min-w-0">
            <p class="text-[9px] text-charcoal-400 uppercase font-bold tracking-wider truncate">{{ fact.label }}</p>
            <p class="text-xs text-white font-semibold truncate mt-0.5">{{ fact.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Audio Player -->
    <div v-if="selectedHeritage.audio" class="space-y-2">
      <p class="text-[10px] text-gold-400 uppercase font-bold tracking-widest flex items-center gap-1">
        <Icon name="mdi:headphones" class="w-3.5 h-3.5" />
        Audio Thuyết Minh
      </p>
      <div class="bg-gold-500/8 p-3 rounded-xl border border-gold-500/25 flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-white truncate">{{ selectedHeritage.audio.title }}</p>
          <p class="text-xs text-charcoal-400 truncate mt-0.5">Một câu chuyện được kể bởi {{ selectedHeritage.audio.narrator }}</p>
        </div>
        <div class="relative shrink-0">
          <!-- Pulse ring when playing -->
          <div
            v-if="isPlayingCurrentTrack"
            class="absolute inset-0 rounded-full bg-gold-500/30 animate-ping"
            style="animation-duration: 1.5s;"
          />
          <button
            class="relative w-10 h-10 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 flex items-center justify-center transition-all duration-300 shadow-lg shadow-gold-500/30 hover:scale-105 active:scale-95"
            @click="$emit('play-audio')"
            :aria-label="isPlayingCurrentTrack ? 'Tạm dừng thuyết minh' : 'Phát thuyết minh'"
          >
            <Icon :name="isPlayingCurrentTrack ? 'mdi:pause' : 'mdi:play'" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Video Player -->
    <div v-if="selectedHeritage.video" class="space-y-2">
      <p class="text-[10px] text-gold-400 uppercase font-bold tracking-widest flex items-center gap-1">
        <Icon name="mdi:video-outline" class="w-3.5 h-3.5" />
        Phim tư liệu di sản
      </p>
      <div class="rounded-xl overflow-hidden border border-charcoal-800 aspect-video bg-charcoal-950 relative shadow-inner">
        <video :src="selectedHeritage.video.url" controls class="w-full h-full object-cover" preload="metadata" />
      </div>
    </div>

    <!-- Photo Gallery -->
    <div v-if="selectedHeritage.gallery && selectedHeritage.gallery.length > 0" class="space-y-2">
      <p class="text-[10px] text-gold-400 uppercase font-bold tracking-widest flex items-center gap-1">
        <Icon name="mdi:image-multiple-outline" class="w-3.5 h-3.5" />
        Bộ sưu tập hình ảnh ({{ selectedHeritage.gallery.length }})
      </p>
      <div class="grid grid-cols-3 gap-1.5">
        <div
          v-for="(img, gIdx) in selectedHeritage.gallery"
          :key="gIdx"
          class="aspect-video rounded-lg overflow-hidden border border-charcoal-800 cursor-pointer hover:border-gold-400/60 transition-all relative group"
          @click="$emit('open-gallery', gIdx)"
        >
          <NuxtImg :src="img.src" :alt="img.alt" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Icon name="mdi:magnify-plus-outline" class="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- History & Lore -->
    <div class="space-y-2">
      <p class="text-[10px] text-gold-400 uppercase font-bold tracking-widest flex items-center gap-1">
        <Icon name="mdi:book-open-variant" class="w-3.5 h-3.5" />
        Câu chuyện di sản & Lịch sử
      </p>
      <div class="text-sm text-charcoal-200 leading-relaxed font-sans space-y-3 whitespace-pre-line">
        {{ selectedHeritage.longStory }}
      </div>
    </div>

    <!-- Nearby / Related Places -->
    <div v-if="relatedPlaces.length > 0" class="space-y-2.5">
      <p class="text-[10px] text-gold-400 uppercase font-bold tracking-widest flex items-center gap-1">
        <Icon name="mdi:map-marker-multiple-outline" class="w-3.5 h-3.5" />
        Địa điểm liên quan
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div
          v-for="place in relatedPlaces"
          :key="place.id"
          class="flex gap-2.5 p-2 rounded-xl cursor-pointer bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/30 transition-all duration-200"
          @click="$emit('select-heritage', place)"
        >
          <div class="w-14 h-11 rounded-lg overflow-hidden shrink-0 border border-charcoal-700">
            <NuxtImg :src="place.coverImage" :alt="place.title" class="w-full h-full object-cover" />
          </div>
          <div class="min-w-0 flex-1 flex flex-col justify-center">
            <p class="text-white text-xs font-semibold truncate leading-snug">{{ place.title }}</p>
            <p class="text-[9px] uppercase tracking-wider font-bold text-gold-400/90 mt-1">
              {{ getCategoryLabel(place.category) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action CTA Footer -->
    <div class="grid grid-cols-2 gap-3 pt-4 border-t border-charcoal-800/65 mt-2">
      <NuxtLink
        :to="`/heritage/${selectedHeritage.slug}`"
        class="btn-primary text-xs justify-center py-3 font-bold rounded-xl shadow-lg shadow-gold-500/10"
      >
        <Icon name="mdi:file-document-outline" class="w-4 h-4 mr-1" />
        Xem Chi Tiết
      </NuxtLink>
      <a
        :href="getGoogleMapsDirectionUrl(selectedHeritage)"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs border border-charcoal-700 text-charcoal-200 rounded-xl flex items-center justify-center gap-1 hover:border-gold-500/40 hover:text-gold-400 transition-colors bg-charcoal-900/80 py-3"
      >
        <Icon name="mdi:directions" class="w-4 h-4 text-gold-400" />
        Chỉ đường
      </a>
    </div>

    <!-- Source Verification Modal -->
    <HeritageSourceModal
      :is-open="isSourceModalOpen"
      :sources="selectedHeritage.sources"
      @close="isSourceModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Heritage } from '~/types'
import { useHeritageStore } from '~/stores/heritage'
import { useHeritage } from '~/composables/useHeritage'

const isSourceModalOpen = ref(false)

const props = defineProps<{
  selectedHeritage: Heritage
  isPlayingCurrentTrack: boolean
}>()

defineEmits<{
  (e: 'play-audio'): void
  (e: 'open-gallery', index: number): void
  (e: 'select-heritage', heritage: Heritage): void
}>()

const store = useHeritageStore()
const { getCategoryLabel } = useHeritage()

const relatedPlaces = computed(() => {
  return store.getRelated(props.selectedHeritage)
})

function getCategoryVariant(cat: string) {
  const map: Record<string, any> = {
    'lich-su': 'brick',
    'danh-thang': 'forest',
    'van-hoa-phi-vat-the': 'gold',
    'doi-song-cong-dong': 'earth',
    'giao-duc-truyen-thong': 'copper',
  }
  return map[cat] ?? 'gold'
}

function getGoogleMapsDirectionUrl(heritage: Heritage): string {
  if (heritage.coordinates && heritage.coordinates.lat && heritage.coordinates.lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${heritage.coordinates.lat},${heritage.coordinates.lng}`
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(heritage.title + ' Thành Phố Đồng Nai')}`
}
</script>
