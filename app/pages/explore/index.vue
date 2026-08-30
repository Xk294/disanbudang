<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory">
    <!-- Hero header -->
    <div class="bg-dark-earth py-12 md:py-16 relative overflow-hidden border-b border-charcoal-850">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl -translate-y-1/2" />
        <div class="absolute top-0 left-0 w-80 h-80 bg-earth-600/10 rounded-full blur-3xl" />
        <div class="noise-overlay" />
      </div>
      <div class="container-heritage relative z-10">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-3xs uppercase font-bold tracking-widest mb-4">
              <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping inline-block" />
              Bảo Tàng Số Di Sản Bù Đăng · TP. Đồng Nai
            </div>
            <h1 class="font-heading font-bold text-ivory text-4xl md:text-5xl lg:text-6xl leading-[1.35] mb-5 text-balance tracking-normal">
              Thư Viện Di Sản &<br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-earth-400">Ký Ức Sống Bản Địa</span>
            </h1>
            <p class="text-charcoal-300 text-sm md:text-base leading-relaxed max-w-2xl font-body">
              Kho dữ liệu số hóa toàn diện <strong>{{ store.totalCount }} di tích, danh thắng và di sản phi vật thể</strong> vùng đất Bù Đăng — Thành Phố Đồng Nai. Từ những địa chỉ đỏ kháng chiến kiên cường đến thanh âm cồng chiêng ngân vang giữa đại ngàn.
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              class="px-5 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg shadow-gold-500/20 hover:-translate-y-0.5"
              @click="discoverRandomHeritage"
              title="Khám phá ngẫu nhiên một di sản"
            >
              <Icon name="mdi:dice-5-outline" class="w-4 h-4" />
              <span>Khám Phá Ngẫu Nhiên</span>
            </button>
            <NuxtLink
              to="/map"
              class="px-5 py-3 rounded-2xl bg-charcoal-950/80 hover:bg-charcoal-900 border border-charcoal-750 hover:border-gold-500/50 text-ivory font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Icon name="mdi:map-legend" class="w-4 h-4 text-gold-400" />
              <span>Bản Đồ GIS</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Metrics pill bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-charcoal-800/60 max-w-4xl">
          <div class="bg-charcoal-950/60 border border-charcoal-800 rounded-xl p-3 flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0">
              <Icon name="mdi:archive-outline" class="w-5 h-5" />
            </div>
            <div>
              <span class="block text-base font-bold text-ivory font-heading leading-none">{{ store.totalCount }} Di Sản</span>
              <span class="text-3xs text-charcoal-400 uppercase tracking-wider">Số hóa toàn diện</span>
            </div>
          </div>

          <div class="bg-charcoal-950/60 border border-charcoal-800 rounded-xl p-3 flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Icon name="mdi:headphones" class="w-5 h-5" />
            </div>
            <div>
              <span class="block text-base font-bold text-ivory font-heading leading-none">Audio Thuyết minh</span>
              <span class="text-3xs text-charcoal-400 uppercase tracking-wider">2 di sản có giọng dẫn</span>
            </div>
          </div>

          <div class="bg-charcoal-950/60 border border-charcoal-800 rounded-xl p-3 flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Icon name="mdi:rotate-3d" class="w-5 h-5" />
            </div>
            <div>
              <span class="block text-base font-bold text-ivory font-heading leading-none">360° VR Tour</span>
              <span class="text-3xs text-charcoal-400 uppercase tracking-wider">Tương tác hiện vật</span>
            </div>
          </div>

          <div class="bg-charcoal-950/60 border border-charcoal-800 rounded-xl p-3 flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <Icon name="mdi:account-group-outline" class="w-5 h-5" />
            </div>
            <div>
              <span class="block text-base font-bold text-ivory font-heading leading-none">{{ COMMUNITY_POSTS.length }} Ký Ức</span>
              <span class="text-3xs text-charcoal-400 uppercase tracking-wider">Người dân đóng góp</span>
            </div>
          </div>
        </div>

        <!-- Search bar — chỉ hiện ở tab Di Sản -->
        <div v-if="activeMainTab === 'heritage'" class="mt-8 max-w-2xl space-y-3">
          <div class="relative">
            <Icon
              name="mdi:magnify"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400 pointer-events-none z-10"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm di sản, địa danh, hiện vật (ví dụ: Sóc Bom Bo, Cồng Chiêng, Bù Lạch)..."
              class="w-full bg-charcoal-950 border border-charcoal-800 rounded-2xl text-ivory text-sm pl-12 pr-12 py-3.5 placeholder-charcoal-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300"
            />
            <button
              v-if="searchQuery"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-ivory"
              @click="searchQuery = ''"
            >
              <Icon name="mdi:close-circle" class="w-5 h-5" />
            </button>
          </div>

          <!-- Suggested keyword chips -->
          <div class="flex items-center gap-1.5 flex-wrap text-3xs text-charcoal-400">
            <span class="font-semibold text-charcoal-500">Gợi ý tìm kiếm:</span>
            <button
              v-for="kw in ['Chiến Khu Đ', 'Sóc Bom Bo', 'Trảng Cỏ Bù Lạch', 'Cồng Chiêng', 'Dệt Thổ Cẩm', 'Thác Đứng', 'Căn Cứ U1']"
              :key="kw"
              type="button"
              class="px-2.5 py-0.5 rounded-full bg-charcoal-950 border border-charcoal-800 hover:border-gold-500/40 hover:text-gold-300 transition-colors"
              @click="searchQuery = kw"
            >
              #{{ kw }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== 3 CUNG ĐƯỜNG DI SẢN TRỌNG ĐIỂM (CURATED TRAILS) ===== -->
    <div v-if="activeMainTab === 'heritage' && !searchQuery && !activeCluster" class="border-b border-charcoal-850 bg-charcoal-950/80 py-8">
      <div class="container-heritage">
        <div class="flex items-end justify-between mb-5">
          <div>
            <span class="section-label text-gold-400">Hành trình khám phá</span>
            <h3 class="font-heading text-xl md:text-2xl font-bold text-ivory mt-1">3 Cung Đường Di Sản Bù Đăng Đặc Sắc</h3>
          </div>
          <span class="text-charcoal-400 text-3xs font-semibold uppercase tracking-wider hidden sm:block">Chạm để lọc theo cung đường</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Trail 1 -->
          <div
            class="p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-charcoal-900 to-charcoal-950 border transition-all duration-300 group cursor-pointer hover:-translate-y-0.5 shadow-lg"
            :class="activeCategory === 'lich-su'
              ? 'border-red-500 ring-2 ring-red-500/40 bg-red-950/60 shadow-red-950/50'
              : 'border-red-900/40 hover:border-red-500/50 opacity-90 hover:opacity-100'"
            @click="selectCuratedTrail('lich-su')"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-3xs font-bold uppercase tracking-wider">Cung Đường Đỏ</span>
              <span class="text-3xs text-charcoal-400">1 Ngày Lịch Sử</span>
            </div>
            <h4 class="font-heading font-bold text-ivory text-base group-hover:text-red-300 transition-colors leading-snug">
              Huyền Thoại Kháng Chiến & Tiếng Chày Bom Bo
            </h4>
            <p class="text-charcoal-300 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              Chiến Khu Đ ➔ Sóc Bom Bo ➔ Căn Cứ Nửa Lon ➔ Căn Cứ Tà Thiết. Ký ức kiên trung thâu đêm giã gạo nuôi quân.
            </p>
            <div class="mt-4 pt-3 border-t border-charcoal-800/80 flex items-center justify-between text-3xs text-red-400 font-bold">
              <span>{{ activeCategory === 'lich-su' ? 'Đang lọc 6 di tích (Chạm để hủy)' : 'Xem 6 di tích cách mạng' }}</span>
              <Icon :name="activeCategory === 'lich-su' ? 'mdi:check-circle' : 'mdi:arrow-right'" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <!-- Trail 2 -->
          <div
            class="p-5 rounded-2xl bg-gradient-to-br from-green-950/40 via-charcoal-900 to-charcoal-950 border transition-all duration-300 group cursor-pointer hover:-translate-y-0.5 shadow-lg"
            :class="activeCategory === 'danh-thang'
              ? 'border-green-500 ring-2 ring-green-500/40 bg-green-950/60 shadow-green-950/50'
              : 'border-green-900/40 hover:border-green-500/50 opacity-90 hover:opacity-100'"
            @click="selectCuratedTrail('danh-thang')"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-3xs font-bold uppercase tracking-wider">Cung Đường Xanh</span>
              <span class="text-3xs text-charcoal-400">Sinh Thái & Thác Rừng</span>
            </div>
            <h4 class="font-heading font-bold text-ivory text-base group-hover:text-green-300 transition-colors leading-snug">
              Kỳ Quan Thảo Nguyên & Thác Nước Đại Ngàn
            </h4>
            <p class="text-charcoal-300 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              Trảng Cỏ Bù Lạch ➔ Hồ Thác Mơ ➔ Thác Đứng Đăk Wuar ➔ Núi Bà Rá. Thung lũng cỏ tự nhiên 140 ha giữa rừng già.
            </p>
            <div class="mt-4 pt-3 border-t border-charcoal-800/80 flex items-center justify-between text-3xs text-green-400 font-bold">
              <span>{{ activeCategory === 'danh-thang' ? 'Đang lọc 5 danh thắng (Chạm để hủy)' : 'Xem 5 danh lam thắng cảnh' }}</span>
              <Icon :name="activeCategory === 'danh-thang' ? 'mdi:check-circle' : 'mdi:arrow-right'" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <!-- Trail 3 -->
          <div
            class="p-5 rounded-2xl bg-gradient-to-br from-gold-950/40 via-charcoal-900 to-charcoal-950 border transition-all duration-300 group cursor-pointer hover:-translate-y-0.5 shadow-lg"
            :class="activeCategory === 'van-hoa-phi-vat-the'
              ? 'border-gold-500 ring-2 ring-gold-500/40 bg-gold-950/60 shadow-gold-950/50'
              : 'border-gold-900/40 hover:border-gold-500/50 opacity-90 hover:opacity-100'"
            @click="selectCuratedTrail('van-hoa-phi-vat-the')"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 text-3xs font-bold uppercase tracking-wider">Cung Đường Văn Hóa</span>
              <span class="text-3xs text-charcoal-400">Cùng Cội Nguồn UNESCO</span>
            </div>
            <h4 class="font-heading font-bold text-ivory text-base group-hover:text-gold-300 transition-colors leading-snug">
              Hồn Thiêng Cồng Chiêng & Bản Sắc S'tiêng
            </h4>
            <p class="text-charcoal-300 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              Không gian cồng chiêng Yang Ching ➔ Dệt thổ cẩm Sơk Pơng ➔ Nghệ thuật Đàn đá cổ ➔ Lễ hội Mừng lúa mới Yang Sri.
            </p>
            <div class="mt-4 pt-3 border-t border-charcoal-800/80 flex items-center justify-between text-3xs text-gold-400 font-bold">
              <span>{{ activeCategory === 'van-hoa-phi-vat-the' ? 'Đang lọc 2 di sản (Chạm để hủy)' : 'Xem di sản phi vật thể' }}</span>
              <Icon :name="activeCategory === 'van-hoa-phi-vat-the' ? 'mdi:check-circle' : 'mdi:arrow-right'" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== VIRTUAL TOUR ENTRY BANNER ===== -->
    <div class="border-b border-charcoal-850 bg-charcoal-950">
      <div class="container-heritage py-4">
        <NuxtLink
          to="/explore/virtual-tour"
          id="virtual-tour-entry"
          class="group flex items-center gap-5 rounded-2xl overflow-hidden border border-gold-500/30 hover:border-gold-500/70 transition-all duration-400 relative p-1"
          style="background: linear-gradient(135deg, #1A140F 0%, #241C15 50%, #1A140F 100%);"
        >
          <!-- Thumbnail strip -->
          <div class="hidden sm:flex flex-shrink-0 h-[84px] w-[220px] rounded-xl overflow-hidden relative border border-charcoal-800">
            <img
              src="/video/virtual-tour/bom-bo/poster.jpg"
              alt="Khu Bảo Tồn Bom Bo"
              class="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <img
              src="/video/virtual-tour/trang-co/poster.jpg"
              alt="Trảng Cỏ Bù Lạch"
              class="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <!-- 360 badge overlay -->
            <div class="absolute inset-0 bg-charcoal-950/30 flex items-center justify-center">
              <span class="px-2.5 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-gold-500/40 text-[10px] font-bold text-gold-400 flex items-center gap-1">
                <Icon name="mdi:rotate-3d-variant" class="w-3.5 h-3.5" />
                360° TOUR
              </span>
            </div>
          </div>

          <!-- Text content -->
          <div class="flex-1 py-2.5 pl-3 sm:pl-0 pr-2">
            <div class="flex items-center gap-2 mb-1">
              <span class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/20 rounded-full px-2.5 py-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping inline-block" />
                360° STREET VIEW
              </span>
              <span class="text-[10px] font-semibold uppercase tracking-widest text-charcoal-400">Bảo tàng số</span>
            </div>
            <h3 class="font-heading text-ivory text-base md:text-lg font-bold leading-snug mb-0.5 group-hover:text-gold-300 transition-colors">
              🏛️ Chuyến Tham Quan Ảo 360° — Sóc Bom Bo & Trảng Cỏ Bù Lạch
            </h3>
            <p class="text-charcoal-400 text-xs leading-relaxed">
              Xoay 360°, chuyển đổi giữa các điểm nhìn, tương tác hiện vật khảo cổ và lắng nghe Audio Guide
            </p>
          </div>

          <!-- Arrow CTA -->
          <div class="flex-shrink-0 pr-5 flex items-center">
            <div class="w-10 h-10 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all duration-300 group-hover:scale-110">
              <Icon name="mdi:rotate-3d" class="w-5 h-5 text-gold-400 group-hover:text-charcoal-950 transition-colors" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Sticky tab bar -->
    <div class="border-b border-charcoal-850 bg-charcoal-950/90 backdrop-blur-md sticky top-[68px] z-30">
      <div class="container-heritage flex items-center overflow-x-auto scrollbar-none">
        <button
          v-for="tab in mainTabs"
          :key="tab.id"
          class="flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-300 whitespace-nowrap"
          :class="activeMainTab === tab.id
            ? 'border-gold-500 text-gold-400'
            : 'border-transparent text-charcoal-400 hover:text-ivory'"
          :id="`main-tab-${tab.id}`"
          @click="activeMainTab = tab.id"
        >
          <Icon :name="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
          <span
            class="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            :class="activeMainTab === tab.id ? 'bg-gold-500/20 text-gold-400' : 'bg-charcoal-800 text-charcoal-500'"
          >{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- ===== TAB: DI SẢN ===== -->
    <div v-show="activeMainTab === 'heritage'" class="container-heritage py-10">
      <!-- Filters + Sort -->
      <div class="flex flex-col gap-4 mb-8 pb-6 border-b border-charcoal-850">
        <!-- Filter chips -->
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
          <button
            class="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border"
            :class="!activeCategory
              ? 'bg-gold-500 text-charcoal-900 border-transparent'
              : 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-ivory hover:border-charcoal-700'"
            @click="activeCategory = ''"
          >
            <Icon name="mdi:apps" class="w-3.5 h-3.5" />
            Tất cả ({{ store.totalCount }})
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border"
            :class="activeCategory === cat.id
              ? 'text-ivory border-transparent'
              : 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-ivory hover:border-charcoal-700'"
            :style="activeCategory === cat.id ? { backgroundColor: cat.color } : {}"
            @click="activeCategory = cat.id"
          >
            <Icon :name="cat.icon" class="w-3.5 h-3.5" />
            {{ cat.labelShort }}
          </button>
        </div>

        <!-- Cluster chips (regional trail) -->
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
          <button
            class="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-3xs font-bold uppercase tracking-wider transition-all duration-300 border"
            :class="!activeCluster
              ? 'bg-charcoal-800 text-ivory border-charcoal-700'
              : 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-ivory hover:border-charcoal-700'"
            @click="activeCluster = ''"
          >
            <Icon name="mdi:map-marker-multiple-outline" class="w-3.5 h-3.5" />
            Mọi cụm di sản
          </button>
          <button
            v-for="clu in clusters"
            :key="clu.id"
            class="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-3xs font-bold uppercase tracking-wider transition-all duration-300 border"
            :class="activeCluster === clu.id
              ? 'text-ivory border-transparent'
              : 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-ivory hover:border-charcoal-700'"
            :style="activeCluster === clu.id ? { backgroundColor: clu.color } : {}"
            @click="activeCluster = clu.id"
          >
            <Icon :name="clu.icon" class="w-3.5 h-3.5" />
            {{ clu.label }}
          </button>
        </div>

        <!-- Sort + Result count -->
        <div class="flex items-center justify-between gap-4">
          <p class="text-charcoal-400 text-sm">
            <span class="text-gold-400 font-bold">{{ sortedAndFilteredHeritages.length }}</span>
            / {{ store.totalCount }} di sản
            <span v-if="searchQuery || activeCategory || activeCluster" class="ml-2">
              <button class="text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-2 text-xs" @click="clearFilters">Xóa bộ lọc</button>
            </span>
          </p>
          <div class="relative flex items-center shrink-0">
            <select
              v-model="sortOrder"
              class="appearance-none bg-charcoal-950 border border-charcoal-800 rounded-xl pl-4 pr-9 py-2 text-xs text-ivory font-medium focus:outline-none focus:border-gold-500/60 transition-all cursor-pointer"
            >
              <option value="views">Xem nhiều nhất</option>
              <option value="alpha">Tên A-Z</option>
              <option value="newest">Mới nhất</option>
            </select>
            <Icon name="mdi:chevron-down" class="w-4 h-4 text-gold-450 absolute right-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="'skel-'+n" class="rounded-2xl overflow-hidden border border-charcoal-850 bg-charcoal-950/30 animate-pulse">
          <div class="aspect-[4/3] bg-charcoal-800/60" />
          <div class="p-5 space-y-3">
            <div class="h-3 w-16 bg-charcoal-800/60 rounded-full" />
            <div class="h-5 w-full bg-charcoal-800/60 rounded-lg" />
            <div class="h-4 w-3/4 bg-charcoal-800/60 rounded-lg" />
          </div>
        </div>
      </div>

      <!-- Heritage Grid -->
      <div v-else-if="sortedAndFilteredHeritages.length > 0">
        <!-- Spotlight: cinematic featured picks (only on unfiltered default view) -->
        <div v-if="showSpotlight" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <NuxtLink
            v-for="(h, i) in spotlightItems"
            :key="h.id"
            :ref="(el) => setSpotlightRef(el, i)"
            :to="`/heritage/${h.slug}`"
            class="group relative rounded-3xl overflow-hidden aspect-[16/10] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.65)] hover:shadow-[0_28px_80px_-14px_rgba(201,166,100,0.25)] transition-shadow duration-700"
          >
            <!-- Ghost serial number — editorial premium marker -->
            <span
              class="absolute -top-4 -left-2 font-heading font-bold text-[7rem] leading-none text-ivory/[0.06] select-none pointer-events-none z-0"
              aria-hidden="true"
            >{{ String(i + 1).padStart(2, '0') }}</span>

            <!-- Parallax image layer -->
            <div class="absolute -inset-y-[8%] inset-x-0" :style="{ transform: `translateY(${parallaxOffsets[i] || 0}px)` }">
              <NuxtImg
                :src="h.coverImage"
                :alt="h.title"
                class="w-full h-[116%] object-cover img-cinematic transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/45 to-transparent" />
            <div v-if="h.featured" class="absolute top-4 left-4 flex items-center gap-1.5 bg-gold-500 text-charcoal-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
              <Icon name="mdi:star" class="w-3 h-3" />
              Nổi Bật
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10">
              <p class="eyebrow text-gold-400 mb-2">
                {{ getCategoryLabel(h.category) }}<span v-if="h.year"> · {{ h.year }}</span>
              </p>
              <h3 class="font-heading font-bold text-ivory text-2xl sm:text-3xl leading-snug mb-1.5 group-hover:text-gold-200 transition-colors">
                {{ h.title }}
              </h3>
              <p v-if="h.subtitle" class="text-ivory/60 text-sm italic">{{ h.subtitle }}</p>
            </div>
            <div class="absolute bottom-6 right-6 sm:bottom-7 sm:right-7 w-10 h-10 rounded-full bg-gold-500/90 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out-expo z-10">
              <Icon name="mdi:arrow-right" class="w-5 h-5 text-charcoal-900" />
            </div>
          </NuxtLink>
        </div>

        <!-- Grid with periodic storytelling banners -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <template v-for="entry in gridEntries" :key="entry.kind === 'card' ? entry.heritage.id : entry.id">
            <HeritageCard
              v-if="entry.kind === 'card'"
              :heritage="entry.heritage"
              @click="navigateTo(`/heritage/${entry.heritage.slug}`)"
            />
            <div
              v-else
              class="col-span-full rounded-2xl overflow-hidden relative px-6 py-6 sm:px-8 sm:py-7 border-t border-gold-500/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
              :style="{ background: `linear-gradient(135deg, ${entry.cat.color}1A 0%, transparent 75%)` }"
            >
              <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  :style="{ backgroundColor: `${entry.cat.color}22`, border: `1px solid ${entry.cat.color}55` }"
                >
                  <Icon :name="entry.cat.icon" class="w-6 h-6" :style="{ color: entry.cat.color }" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="eyebrow text-gold-400 mb-1">{{ entry.cat.label }}</p>
                  <p class="text-charcoal-300 text-sm leading-relaxed max-w-2xl">{{ entry.cat.description }}</p>
                </div>
                <button
                  class="btn-secondary shrink-0 self-start sm:self-center"
                  @click="activeCategory = entry.cat.id"
                >
                  Xem Tất Cả
                  <Icon name="mdi:arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="py-20 px-6 text-center border border-dashed border-charcoal-800/80 rounded-3xl bg-charcoal-950/40 max-w-xl mx-auto">
        <div class="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4 text-gold-400">
          <Icon name="mdi:archive-search-outline" class="w-8 h-8" />
        </div>
        <h2 class="font-heading font-bold text-ivory text-xl mb-2">Không Tìm Thấy Di Sản Phù Hợp</h2>
        <p class="text-charcoal-400 text-sm mb-6 max-w-md mx-auto">
          Không có kết quả nào khớp với điều kiện tìm kiếm hoặc bộ lọc hiện tại.
        </p>
        <button
          class="px-6 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-gold-500/20 hover:-translate-y-0.5"
          @click="clearFilters"
        >
          <Icon name="mdi:refresh" class="w-4 h-4" />
          <span>Xem Toàn Bộ {{ store.totalCount }} Di Sản</span>
        </button>
      </div>
    </div>

    <!-- ===== TAB: KÝ ỨC CỘNG ĐỒNG ===== -->
    <div v-show="activeMainTab === 'community'" class="container-heritage py-10">
      <!-- Sub-filter tabs -->
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-none mb-8 pb-4 border-b border-charcoal-850 -mx-1 px-1">
        <button
          v-for="tab in communityTabs"
          :key="tab.id"
          class="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border"
          :class="activeCommunityTab === tab.id
            ? 'bg-gold-500 text-charcoal-900 border-transparent'
            : 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-ivory hover:border-charcoal-700'"
          @click="activeCommunityTab = tab.id"
        >
          <Icon :name="tab.icon" class="w-3.5 h-3.5" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Active tag filter -->
      <div v-if="activeTag" class="flex items-center gap-2 mb-6">
        <span class="text-charcoal-400 text-xs">Đang lọc theo thẻ:</span>
        <span class="inline-flex items-center gap-1.5 bg-gold-500/15 border border-gold-500/25 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full">
          #{{ activeTag }}
          <button type="button" aria-label="Bỏ lọc thẻ" @click="activeTag = ''">
            <Icon name="mdi:close" class="w-3.5 h-3.5" />
          </button>
        </span>
      </div>

      <!-- Posts grid -->
      <div v-if="filteredCommunityPosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, i) in filteredCommunityPosts"
          :key="post.id"
          :to="`/explore/${post.id}`"
          class="bg-charcoal-950/40 rounded-2xl overflow-hidden shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.75)] transition-shadow duration-500 group flex flex-col reveal"
          :style="{ animationDelay: `${i * 0.05}s` }"
        >
          <!-- Cover image -->
          <div class="aspect-[16/10] overflow-hidden relative shrink-0">
            <img
              :src="post.coverImage"
              :alt="post.title"
              class="w-full h-full object-cover img-cinematic transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
            <!-- Featured badge -->
            <div v-if="post.featured" class="absolute top-3 left-3">
              <span class="bg-gold-500 text-charcoal-900 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">Nổi bật</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-center justify-between mb-3">
              <span class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
                <Icon :name="typeIcons[post.type]" class="w-3 h-3" />
                {{ typeLabels[post.type] }}
              </span>
              <div v-if="post.viewCount" class="flex items-center gap-1 text-charcoal-500 text-xs">
                <Icon name="mdi:eye-outline" class="w-3.5 h-3.5" />
                <span>{{ post.viewCount }}</span>
              </div>
            </div>
            <h3 class="font-heading font-bold text-ivory text-base leading-snug mb-2 line-clamp-2 group-hover:text-gold-300 transition-colors flex-1">
              {{ post.title }}
            </h3>
            <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-2 mb-4">{{ post.excerpt }}</p>

            <!-- Author -->
            <div class="flex items-center gap-2.5 border-t border-charcoal-850 pt-4 mt-auto">
              <div class="w-7 h-7 rounded-full bg-charcoal-900 border border-charcoal-800 flex items-center justify-center shrink-0">
                <Icon name="mdi:account" class="w-4 h-4 text-gold-400/70" />
              </div>
              <div class="min-w-0">
                <p class="text-ivory text-xs font-semibold truncate leading-snug">{{ post.author.name }}</p>
                <p class="text-charcoal-500 text-[10px] truncate">
                  {{ post.author.role }}{{ post.author.grade ? ` · Lớp ${post.author.grade}` : '' }}
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="py-24 text-center border border-dashed border-charcoal-800 rounded-3xl max-w-xl mx-auto">
        <Icon name="mdi:book-open-page-variant-outline" class="w-14 h-14 text-charcoal-400 mx-auto mb-4" />
        <p class="text-charcoal-400 font-heading font-semibold text-lg mb-2">Chưa có nội dung trong danh mục này</p>
        <p class="text-charcoal-500 text-sm mb-6">Hãy là người đầu tiên chia sẻ câu chuyện của mình.</p>
        <NuxtLink to="/contribute" class="btn-primary inline-flex">
          <Icon name="mdi:upload" class="w-4 h-4" />
          Đóng Góp Ngay
        </NuxtLink>
      </div>

      <!-- Contribute CTA -->
      <div class="mt-14 text-center reveal">
        <div class="inline-block bg-charcoal-950 border border-charcoal-850 rounded-3xl px-8 py-7 max-w-lg mx-auto shadow-2xl">
          <Icon name="mdi:book-open-page-variant-outline" class="w-9 h-9 text-gold-400 mx-auto mb-3" />
          <h3 class="font-heading font-bold text-ivory text-lg mb-2">Ký ức nào cũng xứng đáng được lưu lại</h3>
          <p class="text-charcoal-400 text-sm mb-5 leading-relaxed">Một tấm ảnh xưa, một đoạn ghi chép, hay chỉ là câu chuyện kể bên bếp lửa — mỗi mảnh ghép đều làm bức tranh di sản thêm đầy đặn.</p>
          <NuxtLink to="/contribute" class="btn-primary inline-flex">
            Gửi Ký Ức Đóng Góp
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES, CATEGORY_MAP } from '~/data/categories'
import { CLUSTERS } from '~/data/clusters'
import { COMMUNITY_POSTS } from '~/data/posts'
import { HERITAGES } from '~/data/heritages'
import type { Heritage, HeritageCategory_Meta, PostType } from '~/types'

