<template>
  <Transition name="fade">
    <div
      v-if="quizStore.isQuizActive || quizStore.isQuizCompleted"
      class="fixed inset-0 z-80 flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-charcoal-950/80 backdrop-blur-md"
        @click="closeQuiz"
      />

      <!-- Modal Content -->
      <div
        class="relative w-full max-w-2xl bg-charcoal-900 border border-charcoal-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        <!-- Confetti Canvas -->
        <canvas ref="confettiCanvas" class="absolute inset-0 pointer-events-none z-50 w-full h-full" aria-hidden="true"></canvas>

        <!-- Background accents -->
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-earth-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-charcoal-800/80 relative z-10 bg-charcoal-900/60 backdrop-blur-sm">
          <div class="flex items-center gap-2">
            <Icon
              :name="quizStore.isQuizCompleted ? 'mdi:trophy' : 'mdi:help-circle-outline'"
              class="w-5 h-5"
              :class="quizStore.isQuizCompleted ? 'text-gold-400' : 'text-gold-500'"
              aria-hidden="true"
            />
            <h2 id="quiz-modal-title" class="font-heading font-semibold text-ivory text-base md:text-lg">
              {{ quizStore.currentQuiz?.title ?? 'Thử Thách Di Sản' }}
            </h2>
          </div>
          <button
            class="w-8 h-8 rounded-full flex items-center justify-center text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 transition-colors"
            @click="closeQuiz"
            aria-label="Đóng"
          >
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <!-- 1. ACTIVE PLAY SCREEN -->
        <div
          v-if="quizStore.isQuizActive && quizStore.currentQuestion"
          class="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 relative z-10"
        >
          <!-- Progress -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs text-charcoal-400 font-semibold uppercase tracking-wider">
              <span>Câu hỏi {{ quizStore.currentQuestionIndex + 1 }} / {{ quizStore.totalQuestions }}</span>
              <span>{{ quizStore.progressPercent }}% Hoàn thành</span>
            </div>
            <div class="h-2 w-full bg-charcoal-950 rounded-full overflow-hidden border border-charcoal-850">
              <div
                class="h-full bg-gradient-gold transition-all duration-500 rounded-full"
                :style="{ width: `${quizStore.progressPercent}%` }"
              />
            </div>
          </div>

          <!-- Question -->
          <h3 class="font-heading font-bold text-ivory text-lg md:text-xl leading-snug">
            {{ quizStore.currentQuestion.question }}
          </h3>

          <!-- Options -->
          <div class="space-y-3">
            <button
              v-for="(option, idx) in quizStore.currentQuestion.options"
              :key="idx"
              class="w-full text-left p-4 rounded-2xl border text-sm md:text-base transition-all duration-300 flex items-start gap-3.5 group"
              :class="getOptionClass(idx)"
              :disabled="hasAnswered"
              @click="selectOption(idx)"
            >
              <!-- Option Index Circle -->
              <span
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 mt-0.5"
                :class="getOptionBadgeClass(idx)"
              >
                {{ ['A', 'B', 'C', 'D'][idx] }}
              </span>
              <span class="flex-1 font-medium leading-relaxed">{{ option }}</span>
              <!-- Feedback Icon -->
              <Icon
                v-if="hasAnswered && (idx === quizStore.currentQuestion.correctIndex || idx === selectedAnswerIndex)"
                :name="idx === quizStore.currentQuestion.correctIndex ? 'mdi:check-circle' : 'mdi:close-circle'"
                class="w-5 h-5 shrink-0 mt-0.5"
                :class="idx === quizStore.currentQuestion.correctIndex ? 'text-forest-450' : 'text-brick-500'"
              />
            </button>
          </div>

          <!-- Explanation box -->
          <Transition name="fade">
            <div
              v-if="hasAnswered && quizStore.currentQuestion.explanation"
              class="p-5 rounded-2xl border border-gold-500/10 bg-gold-500/5 text-xs md:text-sm text-gold-200/90 leading-relaxed flex gap-3"
            >
              <Icon name="mdi:information-outline" class="w-5 h-5 text-gold-450 shrink-0 mt-0.5" />
              <div>
                <strong class="block mb-1 text-gold-400">Giải nghĩa di sản:</strong>
                {{ quizStore.currentQuestion.explanation }}
              </div>
            </div>
          </Transition>
        </div>

        <!-- 2. COMPLETED RESULT SCREEN -->
        <div
          v-else-if="quizStore.isQuizCompleted"
          class="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-center relative z-10"
        >
          <!-- Score Trophy Circle -->
          <div class="relative w-36 h-36 mx-auto flex items-center justify-center rounded-full bg-gold-500/10 border-2 border-gold-500/30 shadow-gold animate-float">
            <div class="absolute inset-0 bg-gold-400/5 rounded-full animate-ping" />
            <Icon name="mdi:trophy" class="w-16 h-16 text-gold-400" />
          </div>

          <div class="space-y-2">
            <h2 class="font-heading font-bold text-ivory text-2xl md:text-3xl">
              Thử Thách Hoàn Thành!
            </h2>
            <p class="text-charcoal-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
              Cảm ơn bạn đã tham gia thử thách tìm hiểu di sản địa phương.
            </p>
          </div>

          <!-- Statistics -->
          <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div class="bg-charcoal-950/60 border border-charcoal-850 p-4 rounded-2xl">
              <p class="text-charcoal-500 text-2xs uppercase tracking-wider font-semibold">Kết quả đúng</p>
              <p class="font-heading font-bold text-gold-400 text-2xl mt-1">
                {{ quizStore.currentScore }} / {{ quizStore.totalQuestions }}
              </p>
            </div>
            <div class="bg-charcoal-950/60 border border-charcoal-850 p-4 rounded-2xl">
              <p class="text-charcoal-500 text-2xs uppercase tracking-wider font-semibold">Thời gian</p>
              <p class="font-heading font-bold text-ivory text-2xl mt-1">
                {{ formatSeconds(lastResult?.timeSpent ?? 0) }}
              </p>
            </div>
          </div>

          <!-- Earned Badge Notification -->
          <div
            v-if="earnedBadge"
            class="max-w-md mx-auto p-6 rounded-3xl border-2 border-gold-500/40 bg-gradient-to-b from-gold-500/15 to-charcoal-950/90 shadow-gold space-y-4 transition-all duration-300 hover:border-gold-400 cursor-pointer relative overflow-hidden"
            ref="badgeCardRef"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
            style="transform-style: preserve-3d; transition: transform 0.1s ease, border-color 0.3s ease;"
          >
            <span class="text-gold-400 text-2xs uppercase tracking-widest font-bold block">Đạt Huy Hiệu Mới!</span>
            <div
              class="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center border-2 shadow-lg"
              :style="{
                background: `${earnedBadge.color}15`,
                borderColor: `${earnedBadge.color}50`,
                boxShadow: `0 0 20px ${earnedBadge.color}30`
              }"
            >
              <Icon :name="earnedBadge.icon" class="w-10 h-10 animate-pulse-gold" :style="{ color: earnedBadge.color }" />
            </div>
            <div>
              <h4 class="font-heading font-bold text-ivory text-lg leading-snug">{{ earnedBadge.name }}</h4>
              <p class="text-charcoal-400 text-xs mt-1">{{ earnedBadge.description }}</p>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 py-4 border-t border-charcoal-800/80 relative z-10 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-end gap-3">
          <!-- Play screen footer -->
          <template v-if="quizStore.isQuizActive">
            <button
              v-if="quizStore.currentQuestionIndex > 0"
              class="btn-ghost text-xs md:text-sm py-2.5"
              @click="quizStore.prevQuestion"
            >
              Quay lại
            </button>
            <button
              v-if="hasAnswered"
              class="btn-primary text-xs md:text-sm py-2.5 bg-gold-500 text-charcoal-900 border-transparent shadow-gold"
              @click="quizStore.nextQuestion"
            >
              <span>{{ isLastQuestion ? 'Xem kết quả' : 'Tiếp tục' }}</span>
              <Icon name="mdi:arrow-right" class="w-4 h-4" />
            </button>
            <div v-else class="text-xs text-charcoal-500 font-medium italic select-none">
              Chọn đáp án để tiếp tục
            </div>
          </template>

          <!-- Result screen footer -->
          <template v-else-if="quizStore.isQuizCompleted">
            <button
              class="btn-outline-gold text-xs md:text-sm py-2.5"
              @click="restartQuiz"
            >
              <Icon name="mdi:refresh" class="w-4 h-4" />
              Làm lại
            </button>
            <button
              class="btn-primary text-xs md:text-sm py-2.5 bg-gold-500 text-charcoal-900 border-transparent shadow-gold"
              @click="closeQuiz"
            >
              Hoàn thành
            </button>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const quizStore = useQuizStore()

