<template>
  <div class="scroll-intro-content flex flex-col items-center justify-center text-center px-4 sm:px-8 py-8 sm:py-12 select-none">
    <!-- Badge -->
    <div class="badge mb-4 sm:mb-5 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#161007]/85 backdrop-blur-md text-[#FFF0C2] text-[10px] sm:text-[11.5px] uppercase tracking-[0.24em] font-bold shadow-[0_2px_14px_rgba(212,175,55,0.2)]">
      <span class="w-1.5 h-1.5 rounded-full bg-[#E5B94C] animate-pulse shadow-[0_0_8px_#E5B94C]" />
      <span>BẢO TÀNG SỐ DI SẢN BÙ ĐĂNG · TP. ĐỒNG NAI</span>
    </div>

    <!-- Title: Guaranteed 1 Line with clamp() and whitespace-nowrap -->
    <p class="font-heading font-black tracking-wide whitespace-nowrap text-[clamp(1.15rem,3.3vw,2.5rem)] leading-tight royal-title-gold drop-shadow-[0_4px_24px_rgba(212,175,55,0.45)] mb-2 sm:mb-3">
      Bảo Tàng Số Di Sản Bù Đăng
    </p>

    <!-- Gold divider -->
    <div class="divider flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3 w-full max-w-xs">
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]/80" />
      <span class="text-[#E5B94C] text-xs select-none drop-shadow-[0_0_8px_rgba(229,185,76,0.9)]">❖</span>
      <div class="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]/80" />
    </div>

    <!-- Sub-title -->
    <p class="font-heading text-[#F3DC9B] text-xs sm:text-sm md:text-[15px] uppercase tracking-[0.3em] font-bold mb-4 sm:mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
      Thành Phố Đồng Nai
    </p>

    <!-- Quote -->
    <blockquote class="relative max-w-2xl mx-auto mb-3 sm:mb-4 px-4 sm:px-6">
      <span class="absolute -top-3 left-0 sm:left-2 text-[#D4AF37]/60 text-2xl sm:text-3xl font-serif leading-none select-none">“</span>
      <p class="font-body italic text-[#FFFDF7] text-xs sm:text-sm md:text-[15px] leading-relaxed px-3">
        Di sản không chỉ thuộc về quá khứ — khi được số hóa, những câu chuyện của Bù Đăng sẽ tiếp tục được nhìn thấy, lắng nghe và trao truyền cho muôn đời sau.
      </p>
      <span class="absolute -bottom-3 right-0 sm:right-2 text-[#D4AF37]/60 text-2xl sm:text-3xl font-serif leading-none select-none">”</span>
    </blockquote>

    <!-- Description -->
    <p class="font-body text-[#E8E1D3]/75 text-[11px] sm:text-xs md:text-sm leading-relaxed max-w-xl mx-auto mb-6 sm:mb-7 font-light">
      Nền tảng bảo tồn và giới thiệu di sản văn hoá trên không gian số — tư liệu thực địa chuẩn hoá, âm vang tiếng chày Bom Bo và ký ức cộng đồng.
    </p>

    <!-- CTA: Giữ layout cố định từ đầu, fade-in khi scroll mở xong để tránh giật/khựng -->
    <button
      class="cta-btn mb-6 sm:mb-7 group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0C2] via-[#E5B94C] to-[#C8960C] text-[#120B04] font-heading font-extrabold text-xs sm:text-sm md:text-base uppercase tracking-[0.22em] shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:shadow-[0_0_60px_rgba(212,175,55,0.85)] transition-all duration-700 ease-out hover:scale-[1.05] active:scale-[0.98] overflow-hidden"
      :class="scrollDone ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'"
      :aria-hidden="!scrollDone"
      :tabindex="scrollDone ? 0 : -1"
      @click="emit('enter')"
    >
      <!-- Shimmer shine effect -->
      <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

      <svg class="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[#120B04]" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="8" cy="8" r="6.5" />
        <polygon points="8,3.5 10,7.5 8,12.5 6,7.5" fill="#120B04" />
      </svg>
      <span>Bắt Đầu Hành Trình Di Sản</span>
      <svg class="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5 text-[#120B04]" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <!-- Stats row -->
    <div class="stats-row flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full max-w-3xl">
      <div v-for="stat in stats" :key="stat.label" class="stat-pill flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-[#D4AF37]/35 bg-[#161109]/80 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
        <component :is="stat.icon" class="w-3.5 h-3.5 text-[#E5B94C] shrink-0" />
        <span class="text-[#FFF0C2] font-extrabold text-xs sm:text-sm font-heading">{{ stat.value }}</span>
        <span class="text-[#E8E1D3]/70 text-[10px] sm:text-[11px] uppercase tracking-wider font-medium">{{ stat.label }}</span>
      </div>

      <!-- Commemorative milestone pill -->
      <div class="stat-pill flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-[#D4AF37]/35 bg-[#161109]/80 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
        <svg class="w-3.5 h-3.5 text-[#E5B94C] shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="8" cy="7" r="2.5" />
          <path d="M8 1C4.686 1 2 3.686 2 7c0 4.5 6 9 6 9s6-4.5 6-9c0-3.314-2.686-6-6-6z" />
        </svg>
        <div class="text-left flex items-center gap-1.5">
          <span class="text-[#FFF0C2] font-bold text-xs sm:text-sm leading-none">Thành Phố Đồng Nai</span>
          <span class="text-[#E5B94C] text-[10px]">·</span>
          <span class="text-[#E8E1D3]/65 text-[10px] sm:text-[11px] uppercase tracking-wide">TPTTTU thứ 7 (30/04/2026)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'

const props = defineProps<{ scrollDone: boolean }>()
const emit = defineEmits<{ (e: 'enter'): void }>()

const IconMuseum = () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('path', { d: 'M2 6h12v8H2zM1 6l7-4 7 4' }),
  h('rect', { x: '5', y: '9', width: '2', height: '5' }),
  h('rect', { x: '9', y: '9', width: '2', height: '5' }),
])

const IconUsers = () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('circle', { cx: '6', cy: '5', r: '2.5' }),
  h('path', { d: 'M1 14c0-3 2-4.5 5-4.5s5 1.5 5 4.5' }),
  h('path', { d: 'M11 7.5c1.5 0 3 .8 3 3.5', 'stroke-linecap': 'round' }),
])

const IconHeadphones = () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('path', { d: 'M2 9V8a6 6 0 0112 0v1' }),
  h('rect', { x: '1', y: '9', width: '3', height: '4', rx: '1.5' }),
  h('rect', { x: '12', y: '9', width: '3', height: '4', rx: '1.5' }),
])

const IconShield = () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('path', { d: 'M8 1L2 4v4c0 3.5 2.5 6 6 7 3.5-1 6-3.5 6-7V4L8 1z' }),
])

const stats = [
  { value: '16', label: 'Di Sản Số Hóa', icon: IconMuseum },
  { value: '6', label: 'Ký Ức Cộng Đồng', icon: IconUsers },
  { value: '2', label: 'Audio Guide', icon: IconHeadphones },
  { value: '160', label: 'Câu Hỏi Lịch Sử', icon: IconShield },
]
</script>

<style scoped>
.scroll-intro-content {
  min-height: 420px;
}

.royal-title-gold {
  background: linear-gradient(135deg, #FFFDF8 0%, #F5DE98 30%, #D4AF37 60%, #FFF0C2 85%, #B8923E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-pill {
  white-space: nowrap;
}
</style>
