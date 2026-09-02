<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-stone-950 text-stone-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200">
    <!-- Mobile Top Navigation Bar (< lg) -->
    <header class="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-stone-900/95 border-b border-stone-800 backdrop-blur-md">
      <NuxtLink to="/admin/overview" class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Icon name="mdi:shield-crown" class="w-4 h-4" />
        </div>
        <span class="text-xs font-bold uppercase tracking-wider text-amber-500">Di Sản Bù Đăng</span>
      </NuxtLink>

      <div class="flex items-center gap-2">
        <NuxtLink
          v-if="pendingCount > 0"
          to="/admin/contributions"
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-stone-950 shadow-sm animate-pulse"
        >
          <Icon name="mdi:bell-ring-outline" class="w-3.5 h-3.5" />
          {{ pendingCount }}
        </NuxtLink>
        <button
          class="p-2 rounded-xl bg-stone-800 text-stone-300 hover:text-stone-100 hover:bg-stone-700 transition-colors cursor-pointer"
          aria-label="Mở menu quản trị"
          @click="mobileDrawerOpen = true"
        >
          <Icon name="mdi:menu" class="w-5 h-5" />
        </button>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <Teleport to="body">
      <Transition name="drawer-fade">
        <div
          v-if="mobileDrawerOpen"
          class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
          @click="mobileDrawerOpen = false"
        />
      </Transition>
      <Transition name="drawer-slide">
        <div
          v-if="mobileDrawerOpen"
          class="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] shadow-2xl lg:hidden flex"
        >
          <AdminSidebar @close="mobileDrawerOpen = false" />
        </div>
      </Transition>
    </Teleport>

    <!-- Desktop Persistent Sidebar (>= lg) -->
    <div class="hidden lg:block shrink-0 sticky top-0 h-screen">
      <AdminSidebar />
    </div>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-x-hidden min-h-[calc(100vh-57px)] lg:min-h-screen flex flex-col">
      <slot />
    </main>

    <!-- Global Toast Notification Layer -->
    <div
      class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
    >
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start gap-3 transition-all duration-300"
          :class="getToastClass(t.type)"
        >
          <Icon :name="getToastIcon(t.type)" class="w-5 h-5 shrink-0 mt-0.5" />
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-stone-100 leading-snug">{{ t.title }}</p>
            <p v-if="t.message" class="text-[11px] text-stone-300/90 mt-0.5 leading-relaxed break-words">
              {{ t.message }}
            </p>
          </div>
          <button
            class="text-stone-400 hover:text-stone-100 p-0.5 transition-colors cursor-pointer"
            aria-label="Đóng thông báo"
            @click="removeToast(t.id)"
          >
            <Icon name="mdi:close" class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
const mobileDrawerOpen = ref(false)
const route = useRoute()

// Auto-close mobile drawer on route change
watch(() => route.fullPath, () => {
  mobileDrawerOpen.value = false
})

const pendingCount = useState<number>('admin.pending_count', () => 0)
const { toasts, remove: removeToast } = useToast()

function getToastClass(type: string) {
  switch (type) {
    case 'success':
      return 'bg-emerald-950/90 border-emerald-700/60 text-emerald-400'
    case 'error':
      return 'bg-rose-950/90 border-rose-700/60 text-rose-400'
    case 'warning':
      return 'bg-amber-950/90 border-amber-700/60 text-amber-400'
    default:
      return 'bg-stone-900/90 border-stone-700 text-stone-300'
  }
}

function getToastIcon(type: string) {
  switch (type) {
    case 'success':
      return 'mdi:check-circle-outline'
    case 'error':
      return 'mdi:alert-circle-outline'
    case 'warning':
      return 'mdi:alert-outline'
    default:
      return 'mdi:information-outline'
  }
}
</script>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(-100%);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}
</style>
