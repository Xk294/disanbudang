<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-800">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-stone-100">Quản Lý Người Dùng</h1>
        <p class="text-stone-400 text-xs mt-1">
          Theo dõi tài khoản đã đăng nhập bằng Google, tham gia đánh giá và đóng góp di sản.
        </p>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
          :disabled="loading"
          @click="fetchUsers"
        >
          <Icon :name="loading ? 'mdi:loading' : 'mdi:refresh'" :class="{ 'animate-spin': loading }" class="w-4 h-4 text-amber-500" />
          Làm mới
        </button>

        <button
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          :disabled="loading || users.length === 0"
          @click="exportCsv"
        >
          <Icon name="mdi:download" class="w-4 h-4" />
          Xuất CSV
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Tổng Người Dùng</p>
          <p class="text-3xl font-extrabold text-stone-100">{{ stats.total_users.toLocaleString() }}</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Icon name="mdi:account-group" class="w-6 h-6" />
        </div>
      </div>

      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Xác Thực Google</p>
          <p class="text-3xl font-extrabold text-amber-400">{{ stats.google_users.toLocaleString() }}</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
          <Icon name="mdi:google" class="w-6 h-6" />
        </div>
      </div>

      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-stone-500 text-xs uppercase tracking-wider mb-1">Hoạt Động 7 Ngày Qua</p>
          <p class="text-3xl font-extrabold text-emerald-400">{{ stats.active_7days.toLocaleString() }}</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Icon name="mdi:account-clock-outline" class="w-6 h-6" />
        </div>
      </div>
    </div>

    <!-- Filter & Search -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="relative w-full sm:w-96">
        <Icon name="mdi:magnify" class="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm theo tên, email, nhà cung cấp..."
          class="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 text-xs placeholder-stone-600 focus:outline-none focus:border-amber-500/50"
          @keyup.enter="applySearch"
        />
      </div>

      <button
        v-if="searchQuery"
        class="text-xs text-stone-500 hover:text-stone-300 transition-colors"
        @click="clearSearch"
      >
        Xóa tìm kiếm
      </button>
    </div>

    <!-- Users Table Container -->
    <div class="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-sm">
      <!-- Loading State -->
      <div v-if="loading && !users.length" class="flex flex-col items-center justify-center py-20">
        <Icon name="mdi:loading" class="w-8 h-8 text-amber-500 animate-spin mb-2" />
        <p class="text-stone-500 text-xs">Đang tải danh sách người dùng...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!users.length" class="text-center py-20">
        <Icon name="mdi:account-off-outline" class="w-12 h-12 text-stone-700 mx-auto mb-2" />
        <p class="text-stone-300 text-sm font-semibold">Chưa có người dùng nào.</p>
        <p class="text-stone-500 text-xs mt-1">
          {{ searchQuery ? 'Không tìm thấy kết quả phù hợp.' : 'Dữ liệu sẽ xuất hiện khi có người đăng nhập Google để đánh giá hoặc tương tác.' }}
        </p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-stone-800 text-stone-500 uppercase tracking-wider bg-stone-950/40">
              <th class="text-left px-5 py-3.5 font-semibold">Người Dùng</th>
              <th class="text-left px-5 py-3.5 font-semibold">Email</th>
              <th class="text-left px-5 py-3.5 font-semibold">Phương Thức</th>
              <th class="text-right px-5 py-3.5 font-semibold">Ngày Tạo</th>
              <th class="text-right px-5 py-3.5 font-semibold">Lần Cuối Hoạt Động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-800/60">
            <tr
              v-for="u in users"
              :key="u.uid"
              class="hover:bg-stone-800/30 transition-colors"
            >
              <!-- Avatar & Name -->
              <td class="px-5 py-3.5 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <img
                    v-if="u.photo_url"
                    :src="u.photo_url"
                    :alt="u.display_name ?? 'User'"
                    class="w-8 h-8 rounded-full object-cover border border-stone-700 shrink-0"
                    referrerpolicy="no-referrer"
                  />
                  <div v-else class="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 shrink-0">
                    <Icon name="mdi:account" class="w-4 h-4" />
                  </div>
                  <div class="min-w-0">
                    <p class="font-semibold text-stone-200 truncate">{{ u.display_name || 'Khách chưa đặt tên' }}</p>
                    <p class="text-[10px] text-stone-500 font-mono truncate">UID: {{ u.uid.slice(0, 10) }}...</p>
                  </div>
                </div>
              </td>

              <!-- Email -->
              <td class="px-5 py-3.5 font-mono text-stone-300 whitespace-nowrap">
                <div class="flex items-center gap-1.5">
                  <span>{{ u.email }}</span>
                  <Icon
                    v-if="u.email_verified"
                    name="mdi:check-decagram"
                    class="w-3.5 h-3.5 text-emerald-400 shrink-0"
                    title="Email đã xác thực"
                  />
                </div>
              </td>

              <!-- Provider -->
              <td class="px-5 py-3.5 whitespace-nowrap">
                <span
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                  :class="u.provider === 'google.com' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-stone-800 text-stone-400'"
                >
                  <Icon v-if="u.provider === 'google.com'" name="mdi:google" class="w-3 h-3" />
                  <span>{{ u.provider }}</span>
                </span>
              </td>

              <!-- Created At -->
              <td class="px-5 py-3.5 text-right text-stone-500 whitespace-nowrap font-mono text-[11px]">
                {{ formatDate(u.created_at) }}
              </td>

              <!-- Last Seen At -->
              <td class="px-5 py-3.5 text-right text-stone-400 whitespace-nowrap font-mono text-[11px]">
                {{ formatDate(u.last_seen_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="px-5 py-3 border-t border-stone-800 flex items-center justify-between gap-4 flex-wrap bg-stone-950/40">
        <span class="text-xs text-stone-500">
          Trang {{ currentPage }} / {{ totalPages }} (Tổng {{ filteredTotal }} người dùng)
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
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: 'Quản lý Người dùng — Admin Di Sản Bù Đăng',
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

interface UserRow {
  uid: string
  email: string
  display_name: string | null
  photo_url: string | null
  email_verified: number
  provider: string
  created_at: string
  last_seen_at: string
}

const { getIdToken } = useAuth()
const toast = useToast()

const users = ref<UserRow[]>([])
const stats = ref({
  total_users: 0,
  google_users: 0,
  active_7days: 0,
})
const loading = ref(false)
const searchQuery = ref('')
const activeSearch = ref('')

// Pagination
const currentPage = ref(1)
const pageSize = 50
const filteredTotal = ref(0)
const totalPages = computed(() => Math.ceil(filteredTotal.value / pageSize) || 1)

onMounted(() => {
  fetchUsers()
})

async function fetchUsers() {
  loading.value = true
  const token = await getIdToken()
  if (!token) return

  const offset = (currentPage.value - 1) * pageSize
  try {
    const data = await $fetch<{
      ok: boolean
      users: UserRow[]
      stats: { total_users: number; google_users: number; active_7days: number }
      filteredTotal: number
    }>('/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
      query: {
        search: activeSearch.value.trim() || undefined,
        limit: pageSize,
        offset,
      },
    })

    if (data.ok) {
      users.value = data.users
      stats.value = data.stats
      filteredTotal.value = data.filteredTotal
    }
  } catch (err) {
    console.error('[admin/users] fetch error:', err)
    toast.error('Không thể tải danh sách người dùng')
  } finally {
    loading.value = false
  }
}

function applySearch() {
  activeSearch.value = searchQuery.value
  currentPage.value = 1
  fetchUsers()
}

function clearSearch() {
  searchQuery.value = ''
  activeSearch.value = ''
  currentPage.value = 1
  fetchUsers()
}

function changePage(page: number) {
  currentPage.value = page
  fetchUsers()
}

function formatDate(iso: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function exportCsv() {
  if (!users.value.length) return
  const headers = ['UID', 'Tên hiển thị', 'Email', 'Đã xác minh', 'Nhà cung cấp', 'Ngày tham gia', 'Hoạt động cuối']
  const rows = users.value.map(u => [
    `"${u.uid}"`,
    `"${(u.display_name ?? '').replace(/"/g, '""')}"`,
    `"${u.email}"`,
    u.email_verified ? 'Có' : 'Không',
    `"${u.provider}"`,
    `"${u.created_at}"`,
    `"${u.last_seen_at}"`,
  ])

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `nguoi-dung-disanbudang-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
</script>
