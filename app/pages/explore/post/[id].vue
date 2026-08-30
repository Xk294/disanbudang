<template>
  <div v-if="post" class="bg-charcoal-900 min-h-screen text-ivory pb-20">
    <!-- Header/Hero -->
    <div class="relative h-[55vh] min-h-[400px] flex items-end border-b border-charcoal-850 overflow-hidden">
      <img
        :src="post.coverImage"
        :alt="post.title"
        class="absolute inset-0 w-full h-full object-cover ken-burns-hero"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 to-transparent" />

      <div class="relative z-10 container-heritage pb-12">
        <div class="max-w-3xl">
          <BaseBadge variant="gold" class="mb-4">{{ typeLabels[post.type] }}</BaseBadge>
          <h1 class="font-heading font-bold text-ivory text-3xl md:text-4xl lg:text-5xl leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 text-shadow-hero text-balance tracking-normal">
            {{ post.title }}
          </h1>

          <div class="flex flex-wrap gap-4 items-center text-xs text-charcoal-350 bg-charcoal-950/50 backdrop-blur-sm border border-charcoal-800/60 rounded-full px-4 py-2 w-fit">
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:calendar-range" class="w-4 h-4 text-gold-450" />
              {{ formatDate(post.publishedAt) }}
            </span>
            <span class="w-1 h-1 bg-charcoal-700 rounded-full" />
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:clock-outline" class="w-4 h-4 text-gold-450" />
              {{ readingTime }} phút đọc
            </span>
            <span class="w-1 h-1 bg-charcoal-700 rounded-full" />
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:heart" class="w-4 h-4 text-brick-500" />
              {{ likesCount }} lượt thích
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-heritage py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Author Profile Sidebar -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-charcoal-950/50 border border-charcoal-850 rounded-3xl p-6 lg:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl lg:sticky lg:top-[100px]">
            <div class="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-xl pointer-events-none" />

            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-full bg-gold-500/10 border-2 border-gold-550/30 flex items-center justify-center shrink-0">
                <span class="text-gold-400 font-heading font-bold text-xl">
                  {{ post.author.name.charAt(0) }}
                </span>
              </div>
              <div>
                <span class="text-charcoal-450 text-[10px] uppercase tracking-wider block">Người chia sẻ</span>
                <p class="font-heading font-bold text-ivory text-lg leading-snug">{{ post.author.name }}</p>
                <p class="text-charcoal-400 text-xs mt-1">{{ post.author.role }}</p>
              </div>
            </div>

            <div v-if="post.author.school" class="border-t border-charcoal-800/80 pt-4 space-y-2 text-sm text-charcoal-350">
              <div class="flex items-start gap-2.5">
                <Icon name="mdi:school-outline" class="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Trường: <strong>{{ post.author.school }}</strong></span>
              </div>
              <div v-if="post.author.grade" class="flex items-start gap-2.5">
                <Icon name="mdi:google-classroom" class="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Lớp: <strong>{{ post.author.grade }}</strong></span>
              </div>
            </div>

            <!-- Tags -->
            <div class="border-t border-charcoal-800/80 pt-5 mt-5">
              <span class="text-charcoal-450 text-[10px] uppercase tracking-wider block mb-3">Từ khóa bài viết</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="bg-charcoal-900 border border-charcoal-800 text-charcoal-300 rounded-lg px-2.5 py-1 text-2xs hover:border-gold-500/30 transition-colors cursor-pointer"
                  @click="searchTag(tag)"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Quick link back to Community -->
          <NuxtLink
            to="/explore?tab=community"
            class="flex items-center justify-center gap-2 w-full py-3.5 border border-charcoal-800 rounded-2xl text-xs font-semibold uppercase tracking-wider text-charcoal-400 hover:text-ivory hover:border-gold-500/50 transition-all duration-300"
          >
            <Icon name="mdi:arrow-left" class="w-4 h-4" />
            Về Ký Ức Cộng Đồng
          </NuxtLink>
        </div>

        <!-- Essay / Story Text Column -->
        <div class="lg:col-span-8">
          <div class="bg-charcoal-950/20 border border-charcoal-850/60 rounded-3xl p-8 lg:p-12 shadow-xl">
            <!-- Story Header Label -->
            <div class="flex items-center gap-2 mb-8 text-gold-400">
              <Icon name="mdi:book-open-page-variant-outline" class="w-5 h-5" />
              <h2 class="text-xs uppercase tracking-widest font-semibold">Nội dung câu chuyện</h2>
            </div>

            <!-- Story Body -->
            <div class="prose-heritage whitespace-pre-line text-charcoal-250 leading-relaxed text-base md:text-lg">
              {{ post.content || post.excerpt }}
            </div>

            <!-- Actions row -->
            <div class="mt-12 pt-8 border-t border-charcoal-850/80 flex items-center justify-between flex-wrap gap-3">
              <button
                class="flex items-center gap-2 bg-charcoal-900 border border-charcoal-800 hover:border-brick-500/50 hover:bg-brick-950/10 text-charcoal-300 hover:text-ivory rounded-full px-5 py-2.5 text-xs transition-all duration-300"
                @click="likePost"
              >
                <Icon name="mdi:heart" :class="isLiked ? 'text-brick-500' : 'text-charcoal-500'" class="w-4 h-4 transition-colors" />
                <span>{{ isLiked ? 'Đã thích' : 'Thích bài viết' }} ({{ likesCount }})</span>
              </button>

              <button
                class="flex items-center gap-2 bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/50 text-charcoal-300 hover:text-ivory rounded-full px-5 py-2.5 text-xs transition-all duration-300"
                @click="sharePost"
              >
                <Icon name="mdi:share-variant" class="w-4 h-4 text-gold-400" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>

          <!-- Related Heritage -->
          <div v-if="relatedHeritages.length > 0" class="mt-12">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-1 h-5 bg-gold-500 rounded-full inline-block" />
              <h2 class="font-heading font-bold text-ivory text-xl">Di Sản Liên Quan</h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NuxtLink
                v-for="h in relatedHeritages"
                :key="h.id"
                :to="`/heritage/${h.slug}`"
                class="group flex gap-4 bg-charcoal-950/40 border border-charcoal-850 rounded-2xl p-4 hover:border-gold-500/30 transition-all duration-500"
              >
                <div class="w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-charcoal-800">
                  <NuxtImg :src="h.coverImage" :alt="h.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-charcoal-450 text-2xs uppercase tracking-wider font-semibold">{{ getCategoryLabel(h.category) }}</p>
                  <h3 class="font-heading font-bold text-ivory text-sm leading-snug mt-0.5 group-hover:text-gold-300 transition-colors line-clamp-2">{{ h.title }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Prev / Next Navigation -->
          <div v-if="prevPost || nextPost" class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NuxtLink
              v-if="prevPost"
              :to="`/explore/post/${prevPost.id}`"
              class="group flex items-center gap-3 bg-charcoal-950/30 border border-charcoal-850 rounded-2xl p-5 hover:border-gold-500/30 transition-all duration-500 text-left"
            >
              <Icon name="mdi:arrow-left" class="w-5 h-5 text-gold-400 shrink-0" />
              <div class="min-w-0">
                <p class="text-charcoal-500 text-2xs uppercase tracking-wider">Bài trước</p>
                <p class="text-ivory text-sm font-semibold truncate group-hover:text-gold-300 transition-colors">{{ prevPost.title }}</p>
              </div>
            </NuxtLink>
            <NuxtLink
              v-if="nextPost"
              :to="`/explore/post/${nextPost.id}`"
              class="group flex items-center gap-3 bg-charcoal-950/30 border border-charcoal-850 rounded-2xl p-5 hover:border-gold-500/30 transition-all duration-500 text-right sm:col-start-2"
            >
              <div class="min-w-0 flex-1">
                <p class="text-charcoal-500 text-2xs uppercase tracking-wider">Bài tiếp theo</p>
                <p class="text-ivory text-sm font-semibold truncate group-hover:text-gold-300 transition-colors">{{ nextPost.title }}</p>
              </div>
              <Icon name="mdi:arrow-right" class="w-5 h-5 text-gold-400 shrink-0" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { COMMUNITY_POSTS } from '~/data/posts'
import { HERITAGES } from '~/data/heritages'
import type { PostType, Heritage } from '~/types'

definePageMeta({ layout: 'default' })

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id as string)
const { getCategoryLabel } = useHeritage()

