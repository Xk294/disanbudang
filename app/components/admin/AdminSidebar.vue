<template>
  <aside class="w-64 h-full min-h-screen flex flex-col bg-stone-900 border-r border-stone-800 shrink-0 select-none">
    <!-- Brand & Mobile Close -->
    <div class="px-5 py-4 border-b border-stone-800 flex items-center justify-between">
      <NuxtLink to="/admin/contributions" class="flex items-center gap-2.5 group" @click="$emit('close')">
        <div class="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
          <Icon name="mdi:shield-crown" class="w-4 h-4" />
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-amber-500 group-hover:text-amber-400 transition-colors">
            Di Sản Bù Đăng
          </p>
          <p class="text-[10px] text-stone-500 font-medium">Bảng Điều Khiển Quản Trị</p>
        </div>
      </NuxtLink>

      <!-- Close button on mobile -->
      <button
        class="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
        aria-label="Đóng thanh điều hướng"
        @click="$emit('close')"
      >
        <Icon name="mdi:close" class="w-5 h-5" />
      </button>
    </div>

    <!-- Nav -->
    <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
      <p class="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">
        Quản lý nội dung
      </p>

      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group"
        :class="isActive(link.to)
          ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/20 shadow-sm'
          : 'text-stone-400 hover:bg-stone-800/80 hover:text-stone-100'"
        :aria-label="link.label"
        @click="$emit('close')"
      >
        <Icon
          :name="link.icon"
          class="w-4 h-4 shrink-0 transition-colors"
          :class="isActive(link.to) ? 'text-amber-400' : 'text-stone-500 group-hover:text-stone-300'"
        />
        <span class="flex-1">{{ link.label }}</span>
        <span
          v-if="link.badge && link.badge > 0"
          class="bg-amber-500 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full shadow-sm animate-pulse"
        >
          {{ link.badge > 99 ? '99+' : link.badge }}
        </span>
      </NuxtLink>

      <div class="pt-4">
        <p class="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">
          Điều hướng nhanh
        </p>
        <NuxtLink
          to="/"
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
          @click="$emit('close')"
        >
          <Icon name="mdi:home-outline" class="w-4 h-4 text-stone-500" />
          <span>Về trang chủ Web</span>
          <Icon name="mdi:arrow-top-right" class="w-3.5 h-3.5 text-stone-600 ml-auto" />
        </NuxtLink>
        <NuxtLink
          to="/contribute"
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
          @click="$emit('close')"
        >
          <Icon name="mdi:hand-heart-outline" class="w-4 h-4 text-stone-500" />
          <span>Trang Đóng góp cộng đồng</span>
          <Icon name="mdi:arrow-top-right" class="w-3.5 h-3.5 text-stone-600 ml-auto" />
        </NuxtLink>
      </div>
    </nav>

    <!-- User info + logout -->
    <div class="p-4 border-t border-stone-800 bg-stone-950/40">
      <div v-if="user" class="flex items-center gap-2.5 mb-3">
        <img
          v-if="user.photoURL"
          :src="user.photoURL"
          :alt="user.displayName ?? 'Admin'"
          class="w-8 h-8 rounded-full object-cover border border-stone-700"
        />
        <div v-else class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Icon name="mdi:account" class="w-4 h-4 text-amber-400" />
        </div>
        <div class="min-w-0">
          <p class="text-xs font-semibold text-stone-200 truncate">{{ user.displayName ?? 'Admin' }}</p>
          <p class="text-[10px] text-stone-500 truncate font-mono">{{ user.email }}</p>
        </div>
      </div>
      <button
        class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-stone-400 hover:bg-red-950/40 hover:text-red-400 border border-transparent hover:border-red-900/30 transition-colors cursor-pointer"
        aria-label="Sign out"
        @click="handleSignOut"
      >
        <Icon name="mdi:logout" class="w-3.5 h-3.5" />
        Đăng xuất
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()
const { user, isAdmin, getIdToken, signOut } = useAuth()

// Global pending count state
const pendingCount = useState<number>('admin.pending_count', () => 0)

const navLinks = computed(() => [
  {
    to: '/admin/contributions',
    label: 'Duyệt Đóng Góp',
    icon: 'mdi:inbox-multiple',
    badge: pendingCount.value,
  },
  {
    to: '/admin/ratings',
    label: 'Đánh Giá & Phản Hồi',
    icon: 'mdi:star-box-multiple',
    badge: 0,
  },
  {
    to: '/admin/users',
    label: 'Quản Lý Người Dùng',
    icon: 'mdi:account-group',
    badge: 0,
  },
  {
    to: '/admin/visitors',
    label: 'Lưu Lượng & Mã QR',
    icon: 'mdi:chart-timeline-variant',
    badge: 0,
  },
]
)

function isActive(to: string) {
  return route.path.startsWith(to)
}

// Fetch pending badge count on layout mount
onMounted(async () => {
  if (import.meta.client && isAdmin.value) {
    const token = await getIdToken()
    if (token) {
      try {
        const res = await $fetch<{ counts?: { pending?: number } }>('/api/admin/contributions?limit=1', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res?.counts?.pending !== undefined) {
          pendingCount.value = res.counts.pending
        }
      } catch {
        // Fallback silently if offline
      }
    }
  }
})

async function handleSignOut() {
  await signOut()
  await navigateTo('/admin/login')
}
</script>
