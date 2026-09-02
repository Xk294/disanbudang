<template>
  <div class="floating-auth-root hidden sm:block fixed bottom-6 left-6 z-[900]">
    <!-- Popover Menu when Logged In -->
    <Transition name="auth-popover">
      <div
        v-if="user && isOpen"
        ref="popoverRef"
        class="absolute bottom-full left-0 mb-3 w-[280px] sm:w-[320px] bg-charcoal-950/98 backdrop-blur-2xl border border-gold-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-black/90 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Tài khoản cá nhân"
      >
        <!-- User Info Header -->
        <div class="flex items-center gap-3 pb-3.5 border-b border-charcoal-800">
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            :alt="user.displayName ?? 'Avatar'"
            class="w-11 h-11 rounded-full object-cover border-2 border-gold-500/50 shrink-0"
            referrerpolicy="no-referrer"
          />
          <div v-else class="w-11 h-11 rounded-full bg-gold-500/20 border-2 border-gold-500/50 flex items-center justify-center text-gold-400 font-bold shrink-0">
            {{ (user.displayName || user.email || 'U').charAt(0).toUpperCase() }}
          </div>
          <div class="min-w-0 flex-1">
            <h4 class="font-heading font-bold text-sm text-ivory truncate">{{ user.displayName || 'Thành viên Di Sản' }}</h4>
            <p class="text-[11px] text-charcoal-400 truncate mt-0.5">{{ user.email }}</p>
            <span class="inline-flex items-center gap-1 text-[9px] font-medium text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full mt-1 border border-gold-500/25">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Đã đăng nhập
            </span>
          </div>
        </div>

        <!-- Quick Navigation Links -->
        <div class="py-2 space-y-1">
          <NuxtLink
            to="/me"
            class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-charcoal-200 hover:text-gold-300 hover:bg-gold-500/10 transition-colors"
            @click="isOpen = false"
          >
            <Icon name="mdi:account-circle-outline" class="w-4 h-4 text-gold-400" />
            <span>Hồ sơ cá nhân & Huy hiệu</span>
          </NuxtLink>
          <NuxtLink
            v-if="isAdmin"
            to="/admin"
            class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-amber-300 hover:bg-amber-500/15 transition-colors"
            @click="isOpen = false"
          >
            <Icon name="mdi:shield-crown" class="w-4 h-4 text-amber-400" />
            <span>Admin Panel</span>
          </NuxtLink>
          <NuxtLink
            to="/contribute"
            class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-charcoal-200 hover:text-gold-300 hover:bg-gold-500/10 transition-colors"
            @click="isOpen = false"
          >
            <Icon name="mdi:hand-heart-outline" class="w-4 h-4 text-gold-400" />
            <span>Đóng góp di sản</span>
          </NuxtLink>
        </div>

        <!-- Sign out button -->
        <div class="pt-2 border-t border-charcoal-800">
          <button
            type="button"
            class="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs text-charcoal-400 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
            @click="handleSignOut"
          >
            <Icon name="mdi:logout" class="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Launcher Floating Button — State 1: When NOT logged in -->
    <button
      v-if="!user"
      type="button"
      class="auth-launcher group flex items-center gap-2.5 px-4 py-3 rounded-full bg-charcoal-950/95 hover:bg-charcoal-900 text-ivory font-heading font-bold text-xs uppercase tracking-wider shadow-2xl shadow-black/80 hover:scale-105 active:scale-95 transition-all duration-300 border border-gold-500/40 hover:border-gold-300 backdrop-blur-xl cursor-pointer disabled:opacity-60"
      :disabled="signingIn"
      aria-label="Đăng nhập bằng Google"
      title="Đăng nhập với Google"
      @click="handleSignIn"
    >
      <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
        <Icon v-if="signingIn" name="mdi:loading" class="w-3.5 h-3.5 animate-spin text-charcoal-900" />
        <svg v-else viewBox="0 0 24 24" class="w-3.5 h-3.5" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
      <span class="hidden sm:inline">{{ signingIn ? 'Đang vào…' : 'Đăng Nhập' }}</span>
      <span class="sm:hidden">{{ signingIn ? '...' : 'Google' }}</span>
    </button>

    <!-- Launcher Floating Button — State 2: When LOGGED IN -->
    <button
      v-else
      type="button"
      class="auth-launcher group flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-charcoal-950/95 hover:bg-charcoal-900 text-ivory font-heading font-bold text-xs uppercase tracking-wider shadow-2xl shadow-black/80 hover:scale-105 active:scale-95 transition-all duration-300 border border-gold-500/50 hover:border-gold-300 backdrop-blur-xl cursor-pointer"
      :aria-expanded="isOpen"
      aria-label="Mở menu tài khoản"
      title="Tài khoản cá nhân"
      @click.stop="isOpen = !isOpen"
    >
      <img
        v-if="user.photoURL"
        :src="user.photoURL"
        :alt="user.displayName ?? 'Avatar'"
        class="w-6 h-6 rounded-full object-cover border border-gold-400 shrink-0"
        referrerpolicy="no-referrer"
      />
      <div v-else class="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400 text-[10px] font-bold shrink-0">
        {{ (user.displayName || user.email || 'U').charAt(0).toUpperCase() }}
      </div>
      <span class="hidden sm:inline max-w-[110px] truncate text-gold-300 font-semibold">{{ user.displayName || 'Hồ Sơ' }}</span>
      <span class="sm:hidden text-gold-300 font-semibold">{{ user.displayName?.split(' ').pop() || 'Hồ Sơ' }}</span>
      <Icon name="mdi:chevron-up" class="w-4 h-4 text-gold-400/80 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
    </button>
  </div>
