<template>
  <article class="space-y-8 max-w-3xl mx-auto">

    <!-- ① TL;DR — ALWAYS SHOWN FIRST -->
    <div class="lesson-tldr">
      <div class="flex items-center gap-2 mb-2">
        <Icon name="mdi:lightning-bolt" class="w-4 h-4 text-gold-400" />
        <span class="text-3xs font-bold uppercase tracking-widest text-gold-400">Tóm tắt nhanh</span>
      </div>
      <p class="text-sm text-charcoal-200 leading-relaxed">{{ lesson.tldr }}</p>
    </div>

    <!-- ①.5 OBJECTIVES — YÊU CẦU CẦN ĐẠT -->
    <section v-if="lesson.objectives?.length" id="objectives" aria-labelledby="objectives-heading">
      <div class="bg-charcoal-950 border border-gold-500/30 rounded-2xl p-5 shadow-lg">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-center justify-center">
            <Icon name="mdi:bullseye-arrow" class="w-4 h-4 text-gold-400" />
          </div>
          <h2 id="objectives-heading" class="text-xs font-bold uppercase tracking-widest text-gold-400">
            Mục tiêu bài học (Yêu cầu cần đạt)
          </h2>
        </div>
        <ul class="space-y-2">
          <li v-for="(obj, i) in lesson.objectives" :key="i" class="flex items-start gap-2.5 text-xs md:text-sm text-charcoal-200">
            <Icon name="mdi:check-circle" class="w-4 h-4 text-forest-400 shrink-0 mt-0.5" />
            <span>{{ obj }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ② CORE KNOWLEDGE — ALWAYS SHOWN -->
    <section aria-labelledby="core-heading">
      <h2 id="core-heading" class="text-base font-heading font-bold text-ivory mb-4 flex items-center gap-2">
        <span class="w-1 h-5 bg-gold-500 rounded-full inline-block" />
        Kiến thức trọng tâm
      </h2>
      <div
        class="prose prose-sm prose-invert max-w-none leading-relaxed
               prose-p:text-charcoal-200 prose-blockquote:text-charcoal-200
               prose-headings:text-ivory prose-headings:font-heading
               prose-strong:text-gold-300 prose-strong:font-semibold prose-em:text-gold-300
               prose-blockquote:border-gold-500 prose-blockquote:bg-charcoal-900/50
               prose-blockquote:py-3 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
               prose-a:text-gold-400 prose-ul:text-charcoal-300 prose-ol:text-charcoal-300"
        v-html="lesson.coreKnowledge.text"
      />
      <!-- Core images if any -->
      <div v-if="lesson.coreKnowledge.images?.length" class="mt-4 grid grid-cols-1 gap-4" :class="lesson.coreKnowledge.images.length > 1 ? 'sm:grid-cols-2' : ''">
        <figure v-for="(img, i) in lesson.coreKnowledge.images" :key="i" class="space-y-1.5">
          <NuxtImg :src="img.url" :alt="img.caption" class="w-full rounded-xl object-cover max-h-60" loading="lazy" />
          <figcaption class="text-3xs text-charcoal-500 italic text-center">{{ img.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- ③ VIDEO or SLIDESHOW FALLBACK -->
    <section v-if="lesson.video || (lesson.coreKnowledge.images && lesson.coreKnowledge.images.length > 1)" aria-label="Phương tiện học tập">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-bold text-ivory flex items-center gap-2">
          <Icon :name="lesson.video ? 'mdi:video' : 'mdi:image-multiple'" class="w-4 h-4 text-gold-400" />
          {{ lesson.video ? 'Video học tập' : 'Slideshow thuyết minh' }}
        </h3>
        <span v-if="!lesson.video" class="text-3xs text-charcoal-500 italic flex items-center gap-1">
          <Icon name="mdi:robot" class="w-3 h-3" />
          Thuyết minh AI tự động
        </span>
      </div>
      <!-- Real video -->
      <div v-if="lesson.video" class="aspect-video rounded-2xl overflow-hidden bg-charcoal-900 border border-charcoal-800">
        <iframe :src="lesson.video" class="w-full h-full" allowfullscreen title="Video bài học" loading="lazy" />
      </div>
      <!-- Slideshow fallback -->
      <SlideshowWithTTS v-else-if="lesson.coreKnowledge.images?.length" :images="lesson.coreKnowledge.images" height="280px" />
    </section>

    <!-- ④ HOTSPOT IMAGE -->
    <section v-if="lesson.hotspotImage" aria-label="Ảnh chú thích tương tác">
      <h3 class="text-sm font-bold text-ivory mb-3 flex items-center gap-2">
        <Icon name="mdi:cursor-pointer" class="w-4 h-4 text-gold-400" />
        Khám phá hình ảnh
      </h3>
      <HotspotImage
        :image-url="lesson.hotspotImage.url"
        :image-alt="lesson.hotspotImage.alt || lesson.title"
        :hotspots="lesson.hotspotImage.hotspots"
      />
    </section>

    <!-- ⑤ INTERACTIVE TIMELINE -->
    <section v-if="lesson.timeline?.length" aria-label="Dòng thời gian">
      <h3 class="text-sm font-bold text-ivory mb-4 flex items-center gap-2">
        <Icon name="mdi:timeline-clock" class="w-4 h-4 text-gold-400" />
        Dòng thời gian lịch sử
      </h3>
      <InteractiveTimeline :items="lesson.timeline" />
    </section>

    <!-- ⑥ DID YOU KNOW -->
    <section v-if="lesson.didYouKnow?.length" aria-label="Bạn có biết">
      <div class="did-you-know p-5 space-y-3">
        <span class="text-3xs font-bold uppercase tracking-widest text-forest-400 flex items-center gap-2">
          <Icon name="mdi:lightbulb-on" class="w-4 h-4" />
          Bạn có biết?
        </span>
        <ul class="space-y-2">
          <li v-for="(fact, i) in lesson.didYouKnow" :key="i" class="flex items-start gap-2.5 text-sm text-charcoal-200">
            <span class="w-5 h-5 rounded-full bg-forest-500/10 text-forest-400 flex items-center justify-center shrink-0 mt-0.5 text-3xs font-bold">{{ i + 1 }}</span>
            {{ fact }}
          </li>
        </ul>
      </div>
    </section>

    <!-- ⑦ GLOSSARY TERMS -->
    <section v-if="lesson.glossary?.length" aria-label="Thuật ngữ">
      <h3 class="text-sm font-bold text-ivory mb-3 flex items-center gap-2">
        <Icon name="mdi:translate" class="w-4 h-4 text-gold-400" />
        Thuật ngữ quan trọng
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="(term, i) in lesson.glossary"
          :key="i"
          class="bg-charcoal-900/60 border border-charcoal-800 rounded-xl p-3.5 hover:border-gold-500/30 transition-colors"
        >
          <span class="block font-heading font-bold text-gold-400 text-sm">{{ term.term }}</span>
          <p class="text-charcoal-350 text-xs leading-relaxed mt-1">{{ term.definition }}</p>
        </div>
      </div>
    </section>

    <!-- ⑧ FLASHCARDS -->
    <section v-if="lesson.flashcards?.length" aria-label="Flashcards">
      <h3 class="text-sm font-bold text-ivory mb-3 flex items-center gap-2">
        <Icon name="mdi:cards-outline" class="w-4 h-4 text-gold-400" />
        Flashcards ôn tập <span class="text-charcoal-500 font-normal text-3xs">({{ lesson.flashcards.length }} thẻ)</span>
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="(card, i) in lesson.flashcards"
          :key="i"
          class="flashcard-container perspective h-36 cursor-pointer"
          @click="flippedCards[i] = !flippedCards[i]"
        >
          <div class="w-full h-full relative transition-transform duration-500 transform-style-3d rounded-xl shadow-md"
            :class="{ 'rotate-y-180': flippedCards[i] }">
            <div class="absolute inset-0 backface-hidden bg-charcoal-950 border border-charcoal-800 rounded-xl p-4 flex flex-col justify-between">
              <span class="text-3xs text-charcoal-400 uppercase font-bold">Câu hỏi</span>
              <p class="text-sm text-ivory font-semibold text-center">{{ card.front }}</p>
              <span class="text-3xs text-gold-400 text-right flex items-center justify-end gap-1">
                Lật thẻ <Icon name="mdi:rotate-3d-variant" class="w-3.5 h-3.5" />
              </span>
            </div>
            <div class="absolute inset-0 backface-hidden bg-earth-900 border border-earth-800 rounded-xl p-4 flex flex-col justify-between rotate-y-180">
              <span class="text-3xs text-gold-300 uppercase font-bold">Đáp án</span>
              <p class="text-xs text-charcoal-200 leading-relaxed text-center">{{ card.back }}</p>
              <span class="text-3xs text-charcoal-400 text-right flex items-center justify-end gap-1">
                Lật lại <Icon name="mdi:rotate-3d-variant" class="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑨ OPEN QUESTIONS -->
    <section v-if="lesson.openQuestions?.length" aria-label="Câu hỏi gợi mở">
      <h3 class="text-sm font-bold text-ivory mb-3 flex items-center gap-2">
        <Icon name="mdi:comment-question-outline" class="w-4 h-4 text-gold-400" />
        Câu hỏi gợi mở
      </h3>
      <div class="space-y-2">
        <div
          v-for="(q, i) in lesson.openQuestions"
          :key="i"
          class="flex items-start gap-3 p-3.5 bg-charcoal-900/40 border border-charcoal-850 rounded-xl"
        >
          <span class="w-6 h-6 rounded-full bg-gold-500/10 text-gold-400 text-3xs font-bold flex items-center justify-center shrink-0 mt-0.5">{{ i + 1 }}</span>
          <p class="text-sm text-charcoal-200 leading-relaxed italic">{{ q }}</p>
        </div>
      </div>
    </section>

    <!-- ⑩ QUIZ -->
    <section v-if="lesson.quiz?.length" aria-label="Trắc nghiệm">
      <div class="bg-charcoal-950 border border-charcoal-800 rounded-2xl overflow-hidden">
        <div class="px-5 py-4 border-b border-charcoal-800 flex items-center justify-between">
          <h3 class="text-sm font-bold text-ivory flex items-center gap-2">
            <Icon name="mdi:help-circle-outline" class="w-4 h-4 text-gold-400" />
            Câu hỏi trắc nghiệm
          </h3>
          <span class="text-3xs text-charcoal-500">
            {{ quizAnswered }}/{{ lesson.quiz.length }} đã trả lời
            <span v-if="quizAnswered > 0" class="text-gold-400 font-bold ml-1">+{{ quizAnswered * 10 }} XP</span>
          </span>
        </div>

        <div class="p-5 space-y-6">
          <div v-for="(q, qi) in lesson.quiz" :key="qi" class="space-y-3">
            <p class="text-sm font-semibold text-ivory">{{ qi + 1 }}. {{ q.question }}</p>
            <div class="grid grid-cols-1 gap-2.5">
              <button
                v-for="(opt, oi) in q.options"
                :key="oi"
                class="text-left px-4.5 py-3.5 rounded-xl text-xs transition-all duration-300 border flex items-center justify-between gap-3 font-medium select-none shadow-sm cursor-pointer disabled:cursor-default"
                :class="getOptionClass(qi, oi)"
                :disabled="quizSelections[qi] !== undefined"
                @click="selectAnswer(qi, oi)"
              >
                <span class="flex items-center">
                  <span class="font-bold mr-3 text-gold-400 bg-charcoal-950/40 px-2 py-0.5 rounded border border-charcoal-850">{{ String.fromCharCode(65 + oi) }}</span>
                  <span>{{ opt }}</span>
                </span>
                
                <!-- Feedback Icons -->
                <Icon
                  v-if="quizSelections[qi] !== undefined && oi === q.correct"
                  name="mdi:check-circle"
                  class="w-5 h-5 text-forest-400 shrink-0"
                />
                <Icon
                  v-else-if="quizSelections[qi] !== undefined && oi === quizSelections[qi]"
                  name="mdi:close-circle"
                  class="w-5 h-5 text-brick-400 shrink-0"
                />
              </button>
            </div>
            <!-- Explanation after answering -->
            <Transition name="explain-fade">
              <div
                v-if="quizSelections[qi] !== undefined && q.explanation"
                class="text-xs text-charcoal-350 leading-relaxed bg-charcoal-900/60 border border-charcoal-850 rounded-xl p-3.5 flex gap-2.5 shadow-inner"
              >
                <Icon name="mdi:information-outline" class="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <span>{{ q.explanation }}</span>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑪ ESSAY -->
    <section v-if="lesson.essay" aria-label="Câu hỏi tự luận">
      <h3 class="text-sm font-bold text-ivory mb-3 flex items-center gap-2">
        <Icon name="mdi:pencil-box-outline" class="w-4 h-4 text-gold-400" />
        Câu hỏi tự luận
      </h3>
      <div class="bg-charcoal-900/40 border border-charcoal-800 rounded-2xl p-5 space-y-3">
        <p class="text-sm text-charcoal-200 leading-relaxed italic">{{ lesson.essay.prompt }}</p>
        <p v-if="lesson.essay.hint" class="text-3xs text-charcoal-500 flex items-center gap-1">
          <Icon name="mdi:lightbulb-outline" class="w-3.5 h-3.5" /> Gợi ý: {{ lesson.essay.hint }}
        </p>
        <textarea
          v-model="essayText"
          rows="4"
          placeholder="Viết câu trả lời của bạn tại đây..."
          class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl px-4 py-3 text-sm text-ivory placeholder-charcoal-400 focus:outline-none focus:border-gold-500/60 resize-none leading-relaxed"
        />
        <div class="flex justify-between items-center">
          <span class="text-3xs text-charcoal-400">{{ essayText.length }} ký tự</span>
          <button
            v-if="essayText.length > 20"
            class="text-3xs px-4 py-1.5 bg-gold-500 text-charcoal-950 font-bold rounded-full hover:bg-gold-400 transition-colors"
            @click="saveEssay"
          >
            Lưu bài tự luận
          </button>
        </div>
      </div>
    </section>

    <!-- ⑫ CHALLENGE -->
    <section v-if="lesson.challenge" aria-label="Thử thách nhỏ">
      <div class="bg-gradient-to-br from-earth-900/60 to-charcoal-950 border border-earth-800/40 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-ivory mb-1 flex items-center gap-2">
          <Icon name="mdi:sword-cross" class="w-4 h-4 text-gold-400" />
          Thử thách nhỏ
        </h3>
        <p class="text-xs text-charcoal-400 mb-4">Hoàn thành thử thách để nhận thêm XP và mở khoá nội dung tiếp theo.</p>
        <div class="bg-charcoal-900 border border-charcoal-800 rounded-xl p-4 text-center space-y-3">
          <Icon name="mdi:gamepad-variant-outline" class="w-8 h-8 text-gold-400 mx-auto" />
          <p class="text-sm text-charcoal-300">{{ lesson.challenge }}</p>
          <button class="btn-primary text-xs py-2 px-6" @click="startChallenge">
            Bắt đầu thử thách
          </button>
        </div>
      </div>
    </section>

    <!-- ⑬ RELATED ENTITIES -->
    <section v-if="hasRelated" aria-label="Nội dung liên quan">
      <h3 class="text-sm font-bold text-ivory mb-3 flex items-center gap-2">
        <Icon name="mdi:link-variant" class="w-4 h-4 text-gold-400" />
        Khám phá thêm
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div v-for="person in lesson.relatedPeople" :key="person.name"
          class="bg-charcoal-900/40 border border-charcoal-800 rounded-xl p-3.5 hover:border-gold-500/25 transition-colors">
          <Icon name="mdi:account-outline" class="w-4 h-4 text-gold-400 mb-1" />
          <p class="text-xs font-bold text-ivory">{{ person.name }}</p>
          <p class="text-3xs text-charcoal-500">{{ person.role }}</p>
          <p class="text-xs text-charcoal-400 mt-1 line-clamp-2">{{ person.desc }}</p>
        </div>
        <div v-for="place in lesson.relatedPlaces" :key="place.name"
          class="bg-charcoal-900/40 border border-charcoal-800 rounded-xl p-3.5 hover:border-gold-500/25 transition-colors cursor-pointer"
          @click="place.poiId && navigateTo('/map?poi=' + place.poiId)">
          <Icon name="mdi:map-marker-outline" class="w-4 h-4 text-gold-400 mb-1" />
          <p class="text-xs font-bold text-ivory">{{ place.name }}</p>
          <p class="text-xs text-charcoal-400 mt-1 line-clamp-2">{{ place.desc }}</p>
        </div>
        <div v-for="event in lesson.relatedEvents" :key="event.name"
          class="bg-charcoal-900/40 border border-charcoal-800 rounded-xl p-3.5 hover:border-gold-500/25 transition-colors">
          <Icon name="mdi:calendar-star" class="w-4 h-4 text-gold-400 mb-1" />
          <p class="text-xs font-bold text-ivory">{{ event.name }}</p>
          <p class="text-3xs text-gold-600">{{ event.year }}</p>
          <p class="text-xs text-charcoal-400 mt-1 line-clamp-2">{{ event.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ⑬.5 RELATED HERITAGE DIRECT LINK -->
    <section v-if="lesson.relatedHeritage" aria-label="Di sản liên quan trong bảo tàng">
      <div class="bg-charcoal-950 border border-charcoal-800 hover:border-gold-500/40 transition-all rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
            <Icon name="mdi:bank-outline" class="w-6 h-6 text-gold-400" />
          </div>
          <div>
            <span class="text-3xs font-bold uppercase tracking-wider text-gold-400">Hồ Sơ Di Sản Liên Quan</span>
            <h4 class="font-heading font-bold text-ivory text-base">{{ lesson.relatedHeritage.name }}</h4>
            <p v-if="lesson.relatedHeritage.desc" class="text-charcoal-400 text-xs mt-0.5 line-clamp-1">{{ lesson.relatedHeritage.desc }}</p>
          </div>
        </div>
        <NuxtLink :to="'/heritage/' + lesson.relatedHeritage.slug" class="btn-primary text-xs py-2.5 px-5 shrink-0">
          <span>Xem Hồ Sơ Di Sản</span>
          <Icon name="mdi:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </section>

    <!-- ⑭ REFERENCES -->
    <section v-if="lesson.references?.length" aria-label="Tài liệu tham khảo">
      <details class="group">
        <summary class="text-xs font-semibold text-charcoal-500 hover:text-charcoal-300 cursor-pointer flex items-center gap-2 select-none">
          <Icon name="mdi:bookshelf" class="w-4 h-4" />
          Nguồn tham khảo ({{ lesson.references.length }})
          <Icon name="mdi:chevron-down" class="w-4 h-4 group-open:rotate-180 transition-transform" />
        </summary>
        <ul class="mt-3 space-y-1.5 pl-4 border-l border-charcoal-800">
          <li v-for="(ref, i) in lesson.references" :key="i" class="text-3xs text-charcoal-500">
            <a v-if="ref.url" :href="ref.url" target="_blank" rel="noopener noreferrer" class="hover:text-gold-400">
              {{ ref.title }} — <em>{{ ref.source }}</em>
            </a>
            <span v-else>{{ ref.title }} — <em>{{ ref.source }}</em></span>
          </li>
        </ul>
      </details>
    </section>

    <!-- ⑮ NEXT STEPS — ALWAYS LAST, ALWAYS PRESENT -->
    <section aria-label="Bước tiếp theo" class="!mt-12">
      <div class="border-t border-charcoal-800 pt-8">
        <h3 class="text-sm font-bold text-ivory mb-4 flex items-center gap-2">
          <Icon name="mdi:arrow-right-circle" class="w-4 h-4 text-gold-400" />
          Tiếp tục hành trình học tập
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <NuxtLink
            v-for="(step, i) in lesson.nextSteps"
            :key="i"
            :to="getNextStepLink(step)"
            class="next-steps-card block bg-charcoal-950/60 p-4"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                :class="nextStepIconBg(step.type)">
                <Icon :name="nextStepIcon(step.type)" class="w-5 h-5" :class="nextStepIconColor(step.type)" />
              </div>
              <div>
                <p class="text-xs font-bold text-ivory leading-snug">{{ step.title }}</p>
                <p class="text-3xs text-charcoal-500 capitalize">{{ nextStepLabel(step.type) }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

  </article>
</template>

<script setup lang="ts">
const swal = useSwal()

export interface LessonData {
  id: string
  title: string
  subject: string
  xpReward: number
  estimatedMinutes: number
  tldr: string
  objectives?: string[]
  relatedHeritage?: { slug: string; name: string; desc?: string }
  coreKnowledge: {
    text: string
    images?: { url: string; caption: string }[]
  }
  video?: string
  hotspotImage?: { url: string; alt?: string; hotspots: { x: number; y: number; label: string; desc: string }[] }
  timeline?: { date: string; event: string; detail?: string; image?: string }[]
  didYouKnow?: string[]
  glossary?: { term: string; definition: string }[]
  flashcards?: { front: string; back: string }[]
  openQuestions?: string[]
  quiz?: { question: string; options: string[]; correct: number; explanation: string }[]
  essay?: { prompt: string; hint?: string }
  challenge?: string
  relatedPeople?: { name: string; role: string; desc: string }[]
  relatedPlaces?: { name: string; desc: string; poiId?: string }[]
  relatedEvents?: { name: string; year: string; desc: string }[]
  references?: { title: string; source: string; url?: string }[]
  nextSteps: { title: string; lessonId?: string; type: 'lesson' | 'map' | 'quiz' | 'resource' }[]
}

const props = defineProps<{ lesson: LessonData }>()

// Flashcard flip state
const flippedCards = ref<Record<number, boolean>>({})

// Quiz state
const quizSelections = ref<Record<number, number>>({})
const quizAnswered = computed(() => Object.keys(quizSelections.value).length)

function getOptionClass(qi: number, oi: number): string {
  const answered = quizSelections.value[qi] !== undefined
  if (!answered) return 'bg-charcoal-900 border-charcoal-800 text-charcoal-300 hover:border-gold-500/40 hover:text-ivory'
  const quizItem = props.lesson.quiz?.[qi]
  const correct = quizItem?.correct ?? -1
  if (oi === correct) return 'bg-forest-500/10 border-forest-500/40 text-forest-300'
  if (oi === quizSelections.value[qi]) return 'bg-brick-500/10 border-brick-500/40 text-brick-300'
  return 'bg-charcoal-900/40 border-charcoal-850 text-charcoal-400 opacity-60'
}

function selectAnswer(qi: number, oi: number) {
  if (quizSelections.value[qi] !== undefined) return
  quizSelections.value = { ...quizSelections.value, [qi]: oi }
  const quizItem = props.lesson.quiz?.[qi]
  const isCorrect = quizItem ? oi === quizItem.correct : false
  swal.fire({
    toast: true,
    position: 'top-end',
    icon: isCorrect ? 'success' : 'error',
    title: isCorrect ? '✓ Đúng rồi! +10 XP' : '✗ Chưa đúng — xem giải thích bên dưới',
    showConfirmButton: false,
    timer: 2000,
    background: '#221D17',
    color: '#F5F1EA',
  })

  if (isCorrect && props.lesson.quiz) {
    const totalQuiz = props.lesson.quiz.length
    const answeredCorrectly = props.lesson.quiz.every((q, idx) => quizSelections.value[idx] === q.correct)
    if (answeredCorrectly) {
      setTimeout(() => {
        triggerConfetti()
        swal.fire({
          title: 'Xuất Sắc! 🎉',
          text: `Bạn đã trả lời đúng tất cả ${totalQuiz}/${totalQuiz} câu hỏi trắc nghiệm ôn tập. +${totalQuiz * 10} XP`,
          icon: 'success',
          confirmButtonColor: '#C7A664',
          background: '#221D17',
          color: '#F5F1EA',
        })
      }, 500)
    }
  }
}

function triggerConfetti() {
  if (!import.meta.client) return
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.inset = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const colors = ['#C7A664', '#D1B27D', '#F59E0B', '#12B981', '#C7A664', '#12B981']
  const particles: any[] = []

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * 15,
      vy: -Math.random() * 15 - 10,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    })
  }

  function animate() {
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let active = false

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.25
      p.vx *= 0.98
      p.rotation += p.rotationSpeed
      
      if (p.y < canvas.height && p.opacity > 0) {
        active = true
        p.opacity -= 0.008
      }

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
      ctx.restore()
    })

    if (active) {
      requestAnimationFrame(animate)
    } else {
      canvas.remove()
    }
  }

  animate()
}

// Essay state
const essayText = ref('')

function saveEssay() {
  if (import.meta.client) {
    localStorage.setItem(`essay_${props.lesson.id}`, essayText.value)
  }
  swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Đã lưu bài tự luận',
    showConfirmButton: false,
    timer: 1800,
    background: '#221D17',
    color: '#F5F1EA',
  })
}

