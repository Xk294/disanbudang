<template>
  <div class="homepage-root min-h-screen bg-[#0A0C10] text-ivory">

    <!-- ═══ SCROLL INTRO OVERLAY (Fullscreen — hiện 1 lần/session) ═══ -->
    <Transition name="scroll-intro">
      <div
        v-if="showIntro"
        class="scroll-intro-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-[#07090E]/45 backdrop-blur-md backdrop-saturate-125 px-3 sm:px-6 py-4 sm:py-8 overflow-y-auto"
      >
        <!-- Atmospheric Royal Golden Ambient Halo (Luminous & Warm Heritage Glow, no harsh pitch-black void) -->
        <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.18)_0%,rgba(180,130,40,0.08)_35%,rgba(10,12,16,0.35)_70%,rgba(7,9,14,0.6)_100%)]" />
        <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0C10]/60 via-transparent to-[#0A0C10]/50" />

        <!-- Skip button -->
        <button
          class="skip-btn absolute top-4 right-4 sm:top-7 sm:right-8 z-40 inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full border border-[#D4AF37]/70 bg-[#120B04]/90 backdrop-blur-xl text-[#FFF0C2] hover:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/30 text-xs sm:text-sm uppercase tracking-[0.18em] font-heading font-bold transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.8)] hover:shadow-[0_0_28px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95"
          @click="dismissIntro"
          title="Vào thẳng Bảo Tàng Số"
        >
          <span>Khám Phá Ngay</span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
          <svg class="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Scroll content container -->
        <div class="scroll-intro-inner relative z-10 w-full max-w-5xl px-2 sm:px-6 md:px-8">
          <RoyalScrollReveal @complete="onScrollComplete">
            <ScrollIntroContent :scroll-done="scrollDone" @enter="dismissIntro" />
          </RoyalScrollReveal>
        </div>
      </div>
    </Transition>

    <!-- ═══ NARRATIVE BEAT 1: HERO (Answers "Website này là gì?" in 10 seconds) ═══ -->
    <HeroSection />

    <!-- ═══ NARRATIVE BEAT 2: THREE DOORS (Answers "Có gì để khám phá?" in 30 seconds) ═══ -->
    <ThreeDoorsSection />

    <!-- ═══ NARRATIVE BEAT 3: FEATURE (Answers "Tôi vừa học được gì?" in 2 minutes) ═══ -->
    <FeaturedHeritage />

    <!-- ═══ NARRATIVE BEAT 4: MEMORY (Community Voices & Living Heritage) ═══ -->
    <CommunityStoriesSection />

    <!-- ═══ NARRATIVE BEAT 5: FAQ (SEO + Quick Answers + Structured Schema) ═══ -->
    <FAQSection />
  </div>
</template>

<script setup lang="ts">
import RoyalScrollReveal from '~/components/home/RoyalScrollReveal.vue'
import ScrollIntroContent from '~/components/home/ScrollIntroContent.vue'
import HeroSection from '~/components/home/HeroSection.vue'
import ThreeDoorsSection from '~/components/home/ThreeDoorsSection.vue'
import FeaturedHeritage from '~/components/home/FeaturedHeritage.vue'
import CommunityStoriesSection from '~/components/home/CommunityStoriesSection.vue'
import FAQSection from '~/components/home/FAQSection.vue'

const SKIP_KEY = 'disanbudang_scroll_intro_seen'

const showIntro = ref(false)
const scrollDone = ref(false)

onMounted(() => {
  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SKIP_KEY)) return
  showIntro.value = true
})

function dismissIntro() {
  showIntro.value = false
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(SKIP_KEY, '1')
  }
}

function onScrollComplete() {
  scrollDone.value = true
}

useMuseumSeo({
  title: 'Bảo Tàng Số Di Sản Bù Đăng · TP. Đồng Nai',
  description: 'Nền tảng bảo tồn và số hóa 16 di sản văn hóa phi vật thể, di tích lịch sử và danh lam thắng cảnh tại Bù Đăng, Thành phố Đồng Nai. Bản đồ tương tác GIS, Audio Guide và góc học tập.',
  image: '/images/og-default.jpg',
})

definePageMeta({ layout: 'default' })
</script>

<style scoped>
.scroll-intro-overlay {
  will-change: opacity;
}

/* Fade-out transition khi dismiss */
.scroll-intro-enter-active {
  transition: opacity 0.4s ease;
}
.scroll-intro-leave-active {
  transition: opacity 0.9s ease;
}
.scroll-intro-enter-from,
.scroll-intro-leave-to {
  opacity: 0;
}

.skip-btn {
  font-family: var(--font-heading, 'Cormorant Garamond', serif);
  letter-spacing: 0.2em;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}
</style>
