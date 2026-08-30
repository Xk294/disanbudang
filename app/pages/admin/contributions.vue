<template>
  <div class="p-6 lg:p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-stone-100">Contributions</h1>
        <p class="text-stone-500 text-sm mt-0.5">Review community submissions</p>
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm transition-colors"
        :disabled="loading"
        @click="fetchContributions"
      >
        <Icon :name="loading ? 'mdi:loading' : 'mdi:refresh'" :class="{ 'animate-spin': loading }" class="w-4 h-4" />
        Refresh
      </button>
    </div>

    <!-- Status tabs -->
    <div class="flex gap-1 bg-stone-900 rounded-xl p-1 mb-6 w-fit">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="activeStatus === tab.value
          ? 'bg-stone-700 text-stone-100'
          : 'text-stone-500 hover:text-stone-300'"
        @click="setStatus(tab.value)"
      >
        {{ tab.label }}
        <span
          v-if="counts[tab.value] !== undefined"
          class="text-xs px-1.5 py-0.5 rounded-full"
          :class="tab.value === 'pending' && (counts.pending ?? 0) > 0
            ? 'bg-amber-500 text-stone-900 font-bold'
            : 'bg-stone-700 text-stone-400'"
        >
          {{ counts[tab.value] ?? 0 }}
        </span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading && !contributions.length" class="flex justify-center py-20">
      <Icon name="mdi:loading" class="w-8 h-8 text-amber-500 animate-spin" />
    </div>

    <!-- Empty state -->
    <div v-else-if="!loading && !contributions.length" class="text-center py-20">
      <Icon name="mdi:inbox-outline" class="w-12 h-12 text-stone-700 mx-auto mb-3" />
      <p class="text-stone-500">No {{ activeStatus === 'all' ? '' : activeStatus }} contributions.</p>
    </div>

    <!-- Contribution cards -->
    <div v-else class="space-y-3">
      <div
        v-for="c in contributions"
        :key="c.id"
        class="bg-stone-900 border border-stone-800 rounded-2xl p-5 hover:border-stone-700 transition-colors"
      >
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <!-- Info -->
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 mb-2 flex-wrap">
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-800 text-stone-400">
                {{ c.type }}
              </span>
              <span
                class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                :class="statusClass(c.status)"
              >
                {{ c.status }}
              </span>
              <span class="text-[10px] text-stone-600">{{ formatDate(c.created_at) }}</span>
            </div>
            <h3 class="font-semibold text-stone-100 text-sm leading-snug mb-1 truncate">{{ c.title }}</h3>
            <p class="text-stone-500 text-xs mb-2">
              By <span class="text-stone-400">{{ c.author_name }}</span>
              <span v-if="c.author_role"> · {{ c.author_role }}</span>
            </p>
            <p class="text-stone-400 text-xs leading-relaxed line-clamp-2">{{ c.content }}</p>
            <p v-if="c.review_note" class="mt-2 text-xs text-amber-600 italic">
              Note: {{ c.review_note }}
            </p>
          </div>

          <!-- Actions (only for pending) -->
          <div v-if="c.status === 'pending'" class="flex gap-2 shrink-0">
            <button
              class="px-3 py-1.5 rounded-lg bg-green-950/60 hover:bg-green-900/60 border border-green-800/50 text-green-400 text-xs font-semibold transition-colors"
              :disabled="actionId === c.id"
              @click="openReview(c, 'approved')"
            >
              <Icon name="mdi:check" class="w-3.5 h-3.5 inline mr-1" />
              Approve
            </button>
            <button
              class="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 border border-red-800/50 text-red-400 text-xs font-semibold transition-colors"
              :disabled="actionId === c.id"
              @click="openReview(c, 'rejected')"
            >
              <Icon name="mdi:close" class="w-3.5 h-3.5 inline mr-1" />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Review modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="reviewTarget"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="reviewTarget = null"
        >
          <div class="bg-stone-900 border border-stone-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 class="font-bold text-stone-100 mb-1">
              {{ reviewAction === 'approved' ? '✅ Approve' : '❌ Reject' }} Contribution
            </h3>
            <p class="text-stone-500 text-xs mb-4 truncate">{{ reviewTarget.title }}</p>
            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Review note (optional)
            </label>
            <textarea
              v-model="reviewNote"
              rows="3"
              placeholder="Add a note for your records…"
              class="w-full px-3 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-stone-200 text-sm placeholder-stone-600 focus:outline-none focus:border-stone-500 resize-none"
            />
            <div class="flex gap-3 mt-4 justify-end">
              <button
                class="px-4 py-2 rounded-xl text-sm text-stone-400 hover:text-stone-200 transition-colors"
                @click="reviewTarget = null"
              >
                Cancel
              </button>
              <button
                class="px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                :class="reviewAction === 'approved'
                  ? 'bg-green-700 hover:bg-green-600 text-white'
                  : 'bg-red-800 hover:bg-red-700 text-white'"
                :disabled="actionId !== null"
                @click="submitReview"
              >
                <Icon v-if="actionId" name="mdi:loading" class="w-4 h-4 animate-spin inline mr-1" />
                Confirm {{ reviewAction === 'approved' ? 'Approval' : 'Rejection' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ meta: [{ name: 'robots', content: 'noindex,nofollow' }] })

