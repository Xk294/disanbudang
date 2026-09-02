<template>
  <div>
    <div v-if="article" class="bg-charcoal-900 min-h-screen">
      <!-- Article Header -->
      <div class="bg-dark-earth py-16 md:py-20 relative overflow-hidden border-b border-charcoal-800">
        <div class="absolute inset-0 pointer-events-none opacity-40">
          <NuxtImg :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover blur-md scale-105" />
          <div class="absolute inset-0 bg-charcoal-950/80"></div>
        </div>

        <div class="container-heritage relative z-10">
          <div class="max-w-3xl">
            <BaseBadge :variant="(getCategoryVariant(article.category) as any)" class="mb-4">
              {{ getCategoryLabel(article.category) }}
            </BaseBadge>
            <h1 class="font-heading font-bold text-ivory text-3xl md:text-4xl lg:text-5xl leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 text-balance tracking-normal">
              {{ article.title }}
            </h1>
            <p v-if="article.subtitle" class="font-accent italic text-gold-300 text-lg md:text-xl mb-6">
              {{ article.subtitle }}
            </p>

            <div class="flex items-center gap-4 text-xs text-charcoal-350">
              <span class="flex items-center gap-1">
                <Icon name="mdi:account-outline" class="w-4 h-4 text-gold-450" />
                {{ article.author || 'Di Sản Bù Đăng' }}
              </span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <Icon name="mdi:calendar-outline" class="w-4 h-4 text-gold-450" />
                {{ formatDate(article.publishedAt) }}
              </span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <Icon name="mdi:clock-outline" class="w-4 h-4 text-gold-450" />
                {{ article.readTime }} phút đọc
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Article Content -->
      <div class="container-heritage py-12 md:py-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div class="lg:col-span-8 bg-charcoal-950 border border-charcoal-850 rounded-3xl p-6 md:p-10 shadow-xl">
            <!-- Featured Image -->
            <div class="rounded-2xl overflow-hidden aspect-[21/9] mb-8 border border-charcoal-800">
              <NuxtImg
                :src="article.coverImage"
                :alt="article.title"
                class="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
                format="webp"
                sizes="xs:100vw lg:800px"
              />
            </div>

            <!-- Body -->
            <div class="prose-heritage max-w-none space-y-6">
              <p v-for="(paragraph, index) in articleParagraphs" :key="index" class="whitespace-pre-line text-base leading-relaxed text-charcoal-200">
                {{ paragraph }}
              </p>
            </div>

            <!-- Back button -->
            <div class="mt-12 pt-8 border-t border-charcoal-800 flex justify-between items-center">
              <NuxtLink to="/news" class="btn-ghost text-xs py-2.5">
                <Icon name="mdi:arrow-left" class="w-4 h-4" />
                Quay lại tin tức
              </NuxtLink>

              <div class="flex items-center gap-2">
                <span class="text-xs text-charcoal-400 uppercase tracking-widest font-semibold mr-2">Chia sẻ:</span>
                <button
                  @click="shareFacebook"
                  class="w-8 h-8 rounded-lg bg-charcoal-800 border border-charcoal-700 hover:bg-gold-500 hover:text-charcoal-900 hover:border-transparent transition-all duration-200 flex items-center justify-center text-charcoal-300"
                  title="Facebook"
                >
                  <Icon name="mdi:facebook" class="w-4 h-4" />
                </button>
                <button
                  @click="copyShareLink"
                  class="w-8 h-8 rounded-lg bg-charcoal-800 border border-charcoal-700 hover:bg-gold-500 hover:text-charcoal-900 hover:border-transparent transition-all duration-200 flex items-center justify-center text-charcoal-300 relative"
                  :title="copied ? 'Đã sao chép!' : 'Sao chép liên kết'"
                >
                  <Icon :name="copied ? 'mdi:check' : 'mdi:link-variant'" class="w-4 h-4" :class="{ 'text-green-400': copied }" />
                  <span v-if="copied" class="absolute -top-8 left-1/2 -translate-x-1/2 bg-charcoal-900 text-ivory text-3xs px-2 py-1 rounded shadow-md whitespace-nowrap animate-bounce">
                    Đã chép!
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar (Recent news) -->
          <div class="lg:col-span-4 space-y-6 lg:sticky lg:top-[100px]">
            <div class="bg-charcoal-950 border border-charcoal-850 rounded-3xl p-6 shadow-xl">
              <h3 class="font-heading font-bold text-ivory text-lg mb-5 flex items-center gap-2">
                <Icon name="mdi:bullhorn-outline" class="w-5 h-5 text-gold-500" />
                Tin Tức Khác
              </h3>
              <div class="space-y-5">
                <NuxtLink
                  v-for="item in otherNews"
                  :key="item.id"
                  :to="'/news/' + item.slug"
                  class="group block pb-4 border-b border-charcoal-800 last:border-0 last:pb-0"
                >
                  <p class="text-gold-500/70 text-3xs uppercase tracking-wider font-bold mb-1">
                    {{ getCategoryLabel(item.category) }}
                  </p>
                  <h4 class="font-heading font-semibold text-ivory text-sm leading-snug group-hover:text-gold-300 transition-colors line-clamp-2">
                    {{ item.title }}
                  </h4>
                  <p class="text-charcoal-400 text-3xs mt-1.5">{{ formatDate(item.publishedAt) }}</p>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsCategory } from '~/types'
import { NEWS_ARTICLES } from '~/data/posts'

definePageMeta({ layout: 'default' })

useHead({
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const article = computed(() => NEWS_ARTICLES.find((n) => n.slug === slug.value) ?? null)

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Bài viết không tồn tại trong hệ thống',
    fatal: true,
  })
}

useBreadcrumb(() => article.value?.title || '')

const articleParagraphs = computed(() => {
  if (!article.value?.content) return []
  return article.value.content.split('\n\n').filter(Boolean)
})

const otherNews = computed(() => {
  if (!article.value) return NEWS_ARTICLES.slice(0, 3)
  return NEWS_ARTICLES.filter((n) => n.id !== article.value!.id).slice(0, 4)
})

const categoryLabels: Record<NewsCategory, string> = {
  'su-kien': 'Sự Kiện',
  'tin-tuc': 'Bài Viết',
  'nghien-cuu': 'Nghiên Cứu',
  'hoat-dong': 'Hoạt Động',
}

const categoryVariant: Record<NewsCategory, string> = {
  'su-kien': 'brick',
  'tin-tuc': 'gold',
  'nghien-cuu': 'forest',
  'hoat-dong': 'earth',
}

function getCategoryLabel(category: NewsCategory): string {
  return categoryLabels[category] || category
}

function getCategoryVariant(category: NewsCategory): string {
  return categoryVariant[category] || 'gold'
}

useStorySeo(article)

const copied = ref(false)

function shareFacebook() {
  if (import.meta.client) {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer')
  }
}

function copyShareLink() {
  if (import.meta.client) {
    navigator.clipboard.writeText(window.location.href).then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
  }
}

function formatDate(str: string) {
  return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(str))
}
</script>

