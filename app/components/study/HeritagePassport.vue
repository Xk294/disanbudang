<template>
  <div class="space-y-8 animate-section-in">
    <!-- Header banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-earth-950 border border-gold-500/30 p-6 sm:p-8 shadow-2xl">
      <div class="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-400 p-0.5 shadow-xl shadow-gold-500/20 shrink-0">
            <div class="w-full h-full bg-charcoal-950 rounded-[14px] flex items-center justify-center">
              <Icon name="mdi:book-account-outline" class="w-8 h-8 text-gold-400" />
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-3xs uppercase tracking-widest font-bold text-gold-400">Digital Heritage Passport</span>
              <span class="px-2 py-0.5 rounded-full text-3xs font-bold bg-gold-500/20 text-gold-300 border border-gold-500/30">Chính Thức</span>
            </div>
            <h3 class="font-heading text-2xl sm:text-3xl font-bold text-ivory mt-0.5">
              Hộ Chiếu Di Sản Thành Phố Đồng Nai
            </h3>
            <p class="text-charcoal-300 text-xs sm:text-sm mt-1 max-w-xl">
              Hành trình thu thập con dấu mộc điện tử bằng cách khám phá thực tế, nghe thuyết minh và hoàn thành các bài trắc nghiệm tri thức.
            </p>
          </div>
        </div>

        <!-- Rank & Progress pill -->
        <div class="flex items-center gap-4 bg-charcoal-950/80 border border-charcoal-800 rounded-2xl p-4 shrink-0">
          <div class="text-right">
            <span class="block text-3xs uppercase tracking-wider text-charcoal-400 font-semibold">Cấp bậc hiện tại</span>
            <span class="block text-sm font-bold text-gold-400 font-heading">{{ currentRank.title }}</span>
            <span class="block text-3xs text-charcoal-400 mt-0.5">{{ stampedCount }}/{{ totalHeritages }} Dấu Mộc</span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xl font-bold">
            <Icon :name="currentRank.icon" class="w-6 h-6 text-gold-400" />
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="mt-6 pt-4 border-t border-charcoal-850/80">
        <div class="flex items-center justify-between text-xs text-charcoal-300 mb-2">
          <span>Tiến trình hoàn thành hộ chiếu</span>
          <span class="font-bold text-gold-400">{{ Math.round((stampedCount / totalHeritages) * 100) }}%</span>
        </div>
        <div class="w-full h-2 bg-charcoal-850 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-earth-600 via-gold-500 to-gold-400 rounded-full transition-all duration-700"
            :style="{ width: `${(stampedCount / totalHeritages) * 100}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Stamps Grid -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <span class="section-label">Bộ sưu tập dấu mộc</span>
          <h4 class="font-heading text-xl font-bold text-ivory">16 Tem Di Sản Lịch Sử & Danh Thắng</h4>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="filter-chip"
            :class="stampFilter === 'all' ? 'filter-chip-active' : 'filter-chip-inactive'"
            @click="stampFilter = 'all'"
          >
            Tất cả ({{ totalHeritages }})
          </button>
          <button
            class="filter-chip"
            :class="stampFilter === 'collected' ? 'filter-chip-active' : 'filter-chip-inactive'"
            @click="stampFilter = 'collected'"
          >
            Đã có dấu ({{ stampedCount }})
          </button>
          <button
            class="filter-chip"
            :class="stampFilter === 'uncollected' ? 'filter-chip-active' : 'filter-chip-inactive'"
            @click="stampFilter = 'uncollected'"
          >
            Chưa có ({{ totalHeritages - stampedCount }})
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="h in filteredHeritages"
          :key="h.id"
          class="relative overflow-hidden rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          :class="isStamped(h.id)
            ? 'bg-charcoal-950/90 border-gold-500/40 hover:border-gold-400 hover:shadow-xl hover:shadow-gold-500/10'
            : 'bg-charcoal-950/40 border-charcoal-850 hover:border-charcoal-700 opacity-75 hover:opacity-100'"
          @click="openHeritageOrQuiz(h)"
        >
          <!-- Stamp image / card header -->
          <div class="h-36 relative overflow-hidden bg-charcoal-900">
            <img
              :src="h.coverImage"
              :alt="h.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              :class="isStamped(h.id) ? 'opacity-85' : 'opacity-40 grayscale contrast-125'"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />

            <!-- Stamp badge overlay -->
            <div v-if="isStamped(h.id)" class="absolute top-3 right-3 animate-pulse-slow">
              <div class="w-12 h-12 rounded-full border-2 border-gold-400/80 bg-charcoal-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-gold-400 rotate-[-12deg] shadow-lg shadow-gold-500/20">
                <Icon name="mdi:seal" class="w-5 h-5" />
                <span class="text-[7px] font-bold uppercase tracking-widest leading-none mt-0.5">Verified</span>
              </div>
            </div>
            <div v-else class="absolute top-3 right-3">
              <div class="w-9 h-9 rounded-full border border-dashed border-charcoal-600 bg-charcoal-950/80 flex items-center justify-center text-charcoal-500">
                <Icon name="mdi:lock-outline" class="w-4 h-4" />
              </div>
            </div>

            <span class="absolute bottom-2 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-charcoal-950/80 border border-charcoal-750 text-gold-400">
              {{ getCategoryLabel(h.category) }}
            </span>
          </div>

          <!-- Card Content -->
          <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <h5 class="font-heading font-bold text-sm text-ivory leading-snug group-hover:text-gold-300 transition-colors">
                {{ h.title }}
              </h5>
              <p class="text-charcoal-400 text-xs mt-1 line-clamp-2">{{ h.subtitle || h.shortDescription }}</p>
            </div>

            <div class="pt-2 border-t border-charcoal-850 flex items-center justify-between text-2xs">
              <span v-if="isStamped(h.id)" class="text-green-400 font-semibold flex items-center gap-1">
                <Icon name="mdi:check-circle" class="w-3.5 h-3.5" /> Đã đóng dấu
              </span>
              <span v-else class="text-charcoal-400 flex items-center gap-1">
                <Icon name="mdi:help-circle-outline" class="w-3.5 h-3.5" /> Chưa khám phá
              </span>

              <span class="text-gold-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Xem ngay <Icon name="mdi:arrow-right" class="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuizStore } from '~/stores/quiz'
