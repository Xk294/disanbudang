<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-800">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-stone-100">Lưu Lượng & Lịch Sử Truy Cập</h1>
        <p class="text-stone-400 text-xs mt-1">
          Phân tích lượt truy cập, xu hướng người dùng và tần suất quét mã QR di tích thực địa.
        </p>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
          :disabled="loading"
          @click="fetchVisitors"
        >
          <Icon :name="loading ? 'mdi:loading' : 'mdi:refresh'" :class="{ 'animate-spin': loading }" class="w-4 h-4 text-amber-500" />
          Làm mới
        </button>

        <button
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          :disabled="loading || visitors.length === 0"
          @click="exportCsv"
        >
          <Icon name="mdi:download" class="w-4 h-4" />
          Xuất CSV
        </button>
      </div>
    </div>

    <!-- 4 Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Unique IPs -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">IP Độc Bản (Unique)</p>
          <p class="text-3xl font-extrabold text-amber-400 tabular-nums">{{ stats.unique_ips.toLocaleString() }}</p>
        </div>
        <div class="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Icon name="mdi:ip-network-outline" class="w-5 h-5" />
        </div>
      </div>

      <!-- Total Visits -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Tổng Lượt Xem</p>
          <p class="text-3xl font-extrabold text-stone-100 tabular-nums">{{ stats.total_visits.toLocaleString() }}</p>
        </div>
        <div class="w-11 h-11 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300">
          <Icon name="mdi:chart-timeline-variant" class="w-5 h-5" />
        </div>
      </div>

      <!-- QR Scans Total -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Lượt Quét Mã QR</p>
          <p class="text-3xl font-extrabold text-emerald-400 tabular-nums">{{ stats.total_qr_scans.toLocaleString() }}</p>
        </div>
        <div class="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Icon name="mdi:qrcode-scan" class="w-5 h-5" />
        </div>
      </div>

      <!-- QR Unique Visitors -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Khách Quét Mã Thực Địa</p>
          <p class="text-3xl font-extrabold text-blue-400 tabular-nums">{{ stats.unique_qr_ips.toLocaleString() }}</p>
        </div>
        <div class="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
          <Icon name="mdi:map-marker-radius" class="w-5 h-5" />
        </div>
      </div>
    </div>

    <!-- 7-Day Trend Chart -->
    <div v-if="chartData.length > 0" class="p-5 rounded-2xl bg-stone-900/90 border border-stone-800">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <Icon name="mdi:chart-bell-curve" class="w-5 h-5 text-amber-400" />
          <h2 class="text-sm font-bold text-stone-100">Xu Hướng Lưu Lượng 7 Ngày Qua</h2>
        </div>
        <span class="text-xs text-stone-500 font-mono">D1 Database Aggregation</span>
      </div>

      <div class="grid grid-cols-7 gap-2 pt-6 pb-2 items-end h-40">
        <div
          v-for="item in chartData"
          :key="item.log_date"
          class="flex flex-col items-center gap-2 h-full justify-end group"
        >
          <span class="text-[11px] font-mono font-bold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
            {{ item.count }}
          </span>
          <div
            class="w-full max-w-[36px] bg-gradient-to-t from-amber-600/40 to-amber-500 rounded-t-lg transition-all duration-300 group-hover:from-amber-500 group-hover:to-amber-400"
            :style="{ height: `${getBarHeight(item.count)}%` }"
          />
          <span class="text-[10px] text-stone-400 font-mono mt-1 whitespace-nowrap">
            {{ formatShortDate(item.log_date) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Top Paths & Top QR Scans (2 Columns) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top general paths -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5">
        <div class="flex items-center gap-2 mb-3">
          <Icon name="mdi:fire" class="w-4 h-4 text-amber-400" />
          <p class="text-xs font-bold uppercase tracking-wider text-stone-300">Các trang được xem nhiều nhất (Top 10)</p>
        </div>
        <div class="space-y-1.5">
          <div
            v-for="(p, idx) in topPaths"
            :key="p.path"
            class="flex items-center justify-between gap-3 px-3 py-2 bg-stone-950/60 border border-stone-800/80 rounded-xl text-xs"
          >
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <span class="text-[11px] text-stone-500 font-mono font-bold w-4">{{ idx + 1 }}.</span>
              <span class="text-stone-300 font-mono truncate">{{ p.path }}</span>
            </div>
            <span class="text-amber-400 font-bold tabular-nums px-2 py-0.5 bg-amber-500/10 rounded-md">
              {{ p.total.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Top QR Scanned Heritages -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5">
        <div class="flex items-center gap-2 mb-3">
          <Icon name="mdi:qrcode" class="w-4 h-4 text-emerald-400" />
          <p class="text-xs font-bold uppercase tracking-wider text-stone-300">Top Quét Mã QR Di Tích Thực Địa</p>
        </div>
        <div v-if="topQrPaths.length === 0" class="text-center py-10 text-stone-500 text-xs">
          Chưa có dữ liệu quét mã QR.
        </div>
        <div v-else class="space-y-1.5">
          <div
            v-for="(p, idx) in topQrPaths"
            :key="p.path"
            class="flex items-center justify-between gap-3 px-3 py-2 bg-stone-950/60 border border-stone-800/80 rounded-xl text-xs"
          >
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <span class="text-[11px] text-emerald-500 font-mono font-bold w-4">#{{ idx + 1 }}</span>
              <span class="text-stone-200 font-medium truncate">{{ formatHeritageQrName(p.path) }}</span>
            </div>
            <span class="text-emerald-400 font-bold tabular-nums px-2 py-0.5 bg-emerald-500/10 rounded-md">
              {{ p.total.toLocaleString() }} lượt quét
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Search Controls -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
      <!-- Timeframe and Type Toggle -->
      <div class="flex items-center gap-2 flex-wrap w-full sm:w-auto">
        <!-- Timeframe pills -->
        <div class="flex flex-wrap gap-1 bg-stone-900/90 border border-stone-800 rounded-2xl p-1">
          <button
            v-for="tf in timeframeOptions"
            :key="tf.value"
            class="px-2.5 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            :class="selectedTimeframe === tf.value
              ? 'bg-stone-800 text-amber-400 font-semibold'
              : 'text-stone-400 hover:text-stone-200'"
            @click="setTimeframe(tf.value)"
          >
            {{ tf.label }}
          </button>
        </div>

        <!-- QR filter toggle -->
        <button
          class="px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer inline-flex items-center gap-1.5"
          :class="selectedType === 'qr'
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 font-semibold'
            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'"
          @click="toggleQrFilter"
        >
          <Icon name="mdi:qrcode-scan" class="w-3.5 h-3.5" />
          {{ selectedType === 'qr' ? 'Đang lọc: Chỉ quét QR' : 'Chỉ xem Quét mã QR' }}
        </button>
      </div>

      <!-- Search Input -->
      <div class="relative w-full sm:w-80">
        <Icon name="mdi:magnify" class="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Lọc theo IP, URL, email..."
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

    <!-- Table Container -->
    <div class="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-sm">
      <div v-if="loading && !visitors.length" class="flex flex-col items-center justify-center py-20">
        <Icon name="mdi:loading" class="w-8 h-8 text-amber-500 animate-spin mb-2" />
        <p class="text-stone-500 text-xs">Đang tải nhật ký truy cập...</p>
      </div>
      <div v-else-if="!visitors.length" class="text-center py-20">
        <Icon name="mdi:account-eye-outline" class="w-12 h-12 text-stone-700 mx-auto mb-2" />
        <p class="text-stone-300 text-sm font-semibold">Chưa có dữ liệu truy cập nào phù hợp.</p>
        <p class="text-stone-500 text-xs mt-1">Thử chọn khoảng thời gian khác hoặc xóa từ khóa tìm kiếm.</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-stone-800 text-stone-500 uppercase tracking-wider bg-stone-950/40">
              <th class="text-left px-5 py-3.5 font-semibold">Địa chỉ IP</th>
              <th class="text-left px-5 py-3.5 font-semibold">Tài khoản (nếu có)</th>
              <th class="text-left px-5 py-3.5 font-semibold">Trang truy cập (Path)</th>
              <th class="text-right px-5 py-3.5 font-semibold">Số lượt</th>
              <th class="text-right px-5 py-3.5 font-semibold">Lần cuối xem</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-800/60">
            <tr
              v-for="v in visitors"
              :key="v.id"
              class="hover:bg-stone-800/30 transition-colors"
            >
              <td class="px-5 py-3 font-mono text-stone-300 font-medium">{{ v.ip }}</td>
              <td class="px-5 py-3 text-stone-400 max-w-[180px] truncate">
                <div v-if="v.email" class="flex items-center gap-1.5">
                  <Icon name="mdi:account-check" class="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span class="text-stone-200 truncate">{{ v.display_name || v.email }}</span>
                </div>
                <span v-else class="text-stone-600 italic">Khách vãng lai</span>
              </td>
              <td class="px-5 py-3 font-mono text-amber-400/90 max-w-[240px] truncate">
                <span v-if="v.path.startsWith('/heritage/qr/')" class="inline-flex items-center gap-1 text-emerald-400">
                  <Icon name="mdi:qrcode" class="w-3.5 h-3.5 shrink-0" />
                  {{ formatHeritageQrName(v.path) }}
                </span>
                <span v-else>{{ v.path }}</span>
              </td>
              <td class="px-5 py-3 text-right text-stone-200 font-bold tabular-nums">
                {{ v.visit_count }}
              </td>
              <td class="px-5 py-3 text-right text-stone-500 whitespace-nowrap font-mono text-[11px]">
                {{ formatDate(v.last_seen_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="px-5 py-3 border-t border-stone-800 flex items-center justify-between gap-4 flex-wrap bg-stone-950/40">
        <span class="text-xs text-stone-500">
          Trang {{ currentPage }} / {{ totalPages }} (Tổng {{ filteredTotal }} bản ghi)
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
  </div>
</template>

<script setup lang="ts">
import { HERITAGES } from '~/data/heritages'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: 'Nhật ký Truy cập & Mã QR — Admin Di Sản Bù Đăng',
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
interface ChartItem { log_date: string; count: number }

const { getIdToken } = useAuth()
const toast = useToast()

const visitors = ref<VisitorRow[]>([])
const stats = ref({
  unique_ips: 0,
  total_visits: 0,
  unique_qr_ips: 0,
  total_qr_scans: 0,
})
const topPaths = ref<TopPath[]>([])
const topQrPaths = ref<TopPath[]>([])
const chartData = ref<ChartItem[]>([])
const loading = ref(false)
const searchQuery = ref('')
const selectedTimeframe = ref<'all' | 'today' | '7days' | '30days'>('all')
const selectedType = ref<'all' | 'qr'>('all')

// Pagination
const currentPage = ref(1)
const pageSize = 50
const filteredTotal = ref(0)
const totalPages = computed(() => Math.ceil(filteredTotal.value / pageSize) || 1)

const timeframeOptions = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Hôm nay', value: 'today' },
  { label: '7 ngày qua', value: '7days' },
  { label: '30 ngày qua', value: '30days' },
] as const

onMounted(() => {
  fetchVisitors()
})

async function fetchVisitors() {
  loading.value = true
  const token = await getIdToken()
  if (!token) return

  const offset = (currentPage.value - 1) * pageSize
  try {
    const data = await $fetch<{
      visitors: VisitorRow[]
      stats: {
        unique_ips: number
        total_visits: number
        unique_qr_ips: number
        total_qr_scans: number
      }
      top_paths: TopPath[]
      top_qr_paths: TopPath[]
      chart_data: ChartItem[]
      filteredTotal: number
    }>('/api/admin/visitors', {
      headers: { Authorization: `Bearer ${token}` },
      query: {
        timeframe: selectedTimeframe.value,
        type: selectedType.value,
        search: searchQuery.value.trim() || undefined,
        limit: pageSize,
        offset,
      },
    })
    visitors.value = data.visitors
    stats.value = data.stats
    topPaths.value = data.top_paths
    topQrPaths.value = data.top_qr_paths
    chartData.value = data.chart_data
    filteredTotal.value = data.filteredTotal ?? data.visitors.length
  } catch (e) {
    console.error('[visitors] fetch error:', e)
    toast.error('Không thể tải nhật ký truy cập')
  } finally {
    loading.value = false
  }
}

function setTimeframe(tf: typeof selectedTimeframe.value) {
  selectedTimeframe.value = tf
  currentPage.value = 1
  fetchVisitors()
}

function toggleQrFilter() {
  selectedType.value = selectedType.value === 'qr' ? 'all' : 'qr'
  currentPage.value = 1
  fetchVisitors()
}

function handleSearch() {
  currentPage.value = 1
  fetchVisitors()
}

function changePage(p: number) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  fetchVisitors()
}

function getBarHeight(count: number): number {
  if (!chartData.value.length) return 10
  const max = Math.max(...chartData.value.map(c => c.count)) || 1
  return Math.max(12, Math.round((count / max) * 100))
}

function formatShortDate(dateStr: string): string {
  // YYYY-MM-DD
  const parts = dateStr.split('-')
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}`
  }
  return dateStr
}

function formatHeritageQrName(path: string): string {
  const slug = path.replace('/heritage/qr/', '').replace(/\/$/, '')
  const h = HERITAGES.find(item => item.id === slug)
  return h ? h.title : slug
}

function exportCsv() {
  if (visitors.value.length === 0) return

  const headers = ['ID', 'Dia Chi IP', 'Email', 'Ho Ten', 'Trang Truy Cap', 'So Luot Xem', 'Lan Dau Xem', 'Lan Cuoi Xem']
  const rows = visitors.value.map(v => [
    `"${v.id}"`,
    `"${v.ip}"`,
    `"${v.email || ''}"`,
    `"${(v.display_name || '').replace(/"/g, '""')}"`,
    `"${v.path}"`,
    v.visit_count,
    `"${v.first_seen_at}"`,
    `"${v.last_seen_at}"`,
  ])

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `nhat-ky-truy-cap-disanbudang-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toast.success('Đã xuất file CSV thành công')
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
</script>
