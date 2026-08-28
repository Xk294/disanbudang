<template>
  <div class="min-h-[calc(100vh-72px)] bg-charcoal-900 flex flex-col relative">
    <!-- Page header — cinematic -->
    <div class="border-b border-charcoal-800/50 py-4 bg-gradient-to-b from-charcoal-950 to-charcoal-950/97 backdrop-blur-xl relative z-30 shadow-2xl shadow-charcoal-950/80">
      <!-- Gold accent line top -->
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div class="container-heritage flex items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="hidden sm:flex w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 items-center justify-center shrink-0">
            <Icon name="mdi:map-legend" class="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <span class="text-gold-400/70 text-3xs mb-0.5 block tracking-[0.18em] font-bold uppercase">Không Gian Tương Tác</span>
            <h1 class="font-heading font-bold text-ivory text-xl leading-snug">Bản Đồ Di Sản Thành Phố Đồng Nai</h1>
          </div>
        </div>
        <div class="flex items-center gap-2.5">
          <!-- Count badge -->
          <div class="hidden sm:flex items-center gap-2 bg-charcoal-900/80 border border-charcoal-800 rounded-full px-3.5 py-1.5">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
            </span>
            <span class="text-charcoal-200 text-xs font-semibold">{{ displayedHeritages.length }}</span>
            <span class="text-charcoal-500 text-xs">di sản</span>
          </div>
          <!-- Autoplay Tour Button -->
          <button
            class="text-xs inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold border transition-all duration-300 shadow-md cursor-pointer select-none"
            :class="isPlayingTour
              ? 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse'
              : 'bg-gold-500/10 text-gold-400 border-gold-500/30 hover:bg-gold-500/25'"
            @click="isPlayingTour ? stopTour() : startTour()"
            :title="isPlayingTour ? 'Dừng hành trình tự động' : 'Bắt đầu hành trình tự động chạy tour di sản'"
          >
            <Icon :name="isPlayingTour ? 'mdi:stop-circle-outline' : 'mdi:play-circle-outline'" class="w-4 h-4" />
            <span>{{ isPlayingTour ? 'Dừng Tour' : 'Tour Tự Động' }}</span>
          </button>
          <button
            class="lg:hidden btn-ghost text-xs border border-charcoal-800 rounded-xl px-4 py-2 hover:border-gold-500/40"
            @click="sidebarOpen = !sidebarOpen"
            aria-label="Mở bộ lọc di động"
          >
            <Icon :name="sidebarOpen ? 'mdi:close' : 'mdi:filter-outline'" class="w-4 h-4 text-gold-400 mr-1" />
            Bộ lọc & Tuyến
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Mobile backdrop overlay -->
      <Transition name="mobile-menu">
        <div
          v-if="sidebarOpen"
          class="lg:hidden fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm z-10"
          @click="sidebarOpen = false"
        />
      </Transition>

      <!-- Sidebar -->
      <aside
        class="map-sidebar absolute lg:relative z-20 w-80 lg:w-88 h-full flex flex-col transition-transform duration-300 lg:translate-x-0 overflow-hidden"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        role="complementary"
        aria-label="Bảng tìm kiếm và bộ lọc"
      >
        <!-- Glassmorphism BG -->
        <div class="absolute inset-0 bg-charcoal-950/96 backdrop-blur-2xl border-r border-charcoal-800/60" />
        <div class="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-gold-500/15 to-transparent" />
        <!-- Content -->
        <div class="relative flex flex-col h-full">
        <!-- Tab Selectors -->
        <div class="grid grid-cols-2 border-b border-charcoal-850 bg-charcoal-900/40">
          <button
            class="py-4 text-2xs uppercase tracking-widest font-bold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2"
            :class="activeTab === 'search' ? 'border-gold-500 text-gold-400 bg-charcoal-950/80' : 'border-transparent text-charcoal-400 hover:text-ivory'"
            @click="activeTab = 'search'"
            aria-label="Tab tìm di sản"
          >
            <Icon name="mdi:magnify" class="w-4 h-4 text-gold-500" />
            Tìm Di Sản
          </button>
          <button
            class="py-4 text-2xs uppercase tracking-widest font-bold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2"
            :class="activeTab === 'route' ? 'border-gold-500 text-gold-400 bg-charcoal-950/80' : 'border-transparent text-charcoal-400 hover:text-ivory'"
            @click="activeTab = 'route'"
            aria-label="Tab tuyến lộ trình"
          >
            <Icon name="mdi:road-variant" class="w-4 h-4 text-gold-500" />
            Tuyến Lộ Trình
          </button>
        </div>

        <!-- SEARCH & FILTER TAB -->
        <div v-if="activeTab === 'search'" class="flex-1 flex flex-col min-h-0">
          <!-- Search input -->
          <div class="p-4 border-b border-charcoal-850 bg-charcoal-950/40">
            <div class="relative">
              <Icon
                v-if="!searchQuery"
                name="mdi:magnify"
                class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none z-10"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm di tích, văn hóa, danh thắng..."
                :style="{ paddingLeft: searchQuery ? '0.875rem' : '2.25rem', paddingRight: searchQuery ? '2.25rem' : '0.875rem', paddingTop: '0.625rem', paddingBottom: '0.625rem' }"
                class="w-full bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm placeholder-charcoal-500 focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 shadow-inner"
                aria-label="Tìm kiếm di sản"
              />
              <button
                v-if="searchQuery"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-ivory transition-colors"
                @click="searchQuery = ''"
                aria-label="Xóa nội dung tìm kiếm"
              >
                <Icon name="mdi:close-circle" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Feature Filters -->
          <div class="p-4 border-b border-charcoal-850 space-y-3 shrink-0 bg-charcoal-950/20">
            <p class="eyebrow text-gold-400 text-3xs tracking-widest font-bold">LỌC NHANH ĐẶC TRƯNG</p>
            <div class="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto scrollbar-none pr-1">
              <button
                v-for="feat in featureFilters"
                :key="feat.id"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-3xs font-semibold uppercase tracking-wide transition-all duration-200 border"
                :class="activeFilterFeature === feat.id ? 'bg-gold-500/10 text-gold-300 border-gold-500/30 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20 border-charcoal-800 hover:border-charcoal-700 hover:text-ivory'"
                @click="toggleFeatureFilter(feat.id)"
                :aria-label="'Lọc theo ' + feat.label"
              >
                <Icon :name="feat.icon" class="w-3.5 h-3.5" />
                {{ feat.label }}
              </button>
            </div>
          </div>

          <!-- Category filter list -->
          <div class="p-4 border-b border-charcoal-850 space-y-3 shrink-0 bg-charcoal-950/20">
            <p class="eyebrow text-gold-400 text-3xs tracking-widest font-bold">DANH MỤC DI SẢN ĐỒNG NAI</p>
            <div class="flex flex-col gap-1.5 max-h-48 overflow-y-auto scrollbar-none pr-1">
              <button
                class="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border hover:border-charcoal-700 hover:text-ivory"
                :class="activeCategory === '' ? 'bg-gold-500/10 text-gold-300 border-gold-500/30 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20'"
                @click="setCategory('')"
                aria-label="Hiện tất cả danh mục"
              >
                <Icon name="mdi:apps" class="w-4 h-4 text-gold-400" />
                Tất cả di sản
                <span class="ml-auto text-3xs font-medium text-charcoal-400 bg-charcoal-800 px-2 py-0.5 rounded-full border border-charcoal-700">{{ store.totalCount }}</span>
              </button>
              <button
                v-for="cat in categories"
                :key="cat.id"
                class="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border"
                :class="activeCategory === cat.id ? 'text-ivory border-gold-500/30 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20 border-charcoal-800 hover:border-charcoal-700 hover:text-ivory'"
                :style="activeCategory === cat.id ? { backgroundColor: `${cat.color}15`, borderColor: `${cat.color}35` } : {}"
                @click="setCategory(cat.id)"
                :aria-label="'Lọc theo danh mục ' + cat.labelShort"
              >
                <Icon :name="cat.icon" class="w-4 h-4" :style="{ color: cat.color }" />
                {{ cat.labelShort }}
                <span class="ml-auto text-3xs font-medium text-charcoal-400 bg-charcoal-800 px-2 py-0.5 rounded-full border border-charcoal-700">{{ heritagesByCategory[cat.id]?.length ?? 0 }}</span>
              </button>
            </div>
          </div>

          <!-- Period filter timeline -->
          <div class="p-4 border-b border-charcoal-850 space-y-3 shrink-0 bg-charcoal-950/20">
            <p class="eyebrow text-gold-400 text-3xs tracking-widest font-bold">THỜI KỲ LỊCH SỬ</p>
            <div class="flex gap-2 overflow-x-auto scrollbar-none pb-1 [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]">
              <button
                class="flex-shrink-0 px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border"
                :class="activePeriod === '' ? 'bg-gold-500/10 text-gold-300 border-gold-500/30 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20 border-charcoal-800 hover:border-charcoal-700 hover:text-ivory'"
                @click="activePeriod = ''"
                aria-label="Tất cả thời kỳ"
              >
                Tất cả
              </button>
              <button
                v-for="per in periods"
                :key="per.id"
                class="flex-shrink-0 px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border"
                :class="activePeriod === per.id ? 'bg-gold-500/15 text-gold-300 border-gold-500/40 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20 border-charcoal-800 hover:border-charcoal-700 hover:text-ivory'"
                @click="activePeriod = per.id"
                :aria-label="'Lọc theo thời kỳ ' + per.label"
              >
                {{ per.label }}
              </button>
            </div>
          </div>

          <!-- Cluster filter (regional trail) -->
          <div class="p-4 border-b border-charcoal-850 space-y-3 shrink-0 bg-charcoal-950/20">
            <p class="eyebrow text-gold-400 text-3xs tracking-widest font-bold">CỤM DI SẢN</p>
            <div class="flex gap-2 overflow-x-auto scrollbar-none pb-1 [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]">
              <button
                class="flex-shrink-0 px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border"
                :class="activeCluster === '' ? 'bg-gold-500/10 text-gold-300 border-gold-500/30 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20 border-charcoal-800 hover:border-charcoal-700 hover:text-ivory'"
                @click="activeCluster = ''"
                aria-label="Tất cả cụm di sản"
              >
                Tất cả
              </button>
              <button
                v-for="clu in clusters"
                :key="clu.id"
                class="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border"
                :class="activeCluster === clu.id ? 'text-ivory border-gold-500/40 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20 border-charcoal-800 hover:border-charcoal-700 hover:text-ivory'"
                :style="activeCluster === clu.id ? { backgroundColor: `${clu.color}15`, borderColor: `${clu.color}40` } : {}"
                @click="activeCluster = clu.id"
                :aria-label="'Lọc theo cụm di sản ' + clu.label"
              >
                <Icon :name="clu.icon" class="w-3.5 h-3.5" :style="{ color: clu.color }" />
                {{ clu.label }}
              </button>
            </div>
          </div>

          <!-- Heritage list result -->
          <div class="flex-1 overflow-y-auto scrollbar-none bg-charcoal-950/40">
            <div class="p-3.5 space-y-2">
              <div
                v-for="heritage in displayedHeritages"
                :key="heritage.id"
                class="group flex gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-300 border relative overflow-hidden"
                :class="selectedId === heritage.id
                  ? 'bg-gradient-to-r from-gold-500/8 to-transparent border-gold-500/35 shadow-lg'
                  : 'border-transparent bg-transparent hover:bg-charcoal-900/50 hover:border-charcoal-800/60'"
                @click="selectHeritage(heritage)"
                tabindex="0"
                @keypress.enter="selectHeritage(heritage)"
                :aria-label="heritage.title + ', nhấn Enter để xem chi tiết trên bản đồ'"
              >
                <!-- Indicator block left -->
                <div v-if="selectedId === heritage.id" class="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-400 rounded-full"></div>
                
                <div class="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 relative border border-charcoal-800/60 shadow-md">
                  <img :src="heritage.coverImage" :alt="heritage.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-ivory text-sm font-semibold leading-snug line-clamp-1 group-hover:text-gold-300 transition-colors">
                    {{ heritage.title }}
                  </p>
                  <p class="text-charcoal-400 text-3xs uppercase tracking-wider font-bold mt-1.5 flex items-center gap-1.5">
                    <Icon name="mdi:tag-outline" class="w-3.5 h-3.5 text-gold-500" />
                    {{ getCategoryLabel(heritage.category) }}
                  </p>
                </div>
                <!-- Link directly to detail page -->
                <NuxtLink
                  :to="`/heritage/${heritage.slug}`"
                  class="self-center p-2 rounded-lg text-charcoal-400 hover:text-gold-400 hover:bg-charcoal-800/80 transition-all z-20 shrink-0"
                  title="Xem trang chi tiết di sản"
                  @click.stop
                >
                  <Icon name="mdi:arrow-right-circle-outline" class="w-5 h-5" />
                </NuxtLink>
              </div>

              <div v-if="displayedHeritages.length === 0" class="py-16 text-center">
                <Icon name="mdi:map-marker-off" class="w-12 h-12 text-charcoal-400 mx-auto mb-3" />
                <p class="text-charcoal-400 text-sm font-medium">Không tìm thấy di sản nào</p>
                <p class="text-charcoal-500 text-xs mt-1">Vui lòng chọn bộ lọc khác hoặc nhập từ khóa mới</p>
              </div>
            </div>
          </div>
        </div>

        <!-- JOURNEY / ROUTES TAB -->
        <div v-if="activeTab === 'route'" class="flex-1 flex flex-col min-h-0 overflow-y-auto scrollbar-none p-4 gap-5">
          <div class="space-y-1">
            <p class="eyebrow text-gold-400 text-3xs tracking-widest font-bold">TUYẾN ĐƯỜNG ĐỀ XUẤT</p>
            <p class="text-xs text-charcoal-450 leading-relaxed">Khám phá dòng chảy lịch sử và văn hóa bản địa Thành Phố Đồng Nai theo các tuyến đề xuất chuyên sâu.</p>
          </div>

          <div class="space-y-4">
            <!-- Active Route Card -->
            <div
              v-for="route in suggestedRoutes"
              :key="route.id"
              class="border rounded-2xl cursor-pointer transition-all duration-400 relative overflow-hidden p-4 bg-charcoal-900/30"
              :class="selectedRouteId === route.id
                ? 'border-gold-500/40 shadow-xl shadow-black/30'
                : 'border-charcoal-800/50 hover:border-charcoal-700'"
              @click="toggleRoute(route)"
              tabindex="0"
              @keypress.enter="toggleRoute(route)"
              :aria-label="route.name + ', tuyến đường đề xuất'"
            >
              <div class="flex items-center gap-3.5 mb-2.5">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center text-ivory shrink-0 border border-white/5"
                  :style="{ backgroundColor: `${route.color}15`, color: route.color, borderColor: `${route.color}25` }"
                >
                  <Icon :name="route.icon" class="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 class="font-heading font-bold text-sm text-ivory leading-snug">{{ route.name }}</h4>
                  <p class="text-3xs text-charcoal-400 font-bold uppercase mt-0.5 tracking-wider">{{ route.stops.length }} điểm khám phá</p>
                </div>
              </div>
              <p class="text-xs text-charcoal-450 leading-relaxed">{{ route.description }}</p>

              <!-- Route Stops Sequence -->
              <div v-if="selectedRouteId === route.id" class="mt-4 pt-4 border-t border-charcoal-800/80 space-y-4">
                <p class="text-3xs uppercase text-gold-400 tracking-widest font-bold">Lộ trình chi tiết</p>
                <div class="relative pl-5 border-l border-charcoal-800 ml-2 space-y-4">
                  <div
                    v-for="(stop, sIdx) in route.stops"
                    :key="stop.id"
                    class="relative cursor-pointer group/stop"
                    @click.stop="selectStop(stop)"
                  >
                    <!-- Small marker bullet -->
                    <span
                      class="absolute -left-[25.5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-charcoal-950 transition-all duration-300"
                      :class="selectedId === stop.id ? 'bg-gold-400 scale-125 ring-4 ring-gold-500/20' : 'bg-charcoal-600 group-hover/stop:bg-ivory'"
                      :style="selectedId === stop.id ? {} : { backgroundColor: route.color }"
                    />
                    <p class="text-3xs text-charcoal-450 font-bold uppercase tracking-wider">Điểm dừng {{ sIdx + 1 }}</p>
                    <p class="text-xs text-ivory font-semibold group-hover/stop:text-gold-300 transition-colors mt-0.5">{{ stop.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Clear filters button -->
        <div v-if="(activeCategory || activeCluster || searchQuery || selectedRouteId || activeFilterFeature) && activeTab === 'search'" class="p-4 border-t border-charcoal-850 shrink-0 bg-charcoal-950/60">
          <button class="w-full text-charcoal-400 hover:text-ivory text-xs flex items-center justify-center gap-2 transition-colors py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-800 font-semibold" @click="clearAll" aria-label="Xóa tất cả các bộ lọc hiện tại">
            <Icon name="mdi:filter-remove-outline" class="w-4 h-4 text-gold-500" />
            Xóa mọi bộ lọc
          </button>
        </div>
        </div> <!-- /relative content wrapper -->
      </aside>

      <!-- Map Area -->
      <div class="flex-1 relative">
        <!-- Floating Timeline Bar on Map Top -->
        <div class="absolute top-4 left-4 z-[400] hidden sm:flex items-center gap-1.5 p-1.5 rounded-2xl bg-charcoal-950/85 backdrop-blur-xl border border-charcoal-800 shadow-xl">
          <div class="flex items-center gap-1 px-2.5 py-1 text-3xs font-bold uppercase tracking-wider text-gold-400 border-r border-charcoal-800">
            <Icon name="mdi:timeline-clock-outline" class="w-3.5 h-3.5" />
            <span>Thời Kỳ</span>
          </div>
          <button
            class="px-3 py-1.5 rounded-xl text-3xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
            :class="activePeriod === '' ? 'bg-gold-500 text-charcoal-950 shadow-md font-extrabold' : 'text-charcoal-300 hover:text-ivory hover:bg-charcoal-850'"
            @click="activePeriod = ''"
          >
            Tất Cả
          </button>
          <button
            v-for="per in periods"
            :key="per.id"
            class="px-3 py-1.5 rounded-xl text-3xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
            :class="activePeriod === per.id ? 'bg-gold-500 text-charcoal-950 shadow-md font-extrabold' : 'text-charcoal-300 hover:text-ivory hover:bg-charcoal-850'"
            @click="activePeriod = per.id"
          >
            {{ per.label }}
          </button>
        </div>

        <ClientOnly>
          <MapContainer
            :heritages="displayedHeritages"
            :selected-id="selectedId"
            :selected-route="selectedRoute"
            class="w-full h-full"
            @select="selectHeritage"
          />
          <template #fallback>
            <div class="w-full h-full bg-charcoal-950 flex items-center justify-center">
              <div class="text-center space-y-4">
                <div class="w-16 h-16 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p class="text-charcoal-450 text-sm">Đang tải bản đồ di sản Đồng Nai...</p>
              </div>
            </div>
          </template>
        </ClientOnly>

        <ClientOnly>
          <!-- DESKTOP PANEL (Floating Right Side Card) -->
          <Transition name="panel-slide-right">
            <div
              v-if="selectedHeritage && isDesktop"
              class="absolute top-4 right-4 max-h-[calc(100%-2rem)] z-[500] w-[400px] bg-charcoal-950/97 backdrop-blur-2xl rounded-2xl overflow-hidden border border-gold-500/25 shadow-2xl shadow-black/80 flex flex-col h-fit"
              role="dialog"
              :aria-label="'Thông tin chi tiết: ' + selectedHeritage.title"
            >
              <!-- Golden Top border accent line -->
              <div class="h-1 w-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 flex-shrink-0"></div>

              <!-- Banner Photo - taller for visibility -->
              <div class="relative h-52 flex-shrink-0 bg-charcoal-900 group">
                <img :src="selectedHeritage.coverImage" :alt="selectedHeritage.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/30 to-transparent"></div>
                
                <!-- Badge + title overlay on image -->
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <div class="flex items-center gap-2 mb-2 flex-wrap">
                    <BaseBadge :variant="getCategoryVariant(selectedHeritage.category)" size="sm" class="uppercase tracking-widest font-bold">
                      {{ getCategoryLabel(selectedHeritage.category) }}
                    </BaseBadge>
                    <HeritageSourceBadge :sources="selectedHeritage.sources" @open="isSourceModalOpen = true" />
                  </div>
                  <h3 class="font-heading font-bold text-white text-base leading-snug tracking-tight drop-shadow-lg line-clamp-2">{{ selectedHeritage.title }}</h3>
                  <p v-if="selectedHeritage.subtitle" class="text-gold-300 text-3xs font-accent italic mt-0.5 drop-shadow line-clamp-1">{{ selectedHeritage.subtitle }}</p>
                </div>

                <!-- Close button -->
                <button
                  class="absolute top-3 right-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all border border-white/20"
                  @click="selectedId = null"
                  aria-label="Đóng bảng thông tin di sản"
                >
                  <Icon name="mdi:close" class="w-4 h-4" />
                </button>
              </div>

              <!-- Tab Selection row -->
              <div class="flex border-b border-charcoal-800/60 bg-charcoal-950/80 shrink-0">
                <button
                  class="flex-1 py-3 text-[10px] uppercase font-bold tracking-wider text-center border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer relative"
                  :class="activePanelTab === 'info' ? 'border-gold-500 text-gold-400 bg-charcoal-900/40' : 'border-transparent text-charcoal-400 hover:text-ivory'"
                  @click="activePanelTab = 'info'"
                >
                  <Icon name="mdi:information-outline" class="w-3.5 h-3.5" />
                  Tổng quan
                </button>
                <button
                  class="flex-1 py-3 text-[10px] uppercase font-bold tracking-wider text-center border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer relative"
                  :class="activePanelTab === 'history' ? 'border-gold-500 text-gold-400 bg-charcoal-900/40' : 'border-transparent text-charcoal-400 hover:text-ivory'"
                  @click="activePanelTab = 'history'"
                >
                  <Icon name="mdi:book-open-variant" class="w-3.5 h-3.5" />
                  Lịch sử
                </button>
                <button
                  class="flex-1 py-3 text-[10px] uppercase font-bold tracking-wider text-center border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer relative"
                  :class="activePanelTab === 'media' ? 'border-gold-500 text-gold-400 bg-charcoal-900/40' : 'border-transparent text-charcoal-400 hover:text-ivory'"
                  @click="activePanelTab = 'media'"
                >
                  <Icon name="mdi:image-multiple-outline" class="w-3.5 h-3.5" />
                  Thư viện
                </button>
              </div>

              <!-- Scrollable Content -->
              <div class="flex-1 overflow-y-auto scrollbar-none max-h-[360px] min-h-[220px]">
                <!-- Tab: TỔNG QUAN -->
                <div v-if="activePanelTab === 'info'" class="p-5 space-y-4 animate-section-in">
                  <!-- Short description -->
                  <div>
                    <p class="text-charcoal-200 text-xs leading-relaxed font-medium">
                      {{ selectedHeritage.shortDescription }}
                    </p>
                  </div>

                  <!-- Quick Facts Grid -->
                  <div v-if="selectedHeritage.quickFacts && selectedHeritage.quickFacts.length > 0" class="space-y-2">
                    <p class="text-[9px] text-gold-400 uppercase font-bold tracking-widest">Thông tin nhanh</p>
                    <div class="grid grid-cols-2 gap-2">
                      <div
                        v-for="(fact, fIdx) in selectedHeritage.quickFacts"
                        :key="fIdx"
                        class="flex items-center gap-2.5 bg-charcoal-900/70 p-2.5 rounded-xl border border-charcoal-800 hover:border-charcoal-700 transition-colors"
                      >
                        <div class="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0 border border-gold-500/15">
                          <Icon :name="fact.icon ?? 'mdi:information-outline'" class="w-4 h-4" />
                        </div>
                        <div class="min-w-0">
                          <p class="text-[9px] text-charcoal-400 uppercase font-bold tracking-wider truncate">{{ fact.label }}</p>
                          <p class="text-xs text-white font-semibold truncate mt-0.5">{{ fact.value }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Tab: LỊCH SỬ / CÂU CHUYỆN -->
                <div v-if="activePanelTab === 'history'" class="p-5 space-y-3 animate-section-in">
                  <p class="text-[9px] text-gold-400 uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <Icon name="mdi:book-open-variant" class="w-4 h-4" />
                    Hành trình lịch sử & Huyền thoại
                  </p>
                  <div class="text-xs text-charcoal-200 leading-relaxed font-sans space-y-3 whitespace-pre-line">
                    {{ selectedHeritage.longStory }}
                  </div>
                </div>

                <!-- Tab: PHƯƠNG TIỆN (Audio, Video, Gallery) -->
                <div v-if="activePanelTab === 'media'" class="p-5 space-y-4 animate-section-in">
                  <!-- Video Player -->
                  <div v-if="selectedHeritage.video" class="space-y-2">
                    <h4 class="text-[9px] uppercase text-gold-400 tracking-widest font-bold flex items-center gap-1.5">
                      <Icon name="mdi:video-outline" class="w-4 h-4" />
                      Phim tư liệu di sản
                    </h4>
                    <div class="rounded-xl overflow-hidden border border-charcoal-850 aspect-video bg-charcoal-950 relative shadow-inner">
                      <video :src="selectedHeritage.video.url" controls class="w-full h-full object-cover" preload="metadata" />
                    </div>
                  </div>

                  <!-- Audio Player -->
                  <div v-if="selectedHeritage.audio" class="space-y-2">
                    <h4 class="text-[9px] uppercase text-gold-400 tracking-widest font-bold flex items-center gap-1.5">
                      <Icon name="mdi:headphones" class="w-4 h-4" />
                      Audio Thuyết Minh
                    </h4>
                    <div class="bg-gold-500/5 p-3 rounded-xl border border-gold-500/20 flex items-center justify-between gap-3">
                      <div class="min-w-0 flex-1">
                        <p class="text-xs font-semibold text-white truncate">{{ selectedHeritage.audio.title }}</p>
                        <p class="text-[10px] text-charcoal-400 truncate mt-0.5">Một câu chuyện được kể bởi {{ selectedHeritage.audio.narrator }}</p>
                      </div>
                      <button
                        class="w-8 h-8 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 flex items-center justify-center transition-all duration-300 shadow-lg shadow-gold-500/20 shrink-0 cursor-pointer"
                        @click="playAudio"
                        :aria-label="'Phát thuyết minh âm thanh cho ' + selectedHeritage.title"
                      >
                        <Icon :name="isPlayingCurrentTrack ? 'mdi:pause' : 'mdi:play'" class="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>

                  <!-- Photo Gallery -->
                  <div v-if="selectedHeritage.gallery && selectedHeritage.gallery.length > 0" class="space-y-2">
                    <h4 class="text-[9px] uppercase text-gold-400 tracking-widest font-bold flex items-center gap-1.5">
                      <Icon name="mdi:image-multiple-outline" class="w-4 h-4" />
                      Hình ảnh lưu trữ ({{ selectedHeritage.gallery.length }})
                    </h4>
                    <div class="grid grid-cols-3 gap-1.5">
                      <div
                        v-for="(img, gIdx) in selectedHeritage.gallery"
                        :key="gIdx"
                        class="aspect-video rounded-lg overflow-hidden border border-charcoal-850 cursor-pointer hover:border-gold-400/50 transition-all relative group"
                        @click="activeImageIndex = gIdx"
                      >
                        <img :src="img.src" :alt="img.alt" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Icon name="mdi:magnify-plus-outline" class="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer Action buttons -->
              <div class="p-4 border-t border-charcoal-800/60 bg-charcoal-950/90 grid grid-cols-2 gap-3 shrink-0">
                <NuxtLink
                  :to="`/heritage/${selectedHeritage.slug}`"
                  class="btn-primary text-xs justify-center py-3.5 font-bold tracking-wide rounded-xl shadow-lg shadow-gold-500/10 flex items-center gap-1.5"
                >
                  <Icon name="mdi:file-document-outline" class="w-4 h-4" />
                  Xem Chi Tiết
                </NuxtLink>
                <a
                  :href="getGoogleMapsDirectionUrl(selectedHeritage)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-1.5 text-xs font-semibold text-charcoal-200 hover:text-gold-400 bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-750 hover:border-gold-500/40 transition-all duration-300 rounded-xl py-3.5"
                  title="Mở chỉ đường trên Google Maps"
                >
                  <Icon name="mdi:directions" class="w-4 h-4 text-gold-400" />
                  Chỉ đường
                </a>
              </div>
            </div>
          </Transition>

          <!-- MOBILE BOTTOM SHEET PANEL -->
          <Transition name="sheet-slide">
            <MapBottomSheet
              v-if="selectedHeritage && !isDesktop"
              :selected-heritage="selectedHeritage"
              :is-playing-current-track="isPlayingCurrentTrack"
              @close="selectedId = null"
              @play-audio="playAudio"
              @open-gallery="(idx) => activeImageIndex = idx"
              @select-heritage="(h) => selectHeritage(h)"
            />
          </Transition>
        </ClientOnly>

        <!-- GALLERY LIGHTBOX VIEWER -->
        <Transition name="fade">
          <div
            v-if="activeImageIndex !== null && selectedHeritage && selectedHeritage.gallery && selectedHeritage.gallery[activeImageIndex!] != null"
            class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh lớn"
            @click.self="activeImageIndex = null"
          >
            <!-- Top Controls -->
            <div class="absolute top-4 right-4 flex items-center gap-2">
              <button
                class="text-ivory/80 hover:text-ivory bg-charcoal-900/60 hover:bg-charcoal-800 p-2.5 rounded-full border border-charcoal-800 transition-colors"
                @click="activeImageIndex = null"
                aria-label="Đóng chế độ xem ảnh lớn"
              >
                <Icon name="mdi:close" class="w-6 h-6" />
              </button>
            </div>

            <!-- Left / Right arrows -->
            <button
              v-if="selectedHeritage.gallery && selectedHeritage.gallery.length > 1"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/80 hover:text-ivory bg-charcoal-900/60 p-3 rounded-full hover:bg-charcoal-800 border border-charcoal-800 z-10 transition-colors"
              @click="prevImage"
              aria-label="Ảnh trước"
            >
              <Icon name="mdi:chevron-left" class="w-6 h-6" />
            </button>
            <button
              v-if="selectedHeritage.gallery && selectedHeritage.gallery.length > 1"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/80 hover:text-ivory bg-charcoal-900/60 p-3 rounded-full hover:bg-charcoal-800 border border-charcoal-800 z-10 transition-colors"
              @click="nextImage"
              aria-label="Ảnh tiếp theo"
            >
              <Icon name="mdi:chevron-right" class="w-6 h-6" />
            </button>

            <!-- Main Image -->
            <div class="max-w-4xl max-h-[75vh] flex items-center justify-center">
              <img
                :src="selectedHeritage.gallery![activeImageIndex!]!.src"
                :alt="selectedHeritage.gallery![activeImageIndex!]!.alt"
                class="max-w-full max-h-[75vh] object-contain rounded-lg border border-charcoal-850 shadow-2xl"
              />
            </div>

            <!-- Image Info Caption -->
            <div class="mt-4 text-center max-w-2xl px-4 space-y-1">
              <p class="text-ivory text-sm font-semibold">{{ selectedHeritage.gallery![activeImageIndex!]!.alt }}</p>
              <p v-if="selectedHeritage.gallery![activeImageIndex!]!.caption" class="text-charcoal-400 text-xs leading-relaxed">
                {{ selectedHeritage.gallery![activeImageIndex!]!.caption }}
              </p>
              <p v-if="selectedHeritage.gallery![activeImageIndex!]!.photographer" class="text-gold-400/90 text-3xs font-accent italic">
                Nhiếp ảnh gia: {{ selectedHeritage.gallery![activeImageIndex!]!.photographer }}
              </p>
            </div>
          </div>
        </Transition>

        <!-- Source Modal -->
        <HeritageSourceModal
          :is-open="isSourceModalOpen"
          :sources="selectedHeritage?.sources"
          @close="isSourceModalOpen = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES, PERIODS } from '~/data/categories'
import { CLUSTERS } from '~/data/clusters'
import { HERITAGES } from '~/data/heritages'
import type { Heritage } from '~/types'
import { useEventListener } from '@vueuse/core'
import MapBottomSheet from '~/components/map/BottomSheet.vue'

const isSourceModalOpen = ref(false)

definePageMeta({ layout: 'default' })
useMuseumSeo({
  title: 'Bản Đồ Di Sản Thành Phố Đồng Nai',
  description: 'Trực quan hóa vị trí địa lý cùng câu chuyện, audio guide, hình ảnh của toàn bộ di sản văn hóa, lịch sử và thiên nhiên tại Thành Phố Đồng Nai.',
})

const store = useHeritageStore()
const audioStore = useAudioStore()
const { getCategoryLabel } = useHeritage()

// Track desktop vs mobile — must be client-side only
const isDesktop = ref(false)

const sidebarOpen = ref(false)
const selectedId = ref<string | null>(null)
const searchQuery = ref('')
const activeCategory = ref('')
const activePeriod = ref('')
const activeCluster = ref('')
const activeFilterFeature = ref('')
const activeTab = ref('search')
const selectedRouteId = ref<string | null>(null)

const isPlayingTour = ref(false)
let tourTimer: any = null
let currentTourIndex = 0

// Gallery Lightbox State
const activeImageIndex = ref<number | null>(null)
const activePanelTab = ref<'info' | 'history' | 'media'>('info')

// Bottom sheet state is handled inside the component

const categories = CATEGORIES
const periods = PERIODS
const clusters = CLUSTERS

const selectedHeritage = computed(() =>
  selectedId.value ? store.getById(selectedId.value) ?? null : null,
)

const selectedRoute = computed(() =>
  suggestedRoutes.find((route) => route.id === selectedRouteId.value) ?? null,
)

// Feature Filters configuration list
const featureFilters = [
  { id: 'noi-bat', label: 'Nổi bật', icon: 'mdi:star' },
  { id: 'co-audio', label: 'Có Audio', icon: 'mdi:headphones' },
  { id: 'co-anh', label: 'Có Ảnh', icon: 'mdi:image-multiple' },
  { id: 'co-video', label: 'Có Video', icon: 'mdi:video' },
  { id: 'di-tich', label: 'Di Tích', icon: 'mdi:castle' },
  { id: 'danh-lam', label: 'Danh Thắng', icon: 'mdi:mountain' },
  { id: 'thac', label: 'Thác Nước', icon: 'mdi:waves' },
  { id: 'suoi', label: 'Suối nguồn', icon: 'mdi:water' },
  { id: 'van-hoa', label: 'Văn Hóa', icon: 'mdi:music-note' },
  { id: 'le-hoi', label: 'Lễ Hội', icon: 'mdi:calendar-star' },
  { id: 'cong-dong', label: 'Cộng Đồng', icon: 'mdi:home-group' },
]

// Computed list of heritages that handles both route selection, basic store filters, and advanced feature filters
const displayedHeritages = computed(() => {
  let list = store.filteredHeritages

  if (selectedRoute.value) {
    const stopIds = new Set(selectedRoute.value.stops.map((stop) => stop.id))
    list = list.filter((heritage) => stopIds.has(heritage.id))
  }

  if (activeFilterFeature.value) {
    const feature = activeFilterFeature.value
    list = list.filter((h) => {
      if (feature === 'di-tich') return h.category === 'lich-su'
      if (feature === 'danh-lam') return h.category === 'danh-thang'
      if (feature === 'thac') return h.title.toLowerCase().includes('thác') || h.tags.some(t => t.toLowerCase().includes('thác'))
      if (feature === 'suoi') return h.title.toLowerCase().includes('suối') || h.tags.some(t => t.toLowerCase().includes('suối'))
      if (feature === 'van-hoa') return h.category === 'van-hoa-phi-vat-the'
      if (feature === 'le-hoi') return h.title.toLowerCase().includes('lễ hội') || h.tags.some(t => t.toLowerCase().includes('lễ hội'))
      if (feature === 'cong-dong') return h.category === 'doi-song-cong-dong'
      if (feature === 'noi-bat') return h.featured
      if (feature === 'co-audio') return !!h.audio
      if (feature === 'co-anh') return h.gallery && h.gallery.length > 0
      if (feature === 'co-video') return !!h.video
      return true
    })
  }

  return list
})

const heritagesByCategory = store.heritagesByCategory

// Audio check
const isPlayingCurrentTrack = computed(() => {
  return audioStore.isPlaying && audioStore.currentTrack?.id === selectedHeritage.value?.audio?.id
})

// Suggested routes list
const suggestedRoutes = [
  {
    id: 'route-history',
    name: 'Tuyến Cách Mạng Oai Hùng',
    icon: 'mdi:shield-outline',
    color: '#F59E0B',
    description: 'Về nguồn khám phá các căn cứ quân sự huyết mạch và lớp học kháng chiến oai hùng giữa lòng đại ngàn Thành Phố Đồng Nai.',
    stops: [
      { id: 'hrt-001', title: 'Căn cứ Nửa Lon Bù Đăng' },
      { id: 'hrt-011', title: 'Khu Bảo Tồn Sóc Bom Bo' },
      { id: 'hrt-005', title: 'Di Tích Nhà Giáo Truyền Thống' }
    ]
  },
  {
    id: 'route-nature',
    name: 'Danh Lam & Sinh Thái Xanh',
    icon: 'mdi:pine-tree',
    color: '#12B981',
    description: 'Hành trình hòa mình cùng rừng già nguyên sinh kỳ vĩ và lắng nghe tiếng réo rắt thiên nhiên của danh thắng Thác Đứng, Bù Lạch.',
    stops: [
      { id: 'hrt-010', title: 'Thác Đứng Bù Đăng' },
      { id: 'hrt-006', title: 'Rừng Nguyên Sinh Bù Đăng' },
      { id: 'hrt-009', title: 'Trảng Cỏ Bù Lạch' }
    ]
  },
  {
    id: 'route-culture',
    name: 'Bản Sắc Bản Địa S\'tiêng - M\'nông',
    icon: 'mdi:account-group-outline',
    color: '#C7A664',
    description: 'Dòng chảy văn hóa cồng chiêng phi vật thể (Cồng chiêng Tây Nguyên, UNESCO 2005), nghề dệt hoa văn thổ cẩm tỉ mẩn cùng nghi lễ nông nghiệp thiêng liêng.',
    stops: [
      { id: 'hrt-003', title: 'Lễ Hội Cồng Chiêng S\'tiêng' },
      { id: 'hrt-004', title: 'Nhà Dài Truyền Thống S\'tiêng' },
      { id: 'hrt-007', title: 'Làng Nghề Dệt Thổ Cẩm S\'tiêng' },
      { id: 'hrt-008', title: 'Lễ Hội Mừng Lúa Mới M\'nông' }
    ]
  },
  {
    id: 'route-phuoclong',
    name: 'Hành Trình Phước Long – Lộc Ninh',
    icon: 'mdi:map-legend',
    color: '#C7A664',
    description: 'Khám phá chiến trường lịch sử Phước Long, đỉnh thiêng Bà Rá và căn cứ Tà Thiết — di tích quốc gia đặc biệt của vùng đất anh hùng.',
    stops: [
      { id: 'hrt-012', title: 'Núi Bà Rá — Phước Long' },
      { id: 'hrt-002', title: 'Hồ Thác Mơ — Phước Long' },
      { id: 'hrt-013', title: 'Chiến Thắng Phước Long 1975' },
      { id: 'hrt-016', title: 'Bảo Tàng Chiến Dịch Đường 14' },
      { id: 'hrt-014', title: 'Căn Cứ Tà Thiết — Lộc Ninh' },
      { id: 'hrt-015', title: 'Nhà Giao Tế Lộc Ninh' }
    ]
  }
]

// Watches
watch(searchQuery, (q) => {
  store.setSearch(q)
  // Only auto-select when the search narrows down to exactly one heritage —
  // flying the map on every keystroke is disorienting
  if (q && displayedHeritages.value.length === 1 && displayedHeritages.value[0]) {
    selectedId.value = displayedHeritages.value[0].id
  }
})

watch(activeCategory, (c) => store.setCategory(c))
watch(activePeriod, (p) => store.setPeriod(p))
watch(activeCluster, (c) => store.setCluster(c))
watch(selectedId, () => {
  activePanelTab.value = 'info'
})

// Inject TouristAttraction schema.org dynamic JSON-LD when heritage selected
watchEffect(() => {
  if (!selectedHeritage.value) return
  const h = selectedHeritage.value
  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'heritage-attraction-jsonld',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TouristAttraction',
          name: h.title,
          description: h.shortDescription,
          image: h.coverImage,
          geo: h.coordinates ? {
            '@type': 'GeoCoordinates',
            latitude: h.coordinates.lat,
            longitude: h.coordinates.lng,
          } : undefined,
          address: {
            '@type': 'PostalAddress',
            addressLocality: h.id === 'hrt-012' || h.id === 'hrt-013' || h.id === 'hrt-016' ? 'Xã Thác Mơ' : h.id === 'hrt-014' || h.id === 'hrt-015' ? 'Xã Lộc Thành' : 'Xã Bù Đăng',
            addressRegion: 'Thành phố Đồng Nai',
            addressCountry: 'VN'
          }
        })
      }
    ]
  })
})