definePageMeta({ layout: 'default' })
useMuseumSeo({
  title: 'Thư Viện Di Sản & Ký Ức Cộng Đồng',
  description: '16 di sản số hóa đầy đủ dữ liệu học thuật cùng ký ức do người dân Thành Phố Đồng Nai đóng góp. Di tích lịch sử, danh thắng, văn hóa phi vật thể S\'Tiêng có tọa độ và nguồn gốc tư liệu.',
})

// CollectionPage + ItemList schema — chuẩn cho trang danh sách (rich results)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Thư Viện Di Sản Bù Đăng',
        url: 'https://disanbudang.com/explore/',
        description: 'Danh sách toàn bộ di sản văn hóa, lịch sử và thiên nhiên Thành Phố Đồng Nai đã được số hóa.',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: HERITAGES.length,
          itemListElement: HERITAGES.map((h, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: h.title,
            url: `https://disanbudang.com/heritage/${h.slug}/`,
          })),
        },
      }),
    },
  ],
})

const store = useHeritageStore()
const { observeAll } = useScrollReveal()
const { getCategoryLabel } = useHeritage()
const route = useRoute()

const categories = CATEGORIES
const clusters = CLUSTERS
const searchQuery = ref('')
const activeCategory = ref('')
const activeCluster = ref('')
const sortOrder = ref('views')
// Data is a static local import — no artificial loading state needed
const isLoading = ref(false)
const activeMainTab = ref(route.query.tab === 'community' ? 'community' : 'heritage')
const activeCommunityTab = ref('all')

