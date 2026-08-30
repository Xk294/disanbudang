<template>
  <section class="section bg-warm-paper text-charcoal-800 relative overflow-hidden">
    <div class="container-heritage">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <span class="section-label text-gold-700">Chuyện Di Sản & Sự Kiện</span>
          <h2 class="text-display-sm text-charcoal-900">Chuyện Di Sản Mới Nhất</h2>
        </div>
        <NuxtLink to="/stories" class="btn-outline-gold !border-gold-700 !text-gold-700 hover:!bg-gold-700 hover:!text-ivory flex-shrink-0">
          Xem Tất Cả Chuyện
          <Icon name="mdi:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Featured news -->
        <div v-if="news[0]" class="lg:col-span-7 reveal">
          <NuxtLink :to="'/stories/' + news[0].slug" class="group block">
            <div class="relative overflow-hidden rounded-3xl aspect-[16/9]">
              <NuxtImg
                :src="news[0].coverImage"
                :alt="news[0].title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-cinematic" />
              <div class="absolute top-5 left-5">
                <BaseBadge variant="gold">{{ categoryLabels[news[0].category] }}</BaseBadge>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-7">
                <p class="text-charcoal-300 text-xs mb-2">{{ formatDate(news[0].publishedAt) }} • {{ news[0].readTime }} phút đọc</p>
                <h3 class="font-heading font-bold text-ivory text-2xl leading-snug mb-2 text-shadow-hero line-clamp-2 group-hover:text-gold-200 transition-colors">
                  {{ news[0].title }}
                </h3>
                <p class="text-ivory/70 text-sm line-clamp-2">{{ news[0].excerpt }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Side news + events -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <!-- News items -->
          <NuxtLink
            v-for="item in news.slice(1, 4)"
            :key="item.id"
            :to="'/stories/' + item.slug"
            class="group flex gap-4 p-4 rounded-2xl border border-charcoal-200/70 hover:border-gold-500/35 hover:bg-charcoal-50 transition-all duration-300 reveal"
          >
            <NuxtImg :src="item.coverImage" :alt="item.title" class="w-20 h-16 rounded-xl object-cover flex-shrink-0 transition-transform duration-500 group-hover:scale-105" />
            <div class="flex-1 min-w-0">
              <BaseBadge :variant="categoryVariant[item.category]" size="sm" class="mb-1.5">
                {{ categoryLabels[item.category] }}
              </BaseBadge>
              <h4 class="font-heading font-semibold text-charcoal-900 text-sm leading-snug line-clamp-2 group-hover:text-gold-700 transition-colors">{{ item.title }}</h4>
              <p class="text-charcoal-500 text-xs mt-1">{{ formatDate(item.publishedAt) }}</p>
            </div>
          </NuxtLink>

          <!-- Upcoming event -->
          <NuxtLink
            v-if="nextEvent"
            :to="'/journal/' + nextEvent.id"
            class="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/25 hover:border-gold-500/45 transition-all duration-300 reveal block group"
          >
            <div class="flex items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-1.5">
                <Icon name="mdi:calendar-star" class="w-4 h-4 text-gold-700" />
                <span class="eyebrow text-gold-700 text-2xs">Sự kiện sắp tới</span>
              </div>
              <span class="text-gold-700 text-2xs font-semibold group-hover:underline">Chi tiết ➔</span>
            </div>
            <h4 class="font-heading font-bold text-charcoal-900 text-sm mb-1 leading-snug group-hover:text-gold-800 transition-colors">{{ nextEvent.title }}</h4>
            <p class="text-charcoal-600 text-xs">{{ nextEvent.location }}</p>
            <p class="text-gold-700 text-xs font-medium mt-1">{{ formatDate(nextEvent.startDate) }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NEWS_ARTICLES, EVENTS } from '~/data/posts'
import type { NewsCategory } from '~/types'

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const news = NEWS_ARTICLES.slice(0, 4)
const nextEvent = EVENTS[0]

const categoryLabels: Record<NewsCategory, string> = {
  'su-kien': 'Sự Kiện',
  'tin-tuc': 'Bài Viết',
  'nghien-cuu': 'Nghiên Cứu',
  'hoat-dong': 'Hoạt Động',
}

const categoryVariant: Record<NewsCategory, any> = {
  'su-kien': 'brick',
  'tin-tuc': 'gold',
  'nghien-cuu': 'forest',
  'hoat-dong': 'earth',
}

function formatDate(str: string) {
  return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(str))
}
</script>