// Selection changes are watched inside the child component to reset snap state

// Global listeners for keybind access
useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (activeImageIndex.value !== null) {
      activeImageIndex.value = null
    } else {
      selectedId.value = null
    }
  }
})

onMounted(() => {
  const route = useRoute()
  const checkDesktop = () => { isDesktop.value = window.innerWidth >= 1024 }
  checkDesktop()
  window.addEventListener('resize', checkDesktop)
  onUnmounted(() => {
    window.removeEventListener('resize', checkDesktop)
    if (tourTimer) clearTimeout(tourTimer)
  })

  sidebarOpen.value = isDesktop.value
  if (route.query.select) {
    selectedId.value = route.query.select as string
  }

  // Store là app-wide singleton (dùng chung với /explore) — luôn đồng bộ lại
  // theo state cục bộ của trang này, tránh dính filter còn sót từ trang khác.
  store.setSearch(searchQuery.value)
  store.setCategory(activeCategory.value)
  store.setPeriod(activePeriod.value)
  store.setCluster(activeCluster.value)
})

function startTour() {
  if (displayedHeritages.value.length === 0) return
  isPlayingTour.value = true
  currentTourIndex = 0
  runTourStep()
}

function stopTour() {
  isPlayingTour.value = false
  if (tourTimer) {
    clearTimeout(tourTimer)
    tourTimer = null
  }
}

