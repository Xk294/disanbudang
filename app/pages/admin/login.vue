<template>
  <div class="flex items-center justify-center min-h-screen bg-stone-950 px-4">
    <div class="w-full max-w-md mx-auto p-8 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl backdrop-blur-xl">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-3 group" title="Về trang chủ">
          <span class="text-amber-500 font-bold text-xs uppercase tracking-widest group-hover:text-amber-400 transition-colors">
            Di Sản Bù Đăng
          </span>
        </NuxtLink>
        <h1 class="text-2xl font-bold text-stone-100">Hệ Thống Quản Trị</h1>
        <p class="text-stone-400 text-xs mt-2 leading-relaxed">
          Khu vực bảo mật dành riêng cho Quản trị viên dự án.
        </p>
      </div>

      <!-- Admin Email Notice -->
      <div class="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
        <Icon name="mdi:shield-account" class="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
        <div class="leading-relaxed">
          <p class="font-semibold text-amber-200">Quyền truy cập giới hạn</p>
          <p class="text-amber-300/80 text-[11px] mt-0.5">
            Chỉ tài khoản Google quản trị (<strong class="text-amber-200">nguyenxuankiet294@gmail.com</strong>) mới có quyền truy cập.
          </p>
        </div>
      </div>

      <!-- Error message with friendly explanation -->
      <Transition name="fade">
        <div
          v-if="error"
          class="mb-6 px-4 py-3.5 rounded-2xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs flex items-start gap-2.5 shadow-lg"
        >
          <Icon name="mdi:alert-circle" class="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
          <div class="flex-1 leading-relaxed">
            <p class="font-semibold text-red-200">{{ error.title }}</p>
            <p class="text-red-300/90 text-[11px] mt-0.5">{{ error.description }}</p>
          </div>
        </div>
      </Transition>

      <!-- Sign-in button -->
      <button
        id="admin-google-signin"
        class="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white text-stone-900 font-semibold text-sm hover:bg-stone-100 active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        :disabled="loading"
        @click="handleSignIn"
      >
        <Icon v-if="loading" name="mdi:loading" class="w-5 h-5 animate-spin text-stone-800" />
        <template v-else>
          <svg viewBox="0 0 24 24" class="w-5 h-5" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Đăng nhập với Google</span>
        </template>
      </button>

      <!-- Back to website link -->
      <div class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-300 transition-colors"
        >
          <Icon name="mdi:arrow-left" class="w-4 h-4" />
          Quay lại trang chủ Di Sản Bù Đăng
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Đăng nhập Quản trị — Di Sản Bù Đăng',
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

interface FriendlyError {
  title: string
  description: string
}

const { user, authReady, isAdmin, initAuthListener, signInWithGoogle, signOut } = useAuth()
const loading = ref(false)
const error = ref<FriendlyError | null>(null)

onMounted(() => {
  initAuthListener()
})

function formatFirebaseError(rawError: string): FriendlyError {
  if (rawError.includes('auth/popup-closed-by-user')) {
    return {
      title: 'Cửa sổ đăng nhập đã bị đóng',
      description: 'Bạn đã đóng popup đăng nhập trước khi chọn tài khoản. Vui lòng bấm nút đăng nhập lại và chọn tài khoản Google của bạn.',
    }
  }
  if (rawError.includes('auth/popup-blocked')) {
    return {
      title: 'Trình duyệt đã chặn cửa sổ pop-up',
      description: 'Vui lòng cho phép mở pop-up trên trang này (ở thanh địa chỉ trình duyệt) rồi thử lại.',
    }
  }
  if (rawError.includes('auth/cancelled-popup-request')) {
    return {
      title: 'Yêu cầu đăng nhập bị hủy',
      description: 'Yêu cầu trước đó đã bị hủy do có phiên đăng nhập mới. Vui lòng thử lại.',
    }
  }
  if (rawError.includes('auth/unauthorized-domain')) {
    return {
      title: 'Tên miền chưa được cấp phép trong Firebase',
      description: 'Tên miền hiện tại cần được thêm vào danh sách Authorized Domains trên Firebase Console.',
    }
  }
  if (rawError.includes('auth/network-request-failed')) {
    return {
      title: 'Lỗi kết nối mạng',
      description: 'Không thể kết nối đến máy chủ Google. Vui lòng kiểm tra lại kết nối mạng.',
    }
  }
  return {
    title: 'Đăng nhập không thành công',
    description: rawError || 'Đã có lỗi xảy ra trong quá trình xác thực. Vui lòng thử lại.',
  }
}

// Redirect if already authenticated as admin
watch([authReady, user], ([ready, u]) => {
  if (!ready) return
  if (u && isAdmin.value) {
    navigateTo('/admin/contributions')
  } else if (u && !isAdmin.value) {
    // Signed in but not admin — sign out and show error
    const signedInEmail = u.email || 'tài khoản này'
    signOut().then(() => {
      error.value = {
        title: 'Tài khoản không có quyền quản trị',
        description: `Tài khoản Google (${signedInEmail}) không được cấp quyền Admin. Vui lòng đăng nhập bằng nguyenxuankiet294@gmail.com.`,
      }
    })
  }
}, { immediate: true })

async function handleSignIn() {
  loading.value = true
  error.value = null
  const result = await signInWithGoogle()
  if (!result.ok) {
    error.value = formatFirebaseError(result.error || '')
    loading.value = false
    return
  }
  if (user.value && isAdmin.value) {
    await navigateTo('/admin/contributions')
  }
  loading.value = false
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
