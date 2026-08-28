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
    <!-- STICKY TAB NAVIGATION                              -->
    <!-- ================================================== -->
    <div ref="stickyNavRef" class="sticky top-[72px] z-30 bg-charcoal-950/95 backdrop-blur-2xl border-b border-charcoal-800/50 shadow-2xl shadow-charcoal-950/50">
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-1 overflow-x-auto scrollbar-none py-2">
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

          <button
            v-for="item in navItems"
            :key="item.id"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 group relative"
            :class="activeTab === item.id
              ? 'bg-gold-500/12 text-gold-400 border border-gold-500/25 shadow-inner'
              : 'text-charcoal-350 hover:text-ivory hover:bg-charcoal-900'"
            @click="activeTab = item.id; scrollToContent()"
            :aria-label="`Chuyển sang ${item.label}`"
            :aria-current="activeTab === item.id ? 'page' : undefined"
          >
            <Icon :name="item.icon" class="w-4 h-4 transition-transform group-hover:scale-110" />
            {{ item.label }}
            <span v-if="item.badge" class="px-1.5 py-0.5 rounded-full text-3xs font-bold" :class="activeTab === item.id ? 'bg-gold-500/20 text-gold-300' : 'bg-charcoal-800 text-charcoal-400'">
              {{ item.badge }}
            </span>
            <!-- Active underline indicator -->
            <span v-if="activeTab === item.id" class="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-400 rounded-full" />
          </button>

          <div class="ml-auto shrink-0 flex items-center gap-2 pl-2 border-l border-charcoal-800">
            <!-- Search shortcut -->
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
                    <img :src="featuredResource.coverImage" :alt="featuredResource.title" class="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700" loading="lazy" />
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
                    <img :src="res.coverImage" :alt="res.title" class="w-full h-full object-cover opacity-70 group-hover/card:opacity-90 group-hover/card:scale-105 transition-all duration-500" loading="lazy" />
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
                  <img :src="res.coverImage" :alt="res.title" class="w-20 h-16 object-cover rounded-xl shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
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
                <img :src="spot.image" :alt="spot.name" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" />
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
      <!-- MODULE: AI TRỢ LÝ                               -->
      <!-- ================================================ -->
      <div v-if="activeTab === 'ai'" class="max-w-4xl mx-auto space-y-6 animate-section-in flex flex-col" style="min-height: calc(100vh - 200px)">
        <div class="border-b border-charcoal-850 pb-5 flex items-center justify-between">
          <div>
            <span class="section-label">Trợ lý thông minh</span>
            <h3 class="font-heading text-2xl font-bold text-ivory mt-1">AI Khảo Cứu Di Sản</h3>
            <p class="text-charcoal-400 text-xs mt-0.5 max-w-lg">Đặt câu hỏi bằng tiếng Việt để tìm hiểu lịch sử, văn hóa và con người Thành Phố Đồng Nai từ kho dữ liệu số.</p>
          </div>
          <button class="text-3xs uppercase tracking-wider font-semibold text-charcoal-400 hover:text-gold-400 transition-colors flex items-center gap-1" @click="clearChat" aria-label="Xóa lịch sử trò chuyện">
            <Icon name="mdi:delete-sweep-outline" class="w-4 h-4" />
            Xóa hội thoại
          </button>
        </div>

        <!-- Conversation Box -->
        <div class="flex-1 bg-charcoal-950 border border-charcoal-800 rounded-2xl p-5 overflow-y-auto space-y-4 min-h-[380px] flex flex-col">
          <template v-if="aiMessages.length <= 1">
            <div class="flex gap-4 p-4 rounded-xl text-sm bg-gold-500/5 border border-gold-500/10 mr-12 shrink-0">
              <div class="w-8 h-8 rounded-lg bg-gold-500 text-charcoal-950 flex items-center justify-center shrink-0 shadow-gold/20 shadow">
                <Icon name="mdi:robot" class="w-4 h-4" />
              </div>
              <div class="space-y-1.5 text-left">
                <span class="block text-2xs font-bold uppercase tracking-wider text-charcoal-350">Trợ lý AI Di sản Đồng Nai</span>
                <p class="leading-relaxed text-charcoal-200 select-text whitespace-pre-wrap">{{ aiMessages[0]?.text || 'Xin chào! Tôi là trợ lý AI di sản Thành Phố Đồng Nai. Bạn muốn tìm hiểu lịch sử nào hôm nay?' }}</p>
              </div>
            </div>

            <!-- Suggestion chips when empty -->
            <div class="space-y-3 my-auto">
              <p class="text-charcoal-500 text-xs text-center font-semibold uppercase tracking-widest">Câu hỏi gợi ý</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button v-for="chip in aiChips" :key="chip" class="p-3.5 bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/40 rounded-xl text-2xs text-charcoal-300 hover:text-gold-400 text-left transition-all duration-300 flex items-start gap-2.5 group" @click="sendAiMessage(chip)">
                  <Icon name="mdi:lightbulb-outline" class="w-4 h-4 text-gold-400/60 group-hover:text-gold-400 shrink-0 mt-0.5 transition-colors" />
                  {{ chip }}
                </button>
              </div>
            </div>
          </template>

          <template v-else>
            <div
              v-for="(msg, idx) in aiMessages"
              :key="idx"
              class="flex gap-4 p-4 rounded-xl text-sm"
              :class="msg.role === 'user' ? 'bg-charcoal-900 border border-charcoal-800 self-end ml-12 flex-row-reverse' : 'bg-gold-500/5 border border-gold-500/10 mr-12'"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :class="msg.role === 'user' ? 'bg-gradient-to-tr from-earth-700 to-gold-600 text-charcoal-900 font-bold' : 'bg-gold-500 text-charcoal-950 shadow-gold/20 shadow'">
                <Icon :name="msg.role === 'user' ? 'mdi:account' : 'mdi:robot'" class="w-4 h-4" />
              </div>
              <div class="space-y-1.5 text-left flex-1">
                <span class="block text-2xs font-bold uppercase tracking-wider text-charcoal-350">{{ msg.role === 'user' ? 'Bạn' : 'Trợ lý AI Di sản' }}</span>
                <p class="leading-relaxed text-charcoal-200 select-text whitespace-pre-wrap font-body">{{ msg.text }}</p>
              </div>
            </div>
          </template>

          <div v-if="isAiThinking" class="flex gap-4 p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 mr-12 text-sm">
            <div class="w-8 h-8 rounded-lg bg-gold-500 text-charcoal-950 flex items-center justify-center shrink-0">
              <Icon name="mdi:robot" class="w-4 h-4 animate-spin" />
            </div>
            <div class="space-y-2 text-left flex-1">
              <span class="block text-2xs font-bold uppercase tracking-wider text-charcoal-350">Trợ lý AI Di sản</span>
              <div class="flex gap-1 items-center">
                <div v-for="d in 3" :key="d" class="w-2 h-2 rounded-full bg-gold-400 animate-bounce" :style="{ animationDelay: (d * 0.15) + 's' }" />
                <span class="text-charcoal-400 text-2xs ml-2">Đang đọc kho dữ liệu di sản...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input area -->
        <div class="relative flex items-center gap-3">
          <input
            v-model="aiInput"
            type="text"
            placeholder="Hỏi về cồng chiêng Bom Bo, Chiến khu Đ, trảng cỏ Bù Lạch..."
            class="flex-1 bg-charcoal-900/50 border border-charcoal-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/10 pr-14 text-ivory placeholder-charcoal-400 transition-all duration-200"
            @keydown.enter="sendAiMessage(aiInput)"
          />
          <!-- ================================================ -->
          <!-- MODULE: BẢN ĐỒ — đã chuyển hẳn sang /map        -->
          <!-- ================================================ -->
          <button
            class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gold-500 text-charcoal-950 hover:bg-gold-400 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-gold-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            @click="sendAiMessage(aiInput)"
            :disabled="!aiInput.trim() || isAiThinking"
            aria-label="Gửi câu hỏi"
          >
            <Icon name="mdi:send" class="w-4 h-4" />
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
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" @error="hideOnImageError" />
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
              <img src="/images/heritage/danh-thang/thac-dung-lg.webp" alt="Video: Thác Dung Bù Đăng" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" loading="lazy" @error="hideOnImageError" />
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
                  <img :src="video.thumb" :alt="video.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" @error="hideOnImageError" />
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
                <img v-if="lesson.coverImage" :src="lesson.coverImage" :alt="lesson.title" class="w-full h-full object-cover opacity-70 transition-all duration-500" :class="lesson.hasContent ? 'group-hover:opacity-90 group-hover:scale-105' : ''" loading="lazy" />
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
            <img :src="selectedImageItem.image" :alt="selectedImageItem.title" class="w-full h-full object-cover" />
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
import EmptyState from '~/components/study/EmptyState.vue'
import { NuxtLink } from '#components'

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
// TYPE MAPS
// ──────────────────────────────────────────────
const typeLabels: Record<string, string> = {
  research: 'Nghiên cứu',
  presentation: 'Slide bài giảng',
  artwork: 'Dự án nghệ thuật',
  document: 'Tài liệu giáo án',
  video: 'Video phóng sự'
}