// Load saved essay
onMounted(() => {
  if (import.meta.client) {
    const saved = localStorage.getItem(`essay_${props.lesson.id}`)
    if (saved) essayText.value = saved
  }
})

function startChallenge() {
  swal.fire({
    title: 'Thử thách đang được xây dựng',
    text: 'Tính năng thử thách tương tác sẽ sớm có mặt trong phiên bản tiếp theo!',
    icon: 'info',
    confirmButtonColor: '#C7A664',
  })
}

// Related entities check
const hasRelated = computed(() =>
  (props.lesson.relatedPeople?.length ?? 0) +
  (props.lesson.relatedPlaces?.length ?? 0) +
  (props.lesson.relatedEvents?.length ?? 0) > 0
)

// Next steps helpers
function getNextStepLink(step: LessonData['nextSteps'][number]): string {
  if (step.type === 'lesson' && step.lessonId) return `/study/lesson/${step.lessonId}`
  if (step.type === 'map') return '/map'
  if (step.type === 'quiz') return '/study?tab=quiz'
  if (step.type === 'resource') return '/study?tab=research'
  return '/study'
}

function nextStepIcon(type: string): string {
  const map: Record<string, string> = {
    lesson: 'mdi:book-open-variant',
    map: 'mdi:map-outline',
    quiz: 'mdi:help-circle-outline',
    resource: 'mdi:file-document-outline',
  }
  return map[type] ?? 'mdi:arrow-right'
}

function nextStepIconBg(type: string): string {
  const map: Record<string, string> = {
    lesson: 'bg-gold-500/10',
    map: 'bg-earth-500/10',
    quiz: 'bg-forest-500/10',
    resource: 'bg-charcoal-800',
  }
  return map[type] ?? 'bg-charcoal-800'
}

function nextStepIconColor(type: string): string {
  const map: Record<string, string> = {
    lesson: 'text-gold-400',
    map: 'text-earth-400',
    quiz: 'text-forest-400',
    resource: 'text-charcoal-400',
  }
  return map[type] ?? 'text-charcoal-400'
}

function nextStepLabel(type: string): string {
  const map: Record<string, string> = {
    lesson: 'Bài học tiếp theo',
    map: 'Khám phá bản đồ',
    quiz: 'Làm bài kiểm tra',
    resource: 'Đọc tài liệu',
  }
  return map[type] ?? ''
}
</script>

<style scoped>
/* Flashcard 3D */
.perspective { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }

/* Quiz explanation fade */
.explain-fade-enter-active { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.explain-fade-enter-from { opacity: 0; transform: translateY(-6px); }
</style>
