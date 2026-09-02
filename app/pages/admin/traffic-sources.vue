<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2 border-b border-stone-800">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-stone-100 tracking-tight">
          Traffic Sources
        </h1>
        <p class="text-stone-400 text-xs mt-1">
          Every inbound channel (UTM + referrer), full list, no cap.
        </p>
      </div>

      <!-- Right Action: Back to Overview -->
      <NuxtLink
        to="/admin/overview"
        class="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer shrink-0"
      >
        <Icon name="mdi:arrow-left" class="w-4 h-4" />
        <span>Back to Overview</span>
      </NuxtLink>
    </div>

    <!-- Controls Toolbar -->
    <div class="flex items-center gap-3 flex-wrap">
      <!-- Range Input & Apply Button -->
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
        <span class="text-stone-400 text-xs font-medium">Range</span>
        <input
          v-model.number="rangeInput"
          type="number"
          min="1"
          max="365"
          class="w-14 px-2 py-0.5 bg-stone-950 border border-stone-800 rounded-md text-stone-100 text-center font-mono text-xs focus:outline-none focus:border-indigo-500"
          @keyup.enter="applyRange"
        />
        <span class="text-stone-400 text-xs">days</span>
        <button
          type="button"
          class="ml-1 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
          :disabled="loading"
          @click="applyRange"
        >
          <span v-if="loading" class="flex items-center gap-1">
            <Icon name="mdi:loading" class="w-3.5 h-3.5 animate-spin" />
            <span>...</span>
          </span>
          <span v-else>Apply</span>
        </button>
      </div>
    </div>

    <!-- Main Card Container: SOURCES -->
    <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
      <!-- Card Header -->
      <div class="flex items-center justify-between border-b border-stone-800/80 pb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-stone-200">
          SOURCES
        </h2>
        <span class="text-xs font-mono text-stone-400">
          last {{ activeRange }}d • non-bot • {{ formatNumber(totalCount) }} total
        </span>
      </div>

      <!-- Inflation Warning Notice -->
      <div class="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800/80 text-[11px] text-stone-400 leading-relaxed flex items-start gap-2.5">
        <Icon name="mdi:alert" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong class="text-stone-200 font-semibold">direct</strong> is inflated — Zalo, Messenger and in-app browsers strip the referrer, so real channels land there. Read each row as that channel's floor, never as proof it is weak.
        </div>
      </div>

      <!-- Loading State Skeleton -->
      <div v-if="loading && sources.length === 0" class="space-y-3 py-6">
        <div v-for="i in 8" :key="i" class="flex items-center gap-3 animate-pulse">
          <div class="w-48 h-4 bg-stone-800/60 rounded" />
          <div class="flex-1 h-2.5 bg-stone-800/40 rounded-full" />
          <div class="w-12 h-4 bg-stone-800/60 rounded" />
          <div class="w-10 h-4 bg-stone-800/40 rounded" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading && sources.length === 0" class="text-center py-16 space-y-3">
        <Icon name="mdi:chart-timeline-variant-shimmer" class="w-10 h-10 text-stone-700 mx-auto" />
        <p class="text-stone-300 text-sm font-semibold">Không tìm thấy nguồn lưu lượng nào.</p>
        <p class="text-stone-500 text-xs">Thử chọn số ngày lớn hơn và nhấn Apply.</p>
        <div>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
            @click="fetchTrafficSources"
          >
            <Icon name="mdi:refresh" class="w-3.5 h-3.5 text-indigo-400" />
            <span>Tải lại</span>
          </button>
        </div>
      </div>

      <!-- Inbound Sources Full List (No Cap) -->
      <div v-else class="space-y-3 pt-1">
        <div
          v-for="item in sources"
          :key="item.source"
          class="flex items-center gap-3 text-xs py-0.5 group hover:bg-stone-800/20 px-1 rounded transition-colors"
        >
          <!-- Source Label -->
          <div
            class="w-44 sm:w-56 shrink-0 truncate font-mono text-stone-300 group-hover:text-stone-100 transition-colors"
            :title="item.source"
          >
            <span
              v-if="item.source.startsWith('UTM -')"
              class="text-indigo-300 font-semibold"
            >
              {{ item.source }}
            </span>
            <span v-else-if="item.source === 'direct'" class="text-amber-300 font-medium">
              {{ item.source }}
            </span>
            <span v-else>
              {{ item.source }}
            </span>
          </div>

          <!-- Horizontal Bar -->
          <div class="flex-1 bg-stone-950/70 h-2.5 rounded-full overflow-hidden border border-stone-800/60 p-0.2">
            <div
              class="bg-indigo-400 group-hover:bg-indigo-300 h-full rounded-full transition-all duration-500"
              :style="{ width: `${item.percentage}%` }"
            />
          </div>

          <!-- Count Number -->
          <div class="w-12 text-right font-mono font-bold text-stone-100 text-xs tabular-nums">
            {{ formatNumber(item.count) }}
          </div>

          <!-- Percentage -->
          <div class="w-10 text-right font-mono text-stone-400 text-xs tabular-nums">
            {{ item.percentage }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TrafficSourceItem {
  source: string
  count: number
  percentage: number
  type: 'utm' | 'referrer' | 'direct' | 'search' | 'social' | 'qr'
}

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: 'Traffic Sources — Admin Di Sản Bù Đăng',
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

const { getIdToken } = useAuth()
const toast = useToast()

const rangeInput = ref<number>(30)
const activeRange = ref<number>(30)
const loading = ref(false)
const totalCount = ref(0)
const sources = ref<TrafficSourceItem[]>([])

onMounted(() => {
  fetchTrafficSources()
})

async function fetchTrafficSources() {
  loading.value = true
  const token = await getIdToken()
  if (!token) {
    loading.value = false
    return
  }

  try {
    const res = await $fetch<{
      ok: boolean
      range: number
      total: number
      non_bot_total: number
      sources: TrafficSourceItem[]
    }>('/api/admin/traffic-sources', {
      headers: { Authorization: `Bearer ${token}` },
      query: {
        range: activeRange.value,
      },
    })

    if (res?.ok) {
      sources.value = res.sources || []
      totalCount.value = res.total || 0
      activeRange.value = res.range || activeRange.value
    }
  } catch (err) {
    console.error('[traffic-sources] fetch error:', err)
    toast.error('Không thể tải danh sách traffic sources')
  } finally {
    loading.value = false
  }
}

function applyRange() {
  const parsed = Math.max(1, Math.min(365, rangeInput.value || 30))
  rangeInput.value = parsed
  activeRange.value = parsed
  fetchTrafficSources()
}

function formatNumber(num: number): string {
  if (num === null || num === undefined) return '0'
  return num.toLocaleString('en-US')
}
</script>