watch(() => route.query.tab, (newTab) => {
  if (newTab === 'community' || newTab === 'heritage') {
    activeMainTab.value = newTab
  }
})

const mainTabs = computed(() => [
  { id: 'heritage', label: 'Di Sản', icon: 'mdi:archive-outline', count: store.totalCount },
  { id: 'community', label: 'Ký Ức Cộng Đồng', icon: 'mdi:account-group-outline', count: COMMUNITY_POSTS.length },
])

const communityTabs = [
  { id: 'all', label: 'Tất Cả', icon: 'mdi:apps' },
  { id: 'story', label: 'Câu Chuyện', icon: 'mdi:book-open-variant' },
  { id: 'artwork', label: 'Tranh Vẽ', icon: 'mdi:palette' },
  { id: 'photo', label: 'Ảnh Tư Liệu', icon: 'mdi:camera' },
  { id: 'memory', label: 'Ký Ức', icon: 'mdi:heart' },
  { id: 'research', label: 'Khảo Cứu', icon: 'mdi:magnify' },
]

const typeLabels: Record<PostType, string> = {
  story: 'Câu Chuyện', artwork: 'Tranh Vẽ', photo: 'Ảnh Tư Liệu', memory: 'Ký Ức', research: 'Khảo Cứu',
}
const typeIcons: Record<PostType, string> = {
  story: 'mdi:book-open-variant', artwork: 'mdi:palette', photo: 'mdi:camera', memory: 'mdi:heart', research: 'mdi:magnify',
}

