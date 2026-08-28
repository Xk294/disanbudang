<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-3 px-2 sm:px-4 lg:px-6 transition-all duration-500"
    :class="[
      isSearchOpen ? 'z-[90]' : 'z-50',
    ]"
  >
    <div class="max-w-[1440px] mx-auto">
      <nav
        class="heritage-navbar-box relative rounded-[18px] sm:rounded-[20px] transition-all duration-300 px-3 sm:px-5 lg:px-6 flex items-center justify-between"
        :class="[
          isScrolled ? 'h-[64px] shadow-2xl' : 'h-[72px]',
        ]"
      >
        <!-- Faint heritage ambient pattern -->
        <div
          class="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden opacity-[0.04]"
          style="background-image: radial-gradient(circle at 2px 2px, #C7A664 1px, transparent 0); background-size: 20px 20px;"
          aria-hidden="true"
        />

        <!-- Left: Logo area -->
        <div class="flex items-center shrink-0">
          <NuxtLink to="/" class="flex items-center gap-2.5 sm:gap-3 group shrink-0 py-1" aria-label="Trang chủ Di Sản Bù Đăng">
            <div class="relative shrink-0 flex items-center justify-center">
              <div class="absolute -inset-1 rounded-full bg-gold-500/20 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <NuxtImg
                src="/favicon/icon-192.png"
                alt="Logo Di Sản Bù Đăng"
                class="h-9 sm:h-10 lg:h-11 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div class="flex flex-col justify-center text-left shrink-0 select-none">
              <div class="font-heading font-serif tracking-[0.08em] text-xs sm:text-sm lg:text-[15px] leading-tight whitespace-nowrap text-ivory group-hover:text-gold-200 transition-colors">
                <span class="font-bold">DI SẢN</span>
                <span class="font-bold text-gold-300 ml-1.5">BÙ ĐĂNG</span>
              </div>
              <span class="text-[8px] sm:text-[8.5px] lg:text-[9px] text-charcoal-400 tracking-[0.16em] uppercase font-medium mt-1 leading-none whitespace-nowrap">
                BẢO TÀNG SỐ ĐỒNG NAI
              </span>
            </div>
          </NuxtLink>

          <!-- Vertical Divider after Logo -->
          <div class="hidden lg:block w-px h-8 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent ml-5 xl:ml-6 shrink-0" aria-hidden="true" />
        </div>

        <!-- Center: Desktop Navigation -->
        <ul class="hidden xl:flex items-center gap-1.5 2xl:gap-3 ml-4 mr-auto" aria-label="Menu điều hướng chính">
          <li v-for="item in navItems.filter((i) => i.to !== '/contribute')" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="relative px-3.5 py-1.5 rounded-full text-xs 2xl:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
              :class="[
                isActive(item.to)
                  ? 'text-gold-300 font-semibold bg-gold-500/10 border border-gold-500/25 shadow-[inset_0_0_12px_rgba(199,166,100,0.12)]'
                  : 'text-ivory/80 hover:text-gold-200 hover:bg-gold-500/5',
              ]"
            >
              {{ item.label }}
              <!-- Elegant active underline indicator -->
              <span
                v-if="isActive(item.to)"
                class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              />
            </NuxtLink>
          </li>
        </ul>

        <!-- Right: Actions & Controls -->
        <div class="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
          <!-- Search Control -->
          <button
            class="hidden md:flex items-center gap-2 h-9 px-3 xl:px-3.5 rounded-full bg-charcoal-900/60 hover:bg-charcoal-850/90 border border-charcoal-700/50 hover:border-gold-500/40 text-charcoal-400 hover:text-gold-300 transition-all duration-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Tìm kiếm di sản"
            @click="isSearchOpen = true"
          >
            <Icon name="mdi:magnify" class="w-4 h-4 text-gold-400/80 shrink-0" />
            <span class="hidden 2xl:inline text-xs font-normal text-charcoal-400">Tìm kiếm di sản...</span>
            <kbd class="hidden 2xl:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono bg-charcoal-800/80 border border-charcoal-700/60 rounded text-charcoal-400">⌘K</kbd>
          </button>

          <!-- Visitor Counter Chip (Sleek & Minimalist) -->
          <div
            v-if="formattedVisitCount"
            class="hidden 2xl:inline-flex items-center gap-2 h-9 px-3.5 rounded-full bg-charcoal-900/50 hover:bg-charcoal-850/80 border border-charcoal-800/80 hover:border-gold-500/30 text-xs select-none shrink-0 transition-all duration-200"
            title="Tổng lượt ghé thăm cổng di sản"
            aria-label="Tổng lượt ghé thăm"
          >
            <span class="relative flex h-2 w-2 shrink-0">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-60" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-gold-500/90" />
            </span>
            <span class="font-bold text-ivory/90 tabular-nums text-xs tracking-tight">{{ formattedVisitCount }}</span>
            <span class="text-[11px] text-charcoal-400 font-normal">lượt xem</span>
          </div>

          <!-- Đóng Góp Button -->
          <NuxtLink
            to="/contribute"
            class="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-gold-500/35 hover:border-gold-400/60 bg-charcoal-900/40 hover:bg-gold-500/10 text-ivory/90 hover:text-gold-200 text-xs xl:text-sm font-medium tracking-wide transition-all duration-200 hover:shadow-[0_0_15px_rgba(199,166,100,0.15)] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
          >
            <Icon name="mdi:hand-heart-outline" class="w-4 h-4 text-gold-400 shrink-0" />
            <span>Đóng góp</span>
          </NuxtLink>

          <!-- Bản Đồ Primary CTA Button -->
          <NuxtLink
            to="/map"
            class="group/mapbtn relative overflow-hidden inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-gradient-to-r from-[#9A783E] via-[#D1B27D] to-[#9A783E] text-charcoal-950 text-xs xl:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_18px_rgba(199,166,100,0.22)] hover:shadow-[0_0_24px_rgba(199,166,100,0.4)] hover:brightness-105 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
          >
            <!-- Highlight sheen passing across on hover -->
            <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover/mapbtn:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
            <Icon name="mdi:book-open-page-variant-outline" class="w-4 h-4 text-charcoal-950 shrink-0" />
            <span class="relative z-10">BẢN ĐỒ</span>
          </NuxtLink>

          <!-- Mobile Search Trigger -->
          <button
            class="md:hidden p-2 rounded-lg text-charcoal-300 hover:text-gold-400 hover:bg-charcoal-900/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Tìm kiếm di sản"
            @click="isSearchOpen = true"
          >
            <Icon name="mdi:magnify" class="w-5 h-5" />
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button
            class="xl:hidden p-2 rounded-lg text-charcoal-200 hover:bg-charcoal-900/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Menu di động"
            :aria-expanded="isMobileOpen"
            @click="isMobileOpen = !isMobileOpen"
          >
            <Icon :name="isMobileOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6 text-gold-300" />
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu Container -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileOpen"
        class="xl:hidden max-w-[1440px] mx-auto mt-2 heritage-navbar-box rounded-[18px] p-5 shadow-2xl"
      >
        <div class="space-y-1" aria-label="Menu di động">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            :class="[
              isActive(item.to)
                ? 'text-gold-300 bg-gold-500/10 font-semibold border border-gold-500/20'
                : 'text-charcoal-300 hover:text-gold-300 hover:bg-charcoal-900/50',
            ]"
            @click="isMobileOpen = false"
          >
            <Icon :name="item.icon" class="w-5 h-5 text-gold-400/80" />
            {{ item.label }}
          </NuxtLink>

          <div class="pt-4 mt-2 border-t border-charcoal-800/80 space-y-2">
            <NuxtLink
              to="/contribute"
              class="flex items-center justify-center gap-2 w-full text-xs py-2.5 rounded-xl border border-gold-500/35 text-gold-300 hover:bg-gold-500/10 font-medium transition-colors"
              @click="isMobileOpen = false"
            >
              <Icon name="mdi:hand-heart-outline" class="w-4 h-4" />
              Đóng Góp Tư Liệu
            </NuxtLink>
            <NuxtLink
              to="/map"
              class="flex items-center justify-center gap-2 w-full text-xs py-2.5 rounded-xl bg-gradient-to-r from-[#9A783E] via-[#D1B27D] to-[#9A783E] text-charcoal-950 font-bold uppercase tracking-wider transition-all"
              @click="isMobileOpen = false"
            >
              <Icon name="mdi:book-open-page-variant-outline" class="w-4 h-4" />
              Khám Phá Bản Đồ
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Search modal -->
    <Transition name="search-modal">
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 z-[100] bg-charcoal-950/80 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Tìm kiếm di sản"
        @click.self="closeSearch"
        @keydown="handleModalTab"
      >
        <div ref="modalContainerRef" class="container-narrow pt-24 sm:pt-28 px-4">
          <div class="heritage-navbar-box rounded-3xl overflow-hidden shadow-2xl p-0">
            <div class="flex items-center gap-3 border-b border-charcoal-800/80 px-5 py-4 focus-within:border-gold-500/50 transition-colors duration-300">
              <Icon name="mdi:magnify" class="w-5 h-5 text-gold-400 shrink-0" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="search"
                placeholder="Tìm di sản, danh thắng, văn hóa..."
                class="w-full bg-transparent text-ivory placeholder-charcoal-400 focus:outline-none text-base font-medium"
                @keydown.esc="closeSearch"
                @keydown.enter="goToExplore"
              />
              <kbd class="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-charcoal-800/80 border border-charcoal-700/60 rounded text-charcoal-400">ESC</kbd>
              <button
                class="p-2 rounded-lg text-charcoal-400 hover:text-ivory hover:bg-charcoal-800/80 transition-colors duration-200"
                aria-label="Đóng tìm kiếm"
                @click="closeSearch"
              >
                <Icon name="mdi:close" class="w-5 h-5" />
              </button>
            </div>

            <div class="max-h-[60vh] overflow-y-auto p-3">
              <NuxtLink
                v-for="heritage in searchResults"
                :key="heritage.id"
                :to="`/heritage/${heritage.slug}`"
                class="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-charcoal-900/60 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                @click="closeSearch"
              >
                <NuxtImg :src="heritage.coverImage" :alt="heritage.title" class="w-14 h-12 rounded-lg object-cover" />
                <span class="min-w-0">
                  <span class="block text-ivory text-sm font-semibold truncate">{{ heritage.title }}</span>
                  <span class="block text-charcoal-400 text-xs truncate">{{ heritage.subtitle }}</span>
                </span>
              </NuxtLink>

              <button
                v-if="searchQuery"
                class="w-full mt-2 btn-primary justify-center"
                @click="goToExplore"
              >
                Xem tất cả kết quả
                <Icon name="mdi:arrow-right" class="w-4 h-4" />
              </button>

              <p v-if="searchQuery && searchResults.length === 0" class="text-center text-charcoal-400 text-sm py-10">
                Không tìm thấy di sản phù hợp.
              </p>
              <p v-if="!searchQuery" class="text-center text-charcoal-400 text-sm py-10">
                Nhập tên di sản, địa danh hoặc từ khóa để tra cứu nhanh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const isScrolled = ref(false)
const isMobileOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const heritageStore = useHeritageStore()
const visitCount = useSiteVisitCount()
const route = useRoute()

const formattedVisitCount = computed(() => {
  if (visitCount.value === null) return null
  if (visitCount.value >= 1000000) {
    return (visitCount.value / 1000000).toFixed(1).replace('.0', '') + 'M'
  }
  if (visitCount.value >= 1000) {
    return (visitCount.value / 1000).toFixed(1).replace('.0', '') + 'K'
  }
  return visitCount.value.toLocaleString('vi-VN')
})

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return heritageStore.publishedHeritages
    .filter((heritage) =>
      heritage.title.toLowerCase().includes(q) ||
      heritage.subtitle.toLowerCase().includes(q) ||
      heritage.shortDescription.toLowerCase().includes(q) ||
      heritage.tags.some((tag) => tag.toLowerCase().includes(q)),
    )
    .slice(0, 6)
})

const navItems = [
  { to: '/', label: 'Trang Chủ', icon: 'mdi:home-outline' },
  { to: '/about', label: 'Giới Thiệu', icon: 'mdi:information-outline' },
  { to: '/explore', label: 'Khám Phá', icon: 'mdi:compass-outline' },
  { to: '/study', label: 'Học Tập', icon: 'mdi:school-outline' },
  { to: '/news', label: 'Bài Viết', icon: 'mdi:newspaper-variant-outline' },
  { to: '/contribute', label: 'Đóng Góp', icon: 'mdi:hand-heart-outline' },
]

