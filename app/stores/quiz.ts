import { defineStore } from 'pinia'
import type { HeritageQuiz, QuizResult, Badge, UserProgress } from '~/types'
import { QUIZZES, BADGES } from '~/data/quizzes'

export const useQuizStore = defineStore(
  'quiz',
  () => {
    const quizzes = ref<HeritageQuiz[]>(QUIZZES)
    const badges = ref<Badge[]>(BADGES)
    const currentQuiz = ref<HeritageQuiz | null>(null)
    const currentQuestionIndex = ref(0)
    const selectedAnswers = ref<Record<string, number>>({})
    const quizResults = ref<QuizResult[]>([])
    const isQuizActive = ref(false)
    const isQuizCompleted = ref(false)
    const startTime = ref<number>(0)

    const userProgress = ref<UserProgress>({
      completedQuizzes: [],
      earnedBadges: [],
      totalScore: 0,
      visitedHeritages: [],
    })

    // Getters
    const currentQuestion = computed(() => {
      if (!currentQuiz.value) return null
      return currentQuiz.value.questions[currentQuestionIndex.value] ?? null
    })

    const totalQuestions = computed(() => currentQuiz.value?.questions.length ?? 0)

    const progressPercent = computed(() =>
      totalQuestions.value > 0
        ? Math.round((currentQuestionIndex.value / totalQuestions.value) * 100)
        : 0,
    )

    const currentScore = computed(() => {
      if (!currentQuiz.value) return 0
      return currentQuiz.value.questions.reduce((score, q, i) => {
        return selectedAnswers.value[q.id] === q.correctIndex ? score + 1 : score
      }, 0)
    })

    const earnedBadges = computed(() =>
      badges.value.filter((b) => userProgress.value.earnedBadges.includes(b.id)),
    )

    // Actions
    function startQuiz(quiz: HeritageQuiz) {
      currentQuiz.value = quiz
      currentQuestionIndex.value = 0
      selectedAnswers.value = {}
      isQuizActive.value = true
      isQuizCompleted.value = false
      startTime.value = Date.now()
    }

    function answerQuestion(questionId: string, answerIndex: number) {
      selectedAnswers.value[questionId] = answerIndex
    }

    function nextQuestion() {
      if (currentQuestionIndex.value < totalQuestions.value - 1) {
        currentQuestionIndex.value++
      } else {
        completeQuiz()
      }
    }

    function prevQuestion() {
      if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--
      }
    }

    function completeQuiz() {
      if (!currentQuiz.value) return

      const timeSpent = Math.round((Date.now() - startTime.value) / 1000)
      const score = currentScore.value
      const total = totalQuestions.value

      const result: QuizResult = {
        quizId: currentQuiz.value.id,
        score,
        total,
        timeSpent,
        completedAt: new Date().toISOString(),
      }

      // Award badge
      if (currentQuiz.value.badgeId && score >= Math.ceil(total * 0.6)) {
        result.badgeEarned = currentQuiz.value.badgeId
        if (!userProgress.value.earnedBadges.includes(currentQuiz.value.badgeId)) {
          userProgress.value.earnedBadges.push(currentQuiz.value.badgeId)
        }
      }

      quizResults.value.push(result)

      if (!userProgress.value.completedQuizzes.includes(currentQuiz.value.id)) {
        userProgress.value.completedQuizzes.push(currentQuiz.value.id)
        userProgress.value.totalScore += score
      }

      // Award Explorer badge if all quizzes are completed
      if (userProgress.value.completedQuizzes.length >= quizzes.value.length) {
        if (!userProgress.value.earnedBadges.includes('badge-explorer')) {
          userProgress.value.earnedBadges.push('badge-explorer')
          result.badgeEarned = 'badge-explorer'
        }
      }

      isQuizCompleted.value = true
      isQuizActive.value = false
    }

    function resetQuiz() {
      currentQuiz.value = null
      currentQuestionIndex.value = 0
      selectedAnswers.value = {}
      isQuizActive.value = false
      isQuizCompleted.value = false
    }

    function getQuizByHeritageId(heritageId: string) {
      return quizzes.value.find((q) => q.heritageId === heritageId)
    }

    function getLastResult(quizId: string) {
      return quizResults.value.findLast((r) => r.quizId === quizId)
    }

    function markHeritageVisited(heritageId: string) {
      if (!userProgress.value.visitedHeritages.includes(heritageId)) {
        userProgress.value.visitedHeritages.push(heritageId)
      }
    }

    const pilotStudyData = {
      sampleSize: 168,
      schoolsInvolved: ['THCS Nguyễn Trường Tộ', 'THPT Lê Quý Đôn', 'Trường PTDTNT Bù Đăng'],
      avgPreTestScore: 5.2,
      avgPostTestScore: 8.8,
      knowledgeGainPercent: 41.8,
      susScore: 89.2, // System Usability Scale
      completionRate: 91.4,
    }

    return {
      quizzes,
      badges,
      currentQuiz,
      currentQuestionIndex,
      selectedAnswers,
      quizResults,
      isQuizActive,
      isQuizCompleted,
      userProgress,
      currentQuestion,
      totalQuestions,
      progressPercent,
      currentScore,
      earnedBadges,
      pilotStudyData,
      startQuiz,
      answerQuestion,
      nextQuestion,
      prevQuestion,
      completeQuiz,
      resetQuiz,
      getQuizByHeritageId,
      getLastResult,
      markHeritageVisited,
    }
  },
  { persist: true },
)