// Community posts — 'all' hiện tất cả, các tab khác filter theo type, kèm filter theo tag (nếu có)
const activeTag = ref('')
const filteredCommunityPosts = computed(() => {
  let result = activeCommunityTab.value === 'all' ? COMMUNITY_POSTS : COMMUNITY_POSTS.filter((p) => p.type === activeCommunityTab.value)
  if (activeTag.value) {
    const tag = activeTag.value.toLowerCase()
    result = result.filter((p) => p.tags?.some((t) => t.toLowerCase() === tag))
  }
  return result
})

let debounceTimer: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, (q) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  if (!q) {
    store.setSearch(q)
  } else {
    debounceTimer = setTimeout(() => {
      store.setSearch(q)
    }, 300)
  }
})
onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})
watch(activeCategory, (c) => store.setCategory(c))
watch(activeCluster, (c) => store.setCluster(c))

const sortedAndFilteredHeritages = computed(() => {
  const result = [...store.filteredHeritages]
  if (sortOrder.value === 'alpha') {
    return result.sort((a, b) => a.title.localeCompare(b.title, 'vi'))
  } else if (sortOrder.value === 'newest') {
    return result.sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
  }
  return result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
})

// Spotlight chỉ hiện ở view mặc định (chưa search/lọc) để tránh gây rối kết quả lọc
const showSpotlight = computed(() => !searchQuery.value && !activeCategory.value && sortedAndFilteredHeritages.value.length >= 4)

