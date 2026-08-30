<template>
  <nav
    v-if="crumbs.length > 0"
    class="container-heritage py-3 mt-1 flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal-300 overflow-x-auto scrollbar-none"
    aria-label="Thanh điều hướng phân cấp (Breadcrumb)"
  >
    <NuxtLink
      to="/"
      class="hover:text-gold-400 transition-colors flex items-center gap-1.5 shrink-0"
    >
      <Icon name="mdi:home-outline" class="w-4 h-4" />
      <span>Trang Chủ</span>
    </NuxtLink>

    <template v-for="(crumb, index) in crumbs" :key="crumb.path + index">
      <Icon name="mdi:chevron-right" class="w-3.5 h-3.5 text-charcoal-500 shrink-0" />
      
      <span
        v-if="index === crumbs.length - 1"
        class="text-gold-400 font-semibold truncate max-w-[220px] sm:max-w-md shrink-0"
        :title="crumb.label"
      >
        {{ crumb.label }}
      </span>
      
      <NuxtLink
        v-else-if="crumb.isLink"
        :to="crumb.path"
        class="hover:text-gold-300 transition-colors truncate shrink-0"
      >
        {{ crumb.label }}
      </NuxtLink>
      
      <span v-else class="text-charcoal-400 truncate shrink-0">
        {{ crumb.label }}
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { HERITAGES } from '~/data/heritages'
import { NEWS_ARTICLES, COMMUNITY_POSTS, EVENTS } from '~/data/posts'

const route = useRoute()

// Static segment display labels
const lookupTable: Record<string, string> = {
  about: 'Giới Thiệu',
  map: 'Bản Đồ',
  study: 'Học Tập',
  stories: 'Chuyện Di Sản',
  news: 'Chuyện Di Sản',
  journal: 'Nhật Ký Điền Dã',
  contribute: 'Đóng Góp',
  contact: 'Liên Hệ',
  heritage: 'Thư Viện',
  explore: 'Thư Viện',
  'virtual-tour': 'Tour Ảo 360°',
  lesson: 'Bài Học',
  post: 'Ký Ức Cộng Đồng',
  qr: 'Trải Nghiệm QR',
}

// Retrieve the dynamic leaf label set by pages using useBreadcrumb
const leafLabel = computed(() => {
  const state = useState<string>(`breadcrumb-label-${route.path}`)
  return state.value || ''
})

function findDynamicLabel(segment: string): string | null {
  // Heritage slug
  const heritage = HERITAGES.find((h) => h.slug === segment || h.id === segment)
  if (heritage) return heritage.title

  // News / Stories article slug
  const article = NEWS_ARTICLES.find((n) => n.slug === segment || n.id === segment)
  if (article) return article.title

  // Event / Journal slug
  const event = EVENTS.find((e) => e.id === segment)
  if (event) return event.title

  // Community Post ID
  const post = COMMUNITY_POSTS.find((p) => p.id === segment)
  if (post) return post.title

  return null
}

const crumbs = computed(() => {
  const path = route.path.replace(/\/$/, '')
  if (!path || path === '/') return []

  const segments = path.split('/').filter(Boolean)
  const list: Array<{ label: string; path: string; isLink: boolean }> = []

  // Custom route hierarchy builder
  if (segments[0] === 'heritage') {
    // Intermediate: Thư Viện -> /explore/
    list.push({ label: 'Thư Viện', path: '/explore/', isLink: true })

    if (segments[1] === 'qr' && segments[2]) {
      const hSlug = segments[2]
      const hTitle = findDynamicLabel(hSlug) || leafLabel.value || 'Di Sản'
      list.push({ label: hTitle, path: `/heritage/${hSlug}/`, isLink: true })
      list.push({ label: 'Trải Nghiệm QR', path: route.path, isLink: false })
    } else if (segments[1]) {
      const hSlug = segments[1]
      const label = leafLabel.value || findDynamicLabel(hSlug) || 'Chi Tiết Di Sản'
      list.push({ label, path: `/heritage/${hSlug}/`, isLink: false })
    }
    return list
  }

  if (segments[0] === 'study') {
    list.push({ label: 'Học Tập', path: '/study/', isLink: segments.length > 1 })
    if (segments[1] === 'lesson' && segments[2]) {
      const lessonId = segments[2]
      const label = leafLabel.value || findDynamicLabel(lessonId) || 'Bài Học'
      list.push({ label, path: `/study/lesson/${lessonId}/`, isLink: false })
    }
    return list
  }

  if (segments[0] === 'explore') {
    list.push({ label: 'Thư Viện', path: '/explore/', isLink: segments.length > 1 })
    if (segments[1] === 'virtual-tour') {
      list.push({ label: 'Tour Ảo 360°', path: '/explore/virtual-tour/', isLink: false })
    } else if (segments[1] === 'post' && segments[2]) {
      list.push({ label: 'Ký Ức Cộng Đồng', path: '/explore?tab=community', isLink: true })
      const postId = segments[2]
      const label = leafLabel.value || findDynamicLabel(postId) || 'Ký Ức'
      list.push({ label, path: `/explore/post/${postId}/`, isLink: false })
    } else if (segments[1]) {
      const postId = segments[1]
      const label = leafLabel.value || findDynamicLabel(postId) || 'Ký Ức'
      list.push({ label, path: `/explore/${postId}/`, isLink: false })
    }
    return list
  }

  if (segments[0] === 'stories' || segments[0] === 'news') {
    list.push({ label: 'Chuyện Di Sản', path: '/stories/', isLink: segments.length > 1 })
    if (segments[1]) {
      const slug = segments[1]
      const label = leafLabel.value || findDynamicLabel(slug) || 'Bài Viết'
      list.push({ label, path: `/stories/${slug}/`, isLink: false })
    }
    return list
  }

  if (segments[0] === 'journal') {
    list.push({ label: 'Nhật Ký Điền Dã', path: '/journal/', isLink: segments.length > 1 })
    if (segments[1]) {
      const slug = segments[1]
      const label = leafLabel.value || findDynamicLabel(slug) || 'Hoạt Động'
      list.push({ label, path: `/journal/${slug}/`, isLink: false })
    }
    return list
  }

  // Standard single-level routes (about, map, contribute, contact)
  let currentPath = ''
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]!
    currentPath += `/${segment}`
    const isLast = i === segments.length - 1
    const label = isLast && leafLabel.value
      ? leafLabel.value
      : (lookupTable[segment] || findDynamicLabel(segment) || segment)

    list.push({
      label,
      path: `${currentPath}/`,
      isLink: !isLast,
    })
  }

  return list
})
</script>