interface Contribution {
  id: string
  type: string
  author_name: string
  author_role: string
  title: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  review_note?: string
  created_at: string
  ip?: string
}

const { authReady, isAdmin, initAuthListener, getIdToken } = useAuth()
const pendingCount = useState<number>('admin.pending_count', () => 0)

const contributions = ref<Contribution[]>([])
const counts = ref<Record<string, number>>({ pending: 0, approved: 0, rejected: 0 })
const activeStatus = ref<'pending' | 'approved' | 'rejected' | 'all'>('pending')
const loading = ref(false)
const actionId = ref<string | null>(null)
const reviewTarget = ref<Contribution | null>(null)
const reviewAction = ref<'approved' | 'rejected'>('approved')
const reviewNote = ref('')

const tabs: Array<{ label: string; value: 'pending' | 'approved' | 'rejected' | 'all' }> = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'All', value: 'all' },
]

onMounted(() => {
  initAuthListener()
})

// Guard: redirect to login if not admin
watch(authReady, (ready) => {
  if (!ready) return
  if (!isAdmin.value) navigateTo('/admin/login')
  else fetchContributions()
}, { immediate: true })

// Cleanup on unmount (per RULE-stack-akiNuxtCf)
let fetchAbort: AbortController | null = null
onUnmounted(() => {
  fetchAbort?.abort()
})

async function fetchContributions() {
  loading.value = true
  fetchAbort = new AbortController()
  const token = await getIdToken()
  if (!token) { navigateTo('/admin/login'); return }

  try {
    const data = await $fetch<{
      contributions: Contribution[]
      counts: Record<string, number>
    }>('/api/admin/contributions', {
      headers: { Authorization: `Bearer ${token}` },
      query: { status: activeStatus.value },
    })
    contributions.value = data.contributions
    counts.value = data.counts
    pendingCount.value = data.counts.pending ?? 0
  } catch (e) {
    console.error('[contributions] fetch error:', e)
  } finally {
    loading.value = false
  }
}

function setStatus(s: typeof activeStatus.value) {
  activeStatus.value = s
  fetchContributions()
}

function openReview(c: Contribution, action: 'approved' | 'rejected') {
  reviewTarget.value = c
  reviewAction.value = action
  reviewNote.value = ''
}

async function submitReview() {
  if (!reviewTarget.value) return
  const token = await getIdToken()
  if (!token) return

  actionId.value = reviewTarget.value.id
  try {
    await $fetch(`/api/admin/contributions/${reviewTarget.value.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: { status: reviewAction.value, review_note: reviewNote.value || undefined },
    })
    reviewTarget.value = null
    await fetchContributions()
  } catch (e) {
    console.error('[contributions] review error:', e)
  } finally {
    actionId.value = null
  }
}

function statusClass(status: string) {
  if (status === 'approved') return 'bg-green-950/60 text-green-400'
  if (status === 'rejected') return 'bg-red-950/60 text-red-400'
  return 'bg-amber-950/60 text-amber-400'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
