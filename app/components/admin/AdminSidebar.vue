<template>
  <aside class="w-64 min-h-screen flex flex-col bg-stone-900 border-r border-stone-800 shrink-0 select-none">
    <!-- Brand -->
    <div class="px-5 py-5 border-b border-stone-800">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Icon name="mdi:shield-crown" class="w-4 h-4" />
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-amber-500">Di Sản Bù Đăng</p>
          <p class="text-[10px] text-stone-500 font-medium">Bảng Điều Khiển Quản Trị</p>
        </div>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 p-3 space-y-1">
      <p class="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">
        Quản lý nội dung
      </p>

      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group"
        :class="isActive(link.to)
          ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/20'
          : 'text-stone-400 hover:bg-stone-800/80 hover:text-stone-100'"
        :aria-label="link.label"
      >
        <Icon
          :name="link.icon"
          class="w-4 h-4 shrink-0 transition-colors"
          :class="isActive(link.to) ? 'text-amber-400' : 'text-stone-500 group-hover:text-stone-300'"
        />
        <span class="flex-1">{{ link.label }}</span>
        <span
          v-if="link.badge && link.badge > 0"
          class="bg-amber-500 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full shadow-sm"
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
        >
          <Icon name="mdi:home-outline" class="w-4 h-4 text-stone-500" />
          <span>Về trang chủ Web</span>
          <Icon name="mdi:arrow-top-right" class="w-3.5 h-3.5 text-stone-600 ml-auto" />
        </NuxtLink>
        <NuxtLink
          to="/contribute"
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
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
const route = useRoute()
const { user, signOut } = useAuth()

// Pending count
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
    to: '/admin/visitors',
    label: 'Lưu Lượng Truy Cập',
    icon: 'mdi:account-eye',
    badge: 0,
  },
])

function isActive(to: string) {
  return route.path.startsWith(to)
}

async function handleSignOut() {
  await signOut()
  await navigateTo('/admin/login')
}
</script>