</template>

<script setup lang="ts">
const { user, isAdmin, signInWithGoogle, signOut, syncUserToDb } = useAuth()
const signingIn = ref(false)
const isOpen = ref(false)
const popoverRef = ref<HTMLElement | null>(null)
const route = useRoute()

const isInAppBrowser = ref(false)

if (import.meta.client) {
  const ua = navigator.userAgent || navigator.vendor || ''
  isInAppBrowser.value = /FBAN|FBAV|FB_IAB|FB4A|Instagram|Line|Kakaotalk|Twitter|ByteLocale|TikTok|Zalo|Snapchat|MicroMessenger/i.test(ua)
}

async function handleSignIn() {
  signingIn.value = true
  try {
    const res = await signInWithGoogle()
    if (res.ok) {
      await syncUserToDb()
    } else {
      const swal = (await import('sweetalert2')).default
      if (isInAppBrowser.value || res.error?.toLowerCase().includes('popup') || res.error?.toLowerCase().includes('disallowed')) {
        await swal.fire({
          title: 'Mở bằng trình duyệt ngoài',
          text: 'Trình duyệt ứng dụng (Zalo/Facebook) chặn xác thực Google. Vui lòng bấm dấu ba chấm (•••) ở góc trên màn hình và chọn "Mở bằng trình duyệt" (Safari / Chrome).',
          icon: 'info',
          confirmButtonText: 'Đã hiểu',
          confirmButtonColor: '#e18c1b',
          background: '#1c1917',
          color: '#FAF8F5',
        })
      } else {
        await swal.fire({
          title: 'Đăng nhập chưa hoàn tất',
          text: res.error || 'Không thể kết nối với dịch vụ xác thực Google. Vui lòng thử lại.',
          icon: 'warning',
          confirmButtonText: 'Đóng',
          confirmButtonColor: '#e18c1b',
          background: '#1c1917',
          color: '#FAF8F5',
        })
      }
    }
  } catch (err) {
    console.error('[FloatingAuth] Sign-in error:', err)
  } finally {
    signingIn.value = false
  }
}

async function handleSignOut() {
  await signOut()
  isOpen.value = false
}

// Close popover on route change
watch(() => route.path, () => {
  isOpen.value = false
})

if (import.meta.client) {
  useEventListener(window, 'click', (e: MouseEvent) => {
    if (isOpen.value && popoverRef.value && !popoverRef.value.contains(e.target as Node)) {
      isOpen.value = false
    }
  })

  useEventListener(window, 'keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      isOpen.value = false
    }
  })
}
</script>

<style scoped>
.auth-popover-enter-active,
.auth-popover-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.auth-popover-enter-from,
.auth-popover-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
</style>
