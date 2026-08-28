<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-3.5 px-3 sm:px-5 lg:px-8 transition-all duration-500 ease-out"
    :class="[
      isSearchOpen ? 'z-[90]' : 'z-50',
      isNavVisible
        ? 'opacity-100 translate-y-0 pointer-events-auto'
        : 'opacity-0 -translate-y-6 pointer-events-none',
    ]"
  >
    <div class="max-w-[1400px] mx-auto">
      <nav
        class="heritage-navbar-box relative rounded-2xl sm:rounded-2xl transition-all duration-300 px-3.5 sm:px-5 lg:px-6 flex items-center justify-between"
        :class="[
          isScrolled ? 'h-[62px] sm:h-[64px] shadow-2xl' : 'h-[68px] sm:h-[72px]',
        ]"
      >
        <!-- Faint heritage ambient pattern -->
        <div
          class="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden opacity-[0.03]"
          style="background-image: radial-gradient(circle at 2px 2px, #C7A664 1px, transparent 0); background-size: 20px 20px;"
          aria-hidden="true"
        />

        <!-- Left: Brand / Logo area -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2.5 sm:gap-3 group shrink-0 py-1"
          aria-label="Trang chủ Di Sản Bù Đăng"
        >
          <div class="relative shrink-0 flex items-center justify-center">
            <div class="absolute -inset-1 rounded-full bg-gold-500/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <NuxtImg
              src="/favicon/icon-192.png"
              alt="Logo Di Sản Bù Đăng"
              class="h-9 sm:h-10 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="flex flex-col justify-center text-left shrink-0 select-none">
            <div class="font-heading font-serif tracking-[0.06em] text-xs sm:text-sm lg:text-[15px] leading-tight whitespace-nowrap text-ivory group-hover:text-gold-200 transition-colors">
              <span class="font-bold">DI SẢN</span>
              <span class="font-bold text-gold-300 ml-1.5">BÙ ĐĂNG</span>
            </div>
            <span class="text-[8px] sm:text-[8.5px] lg:text-[9px] text-charcoal-400 tracking-[0.14em] uppercase font-medium mt-0.5 leading-none whitespace-nowrap">
              BẢO TÀNG SỐ ĐỒNG NAI
            </span>
          </div>
        </NuxtLink>

        <!-- Center: Desktop Navigation Links -->
        <ul
          class="hidden lg:flex items-center gap-1 xl:gap-1.5 mx-auto"
          aria-label="Menu điều hướng chính"
        >
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="px-3 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
              :class="[
                isActive(item.to)
                  ? 'text-gold-300 font-semibold bg-gold-500/15 border border-gold-500/30 shadow-[0_0_12px_rgba(199,166,100,0.1)]'
                  : 'text-ivory/80 hover:text-gold-200 hover:bg-white/[0.04] border border-transparent',
              ]"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Right: Actions (Search + CTA + Mobile trigger) -->
        <div class="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
          <!-- Desktop Search Trigger Button -->
          <button
            class="hidden md:flex items-center gap-2 h-9 px-3 xl:px-3.5 rounded-full bg-charcoal-950/60 hover:bg-charcoal-900 border border-charcoal-700/60 hover:border-gold-500/40 text-charcoal-400 hover:text-ivory transition-all duration-200 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Tìm kiếm di sản"
            @click="isSearchOpen = true"
          >
            <Icon name="mdi:magnify" class="w-4 h-4 text-gold-400/80 shrink-0" />
            <span class="hidden xl:inline text-xs font-normal text-charcoal-300">Tìm kiếm di sản...</span>
            <span class="inline xl:hidden text-xs font-normal text-charcoal-300">Tìm kiếm</span>
            <kbd class="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono bg-charcoal-800/80 border border-charcoal-700/60 rounded text-charcoal-400">⌘K</kbd>
          </button>

          <!-- Primary CTA: Interactive Map -->
          <NuxtLink
            to="/map"
            class="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 xl:px-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-charcoal-950 text-xs xl:text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_0_16px_rgba(199,166,100,0.25)] hover:shadow-[0_0_22px_rgba(199,166,100,0.4)] hover:scale-[1.02] active:scale-[0.98] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
          >
            <Icon name="mdi:map-outline" class="w-4 h-4 text-charcoal-950 shrink-0" />
            <span>Bản Đồ</span>
          </NuxtLink>

          <!-- Mobile Search Trigger -->
          <button
            class="md:hidden p-2 rounded-xl text-charcoal-300 hover:text-gold-300 hover:bg-charcoal-900/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Tìm kiếm di sản"
            @click="isSearchOpen = true"
          >
            <Icon name="mdi:magnify" class="w-5 h-5" />
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button
            class="lg:hidden p-2 rounded-xl text-charcoal-200 hover:bg-charcoal-900/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Menu di động"
            :aria-expanded="isMobileOpen"
            @click="isMobileOpen = !isMobileOpen"
          >
            <Icon :name="isMobileOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6 text-gold-300" />
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu Drawer -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileOpen"
        class="lg:hidden max-w-[1400px] mx-auto mt-2 heritage-navbar-box rounded-2xl p-4 shadow-2xl"
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
            <span class="text-sm font-medium">{{ item.label }}</span>
          </NuxtLink>

          <!-- Mobile Map CTA -->
          <div class="pt-3 mt-2 border-t border-charcoal-800/80">
            <NuxtLink
              to="/map"
              class="flex items-center justify-center gap-2 w-full text-xs sm:text-sm py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 font-semibold tracking-wide transition-all shadow-[0_0_16px_rgba(199,166,100,0.2)]"
              @click="isMobileOpen = false"
            >
              <Icon name="mdi:map-outline" class="w-4 h-4" />
              <span>Khám Phá Bản Đồ Di Sản</span>
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
          <div class="heritage-navbar-box rounded-2xl overflow-hidden shadow-2xl p-0">
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
                class="w-full mt-2 btn-primary justify-center text-xs py-2.5"
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
const route = useRoute()
const isJourneyStarted = useState<boolean>('isJourneyStarted', () => false)

const isNavVisible = computed(() => {
  if (route.path !== '/') return true
  return isJourneyStarted.value || isScrolled.value
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
  { to: '/explore', label: 'Khám Phá', icon: 'mdi:compass-outline' },
  { to: '/study', label: 'Học Tập', icon: 'mdi:school-outline' },
  { to: '/news', label: 'Bài Viết', icon: 'mdi:newspaper-variant-outline' },
  { to: '/about', label: 'Giới Thiệu', icon: 'mdi:information-outline' },
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
  border: 1px solid rgba(199, 166, 100, 0.22);
  background: rgba(22, 17, 13, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    0 16px 36px -10px rgba(0, 0, 0, 0.8),
    0 0 20px 0 rgba(199, 166, 100, 0.06),
    inset 0 1px 0 0 rgba(235, 195, 130, 0.12);
}

.heritage-navbar-box:hover {
  border-color: rgba(199, 166, 100, 0.32);
  box-shadow:
    0 20px 40px -10px rgba(0, 0, 0, 0.85),
    0 0 24px 0 rgba(199, 166, 100, 0.1),
    inset 0 1px 0 0 rgba(235, 195, 130, 0.18);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  filter: blur(4px);
}

.search-modal-enter-active,
.search-modal-leave-active {
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}
.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(6px);
  filter: blur(6px);
}
</style>

