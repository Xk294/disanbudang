<template>
  <div v-if="heritage" class="bg-charcoal-900 min-h-screen text-ivory selection:bg-gold-500/30 selection:text-gold-200">
    <!-- =========================================================
         1. IDENTITY — HERO BANNER
    ========================================================= -->
    <section class="relative min-h-[70vh] lg:min-h-[78vh] flex items-center overflow-hidden border-b border-charcoal-850">
      <!-- Background Cover Image with Ken Burns effect -->
      <NuxtImg
        :src="heritage.coverImage"
        :alt="heritage.title"
        class="absolute inset-0 w-full h-full object-cover ken-burns-hero"
        loading="eager"
        fetchpriority="high"
        preload
        format="webp"
        sizes="100vw"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/50 to-transparent" />

      <!-- Top Breadcrumb & Actions Bar (absolute overlay) -->
      <div class="absolute top-24 sm:top-28 left-0 right-0 z-20 pointer-events-none">
        <div class="container-heritage flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" class="pointer-events-auto flex items-center gap-2 text-xs text-charcoal-350 bg-charcoal-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-charcoal-800/80">
            <NuxtLink to="/" class="hover:text-gold-400 transition-colors flex items-center gap-1">
              <Icon name="mdi:home-outline" class="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </NuxtLink>
            <span class="text-charcoal-600">/</span>
            <NuxtLink to="/explore" class="hover:text-gold-400 transition-colors">
              Di sản
            </NuxtLink>
            <span class="text-charcoal-600">/</span>
            <span class="text-gold-300 font-medium truncate max-w-[150px] sm:max-w-[240px]">{{ heritage.title }}</span>
          </nav>

          <!-- Top quick buttons -->
          <div class="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              class="p-2 sm:px-3 sm:py-1.5 rounded-full bg-charcoal-950/70 hover:bg-charcoal-800/90 text-charcoal-300 hover:text-ivory border border-charcoal-800 text-xs backdrop-blur-md flex items-center gap-1.5 transition-colors cursor-pointer"
              @click="shareHeritage"
              title="Sao chép liên kết chia sẻ"
            >
              <Icon :name="isCopied ? 'mdi:check' : 'mdi:share-variant-outline'" class="w-4 h-4 text-gold-400" />
              <span class="hidden sm:inline">{{ isCopied ? 'Đã sao chép' : 'Chia sẻ' }}</span>
            </button>
            <NuxtLink
              :to="`/heritage/qr/${heritage.slug}`"
              class="p-2 sm:px-3 sm:py-1.5 rounded-full bg-charcoal-950/70 hover:bg-charcoal-800/90 text-charcoal-300 hover:text-ivory border border-charcoal-800 text-xs backdrop-blur-md flex items-center gap-1.5 transition-colors"
              title="Mã QR Thực địa"
            >
              <Icon name="mdi:qrcode" class="w-4 h-4 text-gold-400" />
              <span class="hidden sm:inline">Mã QR</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Hero Main Content -->
      <div class="relative z-10 container-heritage w-full pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div class="max-w-4xl">
          <!-- Badges strip -->
          <div class="flex flex-wrap items-center gap-2.5 mb-4">
            <BaseBadge :variant="categoryVariant" class="font-semibold tracking-wide">
              {{ getCategoryLabel(heritage.category) }}
            </BaseBadge>

            <!-- Archetype Badge -->
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md"
              :class="archetypeBadgeClass"
            >
              <Icon :name="archetypeIcon" class="w-3.5 h-3.5" />
              <span>{{ archetypeLabel }}</span>
            </span>

            <!-- Verification Provenance Badge -->
            <HeritageSourceBadge :sources="heritage.sources" @open="isSourceModalOpen = true" />

            <span
              v-if="heritage.verificationNote"
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30"
              title="Có thông tin chi tiết cần đối chiếu kiểm tra thực địa"
            >
              <Icon name="mdi:alert-circle-outline" class="w-3 h-3" />
              [CẦN XÁC MINH]
            </span>
          </div>

          <!-- Title & Subtitle -->
          <h1 class="font-heading font-bold text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.25] mb-4 text-shadow-hero tracking-normal">
            {{ heritage.title }}
          </h1>

          <p class="font-accent italic text-gold-300 text-lg sm:text-xl md:text-2xl mb-6 leading-relaxed max-w-3xl">
            "{{ heritage.subtitle }}"
          </p>

          <!-- Quick Meta Pill Strip -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-charcoal-300 mb-8">
            <span v-if="heritage.year" class="flex items-center gap-1.5 bg-charcoal-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-charcoal-800">
              <Icon name="mdi:calendar-clock" class="w-4 h-4 text-gold-400" />
              <span>{{ heritage.year }}</span>
            </span>
            <span class="flex items-center gap-1.5 bg-charcoal-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-charcoal-800">
              <Icon name="mdi:map-marker-radius-outline" class="w-4 h-4 text-gold-400" />
              <span>{{ getClusterLabel(heritage.cluster) }}</span>
            </span>
            <span v-if="heritage.viewCount" class="flex items-center gap-1.5 bg-charcoal-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-charcoal-800">
              <Icon name="mdi:eye-outline" class="w-4 h-4 text-gold-400" />
              <span>{{ heritage.viewCount.toLocaleString() }} lượt xem</span>
            </span>
          </div>

          <!-- Hero Action CTAs -->
          <div class="flex flex-wrap items-center gap-3.5">
            <!-- 360 Virtual Tour CTA -->
            <NuxtLink
              v-if="virtualTour"
              :to="`/explore/virtual-tour?tour=${heritage.slug}`"
              class="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-charcoal-950 font-bold text-sm shadow-gold/40 shadow-xl hover:shadow-gold-lg hover:scale-105 transition-all duration-300 group"
            >
              <div class="w-6 h-6 rounded-full bg-charcoal-950/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
                <Icon name="mdi:panorama-sphere" class="w-4 h-4 text-charcoal-950" />
              </div>
              <span>KHÁM PHÁ 360°</span>
              <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>

            <!-- Audio Narration CTA -->
            <button
              v-if="heritage.audio"
              type="button"
              class="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-charcoal-950/80 hover:bg-charcoal-850 text-ivory border border-gold-500/40 hover:border-gold-400 font-semibold text-sm transition-all duration-300 backdrop-blur-md group cursor-pointer"
              @click="playAudio"
            >
              <div class="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-colors">
                <Icon name="mdi:headphones" class="w-4 h-4 text-gold-400 group-hover:text-charcoal-950 transition-colors" />
              </div>
              <span>Nghe Thuyết Minh ({{ formatTime(heritage.audio.duration) }})</span>
            </button>

            <!-- Map Jump CTA -->
            <NuxtLink
              :to="`/map?select=${heritage.id}`"
              class="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-charcoal-950/60 hover:bg-charcoal-800 text-charcoal-300 hover:text-ivory border border-charcoal-800 text-sm transition-colors backdrop-blur-md"
            >
              <Icon name="mdi:compass-outline" class="w-4 h-4 text-gold-400" />
              <span>Xem trên Bản Đồ</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================
         STICKY SUB-NAV TABS (Dynamically adapted by archetype)
    ========================================================= -->
    <div class="sticky top-[72px] z-40 bg-charcoal-950/95 backdrop-blur-md border-b border-charcoal-850 py-3 text-sm shrink-0 shadow-lg">
      <div class="container-heritage flex items-center justify-start gap-4 sm:gap-6 overflow-x-auto scrollbar-none">
        <button
          v-for="tab in activeTabsList"
          :key="tab.id"
          class="text-xs uppercase tracking-widest font-semibold transition-colors py-1 px-2.5 rounded-lg border-b-2 whitespace-nowrap cursor-pointer"
          :class="currentActiveTab === tab.id ? 'border-gold-500 text-gold-400 bg-gold-500/10' : 'border-transparent text-charcoal-400 hover:text-ivory hover:bg-charcoal-900'"
          @click="scrollToTabSection(tab.id)"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- =========================================================
         MAIN CONTENT GRID (11 TEMPLATE SECTIONS)
    ========================================================= -->
    <div class="container-heritage py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

        <!-- PRIMARY COLUMN (8 cols) -->
        <div class="lg:col-span-8 space-y-14">

          <!-- 3. LEAD (Tóm Lược Giá Trị Cốt Lõi) -->
          <section id="lead" class="scroll-mt-28 reveal p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 border border-gold-500/30 relative overflow-hidden shadow-xl">
            <div class="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            <div class="flex items-center gap-2 mb-3">
              <span class="w-2 h-2 rounded-full bg-gold-400" />
              <span class="text-3xs uppercase tracking-widest font-bold text-gold-400">Tóm Lược Giá Trị Di Sản</span>
            </div>
            <p class="text-ivory text-base sm:text-lg leading-relaxed font-serif italic border-l-2 border-gold-500 pl-4 py-1">
              {{ heritage.shortDescription }}
            </p>
          </section>

          <!-- 6. 360 VIRTUAL TOUR BANNER (If available) -->
          <section
            v-if="virtualTour"
            id="tour360"
            class="reveal scroll-mt-28 p-6 sm:p-8 rounded-3xl border border-gold-500/30 relative overflow-hidden bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 shadow-2xl"
          >
            <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <div class="relative z-10">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
                <span class="text-3xs font-bold uppercase tracking-widest text-gold-400">Không Gian Số Hóa 360°</span>
              </div>
              <h3 class="font-heading font-bold text-ivory text-xl sm:text-2xl md:text-3xl mb-2">
                Trải Nghiệm Không Gian Ảo {{ heritage.title }}
              </h3>
              <p class="text-charcoal-300 text-sm leading-relaxed max-w-2xl mb-6">
                {{ virtualTour.description }}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div class="p-3 rounded-2xl bg-charcoal-900/80 border border-charcoal-800 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-400 shrink-0">
                    <Icon name="mdi:panorama-wide-angle" class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-ivory">{{ virtualTour.scenes.length }} Điểm Nhìn</p>
                    <p class="text-3xs text-charcoal-400">Street View 360°</p>
                  </div>
                </div>

                <div class="p-3 rounded-2xl bg-charcoal-900/80 border border-charcoal-800 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
                    <Icon name="mdi:cube-scan" class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-ivory">{{ virtualTour.artifacts?.length || 0 }} Hiện Vật 3D</p>
                    <p class="text-3xs text-charcoal-400">Khảo cứu chi tiết</p>
                  </div>
                </div>

                <div class="p-3 rounded-2xl bg-charcoal-900/80 border border-charcoal-800 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                    <Icon name="mdi:headphones" class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-ivory">Thuyết Minh Tự Động</p>
                    <p class="text-3xs text-charcoal-400">Audio tích hợp</p>
                  </div>
                </div>
              </div>

              <NuxtLink
                :to="`/explore/virtual-tour?tour=${heritage.slug}`"
                class="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-sm shadow-gold/30 shadow-lg hover:shadow-gold-lg transition-all group"
              >
                <Icon name="mdi:rotate-3d-variant" class="w-5 h-5 group-hover:rotate-90 transition-transform" />
                <span>BƯỚC VÀO KHÔNG GIAN 360° NGAY</span>
                <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </section>

          <!-- =========================================================
               DIFFERENTIATED CENTERPIECE BY ARCHETYPE
          ========================================================= -->

          <!-- (A) TIMELINE-LED ARCHETYPE (For Historical Sites) -->
          <section
            v-if="heritage.archetype === 'historical' && heritage.timeline.length"
            id="timeline"
            class="scroll-mt-28 reveal p-6 sm:p-8 rounded-3xl bg-charcoal-950/70 border border-charcoal-800"
          >
            <div class="flex items-center gap-3 mb-6">
              <span class="w-1.5 h-6 bg-brick-500 rounded-full inline-block" />
              <div>
                <span class="text-3xs uppercase tracking-widest font-bold text-brick-400">Biên Niên Sử & Mốc Son Chiến Lược</span>
                <h2 class="font-heading font-bold text-ivory text-xl sm:text-2xl">Dòng Chảy Lịch Sử</h2>
              </div>
            </div>

            <div class="relative pl-6 border-l-2 border-charcoal-800 ml-3 space-y-6">
              <div
                v-for="(item, i) in heritage.timeline"
                :key="i"
                class="relative group"
              >
                <!-- Dot marker -->
                <span class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold-500 border-2 border-charcoal-950 shadow-gold group-hover:scale-125 transition-transform" />
                <span class="text-2xs font-mono font-bold text-gold-400 bg-gold-500/10 px-2.5 py-0.5 rounded-md border border-gold-500/20 uppercase tracking-widest">
                  {{ item.year }}
                </span>
                <h3 class="font-heading font-bold text-ivory text-base sm:text-lg mt-2 mb-1">{{ item.title }}</h3>
                <p class="text-charcoal-350 text-sm leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
          </section>

          <!-- 4. MAIN STORY (Cội Nguồn Di Sản) -->
          <section id="story" class="scroll-mt-28 reveal space-y-6">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-1.5 h-6 bg-gold-500 rounded-full inline-block" />
              <div>
                <span class="text-3xs uppercase tracking-widest font-bold text-gold-400">Khảo Cứu Chuyên Sâu</span>
                <h2 class="font-heading font-bold text-ivory text-2xl sm:text-3xl">Cội Nguồn Di Sản</h2>
              </div>
            </div>

            <div class="prose-heritage space-y-5">
              <p
                v-for="(paragraph, idx) in storyParagraphs"
                :key="idx"
                :class="idx === 0 ? 'drop-cap text-charcoal-250 text-base sm:text-lg leading-relaxed' : 'text-charcoal-300 text-base leading-relaxed'"
              >
                {{ paragraph }}
              </p>
            </div>
          </section>

          <!-- 5. CONTEXT (Bối Cảnh Lịch Sử - Xã Hội - Sinh Thái) -->
          <section
            v-if="heritage.contextStory"
            id="context"
            class="scroll-mt-28 reveal p-6 sm:p-8 rounded-3xl bg-charcoal-950/60 border border-charcoal-800 relative overflow-hidden"
          >
            <div class="flex items-center gap-3 mb-4">
              <span class="w-1.5 h-6 bg-forest-500 rounded-full inline-block" />
              <div>
                <span class="text-3xs uppercase tracking-widest font-bold text-forest-400">Bối Cảnh Không Gian & Thời Đại</span>
                <h3 class="font-heading font-bold text-ivory text-xl">Ý Nghĩa Trong Bức Tranh Toàn Vùng</h3>
              </div>
            </div>
            <p class="text-charcoal-300 text-sm sm:text-base leading-relaxed">
              {{ heritage.contextStory }}
            </p>
          </section>

          <!-- TIMELINE (For non-historical archetypes if exists) -->
          <section
            v-if="heritage.archetype !== 'historical' && heritage.timeline.length"
            id="timeline-alt"
            class="scroll-mt-28 reveal p-6 sm:p-8 rounded-3xl bg-charcoal-950/70 border border-charcoal-800"
          >
            <div class="flex items-center gap-3 mb-6">
              <span class="w-1.5 h-6 bg-brick-500 rounded-full inline-block" />
              <h3 class="font-heading font-bold text-ivory text-xl">Biên Niên Sử & Mốc Thời Gian</h3>
            </div>
            <div class="relative pl-6 border-l-2 border-charcoal-800 ml-3 space-y-6">
              <div v-for="(item, i) in heritage.timeline" :key="i" class="relative group">
                <span class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold-500 border-2 border-charcoal-950 shadow-gold" />
                <span class="text-2xs font-mono font-bold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded uppercase">
                  {{ item.year }}
                </span>
                <h4 class="font-heading font-bold text-ivory text-base mt-1.5 mb-1">{{ item.title }}</h4>
                <p class="text-charcoal-350 text-sm leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
          </section>

          <!-- 6. MEDIA (Tàng Tích Ảnh & Video) -->
          <section v-if="heritage.gallery.length" id="gallery" class="scroll-mt-28 reveal space-y-6">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="w-1.5 h-6 bg-forest-500 rounded-full inline-block" />
                <div>
                  <span class="text-3xs uppercase tracking-widest font-bold text-forest-400">Tư Liệu Thị Giác</span>
                  <h2 class="font-heading font-bold text-ivory text-2xl sm:text-3xl">Tàng Tích Ảnh Khảo Cứu</h2>
                </div>
              </div>
              <span class="text-xs text-charcoal-400">({{ heritage.gallery.length }} hình ảnh)</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="(img, i) in displayedGallery"
                :key="i"
                :class="i === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'"
                class="overflow-hidden rounded-2xl border border-charcoal-800 relative group cursor-pointer bg-charcoal-950"
                @click="lightboxIndex = i"
              >
                <NuxtImg
                  :src="img.src"
                  :alt="img.alt"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  format="webp"
                  sizes="xs:100vw sm:50vw lg:600px"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div class="absolute bottom-4 left-4 right-4 text-xs z-10">
                  <p class="text-ivory font-semibold text-sm">{{ img.alt }}</p>
                  <p v-if="img.caption" class="text-charcoal-350 text-xs mt-0.5 line-clamp-2">{{ img.caption }}</p>
                  <p v-if="img.photographer" class="text-gold-400/80 text-[10px] mt-1 font-accent italic">Ảnh: {{ img.photographer }}</p>
                </div>
                <div class="absolute top-3 right-3 p-2 rounded-full bg-charcoal-950/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="mdi:magnify-plus-outline" class="w-4 h-4 text-ivory" />
                </div>
              </div>
            </div>

            <!-- Expand / Collapse Gallery Toggle -->
            <div v-if="heritage.gallery.length > 3" class="mt-4 flex justify-center">
              <button
                type="button"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-charcoal-950/90 hover:bg-charcoal-900 border border-gold-500/30 hover:border-gold-400 text-gold-300 hover:text-ivory text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                @click="isGalleryExpanded = !isGalleryExpanded"
              >
                <Icon :name="isGalleryExpanded ? 'mdi:chevron-up' : 'mdi:image-multiple-outline'" class="w-4 h-4 text-gold-400" />
                <span>{{ isGalleryExpanded ? 'Thu gọn thư viện ảnh' : `Xem thêm ${heritage.gallery.length - 3} ảnh tư liệu` }}</span>
              </button>
            </div>
          </section>

          <!-- 7. AUDIO & TRANSCRIPT (Bản Thuyết Minh & Lời Thoại) -->
          <section
            v-if="heritage.audio"
            id="audio-guide"
            class="scroll-mt-28 reveal border border-gold-500/30 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div class="flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div class="flex items-center gap-4 text-center sm:text-left">
                <div class="w-16 h-16 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                  <Icon name="mdi:headphones" class="w-8 h-8" />
                </div>
                <div>
                  <span class="text-3xs uppercase tracking-widest font-bold text-gold-400">Audio Guide Chính Thức</span>
                  <h4 class="font-heading font-bold text-ivory text-lg sm:text-xl">{{ heritage.audio.title }}</h4>
                  <p class="text-charcoal-400 text-xs sm:text-sm mt-0.5">
                    Thuyết minh bởi <strong class="text-gold-300">{{ heritage.audio.narrator }}</strong>
                    <span v-if="heritage.audio.narratorRole"> ({{ heritage.audio.narratorRole }})</span>
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="px-6 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-sm shadow-gold/30 shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  @click="playAudio"
                >
                  <Icon name="mdi:play" class="w-5 h-5" />
                  <span>Phát Audio ({{ formatTime(heritage.audio.duration) }})</span>
                </button>
              </div>
            </div>

            <!-- Transcript Expandable Drawer -->
            <div v-if="heritage.audio.transcript" class="border-t border-charcoal-800 pt-4">
              <button
                type="button"
                class="flex items-center justify-between w-full text-xs font-semibold text-charcoal-400 hover:text-gold-300 transition-colors py-1 cursor-pointer"
                @click="isTranscriptOpen = !isTranscriptOpen"
              >
                <span class="flex items-center gap-2">
                  <Icon name="mdi:text-box-outline" class="w-4 h-4 text-gold-400" />
                  <span>{{ isTranscriptOpen ? 'Ẩn văn bản thuyết minh (Transcript)' : 'Xem toàn văn bản thuyết minh (Transcript)' }}</span>
                </span>
                <Icon :name="isTranscriptOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-4 h-4" />
              </button>

              <div v-if="isTranscriptOpen" class="mt-3 p-4 rounded-2xl bg-charcoal-950/80 border border-charcoal-800 text-xs sm:text-sm text-charcoal-300 leading-relaxed font-serif">
                <p class="whitespace-pre-line">{{ heritage.audio.transcript }}</p>
              </div>
            </div>
          </section>

          <!-- 9. EDUCATIONAL CONNECTION (Cầu Nối Giáo Dục & Bài Học Học Đường) -->
          <section
            v-if="heritage.educationalConnection || relatedQuiz"
            id="education"
            class="scroll-mt-28 reveal p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 border border-gold-500/30 space-y-6"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="w-1.5 h-6 bg-gold-500 rounded-full inline-block" />
                <div>
                  <span class="text-3xs uppercase tracking-widest font-bold text-gold-400">Giáo Dục Địa Phương & Khảo Cứu</span>
                  <h3 class="font-heading font-bold text-ivory text-xl sm:text-2xl">Cầu Nối Học Đường</h3>
                </div>
              </div>
              <NuxtLink
                to="/study"
                class="text-xs text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1"
              >
                <span>Study Hub</span>
                <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>

            <!-- Curriculum and Reflection Topic -->
            <div v-if="heritage.educationalConnection" class="space-y-4">
              <div v-if="heritage.educationalConnection.curriculumTopic" class="p-4 rounded-2xl bg-charcoal-900/80 border border-charcoal-800">
                <span class="text-3xs uppercase font-bold text-charcoal-400 block mb-1">Chủ đề bài học</span>
                <p class="text-sm font-semibold text-gold-300">{{ heritage.educationalConnection.curriculumTopic }}</p>
                <p v-if="heritage.educationalConnection.targetAudience" class="text-xs text-charcoal-400 mt-0.5">
                  Đối tượng: {{ heritage.educationalConnection.targetAudience }}
                </p>
              </div>

              <div v-if="heritage.educationalConnection.reflectionQuestion" class="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30">
                <div class="flex items-start gap-3">
                  <Icon name="mdi:lightbulb-on-outline" class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span class="text-xs font-bold text-gold-300 uppercase tracking-wide block mb-1">Câu hỏi suy ngẫm cho học sinh</span>
                    <p class="text-sm text-ivory leading-relaxed italic font-serif">
                      "{{ heritage.educationalConnection.reflectionQuestion }}"
                    </p>
                  </div>
                </div>
              </div>

              <!-- Activity Suggestions -->
              <div v-if="heritage.educationalConnection.activitySuggestions?.length" class="space-y-2">
                <span class="text-xs font-bold text-charcoal-300 uppercase tracking-wide">Hoạt động trải nghiệm gợi ý:</span>
                <ul class="space-y-2">
                  <li
                    v-for="(act, idx) in heritage.educationalConnection.activitySuggestions"
                    :key="idx"
                    class="text-xs sm:text-sm text-charcoal-350 flex items-start gap-2.5"
                  >
                    <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-forest-400 shrink-0 mt-0.5" />
                    <span>{{ act }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Quiz CTA Button -->
            <div v-if="relatedQuiz" class="pt-4 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p class="text-sm font-bold text-ivory">{{ relatedQuiz.title }}</p>
                <p class="text-xs text-charcoal-400 mt-0.5">Thử thách {{ relatedQuiz.questions.length }} câu hỏi để nhận Huy hiệu Di sản số</p>
              </div>
              <button
                type="button"
                class="btn-primary text-xs py-3 px-6 bg-gold-500 text-charcoal-950 font-bold shadow-gold/20 shadow-md hover:scale-105 transition-transform shrink-0 cursor-pointer"
                @click="startQuiz"
              >
                <Icon name="mdi:trophy-outline" class="w-4 h-4" />
                <span>Làm Thử Thách Ngay</span>
              </button>
            </div>
          </section>

          <!-- 10. SOURCES & DATA PROVENANCE (Nguồn Tư Liệu Khảo Cứu) -->
          <section id="sources" class="scroll-mt-28 reveal pt-8 border-t border-charcoal-850 space-y-6">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="w-1.5 h-6 bg-forest-500 rounded-full inline-block" />
                <div>
                  <span class="text-3xs uppercase tracking-widest font-bold text-forest-400">Tính Xác Thực & Tiêu Chuẩn Học Thuật</span>
                  <h2 class="font-heading font-bold text-ivory text-xl sm:text-2xl">Nguồn Tư Liệu Khảo Cứu</h2>
                </div>
              </div>
              <button
                type="button"
                class="text-xs text-forest-300 hover:text-ivory font-semibold flex items-center gap-1 cursor-pointer"
                @click="isSourceModalOpen = true"
              >
                <span>Xem Hồ Sơ Nguồn</span>
                <Icon name="mdi:open-in-new" class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- Sources List -->
            <div v-if="heritage.sources?.length" class="space-y-3">
              <div
                v-for="(src, i) in heritage.sources"
                :key="src.id || i"
                class="p-4 rounded-2xl bg-charcoal-950/60 border border-charcoal-800 flex items-start gap-3.5"
              >
                <span class="text-xs font-mono font-bold text-gold-400 shrink-0 mt-0.5">[{{ i + 1 }}]</span>
                <div class="flex-1 text-xs sm:text-sm space-y-1">
                  <p class="font-semibold text-ivory">{{ src.title }}</p>
                  <p class="text-charcoal-400 text-xs">
                    <span v-if="src.author">{{ src.author }} • </span>
                    <span v-if="src.institution">{{ src.institution }}</span>
                    <span v-if="src.publishedYear"> ({{ src.publishedYear }})</span>
                  </p>
                  <p v-if="src.referenceCode" class="text-3xs font-mono text-gold-400/80">
                    Mã trích yếu: {{ src.referenceCode }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else-if="heritage.references.length" class="space-y-2">
              <div
                v-for="(ref, i) in heritage.references"
                :key="i"
                class="p-3.5 rounded-xl bg-charcoal-950/60 border border-charcoal-800 text-xs sm:text-sm text-charcoal-350 flex gap-3"
              >
                <span class="text-gold-400 font-bold">[{{ i + 1 }}]</span>
                <span>{{ ref }}</span>
              </div>
            </div>

            <!-- Verification Notice banner if [CẦN XÁC MINH] -->
            <div
              v-if="heritage.verificationNote"
              class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300"
            >
              <Icon name="mdi:information-outline" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong class="font-semibold">Ghi chú xác minh thực địa:</strong> {{ heritage.verificationNote }}
              </div>
            </div>
          </section>

        </div>

        <!-- =========================================================
             SIDEBAR COLUMN (4 cols) — INFOBOX & LOCATION
        ========================================================= -->
        <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-[140px] self-start">

          <!-- 2. INFOBOX (Bảng Thuộc Tính Cốt Lõi) -->
          <div class="bg-charcoal-950/80 border border-charcoal-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
            <div class="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h3 class="font-heading font-bold text-ivory text-base sm:text-lg flex items-center gap-2">
                <Icon name="mdi:card-account-details-outline" class="w-5 h-5 text-gold-400" />
                <span>Hồ Sơ Thuộc Tính</span>
              </h3>
              <span class="text-3xs uppercase font-mono text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                #{{ heritage.id }}
              </span>
            </div>

            <!-- Quick facts list -->
            <div class="space-y-3.5 text-xs">
              <div
                v-for="fact in heritage.quickFacts"
                :key="fact.label"
                class="flex items-start justify-between gap-3 py-2 border-b border-charcoal-850 last:border-0"
              >
                <div class="flex items-center gap-2 text-charcoal-400 shrink-0">
                  <Icon :name="fact.icon ?? 'mdi:circle-small'" class="w-4 h-4 text-gold-400" />
                  <span>{{ fact.label }}</span>
                </div>
                <span class="font-medium text-ivory text-right leading-snug">{{ fact.value }}</span>
              </div>

              <!-- Conservation Status Row -->
              <div v-if="heritage.conservationStatus" class="flex items-start justify-between gap-3 py-2 border-b border-charcoal-850">
                <div class="flex items-center gap-2 text-charcoal-400 shrink-0">
                  <Icon name="mdi:shield-check-outline" class="w-4 h-4 text-forest-400" />
                  <span>Hiện trạng</span>
                </div>
                <span class="font-medium text-forest-300 text-right leading-snug text-[11px]">{{ heritage.conservationStatus }}</span>
              </div>

              <!-- Period Row -->
              <div class="flex items-start justify-between gap-3 py-2">
                <div class="flex items-center gap-2 text-charcoal-400 shrink-0">
                  <Icon name="mdi:timeline-clock-outline" class="w-4 h-4 text-gold-400" />
                  <span>Thời kỳ</span>
                </div>
                <span class="font-medium text-ivory text-right">{{ getPeriodLabel(heritage.period) }}</span>
              </div>
            </div>
          </div>

          <!-- 8. MAP & LOCATION CARD -->
          <div id="location" class="scroll-mt-28 bg-charcoal-950/80 border border-charcoal-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
            <h3 class="font-heading font-bold text-ivory text-base sm:text-lg flex items-center gap-2">
              <Icon name="mdi:map-marker-outline" class="w-5 h-5 text-gold-400" />
              <span>Định Vị Tọa Độ GPS</span>
            </h3>

            <div class="bg-charcoal-900 rounded-2xl p-4 border border-charcoal-800 text-center space-y-2">
              <div class="flex items-center justify-center gap-2">
                <span class="font-mono text-xs text-gold-300 font-bold">{{ heritage.coordinates.lat.toFixed(5) }}, {{ heritage.coordinates.lng.toFixed(5) }}</span>
                <button
                  type="button"
                  class="p-1 text-charcoal-400 hover:text-ivory transition-colors cursor-pointer"
                  @click="copyCoordinates"
                  title="Sao chép tọa độ"
                >
                  <Icon :name="isCoordsCopied ? 'mdi:check' : 'mdi:content-copy'" class="w-3.5 h-3.5 text-gold-400" />
                </button>
              </div>
              <p class="text-charcoal-500 text-[11px]">Hệ tọa độ WGS84 — Tương thích Google Maps / Apple Maps</p>
            </div>

            <!-- Location Guide (If available) -->
            <div v-if="heritage.locationGuide" class="space-y-2 text-xs text-charcoal-350 border-t border-charcoal-850 pt-3">
              <p v-if="heritage.locationGuide.accessNote">
                <strong class="text-ivory">Đường đi:</strong> {{ heritage.locationGuide.accessNote }}
              </p>
              <p v-if="heritage.locationGuide.bestTimeToVisit">
                <strong class="text-ivory">Thời điểm đẹp:</strong> {{ heritage.locationGuide.bestTimeToVisit }}
              </p>
              <p v-if="heritage.locationGuide.openHours">
                <strong class="text-ivory">Giờ mở cửa:</strong> {{ heritage.locationGuide.openHours }}
              </p>
            </div>

            <!-- Action buttons -->
            <div class="space-y-2 pt-2">
              <NuxtLink :to="`/map?select=${heritage.id}`" class="btn-primary w-full justify-center text-xs py-3 bg-gold-500 text-charcoal-950 font-bold shadow-gold/20 shadow-md">
                <Icon name="mdi:compass-outline" class="w-4 h-4" />
                <span>Xem Trên Bản Đồ Tương Tác</span>
              </NuxtLink>
              <a
                :href="`https://www.google.com/maps/dir/?api=1&destination=${heritage.coordinates.lat},${heritage.coordinates.lng}`"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-ghost w-full justify-center text-xs py-2.5 border border-charcoal-800 hover:border-gold-500/40 text-charcoal-300 hover:text-ivory rounded-xl flex items-center gap-2"
              >
                <Icon name="mdi:google-maps" class="w-4 h-4 text-forest-400" />
                <span>Chỉ Đường Google Maps</span>
              </a>
            </div>
          </div>

          <!-- Provenance Audit Badge Card -->
          <div v-if="heritage.sources?.length" class="bg-forest-950/20 border border-forest-500/30 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-3xs uppercase tracking-widest font-bold text-forest-400">Data Provenance</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-500/20 text-forest-300 border border-forest-500/30">Verified</span>
            </div>
            <h4 class="font-heading font-bold text-ivory text-base mb-1.5 flex items-center gap-2">
              <Icon name="mdi:certificate-outline" class="w-4 h-4 text-forest-400" />
              <span>Hồ Sơ Nguồn Thẩm Định</span>
            </h4>
            <p class="text-charcoal-350 text-xs leading-relaxed mb-4">
              Di sản này đã được chuẩn hóa qua <strong>{{ heritage.sources.length }} nguồn tư liệu</strong> chính thống.
            </p>
            <button
              type="button"
              class="btn-ghost w-full justify-center text-xs py-2.5 border border-forest-500/40 hover:border-forest-400 text-forest-300 hover:text-ivory hover:bg-forest-500/10 rounded-xl flex items-center gap-2 cursor-pointer"
              @click="isSourceModalOpen = true"
            >
              <Icon name="mdi:book-open-page-variant" class="w-4 h-4" />
              <span>Tra Cứu Chi Tiết Nguồn</span>
            </button>
          </div>

        </aside>
      </div>

      <!-- =========================================================
           11. RELATED KNOWLEDGE & COMMUNITY MEMORIES JOURNEY
      ========================================================= -->

      <!-- Community Memories Section -->
      <section v-if="communityMemories.length > 0" id="community" class="mt-20 pt-12 border-t border-charcoal-850 reveal">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="eyebrow text-gold-400 text-3xs">Tiếng nói nhân dân & Ký ức sống</span>
            <h2 class="font-heading font-bold text-ivory text-2xl sm:text-3xl mt-1">Ký Ức Cộng Đồng</h2>
          </div>
          <NuxtLink
            to="/explore?tab=community"
            class="hidden sm:flex items-center gap-2 text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors"
          >
            <span>Tất cả ký ức</span>
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="post in communityMemories"
            :key="post.id"
            :to="`/explore/${post.id}`"
            class="bg-charcoal-950/60 rounded-2xl overflow-hidden border border-charcoal-850 hover:border-gold-500/40 transition-all duration-300 group flex flex-col"
          >
            <div class="aspect-[16/9] overflow-hidden relative shrink-0">
              <NuxtImg
                v-if="post.coverImage"
                :src="post.coverImage"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                format="webp"
                sizes="xs:100vw sm:50vw lg:33vw"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
            </div>
            <div class="p-5 flex flex-col flex-1">
              <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider mb-1.5">{{ typeLabels[post.type] ?? 'Ký ức' }}</span>
              <h3 class="font-heading font-bold text-ivory text-base leading-snug mb-2 group-hover:text-gold-300 transition-colors line-clamp-2">{{ post.title }}</h3>
              <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-2 mb-4">{{ post.excerpt }}</p>
              <div class="flex items-center gap-2 mt-auto border-t border-charcoal-850 pt-3">
                <div class="w-6 h-6 rounded-full bg-charcoal-800 flex items-center justify-center shrink-0">
                  <Icon name="mdi:account" class="w-3.5 h-3.5 text-gold-400/70" />
                </div>
                <p class="text-charcoal-400 text-xs truncate">{{ post.author.name }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Next Journey Recommendations -->
      <section v-if="related.length" class="mt-20 pt-12 border-t border-charcoal-850 reveal">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="eyebrow text-gold-400 text-3xs">Bước tiếp theo của bạn</span>
            <h2 class="font-heading font-bold text-ivory text-2xl sm:text-3xl mt-1">Khám Phá Di Sản Tiếp Theo</h2>
          </div>
          <NuxtLink
            to="/explore"
            class="hidden sm:flex items-center gap-2 text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors"
          >
            <span>Toàn bộ 16 di sản</span>
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <HeritageCard
            v-for="item in related.slice(0, 3)"
            :key="item.id"
            :heritage="item"
            class="border border-charcoal-850 hover:border-gold-500/30"
            @click="navigateTo(`/heritage/${item.slug}`)"
          />
        </div>

        <!-- Interactive Journey Map CTA -->
        <div class="mt-12 text-center">
          <NuxtLink
            to="/map"
            class="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-charcoal-950 border border-gold-500/40 hover:border-gold-400 text-gold-300 hover:text-gold-200 font-semibold text-sm transition-all duration-300 shadow-xl hover:scale-105"
          >
            <Icon name="mdi:map-legend" class="w-5 h-5 text-gold-400" />
            <span>Mở Bản Đồ Khám Phá Tuyến Hành Trình Di Sản</span>
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </section>

    </div>

    <!-- =========================================================
         LIGHTBOX & MODALS
    ========================================================= -->

    <!-- Gallery Lightbox Modal -->
    <Transition name="fade">
      <div
        v-if="lightboxIndex !== null && heritage.gallery[lightboxIndex] != null"
        class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Xem ảnh phóng to"
        @click.self="lightboxIndex = null"
      >
        <div class="absolute top-4 right-4 flex items-center gap-2">
          <button
            class="text-ivory/80 hover:text-ivory bg-charcoal-900/70 hover:bg-charcoal-800 p-2.5 rounded-full border border-charcoal-800 transition-colors cursor-pointer"
            @click="lightboxIndex = null"
            aria-label="Đóng chế độ xem ảnh lớn"
          >
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>
        </div>

        <button
          v-if="heritage.gallery.length > 1"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/80 hover:text-ivory bg-charcoal-900/70 p-3 rounded-full hover:bg-charcoal-800 border border-charcoal-800 z-10 transition-colors cursor-pointer"
          @click="prevGalleryImage"
          aria-label="Ảnh trước"
        >
          <Icon name="mdi:chevron-left" class="w-6 h-6" />
        </button>
        <button
          v-if="heritage.gallery.length > 1"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/80 hover:text-ivory bg-charcoal-900/70 p-3 rounded-full hover:bg-charcoal-800 border border-charcoal-800 z-10 transition-colors cursor-pointer"
          @click="nextGalleryImage"
          aria-label="Ảnh tiếp theo"
        >
          <Icon name="mdi:chevron-right" class="w-6 h-6" />
        </button>

        <div class="max-w-5xl max-h-[75vh] flex items-center justify-center">
          <img
            :src="heritage.gallery[lightboxIndex]!.src"
            :alt="heritage.gallery[lightboxIndex]!.alt"
            class="max-w-full max-h-[75vh] object-contain rounded-xl border border-charcoal-800 shadow-2xl"
          />
        </div>

        <div class="mt-4 text-center max-w-2xl px-4 space-y-1">
          <p class="text-ivory text-sm sm:text-base font-semibold">{{ heritage.gallery[lightboxIndex]!.alt }}</p>
          <p v-if="heritage.gallery[lightboxIndex]!.caption" class="text-charcoal-350 text-xs sm:text-sm leading-relaxed">
            {{ heritage.gallery[lightboxIndex]!.caption }}
          </p>
          <p v-if="heritage.gallery[lightboxIndex]!.photographer" class="text-gold-400 text-xs font-accent italic">
            Nhiếp ảnh: {{ heritage.gallery[lightboxIndex]!.photographer }}
          </p>
        </div>
      </div>
    </Transition>

    <!-- Source Provenance Modal -->
    <HeritageSourceModal
      :is-open="isSourceModalOpen"
      :sources="heritage.sources"
      @close="isSourceModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { getVirtualTourByHeritageId } from '~/data/virtualTours'
import { COMMUNITY_POSTS } from '~/data/posts'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const store = useHeritageStore()
const audioStore = useAudioStore()
const quizStore = useQuizStore()
const { getCategoryLabel } = useHeritage()
const { observeAll } = useScrollReveal()
const { trackEvent } = useTrackEvent()

const isSourceModalOpen = ref(false)
const lightboxIndex = ref<number | null>(null)
const isTranscriptOpen = ref(false)
const isCopied = ref(false)
const isCoordsCopied = ref(false)
const currentActiveTab = ref('lead')
const isGalleryExpanded = ref(false)

const heritage = computed(() => store.getBySlug(slug.value) ?? null)

const displayedGallery = computed(() => {
  if (!heritage.value?.gallery) return []
  return isGalleryExpanded.value ? heritage.value.gallery : heritage.value.gallery.slice(0, 3)
})

if (!heritage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Di sản không tồn tại trong hệ thống',
    fatal: true,
  })
}

const virtualTour = computed(() => {
  if (!heritage.value) return null
  return getVirtualTourByHeritageId(heritage.value.id) || getVirtualTourByHeritageId(heritage.value.slug) || null
})

// Archetype helpers
const archetypeLabel = computed(() => {
  const map: Record<string, string> = {
    historical: 'Di Tích Lịch Sử',
    artifact: 'Hiện Vật & Kiến Trúc',
    cultural: 'Văn Hóa & Thực Hành',
    natural: 'Danh Thắng Thiên Nhiên',
  }
  return map[heritage.value?.archetype || 'historical'] || 'Di Sản'
})

const archetypeIcon = computed(() => {
  const map: Record<string, string> = {
    historical: 'mdi:history',
    artifact: 'mdi:archive-eye-outline',
    cultural: 'mdi:account-group-outline',
    natural: 'mdi:pine-tree',
  }
  return map[heritage.value?.archetype || 'historical'] || 'mdi:bookmark-outline'
})

const archetypeBadgeClass = computed(() => {
  const map: Record<string, string> = {
    historical: 'bg-brick-500/15 text-brick-300 border-brick-500/30',
    artifact: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    cultural: 'bg-gold-500/15 text-gold-300 border-gold-500/30',
    natural: 'bg-forest-500/15 text-forest-300 border-forest-500/30',
  }
  return map[heritage.value?.archetype || 'historical'] || 'bg-charcoal-800 text-ivory border-charcoal-700'
})

const categoryVariant = computed(() => {
  const map: Record<string, any> = {
    'lich-su': 'brick',
    'danh-thang': 'forest',
    'van-hoa-phi-vat-the': 'gold',
    'doi-song-cong-dong': 'earth',
    'giao-duc-truyen-thong': 'copper',
  }
  return map[heritage.value?.category ?? ''] ?? 'gold'
})

function getClusterLabel(cluster: string): string {
  const map: Record<string, string> = {
    'bu-dang': 'Cụm Bù Đăng',
    'bom-bo': 'Cụm Bom Bo',
    'phuoc-long': 'Cụm Phước Long',
    'loc-ninh': 'Cụm Lộc Ninh',
  }
  return map[cluster] || cluster
}

function getPeriodLabel(period: string): string {
  const map: Record<string, string> = {
    'tien-su': 'Tiền sử',
    'phong-kien': 'Phong kiến',
    'phap-thuoc': 'Pháp thuộc',
    'khang-chien': 'Kháng chiến',
    'hien-dai': 'Hiện đại',
  }
  return map[period] || period
}

// Lightbox navigation
function prevGalleryImage() {
  if (!heritage.value?.gallery || lightboxIndex.value === null) return
  const total = heritage.value.gallery.length
  lightboxIndex.value = (lightboxIndex.value - 1 + total) % total
}

function nextGalleryImage() {
  if (!heritage.value?.gallery || lightboxIndex.value === null) return
  const total = heritage.value.gallery.length
  lightboxIndex.value = (lightboxIndex.value + 1) % total
}

function shareHeritage() {
  if (import.meta.client && navigator?.clipboard) {
    navigator.clipboard.writeText(window.location.href)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2500)
  }
}

