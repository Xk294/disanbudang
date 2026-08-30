<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory">
    <!-- Hero Header -->
    <div class="bg-dark-earth py-12 md:py-16 relative overflow-hidden border-b border-charcoal-850">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div class="absolute bottom-0 left-10 w-80 h-80 bg-forest-500/10 rounded-full blur-3xl" />
        <div class="noise-overlay" />
      </div>
      <div class="container-heritage relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-3xs uppercase font-bold tracking-widest mb-4">
            <Icon name="mdi:feather" class="w-3.5 h-3.5" />
            Biên Khảo & Ký Họa Văn Hóa
          </div>
          <h1 class="font-heading font-bold text-ivory text-4xl md:text-5xl lg:text-6xl leading-[1.35] mb-5 text-balance tracking-normal">
            Chuyện Di Sản &<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-earth-400">Hồn Thiêng Đại Ngàn</span>
          </h1>
          <p class="text-charcoal-300 text-sm md:text-base leading-relaxed max-w-2xl font-body">
            Những bài viết chuyên sâu về đời sống văn hóa, phong tục độc đáo, tri thức ẩm thực và tư liệu quý giá của đồng bào S'tiêng, M'nông tại vùng đất Bù Đăng — Thành Phố Đồng Nai.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-heritage py-12 md:py-16">
      <!-- Category Filters -->
      <div class="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-4 mb-10 border-b border-charcoal-800/80">
        <button
          v-for="cat in filterCategories"
          :key="cat.id"
          type="button"
          class="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border"
          :class="activeFilter === cat.id
            ? 'bg-gold-500 text-charcoal-950 border-transparent shadow-gold'
            : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/40 hover:text-ivory bg-charcoal-950/60'"
          @click="activeFilter = cat.id"
        >
          <Icon :name="cat.icon" class="w-4 h-4" />
          <span>{{ cat.label }}</span>
        </button>
      </div>

      <!-- Featured Story Spotlight (if 'all' selected and has featured) -->
      <div v-if="featuredStory && activeFilter === 'all'" class="mb-12">
        <NuxtLink
          :to="'/stories/' + featuredStory.slug"
          class="group block relative overflow-hidden rounded-3xl border border-charcoal-800 hover:border-gold-500/40 transition-all duration-500 bg-charcoal-950 shadow-2xl"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            <div class="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-[420px] overflow-hidden">
              <NuxtImg
                :src="featuredStory.coverImage"
                :alt="featuredStory.title"
                class="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                loading="eager"
                fetchpriority="high"
                format="webp"
                sizes="xs:100vw lg:60vw"
              />
              <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal-950 via-charcoal-950/40 to-transparent" />
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 rounded-full bg-gold-500 text-charcoal-950 font-bold text-3xs uppercase tracking-wider shadow">
                  Bài Viết Tiêu Điểm
                </span>
              </div>
            </div>

            <div class="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-center">
              <div class="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Icon name="mdi:clock-outline" class="w-4 h-4" />
                <span>{{ featuredStory.readTime }} phút đọc</span>
                <span>•</span>
                <span>{{ formatDate(featuredStory.publishedAt) }}</span>
              </div>
              <h2 class="font-heading font-bold text-ivory text-2xl lg:text-3xl leading-snug group-hover:text-gold-300 transition-colors mb-3">
                {{ featuredStory.title }}
              </h2>
              <p class="text-charcoal-300 text-sm leading-relaxed line-clamp-3 mb-6">
                {{ featuredStory.excerpt }}
              </p>
              <div class="flex items-center justify-between border-t border-charcoal-800 pt-4">
                <span class="text-xs text-charcoal-400 flex items-center gap-1.5">
                  <Icon name="mdi:account-outline" class="w-4 h-4 text-gold-500" />
                  {{ featuredStory.author }}
                </span>
                <span class="inline-flex items-center gap-1 text-gold-400 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  Đọc Chuyện
                  <Icon name="mdi:arrow-right" class="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Stories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="article in filteredStories"
          :key="article.id"
          class="bg-charcoal-950 border border-charcoal-850 rounded-2xl p-5 shadow-lg hover:border-gold-500/30 hover:shadow-gold-500/5 transition-all duration-300 flex flex-col group"
        >
          <!-- Cover -->
          <NuxtLink :to="'/stories/' + article.slug" class="block relative overflow-hidden rounded-xl aspect-[16/10] mb-4 border border-charcoal-800/80">
            <NuxtImg
              :src="article.coverImage"
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              format="webp"
              sizes="xs:100vw sm:50vw lg:33vw"
            />
            <div class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-charcoal-950/80 backdrop-blur text-[10px] font-mono text-gold-300">
              {{ article.readTime }} phút
            </div>
          </NuxtLink>

          <!-- Meta -->
          <div class="flex items-center justify-between text-3xs text-charcoal-400 mb-2">
            <span class="text-gold-400 font-semibold uppercase tracking-wider">{{ categoryLabels[article.category] || 'Di Sản' }}</span>
            <span>{{ formatDate(article.publishedAt) }}</span>
          </div>

          <h3 class="font-heading font-bold text-ivory text-base leading-snug mb-2 line-clamp-2 group-hover:text-gold-300 transition-colors">
            <NuxtLink :to="'/stories/' + article.slug">
              {{ article.title }}
            </NuxtLink>
          </h3>

          <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-3 mb-4 flex-1">
            {{ article.excerpt }}
          </p>

          <!-- Author & Link -->
          <div class="flex items-center justify-between text-xs text-charcoal-400 border-t border-charcoal-850 pt-3 mt-auto">
            <span class="truncate max-w-[150px] text-3xs text-charcoal-400">
              {{ article.author }}
            </span>
            <NuxtLink :to="'/stories/' + article.slug" class="text-gold-400 hover:text-gold-300 font-semibold text-xs inline-flex items-center gap-1">
              Đọc tiếp
              <Icon name="mdi:chevron-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- Cross-navigation footer banner -->
      <div class="mt-16 pt-10 border-t border-charcoal-850 text-center">
        <p class="text-charcoal-400 text-sm mb-4">Bạn muốn tìm hiểu không gian địa lý hay học các bài học tương tác?</p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink to="/explore" class="btn-ghost text-xs py-3 px-6">
            <Icon name="mdi:compass-outline" class="w-4 h-4" />
            Thư Viện 16 Di Sản
          </NuxtLink>
          <NuxtLink to="/map" class="btn-primary text-xs py-3 px-6">
            <Icon name="mdi:map-outline" class="w-4 h-4" />
            Bản Đồ Không Gian
          </NuxtLink>
          <NuxtLink to="/journal" class="btn-ghost text-xs py-3 px-6">
            <Icon name="mdi:notebook-outline" class="w-4 h-4" />
            Nhật Ký Điền Dã
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NEWS_ARTICLES } from '~/data/posts'
import type { NewsCategory } from '~/types'

