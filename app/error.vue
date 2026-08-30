<template>
  <div class="min-h-screen bg-charcoal-900 text-ivory flex flex-col">
    <!-- Same header as main site -->
    <AppTopNav />

    <main class="flex-1 flex items-center justify-center px-4 py-16">
      <div class="text-center max-w-lg">
        <!-- Heritage icon -->
        <div class="relative mb-8 mx-auto w-28 h-28">
          <div class="absolute inset-0 bg-gold-500/10 rounded-full blur-2xl" />
          <div class="relative w-28 h-28 rounded-full bg-charcoal-950 border border-charcoal-800 flex items-center justify-center">
            <Icon name="mdi:compass-off-outline" class="w-14 h-14 text-gold-500/70" />
          </div>
        </div>

        <h1 class="font-heading font-bold text-6xl md:text-7xl text-gold-500 mb-4">
          {{ error?.statusCode || 404 }}
        </h1>
        <p class="text-2xl text-ivory font-heading font-semibold mb-3">
          Trang này chưa được khai phá
        </p>
        <p class="text-charcoal-400 text-base leading-relaxed mb-8 max-w-sm mx-auto">
          Có thể di sản này vẫn đang chờ được số hóa, hoặc đường dẫn không còn tồn tại. Hãy quay lại trang chủ để tiếp tục hành trình khám phá.
        </p>

        <!-- One single useful CTA -->
        <div class="flex justify-center">
          <button
            @click="handleClearError('/')"
            class="btn-primary text-sm px-8 py-3.5 cursor-pointer inline-flex items-center gap-2 shadow-gold/20 shadow-lg hover:shadow-gold/40 transition-all duration-300 hover:scale-105"
          >
            <Icon name="mdi:home-outline" class="w-5 h-5" />
            Về Trang Chủ
          </button>
        </div>

        <!-- Decorative quote -->
        <div class="mt-12 pt-8 border-t border-charcoal-850 max-w-sm mx-auto">
          <p class="text-charcoal-500 text-xs italic font-accent">
            "Không phải mọi con đường đều đã được vẽ trên bản đồ - có những vùng đất chỉ có thể tìm thấy bằng trái tim."
          </p>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error?: NuxtError
}>()

useHead({
  htmlAttrs: { lang: 'vi' },
})

useSeoMeta({
  title: '404 - Không Tìm Thấy Trang - Di Sản Bù Đăng',
  description: 'Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển. Hãy quay lại trang chủ để khám phá di sản địa phương.',
})

function handleClearError(redirectPath: string = '/') {
  clearError({ redirect: redirectPath })
}
</script>
