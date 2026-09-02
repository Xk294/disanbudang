<template>
  <div class="min-h-screen bg-charcoal-900">
    <div class="max-w-2xl mx-auto px-4 py-12">

      <!-- Loading state while Firebase restores session -->
      <div v-if="!authReady" class="flex justify-center py-20">
        <Icon name="mdi:loading" class="w-8 h-8 text-gold-400 animate-spin" />
      </div>

      <!-- Not logged in -->
      <div v-else-if="!user" class="text-center py-16">
        <div class="w-20 h-20 rounded-full bg-charcoal-800 border border-charcoal-700 flex items-center justify-center mx-auto mb-6">
          <Icon name="mdi:account-outline" class="w-10 h-10 text-charcoal-500" />
        </div>
        <h1 class="font-heading text-2xl font-bold text-ivory mb-2">Hồ Sơ Cá Nhân</h1>
        <p class="text-charcoal-400 text-sm mb-8 max-w-xs mx-auto">
          Đăng nhập để theo dõi lịch sử đóng góp và nhận huy hiệu tôn vinh.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="me-google-signin"
            class="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white text-stone-800 font-semibold text-sm hover:bg-stone-100 transition-colors disabled:opacity-50 w-full sm:w-auto cursor-pointer"
            :disabled="signingIn"
            @click="handleSignIn"
          >
            <Icon v-if="signingIn" name="mdi:loading" class="w-5 h-5 animate-spin" />
            <svg v-else viewBox="0 0 24 24" class="w-5 h-5" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {{ signingIn ? 'Đang đăng nhập…' : 'Đăng nhập với Google' }}
          </button>
        </div>
        <p v-if="signInError" class="mt-3 text-red-400 text-xs">{{ signInError }}</p>
      </div>


      <!-- Logged in -->
      <div v-else>
        <h1 class="font-heading text-2xl font-bold text-ivory mb-6">Hồ Sơ Cá Nhân</h1>
        <!-- Profile card -->
        <div class="bg-charcoal-950/60 border border-charcoal-850 rounded-3xl p-8 mb-6 flex items-center gap-6">
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            :alt="user.displayName ?? 'Avatar'"
            class="w-20 h-20 rounded-full object-cover border-2 border-gold-500/40 shrink-0"
          />
          <div v-else class="w-20 h-20 rounded-full bg-charcoal-800 border-2 border-charcoal-700 flex items-center justify-center shrink-0">
            <Icon name="mdi:account" class="w-10 h-10 text-charcoal-400" />
          </div>
          <div class="min-w-0">
            <h2 class="font-heading text-xl font-bold text-ivory truncate">{{ user.displayName ?? 'Người dùng' }}</h2>
            <p class="text-charcoal-400 text-sm truncate mt-0.5">{{ user.email }}</p>
            <p v-if="user.emailVerified" class="inline-flex items-center gap-1 text-green-400 text-xs mt-2">
              <Icon name="mdi:check-circle" class="w-3.5 h-3.5" />
              Email đã xác minh
            </p>
          </div>
        </div>

        <!-- Admin button — visible ONLY if email matches admin email -->
        <NuxtLink
          v-if="isAdmin"
          to="/admin"
          id="me-admin-panel-link"
          class="flex items-center gap-3 w-full px-6 py-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors mb-4 group"
        >
          <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
            <Icon name="mdi:shield-crown" class="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p class="font-semibold text-amber-300 text-sm">Admin Panel</p>
            <p class="text-amber-500/70 text-xs">Quản lý đóng góp & thống kê</p>
          </div>
          <Icon name="mdi:chevron-right" class="w-5 h-5 text-amber-500/50 ml-auto group-hover:translate-x-0.5 transition-transform" />
        </NuxtLink>

        <!-- Sign out -->
        <button
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-charcoal-400 hover:text-red-400 hover:bg-red-950/20 text-sm transition-colors"
          @click="handleSignOut"
        >
          <Icon name="mdi:logout" class="w-4 h-4" />
          Đăng xuất
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useMuseumSeo({ title: 'Hồ Sơ Của Tôi', description: 'Hồ sơ người dùng Di Sản Bù Đăng.' })

const { user, authReady, isAdmin, initAuthListener, signInWithGoogle, signOut, syncUserToDb } = useAuth()
const signingIn = ref(false)
const signInError = ref('')

onMounted(() => {
  initAuthListener()
})

// Sync user to D1 whenever auth state resolves and user is logged in
watch(user, async (u) => {
  if (u) await syncUserToDb()
})

async function handleSignIn() {
  signingIn.value = true
  signInError.value = ''
  const result = await signInWithGoogle()
  if (!result.ok) {
    signInError.value = result.error || 'Đăng nhập thất bại. Vui lòng thử lại.'
  }
  signingIn.value = false
}

async function handleSignOut() {
  await signOut()
}
</script>

