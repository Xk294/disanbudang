<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory">
    <!-- Hero header -->
    <div class="bg-dark-earth py-10 md:py-14 relative overflow-hidden border-b border-charcoal-850">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div class="absolute top-0 left-0 w-72 h-72 bg-forest-500/5 rounded-full blur-3xl" />
        <div class="noise-overlay" />
      </div>
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Di Sản & Ký Ức Cộng Đồng</span>
        <h1 class="font-heading font-bold text-ivory text-4xl md:text-5xl lg:text-6xl leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 text-balance tracking-[-0.03em]">
          Thư Viện Di Sản<br/>
          <span class="text-gradient-gold">Thành Phố Đồng Nai</span>
        </h1>
        <p class="text-charcoal-300 text-base max-w-2xl leading-relaxed">
          {{ store.totalCount }} di sản số hóa và hàng chục ký ức do người dân tự tay đóng góp, kho lưu trữ sống của Thành Phố Đồng Nai. Từ những di tích oai hùng đến những câu chuyện được kể lại bên bếp lửa.
        </p>

        <!-- Search bar — chỉ hiện ở tab Di Sản -->
        <div v-if="activeMainTab === 'heritage'" class="mt-8 max-w-xl">
          <div class="relative">
            <Icon
              name="mdi:magnify"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400 pointer-events-none z-10"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Nhập tên di sản, danh thắng, từ khóa..."
              class="w-full bg-charcoal-950 border border-charcoal-800 rounded-2xl text-ivory text-base pl-12 pr-12 py-4 placeholder-charcoal-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300"
            />
            <button
              v-if="searchQuery"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-ivory"
              @click="searchQuery = ''"
            >
              <Icon name="mdi:close-circle" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== VIRTUAL TOUR ENTRY BANNER ===== -->
    <div class="border-b border-charcoal-850 bg-charcoal-950">
      <div class="container-heritage py-5">
        <NuxtLink
          to="/explore/virtual-tour"
          id="virtual-tour-entry"
          class="group flex items-center gap-5 rounded-2xl overflow-hidden border border-charcoal-800 hover:border-gold-500/50 transition-all duration-400 relative"
          style="background: linear-gradient(135deg, #1A140F 0%, #221D17 100%);"
        >
          <!-- Thumbnail strip -->
          <div class="hidden sm:flex flex-shrink-0 h-[88px] w-[220px] overflow-hidden relative">
            <img
              src="/video/virtual-tour/trang-co/poster.jpg"
              alt="Trảng Cỏ Bù Lạch"
              class="w-1/2 h-full object-cover"
            />
            <img
              src="/video/virtual-tour/bom-bo/poster.jpg"
              alt="Khu Bảo Tồn Bom Bo"
              class="w-1/2 h-full object-cover"
            />
            <!-- overlay -->
            <div class="absolute inset-0" style="background: linear-gradient(to right, transparent 60%, #1A140F 100%);" />
          </div>

          <!-- Text content -->
          <div class="flex-1 py-4 pl-4 sm:pl-0 pr-2">
            <div class="flex items-center gap-2 mb-1">
              <span class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/20 rounded-full px-2.5 py-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse inline-block" />
                MỚI
              </span>
              <span class="text-[10px] font-semibold uppercase tracking-widest text-charcoal-500">Tính năng</span>
            </div>
            <h3 class="font-heading text-ivory text-base font-bold leading-snug mb-0.5 group-hover:text-gold-300 transition-colors">
              🎬 Chuyến Tham Quan Ảo
            </h3>
            <p class="text-charcoal-400 text-xs leading-relaxed">
              Trảng Cỏ Bù Lạch · Khu Bảo Tồn Sóc Bom Bo — Trải nghiệm cinematic trong 30 giây
            </p>
          </div>

          <!-- Arrow CTA -->
          <div class="flex-shrink-0 pr-5 flex items-center">
            <div class="w-9 h-9 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center group-hover:bg-gold-500/30 transition-all duration-300 group-hover:scale-110">
              <Icon name="mdi:play" class="w-4 h-4 text-gold-400 ml-0.5" />
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
      <div v-else class="py-24 text-center border border-dashed border-charcoal-800 rounded-3xl bg-charcoal-950/20 max-w-xl mx-auto">
        <Icon name="mdi:archive-search-outline" class="w-16 h-16 text-charcoal-400 mx-auto mb-4" />
        <h2 class="font-heading font-bold text-ivory text-xl mb-2">Không Tìm Thấy Kết Quả</h2>
        <p class="text-charcoal-400 text-sm mb-6 max-w-sm mx-auto">Thử từ khóa khác hoặc xóa bộ lọc đang chọn.</p>
        <button class="btn-primary" @click="clearFilters">Xóa Bộ Lọc</button>
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
  description: '11 di sản số hóa đầy đủ dữ liệu học thuật cùng ký ức do người dân Thành Phố Đồng Nai đóng góp. Di tích lịch sử, danh thắng, văn hóa phi vật thể S\'Tiêng có tọa độ và nguồn gốc tư liệu.',
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
const activeMainTab = ref('heritage')
const activeCommunityTab = ref('all')

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

  // Store là app-wide singleton (dùng chung với /map) — luôn đồng bộ lại theo
  // query string hiện tại, tránh dính filter còn sót từ trang khác.
  activeCategory.value = (route.query.category as string) || ''
  searchQuery.value = (route.query.search as string) || ''
  activeCluster.value = ''
  store.setCategory(activeCategory.value)
  store.setSearch(searchQuery.value)
  store.setCluster('')

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

function clearFilters() {
  searchQuery.value = ''
  activeCategory.value = ''
  activeCluster.value = ''
  store.clearFilters()
}
</script>