definePageMeta({ layout: 'default' })

useMuseumSeo({
  title: 'Chuyện Di Sản & Biên Khảo',
  description: 'Các bài viết nghiên cứu chuyên sâu về văn hóa, phong tục, nghệ thuật và ẩm thực truyền thống của vùng đất Bù Đăng, Thành Phố Đồng Nai.',
  path: '/stories',
})

const activeFilter = ref('all')

const filterCategories = [
  { id: 'all', label: 'Tất Cả Chuyện', icon: 'mdi:apps' },
  { id: 'tin-tuc', label: 'Ẩm Thực & Đời Sống', icon: 'mdi:silverware-fork-knife' },
  { id: 'nghien-cuu', label: 'Nghiên Cứu & Tri Thức', icon: 'mdi:book-open-page-variant' },
]

const categoryLabels: Record<NewsCategory, string> = {
  'tin-tuc': 'Ẩm Thực & Ký Ức',
  'nghien-cuu': 'Nghiên Cứu Chuyên Sâu',
  'su-kien': 'Sự Kiện',
  'hoat-dong': 'Hoạt Động',
}

const featuredStory = computed(() => {
  return NEWS_ARTICLES.find(a => a.featured) || NEWS_ARTICLES[0] || null
})

const filteredStories = computed(() => {
  if (activeFilter.value === 'all') {
    return NEWS_ARTICLES
  }
  return NEWS_ARTICLES.filter(a => a.category === activeFilter.value)
})

function formatDate(str: string) {
  return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(str))
}
</script>
