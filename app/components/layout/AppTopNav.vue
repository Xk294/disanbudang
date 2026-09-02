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
        role="navigation"
        aria-label="Điều hướng chính"
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
              class="h-9 sm:h-10 w-9 sm:w-10 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
              width="40"
              height="40"
              loading="eager"
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

        <!-- Center: Desktop Navigation — 6 Primary Canonical Items -->
        <ul
          class="hidden lg:flex items-center gap-0.5 xl:gap-1 mx-auto"
          aria-label="Menu điều hướng chính"
        >
          <li v-for="item in primaryNavItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] 2xl:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
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

        <!-- Right: Utility actions (Search + AI Assistant + Contribute + Map + Mobile trigger) -->
        <div class="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
          <!-- Desktop Search Trigger Button (Fluid icon/pill) -->
          <button
            class="hidden md:flex items-center gap-2 h-9 px-2.5 xl:px-3 2xl:px-3.5 rounded-full bg-charcoal-950/60 hover:bg-charcoal-900 border border-charcoal-700/60 hover:border-gold-500/40 text-charcoal-400 hover:text-ivory transition-all duration-200 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Tìm kiếm di sản"
            @click="isSearchOpen = true"
          >
            <Icon name="mdi:magnify" class="w-4 h-4 text-gold-400/80 shrink-0" />
            <span class="hidden xl:inline text-xs font-normal text-charcoal-300">Tìm kiếm...</span>
            <kbd class="hidden 2xl:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono bg-charcoal-800/80 border border-charcoal-700/60 rounded text-charcoal-400">{{ shortcutKey }}</kbd>
          </button>

          <!-- AI Assistant Trigger Button -->
          <button
            type="button"
            class="group/aibtn relative overflow-hidden hidden sm:inline-flex items-center gap-1.5 h-9 px-2 xl:px-2.5 2xl:px-3.5 rounded-full border border-gold-500/40 hover:border-gold-400 bg-charcoal-900/80 hover:bg-gold-500/15 text-ivory hover:text-gold-200 text-xs xl:text-sm font-medium tracking-wide transition-all duration-300 shadow-[0_0_12px_rgba(199,166,100,0.15)] hover:shadow-[0_0_20px_rgba(199,166,100,0.35)] hover:scale-[1.02] active:scale-[0.98] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 cursor-pointer"
            aria-label="Mở AI Trợ Lý"
            @click="isAiAssistantOpen = true"
          >
            <span class="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
            <Icon name="mdi:sparkles" class="w-4 h-4 text-gold-400 group-hover/aibtn:rotate-12 group-hover/aibtn:scale-110 transition-transform duration-300 shrink-0" />
            <span class="font-medium whitespace-nowrap">AI Trợ Lý</span>
          </button>

          <!-- Contribute Button (Shown on xl+) -->
          <NuxtLink
            to="/contribute"
            class="hidden xl:inline-flex items-center gap-1.5 h-9 px-2.5 2xl:px-3.5 rounded-full border border-gold-500/30 hover:border-gold-400 bg-charcoal-900/80 hover:bg-gold-500/15 text-ivory hover:text-gold-200 text-xs xl:text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Đóng góp di sản"
          >
            <Icon name="mdi:hand-heart-outline" class="w-4 h-4 text-gold-400 shrink-0" />
            <span class="font-medium whitespace-nowrap">Đóng Góp</span>
          </NuxtLink>

          <!-- Map CTA Button (Gold highlighted pill, always prioritized) -->
          <NuxtLink
            to="/map"
            class="inline-flex items-center gap-1.5 h-9 px-3 sm:px-3.5 2xl:px-4 rounded-full bg-gradient-to-r from-[#e5be65] via-[#d4a843] to-[#c2932b] hover:from-[#ebd07e] hover:to-[#cca038] text-charcoal-950 font-bold text-xs xl:text-sm tracking-wider transition-all duration-300 shadow-[0_0_14px_rgba(212,168,67,0.35)] hover:shadow-[0_0_22px_rgba(212,168,67,0.55)] hover:scale-[1.03] active:scale-[0.97] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Mở Bản đồ di sản"
          >
            <Icon name="mdi:map-outline" class="w-4 h-4 text-charcoal-950 shrink-0" />
            <span class="font-bold whitespace-nowrap">BẢN ĐỒ</span>
          </NuxtLink>

          <!-- Mobile Search Trigger -->
          <button
            class="md:hidden p-2 rounded-xl text-charcoal-300 hover:text-gold-300 hover:bg-charcoal-900/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Tìm kiếm di sản"
            @click="isSearchOpen = true"
          >
            <Icon name="mdi:magnify" class="w-5 h-5" />
          </button>

          <!-- Mobile User Avatar Indicator (if logged in) -->
          <button
            v-if="user"
            type="button"
            class="lg:hidden p-0.5 rounded-full border border-gold-500/50 hover:border-gold-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 shrink-0"
            aria-label="Tài khoản cá nhân"
            @click="isMobileOpen = !isMobileOpen"
          >
            <img
              v-if="user.photoURL"
              :src="user.photoURL"
              :alt="user.displayName ?? 'Avatar'"
              class="w-7 h-7 rounded-full object-cover"
              referrerpolicy="no-referrer"
            />
            <div v-else class="w-7 h-7 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 text-xs font-bold">
              {{ (user.displayName || user.email || 'U').charAt(0).toUpperCase() }}
            </div>
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
        <!-- Mobile User Account Section -->
        <div class="mb-3 pb-3 border-b border-charcoal-800/80">
          <div v-if="user" class="p-3 bg-charcoal-900/90 border border-gold-500/30 rounded-2xl">
            <div class="flex items-center gap-3">
              <img
                v-if="user.photoURL"
                :src="user.photoURL"
                :alt="user.displayName ?? 'Avatar'"
                class="w-10 h-10 rounded-full object-cover border border-gold-500/50 shrink-0"
                referrerpolicy="no-referrer"
              />
              <div v-else class="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 font-bold shrink-0">
                {{ (user.displayName || user.email || 'U').charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <h4 class="font-heading font-bold text-sm text-ivory truncate">{{ user.displayName || 'Thành viên Di Sản' }}</h4>
                  <span class="inline-flex items-center gap-1 text-[8.5px] font-medium text-gold-400 bg-gold-500/10 px-1.5 py-0.5 rounded-full border border-gold-500/30">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Đã đăng nhập
                  </span>
                </div>
                <p class="text-[10px] text-charcoal-400 font-mono truncate mt-0.5">{{ user.email }}</p>
              </div>
            </div>

            <!-- Quick account links -->
            <div class="mt-3 pt-2.5 border-t border-charcoal-800/60 grid grid-cols-2 gap-1.5 text-xs">
              <NuxtLink
                to="/me"
                class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-charcoal-200 hover:text-gold-300 hover:bg-gold-500/10 transition-colors"
                @click="isMobileOpen = false"
              >
                <Icon name="mdi:account-circle-outline" class="w-4 h-4 text-gold-400" />
                <span>Hồ sơ cá nhân</span>
              </NuxtLink>
              <NuxtLink
                v-if="isAdmin"
                to="/admin"
                class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-amber-300 hover:bg-amber-500/15 transition-colors"
                @click="isMobileOpen = false"
              >
                <Icon name="mdi:shield-crown" class="w-4 h-4 text-amber-400" />
                <span>Admin</span>
              </NuxtLink>
              <NuxtLink
                to="/contribute"
                class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-charcoal-200 hover:text-gold-300 hover:bg-gold-500/10 transition-colors"
                @click="isMobileOpen = false"
              >
                <Icon name="mdi:hand-heart-outline" class="w-4 h-4 text-gold-400" />
                <span>Đóng góp</span>
              </NuxtLink>
              <button
                type="button"
                class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-charcoal-400 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer text-left"
                @click="handleMobileSignOut"
              >
                <Icon name="mdi:logout" class="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>

          <!-- When not logged in: One-tap Google Sign-In -->
          <button
            v-else
            type="button"
            class="w-full flex items-center justify-between p-3 rounded-2xl bg-charcoal-900/80 hover:bg-charcoal-800/90 border border-charcoal-700/80 hover:border-gold-500/40 transition-all cursor-pointer text-left"
            :disabled="signingIn"
            @click="handleMobileSignIn"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                <Icon v-if="signingIn" name="mdi:loading" class="w-4 h-4 animate-spin text-charcoal-900" />
                <svg v-else viewBox="0 0 24 24" class="w-4 h-4" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-ivory">Đăng nhập bằng Google</p>
                <p class="text-[10px] text-charcoal-400">Đồng bộ hồ sơ, điểm quiz & đánh giá</p>
              </div>
            </div>
            <Icon name="mdi:chevron-right" class="w-4 h-4 text-charcoal-400" />
          </button>
        </div>

        <!-- Primary: Discovery & Learning section -->
        <p class="text-[9px] uppercase tracking-[0.18em] font-bold text-charcoal-500 mb-2 px-2">Khám Phá & Học Tập</p>
        <div class="space-y-0.5 mb-3" aria-label="Menu khám phá và học tập">
          <NuxtLink
            v-for="item in mobilePrimaryNavItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            :class="[
              isActive(item.to)
                ? 'text-gold-300 bg-gold-500/10 font-semibold border border-gold-500/20'
                : 'text-charcoal-200 hover:text-gold-300 hover:bg-charcoal-900/50',
            ]"
            @click="isMobileOpen = false"
          >
            <Icon :name="item.icon" class="w-5 h-5 text-gold-400/80" />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </NuxtLink>
        </div>

        <!-- Secondary: Content, Journal & Community -->
        <div class="border-t border-charcoal-800/60 pt-3 mb-3">
          <p class="text-[9px] uppercase tracking-[0.18em] font-bold text-charcoal-500 mb-2 px-2">Nội Dung & Hoạt Động</p>
          <div class="space-y-0.5">
            <NuxtLink
              v-for="item in mobileSecondaryNavItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
              :class="[
                isActive(item.to)
                  ? 'text-gold-300 bg-gold-500/10 font-semibold border border-gold-500/20'
                  : 'text-charcoal-300 hover:text-ivory hover:bg-charcoal-900/50',
              ]"
              @click="isMobileOpen = false"
            >
              <Icon :name="item.icon" class="w-4 h-4 text-gold-400/70" />
              <span class="text-sm">{{ item.label }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Utility CTAs (AI Assistant + Search shortcut) -->
        <div class="pt-3 border-t border-charcoal-800/80 space-y-2">
          <button
            type="button"
            class="flex items-center justify-center gap-2 w-full text-xs sm:text-sm py-2.5 rounded-xl bg-charcoal-900/90 border border-gold-500/40 text-gold-300 font-semibold tracking-wide transition-all shadow-[0_0_12px_rgba(199,166,100,0.15)]"
            @click="isMobileOpen = false; isAiAssistantOpen = true"
          >
            <span class="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
            <Icon name="mdi:sparkles" class="w-4 h-4 text-gold-400" />
            <span>AI Trợ Lý</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Search Modal — Unified Discovery Search (Heritage + Community) -->
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
            <!-- Search input row -->
            <div class="flex items-center gap-3 border-b border-charcoal-800/80 px-5 py-4 focus-within:border-gold-500/50 transition-colors duration-300">
              <Icon name="mdi:magnify" class="w-5 h-5 text-gold-400 shrink-0" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="search"
                placeholder="Tìm di sản, ký ức, bài học, audio..."
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

            <div class="max-h-[65vh] overflow-y-auto">
              <!-- Default state: quick navigation shortcuts -->
              <div v-if="!searchQuery" class="p-4">
                <p class="text-[10px] uppercase tracking-widest font-bold text-charcoal-500 mb-2 px-1">Khám phá nhanh</p>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <NuxtLink
                    v-for="link in quickLinks"
                    :key="link.to"
                    :to="link.to"
                    class="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-charcoal-900/60 hover:bg-charcoal-800/80 border border-charcoal-800/60 hover:border-gold-500/30 transition-all duration-200 group"
                    @click="closeSearch"
                  >
                    <Icon :name="link.icon" class="w-4 h-4 text-gold-400/70 group-hover:text-gold-400 shrink-0" />
                    <span class="text-xs font-medium text-charcoal-300 group-hover:text-ivory">{{ link.label }}</span>
                  </NuxtLink>
                </div>
              </div>

              <!-- Search results grouped by type -->
              <div v-else class="p-3">
                <!-- Heritage results -->
                <div v-if="heritageResults.length > 0" class="mb-3">
                  <p class="text-[10px] uppercase tracking-widest font-bold text-charcoal-500 mb-1.5 px-1">Di Sản ({{ heritageResults.length }})</p>
                  <NuxtLink
                    v-for="heritage in heritageResults"
                    :key="heritage.id"
                    :to="`/heritage/${heritage.slug}`"
                    class="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-charcoal-900/60 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                    @click="closeSearch"
                  >
                    <NuxtImg :src="heritage.coverImage" :alt="heritage.title" class="w-12 h-10 rounded-lg object-cover shrink-0" />
                    <span class="min-w-0 flex-1">
                      <span class="block text-ivory text-sm font-semibold truncate">{{ heritage.title }}</span>
                      <span class="block text-charcoal-400 text-xs truncate">{{ heritage.subtitle }}</span>
                    </span>
                    <Icon name="mdi:arrow-right" class="w-4 h-4 text-charcoal-600 ml-auto shrink-0" />
                  </NuxtLink>
                </div>

                <!-- Community memory results -->
                <div v-if="communityResults.length > 0" class="mb-3">
                  <p class="text-[10px] uppercase tracking-widest font-bold text-charcoal-500 mb-1.5 px-1">Ký Ức Cộng Đồng ({{ communityResults.length }})</p>
                  <NuxtLink
                    v-for="post in communityResults"
                    :key="post.id"
                    :to="`/explore/post/${post.id}`"
                    class="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-charcoal-900/60 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                    @click="closeSearch"
                  >
                    <div class="w-12 h-10 rounded-lg bg-charcoal-800 flex items-center justify-center shrink-0 overflow-hidden">
                      <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title" class="w-full h-full object-cover" />
                      <Icon v-else name="mdi:book-heart-outline" class="w-5 h-5 text-gold-400/60" />
                    </div>
                    <span class="min-w-0 flex-1">
                      <span class="block text-ivory text-sm font-semibold truncate">{{ post.title }}</span>
                      <span class="block text-charcoal-500 text-xs truncate">Ký ức · {{ post.author.name }}</span>
                    </span>
                    <Icon name="mdi:arrow-right" class="w-4 h-4 text-charcoal-600 ml-auto shrink-0" />
                  </NuxtLink>
                </div>

                <!-- Empty state -->
                <p v-if="heritageResults.length === 0 && communityResults.length === 0" class="text-center text-charcoal-400 text-sm py-10">
                  Không tìm thấy kết quả phù hợp với "<span class="text-ivory">{{ searchQuery }}</span>"
                </p>

                <!-- View all in Explore -->
                <button
                  v-if="searchQuery && (heritageResults.length > 0 || communityResults.length > 0)"
                  class="w-full mt-2 btn-primary justify-center text-xs py-2.5"
                  @click="goToExplore"
                >
                  Xem tất cả kết quả
                  <Icon name="mdi:arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Global AI Assistant Modal -->
    <AiAssistantModal />
  </header>
</template>

<script setup lang="ts">
import { COMMUNITY_POSTS } from '~/data/posts'

const isScrolled = ref(false)
const isMobileOpen = ref(false)
const isSearchOpen = ref(false)
const isAiAssistantOpen = useState<boolean>('isAiAssistantOpen', () => false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const heritageStore = useHeritageStore()
const route = useRoute()
const isJourneyStarted = useState<boolean>('isJourneyStarted', () => false)

const { user, isAdmin, signInWithGoogle, signOut, syncUserToDb } = useAuth()
const signingIn = ref(false)

async function handleMobileSignIn() {
  signingIn.value = true
  try {
    const res = await signInWithGoogle()
    if (res?.ok) {
      await syncUserToDb()
    }
  } finally {
    signingIn.value = false
  }
}

async function handleMobileSignOut() {
  await signOut()
  isMobileOpen.value = false
}

const isNavVisible = computed(() => true)

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  const pathBase = path.split('?')[0]!
  if (pathBase === '/about') {
    return route.path.startsWith('/about')
  }
  if (pathBase === '/explore') {
    return route.path.startsWith('/explore') || route.path.startsWith('/heritage')
  }
  if (pathBase === '/study') {
    return route.path.startsWith('/study')
  }
  if (pathBase === '/stories') {
    return route.path.startsWith('/stories') || route.path.startsWith('/news')
  }
  if (pathBase === '/journal') {
    return route.path.startsWith('/journal')
  }
  if (pathBase === '/contribute') {
    return route.path.startsWith('/contribute')
  }
  if (pathBase === '/map') {
    return route.path.startsWith('/map')
  }
  return route.path.startsWith(pathBase)
}

// 6 Canonical Primary Navigation items in exact requested order
const primaryNavItems = [
  { to: '/', label: 'Trang Chủ', icon: 'mdi:home-outline' },
  { to: '/about', label: 'Giới Thiệu', icon: 'mdi:information-outline' },
  { to: '/explore', label: 'Thư Viện', icon: 'mdi:compass-outline' },
  { to: '/study', label: 'Học Tập', icon: 'mdi:school-outline' },
  { to: '/stories', label: 'Chuyện', icon: 'mdi:book-open-page-variant-outline' },
  { to: '/journal', label: 'Nhật Ký', icon: 'mdi:notebook-outline' },
]

// Mobile drawer primary items (Ordered navigation)
const mobilePrimaryNavItems = [
  { to: '/', label: 'Trang Chủ', icon: 'mdi:home-outline' },
  { to: '/about', label: 'Giới Thiệu', icon: 'mdi:information-outline' },
  { to: '/explore', label: 'Thư Viện', icon: 'mdi:compass-outline' },
  { to: '/study', label: 'Học Tập', icon: 'mdi:school-outline' },
  { to: '/stories', label: 'Chuyện Di Sản', icon: 'mdi:book-open-page-variant-outline' },
  { to: '/journal', label: 'Nhật Ký Điền Dã', icon: 'mdi:notebook-outline' },
]

// Mobile drawer secondary items (Map & Contribute)
const mobileSecondaryNavItems = [
  { to: '/map', label: 'Bản Đồ Di Sản', icon: 'mdi:map-outline' },
  { to: '/contribute', label: 'Đóng Góp Di Sản', icon: 'mdi:hand-heart-outline' },
]

// Quick links shown in empty search state
const quickLinks = [
  { to: '/explore', label: 'Di Sản', icon: 'mdi:compass-outline' },
  { to: '/map', label: 'Bản Đồ', icon: 'mdi:map-outline' },
  { to: '/stories', label: 'Chuyện', icon: 'mdi:book-open-page-variant-outline' },
  { to: '/journal', label: 'Nhật Ký', icon: 'mdi:notebook-outline' },
]

// Heritage search results
const heritageResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return heritageStore.publishedHeritages
    .filter((heritage) =>
      heritage.title.toLowerCase().includes(q) ||
      heritage.subtitle.toLowerCase().includes(q) ||
      heritage.shortDescription.toLowerCase().includes(q) ||
      heritage.tags.some((tag) => tag.toLowerCase().includes(q)),
    )
    .slice(0, 5)
})

// Community memory search results
const communityResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return COMMUNITY_POSTS
    .filter((post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q)),
    )
    .slice(0, 3)
})

const shortcutKey = ref('⌘K')

if (import.meta.client) {
  onMounted(() => {
    if (typeof navigator !== 'undefined') {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || navigator.platform || '')
      shortcutKey.value = isMac ? '⌘K' : 'Ctrl+K'
    }
  })

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
  if (!open) {
    searchQuery.value = ''
    return
  }
  await nextTick()
  searchInput.value?.focus()
})

const modalContainerRef = ref<HTMLElement | null>(null)

watch([isMobileOpen, isSearchOpen], ([mobileOpen, searchOpen]) => {
  if (import.meta.client) {
    document.body.style.overflow = (mobileOpen || searchOpen) ? 'hidden' : ''
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