import { useHeritageStore } from '~/stores/heritage'
import { useHeritage } from '~/composables/useHeritage'
import type { Heritage } from '~/types'

const quizStore = useQuizStore()
const heritageStore = useHeritageStore()
const { getCategoryLabel } = useHeritage()

const stampFilter = ref<'all' | 'collected' | 'uncollected'>('all')

const totalHeritages = computed(() => heritageStore.publishedHeritages.length || 16)

const stampedIds = computed(() => {
  const visited = quizStore.userProgress.visitedHeritages || []
  const completed = (quizStore.userProgress.completedQuizzes || []).map(qId => {
    const q = quizStore.quizzes.find(item => item.id === qId)
    return q?.heritageId
  }).filter(Boolean) as string[]

  return Array.from(new Set([...visited, ...completed]))
})

const stampedCount = computed(() => stampedIds.value.length)

function isStamped(heritageId: string): boolean {
  return stampedIds.value.includes(heritageId)
}

const ranks = [
  { min: 0, title: 'Tân Thủ Di Sản', icon: 'mdi:compass-outline' },
  { min: 4, title: 'Nhà Khám Phá Trẻ', icon: 'mdi:map-search-outline' },
  { min: 8, title: 'Sứ Giả Văn Hóa', icon: 'mdi:medal-outline' },
  { min: 14, title: 'Bậc Thầy Di Sản Đồng Nai', icon: 'mdi:crown-outline' },
]

const currentRank = computed(() => {
  const count = stampedCount.value
  let rank = ranks[0]!
  for (const r of ranks) {
    if (count >= r.min) rank = r
  }
  return rank
})

const filteredHeritages = computed(() => {
  const all = heritageStore.publishedHeritages
  if (stampFilter.value === 'collected') {
    return all.filter(h => isStamped(h.id))
  }
  if (stampFilter.value === 'uncollected') {
    return all.filter(h => !isStamped(h.id))
  }
  return all
})

function openHeritageOrQuiz(heritage: Heritage) {
  // Mark as visited when clicked
  quizStore.markHeritageVisited(heritage.id)
  navigateTo(`/heritage/${heritage.slug}`)
}
</script>