function runTourStep() {
  if (!isPlayingTour.value) return
  const list = displayedHeritages.value
  if (currentTourIndex >= list.length) {
    stopTour()
    const swal = useSwal()
    swal.fire({
      title: 'Hành trình kết thúc',
      text: 'Bạn đã hoàn thành chuyến tham quan tự động tất cả các điểm di sản đang hiển thị.',
      icon: 'success',
      confirmButtonColor: '#C7A664',
      background: '#221D17',
      color: '#F5F1EA'
    })
    return
  }

  const heritage = list[currentTourIndex]
  if (heritage) {
    selectHeritage(heritage)
    currentTourIndex++

    if (tourTimer) {
      clearTimeout(tourTimer)
      tourTimer = null
    }

    if (heritage.audio) {
      audioStore.loadTrack(heritage.audio, heritage.id)
      audioStore.play()

      const checkFinished = () => {
        if (!isPlayingTour.value) return
        
        const isEnded = !audioStore.isPlaying && audioStore.currentTime === 0
        const isNotSameTrack = audioStore.currentTrack?.id !== heritage.audio?.id
        
        if (isEnded || isNotSameTrack) {
          tourTimer = setTimeout(() => {
            runTourStep()
          }, 1500)
        } else {
          tourTimer = setTimeout(checkFinished, 1000)
        }
      }
      tourTimer = setTimeout(checkFinished, 2000)
    } else {
      tourTimer = setTimeout(() => {
        runTourStep()
      }, 9000)
    }
  }
}