function copyCoordinates() {
  if (import.meta.client && navigator?.clipboard && heritage.value) {
    navigator.clipboard.writeText(`${heritage.value.coordinates.lat}, ${heritage.value.coordinates.lng}`)
    isCoordsCopied.value = true
    setTimeout(() => {
      isCoordsCopied.value = false
    }, 2500)
  }
}

useHeritageSeo(heritage)
useBreadcrumb(() => heritage.value?.title || '')

const related = computed(() => (heritage.value ? store.getRelated(heritage.value) : []))
const relatedQuiz = computed(() => (heritage.value ? quizStore.getQuizByHeritageId(heritage.value.id) : null))

const storyParagraphs = computed(() => {
  if (!heritage.value?.longStory) return []
  return heritage.value.longStory.split('\n\n').map((p) => p.trim()).filter(Boolean)
})

const communityMemories = computed(() => {
  if (!heritage.value) return []
  return COMMUNITY_POSTS.filter((post) => post.heritageId === heritage.value!.id).slice(0, 3)
})

const typeLabels: Record<string, string> = {
  story: 'Câu chuyện',
  memory: 'Ký ức',
  artwork: 'Tác phẩm nghệ thuật',
  research: 'Nghiên cứu',
  video: 'Video',
}

// Dynamic tabs based on archetype
const activeTabsList = computed(() => {
  const tabs = [{ id: 'lead', name: 'Tóm lược' }]

  if (virtualTour.value) {
    tabs.push({ id: 'tour360', name: 'Không gian 360°' })
  }

  if (heritage.value?.archetype === 'historical') {
    if (heritage.value.timeline?.length) tabs.push({ id: 'timeline', name: 'Biên niên sử' })
    tabs.push({ id: 'story', name: 'Cội nguồn' })
    if (heritage.value.contextStory) tabs.push({ id: 'context', name: 'Bối cảnh' })
  } else if (heritage.value?.archetype === 'cultural') {
    tabs.push({ id: 'story', name: 'Nghi lễ & Cội nguồn' })
    if (heritage.value.audio) tabs.push({ id: 'audio-guide', name: 'Tiếng nói & Audio' })
    if (heritage.value.contextStory) tabs.push({ id: 'context', name: 'Bối cảnh' })
  } else if (heritage.value?.archetype === 'natural') {
    tabs.push({ id: 'story', name: 'Sinh thái & Địa mạo' })
    if (heritage.value.gallery?.length) tabs.push({ id: 'gallery', name: 'Thư viện ảnh' })
    if (heritage.value.contextStory) tabs.push({ id: 'context', name: 'Bối cảnh' })
  } else {
    tabs.push({ id: 'story', name: 'Cội nguồn' })
    if (heritage.value?.timeline?.length) tabs.push({ id: 'timeline-alt', name: 'Biên niên sử' })
  }

  if (heritage.value?.gallery?.length && !tabs.some((t) => t.id === 'gallery')) {
    tabs.push({ id: 'gallery', name: 'Tàng tích ảnh' })
  }

  if (heritage.value?.audio && !tabs.some((t) => t.id === 'audio-guide')) {
    tabs.push({ id: 'audio-guide', name: 'Audio' })
  }

  if (heritage.value?.educationalConnection || relatedQuiz.value) {
    tabs.push({ id: 'education', name: 'Học đường' })
  }

  tabs.push({ id: 'sources', name: 'Nguồn tư liệu' })
  tabs.push({ id: 'location', name: 'Vị trí & Bản đồ' })

  return tabs
})