const typeIcons: Record<string, string> = {
  research: 'mdi:file-document-outline',
  presentation: 'mdi:presentation-play',
  artwork: 'mdi:palette-outline',
  document: 'mdi:folder-open-outline',
  video: 'mdi:video-outline'
}

// ──────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────
const activeTab = ref('lessons')

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

const glossaryCategories = ['all', 'Tâm Linh', 'Ẩm Thực', 'Địa Danh', 'Vật Dụng']

const difficultyFilters = [
  { id: 'easy', label: 'Dễ', dot: '●', color: 'text-green-400' },
  { id: 'medium', label: 'Trung bình', dot: '●', color: 'text-gold-400' },
  { id: 'hard', label: 'Nâng cao', dot: '●', color: 'text-red-400' }
]

// Lesson catalog
const lessonCatalog = ref([
  { id: 'chien-khu-d', title: 'Chiến Khu Đ - Căn Cứ Địa Cách Mạng Huyền Thoại', subject: 'Lịch sử địa phương', tldr: 'Hệ thống căn cứ địa cách mạng nằm sâu trong rừng nguyên sinh Thành Phố Đồng Nai, đóng vai trò quyết định trong kháng chiến chống Pháp và Mỹ.', coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp', xpReward: 80, estimatedMinutes: 12, availableBlocks: ['Timeline', 'Flashcards', 'Quiz', 'Tự luận', 'Hotspot'], hasContent: true },
  { id: 'cong-chieng-stieng', title: 'Cồng Chiêng S\'tiêng - Tiếng Nói Của Đại Ngàn', subject: 'Văn hóa dân tộc', tldr: 'Di sản văn hóa phi vật thể UNESCO, cồng chiêng là tiếng nói tâm linh của đồng bào S\'tiêng Thành Phố Đồng Nai.', coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp', xpReward: 75, estimatedMinutes: 10, availableBlocks: ['Flashcards', 'Quiz', 'Thuật ngữ', 'Gợi mở'], hasContent: true },
  { id: 'soc-bom-bo', title: 'Sóc Bom Bo - Tiếng Chày Giã Gạo Kháng Chiến', subject: 'Lịch sử cách mạng', tldr: 'Nơi khởi nguồn bài ca bất hủ, ghi dấu sự đồng lòng kiên trung giã gạo thâu đêm nuôi quân của đồng bào S\'tiêng.', coverImage: '/images/heritage/lich-su/soc-bom-bo-md.webp', xpReward: 90, estimatedMinutes: 15, availableBlocks: ['Timeline', 'Flashcards', 'Quiz', 'Tự luận'], hasContent: true },
  { id: 'trang-co-bu-lach', title: 'Danh Thắng Trảng Cỏ Bù Lạch - Kỳ Quan Thiên Nhiên', subject: 'Địa lý địa phương', tldr: 'Khám phá thung lũng trảng cỏ xanh mướt tự nhiên bao quanh hồ nước trong veo giữa lòng rừng già Thành Phố Đồng Nai.', coverImage: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png', xpReward: 70, estimatedMinutes: 8, availableBlocks: ['Hotspot', 'Quiz', 'Gallery'], hasContent: true }
])

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
const navItems = computed(() => [
  { id: 'lessons', label: 'Bài Học', icon: 'mdi:book-open-variant', badge: 'Mới' },
  { id: 'passport', label: 'Hộ Chiếu Số', icon: 'mdi:book-account-outline', badge: '✨ Mới' },
  { id: 'explore', label: 'Khám Phá', icon: 'mdi:compass-outline', badge: '' },
  { id: 'research', label: 'Thư Viện', icon: 'mdi:library-outline', badge: String(allResources.value.length) },
  { id: 'lab', label: 'Trải Nghiệm Số', icon: 'mdi:flask-outline', badge: '✨' },
  { id: 'glossary', label: 'Từ Điển', icon: 'mdi:translate' },
  { id: 'media', label: 'Đa Phương Tiện', icon: 'mdi:image-multiple-outline' },
  { id: 'achievements', label: 'Thành Tích', icon: 'mdi:trophy-outline' },
  { id: 'ai', label: 'AI Trợ Lý', icon: 'mdi:robot' },
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
  { title: 'Nghiên cứu', desc: 'Phân tích học thuật', icon: 'mdi:magnify', tab: 'ai', xp: 60, done: false },
  { title: 'Từ điển S\'tiêng', desc: 'Học thuật ngữ bản địa', icon: 'mdi:translate', tab: 'glossary', xp: 80, done: false },
  { title: 'Làm Quiz', desc: 'Kiểm tra hiểu biết', icon: 'mdi:help-circle-outline', tab: 'lessons', action: 'quiz', xp: 100, done: quizStore.userProgress.completedQuizzes.length > 0 },
  { title: 'Nhận huy hiệu', desc: 'Chứng chỉ di sản', icon: 'mdi:trophy', tab: 'achievements', xp: 150, done: quizStore.userProgress.earnedBadges.length > 0 },
])

const completedStepsCount = computed(() => learningPath.value.filter(s => s.done).length)
const currentStepIndex = computed(() => {
  const idx = learningPath.value.findIndex(s => !s.done)
  return idx
})

// ──────────────────────────────────────────────
// EXPLORE TAB DATA
// ──────────────────────────────────────────────
const heritageClusters = [
  {
    id: 'bu-dang',
    name: 'Bù Đăng',
    desc: 'Căn cứ kháng chiến, rừng nguyên sinh, làng nghề và lễ hội bản địa người S\'tiêng.',
    icon: 'mdi:tree-outline',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-400',
    bgGradient: 'bg-gradient-to-br from-green-950/60 to-charcoal-950',
    borderColor: 'border-green-900/50 hover:border-green-600/40',
    tagColor: 'text-green-400',
    tag: '5 di sản'
  },
  {
    id: 'bom-bo',
    name: 'Sóc Bom Bo',
    desc: 'Cồng chiêng, nhà dài, huyền thoại nhịp chày giã gạo nuôi quân kháng chiến.',
    icon: 'mdi:fire',
    iconBg: 'bg-orange-500/15',
    iconColor: 'text-orange-400',
    bgGradient: 'bg-gradient-to-br from-orange-950/60 to-charcoal-950',
    borderColor: 'border-orange-900/50 hover:border-orange-600/40',
    tagColor: 'text-orange-400',
    tag: '3 di sản'
  },
  {
    id: 'phuoc-long',
    name: 'Phước Long',
    desc: 'Núi Bà Rá, hồ Thác Mơ, Chiến thắng Phước Long lịch sử 06/01/1975.',
    icon: 'mdi:mountain',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    bgGradient: 'bg-gradient-to-br from-blue-950/60 to-charcoal-950',
    borderColor: 'border-blue-900/50 hover:border-blue-600/40',
    tagColor: 'text-blue-400',
    tag: '2 di sản'
  },
  {
    id: 'loc-ninh',
    name: 'Lộc Ninh',
    desc: 'Căn cứ Tà Thiết, Nhà Giao Tế — cửa ngõ kết nối Chiến khu Đ và vùng biên giới.',
    icon: 'mdi:shield-star-outline',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    bgGradient: 'bg-gradient-to-br from-purple-950/60 to-charcoal-950',
    borderColor: 'border-purple-900/50 hover:border-purple-600/40',
    tagColor: 'text-purple-400',
    tag: '1 di sản'
  }
]

const heritageSpotlights = [
  {
    slug: 'soc-bom-bo',
    name: 'Sóc Bom Bo — Tiếng Chày Giã Gạo Kháng Chiến',
    desc: 'Địa danh lịch sử hào hùng, nơi đồng bào S\'tiêng đốt đuốc giã gạo thâu đêm nuôi quân kháng chiến chống Mỹ.',
    image: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    location: 'Xã Bù Đăng, Thành Phố Đồng Nai',
    tag: 'Lịch sử',
    tagClass: 'bg-red-500/20 border-red-500/40 text-red-300',
    audioGuide: true
  },
  {
    slug: 'trang-co-bu-lach',
    name: 'Trảng Cỏ Bù Lạch — Kỳ Quan Thiên Nhiên',
    desc: 'Đồng cỏ tự nhiên hiếm gặp rộng gần 140 ha nằm giữa rừng già nguyên sinh, hệ sinh thái độc đáo bậc nhất Đông Nam Bộ.',
    image: '/images/heritage/danh-thang/bu-lach-lg.webp',
    location: 'Xã Bù Đăng, Thành Phố Đồng Nai',
    tag: 'Danh thắng',
    tagClass: 'bg-green-500/20 border-green-500/40 text-green-300',
    audioGuide: false
  },
  {
    slug: 'cong-chieng-stieng',
    name: 'Cồng Chiêng S\'tiêng — Di Sản UNESCO',
    desc: 'Không gian văn hóa cồng chiêng Tây Nguyên được UNESCO công nhận năm 2005, gìn giữ bởi cộng đồng S\'tiêng Bù Đăng.',
    image: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    location: 'Sóc Bom Bo, Thành Phố Đồng Nai',
    tag: 'Phi vật thể',
    tagClass: 'bg-gold-500/20 border-gold-500/40 text-gold-300',
    audioGuide: true
  }
]

const communityStoriesExplore = [
  {
    id: 'story-1',
    title: 'Tiếng Chiêng Vang Đêm Mừng Lúa Mới',
    category: 'Ký ức S\'tiêng',
    excerpt: 'Cứ đến tháng 11 âm lịch, cả buôn sóc thức đêm. Tiếng chiêng vang lên từ nhà già làng, lan ra khắp rừng. Trẻ em không ai ngủ — chúng biết đó là đêm Yang Sri về.',
    narrator: 'Già làng Điểu Lên, 83 tuổi',
    icon: 'mdi:music-note',
    iconBg: 'bg-gold-500/15',
    iconColor: 'text-gold-400'
  },
  {
    id: 'story-2',
    title: 'Đêm Giã Gạo Nuôi Quân Năm 1965',
    category: 'Kháng chiến',
    excerpt: 'Bộ đội thiếu gạo, cả sóc Bom Bo đốt đuốc lồ ô, đứng thành hàng dài giã từ chập tối đến bình minh. Không ai bảo ai — người mệt thì người khác vào thay.',
    narrator: 'Nghệ nhân Thị Bay, 78 tuổi',
    icon: 'mdi:fire',
    iconBg: 'bg-red-500/15',
    iconColor: 'text-red-400'
  },
  {
    id: 'story-3',
    title: 'Dak Mơ — Nguồn Nước Của Ước Mơ',
    category: 'Huyền thoại',
    excerpt: 'Tổ tiên người S\'tiêng kể: ngày xưa có cô gái uống nước suối Dak Mơ mà khỏi bệnh. Từ đó dân làng gọi nguồn nước ấy là "nước của ước mơ" — Dak Mơ, tên Thác Mơ ngày nay.',
    narrator: 'Nghệ nhân Điểu Nhân, 71 tuổi',
    icon: 'mdi:water',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400'
  },
  {
    id: 'story-4',
    title: 'Bí Quyết Pha Màu Thổ Cẩm Từ Rừng',
    category: 'Làng nghề',
    excerpt: 'Không phải ai cũng biết: màu đen bền nhất phải lấy từ vỏ cây Krông ngâm ba ngày ba đêm. Màu đỏ thì củ nghệ đỏ pha nước chua me rừng. Nghệ nhân già giờ còn lại mấy người.',
    narrator: 'Nghệ nhân Thị Rét, 72 tuổi',
    icon: 'mdi:palette',
    iconBg: 'bg-orange-500/15',
    iconColor: 'text-orange-400'
  },
  {
    id: 'story-5',
    title: 'Yang Bri — Thần Rừng Bảo Vệ Buôn Sóc',
    category: 'Tâm linh',
    excerpt: 'Trước khi vào rừng già, người S\'tiêng phải xin phép Yang Bri. Lấy củi thì chỉ lấy cây khô. Không ai được chặt cây tươi vô cớ — người vi phạm sẽ bị rừng "phạt" bằng bệnh tật.',
    narrator: 'Già làng Điểu Nhuôn, 79 tuổi',
    icon: 'mdi:tree',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-400'
  },
  {
    id: 'story-6',
    title: 'Đàn Đá — Tiếng Vọng Từ Ngàn Năm',
    category: 'Nhạc cụ cổ',
    excerpt: 'Ông nội tôi tìm được bộ đàn đá trong rừng sâu khi còn nhỏ. Ông gõ thử, âm thanh vang như tiếng trời. Bộ đàn đó đã nằm trong rừng ít nhất vài ngàn năm — ông chưa bao giờ dám bán.',
    narrator: 'Ông Điểu Thắng, 65 tuổi',
    icon: 'mdi:music-box',
    iconBg: 'bg-earth-500/15',
    iconColor: 'text-earth-400'
  }
]

const heritageFacts = [
  { value: '11', label: 'Di sản số hóa', icon: 'mdi:database-outline', iconBg: 'bg-gold-500/10', iconColor: 'text-gold-400' },
  { value: '4', label: 'Audio guide hoàn thiện', icon: 'mdi:headphones', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { value: '6', label: 'Ký ức cộng đồng', icon: 'mdi:microphone-outline', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400' },
  { value: '2000+', label: 'Năm lịch sử', icon: 'mdi:history', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' }
]

const heritageLabItems = [
  { id: 'timeline', title: 'Dòng Thời Gian Lịch Sử', desc: 'Hành trình thời gian từ thời kỳ tiền sử đến hiện đại qua các sự kiện quan trọng của Thành Phố Đồng Nai.', icon: 'mdi:timeline-clock', iconBg: 'bg-gold-500/10', iconColor: 'text-gold-400', gradientBg: 'bg-gold-400', active: true },
  { id: 'storymap', title: 'Bản Đồ Câu Chuyện', desc: 'Bản đồ câu chuyện tích hợp ảnh, văn bản và audio theo từng địa điểm di sản.', icon: 'mdi:map-legend', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', gradientBg: 'bg-blue-400', active: false },
  { id: 'compare', title: 'So Sánh Xưa & Nay', desc: 'So sánh hình ảnh di sản xưa và nay — thấy sự thay đổi qua thời gian.', icon: 'mdi:compare', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', gradientBg: 'bg-purple-400', active: true },
  { id: 'audio', title: 'Lời Kể Nhân Chứng', desc: 'Lời kể của nhân chứng lịch sử — những câu chuyện sống động chưa được viết thành sách.', icon: 'mdi:microphone', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400', gradientBg: 'bg-orange-400', active: false },
  { id: 'artifact', title: 'Xem Hiện Vật', desc: 'Xem hiện vật bảo tàng với chú thích học thuật và thông tin phân tích.', icon: 'mdi:museum', iconBg: 'bg-earth-500/10', iconColor: 'text-earth-400', gradientBg: 'bg-earth-400', active: true },
  { id: 'tour', title: 'Tham Quan Ảo', desc: 'Tour tham quan ảo 360° tại các địa điểm di tích lịch sử và danh thắng Thành Phố Đồng Nai.', icon: 'mdi:rotate-3d', iconBg: 'bg-green-500/10', iconColor: 'text-green-400', gradientBg: 'bg-green-400', active: false }
]

const activeLabItems = heritageLabItems.filter(i => i.active)
const comingSoonLabItems = heritageLabItems.filter(i => !i.active)
const labFeatures = activeLabItems.map(i => ({ label: i.title, icon: i.icon }))

const historyTimeline = [
  { year: 'Thế kỷ 3-4', tag: 'Khảo cổ', tagBg: 'bg-earth-500/10 text-earth-400', title: 'Đàn đá tiền sử', desc: 'Những bộ đàn đá cổ đại nhất được phát hiện trong lòng đất đỏ bazan Thành Phố Đồng Nai, âm thanh từ thời tiền sử.' },
  { year: '1945 - 1954', tag: 'Kháng chiến', tagBg: 'bg-red-500/10 text-red-400', title: 'Chiến Khu Đ thành lập', desc: 'Hệ thống căn cứ địa cách mạng kiên cố, điểm tựa cho cuộc kháng chiến chống Pháp tại miền Đông Nam Bộ.' },
  { year: '1960s', tag: 'Văn hóa', tagBg: 'bg-gold-500/10 text-gold-400', title: 'Tiếng chày Sóc Bom Bo', desc: 'Đồng bào S\'tiêng đốt đuốc giã gạo thâu đêm nuôi quân giải phóng — bài ca huyền thoại ra đời.' },
  { year: '2005', tag: 'UNESCO', tagBg: 'bg-blue-500/10 text-blue-400', title: 'Cồng chiêng Tây Nguyên được vinh danh', desc: 'UNESCO công nhận không gian văn hóa cồng chiêng Tây Nguyên là Di sản phi vật thể của nhân loại.' },
  { year: '2026', tag: 'Số hóa', tagBg: 'bg-green-500/10 text-green-400', title: 'Cổng Học Tập Di Sản Số ra mắt', desc: 'Trang web di sản số hóa Thành Phố Đồng Nai ra mắt, mang lịch sử địa phương đến với học sinh khắp nơi.' }
]

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
interface SchoolResourceExtended {
  id: string; title: string; description: string
  type: 'research' | 'presentation' | 'artwork' | 'document' | 'video'
  subject: string; grade: string; school: string; author: string
  coverImage?: string; publishedAt: string; featured: boolean
  downloadCount: number; motivation?: string; keyFindings?: string[]
  fileSize?: string; quizId?: string; pages?: string[]
  difficulty?: number
}

const selectedResource = ref<SchoolResourceExtended | null>(null)
const activeModalTab = ref<'overview' | 'document'>('overview')
const currentDocPage = ref(0)
const fontSizeLevel = ref(2)
const fontSizes = ['14px', '16px', '18px', '20px']
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

interface TextAnnotation { id: string; bookId: string; page: number; text: string; note?: string }
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

// Static fallback: always show real documents even when CMS isn't loaded
const staticResources: SchoolResourceExtended[] = [
  {
    id: 'res-001',
    title: 'Lịch Sử Hình Thành Chiến Khu Đ Qua Lời Kể Nhân Chứng Lịch Sử',
    description: 'Nghiên cứu điền dã ghi chép lại câu chuyện chiến đấu kiên cường của các cựu chiến binh Chiến khu Đ năm xưa.',
    type: 'research', subject: 'Lịch sử địa phương', grade: '12',
    school: 'THPT Lê Quý Đôn', author: 'Nhóm học sinh 12A1',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    publishedAt: '2024-04-10', featured: true, downloadCount: 234, fileSize: '3.6 MB', difficulty: 3,
    motivation: 'Thế hệ cựu chiến binh Chiến khu Đ nay đều đã tuổi cao sức yếu. Chúng em muốn chạy đua với thời gian để lưu giữ lại những câu chuyện hào hùng chân thực nhất từ lời kể của họ.',
    keyFindings: ['Ghi âm và chép lại hơn 30 giờ phỏng vấn trực tiếp từ 12 nhân chứng lịch sử.', 'Phác thảo và số hóa sơ đồ hoạt động quân sự của 3 điểm đóng quân cũ.', 'Sưu tầm hình ảnh tư liệu của 15 loại hiện vật, vũ khí tự chế thời chiến.'],
    quizId: 'quiz-001',
    pages: ['<h2>CHƯƠNG I: BỐI CẢNH LỊCH SỬ</h2><p>Chiến Khu Đ là một trong những hệ thống căn cứ địa quan trọng bậc nhất của lực lượng kháng chiến tại khu vực miền Đông Nam Bộ trong giai đoạn từ năm 1945 đến năm 1975.</p><blockquote>"Nếu không ghi chép lại ngay hôm nay, những trang sử sống động từ lời kể của thế hệ đi trước sẽ vĩnh viễn nằm lại dưới lòng đất mẹ." — Lời mở đầu đề tài nghiên cứu.</blockquote>', '<h2>CHƯƠNG II: PHƯƠNG PHÁP KHẢO CỨU ĐIỀN DÃ</h2><p>Trong quá trình thực hiện từ tháng 9 năm 2023 đến tháng 3 năm 2024, nhóm chúng em đã tiến hành 12 đợt điền dã thực tế vào sâu các buôn sóc bản địa. Nhóm đã phỏng vấn và ghi âm được hơn 30 giờ chia sẻ từ các cựu chiến binh.</p>', '<h2>CHƯƠNG III: ĐỀ XUẤT GIẢI PHÁP BẢO TỒN DI SẢN SỐ</h2><p>Để di sản Chiến Khu Đ mãi trường tồn và tiếp cận gần hơn với thế hệ học sinh Gen Z, nhóm nghiên cứu đề xuất ba giải pháp thực tế:<br/>1. Xây dựng cổng thông tin số di sản<br/>2. Thiết lập tour học tập ảo<br/>3. Lồng ghép giáo dục địa phương</p>']
  },
  {
    id: 'res-002',
    title: "Phân Tích Hoa Văn Thổ Cẩm S'tiêng: Ngôn Ngữ Không Lời",
    description: 'Nghiên cứu 23 mẫu hoa văn thổ cẩm truyền thống, giải mã ý nghĩa biểu tượng hạt gạo, dãy núi và chim rừng.',
    type: 'research', subject: 'Văn hóa dân tộc', grade: '9',
    school: 'THCS Nguyễn Trường Tộ', author: 'Nhóm học sinh 9A',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-md.webp',
    publishedAt: '2024-03-20', featured: false, downloadCount: 156, fileSize: '2.8 MB', difficulty: 2,
    motivation: "Khi quan sát những tấm vải dệt của người S'tiêng, chúng em nhận thấy mỗi họa tiết đều đối xứng tuyệt đối và mang sắc màu núi rừng.",
    keyFindings: ['Số hóa 23 mẫu hoa văn thêu tay truyền thống.', 'Giải mã ý nghĩa: Họa tiết hình thoi chéo biểu thị hạt gạo no ấm.', 'Hồ sơ hóa quy trình pha nhuộm màu tự nhiên từ lá cây rừng.'],
    quizId: 'quiz-002',
    pages: ['<h2>CHƯƠNG I: HOA VĂN THỔ CẨM</h2><p>Nghề dệt thổ cẩm cổ truyền là biểu tượng văn hóa rực rỡ nhất thể hiện óc sáng tạo nghệ thuật của đồng bào S\'tiêng.</p><blockquote>"Học hoa văn dệt là học cách người xưa trò chuyện với núi rừng, trời đất." — Nghệ nhân Thị Rét.</blockquote>', '<h2>CHƯƠNG II: PHƯƠNG PHÁP VÀ KẾT QUẢ</h2><p>Nhóm thực hiện 3 đợt gặp gỡ nghệ nhân Thị Rét (72 tuổi) và số hóa 23 mẫu hoa văn bằng phương pháp chụp ảnh macro tỉ lệ 1:1. Phát hiện: họa tiết "Sơk Pơng" (hạt gạo bốn mùa) — lời cầu nguyện cho mùa màng bội thu.</p>', '<h2>CHƯƠNG III: QUY TRÌNH NHUỘM MÀU TỰ NHIÊN</h2><p>Màu đen từ vỏ cây Krông, màu đỏ từ củ nghệ đỏ pha me rừng, màu xanh từ lá chàm ven suối. Toàn bộ quy trình được biên soạn thành tài liệu hướng dẫn 8 bước.</p>']
  },
  {
    id: 'res-003',
    title: "Âm Nhạc Cồng Chiêng - Di Sản Sống Của Người S'tiêng",
    description: 'Tài liệu thuyết trình đa phương tiện về lịch sử, ý nghĩa tâm linh và vai trò của cồng chiêng trong đời sống cộng đồng.',
    type: 'presentation', subject: 'Giáo dục địa phương', grade: '11',
    school: 'THPT Lê Quý Đôn', author: 'Vũ Quang Huy',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    publishedAt: '2024-05-01', featured: false, downloadCount: 312, fileSize: '4.8 MB', difficulty: 1,
    motivation: 'Tiếng cồng chiêng là linh hồn kết nối con người với thế giới thần linh của người bản địa.',
    keyFindings: ['Số hóa 6 bản thu âm cồng chiêng cổ tiêu biểu.', 'Xây dựng sơ đồ bố trí không gian trình diễn cồng chiêng.', 'Tổng hợp 12 tài liệu nghiên cứu chuyên sâu về nhạc cụ đồng.'],
    quizId: 'quiz-002',
    pages: ['<h2>PHẦN I: CỒNG CHIÊNG TRONG ĐỜI SỐNG TÂM LINH</h2><p>Cồng chiêng không đơn thuần là nhạc cụ mà là tiếng nói tâm linh thiêng liêng nhất. Mỗi chiếc chiêng đều có vị thần <strong>Yang Ching</strong> ngự trị.</p><blockquote>"Tiếng chiêng là hơi thở của đại ngàn." — Cựu binh Điểu Lên.</blockquote>', '<h2>PHẦN II: CẤU TRÚC DÀN NHẠC</h2><p>Một bộ cồng chiêng S\'tiêng hoàn chỉnh gồm 6-12 chiếc, sắp xếp theo thang âm riêng. Trong trình diễn, người đánh chiêng đứng thành vòng tròn, phụ nữ múa xoang ngược chiều — tượng trưng âm dương đối xứng.</p>', '<h2>PHẦN III: NGUY CƠ MAI MỘT</h2><p>Tại Sóc Bom Bo chỉ còn 4 người đàn ông cao tuổi thành thạo kỹ thuật đánh chiêng truyền thống. Nhóm đề xuất thành lập Câu lạc bộ Cồng chiêng học sinh tại các trường THPT.</p>']
  },
  {
    id: 'res-004',
    title: "Nghi Thức Lễ Hội Mừng Lúa Mới Của Người S'tiêng",
    description: 'Báo cáo điền dã chi tiết về các bước tế lễ thần Yang lúa và cộng đồng trong dịp tết lớn nhất năm của buôn sóc.',
    type: 'document', subject: 'Giáo dục địa phương', grade: '10',
    school: 'THPT Lê Quý Đôn', author: 'Trần Thị Mai',
    coverImage: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    publishedAt: '2024-05-15', featured: false, downloadCount: 198, fileSize: '1.9 MB', difficulty: 1,
    motivation: 'Nhằm xây dựng tài liệu tham khảo giảng dạy chính thống cho phân môn Giáo dục địa phương.',
    keyFindings: ['Hệ thống hóa 5 bước tế lễ chính thức của lễ hội Mừng lúa mới.', 'Sưu tầm và biên dịch 3 bài khấn cầu thần Yang lúa.', 'Lập danh mục 8 lễ vật bắt buộc trong mâm cúng cộng đồng.'],
    pages: ['<h2>CHƯƠNG I: Ý NGHĨA TÂM LINH LỄ MỪNG LÚA MỚI</h2><p>Lễ <strong>cúng tạ ơn Yang Sri</strong> là nét đẹp văn hóa tâm linh quan trọng bậc nhất của đồng bào S\'tiêng tại Xã Bù Đăng, tổ chức vào tháng 11-12 âm lịch.</p><blockquote>"Yang Sri về kho lúa thì buôn sóc mới no ấm." — Già làng Điểu Nhuôn.</blockquote>', '<h2>CHƯƠNG II: NĂM BƯỚC TẾ LỄ</h2><ol><li>Lễ rước Yang Sri từ ruộng về kho</li><li>Lễ mổ heo, gà cúng Yang</li><li>Đọc bài khấn tiếng S\'tiêng</li><li>Uống rượu cần cộng đồng</li><li>Lễ đóng cửa kho lúa</li></ol>', '<h2>CHƯƠNG III: TÀI LIỆU GIẢNG DẠY</h2><p>Bộ tài liệu gồm giáo án 2 tiết, phiếu học tập 12 câu hỏi, 3 bài khấn kèm phiên âm và dịch nghĩa. Đã thí điểm thành công tại THPT Lê Quý Đôn.</p>']
  },
  {
    id: 'res-005',
    title: 'Kỹ Thuật Chế Tác Đàn Đá & Nhạc Cụ Tre Nứa Bản Địa Bù Đăng',
    description: 'Nghiên cứu khảo sát khảo cổ học học sinh về cách chọn đá, ghè đẽo đá tạo âm thanh tự nhiên Đông Nam Bộ.',
    type: 'artwork', subject: 'Nghệ thuật cổ truyền', grade: '11',
    school: 'THPT Chuyên Quang Trung', author: 'Nhóm Vật lý - Lịch sử',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/van-hoa-stieng-lg.webp',
    publishedAt: '2024-06-10', featured: false, downloadCount: 145, fileSize: '5.2 MB', difficulty: 3,
    motivation: 'Đàn đá là một trong những nhạc cụ cổ xưa nhất của nhân loại được phát hiện tại Việt Nam.',
    keyFindings: ['Khảo sát chi tiết 3 bộ đàn đá cổ được gìn giữ bởi các dòng họ lâu đời.', 'Đo đạc tần số âm thanh của từng thanh đá.', 'Tái dựng quy trình ghè đẽo cân chỉnh âm thanh.'],
    pages: ['<h2>CHƯƠNG I: ĐÀN ĐÁ TỪ LÒNG ĐẤT CỔ XƯA</h2><p>Đàn đá là biểu tượng âm nhạc của cư dân tiền sử sông Đồng Nai. Người xưa biết <strong>lựa chọn đá tự nhiên</strong> có mật độ phù hợp để phát ra âm thanh.</p><blockquote>"Chọn đá đàn là nghệ thuật lắng nghe lòng đá." — Nghệ nhân Điểu Nhân.</blockquote>', '<h2>CHƯƠNG II: PHÂN TÍCH VẬT LÝ ÂM THANH</h2><p>Phân tích bằng Spectroid cho thấy đàn đá tạo thang âm pentatonic đặc trưng Đông Nam Á. Đá sừng (hornfels) cho âm thanh trong nhất.</p>', '<h2>CHƯƠNG III: NHẠC CỤ TRE NỨA VÀ PHỤC DỰNG</h2><p>Ngoài đàn đá, nhóm khảo sát Đinh Tăk Ta, Đinh Pơng và Brô. Đã thực hành tái dựng một chiếc Đinh Tăk Ta hoàn chỉnh trong 4 giờ theo hướng dẫn nghệ nhân.</p>']
  },
  {
    id: 'res-006',
    title: 'Phóng Sự: Nhịp Chày Sóc Bom Bo - Ký Ức Không Ngủ',
    description: 'Phóng sự tài liệu ghi lại hành trình phục dựng cảnh giã gạo nuôi quân bằng ánh đuốc lồ ô tại Sóc Bom Bo.',
    type: 'video', subject: 'Lịch sử địa phương', grade: '10',
    school: 'THPT Chuyên Quang Trung', author: 'CLB Truyền Thông Măng Non',
    coverImage: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    publishedAt: '2024-07-02', featured: false, downloadCount: 187, fileSize: '218 MB', difficulty: 2,
    motivation: 'Chúng em muốn ghi hình lại chính xác động tác giã gạo chày tay trước khi thế hệ nghệ nhân cuối cùng không còn nữa.',
    keyFindings: ['Quay và dựng phóng sự dài 12 phút, phục dựng cảnh giã gạo cùng 8 nghệ nhân.', 'Ghi lại nguyên bản giai điệu hò giã gạo cổ truyền.', 'Phỏng vấn 3 thế hệ trong một gia đình S\'tiêng.'],
    quizId: 'quiz-011',
    pages: ['<h2>MỞ ĐẦU: VÌ SAO CHÚNG EM LÀM PHÓNG SỰ NÀY</h2><p>Năm 1965, đồng bào S\'tiêng ở sóc Bom Bo đốt đuốc lồ ô, thức trắng đêm giã gạo để tiếp tế cho bộ đội. Câu chuyện ấy đã đi vào âm nhạc Việt Nam nhưng hình ảnh thực tế chưa từng được ghi hình đầy đủ.</p><blockquote>"Tụi nhỏ quay được cảnh này, bà mừng lắm, vì rồi bà cũng không giã nổi chày nữa." — Nghệ nhân Thị Bay, 78 tuổi.</blockquote>', '<h2>PHẦN 1: PHỤC DỰNG ĐÊM GIÃ GẠO</h2><p>Nhóm phục dựng đúng bối cảnh: cối gỗ, chày tay, đuốc lồ ô. Phát hiện thú vị: nhịp chày có nhịp nhanh-chậm xen kẽ để nhiều người thay phiên suốt đêm không kiệt sức.</p>', '<h2>PHẦN 2: BA THẾ HỆ, MỘT KÝ ỨC</h2><p>Phỏng vấn bà (từng giã gạo thời chiến), mẹ (nghe kể lại) và cháu (học qua bài hát). Phóng sự khép lại bằng cảnh ba thế hệ cùng hát "Tiếng chày trên sóc Bom Bo" dưới ánh đuốc phục dựng.</p>']
  },
  {
    id: 'res-007',
    title: 'Trảng Cỏ Bù Lạch - Khảo Sát Hệ Sinh Thái Đồng Cỏ Hiếm Giữa Đại Ngàn',
    description: 'Đề tài nghiên cứu khoa học khảo sát thảm thực vật, hệ động vật và giá trị sinh thái độc đáo của trảng cỏ tự nhiên.',
    type: 'research', subject: 'Sinh học - Địa lý', grade: '12',
    school: 'THPT Chuyên Quang Trung', author: 'Nhóm học sinh 12 Sinh',
    coverImage: '/images/heritage/danh-thang/bu-lach-lg.webp',
    publishedAt: '2024-08-14', featured: false, downloadCount: 141, fileSize: '4.1 MB', difficulty: 3,
    motivation: 'Giữa vùng rừng nhiệt đới, một thảm cỏ tự nhiên rộng hàng trăm hecta tồn tại bất thường.',
    keyFindings: ['Ghi nhận 34 loài thực vật đặc trưng, trong đó 5 loài chưa được định danh.', 'Lý giải nguyên nhân hình thành trảng cỏ dựa trên thổ nhưỡng tầng đất mỏng.', 'Ghi hình bằng bẫy ảnh 6 loài động vật hoang dã.'],
    quizId: 'quiz-009',
    pages: ['<h2>CHƯƠNG I: MỘT ĐỒNG CỎ GIỮA RỪNG GIÀ</h2><p>Trảng cỏ Bù Lạch là quần thể đồng cỏ tự nhiên hiếm gặp giữa rừng nhiệt đới thường xanh Thành Phố Đồng Nai.</p><blockquote>"Đất ở đây mỏng, mùa mưa ngập, mùa khô nứt nẻ — cây to không sống nổi, chỉ có cỏ mới trụ được." — Cán bộ kiểm lâm.</blockquote>', '<h2>CHƯƠNG II: PHƯƠNG PHÁP KHẢO SÁT THỰC ĐỊA</h2><p>Nhóm tiến hành 4 đợt khảo sát theo bốn mùa, lập 12 ô tiêu chuẩn 10mx10m. Tầng đất mặt trung bình chỉ 15-20cm trước khi gặp lớp đá ong.</p>', '<h2>CHƯƠNG III: GIÁ TRỊ BẢO TỒN</h2><p>Đề xuất: khoanh vùng bảo vệ khu lõi, xây tuyến quan sát động vật kiểm soát, đưa nội dung khảo sát vào chương trình giáo dục địa phương.</p>']
  },
  {
    id: 'res-008',
    title: 'Giáo Án Trải Nghiệm: Thác Đứng - Đọc Câu Chuyện Địa Chất Qua Từng Bậc Đá',
    description: 'Tài liệu giáo án tổ chức tiết học trải nghiệm ngoài trời tại Thác Đứng, kết hợp địa lý, địa chất và kỹ năng quan sát.',
    type: 'document', subject: 'Giáo dục địa phương', grade: '9',
    school: 'THCS Nguyễn Trường Tộ', author: 'Tổ Địa Lý - Sinh Học',
    coverImage: '/images/heritage/danh-thang/thac-dung-lg.webp',
    publishedAt: '2024-09-05', featured: false, downloadCount: 176, fileSize: '2.2 MB', difficulty: 1,
    motivation: 'Học sinh thường chỉ biết Thác Đứng như điểm chụp ảnh. Giáo án này giúp các em nhìn thấy hàng triệu năm địa chất ẩn sau từng bậc đá.',
    keyFindings: ['Thiết kế 3 trạm quan sát thực địa với phiếu học tập riêng.', 'Xây dựng bộ 10 câu hỏi dẫn dắt học sinh tự suy luận.', 'Tỉ lệ học sinh hứng thú đạt 92% trong lớp thí điểm.'],
    quizId: 'quiz-010',
    pages: ['<h2>PHẦN I: MỤC TIÊU BÀI HỌC</h2><p>Sau tiết học, học sinh mô tả được quá trình hình thành các bậc đá tại Thác Đứng do bào mòn chênh lệch.</p><blockquote>"Một buổi học ngoài trời đúng nghĩa là khi học sinh tự đặt câu hỏi trước khi giáo viên kịp giảng." — Tổ bộ môn.</blockquote>', '<h2>PHẦN II: TỔ CHỨC 3 TRẠM QUAN SÁT</h2><p><strong>Trạm 1 - Chân thác:</strong> Quan sát bậc đá, nhận diện độ cứng các lớp đá.<br/><strong>Trạm 2 - Dòng chảy:</strong> Đo tốc độ dòng chảy, thảo luận mối liên hệ với bào mòn.<br/><strong>Trạm 3 - Thảm thực vật:</strong> Nhận diện cây ưa ẩm, vai trò giữ đất.</p>', '<h2>PHẦN III: PHIẾU ĐÁNH GIÁ VÀ MỞ RỘNG</h2><p>Kết quả thí điểm: học sinh nhớ bài lâu hơn đáng kể. Đặc biệt khái niệm "bào mòn chênh lệch" — trước đó nhiều em cho là khó hình dung khi chỉ học qua sách giáo khoa.</p>']
  }
]

const resources = computed<SchoolResourceExtended[]>(() => {
  // Use CMS data when available, fall back to static resources
  if (resourcesContent.value && resourcesContent.value.length >= 8) {
    return resourcesContent.value.map(item => {
      // Nuxt Content v3 nests all non-standard frontmatter fields under `.meta`;
      // only `title`/`description` live on the item root for `type: 'page'` collections.
      // `id` is a reserved built-in field (Nuxt's own doc id, e.g. "school/school/res-001.md"),
      // so the frontmatter's own `id: res-001` never survives into `.meta.id` — recover it
      // from `.stem` (file path without extension) instead.
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
// GLOSSARY
// ──────────────────────────────────────────────
interface GlossaryTerm { term: string; pronunciation: string; definition: string; category: 'Tâm Linh' | 'Ẩm Thực' | 'Địa Danh' | 'Vật Dụng'; isFlipped?: boolean }
const glossary = ref<GlossaryTerm[]>([
  { term: 'Yang Ching', pronunciation: '/Giàng Chinh/', definition: 'Linh hồn ngự trị trong cồng chiêng theo tâm linh S\'tiêng. Cồng chiêng là vật thiêng kết nối trời đất.', category: 'Tâm Linh', isFlipped: false },
  { term: 'Đ\'rắp S\'lung', pronunciation: '/Đơ-rắp Sơ-lung/', definition: 'Rượu cần lên men gạo hoặc ngô truyền thống từ các loại men lá rừng tự nhiên.', category: 'Ẩm Thực', isFlipped: false },
  { term: 'Dak Mơ', pronunciation: '/Đác Mơ/', definition: 'Trong tiếng S\'tiêng là nguồn nước của ước mơ, nguồn gốc tên gọi của Thác Mơ.', category: 'Địa Danh', isFlipped: false },
  { term: 'Yang Bri', pronunciation: '/Giàng Bri/', definition: 'Thần rừng vĩ đại, vị thần bảo vệ buôn làng khỏi thiên tai và thú dữ.', category: 'Tâm Linh', isFlipped: false },
  { term: 'Bro', pronunciation: '/Brô/', definition: 'Đàn tre truyền thống làm từ thân cây tre khô, phát ra âm thanh mộc mạc.', category: 'Vật Dụng', isFlipped: false }
])

const filteredGlossary = computed(() => glossary.value.filter(word => {
  const matchesCat = activeGlossaryCat.value === 'all' || word.category === activeGlossaryCat.value
  const q = glossarySearchQuery.value.toLowerCase().trim()
  const matchesSearch = !q || word.term.toLowerCase().includes(q) || word.pronunciation.toLowerCase().includes(q)
  return matchesCat && matchesSearch
}))

// ──────────────────────────────────────────────
// MAP LANDMARKS
// ──────────────────────────────────────────────
interface MapLandmark { id: string; name: string; desc: string; icon: string; x: number; y: number; audioGuide?: boolean; paper?: SchoolResourceExtended }
const mapLandmarks = ref<MapLandmark[]>([
  { id: 'site-1', name: 'Sóc Bom Bo', desc: 'Địa danh lịch sử hào hùng, nơi đồng bào dân tộc S\'tiêng đốt đuốc giã gạo thâu đêm suốt sáng để nuôi quân kháng chiến cứu nước.', icon: 'mdi:fire', x: 25, y: 35, audioGuide: true, paper: resources.value[2] },
  { id: 'site-2', name: 'Trảng Cỏ Bù Lạch', desc: 'Tuyệt tác thiên nhiên hoang sơ rộng gần 140 ha ôm trọn lòng hồ nước ngọt trong lành nằm giữa rừng già nguyên sinh Bù Đăng.', icon: 'mdi:nature', x: 50, y: 20, paper: resources.value[1] },
  { id: 'site-3', name: 'Thác Mơ Bù Đăng', desc: 'Ngọn thác hùng vĩ, biểu tượng của sự sống và ước mơ, cội nguồn dòng nước Dak Mơ trong huyền thoại S\'tiêng bản địa.', icon: 'mdi:water', x: 70, y: 55, audioGuide: true },
  { id: 'site-4', name: 'Căn Cứ Chiến Khu Đ', desc: 'Căn cứ quân sự kháng chiến bảo đảm an toàn cho lực lượng cách mạng nằm ẩn sâu trong lòng rừng nguyên sinh Xã Bù Đăng.', icon: 'mdi:shield-outline', x: 15, y: 70, paper: resources.value[0] }
])

// ──────────────────────────────────────────────
// MEDIA
// ──────────────────────────────────────────────
interface ImageStory { title: string; tag: string; image: string; story: string }
const imageStories = ref<ImageStory[]>([
  { title: 'Thác Mơ Bù Đăng Hùng Vĩ', tag: 'Thiên Nhiên', image: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png', story: 'Ngọn thác biểu tượng nằm nép mình giữa rừng già nguyên sinh Bù Đăng. Dòng nước trắng xóa như dải lụa đổ từ trên cao, tạo nên cảnh sắc huyền ảo thơ mộng và gắn liền với thần thoại cội nguồn Dak Mơ xa xưa của người S\'tiêng bản địa.' },
  { title: 'Trảng Cỏ Bù Lạch Xanh Mướt', tag: 'Thiên Nhiên', image: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png', story: 'Tuyệt tác thiên nhiên hoang sơ rộng gần 140 hecta bao bọc lấy một lòng hồ nước ngọt trong mát quanh năm. Trảng cỏ là không gian sinh hoạt lễ hội cộng đồng độc đáo và là bài học thực địa địa lý sinh động nhất.' },
  { title: 'Cồng Chiêng & Vũ Điệu Xoang', tag: 'Văn Hóa', image: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp', story: 'Âm thanh cồng chiêng ngân vang kết nối buôn làng, là linh hồn sinh hoạt tâm linh và nghệ thuật biểu diễn của đồng bào dân tộc thiểu số Bù Đăng đã được UNESCO vinh danh.' }
])
const selectedImageItem = ref<ImageStory | null>(null)
function hideOnImageError(e: Event) {
  (e.target as HTMLImageElement).style.display = 'none'
}

const mockVideos = [
  { title: 'Flycam Trảng Cỏ Bù Lạch Mùa Khô', cat: 'Thiên nhiên', duration: '3:22', thumb: '/images/heritage/danh-thang/bu-lach-lg.webp' },
  { title: 'Lễ hội mừng lúa mới sóc Bom Bo 2024', cat: 'Văn hóa', duration: '6:10', thumb: '/images/heritage/img-disanbudang/Mung-Lua-Moi.png' }
]

const mediaSubtabs = [
  { id: 'photos', label: 'Kho Ảnh', icon: 'mdi:image-multiple-outline' },
  { id: 'videos', label: 'Phim Tư Liệu', icon: 'mdi:video' },
  { id: 'audios', label: 'Audio', icon: 'mdi:volume-high' }
]
const activeMediaSubtab = ref('photos')

const mockAudios = [
  { title: 'Tiếng cồng chiêng sóc Bom Bo cổ', cat: 'Âm nhạc bản địa', duration: '3:45', icon: 'mdi:music-note' },
  { title: 'Phiên âm dạy nói tiếng S\'tiêng cơ bản', cat: 'Ngôn ngữ học', duration: '5:20', icon: 'mdi:microphone' },
  { title: 'Truyền thuyết nguồn nước thần kỳ Dak Mơ', cat: 'Podcast truyện kể', duration: '7:15', icon: 'mdi:headphones' }
]

// ──────────────────────────────────────────────
// AI CHATBOT
// ──────────────────────────────────────────────
interface AIMessage { role: 'user' | 'assistant'; text: string }
const aiMessages = ref<AIMessage[]>([{ role: 'assistant', text: 'Xin chào! Tôi là trợ lý AI di sản Thành Phố Đồng Nai. Bạn muốn tìm hiểu lịch sử, văn hóa hoặc địa danh nào hôm nay?' }])
const aiChips = ['Chiến khu Đ là gì?', 'Lễ hội Mừng Lúa Mới diễn ra khi nào?', 'So sánh người S\'tiêng với M\'nông', 'Từ Dak Mơ nghĩa là gì?']
const aiInput = ref('')
const isAiThinking = ref(false)

function generateAiResponse(inputVal: string): string {
  const query = inputVal.toLowerCase().trim()
  if (query.includes('chiến khu') || query.includes('chien khu')) return 'Chiến Khu Đ là hệ thống căn cứ địa cách mạng vô cùng hiểm yếu nằm sâu trong lòng rừng nguyên sinh Xã Bù Đăng, Thành Phố Đồng Nai. Nơi đây được bảo vệ bởi địa thế hiểm trở và tinh thần đoàn kết kiên cường của đồng bào du kích S\'tiêng.'
  if (query.includes('lúa mới') || query.includes('lua moi')) return 'Lễ hội Mừng Lúa Mới của đồng bào S\'tiêng thường diễn ra vào cuối vụ mùa thu hoạch (tháng 10-12 âm lịch). Đây là dịp người dân tạ ơn thần linh (Yang) và thắt chặt tình đoàn kết buôn làng bằng cồng chiêng và rượu cần Đ\'rắp S\'lung.'
  if (query.includes('cồng chiêng') || query.includes('cong chieng')) return 'Dàn nhạc cồng chiêng S\'tiêng thường bao gồm từ 6 đến 12 chiếc chiêng bằng đồng không có núm. Nghệ thuật diễn xướng cồng chiêng Tây Nguyên đã được UNESCO vinh danh là Di sản văn hóa phi vật thể năm 2005.'
  if (query.includes('s\'tiêng') || query.includes('m\'nông')) return 'Đồng bào S\'tiêng nổi tiếng với nghề dệt thổ cẩm Rơ-let tinh xảo và cồng chiêng, trong khi người M\'nông có kiến trúc nhà sàn gỗ đặc thù. Cả hai đều là dân tộc thiểu số lâu đời tại Thành Phố Đồng Nai.'
  if (query.includes('dak mơ') || query.includes('thác mơ')) return 'Trong ngôn ngữ S\'tiêng, "Dak" có nghĩa là nước, "Dak Mơ" tức là "nguồn nước của ước mơ". Đây chính là cội nguồn của danh thắng Thác Mơ hùng vĩ, biểu trưng cho sinh khí dạt dào nuôi dưỡng đại ngàn Thành Phố Đồng Nai.'
  return 'Tôi đã ghi nhận câu hỏi của bạn. Thành Phố Đồng Nai là vùng đất giàu lịch sử cách mạng, có danh thắng trảng cỏ Bù Lạch tuyệt đẹp và nét dệt thổ cẩm, cồng chiêng S\'tiêng lâu đời. Bạn muốn hỏi chi tiết hơn về chủ đề nào?'
}

function sendAiMessage(msgText: string) {
  if (!msgText.trim() || isAiThinking.value) return
  aiMessages.value.push({ role: 'user', text: msgText })
  aiInput.value = ''; isAiThinking.value = true
  setTimeout(() => {
    isAiThinking.value = false
    aiMessages.value.push({ role: 'assistant', text: generateAiResponse(msgText) })
  }, 1200)
}

function clearChat() {
  aiMessages.value = [{ role: 'assistant', text: 'Tôi đã làm sạch lịch sử hội thoại. Bạn có câu hỏi nghiên cứu mới nào không?' }]
}

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
  swal.fire({ title: 'Tải tài liệu thành công!', html: `Hệ thống đang chuẩn bị tải PDF <strong>"${resource.title}"</strong> (${resource.fileSize ?? '2.4 MB'}).`, icon: 'success', background: '#221D17', color: '#F5F1EA', confirmButtonColor: '#C7A664', confirmButtonText: 'Đóng lại' })
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
  else if (actionType === 'ask-ai') { activeTab.value = 'ai'; scrollToContent() }
  else if (['open-map', 'explore-map', 'explore-roadmap'].includes(actionType)) { navigateTo('/map') }
  else if (actionType === 'ask-ai-topic') { activeTab.value = 'ai'; if (payload) sendAiMessage(payload); scrollToContent() }
  else if (actionType === 'send-prompt') { if (payload) sendAiMessage(payload) }
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
</style>