function setCategory(id: string) {
  activeCategory.value = id
  selectedRouteId.value = null // reset route if manual filtering occurs
}

function toggleFeatureFilter(id: string) {
  if (activeFilterFeature.value === id) {
    activeFilterFeature.value = ''
  } else {
    activeFilterFeature.value = id
  }
}

function clearAll() {
  searchQuery.value = ''
  activeCategory.value = ''
  activePeriod.value = ''
  activeCluster.value = ''
  activeFilterFeature.value = ''
  selectedRouteId.value = null
  store.clearFilters()
}

function selectHeritage(heritage: Heritage) {
  selectedId.value = heritage.id
  // Only close sidebar on mobile to avoid layout shifts on desktop
  if (!isDesktop.value) {
    sidebarOpen.value = false
  }
}

function toggleRoute(route: any) {
  if (selectedRouteId.value === route.id) {
    selectedRouteId.value = null
  } else {
    selectedRouteId.value = route.id
    if (route.stops.length > 0) {
      selectStop(route.stops[0])
    }
  }
}

function selectStop(stop: any) {
  const matching = HERITAGES.find(h => h.id === stop.id)
  if (matching) {
    selectedId.value = matching.id
  }
}

function getCategoryVariant(cat: string) {
  const map: Record<string, any> = {
    'lich-su': 'brick', 'danh-thang': 'forest',
    'van-hoa-phi-vat-the': 'gold', 'doi-song-cong-dong': 'earth',
    'giao-duc-truyen-thong': 'copper',
  }
  return map[cat] ?? 'gold'
}