const spotlightItems = computed(() => {
  if (!showSpotlight.value) return []
  const all = sortedAndFilteredHeritages.value
  const featured = all.filter((h) => h.featured)
  return (featured.length >= 2 ? featured : all).slice(0, 2)
})

const restItems = computed(() => {
  if (!showSpotlight.value) return sortedAndFilteredHeritages.value
  const spotlightIds = new Set(spotlightItems.value.map((h) => h.id))
  return sortedAndFilteredHeritages.value.filter((h) => !spotlightIds.has(h.id))
})

type GridEntry =
  | { kind: 'card'; heritage: Heritage }
  | { kind: 'banner'; id: string; cat: HeritageCategory_Meta }

// Chèn 1 banner storytelling theo danh mục sau mỗi 8 card để phá nhịp đều của grid
const gridEntries = computed<GridEntry[]>(() => {
  const entries: GridEntry[] = []
  const items = restItems.value
  items.forEach((h, i) => {
    entries.push({ kind: 'card', heritage: h })
    if ((i + 1) % 8 === 0 && i !== items.length - 1) {
      entries.push({ kind: 'banner', id: `banner-${i}`, cat: CATEGORY_MAP[h.category] })
    }
  })
  return entries
})

// Scroll parallax cho ảnh spotlight — tạo chiều sâu điện ảnh khi cuộn
const spotlightEls: (HTMLElement | null)[] = []
const parallaxOffsets = ref<number[]>([])