const selectedAnswerIndex = computed(() => {
  if (!quizStore.currentQuestion) return null
  return quizStore.selectedAnswers[quizStore.currentQuestion.id] ?? null
})

const hasAnswered = computed(() => selectedAnswerIndex.value !== null)

const isLastQuestion = computed(() => {
  return quizStore.currentQuestionIndex === quizStore.totalQuestions - 1
})

const lastResult = computed(() => {
  if (!quizStore.currentQuiz) return null
  return quizStore.getLastResult(quizStore.currentQuiz.id) ?? null
})

const earnedBadge = computed(() => {
  if (!lastResult.value?.badgeEarned) return null
  return quizStore.badges.find((b) => b.id === lastResult.value?.badgeEarned) ?? null
})

function selectOption(idx: number) {
  if (!quizStore.currentQuestion || hasAnswered.value) return
  quizStore.answerQuestion(quizStore.currentQuestion.id, idx)
}

function restartQuiz() {
  if (quizStore.currentQuiz) {
    quizStore.startQuiz(quizStore.currentQuiz)
  }
}

function closeQuiz() {
  quizStore.resetQuiz()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && (quizStore.isQuizActive || quizStore.isQuizCompleted)) {
    closeQuiz()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const confettiCanvas = ref<HTMLCanvasElement | null>(null)
const badgeCardRef = ref<HTMLElement | null>(null)

watch(() => quizStore.isQuizCompleted, (newVal) => {
  if (newVal) {
    nextTick(() => {
      fireConfetti()
    })
  }
})

function fireConfetti() {
  const canvas = confettiCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.parentElement?.clientWidth || 600
  canvas.height = canvas.parentElement?.clientHeight || 500

  const colors = ['#C7A664', '#F59E0B', '#12B981', '#F5F1EA', '#8C806E']
  const particles = Array.from({ length: 80 }).map(() => ({
    x: canvas.width / 2,
    y: canvas.height / 2 + 50,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.7) * 12 - 4,
    size: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)]!,
    alpha: 1,
    spin: Math.random() * 360,
    spinSpeed: (Math.random() - 0.5) * 10
  }))

  function update() {
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let active = false

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.35 // gravity
      p.alpha -= 0.015
      p.spin += p.spinSpeed

      if (p.alpha > 0) {
        active = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.spin * Math.PI) / 180)
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }
    })

    if (active) {
      requestAnimationFrame(update)
    }
  }

  update()
}

