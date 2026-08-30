<template>
  <nav
    v-if="crumbs.length > 1"
    class="container-heritage py-3 mt-1 flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal-300"
    aria-label="Breadcrumb"
  >
    <NuxtLink
      to="/"
      class="hover:text-gold-400 transition-colors flex items-center gap-1.5"
    >
      <Icon name="mdi:home-outline" class="w-4 h-4" />
      <span>Trang Chủ</span>
    </NuxtLink>

    <template v-for="(crumb, index) in crumbs" :key="crumb.path">
      <Icon name="mdi:chevron-right" class="w-4 h-4 text-charcoal-400 shrink-0" />
      
      <span v-if="index === crumbs.length - 1" class="text-gold-400 font-semibold truncate max-w-[200px] sm:max-w-xs">
        {{ crumb.label }}
      </span>
      
      <NuxtLink
        v-else-if="crumb.isLink"
        :to="crumb.path"
        class="hover:text-gold-400 transition-colors truncate"
      >
        {{ crumb.label }}
      </NuxtLink>
      
      <span v-else class="truncate">
        {{ crumb.label }}
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { HERITAGES } from '~/data/heritages'
import { NEWS_ARTICLES } from '~/data/posts'

const route = useRoute()

// Lookup table for static segments
const lookupTable: Record<string, string> = {
  about: 'Giới Thiệu',
  map: 'Bản Đồ',
  study: 'Học Tập',
  news: 'Bài Viết',
  contribute: 'Đóng Góp',
  invest: 'Đầu Tư',
  contact: 'Liên Hệ',
  heritage: 'Chi Tiết Di Sản',
  explore: 'Khám Phá',
  'virtual-tour': 'Tour Ảo 360°',
  lesson: 'Bài Học',
}

// Routes that actually exist and can be linked
const activeRoutes = new Set([
  '/',
  '/about/',
  '/map/',
  '/study/',
  '/news/',
  '/contribute/',
  '/invest/',
  '/contact/',
  '/explore/',
])

// Retrieve the dynamic leaf label set by pages using useBreadcrumb
const leafLabel = computed(() => {
  const state = useState<string>(`breadcrumb-label-${route.path}`)
  return state.value || ''
})

function getSegmentTitle(segment: string, isLast: boolean): string {
  if (isLast && leafLabel.value) {
    return leafLabel.value
  }
  if (lookupTable[segment]) {
    return lookupTable[segment]!
  }
  // Try to find matching heritage
  const heritage = HERITAGES.find((h) => h.slug === segment)
  if (heritage) return heritage.title

  // Try to find matching news article
  const news = NEWS_ARTICLES.find((n) => n.slug === segment)
  if (news) return news.title

  const formatted = segment.replace(/-/g, ' ')
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

const crumbs = computed(() => {
  // Split path and filter empty parts
  const segments = route.path.split('/').filter(Boolean)
  const list = []
  
  let currentPath = ''
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]!
    currentPath += `/${segment}`
    
    // Ensure trailing slash is added consistently
    const formattedPath = `${currentPath}/`
    const isLast = i === segments.length - 1
    const label = getSegmentTitle(segment, isLast)
    const isLink = activeRoutes.has(formattedPath)
    
    list.push({
      label,
      path: formattedPath,
      isLink,
    })
  }
  return list
})
</script>