const post = computed(() => COMMUNITY_POSTS.find(p => p.id === id.value) || null)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Bài viết ký ức không tồn tại trong hệ thống',
    fatal: true,
  })
}

useBreadcrumb(() => post.value?.title || '')

const isLiked = ref(false)
const likesCount = ref(0)

watchEffect(() => {
  if (post.value) {
    likesCount.value = post.value.likes ?? 0
    if (import.meta.client) {
      const saved = localStorage.getItem(`community-like-${post.value.id}`)
      isLiked.value = saved === 'true'
    }
  }
})

const readingTime = computed(() => {
  if (!post.value) return 0
  const text = post.value.content || post.value.excerpt
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 100))
})

const relatedHeritages = computed(() => {
  if (!post.value) return []
  return HERITAGES
    .filter((h: Heritage) => post.value!.tags.some(t => h.tags.includes(t)))
    .slice(0, 3)
})

const sortedPosts = computed(() => {
  return [...COMMUNITY_POSTS].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
})

const prevPost = computed(() => {
  if (!post.value) return null
  const idx = sortedPosts.value.findIndex(p => p.id === post.value!.id)
  return idx < sortedPosts.value.length - 1 ? sortedPosts.value[idx + 1] : null
})

const nextPost = computed(() => {
  if (!post.value) return null
  const idx = sortedPosts.value.findIndex(p => p.id === post.value!.id)
  return idx > 0 ? sortedPosts.value[idx - 1] : null
})

const typeLabels: Record<PostType, string> = {
  story: 'Câu Chuyện', artwork: 'Tranh Vẽ', photo: 'Ảnh Tư Liệu', memory: 'Ký Ức', research: 'Khảo Cứu',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function likePost() {
  if (!post.value) return
  if (!isLiked.value) {
    likesCount.value++
    isLiked.value = true
  } else {
    likesCount.value--
    isLiked.value = false
  }
  localStorage.setItem(`community-like-${post.value.id}`, String(isLiked.value))
}

async function sharePost() {
  if (!post.value) return
  const url = `${window.location.origin}/explore/post/${post.value.id}`
  if (navigator.share) {
    await navigator.share({
      title: post.value.title,
      text: post.value.excerpt,
      url,
    })
  } else {
    await navigator.clipboard.writeText(url)
    const swal = useSwal()
    swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Đã sao chép đường dẫn vào bộ nhớ tạm!',
      confirmButtonColor: '#C7A664'
    })
  }
}

function searchTag(tag: string) {
  router.push({ path: '/explore', query: { tab: 'community', tag } })
}

useCommunityPostSeo(post)
</script>

<style scoped>
.prose-heritage {
  font-size: 1.1rem;
  line-height: 1.85;
}

.ken-burns-hero {
  animation: ken-burns-hero 20s ease-out infinite alternate;
}
@keyframes ken-burns-hero {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}
</style>