function scrollToTabSection(id: string) {
  currentActiveTab.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  if (heritage.value) {
    quizStore.markHeritageVisited(heritage.value.id)
  }
  await nextTick()
  observeAll()

  // On-site QR code or GPS field arrival trigger
  if (route.query.src === 'qr' || route.query.src === 'field') {
    const swal = useSwal()
    swal
      .fire({
        title: '📍 Chào mừng bạn đến với thực địa!',
        text: `Bạn đang có mặt tại ${heritage.value?.title || 'điểm di tích'}. Hệ thống thuyết minh tự động đã sẵn sàng.`,
        icon: 'info',
        confirmButtonText: heritage.value?.audio ? '🎧 Nghe thuyết minh ngay' : 'Khám phá ngay',
        showCancelButton: true,
        cancelButtonText: 'Tự đọc tư liệu',
        confirmButtonColor: '#C7A664',
        background: '#221D17',
        color: '#F5F1EA',
      })
      .then((res) => {
        if (res.isConfirmed && heritage.value?.audio) {
          playAudio()
        }
      })
  }

  // Keyboard navigation for Lightbox & sticky tabs observer
  if (import.meta.client) {
    window.addEventListener('keydown', handleLightboxKeydown)

    tabObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentActiveTab.value = entry.target.id
          }
        })
      },
      { threshold: 0.15, rootMargin: '-10% 0px -65% 0px' },
    )

    const sectionIds = ['lead', 'tour360', 'timeline', 'story', 'context', 'timeline-alt', 'gallery', 'audio-guide', 'education', 'sources', 'location']
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) tabObserver?.observe(el)
    })
  }
})

