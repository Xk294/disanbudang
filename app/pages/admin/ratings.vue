<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-800">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-stone-100">Đánh Giá & Phản Hồi</h1>
        <p class="text-stone-400 text-xs mt-1">
          Theo dõi đánh giá sao và ý kiến đóng góp trải nghiệm từ cộng đồng người dùng.
        </p>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
          :disabled="loading"
          @click="fetchRatings"
        >
          <Icon :name="loading ? 'mdi:loading' : 'mdi:refresh'" :class="{ 'animate-spin': loading }" class="w-4 h-4 text-amber-500" />
          Làm mới
        </button>

        <button
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          :disabled="loading || ratings.length === 0"
          @click="exportCsv"
        >
          <Icon name="mdi:download" class="w-4 h-4" />
          Xuất CSV
        </button>
      </div>
    </div>

    <!-- Stats Overview Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Average Score -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Điểm Trung Bình</p>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-amber-400">{{ stats.avgStars ?? '—' }}</span>
            <span class="text-stone-500 text-xs">/ 5.0</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Icon name="mdi:star" class="w-6 h-6" />
        </div>
      </div>

      <!-- Total Ratings -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Tổng Lượt Đánh Giá</p>
          <p class="text-3xl font-extrabold text-stone-100">{{ stats.total.toLocaleString() }}</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300">
          <Icon name="mdi:account-voice" class="w-6 h-6" />
        </div>
      </div>

      <!-- Star Distribution -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5">
        <p class="text-stone-500 text-xs uppercase tracking-wider mb-2">Phân Bố Số Sao</p>
        <div class="space-y-1">
          <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-2 text-xs">
            <span class="text-stone-400 w-6 font-mono">{{ star }}★</span>
            <div class="flex-1 bg-stone-800 h-2 rounded-full overflow-hidden">
              <div
                class="bg-amber-400 h-full rounded-full transition-all"
                :style="{ width: `${getPercentage(star)}%` }"
              />
            </div>
            <span class="text-stone-500 text-[10px] w-8 text-right tabular-nums">{{ getStarCount(star) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter & Search Controls -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="flex flex-wrap gap-1 bg-stone-900/90 border border-stone-800 rounded-2xl p-1 w-full sm:w-fit">
        <button
          v-for="filter in starFilters"
          :key="filter.value ?? 'all'"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          :class="selectedStar === filter.value
            ? 'bg-stone-800 text-amber-400 font-semibold shadow-sm'
            : 'text-stone-400 hover:text-stone-200'"
          @click="setStarFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Search Input -->
      <div class="relative w-full sm:w-80">
        <Icon name="mdi:magnify" class="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm trong nhận xét, IP..."
          class="w-full pl-9 pr-8 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 text-xs placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
          @keyup.enter="handleSearch"
        />
        <button
          v-if="searchQuery"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
          @click="searchQuery = ''; handleSearch()"
        >
          <Icon name="mdi:close-circle" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Ratings List Container -->
    <div class="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-sm">
      <!-- Loading -->
      <div v-if="loading && !ratings.length" class="flex flex-col items-center justify-center py-20">
        <Icon name="mdi:loading" class="w-8 h-8 text-amber-500 animate-spin mb-2" />
        <p class="text-stone-500 text-xs">Đang tải danh sách đánh giá...</p>
      </div>

      <!-- Empty -->
      <div v-else-if="!ratings.length" class="text-center py-20">
        <Icon name="mdi:star-off-outline" class="w-12 h-12 text-stone-700 mx-auto mb-2" />
        <p class="text-stone-300 text-sm font-semibold">Chưa có đánh giá nào phù hợp.</p>
        <p class="text-stone-500 text-xs mt-1">
          {{ searchQuery || selectedStar !== null ? 'Thử xóa bộ lọc để xem toàn bộ đánh giá.' : 'Chưa có đánh giá nào được gửi lên.' }}
        </p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-stone-800 text-stone-500 uppercase tracking-wider bg-stone-950/40">
              <th class="text-left px-5 py-3.5 font-semibold">Đánh giá</th>
              <th class="text-left px-5 py-3.5 font-semibold">Nhận xét & Góp ý</th>
              <th class="text-left px-5 py-3.5 font-semibold">Địa chỉ IP</th>
              <th class="text-right px-5 py-3.5 font-semibold">Thời gian</th>
              <th class="text-right px-5 py-3.5 font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-800/60">
            <tr
              v-for="r in ratings"
              :key="r.id"
              class="hover:bg-stone-800/30 transition-colors"
            >
              <!-- Stars -->
              <td class="px-5 py-3.5 whitespace-nowrap">
                <div class="flex items-center gap-1 text-amber-400">
                  <Icon
                    v-for="i in 5"
                    :key="i"
                    :name="i <= r.stars ? 'mdi:star' : 'mdi:star-outline'"
                    class="w-4 h-4"
                  />
                  <span class="font-bold text-stone-200 ml-1.5 tabular-nums">{{ r.stars }}/5</span>
                </div>
              </td>

              <!-- Comment -->
              <td class="px-5 py-3.5 max-w-md">
                <p v-if="r.comment" class="text-stone-200 leading-relaxed font-normal">{{ r.comment }}</p>
                <span v-else class="text-stone-600 italic">Không để lại bình luận</span>
              </td>

              <!-- IP -->
              <td class="px-5 py-3.5 font-mono text-stone-400 whitespace-nowrap">
                {{ r.ip }}
              </td>

              <!-- Date -->
              <td class="px-5 py-3.5 text-right text-stone-500 whitespace-nowrap font-mono text-[11px]">
                {{ formatDate(r.created_at) }}
              </td>

              <!-- Delete Action -->
              <td class="px-5 py-3.5 text-right whitespace-nowrap">
                <button
                  class="p-2 rounded-xl text-stone-500 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                  title="Xóa đánh giá này"
                  :disabled="actionId === r.id"
                  @click="openDeleteModal(r)"
                >
                  <Icon name="mdi:trash-can-outline" class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="px-5 py-3 border-t border-stone-800 flex items-center justify-between gap-4 flex-wrap bg-stone-950/40">
        <span class="text-xs text-stone-500">
          Trang {{ currentPage }} / {{ totalPages }} (Tổng {{ filteredTotal }} đánh giá)
        </span>

        <div class="flex items-center gap-1.5">
          <button
            class="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            :disabled="currentPage <= 1 || loading"
            @click="changePage(currentPage - 1)"
          >
            Trang trước
          </button>
          <span class="px-2 text-xs font-bold text-amber-400">{{ currentPage }}</span>
          <button
            class="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            :disabled="currentPage >= totalPages || loading"
            @click="changePage(currentPage + 1)"
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="deleteTarget"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          @click.self="deleteTarget = null"
        >
          <div class="bg-stone-900 border border-red-900/50 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <div class="flex items-center gap-3 mb-3 text-rose-400">
              <Icon name="mdi:alert-octagon" class="w-6 h-6" />
              <h3 class="font-bold text-stone-100 text-base">Xóa Đánh Giá?</h3>
            </div>
            <p class="text-stone-300 text-xs leading-relaxed mb-4">
              Bạn có chắc chắn muốn xóa bản ghi đánh giá này (IP: {{ deleteTarget.ip }}, {{ deleteTarget.stars }} sao)?
            </p>
            <div class="flex gap-3 justify-end">
              <button
                class="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-stone-200 cursor-pointer"
                @click="deleteTarget = null"
              >
                Hủy
              </button>
              <button
                class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600 text-white transition-all cursor-pointer flex items-center gap-1.5"
                :disabled="actionId !== null"
                @click="confirmDelete"
              >
                <Icon v-if="actionId" name="mdi:loading" class="w-4 h-4 animate-spin" />
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: 'Quản lý Đánh giá — Admin Di Sản Bù Đăng',
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

interface RatingRow {
  id: number
  ip: string
  stars: number
  comment: string | null
  created_at: string
}

interface BreakdownRow {
  stars: number
  count: number
}

const { getIdToken } = useAuth()
const toast = useToast()

const ratings = ref<RatingRow[]>([])
const stats = ref<{ avgStars: number | null; total: number }>({ avgStars: null, total: 0 })
const breakdown = ref<BreakdownRow[]>([])
const loading = ref(false)
const selectedStar = ref<number | null>(null)
const searchQuery = ref('')
const actionId = ref<number | null>(null)
const deleteTarget = ref<RatingRow | null>(null)

// Pagination
const currentPage = ref(1)
const pageSize = 50
const filteredTotal = ref(0)
const totalPages = computed(() => Math.ceil(filteredTotal.value / pageSize) || 1)

const starFilters = [
  { label: 'Tất cả', value: null },
  { label: '5 ★', value: 5 },
  { label: '4 ★', value: 4 },
  { label: '3 ★', value: 3 },
  { label: '2 ★', value: 2 },
  { label: '1 ★', value: 1 },
]

onMounted(() => {
  fetchRatings()
})

async function fetchRatings() {
  loading.value = true
  const token = await getIdToken()
  if (!token) return

  const offset = (currentPage.value - 1) * pageSize
  try {
    const data = await $fetch<{
      ratings: RatingRow[]
      stats: { avgStars: number | null; total: number }
      breakdown: BreakdownRow[]
      filteredTotal: number
    }>('/api/admin/ratings', {
      headers: { Authorization: `Bearer ${token}` },
      query: {
        stars: selectedStar.value ?? undefined,
        search: searchQuery.value.trim() || undefined,
        limit: pageSize,
        offset,
      },
    })
    ratings.value = data.ratings
    stats.value = data.stats
    breakdown.value = data.breakdown
    filteredTotal.value = data.filteredTotal ?? data.ratings.length
  } catch (e) {
    console.error('[ratings] fetch error:', e)
    toast.error('Không thể tải danh sách đánh giá')
  } finally {
    loading.value = false
  }
}

function setStarFilter(star: number | null) {
  selectedStar.value = star
  currentPage.value = 1
  fetchRatings()
}

function handleSearch() {
  currentPage.value = 1
  fetchRatings()
}

function changePage(p: number) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  fetchRatings()
}

function getStarCount(stars: number): number {
  const row = breakdown.value.find(b => b.stars === stars)
  return row ? row.count : 0
}

function getPercentage(stars: number): number {
  if (!stats.value.total) return 0
  return Math.round((getStarCount(stars) / stats.value.total) * 100)
}

function openDeleteModal(r: RatingRow) {
  deleteTarget.value = r
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  const token = await getIdToken()
  if (!token) return

  actionId.value = deleteTarget.value.id
  try {
    await $fetch(`/api/admin/ratings/${deleteTarget.value.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    toast.success('Đã xóa đánh giá thành công')
    deleteTarget.value = null
    await fetchRatings()
  } catch (e) {
    console.error('[ratings] delete error:', e)
    toast.error('Xóa đánh giá thất bại')
  } finally {
    actionId.value = null
  }
}

function exportCsv() {
  if (ratings.value.length === 0) return

  const headers = ['ID', 'So Sao', 'Nhan Xet', 'Dia Chi IP', 'Thoi Gian']
  const rows = ratings.value.map(r => [
    `"${r.id}"`,
    r.stars,
    `"${(r.comment || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${r.ip}"`,
    `"${r.created_at}"`,
  ])

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `danh-gia-disanbudang-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toast.success('Đã xuất file CSV thành công')
}

function formatDate(iso?: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96); }
</style>
