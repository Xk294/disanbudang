<template>
  <div v-if="lesson" class="min-h-screen bg-charcoal-900 text-ivory">
    <!-- Header hero -->
    <div class="bg-dark-earth border-b border-charcoal-850 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div v-if="lesson.coreKnowledge.images?.[0]" class="absolute inset-0">
          <NuxtImg :src="lesson.coreKnowledge.images[0].url" alt="" class="w-full h-full object-cover opacity-10" />
          <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 to-charcoal-950/60" />
        </div>
      </div>
      <div class="container-heritage relative z-10 py-10">
        <div class="flex flex-col lg:flex-row lg:items-end gap-6">
          <div class="flex-1 space-y-3">
            <div class="flex flex-wrap gap-2">
              <span class="tag-gold text-3xs">{{ lesson.subject }}</span>
              <span class="tag-earth text-3xs flex items-center gap-1">
                <Icon name="mdi:clock-outline" class="w-3 h-3" />
                ~{{ lesson.estimatedMinutes ?? 10 }} phút
              </span>
              <span class="tag text-3xs bg-charcoal-800/60 text-charcoal-400 border border-charcoal-700 flex items-center gap-1">
                <Icon name="mdi:star-outline" class="w-3 h-3 text-gold-400" />
                +{{ lesson.xpReward }} XP
              </span>
            </div>
            <h1 class="font-heading font-bold text-2xl md:text-3xl text-ivory leading-snug">
              {{ lesson.title }}
            </h1>
          </div>

          <!-- Progress tracker & XP -->
          <div class="lg:shrink-0 flex items-center gap-4">
            <div class="flex items-center gap-2 bg-charcoal-900/70 border border-charcoal-800 rounded-xl px-4 py-2.5">
              <div class="space-y-1">
                <p class="text-3xs text-charcoal-500 uppercase tracking-wider">Tiến trình đọc</p>
                <div class="w-32 h-1.5 bg-charcoal-800 rounded-full overflow-hidden">
                  <div class="h-full bg-gold-500 rounded-full transition-all duration-500" :style="{ width: readProgress + '%' }" />
                </div>
              </div>
              <span class="text-sm font-bold text-gold-400 tabular-nums">{{ readProgress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main 2-col layout -->
    <div class="container-heritage py-10">
      <div class="flex flex-col lg:flex-row gap-10">
        <!-- LEFT: TOC sticky sidebar -->
        <aside class="lg:w-56 shrink-0">
          <div class="lg:sticky lg:top-24 space-y-2">
            <p class="text-3xs font-bold uppercase tracking-widest text-charcoal-400 mb-3">Nội dung bài học</p>
            <nav class="space-y-1" aria-label="Mục lục bài học">
              <a
                v-for="section in toc"
                :key="section.id"
                :href="'#' + section.id"
                class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 group"
                :class="section.available
                  ? 'text-charcoal-400 hover:text-ivory hover:bg-charcoal-900'
                  : 'text-charcoal-400 cursor-default'"
              >
                <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="section.available ? 'bg-gold-500/50' : 'bg-charcoal-800'" />
                {{ section.label }}
                <Icon v-if="!section.available" name="mdi:lock-outline" class="w-3 h-3 ml-auto text-charcoal-400" />
              </a>
            </nav>

            <!-- Back button -->
            <div class="pt-4 border-t border-charcoal-850">
              <NuxtLink to="/study" class="flex items-center gap-2 text-xs text-charcoal-500 hover:text-gold-400 transition-colors">
                <Icon name="mdi:arrow-left" class="w-4 h-4" />
                Về Góc Học Tập
              </NuxtLink>
            </div>
          </div>
        </aside>

        <!-- RIGHT: Lesson content -->
        <section class="flex-1 min-w-0" ref="mainRef">
          <LessonBlock :lesson="lesson" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LessonData } from '~/components/study/LessonBlock.vue'
import { LESSONS_DATA } from '~/data/lessons'

const route = useRoute()
const id = computed(() => route.params.id as string)

const lessons: Record<string, LessonData> = LESSONS_DATA

const lesson = computed(() => lessons[id.value] ?? null)

if (!lesson.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Bài học không tồn tại trong hệ thống',
    fatal: true,
  })
}

useBreadcrumb(() => lesson.value?.title || '')

useLessonSeo(lesson)

// Reading progress tracker
const mainRef = ref<HTMLElement | null>(null)
const readProgress = ref(0)

function updateReadProgress() {
  if (!mainRef.value || !import.meta.client) return
  const el = mainRef.value
  const rect = el.getBoundingClientRect()
  const scrolled = Math.max(0, -rect.top)
  const total = el.offsetHeight - window.innerHeight
  readProgress.value = total > 0 ? Math.min(100, Math.round((scrolled / total) * 100)) : 100
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', updateReadProgress, { passive: true })
    updateReadProgress()
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) window.removeEventListener('scroll', updateReadProgress)
})

// TOC — sections that exist in the lesson
const toc = computed(() => {
  if (!lesson.value) return []
  const l = lesson.value
  return [
    { id: 'core-heading', label: 'Kiến thức trọng tâm', available: true },
    { id: 'hotspot', label: 'Ảnh chú thích', available: !!l.hotspotImage },
    { id: 'timeline', label: 'Dòng thời gian', available: !!(l.timeline?.length) },
    { id: 'did-you-know', label: 'Bạn có biết?', available: !!(l.didYouKnow?.length) },
    { id: 'glossary', label: 'Thuật ngữ', available: !!(l.glossary?.length) },
    { id: 'flashcards', label: 'Flashcards', available: !!(l.flashcards?.length) },
    { id: 'quiz', label: 'Trắc nghiệm', available: !!(l.quiz?.length) },
    { id: 'essay', label: 'Tự luận', available: !!l.essay },
    { id: 'next-steps', label: 'Bước tiếp theo', available: true },
  ]
})
</script>