let tabObserver: IntersectionObserver | null = null

function handleLightboxKeydown(e: KeyboardEvent) {
  if (lightboxIndex.value === null) return
  if (e.key === 'ArrowLeft') prevGalleryImage()
  if (e.key === 'ArrowRight') nextGalleryImage()
  if (e.key === 'Escape') lightboxIndex.value = null
}

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleLightboxKeydown)
    if (tabObserver) {
      tabObserver.disconnect()
      tabObserver = null
    }
  }
})

function playAudio() {
  if (heritage.value?.audio) {
    audioStore.loadTrack(heritage.value.audio, heritage.value.id)
    audioStore.play()
    trackEvent('audio', 'start', heritage.value.id)
  }
}

function startQuiz() {
  if (relatedQuiz.value) {
    quizStore.startQuiz(relatedQuiz.value)
    trackEvent('quiz', 'start', heritage.value?.id)
  }
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

definePageMeta({ layout: 'default' })
</script>

<style scoped>
.ken-burns-hero {
  animation: kenburns-hero 22s ease-out infinite alternate;
}
@keyframes kenburns-hero {
  0% { transform: scale(1); }
  100% { transform: scale(1.06); }
}

.drop-cap::first-letter {
  font-family: var(--font-heading, 'Playfair Display', serif);
  font-size: 3.2rem;
  line-height: 0.85;
  float: left;
  margin-right: 0.5rem;
  margin-top: 0.15rem;
  color: #e18c1b;
  font-weight: 700;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
