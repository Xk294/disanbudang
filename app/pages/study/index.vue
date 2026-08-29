<template>
  <div class="min-h-screen bg-charcoal-900 text-ivory">
    <!-- Hidden h1 for SEO (heading hierarchy) -->
    <h1 class="sr-only">Cổng Học Tập Số Di Sản Thành Phố Đồng Nai</h1>

    <!-- Cmd+K Search Overlay -->
    <SearchOverlay
      v-model:open="searchOverlayOpen"
      :resources="resources"
      :glossary="glossary"
      :landmarks="mapLandmarks"
      :lessons="lessonCatalog"
      @select-tab="(tab: string) => { activeTab = tab; scrollToContent() }"
      @select-landmark="(id: string) => { navigateTo(`/map?landmark=${id}`) }"
      @filter-research="(q: string) => { paperSearchQuery = q; activeTab = 'research'; scrollToContent() }"
    />

    <!-- ================================================== -->
    <!-- HERO SECTION — Cinematic Full-Screen               -->
    <!-- ================================================== -->
    <section class="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-16" aria-label="Trang chủ học tập di sản">
      <!-- Cinematic background -->
      <div class="absolute inset-0 z-0">
        <img
          src="/images/heritage/danh-thang/bu-lach-lg.webp"
          alt="Trảng cỏ Bù Lạch, di sản thiên nhiên Thành Phố Đồng Nai"
          class="w-full h-full object-cover object-center scale-105"
          style="animation: slowZoom 20s ease-in-out infinite alternate"
        />
        <!-- Multi-layer gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/60 to-charcoal-950/95" />
        <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/60 via-transparent to-charcoal-950/40" />
        <!-- Noise texture -->
        <div class="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      </div>

      <!-- Gold orb decorations -->
      <div class="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-gold-500/8 rounded-full blur-[80px] pointer-events-none" />
      <div class="absolute bottom-1/3 -right-32 w-[350px] h-[350px] bg-earth-600/10 rounded-full blur-[100px] pointer-events-none" />

      <!-- Hero content -->
      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 reveal-on-scroll">
        <!-- Label -->
        <div class="inline-flex items-center gap-2 bg-charcoal-950/60 backdrop-blur-xl border border-gold-500/30 px-4 py-2 rounded-full shadow-gold/10 shadow-lg" style="animation: fadeSlideDown 0.8s cubic-bezier(0.16,1,0.3,1) forwards">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
          </span>
          <span class="text-gold-300 text-xs font-bold uppercase tracking-widest">Cổng Học Tập Di Sản Số</span>
          <span class="text-charcoal-500 text-xs">•</span>
          <span class="text-charcoal-300 text-xs">Thành Phố Đồng Nai</span>
        </div>

        <!-- Main headline -->
        <div style="animation: fadeSlideUp 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both">
          <h2 class="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.38] tracking-tight">
            Học. Khám phá.<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-earth-400">Gìn giữ di sản.</span>
          </h2>
        </div>

        <p class="text-charcoal-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-body" style="animation: fadeSlideUp 0.9s 0.25s cubic-bezier(0.16,1,0.3,1) both">
          Không gian học tập số dành cho học sinh, giáo viên, du khách và nhà nghiên cứu, khám phá lịch sử, văn hóa và di sản Thành Phố Đồng Nai theo cách tương tác, trực quan.
        </p>

        <!-- Hero CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4" style="animation: fadeSlideUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) both">
          <button
            class="group px-8 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold rounded-2xl text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-gold/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            @click="scrollToContent(); activeTab = 'lessons'"
            aria-label="Bắt đầu hành trình học tập"
          >
            <Icon name="mdi:play-circle-outline" class="w-5 h-5 group-hover:scale-110 transition-transform" />
            Bắt đầu hành trình
          </button>
          <button
            class="group px-8 py-4 bg-charcoal-950/60 backdrop-blur-xl hover:bg-charcoal-900/80 border border-charcoal-700 hover:border-gold-500/50 text-ivory font-bold rounded-2xl text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            @click="searchOverlayOpen = true"
            aria-label="Mở tìm kiếm nhanh"
          >
            <Icon name="mdi:magnify" class="w-5 h-5" />
            Tìm kiếm nhanh
            <kbd class="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-3xs bg-charcoal-800 border border-charcoal-700 text-charcoal-400 font-mono">⌘K</kbd>
          </button>
        </div>

        <!-- Quick Stats Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto" style="animation: fadeSlideUp 0.9s 0.45s cubic-bezier(0.16,1,0.3,1) both">
          <div
            v-for="stat in heroStats"
            :key="stat.label"
            class="bg-charcoal-950/60 backdrop-blur-xl border border-charcoal-800/50 rounded-2xl p-4 text-center hover:border-gold-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-500/5"
          >
            <span class="block text-2xl md:text-3xl font-bold text-gold-400 font-heading leading-none">{{ stat.value }}</span>
            <span class="block text-3xs text-charcoal-400 mt-1 uppercase tracking-wider font-semibold">{{ stat.label }}</span>
          </div>
        </div>

        <!-- Daily Discovery chip -->
        <div class="inline-flex items-center gap-3 bg-charcoal-950/50 backdrop-blur-xl border border-charcoal-800 rounded-2xl px-5 py-3 cursor-pointer hover:border-gold-500/40 transition-all duration-300 group" @click="openResource(resources[Math.floor(Math.random() * resources.length)]!)" style="animation: fadeSlideUp 0.9s 0.55s cubic-bezier(0.16,1,0.3,1) both" aria-label="Khám phá ngẫu nhiên một tài liệu hôm nay">
          <div class="w-8 h-8 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
            <Icon name="mdi:dice-multiple-outline" class="w-4 h-4" />
          </div>
          <div class="text-left">
            <span class="block text-3xs text-charcoal-400 uppercase tracking-widest">Khám phá ngẫu nhiên hôm nay</span>
            <span class="block text-xs font-bold text-ivory">{{ resources[0]?.title?.slice(0, 40) }}...</span>
          </div>
          <Icon name="mdi:arrow-right" class="w-4 h-4 text-gold-400 group-hover:translate-x-0.5 transition-transform ml-auto" />
        </div>
      </div>

      <!-- Scroll indicator -->
      <button
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charcoal-400 hover:text-gold-400 transition-all duration-300 z-10 group"
        :class="isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'"
        @click="scrollToContent()"
        aria-label="Cuộn xuống"
      >
        <span class="text-3xs uppercase tracking-widest font-semibold">Khám phá</span>
        <div class="w-6 h-10 rounded-full border-2 border-charcoal-600 group-hover:border-gold-500/60 flex items-start justify-center pt-1.5 transition-colors">
          <div class="w-1 h-2 bg-charcoal-400 group-hover:bg-gold-400 rounded-full animate-bounce transition-colors" />
        </div>
      </button>
    </section>

    <!-- ================================================== -->
    <!-- STICKY TAB NAVIGATION V2 — 3 Primary + Secondary  -->
    <!-- ================================================== -->
    <div ref="stickyNavRef" class="sticky top-[72px] z-30 bg-charcoal-950/95 backdrop-blur-2xl border-b border-charcoal-800/50 shadow-2xl shadow-charcoal-950/50">
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-1 py-2">
          <!-- User XP mini-badge -->
          <div class="hidden lg:flex items-center gap-2 mr-4 shrink-0 pl-1 border-r border-charcoal-800 pr-4">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-earth-700 to-gold-500 flex items-center justify-center font-heading font-bold text-charcoal-900 text-xs shadow">
              HS
            </div>
            <div>
              <div class="text-3xs font-bold text-ivory leading-none">{{ userXP }} XP</div>
              <div class="w-16 h-0.5 bg-charcoal-800 rounded-full mt-0.5 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-earth-600 to-gold-500 rounded-full transition-all duration-500" :style="{ width: (userXP % 100) + '%' }" />
              </div>
            </div>
          </div>

          <!-- Primary tabs: 3 cốt lõi -->
          <button
            v-for="item in primaryNavItems"
            :key="item.id"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 group relative"
            :class="activeTab === item.id
              ? 'bg-gold-500/12 text-gold-400 border border-gold-500/25 shadow-inner'
              : 'text-charcoal-350 hover:text-ivory hover:bg-charcoal-900'"
            @click="activeTab = item.id; scrollToContent(); showSecondaryNav = false"
            :aria-label="`Chuyển sang ${item.label}`"
            :aria-current="activeTab === item.id ? 'page' : undefined"
          >
            <Icon :name="item.icon" class="w-4 h-4 transition-transform group-hover:scale-110" />
            {{ item.label }}
            <span v-if="item.badge" class="px-1.5 py-0.5 rounded-full text-3xs font-bold" :class="activeTab === item.id ? 'bg-gold-500/20 text-gold-300' : 'bg-charcoal-800 text-charcoal-400'">
              {{ item.badge }}
            </span>
            <span v-if="activeTab === item.id" class="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-400 rounded-full" />
          </button>

          <!-- Nếu đang ở secondary tab, hiện tab đó luôn visible -->
          <button
            v-if="secondaryNavItems.some(s => s.id === activeTab)"
            :key="activeTab"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-gold-500/12 text-gold-400 border border-gold-500/25 shadow-inner shrink-0 group relative"
            :aria-current="'page'"
          >
            <Icon :name="secondaryNavItems.find(s => s.id === activeTab)!.icon" class="w-4 h-4" />
            {{ secondaryNavItems.find(s => s.id === activeTab)!.label }}
            <span class="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-400 rounded-full" />
          </button>

          <!-- Divider -->
          <div class="w-px h-4 bg-charcoal-800 mx-1.5 shrink-0" />

          <!-- "Thêm" dropdown toggle -->
          <button
            class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 relative"
            :class="showSecondaryNav
              ? 'text-gold-400 bg-gold-500/10 border border-gold-500/25'
              : 'text-charcoal-400 hover:text-ivory hover:bg-charcoal-900'"
            :aria-expanded="showSecondaryNav"
            @click="showSecondaryNav = !showSecondaryNav"
          >
            <Icon name="mdi:view-grid-outline" class="w-4 h-4" />
            <span class="hidden sm:inline">Thêm</span>
            <Icon :name="showSecondaryNav ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-3.5 h-3.5" />
          </button>

          <!-- Right utility: Search -->
          <div class="ml-auto shrink-0 flex items-center gap-2 pl-2 border-l border-charcoal-800">
            <button
              class="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-charcoal-800 bg-charcoal-900/60 hover:border-gold-500/40 text-charcoal-400 hover:text-gold-400 text-xs font-semibold transition-all duration-300"
              @click="searchOverlayOpen = true"
              aria-label="Mở tìm kiếm (Cmd+K)"
            >
              <Icon name="mdi:magnify" class="w-4 h-4" />
              <span class="hidden sm:inline">Cmd+K</span>
            </button>
          </div>
        </div>

        <!-- Secondary tabs dropdown panel -->
        <Transition name="slide-down">
          <div v-if="showSecondaryNav" class="flex flex-wrap items-center gap-1 pb-2.5 pt-0.5 border-t border-charcoal-800/60">
            <button
              v-for="item in secondaryNavItems"
              :key="item.id"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 relative"
              :class="activeTab === item.id
                ? 'text-gold-400 bg-gold-500/12 border border-gold-500/25'
                : 'text-charcoal-400 hover:text-ivory hover:bg-charcoal-900'"
              @click="activeTab = item.id; scrollToContent(); showSecondaryNav = false"
              :aria-current="activeTab === item.id ? 'page' : undefined"
            >
              <Icon :name="item.icon" class="w-3.5 h-3.5" />
              {{ item.label }}
              <span v-if="'badge' in item && item.badge" class="px-1 py-0.5 rounded-full text-[9px] font-bold bg-charcoal-800 text-charcoal-400">
                {{ item.badge }}
              </span>
            </button>
          </div>
        </Transition>
      </div>
    </div>


    <!-- ================================================== -->
    <!-- MAIN CONTENT AREA                                  -->
    <!-- ================================================== -->
    <div ref="contentRef" class="max-w-screen-2xl mx-auto px-4 sm:px-6 py-10 space-y-10">

      <!-- ================================================ -->
      <!-- MODULE: HOME / RESEARCH LIBRARY                  -->
      <!-- ================================================ -->
      <div v-if="activeTab === 'research'" class="space-y-10 animate-section-in">

        <!-- DASHBOARD STATS BAR -->
        <section aria-labelledby="dashboard-title">
          <div class="flex items-end justify-between mb-6">
            <div>
              <span id="dashboard-title" class="section-label">Tổng quan học tập</span>
              <h3 class="font-heading text-2xl font-bold text-ivory mt-1">Dashboard Di Sản Số</h3>
            </div>
            <span class="text-charcoal-500 text-3xs font-semibold uppercase tracking-wider hidden sm:block">Chạm để đi đến từng mục</span>
          </div>
          <div class="bg-charcoal-950 border border-charcoal-850 rounded-2xl overflow-x-auto scrollbar-none">
            <div class="flex divide-x divide-charcoal-850 min-w-max sm:min-w-0">
              <button
                v-for="stat in dashboardStats"
                :key="stat.label"
                class="group flex-1 min-w-[132px] flex items-center gap-3 px-5 py-4 hover:bg-charcoal-900/50 transition-colors text-left"
                @click="goToDashboardStat(stat)"
                :aria-label="`Đi đến ${stat.label}`"
              >
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" :class="stat.iconBg">
                  <Icon :name="stat.icon" class="w-5 h-5" :class="stat.iconColor" />
                </div>
                <div class="min-w-0">
                  <span class="block text-xl font-bold font-heading text-ivory group-hover:text-gold-400 transition-colors leading-none">{{ stat.value }}</span>
                  <span class="block text-3xs text-charcoal-400 uppercase tracking-wider mt-1 font-semibold truncate">{{ stat.label }}</span>
                </div>
                <Icon name="mdi:chevron-right" class="w-4 h-4 text-charcoal-600 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all ml-auto shrink-0 hidden sm:block" />
              </button>
            </div>
          </div>
        </section>

        <!-- LEARNING PATH -->
        <section aria-labelledby="learning-path-title">
          <div class="flex items-end justify-between mb-4 gap-4 flex-wrap">
            <div>
              <span class="section-label">Hành trình học tập</span>
              <h3 id="learning-path-title" class="font-heading text-2xl font-bold text-ivory mt-1">Learning Path Di Sản</h3>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs font-bold text-gold-400">{{ completedStepsCount }}/{{ learningPath.length }} hoàn thành</span>
              <div class="w-28 h-1.5 bg-charcoal-850 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-earth-600 to-gold-500 rounded-full transition-all duration-500" :style="{ width: (completedStepsCount / learningPath.length * 100) + '%' }" />
              </div>
            </div>
          </div>
          <div class="relative">
            <!-- Connector line -->
            <div class="hidden lg:block absolute top-10 left-[calc(12.5%)] right-[calc(12.5%)] h-0.5 bg-gradient-to-r from-gold-500/30 via-gold-500/60 to-earth-500/30 z-0" />
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
              <div
                v-for="(step, idx) in learningPath"
                :key="step.title"
                class="group flex flex-col items-center text-center gap-3 cursor-pointer"
                @click="goToLearningStep(step)"
                :aria-label="`Bước ${idx + 1}: ${step.title}`"
              >
                <div
                  class="w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 relative"
                  :class="step.done
                    ? 'bg-gold-500 border-gold-300 shadow-gold/25 shadow-lg'
                    : idx === currentStepIndex
                      ? 'bg-charcoal-900 border-gold-500/70 shadow-lg shadow-gold-500/10 animate-pulse-slow'
                      : 'bg-charcoal-950 border-charcoal-800 group-hover:border-gold-500/50 group-hover:bg-charcoal-900'"
                >
                  <span v-if="step.done" class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-charcoal-900 flex items-center justify-center">
                    <Icon name="mdi:check" class="w-3 h-3 text-white" />
                  </span>
                  <span v-else-if="idx === currentStepIndex" class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold-500 border-2 border-charcoal-900 flex items-center justify-center">
                    <Icon name="mdi:arrow-right" class="w-3 h-3 text-charcoal-950" />
                  </span>
                  <Icon :name="step.icon" class="w-9 h-9 transition-transform group-hover:scale-110" :class="step.done ? 'text-charcoal-950' : idx === currentStepIndex ? 'text-gold-400' : 'text-gold-400/60 group-hover:text-gold-400'" />
                </div>
                <div>
                  <span class="block text-xs font-bold text-ivory leading-snug group-hover:text-gold-400 transition-colors">{{ step.title }}</span>
                  <span class="block text-xs text-charcoal-400 mt-0.5">{{ step.desc }}</span>
                  <span
                    class="inline-block mt-1 text-3xs font-bold px-2 py-0.5 rounded-full"
                    :class="step.done ? 'bg-green-500/10 text-green-400' : idx === currentStepIndex ? 'bg-gold-500/15 text-gold-400' : 'bg-charcoal-900 text-charcoal-500'"
                  >
                    {{ step.done ? 'Hoàn thành' : idx === currentStepIndex ? 'Tiếp theo' : `+${step.xp} XP` }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- RESOURCE LIBRARY -->
        <section aria-labelledby="resource-library-title">
          <div class="flex items-end justify-between mb-6 gap-4 flex-wrap">
            <div>
              <span class="section-label">Thư viện nghiên cứu</span>
              <h3 id="resource-library-title" class="font-heading text-2xl font-bold text-ivory mt-1">Kho Nghiên Cứu Di Sản</h3>
              <p v-if="!pending && !error" class="text-charcoal-400 text-xs mt-1 max-w-md">{{ filteredPapers.length }} tài liệu · Được số hóa từ các đề tài học sinh cấp tỉnh</p>
            </div>
            <!-- View switcher -->
            <div class="flex items-center gap-2 bg-charcoal-950 border border-charcoal-800 p-1 rounded-xl">
              <button v-for="v in (['grid', 'list'] as const)" :key="v" class="px-3 py-1.5 rounded-lg text-2xs font-bold transition-all duration-200" :class="resourceView === v ? 'bg-gold-500 text-charcoal-950' : 'text-charcoal-400 hover:text-ivory'" @click="resourceView = v" :aria-label="`Xem dạng ${v === 'grid' ? 'lưới' : 'danh sách'}`">
                <Icon :name="v === 'grid' ? 'mdi:view-grid' : 'mdi:view-list'" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- ADVANCED FILTER BAR -->
          <div class="bg-charcoal-950/60 backdrop-blur-sm border border-charcoal-850 rounded-2xl p-4 space-y-4 mb-6">
            <!-- Search -->
            <div class="relative">
              <Icon name="mdi:magnify" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-500" />
              <input
                v-model="paperSearchQuery"
                type="text"
                placeholder="Tìm đề tài, tác giả, trường, lĩnh vực nghiên cứu..."
                class="w-full pl-12 pr-4 py-3 bg-charcoal-900 border border-charcoal-800 rounded-xl text-sm text-ivory focus:outline-none focus:border-gold-500/60 transition-colors placeholder-charcoal-400"
              />
              <button v-if="paperSearchQuery" class="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-ivory" @click="paperSearchQuery = ''" aria-label="Xóa tìm kiếm">
                <Icon name="mdi:close" class="w-4 h-4" />
              </button>
            </div>

            <!-- Filter chips row -->
            <div class="flex flex-wrap gap-2">
              <!-- Type filters -->
              <button
                v-for="typeFilter in ['all', ...Object.keys(typeLabels)]"
                :key="typeFilter"
                class="filter-chip"
                :class="activeTypeFilter === typeFilter ? 'filter-chip-active' : 'filter-chip-inactive'"
                @click="activeTypeFilter = typeFilter"
              >
                <Icon v-if="typeFilter !== 'all'" :name="typeIcons[typeFilter] || 'mdi:file'" class="w-3.5 h-3.5" />
                {{ typeFilter === 'all' ? 'Tất cả loại' : typeLabels[typeFilter] }}
              </button>

              <div class="w-px h-5 bg-charcoal-800 mx-1 self-center" />

              <!-- Difficulty filters -->
              <button
                v-for="diff in difficultyFilters"
                :key="diff.id"
                class="filter-chip"
                :class="activeDifficultyFilter === diff.id ? 'filter-chip-active' : 'filter-chip-inactive'"
                @click="activeDifficultyFilter = activeDifficultyFilter === diff.id ? 'all' : diff.id"
              >
                <span :class="diff.color">{{ diff.dot }}</span>
                {{ diff.label }}
              </button>

              <!-- Clear all button -->
              <button
                v-if="paperSearchQuery || activeTypeFilter !== 'all' || activeDifficultyFilter !== 'all'"
                class="ml-auto text-charcoal-500 hover:text-gold-400 text-2xs font-bold flex items-center gap-1 transition-colors"
                @click="paperSearchQuery = ''; activeTypeFilter = 'all'; activeDifficultyFilter = 'all'"
                aria-label="Xóa tất cả bộ lọc"
              >
                <Icon name="mdi:filter-off" class="w-3.5 h-3.5" />
                Xóa lọc
              </button>
            </div>
          </div>

          <!-- Active collection filter banner -->
          <div v-if="activeCollectionFilter" class="flex items-center gap-2 mb-6 px-4 py-2.5 bg-gold-500/10 border border-gold-500/25 rounded-xl">
            <Icon name="mdi:folder-open" class="w-4 h-4 text-gold-400 shrink-0" />
            <span class="text-xs text-ivory font-semibold">Đang xem bộ sưu tập: <span class="text-gold-400">{{ activeCollectionName }}</span></span>
            <button class="ml-auto text-charcoal-400 hover:text-ivory text-2xs font-bold flex items-center gap-1 transition-colors" @click="activeCollectionFilter = null" aria-label="Thoát xem bộ sưu tập">
              <Icon name="mdi:close" class="w-3.5 h-3.5" /> Thoát
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12 animate-pulse">
            <div v-for="i in 3" :key="i" class="bg-charcoal-950/60 border border-charcoal-850 p-6 rounded-2xl h-[380px] flex flex-col justify-between">
              <div>
                <div class="h-4 bg-charcoal-800 rounded w-1/4 mb-4" />
                <div class="h-6 bg-charcoal-800 rounded w-3/4 mb-3" />
                <div class="h-4 bg-charcoal-800 rounded w-full mb-2" />
                <div class="h-4 bg-charcoal-800 rounded w-5/6" />
              </div>
              <div class="h-10 bg-charcoal-800 rounded-xl w-full" />
            </div>
          </div>
          <!-- Loaded State -->
          <template v-else>
            <!-- Featured Spotlight -->
            <template v-if="featuredResource && activeTypeFilter === 'all' && !paperSearchQuery">
              <div
                class="relative overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-br from-charcoal-950 via-charcoal-900/95 to-charcoal-950 cursor-pointer hover:border-gold-500/35 transition-all duration-500 group shadow-2xl shadow-black/40 mb-8"
                @click="openResource(featuredResource)"
                role="button"
                :aria-label="`Mở tài liệu nổi bật: ${featuredResource.title}`"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-gold-500/3 to-transparent group-hover:from-gold-500/6 transition-all duration-500" />
                <div class="absolute -top-20 -right-20 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
                <div class="flex flex-col lg:flex-row gap-0">
                  <!-- Cover image -->
                  <div class="h-56 lg:h-auto lg:w-96 relative overflow-hidden bg-charcoal-900 shrink-0">
                    <NuxtImg :src="featuredResource.coverImage" :alt="featuredResource.title" class="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700" loading="lazy" />
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal-950/80" />
                    <div class="absolute top-4 left-4 flex gap-2">
                      <span class="px-3 py-1.5 bg-gold-500 text-charcoal-950 text-3xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 shadow-lg">
                        <Icon name="mdi:star" class="w-3 h-3" />
                        Nổi Bật
                      </span>
                      <span class="px-3 py-1.5 bg-charcoal-950/80 border border-charcoal-700 text-charcoal-300 text-3xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm">
                        Nghiên Cứu Mới
                      </span>
                    </div>
                  </div>
                  <!-- Content -->
                  <div class="flex-1 p-8 lg:p-10 flex flex-col justify-between gap-6 relative z-10">
                    <div class="space-y-3">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider">{{ featuredResource.subject }}</span>
                        <span class="text-charcoal-400">•</span>
                        <span class="text-charcoal-400 text-3xs">{{ featuredResource.school }}</span>
                        <span class="text-charcoal-400">•</span>
                        <span class="text-charcoal-400 text-3xs">Lớp {{ featuredResource.grade }}</span>
                      </div>
                      <h4 class="font-heading font-bold text-ivory text-2xl leading-snug group-hover:text-gold-300 transition-colors">{{ featuredResource.title }}</h4>
                      <p class="text-charcoal-300 text-sm leading-relaxed line-clamp-2">{{ featuredResource.description }}</p>
                      <!-- AI Summary badge -->
                      <div class="inline-flex items-center gap-2 bg-charcoal-900/80 border border-charcoal-800 px-3 py-2 rounded-xl">
                        <div class="w-5 h-5 rounded-md bg-gold-500/20 flex items-center justify-center">
                          <Icon name="mdi:robot" class="w-3 h-3 text-gold-400" />
                        </div>
                        <span class="text-xs text-charcoal-300 font-body"><span class="font-bold text-gold-400">AI Tóm tắt:</span> {{ featuredResource.motivation }}</span>
                      </div>
                    </div>
                    <!-- Key findings preview -->
                    <div class="space-y-2">
                      <div v-for="(finding, i) in (featuredResource.keyFindings ?? []).slice(0, 2)" :key="i" class="flex items-start gap-2 text-xs text-charcoal-300 leading-relaxed">
                        <Icon name="mdi:check-circle" class="w-4 h-4 text-gold-500/70 shrink-0 mt-0.5" />
                        <span>{{ finding }}</span>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-charcoal-850/60">
                      <div class="flex items-center gap-4 text-3xs text-charcoal-450">
                        <span class="flex items-center gap-1.5"><Icon name="mdi:account-circle-outline" class="w-4 h-4" />{{ featuredResource.author }}</span>
                        <span class="flex items-center gap-1.5"><Icon name="mdi:download-outline" class="w-4 h-4" />{{ featuredResource.downloadCount }} lượt tải</span>
                        <span class="flex items-center gap-1.5"><Icon name="mdi:clock-outline" class="w-4 h-4" />~15 phút đọc</span>
                      </div>
                      <span class="text-gold-400 text-sm font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Đọc & Nghiên Cứu <Icon name="mdi:arrow-right" class="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- No results state -->
            <div v-if="filteredPapers.length === 0" class="text-center py-16 border border-dashed border-charcoal-800 rounded-2xl">
              <Icon name="mdi:file-search-outline" class="w-12 h-12 text-charcoal-400 mx-auto mb-4" />
              <p class="text-charcoal-400 text-sm font-semibold">Không tìm thấy tài liệu phù hợp</p>
              <p class="text-charcoal-400 text-xs mt-1">Thử thay đổi từ khóa hoặc xóa bộ lọc</p>
              <button class="mt-4 px-6 py-2.5 bg-charcoal-900 border border-charcoal-800 text-gold-400 hover:text-gold-300 text-xs font-bold rounded-xl transition-colors" @click="paperSearchQuery = ''; activeTypeFilter = 'all'; activeDifficultyFilter = 'all'">
                Xóa tất cả bộ lọc
              </button>
            </div>

            <!-- Resource Cards Grid / List -->
            <div v-else :class="resourceView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'">
              <div
                v-for="res in filteredPapers"
                :key="res.id"
                class="group relative"
                :class="resourceView === 'grid' ? 'book-container' : ''"
              >
                <!-- GRID VIEW CARD -->
                <div
                  v-if="resourceView === 'grid'"
                  class="bg-charcoal-950/60 border border-charcoal-850 hover:border-gold-500/30 rounded-2xl h-[420px] relative transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer group/card"
                  @click="openResource(res)"
                  role="button"
                  :aria-label="`Mở tài liệu: ${res.title}`"
                >
                  <!-- Cover image -->
                  <div class="h-40 w-full relative overflow-hidden bg-charcoal-900 shrink-0">
                    <NuxtImg :src="res.coverImage" :alt="res.title" class="w-full h-full object-cover opacity-70 group-hover/card:opacity-90 group-hover/card:scale-105 transition-all duration-500" loading="lazy" />
                    <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />
                    <div class="absolute top-3 left-3">
                      <span class="px-2 py-0.5 rounded bg-charcoal-900/80 border border-charcoal-800 text-3xs font-semibold text-gold-400 tracking-wider uppercase backdrop-blur-sm">
                        {{ typeLabels[res.type] }}
                      </span>
                    </div>
                    <div class="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        class="w-7 h-7 rounded-full bg-charcoal-900/80 border border-charcoal-850 text-charcoal-300 hover:text-gold-400 flex items-center justify-center transition-colors shadow-inner backdrop-blur-sm"
                        @click.stop="addToCollectionPrompt(res.id)"
                        aria-label="Thêm vào bộ sưu tập"
                      >
                        <Icon name="mdi:folder-plus-outline" class="w-4 h-4" />
                      </button>
                      <button
                        class="w-7 h-7 rounded-full bg-charcoal-900/80 border border-charcoal-850 text-charcoal-300 hover:text-gold-400 flex items-center justify-center transition-colors shadow-inner backdrop-blur-sm"
                        @click.stop="toggleBookmark(res.id)"
                        :aria-label="savedBooks.includes(res.id) ? 'Bỏ bookmark' : 'Bookmark tài liệu'"
                      >
                        <Icon :name="savedBooks.includes(res.id) ? 'mdi:bookmark' : 'mdi:bookmark-outline'" class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="p-5 flex-1 flex flex-col justify-between min-h-0">
                    <div class="space-y-2">
                      <h4 class="font-heading font-bold text-ivory text-sm leading-snug line-clamp-2 group-hover:text-gold-300 transition-colors">{{ res.title }}</h4>
                      <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-2">{{ res.description }}</p>
                    </div>

                    <!-- Meta + action footer -->
                    <div class="space-y-3 pt-3">
                      <div class="flex items-center gap-2 text-3xs text-charcoal-450 flex-wrap">
                        <span class="flex items-center gap-1"><Icon name="mdi:account-circle-outline" class="w-3.5 h-3.5" />{{ res.author }}</span>
                        <span class="text-charcoal-700">•</span>
                        <span class="flex items-center gap-1"><Icon name="mdi:download-outline" class="w-3.5 h-3.5" />{{ res.downloadCount }} lượt tải</span>
                        <span v-if="res.quizId" class="ml-auto text-3xs px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded font-bold">Quiz</span>
                      </div>
                      <div class="flex items-center justify-between pt-2.5 border-t border-charcoal-850/60">
                        <span class="text-charcoal-500 text-3xs font-semibold truncate max-w-[130px]">{{ res.school }} · Lớp {{ res.grade }}</span>
                        <span class="text-gold-400 text-2xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                          Đọc & Nghiên Cứu <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- LIST VIEW ROW -->
                <div
                  v-else
                  class="flex items-center gap-5 bg-charcoal-950 border border-charcoal-850 rounded-2xl p-4 hover:border-gold-500/30 transition-all duration-300 cursor-pointer group"
                  @click="openResource(res)"
                  role="button"
                  :aria-label="`Mở tài liệu: ${res.title}`"
                >
                  <NuxtImg :src="res.coverImage" :alt="res.title" class="w-20 h-16 object-cover rounded-xl shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-gold-400 text-3xs font-bold uppercase">{{ res.subject }}</span>
                      <span class="text-charcoal-400 text-3xs">•</span>
                      <span class="text-charcoal-500 text-3xs">{{ res.school }}</span>
                    </div>
                    <h4 class="font-heading font-bold text-sm text-ivory truncate group-hover:text-gold-300 transition-colors">{{ res.title }}</h4>
                    <p class="text-charcoal-400 text-xs mt-0.5 truncate">{{ res.author }} · {{ res.downloadCount }} lượt tải · {{ res.fileSize }}</p>
                  </div>
                  <div class="flex items-center gap-3 shrink-0">
                    <button
                      class="w-7 h-7 rounded-full bg-charcoal-900/80 border border-charcoal-850 text-charcoal-500 hover:text-gold-400 flex items-center justify-center transition-colors"
                      @click.stop="addToCollectionPrompt(res.id)"
                      aria-label="Thêm vào bộ sưu tập"
                    >
                      <Icon name="mdi:folder-plus-outline" class="w-3.5 h-3.5" />
                    </button>
                    <span v-if="res.quizId" class="text-3xs px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded font-bold">Quiz</span>
                    <Icon name="mdi:chevron-right" class="w-5 h-5 text-charcoal-400 group-hover:text-gold-400 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </section>

        <!-- HERITAGE LAB TEASER -->
        <section aria-labelledby="lab-title">
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-earth-950 border border-earth-700/20 p-8 md:p-12">
            <div class="absolute -top-20 -right-20 w-80 h-80 bg-earth-700/10 rounded-full blur-3xl" />
            <div class="absolute -bottom-10 -left-10 w-60 h-60 bg-gold-500/5 rounded-full blur-3xl" />
            <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1 space-y-4">
                <span class="section-label">Mới ra mắt</span>
                <h3 id="lab-title" class="font-heading text-3xl font-bold text-ivory">Trải Nghiệm Số Di Sản</h3>
                <p class="text-charcoal-300 text-sm leading-relaxed max-w-lg">Trải nghiệm di sản theo cách hoàn toàn mới — Dòng thời gian tương tác, So sánh xưa & nay và Xem hiện vật 3D được số hóa từ tư liệu thực địa.</p>
                <button class="px-6 py-3 bg-earth-700/30 hover:bg-earth-700/50 border border-earth-600/30 hover:border-earth-500/50 text-earth-200 font-bold rounded-xl text-sm transition-all duration-300 flex items-center gap-2 group" @click="activeTab = 'lab'; scrollToContent()" aria-label="Khám phá Trải Nghiệm Số Di Sản">
                  <Icon name="mdi:flask-outline" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Khám phá ngay
                </button>
              </div>
              <!-- Lab feature pills — chỉ giới thiệu tính năng đã hoạt động -->
              <div class="grid grid-cols-2 gap-3 shrink-0">
                <div v-for="(feat, fi) in labFeatures" :key="fi" class="flex items-center gap-2 bg-charcoal-950/50 border border-charcoal-800 px-3 py-2.5 rounded-xl text-3xs text-charcoal-300 font-semibold">
                  <Icon :name="feat.icon" class="w-4 h-4 text-earth-400 shrink-0" />
                  {{ feat.label }}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- ================================================ -->
      <!-- MODULE: HỘ CHIẾU SỐ DI SẢN (passport tab)        -->
      <!-- ================================================ -->
      <div v-if="activeTab === 'passport'" class="space-y-10 animate-section-in">
        <HeritagePassport />
      </div>

      <!-- ================================================ -->
      <!-- MODULE: KHÁM PHÁ DI SẢN (explore tab)           -->
      <!-- ================================================ -->
      <div v-if="activeTab === 'explore'" class="space-y-10 animate-section-in">
        <!-- Header -->
        <div class="border-b border-charcoal-850 pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <span class="section-label">Tổng quan di sản</span>
            <h3 class="font-heading text-2xl font-bold text-ivory mt-1">Khám Phá Di Sản Thành Phố Đồng Nai</h3>
            <p class="text-charcoal-400 text-xs mt-1 max-w-xl">Tìm hiểu tổng quan 11 di sản đã số hóa — lịch sử, cụm di sản, câu chuyện cộng đồng và hành trình khám phá thực tế.</p>
          </div>
          <NuxtLink to="/library" class="shrink-0 px-5 py-2.5 bg-gold-500/10 border border-gold-500/25 hover:bg-gold-500/20 text-gold-400 font-bold rounded-xl text-sm transition-all inline-flex items-center gap-2">
            <Icon name="mdi:compass-outline" class="w-4 h-4" />
            Xem thư viện di sản
          </NuxtLink>
        </div>

        <!-- Heritage clusters overview -->
        <section aria-labelledby="explore-clusters-title">
          <div class="mb-5">
            <span class="section-label">Cụm di sản</span>
            <h4 id="explore-clusters-title" class="font-heading text-lg font-bold text-ivory mt-1">4 Cụm Di Sản Kết Nối</h4>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="cluster in heritageClusters"
              :key="cluster.id"
              class="group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
              :class="cluster.borderColor"
              @click="navigateTo(`/map?cluster=${cluster.id}`)"
              :aria-label="`Khám phá cụm di sản ${cluster.name}`"
            >
              <div class="absolute inset-0" :class="cluster.bgGradient" />
              <div class="relative z-10 p-5 flex flex-col h-40 justify-between">
                <div>
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :class="cluster.iconBg">
                    <Icon :name="cluster.icon" class="w-5 h-5" :class="cluster.iconColor" />
                  </div>
                  <h5 class="font-heading font-bold text-ivory text-sm leading-snug">{{ cluster.name }}</h5>
                  <p class="text-charcoal-300 text-xs mt-0.5 line-clamp-2">{{ cluster.desc }}</p>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-3xs font-bold uppercase tracking-wider" :class="cluster.tagColor">{{ cluster.tag }}</span>
                  <Icon name="mdi:arrow-right" class="w-4 h-4 text-charcoal-400 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured heritage spotlight -->
        <section aria-labelledby="explore-spotlight-title">
          <div class="mb-5">
            <span class="section-label">Điểm nổi bật</span>
            <h4 id="explore-spotlight-title" class="font-heading text-lg font-bold text-ivory mt-1">Di Sản Đang Được Chú Ý</h4>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              v-for="spot in heritageSpotlights"
              :key="spot.slug"
              class="group relative overflow-hidden rounded-2xl border border-charcoal-800 hover:border-gold-500/30 bg-charcoal-950 cursor-pointer transition-all duration-400 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
              @click="navigateTo(`/heritage/${spot.slug}`)"
              :aria-label="`Xem chi tiết ${spot.name}`"
            >
              <div class="h-36 relative overflow-hidden">
                <NuxtImg :src="spot.image" :alt="spot.name" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-3xs font-bold uppercase tracking-wider border" :class="spot.tagClass">{{ spot.tag }}</span>
                <span v-if="spot.audioGuide" class="absolute top-3 right-3 px-2 py-1 rounded-full text-3xs font-bold bg-charcoal-950/80 border border-gold-500/30 text-gold-400 flex items-center gap-1">
                  <Icon name="mdi:headphones" class="w-3 h-3" />Audio
                </span>
              </div>
              <div class="p-4 space-y-2">
                <h5 class="font-heading font-bold text-sm text-ivory leading-snug group-hover:text-gold-300 transition-colors">{{ spot.name }}</h5>
                <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-2">{{ spot.desc }}</p>
                <div class="flex items-center gap-2 text-3xs text-charcoal-500 pt-1">
                  <Icon name="mdi:map-marker-outline" class="w-3.5 h-3.5 text-gold-500/60" />
                  {{ spot.location }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Community stories -->
        <section aria-labelledby="explore-stories-title">
          <div class="mb-5 flex items-end justify-between">
            <div>
              <span class="section-label">Ký ức cộng đồng</span>
              <h4 id="explore-stories-title" class="font-heading text-lg font-bold text-ivory mt-1">6 Câu Chuyện Truyền Miệng</h4>
            </div>
            <NuxtLink to="/explore" class="text-gold-400 hover:text-gold-300 text-2xs font-bold flex items-center gap-1 transition-colors">
              Xem tất cả <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
              v-for="story in communityStoriesExplore"
              :key="story.id"
              class="bg-charcoal-950 border border-charcoal-800 hover:border-gold-500/25 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
              @click="navigateTo('/explore')"
              :aria-label="story.title"
            >
              <div class="flex items-start gap-3 mb-3">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" :class="story.iconBg">
                  <Icon :name="story.icon" class="w-4.5 h-4.5" :class="story.iconColor" />
                </div>
                <div>
                  <span class="block text-3xs font-bold uppercase tracking-wider" :class="story.iconColor">{{ story.category }}</span>
                  <h5 class="font-heading font-bold text-xs text-ivory group-hover:text-gold-300 transition-colors leading-snug mt-0.5">{{ story.title }}</h5>
                </div>
              </div>
              <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-3">{{ story.excerpt }}</p>
              <div class="flex items-center justify-between mt-3 pt-3 border-t border-charcoal-850">
                <span class="text-3xs text-charcoal-500 flex items-center gap-1">
                  <Icon name="mdi:account-voice" class="w-3.5 h-3.5" />
                  {{ story.narrator }}
                </span>
                <span class="text-gold-400 text-3xs font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Nghe kể <Icon name="mdi:microphone" class="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Quick facts grid -->
        <section aria-labelledby="explore-facts-title">
          <div class="mb-5">
            <span class="section-label">Tổng quan số liệu</span>
            <h4 id="explore-facts-title" class="font-heading text-lg font-bold text-ivory mt-1">Di Sản Trong Con Số</h4>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="fact in heritageFacts" :key="fact.label" class="bg-charcoal-950/60 border border-charcoal-850 rounded-2xl p-5 text-center hover:border-gold-500/20 transition-all duration-300 hover:-translate-y-0.5">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" :class="fact.iconBg">
                <Icon :name="fact.icon" class="w-6 h-6" :class="fact.iconColor" />
              </div>
              <span class="block text-3xl font-bold font-heading text-ivory">{{ fact.value }}</span>
              <span class="block text-3xs text-charcoal-400 mt-1 uppercase tracking-wider font-semibold">{{ fact.label }}</span>
            </div>
          </div>
        </section>

        <!-- CTA to next step -->
        <div class="flex flex-col sm:flex-row items-center gap-4 p-6 bg-gold-500/5 border border-gold-500/20 rounded-2xl">
          <div class="flex-1">
            <p class="font-heading font-bold text-ivory">Sẵn sàng đọc sâu hơn?</p>
            <p class="text-charcoal-400 text-sm mt-1">Tiếp tục hành trình học tập — đọc toàn văn tài liệu nghiên cứu trong Kho Thư Viện.</p>
          </div>
          <button
            class="shrink-0 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold rounded-xl text-sm transition-all duration-300 hover:shadow-gold/30 hover:shadow-lg flex items-center gap-2"
            @click="activeTab = 'research'; scrollToContent()"
            aria-label="Chuyển sang tab Thư Viện để đọc sâu hơn"
          >
            <Icon name="mdi:book-open-variant" class="w-4 h-4" />
            Vào Thư Viện Nghiên Cứu
          </button>
        </div>
      </div>



      <!-- ================================================ -->
      <!-- MODULE: TỪ ĐIỂN S'TIÊNG                         -->
      <!-- ================================================ -->
      <div v-if="activeTab === 'glossary'" class="space-y-8 max-w-6xl mx-auto animate-section-in">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-charcoal-850 pb-5">
          <div>
            <span class="section-label">Ngôn ngữ bản địa</span>
            <h3 class="font-heading text-2xl font-bold text-ivory mt-1">Từ Điển Thuật Ngữ S'tiêng</h3>
            <p class="text-charcoal-400 text-xs mt-1">Học phát âm TTS + thẻ lật 3D tự học</p>
          </div>
          <div class="flex bg-charcoal-950 p-1 border border-charcoal-800 rounded-xl">
            <button class="px-4 py-2 rounded-lg text-2xs font-bold transition-all duration-300" :class="glossaryMode === 'list' ? 'bg-gold-500 text-charcoal-950' : 'text-charcoal-400 hover:text-ivory'" @click="glossaryMode = 'list'">Tra từ điển</button>
            <button class="px-4 py-2 rounded-lg text-2xs font-bold transition-all duration-300" :class="glossaryMode === 'flashcards' ? 'bg-gold-500 text-charcoal-950' : 'text-charcoal-400 hover:text-ivory'" @click="glossaryMode = 'flashcards'">Flashcards 3D</button>
          </div>
        </div>

        <EmptyState v-if="glossary.length === 0" tab="glossary" :userXP="userXP" :streakDays="streakDays" @action="handleEmptyStateAction" />
        <template v-else>
          <!-- LIST -->
          <div v-if="glossaryMode === 'list'" class="space-y-6">
            <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div class="flex flex-wrap gap-2">
                <button v-for="cat in glossaryCategories" :key="cat" class="filter-chip" :class="activeGlossaryCat === cat ? 'filter-chip-active' : 'filter-chip-inactive'" @click="activeGlossaryCat = cat">
                  {{ cat === 'all' ? 'Tất cả từ' : cat }}
                </button>
              </div>
              <div class="relative w-full md:w-80 shrink-0">
                <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input v-model="glossarySearchQuery" type="text" placeholder="Tra nghĩa từ S'tiêng..." class="w-full pl-9 pr-4 py-2.5 bg-charcoal-950 border border-charcoal-800 rounded-xl text-xs text-ivory focus:outline-none focus:border-gold-500/60" />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div v-for="(word, idx) in filteredGlossary" :key="idx" class="bg-charcoal-950 border border-charcoal-800 hover:border-gold-500/35 rounded-2xl p-5 transition-all duration-400 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 group">
                <div class="flex items-start justify-between mb-3">
                  <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-gold-500/10 border border-gold-500/20">{{ word.category }}</span>
                  <button class="w-8 h-8 rounded-xl bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-950 flex items-center justify-center transition-all duration-300 text-gold-400 group-hover:scale-105" title="Nghe phát âm" @click="pronounceTerm(word.term, word.pronunciation)" aria-label="Nghe phát âm">
                    <Icon name="mdi:volume-high" class="w-4 h-4" />
                  </button>
                </div>
                <h4 class="font-heading font-bold text-ivory text-lg">{{ word.term }}</h4>
                <p class="text-charcoal-400 text-xs italic mt-0.5">{{ word.pronunciation }}</p>
                <p class="text-charcoal-300 text-xs leading-relaxed pt-3 border-t border-charcoal-850 mt-3 select-text font-body">{{ word.definition }}</p>
              </div>
            </div>
          </div>

          <!-- FLASHCARDS 3D -->
          <div v-else class="max-w-4xl mx-auto space-y-8 text-center">
            <p class="text-charcoal-400 text-sm">Nhấn vào thẻ để lật và xem định nghĩa thuật ngữ S'tiêng.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div v-for="(card, idx) in filteredGlossary" :key="idx" class="flashcard-container cursor-pointer perspective h-56 animate-section-in" @click="card.isFlipped = !card.isFlipped" :aria-label="`Thẻ từ: ${card.term}`">
                <div class="w-full h-full relative transition-transform duration-500 transform-style-3d rounded-2xl shadow-lg" :class="{ 'rotate-y-180': card.isFlipped }">
                  <div class="absolute inset-0 backface-hidden bg-gradient-to-br from-charcoal-950 to-charcoal-900 border border-charcoal-800 rounded-2xl p-6 flex flex-col justify-between shadow-inner">
                    <div>
                      <span class="text-charcoal-500 text-3xs font-bold uppercase tracking-wider block">Thuật ngữ S'tiêng</span>
                      <h4 class="font-heading font-bold text-gold-400 text-xl mt-2">{{ card.term }}</h4>
                      <p class="text-charcoal-300 text-xs mt-1 italic">{{ card.pronunciation }}</p>
                    </div>
                    <div class="flex items-center justify-between text-charcoal-500 text-3xs font-bold uppercase">
                      <span>{{ card.category }}</span>
                      <span class="text-gold-400 flex items-center gap-1">Lật thẻ <Icon name="mdi:rotate-3d-variant" class="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                  <div class="absolute inset-0 backface-hidden bg-gradient-to-br from-earth-900 to-earth-950 border border-earth-800/60 rounded-2xl p-6 flex flex-col justify-between rotate-y-180">
                    <div>
                      <span class="text-gold-300 text-3xs font-bold uppercase tracking-wider block">Ý nghĩa chi tiết</span>
                      <p class="text-xs text-charcoal-200 leading-relaxed mt-3 line-clamp-4 font-body">{{ card.definition }}</p>
                    </div>
                    <div class="flex items-center justify-between text-charcoal-300 text-3xs font-bold uppercase">
                      <span>{{ card.category }}</span>
                      <span class="text-gold-300 flex items-center gap-1">Lật lại <Icon name="mdi:rotate-3d-variant" class="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- ================================================ -->
      <!-- MODULE: KHO ĐA PHƯƠNG TIỆN                      -->
      <!-- ================================================ -->
      <div v-if="activeTab === 'media'" class="space-y-8 max-w-6xl mx-auto animate-section-in">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-charcoal-850 pb-5">
          <div>
            <span class="section-label">Kho lưu trữ</span>
            <h3 class="font-heading text-2xl font-bold text-ivory mt-1">Đa Phương Tiện Di Sản</h3>
            <p class="text-charcoal-400 text-xs mt-1">Hình ảnh cổ truyền · Video flycam · Audio nhạc cụ bản địa</p>
          </div>
          <div class="flex bg-charcoal-950 p-1 border border-charcoal-800 rounded-xl">
            <button v-for="sub in mediaSubtabs" :key="sub.id" class="px-4 py-2 rounded-lg text-2xs font-bold transition-all duration-300 flex items-center gap-1.5" :class="activeMediaSubtab === sub.id ? 'bg-gold-500 text-charcoal-950' : 'text-charcoal-400 hover:text-ivory'" @click="activeMediaSubtab = sub.id as 'photos' | 'videos' | 'audio'" :aria-label="sub.label">
              <Icon :name="sub.icon" class="w-3.5 h-3.5" />
              {{ sub.label }}
            </button>
          </div>
        </div>

        <EmptyState v-if="imageStories.length === 0" tab="media" :userXP="userXP" :streakDays="streakDays" @action="handleEmptyStateAction" />
        <template v-else>
          <!-- Photos -->
          <div v-if="activeMediaSubtab === 'photos'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(item, idx) in imageStories" :key="idx" class="group relative rounded-3xl overflow-hidden border border-charcoal-800 bg-charcoal-950 cursor-pointer shadow-lg shadow-black/20 h-72 hover:border-gold-500/25 transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40" @click="openImageModal(item)" :aria-label="`Xem ảnh: ${item.title}`">
              <NuxtImg :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" @error="hideOnImageError" />
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />
              <div class="absolute bottom-0 inset-x-0 p-5 space-y-1.5">
                <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider">{{ item.tag }}</span>
                <h4 class="font-heading font-bold text-ivory text-base leading-snug">{{ item.title }}</h4>
              </div>
              <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal-950/70 backdrop-blur-sm border border-charcoal-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="mdi:fullscreen" class="w-4 h-4 text-ivory" />
              </div>
            </div>
          </div>

          <!-- Videos -->
          <div v-else-if="activeMediaSubtab === 'videos'" class="space-y-6">
            <div class="relative w-full aspect-video bg-charcoal-950 border border-charcoal-850 rounded-3xl overflow-hidden group cursor-pointer" @click="startVideoPlayback">
              <NuxtImg src="/images/heritage/danh-thang/thac-dung-lg.webp" alt="Video: Thác Dung Bù Đăng" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" loading="lazy" @error="hideOnImageError" />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-20 h-20 rounded-full bg-charcoal-950/70 backdrop-blur-sm border-2 border-gold-500/50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-gold/20 shadow-xl">
                  <Icon name="mdi:play" class="w-9 h-9 text-gold-400 translate-x-0.5" />
                </div>
              </div>
              <div class="absolute bottom-5 left-5">
                <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider block">Phim Tư Liệu</span>
                <span class="font-heading font-bold text-ivory text-lg">Thác Mơ — Huyền Thoại Dak Mơ</span>
              </div>
              <span class="absolute top-4 right-4 bg-charcoal-950/80 border border-charcoal-700 text-charcoal-300 text-3xs px-2.5 py-1 rounded-full font-bold">5:30</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="video in mockVideos" :key="video.title" class="flex gap-4 p-4 bg-charcoal-950 border border-charcoal-850 rounded-2xl hover:border-gold-500/25 transition-colors cursor-pointer group" @click="startVideoPlayback">
                <div class="w-24 h-16 rounded-xl bg-charcoal-900 overflow-hidden relative shrink-0">
                  <NuxtImg :src="video.thumb" :alt="video.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" @error="hideOnImageError" />
                  <div class="absolute inset-0 flex items-center justify-center bg-charcoal-950/40">
                    <Icon name="mdi:play-circle" class="w-7 h-7 text-gold-400/80" />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <span class="block text-xs font-bold text-ivory group-hover:text-gold-300 transition-colors truncate">{{ video.title }}</span>
                  <span class="text-charcoal-450 text-3xs">{{ video.cat }} • {{ video.duration }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Audio -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            <div v-for="audio in mockAudios" :key="audio.title" class="p-5 rounded-2xl bg-charcoal-950 border border-charcoal-800 flex justify-between items-center hover:border-gold-500/25 transition-colors group">
              <div class="flex items-center gap-4 text-left">
                <div class="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon :name="audio.icon" class="w-6 h-6" />
                </div>
                <div>
                  <span class="block text-xs font-bold text-ivory">{{ audio.title }}</span>
                  <span class="text-charcoal-450 text-3xs font-body">{{ audio.cat }} • {{ audio.duration }}</span>
                </div>
              </div>
              <button class="w-10 h-10 rounded-full bg-charcoal-900 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 flex items-center justify-center transition-all duration-300 shrink-0" @click="playLandmarkAudio(audio.title, 'Bản nhạc di sản ' + audio.title)" :aria-label="`Phát ${audio.title}`">
                <Icon name="mdi:play" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- ================================================ -->
      <!-- MODULE: THÀNH TỰU & GAMIFICATION                -->
      <!-- ================================================ -->
      <div v-if="activeTab === 'achievements'" class="max-w-5xl mx-auto space-y-10 animate-section-in">
        <!-- Profile card -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 border border-gold-500/15 p-8 md:p-10">
          <div class="absolute -top-20 -right-20 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
          <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <!-- Avatar -->
            <div class="relative shrink-0">
              <div class="w-20 h-20 rounded-3xl bg-gradient-to-tr from-earth-700 to-gold-500 flex items-center justify-center font-heading font-bold text-charcoal-900 text-2xl shadow-gold/20 shadow-xl">HS</div>
              <div class="absolute -bottom-2 -right-2 bg-charcoal-950 border border-charcoal-800 px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Icon name="mdi:fire" class="w-4 h-4 text-orange-500 animate-pulse" />
                <span class="text-2xs font-bold text-orange-400">{{ streakDays }}</span>
              </div>
            </div>
            <!-- Info -->
            <div class="flex-1">
              <h3 class="font-heading font-bold text-xl text-ivory">Nhà Khám Phá Di Sản</h3>
              <div class="flex items-center gap-2 mt-1 flex-wrap">
                <span class="text-2xs bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold px-2.5 py-1 rounded-lg uppercase">Cấp độ {{ userLevel }}</span>
                <span class="text-charcoal-300 text-xs">{{ streakDays }} ngày có hoạt động học tập</span>
              </div>
              <!-- XP bar -->
              <div class="mt-4 space-y-1.5">
                <div class="flex justify-between text-3xs text-charcoal-400">
                  <span>Tiến trình lên Cấp {{ userLevel + 1 }}</span>
                  <span class="font-bold text-ivory">{{ userXP % 100 }} / 100 XP</span>
                </div>
                <div class="w-full h-2.5 bg-charcoal-850 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-earth-600 to-gold-500 rounded-full transition-all duration-700 relative" :style="{ width: (userXP % 100) + '%' }">
                    <div class="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Quiz progress badge -->
            <div class="shrink-0 text-center p-5 bg-charcoal-900 border border-charcoal-850 rounded-2xl">
              <Icon name="mdi:shield-star" class="w-10 h-10 text-gold-400 mx-auto" />
              <span class="block text-xs font-bold text-ivory mt-2">Heritage Explorer</span>
              <span class="text-3xs text-charcoal-500">{{ quizStore.userProgress.completedQuizzes.length }}/{{ quizStore.quizzes.length }} quiz hoàn thành</span>
            </div>
          </div>
        </div>

        <!-- Stats mini grid -->
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
          <div v-for="gs in gamificationStats" :key="gs.label" class="bg-charcoal-950 border border-charcoal-850 rounded-2xl p-4 text-center hover:border-charcoal-700 transition-colors">
            <Icon :name="gs.icon" class="w-6 h-6 mx-auto mb-2" :class="gs.color" />
            <span class="block text-lg font-bold font-heading text-ivory">{{ gs.value }}</span>
            <span class="block text-3xs text-charcoal-500 mt-0.5">{{ gs.label }}</span>
          </div>
        </div>

        <!-- Badges -->
        <div v-if="userBadges.length > 0">
          <h4 class="font-heading font-bold text-lg text-ivory mb-4 flex items-center gap-2">
            <Icon name="mdi:trophy-outline" class="w-5 h-5 text-gold-400" />
            Huy Hiệu Đạt Được ({{ userBadges.length }})
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="badge in userBadges" :key="badge.name" class="flex items-center gap-4 p-4 bg-charcoal-950 border border-charcoal-850 rounded-2xl hover:border-gold-500/25 transition-colors" :title="badge.desc">
              <div class="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                <Icon name="mdi:trophy" class="w-6 h-6" />
              </div>
              <div>
                <span class="block text-sm font-bold text-ivory">{{ badge.name }}</span>
                <span class="text-charcoal-500 text-3xs">{{ badge.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Collections -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-heading font-bold text-lg text-ivory">Bộ Sưu Tập Của Tôi</h4>
            <button class="btn-ghost border border-charcoal-800 hover:border-gold-500/40 text-gold-400 text-3xs py-2 px-4 rounded-xl font-bold transition-all" @click="createNewCollection" aria-label="Tạo bộ sưu tập mới">+ Tạo mới</button>
          </div>
          <div v-if="collectionsStore.collections.length === 0" class="text-center py-10 border border-dashed border-charcoal-800 rounded-2xl">
            <Icon name="mdi:folder-plus-outline" class="w-10 h-10 text-charcoal-500 mx-auto mb-3" />
            <p class="text-charcoal-400 text-xs">Chưa có bộ sưu tập nào. Tạo bộ sưu tập rồi bấm biểu tượng <Icon name="mdi:folder-plus-outline" class="w-3.5 h-3.5 inline text-gold-400" /> trên tài liệu để lưu vào đây.</p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div v-for="col in collectionsStore.collections" :key="col.id" class="relative p-5 rounded-2xl bg-charcoal-950 border border-charcoal-800 hover:border-gold-500/25 transition-colors cursor-pointer group" @click="openCollection(col)" role="button" :aria-label="`Mở bộ sưu tập: ${col.name}`">
              <button class="absolute top-4 right-4 w-7 h-7 rounded-full bg-charcoal-900/80 border border-charcoal-850 text-charcoal-500 hover:text-red-400 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100" @click.stop="deleteCollectionPrompt(col)" aria-label="Xóa bộ sưu tập">
                <Icon name="mdi:trash-can-outline" class="w-3.5 h-3.5" />
              </button>
              <Icon name="mdi:folder-outline" class="w-8 h-8 text-gold-400/60 group-hover:text-gold-400 transition-colors mb-3" />
              <span class="block font-heading font-bold text-sm text-ivory mb-1 pr-6">{{ col.name }}</span>
              <span class="text-charcoal-450 text-3xs">{{ col.resourceIds.length }} tài liệu lưu trữ</span>
            </div>
          </div>
        </div>

        <!-- Weekly Challenge -->
        <div class="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-950/30 to-charcoal-950 p-6">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />
          <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <Icon name="mdi:sword-cross" class="w-7 h-7 text-orange-400" />
            </div>
            <div class="flex-1">
              <span class="text-orange-400 text-3xs font-bold uppercase tracking-widest">Thử thách khám phá</span>
              <h5 class="font-heading font-bold text-ivory text-lg mt-0.5">Hoàn thành {{ quizStore.quizzes.length }} quiz di sản để nhận huy hiệu Nhà Khám Phá</h5>
              <div class="flex items-center gap-3 mt-2">
                <div class="flex-1 h-2 bg-charcoal-850 rounded-full overflow-hidden max-w-xs">
                  <div class="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-500" :style="{ width: (quizStore.userProgress.completedQuizzes.length / Math.max(quizStore.quizzes.length, 1) * 100) + '%' }" />
                </div>
                <span class="text-3xs text-charcoal-400">{{ quizStore.userProgress.completedQuizzes.length }} / {{ quizStore.quizzes.length }} hoàn thành</span>
              </div>
            </div>
            <button class="btn-primary text-xs py-2.5 px-5 bg-orange-500 border-orange-400 shrink-0 hover:bg-orange-400" @click="activeTab = 'lessons'; scrollToContent()">Tiếp tục</button>
          </div>
        </div>
      </div>

      <!-- ================================================ -->
      <!-- MODULE: GÓC GIÁO VIÊN                           -->
      <!-- ================================================ -->
      <!-- Teacher tab đã được gộp vào /contribute — xem link trong research tab -->

      <!-- ================================================ -->
      <!-- MODULE: HÀNH TRÌNH BÀI HỌC                      -->
      <!-- ================================================ -->
      <div v-if="activeTab === 'lessons'" class="max-w-5xl mx-auto space-y-8 animate-section-in">
        <div>
          <span class="section-label">Học tập có hướng dẫn</span>
          <h3 class="font-heading text-2xl font-bold text-ivory mt-1">Hành Trình Bài Học Di Sản</h3>
          <p class="text-charcoal-400 text-xs mt-1">"Ít dữ liệu — Nhiều trải nghiệm". Chọn bài để bắt đầu hành trình khám phá.</p>
        </div>

        <EmptyState v-if="lessonCatalog.length === 0" tab="lessons" :userXP="userXP" :streakDays="streakDays" @action="handleEmptyStateAction" />
        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <component
              :is="lesson.hasContent ? NuxtLink : 'div'"
              v-for="lesson in lessonCatalog"
              :key="lesson.id"
              :to="lesson.hasContent ? `/study/lesson/${lesson.id}` : undefined"
              class="group block bg-charcoal-950 border border-charcoal-800 rounded-3xl overflow-hidden transition-all duration-500 relative"
              :class="lesson.hasContent ? 'hover:border-gold-500/35 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60' : 'opacity-60 cursor-not-allowed'"
              :aria-label="lesson.hasContent ? `Bắt đầu bài học: ${lesson.title}` : `${lesson.title} - sắp ra mắt`"
            >
              <div class="h-48 relative overflow-hidden bg-charcoal-900">
                <NuxtImg v-if="lesson.coverImage" :src="lesson.coverImage" :alt="lesson.title" class="w-full h-full object-cover opacity-70 transition-all duration-500" :class="lesson.hasContent ? 'group-hover:opacity-90 group-hover:scale-105' : ''" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />
                <div class="absolute top-3 right-3 flex items-center gap-1.5 bg-charcoal-950/80 border border-charcoal-800 px-2.5 py-1 rounded-full text-3xs backdrop-blur-sm">
                  <Icon name="mdi:clock-outline" class="w-3 h-3 text-charcoal-400" />
                  <span class="text-charcoal-300 font-semibold">~{{ lesson.estimatedMinutes }} phút</span>
                </div>
                <div class="absolute bottom-3 left-4">
                  <span class="text-3xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/15 border border-gold-500/25 px-2.5 py-1 rounded-full backdrop-blur-sm">{{ lesson.subject }}</span>
                </div>
              </div>
              <div class="p-5 space-y-3">
                <h4 class="font-heading font-bold text-sm text-ivory transition-colors leading-snug" :class="lesson.hasContent ? 'group-hover:text-gold-300' : ''">{{ lesson.title }}</h4>
                <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-2">{{ lesson.tldr }}</p>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="block in lesson.availableBlocks" :key="block" class="text-3xs px-2.5 py-0.5 bg-charcoal-900/80 border border-charcoal-800 text-charcoal-500 rounded-full hover:border-charcoal-700 hover:text-charcoal-300 transition-colors">{{ block }}</span>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-charcoal-800/60">
                  <span class="text-gold-400 text-3xs font-bold flex items-center gap-1.5 bg-gold-500/8 border border-gold-500/20 px-2 py-0.5 rounded-full">
                    <Icon name="mdi:star-outline" class="w-3.5 h-3.5" />+{{ lesson.xpReward }} XP
                  </span>
                  <span v-if="lesson.hasContent" class="text-charcoal-500 text-3xs flex items-center gap-1 group-hover:text-gold-400 transition-all duration-300 font-bold group-hover:gap-2">
                    Bắt đầu học <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
                  </span>
                  <span v-else class="text-charcoal-500 text-3xs flex items-center gap-1 font-bold">
                    Sắp ra mắt <Icon name="mdi:clock-outline" class="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </component>
          </div>
          <div class="text-center py-8 border border-dashed border-charcoal-800 rounded-2xl">
            <Icon name="mdi:book-plus-outline" class="w-10 h-10 text-charcoal-400 mx-auto mb-3" />
            <p class="text-charcoal-500 text-sm font-semibold">Thêm bài học đang được biên soạn</p>
            <p class="text-charcoal-400 text-xs mt-1">Dữ liệu di sản sẽ được số hóa vào từng module bài học theo từng giai đoạn</p>
          </div>
        </template>
      </div>

      <!-- ================================================ -->
      <!-- MODULE: HERITAGE LAB (NEW)                       -->
      <!-- ================================================ -->
      <div v-if="activeTab === 'lab'" class="max-w-6xl mx-auto space-y-10 animate-section-in">
        <div>
          <span class="section-label">Công cụ số hóa di sản</span>
          <h3 class="font-heading text-3xl font-bold text-ivory mt-1">Trải Nghiệm Số Di Sản</h3>
          <p class="text-charcoal-300 text-sm mt-2 max-w-2xl leading-relaxed">Trải nghiệm di sản theo cách chưa từng có — Dòng thời gian tương tác, Bản đồ câu chuyện, So sánh xưa & nay, Lời kể nhân chứng và Tham quan ảo được xây dựng từ tư liệu thực địa.</p>
        </div>

        <!-- Lab Features Grid — chỉ hiện các trải nghiệm đã hoạt động, không để "sắp ra mắt" chiếm chỗ ngang hàng -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(labItem, labIdx) in activeLabItems"
            :key="labIdx"
            class="group relative overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-br from-charcoal-950 to-charcoal-900 hover:border-gold-500/40 cursor-pointer hover:-translate-y-1 transition-all duration-400"
            @click="activeLabItem = labItem.id"
            :aria-label="`Mở ${labItem.title}`"
          >
            <div class="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" :class="labItem.gradientBg" />
            <div class="p-6 space-y-4 relative z-10">
              <div class="flex items-start justify-between">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center" :class="labItem.iconBg">
                  <Icon :name="labItem.icon" class="w-6 h-6" :class="labItem.iconColor" />
                </div>
                <span class="text-3xs px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full font-bold uppercase tracking-wider">Hoạt động</span>
              </div>
              <div>
                <h4 class="font-heading font-bold text-ivory text-base group-hover:text-gold-300 transition-colors">{{ labItem.title }}</h4>
                <p class="text-charcoal-400 text-xs mt-1 leading-relaxed">{{ labItem.desc }}</p>
              </div>
              <div class="flex items-center gap-1 text-3xs font-bold text-gold-400">
                Mở trải nghiệm
                <Icon name="mdi:arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        <!-- Sắp ra mắt — gọn thành một dải nhỏ, không cạnh tranh sự chú ý với các tính năng đã hoạt động -->
        <div v-if="comingSoonLabItems.length" class="flex items-center gap-3 flex-wrap bg-charcoal-950/40 border border-dashed border-charcoal-800 rounded-2xl px-5 py-4">
          <span class="text-3xs font-bold uppercase tracking-wider text-charcoal-500 shrink-0">Sắp ra mắt</span>
          <div class="w-px h-4 bg-charcoal-800 shrink-0" />
          <div v-for="(labItem, labIdx) in comingSoonLabItems" :key="labIdx" class="flex items-center gap-1.5 text-2xs text-charcoal-400 font-semibold">
            <Icon :name="labItem.icon" class="w-3.5 h-3.5 text-charcoal-500" />
            {{ labItem.title }}
          </div>
        </div>

        <!-- Active Lab: Timeline -->
        <div v-if="activeLabItem === 'timeline'" class="bg-charcoal-950 border border-charcoal-850 rounded-3xl p-6 md:p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-charcoal-850 pb-4">
            <div>
              <h4 class="font-heading font-bold text-ivory text-xl">Timeline Lịch Sử Đồng Nai</h4>
              <p class="text-charcoal-400 text-xs mt-1">Hành trình lịch sử từ thời kỳ tiền sử đến hiện đại</p>
            </div>
            <button class="text-charcoal-500 hover:text-ivory bg-charcoal-900 rounded-full p-2 border border-charcoal-800 transition-colors shrink-0 flex items-center justify-center cursor-pointer" @click="activeLabItem = null" aria-label="Đóng Timeline">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <div class="px-2 pt-2">
            <InteractiveTimeline :items="mappedHistoryTimeline" />
          </div>
        </div>

        <!-- Active Lab: So Sánh Xưa/Nay -->
        <div v-if="activeLabItem === 'compare'" class="bg-charcoal-950 border border-charcoal-850 rounded-3xl p-6 md:p-8 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-heading font-bold text-ivory text-xl">So Sánh Hình Ảnh Xưa & Nay</h4>
              <p class="text-charcoal-400 text-xs mt-1">Kéo thanh trượt để so sánh và cảm nhận sự thay đổi của di sản qua dòng thời gian (Mô phỏng)</p>
            </div>
            <button class="text-charcoal-500 hover:text-ivory transition-colors" @click="activeLabItem = null" aria-label="Đóng Trình So Sánh">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>
          <BeforeAfterSlider
            historical-image="/images/heritage/Bombo/TAN08217.jpg"
            modern-image="/images/heritage/Bombo/TAN08220.jpg"
          />
        </div>

        <!-- Active Lab: Artifact Hotspot Viewer -->
        <div v-if="activeLabItem === 'artifact'" class="bg-charcoal-950 border border-charcoal-850 rounded-3xl p-6 md:p-8 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-heading font-bold text-ivory text-xl">Trình Xem Hiện Vật Tương Tác</h4>
              <p class="text-charcoal-400 text-xs mt-1">Click vào các điểm số để khám phá đặc tính cấu tạo và giá trị văn hóa của hiện vật</p>
            </div>
            <button class="text-charcoal-500 hover:text-ivory transition-colors" @click="activeLabItem = null" aria-label="Đóng Trình Xem Hiện Vật">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>
          <ArtifactHotspotViewer
            artifact-image="/images/heritage/dan-da-stieng.png"
          />
        </div>

        <!-- Community contribution section -->
        <div class="relative overflow-hidden rounded-3xl border border-charcoal-800 p-8 bg-charcoal-950">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="flex-1 space-y-3">
              <span class="section-label">Cộng đồng đóng góp</span>
              <h4 class="font-heading font-bold text-xl text-ivory">Chia sẻ tư liệu di sản của bạn</h4>
              <p class="text-charcoal-400 text-sm leading-relaxed">Học sinh, giáo viên và nhà nghiên cứu có thể đóng góp tư liệu, phản biện học thuật và chia sẻ bài học để cùng xây dựng kho di sản số Thành Phố Đồng Nai.</p>
              <div class="flex flex-wrap gap-3">
                <NuxtLink to="/contribute" class="px-5 py-2.5 bg-gold-500/10 border border-gold-500/25 hover:bg-gold-500/20 text-gold-400 font-bold rounded-xl text-sm transition-all inline-block">Đóng góp tài liệu</NuxtLink>
                <button class="px-5 py-2.5 bg-charcoal-900 border border-charcoal-800 hover:border-charcoal-700 text-charcoal-300 font-bold rounded-xl text-sm transition-all" @click="searchOverlayOpen = true">Khám phá kho tài liệu</button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 shrink-0">
              <div v-for="cs in communityStats" :key="cs.label" class="bg-charcoal-900 border border-charcoal-850 rounded-2xl p-4 text-center">
                <Icon :name="cs.icon" class="w-6 h-6 mx-auto mb-1.5 text-gold-400" />
                <span class="block text-lg font-bold font-heading text-ivory">{{ cs.value }}</span>
                <span class="text-3xs text-charcoal-500">{{ cs.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================== -->
    <!-- DOCUMENT READER MODAL (Preserved & Upgraded)       -->
    <!-- ================================================== -->
    <Transition name="fade">
      <div v-if="selectedResource" class="fixed inset-0 z-80 flex items-center justify-center p-4" role="dialog" :aria-label="`Đang đọc: ${selectedResource.title}`" aria-modal="true">
        <div class="absolute inset-0 bg-charcoal-950/85 backdrop-blur-sm" @click="selectedResource = null" />
        <div class="relative w-full max-w-4xl bg-charcoal-950 border border-charcoal-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-charcoal-800/80 bg-charcoal-900/60 backdrop-blur-sm relative z-10 shrink-0">
            <span class="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Icon :name="typeIcons[selectedResource.type as keyof typeof typeIcons] || 'mdi:file-document-outline'" class="w-4 h-4" />
              Đọc Trực Tuyến & Nghiên Cứu
            </span>
            <button class="w-8 h-8 rounded-full flex items-center justify-center text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 transition-colors" @click="selectedResource = null" aria-label="Đóng tài liệu">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>
          <!-- Tab Selector -->
          <div class="flex border-b border-charcoal-800 bg-charcoal-950/50 relative z-10 shrink-0">
            <button
              v-for="mt in [{ id: 'overview', icon: 'mdi:information-outline', label: 'Tổng Quan' }, { id: 'document', icon: 'mdi:book-open-page-variant', label: 'Đọc Toàn Văn' }]"
              :key="mt.id"
              class="flex-1 py-3 text-2xs uppercase tracking-widest font-bold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2"
              :class="activeModalTab === mt.id ? 'border-gold-500 text-gold-400 bg-charcoal-900/40' : 'border-transparent text-charcoal-450 hover:text-ivory'"
              @click="activeModalTab = mt.id as 'overview' | 'document'"
            >
              <Icon :name="mt.icon" class="w-4 h-4 text-gold-500" />
              {{ mt.label }}
            </button>
          </div>
          <!-- Modal Body -->
          <div class="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
            <!-- OVERVIEW TAB -->
            <div v-if="activeModalTab === 'overview'" class="space-y-6 max-w-2xl mx-auto">
              <div class="bg-charcoal-900 border border-charcoal-850 p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p class="text-charcoal-450 text-3xs uppercase tracking-wider font-semibold">Biên soạn</p>
                  <p class="font-heading font-bold text-ivory text-sm mt-0.5">{{ selectedResource.author }}</p>
                  <p class="text-charcoal-400 text-3xs mt-0.5">{{ selectedResource.school }} • Lớp {{ selectedResource.grade }}</p>
                </div>
                <div class="text-right">
                  <p class="text-charcoal-450 text-3xs uppercase tracking-wider font-semibold">Môn học</p>
                  <p class="text-gold-400 font-bold text-sm mt-0.5">{{ selectedResource.subject }}</p>
                  <p class="text-charcoal-400 text-3xs mt-0.5">Xuất bản: {{ selectedResource.publishedAt }}</p>
                </div>
              </div>
              <h3 class="font-heading font-bold text-ivory text-xl md:text-2xl leading-snug">{{ selectedResource.title }}</h3>
              <!-- AI Summary panel -->
              <div class="bg-gold-500/5 border border-gold-500/15 rounded-2xl p-4 space-y-2">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-lg bg-gold-500/20 flex items-center justify-center">
                    <Icon name="mdi:robot" class="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <span class="text-3xs font-bold text-gold-400 uppercase tracking-wider">AI Tóm tắt 30 giây</span>
                </div>
                <p class="text-charcoal-200 text-sm leading-relaxed font-body">{{ selectedResource.motivation }}</p>
              </div>
              <div class="space-y-3">
                <span class="text-gold-400 text-3xs uppercase tracking-widest font-bold block">Kết quả điền dã nổi bật</span>
                <ul class="space-y-2">
                  <li v-for="(finding, idx) in selectedResource.keyFindings" :key="idx" class="flex items-start gap-2.5 text-xs text-charcoal-300 leading-relaxed">
                    <div class="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="mdi:check" class="w-3 h-3 text-gold-400" />
                    </div>
                    {{ finding }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- DOCUMENT TAB -->
            <div v-else-if="activeModalTab === 'document'" class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-section-in">
              <div class="lg:col-span-2 space-y-4 flex flex-col items-center">
                <div class="w-full flex items-center justify-between bg-charcoal-900 border border-charcoal-800 px-4 py-2.5 rounded-xl text-xs text-charcoal-400 shadow-inner select-none">
                  <span class="font-semibold flex items-center gap-1.5 text-2xs">
                    <Icon name="mdi:file-pdf-box" class="w-4 h-4 text-red-500" />
                    {{ selectedResource.id }}_heritage_report.pdf
                  </span>
                  <div class="flex items-center gap-3">
                    <button class="hover:text-gold-400 transition-colors cursor-pointer" title="Bút highlight" @click="activeHighlightPen = !activeHighlightPen" :class="activeHighlightPen ? 'text-gold-400' : 'text-charcoal-450'" aria-label="Bật/tắt bút highlight">
                      <Icon name="mdi:pencil-outline" class="w-4 h-4" />
                    </button>
                    <button class="hover:text-gold-400 transition-colors cursor-pointer" @click="downloadFile(selectedResource)" aria-label="Tải tài liệu PDF">
                      <Icon name="mdi:download-outline" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <!-- Premium Academic Paper layout -->
                <div class="w-full min-h-[460px] bg-[#F2EDE6] text-charcoal-900 p-8 md:p-10 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)] border border-beige-300 relative overflow-hidden select-text font-serif">
                  <!-- Watermark text rotated background -->
                  <div class="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none select-none rotate-[-25deg] text-center whitespace-nowrap">
                    <span class="text-charcoal-900 text-3xl font-bold uppercase tracking-[1.5em] block leading-relaxed">
                      {{ selectedResource.school }}<br />
                      NGHIÊN CỨU DI SẢN BÙ ĐĂNG
                    </span>
                  </div>

                  <!-- Authentic Stamp -->
                  <div class="absolute top-8 right-8 w-20 h-20 rounded-full border-4 border-double border-red-600/15 flex flex-col items-center justify-center text-red-600/15 font-bold text-[7px] uppercase tracking-wider rotate-[15deg] pointer-events-none select-none">
                    <span class="leading-none mb-0.5">Hồ Sơ</span>
                    <span class="leading-none mb-0.5 border-y border-red-600/10 py-0.5 px-1 font-extrabold text-[8px]">Di Sản Bù Đăng</span>
                    <span class="leading-none">Số Hóa</span>
                  </div>

                  <!-- Paper Header -->
                  <div class="border-b border-beige-300/80 pb-3 mb-6 flex justify-between items-center text-[10px] text-charcoal-500 uppercase tracking-widest font-heading font-bold select-none">
                    <span>{{ selectedResource.school }}</span>
                    <div class="flex items-center gap-1.5 bg-beige-200/50 rounded-lg p-0.5 border border-beige-300">
                      <span class="text-3xs text-charcoal-500 font-semibold px-1">Cỡ chữ:</span>
                      <button
                        v-for="level in 4"
                        :key="level"
                        class="w-5 h-5 rounded flex items-center justify-center font-bold text-3xs transition-all"
                        :class="fontSizeLevel === level ? 'bg-gold-500 text-charcoal-900 shadow-sm' : 'text-charcoal-500 hover:bg-beige-300'"
                        @click="fontSizeLevel = level"
                        :aria-label="`Cỡ chữ cấp ${level}`"
                      >
                        A{{ level }}
                      </button>
                    </div>
                  </div>
                  
                  <!-- Main text content with serif font for academic feel -->
                  <div
                    class="prose prose-sm max-w-none text-charcoal-800 leading-relaxed text-justify font-serif prose-headings:font-heading prose-headings:text-earth-900 prose-headings:mt-4 prose-headings:mb-2 prose-p:mb-3 prose-blockquote:border-l-4 prose-blockquote:border-l-earth-500 prose-blockquote:bg-earth-500/5 prose-blockquote:p-4 prose-blockquote:my-4 prose-blockquote:italic prose-strong:text-earth-900 prose-ol:list-decimal prose-ol:pl-4 prose-ul:list-disc prose-ul:pl-4"
                    :style="{ fontSize: fontSizeValue }"
                    v-html="selectedResource.pages ? selectedResource.pages[currentDocPage] : '<p>Không tìm thấy toàn văn tài liệu.</p>'"
                    @mouseup="handleTextSelection"
                  />
                </div>
                
                <div class="w-full flex flex-col gap-3 border-t border-charcoal-850 pt-4 select-none">
                  <!-- Page slider controller -->
                  <div v-if="selectedResource.pages && selectedResource.pages.length > 1" class="flex items-center gap-4 px-2">
                    <span class="text-3xs text-charcoal-500 font-bold uppercase tracking-wider">Lật nhanh</span>
                    <input
                      v-model.number="currentDocPage"
                      type="range"
                      min="0"
                      :max="selectedResource.pages.length - 1"
                      class="flex-1 accent-gold-500 h-1 bg-charcoal-850 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <button class="btn-secondary text-xs py-2 px-4 flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none" :disabled="currentDocPage === 0" @click="currentDocPage--" aria-label="Trang trước">
                      <Icon name="mdi:arrow-left" class="w-4 h-4" />Trang Trước
                    </button>
                    <span class="text-charcoal-400 text-xs font-semibold">Trang {{ currentDocPage + 1 }} / {{ selectedResource.pages ? selectedResource.pages.length : 1 }}</span>
                    <button class="btn-secondary text-xs py-2 px-4 flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none" :disabled="currentDocPage === (selectedResource.pages ? selectedResource.pages.length - 1 : 0)" @click="currentDocPage++" aria-label="Trang sau">
                      Trang Sau<Icon name="mdi:arrow-right" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <!-- Notes Sidebar -->
              <div class="space-y-4 bg-charcoal-900 border border-charcoal-850 rounded-2xl p-5 max-h-[500px] overflow-y-auto flex flex-col">
                <div class="space-y-3 flex-1">
                  <div class="flex justify-between items-center pb-2 border-b border-charcoal-850">
                    <span class="text-2xs font-bold uppercase tracking-wider text-charcoal-450 block">Ghi chú & Highlights ({{ bookHighlights.length }})</span>
                    <button
                      v-if="bookHighlights.length > 0"
                      class="px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20 text-3xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      @click="downloadNotes"
                      title="Tải về file .txt các ghi chú này"
                    >
                      <Icon name="mdi:download" class="w-3 h-3" />
                      Tải .TXT
                    </button>
                  </div>
                  <div class="space-y-3 flex-1 overflow-y-auto">
                    <div v-for="hl in bookHighlights" :key="hl.id" class="p-3 bg-charcoal-950 border border-charcoal-850 rounded-xl space-y-1.5 relative group">
                      <button class="absolute top-2 right-2 text-charcoal-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" title="Xóa ghi chú" @click="deleteHighlight(hl.id)" aria-label="Xóa ghi chú này">
                        <Icon name="mdi:close-circle" class="w-4 h-4" />
                      </button>
                      <span class="text-[9px] font-bold text-gold-400 uppercase">Trang {{ hl.page }}</span>
                      <p class="text-xs italic leading-relaxed text-charcoal-300 border-l border-gold-500/40 pl-2">"{{ hl.text }}"</p>
                      <p v-if="hl.note" class="text-xs font-medium text-ivory">👉 {{ hl.note }}</p>
                    </div>
                    <div v-if="bookHighlights.length === 0" class="py-10 text-center text-charcoal-500 text-xs">
                      <Icon name="mdi:pencil-outline" class="w-8 h-8 mx-auto mb-2 text-charcoal-400" />
                      Bôi đen chữ và ghi chú cá nhân!
                    </div>
                  </div>
                </div>
                <div v-if="selectedText" class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-850 space-y-3">
                  <span class="text-[9px] font-bold uppercase tracking-wider text-gold-400 block">Đang highlight</span>
                  <p class="text-xs italic line-clamp-2 text-charcoal-300">"{{ selectedText }}"</p>
                  <input v-model="activeNoteInput" type="text" placeholder="Viết ghi chú ngắn..." class="w-full px-3 py-2 bg-charcoal-900 border border-charcoal-800 rounded-lg text-xs placeholder-charcoal-400 text-ivory focus:outline-none" @keydown.enter="saveActiveNote" />
                  <div class="flex justify-end gap-2 text-3xs">
                    <button class="px-2 py-1 text-charcoal-400 hover:text-ivory transition-colors" @click="selectedText = ''">Hủy</button>
                    <button class="px-3 py-1 bg-gold-500 text-charcoal-950 rounded-lg font-bold hover:bg-gold-400 transition-colors" @click="saveActiveNote">Lưu Note</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-charcoal-800/80 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-between shrink-0">
            <span class="text-charcoal-500 text-xs font-semibold">{{ selectedResource.fileSize }}</span>
            <div class="flex items-center gap-3">
              <button class="btn-ghost text-xs py-2.5" @click="selectedResource = null">Đóng lại</button>
              <button v-if="selectedResource.quizId" class="text-xs py-2.5 px-4 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 transition-all rounded-xl font-bold flex items-center gap-1.5" @click="startResourceQuiz(selectedResource)">
                <Icon name="mdi:play-circle-outline" class="w-4 h-4" />Làm Quiz Ôn Tập
              </button>
              <button class="btn-primary text-xs py-2.5 flex items-center gap-1.5" @click="downloadFile(selectedResource)">
                <Icon name="mdi:download" class="w-4 h-4" />Tải PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- IMAGE MODAL -->
    <Transition name="fade">
      <div v-if="selectedImageItem" class="fixed inset-0 z-80 flex items-center justify-center p-4" role="dialog" :aria-label="`Xem ảnh: ${selectedImageItem.title}`" aria-modal="true">
        <div class="absolute inset-0 bg-charcoal-950/90 backdrop-blur-sm" @click="selectedImageItem = null" />
        <div class="relative w-full max-w-3xl bg-charcoal-950 border border-charcoal-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[85vh] md:h-[450px]">
          <div class="w-full md:w-1/2 h-52 md:h-full relative overflow-hidden bg-charcoal-900 shrink-0">
            <NuxtImg :src="selectedImageItem.image" :alt="selectedImageItem.title" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between text-3xs">
                <span class="text-gold-400 font-bold uppercase tracking-wider">{{ selectedImageItem.tag }}</span>
                <span class="text-charcoal-450 flex items-center gap-1"><Icon name="mdi:map-marker" class="w-3.5 h-3.5 text-gold-500" />Thành Phố Đồng Nai</span>
              </div>
              <h3 class="font-heading font-bold text-ivory text-xl leading-snug">{{ selectedImageItem.title }}</h3>
              <p class="text-charcoal-300 text-sm leading-relaxed text-justify border-t border-charcoal-850 pt-3 select-text">{{ selectedImageItem.story }}</p>
            </div>
            <div class="pt-6 flex justify-end">
              <button class="btn-primary text-xs py-2.5 px-6" @click="selectedImageItem = null">Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useStudySeo } from '~/composables/useMuseumSeo'
import { useSwal } from '~/composables/useSwal'
import { useQuizStore } from '~/stores/quiz'
import { useCollectionsStore } from '~/stores/collections'
import { NuxtLink } from '#components'
import type { SchoolResourceExtended, TextAnnotation, GlossaryTerm, MapLandmark, ImageStory } from '~/types/study'
import {
  typeLabels,
  typeIcons,
  glossaryCategories,
  difficultyFilters,
  fontSizes,
  mediaSubtabs,
  secondaryNavItems,
  lessonCatalogData,
  heritageClusters,
  heritageSpotlights,
  communityStoriesExplore,
  heritageFacts,
  heritageLabItems,
  historyTimeline,
  staticResources,
  glossaryData,
  imageStoriesData,
  mockVideos,
  mockAudios,
} from '~/data/studyData'

// Inject EducationalOrganization + LearningResource schema
useStudySeo()

const route = useRoute()
const { observeAll } = useScrollReveal()
const swal = useSwal()
const quizStore = useQuizStore()
const collectionsStore = useCollectionsStore()

// Refs for scroll navigation
const stickyNavRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)

function scrollToContent() {
  if (import.meta.client && contentRef.value) {
    const top = contentRef.value.getBoundingClientRect().top + window.scrollY - 130
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

let keydownHandler: (e: KeyboardEvent) => void
let scrollHandler: () => void

onMounted(() => {
  nextTick(() => observeAll())
  if (route.query.tab && navItems.value.some(i => i.id === route.query.tab)) {
    activeTab.value = route.query.tab as string
  }
  if (import.meta.client) {
    keydownHandler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchOverlayOpen.value = true
      }
    }
    window.addEventListener('keydown', keydownHandler)

    isScrolled.value = window.scrollY > 50
    scrollHandler = () => {
      isScrolled.value = window.scrollY > 50
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    if (keydownHandler) {
      window.removeEventListener('keydown', keydownHandler)
    }
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
    }
  }
})

watch(() => route.query.tab, (newTab) => {
  if (newTab && navItems.value.some(i => i.id === newTab)) {
    activeTab.value = newTab as string
    scrollToContent()
  }
})

// ──────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────
const activeTab = ref('lessons')
const showSecondaryNav = ref(false)

// Gamification derived from REAL persisted quiz progress (quizStore, LocalStorage) —
// no fabricated numbers. XP formula: 10/point + 5/heritage visited + 50/badge.
const userXP = computed(() =>
  quizStore.userProgress.totalScore * 10
  + quizStore.userProgress.visitedHeritages.length * 5
  + quizStore.userProgress.earnedBadges.length * 50,
)
const userLevel = computed(() => Math.floor(userXP.value / 100) + 1)
// Number of distinct days with at least one quiz completed
const streakDays = computed(() =>
  new Set(quizStore.quizResults.map(r => r.completedAt.slice(0, 10))).size,
)
const searchOverlayOpen = ref(false)
const resourceView = ref<'grid' | 'list'>('grid')
const activeLabItem = ref<string | null>(null)

// Search/Filter
const paperSearchQuery = ref('')
const activeTypeFilter = ref('all')
const activeDifficultyFilter = ref('all')
const glossarySearchQuery = ref('')
const activeGlossaryCat = ref('all')
const glossaryMode = ref<'list' | 'flashcards'>('list')
const activeHighlightPen = ref(false)

// Lesson catalog
const lessonCatalog = ref(lessonCatalogData)

// Real badges earned through quizzes (persisted by quizStore)
const userBadges = computed(() =>
  quizStore.earnedBadges.map((b) => ({
    name: b.name,
    desc: b.description,
    date: b.rarity === 'legendary' ? 'Huyền thoại' : b.rarity === 'epic' ? 'Sử thi' : b.rarity === 'rare' ? 'Hiếm' : 'Phổ thông',
  })),
)

const activeCollectionFilter = ref<string | null>(null)
const activeCollectionName = computed(() =>
  activeCollectionFilter.value ? (collectionsStore.getById(activeCollectionFilter.value)?.name ?? '') : '',
)

// 9 tabs — 'passport' tab for Digital Heritage Passport
// 3 primary core tabs — mọi người dùng đều cần; secondary tabs còn lại vẫn accessible
const primaryNavItems = computed(() => [
  { id: 'lessons', label: 'Bài Học', icon: 'mdi:book-open-variant', badge: 'Mới' },
  { id: 'research', label: 'Thư Viện', icon: 'mdi:library-outline', badge: String(allResources.value.length) },
])

// Unified navItems for template (all tabs, primary first)
const navItems = computed(() => [
  ...primaryNavItems.value,
  ...secondaryNavItems,
])

// ──────────────────────────────────────────────
// STATIC DATA: Dashboard, Hero, Gamification
// ──────────────────────────────────────────────
const heroStats = computed(() => [
  { value: String(allResources.value.length), label: 'Tài liệu' },
  { value: String(lessonCatalog.value.length), label: 'Bài học' },
  { value: String(allResources.value.reduce((sum, r) => sum + (r.downloadCount ?? 0), 0)), label: 'Lượt tải' },
  { value: String(mapLandmarks.value.length), label: 'Địa danh' },
])

const dashboardStats = computed(() => [
  { value: String(allResources.value.length), label: 'Nghiên cứu', icon: 'mdi:file-document-outline', iconBg: 'bg-gold-500/10', iconColor: 'text-gold-400', tab: 'research' },
  { value: String(lessonCatalog.value.length), label: 'Bài học', icon: 'mdi:school-outline', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', tab: 'lessons' },
  { value: String(allResources.value.reduce((sum, r) => sum + (r.downloadCount ?? 0), 0)), label: 'Lượt tải', icon: 'mdi:download-outline', iconBg: 'bg-green-500/10', iconColor: 'text-green-400', tab: 'research' },
  { value: String(mapLandmarks.value.length), label: 'Địa danh', icon: 'mdi:map-marker-outline', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', href: '/map' },
  { value: String(glossary.value.length), label: 'Flashcard', icon: 'mdi:cards-outline', iconBg: 'bg-earth-500/10', iconColor: 'text-earth-400', tab: 'glossary' },
  { value: String(quizStore.badges.length), label: 'Huy hiệu', icon: 'mdi:trophy-outline', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400', tab: 'achievements' },
])

function goToDashboardStat(stat: { tab?: string; href?: string }) {
  if (stat.href) {
    navigateTo(stat.href)
    return
  }
  if (stat.tab) {
    activeTab.value = stat.tab
    scrollToContent()
  }
}

function goToLearningStep(step: { tab: string; action?: string }) {
  if (step.action === 'quiz') {
    const nextQuiz = quizStore.quizzes.find(q => !quizStore.userProgress.completedQuizzes.includes(q.id)) ?? quizStore.quizzes[0]
    if (nextQuiz) {
      quizStore.startQuiz(nextQuiz)
      return
    }
  }
  if (step.action === 'read') {
    activeTab.value = step.tab
    const unread = resources.value.find(r => !quizStore.userProgress.visitedHeritages.includes(r.id))
    const target = unread ?? featuredResource.value ?? resources.value[0]
    if (target) {
      nextTick(() => openResource(target))
      return
    }
  }
  activeTab.value = step.tab
  scrollToContent()
}

// "done" states derive from real persisted progress in quizStore
const learningPath = computed(() => [
  { title: 'Khám phá', desc: 'Tìm hiểu tổng quan', icon: 'mdi:compass-outline', tab: 'explore', xp: 20, done: quizStore.userProgress.visitedHeritages.length > 0 },
  { title: 'Hiểu sâu', desc: 'Đọc toàn văn tài liệu', icon: 'mdi:book-open-variant', tab: 'research', action: 'read', xp: 40, done: quizStore.userProgress.visitedHeritages.length >= 3 },
  { title: 'Nghiên cứu', desc: 'Đọc tài liệu gốc PDF', icon: 'mdi:magnify', tab: 'research', xp: 60, done: false },
  { title: 'Từ điển S\'tiêng', desc: 'Học thuật ngữ bản địa', icon: 'mdi:translate', tab: 'glossary', xp: 80, done: false },
  { title: 'Làm Quiz', desc: 'Kiểm tra hiểu biết', icon: 'mdi:help-circle-outline', tab: 'lessons', action: 'quiz', xp: 100, done: quizStore.userProgress.completedQuizzes.length > 0 },
  { title: 'Nhận huy hiệu', desc: 'Chứng chỉ di sản', icon: 'mdi:trophy', tab: 'achievements', xp: 150, done: quizStore.userProgress.earnedBadges.length > 0 },
])

const completedStepsCount = computed(() => learningPath.value.filter(s => s.done).length)
const currentStepIndex = computed(() => {
  const idx = learningPath.value.findIndex(s => !s.done)
  return idx
})

const activeLabItems = heritageLabItems.filter(i => i.active)
const comingSoonLabItems = heritageLabItems.filter(i => !i.active)
const labFeatures = activeLabItems.map(i => ({ label: i.title, icon: i.icon }))

const gamificationStats = computed(() => [
  { label: 'Tổng XP', value: String(userXP.value), icon: 'mdi:star', color: 'text-gold-400' },
  { label: 'Huy hiệu', value: String(quizStore.userProgress.earnedBadges.length), icon: 'mdi:trophy', color: 'text-orange-400' },
  { label: 'Di sản đã xem', value: String(quizStore.userProgress.visitedHeritages.length), icon: 'mdi:book-open', color: 'text-blue-400' },
  { label: 'Quiz đã làm', value: String(quizStore.userProgress.completedQuizzes.length), icon: 'mdi:help-circle', color: 'text-purple-400' },
  { label: 'Ngày hoạt động', value: String(streakDays.value), icon: 'mdi:fire', color: 'text-orange-500' },
  { label: 'Cấp độ', value: String(userLevel.value), icon: 'mdi:shield-star', color: 'text-green-400' },
])

const communityStats = computed(() => [
  { label: 'Tài liệu số hóa', value: String(resources.value.length), icon: 'mdi:file-document-outline' },
  { label: 'Bài học tương tác', value: String(lessonCatalog.value.length), icon: 'mdi:book-open-variant' },
  { label: 'Từ vựng S\'tiêng', value: String(glossary.value.length), icon: 'mdi:translate' },
  { label: 'Quiz di sản', value: String(quizStore.quizzes.length), icon: 'mdi:help-circle-outline' },
])

// ──────────────────────────────────────────────
// MODAL STATE
// ──────────────────────────────────────────────
const selectedResource = ref<SchoolResourceExtended | null>(null)
const activeModalTab = ref<'overview' | 'document'>('overview')
const currentDocPage = ref(0)
const fontSizeLevel = ref(2)
const fontSizeValue = computed(() => fontSizes[fontSizeLevel.value - 1])

onMounted(() => {
  const saved = localStorage.getItem('study-reader-font-size')
  if (saved) {
    const val = parseInt(saved, 10)
    if (val >= 1 && val <= 4) fontSizeLevel.value = val
  }
})

watch(fontSizeLevel, (newVal) => {
  localStorage.setItem('study-reader-font-size', newVal.toString())
})

const selectedText = ref('')
const activeNoteInput = ref('')

const userAnnotations = ref<TextAnnotation[]>([])
const bookHighlights = computed(() => {
  if (!selectedResource.value) return []
  return userAnnotations.value.filter(hl => hl.bookId === selectedResource.value?.id)
})

const mappedHistoryTimeline = computed(() => {
  return historyTimeline.map(item => ({
    date: item.year,
    event: item.title,
    detail: item.desc
  }))
})

function handleTextSelection() {
  if (!activeHighlightPen.value) return
  const selection = window.getSelection()
  if (selection && selection.toString().trim().length > 3) {
    selectedText.value = selection.toString().trim()
  }
}

function saveActiveNote() {
  if (!selectedResource.value || !selectedText.value) return
  userAnnotations.value.push({ id: 'note-' + Date.now(), bookId: selectedResource.value.id, page: currentDocPage.value + 1, text: selectedText.value, note: activeNoteInput.value.trim() || undefined })
  selectedText.value = ''; activeNoteInput.value = ''
  swal.fire({ title: 'Đã lưu ghi chú!', text: '+15 XP cho tinh thần tự học.', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, background: '#221D17', color: '#F5F1EA' })
}

function deleteHighlight(id: string) { userAnnotations.value = userAnnotations.value.filter(hl => hl.id !== id) }

function downloadNotes() {
  if (!selectedResource.value || bookHighlights.value.length === 0) return
  
  let content = `GHI CHÚ HỌC TẬP - DI SẢN BÙ ĐĂNG\n`
  content += `Tài liệu: ${selectedResource.value.title}\n`
  content += `Trường: ${selectedResource.value.school} | Tác giả: ${selectedResource.value.author}\n`
  content += `Ngày tải ghi chú: ${new Date().toLocaleDateString('vi-VN')}\n`
  content += `=========================================\n\n`
  
  bookHighlights.value.forEach((hl, i) => {
    content += `[Ghi chú #${i + 1}] Trang ${hl.page}\n`
    content += `Đoạn trích: "${hl.text}"\n`
    if (hl.note) {
      content += `Bình luận: ${hl.note}\n`
    }
    content += `-----------------------------------------\n\n`
  })
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Ghi-chu-${selectedResource.value.id}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ──────────────────────────────────────────────
// RESOURCES DATA
// ──────────────────────────────────────────────
const { data: resourcesContent, pending, error, refresh } = await useAsyncData('school-resources', () => {
  return queryCollection('school').all()
})

const resources = computed<SchoolResourceExtended[]>(() => {
  // Use CMS data when available, fall back to static resources
  if (resourcesContent.value && resourcesContent.value.length >= 8) {
    return resourcesContent.value.map(item => {
      const raw = item as any
      const meta = raw.meta ?? {}
      const id = raw.stem?.split('/').pop() ?? raw.id
      return {
        id,
        title: item.title,
        description: item.description,
        type: meta.type,
        subject: meta.subject,
        grade: meta.grade,
        school: meta.school,
        author: meta.author,
        coverImage: meta.coverImage,
        publishedAt: meta.publishedAt,
        featured: meta.featured,
        downloadCount: meta.downloadCount,
        fileSize: meta.fileSize,
        difficulty: meta.difficulty,
        motivation: meta.motivation,
        keyFindings: meta.keyFindings || [],
        quizId: meta.quizId,
        pages: meta.pages || []
      }
    })
  }
  return staticResources
})

// allResources is an alias used for counts/stats — always returns data
const allResources = computed(() => resources.value.length > 0 ? resources.value : staticResources)

const featuredResource = computed(() => resources.value.find(r => r.featured) ?? null)

const filteredPapers = computed(() => {
  const q = paperSearchQuery.value.trim().toLowerCase()
  const type = activeTypeFilter.value
  const diff = activeDifficultyFilter.value
  const diffMap: Record<string, number> = { easy: 1, medium: 2, hard: 3 }
  const featuredId = featuredResource.value?.id
  const activeCollection = activeCollectionFilter.value ? collectionsStore.getById(activeCollectionFilter.value) : null
  return resources.value.filter(res => {
    if (activeCollection) return activeCollection.resourceIds.includes(res.id)
    if (res.id === featuredId && type === 'all' && !q) return false
    const matchesType = type === 'all' || res.type === type
    const matchesDiff = diff === 'all' || (res.difficulty || 2) === diffMap[diff]
    const matchesQuery = !q || res.title.toLowerCase().includes(q) || res.author.toLowerCase().includes(q) || res.school.toLowerCase().includes(q) || res.subject.toLowerCase().includes(q)
    return matchesType && matchesDiff && matchesQuery
  })
})

// ──────────────────────────────────────────────
// GLOSSARY & 3D FLASHCARDS
// ──────────────────────────────────────────────
const glossary = ref<GlossaryTerm[]>(glossaryData)

const filteredGlossary = computed(() => glossary.value.filter(word => {
  const matchesCat = activeGlossaryCat.value === 'all' || word.category === activeGlossaryCat.value
  const q = glossarySearchQuery.value.toLowerCase().trim()
  const matchesSearch = !q || word.term.toLowerCase().includes(q) || word.pronunciation.toLowerCase().includes(q)
  return matchesCat && matchesSearch
}))

// ──────────────────────────────────────────────
// MAP LANDMARKS
// ──────────────────────────────────────────────
const mapLandmarks = ref<MapLandmark[]>([
  { id: 'site-1', name: 'Sóc Bom Bo', desc: 'Địa danh lịch sử hào hùng, nơi đồng bào dân tộc S\'tiêng đốt đuốc giã gạo thâu đêm suốt sáng để nuôi quân kháng chiến cứu nước.', icon: 'mdi:fire', x: 25, y: 35, audioGuide: true, paper: resources.value[2] },
  { id: 'site-2', name: 'Trảng Cỏ Bù Lạch', desc: 'Tuyệt tác thiên nhiên hoang sơ rộng gần 140 ha ôm trọn lòng hồ nước ngọt trong lành nằm giữa rừng già nguyên sinh Bù Đăng.', icon: 'mdi:nature', x: 50, y: 20, paper: resources.value[1] },
  { id: 'site-3', name: 'Thác Mơ Bù Đăng', desc: 'Ngọn thác hùng vĩ, biểu tượng của sự sống và ước mơ, cội nguồn dòng nước Dak Mơ trong huyền thoại S\'tiêng bản địa.', icon: 'mdi:water', x: 70, y: 55, audioGuide: true },
  { id: 'site-4', name: 'Căn Cứ Chiến Khu Đ', desc: 'Căn cứ quân sự kháng chiến bảo đảm an toàn cho lực lượng cách mạng nằm ẩn sâu trong lòng rừng nguyên sinh Xã Bù Đăng.', icon: 'mdi:shield-outline', x: 15, y: 70, paper: resources.value[0] }
])

// ──────────────────────────────────────────────
// MEDIA
// ──────────────────────────────────────────────
const imageStories = ref<ImageStory[]>(imageStoriesData)
const selectedImageItem = ref<ImageStory | null>(null)
function hideOnImageError(e: string | Event) {
  if (e instanceof Event) (e.target as HTMLImageElement).style.display = 'none'
}

const activeMediaSubtab = ref('photos')



// ──────────────────────────────────────────────
// GAMIFICATION / BOOKMARKS
// ──────────────────────────────────────────────
const savedBooks = ref<string[]>(['res-001'])
function toggleBookmark(id: string) {
  savedBooks.value = savedBooks.value.includes(id) ? savedBooks.value.filter(b => b !== id) : [...savedBooks.value, id]
}

function createNewCollection() {
  swal.fire({ title: 'Tạo bộ sưu tập học tập', input: 'text', inputPlaceholder: 'Nhập tên bộ sưu tập...', showCancelButton: true, confirmButtonText: 'Tạo thư mục', cancelButtonText: 'Hủy', confirmButtonColor: '#C7A664' }).then((result) => {
    if (result.isConfirmed && result.value) collectionsStore.createCollection(result.value)
  })
}

function openCollection(col: { id: string }) {
  activeCollectionFilter.value = col.id
  activeTab.value = 'research'
  scrollToContent()
}

function deleteCollectionPrompt(col: { id: string; name: string }) {
  swal.fire({ title: `Xóa bộ sưu tập "${col.name}"?`, text: 'Các tài liệu bên trong sẽ không bị xóa, chỉ bộ sưu tập bị gỡ bỏ.', icon: 'warning', showCancelButton: true, confirmButtonText: 'Xóa', cancelButtonText: 'Hủy', confirmButtonColor: '#C7A664' }).then((result) => {
    if (result.isConfirmed) {
      collectionsStore.deleteCollection(col.id)
      if (activeCollectionFilter.value === col.id) activeCollectionFilter.value = null
    }
  })
}

function addToCollectionPrompt(resourceId: string) {
  const existing = collectionsStore.collections
  const inputOptions: Record<string, string> = {}
  existing.forEach((c) => { inputOptions[c.id] = c.name })

  swal.fire({
    title: 'Thêm vào bộ sưu tập',
    input: 'select',
    inputOptions,
    inputPlaceholder: existing.length ? 'Chọn bộ sưu tập...' : 'Chưa có bộ sưu tập nào',
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: 'Thêm',
    denyButtonText: '+ Tạo mới',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#C7A664',
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      collectionsStore.addResource(result.value, resourceId)
      swal.fire({ title: 'Đã thêm vào bộ sưu tập!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 1800, background: '#221D17', color: '#F5F1EA' })
    } else if (result.isDenied) {
      createCollectionAndAdd(resourceId)
    }
  })
}

function createCollectionAndAdd(resourceId: string) {
  swal.fire({ title: 'Tạo bộ sưu tập học tập', input: 'text', inputPlaceholder: 'Nhập tên bộ sưu tập...', showCancelButton: true, confirmButtonText: 'Tạo & thêm', cancelButtonText: 'Hủy', confirmButtonColor: '#C7A664' }).then((result) => {
    if (result.isConfirmed && result.value) {
      const col = collectionsStore.createCollection(result.value)
      collectionsStore.addResource(col.id, resourceId)
    }
  })
}

// ──────────────────────────────────────────────
// MEDIA PLAYER
// ──────────────────────────────────────────────
function startVideoPlayback() { swal.fire({ title: 'Phát phim tư liệu', text: 'Đang khởi chạy trình phát video tư liệu di tích...', icon: 'info', confirmButtonColor: '#C7A664' }) }

function playLandmarkAudio(title: string, desc: string) {
  if (import.meta.client && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(desc.slice(0, 150))
    utterance.lang = 'vi-VN'; utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }
  swal.fire({ title: `Đang phát: "${title}"`, text: 'Giọng đọc TTS đang phát thuyết minh.', icon: 'success', background: '#221D17', color: '#F5F1EA', confirmButtonColor: '#C7A664', confirmButtonText: 'Đóng' }).then(() => {
    if (import.meta.client && 'speechSynthesis' in window) window.speechSynthesis.cancel()
  })
}

function pronounceTerm(term: string, _pronunciation: string) {
  if (import.meta.client && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(term)
    utterance.lang = 'vi-VN'; utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }
  swal.fire({ title: `Phát âm: "${term}"`, icon: 'info', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, background: '#221D17', color: '#F5F1EA' })
}

function openResource(res: SchoolResourceExtended) {
  selectedResource.value = res
  activeModalTab.value = 'overview'
  currentDocPage.value = 0
  quizStore.markHeritageVisited(res.id)
}

function downloadFile(resource: SchoolResourceExtended) {
  resource.downloadCount++
  if (resource.fileUrl) {
    const a = document.createElement('a')
    a.href = resource.fileUrl
    a.download = resource.fileUrl.split('/').pop() ?? resource.title
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } else {
    swal.fire({ title: 'Tải tài liệu thành công!', html: `Hệ thống đang chuẩn bị tải PDF <strong>"${resource.title}"</strong> (${resource.fileSize ?? '2.4 MB'}).`, icon: 'success', background: '#221D17', color: '#F5F1EA', confirmButtonColor: '#C7A664', confirmButtonText: 'Đóng lại' })
  }
}

function startResourceQuiz(resource: SchoolResourceExtended) {
  if (!resource.quizId) return
  const targetQuiz = quizStore.quizzes.find(q => q.id === resource.quizId)
  if (targetQuiz) {
    selectedResource.value = null
    nextTick(() => quizStore.startQuiz(targetQuiz))
  } else {
    swal.fire({ title: 'Thông báo', text: 'Hiện tại chưa có bộ câu hỏi cho đề tài này.', icon: 'info', background: '#221D17', color: '#F5F1EA', confirmButtonColor: '#C7A664' })
  }
}

function openImageModal(item: ImageStory) { selectedImageItem.value = item }

function handleEmptyStateAction(actionType: string, payload?: string) {
  if (actionType === 'explore-heritage') searchOverlayOpen.value = true
  else if (['ask-ai', 'ask-ai-topic', 'send-prompt'].includes(actionType)) { navigateTo('/?ai=true') }
  else if (['open-map', 'explore-map', 'explore-roadmap'].includes(actionType)) { navigateTo('/map') }
  else if (actionType === 'start-learning') { activeTab.value = 'lessons'; scrollToContent() }
  else if (actionType === 'pronounce-word') { if (payload) pronounceTerm(payload, '') }
  else if (actionType === 'teacher-activity') { swal.fire({ title: payload || 'Hoạt động giáo viên', text: `Tính năng "${payload}" đang phát triển.`, icon: 'info', background: '#221D17', color: '#F5F1EA', confirmButtonColor: '#C7A664' }) }
}
</script>

<style scoped>
/* ────────────────────────────────── */
/* HERO ANIMATIONS                    */
/* ────────────────────────────────── */
@keyframes slowZoom {
  from { transform: scale(1.05); }
  to { transform: scale(1.12); }
}

@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ────────────────────────────────── */
/* SECTION ANIMATION                  */
/* ────────────────────────────────── */
.animate-section-in {
  animation: sectionFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes sectionFadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ────────────────────────────────── */
/* SECTION LABEL                      */
/* ────────────────────────────────── */
:deep(.section-label),
.section-label {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgb(201 146 42 / 0.8);
  background: rgb(201 146 42 / 0.07);
  border: 1px solid rgb(201 146 42 / 0.2);
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
}

/* ────────────────────────────────── */
/* FILTER CHIPS                       */
/* ────────────────────────────────── */
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.875rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: all 0.25s;
  cursor: pointer;
  white-space: nowrap;
}

.filter-chip-active {
  background: rgb(201 146 42);
  color: rgb(15 13 10);
  box-shadow: 0 2px 12px rgb(201 146 42 / 0.25);
}

.filter-chip-inactive {
  background: rgb(13 11 9);
  border: 1px solid rgb(40 37 32);
  color: rgb(140 130 112);
}

.filter-chip-inactive:hover {
  color: rgb(253 250 243);
  border-color: rgb(70 65 55);
}

/* ────────────────────────────────── */
/* BOOK 3D CARD EFFECT                */
/* ────────────────────────────────── */
.book-container {
  perspective: 1200px;
}

.premium-card {
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.55s ease, border-color 0.3s;
}

.premium-card:hover {
  transform: rotateY(-12deg) rotateX(3deg) translateY(-6px);
  box-shadow: -14px 18px 28px rgba(10, 8, 5, 0.4), 0 8px 20px rgba(201, 169, 106, 0.08);
}

.book-spine {
  position: absolute;
  top: 0; left: 0;
  width: 14px; height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(255,255,255,0.08) 100%);
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: inset 1px 0 0 rgba(255,255,255,0.08);
  z-index: 10;
}

/* ────────────────────────────────── */
/* 3D FLASHCARDS                      */
/* ────────────────────────────────── */
.perspective { perspective: 1000px; }

.transform-style-3d {
  transform-style: preserve-3d;
  transition: transform 0.5s ease, box-shadow 0.3s ease;
}

.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }

.flashcard-container:hover .transform-style-3d {
  box-shadow: 0 0 24px rgba(201, 169, 106, 0.35);
}

/* ────────────────────────────────── */
/* MODAL TRANSITIONS                  */
/* ────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ────────────────────────────────── */
/* SCROLLBAR HIDE                     */
/* ────────────────────────────────── */
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

/* ────────────────────────────────── */
/* BUTTONS                            */
/* ────────────────────────────────── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgb(201 146 42);
  color: rgb(15 13 10);
  font-weight: 700;
  border-radius: 0.75rem;
  border: 1px solid rgb(201 146 42);
  transition: all 0.25s;
  cursor: pointer;
}
.btn-primary:hover { background: rgb(221 166 62); }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: rgb(200 185 160);
  font-weight: 600;
  border-radius: 0.75rem;
  border: 1px solid rgb(55 50 42);
  transition: all 0.25s;
  cursor: pointer;
}
.btn-secondary:hover { border-color: rgb(80 75 60); color: rgb(253 250 243); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: rgb(200 185 160);
  font-weight: 600;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  transition: all 0.25s;
  cursor: pointer;
}
.btn-ghost:hover { color: rgb(253 250 243); background: rgb(28 26 22); }
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
