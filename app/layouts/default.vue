<template>
  <div class="min-h-screen flex flex-col bg-charcoal-900 transition-colors duration-500">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-gold-500 focus:text-charcoal-950 focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold-300">Bỏ qua điều hướng đến nội dung chính</a>
    <AppTopNav />
    <main
      id="main-content"
      tabindex="-1"
      class="flex-1 focus:outline-none"
      :class="isHeroPage ? '' : 'pt-[72px]'"
    >
      <Breadcrumb />
      <slot />
    </main>
    <AppFooter />
    <!-- Mini Audio Player -->
    <AudioMiniPlayer />
    <!-- Page loading bar -->
    <NuxtLoadingIndicator color="#C7A664" :height="2" />
    <!-- Global Quiz Player -->
    <QuizPlayModal />
    <!-- Scroll To Top button -->
    <ScrollToTop />
    <!-- Global Zero-API Heritage Docent Chat -->
    <HeritageDocentChat />
    <!-- Global Floating Auth Button (Bottom Left, symmetrical to HeritageDocentChat) -->
    <FloatingAuthButton />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isHeroPage = computed(() => route.path === '/' || route.path === '/about')

// Scroll reveal on route change
const { observeAll } = useScrollReveal()
watch(
  () => route.path,
  () => nextTick(() => observeAll()),
)

// Auth listener & Visitor tracking — client-only
const { initAuthListener } = useAuth()
onMounted(() => {
  initAuthListener()
  useVisitorTrack()
})
</script>