function setSpotlightRef(el: unknown, i: number) {
  spotlightEls[i] = (el && typeof el === 'object' && '$el' in el ? (el as { $el: HTMLElement }).$el : el) as HTMLElement | null
}

let parallaxRaf = 0
function updateParallax() {
  const vh = window.innerHeight
  spotlightEls.forEach((el, i) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const center = rect.top + rect.height / 2
    const dist = (center - vh / 2) / vh
    parallaxOffsets.value[i] = Math.max(-18, Math.min(18, dist * 36))
  })
}
function onParallaxScroll() {
  if (parallaxRaf) return
  parallaxRaf = requestAnimationFrame(() => {
    updateParallax()
    parallaxRaf = 0
  })
}

onMounted(() => {
  nextTick(() => observeAll())

  // Store là app-wide singleton (dùng chung với /map) — luôn reset và đồng bộ lại
  // theo query string hiện tại để tránh dính period/cluster còn sót từ trang khác.
  store.clearFilters()
  activeCategory.value = (route.query.category as string) || ''
  searchQuery.value = (route.query.search as string) || ''
  activeCluster.value = (route.query.cluster as string) || ''
  store.setCategory(activeCategory.value)
  store.setSearch(searchQuery.value)
  store.setCluster(activeCluster.value)

  if (route.query.tab === 'community') activeMainTab.value = 'community'
  if (route.query.tag) { activeTag.value = route.query.tag as string; activeMainTab.value = 'community' }

  window.addEventListener('scroll', onParallaxScroll, { passive: true })
  nextTick(updateParallax)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onParallaxScroll)
  if (parallaxRaf) cancelAnimationFrame(parallaxRaf)
})

watch(() => route.query.search, (value) => {
  searchQuery.value = typeof value === 'string' ? value : ''
})

watch(() => route.query.category, (value) => {
  activeCategory.value = typeof value === 'string' ? value : ''
})

function clearFilters() {
  searchQuery.value = ''
  activeCategory.value = ''
  activeCluster.value = ''
  store.clearFilters()
}

function selectCuratedTrail(catId: string) {
  if (activeCategory.value === catId) {
    activeCategory.value = ''
  } else {
    activeCategory.value = catId
  }
}

function discoverRandomHeritage() {
  const list = HERITAGES
  if (!list.length) return
  const randomItem = list[Math.floor(Math.random() * list.length)]
  if (randomItem) {
    navigateTo(`/heritage/${randomItem.slug}`)
  }
}
</script>
