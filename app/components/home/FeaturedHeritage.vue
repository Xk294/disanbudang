<template>
  <section class="section bg-[#0A0C10] text-ivory relative overflow-hidden border-t border-charcoal-800/80" aria-label="Di sản nổi bật - Tiêu điểm học tập">

    <!-- Ambient Glow -->
    <div class="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brick-500/5 rounded-full blur-[130px] pointer-events-none" />

    <div class="container-heritage relative z-10">

      <!-- ── SECTION HEADER (Answers "Tôi vừa học được gì?" in 2 minutes) ── -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <span class="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span>Tiêu Điểm Di Sản · 2 Phút Tri Thức</span>
          </div>
          <h2 class="font-heading font-extrabold text-ivory text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Những Bản Hùng Ca Bất Tử
          </h2>
          <p class="text-charcoal-300 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            Khám phá câu chuyện lịch sử hào hùng, thanh âm cồng chiêng và cảnh quan thiên nhiên kỳ vĩ làm nên linh hồn Bù Đăng.
          </p>
        </div>

        <!-- 1 Primary CTA for Desktop -->
        <NuxtLink
          to="/explore"
          class="hidden lg:inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-charcoal-900 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-300 hover:text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group flex-shrink-0"
        >
          <span>Xem Tất Cả {{ totalCount }} Di Sản</span>
          <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <!-- ── EDITORIAL SHOWCASE (1 Lead Feature + 2 Satellite Features) ── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        <!-- LEAD FEATURE: Sóc Bom Bo (420px mobile, 580px desktop) -->
        <div v-if="leadHeritage" class="lg:col-span-7 xl:col-span-8">
          <article
            class="relative overflow-hidden rounded-3xl cursor-pointer group h-[460px] lg:h-[580px] border border-charcoal-800 hover:border-gold-500/40 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-700 bg-charcoal-950 flex flex-col justify-end"
            @click="navigateTo(`/heritage/${leadHeritage.slug}`)"
          >
            <NuxtImg
              :src="leadHeritage.coverImage"
              :alt="leadHeritage.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]"
              loading="lazy"
              format="webp"
              sizes="xs:100vw lg:65vw"
            />
            <!-- Dark Gradient Vignette -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/65 to-transparent" />
            <div class="absolute inset-0 bg-gradient-to-r from-[#0A0C10]/80 via-transparent to-transparent" />

            <!-- Editorial Number Watermark -->
            <div class="absolute top-6 left-6 font-heading font-bold text-gold-500/10 text-[70px] lg:text-[100px] leading-none select-none pointer-events-none">
              01
            </div>

            <!-- Content Area -->
            <div class="relative z-10 p-6 sm:p-8 lg:p-10">
              <div class="flex items-center gap-2 mb-3">
                <span class="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[10.5px] font-bold uppercase tracking-wider">
                  Di Tích Lịch Sử Kháng Chiến
                </span>
                <span class="text-charcoal-400 text-xs">·</span>
                <span class="text-gold-400 text-xs font-semibold">Tóm tắt 30 giây</span>
              </div>

              <h3 class="font-heading font-extrabold text-ivory text-2xl sm:text-3xl lg:text-4xl leading-snug mb-3 group-hover:text-gold-200 transition-colors drop-shadow-md">
                {{ leadHeritage.title }}
              </h3>

              <!-- 2-Minute Lesson takeaway -->
              <p class="text-charcoal-200 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl line-clamp-3 bg-charcoal-950/60 backdrop-blur-md p-3.5 rounded-xl border border-charcoal-800/80">
                <strong class="text-gold-300 font-semibold">Bài học lịch sử:</strong> Trong chiến dịch Đồng Xoài 1965, đồng bào S'tiêng tại Sóc Bom Bo đã giã gạo thâu đêm dưới ánh đuốc lồ ô tiếp tế hàng chục tấn lương thực cho bộ đội miền Đông, tạc nên khúc tráng ca huyền thoại bất khuất.
              </p>

              <div class="flex items-center gap-3">
                <span class="inline-flex items-center gap-2 text-gold-300 text-xs sm:text-sm font-bold uppercase tracking-wider group-hover:text-gold-200 transition-colors">
                  <span>Khám phá trọn vẹn tư liệu</span>
                  <Icon name="mdi:arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- SATELLITE FEATURES — 2 Stacked Cards -->
        <div class="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <article
            v-for="(item, idx) in secondaryHeritages"
            :key="item.id"
            class="relative overflow-hidden rounded-3xl cursor-pointer group flex-1 min-h-[220px] lg:min-h-0 border border-charcoal-800 hover:border-gold-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/10 bg-charcoal-950 flex flex-col justify-end"
            @click="navigateTo(`/heritage/${item.slug}`)"
          >
            <NuxtImg
              :src="item.coverImage"
              :alt="item.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
              loading="lazy"
              format="webp"
              sizes="xs:100vw lg:35vw"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/75 to-transparent" />

            <!-- Number Indicator -->
            <div class="absolute top-4 left-5 font-heading font-bold text-gold-500/15 text-[40px] leading-none select-none pointer-events-none">
              {{ String(idx + 2).padStart(2, '0') }}
            </div>

            <div class="relative z-10 p-5 sm:p-6">
              <span class="inline-block px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                {{ getCategoryLabel(item.category) }}
              </span>

              <h4 class="font-heading font-bold text-ivory text-lg sm:text-xl leading-snug mb-1.5 group-hover:text-gold-200 transition-colors line-clamp-2">
                {{ item.title }}
              </h4>

              <p class="text-charcoal-300 text-xs line-clamp-2 leading-relaxed mb-3">
                {{ item.shortDescription || item.subtitle }}
              </p>

              <div class="flex items-center gap-1 text-gold-400 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                <span>Xem chi tiết</span>
                <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
              </div>
            </div>
          </article>
        </div>

      </div>

      <!-- ── MOBILE SINGLE PRIMARY CTA ── -->
      <div class="flex lg:hidden justify-center mt-8">
        <NuxtLink
          to="/explore"
          class="w-full sm:w-auto text-center py-3.5 px-8 rounded-full bg-charcoal-900 hover:bg-gold-500 border border-gold-500/40 text-gold-300 hover:text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
        >
          Xem Tất Cả {{ totalCount }} Di Sản
          <Icon name="mdi:arrow-right" class="w-4 h-4 inline-block ml-1" />
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { HERITAGES } from '~/data/heritages'

const { getCategoryLabel } = useHeritage()
const heritageStore = useHeritageStore()

const totalCount = computed(() => heritageStore.totalCount || 16)

const leadHeritage = computed(() => {
  return HERITAGES.find((h) => h.slug === 'khu-bao-ton-soc-bom-bo' || h.id === 'hrt-011' || h.id === 'khu-bao-ton-soc-bom-bo') || HERITAGES[0]
})

const secondaryHeritages = computed(() => {
  return HERITAGES.filter((h) =>
    h.slug === 'le-hoi-cong-chieng-stieng' ||
    h.slug === 'trang-co-bu-lach' ||
    h.id === 'hrt-003' ||
    h.id === 'hrt-009'
  ).slice(0, 2)
})
</script>
