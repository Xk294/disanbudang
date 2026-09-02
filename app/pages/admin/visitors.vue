<template>
  <div class="p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-xl font-bold text-stone-100">Lưu Lượng & Lịch Sử Truy Cập</h1>
        <p class="text-stone-400 text-xs mt-1">
          Theo dõi số lượt truy cập của người dùng theo từng trang và địa chỉ IP.
        </p>
      </div>

      <button
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-medium transition-colors cursor-pointer w-fit"
        :disabled="loading"
        @click="fetchVisitors"
      >
        <Icon :name="loading ? 'mdi:loading' : 'mdi:refresh'" :class="{ 'animate-spin': loading }" class="w-4 h-4 text-amber-500" />
        Làm mới
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Số Lượng IP Độc Bản (Unique)</p>
          <p class="text-3xl font-bold text-amber-400">{{ stats.unique_ips.toLocaleString() }}</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Icon name="mdi:ip-network-outline" class="w-6 h-6" />
        </div>
      </div>

      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Tổng Lượt Xem Trang (Pageviews)</p>
          <p class="text-3xl font-bold text-stone-100">{{ stats.total_visits.toLocaleString() }}</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300">
          <Icon name="mdi:chart-timeline-variant" class="w-6 h-6" />
        </div>
      </div>
    </div>

    <!-- Top Paths -->
    <div v-if="topPaths.length" class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 mb-6">
      <div class="flex items-center gap-2 mb-3">
        <Icon name="mdi:fire" class="w-4 h-4 text-amber-400" />
        <p class="text-xs font-bold uppercase tracking-wider text-stone-300">Các trang được xem nhiều nhất (Top 10)</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div
          v-for="p in topPaths"
          :key="p.path"
          class="flex items-center justify-between gap-3 px-3 py-2 bg-stone-950/60 border border-stone-800/80 rounded-xl"
        >
          <span class="text-stone-300 text-xs font-mono truncate flex-1">{{ p.path }}</span>
          <span class="text-amber-400 text-xs font-bold tabular-nums px-2 py-0.5 bg-amber-500/10 rounded-md">
            {{ p.total.toLocaleString() }} lượt
          </span>
        </div>
      </div>
    </div>

    <!-- Search Controls -->
    <div class="flex items-center justify-between gap-3 mb-4">
      <div class="relative w-full sm:w-80">
        <Icon name="mdi:magnify" class="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Lọc theo IP, đường dẫn, email..."
          class="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 text-xs placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
        />
        <button
          v-if="searchQuery"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
          @click="searchQuery = ''"
        >
          <Icon name="mdi:close-circle" class="w-3.5 h-3.5" />
        </button>
      </div>

      <span class="text-xs text-stone-500 hidden sm:inline">
        Hiển thị {{ filteredVisitors.length }} / {{ visitors.length }} bản ghi
      </span>
    </div>

    <!-- Table -->
    <div class="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
      <div v-if="loading && !visitors.length" class="flex flex-col items-center justify-center py-20">
        <Icon name="mdi:loading" class="w-8 h-8 text-amber-500 animate-spin mb-2" />
        <p class="text-stone-500 text-xs">Đang tải nhật ký truy cập...</p>
      </div>
      <div v-else-if="!filteredVisitors.length" class="text-center py-20">
        <Icon name="mdi:account-eye-outline" class="w-12 h-12 text-stone-700 mx-auto mb-2" />
        <p class="text-stone-400 text-sm font-medium">Chưa có dữ liệu truy cập nào.</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-stone-800 text-stone-500 uppercase tracking-wider">
              <th class="text-left px-5 py-3.5 font-semibold">Địa chỉ IP</th>
              <th class="text-left px-5 py-3.5 font-semibold">Tài khoản (nếu đăng nhập)</th>
              <th class="text-left px-5 py-3.5 font-semibold">Trang truy cập (Path)</th>
              <th class="text-right px-5 py-3.5 font-semibold">Số lượt</th>
              <th class="text-right px-5 py-3.5 font-semibold">Lần cuối xem</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="v in filteredVisitors"
              :key="v.id"
              class="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors"
            >
              <td class="px-5 py-3 font-mono text-stone-300 font-medium">{{ v.ip }}</td>
              <td class="px-5 py-3 text-stone-400 max-w-[180px] truncate">
                <div v-if="v.email" class="flex items-center gap-1.5">
                  <Icon name="mdi:account-check" class="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span class="text-stone-200 truncate">{{ v.display_name || v.email }}</span>
                </div>
                <span v-else class="text-stone-600 italic">Khách vãng lai</span>
              </td>
              <td class="px-5 py-3 font-mono text-amber-400/90 max-w-[200px] truncate">
                {{ v.path }}
              </td>
              <td class="px-5 py-3 text-right text-stone-200 font-bold tabular-nums">
                {{ v.visit_count }}
              </td>
              <td class="px-5 py-3 text-right text-stone-500 whitespace-nowrap">
                {{ formatDate(v.last_seen_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({
  title: 'Nhật ký Truy cập — Admin Di Sản Bù Đăng',
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

interface VisitorRow {
  id: number
  ip: string
  email: string | null
  display_name: string | null
  path: string
  visit_count: number
  first_seen_at: string
  last_seen_at: string
}

interface TopPath { path: string; total: number }

const { authReady, isAdmin, initAuthListener, getIdToken } = useAuth()

const visitors = ref<VisitorRow[]>([])
const stats = ref({ unique_ips: 0, total_visits: 0 })
const topPaths = ref<TopPath[]>([])
const loading = ref(false)
const searchQuery = ref('')

onMounted(() => {
  initAuthListener()
})

watch(authReady, (ready) => {
  if (!ready) return
  if (!isAdmin.value) navigateTo('/admin/login')
  else fetchVisitors()
}, { immediate: true })

async function fetchVisitors() {
  loading.value = true
  const token = await getIdToken()
  if (!token) { navigateTo('/admin/login'); return }

  try {
    const data = await $fetch<{
      visitors: VisitorRow[]
      stats: { unique_ips: number; total_visits: number }
      top_paths: TopPath[]
    }>('/api/admin/visitors', {
      headers: { Authorization: `Bearer ${token}` },
    })
    visitors.value = data.visitors
    stats.value = data.stats
    topPaths.value = data.top_paths
  } catch (e) {
    console.error('[visitors] fetch error:', e)
  } finally {
    loading.value = false
  }
}

const filteredVisitors = computed(() => {
  if (!searchQuery.value.trim()) return visitors.value
  const q = searchQuery.value.trim().toLowerCase()
  return visitors.value.filter(v =>
    v.ip.toLowerCase().includes(q) ||
    v.path.toLowerCase().includes(q) ||
    (v.email && v.email.toLowerCase().includes(q)) ||
    (v.display_name && v.display_name.toLowerCase().includes(q)),
  )
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
</script>