function handleMouseMove(e: MouseEvent) {
  const card = badgeCardRef.value
  if (!card) return
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const xc = rect.width / 2
  const yc = rect.height / 2
  
  const maxRot = 15
  const tiltX = ((yc - y) / yc) * maxRot
  const tiltY = ((x - xc) / xc) * maxRot
  
  card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
}

function handleMouseLeave() {
  const card = badgeCardRef.value
  if (!card) return
  card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
}

function getOptionClass(idx: number) {
  const isSelected = selectedAnswerIndex.value === idx
  const isCorrect = quizStore.currentQuestion?.correctIndex === idx

  if (!hasAnswered.value) {
    return 'bg-charcoal-950/30 border-charcoal-800 hover:border-gold-500/40 text-charcoal-300 hover:text-ivory'
  }

  if (isCorrect) {
    return 'bg-forest-900/20 border-forest-500/40 text-forest-200'
  }

  if (isSelected) {
    return 'bg-brick-900/20 border-brick-500/40 text-brick-200'
  }

  return 'bg-charcoal-950/20 border-charcoal-850 text-charcoal-500 opacity-60'
}

function getOptionBadgeClass(idx: number) {
  const isSelected = selectedAnswerIndex.value === idx
  const isCorrect = quizStore.currentQuestion?.correctIndex === idx

  if (!hasAnswered.value) {
    return 'border-charcoal-700 text-charcoal-400 group-hover:border-gold-500/40 group-hover:text-gold-400'
  }

  if (isCorrect) {
    return 'bg-forest-500/20 border-forest-500/40 text-forest-400'
  }

  if (isSelected) {
    return 'bg-brick-500/20 border-brick-500/40 text-brick-400'
  }

  return 'border-charcoal-800 text-charcoal-400'
}

function formatSeconds(s: number) {
  const min = Math.floor(s / 60)
  const sec = Math.round(s % 60)
  return min > 0 ? `${min}p ${sec}s` : `${sec} giây`
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
