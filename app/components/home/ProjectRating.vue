<template>
  <section class="relative py-24 overflow-hidden" id="danh-gia-du-an">
    <!-- Background decoration -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(212,175,55,0.04),transparent)]" />
    </div>

    <div class="mx-auto max-w-4xl px-6 lg:px-10">

      <!-- Section header -->
      <div class="text-center mb-14">
        <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500/70 mb-3">Phản hồi cộng đồng</p>
        <h2 class="font-heading font-bold text-3xl md:text-4xl text-ivory mb-4">Đánh Giá Dự Án</h2>
        <p class="text-charcoal-400 text-sm leading-relaxed max-w-xl mx-auto">
          Chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện nền tảng số di sản địa phương
        </p>
      </div>

      <!-- Stats summary (only shown when there are ratings) -->
      <Transition name="fade-up">
        <div v-if="stats && stats.total > 0" class="flex flex-col sm:flex-row items-center justify-center gap-8 mb-14">
          <!-- Big average -->
          <div class="flex flex-col items-center">
            <span class="font-heading font-bold text-7xl text-ivory tabular-nums leading-none">{{ stats.avgStars?.toFixed(1) ?? '–' }}</span>
            <div class="flex gap-1 mt-3 mb-1.5">
              <Icon
                v-for="s in 5"
                :key="s"
                :name="s <= Math.round(stats.avgStars ?? 0) ? 'mdi:star' : 'mdi:star-outline'"
                class="w-5 h-5 transition-colors"
                :class="s <= Math.round(stats.avgStars ?? 0) ? 'text-gold-400' : 'text-charcoal-700'"
              />
            </div>
            <span class="text-xs text-charcoal-500">{{ stats.total }} đánh giá</span>
          </div>

          <!-- Divider -->
          <div class="hidden sm:block w-px h-24 bg-charcoal-800" />

          <!-- Breakdown bars -->
          <div class="flex flex-col gap-2 w-full sm:max-w-xs">
            <div v-for="b in breakdownFull" :key="b.stars" class="flex items-center gap-2.5">
              <span class="text-xs text-charcoal-500 w-3 shrink-0">{{ b.stars }}</span>
              <Icon name="mdi:star" class="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
              <div class="flex-1 h-1.5 rounded-full bg-charcoal-800 overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700 ease-out"
                  :style="{ width: `${b.pct}%` }"
                />
              </div>
              <span class="text-xs text-charcoal-600 w-6 text-right shrink-0">{{ b.count }}</span>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Rating form -->
      <div class="bg-charcoal-900/60 border border-charcoal-800/60 rounded-3xl p-8 md:p-10 backdrop-blur-sm mb-12">
        <h3 class="font-heading font-semibold text-ivory text-lg mb-2 text-center">
          {{ submitted ? '✨ Cảm ơn bạn đã gửi đánh giá!' : (hasExistingRating ? 'Cập Nhật Đánh Giá Của Bạn' : 'Gửi Đánh Giá Của Bạn') }}
        </h3>
        <p class="text-center text-xs text-charcoal-400 mb-6">
          {{ hasExistingRating ? 'Bạn đã từng đánh giá dự án này. Bạn có thể cập nhật lại số sao và cảm nhận bên dưới.' : 'Mỗi đóng góp ý kiến của bạn là động lực to lớn giúp bảo tồn và lan tỏa di sản Bù Đăng.' }}
        </p>

        <!-- User Authentication Status Banner -->
        <div v-if="user" class="flex items-center justify-between bg-charcoal-950/60 border border-charcoal-800 rounded-2xl p-3.5 mb-6">
          <div class="flex items-center gap-3 min-w-0">
            <img
              v-if="user.photoURL"
              :src="user.photoURL"
              :alt="user.displayName ?? 'Google User'"
              class="w-9 h-9 rounded-full object-cover border border-gold-500/40 shrink-0"
              referrerpolicy="no-referrer"
            />
            <div v-else class="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold shrink-0">
              {{ (user.displayName || user.email || 'U').charAt(0).toUpperCase() }}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-xs font-semibold text-ivory truncate">{{ user.displayName || 'Tài khoản Google' }}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 font-medium">Đã đăng nhập</span>
              </div>
              <p class="text-[10px] text-charcoal-500 font-mono truncate">{{ user.email }}</p>
            </div>
          </div>
          <button
            class="text-xs text-charcoal-400 hover:text-gold-400 transition-colors ml-2 shrink-0 cursor-pointer font-medium"
            @click="handleSignOut"
          >
            Đổi tài khoản
          </button>
        </div>

        <div v-else class="flex flex-col sm:flex-row items-center justify-between gap-3.5 bg-gradient-to-r from-gold-500/10 via-charcoal-900/40 to-transparent border border-gold-500/20 rounded-2xl p-4 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
              <Icon name="mdi:shield-account-outline" class="w-4 h-4" />
            </div>
            <p class="text-xs text-ivory/90 leading-relaxed">
              Vui lòng <strong class="text-gold-400 font-semibold">Đăng nhập</strong> (Google hoặc Facebook) để gửi đánh giá và nhận diện thành viên.
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0 flex-wrap justify-center">
            <button
              class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-ivory hover:bg-gold-100 text-charcoal-950 font-semibold text-xs transition-all shadow-sm cursor-pointer active:scale-95 disabled:opacity-50"
              :disabled="signingInProvider !== null"
              @click="handleSignIn('google')"
            >
              <Icon v-if="signingInProvider === 'google'" name="mdi:loading" class="w-4 h-4 animate-spin text-charcoal-800" />
              <Icon v-else name="mdi:google" class="w-4 h-4 text-[#EA4335]" />
              <span>Google</span>
            </button>
            <button
              class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-xs transition-all shadow-sm cursor-pointer active:scale-95 disabled:opacity-50"
              :disabled="signingInProvider !== null"
              @click="handleSignIn('facebook')"
            >
              <Icon v-if="signingInProvider === 'facebook'" name="mdi:loading" class="w-4 h-4 animate-spin text-white" />
              <Icon v-else name="mdi:facebook" class="w-4 h-4 text-white" />
              <span>Facebook</span>
            </button>
          </div>
        </div>

        <!-- Star picker -->
        <div class="flex justify-center gap-2 mb-4">
          <button
            v-for="s in 5"
            :key="s"
            class="w-11 h-11 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
            :aria-label="`${s} sao`"
            :disabled="submitting"
            @click="selectedStars = s"
            @mouseenter="hoverStars = s"
            @mouseleave="hoverStars = 0"
          >
            <Icon
              :name="s <= (hoverStars || selectedStars) ? 'mdi:star' : 'mdi:star-outline'"
              class="w-8 h-8 transition-all duration-150"
              :class="s <= (hoverStars || selectedStars)
                ? 'text-gold-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                : 'text-charcoal-600 hover:text-charcoal-400'"
            />
          </button>
        </div>

        <!-- Star label -->
        <p class="text-center text-xs text-charcoal-400 font-medium h-4 mb-6 transition-all duration-200">
          {{ starLabel }}
        </p>

        <!-- Comment textarea -->
        <div class="mb-6">
          <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-2">
            Nhận xét & Góp ý (tối đa 500 ký tự)
          </label>
          <textarea
            v-model="comment"
            rows="3"
            maxlength="500"
            placeholder="Chia sẻ cảm nhận của bạn về giao diện, kiến thức di tích hoặc điểm cần hoàn thiện..."
            :disabled="submitting"
            class="w-full px-4 py-3 bg-charcoal-950/60 border border-charcoal-700/60 rounded-2xl text-ivory text-sm placeholder-charcoal-600 focus:outline-none focus:border-gold-500/50 resize-none transition-colors disabled:opacity-50"
          />
          <p class="text-right text-[10px] text-charcoal-600 mt-1">{{ comment.length }}/500</p>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center">
          <div v-if="!user" class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <button
              class="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm bg-ivory hover:bg-gold-100 text-charcoal-950 transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              :disabled="signingInProvider !== null || submitting || selectedStars === 0"
              @click="handleSignIn('google')"
            >
              <Icon v-if="signingInProvider === 'google'" name="mdi:loading" class="w-4 h-4 animate-spin text-charcoal-800" />
              <Icon v-else name="mdi:google" class="w-4 h-4 text-[#EA4335]" />
              <span>Đăng nhập Google để gửi</span>
            </button>

            <button
              class="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm bg-[#1877F2] hover:bg-[#166fe5] text-white transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              :disabled="signingInProvider !== null || submitting || selectedStars === 0"
              @click="handleSignIn('facebook')"
            >
              <Icon v-if="signingInProvider === 'facebook'" name="mdi:loading" class="w-4 h-4 animate-spin text-white" />
              <Icon v-else name="mdi:facebook" class="w-4 h-4 text-white" />
              <span>Đăng nhập Facebook để gửi</span>
            </button>
          </div>

          <button
            v-else
            class="relative flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer"
            :class="submitted
              ? 'bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 cursor-default'
              : 'bg-gold-500 hover:bg-gold-400 text-charcoal-950 hover:shadow-lg hover:shadow-gold-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'"
            :disabled="submitting || selectedStars === 0"
            @click="submitRating"
          >
            <Icon v-if="submitting" name="mdi:loading" class="w-4 h-4 animate-spin" />
            <Icon v-else-if="submitted" name="mdi:check-circle-outline" class="w-4 h-4" />
            <Icon v-else name="mdi:send-outline" class="w-4 h-4" />
            <span>{{ submitted ? 'Đã lưu đánh giá' : (hasExistingRating ? 'Cập Nhật Đánh Giá' : 'Gửi Đánh Giá') }}</span>
          </button>
        </div>


        <!-- Error feedback -->
        <p v-if="errorMsg" class="text-center text-rose-400 text-xs mt-4 font-medium">{{ errorMsg }}</p>
      </div>

      <!-- Latest comments -->
      <Transition name="fade-up">
        <div v-if="comments.length > 0">
          <h3 class="font-heading font-semibold text-ivory/80 text-base mb-5 flex items-center gap-2">
            <Icon name="mdi:comment-multiple-outline" class="w-4.5 h-4.5 text-gold-500/60" />
            Nhận xét từ cộng đồng
          </h3>
          <div class="space-y-3">
            <div
              v-for="(c, i) in comments"
              :key="i"
              class="bg-charcoal-900/40 border border-charcoal-800/40 rounded-2xl px-5 py-4 hover:border-charcoal-700/60 transition-colors"
            >
              <div class="flex items-center justify-between gap-2 mb-2.5">
                <div class="flex items-center gap-2.5 min-w-0">
                  <img
                    v-if="c.photo_url"
                    :src="c.photo_url"
                    :alt="c.display_name ?? 'User'"
                    class="w-7 h-7 rounded-full object-cover border border-charcoal-700 shrink-0"
                    referrerpolicy="no-referrer"
                  />
                  <div v-else class="w-7 h-7 rounded-full bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-charcoal-400 text-xs font-semibold shrink-0">
                    {{ (c.display_name || 'U').charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-xs font-semibold text-ivory truncate">{{ c.display_name || 'Người dùng ẩn danh' }}</span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <div class="flex gap-0.5">
                    <Icon
                      v-for="s in 5"
                      :key="s"
                      :name="s <= c.stars ? 'mdi:star' : 'mdi:star-outline'"
                      class="w-3.5 h-3.5"
                      :class="s <= c.stars ? 'text-gold-400' : 'text-charcoal-700'"
                    />
                  </div>
                  <span class="text-[10px] text-charcoal-500 font-mono hidden sm:inline">{{ formatDate(c.created_at) }}</span>
                </div>
              </div>
              <p class="text-charcoal-300 text-sm leading-relaxed pl-9.5">{{ c.comment }}</p>
              <div class="sm:hidden text-right mt-1.5">
                <span class="text-[9px] text-charcoal-600 font-mono">{{ formatDate(c.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </section>
</template>

<script setup lang="ts">
interface RatingStats {
  avgStars: number | null
  total: number
  breakdown: Array<{ stars: number; count: number }>
  comments: Array<{
    stars: number
    comment: string
    display_name?: string | null
    photo_url?: string | null
    created_at: string
  }>
  myRating?: { stars: number; comment: string | null } | null
}

const { user, initAuthListener, signInWithGoogle, signInWithFacebook, signOut, getIdToken } = useAuth()

// ── State ──
const selectedStars = ref(0)
const hoverStars = ref(0)
const comment = ref('')
const submitting = ref(false)
const signingInProvider = ref<'google' | 'facebook' | null>(null)
const submitted = ref(false)
const hasExistingRating = ref(false)
const errorMsg = ref('')

// ── Data ──
const { data, refresh: refreshRatings } = await useFetch<RatingStats>('/api/ratings')
const stats = computed(() => data.value)
const comments = computed(() => data.value?.comments ?? [])

// Breakdown with percentages (5 → 1 order)
const breakdownFull = computed(() => {
  const total = stats.value?.total ?? 0
  const map = new Map((stats.value?.breakdown ?? []).map(b => [b.stars, b.count]))
  return [5, 4, 3, 2, 1].map(s => ({
    stars: s,
    count: map.get(s) ?? 0,
    pct: total > 0 ? Math.round(((map.get(s) ?? 0) / total) * 100) : 0,
  }))
})

// ── Star labels ──
const STAR_LABELS = ['', 'Cần cải thiện', 'Tạm ổn', 'Khá tốt', 'Rất ấn tượng', 'Xuất sắc tuyệt vời!']
const starLabel = computed(() =>
  STAR_LABELS[hoverStars.value || selectedStars.value] ?? ''
)

onMounted(() => {
  initAuthListener()
})

// Watch user state to load previous rating if exists
watch(
  () => user.value,
  async (currentUser) => {
    if (currentUser) {
      try {
        const res = await $fetch<RatingStats>(`/api/ratings?uid=${currentUser.uid}`)
        if (res?.myRating) {
          selectedStars.value = res.myRating.stars
          comment.value = res.myRating.comment ?? ''
          hasExistingRating.value = true
        }
      } catch {
        // Silent fallback
      }
    } else {
      hasExistingRating.value = false
    }
  },
  { immediate: true },
)

// ── Auth handlers ──
async function handleSignIn(provider: 'google' | 'facebook') {
  signingInProvider.value = provider
  errorMsg.value = ''
  try {
    const res = provider === 'google' ? await signInWithGoogle() : await signInWithFacebook()
    if (!res.ok) {
      errorMsg.value = res.error || `Đăng nhập ${provider === 'google' ? 'Google' : 'Facebook'} không thành công`
      return
    }
    // If user already had chosen stars before clicking sign-in, auto submit!
    if (selectedStars.value > 0) {
      await submitRating()
    }
  } catch (err) {
    console.error(`[rating] ${provider} sign-in error:`, err)
    errorMsg.value = 'Đã có lỗi xảy ra khi đăng nhập'
  } finally {
    signingInProvider.value = null
  }
}

async function handleSignOut() {
  await signOut()
  hasExistingRating.value = false
  selectedStars.value = 0
  comment.value = ''
  submitted.value = false
}

// ── Submit rating ──
async function submitRating() {
  if (selectedStars.value === 0 || submitting.value) return

  // Must be authenticated
  if (!user.value) {
    return
  }


  submitting.value = true
  errorMsg.value = ''

  try {
    const token = await getIdToken()
    if (!token) {
      throw new Error('Không lấy được mã xác thực Google, vui lòng đăng nhập lại')
    }

    await $fetch('/api/ratings', {
      method: 'POST',
      body: {
        stars: selectedStars.value,
        comment: comment.value.trim() || undefined,
        idToken: token,
      },
    })

    submitted.value = true
    hasExistingRating.value = true
    // Refresh public stats & comments
    await refreshRatings()
    setTimeout(() => {
      submitted.value = false
    }, 4000)
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }; message?: string }
    errorMsg.value = err?.data?.statusMessage || err?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
  } finally {
    submitting.value = false
  }
}

// ── Format date ──
function formatDate(iso: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}
</script>

<style scoped>
.fade-up-enter-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up-enter-from  { opacity: 0; transform: translateY(16px); }
</style>

