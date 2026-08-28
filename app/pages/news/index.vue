<template>
  <div class="bg-charcoal-900 min-h-screen">
    <!-- Hero -->
    <div class="bg-dark-earth py-12 md:py-16 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-64 h-64 bg-forest-500/10 rounded-full blur-3xl" />
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Góc Chia Sẻ & Nghiên Cứu</span>
        <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 text-balance tracking-[-0.03em]">
          Bài Viết &<br/><span class="text-gradient-gold">Di Sản Bù Đăng</span>
        </h1>
        <p class="text-charcoal-300 text-lg max-w-xl">
          Các bài viết chuyên sâu về đời sống văn hóa, phong tục độc đáo và tư liệu quý giá của Thành Phố Đồng Nai.
        </p>
      </div>
    </div>

    <div class="container-heritage py-14">
      <!-- Category filter -->
      <div class="flex items-center gap-3 overflow-x-auto scrollbar-none mb-10">
        <button
          v-for="cat in ['all', ...newsCategories]"
          :key="cat"
          class="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border"
          :class="activeCategory === cat
            ? 'bg-gold-500 text-charcoal-900 border-transparent shadow-gold'
            : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory bg-charcoal-950/50'"
          @click="activeCategory = cat"
        >
          <Icon :name="categoryIcons[cat as string] ?? 'mdi:apps'" class="w-4 h-4" />
          {{ cat === 'all' ? 'Tất Cả' : categoryLabels[cat as NewsCategory] }}
        </button>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="article in filteredNews"
          :key="article.id"
          class="bg-charcoal-950 border border-charcoal-850 rounded-2xl p-6 shadow-lg hover:border-gold-500/30 hover:shadow-gold-500/5 transition-all duration-300 reveal flex flex-col group"
        >
          <!-- Article Cover Image -->
          <div class="relative overflow-hidden rounded-xl aspect-[16/10] mb-5 border border-charcoal-800/80">
            <NuxtImg :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover transition-transform duration-750 ease-out-expo group-hover:scale-105" />
          </div>

          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
              <Icon :name="categoryIcons[article.category] ?? 'mdi:book-open-page-variant-outline'" class="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <p class="text-gold-400 text-sm font-semibold">{{ formatDate(article.publishedAt) }}</p>
              <p class="text-charcoal-400 text-xs">{{ article.readTime }} phút đọc</p>
            </div>
          </div>
          <h3 class="font-heading font-bold text-ivory text-base leading-snug mb-2 line-clamp-2 group-hover:text-gold-300 transition-colors">{{ article.title }}</h3>
          <p class="text-charcoal-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{{ article.excerpt }}</p>
          
          <div class="flex items-center justify-between text-xs text-charcoal-400 mb-4 border-t border-charcoal-850 pt-3">
            <span class="flex items-center gap-1">
              <Icon name="mdi:account-outline" class="w-3.5 h-3.5 text-gold-500" />
              Tác giả: {{ article.author }}
            </span>
            <span class="tag tag-gold text-[9px] uppercase tracking-wider">
              {{ categoryLabels[article.category] }}
            </span>
          </div>

          <!-- CTA Button -->
          <NuxtLink :to="'/news/' + article.slug" class="btn-outline-gold text-sm justify-center w-full py-2.5 mt-auto">
            <Icon name="mdi:book-open-page-variant" class="w-4 h-4" />
            Đọc Bài Viết
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NEWS_ARTICLES, EVENTS } from '~/data/posts'
import type { NewsCategory } from '~/types'

definePageMeta({ layout: 'default' })
useMuseumSeo({
  title: 'Bài Viết & Blog Di Sản',
  description: 'Các bài viết, nghiên cứu và hoạt động nổi bật về di sản văn hóa Thành Phố Đồng Nai.'
})

useHead({
  script: EVENTS.map(event => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate ?? event.startDate,
      eventAttendanceMode: event.isOnline ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: event.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Thành Phố Đồng Nai',
          addressCountry: 'VN'
        }
      }
    })
  }))
})

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const activeCategory = ref('all')
const newsCategories: NewsCategory[] = ['su-kien', 'tin-tuc', 'nghien-cuu', 'hoat-dong']

const categoryLabels: Record<NewsCategory, string> = {
  'su-kien': 'Sự Kiện', 'tin-tuc': 'Bài Viết', 'nghien-cuu': 'Nghiên Cứu', 'hoat-dong': 'Hoạt Động',
}
const categoryIcons: Record<string, string> = {
  'all': 'mdi:apps',
  'su-kien': 'mdi:calendar-star',
  'tin-tuc': 'mdi:newspaper-variant-outline',
  'nghien-cuu': 'mdi:flask-outline',
  'hoat-dong': 'mdi:run-fast',
}
const filteredNews = computed(() =>
  activeCategory.value === 'all' ? NEWS_ARTICLES : NEWS_ARTICLES.filter((n) => n.category === activeCategory.value),
)

function formatDate(str: string) {
  return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(str))
}
</script>
