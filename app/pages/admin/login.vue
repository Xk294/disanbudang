<template>
  <div class="flex items-center justify-center min-h-screen bg-stone-950">
    <div class="w-full max-w-sm mx-auto p-8">
      <!-- Logo -->
      <div class="text-center mb-8">
        <p class="text-amber-500 font-bold text-xs uppercase tracking-widest mb-1">Di Sản Bù Đăng</p>
        <h1 class="text-2xl font-bold text-stone-100">Admin Login</h1>
        <p class="text-stone-500 text-sm mt-2">Access restricted to authorized administrators.</p>
      </div>

      <!-- Error -->
      <div v-if="error" class="mb-4 px-4 py-3 rounded-xl bg-red-950/50 border border-red-800/50 text-red-300 text-sm flex items-center gap-2">
        <Icon name="mdi:alert-circle" class="w-4 h-4 shrink-0" />
        {{ error }}
      </div>

      <!-- Sign-in button -->
      <button
        id="admin-google-signin"
        class="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white text-stone-800 font-semibold text-sm hover:bg-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading"
        @click="handleSignIn"
      >
        <Icon v-if="loading" name="mdi:loading" class="w-5 h-5 animate-spin" />
        <svg v-else viewBox="0 0 24 24" class="w-5 h-5" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {{ loading ? 'Signing in…' : 'Continue with Google' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

useHead({ meta: [{ name: 'robots', content: 'noindex,nofollow' }] })

const { user, authReady, isAdmin, initAuthListener, signInWithGoogle, signOut } = useAuth()
const loading = ref(false)
const error = ref('')

onMounted(() => {
  initAuthListener()
})

// Redirect if already authenticated as admin
watch(authReady, (ready) => {
  if (!ready) return
  if (user.value && isAdmin.value) {
    navigateTo('/admin/contributions')
  } else if (user.value && !isAdmin.value) {
    // Signed in but not admin — sign out and show error
    signOut().then(() => {
      error.value = 'This Google account is not authorized as admin.'
    })
  }
}, { immediate: true })

async function handleSignIn() {
  loading.value = true
  error.value = ''
  const result = await signInWithGoogle()
  if (!result.ok) {
    error.value = result.error || 'Sign-in failed. Please try again.'
    loading.value = false
    return
  }
  // Auth state change → watcher handles redirect or error
  loading.value = false
}
</script>
