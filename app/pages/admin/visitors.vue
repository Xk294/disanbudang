<template>
  <div class="p-6 lg:p-8">
    <!-- Header + stats -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-stone-100">Visitors</h1>
        <p class="text-stone-500 text-sm mt-0.5">Page visit log by IP</p>
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm transition-colors"
        :disabled="loading"
        @click="fetchVisitors"
      >
        <Icon :name="loading ? 'mdi:loading' : 'mdi:refresh'" :class="{ 'animate-spin': loading }" class="w-4 h-4" />
        Refresh
      </button>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-stone-900 border border-stone-800 rounded-2xl p-5">
        <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Unique IPs</p>
        <p class="text-3xl font-bold text-amber-400">{{ stats.unique_ips.toLocaleString() }}</p>
      </div>
      <div class="bg-stone-900 border border-stone-800 rounded-2xl p-5">
        <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Total Visits</p>
        <p class="text-3xl font-bold text-amber-400">{{ stats.total_visits.toLocaleString() }}</p>
      </div>
    </div>

    <!-- Top paths -->
    <div v-if="topPaths.length" class="bg-stone-900 border border-stone-800 rounded-2xl p-5 mb-6">
      <p class="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">Top pages</p>
      <div class="space-y-2">
        <div v-for="p in topPaths" :key="p.path" class="flex items-center gap-3">
          <span class="text-stone-400 text-xs font-mono truncate flex-1">{{ p.path }}</span>
          <span class="text-amber-400 text-xs font-bold tabular-nums">{{ p.total.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
      <div v-if="loading && !visitors.length" class="flex justify-center py-16">
        <Icon name="mdi:loading" class="w-8 h-8 text-amber-500 animate-spin" />
      </div>
      <div v-else-if="!visitors.length" class="text-center py-16">
        <Icon name="mdi:account-eye-outline" class="w-10 h-10 text-stone-700 mx-auto mb-2" />
        <p class="text-stone-500 text-sm">No visitor data yet.</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-stone-800 text-stone-500 uppercase tracking-wider">
              <th class="text-left px-4 py-3 font-semibold">IP</th>
              <th class="text-left px-4 py-3 font-semibold">Email</th>
              <th class="text-left px-4 py-3 font-semibold">Name</th>
              <th class="text-left px-4 py-3 font-semibold">Path</th>
              <th class="text-right px-4 py-3 font-semibold">Visits</th>
              <th class="text-right px-4 py-3 font-semibold">Last seen</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="v in visitors"
              :key="v.id"
              class="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors"
            >
              <td class="px-4 py-3 font-mono text-stone-400">{{ v.ip }}</td>
              <td class="px-4 py-3 text-stone-400 max-w-[140px] truncate">{{ v.email ?? '—' }}</td>
              <td class="px-4 py-3 text-stone-300 max-w-[120px] truncate">{{ v.display_name ?? '—' }}</td>
              <td class="px-4 py-3 font-mono text-stone-400 max-w-[160px] truncate">{{ v.path }}</td>
              <td class="px-4 py-3 text-right text-amber-400 font-bold tabular-nums">{{ v.visit_count }}</td>
              <td class="px-4 py-3 text-right text-stone-500 whitespace-nowrap">{{ formatDate(v.last_seen_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ meta: [{ name: 'robots', content: 'noindex,nofollow' }] })

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

onMounted(() => {
  initAuthListener()
})

watch(authReady, (ready) => {
  if (!ready) return
  if (!isAdmin.value) navigateTo('/admin/login')
  else fetchVisitors()
}, { immediate: true })

onUnmounted(() => { /* no persistent listeners — nothing to clean up */ })

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}
</script>
