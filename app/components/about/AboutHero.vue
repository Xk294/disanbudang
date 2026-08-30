<template>
  <section class="relative min-h-screen flex flex-col overflow-hidden">
    <!-- Background slideshow -->
    <div class="absolute inset-0 z-0">
      <TransitionGroup name="about-hero-fade">
        <div
          v-for="(slide, i) in slides"
          v-show="currentSlide === i"
          :key="i"
          class="absolute inset-0"
        >
          <NuxtImg
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-full object-cover"
            :class="currentSlide === i ? 'ken-burns-active' : ''"
            :style="slide.position ? `object-position: ${slide.position}` : ''"
          />
        </div>
      </TransitionGroup>
    </div>

    <!-- Layered overlays — left-burn to support left-aligned text -->
    <div class="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-900/30" />
    <div class="absolute inset-0 z-10 bg-gradient-to-r from-charcoal-950/92 via-charcoal-950/40 to-transparent" />
    <div class="absolute top-0 inset-x-0 h-28 z-10 bg-gradient-to-b from-charcoal-950/70 to-transparent" />

    <!-- Slide indicators -->
    <div class="absolute bottom-14 right-8 z-20 flex flex-col gap-2">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="rounded-full transition-all duration-500 cursor-pointer"
        :class="currentSlide === i ? 'w-1 h-7 bg-gold-400' : 'w-1 h-3 bg-ivory/25 hover:bg-ivory/50'"
        :aria-label="`Slide ${i + 1}`"
        @click="goToSlide(i)"
      />
    </div>

    <!-- Slide counter top-right -->
    <div class="absolute top-24 right-8 z-20 hidden lg:flex items-center gap-1.5 pointer-events-none">
      <span class="font-heading font-bold text-ivory/80 text-sm tabular-nums">{{ String(currentSlide + 1).padStart(2, '0') }}</span>
      <span class="text-charcoal-400 text-xs">/</span>
      <span class="text-charcoal-500 text-xs tabular-nums">{{ String(slides.length).padStart(2, '0') }}</span>
    </div>

    <!-- MAIN CONTENT — vertically centered -->
    <div class="relative z-20 flex-1 flex flex-col justify-center py-20 lg:py-24">
      <div class="container-heritage">
        <div class="max-w-3xl xl:max-w-4xl">

          <!-- Eyebrow -->
          <div class="flex items-center gap-3 mb-5 about-reveal" style="--delay: 0s">
            <span class="h-px w-10 bg-gold-400" />
            <span class="text-gold-400 text-[10px] uppercase tracking-[0.28em] font-bold">
              Dự Án Số Hóa Di Sản Bù Đăng · TP. Đồng Nai
            </span>
          </div>

          <!-- H1 — left-aligned editorial -->
          <h1
            class="font-heading font-bold text-ivory leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 about-reveal text-shadow-hero text-balance tracking-normal"
            style="--delay: 0.12s; font-size: clamp(2.6rem, 7vw, 6rem)"
          >
            Giới Thiệu<br/>
            <span class="text-gradient-gold">Di Sản Bù Đăng</span>
          </h1>

          <!-- Tagline -->
          <p
            class="font-accent italic text-ivory/65 text-lg lg:text-xl xl:text-2xl max-w-2xl mb-10 leading-relaxed about-reveal"
            style="--delay: 0.24s"
          >
            "Gìn giữ ký ức di sản vùng đất Bù Đăng — vùng lõi di sản đang lớn lên cùng Thành Phố Đồng Nai"
          </p>

          <div class="flex flex-wrap items-center gap-4 about-reveal" style="--delay: 0.36s">
            <button @click="$emit('scroll-to', 'mission')" class="btn-primary px-8 py-3.5 text-sm">
              Bắt đầu Hành Trình
              <Icon name="mdi:arrow-down" class="w-4.5 h-4.5 animate-bounce" />
            </button>
            <NuxtLink to="/map" class="btn-ghost px-8 py-3.5 text-sm border border-ivory/20 text-ivory/70 hover:border-gold-400/50 hover:text-gold-300">
              <Icon name="mdi:map-outline" class="w-4.5 h-4.5" />
              Bản Đồ Di Sản
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <div class="w-5 h-8 border border-ivory/20 rounded-full flex justify-center pt-1.5">
        <div class="w-1 h-1.5 bg-gold-400/70 rounded-full scroll-dot" />
      </div>
      <span class="text-ivory/30 text-[9px] uppercase tracking-widest">Cuộn xuống</span>
    </div>
  </section>
</template>

<script setup lang="ts">
interface HeroSlide {
  image: string
  alt: string
  position?: string
}

const props = defineProps<{
  slides: HeroSlide[]
}>()

defineEmits<{
  'scroll-to': [id: string]
}>()

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval>

function goToSlide(i: number) {
  currentSlide.value = i
  clearInterval(slideInterval)
  startAutoPlay()
}
function startAutoPlay() {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % props.slides.length
  }, 6500)
}

onMounted(() => startAutoPlay())
onUnmounted(() => { if (slideInterval) clearInterval(slideInterval) })
</script>

<style scoped>
.ken-burns-active {
  animation: kenburns 22s ease-out infinite alternate;
}
@keyframes kenburns {
  0% { transform: scale(1.1); }
  100% { transform: scale(1) translateX(-10px); }
}

.about-hero-fade-enter-active { transition: opacity 1.8s ease; }
.about-hero-fade-leave-active { transition: opacity 1.8s ease; }
.about-hero-fade-enter-from, .about-hero-fade-leave-to { opacity: 0; }

.about-reveal {
  animation: aboutReveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0s);
}
@keyframes aboutReveal {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.scroll-dot {
  animation: scrollBounce 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(10px); opacity: 1; }
}
</style>