if (import.meta.client) {
  useEventListener(window, 'scroll', () => {
    isScrolled.value = window.scrollY > 20
  })

  useEventListener(window, 'keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      isSearchOpen.value = true
    }
  })
}

// Close menu on route change
watch(() => route.path, () => { isMobileOpen.value = false })

watch(isSearchOpen, async (open) => {
  if (!open) return
  await nextTick()
  searchInput.value?.focus()
})

const modalContainerRef = ref<HTMLElement | null>(null)

watch([isMobileOpen, isSearchOpen], ([mobileOpen, searchOpen]) => {
  if (import.meta.client) {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})

function handleModalTab(e: KeyboardEvent) {
  if (e.key !== 'Tab') return
  if (!modalContainerRef.value) return

  const focusables = modalContainerRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  if (focusables.length === 0) return

  const firstEl = focusables[0] as HTMLElement
  const lastEl = focusables[focusables.length - 1] as HTMLElement

  if (e.shiftKey) {
    if (document.activeElement === firstEl) {
      lastEl.focus()
      e.preventDefault()
    }
  } else {
    if (document.activeElement === lastEl) {
      firstEl.focus()
      e.preventDefault()
    }
  }
}

function closeSearch() {
  isSearchOpen.value = false
}

function goToExplore() {
  const query = searchQuery.value.trim()
  closeSearch()
  navigateTo(query ? `/explore?search=${encodeURIComponent(query)}` : '/explore')
}
</script>

<style scoped>
.heritage-navbar-box {
  border: 1px solid transparent;
  background:
    linear-gradient(180deg, rgba(24, 18, 14, 0.94) 0%, rgba(13, 10, 8, 0.97) 100%) padding-box,
    linear-gradient(135deg, rgba(210, 175, 110, 0.45) 0%, rgba(110, 80, 45, 0.2) 35%, rgba(235, 195, 130, 0.55) 70%, rgba(70, 50, 30, 0.25) 100%) border-box;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    0 16px 36px -10px rgba(0, 0, 0, 0.85),
    0 0 24px 0 rgba(199, 166, 100, 0.08),
    inset 0 1px 1px 0 rgba(235, 195, 130, 0.15);
}

.heritage-navbar-box:hover {
  background:
    linear-gradient(180deg, rgba(26, 20, 15, 0.96) 0%, rgba(14, 11, 8, 0.98) 100%) padding-box,
    linear-gradient(135deg, rgba(225, 188, 120, 0.55) 0%, rgba(120, 90, 50, 0.25) 35%, rgba(245, 205, 140, 0.65) 70%, rgba(80, 55, 35, 0.3) 100%) border-box;
  box-shadow:
    0 20px 40px -10px rgba(0, 0, 0, 0.9),
    0 0 28px 0 rgba(199, 166, 100, 0.12),
    inset 0 1px 1px 0 rgba(235, 195, 130, 0.2);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
  filter: blur(4px);
}

.search-modal-enter-active,
.search-modal-leave-active {
  transition: all 0.35s cubic-bezier(0.19, 1, 0.22, 1);
}
.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(6px);
  filter: blur(6px);
}
</style>

