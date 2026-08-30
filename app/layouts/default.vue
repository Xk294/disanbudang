<template>
  <div class="min-h-screen flex flex-col bg-charcoal-900 transition-colors duration-500">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-charcoal-950 focus:font-bold focus:rounded-lg">Bỏ qua điều hướng</a>
    <AppTopNav />
    <main
      id="main-content"
      class="flex-1"
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

// Visitor tracking — client-only, fire-and-forget
onMounted(() => {
  useVisitorTrack()
})
</script>