function playAudio() {
  if (selectedHeritage.value?.audio) {
    if (isPlayingCurrentTrack.value) {
      audioStore.pause()
    } else {
      audioStore.loadTrack(selectedHeritage.value.audio, selectedHeritage.value.id)
      audioStore.play()
    }
  }
}

function getGoogleMapsDirectionUrl(heritage: Heritage): string {
  if (heritage.coordinates && heritage.coordinates.lat && heritage.coordinates.lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${heritage.coordinates.lat},${heritage.coordinates.lng}`
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(heritage.title + ' Thành Phố Đồng Nai')}`
}

// toggleMobileHeight is handled by bottom sheet gestures

// Lightbox navigation functions
function prevImage() {
  if (!selectedHeritage.value?.gallery || activeImageIndex.value === null) return
  const total = selectedHeritage.value.gallery.length
  activeImageIndex.value = (activeImageIndex.value - 1 + total) % total
}

function nextImage() {
  if (!selectedHeritage.value?.gallery || activeImageIndex.value === null) return
  const total = selectedHeritage.value.gallery.length
  activeImageIndex.value = (activeImageIndex.value + 1) % total
}
</script>

<style scoped>
/* Desktop Slide In Animations */
.panel-slide-right-enter-active, .panel-slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.panel-slide-right-enter-from, .panel-slide-right-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

/* Mobile Bottom Sheet Animations */
.sheet-slide-enter-active, .sheet-slide-leave-active {
  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
}
.sheet-slide-enter-from, .sheet-slide-leave-to {
  transform: translateY(100%) !important;
}

/* Fade animation for lightbox */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (min-width: 1024px) {
  .map-sidebar {
    transform: none !important;
    transition: none !important;
  }
}
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

/* Hide default scrollbar for panels */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
